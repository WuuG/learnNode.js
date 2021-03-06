import axios from 'axios';


class NewAxios {
  constructor() {
    // 这里其实可以根据环境改的
    this.baseURL = '/api'
    this.timeout = 1000
  }

  setInterceptor(instance) {
    // Add a request interceptor
    instance.interceptors.request.use(function (config) {
      // Do something before request is sent
      // console.log(`请求拦截器,config`, config);
      const token = localStorage.getItem('token')
      if (token) {
        config.headers['X-Access-Token'] = token
      }
      return config;
    }, function (error) {
      // Do something with request error
      console.log('请求拦截器：发送的消息出现了错误');
      return Promise.reject(error);
    });

    // Add a response interceptor
    instance.interceptors.response.use(function (response) {
      // console.log(`响应拦截器,config：`, response);
      return response
    }, function (error) {
      const status = error.response.status
      if (status === 403) {
        localStorage.removeItem('token')
        window.history.go(0)
      }
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