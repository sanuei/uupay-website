import { createI18n } from 'vue-i18n'
import en from './locales/en.ts'
import zh from './locales/zh.ts'
import zhtw from './locales/zhtw.ts'
import th from './locales/th.ts'

const savedLang = (localStorage.getItem('language') || 'zh').toLowerCase()

const messages: { [key: string]: any } = {
  en,
  zh,
  zhtw,
  th
}

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: savedLang,
  fallbackLocale: 'zh',
  messages,
  fullInstall: true,
})

export default i18n
