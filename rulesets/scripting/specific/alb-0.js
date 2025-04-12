/*******************************************************************************

    uBlock Origin Lite - a comprehensive, MV3-compliant content blocker
    Copyright (C) 2019-present Raymond Hill

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

    Home: https://github.com/gorhill/uBlock
*/

// ruleset: alb-0

// Important!
// Isolate from global scope
(function uBOL_cssSpecificImports() {

/******************************************************************************/

const argsList = ["",".sendpulse-prompt","div > iframe",".td-desktop",".td_block_template_1 > div > img","#sticky1","#baner1","#sanpietro2",".tekebaner1","#sidebar","#reklama1","#execphp-24 > .execphpwidget","#execphp-25 > .execphpwidget","#reklamavodafonestopwords",".notes-right","body > .container > .advert-under",".small-adv",".slider-adv","#g207","#menu-item-640384 > a",".textwidget","div.wpb_content_element.wpb_text_column:nth-of-type(2) > .wpb_wrapper > .desktop\ndiv.wpb_content_element.wpb_text_column:nth-of-type(4) > .wpb_wrapper > .desktop",".wpb_wrapper > p > a > img",".wpb_wrapper > div > a > img",".wpb_wrapper > a > img",".td-fix-index > iframe",".custom-html-widget > iframe",".left-banner","#sidebar_container","#bottom_fixed_notification",".rek-holder",".fixed-ad",".radio-live-adv","#ads2018",".main_ban_rek > .container > .g\n.main_ban_rek > .g",".sidebar_rek",".site-banner",".textwidget > a",".theiaStickySidebar > a","#foxpush_subscribe","#fixed_728_banner",".adunit-1",".rekl-phone",".app_holder","#offcanvas-article","#modalHome",".show.modal-backdrop",".banner_intro",".left_fixed",".pc_only > a > img\n.pc_only > iframe\n.pc_only[style]",".top-bigBanner",".banner_wrapper.pc_only","#v-cookielaw",".biscotto-container","#mibew-agent-button > img",".td-all-devices","#rt-sidebar-b > .rt-block",".olark-attention-grabber","#ad-wide_skyscraper",".ad-big_leaderboard",".ad-medium_rectangle","#ad-big_rectangle",".new_header-ad-box",".textwidget > p > img",".ad-widget-box > img",".shortcode-widget-box",".ad-widget-sizes > a > .ad-widget-box",".main-nosplit > a",".textwidget > button","#convertbox","#fb-root",".stream-item-top-wrapper",".sendpulse-bar",".theiaStickySidebar > .stream-item-widget","#check-also-box",".mvp-side-widget.widget_text",".reklama-container",".vw-more-articles--visible.vw-more-articles",".widget.widget_sp_image","#snowflakeContainer",".murebestbannerdesktop",".murebestshowonlydesktop",".mvp-feat1-list-ad",".mvp-main-box > .execphpwidget > div > a > img",".heateor_sss_sharing_container","#target_banner_1","#target_banner_2","#target_banner_3","#target_banner_42","#target_banner_4","#target_banner_5","#target_banner_41","#target_banner_6",".stick_block_layer","#FBStickLayer",".popup-container",".flurry-container",".footer-last-news-wrapper",".ad","#custom_html-3",".execphpwidget > a > img",".sidebar-baner-top",".sidebar-baner-middle",".new_banner",".wpb_wrapper.vc_figure",".jnews_popup_post_container",".wp-super-snow-flake","#slidebox",".pazar",".cssnow",".col-lg-3 > a > img","#horiz_banner_2-wrap","#upprev_box",".col-md-4 > a\n.col-md-4 > iframe",".container > iframe",".leaderboard-banner > iframe","#text-html-widget-64 > .widget-container",".e3lan-post",".rek",".crestaPostsBox",".main-sidebar > .widget > .banner","#tidio-chat",".xo360",".latestVideo","#weather",".small-ad-wrapper",".td_block_template_1 > a > img",".g-4",".g-1",".headerslider",".g-7",".awac-wrapper",".hidebanner",".td-visible-desktop",".leadBanner",".sidebar",".reklama-box","center\niframe","#text-7","#text-8","#text-9",".vc_column-inner > .wpb_wrapper > .vc_hidden-sm > .wpb_wrapper","#HTML1","#dk-image-rotator-widget-3","#dk-image-rotator-widget-4","#dk-image-rotator-widget-7",".fn-header-banner",".textwidget > center > a","#custom_html-6","#text-15",".sidebar-single-w",".single-post-comments-sidebar",".ad-container",".reklama_top",".reklama-center",".outer-banner",".a-d_wrapper",".bannerSection.container",".widget:has(.lazyloaded)",".web-ad",".bannertop","#mastertopbanner","div[id^=\"ctl00_ContentPlaceHolder1_Latest\"]","#fpub-popup",".news_block > .desktop",".rek_section",".a-listing > li:has(.adsbygoogle)",".aside.right",".mgid",".ad-box",".col-12.col-lg-4 > .d-none","div[class^=\"adunit-\"]\ndiv[data-adunit]",".boost-list-container > [style] > [class]:has(> a[href^=\"https://aa.boostapi.net\"])\n.boost-list-container a[href^=\"https://aa.boostapi.net\"]","div[id^=\"an-holder-\"]",".active-50.gjirafa50-bf","#vidad",".widgets",".bottom.adrek-space > .widget","#boost-145",".njoftim",".watch-movie > center","div.movie-info > center\ndiv.movie-info:nth-of-type(5)","#imgad","center:nth-of-type(2)\ncenter:nth-of-type(4)\ncenter:nth-of-type(5)",".col-4",".adds_left",".adds--main.adds","#webover_pc_banner",".right_fixed","#news-right-2","#news-right-4","#news-right-5",".stream-item-top","div.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(1)\ndiv.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(2)\ndiv.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(3)\ndiv.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(4)\ndiv.aligncenter.stream-item-inline-post.stream-item-in-post.stream-item:nth-of-type(5)",".tdi_30_1c1.vc_raw_html.td_block_wrap.wpb_wrapper > .td-fix-index > .rekpolitiknje",".align-items-center.flex-column.d-flex.col-sm-3",".td_block_template_1.td-pb-border-top.td-single-image-.tdi_25_8e1.vc_single_image.td_block_wrap.td_block_single_image.wpb_wrapper\n.td_block_template_1.td-pb-border-top.td-single-image-.tdi_25_f69.vc_single_image.td_block_wrap.td_block_single_image.wpb_wrapper\n.td_block_template_1.td-pb-border-top.td-single-image-.tdi_53_348.vc_single_image.td-no-img-custom-url.td_block_wrap.td_block_single_image.wpb_wrapper\n.td_block_template_1.td-pb-border-top.td-single-image-.tdi_54_6f4.vc_single_image.td-no-img-custom-url.td_block_wrap.td_block_single_image.wpb_wrapper\n.td_block_template_1.td-pb-border-top.td-single-image-.tdi_55_407.vc_single_image.td_block_wrap.td_block_single_image.wpb_wrapper",".td-pb-span8.tdc-column.vc_column_container.wpb_column.tdi_60_66f.vc_column",".td-pb-row.wpb_row.tdi_58_031.vc_row",".td-pb-span4.tdc-column.vc_column_container.wpb_column.tdi_71_428.vc_column > .wpb_wrapper","aside.widget_media_image.widget.td_block_template_1:nth-of-type(2)\naside.widget_media_image.widget.td_block_template_1:nth-of-type(3)\naside.widget_media_image.widget.td_block_template_1:nth-of-type(4)",".hideM.a-ads","div.insertion-box:nth-of-type(1)",".reklama-background",".reklama-background-right",".code-block-1.code-block",".pp_ads_single_before_comment.ppb_ads > [href]","[href^=\"https://www.raiffeisen.al/alb/page/platforma-digjitale-raiffeisen-on-1/\"]","div.sidebar-widget:nth-of-type(3)",".sidebar-articles-container > .telesport-desktop-ads",".article-wrapper > .telesport-desktop-ads",".widget_media_image.side-widget",".top-banner-promo","#post-right-col > .content_block",".right_side_banner",".background-banner",".banner-bottom-category",".sidebar-baner-topproduct",".sidebar-baner-middleroduct",".positionWidget",".promoSection",".banner","div.others:has(div[id*=\"_ads\"])","div[class*=\"new-ads\"]","div[class^=\"ads-\"]\niframe[height=\"200\"]","div[class*=\"revive_zone\"]"];
const argsSeqs = [0,1,-2,-3,-4,194,4,-5,-6,-7,8,-9,-10,-11,-12,-13,14,-15,-16,17,18,-19,20,-20,132,-21,-22,23,-22,141,-24,202,-25,26,-27,28,29,-30,31,-32,-185,186,33,-34,35,36,-37,38,39,40,41,-42,43,-44,158,-45,46,-47,-48,-49,-50,-51,-187,-188,-189,-190,191,52,53,54,55,-55,126,56,57,-58,-59,-60,-61,-221,222,62,-63,-64,-65,-66,170,67,68,69,70,-71,-72,-73,74,-74,-143,-144,145,75,-76,-203,204,-77,78,79,-80,81,-82,83,84,-85,-86,-87,-88,-89,-90,-91,92,-93,94,-95,-96,97,-98,99,100,-101,-102,-103,-214,-215,-216,-217,218,104,105,106,107,-108,-109,-110,-111,-112,-113,114,-115,-219,220,-116,117,-118,-119,-155,156,118,120,121,-122,-123,225,-124,125,126,-127,-128,129,130,131,133,134,135,-136,137,137,-138,-139,140,142,-146,147,-148,-149,-150,151,-152,153,154,157,159,160,-161,162,-163,-164,165,-166,-167,168,169,-171,172,-173,174,-175,-176,-177,-178,-179,-180,-181,-182,-183,184,-192,193,195,-196,-197,-198,-199,200,201,-205,206,-207,208,-209,210,-211,-212,213,223,224];
const hostnamesMap = new Map([["albeu.com",1],["kohajone.com",2],["rd.al",6],["living.al",7],["gazetatema.net",11],["oranews.tv",17],["short24.pw",20],["gazetadita.al",21],["preshevajone.com",23],["gazetamapo.al",25],["revistakosovarja.net",28],["politiko.al",30],["dritare.net",32],["njoftime.com",34],["droni.al",36],["shekulli.com.al",37],["lajmi.net",39],["lajmifundit.al",42],["fishmedia.info",43],["newsbomb.al",45],["tiranapost.al",46],["pamfleti.net",48],["joq.al",49],["jetaoshqef.al",50],["syri.net",51],["360grade.al",53],["bankofalbania.org",55],["noa.al",57],["neptun.al",67],["dyqani.shpresa.al",68],["abcom.al",69],["shkoder.net",70],["ata.gov.al",70],["rrokum.tv",71],["albacenter.it",73],["nimitv.com",74],["gazetaexpress.com",75],["insajderi.com",81],["tvklan.al",82],["blitz.al",87],["lapsi.al",88],["upviral.com",89],["alsat-m.tv",90],["faxweb.al",91],["radiokosovaelire.com",95],["intervista.al",99],["konica.al",100],["bota.al",103],["gsh.al",105],["tpz.al",106],["cna.al",108],["reporter.al",110],["gazetacelesi.al",111],["intv.al",119],["businessmag.al",121],["newsport.al",124],["vipsport.al",126],["acp.al",127],["27.al",135],["standard.al",136],["botimepegi.al",137],["durreslajm.al",138],["vizionplus.tv",139],["telegrafi.com",146],["rtsh.al",149],["epokaere.com",151],["gazetatribuna.com",155],["tiranatimes.com",156],["evolve.al",157],["kallxo.com",158],["rtv21.tv",161],["www.tvkoha.tv",163],["botapress.info",164],["ekonomiaonline.com",167],["kosovalive360.com",168],["lajmpress.com",169],["www.albinfo.ch",170],["shqiptarja.com",171],["panorama.com.al",172],["shkabaj.net",174],["nacionalalbania.al",175],["iphonealbania.net",178],["almakos.com",179],["myalbanianfood.com",181],["kosovapress.com",185],["arbresh.info",187],["gazetalajm.com",188],["anabelmagazine.com",189],["classlifestyle.com",190],["ikub.al",191],["opinion.al",193],["tej.al",196],["the-living-media.com",199],["joq-albania.com",200],["joqalbania.com",200],["gjirafa.com",202],["www.filma24.*",204],["fieriweb.com",214],["abcnews.al",216],["bulevardionline.com",217],["www.anabelmagazine.com",222],["iconstyle.al",223],["www.albaniandailynews.com",225],["telesport.al",227],["www.supersport.al",229],["koha.net",232],["nacionale.com",233]]);
const hasEntities = true;

self.specificImports = self.specificImports || [];
self.specificImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
