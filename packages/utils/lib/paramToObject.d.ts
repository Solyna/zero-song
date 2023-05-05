/**
 * 获取url参数
 * @param {string} query url参数
 * @param {object} obj 基础对象，可以不传
 * @return {object} url参数对象
 * @example
 * paramToObject('lechebang.com?key=value&city=3', {a: 1}) => {a: 1, key: value, city: 3}
 * paramToObject('lechebang.com?key=value&city=3') => {key: value, city: 3}
 * paramToObject(location.search) => {}
 * // 如果参数里面有url或者中文，请先自行先encodeURIComponent字符串
 */
export declare function paramToObject(query: string, obj?: Record<string, any> | unknown): any;
export default paramToObject;
