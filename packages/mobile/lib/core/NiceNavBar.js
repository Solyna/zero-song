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
import React from 'react';
import { NavBar } from 'antd-mobile';
import { observer } from 'mobx-react-lite';
import { useEnv } from '@zero-song/hooks';
import { navigate } from '@zero-song/navigate';
import { isInBrowser } from '@zero-song/utils';
import { runInAction, toJS } from 'mobx';
const { layout } = useEnv();
export default observer(({ pageStore }) => {
    const { navBar } = toJS(pageStore) || {};
    const newNavBar = !!navBar
        ? Object.assign({
            title: layout.title,
            onBack: () => navigate.goBack(),
        }, navBar)
        : { title: layout.title, onBack: () => navigate.goBack() };
    const _a = newNavBar, { title, style, backArrow } = _a, restNavBar = __rest(_a, ["title", "style", "backArrow"]);
    document.title = String(title);
    const niceBackArrow = Reflect.has(newNavBar, 'backArrow')
        ? backArrow
        : !pageStore.isTabBar;
    const isShowBar = isInBrowser() ? !!navBar : false;
    const pageBody = document.querySelector('.page-body');
    if (isShowBar) {
        pageBody && pageBody.classList.add('page-top-margin');
    }
    else {
        pageBody && pageBody.classList.remove('page-top-margin');
    }
    runInAction(() => {
        pageStore.isShowNavBar = isShowBar;
    });
    return (React.createElement(React.Fragment, null, isShowBar && (React.createElement("div", { className: 'page-top' },
        React.createElement(NavBar, Object.assign({}, restNavBar, { backArrow: niceBackArrow }), title)))));
});
