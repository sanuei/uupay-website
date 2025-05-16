<script setup lang="ts">
import { REVIEW_ITEMS, CONTACTUS, DOWNLINK } from '@/constants/index'
import { Swiper, SwiperSlide } from 'swiper/vue'
import ReviewCard from './ReviewCard.vue'
import 'swiper/css'

const SECTION_BG = 'review-section-bg'
const FOOTER_BG = {
  mobile: 'footer-mobile-bg',
  desktop: 'footer-desktop-bg'
}
</script>

<template>
  <div class="reviews-part">
    <div class="review-header">
      <div class="review-header-name">
        <img src="@/assets/images/header-icon-logo-web.png" style="width: 30px; height: 30px; display: flex; align-items: center" alt="" />
        <span class="title-name">ABC万能卡</span>
      </div>
      <div class="review-header-intro">
        通过ABC Pay开始您的加密货币支付之旅/快捷、无缝、安全。
        <div class="start-use">
          开始使用
        </div>
      </div>
    </div>
    <div class="review-bottom">
      <div class="review-icon">
        <div class="download-ios">
          <img src="@/assets/images/download-ios.png" alt="" />
        </div>
        <div class="download-android">
          <img src="@/assets/images/download-android.png" alt="" />
        </div>
      </div>
      <div class="review-support">
        <div class="review-support-content">
          <div class="review-support-row-head">
            支持
          </div>
          <div class="review-support-row">
            常见问题解答
          </div>
          <div class="review-support-row">
            下载应用程序
          </div>
          <div class="review-support-row">
            同意条款和条件
          </div>
        </div>
        <div class="review-support-content">
          <div class="review-support-row-head">
            帮助
          </div>
          <div class="review-support-row">
            FAQs
          </div>
          <div class="review-support-row">
            联系我们
          </div>
        </div>
        <div class="review-support-content">
          <div class="review-support-row-head">
            关于我们
          </div>
          <div class="review-support-row">
            我们的使命
          </div>
          <div class="review-support-row">
            领导团队
          </div>
          <div class="review-support-row">
            合规和安全
          </div>
          <div class="review-support-row">
            合作伙伴
          </div>
          <div class="review-support-row">
            加入我们
          </div>
          <div class="review-support-row">
            联盟计划
          </div>
        </div>
      </div>
    </div>
    <div class="review-bottom-copyright">
      <div class="review-bottom-copyright-title">
        © 2025 ABCPay 版权所有。
      </div>
      <div class="review-bottom-copyright-condition">
        <div class="review-bottom-copyright-condition-title">
          条款及条件
        </div>
        <div class="review-bottom-copyright-condition-title">
          隐私政策
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.reviews-part {
  background: #2D2D2D;
  padding: 20px 200px;

  .review-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid #979797;
    padding: 20px 0 50px 0;

    .review-header-name {
      display: flex;
      align-items: center;
      flex: 1;

      .title-name{
        color: #fff;
        display: flex;
        align-items: center;
        margin-left: 10px;
      }
    }

    .review-header-intro {
      width: 100%;
      color: #fff;
      flex: 1;
      display: flex;
      justify-content: end;
      align-items: center;

      .start-use {
        margin-left: 20px;
        background: #1573FF;
        padding: 10px 20px;
        border-radius: 15px;
      }
    }
  }

  .review-bottom {
    margin: 50px 0 0 0;
    display: flex;
    justify-content: space-between;

    .review-icon {
      .download-ios {
        margin-bottom: 30px;
      }
    }

    .review-support {
      display: flex;

      .review-support-content {
        margin-right: 200px;

        .review-support-row-head {
          color: #fff;
        }

        .review-support-row {
          margin-top: 30px;
          color: #fff;
        }
      }
    }
  }

  .review-bottom-copyright {
    display: flex;
    justify-content: space-between;
    margin: 100px 0 50px 0;

    .review-bottom-copyright-title {
      color: #fff;
    }

    .review-bottom-copyright-condition {
      display: flex;

      .review-bottom-copyright-condition-title {
        color: #fff;
        margin: 0 60px;
      }
    }
  }
}
</style>