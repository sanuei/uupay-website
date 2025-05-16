import { ref, onMounted } from 'vue';

export function useDevice() {
  const isMobile = ref(false);

  const checkDevice = () => {
    console.log('window.innerWidth',window.innerWidth)
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