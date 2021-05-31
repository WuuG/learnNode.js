const { signupModel, findUser, findList, dbRemoveUser } = require('../models/users')
const { hash, hashCompare, genToken, vertifyToken } = require('../utils/tools')

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
    renderMessage(res, 'fail', '密码加密失败')
    return
  }

  //判断用户是否存在 存在返回数据，不存在返回null
  const findeResult = await findUser(username)
  if (!findeResult) {
    await signupModel(username, cryptPassword)
    renderMessage(res, 'succ', '注册成功')
  } else {
    renderMessage(res, 'fail', '用户名已存在')
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
// 在数据库中根据_id删除用户
const removeUser = async (req, res, next) => {
  res.set('content-type', 'application/json; charset=utf-8')
  const id = req.body.id
  let result = await dbRemoveUser(id)
  if (result) {
    renderMessage(res, 'succ', '用户已成功删除!')
    return
  }
  renderMessage(res, 'fail', '未查找到用户!')
}
// 用户登录
const signin = async (req, res, next) => {
  try {
    const { username, password } = req.body
    const userinfo = await findUser(username)
    if (!userinfo) {
      renderMessage(res, 'fail', '用户名不存在!')
      return
    }
    const result = await hashCompare(password, userinfo.password)
    if (!result) {
      renderMessage(res, 'fail', '密码不正确!')
    } else {
      // cookie
      // 1.自己设置session，并自己维护
      // const sessionId = generateRandomstring()
      // res.set('Set-cookie', `sessionId=${sessionId}; Path=/; HttpOnly`)
      // 2.工具设置，工具维护
      // req.session.username = username

      // token
      const token = genToken({ username })
      // 自定义首部字段
      res.set('X-access-token', token).render('succ', {
        data: JSON.stringify({
          message: '成功登录！'
        })
      })
    }
  } catch (error) {
    console.log(`signin error occured ${error}`);
  }
}
// 退出登录
const signout = (req, res, next) => {
  req.session = null
  renderMessage(res, 'succ', '已成功退出登录')
}
// 权限提示
const isAuth = (req, res, next) => {
  try {
    const token = req.get('X-access-token')
    console.log(token);
    const vetifyResult = vertifyToken(token)
    res.render('succ', {
      data: JSON.stringify(vetifyResult)
    })
  } catch (error) {
    res.status(403).render('fail', {
      data: JSON.stringify({
        message: '请先登录！'
      })
    })
  }
}
const renderMessage = function (res, state, message) {
  res.render(state, {
    data: JSON.stringify({
      message
    })
  })
}

module.exports = {
  signup,
  list,
  removeUser,
  signin,
  signout,
  isAuth
}