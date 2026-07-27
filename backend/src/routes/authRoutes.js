

// // backend/src/routes/authRoutes.js
// import express from "express"
// import {
//   sendEmailVerification,
//   verifyEmail,
//   login,
//   register,
//   forgotPassword,
//   resetPassword,
//   checkEmailVerification
// } from "../controllers/authController.js"

// const router = express.Router()

// // ✅ Email Verification (Existing)
// router.post("/send-email-verification", sendEmailVerification)
// router.get("/verify-email", verifyEmail)
// router.get("/check-email-verification", checkEmailVerification)

// // ✅ Login/Register (New)
// router.post("/login", login)
// router.post("/register", register)

// // ✅ Password Reset (New)
// router.post("/forgot-password", forgotPassword)
// router.post("/reset-password", resetPassword)

// export default router




// backend/src/routes/authRoutes.js (or wherever your routes are)
import express from 'express'
import {
  sendEmailVerification,
  verifyEmailCode,  // ✅ New function
  login,
  register,
  forgotPassword,
  resetPassword,
  checkEmailVerification
} from '../controllers/authController.js'

const router = express.Router()

// ✅ Email verification routes
router.post('/auth/send-verification', sendEmailVerification)
router.post('/auth/verify-email-code', verifyEmailCode)  // ✅ New route
router.get('/auth/check-verification', checkEmailVerification)

// ✅ Auth routes
router.post('/auth/login', login)
router.post('/auth/register', register)
router.post('/auth/forgot-password', forgotPassword)
router.post('/auth/reset-password', resetPassword)

export default router