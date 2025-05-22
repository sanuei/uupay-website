<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from "vue-i18n";
// import type {CollapseModelValue} from "element-plus";

const el = ref<HTMLElement | null>(null)
const activeNames = ref(['1']);
const handleChange = () => {

}

defineExpose({ el })
const { t } = useI18n()
</script>
<template>
    <section class="px-4 lg:px-0 relative" ref="el">
        <i id="explore" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
      <div class="explore-part">
        <div class="explore-title">
          {{ t('explore.headTitle') }}
        </div>
        <div class="demo-collapse">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item name="1">
              <template #title>
                <div style="max-width: 100%; white-space: normal; word-break: break-word; padding-right: 20px; line-height: 1.4;">
                  {{ t('explore.title1') }}
                </div>
              </template>
              <div style="font-size: 12px">
                {{ t('explore.content1') }}
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="margin-top: 20px;" v-model="activeNames" @change="handleChange">
            <el-collapse-item name="2">
              <template #title>
                <div style="max-width: 100%; white-space: normal; word-break: break-word; padding-right: 20px; line-height: 1.4;">
                  {{ t('explore.title2') }}
                </div>
              </template>
              <div style="font-size: 12px">
                {{ t('explore.content2') }}
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="margin-top: 20px;" v-model="activeNames" @change="handleChange">
            <el-collapse-item name="3">
              <template #title>
                <div style="max-width: 100%; white-space: normal; word-break: break-word; padding-right: 20px; line-height: 1.4;">
                  {{ t('explore.title3') }}
                </div>
              </template>
              <div style="font-size: 12px">
                {{ t('explore.content3') }}
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="margin-top: 20px;" v-model="activeNames" @change="handleChange">
            <el-collapse-item name="4">
              <template #title>
                <div style="max-width: 100%; white-space: normal; word-break: break-word; padding-right: 20px; line-height: 1.4;">
                  {{ t('explore.title4') }}
                </div>
              </template>
              <div style="font-size: 12px">
                {{ t('explore.content4') }}
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="margin-top: 20px;" v-model="activeNames" @change="handleChange">
            <el-collapse-item name="5">
              <template #title>
                <div style="max-width: 100%; white-space: normal; word-break: break-word; padding-right: 20px; line-height: 1.4;">
                  {{ t('explore.title5') }}
                </div>
              </template>
              <div style="font-size: 12px">
                {{ t('explore.content5') }}
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>
      </div>
    </section>
</template>
<style scoped>
.explore-part {
  padding: 10px;

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