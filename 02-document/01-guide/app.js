require("dotenv").config();
const { timeEnd } = require("console");
const http = require("http");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-type", "text/plain");
  res.end("Hello world");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
  if (process.env.USER_ID && process.env.USER_KEY) {
    console.log(process.env.USER_ID, process.env.USER_KEY);
  }
  if (process.env.NODE_ENV) {
    console.log(process.env.NODE_ENV);
  }
  process.argv.forEach((val, index) => {
    console.log(`${index}:${val}`);
  });
  const args = require("minimist")(process.argv.slice(2));
  console.log(args["name"]); // joe
  console.log("my %s has %d years", "cat", 2);
  console.log("%o", Number);
  console.clear();

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

  console.clear();
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

  console.error("new error");

  console.log("\x1b[33m%s\x1b[0m", "hi");
  const chalk = require("chalk");
  console.log(chalk.red("hi chalk"));

  console.clear();
  // const realine = require("readline").createInterface({
  //   input: process.stdin,
  //   output: process.stdout,
  // });
  // realine.question(`what your name ? `, (name) => {
  //   console.log(`Hi ${name}`);
  //   realine.close();
  // });

  // const inquirer = require("inquirer");
  // const quesiotn = [
  //   {
  //     type: "input",
  //     name: "name",
  //     question: "what's your name ?",
  //   },
  // ];
  // inquirer.prompt(quesiotn).then((answers) => {
  //   console.log(`Hi ${answers["name"]}`);
  // });
  // const asyncFunc = async function () {
  //   const answer = await inquirer.prompt(quesiotn);
  //   console.log(`Hi ${answer["name"]}`);
  // };
  // asyncFunc();

  const car = require("./02-car");
  console.log(car); // { brand: 'ford', model: 'Fiesta' }
  // process.exit(2);
});

// 直接退出程序
// process.exit(1);

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
