import { userService } from '../services/user-service';

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token') || '',
    user: null
  },
  getters: {
    user(state) {
      return state.user;
    },
    isLoggedIn(state) {
      return !!state.token
    }
  },
  mutations: {
    registerUser(state, user) {
      state.user = user;
    },
    loginUser(state, user) {
      state.user = user;
      state.token = user.token
    },
    logoutUser(state) {
      state.user = {};
      state.token = ''
    },
    updateUserToken(state, token) {
      state.token = token
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