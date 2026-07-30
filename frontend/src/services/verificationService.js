

// // frontend/src/services/verificationService.js
// import { 
//   auth, 
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
// } from '../firebase/config'
// import api from './api'

// // ============================================================
// // 📧 EMAIL VERIFICATION - Using Backend API (Code-based)
// // ============================================================

// /**
//  * Send email verification code via backend API
//  */
// export const sendEmailVerificationCode = async (email) => {
//   try {
//     const response = await api.post('/auth/send-verification', { email })
//     return response.data
//   } catch (error) {
//     console.error('Error sending verification code:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to send verification code'
//     }
//   }
// }

// /**
//  * Verify email with code via backend API
//  */
// export const verifyEmailWithCode = async (email, code) => {
//   try {
//     const response = await api.post('/auth/verify-email-code', { email, code })
//     return response.data
//   } catch (error) {
//     console.error('Error verifying email code:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to verify email'
//     }
//   }
// }

// /**
//  * Check email verification status
//  */
// export const checkEmailVerification = async (email) => {
//   try {
//     const response = await api.get(`/auth/check-verification?email=${encodeURIComponent(email)}`)
//     return response.data
//   } catch (error) {
//     console.error('Error checking verification:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to check verification'
//     }
//   }
// }

// // ============================================================
// // 📧 EMAIL UPDATE - New Functions
// // ============================================================

// /**
//  * Request email update - sends verification code to new email
//  * Requires current password for security
//  */
// export const requestEmailUpdate = async (userId, newEmail, currentPassword) => {
//   try {
//     const response = await api.post('/auth/request-email-update', {
//       userId,
//       newEmail,
//       currentPassword
//     })
//     return response.data
//   } catch (error) {
//     console.error('Error requesting email update:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to request email update'
//     }
//   }
// }

// /**
//  * Verify email update code and complete the update
//  */
// export const verifyEmailUpdate = async (newEmail, code) => {
//   try {
//     const response = await api.post('/auth/verify-email-update', {
//       newEmail,
//       code
//     })
//     return response.data
//   } catch (error) {
//     console.error('Error verifying email update:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to verify email update'
//     }
//   }
// }

// /**
//  * Check if email is available (not already registered)
//  * Real-time email availability check
//  */
// export const checkEmailAvailability = async (email) => {
//   try {
//     const response = await api.get(`/auth/check-email-availability?email=${encodeURIComponent(email)}`)
//     return response.data
//   } catch (error) {
//     console.error('Error checking email availability:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to check email availability'
//     }
//   }
// }

// // ============================================================
// // 📱 PHONE VERIFICATION - Using Firebase
// // ============================================================

// /**
//  * Setup reCAPTCHA for phone verification
//  */
// export const setupRecaptcha = (containerId) => {
//   if (window.recaptchaVerifier) {
//     window.recaptchaVerifier.clear()
//   }
  
//   window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
//     size: 'invisible',
//     callback: (response) => {
//       console.log('reCAPTCHA verified')
//     }
//   })
  
//   return window.recaptchaVerifier
// }

// /**
//  * Send phone OTP via Firebase
//  */
// export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
//   try {
//     // Remove all non-digit characters
//     const digitsOnly = phoneNumber.replace(/\D/g, '')
    
//     // Format for India: +91 + 10 digits
//     let formattedPhone = phoneNumber.startsWith('+') 
//       ? phoneNumber 
//       : `+91${digitsOnly}`
    
//     console.log('Original Phone:', phoneNumber)
//     console.log('Formatted Phone:', formattedPhone)
    
//     const confirmationResult = await signInWithPhoneNumber(
//       auth, 
//       formattedPhone, 
//       recaptchaVerifier
//     )
//     window.confirmationResult = confirmationResult
//     return { success: true, message: 'OTP sent successfully!' }
//   } catch (error) {
//     console.error('Phone OTP error:', error)
//     return { success: false, message: error.message }
//   }
// }

