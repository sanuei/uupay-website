<script setup lang="ts">
import { CreditCard, Globe, ShieldCheck, Sparkles, Zap } from "lucide-vue-next";
import { useI18n } from "vue-i18n";
import {DOWNLINK} from "@/constants";
import {onMounted} from "vue";

const { t } = useI18n()

const iosDownload = () => {
  window.location.href = 'https://apps.apple.com/app/id6749419646'
}

const androidDownload = () => {
  window.location.href = DOWNLINK
}

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
      element.textContent = current + '+';
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      if (targetNumber !== null) {
        element.textContent = targetNumber + '+';
      }
    }
  };

  requestAnimationFrame(step);
}

onMounted(() => {
  initStatNumberAnimation();
});
</script>

<template>
  <section class="hero" id="hero">
    <div class="container hero-inner">
      <div class="hero-content">
        <div class="hero-badge">
          <Sparkles class="badge-icon-svg" />
          <span>{{t('newSolution')}}</span>
        </div>

        <h1 class="hero-title">
            <span class="word-animation">
              <span class="gradient-text">{{t('oneStop')}}</span>
            </span>
          <br />
          <span class="word-animation" style="animation-delay: 0.1s;">{{t('solution')}}</span>
        </h1>

        <p class="hero-subtitle">{{t('introduce')}}</p>

        <div class="download-buttons">
          <div @click="iosDownload" class="download-btn">
            <img src="@/assets/images/app-store.png" alt="Download on App Store">
            <span class="download-text">App Store</span>
          </div>
          <div @click="androidDownload" class="download-btn">
            <img src="@/assets/images/google-play.png" alt="Get it on Google Play">
            <span class="download-text">Google Play</span>
          </div>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-number" data-target="137">137</div> <!--要数字跳动就加data-target="10" -->
            <div class="stat-label">{{t('state')}}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">{{t('seconds')}}</div>
            <div class="stat-label">{{t('experience')}}</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">99.9%</div>
            <div class="stat-label">{{t('system')}}</div>
          </div>
        </div>
      </div>

      <!-- visual -->
      <div class="hero-visual">
        <div class="floating-card card-3d card-image">
          <div class="card-shine"></div>
          <img src="@/assets/images/uupay-card.png" alt="UUPAY Card" class="card-img">
        </div>

        <div class="floating-elements">
          <div class="float-icon icon-1"><CreditCard /></div>
          <div class="float-icon icon-2"><ShieldCheck /></div>
          <div class="float-icon icon-3"><Zap /></div>
          <div class="float-icon icon-4"><Globe /></div>
        </div>
      </div>
    </div>

    <div class="hero-background">
      <div class="gradient-orb orb-1"></div>
      <div class="gradient-orb orb-2"></div>
      <div class="gradient-orb orb-3"></div>
    </div>
  </section>
</template>

<style scoped>

</style>
