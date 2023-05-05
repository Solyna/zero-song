import type { AxiosResponse, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
type Handler<V> = {
    fulfilled: (value: V) => V | Promise<V>;
    rejected?: (error: any) => any;
};
declare class InterceptorManager<V> {
    handlers: Handler<V>[];
    /**
     * 增加请求或返回的拦截器，多个拦截器按顺序执行
     * @param fulfilled 拦截器处理的函数
     * @param rejected Promise中失败的回调，一般只用在reponse拦截器中
     */
    use(fulfilled: (value: V) => V, rejected?: any): number;
}
declare class Net {
    /**
     * 请求的拦截器配置
     */
    interceptors: {
        request: InterceptorManager<any>;
        response: InterceptorManager<any>;
    };
    instance: AxiosInstance;
    constructor();
    setRequest: (config: {
        headers?: {
            [key: string]: any;
        };
        baseURL?: string;
        timeout?: number;
    }) => void;
    /**
     * 请求拦截器，如果相同请求已经在进行，则取消后续相同请求
     * 且只对传入参数进行计算，公共参数以及 __requestId 不能进入计算逻辑
     * @param {*} config
     * @returns
     */
    requestHandler: (config: InternalAxiosRequestConfig) => Promise<InternalAxiosRequestConfig<any>>;
    requestErrorHandler: (error: any) => Promise<never>;
    /**
     * 请求返回拦截器
     * @param {*} resp
     * @returns
     */
    responseHandler: (resp: AxiosResponse) => Promise<any>;
    responseErrorHandler: (resp: any) => Promise<never>;
}
declare const net: Net;
declare const HttpClient: AxiosInstance;
export { net, HttpClient };
