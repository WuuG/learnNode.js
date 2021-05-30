import router from './index';
import { isAuth } from '../network/api/passport';

router.beforeEach(async (to, from, next) => {
  const res = await isAuth()
  if (res) {
    if (to.name === 'signin') {
      next('/')
    } else {
      next()
    }
  } else {
    next('/passport/signin')
  }
})