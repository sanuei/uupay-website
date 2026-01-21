<script setup lang="ts">
import {APPNAME, DOWNLINK, API_URL} from "@/constants";
import {computed, nextTick, onMounted, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import { getCaptchaTypeBasedOnOS } from '@/components/verification/utils/CaptchaUtils';
import Verify from '@/components/verification/Verify.vue';
import { MetaPixel } from "@/utils/metaPixel.ts";
import { useRoute } from "vue-router";

const { t, locale } = useI18n()
const route = useRoute()
const pixelId = route.query.fb_dynamic_pixel as string | undefined

onMounted(() => {
  if (pixelId) {
    loadMetaPixel(pixelId)
  }
})

const loadMetaPixel = (pixelId: string) => {
  if (!pixelId) return
  if (typeof window.fbq === 'function') return

  const w = window
  const d = document

  w.fbq = function (...args: any[]) {
    ;(w.fbq as any).callMethod
        ? (w.fbq as any).callMethod.apply(w.fbq, args)
        : (w.fbq as any).queue.push(args)
  } as any

  ;(w.fbq as any).queue = []
  ;(w.fbq as any).loaded = true
  ;(w.fbq as any).version = '2.0'

  const script = d.createElement('script')
  script.async = true
  script.src = 'https://connect.facebook.net/en_US/fbevents.js'

  const firstScript = d.getElementsByTagName('script')[0]
  firstScript?.parentNode?.insertBefore(script, firstScript)

  const fbq = w.fbq as (...args: any[]) => void
  fbq('init', pixelId)
  fbq('track','PageView')
}

const props = defineProps<{
  currentLanguage: string
}>()

const emit = defineEmits<{
  (e: 'onSwitchLanguage', lang: string): void
}>()

onMounted(() => {
  let lang = ''
  if(selectedLanguage.value === 'zh-cn'){
    lang = '简体中文'
  } else if(selectedLanguage.value === 'zhtw'){
    lang = '繁體中文'
  } else if(selectedLanguage.value === 'th'){
    lang = 'ไทย'
  } else if(selectedLanguage.value === 'pt'){
    lang = 'Português'
  } else if(selectedLanguage.value === 'es'){
    lang = 'Español'
  } else if(selectedLanguage.value === 'tr'){
    lang = 'Türkçe'
  } else if(selectedLanguage.value === 'fr'){
    lang = 'Français'
  } else if(selectedLanguage.value === 'ja'){
    lang = '日本語'
  } else if(selectedLanguage.value === 'ko'){
    lang = '한국어'
  } else if(selectedLanguage.value === 'de'){
    lang = 'Deutsch'
  } else if(selectedLanguage.value === 'ar'){
    lang = 'العربية'
  } else {
    lang = 'English'
  }
  let newLang = {label: lang, value: selectedLanguage.value}
  setLanguage(newLang)
});

const selectedLanguage = ref(props.currentLanguage)

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

// 语言菜单功能函数
function toggleLangMenu(): void {
  const menu = document.getElementById('langMenu')
  const icon = document.getElementById('langIcon')

  // 如果元素不存在，直接返回
  if (!menu || !icon) return

  if (menu.classList.contains('hidden')) {
    menu.classList.remove('hidden')
    // 用 setTimeout 保证 transition 动画生效
    setTimeout(() => icon.classList.add('rotate-180'), 10)
  } else {
    menu.classList.add('hidden')
    icon.classList.remove('rotate-180')
  }
}

function closeLangMenu() {
  const menu = document.getElementById('langMenu');
  const icon = document.getElementById('langIcon');

  if (!menu || !icon) return;

  menu.classList.add('hidden');
  icon.classList.remove('rotate-180');
}

function setLanguage(lang: any) {
  const el = document.getElementById('currentLang');
  if (el) {
    el.textContent = lang.label;
  }
  emit('onSwitchLanguage', lang.value || lang)
  selectedLanguage.value = lang.value
}

// 点击外部区域时关闭语言菜单
document.addEventListener('click', function(event) {
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');

  // 检查点击是否在按钮和菜单外部
  if (!langBtn || !langMenu) return;

  const target = event.target as Node;

  if (!langBtn.contains(target) && !langMenu.contains(target)) {
    closeLangMenu();
  }
});

// 滚动到注册表单区域
function scrollToRegistration() {
  const registrationSection = document.getElementById('registrationSection');
  if (registrationSection) {
    registrationSection.scrollIntoView({
      behavior: 'smooth',
      block: 'center'
    });
    // 聚焦到邮箱输入框
    setTimeout(() => {
      document.getElementById('emailInput')?.focus();
    }, 500);
  }
}

const email = ref('')
const code = ref('')
const password = ref('')
const referralCode = ref('')
const isEmailValid = ref(false)

const codeSection = ref<HTMLElement | null>(null)
const passwordSection = ref<HTMLElement | null>(null)
const showSuccessPopup = ref(false);
const showErrorMsg = ref('');

// 邮箱校验
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// 监听 email 变化
watch(email, (val) => {
  isEmailValid.value = emailRegex.test(val)

  if (!codeSection.value) return
  if (!passwordSection.value) return

  if (isEmailValid.value) {
    // 显示验证码区域，淡入 + 上滑动画
    if (codeSection.value.classList.contains('hidden')) {
      codeSection.value.classList.remove('hidden')
      codeSection.value.style.opacity = '0'
      codeSection.value.style.transform = 'translateY(-10px)'
      setTimeout(() => {
        if (!codeSection.value) return
        codeSection.value.style.transition = 'all 0.3s ease-out'
        codeSection.value.style.opacity = '1'
        codeSection.value.style.transform = 'translateY(0)'
      }, 10)
    }
    if (passwordSection.value.classList.contains('hidden')) {
      passwordSection.value.classList.remove('hidden')
      passwordSection.value.style.opacity = '0'
      passwordSection.value.style.transform = 'translateY(-10px)'
      setTimeout(() => {
        if (!passwordSection.value) return
        passwordSection.value.style.transition = 'all 0.3s ease-out'
        passwordSection.value.style.opacity = '1'
        passwordSection.value.style.transform = 'translateY(0)'
      }, 10)
    }
  } else {
    // 隐藏验证码区域
    if (!codeSection.value.classList.contains('hidden')) {
      codeSection.value.style.opacity = '0'
      codeSection.value.style.transform = 'translateY(-10px)'
      setTimeout(() => {
        codeSection.value?.classList.add('hidden')
      }, 300)
    }
    if (!passwordSection.value.classList.contains('hidden')) {
      passwordSection.value.style.opacity = '0'
      passwordSection.value.style.transform = 'translateY(-10px)'
      setTimeout(() => {
        passwordSection.value?.classList.add('hidden')
      }, 300)
    }
  }
})


// 验证码系统
const countdown = ref(0)
let countdownTimer: number | null = null;
const buttonText = ref(t('invite.send'))
const verifyRef = ref<any>(null);
const showPassword = ref(false)

function sendVerificationCode() {
  // 验证邮箱格式
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.value || !emailRegex.test(email.value)) {
    showMessage('请输入有效的邮箱地址', 'error', 'emailMessage');
    return;
  }
  verifyRef.value?.show();
  // sendVerificationCodeFunction()

  // generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
  // console.log('验证码已生成（模拟）：', generatedCode);
  //
}

