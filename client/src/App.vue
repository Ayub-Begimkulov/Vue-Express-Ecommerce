<template>
  <div id="app">
    <header class="bg-white shadow flex items-center justify-between p-6">
      <h1 class="text-xl font-bold">
        <router-link to="/">Vue Ecommerce</router-link>
      </h1>
      <div class="flex items-center">
        <router-link to="/cart" class="relative hover:shadow mr-1">
          <img class="w-6 h-6 my-1 mx-2" src="./assets/images/cart.svg" alt="cart" />
        </router-link>
        <router-link
          to="/login"
          class="rounded hover:text-white hover:bg-blue-500 mr-1 px-2 py-1"
        >Login</router-link>
        <router-link
          to="/signup"
          class="rounded hover:text-white hover:bg-blue-500 px-2 py-1"
        >Signup</router-link>
      </div>
    </header>

    <div class="container mx-auto pt-8 pb-32 px-1">
      <router-view />
    </div>

    <footer
      class="absolute inset-x-0 bottom-0 flex justify-center items-center bg-white h-24"
    >Made by Ayub Begimkulov</footer>
  </div>
</template>

<script>
import './assets/css/main.css';

export default {
  name: 'App'
};
</script>