<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import { TrendingUp, Users, Zap, Crown, Gift, Headphones, Newspaper, FilePen, Share2, Coins, ArrowRight, ChevronDown } from "lucide-vue-next";
import { onBeforeUnmount, onMounted } from "vue";
import { PARTNER_URL } from "@/constants";
import { useRoute } from 'vue-router'
import { useHreflang } from '@/utils/useHreflang'

const route = useRoute()
useHreflang(route)

const { locale, t } = useI18n()

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

// ===============================
// FAQ 开关逻辑（封装）
// ===============================
let faqItems: NodeListOf<HTMLElement> | null = null;

const handleClick = (item: HTMLElement) => {
  faqItems?.forEach(other => {
    if (other !== item) {
      other.classList.remove('active');
    }
  });

  item.classList.toggle('active');
};

onMounted(() => {
  faqItems = document.querySelectorAll<HTMLElement>('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => handleClick(item));
  });
});

onBeforeUnmount(() => {
  faqItems?.forEach(item => {
    item.removeEventListener('click', () => handleClick(item));
  });
});



function initStatNumberAnimation() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const numberAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement;
      if (entry.isIntersecting && !el.classList.contains('animated')) {
        const target = el.dataset.target ? parseInt(el.dataset.target) : null;
        const statItem = el.closest('.stat-item');

        if (target !== null) {
          animateNumberFadeIn(el, target, 1500);
        } else {
          animateNumberFadeIn(el, null, 1500);
        }

        el.classList.add('animated');

        if (statItem) {
          statItem.classList.add('animated');
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll<HTMLElement>('.stat-number').forEach(el => {
    numberAnimationObserver.observe(el);
  });
}

// =========================
//   单个数字淡入动画
// =========================
function animateNumberFadeIn(
    element: HTMLElement,
    targetNumber: number | null,
    duration: number
) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';

  let startTimestamp: number | null = null;

  const step = (timestamp: number) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

    element.style.opacity = progress.toString();
    element.style.transform = `translateY(${20 * (1 - progress)}px)`;

    if (targetNumber !== null) {
      const startValue = Math.floor(targetNumber * 0.8);
      const current = Math.floor(progress * (targetNumber - startValue) + startValue);
      element.textContent = current + ''; // 显示'+'
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      if (targetNumber !== null) {
        element.textContent = targetNumber + '';// 显示'+'
      }
    }
  };

  requestAnimationFrame(step);
}

onMounted(() => {
  initStatNumberAnimation();
});

const scrollObserverOptions: IntersectionObserverInit = {
  threshold: 0.2
}

let scrollObserver: IntersectionObserver | null = null

onMounted(() => {
  const elements = document.querySelectorAll<HTMLElement>(
      '.feature-card, .community-card, .step-item'
  )

  scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target as HTMLElement
        target.style.opacity = '1'
        target.style.transform = 'translateY(0)'
        scrollObserver?.unobserve(target)
      }
    })
  }, scrollObserverOptions)

  elements.forEach((el, index) => {
    el.style.opacity = '0'
    el.style.transform = 'translateY(50px)'
    el.style.transition = `
      opacity 0.8s ease ${index * 0.1}s,
      transform 0.8s ease ${index * 0.1}s
    `
    scrollObserver?.observe(el)
  })
})

onBeforeUnmount(() => {
  scrollObserver?.disconnect()
})
</script>

