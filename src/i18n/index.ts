import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'
import zhTw from '../locales/zhTw'

const savedLang = localStorage.getItem('language') || 'zh'

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: savedLang,
  fallbackLocale: 'zh',
  globalInjection: true,
  messages: {
    en,
    zh,
    zhTw
  }
})

export default i18n