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

const { locale, t } = useI18n()
const route = useRoute();
const router = useRouter();
const announcementStore = useAnnouncementStore()

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

</style>
