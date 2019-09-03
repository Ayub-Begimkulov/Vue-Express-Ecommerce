<template>
  <div class="bg-white shadow rounded">
    <h2 class="bg-gray-700 text-white text-xl rounded-t font-bold p-3">Cart</h2>

    <div v-if="this.allProducts.length === 0" class="flex flex-col items-center p-3 sm:p-8">
      <img class="w-24 h-24 mb-8" src="../assets/images/cart.svg" alt="cart icon" />
      <p class="text-2xl font-bold mb-2">Your cart is empty</p>
      <router-link class="text-blue-600 hover:underline" to="/">Add items to the cart</router-link>
    </div>

    <div v-else>
      <CartProduct
        v-for="product in allProducts"
        :key="product._id"
        :product="product"
        :isFullWidth="true"
      />
      <div class="flex justify-end items-center border-t rounded-b p-4 mt-3 sm:mt-8">
        <p class="text-sm md:text-base">Total:</p>
        <h3 class="text-base md:text-lg font-bold ml-2">${{total}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartProduct from '../components/CartProduct';

export default {
  name: 'Cart',
  components: {
    CartProduct
  },

  computed: {
    ...mapGetters(['allProducts']),

    total() {
      return this.allProducts.reduce((a, b) => a + b.price, 0);
    }
  }
};
</script>