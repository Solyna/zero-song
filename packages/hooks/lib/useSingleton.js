import { useRef } from "react";
export function useSingleton(callback) {
    const called = useRef(false);
    if (called.current)
        return;
    callback();
    called.current = true;
}
