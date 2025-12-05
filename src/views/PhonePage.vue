<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import {
  PhoneFooter,
  PhoneHeader,
  WebContent1,
  WebContent2,
  WebContent3,
  WebContent4,
  WebContent5,
  WebContent6
} from '@/components'
import {useRouter} from "vue-router";

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

const switchLanguage = (lang: string) => {
  const route = router.currentRoute.value
  const currentLang = route.params.lang as string
  const fullPath = route.fullPath
  const newFullPath = fullPath.replace('/' + currentLang, '/' + lang)

  router.push(newFullPath)
  locale.value = lang === 'zh-tw' ? 'zhtw' : lang
  localStorage.setItem('language', lang)
}
</script>

<template>
  <PhoneHeader :currentLanguage="locale" @onSwitchLanguage="switchLanguage"/>

  <WebContent1 />

  <WebContent2 />

  <WebContent3 />

  <WebContent4 />

  <WebContent5 />

  <WebContent6 />

  <PhoneFooter />
</template>
