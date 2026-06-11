# UUPAY 官网重构路线图（ROADMAP）

> 目标：将现有 Vue 3 SPA 官网重构为**企业级标准**的多语言官网，迁移到 **Nuxt 3 + SSG**，
> 还清架构技术债，并新增「福利中心 / eSIM / 机酒预定」等业务页面。
>
> 本文档为**规划与决策记录**，开工前供审阅。最后更新：2026-06-11

---

## 0. 已确认的决策

| 决策项 | 结论 |
|---|---|
| 渲染架构 | **迁移到 Nuxt 3 + SSG（静态预渲染）** |
| 是否换框架 | 不换。继续 Vue 生态（Vue 3 → Nuxt 3） |
| 机酒预定定位 | **仅营销展示页**（下单在 APP 内完成） |
| 本轮优先级 | **先还技术债**（响应式统一 + 拆大文件），通过迁移过程一并完成 |
| 部署方式 | **自有服务器 / Nginx**（SSG 产出静态文件，Nginx 托管） |
| 代码仓库 | GitHub 私有仓 `sanuei/uupay-website`，新分支 `nuxt-rebuild` 开发，旧 SPA 继续跑生产直到切换 |

**核心策略**：不在旧 Vite 项目里单独改响应式（会变白工），而是**把 Nuxt 迁移当作还债的载体**——
迁移每个页面时，同步完成「双套 Web/Phone 代码合一为响应式」+「拆解巨型单文件」。一举三得。

---

## 1. 现状诊断

### 1.1 技术栈（现代，无需推倒重来）
Vue 3.5 · Vite 4 · TypeScript · Tailwind 3 · Pinia · Vue-Router · Vue-i18n（12 语言）· Vant · Swiper

### 1.2 主要技术债

- 🔴 **Web/移动端是两套独立代码**
  `src/router/index.ts:52` 在加载时用 UA 判断 `isMobile`，分别加载 `WebLayout` / `PhoneLayout`。
  导致 `WebHeader/PhoneHeader`、`WebFooter/PhoneFooter`、`WebContent1~6` 等组件成对存在，
  **每个页面要写两遍**。这是新增页面工作量翻倍的根源，最优先解决。

- 🟡 **巨型单文件组件**
  `PartnerPage.vue`（53KB）、`InvitePage.vue`（43KB）、`PromotionPage.vue`（18KB），单文件数千行，难维护。

- 🟡 **纯客户端渲染（CSR）**，SEO 与社交分享卡片（OG）先天吃亏。

- 🟡 **组件命名语义弱**：`WebContent1` ~ `WebContent6` 无法从名字看出用途。

- 🟡 **无工程化保障**：无 ESLint / 无 Prettier / 无测试 / 无 CI/CD。

- 🟢 **图片未优化**：`src/assets/images/contact-background.png` > 5MB，需压缩 / 转 WebP。

### 1.3 内容与后端现状（迁移时必须保留）

- **内容为静态文件**：公告 = `public/announcements/*.json` + markdown（含兜底硬编码），
  博客 = markdown。→ **适合 SSG 预渲染，无需常驻 SSR**。
- **真实后端 API**：Nginx 将 `/api` 反代到 `http://server-member.uupay:8081`，携带网关头
  `GATEWAY_H5`。邀请页/验证组件依赖此接口。迁移后需保留同样的代理。
- **外部博客反代**：Nginx 将 `/zh-cn/blog`、`/zh-tw/blog`、`/en/blog` **反代到外部落地页服务**
  （`*.mylandingpages.co`），并非本站渲染。这是 SEO 落地页，迁移时**保持 Nginx 层反代不变**，
  Nuxt 不接管这三条路径。

---

## 2. 目标架构

| 维度 | 现在 | 目标 |
|---|---|---|
| 框架 | Vue 3 SPA (Vite 4) | **Nuxt 3 + SSG 预渲染** |
| 渲染 | 纯 CSR | 构建时静态生成，Nginx 直发 HTML |
| 端适配 | Web/Phone 两套 | **一套响应式**（Tailwind 断点） |
| 页面文件 | 单文件 40-53KB | 拆为语义化区块组件 |
| 国际化 | vue-i18n 手搓路由 | **@nuxtjs/i18n**（自动 hreflang / 语言前缀路由） |
| 状态 | Pinia | `@pinia/nuxt`（平滑迁移） |
| 内容 | 手搓 marked | **@nuxt/content**（markdown 规范化管理） |
| SEO 头 | @unhead 手动 | Nuxt 内置 `useSeoMeta` / `useHead` |
| 图片 | 原图 | **@nuxt/image**（自动压缩 / WebP / 响应式尺寸） |
| 质量 | 无 | ESLint + Prettier + lint-staged + GitHub Actions |

**为什么 SSG 而非 SSR**：内容是静态文件，营销页 + 文件型博客，SSG 预渲染全部页面 → 纯静态托管，
无服务器运维，首屏与 SEO 最优。未来若机酒预定需要实时搜索等动态能力，Nuxt 支持**混合渲染**，
单独给该路由开 SSR / API 即可，不影响其他静态页。

---

## 3. 分阶段计划（每阶段可独立验收）