function updateCountdown() {
  if (countdown.value > 0) {
    buttonText.value = `${countdown.value}${t('invite.second')}`;
    countdown.value--;
    countdownTimer = setTimeout(updateCountdown, 1000);
  } else {
    buttonText.value = t('invite.send');
    const sendCodeBtn = document.getElementById('sendCodeBtn') as HTMLButtonElement | null;
    if (sendCodeBtn) sendCodeBtn.disabled = false;
    if (countdownTimer) {
      clearTimeout(countdownTimer)
      countdownTimer = null
    }
  }
}

function showMessage(text: any, type: any, column: any) {
  const codeMessage = document.getElementById(column) as HTMLParagraphElement | null;
  if (!codeMessage) return;
  codeMessage.textContent = text;
  codeMessage.className = `text-xs mt-2 ${type === 'error' ? 'text-red-400' : 'text-brand-400'}`;
  codeMessage.classList.remove('hidden');

  setTimeout(() => {
    codeMessage.classList.add('hidden');
  }, 5000);
}

// 表单提交处理器
function handleSubmit() {
  if (!email.value) {
    showMessage(t('invite.emailInsert'), 'error', 'emailMessage')
    return
  }
  if (!code.value) {
    showMessage(t('invite.codeInsert'), 'error', 'codeMessage')
    return
  }

  if (!password.value) {
    showMessage(t('invite.passwordInsert'), 'error', 'passwordMessage')
    return
  }

  if (/^\S{8,20}$/.test(password.value)) {

  } else {
    showMessage(t('invite.passwordError'), 'error', 'passwordMessage')
    return
  }

  goRegister()
}

