import Register from './components/Register';
import Login from './components/Login';
import Movies from './components/Movies';
import Movie from './components/Movie'
import store  from './store/index';

export default [
  {name: 'register', path: '/register', component: Register},
  {name: 'login', path: '/login', component: Login},
  {name: 'movie', path: '/movies/:id', component: Movie},
  {name: 'movies', path: '/movies', component: Movies, beforeEnter: (to, from, next) => {
    if(!store.getters['user/isLoggedIn']) {
      next('/login');
    }
    next();
  }}
];