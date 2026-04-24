import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import ur from './locales/ur.json'
import pa from './locales/pa.json'
import sd from './locales/sd.json'

const RTL_LANGS = ['ur', 'pa', 'sd']

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: { en: { translation: en }, ur: { translation: ur }, pa: { translation: pa }, sd: { translation: sd } },
    fallbackLng: 'en',
    supportedLngs: ['en', 'ur', 'pa', 'sd'],
    // Strip region codes so 'en-US' → 'en', 'ur-PK' → 'ur'
    // Without this, i18n.language returns 'en-US' and === 'en' comparisons fail
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'fasaldoc_lang',
    },
  })

export function applyDir(lang: string) {
  document.documentElement.dir = RTL_LANGS.includes(lang) ? 'rtl' : 'ltr'
  document.documentElement.lang = lang
}

applyDir(i18n.language)
i18n.on('languageChanged', applyDir)

export default i18n
