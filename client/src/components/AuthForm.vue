<template>
  <form @submit.prevent="onSubmit" class="bg-white shadow max-w-lg mx-auto rounded">
    <h3 class="text-xl text-gray-900 font-bold bg-gray-200 p-4">
      <span v-if="isSignup">Signup</span>
      <span v-else>Login</span>
    </h3>

    <div class="p-5">
      <div v-if="isSignup" class="flex">
        <FormInput
          v-model="firstName"
          label="First name"
          type="text"
          :isFullWidth="false"
          class="pr-1"
        />

        <FormInput
          v-model="lastName"
          label="Last name"
          type="text"
          :isFullWidth="false"
          class="pl-1"
        />
      </div>

      <FormInput v-model="email" label="Email" type="email" :isFullWidth="true" />

      <FormInput v-model="password" label="Password" type="password" :isFullWidth="true" />

      <button class="block w-full bg-indigo-700 text-white font-bold rounded px-4 py-2">
        <span v-if="isSignup">Signup</span>
        <span v-else>Login</span>
      </button>

      <div v-if="authErr" class="bg-red-600 text-white text-sm p-3 mt-4">{{authErr}}</div>
    </div>
  </form>
</template>

<script>
import FormInput from './FormInput';
import { mapGetters } from 'vuex';

export default {
  name: 'AuthForm',
  props: {
    isSignup: {
      type: Boolean,
      required: true
    }
  },

  components: {
    FormInput
  },

  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    };
  },

  computed: mapGetters(['authErr']),

  methods: {
    onSubmit() {
      let promise;

      if (this.isSignup) {
        promise = this.$store.dispatch('signup', {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password
        });
      } else {
        promise = this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        });
      }

      promise.then(() => {
        if (!this.authErr) {
          this.$router.push('/');
        }
      });
    }
  }
};
</script>