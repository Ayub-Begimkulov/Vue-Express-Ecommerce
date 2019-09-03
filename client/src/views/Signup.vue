<template>
  <AuthForm :isSignup="true" />
</template>

<script>
import AuthForm from '../components/AuthForm';

export default {
  name: 'Signup',
  components: {
    AuthForm
  }
};
</script>
