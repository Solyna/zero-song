export function decodeUTF8(s) {
    if (typeof s !== 'string')
        throw new TypeError('expected string');
    let i, d = encodeURIComponent(s), b = new Uint8Array(d.length);
    for (i = 0; i < d.length; i++)
        b[i] = d.charCodeAt(i);
    return b;
}
export function encodeUTF8(arr) {
    let i, s = [];
    for (i = 0; i < arr.length; i++)
        s.push(String.fromCharCode(arr[i]));
    return decodeURIComponent(escape(s.join('')));
}
