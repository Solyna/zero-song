import get from './get';
import root from './globalThis';
const reg = /(Android)/i;
export const isAndroid = () => reg.test(get(root, 'navigator.userAgent'));
export default isAndroid;
