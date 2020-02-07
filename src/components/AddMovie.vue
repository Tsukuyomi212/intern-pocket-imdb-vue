<template>
  <div class="center-content">
    <h1 class="title">Add new movie</h1>
    <v-app>
      <ValidationObserver>
        <v-form @submit.prevent="addMovieHandler">
          <Validation-provider rules="required" v-slot="{ errors, valid }">
            <v-combobox
              v-model="title"
              :error-messages="errors"
              :success="valid"
              label="Title"
              required
              :items="omdbMovies"
              item-value="Title"
              item-text="Title"
              @keydown="getOmdbMovies"
            ></v-combobox>
          </Validation-provider>
          <ValidationProvider rules="required" v-slot="{ errors, valid }">
            <v-text-field
              v-model="description"
              :error-messages="errors"
              :success="valid"
              label="Description"
              required
              type="text"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors, valid }">
            <v-text-field
              v-model="omdbPoster"
              :error-messages="errors"
              :success="valid"
              label="Image URL"
              required
              type="text"
            ></v-text-field>
          </ValidationProvider>
          <ValidationProvider rules="required" v-slot="{ errors, valid }">
            <v-select
              v-model="genre"
              :items="genres"
              item-value="id"
              item-text="name"
              :error-messages="errors"
              :success="valid"
              label="Select"
              required
            ></v-select>
          </ValidationProvider>
          <div class="buttons">
            <v-btn class="mr-4" type="submit">submit</v-btn>
            <v-btn class="mr-4" @click="cancel">cancel</v-btn>
          </div>
        </v-form>
      </ValidationObserver>
    </v-app>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import { debounce } from "debounce";

export default {
  name: "AddMovie",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data() {
    return {
      title: "",
      description: "",
      image_url: "",
      genre: "",
      error: null
    };
  },
  computed: {
    genres() {
      return this.$store.getters["movies/genres"];
    },
    omdbMovies() {
      return this.$store.getters["movies/omdbMovies"];
    },
    omdbTitle() {
      return this.title.Title;
    },
    omdbPoster: {
      get() {
        return typeof this.title === "string"
          ? this.image_url
          : this.title.Poster;
      },
      set(value) {
        this.image_url = value;
      }
    }
  },
  created() {
    this.fetchGenres();
  },
  methods: {
    async addMovieHandler() {
      try {
        await this.$store.dispatch("movies/addMovie", this.getMovieData());
        const newMovie = this.$store.getters["movies/movie"];
        this.$router.push({ name: "movie", params: { id: newMovie.id } });
      } catch (error) {
        this.error = error.message;
      }
    },
    getMovieData() {
      return {
        title: this.omdbTitle ? this.omdbTitle : this.title,
        description: this.description,
        image_url: this.omdbPoster,
        genre_id: this.genre
      };
    },
    fetchGenres() {
      return this.$store.dispatch("movies/fetchGenres");
    },
    cancel() {
      this.$router.push({ name: "movies" });
    },
    async getOmdbMovies(event) {
      const searchParam = event.target.value;
      return await debounce(
        this.$store.dispatch("movies/fetchMoviesFromOmdb", searchParam),
        750
      );
    }
  }
};
</script>
<style scoped>
.center-content {
  margin: 5% 15%;
}
.buttons {
  text-align: center;
  margin: 5%;
}
.title {
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px;
}
</style>