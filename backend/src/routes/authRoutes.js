// // backend/src/routes/authRoutes.js
// import express from "express";

// import {
//   sendEmailVerification,
//   verifyEmail
// }
// from "../controllers/authController.js";

// const router = express.Router();

// router.post(
//   "/send-email-verification",
//   sendEmailVerification
// );

// router.get(
//   "/verify-email",
//   verifyEmail
// );

// export default router;



// backend/src/routes/authRoutes.js
import express from "express"
import {
  sendEmailVerification,
  verifyEmail,
  login,
  register,
  forgotPassword,
  resetPassword,
  checkEmailVerification
} from "../controllers/authController.js"

const router = express.Router()

// ✅ Email Verification (Existing)
router.post("/send-email-verification", sendEmailVerification)
router.get("/verify-email", verifyEmail)
router.get("/check-email-verification", checkEmailVerification)

// ✅ Login/Register (New)
router.post("/login", login)
router.post("/register", register)

// ✅ Password Reset (New)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)

export default router