<script setup lang="ts">
import {useI18n} from 'vue-i18n'
import {DOWNLINK} from '@/constants/index'
import {onBeforeUnmount, onMounted} from "vue";

const {t} = useI18n()

const getInvitationCode = (): string | null => {
  const queryCode = new URLSearchParams(window.location.search).get('invitationCode')
  if (queryCode) return queryCode

  const hash = window.location.hash
  const hashQueryIndex = hash.indexOf('?')
  if (hashQueryIndex !== -1) {
    const hashQuery = hash.substring(hashQueryIndex + 1)
    const hashCode = new URLSearchParams(hashQuery).get('invitationCode')
    if (hashCode) return hashCode
  }

  return null
}

const fallbackCopy = (text: string): boolean => {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  input.select()
  const result = document.execCommand('copy')
  document.body.removeChild(input)
  return result
}

const copyInvitationCode = async () => {
  const invitationCode = getInvitationCode()
  if (!invitationCode) {
    return
  }

  const textToCopy = window.location.href

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(textToCopy)
      return
    } catch (err) {
      console.warn('Clipboard API 失败，准备使用 fallback:', err)
    }
  }

  const fallbackSuccess = fallbackCopy(textToCopy)
  fallbackSuccess
      ? console.log('已复制（fallback 方法）：', textToCopy)
      : console.error('fallback 复制仍失败')
}

const openCustomerService = () => {
  if (window.scBotHandler && typeof window.scBotHandler.expand === 'function') {
    window.scBotHandler.expand()
  } else {
    console.warn('客服系统尚未加载')
  }
}

const goToAppStore = () => {
  copyInvitationCode()
  window.location.href = 'https://apps.apple.com/app/id6749419646'
}

const goDownloadLink = () => {
  const isIOS = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)

  if (isIOS) {
    // 跳 App Store
    window.location.href = 'https://apps.apple.com/app/id6749419646'
  } else {
    // 跳下载链接
    window.location.href = DOWNLINK
  }
  return
}

const handleClick = () => {
  copyInvitationCode()
  window.removeEventListener('click', handleClick) // 只触发一次
}

onMounted(() => {
  window.addEventListener('click', handleClick)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', handleClick)
})

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
          <div @click="goDownloadLink" class="start-btn">
            {{ t('banner.startBtn') }}
          </div>
          <div @click="openCustomerService" class="cs-btn">
            {{ t('banner.csBtn') }}
          </div>
        </div>
        <div class="download-btn">
          <div @click="goToAppStore" style="margin-right: 25.51px">
            <img src="@/assets/images/download-ios-web.png" alt=""/>
          </div>
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
