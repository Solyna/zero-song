!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self)["@zero-song/utils"]={})}(this,(function(t){"use strict";function e(t){return"object"==typeof t&&null!==t}function n(t){if(!e(t)||"[object Object]"!=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}(t))return!1;if(null===Object.getPrototypeOf(t))return!0;let n=t;for(;null!==Object.getPrototypeOf(n);)n=Object.getPrototypeOf(n);return Object.getPrototypeOf(t)===n}function r(t){return!!n(t)&&"{}"===JSON.stringify(t)}function i(t,e=!0){const r=[];for(let i in t){let s=t[i];n(s)&&(s=JSON.stringify(s)),r.push(`${i}=${e?encodeURIComponent(s):s}`)}return r.join("&")}function s(t){return Array.isArray(t)}function o(t){const e=typeof t;return null!=t&&("object"===e||"function"===e)}function u(t,e){if(o(e)&&o(t))for(let r in e){let i=e[r];o(i)?(n(i)&&!n(t[r])?t[r]={}:Array.isArray(i)&&!Array.isArray(t[r])&&(t[r]=[]),u(t[r],i)):t[r]=i}return t}function f(t,e){return e=null==e?t.length-1:+e,function(){const n=Math.max(arguments.length-e,0),r=Array(n);for(let t=0;t<n;t++)r[t]=arguments[t+e];switch(e){case 0:return t.call(this,r);case 1:return t.call(this,arguments[0],r);case 2:return t.call(this,arguments[0],arguments[1],r)}const i=Array(e+1);for(let t=0;t<e;t++)i[t]=arguments[t];return i[e]=r,t.apply(this,i)}}var a=Date.now||function(){return(new Date).getTime()};function h(t){return Reflect.apply(Object.prototype.toString,t,[]).match(/\s+(\w+)\]$/)?.[1]}function c(t){return"String"==h(t)}function l(t){return void 0===t}function g(t){return"Number"==h(t)}function d(t,e=[],n){try{g(e)&&(e=String(e));let r=(c(e)?e.split("."):e).reduce(((t,e)=>t[e]),t);return l(r)?n:r}catch(t){return n}}const p="undefined"!=typeof window?window:"undefined"!=typeof self?self:"undefined"!=typeof global?global:Function("return this")(),y="object"==typeof global&&global&&global.Math===Math&&global.Array===Array?global:p;const b=/(Android)/i,w=()=>b.test(d(y,"navigator.userAgent"));const x=/(Win32|Win64|MacIntel|Linux x86_64)/i,A=()=>x.test(d(y,"navigator.platform"));function m(t){return"Function"==h(t)}function S(){const t=navigator.userAgent.toLowerCase();return/wxwork/i.test(t)}function U(){const t=navigator.userAgent.toLowerCase();return/micromessenger/i.test(t)&&!S()}const j=/(iPhone|iPad|iPod|iOS)/i,L=()=>j.test(d(y,"navigator.userAgent"));const O=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]);function T(t,e,n,r,i){let s,o,u,f,a,h,c,l,g,d,p,y,b;for(;i>=64;){for(s=e[0],o=e[1],u=e[2],f=e[3],a=e[4],h=e[5],c=e[6],l=e[7],d=0;d<16;d++)p=r+4*d,t[d]=(255&n[p])<<24|(255&n[p+1])<<16|(255&n[p+2])<<8|255&n[p+3];for(d=16;d<64;d++)g=t[d-2],y=(g>>>17|g<<15)^(g>>>19|g<<13)^g>>>10,g=t[d-15],b=(g>>>7|g<<25)^(g>>>18|g<<14)^g>>>3,t[d]=(y+t[d-7]|0)+(b+t[d-16]|0);for(d=0;d<64;d++)y=(((a>>>6|a<<26)^(a>>>11|a<<21)^(a>>>25|a<<7))+(a&h^~a&c)|0)+(l+(O[d]+t[d]|0)|0)|0,b=((s>>>2|s<<30)^(s>>>13|s<<19)^(s>>>22|s<<10))+(s&o^s&u^o&u)|0,l=c,c=h,h=a,a=f+y|0,f=u,u=o,o=s,s=y+b|0;e[0]+=s,e[1]+=o,e[2]+=u,e[3]+=f,e[4]+=a,e[5]+=h,e[6]+=c,e[7]+=l,r+=64,i-=64}return r}class k{digestLength=32;blockSize=64;state=new Int32Array(8);temp=new Int32Array(64);buffer=new Uint8Array(128);bufferLength=0;bytesHashed=0;finished=!1;constructor(){this.reset()}reset(){return this.state[0]=1779033703,this.state[1]=3144134277,this.state[2]=1013904242,this.state[3]=2773480762,this.state[4]=1359893119,this.state[5]=2600822924,this.state[6]=528734635,this.state[7]=1541459225,this.bufferLength=0,this.bytesHashed=0,this.finished=!1,this}clean(){for(let t=0;t<this.buffer.length;t++)this.buffer[t]=0;for(let t=0;t<this.temp.length;t++)this.temp[t]=0;this.reset()}update(t,e=t.length){if(this.finished)throw new Error("SHA256: can't update because hash was finished.");let n=0;if(this.bytesHashed+=e,this.bufferLength>0){for(;this.bufferLength<64&&e>0;)this.buffer[this.bufferLength++]=t[n++],e--;64===this.bufferLength&&(T(this.temp,this.state,this.buffer,0,64),this.bufferLength=0)}for(e>=64&&(n=T(this.temp,this.state,t,n,e),e%=64);e>0;)this.buffer[this.bufferLength++]=t[n++],e--;return this}finish(t){if(!this.finished){const t=this.bytesHashed,e=this.bufferLength,n=t/536870912|0,r=t<<3,i=t%64<56?64:128;this.buffer[e]=128;for(let t=e+1;t<i-8;t++)this.buffer[t]=0;this.buffer[i-8]=n>>>24&255,this.buffer[i-7]=n>>>16&255,this.buffer[i-6]=n>>>8&255,this.buffer[i-5]=n>>>0&255,this.buffer[i-4]=r>>>24&255,this.buffer[i-3]=r>>>16&255,this.buffer[i-2]=r>>>8&255,this.buffer[i-1]=r>>>0&255,T(this.temp,this.state,this.buffer,0,i),this.finished=!0}for(let e=0;e<8;e++)t[4*e+0]=this.state[e]>>>24&255,t[4*e+1]=this.state[e]>>>16&255,t[4*e+2]=this.state[e]>>>8&255,t[4*e+3]=this.state[e]>>>0&255;return this}digest(){const t=new Uint8Array(this.digestLength);return this.finish(t),t}_saveState(t){for(let e=0;e<this.state.length;e++)t[e]=this.state[e]}_restoreState(t,e){for(let e=0;e<this.state.length;e++)this.state[e]=t[e];this.bytesHashed=e,this.finished=!1,this.bufferLength=0}}class v{inner=new k;outer=new k;blockSize=this.inner.blockSize;digestLength=this.inner.digestLength;istate;ostate;constructor(t){const e=new Uint8Array(this.blockSize);if(t.length>this.blockSize)(new k).update(t).finish(e).clean();else for(let n=0;n<t.length;n++)e[n]=t[n];for(let t=0;t<e.length;t++)e[t]^=54;this.inner.update(e);for(let t=0;t<e.length;t++)e[t]^=106;this.outer.update(e),this.istate=new Uint32Array(8),this.ostate=new Uint32Array(8),this.inner._saveState(this.istate),this.outer._saveState(this.ostate);for(let t=0;t<e.length;t++)e[t]=0}reset(){return this.inner._restoreState(this.istate,this.inner.blockSize),this.outer._restoreState(this.ostate,this.outer.blockSize),this}clean(){for(let t=0;t<this.istate.length;t++)this.ostate[t]=this.istate[t]=0;this.inner.clean(),this.outer.clean()}update(t){return this.inner.update(t),this}finish(t){return this.outer.finished?this.outer.finish(t):(this.inner.finish(t),this.outer.update(t,this.digestLength).finish(t)),this}digest(){const t=new Uint8Array(this.digestLength);return this.finish(t),t}}function P(t,e){const n=new v(t).update(e),r=n.digest();return n.clean(),r}function D(t,e,n,r){const i=r[0];if(0===i)throw new Error("hkdf: cannot expand more");e.reset(),i>1&&e.update(t),n&&e.update(n),e.update(r),e.finish(t),r[0]++}const I=new Uint8Array(32);t.HMAC=v,t.Hash=k,t.appendParam=function(t,e,n){if(!e||r(e))return t;let s={};"string"==typeof e?s[e]=n:s=e;let o=i(s);return t.includes("?")?t+="&"+o:t+="?"+o,t},t.arrayBufferToHex=function(t){if("object"!=typeof t||null===t||"number"!=typeof t.byteLength)throw new TypeError("Expected input to be an ArrayBuffer");for(var e,n=new Uint8Array(t),r="",i=0;i<n.length;i++)r+=1===(e=n[i].toString(16)).length?"0"+e:e;return r},t.arrayToTree=function(t,e,n,r="children",i=[]){const o=[],u={},f={};(!i||!s(i)||i.length<=0)&&(t.forEach((t=>{f[t[e]]=t})),t.forEach((t=>{f[t[n]]||i.push(t[e])})));for(const s of t){const t=s[e],f=s[n];u[t]||(u[t]={[r]:[]}),u[t]={...s,[r]:u[t][r]};const a=u[t];i.includes(t)?o.push(a):(u[f]||(u[f]={[r]:[]}),u[f][r].push(a))}return o},t.blockSize=64,t.cloneDeep=function t(e){if(!o(e))return e;let n;return Array.isArray(e)?(n=[],e.forEach((e=>{n.push(t(e))})),n):u({},e)},t.curry=function(t){return function e(...n){return n.length<t.length?function(){return e(...n.concat(Array.from(arguments)))}:t(...n)}},t.dateFormat=function(t,e){if(!e)return"";let n;const r={"Y+":(e=new Date(e)).getFullYear().toString(),"m+":(e.getMonth()+1).toString(),"d+":e.getDate().toString(),"H+":e.getHours().toString(),"M+":e.getMinutes().toString(),"S+":e.getSeconds().toString()};for(let e in r)n=new RegExp("("+e+")").exec(t),n&&(t=t.replace(n[1],1==n[1].length?r[e]:r[e].padStart(n[1].length,"0")));return t},t.debounce=function(t,e,n){let r,i,s,o,u;const h=function(){const f=a()-i;e>f?r=setTimeout(h,e-f):(r=null,n||(o=t.apply(u,s)),r||(s=u=null))},c=f((function(f){return u=this,s=f,i=a(),r||(r=setTimeout(h,e),n&&(o=t.apply(u,s))),o}));return c.cancel=function(){clearTimeout(r),r=s=u=null},c},t.decodeUTF8=function(t){if("string"!=typeof t)throw new TypeError("expected string");let e,n=encodeURIComponent(t),r=new Uint8Array(n.length);for(e=0;e<n.length;e++)r[e]=n.charCodeAt(e);return r},t.deleteUndefined=function(t){return Object.keys(t).filter((e=>null!==t[e]&&void 0!==t[e])).reduce(((e,n)=>({...e,[n]:t[n]})),{})},t.digestLength=32,t.encodeUTF8=function(t){let e,n=[];for(e=0;e<t.length;e++)n.push(String.fromCharCode(t[e]));return decodeURIComponent(escape(n.join("")))},t.flatDeep=function t(e,n=[]){return e?Array.isArray(e)?(e.map((e=>Array.isArray(e)?t(e,n):n.push(e))),n):(n.push(e),n):n},t.get=d,t.globalThis=y,t.guid=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(t){const e=16*Math.random()|0;return("x"==t?e:3&e|8).toString(16)}))},t.hash=function(t){const e=(new k).update(t),n=e.digest();return e.clean(),n},t.hkdf=function(t,e=I,n,r=32){const i=new Uint8Array([1]),s=P(e,t),o=new v(s),u=new Uint8Array(o.digestLength);let f=u.length;const a=new Uint8Array(r);for(let t=0;t<r;t++)f===u.length&&(D(u,o,n,i),f=0),a[t]=u[f++];return o.clean(),u.fill(0),i.fill(0),a},t.hmac=P,t.isAndroid=w,t.isArray=s,t.isBoolean=function(t){return"Boolean"==h(t)},t.isDate=function(t){return"Date"==h(t)},t.isDesktop=A,t.isEmptyObject=r,t.isFunction=m,t.isIOS=L,t.isInBrowser=function(){return!U()&&!S()},t.isInWechat=U,t.isInWechatWork=S,t.isInWechatWorkDomain=function(){return-1!==location.host.indexOf(".wxwork.com")},t.isMobile=()=>!A()&&(w()||L()),t.isNaN=t=>t!=t,t.isNull=t=>null===t,t.isNumber=g,t.isObject=o,t.isObjectLike=e,t.isPlainObject=n,t.isPromise=function(t){return"object"==typeof t&&t&&"function"==typeof t.then},t.isString=c,t.isUndefined=l,t.nextTick=t=>Promise.resolve().then(t),t.now=a,t.objectToParam=i,t.paramToObject=function(t,e){const n=e||{},r=/([^&=?]+)=([^&]+)/g;let i,s,o=r.exec(t);for(;o;)i=o[1],s=o[2],n[i]=decodeURIComponent(s),o=r.exec(t);return n},t.pbkdf2=function(t,e,n,r){const i=new v(t),s=i.digestLength,o=new Uint8Array(4),u=new Uint8Array(s),f=new Uint8Array(s),a=new Uint8Array(r);for(let t=0;t*s<r;t++){let h=t+1;o[0]=h>>>24&255,o[1]=h>>>16&255,o[2]=h>>>8&255,o[3]=h>>>0&255,i.reset(),i.update(e),i.update(o),i.finish(f);for(let t=0;t<s;t++)u[t]=f[t];for(let t=2;t<=n;t++){i.reset(),i.update(f).finish(f);for(let t=0;t<s;t++)u[t]^=f[t]}for(let e=0;e<s&&t*s+e<r;e++)a[t*s+e]=u[e]}for(let t=0;t<s;t++)u[t]=f[t]=0;for(let t=0;t<4;t++)o[t]=0;return i.clean(),a},t.pick=function(t,e){let n={};return t?(e.forEach((e=>{Reflect.has(t,e)&&(n[e]=t[e])})),n):n},t.restArguments=f,t.run=(t,e=[],...n)=>{const r=d(t,e=c(e)?e.split("."):e),i=d(t,e.slice(0,-1));return m(r)?r.call(i,...n):r},t.sleep=function(t){return new Promise((e=>{setTimeout((()=>{e(t)}),t)}))},t.throttle=function(t,e,n){let r,i,s,o,u=0;n||(n={});const f=function(){u=!1===n.leading?0:Date.now(),r=null,o=t.apply(i,s),r||(i=s=null)},a=function(){const a=Date.now();u||!1!==n.leading||(u=a);const h=e-(a-u);return i=this,s=arguments,h<=0||h>e?(r&&(clearTimeout(r),r=null),u=a,o=t.apply(i,s),r||(i=s=null)):r||!1===n.trailing||(r=setTimeout(f,h)),o};return a.cancel=function(){clearTimeout(r),u=0,r=i=s=null},a},t.unique=function(t){const e={};return t.filter((function(t,n,r){return!e.hasOwnProperty(typeof t+t)&&(e[typeof t+t]=!0)}))}}));
//# sourceMappingURL=index.js.map
