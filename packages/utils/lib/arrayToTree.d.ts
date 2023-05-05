/**
 * 数组变成树形结构方法
 *
 * @param items
 * @param key 当前 id 名称
 * @param parentKey 父级id名称
 * @param childrenKey 子集存放数组名称
 * @returns
 */
export declare function arrayToTree(items: Array<any>, key: string, parentKey: string, childrenKey?: string, rootList?: any[]): any;
export default arrayToTree;
