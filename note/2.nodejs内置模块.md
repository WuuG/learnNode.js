- [1. url](#1-url)
  - [1.1. log4js](#11-log4js)
  - [1.2. new URL(<url>)](#12-new-urlurl)
  - [1.3. new URLSearchParams(<Params>)](#13-new-urlsearchparamsparams)
- [2. querysting](#2-querysting)
  - [2.1. querystring.parse(str[, sep[, eq[, options]]]) && querystring.decode](#21-querystringparsestr-sep-eq-options--querystringdecode)
  - [2.2. querystring.stringify(obj[, sep[, eq[, options]]]) && querysting.encode](#22-querystringstringifyobj-sep-eq-options--querystingencode)
- [3. http](#3-http)
  - [3.1. 调试工具](#31-调试工具)
    - [3.1.1. Insomnia](#311-insomnia)
  - [3.2. node进程管理工具](#32-node进程管理工具)
  - [3.3. response](#33-response)
  - [3.4. request](#34-request)
  - [3.5. GET](#35-get)
  - [3.6. POST](#36-post)
- [4. CROS](#4-cros)
  - [4.1. jsonp](#41-jsonp)
  - [4.2. CORS](#42-cors)
  - [4.3. middleware(http-proxy-middware)](#43-middlewarehttp-proxy-middware)
    - [4.3.1. 安装](#431-安装)
  - [4.4. 爬虫](#44-爬虫)
- [5. event](#5-event)
- [6. fs](#6-fs)
  - [6.1. 文件/文件夹读取相关操作](#61-文件文件夹读取相关操作)
  - [6.2. 文件异步和常用操作](#62-文件异步和常用操作)
- [zlib](#zlib)
- [readline](#readline)
- [Crypto 加密](#crypto-加密)
# 1. url
## 1.1. [log4js](https://www.npmjs.com/package/log4js)
通过打印操作，来形成日志，并记录成文件,java也有log4

以下是官方提供的例子
``` javascript
const log4js = require("log4js");
log4js.configure({
  // 定义logger名，输出位置
  appenders: { cheese: { type: "file", filename: "cheese.log" } },
  // 定义输出级别
  categories: { default: { appenders: ["cheese"], level: "error" } }
});

// 对loagger进行赋值，这里获取的是cheese这个logger,对应categories.name 
// 这里其实是获取default，并给别名chesese
const logger = log4js.getLogger("cheese");
// 以下输出级别由低到高，设置的越高能够打印的数量就越少。
logger.trace("Entering cheese testing");
logger.debug("Got cheese.");
logger.info("Cheese is Comté.");
logger.warn("Cheese is quite smelly.");
logger.error("Cheese is too ripe!");
logger.fatal("Cheese was breeding ground for listeria.");
```
## 1.2. new URL(<url>)
可以获取url对应的各种信息，如protocal,username,password,host...
## 1.3. new URLSearchParams(<Params>)
可以获取参数，还可以通过.get方法获取某个参数的值
``` javascript
const urlParams = new URLSearchParams(urlStr.searchParams);
logger.info(urlParams.get("id"));
```
# 2. querysting
## 2.1. querystring.parse(str[, sep[, eq[, options]]]) && querystring.decode
+ sep:标识分割符 默认为&
+ eq：默认为 =
+ options \<object>: 为编码方式
``` javascript
const url = new URL(
  "https://www.bilibili.com/video/BV1ca4y1n7u3?p=16&spm_id_from=pageDriver"
);
// const res = querystring.parse(url.search.slice(1));
const res = querystring.decode(url.search.slice(1)); //返回参数的对象
```
## 2.2. querystring.stringify(obj[, sep[, eq[, options]]]) && querysting.encode
``` javascript
const parmasStr = querystring.stringify({
  foo: "bar",
  baz: ["qux", "quux"],
  corge: "",
},
});
logger.info(parmasStr); // foo=bar&baz=qux&baz=quux&corge=
// 中文的情况
const parmasStr = querystring.stringify(
  {
    foo: "bar",
    baz: ["东西", "好动西"], //中文会被转化成百分比字符
    corge: "",
  },
  null,
  null,
  {
    //若要获取中文，需要进行百分比编码字符的解码
    encodeURIComponent(string) {
      return querystring.unescape(string);
    },
  }
);
```
# 3. http 
## 3.1. 调试工具
``` javascript
$ node --inspect-brk server.js
```
在控制台左上角打开调试工具，通过debugger设置断点。
### 3.1.1. Insomnia
用于测试接口。似乎还有postman。
## 3.2. node进程管理工具
+ supervisor
+ nodemon
+ forever
+ pm2
## 3.3. response
server.js
``` js
const http = require("http");

const server = http.createServer((request, response) => {
  response.writeHead(200, { //控制浏览器显示，
    'content-type': 'text/html' // 解析html
  })
  response.write('<h1>hello node.js http</h1>')
  response.end() // 注意end ，否则一直转
});

server.listen(8000, () => {
  console.log("服务开启端口8000");
});
```
``` js
  response.writeHead(200, { //控制浏览器显示，
    // 'content-type': 'text/plain',  // 解析字符串
    // 'content-type': 'text/html', // 解析html
    'content-type': 'application/json;charset=utf-8' // 解析json,utf-8编码，可以不指定，有默认值
  })
  response.end('{"name": "wuug"}') // 注意end ，否则一直转.若是返回很简单也可以直接在end中返回
```
## 3.4. request
server.js
``` js
  let data = ''
  request.on('data', (chunk) => {
    data += chunk
  })
  log.info(data) // 这里打印出来是空的，看来request.on将data在其定义域内重新定义了一个
  request.on('end', () => {
          response.writeHead(200, {
      'content-type': 'application/json;charset=urf-8'
    })
    response.end(JSON.stringify(querystirng.parse(data))) // 注意end ，否则一直转.若是返回很简单也可以直接在end中返回
  })
```
## 3.5. GET
``` js
  https.get('https://g.alicdn.com/tbhome/??taobao-2021/0.0.5/lib/monitor-min.js', (res) => {
    log.debug('statusCode', res.statusCode)
    log.debug('headers', res.headers)
    let data = ''
    res.on('data', (chunk) => {
      data += chunk
    })
    res.on('end', () => {
      response.writeHead(200, {
        'content-type': 'application/json;charset=urf-8'
      })
      response.end(data)
    })
  }).on('error', e => {
    log.error(e)
  })
```
## 3.6. POST
``` js
const http = require('http')
const querystring = require('querystring')

const postData = querystring.stringify({ //发送的请求,需要转换为json格式
  'msg': 'Hello World!'
});

const options = { //opst 请求的options
  protocol: 'http:',
  hostname: 'localhost',
  method: 'post',
  port: 3000,
  path: '/data',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData) //表明发送数据的长度
  }
}
const server = http.createServer((req, res) => {
  const request = http.request(options, (result) => { //这里发送post请求
  })
  request.write(postData) // 写入post请求携带的数据
  request.end() // post 请求结束

  res.end()
})

server.listen(8000, () => {
  console.log('服务8000端口');
})
```
# 4. CROS
## 4.1. jsonp
html
``` js
    <script>
      // 获取数据后，放入h1,插入body后
      function getData(data) {
        const showData = JSON.stringify(data);
        const h1 = document.createElement("h1");
        h1.innerHTML = `收到的消息是：${data.msg}`;
        document.body.appendChild(h1);
      }
    </script>
    <script src="http://localhost:8000/api/data?callback=getData"></script>
```
server.js
``` js
const http = require('http')

const server = http.createServer((request, response) => {
  let urlStr = request.url
  const urlObj = new URL(urlStr, 'http://localhost:8000')
  data = {
    msg: 'hello'
  }
  const params = urlObj.searchParams
  switch (urlObj.pathname) {
    case '/api/data':
      sendData = JSON.stringify(data)
      console.log(sendData, typeof sendData);
      response.write(`${params.get('callback')}(${sendData})`)
      break;
    default:
      response.write('page not found')
  }
  response.end()
})

server.listen(8000, () => {
  console.log('监听8000端口');
})
```
## 4.2. CORS
server.js
``` js
const http = require('http')

const server = http.createServer((request, response) => {
  let urlStr = request.url
  const urlObj = new URL(urlStr, 'http://localhost:8000')
  data = {
    msg: 'hello'
  }
  const params = urlObj.searchParams
  switch (urlObj.pathname) {
    case '/api/data':
      sendData = JSON.stringify(data)
      console.log(sendData, typeof sendData);
      response.write(`${params.get('callback')}(${sendData})`)
      break;
    default:
      response.write('page not found')
  }
  response.end()
})

server.listen(8000, () => {
  console.log('监听8000端口');
})
```
## 4.3. middleware(http-proxy-middware)
使用别人的接口。
### 4.3.1. 安装
``` js
$ npm i http-proxy-middleware -S
```
server.js
``` js
const http = require('http')
const { createProxyMiddleware } = require('http-proxy-middleware');

const server = http.createServer((request, response) => {
  url = request.url
  if (/\/api/.test(url)) {
    const options = {
      target: 'https://srv.buysellads.com',
      changeOrigin: true,
      pathRewrite: { // 将/api改成其他地址
        '^/api': ''
      }
    }
    const proxy = createProxyMiddleware('/api', options)
    //代理：当遇到/api时，会将之前的地址，换为target的地址。
    proxy(request, response)
  } else {
    console.log('error')
  }
})
```
## 4.4. 爬虫
cheerio
``` js
$ npm install cheerio
```
server.js
``` js
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
```

# 5. event
``` js
const EventEmitter = require('events')

class MyEventEmitter extends EventEmitter { }

const event = new MyEventEmitter()

event.on('play', value => {
  console.log(`这是play打印出来的内容:${value}`);
})

event.once('play', value => { //可以重复定义。once只能触发一次
  console.log(`这是第二个play:${value}`);
})
event.emit('play', 'movie')
event.emit('play', 'movie')
event.emit('play', 'movie')
```
# 6. fs
## 6.1. 文件/文件夹读取相关操作
``` js
const fs = require('fs');

fs.mkdir('logs', (err) => { //创建文件,错误优先的回调
  if (err) throw err
  console.log('success build dir');
})

fs.rename('./logs', './renameLogs', () => { //重命名文件和文件夹
  console.log('rename file or dir success');
})

fs.rmdir('./renameLogs', () => { //移除文件夹
  console.log('success remove');
})

fs.readdir('../05-file-system', (err, result) => {
  console.log(result);
})

fs.writeFile('./logs/log1.log', 'hello\nworld', (err) => {
  console.log('done.');
})
fs.appendFile('./logs/log1.log', '\n!!!', (err) => { //末尾添加内容操作
  console.log('done.');
})

fs.unlink('./logs/useless.js', () => {// 删除文件
  console.log('success delete file');
})

fs.readFile('./logs/log1.log', 'utf-8', (err, content) => { //读取文件
  console.log(content); //如果没有添加urf-8,就是buffer，无法看到内容
})

fs.readFile('./logs/log1.log', (err, content) => { //读取文件
  console.log(content.toString()); //也可以用tostring进行转换
})
```
## 6.2. 文件异步和常用操作
``` js
// fsPromises 异步操作(nodejs10以后)
(async () => {
  const content = await fsPromises.readFile('./logs/log1.log')
  console.log(content.toString());
})()

// 批量创建文件
for (let i = 2; i < 10; i++) {
  fsPromises.writeFile(`./logs/log${i}.log`, `hello log ${i}`).then(err => {
    console.log('done', err)
  })
}

// 读取所有文件内容
function readDir(dir) {
  fsPromises.readdir(`${dir}/`).then(res => {
    return new Promise((resolve, rejects) => {
      const dirs = res.map(file => {
        return `${dir}/${file}`
      });
      resolve(dirs)
    })
  }).then(files => {
    files.forEach((item, index) => {
      // 获取文件的stat类，但是不建议在调用 fs.open()、 fs.readFile() 或 fs.writeFile() 之前使用 fs.stat() 检查文件的存在性。 而是应该直接地打开、读取或写入文件，如果文件不可用，则处理引发的错误。
      fsPromises.stat(item).then(stat => {
        // stat类的一个方法，判断是不是文件夹
        if (stat.isDirectory()) {
          readDir(item)
        } else {
          console.log(item);
          fsPromises.readFile(item, 'utf-8').then(res => {
            console.log(res);
          })
        }
      })
    })
  })
}
readDir('./')

fs.watch('./logs/log1.log', (err) => { //观察文件变化，存在兼容性问题。
  console.log('file has change')
})

fs.watchFile() //检测文件变化，无兼容性问题
```
# zlib
``` js
// 流操作，不是很懂
const fs = require('fs');
const zlib = require('zlib');

const gzip = zlib.createGzip()

const readStream = fs.createReadStream('./log.txt')
const writeStream = fs.createWriteStream('./logs.gzip')


readStream
  .pipe(gzip)
  .pipe(writeStream)
```
# readline
有那么点类似python的input，在控制台上获取消息。控制台交互吧。
``` js
// 官网例子
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('What do you think of Node.js? ', (answer) => {
  // TODO: Log the answer in a database
  console.log(`Thank you for your valuable feedback: ${answer}`);

  rl.close();
});
```
# Crypto 加密
``` js
const crypto = require('crypto');

const password = 'wuug'
//对称加密   crypto.createHash(算法).update(password, [编码方式]).digest([输出形式])
const hash = crypto.createHash('sha1').update(password, 'utf-8').digest('hex')
console.log(hash);
```
