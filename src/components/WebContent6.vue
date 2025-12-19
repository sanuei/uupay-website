<script setup lang="ts">
import {ArrowRight, MessageCircle} from "lucide-vue-next";
import {DOWNLINK} from "@/constants";
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";

const { locale, t } = useI18n()
const router = useRouter()

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

const openCustomerService = () => {
  if (window.scBotHandler && typeof window.scBotHandler.expand === 'function') {
    window.scBotHandler.expand()
  } else {
    console.warn('客服系统尚未加载')
  }
}

const goToAnnouncement = async() => {
  const route = router.currentRoute.value;

  await router.push({
    path: `/${locale.value}/announcements`,
    hash: route.hash,
    query: route.query
  });
  const el = document.querySelector('#announcement');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

const goToAboutUs = async() => {
  const route = router.currentRoute.value;

  await router.push({
    path: `/${locale.value}/about-us`,
    hash: route.hash,
    query: route.query
  });
  const el = document.querySelector('#about-us');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

const goToPartner = async() => {
  const route = router.currentRoute.value;

  await router.push({
    path: `/${locale.value}/partner`,
    hash: route.hash,
    query: route.query
  });
  const el = document.querySelector('#partner');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
</script>

<template>
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
              <li><a data-section="announcement" @click="goToAnnouncement">{{t('announcementCenter')}}</a></li>
              <li><a href="#">{{t('helpCenter')}}</a></li>
              <li><a href="#">{{t('apiDoc')}}</a></li>
              <li><a href="#">{{t('devState')}}</a></li>
<!--              <li><a href="#">{{t('statusCheck')}}</a></li>-->
            </ul>
          </div>

          <div class="footer-column">
            <h4>{{t('company')}}</h4>
            <ul>
              <li><a data-section="about-us" @click="goToAboutUs">{{t('about')}}</a></li>
              <li><a href="#">{{t('team')}}</a></li>
              <li><a data-section="partner" @click="goToPartner">{{t('partner')}}</a></li>
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
</template>

<style scoped>

</style>
