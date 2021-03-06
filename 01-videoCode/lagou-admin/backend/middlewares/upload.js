const multer = require('multer');
const mime = require('mime');
const { renderMessage, renderData } = require('../utils/tools');

const path = require('path');
const fs = require('fs')

// 全局filename变量，用来传递filename，并在数据库中进行存储
let filename = ''
// 数据存储的option
const storage = multer.diskStorage({
  // 数据存储位置
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads'))
  },
  // 自定义数据名
  filename: function (req, file, cb) {
    try {
      console.log(`accept file and Info:${file} `);
      const fileExt = mime.getExtension(file.mimetype)
      filename = file.fieldname + '-' + Date.now() + '.' + fileExt
      cb(null, filename)
    } catch (error) {
      console.error(`multer.diskStorage occur error ${error}`)
    }
  }
})
// 对上传图片内容进行限制
const limits = {
  fileSize: 200000,
  files: 1
}
// 对图片内容进行过滤
function fileFilter(req, file, cb) {
  const acceptType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
  if (acceptType.indexOf(file.mimetype) == -1) {
    cb(new Error('file type is not accpetable,should be png,jpg,jpeg,gif'))
    return false
  }
  // 过滤后，一定要调用成功，或者失败。
  cb(null, true)
}

// 调用multer，传入选项，并调用single函数，表示支队companyLogo这个属性进行处理
const upload = multer({ storage, limits, fileFilter }).single('companyLogo')

// 创建中间件
const uploadMiddleware = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      renderData(res, 'fail', err)
    } else if (err) {
      // An unknown error occurred when uploading.
      renderMessage(res, 'fail', err.message)
    } else {
      // Everything went fine.
      // 通过在req中自定义属性，将参数传递给下一个中间件
      req.companyLogo = filename
      filename = '' //为什么当companyLogo为空的时候，不会重新调用multer呢？而需要
      const { companyLogo, companyLogoOld } = req.body
      if (companyLogo === undefined) { // 如果有上传新的图片，就会被company属性会被multer接受，并且该属性会消失
        try {
          fs.unlinkSync(path.resolve(__dirname, `../public/uploads/${companyLogoOld}`))
        } catch (error) {
          console.error(`delete companyOldLogo error occured ${error}`);
        }
      }
      next()
    }
  })
}

module.exports = uploadMiddleware