<template>
  <!-- 合夥人 hero-partner Section -->
  <section id="partner" class="hero-partner partner-hero-partner">
    <div class="hero-partner-decor" aria-hidden="true">
      <span class="hero-partner-orb orb-1"></span>
      <span class="hero-partner-orb orb-2"></span>
      <span class="hero-partner-orb orb-3"></span>
    </div>
    <div class="container">
      <div class="hero-partner-layout">
        <!-- 左侧：文字内容 -->
        <div class="hero-partner-content-left">
          <h1 class="hero-partner-title hero-partner-title-large">
            <span style="color: white !important; -webkit-text-fill-color: white !important; background: none !important; filter: none !important;">{{ t('partnerPage.partnerTitle') }}</span>
            <br>
            <span style="color: white !important; -webkit-text-fill-color: white !important; background: none !important; filter: none !important;">{{ t('partnerPage.partnerSubTitle') }}</span>
          </h1>

          <p class="hero-partner-subtitle">
            {{ t('partnerPage.headContent') }}
          </p>

          <div class="hero-partner-pills" aria-label="Partner highlights">
            <span class="hero-partner-pill">{{ t('partnerPage.hourTime') }}</span>
            <span class="hero-partner-pill">{{ t('partnerPage.realTimeCommission') }}</span>
            <span class="hero-partner-pill">{{ t('partnerPage.assetsSupport') }}</span>
          </div>

          <div class="download-buttons">
            <a :href="PARTNER_URL" target="_blank" class="primary-button" style="text-decoration: none; display: inline-block;">
              <span>{{ t('partnerPage.applyNow') }}</span>
              <div class="button-glow"></div>
            </a>
          </div>
        </div>

        <!-- 右侧：增长图表 -->
        <div class="hero-partner-visual-right">
          <div class="hero-partner-chart-wrapper">
            <!-- 主图表 -->
            <div class="hero-partner-chart-main">
              <svg viewBox="0 0 500 350" class="hero-partner-chart-svg">
                <defs>
                  <linearGradient id="hero-partnerChartGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.3"/>
                    <stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0"/>
                  </linearGradient>
                  <filter id="chartGlow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <!-- 背景网格 -->
                <g class="chart-grid" opacity="0.15">
                  <line x1="0" y1="300" x2="500" y2="300" stroke="var(--primary-color)" stroke-width="1"/>
                  <line x1="0" y1="250" x2="500" y2="250" stroke="var(--primary-color)" stroke-width="1"/>
                  <line x1="0" y1="200" x2="500" y2="200" stroke="var(--primary-color)" stroke-width="1"/>
                  <line x1="0" y1="150" x2="500" y2="150" stroke="var(--primary-color)" stroke-width="1"/>
                  <line x1="0" y1="100" x2="500" y2="100" stroke="var(--primary-color)" stroke-width="1"/>
                  <line x1="0" y1="50" x2="500" y2="50" stroke="var(--primary-color)" stroke-width="1"/>
                </g>

                <!-- 增长曲线 -->
                <path d="M50,280 Q150,240 200,200 T350,120 T450,80"
                      class="hero-partner-chart-line"
                      stroke="var(--primary-color)"
                      stroke-width="4"
                      fill="none"
                      filter="url(#chartGlow)"
                      stroke-linecap="round"
                      stroke-dasharray="800"
                      stroke-dashoffset="800">
                  <animate attributeName="stroke-dashoffset" from="800" to="0" dur="2.5s" fill="freeze"/>
                </path>

                <!-- 填充区域 -->
                <path d="M50,280 Q150,240 200,200 T350,120 T450,80 L450,350 L50,350 Z"
                      fill="url(#hero-partnerChartGradient)"
                      opacity="0"
                      class="hero-partner-chart-area">
                  <animate attributeName="opacity" from="0" to="1" dur="1.2s" begin="1.8s" fill="freeze"/>
                </path>

                <!-- 数据点 -->
                <circle cx="200" cy="200" r="6" fill="var(--primary-color)" opacity="0" filter="url(#chartGlow)">
                  <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="1s" fill="freeze"/>
                </circle>
                <circle cx="350" cy="120" r="6" fill="var(--primary-color)" opacity="0" filter="url(#chartGlow)">
                  <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="1.8s" fill="freeze"/>
                </circle>
                <circle cx="450" cy="80" r="8" fill="var(--primary-color)" opacity="0" filter="url(#chartGlow)">
                  <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.5s" fill="freeze"/>
                  <animate attributeName="r" from="8" to="10" dur="1.5s" begin="2.5s" repeatCount="indefinite"/>
                </circle>
              </svg>
            </div>

            <!-- 图表标注框 -->
            <div class="chart-annotation-box box-1">
              <div class="annotation-icon">
                <TrendingUp />
              </div>
              <div class="annotation-content">
                <div class="annotation-value">$4,750</div>
                <div class="annotation-label">{{ t('partnerPage.monthlyIncome') }}</div>
              </div>
            </div>

            <div class="chart-annotation-box box-2">
              <div class="annotation-icon">
                <Users />
              </div>
              <div class="annotation-content">
                <div class="annotation-value">500+</div>
                <div class="annotation-label">{{ t('partnerPage.partnerHead') }}</div>
              </div>
            </div>

            <div class="chart-annotation-box box-3">
              <div class="annotation-icon">
                <Zap />
              </div>
              <div class="annotation-content">
                <div class="annotation-value">{{ t('partnerPage.realTime') }}</div>
                <div class="annotation-label">{{ t('partnerPage.settle') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 核心数据展示 -->
  <section class="stats-section">
    <div class="container">
      <div class="partner-stats-grid">
        <div class="partner-stat-card" data-tilt>
          <div class="stat-number-wrapper">
            <div class="stat-number" style="min-width: 0" data-target="500">500</div>
            <div class="stat-suffix">+</div>
          </div>
          <div class="p-stat-label">{{ t('partnerPage.content1') }}</div>
        </div>
        <div class="partner-stat-card" data-tilt>
          <div class="stat-number-wrapper">
            <div class="stat-number" data-target="100000">100000</div>
            <div class="stat-suffix">USDT+</div>
          </div>
          <div class="p-stat-label">{{ t('partnerPage.content2') }}</div>
        </div>
        <div class="partner-stat-card" data-tilt>
          <div class="stat-number-wrapper">
            <div class="stat-number" style="min-width: 0" data-target="2000">2000</div>
            <div class="stat-suffix">$+</div>
          </div>
          <div class="p-stat-label">{{ t('partnerPage.content3') }}</div>
        </div>
        <div class="partner-stat-card" data-tilt>
          <div class="stat-number-wrapper">
            <div class="stat-number" style="text-align: center">{{ t('partnerPage.content4') }}</div>
          </div>
          <div class="p-stat-label">{{ t('partnerPage.content5') }}</div>
        </div>
      </div>
    </div>
  </section>

  <!-- 独家福利 -->
  <section class="about-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ t('partnerPage.benefitTitle') }}</h2>
        <p class="section-description">
          {{ t('partnerPage.benefitSubtitle') }}
        </p>
      </div>

      <div class="benefits-grid">
        <div class="feature-card" data-tilt>
          <div class="feature-icon-wrapper" style="margin-bottom: 1.5rem;">
            <div class="feature-icon">
              <Crown />
            </div>
          </div>
          <h3 class="typo-h3">{{ t('partnerPage.bestSupport') }}</h3>
          <p class="typo-small" style="margin-top: 0.5rem; color: #888;">{{ t('partnerPage.benefitContent') }}</p>
        </div>

        <div class="feature-card" data-tilt>
          <div class="feature-icon-wrapper" style="margin-bottom: 1.5rem;">
            <div class="feature-icon">
              <Gift />
            </div>
          </div>
          <h3 class="typo-h3">{{ t('partnerPage.offlineEvent') }}</h3>
          <p class="typo-small" style="margin-top: 0.5rem; color: #888;">{{ t('partnerPage.privateEvent') }}</p>
        </div>

        <div class="feature-card" data-tilt>
          <div class="feature-icon-wrapper" style="margin-bottom: 1.5rem;">
            <div class="feature-icon">
              <Headphones />
            </div>
          </div>
          <h3 class="typo-h3">{{ t('partnerPage.supportSource') }}</h3>
          <p class="typo-small" style="margin-top: 0.5rem; color: #888;">{{ t('partnerPage.alwaysOnline') }}</p>
        </div>

        <div class="feature-card" data-tilt>
          <div class="feature-icon-wrapper" style="margin-bottom: 1.5rem;">
            <div class="feature-icon">
              <Newspaper />
            </div>
          </div>
          <h3 class="typo-h3">{{ t('partnerPage.hotSell') }}</h3>
          <p class="typo-small" style="margin-top: 0.5rem; color: #888;">{{ t('partnerPage.analyzeReport') }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 社区 -->
  <section class="community-section">
    <div class="container">
      <div class="community-cta-box">
        <h2 class="community-title">{{ t('partnerPage.joinSocial') }}</h2>
        <p class="community-desc">
          {{ t('partnerPage.socialSubtitle') }}
        </p>
      </div>

      <div class="products-container" style="margin-top: 3rem;">
        <div class="community-card">
          <div class="community-user">
            <div class="user-avatar avatar-1">LC</div>
            <div class="user-info">
              <h3 class="user-name">Lina Chen</h3>
              <div class="user-role">{{ t('partnerPage.socialCreator1') }}</div>
            </div>
          </div>
          <p class="typo-body" style="color: var(--text-secondary);">
            {{ t('partnerPage.socialContent1') }}
          </p>
        </div>
        <div class="community-card">
          <div class="community-user">
            <div class="user-avatar avatar-2">AR</div>
            <div class="user-info">
              <h3 class="user-name">Alex Rivera</h3>
              <div class="user-role">{{ t('partnerPage.socialCreator2') }}</div>
            </div>
          </div>
          <p class="typo-body" style="color: var(--text-secondary);">
            {{ t('partnerPage.socialContent2') }}
          </p>
        </div>
        <div class="community-card">
          <div class="community-user">
            <div class="user-avatar avatar-3">SJ</div>
            <div class="user-info">
              <h3 class="user-name">Sophia James</h3>
              <div class="user-role">{{ t('partnerPage.socialCreator3') }}</div>
            </div>
          </div>
          <p class="typo-body" style="color: var(--text-secondary);">
            {{ t('partnerPage.socialContent3') }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- 为什么选择 -->
  <section class="about-section">
    <div class="container">
      <div class="why-choose-layout">
        <div>
          <h2 class="section-title" style="text-align: left; margin-bottom: 2rem;">{{ t('partnerPage.whyChoose') }}</h2>
          <ul class="product-features">
            <li class="typo-h3" style="margin-bottom: 1.5rem;">{{ t('partnerPage.global') }}</li>
            <li class="typo-h3">{{ t('partnerPage.ranking') }}</li>
          </ul>
        </div>

        <div class="chart-container" data-chart-interactive>
          <!-- 交互标注框 - 移到图表外部 -->
          <div class="floating-badge" data-income-badge>
            <span class="badge-label">{{ t('partnerPage.income') }}</span>
            <div class="badge-value">
              <span class="currency">$</span>
              <span class="income-number" data-target="4750">4750</span>
              <span class="currency-unit"> USDT</span>
            </div>
          </div>

          <!-- Interactive SVG Chart -->
          <svg viewBox="0 0 500 270" class="chart-line-mockup">
            <defs>
              <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stop-color="var(--primary-color)" stop-opacity="0.4"/>
                <stop offset="100%" stop-color="var(--primary-color)" stop-opacity="0"/>
              </linearGradient>
              <filter id="chartGlowFilter">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            <!-- 背景网格 -->
            <g class="chart-grid" opacity="0.1">
              <line x1="0" y1="200" x2="500" y2="200" stroke="var(--primary-color)" stroke-width="1"/>
              <line x1="0" y1="150" x2="500" y2="150" stroke="var(--primary-color)" stroke-width="1"/>
              <line x1="0" y1="100" x2="500" y2="100" stroke="var(--primary-color)" stroke-width="1"/>
              <line x1="0" y1="50" x2="500" y2="50" stroke="var(--primary-color)" stroke-width="1"/>
            </g>

            <!-- 填充区域 -->
            <path d="M50,200 Q150,180 200,150 Q250,120 300,90 Q350,60 400,40 Q450,20 450,20 V240 H50 Z"
                  fill="url(#chartGradient)"
                  class="chart-area"
                  opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="1.5s" begin="1.5s" fill="freeze" />
            </path>

            <!-- 增长曲线 -->
            <path d="M50,200 Q150,180 200,150 Q250,120 300,90 Q350,60 400,40 Q450,20 450,20"
                  class="chart-path"
                  stroke="var(--primary-color)"
                  stroke-width="4"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  filter="url(#chartGlowFilter)"
                  stroke-dasharray="600"
                  stroke-dashoffset="600">
              <animate attributeName="stroke-dashoffset" from="600" to="0" dur="2.5s" fill="freeze" />
            </path>

            <!-- 数据点 -->
            <circle cx="200" cy="150" r="6" fill="var(--primary-color)" class="chart-point point-1" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="1.2s" fill="freeze"/>
            </circle>
            <circle cx="300" cy="90" r="6" fill="var(--primary-color)" class="chart-point point-2" opacity="0">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2s" fill="freeze"/>
            </circle>
            <circle cx="400" cy="40" r="8" fill="var(--primary-color)" class="chart-point point-3" opacity="0" filter="url(#chartGlowFilter)">
              <animate attributeName="opacity" from="0" to="1" dur="0.4s" begin="2.5s" fill="freeze"/>
            </circle>

            <!-- X轴标签 -->
            <g class="x-axis-labels">
              <rect x="30" y="210" width="40" height="25" rx="4" class="axis-label" data-value="30" opacity="0.3"/>
              <text x="50" y="227" text-anchor="middle" fill="white" font-size="12" font-weight="500">30</text>

              <rect x="90" y="210" width="40" height="25" rx="4" class="axis-label" data-value="60" opacity="0.3"/>
              <text x="110" y="227" text-anchor="middle" fill="white" font-size="12" font-weight="500">60</text>

              <rect x="150" y="210" width="40" height="25" rx="4" class="axis-label" data-value="90" opacity="0.3"/>
              <text x="170" y="227" text-anchor="middle" fill="white" font-size="12" font-weight="500">90</text>

              <rect x="210" y="210" width="40" height="25" rx="4" class="axis-label axis-label-active" data-value="120" opacity="1" fill="var(--primary-color)"/>
              <text x="230" y="227" text-anchor="middle" fill="white" font-size="12" font-weight="600">120</text>
              <text x="230" y="253" text-anchor="middle" fill="white" font-size="13" opacity="0.85" class="axis-label-text">{{ t('partnerPage.invite120') }}</text>

              <rect x="270" y="210" width="40" height="25" rx="4" class="axis-label" data-value="150" opacity="0.3"/>
              <text x="290" y="227" text-anchor="middle" fill="white" font-size="12" font-weight="500">150</text>

              <rect x="330" y="210" width="40" height="25" rx="4" class="axis-label" data-value="180" opacity="0.3"/>
              <text x="350" y="227" text-anchor="middle" fill="white" font-size="12" font-weight="500">180</text>
            </g>
          </svg>

          <!-- 底部说明文字 -->
          <div class="chart-footer-note">
            <span>{{ t('partnerPage.note') }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- 3 Steps -->
  <section class="partner-hero" style="padding-top: 6rem;">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ t('partnerPage.stepTitle') }}</h2>
      </div>

      <div class="steps-container">
        <div class="step-item">
          <div class="step-icon">
            <FilePen />
          </div>
          <h3>{{ t('partnerPage.apply') }}</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem; max-width: 250px; margin-left: auto; margin-right: auto;" >{{ t('partnerPage.applyDesc') }}</p>
        </div>
        <div class="step-item">
          <div class="step-icon">
            <Share2 />
          </div>
          <h3>{{ t('partnerPage.share') }}</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem; max-width: 250px; margin-left: auto; margin-right: auto;">{{ t('partnerPage.shareDesc') }}</p>
        </div>
        <div class="step-item">
          <div class="step-icon">
            <Coins />
          </div>
          <h3>{{ t('partnerPage.benefit') }}</h3>
          <p style="color: var(--text-secondary); margin-top: 0.5rem; max-width: 250px; margin-left: auto; margin-right: auto;">{{ t('partnerPage.benefitDesc') }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Bottom CTA -->
  <section class="contact-section">
    <div class="container">
      <div class="contact-cta">
        <h2 style="font-size: 3rem; margin-bottom: 1rem;">{{ t('partnerPage.ctaTitle') }}</h2>
        <p style="margin-bottom: 2rem; max-width: 600px; margin-left: auto; margin-right: auto;">{{ t('partnerPage.ctaDesc') }}</p>
        <div class="contact-buttons">
          <a :href="PARTNER_URL" target="_blank" class="contact-primary-btn" style="text-decoration: none;">
            <span>{{ t('partnerPage.ctaApply') }}</span>
            <div class="btn-icon"><ArrowRight /></div>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="faq-section" id="faq">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ t('partnerPage.faqTitle') }}</h2>
      </div>

      <div class="faq-container">
        <div class="faq-item">
          <div class="faq-question">
            <span>{{ t('partnerPage.q1') }}</span>
            <div class="faq-icon">
              <ChevronDown />
            </div>
          </div>
          <div class="faq-answer">
            <p>{{ t('partnerPage.a1') }}</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>{{ t('partnerPage.q2') }}</span>
            <div class="faq-icon">
              <ChevronDown />
            </div>
          </div>
          <div class="faq-answer">
            <p>{{ t('partnerPage.a2') }}</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>{{ t('partnerPage.q3') }}</span>
            <div class="faq-icon">
              <ChevronDown />
            </div>
          </div>
          <div class="faq-answer">
            <p>{{ t('partnerPage.a3') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<style scoped>
.hero-partner {
  position: relative;
  padding: 10rem 0 7rem;
}

.about-section {
  padding: 8rem 0;
  position: relative;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 100%;
  background: transparent;
}

.section-header {
  text-align: center;
  max-width: 980px;
  margin: 0 auto 4rem;
}

.section-title {
  font-size: var(--font-size-h1);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: var(--line-height-tight);
  margin-bottom: 1.25rem;
  background: linear-gradient(90deg, #ffffff 0%, #cfcfcf 45%, #ffffff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.section-description {
  color: var(--text-secondary);
  font-size: var(--font-size-body);
  line-height: var(--line-height-relaxed);
}

.partner-hero-partner {
  padding-top: 10rem;
  padding-bottom: 2rem;
  min-height: auto;
  position: relative;
  overflow: visible;
}

/* Modern Gradient Background (Non-particle) */
.modern-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background:
      radial-gradient(circle at 15% 50%, rgba(71, 198, 143, 0.08) 0%, transparent 25%),
      radial-gradient(circle at 85% 30%, rgba(58, 110, 165, 0.05) 0%, transparent 25%);
  pointer-events: none;
}

/* hero-partner Layout - 左右排版 */
.hero-partner-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: start;
  position: relative;
  z-index: 1;
  padding-bottom: 2rem;
  padding-top: 2rem;
}

.hero-partner-content-left {
  text-align: left;
  display: flex;
  flex-direction: column;
}


.hero-partner-visual-right {
  position: sticky;
  top: 120px;
  height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 500px;
}

.hero-partner-decor {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.hero-partner-orb {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.35;
  transform: translateZ(0);
  animation: hero-partnerOrbFloat 12s ease-in-out infinite;
}

.hero-partner-orb.orb-1 {
  width: 520px;
  height: 520px;
  left: -160px;
  top: -180px;
  background: radial-gradient(circle at 30% 30%, rgba(71, 198, 143, 0.55), transparent 65%);
}

.hero-partner-orb.orb-2 {
  width: 460px;
  height: 460px;
  right: -180px;
  top: 80px;
  animation-delay: -4s;
  background: radial-gradient(circle at 30% 30%, rgba(56, 249, 215, 0.35), transparent 65%);
}

.hero-partner-orb.orb-3 {
  width: 420px;
  height: 420px;
  left: 50%;
  bottom: -220px;
  transform: translateX(-50%);
  animation-delay: -7s;
  background: radial-gradient(circle at 30% 30%, rgba(71, 198, 143, 0.35), transparent 65%);
}

@keyframes hero-partnerOrbFloat {
  0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
  50% { transform: translate3d(0, 18px, 0) scale(1.04); }
}

/* ==================== hero-partner 右侧图表效果 ==================== */

.hero-partner-chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-partner-chart-main {
  position: relative;
  width: 100%;
  max-width: 500px;
  height: 350px;
  z-index: 1;
}

.hero-partner-chart-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 0 30px rgba(71, 198, 143, 0.15));
}

.hero-partner-chart-line {
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* 图表标注框 */
.chart-annotation-box {
  position: absolute;
  background: linear-gradient(135deg, rgba(71, 198, 143, 0.12) 0%, rgba(71, 198, 143, 0.06) 100%);
  border: 1.5px solid rgba(71, 198, 143, 0.3);
  border-radius: 16px;
  padding: 1rem 1.25rem;
  backdrop-filter: blur(20px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(71, 198, 143, 0.15);
  display: flex;
  align-items: center;
  gap: 0.875rem;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  animation: annotationFloat 4s ease-in-out infinite;
}

.chart-annotation-box:hover {
  transform: translateY(-4px) scale(1.02);
  border-color: rgba(71, 198, 143, 0.5);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(71, 198, 143, 0.25);
}

.annotation-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(71, 198, 143, 0.2);
  border-radius: 10px;
  color: var(--primary-color);
  flex-shrink: 0;
}

.annotation-icon i {
  width: 22px;
  height: 22px;
  stroke-width: 2.5;
}

.annotation-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.annotation-value {
  font-size: var(--font-size-h2);
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #a5f3d1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.2;
}

.annotation-label {
  font-size: 0.875rem;
  color: var(--text-secondary);
  font-weight: 500;
  line-height: 1.2;
}

.chart-annotation-box.box-1 {
  top: 15%;
  left: 20%;
  animation-delay: 0s;
}

.chart-annotation-box.box-2 {
  top: 60%;
  right: 15%;
  animation-delay: 1.5s;
}

.chart-annotation-box.box-3 {
  bottom: 20%;
  left: 10%;
  animation-delay: 3s;
}

@keyframes annotationFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

/* 移除 hero-partner-badge 样式 */

.hero-partner-pills {
  display: flex;
  gap: 0.75rem;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0 0 2rem 0;
}

.hero-partner-pill {
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 0.9rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(255,255,255,0.03);
  color: rgba(255,255,255,0.78);
  font-size: var(--font-size-body);
  line-height: 1;
  backdrop-filter: blur(12px);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
}

.hero-partner-pill::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--gradient-1);
  box-shadow: 0 0 0 4px rgba(71, 198, 143, 0.12);
  margin-right: 0.6rem;
}

.hero-partner-title-large {
  font-size: var(--font-size-hero);
  line-height: 1.15;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  text-align: left;
}

.hero-partner-content-left .hero-partner-title-large {
  text-align: left;
}

.hero-partner-title-large span {
  display: inline-block;
  font-weight: 900;
}

.hero-partner-subtitle {
  font-size: var(--font-size-body-lg);
  color: var(--text-secondary);
  max-width: 100%;
  margin: 0 0 2rem 0;
  line-height: 1.7;
  text-align: left;
}

/* Stats Section */
.stats-section {
  padding: 1rem 0 3rem 0;
  position: relative;
  background: var(--primary-bg);
  margin-top: -2rem;
}

/* Stats Grid */
.partner-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  margin: 0;
}

