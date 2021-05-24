const router = require('express').Router()


router.get('/', (req, res, next) => {
  res.send('home pages')
  next()
})
// 注意在router中，是精确匹配的，/index就是匹配/index,不会匹配/
// 获取query
router.get('/index', (req, res, next) => {
  const query = req.query
  console.log(query);
  res.send(query) //这里会自动添加content-type
  // res.json(query)
  next()
})

//get 获取数据
router.get('/index', (req, res, next) => {
  const query = req.query
  res.send(query)
})
//post 增加数据
router.post('/index', (req, res, next) => {
  const data = req.body
  res.send(data)
})
// 删除数据
router.delete('/index', (req, res, next) => {
  res.send('delete response')
})
// 修改数据-覆盖式修改-全部改掉
router.put('/index', (req, res, next) => {
  const data = req.body
  res.send(data)
})
// 修改数据-增量修改-改一部分
router.patch('/index', (req, res, next) => {
  res.send('path resoponse')
})

module.exports = router