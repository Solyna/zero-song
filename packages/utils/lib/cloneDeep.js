import isObject from './isObject';
import isPlainObject from './isPlainObject';
function ext(target, source) {
    if (isObject(source) && isObject(target)) {
        for (let key in source) {
            let item = source[key];
            if (isObject(item)) {
                if (isPlainObject(item) && !isPlainObject(target[key])) {
                    target[key] = {};
                }
                else if (Array.isArray(item) && !Array.isArray(target[key])) {
                    target[key] = [];
                }
                ext(target[key], item);
            }
            else {
                target[key] = item;
            }
        }
    }
    return target;
}
/**
 * 深拷贝
 * @param obj
 * @returns
 */
export function cloneDeep(obj) {
    if (!isObject(obj))
        return obj;
    let result;
    if (Array.isArray(obj)) {
        result = [];
        obj.forEach((item) => {
            result.push(cloneDeep(item));
        });
        return result;
    }
    return ext({}, obj);
}
export default cloneDeep;