.partner-stat-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%); /* Increased opacity */
  border: 1px solid rgba(71, 198, 143, 0.25);
  border-radius: 24px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
}

.partner-stat-card:hover {
  transform: translateY(-5px);
  border-color: rgba(71, 198, 143, 0.4);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(71, 198, 143, 0.2);
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
}

.stat-number-wrapper {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.25rem;
  margin-bottom: 0.5rem;
}

.partner-stat-card .stat-number {
  font-size: var(--font-size-h1);
  font-weight: 800;
  background: linear-gradient(135deg, #fff 30%, #a5f3d1 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -0.03em;
}

.stat-suffix {
  font-size: var(--font-size-h2);
  font-weight: 700;
  color: var(--primary-color);
}

.p-stat-label {
  color: #888;
  font-size: var(--font-size-body);
  font-weight: 500;
  letter-spacing: 0.01em;
}

/* Benefits Grid */
.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
}

.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 24px;
  padding: 2.5rem 2rem;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.benefits-grid .feature-card {
  padding: 2.5rem 2rem;
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); /* Increased opacity */
  border: 1px solid rgba(71, 198, 143, 0.2);
  box-shadow: 0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  background: var(--secondary-bg)
}

.benefits-grid .feature-card:hover {
  border-color: rgba(71, 198, 143, 0.4);
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(71, 198, 143, 0.2);
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
  background: var(--secondary-bg)
}

