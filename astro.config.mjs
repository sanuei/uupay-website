import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://uupay.com',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'zh-CN', 'zh-TW', 'ja', 'ko', 'vi', 'th', 'ms', 'id', 'es', 'ar'],
    routing: {
      prefixDefaultLocale: false  // 英文用 /，其他用 /zh-CN/ 等
    }
  },
  output: 'static'  // 纯静态输出
});
