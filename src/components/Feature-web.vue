<script setup lang="ts">
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)

defineExpose({ el })
</script>

<template>
  <div class="feature-part relative" ref="el">
    <div class="feature-header">
      <div class="feature-header-title">
        我们的特色
      </div>
      <div class="feature-header-content">
        我们用户友好的界面，只需要点击几下即可发起转账。我们的系统采用最新的加密技术，确保您的个人和财务信息安全无虞。此外，我们极具竞争力的汇率让您获得最大的收益。
      </div>
      <div class="feature-header-short-content">
        在我们的平台上获得您的虚拟卡或实体卡，开始交易。
      </div>
    </div>
    <div class="feature-function">
      <div class="feature-function-intro">
        <div class="feature-function-intro-title">
          国际转账
        </div>
        <div class="feature-function-intro-content">
          我们致力于让每个人（从小企业主到大型企业）都能快速、实惠、轻松地进行国际支付。
        </div>
      </div>
      <div class="feature-function-intro">
        <div class="feature-function-intro-title">
          安全可靠
        </div>
        <div class="feature-function-intro-content">
          安全且用户友好的平台，使个人和组织能够轻松地在全球范围内发送和接收付款。
        </div>
      </div>
      <div class="feature-function-intro">
        <div class="feature-function-intro-title">
          透明与简单
        </div>
        <div class="feature-function-intro-content">
          我们优先考虑用户信息和交易的安全，利用最新技术和最佳实践来保证您的数据安全。
        </div>
      </div>
    </div>
  </div>
  <div class="feature-medium-part">
    <div class="feature-medium-part-title">
      我们提供的多种功能
    </div>
    <div class="feature-medium-part-content">
      <div class="feature-medium-part-bg">
        <img src="@/assets/images/feature-medium-bg.png" alt="" />
      </div>
      <div class="feature-medium-part-medium-bg">
        <img src="@/assets/images/row-line.png" alt="" />
      </div>
      <div class="feature-medium-part-intro">
        <div class="feature-medium-part-intro-column">
         <div class="feature-medium-part-intro-column-img">
           <img src="@/assets/images/exchange.png" alt="" />
         </div>
          <div class="feature-medium-part-intro-column-title">
            全球货币兑换
          </div>
          <div class="feature-medium-part-intro-column-content">
            以有竞争力的汇率将您的钱兑换成您选择的货币
          </div>
        </div>

        <div class="feature-medium-part-intro-column">
          <div class="feature-medium-part-intro-column-img">
            <img src="@/assets/images/security.png" alt="" />
          </div>
          <div class="feature-medium-part-intro-column-title">
            银行级安全
          </div>
          <div class="feature-medium-part-intro-column-content">
            请放心，您的数据和交易将受到相同级别的安全保护
          </div>
        </div>

        <div class="feature-medium-part-intro-column">
          <div class="feature-medium-part-intro-column-img">
            <img src="@/assets/images/24-support.png" alt="" />
          </div>
          <div class="feature-medium-part-intro-column-title">
            24*7 客户支持
          </div>
          <div class="feature-medium-part-intro-column-content">
            随时获得我们知识渊博的客户支持团队的快速和友好的支持
          </div>
        </div>

        <div class="feature-medium-part-intro-column">
          <div class="feature-medium-part-intro-column-img">
            <img src="@/assets/images/moneys.png" alt="" />
          </div>
          <div class="feature-medium-part-intro-column-title">
            多种付款方式
          </div>
          <div class="feature-medium-part-intro-column-content">
            选择多种付款方式以满足您的需求，包括信用卡/借记卡、银行
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="feature-medium-part" style="margin-top: 200px">
    <div class="feature-medium-part-content">
      <div class="feature-medium-part-bg">
        <img src="@/assets/images/feature-medium-bg-second.png" alt="" />
      </div>
      <div class="feature-medium-part-medium-bg">
        <img src="@/assets/images/row-line.png" alt="" />
      </div>
      <div class="feature-medium-part-intro">
        <div class="feature-medium-part-intro-column">
          <div class="feature-medium-part-intro-column-img">
            <img src="@/assets/images/moneys.png" alt="" />
          </div>
          <div class="feature-medium-part-intro-column-title">
            您的一体化加密支付解决方案
          </div>
          <div class="feature-medium-part-intro-column-content">
            随时随地，人人皆可访问的加密钱包。让我们通过ABC Pay 用加密货币支付，拥抱未来
          </div>
        </div>

        <div class="feature-medium-part-intro-column">
          <div class="feature-medium-part-intro-column-img">
            <img src="@/assets/images/security.png" alt="" />
          </div>
          <div class="feature-medium-part-intro-column-title">
            像使用法定货币一样使用加密货币
          </div>
          <div class="feature-medium-part-intro-column-content">
            快速、无缝、安全：使用ABC Pay 将加密货币转化为日常购买
          </div>
        </div>

        <div class="feature-medium-part-intro-column">
          <div class="feature-medium-part-intro-column-img">
            <img src="@/assets/images/security.png" alt="" />
          </div>
          <div class="feature-medium-part-intro-column-title">
            支持ATM取款
          </div>
          <div class="feature-medium-part-intro-column-content">
            请放心，您的数据和交易受到相同级别的安全保护
          </div>
        </div>

        <div class="feature-medium-part-intro-column">
          <div class="feature-medium-part-intro-column-img">
            <img src="@/assets/images/moneys.png" alt="" />
          </div>
          <div class="feature-medium-part-intro-column-title">
            多种付款方式
          </div>
          <div class="feature-medium-part-intro-column-content">
            多种付款方式
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="download-part">
    <div class="download-part-bg">
      <div class="download-part-image">
        <img src="@/assets/images/downlaod-banner-bg.png" alt="" />
      </div>
      <div class="download-part-title">
        下载应用程式，开设账户并开始使用
      </div>
      <div class="download-content">
        <div class="download-ios">
          <img src="@/assets/images/download-ios.png" alt="" />
        </div>
        <div class="download-android">
          <img src="@/assets/images/download-android.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.feature-part {
  background-image: url('@/assets/images/feature-map.png');
  background-repeat: no-repeat;
  background-size: cover;
  padding: 60px 0;

  .feature-header {
    margin: 60px 20px;
    .feature-header-title {
      font-size: 40px;
      margin: 30px 40px 10px 60px;
    }

    .feature-header-content {
      width: 60%;
      font-size: 24px;
      margin: 30px 40px 30px 60px;
    }

    .feature-header-short-content {
      font-size: 24px;
      margin: 30px 40px 30px 60px;
    }
  }

  .feature-function {
    display: flex;
    justify-content: space-between;
    margin: 0 30px;

    .feature-function-intro {
      background: #FFFFFF66;
      margin: 0 30px;
      border: 1px solid #FFFFFF66;
      padding: 10px 15px;

      .feature-function-intro-title {
        font-size: 36px;
      }

      .feature-function-intro-content {
        font-size: 16px;
        margin: 30px 0;
      }
    }
  }
}

