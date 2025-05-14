<script setup lang="ts">
interface Props {
    words: string
    name: string
    title: string
    avatar: string
}

defineProps<Props>()
</script>

<template>
    <div
        class="w-full md:w-[400px] lg:w-[568px] border border-white border-solid flex-shrink-0 bg-white rounded-lg overflow-hidden">
        <div class="pt-[36px] pr-[32px] pb-10 sm:pb-[71px] pl-[56px] h-[230px] lg:h-[337px]">
            <div class="flex justify-between mb-[30px]">
                <img class="object-contain self-end" src="@/assets/images/rating.png" alt="stars" />
                <img class="w-[53px] lg:w-fit" src="@/assets/images/quotes.svg" alt="quotes" />
            </div>
            <p class="text-[20px] lg:text-[32px] text-text-blue-dark line-clamp-4 lg:line-clamp-5">{{ words }}</p>
        </div>
        <div class="bg-background-blue flex items-center pl-[57px] py-[17px]">
            <img :src="avatar" alt="avatar"
                class="w-[63px] sm:w-[104px] h-[63px] sm:h-[104px] object-cover rounded-full" />
            <div class="pl-[25px] text-white">
                <h3 class="font-black text-[20px] sm:text-[27px]">{{ name }}</h3>
                <p class="text-sm sm:text-base">{{ title }}</p>
            </div>
        </div>
    </div>
</template>

<style>
@tailwind utilities;

@layer utilities {
    .line-clamp-4 {
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .line-clamp-5 {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
}
</style>