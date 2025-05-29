<script setup lang="ts">
// import { useScroll } from '@vueuse/core'

import { computed, ref } from "vue";
import { useI18n } from 'vue-i18n'

defineProps<{
  isFeature: boolean
  isExplore: boolean
}>()

// const { y } = useScroll(window)

const { locale, t } = useI18n()

const featureClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
const exploreClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full  before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'

const selectedLanguage = ref(localStorage.getItem('language') || 'zh')

const languageList = computed(() => [
  { label: t('language.zh'), value: 'zh' },
  { label: t('language.zhtw'), value: 'zhtw' },
  { label: t('language.en'), value: 'en' },
])

const currentLanguageLabel = computed(() => {
  return languageList.value.find(item => item.value === selectedLanguage.value)?.label || ''
})

const switchLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('language', lang)
}

const changeLanguage = (lang: any) => {
  switchLanguage(lang.value)
  selectedLanguage.value = lang.value
}
</script>
<template>
  <!--    <header class="h-[70px] lg:h-[103px] z-50 transition-all sticky top-0" :class="[y >= 10 && 'bg-white']">-->
  <!--        <ul class="flex items-center max-w-[1280px] px-[23px] mx-auto h-full">-->
  <!--            <li class="flex items-center">-->
  <!--                <img class="w-[38px] lg:w-[53px]" src="@/assets/images/header-icon.svg" alt="header icon" />-->
  <!--                <span class="ml-[9px] font-bold text-2xl lg:text-[30px]">有得聊</span>-->
  <!--            </li>-->
  <!--            <li class="ml-[23px] lg:ml-[62px] text-base lg:text-xl font-semibold text-text-blue">-->
  <!--                <a href="#feature" :class="['relative', isFeature && featureClass]">特征</a>-->
  <!--            </li>-->
  <!--            <li class="ml-[23px] lg:ml-[60px] text-base lg:text-xl font-semibold text-text-blue">-->
  <!--                <a href="#explore" :class="['relative', isExplore && exploreClass]">发现</a>-->
  <!--            </li>-->
  <!--        </ul>-->
  <!--    </header>-->
  <div class="header-part">
    <div>
      <img src="@/assets/images/header-phone-bg.png"
           style="max-width: 104%; width: 104%; height: 100%; position: absolute; left: -4px; z-index: -1;" alt=""/>
    </div>
    <div class="header-head">
      <div class="name-side">
        <img src="@/assets/images/header-icon-logo-web.png" alt=""/>
        <span class="title-name">{{ t('header.name') }}</span>
      </div>
      <div class="header-language">
        <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="@/assets/images/icon-language.png" style="margin-right: 5px" alt="" />
            {{ currentLanguageLabel }}
            <el-icon class="el-icon--right">
              <arrow-down/>
            </el-icon>
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
        {{ t('header.about') }}
      </div>
      <div class="header-about-option">
        <a href="#feature" :class="['relative', isFeature && featureClass]">{{ t('header.feature') }}</a>
      </div>
      <div class="header-about-option">
        <a href="#explore" :class="['relative', isExplore && exploreClass]">{{ t('header.qa') }}</a>
      </div>
      <div class="header-about-option">
        <a href="#explore" :class="['relative', isExplore && exploreClass]">{{ t('header.contact') }}</a>
      </div>
    </div>
    <div class="header-big-title">
      <div class="header-big-title-text">
        {{ t('header.title1') }}
      </div>
      <div class="header-big-title-text">
        {{ t('header.title2') }}
      </div>
    </div>
    <div class="header-small-title">
      {{ t('header.title3') }}
    </div>
    <div class="header-button">
      <div class="header-button-start">
        {{ t('header.startBtn') }}
      </div>
      <div class="header-button-get">
        {{ t('header.getCardBtn') }}
      </div>
    </div>
    <div class="header-download-img">
      <div class="download-ios">
        <img src="@/assets/images/download-ios.png" alt=""/>
      </div>
      <div class="download-android">
        <img src="@/assets/images/download-android.png" alt=""/>
      </div>
    </div>
    <div class="header-download-btn">
      <div>
        {{ t('header.downloadBtn') }}
      </div>
    </div>
    <div class="header-img">
      <img src="@/assets/images/header-phone-bottom.png" alt=""/>
    </div>
    <div class="header-img" style="margin-top: 0">
      <img src="@/assets/images/header-partner.png" style="width: 100%" alt=""/>
    </div>
  </div>
</template>
<style scoped>
.header-part {
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
        font-size: 20px;
      }
    }

    .header-language {
      color: #fff;
      font-size: 14px;
      display: flex;
      align-items: center;
      border: 1px solid #fff;
      padding: 10px 20px;
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
      color: #fff;
      background: #0052B4;
      margin: 0 10px;
      padding: 10px 0;
      border-radius: 15px;
    }

    .header-button-get {
      flex: 1;
      display: flex;
      justify-content: center;
      color: #fff;
      border: 1px solid #fff;
      margin: 0 10px;
      padding: 10px 0;
      border-radius: 15px;
    }
  }

  .header-download-img {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .download-ios {
      img {
        width: 90px;
        height: 26px;
      }
    }

    .download-android {
      img {
        width: 90px;
        height: 26px;
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