.feature-medium-part {
  margin: 20px 70px;

  .feature-medium-part-title {
    font-size: 40px;
    margin-bottom: 50px;
  }

  .feature-medium-part-content {
    display: flex;
    justify-content: space-between;

    .feature-medium-part-bg {
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .feature-medium-part-medium-bg {
      width: 20%;
    }

    .feature-medium-part-intro {
      width: 100%;

      .feature-medium-part-intro-column {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        padding: 10px 25px;
        border-radius: 15px;
        margin-bottom: 50px;

        .feature-medium-part-intro-column-img {
          margin-bottom: 10px;
        }

        .feature-medium-part-intro-column-title {
          font-weight: 500;
          font-size: 20px;
          margin-bottom: 10px;
        }

        .feature-medium-part-intro-column-content {
          margin-bottom: 10px;
          font-size: 20px;
        }
      }
    }
  }
}

.download-part {
  height: 500px;

  .download-part-bg {
    width: 100%;

    .download-part-image {
      width: 100%;
      display: flex;
      justify-content: center;
      position: absolute;
    }

    .download-part-title {
      position: relative;
      color: #fff;
      font-size: 48px;
      display: flex;
      justify-content: center;
      margin: 20px 40px;
      top: 100px;
    }

    .download-content {
      z-index: 100;
      display: flex;
      position: relative;
      justify-content: center;
      top: 200px;

      .download-ios {
        margin-right: 25px;
      }
    }
  }
}
</style>