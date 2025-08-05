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
    BackToTop,
    BannerWeb,
    Banner,
    ContactUsWeb,
} from '@/components'
import { useScroll } from '@/composables/useScroll'
import { useDevice } from '@/composables/useDevice'

const { isMobile } = useDevice()
const featureRef = ref<InstanceType<typeof Feature> | null>(null)
const exploreRef = ref<InstanceType<typeof Explore> | null>(null)
const contactRef = ref<InstanceType<typeof Explore> | null>(null)

const { isFeature, isExplore, isContact } = useScroll(
    computed(() => featureRef.value?.el ?? null),
    computed(() => exploreRef.value?.el ?? null),
    computed(() => contactRef.value?.el ?? null),
)
</script>
<template>
    <!-- Header -->
    <Header v-if="isMobile" :is-feature="isFeature" :is-explore="isExplore" />
    <HeaderWeb v-else :is-feature="isFeature" :is-explore="isExplore" :is-contact="isContact" />

    <!-- Banner -->
    <Banner v-if="isMobile" />
    <BannerWeb v-else />
    <!-- Feature -->
    <Feature v-if="isMobile" ref="featureRef" />
    <FeatureWeb v-else ref="featureWebRef"/>

    <!-- Explore -->
    <Explore  v-if="isMobile" ref="exploreRef" />
    <ExploreWeb v-else ref="exploreRef" />

    <ContactUsWeb v-if="!isMobile" ref="contactRef" />
    <!-- Reviews -->
    <Reviews  v-if="isMobile" />
    <ReviewsWeb v-else />
    <!-- BackToTop -->
    <BackToTop />
</template>