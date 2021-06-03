const moment = require('moment');
const positionModel = require('../models/positions')
const { renderMessage, renderData } = require('../utils/tools')

const add = async (req, res, next) => {
  try {
    res.set('content-type', 'application/json; charset=utf-8')
    const createTime = moment().format('YYYY年MM月DD日,hh:mm');
    const data = req.body
    await positionModel.addPositoin({
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
    const result = await positionModel.findAllPosition()
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