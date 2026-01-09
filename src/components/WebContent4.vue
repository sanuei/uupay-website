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
.security-section {
    padding: 12rem 0;
    position: relative;
    overflow: hidden;
    background: linear-gradient(to bottom, transparent, rgba(71, 198, 143, 0.02), transparent);
}

.security-section::before {
    content: '';
    position: absolute;
    top: -10%;
    right: -5%;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(71, 198, 143, 0.05) 0%, transparent 70%);
    z-index: 1;
    pointer-events: none;
}

.security-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    align-items: center;
    position: relative;
    z-index: 2;
}

.security-text {
    max-width: 650px;
}

.security-description {
    color: var(--text-secondary);
    font-size: 1.1875rem;
    line-height: 1.9;
    margin-bottom: 4rem;
    font-weight: 400;
    letter-spacing: -0.01em;
}

.security-features {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.security-item {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 2.5rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    backdrop-filter: blur(10px);
}

.security-item:hover {
    background: rgba(71, 198, 143, 0.05);
    border-color: rgba(71, 198, 143, 0.3);
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.security-item-icon {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(71, 198, 143, 0.1);
    border: 1px solid rgba(71, 198, 143, 0.2);
    border-radius: 16px;
    color: var(--primary-color);
    transition: all 0.4s ease;
}

.security-item-icon svg {
    width: 28px;
    height: 28px;
    stroke-width: 1.5;
}

.security-item:hover .security-item-icon {
    background: var(--primary-color);
    color: #000;
    transform: rotate(10deg);
}

.security-item-content h4 {
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    font-weight: 700;
    color: var(--text-primary);
    letter-spacing: -0.01em;
}

.security-item-content p {
    color: var(--text-secondary);
    line-height: 1.6;
    font-size: 0.9375rem;
}

.security-visual {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
}

.security-badge {
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(71, 198, 143, 0.1) 0%, transparent 70%);
    border: 2px solid rgba(71, 198, 143, 0.3);
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
    position: relative;
    backdrop-filter: blur(5px);
}

.security-badge::before {
    content: '';
    position: absolute;
    inset: -30px;
    border: 1px dashed rgba(71, 198, 143, 0.2);
    border-radius: 50%;
    animation: rotate 30s linear infinite;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.badge-icon {
    width: 180px;
    height: 180px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary-color);
    filter: drop-shadow(0 0 30px var(--primary-glow));
    animation: iconPulse 4s ease-in-out infinite;
}

.badge-icon svg {
    width: 120px;
    height: 120px;
    stroke-width: 1.5;
}

@keyframes iconPulse {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.1); opacity: 1; }
}

.badge-text {
    font-size: 2rem;
    font-weight: 800;
    text-align: center;
    line-height: 1.2;
    background: linear-gradient(135deg, #fff 0%, #47C68F 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: 0.05em;
    text-transform: uppercase;
}

@media (max-width: 1200px) {
    .security-content { gap: 4rem; }
    .security-features { gap: 1rem; }
}

@media (max-width: 992px) {
    .security-content { grid-template-columns: 1fr; gap: 5rem; }
    .security-text { max-width: 100%; text-align: center; }
    .security-description { margin: 0 auto 3rem; }
    .security-badge { width: 400px; height: 400px; }
}

@media (max-width: 768px) {
    .security-section { padding: 8rem 0; }
    .security-features { grid-template-columns: 1fr; }
    .security-item { padding: 2rem; }
    .security-badge { width: 320px; height: 320px; }
    .badge-icon { width: 140px; height: 140px; }
    .badge-icon svg { width: 80px; height: 80px; }
    .badge-text { font-size: 1.5rem; }
}
</style>
