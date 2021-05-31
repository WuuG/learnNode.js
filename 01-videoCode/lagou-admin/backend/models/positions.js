const { Positions } = require('../utils/db');


const addPositoin = (data) => {
  const positoin = new Positions(data)
  return positoin.save()
}

const findAllPosition = async () => {
  const result = await Positions.find({})
  return result
}

module.exports = {
  addPositoin,
  findAllPosition
}