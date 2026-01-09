<script setup lang="ts">
import {ArrowRight, MessageCircle} from "lucide-vue-next";
import {DOWNLINK} from "@/constants";
import {useI18n} from "vue-i18n";

const { t } = useI18n()

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

      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
    padding: 8rem 0 6rem;
}

.contact-content {
    display: flex;
    flex-direction: column;
    gap: 5rem;
}

.contact-cta {
    text-align: center;
    max-width: 800px;
    margin: 0 auto;
}

.contact-cta h2 {
    font-size: var(--font-size-h1);
    font-weight: 900;
    margin-bottom: 1.5rem;
    letter-spacing: -0.03em;
    line-height: var(--line-height-tight);
}

.contact-cta>p {
    color: var(--text-secondary);
    font-size: var(--font-size-body-lg);
    margin-bottom: 3rem;
    line-height: var(--line-height-relaxed);
    font-weight: 400;
}

.contact-buttons {
    display: flex;
    gap: 1.5rem;
    justify-content: center;
    flex-wrap: wrap;
}

.contact-primary-btn,
.contact-secondary-btn {
    padding: 1.25rem 3rem;
    border-radius: 14px;
    font-size: 1.0625rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
}

.contact-primary-btn {
    background: var(--primary-color);
    color: #000000;
    border: none;
}

.contact-primary-btn:hover {
    background: var(--primary-light);
    transform: translateY(-3px);
}

.contact-secondary-btn {
    background: transparent;
    color: var(--text-primary);
    border: 2px solid var(--border-light);
}

.contact-secondary-btn:hover {
    border-color: var(--primary-color);
    background: rgba(71, 198, 143, 0.05);
    transform: translateY(-3px);
}

/* .footer-links styles removed, now handled by WebSitemap.vue */

</style>
