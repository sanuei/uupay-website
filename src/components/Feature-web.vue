<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from "vue-i18n";

const el = ref<HTMLElement | null>(null)

defineExpose({el})
const { t } = useI18n()
</script>
<template>
  <section class="relative" ref="el">
    <i id="feature" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
    <div class="feature-part relative" ref="el">
      <div class="feature-header">
        <div class="feature-header-title">
          {{ t('feature.title1') }}
        </div>
        <div class="feature-header-content">
          {{ t('feature.content1') }}
        </div>
        <div class="feature-header-short-content">
          {{ t('feature.content2') }}
        </div>
      </div>
      <div class="feature-function">
        <div class="feature-function-intro">
          <div class="feature-function-intro-title">
            {{ t('feature.title12') }}
          </div>
          <div class="feature-function-intro-content">
            {{ t('feature.content3') }}
          </div>
        </div>
        <div class="feature-function-intro">
          <div class="feature-function-intro-title">
            {{ t('feature.title3') }}
          </div>
          <div class="feature-function-intro-content">
            {{ t('feature.content4') }}
          </div>
        </div>
        <div class="feature-function-intro">
          <div class="feature-function-intro-title">
            {{ t('feature.title4') }}
          </div>
          <div class="feature-function-intro-content">
            {{ t('feature.content5') }}
          </div>
        </div>
      </div>
    </div>
    <div class="feature-medium-part">
      <div class="feature-medium-part-title">
        {{ t('feature.title5') }}
      </div>
      <div class="feature-medium-part-content">
        <div class="feature-medium-part-bg">
          <img src="@/assets/images/feature-medium-bg.png" alt=""/>
        </div>
        <div class="feature-medium-part-medium-bg">
          <img src="@/assets/images/row-line.png" alt=""/>
        </div>
        <div class="feature-medium-part-intro">
          <div class="feature-medium-part-intro-column">
            <div class="feature-medium-part-intro-column-img">
              <img src="@/assets/images/exchange.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-title">
              {{ t('feature.title6') }}
            </div>
            <div class="feature-medium-part-intro-column-content">
              {{ t('feature.content6') }}
            </div>
          </div>

          <div class="feature-medium-part-intro-column">
            <div class="feature-medium-part-intro-column-img">
              <img src="@/assets/images/security.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-title">
              {{ t('feature.title7') }}
            </div>
            <div class="feature-medium-part-intro-column-content">
              {{ t('feature.content7') }}
            </div>
          </div>

          <div class="feature-medium-part-intro-column">
            <div class="feature-medium-part-intro-column-img">
              <img src="@/assets/images/24-support.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-title">
              {{ t('feature.title8') }}
            </div>
            <div class="feature-medium-part-intro-column-content">
              {{ t('feature.content8') }}
            </div>
          </div>

          <div class="feature-medium-part-intro-column">
            <div class="feature-medium-part-intro-column-img">
              <img src="@/assets/images/moneys.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-title">
              {{ t('feature.title9') }}
            </div>
            <div class="feature-medium-part-intro-column-content">
              {{ t('feature.content9') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="feature-medium-part" style="margin-top: 200px">
      <div class="feature-medium-part-content">
        <div class="feature-medium-part-bg">
          <img src="@/assets/images/feature-medium-bg-second.png" alt=""/>
        </div>
        <div class="feature-medium-part-medium-bg">
          <img src="@/assets/images/row-line.png" alt=""/>
        </div>
        <div class="feature-medium-part-intro">
          <div class="feature-medium-part-intro-column">
            <div class="feature-medium-part-intro-column-img">
              <img src="@/assets/images/moneys.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-title">
              {{ t('feature.title10') }}
            </div>
            <div class="feature-medium-part-intro-column-content">
              {{ t('feature.content10') }}
            </div>
          </div>

          <div class="feature-medium-part-intro-column">
            <div class="feature-medium-part-intro-column-img">
              <img src="@/assets/images/security.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-title">
              {{ t('feature.title11') }}
            </div>
            <div class="feature-medium-part-intro-column-content">
              {{ t('feature.content11') }}
            </div>
          </div>

          <div class="feature-medium-part-intro-column">
            <div class="feature-medium-part-intro-column-img">
              <img src="@/assets/images/security.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-title">
              {{ t('feature.title12') }}
            </div>
            <div class="feature-medium-part-intro-column-content">
              {{ t('feature.content12') }}
            </div>
          </div>

          <div class="feature-medium-part-intro-column">
            <div class="feature-medium-part-intro-column-img">
              <img src="@/assets/images/moneys.png" alt=""/>
            </div>
            <div class="feature-medium-part-intro-column-title">
              {{ t('feature.title13') }}
            </div>
            <div class="feature-medium-part-intro-column-content">
              {{ t('feature.content13') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="download-part">
      <div class="download-part-bg">
        <div class="download-part-image">
          <img src="@/assets/images/downlaod-banner-bg.png" alt=""/>
        </div>
        <div class="download-part-title">
          {{ t('feature.downloadTitle') }}
        </div>
        <div class="download-content">
          <div class="download-ios">
            <img src="@/assets/images/download-ios.png" alt=""/>
          </div>
          <div class="download-android">
            <img src="@/assets/images/download-android.png" alt=""/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.feature-part {
  background-image: url('@/assets/images/feature-map.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 60px 0;

  .feature-header {
    margin: 60px 20px;

    .feature-header-title {
      font-size: 40px;
      margin: 30px 40px 10px 60px;
    }

    .feature-header-content {
      width: 60%;
      font-size: 24px;
      margin: 30px 40px 30px 60px;
    }

    .feature-header-short-content {
      font-size: 24px;
      margin: 30px 40px 30px 60px;
    }
  }

  .feature-function {
    display: flex;
    justify-content: space-between;
    margin: 0 30px;

    .feature-function-intro {
      background: #FFFFFF66;
      margin: 0 30px;
      border: 1px solid #FFFFFF66;
      padding: 10px 15px;

      .feature-function-intro-title {
        font-size: 36px;
      }

      .feature-function-intro-content {
        font-size: 16px;
        margin: 30px 0;
      }
    }
  }
}

.feature-medium-part {
  margin: 20px 70px;

  .feature-medium-part-title {
    font-size: 40px;
    margin-bottom: 50px;
  }

  .feature-medium-part-content {
    display: flex;
    justify-content: space-between;

    .feature-medium-part-bg {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .feature-medium-part-medium-bg {
      width: 20%;
    }

    .feature-medium-part-intro {
      width: 100%;

      .feature-medium-part-intro-column {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        padding: 10px 25px;
        border-radius: 15px;
        margin-bottom: 50px;

        .feature-medium-part-intro-column-img {
          margin-bottom: 10px;
        }

        .feature-medium-part-intro-column-title {
          font-weight: 500;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .feature-medium-part-intro-column-content {
          margin-bottom: 10px;
          font-size: 20px;
        }
      }
    }
  }
}

.download-part {
  height: 500px;

  .download-part-bg {
    width: 100%;

    .download-part-image {
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
    }

    .download-part-title {
      position: relative;
      color: #fff;
      font-size: 48px;
      display: flex;
      justify-content: center;
      margin: 20px 40px;
      top: 100px;
    }

    .download-content {
      z-index: 100;
      display: flex;
      position: relative;
      justify-content: center;
      top: 200px;

      .download-ios {
        margin-right: 25px;
      }
    }
  }
}
</style>