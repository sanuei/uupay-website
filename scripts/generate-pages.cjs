const fs = require('fs');
const path = require('path');

const languages = ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'vi', 'th', 'ms', 'id', 'es', 'ar'];
const defaultLang = 'en';

const pagesDir = path.join(__dirname, '../src/pages');

// Templates
const getIndexTemplate = (lang) => {
  const importPrefix = lang === defaultLang ? '..' : '../..';
  return `---
import BaseLayout from '${importPrefix}/layouts/BaseLayout.astro';
import Navbar from '${importPrefix}/components/Navbar.astro';
import HeroSection from '${importPrefix}/components/HeroSection.astro';
import FeatureCards from '${importPrefix}/components/FeatureCards.astro';
import CardShowcase from '${importPrefix}/components/CardShowcase.astro';
import StatsSection from '${importPrefix}/components/StatsSection.astro';
import eSIMSection from '${importPrefix}/components/eSIMSection.astro';
import AppShowcase from '${importPrefix}/components/AppShowcase.astro';
import PartnerPreview from '${importPrefix}/components/PartnerPreview.astro';
import PromoSection from '${importPrefix}/components/PromoSection.astro';
import DownloadSection from '${importPrefix}/components/DownloadSection.astro';
import Footer from '${importPrefix}/components/Footer.astro';

const lang = '${lang}';
---

<BaseLayout lang={lang}>
  <Navbar lang={lang} />
  <HeroSection lang={lang} />
  <FeatureCards lang={lang} />
  <CardShowcase lang={lang} />
  <StatsSection lang={lang} />
  <eSIMSection lang={lang} />
  <AppShowcase lang={lang} />
  <PartnerPreview lang={lang} />
  <PromoSection lang={lang} />
  <DownloadSection lang={lang} />
  <Footer lang={lang} />
</BaseLayout>
`;
};

const getPromotionsTemplate = (lang) => {
  const importPrefix = lang === defaultLang ? '..' : '../..';
  return `---
import BaseLayout from '${importPrefix}/layouts/BaseLayout.astro';
import Navbar from '${importPrefix}/components/Navbar.astro';
import PromoSection from '${importPrefix}/components/PromoSection.astro';
import Footer from '${importPrefix}/components/Footer.astro';

const lang = '${lang}';
---

<BaseLayout lang={lang} title="Promotions | UUPAY">
  <Navbar lang={lang} />
  <main style="padding-top: 120px; min-height: 70vh;">
    <PromoSection lang={lang} />
  </main>
  <Footer lang={lang} />
</BaseLayout>
`;
};

const getPartnersTemplate = (lang) => {
  const importPrefix = lang === defaultLang ? '..' : '../..';
  const isZh = lang === 'zh-CN' || lang === 'zh-TW';
  const pageTitle = isZh ? "全球合伙人计划 | UUPAY" : "Global Partner Program | UUPAY";

  return `---
import BaseLayout from '${importPrefix}/layouts/BaseLayout.astro';
import Navbar from '${importPrefix}/components/Navbar.astro';
import PartnerShowcase from '${importPrefix}/components/PartnerShowcase.astro';
import Footer from '${importPrefix}/components/Footer.astro';

const lang = '${lang}';
---

<BaseLayout lang={lang} title="${pageTitle}">
  <Navbar lang={lang} />
  <main style="min-height: 70vh;">
    <PartnerShowcase lang={lang} />
  </main>
  <Footer lang={lang} />
</BaseLayout>
`;
};

const getPartnerApplyTemplate = (lang) => {
  const importPrefix = lang === defaultLang ? '../..' : '../../..';
  const isZh = lang === 'zh-CN' || lang === 'zh-TW';
  const pageTitle = isZh ? "合伙人申请表 | UUPAY" : "Partner Application Form | UUPAY";

  return `---
import BaseLayout from '${importPrefix}/layouts/BaseLayout.astro';
import Navbar from '${importPrefix}/components/Navbar.astro';
import PartnerForm from '${importPrefix}/components/PartnerForm.astro';
import Footer from '${importPrefix}/components/Footer.astro';

const lang = '${lang}';
---

<BaseLayout lang={lang} title="${pageTitle}">
  <Navbar lang={lang} />
  <main style="padding-top: 100px; min-height: 70vh;">
    <PartnerForm lang={lang} />
  </main>
  <Footer lang={lang} />
</BaseLayout>
`;
};

// Docs templates (level 2 for defaultLang, level 3 for others)
const getDocsTemplate = (lang, docType) => {
  const importPrefix = lang === defaultLang ? '../..' : '../../..';
  const title = docType === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions';
  return `---
import DocsLayout from '${importPrefix}/layouts/DocsLayout.astro';
import { Content } from '${importPrefix}/content/${docType}.md';

const lang = '${lang}';
---

<DocsLayout frontmatter={{ title: '${title}' }} lang={lang}>
  <Content />
</DocsLayout>
`;
};

