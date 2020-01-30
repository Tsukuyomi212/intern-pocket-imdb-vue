<template>
  <v-app>
    Home
    <router-link to='/movies'>See all movies</router-link>
  </v-app>
</template>

<script>
export default {
  name: "Home",
  computed: {
    authenticated() {
      return this.$store.getters['user/isLoggedIn'];
    }
  },
  created() {
    if (!this.authenticated) {
      this.$router.push({name: 'login'});
    }
  }
}
</script>