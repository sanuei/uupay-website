<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {computed} from "vue";
import {useHead} from "@unhead/vue";
import { Target, Lightbulb, Shield, Globe, Users, Zap } from "lucide-vue-next";
import WebContent6 from "@/components/WebContent6.vue";

const { locale, t } = useI18n()

useHead(() => ({
  title: t('aboutUs.metaTitle'),
  meta: [
    {
      name: 'description',
      content: t('aboutUs.description'),
    },
    {
      name: 'keywords',
      content: t('aboutUs.keywords'),
    },
  ],
  htmlAttrs: {
    lang: locale.value,
  }
}))

const advantagesListContent = computed(() => [
  { title: t('aboutUs.advantageList1'), icon: Shield },
  { title: t('aboutUs.advantageList2'), icon: Globe },
  { title: t('aboutUs.advantageList3'), icon: Users },
  { title: t('aboutUs.advantageList4'), icon: Zap },
]);

// Add parallax effect on card hover
const handleMouseMove = (e: MouseEvent, cardClass: string) => {
  const cards = document.querySelectorAll(cardClass);
  cards.forEach((card: any) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  });
}
</script>

<template>
  <div class="about-page-wrapper">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="grid-overlay"></div>
    </div>

    <!-- About Hero -->
    <section id="about-us" class="about-hero">
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">About UUPAY</div>
          <h1 class="hero-title">
            <span class="title-line">{{ t('aboutUs.titleLine1') }}</span>
            <span class="title-line title-accent">{{ t('aboutUs.titleLine2') }}</span>
          </h1>
          <p class="hero-subtitle">{{ t('aboutUs.subTitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="mission-section" @mousemove="(e) => handleMouseMove(e, '.hover-card')">
      <div class="container">
        <div class="grid-layout">
          <!-- Mission Card -->
          <div class="hover-card mission-card">
            <div class="card-content">
              <div class="icon-box">
                <Target class="card-icon" />
              </div>
              <h2 class="card-title">{{ t('aboutUs.mission') }}</h2>
              <p class="card-text">{{ t('aboutUs.missionSub') }}</p>
            </div>
            <div class="card-border"></div>
          </div>
          
          <!-- Vision Card -->
          <div class="hover-card vision-card">
            <div class="card-content">
              <div class="icon-box">
                <Lightbulb class="card-icon" />
              </div>
              <h2 class="card-title">{{ t('aboutUs.visionTitle') }}</h2>
              <p class="card-text">{{ t('aboutUs.visionSub') }}</p>
            </div>
            <div class="card-border"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services & Advantages -->
    <section class="advantages-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ t('aboutUs.advantageTitle') }}</h2>
          <p class="section-desc">{{ t('aboutUs.servicesSub') }}</p>
        </div>
        
        <div class="advantages-grid">
          <div 
            class="advantage-card"
            v-for="(item, index) in advantagesListContent" 
            :key="index"
          >
            <div class="advantage-icon-wrapper">
              <component :is="item.icon" class="advantage-icon" />
            </div>
            <h3 class="advantage-title">{{ item.title }}</h3>
            <!-- Decorative line -->
            <div class="card-line"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Message -->
    <section class="footer-msg-section">
      <div class="container">
        <div class="footer-msg-box">
          <p class="footer-msg">{{ t('aboutUs.footer') }}</p>
        </div>
      </div>
    </section>

    <!-- Global Footer -->
    <WebContent6 />
  </div>
</template>

<style scoped>
.about-page-wrapper {
  position: relative;
  overflow: hidden;
  background: #000;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 10;
}

/* Animated Background */
.animated-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image: 
    linear-gradient(rgba(71, 198, 143, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(71, 198, 143, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(circle at center, black 40%, transparent 80%);
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
}

.orb-1 {
  top: -10%;
  left: 20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(71, 198, 143, 0.15), transparent 70%);
  animation: float 20s infinite ease-in-out;
}

.orb-2 {
  bottom: 0%;
  right: 10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(58, 110, 165, 0.1), transparent 70%);
  animation: float 15s infinite ease-in-out reverse;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 50px); }
}

/* Hero Section */
.about-hero {
  padding: 10rem 0 8rem;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: rgba(71, 198, 143, 0.1);
  border: 1px solid rgba(71, 198, 143, 0.2);
  border-radius: 100px;
  color: var(--primary-color);
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 2rem;
  letter-spacing: 0.05em;
  backdrop-filter: blur(5px);
}

.hero-title {
  font-size: var(--font-size-hero);
  font-weight: 800;
  margin-bottom: 2rem;
  letter-spacing: -0.02em;
  line-height: var(--line-height-tight);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-line {
  display: block;
  color: #fff;
}

.title-accent {
  color: var(--primary-color);
}

.hero-subtitle {
  font-size: var(--font-size-body-lg);
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Mission & Vision */
.mission-section {
  padding: 4rem 0 8rem;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.hover-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 4rem 3rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.hover-card:hover {
  transform: translateY(-8px);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border-color: rgba(71, 198, 143, 0.3);
}

/* Hover highlight effect using CSS variables */
.hover-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    800px circle at var(--mouse-x) var(--mouse-y), 
    rgba(255, 255, 255, 0.06), 
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.5s;
  pointer-events: none;
}

.hover-card:hover::before {
  opacity: 1;
}

.icon-box {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(71, 198, 143, 0.2), rgba(71, 198, 143, 0.05));
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  border: 1px solid rgba(71, 198, 143, 0.1);
}

.card-icon {
  width: 32px;
  height: 32px;
  color: var(--primary-color);
}

.card-title {
  font-size: var(--font-size-h2);
  font-weight: 700;
  color: #fff;
  margin-bottom: 1.5rem;
}

.card-text {
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
  font-size: var(--font-size-body);
}

/* Advantages */
.advantages-section {
  padding: 0 0 10rem;
}

.section-header {
  text-align: center;
  margin-bottom: 5rem;
}

.section-title {
  font-size: var(--font-size-h1);
  font-weight: 800;
  color: #fff;
  margin-bottom: 1.5rem;
}

.section-desc {
  color: var(--text-secondary);
  font-size: var(--font-size-body);
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}

.advantage-card {
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.advantage-card:hover {
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-5px);
  border-color: rgba(71, 198, 143, 0.3);
}

.advantage-icon-wrapper {
  width: 56px;
  height: 56px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--primary-color);
  transition: all 0.3s ease;
}

.advantage-card:hover .advantage-icon-wrapper {
  background: var(--primary-color);
  color: #000;
  transform: scale(1.1);
}

.advantage-icon {
  width: 24px;
  height: 24px;
}

.advantage-title {
  font-size: 1.25rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 1rem;
}

.card-line {
  height: 2px;
  width: 20px;
  background: var(--primary-color);
  margin: 1.5rem auto 0;
  opacity: 0.5;
  transition: width 0.3s ease;
}

.advantage-card:hover .card-line {
  width: 50px;
  opacity: 1;
}

/* Footer Msg */
.footer-msg-section {
  padding: 0 0 8rem;
  text-align: center;
}

.footer-msg-box {
  background: radial-gradient(circle at center, rgba(71, 198, 143, 0.1), transparent 70%);
  padding: 4rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-msg {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1.5;
  max-width: 800px;
  margin: 0 auto;
}

/* Responsive */
@media (max-width: 1024px) {
  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .container {
    padding: 0 1rem;
  }

  .about-hero {
    padding: 6rem 0 2rem;
  }

  .hero-badge {
    padding: 0.4rem 1rem;
    font-size: var(--font-size-xs);
    margin-bottom: 0.75rem;
  }

  .hero-title {
    margin-bottom: 1rem;
  }

  .mission-section {
    padding: 2rem 0;
  }

  .grid-layout {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .hover-card {
    padding: 1.5rem 1.25rem;
  }

  .icon-box {
    width: 48px;
    height: 48px;
  }

  .card-title {
    margin-bottom: 0.5rem;
  }

  .advantages-section {
    padding: 2rem 0;
  }

  .section-header {
    margin-bottom: 2rem;
  }

  .section-title {
    margin-bottom: 0.5rem;
  }

  .advantages-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .advantage-card {
    padding: 1.25rem 1rem;
  }

  .advantage-icon-wrapper {
    width: 40px;
    height: 40px;
    margin-bottom: 0.75rem;
  }

  .advantage-icon {
    width: 20px;
    height: 20px;
  }

  .advantage-title {
    font-size: var(--font-size-small);
  }

  .footer-msg-section {
    padding: 2rem 0;
  }

  .footer-msg-box {
    padding: 1.5rem 1rem;
  }

  .footer-msg {
    font-size: var(--font-size-body);
  }

  .orb {
    display: none;
  }
}
</style>
