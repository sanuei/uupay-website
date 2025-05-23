<script setup lang="ts">
// import { useScroll } from '@vueuse/core'
import { DOWNLINK, CONTACTUS } from '@/constants/index'
import { computed, ref } from "vue";
import { useI18n } from 'vue-i18n'

defineProps<{
  isFeature: boolean
  isExplore: boolean
}>()

// const { y } = useScroll(window)
const featureClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:bg-background-blue before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
const exploreClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full  before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'

const { locale, t } = useI18n()

const selectedLanguage = ref(localStorage.getItem('language') || 'zh')

const languageList = computed(() => [
  { label: t('language.zh'), value: 'zh' },
  { label: t('language.zhTW'), value: 'zhTw' },
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
  <div class="header-part">
    <div class="header-container">
      <div class="name-side">
        <img src="@/assets/images/header-icon-logo-web.png" alt="" />
        <span class="title-name">{{ t('header.name') }}</span>
      </div>
      <div class="option-side">
        <div class="option-type">
          {{ t('header.about') }}
        </div>
        <div class="option-type">
          <a href="#feature" :class="['relative', isFeature && featureClass]">{{ t('header.feature') }}</a>
        </div>
        <div class="option-type">
          <a href="#explore" :class="['relative', isExplore && exploreClass]">{{ t('header.qa') }}</a>
        </div>
        <div class="option-type">
          {{ t('header.contact') }}
        </div>
        <div class="option-type-language">
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
    </div>
    <div class="content">
      <div class="content-left-side">
        <div class="content-left-side-title">
          {{ t('header.title1') }} {{ t('header.title2') }}
        </div>
        <div class="content-left-side-content">
          {{ t('header.title4') }}
        </div>
        <div class="content-left-side-short-content">
          {{ t('header.title3') }}
        </div>
        <div class="content-left-side-content-use">
          <div class="content-left-side-content-start">
            <a :href="DOWNLINK">{{ t('header.startBtn') }}</a>
          </div>
          <div class="content-left-side-content-getCard">
            <a :href="CONTACTUS">{{ t('header.getCardBtn') }}</a>
          </div>
        </div>
        <div class="download-content">
          <div class="download-ios">
            <img src="@/assets/images/download-ios.png" alt="" />
          </div>
          <div class="download-android">
            <img src="@/assets/images/download-android.png" alt="" />
          </div>
        </div>
      </div>
      <div class="content-right-side">
        <img src="@/assets/images/banner-right-bg.png" alt="" />
      </div>
    </div>
  </div>
  <div class="bottom-bg">
    <img src="@/assets/images/banner-bottom-bg.png" alt="" />
  </div>
</template>

<style scoped>
.header-part {
  background-image: url('@/assets/images/banner-background.png');
  background-repeat: no-repeat;
  background-size: cover;

  .header-container {
    display: flex;
    justify-content: space-between;
    padding: 10px 60px;
    background: #DBDBDB14;

    .name-side {
      display: flex;
      align-content: center;
      flex: 1;

      .title-name {
        display: flex;
        align-items: center;
        color: #fff;
        margin-left: 10px;
        font-size: 24px;
      }
    }

    .option-side {
      display: flex;
      align-items: center;

      .option-type {
        margin: 0 20px;
        color: #fff;
        font-size: 14px;
      }

      .option-type-language {
        margin: 0 20px;
        color: #fff;
        font-size: 14px;
        border: 1px solid #fff;
        padding: 10px 20px;
        border-radius: 50px;
        display: flex;
        align-items: center;

        .el-dropdown-link {
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 100px;

    .content-left-side {
      flex: 1;
      margin: 20px 30px 20px 60px;

      .content-left-side-title {
        color: #fff;
        font-size: 48px;
        margin: 20px 0;
      }

      .content-left-side-content {
        color: #fff;
        font-size: 18px;
        margin-bottom: 40px;
      }

      .content-left-side-short-content {
        color: #fff;
        margin-bottom: 40px;
      }

      .content-left-side-content-use {
        display: flex;
        margin-bottom: 50px;

        .content-left-side-content-start {
          background: #0052B4;
          color: #fff;
          font-size: 20px;
          padding: 10px 20px;
          border-radius: 15px;
        }

        .content-left-side-content-getCard {
          border: 1px solid #fff;
          color: #fff;
          padding: 10px 20px;
          border-radius: 15px;
          margin-left: 25px;
        }
      }

      .download-content {
        display: flex;

        .download-ios {
          margin-right: 25px;
        }
      }
    }

    .content-right-side {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.bottom-bg {
  img {
    width: 100%;
  }
}
</style>