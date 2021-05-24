const express = require('express');
const router = require('./router/index')
const path = require('path');

const app = express()

// 解析json和fromurl
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// art-template
app.engine('art', require('express-art-template'));
// 官网是错误的，显然这个东西没什么人维护了，github是对的
app.set('view options', {
  debug: process.env.NODE_ENV !== 'production',
  escape: false  //防止传递的数据进行编码
});
// 这里是对应template所对应的文件夹 views
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'art');

// 内置中间件：静态资源服务中间件,默认public中查找静态资源 。http://localhost:8000/index.html --> 会查找到 public/index.html
app.use(express.static('public'))

app.use('/', router)


app.listen(8000, () => {
  console.log('localhost:8000');
})