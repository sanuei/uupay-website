<script setup lang="ts">
import { useDevice } from '@/composables/useDevice'
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import webPage from '@/views/WebPage.vue'
import phonePage from '@/views/PhonePage.vue'
import InvitePage from '@/views/InvitePage.vue'
import {useRoute, useRouter} from 'vue-router'
import { computed } from "vue";
import { useHreflang } from '@/utils/useHreflang'

const route = useRoute()
useHreflang(route)
const router = useRouter()

const { isMobile } = useDevice()

const { locale, t } = useI18n()

function getQueryParam(full: string, key: string): string {
  let value = ''
  const queryIndex = full.indexOf('?')
  if (queryIndex !== -1) {
    const query = full.substring(queryIndex + 1)
    value = new URLSearchParams(query).get(key) || ''
  }
  const hashIndex = full.indexOf('#')
  if (!value && hashIndex !== -1) {
    const hash = full.substring(hashIndex + 1)
    const hashQueryIndex = hash.indexOf('?')
    if (hashQueryIndex !== -1) {
      const hashQuery = hash.substring(hashQueryIndex + 1)
      value = new URLSearchParams(hashQuery).get(key) || ''
    }
  }
  return value
}

const invitationCode = computed(() => getQueryParam(route.fullPath, 'invitationCode'))

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
  locale.value = lang
  localStorage.setItem('language', lang)
}
</script>

<template>
  <InvitePage v-if="invitationCode" :currentLanguage="locale" @onSwitchLanguage="switchLanguage" />

  <!-- 否则正常显示手机 或 web layout -->
  <component
      v-else
      :is="isMobile ? phonePage : webPage"
  />
</template>
