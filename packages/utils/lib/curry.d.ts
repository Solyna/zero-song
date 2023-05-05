/**
 * 函数柯里化
 * f(a, b, c)
 * const newF = curry(f);
 * 调用方式：newF(a)(b)(c) || newF(a, b)(c) || newF(a)(b, c)
 * @param fn
 * @returns
 */
export declare function curry(fn: Function): (...args: any[]) => any;
export default curry;
