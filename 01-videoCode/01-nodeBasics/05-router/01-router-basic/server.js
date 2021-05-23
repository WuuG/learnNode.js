const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  const urlStr = request.url
  console.log(urlStr);
  switch (urlStr) {
    case '/':
      response.end('hello\n')
      break;
    case '/home':
      fs.readFile('./home.html', (err, content) => {
        response.end(content)
      })
      break
    case '/app.js':
      fs.readFile('./app.js', (err, content) => {
        response.end(content)
      })
      break
    case '/icon.png':
      fs.readFile('./icon.png', (err, content) => {
        response.end(content)
      })
      break
    default:
      response.end('page 404')
  }
}).listen(8080, () => {
  console.log('监听8080端口');
})
