const http = require('http')
const { createProxyMiddleware } = require('http-proxy-middleware');

const server = http.createServer((request, response) => {
  url = request.url
  if (/\/api/.test(url)) {
    const options = {
      target: 'https://srv.buysellads.com',
      changeOrigin: true,
      pathRewrite: { // 将/api改成其他地址
        '^/api': ''
      }
    }
    const proxy = createProxyMiddleware('/api', options)
    //代理：当遇到/api时，会将之前的地址，换为target的地址。
    proxy(request, response)
  } else {
    console.log('error')
  }
})

server.listen(8000, () => {
  console.log('监听8000端口');
})