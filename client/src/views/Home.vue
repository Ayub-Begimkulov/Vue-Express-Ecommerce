<template>
  <div class="md:flex">
    <aside class="bg-white self-start rounded mx-2 mb-8 md:m-0 md:w-1/4 p-6">
      <div class="flex md:block">
        <div class="w-1/2 md:w-full">
          <h3 class="text-lg mb-4">Categories</h3>
          <label
            v-for="(category, index) in categories"
            :key="`category-${index}`"
            class="flex items-center mb-2"
          >
            <input
              class="mr-2"
              type="checkbox"
              :value="category"
              v-model="filtersApplied.categories"
            />
            {{category}}
          </label>
        </div>

        <div class="w-1/2 md:w-full">
          <h3 class="text-lg mb-4 md:my-4">Brands</h3>
          <label
            v-for="(brand, index) in brands"
            :key="`brand-${index}`"
            class="flex items-center mb-2"
          >
            <input class="mr-2" type="checkbox" :value="brand" v-model="filtersApplied.brands" />
            {{brand}}
          </label>
        </div>
      </div>

      <h3 class="text-lg my-4">Price</h3>
      <select class="focus:outline-none p-1" v-model="priceSorting">
        <option value>None</option>
        <option>Low to high</option>
        <option>High to low</option>
      </select>
    </aside>

    <div class="md:w-3/4 flex flex-wrap">
      <div
        v-for="product in filteredProducts"
        :key="product._id"
        class="w-1/2 xl:w-1/3 px-2 md:pl-5 mb-5"
      >
        <router-link
          :to="{ name: 'Product', params: {id: product._id, productData: product}}"
          class="block bg-white rounded shadow hover:shadow-md-y"
        >
          <img :src="product.img" alt="product" />

          <div class="p-4 sm:p-6">
            <h3 class="font-bold hover:underline mb-3">{{product.title}}</h3>
            <div class="font-bold mb-3 sm:mb-0">${{product.price}}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      products: [],
      priceSorting: '',
      filtersApplied: {
        brands: [],
        categories: []
      }
    };
  },

  computed: {
    brands() {
      return this.getAllPropsFromObjectArray(this.products, 'brand');
    },

    categories() {
      return this.getAllPropsFromObjectArray(this.products, 'category');
    },

    filteredProducts() {
      let products;

      if (this.filtersApplied.length === 0) {
        products = this.products;
      } else {
        products = this.products.filter(({ brand, category }) => {
          if (
            (this.filtersApplied.brands.length === 0 ||
              this.filtersApplied.brands.indexOf(brand) !== -1) &&
            (this.filtersApplied.categories.length === 0 ||
              this.filtersApplied.categories.indexOf(category) !== -1)
          ) {
            return true;
          }
        });
      }
      if (this.priceSorting === 'Low to high') {
        products.sort((a, b) => a.price - b.price);
      } else if (this.priceSorting === 'High to low') {
        products.sort((a, b) => b.price - a.price);
      }

      return products;
    }
  },

  created() {
    axios.get('http://localhost:3000/api/products').then(({ data }) => {
      this.products = data;
    });
  },

  methods: {
    getAllPropsFromObjectArray(arr, prop) {
      const items = [];

      arr.forEach(item => {
        if (items.indexOf(item[prop]) === -1) {
          items.push(item[prop]);
        }
      });

      return items;
    }
  }
};
</script>
