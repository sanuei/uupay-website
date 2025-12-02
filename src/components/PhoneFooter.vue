<script setup lang="ts">
import {useI18n} from "vue-i18n";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
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
            © UUPAY 2025
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

</style>
