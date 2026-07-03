// import { SendEmailCommand } from "@aws-sdk/client-ses";
// import { sesClient } from "../config/aws.js";

// export const sendVerificationEmail = async (
//   email,
//   verificationLink
// ) => {

//   const params = {
//     Source: process.env.EMAIL_FROM,

//     Destination: {
//       ToAddresses: [email]
//     },

//     Message: {
//       Subject: {
//         Data: "Verify Your TradesMap Account"
//       },

//       Body: {
//         Html: {
//           Data: `
//             <h2>Welcome to TradesMap</h2>

//             <p>Please verify your email:</p>

//             <a href="${verificationLink}">
//               Verify Email
//             </a>
//           `
//         }
//       }
//     }
//   };

//   await sesClient.send(
//     new SendEmailCommand(params)
//   );
// };


// backend/src/services/emailService.js
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "../config/aws.js";

export const sendVerificationEmail = async (email, verificationLink) => {
  try {
    // ✅ Use SES_FROM_EMAIL from .env (not EMAIL_FROM)
    const fromEmail = process.env.SES_FROM_EMAIL || process.env.EMAIL_FROM || "noreply@tradesmap.com";
    
    console.log(`📧 Sending email to: ${email}`);
    console.log(`📧 From: ${fromEmail}`);

    const params = {
      Source: fromEmail,
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: "Verify Your TradesMap Account",
        },
        Body: {
          Html: {
            Data: `
              <!DOCTYPE html>
              <html>
              <head>
                <meta charset="UTF-8">
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: #0f4ea9; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                  .content { padding: 20px; background: #f9f9f9; border-radius: 0 0 8px 8px; }
                  .button { display: inline-block; padding: 12px 24px; background: #0f4ea9; color: white; text-decoration: none; border-radius: 8px; }
                  .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>TradesMap</h1>
                  </div>
                  <div class="content">
                    <h2>Welcome to TradesMap!</h2>
                    <p>Please verify your email address by clicking the button below:</p>
                    <p style="text-align: center;">
                      <a href="${verificationLink}" class="button">Verify Email</a>
                    </p>
                    <p>Or copy and paste this link in your browser:</p>
                    <p style="word-break: break-all;">${verificationLink}</p>
                    <p>This link will expire in 24 hours.</p>
                    <p>If you didn't request this, please ignore this email.</p>
                  </div>
                  <div class="footer">
                    <p>&copy; 2026 TradesMap. All rights reserved.</p>
                  </div>
                </div>
              </body>
              </html>
            `,
          },
        },
      },
    };

    const result = await sesClient.send(new SendEmailCommand(params));
    console.log(`✅ Email sent successfully to ${email}`);
    console.log(`📧 MessageId: ${result.MessageId}`);
    
    return { success: true, messageId: result.MessageId };
    
  } catch (error) {
    console.error("❌ Error sending email:", error);
    
    // ✅ Don't throw error, return failure so app doesn't crash
    return { 
      success: false, 
      message: error.message,
      code: error.code
    };
  }
};