// backend/src/services/resendEmailService.js
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

// SMTP Configuration for Resend
const transporter = nodemailer.createTransport({
  host: process.env.RESEND_SMTP_HOST || 'smtp.resend.com',
  port: parseInt(process.env.RESEND_SMTP_PORT) || 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.RESEND_SMTP_USER || 'resend',
    pass: process.env.RESEND_SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
})

/**
 * Send password reset email using Resend SMTP
 */
export const sendPasswordResetEmail = async (email, resetLink) => {
  try {
    console.log(`📧 Sending password reset email to: ${email}`)
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Password Reset</title>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #0f4ea9; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #0f4ea9; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .button:hover { background: #0b3f90; }
            .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>TradesMap Password Reset</h2>
          </div>
          <div class="content">
            <p>Hello,</p>
            <p>We received a request to reset your password for your TradesMap account.</p>
            <p>Click the button below to set a new password:</p>
            <p style="text-align: center;">
              <a href="${resetLink}" class="button">Reset Password</a>
            </p>
            <p>If you didn't request this, you can safely ignore this email.</p>
            <p>This link will expire in 1 hour.</p>
            <p>Best regards,<br>TradesMap Team</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} TradesMap. All rights reserved.</p>
          </div>
        </body>
      </html>
    `

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@tradesmap.com',
      to: email,
      subject: 'Password Reset - TradesMap',
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ Password reset email sent successfully to ${email}`)
    return info

  } catch (error) {
    console.error('❌ Error sending password reset email:', error)
    throw new Error(`Failed to send password reset email: ${error.message}`)
  }
}

export default { sendPasswordResetEmail }