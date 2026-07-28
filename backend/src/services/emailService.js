
// backend/src/services/emailService.js
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

// SMTP Configuration for Resend
const transporter = nodemailer.createTransport({
  host: process.env.RESEND_SMTP_HOST || 'smtp.resend.com',
  port: parseInt(process.env.RESEND_SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.RESEND_SMTP_USER || 'resend',
    pass: process.env.RESEND_SMTP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
})

transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP Transporter Error:', error)
  } else {
    console.log('✅ SMTP Transporter ready to send emails')
  }
})

/**
 * Send verification code via email using Resend SMTP
 */
export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const fromEmail = process.env.EMAIL_FROM || 'noreply@tradesmap.com'
    
    console.log(`📧 Sending verification code to: ${email}`)

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6;
            color: #17263a;
            margin: 0;
            padding: 0;
            background-color: #f5f7fa;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 0;
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          }
          .header {
            background: linear-gradient(135deg, #0f4ea9 0%, #0b3f90 100%);
            color: white;
            padding: 40px 30px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          .header p {
            margin: 8px 0 0;
            opacity: 0.9;
            font-size: 16px;
          }
          .content {
            padding: 40px 30px;
            background: white;
          }
          .content h2 {
            color: #17263a;
            font-size: 22px;
            margin-top: 0;
            margin-bottom: 12px;
            font-weight: 600;
          }
          .content p {
            color: #374151;
            font-size: 16px;
            margin-bottom: 16px;
          }
          .code-container {
            background: #f0f4ff;
            padding: 24px;
            border-radius: 12px;
            text-align: center;
            margin: 24px 0;
            border: 2px dashed #0f4ea9;
          }
          .code {
            font-size: 48px;
            font-weight: 700;
            color: #0f4ea9;
            letter-spacing: 8px;
            font-family: 'Courier New', monospace;
          }
          .code-label {
            font-size: 14px;
            color: #6b7280;
            margin-bottom: 8px;
          }
          .divider {
            border: none;
            border-top: 1px solid #e5e7eb;
            margin: 24px 0;
          }
          .footer {
            text-align: center;
            padding: 20px 30px;
            font-size: 13px;
            color: #9ca3af;
            background: #f9fafb;
            border-top: 1px solid #e5e7eb;
          }
          .footer p {
            margin: 4px 0;
          }
          .badge {
            display: inline-block;
            background: rgba(255, 255, 255, 0.15);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            margin-top: 8px;
          }
          @media (max-width: 480px) {
            .container { margin: 16px; }
            .header { padding: 30px 20px 24px; }
            .header h1 { font-size: 24px; }
            .content { padding: 24px 20px; }
            .code { font-size: 36px; letter-spacing: 4px; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏗️ TradesMap</h1>
            <p>Verify Your Email Address</p>
            <span class="badge">Account Verification</span>
          </div>
          <div class="content">
            <h2>Welcome to TradesMap! 👋</h2>
            <p>Thanks for joining TradesMap – the platform connecting skilled trades workers with top employers.</p>
            <p>Please use the verification code below to verify your email address:</p>
            
            <div class="code-container">
              <div class="code-label">Your Verification Code</div>
              <div class="code">${verificationCode}</div>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; text-align: center;">
              Enter this 6-digit code on the verification page to complete your registration.
            </p>
            
            <hr class="divider">
            
            <p style="font-size: 14px; color: #6b7280;">
              ⏰ This code will expire in <strong>10 minutes</strong>.
            </p>
            <p style="font-size: 14px; color: #6b7280;">
              ❓ Didn't request this? You can safely ignore this email.
            </p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} TradesMap. All rights reserved.</p>
            <p style="font-size: 12px; color: #d1d5db;">
              This is an automated message, please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    const mailOptions = {
      from: fromEmail,
      to: email,
      subject: 'Verify Your TradesMap Account - Verification Code',
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ Verification code sent successfully to ${email}`)
    console.log(`📧 MessageId: ${info.messageId}`)
    
    return { 
      success: true, 
      messageId: info.messageId,
      email: email
    }

  } catch (error) {
    console.error('❌ Error sending verification email:', error)
    
    return {
      success: false,
      message: error.message,
      code: error.code,
      email: email
    }
  }
}

export default { sendVerificationEmail }