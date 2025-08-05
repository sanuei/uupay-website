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
      <div class="contact-content">
        <div class="contact-title">
          {{ t('contact.contactUs') }}
        </div>
        <div class="contact-col">
          <div class="contact-img">
            <img src="@/assets/images/contact-background.png" style="width: 100%; height: 100%;" alt=""/>
          </div>
          <div class="contact-description">
            <div class="contact-description-col">
              <div class="contact-info-title">
                {{ t('contact.phone') }}:
              </div>
              <div class="contact-info-content">
                012-123456
              </div>
            </div>
            <div class="contact-description-col" style="margin-top: 10px;">
              <div class="contact-info-title">
                {{ t('contact.postcode') }}:
              </div>
              <div class="contact-info-content">
                5000
              </div>
            </div>
            <div class="contact-description-col" style="margin-top: 10px;">
              <div class="contact-info-title">
                {{ t('contact.email') }}:
              </div>
              <div class="contact-info-content">
                dgeywi@gvuw.com
              </div>
            </div>
            <div class="contact-description-col" style="margin-top: 10px;">
              <div class="contact-info-title">
                {{ t('contact.address') }}:
              </div>
              <div class="contact-info-content">
                Malaysia
              </div>
            </div>
            <div class="contact-description-col" style="margin-top: 10px;">
              <div class="contact-info-title">
                {{ t('contact.website') }}:
              </div>
              <div class="contact-info-content">
                www.ctvybu.com
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
  background-color: #47C68F;
  border-radius: 100px;
  padding: 100px 300px;
}

.contact-content {

}

.contact-title {
  font-size: 44px;
  font-weight: 600;
}

.contact-col {
  display: flex;
  margin-top: 50px;
}

.contact-img {
  width: 60%;
}

.contact-description {
  width: 40%;
  background-color: #1A1A1A;
  padding: 90px;
  border-radius: 40px;
  margin-left: -35px;
}

.contact-description-col {
  display: flex;
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
</style>