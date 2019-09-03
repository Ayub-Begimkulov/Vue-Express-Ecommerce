<template>
  <AuthForm @submit="login" :isSignup="false" :err="err" />
</template>

<script>
import AuthForm from '../components/AuthForm';
import axios from 'axios';

export default {
  name: 'Login',
  components: {
    AuthForm
  },

  data() {
    return {
      err: null
    };
  },

  methods: {
    login({ email, password }) {
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
