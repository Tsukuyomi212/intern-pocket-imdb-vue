import { userService } from '../services/user-service';

import _isEmpty from 'lodash/isEmpty';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: {}
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return !_isEmpty(state.user)
    }
  },
  mutations: {
    registerUser(state, user) {
      state.user = user;
    },
    loginUser(state, user) {
      state.user = user;
    },
    logoutUser(state) {
      state.user = {};
    }
  },
  actions: {
    async register({ commit }, userData) {
      const user = await userService.register(userData);
      commit('registerUser', user);
    },
    async login({ commit }, userData) {
      const user = await userService.login(userData);
      commit('loginUser', user);
    },
    async logout({commit}) {
      await userService.logout();
      commit('logoutUser');
    }
  }
};