const url = require("url");
const log4js = require("log4js");

log4js.configure({
  appenders: {
    url: { type: "file", filename: "./log/cheese.log" },
  },
  categories: {
    default: { appenders: ["url"], level: "debug" },
  },
});
const logger = log4js.getLogger("url");
// 查看url的各种信息
const urlStr = new URL("https://www.baidu.com:443/path/index.html?id=2#tag=3");
// console.log(urlStr);
const urlParams = new URLSearchParams(urlStr.searchParams);
logger.info(urlParams.get("id"));
