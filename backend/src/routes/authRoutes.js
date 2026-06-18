import express from "express";

import {
  sendEmailVerification,
  verifyEmail
}
from "../controllers/authController.js";

const router = express.Router();

router.post(
  "/send-email-verification",
  sendEmailVerification
);

router.get(
  "/verify-email",
  verifyEmail
);

export default router;