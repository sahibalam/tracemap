

// // backend/src/routes/authRoutes.js
// import express from 'express'
// import {
//   sendEmailVerification,
//   verifyEmailCode,
//   login,
//   register,
//   forgotPassword,
//   resetPassword,
//   checkEmailVerification
// } from '../controllers/authController.js'

// const router = express.Router()

// // ✅ Email verification routes (no /auth prefix - mounted at /api)
// router.post('/auth/send-verification', sendEmailVerification)
// router.post('/auth/verify-email-code', verifyEmailCode)
// router.get('/auth/check-verification', checkEmailVerification)

// // ✅ Auth routes (no /auth prefix - mounted at /api)
// router.post('/auth/register', register)
// router.post('/auth/login', login)
// router.post('/auth/forgot-password', forgotPassword)
// router.post('/auth/reset-password', resetPassword)

// // ✅ Test route
// router.get('/auth/test', (req, res) => {
//   res.json({ success: true, message: 'Auth API is working!' })
// })

// export default router





// backend/src/routes/authRoutes.js
import express from 'express'
import {
  sendEmailVerification,
  verifyEmailCode,
  login,
  register,
  forgotPassword,
  resetPassword,
  checkEmailVerification,
  requestEmailUpdate,
  verifyEmailUpdate,
  checkEmailAvailability
} from '../controllers/authController.js'

const router = express.Router()

// ============================================================
// 📧 EMAIL VERIFICATION ROUTES
// ============================================================

/**
 * POST /api/auth/send-verification
 * Send verification code to email
 * Body: { email }
 */
router.post('/auth/send-verification', sendEmailVerification)

/**
 * POST /api/auth/verify-email-code
 * Verify email with code
 * Body: { email, code }
 */
router.post('/auth/verify-email-code', verifyEmailCode)

/**
 * GET /api/auth/check-verification
 * Check email verification status
 * Query: ?email=user@example.com
 */
router.get('/auth/check-verification', checkEmailVerification)

// ============================================================
// 📧 EMAIL UPDATE ROUTES (NEW)
// ============================================================

/**
 * POST /api/auth/request-email-update
 * Request email update - sends verification code to new email
 * Body: { userId, newEmail, currentPassword }
 */
router.post('/auth/request-email-update', requestEmailUpdate)

/**
 * POST /api/auth/verify-email-update
 * Verify email update code and complete the update
 * Body: { newEmail, code }
 */
router.post('/auth/verify-email-update', verifyEmailUpdate)

/**
 * GET /api/auth/check-email-availability
 * Check if email is available (not already registered)
 * Query: ?email=user@example.com
 */
router.get('/auth/check-email-availability', checkEmailAvailability)

// ============================================================
// 🔐 AUTH ROUTES
// ============================================================

/**
 * POST /api/auth/register
 * Register new user
 * Body: { email, password, firstName, lastName, phoneNumber, dob }
 */
router.post('/auth/register', register)

/**
 * POST /api/auth/login
 * Login user
 * Body: { email, password }
 */
router.post('/auth/login', login)

/**
 * POST /api/auth/forgot-password
 * Request password reset
 * Body: { email }
 */
router.post('/auth/forgot-password', forgotPassword)

/**
 * POST /api/auth/reset-password
 * Reset password with token
 * Body: { token, newPassword }
 */
router.post('/auth/reset-password', resetPassword)

// ============================================================
// 🔧 TEST ROUTE
// ============================================================

/**
 * GET /api/auth/test
 * Test auth routes
 */
router.get('/auth/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth API is working!',
    endpoints: {
      emailVerification: {
        send: 'POST /api/auth/send-verification',
        verify: 'POST /api/auth/verify-email-code',
        check: 'GET /api/auth/check-verification'
      },
      emailUpdate: {
        request: 'POST /api/auth/request-email-update',
        verify: 'POST /api/auth/verify-email-update',
        checkAvailability: 'GET /api/auth/check-email-availability'
      },
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        forgotPassword: 'POST /api/auth/forgot-password',
        resetPassword: 'POST /api/auth/reset-password'
      }
    }
  })
})

// ============================================================
// 📋 EXPORT ROUTER
// ============================================================

export default router