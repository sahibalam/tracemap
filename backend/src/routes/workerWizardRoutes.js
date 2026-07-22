// // backend/src/routes/workerWizardRoutes.js

// import express from 'express'
// import {
//   saveWizardStep,
//   getWizardProgress,
//   completeWizard
// } from '../controllers/workerWizardController.js'
// import {
//   getWorkerProfileUploadUrl,
//   getWorkerCertificateUploadUrl,
//   getFileViewUrl,
//   deleteFileFromS3
// } from '../controllers/uploadController.js'

// const router = express.Router()

// // ============================================
// // 📊 WIZARD ROUTES
// // ============================================

// // Save a wizard step
// router.post('/wizard/step', saveWizardStep)

// // Get wizard progress for a user
// router.get('/wizard/progress/:userId', getWizardProgress)

// // Complete the wizard (move to production)
// router.post('/wizard/complete', completeWizard)

// // ============================================
// // 📸 UPLOAD ROUTES
// // ============================================

// // Get presigned URL for profile image upload
// router.post('/upload/profile', getWorkerProfileUploadUrl)

// // Get presigned URL for certificate upload
// router.post('/upload/certificate', getWorkerCertificateUploadUrl)

// // ✅ FIX: Get view URL for a file with URL decoding
// router.get('/upload/view/:fileKey', (req, res, next) => {
//   // Decode the fileKey if it's URL encoded (handles #, %, etc.)
//   if (req.params.fileKey) {
//     try {
//       const decoded = decodeURIComponent(req.params.fileKey)
//       console.log(`🔗 Original fileKey: ${req.params.fileKey}`)
//       console.log(`🔗 Decoded fileKey: ${decoded}`)
//       req.params.fileKey = decoded
//     } catch (e) {
//       console.log(`⚠️ Could not decode: ${req.params.fileKey}`)
//     }
//   }
//   next()
// }, getFileViewUrl)

// // Delete a file from S3
// router.delete('/upload/:fileKey', deleteFileFromS3)

// // ============================================
// // 🏥 HEALTH CHECK
// // ============================================

// router.get('/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     service: 'TradesMap Worker Wizard API',
//     version: '1.0.0',
//     environment: process.env.NODE_ENV || 'development',
//     endpoints: {
//       wizard: {
//         save: 'POST /api/wizard/step',
//         progress: 'GET /api/wizard/progress/:userId',
//         complete: 'POST /api/wizard/complete'
//       },
//       upload: {
//         profile: 'POST /api/upload/profile',
//         certificate: 'POST /api/upload/certificate',
//         view: 'GET /api/upload/view/:fileKey',
//         delete: 'DELETE /api/upload/:fileKey'
//       },
//       health: 'GET /api/health'
//     },
//     aws: {
//       region: process.env.AWS_REGION,
//       bucket: process.env.S3_BUCKET_NAME,
//       tables: {
//         workerWizard: process.env.WORKER_WIZARD_TABLE,
//         workers: process.env.WORKERS_TABLE
//       }
//     }
//   })
// })

// export default router



// backend/src/routes/workerWizardRoutes.js
import express from 'express'
import {
  saveWizardStep,
  getWizardProgress,
  completeWizard
} from '../controllers/workerWizardController.js'
import {
  getWorkerProfileUploadUrl,
  getWorkerCertificateUploadUrl,
  getFileViewUrl,
  deleteFileFromS3
} from '../controllers/uploadController.js'

const router = express.Router()

// ============================================
// 📊 WIZARD ROUTES
// ============================================

/**
 * ✅ POST /api/wizard/step
 * Save a wizard step (supports steps 1-6)
 * Body: { userId, stepNumber, stepData }
 */
router.post('/wizard/step', saveWizardStep)

/**
 * ✅ GET /api/wizard/progress/:userId
 * Get wizard progress for a user
 * Returns: { currentStep, nextStep, totalSteps: 6, steps, isComplete }
 */
router.get('/wizard/progress/:userId', getWizardProgress)

/**
 * ✅ POST /api/wizard/complete
 * Complete the wizard (move to production)
 * Body: { userId, password }
 */
router.post('/wizard/complete', completeWizard)

// ============================================
// 📸 UPLOAD ROUTES
// ============================================

/**
 * ✅ POST /api/upload/profile
 * Get presigned URL for profile image upload
 * Body: { userId, fileName, fileType }
 */
router.post('/upload/profile', getWorkerProfileUploadUrl)

/**
 * ✅ POST /api/upload/certificate
 * Get presigned URL for certificate upload
 * Body: { userId, fileName, fileType, rowIndex }
 */
router.post('/upload/certificate', getWorkerCertificateUploadUrl)

/**
 * ✅ GET /api/upload/view/:fileKey
 * Get view URL for a file with URL decoding
 */
router.get('/upload/view/:fileKey', (req, res, next) => {
  if (req.params.fileKey) {
    try {
      const decoded = decodeURIComponent(req.params.fileKey)
      console.log(`🔗 Original fileKey: ${req.params.fileKey}`)
      console.log(`🔗 Decoded fileKey: ${decoded}`)
      req.params.fileKey = decoded
    } catch (e) {
      console.log(`⚠️ Could not decode: ${req.params.fileKey}`)
    }
  }
  next()
}, getFileViewUrl)

/**
 * ✅ DELETE /api/upload/:fileKey
 * Delete a file from S3
 */
router.delete('/upload/:fileKey', deleteFileFromS3)

// ============================================
// 🏥 HEALTH CHECK
// ============================================

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'TradesMap Worker Wizard API',
    version: '2.0.0',
    environment: process.env.NODE_ENV || 'development',
    wizardSteps: 6,
    endpoints: {
      wizard: {
        save: 'POST /api/wizard/step',
        progress: 'GET /api/wizard/progress/:userId',
        complete: 'POST /api/wizard/complete'
      },
      upload: {
        profile: 'POST /api/upload/profile',
        certificate: 'POST /api/upload/certificate',
        view: 'GET /api/upload/view/:fileKey',
        delete: 'DELETE /api/upload/:fileKey'
      },
      health: 'GET /api/health'
    },
    aws: {
      region: process.env.AWS_REGION,
      bucket: process.env.S3_BUCKET_NAME,
      tables: {
        workerWizard: process.env.WORKER_WIZARD_TABLE,
        workers: process.env.WORKERS_TABLE
      }
    }
  })
})

export default router