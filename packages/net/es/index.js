import e from"axios";import{cloneDeep as t}from"@zero-song/utils";const s={},r=e.CancelToken;let a={};const n=(e,t=!1)=>{s[e]&&t?s[e]("取消重复请求"):delete s[e]},o=(e,s=!1)=>{const r=e.url||"",a=e.method||"";let n={};return["post","put","patch"].includes(a)&&e.data&&(n=s?t(e.data):JSON.parse(t(e.data))),"get"===a&&e.params&&(n=t(e.params)),encodeURIComponent(r+a+JSON.stringify(n))};class i{handlers=[];use(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1}}const c=new class{interceptors;instance;constructor(){this.instance=e.create({timeout:15e3}),this.instance.interceptors.request.use(this.requestHandler,this.requestErrorHandler),this.instance.interceptors.response.use(this.responseHandler,this.responseErrorHandler),this.interceptors={request:new i,response:new i}}setRequest=e=>{const{headers:t,baseURL:s,timeout:r}=e;s&&(this.instance.defaults.baseURL=s),r&&(this.instance.defaults.timeout=r),t&&Object.assign(this.instance.defaults.headers.common,t)};requestHandler=async e=>{if(e.method&&"options"===e.method)return e;let t=o(e,!0);n(t,!0),a[t]=Date.now();let i=Promise.resolve(e);for(let t of this.interceptors.request.handlers)e=await i.then(t.fulfilled,t.fulfilled);return e.cancelToken=new r((e=>{s[t]=e})),e};requestErrorHandler=e=>Promise.reject(e);responseHandler=async e=>{if(e.config.method&&"options"===e.config.method)return e;let t=o(e.config);n(t);let s,r=Promise.resolve(e),i=e,c=null;for(let e of this.interceptors.response.handlers)try{i=await r.then(e.fulfilled,e.rejected)}catch(e){c=e}return a[t]&&(s=Date.now()-a[t],delete a[t],Object.keys(a).length>100&&(a={})),c?Promise.reject(Object.assign({},c.data,{costTime:s})):Promise.resolve(Object.assign({},i.data,{costTime:s}))};responseErrorHandler=e=>{const{status:t}=e&&e.response||{};if(t){let e;switch(t){case 400:e="错误请求";break;case 401:e="未授权，请重新登录";break;case 403:e="拒绝访问";break;case 404:e="请求错误,未找到该资源";break;case 405:e="请求方法未允许";break;case 408:e="请求超时";break;case 500:e="服务器端出错";break;case 501:e="网络未实现";break;case 502:e="网络错误";break;case 503:e="服务不可用";break;case 504:e="网络超时";break;case 505:e="http版本不支持该请求";break;default:e=`连接错误${t}`}return Promise.reject({msg:e,code:t})}return e.toString()&&e.toString().startsWith("Cancel:")?Promise.reject({msg:e.message||"",code:410}):e.toString()&&e.toString().startsWith("Error: Network Error")?Promise.reject({msg:"未可知错误，大部分是由于后端不支持CORS或无效配置引起",code:404}):e&&e.message?Promise.reject({msg:e.message||"",code:410}):Promise.reject({msg:e.message||"未可知错误，大部分是由于后端不支持CORS或无效配置引起",code:t||403})}},l=c.instance;export{l as HttpClient,c as net};
//# sourceMappingURL=index.js.map
