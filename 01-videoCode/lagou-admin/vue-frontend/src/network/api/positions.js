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
  console.log(form);
  try {
    const result = await axios.request({
      method: 'post',
      url: 'positions',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: form
    })
    return result
  } catch (error) {
    return error.response
  }
}

const deleteById = async (id) => {
  try {
    const result = await axios.request({
      method: 'delete',
      url: 'positions',
      data: {
        id
      }
    })
    return result
  } catch (error) {
    return error.request
  }
}
class PosDatas {
  constructor(form) {
    this.form = new FormData()
    for (const propName in form) {
      this.form.append(propName, form[propName]);
    }
  }
}

export default {
  list,
  add,
  deleteById,
  PosDatas
}