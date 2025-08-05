<script setup lang="ts">
// import { useScroll } from '@vueuse/core'
import {computed, ref} from "vue";
import { useI18n } from 'vue-i18n';

defineProps<{
  isFeature: boolean
  isExplore: boolean
}>()

// const { y } = useScroll(window)

const { locale, t } = useI18n()

// const featureClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
// const exploreClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'

const selectedLanguage = ref(localStorage.getItem('language') || 'zh')

const languageList = computed(() => [
  { label: t('language.zh'), value: 'zh' },
  { label: t('language.zhtw'), value: 'zhtw' },
  { label: t('language.en'), value: 'en' },
])

// const headerImage = computed(() => {
//   if (locale.value === 'zh') return headerImgZh
//   if (locale.value === 'zhtw') return headerImgTc
//   return headerImgEn
// })

// const currentLanguageLabel = computed(() => {
//   return languageList.value.find(item => item.value === selectedLanguage.value)?.label || ''
// })

const switchLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('language', lang)
}

const changeLanguage = (lang: any) => {
  switchLanguage(lang.value)
  selectedLanguage.value = lang.value
}

// const getInvitationCode = (): string | null => {
//   const url = new URL(window.location.href)
//   const codeFromQuery = url.searchParams.get('invitationCode')
//   if (codeFromQuery) return codeFromQuery
//
//   const hash = window.location.hash // 例如 "#/register?invitationCode=E2A5XX"
//   const hashQuery = hash.includes('?') ? hash.split('?')[1] : ''
//   const paramsInHash = new URLSearchParams(hashQuery)
//   return paramsInHash.get('invitationCode')
// }

// const copyInvitationCode = () => {
//   const invitationCode = getInvitationCode()
//
//   if (invitationCode) {
//     navigator.clipboard.writeText(window.location.href)
//       .then(() => {
//         console.log('包含邀请码的链接已复制:', window.location.href)
//       })
//       .catch(err => {
//         console.error('复制失败:', err)
//       })
//   } else {
//     console.log('没有邀请码，不执行复制')
//   }
// }

// const openCustomerService = () => {
//   if (window.scBotHandler && typeof window.scBotHandler.expand === 'function') {
//     window.scBotHandler.expand()
//   } else {
//     console.warn('客服系统尚未加载')
//   }
// }
</script>
<template>
  <div class="header-part">
    <div class="header-head">
      <div class="name-side">
        <img src="@/assets/images/header-icon-phone.png" style="width: 28px; height: 28px;" alt=""/>
        <span class="title-name">{{ t('header.appName') }}</span>
      </div>
      <div class="header-language">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="@/assets/images/icon-language-phone.png" style="width: 16px; height: 16px;" alt="" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <template v-for="item in languageList">
                <el-dropdown-item @click="changeLanguage(item)">{{ item.label }}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
<!--      <div class="header-about-option">-->
<!--        <a href="#feature" :class="['relative', isFeature && featureClass]">{{ t('header.profit') }}</a>-->
<!--      </div>-->
<!--      <div class="header-about-option">-->
<!--        <a href="#explore" :class="['relative', isExplore && exploreClass]">{{ t('header.progress') }}</a>-->
<!--      </div>-->
<!--      <div class="header-about-option">-->
<!--        <a href="#explore" :class="['relative', isExplore && exploreClass]">{{ t('header.qa') }}</a>-->
<!--      </div>-->
<!--      <div class="header-about-option">-->
<!--        {{ t('header.about') }}-->
<!--      </div>-->
<!--    <div class="header-button">-->
<!--      <div class="header-button-start">-->
<!--        <a :href="DOWNLINK" @click="copyInvitationCode">{{ t('header.startBtn') }}</a>-->
<!--      </div>-->
<!--      <div class="header-button-get">-->
<!--        <div @click="openCustomerService">{{ t('header.getCardBtn') }}</div>-->
<!--      </div>-->
</template>
<style scoped>
.header-part {
  background-color: #121212;
  position: fixed;
  width: 100%;
  height: 50px;
  z-index: 10;
}

.header-head {
  padding: 11px 16px;
  display: flex;
  justify-content: space-between;
}

.name-side {
  display: flex;
}

.title-name {
  margin-left: 2.8px;
  color: #fff;
  font-size: 12.6px;
  display: flex;
  align-items: center;
}

.header-language {
  padding-right: 27px;
  display: flex;
  align-items: center;
}
</style>