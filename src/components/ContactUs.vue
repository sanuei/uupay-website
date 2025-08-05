<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from "vue-i18n";

const el = ref<HTMLElement | null>(null)

defineExpose({el})
const {t} = useI18n()
</script>

<template>
  <section class="relative" ref="el">
    <i id="contact" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
    <div class="contact-part">
      <div class="contact-title">
        {{ t('contact.contactUs') }}
      </div>
      <div class="content-img">
        <img src="@/assets/images/contact-background-phone.png" style="width: 100%; height: 100%; object-fit: contain" alt=""/>
      </div>
      <div class="contact-info">
        <div class="contact-info-detail">
          <div class="contact-info-detail-style">
            <div class="contact-info-detail-title">
              {{ t('contact.phone') }} :
            </div>
            <div class="contact-info-detail-content">
              012-123456
            </div>
          </div>
          <div class="contact-info-detail-style">
            <div class="contact-info-detail-title">
              {{ t('contact.postcode') }} :
            </div>
            <div class="contact-info-detail-content">
              47100
            </div>
          </div>
          <div class="contact-info-detail-style">
            <div class="contact-info-detail-title">
              {{ t('contact.email') }} :
            </div>
            <div class="contact-info-detail-content">
              dgeywi@gvuw.com
            </div>
          </div>
          <div class="contact-info-detail-style">
            <div class="contact-info-detail-title">
              {{ t('contact.address') }} :
            </div>
            <div class="contact-info-detail-content">
              Malaysia
            </div>
          </div>
          <div class="contact-info-detail-style">
            <div class="contact-info-detail-title">
              {{ t('contact.website') }} :
            </div>
            <div class="contact-info-detail-content">
              www.ctvybu.com
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
  padding-top: 10px;
}

.contact-part {
  background-color: #47C68F;
  border-radius: 16px;
  padding: 20px 16px 16px;
}

.contact-title {
  color: #1A1A1A;
  font-weight: 600;
  font-size: 22px;
}

.content-img {
  margin-top: 10px;
}

.contact-info {
  background-color: #1A1A1A;
  border-radius: 10px;
  margin-top: -10px;
  position: relative;
  z-index: 2;
}

.contact-info-detail {
  padding: 21px 0;
}

.contact-info-detail-style {
  display: flex;
  margin-top: 10px;
}

.contact-info-detail-title {
  width: 35%;
  color: #FFF;
  font-weight: 500;
  font-size: 18px;
  text-align: end;
}

.contact-info-detail-content {
  color: #ACACAC;
  font-size: 14px;
  display: flex;
  align-items: center;
  text-align: left;
  margin-left: 15px;
}
</style>