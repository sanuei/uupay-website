<script setup lang="ts">
import { useScroll } from '@vueuse/core'

defineProps<{
    isFeature: boolean
    isExplore: boolean
}>()

const { y } = useScroll(window)

const featureClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:bg-background-blue before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
const exploreClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:bg-background-blue before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
</script>
<template>
    <header class="h-[70px] lg:h-[103px] z-50 transition-all sticky top-0" :class="[y >= 10 && 'bg-white']">
        <ul class="flex items-center max-w-[1280px] px-[23px] mx-auto h-full">
            <li class="flex items-center">
                <img class="w-[38px] lg:w-[53px]" src="@/assets/images/header-icon.svg" alt="header icon" />
                <span class="ml-[9px] font-bold text-2xl lg:text-[30px]">有得聊</span>
            </li>
            <li class="ml-[23px] lg:ml-[62px] text-base lg:text-xl font-semibold text-text-blue">
                <a href="#feature" :class="['relative', isFeature && featureClass]">特征</a>
            </li>
            <li class="ml-[23px] lg:ml-[60px] text-base lg:text-xl font-semibold text-text-blue">
                <a href="#explore" :class="['relative', isExplore && exploreClass]">发现</a>
            </li>
        </ul>
    </header>
</template>