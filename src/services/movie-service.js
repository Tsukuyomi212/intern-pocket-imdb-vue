import Vue from 'vue';

const getMovies = () => {
  return Vue.axios.get('/movies')
    .then(result => {
      return result.data;
    }).catch((error) => {
      throw error;
    });
}

export const movieService = {
  getMovies
};