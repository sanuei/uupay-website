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
        <!-- Desktop Reviews -->
        <ul class="h-fit md:mb-[126px] px-4 md:px-0 flex justify-center gap-[38px] z-20 w-full md:w-[1280px] mx-auto">
            <li v-for="review in REVIEW_ITEMS" :key="review.title"
                class="hidden md:block w-[568px]">
                <ReviewCard v-bind="review" />
            </li>
        </ul>

        <!-- Mobile Reviews -->
        <ul class="mb-12 block md:hidden w-[calc(100%-32px)] mx-auto">
            <swiper :spaceBetween="30" class="mySwiper">
                <SwiperSlide v-for="review in REVIEW_ITEMS" :key="review.title" class="w-full">
                    <ReviewCard v-bind="review" />
                </SwiperSlide>
            </swiper>
        </ul>

        <!-- Download Section -->
        <div class="text-center mb-10 md:mb-[99px]">
            <p class="px-8 sm:px-0 text-xl md:text-3xl lg:text-5xl font-semibold">
                立即下载<span class="text-text-blue">有得聊</span>，体验前所未有的极致沟通！
            </p>
        </div>

        <!-- Action Buttons -->
        <div class="text-white text-xl md:text-2xl flex justify-center">
            <a class="bg-background-blue mr-[13.5px] w-[128px] md:w-[144px] h-[52px] flex justify-center items-center rounded-[8px]"
                :href="DOWNLINK">立即下载</a>
            <a class="bg-background-yellow ml-[13.5px] w-[144px] h-[52px] flex justify-center items-center rounded-[8px]"
                :href="CONTACTUS">联系我们</a>
        </div>

        <!-- Footer -->
        <div :class="['md:pb-[80px] pt-16 md:pt-[103px] relative', FOOTER_BG.mobile, FOOTER_BG.desktop]">
            <div
                class="max-w-[1280px] mx-auto lg:grid lg:grid-cols-3 flex flex-col-reverse lg:flex-row text-center lg:text-left gap-4 sm:gap-6 lg:gap-[120px]">
                <p></p>
                <p class="text-[10px] sm:text-base">Copyright © 有得聊 2025 All Rights Reserved</p>
                <p class="text-[10px] sm:text-base">服务协议 | 隐私政策 | 可接受使用政策</p>
            </div>
        </div>
    </section>
</template>
<style scoped>
.mySwiper {
    width: 100%;
}

.review-section-bg::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -10;
    background-image: url('../assets/images/review-bg.png');
    background-size: cover;
}

.footer-mobile-bg::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 16/9;
    background-image: url('../assets/images/footer-bg-mobile.png');
    background-repeat: no-repeat;
    background-size: contain;
    background-position: bottom;
    z-index: -10;
}

@media (min-width: 640px) {
    .footer-mobile-bg::before {
        display: none;
    }
}

.footer-desktop-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    width: 100%;
    background-image: url('../assets/images/footer-bg.png');
    background-size: cover;
    z-index: -10;
    display: none;
}

@media (min-width: 640px) {
    .footer-desktop-bg::after {
        display: block;
    }
}
</style>