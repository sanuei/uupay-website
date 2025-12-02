import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import 'element-plus/dist/index.css';
import i18n from './i18n'
import router from './router/index'
import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faXTwitter, faYoutube, faTelegram, faInstagram, faDiscord } from '@fortawesome/free-brands-svg-icons'

library.add(faXTwitter, faYoutube, faTelegram, faInstagram, faDiscord)

const head = createHead()

const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus);
app.use(i18n);
app.use(router);
app.use(head);
app.use(createPinia());
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.mount('#app');
// createApp(App).mount('#app')

