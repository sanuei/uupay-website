<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const { locale, t } = useI18n()
const router = useRouter()

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
</script>

<template>
  <div class="footer-sitemap-wrapper">
    <div class="container">
      <div class="footer-sitemap">
        <div class="footer-column">
          <h4>{{t('productSecond')}}</h4>
          <ul>
            <li><a @click.prevent="goSection('features')">{{t('pay')}}</a></li>
            <li><a @click.prevent="goSection('features')">{{t('card')}}</a></li>
            <li><a @click.prevent="goSection('features')">{{t('wallet')}}</a></li>
            <li><a @click.prevent="goSection('features')">{{t('transfer')}}</a></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>{{t('support')}}</h4>
          <ul>
            <li><a data-section="announcement" @click="goToAnnouncement">{{t('announcementCenter')}}</a></li>
            <li><span class="footer-link-disabled">{{t('helpCenter')}}</span></li>
            <li><span class="footer-link-disabled">{{t('apiDoc')}}</span></li>
            <li><span class="footer-link-disabled">{{t('devState')}}</span></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>{{t('company')}}</h4>
          <ul>
            <li><a data-section="about-us" @click="goToAboutUs">{{t('about')}}</a></li>
            <li><span class="footer-link-disabled">{{t('team')}}</span></li>
            <li><a data-section="partner" @click="goToPartner">{{t('partner')}}</a></li>
            <li><span class="footer-link-disabled">{{t('joinUs')}}</span></li>
          </ul>
        </div>

        <div class="footer-column">
          <h4>{{t('contactType')}}</h4>
          <ul>
<!--            <li><a href="https://uupay.com" target="_blank">uupay.com</a></li>-->
<!--            <li><a href="mailto:uupay9999@gmail.com">uupay9999@gmail.com</a></li>-->
            <li>
              {{t('marketCollabo')}}:
              <a href="mailto:official@uupay.com" target="_blank">official@uupay.com</a>
            </li>
            <li>
              {{t('agentRecruit')}}:
              <a href="mailto:partner@uupay.com" target="_blank">partner@uupay.com</a>
            </li>
            <li>
              {{t('customerSupport')}}:
              <a href="mailto:customerservice@uupay.com" target="_blank">customerservice@uupay.com</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.footer-sitemap-wrapper {
    padding: 6rem 0 3rem;
    border-top: 1px solid var(--border-color);
}

.footer-sitemap {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3rem;
}

.footer-column h4 {
    font-size: 1rem;
    margin-bottom: 1.5rem;
    font-weight: 700;
    color: var(--text-primary);
}

.footer-column ul {
    list-style: none;
}

.footer-column li {
    margin-bottom: 0.875rem;
}

.footer-column a {
    color: var(--text-secondary);
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    font-size: 0.875rem;
    cursor: pointer;
}

.footer-column a:hover {
    color: var(--primary-color);
    transform: translateX(4px);
}

.footer-link-disabled {
    color: var(--text-muted);
    font-size: 0.875rem;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .footer-sitemap-wrapper {
        padding: 4rem 0 2rem;
    }
    .footer-sitemap {
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem 1.5rem;
    }
}

@media (max-width: 480px) {
    .footer-sitemap {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}
</style>
