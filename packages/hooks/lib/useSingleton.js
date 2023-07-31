import { useRef } from 'react';
/* 用于定义只执行一次的代码 */
export function useSingleton(callback) {
    const called = useRef(false);
    if (called.current)
        return;
    callback();
    called.current = true;
}
