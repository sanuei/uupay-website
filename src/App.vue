<script setup lang="ts">
import { Header, HeaderWeb } from '@/components'
import { useDevice } from '@/composables/useDevice'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { isMobile } = useDevice()
const router = useRouter()
const { locale } = useI18n()

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
  <router-view />
</template>