// /**
//  * Verify phone OTP via Firebase
//  */
// export const verifyPhoneOTP = async (otpCode) => {
//   try {
//     const result = await window.confirmationResult.confirm(otpCode)
//     return { success: true, user: result.user, message: 'Phone verified successfully!' }
//   } catch (error) {
//     console.error('OTP verification error:', error)
//     return { success: false, message: 'Invalid OTP code. Please try again.' }
//   }
// }

// // ============================================================
// // 🔄 COMPATIBILITY - Keep old functions for backward compatibility
// // ============================================================

// /**
//  * @deprecated - Use sendEmailVerificationCode instead
//  */
// export const registerAndSendEmailVerification = async (email) => {
//   return sendEmailVerificationCode(email)
// }

// /**
//  * @deprecated - Use verifyEmailWithCode instead
//  */
// export const verifyEmailWithActionCode = async (oobCode) => {
//   try {
//     // This was for Firebase link-based verification
//     // Now we use code-based verification
//     return { 
//       success: false, 
//       message: 'This method is deprecated. Please use verifyEmailWithCode(email, code) instead.' 
//     }
//   } catch (error) {
//     console.error('Email verification error:', error)
//     return { success: false, message: error.message }
//   }
// }

// /**
//  * @deprecated - Use checkEmailVerification instead
//  */
// export const checkEmailVerified = async (user) => {
//   // This was for Firebase email verification
//   // Now we use backend-based verification
//   if (user?.email) {
//     const result = await checkEmailVerification(user.email)
//     return result.success && result.data?.verified
//   }
//   return false
// }

// // ============================================================
// // 📋 EXPORT ALL
// // ============================================================

// export default {
//   // Email verification
//   sendEmailVerificationCode,
//   verifyEmailWithCode,
//   checkEmailVerification,
  
//   // Email update
//   requestEmailUpdate,
//   verifyEmailUpdate,
//   checkEmailAvailability,
  
//   // Phone verification
//   setupRecaptcha,
//   sendPhoneOTP,
//   verifyPhoneOTP,
  
//   // Deprecated (for backward compatibility)
//   registerAndSendEmailVerification,
//   verifyEmailWithActionCode,
//   checkEmailVerified
// }




// // frontend/src/services/verificationService.js
// import { 
//   auth, 
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
// } from '../firebase/config'
// import api from './api'

// // ============================================================
// // 📧 EMAIL VERIFICATION - Using Backend API (Code-based)
// // ============================================================

// /**
//  * Send email verification code via backend API
//  */
// export const sendEmailVerificationCode = async (email) => {
//   try {
//     const response = await api.post('/auth/send-verification', { email })
//     return response.data
//   } catch (error) {
//     console.error('Error sending verification code:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to send verification code'
//     }
//   }
// }

// /**
//  * Verify email with code via backend API
//  */
// export const verifyEmailWithCode = async (email, code) => {
//   try {
//     const response = await api.post('/auth/verify-email-code', { email, code })
//     return response.data
//   } catch (error) {
//     console.error('Error verifying email code:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to verify email'
//     }
//   }
// }

// /**
//  * Check email verification status
//  */
// export const checkEmailVerification = async (email) => {
//   try {
//     const response = await api.get(`/auth/check-verification?email=${encodeURIComponent(email)}`)
//     return response.data
//   } catch (error) {
//     console.error('Error checking verification:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to check verification'
//     }
//   }
// }

// // ============================================================
// // 📧 EMAIL UPDATE - Functions
// // ============================================================

// /**
//  * Request email update - sends verification code to new email
//  * @param {string} userId - User ID
//  * @param {string} newEmail - New email address
//  * @param {string} currentPassword - Current password (optional)
//  */
// export const requestEmailUpdate = async (userId, newEmail, currentPassword = '') => {
//   try {
//     const response = await api.post('/auth/request-email-update', {
//       userId,
//       newEmail,
//       currentPassword
//     })
//     return response.data
//   } catch (error) {
//     console.error('Error requesting email update:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to request email update'
//     }
//   }
// }

