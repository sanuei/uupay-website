<script setup lang="ts">
import {APPNAME, DOWNLINK} from '@/constants'
import { useI18n } from 'vue-i18n';

const { locale, t } = useI18n()

const getInvitationCode = (): string | null => {
  const url = new URL(window.location.href)
  const codeFromQuery = url.searchParams.get('invitationCode')
  if (codeFromQuery) return codeFromQuery

  const hash = window.location.hash
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

const openDeeplInk = () => {
  const url = window.location.href
  const afterJump = url.split('#/jump/')[1] || ''
  const deeplink = `${APPNAME}://${afterJump}`
  window.location.href = deeplink
}
</script>
<template>
    <section class="relative lg:px-0">
      <div class="banner-part">
        <img src="@/assets/images/banner-background.png" class="banner-bg" alt=""/>
        <div class="left-side">
          <div class="header-title">
            {{ t('header.appName') }}
          </div>
          <div class="header-second-title" :style="locale === 'en' ? { fontSize: '30px' } : {}">
            {{ t('banner.content') }}
          </div>
          <div class="header-small-title">
            {{ t('banner.sContent') }}
          </div>
          <div class="button-container">
            <div @click="openDeeplInk" class="start-btn">
              {{ t('banner.startBtn') }}
            </div>
            <div @click="openCustomerService" class="cs-btn">
              {{ t('banner.csBtn') }}
            </div>
          </div>
          <div class="download-btn">
            <a :href="DOWNLINK" @click="copyInvitationCode" style="margin-right: 8.72px">
              <img src="@/assets/images/download-ios.png" alt=""/>
            </a>
            <a :href="DOWNLINK" @click="copyInvitationCode">
              <img src="@/assets/images/download-android.png" alt=""/>
            </a>
          </div>
        </div>
      </div>
    </section>
</template>
<style scoped>
.banner-part {
  display: flex;
  position: relative;
  top: 50px;
  width: 100%;
  height: 278px;
  margin-bottom: 50px;
}
.banner-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.left-side {
  position: relative;
  z-index: 2;
  padding: 40px 26px;
}

.header-title {
  color: #47C68F;
  font-weight: 600;
  font-size: 22px;
}

.header-second-title {
  color: #fff;
  font-weight: 600;
  font-size: 36px;
}

.header-small-title {
  color: #ACACAC;
  font-size: 12px;
}

.button-container {
  margin-top: 14.35px;
  display: flex;
}

.start-btn {
  background-color: #FFFFFF;
  padding: 7.5px 19.5px;
  border-radius: 8px;
  color: #1A1A1A;
  font-size: 8px;
}

.cs-btn {
  margin-left: 12px;
  background-color: #47C68F;
  padding: 7.5px 19.5px;
  border-radius: 8px;
  color: #1A1A1A;
  font-size: 8px;
}

.download-btn {
  display: flex;
  margin-top: 26.38px;

  img {
    width: 57.05px;
    height: 16.37px;
  }
}
</style>
