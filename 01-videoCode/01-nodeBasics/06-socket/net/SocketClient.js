const net = require('net');
const readline = require('readline')


let port = 7001

const client = net.createConnection({ port }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  // 写给服务端
  client.write('hello!\r\ni am clinet ');
});

client.setEncoding = 'UTF-8'



client.on('data', (data) => {
  console.log(data.toString());
  say()
  // 断开连接
  // client.end();
});

client.on('end', () => {
  console.log('disconnected from server');
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function say() {
  rl.question('请输入:\n', (inputMsg) => {
    if (inputMsg != 'bye') {
      client.write(inputMsg + '\n')
    } else {
      client.destory()
      rl.close()
    }
  })
}