// Announcements templates (level 2 for defaultLang, level 3 for others)
const getAnnouncementsIndexTemplate = (lang) => {
  const importPrefix = lang === defaultLang ? '../..' : '../../..';
  const isZh = lang === 'zh-CN' || lang === 'zh-TW';

  return `---
import Layout from '${importPrefix}/layouts/BaseLayout.astro';
import Header from '${importPrefix}/components/Navbar.astro';
import Footer from '${importPrefix}/components/Footer.astro';
import { getCollection } from 'astro:content';

const lang = '${lang}';
const isZh = lang === 'zh-CN' || lang === 'zh-TW';
const pageTitle = isZh ? '公告中心' : 'Announcements';
const searchPlaceholder = isZh ? '搜寻文章' : 'Search articles';
const homeText = isZh ? 'UUPAY' : 'UUPAY';
const helpText = isZh ? '帮助中心' : 'Help Center';
const currentCategoryText = isZh ? '最新公告' : 'Latest News';

const allAnnouncements = await getCollection('announcements');
const sorted = allAnnouncements.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

const categories = ${isZh ? `[
  { key: "latest", name: "最新公告" },
  { key: "cards", name: "卡片服务" },
  { key: "fiat", name: "法币出金" },
  { key: "esim", name: "eSIM 通信" },
  { key: "security", name: "系统与安全" },
  { key: "promotions", name: "活动与合伙人" }
]` : `[
  { key: "latest", name: "Latest News" },
  { key: "cards", name: "Card Services" },
  { key: "fiat", name: "Fiat Express" },
  { key: "esim", name: "eSIM & Mobile" },
  { key: "security", name: "Security & System" },
  { key: "promotions", name: "Promotions & Partners" }
]`};
---

<Layout title={\`\${pageTitle} | UUPAY\`} lang={lang}>
  <Header lang={lang} />

  <main class="bingx-announcement-page">
    <div class="container">
      <div class="bingx-top-bar">
        <h1>{pageTitle}</h1>

        <div class="bingx-search-box">
          <input type="text" id="bingx-search-input" placeholder={searchPlaceholder} autocomplete="off" />
          <svg class="bingx-search-icon" viewBox="0 0 16 16" fill="none" width="16" height="16">
            <circle cx="7" cy="7" r="4.5" stroke="currentColor" stroke-width="1.4"/>
            <path d="M10.5 10.5L14 14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
          </svg>
        </div>
      </div>

      <div class="bingx-layout">
        <aside class="bingx-sidebar" id="bingx-sidebar">
          {categories.map((cat, index) => (
            <button
              class={\`bingx-menu-item \${index === 0 ? 'active' : ''}\`}
              data-category={cat.name}
            >
              {cat.name}
            </button>
          ))}
        </aside>

        <section class="bingx-content-main">
          <nav class="bingx-breadcrumb" aria-label="Breadcrumb">
            <a href={\`/\${lang === 'en' ? '' : lang + '/'}\`}>{homeText}</a>
            <span class="bingx-breadcrumb-sep">&gt;</span>
            <a href={\`/\${lang === 'en' ? '' : lang + '/'}announcements/\`}>{pageTitle}</a>
            <span class="bingx-breadcrumb-sep">&gt;</span>
            <span class="bingx-breadcrumb-current" id="breadcrumb-category">{currentCategoryText}</span>
          </nav>

          <h2 class="bingx-category-title" id="category-title">{currentCategoryText}</h2>

          <div class="bingx-notice-list" id="bingx-notice-list">
            {sorted.map((post) => (
              <a
                href={\`/\${lang === 'en' ? '' : lang + '/'}announcements/\${post.id}\`}
                class="bingx-notice-item"
                data-category={post.data.type || currentCategoryText}
                data-title={post.data.title.toLowerCase()}
              >
                <div class="bingx-notice-title">{post.data.title}</div>
                <div class="bingx-notice-date">{post.data.date ? post.data.date.toISOString().split('T')[0] : ''}</div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  </main>

  <Footer lang={lang} />
</Layout>

<script>
  const menuButtons = document.querySelectorAll('.bingx-menu-item');
  const noticeItems = document.querySelectorAll('.bingx-notice-item');
  const categoryTitle = document.getElementById('category-title');
  const breadcrumbCategory = document.getElementById('breadcrumb-category');
  const searchInput = document.getElementById('bingx-search-input') as HTMLInputElement | null;

  let currentCategory = '最新公告';
  let searchQuery = '';

  function filterNotices() {
    noticeItems.forEach((item) => {
      const cat = item.getAttribute('data-category') || '';
      const title = item.getAttribute('data-title') || '';

      const matchCategory = (currentCategory === '最新公告' || currentCategory === 'Latest News') || (cat === currentCategory);
      const matchSearch = !searchQuery || title.includes(searchQuery);

      if (matchCategory && matchSearch) {
        (item as HTMLElement).style.display = 'flex';
      } else {
        (item as HTMLElement).style.display = 'none';
      }
    });
  }

  menuButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      menuButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const catName = btn.getAttribute('data-category') || '最新公告';
      currentCategory = catName;

      if (categoryTitle) categoryTitle.textContent = catName;
      if (breadcrumbCategory) breadcrumbCategory.textContent = catName;

      filterNotices();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = (e.target as HTMLInputElement).value.trim().toLowerCase();
      filterNotices();
    });
  }
</script>
`;
};

