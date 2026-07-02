// backend/src/controllers/uploadController.js
// import { 
//   generateWorkerProfileUploadUrl,
//   generateWorkerCertificateUploadUrl,
//   generateViewUrl,
//   generateDownloadUrl,
//   deleteFile
// } from '../services/s3Service.js'
// import { docClient, WORKER_WIZARD_TABLE } from '../config/aws.js'
// import { UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb'

// // ============================================
// // 📸 WORKER PROFILE IMAGE UPLOAD
// // ============================================

// export const getWorkerProfileUploadUrl = async (req, res) => {
//   try {
//     const { userId, fileName, fileType } = req.body

//     if (!userId || !fileName || !fileType) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: userId, fileName, fileType'
//       })
//     }

//     console.log(`📸 Generating profile upload URL for user: ${userId}`)

//     // Generate upload URL
//     const result = await generateWorkerProfileUploadUrl(userId, fileName, fileType)

//     // Update wizard step 1 with profile image info
//     await updateWizardWithProfileImage(userId, result.fileKey, result.fileUrl)

//     res.status(200).json({
//       success: true,
//       data: {
//         uploadUrl: result.uploadUrl,
//         fileKey: result.fileKey,
//         fileUrl: result.fileUrl,
//         expiresIn: result.expiresIn
//       }
//     })

//   } catch (error) {
//     console.error('Error generating profile upload URL:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error generating profile upload URL'
//     })
//   }
// }

// // ✅ FIXED: Helper: Update wizard with profile image
// const updateWizardWithProfileImage = async (userId, fileKey, fileUrl) => {
//   const timestamp = new Date().toISOString()

//   try {
//     await docClient.send(new UpdateCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'STEP#1'
//       },
//       UpdateExpression: `
//         SET #data.profilePreview = :fileUrl,
//             #data.profileImageKey = :fileKey,
//             #data.profileImageUrl = :fileUrl,
//             updatedAt = :timestamp
//       `,
//       ExpressionAttributeNames: {
//         '#data': 'data'  // ✅ Escape reserved keyword
//       },
//       ExpressionAttributeValues: {
//         ':fileKey': fileKey,
//         ':fileUrl': fileUrl,
//         ':timestamp': timestamp
//       }
//     }))

//     console.log(`✅ Profile image updated in wizard for user: ${userId}`)
//   } catch (error) {
//     console.error('❌ Error updating wizard with profile image:', error)
//     throw error
//   }
// }

// // ============================================
// // 📄 WORKER CERTIFICATE UPLOAD
// // ============================================

// export const getWorkerCertificateUploadUrl = async (req, res) => {
//   try {
//     const { userId, fileName, fileType, rowIndex } = req.body

//     if (!userId || !fileName || !fileType) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: userId, fileName, fileType'
//       })
//     }

//     console.log(`📄 Generating certificate upload URL for user: ${userId}, row: ${rowIndex}`)

//     // Generate upload URL
//     const result = await generateWorkerCertificateUploadUrl(
//       userId, 
//       fileName, 
//       fileType, 
//       rowIndex
//     )

//     // Update wizard step 5 with certificate info
//     await updateWizardWithCertificate(userId, rowIndex || 0, result.fileKey, result.fileUrl, fileName)

//     res.status(200).json({
//       success: true,
//       data: {
//         uploadUrl: result.uploadUrl,
//         fileKey: result.fileKey,
//         fileUrl: result.fileUrl,
//         expiresIn: result.expiresIn
//       }
//     })

//   } catch (error) {
//     console.error('Error generating certificate upload URL:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error generating certificate upload URL'
//     })
//   }
// }

// // ✅ FIXED: Helper: Update wizard with certificate
// const updateWizardWithCertificate = async (userId, rowIndex, fileKey, fileUrl, fileName) => {
//   const timestamp = new Date().toISOString()

//   try {
//     // Get current step 5 data
//     const getResult = await docClient.send(new GetCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'STEP#5'
//       }
//     }))

//     const stepData = getResult.Item?.data || {}
//     const certRows = stepData.certRows || []

//     if (certRows[rowIndex]) {
//       certRows[rowIndex] = {
//         ...certRows[rowIndex],
//         uploadRef: fileName,
//         fileKey: fileKey,
//         fileUrl: fileUrl,
//         uploadedAt: timestamp
//       }

//       await docClient.send(new UpdateCommand({
//         TableName: WORKER_WIZARD_TABLE,
//         Key: {
//           PK: `WORKER#${userId}`,
//           SK: 'STEP#5'
//         },
//         UpdateExpression: 'SET #data.certRows = :certRows, updatedAt = :timestamp',
//         ExpressionAttributeNames: {
//           '#data': 'data'  // ✅ Escape reserved keyword
//         },
//         ExpressionAttributeValues: {
//           ':certRows': certRows,
//           ':timestamp': timestamp
//         }
//       }))

//       console.log(`✅ Certificate updated in wizard for user: ${userId}, row: ${rowIndex}`)
//     }
//   } catch (error) {
//     console.error('❌ Error updating wizard with certificate:', error)
//     throw error
//   }
// }

// // ============================================
// // 👁️ GET FILE VIEW URL
// // ============================================

