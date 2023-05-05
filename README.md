# zero-song

### 初始化 `lerna` 项目
1. `npm install --global lerna`
2. `mkdir zero-song & cd zero-song`
3. `lerna init -i`
4. 安装learn到仓库：`npm install`  

lerna 管理模式：
1. 固定模式：`lerna init`
2. 独立模式：使用 `lerna init -i` 命令初始化项目，`lerna.json` 中 `version` 字段指定为`independent`。
> 独立模式说明：  
> 如果 `packages` 下，其中一个包发生改动，另一个包依赖了这个包，即使它没有发生改动，也会被进行发布更新。

在本项目我们采用独立模式，配置文件如下：
```json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "useWorkspaces": true,
  "version": "independent",
  "npmClient": "yarn",
  "command": {
    "publish": {
      "ignoreChanges": ["*.md"],
      "message": "chore(release): publish"
    },
    "bootstrap": {
      "ignore": "component-*"
    }
  }
}
```

### 安装 `Prettier`

1. 安装

```
npm install --save-dev --save-exact prettier
yarn add --dev --exact prettier
```
2. 创建一个空的配置文件，让编辑器和其他工具知道您正在使用 Prettier：
```
echo {}> .prettierrc.json
```
3. 创建一个.prettierignore文件，让 Prettier CLI 和编辑器知道哪些文件不要格式化。这是一个例子：
  ```
  dist
  es
  lib
  __tests__
  doc
  node_modules
  public
  script
  ```
4. 现在，使用 `Prettier` 格式化所有文件：
```
yarn prettier --write .
```

### `Git` 钩子
1. 安装 `husky` 和 `lint-staged`
```
yarn add --dev husky lint-staged
npx husky install
npm pkg set scripts.prepare="husky install"
npx husky add .husky/pre-commit "npx lint-staged"
```
2. 在 `package.json` 添加
```
// 官网例子
{
  "lint-staged": {
    "**/*": "prettier --write --ignore-unknown"
  }
}
// 此项目中改成packages下
{
  "lint-staged": {
    "packages/**/*.{ts,tsx,less,json,css,md}": "prettier --write --ignore-unknown"
  }
}
```
3. 编辑 `package.json > prepare` 脚本并运行一次：

```
npm pkg set scripts.prepare = " husky install "
npm run prepare
```

4. 添加一个钩子：

```
npx husky add .husky/pre-commit “ npm test ”
git add .husky/pre-commit
```

5. 提交

```
git commit -m "Keep calm and commit"
# `npm test` will run
```
如果 `npm test` 命令失败，您的提交将自动中止。  


### 创建 `utils` 工具包
1. 创建
```
  lerna create utils
```
> 注意 package name 为 npm 上的包名： `@zero-song/utils`。

2. 配置 `package.json`：
```json
  "main": "src/index.ts"
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
  }
  "repository": {
    "type": "git",
    "url": "https://gitee.com/song00/zero-song.git"
  }
```
3. 先提交代码
```
  git add ./
  git commit -m 'init utils'
  git push
```
4. 登录 npm: `npm login`  
输入登录账号、密码、邮箱，输入邮箱收到的短码，登录成功。

5. 登录成功后执行发布命令 `lerna publish`，选择模式，输入'Yes'，回车后等待发布成功。


