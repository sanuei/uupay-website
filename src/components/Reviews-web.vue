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
</script>

<template>
  <div class="reviews-part">
    <div class="review-header">
      <div class="review-header-name">
        <img src="@/assets/images/header-icon-logo-web.png" style="width: 30px; height: 30px; display: flex; align-items: center" alt="" />
        <span class="title-name">{{ t('review.name') }}</span>
      </div>
      <div class="review-header-intro">
        {{ t('review.startNotice') }}
        <div class="start-use">
          <a :href="DOWNLINK">{{ t('review.startBtn') }}</a>
        </div>
      </div>
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
    <div class="review-bottom-copyright">
      <div class="review-bottom-copyright-title">
        © 2025 UUPAY {{ t('review.rightServe')}}
      </div>
      <div class="review-bottom-copyright-condition">
        <div class="review-bottom-copyright-condition-title">
          {{ t('review.condition')}}
        </div>
        <div class="review-bottom-copyright-condition-title">
          {{ t('review.policy')}}
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.reviews-part {
  background: #2D2D2D;
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
          color: #fff;
        }

        .review-support-row {
          margin-top: 30px;
          color: #fff;
        }
      }
    }
  }

  .review-bottom-copyright {
    display: flex;
    justify-content: space-between;
    margin: 100px 0 50px 0;

    .review-bottom-copyright-title {
      color: #fff;
    }

    .review-bottom-copyright-condition {
      display: flex;

      .review-bottom-copyright-condition-title {
        color: #fff;
        margin: 0 60px;
      }
    }
  }
}
</style>
