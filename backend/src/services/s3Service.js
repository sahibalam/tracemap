// backend/src/services/s3Service.js
import { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand,
  HeadObjectCommand 
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { 
  s3Client, 
  S3_BUCKET,
  S3_WORKER_PROFILE_PATH,
  S3_WORKER_CERT_PATH,
  generateS3Key,
  getS3Url
} from "../config/aws.js";

// ============================================
// 📸 PROFILE IMAGE - WORKER
// ============================================

export const generateWorkerProfileUploadUrl = async (userId, fileName, fileType) => {
  // Validate inputs
  if (!userId || !fileName || !fileType) {
    throw new Error("Missing required parameters: userId, fileName, fileType");
  }

  // Validate file type (only images)
  const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
  if (!allowedTypes.includes(fileType)) {
    throw new Error("Invalid file type. Allowed: JPEG, PNG, GIF, WEBP");
  }

  // Validate file size (frontend will handle, but we check here too)
  // Max 5MB for profile images

  // Generate S3 key
  const fileKey = generateS3Key("profile", "worker", `WORKER#${userId}`, fileName);

  // Create upload command
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    ContentType: fileType,
    Metadata: {
      userId: userId,
      type: "profile",
      entityType: "worker",
      uploadedAt: new Date().toISOString(),
    },
    ACL: "private",
  });

  // Generate presigned URL (valid for 1 hour)
  const uploadUrl = await getSignedUrl(s3Client, command, { 
    expiresIn: 3600 
  });

  console.log(`📸 Profile upload URL generated for user: ${userId}`);

  return {
    uploadUrl,
    fileKey,
    fileUrl: getS3Url(fileKey),
    expiresIn: 3600,
  };
};

// ============================================
// 📄 CERTIFICATE - WORKER
// ============================================

export const generateWorkerCertificateUploadUrl = async (userId, fileName, fileType, rowIndex = 0) => {
  // Validate inputs
  if (!userId || !fileName || !fileType) {
    throw new Error("Missing required parameters: userId, fileName, fileType");
  }

  // Validate file type
  const allowedTypes = [
    "application/pdf",
    "image/jpeg", 
    "image/png",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (!allowedTypes.includes(fileType)) {
    throw new Error("Invalid file type. Allowed: PDF, JPEG, PNG, DOC, DOCX");
  }

  // Generate S3 key
  const fileKey = generateS3Key("certificate", "worker", `WORKER#${userId}`, fileName);

  // Create upload command
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    ContentType: fileType,
    Metadata: {
      userId: userId,
      type: "certificate",
      entityType: "worker",
      rowIndex: String(rowIndex || 0),
      uploadedAt: new Date().toISOString(),
    },
    ACL: "private",
  });

  // Generate presigned URL (valid for 1 hour)
  const uploadUrl = await getSignedUrl(s3Client, command, { 
    expiresIn: 3600 
  });

  console.log(`📄 Certificate upload URL generated for user: ${userId}, row: ${rowIndex}`);

  return {
    uploadUrl,
    fileKey,
    fileUrl: getS3Url(fileKey),
    expiresIn: 3600,
  };
};

// ============================================
// 👁️ GENERATE VIEW URL
// ============================================

export const generateViewUrl = async (fileKey, expiresIn = 3600) => {
  if (!fileKey) {
    throw new Error("Missing fileKey");
  }

  // Check if file exists
  try {
    await s3Client.send(new HeadObjectCommand({
      Bucket: S3_BUCKET,
      Key: fileKey,
    }));
  } catch (error) {
    if (error.name === "NotFound") {
      throw new Error("File not found");
    }
    throw error;
  }

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    ResponseContentDisposition: "inline",
  });

  const viewUrl = await getSignedUrl(s3Client, command, { 
    expiresIn 
  });

  return viewUrl;
};

// ============================================
// 📥 GENERATE DOWNLOAD URL
// ============================================

export const generateDownloadUrl = async (fileKey, expiresIn = 3600) => {
  if (!fileKey) {
    throw new Error("Missing fileKey");
  }

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    ResponseContentDisposition: "attachment",
  });

  const downloadUrl = await getSignedUrl(s3Client, command, { 
    expiresIn 
  });

  return downloadUrl;
};

// ============================================
// 🗑️ DELETE FILE
// ============================================

export const deleteFile = async (fileKey) => {
  if (!fileKey) {
    throw new Error("Missing fileKey");
  }

  try {
    // Check if file exists
    await s3Client.send(new HeadObjectCommand({
      Bucket: S3_BUCKET,
      Key: fileKey,
    }));

    // Delete file
    await s3Client.send(new DeleteObjectCommand({
      Bucket: S3_BUCKET,
      Key: fileKey,
    }));

    console.log(`🗑️ File deleted: ${fileKey}`);
    return true;
  } catch (error) {
    if (error.name === "NotFound") {
      console.log(`ℹ️ File not found (already deleted): ${fileKey}`);
      return true;
    }
    console.error(`❌ Error deleting file: ${fileKey}`, error);
    throw error;
  }
};

// ============================================
// 📊 GET FILE METADATA
// ============================================

export const getFileMetadata = async (fileKey) => {
  if (!fileKey) {
    throw new Error("Missing fileKey");
  }

  const result = await s3Client.send(new HeadObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
  }));

  return {
    size: result.ContentLength,
    contentType: result.ContentType,
    lastModified: result.LastModified,
    metadata: result.Metadata,
    etag: result.ETag,
  };
};