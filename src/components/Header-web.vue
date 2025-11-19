<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useI18n } from 'vue-i18n'
import {
  ArrowRight,
  BrainCircuit,
  ChartColumn,
  CodeXml,
  CreditCard,
  Fingerprint,
  Globe, Lock, MessageCircle, Settings,
  ShieldCheck, Smartphone, Sparkles, Star, Wallet, Zap,
  Check, ChevronDown, Twitter, Facebook, Linkedin, Instagram, Github, Youtube
} from "lucide-vue-next";
import { DOWNLINK } from "@/constants";

const { locale, t } = useI18n()

const selectedLanguage = ref(localStorage.getItem('language') || 'zh')

// const currentSection = ref('other')

const languageList = computed(() => [
  { label: t('language.zh'), value: 'zh' },
  { label: t('language.zhtw'), value: 'zhtw' },
  { label: t('language.en'), value: 'en' },
])

onMounted(() => {
  const el = document.getElementById('copy-layer');
  if (el) {
    el.addEventListener('click', copyInvitationCode);
  }
});

onBeforeUnmount(() => {
  const el = document.getElementById('copy-layer');
  if (el) {
    el.removeEventListener('click', copyInvitationCode);
  }
});

const switchLanguage = (lang: string) => {
  locale.value = lang
  localStorage.setItem('language', lang)
}

const changeLanguage = (lang: any) => {
  switchLanguage(lang.value)
  selectedLanguage.value = lang.value
}

const goToAppStore = () => {
  copyInvitationCode()
  const isIOS = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)

  if (isIOS) {
    window.location.href = 'https://apps.apple.com/app/id6749419646'
  } else {
    window.location.href = DOWNLINK
  }
}

const iosDownload = () => {
  window.location.href = 'https://apps.apple.com/app/id6749419646'
}

const androidDownload = () => {
  window.location.href = DOWNLINK
}

const getInvitationCode = (): string | null => {
  const queryCode = new URLSearchParams(window.location.search).get('invitationCode')
  if (queryCode) return queryCode

  const hash = window.location.hash
  const hashQueryIndex = hash.indexOf('?')
  if (hashQueryIndex !== -1) {
    const hashQuery = hash.substring(hashQueryIndex + 1)
    const hashCode = new URLSearchParams(hashQuery).get('invitationCode')
    if (hashCode) return hashCode
  }

  return null
}

const fallbackCopy = (text: string): boolean => {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)
  input.select()
  const result = document.execCommand('copy')
  document.body.removeChild(input)
  return result
}

const copyInvitationCode = async () => {
  const invitationCode = getInvitationCode()
  if (!invitationCode) {
    return
  }

  const textToCopy = window.location.href

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(textToCopy)
      return
    } catch (err) {
      console.warn('Clipboard API 失败，准备使用 fallback:', err)
    }
  }

  const fallbackSuccess = fallbackCopy(textToCopy)
  fallbackSuccess
      ? console.log('已复制（fallback 方法）：', textToCopy)
      : console.error('fallback 复制仍失败')
}

const openCustomerService = () => {
  if (window.scBotHandler && typeof window.scBotHandler.expand === 'function') {
    window.scBotHandler.expand()
  } else {
    console.warn('客服系统尚未加载')
  }
}

