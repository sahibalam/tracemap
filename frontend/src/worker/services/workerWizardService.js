// src/worker/services/workerWizardService.js
import api from '../../services/api'

class WorkerWizardService {
  // ============================================
  // 💾 WIZARD OPERATIONS
  // ============================================

  /**
   * ✅ Save a wizard step to DynamoDB - WorkerWizard Table
   * @param {string} userId - Firebase UID of the worker
   * @param {number} stepNumber - Wizard step number (1-5)
   * @param {object} stepData - Data for this step
   * @returns {Promise} Save response
   */
  async saveStep(userId, stepNumber, stepData) {
    try {
      if (!userId || !stepNumber || !stepData) {
        throw new Error('Missing required fields: userId, stepNumber, stepData')
      }

      console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)
      
      const response = await api.post('/wizard/step', {
        userId,
        stepNumber,
        stepData
      })
      
      if (response.data.success) {
        console.log(`✅ Step ${stepNumber} saved successfully`)
        return response.data
      } else {
        throw new Error(response.data.message || `Failed to save step ${stepNumber}`)
      }
    } catch (error) {
      console.error(`Error saving step ${stepNumber}:`, error)
      throw error
    }
  }

  /**
   * ✅ Get wizard progress for a user
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Progress data with all steps
   */
  async getProgress(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required')
      }

      console.log(`📊 Getting wizard progress for user: ${userId}`)
      
      const response = await api.get(`/wizard/progress/${userId}`)
      
      if (response.data.success) {
        console.log('✅ Wizard progress fetched successfully')
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to get wizard progress')
      }
    } catch (error) {
      console.error('Error getting wizard progress:', error)
      throw error
    }
  }

  /**
   * ✅ Complete the wizard and move data to Workers Table
   * @param {string} userId - Firebase UID of the worker
   * @returns {Promise} Completion response
   */
  async completeWizard(userId) {
    try {
      if (!userId) {
        throw new Error('User ID is required')
      }

      console.log(`✅ Completing wizard for user: ${userId}`)
      
      const response = await api.post('/wizard/complete', { userId })
      
      if (response.data.success) {
        console.log('✅ Wizard completed successfully')
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to complete wizard')
      }
    } catch (error) {
      console.error('Error completing wizard:', error)
      throw error
    }
  }

  // ============================================
  // 📸 PROFILE IMAGE UPLOAD
  // ============================================

  /**
   * ✅ Upload profile image using presigned URL
   * @param {string} userId - Firebase UID of the worker
   * @param {File} file - Image file to upload
   * @returns {Promise} Upload response with file URL
   */
  // src/worker/services/workerWizardService.js

async uploadProfileImage(userId, file) {
  try {
    if (!userId || !file) {
      throw new Error('Missing required fields: userId, file')
    }

    console.log(`📸 Uploading profile image for user: ${userId}`)

    // Step 1: Get presigned URL from backend
    const urlResponse = await api.post('/upload/profile', {
      userId,
      fileName: file.name,
      fileType: file.type
    })

    console.log('🔍 Full API Response:', urlResponse.data)

    if (!urlResponse.data.success) {
      throw new Error(urlResponse.data.message || 'Failed to get upload URL')
    }

    // ✅ Make sure we're accessing the data correctly
    const responseData = urlResponse.data.data
    
    console.log('🔍 Response Data:', responseData)
    console.log('🔍 Upload URL:', responseData.uploadUrl)

    // ✅ Check if uploadUrl exists
    if (!responseData.uploadUrl) {
      console.error('❌ No uploadUrl in response:', responseData)
      throw new Error('No upload URL received from server')
    }

    // Step 2: Upload file directly to S3 using presigned URL
    const uploadResponse = await fetch(responseData.uploadUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type
      }
    })

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed with status: ${uploadResponse.status}`)
    }

    console.log('✅ Profile image uploaded successfully')

    return {
      success: true,
      uploadUrl: responseData.uploadUrl,
      fileKey: responseData.fileKey,
      fileUrl: responseData.fileUrl,
      viewUrl: responseData.viewUrl
    }

  } catch (error) {
    console.error('Error uploading profile image:', error)
    throw error
  }
}

  // ============================================
  // 📄 CERTIFICATE UPLOAD
  // ============================================

  /**
   * ✅ Upload certificate using presigned URL
   * @param {string} userId - Firebase UID of the worker
   * @param {File} file - Certificate file to upload
   * @param {number} rowIndex - Index of the certificate row (0, 1, 2)
   * @returns {Promise} Upload response with file URL
   */
  async uploadCertificate(userId, file, rowIndex = 0) {
    try {
      if (!userId || !file) {
        throw new Error('Missing required fields: userId, file')
      }

      console.log(`📄 Uploading certificate (row ${rowIndex}) for user: ${userId}`)

      // Step 1: Get presigned URL from backend
      const urlResponse = await api.post('/upload/certificate', {
        userId,
        fileName: file.name,
        fileType: file.type,
        rowIndex
      })

      if (!urlResponse.data.success) {
        throw new Error(urlResponse.data.message || 'Failed to get upload URL')
      }

      const { uploadUrl, fileKey, fileUrl } = urlResponse.data.data

      // Step 2: Upload file directly to S3 using presigned URL
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type
        }
      })

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status: ${uploadResponse.status}`)
      }

      console.log(`✅ Certificate (row ${rowIndex}) uploaded successfully`)

      return {
        success: true,
        fileKey,
        fileUrl
      }

    } catch (error) {
      console.error('Error uploading certificate:', error)
      throw error
    }
  }

  // ============================================
  // 👁️ VIEW FILE
  // ============================================

  /**
   * ✅ Get presigned URL to view a file
   * @param {string} fileKey - S3 file key
   * @returns {Promise} View URL response
   */
  async getFileViewUrl(fileKey) {
    try {
      if (!fileKey) {
        throw new Error('File key is required')
      }

      console.log(`👁️ Getting view URL for: ${fileKey}`)

      // URL encode the fileKey to handle special characters
      const encodedFileKey = encodeURIComponent(fileKey)
      
      const response = await api.get(`/upload/view/${encodedFileKey}`)
      
      if (response.data.success) {
        console.log('✅ View URL generated successfully')
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to get view URL')
      }
    } catch (error) {
      console.error('Error getting view URL:', error)
      throw error
    }
  }

  // ============================================
  // 🗑️ DELETE FILE
  // ============================================

  /**
   * ✅ Delete a file from S3
   * @param {string} fileKey - S3 file key
   * @returns {Promise} Delete response
   */
  async deleteFile(fileKey) {
    try {
      if (!fileKey) {
        throw new Error('File key is required')
      }

      console.log(`🗑️ Deleting file: ${fileKey}`)
      
      const response = await api.delete(`/upload/${fileKey}`)
      
      if (response.data.success) {
        console.log('✅ File deleted successfully')
        return response.data
      } else {
        throw new Error(response.data.message || 'Failed to delete file')
      }
    } catch (error) {
      console.error('Error deleting file:', error)
      throw error
    }
  }
}

// Export singleton instance
export default new WorkerWizardService()