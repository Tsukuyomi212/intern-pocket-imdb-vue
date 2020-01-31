import { movieService } from '../services/movie-service';

import _isEmpty from 'lodash/isEmpty'

export default {
  namespaced: true,
  state: {
    movies: [],
    pagination: {},
    movie: {}
  },
  getters: {
    movies(state) {
      return state.movies;
    },
    pagination(state) {
      return state.pagination;
    },
    movie(state) {
      return state.movie;
    }
  },
  mutations: {
    setMovies(state, movies) {
      state.movies = movies;
    },
    setPagination(state, pagination) {
      state.pagination = pagination;
    },
    setMovie(state, movie) {
      state.movie = movie;
    }
  },
  actions: {
    async fetchMovies({ commit, state }, url) {
      if (!_isEmpty(state.movies)) return

      const response = await movieService.getMovies(url);
      const movies = response.data;
      const pagination = {
        currentPage: response.current_page,
        lastPage: response.last_page,
        firstPageUrl: response.first_page_url,
        nextPageUrl: response.next_page_url,
        lastPageUrl: response.last_page_url,
        perPage: response.per_page,
        previousPageUrl: response.prev_page_url,
        from: response.from,
        to: response.to,
        total: response.total
      };
      commit('setPagination', pagination);
      commit('setMovies', movies);
    },
    async fetchInitial({dispatch}) {
      await dispatch('fetchMovies', undefined);
    },
    fetchNextPage({dispatch, state}) {
      dispatch('fetchMovies', state.pagination.nextPageUrl);
    },
    fetchLastPage({dispatch, state}) {
      dispatch('fetchMovies', state.pagination.lastPageUrl);
    },
    fetchPreviousPage({dispatch, state}) {
      dispatch('fetchMovies', state.pagination.previousPageUrl);
    },
    fetchFirstPage({dispatch, state}) {
      dispatch('fetchMovies', state.pagination.firstPageUrl);
    },
    async fetchMovie({commit}, id) {
      const movie = await movieService.getMovie(id);
      commit('setMovie', movie);
    }
  }
};