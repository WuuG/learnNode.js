// 流操作，不是很懂
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip()

const readStream = fs.createReadStream('./log.txt')
const writeStream = fs.createWriteStream('./logs.gzip')


readStream
  .pipe(gzip)
  .pipe(writeStream)
