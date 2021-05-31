//导入，并连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/lagou-admin', { useNewUrlParser: true, useUnifiedTopology: true });

// 添加数据库连接时的消息提示
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('数据库连接成功！！');
});



//设置用户的Schema
var UsersSchema = mongoose.Schema({
  username: String,
  password: String
});
// 定义Colletion：users，何其对应的schema
var Users = mongoose.model('users', UsersSchema)


// 设置positions的Schema
var positionsSchema = mongoose.Schema({
  companyName: String,
  pisitionsName: String,
  city: String,
  createTime: String,
  salary: String
})
var Positions = mongoose.model('Posiitons', positionsSchema)

//导出使用
module.exports = {
  Users,
  Positions
}