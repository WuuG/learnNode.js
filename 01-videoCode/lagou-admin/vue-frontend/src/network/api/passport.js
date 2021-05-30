import axios from '../request';

const signupRequest = async (datas) => {
  try {
    const response = await axios.request({
      method: 'post',
      url: 'users',
      data: {
        ...datas
      }
    })
    return response.data?.data?.data
  } catch (error) {
    return Promise.reject(error)
  }
}
const getUserList = async () => {
  try {
    const response = await axios.request({
      method: 'get',
      url: 'users'
    })
    return response?.data?.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const deleteUser = async (id) => {
  const response = await axios.request({
    method: 'delete',
    url: 'users',
    data: {
      id: id
    }
  })
  return response.data
}
const signin = async (form) => {
  const response = await axios.request({
    method: 'post',
    url: 'users/signin',
    data: form
  })
  return response.data
}
const isAuth = async () => {
  const response = await axios.request({
    method: 'get',
    url: 'users/isAuth',
  })
  return response
}
export {
  signupRequest,
  getUserList,
  deleteUser,
  signin,
  isAuth
}