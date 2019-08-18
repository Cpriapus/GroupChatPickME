!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):"object"==typeof exports?module.exports=t(require("jquery")):t(jQuery)}(function(t){"use strict";function r(t,e){return this instanceof r?(t=t||"https://am-a.akamaihd.net",this._config=e||{},this._config.url=t,this._config.transforms=this._config.transforms||[],void 0):new r(t,e)}t.fn.magify=function(e,n){return n=t.extend({sourceAttribute:"data-src-original"},n),e instanceof r||t.error("magify requires a Transform parameter"),this.each(function(){var r=t(this),i=r.attr(n.sourceAttribute);if(i){var o=e.buildUrl(i,r);r.attr("src",o)}})},r.prototype.resize=function(t){return"contain"===t?t="{width}:{height}":"cover-width"===t?t="{width}:":"cover-height"===t&&(t=":{height}"),this._addTransform("resize",t)},r.prototype.crop=function(t){return this._addTransform("crop",t)},r.prototype.quality=function(t){return this._addTransform("quality",t)},r.prototype._addTransform=function(e,n){var i=t.extend(!0,{},this._config),o={type:e,value:n};return i.transforms.push(o),new r(i.url,i)},r.prototype.buildUrl=function(t,r){var e=this._config,n=e.url,i=r.parent(),o=Math.round(i.width()),a=Math.round(i.height()),u="f="+t,f=e.transforms.map(function(t){return t.type+"="+t.value}).concat(u).join("&"),s=n.replace(/\/$/,"")+"/image?"+f;return s.replace(/\{width\}/g,o).replace(/\{height\}/g,a)},t.fn.magify.Transform=r});