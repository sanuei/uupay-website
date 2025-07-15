<script setup lang="ts">
// import { REVIEW_ITEMS, CONTACTUS, DOWNLINK } from '@/constants/index'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import ReviewCard from './ReviewCard.vue'
import 'swiper/css'
import {useI18n} from "vue-i18n";
import { DOWNLINK } from "@/constants";

// const SECTION_BG = 'review-section-bg'
// const FOOTER_BG = {
//   mobile: 'footer-mobile-bg',
//   desktop: 'footer-desktop-bg'
// }
const { t } = useI18n()

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
</script>

<template>
  <div class="reviews-part">
<!--    <div class="review-header">-->
<!--      <div class="review-header-name">-->
<!--        <img src="@/assets/images/header-icon-logo-web.png" style="width: 30px; height: 30px; display: flex; align-items: center" alt="" />-->
<!--        <span class="title-name">{{ t('review.name') }}</span>-->
<!--      </div>-->
<!--      <div class="review-header-intro">-->
<!--        {{ t('review.startNotice') }}-->
<!--        <div class="start-use">-->
<!--          <a :href="DOWNLINK" @click="copyInvitationCode">{{ t('review.startBtn') }}</a>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <div class="review-bottom">
      <div class="review-icon">
        <div style="display: flex; align-items: center;">
          <img src="@/assets/images/header-icon-logo-web-dark.png" style="width: 32px; height: 32px;" alt="" />
          <span style="font-size: 16px; font-weight: 700;">{{ t('header.name') }}</span>
        </div>
        <div style="margin-top: 100px; color: #596780; font-size: 18px;">
          {{ t('feature.content12') }}
        </div>
        <div style="color: #596780; font-size: 18px;">
          {{ t('feature.content13') }}
        </div>
      </div>
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
    <div class="review-bottom-copyright">
      <div class="review-bottom-copyright-title">
        {{ t('review.policy')}}
        <span style="margin: 0 20px;">
          |
        </span>
        {{ t('review.condition')}}
        <span style="margin: 0 20px;">
          |
        </span>
        {{ t('review.policy')}}
      </div>
      <div class="review-bottom-copyright-condition">
        © UUPay 2025
      </div>
    </div>
  </div>
</template>
<style scoped>
.reviews-part {
  background: #fff;
  padding: 20px 200px;

  .review-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #979797;
    padding: 20px 0 50px 0;

    .review-header-name {
      display: flex;
      align-items: center;
      flex: 1;

      .title-name{
        color: #fff;
        display: flex;
        align-items: center;
        margin-left: 10px;
      }
    }

    .review-header-intro {
      width: 100%;
      color: #fff;
      flex: 1;
      display: flex;
      justify-content: end;
      align-items: center;

      .start-use {
        margin-left: 20px;
        background: #1573FF;
        padding: 10px 15px;
        border-radius: 15px;
      }
    }
  }

  .review-bottom {
    margin: 50px 0 0 0;
    display: flex;
    justify-content: space-between;
    gap: 80px;

    .review-icon {
      .download-ios {
        margin-bottom: 30px;
      }
    }

    .review-support {
      display: flex;

      .review-support-content {
        margin-right: 200px;

        .review-support-row-head {
          color: #1A202C;
          font-weight: 600;
          font-size: 20px;
        }

        .review-support-row {
          margin-top: 30px;
          color: #596780;
          font-size: 16px;
        }
      }
    }
  }

  .review-bottom-copyright {
    border-top: 1px solid #CEBEFE;
    display: flex;
    justify-content: space-between;
    padding-top: 30px;
    margin: 100px 0 50px 0;

    .review-bottom-copyright-title {
      color: #000;
      font-size: 18px;
      font-weight: 600;
    }

    .review-bottom-copyright-condition {
      color: #596780;
      font-weight: 500;
      font-size: 16px;
    }
  }
}
</style>
