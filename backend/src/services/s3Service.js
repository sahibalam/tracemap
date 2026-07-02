import { 
  PutObjectCommand, 
  GetObjectCommand, 
  DeleteObjectCommand,
  HeadObjectCommand 
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { 
  s3Client, 
  S3_BUCKET,
  S3_WORKER_PROFILE_PATH,
  S3_WORKER_CERT_PATH,
  generateS3Key,
  getS3Url
} from '../config/aws.js'

// ============================================
// 📸 PROFILE IMAGE - WORKER (Private with Presigned URLs)
// ============================================

export const generateWorkerProfileUploadUrl = async (userId, fileName, fileType) => {
  if (!userId || !fileName || !fileType) {
    throw new Error('Missing required parameters')
  }

  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
  if (!allowedTypes.includes(fileType)) {
    throw new Error('Invalid file type. Allowed: JPEG, PNG, GIF, WEBP')
  }

  const fileKey = generateS3Key('profile', 'worker', `WORKER#${userId}`, fileName)

  // ✅ Keep objects PRIVATE
  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    ContentType: fileType,
    ACL: 'private',
    Metadata: {
      userId: userId,
      type: 'profile',
      entityType: 'worker',
      uploadedAt: new Date().toISOString()
    }
  })

  const uploadUrl = await getSignedUrl(s3Client, command, { 
    expiresIn: 3600 
  })

  return {
    uploadUrl,
    fileKey,
    fileUrl: getS3Url(fileKey),
    expiresIn: 3600
  }
}

// ============================================
// ✅ NEW: Generate presigned URL for viewing profile image
// ============================================

export const generateProfileViewUrl = async (fileKey, userId) => {
  if (!fileKey) {
    throw new Error('Missing fileKey')
  }

  try {
    // Verify file exists
    const headResult = await s3Client.send(new HeadObjectCommand({
      Bucket: S3_BUCKET,
      Key: fileKey
    }))
    
    console.log(`✅ File found: ${fileKey}, Size: ${headResult.ContentLength}`)
  } catch (error) {
    console.error(`❌ File not found: ${fileKey}`, error)
    if (error.name === 'NotFound') {
      throw new Error('File not found')
    }
    throw error
  }

  // Generate presigned URL for viewing (valid for 1 hour)
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    ResponseContentDisposition: 'inline',
  })

  const viewUrl = await getSignedUrl(s3Client, command, { 
    expiresIn: 3600 
  })

  console.log(`✅ Presigned view URL generated for: ${fileKey}`)
  return viewUrl
}

// ============================================
// 📄 CERTIFICATE - WORKER (Private)
// ============================================

export const generateWorkerCertificateUploadUrl = async (userId, fileName, fileType, rowIndex = 0) => {
  if (!userId || !fileName || !fileType) {
    throw new Error('Missing required parameters')
  }

  const allowedTypes = [
    'application/pdf',
    'image/jpeg', 
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
  if (!allowedTypes.includes(fileType)) {
    throw new Error('Invalid file type. Allowed: PDF, JPEG, PNG, DOC, DOCX')
  }

  const fileKey = generateS3Key('certificate', 'worker', `WORKER#${userId}`, fileName)

  const command = new PutObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    ContentType: fileType,
    ACL: 'private',
    Metadata: {
      userId: userId,
      type: 'certificate',
      entityType: 'worker',
      rowIndex: String(rowIndex || 0),
      uploadedAt: new Date().toISOString()
    }
  })

  const uploadUrl = await getSignedUrl(s3Client, command, { 
    expiresIn: 3600 
  })

  return {
    uploadUrl,
    fileKey,
    fileUrl: getS3Url(fileKey),
    expiresIn: 3600
  }
}

// ============================================
// 👁️ GENERATE VIEW URL (Generic)
// ============================================

export const generateViewUrl = async (fileKey, expiresIn = 3600) => {
  if (!fileKey) {
    throw new Error('Missing fileKey')
  }

  try {
    await s3Client.send(new HeadObjectCommand({
      Bucket: S3_BUCKET,
      Key: fileKey
    }))
  } catch (error) {
    if (error.name === 'NotFound') {
      throw new Error('File not found')
    }
    throw error
  }

  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    ResponseContentDisposition: 'inline',
  })

  const viewUrl = await getSignedUrl(s3Client, command, { 
    expiresIn 
  })

  return viewUrl
}

// ============================================
// 📥 GENERATE DOWNLOAD URL
// ============================================

export const generateDownloadUrl = async (fileKey, expiresIn = 3600) => {
  const command = new GetObjectCommand({
    Bucket: S3_BUCKET,
    Key: fileKey,
    ResponseContentDisposition: 'attachment',
  })

  const downloadUrl = await getSignedUrl(s3Client, command, { 
    expiresIn 
  })

  return downloadUrl
}

// ============================================
// 🗑️ DELETE FILE
// ============================================

export const deleteFile = async (fileKey) => {
  if (!fileKey) {
    throw new Error('Missing fileKey')
  }

  try {
    await s3Client.send(new HeadObjectCommand({
      Bucket: S3_BUCKET,
      Key: fileKey
    }))

    await s3Client.send(new DeleteObjectCommand({
      Bucket: S3_BUCKET,
      Key: fileKey
    }))

    return true
  } catch (error) {
    if (error.name === 'NotFound') {
      return true
    }
    throw error
  }
}