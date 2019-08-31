<template>
  <div
    v-if="product"
    class="bg-white flex flex-col sm:flex-row max-w-3.5xl mx-auto rounded shadow p-4 sm:p-6"
  >
    <div class="sm:w-1/2">
      <img class="mb-3 sm:mb-0" :src="product.img" alt="product" />
    </div>
    <div class="flex-1 sm:ml-6">
      <h2 class="text-xl md:text-2xl mb-3">{{product.title}}</h2>
      <div class="text-lg md:text-xl font-bold mb-3 sm:mb-4">${{product.price}}</div>

      <div class="flex lg:flex-col mb-3 md:mb-4">
        <div class="w-1/2 lg:mb-4">
          <h3 class="font-bold mb-2 md:mb-3">Brand</h3>
          {{product.brand}}
        </div>
        <div class="w-1/2">
          <h3 class="font-bold mb-2 md:mb-3">Category</h3>
          {{product.category}}
        </div>
      </div>

      <h3 class="font-bold mb-2 md:mb-3">Description</h3>
      <p class="mb-3 md:mb-4">{{product.description}}</p>

      <div class="flex lg:flex-col items-start">
        <div class="w-1/2 lg:w-full lg:mb-4">
          <h3 class="font-bold mb-3">Amount:</h3>
          <select class="focus:outline-none p-1">
            <option v-for="i in 10">{{i}}</option>
          </select>
        </div>

        <button
          class="self-end lg:self-start bg-blue-500 hover:bg-blue-700 text-white font-bold rounded px-4 py-1"
        >
          <span v-if="!productIds.includes(product._id)">Add to cart</span>
          <span v-else>Already in cart</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';

export default {
  name: 'Product',
  props: {
    productData: Object
  },

  data() {
    return {
      product: this.productData
    };
  },

  computed: mapGetters(['productIds']),

  created() {
    if (!this.product) {
      axios
        .get(`http://localhost:3000/api/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.product = data;
        });
    }
  }
};
</script>