import Vue from 'vue'
import VueRouter from 'vue-router';
import Vuetify from 'vuetify/lib'
import vuetify from './plugins/vuetify';

import App from './App.vue'
import axios from './vue-axios';
import Routes from './routes';
import store  from './store/index';
import "./vee-validate";

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuetify);

export const router = new VueRouter({
  mode: 'history',
  routes: Routes
});

new Vue({
  vuetify,
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
