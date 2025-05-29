import { createI18n } from 'vue-i18n'
import en from '../locales/en'
import zh from '../locales/zh'
import zhtw from '../locales/zhtw.ts'

const savedLang = (localStorage.getItem('language') || 'zh').toLowerCase()

const i18n = createI18n({
  legacy: false, // 使用 Composition API
  locale: savedLang,
  fallbackLocale: 'zh',
  globalInjection: true,
  messages: {
    en,
    zh,
    zhtw
  }
})

export default i18n