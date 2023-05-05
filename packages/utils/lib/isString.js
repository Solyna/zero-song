import getTypeof from './_getTypeof';
export function isString(obj) {
    return getTypeof(obj) == 'String';
}
export default isString;
