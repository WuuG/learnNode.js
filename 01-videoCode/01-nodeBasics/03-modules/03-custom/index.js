const _ = require("lodash");

function mychunk(arr) {
  return _.chunk(arr, 2);
}

module.exports = mychunk;
