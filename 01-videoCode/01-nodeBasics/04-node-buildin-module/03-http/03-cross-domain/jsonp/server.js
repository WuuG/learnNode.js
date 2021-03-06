const http = require('http')

const server = http.createServer((request, response) => {
  let urlStr = request.url
  const urlObj = new URL(urlStr, 'http://localhost:8000')
  data = {
    msg: 'hello'
  }
  const params = urlObj.searchParams
  console.log(urlObj);
  console.log(params);
  switch (urlObj.pathname) {
    case '/api/data':
      sendData = JSON.stringify(data)
      console.log(sendData, typeof sendData);
      response.write(`${params.get('callback')}(${sendData})`)
      break;
    default:
      response.write('page not found')
  }
  response.end()
})

server.listen(8000, () => {
  console.log('监听8000端口');
})