declare class applicationEnv {
    [key: string]: any;
    constructor();
    setEnv: (data: any) => void;
}
export declare const useEnv: () => applicationEnv;
export {};
