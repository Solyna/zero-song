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
import React, { useMemo, useLayoutEffect } from 'react';
import { SafeArea, Mask, SpinLoading, ErrorBlock, ConfigProvider, } from 'antd-mobile';
import { observer } from 'mobx-react-lite';
import { runInAction, toJS } from 'mobx';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from '@zero-song/navigate';
import { useEnv } from '@zero-song/hooks';
import { paramToObject } from '@zero-song/utils';
import RoutesComponent from './RoutesComponent';
import useGlobalError from './useGlobalError';
import zhCN from 'antd-mobile/es/locales/zh-CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import '../style/index.less';
dayjs.locale('zh-cn');
import { pageStore, rootStore } from '../store';
import NiceNavBar from './NiceNavBar';
import NiceTabBar from './NiceTabBar';
const { appName } = useEnv();
const { pathname, state, search } = history.location;
const route = appName ? String(pathname).replace(`/${appName}`, '') : pathname;
const params = paramToObject(search, state);
const createApp = (appStore) => {
    runInAction(() => {
        rootStore.appStore = appStore;
        rootStore.pageStore = pageStore;
    });
    return observer(() => {
        const tabs = toJS(appStore.tabs);
        useLayoutEffect(() => {
            useGlobalError();
            dayjs.locale('zh-cn');
            appStore.onLaunch({ route, params });
            return () => {
                appStore.onHide && appStore.onHide();
            };
        }, []);
        const renderContent = useMemo(() => () => {
            switch (appStore.appStatus) {
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
                case 'error':
                    const { errorInfo = {} } = appStore;
                    const _a = errorInfo || {}, { renderChildren } = _a, restErrorInfo = __rest(_a, ["renderChildren"]);
                    return (React.createElement(ErrorBlock, Object.assign({ fullPage: true }, restErrorInfo), renderChildren && renderChildren()));
                default:
                    return (React.createElement(HistoryRouter, { history: history },
                        React.createElement(RoutesComponent, null)));
            }
        }, [appStore.appStatus, history]);
        return (React.createElement(ConfigProvider, { locale: zhCN },
            React.createElement("div", { className: 'page-container' },
                useMemo(() => (React.createElement(NiceNavBar, { pageStore: pageStore })), []),
                renderContent(),
                useMemo(() => (React.createElement(NiceTabBar, { tabs: tabs, pageStore: pageStore })), [])),
            React.createElement("div", { style: { background: '#f5f5f5' } },
                React.createElement(SafeArea, { position: 'bottom' }))));
    });
};
export default createApp;
