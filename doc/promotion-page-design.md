# 限时活动页面设计文档

## 1. 活动概述

**活动名称**: UUPAY 限时开卡优惠活动  
**活动内容**:
- ✨ 开卡免手续费（原价 10 USDT）
- ✨ 充值免手续费（原价 1%）

**活动时间**: [待定]  
**CTA 跳转链接**: `https://uupay.cc/zh-cn/register?invitationCode=VJAIIG`

---

## 2. 页面结构设计

### 2.1 页面路由
- **路径**: `/:lang/promotion`
- **组件**: `src/views/PromotionPage.vue`
- **支持语言**: 简体中文 (zh-cn)、繁体中文 (zh-tw)、英文 (en)、泰语 (th)

### 2.2 导航栏集成

在 `WebHeader.vue` 和 `PhoneHeader.vue` 中添加限时活动导航项：

```html
<li class="promotion-highlight">
  <a @click="goToPromotion">{{ t('promotion.navTitle') }}</a>
</li>
```

**高亮样式**:
- 渐变背景色 (brand-500 → brand-400)
- 动态闪烁效果 (pulse animation)
- 圆角胶囊按钮样式

---

## 3. 页面视觉设计

### 3.1 整体风格
- 继承 `InvitePage.vue` 的高端现代设计语言
- 深色主题 (暗夜金融风格)
- 玻璃拟态效果 (glassmorphism)
- 渐变光效与动态元素

### 3.2 页面区块

#### Hero 区域
```
┌─────────────────────────────────────┐
│   🔥 限时活动 (闪烁徽章)              │
│                                     │
│   ██████   开卡免手续费   ██████    │
│   ██████   充值免手续费   ██████    │
│                                     │
│   [原价: 10U]  →  [现价: 0U]        │
│   [原价: 1%]   →  [现价: 0%]        │
│                                     │
│   ┌─────────────────────────────┐   │
│   │      ⏰ 活动倒计时           │   │
│   │      XX天 XX时 XX分 XX秒     │   │
│   └─────────────────────────────┘   │
│                                     │
│        [立即参与] (主CTA按钮)        │
│                                     │
└─────────────────────────────────────┘
```

#### 优惠详情卡片
```
┌──────────────────┐  ┌──────────────────┐
│  💳 开卡优惠      │  │  💰 充值优惠      │
│                  │  │                  │
│  原价: 10 USDT   │  │  原价: 1% 手续费  │
│  ↓               │  │  ↓               │
│  限时: 0 USDT    │  │  限时: 0%        │
│                  │  │                  │
│  节省 10U ✓      │  │  充值更划算 ✓    │
└──────────────────┘  └──────────────────┘
```

#### 活动规则区
- 活动时间说明
- 参与条件
- 注意事项

#### CTA 区域
- 主按钮: "立即参与" → 跳转到邀请注册页
- 辅助文案: "已有 XX 用户参与"

---

## 4. 多语言文案

### 4.1 简体中文 (zh-cn)
```typescript
promotion: {
  navTitle: '限时活动',
  title: '限时开卡优惠',
  subtitle: '开卡充值双免费，限时福利别错过',
  freeCardTitle: '开卡免手续费',
  freeCardOriginal: '原价 10 USDT',
  freeCardNow: '限时免费',
  freeTopupTitle: '充值免手续费',
  freeTopupOriginal: '原价 1% 手续费',
  freeTopupNow: '限时免费',
  ctaButton: '立即参与',
  countdownTitle: '活动倒计时',
  days: '天',
  hours: '时',
  minutes: '分',
  seconds: '秒',
  ruleTitle: '活动规则',
  rule1: '活动期间内新注册用户可享受开卡免手续费',
  rule2: '活动期间内所有用户充值免手续费',
  rule3: '活动最终解释权归 UUPAY 所有',
  userCount: '已有超过 100,000+ 用户参与',
}
```

### 4.2 繁體中文 (zh-tw)
```typescript
promotion: {
  navTitle: '限時活動',
  title: '限時開卡優惠',
  subtitle: '開卡充值雙免費，限時福利別錯過',
  freeCardTitle: '開卡免手續費',
  freeCardOriginal: '原價 10 USDT',
  freeCardNow: '限時免費',
  freeTopupTitle: '充值免手續費',
  freeTopupOriginal: '原價 1% 手續費',
  freeTopupNow: '限時免費',
  ctaButton: '立即參與',
  countdownTitle: '活動倒計時',
  days: '天',
  hours: '時',
  minutes: '分',
  seconds: '秒',
  ruleTitle: '活動規則',
  rule1: '活動期間內新註冊用戶可享受開卡免手續費',
  rule2: '活動期間內所有用戶充值免手續費',
  rule3: '活動最終解釋權歸 UUPAY 所有',
  userCount: '已有超過 100,000+ 用戶參與',
}
```

