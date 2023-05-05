import getTypeof from './_getTypeof';
export function isFunction(obj) {
    return getTypeof(obj) == 'Function';
}
export default isFunction;
