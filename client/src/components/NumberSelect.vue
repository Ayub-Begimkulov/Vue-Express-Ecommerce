<template>
  <select
    @change="$emit('change', value)"
    class="w-12 focus:outline-none p-1"
    v-model.number="value"
  >
    <option v-for="i in range" :key="`option-${i}`">{{i}}</option>
  </select>
</template>

<script>
export default {
  name: 'NumberSelect',
  props: {
    range: {
      type: Number,
      default: 10
    },
    defaultValue: {
      type: Number,
      default: 1
    }
  },

  data() {
    return {
      value: this.defaultValue
    };
  },

  watch: {
    defaultValue(newVal) {
      this.value = newVal;
    }
  }
};
</script>
