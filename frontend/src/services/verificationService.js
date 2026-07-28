

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
// 📧 EMAIL UPDATE - New Functions
// ============================================================

/**
 * Request email update - sends verification code to new email
 * Requires current password for security
 */
export const requestEmailUpdate = async (userId, newEmail, currentPassword) => {
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

/**
 * Verify email update code and complete the update
 */
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

/**
 * Check if email is available (not already registered)
 * Real-time email availability check
 */
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

// ============================================================
// 📋 EXPORT ALL
// ============================================================

export default {
  // Email verification
  sendEmailVerificationCode,
  verifyEmailWithCode,
  checkEmailVerification,
  
  // Email update
  requestEmailUpdate,
  verifyEmailUpdate,
  checkEmailAvailability,
  
  // Phone verification
  setupRecaptcha,
  sendPhoneOTP,
  verifyPhoneOTP,
  
  // Deprecated (for backward compatibility)
  registerAndSendEmailVerification,
  verifyEmailWithActionCode,
  checkEmailVerified
}