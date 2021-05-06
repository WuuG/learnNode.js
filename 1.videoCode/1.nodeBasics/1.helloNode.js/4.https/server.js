const http = require("http");

const server = http.createServer((request, response) => {
  let url = request.url;
  response.end(url);
});

server.listen(8000, "localhost", () => {
  console.log("启动服务，localhost:80000");
});
