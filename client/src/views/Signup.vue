<template>
  <AuthForm @submit="signup" :isSignup="true" :err="err" />
</template>

<script>
import AuthForm from '../components/AuthForm';
import axios from 'axios';

export default {
  name: 'Signup',
  components: {
    AuthForm
  },

  data() {
    return {
      err: null
    };
  },

  methods: {
    signup({ firstName, lastName, email, password }) {
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
          localStorage.setItem('token', data.token);
        })
        .catch(err => {
          this.err = err.response.data.message;
        });
    }
  }
};
</script>
