<script setup lang="ts">
// import { REVIEW_ITEMS, CONTACTUS, DOWNLINK } from '@/constants/index'
// import { Swiper, SwiperSlide } from 'swiper/vue'
// import ReviewCard from './ReviewCard.vue'
import 'swiper/css'
import {useI18n} from "vue-i18n";

// const SECTION_BG = 'review-section-bg'
// const FOOTER_BG = {
//   mobile: 'footer-mobile-bg',
//   desktop: 'footer-desktop-bg'
// }
const { t } = useI18n()
</script>

<template>
  <div class="reviews-part">
    <div class="reviews-part-header">
      <div class="reviews-part-header-left">
        <div>
          <div class="reviews-part-header-left-title">
            {{ t('review.leftContent1') }}
          </div>
          <div class="reviews-part-header-left-title">
            {{ t('review.leftContent2') }}
          </div>
        </div>
      </div>
      <div class="reviews-part-header-right">
        <div class="review-part-col">
          <div class="review-part-col-title">
            {{ t('review.rightTitle1') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent1') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent2') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent3') }}
          </div>
        </div>
        <div class="review-part-col">
          <div class="review-part-col-title">
            {{ t('review.rightTitle2') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent4') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent5') }}
          </div>
        </div>
        <div class="review-part-col">
          <div class="review-part-col-title">
            {{ t('review.rightTitle3') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent6') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent7') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent8') }}
          </div>
        </div>
        <div class="review-part-col">
          <div class="review-part-col-title">
            {{ t('review.rightTitle4') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent9') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent10') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent11') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent12') }}
          </div>
          <div class="review-part-col-content">
            {{ t('review.rightContent13') }}
          </div>
        </div>
      </div>
    </div>
    <div class="review-policy">
      <div class="policy-left">
        {{ t('review.policy') }}
        <span class="line">
          |
        </span>
        {{ t('review.condition') }}
        <span class="line">
          |
        </span>
        {{ t('review.cookie') }}
      </div>
      <div class="policy-right">
        {{ t('review.time') }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.reviews-part {
  background-color: #1A1A1A;
  padding: 120px;
}

.reviews-part-header {
  display: flex;
  width: 100%;
}

.reviews-part-header-left {
  width: 30%;
  display: flex;
  align-items: center;
}

.reviews-part-header-left-title {
  color: #ACACAC;
  font-size: 18px;
}

.reviews-part-header-right {
  width: 70%;
  display: flex;
}

.review-part-col {
  flex: 1;
}

.review-part-col-title {
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 32px;
}

.review-part-col-content {
  color: #ACACAC;
  font-size: 16px;
  margin-bottom: 24px;
}

.review-policy {
  margin-top: 138px;
  display: flex;
  justify-content: space-between;
}

.policy-left {
  color: #fff;
  font-size: 18px;
  font-weight: 600;
}

.line {
  margin: 0 32px;
}

.policy-right {
  color: #ACACAC;
  font-size: 16px;
  font-weight: 500;
}
</style>
