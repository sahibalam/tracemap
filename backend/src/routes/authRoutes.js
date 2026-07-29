
// // backend/src/routes/authRoutes.js
// import express from 'express'
// import {
//   sendEmailVerification,
//   verifyEmailCode,
//   login,
//   register,
//   forgotPassword,
//   resetPassword,
//   checkEmailVerification,
//   requestEmailUpdate,
//   verifyEmailUpdate,
//   checkEmailAvailability,
//   requestPhoneUpdate,
//   verifyPhoneUpdate,
//   checkPhoneAvailability,
//   changePassword,
//   reportIssue,      // ✅ ADD THIS
//   getIssues,        // ✅ ADD THIS
//   updateIssueStatus // ✅ ADD THIS
// } from '../controllers/authController.js'

// const router = express.Router()

// // ============================================================
// // 📧 EMAIL VERIFICATION ROUTES
// // ============================================================

// router.post('/auth/send-verification', sendEmailVerification)
// router.post('/auth/verify-email-code', verifyEmailCode)
// router.get('/auth/check-verification', checkEmailVerification)

// // ============================================================
// // 📧 EMAIL UPDATE ROUTES
// // ============================================================

// router.post('/auth/request-email-update', requestEmailUpdate)
// router.post('/auth/verify-email-update', verifyEmailUpdate)
// router.get('/auth/check-email-availability', checkEmailAvailability)

// // ============================================================
// // 📱 PHONE UPDATE ROUTES
// // ============================================================

// router.post('/auth/request-phone-update', requestPhoneUpdate)
// router.post('/auth/verify-phone-update', verifyPhoneUpdate)
// router.get('/auth/check-phone-availability', checkPhoneAvailability)

// // ============================================================
// // 🔐 AUTH ROUTES
// // ============================================================

// router.post('/auth/register', register)
// router.post('/auth/login', login)
// router.post('/auth/forgot-password', forgotPassword)
// router.post('/auth/reset-password', resetPassword)
// router.post('/auth/change-password', changePassword)

// // ============================================================
// // 📝 REPORT ISSUE ROUTES
// // ============================================================

// /**
//  * POST /api/auth/report-issue
//  * Submit an issue report
//  * Body: { userId, issue, email }
//  */
// router.post('/auth/report-issue', reportIssue)

// /**
//  * GET /api/auth/issues
//  * Get all issue reports (Admin only)
//  */
// router.get('/auth/issues', getIssues)

// /**
//  * PATCH /api/auth/issue/:issueId
//  * Update issue status (Admin only)
//  * Body: { status }
//  */
// router.patch('/auth/issue/:issueId', updateIssueStatus)

// // ============================================================
// // 🔧 TEST ROUTE
// // ============================================================

// router.get('/auth/test', (req, res) => {
//   res.json({ 
//     success: true, 
//     message: 'Auth API is working!',
//     endpoints: {
//       emailVerification: {
//         send: 'POST /api/auth/send-verification',
//         verify: 'POST /api/auth/verify-email-code',
//         check: 'GET /api/auth/check-verification'
//       },
//       emailUpdate: {
//         request: 'POST /api/auth/request-email-update',
//         verify: 'POST /api/auth/verify-email-update',
//         checkAvailability: 'GET /api/auth/check-email-availability'
//       },
//       phoneUpdate: {
//         request: 'POST /api/auth/request-phone-update',
//         verify: 'POST /api/auth/verify-phone-update',
//         checkAvailability: 'GET /api/auth/check-phone-availability'
//       },
//       auth: {
//         register: 'POST /api/auth/register',
//         login: 'POST /api/auth/login',
//         forgotPassword: 'POST /api/auth/forgot-password',
//         resetPassword: 'POST /api/auth/reset-password',
//         changePassword: 'POST /api/auth/change-password'
//       },
//       issues: {
//         report: 'POST /api/auth/report-issue',
//         getAll: 'GET /api/auth/issues',
//         update: 'PATCH /api/auth/issue/:issueId'
//       }
//     }
//   })
// })

// // ============================================================
// // 📋 EXPORT ROUTER
// // ============================================================

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
  checkEmailAvailability,
  requestPhoneUpdate,
  verifyPhoneUpdate,
  checkPhoneAvailability,
  changePassword,
  reportIssue,
  getIssues,
  updateIssueStatus
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
 * Verify email code
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
// 📧 EMAIL UPDATE ROUTES
// ============================================================

/**
 * POST /api/auth/request-email-update
 * Request email update with verification
 * Body: { userId, newEmail, currentPassword (optional) }
 */
router.post('/auth/request-email-update', requestEmailUpdate)

/**
 * POST /api/auth/verify-email-update
 * Verify email update code
 * Body: { newEmail, code }
 */
router.post('/auth/verify-email-update', verifyEmailUpdate)

/**
 * GET /api/auth/check-email-availability
 * Check if email is available (real-time)
 * Query: ?email=user@example.com
 */
router.get('/auth/check-email-availability', checkEmailAvailability)

