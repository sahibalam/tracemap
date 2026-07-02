// backend/src/controllers/uploadController.js
import { 
  generateWorkerProfileUploadUrl,
  generateWorkerCertificateUploadUrl,
  generateViewUrl,
  generateDownloadUrl,
  deleteFile
} from '../services/s3Service.js'
import { docClient, WORKER_WIZARD_TABLE } from '../config/aws.js'
import { UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb'

// ============================================
// 📸 WORKER PROFILE IMAGE UPLOAD
// ============================================

export const getWorkerProfileUploadUrl = async (req, res) => {
  try {
    const { userId, fileName, fileType } = req.body

    if (!userId || !fileName || !fileType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, fileName, fileType'
      })
    }

    console.log(`📸 Generating profile upload URL for user: ${userId}`)

    // Generate upload URL
    const result = await generateWorkerProfileUploadUrl(userId, fileName, fileType)

    // Update wizard step 1 with profile image info
    await updateWizardWithProfileImage(userId, result.fileKey, result.fileUrl)

    res.status(200).json({
      success: true,
      data: {
        uploadUrl: result.uploadUrl,
        fileKey: result.fileKey,
        fileUrl: result.fileUrl,
        expiresIn: result.expiresIn
      }
    })

  } catch (error) {
    console.error('Error generating profile upload URL:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error generating profile upload URL'
    })
  }
}

// ✅ FIXED: Helper: Update wizard with profile image
const updateWizardWithProfileImage = async (userId, fileKey, fileUrl) => {
  const timestamp = new Date().toISOString()

  try {
    await docClient.send(new UpdateCommand({
      TableName: WORKER_WIZARD_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'STEP#1'
      },
      UpdateExpression: `
        SET #data.profilePreview = :fileUrl,
            #data.profileImageKey = :fileKey,
            #data.profileImageUrl = :fileUrl,
            updatedAt = :timestamp
      `,
      ExpressionAttributeNames: {
        '#data': 'data'  // ✅ Escape reserved keyword
      },
      ExpressionAttributeValues: {
        ':fileKey': fileKey,
        ':fileUrl': fileUrl,
        ':timestamp': timestamp
      }
    }))

    console.log(`✅ Profile image updated in wizard for user: ${userId}`)
  } catch (error) {
    console.error('❌ Error updating wizard with profile image:', error)
    throw error
  }
}

// ============================================
// 📄 WORKER CERTIFICATE UPLOAD
// ============================================

export const getWorkerCertificateUploadUrl = async (req, res) => {
  try {
    const { userId, fileName, fileType, rowIndex } = req.body

    if (!userId || !fileName || !fileType) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, fileName, fileType'
      })
    }

    console.log(`📄 Generating certificate upload URL for user: ${userId}, row: ${rowIndex}`)

    // Generate upload URL
    const result = await generateWorkerCertificateUploadUrl(
      userId, 
      fileName, 
      fileType, 
      rowIndex
    )

    // Update wizard step 5 with certificate info
    await updateWizardWithCertificate(userId, rowIndex || 0, result.fileKey, result.fileUrl, fileName)

    res.status(200).json({
      success: true,
      data: {
        uploadUrl: result.uploadUrl,
        fileKey: result.fileKey,
        fileUrl: result.fileUrl,
        expiresIn: result.expiresIn
      }
    })

  } catch (error) {
    console.error('Error generating certificate upload URL:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error generating certificate upload URL'
    })
  }
}

// ✅ FIXED: Helper: Update wizard with certificate
const updateWizardWithCertificate = async (userId, rowIndex, fileKey, fileUrl, fileName) => {
  const timestamp = new Date().toISOString()

  try {
    // Get current step 5 data
    const getResult = await docClient.send(new GetCommand({
      TableName: WORKER_WIZARD_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'STEP#5'
      }
    }))

    const stepData = getResult.Item?.data || {}
    const certRows = stepData.certRows || []

    if (certRows[rowIndex]) {
      certRows[rowIndex] = {
        ...certRows[rowIndex],
        uploadRef: fileName,
        fileKey: fileKey,
        fileUrl: fileUrl,
        uploadedAt: timestamp
      }

      await docClient.send(new UpdateCommand({
        TableName: WORKER_WIZARD_TABLE,
        Key: {
          PK: `WORKER#${userId}`,
          SK: 'STEP#5'
        },
        UpdateExpression: 'SET #data.certRows = :certRows, updatedAt = :timestamp',
        ExpressionAttributeNames: {
          '#data': 'data'  // ✅ Escape reserved keyword
        },
        ExpressionAttributeValues: {
          ':certRows': certRows,
          ':timestamp': timestamp
        }
      }))

      console.log(`✅ Certificate updated in wizard for user: ${userId}, row: ${rowIndex}`)
    }
  } catch (error) {
    console.error('❌ Error updating wizard with certificate:', error)
    throw error
  }
}

// ============================================
// 👁️ GET FILE VIEW URL
// ============================================

export const getFileViewUrl = async (req, res) => {
  try {
    const { fileKey } = req.params
    const { download } = req.query

    if (!fileKey) {
      return res.status(400).json({
        success: false,
        message: 'Missing fileKey'
      })
    }

    console.log(`👁️ Generating view URL for file: ${fileKey}`)

    let viewUrl
    if (download === 'true') {
      viewUrl = await generateDownloadUrl(fileKey)
    } else {
      viewUrl = await generateViewUrl(fileKey)
    }

    res.status(200).json({
      success: true,
      data: { viewUrl }
    })

  } catch (error) {
    console.error('Error getting view URL:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting view URL'
    })
  }
}

// ============================================
// 🗑️ DELETE FILE
// ============================================

export const deleteFileFromS3 = async (req, res) => {
  try {
    const { fileKey } = req.params

    if (!fileKey) {
      return res.status(400).json({
        success: false,
        message: 'Missing fileKey'
      })
    }

    console.log(`🗑️ Deleting file: ${fileKey}`)

    await deleteFile(fileKey)

    res.status(200).json({
      success: true,
      message: 'File deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting file:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting file'
    })
  }
}