const getAnnouncementsDetailTemplate = (lang) => {
  const importPrefix = lang === defaultLang ? '../..' : '../../..';
  const isZh = lang === 'zh-CN' || lang === 'zh-TW';
  const backText = isZh ? '返回公告中心' : 'Back to Announcements';
  const submitText = isZh ? '提交安全漏洞报告' : 'Report Security Vulnerability';
  const ctaTitle = isZh ? '发现潜在安全风险？' : 'Found a Security Vulnerability?';
  const ctaDesc = isZh ? '欢迎通过 security@uupay.com 与我们的安全团队取得联系。' : 'Contact our security team directly via security@uupay.com';

  return `---
import Layout from '${importPrefix}/layouts/BaseLayout.astro';
import Header from '${importPrefix}/components/Navbar.astro';
import Footer from '${importPrefix}/components/Footer.astro';
import { getCollection, render } from 'astro:content';

export async function getStaticPaths() {
  const allAnnouncements = await getCollection('announcements');
  return allAnnouncements.map(post => ({
    params: { slug: post.id },
    props: { post }
  }));
}

const { post } = Astro.props;
const { Content } = await render(post);
const lang = '${lang}';
---

<Layout title={\`\${post.data.title} | UUPAY\`} lang={lang}>
  <Header lang={lang} />

  <main class="article-container animate-in">
    <div class="article-nav">
      <a href={\`/\${lang === 'en' ? '' : lang + '/'}announcements\`} class="back-link-btn">
        <svg viewBox="0 0 16 16" fill="none"><path d="M10 12L4 8L10 4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <span>${backText}</span>
      </a>
    </div>

    <article class="article-main">
      <header class="article-header">
        <div class="article-meta">
          <span class="article-tag">{post.data.type || '官方公告'}</span>
          <span class="article-date">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M5 2V4M11 2V4M2.5 6H13.5M3.5 3.5H12.5C13.0523 3.5 13.5 3.94772 13.5 4.5V13.5C13.5 14.0523 13.0523 14.5 12.5 14.5H3.5C2.94772 14.5 2.5 14.0523 2.5 13.5V4.5C2.5 3.94772 2.94772 3.5 3.5 3.5Z" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
            {post.data.date ? post.data.date.toISOString().split('T')[0] : '2026-07-28'}
          </span>
          {post.data.author && (
            <span class="article-author">・ {post.data.author}</span>
          )}
        </div>
        <h1 class="article-title">{post.data.title}</h1>
      </header>

      <div class="markdown-body">
        <Content />
      </div>

      <div class="article-footer-cta">
        <div class="cta-text">
          <h4>${ctaTitle}</h4>
          <p>${ctaDesc}</p>
        </div>
        <a href="mailto:security@uupay.com" class="cta-btn">
          <span>${submitText}</span>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L8 3M13 8L8 13" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </a>
      </div>
    </article>
  </main>

  <Footer lang={lang} />
</Layout>
`;
};

// Generate pages
languages.forEach((lang) => {
  const destDir = lang === defaultLang ? pagesDir : path.join(pagesDir, lang);
  
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  // Standard Pages
  fs.writeFileSync(path.join(destDir, 'index.astro'), getIndexTemplate(lang), 'utf8');
  fs.writeFileSync(path.join(destDir, 'promotions.astro'), getPromotionsTemplate(lang), 'utf8');
  fs.writeFileSync(path.join(destDir, 'partners.astro'), getPartnersTemplate(lang), 'utf8');
  
  // Partners Apply Subpage
  const partnersDir = path.join(destDir, 'partners');
  if (!fs.existsSync(partnersDir)) {
    fs.mkdirSync(partnersDir, { recursive: true });
  }
  fs.writeFileSync(path.join(partnersDir, 'apply.astro'), getPartnerApplyTemplate(lang), 'utf8');
  
  // Docs Pages
  const docsDir = path.join(destDir, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  fs.writeFileSync(path.join(docsDir, 'privacy.astro'), getDocsTemplate(lang, 'privacy'), 'utf8');
  fs.writeFileSync(path.join(docsDir, 'terms.astro'), getDocsTemplate(lang, 'terms'), 'utf8');
  
  // Announcements Index Page
  const annDir = path.join(destDir, 'announcements');
  if (!fs.existsSync(annDir)) {
    fs.mkdirSync(annDir, { recursive: true });
  }
  fs.writeFileSync(path.join(annDir, 'index.astro'), getAnnouncementsIndexTemplate(lang), 'utf8');
  
  // Dynamic detail page template
  fs.writeFileSync(path.join(annDir, '[slug].astro'), getAnnouncementsDetailTemplate(lang), 'utf8');
  
  console.log(`Generated all pages and subpages for: ${lang}`);
});

console.log('All Astro page routes generated successfully!');