// ===========================
//    初始化粒子动画（封装）
// ===========================
function initParticleCanvas() {
  const canvas = document.getElementById('particles') as HTMLCanvasElement | null;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // ⭐ 关键：永远不为 null 的 canvas & ctx
  const canvasEl: HTMLCanvasElement = canvas;
  const ctxEl: CanvasRenderingContext2D = ctx;

  canvasEl.width = window.innerWidth;
  canvasEl.height = window.innerHeight;

  const particles: Particle[] = [];
  const particleCount = 100;

  class Particle {
    x!: number;
    y!: number;
    size!: number;
    speedX!: number;
    speedY!: number;
    opacity!: number;

    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvasEl.width;
      this.y = Math.random() * canvasEl.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = Math.random() * 0.5 - 0.25;
      this.speedY = Math.random() * 0.5 - 0.25;
      this.opacity = Math.random() * 0.5 + 0.2;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x > canvasEl.width) this.x = 0;
      if (this.x < 0) this.x = canvasEl.width;
      if (this.y > canvasEl.height) this.y = 0;
      if (this.y < 0) this.y = canvasEl.height;
    }

    draw() {
      ctxEl.fillStyle = `rgba(71, 198, 143, ${this.opacity})`;
      ctxEl.beginPath();
      ctxEl.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctxEl.fill();
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctxEl.strokeStyle = `rgba(71, 198, 143, ${0.15 * (1 - distance / 150)})`;
          ctxEl.lineWidth = 0.5;
          ctxEl.beginPath();
          ctxEl.moveTo(particles[i].x, particles[i].y);
          ctxEl.lineTo(particles[j].x, particles[j].y);
          ctxEl.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctxEl.clearRect(0, 0, canvasEl.width, canvasEl.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    connectParticles();
    requestAnimationFrame(animateParticles);
  }

  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    canvasEl.width = window.innerWidth;
    canvasEl.height = window.innerHeight;
    initParticles();
  });
}

// ===========================
//       页面加载后启动
// ===========================
window.addEventListener('DOMContentLoaded', () => {
  initParticleCanvas();
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
  const navLinks = document.querySelectorAll<HTMLAnchorElement>('.nav-links a');
  const sections = document.querySelectorAll<HTMLElement>('section[id]');

  const scrollHandler = () => {
    const currentScroll = window.pageYOffset;

    // navbar scrolled 状态切换
    if (navbar) {
      navbar.classList.toggle('scrolled', currentScroll > 50);
    }

    // 高亮当前 section 的 nav link
    const scrollY = currentScroll;
    sections.forEach(section => {
      const sectionHeight = section.clientHeight;
      const sectionTop = section.offsetTop - 100; // HTMLElement 上可用
      const sectionId = section.getAttribute('id');

      if (sectionId && scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          // 将 active 的设置改为 toggle，一次性处理 true/false
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  };

  // 绑定事件
  window.addEventListener('scroll', scrollHandler);
  window.addEventListener('load', scrollHandler);

  // 立即执行一次，确保初始状态正确（可选）
  scrollHandler();

  // 卸载时清理
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

  // 鼠标进入：暂停自动动画
  floatingCard.addEventListener('mouseenter', () => {
    floatingCard.style.animationPlayState = 'paused';
  });

  // 鼠标移动：跟随倾斜效果
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

  // 鼠标离开：恢复原位置 + 继续自动动画
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

  cards.forEach((card: HTMLElement) => {

    card.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // 更新 CSS variables
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 优先选择 card-gradient-bg，其次 product-glow
      const glow = card.querySelector<HTMLElement>('.card-gradient-bg')
          || card.querySelector<HTMLElement>('.product-glow');

      if (glow) {
        glow.style.background = `
          radial-gradient(circle 300px at ${x}px ${y}px,
          rgba(99, 102, 241, 0.15),
          transparent)
        `;
      }
    });

    card.addEventListener('mouseleave', () => {
      const glow = card.querySelector<HTMLElement>('.card-gradient-bg')
          || card.querySelector<HTMLElement>('.product-glow');

      if (glow) {
        glow.style.transition = 'background 0.4s ease-out';
        glow.style.background = 'transparent';

        setTimeout(() => {
          glow.style.transition = '';
        }, 400);
      }
    });
  });
}

// 你补上的这段没问题
window.addEventListener('DOMContentLoaded', () => {
  initCardEffects();
});

// =========================
//   统计数字动画初始化函数
// =========================
function initStatNumberAnimation() {
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };

  const numberAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target as HTMLElement; // ✅ 类型断言
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

    // 淡入动画
    element.style.opacity = progress.toString();
    element.style.transform = `translateY(${20 * (1 - progress)}px)`;

    // 数字变化（如果有 targetNumber）
    if (targetNumber !== null) {
      const startValue = Math.floor(targetNumber * 0.8);
      const current = Math.floor(progress * (targetNumber - startValue) + startValue);
      element.textContent = current + '+';
    }

    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      // 最终值
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
      if (targetNumber !== null) {
        element.textContent = targetNumber + '+';
      }
    }
  };

  requestAnimationFrame(step);
}

