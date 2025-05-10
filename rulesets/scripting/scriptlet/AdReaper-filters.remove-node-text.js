/*******************************************************************************

    AdReaper - a comprehensive, MV3-compliant content blocker
    Copyright (C) 2014-present Labib Rayan

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

// ruleset: AdReaper-filters

// Important!
// Isolate from global scope

// Start of local scope
(function uBOL_removeNodeText() {

/******************************************************************************/

function removeNodeText(
    nodeName,
    includes,
    ...extraArgs
) {
    replaceNodeTextFn(nodeName, '', '', 'includes', includes || '', ...extraArgs);
}

function replaceNodeTextFn(
    nodeName = '',
    pattern = '',
    replacement = ''
) {
    const safe = safeSelf();
    const logPrefix = safe.makeLogPrefix('replace-node-text.fn', ...Array.from(arguments));
    const reNodeName = safe.patternToRegex(nodeName, 'i', true);
    const rePattern = safe.patternToRegex(pattern, 'gms');
    const extraArgs = safe.getExtraArgs(Array.from(arguments), 3);
    const reIncludes = extraArgs.includes || extraArgs.condition
        ? safe.patternToRegex(extraArgs.includes || extraArgs.condition, 'ms')
        : null;
    const reExcludes = extraArgs.excludes
        ? safe.patternToRegex(extraArgs.excludes, 'ms')
        : null;
    const stop = (takeRecord = true) => {
        if ( takeRecord ) {
            handleMutations(observer.takeRecords());
        }
        observer.disconnect();
        if ( safe.logLevel > 1 ) {
            safe.uboLog(logPrefix, 'Quitting');
        }
    };
    const textContentFactory = (( ) => {
        const out = { createScript: s => s };
        const { trustedTypes: tt } = self;
        if ( tt instanceof Object ) {
            if ( typeof tt.getPropertyType === 'function' ) {
                if ( tt.getPropertyType('script', 'textContent') === 'TrustedScript' ) {
                    return tt.createPolicy(getRandomTokenFn(), out);
                }
            }
        }
        return out;
    })();
    let sedCount = extraArgs.sedCount || 0;
    const handleNode = node => {
        const before = node.textContent;
        if ( reIncludes ) {
            reIncludes.lastIndex = 0;
            if ( safe.RegExp_test.call(reIncludes, before) === false ) { return true; }
        }
        if ( reExcludes ) {
            reExcludes.lastIndex = 0;
            if ( safe.RegExp_test.call(reExcludes, before) ) { return true; }
        }
        rePattern.lastIndex = 0;
        if ( safe.RegExp_test.call(rePattern, before) === false ) { return true; }
        rePattern.lastIndex = 0;
        const after = pattern !== ''
            ? before.replace(rePattern, replacement)
            : replacement;
        node.textContent = node.nodeName === 'SCRIPT'
            ? textContentFactory.createScript(after)
            : after;
        if ( safe.logLevel > 1 ) {
            safe.uboLog(logPrefix, `Text before:\n${before.trim()}`);
        }
        safe.uboLog(logPrefix, `Text after:\n${after.trim()}`);
        return sedCount === 0 || (sedCount -= 1) !== 0;
    };
    const handleMutations = mutations => {
        for ( const mutation of mutations ) {
            for ( const node of mutation.addedNodes ) {
                if ( reNodeName.test(node.nodeName) === false ) { continue; }
                if ( handleNode(node) ) { continue; }
                stop(false); return;
            }
        }
    };
    const observer = new MutationObserver(handleMutations);
    observer.observe(document, { childList: true, subtree: true });
    if ( document.documentElement ) {
        const treeWalker = document.createTreeWalker(
            document.documentElement,
            NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT
        );
        let count = 0;
        for (;;) {
            const node = treeWalker.nextNode();
            count += 1;
            if ( node === null ) { break; }
            if ( reNodeName.test(node.nodeName) === false ) { continue; }
            if ( node === document.currentScript ) { continue; }
            if ( handleNode(node) ) { continue; }
            stop(); break;
        }
        safe.uboLog(logPrefix, `${count} nodes present before installing mutation observer`);
    }
    if ( extraArgs.stay ) { return; }
    runAt(( ) => {
        const quitAfter = extraArgs.quitAfter || 0;
        if ( quitAfter !== 0 ) {
            setTimeout(( ) => { stop(); }, quitAfter);
        } else {
            stop();
        }
    }, 'interactive');
}

function getRandomTokenFn() {
    const safe = safeSelf();
    return safe.String_fromCharCode(Date.now() % 26 + 97) +
        safe.Math_floor(safe.Math_random() * 982451653 + 982451653).toString(36);
}

function runAt(fn, when) {
    const intFromReadyState = state => {
        const targets = {
            'loading': 1, 'asap': 1,
            'interactive': 2, 'end': 2, '2': 2,
            'complete': 3, 'idle': 3, '3': 3,
        };
        const tokens = Array.isArray(state) ? state : [ state ];
        for ( const token of tokens ) {
            const prop = `${token}`;
            if ( Object.hasOwn(targets, prop) === false ) { continue; }
            return targets[prop];
        }
        return 0;
    };
    const runAt = intFromReadyState(when);
    if ( intFromReadyState(document.readyState) >= runAt ) {
        fn(); return;
    }
    const onStateChange = ( ) => {
        if ( intFromReadyState(document.readyState) < runAt ) { return; }
        fn();
        safe.removeEventListener.apply(document, args);
    };
    const safe = safeSelf();
    const args = [ 'readystatechange', onStateChange, { capture: true } ];
    safe.addEventListener.apply(document, args);
}

function safeSelf() {
    if ( scriptletGlobals.safeSelf ) {
        return scriptletGlobals.safeSelf;
    }
    const self = globalThis;
    const safe = {
        'Array_from': Array.from,
        'Error': self.Error,
        'Function_toStringFn': self.Function.prototype.toString,
        'Function_toString': thisArg => safe.Function_toStringFn.call(thisArg),
        'Math_floor': Math.floor,
        'Math_max': Math.max,
        'Math_min': Math.min,
        'Math_random': Math.random,
        'Object': Object,
        'Object_defineProperty': Object.defineProperty.bind(Object),
        'Object_defineProperties': Object.defineProperties.bind(Object),
        'Object_fromEntries': Object.fromEntries.bind(Object),
        'Object_getOwnPropertyDescriptor': Object.getOwnPropertyDescriptor.bind(Object),
        'Object_hasOwn': Object.hasOwn.bind(Object),
        'RegExp': self.RegExp,
        'RegExp_test': self.RegExp.prototype.test,
        'RegExp_exec': self.RegExp.prototype.exec,
        'Request_clone': self.Request.prototype.clone,
        'String': self.String,
        'String_fromCharCode': String.fromCharCode,
        'String_split': String.prototype.split,
        'XMLHttpRequest': self.XMLHttpRequest,
        'addEventListener': self.EventTarget.prototype.addEventListener,
        'removeEventListener': self.EventTarget.prototype.removeEventListener,
        'fetch': self.fetch,
        'JSON': self.JSON,
        'JSON_parseFn': self.JSON.parse,
        'JSON_stringifyFn': self.JSON.stringify,
        'JSON_parse': (...args) => safe.JSON_parseFn.call(safe.JSON, ...args),
        'JSON_stringify': (...args) => safe.JSON_stringifyFn.call(safe.JSON, ...args),
        'log': console.log.bind(console),
        // Properties
        logLevel: 0,
        // Methods
        makeLogPrefix(...args) {
            return this.sendToLogger && `[${args.join(' \u205D ')}]` || '';
        },
        uboLog(...args) {
            if ( this.sendToLogger === undefined ) { return; }
            if ( args === undefined || args[0] === '' ) { return; }
            return this.sendToLogger('info', ...args);
            
        },
        uboErr(...args) {
            if ( this.sendToLogger === undefined ) { return; }
            if ( args === undefined || args[0] === '' ) { return; }
            return this.sendToLogger('error', ...args);
        },
        escapeRegexChars(s) {
            return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        },
        initPattern(pattern, options = {}) {
            if ( pattern === '' ) {
                return { matchAll: true, expect: true };
            }
            const expect = (options.canNegate !== true || pattern.startsWith('!') === false);
            if ( expect === false ) {
                pattern = pattern.slice(1);
            }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match !== null ) {
                return {
                    re: new this.RegExp(
                        match[1],
                        match[2] || options.flags
                    ),
                    expect,
                };
            }
            if ( options.flags !== undefined ) {
                return {
                    re: new this.RegExp(this.escapeRegexChars(pattern),
                        options.flags
                    ),
                    expect,
                };
            }
            return { pattern, expect };
        },
        testPattern(details, haystack) {
            if ( details.matchAll ) { return true; }
            if ( details.re ) {
                return this.RegExp_test.call(details.re, haystack) === details.expect;
            }
            return haystack.includes(details.pattern) === details.expect;
        },
        patternToRegex(pattern, flags = undefined, verbatim = false) {
            if ( pattern === '' ) { return /^/; }
            const match = /^\/(.+)\/([gimsu]*)$/.exec(pattern);
            if ( match === null ) {
                const reStr = this.escapeRegexChars(pattern);
                return new RegExp(verbatim ? `^${reStr}$` : reStr, flags);
            }
            try {
                return new RegExp(match[1], match[2] || undefined);
            }
            catch {
            }
            return /^/;
        },
        getExtraArgs(args, offset = 0) {
            const entries = args.slice(offset).reduce((out, v, i, a) => {
                if ( (i & 1) === 0 ) {
                    const rawValue = a[i+1];
                    const value = /^\d+$/.test(rawValue)
                        ? parseInt(rawValue, 10)
                        : rawValue;
                    out.push([ a[i], value ]);
                }
                return out;
            }, []);
            return this.Object_fromEntries(entries);
        },
        onIdle(fn, options) {
            if ( self.requestIdleCallback ) {
                return self.requestIdleCallback(fn, options);
            }
            return self.requestAnimationFrame(fn);
        },
        offIdle(id) {
            if ( self.requestIdleCallback ) {
                return self.cancelIdleCallback(id);
            }
            return self.cancelAnimationFrame(id);
        }
    };
    scriptletGlobals.safeSelf = safe;
    if ( scriptletGlobals.bcSecret === undefined ) { return safe; }
    // This is executed only when the logger is opened
    safe.logLevel = scriptletGlobals.logLevel || 1;
    let lastLogType = '';
    let lastLogText = '';
    let lastLogTime = 0;
    safe.toLogText = (type, ...args) => {
        if ( args.length === 0 ) { return; }
        const text = `[${document.location.hostname || document.location.href}]${args.join(' ')}`;
        if ( text === lastLogText && type === lastLogType ) {
            if ( (Date.now() - lastLogTime) < 5000 ) { return; }
        }
        lastLogType = type;
        lastLogText = text;
        lastLogTime = Date.now();
        return text;
    };
    try {
        const bc = new self.BroadcastChannel(scriptletGlobals.bcSecret);
        let bcBuffer = [];
        safe.sendToLogger = (type, ...args) => {
            const text = safe.toLogText(type, ...args);
            if ( text === undefined ) { return; }
            if ( bcBuffer === undefined ) {
                return bc.postMessage({ what: 'messageToLogger', type, text });
            }
            bcBuffer.push({ type, text });
        };
        bc.onmessage = ev => {
            const msg = ev.data;
            switch ( msg ) {
            case 'iamready!':
                if ( bcBuffer === undefined ) { break; }
                bcBuffer.forEach(({ type, text }) =>
                    bc.postMessage({ what: 'messageToLogger', type, text })
                );
                bcBuffer = undefined;
                break;
            case 'setScriptletLogLevelToOne':
                safe.logLevel = 1;
                break;
            case 'setScriptletLogLevelToTwo':
                safe.logLevel = 2;
                break;
            }
        };
        bc.postMessage('areyouready?');
    } catch {
        safe.sendToLogger = (type, ...args) => {
            const text = safe.toLogText(type, ...args);
            if ( text === undefined ) { return; }
            safe.log(`AdReaper ${text}`);
        };
    }
    return safe;
}

