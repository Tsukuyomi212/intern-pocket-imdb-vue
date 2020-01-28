import Vue from 'vue';
import Vuex from 'vuex';
import { userService } from '../services/user-service';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: {}
  },
  getters: {
    getUser(state) {
      return state.user;
    }
  },
  mutations: {
    registerUser(state, user) {
      state.user = user;
    },
    loginUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async register({ commit }, userData) {
      const user = await userService.register(userData);
      commit('registerUser', user);
    },
    async login({commit}, userData) {
      const user = await userService.login(userData);
      commit('loginUser', user);
    }
  }
});