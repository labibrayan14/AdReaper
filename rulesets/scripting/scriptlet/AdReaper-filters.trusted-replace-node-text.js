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
(function uBOL_replaceNodeText() {

/******************************************************************************/

function replaceNodeText(
    nodeName,
    pattern,
    replacement,
    ...extraArgs
) {
    replaceNodeTextFn(nodeName, pattern, replacement, ...extraArgs);
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
const argsList = [["script","(function serverContract()","/*START*/\"YOUTUBE_PREMIUM_LOGO\"!==ytInitialData?.topbar?.desktopTopbarRenderer?.logo?.topbarLogoRenderer?.iconImage?.iconType&&(location.href.startsWith(\"https://www.youtube.com/tv#/\")||location.href.startsWith(\"https://www.youtube.com/embed/\")||document.addEventListener(\"DOMContentLoaded\",(function(){const t=()=>{const t=document.getElementById(\"movie_player\");if(!t)return;if(!t.getStatsForNerds?.()?.debug_info?.startsWith?.(\"SSAP, AD\"))return;const e=t.getProgressState?.();e&&e.duration>0&&(e.loaded<e.duration||e.duration-e.current>1)&&t.seekTo?.(e.duration)};t(),new MutationObserver((()=>{t()})).observe(document,{childList:!0,subtree:!0})})));(()=>{const t={apply:(t,o,n)=>{const e=n[0];return\"function\"==typeof e&&e.toString().includes(\"onAbnormalityDetected\")&&(n[0]=function(){}),Reflect.apply(t,o,n)}};window.Promise.prototype.then=new Proxy(window.Promise.prototype.then,t)})();(function serverContract()","sedCount","1"],["script","/  function [a-zA-Z]{1,2}\\([a-zA-Z]{1,2},[a-zA-Z]{1,2}\\).*?\\(\\)\\{return [a-zA-Z]{1,2}\\;\\}\\;return [a-zA-Z]{1,2}\\(\\)\\;\\}/"],["script","/\\}\\)\\;\\s+\\(function\\(\\)\\{var .*?\\)\\;\\}\\)\\(\\)\\;\\s+\\$\\(\\\"\\#reportChapte/","}); $(\"#reportChapte"],["script","'G-1B4LC0KT6C');","'G-1B4LC0KT6C'); localStorage.setItem(\"tuna\", \"dW5kZWZpbmVk\"); localStorage.setItem(\"sausage\", \"ZmFsc2U=\"); window.setTimeout(function(){fuckYouUblockAndJobcenterTycoon(false)},200);"],["script","_w.keyMap=","(()=>{const e={apply:(e,t,n)=>{let o=Reflect.apply(e,t,n);return o instanceof HTMLIFrameElement&&!o.src&&o.contentWindow&&(o.contentWindow.document.body.getElementsByTagName=window.document.body.getElementsByTagName,o.contentWindow.MutationObserver=void 0),o}};HTMLBodyElement.prototype.appendChild=new Proxy(HTMLBodyElement.prototype.appendChild,e);const t={apply:(e,t,n)=>(t instanceof HTMLLIElement&&\"b_algo\"===t?.classList?.value&&\"a\"===n?.[0]&&setTimeout((()=>{t.style.display=\"none\"}),100),Reflect.apply(e,t,n))};HTMLBodyElement.prototype.getElementsByTagName=new Proxy(HTMLBodyElement.prototype.getElementsByTagName,t)})();_w.keyMap="],["script","window.location.href = '/disableadblock';"],["script","(function($)","(function(){const a=document.createElement(\"div\");document.documentElement.appendChild(a),setTimeout(()=>{a&&a.remove()},100)})(); (function($)"],["script","/window\\.dataLayer.+?(location\\.replace\\(\\S+?\\)).*/","$1"],["script","WB.defer","window.wbads={public:{getDailymotionAdsParamsForScript:function(a,b){b(\"\")},setTargetingOnPosition:function(a,b){return}}};WB.defer","condition","wbads.public.setTargetingOnPosition"],["script","var ISMLIB","!function(){const o={apply:(o,n,r)=>(new Error).stack.includes(\"refreshad\")?0:Reflect.apply(o,n,r)};window.Math.floor=new Proxy(window.Math.floor,o)}();var ISMLIB"],["script","\"adBlockWallEnabled\":true","\"adBlockWallEnabled\":false"],["script","/vastURL:.*?',/","vastURL: '',"],["script","/url:.*?',/","url: '',"],["script","a.onerror","xxx"],["script","popunder","p"],["script","/\\$.*embed.*.appendTo.*;/","","condition","appendTo"],["script","setInterval"],["script","/'globalConfig':.*?\",\\s};var exportz/s","};var exportz"],["script","/\\\"homad\\\",/"],["script","/\\\"homad\\\":\\{\\\"state\\\":\\\"enabled\\\"\\}/","\"homad\":{\"state\":\"disabled\"}"],["script","useAdBlockDefend: true","useAdBlockDefend: false"],["script","/if \\([a-z0-9]{10} === [a-z0-9]{10}/","if(true"],["script","/5000|100/gm","10","condition","set"],["script","/^([^{])/","document.addEventListener('DOMContentLoaded',()=>{const i=document.createElement('iframe');i.style='height:0;width:0;border:0';i.id='aswift_0';document.body.appendChild(i);i.focus();const f=document.createElement('div');f.id='9JJFp';document.body.appendChild(f);});$1","sedCount","2"],["script","/false;/gm","true;","condition","isSubscribed"],["script","('t_modal')","('go_d2')"],["script","Android/","false/","stay","1"],["script","alert","false"],["script","2000","10"],["script","/9000|30000|1000|40000/gm","10"],["script","/1000|100|6|30/gm","1","condition","link"],["script","/^window\\.location\\.href.*\\'$/gms"],["script","getlink.removeClass('hidden');","gotolink.removeClass('hidden');"],["script","/initialTimeSeconds = \\d+/","initialTimeSeconds = 7"],["script","= false;","= true;","condition","innerHTML"],["script","'IFRAME'","'BODY'"],["script","/window\\.location.*?;/"],["script","typeof cdo == 'undefined' || document.querySelector('div.textads.banner-ads.banner_ads.ad-unit.ad-zone.ad-space.adsbox') == undefined","false"],["script","/window\\.location\\.href='.*';/","","condition","openLink"],["script","/window\\.location\\.href\\s*=\\s*\"intent:\\/\\/([^#]+)#Intent;[^\"]*\"/gm","window.location.href = \"https://$1\""],["script","var seconde = 10;","var seconde = 0;"],["script","timeLeft = duration","timeLeft = 1"],["script",";return;","","condition","_0x"],["script","/return Array[^;]+/","return true"],["script","return!![]","return![]"],["script","/\\d{4}/gm","10","condition","count"],["script","/getElementById\\('.*'\\).*'block';/gm","getElementById('btn6').style.display = 'block';","condition","count"],["script","3000)","10)"],["script","isadblock = 1;","isadblock = 0;"],["script","\"#sdl\"","\"#dln\""],["script","event.message);","event.message); /*start*/ !function(){\"use strict\";let t={log:window.console.log.bind(console),getPropertyValue:CSSStyleDeclaration.prototype.getPropertyValue,setAttribute:Element.prototype.setAttribute,getAttribute:Element.prototype.getAttribute,appendChild:Element.prototype.appendChild,remove:Element.prototype.remove,cloneNode:Element.prototype.cloneNode,Element_attributes:Object.getOwnPropertyDescriptor(Element.prototype,\"attributes\").get,Array_splice:Array.prototype.splice,Array_join:Array.prototype.join,createElement:document.createElement,getComputedStyle:window.getComputedStyle,Reflect:Reflect,Proxy:Proxy,crypto:window.crypto,Uint8Array:Uint8Array,Object_defineProperty:Object.defineProperty.bind(Object),Object_getOwnPropertyDescriptor:Object.getOwnPropertyDescriptor.bind(Object),String_replace:String.prototype.replace},e=t.crypto.getRandomValues.bind(t.crypto),r=function(e,r,l){return\"toString\"===r?e.toString.bind(e):t.Reflect.get(e,r,l)},l=function(r){let o=function(t){return t.toString(16).padStart(2,\"0\")},p=new t.Uint8Array((r||40)/2);e(p);let n=t.String_replace.call(t.Array_join.call(Array.from(p,o),\"\"),/^\\d+/g,\"\");return n.length<3?l(r):n},o=l(15);window.MutationObserver=new t.Proxy(window.MutationObserver,{construct:function(e,r){let l=r[0],p=function(e,r){for(let p=e.length,n=p-1;n>=0;--n){let c=e[n];if(\"childList\"===c.type&&c.addedNodes.length>0){let i=c.addedNodes;for(let a=0,y=i.length;a<y;++a){let u=i[a];if(u.localName===o){t.Array_splice.call(e,n,1);break}}}}0!==e.length&&l(e,r)};r[0]=p;let n=t.Reflect.construct(e,r);return n},get:r}),window.getComputedStyle=new t.Proxy(window.getComputedStyle,{apply(e,l,p){let n=t.Reflect.apply(e,l,p);if(\"none\"===t.getPropertyValue.call(n,\"clip-path\"))return n;let c=p[0],i=t.createElement.call(document,o);t.setAttribute.call(i,\"class\",t.getAttribute.call(c,\"class\")),t.setAttribute.call(i,\"id\",t.getAttribute.call(c,\"id\")),t.setAttribute.call(i,\"style\",t.getAttribute.call(c,\"style\")),t.appendChild.call(document.body,i);let a=t.getPropertyValue.call(t.getComputedStyle.call(window,i),\"clip-path\");return t.remove.call(i),t.Object_defineProperty(n,\"clipPath\",{get:(()=>a).bind(null)}),n.getPropertyValue=new t.Proxy(n.getPropertyValue,{apply:(e,r,l)=>\"clip-path\"!==l[0]?t.Reflect.apply(e,r,l):a,get:r}),n},get:r})}(); document.currentScript.textContent=document.currentScript.textContent.replace(/\\/\\*start\\*\\/(.*)\\/\\*end\\*\\//g,\"\");/*end*/"],["script","/\\.cloudfront\\.net|window\\.open/g","false"],["script","/element\\.contains\\(document\\.activeElement\\)|document\\.hidden && !timeCounted/g","true"],["script","!seen && ad","false"],["script","window.location.href","temp","includes","startDownloads"],["script","window.location.href","temp","includes","linkToOpen"],["script","(isAdsenseBlocked)","(false)"],["script","/10|20/","0","condition","/countdownSeconds|wpsafelinkCount/"],["script","/1000|1700|5000/gm","10","condition","/countdownSeconds|wpsafelinkCount/"],["script","!isAdTriggered","false"],["script","900","100"],["script","/.*adConfig.*frequency_period.*/","(async () => {const a=location.href;if(!a.includes(\"/download?link=\"))return;const b=new URL(a),c=b.searchParams.get(\"link\");try{location.assign(`${location.protocol}//${c}`)}catch(a){}} )();"],["script","break;case $."],["script","/^/","(()=>{window.admiral=function(d,a,b){if(\"function\"==typeof b)try{b({})}catch(a){}}})();","sedCount","1"],["script","window.googletag =","/*start*/(function(){let link=document.createElement(\"link\");link.rel=\"stylesheet\";link.href=\"/common/css/etoday.css\";document.head.appendChild(link)})();document.currentScript.textContent=document.currentScript.textContent.replace(/\\/\\*start\\*\\/(.*)\\/\\*end\\*\\//g,\"\");/*end*/window.googletag ="],["script","window.dataLayer =","/*start*/(function(){let link=document.createElement(\"link\");link.rel=\"stylesheet\";link.href=\"/css_renew/pc/common.css\";document.head.appendChild(link)})();document.currentScript.textContent=document.currentScript.textContent.replace(/\\/\\*start\\*\\/(.*)\\/\\*end\\*\\//g,\"\");/*end*/window.dataLayer ="],["script","_paq.push","/*start*/(function(){let link=document.createElement(\"link\");link.rel=\"stylesheet\";link.href=\"/css/pc/ecn_common.min.css\";document.head.appendChild(link)})();document.currentScript.textContent=document.currentScript.textContent.replace(/\\/\\*start\\*\\/(.*)\\/\\*end\\*\\//g,\"\");/*end*/_paq.push"],["script","window.dataLayer =","/*start*/(function(){let link=document.createElement(\"link\");link.rel=\"stylesheet\";link.href=\"/wp-content/themes/hts_v2/style.css\";document.head.appendChild(link)})();document.currentScript.textContent=document.currentScript.textContent.replace(/\\/\\*start\\*\\/(.*)\\/\\*end\\*\\//g,\"\");/*end*/window.dataLayer ="],["script","window.dataLayer =","/*start*/(function(){let link=document.createElement(\"link\");link.rel=\"stylesheet\";link.href=\"/_css/css.css\";document.head.appendChild(link)})();document.currentScript.textContent=document.currentScript.textContent.replace(/\\/\\*start\\*\\/(.*)\\/\\*end\\*\\//g,\"\");/*end*/window.dataLayer ="],["script","var _paq =","/*start*/(function(){let link=document.createElement(\"link\");link.rel=\"stylesheet\";link.href=\"/Content/css/style.css\";document.head.appendChild(link)})();document.currentScript.textContent=document.currentScript.textContent.replace(/\\/\\*start\\*\\/(.*)\\/\\*end\\*\\//g,\"\");/*end*/var _paq =","sedCount","1"],["script","var localize =","/*start*/(function(){document.querySelectorAll(\"script[wp-data]\").forEach(element=>{const html=new DOMParser().parseFromString(atob(element.getAttribute(\"wp-data\")),\"text/html\");html.querySelectorAll(\"link:not([as])\").forEach(linkEl=>{element.after(linkEl)});element.parentElement.removeChild(element);})})();document.currentScript.textContent=document.currentScript.textContent.replace(/\\/\\*start\\*\\/(.*)\\/\\*end\\*\\//g,\"\");/*end*/var localize =","sedCount","1"],["script","/^.+/gms","!function(){var e=Object.getOwnPropertyDescriptor(Element.prototype,\"innerHTML\").set;Object.defineProperty(Element.prototype,\"innerHTML\",{set:function(t){return t.includes(\"html-load.com\")?e.call(this,\"\"):e.call(this,t)}})}();","condition","html-load.com"],["script","(isNoAds)","(true)"],["script","vastTag","v"],["script","/protect_block.*?,/"],["script","/window.open.*/gms","window.open(url, \"_self\");}"],["script","/window\\.location\\.href.*?;/"],["script","/\\(window\\.show[^\\)]+\\)/","(true)","condition","classList.add"],["script","(isAdblock)","(false)"],["style","visibility: visible !important;","display: none !important;"],["script","currentTime = 1500 * 2","currentTime = 0"],["script","added=false;","added=false;if (typeof localStorage !== 'undefined' && typeof JSON.parse(localStorage._ppp)['0_uid'] === 'undefined' && window.visualViewport.width != document.documentElement.offsetWidth+320) {const originalvisualViewport=window.visualViewport; Object.defineProperty(window, 'visualViewport', {value: new Proxy(originalvisualViewport, {get(target,property) {if (property === 'width') {return document.documentElement.offsetWidth+320} return target[property]}}), configurable:true});}"],["script","/^.+/s","navigator.serviceWorker.getRegistrations().then((registrations=>{for(const registration of registrations){if(registration.scope.includes(\"streamingcommunity.computer\")){registration.unregister()}}}));","condition","swDidInit"],["script","\"adsDisabled\":false","\"adsDisabled\":true"],["style","::after{content:\" \";display:table;box-sizing:border-box}","{display: none !important;}","condition","text-decoration:none;vertical-align:middle"],["script","?30:0","?0:0"],["script","/openNewTab\\(\".*?\"\\)/g","null"],["script","window.dataLayer =","window.HTMLAnchorElement.prototype.click=new Proxy(window.HTMLAnchorElement.prototype.click,{apply:(target,thisArg,args)=>{if(thisArg&&!thisArg.href.includes(\"streamsilk.com\"))return;return Reflect.apply(target,thisArg,args)}});window.dataLayer =","sedCount","1"],["script","({});","({}); function showHideElements(t,e){$(t).hide(),$(e).show()}function disableBtnclc(){let t=document.querySelector(\".submit-captcha\");t.disabled=!0,t.innerHTML=\"Loading...\"}function refreshButton(){$(\".refresh-capthca-btn\").addClass(\"disabled\")}function copyInput(){let t=document.querySelectorAll(\".copy-input\");t.forEach(t=>{navigator.clipboard.writeText(t.value)}),Materialize.toast(\"Copied!\",2e3)}function imgOnError(){$(\".ua-check\").html(window.atob(\"PGRpdiBjbGFzcz0idGV4dC1kYW5nZXIgZm9udC13ZWlnaHQtYm9sZCBoNSBtdC0xIj5DYXB0Y2hhIGltYWdlIGZhaWxlZCB0byBsb2FkLjxicj48YSBvbmNsaWNrPSJsb2NhdGlvbi5yZWxvYWQoKSIgc3R5bGU9ImNvbG9yOiM2MjcwZGE7Y3Vyc29yOnBvaW50ZXIiIGNsYXNzPSJ0ZXh0LWRlY29yYXRpb25lLW5vbmUiPlBsZWFzZSByZWZyZXNoIHRoZSBwYWdlLiA8aSBjbGFzcz0iZmEgZmEtcmVmcmVzaCI+PC9pPjwvYT48L2Rpdj4=\"))}$(window).on(\"load\",function(){$(\"body\").addClass(\"loaded\")}),window.history.replaceState&&window.history.replaceState(null,null,window.location.href),$(\".remove-spaces\").on(\"input\",function(){this.value=this.value.replace(/\\s/g,\"\")}),$(document).on(\"click\",\"#toast-container .toast\",function(){$(this).fadeOut(function(){$(this).remove()})}),$(\".tktemizle\").on(\"input propertychange\",function(){let t=$(this).val().match(\"access_token=(.*?)&\");t&&$(\".tktemizle\").val(t[1])}),$(document).ready(function(){let t=[{button:$(\".t-followers-button\"),menu:$(\".t-followers-menu\")},{button:$(\".t-hearts-button\"),menu:$(\".t-hearts-menu\")},{button:$(\".t-chearts-button\"),menu:$(\".t-chearts-menu\")},{button:$(\".t-views-button\"),menu:$(\".t-views-menu\")},{button:$(\".t-shares-button\"),menu:$(\".t-shares-menu\")},{button:$(\".t-favorites-button\"),menu:$(\".t-favorites-menu\")},{button:$(\".t-livestream-button\"),menu:$(\".t-livestream-menu\")},{button:$(\".ig-followers-button\"),menu:$(\".ig-followers-menu\")},{button:$(\".ig-likes-button\"),menu:$(\".ig-likes-menu\")}];$.each(t,function(t,e){e.button.click(function(){$(\".colsmenu\").addClass(\"nonec\"),e.menu.removeClass(\"nonec\")})})});"],["script","/devtoolsDetector\\.launch\\(\\)\\;/"],["script","//$('#btn_download').click();","$('#btn_download').click();","sedCount","1"],["script","/reymit_ads_for_categories\\.length>0|reymit_ads_for_streams\\.length>0/g","false"],["script","/data: \\[.*\\],/","data: [],","condition","ads_num"],["script","/try.*finally.*?}/"],["script","/for\\s*\\(\\s*(const|let|var).*?\\)\\;return\\;\\}_/g","_","condition","attribute"],["script","adv_","","condition","flashvars"],["script","typeof window.loadtwo","typeof window.loadtwo === true"],["script","(window.loadtwo","(window.loadtwo === undefined || true || window.googlescriptloaded"],["script","window.location.href = '/helpus';"],["script","/if \\(api && url\\).+/s","window.location.href = url","condition","quick-link"],["script","= getSetTimeout()","= function newTimeout(func, timer) {func()}"],["script","IFRAME","BODY"],["script","(hasBlocker)","(false)"],["P","/\\.[^.]+(1Password password manager|download 1Password)[^.]+/"],["script","startTime: '5'","startTime: '0'"],["script","/(function downloadHD\\(obj\\) {)[\\s\\S]*?(datahref.*)[\\s\\S]*?(window.location.href = datahref;)[\\s\\S]*/","$1$2$3}"],["script","buton.setAttribute","location.href=urldes;buton.setAttribute"],["script","clickCount === numberOfAdsBeforeCopy","numberOfAdsBeforeCopy >= clickCount"],["script","/if\\(.&&.\\.target\\)/","if(false)"],["script","(document.hasFocus())","(false)"],["script","popunder","","condition","popunder","stay","1"],["script","(adEnable)","(true)"],["script","\"}};","\"}}; jQuery(document).ready(function(t){let e=document.createElement(\"link\");e.setAttribute(\"rel\",\"stylesheet\"),e.setAttribute(\"media\",\"all\"),e.setAttribute(\"href\",\"https://dragontea.ink/wp-content/cache/autoptimize/css/autoptimize_5bd1c33b717b78702e18c3923e8fa4f0.css\"),document.head.appendChild(e),t(\".dmpvazRKNzBib1IxNjh0T0cwUUUxekEyY3F6Wm5QYzJDWGZqdXFnRzZ0TT0nuobc\").parent().prev().prev().prev();var a=1,n=16,r=11,i=\"08\",g=\"\",c=\"\",d=0,o=2,p=3,s=0,h=100;s++,s*=2,h/=2,h/=2;var $=3,u=20;function b(){let e=t(\".entry-header.header\"),a=parseInt(e.attr(\"data-id\"));return a}function m(t,e,a,n,r){return CryptoJSAesJson.decrypt(t,e+a+n+r)}function f(t,e){return CryptoJSAesJson.decrypt(t,e)}function l(t,e){return parseInt(t.toString()+e.toString())}function k(t,e,a){return t.toString()+e.toString()+a.toString()}$*=2,u=u-2-2,i=\"03\",o++,r++,n=n/4-2,a++,a*=4,n++,n++,n++,a-=5,r++,i=\"07\",t(\".reading-content .page-break img\").each(function(){var e,g=t(this),c=f(g.attr(\"id\").toString(),(e=parseInt((b()+l(r,i))*a-t(\".reading-content .page-break img\").length),e=l(2*n+1,e)).toString());g.attr(\"id\",c)}),r=0,n=0,a=0,i=0,t(\".reading-content .page-break img\").each(function(){var e=t(this),a=parseInt(e.attr(\"id\").replace(/image-(\\d+)[a-z]+/i,\"$1\"));t(\".reading-content .page-break\").eq(a).append(e)}),t(\".reading-content .page-break img\").each(function(){var e=t(this).attr(\"id\");g+=e.substr(-1),t(this).attr(\"id\",e.slice(0,-1))}),d++,$++,$++,u/=4,u*=2,o*=2,p-=3,p++,t(\".reading-content .page-break img\").each(function(){var e,a=t(this),n=f(a.attr(\"dta\").toString(),(e=parseInt((b()+l($,u))*(2*d)-t(\".reading-content .page-break img\").length-(4*d+1)),e=k(2*o+p+p+1,g,e)).toString());a.attr(\"dta\",n)}),d=0,$=0,u=0,o=0,p=0,t(\".reading-content .page-break img\").each(function(){var e=t(this).attr(\"dta\").substr(-2);c+=e,t(this).removeAttr(\"dta\")}),s*=s,s++,h-=25,h++,h++,t(\".reading-content .page-break img\").each(function(){var e=t(this),a=f(e.attr(\"data-src\").toString(),(b(),k(b()+4*s,c,t(\".reading-content .page-break img\").length*(2*h))).toString());e.attr(\"data-src\",a)}),s=0,h=0,t(\".reading-content .page-break img\").each(function(){t(this).addClass(\"wp-manga-chapter-img img-responsive lazyload effect-fade\")}),_0xabe6x4d=!0});"],["script","scri12pts && ifra2mes && coo1kies","true"],["script","(scri12pts && ifra2mes)","(true)"],["script","/catch[\\s\\S]*?}/","","condition","fetch"],["script","/(function playVideo\\(\\) \\{[\\s\\S]*?\\.remove\\(\\);[\\s\\S]*?\\})/","$1 playVideo();"],["script","video_urls.length != activeItem","!1"],["script","adblockDetected = true","adblockDetected = false"],["script","window._taboola =","(()=>{const e={apply:(e,o,l)=>o.closest(\"body > video[src^=\\\"blob:\\\"]\")===o?Promise.resolve(!0):Reflect.apply(e,o,l)};HTMLVideoElement.prototype.play=new Proxy(HTMLVideoElement.prototype.play,e)})();window._taboola ="],["script","/window.open.*;/"],["script","!seen","false"],["script","/if.*Disable.*?;/g","","condition","blocker"],["script","this.ads.length > this.ads_start","1==2"],["script","/\\$\\(['\"]\\.play-overlay['\"]\\)\\.click.+/s","document.getElementById(\"mainvideo\").src=srclink;player.currentTrack=0;})})","condition","srclink"],["script","const ad_slot_","(()=>{window.addEventListener(\"load\",(()=>{document.querySelectorAll(\"ins.adsbygoogle\").forEach((element=>element.dataset.adsbygoogleStatus=\"done\"))}))})();const ad_slot_","sedCount","1"],["script","window.dataLayer =","(()=>{const time=parseInt(document.querySelector(\"meta[http-equiv=\\\"refresh\\\"]\").content.split(\";\")[0])*1000+1000;setTimeout(()=>{document.body.innerHTML=document.body.innerHTML},time)})();window.dataLayer =","sedCount","1"],["script","(self.__next_f=","[\"timeupdate\",\"durationchange\",\"ended\",\"enterpictureinpicture\",\"leavepictureinpicture\",\"loadeddata\",\"loadedmetadata\",\"loadstart\",\"pause\",\"play\",\"playing\",\"ratechange\",\"resize\",\"seeked\",\"seeking\",\"suspend\",\"volumechange\",\"waiting\"].forEach((e=>{window.addEventListener(e,(()=>{const e=document.getElementById(\"player\"),t=document.querySelector(\".plyr__time\");e.src.startsWith(\"https://i.imgur.com\")&&\"none\"===window.getComputedStyle(t).display&&(e.src=\"https://cdn.plyr.io/static/blank.mp4\",e.paused&&e.plyr.play())}))}));(self.__next_f=","sedCount","1"],["style","{height:370px;}","{height:70px;}"],["script","vid.vast","//vid.vast"],["script","/(function reklamla\\([^)]+\\) {)/","$1rekgecyen(0);"],["script","'G-1B4LC0KT6C');","'G-1B4LC0KT6C'); window.setTimeout(function(){blockPing()},200);"],["script","/manageAds\\(video_urls\\[activeItem\\], video_seconds\\[activeItem\\], ad_urls\\[activeItem],true\\);/","playVideo();","condition","playAdd"],["script","preroll_timer_current == 0 && preroll_player_called == false","true"],["script","/^var \\w+=\\[.+/","(()=>{let e=[];document.addEventListener(\"DOMContentLoaded\",(()=>{const t=document.querySelector(\"body script\").textContent.match(/\"] = '(.*?)'/g);if(!t)return;t.forEach((t=>{const r=t.replace(/.*'(.*?)'/,\"$1\");e.push(r)}));const r=document.querySelector('.dl_button[href*=\"preview\"]').href.split(\"?\")[1];e.includes(r)&&(e=e.filter((e=>e!==r)));document.querySelectorAll(\".dl_button[href]\").forEach((t=>{t.target=\"_blank\";let r=t.cloneNode(!0);r.href=t.href.replace(/\\?.*/,`?${e[0]}`),t.after(r);let o=t.cloneNode(!0);o.href=t.href.replace(/\\?.*/,`?${e[1]}`),t.after(o)}))}))})();","sedCount","1"],["script","/vastSource.*?,/","vastSource:'',"],["script","/window.location.href[^?]+this[^?]+;/"],["script","/function _.*JSON.*}}/gms","function checkName(){const a = document.querySelector(\".monsters .button_wrapper .button\");const b = document.querySelector(\"#nick\");const c = \"/?from_land=1&nick=\";a.addEventListener(\"click\", function () {document.location.href = c + b.value;}); } checkName();"],["script","/document.body.appendChild.*;/"],["script","adClicks = 0;","adClicks = 2;"],["script","(firstAdOpened)","(true)"],["script","window.location.replace(urlRandom);",""],["script","/window\\.location\\.replace\\([^)]+\\);?/g"],["script","var CBSNEWS =","navigator.serviceWorker.getRegistrations().then((registrations=>{for(const registration of registrations){if(registration.scope.includes(\"cbsnews.com\")){registration.unregister()}}}));var CBSNEWS ="]];
const hostnamesMap = new Map([["www.youtube.com",0],["infinityscans.xyz",[1,2]],["infinityscans.net",[1,2]],["infinityscans.org",[1,2]],["panel.freemcserver.net",[3,131]],["bing.com",4],["client.falixnodes.net",[5,96,97,98]],["9to5google.com",6],["9to5mac.com",6],["api.dock.agacad.com",7],["ozap.com",8],["jprime.jp",9],["bild.de",10],["ashemaletube.*",[11,12]],["pornblade.com",13],["pornfelix.com",13],["nhentai.net",14],["jizzbunker.com",15],["multiup.io",16],["player.buffed.de",17],["player.gamezone.de",17],["player.gamesaktuell.de",17],["player.pcgames.de",17],["player.videogameszone.de",17],["player.pcgameshardware.de",17],["giga.de",18],["kino.de",18],["spieletipps.de",18],["desired.de",18],["t-online.de",19],["sport.de",20],["forum.release-apk.com",21],["modijiurl.com",22],["starkroboticsfrc.com",23],["sinonimos.de",23],["antonimos.de",23],["quesignifi.ca",23],["tiktokrealtime.com",23],["tiktokcounter.net",23],["tpayr.xyz",23],["poqzn.xyz",23],["ashrfd.xyz",23],["rezsx.xyz",23],["tryzt.xyz",23],["ashrff.xyz",23],["rezst.xyz",23],["dawenet.com",23],["erzar.xyz",23],["waezm.xyz",23],["waezg.xyz",23],["blackwoodacademy.org",23],["cryptednews.space",23],["vivuq.com",23],["swgop.com",23],["vbnmll.com",23],["telcoinfo.online",23],["dshytb.com",23],["link.djbassking.live",[24,25]],["tech5s.co",[24,25]],["game5s.com",[24,25]],["publicearn.*",[26,27,28]],["itijobalert.in",29],["techkhulasha.com",29],["tech.pubghighdamage.com",[30,31,32]],["tech.techkhulasha.com",[30,31,32]],["hipsonyc.com",[30,31,32]],["labgame.io",33],["blog.cryptowidgets.net",[34,35]],["blog.insurancegold.in",[34,35]],["blog.wiki-topia.com",[34,35]],["blog.coinsvalue.net",[34,35]],["blog.cookinguide.net",[34,35]],["blog.freeoseocheck.com",[34,35]],["blog.coinsrise.net",35],["blog.makeupguide.net",35],["blog.carstopia.net",35],["blog.carsmania.net",35],["bitzite.com",35],["appsbull.com",35],["diudemy.com",35],["maqal360.com",35],["advertisingexcel.com",35],["allcryptoz.net",35],["batmanfactor.com",35],["beautifulfashionnailart.com",35],["crewbase.net",35],["crewus.net",35],["documentaryplanet.xyz",35],["gametechreviewer.com",35],["midebalonu.net",35],["misterio.ro",35],["phineypet.com",35],["seory.xyz",35],["shinbhu.net",35],["shinchu.net",35],["substitutefor.com",35],["talkforfitness.com",35],["thefitbrit.co.uk",35],["thumb8.net",35],["thumb9.net",35],["topcryptoz.net",35],["uniqueten.net",35],["ultraten.net",35],["exactpay.online",35],["aylink.co",36],["cpmlink.pro",36],["suaurl.com",37],["mamahawa.com",38],["nanolinks.in",39],["adrinolinks.com",39],["link.vipurl.in",39],["dlink2.net",40],["headlinerpost.com",41],["drinkspartner.com",41],["apcvpc.com",41],["posterify.net",41],["manishclasses.in",41],["www.apkmoddone.com",[42,43]],["dl.apkmoddone.com",44],["phongroblox.com",44],["mahitimanch.in",[45,46]],["indiamaja.com",[45,46]],["5ghindi.in",[45,46]],["inshorturl.com",47],["rfiql.com",[48,49]],["gujjukhabar.in",[48,49]],["smartfeecalculator.com",[48,49]],["djxmaza.in",[48,49]],["thecubexguide.com",[48,49]],["jytechs.in",[48,49]],["dropgalaxy.*",[50,51]],["financemonk.net",[50,51]],["dailytech-news.eu",52],["fuckingfast.co",53],["driveup.sbs",54],["xdl.my.id",55],["in91vip.win",56],["m.jobinmeghalaya.in",[57,58]],["fastt.gg",59],["3dsfree.org",60],["jpvhub.com",61],["aagmaal.*",62],["247sports.com",63],["etoday.co.kr",64],["isplus.com",65],["economist.co.kr",66],["hometownstation.com",67],["sportalkorea.com",68],["m.edaily.co.kr",69],["honkailab.com",70],["lifehacker.jp",71],["playhydrax.com",72],["eroasmr.com",73],["bussyhunter.com",74],["xcloud.*",75],["xfile.*",76],["kusonime.com",77],["codingnepalweb.com",78],["demonoid.is",79],["freebie-ac.jp",80],["photopea.com",81],["streamingcommunity.*",82],["derstandard.at",83],["derstandard.de",83],["www.chip.de",84],["redketchup.io",85],["emturbovid.com",86],["findjav.com",86],["javggvideo.xyz",86],["mmtv01.xyz",86],["stbturbo.xyz",86],["streamsilk.com",[86,87]],["zefoy.com",88],["idoitmyself.xyz",89],["uploadboy.com",90],["reymit.ir",91],["empire-anime.*",92],["empire-stream.*",92],["empire-streaming.*",92],["empire-streamz.*",92],["foodxor.com",93],["download.megaup.net",94],["adultdeepfakes.com",95],["linkshortify.com",99],["nexusmods.com",100],["comidacaseira.me",101],["tvbanywherena.com",102],["haveibeenpwned.com",103],["trainerscity.com",104],["tikmate.app",105],["sonixgvn.net",106],["paste-drop.com",107],["filext.com",108],["kiddyearner.com",109],["fullxh.com",110],["galleryxh.site",110],["megaxh.com",110],["movingxh.world",110],["seexh.com",110],["unlockxh4.com",110],["valuexh.life",110],["xhaccess.com",110],["xhadult2.com",110],["xhadult3.com",110],["xhadult4.com",110],["xhadult5.com",110],["xhamster.*",110],["xhamster1.*",110],["xhamster10.*",110],["xhamster11.*",110],["xhamster12.*",110],["xhamster13.*",110],["xhamster14.*",110],["xhamster15.*",110],["xhamster16.*",110],["xhamster17.*",110],["xhamster18.*",110],["xhamster19.*",110],["xhamster20.*",110],["xhamster2.*",110],["xhamster3.*",110],["xhamster4.*",110],["xhamster42.*",110],["xhamster46.com",110],["xhamster5.*",110],["xhamster7.*",110],["xhamster8.*",110],["xhamsterporno.mx",110],["xhbig.com",110],["xhbranch5.com",110],["xhchannel.com",110],["xhdate.world",110],["xhday.com",110],["xhday1.com",110],["xhlease.world",110],["xhmoon5.com",110],["xhofficial.com",110],["xhopen.com",110],["xhplanet1.com",110],["xhplanet2.com",110],["xhreal2.com",110],["xhreal3.com",110],["xhspot.com",110],["xhtotal.com",110],["xhtree.com",110],["xhvictory.com",110],["xhwebsite.com",110],["xhwebsite2.com",110],["xhwebsite5.com",110],["xhwide1.com",110],["xhwide2.com",110],["xhwide5.com",110],["katfile.com",111],["dragontea.ink",112],["perchance.org",[113,114]],["cheater.ninja",115],["dizikral.com",[116,117]],["dizikral1.pro",116],["dizikral2.pro",116],["dizikral3.pro",116],["dizikral4.pro",116],["dizikral5.pro",116],["soccerinhd.com",118],["streamcaster.live",118],["barstoolsports.com",119],["filmi7.net",120],["hidan.co",121],["hidan.sh",121],["authenticateme.xyz",122],["filmizlehdizle.com",123],["fullfilmizlesene.net",123],["strcloud.in",124],["streamta.site",124],["streamtape.*",124],["watchadsontape.com",124],["tempmail.ninja",125],["filmy4wap.co.in",126],["filmy4waps.org",126],["filiser.eu",127],["wishflix.cc",127],["zalukaj.io",127],["abs-cbn.com",128],["cdn.tiesraides.lv",129],["filmizleplus.cc",130],["dizipal911.com",132],["dizipal912.com",132],["dizipal913.com",132],["dizipal914.com",132],["dizipal915.com",132],["dizipal916.com",132],["dizipal917.com",132],["dizipal918.com",132],["dizipal919.com",132],["dizipal920.com",132],["dizipal921.com",132],["dizipal922.com",132],["dizipal923.com",132],["dizipal924.com",132],["dizipal925.com",132],["dizipal926.com",132],["dizipal927.com",132],["dizipal928.com",132],["dizipal929.com",132],["dizipal930.com",132],["dizipal931.com",132],["dizipal932.com",132],["dizipal933.com",132],["dizipal934.com",132],["dizipal935.com",132],["dizipal936.com",132],["dizipal937.com",132],["dizipal938.com",132],["dizipal939.com",132],["dizipal940.com",132],["dizipal941.com",132],["dizipal942.com",132],["dizipal943.com",132],["dizipal944.com",132],["dizipal945.com",132],["dizipal946.com",132],["dizipal947.com",132],["dizipal948.com",132],["dizipal949.com",132],["dizipal950.com",132],["dizipal951.com",132],["dizipal952.com",132],["dizipal953.com",132],["dizipal954.com",132],["dizipal955.com",132],["dizipal956.com",132],["dizipal957.com",132],["dizipal958.com",132],["dizipal959.com",132],["dizipal960.com",132],["dizipal961.com",132],["dizipal962.com",132],["dizipal963.com",132],["dizipal964.com",132],["dizipal965.com",132],["dizipal966.com",132],["dizipal967.com",132],["dizipal968.com",132],["dizipal969.com",132],["dizipal970.com",132],["dizipal971.com",132],["dizipal972.com",132],["dizipal973.com",132],["dizipal974.com",132],["dizipal975.com",132],["dizipal976.com",132],["dizipal977.com",132],["dizipal978.com",132],["dizipal979.com",132],["dizipal980.com",132],["dizipal981.com",132],["dizipal982.com",132],["dizipal983.com",132],["dizipal984.com",132],["dizipal985.com",132],["dizipal986.com",132],["dizipal987.com",132],["dizipal988.com",132],["dizipal989.com",132],["dizipal990.com",132],["dizipal991.com",132],["dizipal992.com",132],["dizipal993.com",132],["dizipal994.com",132],["dizipal995.com",132],["dizipal996.com",132],["dizipal997.com",132],["dizipal998.com",132],["dizipal999.com",132],["indianporngirl10.com",133],["exploader.net",134],["lewdgames.to",135],["flixhouse.com",136],["eatcells.com",137],["ripplehub.site",138],["turbostream.tv",[139,140]],["1337x.fyi",141],["1337x.pro",141],["magnetdl.*",142],["cbsnews.com",143]]);
const exceptionsMap = new Map([["xcloud.eu",[75]],["xcloud.host",[75]]]);
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
    try { replaceNodeText(...argsList[i]); }
    catch { }
}

/******************************************************************************/

// End of local scope
})();

void 0;
