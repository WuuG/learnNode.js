const express = require('express');
const router = express.Router()

const { add, list, deleteByid } = require('../controllers/positions');
const uploadMiddleware = require('../middlewares/upload');


router.post('/', uploadMiddleware, add)
router.get('/', list)
router.delete('/', deleteByid)

module.exports = router