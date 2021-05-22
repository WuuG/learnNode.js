const http = require('http')
const querystring = require('querystring')

const postData = querystring.stringify({ //发送的请求,需要转换为json格式
  'msg': 'Hello World!'
});

const options = { //opst 请求的options
  protocol: 'http:',
  hostname: 'localhost',
  method: 'post',
  port: 3000,
  path: '/data',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData) //表明发送数据的长度
  }
}
const server = http.createServer((req, res) => {
  const request = http.request(options, (result) => { //这里发送post请求
  })
  request.write(postData) // 写入post请求携带的数据
  request.end() // post 请求结束

  res.end()
})

server.listen(8000, () => {
  console.log('服务8000端口');
})