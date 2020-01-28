<template>
  <v-app>
    <v-card width="400px" class="mt-5 mx-a">
      <v-card-title class="pb-0">
        <h1>Register</h1>
      </v-card-title>
      <v-card-text>
        <ValidationObserver>
          <v-form @submit.prevent="registerHandler">
            <ValidationProvider rules="required|max:255|min:2" v-slot="{ errors, valid }">
              <v-text-field
                label="Name"
                v-model="name"
                :error-messages="errors"
                :success="valid"
                prepend-icon="mdi-account-circle"
                type="text"
              />
            </ValidationProvider>
            <ValidationProvider rules="required|email|max:255" v-slot="{ errors, valid }">
              <v-text-field
                label="E-mail"
                v-model="email"
                :error-messages="errors"
                :success="valid"
                prepend-icon="mdi-mail"
              />
            </ValidationProvider>
            <ValidationProvider rules="required|min:6" v-slot="{ errors, valid }" vid="password">
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
            <ValidationProvider rules="required|confirmed:password|min:6" v-slot="{ errors, valid }" data-vv-as="password">
              <v-text-field
                type="Password"
                label="Confirm Password"
                v-model="confirmPassword"
                :error-messages="errors"
                :success="valid"
                prepend-icon="mdi-lock"
                append-icon="mdi-eye-off"
              />
            </ValidationProvider>
            <v-divider></v-divider>
            <v-card-actions>
              <v-btn color="success" type="submit">Register</v-btn>
              <v-spacer></v-spacer>
              <v-btn color="info">Login</v-btn>
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
  name: "Register",
  components: {
    ValidationProvider,
    ValidationObserver
  },
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