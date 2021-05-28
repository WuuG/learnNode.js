const { signupModel, findUser, findList, dbRemoveUser } = require('../models/users')
const { hash } = require('../utils/tools')
// 注册用户
const signup = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const { username, password } = req.body
  let cryptPassword = ''
  //密码加密
  try {
    cryptPassword = await hash(password)
  } catch (err) {
    console.log(`对密码的hash加密失败：${err}`);
    res.render('fail', {
      data: JSON.stringify('密码加密失败')
    })
    return
  }

  //判断用户是否存在 存在返回数据，不存在返回null
  const findeResult = await findUser(username)
  if (!findeResult) {
    await signupModel(username, cryptPassword)
    res.render('succ', {
      data: JSON.stringify('注册成功')
    })
  } else {
    res.render('fail', {
      data: JSON.stringify('用户名已存在')
    })
  }
}

// 获取用户列表
const list = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const listResult = await findList();
  res.render('succ', {
    data: JSON.stringify(listResult)
  })
}
const removeUser = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const id = req.body.id
  let result = await dbRemoveUser(id)
  if (result) {
    res.render('succ', {
      data: JSON.stringify({
        message: '用户已成功删除'
      })
    })
    return
  }
  res.render('fail', {
    data: JSON.stringify({
      message: '未查找到用户。'
    })
  })
}

module.exports = {
  signup,
  list,
  removeUser
}