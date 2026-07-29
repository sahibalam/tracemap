// // src/services/authService.js
// import api from './api'

// class AuthService {
//   /**
//    * ✅ Login with email and password
//    */
//   async login(email, password) {
//     try {
//       const response = await api.post('/auth/login', { email, password })
      
//       if (response.data.success) {
//         // ✅ Store token and user data
//         localStorage.setItem('authToken', response.data.data.token)
//         localStorage.setItem('userId', response.data.data.userId)
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Login failed')
//       }
//     } catch (error) {
//       console.error('Login error:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Register new user
//    */
//   async register(data) {
//     try {
//       const response = await api.post('/auth/register', data)
//       return response.data
//     } catch (error) {
//       console.error('Registration error:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Logout
//    */
//   logout() {
//     localStorage.removeItem('authToken')
//     localStorage.removeItem('userId')
//     window.location.href = '/login'
//   }

//   /**
//    * ✅ Check if user is authenticated
//    */
//   isAuthenticated() {
//     const token = localStorage.getItem('authToken')
//     return !!token
//   }

//   /**
//    * ✅ Get auth token
//    */
//   getToken() {
//     return localStorage.getItem('authToken')
//   }

//   /**
//    * ✅ Get userId
//    */
//   getUserId() {
//     return localStorage.getItem('userId')
//   }

//   /**
//    * ✅ Forgot password
//    */
//   async forgotPassword(email) {
//     try {
//       const response = await api.post('/auth/forgot-password', { email })
//       return response.data
//     } catch (error) {
//       console.error('Forgot password error:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Reset password
//    */
//   async resetPassword(token, newPassword) {
//     try {
//       const response = await api.post('/auth/reset-password', { token, newPassword })
//       return response.data
//     } catch (error) {
//       console.error('Reset password error:', error)
//       throw error
//     }
//   }
// }

// export default new AuthService()



// src/services/authService.js
import api from './api'
import { setUserLanguage, changeLanguage, getStoredLanguage } from '../i18n/config'

class AuthService {
  /**
   * ✅ Login with email and password - Restores language from database
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password })
      
      if (response.data.success) {
        const { token, userId, language, profile } = response.data.data
        
        // ✅ Store token and user data
        localStorage.setItem('authToken', token)
        localStorage.setItem('userId', userId)
        
        // ✅ Save user profile data
        if (profile?.basics) {
          const basics = profile.basics
          localStorage.setItem('userFirstName', basics.legalFirstName || '')
          localStorage.setItem('userLastName', basics.legalLastName || '')
          localStorage.setItem('pendingFirstName', basics.legalFirstName || '')
          localStorage.setItem('pendingLastName', basics.legalLastName || '')
          localStorage.setItem('pendingEmail', basics.emailAddress || '')
        }
        
        // ✅ RESTORE LANGUAGE FROM DATABASE
        const userLanguage = language || 'en'
        setUserLanguage(userLanguage)
        changeLanguage(userLanguage)
        
        console.log(`✅ User logged in with language: ${userLanguage}`)
        
        return response.data
      } else {
        throw new Error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  /**
   * ✅ Register new user - Saves language to database
   */
  async register(data) {
    try {
      // ✅ Ensure language is included in registration data
      const registerData = {
        ...data,
        language: data.language || 'en'
      }
      
      const response = await api.post('/auth/register', registerData)
      
      if (response.data.success) {
        const { userId, language } = response.data.data
        
        // ✅ Save userId
        localStorage.setItem('userId', userId)
        
        // ✅ SAVE LANGUAGE FROM REGISTRATION
        const userLanguage = language || data.language || 'en'
        setUserLanguage(userLanguage)
        changeLanguage(userLanguage)
        
        // ✅ Save pending data for wizard
        localStorage.setItem('pendingFirstName', data.firstName || '')
        localStorage.setItem('pendingLastName', data.lastName || '')
        localStorage.setItem('pendingEmail', data.email || '')
        localStorage.setItem('pendingPhoneNumber', data.phoneNumber || '')
        localStorage.setItem('pendingDob', data.dob || '')
        localStorage.setItem('pendingLanguage', userLanguage)
        
        console.log(`✅ User registered with language: ${userLanguage}`)
        
        return response.data
      } else {
        throw new Error(response.data.message || 'Registration failed')
      }
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  /**
   * ✅ Logout - Clears all data including language
   */
  logout() {
    // Clear all auth-related data
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userFirstName')
    localStorage.removeItem('userLastName')
    localStorage.removeItem('pendingFirstName')
    localStorage.removeItem('pendingLastName')
    localStorage.removeItem('pendingEmail')
    localStorage.removeItem('pendingPhoneNumber')
    localStorage.removeItem('pendingDob')
    localStorage.removeItem('pendingLanguage')
    localStorage.removeItem('userLanguage')
    localStorage.removeItem('profileLanguage')
    localStorage.removeItem('userProfileImage')
    localStorage.removeItem('profileImageKey')
    
    sessionStorage.clear()
    
    // ✅ Reset language to browser default or English
    const browserLang = navigator.language?.split('-')[0] || 'en'
    changeLanguage(browserLang)
    
    console.log('✅ User logged out, language reset to:', browserLang)
    
    window.location.href = '/login'
  }

  /**
   * ✅ Check if user is authenticated
   */
  isAuthenticated() {
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    return !!(token && userId)
  }

  /**
   * ✅ Get auth token
   */
  getToken() {
    return localStorage.getItem('authToken')
  }

  /**
   * ✅ Get userId
   */
  getUserId() {
    return localStorage.getItem('userId')
  }

  /**
   * ✅ Get user language
   */
  getUserLanguage() {
    return getStoredLanguage() || 'en'
  }

  /**
   * ✅ Forgot password
   */
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      console.error('Forgot password error:', error)
      throw error
    }
  }

  /**
   * ✅ Reset password
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword })
      return response.data
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  }

  /**
   * ✅ Get current user profile
   */
  async getCurrentUser() {
    try {
      const userId = this.getUserId()
      if (!userId) return null
      
      const response = await api.get(`/worker/profile/${userId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching user profile:', error)
      return null
    }
  }

  /**
   * ✅ Sync language from database (called after login or app load)
   */
  async syncLanguageFromDatabase() {
    try {
      const userId = this.getUserId()
      if (!userId) return false
      
      const response = await api.get(`/worker/profile/${userId}`)
      
      if (response.data.success && response.data.data?.basics?.language) {
        const dbLanguage = response.data.data.basics.language
        const currentLang = getStoredLanguage()
        
        if (dbLanguage !== currentLang) {
          console.log(`🔄 Syncing language from database: ${dbLanguage}`)
          setUserLanguage(dbLanguage)
          changeLanguage(dbLanguage)
          return true
        }
      }
      return false
    } catch (error) {
      console.error('Error syncing language from database:', error)
      return false
    }
  }

  /**
   * ✅ Update user language preference
   */
  async updateLanguage(language) {
    try {
      const userId = this.getUserId()
      if (!userId) throw new Error('User not authenticated')
      
      // Update language in database
      const response = await api.patch(`/worker/profile/${userId}/section/basics`, {
        language: language
      })
      
      if (response.data.success) {
        // Update localStorage
        setUserLanguage(language)
        changeLanguage(language)
        console.log(`✅ Language updated to: ${language}`)
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to update language')
      }
    } catch (error) {
      console.error('Error updating language:', error)
      throw error
    }
  }
}

export default new AuthService()