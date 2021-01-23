import {reactive,onMounted,onUnmounted} from 'vue'

function useMousePosition(){
  const mouseXY = reactive({
    x: 0,
    y: 0,
    updateMouseXY: (e: MouseEvent) => {
      mouseXY.x = e.pageX;
      mouseXY.y = e.pageY;
    },
  });
  onMounted(() => {
    document.addEventListener('click', mouseXY.updateMouseXY);
  });
  onUnmounted(() => {
    document.removeEventListener('click', mouseXY.updateMouseXY);
  });
  return mouseXY
}

export default useMousePosition