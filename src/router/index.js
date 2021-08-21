import Vue from 'vue'
import VueRouter from 'vue-router'
import SiteTop from '../views/SiteTop.vue'
// ユーザー
import Register from '../views/User/Register.vue'
import Login from '../views/User/Login.vue'
import Thanks from '../views/User/Thanks.vue'
import Done from '../views/User/Done.vue'
import MyPage from '../views/User/MyPage.vue'
import ShopList from '../views/User/ShopList.vue'
import ShopDitail from '../views/User/ShopDitail.vue'

// オーナー
import OwnerRegister from '../views/Owner/OwnerRegister.vue'
import OwnerThanks from '../views/Owner/OwnerThanks.vue'
import OwnerLogin from '../views/Owner/OwnerLogin.vue'
import ShopRegister from '../views/Owner/ShopRegister.vue'
import OwnerPage from '../views/Owner/OwnerPage.vue'


Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: 'SiteTop',
    component: SiteTop,
  },
  {
    path: '/top',
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
  {
    path: '/owner/register',
    name: 'OwnerRegister',
    component: OwnerRegister
  },
  {
    path: '/owner/thanks',
    name: 'OwnerThanks',
    component: OwnerThanks
  },
  {
    path: '/owner/login',
    name: 'OwnerLogin',
    component: OwnerLogin
  },
  {
    path: '/owner/shop/register',
    name: 'ShopRegister',
    component: ShopRegister
  },
  {
    path: '/owner',
    name: 'OwnerPage',
    component: OwnerPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
