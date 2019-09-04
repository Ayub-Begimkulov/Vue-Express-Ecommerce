import axios from 'axios';

const to = promise => promise.then(data => [null, data]).catch(err => [err]);

const state = {
  token: localStorage.getItem('token'),
  authErr: null
};

const getters = {
  token: state => state.token,
  authErr: state => state.authErr
};

const actions = {
  login: async ({ commit }, { email, password }) => {
    const [err, res] = await to(
      axios.post(
        '/api/auth/login',
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
    );
    if (err) {
      commit('setErr', err.response.data.message);
    } else {
      commit('setToken', res.data.token);
    }
  },

  signup: async ({ commit }, { firstName, lastName, email, password }) => {
    const [err, res] = await to(
      axios.post(
        '/api/auth/signup',
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
    );
    if (err) {
      commit('setErr', err.response.data.message);
    } else {
      commit('setToken', res.data.token);
    }
  },

  logout: ({ commit }) => {
    commit('removeToken');
  },

  removeAuthErr: ({ commit }) => {
    commit('setErr', null);
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
