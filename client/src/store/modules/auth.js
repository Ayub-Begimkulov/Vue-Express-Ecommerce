import axios from 'axios';

const state = {
  token: localStorage.getItem('token'),
  authErr: null
};

const getters = {
  token: state => state.token,
  authErr: state => state.authErr
};

const actions = {
  login({ commit }, { email, password }) {
    axios
      .post(
        'http://localhost:3000/api/auth/login',
        {
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(({ data }) => {
        commit('setToken', data.token);
      })
      .catch(authErr => {
        commit('setErr', authErr.response.data.message);
      });
  },

  signup({ commit }, { firstName, lastName, email, password }) {
    axios
      .post(
        'http://localhost:3000/api/auth/signup',
        {
          firstName,
          lastName,
          email,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      .then(({ data }) => {
        commit('setToken', data.token);
      })
      .catch(authErr => {
        commit('setErr', authErr.response.data.message);
      });
  },

  logout({ commit }) {
    commit('removeToken');
  }
};
const mutations = {
  setToken: (state, token) => {
    localStorage.setItem('token', token);
    state.token = token;
    state.authErr = null;
  },

  setErr: (state, authErr) => {
    state.authErr = authErr;
  },

  removeToken: state => {
    localStorage.removeItem('token');
    state.token = null;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
