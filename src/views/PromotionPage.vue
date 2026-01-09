<script setup lang="ts">
import { useHead } from "@unhead/vue";
import { useI18n } from "vue-i18n";
import { CreditCard, Percent, ArrowRight, Check, Zap, Shield, Users } from "lucide-vue-next";
import WebContent6 from "@/components/WebContent6.vue";

const { locale, t } = useI18n()

const PROMO_URL = 'https://uupay.cc/zh-cn/register?invitationCode=VJAIIG'

useHead(() => ({
  title: t('promotion.metaTitle'),
  meta: [
    {
      name: 'description',
      content: t('promotion.metaDescription'),
    },
  ],
  htmlAttrs: {
    lang: locale.value,
  }
}))

const goToPromo = () => {
  window.open(PROMO_URL, '_blank')
}
</script>

<template>
  <!-- Hero Section -->
  <section class="hero-section">
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="pulse-dot"></span>
          {{ t('promotion.badge') }}
        </div>
        
        <h1 class="hero-title">
          {{ t('promotion.titleLine1') }}<br />
          <span class="text-gradient">{{ t('promotion.titleLine2') }}</span>
        </h1>
        
        <p class="hero-subtitle">
          {{ t('promotion.subtitle') }}
        </p>
        
        <!-- Small Explanatory Text -->
        <p class="hero-small-text">
          {{ t('promotion.heroNote') }}
        </p>
        
        <div class="hero-benefits-row">
          <div class="benefit-pill highlight">
            <div class="pill-icon-wrapper"><Check class="pill-icon" /></div>
            <div class="pill-text">
              <span class="pill-label">{{ t('promotion.freeCardTitle') }}</span>
              <span class="pill-value">0 USDT</span>
            </div>
          </div>
          <div class="benefit-pill highlight">
            <div class="pill-icon-wrapper"><Check class="pill-icon" /></div>
            <div class="pill-text">
              <span class="pill-label">{{ t('promotion.freeTopupTitle') }}</span>
              <span class="pill-value">0%</span>
            </div>
          </div>
        </div>

        <a @click="goToPromo" class="hero-cta">
          {{ t('promotion.ctaButton') }}
          <ArrowRight class="cta-icon" />
        </a>
      </div>
    </div>
    
    <!-- Abstract Background Elements -->
    <div class="hero-bg-glow"></div>
  </section>

  <!-- Pricing Cards -->
  <section class="pricing-section">
    <div class="container">
      <p class="section-eyebrow">{{ t('promotion.pricingEyebrow') }}</p>
      <h2 class="section-title">{{ t('promotion.pricingTitle') }}</h2>
      
      <div class="pricing-grid">
        <!-- Card 1: Free Card (Now Featured) -->
        <div class="pricing-card featured">
          <div class="featured-badge">{{ t('promotion.tagLimited') }}</div>
          <div class="card-header">
            <CreditCard class="card-icon" />
            <h3 class="card-name">{{ t('promotion.card1Title') }}</h3>
          </div>
          <div class="card-price">
            <span class="price-old">10 USDT</span>
            <span class="price-current">
              <span class="price-num">0</span>
              <span class="price-unit">USDT</span>
            </span>
          </div>
          <p class="card-description">{{ t('promotion.card1Desc') }}</p>
          <ul class="card-features">
            <li><Check class="check-icon" /> {{ t('promotion.card1Feature1') }}</li>
            <li><Check class="check-icon" /> {{ t('promotion.card1Feature2') }}</li>
            <li><Check class="check-icon" /> {{ t('promotion.card1Feature3') }}</li>
          </ul>
          <a @click="goToPromo" class="card-button primary">{{ t('promotion.card1Cta') }}</a>
        </div>

        <!-- Card 2: Free Topup (Featured) -->
        <div class="pricing-card featured">
          <div class="featured-badge">{{ t('promotion.tagRecommend') }}</div>
          <div class="card-header">
            <Percent class="card-icon" />
            <h3 class="card-name">{{ t('promotion.card2Title') }}</h3>
          </div>
          <div class="card-price">
            <span class="price-old">1%</span>
            <span class="price-current">
                <span class="price-num">0</span>
                <span class="price-unit">%</span>
            </span>
          </div>
          <p class="card-description">{{ t('promotion.card2Desc') }}</p>
          <ul class="card-features">
            <li><Check class="check-icon" /> {{ t('promotion.card2Feature1') }}</li>
            <li><Check class="check-icon" /> {{ t('promotion.card2Feature2') }}</li>
            <li><Check class="check-icon" /> {{ t('promotion.card2Feature3') }}</li>
          </ul>
          <a @click="goToPromo" class="card-button primary">{{ t('promotion.card2Cta') }}</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonial Quote -->
  <section class="quote-section">
    <div class="container">
      <div class="quote-content">
        <div class="quote-mark">"</div>
        <blockquote class="quote-text">
          {{ t('promotion.quoteText') }}
        </blockquote>
        <div class="quote-author">
          <div class="author-avatar">
            <Users class="avatar-icon" />
          </div>
          <div class="author-info">
            <p class="author-name">{{ t('promotion.authorName') }}</p>
            <p class="author-title">{{ t('promotion.authorTitle') }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Grid -->
  <section class="features-section">
    <div class="container">
      <p class="section-eyebrow">{{ t('promotion.whyEyebrow') }}</p>
      <h2 class="section-title">{{ t('promotion.whyTitle') }}</h2>
      
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">
            <Zap />
          </div>
          <h3 class="feature-title">{{ t('promotion.why1Title') }}</h3>
          <p class="feature-desc">{{ t('promotion.why1Desc') }}</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <Shield />
          </div>
          <h3 class="feature-title">{{ t('promotion.why2Title') }}</h3>
          <p class="feature-desc">{{ t('promotion.why2Desc') }}</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <CreditCard />
          </div>
          <h3 class="feature-title">{{ t('promotion.why3Title') }}</h3>
          <p class="feature-desc">{{ t('promotion.why3Desc') }}</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">
            <Users />
          </div>
          <h3 class="feature-title">{{ t('promotion.why4Title') }}</h3>
          <p class="feature-desc">{{ t('promotion.why4Desc') }}</p>
        </div>
      </div>
    </div>
  </section>

  <WebContent6 />
</template>

<style scoped>
/* Base Styles */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Hero Section */
.hero-section {
  padding: 10rem 0 8rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  /* Deep tech background */
  background: radial-gradient(circle at 50% 30%, rgba(71, 198, 143, 0.08), transparent 60%),
              radial-gradient(circle at 10% 20%, rgba(71, 198, 143, 0.05), transparent 40%);
}

.hero-bg-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(71, 198, 143, 0.03) 0%, transparent 60%);
  z-index: -1;
  pointer-events: none;
}

