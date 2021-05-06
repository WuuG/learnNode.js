const log4js = require("log4js");

log4js.configure({
  appenders: {
    nodejs: { type: "file", filename: "./log/nodejs.log" },
  },
  categories: {
    default: { appenders: ["nodejs"], level: "debug" },
  },
});
const logger = log4js.getLogger("nodejs");

module.exports = logger;
