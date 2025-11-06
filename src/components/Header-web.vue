<script setup lang="ts">
import {computed, ref} from "vue";
import {useI18n} from 'vue-i18n'
import {
  ArrowRight,
  BrainCircuit,
  ChartColumn,
  CodeXml,
  CreditCard,
  Fingerprint,
  Globe, Lock, MessageCircle, Settings,
  ShieldCheck, Smartphone, Sparkles, Star, Wallet, Zap
} from "lucide-vue-next";
import {DOWNLINK} from "@/constants";

const { locale, t } = useI18n()

const selectedLanguage = ref(localStorage.getItem('language') || 'zh')

const languageList = computed(() => [
  { label: t('language.zh'), value: 'zh' },
  { label: t('language.zhtw'), value: 'zhtw' },
  { label: t('language.en'), value: 'en' },
])

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
    // 跳 App Store
    window.location.href = 'https://apps.apple.com/app/id6749419646'
  } else {
    // 跳下载链接
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
</script>
<template>
  <div class="app-root">
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
          <div class="logo">
            <img src="@/assets/images/logo.png" alt="UUPay Logo" />
            <span>UUPay</span>
          </div>

          <ul class="nav-links">
            <li><a href="#about">{{t('about')}}</a></li>
            <li><a href="#features">{{t('product')}}</a></li>
            <li><a href="#security">{{t('security')}}</a></li>
            <li><a href="#contact">{{t('contact')}}</a></li>
          </ul>

          <div style="display: flex; justify-content: center;align-items: center;align-content: center">
            <button @click="goToAppStore" class="cta-button">{{t('start')}}</button>
            <div class="header-language">
              <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                  <img src="@/assets/images/icon-language-phone.png" style="width: 20px; height: 20px;" alt=""/>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <template v-for="item in languageList">
                      <el-dropdown-item @click="changeLanguage(item)">{{ item.label }}</el-dropdown-item>
                    </template>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- hero -->
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <div class="hero-badge">
            <!-- lucide icon uses data-lucide attr, we call lucide.createIcons() in onMounted -->
            <Sparkles class="badge-icon-svg" />
            <span>{{t('newSolution')}}</span>
          </div>

          <h1 class="hero-title">
            <span class="word-animation">
              <span class="gradient-text">{{t('oneStop')}}</span>{{t('digitalPay')}}
            </span>
            <br />
            <span class="word-animation" style="animation-delay: 0.1s;">{{t('solution')}}</span>
          </h1>

          <p class="hero-subtitle">{{t('introduce')}}</p>

          <div class="hero-buttons">
            <button @click="goToAppStore" class="primary-button" style="padding: 15px 56px">
              <span>{{t('start')}}</span>
              <div class="button-glow"></div>
            </button>
            <button @click="openCustomerService" class="secondary-button" style="padding: 15px 56px">
              <span>{{t('contactCs')}}</span>
            </button>
          </div>

          <div class="download-btn">
            <div @click="iosDownload" style="margin-right: 25.51px">
              <img src="@/assets/images/download-ios-web.png" alt=""/>
            </div>
            <div @click="androidDownload">
              <img src="@/assets/images/download-android-web.png" alt=""/>
            </div>
          </div>

          <div class="hero-stats">
            <div class="stat-item">
              <div class="stat-number" data-target="200">10</div>
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
          <div class="floating-card card-3d">
            <div class="card-shine"></div>
            <div class="card-content">
              <div class="card-chip"></div>
              <div class="card-logo">UUPay</div>
              <div class="card-number">**** **** **** 8888</div>
              <div class="card-info">
                <span>VALID THRU</span>
                <span class="card-date">12/28</span>
              </div>
            </div>
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

    <!-- 以下省略：你原始 HTML 中的 about / features / security / mission / contact / footer
         我已在 template 中保留相应结构 —— 你可以按需继续添加细节 -->
    <section id="about" class="about-section">
      <div class="container">
        <div class="section-header">
          <span class="section-tag">{{t('aboutPay')}}</span>
          <h2 class="section-title">{{t('newDigitalSolution')}}</h2>
          <p class="section-description">{{t('introduce2')}}</p>
        </div>

        <div class="features-grid">
          <!-- 这里复用你原来的 feature-card 块 -->
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
            <div class="highlight-badge">
              <Star class="badge-icon-small" />
              <span>{{t('recommend')}}</span>
            </div>
            <div class="product-glow"></div>
            <div class="product-number">02</div>
            <div class="product-header">
              <div class="product-icon-wrapper">
                <div class="product-icon">
                  <Smartphone />
                </div>
              </div>
              <h3>{{t('visualCard')}}</h3>
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
              <h4>公司</h4>
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
                <li><a href="https://uupay.com">uupay.com</a></li>
                <li><a href="mailto:hello@uupay.com">hello@uupay.com</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-legal">
            <a href="#">{{t('privacy')}}</a><span>|</span><a href="#">{{t('terms')}}</a><span>|</span><a href="#">{{t('cookie')}}</a>
          </div>
          <div class="footer-copyright">© UUPay 2025</div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.header-language {
  margin-left: 20px;
  display: flex;
  align-items: center;
}

.download-btn {
  display: flex;
  margin: 50px 0;

  img {
    width: 177.75px;
    height: 52.67px;
  }
}
</style>
