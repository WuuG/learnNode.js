import Vue from 'vue'
import VueRouter from 'vue-router'
const Test = () => import('../views/Test.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/test'
  },
  {
    path: '/test',
    name: 'Test',
    component: Test
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
