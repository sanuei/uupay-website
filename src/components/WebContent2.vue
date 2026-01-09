<script setup lang="ts">
import {ArrowRight, ChartColumn, CodeXml, CreditCard, Globe, ShieldCheck, Zap} from "lucide-vue-next";
import {useI18n} from "vue-i18n";

const { t } = useI18n()
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{t('aboutPay')}}</span>
        <h2 class="section-title">{{t('newDigitalSolution')}}</h2>
        <p class="section-description">{{t('introduce2')}}</p>
      </div>

      <div class="features-grid">
        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon"><CreditCard /></div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('multiCollection')}}</h3>
          <p>{{t('payPurpose')}}</p>
          <div class="feature-arrow"><ArrowRight /></div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <Zap />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('paymentExp')}}</h3>
          <p>{{t('paymentExpPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <Globe />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('globalSupport')}}</h3>
          <p>{{t('globalSupportPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <CodeXml />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('friendlyDev')}}</h3>
          <p>{{t('friendlyDevPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <ShieldCheck />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('businessSecurity')}}</h3>
          <p>{{t('businessSecurityPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <ChartColumn />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('dataVisual')}}</h3>
          <p>{{t('dataVisualPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-section {
    padding: 10rem 0;
    position: relative;
    overflow: hidden;
}

.about-section::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, transparent, rgba(71, 198, 143, 0.3), transparent);
}



.features-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
}

.feature-card {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 24px;
    padding: 3.5rem 3rem;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.card-gradient-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--gradient-1);
    opacity: 0;
    transition: opacity 0.5s ease;
}

.feature-card:hover .card-gradient-bg {
    opacity: 0.05;
}

.feature-card:hover {
    transform: translateY(-10px) scale(1.02);
    border-color: var(--primary-color);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(71, 198, 143, 0.2);
}

.feature-icon-wrapper {
    position: relative;
    width: fit-content;
    margin-bottom: 2.5rem;
}

.feature-icon svg {
    width: 56px;
    height: 56px;
    color: var(--primary-color);
    stroke-width: 1.5;
}

.feature-card h3 {
    font-size: 1.5rem;
    margin-bottom: 1.25rem;
    font-weight: 700;
    position: relative;
    z-index: 2;
    line-height: 1.3;
}

.feature-card p {
    color: var(--text-secondary);
    line-height: 1.8;
    position: relative;
    z-index: 2;
    font-size: 1rem;
}

.feature-arrow {
    position: absolute;
    bottom: 2.5rem;
    right: 2.5rem;
    opacity: 0;
    transform: translateX(-20px);
    transition: all 0.5s ease;
}

.feature-arrow svg {
    width: 28px;
    height: 28px;
    color: var(--primary-color);
}

.feature-card:hover .feature-arrow {
    opacity: 1;
    transform: translateX(0);
}

@media (max-width: 1200px) {
    .features-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
    .features-grid { grid-template-columns: 1fr; gap: 1.5rem; }
    
    .feature-card {
        padding: 2.5rem 2rem;
        border-radius: 20px;
    }

    .feature-icon svg {
        width: 44px;
        height: 44px;
    }

    .feature-icon-wrapper {
        margin-bottom: 1.5rem;
    }

    .feature-card h3 {
        font-size: var(--font-size-h3);
        margin-bottom: 1rem;
    }

    .feature-card p {
        font-size: 0.9375rem;
    }
}
</style>
