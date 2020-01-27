import { extend } from 'vee-validate';
import { required, email, max, min } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

extend("max", {
  ...max,
  message: "This field must be {length} characters or less"
});

extend("email", {
  ...email,
  message: "This field must be a valid email"
});

extend('min', {
  ...min,
  message: 'This field must be {length} characters or more'
});