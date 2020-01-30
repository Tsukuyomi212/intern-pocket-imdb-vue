<template>
  <div>
    <nav>
      <v-toolbar>
        <v-toolbar-title class="text-uppercase grey--text">
          <span>IMDB</span>
        </v-toolbar-title>
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
      return this.$store.getters['user/isLoggedIn'];
    }
  },
  methods: {
    emitLogout() {
      this.$emit('logout');
    }
  }
};
</script>