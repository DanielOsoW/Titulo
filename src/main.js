import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

const axiosInstance = axios.create({ 
  baseURL: 'http://127.0.0.1:8081'
})

//Para acceder a axios desde this.$http
Vue.prototype.$http = axiosInstance;

axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

new Vue({
  vuetify,
  router,
  axios,
  VueAxios,
  render: h => h(App)
}).$mount('#app')
