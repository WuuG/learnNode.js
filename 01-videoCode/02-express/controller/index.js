const template = require('art-template');
const path = require('path');
const fs = require('fs');
const { dataArray } = require('../model/list')
var jwt = require('jsonwebtoken');

const list = (req, res, next) => {
  // 1. 服务端渲染
  // let data = `<ul>`
  // for (let i = 0; i < 100; i++) {
  //   data += `<li>this is ${i} line </li>`
  // }
  // data += `</ul>`
  // res.send(data)
  // next()

  // 2. 客户端渲染
  // const dataObj = {
  //   ret: true,
  //   data: []
  // }
  // for (let i = 0; i < 100; i++) {
  //   dataObj.data.push(`line ${i}`)
  // }
  // res.send(dataObj)

  // 2.1 art-template

  // 304 说明是直接获取缓存，所以头部没有发生改变。
  // res.set('Content-Type', 'application/json; charset=utf-8')

  // 中间件方法名（art-template加的）,会去之前设置的目录views中找list.art
  // res.render('list', { //模板名字
  //   dataStr: JSON.stringify(dataArray)  //将dataArray传到list.art中
  // })

  // 用res，通过客户端模板渲染html返回
  // res.render('list-html', {
  //   data: dataArray
  // })

  //通过template渲染页面，有需要时再返回
  let html = template(path.resolve(__dirname, '../views/list-html.art'), {
    data: dataArray
  });
  // 将生成的html写入publicc中，待需使用
  fs.writeFile(path.join(__dirname, '../public/list.html'), html, (err) => {
    if (err) throw err
    console.log('文件已经被创建');
  })

  res.send('page has been create')
}
const toKen = (req, res, next) => {
  // 1.对称加密
  // const toKen = jwt.sign({ username: 'wuug' }, 'wuug')
  // const decoded = jwt.verify(toKen, 'wuug')

  // 2.非对称加密
  // 私钥加密后发出token
  const privateKey = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private.key'))
  const token = jwt.sign({ username: 'wuug' }, privateKey, { algorithm: 'RS256' })
  // 收到toKen后 通过公钥验证
  const publicKey = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_public.key'))
  const result = jwt.verify(token, publicKey)
  res.send(result)
}
// const toKenVertify = (req, res, next)

exports.list = list
exports.toKen = toKen