const bcrypt = require('bcrypt');
const randomstring = require('randomstring');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken')


// 加密，生成hash
const hash = (myPlaintextPassword, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      if (err) {
        reject(err)
      }
      resolve(hash)
    });
  });
}
// hash比较
const hashCompare = (myPlaintextPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      if (err) {
        reject(err)
      }
      resolve(result)
    });
  });
}
// 产生随机字符串
const generateRandomstring = () => {
  return randomstring.generate()
}

// 根据私钥生成token
const genToken = (payload) => {
  const privatrKeyPath = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private.key'))
  return jwt.sign(payload, privatrKeyPath, { algorithm: 'RS256' })
}
// 验证toKen
const vertifyToken = (token) => {
  const pubKeyPath = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private.key'))
  return jwt.verify(token, pubKeyPath, { algorithms: "RS256" })
}
module.exports = {
  hash,
  hashCompare,
  generateRandomstring,
  genToken,
  vertifyToken
}