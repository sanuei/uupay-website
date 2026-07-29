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

const extraAnnouncements = ${isZh ? `[
  {
    id: "fiat-express-v2",
    title: "UUPAY 关于更新极速法币出金 2.0 通道与银行同名到账规则的公告",
    date: "2026-07-29",
    category: "法币出金"
  },
  {
    id: "security-update-20260722",
    title: "UUPAY 关于网络安全漏洞协同披露政策与白帽子悬赏奖励计划的公告",
    date: "2026-07-28",
    category: "系统与安全"
  },
  {
    id: "esim-coverage-expansion",
    title: "UUPAY 关于全球 eSIM 流量网络扩容 40+ 国家与 5G 极速激活的公告",
    date: "2026-07-28",
    category: "eSIM 通信"
  },
  {
    id: "partner-program-upgrade",
    title: "UUPAY 关于延长全球推荐合伙人最高 50% 阶梯返佣活动时间的公告",
    date: "2026-07-28",
    category: "活动与合伙人"
  },
  {
    id: "spot-usdt-card-launch",
    title: "UUPAY Visa & Mastercard 双通道尊享金色加密实体卡全量开放申请公告",
    date: "2026-07-27",
    category: "卡片服务"
  },
  {
    id: "system-maintenance-notice",
    title: "UUPAY 关于例行系统升级与硬件安全模块(HSM)平滑维护完成的公告",
    date: "2026-07-26",
    category: "系统与安全"
  }
]` : `[
  {
    id: "fiat-express-v2",
    title: "UUPAY Announcement on Fiat Express 2.0 Channels & Bank Direct Deposit Update",
    date: "2026-07-29",
    category: "Fiat Express"
  },
  {
    id: "security-update-20260722",
    title: "UUPAY Announcement on Security Vulnerability Disclosure & Bug Bounty Program",
    date: "2026-07-28",
    category: "Security & System"
  },
  {
    id: "esim-coverage-expansion",
    title: "UUPAY Announcement on Global eSIM Network Expansion 40+ Countries & 5G Access",
    date: "2026-07-28",
    category: "eSIM & Mobile"
  },
  {
    id: "partner-program-upgrade",
    title: "UUPAY Announcement on Extending Partner 50% Tiered Commission Reward Program",
    date: "2026-07-28",
    category: "Promotions & Partners"
  },
  {
    id: "spot-usdt-card-launch",
    title: "Visa & Mastercard Dual-Channel Luxury Gold Crypto Card Application Release Notice",
    date: "2026-07-27",
    category: "Card Services"
  },
  {
    id: "system-maintenance-notice",
    title: "UUPAY Announcement on Routine System Maintenance & HSM Module Upgrade Completion",
    date: "2026-07-26",
    category: "Security & System"
  }
]`};

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
                <div class="bingx-notice-date">{post.data.date.toISOString().split('T')[0]}</div>
              </a>
            ))}

            {extraAnnouncements.map((item) => (
              <a
                href={\`/\${lang === 'en' ? '' : lang + '/'}announcements/\${item.id}\`}
                class="bingx-notice-item"
                data-category={item.category}
                data-title={item.title.toLowerCase()}
              >
                <div class="bingx-notice-title">{item.title}</div>
                <div class="bingx-notice-date">{item.date}</div>
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
  
  <main class="article-container container animate-in" style="padding-top: 120px; min-height: 70vh;">
    <a href={\`/\${lang === 'en' ? '' : lang + '/'}announcements\`} class="back-link">← Back to Announcements</a>
    
    <article class="docs-content prose" style="max-width: 800px; margin: 40px auto 0;">
      <header class="docs-header" style="margin-bottom: 48px; padding-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1)">
        <div class="meta" style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px; font-size: 14px; color: var(--text-secondary)">
          <span class="tag" style="background: rgba(57, 255, 20, 0.1); color: var(--brand-primary); padding: 4px 12px; border-radius: var(--radius-pill);">{post.data.type}</span>
          <span class="date">{post.data.date.toISOString().split('T')[0]}</span>
        </div>
        <h1 style="font-size: 40px; line-height: 1.2;">{post.data.title}</h1>
      </header>
      
      <div class="markdown-body">
        <Content />
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
