export type KType = string | any[] | number;
export declare function get<T = any>(obj: any, keys?: KType, defaultValue?: any): T;
export default get;
