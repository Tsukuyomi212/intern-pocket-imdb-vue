<template>
  <div>
    <router-link :to="{name: 'movies'}">Back to movies</router-link>
    <div>{{movie.title}}</div>
    <div>{{movie.description}}</div>
    <div><img :src='movie.image_url' /></div>
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