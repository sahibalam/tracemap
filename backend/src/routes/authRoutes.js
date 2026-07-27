

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



// backend/src/routes/authRoutes.js
const router = express.Router()

// ✅ Remove /auth prefix since it's already mounted at /api/auth
router.post('/register', register)           // Now: /api/auth/register
router.post('/login', login)                 // Now: /api/auth/login
router.post('/send-verification', sendEmailVerification)
router.post('/verify-email-code', verifyEmailCode)
router.get('/check-verification', checkEmailVerification)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.get('/test', (req, res) => {
  res.json({ success: true, message: 'Auth API is working!' })
})

export default router