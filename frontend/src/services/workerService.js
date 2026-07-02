// src/worker/services/workerService.js
import api from '../../services/api'

class WorkerService {
  /**
   * ✅ Get complete worker profile from DynamoDB - Workers Table
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
   * ✅ Update worker profile section
   * @param {string} userId - Firebase UID of the worker
   * @param {string} section - Section name (PROFILE, TRADE, WORK_HISTORY, etc.)
   * @param {object} data - Updated data for the section
   * @returns {Promise} Update response
   */
  async updateWorkerProfile(userId, section, data) {
    try {
      if (!userId || !section || !data) {
        throw new Error('Missing required parameters: userId, section, data')
      }

      console.log(`📝 Updating ${section} for user: ${userId}`)
      
      const response = await api.put(`/worker/profile/${userId}`, {
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
   * ✅ Check if worker profile exists
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise<boolean>} True if profile exists
   */
  async profileExists(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      return response.success && response.data !== null
    } catch (error) {
      // If 404, profile doesn't exist
      if (error.response && error.response.status === 404) {
        return false
      }
      throw error
    }
  }

  /**
   * ✅ Get worker availability (for matching)
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Availability data
   */
  async getWorkerAvailability(userId) {
    try {
      const response = await this.getWorkerProfile(userId)
      if (response.success && response.data.availability) {
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
      if (response.success && response.data.trade) {
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
      if (response.success && response.data.certifications) {
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
      if (response.success && response.data.workhistory) {
        return response.data.workhistory
      }
      return null
    } catch (error) {
      console.error('Error fetching work history:', error)
      throw error
    }
  }
}

// Export singleton instance
export default new WorkerService()