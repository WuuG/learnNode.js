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
const getUserList = () => {
  return axios.request({
    method: 'get',
    url: 'users/list'
  })
}
export {
  signupRequest,
  getUserList
}