// /**
//  * Verify email update code and complete the update
//  * @param {string} newEmail - New email address
//  * @param {string} code - Verification code
//  */
// export const verifyEmailUpdate = async (newEmail, code) => {
//   try {
//     const response = await api.post('/auth/verify-email-update', {
//       newEmail,
//       code
//     })
//     return response.data
//   } catch (error) {
//     console.error('Error verifying email update:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to verify email update'
//     }
//   }
// }

// /**
//  * Check if email is available (not already registered)
//  * Real-time email availability check
//  */
// export const checkEmailAvailability = async (email) => {
//   try {
//     const response = await api.get(`/auth/check-email-availability?email=${encodeURIComponent(email)}`)
//     return response.data
//   } catch (error) {
//     console.error('Error checking email availability:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to check email availability'
//     }
//   }
// }

// // ============================================================
// // 📱 PHONE UPDATE - Functions
// // ============================================================

// /**
//  * Request phone update - generates OTP for new phone
//  * @param {string} userId - User ID
//  * @param {string} newPhone - New phone number
//  */
// export const requestPhoneUpdate = async (userId, newPhone) => {
//   try {
//     const response = await api.post('/auth/request-phone-update', {
//       userId,
//       newPhone
//     })
//     return response.data
//   } catch (error) {
//     console.error('Error requesting phone update:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to request phone update'
//     }
//   }
// }

// /**
//  * Verify phone OTP and complete the update
//  * @param {string} newPhone - New phone number
//  * @param {string} code - OTP code
//  */
// export const verifyPhoneUpdate = async (newPhone, code) => {
//   try {
//     const response = await api.post('/auth/verify-phone-update', {
//       newPhone,
//       code
//     })
//     return response.data
//   } catch (error) {
//     console.error('Error verifying phone update:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to verify phone update'
//     }
//   }
// }

// /**
//  * Check if phone is available (not already registered)
//  * Real-time phone availability check
//  */
// export const checkPhoneAvailability = async (phone) => {
//   try {
//     const response = await api.get(`/auth/check-phone-availability?phone=${encodeURIComponent(phone)}`)
//     return response.data
//   } catch (error) {
//     console.error('Error checking phone availability:', error)
//     return {
//       success: false,
//       message: error.response?.data?.message || error.message || 'Failed to check phone availability'
//     }
//   }
// }

// // ============================================================
// // 📱 PHONE VERIFICATION - Using Firebase
// // ============================================================

// /**
//  * Setup reCAPTCHA for phone verification
//  * @param {string} containerId - DOM element ID for reCAPTCHA
//  */
// export const setupRecaptcha = (containerId) => {
//   if (window.recaptchaVerifier) {
//     window.recaptchaVerifier.clear()
//   }
  
//   window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
//     size: 'invisible',
//     callback: (response) => {
//       console.log('reCAPTCHA verified')
//     }
//   })
  
//   return window.recaptchaVerifier
// }

// /**
//  * Send phone OTP via Firebase
//  * @param {string} phoneNumber - Phone number
//  * @param {object} recaptchaVerifier - reCAPTCHA verifier instance
//  */
// export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
//   try {
//     // Remove all non-digit characters
//     const digitsOnly = phoneNumber.replace(/\D/g, '')
    
//     // Format for India: +91 + 10 digits
//     let formattedPhone = phoneNumber.startsWith('+') 
//       ? phoneNumber 
//       : `+91${digitsOnly}`
    
//     console.log('Original Phone:', phoneNumber)
//     console.log('Formatted Phone:', formattedPhone)
    
//     const confirmationResult = await signInWithPhoneNumber(
//       auth, 
//       formattedPhone, 
//       recaptchaVerifier
//     )
//     window.confirmationResult = confirmationResult
//     return { success: true, message: 'OTP sent successfully!' }
//   } catch (error) {
//     console.error('Phone OTP error:', error)
//     return { success: false, message: error.message }
//   }
// }

