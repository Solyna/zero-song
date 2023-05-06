import { ReactElement, ReactNode } from 'react';
export interface INavBarInfo {
    back?: React.ReactNode | null;
    backArrow?: boolean | React.ReactNode;
    title?: string;
    left?: React.ReactNode;
    onBack?: () => void;
    right?: React.ReactNode;
    style?: CSSConditionRule;
}
export type INavBar = INavBarInfo | boolean | undefined | null;
type IErrorInfo = {
    description?: ReactNode;
    title?: ReactNode;
    image?: string | ReactElement;
    status?: 'default' | 'disconnected' | 'empty' | 'busy';
    children?: ReactNode;
};
export interface PageLifeCycle {
    onLoad(options: Record<string, any>): void;
    onReady(): void;
    onShow(): void;
    onUnload(): void;
}
export interface PageLiveCycleListener {
    states: Array<{
        lifeCycle: string;
        args: any[];
        time: number;
    }>;
    listeners: {
        [component: string]: {
            lifeCycle: Partial<PageLifeCycle>;
        };
    };
}
export declare class PageStore implements PageLifeCycle {
    route: string;
    params: any;
    pageStatus: 'loading' | 'skeleton' | 'error' | 'success';
    navBar: INavBarInfo | undefined | boolean | null;
    isShowNavBar: boolean;
    isShowTabBar: boolean;
    isTabBar: boolean;
    isShowFooter: boolean;
    errorInfo: IErrorInfo | undefined | null;
    private lifeCycleListeners;
    constructor();
    setPageStatus(status: 'loading' | 'skeleton' | 'error' | 'success'): void;
    setNavBar(navBar: INavBarInfo | undefined | boolean | null): void;
    setPageTitle(title: string): void;
    setErrorInfo(newErrorInfo: IErrorInfo | undefined | null): void;
    /**
     * 页面渲染之前
     * @param options
     */
    onLoad(options: Record<string, any>): void;
    onReady(options?: Record<string, any>): void;
    onShow(): void;
    onUnload(): void;
    injectListener(component: string, lifeCycle: Partial<PageLifeCycle>): () => void;
    private callCurrPageLifeCycle;
    private pushCallState;
    private callPageLifeCycle;
    private callPageLifeCycleComponent;
}
declare const pageStore: PageStore;
export default pageStore;
