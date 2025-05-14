<script setup lang="ts">
import { ref } from 'vue'
import { FEATURE_ITEMS } from '@/constants'
import exploreBgMobile from '@/assets/images/explore-bg-mobile.png'

const el = ref<HTMLElement | null>(null)

defineExpose({ el })
</script>

<template>
    <section class="relative" ref="el">
        <i id="feature" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
        <h2
            class="text-5xl font-bold text-center pt-[80px] relative before:absolute before:content-[''] before:left-1/2 before:-translate-x-1/2 before:-bottom-8 before:w-[71px] before:h-[12px] before:rounded-[17px] before:bg-red-50 before:bg-gradient-to-b before:from-[rgba(178,235,242,1)] before:to-[rgba(209,196,233,1)]">
            特征</h2>
        <div class="max-w-[1220px] mx-auto pt-10 lg:mt-11 relative">
            <img class="md:hidden absolute -bottom-[7%] left-0 w-full -z-10" :src="exploreBgMobile"
                alt="explore mobile background image" />
            <ul class="px-4">
                <li v-for="(feature, index) in FEATURE_ITEMS" :key="index"
                    class="flex flex-col lg:flex-row justify-between items-center"
                    :class="[
                        feature.reverse ? 'lg:flex-row-reverse' : '',
                        index !== FEATURE_ITEMS.length - 1 ? 'mb-6 md:mb-[81px] lg:mb-10' : ''
                    ]">
                    <div class="relative w-full md:w-[60%] lg:w-[42%] mb-[40px] lg:mt-0">
                        <img :src="feature.images.back" :alt="`feature set ${index + 1} back`"
                            :class="feature.imageStyles.container" />
                        <img :src="feature.images.front" :alt="`feature set ${index + 1} front`"
                            :class="feature.imageStyles.front" />
                    </div>
                    <div class="w-full sm:w-[60%] lg:w-[49%]">
                        <h3 class="font-semibold text-xl md:text-2xl lg:text-[32px] relative"
                            :class="[feature.reverse ? 'lg:text-right pr-8' : 'pl-8']">
                            {{ feature.title }}
                            <span
                                class="absolute top-1/2 -translate-y-1/2 w-[18px] h-[18px] rounded-full bg-background-green"
                                :class="[feature.reverse ? 'right-0' : 'left-0']"></span>
                        </h3>
                        <p class="text-base lg:text-2xl mt-[10px] lg:mt-5 leading-[36px]"
                            :class="{ 'lg:text-right': feature.reverse }">
                            {{ feature.content }}
                        </p>
                    </div>
                </li>
            </ul>
        </div>
    </section>
</template>