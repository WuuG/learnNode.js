const fsPromises = require('fs').promises;
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

//fs同步读取文件
const content = fs.readFileSync('./logs/log1.log')
console.log(content.toString());
console.log('continue...');

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