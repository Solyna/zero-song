declare class systemInfo {
    platform: any;
    winWidth: number;
    winHeight: number;
    onLunchPlatform: any;
    onLunchPackage: any;
    onLunchScreen: any;
    constructor();
}
export declare const useSystem: () => systemInfo;
export {};
