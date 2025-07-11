import { ref, onMounted, onBeforeMount } from 'vue';

export function useDevice() {
  const isMobile = ref(false);

  const checkDevice = () => {
    isMobile.value = window.innerWidth <= 900;
  };

  onBeforeMount(() => {
    checkDevice();
  })

  onMounted(() => {
    window.addEventListener('resize', checkDevice);
  });

  return {
    isMobile,
  };
}