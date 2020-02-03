import Register from './components/Register';
import Login from './components/Login';
import Movies from './components/Movies';
import Movie from './components/Movie';
import NotFound from './components/NotFound';
import store from './store/index';

export default [
  { name: 'register', path: '/register', component: Register },
  { name: 'login', path: '/login', component: Login },
  {
    name: 'movies', path: '/movies', component: Movies, beforeEnter: (to, from, next) => {
      if (!store.getters['user/isLoggedIn']) {
        next('/login');
      }
      next();
    }
  },
  { name: 'movie', path: '/movies/:id', component: Movie },
  { path: '*', component: NotFound }
];