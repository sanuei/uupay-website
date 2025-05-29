import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import i18n from './i18n'

console.log('当前语言:', i18n.global.locale.value)

const app = createApp(App);
app.use(ElementPlus);
app.use(i18n);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app');
// createApp(App).mount('#app')

