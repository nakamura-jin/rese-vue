import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import axios from 'axios'
import firebase from 'firebase'


// axios
Vue.prototype.$axios = axios

// font awesome
library.add(fas)

Vue.component('fa', FontAwesomeIcon)

Vue.config.productionTip = false

// firebase
const Config = {
  apiKey: "AIzaSyAtDFkC3GGdgFRPI6gc3bMdQHdv9g88nuU",
  authDomain: "rese-3fa68.firebaseapp.com",
  projectId: "rese-3fa68",
  storageBucket: "rese-3fa68.appspot.com",
  messagingSenderId: "296410653533",
  appId: "1:296410653533:web:53782d3ee3e61b58d33eb4",
  measurementId: "G-XV67D2MJS4"
};

firebase.initializeApp(Config);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


