// src/components/LanguageSync.jsx

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { getStoredLanguage, changeLanguage, setUserLanguage } from '../i18n/config'
import api from '../services/api'

export function LanguageSync({ children }) {
  const { i18n } = useTranslation()
  const [isSyncing, setIsSyncing] = useState(true)
  const [isInitialSync, setIsInitialSync] = useState(true)

  useEffect(() => {
    const syncLanguage = async () => {
      try {
        console.log('🔄 LanguageSync: Starting language sync...')
        
        // Check if user is logged in
        const userId = localStorage.getItem('userId')
        const authToken = localStorage.getItem('authToken')
        const isAuthenticated = !!(userId && authToken)
        
        // Get stored language from localStorage
        const storedLang = getStoredLanguage()
        console.log(`📌 LanguageSync: Stored language: ${storedLang}`)
        
        if (isAuthenticated && isInitialSync) {
          console.log(`👤 LanguageSync: User is authenticated (${userId})`)
          
          try {
            // Fetch user profile from API to get latest language
            const response = await api.get(`/worker/profile/${userId}`)
            const result = response.data
            
            if (result.success && result.data?.basics?.language) {
              const profileLanguage = result.data.basics.language
              console.log(`📥 LanguageSync: Language from database: ${profileLanguage}`)
              
              // Only update if the database language is different from current
              // AND the user hasn't manually changed it recently
              const userManuallyChanged = localStorage.getItem('userManuallyChangedLanguage') === 'true'
              
              if (!userManuallyChanged && profileLanguage !== i18n.language) {
                console.log(`🔄 LanguageSync: Changing language to ${profileLanguage}`)
                localStorage.setItem('userLanguage', profileLanguage)
                localStorage.setItem('profileLanguage', profileLanguage)
                changeLanguage(profileLanguage)
              } else if (userManuallyChanged) {
                console.log(`📌 LanguageSync: User manually changed language, ignoring database value`)
                // Clear the flag after using it
                localStorage.removeItem('userManuallyChangedLanguage')
              }
              
              setIsInitialSync(false)
              setIsSyncing(false)
              return
            }
          } catch (apiError) {
            console.error('❌ LanguageSync: Error fetching user profile:', apiError)
          }
        }
        
        // If no userId or API failed, use stored language
        if (storedLang && storedLang !== i18n.language) {
          console.log(`🔄 LanguageSync: Using stored language: ${storedLang}`)
          changeLanguage(storedLang)
          setUserLanguage(storedLang)
        } else if (!storedLang) {
          // If no stored language, try browser language or default to English
          const browserLang = navigator.language?.split('-')[0] || 'en'
          console.log(`🌐 LanguageSync: Using browser language: ${browserLang}`)
          if (browserLang !== i18n.language) {
            changeLanguage(browserLang)
            setUserLanguage(browserLang)
          }
        }
        
        setIsInitialSync(false)
        setIsSyncing(false)
        
      } catch (error) {
        console.error('❌ LanguageSync: Error during sync:', error)
        setIsSyncing(false)
        setIsInitialSync(false)
      }
    }

    syncLanguage()
  }, [i18n, isInitialSync])

  // ✅ Listen for language change events from other components
  useEffect(() => {
    const handleLanguageChange = (event) => {
      const newLang = event.detail?.language
      if (newLang) {
        console.log(`📢 LanguageSync: Language change event received: ${newLang}`)
        
        // ✅ Set flag that user manually changed language
        localStorage.setItem('userManuallyChangedLanguage', 'true')
        
        if (newLang !== i18n.language) {
          changeLanguage(newLang)
        }
        localStorage.setItem('userLanguage', newLang)
        localStorage.setItem('profileLanguage', newLang)
        localStorage.setItem('pendingLanguage', newLang)
        localStorage.setItem('i18nextLng', newLang)
      }
    }
    
    window.addEventListener('languageChanged', handleLanguageChange)
    
    return () => {
      window.removeEventListener('languageChanged', handleLanguageChange)
    }
  }, [i18n])

  // Listen for localStorage changes (from other tabs)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'userLanguage' || e.key === 'profileLanguage' || e.key === 'i18nextLng') {
        const newLang = localStorage.getItem('userLanguage') || 
                       localStorage.getItem('profileLanguage') || 
                       localStorage.getItem('i18nextLng')
        
        if (newLang && newLang !== i18n.language) {
          console.log(`🔄 LanguageSync: Language changed in another tab: ${newLang}`)
          changeLanguage(newLang)
        }
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [i18n])

  // Listen for online/offline events to resync language
  useEffect(() => {
    const handleOnline = () => {
      console.log('📡 LanguageSync: Online - resyncing language...')
      // Only resync if user hasn't manually changed language
      const userManuallyChanged = localStorage.getItem('userManuallyChangedLanguage') === 'true'
      if (!userManuallyChanged) {
        const userId = localStorage.getItem('userId')
        if (userId && isInitialSync) {
          const syncFromDatabase = async () => {
            try {
              const response = await api.get(`/worker/profile/${userId}`)
              const result = response.data
              
              if (result.success && result.data?.basics?.language) {
                const profileLanguage = result.data.basics.language
                if (profileLanguage !== i18n.language) {
                  console.log(`🔄 LanguageSync: Online sync to ${profileLanguage}`)
                  changeLanguage(profileLanguage)
                  setUserLanguage(profileLanguage)
                }
              }
            } catch (error) {
              console.error('❌ LanguageSync: Online sync failed:', error)
            }
          }
          syncFromDatabase()
        }
      } else {
        console.log('📌 LanguageSync: User manually changed language, skipping online sync')
        localStorage.removeItem('userManuallyChangedLanguage')
      }
    }
    
    window.addEventListener('online', handleOnline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
    }
  }, [i18n, isInitialSync])

  // Show nothing while syncing to avoid flash of wrong language
  if (isSyncing) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          border: '3px solid rgba(15, 78, 169, 0.1)',
          borderTop: '3px solid #0f4ea9',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#17263a', fontSize: '14px' }}>Loading language...</p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  return children
}

export default LanguageSync