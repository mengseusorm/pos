import { createI18n } from 'vue-i18n'
import en from '../languages/en.json'
import kh from '../languages/kh.json'

const savedLocale = localStorage.getItem('userLocale') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: 'en',
  messages: {
    en,
    kh,
  },
})

export default function (app) {
  app.use(i18n)
}
