<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from "vue-i18n";

const el = ref<HTMLElement | null>(null)

defineExpose({el})
const { t } = useI18n()
</script>

<template>
  <section class="relative" ref="el">
    <i id="feature" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top"></i>
    <div class="feature-part relative" ref="el">
      <div class="title">
        {{ t('header.aboutPay') }}
      </div>
      <div class="content">
        {{ t('feature.content') }}
      </div>
      <div class="content-details">
        <div class="card-content">
          <div class="card-content-style">
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
          <img src="@/assets/images/feature-card.png" style="width: 100%; height: 100%;" alt=""/>
        </div>
      </div>
    </div>
    <div class="feature-part2">
      <div class="feature2-content">
        <div class="content-image">
          <img src="@/assets/images/feature-card2.png" style="width: 100%; height: auto; object-fit: contain" alt=""/>
        </div>
        <div class="content-details-more">
          <div class="content-details-more-title">
            {{ t('header.aboutPay') }}
          </div>
          <div class="content-feature-title">
            {{ t('feature.cardFeature2') }}
          </div>
          <div class="function-row">
            <div class="each-function">
              <div class="each-col">
                <div class="each-colum">
                  <div class="each-image">
                    <img src="@/assets/images/icon-feature1.png" style="width: 38px; height: 38px;" alt=""/>
                  </div>
                  <div class="each-title">
                    {{ t('feature.cardEachTitle1') }}
                  </div>
                </div>
                <div class="each-function-details">
                  <div>
                    {{ t('feature.cardEachFunction1_1') }}
                  </div>
                  <div>
                    {{ t('feature.cardEachFunction1_2') }}
                  </div>
                  <div>
                    {{ t('feature.cardEachFunction1_3') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="each-function" style="margin-left: 27px;">
              <div class="each-col">
                <div class="each-colum">
                  <div class="each-image">
                    <img src="@/assets/images/icon-feature2.png" style="width: 38px; height: 38px;" alt=""/>
                  </div>
                  <div class="each-title">
                    {{ t('feature.cardEachTitle2') }}
                  </div>
                </div>
                <div class="each-function-details">
                  <div>
                    {{ t('feature.cardEachFunction2_1') }}
                  </div>
                  <div>
                    {{ t('feature.cardEachFunction2_2') }}
                  </div>
                  <div>
                    {{ t('feature.cardEachFunction2_3') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="function-row" style="margin-top: 28px">
            <div class="each-function">
              <div class="each-col">
                <div class="each-colum">
                  <div class="each-image">
                    <img src="@/assets/images/icon-feature3.png" style="width: 38px; height: 38px;" alt=""/>
                  </div>
                  <div class="each-title">
                    {{ t('feature.cardEachTitle3') }}
                  </div>
                </div>
                <div class="each-function-details">
                  <div>
                    {{ t('feature.cardEachFunction3_1') }}
                  </div>
                  <div>
                    {{ t('feature.cardEachFunction3_2') }}
                  </div>
                  <div>
                    {{ t('feature.cardEachFunction3_3') }}
                  </div>
                </div>
              </div>
            </div>
            <div class="each-function" style="margin-left: 27px;">
              <div class="each-col">
                <div class="each-colum">
                  <div class="each-image">
                    <img src="@/assets/images/icon-feature4.png" style="width: 38px; height: 38px;" alt=""/>
                  </div>
                  <div class="each-title">
                    {{ t('feature.cardEachTitle4') }}
                  </div>
                </div>
                <div class="each-function-details">
                  <div>
                    {{ t('feature.cardEachFunction4_1') }}
                  </div>
                  <div>
                    {{ t('feature.cardEachFunction4_2') }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.relative {
  position: relative;
  top: 50px;
  background-color: #1A1A1A;
}

.feature-part {
  background-image: url('@/assets/images/feature-background.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 946px;
}

.title {
  text-align: center;
  padding-top: 100px;
  color: #FFF;
  font-weight: 600;
  font-size: 44px;
}

.content {
  text-align: center;
  margin-top: 20px;
  color: #ACACAC;
  font-size: 24px;
}

.content-details {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  width: 100%;
  margin-top: 50px;
  padding: 0 300px;
  box-sizing: border-box;
}

.card-content {
  flex: 1;
  border-radius: 40px;
  margin-right: 35px;
  border: 4px solid transparent;
  background-image:
      linear-gradient(#3B3B3B96, #3B3B3B96),
      linear-gradient(to bottom left, #595959, #3E3E3E, #262626);
  background-origin: border-box;
  background-clip: content-box, border-box;
  height: auto;
}

.card-content-style {
  display: flex;
}

.card-title {
  margin-top: 39px;
  margin-left: -40px;
  background: #47C68F;
  color: #1A1A1A;
  border-radius: 35px;
  font-size: 34px;
  padding: 10px 30px;
  font-weight: 600;
}

.function {
  padding: 40px 0 44px 100px;
}

.function-content {
  display: flex;
}

.height {
  margin-top: 20px;
}

.function-title {
  width: 30%;
  font-size: 28px;
  font-weight: 500;
  color: #fff;
}

.function-details {
  width: 70%;
  align-items: center;
  display: flex;
  font-size: 24px;
  color: #ACACAC;
  margin-left: 10px;
}

.card-img {
  max-width: 330px;
  flex-shrink: 0;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
}

.feature-part2 {
  background-image: url('@/assets/images/feature-background2.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  padding-bottom: 174px;
}

.feature2-content {
  margin-top: 300px;
  display: flex;
  padding: 0 240px;
}

.content-image {
  width: 80%;
  display: flex;
  align-items: center;
}

.content-details-more {
  width: 100%;
  margin-left: 39px;
}

.content-details-more-title {
  color: #fff;
  font-weight: 600;
  font-size: 44px;
}

.content-feature-title {
  color: #ACACAC;
  font-size: 24px;
  margin-top: 20px;
}

.function-row {
  margin-top: 50px;
  display: flex;
}

.each-function {
  border-radius: 40px;
  border: 4px solid transparent;
  background-image:
      linear-gradient(#3B3B3B96, #3B3B3B96),
      linear-gradient(to bottom left, #595959, #3E3E3E, #262626);
  background-origin: border-box;
  background-clip: content-box, border-box;
  width: 100%;
}

.each-col {
  padding: 30px;
}

.each-colum {
  display: flex;
  color: #fff;
  font-weight: 500;
  font-size: 24px;
}

.each-image {
  background-color: #47C68F;
  border-radius: 15px;
  padding: 15px;
}

.each-title {
  margin-left: 14px;
  align-items: center;
  display: flex;
}

.each-function-details {
  color: #ACACAC;
  font-size: 16px;
  padding-left: 30px;

  div {
    display: list-item;
    margin-top: 11px;
  }
}
</style>