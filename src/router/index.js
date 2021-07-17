import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Thanks from '../views/Thanks.vue'
import Done from '../views/Done.vue'
import MyPage from '../views/MyPage.vue'
import ShopList from '../views/ShopList.vue'
import ShopDitail from '../views/ShopDitail.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'ShopList',
    component: ShopList,
    props: true
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: Thanks
  },
  {
    path: '/done',
    name: 'Done',
    component: Done
  },
  {
    path: '/mypage',
    name: 'MyPage',
    component: MyPage
  },
  {
    path: '/ditail',
    name: 'ShopDitail',
    component: ShopDitail
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
