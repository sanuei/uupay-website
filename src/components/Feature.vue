<script setup lang="ts">
import { ref } from 'vue'
// import { FEATURE_ITEMS } from '@/constants'
// import exploreBgMobile from '@/assets/images/explore-bg-mobile.png'

const el = ref<HTMLElement | null>(null)

defineExpose({ el })
</script>

<template>
    <section class="relative" ref="el">
        <i id="feature" class="absolute w-0 h-0 overflow-hidden opacity-0 left-0 -top-10 lg:-top-20"></i>
        <div class="feature-part">
          <div class="feature-part-title">
            我们的特色
          </div>
          <div class="feature-part-title-content">
            我们用户友好的界面，只需点击几下即可发起转账。我们的系统采用最新的加密技术，确保您的个人和财务信息安全无虞。此外，我们极具竞争力的汇率让您获得最大的收益。
          </div>
          <div class="feature-part-title-content-second">
            在我们的平台上获取您的虚拟卡或实体卡，开始交易。
          </div>

          <div class="feature-part-title" style="margin-top: 50px">
            国际转账
          </div>
          <div class="feature-part-title-content">
            我们致力于让每个人（从小企业主到大型企业都能快速，实惠，轻松地进行国际支付。
          </div>

          <div class="feature-part-title" style="margin-top: 50px">
            安全可靠
          </div>
          <div class="feature-part-title-content">
            安全且用户友好的平台，使个人和组织能够轻松地在全球范围内发送和接收付款。
          </div>

          <div class="feature-part-title" style="margin-top: 50px">
            透明与简单
          </div>
          <div class="feature-part-title-content">
            我们优先考虑用户信息和交易的安全，利用最新技术和最佳实践来保证您的数据安全。
          </div>
        </div>
        <div class="feature-part-function">
          <div class="feature-part-function-title">
            我们提供的多种功能
          </div>
          <div class="feature-part-function-img">
            <img src="@/assets/images/phone-feature.png" alt="" />
          </div>
        </div>
        <div class="feature-part-function-content">
          <div class="feature-part-function-content-row">
            <div class="feature-part-function-content-row-img">
              <img src="@/assets/images/exchange.png" alt="" />
            </div>
            <div class="feature-part-function-content-row-title">
              全球货币兑换
            </div>
            <div class="feature-part-function-content-row-content">
              以有竞争力的汇率将您的钱兑换成您选择的货币
            </div>
          </div>
        </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/security.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            银行级安全
          </div>
          <div class="feature-part-function-content-row-content">
            请放心，您的数据和交易将受到相同级别的安全保护
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/24-support.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            24*7 客户支持
          </div>
          <div class="feature-part-function-content-row-content">
            随时获得我们知识渊博的客户支持团队的快速和友好的支持
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/moneys.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            多种付款方式
          </div>
          <div class="feature-part-function-content-row-content">
            选择多种付款方式以满足您的需求，包括信用卡/借记卡、银行
          </div>
        </div>
      </div>
      <div class="feature-part-function-solution">
        <img src="@/assets/images/phone-solution.png" alt="" />
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/moneys.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            您的一体化加密支付解决方案
          </div>
          <div class="feature-part-function-content-row-content">
            随时随地，人人皆可访问的加密钱包。让我们通过ABC Pay 用加密货币支付，拥抱未来
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/security.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            像使用法定货币一样使用加密货币
          </div>
          <div class="feature-part-function-content-row-content">
            快速、无缝、安全：使用ABC Pay 将加密货币转化为日常购买
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/security.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            支持ATM取款
          </div>
          <div class="feature-part-function-content-row-content">
            请放心，您的数据和交易受到相同级别的安全保护
          </div>
        </div>
      </div>
      <div class="feature-part-function-content">
        <div class="feature-part-function-content-row">
          <div class="feature-part-function-content-row-img">
            <img src="@/assets/images/moneys.png" alt="" />
          </div>
          <div class="feature-part-function-content-row-title">
            多种付款方式
          </div>
          <div class="feature-part-function-content-row-content">
            多种付款方式
          </div>
        </div>
      </div>
      <div class="feature-part-function-solution">
        <img src="@/assets/images/phone-bottom-img.png" alt="" />
      </div>
    </section>
</template>
<style scoped>
.feature-part {
  margin-top: 50px;
  background-image: url('@/assets/images/phone-map.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 10px;

  .feature-part-title {
    font-size: 24px;
  }

  .feature-part-title-content {
    margin-top: 30px;
    font-size: 14px;
  }

  .feature-part-title-content-second {
    font-size: 14px;
    margin-top: 20px;
  }
}

.feature-part-function {
  padding: 10px;
  margin-top: 20px;

  .feature-part-function-title {
    font-size: 24px;
  }

  .feature-part-function-img {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }
}

.feature-part-function-content {
  padding: 10px;

  .feature-part-function-content-row {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    border-radius: 15px;
    padding: 15px;

    .feature-part-function-content-row-img {
      margin-bottom: 10px;
    }

    .feature-part-function-content-row-title {
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
    }

    .feature-part-function-content-row-content {
      font-size: 14px;
    }
  }
}

.feature-part-function-solution {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>