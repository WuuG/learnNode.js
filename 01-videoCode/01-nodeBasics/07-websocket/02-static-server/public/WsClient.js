var ws = new WebSocket('ws://localhost:8080/')

ws.onopen = () => {
  ws.send('加入聊天室')
}

ws.onmessage = (msg) => {
  const content = document.getElementById('content')
  content.innerHTML += msg.data + '<br>'
}

ws.onerror = (err) => {
  const content = document.getElementById('content')
  content.innerHTML += `error occur ${err}`
}

ws.onclose = () => {
  console.log('close~');
}