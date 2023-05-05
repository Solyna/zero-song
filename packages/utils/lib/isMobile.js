import isDesktop from './isDesktop';
import isAndroid from './isAndroid';
import isIOS from './isIOS';
export const isMobile = () => !isDesktop() && (isAndroid() || isIOS());
export default isMobile;
