import axios from '../request';

const signupRequest = (datas) => {
  axios.request({
    method: 'post',
    url: 'users',
    data: {
      ...datas
    }
  })
}
const getUserList = () => {
  return axios.request({
    method: 'get',
    url: 'users'
  })
}
export {
  signupRequest,
  getUserList
}