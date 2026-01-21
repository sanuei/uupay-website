<script setup lang="ts">
import { Check, Globe, Menu, X } from "lucide-vue-next";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { APPNAME, DOWNLINK } from "@/constants";
import { useRouter } from "vue-router";

const router = useRouter()

const props = defineProps<{
  currentLanguage: string
}>()

const emit = defineEmits<{
  (e: 'onSwitchLanguage', lang: string): void
}>()

const { locale, t } = useI18n()
const selectedLanguage = ref(props.currentLanguage)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const languageList = computed(() => [
  { label: t('language.zh'), value: 'zh-cn' },
  { label: t('language.zhtw'), value: 'zh-tw' },
  { label: t('language.en'), value: 'en' },
  { label: t('language.th'), value: 'th' },
  { label: t('language.pt'), value: 'pt' },
  { label: t('language.es'), value: 'es' },
  { label: t('language.tr'), value: 'tr' },
  { label: t('language.fr'), value: 'fr' },
  { label: t('language.ja'), value: 'ja' },
  { label: t('language.ko'), value: 'ko' },
  { label: t('language.de'), value: 'de' },
  { label: t('language.ar'), value: 'ar' },
])

const changeLanguage = (lang: any) => {
  emit('onSwitchLanguage', lang.value || lang)
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

const copyInvitationCode = async () => {
  const invitationCode = getInvitationCode()
  if (!invitationCode) return

  const textToCopy = window.location.href

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(textToCopy)
      return
    } catch (err) {
      console.warn('Clipboard API 失败，准备使用 fallback:', err)
    }
  }

  fallbackCopy(textToCopy)
}

