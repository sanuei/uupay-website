<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from "vue-i18n";
// import { FEATURE_ITEMS } from '@/constants'
// import exploreBgMobile from '@/assets/images/explore-bg-mobile.png'

const el = ref<HTMLElement | null>(null)
const {t} = useI18n()
defineExpose({el})

</script>

<template>
  <section class="relative" ref="el">
    <i id="feature" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
    <div class="feature-part">
      <div class="header-title">
        {{ t('header.aboutPay') }}
      </div>
      <div class="header-small-title">
        {{ t('feature.content') }}
      </div>
      <div class="card-content">
        <div class="card-title-col">
          <div class="card-title">
            {{ t('feature.cardTitle') }}
          </div>
        </div>
        <div class="function">
          <div class="function-content">
            <div class="function-title">
              {{ t('feature.cardFunction1') }}
            </div>
            <div class="function-details">
              {{ t('feature.cardDetail1') }}
            </div>
          </div>
          <div class="function-content height">
            <div class="function-title">
              {{ t('feature.cardFunction2') }}
            </div>
            <div class="function-details">
              {{ t('feature.cardDetail2') }}
            </div>
          </div>
          <div class="function-content height">
            <div class="function-title">
              {{ t('feature.cardFunction3') }}
            </div>
            <div class="function-details">
              {{ t('feature.cardDetail3') }}
            </div>
          </div>
          <div class="function-content height">
            <div class="function-title">
              {{ t('feature.cardFunction4') }}
            </div>
            <div class="function-details">
              {{ t('feature.cardDetail4') }}
            </div>
          </div>
          <div class="function-content height">
            <div class="function-title">
              {{ t('feature.cardFunction5') }}
            </div>
            <div class="function-details">
              {{ t('feature.cardDetail5') }}
            </div>
          </div>
        </div>
      </div>
      <div class="card-img">
        <div class="card-style">
          <img src="@/assets/images/feature-card.png" style="width: 100%; height: 100%;" alt=""/>
        </div>
      </div>
      <div class="center-title">
        {{ t('header.aboutPay') }}
      </div>
      <div class="center-small-title">
        {{ t('feature.cardFeature2') }}
      </div>
      <div class="center-img">
        <div class="center-card-style">
          <img src="@/assets/images/feature-card2-phone.png" style="width: 100%; height: 100%;" alt=""/>
        </div>
      </div>
      <div class="card-part">
        <div class="card-col" style="margin-right: 7px;">
          <div class="card-col-content">
            <div class="card-header">
              <div class="card-icon">
                <img src="@/assets/images/icon-feature1.png" style="width: 18px; height: 18px;" alt=""/>
              </div>
              <div class="card-function-title">
                {{ t('feature.cardEachTitle1') }}
              </div>
            </div>
            <div class="card-function-details">
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction1_1') }}
              </div>
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction1_2') }}
              </div>
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction1_3') }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-col" style="margin-left: 7px;">
          <div class="card-col-content">
            <div class="card-header">
              <div class="card-icon">
                <img src="@/assets/images/icon-feature2.png" style="width: 18px; height: 18px;" alt=""/>
              </div>
              <div class="card-function-title">
                {{ t('feature.cardEachTitle2') }}
              </div>
            </div>
            <div class="card-function-details">
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction2_1') }}
              </div>
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction2_2') }}
              </div>
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction2_3') }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-part" style="margin-top: 10px;">
        <div class="card-col" style="margin-right: 7px;">
          <div class="card-col-content">
            <div class="card-header">
              <div class="card-icon">
                <img src="@/assets/images/icon-feature1.png" style="width: 18px; height: 18px;" alt=""/>
              </div>
              <div class="card-function-title">
                {{ t('feature.cardEachTitle3') }}
              </div>
            </div>
            <div class="card-function-details">
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction3_1') }}
              </div>
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction3_2') }}
              </div>
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction3_3') }}
              </div>
            </div>
          </div>
        </div>
        <div class="card-col" style="margin-left: 7px;">
          <div class="card-col-content">
            <div class="card-header">
              <div class="card-icon">
                <img src="@/assets/images/icon-feature2.png" style="width: 18px; height: 18px;" alt=""/>
              </div>
              <div class="card-function-title">
                {{ t('feature.cardEachTitle4') }}
              </div>
            </div>
            <div class="card-function-details">
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction4_1') }}
              </div>
              <div class="card-function-details-text">
                {{ t('feature.cardEachFunction4_2') }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.feature-part {
  background-color: #1A1A1A;
  padding: 26px 16px;
}

.header-title {
  color: #fff;
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 22px;
}

.header-small-title {
  margin-top: 10px;
  color: #ACACAC;
  font-size: 12px;
  text-align: center;
}

.card-content {
  margin-top: 10px;
  border-radius: 20px;
  border: 2px solid transparent;
  background-image:
      linear-gradient(#3B3B3B96, #3B3B3B96),
      linear-gradient(to bottom left, #595959, #3E3E3E, #262626);
  background-origin: border-box;
  background-clip: content-box, border-box;
  height: auto;
}

.card-title-col {
  display: flex;
}

.card-title {
  margin-top: 10px;
  margin-left: -15px;
  background: #47C68F;
  color: #1A1A1A;
  border-radius: 35px;
  font-size: 12px;
  padding: 10px 30px;
  font-weight: 600;
}

.function {
  padding: 17.22px 0 17px 20px;
}

.function-content{
  display: flex;
}

.height {
  margin-top: 20px;
}

.function-title {
  width: 30%;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
}

.function-details {
  width: 70%;
  align-items: center;
  display: flex;
  font-size: 10px;
  color: #ACACAC;
}

.card-img {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-style {
  max-width: 160px;
}

.center-title {
  margin-top: 25px;
  color: #FFFFFF;
  font-size: 22px;
  font-weight: 600;
}

.center-small-title {
  margin-top: 10px;
  color: #ACACAC;
  font-size: 12px;
}

.center-img {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.center-card-style {
  max-width: 290px;
}

.card-part {
  margin-top: 29.25px;
  display: flex;
}

.card-col {
  border-radius: 20px;
  border: 2px solid transparent;
  background-image:
      linear-gradient(#3B3B3B96, #3B3B3B96),
      linear-gradient(to bottom left, #595959, #3E3E3E, #262626);
  background-origin: border-box;
  background-clip: content-box, border-box;
  width: 100%;
}

.card-col-content {
  padding: 15px;
  min-height: 165px;
}

.card-header {
  display: flex;
}

.card-icon {
  background-color: #47C68F;
  padding: 7.15px;
  border-radius: 7px;
}

.card-function-title {
  color: #fff;
  font-weight: 500;
  font-size: 12px;
  display: flex;
  align-items: center;
  margin-left: 6.12px;
}

.card-function-details {
  margin-top: 5px;
  padding: 0 15px;
}

.card-function-details-text {
  color: #ACACAC;
  font-size: 10px;
  display: list-item;
  margin-top: 5px;
}
</style>