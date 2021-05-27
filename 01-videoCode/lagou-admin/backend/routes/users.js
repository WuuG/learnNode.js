var express = require('express');
var router = express.Router();

const { signup, list, removeUser } = require('../controllers/users')
/* GET users listing. */
router.post('/', signup);
router.get('/', list)
router.delete('/', removeUser)

module.exports = router;
