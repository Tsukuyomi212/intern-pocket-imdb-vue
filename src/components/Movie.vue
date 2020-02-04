<template>
  <div class="centered-text">
    <div class="movie-title">{{movie.title}}</div>
    <div class="subtitle">{{movie.genre.name}}</div>
    <div class="image">
      <img :src="movie.image_url" alt="movie poster" />
    </div>
    <div class="movie-description">{{movie.description}}</div>
    <br />
    <router-link :to="{name: 'movies'}">Back to movies</router-link>
  </div>
</template>

<script>
export default {
  name: "Movie",
  computed: {
    movie() {
      return this.$store.getters["movies/movie"];
    }
  },
  created() {
    this.fetchMovie(this.$route.params.id);
  },
  methods: {
    async fetchMovie() {
      await this.$store.dispatch("movies/fetchMovie", this.$route.params.id);
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: grey;
}
a:visited {
  color: grey;
}
a:hover {
  color: black;
}
.centered-text {
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.movie-title {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 2em;
  text-transform: uppercase;
}
.subtitle {
  font-size: 1em;
}
.movie-description {
  font-size: 1.2em;
  margin-bottom: 30px;
}
.image {
  margin: 10px 0;
}
img {
  max-height: 250px;
}
</style>