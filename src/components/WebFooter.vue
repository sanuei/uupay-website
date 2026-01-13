<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {useI18n} from "vue-i18n";
import {computed} from "vue";

const { locale, t } = useI18n()

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
            <a href="#" data-i18n="footer.privacy">{{t('privacy')}}</a>
            <span>|</span>
            <a href="#" data-i18n="footer.terms">{{t('terms')}}</a>
            <span>|</span>
            <a href="#" data-i18n="footer.cookies">{{t('cookie')}}</a>
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
    border-top: 1px solid var(--border-color);
    padding: 2rem 0;
}

.footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.footer-left {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.footer-legal {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    color: var(--text-tertiary);
    font-size: var(--font-size-small);
    font-weight: 500;
}

.footer-legal a {
    color: var(--text-tertiary);
    text-decoration: none;
    transition: color 0.3s ease;
}

.footer-legal a:hover {
    color: var(--text-primary);
}

.footer-copyright {
    color: var(--text-tertiary);
    font-size: var(--font-size-small);
    font-weight: 600;
}

.footer-social {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.social-link {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(71, 198, 143, 0.05);
    border: 1px solid rgba(71, 198, 143, 0.15);
    border-radius: 12px;
    color: var(--text-secondary);
    transition: all 0.3s ease;
    text-decoration: none;
}

.social-link:hover {
    background: rgba(71, 198, 143, 0.15);
    border-color: var(--primary-color);
    color: var(--primary-color);
    transform: translateY(-3px);
}

.social-link svg {
    width: 20px;
    height: 20px;
    stroke-width: 2;
}
</style>
