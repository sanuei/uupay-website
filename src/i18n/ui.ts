import en from './en.json';
import zhCN from './zh-CN.json';
import zhTW from './zh-TW.json';
import ja from './ja.json';
import ko from './ko.json';
import vi from './vi.json';
import th from './th.json';
import ms from './ms.json';
import id from './id.json';
import es from './es.json';
import ar from './ar.json';

export const languages = {
  en: 'English',
  'zh-CN': '简体中文',
  'zh-TW': '繁體中文',
  ja: '日本語',
  ko: '한국어',
  vi: 'Tiếng Việt',
  th: 'ไทย',
  ms: 'Bahasa Melayu',
  id: 'Bahasa Indonesia',
  es: 'Español',
  ar: 'العربية'
} as const;

export const defaultLang = 'en';

export const ui = {
  en,
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  ja,
  ko,
  vi,
  th,
  ms,
  id,
  es,
  ar
} as const;

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string): string {
    const keys = key.split('.');
    let translation: any = ui[lang] || ui[defaultLang];
    for (const k of keys) {
      if (translation && translation[k] !== undefined) {
        translation = translation[k];
      } else {
        let fallback: any = ui[defaultLang];
        for (const fk of keys) {
          fallback = fallback ? fallback[fk] : undefined;
        }
        return fallback || key;
      }
    }
    return typeof translation === 'string' ? translation : key;
  }
}
