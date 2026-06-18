import { generateVerificationToken }
from "../utils/tokenGenerator.js";

import { sendVerificationEmail }
from "../services/emailService.js";

const verificationStore = {};

export const sendEmailVerification = async (
  req,
  res
) => {

  try {

    const { email } = req.body;

    const token =
      generateVerificationToken();

    verificationStore[token] = {
      email,
      verified: false
    };

    const verificationLink =
      `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    await sendVerificationEmail(
      email,
      verificationLink
    );

    res.json({
      success: true,
      message: "Verification email sent"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

export const verifyEmail = async (
  req,
  res
) => {

  const { token } = req.query;

  if (!verificationStore[token]) {

    return res.status(400).json({
      success: false,
      message: "Invalid token"
    });

  }

  verificationStore[token].verified = true;

  res.json({
    success: true,
    email:
      verificationStore[token].email,
    message:
      "Email verified successfully"
  });
};