// // src/common/components/LanguageSwitcher.jsx
// import { useTranslation } from 'react-i18next'
// import { useState, useRef, useEffect } from 'react'

// export function LanguageSwitcher({ variant = 'dropdown' }) {
//   const { i18n } = useTranslation()
//   const [isOpen, setIsOpen] = useState(false)
//   const dropdownRef = useRef(null)

//   const languages = [
//     { code: 'en', label: 'English', flag: '🇺🇸' },
//     { code: 'es', label: 'Español', flag: '🇪🇸' },
//   ]

//   const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0]

//   const changeLanguage = (langCode) => {
//     i18n.changeLanguage(langCode)
//     setIsOpen(false)
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   if (variant === 'inline') {
//     return (
//       <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
//         {languages.map((lang) => (
//           <button
//             key={lang.code}
//             onClick={() => changeLanguage(lang.code)}
//             style={{
//               padding: '4px 12px',
//               border: '1px solid rgba(18, 38, 63, 0.12)',
//               borderRadius: '6px',
//               background: i18n.language === lang.code ? '#0f4ea9' : 'transparent',
//               color: i18n.language === lang.code ? 'white' : '#17263a',
//               cursor: 'pointer',
//               fontSize: '13px',
//               fontWeight: i18n.language === lang.code ? '600' : '400',
//               transition: 'all 0.2s ease',
//             }}
//             onMouseEnter={(e) => {
//               if (i18n.language !== lang.code) {
//                 e.target.style.background = 'rgba(15, 78, 169, 0.05)'
//               }
//             }}
//             onMouseLeave={(e) => {
//               if (i18n.language !== lang.code) {
//                 e.target.style.background = 'transparent'
//               }
//             }}
//           >
//             {lang.flag} {lang.label}
//           </button>
//         ))}
//       </div>
//     )
//   }

//   return (
//     <div ref={dropdownRef} style={{ position: 'relative' }}>
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           padding: '6px 14px',
//           border: '1px solid rgba(18, 38, 63, 0.12)',
//           borderRadius: '8px',
//           background: 'white',
//           cursor: 'pointer',
//           fontSize: '14px',
//           transition: 'all 0.2s ease',
//           color: '#17263a',
//         }}
//         onMouseEnter={(e) => {
//           e.target.style.borderColor = 'rgba(15, 78, 169, 0.4)'
//         }}
//         onMouseLeave={(e) => {
//           e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//         }}
//       >
//         <span>{currentLanguage.flag}</span>
//         <span>{currentLanguage.label}</span>
//         <svg 
//           width="10" 
//           height="10" 
//           viewBox="0 0 12 12"
//           style={{
//             transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//             transition: 'transform 0.2s ease',
//           }}
//         >
//           <path fill="#17263a" d="M6 8L1 3h10z" />
//         </svg>
//       </button>

//       {isOpen && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 'calc(100% + 4px)',
//             right: 0,
//             background: 'white',
//             border: '1px solid rgba(18, 38, 63, 0.12)',
//             borderRadius: '8px',
//             boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
//             minWidth: '150px',
//             padding: '4px 0',
//             zIndex: 9999,
//           }}
//         >
//           {languages.map((lang) => (
//             <button
//               key={lang.code}
//               onClick={() => changeLanguage(lang.code)}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '10px',
//                 padding: '8px 16px',
//                 width: '100%',
//                 border: 'none',
//                 background: i18n.language === lang.code ? 'rgba(15, 78, 169, 0.08)' : 'transparent',
//                 color: i18n.language === lang.code ? '#0f4ea9' : '#17263a',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 fontWeight: i18n.language === lang.code ? '600' : '400',
//                 transition: 'all 0.15s ease',
//                 textAlign: 'left',
//               }}
//               onMouseEnter={(e) => {
//                 if (i18n.language !== lang.code) {
//                   e.target.style.background = 'rgba(15, 78, 169, 0.05)'
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (i18n.language !== lang.code) {
//                   e.target.style.background = 'transparent'
//                 }
//               }}
//             >
//               <span>{lang.flag}</span>
//               <span>{lang.label}</span>
//               {i18n.language === lang.code && (
//                 <span style={{ marginLeft: 'auto', color: '#0f4ea9' }}>✓</span>
//               )}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }





// src/common/components/LanguageSwitcher.jsx
import { useTranslation } from 'react-i18next'
import { useState, useRef, useEffect } from 'react'
import { changeLanguage, getCurrentLanguage, getAvailableLanguages } from '../../i18n/config'

export function LanguageSwitcher({ variant = 'dropdown' }) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const currentLang = getCurrentLanguage()
  const languages = getAvailableLanguages()

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (variant === 'inline') {
    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            style={{
              padding: '4px 12px',
              border: '1px solid rgba(18, 38, 63, 0.12)',
              borderRadius: '6px',
              background: currentLang.code === lang.code ? '#0f4ea9' : 'transparent',
              color: currentLang.code === lang.code ? 'white' : '#17263a',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: currentLang.code === lang.code ? '600' : '400',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (currentLang.code !== lang.code) {
                e.target.style.background = 'rgba(15, 78, 169, 0.05)'
              }
            }}
            onMouseLeave={(e) => {
              if (currentLang.code !== lang.code) {
                e.target.style.background = 'transparent'
              }
            }}
          >
            {lang.flag} {lang.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          border: '1px solid rgba(18, 38, 63, 0.12)',
          borderRadius: '8px',
          background: 'white',
          cursor: 'pointer',
          fontSize: '14px',
          transition: 'all 0.2s ease',
          color: '#17263a',
        }}
        onMouseEnter={(e) => {
          e.target.style.borderColor = 'rgba(15, 78, 169, 0.4)'
        }}
        onMouseLeave={(e) => {
          e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
        }}
      >
        <span>{currentLang.flag}</span>
        <span>{currentLang.name}</span>
        <svg 
          width="10" 
          height="10" 
          viewBox="0 0 12 12"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
          }}
        >
          <path fill="#17263a" d="M6 8L1 3h10z" />
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            right: 0,
            background: 'white',
            border: '1px solid rgba(18, 38, 63, 0.12)',
            borderRadius: '8px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            minWidth: '150px',
            padding: '4px 0',
            zIndex: 9999,
          }}
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                width: '100%',
                border: 'none',
                background: currentLang.code === lang.code ? 'rgba(15, 78, 169, 0.08)' : 'transparent',
                color: currentLang.code === lang.code ? '#0f4ea9' : '#17263a',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: currentLang.code === lang.code ? '600' : '400',
                transition: 'all 0.15s ease',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                if (currentLang.code !== lang.code) {
                  e.target.style.background = 'rgba(15, 78, 169, 0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (currentLang.code !== lang.code) {
                  e.target.style.background = 'transparent'
                }
              }}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
              {currentLang.code === lang.code && (
                <span style={{ marginLeft: 'auto', color: '#0f4ea9' }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}