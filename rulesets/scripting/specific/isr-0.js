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

// ruleset: isr-0

// Important!
// Isolate from global scope
(function uBOL_cssSpecificImports() {

/******************************************************************************/

const argsList = ["","*","#video-blocker",".ad-link",".small-ad","#printads",".adlist",".adpic",".addtitle","#AdTop",".image-advertisement",".postad","#findABroker",".generalOverlay",".ad-body",".adunit","#topAds",".banner-300","#taboola-below-article-thumbnails",".share-zone",".header-ad",".adclass",".shareBtn",".ParnasalogoIcon",".banner-placeholder",".sb-show.sticky-banner",".sticky-ad",".bottom-sticky-strip","#closeMobileBanner",".bannerWrapMobile",".bannerWrapMobileBottom","#top_banners_mobile_place2",".banner_in",".sticky-banner.banner-con",".banner-placeholder-hashulchan",".adunit.ih-adunit",".mood_mobileweb.mood300-250.mood","[href^=\"https://moodaot.kipa.co.il/gomodaa.php\"]\n[id^=\"p__\"][id$=\"_Kipa_Native_kipa_native_1\"]\n[id^=\"p__\"][id$=\"_Kipa_Native_kipa_native_2\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_Article_1280x250_1\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_Article_300x250_1\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_Article_300x250_2\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_Article_300x600_sidebar_1\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_HP_1280x100_1\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_HP_1280x100_2\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_HP_1280x100_3\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_HP_1280x100_4\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_HP_1280x250_1\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_ROS_1280x100_2\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_ROS_1280x250_1\"]\n[id^=\"p__\"][id$=\"_kipa_desktop_ROS_300x600_sidebar_1\"]\n[id^=\"p__\"][id$=\"_kipa_mobile_native_kipa_mobile_native_1\"]\n[id^=\"p__\"][id$=\"_kipa_mobile_native_kipa_mobile_native_2\"]\n[id^=\"p__\"][id$=\"_kipa_mobileweb_Article_320x50_sticky\"]\n[id^=\"p__\"][id$=\"_kipa_mobileweb_Article_king_top\"]\n[id^=\"p__\"][id$=\"_kipa_mobileweb_HP_320x50_sticky\"]\n[id^=\"p__\"][id$=\"_kipa_mobileweb_HP_king_top\"]",".c-article__ad",".ad-label",".g-ad-label","#a_sticky_test",".banner-div-gpt-250",".cls300x250.mm-banner-container",".cls393x163.mm-banner-container",".mm-promo-content-active",".king-banner","#CM8ShowAd_MOBILE_MONSTER1_300X250","#CM8ShowAd_MOBILE_MONSTER2_300X250","#CM8ShowAd_MOBILE_MONSTER3_300X250","#MEDIUM_BANNER",".advertisingitem",".textadvertisingitem","[href^=\"https://mobile.mako.co.il/news-law_guide\"]\n[src=\"https://img.mako.co.il/2024/02/13/NEWPOSTER.jpg\"]","#maavaron-container","#ctl00_pnlBanner96Container","#ctl00_pnlMainMasterPageSmallBannerContainer",".ad-winner-button","[id*=\"_ucAdArticleAfterCategory_\"]\n[id*=\"_ucAdMiddleArticle_\"]",".gpt-slot",".ad","[id^=\"div-gpt-ad-\"]",".adcontainer",".adArticle",".adv","[class^=\"Banner_Wrap\"]",".MynetHeaderMobileComponenta",".ad-title",".ad-100-300",".ad-300-600",".ad-container-row",".adv.anchor",".ads",".center-bottom.is-fixed.only-mobile.css-1m8p2t9.slot",".only-mobile.css-13oxhn3.css-1m8p2t9.slot",".pirs-links.paragraph",".post_thumbnail_ad",".AdvertisingNew",".cls-250-4th.tmi-banner-container",".cls300x100-2nd.tmi-banner-container",".cls300x100_2nd.tmi-banner-container",".cls300x250-3rd.tmi-banner-container",".cls320x250-3rd.tmi-banner-container",".cls320x480-1st.tmi-banner-container",".no-desktop.homepage-mobile-top-ad",".only-mobile.item-ad-in-content-placeholder","div.center-bottom[data-slot-name=\"nickbar_phone\"]",".h1MainItemMobile_root__29M_o",".h1Mobile_root__6UWJ2",".v05Mobile_root__Uad3G","[box-title=\"Xtra Secret\"]\n[box-title=\"Xtra בריאות \"]\n[class^=\"Maavaron_root__\"]\n[data-items=\"holidayFinderOrdering\"]\n[href^=\"/health-special/xtra_atopic_dermatitis/\"]\n[href^=\"https://abbvie.mako.co.il/?\"]\n[href^=\"https://www.holidayfinder.co.il/\"][href*=\"?utm_source=mako&utm_medium=affiliate&utm_campaign=component\"]\n[style=\"background-image:url('https://img.mako.co.il/2022/07/10/skinholidayfinder.png')\"]",".block.md\\:hidden.w-full.max-h-\\[280px\\].h-\\[280px\\]\n.block.mt-2.max-h-\\[250px\\].h-\\[250px\\].is-container",".mb-4.md\\:hidden.block.max-h-\\[60px\\].h-\\[60px\\].is-container",".md\\:hidden.block.my-8.is-container.w-full.max-h-\\[280px\\].h-\\[280px\\]\n.md\\:hidden.mt-4.block.max-h-\\[300px\\].h-\\[300px\\]",".mt-4.md\\:hidden.block.max-h-\\[250px\\].h-\\[250px\\].is-container\n.mt-4.md\\:hidden.block.max-h-\\[280px\\].h-\\[280px\\].is-container",".my-4.md\\:hidden.block.max-h-\\[250px\\].h-\\[250px\\].is-container",".iosLoad.mobile_strip_top\n.iosLoad.mobile_top_dfp_placeholder_bill","[class*=\"_fullWidthBreak\"][class*=\"braze-banner_banner_\"]\n[class*=\"_mobileInnerDfp_\"]\n[class*=\"additional-info_mobileStripMiddleDfp_\"]\n[class*=\"dfp-slot_desktopOnly_\"][class*=\"dfp-slot_container_\"]\n[class*=\"dfp-slot_mobileOnly_\"][class*=\"dfp-slot_container_\"]\n[class*=\"top-gallery_mobileDfp_\"]\n[class*=\"upper-ad-content_mobileStripTopDfp_\"]\n[class*=\"upper-item-description_mobileStripTopDfp_\"]","#ads\\.strip\\.content\\.1","#ads\\.strip\\.content\\.2",".dfpId","#popupContainer",".widget-area.sidebar-primary.sidebar","div[style$=\"display: block; overflow: auto;\"]",".TopBanner",".arti-banners",".banner","[class*=\"banner\"]","img[src^=\"VIRARTICLES/shadv/\"]","#ads\\.top","a[href*=\"goodluckblockingthis.com\"]\na[onmousedown*=\"goodluckblockingthis.com\"]",".show.youMightAlsoLike",".taboola-wrapper",".tbl-feed-container",".trc_rbox_container","#ob-new-video-wrap",".OUTBRAIN","#taboola-left-rail-thumbnails","#area-taboola-after-content","#area-taboola-top-content",".article-taboola",".taboola",".taboola-top",".article-5-outbrain-script",".article-9-outbrain-script",".article-left-side-outbrain",".may-interest-you",".right-side-outbrain",".weather-outbrain","li.outbrain",".wrap-outbrain",".trc_related_container.tbl-feed-card","#cj_taboola_widget-2",".cj_taboola","#taboola_div","#taboola-forum-top-react","#taboola-forum_atf","#taboola-forums-top-react","#taboola-post-top-react",".t-recommendations-area",".ob-taste-left","#taboola-video-reel-mid-article",".MultiArticleTaboola.layoutItem",".Taboola.layoutItem","[href^=\"https://dtv.walla.co.il\"]\n[href^=\"https://unionhorizon.walla.co.il\"]\n[href^=\"https://www.democratv.org\"]","[href^=\"https://tld.walla.co.il/item/\"]\n[href^=\"https://tmirecycle.walla.co.il/item/\"]",".banner_ads",".sidebannerads","[class^=\"TimeLinestyles__StyledAdWrap\"]\n[class^=\"TopBannerstyles_\"]","div.dxZevu.frjHsE.NewsFlahesPagestyles__NewsFlashSpecialWidget-sc-1zhe9e-9.NewsFlahesPagestyles__NewsFlashItem-sc-1zhe9e-8",".across-google-ad.across-google-wide-ad",".centerParnasa",".bigbnr",".Banner","div[style=\"height: 78px; overflow: hidden; width: 510px;\"]\ndiv[style=\"height: 78px; padding-right: 10px; margin-bottom: 20px;\"]",".show.sticky_footer-container",".under-header.bunner-top.banner",".WidgetHidden.article-aside",".WidgetHidden_false.article-aside","#lg-atf-300-250","#lg-bottom-300-250",".ad-300-250",".ad-700-156",".ad-970-250",".dynAds",".fade",".adsbygoogle",".desk_mode.adsgoogle","#LeftBanner",".HotBannerDiv",".TopBannerDiv",".adv-article-left-kubia",".bottom-banner.row",".promoted_article","#ArticleBanner","#ads\\.premium","#carouselAdLi","#old_Arts_Ad","#relevanti_area",".SetArtWidth[style=\"margin-top:7px;\"] > table[width=\"478\"][height=\"174\"]",".banner.new > .no-print\n.banner.new.layoutItem","[height=\"7\"] + [valign=\"top\"] + tr[height=\"7\"]\n[src=\"http://partner.googleadservices.com/gpt/pubads_impl_86.js\"] + *\n[valign=\"top\"] + [valign=\"top\"] + tr[height=\"7\"]",".advertizement","#top-banner",".article-content-banner",".bannerWrap",".middle-banner","#flow","#arti-banner-popup","#stSegmentFrame",".contento_Container",".rt-banners",".adpro","a[target=\"_blank\"][href*=\"/urvd/4-\"]",".banner-article-top-wrap",".banner-top-wrap",".banner_right",".banner_right_160x100_wrap",".biz-item-box:has(.biz-item-modaa)",".pirsomet-header",".textlinks_wide.textlinks",".adbox",".game-item > .pre-game","#adfxp",".desktop-ad-720-90",".gadgety-ad-wrapper","div[data-adpath^=\"/\"]",".page_banner","[class^=\"google_ad_wrap_\"]",".active.quads-sticky","#Globes_Displays","#jumbo_container.nocontent.topBanner",".Banner_in_Content",".bannerCenter.gr",".kidum",".spAr","a[href*=\"theadblockerproject.org\"]","a[href*=\"://paid.outbrain.com/network/redir?\"][target=\"_blank\"]\na[href*=\"gampad/clk\"]\na[onmousedown*=\"://paid.outbrain.com/network/redir?\"][target=\"_blank\"]","div[onclick*=\"countAdClick\"]",".container-fluid.styles_commentWrapper__ufWcY\n.container-fluid.styles_mainWrapper__fcFda",".styles_nativeFeed__raMtD","[class^=\"styles_bannerWrapper\"]","#desktop_vid_bnr",".bannerCls.trg_banner",".panel-row-upper",".remove-ad","[href*=\"https://target.hidabroot.org/ad_manager\"]","#banner_desktop_left_div","#banner_desktop_right_div","#top_banner_div","#board_middle_advert","#plasma_container",".boardfooter_tr",".plasma","div[style=\"clear:both; float:none; height:40px;\"]\ndiv[style=\"width:641px; height:129px; clear:both; float:none;\"]\ntd[style=\"width:200px; text-align:left; vertical-align:top;\"]\nth[colspan=\"20\"]","#top_banners","#black-studio-tinymce-43",".header_banner","a img[width=\"300\"][height=\"250\"]",".clearfix.block-da-post_before_content.block-da.block-da-1 > .div-hwad-300x250\n.clearfix.da-style-2.block-da-post_middle_content.block-da.block-da-1\n.clearfix.tipi-flex-right.block-da-header.block-da.block-da-1",".div-hwad-970x250","[id^=\"div-hwad-300x\"]\n[src^=\"https://hwzone.co.il/wp-content/themes/foxiz-child/300x250.html?a=\"]","div.forum-banner",".left_padding.right_info_lincks\n.left_padding.topbanner2",".zad","#ads\\.strip\\.1","#banner-sticky","#intext-1.sideInf","#intext-2.sideInf","#intext-3.sideInf","#intext-4.sideInf","#intext-5.sideInf",".banner-BTF_LB.banner",".banner-BTF_MPU.banner",".banner-BTF_MPU_1.banner",".banner-story.banner",".banner-top",".banner.forecast-aside-banner","[id^=\"banner_\"]",".custom-position.fixed.active.pum-position-fixed.size-custom.theme-33016.popmake.pum-container","[href=\"https://www.bankhapoalim.co.il/he/loans/postpone-loan\"]\n[href^=\"https://www.sherut.net/Poalim\"]","#fakeimage",".full_width.system-banner",".ih-marketing-info-container",".ih-marketing-item-container",".link-list-item-commercial",".marketing-article",".marketing_section",".pane-ih-marketing-bxslider",".pane-ih-marketing-nice-to-know",".single-post-inner-aside__col.col",".top-adunit-section","#weekFlashes","div[style=\"clear: both;border-bottom:3px solid #ededed;padding:4px;height: 120px;\"]","#bannerDiv","#leftBanner","#rightBanner",".plasma_banner","div[id^=\"banner\"]","#innerMoodaa2","#mekodam",".Ozen300",".mood.hidden-sm.hidden-md.hidden-xs",".mood1240-100",".mood_desktop.mood1280-100.mood\n.mood_desktop.mood1280-250.mood\n.mood_desktop.mood300-250.mood\n.mood_desktop.mood300-600.mood",".mood_native.mood300-250.mood",".sargelWarp","div.textim > div > .mood > .moodiframe.oneMood\ndiv.textim > div > .mood > .moodiframe.oneMood > div","#ad_Footer",".post_ad_box","td[background^=\"/images/commercials\"]","a[target=\"_blank\"]","#link_banner",".banner_300x224",".banner_main",".HorizontalCategoryArticleAndBannerFloor",".TwoBannersFloor",".article-bottom-banner",".article-box-banner-wrap",".article-details-banner",".article-left-side-banner",".article-top-banner",".banner-left-home",".box-banner-wrap",".cls_970x350_1st_top.one-row",".horizontal-banner-wrap",".news-feed-banner",".xl-banner-wrap","#CloseshellAds","#ad1","#ads-mail-cube",".ads-mail-cube","div[data-ads-params]\ndiv[data-ads-space]",".leftBanner",".midBanner",".rightBanner","#ZA_CAMP_BG","#ZA_CAMP_CONTAINER","#ZA_CAMP_SLIDEIN_CONTAINER","#hp_bottom_strip","#mysupermarketcontainer","#neoTopStrip",".bannerClose",".mako_main_portlet_container > a[target=\"_blank\"] > img",".pzm_banners",".sidebar_pic","[class*=\"Premium_root_\"]\n[class*=\"_premiumWrapperElement\"]\n[class^=\"Ad_root_\"]\n[href^=\"https://adclick.g.doubleclick.net/\"]\n[src=\"https://img.mako.co.il/2023/03/12/rosh.gif\"]\ndiv[class*=\"mainRoot\"] > div:nth-child(4) > div[class*=\"ordering\"] > div:nth-child(6)\ndiv[id^=\"top-strip\"]","iframe[src*=\"javascript:document.write('\"]","#bLColumnText.small","#bRColumnText.small",".spacer.leftBox:nth-of-type(2)",".tallBanner.spacer",".google-ad-links-wrapper",".top-firsomet",".adv160_600",".adv300_250",".adv300_600",".banner-wrapper",".pirsumba",".pirsumbaTop",".banner-tower",".master-popup-banner",".mai-aec-header-after.mai-aec",".TopLeftRadvertisement_translation",".result_adv",".top_line_ad",".top_line_ad_translation","[box-title=\"חוק ומשפט\"]\n[href=\"https://www.mako.co.il/news-law_guide\"]\n[href^=\"/news-law_guide/\"]\n[src^=\"https://www.duns100.co.il/frame/hp3?\"]",".with-bg.sponsor",".banner.b160x600","#toolbarLink",".daily_container",".walTopBannerInside",".css-jmqqm5",".separator.css-1v283wf","#PlazmaDiv","#TopBanner","#UcInsideRight_1_1_tblWidth","#divBanner","#divBannerRight","table[bgcolor=\"#eeeeee\"][height=\"150\"]\ntable[width=\"100%\"][border=\"0\"][bgcolor=\"#EEEEEE\"][height=\"160\"]\ntd[width=\"237\"][style=\"background-color: #EEEEEE;\"]",".text-center.adv_mevzakim.adv.callout\n.text-center.adv_posts_top.adv.callout","#content3d > [href^=\"http://pubads.g.doubleclick.net/gampad/clk\"]",".ad-container-bottom-jumbo.ad-container.ad-bg",".top-4-articles > .one-secondaries-articles > div > #divTicker3D",".vod-player-sponsor-image-bottom","a[class*=\"one-article-strip\"]",".bottom-50.cj_above_team_banner_desktop",".cj_new_widget_banners_left_long",".persumi-text",".resp-mobile-hidden.banner","#banners-after-flashes","#banners-below-menu","#fixed-right.margin-fixed.banners-area",".group-731.single-onsidebar.banners-area",".group-749.home-line.banners-area",".group-752.home-line.banners-area",".slick-slider.slick-initialized.vertical-fade","div[class*=\"BannerUnit\"]","#bnrTop",".ad-flat.ad","[class*=\"banner_size\"][class*=\"banner_container_\"]","#connect","a[href*=\"campaigns.layer.co.il/\"]",".adv-placeholder",".is-only-desktop.ad-container",".station-middle-ad",".bookingaff","#RoterHePromo",".forum-side-responsive1","[class^=\"BezeqIframe_bezeqContainer_\"]\n[class^=\"HomepagePosts_commercialWrapper_\"]\n[class^=\"PostsExpended_commercialWrapper_\"]\n[href=\"https://bit.ly/3JbFKqV\"]\n[href=\"https://bit.ly/3yQVHRU\"]\n[href=\"https://sales22.telekol.co.il/\"]\n[href=\"https://www.kalish-fin.com/y\"]\n[href^=\"https://www.booking.com/index.html?aid=\"]\n[style=\"border: 0px solid red; width: 160px; table-layout: fixed;\"]\ntd[style=\"border:0px solid red; width:160px; table-layout:fixed;\"]\ntd[style=\"width:120px;border:0px solid red;\"]","#backgroundPopup","#popupContact","div[style=\"position: absolute; left: 40px; top: 200px; z-index: 0;\"]\ndiv[style=\"position: absolute; right: 40px; top: 200px; z-index: 0; width:154px;\"]",".inrpggoogle","#jumbobannercontainer",".aside-desktop iframe",".noprint-hidden.wide",".section-text-more-box",".with-margin-bottom.only-desktop.wide.css-13oxhn3.css-1m8p2t9.slot",".desktop-display > .maavaron","#playerAdArea","[class^=\"banner\"]",".viv","#unit_300x250_bottom","#unit_300x250_top",".s-mb-l.gpt-slot",".s-width-100.s-mv-m.flex-center-center",".header-div-banner",".article-list-alt2.article-list-alt > .article-holder-homepage > .row:nth-of-type(6) > .alt",".banner-list",".col-xs-12.col-lg-12.col-md-12.col-sm-12 > .row > .post > .text-holder.col-sm-9.col-md-8 > * > [href^=\"https://www.mako.co.il/\"]",".makoitemLeft",".post.post-alt",".w1 > #main.main-inner > #twocolumns > #sidebarHomePage > div > .pos-rel.post-list > .post-holder > .row > .col-xs-12.col-lg-12.col-md-12.col-sm-12 > div.row > .post > .text-holder.col-sm-9.col-md-8 > .datedoublepass","[href=\"http://www.mako.co.il\"]\n[href=\"https://www.mako.co.il\"]\n[href^=\"https://www.mako.co.il/\"][href$=\"&utm_source=sport5&utm_medium=RSS\"]\n[id*=\"_ucMako_rptPosts_ancLink_\"]\n[onclick*=\"hpClickEvent('mako');\"]\n[src^=\"https://meitavads-\"]",".type-2.common-hp-articles.sequence","[src=\"/public/assets/sport/winner_logo.webp\"]",".gapunit",".kidums_separate",".srugim_top_slider",".banner_forums_160x600_right",".banner_forums_tree_300x250","div[style=\"width:990px;height:150px;margin:2px auto 4px auto\"]","#topbanner",".mainUpperBanner",".rs",".header-banners.row",".td-adspot-title-320",".banner-box","#header_banner_wrapper",".cls970x250-1st.tmi-banner-container",".tmi-article > .cls970x350-1st-top.tmi-banner-container","#PublichVoiceChat",".slider2.bottom_line_neo",".bgbanner","#firstGoogleAd","#adPlayer","#adPlayerSecondary","#careerSection","#closure2014Section","#lawSection","#tldSection","#videoOverlay","#we\\ show","#zoomSection",".ads-spaces-shdera-hp",".commercial-items.mixed-sequence.sequence",".css-k0dd80",".homepage-desktop-top-ad",".href-winner",".marketing.desktop-regular\nli.marketing",".more-in-walla-aside.side-article.fc",".no-mobile.shdera > ul",".no-title.shatapim.sequence",".only-desktop.tld-event",".positioned",".slot-top-margin + .static-spaces-rectangle-buzzer.no-tablet.no-mobile",".tld-side-recommendation.editor-selections.three-section-articles.sequence",".top_banner_outer.relative",".vertical-232.tld.type-2.vertical-editable.common-hp-articles.sequence",".walla-shops","[alt=\"adImg\"]\n[data-adid]\n[data-advertiser-id]\n[name=\"adIframe\"]\na[href*=\"jor-el.net\"] + img[src^=\"blob\"]\na[href*=\"jor-el.net\"] img[src^=\"blob\"]\na[href][onmousedown] img[src^=\"blob\"]\na[href^=\"javascript:\"] img[src^=\"blob\"]\ndiv[class^=\"ads-spaces\"]\ndiv[id^=\"Fusion_holder\"]\ndiv[style=\"width:468px;margin:0 auto;\"]\niframe[id*=\"AMAdIframe\"]\nvideo[poster^=\"data:image/gif;base64,\"]","div.ads","li.ad","#topBanner","#W2D_728x90_1.show-on-desktop",".wenBanner",".mid1Banner",".banner.row",".hide-text.text-center.py-5.col-12",".hide_m.hide_.gam-placeholder",".no-print.advert","[href*=\"PromotedContent\"]","[href^=\"https://supermarker.themarker.com/\"]\n[href^=\"https://www.haaretz.co.il/labels/\"]\n[href^=\"https://www.themarker.com/labels/\"]",".overflow-hidden.mx-auto.banner-outer-wrapper",".w-full.header-banner-wrapper",".clearer.scale_image.mako_feed_neo.ver2.part2",".h033Desktop_root__ZgE9t",".poster_root__Tp4J_",".v025Desktop_root__EcTEG",".md\\:block.hidden.my-8.is-container.w-full.max-h-\\[250px\\].h-\\[250px\\]",".md\\:flex.hidden.mt-4.max-h-\\[250px\\].h-\\[250px\\].is-container\n.md\\:flex.hidden.mt-4.max-h-\\[280px\\].h-\\[280px\\].is-container\n.md\\:flex.hidden.mt-8.max-h-\\[250px\\].h-\\[250px\\].is-container\n.md\\:flex.hidden.mt-8.max-h-\\[280px\\].h-\\[250px\\].is-container",".mt-1.block.md\\:max-h-\\[250px\\].max-h-\\[145px\\].md\\:h-\\[250px\\].h-\\[145px\\].is-container",".w-\\[350px\\].min-w-\\[350px\\].lg\\:flex.hidden.h-auto",".banner-full-width",".banner-sticky-right","#XnetAdSenceThinkAdAD-300","#ads\\.250x250\\.top","#ads\\.300x250\\.1","#ads\\.blog\\.250x250","#ads\\.top\\.1",".ContentLink.banner.High\n.ContentLink.banner.Low",".ad.hdn","#desktop-top-banners","#martef",".desktop-only[class*=\"slots_desktopTextlinkLightBoxAd_\"]\n.desktop-only[class*=\"slots_desktopTvAd_\"]",".dfp",".dfp-desktop-tv-wrapper",".dfp-slot-container",".dfp_v2",".inactive.top_boxes_row",".magazine-frame",".magazine_per_category",".sticky_magazine","#sideban","#ads\\.newspaper","#ads\\.top\\.2","#blanket",".ArticleBannerComponenta",".CAATVcompAdvertiseTv",".StripMarketingComponenta1280",".art_tkb_talkback_advert",".articleBodyInreadWrapper",".banner.layoutItem",".commertial.slotView",".extended-banner.layoutItem",".pplus_hdr_ad",".promolightboxmvc","[class*=\"MarketingCarousel\"]\n[class*=\"PromoLightbox\"]","#unit1","#unit2",".BannerBoxNew",".Martef",".leftSideBanner","div.banner-container","#overlay","div.home-page-line.items-cards\ndiv.home-page-line.leaderboard",".mb-4.leaderboard-placeholder.leaderboard",".gpt-ad-container","#towerBanner.left-banner\n#towerBanner.right-banner","#bottom-ad-stick-container","#wrapper > literal > div",".frmCapsuleBlock.tblFulWidth.color-04.info-block",".actua-sticky.actua-footer-bar",".banner-header.banner_ad","#sticky_banner_bottom_desktop","#sticky_banner_bottom_mobile",".dialog-lightbox-close-button.dialog-close-button",".elementor-column-gap-no.elementor-container",".topBanner","[href^=\"http\"][href*=\"doubleclick\"][href*=\"net\"][href*=\"clk?id\"]\n[href^=\"https:\"][href*=\"haaretz\"][href*=\"co\"][href*=\"il\"][href*=\"labels/\"]\n[href^=\"https:\"][href*=\"supermarker\"][href*=\"themarker\"][href*=\"com\"]\n[href^=\"https:\"][href*=\"themarker\"][href*=\"com\"][href*=\"labels/\"]"];
const argsSeqs = [0,1,2,3,4,-5,-6,7,8,9,10,11,-12,13,14,15,16,17,-18,19,20,-21,22,-23,-104,151,-24,-25,-155,156,-24,-25,-34,-155,156,-26,-60,-159,-160,-161,-162,-163,164,-27,-115,-171,-172,173,-28,-29,-30,-183,-184,-185,186,-31,-32,-196,197,33,-35,-216,-261,-262,-263,-264,-265,-266,-267,-268,-269,-270,271,-36,-37,-279,-280,-281,-282,-283,-284,-285,-286,287,38,-39,40,-41,-42,-43,-44,-45,46,-46,-77,-78,-79,-80,-81,-82,-83,-431,432,-47,-48,-49,-50,-51,-52,-53,54,-54,-63,64,-55,56,-57,58,59,-60,61,-60,-316,-317,-318,-319,-320,-321,-322,-323,-324,-325,-326,327,60,62,65,-66,109,67,-68,-69,-380,381,-70,-71,-384,-385,386,72,-72,-135,-136,-137,-138,-216,-387,-388,-389,390,-73,-74,-145,-396,-397,-398,399,-73,-74,-84,-85,-86,-140,-327,-396,-397,-398,-399,-437,-438,-439,-440,-441,-442,-443,-444,-445,-446,-447,-448,-449,-450,-451,-452,-453,-454,-455,-456,-457,-458,-459,-460,-461,-462,-463,464,-75,139,76,-87,-88,-89,-90,-477,-478,-479,480,-91,-92,-93,-94,-95,-481,-482,-483,484,-96,-97,-494,-495,-496,-497,-498,-499,-500,-501,-502,-503,504,-98,-99,-100,-109,-110,-141,-142,-143,-506,-507,-508,-509,-510,-511,-512,-513,-514,-515,-516,-517,-518,519,-101,-102,103,-104,-157,158,105,-105,-188,-189,-190,191,106,-106,200,-106,-116,-123,-124,-125,-126,-127,-128,-295,-296,-297,-298,-299,-300,-301,-302,-303,-304,-305,-306,307,-107,152,107,108,-109,-110,-174,-175,-176,-177,-178,-179,-180,181,-109,201,-111,-112,-113,-114,-148,149,-113,-114,-409,-410,-411,-412,-413,-414,415,-116,203,-116,-117,-204,-205,206,116,-116,-166,-273,532,-118,119,-120,-121,-122,-246,-247,-248,-249,-250,-251,-252,-253,-254,-255,-256,-257,258,-129,-130,-144,-145,-353,354,-130,-144,-145,-353,-354,-416,417,131,-132,-133,-367,-368,369,134,-144,145,144,145,-146,147,150,-153,154,-165,533,-166,167,166,-168,-169,170,182,187,192,193,-194,195,-198,199,202,-207,208,209,-210,-211,-212,-213,-214,-215,216,-210,-212,-215,540,-216,387,217,218,-219,-220,221,-222,-223,-224,-225,226,-227,-228,-229,-536,537,-230,-231,-232,-233,234,235,-236,-237,238,-239,-240,-241,242,243,244,245,-259,260,272,-274,-275,276,-277,278,-288,289,290,291,-292,-293,294,308,-309,-310,-311,312,-313,-314,315,-328,-329,-330,331,-332,333,-334,-335,-336,-337,-338,339,-340,341,342,-343,-344,-345,346,-347,348,348,349,-350,-351,352,-355,-356,-357,-358,-359,360,361,-362,-363,-364,-365,366,370,-371,-372,-373,-374,-375,-376,377,378,379,-382,383,-391,-392,393,394,395,400,401,402,403,-404,-405,-406,407,408,-418,-419,420,-421,-422,423,424,425,426,427,428,429,430,433,434,435,436,465,466,467,468,-469,470,-471,-472,-473,474,-471,-472,-473,541,-475,476,-485,-486,-538,539,-487,-488,-489,-490,-491,-492,493,505,-520,521,-522,-523,524,-525,526,-527,528,-529,-530,531,-534,535];
const hostnamesMap = new Map([["asface.pw",1],["atardrushim.com",1],["aurelia-il.com",1],["avoda-mehabait.co.il",1],["bagly.co.il",1],["balimon.info",1],["bitys.pw",1],["bobuzz.com",1],["briut-chai.com",1],["bumbalu-israel.com",1],["carsguys.co.il",1],["cohenza-il.com",1],["dealclick.pw",1],["dealsclubspecial.pw",1],["dubim.net",1],["ezra-il.com",1],["faceu.us",1],["freeoffers.co.il",1],["fringantlarn8.live",1],["gbuzz.net",1],["gefun.net",1],["giborboxr-il.com",1],["graces-bag.com",1],["gubuzz.com",1],["hasdarot.cc",1],["hasdarot.club",1],["hasdarot.co",1],["hasdarot.com",1],["hasdarot.info",1],["hasdarot.life",1],["hasdarot.live",1],["hasdarot.me",1],["hasdarot.net",1],["hasdarot.pro",1],["hasdarot.space",1],["hasdarot.tv",1],["hasdarot.vip",1],["hasdarot.xyz",1],["iastrology.net",1],["ilbuzz.net",1],["isdarot.com",1],["israfun.net",1],["jobuzz.net",1],["kelocote.prpl.co.il",1],["kooduu.com",1],["kurtgeigers.co",1],["lauyn.info",1],["lavaveli.com",1],["lead.foxweb.co.il",1],["levoria-il.com",1],["livenza-il.com",1],["lools.info",1],["losittooday.info",1],["lp.infopage.co.il",1],["lp.playsmart.co.il",1],["lyfun.net",1],["lyplay.net",1],["madlik.info",1],["magnivim.info",1],["matihlle-ocean.com",1],["meirav-il.com",1],["metador.info",1],["mizrahi-il.com",1],["mklrty.info",1],["movitop.info",1],["mporli.info",1],["myvod.me",1],["noa-tikim.com",1],["noya-il.com",1],["ofnatlevi-il.com",1],["orenthelabel.com",1],["pinukim.net",1],["saphiretelavivisrael.com",1],["sdarot-il.org",1],["sdarot-tv.org",1],["sdarot.cc",1],["sdarotil.top",1],["seret.live",1],["shaardollar.co.il",1],["shahar-il.com",1],["sirtoonim.info",1],["sortie-shop.com",1],["stomi.info",1],["stylebox.co.il",1],["topfliightss.net",1],["tukid.info",1],["tvfeel.cc",1],["twobluedeer.com",1],["ugbuzz.net",1],["usbuzz.net",1],["vebuzz.net",1],["vefun.net",1],["view-movies.co.il",1],["viral4buzz.net",1],["vodmovies.co.il",1],["vodx.co.il",1],["vodxil.com",1],["votladora.com",1],["worldhotnews.net",1],["yosle.info",1],["youlim.info",1],["zegvid.com",1],["zegvid.net",1],["zohar-trends.com",1],["hagdolim.info",2],["wacdfrt.info",2],["~ad.co.il",3],["~adi.gov.il",4],["~bipbip.co.il",5],["~blms.co.il",8],["~callil.co.il",9],["~holmesplace.co.il",10],["~homeless.co.il",11],["~investing.com",12],["~junkyard.co.il",14],["~kikar.co.il",15],["~lavender.co.il",16],["~leyada.net",17],["~now14.co.il",18],["~pitria.com",20],["~ynet.co.il",21],["2net.co.il",23],["atmag.co.il",26],["hashulchan.co.il",30],["timeout.co.il",26],["baba-mail.co.il",35],["bizportal.co.il",43],["camoni.co.il",48],["doublepass.sport5.co.il",55],["foodik.co.il",59],["israelhayom.co.il",60],["kipa.co.il",73],["m.calcalist.co.il",84],["m.isramedia.net",85],["m.maariv.co.il",87],["tmi.maariv.co.il",93],["m.n12.co.il",103],["mobile.mako.co.il",111],["m.news1.co.il",114],["m.one.co.il",116],["m.sponser.co.il",118],["m.sport5.co.il",119],["mako.co.il",121],["pcmagazine.co.il",134],["podcasts.center",134],["mivzakim.net",135],["pitria.com",135],["mobile.srugim.co.il",136],["mynet.co.il",137],["podcastim.org.il",139],["radio-head.co.il",140],["rlive.co.il",144],["rotter.co.il",149],["rotter.net",150],["sheee.co.il",160],["walla.co.il",167],["stips.co.il",206],["technozone.co.il",208],["www.mako.co.il",209],["www.rlive.co.il",217],["yad2.co.il",226],["ynet.co.il",239],["0-15.co.il",261],["2b-bari.co.il",261],["50plus.co.il",261],["abortion.org.il",261],["acnecenter.co.il",261],["add-syndrome.co.il",261],["allergy.org.il",261],["alzheimer.co.il",261],["asthma.org.il",261],["autism.org.il",261],["bariatric.org.il",261],["blinds.org.il",261],["blood.co.il",261],["burn.org.il",261],["candidafree.co.il",261],["cfs.org.il",261],["cholesterol.org.il",261],["cold.co.il",261],["colon.org.il",261],["commitment.org.il",261],["committee.co.il",261],["degeneration.co.il",261],["dementia.co.il",261],["dermatology.co.il",261],["dialysis.org.il",261],["ear.org.il",261],["east-west.co.il",261],["emun.org.il",261],["ent.org.il",261],["epilepsy.co.il",261],["feeling.co.il",261],["fms.org.il",261],["gastro-israel.org.il",261],["genes.co.il",261],["human.co.il",261],["hyperhidrosis.org.il",261],["iaawh.co.il",261],["ibd.org.il",261],["ifeel.co.il",261],["ilsi.org.il",261],["immunology.org.il",261],["implants.org.il",261],["ioh.org.il",261],["isala.org.il",261],["israrights.com",261],["le-la.co.il",261],["linshom.org.il",261],["liver.org.il",261],["lung.org.il",261],["lupus.org.il",261],["maane.co.il",261],["matnachim.co.il",261],["matnachim.org.il",261],["medicalcannabis.co.il",261],["mifrakim.co.il",261],["multiplesclerosis.org.il",261],["my-rights.org.il",261],["myeyes.co.il",261],["myhealth.co.il",261],["myheart.co.il",261],["myrights.co.il",261],["nashy.co.il",261],["neurology.org.il",261],["noga.org.il",261],["obesity.org.il",261],["oncology.org.il",261],["pain.org.il",261],["parkinsons.org.il",261],["pediatrics.co.il",261],["pigur.co.il",261],["pso.org.il",261],["psychiatrist.org.il",261],["psychiatry.org.il",261],["stdinfo.co.il",261],["stroke.org.il",261],["sukarti.co.il",261],["takana.co.il",261],["tevalife.co.il",261],["urinary.co.il",261],["urine.org.il",261],["voices.co.il",261],["womenonly.co.il",261],["auto.co.il",264],["93fm.co.il",267],["ch10.co.il",268],["a.co.il",273],["emess.co.il",273],["forum.lametayel.co.il",274],["maariv.co.il",276],["aiwa.co.il",297],["bladna.co.il",299],["karmelna.net",299],["almadar.co.il",300],["marmar.co.il",300],["calcalist.co.il",301],["frogi.co.il",311],["13news.co.il",313],["13tv.co.il",313],["sport5.co.il",319],["fxp.co.il",328],["gadgety.co.il",330],["ice.co.il",335],["isramedia.net",336],["geektime.co.il",340],["inn.co.il",342],["news.walla.co.il",358],["sports.walla.co.il",364],["now14.co.il",371],["onlife.co.il",372],["radio-israel.org",377],["animals.walla.co.il",378],["astrology.walla.co.il",378],["b.walla.co.il",378],["buzzit.walla.co.il",380],["cars.walla.co.il",378],["celebs.walla.co.il",378],["e.walla.co.il",378],["elections.walla.co.il",378],["euro.walla.co.il",378],["fashion.walla.co.il",378],["finance.walla.co.il",378],["food.walla.co.il",378],["healthy.walla.co.il",378],["home.walla.co.il",378],["judaism.walla.co.il",378],["kids.walla.co.il",378],["mag.walla.co.il",378],["movies.walla.co.il",378],["mundial.walla.co.il",378],["nadlan.walla.co.il",378],["nick.walla.co.il",380],["olympics.walla.co.il",378],["tags.walla.co.il",378],["tech.walla.co.il",378],["travel.walla.co.il",378],["tv-guide.walla.co.il",378],["usaelections.walla.co.il",378],["viva.walla.co.il",378],["vod.walla.co.il",378],["weather.walla.co.il",378],["www.walla.co.il",378],["calendar.walla.co.il",381],["gaming.walla.co.il",381],["0404.co.il",382],["14across.co.il",384],["ashdodnet.com",385],["bhol.co.il",387],["bigbroil.com",389],["shmua.com",391],["bipbip.co.il",392],["calendar.2net.co.il",395],["cellebrate.mobi",396],["chabad.info",397],["chodal24.com",398],["davar1.co.il",399],["easy.co.il",401],["fun.walla.co.il",403],["galgalim.co.il",404],["gamepro.co.il",406],["globes.co.il",407],["www-globes-co-il.eu1.proxy.openathens.net",414],["rotter.name",418],["haaretz.co.il",420],["themarker.com",420],["haipo.co.il",421],["hamal.co.il",422],["hidabroot.org",425],["hm-news.co.il",430],["homeless.co.il",435],["homeprices.yad2.co.il",440],["pricelist.yad2.co.il",440],["pro.yad2.co.il",440],["hon.co.il",441],["hwzone.co.il",444],["icar.co.il",448],["il.pcmag.com",449],["ilimudim.co.il",450],["isport.co.il",451],["israelweather.co.il",453],["jobmaster.co.il",454],["junkyard.co.il",457],["kolhair.co.il",459],["lib.cet.ac.il",461],["linicom.co.il",462],["link4u.co.il",463],["madas.co.il",466],["mail.walla.co.il",467],["maka.co.il",471],["makorrishon.co.il",474],["masa.co.il",478],["mavir.co.il",480],["mazaltov.walla.co.il",486],["metukimil.co.il",488],["morfix.co.il",489],["n12.co.il",493],["tech12.co.il",495],["netex.co.il",496],["newmail.walla.co.il",497],["news1.co.il",500],["newsnow.co.il",506],["one.co.il",507],["portal.takdin.co.il",512],["posta.co.il",513],["prog.co.il",520],["psakdin.co.il",521],["rateonclick.com",522],["s-maof.com",524],["safa-ivrit.org",527],["seret.co.il",528],["sheva7.co.il",529],["shironet.mako.co.il",530],["shoofoo.co.il",531],["solitaire.co.il",532],["sponser.co.il",533],["sport1.maariv.co.il",537],["srugim.co.il",538],["starmed.co.il",541],["start.co.il",544],["takdin.co.il",545],["tatus.co.il",546],["techtime.co.il",547],["tgspot.co.il",548],["thecage.co.il",549],["tiuli.com",550],["totalchat.co.il",551],["tvbee.co.il",552],["upf.co.il",553],["uzit.co.il",554],["wallashops.co.il",555],["weather2day.co.il",556],["wen.co.il",557],["wisebuy.co.il",558],["www.geektime.co.il",559],["www.haaretz.co.il",561],["www.themarker.com",561],["www-haaretz-co-il.eu1.proxy.openathens.net",565],["www-themarker-com.eu1.proxy.openathens.net",565],["www.lametayel.co.il",569],["www.shvoong.co.il",571],["xnet.ynet.co.il",575],["yeshanews.com",582],["yo-yoo.co.il",583],["zap.co.il",585],["www.news1.co.il",588],["www.dtown.co.il",590],["foodsdictionary.co.il",592],["actualic.co.il",595]]);
const hasEntities = false;

self.specificImports = self.specificImports || [];
self.specificImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
