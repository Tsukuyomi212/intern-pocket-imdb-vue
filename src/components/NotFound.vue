<template>
  <div class="centered-text">
    <h1>Page Not Found</h1>
    <div>
      Proceed to
      <router-link :to="{name: 'login'}">login</router-link> <p>or</p>
      <p><router-link :to="{name: 'movies'}">IMDB home page</router-link></p>
    </div>
  </div>
</template>
<script>
export default {
  name: "NotFound"
};
</script>
<style scoped>
a {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
a:visited {
  color: black;
  font-weight: bold;
}
a:hover {
  color: grey;
}
.centered-text {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-size: 2em;
}
.text-margin {
  margin: 0 5px;
}
</style>