<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {useHead} from "@unhead/vue";

const { locale, t } = useI18n()

useHead(() => ({
  title: t('aboutUs.metaTitle'),
  meta: [
    {
      name: 'description',
      content: t('aboutUs.description'),
    },
    {
      name: 'keywords',
      content: t('aboutUs.keywords'),
    },
  ],
  htmlAttrs: {
    lang: locale.value,
  }
}))

const advantagesListContent = computed(() => [
  { title: t('aboutUs.advantageList1') },
  { title: t('aboutUs.advantageList2') },
  { title: t('aboutUs.advantageList3') },
  { title: t('aboutUs.advantageList4') },
]);
</script>

<template>
  <section id="about-us" class="about-hero">
    <div class="about-header">
      <h1 class="about-header-title">{{ t('aboutUs.title') }}</h1>
      <div class="about-header-subTitle">{{ t('aboutUs.subTitle') }}</div>
    </div>

    <section class="about-content">
      <div class="about-title1">{{ t('aboutUs.mission') }}</div>
      <div class="about-subTitle1">{{ t('aboutUs.missionSub') }}</div>
    </section>

    <section class="about-content">
      <div class="about-title1">{{ t('aboutUs.services') }}</div>
      <div class="about-subTitle1">{{ t('aboutUs.servicesSub') }}</div>
    </section>

    <section class="about-advantages-section">
      <div class="about-advantages">{{ t('aboutUs.advantageTitle') }}</div>
      <div class="about-advantages-list">
        <div
            class="advantage-item"
            v-for="(item,index) in advantagesListContent"
            :key="index"
        >
          <div class="advantage-icon">{{ item.title }}️</div>
        </div>
      </div>
    </section>

    <section class="about-content">
      <div class="about-title1">{{ t('aboutUs.visionTitle') }}</div>
      <div class="about-subTitle1">{{ t('aboutUs.title') }}</div>
      <div class="about-vision">{{ t('aboutUs.visionSub') }}</div>
    </section>

    <div class="about-footer">{{ t('aboutUs.footer') }}</div>
  </section>
</template>

<style scoped>

</style>
