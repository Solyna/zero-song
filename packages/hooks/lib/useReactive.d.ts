/**
 * @description 一种具备响应式的useState
 * @example
 *
 */
declare const useReactive: <T extends Record<string, any>>(initialState: T) => T;
export default useReactive;
