const { Positions } = require('../utils/db');


const addPositoin = (data) => {
  const positoin = new Positions(data)
  return positoin.save()
}


module.exports = {
  addPositoin
}