// // frontend/src/services/verificationService.js
// import { 
//   auth, 
//   sendEmailVerification, 
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
//   createUserWithEmailAndPassword,
//   applyActionCode,
//   signInWithEmailAndPassword
// } from '../firebase/config'

// export const registerAndSendEmailVerification = async (email) => {
//   try {
//     const response = await fetch(
//       'https://tradesmap.com/api/auth/send-email-verification',
//       //'http://localhost:5001/api/auth/send-email-verification',
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email })
//       }
//     )

//     const data = await response.json()
//     return data
//   } catch (error) {
//     return {
//       success: false,
//       message: error.message
//     }
//   }
// }

// // Check if email is verified
// export const checkEmailVerified = async (user) => {
//   await user.reload()
//   return user.emailVerified
// }

// // Verify email with action code (when user clicks email link)
// export const verifyEmailWithCode = async (oobCode) => {
//   try {
//     await applyActionCode(auth, oobCode)
//     return { success: true, message: 'Email verified successfully!' }
//   } catch (error) {
//     console.error('Email verification code error:', error)
//     return { success: false, message: error.message }
//   }
// }

// // Sign in user and check email verification
// export const signInAndCheckEmail = async (email, password) => {
//   try {
//     const userCredential = await signInWithEmailAndPassword(auth, email, password)
//     const user = userCredential.user
//     await user.reload()
//     return { 
//       success: true, 
//       user: user,
//       isEmailVerified: user.emailVerified
//     }
//   } catch (error) {
//     return { success: false, message: error.message }
//   }
// }

// // Setup reCAPTCHA for phone verification
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

// // Send phone OTP - FIXED for US numbers
// export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
//   try {
//     // Remove all non-digit characters
//     const digitsOnly = phoneNumber.replace(/\D/g, '')
    
//     // Format for US: +1 + 10 digits
//     // If number already has +, use as is, otherwise add +1 for US
//     let formattedPhone = phoneNumber.startsWith('+') 
//       ? phoneNumber 
//       : `+91${digitsOnly}`  // ✅ Changed from +91 for  to +1 for US
    
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

// // Verify phone OTP
// export const verifyPhoneOTP = async (otpCode) => {
//   try {
//     const result = await window.confirmationResult.confirm(otpCode)
//     return { success: true, user: result.user, message: 'Phone verified successfully!' }
//   } catch (error) {
//     console.error('OTP verification error:', error)
//     return { success: false, message: 'Invalid OTP code. Please try again.' }
//   }
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

/**
 * Send email verification code via backend API
 */
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

/**
 * Verify email with code via backend API
 */
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

/**
 * Check email verification status
 */
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
// 📱 PHONE VERIFICATION - Using Firebase
// ============================================================

/**
 * Setup reCAPTCHA for phone verification
 */
export const setupRecaptcha = (containerId) => {
  if (window.recaptchaVerifier) {
    window.recaptchaVerifier.clear()
  }
  
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: (response) => {
      console.log('reCAPTCHA verified')
    }
  })
  
  return window.recaptchaVerifier
}

/**
 * Send phone OTP via Firebase
 */
export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    // Remove all non-digit characters
    const digitsOnly = phoneNumber.replace(/\D/g, '')
    
    // Format for India: +91 + 10 digits
    let formattedPhone = phoneNumber.startsWith('+') 
      ? phoneNumber 
      : `+91${digitsOnly}`
    
    console.log('Original Phone:', phoneNumber)
    console.log('Formatted Phone:', formattedPhone)
    
    const confirmationResult = await signInWithPhoneNumber(
      auth, 
      formattedPhone, 
      recaptchaVerifier
    )
    window.confirmationResult = confirmationResult
    return { success: true, message: 'OTP sent successfully!' }
  } catch (error) {
    console.error('Phone OTP error:', error)
    return { success: false, message: error.message }
  }
}

/**
 * Verify phone OTP via Firebase
 */
export const verifyPhoneOTP = async (otpCode) => {
  try {
    const result = await window.confirmationResult.confirm(otpCode)
    return { success: true, user: result.user, message: 'Phone verified successfully!' }
  } catch (error) {
    console.error('OTP verification error:', error)
    return { success: false, message: 'Invalid OTP code. Please try again.' }
  }
}

// ============================================================
// 🔄 COMPATIBILITY - Keep old functions for backward compatibility
// ============================================================

/**
 * @deprecated - Use sendEmailVerificationCode instead
 */
export const registerAndSendEmailVerification = async (email) => {
  return sendEmailVerificationCode(email)
}

/**
 * @deprecated - Use verifyEmailWithCode instead
 */
export const verifyEmailWithActionCode = async (oobCode) => {
  try {
    // This was for Firebase link-based verification
    // Now we use code-based verification
    return { 
      success: false, 
      message: 'This method is deprecated. Please use verifyEmailWithCode(email, code) instead.' 
    }
  } catch (error) {
    console.error('Email verification error:', error)
    return { success: false, message: error.message }
  }
}

/**
 * @deprecated - Use checkEmailVerification instead
 */
export const checkEmailVerified = async (user) => {
  // This was for Firebase email verification
  // Now we use backend-based verification
  if (user?.email) {
    const result = await checkEmailVerification(user.email)
    return result.success && result.data?.verified
  }
  return false
}

export default {
  // Email verification (new)
  sendEmailVerificationCode,
  verifyEmailWithCode,
  checkEmailVerification,
  
  // Phone verification
  setupRecaptcha,
  sendPhoneOTP,
  verifyPhoneOTP,
  
  // Deprecated (for backward compatibility)
  registerAndSendEmailVerification,
  verifyEmailWithActionCode,
  checkEmailVerified
}