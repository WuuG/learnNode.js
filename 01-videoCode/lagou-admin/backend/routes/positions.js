const express = require('express');
const router = express.Router()

const { add, list, deleteByid } = require('../controllers/positions')

router.post('/', add)
router.get('/', list)
router.delete('/', deleteByid)

module.exports = router