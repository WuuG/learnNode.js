const { Positions } = require('../utils/db');


const addPositoin = (data) => {
  const positoin = new Positions(data)
  return positoin.save()
}

const findAllPosition = async () => {
  const result = await Positions.find({}).sort({ _id: 1 })
  return result
}
const deleteByid = async (id) => {
  const result = await Positions.findByIdAndDelete(id)
  return result
}

module.exports = {
  addPositoin,
  findAllPosition,
  deleteByid
}