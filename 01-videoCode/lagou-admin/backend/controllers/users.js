const { signupModel, findUser } = require('../models/users')
// 注册用户
const signup = async (req, res, next) => {
  const { username, password } = req.body
  //判断用户是否存在 存在返回数据，不存在返回null
  const findeResult = await findUser(username)
  if (!findeResult) {
    const result = await signupModel(username, password)
    console.log(result);
    res.render('succ', {
      data: JSON.stringify({
        username,
        password
      })
    })
  } else {
    res.render('fail', {
      data: JSON.stringify('用户名已存在')
    })
  }
}

exports.signup = signup