<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { marked } from 'marked'
import { WebSitemap, WebFooter, PhoneFooter } from '@/components'

import privacyDoc from '@/assets/docs/privacy.md?raw'
import termsDoc from '@/assets/docs/terms.md?raw'

const route = useRoute()
const router = useRouter()


const docsMap: Record<string, string> = {
  'privacy': privacyDoc,
  'terms': termsDoc
}

const currentSlug = ref('')
const htmlContent = ref('')
const toc = ref<{ id: string, text: string, level: number }[]>([])
const activeHeadingId = ref('')

const navItems = [
  { slug: 'privacy', titleKey: 'Privacy Policy' },
  { slug: 'terms', titleKey: 'Terms & Conditions' }
]

// Extract headers and assign IDs to them for the TOC
const generateTOCAndCleanHTML = async (markdown: string) => {
  // Use standard marked without custom renderer to avoid version incompatibility
  const htmlStr = await marked.parse(markdown) as string;
  
  // Use DOM parser to find headers in browser
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlStr, 'text/html');
  const headings = doc.querySelectorAll('h2, h3');
  
  const tocItems: { id: string, text: string, level: number }[] = [];
  
  headings.forEach(heading => {
    const text = heading.textContent || '';
    const id = text.toLowerCase().replace(/[\s\W-]+/g, '-');
    heading.id = id;
    tocItems.push({ 
      id, 
      text, 
      level: parseInt(heading.tagName[1]) 
    });
  });
  
  return { html: doc.body.innerHTML, tocItems };
}


const loadDoc = async (slug: string) => {
  if (!docsMap[slug]) {
    slug = 'privacy' // Default fallback
    router.replace({ params: { ...route.params, slug } })
    return
  }
  currentSlug.value = slug
  
  const result = await generateTOCAndCleanHTML(docsMap[slug]);
  htmlContent.value = result.html;
  toc.value = result.tocItems;
  activeHeadingId.value = ''; // Reset active heading

  nextTick(() => {
    window.scrollTo(0, 0);
    setupScrollSpy();
  })
}

// Scroll spy logic
let scrollListener: () => void;
const setupScrollSpy = () => {
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener);
  }

  scrollListener = () => {
    const headings = toc.value.map(item => document.getElementById(item.id)).filter(Boolean) as HTMLElement[];
    let currentActiveId = '';
    
    // Check which heading is currently in view (with some offset for fixed header)
    for (const heading of headings) {
      const rect = heading.getBoundingClientRect();
      if (rect.top <= 140) { // 140px offset to account for fixed navbar
        currentActiveId = heading.id;
      } else {
        break;
      }
    }
    
    if (currentActiveId && currentActiveId !== activeHeadingId.value) {
      activeHeadingId.value = currentActiveId;
    }
  };

  window.addEventListener('scroll', scrollListener);
}

watch(() => route.params.slug, (newSlug) => {
  if (newSlug && route.name === 'DocsPage') {
    loadDoc(newSlug as string)
  }
})

onMounted(() => {
  if (route.name === 'DocsPage') {
    loadDoc(route.params.slug as string || 'privacy')
  }
})

const navigate = (slug: string) => {
  router.push({ name: 'DocsPage', params: { lang: route.params.lang, slug } })
}

const scrollToHeading = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    // Smooth scroll with offset for the fixed header
    const y = el.getBoundingClientRect().top + window.scrollY - 100;
    window.scrollTo({ top: y, behavior: 'smooth' });
    activeHeadingId.value = id;
  }
}
</script>

<template>
  <div class="docs-wrapper">
    <!-- Custom Docs Header -->
    <header class="docs-header">
      <div class="header-left" @click="router.push(`/${route.params.lang || 'en'}`)">
        <a class="logo">
          <img src="@/assets/images/logo.png" alt="UUPAY Logo" class="logo-img" />
          <span class="logo-text">UUPAY</span>
        </a>
      </div>
      <div class="header-right">
        <span class="header-link active">Document Center</span>
      </div>
    </header>

    <div class="docs-page">
      <div class="container">
        <div class="docs-layout">
          <!-- Left Sidebar Navigation -->
          <aside class="docs-sidebar left-sidebar">
            <nav class="docs-nav">
              <h3 class="nav-title">About / Support</h3>
              <ul class="nav-list">
                <li 
                  v-for="item in navItems" 
                  :key="item.slug"
                  :class="['nav-item', { active: currentSlug === item.slug }]"
                  @click="navigate(item.slug)"
                >
                  {{ item.titleKey }}
                </li>
              </ul>
            </nav>
          </aside>

          <!-- Main Content Area (Markdown Article) -->
          <main class="docs-content">
            <article class="markdown-body" v-html="htmlContent"></article>
          </main>

          <!-- Right Sidebar Table of Contents -->
          <aside class="docs-sidebar right-sidebar">
            <div class="toc-container" v-if="toc.length > 0">
              <h4 class="toc-title">ON THIS PAGE</h4>
              <ul class="toc-list">
                <li 
                  v-for="item in toc" 
                  :key="item.id"
                  :class="['toc-item', `toc-level-${item.level}`, { active: activeHeadingId === item.id }]"
                  @click="scrollToHeading(item.id)"
                >
                  {{ item.text }}
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
    
    <!-- Footers -->
    <div class="hidden md:block">
      <WebSitemap />
      <WebFooter />
    </div>
    <div class="block md:hidden">
      <!-- Often Mobile apps display Sitemap inside the mobile footer or hide it, relying on hamburger menu -->
      <WebSitemap />
      <PhoneFooter />
    </div>
  </div>
