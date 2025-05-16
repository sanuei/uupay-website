<script setup lang="ts">
import { ref, computed } from 'vue'
import {
    Header,
    HeaderWeb,
    Feature,
    FeatureWeb,
    Explore,
    ExploreWeb,
    Reviews,
    ReviewsWeb,
    BackToTop
} from '@/components'
import { useScroll } from '@/composables/useScroll'
import { useDevice } from '@/composables/useDevice'

const { isMobile } = useDevice()
const featureRef = ref<InstanceType<typeof Feature> | null>(null)
const exploreRef = ref<InstanceType<typeof Explore> | null>(null)


const { isFeature, isExplore } = useScroll(
    computed(() => featureRef.value?.el ?? null),
    computed(() => exploreRef.value?.el ?? null),
)

</script>
<template>
    <!-- Header -->
    <Header v-if="isMobile" :is-feature="isFeature" :is-explore="isExplore" />
    <HeaderWeb v-else :is-feature="isFeature" :is-explore="isExplore" />

    <!-- Banner -->
<!--    <Banner v-if="isMobile" />-->

    <!-- Feature -->
    <Feature v-if="isMobile" ref="featureRef" />
    <FeatureWeb v-else ref="featureWebRef"/>

    <!-- Explore -->
    <Explore  v-if="isMobile" ref="exploreRef" />
    <ExploreWeb v-else ref="exploreRef" />
    <!-- Reviews -->
    <Reviews  v-if="isMobile" />
    <ReviewsWeb v-else />
    <!-- BackToTop -->
    <BackToTop />
</template>