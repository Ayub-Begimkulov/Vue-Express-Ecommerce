<template>
  <div class="md:flex">
    <div class="bg-white self-start rounded mx-2 mb-8 md:m-0 md:w-1/4 p-6">
      <h3 class="uppercase mb-4">Categories</h3>
      <label
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        class="flex items-center mb-2"
      >
        <input class="mr-2" type="checkbox" :value="category" v-model="filtersApplied.categories" />
        {{category}}
      </label>

      <h3 class="uppercase my-4">Brands</h3>
      <label
        v-for="(brand, index) in brands"
        :key="`brand-${index}`"
        class="flex items-center mb-2"
      >
        <input class="mr-2" type="checkbox" :value="brand" v-model="filtersApplied.brands" />
        {{brand}}
      </label>

      <h3 class="uppercase my-4">Price</h3>
      <select class="focus:outline-none p-1" v-model="priceSorting">
        <option value>None</option>
        <option>Low to high</option>
        <option>High to low</option>
      </select>
    </div>

    <div class="md:w-3/4 flex flex-wrap">
      <div v-for="product in filteredProducts" class="w-1/2 xl:w-1/3 px-2 md:pl-5 mb-5">
        <div class="bg-white rounded hover:shadow-md p-6">
          <router-link :to="`/product/${product._id}`">
            <img
              class="mb-4"
              src="https://de9luwq5d40h2.cloudfront.net/catalog/product/large_image/43_41435100025.jpg"
              alt="product"
            />
          </router-link>
          <h3 class="font-bold hover:underline mb-3">
            <router-link :to="`/product/${product._id}`">{{product.title}}</router-link>
          </h3>
          <p>{{product.description}}</p>
          <div class="flex justify-between items-center my-3">
            <div class="font-bold">${{product.price}}</div>
            <button class="bg-indigo-700 text-white font-bold rounded px-4 py-1">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
    fetch('http://localhost:3000/api/products')
      .then(res => res.json())
      .then(data => {
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
