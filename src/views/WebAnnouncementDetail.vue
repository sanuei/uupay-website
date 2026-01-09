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
.announcement-detail-hero {
    padding: 10rem 0 4rem;
    position: relative;
}

.back-button {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-secondary);
    font-weight: 600;
    margin-bottom: 2rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.back-button:hover {
    color: var(--primary-color);
    gap: 0.75rem;
}

.announcement-detail-header {
    max-width: 900px;
    margin: 0 auto 4rem;
}

.announcement-detail-meta {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
}

.announcement-detail-category {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(71, 198, 143, 0.1);
    border: 1px solid rgba(71, 198, 143, 0.3);
    border-radius: 8px;
    color: var(--primary-color);
    font-weight: 600;
}

.announcement-detail-date,
.announcement-detail-author {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-tertiary);
}

.announcement-detail-title {
    font-size: var(--font-size-h1);
    font-weight: 900;
    color: var(--text-primary);
    line-height: 1.2;
    margin-bottom: 1rem;
}

.announcement-detail-excerpt {
    font-size: var(--font-size-body-lg);
    color: var(--text-secondary);
    line-height: var(--line-height-relaxed);
}

.announcement-detail-content {
    max-width: 900px;
    margin: 0 auto;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 3rem;
    position: relative;
    z-index: 10;
}

/* Markdown Content Styling */
.markdown-content {
    color: var(--text-primary);
    line-height: 1.8;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4 {
    color: var(--text-primary);
    font-weight: 700;
    margin-top: 2rem;
    margin-bottom: 1rem;
    line-height: 1.3;
}

.markdown-content h1 {
    font-size: var(--font-size-h1);
    border-bottom: 2px solid var(--border-color);
    padding-bottom: 0.5rem;
}

.markdown-content h2 {
    font-size: var(--font-size-h2);
    border-bottom: 1px solid var(--border-color);
    padding-bottom: 0.5rem;
}

.markdown-content h3 { font-size: var(--font-size-h3); }

.markdown-content p { margin-bottom: 1.5rem; }

.markdown-content a {
    color: var(--primary-color);
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.3s ease;
}

.markdown-content a:hover { border-bottom-color: var(--primary-color); }

.markdown-content ul,
.markdown-content ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
}

.markdown-content li { margin-bottom: 0.5rem; }

.markdown-content blockquote {
    border-left: 4px solid var(--primary-color);
    padding-left: 1.5rem;
    margin: 2rem 0;
    color: var(--text-secondary);
    font-style: italic;
}

.markdown-content img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 2rem 0;
}

.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 4rem;
    color: var(--text-tertiary);
}

.spinner {
    width: 48px;
    height: 48px;
    border: 4px solid var(--border-color);
    border-top-color: var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 768px) {
    .announcement-detail-title { font-size: 2rem; }
    .announcement-detail-content { padding: 2rem 1.5rem; }
    .markdown-content h1 { font-size: 2rem; }
    .markdown-content h2 { font-size: 1.5rem; }
}
</style>
