const express = require('express');
const router = express.Router()

const { add, list } = require('../controllers/positions')

router.post('/', add)
router.get('/', list)

module.exports = router