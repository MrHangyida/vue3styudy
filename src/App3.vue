<template>
  <div id="aapp">
    <h1>{{count}}</h1>
    <h2>{{dublecount}}</h2>
    <button @click="add">加+</button>
    <h3>Author:{{author}}</h3>
    <ul>
      <li>人物：{{person.name}}</li>
      <li>年龄：{{person.age}}</li>
    </ul>
    <ol>
      <li v-for="(item,index) in numbers" :key="index">有序列表{{item}}</li>
    </ol>
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

import { ref, computed, reactive, toRefs,onMounted,onUpdated,onRenderTriggered ,onRenderTracked} from 'vue'
interface DataProps {
  count: number;
  add: () => void;
  dublecount: number;
  readonly author?: string;
  numbers: number[];
  person: {
    name?: string;
    age?: number;
  };
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
    onMounted(()=>{
      console.log('onMounted')
    })
    onUpdated(()=>{
      console.log(('onUpdated'))
    })
    onRenderTracked((event)=>{ // 页面渲染的时候就触发 debug
      console.log(event,'onRenderTracked')
    })
    onRenderTriggered((event)=>{ // 页面更新的时候调用 debug
      console.log(event,'onRenderTriggered')
      // 这里onRenderTriggered打印了两次是因为computed属性也发生了改变，收集依赖的过程中，count发生改变，computed也接收到改变了
    })
    const data: DataProps = reactive({
      author: 'H_yiDa',
      count: 0,
      add: () => {
        data.count++
      },
      dublecount: computed(() => {
        return data.count * 2
      }),
      numbers: [0, 1, 2, 3],
      person: { name: 'H yiDa', age: 21 },
    })
    data.numbers[0]=6
    data.person['age']=20
    const refData = toRefs(data)
    return {
      ...refData,
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
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-weight: normal;
  text-decoration: none;
}
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
