const net = require('net')

let clients = {}
let clientName = 0

const server = net.createServer((socket) => {
  // socket.end('goodbye\n');
  socket.name = ++clientName
  clients[socket.name] = socket


  // socket.write('hello!\ni am server')

  socket.on('data', (chunk) => {
    broadcast(socket, chunk.toString())
  })

  socket.on('error', (e) => {
    console.log(`error ${e}`);
    socket.end()
  })

  socket.on('close', (data) => {
    delete clients[socket.name]
    console.log(`${socket.name + '下线了'}`);
  })

})

server.on('error', (err) => {
  // Handle errors here.
  throw err;
});

// Grab an arbitrary unused port.
server.listen('7001', () => {
  console.log('opened server on', server.address());
});

function broadcast(socket, msg) {
  for (const key in clients) {
    clients[key].write(`${socket.name}说:${msg}`)
  }
}