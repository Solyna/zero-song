import isString from './isString';
import isFunction from './isFunction';
import get from './get';
export const run = (obj, keys = [], ...args) => {
    keys = isString(keys) ? keys.split('.') : keys;
    const func = get(obj, keys);
    const context = get(obj, keys.slice(0, -1));
    return isFunction(func) ? func.call(context, ...args) : func;
};
export default run;
