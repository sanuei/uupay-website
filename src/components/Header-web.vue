<script setup lang="ts">
import { useScroll } from '@vueuse/core'

defineProps<{
  isFeature: boolean
  isExplore: boolean
}>()

const { y } = useScroll(window)
const featureClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:bg-background-blue before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
const exploreClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full  before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'

</script>
<template>
  <div class="header-part">
    <div class="header-container">
      <div class="name-side">
        <img src="@/assets/images/header-icon-logo-web.png" alt="" />
        <span class="title-name">ABC万能卡</span>
      </div>
      <div class="option-side">
        <div class="option-type">
          关于我们
        </div>
        <div class="option-type">
          <a href="#feature" :class="['relative', isFeature && featureClass]">特征</a>
        </div>
        <div class="option-type">
          <a href="#explore" :class="['relative', isExplore && exploreClass]">问题</a>
        </div>
        <div class="option-type">
          接触
        </div>
        <div class="option-type">
          简体中文
        </div>
<!--        <div class="option-download-type">-->
<!--          下载-->
<!--        </div>-->
      </div>
    </div>
    <div class="content">
      <div class="content-left-side">
        <div class="content-left-side-title">
          简单、透明、实惠的全球交易
        </div>
        <div class="content-left-side-content">
          告别漫长的等待和高昂的费用。我们便捷的平台让您可以汇款给亲朋好友、支付账单，并在世界任何地方购物。相信我们安全高效地处理您的转账。
        </div>
        <div class="content-left-side-short-content">
          受证劵委员会监管
        </div>
        <div class="content-left-side-content-use">
          <div class="content-left-side-content-start">
            开始使用
          </div>
          <div class="content-left-side-content-getCard">
            立即获取您的卡
          </div>
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
      <div class="content-right-side">
        <img src="@/assets/images/banner-right-bg.png" alt="" />
      </div>
    </div>
  </div>
  <div class="bottom-bg">
    <img src="@/assets/images/banner-bottom-bg.png" alt="" />
  </div>
</template>

<style scoped>
.header-part {
  background-image: url('@/assets/images/banner-background.png');
  background-repeat: no-repeat;
  background-size: cover;

  .header-container {
    display: flex;
    justify-content: space-between;
    padding: 10px 60px;
    background: #DBDBDB14;

    .name-side {
      display: flex;
      align-content: center;

      .title-name {
        display: flex;
        align-items: center;
        color: #fff;
        margin-left: 10px;
        font-size: 24px;
      }
    }

    .option-side {
      display: flex;
      align-items: center;

      .option-type {
        margin: 0 20px;
        color: #fff;
        font-size: 14px;
      }

      .option-download-type {
        background: #1573FF;
        border: 1px solid #fff;
        font-size: 14px;
        padding: 5px 15px;
        border-radius: 25px;
        color: #fff;
      }
    }
  }

  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 100px;

    .content-left-side {
      flex: 1;
      margin: 20px 30px 20px 60px;

      .content-left-side-title {
        color: #fff;
        font-size: 48px;
        margin: 20px 0;
      }

      .content-left-side-content {
        color: #fff;
        font-size: 18px;
        margin-bottom: 40px;
      }

      .content-left-side-short-content {
        color: #fff;
        margin-bottom: 40px;
      }

      .content-left-side-content-use {
        display: flex;
        margin-bottom: 50px;

        .content-left-side-content-start {
          background: #0052B4;
          color: #fff;
          font-size: 20px;
          padding: 10px 20px;
          border-radius: 15px;
        }

        .content-left-side-content-getCard {
          border: 1px solid #fff;
          color: #fff;
          padding: 10px 20px;
          border-radius: 15px;
          margin-left: 25px;
        }
      }

      .download-content {
        display: flex;

        .download-ios {
          margin-right: 25px;
        }
      }
    }

    .content-right-side {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}

.bottom-bg {
  img {
    width: 100%;
  }
}
</style>