<script setup lang="ts">
// import { useScroll } from '@vueuse/core'
import {computed, ref} from "vue";
import {useI18n} from 'vue-i18n'

defineProps<{
  isFeature: boolean
  isExplore: boolean
  isContact: boolean
}>()

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
//         .then(() => {
//           console.log('包含邀请码的链接已复制:', window.location.href)
//         })
//         .catch(err => {
//           console.error('复制失败:', err)
//         })
//   } else {
//     console.log('没有邀请码，不执行复制')
//   }
// }

// const { y } = useScroll(window)
const featureClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:bg-background-blue before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
const exploreClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full  before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
const contactClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full  before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'


const {t, locale} = useI18n()

const selectedLanguage = ref(localStorage.getItem('language') || 'zh')

const languageList = computed(() => [
  {label: t('language.zh'), value: 'zh'},
  {label: t('language.zhtw'), value: 'zhtw'},
  {label: t('language.en'), value: 'en'},
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

// const openCustomerService = () => {
//   if (window.scBotHandler && typeof window.scBotHandler.expand === 'function') {
//     window.scBotHandler.expand()
//   } else {
//     console.warn('客服系统尚未加载')
//   }
// }

// const headerImage = computed(() => {
//   if (locale.value === 'zh') return headerImgZh
//   if (locale.value === 'zhtw') return headerImgTc
//   return headerImgEn
// })
</script>
<template>
  <div class="header-part">
    <div class="header-container">
      <div class="name-side">
        <img src="@/assets/images/logo.png" style="width: 40px; height: 40px;" alt=""/>
        <span class="title-name">{{ t('header.appName') }}</span>
      </div>
      <div class="option-side">
        <div class="option-type">
          <a href="#feature" :class="['relative', isFeature && featureClass]">
            {{ t('header.aboutPay') }}
          </a>
        </div>
        <div class="option-type">
          <a href="#explore" :class="['relative', isExplore && exploreClass]">
            {{ t('header.aboutUs') }}
          </a>
        </div>
        <div class="option-type">
          <a href="#contact" :class="['relative', isContact && contactClass]">
            {{ t('header.contactUs') }}
          </a>
        </div>
      </div>
      <div class="language-side">
        <div class="option-type-language">
          <el-dropdown trigger="click">
          <span class="el-dropdown-link">
            <img src="@/assets/images/icon-language.png" style="width: 16px; height: 16px;" alt=""/>
            <span>
              {{ currentLanguageLabel }}
            </span>
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
  </div>
</template>

<style scoped>
.header-part {
  padding: 0 300px;
  background-color: #121212;
  width: 100%;
  height: 100px;
  position: fixed;
  z-index: 11;

  .header-container {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .name-side {
      display: flex;
      align-content: center;
      width: 20%;

      .title-name {
        display: flex;
        align-items: center;
        color: #fff;
        margin-left: 8px;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .option-side {
      width: 60%;
      display: flex;
      align-items: center;

      .option-type {
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        display: flex;
        justify-content: center;
        width: 100%;
      }
    }

    .language-side {
      display: flex;
      align-items: center;
      width: 20%;
      justify-content: end;

      .option-type-language {
        width: 168px;
        height: 52px;
        color: #fff;
        font-size: 16px;
        background-color: #262626;
        border-radius: 30px;
        display: flex;
        align-items: center;
        justify-content: center;

        .el-dropdown-link {
          color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;

          span {
            margin: 0 10px;
          }
        }
      }
    }
  }
}

::v-deep(.el-dropdown-menu) {
  background-color: #f5f5f5;
  color: #333;
}

::v-deep(.el-dropdown-menu__item:hover) {
  background-color: #e0e0e0;
}
</style>
