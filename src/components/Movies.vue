<template>
  <div class="center-content">
    <v-app>
      <div>
        <v-layout row wrap>
          <v-flex xs4 id="search-bar">
            <v-text-field
              @keyup="onChangeHandler"
              prepend-inner-icon="search"
              v-model="search"
              name="search"
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-select
            v-model="genre"
            :items="genres"
            item-value="name"
            item-text="name"
            class="select"
            @change="fetchMovies"
            label="Genre: "
          ></v-select>
        </v-layout>
        <h1 class="centered-text title">Movie Catalogue</h1>
        <div v-if="error">{{error}}</div>
        <div class="centered-text pagination-position">
          <v-btn @click="fetchFirstPage" :disabled="pagination.currentPage == 1">
            <i class="fas fa-angle-double-left"></i>
          </v-btn>
          <v-btn @click="fetchPreviousPage" :disabled="pagination.currentPage == 1">
            <i class="fas fa-angle-left"></i>
          </v-btn>
          <span class="page-num">{{pagination.currentPage}}</span>
          <v-btn @click="fetchNextPage" :disabled="pagination.currentPage == pagination.lastPage">
            <i class="fas fa-angle-right"></i>
          </v-btn>
          <v-btn @click="fetchLastPage" :disabled="pagination.currentPage == pagination.lastPage">
            <i class="fas fa-angle-double-right"></i>
          </v-btn>
        </div>
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr class="centered-text">
                <th>#</th>
                <th>Movie Title</th>
                <th>Genre</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="movie in movies" :key="movie.id">
                <td class="id-col centered-text">{{ movie.id }}</td>
                <td class="title-col centered-text">
                  <router-link :to="{name: 'movie', params: {id: movie.id}}">{{movie.title}}</router-link>
                </td>
                <td class="title-col centered-text">{{movie.genre.name}}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
        <br />
      </div>
    </v-app>
  </div>
</template>

<script>
import { debounce } from "debounce";
export default {
  name: "Movies",
  data() {
    return {
      error: null,
      search: "",
      genre: ""
    };
  },
  computed: {
    movies() {
      return this.$store.getters["movies/movies"](this.genre);
    },
    pagination() {
      return this.$store.getters["movies/pagination"];
    },
    authenticated() {
      return this.$store.getters["user/isLoggedIn"];
    },
    genres() {
      return ["all", ...this.$store.getters["movies/genres"]];
    }
  },
  created() {
    this.fetchMovies();
    this.fetchGenres();
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
      return this.$store.dispatch("movies/fetchNextPage");
    },
    fetchLastPage() {
      return this.$store.dispatch("movies/fetchLastPage");
    },
    fetchPreviousPage() {
      return this.$store.dispatch("movies/fetchPreviousPage");
    },
    fetchFirstPage() {
      return this.$store.dispatch("movies/fetchFirstPage");
    },
    onChangeHandler(event) {
      const searchParam = event.target.value;
      return debounce(
        this.$store.dispatch("movies/searchMovies", searchParam),
        750
      );
    },
    fetchGenres() {
      return this.$store.dispatch("movies/fetchGenres");
    }
  }
};
</script>
<style scoped>
table,
th,
td {
  border: 1px solid black;
}
tr,
td,
th {
  height: 40px;
}
table {
  width: 75%;
  margin: 10%;
}
.id-col {
  width: 50px;
}
.centered-text {
  text-align: center;
}
.title-col {
  font-size: 1.2em;
  text-transform: capitalize;
}
.title {
  text-transform: uppercase;
  margin: 20px 0;
}
.page-num {
  font-size: 1.1em;
  margin: 0 12px;
}
.center-content {
  margin: auto;
}
a {
  text-decoration: none;
  color: black;
}
a:visited {
  color: black;
}
button {
  margin: 0 5px;
}
.pagination-position {
  margin-bottom: 10px;
}
#search-bar {
  margin-left: 15px;
}
.movie-genre {
  float: right;
}
.select {
  margin: 10px;
}
</style>