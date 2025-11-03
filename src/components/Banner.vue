<script setup lang="ts">
import {APPNAME, DOWNLINK} from '@/constants'
import { useI18n } from 'vue-i18n';
import { onMounted } from "vue";

const { locale, t } = useI18n()

const openCustomerService = () => {
  if (window.scBotHandler && typeof window.scBotHandler.expand === 'function') {
    window.scBotHandler.expand()
  } else {
    console.warn('客服系统尚未加载')
  }
}

const openDeepLink = () => {
  const url = window.location.href
  let afterJump = ""

  const jumpIndex = url.indexOf("jump/")
  if (jumpIndex !== -1) {
    afterJump = url.substring(jumpIndex + 5)
  }

  if (!afterJump) {
    console.warn("未发现 jump，根据系统跳转")

    const isIOS = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)

    if (isIOS) {
      // 跳 App Store
      goToAppStore()
    } else {
      // 跳下载链接
      window.location.href = DOWNLINK
    }
    return
  }

  const deeplink = `${APPNAME}://${afterJump}`
  let hasOpened = false

  const onHide = () => {
    hasOpened = true
    clearTimeout(timer)
    document.removeEventListener("visibilitychange", onHide)
    window.removeEventListener("blur", onHide)
  }

  document.addEventListener("visibilitychange", onHide)
  window.addEventListener("blur", onHide)

  window.location.href = deeplink

  const timer = setTimeout(() => {
    if (!hasOpened) {
      const isIOS = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)
      if (isIOS) {
        goToAppStore()
      } else {
        window.location.href = DOWNLINK
      }
    }
  }, 1000)
}

const goToAppStore = () => {
  window.location.href = 'https://apps.apple.com/app/id6749419646';
}

const checkAndRedirectToApp = () => {
  const queryCode = new URLSearchParams(window.location.search).get('invitationCode')
  if (queryCode) {
    window.location.href = `uupay://register?invitationCode=${queryCode}`
    return
  }

  const hash = window.location.hash
  const hashQueryIndex = hash.indexOf('?')
  if (hashQueryIndex !== -1) {
    const hashQuery = hash.substring(hashQueryIndex + 1)
    const hashCode = new URLSearchParams(hashQuery).get('invitationCode')
    if (hashCode) {
      window.location.href = `${APPNAME}://register?invitationCode=${hashCode}`
      return
    }
  }

  const isIOS = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)

  if (isIOS) {
    // 跳 App Store
    goToAppStore()
  } else {
    // 跳下载链接
    window.location.href = DOWNLINK
  }
}

onMounted(() => {
  checkAndRedirectToApp()
})
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
            <div @click="openDeepLink" class="start-btn">
              {{ t('banner.startBtn') }}
            </div>
            <div @click="openCustomerService" class="cs-btn">
              {{ t('banner.csBtn') }}
            </div>
          </div>
          <div class="download-btn">
            <div @click="goToAppStore" style="margin-right: 8.72px">
              <img src="@/assets/images/download-ios.png" alt=""/>
            </div>
            <a :href="DOWNLINK">
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
  font-size: 14px;
}

.cs-btn {
  margin-left: 12px;
  background-color: #47C68F;
  padding: 7.5px 19.5px;
  border-radius: 8px;
  color: #1A1A1A;
  font-size: 14px;
}

.download-btn {
  display: flex;
  margin-top: 26.38px;

  img {
    width: 120px;
  }
}
</style>