</template>

<style scoped>
/* Docs Header Styles */
.docs-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: rgba(10, 10, 10, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  z-index: 1000;
}

.logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 48px;
  overflow: hidden;
  border-radius: 12px;
  padding: 8px 16px 8px 8px; /* Give some breathing room */
  background: rgba(255, 255, 255, 0.03); /* Subtle backdrop */
  border: 1px solid rgba(255, 255, 255, 0.05); /* very subtle box */
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.logo:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(71, 198, 143, 0.2);
}

.logo-img {
  height: 100%;
  width: auto;
  object-fit: contain;
  display: block;
  border-radius: 8px;
}

.logo-text {
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(135deg, #fff 0%, #d0d0d0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  transition: all 0.3s ease;
}

.logo:hover .logo-text {
  background: linear-gradient(90deg, #47C68F, #43E97B);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-right {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.header-link {
  font-size: 0.9375rem;
  color: #a3a3a3;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}

.header-link:hover {
  color: #fff;
}

.header-link.active {
  color: #fff;
}

.docs-page {
  /* Increase top padding so the fixed navbar doesn't overlap the content */
  padding: 100px 0 6rem 0;
  min-height: 100vh;
  background: #0a0a0a;
}

.container {
  max-width: 1400px; /* Increased max-width to accommodate 3 columns */
  margin: 0 auto;
  padding: 0 2rem;
}

.docs-layout {
  display: flex;
  gap: 3rem;
  align-items: flex-start;
  position: relative;
}

.docs-sidebar {
  flex-shrink: 0;
  position: sticky;
  top: 100px; /* Sticky positioning offset from top */
  max-height: calc(100vh - 120px);
  overflow-y: auto;
}

/* Scrollbar styling for sidebars */
.docs-sidebar::-webkit-scrollbar {
  width: 4px;
}
.docs-sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.left-sidebar {
  width: 240px;
}

.right-sidebar {
  width: 260px;
  /* Add subtle border or background if desired, keeping it clean for now */
}

/* Left Nav Styles */
.nav-title {
  font-size: 0.875rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #999;
  letter-spacing: 0.05em;
  margin-bottom: 1.5rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.nav-item {
  padding: 0.75rem 1rem;
  border-radius: 8px;
  color: #e5e5e5;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 500;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.nav-item.active {
  background: rgba(71, 198, 143, 0.1);
  color: #47c68f;
  font-weight: 600;
}

/* Right TOC Styles */
.toc-container {
  padding-left: 1rem;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
}

.toc-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}

.toc-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.toc-item {
  font-size: 0.875rem;
  color: #888;
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1.4;
}

.toc-item:hover {
  color: #e5e5e5;
}

.toc-item.active {
  color: #47c68f;
  font-weight: 600;
}

.toc-level-2 {
  padding-left: 0;
}

.toc-level-3 {
  padding-left: 1rem;
  font-size: 0.8125rem;
}

/* Main Content Area */
.docs-content {
  flex-grow: 1;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 3rem;
  min-width: 0; /* Prevent flex box overflow */
}

/* Markdown Styles targeted inside .markdown-body */
.markdown-body:deep(h1) {
  font-size: 2.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 2rem;
  line-height: 1.2;
}

.markdown-body:deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  color: #e5e5e5;
  margin-top: 3rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 0.5rem;
  /* Important for smooth scrolling anchor targets */
  scroll-margin-top: 100px;
}

.markdown-body:deep(h3) {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ccc;
  margin-top: 2rem;
  margin-bottom: 1rem;
  scroll-margin-top: 100px;
}

.markdown-body:deep(p) {
  font-size: 1rem;
  color: #a3a3a3;
  line-height: 1.7;
  margin-bottom: 1.5rem;
}

.markdown-body:deep(ul),
.markdown-body:deep(ol) {
  margin-bottom: 1.5rem;
  padding-left: 1.5rem;
  color: #a3a3a3;
}

.markdown-body:deep(li) {
  margin-bottom: 0.5rem;
  line-height: 1.6;
}

.markdown-body:deep(strong) {
  color: #fff;
  font-weight: 600;
}

.markdown-body:deep(a) {
  color: #47c68f;
  text-decoration: none;
}

.markdown-body:deep(a:hover) {
  text-decoration: underline;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .right-sidebar {
    display: none; /* Hide TOC on medium screens */
  }
}

@media (max-width: 768px) {
  .docs-page {
    padding-top: 80px;
  }
  
  .docs-layout {
    flex-direction: column;
    gap: 2rem;
  }
  
  .docs-header {
    padding: 0 1.5rem;
  }
  
  .left-sidebar {
    width: 100%;
    position: static;
    max-height: none;
  }
  
  .docs-content {
    width: 100%;
    padding: 1.5rem;
  }
}
</style>
