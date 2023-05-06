import { makeAutoObservable, autorun, runInAction } from 'mobx';
import rootStore from './root.store';
const INIT_LIFE_CYCLES = ['onLoad', 'onReady', 'onShow'];
// loading error tabs header
export class PageStore {
    constructor() {
        this.route = '';
        this.pageStatus = 'loading';
        this.isShowNavBar = false;
        this.isShowTabBar = false;
        this.isTabBar = false;
        this.isShowFooter = false;
        this.lifeCycleListeners = {};
        makeAutoObservable(this, {}, { autoBind: true });
        autorun(() => {
            if (this.route) {
                runInAction(() => {
                    this.isTabBar = !!rootStore.appStore.tabs.find((item) => item.key === this.route);
                });
            }
        });
    }
    setPageStatus(status) {
        this.pageStatus = status;
    }
    setNavBar(navBar) {
        this.navBar = navBar;
    }
    setPageTitle(title) {
        this.navBar = Object.assign({}, this.navBar, { title });
    }
    setErrorInfo(newErrorInfo) {
        this.errorInfo = newErrorInfo;
    }
    /**
     * 页面渲染之前
     * @param options
     */
    onLoad(options) {
        console.log('pages onLoad', options);
        this.callCurrPageLifeCycle('onLoad', [options]);
    }
    onReady(options) {
        console.log('pages onReady', options);
        this.callCurrPageLifeCycle('onReady', [options]);
    }
    onShow() {
        console.log('pages onShow');
        this.callCurrPageLifeCycle('onShow', []);
    }
    onUnload() {
        console.log('pages onUnload');
        this.callCurrPageLifeCycle('onUnload', [this.route]);
        delete this.lifeCycleListeners[this.route];
    }
    injectListener(component, lifeCycle) {
        if (!this.route) {
            throw new Error('clfe cycle current page not found');
        }
        if (!this.lifeCycleListeners[this.route]) {
            this.lifeCycleListeners[this.route] = {
                states: [],
                listeners: {},
            };
        }
        if (!this.lifeCycleListeners[this.route].listeners[component]) {
            this.lifeCycleListeners[this.route].listeners[component] = {
                lifeCycle: lifeCycle,
            };
        }
        else {
            this.lifeCycleListeners[this.route].listeners[component].lifeCycle =
                lifeCycle;
        }
        // 如果页面已经到了对应的启动状态，在设置的时候自动运行一次
        if (this.lifeCycleListeners[this.route].listeners[component].lifeCycle) {
            const currentListener = this.lifeCycleListeners[this.route];
            currentListener.states.forEach((state) => {
                if (INIT_LIFE_CYCLES.includes(state.lifeCycle)) {
                    Object.keys(currentListener.listeners[component].lifeCycle).forEach((key) => {
                        if (state.lifeCycle === key) {
                            this.callPageLifeCycleComponent(this.route, component, state.lifeCycle, state.args);
                        }
                    });
                }
            });
        }
        const dispose = () => {
            if (this.lifeCycleListeners[this.route] &&
                this.lifeCycleListeners[this.route].listeners[component]) {
                delete this.lifeCycleListeners[this.route].listeners[component];
            }
        };
        return dispose;
    }
    callCurrPageLifeCycle(lifeCycle, args) {
        if (!this.route) {
            return;
        }
        if (!this.lifeCycleListeners[this.route]) {
            this.lifeCycleListeners[this.route] = {
                states: [],
                listeners: {},
            };
        }
        this.callPageLifeCycle(this.route, lifeCycle, args);
    }
    pushCallState(page, lifeCycle, args) {
        if (this.lifeCycleListeners[page].states) {
            const findItem = this.lifeCycleListeners[page].states.find((item) => {
                if (item.lifeCycle === lifeCycle) {
                    item.args = args;
                    return true;
                }
            });
            if (!findItem) {
                this.lifeCycleListeners[page].states.push({
                    lifeCycle,
                    args,
                    time: Date.now(),
                });
            }
        }
    }
    callPageLifeCycle(page, lifeCycle, args) {
        if (!this.lifeCycleListeners[page]) {
            throw new Error(`callLifeCycle page "${page}" not found`);
        }
        this.pushCallState(page, lifeCycle, args);
        Object.keys(this.lifeCycleListeners[page].listeners).forEach((key) => {
            const liveCycleFn = this.lifeCycleListeners[page].listeners[key].lifeCycle &&
                this.lifeCycleListeners[page].listeners[key].lifeCycle[lifeCycle];
            if (liveCycleFn) {
                liveCycleFn.apply(this, args);
            }
        });
    }
    callPageLifeCycleComponent(page, component, lifeCycle, args) {
        if (!this.lifeCycleListeners[page]) {
            throw new Error(`callLifeCycle page "${page}" not found`);
        }
        this.pushCallState(page, lifeCycle, args);
        const componentListener = this.lifeCycleListeners[page].listeners[component];
        if (!componentListener) {
            throw new Error(`callLifeCycle page.component: "${page}.${component}" not found`);
        }
        const liveCycleFn = componentListener.lifeCycle[lifeCycle];
        if (liveCycleFn) {
            liveCycleFn.apply(this, args);
        }
    }
}
const pageStore = new PageStore();
export default pageStore;