window.addEventListener('DOMContentLoaded', () => {
  initStatNumberAnimation();
});

// ===============================
// FAQ 开关逻辑（封装）
// ===============================
function initFAQToggle() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    item.addEventListener('click', () => {
      console.log('点击FAQ项');

      // 关闭其他 FAQ
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      // 切换当前项
      item.classList.toggle('active');

      console.log('FAQ状态:', item.classList.contains('active') ? '打开' : '关闭');
    });
  });
}

window.addEventListener('DOMContentLoaded', () => {
  initFAQToggle();
});

// function showSection(section: string) {
//   currentSection.value = section
// }
//
// // 公告数据配置（内嵌备用数据）
// let announcementsData = [];
// let currentCategory = 'all';
//
// // 备用公告数据（当fetch失败时使用）
// const fallbackAnnouncementsData = [
//   {
//     "id": "welcome-to-uupay-2025",
//     "title": "欢迎使用 UUPAY 数字支付平台",
//     "excerpt": "感谢您选择 UUPAY！我们致力于为全球用户提供安全、快捷的数字支付解决方案。本文将介绍 UUPAY 的核心功能和使用指南。",
//     "category": "news",
//     "date": "2025-01-15",
//     "author": "UUPAY 团队",
//     "file": "welcome-to-uupay-2025.md"
//   },
//   {
//     "id": "new-virtual-card-feature",
//     "title": "全新虚拟卡功能上线",
//     "excerpt": "我们很高兴地宣布，UUPAY 虚拟卡功能正式上线！用户现在可以即时创建虚拟卡，用于在线支付和订阅服务。",
//     "category": "feature",
//     "date": "2025-01-10",
//     "author": "产品团队",
//     "file": "new-virtual-card-feature.md"
//   },
//   {
//     "id": "security-update-202501",
//     "title": "重要安全更新通知",
//     "excerpt": "为了保护您的账户安全，我们将在 2025 年 1 月 20 日进行系统安全升级。本次更新将增强多重身份验证机制。",
//     "category": "security",
//     "date": "2025-01-08",
//     "author": "安全团队",
//     "file": "security-update-202501.md"
//   },
//   {
//     "id": "multi-currency-support",
//     "title": "多币种结算功能升级",
//     "excerpt": "UUPAY 现在支持 50+ 种法定货币和主流加密货币的自动换汇功能，让您的跨境支付更加便捷。",
//     "category": "update",
//     "date": "2025-01-05",
//     "author": "技术团队",
//     "file": "multi-currency-support.md"
//   },
//   {
//     "id": "scheduled-maintenance-jan-2025",
//     "title": "系统维护通知 - 2025年1月",
//     "excerpt": "为了提供更好的服务，我们将在 2025 年 1 月 25 日凌晨 2:00-4:00 (UTC+8) 进行系统维护，期间部分功能可能暂时不可用。",
//     "category": "maintenance",
//     "date": "2025-01-03",
//     "author": "运维团队",
//     "file": "scheduled-maintenance-jan-2025.md"
//   }
// ];
//
// // 加载公告数据
// async function loadAnnouncements() {
//   try {
//     console.log('📖 开始加载公告数据...');
//     const response = await fetch('announcements/announcements.json');
//     if (!response.ok) {
//       throw new Error('无法加载公告数据');
//     }
//     announcementsData = await response.json();
//     console.log('✅ 公告数据加载成功:', announcementsData.length, '条');
//     renderAnnouncements(currentCategory);
//   } catch (error) {
//     console.error('❌ 加载公告数据失败:', error);
//     console.log('⚠️ 使用备用数据...');
//     // 使用备用数据
//     announcementsData = fallbackAnnouncementsData;
//     renderAnnouncements(currentCategory);
//   }
// }
//
// // 渲染公告列表
// function renderAnnouncements(category) {
//   const grid = document.getElementById('announcements-grid');
//   const noAnnouncements = document.getElementById('no-announcements');
//
//   // 筛选公告
//   const filtered = category === 'all'
//       ? announcementsData
//       : announcementsData.filter(a => a.category === category);
//
//   if (filtered.length === 0) {
//     grid.innerHTML = '';
//     noAnnouncements.style.display = 'block';
//     return;
//   }
//
//   noAnnouncements.style.display = 'none';
//
//   // 渲染公告卡片
//   grid.innerHTML = filtered.map(announcement => `
//                 <div class="announcement-card" onclick="viewAnnouncement('${announcement.id}')">
//                     <div class="announcement-meta">
//                         <span class="announcement-category">
//                             <i data-lucide="${getCategoryIcon(announcement.category)}" style="width: 14px; height: 14px;"></i>
//                             ${getCategoryName(announcement.category)}
//                         </span>
//                         <span class="announcement-date">
//                             <Calendar />
//                             ${announcement.date}
//                         </span>
//                     </div>
//                     <h3 class="announcement-title">${announcement.title}</h3>
//                     <p class="announcement-excerpt">${announcement.excerpt}</p>
//                     <div class="announcement-footer">
//                         <span class="announcement-author">
//                             <User />
//                             ${announcement.author}
//                         </span>
//                         <span class="read-more">
//                             ${t('readAll')}
//                             <ArrowRight style="width: 16px; height: 16px;" />
//                         </span>
//                     </div>
//                 </div>
//             `).join('');
//
//   // 添加鼠标跟踪效果
//   document.querySelectorAll('.announcement-card').forEach(card => {
//     card.addEventListener('mousemove', (e) => {
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       card.style.setProperty('--mouse-x', `${x}px`);
//       card.style.setProperty('--mouse-y', `${y}px`);
//     });
//   });
// }
//
// // 获取分类图标
// function getCategoryIcon(category) {
//   const icons = {
//     'update': 'refresh-cw',
//     'feature': 'sparkles',
//     'maintenance': 'settings',
//     'security': 'shield-check',
//     'news': 'newspaper'
//   };
//   return icons[category] || 'bell';
// }
//
// // 获取分类名称
// function getCategoryName(category) {
//   const names = {
//     'update': '产品更新',
//     'feature': '新功能',
//     'maintenance': '系统维护',
//     'security': '安全公告',
//     'news': '新闻动态'
//   };
//   return names[category] || '公告';
// }
//
// // 查看公告详情
// function viewAnnouncement(id) {
//   console.log('📰 查看公告:', id);
//   window.location.href = `announcement-detail.html?id=${id}`;
// }
//
// // 筛选标签点击事件
// document.querySelectorAll('.filter-tab').forEach(tab => {
//   tab.addEventListener('click', function() {
//     console.log('🔍 筛选分类:', this.dataset.category);
//
//     // 更新激活状态
//     document.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
//     this.classList.add('active');
//
//     // 渲染筛选后的公告
//     currentCategory = this.dataset.category;
//     renderAnnouncements(currentCategory);
//   });
// });
//
// // 页面加载完成后加载公告
// document.addEventListener('DOMContentLoaded', () => {
//   loadAnnouncements();
// });
</script>
<template>
  <div class="app-root" id="copy-layer">
    <!-- 鼠标光标效果 -->
    <div class="cursor-glow"></div>

    <!-- 粒子背景 -->
    <canvas id="particles"></canvas>

    <!-- 网格背景 -->
    <div class="grid-background"></div>

    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="container">
        <div class="nav-content">
          <a href="index.html" class="logo">
            <img src="@/assets/images/logo.png" alt="UUPAY Logo">
            <span>UUPAY</span>
          </a>

          <ul class="nav-links">
            <li><a href="#about" >{{t('about')}}</a></li><!-- 有announcement加@click.prevent="showSection('other')" -->
            <li><a href="#features">{{t('product')}}</a></li>
            <li><a href="#security">{{t('security')}}</a></li>
            <li><a href="#contact">{{t('contact')}}</a></li>
