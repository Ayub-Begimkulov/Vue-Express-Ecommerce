<template>
  <div id="app">
    <Modal v-show="showModal" :products="allProducts" @close="showModal = false" />

    <header class="bg-white shadow flex items-center justify-between px-3 py-4 sm:p-6">
      <h1 class="text-lg sm:text-xl font-bold">
        <router-link to="/">Vue Ecommerce</router-link>
      </h1>
      <div class="flex items-center">
        <button @click="openModal" class="rounded hover:shadow sm:mr-1">
          <img class="w-5 h-5 sm:w-6 sm:h-6 my-1 mx-2" src="./assets/images/cart.svg" alt="cart" />
        </button>
        <button
          v-if="token"
          @click="logout"
          class="text-sm sm:text-base rounded hover:text-white hover:bg-blue-500 px-2 py-1"
        >Logout</button>
        <div v-else>
          <router-link
            to="/login"
            class="text-sm sm:text-base rounded hover:text-white hover:bg-blue-500 sm:mr-1 px-2 py-1"
          >Login</router-link>
          <router-link
            to="/signup"
            class="text-sm sm:text-base rounded hover:text-white hover:bg-blue-500 px-2 py-1"
          >Signup</router-link>
        </div>
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
import { mapGetters } from 'vuex';
import Modal from './components/Modal';
import './assets/css/main.css';

export default {
  name: 'App',
  components: {
    Modal
  },

  data() {
    return {
      showModal: false
    };
  },

  computed: mapGetters(['allProducts', 'token']),

  created() {
    if (this.token) {
      this.$store.dispatch('fetchCartProducts');
    }
  },

  watch: {
    token(newVal) {
      if (newVal) {
        this.$store.dispatch('fetchCartProducts');
      }
    }
  },

  methods: {
    openModal() {
      if (this.$route.name !== 'Cart') {
        if (this.token && this.allProducts.length !== 0) {
          this.showModal = true;
        } else if (!this.token) {
          this.showModal = true;
        } else {
          this.$router.push('/cart');
        }
      }
    },

    logout() {
      this.$store.dispatch('logout');
    }
  }
};
</script>