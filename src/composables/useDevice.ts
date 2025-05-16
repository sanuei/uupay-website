import { ref, onMounted } from 'vue';

export function useDevice() {
  const isMobile = ref(false);

  const checkDevice = () => {
    isMobile.value = window.innerWidth <= 900;
  };

  onMounted(() => {
    checkDevice();
    window.addEventListener('resize', checkDevice);
  });

  return {
    isMobile,
  };
}