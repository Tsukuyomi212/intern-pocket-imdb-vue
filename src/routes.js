import Register from './components/Register';
import Login from './components/Login';
import Movies from './components/Movies';
import Home from './components/Home';

export default [
  {name: 'register', path: '/register', component: Register},
  {name: 'login', path: '/login', component: Login},
  {name: 'movies', path: '/movies', component: Movies},
  {name: 'home', path: '/', component: Home}
];