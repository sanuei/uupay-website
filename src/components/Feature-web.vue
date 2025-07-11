<script setup lang="ts">
import {computed, ref} from 'vue'
import {useI18n} from "vue-i18n";
import {DOWNLINK} from "@/constants";
import headerImgZh from '@/assets/images/icon-take-phone-zh.png'
import headerImgEn from '@/assets/images/icon-take-phone-en.png'
import headerImgTc from '@/assets/images/icon-take-phone-tc.png'

const el = ref<HTMLElement | null>(null)

defineExpose({el})
const { locale, t } = useI18n()

const selected = ref<'virtual' | 'physical'>('virtual')

const activeCard = selected

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

const headerImage = computed(() => {
  if (locale.value === 'zh') return headerImgZh
  if (locale.value === 'zhtw') return headerImgTc
  return headerImgEn
})
</script>
<template>
  <section class="relative" ref="el">
    <i id="feature" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
    <div class="feature-part relative" ref="el">
      <div class="feature-header">
        <div class="feature-header-title">
          {{ t('feature.title1') }}
        </div>
        <div class="feature-header-content">
          <div style="font-size: 40px; font-weight: 700">
            {{ t('feature.content1') }}
          </div>
          <div style="font-size: 20px; color: #596780">
            {{ t('feature.content5') }}
          </div>
        </div>
        <div class="feature-header-short-content">

        </div>
      </div>
      <div class="feature-function">
        <div class="feature-function-intro">
          <div class="feature-part-function-img">
            <img src="@/assets/images/transfer-background.png" alt="" />
          </div>
          <div class="feature-function-intro-title">
            {{ t('feature.title2') }}
          </div>
          <div class="feature-function-intro-content">
            {{ t('feature.content2') }}
          </div>
        </div>
        <div class="feature-function-intro">
          <div class="feature-part-function-img">
            <img src="@/assets/images/transferDetail-background.png" alt="" />
          </div>
          <div class="feature-function-intro-title">
            {{ t('feature.title3') }}
          </div>
          <div class="feature-function-intro-content">
            {{ t('feature.content4') }}
          </div>
        </div>
        <div class="feature-function-intro">
          <div class="feature-part-function-img">
            <img src="@/assets/images/card-payment-background.png" alt="" />
          </div>
          <div class="feature-function-intro-title">
            {{ t('feature.title4') }}
          </div>
          <div class="feature-function-intro-content">
            {{ t('feature.content7') }}
          </div>
        </div>
      </div>
    </div>
    <div class="feature-medium-part" style="background-color: #000; padding: 100px 50px;">
      <div class="feature-medium-part-content">
        <div class="feature-medium-part-bg">
          <img src="@/assets/images/event-background.png" style="width: 239px;" alt=""/>
        </div>
        <div class="feature-medium-part-intro">
          <div class="feature-medium-part-intro-column">
            <div class="feature-medium-part-intro-column-title" style="font-weight: 600">
              {{ t('feature.title6') }}
            </div>
            <div class="feature-medium-part-intro-column-content">
              {{ t('feature.title5') }}
            </div>
            <div class="feature-medium-part-intro-column-content-other">
              {{ t('feature.content3') }}
            </div>
          </div>
          <div class="feature-medium-part-intro-column-step">
            <div class="feature-medium-part-intro-column-step-progress">
              <div>
                <img src="@/assets/images/icon-one.png" style="width: 48px;" alt="" />
              </div>
              <div class="text">
                {{ t('feature.content4') }}
              </div>
            </div>
            <div class="feature-medium-part-medium-bg">
              <img src="@/assets/images/row-line.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-step-progress">
              <div>
                <img src="@/assets/images/icon-two.png" style="width: 48px;" alt="" />
              </div>
              <div class="text">
                {{ t('feature.content8') }}
              </div>
            </div>
            <div class="feature-medium-part-medium-bg">
              <img src="@/assets/images/row-line-other.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-step-progress">
              <div>
                <img src="@/assets/images/icon-three.png" style="width: 48px;" alt="" />
              </div>
              <div class="text">
                {{ t('feature.content6') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-medium-part" style="padding: 100px 60px;">
      <div class="feature-medium-part-content">
        <div>
          <div style="color: #0052B4; font-size: 20px; font-weight: 600;">
            {{ t('feature.title7') }}
          </div>
          <div style="color: #0D121F; font-size: 40px; font-weight: 700; margin-top: 20px;">
            {{ t('feature.title8') }}
          </div>
          <div class="toggle-wrapper">
            <div
              :class="['toggle-btn', selected === 'virtual' ? 'active' : '']"
              @click="selected = 'virtual'"
            >
              {{ t('feature.virtualCard') }}
            </div>
            <div
              :class="['toggle-btn', selected === 'physical' ? 'active' : '']"
              @click="selected = 'physical'"
            >
              {{ t('feature.physicalCard') }}
            </div>
          </div>
          <div style="color: #0D121F; font-size: 24px; font-weight: 700; margin: 40px 0;">
            {{ t('feature.title9') }}
          </div>
          <div style="color: #0D121F; font-size: 18px; font-weight: 500; display: flex">
            <img src="@/assets/images/icon-tick.png" style="width: 24px; height: 24px; margin-right: 10px;" alt="" />
            {{ t('feature.title10') }}
          </div>
          <div style="color: #0D121F; font-size: 18px; font-weight: 500; display: flex; margin: 20px 0;">
            <img src="@/assets/images/icon-tick.png" style="width: 24px; height: 24px; margin-right: 10px;" alt="" />
            {{ t('feature.title7') }}
          </div>
          <div style="color: #0D121F; font-size: 18px; font-weight: 500; display: flex; margin: 20px 0;">
            <img src="@/assets/images/icon-tick.png" style="width: 24px; height: 24px; margin-right: 10px;" alt="" />
            {{ t('feature.title11') }}
          </div>
        </div>
        <div class="feature-medium-part-content-img">
          <div class="card-container">
            <div
              class="card card-virtual"
              :class="{ active: activeCard === 'virtual' }"
            >
              <img src="@/assets/images/virtual-card.png" alt=""/>
            </div>

            <div
              class="card card-physical"
              :class="{ active: activeCard === 'physical' }"
            >
              <img src="@/assets/images/physical-card.png" alt=""/>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="download-part">
      <div class="download-part-bg">
        <div class="download-part-title">
          <div class="title">
            {{ t('header.downloadBtn') }}
          </div>
          <div style="font-size: 40px; font-weight: 600; color: #fff; margin: 50px 0;">
            {{ t('feature.content9') }}
          </div>
          <div style="color: #fff; font-size: 20px; display: flex; align-items: center;">
            <div>
              {{ t('feature.content10') }}
            </div>
            <div style="color: #000; background-color: #fff; padding: 10px 50px; border-radius: 25px; margin-left: 20px; font-size: 16px; font-weight: 600;">
              <a :href="DOWNLINK" @click="copyInvitationCode">{{ t('feature.content11') }}</a>
            </div>
          </div>
          <div style="display: flex; margin-top: 50px;">
            <a :href="DOWNLINK" @click="copyInvitationCode"><img src="@/assets/images/download-ios.png" alt=""/></a>
            <a :href="DOWNLINK" @click="copyInvitationCode"><img src="@/assets/images/download-android.png" alt="" style="margin-left: 30px;"/></a>
          </div>
        </div>
        <div>
          <img :src="headerImage" style="width: 495px; height: 539px" alt="" />
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.feature-part {
  padding: 60px 0;

  .feature-header {
    padding: 0 60px;

    .feature-header-title {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .feature-header-content {
      display: flex;
      justify-content: space-between;
      width: 100%;
      font-size: 24px;

      div {
        flex: 1;
        text-align: left;
      }

      div:last-child {
        text-align: left;
      }
    }

    .feature-header-short-content {
      font-size: 24px;
      margin-top: 50px;
    }
  }

  .feature-function {
    display: flex;
    justify-content: space-between;
    padding: 0 60px;

    .feature-function-intro {
      background: #FFFFFF66;
      border: 1px solid #FFFFFF66;
      padding: 10px 15px;

      .feature-function-intro-title {
        font-size: 24px;
        font-weight: 600;
        margin-top: 20px;
      }

      .feature-function-intro-content {
        font-size: 16px;
        margin-top: 30px;
        color: #596780;
      }
    }
  }
}

.feature-medium-part {

  .feature-medium-part-content {
    display: flex;
    justify-content: space-around;

    .feature-medium-part-bg {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .feature-medium-part-medium-bg {
      margin-left: 23px;
      height: 25px;
      width: 2px;
    }

    .feature-medium-part-intro {
      width: 100%;

      .feature-medium-part-intro-column {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        padding: 10px 25px;
        border-radius: 15px;
        margin-bottom: 50px;

        .feature-medium-part-intro-column-img {
          margin-bottom: 10px;
        }

        .feature-medium-part-intro-column-title {
          color: #D9D9D9;
          font-weight: 500;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .feature-medium-part-intro-column-content {
          color: #fff;
          font-size: 40px;
          font-weight: 700;
        }

        .feature-medium-part-intro-column-content-other {
          color: #90A3BF;
          font-size: 20px;
          margin-top: 20px;
        }
      }

      .feature-medium-part-intro-column-step {
        padding: 0 40px;

        .feature-medium-part-intro-column-step-progress {
          display: flex;
          align-items: center;

          .text {
            margin-left: 20px;
            color: #fff;
            font-weight:500;
            font-size: 20px;
          }
        }
      }
    }
  }

  .feature-medium-part-content-img {

    .card-container {
      position: relative;
      width: 302px;
      height: 442px;
      perspective: 1000px;
      align-items: center;
      display: flex;
    }

    .card {
      position: absolute;
      transition: all 0.5s ease;
      transform: rotate(-5deg) translateY(20px);
      z-index: 1;
    }

    .card img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card.active {
      z-index: 2;
      transform: rotate(0deg) translateY(0);
    }
  }

  .toggle-wrapper {
    display: flex;
    background-color: #f4f6f9;
    border-radius: 30px;
    padding: 4px;
    width: fit-content;
  }

  .toggle-btn {
    padding: 8px 20px;
    border-radius: 30px;
    font-size: 14px;
    color: #a4b0be;
    cursor: pointer;
    transition: all 0.3s;
  }

  .toggle-btn.active {
    background-color: #0057d9; /* 蓝色 */
    color: white;
  }
}

.download-part {
  background-color: #000;

  .download-part-bg {
    display: flex;
    justify-content: space-around;

    .download-part-image {
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
    }

    .download-part-title {
      padding: 50px;
      .title {
        color: #fff;
        font-size: 32px;
        font-weight: 600;
      }
    }
  }
}
</style>