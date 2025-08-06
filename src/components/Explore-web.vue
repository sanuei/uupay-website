<script setup lang="ts">
// import {EXPLORE_ITEMS} from '@/constants/index.ts'
import {ref} from 'vue'
import {useI18n} from "vue-i18n";
// import type {CollapseModelValue} from 'element-plus'

const el = ref<HTMLElement | null>(null)
defineExpose({el})
const { t } = useI18n()
</script>
<template>
  <section class="px-4 lg:px-0 relative" ref="el">
    <i id="explore" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top"></i>
    <div class="explore-part">
      <div class="explore-head-title">
        {{ t('header.aboutUs') }}
      </div>
      <div class="explore-head-content">
        {{ t('explore.headContent') }}
      </div>
      <div class="explore-body">
        <div class="explore-content">
          <div class="explore-content-title">
            {{ t('explore.functionTitle1') }}
          </div>
        </div>
        <div class="explore-card">
          <div class="each-card">
            <div class="each-card-content">
              <div class="card-image">
                <img src="@/assets/images/icon-explore1.png" style="object-fit: contain" alt=""/>
              </div>
              <div class="card-text">
                {{ t('explore.security') }}
              </div>
            </div>
          </div>
          <div class="each-card" style="margin: 0 24px;">
            <div class="each-card-content">
              <div class="card-image">
                <img src="@/assets/images/icon-explore2.png" style="object-fit: contain" alt=""/>
              </div>
              <div class="card-text">
                {{ t('explore.risk') }}
              </div>
            </div>
          </div>
          <div class="each-card">
            <div class="each-card-content">
              <div class="card-image">
                <img src="@/assets/images/icon-explore3.png" style="object-fit: contain" alt=""/>
              </div>
              <div class="card-text">
                {{ t('explore.verify') }}
              </div>
            </div>
          </div>
        </div>
        <div class="explore-content">
          <div class="explore-content-title">
            {{ t('explore.functionTitle2') }}
          </div>
        </div>
        <div class="explore-mission-content">
          {{ t('explore.mission') }}
        </div>
        <div class="explore-ppl-image">
          <img src="@/assets/images/explore-ppl.png" style="width: 100%; height: 100%;" alt=""/>
        </div>
      </div>
    </div>
    <div class="explore-body-bottom">
      <div class="bottom-content">
        <div class="bottom-img">
          <img src="@/assets/images/icon-arrow.png" style="width: 51.5px; height: 46px;" alt=""/>
        </div>
        <div class="bottom-content-text">
          {{ t('explore.transaction') }}
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.explore-part {
  width: 100%;
  padding: 100px 300px 0 300px;
  background-color: #1A1A1A;
  background-image: url('@/assets/images/explore-background.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.explore-head-title {
  color: #fff;
  font-size: 44px;
  font-weight: 600;
}

.explore-head-content {
  color: #ACACAC;
  font-size: 24px;
  margin-top: 20px;
}

.explore-body {
  position: relative;
  padding-bottom: 140px;
}

.explore-content {
  display: flex;
}

.explore-content-title {
  margin-top: 50px;
  background-color: #47C68F;
  color: #1A1A1A;
  border-radius: 35px;
  font-size: 34px;
  font-weight: 600;
  padding: 9.5px 30px;
}

.explore-card {
  display: flex;
  margin-top: 30px;
}

.each-card {
  flex: 1;
  border-radius: 40px;
  border: 4px solid transparent;
  background-image:
      linear-gradient(#3B3B3B96, #3B3B3B96),
      linear-gradient(to bottom left, #595959, #3E3E3E, #262626);
  background-origin: border-box;
  background-clip: content-box, border-box;
  height: auto;
}

.each-card-content {
  padding: 20px 100px;
}

.card-image {
  display: flex;
  justify-content: center;
}

.card-text {
  display: flex;
  justify-content: center;
  font-size: 24px;
  color: #fff;
  margin-top: 24px;
  text-align: center;
}

.explore-mission-content {
  color: #fff;
  font-size: 24px;
  font-weight: 400;
  margin-top: 30px;
  width: 60%;
}

.explore-ppl-image {
  position: absolute;
  top: 95px;
  right: -250px;
  max-width: 517px;
}

.explore-body-bottom {
  position: relative;
  z-index: 10;
  background-color: #1A1A1A;
}

.bottom-content {
  background-color: #47C68F;
  padding: 40px 300px;
  border-bottom-left-radius: 100px;
  border-bottom-right-radius: 100px;
  display: flex;
}

.bottom-img {
  display: flex;
  align-items: center;
}

.bottom-content-text {
  display: flex;
  margin-left: 10px;
  font-size: 44px;
  font-weight: 600;
}

:deep(.el-collapse-item__header) {
  font-size: 20px;
}
</style>