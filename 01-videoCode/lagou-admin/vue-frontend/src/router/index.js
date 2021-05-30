import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('@/views/Home.vue')
const Test = () => import('@/views/Test.vue')
const User = () => import('@/views/user/User.vue')
const BaseTable = () => import('@/components/content/BaseTable.vue')
const Passport = () => import('@/views/passport/Passport.vue')
const Signin = () => import('@/views/passport/signin/Signin.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'home/User'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    redirect: 'home/user',
    children: [
      {
        path: 'test',
        name: 'test',
        component: Test
      },
      {
        path: 'user',
        name: 'user',
        component: User
      },
      {
        path: 'table',
        name: 'table',
        component: BaseTable
      },
      {
        path: 'base',
        name: 'base',
        component: Test,
        children: [
          {
            path: 'others',
            component: BaseTable
          }
        ]
      },
    ]
  },
  {
    path: '/passport',
    name: 'passport',
    component: Passport,
    redirect: 'passport/signin',
    children: [
      {
        path: 'signin',
        name: 'signin',
        component: Signin
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
