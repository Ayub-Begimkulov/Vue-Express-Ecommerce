<template>
  <div
    class="flex bg-white rounded hover:shadow-md-y"
    :class="{'mt-3 mx-3 sm:mx-8 sm:mt-8': isFullWidth}"
  >
    <router-link
      :to="`/products/${product.productId}`"
      class="block w-36"
      :class="{'sm:w-56': isFullWidth}"
    >
      <img :src="product.img" :alt="product.title" />
    </router-link>

    <div class="flex flex-1 flex-col p-3" :class="{'sm:p-6': isFullWidth}">
      <h3 class="font-bold mb-4">
        <router-link
          :to="`/products/${product.productId}`"
          class="hover:underline"
        >{{product.title}}</router-link>
      </h3>

      <div class="mb-2" :class="{'sm:mb-4': isFullWidth}">
        <span class="text-gray-700 text-sm pr-2 mb-2" :class="baseText">Amount:</span>

        <NumberSelect @change="updateAmount" :defaultValue="parseInt(amount)" />
      </div>

      <button
        @click="deleteFromCart(product._id)"
        class="self-start text-red-600 text-sm hover:text-red-700 inline underline"
        :class="baseText"
      >Delete</button>

      <div class="self-end text-sm font-bold mt-auto" :class="baseText">${{product.price * amount}}</div>
    </div>
  </div>
</template>

<script>
import NumberSelect from './NumberSelect';

export default {
  name: 'CartProduct',
  props: {
    product: {
      type: Object,
      required: true
    },
    isFullWidth: {
      type: Boolean,
      required: true
    }
  },

  components: {
    NumberSelect
  },

  data() {
    return {
      amount: this.product.amount
    };
  },

  computed: {
    baseText() {
      return {
        'sm:text-base': this.isFullWidth
      };
    }
  },

  methods: {
    deleteFromCart(id) {
      this.$store.dispatch('deleteFromCart', id);
    },

    updateAmount(amount) {
      this.amount = amount;
      this.$store.dispatch('updateAmount', { id: this.product._id, amount });
    }
  }
};
</script>
