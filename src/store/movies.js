import { movieService } from '../services/movie-service';
import { genreService } from '../services/genre-service';

export default {
  namespaced: true,
  state: {
    movies: [],
    pagination: {},
    movie: {},
    genres: [],
    newMovie: {}
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
    },
    genres(state) {
      return state.genres
    },
    newMovie(state) {
      return state.newMovie;
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
    },
    setGenres(state, genres) {
      state.genres = genres;
    },
    setNewMovie(state, addedMovie) {
      state.movies = [...state.movies, addedMovie];
      state.newMovie = addedMovie;
    }
  },
  actions: {
    async fetchMovies({ commit }, url) {

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
    async fetchInitial({ dispatch }) {
      await dispatch('fetchMovies', undefined);
    },
    fetchNextPage({ dispatch, state }) {
      dispatch('fetchMovies', state.pagination.nextPageUrl);
    },
    fetchLastPage({ dispatch, state }) {
      dispatch('fetchMovies', state.pagination.lastPageUrl);
    },
    fetchPreviousPage({ dispatch, state }) {
      dispatch('fetchMovies', state.pagination.previousPageUrl);
    },
    fetchFirstPage({ dispatch, state }) {
      dispatch('fetchMovies', state.pagination.firstPageUrl);
    },
    async fetchMovie({ commit }, id) {
      const movie = await movieService.getMovie(id);
      commit('setMovie', movie);
    },
    searchMovies({ dispatch }, searchParam) {
      dispatch('fetchMovies', `/movies?title=${searchParam}`);
    },
    async fetchGenres({ commit }) {
      const genres = await genreService.getGenres();
      commit('setGenres', genres);
    },
    async addMovie({ commit }, newMovie) {
      const addedMovie = await movieService.addMovie(newMovie);
      commit('setNewMovie', addedMovie);
    }
  }
};