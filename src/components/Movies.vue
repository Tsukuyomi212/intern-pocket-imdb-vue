<template>
  <div>
    <h1 class="centered-text">Movies</h1>
    <div v-if="error">{{error}}</div>
    <br />
    <div class="centered-text">
      <button v-on:click="fetchFirstPage" :disabled='pagination.currentPage == 1'>| first |</button>
      <button v-on:click="fetchPreviousPage" :disabled='pagination.currentPage == 1'>| previous |</button>
      <span>| {{pagination.currentPage}} |</span>
      <button v-on:click="fetchNextPage" :disabled='pagination.currentPage == pagination.lastPage'>| next |</button>
      <button v-on:click="fetchLastPage" :disabled='pagination.currentPage == pagination.lastPage'>| last |</button>
    </div>
    <br />
    <table>
      <tr class="centered-text">
        <th>#</th>
        <th>Movie Title</th>
      </tr>
      <tr :key="movie.id" v-for="movie in movies">
        <td class="centered-text">{{movie.id}}</td>
        <td class="movie-title">{{movie.title}}</td>
      </tr>
    </table>
    
    <br />
  </div>
</template>

<script>
export default {
  name: "Movies",
  data() {
    return {
      error: null
    };
  },
  computed: {
    movies() {
      return this.$store.getters["movies/movies"];
    },
    pagination() {
      return this.$store.getters["movies/pagination"];
    },
    authenticated() {
      return this.$store.getters["user/isLoggedIn"];
    }
  },
  created() {
      this.fetchMovies();
  },
  methods: {
    async fetchMovies() {
      try {
        return await this.$store.dispatch("movies/fetchInitial");
      } catch (error) {
      this.error = error.message;
    }
    },
   fetchNextPage() {
      return this.$store.dispatch('movies/fetchNextPage');
    },
    fetchLastPage() {
      return this.$store.dispatch('movies/fetchLastPage');
    },
    fetchPreviousPage() {
      return this.$store.dispatch('movies/fetchPreviousPage');
    },
    fetchFirstPage() {
      return this.$store.dispatch('movies/fetchFirstPage');
    }
  }
};
</script>
<style scoped>
  table, th, td {
  border: 1px solid black;
  }
  table {
    width: 100%
  }
  .centered-text {
    text-align: center;
  }
  .movie-title {
    padding-left: 5px;
  }
  button {
    color: green;
  }
  button:hover {
    color: white;
    background-color: green
  }
  button:disabled {
    color: grey;
    background-color: white;
  }
</style>