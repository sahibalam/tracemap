
import api from './api'

class WorkerWizardService {
  // ============================================
  // 💾 WIZARD OPERATIONS
  // ============================================

  async saveStep(userId, stepNumber, stepData) {
    try {
      const response = await api.post('/wizard/step', {
        userId,
        stepNumber,
        stepData
      })
      return response.data
    } catch (error) {
      console.error('Error saving step:', error)
      throw error
    }
  }

  async getProgress(userId) {
    try {
      const response = await api.get(`/wizard/progress/${userId}`)
      return response.data
    } catch (error) {
      console.error('Error getting progress:', error)
      throw error
    }
  }

  async completeWizard(userId) {
    try {
      const response = await api.post('/wizard/complete', { userId })
      return response.data
    } catch (error) {
      console.error('Error completing wizard:', error)
      throw error
    }
  }

  // ============================================
  // 📸 PROFILE IMAGE UPLOAD
  // ============================================

  async uploadProfileImage(userId, file) {
    try {
      // Step 1: Get upload URL from backend
      const urlResponse = await api.post('/upload/profile', {
        userId,
        fileName: file.name,
        fileType: file.type
      })

      if (!urlResponse.data.success) {
        throw new Error(urlResponse.data.message || 'Failed to get upload URL')
      }

      // ✅ Return the presigned URL info - actual upload happens in component
      return {
        success: true,
        uploadUrl: urlResponse.data.data.uploadUrl,
        fileKey: urlResponse.data.data.fileKey,
        fileUrl: urlResponse.data.data.fileUrl
      }

    } catch (error) {
      console.error('Error getting upload URL:', error)
      throw error
    }
  }

  // ============================================
  // 📄 CERTIFICATE UPLOAD
  // ============================================

  async uploadCertificate(userId, file, rowIndex = 0) {
    try {
      const urlResponse = await api.post('/upload/certificate', {
        userId,
        fileName: file.name,
        fileType: file.type,
        rowIndex
      })

      if (!urlResponse.data.success) {
        throw new Error(urlResponse.data.message || 'Failed to get upload URL')
      }

      return {
        success: true,
        uploadUrl: urlResponse.data.data.uploadUrl,
        fileKey: urlResponse.data.data.fileKey,
        fileUrl: urlResponse.data.data.fileUrl
      }

    } catch (error) {
      console.error('Error getting certificate upload URL:', error)
      throw error
    }
  }

  // ============================================
  // 👁️ VIEW FILE
  // ============================================

  async getFileViewUrl(fileKey) {
    try {
      const response = await api.get(`/upload/view/${fileKey}`)
      return response.data
    } catch (error) {
      console.error('Error getting view URL:', error)
      throw error
    }
  }

  // ============================================
  // 🗑️ DELETE FILE
  // ============================================

  async deleteFile(fileKey) {
    try {
      const response = await api.delete(`/upload/${fileKey}`)
      return response.data
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }
}

export default new WorkerWizardService()
