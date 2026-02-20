<script setup lang="ts">
import {useRoute, useRouter} from 'vue-router'
import {computed, nextTick, onBeforeUnmount, onMounted, ref, watch} from "vue";
import {PhoneFooter, PhoneHeader, WebSitemap} from "@/components";
import {useI18n} from "vue-i18n";

const route = useRoute();
const router = useRouter()
const { locale } = useI18n()

const switchLanguage = (lang: string) => {
  const route = router.currentRoute.value
  const currentLang = route.params.lang as string
  const fullPath = route.fullPath
  const newFullPath = fullPath.replace('/' + currentLang, '/' + lang)

  router.push(newFullPath)
  locale.value = lang
  localStorage.setItem('language', lang)
}

// ===========================
//    初始化粒子动画（封装）
// ===========================
let canvasEl: HTMLCanvasElement
let ctxEl: CanvasRenderingContext2D
let particles: Particle[] = []
let animationFrameId: number

class Particle {
  x!: number
  y!: number
  size!: number
  speedX!: number
  speedY!: number
  opacity!: number

  constructor() { this.reset() }

  reset() {
    this.x = Math.random() * window.innerWidth
    this.y = Math.random() * window.innerHeight
    this.size = Math.random() * 2 + 0.5
    this.speedX = Math.random() * 0.5 - 0.25
    this.speedY = Math.random() * 0.5 - 0.25
    this.opacity = Math.random() * 0.5 + 0.2
  }

  update() {
    this.x += this.speedX
    this.y += this.speedY

    if (this.x > window.innerWidth) this.x = 0
    if (this.x < 0) this.x = window.innerWidth
    if (this.y > window.innerHeight) this.y = 0
    if (this.y < 0) this.y = window.innerHeight
  }

  draw() {
    ctxEl.fillStyle = `rgba(71, 198, 143, ${this.opacity})`
    ctxEl.beginPath()
    ctxEl.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctxEl.fill()
  }
}

function initParticles(count = 100) {
  particles = []
  for (let i = 0; i < count; i++) {
    particles.push(new Particle())
  }
}

function connectParticles() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x
      const dy = particles[i].y - particles[j].y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 150) {
        ctxEl.strokeStyle = `rgba(71, 198, 143, ${0.15 * (1 - distance / 150)})`
        ctxEl.lineWidth = 0.5
        ctxEl.beginPath()
        ctxEl.moveTo(particles[i].x, particles[i].y)
        ctxEl.lineTo(particles[j].x, particles[j].y)
        ctxEl.stroke()
      }
    }
  }
}

function animate() {
  ctxEl.clearRect(0, 0, canvasEl.width, canvasEl.height)
  particles.forEach(p => { p.update(); p.draw() })
  connectParticles()
  animationFrameId = requestAnimationFrame(animate)
}

onMounted(() => {
  canvasEl = document.getElementById('particles') as HTMLCanvasElement
  ctxEl = canvasEl.getContext('2d') as CanvasRenderingContext2D
  canvasEl.width = window.innerWidth
  canvasEl.height = window.innerHeight

  if(!invitationCode.value){
    initParticles()
    animate()
  }

  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  window.removeEventListener('resize', onResize)
})

const sectionsData = ref<{ id: string, top: number, height: number }[]>([]);

function cacheSections() {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  sectionsData.value = Array.from(sections).map(section => ({
    id: section.id,
    top: section.offsetTop - 120,
    height: section.clientHeight
  }));
}

onMounted(() => {
  cacheSections();
  window.addEventListener('resize', cacheSections);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', cacheSections);
});

let resizeTimeout: number | null = null;

function onResize() {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  resizeTimeout = window.setTimeout(() => {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    // 保留已有粒子
    // initParticles()
  }, 200);
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

// ==================== 平滑滚动 ====================
onMounted(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();

      const href = (anchor as HTMLAnchorElement).getAttribute('href');
      if (!href) return;

      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// ==================== 导航滚动效果 & 高亮 ====================
onMounted(() => {
  const navbar = document.querySelector<HTMLElement>('.navbar');

  const scrollHandler = () => {
    const currentScroll = window.pageYOffset;

    if (navbar) {
      navbar.classList.toggle('scrolled', currentScroll > 50);
    }

    const sections = document.querySelectorAll<HTMLElement>('section[id]');
    const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a[data-section]');

    sections.forEach(section => {
      const sectionHeight = section.clientHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.id;

      if (sectionId && currentScroll > sectionTop && currentScroll <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.dataset.section === sectionId);
        });
      }
    });
  };

  window.addEventListener('scroll', scrollHandler);
  window.addEventListener('load', scrollHandler);
  scrollHandler();

  watch(
      () => route.fullPath,
      async () => {
        await nextTick();
        scrollHandler();
      }
  );

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', scrollHandler);
    window.removeEventListener('load', scrollHandler);
  });
});

