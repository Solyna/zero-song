/**
 * 处理查询参数对象, 如果需要拼接在url参数里面，需要自行调用encodeURIComponent(util.param({k: 'v'}))
 * @param query
 * @param isEncode
 * @returns
 * objectToParam({key: value, k: v}) => key=value&k=v
 */
export declare function objectToParam<T>(query: T, isEncode?: boolean): string;
export default objectToParam;
