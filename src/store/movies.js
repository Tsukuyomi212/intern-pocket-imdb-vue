import { movieService } from '../services/movie-service';

export default {
  namespaced: true,
  state: {
    movies: []
  },
  getters: {
    movies(state) {
      return state.movies;
    }
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    }
  },
  actions: {
    async fetchMovies({ commit }) {
      const movies = await movieService.getMovies();
      commit('setMovies', movies);
    }
  }
};