const openApp = () => {
  let hasOpened = false
  let timer: number

  const onHide = () => {
    hasOpened = true
    clearTimeout(timer)
    document.removeEventListener('visibilitychange', onHide)
    window.removeEventListener('blur', onHide)
  }

  document.addEventListener('visibilitychange', onHide)
  window.addEventListener('blur', onHide)

  try {
    window.location.href = APPNAME + '://'
  } catch (e) {
    console.warn('尝试直接赋 href 唤起失败', e)
  }

  timer = window.setTimeout(() => {
    if (!hasOpened) {
      document.removeEventListener('visibilitychange', onHide)
      window.removeEventListener('blur', onHide)

      goToAppStore()
    }
  }, 1000)
}

const goToAppStore = () => {
  const isIOS = /iPhone|iPad|iPod|Macintosh/i.test(navigator.userAgent)
  MetaPixel.download()

  setTimeout(() => {
    if (isIOS) {
      window.location.href = 'https://apps.apple.com/app/id6749419646'
    } else {
      setTimeout(() => {
        alert('注册成功')

      }, 1500)
      window.location.href = DOWNLINK
    }
  }, 200)
}


const showReferral = ref(false)
const referralSection = ref<HTMLElement | null>(null)
const referralArrow = ref<SVGSVGElement | null>(null)
const showToast = ref(false)

const toggleReferralCode = async () => {
  showReferral.value = !showReferral.value
  await nextTick()

  if (!referralSection.value || !referralArrow.value) return

  if (showReferral.value) {
    referralSection.value.style.maxHeight = '0px'
    referralArrow.value.style.transform = 'rotate(180deg)'
    referralSection.value.classList.remove('hidden')
    setTimeout(() => {
      if (!referralSection.value) return
      referralSection.value.style.transition = 'max-height 0.3s ease-out'
      referralSection.value.style.maxHeight = '100px'
    }, 10)
  } else {
    referralSection.value.style.maxHeight = '0px'
    referralArrow.value.style.transform = 'rotate(0deg)'
    setTimeout(() => {
      referralSection.value?.classList.add('hidden')
    }, 300)
  }
}

const copyReferralCode = async () => {
  const input = document.getElementById('referralInput') as HTMLInputElement
  if (!input) return
  await navigator.clipboard.writeText(input.value)

  showToast.value = true
  setTimeout(() => showToast.value = false, 1500)
}

const getInvitationCode = (): string | null => {
  return new URLSearchParams(window.location.search).get('invitationCode')
}

onMounted(() => {
  const code = getInvitationCode()
  if (code) {
    referralCode.value = code
  }
})

// const sendVerificationCodeFunction = async () => {
//   try {
//     const response = await fetch(`${API_URL}`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email: email.value, type: 'register', language: 'zh-CN' })
//     })
//
//     const data = await response.json().catch(() => ({}))
//
//     return {
//       ok: response.ok,
//       status: response.status,
//       data
//     }
//   } catch (err) {
//     console.error('API Error:', err)
//     return {
//       ok: false,
//       status: 0,
//       data: null,
//       error: err
//     }
//   }
// }

