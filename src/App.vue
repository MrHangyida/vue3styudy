<template>
  <div id="main">
    <p class="btn" @click="openDialog">打开弹窗</p>
    <h1>{{ count }}</h1>
    <h2>{{ dublecount }}</h2>
    <button @click="add">加+</button>
    <h3 class="author" ref="authorRoot">Author:{{ author }}</h3>
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
    <h1 v-if="loading">loading...</h1>
    <img v-if="loaded" :src="result[0].url" />
    <Test :msg="'这里是个test组件'" />
    <teleport to="#app">
      <DialogTest :title="title" :isOpen="isOpen" @closeDialog="closeDialog">
        <template v-slot:dialog="data">
          弹窗内容
          {{ data.data }}
        </template>
      </DialogTest>
    </teleport>
  </div>
</template>

<script lang="ts">
import useMousePosition from './hooks/useMousePosition';
import useURLLoader from './hooks/useURLLoader';
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

import {
  ref,
  computed,
  reactive,
  toRefs,
  watch,
  onMounted,
  defineComponent,
} from 'vue';
import Test from './components/test.vue';
import DialogTest from './components/dialog-test.vue';
interface DataProps {
  count: number;
  add: () => void;
  dublecount: number;
  readonly author?: string;
  numbers: number[];
  authorRoot: null | HTMLElement;
  person: {
    name?: string;
    age?: number;
  };
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
interface DialogData {
  title: string;
  isOpen: boolean;
  openDialog: () => void;
  closeDialog: () => void;
}
export default defineComponent({
  name: 'App',
  components: {
    Test,
    DialogTest,
  },
  setup() {
    const isOpenDialog: DialogData = reactive({
      title: '这是dialog的title',
      isOpen: false,
      openDialog: () => {
        isOpenDialog.isOpen = true;
      },
      closeDialog: () => {
        isOpenDialog.isOpen = false;
      },
    });
    const greentings = ref('');
    const updaateGreentings = function() {
      greentings.value += 'hello world';
    };
    const data: DataProps = reactive({
      author: 'H_yiDa',
      count: 0,
      authorRoot: null,
      add: () => {
        data.count++;
      },
      dublecount: computed(() => {
        return data.count * 2;
      }),
      numbers: [0, 1, 2, 3],
      person: { name: 'H yiDa', age: 21 },
    });
    onMounted(() => {
      if (data.authorRoot) {
        data.authorRoot.style.color = 'red';
      }
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
    // const { result, axiosDataFlag } = useURLLoader<DogResult>(
    //   'https://dog.ceo/api/breeds/image/random'
    // );
    const { result, axiosDataFlag } = useURLLoader<CatResult[]>(
      'https://api.thecatapi.com/v1/images/search?limit=1'
    );
    watch(
      [greentings, data, () => data.count, () => result.value],
      (val, oldVal) => {
        // 可以处理一下副作用的逻辑
        console.log(val[3], result.value, 'newVal');
        console.log(oldVal, 'oldVal');
        if (result.value) {
          console.log(result.value[0].url);
        }
        document.title = 'watch' + greentings.value + data.dublecount;
      }
    );
    watch(result, (val, oldVal) => {
      console.log(val, 'newVal');
      console.log(oldVal, 'oldVal');
      if (result.value) {
        console.log(result.value[0].url);
      }
    });
    const refData = toRefs(data);
    const refMouseXY = toRefs(mouseXY);
    const axiosDataFlagA = toRefs(axiosDataFlag);
    const isOpenDialogA = toRefs(isOpenDialog);
    return {
      ...refData,
      ...refMouseXY,
      ...axiosDataFlagA,
      ...isOpenDialogA,
      greentings,
      updaateGreentings,
      result,
    };
    // return {
    //   count,
    //   add,
    //   dublecount,
    // }
  },
});
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
.btn {
  width: 100px;
  height: 30px;
  padding: 3px 5px;
  border: 1px solid #ccc;
  cursor: pointer;
  box-sizing: border-box;
  background: #fff;
  text-align: center;
  margin: 0 auto;
}
</style>
