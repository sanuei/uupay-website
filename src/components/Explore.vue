<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from "vue-i18n";
import {DOWNLINK} from "@/constants";
// import type {CollapseModelValue} from "element-plus";

const el = ref<HTMLElement | null>(null)
const activeNames = ref(['1']);
const handleChange = () => {

}

defineExpose({ el })
const { t } = useI18n()

const copyInvitationCode = () => {
  const url = new URL(window.location.href)
  const invitationCode = url.searchParams.get('invitationCode')

  if (invitationCode) {
    navigator.clipboard.writeText(url.href)
      .then(() => {
        console.log('包含邀请码的链接已复制:', url.href)
      })
      .catch(err => {
        console.error('复制失败:', err)
      })
  } else {
    console.log('没有邀请码，不执行复制')
  }
}
</script>
<template>
    <section class="lg:px-0 relative" ref="el">
        <i id="explore" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
      <div class="explore-part">
        <div style="color: #fff; font-size: 20px; font-weight: 600;">
          {{ t('header.downloadBtn')}}
        </div>
        <div style="color: #fff; font-size: 16px; font-weight: 600; margin-top: 15px;">
          {{ t('feature.content9')}}
        </div>
        <div style="display: flex; align-items: center; margin-top: 15px;">
          <div style="color: #fff; font-size: 14px;">
            {{ t('feature.content10')}}
          </div>
          <div style="color: #000; background-color: #fff; padding: 10px 50px; border-radius: 25px; margin-left: 20px; font-size: 12px; font-weight: 600;">
            <a :href="DOWNLINK" @click="copyInvitationCode">{{ t('feature.content11') }}</a>
          </div>
        </div>
        <div class="download-wrapper">
          <a :href="DOWNLINK" @click="copyInvitationCode"><img src="@/assets/images/download-ios.png" alt="" /></a>
          <a :href="DOWNLINK" @click="copyInvitationCode"><img src="@/assets/images/download-android.png" alt="" /></a>
        </div>
        <div style="margin-top: 30px; display: flex; justify-content: center;">
          <img src="@/assets/images/phone-hand.png" style="width: 70%;" alt="" />
        </div>
      </div>
    </section>
</template>
<style scoped>
.explore-part {
  background: #000;
  padding: 20px 20px 0 20px;

  .download-wrapper {
    display: flex;
    justify-content: center; /* 可选，水平居中 */
    align-items: center;
    gap: 30px; /* 两图之间间隔 */
    flex-wrap: nowrap; /* 强制在一排，不换行 */
    overflow-x: auto; /* 如果内容过宽允许横向滚动 */
    max-width: 100%;
    margin-top: 50px;
  }

  .download-wrapper img {
    height: auto;
  }

  .explore-title {
    font-size: 20px;
  }
}

:deep(.el-collapse-item__header) {
  font-size: 14px;
}

.el-collapse-item__header {
  max-width: 300px; /* 限制最大宽度 */
  white-space: normal; /* 允许换行 */
  word-break: break-word; /* 允许单词换行 */
}
</style>