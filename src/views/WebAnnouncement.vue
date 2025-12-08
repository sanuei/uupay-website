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

interface Announcement {
  id: string
  category: string
  title: string
  date: string
  excerpt: string
  author: string
  file: string
}

const announcementsData = ref<Announcement[]>([]);
const currentCategory = ref('all');

const fallbackAnnouncementsData = [
  {
    "id": "welcome-to-uupay-2025",
    "title": "欢迎使用 UUPAY 数字支付平台",
    "excerpt": "感谢您选择 UUPAY！我们致力于为全球用户提供安全、快捷的数字支付解决方案。本文将介绍 UUPAY 的核心功能和使用指南。",
    "category": "news",
    "date": "2025-01-15",
    "author": "UUPAY 团队",
    "file": "welcome-to-uupay-2025.md"
  },
  {
    "id": "new-virtual-card-feature",
    "title": "全新虚拟卡功能上线",
    "excerpt": "我们很高兴地宣布，UUPAY 虚拟卡功能正式上线！用户现在可以即时创建虚拟卡，用于在线支付和订阅服务。",
    "category": "feature",
    "date": "2025-01-10",
    "author": "产品团队",
    "file": "new-virtual-card-feature.md"
  },
  {
    "id": "security-update-202501",
    "title": "重要安全更新通知",
    "excerpt": "为了保护您的账户安全，我们将在 2025 年 1 月 20 日进行系统安全升级。本次更新将增强多重身份验证机制。",
    "category": "security",
    "date": "2025-01-08",
    "author": "安全团队",
    "file": "security-update-202501.md"
  },
  {
    "id": "multi-currency-support",
    "title": "多币种结算功能升级",
    "excerpt": "UUPAY 现在支持 50+ 种法定货币和主流加密货币的自动换汇功能，让您的跨境支付更加便捷。",
    "category": "update",
    "date": "2025-01-05",
    "author": "技术团队",
    "file": "multi-currency-support.md"
  },
  {
    "id": "scheduled-maintenance-jan-2025",
    "title": "系统维护通知 - 2025年1月",
    "excerpt": "为了提供更好的服务，我们将在 2025 年 1 月 25 日凌晨 2:00-4:00 (UTC+8) 进行系统维护，期间部分功能可能暂时不可用。",
    "category": "maintenance",
    "date": "2025-01-03",
    "author": "运维团队",
    "file": "scheduled-maintenance-jan-2025.md"
  }
];

async function loadAnnouncements() {
  try {
    const res = await fetch('/announcements/announcements.json');
    if (!res.ok) throw new Error('Load failed');
    announcementsData.value = await res.json();
  } catch (error) {
    console.error('❌ 加载公告数据失败:', error);
    console.log('⚠️ 使用备用数据...');
    announcementsData.value = fallbackAnnouncementsData;
  }
}

const filteredAnnouncements = computed(() => {
  if (currentCategory.value === 'all') return announcementsData.value;
  return announcementsData.value.filter(a => a.category === currentCategory.value);
});

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
  loadAnnouncements();
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
