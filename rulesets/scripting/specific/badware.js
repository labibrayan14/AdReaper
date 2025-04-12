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

// ruleset: badware

// Important!
// Isolate from global scope
(function uBOL_cssSpecificImports() {

/******************************************************************************/

const argsList = ["",".code-block",".appua-reimage-top",".info.box",".download_button_info_texts",".js-download_button_additional_links",".primary_download",".sidebar_download_inner","div.attention-button-box-green","b:has(a[target^=\"reimage\"])",".ui-content > .win",".sidebar_download_inner > :not(.voting-box):not(.colorbg-grey)",".js-download_button_offer",".automatic_removal_list",".quick-download-button-placeholder",".quick-download-button-text","div[style^=\"border:2px\"]","#solution_v2_de","#gray_de",".automatic_removal_list_w > .ar_block_description","[onclick*=\"open\"]","center > [class*=\"buttonPress-\"]","div[class^=\"code-block code-block-\"]",".getox","center > a[target=\"_blank\"][rel=\"nofollow noreferrer noopener\"]","div[style=\"float: none; margin:10px 0 10px 0; text-align:center;\"]","[id^=\"haxno-\"]","a[rel=\"nofollow noreferrer noopener\"][target=\"_blank\"]",".cente-1",".ads-btns","[class*=\"buttonPress-\"]","center > a","center > button","[href^=\"http://slugmefilehos.xyz/\"]","center#yangchen > iframe#external-frame[src=\"https://im136.mom/\"]:not([class])","html.w-mod-js:not(.wf-active) > body:not([class]):not([id]) > a[class=\"w-inline-block\"][href^=\"http\"]","#ad-gs-05"];
const argsSeqs = [0,1,-2,3,-4,-5,-6,-7,8,-6,-10,-11,-12,-13,-14,-15,19,9,-16,-17,18,-20,22,20,-20,21,-20,24,-20,28,21,-21,23,-21,24,-21,22,22,-22,24,-22,23,23,-23,32,-23,31,-23,30,24,25,26,27,29,33,34,35,36];
const hostnamesMap = new Map([["windowsreport.com",1],["appuals.com",2],["pcseguro.es",4],["sauguspc.lt",4],["sichernpc.de",4],["ugetfix.com",4],["wyleczpc.pl",4],["2-spyware.com",9],["novirus.uk",9],["faravirus.ro",9],["uirusu.jp",9],["virusi.hr",9],["wubingdu.cn",9],["avirus.hu",9],["ioys.gr",9],["odstranitvirus.cz",9],["tanpavirus.web.id",9],["utanvirus.se",9],["virukset.fi",9],["losvirus.es",9],["virusler.info.tr",9],["semvirus.pt",9],["lesvirus.fr",9],["senzavirus.it",9],["dieviren.de",9],["viruset.no",9],["usunwirusa.pl",9],["zondervirus.nl",9],["bedynet.ru",9],["virusai.lt",9],["virusi.bg",9],["viirused.ee",9],["udenvirus.dk",9],["majorgeeks.com",17],["howtoremove.guide",18],["goharpc.com",21],["pccrackbox.com",23],["cracklabel.com",24],["pcwarezbox.com",24],["10crack.com",23],["crackproductkey.com",24],["crackpcsoft.net",21],["crackwinz.com",21],["genuineactivator.com",23],["topcracked.com",21],["fullcrackedpc.com",23],["idmfullcrack.info",23],["idmpatched.com",23],["productkeyfree.org",26],["patchcracks.com",24],["cracksole.com",23],["allsoftwarekeys.com",23],["softwar2crack.com",23],["productkeyforfree.com",26],["wazusoft.com",26],["rootscrack.com",26],["activators4windows.com",21],["procrackhere.com",23],["proproductkey.com",21],["freelicensekey.org",23],["pcsoftz.net",23],["freecrackdownload.com",21],["f4file.com",21],["serialkey360.com",23],["zuketcreation.net",28],["filedownloads.store",23],["datanodes.to",23],["serialkey89.com",30],["installcracks.com",30],["crackserialkey.co",30],["maliksofts.com",30],["crackpropc.com",31],["ayeshapc.com",30],["crackhomes.com",30],["crackspro.co",31],["crackknow.com",31],["4howcrack.com",30],["trycracksoftware.com",30],["getprocrack.co",30],["activationkeys.co",30],["organiccrack.com",30],["softwarance.com",30],["procrackkey.co",30],["download4mac.com",30],["freeactivationkeys.org",30],["explorecrack.com",30],["okproductkey.com",30],["downloadpc.net",30],["up4pc.com",30],["hitproversion.com",30],["cracktube.net",30],["abbaspc.net",30],["crackdownload.org",30],["crackdownload.me",30],["corecrack.com",30],["windowsactivator.info",30],["keygenstore.com",30],["procrackpc.co",30],["getmacos.org",30],["latestproductkey.co",30],["shanpc.com",30],["crackpckey.com",30],["torrentfilefree.com",33],["idmfullversion.com",30],["wareskey.com",30],["crackbell.com",30],["newproductkey.com",35],["osproductkey.com",30],["serialkeysfree.org",33],["autocracking.com",33],["crackzoom.com",30],["greencracks.com",35],["profullversion.com",33],["crackswall.com",33],["rootcracks.org",35],["licensekeys.org",30],["softserialkey.com",30],["free4pc.org",30],["productkeys.org",30],["crackedfine.com",30],["idmcrackeys.com",30],["crackedhere.com",30],["licensekeysfree.org",30],["trycracksetup.com",30],["crackedsoft.org",30],["assadpc.com",35],["thecrackbox.com",33],["keystool.com",35],["crackedpcs.com",30],["cracksmad.com",30],["licensekeyup.com",30],["chcracked.com",30],["finalcracked.com",30],["activatorpros.com",30],["crackedmod.com",30],["whitecracked.com",30],["cracksoon.com",30],["boxcracked.com",30],["activationkey.org",30],["serialkeypatch.org",30],["crackedsoftpc.com",30],["proapkcrack.com",30],["softscracked.com",30],["freeappstorepc.com",30],["reallpccrack.com",30],["crackfullkey.net",30],["hmzapc.com",30],["zcracked.com",30],["usecracked.com",30],["crackedversion.com",30],["aryancrack.com",30],["piratespc.net",30],["reallcrack.com",30],["fultech.org",30],["crackpro.org",30],["cracksray.com",30],["cracksmat.com",35],["crackxpoint.com",30],["startcrack.co",30],["crackbros.com",35],["pcfullversion.com",35],["sjcrack.com",30],["repack-games.com",35],["bypassapp.com",30],["crackfury.com",30],["9to5crack.com",30],["zpaste.net",30],["lewdgames.to",37],["warezcrack.net",37],["freeprosoftz.com",37],["vcracks.com",37],["crackthere.com",37],["keygenfile.net",37],["scracked.com",37],["cyberspc.com",37],["softzcrack.com",37],["crackintopc.com",37],["zslicensekey.com",37],["procrackpc.com",37],["crackshere.com",37],["crackdj.com",37],["cracktopc.com",37],["serialsofts.com",37],["prosoftlink.com",37],["zscracked.com",37],["crackvip.com",37],["windowcrack.com",37],["softsnew.com",37],["licensecrack.net",37],["vstpatch.net",37],["newcrack.info",37],["topkeygen.com",38],["vsthomes.com",37],["vstserial.com",37],["procrackerz.com",40],["pcfullcrack.org",37],["keygenpc.com",37],["bicfic.com",37],["ikcrack.com",37],["downloadcracker.com",37],["karancrack.com",37],["piratesfile.com",38],["activatorwin.com",37],["starcrack.net",37],["crackproduct.com",37],["dgkcrack.com",37],["crackglobal.com",37],["crackcan.com",37],["keygendownloads.com",37],["crackpatched.com",37],["windowsactivators.org",37],["serialsoft.org",37],["crackit.org",37],["productscrack.com",37],["crackurl.info",37],["crackroot.net",37],["crackmak.com",37],["seeratpc.com",37],["crackmix.com",37],["piratepc.me",37],["letcracks.com",38],["latestcracked.com",37],["fullversionforever.com",37],["vlsoft.net",37],["crackeado.net",37],["fileoye.com",37],["excrack.com",37],["mahcrack.com",37],["get4pcs.com",37],["keygenwin.com",37],["mycrackfree.com",37],["crackfullpro.com",37],["crackkey4u.com",37],["fileserialkey.com",37],["cracksdat.com",37],["crackgrid.com",37],["licensekeysfree.com",37],["crackkeymac.com",37],["freecrack4u.com",37],["getintomac.net",37],["crackreview.com",37],["activatorskey.com",37],["kuyhaa.cc",37],["cracktel.com",37],["up4crack.com",37],["crackcut.com",37],["game-repack.site",37],["dodi-repacks.download",37],["yasir-252.net",37],["getpcsofts.net",37],["procracks.net",37],["zeemalcrack.com",40],["macfiles.org",37],["softzspot.com",37],["softgetpc.com",37],["crackkits.com",42],["crackwatch.org",42],["origincrack.com",43],["crackhub.org",42],["crackrules.com",42],["haxmac.cc",42],["cracka2zsoft.com",45],["clevercracks.com",42],["onhax.in",47],["haxpc.net",42],["win-crack.com",49],["kalicrack.com",49],["sadeempc.com",49],["thepiratecity.co",49],["torrentmac.net",49],["ryuugames.com",49],["pesktop.com",49],["proappcrack.com",49],["zgamespc.com",49],["crack11.com",49],["gvnvh.net",49],["cracksoftwaress.net",50],["haxnode.net",51],["romsdl.net",52],["xcloud.mom",53],["torrdroidforpc.com",54],["app",55],["webflow.io",56],["uploadfox.net",57]]);
const hasEntities = false;

self.specificImports = self.specificImports || [];
self.specificImports.push({ argsList, argsSeqs, hostnamesMap, hasEntities });

/******************************************************************************/

})();

/******************************************************************************/
