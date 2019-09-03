<template>
  <AuthForm :isSignup="false" />
</template>

<script>
import AuthForm from '../components/AuthForm';

export default {
  name: 'Login',
  components: {
    AuthForm
  }
};
</script>
