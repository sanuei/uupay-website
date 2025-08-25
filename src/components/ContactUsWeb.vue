<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from "vue-i18n";

const el = ref<HTMLElement | null>(null)

defineExpose({el})
const {t} = useI18n()

const openCustomerService = () => {
  if (window.scBotHandler && typeof window.scBotHandler.expand === 'function') {
    window.scBotHandler.expand()
  } else {
    console.warn('客服系统尚未加载')
  }
}
</script>

<template>
  <section class="relative" ref="el">
    <i id="contact" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
    <div class="contact-part">
      <div class="contact-content">
        <div class="contact-title">
          {{ t('contact.contactUs') }}
        </div>
        <div class="contact-col">
          <div class="contact-img">
            <img src="@/assets/images/contact-background.png" style="width: 100%; height: 100%;" alt=""/>
          </div>
          <div class="contact-description">
            <div class="contact-description-col" style="margin-top: 10px;">
              <div class="contact-info-title">
                {{ t('contact.website') }}:
              </div>
              <div class="contact-info-content">
                uupay.com
              </div>
            </div>
            <div class="cs-btn" @click="openCustomerService">
              <div class="cs-content">
                <img src="@/assets/images/cs-btn.png" alt=""/>
                <span>
                  {{ t('banner.csBtn')}}
                </span>
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
  background-color: #1A1A1A;
  padding-top: 30px;
}

.contact-part {
  width: 100%;
  height: 100%;
  background-color: #47C68F;
  border-radius: 100px;
  padding: 100px 300px;
}

.contact-content {
  width: 100%;
  height: 100%;
}

.contact-title {
  font-size: 44px;
  font-weight: 600;
}

.contact-col {
  width: 100%;
  height: 100%;
  display: flex;
  margin-top: 50px;
  position: relative;
}

.contact-img {
  flex: 1;
  height: auto;
  display: flex;
  align-items: center;
}

.contact-description {
 flex: 1;
  background-color: #1A1A1A;
  border-radius: 40px;
  margin-left: -35px;
  justify-content: center;
  align-content: center;
}

.contact-description-col {
  width: 100%;
  display: flex;
  justify-content: center;
}

.contact-info-title {
  color: #fff;
  font-weight: 500;
  font-size: 28px;
  display: flex;
  align-items: center;
}

.contact-info-content {
  margin-left: 20px;
  color: #ACACAC;
  font-size: 24px;
  display: flex;
  align-items: center;
}

.cs-btn {
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding-top: 10px;
}

.cs-content {
  display: flex;
  align-items: center;
  background-color: #47C68F;
  border-radius: 14px;
  padding: 15px 20px;

  img {
    width: 40px;
    height: 40px;
  }

  span {
    display: flex;
    align-content: center;
    color: #fff;
    font-weight: 500;
    font-size: 28px;
    margin-left: 10px;
  }
}

@media screen and (max-width: 1440px) {
  :deep(.contact-info-title) {
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    align-items: center;
  }

  :deep(.contact-info-content) {
    margin-left: 20px;
    color: #ACACAC;
    font-size: 16px;
    display: flex;
    align-items: center;
  }

  :deep(.cs-content span) {
    display: flex;
    align-content: center;
    color: #fff;
    font-weight: 500;
    font-size: 20px;
    margin-left: 10px;
  }

  :deep(.cs-content img) {
    width: 32px;
    height: 32px;
  }
}
</style>
