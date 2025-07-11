<script setup lang="ts">
// import { useScroll } from '@vueuse/core'

import {computed, ref} from "vue";
import { useI18n } from 'vue-i18n';
import { DOWNLINK } from "@/constants";
import headerImgZh from '@/assets/images/icon-take-phone-zh.png'
import headerImgEn from '@/assets/images/icon-take-phone-en.png'
import headerImgTc from '@/assets/images/icon-take-phone-tc.png'

defineProps<{
  isFeature: boolean
  isExplore: boolean
}>()

// const { y } = useScroll(window)

const { locale, t } = useI18n()

const featureClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
const exploreClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'

const selectedLanguage = ref(localStorage.getItem('language') || 'zh')

const languageList = computed(() => [
  { label: t('language.zh'), value: 'zh' },
  { label: t('language.zhtw'), value: 'zhtw' },
  { label: t('language.en'), value: 'en' },
])

const headerImage = computed(() => {
  if (locale.value === 'zh') return headerImgZh
  if (locale.value === 'zhtw') return headerImgTc
  return headerImgEn
})

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

const getInvitationCode = (): string | null => {
  const url = new URL(window.location.href)
  const codeFromQuery = url.searchParams.get('invitationCode')
  if (codeFromQuery) return codeFromQuery

  const hash = window.location.hash // 例如 "#/register?invitationCode=E2A5XX"
  const hashQuery = hash.includes('?') ? hash.split('?')[1] : ''
  const paramsInHash = new URLSearchParams(hashQuery)
  return paramsInHash.get('invitationCode')
}

const copyInvitationCode = () => {
  const invitationCode = getInvitationCode()

  if (invitationCode) {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        console.log('包含邀请码的链接已复制:', window.location.href)
      })
      .catch(err => {
        console.error('复制失败:', err)
      })
  } else {
    console.log('没有邀请码，不执行复制')
  }
}

const openCustomerService = () => {
  if (window.scBotHandler && typeof window.scBotHandler.expand === 'function') {
    window.scBotHandler.expand()
  } else {
    console.warn('客服系统尚未加载')
  }
}
</script>
<template>
  <div class="header-part">
    <div class="header-head">
      <div class="name-side">
        <img src="@/assets/images/header-icon-logo-web.png" style="width: 32px; height: 32px;" alt=""/>
        <span class="title-name">{{ t('header.name') }}</span>
      </div>
      <div class="header-language">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="@/assets/images/icon-language.png" style="width: 24px; height: 24px;" alt="" />
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
    <div class="header-about">
      <div class="header-about-option">
        {{ t('header.product') }}
      </div>
      <div class="header-about-option">
        <a href="#feature" :class="['relative', isFeature && featureClass]">{{ t('header.profit') }}</a>
      </div>
      <div class="header-about-option">
        <a href="#explore" :class="['relative', isExplore && exploreClass]">{{ t('header.progress') }}</a>
      </div>
      <div class="header-about-option">
        <a href="#explore" :class="['relative', isExplore && exploreClass]">{{ t('header.qa') }}</a>
      </div>
      <div class="header-about-option">
        {{ t('header.about') }}
      </div>
    </div>
    <div class="header-big-title">
      <div class="header-big-title-text">
        {{ t('header.title1') }}
      </div>
      <div style="color: #fff; font-size: 12px; margin-top: 20px;">
        {{ t('header.title2') }}
      </div>
      <div style="color: #fff; font-size: 12px;">
        {{ t('header.title3') }}
      </div>
    </div>
    <div class="header-button">
      <div class="header-button-start">
        <a :href="DOWNLINK" @click="copyInvitationCode">{{ t('header.startBtn') }}</a>
      </div>
      <div class="header-button-get">
        <div @click="openCustomerService">{{ t('header.getCardBtn') }}</div>
      </div>
    </div>
    <div class="header-download-img">
      <div class="download-ios">
        <a :href="DOWNLINK" @click="copyInvitationCode"><img src="@/assets/images/download-ios.png" alt=""/></a>
      </div>
      <div class="download-android">
        <a :href="DOWNLINK" @click="copyInvitationCode"><img src="@/assets/images/download-android.png" alt=""/></a>
      </div>
    </div>
<!--    <div class="header-download-btn">-->
<!--      <div>-->
<!--        <a :href="DOWNLINK" @click="copyInvitationCode">{{ t('header.downloadBtn') }}</a>-->
<!--      </div>-->
<!--    </div>-->
    <div class="header-img">
      <img :src="headerImage" alt=""/>
    </div>
    <div class="header-img" style="margin-top: 0">
      <img src="@/assets/images/header-partner.png" style="width: 100%" alt=""/>
    </div>
  </div>
</template>
<style scoped>
.header-part {
  background-color: #000;

  .header-head {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;

    .name-side {
      display: flex;
      align-items: center;

      .title-name {
        color: #fff;
        margin-left: 10px;
        font-weight: 700;
        font-size: 16px;
      }
    }

    .header-language {
      background-color: #EEEADF;
      color: #fff;
      font-size: 14px;
      display: flex;
      align-items: center;
      border: 1px solid #fff;
      padding: 5px;
      border-radius: 50px;

      .el-dropdown-link {
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .header-about {
    display: flex;
    padding: 10px;

    .header-about-option {
      color: #fff;
      font-size: 14px;
      margin-right: 20px;
    }
  }

  .header-big-title {
    padding: 10px;

    .header-big-title-text {
      color: #fff;
      font-size: 32px;
      font-weight: 600;
    }
  }

  .header-small-title {
    padding: 10px;
    color: #fff;
    font-size: 12px;
  }

  .header-button {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .header-button-start {
      flex: 1;
      display: flex;
      justify-content: center;
      color: #000;
      background: #EEEADF;
      margin: 0 10px;
      padding: 10px 0;
      border-radius: 15px;
      font-weight: 500;
    }

    .header-button-get {
      flex: 1;
      display: flex;
      justify-content: center;
      color: #fff;
      background-color: #4C4C4C;
      margin: 0 10px;
      padding: 10px 0;
      border-radius: 15px;
      font-weight: 500;
    }
  }

  .header-download-img {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .download-ios {
      img {
        width: 100px;
        height: 29px;
      }
    }

    .download-android {
      img {
        width: 100px;
        height: 29px;
        margin-left: 10px;
      }
    }
  }

  .header-download-btn {
    display: flex;
    justify-content: center;
    margin-top: 50px;

    div {
      color: #fff;
      font-size: 20px;
      background: #3499FD;
      display: flex;
      justify-content: center;
      width: 90px;
      align-items: center;
      padding: 10px 15px;
      border-radius: 6px;
    }
  }

  .header-img {
    display: flex;
    justify-content: center;
  }
}
</style>