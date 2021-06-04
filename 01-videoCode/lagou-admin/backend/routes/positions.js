const express = require('express');
const router = express.Router()

const { add, list, deleteByid, update } = require('../controllers/positions');
const uploadMiddleware = require('../middlewares/upload');


router.post('/', uploadMiddleware, add)
router.get('/', list)
router.delete('/', deleteByid)
router.patch('/', uploadMiddleware, update)

module.exports = router