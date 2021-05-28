var express = require('express');
var router = express.Router();

const { signup, list, removeUser, signin } = require('../controllers/users')
/* GET users listing. */
router.post('/', signup);
router.get('/', list)
router.delete('/', removeUser)

router.post('/signin', signin)

module.exports = router;
