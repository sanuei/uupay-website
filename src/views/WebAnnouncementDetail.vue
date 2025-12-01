<script setup lang="ts">
import {ArrowLeft, Calendar, Newspaper, RefreshCw, Settings, ShieldCheck, Sparkles, User} from "lucide-vue-next";
import {useI18n} from "vue-i18n";
import { useAnnouncementStore } from '@/stores/announcement'
import { useRouter } from 'vue-router'

const router = useRouter()
const { t } = useI18n()
const announcementStore = useAnnouncementStore()
const announcementData = announcementStore.current

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
  router.back()
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
