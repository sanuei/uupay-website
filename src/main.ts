import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
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
app.use(i18n);
app.use(router);
app.use(head);
app.use(createPinia());
app.mount('#app');

