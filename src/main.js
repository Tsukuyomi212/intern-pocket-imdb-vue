import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {store} from './store/store';
import axios from './vue-axios';
import Routes from './routes';
import Vuetify from 'vuetify/lib'
import vuetify from './plugins/vuetify';
import VeeValidate from "vee-validate";

Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(VeeValidate);

export const router = new VueRouter({
  mode: 'history',
  routes: Routes
})

new Vue({
  vuetify,
  router,
  axios,
  store,
  render: h => h(App)
}).$mount('#app')
