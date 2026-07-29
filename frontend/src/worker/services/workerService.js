
// // src/worker/services/workerService.js
// import api from '../../services/api'

// class WorkerService {
//   /**
//    * ============================================================
//    * 📊 PROFILE CRUD OPERATIONS
//    * ============================================================
//    */

//   /**
//    * ✅ Get complete worker profile from Workers Table
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Profile data from Workers Table
//    */
//   async getWorkerProfile(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       console.log(`📊 Fetching profile for user: ${userId}`)
      
//       const response = await api.get(`/worker/profile/${userId}`)
      
//       if (response.data.success) {
//         console.log('✅ Profile fetched successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to fetch profile')
//       }
//     } catch (error) {
//       console.error('Error fetching profile:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Create new worker profile (after registration)
//    * @param {string} userId - Firebase UID of the worker
//    * @param {object} profile - Initial profile data
//    * @returns {Promise} Creation response
//    */
//   async createWorkerProfile(userId, profile) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!profile) throw new Error('Profile data is required')

//       console.log(`📝 Creating profile for user: ${userId}`)

//       const response = await api.post('/worker/profile', {
//         userId,
//         profile
//       })

//       if (response.data.success) {
//         console.log('✅ Profile created successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to create profile')
//       }
//     } catch (error) {
//       console.error('Error creating profile:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Update a specific section of worker profile (CRITICAL METHOD)
//    * Used by ALL edit pages and wizard steps
//    * @param {string} userId - Firebase UID of the worker
//    * @param {string} section - Section name (basics, trade, workHistory, etc.)
//    * @param {object} data - Updated data for the section
//    * @returns {Promise} Update response
//    */
//   async updateSection(userId, section, data) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!section) throw new Error('Section name is required')
//       if (!data) throw new Error('Data is required')

//       console.log(`📝 Updating ${section} for user: ${userId}`)
      
//       const response = await api.patch(`/worker/profile/${userId}/section/${section}`, {
//         section,
//         data
//       })
      
//       if (response.data.success) {
//         console.log(`✅ ${section} updated successfully`)
//         return response.data
//       } else {
//         throw new Error(response.data.message || `Failed to update ${section}`)
//       }
//     } catch (error) {
//       console.error(`Error updating ${section}:`, error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Update entire worker profile (PUT - full replace)
//    * ⚠️ DEPRECATED: Use updateSection instead
//    */
//   async updateWorkerProfile(userId, section, data) {
//     console.warn('⚠️ updateWorkerProfile is deprecated, use updateSection instead')
//     return this.updateSection(userId, section, data)
//   }

//   /**
//    * ✅ Delete worker profile
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Delete response
//    */
//   async deleteWorkerProfile(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       console.log(`🗑️ Deleting profile for user: ${userId}`)

//       const response = await api.delete(`/worker/profile/${userId}`)

//       if (response.data.success) {
//         console.log('✅ Profile deleted successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to delete profile')
//       }
//     } catch (error) {
//       console.error('Error deleting profile:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Check if worker profile exists
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise<boolean>} True if profile exists
//    */
//   async profileExists(userId) {
//     try {
//       const response = await this.getWorkerProfile(userId)
//       return response.success && response.data !== null
//     } catch (error) {
//       if (error.response && error.response.status === 404) {
//         return false
//       }
//       throw error
//     }
//   }

//   /**
//    * ============================================================
//    * 📝 CONVENIENCE METHODS - WIZARD STEPS
//    * These map directly to wizard steps
//    * ============================================================
//    */

//   /**
//    * ✅ Update basics (Wizard Step 1)
//    * IMPORTANT: Always merges with existing data to preserve all fields
//    * Also updates email across ALL sections if email is being changed
//    */
//   async updateBasics(userId, data) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!data) throw new Error('Data is required')

//       console.log(`📝 Updating basics for user: ${userId}`)
//       console.log('📝 Data received:', JSON.stringify(data, null, 2))

//       // ✅ CRITICAL: Get current profile to merge data
//       const currentProfile = await this.getWorkerProfile(userId)
//       const existingBasics = currentProfile.success && currentProfile.data?.basics 
//         ? currentProfile.data.basics 
//         : {}

//       // ✅ Merge existing basics with new data (new data takes precedence)
//       const mergedBasics = {
//         ...existingBasics,
//         ...data
//       }

//       console.log('📝 Merged basics:', JSON.stringify(mergedBasics, null, 2))

//       // If email is being updated, update it across ALL sections
//       if (data.emailAddress) {
//         console.log(`📧 Email change detected, updating across ALL sections`)
//         return this.updateEmailAcrossAllSections(userId, data.emailAddress, mergedBasics)
//       }

//       // If no email change, just update basics section with merged data
//       return this.updateSection(userId, 'basics', mergedBasics)

//     } catch (error) {
//       console.error('Error updating basics:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Update trade profile (Wizard Step 2 & 3 - both go to trade section)
//    * Step 2: Trade Profile & Skill Matrix
//    * Step 3: Tools, Certifications & Requirements
//    */
//   async updateTrade(userId, data) {
//     return this.updateSection(userId, 'trade', data)
//   }

//   /**
//    * ✅ Update work history (Wizard Step 4)
//    */
//   async updateWorkHistory(userId, data) {
//     return this.updateSection(userId, 'workHistory', data)
//   }

//   /**
//    * ✅ Update availability (Wizard Step 5)
//    */
//   async updateAvailability(userId, data) {
//     return this.updateSection(userId, 'availability', data)
//   }

//   /**
//    * ✅ Update emergency contact (Wizard Step 6)
//    */
//   async updateEmergency(userId, data) {
//     return this.updateSection(userId, 'emergency', data)
//   }

//   /**
//    * ============================================================
//    * 📝 CONVENIENCE METHODS - STANDALONE EDIT PAGES
//    * These are NOT part of wizard but separate sections
//    * ============================================================
//    */

//   /**
//    * ✅ Update certifications
//    */
//   async updateCertifications(userId, data) {
//     return this.updateSection(userId, 'certifications', data)
//   }

//   /**
//    * ✅ Update tax profile
//    */
//   async updateTax(userId, data) {
//     return this.updateSection(userId, 'tax', data)
//   }

//   /**
//    * ✅ Update payment/bank details
//    */
//   async updatePayment(userId, data) {
//     return this.updateSection(userId, 'payment', data)
//   }

//   /**
//    * ✅ Update medical details
//    */
//   async updateMedical(userId, data) {
//     return this.updateSection(userId, 'medical', data)
//   }

//   /**
//    * ============================================================
//    * 📧 EMAIL MANAGEMENT - NEW METHODS
//    * ============================================================
//    */

//   /**
//    * ✅ Update email across ALL sections of the profile
//    * IMPORTANT: Preserves all existing data in each section
//    * @param {string} userId - Firebase UID of the worker
//    * @param {string} newEmail - New email address
//    * @param {object} additionalData - Additional data to update in basics (optional)
//    * @returns {Promise} Update response
//    */
//   async updateEmailAcrossAllSections(userId, newEmail, additionalData = {}) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!newEmail) throw new Error('New email is required')

//       console.log(`📧 Updating email across ALL sections for user: ${userId} to: ${newEmail}`)

//       // Get current profile
//       const profile = await this.getWorkerProfile(userId)
//       if (!profile.success || !profile.data) {
//         throw new Error('Profile not found')
//       }

