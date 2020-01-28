<template>
  <div>
    <h1>Movies</h1>
    <ul>
      <li :key="movie.id" v-for="movie in movies">
        {{movie.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import {movieService} from '../services/movie-service';
export default {
  name: 'Movies',
  data() {
    return {
      movies: [],
      error: ''
    }
  },
  created() {
    if(this.$store.state.token.length > 0) {
      movieService.getMovies().then(data => {
        this.movies = [...data];
      }).catch(error => {
        this.error = error.message;
      })
    } else {
      this.movies = ['You have to log in to see the movies'];
    }
  }
}
</script>