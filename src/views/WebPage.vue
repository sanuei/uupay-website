<script setup lang="ts">
import { WebContent1, WebContent2, WebContent3, WebContent4, WebContent5, WebContent6 } from '@/components'
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";

const { locale, t } = useI18n()

useHead(() => ({
  title: t('metaTitle'),
  meta: [
    {
      name: 'description',
      content: t('metaDescription'),
    },
    {
      name: 'keywords',
      content: t('metaKeywords'),
    },
  ],
  htmlAttrs: {
    lang: locale.value,
  }
}))
</script>

<template>
    <WebContent1 />

    <WebContent2 />

    <WebContent3 />

    <WebContent4 />

    <WebContent5 />

    <WebContent6 />
</template>

<style scoped>

</style>
