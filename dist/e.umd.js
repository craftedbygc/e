!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define("E",[],t):"object"==typeof exports?exports.E=t():e.E=t()}(self,(function(){return(()=>{"use strict";var e={d:(t,n)=>{for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};function n(){if(!(this instanceof n))return new n;this.size=0,this.uid=0,this.selectors=[],this.selectorObjects={},this.indexes=Object.create(this.indexes),this.activeIndexes=[]}e.r(t),e.d(t,{default:()=>A});var r=window.document.documentElement,o=r.matches||r.webkitMatchesSelector||r.mozMatchesSelector||r.oMatchesSelector||r.msMatchesSelector;n.prototype.matchesSelector=function(e,t){return o.call(e,t)},n.prototype.querySelectorAll=function(e,t){return t.querySelectorAll(e)},n.prototype.indexes=[];var i=/^#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;n.prototype.indexes.push({name:"ID",selector:function(e){var t;if(t=e.match(i))return t[0].slice(1)},element:function(e){if(e.id)return[e.id]}});var a=/^\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;n.prototype.indexes.push({name:"CLASS",selector:function(e){var t;if(t=e.match(a))return t[0].slice(1)},element:function(e){var t=e.className;if(t){if("string"==typeof t)return t.split(/\s/);if("object"==typeof t&&"baseVal"in t)return t.baseVal.split(/\s/)}}});var s,l=/^((?:[\w\u00c0-\uFFFF\-]|\\.)+)/g;n.prototype.indexes.push({name:"TAG",selector:function(e){var t;if(t=e.match(l))return t[0].toUpperCase()},element:function(e){return[e.nodeName.toUpperCase()]}}),n.prototype.indexes.default={name:"UNIVERSAL",selector:function(){return!0},element:function(){return[!0]}},s="function"==typeof window.Map?window.Map:function(){function e(){this.map={}}return e.prototype.get=function(e){return this.map[e+" "]},e.prototype.set=function(e,t){this.map[e+" "]=t},e}();var u=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g;function c(e,t){var n,r,o,i,a,s,l=(e=e.slice(0).concat(e.default)).length,c=t,f=[];do{if(u.exec(""),(o=u.exec(c))&&(c=o[3],o[2]||!c))for(n=0;n<l;n++)if(a=(s=e[n]).selector(o[1])){for(r=f.length,i=!1;r--;)if(f[r].index===s&&f[r].key===a){i=!0;break}i||f.push({index:s,key:a});break}}while(o);return f}function f(e,t){var n,r,o;for(n=0,r=e.length;n<r;n++)if(o=e[n],t.isPrototypeOf(o))return o}function d(e,t){return e.id-t.id}function p(e){return function(e){if(Array.isArray(e))return h(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(!e)return;if("string"==typeof e)return h(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return h(e,t)}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function h(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}n.prototype.logDefaultIndexUsed=function(){},n.prototype.add=function(e,t){var n,r,o,i,a,l,u,d,p=this.activeIndexes,h=this.selectors,y=this.selectorObjects;if("string"==typeof e){for(y[(n={id:this.uid++,selector:e,data:t}).id]=n,u=c(this.indexes,e),r=0;r<u.length;r++)i=(d=u[r]).key,(a=f(p,o=d.index))||((a=Object.create(o)).map=new s,p.push(a)),o===this.indexes.default&&this.logDefaultIndexUsed(n),(l=a.map.get(i))||(l=[],a.map.set(i,l)),l.push(n);this.size++,h.push(e)}},n.prototype.remove=function(e,t){if("string"==typeof e){var n,r,o,i,a,s,l,u,f=this.activeIndexes,d=this.selectors=[],p=this.selectorObjects,h={},y=1===arguments.length;for(n=c(this.indexes,e),o=0;o<n.length;o++)for(r=n[o],i=f.length;i--;)if(s=f[i],r.index.isPrototypeOf(s)){if(l=s.map.get(r.key))for(a=l.length;a--;)(u=l[a]).selector!==e||!y&&u.data!==t||(l.splice(a,1),h[u.id]=!0);break}for(o in h)delete p[o],this.size--;for(o in p)d.push(p[o].selector)}},n.prototype.queryAll=function(e){if(!this.selectors.length)return[];var t,n,r,o,i,a,s,l,u={},c=[],f=this.querySelectorAll(this.selectors.join(", "),e);for(t=0,r=f.length;t<r;t++)for(i=f[t],n=0,o=(a=this.matches(i)).length;n<o;n++)u[(l=a[n]).id]?s=u[l.id]:(s={id:l.id,selector:l.selector,data:l.data,elements:[]},u[l.id]=s,c.push(s)),s.elements.push(i);return c.sort(d)},n.prototype.matches=function(e){if(!e)return[];var t,n,r,o,i,a,s,l,u,c,f,p=this.activeIndexes,h={},y=[];for(t=0,o=p.length;t<o;t++)if(l=(s=p[t]).element(e))for(n=0,i=l.length;n<i;n++)if(u=s.map.get(l[n]))for(r=0,a=u.length;r<a;r++)!h[f=(c=u[r]).id]&&this.matchesSelector(e,c.selector)&&(h[f]=!0,y.push(c));return y.sort(d)};var y={},v={},m=["mouseenter","mouseleave","pointerenter","pointerleave"];function g(e){void 0===v[e]&&(v[e]=[])}function b(e,t){if(v[e])for(var n=0;n<v[e].length;n++){var r;(r=v[e])[n].apply(r,p(t))}}function x(e){return"string"==typeof e?document.querySelectorAll(e):e}function w(e){var t=function(e,t){var n=[],r=t;do{if(1!==r.nodeType)break;var o=e.matches(r);o.length&&n.push({delegatedTarget:r,stack:o})}while(r=r.parentElement);return n}(y[e.type],e.target);if(t.length)for(var n=0;n<t.length;n++)for(var r=0;r<t[n].stack.length;r++)-1!==m.indexOf(e.type)?(O(e,t[n].delegatedTarget),e.target===t[n].delegatedTarget&&t[n].stack[r].data(e)):(O(e,t[n].delegatedTarget),t[n].stack[r].data(e))}function O(e,t){Object.defineProperty(e,"currentTarget",{configurable:!0,enumerable:!0,get:function(){return t}})}function S(e){return JSON.parse(JSON.stringify(e))}function j(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}var k=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,r,o;return t=e,r=[{key:"bindAll",value:function(e,t){t||(t=Object.getOwnPropertyNames(Object.getPrototypeOf(e)));for(var n=0;n<t.length;n++)e[t[n]]=e[t[n]].bind(e)}},{key:"on",value:function(e,t,n,r){for(var o=e.split(" "),i=0;i<o.length;i++)if("function"!=typeof t||void 0!==n)if(t.nodeType&&1===t.nodeType||t===window||t===document)t.addEventListener(o[i],n,r);else{t=x(t);for(var a=0;a<t.length;a++)t[a].addEventListener(o[i],n,r)}else g(o[i]),v[o[i]].push(t)}},{key:"delegate",value:function(e,t,r){for(var o=e.split(" "),i=0;i<o.length;i++){var a=y[o[i]];void 0===a&&(a=new n,y[o[i]]=a,-1!==m.indexOf(o[i])?document.addEventListener(o[i],w,!0):document.addEventListener(o[i],w)),a.add(t,r)}}},{key:"off",value:function(e,t,n,r){for(var o=e.split(" "),i=0;i<o.length;i++)if(void 0!==t)if("function"!=typeof t){var a=y[o[i]];if(void 0===a||(a.remove(t,n),0!==a.size))if(void 0===t.removeEventListener){t=x(t);for(var s=0;s<t.length;s++)t[s].removeEventListener(o[i],n,r)}else t.removeEventListener(o[i],n,r);else delete y[o[i]],-1!==m.indexOf(o[i])?document.removeEventListener(o[i],w,!0):document.removeEventListener(o[i],w)}else{g(o[i]);for(var l=0;l<v[o[i]].length;l++)v[o[i]][l]===t&&v[o[i]].splice(l,1)}else v[o[i]]=[]}},{key:"emit",value:function(e){for(var t=arguments.length,n=new Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];b(e,n)}},{key:"debugDelegated",value:function(){return S(y)}},{key:"debugBus",value:function(){return S(v)}}],r&&j(t.prototype,r),o&&j(t,o),Object.defineProperty(t,"prototype",{writable:!1}),e}();const A=new k;return t})()}));