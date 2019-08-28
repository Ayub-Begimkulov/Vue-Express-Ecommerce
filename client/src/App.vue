<template>
  <div id="app">
    <header class="bg-white shadow flex items-center justify-between p-6">
      <h1 class="text-xl font-bold">
        <router-link to="/">Vue Ecommerce</router-link>
      </h1>
      <div class="flex items-center">
        <router-link to="/cart" class="hover:shadow">
          <img class="w-6 h-6 my-2 mx-4" src="./assets/images/cart.svg" alt="cart" />
        </router-link>
        <router-link to="/login" class="hover:shadow px-4 py-2">Login</router-link>
        <router-link to="/signup" class="hover:shadow px-4 py-2">Signup</router-link>
      </div>
    </header>

    <div class="container mx-auto py-8 px-1">
      <router-view />
    </div>

    <footer class="bg-white text-center p-10">Made by Ayub Begimkulov</footer>
  </div>
</template>

<script>
import './assets/css/main.css';

export default {
  name: 'App'
};
</script>