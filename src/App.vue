<script setup lang="ts">
import {computed, watch} from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

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

const canonicalUrl = computed(() => `${window.location.origin}${route.fullPath}`)

// 顶层调用 useHead，并绑定响应式对象
useHead({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl
    }
  ]
})
</script>

<template>
  <router-view />
</template>
