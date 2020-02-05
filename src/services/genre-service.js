import Vue from 'vue';

const getGenres = () => {
  return Vue.axios.get('/genres')
    .then(result => {
      return result.data;
    }).catch((error) => {
      throw error;
    });
}

export const genreService = {
  getGenres
}