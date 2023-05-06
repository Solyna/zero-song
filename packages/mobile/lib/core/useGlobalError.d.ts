/**
 * 可忽略报错
 * 1. ErrorEvent：ResizeObserver loop limit exceeded
 *  ResizeObserver无法在单个动画帧中提供所有观察值，是良性的，无需上报
 *  多发于组件第一次注册和动态元素
 */
declare const _default: () => boolean;
export default _default;
