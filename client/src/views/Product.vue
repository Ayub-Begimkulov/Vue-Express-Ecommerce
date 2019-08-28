<template>
  <div v-if="product" class="bg-white flex max-w-3.5xl mx-auto rounded shadow p-6">
    <div class="w-1/2">
      <img
        class="mb-4"
        src="https://de9luwq5d40h2.cloudfront.net/catalog/product/large_image/43_41435100025.jpg"
        alt="product"
      />
    </div>
    <div class="flex-1 ml-6">
      <h2 class="text-2xl mb-3">{{product.title}}</h2>
      <div class="text-xl font-bold mb-4">${{product.price}}</div>
      <h3 class="font-bold mb-3">Brand</h3>
      <p class="mb-4">{{product.brand}}</p>
      <h3 class="font-bold mb-3">Category</h3>
      <p class="mb-4">{{product.category}}</p>
      <h3 class="font-bold mb-3">Description</h3>
      <p class="mb-4">{{product.description}}</p>
      <h3 class="font-bold mb-3">Amount:</h3>
      <select class="focus:outline-none p-1 mb-4">
        <option v-for="i in 10">{{i}}</option>
      </select>
      <br />
      <button class="bg-indigo-700 text-white font-bold rounded px-4 py-1">Add to cart</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data() {
    return {
      product: null
    };
  },

  created() {
    fetch(`http://localhost:3000/api/products/${this.$route.params.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.product = data;
      });
  }
};
</script>