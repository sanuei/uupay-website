<script setup lang="ts">
import { REVIEW_ITEMS, CONTACTUS, DOWNLINK } from '@/constants/index'
import { Swiper, SwiperSlide } from 'swiper/vue'
import ReviewCard from './ReviewCard.vue'
import 'swiper/css'

const SECTION_BG = 'review-section-bg'
const FOOTER_BG = {
    mobile: 'footer-mobile-bg',
    desktop: 'footer-desktop-bg'
}
</script>

<template>
    <section :class="['overflow-x-hidden mt-10 md:mt-[117px] relative', SECTION_BG]">
      <div class="review-part">
        <div class="review-part-header">
          <div>

          </div>
          <div>
            开始使用
          </div>
        </div>
      </div>
    </section>
</template>
<style scoped>
.review-part {
  background: #979797;

  .review-part-header {

  }
}
</style>