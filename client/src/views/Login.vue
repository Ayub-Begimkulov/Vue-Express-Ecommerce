<template>
  <form @submit.prevent="login" class="bg-white shadow max-w-lg mx-auto rounded">
    <h3 class="text-xl text-gray-900 font-bold bg-gray-200 p-4">Login</h3>

    <div class="p-5">
      <label class="flex flex-col mb-4">
        Email
        <input class="border rounded px-3 py-1 mt-2" type="email" v-model="email" required />
      </label>

      <label class="flex flex-col mb-4">
        Password
        <input
          class="border rounded px-3 py-1 mt-2"
          type="password"
          v-model="password"
          required
        />
      </label>

      <button class="block w-full bg-indigo-700 text-white font-bold rounded px-4 py-2">Sign up</button>

      <div v-if="err" class="bg-red-600 text-white text-sm p-3 mt-4">{{err}}</div>
    </div>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      err: null
    };
  },

  methods: {
    login() {
      axios
        .post(
          'http://localhost:3000/api/auth/login',
          {
            email: this.email,
            password: this.password
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(({ data }) => {
          localStorage.setItem('token', data.token);
          this.$router.push('/');
        })
        .catch(err => {
          this.err = err.response.data.message;
        });
    }
  }
};
</script>