<!--            <li><a href="#announcement">{{t('announcementCenter')}}</a></li>-->
          </ul>

          <div class="nav-right">
            <div class="language-selector">
              <button class="language-btn language-icon-btn">
                <Globe />
              </button>
              <div class="language-dropdown">
                <template v-for="item in languageList">
                  <div @click="changeLanguage(item)" :class="['lang-option', selectedLanguage === item.value ? 'active' : '']">
                    <span>{{ item.label }}</span>
                    <div v-if="selectedLanguage === item.value" class="check-icon"><Check /></div>
                  </div>
                </template>
              </div>
            </div>
            <button class="cta-button" @click="goToAppStore">{{t('start')}}</button>
          </div>
        </div>
      </div>
    </nav>

    <!-- hero -->
    <section class="hero"> <!-- 显示announcemnent用v-show="currentSection === 'other'" -->
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

<!--          <div class="download-btn">-->
<!--            <div @click="iosDownload" style="margin-right: 25.51px">-->
<!--              <img src="@/assets/images/download-ios-web.png" alt=""/>-->
<!--            </div>-->
<!--            <div @click="androidDownload">-->
<!--              <img src="@/assets/images/download-android-web.png" alt=""/>-->
<!--            </div>-->
<!--          </div>-->

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
            <button class="product-btn">
              <span>{{t('learnMore')}}</span>
              <ArrowRight class="btn-icon" />
            </button>
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
            <button class="product-btn">
              <span>{{t('learnMore')}}</span>
              <ArrowRight class="btn-icon" />
            </button>
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
            <button class="product-btn">
              <span>{{t('learnMore')}}</span>
              <ArrowRight class="btn-icon" />
            </button>
            <div class="product-overlay"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 安全保障 -->
    <section id="security" class="security-section">
      <div class="container">
        <div class="security-content">
          <div class="security-text">
            <span class="section-tag">{{t('securityFirst')}}</span>
            <h2 class="section-title">{{t('safety')}}</h2>
            <p class="security-description">
              {{t('safetyPurpose')}}
            </p>

            <div class="security-features">
              <div class="security-item">
                <div class="security-item-icon">
                  <Lock />
                </div>
                <div class="security-item-content">
                  <h4>{{t('realTimeEncry')}}</h4>
                  <p>{{t('realTimeEncryPurpose')}}</p>
                </div>
              </div>

              <div class="security-item">
                <div class="security-item-icon">
                  <BrainCircuit />
                </div>
                <div class="security-item-content">
                  <h4>{{t('riskControl')}}</h4>
                  <p>{{t('riskControlPurpose')}}</p>
                </div>
              </div>

              <div class="security-item">
                <div class="security-item-icon">
                  <Fingerprint />
                </div>
                <div class="security-item-content">
                  <h4>{{t('multiFactor')}}</h4>
                  <p>{{t('multiFactorPurpose')}}</p>
                </div>
              </div>

              <div class="security-item">
                <div class="security-item-icon">
                  <Settings />
                </div>
                <div class="security-item-content">
                  <h4>{{t('cardManage')}}</h4>
                  <p>{{t('cardManagePurpose')}}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="security-visual">
            <div class="security-badge">
              <div class="badge-icon">
                <ShieldCheck />
              </div>
              <div class="badge-text">PCI DSS<br>Certified</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 使命愿景 -->
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

    <!-- 我们的团队来自 -->
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

    <!-- 常见问题 -->
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

    <!-- 联系我们 -->
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="contact-content">
          <div class="contact-cta">
            <h2>{{t('ready')}}</h2>
            <p>{{t('expNewDigitalPay')}}</p>
            <div class="contact-buttons">
              <button @click="goToAppStore" class="contact-primary-btn">
                <span>{{t('start')}}</span>
                <ArrowRight class="btn-icon" />
              </button>
              <button @click="openCustomerService" class="contact-secondary-btn">
                <MessageCircle class="btn-icon-left" />
                <span>{{t('contactCs')}}</span>
              </button>
            </div>
          </div>

          <div class="footer-links">
            <div class="footer-column">
              <h4>{{t('productSecond')}}</h4>
              <ul>
                <li><a href="#features">{{t('pay')}}</a></li>
                <li><a href="#features">{{t('card')}}</a></li>
                <li><a href="#features">{{t('wallet')}}</a></li>
                <li><a href="#features">{{t('transfer')}}</a></li>
              </ul>
            </div>

            <div class="footer-column">
              <h4>{{t('support')}}</h4>
              <ul>
                <li><a href="#">{{t('helpCenter')}}</a></li>
                <li><a href="#">{{t('apiDoc')}}</a></li>
                <li><a href="#">{{t('devState')}}</a></li>
                <li><a href="#">{{t('statusCheck')}}</a></li>
              </ul>
            </div>

            <div class="footer-column">
              <h4>{{t('company')}}</h4>
              <ul>
                <li><a href="#about">{{t('about')}}</a></li>
                <li><a href="#">{{t('team')}}</a></li>
                <li><a href="#">{{t('partner')}}</a></li>
                <li><a href="#">{{t('joinUs')}}</a></li>
              </ul>
            </div>

            <div class="footer-column">
              <h4>{{t('contactType')}}</h4>
              <ul>
                <li><a href="https://uupay.cc">uupay.cc</a></li>
                <li><a href="mailto:uupay9999@gmail.com">uupay9999@gmail.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

