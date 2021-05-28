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
    return data?.data
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
  const result = await axios.request({
    method: 'delete',
    url: 'users',
    data: {
      id: id
    }
  })
  return result
}
export {
  signupRequest,
  getUserList,
  deleteUser
}