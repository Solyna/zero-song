import getTypeof from './_getTypeof';
export function isBoolean(obj) {
    return getTypeof(obj) == 'Boolean';
}
export default isBoolean;
