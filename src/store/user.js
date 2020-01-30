import { userService } from '../services/user-service';

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
      return state.token.length > 0;
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
    async login({ commit }, userData) {
      const user = await userService.login(userData);
      commit('loginUser', user);
    }
  }
};