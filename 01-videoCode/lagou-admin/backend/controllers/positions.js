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
      createTime,
      companyLogo: req.companyLogo
    })
    renderMessage(res, 'succ', '职位添加成功')
  } catch (error) {
    renderMessage(res, 'fail', '职位添加失败')
  }
}
// 获取职位列表
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
// 根据id删除职位
const deleteByid = async (req, res, next) => {
  const id = req.body.id
  if (id) {
    try {
      const result = await positionModel.deleteByid(id)
      if (result) {
        renderMessage(res, 'succ', '删除职位成功')
      } else {
        res.status(202).send(JSON.stringify({ message: '无法删除职位或职位不存在' }))
      }
    } catch (error) {
      console.log(`position deletebyId error:${error}`);
    }
  }
}
// 编辑职位
const update = async (req, res, next) => {
  try {
    res.set('content-type', 'application/json; charset=utf-8')
    const data = upDateDataFilter(req.body)
    if (req.companyLogo) {
      data['companyLogo'] = req.companyLogo
    }
    await positionModel.update({
      ...data,
    })
    renderMessage(res, 'succ', '职位修改成功')
  } catch (error) {
    console.log(`update error : ${error}`);
    renderMessage(res, 'fail', '职位修改失败')
  }
}
const upDateDataFilter = (data) => {
  const res = {}
  for (const propName in data) {
    if (data[propName] != '') {
      res[propName] = data[propName]
    }
  }
  return res
}

module.exports = {
  add,
  list,
  deleteByid,
  update
}