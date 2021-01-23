import { ref, reactive } from 'vue';
import axios from 'axios';

const useURLLoader = function<T>(url: string) {
  const result = ref<T|null>(null);
  const axiosDataFlag = reactive({
    loading: true,
    loaded: false,
    error: null,
  });
  axios
    .get(url)
    .then((res) => {
      axiosDataFlag.loading = false;
      axiosDataFlag.loaded = true;
      result.value = res.data;
    })
    .catch((err) => {
      axiosDataFlag.error = err;
      axiosDataFlag.loading = false;
    });
  return { result, axiosDataFlag };
};

export default useURLLoader;
