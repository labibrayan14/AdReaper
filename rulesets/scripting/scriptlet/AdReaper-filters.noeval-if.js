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
(function uBOL_noEvalIf() {

/******************************************************************************/

function noEvalIf(
    needle = ''
) {
    if ( typeof needle !== 'string' ) { return; }
    const safe = safeSelf();
    const logPrefix = safe.makeLogPrefix('noeval-if', needle);
    const reNeedle = safe.patternToRegex(needle);
    proxyApplyFn('eval', function(context) {
        const { callArgs } = context;
        const a = String(callArgs[0]);
        if ( needle !== '' && reNeedle.test(a) ) {
            safe.uboLog(logPrefix, 'Prevented:\n', a);
            return;
        }
        if ( needle === '' || safe.logLevel > 1 ) {
            safe.uboLog(logPrefix, 'Not prevented:\n', a);
        }
        return context.reflect();
    });
}

function proxyApplyFn(
    target = '',
    handler = ''
) {
    let context = globalThis;
    let prop = target;
    for (;;) {
        const pos = prop.indexOf('.');
        if ( pos === -1 ) { break; }
        context = context[prop.slice(0, pos)];
        if ( context instanceof Object === false ) { return; }
        prop = prop.slice(pos+1);
    }
    const fn = context[prop];
    if ( typeof fn !== 'function' ) { return; }
    if ( proxyApplyFn.CtorContext === undefined ) {
        proxyApplyFn.ctorContexts = [];
        proxyApplyFn.CtorContext = class {
            constructor(...args) {
                this.init(...args);
            }
            init(callFn, callArgs) {
                this.callFn = callFn;
                this.callArgs = callArgs;
                return this;
            }
            reflect() {
                const r = Reflect.construct(this.callFn, this.callArgs);
                this.callFn = this.callArgs = this.private = undefined;
                proxyApplyFn.ctorContexts.push(this);
                return r;
            }
            static factory(...args) {
                return proxyApplyFn.ctorContexts.length !== 0
                    ? proxyApplyFn.ctorContexts.pop().init(...args)
                    : new proxyApplyFn.CtorContext(...args);
            }
        };
        proxyApplyFn.applyContexts = [];
        proxyApplyFn.ApplyContext = class {
            constructor(...args) {
                this.init(...args);
            }
            init(callFn, thisArg, callArgs) {
                this.callFn = callFn;
                this.thisArg = thisArg;
                this.callArgs = callArgs;
                return this;
            }
            reflect() {
                const r = Reflect.apply(this.callFn, this.thisArg, this.callArgs);
                this.callFn = this.thisArg = this.callArgs = this.private = undefined;
                proxyApplyFn.applyContexts.push(this);
                return r;
            }
            static factory(...args) {
                return proxyApplyFn.applyContexts.length !== 0
                    ? proxyApplyFn.applyContexts.pop().init(...args)
                    : new proxyApplyFn.ApplyContext(...args);
            }
        };
    }
    const fnStr = fn.toString();
    const toString = (function toString() { return fnStr; }).bind(null);
    const proxyDetails = {
        apply(target, thisArg, args) {
            return handler(proxyApplyFn.ApplyContext.factory(target, thisArg, args));
        },
        get(target, prop) {
            if ( prop === 'toString' ) { return toString; }
            return Reflect.get(target, prop);
        },
    };
    if ( fn.prototype?.constructor === fn ) {
        proxyDetails.construct = function(target, args) {
            return handler(proxyApplyFn.CtorContext.factory(target, args));
        };
    }
    context[prop] = new Proxy(fn, proxyDetails);
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
const argsList = [["replace"],["ExoLoader"],["ads"],["setInterval"],["tmohentai"],["debugger"],["detectAdBlock"],["adsBlocked"],["adb"],["ppu"],["chp_ad"],["adsbygoogle"],["/chp_?ad/"],["/07c225f3\\.online|content-loader\\.com|css-load\\.com|html-load\\.com/"],["show"],["AdBlock"],["popUnderStage"],["/adbl/i"],["window.open"],["deblocker"],["adblock"],["popunder"],["interactionCount"],["String.fromCharCode"],["blocker"],["UserCustomPop"],["AdBlocker"],["/popunder/i"],["shift"],["/ads|chp_?ad/"],["style.display"],["/adb/i"],["adbl"]];
const hostnamesMap = new Map([["orgyxxxhub.com",0],["shrink.*",0],["junkyponk.com",0],["healthfirstweb.com",0],["vocalley.com",0],["yogablogfit.com",0],["howifx.com",0],["en.financerites.com",0],["mythvista.com",0],["livenewsflix.com",0],["cureclues.com",0],["apekite.com",0],["flash-firmware.blogspot.com",0],["uploady.io",0],["taodung.com",0],["3movs.com",1],["forexlap.com",2],["mlwbd.*",2],["top10cafe.se",2],["dailytech-news.eu",2],["phpscripttr.com",2],["7misr4day.com",2],["descargaspcpro.net",2],["dotadostube.com",2],["taradinhos.com",2],["katmoviefix.*",2],["game-2u.com",2],["layardrama21.*",2],["toramemoblog.com",2],["cashbux.work",2],["sdmoviespoint.*",2],["gplastra.com",2],["okleak.com",2],["afly.pro",2],["ithinkilikeyou.net",2],["milanreports.com",2],["towerofgod.me",2],["crotpedia.net",2],["papahd.co",2],["drakescans.com",2],["watchfacebook.com",2],["web1s.asia",2],["bokugents.com",2],["newzjunky.com",2],["yourlifeupdated.net",2],["lscomic.com",2],["tv.durbinlive.com",2],["freeltc.online",2],["pornleaks.in",2],["dudestream.com",2],["areascans.net",2],["bonsaiprolink.shop",2],["exactlyhowlong.com",2],["kumapoi.info",2],["blogcreativos.com",2],["flixlatam.com",2],["samurai.ragnarokscanlation.org",2],["myhindigk.com",2],["l2crypt.com",2],["mdbekjwqa.pw",3],["tmohentai.com",4],["aeonax.com",5],["hentaihaven.xxx",5],["embed.streamx.me",5],["shayarias.in",6],["jksb.in",6],["mazakisan.com",6],["grtjobs.in",6],["call-bomber.info",6],["kajernews.com",6],["vyaapaarguru.in",6],["tinys.click",7],["getintoway.com",7],["jpopsingles.eu",7],["techacode.com",8],["sideplusleaks.com",8],["gamezizo.com",9],["oii.io",9],["azmath.info",10],["azsoft.*",10],["downfile.site",10],["downphanmem.com",10],["expertvn.com",10],["memangbau.com",10],["trangchu.news",10],["aztravels.net",10],["litonmods.com",11],["booksrack.net",11],["helicomicro.com",11],["klyker.com",11],["kontenterabox.com",11],["naruldonghua.com",11],["pienovels.com",11],["enryucomics.com",11],["manhuaga.com",11],["samurai.yoketo.xyz",12],["10-train.com",12],["103.74.5.104",12],["185.193.17.214",12],["247footballnow.com",12],["24pdd.*",12],["27-sidefire-blog.com",12],["2best.club",12],["2the.space",12],["2ix2.com",12],["30kaiteki.com",12],["3dassetcollection.com",12],["3gpterbaru.com",12],["3dyasan.com",12],["3fnews.com",12],["3rabsports.com",12],["4drumkits.com",12],["4fans.gay",12],["4fingermusic.com",12],["4gousya.net",12],["4horlover.com",12],["4spaces.org",12],["519.best",12],["51sec.org",12],["80-talet.se",12],["9ketsuki.info",12],["aboedman.com",12],["adisann.com",12],["adminreboot.com",12],["adsurfle.com",12],["adsy.pw",12],["advertafrica.net",12],["adnan-tech.com",12],["africue.com",12],["aghasolution.com",12],["airportwebcams.net",12],["aitoolsfree.org",12],["aitohuman.org",12],["akihabarahitorigurasiseikatu.com",12],["akuebresources.com",12],["alanyapower.com",12],["albania.co.il",12],["albinofamily.com",12],["alexbacher.fr",12],["algodaodocescan.com.br",12],["allcalidad.app",12],["allcelebritywiki.com",12],["allcivilstandard.com",12],["alliptvlinks.com",12],["alliptvs.com",12],["almofed.com",12],["alphasource.site",12],["altcryp.com",12],["altselection.com",12],["altyazitube22.lat",12],["amaturehomeporn.com",12],["amnaymag.com",12],["amritadrino.com",12],["amtil.com.au",12],["analysis-chess.io.vn",12],["andani.net",12],["androidadult.com",12],["androidfacil.org",12],["angolopsicologia.com",12],["animalwebcams.net",12],["anime4mega.net",12],["anime4mega-descargas.net",12],["anime7.download",12],["anime-torrent.com",12],["animecenterbr.com",12],["animesonlineshd.com",12],["animetwixtor.com",12],["animexin.vip",12],["anmup.com.np",12],["anodee.com",12],["anonyviet.com",12],["anothergraphic.org",12],["aoseugosto.com",12],["aozoraapps.net",12],["apenasmaisumyaoi.com",12],["apkdink.com",12],["apostoliclive.com",12],["appdoze.*",12],["applediagram.com",12],["aprenderquechua.com",12],["arabstd.com",12],["arti-flora.nl",12],["articlebase.pk",12],["articlesmania.me",12],["ascalonscans.com",12],["asiansexdiarys.com",12],["askcerebrum.com",12],["askushowto.com",12],["aspirapolveremigliori.it",12],["assignmentdon.com",12],["astroages.com",12],["astrumscans.xyz",12],["atemporal.cloud",12],["atgstudy.com",12],["atlantisscan.com",12],["atleticalive.it",12],["audiobookexchangeplace.com",12],["audiotools.*",12],["audiotrip.org",12],["autocadcommand.com",12],["autodime.com",12],["autoindustry.ro",12],["automat.systems",12],["automothink.com",12],["autosport.*",12],["avitter.net",12],["awpd24.com",12],["ayatoon.com",12],["ayuka.link",12],["azamericasat.net",12],["azdly.com",12],["azores.co.il",12],["azrom.net",12],["a-ha.io",13],["cboard.net",13],["joongdo.co.kr",13],["viva100.com",13],["gamingdeputy.com",13],["alle-tests.nl",13],["meconomynews.com",13],["brandbrief.co.kr",13],["motorgraph.com",13],["topstarnews.net",13],["maccanismi.it",14],["gamesrepacks.com",14],["techhelpbd.com",14],["pokemundo.com",14],["lewebde.com",14],["app.covemarkets.com",14],["pasteit.*",15],["tabele-kalorii.pl",15],["hentaistream.com",16],["nudeselfiespics.com",16],["hentaivideos.net",16],["hyundaitucson.info",17],["xcloud.*",18],["xdld.pages.dev",18],["xdld.lat",18],["ergasiakanea.eu",19],["conghuongtu.net",19],["downloadlyir.com",19],["ipamod.com",19],["techedubyte.com",19],["apkdrill.com",19],["gsmware.com",20],["arldeemix.com",20],["filemooon.top",[21,27]],["autosport.com",22],["motorsport.com",22],["cdn.gledaitv.live",23],["claimlite.club",24],["kurakura21.space",25],["blackhatworld.com",26],["3ixcf45.cfd",27],["76078rb.sbs",27],["defienietlynotme.com",27],["embedme.*",27],["finfang.*",27],["fmembed.cc",27],["fmhd.bar",27],["fmoonembed.pro",27],["hellnaw.*",27],["moonembed.*",27],["rgeyyddl.skin",27],["sbnmp.bar",27],["sulleiman.com",27],["vpcxz19p.xyz",27],["z12z0vla.*",27],["kickassanime.ch",28],["cgcosplay.org",29],["bilinovel.com",30],["linovelib.com",31],["freevpn.us",32]]);
const exceptionsMap = new Map([["xcloud.eu",[18]],["xcloud.host",[18]]]);
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
    try { noEvalIf(...argsList[i]); }
    catch { }
}

/******************************************************************************/

// End of local scope
})();

void 0;
