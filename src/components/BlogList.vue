<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// 当前语言
const route = useRoute()
const currentLang = route.params.lang as string || 'zh-cn'

// 动态文章列表
// 这里我们用 Vite 的 import.meta.glob
const modules = import.meta.glob('../blog/*.md', { eager: true })
type Post = { slug: string; title: string }
const posts = ref<Post[]>([])

for (const path in modules) {
  const slug = path.split('/').pop()?.replace('.md','') || ''
  // 假设每篇文章文件里有 frontmatter 导出 title
  const md = modules[path] as any
  const title = md.title?.[currentLang] || slug
  posts.value.push({ slug, title })
}
</script>

<template>
  <div>
    <h1>Blog</h1>
    <ul>
      <li v-for="post in posts" :key="post.slug">
        <router-link :to="`/${currentLang}/blog/${post.slug}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
