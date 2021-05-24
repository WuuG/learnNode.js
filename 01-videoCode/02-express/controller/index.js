
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
  let dataArray = []
  for (let i = 0; i < 100; i++) {
    dataArray.push(`line ${i}`)
  }

  // 304 说明是直接获取缓存，所以头部没有发生改变。
  res.set('Content-Type', 'application/json; charset=utf-8')
  // 中间件方法名（art-template加的）,会去之前设置的目录views中找list.art
  res.render('list', { //模板名字
    dataStr: JSON.stringify(dataArray)  //将dataArray传到list.art中
  })
}

exports.list = list