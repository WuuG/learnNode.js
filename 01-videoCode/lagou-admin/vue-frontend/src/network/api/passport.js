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
    return data.data.data
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
  return res.data.data
}
const signin = async (form) => {
  try {
    const res = await axios.request({
      method: 'post',
      url: 'users/signin',
      data: form
    })
    console.log(res);
    const token = res.headers['x-access-token']
    localStorage.setItem('token', token)
    return res.data
  } catch (error) {
    console.log(error);
  }
}
const isAuth = async () => {
  try {
    if (!localStorage.getItem('token')) {
      return false
    }
    await axios.request({
      method: 'get',
      url: 'users/isAuth',
    })
    return true
  } catch (error) {
    return false
  }
}
const signout = async function () {
  const res = await axios.request({
    method: 'get',
    url: 'users/signout'
  })
  return res
}
export {
  signupRequest,
  getUserList,
  deleteUser,
  signin,
  isAuth,
  signout
}