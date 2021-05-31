const moment = require('moment');
const { addPositoin } = require('../models/positions')

const add = async (req, res, next) => {
  const createTime = moment().format('YYYY年MM月DD日,hh:mm');
  const data = req.body
  const result = await addPositoin({
    ...data,
    createTime
  })
  if (result) {

  }
  res.send(JSON.stringify(result))
}



module.exports = {
  add
}