//       const data = profile.data
//       const sections = {}

//       // 1. Update basics - MERGE with existing data
//       const existingBasics = data.basics || {}
//       sections.basics = {
//         ...existingBasics,        // Keep all existing fields
//         ...additionalData,        // Add/override with additional data
//         emailAddress: newEmail    // Ensure email is updated
//       }

//       console.log('📝 Updated basics with email:', JSON.stringify(sections.basics, null, 2))

//       // 2. Update email in ALL sections that have email field
//       const sectionsWithEmail = [
//         'trade', 
//         'workHistory', 
//         'availability', 
//         'emergency', 
//         'certifications', 
//         'tax', 
//         'payment', 
//         'medical', 
//         'wizard'
//       ]

//       sectionsWithEmail.forEach(section => {
//         if (data[section]) {
//           sections[section] = {
//             ...data[section],      // Keep all existing fields
//             emailAddress: newEmail // Update email
//           }
//         }
//       })

//       // 3. Use bulk update to update all sections at once
//       const result = await this.updateMultipleSections(userId, sections)
      
//       console.log(`✅ Email updated in ALL sections for user: ${userId}`)
//       return result

//     } catch (error) {
//       console.error('Error updating email across sections:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get all sections that contain email address
//    * Useful for debugging and checking consistency
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise<Object>} Object with section names and their email values
//    */
//   async getEmailOccurrences(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       const profile = await this.getWorkerProfile(userId)
//       if (!profile.success || !profile.data) {
//         return { success: false, message: 'Profile not found' }
//       }

//       const data = profile.data
//       const occurrences = {}

//       // Check all sections for email
//       const sectionsToCheck = [
//         'basics', 
//         'trade', 
//         'workHistory', 
//         'availability', 
//         'emergency', 
//         'certifications', 
//         'tax', 
//         'payment', 
//         'medical', 
//         'wizard'
//       ]

//       sectionsToCheck.forEach(section => {
//         if (data[section] && data[section].emailAddress) {
//           occurrences[section] = data[section].emailAddress
//         }
//       })

//       // Also check root level
//       if (data.emailAddress) {
//         occurrences.root = data.emailAddress
//       }

//       return {
//         success: true,
//         data: occurrences,
//         isConsistent: Object.values(occurrences).every(v => v === Object.values(occurrences)[0])
//       }

//     } catch (error) {
//       console.error('Error getting email occurrences:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Fix inconsistent email across sections
//    * @param {string} userId - Firebase UID of the worker
//    * @param {string} preferredEmail - The email to use as the source of truth
//    * @returns {Promise} Update response
//    */
//   async fixEmailInconsistencies(userId, preferredEmail = null) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       // Get all email occurrences
//       const occurrences = await this.getEmailOccurrences(userId)
//       if (!occurrences.success) {
//         throw new Error('Failed to get email occurrences')
//       }

//       // Determine which email to use
//       let emailToUse = preferredEmail
//       if (!emailToUse && occurrences.data.basics) {
//         emailToUse = occurrences.data.basics
//       } else if (!emailToUse) {
//         const values = Object.values(occurrences.data)
//         emailToUse = values.length > 0 ? values[0] : null
//       }

//       if (!emailToUse) {
//         throw new Error('No email found in profile')
//       }

//       console.log(`🔧 Fixing email inconsistencies for user: ${userId} using: ${emailToUse}`)

//       // Update email across all sections
//       const result = await this.updateEmailAcrossAllSections(userId, emailToUse)
      
//       console.log(`✅ Email inconsistencies fixed for user: ${userId}`)
//       return result

//     } catch (error) {
//       console.error('Error fixing email inconsistencies:', error)
//       throw error
//     }
//   }

//   /**
//    * ============================================================
//    * 🔄 WIZARD PROGRESS TRACKING (RESUME FEATURE)
//    * ============================================================
//    */

//   /**
//    * ✅ Get wizard progress
//    * Returns: { currentStep, nextStep, isComplete, steps: {...} }
//    */
//   async getWizardProgress(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       console.log(`📊 Getting wizard progress for user: ${userId}`)

//       const profile = await this.getWorkerProfile(userId)
      
//       if (!profile.success || !profile.data) {
//         return {
//           success: true,
//           data: {
//             currentStep: 1,
//             nextStep: 1,
//             isComplete: false,
//             steps: {},
//             wizard: null,
//             totalSteps: 6
//           }
//         }
//       }

//       const data = profile.data
//       const steps = {}
//       let currentStep = 1
//       let isComplete = false

//       const sections = ['basics', 'trade', 'workHistory', 'availability', 'emergency']
      
//       const stepData = {
//         1: data.basics,
//         2: data.trade,
//         3: data.trade,
//         4: data.workHistory,
//         5: data.availability,
//         6: data.emergency
//       }

//       sections.forEach((section, index) => {
//         const stepNum = index + 1
//         if (stepNum === 2 || stepNum === 3) {
//           const stepKey = `step${stepNum}`
//           if (data.trade && Object.keys(data.trade).length > 0) {
//             steps[stepKey] = data.trade
//           }
//         } else {
//           const stepKey = `step${stepNum}`
//           const sectionData = data[section]
//           if (sectionData && Object.keys(sectionData).length > 0) {
//             steps[stepKey] = sectionData
//           }
//         }
//       })

//       const completedSteps = Object.keys(steps).length
//       if (completedSteps > 0) {
//         const stepNumbers = Object.keys(steps).map(Number).sort((a, b) => a - b)
//         currentStep = stepNumbers[stepNumbers.length - 1]
//       }

//       const wizard = data.wizard || {}
//       isComplete = wizard.completed || false
      
//       if (isComplete) {
//         const allStepsComplete = [1, 2, 3, 4, 5, 6].every((stepNum) => {
//           const stepKey = `step${stepNum}`
//           return steps[stepKey] && Object.keys(steps[stepKey]).length > 0
//         })
//         if (!allStepsComplete) {
//           isComplete = false
//         }
//       }

//       let nextStep = 1
//       for (let i = 1; i <= 6; i++) {
//         const stepKey = `step${i}`
//         if (!steps[stepKey] || Object.keys(steps[stepKey]).length === 0) {
//           nextStep = i
//           break
//         }
//       }

//       if (isComplete) {
//         nextStep = 0
//       }

//       console.log(`✅ Wizard progress: currentStep=${currentStep}, nextStep=${nextStep}, isComplete=${isComplete}`)

//       return {
//         success: true,
//         data: {
//           currentStep,
//           nextStep,
//           isComplete,
//           steps,
//           wizard,
//           totalSteps: 6
//         }
//       }

//     } catch (error) {
//       console.error('Error getting wizard progress:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Update wizard progress (called after each step save)
//    * @param {string} userId - Firebase UID of the worker
//    * @param {number} stepNumber - Current step number (1-6)
//    * @param {boolean} completed - Whether wizard is complete
//    * @returns {Promise} Update response
//    */
//   async updateWizardProgress(userId, stepNumber, completed = false) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!stepNumber || stepNumber < 1 || stepNumber > 6) {
//         throw new Error('Valid step number (1-6) is required')
//       }

//       console.log(`📝 Updating wizard progress: step=${stepNumber}, completed=${completed}`)

