/*******************************************************************************

    uBlock Origin Lite - a comprehensive, MV3-compliant content blocker
    Copyright (C) 2014-present Raymond Hill

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

// jpn-1

// Important!
// Isolate from global scope
(function uBOL_cssGenericImport() {

/******************************************************************************/

const genericSelectorMap = [[2563439,".full-tab > div.full-right-col"],[15562106,".__isboostReturnAd"],[10523900,".__uz__third_party_ad"],[11390972,"._popIn_infinite_ad"],[16346111,"._popIn_infinite_video"],[10329262,"._popIn_recommend_ad_section"],[10330050,"._popIn_recommend_article_ad,\n._popIn_recommend_article_ad"],[12873967,"._popIn_recommend_article_ad_reserved,\n._popIn_recommend_article_ad_reserved"],[1913014,".google-afc-image"],[3295591,"#ad-60days-area"],[14754346,"#ad-recommend"],[6194065,"#fc2_bottom_bnr"],[7932167,"#float-bnr"],[4638329,"#fluct-pc-sticky-ad"],[11474529,"#footerafficode"],[13108168,"#geniee_overlay_outer"],[9211041,"#headerafficode"],[12691658,"#id_ads_enc"],[914470,"#im_panel"],[4577702,"#im_panel_pc"],[165815,"#im_panel_pc_left"],[6386097,"#joboxAd"],[770259,"#kauli_yad_1"],[770256,"#kauli_yad_2"],[770257,"#kauli_yad_3"],[770262,"#kauli_yad_4"],[55256,"#meerkat-contents"],[14507854,"#ninja-blog-inactive"],[10874162,"#overlay-ad-div-id"],[2950987,"#prtaglink"],[14861149,"#seesaa-bnr"],[1310703,"#trackword_banner"],[5510615,".NinjaEntryCommercial"],[8629709,".ad-single-h2"],[3417945,".ad_splify"],[4564434,".ad1-title"],[13441749,".adPost"],[1778463,".ad_overlay"],[16559235,".adarea-box"],[7290061,".adboxcontainer_t"],[4366346,".adgoogle"],[12575057,".adgoogle-wrapper"],[1719329,".admax-ads"],[16348302,".ads-flexbox"],[2277341,".advrbox"],[11222649,".archive__item-infeedPc1,\n.archive__item-infeedPc2,\n.archive__item-infeedPc3"],[6693785,".archiveItem-infeed"],[6669967,".archiveList-infeed"],[15733960,".blogroll-ad-text"],[1984746,".blogroll_ads"],[1949012,".bns-bl"],[14615212,".c-infeedAd"],[15067187,".csw_non_search_ad_block_2"],[14982259,".diver_widget_adarea"],[2498525,".double-rectangle"],[14150590,".ggbox"],[10074380,".google-2ad"],[3871527,".google-2ad-a,\n.google-2ad-b,\n.google-2ad-c,\n.google-2ad-f,\n.google-2ad-h,\n.google-2ad-m"],[10083884,".google-2ad-mid"],[9642690,".google-user-ad-728"],[11582181,".google-user-ad-side1"],[6785934,".i2i-content-bottom"],[6785841,".i2i-content-middle"],[10842841,".i2i-content-top"],[8993544,".i2i-header"],[1665210,".insentence-adsense"],[12149929,".insentence-adsense2"],[5841080,".invalid + .rakko_area"],[10770095,".itiran-ad"],[11716417,".js-kb-click"],[1911822,".logly-lift-ad-ad"],[4550623,".master-post-advert"],[12120853,".my_ads"],[8349926,".p-entry__ad"],[320880,".plugin-rakuten"],[4879477,".rectangle > div.rectangle__item + .rectangle__title"],[2628181,".rectangle__item"],[14228560,".related-ad-area"],[7285720,".seesaa-cmn__pr"],[6574698,".sherpa-component[data-ad_type]"],[416684,".side_widget_surfing_adsense_widget"],[5446717,".sleeping-ad-in-entry"],[5462307,".sleeping-ads"],[4515618,".sponsor-h2-center"],[14368316,".sponsor-top"],[14984387,".st-h-ad"],[5998706,".st-infeed-adunit"],[8234369,".st-magazine-infeed"],[10698857,".thk_ps_widget"],[15809402,".veu_insertAds"],[15043898,".widget_common_ad"],[4441971,".widget_fit_aditem_class"],[15039381,".widget_mobile_ad"],[1104745,".widget_pc_ad"],[11487183,".widget_st_custom_html_ad_widget"],[6500002,".widget_swell_ad_widget"],[4008801,".widget_tsnc_ad_custom_html"],[14222541,".widget_tsnc_ads_custom_html"],[9282032,".wipe-ad-div-class"],[2208527,".ys-ad-content"],[6122938,"iframe.lazyloaded[data-src^=\"https://ad.jp.ap.valuecommerce.com/\"]"],[10694788,".plugin-freearea > div[id^=\"msmaflink\"],\n.plugin-freearea a[href*=\"al.dmm.co\"],\n.plugin-freearea a[href*=\"amazon.co.jp\"],\n.plugin-freearea a[href*=\"e-nls.com/access.php\"]"],[6736878,".plugin-memo > .side > a[href*=\"al.dmm.co\"],\n.plugin-memo > .side > a[href*=\"amazon.co.jp/exec/\"],\n.plugin-memo > .side > a[href*=\"e-nls.com/access.php\"],\n.plugin-memo > .side > a[href^=\"https://affiliate.suruga-ya.jp\"]"],[4303972,".t_b > a[href^=\"https://hb.afl.rakuten.co.jp\"],\n.t_b > div > a[href^=\"https://al.dmm.co\"],\n.t_b ~ .amazon,\n.t_b ~ a[href^=\"https://amzn.to\"],\n.t_b ~ a[href^=\"https://hb.afl.rakuten.co.jp\"],\n.t_b ~ a[href^=\"https://www.amazon.co.jp\"],\n.t_b ~ div > a[href^=\"https://al.dmm.co\"],\n.t_b ~ div > a[href^=\"https://www.amazon.co.jp\"]"],[14829470,".textwidget a[href^=\"https://pcmax.jp/lp/?ad_id=\"] > img"],[6074297,".widget_custom_html > .custom-html-widget > a[href^=\"https://www.e-nls.com/access.php\"]"],[14987463,"#ad_inview_area"],[7477511,"#gStickyAd"],[5817382,"body .interstitial-ad"],[6432607,".ise-ad"]];
const genericExceptionSieve = [4427675,11317937,9622090,13818820,4027662,12993831,6119176,14435228,11992175,2074658,16153475,14553462,4509653,13232956,3023653,2727770,4409346,565055,7020432,9225086,12205301,7038291,732783,12996073,7873865,12064325,12575542,12399894,10834050,12873967,6725748,12283915,7351360,6500002,15857862,4160047,3429551,15414109,7892988,1774173,7609832,13280807,4129886,16610738,2849800,7260091,11766897,1647817,14984387,7311164,15239526,4550623,7953971,14451254,1427608,7384902,2276907,13309313,2628181,4299026,12938810,4160072,1969969,979467,12389312,4146801,10698857,13780187,10833936,10979378,5311513,3160229,6477643,16702780,14228560,1785039,6051917,13587768,7915421,15143888,10372180,12318293,12992906,7812282,4133500];
const genericExceptionMap = [["chobirich.com",".ad_image\n.img_ad"],["nazolog.com",".ad_image\n.img_ad"],["hamadasyuzou.co.jp",".ad_image\n.ad_box\n.ad_bottom\n.ad_contents\n.ad_title\n.ad_wrapper"],["best-hit.tv",".ad-space:not(.textads)\n.ad-space:not(.textads)\n.div-gpt-ad:not([style^=\"width: 1px; height: 1px;\"])\n.amp_ad"],["h178.com",".ad-space:not(.textads)\n.div-gpt-ad:not([style^=\"width: 1px; height: 1px;\"])\n.amp_ad"],["j-baseball.club",".ad-space:not(.textads)\n.div-gpt-ad:not([style^=\"width: 1px; height: 1px;\"])\n.amp_ad"],["j-basketball.club",".ad-space:not(.textads)\n.div-gpt-ad:not([style^=\"width: 1px; height: 1px;\"])\n.amp_ad"],["jukenbbs.com",".ad-space:not(.textads)\n.div-gpt-ad:not([style^=\"width: 1px; height: 1px;\"])\n.amp_ad"],["mytry.jp",".ad_box"],["iphone-d.jp",".ad_box"],["echo-gr.co.jp",".ad_box\n#footer_ad"],["echo-kensetu.jp",".ad_box\n#footer_ad"],["fujiidera-gojokai.or.jp",".ad_box\n#footer_ad"],["fet.co.jp",".ad_box"],["takken-k.co.jp",".ad_box"],["zanmai.co.jp",".ad_box"],["tuyano.com",".adspace"],["blog.2nt.com",".adspace\n.AdSense"],["cad-data.com",".adspace"],["video.tv-tokyo.co.jp",".adspace\n#adspace\n.ad-placeholder:not(#filter_ads_by_classname):not(#detect_ad_empire):not(#detect):not(.adsbox)"],["crefan.jp",".adspace"],["hatenablog.com","#adframe:not(frameset)"],["puzzle-ch.com","#adframe:not(frameset)\nins.adsbygoogle[data-ad-client]"],["nieru.net",".ad-space\n.adWidget"],["tters.jp","ins.adsbygoogle[data-ad-client]\n.ad-section"],["egotter.com","ins.adsbygoogle[data-ad-client]\n.adsense-container"],["musmus.main.jp","ins.adsbygoogle[data-ad-client]"],["battlecats-db.com","ins.adsbygoogle[data-ad-client]"],["tokyo-sports.co.jp",".ad-text\n.adBlock\n.adContent\n.adSense\n.ads-banner\n.textad\n.view_ad"],["asobeans.jp",".ad_block"],["manga1001.*",".c-ads\n.body-top-ads"],["ma-bank.net",".ad_div\n#ad_area\n#adspace"],["coolpan.net",".ad-area:not(.text-ad)"],["applion.jp",".ads-ad"],["komachi.yomiuri.co.jp","._popIn_recommend_article_ad_reserved"],["pooh2rohhobby.blogspot.com","#ad-target"],["etude000.com",".top-ad\n.thk_ps_widget"],["tennisclassic.jp",".ad-sp"],["fob.jp",".widget_swell_ad_widget"],["rankingoo.net",".widget_swell_ad_widget"],["funny-ai.com",".button_ads"],["panasonic.biz",".ad-result"],["asianoneta.blog.jp",".side_ad"],["mognavi.jp",".side_ad"],["gameranbu.jp",".side_ad"],["lamire.jp",".ad-unit:not(.textads)"],["miitus.jp",".new-ad-box"],["matome.f-book.net",".section_ad"],["app-story.net","#AdBlock"],["news.merumo.ne.jp",".adBox"],["asahi-net.jp",".wrapper_ad"],["au.com",".wrapper_ad"],["eowebmail.eonet.jp",".wrapper_ad"],["hwm.hi-ho.ne.jp",".wrapper_ad"],["icloud.com",".wrapper_ad"],["mail.google.com",".wrapper_ad"],["mail.nifty.com",".wrapper_ad"],["mail.smt.docomo.ne.jp",".wrapper_ad"],["mail.yahoo.co.jp",".wrapper_ad"],["msg.dream.jp",".wrapper_ad"],["ocn.ne.jp",".wrapper_ad"],["outlook.live.com",".wrapper_ad"],["outlook.office.com",".wrapper_ad"],["plala.or.jp",".wrapper_ad"],["proton.me",".wrapper_ad"],["so-net.ne.jp",".wrapper_ad"],["tp1.jp",".wrapper_ad"],["tutanota.com",".wrapper_ad"],["wakwak.com",".wrapper_ad"],["web.mail.goo.jp",".wrapper_ad"],["webmail.gol.com",".wrapper_ad"],["webmail.softbank.jp",".wrapper_ad"],["wms.sso.biglobe.ne.jp",".wrapper_ad"],["nijisenmon.work",".ad.widget\n.st-h-ad"],["ironsaga-msoku.xyz",".ad.widget"],["takushoku.info",".ad.widget"],["manpukunews.blog.jp",".ads01"],["kininaru-geinou-m.blog.jp",".ads01"],["hinative.com",".banner_header"],["cookpad.com",".banner_header"],["otonary.net",".master-post-advert"],["yama.minato-yamaguchi.co.jp","#ad6\n.sidead"],["jmd.co.jp",".widget-ad"],["torisetsu.biz",".ad_item"],["jj-jj.net",".ad_container\n.ad-rect"],["macaro-ni.jp",".rectangle__item"],["ign.com",".zad"],["kaerudx.com",".adArea\n.ad-center"],["teny.co.jp",".s-ad"],["kana-ot.jp",".boxAds"],["minpo.jp",".ads970"],["osusume.mynavi.jp",".ad-widget"],["mitsubishi-motors.co.jp",".top-banners"],["agonp.jp",".top-banners"],["yamaya.jp",".top-banners"],["natsume-anime.jp","#topBanners"],["kichijo-joshi.jp",".sp_ad"],["taiju-life.co.jp",".spLinks"],["hoken-all.co.jp",".bottom_ad"],["cotoro.net",".bottom_ad"],["favoriteslibrary-books.com",".bottom_ad"],["hakenreco.com",".bottom_ad"],["shellbys.com",".bottom_ad"],["tipstour.net",".bottom_ad"],["maidonanews.jp",".module-ad"],["webcartop.jp",".single-ads"],["eromanga-school.com",".related-ad-area"],["nikke-jp.com",".ad_content"],["point-g.rakuten.co.jp",".searchAd"],["netmile.co.jp",".ad-txt"],["1sshindo.com","#footer_ad"],["akashi-kodomo-zaidan.jp","#footer_ad"],["alps-beauty-salon.com","#footer_ad"],["art-green.co.jp","#footer_ad"],["ascon-blast.co.jp","#footer_ad"],["bees-garden.jp","#footer_ad"],["bellys.jp","#footer_ad"],["betsukawa.co.jp","#footer_ad"],["chuo-hp.jp","#footer_ad"],["courier.co.jp","#footer_ad"],["e-shinwa.com","#footer_ad"],["ecsatonoie.jp","#footer_ad"],["edel-support.com","#footer_ad"],["ex-daito.jp","#footer_ad"],["familykanko.co.jp","#footer_ad"],["friends-animal.com","#footer_ad"],["fuji-sho.jp","#footer_ad"],["fukukanren.jp","#footer_ad"],["ganeza-toyama.jp","#footer_ad"],["ginga-clinic.com","#footer_ad"],["ginganosato.com","#footer_ad"],["gms.or.jp","#footer_ad"],["guidepost.co.jp","#footer_ad"],["hairplace-patio.com","#footer_ad"],["hairsalon-duo.com","#footer_ad"],["hakuaikai-kitakami.or.jp","#footer_ad"],["hanamaki-fureai.jp","#footer_ad"],["handinhandjp.com","#footer_ad"],["harayamadai-kg.jp","#footer_ad"],["heiseidensetsu.co.jp","#footer_ad"],["hello-work.co.jp","#footer_ad"],["hogaraka.gr.jp","#footer_ad"],["hongakuji.jp","#footer_ad"],["icd-connect.co.jp","#footer_ad"],["ichinohe-hp.com","#footer_ad"],["ikiiki.toyama.jp","#footer_ad"],["ims-kt.co.jp","#footer_ad"],["isawa-hp.com","#footer_ad"],["isawabunso.com","#footer_ad"],["iyasakaseitai.com","#footer_ad"],["kaigowakouwa.jp","#footer_ad"],["kekkangeka.com","#footer_ad"],["ken6-fudousan.co.jp","#footer_ad"],["kennan-crane.co.jp","#footer_ad"],["kitakami-node.co.jp","#footer_ad"],["kitakamicity.jp","#footer_ad"],["kk-haruna.co.jp","#footer_ad"],["kogane.or.jp","#footer_ad"],["kumedakango.jp","#footer_ad"],["kuramoto-sekizai.com","#footer_ad"],["kyoyu-k.co.jp","#footer_ad"],["marineworld-tanabe.com","#footer_ad"],["maxelevator.com","#footer_ad"],["mcp79.com","#footer_ad"],["media-pc.co.jp","#footer_ad"],["mfutaba.jp","#footer_ad"],["mitosan.co.jp","#footer_ad"],["mizusawarikuso.com","#footer_ad"],["modern-h.jp","#footer_ad"],["momiki-express.co.jp","#footer_ad"],["momokuri.co.jp","#footer_ad"],["nisseijushi.co.jp","#footer_ad"],["nittofunka.co.jp","#footer_ad"],["okameshouten.jp","#footer_ad"],["olliemagic.com","#footer_ad"],["osanais.co.jp","#footer_ad"],["porco-blu.com","#footer_ad"],["rfj.co.jp","#footer_ad"],["rokuhara.co.jp","#footer_ad"],["sakitamas.com","#footer_ad"],["sento-sakai.co.jp","#footer_ad"],["sfv.co.jp","#footer_ad"],["shikokuyanehan.sakura.ne.jp","#footer_ad"],["shimura-geo.co.jp","#footer_ad"],["shinko.main.jp","#footer_ad"],["sinkyu-c.jp","#footer_ad"],["site-jobyellnet.main.jp","#footer_ad"],["skn-fc.jp","#footer_ad"],["spec-com.co.jp","#footer_ad"],["stove-chijo.com","#footer_ad"],["sugawa-mokko.jp","#footer_ad"],["suzukireform.jp","#footer_ad"],["syahokyo-saga.or.jp","#footer_ad"],["t-suiko.jp","#footer_ad"],["taiyo-valve.co.jp","#footer_ad"],["takaidahoikuen.jp","#footer_ad\n#top_ad"],["takasaki-shika.com","#footer_ad"],["takatagumi.co.jp","#footer_ad"],["technobell.co.jp","#footer_ad"],["tenmashatai.com","#footer_ad"],["tiara-y.jp","#footer_ad"],["tohoku-juken.co.jp","#footer_ad"],["tohokuseimitsu.co.jp","#footer_ad"],["totalsupport-kitakami.com","#footer_ad"],["tsc.co.jp","#footer_ad"],["twinklesnow.com","#footer_ad"],["umenohisagi.jp","#footer_ad"],["urban-karuizawa.co.jp","#footer_ad"],["vook.vc","#footer_ad"],["yagate1.co.jp","#footer_ad"],["yamashitajari.com","#footer_ad"],["yokosawa.jp","#footer_ad"],["yonoyouchien.jp","#footer_ad"],["yuhki-elec.co.jp","#footer_ad"],["yuimarl-kids.jp","#footer_ad"],["yumekoumuten.com","#footer_ad"],["3faithsdjschool.com",".footer_ad"],["3plmnt.co.jp",".footer_ad"],["abuto-kankou.co.jp",".footer_ad"],["aigato.jp",".footer_ad"],["akihabara-eye.com",".footer_ad"],["alpenhaime.gr.jp",".footer_ad"],["alpha-eng.jp",".footer_ad"],["andocl.jp",".footer_ad"],["anshinhome.co.jp",".footer_ad"],["aoclinic.jp",".footer_ad"],["appreco.com",".footer_ad"],["biz-point.jp",".footer_ad"],["btktool.co.jp",".footer_ad"],["bodymake-onix.co.jp",".footer_ad"],["carrier-agency.com",".footer_ad"],["ch-matsumoto.jp",".footer_ad"],["chikushi-410.com",".footer_ad"],["co-nagayama.co.jp",".footer_ad"],["cohaco.jp",".footer_ad"],["dai2aikoen.jp",".footer_ad"],["dw-clinic.jp",".footer_ad"],["enemix.jp",".footer_ad"],["enomoto-c.com",".footer_ad"],["finns.jp",".footer_ad"],["flair.co.jp",".footer_ad"],["flexs.co.jp",".footer_ad"],["foresight-1998.co.jp",".footer_ad"],["fujimidai-hifuka.jp",".footer_ad"],["fukamachitakkyu.com",".footer_ad"],["goro-bei.com",".footer_ad"],["gozamisaki.com",".footer_ad"],["herb-teien.com",".footer_ad"],["higashin-ls.co.jp",".footer_ad"],["himawari-clinic.com",".footer_ad"],["hkcg.co.jp",".footer_ad"],["hokkaido-nomad.co.jp",".footer_ad"],["htk-kobechuo.jp",".footer_ad"],["iida-dent.jp",".footer_ad"],["integration.ne.jp",".footer_ad"],["ishikawa-doc.com",".footer_ad"],["itawarinoyu.jp",".footer_ad"],["iwasaki-clinic.jp",".footer_ad"],["izumi3.com",".footer_ad"],["j-sonic.co.jp",".footer_ad"],["japan-quartzclub.com",".footer_ad"],["jashoteltakayama.jp",".footer_ad"],["jdc-kaigyousien.jp",".footer_ad"],["kaidentalclinic.jp",".footer_ad"],["kakiemon.co.jp",".footer_ad"],["kameman.co.jp",".footer_ad"],["katekin.com",".footer_ad"],["kenbunkai-yamaguchi.jp",".footer_ad"],["kitaoku.jp",".footer_ad"],["kiyotaclinic.or.jp",".footer_ad"],["kobayashi-eyeclinic.jp",".footer_ad"],["kotoridc.jp",".footer_ad"],["kouden-s.jp",".footer_ad"],["kusatsu-law.jp",".footer_ad"],["kyoai.or.jp",".footer_ad"],["kyowa-tekko.jp",".footer_ad"],["lanai-beauty.com",".footer_ad"],["lightup-garage.com",".footer_ad"],["m-publicgolf.com",".footer_ad"],["m-shika.jp",".footer_ad"],["maff.go.jp",".footer_ad"],["magome-eye.jp",".footer_ad"],["manaao-kitchen.but.jp",".footer_ad"],["manaao-kitchen.com",".footer_ad"],["manabe-ortho.or.jp",".footer_ad"],["marineplaza.co.jp",".footer_ad"],["marushime21.jp",".footer_ad"],["me-cell.jp",".footer_ad"],["megumi-jyosanin.com",".footer_ad"],["metal-model.com",".footer_ad"],["mikawapropeller.co.jp",".footer_ad"],["mikielectric.co.jp",".footer_ad"],["minami-ise.jp",".footer_ad"],["miyazu-matsukaze.jp",".footer_ad"],["mizuiwa-un.co.jp",".footer_ad"],["mj-pro.jp",".footer_ad"],["mkc6.com",".footer_ad"],["mohara-clinic.jp",".footer_ad"],["nakaod.com",".footer_ad"],["nakase-dc.jp",".footer_ad"],["nanjyoen.com",".footer_ad"],["nikunotoriko.co.jp",".footer_ad"],["nnbs.co.jp",".footer_ad"],["nousui-shop.com",".footer_ad"],["okamoto-fdc.jp",".footer_ad"],["okayamanavi.jp",".footer_ad"],["okudaganka.jp",".footer_ad"],["omoiyari-edu.jp",".footer_ad"],["onsinkai.jp",".footer_ad"],["picring.co.jp",".footer_ad"],["plateck.jp",".footer_ad"],["rikkyo-dps.com",".footer_ad"],["rousai-kenkyujyo.co.jp",".footer_ad"],["ruhe-mental.jp",".footer_ad"],["s-gp.co.jp",".footer_ad"],["s-shizai.jp",".footer_ad"],["saipri.com",".footer_ad"],["saizenji.or.jp",".footer_ad"],["sakataengei.jp",".footer_ad"],["sakoken.co.jp",".footer_ad"],["sanadayamashika.jp",".footer_ad"],["sanagawa-dental.com",".footer_ad"],["sanchang.co.jp",".footer_ad"],["sapporocity-law.jp",".footer_ad"],["satsumacon.co.jp",".footer_ad"],["sec-architects.com",".footer_ad"],["seinankaihatsu.co.jp",".footer_ad"],["shibusaki.co.jp",".footer_ad"],["shineiengineer.co.jp",".footer_ad"],["shinritsu.com",".footer_ad"],["shizuokakenro.jp",".footer_ad"],["sosus.jp",".footer_ad"],["southluck.co.jp",".footer_ad"],["sweet-nurse.ne.jp",".footer_ad"],["t-mclinic.jp",".footer_ad"],["t-u-advance.jp",".footer_ad"],["tairyouen.com",".footer_ad"],["takara-pd.co.jp",".footer_ad"],["takei-kogyo.jp",".footer_ad"],["talknet.jp",".footer_ad"],["tnk-koei.co.jp",".footer_ad"],["tokyowest-ah.jp",".footer_ad"],["tonakbuque.co.jp",".footer_ad"],["tousyo-k.co.jp",".footer_ad"],["tsurukawadai.jp",".footer_ad"],["ug-home.co.jp",".footer_ad"],["vario.jp",".footer_ad"],["volleyball-u.jp",".footer_ad"],["w-dc.jp",".footer_ad"],["wazumi.jp",".footer_ad"],["wic-life.com",".footer_ad"],["yaizuminsho.com",".footer_ad"],["yamadakaki.jp",".footer_ad"],["yamahana-ds.com",".footer_ad"],["yamanogaku.com",".footer_ad"],["yokohama-kenshu.jp",".footer_ad"],["yokoyamaseikotsuin.jp",".footer_ad"],["yotsuba-sapporo.com",".footer_ad"],["yuukaen.jp",".footer_ad"],["mamastar.jp",".adstop"],["arukikata.co.jp",".ad_btn"],["25news.jp",".has-ad"],["xn--0et88ccz6awh1a.biz",".has-ad"],["920ryu.blog.fc2.com","#scroll_ad"]];

