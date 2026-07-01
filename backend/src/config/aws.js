// import dotenv from "dotenv";
// dotenv.config();

// import { SESClient } from "@aws-sdk/client-ses";

// console.log("AWS_REGION:", process.env.AWS_REGION);

// console.log(
//   "AWS_ACCESS_KEY_ID:",
//   process.env.AWS_ACCESS_KEY_ID ? "FOUND" : "MISSING"
// );

// console.log(
//   "AWS_SECRET_ACCESS_KEY:",
//   process.env.AWS_SECRET_ACCESS_KEY ? "FOUND" : "MISSING"
// );

// export const sesClient = new SESClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
//   }
// });



// backend/src/config/aws.js
import dotenv from "dotenv";
dotenv.config();

import { SESClient } from "@aws-sdk/client-ses";
import { S3Client } from "@aws-sdk/client-s3";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// ============================================
// 📋 Environment Variables Logging (Debugging)
// ============================================

console.log("========================================");
console.log("📦 AWS Configuration Loading...");
console.log("========================================");
console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID ? "✅ FOUND" : "❌ MISSING");
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY ? "✅ FOUND" : "❌ MISSING");
console.log("S3_BUCKET_NAME:", process.env.S3_BUCKET_NAME || "❌ NOT SET");
console.log("========================================");

// ============================================
// 📧 SES Client (Email Service)
// ============================================

export const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ============================================
// 📦 S3 Client (File Storage)
// ============================================

export const s3Client = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  requestHandler: {
    connectionTimeout: 30000,
    socketTimeout: 30000,
  },
});

// ============================================
// 🗄️ DynamoDB Client (Database)
// ============================================

const dynamoClient = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  maxAttempts: 3, // Retry on failure
});

export const docClient = DynamoDBDocumentClient.from(dynamoClient);

// ============================================
// 📊 Table Names
// ============================================

export const WORKER_WIZARD_TABLE = process.env.WORKER_WIZARD_TABLE || "WorkerWizard";
export const WORKERS_TABLE = process.env.WORKERS_TABLE || "Workers";
export const COMPANY_WIZARD_TABLE = process.env.COMPANY_WIZARD_TABLE || "CompanyWizard";
export const COMPANIES_TABLE = process.env.COMPANIES_TABLE || "Companies";

// ============================================
// 📦 S3 Configuration
// ============================================

export const S3_BUCKET = process.env.S3_BUCKET_NAME;
export const S3_WORKER_PROFILE_PATH = process.env.S3_WORKER_PROFILE_PATH || "workers/profile";
export const S3_WORKER_CERT_PATH = process.env.S3_WORKER_CERT_PATH || "workers/certificates";
export const S3_COMPANY_PROFILE_PATH = process.env.S3_COMPANY_PROFILE_PATH || "companies/profile";
export const S3_TEMP_PATH = process.env.S3_TEMP_PATH || "temp";

// ============================================
// 🔗 S3 Helpers
// ============================================

export const getS3Url = (fileKey) => {
  if (!S3_BUCKET) {
    console.warn("⚠️ S3_BUCKET_NAME is not set in environment variables");
    return fileKey;
  }
  return `https://${S3_BUCKET}.s3.amazonaws.com/${fileKey}`;
};

export const generateS3Key = (folder, entityType, entityId, fileName) => {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
  
  // Different paths for different entity types
  if (entityType === "worker") {
    if (folder === "profile") {
      return `${S3_WORKER_PROFILE_PATH}/${entityId}/${timestamp}-${sanitizedFileName}`;
    } else if (folder === "certificate") {
      return `${S3_WORKER_CERT_PATH}/${entityId}/${timestamp}-${sanitizedFileName}`;
    }
  } else if (entityType === "company") {
    if (folder === "profile") {
      return `${S3_COMPANY_PROFILE_PATH}/${entityId}/${timestamp}-${sanitizedFileName}`;
    }
  }
  
  // Fallback to temp
  return `${S3_TEMP_PATH}/${entityId}/${timestamp}-${sanitizedFileName}`;
};

// ============================================
// ✅ Export All Clients
// ============================================

export default {
  sesClient,
  s3Client,
  docClient,
  WORKER_WIZARD_TABLE,
  WORKERS_TABLE,
  COMPANY_WIZARD_TABLE,
  COMPANIES_TABLE,
  S3_BUCKET,
  getS3Url,
  generateS3Key,
};