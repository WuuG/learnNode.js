import axios from 'axios';


class NewAxios {
  constructor() {
    // 这里其实可以根据环境改的
    this.baseURL = '/api'
    this.timeout = 1000
    console.log(1);
  }

  setInterceptor(instance) {
    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
      // Do something before request is sent
      console.log(`请求拦截器,config`, config);
      return config;
    }, function (error) {
      // Do something with request error
      console.log('请求拦截器：发送的消息出现了错误');
      return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });
  }

  request(options) {
    const instance = axios.create();
    const config = {
      ...options,
      baseURL: this.baseURL,
      timeout: this.timeout,
    }
    this.setInterceptor(instance)
    return instance(config)
  }
}

export default new NewAxios()