/******************************************************************************/

const scriptletGlobals = {}; // eslint-disable-line
const argsList = [["script","/adblock/i"],["script","adBlockEnabled"],["script","\"Anzeige\""],["script","adserverDomain"],["script","Promise"],["script","/adbl/i"],["script","Reflect"],["script","document.write"],["script","deblocker"],["script","self == top"],["script","exdynsrv"],["script","/delete window|adserverDomain|FingerprintJS/"],["script","delete window"],["script","adsbygoogle"],["script","FingerprintJS"],["script","/h=decodeURIComponent|popundersPerIP/"],["script","/adblock.php"],["script","/adb/i"],["script","/document\\.createElement|\\.banner-in/"],["script","admbenefits"],["script","WebAssembly"],["script","/\\badblock\\b/"],["script","myreadCookie"],["script","ExoLoader"],["script","/?key.*open/","condition","key"],["script","adblock"],["script","homad"],["script","popUnderUrl"],["script","Adblock"],["script","/ABDetected|navigator.brave|fetch/"],["script","/ai_|b2a/"],["script","window.adblockDetector"],["script","DName"],["script","/bypass.php"],["script","htmls"],["script","/\\/detected\\.html|Adblock/"],["script","toast"],["script","AdbModel"],["script","/popup/i"],["script","antiAdBlockerHandler"],["script","/ad\\s?block|adsBlocked|document\\.write\\(unescape\\('|devtool/i"],["script","onerror"],["script","location.assign"],["script","location.href"],["script","/checkAdBlocker|AdblockRegixFinder/"],["script","catch"],["script","/adb_detected|;break;case \\$\\./"],["script","window.open"],["script","/aclib|break;|zoneNativeSett/"],["script","/fetch|popupshow/"],["script","justDetectAdblock"],["script","/FingerprintJS|openPopup/"],["script","DisableDevtool"],["script","popUp"],["script","/adsbygoogle|detectAdBlock/"],["script","onDevToolOpen"],["script","detectAdBlock"],["script","ctrlKey"],["script","HTMLAllCollection"],["script","DisplayAcceptableAdIfAdblocked"],["script","adslotFilledByCriteo"],["script","/==undefined.*body/"],["script","/popunder|isAdBlock|admvn.src/i"],["script","/h=decodeURIComponent|\"popundersPerIP\"/"],["script","popMagic"],["script","/popMagic|pop1stp/"],["script","/shown_at|WebAssembly/"],["script",";}}};break;case $."],["script","globalThis;break;case"],["script","{delete window["],["script","wpadmngr.com"],["script","/decodeURIComponent\\(escape|fairAdblock/"],["script","/ai_|googletag|adb/"],["script","ai_adb"],["script","\"v4ac1eiZr0\""],["script","admiral"],["script","'').split(',')[4]"],["script","/\"v4ac1eiZr0\"|\"\"\\)\\.split\\(\",\"\\)\\[4\\]|(\\.localStorage\\)|JSON\\.parse\\(\\w)\\.getItem\\(\"|\\)\\)\\]\\(\"_aQS0/"],["script","error-report.com"],["script","html-load.com"],["script","KCgpPT57bGV0IGU"],["script","adShield"],["script","Ad-Shield"],["script","adrecover.com"],["script","/bizx|prebid/"],["script","/WebAssembly|forceunder/"],["script","/isAdBlocked|popUnderUrl/"],["script","/adb|offsetWidth|eval/i"],["script","contextmenu"],["script","/adblock|var Data.*];/"],["script","var Data"],["script","replace"],["style","text-decoration"],["script","/break;case|FingerprintJS/"],["script","push"],["script","AdBlocker"],["script","clicky"],["script","XV"],["script","onload"],["script","charCodeAt"],["script","localStorage"],["script","popunder"],["script","adbl"],["script","googlesyndication"],["script","blockAdBlock"],["script","/adblock|location\\.replace/"],["script","/downloadJSAtOnload|Object.prototype.toString.call/"],["script","numberPages"],["script","brave"],["script","AreLoaded"],["script","AdblockRegixFinder"],["script","/adScript|adsBlocked/"],["script","serve"],["script","?metric=transit.counter&key=fail_redirect&tags="],["script","/pushAdTag|link_click|getAds/"],["script","/\\', [0-9]{5}\\)\\]\\; \\}/"],["script","/\\\",\\\"clickp\\\"\\:\\\"[0-9]{1,2}\\\"/"],["script","/ConsoleBan|alert|AdBlocker/"],["script","runPop"],["style","body:not(.ownlist)"],["script","mdpDeblocker"],["script","alert","condition","adblock"],["script","/deblocker|chp_ad/"],["script","await fetch"],["script","AdBlock"],["script","innerHTML"],["script","/'.adsbygoogle'|text-danger|warning|Adblock|_0x/"],["script","insertAdjacentHTML"],["script","popUnder"],["script","adb"],["#text","/スポンサーリンク|Sponsored Link|广告/"],["#text","スポンサーリンク"],["#text","スポンサードリンク"],["#text","/\\[vkExUnit_ad area=(after|before)\\]/"],["#text","【広告】"],["#text","【PR】"],["#text","関連動画"],["#text","PR:"],["script","leave_recommend"],["#text","/Advertisement/"],["script","navigator.brave"],["script","popundersPerIP"],["script","liedetector"],["script","popWin"],["script","end_click"],["script","ad blocker"],["script","closeAd"],["script","/adconfig/i"],["script","AdblockDetector"],["script","is_antiblock_refresh"],["script","/userAgent|adb|htmls/"],["script","myModal"],["script","app_checkext"],["script","clientHeight"],["script","Brave"],["script","await"],["script","offsetHeight"],["script","Object.keys(window.adngin).length"],["script","axios"],["script","/charAt|XMLHttpRequest/"],["script","AdBlockEnabled"],["script","window.location.replace"],["script","egoTab"],["script","/$.*(css|oncontextmenu)/"],["script","/eval.*RegExp/"],["script","wwads"],["script","/\\[\\'push\\'\\]/"],["script","/ads?Block/i"],["script","chkADB"],["script","Symbol.iterator"],["script","ai_cookie"],["script","/$.*open/"],["script","/innerHTML.*appendChild/"],["script","Exo"],["script","AaDetector"],["script","/window\\[\\'open\\'\\]/"],["script","Error"],["script","/document\\.head\\.appendChild|window\\.open/"],["script","pop1stp"],["script","Number"],["script","NEXT_REDIRECT"],["script","ad-block-activated"],["script","insertBefore"],["script","pop.doEvent"],["script","detect"],["script","fetch"],["script","/hasAdblock|detect/"],["script","document.createTextNode"],["script","shown_at"],["script","adsSrc"],["script","/adblock|popunder|openedPop|WebAssembly|wpadmngr/"],["script","/popMagic|nativeads|navigator\\.brave|\\.abk_msg|\\.innerHTML|ad block|manipulation/"],["script","window.warn"],["script","adBlock"],["script","adBlockDetected"],["script","open"],["script","/fetch|adb/i"],["script","location"],["script","showAd"],["script","imgSrc"],["script","document.createElement(\"script\")"],["script","antiAdBlock"],["script","/fairAdblock|popMagic/"],["script","/pop1stp|detectAdBlock/"],["script","aclib.runPop"],["script","mega-enlace.com/ext.php?o="],["script","Popup"],["script","displayAdsV3"],["script","adblocker"],["script","break;case"],["h2","/creeperhost/i"],["script","/interceptClickEvent|onbeforeunload|popMagic|location\\.replace/"],["script","/adserverDomain|\\);break;case /"],["script","initializeInterstitial"],["script","popupBackground"],["script","/h=decodeURIComponent|popundersPerIP|adserverDomain/"],["script","m9-ad-modal"],["script","Anzeige"],["script","blocking"],["script","adBlockNotice"],["script","LieDetector"],["script","advads"],["script","document.cookie"],["script","/h=decodeURIComponent|popundersPerIP|window\\.open|\\.createElement/"],["script","/_0x|brave|onerror/"],["script","window.googletag.pubads"],["script","kmtAdsData"],["script","wpadmngr"],["script","navigator.userAgent"],["script","checkAdBlock"],["script","detectedAdblock"],["script","setADBFlag"],["script","/h=decodeURIComponent|popundersPerIP|wpadmngr|popMagic/"],["script","/wpadmngr|adserverDomain/"],["script","/account_ad_blocker|tmaAB/"],["script","ads_block"],["script","/adserverDomain|delete window|FingerprintJS/"],["script","return a.split"],["script","/popundersPerIP|adserverDomain|wpadmngr/"],["script","==\"]"],["script","ads-blocked"],["script","#adbd"],["script","AdBl"],["script","/adblock|Cuba|noadb|popundersPerIP/i"],["script","/adserverDomain|ai_cookie/"],["script","/adsBlocked|\"popundersPerIP\"/"],["script","ab.php"],["script","wpquads_adblocker_check"],["script","__adblocker"],["script","/alert|brave|blocker/i"],["script","/eval|adb/i"],["script","catcher"],["script","/isAdBlockActive|WebAssembly/"],["script","videoList"],["script","freestar"],["script","ADBlock"],["script","/admiral/i"],["script","/AdBlock/i"],["script","/join\\(\\'\\'\\)/"],["script","/join\\(\\\"\\\"\\)/"],["script","api.dataunlocker.com"],["script","/^Function\\(\\\"/"],["script","vglnk"],["script","/detect|FingerprintJS/"],["script","/RegExp\\(\\'/","condition","RegExp"]];
const hostnamesMap = new Map([["faqwiki.*",0],["snapwordz.com",0],["toolxox.com",0],["rl6mans.com",0],["pandadoc.com",1],["web.de",2],["skidrowreloaded.com",[3,15]],["1337x.*",[3,15]],["1stream.eu",3],["4kwebplay.xyz",3],["anime4i.vip",3],["antennasports.ru",3],["buffsports.me",[3,67]],["buffstreams.app",3],["claplivehdplay.ru",[3,214]],["cracksports.me",[3,14]],["euro2024direct.ru",3],["ext.to",3],["extreme-down.*",3],["eztv.*",3],["eztvx.to",3],["flix-wave.*",3],["flixrave.me",3],["hikaritv.xyz",3],["kenitv.me",[3,14]],["lewblivehdplay.ru",[3,214]],["mixdrop.*",[3,15]],["mlbbite.net",3],["mlbstreams.ai",3],["qatarstreams.me",[3,14]],["qqwebplay.xyz",[3,214]],["rnbastreams.com",3],["sanet.*",3],["soccerworldcup.me",[3,14]],["sportshd.*",3],["topstreams.info",3],["totalsportek.to",3],["tvableon.me",[3,14]],["vibestreams.*",3],["viwlivehdplay.ru",3],["x1337x.*",3],["wawacity.*",3],["720pstream.*",[3,67]],["embedsports.me",[3,93]],["embedstream.me",[3,14,15,67,93]],["jumbtv.com",[3,93]],["reliabletv.me",[3,93]],["topembed.pw",[3,69,214]],["crackstreamer.net",3],["methstreamer.com",3],["vidsrc.*",[3,14,67]],["vidco.pro",[3,67]],["moviepilot.de",[4,59]],["userupload.*",5],["cinedesi.in",5],["intro-hd.net",5],["monacomatin.mc",5],["nodo313.net",5],["hesgoal-tv.io",5],["hesgoal-vip.io",5],["earn.punjabworks.com",5],["mahajobwala.in",5],["solewe.com",5],["panel.play.hosting",5],["pahe.*",[6,15,69]],["soap2day.*",6],["yts.mx",7],["magesypro.com",8],["pinsystem.co.uk",8],["elrellano.com",8],["tinyppt.com",8],["veganab.co",8],["camdigest.com",8],["learnmany.in",8],["amanguides.com",[8,37]],["highkeyfinance.com",[8,37]],["appkamods.com",8],["techacode.com",8],["djqunjab.in",8],["downfile.site",8],["expertvn.com",8],["trangchu.news",8],["3dmodelshare.org",8],["nulleb.com",8],["asiaon.top",8],["reset-scans.*",8],["coursesghar.com",8],["thecustomrom.com",8],["snlookup.com",8],["bingotingo.com",8],["ghior.com",8],["3dmili.com",8],["karanpc.com",8],["plc247.com",8],["apkdelisi.net",8],["freepasses.org",8],["poplinks.*",[8,41]],["tomarnarede.pt",8],["basketballbuzz.ca",8],["dribbblegraphics.com",8],["kemiox.com",8],["teksnologi.com",8],["bharathwick.com",8],["descargaspcpro.net",8],["dx-tv.com",[8,15]],["rt3dmodels.com",8],["plc4me.com",8],["blisseyhusbands.com",8],["mhdsports.*",8],["mhdsportstv.*",8],["mhdtvsports.*",8],["mhdtvworld.*",8],["mhdtvmax.*",8],["mhdstream.*",8],["madaradex.org",8],["trigonevo.com",8],["franceprefecture.fr",8],["jazbaat.in",8],["aipebel.com",8],["audiotools.blog",8],["embdproxy.xyz",8],["hqq.*",9],["waaw.*",9],["pixhost.*",10],["vipbox.*",11],["telerium.*",12],["apex2nova.com",12],["hoca5.com",12],["germancarforum.com",13],["cybercityhelp.in",13],["innateblogger.com",13],["omeuemprego.online",13],["viprow.*",[14,15,67]],["bluemediadownload.*",14],["bluemediafile.*",14],["bluemedialink.*",14],["bluemediastorage.*",14],["bluemediaurls.*",14],["urlbluemedia.*",14],["bowfile.com",14],["cloudvideo.tv",[14,67]],["cloudvideotv.*",[14,67]],["coloredmanga.com",14],["exeo.app",14],["hiphopa.net",[14,15]],["megaup.net",14],["olympicstreams.co",[14,67]],["tv247.us",[14,15]],["uploadhaven.com",14],["userscloud.com",[14,67]],["streamnoads.com",[14,15,67,85]],["mlbbox.me",14],["vikingf1le.us.to",14],["neodrive.xyz",14],["mdfx9dc8n.net",15],["mdzsmutpcvykb.net",15],["mixdrop21.net",15],["mixdropjmk.pw",15],["123-movies.*",15],["123movieshd.*",15],["123movieshub.*",15],["123moviesme.*",15],["1337x.ninjaproxy1.com",15],["141jav.com",15],["1bit.space",15],["1bitspace.com",15],["1stream.*",15],["1tamilmv.*",15],["2ddl.*",15],["2umovies.*",15],["345movies.com",15],["3dporndude.com",15],["3hiidude.*",15],["4archive.org",15],["4horlover.com",15],["4stream.*",15],["560pmovie.com",15],["5movies.*",15],["7hitmovies.*",15],["85tube.com",15],["85videos.com",15],["9xmovie.*",15],["aagmaal.*",[15,67]],["acefile.co",15],["actusports.eu",15],["adblockeronstape.*",[15,85]],["adblockeronstreamtape.*",15],["adblockplustape.*",[15,85]],["adblockstreamtape.*",[15,85]],["adblockstrtape.*",[15,85]],["adblockstrtech.*",[15,85]],["adblocktape.*",[15,85]],["adclickersbot.com",15],["adcorto.*",15],["adricami.com",15],["adslink.pw",15],["adultstvlive.com",15],["adz7short.space",15],["aeblender.com",15],["ahdafnews.blogspot.com",15],["aiblog.tv",[15,70]],["ak47sports.com",15],["akuma.moe",15],["alexsports.*",15],["alexsportss.*",15],["alexsportz.*",15],["allplayer.tk",15],["amateurblog.tv",[15,70]],["androidadult.com",[15,240]],["anhsexjav.xyz",15],["anidl.org",15],["anime-loads.org",15],["animeblkom.net",15],["animefire.plus",15],["animelek.me",15],["animepahe.*",15],["animesanka.*",15],["animespire.net",15],["animestotais.xyz",15],["animeyt.es",15],["animixplay.*",15],["aniplay.*",15],["anroll.net",15],["antiadtape.*",[15,85]],["anymoviess.xyz",15],["aotonline.org",15],["asenshu.com",15],["asialiveaction.com",15],["asianclipdedhd.net",15],["asianclub.*",15],["ask4movie.*",15],["askim-bg.com",15],["asumsikedaishop.com",15],["atomixhq.*",[15,67]],["atomohd.*",15],["avcrempie.com",15],["avseesee.com",15],["gettapeads.com",[15,85]],["backfirstwo.com",15],["bajarjuegospcgratis.com",15],["balkanportal.net",15],["balkanteka.net",15],["bdnewszh.com",[15,67]],["beinmatch.*",[15,24]],["belowporn.com",15],["bestgirlsexy.com",15],["bestnhl.com",15],["bestporn4free.com",15],["bestporncomix.com",15],["bet36.es",15],["bgwp.cc",[15,20]],["bhaai.*",15],["bikinitryon.net",15],["birdurls.com",15],["bitsearch.to",15],["blackcockadventure.com",15],["blackcockchurch.org",15],["blackporncrazy.com",15],["blizzboygames.net",15],["blizzpaste.com",15],["blkom.com",15],["blog-peliculas.com",15],["blogtrabalhista.com",15],["blurayufr.*",15],["bobsvagene.club",15],["bolly4umovies.click",15],["bonusharian.pro",15],["brilian-news.id",15],["brupload.net",15],["bucitana.com",15],["buffstreams.*",15],["buzter.xyz",15],["camchickscaps.com",15],["camgirlcum.com",15],["camgirls.casa",15],["canalesportivo.*",15],["cashurl.in",15],["castingx.net",15],["ccurl.net",[15,67]],["celebrity-leaks.net",15],["cgpelis.net",15],["charexempire.com",15],["choosingnothing.com",15],["clasico.tv",15],["clickndownload.*",15],["clicknupload.*",15],["clik.pw",15],["coin-free.com",[15,34]],["coins100s.fun",15],["comicsmanics.com",15],["compucalitv.com",15],["coolcast2.com",15],["coreradio.online",15],["cosplaytab.com",15],["countylocalnews.com",15],["cpmlink.net",15],["crackstreamshd.click",15],["crespomods.com",15],["crisanimex.com",15],["crunchyscan.fr",15],["cuevana3.fan",15],["cuevana3hd.com",15],["cumception.com",15],["cutpaid.com",15],["daddylive.*",[15,67,212]],["daddylivehd.*",[15,67]],["dailyuploads.net",15],["datawav.club",15],["daughtertraining.com",15],["ddrmovies.*",15],["deepgoretube.site",15],["deltabit.co",15],["deporte-libre.top",15],["depvailon.com",15],["derleta.com",15],["desiremovies.*",15],["desivdo.com",15],["desixx.net",15],["detikkebumen.com",15],["deutschepornos.me",15],["devlib.*",15],["diasoft.xyz",15],["directupload.net",15],["diskusscan.com",15],["divxtotal.*",15],["divxtotal1.*",15],["dixva.com",15],["dlhd.*",15],["doctormalay.com",15],["dofusports.xyz",15],["dogemate.com",15],["doods.cam",15],["doodskin.lat",15],["downloadrips.com",15],["downvod.com",15],["dphunters.mom",15],["dragontranslation.com",15],["dvdfullestrenos.com",15],["dvdplay.*",[15,67]],["ebookbb.com",15],["ebookhunter.net",15],["egyanime.com",15],["egygost.com",15],["egyshare.cc",15],["ekasiwap.com",15],["electro-torrent.pl",15],["elil.cc",15],["elixx.*",15],["enjoy4k.*",15],["eplayer.click",15],["erovoice.us",15],["eroxxx.us",15],["estrenosdoramas.net",15],["estrenosflix.*",15],["estrenosflux.*",15],["estrenosgo.*",15],["everia.club",15],["everythinginherenet.blogspot.com",15],["extrafreetv.com",15],["extremotvplay.com",15],["f1stream.*",15],["fapinporn.com",15],["fapptime.com",15],["fastreams.live",15],["faucethero.com",15],["fbstream.*",15],["fembed.com",15],["femdom-joi.com",15],["fenixsite.net",15],["file4go.*",15],["filegram.to",[15,70]],["fileone.tv",15],["film1k.com",15],["filmeonline2023.net",15],["filmesonlinex.org",15],["filmesonlinexhd.biz",[15,67]],["filmovitica.com",15],["filmymaza.blogspot.com",15],["filmyzilla.*",[15,67]],["filthy.family",15],["findav.*",15],["findporn.*",15],["fixfinder.click",15],["flixmaza.*",15],["flizmovies.*",15],["flostreams.xyz",15],["flyfaucet.com",15],["footyhunter.lol",15],["forex-trnd.com",15],["forumchat.club",15],["forumlovers.club",15],["freemoviesonline.biz",15],["freeomovie.co.in",15],["freeomovie.to",15],["freeporncomic.net",15],["freepornhdonlinegay.com",15],["freeproxy.io",15],["freetvsports.*",15],["freeuse.me",15],["freeusexporn.com",15],["fsharetv.cc",15],["fsicomics.com",15],["fullymaza.*",15],["g3g.*",15],["galinhasamurai.com",15],["gamepcfull.com",15],["gameronix.com",15],["gamesfullx.com",15],["gameshdlive.net",15],["gamesmountain.com",15],["gamesrepacks.com",15],["gamingguru.fr",15],["gamovideo.com",15],["garota.cf",15],["gaydelicious.com",15],["gaypornhot.com",15],["gaypornmasters.com",15],["gaysex69.net",15],["gemstreams.com",15],["get-to.link",15],["girlscanner.org",15],["giurgiuveanul.ro",15],["gledajcrtace.xyz",15],["gocast2.com",15],["gomo.to",15],["gostosa.cf",15],["gotxx.*",15],["grantorrent.*",15],["gravureblog.tv",[15,70]],["gtlink.co",15],["gwiazdypornosow.pl",15],["haho.moe",15],["hatsukimanga.com",15],["hayhd.net",15],["hdmoviesfair.*",[15,67]],["hdmoviesflix.*",15],["hdsaprevodom.com",15],["hdstreamss.club",15],["hentais.tube",15],["hentaistream.co",15],["hentaitk.net",15],["hentaitube.online",15],["hentaiworld.tv",15],["hesgoal.tv",15],["hexupload.net",15],["hhkungfu.tv",15],["highlanderhelp.com",15],["hiidudemoviez.*",15],["hindimean.com",15],["hindimovies.to",[15,67]],["hindimoviestv.com",15],["hiperdex.com",15],["hispasexy.org",15],["hitprn.com",15],["hoca4u.com",15],["hollymoviehd.cc",15],["hoodsite.com",15],["hopepaste.download",15],["hornylips.com",15],["hotgranny.live",15],["hotmama.live",15],["hqcelebcorner.net",15],["huren.best",15],["hwnaturkya.com",[15,67]],["hxfile.co",[15,67]],["igfap.com",15],["iklandb.com",15],["illink.net",15],["imgkings.com",15],["imgsen.*",15],["imgsex.xyz",15],["imgsto.*",15],["imx.to",15],["incest.*",15],["incestflix.*",15],["influencersgonewild.org",15],["infosgj.free.fr",15],["investnewsbrazil.com",15],["itdmusics.com",15],["itopmusic.*",15],["itsuseful.site",15],["itunesfre.com",15],["iwatchfriendsonline.net",[15,142]],["jackstreams.com",15],["jatimupdate24.com",15],["jav-fun.cc",15],["jav-noni.cc",15],["jav-scvp.com",15],["javboys.tv",15],["javcl.com",15],["javf.net",15],["javhay.net",15],["javhoho.com",15],["javhun.com",15],["javleak.com",15],["javmost.*",15],["javporn.best",15],["javsek.net",15],["javsex.to",15],["javtiful.com",[15,17]],["jimdofree.com",15],["jiofiles.org",15],["jorpetz.com",15],["jp-films.com",15],["jpop80ss3.blogspot.com",15],["jpopsingles.eu",[15,189]],["kantotflix.net",15],["kantotinyo.com",15],["kaoskrew.org",15],["kaplog.com",15],["keeplinks.*",15],["keepvid.*",15],["keralahd.*",15],["keralatvbox.com",15],["khatrimazaful.*",15],["khatrimazafull.*",[15,70]],["kickassanimes.io",15],["kimochi.info",15],["kimochi.tv",15],["kinemania.tv",15],["kissasian.*",15],["konstantinova.net",15],["koora-online.live",15],["kunmanga.com",15],["kutmoney.com",15],["kwithsub.com",15],["lat69.me",15],["latinblog.tv",[15,70]],["latinomegahd.net",15],["leechall.*",15],["leechpremium.link",15],["legendas.dev",15],["legendei.net",15],["lightdlmovies.blogspot.com",15],["lighterlegend.com",15],["linclik.com",15],["linkebr.com",15],["linkrex.net",15],["linkshorts.*",15],["lulu.st",15],["lulustream.com",[15,69]],["luluvdo.com",15],["manga-oni.com",15],["mangaboat.com",15],["mangagenki.me",15],["mangahere.onl",15],["mangaweb.xyz",15],["mangoporn.net",15],["mangovideo.*",15],["manhwahentai.me",15],["masahub.com",15],["masahub.net",15],["masaporn.*",15],["maturegrannyfuck.com",15],["mdy48tn97.com",15],["mediapemersatubangsa.com",15],["mega-mkv.com",15],["megapastes.com",15],["megapornpics.com",15],["messitv.net",15],["meusanimes.net",15],["milfmoza.com",15],["milfzr.com",15],["millionscast.com",15],["mimaletamusical.blogspot.com",15],["miniurl.*",15],["mirrorace.*",15],["mitly.us",15],["mixdroop.*",15],["mkv-pastes.com",15],["mkvcage.*",15],["mlbstream.*",15],["mlsbd.*",15],["mmsbee.*",15],["monaskuliner.ac.id",15],["moredesi.com",15],["motogpstream.*",15],["movgotv.net",15],["movi.pk",15],["movieplex.*",15],["movierulzlink.*",15],["movies123.*",15],["moviesflix.*",15],["moviesmeta.*",15],["moviessources.*",15],["moviesverse.*",15],["movieswbb.com",15],["moviewatch.com.pk",15],["moviezwaphd.*",15],["mp4upload.com",15],["mrskin.live",15],["mrunblock.*",15],["multicanaistv.com",15],["mundowuxia.com",15],["myeasymusic.ir",15],["myonvideo.com",15],["myyouporn.com",15],["mzansifun.com",15],["narutoget.info",15],["naughtypiss.com",15],["nbastream.*",15],["nekopoi.*",[15,70]],["nerdiess.com",15],["netfuck.net",15],["new-fs.eu",15],["newmovierulz.*",15],["newtorrentgame.com",15],["neymartv.net",15],["nflstream.*",15],["nflstreams.me",15],["nhlstream.*",15],["nicekkk.com",15],["nicesss.com",15],["nlegs.com",15],["noblocktape.*",[15,85]],["nocensor.*",15],["nolive.me",[15,67]],["notformembersonly.com",15],["novamovie.net",15],["novelpdf.xyz",15],["novelssites.com",[15,67]],["novelup.top",15],["nsfwr34.com",15],["nu6i-bg-net.com",15],["nudebabesin3d.com",15],["nukedfans.com",15],["nuoga.eu",15],["nzbstars.com",15],["o2tvseries.com",15],["ohjav.com",15],["ojearnovelas.com",15],["okanime.xyz",15],["olweb.tv",15],["on9.stream",15],["onepiece-mangaonline.com",15],["onifile.com",15],["onionstream.live",15],["onlinesaprevodom.net",15],["onlyfams.*",15],["onlyfullporn.video",15],["onplustv.live",15],["originporn.com",15],["ouo.*",15],["ovagames.com",15],["ovamusic.com",15],["packsporn.com",15],["pahaplayers.click",15],["palimas.org",15],["password69.com",15],["pastemytxt.com",15],["payskip.org",15],["pctfenix.*",[15,67]],["pctnew.*",[15,67]],["peeplink.in",15],["peliculas24.*",15],["peliculasmx.net",15],["pelisplus.*",15],["pervertgirlsvideos.com",15],["pervyvideos.com",15],["phim12h.com",15],["picdollar.com",15],["pickteenz.com",15],["picsxxxporn.com",15],["pinayscandalz.com",15],["pinkueiga.net",15],["piratebay.*",15],["piratefast.xyz",15],["piratehaven.xyz",15],["pirateiro.com",15],["pirlotvonline.org",15],["playtube.co.za",15],["plugintorrent.com",15],["plyjam.*",15],["plylive.*",15],["plyvdo.*",15],["pmvzone.com",15],["porndish.com",15],["pornez.net",15],["pornfetishbdsm.com",15],["pornfits.com",15],["pornhd720p.com",15],["pornhoarder.*",[15,233]],["pornobr.club",15],["pornobr.ninja",15],["pornodominicano.net",15],["pornofaps.com",15],["pornoflux.com",15],["pornotorrent.com.br",15],["pornredit.com",15],["pornstarsyfamosas.es",15],["pornstreams.co",15],["porntn.com",15],["pornxbit.com",15],["pornxday.com",15],["portaldasnovinhas.shop",15],["portugues-fcr.blogspot.com",15],["poscitesch.com",[15,67]],["poseyoung.com",15],["pover.org",15],["prbay.*",15],["projectfreetv.*",15],["proxybit.*",15],["proxyninja.org",15],["psarips.*",15],["pubfilmz.com",15],["publicsexamateurs.com",15],["punanihub.com",15],["putlocker5movies.org",15],["pxxbay.com",15],["r18.best",15],["racaty.*",15],["ragnaru.net",15],["rapbeh.net",15],["rapelust.com",15],["rapload.org",15],["read-onepiece.net",15],["readhunters.xyz",15],["remaxhd.*",15],["retro-fucking.com",15],["retrotv.org",15],["rintor.*",15],["rnbxclusive.*",15],["rnbxclusive0.*",15],["rnbxclusive1.*",15],["robaldowns.com",15],["rockdilla.com",15],["rojadirecta.*",15],["rojadirectaenvivo.*",15],["rojadirectatvenvivo.com",15],["rojitadirecta.blogspot.com",15],["romancetv.site",15],["rsoccerlink.site",15],["rugbystreams.*",15],["rule34.club",15],["rule34hentai.net",15],["rumahbokep-id.com",15],["sadisflix.*",15],["safego.cc",15],["safetxt.*",15],["sakurafile.com",15],["samax63.lol",15],["satoshi-win.xyz",15],["savefiles.com",[15,65,251]],["scat.gold",15],["scatfap.com",15],["scatkings.com",15],["scnlog.me",15],["scripts-webmasters.net",15],["serie-turche.com",15],["serijefilmovi.com",15],["sexcomics.me",15],["sexdicted.com",15],["sexgay18.com",15],["sexiezpix.com",15],["sexofilm.co",15],["sextgem.com",15],["sextubebbw.com",15],["sgpics.net",15],["shadowrangers.*",15],["shadowrangers.live",15],["shahee4u.cam",15],["shahi4u.*",15],["shahid4u1.*",15],["shahid4uu.*",15],["shahiid-anime.net",15],["shavetape.*",15],["shemale6.com",15],["shid4u.*",15],["shinden.pl",15],["short.es",15],["shortearn.*",15],["shorten.*",15],["shorttey.*",15],["shortzzy.*",15],["showmanga.blog.fc2.com",15],["shrt10.com",15],["shurt.pw",15],["sideplusleaks.net",15],["silverblog.tv",[15,70]],["silverpic.com",15],["sinhalasub.life",15],["sinsitio.site",15],["sinvida.me",15],["skidrowcpy.com",15],["skidrowfull.com",15],["skymovieshd.*",15],["slut.mom",15],["smallencode.me",15],["smoner.com",15],["smplace.com",15],["soccerinhd.com",[15,67]],["socceron.name",15],["socceronline.*",[15,67]],["socialblog.tv",[15,70]],["softairbay.com",15],["softarchive.*",15],["sokobj.com",15],["songsio.com",15],["souexatasmais.com",15],["sportbar.live",15],["sports-stream.*",15],["sportstream1.cfd",15],["sporttuna.*",15],["srt.am",15],["srts.me",15],["sshhaa.*",15],["stapadblockuser.*",[15,85]],["stape.*",[15,85]],["stapewithadblock.*",15],["starblog.tv",[15,70]],["starmusiq.*",15],["stbemuiptv.com",15],["stockingfetishvideo.com",15],["strcloud.*",[15,85]],["stream.crichd.vip",15],["stream.lc",15],["stream25.xyz",15],["streamadblocker.*",[15,67,85]],["streamadblockplus.*",[15,85]],["streambee.to",15],["streambucket.net",15],["streamcdn.*",15],["streamcenter.pro",15],["streamers.watch",15],["streamgo.to",15],["streamhub.*",15],["streamkiste.tv",15],["streamoupload.xyz",15],["streamservicehd.click",15],["streamsport.*",15],["streamta.*",[15,85]],["streamtape.*",[15,85]],["streamtapeadblockuser.*",[15,85]],["streamvid.net",[15,25]],["strikeout.*",[15,69]],["strtape.*",[15,85]],["strtapeadblock.*",[15,85]],["strtapeadblocker.*",[15,85]],["strtapewithadblock.*",15],["strtpe.*",[15,85]],["subtitleporn.com",15],["subtitles.cam",15],["suicidepics.com",15],["supertelevisionhd.com",15],["supexfeeds.com",15],["swatchseries.*",15],["swiftload.io",15],["swipebreed.net",15],["swzz.xyz",15],["sxnaar.com",15],["tabooflix.*",15],["tabooporns.com",15],["taboosex.club",15],["tapeantiads.com",[15,85]],["tapeblocker.com",[15,85]],["tapenoads.com",[15,85]],["tapewithadblock.org",[15,85,264]],["teamos.xyz",15],["teen-wave.com",15],["teenporncrazy.com",15],["telegramgroups.xyz",15],["telenovelasweb.com",15],["tennisstreams.*",15],["tensei-shitara-slime-datta-ken.com",15],["tfp.is",15],["tgo-tv.co",[15,67]],["thaihotmodels.com",15],["theblueclit.com",15],["thebussybandit.com",15],["thedaddy.to",[15,212]],["theicongenerator.com",15],["thelastdisaster.vip",15],["themoviesflix.*",15],["thepiratebay.*",15],["thepiratebay0.org",15],["thepiratebay10.info",15],["thesexcloud.com",15],["thothub.today",15],["tightsexteens.com",15],["tmearn.*",15],["tojav.net",15],["tokusatsuindo.com",15],["toonanime.*",15],["top16.net",15],["topdrama.net",15],["topvideosgay.com",15],["torlock.*",15],["tormalayalam.*",15],["torrage.info",15],["torrents.vip",15],["torrentz2eu.*",15],["torrsexvid.com",15],["tpb-proxy.xyz",15],["trannyteca.com",15],["trendytalker.com",15],["tumanga.net",15],["turbogvideos.com",15],["turbovid.me",15],["turkishseriestv.org",15],["turksub24.net",15],["tutele.sx",15],["tutelehd.*",15],["tvglobe.me",15],["tvpclive.com",15],["tvply.*",15],["tvs-widget.com",15],["tvseries.video",15],["u4m.*",15],["ucptt.com",15],["ufaucet.online",15],["ufcfight.online",15],["ufcstream.*",15],["ultrahorny.com",15],["ultraten.net",15],["unblocknow.*",15],["unblockweb.me",15],["underhentai.net",15],["uniqueten.net",15],["upbaam.com",15],["uploadbuzz.*",15],["upstream.to",15],["usagoals.*",15],["valhallas.click",[15,141]],["valeriabelen.com",15],["verdragonball.online",15],["vexmoviex.*",15],["vfxmed.com",15],["vidclouds.*",15],["video.az",15],["videostreaming.rocks",15],["videowood.tv",15],["vidlox.*",15],["vidorg.net",15],["vidtapes.com",15],["vidz7.com",15],["vikistream.com",15],["vikv.net",15],["vinovo.to",15],["vipboxtv.*",[15,67]],["vipleague.*",[15,236]],["virpe.cc",15],["visifilmai.org",15],["viveseries.com",15],["vladrustov.sx",15],["volokit2.com",[15,212]],["vstorrent.org",15],["w-hentai.com",15],["watch-series.*",15],["watchbrooklynnine-nine.com",15],["watchelementaryonline.com",15],["watchjavidol.com",15],["watchkobestreams.info",15],["watchlostonline.net",15],["watchmonkonline.com",15],["watchrulesofengagementonline.com",15],["watchseries.*",15],["watchthekingofqueens.com",15],["webcamrips.com",15],["wincest.xyz",15],["wolverdon.fun",15],["wordcounter.icu",15],["worldmovies.store",15],["worldstreams.click",15],["wpdeployit.com",15],["wqstreams.tk",15],["wwwsct.com",15],["xanimeporn.com",15],["xblog.tv",[15,70]],["xclusivejams.*",15],["xmoviesforyou.*",15],["xn--verseriesespaollatino-obc.online",15],["xn--xvideos-espaol-1nb.com",15],["xpornium.net",15],["xsober.com",15],["xvip.lat",15],["xxgasm.com",15],["xxvideoss.org",15],["xxx18.uno",15],["xxxdominicana.com",15],["xxxfree.watch",15],["xxxmax.net",15],["xxxwebdlxxx.top",15],["xxxxvideo.uno",15],["y2b.wiki",15],["y2tube.pro",15],["yabai.si",15],["yadixv.com",15],["yayanimes.net",15],["yeshd.net",15],["youdbox.*",15],["youjax.com",15],["yourdailypornvideos.ws",15],["yourupload.com",15],["youswear.com",15],["ytmp3eu.*",15],["yts-subs.*",15],["yts.*",15],["ytstv.me",15],["zerion.cc",15],["zerocoin.top",15],["zitss.xyz",15],["zooqle.*",15],["zpaste.net",15],["freeshot.live",15],["fastreams.com",15],["redittsports.com",15],["sky-sports.store",15],["streamsoccer.site",15],["tntsports.store",15],["wowstreams.co",15],["zdsptv.com",15],["tuktukcinma.com",15],["dutchycorp.*",16],["faucet.ovh",16],["mmacore.tv",17],["nxbrew.net",17],["oko.sh",18],["variety.com",19],["gameskinny.com",19],["deadline.com",19],["mlive.com",[19,77]],["doujindesu.*",20],["atlasstudiousa.com",20],["51bonusrummy.in",[20,70]],["washingtonpost.com",21],["gosexpod.com",22],["sexo5k.com",23],["truyen-hentai.com",23],["theshedend.com",25],["zeroupload.com",25],["securenetsystems.net",25],["miniwebtool.com",25],["bchtechnologies.com",25],["eracast.cc",25],["flatai.org",25],["spiegel.de",26],["jacquieetmichel.net",27],["hausbau-forum.de",28],["althub.club",28],["kiemlua.com",28],["tea-coffee.net",29],["spatsify.com",29],["newedutopics.com",29],["getviralreach.in",29],["edukaroo.com",29],["funkeypagali.com",29],["careersides.com",29],["nayisahara.com",29],["wikifilmia.com",29],["infinityskull.com",29],["viewmyknowledge.com",29],["iisfvirtual.in",29],["starxinvestor.com",29],["jkssbalerts.com",29],["imagereviser.com",30],["labgame.io",[31,32]],["kenzo-flowertag.com",33],["mdn.lol",33],["btcbitco.in",34],["btcsatoshi.net",34],["cempakajaya.com",34],["crypto4yu.com",34],["gainl.ink",34],["manofadan.com",34],["readbitcoin.org",34],["wiour.com",34],["tremamnon.com",34],["bitsmagic.fun",34],["ourcoincash.xyz",34],["blog.cryptowidgets.net",35],["blog.insurancegold.in",35],["blog.wiki-topia.com",35],["blog.coinsvalue.net",35],["blog.cookinguide.net",35],["blog.freeoseocheck.com",35],["aylink.co",36],["sugarona.com",37],["nishankhatri.xyz",37],["cety.app",38],["exe-urls.com",38],["exego.app",38],["cutlink.net",38],["cutsy.net",38],["cutyurls.com",38],["cutty.app",38],["cutnet.net",38],["jixo.online",38],["tinys.click",39],["loan.creditsgoal.com",39],["rupyaworld.com",39],["vahantoday.com",39],["techawaaz.in",39],["loan.bgmi32bitapk.in",39],["formyanime.com",39],["gsm-solution.com",39],["h-donghua.com",39],["hindisubbedacademy.com",39],["hm4tech.info",39],["mydverse.*",39],["ripexbooster.xyz",39],["serial4.com",39],["tutorgaming.com",39],["everydaytechvams.com",39],["dipsnp.com",39],["cccam4sat.com",39],["diendancauduong.com",39],["zeemoontv-24.blogspot.com",39],["stitichsports.com",39],["aiimgvlog.fun",40],["appsbull.com",41],["diudemy.com",41],["maqal360.com",41],["androjungle.com",41],["bookszone.in",41],["drakescans.com",41],["shortix.co",41],["makefreecallsonline.com",41],["msonglyrics.com",41],["app-sorteos.com",41],["bokugents.com",41],["client.pylexnodes.net",41],["btvplus.bg",41],["listar-mc.net",41],["blog24.me",[42,43]],["coingraph.us",44],["impact24.us",44],["iconicblogger.com",45],["auto-crypto.click",45],["tpi.li",46],["oii.la",[46,69]],["shrinke.*",47],["shrinkme.*",47],["smutty.com",47],["e-sushi.fr",47],["gayforfans.com",47],["freeadultcomix.com",47],["down.dataaps.com",47],["filmweb.pl",47],["livecamrips.*",47],["safetxt.net",47],["filespayouts.com",47],["atglinks.com",48],["kbconlinegame.com",49],["hamrojaagir.com",49],["odijob.com",49],["stfly.biz",50],["airevue.net",50],["atravan.net",50],["simana.online",51],["fooak.com",51],["joktop.com",51],["evernia.site",51],["falpus.com",51],["rfiql.com",52],["gujjukhabar.in",52],["smartfeecalculator.com",52],["djxmaza.in",52],["thecubexguide.com",52],["jytechs.in",52],["financacerta.com",53],["encurtads.net",53],["mastkhabre.com",54],["weshare.is",55],["rokni.xyz",56],["keedabankingnews.com",56],["pig69.com",56],["cosplay18.pics",56],["3dsfree.org",57],["actvid.*",58],["gomovies.sx",58],["zoechip.com",58],["nohost.one",58],["vidbinge.com",58],["hurawatch.*",[58,67]],["alpin.de",59],["boersennews.de",59],["chefkoch.de",59],["chip.de",59],["clever-tanken.de",59],["desired.de",59],["donnerwetter.de",59],["fanfiktion.de",59],["focus.de",59],["formel1.de",59],["frustfrei-lernen.de",59],["gewinnspiele.tv",59],["giga.de",59],["gut-erklaert.de",59],["kino.de",59],["messen.de",59],["nickles.de",59],["nordbayern.de",59],["spielfilm.de",59],["teltarif.de",[59,60]],["unsere-helden.com",59],["weltfussball.at",59],["watson.de",59],["mactechnews.de",59],["sport1.de",59],["welt.de",59],["sport.de",59],["allthingsvegas.com",61],["100percentfedup.com",61],["beforeitsnews.com",61],["concomber.com",61],["conservativefiringline.com",61],["dailylol.com",61],["funnyand.com",61],["letocard.fr",61],["mamieastuce.com",61],["meilleurpronostic.fr",61],["patriotnationpress.com",61],["toptenz.net",61],["vitamiiin.com",61],["writerscafe.org",61],["populist.press",61],["dailytruthreport.com",61],["livinggospeldaily.com",61],["first-names-meanings.com",61],["welovetrump.com",61],["thehayride.com",61],["thelibertydaily.com",61],["thepoke.co.uk",61],["thepolitistick.com",61],["theblacksphere.net",61],["shark-tank.com",61],["naturalblaze.com",61],["greatamericanrepublic.com",61],["dailysurge.com",61],["truthlion.com",61],["flagandcross.com",61],["westword.com",61],["republicbrief.com",61],["freedomfirstnetwork.com",61],["phoenixnewtimes.com",61],["designbump.com",61],["clashdaily.com",61],["madworldnews.com",61],["reviveusa.com",61],["sonsoflibertymedia.com",61],["thedesigninspiration.com",61],["videogamesblogger.com",61],["protrumpnews.com",61],["thepalmierireport.com",61],["kresy.pl",61],["thepatriotjournal.com",61],["thegatewaypundit.com",61],["wltreport.com",61],["miaminewtimes.com",61],["politicalsignal.com",61],["rightwingnews.com",61],["bigleaguepolitics.com",61],["comicallyincorrect.com",61],["upornia.com",62],["pillowcase.su",63],["cine-calidad.*",64],["veryfreeporn.com",64],["theporngod.com",64],["besthdgayporn.com",65],["drivenime.com",65],["erothots1.com",65],["javup.org",65],["shemaleup.net",65],["transflix.net",65],["worthcrete.com",65],["hentaihere.com",66],["player.smashy.stream",66],["player.smashystream.com",66],["123movies.*",67],["123moviesla.*",67],["123movieweb.*",67],["2embed.*",67],["9xmovies.*",67],["adsh.cc",67],["adshort.*",67],["afilmyhouse.blogspot.com",67],["ak.sv",67],["allmovieshub.*",67],["animesultra.com",67],["api.webs.moe",67],["apkmody.io",67],["asianplay.*",67],["atishmkv.*",67],["attvideo.com",67],["backfirstwo.site",67],["bflix.*",67],["crazyblog.in",67],["cricstream.*",67],["crictime.*",67],["cuervotv.me",[67,141]],["divicast.com",67],["dlhd.so",67],["dood.*",[67,190]],["dooood.*",[67,190]],["embed.meomeo.pw",67],["extramovies.*",67],["faselhd.*",67],["faselhds.*",67],["filemoon.*",67],["filmeserialeonline.org",67],["filmy.*",67],["filmyhit.*",67],["filmywap.*",67],["flexyhit.com",67],["fmovies.*",67],["foreverwallpapers.com",67],["french-streams.cc",67],["fslinks.org",67],["gdplayer.*",67],["goku.*",67],["gomovies.*",67],["gowatchseries.*",67],["hdfungamezz.*",67],["hdtoday.to",67],["hinatasoul.com",67],["hindilinks4u.*",67],["igg-games.com",67],["infinityscans.net",67],["jalshamoviezhd.*",67],["livecricket.*",67],["mangareader.to",67],["membed.net",67],["mgnetu.com",67],["mhdsport.*",67],["mkvcinemas.*",[67,188]],["movies2watch.*",67],["moviespapa.*",67],["mp3juice.info",67],["mp3juices.cc",67],["mp4moviez.*",67],["mydownloadtube.*",67],["myflixerz.to",67],["nowmetv.net",67],["nowsportstv.com",67],["nuroflix.*",67],["nxbrew.com",67],["o2tvseries.*",67],["o2tvseriesz.*",67],["oii.io",67],["paidshitforfree.com",67],["pepperlive.info",67],["pirlotv.*",67],["playertv.net",67],["poscitech.*",67],["primewire.*",67],["putlocker68.com",67],["redecanais.*",67],["roystream.com",67],["rssing.com",67],["s.to",67],["serienstream.*",67],["sflix.*",67],["shahed4u.*",67],["shaheed4u.*",67],["share.filesh.site",67],["sharkfish.xyz",67],["skidrowcodex.net",67],["smartermuver.com",67],["speedostream.*",67],["sportcast.*",67],["sports-stream.site",67],["sportskart.*",67],["stream4free.live",67],["streamingcommunity.*",[67,69,104]],["tamilarasan.*",67],["tamilfreemp3songs.*",67],["tamilmobilemovies.in",67],["tamilprinthd.*",67],["tapeadsenjoyer.com",[67,85]],["thewatchseries.live",67],["tnmusic.in",67],["torrentdosfilmes.*",67],["travelplanspro.com",67],["tubemate.*",67],["tusfiles.com",67],["tutlehd4.com",67],["twstalker.com",67],["uploadrar.*",67],["uqload.*",67],["vid-guard.com",67],["vidcloud9.*",67],["vido.*",67],["vidoo.*",67],["vidsaver.net",67],["vidspeeds.com",67],["viralitytoday.com",67],["voiranime.stream",67],["vudeo.*",67],["vumoo.*",67],["watchdoctorwhoonline.com",67],["watchomovies.*",[67,101]],["watchserie.online",67],["webhostingpost.com",67],["woxikon.in",67],["www-y2mate.com",67],["yesmovies.*",67],["ylink.bid",67],["xn-----0b4asja7ccgu2b4b0gd0edbjm2jpa1b1e9zva7a0347s4da2797e8qri.xn--1ck2e1b",67],["kickassanime.*",68],["11xmovies.*",69],["cinego.tv",69],["dokoembed.pw",69],["ev01.to",69],["fojik.site",69],["fstream365.com",69],["fzmovies.*",69],["linkz.*",69],["minoplres.xyz",69],["mostream.us",69],["moviedokan.*",69],["myflixer.*",69],["prmovies.*",69],["readcomiconline.li",69],["s3embtaku.pro",69],["sflix2.to",69],["sportshub.stream",69],["streamblasters.*",69],["topcinema.cam",69],["webxzplay.cfd",69],["zonatmo.com",69],["animesaturn.cx",69],["filecrypt.*",69],["hunterscomics.com",69],["aniwave.uk",69],["streampoi.com",70],["rahim-soft.com",70],["x-video.tube",70],["rubystm.com",70],["rubyvid.com",70],["rubyvidhub.com",70],["stmruby.com",70],["streamruby.com",70],["poophd.cc",70],["windowsreport.com",70],["fuckflix.click",70],["celebzcircle.com",71],["bi-girl.net",71],["ftuapps.*",71],["hentaiseason.com",71],["hoodtrendspredict.com",71],["marcialhub.xyz",71],["odiadance.com",71],["osteusfilmestuga.online",71],["ragnarokscanlation.opchapters.com",71],["sampledrive.org",71],["showflix.*",71],["swordalada.org",71],["tojimangas.com",71],["tvappapk.com",71],["twobluescans.com",[71,72]],["varnascan.xyz",71],["hallofseries.com",73],["luciferdonghua.in",73],["truyentranhfull.net",73],["fcportables.com",73],["repack-games.com",73],["ibooks.to",73],["blog.tangwudi.com",73],["filecatchers.com",73],["babaktv.com",73],["madeeveryday.com",74],["maidenhead-advertiser.co.uk",74],["mardomreport.net",74],["melangery.com",74],["milestomemories.com",74],["modernmom.com",74],["momtastic.com",74],["mostlymorgan.com",74],["motherwellmag.com",74],["muddybootsanddiamonds.com",74],["musicfeeds.com.au",74],["mylifefromhome.com",74],["nationalreview.com",74],["nordot.app",74],["oakvillenews.org",74],["observer.com",74],["ourlittlesliceofheaven.com",74],["palachinkablog.com",74],["patheos.com",74],["pinkonthecheek.com",74],["politicususa.com",74],["predic.ro",74],["puckermom.com",74],["qtoptens.com",74],["realgm.com",74],["reelmama.com",74],["robbreport.com",[74,77]],["royalmailchat.co.uk",74],["samchui.com",74],["sandrarose.com",74],["sherdog.com",74],["sidereel.com",74],["silive.com",74],["simpleflying.com",74],["sloughexpress.co.uk",74],["spacenews.com",74],["sportsgamblingpodcast.com",74],["spotofteadesigns.com",74],["stacysrandomthoughts.com",74],["ssnewstelegram.com",74],["superherohype.com",[74,77]],["tablelifeblog.com",74],["thebeautysection.com",74],["thecelticblog.com",74],["thecurvyfashionista.com",74],["thefashionspot.com",74],["thegamescabin.com",74],["thenerdyme.com",74],["thenonconsumeradvocate.com",74],["theprudentgarden.com",74],["thethings.com",74],["timesnews.net",74],["topspeed.com",74],["toyotaklub.org.pl",74],["travelingformiles.com",74],["tutsnode.org",74],["viralviralvideos.com",74],["wannacomewith.com",74],["wimp.com",[74,77]],["windsorexpress.co.uk",74],["woojr.com",74],["worldoftravelswithkids.com",74],["worldsurfleague.com",74],["cheatsheet.com",75],["pwinsider.com",75],["c-span.org",76],["15min.lt",77],["247sports.com",77],["abc17news.com",77],["agrodigital.com",77],["al.com",77],["aliontherunblog.com",77],["allaboutthetea.com",77],["allmovie.com",77],["allmusic.com",77],["allthingsthrifty.com",77],["amessagewithabottle.com",77],["artforum.com",77],["artnews.com",77],["awkward.com",77],["awkwardmom.com",77],["barcablaugranes.com",77],["barnsleychronicle.com",77],["bethcakes.com",77],["betweenenglandandiowa.com",77],["bgr.com",77],["blazersedge.com",77],["blogher.com",77],["blu-ray.com",77],["bluegraygal.com",77],["briefeguru.de",77],["brobible.com",77],["cagesideseats.com",77],["cbsnews.com",77],["cbssports.com",[77,256]],["celiacandthebeast.com",77],["chaptercheats.com",77],["cleveland.com",77],["clickondetroit.com",77],["commercialobserver.com",77],["competentedigitale.ro",77],["dailydot.com",77],["dailykos.com",77],["dailyvoice.com",77],["decider.com",77],["didyouknowfacts.com",77],["dogtime.com",77],["eater.com",77],["eldiariony.com",77],["fark.com",77],["femestella.com",77],["footwearnews.com",77],["free-power-point-templates.com",77],["freeconvert.com",77],["frogsandsnailsandpuppydogtail.com",77],["funtasticlife.com",77],["fwmadebycarli.com",77],["golfdigest.com",77],["gulflive.com",77],["homeglowdesign.com",77],["honeygirlsworld.com",77],["ibtimes.co.in",77],["imgur.com",77],["indiewire.com",77],["intouchweekly.com",77],["jasminemaria.com",77],["knowyourmeme.com",77],["kion546.com",77],["last.fm",77],["lehighvalleylive.com",77],["lettyskitchen.com",77],["lifeandstylemag.com",77],["lifeinleggings.com",77],["lizzieinlace.com",77],["localnews8.com",77],["lonestarlive.com",77],["mandatory.com",77],["masslive.com",77],["mmamania.com",77],["naszemiasto.pl",77],["nationalpost.com",77],["nbcsports.com",77],["news.com.au",77],["ninersnation.com",77],["nj.com",77],["nothingbutnewcastle.com",77],["nsjonline.com",77],["nypost.com",77],["oregonlive.com",77],["pagesix.com",77],["pennlive.com",77],["playstationlifestyle.net",77],["rollingstone.com",77],["sbnation.com",77],["sheknows.com",77],["sneakernews.com",77],["sport-fm.gr",77],["stylecaster.com",77],["syracuse.com",77],["tastingtable.com",77],["thecw.com",77],["thedailymeal.com",77],["theflowspace.com",77],["themarysue.com",77],["tokfm.pl",77],["torontosun.com",77],["tvline.com",77],["usmagazine.com",77],["wallup.net",77],["worldstar.com",77],["worldstarhiphop.com",77],["yourcountdown.to",77],["automobile-catalog.com",[78,79,80]],["motorbikecatalog.com",[78,79,80]],["topstarnews.net",78],["islamicfinder.org",78],["secure-signup.net",78],["dramabeans.com",78],["dropgame.jp",[78,79]],["manta.com",78],["tportal.hr",78],["tvtropes.org",78],["convertcase.net",78],["uranai.nosv.org",79],["yakkun.com",79],["373news.com",79],["alc.co.jp",79],["allthetests.com",79],["animanch.com",79],["aniroleplay.com",79],["apkmirror.com",[79,187]],["aucfree.com",79],["autoby.jp",79],["autofrage.net",79],["babla.*",79],["carscoops.com",79],["chanto.jp.net",79],["cinetrafic.fr",79],["cocokara-next.com",79],["computerfrage.net",79],["crosswordsolver.com",79],["cruciverba.it",79],["daily.co.jp",79],["dictionnaire.lerobert.com",79],["dnevno.hr",79],["drweil.com",79],["dziennik.pl",79],["forsal.pl",79],["freemcserver.net",79],["game8.jp",79],["gardeningsoul.com",79],["gazetaprawna.pl",79],["gigafile.nu",79],["globalrph.com",79],["golf-live.at",79],["grapee.jp",79],["gutefrage.net",79],["heureka.cz",79],["horairesdouverture24.fr",79],["indiatimes.com",79],["infor.pl",79],["iza.ne.jp",79],["j-cast.com",79],["j-town.net",79],["jablickar.cz",79],["javatpoint.com",79],["kinmaweb.jp",79],["kobe-journal.com",79],["kreuzwortraetsel.de",79],["kurashiru.com",79],["kyoteibiyori.com",79],["lacuarta.com",79],["laleggepertutti.it",79],["langenscheidt.com",79],["livenewschat.eu",79],["luremaga.jp",79],["mainichi.jp",79],["malaymail.com",79],["mamastar.jp",79],["maketecheasier.com",[79,80]],["minkou.jp",79],["modhub.us",79],["motscroises.fr",79],["muragon.com",79],["nana-press.com",79],["natalie.mu",79],["niketalk.com",79],["nikkan-gendai.com",79],["oeffnungszeitenbuch.de",79],["onecall2ch.com",79],["oraridiapertura24.it",79],["oxfordlearnersdictionaries.com",79],["palabr.as",79],["pashplus.jp",79],["persoenlich.com",79],["petitfute.com",79],["play-games.com",79],["powerpyx.com",79],["quefaire.be",79],["raetsel-hilfe.de",79],["ranking.net",79],["roleplayer.me",79],["rostercon.com",79],["samsungmagazine.eu",79],["sankei.com",79],["sanspo.com",79],["slashdot.org",79],["sourceforge.net",[79,84]],["syosetu.com",79],["talkwithstranger.com",79],["the-crossword-solver.com",79],["transparentcalifornia.com",79],["transparentnevada.com",79],["trilltrill.jp",79],["tvtv.ca",79],["tvtv.us",79],["ufret.jp",79],["watchdocumentaries.com",79],["webdesignledger.com",79],["wetteronline.de",79],["wfmz.com",79],["winfuture.de",79],["word-grabber.com",79],["wort-suchen.de",79],["woxikon.*",79],["young-machine.com",79],["yugioh-starlight.com",79],["yutura.net",79],["zagreb.info",79],["zakzak.co.jp",79],["2chblog.jp",79],["2monkeys.jp",79],["46matome.net",79],["akb48glabo.com",79],["akb48matomemory.com",79],["alfalfalfa.com",79],["all-nationz.com",79],["anihatsu.com",79],["aqua2ch.net",79],["blog.esuteru.com",79],["blog.livedoor.jp",79],["blog.jp",79],["blogo.jp",79],["chaos2ch.com",79],["choco0202.work",79],["crx7601.com",79],["danseisama.com",79],["dareda.net",79],["digital-thread.com",79],["doorblog.jp",79],["exawarosu.net",79],["fgochaldeas.com",79],["football-2ch.com",79],["gekiyaku.com",79],["golog.jp",79],["hacchaka.net",79],["heartlife-matome.com",79],["liblo.jp",79],["fesoku.net",79],["fiveslot777.com",79],["gamejksokuhou.com",79],["girlsreport.net",79],["girlsvip-matome.com",79],["grasoku.com",79],["gundamlog.com",79],["honyaku-channel.net",79],["ikarishintou.com",79],["imas-cg.net",79],["imihu.net",79],["inutomo11.com",79],["itainews.com",79],["itaishinja.com",79],["jin115.com",79],["jisaka.com",79],["jnews1.com",79],["jumpsokuhou.com",79],["jyoseisama.com",79],["keyakizaka46matomemory.net",79],["kidan-m.com",79],["kijoden.com",79],["kijolariat.net",79],["kijolifehack.com",79],["kijomatomelog.com",79],["kijyokatu.com",79],["kijyomatome.com",79],["kijyomatome-ch.com",79],["kijyomita.com",79],["kirarafan.com",79],["kitimama-matome.net",79],["kitizawa.com",79],["konoyubitomare.jp",79],["kotaro269.com",79],["kyousoku.net",79],["ldblog.jp",79],["livedoor.biz",79],["livedoor.blog",79],["majikichi.com",79],["matacoco.com",79],["matomeblade.com",79],["matomelotte.com",79],["matometemitatta.com",79],["mojomojo-licarca.com",79],["morikinoko.com",79],["nandemo-uketori.com",79],["netatama.net",79],["news-buzz1.com",79],["news30over.com",79],["nmb48-mtm.com",79],["norisoku.com",79],["npb-news.com",79],["ocsoku.com",79],["okusama-kijyo.com",79],["onihimechan.com",79],["orusoku.com",79],["otakomu.jp",79],["otoko-honne.com",79],["oumaga-times.com",79],["outdoormatome.com",79],["pachinkopachisro.com",79],["paranormal-ch.com",79],["recosoku.com",79],["s2-log.com",79],["saikyo-jump.com",79],["shuraba-matome.com",79],["ske48matome.net",79],["squallchannel.com",79],["sukattojapan.com",79],["sumaburayasan.com",79],["usi32.com",79],["uwakich.com",79],["uwakitaiken.com",79],["vault76.info",79],["vipnews.jp",79],["vippers.jp",79],["vipsister23.com",79],["vtubernews.jp",79],["watarukiti.com",79],["world-fusigi.net",79],["zakuzaku911.com",79],["zch-vip.com",79],["interfootball.co.kr",80],["a-ha.io",80],["cboard.net",80],["jjang0u.com",80],["joongdo.co.kr",80],["viva100.com",80],["gamingdeputy.com",80],["alle-tests.nl",80],["tweaksforgeeks.com",80],["m.inven.co.kr",80],["mlbpark.donga.com",80],["meconomynews.com",80],["brandbrief.co.kr",80],["motorgraph.com",80],["worldhistory.org",81],["bleepingcomputer.com",82],["pravda.com.ua",82],["ap7am.com",83],["cinema.com.my",83],["dolldivine.com",83],["giornalone.it",83],["iplocation.net",83],["jamaicaobserver.com",83],["jawapos.com",83],["jutarnji.hr",83],["kompasiana.com",83],["mediaindonesia.com",83],["slobodnadalmacija.hr",83],["upmedia.mg",83],["advertisertape.com",85],["tapeadvertisement.com",85],["tapelovesads.org",85],["watchadsontape.com",85],["vosfemmes.com",86],["voyeurfrance.net",86],["hyundaitucson.info",87],["exambd.net",88],["cgtips.org",89],["freewebcart.com",90],["freemagazines.top",90],["siamblockchain.com",90],["emuenzen.de",91],["kickass.*",92],["unblocked.id",94],["listendata.com",95],["7xm.xyz",95],["fastupload.io",95],["azmath.info",95],["wouterplanet.com",96],["xenvn.com",97],["pfps.gg",98],["androidacy.com",99],["4porn4.com",100],["bestpornflix.com",101],["freeroms.com",101],["andhrafriends.com",101],["723qrh1p.fun",101],["up4stream.com",101],["ups2up.fun",101],["98zero.com",102],["mediaset.es",102],["updatewallah.in",102],["hwbusters.com",102],["beatsnoop.com",103],["fetchpik.com",103],["hackerranksolution.in",103],["camsrip.com",103],["help.sakarnewz.com",103],["austiblox.net",105],["btcbunch.com",106],["teachoo.com",[107,108]],["mafiatown.pl",109],["bitcotasks.com",110],["hilites.today",111],["udvl.com",112],["www.chip.de",[113,114,115,116]],["topsporter.net",117],["sportshub.to",117],["streamcheck.link",118],["myanimelist.net",119],["unofficialtwrp.com",120],["codec.kyiv.ua",120],["kimcilonlyofc.com",120],["bitcosite.com",121],["bitzite.com",121],["teluguflix.*",122],["hacoos.com",123],["watchhentai.net",124],["hes-goals.io",124],["pkbiosfix.com",124],["casi3.xyz",124],["bondagevalley.cc",125],["zefoy.com",126],["mailgen.biz",127],["tempinbox.xyz",127],["vidello.net",128],["newscon.org",129],["yunjiema.top",129],["pcgeeks-games.com",129],["resizer.myct.jp",130],["gametohkenranbu.sakuraweb.com",131],["jisakuhibi.jp",132],["rank1-media.com",132],["lifematome.blog",133],["fm.sekkaku.net",134],["free-avx.jp",135],["dvdrev.com",136],["betweenjpandkr.blog",137],["nft-media.net",138],["ghacks.net",139],["leak.sx",140],["paste.bin.sx",140],["pornleaks.in",140],["aliezstream.pro",141],["daddy-stream.xyz",141],["daddylive1.*",141],["esportivos.*",141],["instream.pro",141],["mylivestream.pro",141],["poscitechs.*",141],["powerover.online",141],["sportea.link",141],["sportsurge.stream",141],["ufckhabib.com",141],["ustream.pro",141],["animeshqip.site",141],["apkship.shop",141],["buzter.pro",141],["enjoysports.bond",141],["filedot.to",141],["foreverquote.xyz",141],["hdstream.one",141],["kingstreamz.site",141],["live.fastsports.store",141],["livesnow.me",141],["livesports4u.pw",141],["masterpro.click",141],["nuxhallas.click",141],["papahd.info",141],["rgshows.me",141],["sportmargin.live",141],["sportmargin.online",141],["sportsloverz.xyz",141],["sportzlive.shop",141],["supertipzz.online",141],["totalfhdsport.xyz",141],["ultrastreamlinks.xyz",141],["usgate.xyz",141],["webmaal.cfd",141],["wizistreamz.xyz",141],["worldstreamz.shop",141],["g-porno.com",141],["g-streaming.com",141],["educ4m.com",141],["fromwatch.com",141],["visualnewshub.com",141],["bigwarp.*",141],["animeshqip.org",141],["uns.bio",141],["reshare.pm",141],["videograbber.cc",141],["catchthrust.net",141],["affordwonder.net",141],["nectareousoverelate.com",143],["khoaiphim.com",144],["haafedk2.com",145],["fordownloader.com",145],["jovemnerd.com.br",146],["totalcsgo.com",147],["vivamax.asia",148],["manysex.com",149],["gaminginfos.com",150],["tinxahoivn.com",151],["automoto.it",152],["codelivly.com",153],["tchatche.com",154],["cryptoearns.com",154],["lordchannel.com",155],["news.bg",156],["client.falixnodes.net",157],["novelhall.com",158],["bagi.co.in",159],["keran.co",159],["biblestudytools.com",160],["christianheadlines.com",160],["ibelieve.com",160],["kuponigo.com",161],["inxxx.com",162],["bemyhole.com",162],["embedwish.com",163],["filelions.live",163],["leakslove.net",163],["jenismac.com",164],["vxetable.cn",165],["nizarstream.com",166],["donghuaworld.com",167],["letsdopuzzles.com",168],["rediff.com",169],["igay69.com",170],["kimcilonly.link",171],["dzapk.com",172],["darknessporn.com",173],["familyporner.com",173],["freepublicporn.com",173],["pisshamster.com",173],["punishworld.com",173],["xanimu.com",173],["tainio-mania.online",174],["eroticmoviesonline.me",175],["teleclub.xyz",176],["ecamrips.com",177],["showcamrips.com",177],["tucinehd.com",178],["9animetv.to",179],["qiwi.gg",180],["jornadaperfecta.com",181],["loseart.com",182],["sousou-no-frieren.com",183],["unite-guide.com",184],["thebullspen.com",185],["receitasdaora.online",186],["torrentdownload.*",188],["cineb.rs",188],["123animehub.cc",188],["tukipasti.com",188],["cataz.to",188],["netmovies.to",188],["hiraethtranslation.com",189],["all3do.com",190],["do7go.com",190],["d0000d.com",190],["d000d.com",190],["d0o0d.com",190],["do0od.com",190],["doods.*",190],["doodstream.*",190],["dooodster.com",190],["ds2play.com",190],["ds2video.com",190],["vidply.com",190],["xfreehd.com",191],["freethesaurus.com",192],["thefreedictionary.com",192],["dexterclearance.com",193],["x86.co.kr",194],["westmanga.*",195],["onlyfaucet.com",196],["x-x-x.tube",197],["fdownloader.net",198],["thehackernews.com",199],["mielec.pl",200],["treasl.com",201],["mrbenne.com",202],["cnpics.org",203],["ovabee.com",203],["porn4f.com",203],["cnxx.me",203],["ai18.pics",203],["sportsonline.si",204],["fiuxy2.co",205],["animeunity.to",206],["tokopedia.com",207],["remixsearch.net",208],["remixsearch.es",208],["onlineweb.tools",208],["sharing.wtf",208],["2024tv.ru",209],["modrinth.com",210],["curseforge.com",210],["xnxxcom.xyz",211],["sportsurge.net",212],["joyousplay.xyz",212],["quest4play.xyz",[212,214]],["generalpill.net",212],["moneycontrol.com",213],["cookiewebplay.xyz",214],["ilovetoplay.xyz",214],["streamcaster.live",214],["weblivehdplay.ru",214],["nontongo.win",215],["m9.news",216],["callofwar.com",217],["secondhandsongs.com",218],["nudezzers.org",219],["send.cm",220],["send.now",220],["3rooodnews.net",221],["xxxbfvideo.net",222],["filmy4wap.co.in",223],["filmy4waps.org",223],["gameshop4u.com",224],["regenzi.site",224],["historicaerials.com",225],["handirect.fr",226],["animefenix.tv",227],["fsiblog3.club",228],["kamababa.desi",228],["sat-sharing.com",228],["getfiles.co.uk",229],["genelify.com",230],["dhtpre.com",231],["xbaaz.com",232],["lineupexperts.com",234],["fearmp4.ru",235],["fbstreams.*",236],["m.shuhaige.net",237],["streamingnow.mov",238],["thesciencetoday.com",239],["sportnews.to",239],["ghbrisk.com",241],["iplayerhls.com",241],["bacasitus.com",242],["katoikos.world",242],["abstream.to",243],["pawastreams.pro",244],["rebajagratis.com",245],["tv.latinlucha.es",245],["fetcheveryone.com",246],["reviewdiv.com",247],["laurelberninteriors.com",248],["godlike.com",249],["godlikeproductions.com",249],["bestreamsports.org",250],["xmalay1.net",252],["letemsvetemapplem.eu",253],["pc-builds.com",254],["streambolt.tv",255],["watch-dbz57.funonline.co.in",257],["cefirates.com",258],["comicleaks.com",258],["tapmyback.com",258],["ping.gg",258],["nookgaming.com",258],["creatordrop.com",258],["bitdomain.biz",258],["fort-shop.kiev.ua",258],["accuretawealth.com",258],["resourceya.com",258],["tracktheta.com",258],["adaptive.marketing",258],["camberlion.com",258],["trybawaryjny.pl",258],["segops.madisonspecs.com",258],["stresshelden-coaching.de",258],["controlconceptsusa.com",258],["ryaktive.com",258],["tip.etip-staging.etip.io",258],["future-fortune.com",259],["furucombo.app",259],["bolighub.dk",259],["intercity.technology",260],["freelancer.taxmachine.be",260],["adria.gg",260],["fjlaboratories.com",260],["abhijith.page",260],["helpmonks.com",260],["dataunlocker.com",261],["proboards.com",262],["winclassic.net",262],["farmersjournal.ie",263]]);
const exceptionsMap = new Map([]);
const hasEntities = true;
const hasAncestors = false;

