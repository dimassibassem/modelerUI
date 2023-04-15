import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from '@/translation/en'
import fr from '@/translation/fr'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en
    },
    fr: {
      translation: fr
    }
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
})
