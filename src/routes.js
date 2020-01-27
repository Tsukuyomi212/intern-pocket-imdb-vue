import Register from './components/Register';
import Login from './components/Login';
import Home from './components/Home';

export default [
  {name: 'register', path: '/register', component: Register},
  {name: 'login', path: '/login', component: Login},
  {name: 'home', path: '/', component: Home}
];