<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    Header,
    Banner,
    Feature,
    Explore,
    Reviews,
    BackToTop
} from '@/components'
import { useScroll } from '@/composables/useScroll'

const featureRef = ref<InstanceType<typeof Feature> | null>(null)
const exploreRef = ref<InstanceType<typeof Explore> | null>(null)

const { isFeature, isExplore } = useScroll(
    computed(() => featureRef.value?.el ?? null),
    computed(() => exploreRef.value?.el ?? null),
)

</script>
<template>
    <!-- Header -->
    <Header :is-feature="isFeature" :is-explore="isExplore" />
    
    <!-- Banner -->
    <Banner />

    <!-- Feature -->
    <Feature ref="featureRef" />
    
    <!-- Explore -->
    <Explore ref="exploreRef" />

    <!-- Reviews -->
    <Reviews />

    <!-- BackToTop -->
    <BackToTop />
</template>