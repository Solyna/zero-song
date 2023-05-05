/**
 * 追加url参数
 * @param {string} url url参数
 * @param {string|object} key 名字或者对象
 * @param {string} value 值
 * @return {string} 返回新的url
 * @example
 * appendParam('lechebang.com', 'id', 3);
 * appendParam('lechebang.com?key=value', { cityId:2,cityName: '北京'});
 */
export declare function appendParam(url: string, key: string | Record<string, any>, value?: string): string;
export default appendParam;
