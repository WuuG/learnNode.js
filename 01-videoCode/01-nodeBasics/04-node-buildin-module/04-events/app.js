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