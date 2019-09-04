<template>
  <AuthForm :isSignup="false" />
</template>

<script>
import AuthForm from '../components/AuthForm';

export default {
  name: 'Login',
  components: {
    AuthForm
  },

  beforeRouteLeave(to, from, next) {
    this.$store.dispatch('removeAuthErr');
    next();
  }
};
</script>
