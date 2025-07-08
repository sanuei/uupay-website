<script setup lang="ts">
// import { REVIEW_ITEMS, CONTACTUS, DOWNLINK } from '@/constants/index'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import ReviewCard from './ReviewCard.vue'
import 'swiper/css'
import { useI18n } from "vue-i18n";
import { DOWNLINK } from '@/constants/index'

const SECTION_BG = 'review-section-bg'
// const FOOTER_BG = {
//     mobile: 'footer-mobile-bg',
//     desktop: 'footer-desktop-bg'
// }
const { t } = useI18n()

const getInvitationCode = (): string | null => {
  // 先取标准 query 参数
  const url = new URL(window.location.href)
  const codeFromQuery = url.searchParams.get('invitationCode')
  if (codeFromQuery) return codeFromQuery

  // 再从 hash 中解析（兼容 #/register?invitationCode=xxx）
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
</script>

<template>
    <section :class="['overflow-x-hidden md:mt-[117px] relative', SECTION_BG]">
      <div class="review-part">
        <div class="review-part-header">
          <div class="review-part-header-logo">
            <img src="@/assets/images/header-icon-logo-web-dark.png" style="width: 32px; height: 32px;" alt="" />
            <span class="title-name">{{ t('review.name') }}</span>
          </div>
        </div>
        <div style="color: #596780; font-size: 12px; margin-top: 10px;">
          {{ t('feature.content12') }}
        </div>
        <div style="color: #596780; font-size: 12px;">
          {{ t('feature.content13') }}
        </div>
        <div class="review-bottom">
          <div class="review-support">
            <div class="review-support-content">
              <div class="review-support-row-head">
                {{ t('review.support') }}
              </div>
              <div class="review-support-row">
                {{ t('review.fq') }}
              </div>
              <div class="review-support-row">
                <a :href="DOWNLINK" @click="copyInvitationCode">{{ t('review.downloadApp') }}</a>
              </div>
              <div class="review-support-row">
                {{ t('review.term')}}
              </div>
            </div>
            <div class="review-support-content">
              <div class="review-support-row-head">
                {{ t('review.help')}}
              </div>
              <div class="review-support-row">
                {{ t('review.faqs')}}
              </div>
              <div class="review-support-row">
                {{ t('review.contact')}}
              </div>
            </div>
            <div class="review-support-content">
              <div class="review-support-row-head">
                {{ t('review.about')}}
              </div>
              <div class="review-support-row">
                {{ t('review.mission')}}
              </div>
              <div class="review-support-row">
                {{ t('review.lead')}}
              </div>
              <div class="review-support-row">
                {{ t('review.safe')}}
              </div>
              <div class="review-support-row">
                {{ t('review.partner')}}
              </div>
              <div class="review-support-row">
                {{ t('review.join')}}
              </div>
              <div class="review-support-row">
                {{ t('review.plan')}}
              </div>
            </div>
          </div>
        </div>
        <div class="review-part-header-condition">
          {{ t('review.otherTerm')}}
        </div>
        <div class="review-part-header-copyright">
          Copyright © UUPAY 2025 All Rights Reserved
        </div>
      </div>
    </section>
</template>
<style scoped>
.review-part {
  background: #fff;
  padding: 10px 20px;

  .review-part-header {
    display: flex;
    justify-content: space-between;

    .review-part-header-logo {
      display: flex;
      align-items: center;

      .title-name {
        font-size: 16px;
        font-weight: 700;
        color: #000;
        margin-left: 10px;
      }
    }

    .review-part-header-button {
      font-size: 10px;
      background: #1573FF;
      color: #000;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      border-radius: 10px;
    }
  }

  .review-part-header-content {
    font-size: 8px;
    color: #000;
  }

  .review-bottom {
    display: flex;
    justify-content: space-between;

    .review-icon {
      .download-ios {
        width: 68px;
        margin-top: 10px;
      }

      .download-android {
        width: 68px;
        margin-top: 10px;
      }
    }

    .review-support {
      display: contents;

      .review-support-content {
        margin-right: 25px;

        .review-support-row-head {
          color: #1A202C;
          font-size: 12px;
          margin-top: 10px;
          font-weight: 600;
        }

        .review-support-row {
          color: #596780;
          font-size: 12px;
          margin-top: 10px;
        }
      }
    }
  }
  .review-part-header-condition {
    border-top: 1px solid #979797;
    font-size: 10px;
    color: #000;
    display: flex;
    justify-content: center;
    margin-top: 15px;
    padding-top: 20px;
  }

  .review-part-header-copyright {
    font-size: 10px;
    color: #000;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
}
</style>
