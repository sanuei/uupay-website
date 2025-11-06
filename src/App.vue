<script setup lang="ts">
import {
  Header,
  HeaderWeb,
} from '@/components'
import { useDevice } from '@/composables/useDevice'

const { isMobile } = useDevice()

</script>
<template>
  <Header v-if="isMobile" />
  <HeaderWeb v-else />
</template>
<style scoped>
.header-language {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.download-btn {
  display: flex;
  margin: 50px 0;

  img {
    width: 177.75px;
    height: 52.67px;
  }
}
</style>
