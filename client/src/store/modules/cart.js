import axios from 'axios';

const state = {
  products: []
};

const getters = {
  allProducts: state => state.products,
  productIds: state => state.products.map(product => product._id)
};

const actions = {
  fetchProducts: ({ commit }) => {
    axios
      .get('http://localhost:3000/api/cart', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      })
      .then(({ data }) => {
        commit('updateProducts', data);
      });
  },

  addToCart: ({ commit }, data) => {
    axios
      .post('http://localhost:3000/api/cart', data, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
      .then(({ data }) => {
        commit('addToCart', data);
      });
  }
};
const mutations = {
  updateProducts: (state, data) => {
    state.products = data;
  },

  addToCart: (state, data) => {
    state.products.push(data);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
