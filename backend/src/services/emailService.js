

// // backend/src/services/emailService.js
// import { SendEmailCommand } from "@aws-sdk/client-ses";
// import { sesClient } from "../config/aws.js";

// export const sendVerificationEmail = async (email, verificationLink) => {
//   try {
//     // ✅ Use SES_FROM_EMAIL from .env (not EMAIL_FROM)
//     const fromEmail = process.env.SES_FROM_EMAIL || process.env.EMAIL_FROM || "noreply@tradesmap.com";
    
//     console.log(`📧 Sending email to: ${email}`);
//     console.log(`📧 From: ${fromEmail}`);

//     const params = {
//       Source: fromEmail,
//       Destination: {
//         ToAddresses: [email],
//       },
//       Message: {
//         Subject: {
//           Data: "Verify Your TradesMap Account",
//         },
//         Body: {
//           Html: {
//             Data: `
//               <!DOCTYPE html>
//               <html>
//               <head>
//                 <meta charset="UTF-8">
//                 <style>
//                   body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
//                   .container { max-width: 600px; margin: 0 auto; padding: 20px; }
//                   .header { background: #0f4ea9; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
//                   .content { padding: 20px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
//                   .button { display: inline-block; padding: 12px 24px; background: #0f4ea9; color: white; text-decoration: none; border-radius: 8px; }
//                   .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
//                 </style>
//               </head>
//               <body>
//                 <div class="container">
//                   <div class="header">
//                     <h1>TradesMap</h1>
//                   </div>
//                   <div class="content">
//                     <h2>Welcome to TradesMap!</h2>
//                     <p>Please verify your email address by clicking the button below:</p>
//                     <p style="text-align: center;">
//                       <a href="${verificationLink}" class="button">Verify Email</a>
//                     </p>
//                     <p>Or copy and paste this link in your browser:</p>
//                     <p style="word-break: break-all;">${verificationLink}</p>
//                     <p>This link will expire in 24 hours.</p>
//                     <p>If you didn't request this, please ignore this email.</p>
//                   </div>
//                   <div class="footer">
//                     <p>&copy; 2026 TradesMap. All rights reserved.</p>
//                   </div>
//                 </div>
//               </body>
//               </html>
//             `,
//           },
//         },
//       },
//     };

//     const result = await sesClient.send(new SendEmailCommand(params));
//     console.log(`✅ Email sent successfully to ${email}`);
//     console.log(`📧 MessageId: ${result.MessageId}`);
    
//     return { success: true, messageId: result.MessageId };
    
//   } catch (error) {
//     console.error("❌ Error sending email:", error);
    
//     // ✅ Don't throw error, return failure so app doesn't crash
//     return { 
//       success: false, 
//       message: error.message,
//       code: error.code
//     };
//   }
// };






// backend/src/services/emailService.js
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

// SMTP Configuration for Resend
const transporter = nodemailer.createTransporter({
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
 * Send verification email using Resend SMTP
 */
export const sendVerificationEmail = async (email, verificationLink) => {
  try {
    const fromEmail = process.env.EMAIL_FROM || 'noreply@tradesmap.com'
    
    console.log(`📧 Sending verification email to: ${email}`)
    console.log(`📧 From: ${fromEmail}`)

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
          .button-container {
            text-align: center;
            margin: 32px 0 24px;
          }
          .button {
            display: inline-block;
            padding: 14px 36px;
            background: linear-gradient(135deg, #0f4ea9 0%, #0b3f90 100%);
            color: white;
            text-decoration: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            transition: all 0.2s ease;
            box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
          }
          .button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(15, 78, 169, 0.4);
          }
          .link-container {
            background: #f8f9fa;
            padding: 16px 20px;
            border-radius: 8px;
            margin: 20px 0;
            word-break: break-all;
            font-size: 14px;
            color: #6b7280;
            border: 1px solid #e5e7eb;
          }
          .link-container a {
            color: #0f4ea9;
            text-decoration: none;
          }
          .link-container a:hover {
            text-decoration: underline;
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
            .button { padding: 12px 28px; font-size: 15px; }
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
            <p>Please verify your email address to get started:</p>
            
            <div class="button-container">
              <a href="${verificationLink}" class="button">Verify Email Address</a>
            </div>
            
            <p style="font-size: 14px; color: #6b7280; text-align: center;">
              Or copy and paste this link into your browser:
            </p>
            <div class="link-container">
              <a href="${verificationLink}">${verificationLink}</a>
            </div>
            
            <hr class="divider">
            
            <p style="font-size: 14px; color: #6b7280;">
              ⏰ This link will expire in <strong>24 hours</strong>.
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
      subject: 'Verify Your TradesMap Account',
      html: htmlContent,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log(`✅ Verification email sent successfully to ${email}`)
    console.log(`📧 MessageId: ${info.messageId}`)
    
    return { 
      success: true, 
      messageId: info.messageId,
      email: email
    }

  } catch (error) {
    console.error('❌ Error sending verification email:', error)
    
    // Return failure so app doesn't crash
    return {
      success: false,
      message: error.message,
      code: error.code,
      email: email
    }
  }
}

export default { sendVerificationEmail }