// ============================================================
// 📱 PHONE UPDATE ROUTES
// ============================================================

/**
 * POST /api/auth/request-phone-update
 * Request phone update with OTP
 * Body: { userId, newPhone }
 */
router.post('/auth/request-phone-update', requestPhoneUpdate)

/**
 * POST /api/auth/verify-phone-update
 * Verify phone OTP
 * Body: { newPhone, code }
 */
router.post('/auth/verify-phone-update', verifyPhoneUpdate)

/**
 * GET /api/auth/check-phone-availability
 * Check if phone is available (real-time)
 * Query: ?phone=1234567890
 */
router.get('/auth/check-phone-availability', checkPhoneAvailability)

// ============================================================
// 🔐 AUTH ROUTES
// ============================================================

/**
 * POST /api/auth/register
 * Register new user
 * Body: { email, password, firstName, lastName, phoneNumber, dob, language }
 */
router.post('/auth/register', register)

/**
 * POST /api/auth/login
 * Login user
 * Body: { email, password }
 * Returns: { userId, email, token, language, profile }
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

/**
 * POST /api/auth/change-password
 * Change password (authenticated)
 * Body: { userId, currentPassword, newPassword }
 */
router.post('/auth/change-password', changePassword)

// ============================================================
// 📝 REPORT ISSUE ROUTES
// ============================================================

/**
 * POST /api/auth/report-issue
 * Submit an issue report
 * Body: { userId, issue, email }
 */
router.post('/auth/report-issue', reportIssue)

/**
 * GET /api/auth/issues
 * Get all issue reports (Admin only)
 * Returns: { success, data: [...issues], count }
 */
router.get('/auth/issues', getIssues)

/**
 * PATCH /api/auth/issue/:issueId
 * Update issue status (Admin only)
 * Body: { status }
 * Status options: pending, in-progress, resolved, closed
 */
router.patch('/auth/issue/:issueId', updateIssueStatus)

// ============================================================
// 🔧 TEST ROUTE
// ============================================================

/**
 * GET /api/auth/test
 * API documentation and test endpoint
 */
router.get('/auth/test', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Auth API is working!',
    version: '2.0.0',
    endpoints: {
      emailVerification: {
        send: {
          method: 'POST',
          url: '/api/auth/send-verification',
          body: { email: 'user@example.com' }
        },
        verify: {
          method: 'POST',
          url: '/api/auth/verify-email-code',
          body: { email: 'user@example.com', code: '123456' }
        },
        check: {
          method: 'GET',
          url: '/api/auth/check-verification?email=user@example.com'
        }
      },
      emailUpdate: {
        request: {
          method: 'POST',
          url: '/api/auth/request-email-update',
          body: { userId: 'USER_123', newEmail: 'new@example.com', currentPassword: 'optional' }
        },
        verify: {
          method: 'POST',
          url: '/api/auth/verify-email-update',
          body: { newEmail: 'new@example.com', code: '123456' }
        },
        checkAvailability: {
          method: 'GET',
          url: '/api/auth/check-email-availability?email=user@example.com'
        }
      },
      phoneUpdate: {
        request: {
          method: 'POST',
          url: '/api/auth/request-phone-update',
          body: { userId: 'USER_123', newPhone: '1234567890' }
        },
        verify: {
          method: 'POST',
          url: '/api/auth/verify-phone-update',
          body: { newPhone: '1234567890', code: '123456' }
        },
        checkAvailability: {
          method: 'GET',
          url: '/api/auth/check-phone-availability?phone=1234567890'
        }
      },
      auth: {
        register: {
          method: 'POST',
          url: '/api/auth/register',
          body: { 
            email: 'user@example.com', 
            password: 'password123', 
            firstName: 'John', 
            lastName: 'Doe',
            phoneNumber: '1234567890',
            dob: '01/01/1990',
            language: 'en' // ✅ SUPPORTS LANGUAGE
          }
        },
        login: {
          method: 'POST',
          url: '/api/auth/login',
          body: { email: 'user@example.com', password: 'password123' }
        },
        forgotPassword: {
          method: 'POST',
          url: '/api/auth/forgot-password',
          body: { email: 'user@example.com' }
        },
        resetPassword: {
          method: 'POST',
          url: '/api/auth/reset-password',
          body: { token: 'reset_token', newPassword: 'newPassword123' }
        },
        changePassword: {
          method: 'POST',
          url: '/api/auth/change-password',
          body: { userId: 'USER_123', currentPassword: 'oldPassword', newPassword: 'newPassword123' }
        }
      },
      issues: {
        report: {
          method: 'POST',
          url: '/api/auth/report-issue',
          body: { userId: 'USER_123', issue: 'Bug description', email: 'user@example.com' }
        },
        getAll: {
          method: 'GET',
          url: '/api/auth/issues'
        },
        update: {
          method: 'PATCH',
          url: '/api/auth/issue/:issueId',
          body: { status: 'in-progress' }
        }
      }
    }
  })
})

// ============================================================
// 📋 EXPORT ROUTER
// ============================================================

export default router