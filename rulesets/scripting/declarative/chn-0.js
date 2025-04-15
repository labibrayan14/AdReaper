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

// ruleset: chn-0

// Important!
// Isolate from global scope
(function uBOL_cssDeclarativeImport() {

/******************************************************************************/

const argsList = ["","{\"selector\":\"html\",\"action\":[\"style\",\"overflow: auto !important;\"]}","{\"selector\":\".download .content-area > div[class]\",\"action\":[\"style\",\"background-image: none !important;\"]}","{\"selector\":\"#detect.ad-placement\",\"action\":[\"style\",\"display: block !important;\"]}","{\"selector\":\"body\",\"action\":[\"style\",\"overflow-y: auto !important;\"]}","{\"selector\":\".adsbygoogle\",\"action\":[\"style\",\"height: 1px !important;\"]}","{\"selector\":\"body #aswift_1:not(#style_important)\",\"action\":[\"style\",\"display: block !important;\"]}","{\"selector\":\".player-rm > a[target=\\\"_blank\\\"]\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"]}\n{\"selector\":\"a[href*=\\\".umtrack.com/\\\"]\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"]}","{\"selector\":\"#SlashviewAdDetector\",\"action\":[\"style\",\"display: block !important;\"]}","{\"selector\":\"a[href*=\\\"/entry/register/?i_code=\\\"]\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"]}","{\"selector\":\"body[style]\",\"action\":[\"style\",\"overflow: auto !important;\"]}","{\"selector\":\":is(#volume-list, #TextContent)\",\"action\":[\"style\",\"display: block !important;\"]}","{\"selector\":\".adsbygoogle\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}","{\"selector\":\"body.modal-open\",\"action\":[\"style\",\"padding-right: 0!important; overflow: visible!important;\"]}","{\"selector\":\"#acornerinner1122\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}","{\"selector\":\".fb_fanpage_inpage > .other_news_box_2\",\"action\":[\"style\",\"padding: 0 0px!important; margin: 26px 0!important;\"]}","{\"selector\":\"#BH-bigbanner\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}\n{\"selector\":\"#flyRightBox\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}\n{\"selector\":\"img[onload=\\\"AntiAd.check(this)\\\"]\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}","{\"selector\":\"a[href*=\\\".11h5.\\\"] img\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}","{\"selector\":\"body > article[class][style*=\\\"position: fixed;top: 0;z-index: 9999;display:block !important;\\\"]\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}","{\"selector\":\"#ypaad\",\"action\":[\"style\",\"height: 3px!important;\"]}","{\"selector\":\"div[id^=\\\"gklobl\\\"]\",\"action\":[\"style\",\"height: 1px!important;\"]}","{\"selector\":\".sptable_do_not_remove\",\"action\":[\"style\",\"display: block !important; visibility: hidden !important;\"]}","{\"selector\":\".bg-overlayer\",\"action\":[\"style\",\"pointer-events: unset !important;\"]}","{\"selector\":\"#content_left > div[style*=\\\"display:block !important;\\\"]:not(.result)\",\"action\":[\"style\",\"position: absolute!important; left: -4000px!important;\"]}\n{\"selector\":\".ec_wise_ad\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"]}","{\"selector\":\"#ADback\",\"action\":[\"style\",\"background: none !important;\"]}","{\"selector\":\"body\",\"action\":[\"style\",\"background-image: none !important;\"]}","{\"selector\":\".main-content\",\"action\":[\"style\",\"background-image: none !important;\"]}","{\"selector\":\".finance_header\",\"action\":[\"style\",\"height: auto !important;\"]}","{\"selector\":\".special_conf_skin .wrap1\",\"action\":[\"style\",\"background: none !important;\"]}","{\"selector\":\".app.padding > .header\",\"action\":[\"style\",\"top: 0 !important;\"]}\n{\"selector\":\".app.padding\",\"action\":[\"style\",\"margin-top: 0 !important;\"]}","{\"selector\":\"body[style*=\\\"overflow\\\"]\",\"action\":[\"style\",\"overflow: auto !important;\"]}","{\"selector\":\".wpcom_ad_wrap\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"]}","{\"selector\":\"#comment\",\"action\":[\"style\",\"margin-bottom: 0 !important;\"]}","{\"selector\":\".player-side > .block\",\"action\":[\"style\",\"visibility: hidden !important; min-height: 390px !important;\"]}","{\"selector\":\".wrapper > div[data-content-source] > .modalOpenWidth[style*=\\\"top:\\\"]\",\"action\":[\"style\",\"top: 80px !important;\"]}","{\"selector\":\".q-body--prevent-scroll\",\"action\":[\"style\",\"position: static !important;\"]}","{\"selector\":\"body\",\"action\":[\"style\",\"overflow: auto !important;\"]}","{\"selector\":\"#j-topBgBox + .crumbs-nav.top-op\",\"action\":[\"style\",\"margin-bottom: 10px !important;\"]}","{\"selector\":\"#mainContent\",\"action\":[\"style\",\"display: block !important;\"]}","{\"selector\":\"#firstSingle\",\"action\":[\"style\",\"padding: 0 !important;\"]}","{\"selector\":\"img[width=\\\"960\\\"][height=\\\"90\\\"]\",\"action\":[\"style\",\"height: 0 !important;\"]}","{\"selector\":\".whitecon > .related[data-desc=\\\"相關新聞\\\"] > li:nth-child(5)\",\"action\":[\"style\",\"margin-right: 0!important; margin-left: 20px!important;\"]}","{\"selector\":\"#header > nav.floated-navbar\",\"action\":[\"style\",\"top: 0!important;\"]}","{\"selector\":\"#m2\",\"action\":[\"style\",\"height: 5px!important;\"]}","{\"selector\":\"body\",\"action\":[\"style\",\"overflow: visible!important;\"]}","{\"selector\":\".app-container[aria-expanded=\\\"false\\\"] section.with-ad\",\"action\":[\"style\",\"width: calc(100% - 20px) !important;\"]}\n{\"selector\":\".c-ad-103\",\"action\":[\"style\",\"height: 0 !important;\"]}\n{\"selector\":\".main_ad_head_wide\",\"action\":[\"style\",\"padding-top: 0 !important;\"]}\n{\"selector\":\".with-ad[data-layout=\\\"list\\\"] .main-header\",\"action\":[\"style\",\"width: 100% !important;\"]}\n{\"selector\":\".with-ad[data-layout=\\\"list\\\"][data-section-type=\\\"new-video\\\"] .content-wrap:nth-child(-1n+2)\",\"action\":[\"style\",\"width: 100% !important;\"]}","{\"selector\":\"iframe[width=\\\"728\\\"][height=\\\"90\\\"]\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}","{\"selector\":\"[data-href*=\\\"://sax\\\"]\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}","{\"selector\":\"#player_div\",\"action\":[\"style\",\"display: block!important;\"]}","{\"selector\":\"div[class*=\\\"-ad-sidebar-\\\"]\",\"action\":[\"style\",\"position: absolute!important; left: -3000px!important;\"]}","{\"selector\":\"#video_player\",\"action\":[\"style\",\"display: block!important;\"]}\n{\"selector\":\".playmar > .playl\",\"action\":[\"style\",\"visibility: hidden!important;\"]}\n{\"selector\":\".playmar > .playr\",\"action\":[\"style\",\"visibility: hidden!important;\"]}","{\"selector\":\".sidebar > section#text-8[style*=\\\"bottom: 240px;\\\"]\",\"action\":[\"style\",\"position: static !important;\"]}","{\"selector\":\"body\",\"action\":[\"style\",\"padding-top: 0!important;\"]}","{\"selector\":\"html\",\"action\":[\"style\",\"overflow: visible!important;\"]}","{\"selector\":\"#wrapfabtest\",\"action\":[\"style\",\"height: 1px!important;\"]}","{\"selector\":\".top_bg\",\"action\":[\"style\",\"height: 60px !important;\"]}","{\"selector\":\"#ac-globalnav\",\"action\":[\"style\",\"top: 0 !important;\"]}\n{\"selector\":\".ac-gn-blur\",\"action\":[\"style\",\"top: 0 !important;\"]}\n{\"selector\":\"html #globalnav\",\"action\":[\"style\",\"top: 0 !important;\"]}\n{\"selector\":\"html\",\"action\":[\"style\",\"margin-top: 0 !important;\"]}","{\"selector\":\"body > div.content\",\"action\":[\"style\",\"margin-top: 0 !important;\"]}","{\"selector\":\"body\",\"action\":[\"style\",\"overflow: auto !important; padding-right: 0 !important;\"]}","{\"selector\":\"#chaptercontent\",\"action\":[\"style\",\"filter: unset !important;\"]}","{\"selector\":\".swiper-wrapper > .swiper-slide:has(> a[target-url])\",\"action\":[\"style\",\"visibility: hidden !important;\"]}","{\"selector\":\".t-b.sel > ul.nl > li:has(> a[href*=\\\"/lapin.\\\"])\",\"action\":[\"style\",\"visibility: hidden !important;\"]}","{\"selector\":\"[data-spotim-module=\\\"recirculation\\\"][data-spotim-showing-slots~=\\\"1-start-300x250\\\"] .spotim-recirculation div[data-spotim-row] > div[data-spotim-slot-size=\\\"300x250\\\"] ~ .sprcRftoX\",\"action\":[\"style\",\"margin-left: 0!important;\"]}\n{\"selector\":\"body [data-spotim-module=\\\"recirculation\\\"][data-spotim-showing-slots~=\\\"1-start-300x250\\\"] .sprc2PlxR [data-spotim-row=\\\"1\\\"]::before\",\"action\":[\"style\",\"left: 0!important;\"]}","{\"selector\":\".container > div[class*=\\\"-card\\\"]:has(div[style=\\\"display: none !important;\\\"])\",\"action\":[\"style\",\"position: absolute !important; left: -3000px !important;\"]}"];
const argsSeqs = [0,1,2,3,4,5,6,7,8,9,10,-10,11,12,13,14,15,16,-17,18,17,19,20,21,22,-22,33,23,24,25,26,27,28,29,30,31,32,34,35,36,37,38,39,40,41,42,43,44,-44,53,45,46,47,48,49,50,51,52,54,55,56,57,58,59,60,61,62,63];
const hostnamesMap = new Map([["colamanga.com",1],["ezneering.com",1],["xbgame.net",2],["1keydata.com",3],["renfei.net",4],["ekamus.info",5],["haoweichi.com",5],["rjno1.com",6],["waipian1.com",7],["waipian2.com",7],["waipian3.com",7],["waipian4.com",7],["waipian5.com",7],["waipian6.com",7],["waipian7.com",7],["waipian8.com",7],["waipian9.com",7],["waipian10.com",7],["waipian11.com",7],["waipian12.com",7],["waipian13.com",7],["waipian14.com",7],["waipian15.com",7],["waipian16.com",7],["waipian17.com",7],["waipian18.com",7],["waipian19.com",7],["waipian20.com",7],["waipian21.com",7],["waipian22.com",7],["waipian23.com",7],["waipian24.com",7],["waipian25.com",7],["waipian26.com",7],["waipian27.com",7],["waipian28.com",7],["waipian29.com",7],["waipian30.com",7],["waipian31.com",7],["waipian32.com",7],["waipian33.com",7],["waipian34.com",7],["waipian35.com",7],["waipian36.com",7],["waipian37.com",7],["waipian38.com",7],["waipian39.com",7],["waipian40.com",7],["slashview.com",8],["bde4.icu",9],["yodu.org",10],["linovelib.com",11],["itshokunin.cc",13],["alotof.software",13],["slashlook.com",14],["520cc.me",15],["cna.com.tw",16],["gamer.com.tw",17],["dilidili.wang",18],["~h5.dilidili.wang",20],["bingfeng.tw",21],["game735.com",22],["t66y.com",23],["yfsp.tv",24],["aiyifan.tv",24],["iyf.tv",25],["baidu.com",27],["csgoob.com",28],["gameapps.hk",29],["4399.com",29],["udn.com",30],["money.163.com",31],["tieba.baidu.com",32],["iqihang.com",33],["dm5.com",34],["ghxi.com",35],["jieav.com",36],["huaban.com",37],["theav.xyz",38],["69xx.one",38],["theporn.cc",38],["ulifestyle.com.hk",39],["applefans.today",39],["book.qidian.com",40],["nxpaaq.com",41],["pansci.asia",42],["com.tw",43],["ltn.com.tw",44],["kocpc.com.tw",45],["macapp.so",46],["mobile01.com",47],["h5.17k.com",48],["liaoningmovie.net",50],["discuss.com.hk",51],["sina.cn",52],["weihemenye.com",53],["sutin0831.pixnet.net",54],["58b.tv",55],["buzzorange.com",56],["m.lelekan.com",57],["duodada.com",57],["v2rayssr.com",58],["51cto.com",59],["apple.com.cn",60],["3dmgame.com",61],["ibbs.pro",62],["xiuting.cc",63],["youku.com",64],["ithome.com",65],["chinese.engadget.com",66],["bilibili.com",67]]);
const hasEntities = false;

self.declarativeImports = self.declarativeImports || [];
self.declarativeImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
