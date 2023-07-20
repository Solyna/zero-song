declare var util: util;
export = util;
interface util {
  /** Decodes string and returns Uint8Array of bytes. */
  decodeUTF8(s: string): Uint8Array;
  /** Encodes `Uint8Array` or `Array` of bytes into string. */
  encodeUTF8(arr: Uint8Array): string;
  /** Decodes Base-64 encoded string and returns `Uint8Array` of bytes. */
  encodeBase64(arr: Uint8Array): string;
  /** Encodes `Uint8Array` or `Array` of bytes into string using Base-64 encoding. */
  decodeBase64(s: string): Uint8Array;
}
