<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from "vue-i18n";
// import { FEATURE_ITEMS } from '@/constants'
// import exploreBgMobile from '@/assets/images/explore-bg-mobile.png'

const el = ref<HTMLElement | null>(null)
const { t } = useI18n()
defineExpose({ el })

const selected = ref<'virtual' | 'physical'>('virtual')

const activeCard = selected
</script>

<template>
    <section class="relative" ref="el">
        <i id="feature" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
        <div class="feature-part">
          <div style="font-size: 14px; color: #596780;">
            {{ t('header.title4') }}
          </div>
          <div style="color: #3A3A3A; margin-top: 20px;">
            {{ t('feature.title1') }}
          </div>
          <div style="color: #000; font-size: 20px; font-weight: 600; margin-top: 20px;">
            {{ t('feature.content1') }}
          </div>
          <div style="margin-top: 20px;">
            <img src="@/assets/images/transfer-background.png" alt="" />
          </div>
          <div style="color: #040815; font-size: 14px; font-weight: 600; margin: 10px 0;">
            {{ t('feature.title2') }}
          </div>
          <div style="color: #596780; font-size: 12px;">
            {{ t('feature.content2') }}
          </div>
          <div style="margin-top: 20px;">
            <img src="@/assets/images/transferDetail-background.png" alt="" />
          </div>
          <div style="color: #040815; font-size: 14px; font-weight: 600; margin: 10px 0;">
            {{ t('feature.title3') }}
          </div>
          <div style="color: #596780; font-size: 12px;">
            {{ t('feature.content2') }}
          </div>
          <div style="margin-top: 20px;">
            <img src="@/assets/images/card-payment-background.png" alt="" />
          </div>
          <div style="color: #040815; font-size: 14px; font-weight: 600; margin: 10px 0;">
            {{ t('feature.title4') }}
          </div>
          <div style="color: #596780; font-size: 12px;">
            {{ t('feature.content7') }}
          </div>
        </div>
      <div style="background-color: #000; padding: 20px;">
        <div style="margin-top: 20px;">
          <img src="@/assets/images/event-background.png" alt="" />
        </div>
        <div style="color: #D9D9D9; font-size: 16px; font-weight: 600; margin-top: 40px;">
          {{ t('feature.title6') }}
        </div>
        <div style="color: #D9D9D9; font-size: 14px; margin: 10px 0;">
          {{ t('feature.title5') }}
        </div>
        <div style="color: #90A3BF; font-size: 12px;">
          {{ t('feature.content3') }}
        </div>
        <div class="feature-medium-part-intro-column-step">
          <div class="feature-medium-part-intro-column-step-progress">
            <div>
              <img src="@/assets/images/icon-one.png" style="width: 24px;" alt="" />
            </div>
            <div class="text">
              {{ t('feature.content4') }}
            </div>
          </div>
          <div class="feature-medium-part-medium-bg">
            <img src="@/assets/images/row-line.png" alt=""/>
          </div>
          <div class="feature-medium-part-intro-column-step-progress">
            <div>
              <img src="@/assets/images/icon-two.png" style="width: 24px;" alt="" />
            </div>
            <div class="text">
              {{ t('feature.content8') }}
            </div>
          </div>
          <div class="feature-medium-part-medium-bg">
            <img src="@/assets/images/row-line-other.png" alt=""/>
          </div>
          <div class="feature-medium-part-intro-column-step-progress">
            <div>
              <img src="@/assets/images/icon-three.png" style="width: 24px;" alt="" />
            </div>
            <div class="text">
              {{ t('feature.content6') }}
            </div>
          </div>
        </div>
      </div>
      <div style="padding: 20px;">
        <div style="color: #0052B4; font-size: 16px; font-weight: 600;">
          {{ t('feature.title7') }}
        </div>
        <div style="color: #0D121F; font-size: 16px; font-weight: 500; margin-top: 20px;">
          {{ t('feature.title8') }}
        </div>
        <div class="toggle-wrapper">
          <div
            :class="['toggle-btn', selected === 'virtual' ? 'active' : '']"
            @click="selected = 'virtual'"
          >
            {{ t('feature.virtualCard') }}
          </div>
          <div
            :class="['toggle-btn', selected === 'physical' ? 'active' : '']"
            @click="selected = 'physical'"
          >
            {{ t('feature.physicalCard') }}
          </div>
        </div>
        <div class="feature-medium-part-content-img">
          <div class="card-container">
            <div
              class="card card-virtual"
              :class="{ active: activeCard === 'virtual' }"
            >
              <img src="@/assets/images/virtual-card.png" alt=""/>
            </div>

            <div
              class="card card-physical"
              :class="{ active: activeCard === 'physical' }"
            >
              <img src="@/assets/images/physical-card.png" alt=""/>
            </div>
          </div>
        </div>
        <div style="color: #0D121F; font-size: 20px; font-weight: 600;">
          {{ t('feature.title9') }}
        </div>
        <div style="color: #0D121F; font-size: 14px; display: flex; margin-top: 20px;">
          <img src="@/assets/images/icon-tick.png" style="width: 24px; height: 24px; margin-right: 10px;" alt="" />
          {{ t('feature.title10') }}
        </div>
        <div style="color: #0D121F; font-size: 14px; display: flex; margin-top: 20px;">
          <img src="@/assets/images/icon-tick.png" style="width: 24px; height: 24px; margin-right: 10px;" alt="" />
          {{ t('feature.title7') }}
        </div>
        <div style="color: #0D121F; font-size: 14px; display: flex; margin-top: 20px;">
          <img src="@/assets/images/icon-tick.png" style="width: 24px; height: 24px; margin-right: 10px;" alt="" />
          {{ t('feature.title11') }}
        </div>
      </div>
    </section>
