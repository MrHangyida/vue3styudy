<template>
  <div class="dialog" id="dialog" v-if="isOpen">
    <h1>{{ title }}</h1>
    <p><slot name="dialog" :data="authorTwo">this is a dialog</slot></p>
    <div class="footer">
      <button @click="closeDialog">close</button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
export default defineComponent({
  name: 'Dialog-test',
  props: {
    title: String,
    isOpen: Boolean,
  },
  emits: {
    closeDialog: null,
  },
  setup(props, context) {
    const authorTwo = ref('H-yiDa');
    const closeDialog = () => {
      context.emit('closeDialog', false);
    };
    return {
      closeDialog,
      authorTwo,
    };
  },
});
</script>
<style lang="scss">
.dialog {
  width: 500px;
  height: 200px;
  position: fixed;
  background: #ccc;
  border: 1px solid #000;
  // top: 0;
  // left: 0;
  // right: 0;
  // bottom: 0;
  // margin: 0 auto;

  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);

  // left: 50%;
  // top: 50%;
  // margin-left: -250px;
  // margin-top: -100px;
}
</style>
