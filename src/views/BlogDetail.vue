<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHead } from '@unhead/vue'
import { marked } from 'marked'
import { useI18n } from "vue-i18n";
import { ArrowLeft } from "lucide-vue-next";
import { useDevice } from '@/composables/useDevice'

const route = useRoute()
const router = useRouter()
const content = ref()
const { locale, t } = useI18n()
const { isMobile } = useDevice()

onMounted(async () => {
  const id = route.params.id as string
  try {
    // 尝试加载 JSON
    try {
      const jsonModule = await import(`@/blog/${id}.json?raw`)
      const rawJson = typeof jsonModule.default === 'string' ? jsonModule.default : await jsonModule.default
      const data = JSON.parse(rawJson)
      content.value = marked(data.content || '')
    } catch {
      // 如果 JSON 不存在，尝试加载 Markdown
      const mdModule = await import(`@/blog/${id}.md?raw`)
      const rawMd = typeof mdModule.default === 'string' ? mdModule.default : await mdModule.default
      content.value = marked(rawMd)
    }
  } catch (error) {
    content.value = '<p>文章加载失败</p>'
    console.error(error)
  }
})

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

function goBack() {
  router.back()
}
</script>

<template>
  <div class="blog-detail" :style="{padding: isMobile ? '9rem 25px' : '10rem 20rem'}">
    <div class="back-button" @click="goBack">
      <ArrowLeft />
      {{t('backBlogList')}}
    </div>
    <article v-html="content" />
  </div>
</template>

<style scoped>
.blog-detail {
  position: relative;
  overflow: hidden;
}

.blog-detail h1,
.blog-detail h2,
.blog-detail h3 {
  color: #47c68f;
}

.blog-detail p {
  line-height: 1.8;
  margin: 10px 0;
}
</style>