const onVerifySuccess = (res: any) => {
  const sendCodeBtn = document.getElementById('sendCodeBtn') as HTMLButtonElement | null;
  const param = {
    account: email.value,
    type: 'email',
    code: res.captchaVerification,
  };

  fetch(`${API_URL}/register/sendCode`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(param),
  })
      .then((response) => response.json())
      .then((res) => {
        if (res.code === 200) {
          showMessage(`${t('invite.codeSend')} ${email.value}`, 'success', 'codeMessage');

          countdown.value = 60;
          if (sendCodeBtn) sendCodeBtn.disabled = true;

          updateCountdown()
        } else if(res.code === 500){
          showMessage(t('invite.emailError'), 'error', 'emailMessage')
        } else {
          console.log('error',res)
        }
      })
      .catch((err) => {
        console.error(err);
      });
};

const goRegister = async () => {
  const params = {
    account: email.value,
    code: code.value,
    type: 'email',
    loginPassword: password.value,
    invitationCode: referralCode.value,
  };

  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    const result = await response.json();

    if (result.code === 200) {
      MetaPixel.registration()
      showSuccessPopup.value = true;
      email.value = ''
      code.value = ''
      password.value = ''
    } else if (result.code === 500) {
      if(result.msg === '无效邀请码') {
        showErrorMsg.value = result.msg
        showSuccessPopup.value = true;
      } else {
        showMessage(t('invite.codeError'), 'error', 'codeMessage')
      }

    } else {
      console.log('注册失败')
    }
  } catch (err) {
    console.error(err);
  }
};

const handlePopupConfirm = () => {
  showSuccessPopup.value = false;
  if(showErrorMsg.value){
    return
  }
  openApp();
};
</script>

