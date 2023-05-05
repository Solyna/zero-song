import getTypeof from './_getTypeof';
export function isNumber(obj) {
    return getTypeof(obj) == 'Number';
}
export default isNumber;