</template>
<style scoped>
.feature-part {
  margin-top: 50px;
  background-image: url('@/assets/images/phone-map.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;

  .feature-part-title {
    font-size: 24px;
  }

  .feature-part-title-content {
    margin-top: 30px;
    font-size: 14px;
  }

  .feature-part-title-content-second {
    font-size: 14px;
    margin-top: 20px;
  }
}

.feature-medium-part-intro-column-step {
  margin-top: 20px;

  .feature-medium-part-intro-column-step-progress {
    display: flex;
    align-items: center;

    .text {
      margin-left: 20px;
      color: #fff;
      font-weight:500;
      font-size: 14px;
    }
  }

  .feature-medium-part-medium-bg {
    margin-left: 10px;
    height: 30px;
    width: 2px;
  }
}

.toggle-wrapper {
  display: flex;
  background-color: #f4f6f9;
  border-radius: 30px;
  padding: 4px;
  width: 100%;
  margin-top: 20px;
}

.toggle-btn {
  flex: 1;
  text-align: center;
  padding: 8px 20px;
  border-radius: 30px;
  font-size: 14px;
  color: #a4b0be;
  cursor: pointer;
  transition: all 0.3s;
}

.toggle-btn.active {
  background-color: #0057d9; /* 蓝色 */
  color: white;
}

.feature-medium-part-content-img {
  display: flex;
  justify-content: center;

  .card-container {
    position: relative;
    width: 302px;
    height: 442px;
    perspective: 1000px;
    align-items: center;
    display: flex;
  }

  .card {
    position: absolute;
    transition: all 0.5s ease;
    transform: rotate(-5deg) translateY(20px);
    z-index: 1;
  }

  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .card.active {
    z-index: 2;
    transform: rotate(0deg) translateY(0);
  }
}

.feature-part-function {
  padding: 10px;
  margin-top: 20px;

  .feature-part-function-title {
    font-size: 24px;
  }

  .feature-part-function-img {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

.feature-part-function-content {
  padding: 10px;

  .feature-part-function-content-row {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 15px;

    .feature-part-function-content-row-img {
      margin-bottom: 10px;
    }

    .feature-part-function-content-row-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .feature-part-function-content-row-content {
      font-size: 14px;
    }
  }
}

.feature-part-function-solution {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>