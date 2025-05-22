import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'

const locale = localStorage.getItem('language') || 'zh'

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale,
  fallbackLocale: 'en',
  messages: {
    en,
    zh
  }
})

export default i18n