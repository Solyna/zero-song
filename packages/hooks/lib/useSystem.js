import platform from "platform";
class systemInfo {
    constructor() {
        const processEnv = process.env;
        const { navigator: navigatorInfo, screen: screenInfo, innerHeight, innerWidth, outerHeight, outerWidth, screenTop, screenLeft, } = window;
        const platformInfo = platform.parse(navigatorInfo.userAgent);
        this.platform = platformInfo.name;
        this.winWidth = innerWidth || document.body.clientWidth;
        this.winHeight = innerHeight || screenInfo.availHeight;
        /**
         * 根据运行环境解析出来的 platform 信息
         */
        this.onLunchPlatform = platformInfo;
        this.onLunchPackage = {
            projectName: processEnv.npm_package_name || "",
            babelEnv: processEnv.BABEL_ENV,
            nodeEnv: processEnv.NODE_ENV,
            lang: processEnv.LANG,
            launchInstanceID: processEnv.LaunchInstanceID,
            version: processEnv.npm_package_version,
            lifecycleEvent: processEnv.npm_lifecycle_event,
            lifeycleScript: processEnv.npm_lifecycle_script,
            projectMain: processEnv.npm_package_main,
            projectType: processEnv.npm_package_type,
            publicUrlOrPath: processEnv.publicUrlOrPath,
        };
        /**
         * 计算项目启动时所有宽高以及屏幕信息
         */
        this.onLunchScreen = {
            innerHeight,
            innerWidth,
            outerHeight,
            outerWidth,
            screenTop,
            screenLeft,
            height: screenInfo.height,
            width: screenInfo.width,
            availHeight: screenInfo.availHeight,
            availWidth: screenInfo.availWidth,
            colorDepth: screenInfo.colorDepth,
            pixelDepth: screenInfo.pixelDepth, // 屏幕设置的像素/英寸
        };
    }
}
const system = new systemInfo();
export const useSystem = () => {
    return system;
};
