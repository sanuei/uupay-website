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
  return `---
import BaseLayout from '${importPrefix}/layouts/BaseLayout.astro';
import Navbar from '${importPrefix}/components/Navbar.astro';
import PartnerPreview from '${importPrefix}/components/PartnerPreview.astro';
import Footer from '${importPrefix}/components/Footer.astro';

const lang = '${lang}';
---

<BaseLayout lang={lang} title="Partner Program | UUPAY">
  <Navbar lang={lang} />
  <main style="padding-top: 120px; min-height: 70vh;">
    <PartnerPreview lang={lang} />
    <section class="container scroll-reveal" style="padding: 80px 0; text-align: center;">
      <h2 style="font-size: 36px; margin-bottom: 24px; font-weight: 800;">Become a UUPAY Partner</h2>
      <p style="color: var(--text-secondary); max-width: 600px; margin: 0 auto 48px; line-height: 1.6; font-size: 15px;">
        Enjoy exclusive benefits, priority support, and direct access to banking channels. Get up to 50% commission dynamically.
      </p>
      <a href="https://xjpc8r3322zb.jp.larksuite.com/share/base/form/shrjpxpOY6gk79yRXzrJM87cf8g" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-large">
        Submit Application Form
      </a>
    </section>
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
  return `---
import Layout from '${importPrefix}/layouts/BaseLayout.astro';
import Header from '${importPrefix}/components/Navbar.astro';
import Footer from '${importPrefix}/components/Footer.astro';
import { getCollection } from 'astro:content';

const allAnnouncements = await getCollection('announcements');
const sortedAnnouncements = allAnnouncements.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
const lang = '${lang}';
---

<Layout title="Announcements | UUPAY" lang={lang}>
  <Header lang={lang} />
  
  <main class="announcements-container container animate-in" style="padding-top: 120px; min-height: 70vh;">
    <header class="section-header text-center">
      <h1 style="font-size: 48px; color: var(--brand-primary); margin-bottom: 16px;">Announcements</h1>
      <p style="color: var(--text-secondary);">Stay updated with the latest news, security updates, and features from UUPAY.</p>
    </header>
    
    <div class="list-wrapper" style="display: flex; flex-direction: column; gap: 24px;">
      {sortedAnnouncements.map((post) => (
        <a href={\`/\${lang === 'en' ? '' : lang + '/'}announcements/\${post.id}\`} class="announcement-card">
          <div class="meta" style="display: flex; gap: 16px; align-items: center; margin-bottom: 16px; font-size: 14px;">
            <span class="tag" style="background: rgba(57, 255, 20, 0.1); color: var(--brand-primary); padding: 4px 12px; border-radius: var(--radius-pill); font-weight: 500;">{post.data.type}</span>
            <span class="date">{post.data.date.toISOString().split('T')[0]}</span>
          </div>
          <h2>{post.data.title}</h2>
        </a>
      ))}
    </div>
  </main>
  
  <Footer lang={lang} />
</Layout>
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
