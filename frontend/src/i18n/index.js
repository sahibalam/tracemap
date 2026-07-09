// // src/i18n/index.js
// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'

// // Import translations
// import enTranslation from '../locales/en/translation.json'
// import esTranslation from '../locales/es/translation.json'

// const resources = {
//   en: {
//     translation: enTranslation,
//   },
//   es: {
//     translation: esTranslation,
//   },
// }

// i18n
//   .use(LanguageDetector) // Detect user language
//   .use(initReactI18next) // Pass i18n instance to react-i18next
//   .init({
//     resources,
//     fallbackLng: 'en', // Fallback language
//     debug: process.env.NODE_ENV === 'development',
    
//     interpolation: {
//       escapeValue: false, // React already safes from XSS
//     },
    
//     detection: {
//       order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
//       caches: ['localStorage', 'cookie'],
//     },
    
//     react: {
//       useSuspense: true,
//     },
//   })

// export default i18n




// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'
// import enTranslation from '../locales/en/translation.json'
// import esTranslation from '../locales/es/translation.json'

// const resources = {
//   en: { translation: enTranslation },
//   es: { translation: esTranslation },
// }

// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: 'en',
//     debug: process.env.NODE_ENV === 'development',
//     interpolation: { escapeValue: false },
//     detection: {
//       order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
//       caches: ['localStorage', 'cookie'],
//     },
//     react: { useSuspense: true },
//   })

// export default i18n




// src/i18n/index.js
import i18n from './config'

// Export everything from config
export * from './config'

// Re-export i18n as default
export default i18n