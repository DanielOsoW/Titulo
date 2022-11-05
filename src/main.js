import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store'
import VueCookies from 'vue-cookies'
import VueApexCharts from 'vue-apexcharts'
import * as XLSX from 'xlsx'
import * as VuePrismEditor from "vue-prism-editor"

Vue.config.productionTip = false

const axiosInstance = axios.create({ 
  baseURL: 'http://188.166.39.234:8081/'
})

//Para acceder a axios desde this.$http.
Vue.prototype.$http = axiosInstance;

axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token');

Vue.use(VueCookies);
Vue.$cookies.config({httpOnly: true})
Vue.component('apex-chart', VueApexCharts)
Vue.component("prism-editor", VuePrismEditor)
new Vue({
  vuetify,
  router,
  axios,
  VueAxios,
  store,
  XLSX,
  VueApexCharts,
  VuePrismEditor,
  render: h => h(App)
}).$mount('#app')