// ==================== Tilt 3D效果 ====================
onMounted(() => {
  const tiltElements = document.querySelectorAll<HTMLElement>('[data-tilt]');
  const cleanup: (() => void)[] = [];

  tiltElements.forEach(el => {
    const mouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
    };
    const mouseLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
    };
    el.addEventListener('mousemove', mouseMove);
    el.addEventListener('mouseleave', mouseLeave);
    cleanup.push(() => { el.removeEventListener('mousemove', mouseMove); el.removeEventListener('mouseleave', mouseLeave); });
  });

  onBeforeUnmount(() => cleanup.forEach(fn => fn()));
});

// ==================== 滚动动画（卡片淡入） ====================
onMounted(() => {
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement; // <— 关键！
      if (entry.isIntersecting) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });

  document.querySelectorAll<HTMLElement>('.feature-card, .product-card, .security-item')
      .forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`;
        scrollObserver.observe(el);
      });
});

const initFloatingCardEffect = () => {
  const floatingCard = document.querySelector<HTMLDivElement>('.floating-card');

  if (!floatingCard) return;

  floatingCard.addEventListener('mouseenter', () => {
    floatingCard.style.animationPlayState = 'paused';
  });

  floatingCard.addEventListener('mousemove', (e) => {
    const rect = floatingCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    floatingCard.style.transform =
        `translateY(-20px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  floatingCard.addEventListener('mouseleave', () => {
    floatingCard.style.animationPlayState = 'running';
    floatingCard.style.transition = 'transform 0.5s ease-out';
    floatingCard.style.transform = '';

    setTimeout(() => {
      floatingCard.style.transition = '';
    }, 500);
  });
};

onMounted(() => {
  initFloatingCardEffect();
});

function initCardEffects() {
  const cards = document.querySelectorAll<HTMLElement>('.feature-card, .product-card');

  const mouseMoveHandlers: ((e: MouseEvent) => void)[] = [];
  const mouseLeaveHandlers: (() => void)[] = [];

  cards.forEach((card) => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      const glow = card.querySelector<HTMLElement>('.card-gradient-bg')
          || card.querySelector<HTMLElement>('.product-glow');
      if (glow) {
        glow.style.background = `
          radial-gradient(circle 300px at ${x}px ${y}px,
          rgba(99, 102, 241, 0.15),
          transparent)
        `;
      }
    };

    const handleMouseLeave = () => {
      const glow = card.querySelector<HTMLElement>('.card-gradient-bg')
          || card.querySelector<HTMLElement>('.product-glow');
      if (glow) {
        glow.style.transition = 'background 0.4s ease-out';
        glow.style.background = 'transparent';
        setTimeout(() => glow.style.transition = '', 400);
      }
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    mouseMoveHandlers.push(handleMouseMove);
    mouseLeaveHandlers.push(handleMouseLeave);
  });

  return () => {
    cards.forEach((card, index) => {
      card.removeEventListener('mousemove', mouseMoveHandlers[index]);
      card.removeEventListener('mouseleave', mouseLeaveHandlers[index]);
    });
  }
}

let cleanup: (() => void) | null = null;

onMounted(() => {
  cleanup = initCardEffects();
});

onBeforeUnmount(() => {
  cleanup?.();
});

// const showLayout = computed(() => {
//   return !route.path.startsWith(`/${route.params.lang}/blog`)
// })

function getQueryParam(full: string, key: string): string {
  let value = ''
  const queryIndex = full.indexOf('?')
  if (queryIndex !== -1) {
    const query = full.substring(queryIndex + 1)
    value = new URLSearchParams(query).get(key) || ''
  }
  const hashIndex = full.indexOf('#')
  if (!value && hashIndex !== -1) {
    const hash = full.substring(hashIndex + 1)
    const hashQueryIndex = hash.indexOf('?')
    if (hashQueryIndex !== -1) {
      const hashQuery = hash.substring(hashQueryIndex + 1)
      value = new URLSearchParams(hashQuery).get(key) || ''
    }
  }
  return value
}

const invitationCode = computed(() => getQueryParam(route.fullPath, 'invitationCode'))
const isDocsPage = computed(() => route.name === 'DocsPage')
</script>

<template>
  <div  class="app-root" id="copy-layer">
    <div class="cursor-glow"></div>
    <canvas id="particles"></canvas>
    <div class="grid-background"></div>
    <PhoneHeader v-if="!invitationCode && !isDocsPage" :currentLanguage="locale" @onSwitchLanguage="switchLanguage"/>

    <router-view />

    <WebSitemap v-if="!invitationCode && !isDocsPage" />
    <PhoneFooter v-if="!invitationCode && !isDocsPage" />
  </div>
</template>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

#particles {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
