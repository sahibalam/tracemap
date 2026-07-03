
// src/worker/services/workerService.js
import api from '../../services/api'

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
      if (!userId) {
        throw new Error('User ID is required')
      }

      console.log(`📊 Fetching profile for user: ${userId}`)
      
      const response = await api.get(`/worker/profile/${userId}`)
      
      if (response.data.success) {
        console.log('✅ Profile fetched successfully')
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
   */
  async updateBasics(userId, data) {
    return this.updateSection(userId, 'basics', data)
  }

  /**
   * ✅ Update trade profile (Wizard Step 2)
   */
  async updateTrade(userId, data) {
    return this.updateSection(userId, 'trade', data)
  }

  /**
   * ✅ Update work history (Wizard Step 3)
   */
  async updateWorkHistory(userId, data) {
    return this.updateSection(userId, 'workHistory', data)
  }

  /**
   * ✅ Update availability (Wizard Step 4)
   */
  async updateAvailability(userId, data) {
    return this.updateSection(userId, 'availability', data)
  }

  /**
   * ✅ Update emergency contact (Wizard Step 5)
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
            totalSteps: 5
          }
        }
      }

      const data = profile.data
      const steps = {}
      let currentStep = 1
      let isComplete = false

      // Check each section
      const sections = ['basics', 'trade', 'workHistory', 'availability', 'emergency']
      
      sections.forEach((section, index) => {
        const stepNum = index + 1
        const sectionData = data[section]
        
        if (sectionData && Object.keys(sectionData).length > 0) {
          steps[`step${stepNum}`] = sectionData
          currentStep = stepNum
        }
      })

      // Check wizard status
      const wizard = data.wizard || {}
      isComplete = wizard.completed || false
      
      // If wizard is marked complete but steps are incomplete, fix it
      if (isComplete) {
        const allStepsComplete = sections.every((section) => {
          const sectionData = data[section]
          return sectionData && Object.keys(sectionData).length > 0
        })
        if (!allStepsComplete) {
          isComplete = false
        }
      }

      // Determine next step (first incomplete step)
      let nextStep = 1
      sections.forEach((section, index) => {
        const stepNum = index + 1
        const sectionData = data[section]
        if (!sectionData || Object.keys(sectionData).length === 0) {
          if (nextStep === 1 || stepNum < nextStep) {
            nextStep = stepNum
          }
        }
      })

      // If all steps are complete, nextStep is 0 (complete)
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
          totalSteps: 5
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
   * @param {number} stepNumber - Current step number (1-5)
   * @param {boolean} completed - Whether wizard is complete
   * @returns {Promise} Update response
   */
  async updateWizardProgress(userId, stepNumber, completed = false) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!stepNumber || stepNumber < 1 || stepNumber > 5) {
        throw new Error('Valid step number (1-5) is required')
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

      // If first time, add startedAt
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

      // If wizard is complete, no need to resume
      if (isComplete) {
        return { 
          needsResume: false, 
          step: 0, 
          isComplete: true,
          message: 'Wizard is already complete'
        }
      }

      // If no steps completed, start from step 1
      if (currentStep === 1 && nextStep === 1) {
        // Check if step 1 has any data
        const hasStep1Data = Object.keys(steps).length > 0
        if (!hasStep1Data) {
          return { 
            needsResume: false, 
            step: 1,
            message: 'No data found, starting fresh'
          }
        }
      }

      // Resume from the first incomplete step
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
}

// Export singleton instance
export default new WorkerService()