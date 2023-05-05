import getTypeof from './_getTypeof';
export function isDate(obj) {
    return getTypeof(obj) == 'Date';
}
export default isDate;
