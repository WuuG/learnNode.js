const multer = require('multer');
const path = require('path');
const mime = require('mime');
const { renderMessage, renderData } = require('../utils/tools');

let filename = ''
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/uploads'))
  },
  filename: function (req, file, cb) {
    const fileExt = mime.getExtension(file.mimetype)
    filename = file.fieldname + '-' + Date.now() + '.' + fileExt
    cb(null, filename)
  }
})
const limits = {
  fileSize: 200000,
  files: 1
}
function fileFilter(req, file, cb) {
  const acceptType = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif']
  if (acceptType.indexOf(file.mimetype) == -1) {
    cb(new Error('file type is not accpetable,should be png,jpg,jpeg,gif'))
    return false
  }
  cb(null, true)
}

const upload = multer({ storage, limits, fileFilter }).single('companyLogo')

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
      req.companyLogo = filename
      next()
    }
  })
}

module.exports = uploadMiddleware