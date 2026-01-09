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

onMounted(() => {
  const animatedWords = document.querySelectorAll<HTMLElement>('.word-animation, .hero-subtitle, .download-buttons, .hero-stats')

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate')
      } else {
        // 如果希望离开视口后重新进入时重新播放
        entry.target.classList.remove('animate')
      }
    })
  }, { threshold: 0.5 })

  animatedWords.forEach(el => observer.observe(el))
})
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
          <img src="@/assets/images/uupay-card.webp" alt="UUPAY Card" class="card-img">
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
.hero {
    position: relative;
    padding: 10rem 0 8rem;
    min-height: 100vh;
    display: flex;
    align-items: center;
    overflow: hidden;
}

.hero .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6rem;
    align-items: center;
    position: relative;
    z-index: 10;
}

.hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.625rem;
    background: rgba(71, 198, 143, 0.08);
    border: 1px solid rgba(71, 198, 143, 0.2);
    padding: 0.625rem 1.5rem;
    border-radius: 50px;
    font-size: 0.8125rem;
    font-weight: 500;
    margin-bottom: 2.5rem;
    animation: fadeInUp 0.8s ease;
    letter-spacing: 0.02em;
    color: var(--text-secondary);
    backdrop-filter: blur(10px);
}

.badge-icon-svg {
    width: 16px;
    height: 16px;
    color: var(--primary-color);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.5; transform: scale(1.2); }
}

.word-animation {
    display: inline-block;
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    transition: opacity 0.8s ease, transform 0.8s ease;
}

.word-animation.animate {
    opacity: 1;
    transform: translateY(0) scale(1);
}

