!function(n){function t(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return n[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var e={};t.m=n,t.c=e,t.d=function(n,e,r){t.o(n,e)||Object.defineProperty(n,e,{configurable:!1,enumerable:!0,get:r})},t.n=function(n){var e=n&&n.__esModule?function(){return n.default}:function(){return n};return t.d(e,"a",e),e},t.o=function(n,t){return Object.prototype.hasOwnProperty.call(n,t)},t.p="/",t(t.s=0)}([function(n,t,e){n.exports=e(1)},function(n,t,e){"use strict";e(2),function(){function n(){if(!i)return!1;window.requestAnimationFrame(function(){for(var i=performance.now();t.length>0&&t[0]<=i-1e3;)t.shift();t.push(i),e=t.length,u++,o+=e,r=o/u,console.log(r),n()})}var t=new Array,e=void 0,r=void 0,o=0,u=0,i=!0;n(),setTimeout(function(){i=!1},3e3)}()},function(n,t){}]);
//# sourceMappingURL=main.d5af762000110ba1d8a2.js.map