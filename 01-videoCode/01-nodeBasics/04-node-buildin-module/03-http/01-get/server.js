const http = require("http");
const log = require("../../utils/log");

const server = http.createServer((request, response) => {
  console.log(request);
  debugger;
});

server.listen(8000, () => {
  console.log("服务开启端口8000");
});
