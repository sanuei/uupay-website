# UUPAY 官方网站

![Vue 3](https://img.shields.io/badge/Vue-3.x-42b883?style=flat-square&logo=vue.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat-square&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-646cff?style=flat-square&logo=vite)

UUPAY 是一家专注于跨境支付解决方案的金融科技公司官方网站。本项目使用 Vue 3 + TypeScript + Vite 构建，提供多语言支持和响应式设计。

## 技术栈

- **前端框架**: Vue 3 (Composition API + `<script setup>`)
- **构建工具**: Vite 5
- **类型系统**: TypeScript 5
- **路由管理**: Vue Router 4
- **状态管理**: Pinia
- **页面适配**: Tailwind CSS (原子化 CSS) + Vant 4 (移动端组件库)
- **国际化**: Vue I18n (支持多达 12 种语言，包括中/英/泰/西/葡/法等)
- **工具/功能**: VueUse, crypto-js, Swiper (轮播), marked (Markdown 解析)
- **图标/SEO**: Lucide Vue Next, FontAwesome, @unhead/vue (SEO)

---

## 系统架构

### 项目结构

```
src/
├── App.vue                   # 根组件
├── main.ts                   # 应用入口
├── style.css                 # 全局样式入口
│
├── assets/                   # 静态资源
│   └── styles/               # CSS 样式文件
│       ├── base.css          # 基础样式、CSS 变量
│       ├── layout.css        # 布局样式（导航栏、页脚结构）
│       ├── components.css    # 通用组件样式
│       └── animations.css    # 动画样式
│
├── components/               # 可复用组件
│   ├── WebHeader.vue         # 导航栏（含响应式移动端适配）
│   ├── WebFooter.vue         # 页脚
│   ├── WebSitemap.vue        # 网站地图（页脚链接）
│   ├── WebContent1.vue       # 首页 Hero 区域
│   ├── WebContent2.vue       # 首页"关于 UUPAY"卡片
│   ├── WebContent3.vue       # 首页"完整金融工具"卡片
│   ├── WebContent4.vue       # 首页"全球覆盖"区域
│   ├── WebContent5.vue       # 首页"安全保障"区域
│   ├── WebContent6.vue       # 首页 CTA 区域
│   ├── PhoneHeader.vue       # 移动端导航栏（Logo + 语言 + 汉堡菜单）
│   ├── PhoneFooter.vue       # 移动端页脚（居中堆叠布局）
│   ├── promotion/            # 活动页面专用组件
│   │   ├── PromoCountdown.vue    # 倒计时组件
│   │   ├── PromoBenefitCard.vue  # 福利卡片组件
│   │   └── PromoFaq.vue          # FAQ 组件
│   └── verification/         # 验证组件聚合（滑动验证等）
│       └── Verify.vue
│
├── views/                    # 页面视图
│   ├── DeviceWrapper.vue     # 设备检测包装器
│   ├── WebLayout.vue         # 统一布局（含响应式设计）
│   ├── PhoneLayout.vue       # 移动端布局
│   ├── Home.vue              # 首页逻辑
│   ├── WebPage.vue           # 桌面端首页
│   ├── PhonePage.vue         # 移动端首页
│   ├── AboutUs.vue           # 关于我们页面
│   ├── PartnerPage.vue       # 合伙人计划页面
│   ├── PromotionPage.vue     # 限时活动页面
│   ├── InvitePage.vue        # 邀请与海报生成页
│   ├── BlogList.vue          # 博客列表页
│   ├── BlogDetail.vue        # 博客详情页
│   ├── WebAnnouncement.vue   # 公告列表页
│   └── WebAnnouncementDetail.vue # 公告详情页
│
├── router/                   # 路由配置
│   └── index.ts              # 路由定义
│
├── stores/                   # Pinia 状态管理
│   └── index.ts              # 全局状态
│
├── i18n/                     # 国际化
│   ├── index.ts              # i18n 配置
│   └── locales/              # 语言包
│       ├── zh.ts             # 简体中文
│       ├── zhtw.ts           # 繁体中文
│       ├── en.ts             # 英文
│       └── th.ts             # 泰语
│
├── composables/              # 可复用逻辑（Composition API）
│   ├── useDevice.ts          # 设备检测
│   ├── useNavigation.ts      # 导航逻辑
│   └── useScroll.ts          # 滚动监听
│
├── types/                    # TypeScript 类型定义
│   └── ...
│
└── constants/                # 常量定义
    └── ...
```

---

### 核心架构设计

#### 1. 响应式设计策略

项目采用 **双布局架构**，根据 User-Agent 检测设备类型，加载不同的布局组件：

**架构图**：
```
路由层 (router/index.ts)
├── 桌面端 UA → WebLayout.vue
│   ├── WebHeader.vue     (完整导航菜单 + 语言选择器 + CTA)
│   ├── <router-view />
│   ├── WebSitemap.vue
│   └── WebFooter.vue
│
└── 移动端 UA → PhoneLayout.vue
    ├── PhoneHeader.vue   (Logo + 语言选择器 + 汉堡菜单)
    ├── <router-view />
    └── PhoneFooter.vue   (简洁居中布局)
```

**组件职责**：
- **WebHeader**：桌面端导航栏，显示完整菜单链接、语言选择器和"开始使用"按钮
- **PhoneHeader**：移动端导航栏，只显示 Logo、语言选择器和汉堡菜单按钮（CTA 按钮在菜单弹出层内）
- **WebFooter**：桌面端页脚，横向布局
- **PhoneFooter**：移动端页脚，居中堆叠布局

#### 2. 国际化 (i18n) 架构

支持四种语言，通过 Vue I18n 实现：

| 语言 | 代码 | 文件 |
|------|------|------|
| 简体中文 | `zh-cn` | `zh.ts` |
| 繁体中文 | `zh-tw` | `zhtw.ts` |
| 英文 | `en` | `en.ts` |
| 泰语 | `th` | `th.ts` |

**路由结构**：`/:lang/...`（例如 `/zh-cn/about-us`）

#### 3. 路由设计

所有路由均以 `/:lang` 作为前缀，支持多语言 URL：

```typescript
// 示例路由配置
{
  path: '/:lang(en|zh-cn|zh-tw|th|pt|es|tr|fr|ja|ko|de|ar)',
  children: [
    { path: '', component: Home },           // 首页
    { path: 'about-us', component: AboutUs }, // 关于我们
    { path: 'partner', component: PartnerPage }, // 合伙人
    { path: 'promotion', component: PromotionPage }, // 活动页
    { path: 'invitePage', component: InvitePage }, // 邀请页
    { path: 'blog', component: BlogList },    // 博客列表
    // ...
  ]
}
```

#### 4. CSS 架构

采用 **分层 CSS 结构**：

| 文件 | 职责 |
|------|------|
| `base.css` | CSS 变量、全局重置、字体 |
| `layout.css` | 导航栏、页脚、容器布局 |
| `components.css` | 通用组件样式（按钮、卡片、标题） |
| `animations.css` | 动画和过渡效果 |

**CSS 变量示例**（`base.css`）：
```css
:root {
  --primary-color: #47C68F;
  --bg-dark: #0a0a0a;
  --text-primary: #ffffff;
  --text-secondary: rgba(255, 255, 255, 0.7);
  --font-size-hero: clamp(2.5rem, 5vw, 5rem);
  /* ... */
}
```

#### 5. 组件设计原则

- **单文件组件 (SFC)**: 使用 Vue 3 的 `<script setup>` 语法。
- **Scoped CSS**: 每个组件使用 `<style scoped>` 避免样式污染。
- **Props + Emit**: 组件间通过 Props 传递数据，Emit 抛出事件。
- **Composables**: 可复用逻辑抽取到 `composables/` 目录。

---

### 页面说明

| 页面 | 路由 | 描述 |
|------|------|------|
| 首页 | `/:lang/` | 产品展示、功能介绍、CTA |
| 关于我们 | `/:lang/about-us` | 公司使命、愿景、优势 |
| 合伙人计划 | `/:lang/partner` | 合伙人权益、佣金政策、FAQ |
| 限时活动 | `/:lang/promotion` | 开卡/充值免费活动 |
| 邀请页面 | `/:lang/invitePage` | 发行实体卡片及代理海报生成 |
| 博客列表 | `/:lang/blog` | 公司动态、行业干货 |
| 博客详情 | `/:lang/blog/:id` | 博客文章具体内容阅读 |
| 公告列表 | `/:lang/announcements` | 平台官方公告列表 |
| 公告详情 | `/:lang/announcements/:id` | 平台官方公告具体内容 |

---

## 开发指南

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产版本

```bash
npm run preview
```

