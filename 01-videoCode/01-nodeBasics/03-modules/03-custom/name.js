const name = {
  name: "wuug",
  printName() {
    console.log(this.name);
  },
};

const age = {
  age: 100,
};
// 以下两种暴露方法是相同的
module.exports = {
  name,
  age,
};
// 这里的exports指向 module.exports
exports.name = name;
exports.age = age;
