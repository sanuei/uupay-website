<script setup lang="ts">
import { DOWNLINK } from '@/constants'

</script>
<template>
    <section class="relative px-4 lg:px-0">
        <img class="absolute top-0 right-0 w-[46vw] lg:hidden" src="@/assets/images/banner-mobile.png" alt="banner image">
        <div class="max-w-[1280px] mx-auto px-[23px] lg:mb-[10vw] 2xl:mb-[15vw]">
            <div class="pt-6 md:pt-10 lg:pt-[81px] w-full adaptive-container">
                <h2 class="text-[32px] adaptive-title font-bold mb-6 leading-[43px] lg:leading-[65px] text-center lg:text-left">
                    <span class="text-text-blue">有得聊</span>
                    <span>
                        - 极致沟通体验，畅享无界社交！
                    </span>
                </h2>
                <p class="text-text-grey adaptive-description font-semibold leading-[48px] hidden lg:block">
                    有得聊是一款集高效、安全与极速体验于一体的全能通讯软件，包体小于80MB，功能却强大到超乎想象！无论是日常私聊、远程会议，还是群组互动、语音视频通话，我们都能为你带来无缝、流畅的沟通体验，助你随时随地轻松连接世界！
                </p>
            </div>
        </div>
        <div class="lg:hidden">
            <div class="flex flex-col lg:flex-row justify-between items-center mb-12 lg:mb-[81px]">
                <div class="relative w-full md:w-[60%] lg:w-[42%] mb-0 lg:mb-[40px] lg:mt-0">
                    <img src="@/assets/images/feature-set1-back.png" alt="back" class="w-full" />
                    <img src="@/assets/images/feature-set1-front.png" alt="front" class="absolute top-0 left-1/2 -translate-x-1/2 w-[63%] 2xl:w-[410px]" />
                </div>
            </div>
        </div>
        <div class="flex justify-center lg:mt-6">
            <a class="bg-background-blue text-white mr-[13.5px] w-[128px] lg:w-[176px] h-[52px] flex justify-center items-center rounded-[8px] text-xl lg:text-[32px] leading-[24px]" :href="DOWNLINK">立即下载</a>
        </div>
    </section>
</template>
<style scoped>
@media (min-width: 1024px) and (max-width: 1220px) {
    .adaptive-container {
        max-width: clamp(470px, calc(470px + (570 - 470) * ((100vw - 1024px) / (1220 - 1024))), 570px);
    }

    .adaptive-title {
        font-size: clamp(32px, calc(32px + (48 - 32) * ((100vw - 1024px) / (1220 - 1024))), 48px);
    }

    .adaptive-description {
        font-size: clamp(16px, calc(16px + (24 - 16) * ((100vw - 1024px) / (1220 - 1024))), 24px);
    }
}

@media (max-width: 1023px) {
    .adaptive-container {
        max-width: 100%;
    }

    .adaptive-title {
        font-size: 32px;
    }
    .adaptive-description {
        font-size: 16px;
    }
}

@media (min-width: 1221px) {
    .adaptive-container {
        max-width: 570px;
    }

    .adaptive-title {
        font-size: 48px;
    }
    .adaptive-description {
        font-size: 24px;
    }
}
</style>