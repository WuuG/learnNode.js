import axios from '../request';

const signupRequest = (datas) => {
  axios.request({
    method: 'post',
    url: 'users/signup',
    data: {
      ...datas
    }
  })
}

export { signupRequest }