<!--    <section id="announcement" class="announcements-hero" v-show="currentSection === 'announcement'">-->
<!--      <div class="container">-->
<!--        <h1>📢 {{t('announcementCenter')}}</h1>-->
<!--        <p>{{t('announceTitle')}}</p>-->
<!--      </div>-->
<!--    </section>-->

<!--    <section class="announcements-container" v-show="currentSection === 'announcement'">-->
<!--      <div class="container">-->
<!--        &lt;!&ndash; 分类筛选 &ndash;&gt;-->
<!--        <div class="filter-tabs">-->
<!--          <button class="filter-tab active" data-category="all">{{t('all')}}</button>-->
<!--          <button class="filter-tab" data-category="update">{{t('renew')}}</button>-->
<!--          <button class="filter-tab" data-category="feature">{{t('newFunction')}}</button>-->
<!--          <button class="filter-tab" data-category="maintenance">{{t('maintenance')}}</button>-->
<!--          <button class="filter-tab" data-category="security">{{t('safetyAnnounce')}}</button>-->
<!--        </div>-->

<!--        &lt;!&ndash; 公告卡片网格 &ndash;&gt;-->
<!--        <div class="announcements-grid" id="announcements-grid">-->
<!--          &lt;!&ndash; 通过 JavaScript 动态加载 &ndash;&gt;-->
<!--        </div>-->

<!--        &lt;!&ndash; 无公告提示 &ndash;&gt;-->
<!--        <div class="no-announcements" id="no-announcements" style="display: none;">-->
<!--          <i data-lucide="inbox"></i>-->
<!--          <p>{{t('noAnnounce')}}</p>-->
<!--        </div>-->
<!--      </div>-->
<!--    </section>-->

    <!-- footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-left">
            <div class="footer-legal">
              <a href="#" data-i18n="footer.privacy">{{t('privacy')}}</a>
              <span>|</span>
              <a href="#" data-i18n="footer.terms">{{t('terms')}}</a>
              <span>|</span>
              <a href="#" data-i18n="footer.cookies">{{t('cookie')}}</a>
            </div>
            <div class="footer-copyright" data-i18n="footer.copyright">
              © UUPAY 2025
            </div>
          </div>

          <div class="footer-social">
            <a href="#" class="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <Twitter />
            </a>
            <a href="#" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <Facebook />
            </a>
            <a href="#" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <Linkedin />
            </a>
            <a href="#" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <Instagram />
            </a>
            <a href="#" class="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <Github />
            </a>
            <a href="#" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
              <Youtube />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
#particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1; /* 放在背景 */
}
</style>
