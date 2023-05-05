declare class configureNavigate {
    indexPage: string;
    constructor();
    private initHistory;
    goTo: (url?: string, payload?: Record<string, any> | null, options?: {
        target?: string;
    }) => void;
    goBack: (delta?: string | number) => void;
    redirect: (url?: string, payload?: Record<string, any> | null) => void;
    reload: (url?: string) => void;
}
declare const _default: configureNavigate;
export default _default;
