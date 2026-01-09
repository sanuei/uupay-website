<script setup lang="ts">
import {CreditCard, Smartphone, Star, Wallet} from "lucide-vue-next"; // ArrowRight暂时隐藏
import {useI18n} from "vue-i18n";

const { t } = useI18n()
</script>

<template>
  <section id="features" class="products-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{t('completeFin')}}</span>
        <h2 class="section-title">{{t('completeFinPurpose')}}</h2>
      </div>

      <div class="products-container">
        <div class="product-card" data-tilt>
          <div class="product-glow"></div>
          <div class="product-number">01</div>
          <div class="product-header">
            <div class="product-icon-wrapper">
              <div class="product-icon">
                <Wallet />
              </div>
            </div>
            <h3>{{t('functionWallet')}}</h3>
          </div>
          <ul class="product-features">
            <li>{{t('funcWalletOne')}}</li>
            <li>{{t('funcWalletTwo')}}</li>
            <li>{{t('funcWalletThree')}}</li>
          </ul>
<!--          <button class="product-btn">-->
<!--            <span>{{t('learnMore')}}</span>-->
<!--            <ArrowRight class="btn-icon" />-->
<!--          </button>-->
          <div class="product-overlay"></div>
        </div>

        <div class="product-card highlight" data-tilt>
          <div class="product-glow"></div>
          <div class="product-number">02</div>
          <div class="product-header">
            <div class="product-icon-wrapper">
              <div class="product-icon">
                <Smartphone />
              </div>
            </div>
            <h3>{{t('visualCard')}}</h3>
            <div class="highlight-badge">
              <Star class="badge-icon-small" />
              <span>{{t('recommend')}}</span>
            </div>
          </div>
          <ul class="product-features">
            <li>{{t('visualCardOne')}}</li>
            <li>{{t('visualCardTwo')}}</li>
            <li>{{t('visualCardThree')}}</li>
          </ul>
<!--          <button class="product-btn">-->
<!--            <span>{{t('learnMore')}}</span>-->
<!--            <ArrowRight class="btn-icon" />-->
<!--          </button>-->
          <div class="product-overlay"></div>
        </div>

        <div class="product-card" data-tilt>
          <div class="product-glow"></div>
          <div class="product-number">03</div>
          <div class="product-header">
            <div class="product-icon-wrapper">
              <div class="product-icon">
                <CreditCard />
              </div>
            </div>
            <h3>{{t('phyCard')}}</h3>
          </div>
          <ul class="product-features">
            <li>{{t('phyCardOne')}}</li>
            <li>{{t('phyCardTwo')}}</li>
            <li>{{t('phyCardThree')}}</li>
          </ul>
<!--          <button class="product-btn">-->
<!--            <span>{{t('learnMore')}}</span>-->
<!--            <ArrowRight class="btn-icon" />-->
<!--          </button>-->
          <div class="product-overlay"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.products-section {
    padding: 10rem 0;
    position: relative;
    overflow: hidden;
}

.products-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
    margin-top: 5rem;
}

.product-card {
    position: relative;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 30px;
    padding: 4rem 3.5rem;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
    cursor: pointer;
}

.product-glow {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
}

.product-card:hover .product-glow {
    opacity: 1;
    animation: rotate 10s linear infinite;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.product-number {
    position: absolute;
    top: 2.5rem;
    right: 2.5rem;
    font-size: 5.5rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.03);
    line-height: 1;
    transition: all 0.5s ease;
    letter-spacing: -0.05em;
}

.product-card:hover .product-number {
    color: rgba(71, 198, 143, 0.1);
    transform: scale(1.2);
}

.product-card.highlight {
    border: 2px solid var(--primary-color);
    background: linear-gradient(135deg, rgba(71, 198, 143, 0.05) 0%, rgba(58, 174, 122, 0.02) 100%);
}

.highlight-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    background: var(--gradient-1);
    color: #000000;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
    box-shadow: 0 4px 15px var(--primary-glow);
    letter-spacing: 0.02em;
    margin-top: 0.75rem;
}

.badge-icon-small {
    width: 14px;
    height: 14px;
    stroke-width: 2.5;
}

.product-card:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6), 0 0 100px rgba(71, 198, 143, 0.3);
    border-color: var(--primary-color);
}

.product-header {
    margin-bottom: 3rem;
    position: relative;
    z-index: 2;
}

.product-icon svg {
    width: 56px;
    height: 56px;
    color: var(--primary-color);
    stroke-width: 1.5;
}

.product-card h3 {
    font-size: 1.875rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 2;
    line-height: 1.3;
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
    line-height: 1.75;
    font-size: 1rem;
    transition: all 0.3s ease;
}

.product-features li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--primary-color);
    font-weight: bold;
    font-size: 1.25rem;
}

.product-card:hover .product-features li {
    color: var(--text-primary);
    padding-left: 2.5rem;
}

.product-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-1);
    opacity: 0;
    transition: opacity 0.5s ease;
    pointer-events: none;
    mix-blend-mode: overlay;
}

@media (max-width: 768px) {
    .products-container { grid-template-columns: 1fr; gap: 1.5rem; margin-top: 3rem; }

    .product-card {
        padding: 2.5rem 2rem;
        border-radius: 24px;
    }

    .product-header {
        margin-bottom: 2rem;
    }

    .product-icon svg {
        width: 44px;
        height: 44px;
    }

    .product-card h3 {
        font-size: var(--font-size-h3);
        margin-bottom: 1rem;
    }

    .product-number {
        font-size: 4rem;
        top: 1.5rem;
        right: 1.5rem;
    }

    .product-features {
        margin-bottom: 1.5rem;
    }

    .product-features li {
        padding: 0.75rem 0;
        padding-left: 1.75rem;
        font-size: 0.9375rem;
    }

    .product-features li::before {
        font-size: 1rem;
    }

    .highlight-badge {
        padding: 0.35rem 0.75rem;
        font-size: 0.7rem;
    }
}
</style>
