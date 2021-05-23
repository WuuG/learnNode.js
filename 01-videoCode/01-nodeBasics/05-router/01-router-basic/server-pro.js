const http = require('http');
const fs = require('fs');
const mime = require('mime');

http.createServer((request, response) => {
  const urlStr = request.url
  console.log(urlStr);
  // 根据扩展名，获取content-type类型
  const type = mime.getType(urlStr.split('.')[1])
  // 添加content-type
  response.writeHead(200, {
    'content-type': type
  })
  const file = fs.readFileSync(`.${urlStr}`)
  response.end(file)
}).listen(8080, () => {
  console.log('监听8080端口');
})

