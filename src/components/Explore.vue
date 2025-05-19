<script setup lang="ts">
import { ref } from 'vue'
// import type {CollapseModelValue} from "element-plus";

const el = ref<HTMLElement | null>(null)
const activeNames = ref(['1']);
const handleChange = () => {

}

defineExpose({ el })
</script>
<template>
    <section class="px-4 lg:px-0 relative" ref="el">
        <i id="explore" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
      <div class="explore-part">
        <div class="explore-title">
          常见问题
        </div>
        <div class="demo-collapse">
          <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="什么是加密货币？" name="1">
              <div style="font-size: 12px">
                加密货币是一种基于区块链接技术的数字货币，利用密码学技术确保交易安全和控制新单位的生成。其主要的特点包括去中心化、匿名性、全球性、有限供应和高波动性。
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="margin-top: 20px;" v-model="activeNames" @change="handleChange">
            <el-collapse-item title="ABC Pay内申请的银行卡性质是什么" name="2">
              <div style="font-size: 12px">
                加密货币是一种基于区块链接技术的数字货币，利用密码学技术确保交易安全和控制新单位的生成。其主要的特点包括去中心化、匿名性、全球性、有限供应和高波动性。
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="margin-top: 20px;" v-model="activeNames" @change="handleChange">
            <el-collapse-item title="如果我的汇款交易出现问题，会发生什么情况？" name="3">
              <div style="font-size: 12px">
                加密货币是一种基于区块链接技术的数字货币，利用密码学技术确保交易安全和控制新单位的生成。其主要的特点包括去中心化、匿名性、全球性、有限供应和高波动性。
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="margin-top: 20px;" v-model="activeNames" @change="handleChange">
            <el-collapse-item title="我可以追踪我的汇款交易吗？该如何追踪" name="4">
              <div style="font-size: 12px">
                加密货币是一种基于区块链接技术的数字货币，利用密码学技术确保交易安全和控制新单位的生成。其主要的特点包括去中心化、匿名性、全球性、有限供应和高波动性。
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-collapse style="margin-top: 20px;" v-model="activeNames" @change="handleChange">
            <el-collapse-item title="使用汇款服务汇款需要多长时间？" name="5">
              <div style="font-size: 12px">
                加密货币是一种基于区块链接技术的数字货币，利用密码学技术确保交易安全和控制新单位的生成。其主要的特点包括去中心化、匿名性、全球性、有限供应和高波动性。
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
</style>