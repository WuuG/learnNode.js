const { vertifyToken } = require('../utils/tools')

const auth = (req, res, next) => {
  try {
    const token = req.get('X-access-token')
    vertifyToken(token)
    next()
  } catch (error) {
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