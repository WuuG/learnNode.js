import axios from '../request';

const signupRequest = (datas) => {
  axios.request({
    method: 'post',
    url: 'api/users/signup',
    data: {
      ...datas
    }
  })
}

export { signupRequest }