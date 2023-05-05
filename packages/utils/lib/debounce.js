import restArguments from './restArguments';
import now from './now';
export function debounce(func, wait, immediate) {
    let timeout, previous, args, result, context;
    const later = function () {
        const passed = now() - previous;
        if (wait > passed) {
            timeout = setTimeout(later, wait - passed);
        }
        else {
            timeout = null;
            if (!immediate)
                result = func.apply(context, args);
            // This check is needed because `func` can recursively invoke `debounced`.
            if (!timeout)
                args = context = null;
        }
    };
    const debounced = restArguments(function (_args) {
        // @ts-ignore
        context = this;
        args = _args;
        previous = now();
        if (!timeout) {
            timeout = setTimeout(later, wait);
            if (immediate)
                result = func.apply(context, args);
        }
        return result;
    });
    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = args = context = null;
    };
    return debounced;
}
export default debounce;
