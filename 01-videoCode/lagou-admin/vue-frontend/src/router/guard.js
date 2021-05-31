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
  const res = await isAuth()
  if (res) {
    to.name === 'signin' ? next('/') : next()
  } else {
    to.name === 'signin' ? next() : next('/passport/signin')
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