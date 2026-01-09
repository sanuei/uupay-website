<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {ChevronDown} from "lucide-vue-next";
import {onBeforeUnmount, onMounted} from "vue";

const { t } = useI18n()

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
</script>

<template>
  <section class="mission-section">
    <div class="container">
      <div class="mission-content">
        <h2 class="mission-title">{{t('freeTrade')}}</h2>
        <p class="mission-text">
          {{t('freeTradePurpose')}}
          <br>{{t('freeMoney')}}
        </p>
      </div>
    </div>
  </section>

  <section class="partners-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{t('teamWork')}}</span>
        <h2 class="section-title">{{t('comeFrom')}}</h2>
        <p class="section-description">
          {{t('our')}}
        </p>
      </div>

      <div class="partners-scroll">
        <div class="partners-track">
          <div class="partner-logo">Binance</div>
          <div class="partner-logo">Coinbase</div>
          <div class="partner-logo">Kraken</div>
          <div class="partner-logo">OKX</div>
          <div class="partner-logo">Huobi</div>
          <div class="partner-logo">Bitfinex</div>
          <div class="partner-logo">KuCoin</div>
          <div class="partner-logo">Gate.io</div>
          <!-- 重复一组用于无缝滚动 -->
          <div class="partner-logo">Binance</div>
          <div class="partner-logo">Coinbase</div>
          <div class="partner-logo">Kraken</div>
          <div class="partner-logo">OKX</div>
          <div class="partner-logo">Huobi</div>
          <div class="partner-logo">Bitfinex</div>
          <div class="partner-logo">KuCoin</div>
          <div class="partner-logo">Gate.io</div>
        </div>
      </div>
    </div>
  </section>

  <section class="faq-section" id="faq">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">FAQ</span>
        <h2 class="section-title">{{t('faq')}}</h2>
        <p class="section-description">{{t('quickAnswer')}}</p>
      </div>

      <div class="faq-container">
        <div class="faq-item">
          <div class="faq-question">
            <span>{{t('question1')}}</span>
            <div class="faq-icon"><ChevronDown /></div>
          </div>
          <div class="faq-answer">
            <p>{{t('answer1')}}</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>{{t('question2')}}</span>
            <div class="faq-icon"><ChevronDown /></div>
          </div>
          <div class="faq-answer">
            <p>{{t('answer2')}}</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>{{t('question3')}}</span>
            <div class="faq-icon"><ChevronDown /></div>
          </div>
          <div class="faq-answer">
            <p>{{t('answer3')}}</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>{{t('question4')}}</span>
            <div class="faq-icon"><ChevronDown /></div>
          </div>
          <div class="faq-answer">
            <p>{{t('answer4')}}</p>
          </div>
        </div>

        <div class="faq-item">
          <div class="faq-question">
            <span>{{t('question5')}}</span>
            <div class="faq-icon"><ChevronDown /></div>
          </div>
          <div class="faq-answer">
            <p>{{t('answer5')}}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.mission-section {
    padding: 12rem 0;
    text-align: center;
    position: relative;
    overflow: hidden;
}

.mission-section::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, rgba(71, 198, 143, 0.1) 0%, transparent 70%);
    pointer-events: none;
}

.mission-content {
    max-width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

.mission-title {
    font-size: 5rem;
    font-weight: 900;
    margin-bottom: 3rem;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    line-height: 1.2;
    letter-spacing: -0.04em;
}

.mission-text {
    font-size: 1.375rem;
    color: var(--text-secondary);
    line-height: 2;
    font-weight: 400;
    letter-spacing: -0.01em;
}

.partners-section {
    padding: 8rem 0;
    overflow: hidden;
}

.partners-scroll {
    margin-top: 4rem;
    overflow: hidden;
    position: relative;
}

.partners-track {
    display: flex;
    gap: 4rem;
    animation: scroll 30s linear infinite;
    width: fit-content;
}

.partner-logo {
    font-size: 2rem;
    font-weight: 700;
    color: var(--text-secondary);
    white-space: nowrap;
    padding: 2rem 3rem;
    transition: all 0.3s ease;
    letter-spacing: -0.02em;
}

.partner-logo:hover {
    color: var(--primary-color);
    background: rgba(71, 198, 143, 0.05);
    transform: translateY(-5px);
}

@keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}

.faq-section {
    padding: 10rem 0;
}

.faq-container {
    max-width: 900px;
    margin: 4rem auto 0;
}

.faq-item {
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 20px;
    margin-bottom: 1.5rem;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
}

.faq-question {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2.5rem;
    color: var(--text-primary);
    font-size: 1.25rem;
    font-weight: 600;
}

.faq-icon {
    width: 24px;
    height: 24px;
    color: var(--primary-color);
    transition: transform 0.3s ease;
    flex-shrink: 0;
}

.faq-item.active .faq-icon {
    transform: rotate(180deg);
}

.faq-icon svg {
    width: 24px;
    height: 24px;
    stroke-width: 1.5;
}

.faq-answer {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.4s ease, padding 0.4s ease;
    padding: 0 2.5rem;
}

.faq-item.active .faq-answer {
    max-height: 500px;
    padding: 0 2.5rem 2rem 2.5rem;
}

.faq-item.active {
    border-color: var(--primary-color);
}

.faq-answer p {
    color: var(--text-secondary);
    font-size: 1.0625rem;
    line-height: 1.8;
}

@media (max-width: 768px) {
    .mission-title { font-size: 3rem; }
    .faq-question { font-size: 1.0625rem; padding: 1.5rem 1.75rem; }
    .faq-answer { padding: 0 1.75rem; }
    .faq-item.active .faq-answer { padding: 0 1.75rem 1.5rem 1.75rem; }
}
</style>
