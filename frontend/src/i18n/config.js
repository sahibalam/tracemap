// // src/i18n/config.js
// import i18n from 'i18next'
// import { initReactI18next } from 'react-i18next'
// import LanguageDetector from 'i18next-browser-languagedetector'

// // Import translations
// import enTranslation from '../locales/en/translation.json'
// import esTranslation from '../locales/es/translation.json'

// // Define available languages
// export const LANGUAGES = {
//   en: {
//     code: 'en',
//     name: 'English',
//     flag: '🇺🇸',
//     dir: 'ltr',
//   },
//   es: {
//     code: 'es',
//     name: 'Español',
//     flag: '🇪🇸',
//     dir: 'ltr',
//   },
// }

// // Language resources
// const resources = {
//   en: {
//     translation: enTranslation,
//   },
//   es: {
//     translation: esTranslation,
//   },
// }

// // Language detection options
// const detectionOptions = {
//   order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
//   caches: ['localStorage', 'cookie'],
//   lookupLocalStorage: 'i18nextLng',
//   lookupCookie: 'i18next',
//   cookieMinutes: 10080, // 7 days
//   htmlTag: document.documentElement,
// }

// // Initialize i18n
// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: 'en',
//     debug: process.env.NODE_ENV === 'development',
    
//     // Interpolation
//     interpolation: {
//       escapeValue: false, // React already safes from XSS
//     },
    
//     // Detection
//     detection: detectionOptions,
    
//     // React options
//     react: {
//       useSuspense: true,
//       transSupportBasicHtmlNodes: true,
//       transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'em'],
//     },
    
//     // Key separators
//     keySeparator: '.',
//     nsSeparator: ':',
    
//     // Formatting
//     pluralSeparator: '_',
//     contextSeparator: '_',
    
//     // Save missing keys
//     saveMissing: false,
//     saveMissingTo: 'all',
    
//     // Load
//     load: 'all',
//     preload: ['en', 'es'],
//   })

// // Helper function to change language
// export const changeLanguage = (langCode) => {
//   if (LANGUAGES[langCode]) {
//     i18n.changeLanguage(langCode)
//     // Update HTML lang attribute for accessibility
//     document.documentElement.lang = langCode
//     // Update dir for RTL languages
//     document.documentElement.dir = LANGUAGES[langCode].dir || 'ltr'
//     // Save to localStorage
//     localStorage.setItem('i18nextLng', langCode)
//     return true
//   }
//   return false
// }

// // Helper function to get current language
// export const getCurrentLanguage = () => {
//   const lang = i18n.language || 'en'
//   return LANGUAGES[lang] || LANGUAGES.en
// }

// // Helper function to check if a translation key exists
// export const hasTranslation = (key) => {
//   return i18n.exists(key)
// }

// // Helper function to get translation with fallback
// export const getTranslation = (key, options = {}) => {
//   return i18n.t(key, options)
// }

// // Helper function to get all available languages
// export const getAvailableLanguages = () => {
//   return Object.values(LANGUAGES)
// }

// // Helper function to format date based on language
// export const formatDate = (date, options = {}) => {
//   const lang = i18n.language || 'en'
//   return new Intl.DateTimeFormat(lang, options).format(date)
// }

// // Helper function to format number based on language
// export const formatNumber = (number, options = {}) => {
//   const lang = i18n.language || 'en'
//   return new Intl.NumberFormat(lang, options).format(number)
// }

// // Helper function to format currency based on language
// export const formatCurrency = (amount, currency = 'USD') => {
//   const lang = i18n.language || 'en'
//   return new Intl.NumberFormat(lang, {
//     style: 'currency',
//     currency: currency,
//   }).format(amount)
// }

// // Export the i18n instance
// export default i18n















// src/i18n/config.js
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translations
import enTranslation from '../locales/en/translation.json'
import esTranslation from '../locales/es/translation.json'

// Define available languages
export const LANGUAGES = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    dir: 'ltr',
  },
  es: {
    code: 'es',
    name: 'Español',
    flag: '🇪🇸',
    dir: 'ltr',
  },
}

// Language resources
const resources = {
  en: {
    translation: enTranslation,
  },
  es: {
    translation: esTranslation,
  },
}

// ✅ Log the resources to verify they are loaded
console.log('🔍 i18n resources loaded:');
console.log('  English keys:', Object.keys(enTranslation).length);
console.log('  Spanish keys:', Object.keys(esTranslation).length);
console.log('  Sample English key (auth.login):', enTranslation.auth?.login);
console.log('  Sample Spanish key (auth.login):', esTranslation.auth?.login);

// Language detection options
const detectionOptions = {
  order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
  caches: ['localStorage', 'cookie'],
  lookupLocalStorage: 'i18nextLng',
  lookupCookie: 'i18next',
  cookieMinutes: 10080, // 7 days
  htmlTag: document.documentElement,
}

// ✅ Make i18n available globally for debugging
window.i18n = i18n

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true, // ✅ Enable debug mode
    interpolation: {
      escapeValue: false,
    },
    detection: detectionOptions,
    react: {
      useSuspense: false, // ✅ Change to false for debugging
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'em'],
    },
    keySeparator: '.',
    nsSeparator: ':',
    pluralSeparator: '_',
    contextSeparator: '_',
    saveMissing: false,
    saveMissingTo: 'all',
    load: 'all',
    preload: ['en', 'es'],
  })

// ✅ Log when initialized
console.log('✅ i18n initialized. Current language:', i18n.language);
console.log('✅ Available languages:', Object.keys(i18n.store.data || {}));

// Helper function to change language
export const changeLanguage = (langCode) => {
  if (LANGUAGES[langCode]) {
    console.log('🔄 Changing language to:', langCode);
    i18n.changeLanguage(langCode)
    document.documentElement.lang = langCode
    document.documentElement.dir = LANGUAGES[langCode].dir || 'ltr'
    localStorage.setItem('i18nextLng', langCode)
    console.log('✅ Language changed to:', i18n.language);
    return true
  }
  return false
}

// Helper function to get current language
export const getCurrentLanguage = () => {
  const lang = i18n.language || 'en'
  return LANGUAGES[lang] || LANGUAGES.en
}

// Helper function to check if a translation key exists
export const hasTranslation = (key) => {
  return i18n.exists(key)
}

// Helper function to get translation with fallback
export const getTranslation = (key, options = {}) => {
  return i18n.t(key, options)
}

// Helper function to get all available languages
export const getAvailableLanguages = () => {
  return Object.values(LANGUAGES)
}

// Helper function to format date based on language
export const formatDate = (date, options = {}) => {
  const lang = i18n.language || 'en'
  return new Intl.DateTimeFormat(lang, options).format(date)
}

// Helper function to format number based on language
export const formatNumber = (number, options = {}) => {
  const lang = i18n.language || 'en'
  return new Intl.NumberFormat(lang, options).format(number)
}

// Helper function to format currency based on language
export const formatCurrency = (amount, currency = 'USD') => {
  const lang = i18n.language || 'en'
  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// Export the i18n instance
export default i18n