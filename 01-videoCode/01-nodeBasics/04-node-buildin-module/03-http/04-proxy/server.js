const http = require('http')
const querystring = require('querystring');

const server = http.createServer((request, response) => {
  let urlStr = request.url
  const urlObj = new URL(urlStr, 'http://localhost:8000')
  data = {
    msg: 'hello'
  }
  switch (urlObj.pathname) {
    case '/api/data':
      response.writeHead(200, {
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
      response.write(JSON.stringify(data))
      break;
    default:
      response.write('page not found')
  }
  response.end()
})

server.listen(8000, () => {
  console.log('监听8000端口');
})