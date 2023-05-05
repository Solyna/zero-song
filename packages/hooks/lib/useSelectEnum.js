/**
 * getEnum
 * getOptions
 * getLabel
 */
export default (data, key = "value", label = "label") => {
    const getData = () => {
        return data;
    };
    /**
     * 仅用于列表中枚举 ProTable valueEnum
     * 单条数据组装
     * getEnum() 返回格式：{ '0': {text: '停用'}, '1': {text: '启用'} }
     * getEnum({'0': 'Error', '1': 'Success'}) 返回格式：{ '0': {text: '停用', status: 'Error'}, '1': {text: '启用', status: 'Success'} }
     * @param dictType
     * @returns
     */
    const getEnum = (status) => {
        if (!data) {
            return {};
        }
        let groups = {};
        data.reduce((groups, item) => {
            if (status && status[item[key]]) {
                groups[item[key]] = {
                    text: String(item[label]),
                    status: status[item[key]],
                };
            }
            else {
                groups[item[key]] = { text: String(item[label]) };
            }
            return groups;
        }, groups);
        return groups;
    };
    /**
     * 单条数据组装，只针对 Select
     * 返回格式：[<Option key="0" >停用</Option>, <Option key="1">启用</Option>]
     * @param dictType
     * @returns
     */
    const getOptions = () => {
        if (!data) {
            return [];
        }
        return data.map((item) => {
            return Object.assign({ value: item[key], label: item[label] }, item);
        });
    };
    /**
     * 获取数据的单个节点名称
     * getLabel('1')  =>  "启用"
     * getLabel('0')  =>  "停用"
     * @param dictType
     * @returns
     */
    const getLabel = (value) => {
        if (!data) {
            return value;
        }
        let labelName;
        data.forEach((element) => {
            if (String(element[key]) == String(value)) {
                labelName = element[label];
            }
        });
        return labelName || value;
    };
    /**
     * 获取数据的单个节点名称
     * getKey('启用')  =>  1
     * getLabel('停用')  =>  0
     * @param dictType
     * @returns
     */
    const getKey = (value) => {
        if (!data) {
            return value;
        }
        let keyValue;
        data.forEach((element) => {
            if (String(element[label]) == String(value)) {
                keyValue = element[key];
            }
        });
        return keyValue || value;
    };
    return { getData, getEnum, getOptions, getLabel, getKey };
};
