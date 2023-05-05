declare class CookieStorage {
    getItem: (sKey: string) => string;
    setItem: (sKey: string, sValue: any, vEnd: string | number | Date, sPath?: string, sDomain?: string, bSecure?: boolean) => boolean;
    removeItem: (sKey: string, sPath?: string, sDomain?: string) => boolean;
    hasItem: (sKey: string) => boolean;
    clearAll: () => void;
    keys: () => string[];
    getDomain: () => string;
}
declare const _default: CookieStorage;
export default _default;
