export function isPromise(obj) {
    return (typeof obj === 'object' && obj && 'function' == typeof obj.then);
}
export default isPromise;
