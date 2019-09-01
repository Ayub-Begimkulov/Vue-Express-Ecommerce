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
      name: 'Home',
      component: Home
    },

    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },

    {
      path: '/products/:id',
      name: 'Product',
      component: Product,
      props: true
    },

    {
      path: '/login',
      name: 'Login',
      component: Login
    },

    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
});
