import router from './index';
import { isAuth } from '../network/api/passport';
import { Message } from 'element-ui';

router.beforeEach(async function (to, from, next) {
  const res = await isAuth()
  if (!res) {
    if (to.name === 'signin') {
      next()
    } else {
      Message({
        type: 'error',
        message: '请先登录'
      })
      next('/passport/signin')
    }
  } else {
    if (to.name === 'signin') {
      next('/')
    } else {
      next()
    }
  }
})