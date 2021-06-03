const { Positions } = require('../utils/db');


const addPositoin = (data) => {
  const positoin = new Positions(data)
  return positoin.save()
}

const findAllPosition = async () => {
  const result = await Positions.find({}).sort({ _id: 1 })
  return result
}

module.exports = {
  addPositoin,
  findAllPosition
}