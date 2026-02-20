# PromotionPage.vue 代码分析与重构建议

## 1. 文件概况

| 指标 | 数值 |
|------|------|
| 总行数 | 1135 行 |
| 文件大小 | 26 KB |
| Script 部分 | ~150 行 |
| Template 部分 | ~280 行 |
| Style 部分 | ~700 行 |

**问题核心**: 样式代码占比过高 (约62%)，导致文件臃肿。

---

## 2. 问题分析

### 2.1 样式代码膨胀
- **700+ 行 scoped CSS** 全部写在单文件组件内
- 大量样式可复用但未抽取（按钮、卡片、section header）
- keyframes 动画定义重复

### 2.2 组件拆分不足
当前页面包含 6 个逻辑区块，全部写在一个文件中：
1. Hero Section (倒计时)
2. Benefits Cards Section
3. CTA Section
4. Rules Section
5. FAQ Section
6. Footer

### 2.3 逻辑代码重复
- `goToAboutUs` / `goToAnnouncement` 等导航函数在多个页面重复
- FAQ 折叠逻辑可复用
- 滚动动画初始化逻辑可抽取为 composable

### 2.4 Footer 重复
Footer 在 `WebFooter.vue` 已存在，但 PromotionPage 重复实现了一个简化版

---

## 3. 重构方案

### 3.1 抽取子组件

建议创建以下组件：

```
src/components/promotion/
├── PromoHero.vue          # Hero + 倒计时
├── PromoBenefitCard.vue   # 单个优惠卡片
├── PromoRules.vue         # 活动规则
├── PromoFaq.vue           # FAQ 折叠区
└── PromoCountdown.vue     # 倒计时器
```

#### PromoCountdown.vue 示例
```vue
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Clock } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps<{
  endDate?: Date
}>()

const countdown = ref({ days: 0, hours: 0, minutes: 0, seconds: 0 })
let interval: number | null = null

onMounted(() => {
  const end = props.endDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
  
  const update = () => {
    const distance = end.getTime() - Date.now()
    if (distance > 0) {
      countdown.value = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      }
    }
  }
  
  update()
  interval = window.setInterval(update, 1000)
})

onUnmounted(() => interval && clearInterval(interval))
</script>

<template>
  <div class="countdown-wrapper">
    <h3 class="countdown-title">
      <Clock class="icon" />
      {{ t('promotion.countdownTitle') }}
    </h3>
    <div class="countdown-grid">
      <div v-for="(value, key) in countdown" :key="key" class="countdown-item">
        <div class="countdown-number">{{ String(value).padStart(2, '0') }}</div>
        <div class="countdown-label">{{ t(`promotion.${key}`) }}</div>
      </div>
    </div>
  </div>
</template>
```

#### PromoBenefitCard.vue 示例
```vue
<script setup lang="ts">
import { Gift, Zap } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
  icon: Component
  title: string
  originalPrice: string
  promoPrice: string
  saveText: string
}>()
</script>

<template>
  <div class="promo-card">
    <div class="promo-card-icon">
      <component :is="icon" />
    </div>
    <h3 class="promo-card-title">{{ title }}</h3>
    <div class="promo-card-pricing">
      <div class="original-price">
        <span class="price-label">{{ t('promotion.originalPrice') }}</span>
        <span class="price-value strikethrough">{{ originalPrice }}</span>
      </div>
      <div class="promo-arrow"><Zap /></div>
      <div class="promo-price">
        <span class="price-label">{{ t('promotion.promoPrice') }}</span>
        <span class="price-value highlight">{{ promoPrice }}</span>
      </div>
    </div>
    <div class="promo-card-save">
      <Gift class="save-icon" />
      <span>{{ saveText }}</span>
    </div>
  </div>
</template>
```

---

### 3.2 抽取 Composables

创建可复用的逻辑函数：

```
src/composables/
├── useCountdown.ts        # 倒计时逻辑
├── useScrollAnimation.ts  # 滚动动画
├── useFaqToggle.ts        # FAQ 折叠
└── useNavigation.ts       # 页面导航
```

#### useNavigation.ts 示例
```typescript
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

export function useNavigation() {
  const router = useRouter()
  const { locale } = useI18n()

  const navigate = async (path: string, scrollTo?: string) => {
    const route = router.currentRoute.value
    await router.push({
      path: `/${locale.value}/${path}`,
      hash: route.hash,
      query: route.query
    })
    if (scrollTo) {
      document.querySelector(scrollTo)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return {
    goToAboutUs: () => navigate('about-us', '#about-us'),
    goToAnnouncement: () => navigate('announcements', '#announcement'),
    goToPromotion: () => navigate('promotion', '#promotion'),
    goToPartner: () => navigate('partner', '#partner'),
  }
}
```

---

### 3.3 样式外部化

将公共样式移至全局 CSS：

```
src/
├── style.css              # 已有全局样式
├── styles/
│   ├── components.css     # 按钮、卡片、徽章
│   ├── sections.css       # section-header, container
│   └── animations.css     # keyframes 动画
```

---

### 3.4 复用现有 Footer

直接使用 `WebFooter.vue` 替代自定义 Footer：

```vue
<template>
  <!-- 其他内容 -->
  <WebFooter />
</template>

<script setup>
import WebFooter from '@/components/WebFooter.vue'
</script>
```

---

## 4. 重构后文件结构预估

| 区域 | 重构前 | 重构后 |
|------|--------|--------|
| Script | 150 行 | 50 行 |
| Template | 280 行 | 80 行 |
| Style | 700 行 | 100 行 (scoped) |
| **总计** | **1135 行** | **~230 行** |

**预计缩减: 80%+**

---

## 5. 重构优先级

| 优先级 | 任务 | 影响 |
|--------|------|------|
| 🔴 高 | 复用 WebFooter | 立即减少 ~50 行 |
| 🔴 高 | 抽取 PromoCountdown | 可复用于其他活动 |
| 🟡 中 | 抽取 PromoBenefitCard | 减少模板重复 |
| 🟡 中 | 创建 useNavigation | 统一导航逻辑 |
| 🟢 低 | 外部化样式 | 需要项目级规划 |

---

## 6. 总结

PromotionPage.vue 文件过长的主要原因是：
1. **样式未抽取** - 700 行 CSS 应移至外部或复用公共样式
2. **组件粒度过粗** - 可拆分为 5+ 个子组件
3. **逻辑未复用** - 倒计时、导航、动画等可抽取为 composables
4. **Footer 重复** - 应复用现有 WebFooter 组件

建议按优先级逐步重构，优先处理高优先级任务可快速减少约 30% 代码量。
