<script setup lang="ts">
import { EXPLORE_ITEMS } from '@/constants/index.ts'
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)


defineExpose({ el })
</script>
<template>
    <section class="px-4 lg:px-0 relative" ref="el">
        <i id="explore" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
        <img class="hidden md:block absolute -top-[58%] left-0 w-full -z-10" src="@/assets/images/explore-bg.png" alt="explore background image" />

        <h2 class="text-5xl font-bold text-center pt-[70px] relative before:absolute before:content-[''] before:left-1/2 before:-translate-x-1/2 before:-bottom-8 before:w-[71px] before:h-[12px] before:rounded-[17px] before:bg-red-50 before:bg-gradient-to-b before:from-[rgba(178,235,242,1)] before:to-[rgba(209,196,233,1)]">发现</h2>
        <ul class="max-w-[840px] bg-white rounded-[48px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-[31px] md:gap-[60px] mt-[51px] md:px-[40px] pb-[50px] pt-[28px] md:py-[72px] [&>li:last-child]:md:col-span-2 [&>li:last-child]:md:justify-self-center [&>li:last-child]:md:max-w-[319px] shadow-[12px_12px_20px_rgba(0,0,0,0.1)]">
            <li v-for="item in EXPLORE_ITEMS" :key="item.title" class="flex flex-col w-full">
                <img :src="item.icon" :alt="item.title" class="w-[60px] mx-auto mb-[30px]" />
                <h3 class="mb-[12px] font-semibold text-lg text-center">{{ item.title }}</h3>
                <p class="text-base md:text-lg leading-[36px]">{{ item.desc }}</p>
            </li>
        </ul>
    </section>
</template>