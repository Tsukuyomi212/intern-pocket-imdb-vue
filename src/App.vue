<template>
  <div>
    <Header v-on:logout="logout" />
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    Header
  },
  methods: {
    async logout() {
      await this.$store.dispatch("user/logout");
      this.$router.push({ name: "login" });
    }
  }
};
</script>
