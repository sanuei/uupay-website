<script setup lang="ts">
import {ArrowRight, ChartColumn, CodeXml, CreditCard, Globe, ShieldCheck, Zap} from "lucide-vue-next";
import {useI18n} from "vue-i18n";

const { t } = useI18n()
</script>

<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{t('aboutPay')}}</span>
        <h2 class="section-title">{{t('newDigitalSolution')}}</h2>
        <p class="section-description">{{t('introduce2')}}</p>
      </div>

      <div class="features-grid">
        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon"><CreditCard /></div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('multiCollection')}}</h3>
          <p>{{t('payPurpose')}}</p>
          <div class="feature-arrow"><ArrowRight /></div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <Zap />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('paymentExp')}}</h3>
          <p>{{t('paymentExpPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <Globe />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('globalSupport')}}</h3>
          <p>{{t('globalSupportPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <CodeXml />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('friendlyDev')}}</h3>
          <p>{{t('friendlyDevPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <ShieldCheck />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('businessSecurity')}}</h3>
          <p>{{t('businessSecurityPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>

        <div class="feature-card" data-tilt>
          <div class="card-gradient-bg"></div>
          <div class="feature-icon-wrapper">
            <div class="feature-icon">
              <ChartColumn />
            </div>
            <div class="icon-ring"></div>
          </div>
          <h3>{{t('dataVisual')}}</h3>
          <p>{{t('dataVisualPurpose')}}</p>
          <div class="feature-arrow">
            <ArrowRight />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
