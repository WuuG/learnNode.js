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
const findList = () => {
  return Users.find().sort({ _id: 1 })
}

module.exports = {
  signupModel,
  findUser,
  findList
}