<template>
  <div class="bg-white shadow rounded">
    <h2 class="bg-gray-700 text-white text-xl rounded-t font-bold p-3">Cart</h2>
    <div class="p-8">
      <div v-show="this.products.length === 0" class="flex flex-col items-center">
        <img class="w-24 h-24 mb-8" src="../assets/images/cart.svg" alt="cart icon" />
        <p class="text-2xl font-bold mb-2">Your cart is empty</p>
        <router-link class="text-blue-600 hover:underline" to="/">Add items to the cart</router-link>
      </div>

      <div class="flex bg-white rounded hover:shadow-md-y p-6 mb-8">
        <div class="w-40">
          <img
            src="https://de9luwq5d40h2.cloudfront.net/catalog/product/large_image/43_41435100025.jpg"
            alt="product"
          />
        </div>
        <div class="flex flex-1 flex-col ml-6">
          <h3 class="font-bold mb-3">Product One</h3>
          <p class="mb-3">Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
          <select class="w-12 focus:outline-none p-1 mb-3">
            <option v-for="i in 10">{{i}}</option>
          </select>
          <button class="self-start text-blue-600 hover:text-red-600 inline underline">Delete</button>
          <div class="self-end font-bold">$1200</div>
        </div>
      </div>

      <div class="flex bg-white rounded hover:shadow-md-y p-6">
        <div class="w-40">
          <img
            src="https://de9luwq5d40h2.cloudfront.net/catalog/product/large_image/43_41435100025.jpg"
            alt="product"
          />
        </div>
        <div class="flex flex-1 flex-col ml-6">
          <h3 class="font-bold mb-3">Product One</h3>
          <p class="mb-3">Lorem ipsum dolor sit, amet consectetur adipisicing.</p>
          <select class="w-12 focus:outline-none p-1 mb-3">
            <option v-for="i in 10">{{i}}</option>
          </select>
          <button class="self-start text-blue-600 hover:text-red-600 inline underline">Delete</button>
          <div class="self-end font-bold">$1200</div>
        </div>
      </div>
    </div>

    <div class="flex justify-end items-center border-t rounded-b p-4">
      <p>Total:</p>
      <h3 class="text-lg font-bold ml-2">$2000</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      products: [1]
    };
  },

  computed: {
    total() {
      return this.products.reduce((a, b) => a + b.price, 0);
    }
  }
};
</script>