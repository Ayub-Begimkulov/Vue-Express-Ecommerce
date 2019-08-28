import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Cart from './views/Cart';
import Product from './views/Product';
import Login from './views/Login';
import Signup from './views/Signup';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },

    {
      path: '/product/:id',
      name: 'product',
      component: Product
    },

    {
      path: '/login',
      name: 'login',
      component: Login
    },

    {
      path: '/signup',
      name: 'signup',
      component: Signup
    }
  ]
});
