type AnyFunction = (...args: any[]) => any;
export declare function debounce(func: AnyFunction, wait: number, immediate?: boolean): any;
export default debounce;
