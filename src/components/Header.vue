<template>
  <div>
    <nav>
      <v-toolbar>
        <v-toolbar-title class="text-uppercase grey--text">
          <v-btn text color="grey" @click="redirectToAddMovie">Add movie</v-btn>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <span>
          <router-link :to="{name: 'movies'}">IMDB</router-link>
        </span>
        <v-spacer></v-spacer>
        <v-btn text color="grey" @click="emitLogout" v-if="authenticated">
          <span>Log Out</span>
        </v-btn>
      </v-toolbar>
    </nav>
    <br />
  </div>
</template>

<script>
export default {
  name: "Header",
  computed: {
    authenticated() {
      return this.$store.getters["user/isLoggedIn"];
    }
  },
  methods: {
    emitLogout() {
      this.$emit("logout");
    },
    redirectToAddMovie() {
      this.$router.push({ name: "add-movie" });
    }
  }
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
}
a:visited {
  color: black;
}
a:hover {
  text-shadow: 1px 1px grey;
}
</style>