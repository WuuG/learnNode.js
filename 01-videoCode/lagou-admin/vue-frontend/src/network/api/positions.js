import axios from '../request';

const list = async () => {
  try {
    const result = await axios.request({
      method: 'GET',
      url: 'positions'
    })
    return result
  } catch (error) {
    return error.response
  }
}

const add = async (form) => {
  try {
    const result = await axios.request({
      method: 'post',
      url: 'positions',
      data: form
    })
    return result
  } catch (error) {
    return error.response
  }
}

class PosDatas {
  constructor(form) {
    this.companyName = form.companyName
    this.city = form.city
    this.salary = form.salary
  }
}

export default {
  list,
  add,
  PosDatas
}