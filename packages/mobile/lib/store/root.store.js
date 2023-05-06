import { makeAutoObservable } from 'mobx';
class RootStore {
    constructor() {
        makeAutoObservable(this, {}, { autoBind: true });
    }
}
const rootStore = new RootStore();
export default rootStore;
