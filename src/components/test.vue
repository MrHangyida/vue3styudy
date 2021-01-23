<template>
  <div class="test">test Compomnet {{ msg }}</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'Test',
  props: {
    msg: {
      required: true,
      type: String,
    },
  },
  setup(props, context) {
    props.msg;
    context
  },
});
</script>
