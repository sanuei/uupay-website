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
    <section :class="['overflow-x-hidden mt-10 md:mt-[117px] relative', SECTION_BG]">
      <div class="review-part">
        <div class="review-part-header">
          <div class="review-part-header-logo">
            <img src="@/assets/images/header-icon-logo-web.png" alt="" />
            <span class="title-name">ABC万能卡</span>
          </div>
          <div class="review-part-header-button">
            开始使用
          </div>
        </div>
        <div class="review-part-header-content" style="margin-top: 10px">
          通过ABCPay开始您的加密货币支付之旅
        </div>
        <div class="review-part-header-content" style="border-bottom: 1px solid #979797; padding-bottom: 10px">
          快捷、无缝、安全
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
        <div class="review-part-header-condition">
            服务协议 ｜ 隐私政策 ｜ 可接受使用政策
        </div>
        <div class="review-part-header-copyright">
          Copyright © ABC Pay 2025 All Rights Reserved
        </div>
      </div>
    </section>
</template>
<style scoped>
.review-part {
  background: #2D2D2D;
  padding: 10px 20px;

  .review-part-header {
    display: flex;
    justify-content: space-between;

    .review-part-header-logo {
      display: flex;
      align-items: center;

      .title-name {
        font-size: 20px;
        color: #fff;
        margin-left: 10px;
      }
    }

    .review-part-header-button {
      font-size: 10px;
      background: #1573FF;
      color: #fff;
      display: flex;
      align-items: center;
      padding: 10px 20px;
      border-radius: 10px;
    }
  }

  .review-part-header-content {
    font-size: 8px;
    color: #fff;
  }

  .review-bottom {
    display: flex;
    justify-content: space-between;

    .review-icon {
      .download-ios {
        width: 68px;
        margin-top: 10px;
      }

      .download-android {
        width: 68px;
        margin-top: 10px;
      }
    }

    .review-support {
      display: flex;

      .review-support-content {
        margin-right: 25px;
        .review-support-row-head {
          color: #fff;
          font-size: 10px;
          margin-top: 10px;
        }

        .review-support-row {
          color: #fff;
          font-size: 10px;
          margin-top: 10px;
        }
      }
    }
  }
  .review-part-header-condition {
    font-size: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }

  .review-part-header-copyright {
    font-size: 10px;
    color: #fff;
    display: flex;
    justify-content: center;
    margin-top: 15px;
  }
}
</style>