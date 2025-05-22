<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from "vue-i18n";
// import { FEATURE_ITEMS } from '@/constants'
// import exploreBgMobile from '@/assets/images/explore-bg-mobile.png'

const el = ref<HTMLElement | null>(null)
const { t } = useI18n()
defineExpose({ el })
</script>

<template>
    <section class="relative" ref="el">
        <i id="feature" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
        <div class="feature-part">
          <div class="feature-part-title">
            {{ t('feature.title1') }}
          </div>
          <div class="feature-part-title-content">
            {{ t('feature.content1') }}
          </div>
          <div class="feature-part-title-content-second">
            {{ t('feature.content2') }}
          </div>

          <div class="feature-part-title" style="margin-top: 50px">
            {{ t('feature.title2') }}
          </div>
          <div class="feature-part-title-content">
            {{ t('feature.content3') }}
          </div>

          <div class="feature-part-title" style="margin-top: 50px">
            {{ t('feature.title3') }}
          </div>
          <div class="feature-part-title-content">
            {{ t('feature.content4') }}
          </div>

          <div class="feature-part-title" style="margin-top: 50px">
            {{ t('feature.title4') }}
          </div>
          <div class="feature-part-title-content">
            {{ t('feature.content5') }}
          </div>
        </div>
        <div class="feature-part-function">
          <div class="feature-part-function-title">
            {{ t('feature.title5') }}
          </div>
          <div class="feature-part-function-img">
            <img src="@/assets/images/phone-feature.png" alt="" />
          </div>
        </div>
        <div class="feature-part-function-content">
          <div class="feature-part-function-content-row">
            <div class="feature-part-function-content-row-img">
              <img src="@/assets/images/exchange.png" alt="" />
            </div>
            <div class="feature-part-function-content-row-title">
              {{ t('feature.title6') }}
            </div>
            <div class="feature-part-function-content-row-content">
              {{ t('feature.content6') }}
            </div>
          </div>
        </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/security.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            {{ t('feature.title7') }}
          </div>
          <div class="feature-part-function-content-row-content">
            {{ t('feature.content7') }}
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/24-support.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            {{ t('feature.title8') }}
          </div>
          <div class="feature-part-function-content-row-content">
            {{ t('feature.content8') }}
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/moneys.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            {{ t('feature.title9') }}
          </div>
          <div class="feature-part-function-content-row-content">
            {{ t('feature.content9') }}
          </div>
        </div>
      </div>
      <div class="feature-part-function-solution">
        <img src="@/assets/images/phone-solution.png" alt="" />
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/moneys.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            {{ t('feature.title10') }}
          </div>
          <div class="feature-part-function-content-row-content">
            {{ t('feature.content10') }}
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/security.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            {{ t('feature.title11') }}
          </div>
          <div class="feature-part-function-content-row-content">
            {{ t('feature.content11') }}
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/security.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            {{ t('feature.title12') }}
          </div>
          <div class="feature-part-function-content-row-content">
            {{ t('feature.content12') }}
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/moneys.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            {{ t('feature.title13') }}
          </div>
          <div class="feature-part-function-content-row-content">
            {{ t('feature.content13') }}
          </div>
        </div>
      </div>
      <div class="feature-part-function-solution">
        <img src="@/assets/images/phone-bottom-img.png" alt="" />
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