// /**
//  * Verify phone OTP via Firebase
//  * @param {string} otpCode - 6-digit OTP code
//  */
// export const verifyPhoneOTP = async (otpCode) => {
//   try {
//     const result = await window.confirmationResult.confirm(otpCode)
//     return { success: true, user: result.user, message: 'Phone verified successfully!' }
//   } catch (error) {
//     console.error('OTP verification error:', error)
//     return { success: false, message: 'Invalid OTP code. Please try again.' }
//   }
// }

// // ============================================================
// // 🔄 COMPATIBILITY - Keep old functions for backward compatibility
// // ============================================================

// /**
//  * @deprecated - Use sendEmailVerificationCode instead
//  */
// export const registerAndSendEmailVerification = async (email) => {
//   return sendEmailVerificationCode(email)
// }

// /**
//  * @deprecated - Use verifyEmailWithCode instead
//  */
// export const verifyEmailWithActionCode = async (oobCode) => {
//   try {
//     // This was for Firebase link-based verification
//     // Now we use code-based verification
//     return { 
//       success: false, 
//       message: 'This method is deprecated. Please use verifyEmailWithCode(email, code) instead.' 
//     }
//   } catch (error) {
//     console.error('Email verification error:', error)
//     return { success: false, message: error.message }
//   }
// }

// /**
//  * @deprecated - Use checkEmailVerification instead
//  */
// export const checkEmailVerified = async (user) => {
//   // This was for Firebase email verification
//   // Now we use backend-based verification
//   if (user?.email) {
//     const result = await checkEmailVerification(user.email)
//     return result.success && result.data?.verified
//   }
//   return false
// }

// // ============================================================
// // 📋 EXPORT ALL
// // ============================================================

// export default {
//   // Email verification
//   sendEmailVerificationCode,
//   verifyEmailWithCode,
//   checkEmailVerification,
  
//   // Email update
//   requestEmailUpdate,
//   verifyEmailUpdate,
//   checkEmailAvailability,
  
//   // Phone verification (Firebase)
//   setupRecaptcha,
//   sendPhoneOTP,
//   verifyPhoneOTP,
  
//   // Phone update (Backend)
//   requestPhoneUpdate,
//   verifyPhoneUpdate,
//   checkPhoneAvailability,
  
//   // Deprecated (for backward compatibility)
//   registerAndSendEmailVerification,
//   verifyEmailWithActionCode,
//   checkEmailVerified
// }




// frontend/src/services/verificationService.js
import { 
  auth, 
  signInWithPhoneNumber,
  RecaptchaVerifier,
} from '../firebase/config'
import api from './api'

// ============================================================
// 📧 EMAIL VERIFICATION - Using Backend API (Code-based)
// ============================================================

export const sendEmailVerificationCode = async (email) => {
  try {
    const response = await api.post('/auth/send-verification', { email })
    return response.data
  } catch (error) {
    console.error('Error sending verification code:', error)
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to send verification code'
    }
  }
}

export const verifyEmailWithCode = async (email, code) => {
  try {
    const response = await api.post('/auth/verify-email-code', { email, code })
    return response.data
  } catch (error) {
    console.error('Error verifying email code:', error)
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to verify email'
    }
  }
}

export const checkEmailVerification = async (email) => {
  try {
    const response = await api.get(`/auth/check-verification?email=${encodeURIComponent(email)}`)
    return response.data
  } catch (error) {
    console.error('Error checking verification:', error)
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to check verification'
    }
  }
}

// ============================================================
// 📧 EMAIL UPDATE - Functions
// ============================================================

export const requestEmailUpdate = async (userId, newEmail, currentPassword = '') => {
  try {
    const response = await api.post('/auth/request-email-update', {
      userId,
      newEmail,
      currentPassword
    })
    return response.data
  } catch (error) {
    console.error('Error requesting email update:', error)
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to request email update'
    }
  }
}

export const verifyEmailUpdate = async (newEmail, code) => {
  try {
    const response = await api.post('/auth/verify-email-update', {
      newEmail,
      code
    })
    return response.data
  } catch (error) {
    console.error('Error verifying email update:', error)
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to verify email update'
    }
  }
}

