!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("E",[],t):"object"==typeof exports?exports.E=t():e.E=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=0)}([function(e,t,n){e.exports=n(2)},function(e,t){if("function"!=typeof window.WeakSet){var n=Date.now()%1e9;window.WeakSet=window.WeakSet||function(e){this.name="__st"+(1e9*Math.random()>>>0)+n+++"__",e&&e.forEach&&e.forEach(this.add,this)};var r=window.WeakSet.prototype;r.add=function(e){var t=this.name;return e[t]||Object.defineProperty(e,t,{value:!0,writable:!0}),this},r.delete=function(e){return!!e[this.name]&&(e[this.name]=void 0,!0)},r.has=function(e){return!!e[this.name]}}e.exports=window.WeakSet},function(e,t,n){"use strict";n.r(t);n(1);function r(){if(!(this instanceof r))return new r;this.size=0,this.uid=0,this.selectors=[],this.selectorObjects={},this.indexes=Object.create(this.indexes),this.activeIndexes=[]}var o=window.document.documentElement,i=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector;r.prototype.matchesSelector=function(e,t){return i.call(e,t)},r.prototype.querySelectorAll=function(e,t){return t.querySelectorAll(e)},r.prototype.indexes=[];var a=/^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;r.prototype.indexes.push({name:"ID",selector:function(e){var t;if(t=e.match(a))return t[0].slice(1)},element:function(e){if(e.id)return[e.id]}});var u=/^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;r.prototype.indexes.push({name:"CLASS",selector:function(e){var t;if(t=e.match(u))return t[0].slice(1)},element:function(e){var t=e.className;if(t){if("string"==typeof t)return t.split(/\s/);if("object"==typeof t&&"baseVal"in t)return t.baseVal.split(/\s/)}}});var s,f=/^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;r.prototype.indexes.push({name:"TAG",selector:function(e){var t;if(t=e.match(f))return t[0].toUpperCase()},element:function(e){return[e.nodeName.toUpperCase()]}}),r.prototype.indexes.default={name:"UNIVERSAL",selector:function(){return!0},element:function(){return[!0]}},s="function"==typeof window.Map?window.Map:function(){function e(){this.map={}}return e.prototype.get=function(e){return this.map[e+" "]},e.prototype.set=function(e,t){this.map[e+" "]=t},e}();var c=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;function l(e,t){var n,r,o,i,a,u,s=(e=e.slice(0).concat(e.default)).length,f=t,l=[];do{if(c.exec(""),(o=c.exec(f))&&(f=o[3],o[2]||!f))for(n=0;n<s;n++)if(a=(u=e[n]).selector(o[1])){for(r=l.length,i=!1;r--;)if(l[r].index===u&&l[r].key===a){i=!0;break}i||l.push({index:u,key:a});break}}while(o);return l}function d(e,t){var n,r,o;for(n=0,r=e.length;n<r;n++)if(o=e[n],t.isPrototypeOf(o))return o}function p(e,t){return e.id-t.id}function h(e){return function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}(e)||function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}r.prototype.logDefaultIndexUsed=function(){},r.prototype.add=function(e,t){var n,r,o,i,a,u,f,c,p=this.activeIndexes,h=this.selectors,v=this.selectorObjects;if("string"==typeof e){for(v[(n={id:this.uid++,selector:e,data:t}).id]=n,f=l(this.indexes,e),r=0;r<f.length;r++)i=(c=f[r]).key,(a=d(p,o=c.index))||((a=Object.create(o)).map=new s,p.push(a)),o===this.indexes.default&&this.logDefaultIndexUsed(n),(u=a.map.get(i))||(u=[],a.map.set(i,u)),u.push(n);this.size++,h.push(e)}},r.prototype.remove=function(e,t){if("string"==typeof e){var n,r,o,i,a,u,s,f,c=this.activeIndexes,d=this.selectors=[],p=this.selectorObjects,h={},v=1===arguments.length;for(n=l(this.indexes,e),o=0;o<n.length;o++)for(r=n[o],i=c.length;i--;)if(u=c[i],r.index.isPrototypeOf(u)){if(s=u.map.get(r.key))for(a=s.length;a--;)(f=s[a]).selector!==e||!v&&f.data!==t||(s.splice(a,1),h[f.id]=!0);break}for(o in h)delete p[o],this.size--;for(o in p)d.push(p[o].selector)}},r.prototype.queryAll=function(e){if(!this.selectors.length)return[];var t,n,r,o,i,a,u,s,f={},c=[],l=this.querySelectorAll(this.selectors.join(", "),e);for(t=0,r=l.length;t<r;t++)for(i=l[t],n=0,o=(a=this.matches(i)).length;n<o;n++)f[(s=a[n]).id]?u=f[s.id]:(u={id:s.id,selector:s.selector,data:s.data,elements:[]},f[s.id]=u,c.push(u)),u.elements.push(i);return c.sort(p)},r.prototype.matches=function(e){if(!e)return[];var t,n,r,o,i,a,u,s,f,c,l,d=this.activeIndexes,h={},v=[];for(t=0,o=d.length;t<o;t++)if(s=(u=d[t]).element(e))for(n=0,i=s.length;n<i;n++)if(f=u.map.get(s[n]))for(r=0,a=f.length;r<a;r++)!h[l=(c=f[r]).id]&&this.matchesSelector(e,c.selector)&&(h[l]=!0,v.push(c));return v.sort(p)};var v={},y={},m=["mouseenter","mouseleave"];function g(e){void 0===y[e]&&(y[e]=[])}function b(e,t){if(y[e])for(var n=0;n<y[e].length;n++){var r;(r=y[e])[n].apply(r,h(t))}}function w(e){return"string"==typeof e?document.querySelectorAll(e):e}function x(e){var t=function(e,t){var n=[],r=t;do{if(1!==r.nodeType)break;var o=e.matches(r);o.length&&n.push({delegatedTarget:r,stack:o})}while(r=r.parentElement);return n}(v[e.type],e.target);if(t.length)for(var n=0;n<t.length;n++)for(var r=0;r<t[n].stack.length;r++)-1!==m.indexOf(e.type)?(O(e,t[n].delegatedTarget),e.target===t[n].delegatedTarget&&t[n].stack[r].data(e)):(O(e,t[n].delegatedTarget),t[n].stack[r].data(e))}function O(e,t){Object.defineProperty(e,"currentTarget",{configurable:!0,enumerable:!0,value:t})}function S(e){return JSON.parse(JSON.stringify(e))}function k(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}n.d(t,"default",(function(){return j}));var j=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,o;return t=e,(n=[{key:"bindAll",value:function(e,t){void 0===t&&(t=Object.getOwnPropertyNames(Object.getPrototypeOf(e)));for(var n=0;n<t.length;n++)e[t[n]]=e[t[n]].bind(e)}},{key:"on",value:function(e,t,n){if("function"==typeof t&&void 0===n)return g(e),void y[e].push(t);for(var r=e.split(" "),o=0;o<r.length;o++)if(t.nodeType&&1===t.nodeType||t===window||t===document)t.addEventListener(r[o],n);else{t=w(t);for(var i=0;i<t.length;i++)t[i].addEventListener(r[o],n)}}},{key:"delegate",value:function(e,t,n){for(var o=e.split(" "),i=0;i<o.length;i++){var a=v[o[i]];void 0===a&&(a=new r,v[o[i]]=a,-1!==m.indexOf(o[i])?document.addEventListener(o[i],x,!0):document.addEventListener(o[i],x)),a.add(t,n)}}},{key:"off",value:function(e,t,n){if(void 0!==t)if("function"!=typeof t)for(var r=e.split(" "),o=0;o<r.length;o++){var i=v[r[o]];if(void 0===i||(i.remove(t,n),0!==i.size))if(void 0===t.removeEventListener){t=w(t);for(var a=0;a<t.length;a++)t[a].removeEventListener(r[o],n)}else t.removeEventListener(r[o],n);else delete v[r[o]],document.removeEventListener(r[o],x)}else{g(e);for(var u=0;u<y[e].length;u++)y[e][u]===t&&y[e].splice(u,1)}else y[e]=[]}},{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];b(e,n)}},{key:"debugDelegated",value:function(){return S(v)}},{key:"debugBus",value:function(){return S(y)}}])&&k(t.prototype,n),o&&k(t,o),e}()}])}));