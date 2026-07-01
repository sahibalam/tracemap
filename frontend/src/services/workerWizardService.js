// frontend/src/services/workerWizardService.js
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
      // Step 1: Get upload URL
      const urlResponse = await api.post('/upload/profile', {
        userId,
        fileName: file.name,
        fileType: file.type
      })

      // Step 2: Upload file directly to S3
      const uploadResponse = await fetch(urlResponse.data.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      })

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`)
      }

      return {
        success: true,
        fileKey: urlResponse.data.fileKey,
        fileUrl: urlResponse.data.fileUrl
      }

    } catch (error) {
      console.error('Error uploading profile image:', error)
      throw error
    }
  }

  // ============================================
  // 📄 CERTIFICATE UPLOAD
  // ============================================

  async uploadCertificate(userId, file, rowIndex = 0) {
    try {
      // Step 1: Get upload URL
      const urlResponse = await api.post('/upload/certificate', {
        userId,
        fileName: file.name,
        fileType: file.type,
        rowIndex
      })

      // Step 2: Upload file directly to S3
      const uploadResponse = await fetch(urlResponse.data.uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      })

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`)
      }

      return {
        success: true,
        fileKey: urlResponse.data.fileKey,
        fileUrl: urlResponse.data.fileUrl
      }

    } catch (error) {
      console.error('Error uploading certificate:', error)
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