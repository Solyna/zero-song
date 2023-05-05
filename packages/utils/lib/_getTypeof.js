/**
 * 获取类型标签
 */
export default function getTypeof(obj) {
    return Reflect.apply(Object.prototype.toString, obj, []).match(/\s+(\w+)\]$/)?.[1];
}