//       const wizardData = {
//         currentStep: stepNumber,
//         lastUpdatedAt: new Date().toISOString()
//       }

//       if (completed) {
//         wizardData.completed = true
//         wizardData.completedAt = new Date().toISOString()
//       }

//       const profile = await this.getWorkerProfile(userId)
//       if (profile.success && profile.data?.wizard?.startedAt) {
//         wizardData.startedAt = profile.data.wizard.startedAt
//       } else {
//         wizardData.startedAt = new Date().toISOString()
//       }

//       return await this.updateSection(userId, 'wizard', wizardData)

//     } catch (error) {
//       console.error('Error updating wizard progress:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Check if wizard needs to resume
//    * Returns: { needsResume: true, step: 3, currentStep: 2, isComplete: false }
//    */
//   async checkWizardResume(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       const progress = await this.getWizardProgress(userId)
      
//       if (!progress.success) {
//         return { needsResume: false, step: 1 }
//       }

//       const { currentStep, nextStep, isComplete, steps } = progress.data

//       if (isComplete) {
//         return { 
//           needsResume: false, 
//           step: 0, 
//           isComplete: true,
//           message: 'Wizard is already complete'
//         }
//       }

//       if (currentStep === 1 && nextStep === 1) {
//         const hasStep1Data = Object.keys(steps).length > 0
//         if (!hasStep1Data) {
//           return { 
//             needsResume: false, 
//             step: 1,
//             message: 'No data found, starting fresh'
//           }
//         }
//       }

//       const resumeStep = nextStep || currentStep + 1
      
//       console.log(`🔄 Wizard resume: step=${resumeStep}, currentStep=${currentStep}, nextStep=${nextStep}`)

//       return {
//         needsResume: true,
//         step: resumeStep,
//         currentStep: currentStep,
//         isComplete: false,
//         data: steps,
//         message: `Resuming from step ${resumeStep}`
//       }

//     } catch (error) {
//       console.error('Error checking wizard resume:', error)
//       return { 
//         needsResume: false, 
//         step: 1,
//         error: error.message
//       }
//     }
//   }

//   /**
//    * ============================================================
//    * 🔍 SEARCH AND QUERY METHODS
//    * ============================================================
//    */

//   /**
//    * ✅ Get worker by email (for admin/search)
//    * @param {string} email - Worker's email address
//    * @returns {Promise} Worker data
//    */
//   async getWorkerByEmail(email) {
//     try {
//       if (!email) {
//         throw new Error('Email is required')
//       }

//       console.log(`📧 Looking for worker with email: ${email}`)
      
//       const response = await api.get(`/worker/email/${email}`)
      
//       if (response.data.success) {
//         console.log('✅ Worker found')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Worker not found')
//       }
//     } catch (error) {
//       console.error('Error fetching worker by email:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get all workers (with pagination)
//    * @param {number} limit - Number of workers to fetch
//    * @param {string} lastKey - Pagination key
//    * @returns {Promise} List of workers
//    */
//   async getAllWorkers(limit = 20, lastKey = null) {
//     try {
//       console.log(`📊 Fetching all workers (limit: ${limit})`)

//       const params = { limit }
//       if (lastKey) {
//         params.lastKey = lastKey
//       }

//       const response = await api.get('/worker/all', { params })
      
//       if (response.data.success) {
//         console.log(`✅ ${response.data.data?.length || 0} workers found`)
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to fetch workers')
//       }
//     } catch (error) {
//       console.error('Error fetching all workers:', error)
//       throw error
//     }
//   }

//   /**
//    * ============================================================
//    * 📦 SPECIFIC SECTION GETTERS
//    * ============================================================
//    */

//   /**
//    * ✅ Get worker availability (for matching)
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Availability data
//    */
//   async getWorkerAvailability(userId) {
//     try {
//       const response = await this.getWorkerProfile(userId)
//       if (response.success && response.data?.availability) {
//         return response.data.availability
//       }
//       return null
//     } catch (error) {
//       console.error('Error fetching availability:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get worker trade skills (for matching)
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Trade data
//    */
//   async getWorkerTrade(userId) {
//     try {
//       const response = await this.getWorkerProfile(userId)
//       if (response.success && response.data?.trade) {
//         return response.data.trade
//       }
//       return null
//     } catch (error) {
//       console.error('Error fetching trade skills:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get worker certifications
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Certification data
//    */
//   async getWorkerCertifications(userId) {
//     try {
//       const response = await this.getWorkerProfile(userId)
//       if (response.success && response.data?.certifications) {
//         return response.data.certifications
//       }
//       return null
//     } catch (error) {
//       console.error('Error fetching certifications:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get worker work history
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Work history data
//    */
//   async getWorkerWorkHistory(userId) {
//     try {
//       const response = await this.getWorkerProfile(userId)
//       if (response.success && response.data?.workHistory) {
//         return response.data.workHistory
//       }
//       return null
//     } catch (error) {
//       console.error('Error fetching work history:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get worker tax profile
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Tax data
//    */
//   async getWorkerTax(userId) {
//     try {
//       const response = await this.getWorkerProfile(userId)
//       if (response.success && response.data?.tax) {
//         return response.data.tax
//       }
//       return null
//     } catch (error) {
//       console.error('Error fetching tax data:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get worker payment details
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Payment data
//    */
//   async getWorkerPayment(userId) {
//     try {
//       const response = await this.getWorkerProfile(userId)
//       if (response.success && response.data?.payment) {
//         return response.data.payment
//       }
//       return null
//     } catch (error) {
//       console.error('Error fetching payment data:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get worker medical details
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Medical data
//    */
//   async getWorkerMedical(userId) {
//     try {
//       const response = await this.getWorkerProfile(userId)
//       if (response.success && response.data?.medical) {
//         return response.data.medical
//       }
//       return null
//     } catch (error) {
//       console.error('Error fetching medical data:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get worker emergency contact
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Emergency contact data
//    */
//   async getWorkerEmergency(userId) {
//     try {
//       const response = await this.getWorkerProfile(userId)
//       if (response.success && response.data?.emergency) {
//         return response.data.emergency
//       }
//       return null
//     } catch (error) {
//       console.error('Error fetching emergency contact:', error)
//       throw error
//     }
//   }

//   /**
//    * ============================================================
//    * 🏥 HELPER METHODS
//    * ============================================================
//    */

//   /**
//    * ✅ Check if user has completed all required sections
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise<boolean>} True if profile is complete
//    */
//   async isProfileComplete(userId) {
//     try {
//       const progress = await this.getWizardProgress(userId)
//       return progress.success && progress.data.isComplete
//     } catch (error) {
//       console.error('Error checking profile completeness:', error)
//       return false
//     }
//   }

//   /**
//    * ✅ Get profile completion percentage
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise<number>} Percentage (0-100)
//    */
//   async getProfileCompletion(userId) {
//     try {
//       const progress = await this.getWizardProgress(userId)
//       if (!progress.success) return 0

//       const { steps, totalSteps } = progress.data
//       const completedSteps = Object.keys(steps).length
      
//       return Math.round((completedSteps / totalSteps) * 100)
//     } catch (error) {
//       console.error('Error calculating profile completion:', error)
//       return 0
//     }
//   }

//   /**
//    * ============================================================
//    * 📋 BULK OPERATIONS
//    * ============================================================
//    */

