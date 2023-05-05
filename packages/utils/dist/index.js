!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?n(exports):"function"==typeof define&&define.amd?define(["exports"],n):n((t="undefined"!=typeof globalThis?globalThis:t||self)["@zero-song/utils"]={})}(this,(function(t){"use strict";function n(t){return"object"==typeof t&&null!==t}function e(t){if(!n(t)||"[object Object]"!=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}(t))return!1;if(null===Object.getPrototypeOf(t))return!0;let e=t;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function r(t){return!!e(t)&&"{}"===JSON.stringify(t)}function o(t,n=!0){const r=[];for(let o in t){let i=t[o];e(i)&&(i=JSON.stringify(i)),r.push(`${o}=${n?encodeURIComponent(i):i}`)}return r.join("&")}function i(t){return Array.isArray(t)}function u(t){const n=typeof t;return null!=t&&("object"===n||"function"===n)}function c(t,n){if(u(n)&&u(t))for(let r in n){let o=n[r];u(o)?(e(o)&&!e(t[r])?t[r]={}:Array.isArray(o)&&!Array.isArray(t[r])&&(t[r]=[]),c(t[r],o)):t[r]=o}return t}function l(t,n){return n=null==n?t.length-1:+n,function(){const e=Math.max(arguments.length-n,0),r=Array(e);for(let t=0;t<e;t++)r[t]=arguments[t+n];switch(n){case 0:return t.call(this,r);case 1:return t.call(this,arguments[0],r);case 2:return t.call(this,arguments[0],arguments[1],r)}const o=Array(n+1);for(let t=0;t<n;t++)o[t]=arguments[t];return o[n]=r,t.apply(this,o)}}var s=Date.now||function(){return(new Date).getTime()};function f(t){return Reflect.apply(Object.prototype.toString,t,[]).match(/\s+(\w+)\]$/)?.[1]}function a(t){return"String"==f(t)}function p(t){return void 0===t}function y(t){return"Number"==f(t)}function d(t,n=[],e){try{y(n)&&(n=String(n));let r=(a(n)?n.split("."):n).reduce(((t,n)=>t[n]),t);return p(r)?e:r}catch(t){return e}}const g="undefined"!=typeof window?window:"undefined"!=typeof self?self:"undefined"!=typeof global?global:Function("return this")(),h="object"==typeof global&&global&&global.Math===Math&&global.Array===Array?global:g;const x=/(Android)/i,b=()=>x.test(d(h,"navigator.userAgent"));const m=/(Win32|Win64|MacIntel|Linux x86_64)/i,A=()=>m.test(d(h,"navigator.platform"));function j(t){return"Function"==f(t)}function O(){const t=navigator.userAgent.toLowerCase();return/wxwork/i.test(t)}function w(){const t=navigator.userAgent.toLowerCase();return/micromessenger/i.test(t)&&!O()}const T=/(iPhone|iPad|iPod|iOS)/i,P=()=>T.test(d(h,"navigator.userAgent"));t.appendParam=function(t,n,e){if(!n||r(n))return t;let i={};"string"==typeof n?i[n]=e:i=n;let u=o(i);return t.includes("?")?t+="&"+u:t+="?"+u,t},t.arrayToTree=function(t,n,e,r="children",o=[]){const u=[],c={},l={};(!o||!i(o)||o.length<=0)&&(t.forEach((t=>{l[t[n]]=t})),t.forEach((t=>{l[t[e]]||o.push(t[n])})));for(const i of t){const t=i[n],l=i[e];c[t]||(c[t]={[r]:[]}),c[t]={...i,[r]:c[t][r]};const s=c[t];o.includes(t)?u.push(s):(c[l]||(c[l]={[r]:[]}),c[l][r].push(s))}return u},t.cloneDeep=function t(n){if(!u(n))return n;let e;return Array.isArray(n)?(e=[],n.forEach((n=>{e.push(t(n))})),e):c({},n)},t.curry=function(t){return function n(...e){return e.length<t.length?function(){return n(...e.concat(Array.from(arguments)))}:t(...e)}},t.debounce=function(t,n,e){let r,o,i,u,c;const f=function(){const l=s()-o;n>l?r=setTimeout(f,n-l):(r=null,e||(u=t.apply(c,i)),r||(i=c=null))},a=l((function(l){return c=this,i=l,o=s(),r||(r=setTimeout(f,n),e&&(u=t.apply(c,i))),u}));return a.cancel=function(){clearTimeout(r),r=i=c=null},a},t.deleteUndefined=function(t){return Object.keys(t).filter((n=>null!==t[n]&&void 0!==t[n])).reduce(((n,e)=>({...n,[e]:t[e]})),{})},t.flatDeep=function t(n,e=[]){return n?Array.isArray(n)?(n.map((n=>Array.isArray(n)?t(n,e):e.push(n))),e):(e.push(n),e):e},t.get=d,t.globalThis=h,t.guid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){const n=16*Math.random()|0;return("x"==t?n:3&n|8).toString(16)}))},t.isAndroid=b,t.isArray=i,t.isBoolean=function(t){return"Boolean"==f(t)},t.isDate=function(t){return"Date"==f(t)},t.isDesktop=A,t.isEmptyObject=r,t.isFunction=j,t.isIOS=P,t.isInBrowser=function(){return!w()&&!O()},t.isInWechat=w,t.isInWechatWork=O,t.isInWechatWorkDomain=function(){return-1!==location.host.indexOf(".wxwork.com")},t.isMobile=()=>!A()&&(b()||P()),t.isNaN=t=>t!=t,t.isNull=t=>null===t,t.isNumber=y,t.isObject=u,t.isObjectLike=n,t.isPlainObject=e,t.isPromise=function(t){return"object"==typeof t&&t&&"function"==typeof t.then},t.isString=a,t.isUndefined=p,t.nextTick=t=>Promise.resolve().then(t),t.now=s,t.objectToParam=o,t.paramToObject=function(t,n){const e=n||{},r=/([^&=?]+)=([^&]+)/g;let o,i,u=r.exec(t);for(;u;)o=u[1],i=u[2],e[o]=decodeURIComponent(i),u=r.exec(t);return e},t.pick=function(t,n){let e={};return t?(n.forEach((n=>{Reflect.has(t,n)&&(e[n]=t[n])})),e):e},t.restArguments=l,t.run=(t,n=[],...e)=>{const r=d(t,n=a(n)?n.split("."):n),o=d(t,n.slice(0,-1));return j(r)?r.call(o,...e):r},t.throttle=function(t,n,e){let r,o,i,u,c=0;e||(e={});const l=function(){c=!1===e.leading?0:Date.now(),r=null,u=t.apply(o,i),r||(o=i=null)},s=function(){const s=Date.now();c||!1!==e.leading||(c=s);const f=n-(s-c);return o=this,i=arguments,f<=0||f>n?(r&&(clearTimeout(r),r=null),c=s,u=t.apply(o,i),r||(o=i=null)):r||!1===e.trailing||(r=setTimeout(l,f)),u};return s.cancel=function(){clearTimeout(r),c=0,r=o=i=null},s},t.unique=function(t){const n={};return t.filter((function(t,e,r){return!n.hasOwnProperty(typeof t+t)&&(n[typeof t+t]=!0)}))}}));
//# sourceMappingURL=index.js.map