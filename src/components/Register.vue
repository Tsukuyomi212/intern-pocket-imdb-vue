<template>
  <v-app>
    <v-card width="400px" class="mt-5 mx-a">
      <v-card-title class="pb-0">
        <h1>Register</h1>
      </v-card-title>
      <v-card-text>
        <v-form @submit.prevent="registerHandler">
          <v-text-field label="Name" v-model="name" prepend-icon="mdi-account-circle" />
          <v-text-field label="E-mail" v-model="email" prepend-icon="mdi-mail" />
          <v-text-field
            type="Password"
            label="Password"
            v-model="password"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
          />
          <v-text-field
            type="Password"
            label="Confirm Password"
            v-model="confirmPassword"
            prepend-icon="mdi-lock"
            append-icon="mdi-eye-off"
          />
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="success" type="submit">Register</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="info">Login</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: {
        title: "",
        message: ""
      }
    };
  },
  methods: {
    async registerHandler() {
      try {
        await this.$store.dispatch("register", this.getUserData());
        this.$router.push({ name: "login" });
      } catch (error) {
        this.error.title = "Register Error";
        this.error.message = error.message;
      }
    },
    getUserData() {
      return {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.confirmPassword
      };
    }
  }
};
</script>