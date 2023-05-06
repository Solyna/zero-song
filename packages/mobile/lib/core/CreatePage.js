var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useCallback, useEffect, useLayoutEffect, useState, } from 'react';
import { SpinLoading, Mask, Footer, ErrorBlock, Skeleton } from 'antd-mobile';
import { useLocation } from 'react-router-dom';
import { paramToObject } from '@zero-song/utils';
import { observer } from 'mobx-react-lite';
import { useEnv } from '@zero-song/hooks';
import { navigate } from '@zero-song/navigate';
import { pageStore, rootStore } from '../store';
import { runInAction } from 'mobx';
const { appName, layout } = useEnv();
let clickTimes = 0;
const createPage = (pageConfig, WrappedComponent) => {
    return observer(() => {
        const { pathname, state, search } = useLocation();
        const route = appName
            ? String(pathname).replace(`/${appName}`, '')
            : pathname;
        const params = paramToObject(search, state);
        const [isOnload, setIsOnload] = useState(false);
        const [minHeight, setMinHeight] = useState(0);
        useLayoutEffect(() => {
            runInAction(() => {
                pageStore.route = route;
                pageStore.params = params;
                if (Reflect.has(pageConfig, 'navBar')) {
                    pageStore.navBar = pageConfig.navBar;
                }
                if (Reflect.has(pageConfig, 'isShowFooter') || pageStore.isShowFooter) {
                    pageStore.isShowFooter = !!pageConfig.isShowFooter;
                }
                pageStore.pageStatus = 'loading';
            });
            clickTimes = 0;
            const isOnload = rootStore.appStore.pageBeforeOnLoad &&
                rootStore.appStore.pageBeforeOnLoad({
                    pageStore,
                    params,
                    route,
                    pageConfig,
                });
            setIsOnload(!!isOnload);
            /**
             * 前置执行 onLoad 方法；
             */
            pageStore.onLoad && pageStore.onLoad({ route, params });
        }, [route, JSON.stringify(params)]);
        useEffect(() => {
            let otherHeight = 0;
            if (pageStore.isShowNavBar) {
                otherHeight += 46;
            }
            if (pageStore.isShowTabBar) {
                otherHeight += 50;
            }
            setMinHeight(otherHeight);
        }, [pageStore.isShowNavBar, pageStore.isShowTabBar]);
        useEffect(() => {
            pageStore.onReady && pageStore.onReady({ route, params });
            return () => {
                pageStore.onUnload && pageStore.onUnload();
            };
        }, []);
        const renderNoSucess = useCallback(() => {
            switch (pageStore.pageStatus) {
                case 'loading':
                    return (React.createElement(React.Fragment, null,
                        React.createElement(Mask, { visible: true, opacity: 'thin', color: 'white' }),
                        React.createElement(SpinLoading, { color: 'currentColor', style: {
                                '--size': '48px',
                                zIndex: '1100',
                                position: 'fixed',
                                transform: 'translate(-50%, -50%)',
                                top: '40%',
                                left: '50%',
                            } })));
                case 'skeleton':
                    return (React.createElement(React.Fragment, null,
                        React.createElement(Skeleton.Title, { animated: true }),
                        React.createElement(Skeleton.Paragraph, { lineCount: 5, animated: true })));
                default:
                    const _a = pageStore.errorInfo || {}, { children } = _a, restErrorInfo = __rest(_a, ["children"]);
                    return (React.createElement(ErrorBlock, Object.assign({ fullPage: true }, restErrorInfo), children));
            }
        }, [pageStore.pageStatus]);
        return (React.createElement(React.Fragment, null,
            pageStore.pageStatus != 'success' && renderNoSucess(),
            React.createElement("div", { className: 'page-body', style: {
                    minHeight: `calc(100vh - env(safe-area-inset-bottom) - ${minHeight}px)`,
                    visibility: pageStore.pageStatus == 'success' ? 'inherit' : 'hidden',
                } },
                isOnload && (React.createElement("div", { style: { flex: 'auto', display: 'flex' } },
                    React.createElement(WrappedComponent, { route: route, params: params }))),
                pageStore.isShowFooter && (React.createElement("div", { style: { flex: '0 0 30px' } },
                    React.createElement(Footer, { style: { backgroundColor: '#eee' }, content: React.createElement("div", { onClick: () => {
                                if (clickTimes >= 6) {
                                    navigate.goTo('/tools');
                                }
                                else {
                                    clickTimes++;
                                }
                            } }, layout.footerText) }))))));
    });
};
export default createPage;
