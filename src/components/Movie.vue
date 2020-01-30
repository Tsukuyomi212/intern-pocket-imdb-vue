<template>
  <div>
    <h1>Movie page</h1>
    <div>{{this.movie.title}}</div>
    <div>{{this.movie.description}}</div>
    <div><img :src='this.movie.image_url' /></div>
  </div>
</template>

<script>
export default {
  name: 'Movie',
  computed: {
    movie() {
      return this.$store.getters['movies/movie'];
    }
  },
  created() {
    this.fetchMovie(this.$route.params.id);
  },
  methods: {
    async fetchMovie() {
      await this.$store.dispatch('movies/fetchMovie', this.$route.params.id);
    }
  }
}
</script>