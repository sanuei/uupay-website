# style.css 拆分与架构优化建议

## 1. 现状分析
当前 `src/style.css` 已接近 **3300行**。随着项目规模扩大，单文件维护面临以下问题：
- **可维护性低**：查找特定样式需要频繁滚动或全文搜索，逻辑深度较高。
- **耦合度高**：全局变量、基础样式、各页面区块样式（Hero, Features, Security等）及响应式逻辑混杂在一起，修改容易引发“牵一发而动全身”的风险。
- **协作冲突**：多人在同一文件修改样式时，极易产生 Git 冲突。

## 2. 拆分建议
建议采用 **模块化 CSS** 的架构思路，将全局通用样式与业务区块样式分离。

### 建议拆分结构：
```text
src/assets/styles/
├── main.css            # 入口文件，负责引入其他模块
├── variables.css       # 全局变量 (Colors, Typography system, Spacing)
├── base.css            # 基础重置 (Reset, Fonts, Body)
├── layout.css          # 全局布局 (Navbar, Footer, Container)
├── animations.css      # 通用动画 (Keyframes, Hover effects)
└── components.css       # 通用组件 (Buttons, Glass-cards, Badges)
```

### 业务相关样式迁移建议：
现有的 `style.css` 中大量针对 `WebContent1.vue` ~ `WebContent6.vue` 的区块样式，**不建议**继续留在全局 CSS 中，而是：
1. **组件化抽离**：将特定区块的样式迁移至对应 `.vue` 文件的 `<style scoped>` 中。
2. **局部导入**：如果样式过于庞大，可在 Vue 文件中通过 `@import` 引入特定模块。

## 3. 拆分后的收益
- **清晰的逻辑分层**：变量归变量，组件归组件，业务归业务。
- **性能更优**：Vue 组件 scoped 样式可以实现按需加载，减小首屏渲染压力。
- **易于迭代**：新开发者可以快速通过文件名定位到需要修改的代码块。

## 4. 下一步计划 (待执行)
1. 在 `src/assets/` 下创建新的样式目录结构。
2. 按照功能模块逐步分批迁移代码，确保每一步迁移都不破坏现有布局。
3. 在 `main.js` 或主入口引入 `main.css`。
