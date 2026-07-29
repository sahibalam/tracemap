
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

// // ✅ Log the resources to verify they are loaded
// console.log('🔍 i18n resources loaded:');
// console.log('  English keys:', Object.keys(enTranslation).length);
// console.log('  Spanish keys:', Object.keys(esTranslation).length);
// console.log('  Sample English key (auth.login):', enTranslation.auth?.login);
// console.log('  Sample Spanish key (auth.login):', esTranslation.auth?.login);

// // Language detection options
// const detectionOptions = {
//   order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
//   caches: ['localStorage', 'cookie'],
//   lookupLocalStorage: 'i18nextLng',
//   lookupCookie: 'i18next',
//   cookieMinutes: 10080, // 7 days
//   htmlTag: document.documentElement,
// }

// // ✅ Make i18n available globally for debugging
// window.i18n = i18n

// // Initialize i18n
// i18n
//   .use(LanguageDetector)
//   .use(initReactI18next)
//   .init({
//     resources,
//     fallbackLng: 'en',
//     debug: true, // ✅ Enable debug mode
//     interpolation: {
//       escapeValue: false,
//     },
//     detection: detectionOptions,
//     react: {
//       useSuspense: false, // ✅ Change to false for debugging
//       transSupportBasicHtmlNodes: true,
//       transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b', 'em'],
//     },
//     keySeparator: '.',
//     nsSeparator: ':',
//     pluralSeparator: '_',
//     contextSeparator: '_',
//     saveMissing: false,
//     saveMissingTo: 'all',
//     load: 'all',
//     preload: ['en', 'es'],
//   })

// // ✅ Log when initialized
// console.log('✅ i18n initialized. Current language:', i18n.language);
// console.log('✅ Available languages:', Object.keys(i18n.store.data || {}));

// // Helper function to change language
// export const changeLanguage = (langCode) => {
//   if (LANGUAGES[langCode]) {
//     console.log('🔄 Changing language to:', langCode);
//     i18n.changeLanguage(langCode)
//     document.documentElement.lang = langCode
//     document.documentElement.dir = LANGUAGES[langCode].dir || 'ltr'
//     localStorage.setItem('i18nextLng', langCode)
//     console.log('✅ Language changed to:', i18n.language);
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
console.log('🔍 i18n resources loaded:')
console.log('  English keys:', Object.keys(enTranslation).length)
console.log('  Spanish keys:', Object.keys(esTranslation).length)
console.log('  Sample English key (auth.login):', enTranslation.auth?.login)
console.log('  Sample Spanish key (auth.login):', esTranslation.auth?.login)

// ✅ Language priority chain - Get stored language from multiple sources
export const getStoredLanguage = () => {
  // 1. Check if userLanguage is set (from login or registration)
  const userLang = localStorage.getItem('userLanguage')
  if (userLang && LANGUAGES[userLang]) {
    console.log('✅ Found userLanguage in localStorage:', userLang)
    return userLang
  }
  
  // 2. Check pending language (during registration)
  const pendingLang = localStorage.getItem('pendingLanguage')
  if (pendingLang && LANGUAGES[pendingLang]) {
    console.log('✅ Found pendingLanguage in localStorage:', pendingLang)
    return pendingLang
  }
  
  // 3. Check for language in user profile from localStorage
  const profileLang = localStorage.getItem('profileLanguage')
  if (profileLang && LANGUAGES[profileLang]) {
    console.log('✅ Found profileLanguage in localStorage:', profileLang)
    return profileLang
  }
  
  // 4. Check i18next stored language
  const i18nextLang = localStorage.getItem('i18nextLng')
  if (i18nextLang && LANGUAGES[i18nextLang]) {
    console.log('✅ Found i18nextLng in localStorage:', i18nextLang)
    return i18nextLang
  }
  
  // 5. Fallback to browser language or English
  const browserLang = navigator.language?.split('-')[0]
  if (browserLang && LANGUAGES[browserLang]) {
    console.log('✅ Using browser language:', browserLang)
    return browserLang
  }
  
  console.log('✅ Using fallback language: en')
  return 'en'
}

// ✅ Language detection options - Priority: localStorage > cookie > navigator
const detectionOptions = {
  order: ['localStorage', 'cookie', 'navigator', 'htmlTag'],
  caches: ['localStorage', 'cookie'],
  lookupLocalStorage: 'i18nextLng',
  lookupCookie: 'i18next',
  cookieMinutes: 10080, // 7 days
  htmlTag: document.documentElement,
}