// export const getFileViewUrl = async (req, res) => {
//   try {
//     const { fileKey } = req.params
//     const { download } = req.query

//     if (!fileKey) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing fileKey'
//       })
//     }

//     console.log(`👁️ Generating view URL for file: ${fileKey}`)

//     let viewUrl
//     if (download === 'true') {
//       viewUrl = await generateDownloadUrl(fileKey)
//     } else {
//       viewUrl = await generateViewUrl(fileKey)
//     }

//     res.status(200).json({
//       success: true,
//       data: { viewUrl }
//     })

//   } catch (error) {
//     console.error('Error getting view URL:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error getting view URL'
//     })
//   }
// }

// // ============================================
// // 🗑️ DELETE FILE
// // ============================================

// export const deleteFileFromS3 = async (req, res) => {
//   try {
//     const { fileKey } = req.params

//     if (!fileKey) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing fileKey'
//       })
//     }

//     console.log(`🗑️ Deleting file: ${fileKey}`)

//     await deleteFile(fileKey)

//     res.status(200).json({
//       success: true,
//       message: 'File deleted successfully'
//     })

//   } catch (error) {
//     console.error('Error deleting file:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error deleting file'
//     })
//   }
// }



import { 
  generateWorkerProfileUploadUrl,
  generateWorkerCertificateUploadUrl,
  generateViewUrl,
  generateDownloadUrl,
  deleteFile,
  generateProfileViewUrl
} from '../services/s3Service.js'
import { docClient, WORKER_WIZARD_TABLE } from '../config/aws.js'
import { UpdateCommand, GetCommand, PutCommand } from '@aws-sdk/lib-dynamodb'

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

    const result = await generateWorkerProfileUploadUrl(userId, fileName, fileType)

    await updateWizardWithProfileImage(userId, result.fileKey, result.fileUrl)

    // ✅ Generate presigned view URL for immediate display
    const viewUrl = await generateProfileViewUrl(result.fileKey, userId)

    res.status(200).json({
      success: true,
      data: {
        uploadUrl: result.uploadUrl,
        fileKey: result.fileKey,
        fileUrl: result.fileUrl,
        viewUrl: viewUrl,  // ✅ Presigned URL for viewing
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

// ✅ Helper: Update wizard with profile image (auto-create if missing)
const updateWizardWithProfileImage = async (userId, fileKey, fileUrl) => {
  const timestamp = new Date().toISOString()

  try {
    // Step 1: Check if step 1 exists
    const getResult = await docClient.send(new GetCommand({
      TableName: WORKER_WIZARD_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'STEP#1'
      }
    }))

    // Step 2: If step 1 doesn't exist, create it with the image
    if (!getResult.Item) {
      console.log(`📝 Step 1 not found for user: ${userId}, creating with profile image...`)
      
      await docClient.send(new PutCommand({
        TableName: WORKER_WIZARD_TABLE,
        Item: {
          PK: `WORKER#${userId}`,
          SK: 'STEP#1',
          stepNumber: 1,
          data: {
            profilePreview: fileUrl,
            profileImageKey: fileKey,
            profileImageUrl: fileUrl
          },
          createdAt: timestamp,
          updatedAt: timestamp,
          ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days
        }
      }))
      
      console.log(`✅ Step 1 created with profile image for user: ${userId}`)
      return
    }

    // Step 3: Step 1 exists, update it with the image
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
    console.log(`   fileUrl: ${fileUrl}`)

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

    const result = await generateWorkerCertificateUploadUrl(
      userId, 
      fileName, 
      fileType, 
      rowIndex
    )

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

// Helper: Update wizard with certificate (auto-create if missing)
const updateWizardWithCertificate = async (userId, rowIndex, fileKey, fileUrl, fileName) => {
  const timestamp = new Date().toISOString()

  try {
    // Check if step 5 exists
    const getResult = await docClient.send(new GetCommand({
      TableName: WORKER_WIZARD_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'STEP#5'
      }
    }))

    let stepData = getResult.Item?.data || {}
    let certRows = stepData.certRows || []

    // If step 5 doesn't exist, create it
    if (!getResult.Item) {
      console.log(`📝 Step 5 not found for user: ${userId}, creating...`)
      certRows = []
      // Initialize 3 empty rows if needed
      for (let i = 0; i < 3; i++) {
        certRows.push({ name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' })
      }
    }

    // Update the specific row
    if (certRows[rowIndex]) {
      certRows[rowIndex] = {
        ...certRows[rowIndex],
        uploadRef: fileName,
        fileKey: fileKey,
        fileUrl: fileUrl,
        uploadedAt: timestamp
      }

      // If step 5 doesn't exist, create it
      if (!getResult.Item) {
        await docClient.send(new PutCommand({
          TableName: WORKER_WIZARD_TABLE,
          Item: {
            PK: `WORKER#${userId}`,
            SK: 'STEP#5',
            stepNumber: 5,
            data: { certRows },
            createdAt: timestamp,
            updatedAt: timestamp,
            ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
          }
        }))
        console.log(`✅ Step 5 created with certificate for user: ${userId}, row: ${rowIndex}`)
      } else {
        // Update existing step 5
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