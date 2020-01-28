<template>
  <v-app>
    <v-card width="400px" class="mt-5 mx-a">
      <v-card-title class="pb-0">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="loginHandler">
          <v-text-field label="E-mail" v-model="email" prepend-icon="mdi-mail" />
          <v-text-field
            type="Password"
            label="Password"
            v-model="password"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
          />
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="success" type="submit">Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info">Or Register</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: {
        message: ""
      }
    };
  },
  methods: {
    async loginHandler() {
      try {
        await this.$store.dispatch("login", this.getUserData());
        this.$router.push({ name: "home" });
        console.log('login ok');
      } catch (error) {
        this.error.message = error.message;
      }
    },
    getUserData() {
      return {
        email: this.email,
        password: this.password
      };
    }
  }
};
</script>