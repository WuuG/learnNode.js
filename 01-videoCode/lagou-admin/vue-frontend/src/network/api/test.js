import axios from '../request';

export function getTest() {

  axios.request().then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  })
}
