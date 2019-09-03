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

          <NumberSelect @change="changeAmount" />
        </div>

        <button
          @click="addToCart"
          class="self-end lg:self-start bg-blue-500 hover:bg-blue-700 text-sm md:text-base text-white font-bold rounded px-4 py-1"
        >
          <span v-if="productIds.indexOf(product._id) === -1">Add to cart</span>
          <span v-else>Already in cart</span>
        </button>
      </div>

      <p v-if="err" class="text-red-600 mt-3">
        <router-link to="/login" class="underline mr-1">Log in</router-link>to add items to cart
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import NumberSelect from '../components/NumberSelect';

export default {
  name: 'Product',
  props: {
    productData: Object
  },

  components: {
    NumberSelect
  },

  data() {
    return {
      product: this.productData,
      amount: 1,
      err: false
    };
  },

  computed: mapGetters(['productIds', 'token']),

  created() {
    if (!this.product) {
      axios
        .get(`http://localhost:3000/api/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.product = data;
        });
    }
  },

  methods: {
    addToCart() {
      if (this.token) {
        this.$store.dispatch('addToCart', {
          productId: this.product._id,
          title: this.product.title,
          img: this.product.img,
          price: this.product.price,
          category: this.product.category,
          brand: this.product.brand,
          description: this.product.description,
          amount: this.amount
        });
      } else {
        this.err = true;
      }
    },

    changeAmount(amount) {
      this.amount = amount;
    }
  }
};
</script>