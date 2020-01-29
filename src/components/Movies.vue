<template>
  <div>
    <h1>Movies</h1>
    <div v-if="error">{{error}}</div>
    <ul>
      <li :key="movie.id" v-for="movie in movies">{{movie.title}}</li>
    </ul>
    <br />
    <div>
      <router-link to="/">Back to Home</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Movies",
  computed: {
    movies() {
      return this.$store.getters["movies/movies"];
    }
  },

  data() {
    return {
      error: null
    };
  },
  created() {
    if (this.$store.getters['user/token']) {
      this.fetchMovies();
    } else {
      this.error = 'No movies for you! :p';
    }
  },
  methods: {
    async fetchMovies() {
      return await this.$store.dispatch("movies/fetchMovies");
    }
  }
};
</script>