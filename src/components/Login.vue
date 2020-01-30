<template>
  <v-app>
    <v-card width="400px" class="mt-5 mx-a">
      <v-card-title class="pb-0">
        <h1>Login</h1>
      </v-card-title>
      <v-card-text>
        <ValidationObserver>
          <v-form @submit.prevent="loginHandler">
            <ValidationProvider rules="required|email|max:255" v-slot="{ errors, valid }">
              <v-text-field
                label="E-mail"
                v-model="email"
                :error-messages="errors"
                :success="valid"
                prepend-icon="mdi-mail"
              />
            </ValidationProvider>
            <ValidationProvider rules="required|min:6" v-slot="{ errors, valid }">
              <v-text-field
                type="Password"
                label="Password"
                v-model="password"
                :error-messages="errors"
                :success="valid"
                prepend-icon="mdi-lock"
                append-icon="mdi-eye-off"
              />
            </ValidationProvider>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="success" type="submit">Login</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info">Or Register</v-btn>
            </v-card-actions>
          </v-form>
        </ValidationObserver>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  name: "Login",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      email: "",
      password: "",
      error: {
        message: ""
      }
    };
  },
  computed: {
    authenticated() {
      return this.$store.getters["user/isLoggedIn"];
    }
  },
  created() {
    if (this.authenticated) {
      this.$router.push({ name: "home" });
    }
  },
  methods: {
    async loginHandler() {
      try {
        await this.$store.dispatch("user/login", this.getUserData());
        this.$router.push({ name: "home" });
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