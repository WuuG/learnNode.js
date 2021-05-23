const crypto = require('crypto');

const password = 'wuug'
//对称加密   crypto.createHash(算法).update(password, [编码方式]).digest([输出形式])
const hash = crypto.createHash('sha1').update(password, 'utf-8').digest('hex')
console.log(hash);