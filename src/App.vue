<script setup lang="ts">
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

watch(
    locale,
    (lang) => {
      const html = document.documentElement

      html.classList.remove('lang-zh', 'lang-en', 'lang-th')
      html.classList.add(`lang-${lang}`)
    },
    { immediate: true }
)
</script>

<template>
  <router-view />
</template>
