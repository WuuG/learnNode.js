const http = require('http');
const path = require('path');
const { readStaticFile } = require('./readFileStatic')

http.createServer(async (request, response) => {
  const urlStr = request.url
  let filePathName = path.join(__dirname, '/public', urlStr)
  // 这里需要先把默认的头部设置了，否则中文会乱码，提前设置，因为再底下的代码中携带了response
  response.writeHead(404, {
    'content-type': 'text/html; charset=utf-8'
  })
  //说实话。这里把response放进去，看着就不舒服
  // 这里需要添加await 因为等待是传递的，因为同步存在传递。这里需要等待里面的函数做完，再往下走。
  const { data, extType } = await readStaticFile(filePathName, response)
  if (data) { //判断是否存在数据，存在数据，就设置数据的头部
    response.writeHead(200, {
      'content-type': `${extType}; charset=utf-8`
    })
  } response.end(data)
}).listen(8000, () => {
  console.log('监听8000端口');
})