const collectArgIndices = (hn, map, out) => {
    let argsIndices = map.get(hn);
    if ( argsIndices === undefined ) { return; }
    if ( typeof argsIndices !== 'number' ) {
        for ( const argsIndex of argsIndices ) {
            out.add(argsIndex);
        }
    } else {
        out.add(argsIndices);
    }
};

const indicesFromHostname = (hostname, suffix = '') => {
    const hnParts = hostname.split('.');
    const hnpartslen = hnParts.length;
    if ( hnpartslen === 0 ) { return; }
    for ( let i = 0; i < hnpartslen; i++ ) {
        const hn = `${hnParts.slice(i).join('.')}${suffix}`;
        collectArgIndices(hn, hostnamesMap, todoIndices);
        collectArgIndices(hn, exceptionsMap, tonotdoIndices);
    }
    if ( hasEntities ) {
        const n = hnpartslen - 1;
        for ( let i = 0; i < n; i++ ) {
            for ( let j = n; j > i; j-- ) {
                const en = `${hnParts.slice(i,j).join('.')}.*${suffix}`;
                collectArgIndices(en, hostnamesMap, todoIndices);
                collectArgIndices(en, exceptionsMap, tonotdoIndices);
            }
        }
    }
};

const entries = (( ) => {
    const docloc = document.location;
    const origins = [ docloc.origin ];
    if ( docloc.ancestorOrigins ) {
        origins.push(...docloc.ancestorOrigins);
    }
    return origins.map((origin, i) => {
        const beg = origin.lastIndexOf('://');
        if ( beg === -1 ) { return; }
        const hn = origin.slice(beg+3)
        const end = hn.indexOf(':');
        return { hn: end === -1 ? hn : hn.slice(0, end), i };
    }).filter(a => a !== undefined);
})();
if ( entries.length === 0 ) { return; }

const todoIndices = new Set();
const tonotdoIndices = new Set();

indicesFromHostname(entries[0].hn);
if ( hasAncestors ) {
    for ( const entry of entries ) {
        if ( entry.i === 0 ) { continue; }
        indicesFromHostname(entry.hn, '>>');
    }
}

// Apply scriplets
for ( const i of todoIndices ) {
    if ( tonotdoIndices.has(i) ) { continue; }
    try { removeNodeText(...argsList[i]); }
    catch { }
}

/******************************************************************************/

// End of local scope
})();

void 0;
