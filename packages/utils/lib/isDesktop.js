import get from './get';
import root from './globalThis';
const reg = /(Win32|Win64|MacIntel|Linux x86_64)/i;
export const isDesktop = () => reg.test(get(root, 'navigator.platform'));
export default isDesktop;