.hero-content {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 10;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0.5rem 1rem;
  background: rgba(71, 198, 143, 0.1);
  border: 1px solid rgba(71, 198, 143, 0.2);
  border-radius: 100px;
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
}

.pulse-dot {
  width: 6px;
  height: 6px;
  background: var(--primary-color);
  border-radius: 50%;
  box-shadow: 0 0 8px var(--primary-color);
  animation: pulse 1.5s infinite;
}

.hero-title {
  font-size: var(--font-size-hero);
  font-weight: 800;
  line-height: var(--line-height-tight);
  margin-bottom: 1.5rem;
  color: #fff;
  letter-spacing: -0.02em;
}

.text-gradient {
  background: linear-gradient(135deg, #fff 0%, var(--primary-color) 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 40px rgba(71, 198, 143, 0.4);
}

.hero-subtitle {
  font-size: var(--font-size-body-lg);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: 4rem;
  max-width: 700px;
}

.hero-subtitle strong {
  color: #fff;
  font-weight: 600;
}

.hero-small-text {
  font-size: var(--font-size-small);
  color: #999;
  margin-top: -3rem;
  margin-bottom: 3rem;
  max-width: 600px;
  line-height: var(--line-height-normal);
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px dashed rgba(255, 255, 255, 0.1);
}

/* New Benefit Pills */
.hero-benefits-row {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
}

.benefit-pill {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;
}

.benefit-pill.highlight {
  background: rgba(71, 198, 143, 0.1);
  border-color: rgba(71, 198, 143, 0.2);
  box-shadow: 0 0 20px rgba(71, 198, 143, 0.1);
}

.pill-icon-wrapper {
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.highlight .pill-icon-wrapper {
  background: var(--primary-color);
  color: #000;
}

.pill-icon {
  width: 16px;
  height: 16px;
}

.pill-text {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  line-height: 1.2;
}

.pill-label {
  font-size: 0.75rem;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.pill-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
}

.highlight .pill-value {
  color: var(--primary-color);
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem 3.5rem;
  background: var(--primary-color);
  color: #000 !important;
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 0 20px rgba(71, 198, 143, 0.4);
}

.hero-cta:hover {
  background: #5ed9a0;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 0 40px rgba(71, 198, 143, 0.6);
}

.cta-icon {
  width: 20px;
  height: 20px;
}

/* Pricing Section */
.pricing-section {
  padding: 6rem 0;
  position: relative;
}

.section-eyebrow {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-secondary);
  text-align: center;
  margin-bottom: 0.75rem;
}

.section-title {
  font-size: var(--font-size-h1);
  font-weight: 800;
  text-align: center;
  margin-bottom: 4rem;
  color: #fff;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Changed to 2 columns */
  gap: 2rem;
  max-width: 900px; /* Limit width for 2 cards */
  margin: 0 auto;
}

.pricing-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px; /* More rounded */
  padding: 3rem;
  position: relative;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.pricing-card:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.pricing-card.featured {
  background: linear-gradient(180deg, rgba(71, 198, 143, 0.08) 0%, rgba(71, 198, 143, 0.02) 100%);
  border-color: rgba(71, 198, 143, 0.3);
}

.pricing-card.featured:hover {
  border-color: var(--primary-color);
  box-shadow: 0 20px 40px rgba(71, 198, 143, 0.1);
}

.featured-badge {
  position: absolute;
  top: -14px;
  left: 50%;
  transform: translateX(-50%);
  background: var(--primary-color);
  color: #000;
  font-size: 0.75rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.35rem 1.25rem;
  border-radius: 100px;
  box-shadow: 0 4px 12px rgba(71, 198, 143, 0.4);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.card-icon {
  width: 32px;
  height: 32px;
  color: var(--primary-color);
}

.card-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.card-price {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.price-old {
  font-size: 1.5rem;
  color: #666;
  text-decoration: line-through;
  font-weight: 500;
}

.price-current {
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
  display: flex;
  align-items: baseline;
  gap: 0.25rem;
}

.price-num {
    line-height: 1;
}

.price-unit {
    font-size: 1.5rem;
    font-weight: 700;
    opacity: 0.8;
}

.featured .price-current {
  color: var(--primary-color);
  text-shadow: 0 0 20px rgba(71, 198, 143, 0.3);
}

.card-description {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.card-features {
  list-style: none;
  padding: 0;
  margin: 0 0 2.5rem;
}

.card-features li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e5e5e5;
  font-size: 1rem;
  margin-bottom: 1rem;
}

.check-icon {
  width: 18px;
  height: 18px;
  color: var(--primary-color);
}

.card-button {
  display: block;
  width: 100%;
  padding: 1rem;
  text-align: center;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.08);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.card-button:hover {
  background: rgba(255, 255, 255, 0.15);
}

.card-button.primary {
  background: var(--primary-color);
  color: #000;
  border: none;
}

.card-button.primary:hover {
  background: #5ed9a0;
  box-shadow: 0 0 20px rgba(71, 198, 143, 0.4);
}

/* Quote Section */
.quote-section {
  padding: 8rem 0;
}

.quote-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.quote-mark {
  font-size: 8rem;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 0.5;
  margin-bottom: 1rem;
  opacity: 0.2;
  font-family: serif;
}

.quote-text {
  font-size: 1.75rem;
  font-weight: 500;
  line-height: 1.5;
  color: #fff;
  margin-bottom: 3rem;
  letter-spacing: -0.01em;
}

.quote-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.25rem;
}

.author-avatar {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, rgba(71, 198, 143, 0.2), rgba(71, 198, 143, 0.05));
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  border: 1px solid rgba(71, 198, 143, 0.2);
}

.avatar-icon {
  width: 28px;
  height: 28px;
}

.author-info {
  text-align: left;
}

.author-name {
  font-weight: 700;
  color: #fff;
  margin: 0;
  font-size: 1.125rem;
}

.author-title {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

/* Features Section */
.features-section {
  padding: 8rem 0;
  background: rgba(255, 255, 255, 0.01);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  border-color: rgba(71, 198, 143, 0.3);
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.04);
}

.feature-icon {
  width: 56px;
  height: 56px;
  background: rgba(71, 198, 143, 0.08);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
}

.feature-icon svg {
  width: 28px;
  height: 28px;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.feature-desc {
  font-size: 0.95rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}



/* Final CTA */
.final-cta-section {
  padding: 10rem 0;
  text-align: center;
}

.cta-title {
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 1.5rem;
}

.cta-subtitle {
  font-size: 1.25rem;
  color: var(--text-secondary);
  margin-bottom: 3rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 3rem;
  background: var(--primary-color);
  color: #000;
  font-weight: 700;
  font-size: 1.125rem;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: #5ed9a0;
  transform: translateY(-2px);
  box-shadow: 0 0 30px rgba(71, 198, 143, 0.4);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 3.5rem;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  

}

@media (max-width: 768px) {
  .hero-section {
    padding: 5rem 0 4rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }
  
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 400px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .price-current {
    font-size: 2.75rem;
  }

  .price-unit {
    font-size: 1.25rem;
  }

  .pricing-card {
    padding: 2.5rem 1.5rem;
  }



  .quote-mark {
    font-size: 5rem;
  }
}
</style>