.feature-icon-wrapper {
  position: relative;
  width: fit-content;
  margin-bottom: 1.5rem;
}

.feature-icon {
  font-size: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.feature-icon i {
  width: 56px;
  height: 56px;
  color: var(--primary-color);
  stroke-width: 1.5;
}

.feature-card:hover .feature-icon {
  transform: scale(1.2) rotate(10deg);
}

.feature-card h3 {
  font-size: var(--font-size-h3);
  margin-bottom: 0.5rem;
  font-weight: 700;
  position: relative;
  z-index: 2;
  letter-spacing: -0.02em;
  line-height: 1.3;
}

.feature-card p {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  position: relative;
  z-index: 2;
  font-size: var(--font-size-small);
  font-weight: 400;
  margin-top: 0.5rem;
  color: #888;
}

/* Community Section */
.community-section {
  padding: 8rem 0;
  position: relative;
}

.products-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 3rem;
}

.community-card {
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); /* Increased opacity */
  border-radius: 24px;
  padding: 2.5rem;
  border: 1px solid rgba(71, 198, 143, 0.2);
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  background: var(--secondary-bg)
}

.community-card:hover {
  transform: translateY(-5px);
  border-color: rgba(71, 198, 143, 0.4);
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(71, 198, 143, 0.2);
  background: var(--secondary-bg)
}

