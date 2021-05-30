var express = require('express');
var router = express.Router();

const { signup, list, removeUser, signin } = require('../controllers/users')
const { auth } = require('../middlewares/auth')
/* GET users listing. */
router.post('/', signup);
// 将auth放在list前，只有通过auth验证，才能进入list的路由
router.get('/', auth, list)
router.delete('/', removeUser)

router.post('/signin', signin)

module.exports = router;
