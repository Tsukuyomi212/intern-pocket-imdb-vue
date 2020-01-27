import Vue from 'vue';
import Vuex from 'vuex';
import {userService} from '../services/user-service';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    token: localStorage.getItem('token') || '',
    user: {}
  },
  mutations: {
    registerUser (state, user) {
      state.user = user;
    }
  },
  actions: {
    register ({commit}, userData) {
      return userService.register(userData)
      .then(() => {
       const user = {
          name: userData.name,
          email: userData.email,
          password: userData.password,
          confirmPassword: userData.confirmPassword
        }
        return user;
      }).then((user) => {
        commit('registerUser', user);
      })
    }
  },
  getters : {
    getUser (state) {
      return state.user;
    }
  }
});