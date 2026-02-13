<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'
import { BASE_URL } from "@/constants";

const { locale } = useI18n()
const route = useRoute()

watch(
    locale,
    (lang) => {
      const html = document.documentElement

      html.classList.remove('lang-zh', 'lang-en', 'lang-th')
      html.classList.add(`lang-${lang}`)
    },
    { immediate: true }
)

const canonical = computed(() => {
  const origin = BASE_URL || 'https://uupay.com'
  return `${origin}${route.path}`
})

const canonicalForRoot = computed(() => {
  if (route.path === '/' || route.path === '') {
    return 'https://uupay.com'
  }
  return canonical.value
})

useHead({
  link: [
    { rel: 'canonical', href: canonicalForRoot }
  ]
})
</script>

<template>
  <router-view />
</template>
