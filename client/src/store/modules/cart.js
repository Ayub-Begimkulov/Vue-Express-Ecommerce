import axios from 'axios';

const state = {
  products: []
};

const getters = {
  allProducts: state => state.products,
  productIds: state => state.products.map(product => product.productId)
};

const actions = {
  fetchCartProducts: ({ commit }) => {
    axios
      .get('http://localhost:3000/api/cart', {
        headers: { 'x-access-token': localStorage.getItem('token') }
      })
      .then(({ data }) => {
        commit('setProducts', data);
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
  },

  deleteFromCart: ({ commit }, id) => {
    axios
      .delete(`http://localhost:3000/api/cart/${id}`, {
        headers: {
          'x-access-token': localStorage.getItem('token'),
          'Content-Type': 'application/json'
        }
      })
      .then(({ data }) => {
        commit('deleteFromCart', data);
      });
  },

  updateAmount({ commit }, { id, amount }) {
    axios
      .put(
        `http://localhost:3000/api/cart/${id}`,
        { amount },
        {
          headers: {
            'x-access-token': localStorage.getItem('token'),
            'Content-Type': 'application/json'
          }
        }
      )
      .then(({ data }) => {
        commit('updateAmount', { id, amount: data.amount });
      });
  }
};
const mutations = {
  setProducts: (state, data) => {
    state.products = data;
  },

  addToCart: (state, data) => {
    state.products.push(data);
  },

  deleteFromCart: (state, data) => {
    const index = state.products.indexOf(data);

    state.products.splice(index, 1);
  },

  updateAmount: (state, { id, amount }) => {
    state.products.map(product => {
      if (product._id === id) {
        product.amount = amount;
      }
    });
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
