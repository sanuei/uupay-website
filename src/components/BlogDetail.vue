<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from "vue-i18n"
import { useHead } from '@vueuse/head'

// 获取当前路由
const route = useRoute()
const slug = route.params.slug as string
const { locale } = useI18n()

// 定义文章类型
type Post = { title: string; content: string; description?: string; keywords?: string }

// 模拟文章数据（可换成接口获取）
const data: Record<string, Post> = {
  'seo-tips': {
    title: 'SEO Tips',
    content: '<p>SEO optimization tips here.</p>',
    description: 'Learn how to optimize your website for search engines with these SEO tips.',
    keywords: 'SEO, optimization, search engine, tips, website, ranking'
  },
  'uupay-guide': {
    title: 'UUPay Guide',
    content: '<p>Guide content here.</p>',
    description: 'Step-by-step guide to use UUPay for cryptocurrency payments.',
    keywords: 'UUPay, guide, crypto, payments, USDT, virtual card'
  }
}

// 文章内容
const post = ref<Post>({ title: '', content: '' })

onMounted(() => {
  // 如果找不到文章就显示 Not Found
  post.value = data[slug] || {
    title: 'Not Found',
    content: '<p>文章不存在</p>',
    description: '文章不存在',
    keywords: ''
  }
})

// 根据语言切换文章标题（示例）
const postTitle = computed(() => {
  if (locale.value === 'zh-cn') {
    if (slug === 'seo-tips') return 'SEO 优化技巧'
    if (slug === 'uupay-guide') return 'UUPay 使用指南'
  }
  if (locale.value === 'zhtw') {
    if (slug === 'seo-tips') return 'SEO 優化技巧'
    if (slug === 'uupay-guide') return 'UUPay 使用指南'
  }
  return post.value.title
})

// 设置 SEO Head
useHead({
  title: postTitle.value,
  meta: [
    { name: 'description', content: post.value.description || '' },
    { name: 'keywords', content: post.value.keywords || '' }
  ]
})
</script>

<template>
  <div>
    <h1>{{ postTitle }}</h1>
    <div v-html="post.content"></div>
  </div>
</template>
