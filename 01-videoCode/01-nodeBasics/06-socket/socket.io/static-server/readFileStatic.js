const mime = require('mime');
const path = require('path');
const fs = require('fs');

function readFile(file, response) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        response.end('error.it a dir and cant find file,是一个目录，且目录文件下不存在index.html')
      } else {
        resolve(data)
      }
    })
  });
}

async function readStaticFile(pathStr, response) {
  // ext有可能为空
  const ext = path.parse(pathStr).ext
  const extType = mime.getType(ext)
  // fs.existsSync(pathStr): 判断文件是否存在
  let data
  if (fs.existsSync(pathStr)) {
    // 如果ext为空，说明是目录。
    if (ext) {
      data = await readFile(pathStr, response)
    } else {
      // 如果是目录的话，就默认读取目录下的html
      data = await readFile(path.join(pathStr, '/index.html'), response)
    }
  } else {
    response.end('dir or file not found,目录不存在')
  }
  return {
    data,
    extType
  }
}

module.exports = { readStaticFile }