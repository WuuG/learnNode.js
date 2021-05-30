import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入element-UI
import ElementUI from 'element-ui';
import './assets/css/element-variables.scss'

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

//引入路由导航
import './router/guard'