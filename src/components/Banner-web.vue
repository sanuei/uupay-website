<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {APPNAME, DOWNLINK} from '@/constants/index'

const {t} = useI18n()

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
  <section class="banner-section">
    <div class="banner-container">
      <img src="@/assets/images/banner-background.png" class="banner-bg" alt=""/>
      <div class="left-side">
        <div class="header-title">
          UUPay
        </div>
        <div class="header-content">
          {{ t('banner.content') }}
        </div>
        <div class="header-sContent">
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
          <a :href="DOWNLINK" @click="copyInvitationCode" style="margin-right: 25.51px">
            <img src="@/assets/images/download-ios-web.png" alt=""/>
          </a>
          <a :href="DOWNLINK" @click="copyInvitationCode">
            <img src="@/assets/images/download-android-web.png" alt=""/>
          </a>
        </div>
      </div>
      <div class="empty">

      </div>
    </div>
  </section>
</template>
<style scoped>
.banner-section {
  background-color: #000;
  width: 100%;
  position: relative;
}

.banner-container {
  display: flex;
  position: relative;
  top: 100px;
  width: 100%;
  height: 980px;
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
  display: inline-block;
  width: 50%;
  position: relative;
  top: 200px;
  left: 300px;
  z-index: 2;
}

.header-title {
  color: #47C68F;
  font-size: 44px;
  font-weight: 600;
}

.header-content {
  color: #fff;
  font-weight: 600;
  font-size: 72px;
}

.header-sContent {
  color: #ACACAC;
  font-weight: 400;
  font-size: 24px;
}

.button-container {
  margin-top: 30px;
  display: flex;
}

.start-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  width: 141px;
  height: 52px;
  background-color: #FFF;
  color: #1A1A1A;
  font-size: 16px;
  margin-right: 24px;
}

.cs-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  width: 141px;
  height: 52px;
  background-color: #47C68F;
  color: #1A1A1A;
  font-size: 16px;
  cursor: pointer;
}

.download-btn {
  display: flex;
  margin-top: 133px;

  img {
    width: 177.75px;
    height: 52.67px;
  }
}

.empty {
  position: relative;
  width: 50%;
  color: #fff;
}
</style>
