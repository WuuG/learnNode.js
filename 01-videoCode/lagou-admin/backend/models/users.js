const { Users } = require('../utils/db')

const findUser = username => {
  return Users.findOne({ username })
}

const signupModel = (username, password) => {
  const user = new Users({
    username,
    password
  })
  return user.save()
}

module.exports = {
  signupModel,
  findUser
}