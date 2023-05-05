class applicationEnv {
    constructor() {
        this.setEnv = (data) => {
            Object.assign(this, data);
        };
        Object.assign(this, process.env.productConfig);
    }
}
const env = new applicationEnv();
export const useEnv = () => {
    return env;
};
