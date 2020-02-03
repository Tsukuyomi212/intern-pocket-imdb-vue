<template>
  <div class="center-content">
    <h1 class="centered-text title">Movie Catalogue</h1>
    <div v-if="error">{{error}}</div>
    <br />
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">#</th>
            <th class="text-left">Movie Title</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movie in movies" :key="movie.id">
            <td class="id-col centered-text">{{ movie.id }}</td>
            <td class="title-col">
              <router-link :to="{name: 'movie', params: {id: movie.id}}">{{movie.title}}</router-link>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <br />
    <div class="centered-text">
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
  </div>
</template>

<script>
export default {
  name: "Movies",
  data() {
    return {
      headers: [
        {
          sortable: false,
          text: "#",
          value: "movie.id"
        },
        {
          sortable: false,
          text: "Title",
          value: "movie.title"
        }
      ],
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
table {
  width: 100%;
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
  margin: 0 10px;
}
.center-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
</style>