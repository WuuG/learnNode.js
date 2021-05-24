const express = require('express');
const router = require('./router/index')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', router)


app.listen(8000, () => {
  console.log('localhost:8000');
})