import Vue from 'vue';
import axios from 'axios';

const omdbUrl = 'http://www.omdbapi.com/?apikey=812b968c&s=';

const getMovies = (url = '/movies') => {
  return Vue.axios.get(url)
    .then(result => {
      return result.data;
    }).catch((error) => {
      throw error;
    });
}

const getMovie = (id) => {
  return Vue.axios.get('/movies/' + id)
    .then(result => {
      return result.data;
    }).catch(error => {
      throw error;
    })
}

const addMovie = (newMovie) => {
  return Vue.axios.post('/movies', newMovie)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      throw error;
    });
}

const getMoviesFromOMDB = (searchParams) => {
  return axios.get(omdbUrl + searchParams).then(response => {
    return response.data;
  }).catch(error => {
    throw (error);
  })
}

export const movieService = {
  getMovies,
  getMovie,
  addMovie,
  getMoviesFromOMDB
};