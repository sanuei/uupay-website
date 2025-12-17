<script setup lang="ts">
import {CreditCard, Smartphone, Star, Wallet} from "lucide-vue-next"; // ArrowRight暂时隐藏
import {useI18n} from "vue-i18n";

const { t } = useI18n()
</script>

<template>
  <section id="features" class="products-section">
    <div class="container">
      <div class="section-header">
        <span class="section-tag">{{t('completeFin')}}</span>
        <h2 class="section-title">{{t('completeFinPurpose')}}</h2>
      </div>

      <div class="products-container">
        <div class="product-card" data-tilt>
          <div class="product-glow"></div>
          <div class="product-number">01</div>
          <div class="product-header">
            <div class="product-icon-wrapper">
              <div class="product-icon">
                <Wallet />
              </div>
            </div>
            <h3>{{t('functionWallet')}}</h3>
          </div>
          <ul class="product-features">
            <li>{{t('funcWalletOne')}}</li>
            <li>{{t('funcWalletTwo')}}</li>
            <li>{{t('funcWalletThree')}}</li>
          </ul>
<!--          <button class="product-btn">-->
<!--            <span>{{t('learnMore')}}</span>-->
<!--            <ArrowRight class="btn-icon" />-->
<!--          </button>-->
          <div class="product-overlay"></div>
        </div>

        <div class="product-card highlight" data-tilt>
          <div class="product-glow"></div>
          <div class="product-number">02</div>
          <div class="product-header">
            <div class="product-icon-wrapper">
              <div class="product-icon">
                <Smartphone />
              </div>
            </div>
            <h3>{{t('visualCard')}}</h3>
            <div class="highlight-badge">
              <Star class="badge-icon-small" />
              <span>{{t('recommend')}}</span>
            </div>
          </div>
          <ul class="product-features">
            <li>{{t('visualCardOne')}}</li>
            <li>{{t('visualCardTwo')}}</li>
            <li>{{t('visualCardThree')}}</li>
          </ul>
<!--          <button class="product-btn">-->
<!--            <span>{{t('learnMore')}}</span>-->
<!--            <ArrowRight class="btn-icon" />-->
<!--          </button>-->
          <div class="product-overlay"></div>
        </div>

        <div class="product-card" data-tilt>
          <div class="product-glow"></div>
          <div class="product-number">03</div>
          <div class="product-header">
            <div class="product-icon-wrapper">
              <div class="product-icon">
                <CreditCard />
              </div>
            </div>
            <h3>{{t('phyCard')}}</h3>
          </div>
          <ul class="product-features">
            <li>{{t('phyCardOne')}}</li>
            <li>{{t('phyCardTwo')}}</li>
            <li>{{t('phyCardThree')}}</li>
          </ul>
<!--          <button class="product-btn">-->
<!--            <span>{{t('learnMore')}}</span>-->
<!--            <ArrowRight class="btn-icon" />-->
<!--          </button>-->
          <div class="product-overlay"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