//   /**
//    * ✅ Update multiple sections at once
//    * @param {string} userId - Firebase UID of the worker
//    * @param {object} sections - Object with section names as keys
//    * @returns {Promise} Update responses
//    */
//   async updateMultipleSections(userId, sections) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!sections || typeof sections !== 'object') throw new Error('Sections object is required')

//       console.log(`📝 Updating multiple sections for user: ${userId}`)

//       const results = {}
//       const promises = []

//       Object.keys(sections).forEach(section => {
//         const data = sections[section]
//         promises.push(
//           this.updateSection(userId, section, data)
//             .then(result => {
//               results[section] = { success: true, data: result }
//             })
//             .catch(error => {
//               results[section] = { success: false, error: error.message }
//             })
//         )
//       })

//       await Promise.all(promises)

//       return {
//         success: true,
//         results
//       }
//     } catch (error) {
//       console.error('Error updating multiple sections:', error)
//       throw error
//     }
//   }

//   /**
//    * ============================================================
//    * 📊 WIZARD STEP TO SECTION MAPPING
//    * ============================================================
//    */

//   /**
//    * ✅ Get section name for a wizard step
//    * @param {number} stepNumber - Wizard step number (1-6)
//    * @returns {string} Section name
//    */
//   getSectionForStep(stepNumber) {
//     const sectionMap = {
//       1: 'basics',
//       2: 'trade',
//       3: 'trade',
//       4: 'workHistory',
//       5: 'availability',
//       6: 'emergency'
//     }
//     return sectionMap[stepNumber] || null
//   }

//   /**
//    * ✅ Get step numbers for a section
//    * @param {string} section - Section name
//    * @returns {number[]} Array of step numbers
//    */
//   getStepsForSection(section) {
//     const stepMap = {
//       'basics': [1],
//       'trade': [2, 3],
//       'workHistory': [4],
//       'availability': [5],
//       'emergency': [6]
//     }
//     return stepMap[section] || []
//   }

//   /**
//    * ✅ Check if a step is complete
//    * @param {string} userId - Firebase UID of the worker
//    * @param {number} stepNumber - Wizard step number (1-6)
//    * @returns {Promise<boolean>} True if step is complete
//    */
//   async isStepComplete(userId, stepNumber) {
//     try {
//       const progress = await this.getWizardProgress(userId)
//       if (!progress.success) return false

//       const stepKey = `step${stepNumber}`
//       const stepData = progress.data.steps[stepKey]
      
//       return stepData && Object.keys(stepData).length > 0
//     } catch (error) {
//       console.error(`Error checking step ${stepNumber} completion:`, error)
//       return false
//     }
//   }

//   /**
//    * ✅ Get all completed step numbers
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise<number[]>} Array of completed step numbers
//    */
//   async getCompletedSteps(userId) {
//     try {
//       const progress = await this.getWizardProgress(userId)
//       if (!progress.success) return []

//       const { steps } = progress.data
//       return Object.keys(steps)
//         .map(key => parseInt(key.replace('step', '')))
//         .filter(num => !isNaN(num))
//         .sort((a, b) => a - b)
//     } catch (error) {
//       console.error('Error getting completed steps:', error)
//       return []
//     }
//   }

//   /**
//    * ============================================================
//    * 🧹 CLEANUP AND MAINTENANCE
//    * ============================================================
//    */

//   /**
//    * ✅ Fix incomplete profile - restores missing fields from other sections
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Update response
//    */
//   async fixIncompleteProfile(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       console.log(`🔧 Fixing incomplete profile for user: ${userId}`)

//       // Get current profile
//       const profile = await this.getWorkerProfile(userId)
//       if (!profile.success || !profile.data) {
//         throw new Error('Profile not found')
//       }

//       const data = profile.data
//       const tradeData = data.trade || {}
//       const workHistoryData = data.workHistory || {}
//       const existingBasics = data.basics || {}

//       // Build complete basics from all available data
//       const completeBasics = {
//         emailAddress: existingBasics.emailAddress || tradeData.emailAddress || workHistoryData.emailAddress || '',
//         legalFirstName: existingBasics.legalFirstName || tradeData.legalFirstName || workHistoryData.legalFirstName || '',
//         legalLastName: existingBasics.legalLastName || tradeData.legalLastName || workHistoryData.legalLastName || '',
//         mobilePhone: existingBasics.mobilePhone || tradeData.mobilePhone || workHistoryData.mobilePhone || '',
//         dob: existingBasics.dob || tradeData.dob || workHistoryData.dob || '',
//         addressLine1: existingBasics.addressLine1 || tradeData.addressLine1 || workHistoryData.addressLine1 || '',
//         addressLine2: existingBasics.addressLine2 || tradeData.addressLine2 || workHistoryData.addressLine2 || '',
//         city: existingBasics.city || tradeData.city || workHistoryData.city || '',
//         stateCode: existingBasics.stateCode || tradeData.stateCode || workHistoryData.stateCode || '',
//         zip: existingBasics.zip || tradeData.zip || workHistoryData.zip || '',
//         currentAddressLine1: existingBasics.currentAddressLine1 || tradeData.currentAddressLine1 || workHistoryData.currentAddressLine1 || '',
//         currentAddressLine2: existingBasics.currentAddressLine2 || tradeData.currentAddressLine2 || workHistoryData.currentAddressLine2 || '',
//         currentCity: existingBasics.currentCity || tradeData.currentCity || workHistoryData.currentCity || '',
//         currentStateCode: existingBasics.currentStateCode || tradeData.currentStateCode || workHistoryData.currentStateCode || '',
//         currentZip: existingBasics.currentZip || tradeData.currentZip || workHistoryData.currentZip || '',
//         english: existingBasics.english !== undefined ? existingBasics.english : (tradeData.english || false),
//         spanish: existingBasics.spanish !== undefined ? existingBasics.spanish : (tradeData.spanish || false),
//         englishSpanish: existingBasics.englishSpanish !== undefined ? existingBasics.englishSpanish : (tradeData.englishSpanish || false),
//         sameAsAddress: existingBasics.sameAsAddress !== undefined ? existingBasics.sameAsAddress : (tradeData.sameAsAddress || false),
//         acceptTerms: existingBasics.acceptTerms !== undefined ? existingBasics.acceptTerms : (tradeData.acceptTerms || false),
//         acceptPrivacy: existingBasics.acceptPrivacy !== undefined ? existingBasics.acceptPrivacy : (tradeData.acceptPrivacy || false),
//         consentElectronic: existingBasics.consentElectronic !== undefined ? existingBasics.consentElectronic : (tradeData.consentElectronic || false),
//         certifyAccurate: existingBasics.certifyAccurate !== undefined ? existingBasics.certifyAccurate : (tradeData.certifyAccurate || false),
//         profilePreview: existingBasics.profilePreview || tradeData.profilePreview || workHistoryData.profilePreview || '',
//         profileImageKey: existingBasics.profileImageKey || tradeData.profileImageKey || workHistoryData.profileImageKey || '',
//         profileImageUrl: existingBasics.profileImageUrl || tradeData.profileImageUrl || workHistoryData.profileImageUrl || '',
//       }

//       console.log('📝 Complete basics to save:', JSON.stringify(completeBasics, null, 2))

//       // Save the complete basics
//       const result = await this.updateSection(userId, 'basics', completeBasics)
      
