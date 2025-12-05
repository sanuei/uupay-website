<script setup lang="ts">
import { useDevice } from '@/composables/useDevice'
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import webPage from '@/views/WebPage.vue'
import phonePage from '@/views/PhonePage.vue'
import InvitePage from '@/views/InvitePage.vue'
import { useRoute } from 'vue-router'
import { computed } from "vue";

const route = useRoute()

const { isMobile } = useDevice()

const { locale, t } = useI18n()

const invitationCode = computed(() => {
  const full = route.fullPath // <-- 用 fullPath 最安全
  let code = ''

  // 1. 先取 ?invitationCode=xxx
  const urlQueryIndex = full.indexOf('?')
  if (urlQueryIndex !== -1) {
    const query = full.substring(urlQueryIndex + 1)
    code = new URLSearchParams(query).get('invitationCode') || ''
  }

  // 2. 再取 hash 里的 ?invitationCode=xxx
  const hashIndex = full.indexOf('#')
  if (!code && hashIndex !== -1) {
    const hash = full.substring(hashIndex + 1)
    const hashQueryIndex = hash.indexOf('?')
    if (hashQueryIndex !== -1) {
      const hashQuery = hash.substring(hashQueryIndex + 1)
      code = new URLSearchParams(hashQuery).get('invitationCode') || ''
    }
  }

  return code
})

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
  <InvitePage v-if="isMobile && invitationCode" />

  <!-- 否则正常显示手机 或 web layout -->
  <component
      v-else
      :is="isMobile ? phonePage : webPage"
  />
</template>
