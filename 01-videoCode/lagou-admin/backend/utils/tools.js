const bcrypt = require('bcrypt');

const hash = (myPlaintextPassword, saltRounds = 10) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(myPlaintextPassword, saltRounds, function (err, hash) {
      if (err) {
        reject(err)
      }
      resolve(hash)
    });
  });
}
const hashCompare = (myPlaintextPassword, hash) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(myPlaintextPassword, hash, function (err, result) {
      if (err) {
        reject(err)
      }
      resolve(result)
    });
  });
}

module.exports = {
  hash,
  hashCompare
}