// // backend/src/routes/workerRoutes.js
// import express from 'express'
// import { 
//   getWorkerProfile,
//   updateWorkerProfile,
//   updateWorkerProfileSection,
//   getWorkerByEmail,
//   getWorkerAvailability,
//   getWorkerTrade,
//   getWorkerCertifications,
//   getWorkerWorkHistory,
//   deleteWorkerProfile,
//   getAllWorkers
// } from '../controllers/workerController.js'

// const router = express.Router()

// // ============================================
// // 📊 WORKER PROFILE ROUTES
// // ============================================

// /**
//  * ✅ GET /api/worker/profile/:userId
//  * Get complete worker profile from DynamoDB - Workers Table
//  */
// router.get('/profile/:userId', getWorkerProfile)

// /**
//  * ✅ PUT /api/worker/profile/:userId
//  * Update entire worker profile (all sections)
//  */
// router.put('/profile/:userId', updateWorkerProfile)

// /**
//  * ✅ PATCH /api/worker/profile/:userId/section/:section
//  * Update specific section of worker profile
//  * Sections: PROFILE, TRADE, WORK_HISTORY, AVAILABILITY, CERTIFICATIONS, EMERGENCY_CONTACT, POLICY_ACKS
//  */
// router.patch('/profile/:userId/section/:section', updateWorkerProfileSection)

// /**
//  * ✅ DELETE /api/worker/profile/:userId
//  * Delete worker profile (soft delete or hard delete)
//  */
// router.delete('/profile/:userId', deleteWorkerProfile)

// // ============================================
// // 🔍 WORKER SEARCH ROUTES
// // ============================================

// /**
//  * ✅ GET /api/worker/email/:email
//  * Find worker by email address
//  */
// router.get('/email/:email', getWorkerByEmail)

// /**
//  * ✅ GET /api/worker/all
//  * Get all workers (with pagination)
//  */
// router.get('/all', getAllWorkers)

// // ============================================
// // 📦 WORKER SPECIFIC SECTION ROUTES
// // ============================================

// /**
//  * ✅ GET /api/worker/:userId/availability
//  * Get only worker availability
//  */
// router.get('/:userId/availability', getWorkerAvailability)

// /**
//  * ✅ GET /api/worker/:userId/trade
//  * Get only worker trade skills
//  */
// router.get('/:userId/trade', getWorkerTrade)

// /**
//  * ✅ GET /api/worker/:userId/certifications
//  * Get only worker certifications
//  */
// router.get('/:userId/certifications', getWorkerCertifications)

// /**
//  * ✅ GET /api/worker/:userId/work-history
//  * Get only worker work history
//  */
// router.get('/:userId/work-history', getWorkerWorkHistory)

// // ============================================
// // 🏥 HEALTH CHECK FOR WORKER ROUTES
// // ============================================

// router.get('/health', (req, res) => {
//   res.json({
//     status: 'OK',
//     service: 'Worker Profile Service',
//     timestamp: new Date().toISOString(),
//     endpoints: {
//       profile: {
//         get: 'GET /api/worker/profile/:userId',
//         put: 'PUT /api/worker/profile/:userId',
//         patch: 'PATCH /api/worker/profile/:userId/section/:section',
//         delete: 'DELETE /api/worker/profile/:userId'
//       },
//       search: {
//         byEmail: 'GET /api/worker/email/:email',
//         all: 'GET /api/worker/all'
//       },
//       sections: {
//         availability: 'GET /api/worker/:userId/availability',
//         trade: 'GET /api/worker/:userId/trade',
//         certifications: 'GET /api/worker/:userId/certifications',
//         workHistory: 'GET /api/worker/:userId/work-history'
//       }
//     }
//   })
// })

// export default router




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
    endpoints: {
      profile: {
        get: {
          method: 'GET',
          url: '/profile/:userId',
          description: 'Get complete worker profile',
          response: '{ success: true, data: { profile } }'
        },
        post: {
          method: 'POST',
          url: '/profile',
          description: 'Create new worker profile',
          body: '{ userId, profile }',
          response: '{ success: true, message: "Profile created successfully" }'
        },
        put: {
          method: 'PUT',
          url: '/profile/:userId',
          description: 'Update entire profile (deprecated)',
          body: '{ profile }',
          response: '{ success: true, message: "Profile updated successfully" }'
        },
        patch: {
          method: 'PATCH',
          url: '/profile/:userId/section/:section',
          description: 'Update specific section',
          body: '{ data }',
          sections: ['basics', 'trade', 'workHistory', 'availability', 'emergency', 'certifications', 'tax', 'payment', 'medical', 'wizard'],
          response: '{ success: true, message: "section updated successfully" }'
        },
        delete: {
          method: 'DELETE',
          url: '/profile/:userId',
          description: 'Delete profile (soft or hard)',
          query: '?hardDelete=true',
          response: '{ success: true, message: "Profile soft deleted" }'
        },
        bulk: {
          method: 'POST',
          url: '/profile/:userId/bulk',
          description: 'Update multiple sections at once',
          body: '{ sections: { basics: {...}, trade: {...} } }',
          response: '{ success: true, message: "Bulk update completed" }'
        }
      },
      search: {
        byEmail: {
          method: 'GET',
          url: '/email/:email',
          description: 'Find worker by email',
          response: '{ success: true, data: [...] }'
        },
        all: {
          method: 'GET',
          url: '/all',
          description: 'Get all workers (paginated)',
          query: '?limit=20&lastKey=...',
          response: '{ success: true, data: [...], pagination: { count, limit, nextKey, hasMore } }'
        }
      },
      getters: {
        availability: {
          method: 'GET',
          url: '/:userId/availability',
          description: 'Get availability only'
        },
        trade: {
          method: 'GET',
          url: '/:userId/trade',
          description: 'Get trade only'
        },
        certifications: {
          method: 'GET',
          url: '/:userId/certifications',
          description: 'Get certifications only'
        },
        workHistory: {
          method: 'GET',
          url: '/:userId/work-history',
          description: 'Get work history only'
        }
      },
      health: {
        method: 'GET',
        url: '/health',
        description: 'Health check'
      }
    },
    sections: {
      basics: 'Personal information (Wizard Step 1)',
      trade: 'Trade profile & skills (Wizard Step 2)',
      workHistory: 'Work history & projects (Wizard Step 3)',
      availability: 'Availability & preferences (Wizard Step 4)',
      emergency: 'Emergency contact (Wizard Step 5)',
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