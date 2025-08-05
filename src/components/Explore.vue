<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from "vue-i18n";
// import type {CollapseModelValue} from "element-plus";

const el = ref<HTMLElement | null>(null)

defineExpose({ el })
const { t } = useI18n()

</script>
<template>
    <section class="lg:px-0 relative" ref="el">
        <i id="explore" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
      <div class="explore-part">
        <div class="header-title">
          {{ t('header.aboutUs') }}
        </div>
        <div class="header-small-title">
          {{ t('explore.headContent') }}
        </div>
        <div class="green-title">
          <div>
            {{ t('explore.functionTitle1') }}
          </div>
        </div>
        <div class="card-row">
          <div class="card-content">
            <div class="card-content-style">
              <div class="card-content-icon">
                <img src="@/assets/images/icon-explore1.png" style="width: 42px; height: 28px;" alt=""/>
              </div>
              <div class="card-content-text">
                {{ t('explore.security') }}
              </div>
            </div>
          </div>
          <div class="card-content" style="margin: 0 22px;">
            <div class="card-content-style">
              <div class="card-content-icon">
                <img src="@/assets/images/icon-explore2.png" style="width: 42px; height: 28px;" alt=""/>
              </div>
              <div class="card-content-text">
                {{ t('explore.risk') }}
              </div>
            </div>
          </div>
          <div class="card-content">
            <div class="card-content-style">
              <div class="card-content-icon">
                <img src="@/assets/images/icon-explore3.png" style="width: 42px; height: 28px;" alt=""/>
              </div>
              <div class="card-content-text">
                {{ t('explore.verify') }}
              </div>
            </div>
          </div>
        </div>
        <div class="green-title" style="margin-top: 20px;">
          <div>
            {{ t('explore.functionTitle2') }}
          </div>
        </div>
        <div class="header-small-title">
          {{ t('explore.mission') }}
        </div>
        <div class="bottom-content">
          <div class="bottom-content-img">
            <img src="@/assets/images/icon-arrow.png" style="width: 17.17px; height: 15.33px;" alt=""/>
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
  background-color: #1A1A1A;
}

.header-title {
  color: #fff;
  font-size: 22px;
  font-weight: 600;
  padding: 0 16px 0 16px;
}

.header-small-title {
  padding: 0 16px 0 16px;
  color: #ACACAC;
  font-size: 12px;
  margin-top: 10px;
}

.green-title {
  display: flex;
  color: #1A1A1A;
  margin-top: 10px;
  padding: 0 16px 0 16px;

  div {
    padding: 3px 9px;
    background-color: #47C68F;
    border-radius: 12px;
    font-weight: 600;
    font-size: 12px;
  }
}

.card-row {
  margin-top: 10px;
  display: flex;
  padding: 0 16px 0 16px;
}

.card-content {
  flex: 1;
  border-radius: 20px;
  border: 1.4px solid transparent;
  background-image:
      linear-gradient(#3B3B3B96, #3B3B3B96),
      linear-gradient(to bottom left, #595959, #3E3E3E, #262626);
  background-origin: border-box;
  background-clip: content-box, border-box;
  height: auto;
}

.card-content-style {
  padding: 8.4px 14px;
}

.card-content-icon {
  display: flex;
  justify-content: center;
}

.card-content-text {
  color: #fff;
  font-size: 12px;
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 5px;
}

.bottom-content {
  background-color: #47C68F;
  display: flex;
  padding: 8px 24px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  margin-top: 20px;
}

.bottom-content-img {
  display: flex;
  align-items: center;
}

.bottom-content-text {
  color: #1A1A1A;
  font-weight: 600;
  font-size: 16px;
  display: flex;
  align-items: center;
  margin-left: 6px;
}
</style>