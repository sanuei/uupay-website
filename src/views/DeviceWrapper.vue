<script setup lang="ts">
import { onMounted, ref } from 'vue';

const component = ref();

onMounted(async () => {
  const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent);

  if (isMobile) {
    component.value = (await import('@/views/PhonePage.vue')).default;
  } else {
    component.value = (await import('@/views/WebPage.vue')).default;
  }
});
</script>

<template>
  <component :is="component" v-if="component" />
</template>
