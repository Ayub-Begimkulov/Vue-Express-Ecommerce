<template>
  <label class="block mb-4" :class="{'w-1/2': !isFullWidth}">
    {{label}}
    <input
      @input="$emit('input', content)"
      class="block w-full border rounded px-3 py-1 mt-2"
      :type="type"
      v-model="content"
      required
    />
  </label>
</template>

<script>
export default {
  name: 'FormInput',
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    isFullWidth: {
      type: Boolean,
      required: true
    }
  },

  data() {
    return {
      content: this.value
    };
  }
};
</script>
