<script setup lang="ts">
// 扫描 blog 目录下的所有 Markdown 文件和 JSON 文件
import {useHead} from "@unhead/vue";
import {useI18n} from "vue-i18n";

const mdModules = import.meta.glob('@/blog/*.md', { eager: true, as: 'raw' })
const jsonModules = import.meta.glob('@/blog/*.json', { eager: true, as: 'json' }) // 直接解析为对象
const { locale, t } = useI18n()

useHead(() => ({
  title: t('metaTitle'),
  meta: [
    {
      name: 'description',
      content: t('metaDescription'),
    },
    {
      name: 'keywords',
      content: t('metaKeywords'),
    },
  ],
  htmlAttrs: {
    lang: locale.value,
  }
}))

interface Article {
  id: string
  title: string
  summary: string
}

interface JsonArticle {
  title?: string
  summary?: string
}

// 处理 Markdown 文件
const mdArticles: Article[] = Object.entries(mdModules).map(([path, raw]) => {
  const content = raw as string | undefined
  const id = path.split('/').pop()!.replace('.md', '')
  const match = content?.match(/^# (.+)/m)
  return {
    id,
    title: match ? match[1] : '无标题',
    summary: content?.slice(0, 100) + '...' || ''
  }
})

// 处理 JSON 文件
const jsonArticles: Article[] = Object.entries(jsonModules).map(([path, raw]) => {
  const id = path.split('/').pop()!.replace('.json', '')
  const content = raw as JsonArticle
  return {
    id,
    title: content.title || '无标题',
    summary: content.summary || ''
  }
})

// 合并两种来源
const articles = [...mdArticles, ...jsonArticles]
</script>

<template>
  <div>
    <h1>博客列表</h1>
    <ul>
      <li v-for="article in articles" :key="article.id">
        <router-link :to="`/zh-cn/blog/${article.id}`">
          {{ article.title }} - {{ article.summary }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
