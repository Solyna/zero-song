import 'dayjs/locale/zh-cn';
import '../style/index.less';
export interface IAppStore {
    appStatus: 'loading' | 'success' | 'finish';
    errorInfo: Record<string, any> | null | undefined;
    onLaunch?(options: Record<string, any>): void;
    onHide?(): void;
}
declare const createApp: (appStore: any) => (() => JSX.Element) & {
    displayName: string;
};
export default createApp;