const openDeepLink = () => {
  const url = window.location.href
  let deeplink = ''

  const jumpIndex = url.indexOf('jump/')
  if (jumpIndex !== -1) {
    const afterJump = url.substring(jumpIndex + 5)
    if (afterJump) {
      deeplink = `${APPNAME}://${afterJump}`
    }
  }

  if (!deeplink) {
    const queryCode = new URLSearchParams(window.location.search).get('invitationCode')
    if (queryCode) {
      deeplink = `${APPNAME}://register?invitationCode=${queryCode}`
    } else {
      const hash = window.location.hash || ''
      const hashQueryIndex = hash.indexOf('?')
      if (hashQueryIndex !== -1) {
        const hashQuery = hash.substring(hashQueryIndex + 1)
        const hashCode = new URLSearchParams(hashQuery).get('invitationCode')
        if (hashCode) {
          deeplink = `${APPNAME}://register?invitationCode=${hashCode}`
        }
      }
    }
  }

  if (!deeplink) return

  let hasOpened = false
  let timer = 0

  const onHide = () => {
    hasOpened = true
    clearTimeout(timer)
    document.removeEventListener('visibilitychange', onHide)
    window.removeEventListener('blur', onHide)
  }

  document.addEventListener('visibilitychange', onHide)
  window.addEventListener('blur', onHide)

  try {
    window.location.href = deeplink
  } catch (e) {
    console.warn('尝试直接赋 href 唤起失败（浏览器限制）', e)
  }

  timer = setTimeout(() => {
    if (!hasOpened) {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('blur', onHide)
      goToAppStore()
    }
  }, 3000)
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

onMounted(() => {
  openDeepLink()
  const el = document.getElementById('copy-layer')
  if (el) {
    el.addEventListener('click', copyInvitationCode)
  }
})

const goSection = async (sectionId: string) => {
  closeMobileMenu()
  const route = router.currentRoute.value

  if (route.name === 'Home' || route.name === 'WebPage') {
    const el = document.querySelector(`#${sectionId}`)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    return
  }

  await router.push({
    name: 'Home',
    hash: route.hash,
    query: route.query
  })

  const el = document.querySelector(`#${sectionId}`)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const goToAboutUs = async () => {
  closeMobileMenu()
  const route = router.currentRoute.value

  await router.push({
    path: `/${locale.value}/about-us`,
    hash: route.hash,
    query: route.query
  })
}

const goToPartner = async () => {
  closeMobileMenu()
  const route = router.currentRoute.value

  await router.push({
    path: `/${locale.value}/partner`,
    hash: route.hash,
    query: route.query
  })
}

const goToPromotion = async () => {
  closeMobileMenu()
  const route = router.currentRoute.value

  await router.push({
    path: `/${locale.value}/promotion`,
    hash: route.hash,
    query: route.query
  })
}
</script>

<template>
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <a data-section="hero" @click.prevent="goSection('hero')" class="logo">
          <img src="@/assets/images/logo.png" alt="UUPAY Logo">
          <span>UUPAY</span>
        </a>

        <div class="nav-right">
          <div class="language-selector">
            <button class="language-btn">
              <Globe />
            </button>
            <div class="language-dropdown">
              <template v-for="item in languageList" :key="item.value">
                <div @click="changeLanguage(item)" :class="['lang-option', selectedLanguage === item.value ? 'active' : '']">
                  <span>{{ item.label }}</span>
                  <div v-if="selectedLanguage === item.value" class="check-icon"><Check /></div>
                </div>
              </template>
            </div>
          </div>

          <!-- 汉堡菜单按钮 -->
          <button class="mobile-menu-btn" @click="toggleMobileMenu" aria-label="Toggle menu">
            <Menu v-if="!isMobileMenuOpen" />
            <X v-else />
          </button>
        </div>
      </div>
    </div>

    <!-- 移动端菜单弹出层 -->
    <Teleport to="body">
      <div v-show="isMobileMenuOpen" class="mobile-menu-overlay" @click.self="closeMobileMenu">
        <div class="mobile-menu-content">
          <button class="mobile-close-btn" @click="closeMobileMenu">
            <X />
          </button>

          <ul class="mobile-nav-links">
            <li><a @click="goSection('features')">{{t('product')}}</a></li>
            <li><a @click="goSection('security')">{{t('security')}}</a></li>
            <li class="mobile-featured"><a @click="goToPromotion">{{t('promotion.navTitle')}}</a></li>
            <li><a @click="goToPartner">{{t('partnerPage.partnerHead')}}</a></li>
            <li><a @click="goToAboutUs">{{t('about')}}</a></li>
          </ul>
          <button class="mobile-cta-button" @click="goToAppStore">{{t('start')}}</button>
        </div>
      </div>
    </Teleport>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 0.75rem 0;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.nav-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.logo img {
  height: 28px;
  width: auto;
}

.logo span {
  font-size: 1.25rem;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.02em;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.language-selector {
  position: relative;
}

.language-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.language-dropdown {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 0.5rem;
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0.5rem;
  min-width: 160px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.2s ease;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  z-index: 1000;
}

.language-selector:hover .language-dropdown {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.lang-option {
  padding: 0.75rem 1rem;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s ease;
}

.lang-option:hover,
.lang-option.active {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.check-icon {
  color: var(--primary-color, #47C68F);
  width: 16px;
  height: 16px;
}

/* 汉堡菜单按钮 */
.mobile-menu-btn {
  background: transparent;
  border: none;
  color: #fff;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-menu-btn svg {
  width: 24px;
  height: 24px;
}

/* 移动端菜单弹出层 */
.mobile-menu-overlay {
  position: fixed;
  inset: 0;
  background: rgba(10, 10, 10, 0.98);
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(20px);
}

.mobile-menu-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 2rem;
}

.mobile-close-btn {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: transparent;
  border: none;
  color: #fff;
  padding: 0.5rem;
  cursor: pointer;
}

.mobile-close-btn svg {
  width: 32px;
  height: 32px;
}

.mobile-nav-links {
  list-style: none;
  padding: 0;
  text-align: center;
  width: 100%;
}

.mobile-nav-links li {
  margin-bottom: 2rem;
  opacity: 0;
  animation: slideUp 0.5s ease forwards;
}

.mobile-nav-links li:nth-child(1) { animation-delay: 0.1s; }
.mobile-nav-links li:nth-child(2) { animation-delay: 0.2s; }
.mobile-nav-links li:nth-child(3) { animation-delay: 0.3s; }
.mobile-nav-links li:nth-child(4) { animation-delay: 0.4s; }
.mobile-nav-links li:nth-child(5) { animation-delay: 0.5s; }

.mobile-nav-links a {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease;
  display: inline-block;
}

.mobile-nav-links a:hover {
  color: var(--primary-color, #47C68F);
  transform: scale(1.1);
}

.mobile-featured a {
  color: var(--primary-color, #47C68F) !important;
}

.mobile-cta-button {
  margin-top: 3rem;
  padding: 1rem 4rem;
  background: var(--primary-color, #47C68F);
  color: #000;
  font-weight: 700;
  font-size: 1.25rem;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  opacity: 0;
  animation: slideUp 0.5s ease 0.6s forwards;
}

.mobile-cta-button:hover {
  background: #5ed9a0;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(71, 198, 143, 0.3);
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
