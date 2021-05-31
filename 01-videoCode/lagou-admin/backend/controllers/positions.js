const moment = require('moment');
const { addPositoin, findAllPosition } = require('../models/positions')
const { renderMessage, renderData } = require('../utils/tools')

const add = async (req, res, next) => {
  try {
    res.set('content-type', 'application/json; charset=utf-8')
    const createTime = moment().format('YYYY年MM月DD日,hh:mm');
    const data = req.body
    const result = await addPositoin({
      ...data,
      createTime
    })
    renderMessage(res, 'succ', '职位添加成功')
  } catch (error) {
    renderMessage(res, 'fail', '职位添加失败')
  }
}

const list = async (req, res, next) => {
  try {
    res.set('content-type', 'application/json; charset=utf-8')
    const result = await findAllPosition()
    renderData(res, 'succ', result)
  } catch (error) {
    console.log(`position list error occurd ${error}`);
    renderMessage(res, 'succ', '获取职位信息失败')
  }
}


module.exports = {
  add,
  list
}