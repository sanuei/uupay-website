<script setup lang="ts">
import {Facebook, Github, Instagram, Linkedin, Twitter, Youtube} from "lucide-vue-next";
import {useI18n} from "vue-i18n";

const { t } = useI18n()
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
          <a href="#" class="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
            <Twitter />
          </a>
          <a href="#" class="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
            <Facebook />
          </a>
          <a href="#" class="social-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
            <Linkedin />
          </a>
          <a href="#" class="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
            <Instagram />
          </a>
          <a href="#" class="social-link" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
            <Github />
          </a>
          <a href="#" class="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
            <Youtube />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>

</style>
