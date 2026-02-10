<script setup lang="ts">
import {
  ArrowRight,
  Calendar,
  Inbox,
  Newspaper,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  User
} from "lucide-vue-next";
import {computed, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {useHead} from "@unhead/vue";
import {useRoute, useRouter} from "vue-router";
import { useAnnouncementStore } from '@/stores/announcement'
import { useHreflang } from '@/utils/useHreflang'

const { locale, t } = useI18n()
const route = useRoute();
const router = useRouter();
const announcementStore = useAnnouncementStore()
useHreflang(route)

useHead(() => ({
  title: t('announcements.metaTitle'),
  meta: [
    {
      name: 'description',
      content: t('announcements.description'),
    },
    {
      name: 'keywords',
      content: t('announcements.keywords'),
    },
  ],
  htmlAttrs: {
    lang: locale.value,
  }
}))

const currentCategory = ref('all');

const filteredAnnouncements = computed(() => {
  if (currentCategory.value === 'all') {
    return announcementStore.list
  }
  return announcementStore.list.filter(
      a => a.category === currentCategory.value
  )
})

const categories = computed(() => [
  { value: 'all', label: t('allAnnouncement') },
  { value: 'update', label: t('productRenew') },
  { value: 'feature', label: t('newFeature') },
  { value: 'maintenance', label: t('systemUpdate') },
  { value: 'security', label: t('safetyAnnouncement') },
]);

const iconMap: Record<string, any> = {
  update: RefreshCw,
  feature: Sparkles,
  maintenance: Settings,
  security: ShieldCheck,
  news: Newspaper,
}

const getCategoryIcon = (cat: string) => {
  return iconMap[cat] || iconMap.default
}

function getCategoryName(category: string) {
  const names: Record<string, string> = {
    update: '产品更新',
    feature: '新功能',
    maintenance: '系统维护',
    security: '安全公告',
    news: '新闻动态',
  };
  return names[category] || '公告';
}

function viewAnnouncement(data: any) {
  const lang = route.params.lang;
  announcementStore.setCurrent(data)
  router.push({
    name: 'AnnouncementDetail',
    params: { lang, id: data.id },
  });
}

onMounted(() => {
  announcementStore.loadList()
});
</script>

<template>
  <section id="announcement" class="announcements-hero">
    <div class="container">
      <h1>{{t('announcements.h1Title')}}</h1>
      <p>{{t('announceTitle')}}</p>
    </div>
  </section>

  <section class="announcements-container">
    <div class="container">
      <!-- 分类筛选 -->
      <div class="filter-tabs">
        <button
            v-for="cat in categories"
            :key="cat.value"
            :class="['filter-tab', { active: currentCategory === cat.value }]"
            @click="currentCategory = cat.value"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- 公告卡片网格 -->
      <div class="announcements-grid" id="announcements-grid">
        <div class="announcement-card" v-for="a in filteredAnnouncements" data-id="${announcement.id}" @click="viewAnnouncement(a)">
          <div class="announcement-meta">
                <span class="announcement-category">
                  <component :is="getCategoryIcon(a.category)" style="width: 14px; height: 14px;" />
                  {{ getCategoryName(a.category) }}
                </span>
            <span class="announcement-date">
                  <Calendar />
                  {{ a.date}}
                </span>
          </div>

          <h3 class="announcement-title">{{a.title}}</h3>
          <p class="announcement-excerpt">{{a.excerpt}}</p>

          <div class="announcement-footer">
                <span class="announcement-author">
                  <User />
                  {{a.author}}
                </span>
            <span class="read-more">
                  {{t('readAll')}}
                  <ArrowRight />
                </span>
          </div>
        </div>
      </div>

      <!-- 无公告提示 -->
      <div class="no-announcements" id="no-announcements" style="display: none;">
        <Inbox />
        <p>{{t('noAnnounce')}}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.announcements-hero {
    padding: 12rem 0 6rem;
    text-align: center;
    position: relative;
}

.announcements-hero h1 {
    font-size: var(--font-size-hero);
    font-weight: 900;
    margin-bottom: 1rem;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}

.announcements-hero p {
    font-size: var(--font-size-body-lg);
    color: var(--text-secondary);
    max-width: 600px;
    margin: 0 auto;
}

.announcements-container {
    padding: 4rem 0;
    position: relative;
    z-index: 10;
}

.announcements-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2rem;
    margin-top: 3rem;
}

.announcement-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 2rem;
    transition: all 0.3s ease;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.announcement-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary-color);
    box-shadow: 0 20px 60px rgba(71, 198, 143, 0.15);
}

.announcement-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    font-size: var(--font-size-small);
    color: var(--text-tertiary);
}

.announcement-category {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.375rem 0.75rem;
    background: rgba(71, 198, 143, 0.1);
    border: 1px solid rgba(71, 198, 143, 0.3);
    border-radius: 6px;
    color: var(--primary-color);
    font-weight: 600;
    font-size: var(--font-size-xs);
}

.announcement-date {
    display: flex;
    align-items: center;
    gap: 0.375rem;
}

.announcement-title {
    font-size: var(--font-size-h2);
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 0.75rem;
    position: relative;
    z-index: 1;
}

.announcement-excerpt {
    color: var(--text-secondary);
    line-height: 1.6;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 1;
}

.announcement-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-top: 1rem;
    border-top: 1px solid var(--border-color);
    position: relative;
    z-index: 1;
}

.announcement-author {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-tertiary);
    font-size: var(--font-size-small);
}

.read-more {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--primary-color);
    font-weight: 600;
    font-size: var(--font-size-small);
    transition: all 0.3s ease;
}

.announcement-card:hover .read-more {
    gap: 0.75rem;
}

.filter-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    justify-content: flex-start;
}

.filter-tab {
    padding: 0.75rem 1.5rem;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    color: var(--text-secondary);
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.filter-tab:hover,
.filter-tab.active {
    background: rgba(71, 198, 143, 0.1);
    border-color: var(--primary-color);
    color: var(--primary-color);
}

.no-announcements {
    text-align: center;
    padding: 4rem 2rem;
    color: var(--text-tertiary);
}

@media (max-width: 768px) {
    .announcements-hero h1 { font-size: 2.5rem; }
    .announcements-grid { grid-template-columns: 1fr; }
}
</style>
