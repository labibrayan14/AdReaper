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

// ruleset: fin-0

// Important!
// Isolate from global scope
(function uBOL_cssProceduralImport() {

/******************************************************************************/

const argsList = ["",["{\"selector\":\"\",\"action\":[\"style\",\"margin: -10px auto !important\"],\"tasks\":[[\"not\",{\"selector\":\"\",\"tasks\":[[\"matches-path\",\"/^/$/\"]]}],[\"spath\",\" .header\"],[\"not\",{\"selector\":\"\",\"tasks\":[[\"matches-media\",\"(min-width: 750px)\"]]}],[\"spath\",\" + div[class] + div[class] .mobile-top-ad\"]]}"],["{\"selector\":\".section-wrapper > .has-ad-right\",\"action\":[\"style\",\"width: 100% !important\"],\"tasks\":[[\"has\",{\"selector\":\"+ .section--ad\",\"tasks\":[[\"matches-css\",{\"name\":\"display\",\"value\":\"^none$\"}]]}]]}"],["{\"selector\":\".card .recommendation\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\".category-double-article-container\",\"tasks\":[[\"has\",{\"selector\":\".half-article:nth-child(1)\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"],[\"spath\",\" + .half-article:nth-child(2)\"],[\"has-text\",\"Kaupallinen yhteistyö\"]]}]]}","{\"selector\":\".double-column > a[href]\",\"action\":[\"remove\",\"\"],\"tasks\":[[\"has\",{\"selector\":\".article-container\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}]]}","{\"selector\":\".related-articles-list > .link-container\",\"tasks\":[[\"has-text\",\"/^Kaupallinen yhteistyö/\"]]}","{\"selector\":\"a.small-article\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"div.card\",\"tasks\":[[\"has-text\",\"Mainos:\"]]}","{\"selector\":\"div.container:not(.sub-category-unikulma):not(.sub-category-rahapuhe):not(.sub-category-santander):not(.sub-category-miehen-terveys):not(.sub-category-kehon-hyvinvointi-ja-vitaepro):not(.sub-category-unijaterveys):not(.sub-category-huippukivaa-seksia):not(.sub-category-puhti):not(.sub-category-hyvinvointivinkit):not(.sub-category-hetki):not(.sub-category-kaalimato):not(.sub-category-oslo-skin-lab):not(.sub-category-kodin-siivousvinkit):not(.sub-category-qled-tv):not(.sub-category-jatevesiratkaisut):not(.sub-category-bluestep):not(.sub-category-sortter-reilua-lainavertailua):not(.sub-category-rahalaitos):not(.sub-category-aitien-keittiosta):not(.sub-category-koko-kansan-autokauppa):not(.sub-category-kuljetusten-kestava-kehitys):not(.sub-category-kestavat-liikkuvuusratkaisut):not(.sub-category-hintaopas):not(.sub-category-boltworks):not(.sub-category-samsung-tv):not(.sub-category-reseptit):not(.sub-category-terveystalo):not(.sub-category-etuafi-lainanottajan-asialla):not(.sub-category-vinkit-yrityslainaan) .article-list a[href]\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"div.container:not(.sub-category-unikulma):not(.sub-category-rahapuhe):not(.sub-category-santander):not(.sub-category-miehen-terveys):not(.sub-category-kehon-hyvinvointi-ja-vitaepro):not(.sub-category-unijaterveys):not(.sub-category-huippukivaa-seksia):not(.sub-category-puhti):not(.sub-category-hyvinvointivinkit):not(.sub-category-hetki):not(.sub-category-kaalimato):not(.sub-category-oslo-skin-lab):not(.sub-category-kodin-siivousvinkit):not(.sub-category-qled-tv):not(.sub-category-jatevesiratkaisut):not(.sub-category-bluestep):not(.sub-category-sortter-reilua-lainavertailua):not(.sub-category-rahalaitos):not(.sub-category-aitien-keittiosta):not(.sub-category-koko-kansan-autokauppa):not(.sub-category-kuljetusten-kestava-kehitys):not(.sub-category-kestavat-liikkuvuusratkaisut):not(.sub-category-hintaopas):not(.sub-category-boltworks):not(.sub-category-samsung-tv):not(.sub-category-reseptit):not(.sub-category-terveystalo):not(.sub-category-etuafi-lainanottajan-asialla):not(.sub-category-vinkit-yrityslainaan) > div > div > main .article-container\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"div.container:not(.sub-category-unikulma):not(.sub-category-rahapuhe):not(.sub-category-santander):not(.sub-category-miehen-terveys):not(.sub-category-kehon-hyvinvointi-ja-vitaepro):not(.sub-category-unijaterveys):not(.sub-category-huippukivaa-seksia):not(.sub-category-puhti):not(.sub-category-hyvinvointivinkit):not(.sub-category-hetki):not(.sub-category-kaalimato):not(.sub-category-oslo-skin-lab):not(.sub-category-kodin-siivousvinkit):not(.sub-category-qled-tv):not(.sub-category-jatevesiratkaisut):not(.sub-category-bluestep):not(.sub-category-sortter-reilua-lainavertailua):not(.sub-category-rahalaitos):not(.sub-category-aitien-keittiosta):not(.sub-category-koko-kansan-autokauppa):not(.sub-category-kuljetusten-kestava-kehitys):not(.sub-category-kestavat-liikkuvuusratkaisut):not(.sub-category-hintaopas):not(.sub-category-boltworks):not(.sub-category-samsung-tv):not(.sub-category-reseptit):not(.sub-category-terveystalo):not(.sub-category-etuafi-lainanottajan-asialla):not(.sub-category-vinkit-yrityslainaan) > div > div > main .half-article\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"div.container:not(.sub-category-unikulma):not(.sub-category-rahapuhe):not(.sub-category-santander):not(.sub-category-miehen-terveys):not(.sub-category-kehon-hyvinvointi-ja-vitaepro):not(.sub-category-unijaterveys):not(.sub-category-huippukivaa-seksia):not(.sub-category-puhti):not(.sub-category-hyvinvointivinkit):not(.sub-category-hetki):not(.sub-category-kaalimato):not(.sub-category-oslo-skin-lab):not(.sub-category-kodin-siivousvinkit):not(.sub-category-qled-tv):not(.sub-category-jatevesiratkaisut):not(.sub-category-bluestep):not(.sub-category-sortter-reilua-lainavertailua):not(.sub-category-rahalaitos):not(.sub-category-aitien-keittiosta):not(.sub-category-koko-kansan-autokauppa):not(.sub-category-kuljetusten-kestava-kehitys):not(.sub-category-kestavat-liikkuvuusratkaisut):not(.sub-category-hintaopas):not(.sub-category-boltworks):not(.sub-category-samsung-tv):not(.sub-category-reseptit):not(.sub-category-terveystalo):not(.sub-category-etuafi-lainanottajan-asialla):not(.sub-category-vinkit-yrityslainaan) > div > div > main div[class=\\\"card \\\"]\",\"tasks\":[[\"has\",{\"selector\":\".half-article\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}],[\"not\",{\"selector\":\"\",\"tasks\":[[\"has\",{\"selector\":\".half-article\",\"tasks\":[[\"not\",{\"selector\":\"\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}]]}]]}]]}","{\"selector\":\"div.fp-container.card\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"div.is-visible.LazyLoad\",\"tasks\":[[\"has-text\",\"kaupallinen yhteistyö\"]]}","{\"selector\":\"div.layout:not(.sub-category-unikulma):not(.sub-category-rahapuhe):not(.sub-category-santander):not(.sub-category-miehen-terveys):not(.sub-category-kehon-hyvinvointi-ja-vitaepro):not(.sub-category-unijaterveys):not(.sub-category-huippukivaa-seksia):not(.sub-category-puhti):not(.sub-category-hyvinvointivinkit):not(.sub-category-hetki):not(.sub-category-kaalimato):not(.sub-category-oslo-skin-lab):not(.sub-category-kodin-siivousvinkit):not(.sub-category-qled-tv):not(.sub-category-jatevesiratkaisut):not(.sub-category-bluestep):not(.sub-category-sortter-reilua-lainavertailua):not(.sub-category-rahalaitos):not(.sub-category-aitien-keittiosta):not(.sub-category-koko-kansan-autokauppa):not(.sub-category-kuljetusten-kestava-kehitys):not(.sub-category-kestavat-liikkuvuusratkaisut):not(.sub-category-hintaopas):not(.sub-category-boltworks):not(.sub-category-samsung-tv):not(.sub-category-reseptit):not(.sub-category-terveystalo):not(.sub-category-etuafi-lainanottajan-asialla):not(.sub-category-vinkit-yrityslainaan) div.card\",\"tasks\":[[\"has\",{\"selector\":\"> .full-article\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}]]}","{\"selector\":\"div[class=\\\"card \\\"]\",\"tasks\":[[\"has\",{\"selector\":\"> .block > div[class=\\\"content-router-wrapper\\\"]\",\"tasks\":[[\"has-text\",\"kaupallinen yhteistyö\"]]}]]}"],["{\"selector\":\"article.post\",\"action\":[\"style\",\"height: 1px !important; width: 1px !important; margin-right: 0px !important\"],\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\"article.post\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\".article-card-grid li:has(div[id^=\\\"dfp__\\\"]:not([id^=\\\"dfp__desk-1_1\\\"]))\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\".widget_adrotate_widgets\",\"action\":[\"remove\",\"\"]}","{\"selector\":\".wpb_column.vc_column_container.td-pb-span8:has(a[onclick*=\\\"banner\\\"])\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\".jwplayer.column:has(.jw-video[src=\\\"https://seiska.b-cdn.net/Mainos.mp4\\\"])\",\"action\":[\"remove\",\"\"]}"],["{\"selector\":\"section hr\",\"tasks\":[[\"matches-css-before\",{\"name\":\"content\",\"pseudo\":\"before\",\"value\":\"Mainos |Mainoksen \"}],[\"upward\",1]]}"],["{\"selector\":\".breaking-news-container\",\"tasks\":[[\"has-text\",\"mainos:\"]]}"],["{\"selector\":\".breaking-news-container\",\"action\":[\"style\",\"display: flex !important\"],\"tasks\":[[\"not\",{\"selector\":\"\",\"tasks\":[[\"has-text\",\"mainos:\"]]}]]}","{\"selector\":\".card-container\",\"tasks\":[[\"has-text\",\"Mainos alkaa\"]]}"],["{\"selector\":\".avod-web-player-csai\",\"action\":[\"remove\",\"\"]}","{\"selector\":\".avod-web-player-skin > #skin-wrapper > div > div\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\"article[class=\\\"list bg-positive w-full mb-16\\\"]\",\"tasks\":[[\"has-text\",\"Mainos\"]]}","{\"selector\":\"div[class|=\\\"ab-test-laneitem\\\"]\",\"tasks\":[[\"has\",{\"selector\":\".list__heading\",\"tasks\":[[\"has-text\",\"Mainos\"]]}]]}"],["{\"selector\":\".views-element-container\",\"tasks\":[[\"has-text\",\"Annonsnytt\"]]}"],["{\"selector\":\".widget_text\",\"tasks\":[[\"has-text\",\"Advertisement\"]]}"],["{\"selector\":\".article__body > p\",\"tasks\":[[\"has-text\",\"/^\\\\xA0$/\"]]}"],["{\"selector\":\".container\",\"tasks\":[[\"has-text\",\"MAINOS (TEKSTI JATKUU ALLA)\"]]}"],["{\"selector\":\"section:not(section[id], section[class])\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\".red-the-latest-issue\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\"div.node-extra\",\"tasks\":[[\"has-text\",\"Mainos\"]]}","{\"selector\":\"li.block-row\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\".widget_text\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\"a[class^=\\\"ContentCard__Card-\\\"]\",\"tasks\":[[\"has-text\",\"Mainos: \"]]}","{\"selector\":\"div[class^=\\\"EmbeddedArticle__Container\\\"]\",\"tasks\":[[\"has\",{\"selector\":\".category\",\"tasks\":[[\"has-text\",\"Mainos:\"]]}]]}","{\"selector\":\"div[class^=\\\"StripeBannerBlock__StripeBannerContainer\\\"]\",\"tasks\":[[\"has-text\",\"Mainos:\"]]}"],["{\"selector\":\".luelisaa > .solu\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"[href]\",\"tasks\":[[\"has-text\",\"LeoVegas\"]]}"],["{\"selector\":\"article > div[class]\",\"tasks\":[[\"has-text\",\"Mainos (sisältö jatkuu alla)\"]]}"],["{\"selector\":\".voice-no-read\",\"tasks\":[[\"has-text\",\"Mainos päättyy\"]]}"],["{\"selector\":\"div[class] > div[id^=\\\"sas_\\\"] + div\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\"[role=\\\"feed\\\"] [data-pagelet^=\\\"FeedUnit_\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"div[class][role=\\\"button\\\"][tabindex]\",\"tasks\":[[\"has-text\",\"Sponsoroitu\"]]}]]}","{\"selector\":\"div[data-pagelet^=\\\"FeedUnit_\\\"] a[aria-label]\",\"tasks\":[[\"has-text\",\"Sponsoroitu\"]]}","{\"selector\":\"span#ssrb_feed_start + div > div[class]\",\"tasks\":[[\"has\",{\"selector\":\"span[class][dir=\\\"auto\\\"] > span[id]\",\"tasks\":[[\"has-text\",\"Sponsoroitu\"]]}]]}"],["{\"selector\":\"article\",\"tasks\":[[\"has-text\",\"SPONSORED\"]]}"],["{\"selector\":\".elementor-widget-divider.elementor-widget.elementor-widget-divider--element-align-center.elementor-widget-divider--view-line_text.elementor-element\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\"article.areview\",\"tasks\":[[\"has-text\",\"Sponsoroitua sisältöä\"]]}"],["{\"selector\":\".td_block_wrap.td_block_text_with_title\",\"tasks\":[[\"has-text\",\"/kasino/i\"]]}"],["{\"selector\":\".box\",\"tasks\":[[\"has-text\",\"Mainos:\"]]}"],["{\"selector\":\".has-background\",\"tasks\":[[\"has-text\",\"/MAINOS/i\"]]}","{\"selector\":\".has-background\",\"tasks\":[[\"has-text\",\"mainos\"]]}"],["{\"selector\":\".wall-item__container\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\"div[class=\\\"wpb_wrapper\\\"][style^=\\\"width: 324px;\\\"] > div[data-td-block-uid]\",\"tasks\":[[\"has-text\",\"PELIT\"]]}"],["{\"selector\":\"article > .main-link\",\"tasks\":[[\"has\",{\"selector\":\".source\",\"tasks\":[[\"has-text\",\"sponsoroitu\"]]}]]}"],["{\"selector\":\".embedded\",\"tasks\":[[\"has-text\",\"Markkinapaikka\"]]}"],["{\"selector\":\".col.article-card.item\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö, yhteistyössä\"]]}"],["{\"selector\":\".m-contentListItemThumb.-level-1\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\"a[href^=\\\"/artikkeli-\\\"]\",\"tasks\":[[\"has-text\",\"MAINOS\"]]}"],["{\"selector\":\"#huomiotekstiotsikko\",\"tasks\":[[\"has-text\",\"Mainos\"]]}","{\"selector\":\".wp-block-otavamedia-section-management\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\".widget\",\"tasks\":[[\"has-text\",\"Mainos\"],[\"spath\",\":not(:has([href=\\\"https://kalamies.com/tilaa/\\\"]))\"]]}"],["{\"selector\":\".media-site__widget-container\",\"tasks\":[[\"has\",{\"selector\":\"* .media-widget__title\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}]]}"],["{\"selector\":\".td-pb-span6\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\".elementor-widget-divider\",\"tasks\":[[\"has-text\",\"Mainos\"]]}","{\"selector\":\".strike\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\"main\",\"tasks\":[[\"not\",{\"selector\":\"> h2\",\"tasks\":[[\"has-text\",\"Kumppanisisältöä\"]]}],[\"spath\",\" [class][data-test] ~ div[class]:has(> a[href^=\\\"https://www.kauppalehti.fi/kumppanisisallot/\\\"])\"]]}","{\"selector\":\"main\",\"tasks\":[[\"not\",{\"selector\":\"> h2\",\"tasks\":[[\"has-text\",\"Kumppanisisältöä\"]]}],[\"spath\",\" a[href^=\\\"https://www.kauppalehti.fi/kumppanisisallot/\\\"][target=\\\"_self\\\"]\"]]}"],["{\"selector\":\".featuredpost\",\"tasks\":[[\"has\",{\"selector\":\".gb-post-grid-section-title\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}]]}"],["{\"selector\":\".wp-block-image\",\"tasks\":[[\"has-text\",\"mainos\"]]}"],["{\"selector\":\".post p\",\"tasks\":[[\"has-text\",\"Mainos:\"]]}"],["{\"selector\":\".text-center\",\"tasks\":[[\"has-text\",\"loadAd\"]]}"],["{\"selector\":\".ai-attributes\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\".layout__article-area__text-content > p\",\"tasks\":[[\"has-text\",\"/^\\\\xA0$/\"]]}"],["{\"selector\":\".row .col-small-12.col-medium-12.col-large-12\",\"tasks\":[[\"has-text\",\"Mainos:\"]]}"],["{\"selector\":\".flights.type-provider\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\".article-list--article\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"section[class=\\\"page-section page-section--no-main-article\\\"]\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\"article\",\"tasks\":[[\"has\",{\"selector\":\"> * header > * span\",\"tasks\":[[\"has-text\",\"Sponsoroitu\"]]}]]}"],["{\"selector\":\"body\",\"tasks\":[[\"not\",{\"selector\":\"#skyscraper-height-div > div > div\",\"tasks\":[[\"has-text\",\"Kumppanisisältöä\"]]}],[\"spath\",\" section > a[href^=\\\"https://www.mediuutiset.fi/kumppanisisallot\\\"]\"]]}","{\"selector\":\"body:not(.is-style-kumppanisisallot)\",\"tasks\":[[\"not\",{\"selector\":\"#skyscraper-height-div > div > div\",\"tasks\":[[\"has-text\",\"Kumppanisisältöä\"]]}],[\"spath\",\" div[class]:has(> a[href^=\\\"https://www.mediuutiset.fi/kumppanisisallot/\\\"]:not(a[class^=\\\"site-header\\\"]))\"]]}"],["{\"selector\":\"div[class^=\\\"transitionSlot__component\\\"][class*=\\\"layout__container\\\"]\",\"tasks\":[[\"has-text\",\"MAINOS\"]]}"],["{\"selector\":\".commercial__content\",\"tasks\":[[\"has-text\",\"Kumppanilta\"]]}"],["{\"selector\":\".fullarticle\",\"tasks\":[[\"has-text\",\"Sponsoroitu\"]]}","{\"selector\":\".fullarticle\",\"tasks\":[[\"has-text\",\"src=\\\"https://mobiili.fi/aaa.png\\\"\"]]}","{\"selector\":\"div[style=\\\"float:left; width:100%; text-align:center; padding:0px; margin-bottom:17px;\\\"]\",\"tasks\":[[\"has-text\",\"MAINOS\"]]}","{\"selector\":\"p\",\"tasks\":[[\"has\",{\"selector\":\"small\",\"tasks\":[[\"has-text\",\"Mainos:\"]]}]]}"],["{\"selector\":\"article.grid__item_md-1-5.grid__item_1\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\".entry-content > h3\",\"tasks\":[[\"has-text\",\"kasino\"]]}","{\"selector\":\"[class|=\\\"featured-post\\\"]\",\"tasks\":[[\"has-text\",\"/rahapeli|kasino/i\"],[\"spath\",\":has(a[href*=\\\"/202\\\"])\"]]}"],["{\"selector\":\".block-block-content\",\"tasks\":[[\"has-text\",\"Jatkuu mainoksen alla\"]]}"],["{\"selector\":\"fieldset\",\"tasks\":[[\"has-text\",\"Poista mainos\"]]}"],["{\"selector\":\".social-media-links + p\",\"tasks\":[[\"has-text\",\"/^ $/\"],[\"spath\",\":has(+ div[data-ad-unit-id])\"]]}"],["{\"selector\":\"#mainos .otsikko\",\"tasks\":[[\"has-text\",\"Lue myös\"],[\"spath\",\" + div ~ *\"]]}"],["{\"selector\":\"section[class=\\\"entry-body\\\"] > p\",\"tasks\":[[\"has-text\",\"/^\\\\xA0$/\"]]}"],["{\"selector\":\".st-banneri-view\",\"tasks\":[[\"has-text\",\"Mainos:\"],[\"spath\",\" > div\"]]}","{\"selector\":\"p > em > strong\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö:\"]]}"],["{\"selector\":\"div[style=\\\"padding-bottom:10px;border-bottom:1px solid gray;margin-bottom:6px;\\\"]\",\"tasks\":[[\"has-text\",\"Mainos:\"]]}","{\"selector\":\"div[style=\\\"padding-bottom:10px;margin-bottom:6px;border-top:1px solid gray;margin-top:6px;\\\"]\",\"tasks\":[[\"has\",{\"selector\":\"+ [style=\\\"font-size:14px;line-height:21px;padding-top:6px;\\\"]\",\"tasks\":[[\"has-text\",\"MAINOS\"]]}]]}","{\"selector\":\"div[style=\\\"padding-bottom:10px;margin-bottom:6px;border-top:1px solid gray;margin-top:6px;\\\"]\",\"tasks\":[[\"has-text\",\"MAINOS\"]]}","{\"selector\":\"tr\",\"tasks\":[[\"has\",{\"selector\":\"+ tr:has(script)\"}]]}","{\"selector\":\"tr\",\"tasks\":[[\"has-text\",\".loadAd\"]]}"],["{\"selector\":\"aside.widget_text\",\"tasks\":[[\"has-text\",\"MAINOS\"]]}"],["{\"selector\":\".custom-title\",\"tasks\":[[\"has-text\",\"Kaupalliset yhteistyöt\"]]}"],["{\"selector\":\".clearfloats.content__body > p\",\"tasks\":[[\"has-text\",\"/^\\\\xA0$/\"]]}"],["{\"selector\":\".posts-listing-list-alt-b\",\"tasks\":[[\"has-text\",\"Artikkeleita kumppaneilta\"]]}"],["{\"selector\":\"[id|=\\\"podcasti\\\"]\",\"tasks\":[[\"has-text\",\"Kaupallinen Yhteistyö\"]]}","{\"selector\":\"li\",\"tasks\":[[\"has-text\",\"MAINOS\"]]}"],["{\"selector\":\".article-body > div[class]\",\"tasks\":[[\"has\",{\"selector\":\"> span\",\"tasks\":[[\"has-text\",\"KAUPALLINEN YHTEISTYÖ\"],[\"spath\",\" + a[href^=\\\"https://koulutus.almatalent.fi/\\\"]\"]]}]]}","{\"selector\":\"div#skyscraper-height-div > aside > div > div > a\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"div#skyscraper-height-div > section > div > a\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\".ch\",\"tasks\":[[\"has-text\",\"/SP(O|0)NSOROITU/\"]]}","{\"selector\":\".ch\",\"tasks\":[[\"has-text\",\"/SPON|SPONS|SPONSO|SPONSOR|SPONSORO|SPONSOROI|SPONSOROIT|SPONSOROITU/\"]]}"],["{\"selector\":\"div[class^=\\\"PageElementFeedItem__Container\\\"]\",\"tasks\":[[\"has-text\",\"Mainos\"]]}","{\"selector\":\"div[class^=\\\"transitionSlot__component\\\"][class*=\\\"layout__container\\\"]\",\"tasks\":[[\"has-text\",\"KAUPALLINEN YHTEISTYÖ\"]]}"],["{\"selector\":\"#cnt_lista tr\",\"tasks\":[[\"has-text\",\"/^\\\\s$/\"],[\"has\",{\"selector\":\"+ tr:has(.mainosinline)\"}]]}"],["{\"selector\":\"aside\",\"tasks\":[[\"has\",{\"selector\":\"> div > span\",\"tasks\":[[\"has-text\",\"KAUPALLINEN YHTEISTYÖ\"]]}]]}","{\"selector\":\"div#skyscraper-height-div > aside > div > section > div\",\"tasks\":[[\"has-text\",\"KAUPALLINEN YHTEISTYÖ\"]]}","{\"selector\":\"div#skyscraper-height-div > div > aside > div > section > div\",\"tasks\":[[\"has-text\",\"KAUPALLINEN YHTEISTYÖ\"]]}","{\"selector\":\"div#skyscraper-height-div > section > div > a > div\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\".tsv3-c-common-elementcollection\",\"tasks\":[[\"has-text\",\"/yhteistyö[\\\\u00AD]kumppanimme artikkelit/\"]]}","{\"selector\":\".tsv3-c-common-elementlist--layout-mobiili_etusivu\",\"tasks\":[[\"has-text\",\"/yhteistyö[\\\\u00AD]kumppanimme artikkelit/\"]]}"],["{\"selector\":\"div\",\"tasks\":[[\"has\",{\"selector\":\"> div > div > div > h2 > div > span\",\"tasks\":[[\"has-text\",\"Mainostettu twiitti\"]]}]]}"],["{\"selector\":\".tdc-row.stretch_row_1400.td-stretch-content\",\"tasks\":[[\"has-text\",\"MAINOS:\"]]}"],["{\"selector\":\".elementor-widget-container\",\"tasks\":[[\"has-text\",\"MAINOS\"]]}"],["{\"selector\":\".lazyload-wrapper + section\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"div#skyscraper-height-div > div > aside > section > a\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"div#skyscraper-height-div > div > main > div > a\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\"h2 > span\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\"h4\",\"tasks\":[[\"has-text\",\"MAINOS\"]]}","{\"selector\":\"hr + h4\",\"tasks\":[[\"has-text\",\"MAINOS\"],[\"spath\",\" ~ hr\"]]}"],["{\"selector\":\"article.featured-post\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\".widget--side\",\"tasks\":[[\"has-text\",\"Mainos\"]]}"],["{\"selector\":\".td-footer-wrap .td-block-row\",\"tasks\":[[\"has-text\",\"-Yhteistyössä-\"]]}"],["{\"selector\":\"aside > section\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}","{\"selector\":\"body:not(.is-style-kumppanisisallot) main > div[class]\",\"tasks\":[[\"has-text\",\"Kaupallinen yhteistyö\"]]}"],["{\"selector\":\"#sidebar-widgets-area-1 > .widget\",\"tasks\":[[\"has-text\",\"Mainos\"]]}","{\"selector\":\".widget\",\"tasks\":[[\"has-text\",\"tradedoubler.com\"]]}","{\"selector\":\".widget_carousel_slider\",\"tasks\":[[\"has-text\",\"tarjouksia tälle viikolle\"]]}","{\"selector\":\"div[id|=\\\"block\\\"]\",\"tasks\":[[\"has-text\",\"/Lainavertailu/i\"]]}","{\"selector\":\"div[id|=\\\"block\\\"]\",\"tasks\":[[\"has-text\",\"eToro\"]]}"]];
const argsSeqs = [0,1,2,3,4,5,6,7,8,-9,74,-9,75,-10,11,10,12,13,14,15,16,17,18,19,20,21,22,23,-24,-25,26,-24,25,-24,26,-24,-25,-26,85,27,28,29,30,31,32,33,34,35,36,37,38,39,-39,43,40,41,42,44,45,46,47,48,49,50,51,-52,53,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,76,77,78,79,80,81,82,83,84,86,87,88,89,90,91];
const hostnamesMap = new Map([["dawn.fi",1],["golfpiste.com",2],["iltalehti.fi",3],["kaaoszine.fi",4],["~kaaoszine.fi",5],["kotiliesi.fi",6],["nyan.ax",7],["seiska.fi",8],["talouselama.fi",9],["tekniikkatalous.fi",11],["karjalainen.fi",13],["~karjalainen.fi",15],["mtv.fi",16],["mtvuutiset.fi",16],["aamulehti.fi",17],["jamsanseutu.fi",17],["janakkalansanomat.fi",17],["kankaanpaanseutu.fi",17],["kmvlehti.fi",17],["merikarvialehti.fi",17],["nokianuutiset.fi",17],["rannikkoseutu.fi",17],["satakunnankansa.fi",17],["suurkeuruu.fi",17],["sydansatakunta.fi",17],["tyrvaansanomat.fi",17],["valkeakoskensanomat.fi",17],["alandstidningen.ax",18],["alfatvuutiset.fi",19],["alibi.fi",20],["koululainen.fi",20],["apteekkari.fi",21],["assembly.org",22],["autobild.fi",23],["bbs.io-tech.fi",24],["edgeski.fi",25],["pottupellossa.fi",25],["eeva.fi",26],["elmotv.com",27],["epari.fi",28],["ilkkapohjalainen.fi",31],["jarviseutu-lehti.fi",28],["jurvansanomat.fi",33],["komiat.fi",33],["suupohjansanomat.fi",33],["vaasalehti.fi",35],["viiskunta.fi",33],["facebook.com",39],["foreigner.fi",40],["fuengirola.fi",41],["gamereactor.fi",42],["gekkonen.net",43],["glu.fi",44],["gogolf.fi",45],["gti.fi",46],["hardelli.com",47],["high.fi",48],["hs.fi",49],["huonoaiti.fi",50],["iijokiseutu.fi",51],["kaleva.fi",52],["koillissanomat.fi",51],["lapinkansa.fi",51],["pohjoisenpolut.fi",51],["pyhajokiseutu.fi",51],["raahenseutu.fi",51],["rantalakeus.fi",51],["siikajokilaakso.fi",51],["jp-kunnallissanomat.fi",54],["kaksplus.fi",55],["kalamies.com",56],["kangasalansanomat.fi",57],["kansantahto.fi",58],["kauppalehti.fi",59],["kiinteistoposti.fi",60],["kodinviilennys.fi",61],["koeajolle.com",62],["kohokohta.com",63],["kokemaenjokilaakso.fi",64],["koneviesti.fi",65],["maaseuduntulevaisuus.fi",67],["lennot.rantapallo.fi",68],["ls24.fi",69],["m.facebook.com",70],["mediuutiset.fi",71],["meillakotona.fi",72],["mma.fi",73],["mobiili.fi",74],["muropaketti.com",75],["mvlehti.net",76],["nettitrendi.fi",77],["opensubtitles.org",78],["pelaajat.com",79],["pienimatkaopas.com",80],["seura.fi",81],["sijoitustieto.fi",82],["sportti.com",83],["sss.fi",84],["suomela.fi",85],["suomenkuvalehti.fi",86],["suomimobiili.fi",87],["telsu.fi",88],["terve.fi",89],["tilannehuone.fi",90],["tivi.fi",91],["ts.fi",92],["twitter.com",93],["tyyliniekka.fi",94],["ulvilanseutu.fi",95],["uusisuomi.fi",96],["vau.fi",97],["verkkouutiset.fi",98],["viisitahtea.com",99],["viranomaisuutiset.fi",100],["www.uusisuomi.fi",101],["ykkoslohja.fi",102]]);
const hasEntities = false;

self.proceduralImports = self.proceduralImports || [];
self.proceduralImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
