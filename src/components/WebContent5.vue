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
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