### 4.3 English (en)
```typescript
promotion: {
  navTitle: 'Limited Offer',
  title: 'Limited-Time Card Promotion',
  subtitle: 'Free card issuance & top-up fees - Don\'t miss out!',
  freeCardTitle: 'Free Card Issuance',
  freeCardOriginal: 'Originally 10 USDT',
  freeCardNow: 'Now FREE',
  freeTopupTitle: 'Free Top-up Fee',
  freeTopupOriginal: 'Originally 1% fee',
  freeTopupNow: 'Now FREE',
  ctaButton: 'Join Now',
  countdownTitle: 'Countdown',
  days: 'Days',
  hours: 'Hours',
  minutes: 'Mins',
  seconds: 'Secs',
  ruleTitle: 'Terms & Conditions',
  rule1: 'New users during the promotion period can enjoy free card issuance',
  rule2: 'All users enjoy free top-up fees during the promotion',
  rule3: 'UUPAY reserves the right to final interpretation',
  userCount: 'Over 100,000+ users have joined',
}
```

### 4.4 ไทย (th)
```typescript
promotion: {
  navTitle: 'โปรโมชั่นจำกัดเวลา',
  title: 'โปรโมชั่นบัตรจำกัดเวลา',
  subtitle: 'เปิดบัตรและเติมเงินฟรี - อย่าพลาด!',
  freeCardTitle: 'เปิดบัตรฟรี',
  freeCardOriginal: 'ราคาเดิม 10 USDT',
  freeCardNow: 'ฟรีช่วงเวลาจำกัด',
  freeTopupTitle: 'เติมเงินฟรี',
  freeTopupOriginal: 'ค่าธรรมเนียมเดิม 1%',
  freeTopupNow: 'ฟรีช่วงเวลาจำกัด',
  ctaButton: 'เข้าร่วมเลย',
  countdownTitle: 'นับถอยหลัง',
  days: 'วัน',
  hours: 'ชั่วโมง',
  minutes: 'นาที',
  seconds: 'วินาที',
  ruleTitle: 'กติกาและเงื่อนไข',
  rule1: 'ผู้ใช้ใหม่ในช่วงโปรโมชั่นสามารถเปิดบัตรฟรี',
  rule2: 'ผู้ใช้ทุกคนได้รับการเติมเงินฟรีในช่วงโปรโมชั่น',
  rule3: 'UUPAY ขอสงวนสิทธิ์ในการตีความขั้นสุดท้าย',
  userCount: 'มีผู้ใช้มากกว่า 100,000+ คนเข้าร่วมแล้ว',
}
```

---

## 5. 需要实现的文件

| 文件路径 | 操作 | 说明 |
|---------|------|------|
| `src/views/PromotionPage.vue` | 新增 | 限时活动页面主组件 |
| `src/router/index.ts` | 修改 | 添加 promotion 路由 |
| `src/components/WebHeader.vue` | 修改 | 添加导航项并高亮 |
| `src/components/PhoneHeader.vue` | 修改 | 添加移动端导航项 |
| `src/i18n/locales/zh.ts` | 修改 | 添加简体中文文案 |
| `src/i18n/locales/zhtw.ts` | 修改 | 添加繁体中文文案 |
| `src/i18n/locales/en.ts` | 修改 | 添加英文文案 |
| `src/i18n/locales/th.ts` | 修改 | 添加泰语文案 |

---

## 6. 交互设计

### 6.1 动画效果
- 页面加载渐入动画 (fade-in-up)
- 优惠卡片悬停放大效果 (scale 1.02)
- 倒计时数字翻转动画
- CTA 按钮脉冲光效

### 6.2 响应式设计
- 桌面端: 双列卡片布局
- 移动端: 单列堆叠布局
- 导航栏高亮在手机端也需显示

---

## 7. 验证计划

### 7.1 开发验证
1. 运行 `npm run dev` 启动开发服务器
2. 访问 `http://localhost:5173/zh-cn/promotion` 检查页面
3. 切换语言测试所有4种语言显示正确
4. 点击导航栏检查页面跳转

### 7.2 手动测试
1. 检查导航栏高亮样式是否突出
2. 验证 CTA 按钮跳转链接正确
3. 测试响应式布局在不同屏幕尺寸下的表现
4. 确认所有多语言文案无遗漏
