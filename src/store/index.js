import Vue from 'vue';
import Vuex from 'vuex';
import movies from './movies';
import user from './user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    movies
  }
});