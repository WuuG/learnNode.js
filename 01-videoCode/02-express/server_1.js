const express = require('express');

const app = express()

// use从上至下匹配，只匹配一个
// 挂载多个中间件，形成多个中间件栈
// app.use('/api', (request, response, next) => {
//   console.log(0);
//   next()
// }, (request, response, next) => {
//   console.log(1);
//   next()
// }, (req, res) => {
//   res.send('hello middlewares stack')
// })
//中间件栈的数组封装
const middlewares = [(request, response, next) => {
  console.log(0);
  next()
}, (request, response, next) => {
  console.log(1);
  next()
}, (req, res, next) => {
  next()
}]
app.use('/api', middlewares)

app.use('/ajax', (req, res) => {
  console.log('ajax');
})
app.use('/', (request, response) => {
  response.send('hello')
})


app.listen(8000, () => {
  console.log('监听端口8000');
})