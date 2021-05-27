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

module.exports = {
  hash
}