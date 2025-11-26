<script setup lang="ts">
import { Header, HeaderWeb } from '@/components'
import { useDevice } from '@/composables/useDevice'
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router'

const { isMobile } = useDevice()

const { locale, t } = useI18n()

const router = useRouter()

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

const switchLanguage = (lang: any) => {
  const route = router.currentRoute.value
  const currentLang = route.params.lang as string
  const fullPath = route.fullPath
  const newFullPath = fullPath.replace('/' + currentLang, '/' + lang.value)

  router.push(newFullPath)
  locale.value = lang.value === 'zh-tw' ? 'zhtw' : lang.value
  localStorage.setItem('language', lang.value)
}
</script>

<template>
  <component
      :is="isMobile ? Header : HeaderWeb"
      @switchLanguage="switchLanguage"
      :currentLanguage="locale"
  />
</template>
