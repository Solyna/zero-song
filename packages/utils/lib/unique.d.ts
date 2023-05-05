/**
 * 数组去重
 * @param arr
 * @returns
 * unique([1,1,'true','true',true,true,15,15,false,false, undefined,undefined, null,null, NaN, NaN,'NaN', 0, 0, 'a', 'a',{},{}])
 *  =>
 * [1, "true", true, 15, false, undefined, null, NaN, "NaN", 0, "a", {}]
 */
export declare function unique(arr: any[]): any[];
export default unique;
