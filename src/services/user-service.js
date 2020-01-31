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

const login = async ({email, password}) => {
  try {
    const req = await Vue.axios.post("/auth/login", { email, password })
    if (!req.data.token) {
      localStorage.removeItem('token');
      return;
    }
    Vue.axios.defaults.headers['Authorization'] = 'Bearer ' + req.data.token;
    localStorage.setItem('token', req.data.token);

    return req.data.token
  } catch(e) {
    localStorage.removeItem('token');
    throw e;
  }
}

const logout = async () => {
  try {
    await Vue.axios.post("/auth/logout")
    localStorage.removeItem('token');
  } catch (e) {
    throw e
  }
}


export const userService = {
  register,
  login,
  logout
};