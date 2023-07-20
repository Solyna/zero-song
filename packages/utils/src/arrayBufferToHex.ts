/**
 * 将“ArrayBuffer”转换为十六进制字符字符串。
 */
export function arrayBufferToHex(arrayBuffer: ArrayBuffer): string {
  if (
    typeof arrayBuffer !== 'object' ||
    arrayBuffer === null ||
    typeof arrayBuffer.byteLength !== 'number'
  ) {
    throw new TypeError('Expected input to be an ArrayBuffer');
  }

  var view = new Uint8Array(arrayBuffer);
  var result = '';
  var value;

  for (var i = 0; i < view.length; i++) {
    value = view[i].toString(16);
    result += value.length === 1 ? '0' + value : value;
  }

  return result;
}
