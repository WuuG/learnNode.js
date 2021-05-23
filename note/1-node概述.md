- [Node.js](#nodejs)
  - [特性](#特性)
- [node 相关工具](#node-相关工具)
  - [NVM:Node Version Manager](#nvmnode-version-manager)
  - [NPM:Node Package Manager](#npmnode-package-manager)
    - [node package versions](#node-package-versions)
      - [版本配置的符号解释](#版本配置的符号解释)
    - [modules类型](#modules类型)
    - [npm切换源](#npm切换源)
    - [发布包](#发布包)
    - [package.json信息的描述](#packagejson信息的描述)
    - [npm脚本](#npm脚本)
      - [获取npm package.json文件内容](#获取npm-packagejson文件内容)
    - [定义环境变量](#定义环境变量)
    - [npm可以安装github的包，作为依赖](#npm可以安装github的包作为依赖)
    - [cross-env](#cross-env)
  - [NRM：Npm Registry Manager](#nrmnpm-registry-manager)
  - [NPX:npm package extension](#npxnpm-package-extension)
  - [Yarn](#yarn)
- [node.js自定义模块](#nodejs自定义模块)
  - [commonjs模块化](#commonjs模块化)
# Node.js
基于chrome's V8的JavaScript运行时环境
## 特性
没有浏览器安全级别的限制，提供系统级别的api,如：
+ 文件的读写
+ 进程的管理
+ 网络通信
# node 相关工具
## NVM:Node Version Manager
> LTS:long time support
``` javascript
$ nvm
$ nvm install latest 安装最新版本node.js
$ nvm use 版本号 使用某一具体版本，例如 ：nvm use 14.3.0
$ nvm list 列出当前已安装的所有版本
$ nvm ls 列出当前已安装的所有版本
$ nvm uninstall 版本号 卸载某一具体版本，例如：nvm use 14.3.0
$ nvm ls-remote Mac版本中,列出全部可以安装的node版本
$ nvm ls available windows版本,列出全部可以安装的node版本
$ nvm current 显示当前的版本
$ nvm alias 给不同的版本号添加别名
$ nvm unalias 删除已定义的别名
$ nvm reinstall-packages 在当前版本node环境下，重新全局安装指定版本号的npm包
```
## NPM:Node Package Manager
安装npm Node.js自带
一些命令
``` javascript
$ npm list //显示所有npm包，一个依赖树
$ npm list | grep <packageName>  //查看某个包的独立依赖（似乎没有第三方）
$ npm install --producion //只安装生产环境所需要的包
$ npm view <packageName> versions //查看某个包的所有版本
$ npm i jquery@1 -S //jquery@1.的最高版本
$ npm outdated //显示过期的包
$ npm update //更新版本,根据package.json
$ npm cache clean --force //删除缓存,安装出错时,可能是因为缓存
```
### node package versions
> 13.4.6:  major:13,minor:4,patch:6
1. major(主版本):大更新 
2. minor(副版本):大方向不变的情况下添加新功能 
3. patch：打补丁(一般偶数稳定，奇数不稳定)
#### 版本配置的符号解释
+ ^锁定主版本,但是所输入的版本也需要存在 "^2.1.0"
+ ~锁定主版本号和副版本号 "~2.1.0"
+ 锁定版本，如"2.1.0"
+ 最新版本，"*"
### modules类型
1. buildins 内置的包
2. thirdpaty 第三方的包
3. custom 自己的包
### npm切换源
``` javascript
$ npm config get registry //查看当前源
$ npm config set registry https://registry.your-registry.npme.io/ //设置npm源
```
### 发布包
``` javascript
$ npm publish //发布包命令
```
### [package.json信息的描述](https://docs.npmjs.com/cli/v7/configuring-npm/package-json)
### npm脚本
注意在windows环境下需要插件脚本才能够进行并行执行
如[npm-run-all](https://github.com/mysticatea/npm-run-all)
``` javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1", //test，start之类的不需要npm run test 直接 npm test就好了
    "runjs": "node ./1.script/script1.js && node ./1.script/script2.js",
    "start": "node ./1.script/script1.js"
  },
```
#### 获取npm package.json文件内容
**值得注意的是，命令行的方式是无法获取的，需要使用script的脚本来获取,也就是说，无法直接使用node，而是需要npm run \<options> 才能访问**

js文件中访问
``` javascript
process.env.npm_package_version //获取package.json的版本号
process.env.npm_package_scripts //undefined，似乎无法直接获取对象
```
script脚本中访问
``` javascript
 "build": "echo %npm_package_version%"
```
### 定义环境变量
### npm可以安装github的包，作为依赖
``` javascript
$ npm install git+https://git.niubi.com/yourName/niubility.git
$ npm install git+ssh://git@github.com:WuuG/VueComponents.git
```
### cross-env
不同操作系统之间的ENV不是兼容的，因此需要cross-env
``` javascript
  "scripts": {
    //在mac，linux可以获取环境变量，但是在window中不行
    "prod": "NODE_ENV=production gulp",
    "dev": "NODE_ENV=development gulp"
  },
```
cross-env
``` javascript
$ npm i cross-env -D
```
此时的script
``` javascript
  "scripts": {
    "prod": "cross-env NODE_ENV=production gulp",
    "dev": "cross-env NODE_ENV=development gulp"
  },
```
## NRM：Npm Registry Manager 
npm的镜像源管理工具 

安装
``` javascript
$ npm install -g nrm
```
一些基础命令
``` javascript
nrm ls //获取list
nrm use <registry name> //切换源
nrm test //测试速度
```
## NPX:npm package extension
npm5.2以后才支持

npx会逐步寻找是否有node_modules，从本地到全局，若是没有它会安装至临时文件夹里，用完就删除

全局安装有个问题：别人用不了，而且install的时候也不会自动安装。
``` javascript
$ npx --no-install http-server //若是没有也不要安装
$ npx --ignore-existing http-server //不是用本地的，直接使用网上的
```
## [Yarn](https://yarnpkg.com/getting-started/usage)
类似npm啦
``` js
yarn init
yarn add [package]
yarn add [package] --dev
yarn upgrade [package]
yarn remove [package]
yarn | yarn install
```
修改源
```js
yarn config get registry // 查看源
yarn save 软件名 --registry https://registry.npm.taobao.org/ //临时修改源
yarn config set registry // https://registry.npm.taobao.org/ //全局修改源
npm install -g yrm //yrm 类似 nrm
```
# node.js自定义模块
## commonjs模块化
commonjs 规范 第三方的规范
module.js
``` javascript
const name = {
  name: "wuug",
  printName() {
    console.log(this.name);
  },
};

const age = {
  age: 100,
};
// 以下两种暴露方法是相同的
module.exports = {
  name,
  age,
};
// 这里的exports指向 module.exports
exports.name = name;
exports.age = age;
// 值得注意的是，不可以下面的方法,下面直接断去了与module的连接
exports = {
  name,
  age
}
```
app.js
``` javascript
 const {name} = require("./name");
```
> 循环依赖问题，依赖成环