//       console.log(`✅ Profile fixed for user: ${userId}`)
//       return result

//     } catch (error) {
//       console.error('Error fixing incomplete profile:', error)
//       throw error
//     }
//   }
// }

// // Export singleton instance
// export default new WorkerService()




// src/worker/services/workerService.js
import api from '../../services/api'
import { setUserLanguage, changeLanguage, getStoredLanguage } from '../../i18n/config'

class WorkerService {
  /**
   * ============================================================
   * 📊 PROFILE CRUD OPERATIONS
   * ============================================================
   */

  /**
   * ✅ Get complete worker profile from Workers Table
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Profile data from Workers Table
   */
  async getWorkerProfile(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      console.log(`📊 Fetching profile for user: ${userId}`)
      
      const response = await api.get(`/worker/profile/${userId}`)
      
      if (response.data.success) {
        console.log('✅ Profile fetched successfully')
        
        // ✅ Sync language from profile if available
        const language = response.data.data?.basics?.language
        if (language) {
          const currentLang = getStoredLanguage()
          if (language !== currentLang) {
            console.log(`🔄 Syncing language from profile: ${language}`)
            setUserLanguage(language)
            changeLanguage(language)
          }
        }
        
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to fetch profile')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
      throw error
    }
  }

  /**
   * ✅ Create new worker profile (after registration)
   * @param {string} userId - Firebase UID of the worker
   * @param {object} profile - Initial profile data
   * @returns {Promise} Creation response
   */
  async createWorkerProfile(userId, profile) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!profile) throw new Error('Profile data is required')

      console.log(`📝 Creating profile for user: ${userId}`)

      const response = await api.post('/worker/profile', {
        userId,
        profile
      })

      if (response.data.success) {
        console.log('✅ Profile created successfully')
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to create profile')
      }
    } catch (error) {
      console.error('Error creating profile:', error)
      throw error
    }
  }

  /**
   * ✅ Update a specific section of worker profile (CRITICAL METHOD)
   * Used by ALL edit pages and wizard steps
   * @param {string} userId - Firebase UID of the worker
   * @param {string} section - Section name (basics, trade, workHistory, etc.)
   * @param {object} data - Updated data for the section
   * @returns {Promise} Update response
   */
  async updateSection(userId, section, data) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!section) throw new Error('Section name is required')
      if (!data) throw new Error('Data is required')

      console.log(`📝 Updating ${section} for user: ${userId}`)
      
      const response = await api.patch(`/worker/profile/${userId}/section/${section}`, {
        section,
        data
      })
      
      if (response.data.success) {
        console.log(`✅ ${section} updated successfully`)
        
        // ✅ If section is basics and contains language, update localStorage
        if (section === 'basics' && data.language) {
          const currentLang = getStoredLanguage()
          if (data.language !== currentLang) {
            console.log(`🔄 Language updated in profile: ${data.language}`)
            setUserLanguage(data.language)
            changeLanguage(data.language)
          }
        }
        
        return response.data
      } else {
        throw new Error(response.data.message || `Failed to update ${section}`)
      }
    } catch (error) {
      console.error(`Error updating ${section}:`, error)
      throw error
    }
  }

  /**
   * ✅ Update entire worker profile (PUT - full replace)
   * ⚠️ DEPRECATED: Use updateSection instead
   */
  async updateWorkerProfile(userId, section, data) {
    console.warn('⚠️ updateWorkerProfile is deprecated, use updateSection instead')
    return this.updateSection(userId, section, data)
  }

  /**
   * ✅ Delete worker profile
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Delete response
   */
  async deleteWorkerProfile(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      console.log(`🗑️ Deleting profile for user: ${userId}`)

      const response = await api.delete(`/worker/profile/${userId}`)

      if (response.data.success) {
        console.log('✅ Profile deleted successfully')
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to delete profile')
      }
    } catch (error) {
      console.error('Error deleting profile:', error)
      throw error
    }
  }

  /**
   * ✅ Check if worker profile exists
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise<boolean>} True if profile exists
   */
  async profileExists(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      return response.success && response.data !== null
    } catch (error) {
      if (error.response && error.response.status === 404) {
        return false
      }
      throw error
    }
  }

  /**
   * ============================================================
   * 📝 CONVENIENCE METHODS - WIZARD STEPS
   * These map directly to wizard steps
   * ============================================================
   */

  /**
   * ✅ Update basics (Wizard Step 1)
   * IMPORTANT: Always merges with existing data to preserve all fields
   * Also updates email across ALL sections if email is being changed
   */
  async updateBasics(userId, data) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!data) throw new Error('Data is required')

      console.log(`📝 Updating basics for user: ${userId}`)
      console.log('📝 Data received:', JSON.stringify(data, null, 2))

      // ✅ CRITICAL: Get current profile to merge data
      const currentProfile = await this.getWorkerProfile(userId)
      const existingBasics = currentProfile.success && currentProfile.data?.basics 
        ? currentProfile.data.basics 
        : {}

      // ✅ Merge existing basics with new data (new data takes precedence)
      const mergedBasics = {
        ...existingBasics,
        ...data
      }

      console.log('📝 Merged basics:', JSON.stringify(mergedBasics, null, 2))

      // ✅ Save language if present
      if (data.language) {
        setUserLanguage(data.language)
        changeLanguage(data.language)
      }

      // If email is being updated, update it across ALL sections
      if (data.emailAddress) {
        console.log(`📧 Email change detected, updating across ALL sections`)
        return this.updateEmailAcrossAllSections(userId, data.emailAddress, mergedBasics)
      }

      // If no email change, just update basics section with merged data
      return this.updateSection(userId, 'basics', mergedBasics)

    } catch (error) {
      console.error('Error updating basics:', error)
      throw error
    }
  }

  /**
   * ✅ Update trade profile (Wizard Step 2 & 3 - both go to trade section)
   * Step 2: Trade Profile & Skill Matrix
   * Step 3: Tools, Certifications & Requirements
   */
  async updateTrade(userId, data) {
    return this.updateSection(userId, 'trade', data)
  }

  /**
   * ✅ Update work history (Wizard Step 4)
   */
  async updateWorkHistory(userId, data) {
    return this.updateSection(userId, 'workHistory', data)
  }

  /**
   * ✅ Update availability (Wizard Step 5)
   */
  async updateAvailability(userId, data) {
    return this.updateSection(userId, 'availability', data)
  }

  /**
   * ✅ Update emergency contact (Wizard Step 6)
   */
  async updateEmergency(userId, data) {
    return this.updateSection(userId, 'emergency', data)
  }

  /**
   * ============================================================
   * 📝 CONVENIENCE METHODS - STANDALONE EDIT PAGES
   * These are NOT part of wizard but separate sections
   * ============================================================
   */

  /**
   * ✅ Update certifications
   */
  async updateCertifications(userId, data) {
    return this.updateSection(userId, 'certifications', data)
  }

  /**
   * ✅ Update tax profile
   */
  async updateTax(userId, data) {
    return this.updateSection(userId, 'tax', data)
  }

  /**
   * ✅ Update payment/bank details
   */
  async updatePayment(userId, data) {
    return this.updateSection(userId, 'payment', data)
  }

  /**
   * ✅ Update medical details
   */
  async updateMedical(userId, data) {
    return this.updateSection(userId, 'medical', data)
  }

  /**
   * ============================================================
   * 📧 EMAIL MANAGEMENT - NEW METHODS
   * ============================================================
   */

  /**
   * ✅ Update email across ALL sections of the profile
   * IMPORTANT: Preserves all existing data in each section
   * @param {string} userId - Firebase UID of the worker
   * @param {string} newEmail - New email address
   * @param {object} additionalData - Additional data to update in basics (optional)
   * @returns {Promise} Update response
   */
  async updateEmailAcrossAllSections(userId, newEmail, additionalData = {}) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!newEmail) throw new Error('New email is required')

      console.log(`📧 Updating email across ALL sections for user: ${userId} to: ${newEmail}`)

      // Get current profile
      const profile = await this.getWorkerProfile(userId)
      if (!profile.success || !profile.data) {
        throw new Error('Profile not found')
      }

      const data = profile.data
      const sections = {}

      // 1. Update basics - MERGE with existing data
      const existingBasics = data.basics || {}
      sections.basics = {
        ...existingBasics,        // Keep all existing fields
        ...additionalData,        // Add/override with additional data
        emailAddress: newEmail    // Ensure email is updated
      }

      console.log('📝 Updated basics with email:', JSON.stringify(sections.basics, null, 2))

      // 2. Update email in ALL sections that have email field
      const sectionsWithEmail = [
        'trade', 
        'workHistory', 
        'availability', 
        'emergency', 
        'certifications', 
        'tax', 
        'payment', 
        'medical', 
        'wizard'
      ]

      sectionsWithEmail.forEach(section => {
        if (data[section]) {
          sections[section] = {
            ...data[section],      // Keep all existing fields
            emailAddress: newEmail // Update email
          }
        }
      })

      // 3. Use bulk update to update all sections at once
      const result = await this.updateMultipleSections(userId, sections)
      
      console.log(`✅ Email updated in ALL sections for user: ${userId}`)
      return result

    } catch (error) {
      console.error('Error updating email across sections:', error)
      throw error
    }
  }

  /**
   * ✅ Get all sections that contain email address
   * Useful for debugging and checking consistency
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise<Object>} Object with section names and their email values
   */
  async getEmailOccurrences(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      const profile = await this.getWorkerProfile(userId)
      if (!profile.success || !profile.data) {
        return { success: false, message: 'Profile not found' }
      }

      const data = profile.data
      const occurrences = {}

      // Check all sections for email
      const sectionsToCheck = [
        'basics', 
        'trade', 
        'workHistory', 
        'availability', 
        'emergency', 
        'certifications', 
        'tax', 
        'payment', 
        'medical', 
        'wizard'
      ]

      sectionsToCheck.forEach(section => {
        if (data[section] && data[section].emailAddress) {
          occurrences[section] = data[section].emailAddress
        }
      })

      // Also check root level
      if (data.emailAddress) {
        occurrences.root = data.emailAddress
      }

      return {
        success: true,
        data: occurrences,
        isConsistent: Object.values(occurrences).every(v => v === Object.values(occurrences)[0])
      }

    } catch (error) {
      console.error('Error getting email occurrences:', error)
      throw error
    }
  }

  /**
   * ✅ Fix inconsistent email across sections
   * @param {string} userId - Firebase UID of the worker
   * @param {string} preferredEmail - The email to use as the source of truth
   * @returns {Promise} Update response
   */
  async fixEmailInconsistencies(userId, preferredEmail = null) {
    try {
      if (!userId) throw new Error('User ID is required')

      // Get all email occurrences
      const occurrences = await this.getEmailOccurrences(userId)
      if (!occurrences.success) {
        throw new Error('Failed to get email occurrences')
      }

      // Determine which email to use
      let emailToUse = preferredEmail
      if (!emailToUse && occurrences.data.basics) {
        emailToUse = occurrences.data.basics
      } else if (!emailToUse) {
        const values = Object.values(occurrences.data)
        emailToUse = values.length > 0 ? values[0] : null
      }

      if (!emailToUse) {
        throw new Error('No email found in profile')
      }

      console.log(`🔧 Fixing email inconsistencies for user: ${userId} using: ${emailToUse}`)

      // Update email across all sections
      const result = await this.updateEmailAcrossAllSections(userId, emailToUse)
      
      console.log(`✅ Email inconsistencies fixed for user: ${userId}`)
      return result

    } catch (error) {
      console.error('Error fixing email inconsistencies:', error)
      throw error
    }
  }

  /**
   * ============================================================
   * 🔄 WIZARD PROGRESS TRACKING (RESUME FEATURE)
   * ============================================================
   */

  /**
   * ✅ Get wizard progress
   * Returns: { currentStep, nextStep, isComplete, steps: {...} }
   */
  async getWizardProgress(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      console.log(`📊 Getting wizard progress for user: ${userId}`)

      const profile = await this.getWorkerProfile(userId)
      
      if (!profile.success || !profile.data) {
        return {
          success: true,
          data: {
            currentStep: 1,
            nextStep: 1,
            isComplete: false,
            steps: {},
            wizard: null,
            totalSteps: 6
          }
        }
      }

      const data = profile.data
      const steps = {}
      let currentStep = 1
      let isComplete = false

      const sections = ['basics', 'trade', 'workHistory', 'availability', 'emergency']
      
      const stepData = {
        1: data.basics,
        2: data.trade,
        3: data.trade,
        4: data.workHistory,
        5: data.availability,
        6: data.emergency
      }

      sections.forEach((section, index) => {
        const stepNum = index + 1
        if (stepNum === 2 || stepNum === 3) {
          const stepKey = `step${stepNum}`
          if (data.trade && Object.keys(data.trade).length > 0) {
            steps[stepKey] = data.trade
          }
        } else {
          const stepKey = `step${stepNum}`
          const sectionData = data[section]
          if (sectionData && Object.keys(sectionData).length > 0) {
            steps[stepKey] = sectionData
          }
        }
      })

      const completedSteps = Object.keys(steps).length
      if (completedSteps > 0) {
        const stepNumbers = Object.keys(steps).map(Number).sort((a, b) => a - b)
        currentStep = stepNumbers[stepNumbers.length - 1]
      }

      const wizard = data.wizard || {}
      isComplete = wizard.completed || false
      
      if (isComplete) {
        const allStepsComplete = [1, 2, 3, 4, 5, 6].every((stepNum) => {
          const stepKey = `step${stepNum}`
          return steps[stepKey] && Object.keys(steps[stepKey]).length > 0
        })
        if (!allStepsComplete) {
          isComplete = false
        }
      }

      let nextStep = 1
      for (let i = 1; i <= 6; i++) {
        const stepKey = `step${i}`
        if (!steps[stepKey] || Object.keys(steps[stepKey]).length === 0) {
          nextStep = i
          break
        }
      }

      if (isComplete) {
        nextStep = 0
      }

      console.log(`✅ Wizard progress: currentStep=${currentStep}, nextStep=${nextStep}, isComplete=${isComplete}`)

      return {
        success: true,
        data: {
          currentStep,
          nextStep,
          isComplete,
          steps,
          wizard,
          totalSteps: 6
        }
      }

    } catch (error) {
      console.error('Error getting wizard progress:', error)
      throw error
    }
  }

  /**
   * ✅ Update wizard progress (called after each step save)
   * @param {string} userId - Firebase UID of the worker
   * @param {number} stepNumber - Current step number (1-6)
   * @param {boolean} completed - Whether wizard is complete
   * @returns {Promise} Update response
   */
  async updateWizardProgress(userId, stepNumber, completed = false) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!stepNumber || stepNumber < 1 || stepNumber > 6) {
        throw new Error('Valid step number (1-6) is required')
      }

      console.log(`📝 Updating wizard progress: step=${stepNumber}, completed=${completed}`)

      const wizardData = {
        currentStep: stepNumber,
        lastUpdatedAt: new Date().toISOString()
      }

      if (completed) {
        wizardData.completed = true
        wizardData.completedAt = new Date().toISOString()
      }

      const profile = await this.getWorkerProfile(userId)
      if (profile.success && profile.data?.wizard?.startedAt) {
        wizardData.startedAt = profile.data.wizard.startedAt
      } else {
        wizardData.startedAt = new Date().toISOString()
      }

      return await this.updateSection(userId, 'wizard', wizardData)

    } catch (error) {
      console.error('Error updating wizard progress:', error)
      throw error
    }
  }

  /**
   * ✅ Check if wizard needs to resume
   * Returns: { needsResume: true, step: 3, currentStep: 2, isComplete: false }
   */
  async checkWizardResume(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      const progress = await this.getWizardProgress(userId)
      
      if (!progress.success) {
        return { needsResume: false, step: 1 }
      }

      const { currentStep, nextStep, isComplete, steps } = progress.data

      if (isComplete) {
        return { 
          needsResume: false, 
          step: 0, 
          isComplete: true,
          message: 'Wizard is already complete'
        }
      }

      if (currentStep === 1 && nextStep === 1) {
        const hasStep1Data = Object.keys(steps).length > 0
        if (!hasStep1Data) {
          return { 
            needsResume: false, 
            step: 1,
            message: 'No data found, starting fresh'
          }
        }
      }

      const resumeStep = nextStep || currentStep + 1
      
      console.log(`🔄 Wizard resume: step=${resumeStep}, currentStep=${currentStep}, nextStep=${nextStep}`)

      return {
        needsResume: true,
        step: resumeStep,
        currentStep: currentStep,
        isComplete: false,
        data: steps,
        message: `Resuming from step ${resumeStep}`
      }

    } catch (error) {
      console.error('Error checking wizard resume:', error)
      return { 
        needsResume: false, 
        step: 1,
        error: error.message
      }
    }
  }

  /**
   * ============================================================
   * 🔍 SEARCH AND QUERY METHODS
   * ============================================================
   */

  /**
   * ✅ Get worker by email (for admin/search)
   * @param {string} email - Worker's email address
   * @returns {Promise} Worker data
   */
  async getWorkerByEmail(email) {
    try {
      if (!email) {
        throw new Error('Email is required')
      }

      console.log(`📧 Looking for worker with email: ${email}`)
      
      const response = await api.get(`/worker/email/${email}`)
      
      if (response.data.success) {
        console.log('✅ Worker found')
        return response.data
      } else {
        throw new Error(response.data.message || 'Worker not found')
      }
    } catch (error) {
      console.error('Error fetching worker by email:', error)
      throw error
    }
  }

  /**
   * ✅ Get all workers (with pagination)
   * @param {number} limit - Number of workers to fetch
   * @param {string} lastKey - Pagination key
   * @returns {Promise} List of workers
   */
  async getAllWorkers(limit = 20, lastKey = null) {
    try {
      console.log(`📊 Fetching all workers (limit: ${limit})`)

      const params = { limit }
      if (lastKey) {
        params.lastKey = lastKey
      }

      const response = await api.get('/worker/all', { params })
      
      if (response.data.success) {
        console.log(`✅ ${response.data.data?.length || 0} workers found`)
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to fetch workers')
      }
    } catch (error) {
      console.error('Error fetching all workers:', error)
      throw error
    }
  }

  /**
   * ============================================================
   * 📦 SPECIFIC SECTION GETTERS
   * ============================================================
   */

  /**
   * ✅ Get worker availability (for matching)
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Availability data
   */
  async getWorkerAvailability(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      if (response.success && response.data?.availability) {
        return response.data.availability
      }
      return null
    } catch (error) {
      console.error('Error fetching availability:', error)
      throw error
    }
  }

  /**
   * ✅ Get worker trade skills (for matching)
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Trade data
   */
  async getWorkerTrade(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      if (response.success && response.data?.trade) {
        return response.data.trade
      }
      return null
    } catch (error) {
      console.error('Error fetching trade skills:', error)
      throw error
    }
  }

  /**
   * ✅ Get worker certifications
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Certification data
   */
  async getWorkerCertifications(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      if (response.success && response.data?.certifications) {
        return response.data.certifications
      }
      return null
    } catch (error) {
      console.error('Error fetching certifications:', error)
      throw error
    }
  }

  /**
   * ✅ Get worker work history
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Work history data
   */
  async getWorkerWorkHistory(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      if (response.success && response.data?.workHistory) {
        return response.data.workHistory
      }
      return null
    } catch (error) {
      console.error('Error fetching work history:', error)
      throw error
    }
  }

  /**
   * ✅ Get worker tax profile
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Tax data
   */
  async getWorkerTax(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      if (response.success && response.data?.tax) {
        return response.data.tax
      }
      return null
    } catch (error) {
      console.error('Error fetching tax data:', error)
      throw error
    }
  }

  /**
   * ✅ Get worker payment details
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Payment data
   */
  async getWorkerPayment(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      if (response.success && response.data?.payment) {
        return response.data.payment
      }
      return null
    } catch (error) {
      console.error('Error fetching payment data:', error)
      throw error
    }
  }

  /**
   * ✅ Get worker medical details
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Medical data
   */
  async getWorkerMedical(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      if (response.success && response.data?.medical) {
        return response.data.medical
      }
      return null
    } catch (error) {
      console.error('Error fetching medical data:', error)
      throw error
    }
  }

  /**
   * ✅ Get worker emergency contact
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Emergency contact data
   */
  async getWorkerEmergency(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      if (response.success && response.data?.emergency) {
        return response.data.emergency
      }
      return null
    } catch (error) {
      console.error('Error fetching emergency contact:', error)
      throw error
    }
  }

  /**
   * ============================================================
   * 🏥 HELPER METHODS
   * ============================================================
   */

  /**
   * ✅ Check if user has completed all required sections
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise<boolean>} True if profile is complete
   */
  async isProfileComplete(userId) {
    try {
      const progress = await this.getWizardProgress(userId)
      return progress.success && progress.data.isComplete
    } catch (error) {
      console.error('Error checking profile completeness:', error)
      return false
    }
  }

  /**
   * ✅ Get profile completion percentage
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise<number>} Percentage (0-100)
   */
  async getProfileCompletion(userId) {
    try {
      const progress = await this.getWizardProgress(userId)
      if (!progress.success) return 0

      const { steps, totalSteps } = progress.data
      const completedSteps = Object.keys(steps).length
      
      return Math.round((completedSteps / totalSteps) * 100)
    } catch (error) {
      console.error('Error calculating profile completion:', error)
      return 0
    }
  }

  /**
   * ============================================================
   * 📋 BULK OPERATIONS
   * ============================================================
   */

  /**
   * ✅ Update multiple sections at once
   * @param {string} userId - Firebase UID of the worker
   * @param {object} sections - Object with section names as keys
   * @returns {Promise} Update responses
   */
  async updateMultipleSections(userId, sections) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!sections || typeof sections !== 'object') throw new Error('Sections object is required')

      console.log(`📝 Updating multiple sections for user: ${userId}`)

      const results = {}
      const promises = []

      Object.keys(sections).forEach(section => {
        const data = sections[section]
        promises.push(
          this.updateSection(userId, section, data)
            .then(result => {
              results[section] = { success: true, data: result }
            })
            .catch(error => {
              results[section] = { success: false, error: error.message }
            })
        )
      })

      await Promise.all(promises)

      return {
        success: true,
        results
      }
    } catch (error) {
      console.error('Error updating multiple sections:', error)
      throw error
    }
  }

  /**
   * ============================================================
   * 📊 WIZARD STEP TO SECTION MAPPING
   * ============================================================
   */

  /**
   * ✅ Get section name for a wizard step
   * @param {number} stepNumber - Wizard step number (1-6)
   * @returns {string} Section name
   */
  getSectionForStep(stepNumber) {
    const sectionMap = {
      1: 'basics',
      2: 'trade',
      3: 'trade',
      4: 'workHistory',
      5: 'availability',
      6: 'emergency'
    }
    return sectionMap[stepNumber] || null
  }

  /**
   * ✅ Get step numbers for a section
   * @param {string} section - Section name
   * @returns {number[]} Array of step numbers
   */
  getStepsForSection(section) {
    const stepMap = {
      'basics': [1],
      'trade': [2, 3],
      'workHistory': [4],
      'availability': [5],
      'emergency': [6]
    }
    return stepMap[section] || []
  }

  /**
   * ✅ Check if a step is complete
   * @param {string} userId - Firebase UID of the worker
   * @param {number} stepNumber - Wizard step number (1-6)
   * @returns {Promise<boolean>} True if step is complete
   */
  async isStepComplete(userId, stepNumber) {
    try {
      const progress = await this.getWizardProgress(userId)
      if (!progress.success) return false

      const stepKey = `step${stepNumber}`
      const stepData = progress.data.steps[stepKey]
      
      return stepData && Object.keys(stepData).length > 0
    } catch (error) {
      console.error(`Error checking step ${stepNumber} completion:`, error)
      return false
    }
  }

  /**
   * ✅ Get all completed step numbers
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise<number[]>} Array of completed step numbers
   */
  async getCompletedSteps(userId) {
    try {
      const progress = await this.getWizardProgress(userId)
      if (!progress.success) return []

      const { steps } = progress.data
      return Object.keys(steps)
        .map(key => parseInt(key.replace('step', '')))
        .filter(num => !isNaN(num))
        .sort((a, b) => a - b)
    } catch (error) {
      console.error('Error getting completed steps:', error)
      return []
    }
  }

  /**
   * ============================================================
   * 🧹 CLEANUP AND MAINTENANCE
   * ============================================================
   */

  /**
   * ✅ Fix incomplete profile - restores missing fields from other sections
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Update response
   */
  async fixIncompleteProfile(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      console.log(`🔧 Fixing incomplete profile for user: ${userId}`)

      // Get current profile
      const profile = await this.getWorkerProfile(userId)
      if (!profile.success || !profile.data) {
        throw new Error('Profile not found')
      }

      const data = profile.data
      const tradeData = data.trade || {}
      const workHistoryData = data.workHistory || {}
      const existingBasics = data.basics || {}

      // Build complete basics from all available data
      const completeBasics = {
        emailAddress: existingBasics.emailAddress || tradeData.emailAddress || workHistoryData.emailAddress || '',
        legalFirstName: existingBasics.legalFirstName || tradeData.legalFirstName || workHistoryData.legalFirstName || '',
        legalLastName: existingBasics.legalLastName || tradeData.legalLastName || workHistoryData.legalLastName || '',
        mobilePhone: existingBasics.mobilePhone || tradeData.mobilePhone || workHistoryData.mobilePhone || '',
        dob: existingBasics.dob || tradeData.dob || workHistoryData.dob || '',
        addressLine1: existingBasics.addressLine1 || tradeData.addressLine1 || workHistoryData.addressLine1 || '',
        addressLine2: existingBasics.addressLine2 || tradeData.addressLine2 || workHistoryData.addressLine2 || '',
        city: existingBasics.city || tradeData.city || workHistoryData.city || '',
        stateCode: existingBasics.stateCode || tradeData.stateCode || workHistoryData.stateCode || '',
        zip: existingBasics.zip || tradeData.zip || workHistoryData.zip || '',
        currentAddressLine1: existingBasics.currentAddressLine1 || tradeData.currentAddressLine1 || workHistoryData.currentAddressLine1 || '',
        currentAddressLine2: existingBasics.currentAddressLine2 || tradeData.currentAddressLine2 || workHistoryData.currentAddressLine2 || '',
        currentCity: existingBasics.currentCity || tradeData.currentCity || workHistoryData.currentCity || '',
        currentStateCode: existingBasics.currentStateCode || tradeData.currentStateCode || workHistoryData.currentStateCode || '',
        currentZip: existingBasics.currentZip || tradeData.currentZip || workHistoryData.currentZip || '',
        english: existingBasics.english !== undefined ? existingBasics.english : (tradeData.english || false),
        spanish: existingBasics.spanish !== undefined ? existingBasics.spanish : (tradeData.spanish || false),
        englishSpanish: existingBasics.englishSpanish !== undefined ? existingBasics.englishSpanish : (tradeData.englishSpanish || false),
        sameAsAddress: existingBasics.sameAsAddress !== undefined ? existingBasics.sameAsAddress : (tradeData.sameAsAddress || false),
        acceptTerms: existingBasics.acceptTerms !== undefined ? existingBasics.acceptTerms : (tradeData.acceptTerms || false),
        acceptPrivacy: existingBasics.acceptPrivacy !== undefined ? existingBasics.acceptPrivacy : (tradeData.acceptPrivacy || false),
        consentElectronic: existingBasics.consentElectronic !== undefined ? existingBasics.consentElectronic : (tradeData.consentElectronic || false),
        certifyAccurate: existingBasics.certifyAccurate !== undefined ? existingBasics.certifyAccurate : (tradeData.certifyAccurate || false),
        profilePreview: existingBasics.profilePreview || tradeData.profilePreview || workHistoryData.profilePreview || '',
        profileImageKey: existingBasics.profileImageKey || tradeData.profileImageKey || workHistoryData.profileImageKey || '',
        profileImageUrl: existingBasics.profileImageUrl || tradeData.profileImageUrl || workHistoryData.profileImageUrl || '',
        language: existingBasics.language || tradeData.language || 'en' // ✅ Include language
      }

      console.log('📝 Complete basics to save:', JSON.stringify(completeBasics, null, 2))

      // ✅ Save language if present
      if (completeBasics.language) {
        setUserLanguage(completeBasics.language)
        changeLanguage(completeBasics.language)
      }

      // Save the complete basics
      const result = await this.updateSection(userId, 'basics', completeBasics)
      
      console.log(`✅ Profile fixed for user: ${userId}`)
      return result

    } catch (error) {
      console.error('Error fixing incomplete profile:', error)
      throw error
    }
  }
}

// Export singleton instance
export default new WorkerService()