@keyframes fadeInUp {
    from { opacity: 0; transform: translateY(30px) scale(0.95); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

.hero-title {
    font-size: var(--font-size-hero);
    font-weight: 800;
    line-height: var(--line-height-tight);
    margin-bottom: 2rem;
    letter-spacing: -0.04em;
    color: var(--text-primary);
}

.gradient-text {
    background: linear-gradient(135deg, #47C68F 0%, #5DD6A3 25%, #43E97B 50%, #5DD6A3 75%, #47C68F 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    position: relative;
    display: inline-block;
    font-weight: 900;
    filter: drop-shadow(0 0 20px rgba(71, 198, 143, 0.4));
}

.gradient-text.animate {
    animation: gradientFlow 4s ease-in-out infinite;
}

@keyframes gradientFlow {
    0%, 100% { background-position: 0% center; }
    50% { background-position: 100% center; }
}

.gradient-text::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, transparent 0%, #47C68F 20%, #43E97B 50%, #47C68F 80%, transparent 100%);
    border-radius: 2px;
    opacity: 0.8;
    animation: underlineGlow 2s ease-in-out infinite;
}

@keyframes underlineGlow {
    0%, 100% { opacity: 0.6; transform: scaleX(0.9); }
    50% { opacity: 1; transform: scaleX(1); }
}

.hero-subtitle {
    opacity: 0;
    font-size: var(--font-size-body-lg);
    color: var(--text-secondary);
    margin-bottom: 3.5rem;
    max-width: 650px;
    line-height: var(--line-height-relaxed);
    font-weight: 400;
    letter-spacing: -0.01em;
    transform: translateY(30px) scale(0.95);
    transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
}

.hero-subtitle.animate {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.download-buttons {
    opacity: 0;
    display: flex;
    gap: 1.5rem;
    margin-bottom: 6rem;
    transform: translateY(30px) scale(0.95);
    transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
}

.download-buttons.animate {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.download-btn {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    position: relative;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(71, 198, 143, 0.15);
    border-radius: 16px;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    overflow: hidden;
    cursor: pointer;
}

.download-btn img {
    height: 32px;
    width: auto;
}

.download-text {
    font-size: var(--font-size-body);
    font-weight: 600;
    color: var(--text-primary);
    transition: color 0.3s ease;
}

.download-btn:hover {
    transform: translateY(-5px) scale(1.02);
    border-color: rgba(71, 198, 143, 0.4);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
}

.download-btn:hover .download-text {
    color: var(--primary-color);
}

.hero-stats {
    opacity: 0;
    display: flex;
    gap: 5rem;
    transform: translateY(30px) scale(0.95);
    transition: opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s;
}

.hero-stats.animate {
    opacity: 1;
    transform: translateY(0) scale(1);
}

.stat-item {
    text-align: left;
    position: relative;
    padding-left: 1.5rem;
}

.stat-item::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 4px;
    height: 65%;
    background: var(--gradient-1);
    border-radius: 2px;
}

.stat-number {
    font-size: var(--font-size-h1);
    font-weight: 900;
    background: var(--gradient-1);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.5rem;
    font-feature-settings: 'tnum';
    min-width: 150px;
    display: inline-block;
    transition: opacity 0.3s ease, transform 0.3s ease;
    letter-spacing: -0.03em;
    line-height: 1.1;
}

.stat-label {
    color: var(--text-secondary);
    font-size: var(--font-size-body);
    font-weight: 500;
    letter-spacing: 0.01em;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.5s ease 0.2s, transform 0.5s ease 0.2s;
}

.stat-item.animated .stat-label {
    opacity: 1;
    transform: translateY(0);
}

.hero-visual {
    position: relative;
    perspective: 1000px;
    animation: fadeInRight 1s ease 0.5s backwards;
}

@keyframes fadeInRight {
    from { opacity: 0; transform: translateX(50px); }
    to { opacity: 1; transform: translateX(0); }
}

.floating-card {
    width: 100%;
    max-width: 500px;
    aspect-ratio: 1.586;
    border-radius: 30px;
    position: relative;
    transform-style: preserve-3d;
    animation: cardFloat 6s ease-in-out infinite;
    box-shadow: 0 50px 100px rgba(0, 0, 0, 0.4);
    overflow: hidden;
}

@keyframes cardFloat {
    0%, 100% { transform: translateY(0) rotateY(-10deg) rotateX(5deg); }
    50% { transform: translateY(-20px) rotateY(-15deg) rotateX(10deg); }
}

.card-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.floating-elements {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
}

.float-icon {
    position: absolute;
    width: 64px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(71, 198, 143, 0.1);
    border: 1px solid rgba(71, 198, 143, 0.2);
    border-radius: 16px;
    backdrop-filter: blur(10px);
    animation: floatAround 8s ease-in-out infinite;
    opacity: 0.8;
}

.float-icon svg {
    width: 32px;
    height: 32px;
    stroke-width: 1.5;
}

@keyframes floatAround {
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(20px, -20px) rotate(10deg); }
    50% { transform: translate(10px, 20px) rotate(-10deg); }
    75% { transform: translate(-20px, 10px) rotate(5deg); }
}

.icon-1 { top: 10%; left: -10%; }
.icon-2 { top: 60%; right: -5%; animation-delay: -2s; }
.icon-3 { bottom: 10%; left: 10%; animation-delay: -4s; }
.icon-4 { top: 30%; right: -15%; animation-delay: -6s; }

.hero-background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 1;
}

.gradient-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.4;
    animation: orbFloat 20s ease-in-out infinite;
}

.orb-1 { width: 700px; height: 700px; background: var(--gradient-1); top: -200px; right: -200px; }
.orb-2 { width: 600px; height: 600px; background: var(--gradient-2); bottom: -100px; left: -150px; animation-delay: -5s; }
.orb-3 { width: 500px; height: 500px; background: var(--gradient-3); top: 50%; left: 30%; animation-delay: -10s; }

@keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(100px, -100px) scale(1.2); }
    66% { transform: translate(-50px, 50px) scale(0.8); }
}

@media (max-width: 1200px) {
    .hero .container { grid-template-columns: 1fr; }
    .hero-visual { margin-top: 4rem; }
}

@media (max-width: 768px) {
    .hero { padding: 10rem 0 6rem; }
    .hero-title { font-size: 3rem; }
    .hero-stats { flex-direction: column; gap: 2rem; }
    .download-buttons { flex-direction: column; align-items: stretch; gap: 1rem; }
    .download-btn { padding: 0.875rem 1.5rem; justify-content: center; }
    .download-btn img { height: 32px; }
}
</style>
