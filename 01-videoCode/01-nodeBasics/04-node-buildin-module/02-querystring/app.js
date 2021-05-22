const querystring = require("querystring");
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

const url = new URL(
  "https://www.bilibili.com/video/BV1ca4y1n7u3?p=16&spm_id_from=pageDriver"
);
// const res = querystring.parse(url.search.slice(1));
const res = querystring.decode(url.search.slice(1));
logger.info("res = ", res);

const parmasStr = querystring.stringify(
  {
    foo: "bar",
    baz: ["东西", "好动西"], //中文会被转化成百分比字符
    corge: "",
  },
  null,
  null,
  {
    //若要获取中文，需要进行百分比编码字符的解码
    encodeURIComponent(string) {
      return querystring.unescape(string);
    },
  }
);
console.log(parmasStr);
