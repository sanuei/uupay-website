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
</script>

<template>
    <section :class="['overflow-x-hidden mt-10 md:mt-[117px] relative', SECTION_BG]">
      <div class="review-part">
        <div class="review-part-header">
          <div class="review-part-header-logo">
            <img src="@/assets/images/header-icon-logo-web.png" alt="" />
            <span class="title-name">{{ t('review.name') }}</span>
          </div>
          <div class="review-part-header-button">
            <a :href="DOWNLINK">{{ t('header.startBtn') }}</a>
          </div>
        </div>
        <div class="review-part-header-content" style="margin-top: 10px">
          {{ t('review.title1') }}
        </div>
        <div class="review-part-header-content" style="border-bottom: 1px solid #979797; padding-bottom: 10px">
          {{ t('review.title2') }}
        </div>
        <div class="review-bottom">
          <div class="review-icon">
            <div class="download-ios">
              <a :href="DOWNLINK"><img src="@/assets/images/download-ios.png" alt="" /></a>
            </div>
            <div class="download-android">
              <a :href="DOWNLINK"><img src="@/assets/images/download-android.png" alt="" /></a>
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
                <a :href="DOWNLINK">{{ t('review.downloadApp') }}</a>
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
  background: #2D2D2D;
  padding: 10px 20px;

  .review-part-header {
    display: flex;
    justify-content: space-between;

    .review-part-header-logo {
      display: flex;
      align-items: center;

      .title-name {
        font-size: 20px;
        color: #fff;
        margin-left: 10px;
      }
    }

    .review-part-header-button {
      font-size: 10px;
      background: #1573FF;
      color: #fff;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      border-radius: 10px;
    }
  }

  .review-part-header-content {
    font-size: 8px;
    color: #fff;
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
      display: flex;

      .review-support-content {
        margin-right: 25px;
        .review-support-row-head {
          color: #fff;
          font-size: 10px;
          margin-top: 10px;
        }

        .review-support-row {
          color: #fff;
          font-size: 10px;
          margin-top: 10px;
        }
      }
    }
  }
  .review-part-header-condition {
    font-size: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  .review-part-header-copyright {
    font-size: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
}
</style>
