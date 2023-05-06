import { INavBar } from '../store';
interface IConfig {
    isNeedLogin?: boolean;
}
export interface IPageConfig extends IConfig {
    pageId?: string;
    permissions?: string[];
    navBar?: INavBar;
    isShowFooter?: boolean;
}
export interface ICProps {
    route: string;
    params?: any;
    [key: string]: any;
}
declare const createPage: (pageConfig: IPageConfig, WrappedComponent: any) => (() => JSX.Element) & {
    displayName: string;
};
export default createPage;
