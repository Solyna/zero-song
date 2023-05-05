# `@zero-song/navigate`

> 适用于 PC 端的路由跳转封装

## Quick Start

```
lerna create navigate
```

新增 navigate/src/index.ts

package.json 中添加相关依赖

```json
{
  "devDependencies": {
    "@babel/cli": "^7.21.0",
    "@babel/core": "^7.21.4",
    "@babel/plugin-external-helpers": "^7.18.6",
    "@babel/plugin-transform-runtime": "^7.21.4",
    "@babel/polyfill": "^7.12.1",
    "@babel/preset-env": "^7.21.4",
    "@babel/runtime-corejs3": "^7.21.0",
    "@rollup/plugin-babel": "^6.0.3",
    "@rollup/plugin-commonjs": "^24.1.0",
    "@rollup/plugin-node-resolve": "^15.0.2",
    "@rollup/plugin-replace": "^5.0.2",
    "@rollup/plugin-terser": "^0.4.1",
    "@types/node": "^18.15.11",
    "core-js": "^3.29.1",
    "cross-env": "^7.0.3",
    "rollup": "^3.20.2",
    "rollup-plugin-clear": "^2.0.7",
    "rollup-plugin-sourcemaps": "^0.6.3",
    "rollup-plugin-typescript2": "^0.34.1",
    "typescript": "^5.0.3"
  },
  "dependencies": {
    "@zero-song/hooks": "^1.0.0",
    "history": "^5.3.0"
  }
}
```

修改 main， 添加其他配置信息

```json
{
  "main": "lib/index.js",
  "module": "es/index.js",
  "unpkg": "dist/index.js",
  "typings": "lib/index.d.ts",
  "files": ["dist", "lib", "es"],
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  },
  "scripts": {
    "build:dev": "cross-env NODE_ENV=development rollup -c rollup.config.js --bundleConfigAsCjs ",
    "build:prod": "cross-env NODE_ENV=production rollup -c rollup.config.js --bundleConfigAsCjs ",
    "tsc": "tsc",
    "test": "node ./__tests__/navigate.test.js"
  }
}
```

新增 tsconfig.json 文件

```json
{
  "compilerOptions": {
    "allowJs": true,
    "alwaysStrict": true,
    "checkJs": true,
    "declaration": true,
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "lib": ["esnext", "es2017", "dom"],
    "module": "esnext",
    "moduleResolution": "node",
    "outDir": "lib",
    "strict": true,
    "strictNullChecks": false,
    "skipLibCheck": true,
    "stripInternal": true,
    "target": "esnext"
  },
  "include": ["src"],
  "exclude": ["node_modules", "lib", "dist", "es"]
}
```

安装依赖 `yarn`
升级所有依赖包版本 `yarn upgrade latest`
执行：`yarn tsc` (执行命令前先新增`tsconfig.json`文件)
新增 `roll.config.js` 打包配置文件
执行打包命令：`yarn build:prod`

回到 zero-song 目录下进行发布

1. 先提交代码

```
  git add ./
  git commit -m 'init utils'
  git push
```

2. 登录 npm: `npm login`  
   输入登录账号、密码、邮箱，输入邮箱收到的短码，登录成功。

3. 登录成功后执行发布命令 `lerna publish`，选择模式，输入'Yes'，回车后等待发布成功。

## Usage

```
import { history, navigate } from '@zero-song/navigate'
```
