<template>
  <form @submit.prevent="signup" class="bg-white shadow max-w-lg mx-auto rounded">
    <h3 class="text-xl text-gray-900 font-bold bg-gray-200 p-4">Sign up</h3>

    <div class="p-5">
      <div class="flex">
        <label class="w-1/2 flex flex-col pr-1 mb-4">
          First name
          <input
            class="border rounded px-3 py-1 mt-2"
            type="text"
            v-model="firstName"
            required
          />
        </label>

        <label class="w-1/2 flex flex-col pl-1 mb-4">
          Last name
          <input
            class="border rounded px-3 py-1 mt-2"
            type="text"
            v-model="lastName"
            required
          />
        </label>
      </div>

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
  name: 'Signup',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      err: null
    };
  },

  methods: {
    signup() {
      axios
        .post(
          'http://localhost:3000/api/auth/signup',
          {
            firstName: this.firstName,
            lastName: this.lastName,
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
        })
        .catch(err => {
          this.err = err.response.data.message;
        });
    }
  }
};
</script>