if ( genericSelectorMap ) {
    const map = self.genericSelectorMap =
        self.genericSelectorMap || new Map();
    if ( map.size !== 0 ) {
        for ( const entry of genericSelectorMap ) {
            const before = map.get(entry[0]);
            if ( before === undefined ) {
                map.set(entry[0], entry[1]);
            } else {
                map.set(entry[0], `${before},\n${entry[1]}`);
            }
        }
    } else {
        self.genericSelectorMap = new Map(genericSelectorMap);
    }
    genericSelectorMap.length = 0;
}

if ( genericExceptionSieve ) {
    const hashes = self.genericExceptionSieve =
        self.genericExceptionSieve || new Set();
    if ( hashes.size !== 0 ) {
        for ( const hash of genericExceptionSieve ) {
            hashes.add(hash);
        }
    } else {
        self.genericExceptionSieve = new Set(genericExceptionSieve);
    }
    genericExceptionSieve.length = 0;
}

if ( genericExceptionMap ) {
    const map = self.genericExceptionMap =
        self.genericExceptionMap || new Map();
    if ( map.size !== 0 ) {
        for ( const entry of genericExceptionMap ) {
            const before = map.get(entry[0]);
            if ( before === undefined ) {
                map.set(entry[0], entry[1]);
            } else {
                map.set(entry[0], `${before}\n${entry[1]}`);
            }
        }
    } else {
        self.genericExceptionMap = new Map(genericExceptionMap);
    }
    genericExceptionMap.length = 0;
}

/******************************************************************************/

})();

/******************************************************************************/
