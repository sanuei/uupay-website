<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {computed} from "vue";
import {useRoute, useRouter} from 'vue-router';

const { locale, t } = useI18n()
const route = useRoute()
const router = useRouter()

const goToDoc = (slug: string) => {
  const lang = route.params.lang || 'en';
  router.push({ name: 'DocsPage', params: { lang, slug } });
}

const twitterUrl = computed(() =>
    locale.value === 'en'
        ? 'https://x.com/UUPAY_Official'
        : 'https://x.com/uupaycard'
);
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-left">
          <div class="footer-legal">
            <a href="#" @click.prevent="goToDoc('privacy')" data-i18n="footer.privacy">{{t('privacy')}}</a>
            <span>|</span>
            <a href="#" @click.prevent="goToDoc('terms')" data-i18n="footer.terms">{{t('terms')}}</a>
          </div>
          <div class="footer-copyright" data-i18n="footer.copyright">
            © UUPAY 2026
          </div>
        </div>

        <div class="footer-social">
          <a :href="twitterUrl" class="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <font-awesome-icon :icon="['fab', 'x-twitter']" style="font-size: 24px;" />
          </a>
          <a href="https://www.instagram.com/uupay_official" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <font-awesome-icon :icon="['fab', 'instagram']" style="font-size: 24px;" />
          </a>
          <a href="https://www.youtube.com/@UUPAY-Official" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <font-awesome-icon :icon="['fab', 'youtube']" style="font-size: 24px;" />
          </a>
          <a href="https://t.me/UUPAY_Telegram" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <font-awesome-icon :icon="['fab', 'telegram']" style="font-size: 24px;" />
          </a>
          <a href="https://discord.com/invite/76jMjerPMy" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <font-awesome-icon :icon="['fab', 'discord']" style="font-size: 24px;" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: rgba(0, 0, 0, 0.9);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.footer-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}

.footer-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.footer-legal {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.footer-legal a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover {
  color: var(--primary-color, #47C68F);
}

.footer-legal span {
  color: rgba(255, 255, 255, 0.3);
}

.footer-copyright {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

.footer-social {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  transition: all 0.3s ease;
}

.social-link:hover {
  background: rgba(71, 198, 143, 0.1);
  border-color: rgba(71, 198, 143, 0.3);
  color: var(--primary-color, #47C68F);
  transform: translateY(-2px);
}
</style>
