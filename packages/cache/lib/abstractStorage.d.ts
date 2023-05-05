export declare class AbstractStorage {
    hasStorage: any;
    type: string;
    proxy: any;
    constructor(type: string);
    checkStorage(): void;
    get(key: string): any;
    set(key: string, value: any, expires?: string): void;
    remove(key: string): void;
    clear(): void;
    clearAll(): void;
    /**
     * @description
     * 删除ajax缓存
     * @example
     * local.removeHttp('mycar/getMyDefaultCar')
     */
    removeHttp(url?: string): void;
    getKey(key: string): string;
    getForObject(): any;
    isQuotaExceeded(e?: any): boolean;
    setExpires(time: string): number;
}
