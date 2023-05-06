import React from 'react';
import { ErrorBlock, SpinLoading } from 'antd-mobile';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEnv } from '@zero-song/hooks';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
const { appName, routes, route } = useEnv();
const getPageLazyComponent = (component) => {
    const Element = React.lazy(() => import(`@/src/pages/${component}`));
    if (!Element) {
        return;
    }
    return (React.createElement(React.Suspense, { fallback: React.createElement(SpinLoading, { color: 'currentColor', style: {
                '--size': '48px',
                zIndex: '1100',
                position: 'fixed',
                transform: 'translate(-50%, -50%)',
                top: '40%',
                left: '50%',
            } }) },
        React.createElement(Element, null)));
};
/**
 * 构建Route树挂载所有路由
 * @param data
 * @param isLayout
 * @param prefix
 * @returns
 */
const getRouters = (data, prefix = '') => {
    const res = [];
    for (let i = 0; i < data.length; i++) {
        const { children, path, component } = data[i];
        // 获取树形结构的path路径，用于获取component
        const newprefix = prefix ? `${prefix}/${path}` : path;
        if (children && Array.isArray(children) && children.length > 0) {
            const childrenRoutes = getRouters(children, newprefix);
            if (childrenRoutes.length > 0) {
                const Element = component && getPageLazyComponent(component.trim());
                if (Element) {
                    res.push(React.createElement(Route, { key: `${path}/*`, path: `${path}/*` },
                        React.createElement(Route, { path: '*', element: Element }),
                        childrenRoutes));
                }
                else {
                    res.push(React.createElement(Route, { path: path, key: `${path}${i}` }, childrenRoutes));
                }
            }
        }
        else {
            const newElement = component ? component : newprefix;
            const Element = getPageLazyComponent(newElement && newElement.trim());
            if (Element) {
                res.push(React.createElement(Route, { path: path, key: `${path}${i}`, element: Element }));
            }
        }
    }
    return res;
};
const treeRoutes = getRouters(routes);
const rootPath = appName ? `/${appName}` : '/';
const { isAnimated } = route;
{
    /* <Route
          render={({ location }) => {
            return (
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames={{
                    enter: 'animated',
                    enterActive: 'fadeInDown',
                    exit: 'animated',
                    exitActive: 'fadeOutDown'
                  }}
                  timeout={1000}
                  mountOnEnter
                  unmountOnExit
                >
                  <div>
                    <Switch location={location}>
                      <Route
                        path="/one"
                        render={(props) => (
                          <KeepAlive>
                            <Test {...props} />
                          </KeepAlive>
                        )}
                      />
                      <Route path="/two" render={() => 'This is two'} />
                    </Switch>
                  </div>
                </CSSTransition>
              </TransitionGroup>
            )
          }}
        /> */
}
export default () => {
    const location = useLocation();
    const renderContent = (React.createElement(Route, { path: rootPath },
        treeRoutes,
        React.createElement(Route, { path: '*', key: '*', element: React.createElement(React.Suspense, { fallback: React.createElement(SpinLoading, { color: 'currentColor', style: {
                        '--size': '48px',
                        zIndex: '1100',
                        position: 'fixed',
                        transform: 'translate(-50%, -50%)',
                        top: '40%',
                        left: '50%',
                    } }) },
                React.createElement(ErrorBlock, { status: 'empty', title: '\u62B1\u6B49\uFF0C\u4F60\u8BBF\u95EE\u7684\u9875\u9762\u4E0D\u5B58\u5728' })) })));
    return (React.createElement(React.Fragment, null,
        isAnimated && (React.createElement(TransitionGroup, { component: null },
            React.createElement(CSSTransition, { key: location.key, classNames: 'fade', timeout: 300 },
                React.createElement(Routes, { location: location }, renderContent)))),
        !isAnimated && React.createElement(Routes, null, renderContent)));
};
