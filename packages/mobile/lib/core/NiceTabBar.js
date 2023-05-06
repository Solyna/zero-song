import React from 'react';
import { TabBar } from 'antd-mobile';
import { observer } from 'mobx-react-lite';
import { navigate } from '@zero-song/navigate';
import { isInBrowser } from '@zero-song/utils';
import { runInAction } from 'mobx';
export default observer(({ pageStore, tabs }) => {
    const isShowBar = isInBrowser() ? pageStore.isTabBar : false;
    const pageBody = document.querySelector('.page-body');
    if (isShowBar) {
        pageBody && pageBody.classList.add('page-bottom-margin');
    }
    else {
        pageBody && pageBody.classList.remove('page-bottom-margin');
    }
    runInAction(() => {
        pageStore.isShowTabBar = isShowBar;
    });
    return (React.createElement(React.Fragment, null, isShowBar && (React.createElement("div", { className: 'page-bottom' },
        React.createElement(TabBar, { activeKey: pageStore.route, onChange: (key) => navigate.goTo(key) }, tabs.map((item) => (React.createElement(TabBar.Item, { key: item.key, icon: item.icon, title: item.title, badge: item.badge }))))))));
});
