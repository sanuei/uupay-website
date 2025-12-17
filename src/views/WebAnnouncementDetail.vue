<script setup lang="ts">
import {ArrowLeft, Calendar, Newspaper, RefreshCw, Settings, ShieldCheck, Sparkles, User} from "lucide-vue-next";
import {useI18n} from "vue-i18n";
import { useAnnouncementStore } from '@/stores/announcement'
import {useRoute, useRouter} from 'vue-router'
import {useHead} from "@unhead/vue";
import {computed, onMounted, watch} from "vue";

const router = useRouter()
const route = useRoute()
const { locale, t } = useI18n()
const announcementStore = useAnnouncementStore()

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

const announcementData = computed(() => announcementStore.current)

async function loadDetail() {
  const id = route.params.id as string
  if (!id) return

  await announcementStore.loadById(id)

  if (!announcementStore.current) {
    router.replace(`/${route.params.lang}/announcement`)
  }
}

onMounted(loadDetail)

watch(
    () => route.params.id,
    () => loadDetail()
)

function getCategoryName(category: any) {
  const names: Record<string, string> = {
    update: '产品更新',
    feature: '新功能',
    maintenance: '系统维护',
    security: '安全公告',
    news: '新闻动态',
  };
  return names[category] || '公告';
}

const iconMap: Record<string, any> = {
  update: RefreshCw,
  feature: Sparkles,
  maintenance: Settings,
  security: ShieldCheck,
  news: Newspaper,
}

const getCategoryIcon = (cat: any) => {
  return iconMap[cat] || iconMap.default
}

function goBack() {
  router.push({
    path: `/${locale.value}/announcements`,
    hash: route.hash,
    query: route.query
  });
}
</script>

<template>
  <section class="announcement-detail-hero">
    <div class="container">
      <div class="back-button" @click="goBack">
        <ArrowLeft />
        {{t('goBackAnnounce')}}
      </div>

      <div class="announcement-detail-header" id="announcement-header">
        <div class="announcement-detail-meta">
                    <span class="announcement-detail-category">
                        <component :is="getCategoryIcon(announcementData?.category)" style="width: 14px; height: 14px;" />
                        {{getCategoryName(announcementData?.category)}}
                    </span>
          <span class="announcement-detail-date">
                        <Calendar />
                        {{announcementData?.date}}
                    </span>
          <span class="announcement-detail-author">
                        <User />
                        {{announcementData?.author}}
                    </span>
        </div>
        <h1 class="announcement-detail-title">{{announcementData?.title}}</h1>
        <p class="announcement-detail-excerpt">{{announcementData?.excerpt}}</p>
      </div>

      <div class="announcement-detail-content" id="announcement-content">
        <!--          <div class="loading-spinner">-->
        <!--            <div class="spinner"></div>-->
        <!--            <p style="margin-top: 1rem;">加载中...</p>-->
        <!--          </div>-->
        <div class="markdown-content">
          <h1 class="announcement-detail-title">{{announcementData?.title}}</h1>
          <p class="announcement-detail-excerpt">{{announcementData?.excerpt}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
