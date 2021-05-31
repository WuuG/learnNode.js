import router from './index';
import { Message } from 'element-ui';
import { isAuth } from '../network/api/passport';

router.beforeEach(async function (to, from, next) {
  const token = localStorage.getItem('token')
  if (token) {
    handleHasToken(to, from, next)
  } else {
    handelWithoutToken(to, from, next)
  }
})

const handleHasToken = async (to, from, next) => {
  try {
    await isAuth()
    if (to.name != 'signin') {
      next()
    }
    next('/home/user')
  } catch (error) {
    console.log(2);
    console.log(error);
  }
}

const handelWithoutToken = (to, form, next) => {
  if (to.name === 'signin') {
    next()
  } else {
    Message({
      type: 'error',
      message: '请先登录!'
    })
    next('/passport/signin')
  }
}