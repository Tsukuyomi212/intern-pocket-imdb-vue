import Vue from 'vue';

const register = ({ name, email, password, password_confirmation }) => {
  return Vue.axios
    .post("/auth/register", {
      name,
      email,
      password,
      password_confirmation
    })
    .then(req => {
      if (!req.data.token) {
        localStorage.removeItem('token');
        return;
      }
      const token = req.data.token;
      localStorage.setItem('token', token);
    })
    .catch((e) => {
      localStorage.removeItem('token');
      throw e;
    });
}


export const userService = {
  register,
};