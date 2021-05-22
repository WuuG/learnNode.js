const http = require("http");
const log = require('../../utils/log')
const querystirng = require('querystring')
const https = require('https')

const server = http.createServer((request, response) => {
  https.get('https://g.alicdn.com/tbhome/??taobao-2021/0.0.5/lib/monitor-min.js', (res) => {
    log.debug('statusCode', res.statusCode)
    log.debug('headers', res.headers)
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      response.writeHead(200, {
        'content-type': 'application/json;charset=urf-8'
      })
      response.end(data)
    })
  }).on('error', e => {
    log.error(e)
  })
});

server.listen(8000, () => {
  console.log("服务开启端口8000");
});
