const router = require('express').Router()
const { list } = require('../controller/index')

router.get('/', (req, res, next) => {
  console.log(1);
  res.send('home pages')
})
// 注意在router中，是精确匹配的，/index就是匹配/index,不会匹配/
// 获取query
router.get('/index', list)
router.get('/api/list', list)

// //get 获取数据
// router.get('/index', (req, res, next) => {
//   const query = req.query
//   res.send(query)
// })
// //post 增加数据
// router.post('/index', (req, res, next) => {
//   const data = req.body
//   res.send(data)
// })
// // 删除数据
// router.delete('/index', (req, res, next) => {
//   res.send('delete response')
// })
// // 修改数据-覆盖式修改-全部改掉
// router.put('/index', (req, res, next) => {
//   const data = req.body
//   res.send(data)
// })
// // 修改数据-增量修改-改一部分
// router.patch('/index', (req, res, next) => {
//   res.send('path resoponse')
// })

//所有都接受
// router.all('/index', (req, res, next) => {
//   res.send('hello')
// })

module.exports = router