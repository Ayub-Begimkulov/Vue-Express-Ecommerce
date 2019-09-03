<template>
  <div class="md:flex">
    <div
      @click="showFilters = !showFilters"
      class="filters-toggle bg-white rounded-t flex justify-between items-center md:hidden text-lg font-bold p-4 md:p-6 mx-2"
      :class="{'rounded-b mb-8': !showFilters}"
    >
      Filters
      <svg
        class="fill-current h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
      >
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
      </svg>
    </div>

    <aside
      v-show="showFilters"
      class="filters bg-white self-start rounded-b md:rounded mx-2 mb-8 md:m-0 md:w-1/4 px-4 pb-4 md:p-6"
    >
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

          <div class="p-3 sm:p-6">
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
      },
      showFilters: false
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

<style>
@media (min-width: 768px) {
  .filters {
    display: block !important;
  }

  .filters-toggle {
    display: none;
  }
}
</style>