export const checkEmailAvailability = async (email) => {
  try {
    const response = await api.get(`/auth/check-email-availability?email=${encodeURIComponent(email)}`)
    return response.data
  } catch (error) {
    console.error('Error checking email availability:', error)
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Failed to check email availability'
    }
  }
}

// ============================================================
// 📱 PHONE VERIFICATION - Using Firebase (SIMPLE VERSION)
// ============================================================

/**
 * Setup reCAPTCHA for phone verification
 * @param {string} containerId - DOM element ID for reCAPTCHA
 * @returns {RecaptchaVerifier} The reCAPTCHA verifier instance
 */
export const setupRecaptcha = (containerId) => {
  try {
    // Clear existing verifier
    if (window.recaptchaVerifier) {
      try {
        window.recaptchaVerifier.clear()
      } catch (e) {
        console.log('Clearing existing verifier:', e)
      }
      window.recaptchaVerifier = null
    }
    
    console.log('🔐 Setting up reCAPTCHA with container:', containerId)
    
    // Check if container exists
    const container = document.getElementById(containerId)
    if (!container) {
      console.error('❌ reCAPTCHA container not found:', containerId)
      return null
    }
    
    // Clear container
    container.innerHTML = ''
    
    // Create new verifier with invisible size
    const verifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
      callback: (response) => {
        console.log('✅ reCAPTCHA verified with response:', response)
      },
      'expired-callback': () => {
        console.log('⏳ reCAPTCHA expired')
        window.recaptchaVerifier = null
      },
      'error-callback': (error) => {
        console.error('❌ reCAPTCHA error:', error)
      }
    })
    
    // Store in window for access
    window.recaptchaVerifier = verifier
    console.log('✅ reCAPTCHA verifier created')
    
    return verifier
  } catch (error) {
    console.error('❌ setupRecaptcha error:', error)
    return null
  }
}

/**
 * Send phone OTP via Firebase
 * @param {string} phoneNumber - Phone number
 * @param {object} recaptchaVerifier - reCAPTCHA verifier instance
 */
export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '')
    
    // Format for India: +91 + 10 digits
    let formattedPhone = phoneNumber.startsWith('+') 
      ? phoneNumber 
      : `+91${digitsOnly}`
    
    console.log('📱 Original Phone:', phoneNumber)
    console.log('📱 Formatted Phone:', formattedPhone)
    
    // If no recaptchaVerifier provided, try to get from window
    if (!recaptchaVerifier) {
      recaptchaVerifier = window.recaptchaVerifier
      if (!recaptchaVerifier) {
        throw new Error('reCAPTCHA not initialized. Please try again.')
      }
    }
    
    const confirmationResult = await signInWithPhoneNumber(
      auth, 
      formattedPhone, 
      recaptchaVerifier
    )
    window.confirmationResult = confirmationResult
    return { success: true, message: 'OTP sent successfully!' }
  } catch (error) {
    console.error('❌ Phone OTP error:', error)
    return { success: false, message: error.message }
  }
}

/**
 * Verify phone OTP via Firebase
 * @param {string} otpCode - 6-digit OTP code
 */
export const verifyPhoneOTP = async (otpCode) => {
  try {
    if (!window.confirmationResult) {
      throw new Error('No OTP request found. Please request a new OTP.')
    }
    const result = await window.confirmationResult.confirm(otpCode)
    return { success: true, user: result.user, message: 'Phone verified successfully!' }
  } catch (error) {
    console.error('❌ OTP verification error:', error)
    return { success: false, message: 'Invalid OTP code. Please try again.' }
  }
}

// ============================================================
// 📋 EXPORT ALL
// ============================================================

export default {
  sendEmailVerificationCode,
  verifyEmailWithCode,
  checkEmailVerification,
  requestEmailUpdate,
  verifyEmailUpdate,
  checkEmailAvailability,
  setupRecaptcha,
  sendPhoneOTP,
  verifyPhoneOTP
}