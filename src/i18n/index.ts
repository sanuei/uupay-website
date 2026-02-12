import { createI18n } from 'vue-i18n'
import en from './locales/en.ts'
import zh from './locales/zh.ts'
import zhtw from './locales/zhtw.ts'
import th from './locales/th.ts'
import pt from './locales/pt.ts'
import es from './locales/es.ts'
import tr from './locales/tr.ts'
import fr from './locales/fr.ts'
import ja from './locales/ja.ts'
import ko from './locales/ko.ts'
import de from './locales/de.ts'
import ar from './locales/ar.ts'

const savedLang = (localStorage.getItem('language') || 'zh').toLowerCase()

const messages = {
  'en': en,
  'zh-cn': zh,
  'zh-tw': zhtw,
  'th': th,
  'pt': pt,
  'es': es,
  'tr': tr,
  'fr': fr,
  'ja': ja,
  'ko': ko,
  'de': de,
  'ar': ar,
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