.community-user {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
}

.user-avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--gradient-1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-h3);
  font-weight: bold;
  color: #000;
}

.user-avatar.avatar-1 { background: linear-gradient(135deg, #7C3AED, #22C55E); }
.user-avatar.avatar-2 { background: linear-gradient(135deg, #06B6D4, #3B82F6); }
.user-avatar.avatar-3 { background: linear-gradient(135deg, #F59E0B, #EF4444); }

.user-info {
  min-width: 0;
}

.user-name {
  font-size: var(--font-size-body-lg);
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.user-role {
  margin-top: 0.25rem;
  color: rgba(255,255,255,0.6);
  font-size: var(--font-size-small);
  line-height: 1.2;
}

.community-cta-box {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 4rem;
}

.community-title {
  font-size: var(--font-size-h1);
  font-weight: 800;
  margin-bottom: 1.5rem;
  line-height: var(--line-height-tight);
}

.community-desc {
  font-size: var(--font-size-body);
  color: var(--text-secondary);
  line-height: 1.6;
}

/* Why Choose Section */
.why-choose-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6rem;
  align-items: center;
}

.product-features {
  list-style: none;
  margin-bottom: 3rem;
  position: relative;
  z-index: 2;
}

.product-features li {
  color: var(--text-secondary);
  padding: 1rem 0;
  padding-left: 2rem;
  position: relative;
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-h3);
  margin-bottom: 1.5rem;
  transition: all 0.3s ease;
  font-weight: 400;
}

.product-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 1.25rem;
}

.chart-container {
  background: linear-gradient(180deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%); /* Increased opacity */
  border: 1px solid rgba(71, 198, 143, 0.2);
  border-radius: 24px;
  padding: 2.5rem 3rem 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: default;
  overflow: visible;
}

.chart-container::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, rgba(71, 198, 143, 0.05) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.chart-container:hover {
  transform: translateY(-8px) scale(1.02);
  border-color: rgba(71, 198, 143, 0.4);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(71, 198, 143, 0.2);
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
}

.chart-container:hover::before {
  opacity: 1;
}

.chart-container:hover .chart-path {
  stroke-width: 5;
  filter: drop-shadow(0 0 15px rgba(71, 198, 143, 0.6));
}

.chart-container:hover .chart-point {
  r: 10;
  filter: drop-shadow(0 0 10px rgba(71, 198, 143, 0.8));
}

.chart-line-mockup {
  width: 100%;
  height: 240px;
  position: relative;
  transition: transform 0.5s ease;
  z-index: 1;
  flex-shrink: 0;
}

.chart-container:hover .chart-line-mockup {
  transform: scale(1.05);
}

.chart-path {
  stroke: var(--primary-color);
  stroke-width: 4;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
  filter: drop-shadow(0 0 10px rgba(71, 198, 143, 0.5));
}

.chart-area {
  transition: opacity 0.5s ease;
}

.chart-point {
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

.chart-point:hover {
  r: 12;
  filter: drop-shadow(0 0 15px rgba(71, 198, 143, 1));
  transform-origin: center;
}

.chart-point.point-3 {
  animation: pulsePoint 2s ease-in-out infinite;
  animation-delay: 2.5s;
}

@keyframes pulsePoint {
  0%, 100% {
    r: 8;
    opacity: 1;
  }
  50% {
    r: 12;
    opacity: 0.8;
  }
}

/* X轴标签交互 */
.x-axis-labels {
  cursor: pointer;
}

.axis-label {
  fill: rgba(255, 255, 255, 0.1);
  stroke: rgba(255, 255, 255, 0.2);
  stroke-width: 1;
  transition: all 0.3s ease;
}

.axis-label:hover {
  fill: rgba(71, 198, 143, 0.3);
  stroke: var(--primary-color);
  stroke-width: 2;
  transform: translateY(-2px);
}

.axis-label-active {
  fill: var(--primary-color) !important;
  stroke: var(--primary-color) !important;
  stroke-width: 2 !important;
  animation: highlightLabel 2s ease-in-out infinite;
}

@keyframes highlightLabel {
  0%, 100% {
    opacity: 1;
    filter: drop-shadow(0 0 5px rgba(71, 198, 143, 0.5));
  }
  50% {
    opacity: 0.9;
    filter: drop-shadow(0 0 10px rgba(71, 198, 143, 0.8));
  }
}

/* 标注框样式 - 移到图表上方 */
.floating-badge {
  position: absolute;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.98) 0%, rgba(255, 200, 0, 0.95) 100%);
  color: #000;
  padding: 0.875rem 1.25rem;
  border-radius: 14px;
  font-weight: 700;
  top: 1.5rem;
  right: 2rem;
  box-shadow: 0 12px 35px rgba(255, 215, 0, 0.35), 0 0 20px rgba(255, 215, 0, 0.25);
  animation: floatBadge 4s infinite ease-in-out;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 215, 0, 0.6);
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  z-index: 15;
  min-width: 150px;
}

.chart-container:hover .floating-badge {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 18px 45px rgba(255, 215, 0, 0.4), 0 0 25px rgba(255, 215, 0, 0.3);
  border-color: rgba(255, 215, 0, 0.8);
}

.badge-label {
  display: block;
  font-size: var(--font-size-xs);
  margin-bottom: 0.5rem;
  opacity: 0.9;
  font-weight: 600;
}

.badge-value {
  display: flex;
  align-items: baseline;
  gap: 0.2rem;
  font-size: var(--font-size-h3);
  font-weight: 800;
  line-height: var(--line-height-tight);
}

.currency {
  font-size: 1.3rem;
}

.income-number {
  font-size: var(--font-size-h2);
  font-weight: 900;
  letter-spacing: -0.02em;
}

.currency-unit {
  font-size: var(--font-size-body);
  font-weight: 600;
  opacity: 0.9;
}

@keyframes floatBadge {
  0%, 100% {
    transform: translateY(0) rotate(-0.5deg);
  }
  50% {
    transform: translateY(-8px) rotate(0.5deg);
  }
}

/* 底部说明文字 */
.chart-footer-note {
  align-self: flex-end;
  margin-top: 0.5rem;
  font-size: var(--font-size-xs);
  color: var(--text-tertiary);
  opacity: 0.7;
  font-style: italic;
  z-index: 2;
  white-space: nowrap;
}

/* X轴标签文字优化 */
.axis-label-text {
  pointer-events: none;
}

/* 列表项交互动画 */
.product-features li {
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  cursor: default;
}

.product-features li::before {
  transition: all 0.4s ease;
}

.product-features li:hover {
  color: var(--text-primary);
  transform: translateX(8px);
  padding-left: 2.5rem;
}

.product-features li:hover::before {
  background: var(--primary-color);
  box-shadow: 0 0 15px rgba(71, 198, 143, 0.5);
  transform: scale(1.2);
}

/* Steps Section */
.steps-container {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin-top: 5rem;
  gap: 2rem;
}

.steps-container::before {
  content: '';
  position: absolute;
  top: 40px;
  left: 100px;
  right: 100px;
  height: 1px;
  background: linear-gradient(90deg,
  transparent 0%,
  rgba(71, 198, 143, 0.3) 20%,
  rgba(71, 198, 143, 0.3) 80%,
  transparent 100%
  );
  z-index: 0;
}

.step-item {
  text-align: center;
  position: relative;
  z-index: 1;
  flex: 1;
}

.step-icon {
  width: 80px;
  height: 80px;
  background: #0f0f0f;
  border: 1px solid rgba(71, 198, 143, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: var(--font-size-h2);
  color: var(--primary-color);
  box-shadow: 0 0 30px rgba(71, 198, 143, 0.1);
  transition: all 0.3s ease;
}

.step-item:hover .step-icon {
  transform: scale(1.1);
  border-color: var(--primary-color);
  box-shadow: 0 0 40px rgba(71, 198, 143, 0.2);
}

/* Contact Section */
.contact-section {
  padding: 8rem 0 6rem;
}

.contact-content {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.contact-cta {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.contact-cta h2 {
  font-size: var(--font-size-h1);
  font-weight: 900;
  margin-bottom: 1.5rem;
  letter-spacing: -0.03em;
  line-height: var(--line-height-tight);
}

.contact-cta > p {
  color: var(--text-secondary);
  font-size: var(--font-size-body-lg);
  margin-bottom: 3rem;
  line-height: 1.8;
  font-weight: 400;
}

.contact-buttons {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
}

.primary-button {
  background: var(--gradient-1);
  color: #000;
  padding: 1.25rem 3rem;
  border-radius: 18px;
  font-size: var(--font-size-body-lg);
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 30px rgba(71, 198, 143, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.primary-button:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 40px rgba(71, 198, 143, 0.4);
}

.button-glow {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
  transition: 0.5s;
  animation: btn-glow 3s infinite;
}

@keyframes btn-glow {
  0% { left: -100%; }
  50%, 100% { left: 100%; }
}

.contact-primary-btn {
  background: var(--primary-color);
  color: #000;
  padding: 1.25rem 3.5rem;
  border-radius: 16px;
  font-size: var(--font-size-body-lg);
  font-weight: 800;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 8px 25px rgba(71, 198, 143, 0.25);
}

.contact-primary-btn:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 35px rgba(71, 198, 143, 0.35);
}

.btn-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-icon svg {
  width: 20px;
  height: 20px;
  stroke-width: 2.5;
}

/* FAQ */
.faq-section {
  padding: 10rem 0;
}

.faq-section .section-header {
  margin-bottom: 2.75rem;
}

.faq-section .section-title {
  font-size: var(--font-size-h1);
  margin-bottom: 0;
}

.faq-container {
  max-width: 900px;
  margin: 2.75rem auto 0;
}

.faq-item {
  background: linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 100%);
  border: 1px solid rgba(71, 198, 143, 0.15);
  border-radius: 20px;
  margin-bottom: 1.5rem;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1);
}

.faq-item:hover {
  border-color: rgba(71, 198, 143, 0.4);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(71, 198, 143, 0.2);
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
}

.faq-item.active {
  border-color: rgba(71, 198, 143, 0.5);
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(71, 198, 143, 0.25);
  background: linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%);
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 2.5rem;
  color: var(--text-primary);
  font-size: var(--font-size-h3);
  font-weight: 600;
  user-select: none;
  background: var(--secondary-bg)
}

.faq-question:hover {
  color: var(--primary-color);
}

.faq-icon {
  width: 24px;
  height: 24px;
  color: var(--primary-color);
  transition: transform 0.3s ease;
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-item.active .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease, padding 0.4s ease;
  padding: 0 2.5rem;
  background: var(--secondary-bg)
}

.faq-item.active .faq-answer {
  max-height: 500px;
  padding: 0 2.5rem 2rem 2.5rem;
}

.faq-answer p {
  color: var(--text-secondary);
  font-size: var(--font-size-body);
  line-height: 1.8;
  margin: 0;
}

/* Responsive */
@media (max-width: 1200px) {
  .hero-partner-layout {
    gap: 4rem;
  }

  .hero-partner-visual-right {
    height: 500px;
    min-height: 450px;
    position: relative;
    top: auto;
  }
  .hero-partner-chart-main {
    max-width: 450px;
    height: 320px;
  }
  .chart-annotation-box {
    padding: 0.875rem 1rem;
  }
  .annotation-value {
    font-size: var(--font-size-h3);
  }
  .partner-stats-grid, .benefits-grid {
    gap: 1rem;
  }
  .features-grid, .products-container {
    grid-template-columns: repeat(2, 1fr);
  }
  .footer-links {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
}

@media (max-width: 1024px) {
  .hero-partner-layout {
    grid-template-columns: 1fr;
    gap: 4rem;
    text-align: center;
  }
  .hero-partner-content-left {
    text-align: center;
    order: 1;
  }
  .hero-partner-content-left .hero-partner-title-large {
    text-align: center;
  }
  .hero-partner-subtitle {
    text-align: center;
    margin: 0 auto 2rem;
  }
  .hero-partner-pills {
    justify-content: center;
  }
  .hero-partner-visual-right {
    order: 2;
    height: 400px;
    min-height: 380px;
    position: relative;
    top: auto;
  }
  .hero-partner-chart-main {
    max-width: 400px;
    height: 300px;
  }
  .chart-annotation-box {
    padding: 0.75rem 0.875rem;
  }
  .annotation-value {
    font-size: 1.25rem;
  }
  .annotation-label {
    font-size: 0.8rem;
  }
  .annotation-icon {
    width: 36px;
    height: 36px;
  }
  .annotation-icon svg {
    width: 20px;
    height: 20px;
  }
  .stats-section {
    padding: 3rem 0;
  }

  .partner-stats-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }
  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .why-choose-layout {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}


@media (max-width: 768px) {
  .container {
    padding: 0 1.5rem;
  }

  .nav-links {
    display: none;
  }

  .nav-right {
    gap: 1rem;
  }

  .language-dropdown {
    right: -10px;
  }

  .features-grid,
  .products-container {
    grid-template-columns: 1fr;
  }

  .footer-links {
    grid-template-columns: 1fr;
  }

  .footer-content {
    flex-direction: column;
    gap: 2rem;
    text-align: center;
  }

  .hero-partner-layout {
    gap: 3rem;
  }

  .partner-hero-partner {
    padding-top: 8rem;
  }





  .hero-partner-visual-right {
    height: 350px;
    min-height: 320px;
    position: relative;
    top: auto;
  }

  .hero-partner-chart-main {
    max-width: 100%;
    height: 280px;
  }

  .chart-annotation-box {
    padding: 0.625rem 0.75rem;
  }

  .chart-annotation-box.box-1 {
    top: 10%;
    left: 5%;
  }

  .chart-annotation-box.box-2 {
    top: 55%;
    right: 5%;
  }

  .chart-annotation-box.box-3 {
    bottom: 15%;
    left: 5%;
  }

  .annotation-value {
    font-size: var(--font-size-body-lg);
  }

  .annotation-label {
    font-size: var(--font-size-xs);
  }

  .annotation-icon {
    width: 32px;
    height: 32px;
  }

  .annotation-icon svg {
    width: 18px;
    height: 18px;
  }



  .hero-partner-pills {
    gap: 0.5rem;
    margin-bottom: 1.25rem;
  }

  .hero-partner-pill {
    font-size: var(--font-size-small);
    padding: 0.5rem 0.8rem;
  }

  .stats-section {
    padding: 2.5rem 0;
  }

  .partner-stats-grid {
    grid-template-columns: 1fr;
  }

  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .steps-container {
    flex-direction: column;
    gap: 3rem;
  }

  .steps-container::before {
    display: none;
  }

  .chart-container {
    padding: 2rem 1.5rem 1.5rem;
    background: var(--secondary-bg)
  }

  .chart-line-mockup {
    height: 200px;
  }

  .floating-badge {
    top: 1rem;
    right: 1.5rem;
    padding: 0.75rem 1rem;
    min-width: 130px;
  }

  .badge-value {
    font-size: 1.35rem;
  }

  .income-number {
    font-size: 1.5rem;
  }

  .currency {
    font-size: 1.2rem;
  }

  .currency-unit {
    font-size: 1rem;
  }

  .chart-footer-note {
    margin-top: 0.25rem;
    font-size: var(--font-size-xs);
  }
  .primary-button,
  .contact-primary-btn {
    padding: 1rem 2rem;
    width: 100%;
    justify-content: center;
    max-width: 320px;
    margin: 0 auto;
  }
}
</style>
