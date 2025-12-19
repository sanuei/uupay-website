<script setup lang="ts">
import { Check, Globe } from "lucide-vue-next";
import {computed, onMounted, ref} from "vue";
import { useI18n } from "vue-i18n";
import { DOWNLINK } from "@/constants";
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

const languageList = computed(() => [
  { label: t('language.zh'), value: 'zh-cn' },
  { label: t('language.zhtw'), value: 'zh-tw' },
  { label: t('language.en'), value: 'en' },
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

onMounted(() => {
  const el = document.getElementById('copy-layer');
  if (el) {
    el.addEventListener('click', copyInvitationCode);
  }
});

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

const goSection = async (sectionId: string) => {
  const route = router.currentRoute.value;

  if (route.name === 'Home' || route.name === 'WebPage') {
    const el = document.querySelector(`#${sectionId}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  await router.push({
    name: `Home`,
    hash: route.hash,
    query: route.query
  });

  const el = document.querySelector(`#${sectionId}`);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

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
  <nav class="navbar">
    <div class="container">
      <div class="nav-content">
        <a data-section="hero" @click.prevent="goSection('hero')" class="logo">
          <img src="@/assets/images/logo.png" alt="UUPAY Logo">
          <span>UUPAY</span>
        </a>

        <ul class="nav-links">
          <li><a data-section="about-us" @click="goToAboutUs">{{t('about')}}</a></li>
          <li><a data-section="features" @click.prevent="goSection('features')">{{t('product')}}</a></li>
          <li><a data-section="security" @click.prevent="goSection('security')">{{t('security')}}</a></li>
          <li><a data-section="contact" @click.prevent="goSection('contact')">{{t('contact')}}</a></li>
          <li><a data-section="partner" @click="goToPartner">{{t('partnerPage.partnerHead')}}</a></li>
          <li><a data-section="announcement" @click="goToAnnouncement">{{t('announcementCenter')}}</a></li>
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
</template>

<style scoped>

</style>
