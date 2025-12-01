<script setup lang="ts">
import {BrainCircuit, Fingerprint, Lock, Settings, ShieldCheck} from "lucide-vue-next";
import {useI18n} from "vue-i18n";

const { t } = useI18n()
</script>

<template>
  <section id="security" class="security-section">
    <div class="container">
      <div class="security-content">
        <div class="security-text">
          <span class="section-tag">{{t('securityFirst')}}</span>
          <h2 class="section-title">{{t('safety')}}</h2>
          <p class="security-description">
            {{t('safetyPurpose')}}
          </p>

          <div class="security-features">
            <div class="security-item">
              <div class="security-item-icon">
                <Lock />
              </div>
              <div class="security-item-content">
                <h4>{{t('realTimeEncry')}}</h4>
                <p>{{t('realTimeEncryPurpose')}}</p>
              </div>
            </div>

            <div class="security-item">
              <div class="security-item-icon">
                <BrainCircuit />
              </div>
              <div class="security-item-content">
                <h4>{{t('riskControl')}}</h4>
                <p>{{t('riskControlPurpose')}}</p>
              </div>
            </div>

            <div class="security-item">
              <div class="security-item-icon">
                <Fingerprint />
              </div>
              <div class="security-item-content">
                <h4>{{t('multiFactor')}}</h4>
                <p>{{t('multiFactorPurpose')}}</p>
              </div>
            </div>

            <div class="security-item">
              <div class="security-item-icon">
                <Settings />
              </div>
              <div class="security-item-content">
                <h4>{{t('cardManage')}}</h4>
                <p>{{t('cardManagePurpose')}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="security-visual">
          <div class="security-badge">
            <div class="badge-icon">
              <ShieldCheck />
            </div>
            <div class="badge-text">PCI DSS<br>Certified</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
