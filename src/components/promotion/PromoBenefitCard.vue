<script setup lang="ts">
import { Gift, Zap } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'
import type { Component } from 'vue'

const { t } = useI18n()

defineProps<{
  icon: Component
  title: string
  originalPrice: string
  promoPrice: string
  saveText: string
}>()
</script>

<template>
  <div class="promo-card">
    <div class="promo-card-icon">
      <component :is="icon" />
    </div>
    <h3 class="promo-card-title">{{ title }}</h3>
    <div class="promo-card-pricing">
      <div class="original-price">
        <span class="price-label">{{ t('promotion.originalPrice') }}</span>
        <span class="price-value strikethrough">{{ originalPrice }}</span>
      </div>
      <div class="promo-arrow">
        <Zap />
      </div>
      <div class="promo-price">
        <span class="price-label">{{ t('promotion.promoPrice') }}</span>
        <span class="price-value highlight">{{ promoPrice }}</span>
      </div>
    </div>
    <div class="promo-card-save">
      <Gift class="save-icon" />
      <span>{{ saveText }}</span>
    </div>
  </div>
</template>

<style scoped>
.promo-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.promo-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(71, 198, 143, 0.3);
}

.promo-card-icon {
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, rgba(71, 198, 143, 0.15) 0%, rgba(71, 198, 143, 0.05) 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--primary-color);
}

.promo-card-icon svg {
  width: 28px;
  height: 28px;
}

.promo-card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #fff;
}

.promo-card-pricing {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.original-price, .promo-price {
  text-align: center;
}

.price-label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.price-value {
  font-size: 1.75rem;
  font-weight: 800;
}

.price-value.strikethrough {
  color: #888;
  text-decoration: line-through;
}

.price-value.highlight {
  color: var(--primary-color);
}

.promo-arrow {
  color: var(--primary-color);
  animation: bounce-right 1s ease-in-out infinite;
}

.promo-arrow svg {
  width: 24px;
  height: 24px;
}

@keyframes bounce-right {
  0%, 100% { transform: translateX(0); }
  50% { transform: translateX(5px); }
}

.promo-card-save {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(71, 198, 143, 0.1);
  border-radius: 50px;
  color: var(--primary-color);
  font-size: 0.9rem;
  font-weight: 600;
}

.save-icon {
  width: 16px;
  height: 16px;
}
</style>
