<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'

const { y } = useWindowScroll(window);

const toTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
<template>
    <button
        v-show="y > 2222"
        @click.stop="toTop"
        class="w-14 h-14 md:w-[71.5px] md:h-[71.5px] rounded-full shadow-[0_0_49px_-2px_rgba(0,0,0,0.19)] flex justify-center items-center fixed right-4 md:right-[44.5px] bottom-12 md:bottom-[287.5px] bg-white z-40"
    >
        <img class="w-6" src="@/assets/images/arrow.svg" alt="arrow" />
    </button>
</template>