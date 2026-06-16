// // frontend/src/services/verificationService.js
// import { 
//   auth, 
//   sendEmailVerification, 
//   signInWithPhoneNumber,
//   RecaptchaVerifier,
//   createUserWithEmailAndPassword
// } from '../firebase/config'

// // Create Firebase user and send email verification
// export const registerAndSendEmailVerification = async (email, password) => {
//   try {
//     // Create user with email and password
//     const userCredential = await createUserWithEmailAndPassword(auth, email, password)
//     const user = userCredential.user
    
//     // Send email verification
//     await sendEmailVerification(user)
    
//     return { 
//       success: true, 
//       message: 'Verification email sent! Please check your inbox.',
//       user: user
//     }
//   } catch (error) {
//     console.error('Email verification error:', error)
    
//     if (error.code === 'auth/email-already-in-use') {
//       return { success: false, message: 'Email already in use. Please login or use different email.' }
//     }
//     return { success: false, message: error.message }
//   }
// }

// // Check if email is verified
// export const checkEmailVerified = async (user) => {
//   await user.reload()
//   return user.emailVerified
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

// // Send phone OTP
// export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
//   try {
//     // Format phone number (US number)
//     const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber.replace(/\D/g, '')}`
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
  sendEmailVerification, 
  signInWithPhoneNumber,
  RecaptchaVerifier,
  createUserWithEmailAndPassword,
  applyActionCode,  // Add this
  signInWithEmailAndPassword  // Add this
} from '../firebase/config'

// Create Firebase user and send email verification
// Create Firebase user and send email verification
export const registerAndSendEmailVerification = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )

    const user = userCredential.user

    // Send verification email with custom redirect URL
    await sendEmailVerification(user, {
      url: 'https://tradesmap.com/verify-email',
      handleCodeInApp: true
    })

    return {
      success: true,
      message: 'Verification email sent! Please check your inbox.',
      user
    }

  } catch (error) {
    console.error('Email verification error:', error)

    if (error.code === 'auth/email-already-in-use') {
      return {
        success: false,
        message:
          'Email already in use. Please login or use different email.'
      }
    }

    return {
      success: false,
      message: error.message
    }
  }
}

// Check if email is verified
export const checkEmailVerified = async (user) => {
  await user.reload()
  return user.emailVerified
}

// Verify email with action code (when user clicks email link)
export const verifyEmailWithCode = async (oobCode) => {
  try {
    await applyActionCode(auth, oobCode)
    return { success: true, message: 'Email verified successfully!' }
  } catch (error) {
    console.error('Email verification code error:', error)
    return { success: false, message: error.message }
  }
}

// Sign in user and check email verification
export const signInAndCheckEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user
    await user.reload()
    return { 
      success: true, 
      user: user,
      isEmailVerified: user.emailVerified
    }
  } catch (error) {
    return { success: false, message: error.message }
  }
}

// Setup reCAPTCHA for phone verification
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

// Send phone OTP
export const sendPhoneOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    const formattedPhone = phoneNumber.startsWith('+') ? phoneNumber : `+1${phoneNumber.replace(/\D/g, '')}`
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

// Verify phone OTP
export const verifyPhoneOTP = async (otpCode) => {
  try {
    const result = await window.confirmationResult.confirm(otpCode)
    return { success: true, user: result.user, message: 'Phone verified successfully!' }
  } catch (error) {
    console.error('OTP verification error:', error)
    return { success: false, message: 'Invalid OTP code. Please try again.' }
  }
}