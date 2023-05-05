type AnyFunction = (...args: any[]) => any;
export declare function restArguments(func: AnyFunction, startIndex?: number): () => any;
export default restArguments;
