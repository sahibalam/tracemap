import dotenv from "dotenv";
dotenv.config();

import { SESClient } from "@aws-sdk/client-ses";

console.log("AWS_REGION:", process.env.AWS_REGION);

console.log(
  "AWS_ACCESS_KEY_ID:",
  process.env.AWS_ACCESS_KEY_ID ? "FOUND" : "MISSING"
);

console.log(
  "AWS_SECRET_ACCESS_KEY:",
  process.env.AWS_SECRET_ACCESS_KEY ? "FOUND" : "MISSING"
);

export const sesClient = new SESClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});