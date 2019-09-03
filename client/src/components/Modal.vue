<template>
  <div class="fixed flex justify-center items-center w-screen h-screen z-10">
    <div @click="$emit('close')" class="absolute w-screen h-screen z-40 bg-black opacity-50"></div>

    <div class="bg-white flex flex-col justify-center rounded w-full max-w-lg p-6 mx-3 z-50">
      <div v-if="token">
        <CartProduct
          class="mb-3"
          v-for="product in firstTwoProducts"
          :key="product._id"
          :product="product"
          :isFullWidth="false"
        />
      </div>

      <p v-else class="text-center text-xl font-bold mb-6">Please, log in to see your cart</p>

      <a
        @click="redirect"
        class="text-sm sm:text-base text-blue-700 border border-blue-500 rounded hover:bg-blue-500 hover:text-white cursor-pointer py-1 px-2"
        :class="[token ? 'ml-auto' : 'mx-auto']"
      >
        <span v-if="!token">Login</span>
        <span v-else-if="products.length < 3">Go to cart</span>
        <span v-else class="text-sm sm:text-base">View all ({{products.length - 2}} more)</span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CartProduct from './CartProduct';

export default {
  name: 'Modal',
  props: {
    products: {
      type: Array,
      required: true
    }
  },

  components: {
    CartProduct
  },

  computed: {
    ...mapGetters(['token']),

    firstTwoProducts() {
      if (this.products.length > 2) {
        return [this.products[0], this.products[0]];
      }

      return this.products;
    }
  },

  methods: {
    redirect() {
      this.$emit('close');
      if (this.token) {
        this.$router.push('/cart');
      } else {
        this.$router.push('/login');
      }
    }
  }
};
</script>
