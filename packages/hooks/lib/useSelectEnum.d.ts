export interface IUseSelectEnum {
    getData: Function;
    getEnum: Function;
    getOptions: Function;
    getLabel: Function;
    getKey: Function;
}
/**
 * getEnum
 * getOptions
 * getLabel
 */
declare const _default: (data: any[], key?: string, label?: string) => IUseSelectEnum;
export default _default;
