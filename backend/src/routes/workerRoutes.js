// backend/src/routes/workerRoutes.js
import express from 'express'
import { 
  getWorkerProfile,
  updateWorkerProfile,
  updateWorkerProfileSection,
  getWorkerByEmail,
  getWorkerAvailability,
  getWorkerTrade,
  getWorkerCertifications,
  getWorkerWorkHistory,
  deleteWorkerProfile,
  getAllWorkers
} from '../controllers/workerController.js'

const router = express.Router()

// ============================================
// 📊 WORKER PROFILE ROUTES
// ============================================

/**
 * ✅ GET /api/worker/profile/:userId
 * Get complete worker profile from DynamoDB - Workers Table
 */
router.get('/profile/:userId', getWorkerProfile)

/**
 * ✅ PUT /api/worker/profile/:userId
 * Update entire worker profile (all sections)
 */
router.put('/profile/:userId', updateWorkerProfile)

/**
 * ✅ PATCH /api/worker/profile/:userId/section/:section
 * Update specific section of worker profile
 * Sections: PROFILE, TRADE, WORK_HISTORY, AVAILABILITY, CERTIFICATIONS, EMERGENCY_CONTACT, POLICY_ACKS
 */
router.patch('/profile/:userId/section/:section', updateWorkerProfileSection)

/**
 * ✅ DELETE /api/worker/profile/:userId
 * Delete worker profile (soft delete or hard delete)
 */
router.delete('/profile/:userId', deleteWorkerProfile)

// ============================================
// 🔍 WORKER SEARCH ROUTES
// ============================================

/**
 * ✅ GET /api/worker/email/:email
 * Find worker by email address
 */
router.get('/email/:email', getWorkerByEmail)

/**
 * ✅ GET /api/worker/all
 * Get all workers (with pagination)
 */
router.get('/all', getAllWorkers)

// ============================================
// 📦 WORKER SPECIFIC SECTION ROUTES
// ============================================

/**
 * ✅ GET /api/worker/:userId/availability
 * Get only worker availability
 */
router.get('/:userId/availability', getWorkerAvailability)

/**
 * ✅ GET /api/worker/:userId/trade
 * Get only worker trade skills
 */
router.get('/:userId/trade', getWorkerTrade)

/**
 * ✅ GET /api/worker/:userId/certifications
 * Get only worker certifications
 */
router.get('/:userId/certifications', getWorkerCertifications)

/**
 * ✅ GET /api/worker/:userId/work-history
 * Get only worker work history
 */
router.get('/:userId/work-history', getWorkerWorkHistory)

// ============================================
// 🏥 HEALTH CHECK FOR WORKER ROUTES
// ============================================

router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    service: 'Worker Profile Service',
    timestamp: new Date().toISOString(),
    endpoints: {
      profile: {
        get: 'GET /api/worker/profile/:userId',
        put: 'PUT /api/worker/profile/:userId',
        patch: 'PATCH /api/worker/profile/:userId/section/:section',
        delete: 'DELETE /api/worker/profile/:userId'
      },
      search: {
        byEmail: 'GET /api/worker/email/:email',
        all: 'GET /api/worker/all'
      },
      sections: {
        availability: 'GET /api/worker/:userId/availability',
        trade: 'GET /api/worker/:userId/trade',
        certifications: 'GET /api/worker/:userId/certifications',
        workHistory: 'GET /api/worker/:userId/work-history'
      }
    }
  })
})

export default router