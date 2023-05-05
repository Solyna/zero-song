!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports,require("axios"),require("@zero-song/utils")):"function"==typeof define&&define.amd?define(["exports","axios","@zero-song/utils"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["@zero-song/net"]={},e.axios,e.utils)}(this,(function(e,t,s){"use strict";const r={},n=t.CancelToken;let o={};const a=(e,t=!1)=>{r[e]&&t?r[e]("取消重复请求"):delete r[e]},i=(e,t=!1)=>{const r=e.url||"",n=e.method||"";let o={};return["post","put","patch"].includes(n)&&e.data&&(o=t?s.cloneDeep(e.data):JSON.parse(s.cloneDeep(e.data))),"get"===n&&e.params&&(o=s.cloneDeep(e.params)),encodeURIComponent(r+n+JSON.stringify(o))};class c{handlers=[];use(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1}}const l=new class{interceptors;instance;constructor(){this.instance=t.create({timeout:15e3}),this.instance.interceptors.request.use(this.requestHandler,this.requestErrorHandler),this.instance.interceptors.response.use(this.responseHandler,this.responseErrorHandler),this.interceptors={request:new c,response:new c}}setRequest=e=>{const{headers:t,baseURL:s,timeout:r}=e;s&&(this.instance.defaults.baseURL=s),r&&(this.instance.defaults.timeout=r),t&&Object.assign(this.instance.defaults.headers.common,t)};requestHandler=async e=>{if(e.method&&"options"===e.method)return e;let t=i(e,!0);a(t,!0),o[t]=Date.now();let s=Promise.resolve(e);for(let t of this.interceptors.request.handlers)e=await s.then(t.fulfilled,t.fulfilled);return e.cancelToken=new n((e=>{r[t]=e})),e};requestErrorHandler=e=>Promise.reject(e);responseHandler=async e=>{if(e.config.method&&"options"===e.config.method)return e;let t=i(e.config);a(t);let s,r=Promise.resolve(e),n=e,c=null;for(let e of this.interceptors.response.handlers)try{n=await r.then(e.fulfilled,e.rejected)}catch(e){c=e}return o[t]&&(s=Date.now()-o[t],delete o[t],Object.keys(o).length>100&&(o={})),c?Promise.reject(Object.assign({},c.data,{costTime:s})):Promise.resolve(Object.assign({},n.data,{costTime:s}))};responseErrorHandler=e=>{const{status:t}=e&&e.response||{};if(t){let e;switch(t){case 400:e="错误请求";break;case 401:e="未授权，请重新登录";break;case 403:e="拒绝访问";break;case 404:e="请求错误,未找到该资源";break;case 405:e="请求方法未允许";break;case 408:e="请求超时";break;case 500:e="服务器端出错";break;case 501:e="网络未实现";break;case 502:e="网络错误";break;case 503:e="服务不可用";break;case 504:e="网络超时";break;case 505:e="http版本不支持该请求";break;default:e=`连接错误${t}`}return Promise.reject({msg:e,code:t})}return e.toString()&&e.toString().startsWith("Cancel:")?Promise.reject({msg:e.message||"",code:410}):e.toString()&&e.toString().startsWith("Error: Network Error")?Promise.reject({msg:"未可知错误，大部分是由于后端不支持CORS或无效配置引起",code:404}):e&&e.message?Promise.reject({msg:e.message||"",code:410}):Promise.reject({msg:e.message||"未可知错误，大部分是由于后端不支持CORS或无效配置引起",code:t||403})}},d=l.instance;e.HttpClient=d,e.net=l}));
//# sourceMappingURL=index.js.map
