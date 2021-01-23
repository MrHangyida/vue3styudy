<template>
  <div id="aapp">
    <h1>{{ count }}</h1>
    <h2>{{ dublecount }}</h2>
    <button @click="add">加+</button>
    <h3>Author:{{ author }}</h3>
    <ul>
      <li>人物：{{ person.name }}</li>
      <li>年龄：{{ person.age }}</li>
    </ul>
    <ol>
      <li v-for="(item, index) in numbers" :key="index">有序列表{{ item }}</li>
    </ol>
    <h1>标题：{{ greentings }}</h1>
    <button @click="updaateGreentings">update Title</button>
    <p>全局绑定鼠标事件 X轴：{{ x }} Y轴：{{ y }}</p>
  </div>
</template>

<script lang="ts">
import useMousePosition from './hooks/useMousePosition';
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

import { ref, computed, reactive, toRefs, watch } from 'vue';
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
    const greentings = ref('');
    const updaateGreentings = function() {
      greentings.value += 'hello world';
    };
    const data: DataProps = reactive({
      author: 'H_yiDa',
      count: 0,
      add: () => {
        data.count++;
      },
      dublecount: computed(() => {
        return data.count * 2;
      }),
      numbers: [0, 1, 2, 3],
      person: { name: 'H yiDa', age: 21 },
    });
    // const mouseXY = reactive({
    //   x: 0,
    //   y: 0,
    //   updateMouseXY: (e: MouseEvent) => {
    //     mouseXY.x = e.pageX;
    //     mouseXY.y = e.pageY;
    //   },
    // });
    // onMounted(() => {
    //   document.addEventListener('click', mouseXY.updateMouseXY);
    // });
    // onUnmounted(() => {
    //   document.removeEventListener('click', mouseXY.updateMouseXY);
    // });
    const mouseXY = useMousePosition();
    watch([greentings, data, () => data.count], (val, oldVal) => {
      // 可以处理一下副作用的逻辑
      console.log(val, 'newVal');
      console.log(oldVal, 'oldVal');

      document.title = 'watch' + greentings.value + data.count;
    });
    const refData = toRefs(data);
    const refMouseXY = toRefs(mouseXY);
    return {
      ...refData,
      ...refMouseXY,
      greentings,
      updaateGreentings,
    };
    // return {
    //   count,
    //   add,
    //   dublecount,
    // }
  },
};
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
