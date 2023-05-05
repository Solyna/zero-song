import isString from './isString';
import isUndefined from './isUndefined';
import isNumber from './isNumber';
export function get(obj, keys = [], defaultValue) {
    try {
        if (isNumber(keys)) {
            keys = String(keys);
        }
        let result = (isString(keys) ? keys.split('.') : keys).reduce((res, key) => res[key], obj);
        return isUndefined(result) ? defaultValue : result;
    }
    catch (e) {
        return defaultValue;
    }
}
export default get;
