/**
 * 节流: 一定时间内，只触发一次回调
 * 场景: 监听页面滚动
 * @link [throttle](https://underscorejs.org/#throttle)
 * @example
 * let fn = util.debounce(function() {}, 300)
 */
type AnyFunction = (...args: any[]) => any;
export declare function throttle(func: AnyFunction, wait: number, options?: Record<string, any>): {
    (): any;
    cancel(): void;
};
export default throttle;
