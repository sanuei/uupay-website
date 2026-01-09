<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Clock } from 'lucide-vue-next'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = withDefaults(defineProps<{
  endDate?: Date
  daysFromNow?: number
}>(), {
  daysFromNow: 30
})

const countdown = ref({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

let interval: number | null = null

onMounted(() => {
  const end = props.endDate || new Date(Date.now() + props.daysFromNow * 24 * 60 * 60 * 1000)
  
  const update = () => {
    const distance = end.getTime() - Date.now()
    if (distance > 0) {
      countdown.value = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      }
    }
  }
  
  update()
  interval = window.setInterval(update, 1000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="countdown-wrapper">
    <h3 class="countdown-title">
      <Clock class="countdown-title-icon" />
      {{ t('promotion.countdownTitle') }}
    </h3>
    <div class="countdown-grid">
      <div class="countdown-item">
        <div class="countdown-number">{{ String(countdown.days).padStart(2, '0') }}</div>
        <div class="countdown-label">{{ t('promotion.days') }}</div>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-item">
        <div class="countdown-number">{{ String(countdown.hours).padStart(2, '0') }}</div>
        <div class="countdown-label">{{ t('promotion.hours') }}</div>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-item">
        <div class="countdown-number">{{ String(countdown.minutes).padStart(2, '0') }}</div>
        <div class="countdown-label">{{ t('promotion.minutes') }}</div>
      </div>
      <div class="countdown-separator">:</div>
      <div class="countdown-item">
        <div class="countdown-number">{{ String(countdown.seconds).padStart(2, '0') }}</div>
        <div class="countdown-label">{{ t('promotion.seconds') }}</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.countdown-wrapper {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 2.5rem;
  backdrop-filter: blur(10px);
  text-align: center;
  min-width: 380px;
}

.countdown-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-secondary);
  margin-bottom: 2rem;
}

.countdown-title-icon {
  width: 20px;
  height: 20px;
  color: var(--primary-color);
}

.countdown-grid {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.countdown-item {
  text-align: center;
}

.countdown-number {
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(135deg, var(--primary-color) 0%, #3aa06e 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1;
  min-width: 70px;
}

.countdown-label {
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.countdown-separator {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-secondary);
  opacity: 0.5;
  margin-bottom: 1.5rem;
}

/* Responsive */
@media (max-width: 1024px) {
  .countdown-wrapper {
    min-width: auto;
    width: 100%;
    max-width: 400px;
  }
}

@media (max-width: 768px) {
  .countdown-number {
    font-size: 2.25rem;
    min-width: 50px;
  }

  .countdown-separator {
    font-size: 1.75rem;
  }
}
</style>
