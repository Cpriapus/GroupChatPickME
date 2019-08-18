/**
 * Copyright (c) 2012, Ron Waldon <ron.f.waldon@gmail.com>
 * All rights reserved.
 */

define("promise",[],function(){"use strict";var e;return e=function(e){return e&&"object"==typeof e?window.Promise&&e instanceof Promise?!0:"function"==typeof e.then:!1},{load:function(t,r,i){r([t],function(t){var r,s,o;r=function(){i.error.apply(null,arguments)},s=function(){i.apply(null,arguments)},e(t)?(o=t.done||t.then,"function"==typeof t.fail?(o.call(t,s),t.fail(r)):o.call(t,s,r)):i(t)})}}}),define("clientUtils",["jquery","rClientWindowMessenger"],function(e,t){function c(e){var t=e.data,n=t&&t.action&&t.type==="PostMessageBridge",r,i;n&&l[t.action]?(console.log("data response with action",t.action),r=l[t.action],r(t.payload)):(console.log("Invalid PostMessageBridge response"),console.log(e))}function h(e,t,n,r){console.log("data request with action",t,"and payload",r),e===window?(console.log("target === window, sending mock data with action",n),e.postMessage({type:"PostMessageBridge",action:n,payload:{}},"*")):e.postMessage({type:"PostMessageBridge",action:t,responseAction:n,payload:r},"*")}function p(e,t){if(l[e]!==undefined){console.log("action",e,"exists. Failed to add response handler.");return}if(typeof t!="function"){console.log("response handlers must be a function. Failed to add response handler.");return}l[e]=t}function g(e){e.mouseover(b.bind(null,e,"hover","hover")),e.mouseout(b.bind(null,e,"out","idle")),e.mousedown(b.bind(null,e,"down","down")),e.click(b.bind(null,e,"click","click"))}function y(e){e.off()}function b(e,t,n){w(e,n),t==="click"&&(E(e),x()),t==="hover"&&S()}function w(e,t){var n=["idle","hover","down","click"];n.forEach(function(t){e.removeClass(t)}),t&&e.addClass(t)}function E(e){const t=600;y(e),w(e,"click"),window.setTimeout(function(){g(e),w(e,"idle")},t)}function S(){h(window.parent,"play-sound-button-hover"),t.sendMessage({messageType:"rcp-fe-lol-home-play-sound",data:{key:"button-hover"}})}function x(){h(window.parent,"play-sound-button-click"),t.sendMessage({messageType:"rcp-fe-lol-home-play-sound",data:{key:"button-click"}})}function T(){h(window.parent,"play-sound-button-pageup-click"),t.sendMessage({messageType:"rcp-fe-lol-home-play-sound",data:{key:"button-pageup-click"}})}function N(e){return{uuid:e.data("oembed-uuid"),url:e.data("oembed-url"),urlRedirect:e.data("oembed-url-redirect"),category:e.data("oembed-category"),subcategory:e.data("oembed-subcategory"),tag:e.data("oembed-tag"),openExternally:e.data("oembed-open-externally")}}function C(e){var t="standard";return M(e.tag,["client_update_article","client_update_dev_blog"])?t="alpha-dev-blog":O(e.tag,"client_update_changelog")?t="alpha-changelog":O(e.tag,"patch_notes")&&(t="patch-notes"),window.location.origin+"/"+window.oembedGlobals.locale+"/article/"+t+"/"+e.uuid}function k(e){var t=["client_update_article","client_update_dev_blog","client_update_changelog"];return M(e.tag,t)}function L(e){if(k(e)){var t=O(e.tag,"client_update_changelog")?"changelog":"article";return window.i18nEmbed["links.clientUpdateWebsiteUrl"]+"/client-update/{type}/{uuid}".replace("{type}",t).replace("{uuid}",e.uuid)}return e.url}function A(e,t){var n=t.openExternally&&!k(t),r=n?t.url:C(t),i=n?"_blank":"_self";e.click(function(e){e.preventDefault(),s(r,{target:i}),i==="_self"&&s(r,{target:i})})}function O(e,t){return e.split(" ").includes(t)}function M(e,t){return t.some(function(t){return O(e,t)})}function _(){t.sendMessage({messageType:"rcp-fe-lol-home-free-champ-rotation-open"})}function D(e){t.sendMessage({messageType:"rcp-fe-lol-home-open-store",data:{inventoryType:e.inventoryType,itemId:e.itemId}})}function P(t){var n=new Set;e("lasso-embed").each(function(e,t){n.add(t)})}function H(n){var r=n.find(".youtube-thumbnail"),i=r.attr("data-src-original");if(i){var s=i.split("/")[4];r.prev().attr("id",s);var o;o=new YT.Player(s,{events:{onReady:u}});function u(e){r.css("display","none")}e("body").on("article-modal-opened",function(){o.getPlayerState()===1&&o.pauseVideo()}),t.addMessageListener({messageType:"rcp-fe-lol-home-section-hide",handlers:function(){o.getPlayerState()===1&&o.pauseVideo()}}),t.addMessageListener({messageType:"rcp-fe-lol-home-hide",handlers:function(){o.getPlayerState()!==-1&&B(s)}})}}function B(t){var n=e("iframe#"+t),r=n.attr("src");n.attr("src",""),n.attr("src",r)}var n="/v2/"+window.oembedGlobals.region+"/"+window.oembedGlobals.language+"/",r=function(t,n){if(!t)return;n||(n={}),t.setAttribute("src",t.getAttribute("data-src-original"))},i=["_self","_blank"],s=function(r,s){if(!r)return;s=e.extend({},{target:"_self"},s);if(i.indexOf(s.target)<0)return console?console.log("client-utils[openUrl] The specified target is not valid: "+type):null,null;if(s.target==="_self")e("body").trigger("article-modal-opened"),h(window.parent,"show-overlay-window",null,{url:r,className:"rcp-fe-home-article"}),t.sendMessage({messageType:"rcp-fe-lol-home-open-full-page-modal",data:{url:r}});else{if(s.target!=="_blank")return console?console.log("client-utils[openUrl] The specified target is valid but does not have support yet:  "+type):null,null;window.open(r,"_blank")}},o=["uuid","list"],u=function(r,i,s){if(!r||!i)return;s=e.extend({},{sandbox:!0},s);if(o.indexOf(r)<0)return console?console.log("client-utils[getUrlFromUUID] The specified type is not valid: "+r):null,null;var u=window.oembedGlobals.oembedProviderHost+"/"+(s.sandbox?"sandbox":"oembed")+"?url=",a;a=window.oembedGlobals.newsOembedServiceHost+n;if(r==="uuid")a=a+"news/"+i;else{if(r!=="list")return console?console.log("client-utils[getUrlFromUUID] The specified type is valid but does not have support yet:  "+r):null,null;a=a+"lists/"+i}return a=encodeURIComponent(a),s.queryParams&&(a=a+"?"+e.param(s.queryParams)),u+a},a=/[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/,f=function(t){if(!t)return null;var n=a.exec(t);return n?n[0]:null},l={};console.log("LCU PostMessageBridge handler added"),window.addEventListener("message",c);var d=function(){function s(){return n.promise()}var n=e.Deferred(),r=window.location.protocol+"//127.0.0.1:"+window.location.port,i={account_id:1234567890,env:"NA1",web_region:"na",locale:"en_US",summoner_level:"30",app_name:"LeagueClient",app_version:"0.0.0",user_agent:"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36",system_os:"Macintosh; Intel Mac OS X 10_10_3",port:window.location.port,assetUrls:{baseUrl:r,splashUrl:r+"/lol-game-data/assets/v1/champion-splashes/{championId}/{skinId}.jpg",rpIconUrl:r+"/fe/lol-navigation/store-rp.png",ipIconUrl:r+"/fe/lol-navigation/store-ip.png"}};return p("data-response",function(t){console.log("Client data payload:",t);var r=e.extend({},i,t);$('#lcu_content').html(r);console.log("resolving with",r),n.resolve(r)}),t.addMessageListener({messageType:"rcp-fe-lol-home-data-response",handlers:function(e,t){n.resolve(t.clientData)}}),h(window.parent,"data-request","data-response"),t.sendMessage({messageType:"rcp-fe-lol-home-data-request"}),s}(),v=function(n,r){if(!n)return;r||(r={});if(e(n).text()&&e("*",n).length===0){var i=e(n).text(),s=i.split(/\s+/),o=s.pop(),u=s.join(" ");e(n).html(u+' <span class="lcu-external-link">'+o+"</span>")}else n.addClass("lcu-external-link")},m=function(n,r){var i=e('  <div class="lol-uikit-flat-button-container">    <div class="lol-uikit-flat-button">      <div class="lol-uikit-flat-button-bg"></div>      <div class="lol-uikit-flat-button-border-idle"></div>      <div class="lol-uikit-flat-button-border-transition"></div>      <div class="lol-uikit-flat-button-flare"></div>      <div class="lol-uikit-flat-button-glow"></div>      <div class="lol-uikit-flat-button-sheen-wrapper">        <div class="lol-uikit-flat-button-sheen"></div>      </div>      <div class="lol-uikit-flat-button-content-wrapper">'+n+"      </div>"+"    </div>"+"  </div>"),s=e(".lol-uikit-flat-button",i);return r&&s.addClass(r),g(s),i};return{loadImage:r,openUrl:s,getOembedUrl:u,getUUID:f,getClientData:d,addExternalLinkIcon:v,sendPostMessage:h,addPostMessageHandler:p,createLcuFlatButton:m,playHoverSound:S,playClickSound:x,playPageupSound:T,getOembedNodeData:N,getArticleFullModePath:C,getArticleWebUrl:L,isAlphaArticle:k,linkElementToFullArticle:A,openFreeChampRotation:_,openStore:D,lassoEmbedLoadedAll:P,generateYTPlayer:H}}),define("pingConfig",["jquery","clientUtils"],function(e,t){var n=new e.Deferred;return t.getClientData().then(function(e){window.pCfg={appname:e.app_name,endpoint:window.oembedGlobals.pingEndpoint,env:e.env,account:{accountId:e.account_id,region:e.web_region,locale:e.locale}},n.resolve()}),n.promise()}),define("overviewPage",["jquery","clientUtils","rClientWindowMessenger","lassoLoadJQueryPlugin","magifyJQueryPlugin"],function(e,t,n){"use strict";function r(n){console?console.log("Lasso loaded: Promo Card"):null;var r=e(n.target),i=r.find(".oembed-item-wrapper"),s=r.find(".oembed-content-wrapper"),o=r.find(".oembed-content-backdrop"),u=i.find(".oembed-content-promo"),a=u.find("iframe");u.length&&(o.addClass("promo-backdrop"),s.addClass("promo-present"));var f=e.fn.magify.Transform(window.oembedGlobals.amServiceHost).resize("cover-height").quality(90);e("img:not([src])",r).magify(f),t.generateYTPlayer(u);var l=t.getOembedNodeData(i),c=t.createLcuFlatButton(window.i18nEmbed["button.learnMore"]);t.linkElementToFullArticle(c,l),s.append(c)}function i(n){console?console.log("Lasso loaded: News Card"):null;var r=e(n.target),i=r.find(".oembed-item-wrapper"),s=i.find(".oembed-content-media-type-video"),o=e.fn.magify.Transform(window.oembedGlobals.amServiceHost).resize("cover-width").quality(90);e("img:not([src])",r).magify(o);var u=t.getOembedNodeData(i);i.hasClass("oembed-video")&&t.generateYTPlayer(s),u.openExternally&&t.addExternalLinkIcon(i.find(".oembed-content-short-title")),i.hasClass("oembed-article")&&t.linkElementToFullArticle(i,u)}function s(n){var r=e(n.target),i=e(".store-card",r),s=e(".store-card-media",r),o,u,a,f=s.attr("data-item-type");f==="CHAMPION"?(o=s.attr("data-item-id"),u=o+"000"):f==="CHAMPION_SKIN"&&(u=s.attr("data-item-id"),o=u.slice(0,-3)),t.getClientData().then(function(e){var t=e.assetUrls.splashUrl;t=t.replace("{championId}",o).replace("{skinId}",u),s.css("background-image",'url("'+t+'")'),s.find(".rp-cost").css("background-image",'url("'+e.assetUrls.rpIconUrl+'")'),s.find(".ip-cost").css("background-image",'url("'+e.assetUrls.ipIconUrl+'")')}),i.on("click",function(){t.openStore({inventoryType:f,itemId:s.attr("data-item-id")})})}function o(){console?console.log("Added Free To Play Button"):null;var n=t.createLcuFlatButton(window.i18nEmbed["button.freeChampRotation"],"utility");n.attr("data-ping-meta","buttonType=freeChampRotation"),e(".button-row-top").append(n),n.on("click",function(){t.openFreeChampRotation()})}function u(){n.addMessageListener({messageType:"rcp-fe-lol-home-show",handlers:function(){var t=0;e(".card-type-promo").addClass("animate"),e(".content-row-bottom .flex-col").each(function(n,r){t+=50,setTimeout(function(){e(r).addClass("animate")},t)})}}),n.addMessageListener({messageType:"rcp-fe-lol-home-hide",handlers:function(){e(".animate").addClass("pre-animation"),e(".animate").removeClass("animate")}})}e(function(){u(),o(),t.lassoEmbedLoadedAll(function(){n.sendMessage({messageType:"rcp-fe-lol-home-loaded"})})})}),require.config({paths:{promise:"requirejs-promise",replace:"requirejs-replace",rClientWindowMessenger:"rclient_index",clientUtils:"client-utils",jquery:"https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min",lassoLoadJQueryPlugin:"lasso",magifyJQueryPlugin:"jquery-magify",overviewPage:"pages/overview",pingConfig:"ping-config",ping:"ping-0.1.236.min",clientRestApi:"client-rest-api"},shim:{ping:["promise!pingConfig"]},waitSeconds:60}),require(["ping","overviewPage"]),define("require-landing",function(){});