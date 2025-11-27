<script setup lang="ts">
import { useHead } from "@unhead/vue"
import { useI18n } from "vue-i18n"
import { computed } from "vue"
import { useRoute } from "vue-router"

// 解析 md / json 文件
const mdModules = import.meta.glob('@/blog/*.md', { eager: true, as: 'raw' })
const jsonModules = import.meta.glob('@/blog/*.json', { eager: true, as: 'json' })

const { locale, t } = useI18n()
const route = useRoute()

useHead(() => ({
  title: t('metaTitle'),
  meta: [
    { name: 'description', content: t('metaDescription') },
    { name: 'keywords', content: t('metaKeywords') }
  ],
  htmlAttrs: { lang: locale.value }
}))

interface Article {
  id: string
  title: string
  summary: string
}

// 处理 Markdown 文件
const mdArticles: Article[] = Object.entries(mdModules).map(([path, raw]) => {
  const content = raw as string
  const id = path.split('/').pop()!.replace('.md', '')
  const match = content.match(/^# (.+)/m)
  return {
    id,
    title: match ? match[1] : '无标题',
    summary: content?.slice(0, 100) + '...' || ''
  }
})

// 处理 JSON 文件
const jsonArticles: Article[] = Object.entries(jsonModules).map(([path, raw]) => {
  const id = path.split('/').pop()!.replace('.json', '')
  const content = raw as { title?: string; summary?: string }
  return {
    id,
    title: content.title || '无标题',
    summary: content.summary || ''
  }
})

const articles = [...mdArticles, ...jsonArticles]

const langPrefix = computed(() => `/${route.params.lang || 'zh-cn'}`)
</script>

<template>
  <div>
    <h1>博客列表</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <router-link :to="`${langPrefix}/blog/${article.id}`">
          {{ article.title }} - {{ article.summary }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
