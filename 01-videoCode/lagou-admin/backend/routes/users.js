var express = require('express');
var router = express.Router();

const { signup, list, removeUser, signin, signout, isAuth } = require('../controllers/users')
const { auth } = require('../middlewares/auth')
/* GET users listing. */
router.post('/', auth, signup);
// 将auth放在list前，只有通过auth验证，才能进入list的路由
router.get('/', auth, list)
router.delete('/', auth, removeUser)

router.post('/signin', signin)
router.get('/signout', auth, signout)
router.get('/isAuth', isAuth)

module.exports = router;
