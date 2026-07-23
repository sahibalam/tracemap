

// backend/src/routes/workerRoutes.js
import express from 'express'
import { 
  getWorkerProfile,
  createWorkerProfile,
  updateWorkerProfile,
  updateWorkerProfileSection,
  deleteWorkerProfile,
  getWorkerByEmail,
  getAllWorkers,
  getWorkerAvailability,
  getWorkerTrade,
  getWorkerCertifications,
  getWorkerWorkHistory,
  workerHealthCheck,
  bulkUpdateProfile
} from '../controllers/workerController.js'

const router = express.Router()

// ============================================================
// 📊 PROFILE CRUD ROUTES
// ============================================================

/**
 * ✅ GET /api/worker/profile/:userId
 * Get complete worker profile from DynamoDB - Workers Table
 */
router.get('/profile/:userId', getWorkerProfile)

/**
 * ✅ POST /api/worker/profile
 * Create new worker profile (after registration)
 */
router.post('/profile', createWorkerProfile)

/**
 * ✅ PUT /api/worker/profile/:userId
 * Update entire worker profile (all sections)
 * ⚠️ DEPRECATED: Use PATCH for section-wise updates
 */
router.put('/profile/:userId', updateWorkerProfile)

/**
 * ✅ PATCH /api/worker/profile/:userId/section/:section
 * Update specific section of worker profile
 * Sections: basics, trade, workHistory, availability, emergency,
 *          certifications, tax, payment, medical, wizard
 */
router.patch('/profile/:userId/section/:section', updateWorkerProfileSection)

/**
 * ✅ DELETE /api/worker/profile/:userId
 * Delete worker profile (soft delete or hard delete)
 * Query params: ?hardDelete=true
 */
router.delete('/profile/:userId', deleteWorkerProfile)

// ============================================================
// 📦 BULK OPERATIONS
// ============================================================

/**
 * ✅ POST /api/worker/profile/:userId/bulk
 * Update multiple sections at once
 * Body: { sections: { basics: {...}, trade: {...} } }
 */
router.post('/profile/:userId/bulk', bulkUpdateProfile)

// ============================================================
// 🔍 WORKER SEARCH ROUTES
// ============================================================

/**
 * ✅ GET /api/worker/email/:email
 * Find worker by email address
 */
router.get('/email/:email', getWorkerByEmail)

/**
 * ✅ GET /api/worker/all
 * Get all workers (with pagination)
 * Query params: ?limit=20&lastKey=...
 */
router.get('/all', getAllWorkers)

// ============================================================
// 📦 WORKER SPECIFIC SECTION GETTERS
// ============================================================

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

// ============================================================
// 🏥 HEALTH CHECK
// ============================================================

/**
 * ✅ GET /api/worker/health
 * Health check for worker routes
 */
router.get('/health', workerHealthCheck)

// ============================================================
// 📋 API DOCUMENTATION ROUTE
// ============================================================

/**
 * ✅ GET /api/worker/docs
 * API documentation for worker routes
 */
router.get('/docs', (req, res) => {
  res.json({
    service: 'Worker Profile Service',
    version: '1.0.0',
    baseUrl: '/api/worker',
    sections: {
      basics: 'Personal information (Wizard Step 1)',
      trade: 'Trade profile, skills, tools & certifications (Wizard Step 2 & 3)',
      workHistory: 'Work history & projects (Wizard Step 4)',
      availability: 'Availability & preferences (Wizard Step 5)',
      emergency: 'Emergency contact (Wizard Step 6)',
      certifications: 'Certifications & safety (Edit Page)',
      tax: 'Tax profile (Edit Page)',
      payment: 'Payment & bank details (Edit Page)',
      medical: 'Medical information (Edit Page)',
      wizard: 'Wizard progress tracking (Internal)'
    }
  })
})

// ============================================================
// 📋 EXPORT ROUTER
// ============================================================

export default router