<template>
  <div style="background-color: #fafafa">
    <div class="bg-noise"></div>

    <div class="fixed inset-0 z-[-2] overflow-hidden">
      <div class="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-brand-100/50 rounded-full mix-blend-multiply filter blur-[80px] animate-blob"></div>
      <div class="absolute top-[10%] right-[-20%] w-[70vw] h-[70vw] bg-blue-50/60 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
      <div class="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] bg-purple-50/40 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-4000"></div>
    </div>

    <header class="fixed top-0 left-0 right-0 z-50 glass-nav transition-all duration-500">
      <div class="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
        <div class="flex items-center space-x-2.5 group cursor-pointer">

          <img src="@/assets/images/logo.png" alt="UUPAY Logo" class="h-8 w-auto transition-transform duration-300 group-hover:scale-105">
          <span class="text-[22px] font-bold text-slate-900 tracking-tight font-sans">UUPAY</span>
        </div>

        <!-- 语言切换器 -->
        <div class="relative">
          <button id="langBtn" @click="toggleLangMenu" class="flex items-center space-x-1.5 text-xs font-medium text-slate-600 bg-white/50 border border-white/60 backdrop-blur-sm px-3 py-2 rounded-full hover:bg-white transition-all duration-300 shadow-sm">
            <span id="currentLang">简体中文</span>
            <svg id="langIcon" class="w-3 h-3 text-slate-400 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>
          <!-- 下拉菜单 -->
          <div id="langMenu" class="absolute right-0 mt-3 w-32 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-50 py-2 hidden z-50 transform origin-top-right transition-all">
            <template v-for="item in languageList">
              <button @click="setLanguage(item); closeLangMenu();" class="w-full text-left px-5 py-2.5 text-sm text-slate-600 hover:bg-brand-50 hover:text-brand-600 transition-colors flex items-center justify-between group">
                <span>{{ item.label }}</span>
                <span class="opacity-0 group-hover:opacity-100 text-brand-500 text-lg">·</span>
              </button>
            </template>
          </div>
        </div>
      </div>
    </header>

    <main class="pt-24 pb-24 max-w-md mx-auto min-h-screen relative px-5">

      <!-- 首屏主视觉区 -->
      <section class="relative text-center animate-fade-in-up pt-4">
        <!-- 标语徽章 -->
        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-50 border border-brand-100 mb-6 shadow-sm animate-pulse">
                <span class="relative flex h-2 w-2">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
                </span>
          <span class="text-[10px] font-bold tracking-wide text-brand-700 uppercase">UUPAY GLOBAL CARD</span>
        </div>

        <h1 class="text-4xl leading-[1.1] font-extrabold text-slate-900 tracking-tight mb-5">
          <span class="block text-slate-800">{{ t('invite.title') }}</span>
          <span class="block text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-brand-400 mt-1" :style="{ paddingTop: locale === 'th' ? '15px' : '0' }">{{ t('invite.title2') }}</span>
        </h1>

        <p class="text-slate-500 text-[13px] leading-relaxed mb-10 px-6 max-w-xs mx-auto" >
          {{ t('invite.subtitle') }}<br>{{ t('invite.subtitle2') }}
        </p>

        <!-- 卡片视觉容器 -->
        <div class="relative w-full aspect-[1.58/1] mb-12 group perspective-1000 px-2">
          <!-- 卡片背后的环境光晕 -->
          <div class="absolute inset-6 bg-gradient-to-r from-brand-400 to-blue-500 rounded-[30px] blur-[40px] opacity-20 transition-opacity duration-500 group-hover:opacity-40 animate-pulse"></div>
          <!-- 卡片图片 -->
          <img src="@/assets/images/uupay-card.webp" alt="UUPAY Card" class="relative w-full h-full object-contain drop-shadow-2xl rounded-2xl animate-float-card z-10 transform transition-transform duration-500 group-hover:scale-[1.02]">

          <!-- 悬浮装饰元素 -->
          <div class="absolute -right-2 top-10 bg-white/90 backdrop-blur-md p-2.5 rounded-2xl shadow-xl shadow-slate-200/50 z-20 animate-bounce border border-white" style="animation-duration: 3s;">
            <img src="@/assets/images/visa.webp" width="24" height="24" class="opacity-90" alt="" />
          </div>
        </div>

        <!-- 注册表单卡片 -->
        <div class="px-2" id="registrationSection">
          <div class="relative w-full overflow-hidden rounded-2xl bg-slate-900 p-[1px] shadow-xl shadow-slate-900/20">
            <div class="absolute inset-0 bg-gradient-to-r from-brand-500 via-blue-500 to-brand-500 opacity-20"></div>
            <div class="relative bg-slate-900 rounded-2xl px-6 py-5">
              <!-- 表单头部 -->
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2.5">
                  <span class="text-xs text-slate-400 font-medium">{{ t('invite.benefit') }}</span>
                  <span class="relative inline-flex items-center gap-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-400 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-full animate-badge-glow">
                    <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    {{ t('invite.openCard') }}
                  </span>
                </div>
              </div>

              <!-- 注册表单 -->
              <form @submit.prevent="handleSubmit" novalidate class="space-y-4">
                <!-- 邮箱输入框 -->
                <div>
                  <label class="block text-xs text-slate-400 mb-2 font-medium">{{ t('invite.email') }}</label>
                  <div class="relative">
                    <input
                        type="email"
                        name="email"
                        id="emailInput"
                        placeholder="your@email.com"
                        v-model="email"
                        class="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                        required
                    />
                    <div class="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    </div>
                  </div>
                  <p id="emailMessage" class="hidden text-xs mt-2"></p>
                </div>

                <!-- 验证码输入框（初始隐藏） -->
                <div ref="codeSection" class="hidden">
                  <label class="block text-xs text-slate-400 mb-2 font-medium">{{ t('invite.verifyCode') }}</label>
                  <div class="flex gap-2">
                    <input
                        type="text"
                        name="verifyCode"
                        id="codeInput"
                        :placeholder="t('invite.verifyHolder')"
                        v-model="code"
                        maxlength="6"
                        class="flex-1 bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                        required
                    />
                    <button
                        type="button"
                        id="sendCodeBtn"
                        @click="sendVerificationCode()"
                        class="px-4 py-3 bg-slate-800 border border-slate-700 text-brand-400 text-sm font-bold rounded-xl hover:bg-slate-700 hover:border-brand-500 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {{ buttonText }}
                    </button>
                  </div>
                  <p id="codeMessage" class="hidden text-xs mt-2"></p>
                </div>

                <div ref="passwordSection" class="hidden">
                  <label class="block text-xs text-slate-400 mb-2 font-medium">{{ t('invite.password') }}</label>

                  <div class="relative">
                    <input
                        :type="showPassword ? 'text' : 'password'"
                        name="password"
                        id="passwordInput"
                        :placeholder="t('invite.passwordHolder')"
                        v-model="password"
                        class="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
                        required
                    />

                    <!-- 眼睛图标 -->
                    <span
                        class="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
                        @click="showPassword = !showPassword"
                    >
                    <!-- 显示密码 icon -->
                    <svg v-if="!showPassword" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>

                      <!-- 隐藏密码 icon（带斜杠） -->
                      <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.058 10.058 0 012.364-3.504m1.518-1.518A9.965 9.965 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.963 9.963 0 01-4.098 4.764M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                              d="M3 3l18 18"/>
                      </svg>
                    </span>
                  </div>
                  <p id="passwordMessage" class="hidden text-xs mt-2"></p>
                </div>

                <!-- 邀请码（可折叠） -->
                <div>
                  <button
                      type="button"
                      @click="toggleReferralCode"
                      class="w-full flex items-center justify-between text-left py-2 text-slate-400 hover:text-slate-300 transition-colors"
                  >
                    <span class="text-xs font-medium flex items-center gap-2">
                      <span>{{ t('invite.inviteCode') }}</span>
                    </span>
                    <svg
                        ref="referralArrow"
                        class="w-4 h-4 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </button>

                  <div
                      ref="referralSection"
                      class="hidden overflow-hidden mt-2"
                  >
                    <div class="pt-2 space-y-2">
                      <div class="relative">
                        <input
                            type="text"
                            id="referralInput"
                            v-model="referralCode"
                            readonly
                            class="w-full bg-slate-800/50 border border-slate-700 text-slate-400 rounded-xl px-4 py-3 text-sm pr-12 cursor-not-allowed"
                        />
                        <button
                            type="button"
                            @click="copyReferralCode"
                            class="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-slate-700 rounded-lg transition-colors group"
                            :title="t('invite.copyCode')"
                        >
                          <svg
                              class="w-4 h-4 text-slate-500 group-hover:text-brand-400 transition-colors"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                          >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                        </button>
                      </div>
                      <p class="text-[10px] text-slate-500">{{ t('invite.inviteBenefit') }}</p>
                      <div
                          v-show="showToast"
                          class="text-brand-400 text-xs flex items-center gap-1"
                      >
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        <span>{{ t('invite.copyInviteCode') }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 提交按钮 -->
                <button
                    type="submit"
                    class="w-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-bold py-3.5 rounded-xl hover:from-brand-600 hover:to-brand-500 transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 flex items-center justify-center gap-2 group"
                >
                  <span>{{ t('invite.register') }}</span>
                  <svg class="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
                </button>
              </form>
            </div>
          </div>
          <p class="text-[10px] text-slate-400 mt-3 font-medium opacity-60 text-center">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-brand-500 mr-1"></span>
            {{ t('invite.userNum') }}
          </p>
        </div>
      </section>

      <!-- 信任标识 -->
      <section class="py-10">
        <p class="text-center text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-6">{{ t('invite.trustText') }}</p>
        <div class="flex justify-center items-center space-x-8 opacity-60 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
          <div style="width: 24px; height: 24px;">
            <img src="@/assets/images/visa.webp" alt="Visa" class="object-contain brightness-0 opacity-50 group-hover:brightness-100 group-hover:opacity-100 transition-all">
          </div>
          <span class="font-bold text-xl text-slate-300 italic">Netflix</span>
          <span class="font-bold text-xl text-slate-300">Spotify</span>
          <span class="font-bold text-xl text-slate-300">Amazon</span>
        </div>
      </section>

      <!-- 步骤说明区 -->
      <section class="space-y-6 pb-8">
        <div class="flex items-center justify-center space-x-4 mb-2">
          <div class="h-px w-8 bg-gradient-to-r from-transparent to-slate-200"></div>
          <h2 class="text-lg font-bold text-slate-800">{{ t('invite.step2') }}</h2>
          <div class="h-px w-8 bg-gradient-to-l from-transparent to-slate-200"></div>
        </div>

        <!-- 步骤 1 -->
        <div class="glass-card-solid rounded-3xl p-6 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:border-brand-100">
          <!-- 步骤序号 -->
          <div class="absolute top-6 left-6 w-8 h-8 rounded-full bg-slate-50 text-slate-900 font-mono font-bold flex items-center justify-center border border-slate-100 text-sm z-10">1</div>

          <div class="mt-2 flex flex-col items-center relative z-10">
            <div class="w-16 h-16 bg-gradient-to-br from-brand-50 to-white rounded-2xl flex items-center justify-center mb-4 shadow-inner border border-brand-50/50">
              <img src="@/assets/images/logo.png" class="w-8 h-8 opacity-90" alt="" />
            </div>
            <h3 class="text-lg font-bold text-slate-900 mb-1">{{ t('invite.download') }}</h3>
            <p class="text-slate-500 text-xs mb-6">{{ t('invite.assetTool') }}</p>

            <div class="grid grid-cols-2 gap-4 w-full">
              <div @click="goToAppStore" class="flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl py-3 transition-all duration-300 hover:scale-[1.02]">
                <svg class="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                <span class="text-xs font-bold text-slate-700">App Store</span>
              </div>
              <div @click="goToAppStore" class="flex items-center justify-center space-x-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl py-3 transition-all duration-300 hover:scale-[1.02]">
                <svg class="w-5 h-5 text-slate-700" viewBox="0 0 24 24" fill="currentColor"><path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/></svg>
                <span class="text-xs font-bold text-slate-700">Google Play</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 步骤 2（原步骤3） -->
        <div class="glass-card-solid rounded-3xl p-6 relative overflow-hidden group transition-all duration-300 hover:shadow-lg hover:border-purple-100">
          <div class="absolute top-6 left-6 w-8 h-8 rounded-full bg-slate-50 text-slate-900 font-mono font-bold flex items-center justify-center border border-slate-100 text-sm z-10">2</div>

          <div class="mt-2 text-center relative z-10">
            <h3 class="text-lg font-bold text-slate-900 mb-1">{{ t('invite.doneCreate') }}</h3>
            <p class="text-slate-500 text-xs mb-6">{{ t('invite.fees') }}</p>

            <!-- 信用卡预览 -->
            <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-5 text-white text-left relative overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.01]">
              <!-- 闪光效果 -->
              <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent opacity-50"></div>
              <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl"></div>

              <div class="flex items-center justify-between mb-8 relative z-10">
                <span class="text-xs font-medium tracking-wider text-slate-300">UUPAY Virtual</span>
                <img src="@/assets/images/visa.webp" width="24" height="24" class="opacity-90 bg-white/10 backdrop-blur-sm rounded px-1.5 py-0.5" alt=""/>
              </div>
              <div class="text-lg font-mono tracking-[0.15em] mb-2 text-shadow-sm">**** **** **** 8888</div>
              <div class="flex justify-between items-end relative z-10">
                <div>
                  <div class="text-[8px] opacity-50 uppercase tracking-wider mb-0.5">Card Holder</div>
                  <div class="text-[11px] font-medium tracking-wide">YOUR NAME</div>
                </div>
                <div class="text-[10px] opacity-60 font-mono">12/28</div>
              </div>
            </div>

            <button class="mt-6 w-full bg-white border border-slate-200 text-slate-900 font-bold py-3.5 rounded-xl text-sm transition-all hover:bg-slate-50 hover:border-slate-300 hover:shadow-md">
              {{ t('invite.openAcc') }}
            </button>
          </div>
        </div>
      </section>

      <!-- 功能特性网格 -->
      <section class="pb-12">
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/60 shadow-sm text-center transition-transform hover:-translate-y-1">
            <div class="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-3 text-blue-500 ring-4 ring-blue-50/50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h4 class="font-bold text-slate-800 text-sm mb-1">{{ t('invite.lowFees') }}</h4>
            <p class="text-[10px] text-slate-400 leading-relaxed"  v-html="t('invite.eachConsume').replace(/\n/g, '<br>')"></p>
          </div>
          <div class="bg-white/60 backdrop-blur-sm p-5 rounded-2xl border border-white/60 shadow-sm text-center transition-transform hover:-translate-y-1">
            <div class="w-10 h-10 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-3 text-purple-500 ring-4 ring-purple-50/50">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h4 class="font-bold text-slate-800 text-sm mb-1">{{ t('invite.globalUse') }}</h4>
            <p class="text-[10px] text-slate-400 leading-relaxed" v-html="t('invite.seamless').replace(/\n/g, '<br>')"></p>
          </div>
        </div>
      </section>
    </main>

    <div class="fixed bottom-0 left-0 right-0 z-40">
      <!-- 模糊背景渐变 -->
      <div class="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white via-white/95 to-transparent pointer-events-none"></div>

      <div class="relative max-w-md mx-auto px-5 pb-8 pt-4 flex gap-3">
        <button @click="openApp" class="flex-1 bg-white/80 backdrop-blur-xl border border-slate-200 text-slate-700 font-bold py-3.5 rounded-xl text-sm hover:bg-white hover:text-slate-900 hover:border-slate-300 transition-all shadow-sm">
          {{ t('invite.login') }}
        </button>
        <button @click="scrollToRegistration()" class="flex-[1.5] bg-slate-900 text-white font-bold py-3.5 rounded-xl text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/20 relative overflow-hidden group">
          <span class="relative z-10">{{ t('invite.register') }}</span>
          <div class="absolute inset-0 bg-gradient-to-r from-brand-600 to-brand-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>
      </div>
    </div>
  </div>
  <div v-if="showSuccessPopup" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white p-6 rounded-xl shadow-lg w-80 text-center">
      <p class="mb-4 text-black" >
        {{ showErrorMsg ? showErrorMsg :  t('invite.registerSuccess') }}
      </p>
      <button
          @click="handlePopupConfirm"
          class="w-full bg-gradient-to-r from-brand-500 to-brand-400 text-white font-bold py-3.5 rounded-xl hover:from-brand-600 hover:to-brand-500 transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 flex items-center justify-center gap-2 group"
      >
        {{ t('invite.confirm') }}
      </button>
    </div>
  </div>
  <Verify ref="verifyRef" @success="onVerifySuccess" mode="pop" :captchaType="getCaptchaTypeBasedOnOS()"></Verify>
</template>

<style scoped>
body {
  -webkit-tap-highlight-color: transparent;
  background-color: #fafafa;
}

/* 高级玻璃拟态效果 */
.glass-nav {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
}

.glass-card-solid {
  background: #ffffff;
  border: 1px solid rgba(243, 244, 246, 0.8);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
}

/* 微妙的噪点纹理，增加深度感 */
.bg-noise {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.03;
  z-index: -1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  pointer-events: none;
}

/* 平滑动画效果 */
@keyframes float-card {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-12px) rotate(1deg); }
}
.animate-float-card {
  animation: float-card 6s ease-in-out infinite;
}

/* 隐藏滚动条 */
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
