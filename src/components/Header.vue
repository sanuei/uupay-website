<script setup lang="ts">
import { useScroll } from '@vueuse/core'

defineProps<{
    isFeature: boolean
    isExplore: boolean
}>()

const { y } = useScroll(window)

const featureClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
const exploreClass = 'before:absolute before:content-[""] before:w-2 before:h-2 before:rounded-full  before:left-1/2 before:-translate-x-1/2 before:-bottom-[10px]'
</script>
<template>
<!--    <header class="h-[70px] lg:h-[103px] z-50 transition-all sticky top-0" :class="[y >= 10 && 'bg-white']">-->
<!--        <ul class="flex items-center max-w-[1280px] px-[23px] mx-auto h-full">-->
<!--            <li class="flex items-center">-->
<!--                <img class="w-[38px] lg:w-[53px]" src="@/assets/images/header-icon.svg" alt="header icon" />-->
<!--                <span class="ml-[9px] font-bold text-2xl lg:text-[30px]">有得聊</span>-->
<!--            </li>-->
<!--            <li class="ml-[23px] lg:ml-[62px] text-base lg:text-xl font-semibold text-text-blue">-->
<!--                <a href="#feature" :class="['relative', isFeature && featureClass]">特征</a>-->
<!--            </li>-->
<!--            <li class="ml-[23px] lg:ml-[60px] text-base lg:text-xl font-semibold text-text-blue">-->
<!--                <a href="#explore" :class="['relative', isExplore && exploreClass]">发现</a>-->
<!--            </li>-->
<!--        </ul>-->
<!--    </header>-->
  <div class="header-part">
    <div>
      <img src="@/assets/images/header-phone-bg.png" style="max-width: 104%; width: 104%; position: absolute; left: -4px; z-index: -1;" alt="" />
    </div>
    <div class="header-head">
      <div class="name-side">
        <img src="@/assets/images/header-icon-logo-web.png" alt="" />
        <span class="title-name">ABC万能卡</span>
      </div>
      <div class="header-language">
        简体中文
      </div>
    </div>
    <div class="header-about">
      <div class="header-about-option">
        关于我们
      </div>
      <div class="header-about-option">
        <a href="#feature" :class="['relative', isFeature && featureClass]">特征</a>
      </div>
      <div class="header-about-option">
        <a href="#explore" :class="['relative', isExplore && exploreClass]">问题</a>
      </div>
      <div class="header-about-option">
        <a href="#explore" :class="['relative', isExplore && exploreClass]">接触</a>
      </div>
    </div>
    <div class="header-big-title">
      <div class="header-big-title-text">
        简单，透明，
      </div>
      <div class="header-big-title-text">
        实惠的全球交易
      </div>
    </div>
    <div class="header-small-title">
      受证劵委员会监管
    </div>
    <div class="header-button">
      <div class="header-button-start">
        开始使用
      </div>
      <div class="header-button-get">
        立即获取您的卡
      </div>
    </div>
    <div class="header-download-img">
      <div class="download-ios">
        <img src="@/assets/images/download-ios.png" alt="" />
      </div>
      <div class="download-android">
        <img src="@/assets/images/download-android.png" alt="" />
      </div>
    </div>
    <div class="header-download-btn">
      <div>
        下载
      </div>
    </div>
    <div class="header-img">
      <img src="@/assets/images/header-phone-bottom.png" alt="" />
    </div>
    <div class="header-img">
      <img src="@/assets/images/header-partner.png" alt="" />
    </div>
  </div>
</template>
<style scoped>
.header-part {
  .header-head {
    display: flex;
    justify-content: space-between;
    padding: 20px 10px;

    .name-side {
      display: flex;
      align-items: center;

      .title-name {
        color: #fff;
        margin-left: 10px;
        font-size: 20px;
      }
    }

    .header-language {
      color: #fff;
      font-size: 14px;
      display: flex;
      align-items: center;
    }
  }

  .header-about {
    display: flex;
    padding: 10px;

    .header-about-option {
      color: #fff;
      font-size: 14px;
      margin-right: 20px;
    }
  }

  .header-big-title {
    padding: 10px;

    .header-big-title-text {
      color: #fff;
      font-size: 32px;
    }
  }

  .header-small-title {
    padding: 10px;
    color: #fff;
    font-size: 12px;
  }

  .header-button {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;

    .header-button-start {
      flex: 1;
      display: flex;
      justify-content: center;
      color: #fff;
      background: #0052B4;
      margin: 0 10px;
      padding: 10px 0;
      border-radius: 15px;
    }

    .header-button-get {
      flex: 1;
      display: flex;
      justify-content: center;
      color: #fff;
      border: 1px solid #fff;
      margin: 0 10px;
      padding: 10px 0;
      border-radius: 15px;
    }
  }

  .header-download-img {
    display: flex;
    justify-content: center;
    margin-top: 30px;

    .download-ios {
      img {
        width: 90px;
        height: 26px;
      }
    }

    .download-android {
      img {
        width: 90px;
        height: 26px;
        margin-left: 10px;
      }
    }
  }

  .header-download-btn {
    display: flex;
    justify-content: center;
    margin-top: 50px;
    div {
      color: #fff;
      font-size: 20px;
      background: #3499FD;
      display: flex;
      justify-content: center;
      width:90px;
      align-items: center;
      padding: 10px 15px;
      border-radius: 6px;
    }
  }

  .header-img {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>