import Vue from 'vue'
import VueRouter from 'vue-router'

const Test = () => import('@/views/Test.vue')
const User = () => import('@/views/user/User.vue')
const BaseTable = () => import('../components/content/BaseTable.vue')

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
  {
    path: '/user',
    name: 'User',
    component: User
  },
  {
    path: '/table',
    name: 'table',
    component: BaseTable
  },
  {
    path: '/base',
    name: 'base',
    component: Test,
    children: [
      {
        path: 'others',
        component: BaseTable
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