### 阶段 0 — Nuxt 地基
- [ ] 在 `nuxt-rebuild` 分支初始化 Nuxt 3 项目骨架（旧 SPA 不动，继续跑生产）
- [ ] 接入模块：`@nuxtjs/i18n`、`@pinia/nuxt`、`@nuxtjs/tailwindcss`、`@nuxt/image`、`@nuxt/content`
- [ ] 移植设计令牌：`tailwind.config.js`、字体（Open Sans / Noto Sans Thai）、全局样式
- [ ] 配置 12 语言路由前缀 + `nitro.prerender` 全量预渲染
- [ ] 配置 `nuxt generate` 静态输出 → 对接 Nginx（见第 4 节）
- **验收**：`npm run generate` 产出静态站点，本地 Nginx 能跑通空壳首页 + 语言切换。

### 阶段 1 — 响应式布局壳 + 样板页（还债核心）
- [ ] **一套** `AppHeader` / `AppFooter` / `layouts/default.vue`（彻底干掉 Web/Phone 双套）
- [ ] 迁移 **首页 + 关于我们**，确立「区块组件 + Tailwind 断点」标准范式
- [ ] `WebContent1~6` → 语义化命名（`HeroSection` / `FeatureGrid` / `CtaSection` …）
- **验收**：首页在桌面 / 平板 / 手机三档断点表现正确，单套代码，Lighthouse 初测达标。

### 阶段 2 — 迁移存量页 + 拆巨型文件
- [ ] 文档中心、公告（列表 + 详情）、推广、邀请、合伙人
- [ ] 迁移时**顺手拆解** `PartnerPage`(53KB)、`InvitePage`(43KB) → 多个小区块组件
- [ ] 公告 / 文档 markdown 迁到 `@nuxt/content`
- [ ] 保留 `/api` 后端代理；`/{lang}/blog` 外部反代不接管（Nginx 层处理）
- **验收**：所有旧页面在新站达到功能与视觉对等（parity）。

### 阶段 3 — 新业务页面（营销展示版）
- [ ] **福利中心**：权益 / 活动 / 奖励展示
- [ ] **eSIM**：功能介绍 + 套餐展示 + 引导下载 APP
- [ ] **机酒预定**：营销展示页（功能亮点 + 引导，下单在 APP 内）
- **验收**：三个新页面上线，多语言齐备，纳入导航与 sitemap。

### 阶段 4 — 工程质量 + SEO 收尾
- [ ] ESLint + Prettier + lint-staged（提交前自动校验）
- [ ] GitHub Actions：push → 构建 `nuxt generate` → 部署到自有服务器（rsync/scp，见第 4 节）
- [ ] SEO：`hreflang`、结构化数据（Organization / FAQ / Product）、`sitemap.xml`、OG 卡片
- [ ] 性能：图片压缩（先处理那张 5MB png）、字体子集化、Lighthouse 调优
- **验收**：Lighthouse 四项 ≥ 90，多语言 hreflang 正确，CI 全绿自动部署。

---

## 4. 部署方案（自有服务器 / Nginx）

**产物**：`nuxt generate` → `.output/public/`（纯静态文件，含每条路由的预渲染 HTML）。

**Nginx 关键点**：
- `root` 指向 `.output/public`；静态文件直发，无需 SPA fallback（SSG 已为每条路由生成 HTML）。
- **保留** `/api` 反代到 `server-member.uupay:8081`（含 `GATEWAY_H5` 网关头）。
- **保留** `/zh-cn/blog`、`/zh-tw/blog`、`/en/blog` 反代到外部落地页服务，**先于** Nuxt 静态路由匹配。
- 开启 gzip / brotli；静态资源（hash 文件名）设长缓存 `Cache-Control: immutable`，HTML 设短缓存。
- 处理无尾斜杠重定向（与现有 SPA 行为对齐）。

**CI/CD（GitHub Actions）**：
1. push 到 `nuxt-rebuild` / `main` → 安装依赖 → `npm run generate`
2. 通过 `rsync` over SSH 将 `.output/public/` 同步到服务器目录
3. 部署密钥（SSH key / 服务器 IP / 路径）存 GitHub Secrets

> ⚠️ 待你提供：部署服务器的 SSH 访问信息（仅在开始阶段 4 时需要）。

---

## 5. 待确认 / 风险

- [ ] **部署服务器访问**：SSH 主机、用户、目标目录、是否已有 SSL 证书（阶段 4 前确认）。
- [ ] **外部博客落地页**：`*.mylandingpages.co` 是否长期保留？是否计划自建博客替代？
- [ ] **后端 API 契约**：邀请 / 验证接口字段是否有文档，迁移时需对齐。
- [ ] **品牌资产**：是否有新版 Logo / VI / 设计稿（影响新页面视觉规范）。
- [ ] **机酒预定**：未来是否可能升级为网页内可搜索（届时该路由改 SSR/混合渲染）。

---

## 6. 切换上线策略

旧 SPA 在 `main-uupay3` 分支持续服务生产；新站在 `nuxt-rebuild` 分支开发。
当阶段 1~3 达到对等后，灰度切换 Nginx `root` 指向新产物，验证无误后正式切换，旧分支保留回滚能力。
