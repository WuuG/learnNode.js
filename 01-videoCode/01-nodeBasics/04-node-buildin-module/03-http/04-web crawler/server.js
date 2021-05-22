const http = require('http');
const https = require('https');
const log = require('../../utils/log')
const cheerio = require('cheerio');


function filterData(data) {
  // 转换为虚拟dom
  const $ = cheerio.load(data)
  const info = []
  // 通过对虚拟dom的元素进行抓取获取标签内容
  $('li.nav-item div.item-children ul.children-list div.title').each((index, el) => {
    console.log($(el).text())
    info.push({
      index,
      el: $(el).text()
    })
  })
  log.info(info)
}
const server = http.createServer((request, response) => {
  let data = ''
  https.get('https://www.mi.com/', (res) => {
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      filterData(data)
      response.write(data)
      response.end('hello crawler')
    })
  })
})

server.listen(8000, () => {
  console.log('监听8000端口');
})