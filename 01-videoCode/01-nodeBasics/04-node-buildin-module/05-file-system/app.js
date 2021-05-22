const fs = require('fs');

// fs.mkdir('logs', (err) => { //创建文件,错误优先的回调
//   if (err) throw err
//   console.log('success build dir');
// })

// fs.rename('./logs', './renameLogs', () => { //重命名文件和文件夹
//   console.log('rename file or dir success');
// })

// fs.rmdir('./renameLogs', () => { //移除文件夹
//   console.log('success remove');
// })

// fs.readdir('../05-file-system', (err, result) => {
//   console.log(result);
// })

// fs.writeFile('./logs/log1.log', 'hello\nworld', (err) => {
//   console.log('done.');
// })
// fs.appendFile('./logs/log1.log', '\n!!!', (err) => { //末尾添加内容操作
//   console.log('done.');
// })

// fs.unlink('./logs/useless.js', () => {// 删除文件
//   console.log('success delete file');
// })

// fs.readFile('./logs/log1.log', 'utf-8', (err, content) => { //读取文件
//   console.log(content); //如果没有添加urf-8,就是buffer，无法看到内容
// })

// fs.readFile('./logs/log1.log', (err, content) => { //读取文件
//   console.log(content.toString()); //也可以用tostring进行转换
// })

// fs同步读取文件
const content = fs.readFileSync('./logs/log1.log')
console.log(content.toString());
console.log('continue...');
