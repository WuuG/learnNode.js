import router from './index';
import { isAuth } from '../network/api/passport';

router.beforeEach(async (to, from, next) => {
  if (to.name != 'signin') {
    const res = await isAuth()
    if (res.status === 403) {
      next('/passport/signin')
    } else {
      next()
    }
  } else {
    next()
  }
})