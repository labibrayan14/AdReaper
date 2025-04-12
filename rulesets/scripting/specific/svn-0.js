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

// ruleset: svn-0

// Important!
// Isolate from global scope
(function uBOL_cssSpecificImports() {

/******************************************************************************/

const argsList = ["",".background_link",".banner","#proad",".article__body > div > a",".banner__below",".banner__billboard",".border-black\\/08.border-b.lg\\:p-16\n.border-black\\/08.border-l",".justify-center.sidebar__box",".proad",".shop-details",".shop-image",".sidebar__banner:has(.ads-player)",".sidebar__box:has(.bg-brand-caszazemljo, .eurojackpot, .pr, .voyobox)",".banners-box",".banner-app-article",".livenetlife_linkswidget_logo","#Banner300R",".widget-ad-bottom-banner",".td-a-rec",".bannerR2","#bannerC1_728","#bannerC2",".BannerBox972",".GO-banner-Billboard",".Oblika3Container",".uvodna_bottomBaners","#baner","#banners","onl-article-connected\nonl-banner",".microsite-article",".xl\\:h-250.h-470",".microsite-section",".shop__card.noPaddingAlways.col-md-12",".topBanner",".topBannerLanding",".banner-970",".td-zsd",".td-is-sticky.tdc-column",".BannerAlignment",".BannerBillboard",".Banner--adsenseForSearch",".EntityList--ListItemFeaturedStore",".EntityList--ListItemVauVauAd",".HeaderSpotlight.Attention\n.HeaderSpotlight:has(a[href^=\"https://bit.ly\"])",".mj-pf-widget-iframe",".Offerista",".sectionBlock.Headline",".TitlePage-bannerWrapper",".TitlePage-block.Headline",".trakica_container","[id^=\"midasWidget\"]","#coloumnAd","#newsOfTheDay","#servicesToItems",".featurebar_right",".front_topgames_footer","#block-block-35","#left_click_div","#right_click_div",".ng-star-inserted.banner",".thumb-list--article","onl-magick-box",".outbrain","onl-eurojackpot-teaser\nonl-microsite","#header-right-section","#heateor_ss_browser_popup_bg",".hero-main",".l0BoxBanner",".leaderBoardAd",".product-com-wrap",".top-brands",".sfsi_outr_div","div[class^=\"banner-square-\"]","#banner-seminarji",".ekosistem",".read-also-block","#gkSidebar > .nomargin.box",".bannergroup",".editoriali",".matej-carousell-left",".matej-carousell-right","#sp-pasice","#sp-pasice3","#sp-user2",".article-related:nth-of-type(2)","#app-messages","#html_javascript_adder-2",".opened","#topBanner",".lokalnoBox",".lg\\:mb-0",".single_add",".module.banner",".main-left > .fpNews-title",".my-4 > .flex-wrap","#top_banner",".bs-irp-thumbnail-3-full",".pattern > .span2",".span2:nth-of-type(3) > div",".adbox",".kos_semitrans",".taxo_block","#article_bottom_author_butterfly","#bart_banner","#hbr","#siteHeaderPanorama",".verde_wrap","#bannerFooter_wrap",".advertisement","#desnistolpec","#oglas","aside.ad",".ad","#contentLeft","#contentRight > .leaderboard","#playzone > .leaderboard","#userGenGames",".outFrameRight",".img-responsive",".oglas2",".oglasi","#adtopart","#article_social_top","#top > .nbs-flexisel-container",".banner1",".banner-top-wrap","#kmetija_top_billboard","#promo","#fan-exit","#fanback",".custom-html-widget",".g-single",".widget-10.widget-last.widget-even","#kum_bottom_billboard","#kum_top_billboard",".ads",".hidden-sm",".signad",".sticky-position",".addthis_toolbox",".widget_subscribe_widget",".navbar-right",".reklama_desno","#reklama_desno",".other",".ekode-content-dno",".lwdgt",".banner--wrapper",".content--cta",".exposed__banner",".region--cta",".banner2",".banner_cont","blockquote",".category-banner-desktop",".feedo",".livenetlife_links",".widget_oglas_widget","#lnl-footer",".hidden-xs",".portus-video-slider-min","#doyoulikeus",".adsbygoogle",".hidden-mobile","#billboard_outstream","#inline1","#inline2","#inline3-end","#mplayvideo","a[target=\"_blank\"][href^=\"http://www.mlacom.si/iskalnik\"]",".banner-scroller",".headbanner",".fancybox-overlay",".info-box > .social",".style-buttons.before_content",".navigatortop",".titlered:nth-of-type(4)","#banner05","#skytower",".nativendo-container",".prNews",".nat-content",".widget-wrapper:nth-of-type(5)\n.widget-wrapper:nth-of-type(6)","[href=\"https://samopostrezna.com/\"]",".banner-inner",".grid1.rectangle",".obcni-contentexchange",".obcni-widget",".card-overlay[target=\"_blank\"]",".dark\\:bg-white\\/5",".embed_mailing",".mx-8.flex-wrap",".relatove",".sidebar__box > [target=\"_blank\"]",".desktopAd",".td-main-sidebar",".banner-promotion",".banner-wrapper",".in-post-related-news",".third-party-menu-container",".main-first.main > .index_right",".sticky-wrapper",".ad-container","#ad-detail","#ad-ribbon","#top_wrap",".re-cta-advertisement",".sideBoxBanner",".widget_custom_html",".category > .col-md-3",".td-post-sharing-top",".td-header-rec-wrap","#startPageRightLabel","#startPageRightResults",".reklame-na-sredi","[id^=\"reklama\"]",".image_carousel_post > [href^=\"/show//\"]",".lightface",".widget-shop","#izpostavljeni","#show > .ban_item\n#show > div > div > .ban_item",".ban_item",".do-space",".header-blocks-aspace","#nestandard-holder","[id^=\"pons-ad\"]","#banner",".roglas_listaBanner",".roglas_lista:nth-of-type(2)","#maincontent > .nospace > tbody > tr > td > .moduletable",".external_wall_right_wrapper",".content > .banner",".img-ad",".partners","#single_post > .banner",".osrednji_del > .poravnajgor:nth-of-type(1)","td > table > tbody > tr > td > .poravnajgor > tbody > tr:nth-of-type(1)",".reklamaDesnoZunaj > .presledek",".teloCenter > * > div:nth-of-type(12)","#divBannerjiDesnoZunaj > .reklamaDesnoZunaj",".banner-box",".mb-g-20","[src^=\"//tdn.media24.si\"]","#krka_bottom_billboard","#krka_top_billboard",".divider-news",".h2501","#bglink","#DivShowBanners","#DivShowBannersForFrontPage",".bannerInText",".h-banner","#newsletterFrame",".exposed-article",".gray.emphasis",".inverted-colors.teal.emphasis","#newsletter-popup","#notification-popup",".bsaProItems",".card--ts_storitva",".fold_pr",".fold_telekom_footer",".storitve_widget",".telekom_menu_desktop__card_wrap",".telekom_menu_desktop__logo_link",".widgetWrap","#itisAdPromo",".monadplug-native-main-wrapper",".sponzorirani","[id^=\"ad\"]",".embed_article",".group_a_category__box7",".group_a__box7",".group_a__box_sidebar_1",".group_a__pos_banner_440",".iprom_ad",".pos-banner__article",".store_links","#biscuitFormDiv",".moduletable_pasica","#panels > aside > div:nth-of-type(3)\n#panels > aside > div:nth-of-type(4)",".after-nav-ads","#RightBanner","div > .side-banner",".central_banner_inner_container",".news-banner",".side_json_banners_1",".banner_footer","#banner_side_layer","div.job-item.ad-wrapper",".containerinside",".partner-wrap","#banner_landscape",".bg-najnakupi-blue-light",".content > ul",".h-80",".justify-center.flex.container",".najnakupi",".najnakupi-news",".overflow-x-hidden",".promo-box",".right-sticky",".shadow-md.w-tk",".xl\\:container > .flex.justify-center","[id^=\"firstSiteBanner\"]","#odkrito_bottom_billboard","#odkrito_bottom_kocka","#odkrito_middle_billboard","#odkrito_top_billboard","#odkrito_top_kocka",".ai_widget",".widget_mt_latestposts_widget","#mc4wp-form-1",".mosaicflow__column:nth-of-type(4)",".display-posts-listing",".display-posts-title",".tdi_102",".tdi_97",".uw-showfootpanel","#exitpopup-modal",".ai-track",".front-featured-oglas-wrap","#above-related-oglasi","#front-under-design-oglasi","#front-under-featured-oglas","#front-under-gardens-oglasi","#front-under-trends-oglas","#under-related-oglasi",".widget-footer",".ai-viewport-1","[id^=\"pukka-ad-widget-\"]",".baner","#banner_container",".billboard-wrapper",".glide__slide",".infeed-wrapper",".mb-7.pb-7",".mt-5.space-x-8",".mx-auto.px-4","#billboard1","#gBig","#gSmall","#sidebar1","#sidebar2","#sidebar3","#sidebar4","[id^=\"oglasi\"]",".border-grey-light > .border-grey-light",".tvshow",".oglstih","#oglassi2a","#vpopupwindow","#bgbanner","[id^=\"post\"] > .article-content > .mashsb-main",".article__aditionl_content",".related_article",".social__wrap"];
const argsSeqs = [0,1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,13,-2,-29,-30,-62,-63,64,-2,-180,181,-2,-3,-29,-30,-32,-62,-63,-189,-190,-191,-192,-193,194,2,-2,-288,289,-2,-147,-294,-295,-296,-297,-298,-299,-300,-301,-302,-303,-304,-305,-306,-307,-308,-309,310,-2,-3,-29,-30,-32,62,14,-15,16,17,18,19,-19,-187,188,-20,-21,22,-23,-24,25,-26,-27,28,-29,-30,-31,32,-29,-30,-31,91,-29,-30,32,-29,-30,-32,-348,349,-33,-34,35,-36,37,38,-39,-40,-41,-42,-43,-44,-45,-46,-47,-48,-49,-50,-51,-52,-53,54,-55,-56,-57,-58,59,-60,61,-65,66,-67,-68,-69,-70,71,72,73,74,-75,76,77,-78,-79,-80,-81,-82,-83,84,-85,86,87,-88,89,-89,-213,214,90,92,93,-94,95,96,97,-98,99,-100,-101,-102,-103,-104,-105,106,-107,108,109,-109,-246,247,-110,111,-112,113,-113,-173,174,113,-114,-115,-116,117,118,-119,-120,121,-122,-123,124,-125,126,127,128,-129,130,-131,-132,133,-134,135,136,-136,329,-136,353,-137,-138,139,-140,141,-142,-143,144,145,146,147,-147,-154,-155,-156,-157,-158,159,-147,-163,-164,-165,-166,-167,-168,169,-147,-197,-198,-199,200,-147,282,-147,-355,-356,357,-148,-149,-150,151,-152,153,-157,-212,-315,-316,-317,-318,-319,320,-160,-161,162,-170,-171,172,175,-176,-177,-178,179,182,-183,184,-185,186,-186,195,195,196,201,202,-203,-204,-205,206,207,208,209,210,-211,212,211,-215,216,-217,-218,-219,-220,221,-222,-223,-224,225,226,227,-227,281,-228,229,230,231,-232,-233,-234,235,-236,237,-238,-239,240,-241,-242,-243,-244,245,-248,-249,250,-251,-252,253,-254,-255,-256,-257,258,259,-260,-261,-262,-263,-264,-265,-266,267,268,-269,270,-271,-272,-273,-274,-275,-276,-277,278,279,280,283,-284,-285,286,287,290,-291,-292,293,-311,-312,313,314,-321,-322,-323,-324,-325,-326,-327,328,329,-330,331,-332,333,-334,-335,-336,-337,-338,-339,-340,-341,-342,-343,-344,-345,346,347,-350,-351,352,354];
const hostnamesMap = new Map([["1nadan.si",1],["24ur.com",2],["cekin.si",14],["mojaleta.si",20],["moskisvet.com",23],["napovednik.com",36],["strojnistvo.com",36],["studentarija.net",37],["svet24.si",40],["tehnik.telekom.si",36],["vreme.24ur.com",36],["zadovoljna.si",59],["sta.si",36],["adomnia.net",65],["aktivni.si",66],["avtomanija.com",68],["avtomanija.si",68],["avtomobilizem.com",69],["avtonasveti.com",70],["mojprihranek.si",71],["avto.info",74],["avto.net",77],["avto-fokus.si",80],["bibaleze.si",83],["dominvrt.si",87],["okusno.je",91],["vizita.si",94],["bicikel.com",99],["naprostem.si",99],["tekac.si",99],["bizi.si",102],["bodieko.si",104],["bolha.com",105],["bringler.com",121],["caszazemljo.si",126],["celje.info",128],["ceneje.si",130],["ciklon.si",135],["citymagazine.si",136],["data.si",137],["delo.si",138],["demokracija.si",140],["dnevne-novice.com",141],["dnevnik.si",148],["dne.enaa.com",150],["dobrakarma.si",151],["podarimo.si",153],["dolenjskilist.svet24.si",156],["drazbe123.com",157],["druzina.si",158],["ekipa.svet24.si",159],["enajdi.si",161],["explicit.si",162],["e-mesto.si",163],["finance.si",165],["gohome.si",172],["golfportal.si",174],["regionalobala.si",175],["hribi.net",178],["hudo.com",180],["mladina.si",182],["vreme.zurnal24.si",185],["igrice.hudo.com",186],["informiran.si",190],["instore.rs",191],["instore.si",191],["izvozniki.finance.si",194],["kajkupiti.si",197],["kmetija.svet24.si",199],["kolosej.si",200],["kosmika.si",201],["kozjansko.info",203],["kum.svet24.si",206],["lepdan.si",208],["tv-spored.siol.net",209],["vsikuponi.si",211],["letakonosa.si",213],["lifestyle.enaa.com",216],["lokalec.si",218],["lokalno.si",221],["lupa-portal.si",222],["maribor24.si",223],["med.over.net",224],["metropolitan.si",231],["n1info.si",239],["sobotainfo.com",244],["t3tech.si",223],["zurnal24.si",246],["marketingmagazin.si",250],["mediaspeed.net",254],["tocnoto.si",256],["megasvet.si",264],["mlacom.si",267],["mladipodjetnik.si",270],["mobile.si",271],["mojaobcina.si",275],["mojblink.si",276],["mojepotovanje.hudo.com",278],["moski.hudo.com",280],["zenska.hudo.com",282],["motiviran.si",283],["najdi.si",284],["namen.si",285],["nepremicnine.net",286],["nepremicnine.si21.com",290],["nogomania.com",291],["novice.si",292],["obala.net",293],["planet-lepote.com",294],["pravljicna.si",296],["utrinek.si",296],["zdravje.si",296],["podjetnik.si",297],["pokukaj.si",299],["pomurec.com",304],["pons.com",308],["poraba.com",309],["slo-tech.com",310],["porscheinterauto.net",312],["preberi.si",314],["publishwall.si",315],["racunalniske-novice.com",316],["racunovodja.com",320],["radio1.si",322],["radiokrka.si",325],["rfantasy.si",330],["ringaraja.net",333],["rtvslo.si",336],["sentjur.net",341],["siol.net",342],["skandal24.si",350],["slonep.net",351],["slovenskenovice.si",353],["slovnica.slovenscina.eu",361],["slo-android.si",362],["spored.tv",363],["stajerskival.si",364],["stop-neplacniki.si",367],["studentski-servis.com",368],["stud-serv-mb.si",369],["tehnozvezdje.si",372],["tekaskiforum.net",375],["tvambienti.si",376],["vreme.siol.net",384],["vandraj.si",385],["varcevanje-energije.si",387],["vecer.com",389],["vemkajjem.si",402],["volan.si",403],["zastarse.si",406]]);
const hasEntities = false;

self.specificImports = self.specificImports || [];
self.specificImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
