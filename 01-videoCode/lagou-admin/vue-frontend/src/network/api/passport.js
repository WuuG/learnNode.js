import axios from '../request';

const signupRequest = async (datas) => {
  try {
    const data = await axios.request({
      method: 'post',
      url: 'users',
      data: {
        ...datas
      }
    })
    return data.data?.data
  } catch (error) {
    return Promise.reject(error)
  }
}
const getUserList = async () => {
  try {
    const data = await axios.request({
      method: 'get',
      url: 'users'
    })
    return data?.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const deleteUser = async (id) => {
  const res = await axios.request({
    method: 'delete',
    url: 'users',
    data: {
      id: id
    }
  })
  return res.data
}
const signin = async (form) => {
  const res = await axios.request({
    method: 'post',
    url: 'users/signin',
    data: form
  })
  return res
}
const isAuth = async () => {
  const res = await axios.request({
    method: 'get',
    url: 'users/isAuth',
  })
  if (res) {
    return true
  } else {
    return false
  }
}
const signout = async () => {
  const res = await axios.request({
    method: 'get',
    url: 'users/signout'
  })
}
export {
  signupRequest,
  getUserList,
  deleteUser,
  signin,
  isAuth
}