<template>
  <div id="aapp">
    <h1>{{count}}</h1>
    <h2>{{dublecount}}</h2>
    <h3>{{name}}</h3>
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

import { ref, computed, reactive,toRefs } from 'vue'
interface DataProps {
  count: number;
  add: () => void;
  dublecount: number;
  readonly name?: string;
}
export default {
  name: 'App',
  setup() {
    // const count = ref(0)
    // const dublecount = computed(() => {
    //   return count.value * 2
    // })
    // const add = () => {
    //   count.value++
    // }
    // function add(){
    //   count.value++
    // }
    const data: DataProps = reactive({
      name:'H_yiDa',
      count: 0,
      add: () => {
        data.count++
      },
      dublecount: computed(() => {
        return data.count * 2
      }),
    })
    const refData=toRefs(data)
    return{
      ...refData
    }
    // return {
    //   count,
    //   add,
    //   dublecount,
    // }
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
