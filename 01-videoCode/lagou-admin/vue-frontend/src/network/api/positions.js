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
const modifyPosition = async (form) => {
  try {
    const { form: realForm } = new PosDatas(form)
    console.log(realForm);
    const result = await axios.request({
      method: 'patch',
      url: 'positions',
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: realForm
    })
    return result
  } catch (error) {
    return error
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

class ModifyFormFilter {
  constructor(form) {
    this.companyLogo = ''
    this.companyName = form.companyName
    this.companyLogoOld = form.companyLogo
    this.positionName = form.positionName
    this.city = form.city
    this.salary = form.salary
    this.id = form._id
  }
}

export default {
  list,
  add,
  deleteById,
  modifyPosition,
  ModifyFormFilter,
  PosDatas
}