// ✅ Initialize with stored language
const initialLanguage = getStoredLanguage()

// ✅ Make i18n available globally for debugging
window.i18n = i18n

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: initialLanguage, // ✅ Set initial language
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development', // ✅ Only debug in development
    interpolation: {
      escapeValue: false,
    },
    detection: detectionOptions,
    react: {
      useSuspense: false,
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
console.log('✅ i18n initialized. Current language:', i18n.language)
console.log('✅ Available languages:', Object.keys(i18n.store.data || {}))

// ✅ Helper function to change language
export const changeLanguage = (langCode) => {
  if (LANGUAGES[langCode]) {
    console.log('🔄 Changing language to:', langCode)
    i18n.changeLanguage(langCode)
    document.documentElement.lang = langCode
    document.documentElement.dir = LANGUAGES[langCode].dir || 'ltr'
    
    // ✅ Save to multiple localStorage keys for redundancy
    localStorage.setItem('i18nextLng', langCode)
    localStorage.setItem('userLanguage', langCode)
    localStorage.setItem('profileLanguage', langCode)
    
    // ✅ Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: langCode } 
    }))
    
    console.log('✅ Language changed to:', i18n.language)
    return true
  }
  return false
}

// ✅ Helper function to get current language
export const getCurrentLanguage = () => {
  const lang = i18n.language || getStoredLanguage() || 'en'
  return LANGUAGES[lang] || LANGUAGES.en
}

// ✅ Helper function to set user language (from registration or login)
export const setUserLanguage = (langCode) => {
  if (LANGUAGES[langCode]) {
    console.log('🔧 Setting user language to:', langCode)
    localStorage.setItem('userLanguage', langCode)
    localStorage.setItem('profileLanguage', langCode)
    localStorage.setItem('pendingLanguage', langCode)
    
    // Change the language if it's different
    if (i18n.language !== langCode) {
      changeLanguage(langCode)
    }
    
    return true
  }
  return false
}

// ✅ Helper function to check if a translation key exists
export const hasTranslation = (key) => {
  return i18n.exists(key)
}

// ✅ Helper function to get translation with fallback
export const getTranslation = (key, options = {}) => {
  return i18n.t(key, options)
}

// ✅ Helper function to get all available languages
export const getAvailableLanguages = () => {
  return Object.values(LANGUAGES)
}

// ✅ Helper function to format date based on language
export const formatDate = (date, options = {}) => {
  const lang = i18n.language || 'en'
  return new Intl.DateTimeFormat(lang, options).format(date)
}

// ✅ Helper function to format number based on language
export const formatNumber = (number, options = {}) => {
  const lang = i18n.language || 'en'
  return new Intl.NumberFormat(lang, options).format(number)
}

// ✅ Helper function to format currency based on language
export const formatCurrency = (amount, currency = 'USD') => {
  const lang = i18n.language || 'en'
  return new Intl.NumberFormat(lang, {
    style: 'currency',
    currency: currency,
  }).format(amount)
}

// ✅ Function to sync language from database (called after login)
export const syncLanguageFromDatabase = async (userId) => {
  try {
    const response = await fetch(`/api/worker/profile/${userId}`)
    const result = await response.json()
    
    if (result.success && result.data?.basics?.language) {
      const dbLanguage = result.data.basics.language
      console.log('🔄 Syncing language from database:', dbLanguage)
      
      // Update localStorage
      localStorage.setItem('userLanguage', dbLanguage)
      localStorage.setItem('profileLanguage', dbLanguage)
      
      // Change language if different
      if (i18n.language !== dbLanguage) {
        changeLanguage(dbLanguage)
      }
      
      return true
    }
    return false
  } catch (error) {
    console.error('❌ Error syncing language from database:', error)
    return false
  }
}

// ✅ Listen for language change events from other components
window.addEventListener('languageChanged', (event) => {
  const newLang = event.detail?.language
  if (newLang && LANGUAGES[newLang]) {
    console.log('📢 Language change event received:', newLang)
    if (i18n.language !== newLang) {
      i18n.changeLanguage(newLang)
      localStorage.setItem('userLanguage', newLang)
      localStorage.setItem('profileLanguage', newLang)
    }
  }
})

// ✅ Export the i18n instance
export default i18n