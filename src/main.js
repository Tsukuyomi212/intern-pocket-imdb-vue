import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {store} from './store/store';
import axios from './vue-axios';

Vue.config.productionTip = false
Vue.use(VueRouter);

export const router = new VueRouter({
  mode: 'history'
})

new Vue({
  router,
  axios,
  store,
  render: h => h(App),
}).$mount('#app')
