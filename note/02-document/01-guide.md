- [process](#process)
  - [环境变量](#环境变量)
- [REPL](#repl)
  - [点命令](#点命令)
- [命令行接受参数](#命令行接受参数)
- [输出至命令行](#输出至命令行)
  - [console.log()](#consolelog)
    - [console.clear()](#consoleclear)
    - [console.count()](#consolecount)
    - [cosole.trace()](#cosoletrace)
  - [计算事件花费](#计算事件花费)
  - [stdout和stderr](#stdout和stderr)
  - [为输出着色](#为输出着色)
- [从命令行接受命令 readline](#从命令行接受命令-readline)
- [export moddule](#export-moddule)
- [npm](#npm)
  - [package.json](#packagejson)
    - [属性分类](#属性分类)
      - [name](#name)
      - [author](#author)
# process
可以通过process.exit()退出
``` js
// 直接退出程序
process.exit(1);
```
process.on()可以监听信号。其中SIGKILL是告诉进程要立即终止的信号，理想情况下行为类似于process.exit()

SIGTERM是告诉进程要正常终止的信号。他是从进程管理者发送的信号。
``` js
process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});

```
也可以从另一个正在运行的Node.js程序发送,这样也会关闭之前的node程序。
``` js
process.kill(process.pid,"SIGTERM")
```
## 环境变量
process core modeule 提供了env属性来托管环境变量(在程序启动时设置的)

通过以下代码，可以在运行app.js时设置USER_ID和USER_KEY
``` js
USER_ID=9527 USER_KEY=foobar node app.js
```
如果有多个环境变量需要设置，也可以在根文件夹创建.env文件，之后使用dotenv(需要npm安装)载入

.env 文件
``` js
USER_ID = "9527";
USER_KEY = "foobar";
NODE_ENV = "development";
```
app.js 导入dotenv，然后就可以使用环境变量了
``` js
require("dotenv").config();

console.log(process.env.USER_ID, process.env.USER_KEY);
console.log(process.env.NODE_ENV);
```
# REPL
+ REPL Read Evaluate Print Loop 运行评估打印循环
+ REPL通过直接运行node命令进入
+ 在REPL中通过tab会自动补全。
+ 通过键入JavaScript类型之后使用tab，还可查看其对应属性和方法
+ 通过键入"golbal."输入tab，可查看global对应方法和属性。
+ 如果在某些代码后输入_，则会打印最后一次操作的结果。
## 点命令
REPL有一些特殊命令行，全部由"."开始
+ .help 显示点命令的帮助
+ .editor 启用编辑器模式，可以轻松的编写多行JavaScript代码。当处于此模式，按下ctrl+d 可以运行编写的代码。
+ .break 当输入多行表达式时，输入.break命令可以终止进一步输出。
+ .clear 将REPL上下文重置为空对象(啥意思?反正声明的变量是还存在的)，并清除当前正在输入的任何多行表达式
+ .load: 加载Javascript文件(相对于当前工作目录)
+ .save 保存键入内容成为一个文件(需指定文件名)
+ .exit 退出REPL(相当于两次ctrl+c)

# 命令行接受参数
在调用node命令时，可以传入任意数量的参数
``` js
node app.js joe
```
或
``` js
node app.js name=joe
```
这会改变在Node.js代码中获取参数值中的方式

通过process对象取回，其暴露为argv属性，该属性是一个数组，包含了所有命令行调用承诺书的数组。第一个参数时node命令的完整路径。第二个参数时正在执行的文件的完整路径。第其他二外的参数会在第三个位置之后。

可以通过循环遍历所有参数
``` js
  process.argv.forEach((val, index) => {
    console.log(`${index}:${val}`);
  });
```
当然可以通过从index为2开始，获取自己添加的额外参数
``` js
const args = process.argv.slice(2)
```
当然若是键值对的情况
``` js
node app.js name=joe
``` 
则是得到字符串的键值对，需要进行解析。最好的方法是通过minimist库，帮助处理变量
``` js
const args = require("minimist")(process.argv.slice(2));
console.log(args["name"]); // joe
```
之后需要使用”--“在每个变量之前
``` js
node app.js --name=joe
```
# 输出至命令行
nodejs提供了console模块，该模块提供了大量有用的方式于命令行交互。该模块基本上与浏览器中的console没有差别。
## console.log()
最基础的就是console.log()了

我们同时还可以通过传递变量和格式化说明符来格式化语句，例如：
``` js
console.log("my %s has %d years", "cat", 2);
console.log("%o",Number)
```
+ %s 格式化变量为字符串
+ %d 格式化字符串为数字
+ %i 格式化变量为整数部分
+ %o 格式化变量为对象
### console.clear()
该方法会清除控制太
### console.count()
计算元素,该方法会对计算字符串被打印的次数，并打印在旁边。
``` js
  const oranges = ["orange", "orange"];
  const apples = ["apple"];
  oranges.forEach((fruit) => {
    console.count(fruit);
  });
  apples.forEach((fruit) => {
    console.count(fruit);
  });
	// orange: 1
	// orange: 2
	// apple: 1
```
通过console.countReset()方法可以重置console.count()
``` js
  const oranges = ["orange", "orange"];
  const apples = ["apple"];
  oranges.forEach((fruit) => {
    console.count(fruit);
  });
  apples.forEach((fruit) => {
    console.count(fruit);
  });
  // orange: 1
  // orange: 2
  // apple: 1
  console.countReset("orange"); // 清除orange的计数次数
  oranges.forEach((fruit) => {
    console.count(fruit);
  });
  // orange: 1
  // orange: 2
```
### cosole.trace()
通过console.trace()可以打印堆栈跟踪信息。
``` js
  const funciton2 = () => console.trace();
  const function1 = () => funciton2();
  function1();
```
在运行后会打印以下内容。
``` js
Trace
    at funciton2 (D:\study-git\learnNode.js\02-document\01-guide\app.js:49:35)
    at function1 (D:\study-git\learnNode.js\02-document\01-guide\app.js:50:27)
    at Server.<anonymous> (D:\study-git\learnNode.js\02-document\01-guide\app.js:51:3)
    at Object.onceWrapper (events.js:421:28)
    at Server.emit (events.js:315:20)
    at emitListeningNT (net.js:1352:10)
    at processTicksAndRejections (internal/process/task_queues.js:79:21)
```
## 计算事件花费
通过time()和timeEnd()可以计算一个函数的运行时间。
``` js
  const funciton2 = () => console.trace();
  const func1 = () => funciton2();
  func1();
  console.clear();
  const doSomething = () => console.log("test");
  const measureDoingSomething = () => {
    console.time("doSomething()");
    doSomething();
    timeEnd("doSomething()");
  };
  measureDoingSomething();
	// test
	// doSomething(): 0.337ms
```
## stdout和stderr
console.log 非常适合在控制台中打印消息.也就是所谓的标准输出流(stdout)。

console.error打印stderr流，它不会出现控制台但是会出现在错误日志中<--不知道为甚么，打印了

## 为输出着色
通过[转义序列](https://gist.github.com/iamnewton/8754917)可以在控制台中为文本的输出着色。
``` js
console.log("\x1b[33m%s\x1b[0m", "hi");
```
虽然可以通过以上方法打印,但这是底层实现的方式，
``` js
const chalk = require("chalk");
console.log(chalk.red("hi chalk"));
```
# 从命令行接受命令 readline
``` js
const realine = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});
realine.question(`what your name ? `, (name) => {
  console.log(`Hi ${name}`);
  realine.close();
});
```
readline除了question外还提供了其他方法，可以通过[文档](https://nodejs.org/api/readline.html)查看

更简单的方法是使用 [readline-sync包](https://www.npmjs.com/package/readline-sync)

[inquirer.js](https://github.com/SBoudrias/Inquirer.js)提供了更加复杂和抽象的解决方案。
``` js
  const inquirer = require("inquirer");
  const quesiotn = [
    {
      type: "input",
      name: "name",
      question: "what's your name ?",
    },
  ];
  inquirer.prompt(quesiotn).then((answers) => {
    console.log(`Hi ${answers["name"]}`);
  });
  const asyncFunc = async function () {
    const answer = await inquirer.prompt(quesiotn);
    console.log(`Hi ${answer["name"]}`);
  };
  asyncFunc();
```
inquirer提供了更多互动方式，比如多选和单选等。

所有的可选方案都值得了解，当如果为了提升cli的输入，inquirer.js是很明智的选择。
# export moddule
如在02-car.js中使用export
``` js
const car = {
  brand: "ford",
  model: "Fiesta",
};

module.exports = car;
```
``` js
const car = require("./02-car");
console.log(car); // { brand: 'ford', model: 'Fiesta' }
```
当然还有另一个种方法,给exports一个属性，这个方法允许输出多个对象，函数或是data。
``` js
exports.car = car;
```
module.exports和export之间的区别在于，前者公开了它指向的对象，后者公开了它指向的对象的属性。
# npm
+ npm会将可执行文件放在/node_module/.bin文件夹中。
## package.json
package.json是文件的项目清单，它可以做很多互不相关的事情。其是工具配置的中心仓库，同时它也用于npm和yarn存储包名和版本。

如果要在npm上分发的Node.js包，则必须要由一组可供他人使用它的属性。
+ version:指示目前的版本
+ name 设置应用/包名
+ description 简短的描述
+ main 设置应用的入口
+ private 设置为true防止不小心发布到npm上
+ scirpts 定义node脚本
+ dependencies 设置npm包的依赖的列表
+ devDependencies  设置开发依赖安装的npm软件包列表
+ engines 设置此软件包/应用在哪个版本的node.js下运行
+ browserslist 用于告知要支持哪些浏览器
以上所有属性都可被npm或其他工具使用。
### 属性分类
该章节中大部分属性仅用于[npm](https://www.npmjs.com/),
#### name
设置软件包名 name必须设置少于224个字符，不可存在空格，其可以包含连字符"-"或者下划线"_"

之所以这样设置，是因为当包被发布时，该属性会作为npm URL的一部分。

如果将其发布到Github上，则Github仓库名称时作为该属性的好选择。
#### author
列出包作者名
``` json
{
  "author": "Joe <joe@whatever.com> (https://whatever.com)",
}
```
或者使用下面的格式
``` json
{
  "author": {
    "name": "WuuG",
    "email": "wuguodong.1997@gmail.com",
    "url": "https://github.com/WuuG"
  },
}
```