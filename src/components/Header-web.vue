<script setup lang="ts">
// import { useScroll } from '@vueuse/core'
import { computed, ref } from "vue";
import { DOWNLINK } from '@/constants/index'
import { useI18n } from 'vue-i18n'
import headerImgZh from '@/assets/images/icon-take-phone-web-zh.png'
import headerImgEn from '@/assets/images/icon-take-phone-web-en.png'
import headerImgTc from '@/assets/images/icon-take-phone-web-tc.png'

defineProps<{
  isFeature: boolean
  isExplore: boolean
}>()


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
    console.log('没有邀请码，不执行复制123')
  }
}

// const { y } = useScroll(window)
// const featureClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:bg-background-blue before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
const exploreClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full  before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'

const { t, locale } = useI18n()

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

const openCustomerService = () => {
  if (window.scBotHandler && typeof window.scBotHandler.expand === 'function') {
    window.scBotHandler.expand()
  } else {
    console.warn('客服系统尚未加载')
  }
}

const headerImage = computed(() => {
  if (locale.value === 'zh') return headerImgZh
  if (locale.value === 'zhtw') return headerImgTc
  return headerImgEn
})
</script>
<template>
  <div class="header-part">
    <div class="header-container">
      <div class="name-side">
        <img src="@/assets/images/header-icon-logo-web.png" style="width: 32px; height: 32px;" alt="" />
        <span class="title-name">{{ t('header.name') }}</span>
      </div>
      <div class="option-side">
        <div class="option-type">
          {{ t('header.product') }}
        </div>
        <div class="option-type">
          {{ t('header.profit') }}
        </div>
        <div class="option-type">
          {{ t('header.progress') }}
        </div>
        <div class="option-type">
          <a href="#explore" :class="['relative', isExplore && exploreClass]">{{ t('header.qa') }}</a>
        </div>
        <div class="option-type">
          {{ t('header.about') }}
        </div>
      </div>
      <div class="language-side">
        <div class="option-type-language">
          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="@/assets/images/icon-language.png" style="width: 16px; height: 16px; margin-right: 5px" alt="" />
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
      <div class="content-center-side">
        <div class="content-left-side-title">
          {{ t('header.title1') }}
        </div>
        <div class="content-left-side-content">
          {{ t('header.title2') }}
        </div>
        <div class="content-left-side-short-content">
          {{ t('header.title3') }}
        </div>
        <div class="content-left-side-content-use">
          <div class="content-left-side-content-start" >
            <a :href="DOWNLINK" @click="copyInvitationCode">{{ t('header.startBtn') }}</a>
          </div>
          <div class="content-left-side-content-getCard">
            <div @click="openCustomerService">{{ t('header.getCardBtn') }}</div>
          </div>
        </div>
        <div class="download-content">
          <div class="download-ios">
            <a :href="DOWNLINK" @click="copyInvitationCode"><img src="@/assets/images/download-ios.png" alt="" /></a>
          </div>
          <div class="download-android">
            <a :href="DOWNLINK" @click="copyInvitationCode"><img src="@/assets/images/download-android.png" alt="" /></a>
          </div>
        </div>
      </div>
<!--      <div class="content-right-side">-->
<!--        <img src="@/assets/images/banner-right-bg.png" alt="" />-->
<!--      </div>-->
    </div>
    <div class="image-side">
      <div style="position: absolute; left: 0; margin-top: 240px; margin-left: 50px">
        <img src="@/assets/images/icon-card.png" style="width: 343px; height: 218px" alt="" />
      </div>
      <div style="position: absolute; margin-top: -60px; right: 0">
        <img :src="headerImage" style="max-width: 495px; max-height: 539px" alt="" />
      </div>
    </div>
  </div>
  <div class="bottom-bg">
    <img src="@/assets/images/banner-bottom-bg.png" alt="" />
  </div>
</template>

<style scoped>
.header-part {
  background-color: #000;
  height: 1120px;

  .header-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 60px;
    background: #000;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);

    .name-side {
      display: flex;
      align-content: center;

      .title-name {
        display: flex;
        align-items: center;
        color: #fff;
        margin-left: 10px;
        font-size: 16px;
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
    }

    .language-side {
      display: flex;
      align-items: center;

      .option-type-language {
        margin: 0 20px;
        color: #fff;
        font-size: 14px;
        background-color: #EEEADF;
        padding: 10px 20px;
        border-radius: 50px;
        display: flex;
        align-items: center;

        .el-dropdown-link {
          color: #000;
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

    .content-center-side {
      flex: 1;
      margin: 20px 30px 20px 60px;
      text-align: center;

      .content-left-side-title {
        color: #fff;
        font-size: 48px;
        margin: 20px 0;
      }

      .content-left-side-content {
        color: #fff;
        font-size: 24px;
      }

      .content-left-side-short-content {
        color: #fff;
        font-size: 24px;
        margin-bottom: 40px;
      }

      .content-left-side-content-use {
        display: flex;
        justify-content: center;
        margin-bottom: 100px;

        .content-left-side-content-start {
          background: #EEEADF;
          color: #000;
          font-size: 20px;
          padding: 10px 50px;
          border-radius: 25px;
        }

        .content-left-side-content-getCard {
          background-color: #4C4C4C;
          color: #fff;
          padding: 10px 50px;
          border-radius: 25px;
          margin-left: 25px;
        }
      }

      .download-content {
        display: flex;
        justify-content: center;

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

  .image-side {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}

.bottom-bg {
  img {
    width: 100%;
  }
}
</style>