import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const locales = {
  en: 'English',
  vi: 'Tiếng việt'
}
const resources = {
  en: {
    translation: {
      Science: 'Science',
      Science2: 'And Technology',
      Science3: 'Scientist Data',
      Database: 'Database'
    }
  },
  vi: {
    translation: {
      Science: 'Khoa học',
      Science2: 'và Công nghệ',
      Science3: 'Dữ liệu Nhà khoa học',
      Database: 'Cơ sở dữ liệu'
    }
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'vi',
  fallbackLng: 'vi',
  interpolation: {
    escapeValue: false
  }
})
export default i18n
