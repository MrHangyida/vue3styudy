<template>
  <div id="aapp">
    <h1>{{count}}</h1>
    <h2>{{dublecount}}</h2>
    <button @click="add">加+</button>
  </div>
</template>

<script lang="ts">
// import {defineComponent} from 'vue'
// export default defineComponent({
//   name:'App',
//   data(){
//     return {
//       count:0
//     }
//   },
//   methods:{
//     add(){
//       this.count++
//     }
//   }
// })

import { ref, computed } from 'vue'
export default {
  name: 'App',
  setup() {
    const count = ref(0)
    const dublecount = computed(() => {
      return count.value * 2
    })
    console.log(count, count.value)
    const add = () => {
      count.value++
    }
    // function add(){
    //   count.value++
    // }
    return {
      count,
      add,
      dublecount,
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
