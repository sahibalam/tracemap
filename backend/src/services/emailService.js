import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "../config/aws.js";

export const sendVerificationEmail = async (
  email,
  verificationLink
) => {

  const params = {
    Source: process.env.EMAIL_FROM,

    Destination: {
      ToAddresses: [email]
    },

    Message: {
      Subject: {
        Data: "Verify Your TradesMap Account"
      },

      Body: {
        Html: {
          Data: `
            <h2>Welcome to TradesMap</h2>

            <p>Please verify your email:</p>

            <a href="${verificationLink}">
              Verify Email
            </a>
          `
        }
      }
    }
  };

  await sesClient.send(
    new SendEmailCommand(params)
  );
};