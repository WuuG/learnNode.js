
const auth = (req, res, next) => {
  if (req.session.username) {
    // 只有在用户登录后，保存下其用户名，才能进行下一步操作
    next()
  } else {
    res.status(403).render('succ', {
      data: JSON.stringify({
        message: '请登录'
      })
    })
  }
}

module.exports = {
  auth
}