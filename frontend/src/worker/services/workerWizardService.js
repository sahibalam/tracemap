// // src/worker/services/workerWizardService.js
// import api from '../../services/api'

// class WorkerWizardService {
//   // ============================================
//   // 💾 WIZARD OPERATIONS
//   // ============================================

//   /**
//    * ✅ Save a wizard step to DynamoDB - WorkerWizard Table
//    * @param {string} userId - Firebase UID of the worker
//    * @param {number} stepNumber - Wizard step number (1-5)
//    * @param {object} stepData - Data for this step
//    * @returns {Promise} Save response
//    */
//   async saveStep(userId, stepNumber, stepData) {
//     try {
//       if (!userId || !stepNumber || !stepData) {
//         throw new Error('Missing required fields: userId, stepNumber, stepData')
//       }

//       console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)
      
//       const response = await api.post('/wizard/step', {
//         userId,
//         stepNumber,
//         stepData
//       })
      
//       if (response.data.success) {
//         console.log(`✅ Step ${stepNumber} saved successfully`)
//         return response.data
//       } else {
//         throw new Error(response.data.message || `Failed to save step ${stepNumber}`)
//       }
//     } catch (error) {
//       console.error(`Error saving step ${stepNumber}:`, error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get wizard progress for a user
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Progress data with all steps
//    */
//   async getProgress(userId) {
//     try {
//       if (!userId) {
//         throw new Error('User ID is required')
//       }

//       console.log(`📊 Getting wizard progress for user: ${userId}`)
      
//       const response = await api.get(`/wizard/progress/${userId}`)
      
//       if (response.data.success) {
//         console.log('✅ Wizard progress fetched successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to get wizard progress')
//       }
//     } catch (error) {
//       console.error('Error getting wizard progress:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Complete the wizard and move data to Workers Table
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Completion response
//    */
//   async completeWizard(userId) {
//     try {
//       if (!userId) {
//         throw new Error('User ID is required')
//       }

//       console.log(`✅ Completing wizard for user: ${userId}`)
      
//       const response = await api.post('/wizard/complete', { userId })
      
//       if (response.data.success) {
//         console.log('✅ Wizard completed successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to complete wizard')
//       }
//     } catch (error) {
//       console.error('Error completing wizard:', error)
//       throw error
//     }
//   }

//   // ============================================
//   // 📸 PROFILE IMAGE UPLOAD
//   // ============================================

//   /**
//    * ✅ Upload profile image using presigned URL
//    * @param {string} userId - Firebase UID of the worker
//    * @param {File} file - Image file to upload
//    * @returns {Promise} Upload response with file URL
//    */
//   // src/worker/services/workerWizardService.js

// async uploadProfileImage(userId, file) {
//   try {
//     if (!userId || !file) {
//       throw new Error('Missing required fields: userId, file')
//     }

//     console.log(`📸 Uploading profile image for user: ${userId}`)

//     // Step 1: Get presigned URL from backend
//     const urlResponse = await api.post('/upload/profile', {
//       userId,
//       fileName: file.name,
//       fileType: file.type
//     })

//     console.log('🔍 Full API Response:', urlResponse.data)

//     if (!urlResponse.data.success) {
//       throw new Error(urlResponse.data.message || 'Failed to get upload URL')
//     }

//     // ✅ Make sure we're accessing the data correctly
//     const responseData = urlResponse.data.data
    
//     console.log('🔍 Response Data:', responseData)
//     console.log('🔍 Upload URL:', responseData.uploadUrl)

//     // ✅ Check if uploadUrl exists
//     if (!responseData.uploadUrl) {
//       console.error('❌ No uploadUrl in response:', responseData)
//       throw new Error('No upload URL received from server')
//     }

//     // Step 2: Upload file directly to S3 using presigned URL
//     const uploadResponse = await fetch(responseData.uploadUrl, {
//       method: 'PUT',
//       body: file,
//       headers: {
//         'Content-Type': file.type
//       }
//     })

//     if (!uploadResponse.ok) {
//       throw new Error(`Upload failed with status: ${uploadResponse.status}`)
//     }

//     console.log('✅ Profile image uploaded successfully')

//     return {
//       success: true,
//       uploadUrl: responseData.uploadUrl,
//       fileKey: responseData.fileKey,
//       fileUrl: responseData.fileUrl,
//       viewUrl: responseData.viewUrl
//     }

//   } catch (error) {
//     console.error('Error uploading profile image:', error)
//     throw error
//   }
// }

//   // ============================================
//   // 📄 CERTIFICATE UPLOAD
//   // ============================================

//   /**
//    * ✅ Upload certificate using presigned URL
//    * @param {string} userId - Firebase UID of the worker
//    * @param {File} file - Certificate file to upload
//    * @param {number} rowIndex - Index of the certificate row (0, 1, 2)
//    * @returns {Promise} Upload response with file URL
//    */
//   async uploadCertificate(userId, file, rowIndex = 0) {
//     try {
//       if (!userId || !file) {
//         throw new Error('Missing required fields: userId, file')
//       }

//       console.log(`📄 Uploading certificate (row ${rowIndex}) for user: ${userId}`)

//       // Step 1: Get presigned URL from backend
//       const urlResponse = await api.post('/upload/certificate', {
//         userId,
//         fileName: file.name,
//         fileType: file.type,
//         rowIndex
//       })

//       if (!urlResponse.data.success) {
//         throw new Error(urlResponse.data.message || 'Failed to get upload URL')
//       }

//       const { uploadUrl, fileKey, fileUrl } = urlResponse.data.data

//       // Step 2: Upload file directly to S3 using presigned URL
//       const uploadResponse = await fetch(uploadUrl, {
//         method: 'PUT',
//         body: file,
//         headers: {
//           'Content-Type': file.type
//         }
//       })

//       if (!uploadResponse.ok) {
//         throw new Error(`Upload failed with status: ${uploadResponse.status}`)
//       }

//       console.log(`✅ Certificate (row ${rowIndex}) uploaded successfully`)

//       return {
//         success: true,
//         fileKey,
//         fileUrl
//       }

//     } catch (error) {
//       console.error('Error uploading certificate:', error)
//       throw error
//     }
//   }

//   // ============================================
//   // 👁️ VIEW FILE
//   // ============================================

//   /**
//    * ✅ Get presigned URL to view a file
//    * @param {string} fileKey - S3 file key
//    * @returns {Promise} View URL response
//    */
//   async getFileViewUrl(fileKey) {
//     try {
//       if (!fileKey) {
//         throw new Error('File key is required')
//       }

//       console.log(`👁️ Getting view URL for: ${fileKey}`)

//       // URL encode the fileKey to handle special characters
//       const encodedFileKey = encodeURIComponent(fileKey)
      
//       const response = await api.get(`/upload/view/${encodedFileKey}`)
      
//       if (response.data.success) {
//         console.log('✅ View URL generated successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to get view URL')
//       }
//     } catch (error) {
//       console.error('Error getting view URL:', error)
//       throw error
//     }
//   }

//   // ============================================
//   // 🗑️ DELETE FILE
//   // ============================================

//   /**
//    * ✅ Delete a file from S3
//    * @param {string} fileKey - S3 file key
//    * @returns {Promise} Delete response
//    */
//   async deleteFile(fileKey) {
//     try {
//       if (!fileKey) {
//         throw new Error('File key is required')
//       }

//       console.log(`🗑️ Deleting file: ${fileKey}`)
      
//       const response = await api.delete(`/upload/${fileKey}`)
      
//       if (response.data.success) {
//         console.log('✅ File deleted successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to delete file')
//       }
//     } catch (error) {
//       console.error('Error deleting file:', error)
//       throw error
//     }
//   }
// }

// // Export singleton instance
// export default new WorkerWizardService()


// import api from '../../services/api'

// class WorkerWizardService {
//   async saveStep(userId, stepNumber, stepData) {
//     try {
//       if (!userId || !stepNumber || !stepData) {
//         throw new Error('Missing required fields: userId, stepNumber, stepData')
//       }
//       console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)
//       const response = await api.post('/wizard/step', { userId, stepNumber, stepData })
//       if (response.data.success) {
//         console.log(`✅ Step ${stepNumber} saved successfully`)
//         return response.data
//       } else {
//         throw new Error(response.data.message || `Failed to save step ${stepNumber}`)
//       }
//     } catch (error) {
//       console.error(`Error saving step ${stepNumber}:`, error)
//       throw error
//     }
//   }

//   async getProgress(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       console.log(`📊 Getting wizard progress for user: ${userId}`)
//       const response = await api.get(`/wizard/progress/${userId}`)
//       if (response.data.success) {
//         console.log('✅ Wizard progress fetched successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to get wizard progress')
//       }
//     } catch (error) {
//       console.error('Error getting wizard progress:', error)
//       throw error
//     }
//   }

//   async completeWizard(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       console.log(`✅ Completing wizard for user: ${userId}`)
//       const response = await api.post('/wizard/complete', { userId })
//       if (response.data.success) {
//         console.log('✅ Wizard completed successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to complete wizard')
//       }
//     } catch (error) {
//       console.error('Error completing wizard:', error)
//       throw error
//     }
//   }

//   async uploadProfileImage(userId, file) {
//     try {
//       if (!userId || !file) {
//         throw new Error('Missing required fields: userId, file')
//       }

//       console.log(`📸 Uploading profile image for user: ${userId}`)

//       const urlResponse = await api.post('/upload/profile', {
//         userId,
//         fileName: file.name,
//         fileType: file.type
//       })

//       console.log('🔍 API Response:', JSON.stringify(urlResponse.data, null, 2))

//       if (!urlResponse.data.success) {
//         throw new Error(urlResponse.data.message || 'Failed to get upload URL')
//       }

//       const responseData = urlResponse.data.data || {}
      
//       const uploadUrl = responseData.uploadUrl
//       const fileKey = responseData.fileKey
//       const fileUrl = responseData.fileUrl
//       const viewUrl = responseData.viewUrl

//       console.log('🔍 uploadUrl:', uploadUrl)
//       console.log('🔍 fileKey:', fileKey)

//       if (!uploadUrl) {
//         console.error('❌ No uploadUrl found in response data')
//         throw new Error('No upload URL received from server')
//       }

//       console.log('📤 Uploading to S3...')
//       const uploadResponse = await fetch(uploadUrl, {
//         method: 'PUT',
//         body: file,
//         headers: { 'Content-Type': file.type }
//       })

//       if (!uploadResponse.ok) {
//         throw new Error(`S3 upload failed with status: ${uploadResponse.status}`)
//       }

//       console.log('✅ Profile image uploaded successfully to S3')

//       // ✅ IMPORTANT: Return uploadUrl!
//       return {
//         success: true,
//         uploadUrl: uploadUrl,
//         fileKey: fileKey,
//         fileUrl: fileUrl,
//         viewUrl: viewUrl
//       }

//     } catch (error) {
//       console.error('Error uploading profile image:', error)
//       throw error
//     }
//   }

//   async uploadCertificate(userId, file, rowIndex = 0) {
//     try {
//       if (!userId || !file) {
//         throw new Error('Missing required fields: userId, file')
//       }

//       console.log(`📄 Uploading certificate (row ${rowIndex}) for user: ${userId}`)

//       const urlResponse = await api.post('/upload/certificate', {
//         userId,
//         fileName: file.name,
//         fileType: file.type,
//         rowIndex
//       })

//       if (!urlResponse.data.success) {
//         throw new Error(urlResponse.data.message || 'Failed to get upload URL')
//       }

//       const data = urlResponse.data.data || {}

//       if (!data.uploadUrl) {
//         throw new Error('No upload URL received from server')
//       }

//       const uploadResponse = await fetch(data.uploadUrl, {
//         method: 'PUT',
//         body: file,
//         headers: { 'Content-Type': file.type }
//       })

//       if (!uploadResponse.ok) {
//         throw new Error(`Upload failed with status: ${uploadResponse.status}`)
//       }

//       console.log(`✅ Certificate (row ${rowIndex}) uploaded successfully`)

//       return {
//         success: true,
//         uploadUrl: data.uploadUrl,
//         fileKey: data.fileKey,
//         fileUrl: data.fileUrl
//       }

//     } catch (error) {
//       console.error('Error uploading certificate:', error)
//       throw error
//     }
//   }

//   async getFileViewUrl(fileKey) {
//     try {
//       if (!fileKey) {
//         throw new Error('File key is required')
//       }

//       console.log(`👁️ Getting view URL for: ${fileKey}`)

//       const encodedFileKey = encodeURIComponent(fileKey)
      
//       const response = await api.get(`/upload/view/${encodedFileKey}`)
      
//       if (response.data.success) {
//         console.log('✅ View URL generated successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to get view URL')
//       }
//     } catch (error) {
//       console.error('Error getting view URL:', error)
//       throw error
//     }
//   }

//   async deleteFile(fileKey) {
//     try {
//       if (!fileKey) {
//         throw new Error('File key is required')
//       }

//       console.log(`🗑️ Deleting file: ${fileKey}`)
      
//       const response = await api.delete(`/upload/${fileKey}`)
      
//       if (response.data.success) {
//         console.log('✅ File deleted successfully')
//         return response.data
//       } else {
//         throw new Error(response.data.message || 'Failed to delete file')
//       }
//     } catch (error) {
//       console.error('Error deleting file:', error)
//       throw error
//     }
//   }
// }

// export default new WorkerWizardService()





// // src/worker/services/workerWizardService.js
// import workerService from './workerService'
// import api from '../../services/api'

// class WorkerWizardService {
//   /**
//    * ============================================================
//    * 📊 WIZARD STEP OPERATIONS
//    * ============================================================
//    */

//   /**
//    * ✅ Save wizard step - Saves to Workers table via workerService
//    * Maps step numbers to section names
//    * @param {string} userId - Firebase UID of the worker
//    * @param {number} stepNumber - Step number (1-5)
//    * @param {object} data - Step data to save
//    * @returns {Promise} Save response
//    */
//   async saveStep(userId, stepNumber, data) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!stepNumber || stepNumber < 1 || stepNumber > 5) {
//         throw new Error('Valid step number (1-5) is required')
//       }
//       if (!data) throw new Error('Data is required')

//       console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)

//       // Step → Section Mapping
//       const sectionMap = {
//         1: 'basics',        // Personal Information
//         2: 'trade',         // Trade Profile & Skills
//         3: 'workHistory',   // Work History & Projects
//         4: 'availability',  // Availability & Preferences
//         5: 'emergency'      // Emergency Contact & Acknowledgments
//       }

//       const section = sectionMap[stepNumber]
      
//       // Save to Workers table via workerService
//       const result = await workerService.updateSection(userId, section, data)
      
//       // Update wizard progress
//       await this.updateWizardProgress(userId, stepNumber)
      
//       console.log(`✅ Step ${stepNumber} saved to Workers table, progress updated`)
//       return result

//     } catch (error) {
//       console.error(`Error saving step ${stepNumber}:`, error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get wizard progress with resume information
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Progress data
//    */
//   async getProgress(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       console.log(`📊 Getting wizard progress for user: ${userId}`)

//       const progress = await workerService.getWizardProgress(userId)
      
//       if (!progress.success) {
//         return {
//           success: true,
//           data: {
//             steps: {},
//             currentStep: 1,
//             nextStep: 1,
//             isComplete: false,
//             totalSteps: 5,
//             wizard: null
//           }
//         }
//       }

//       return progress

//     } catch (error) {
//       console.error('Error getting wizard progress:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Update wizard progress
//    * @param {string} userId - Firebase UID of the worker
//    * @param {number} stepNumber - Current step number (1-5)
//    * @param {boolean} completed - Whether wizard is complete
//    * @returns {Promise} Update response
//    */
//   async updateWizardProgress(userId, stepNumber, completed = false) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!stepNumber || stepNumber < 1 || stepNumber > 5) {
//         throw new Error('Valid step number (1-5) is required')
//       }

//       console.log(`📝 Updating wizard progress: step=${stepNumber}, completed=${completed}`)

//       return await workerService.updateWizardProgress(userId, stepNumber, completed)

//     } catch (error) {
//       console.error('Error updating wizard progress:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Check if wizard needs to resume
//    * Use this on WizardPage load
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise<Object>} Resume information
//    */
//   async checkResume(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       const result = await workerService.checkWizardResume(userId)
      
//       console.log(`🔄 Resume check result:`, result)
      
//       return result

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
//    * ✅ Complete the wizard
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise} Completion response
//    */
//   async completeWizard(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       console.log(`🏁 Completing wizard for user: ${userId}`)

//       // Mark wizard as complete
//       await workerService.updateWizardProgress(userId, 5, true)

//       // Also update wizard section with completion details
//       await workerService.updateSection(userId, 'wizard', {
//         completed: true,
//         completedAt: new Date().toISOString(),
//         lastUpdatedAt: new Date().toISOString()
//       })

//       console.log(`✅ Wizard completed for user: ${userId}`)

//       return {
//         success: true,
//         message: 'Wizard completed successfully',
//         data: {
//           userId,
//           completedAt: new Date().toISOString()
//         }
//       }

//     } catch (error) {
//       console.error('Error completing wizard:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get current step data
//    * @param {string} userId - Firebase UID of the worker
//    * @param {number} stepNumber - Step number (1-5)
//    * @returns {Promise<Object>} Step data
//    */
//   async getStepData(userId, stepNumber) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!stepNumber || stepNumber < 1 || stepNumber > 5) {
//         throw new Error('Valid step number (1-5) is required')
//       }

//       const progress = await this.getProgress(userId)
      
//       if (progress.success && progress.data.steps) {
//         const stepKey = `step${stepNumber}`
//         return progress.data.steps[stepKey] || null
//       }
      
//       return null

//     } catch (error) {
//       console.error(`Error getting step ${stepNumber} data:`, error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Check if wizard is complete
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise<boolean>} True if complete
//    */
//   async isWizardComplete(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       const progress = await this.getProgress(userId)
//       return progress.success && progress.data.isComplete === true

//     } catch (error) {
//       console.error('Error checking wizard completion:', error)
//       return false
//     }
//   }

//   /**
//    * ✅ Get wizard completion percentage
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise<number>} Percentage (0-100)
//    */
//   async getCompletionPercentage(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       const progress = await this.getProgress(userId)
      
//       if (!progress.success) return 0

//       const { steps, totalSteps } = progress.data
//       const completedSteps = Object.keys(steps).length
      
//       return Math.round((completedSteps / totalSteps) * 100)

//     } catch (error) {
//       console.error('Error calculating completion percentage:', error)
//       return 0
//     }
//   }

//   /**
//    * ============================================================
//    * 📄 CERTIFICATE UPLOAD OPERATIONS
//    * ============================================================
//    */

//   /**
//    * ✅ Upload certificate to S3 and save to Workers table
//    * @param {string} userId - Firebase UID of the worker
//    * @param {File} file - File to upload
//    * @param {number} rowIndex - Row index in the certification form
//    * @returns {Promise} Upload response
//    */
//   async uploadCertificate(userId, file, rowIndex = 0) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!file) throw new Error('File is required')

//       console.log(`📄 Uploading certificate (row ${rowIndex}) for user: ${userId}`)

//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         throw new Error('File size must be less than 5MB')
//       }

//       // Validate file type
//       const allowedTypes = [
//         'application/pdf',
//         'image/jpeg',
//         'image/png',
//         'application/msword',
//         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
//       ]
//       if (!allowedTypes.includes(file.type)) {
//         throw new Error('Invalid file type. Allowed: PDF, JPEG, PNG, DOC, DOCX')
//       }

//       // Step 1: Get presigned URL from backend
//       const response = await api.post('/upload/certificate', {
//         userId,
//         fileName: file.name,
//         fileType: file.type,
//         rowIndex
//       })

//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to get upload URL')
//       }

//       const { uploadUrl, fileKey, fileUrl } = response.data.data

//       // Step 2: Upload file to S3 using presigned URL
//       const uploadResponse = await fetch(uploadUrl, {
//         method: 'PUT',
//         body: file,
//         headers: {
//           'Content-Type': file.type,
//           'Content-Disposition': `inline; filename="${encodeURIComponent(file.name)}"`
//         }
//       })

//       if (!uploadResponse.ok) {
//         throw new Error(`S3 upload failed with status: ${uploadResponse.status}`)
//       }

//       console.log(`✅ Certificate (row ${rowIndex}) uploaded to S3`)

//       // Step 3: Update certifications section in Workers table
//       const updatedCertData = await this.updateCertificationRow(
//         userId,
//         rowIndex,
//         {
//           uploadRef: file.name,
//           fileKey: fileKey,
//           fileUrl: fileUrl,
//           uploadedAt: new Date().toISOString()
//         }
//       )

//       console.log(`✅ Certificate saved to Workers table`)

//       return {
//         success: true,
//         fileKey,
//         fileUrl,
//         fileName: file.name,
//         rowIndex,
//         certData: updatedCertData
//       }

//     } catch (error) {
//       console.error('Error uploading certificate:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Update a specific certification row in Workers table
//    * @param {string} userId - Firebase UID of the worker
//    * @param {number} rowIndex - Row index to update
//    * @param {object} rowData - Data to update in the row
//    * @returns {Promise} Updated certification data
//    */
//   async updateCertificationRow(userId, rowIndex, rowData) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (rowIndex === undefined || rowIndex === null) {
//         throw new Error('Row index is required')
//       }
//       if (!rowData) throw new Error('Row data is required')

//       console.log(`📝 Updating certification row ${rowIndex} for user: ${userId}`)

//       // Get current certifications
//       const profile = await workerService.getWorkerProfile(userId)
//       const existingCerts = profile.data?.certifications || {}
//       const certRows = existingCerts.certRows || []

//       // Ensure row exists
//       while (certRows.length <= rowIndex) {
//         certRows.push({
//           name: '',
//           cardNumber: '',
//           issueDate: '',
//           expirationDate: '',
//           uploadRef: '',
//           fileKey: '',
//           fileUrl: ''
//         })
//       }

//       // Update specific row
//       certRows[rowIndex] = {
//         ...certRows[rowIndex],
//         ...rowData
//       }

//       // Save back to Workers table
//       const updatedCerts = {
//         ...existingCerts,
//         certRows,
//         lastUpdatedAt: new Date().toISOString()
//       }

//       await workerService.updateCertifications(userId, updatedCerts)

//       return updatedCerts

//     } catch (error) {
//       console.error(`Error updating certification row ${rowIndex}:`, error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Delete a certificate from S3 and remove from Workers table
//    * @param {string} userId - Firebase UID of the worker
//    * @param {number} rowIndex - Row index to clear
//    * @param {string} fileKey - S3 file key to delete
//    * @returns {Promise} Delete response
//    */
//   async deleteCertificate(userId, rowIndex, fileKey) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (rowIndex === undefined || rowIndex === null) {
//         throw new Error('Row index is required')
//       }

//       console.log(`🗑️ Deleting certificate row ${rowIndex} for user: ${userId}`)

//       // Delete from S3 if fileKey provided
//       if (fileKey) {
//         await api.delete(`/upload/${encodeURIComponent(fileKey)}`)
//         console.log(`✅ File deleted from S3: ${fileKey}`)
//       }

//       // Clear the row in Workers table
//       const updatedCerts = await this.updateCertificationRow(
//         userId,
//         rowIndex,
//         {
//           uploadRef: '',
//           fileKey: '',
//           fileUrl: '',
//           deletedAt: new Date().toISOString()
//         }
//       )

//       console.log(`✅ Certificate row ${rowIndex} cleared`)

//       return {
//         success: true,
//         message: 'Certificate deleted successfully',
//         rowIndex
//       }

//     } catch (error) {
//       console.error(`Error deleting certificate row ${rowIndex}:`, error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Get presigned view URL for a certificate
//    * @param {string} fileKey - S3 file key
//    * @param {boolean} download - Whether to download or view
//    * @returns {Promise<string>} View URL
//    */
//   async getCertificateViewUrl(fileKey, download = false) {
//     try {
//       if (!fileKey) throw new Error('File key is required')

//       console.log(`👁️ Getting view URL for file: ${fileKey}`)

//       const response = await api.get(`/upload/view/${encodeURIComponent(fileKey)}`, {
//         params: { download: download.toString() }
//       })

//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to get view URL')
//       }

//       return response.data.data.viewUrl

//     } catch (error) {
//       console.error('Error getting certificate view URL:', error)
//       throw error
//     }
//   }

//   /**
//    * ============================================================
//    * 📸 PROFILE IMAGE UPLOAD
//    * ============================================================
//    */

//   /**
//    * ✅ Upload profile image
//    * @param {string} userId - Firebase UID of the worker
//    * @param {File} file - Image file to upload
//    * @returns {Promise} Upload response
//    */
//   async uploadProfileImage(userId, file) {
//     try {
//       if (!userId) throw new Error('User ID is required')
//       if (!file) throw new Error('File is required')

//       console.log(`📸 Uploading profile image for user: ${userId}`)

//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         throw new Error('File size must be less than 5MB')
//       }

//       // Validate file type
//       const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
//       if (!allowedTypes.includes(file.type)) {
//         throw new Error('Invalid file type. Allowed: JPEG, PNG, GIF, WEBP')
//       }

//       // Step 1: Get presigned URL from backend
//       const response = await api.post('/upload/profile', {
//         userId,
//         fileName: file.name,
//         fileType: file.type
//       })

//       if (!response.data.success) {
//         throw new Error(response.data.message || 'Failed to get upload URL')
//       }

//       const { uploadUrl, fileKey, fileUrl, viewUrl } = response.data.data

//       // Step 2: Upload file to S3 using presigned URL
//       const uploadResponse = await fetch(uploadUrl, {
//         method: 'PUT',
//         body: file,
//         headers: {
//           'Content-Type': file.type
//         }
//       })

//       if (!uploadResponse.ok) {
//         throw new Error(`S3 upload failed with status: ${uploadResponse.status}`)
//       }

//       console.log(`✅ Profile image uploaded to S3`)

//       // Step 3: Update basics section with profile image URLs
//       const profile = await workerService.getWorkerProfile(userId)
//       const basics = profile.data?.basics || {}

//       await workerService.updateBasics(userId, {
//         ...basics,
//         profilePreview: viewUrl || fileUrl,
//         profileImageKey: fileKey,
//         profileImageUrl: fileUrl,
//         profileImageUpdatedAt: new Date().toISOString()
//       })

//       console.log(`✅ Profile image saved to Workers table`)

//       return {
//         success: true,
//         fileKey,
//         fileUrl,
//         viewUrl: viewUrl || fileUrl,
//         fileName: file.name
//       }

//     } catch (error) {
//       console.error('Error uploading profile image:', error)
//       throw error
//     }
//   }

//   /**
//    * ✅ Delete profile image
//    * @param {string} userId - Firebase UID of the worker
//    * @param {string} fileKey - S3 file key to delete
//    * @returns {Promise} Delete response
//    */
//   async deleteProfileImage(userId, fileKey) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       console.log(`🗑️ Deleting profile image for user: ${userId}`)

//       // Delete from S3
//       if (fileKey) {
//         await api.delete(`/upload/${encodeURIComponent(fileKey)}`)
//         console.log(`✅ Profile image deleted from S3: ${fileKey}`)
//       }

//       // Clear profile image from basics
//       const profile = await workerService.getWorkerProfile(userId)
//       const basics = profile.data?.basics || {}

//       await workerService.updateBasics(userId, {
//         ...basics,
//         profilePreview: null,
//         profileImageKey: null,
//         profileImageUrl: null,
//         profileImageDeletedAt: new Date().toISOString()
//       })

//       console.log(`✅ Profile image cleared from Workers table`)

//       return {
//         success: true,
//         message: 'Profile image deleted successfully'
//       }

//     } catch (error) {
//       console.error('Error deleting profile image:', error)
//       throw error
//     }
//   }

//   /**
//    * ============================================================
//    * 🏥 HELPER METHODS
//    * ============================================================
//    */

//   /**
//    * ✅ Get step title by step number
//    * @param {number} stepNumber - Step number (1-5)
//    * @returns {string} Step title
//    */
//   getStepTitle(stepNumber) {
//     const titles = {
//       1: 'Personal Information',
//       2: 'Trade Profile & Skill Matrix',
//       3: 'Work History & Project Experience',
//       4: 'Availability, Travel & Pay Preferences',
//       5: 'Emergency Contact & Acknowledgments'
//     }
//     return titles[stepNumber] || `Step ${stepNumber}`
//   }

//   /**
//    * ✅ Get step subtitle by step number
//    * @param {number} stepNumber - Step number (1-5)
//    * @returns {string} Step subtitle
//    */
//   getStepSubtitle(stepNumber) {
//     const subtitles = {
//       1: 'Basic personal information, contact details, and address.',
//       2: 'Primary and secondary trade, skill levels, and experience.',
//       3: 'Recent projects, roles, and reference information.',
//       4: 'Work radius, availability, pay rates, and travel preferences.',
//       5: 'Emergency contact information and policy acknowledgments.'
//     }
//     return subtitles[stepNumber] || ''
//   }

//   /**
//    * ✅ Get section name by step number
//    * @param {number} stepNumber - Step number (1-5)
//    * @returns {string} Section name
//    */
//   getSectionName(stepNumber) {
//     const sectionMap = {
//       1: 'basics',
//       2: 'trade',
//       3: 'workHistory',
//       4: 'availability',
//       5: 'emergency'
//     }
//     return sectionMap[stepNumber] || null
//   }

//   /**
//    * ✅ Validate step data before saving
//    * @param {number} stepNumber - Step number (1-5)
//    * @param {object} data - Step data to validate
//    * @returns {Object} { valid: boolean, errors: [] }
//    */
//   validateStep(stepNumber, data) {
//     const errors = []

//     switch (stepNumber) {
//       case 1: // Basics
//         if (!data.legalFirstName) errors.push('First name is required')
//         if (!data.legalLastName) errors.push('Last name is required')
//         if (!data.emailAddress) errors.push('Email address is required')
//         if (!data.mobilePhone) errors.push('Phone number is required')
//         if (!data.dob) errors.push('Date of birth is required')
//         if (!data.addressLine1) errors.push('Address is required')
//         if (!data.city) errors.push('City is required')
//         if (!data.stateCode) errors.push('State is required')
//         if (!data.zip) errors.push('ZIP code is required')
//         break

//       case 2: // Trade
//         if (!data.primaryTrade) errors.push('Primary trade is required')
//         if (!data.workerLevel) errors.push('Worker level is required')
//         if (!data.yearOfExperience) errors.push('Years of experience is required')
//         break

//       case 3: // Work History
//         // At least one project with data
//         const projects = data.projects || []
//         const hasValidProject = projects.some(p => p.name && p.client && p.role && p.start && p.end)
//         if (!hasValidProject) {
//           errors.push('At least one complete project is required')
//         }
//         break

//       case 4: // Availability
//         if (!data.hourlyRate) errors.push('Hourly rate is required')
//         const availability = data.availability || {}
//         const hasDay = Object.keys(availability).some(day => availability[day] === true)
//         if (!hasDay) errors.push('At least one availability day is required')
//         break

//       case 5: // Emergency
//         if (!data.emergencyContactName) errors.push('Emergency contact name is required')
//         if (!data.emergencyContactRelationship) errors.push('Emergency contact relationship is required')
//         if (!data.emergencyContactPhone) errors.push('Emergency contact phone is required')
//         break

//       default:
//         break
//     }

//     return {
//       valid: errors.length === 0,
//       errors
//     }
//   }

//   /**
//    * ✅ Get wizard progress summary for display
//    * @param {string} userId - Firebase UID of the worker
//    * @returns {Promise<Object>} Summary data
//    */
//   async getWizardSummary(userId) {
//     try {
//       if (!userId) throw new Error('User ID is required')

//       const progress = await this.getProgress(userId)
//       const profile = await workerService.getWorkerProfile(userId)

//       const stepTitles = {
//         1: 'Personal Information',
//         2: 'Trade Profile',
//         3: 'Work History',
//         4: 'Availability',
//         5: 'Emergency Contact'
//       }

//       const steps = progress.data.steps || {}
//       const totalSteps = progress.data.totalSteps || 5
//       const completedSteps = Object.keys(steps).length
//       const percentage = Math.round((completedSteps / totalSteps) * 100)

//       // Build step status
//       const stepStatus = []
//       for (let i = 1; i <= totalSteps; i++) {
//         const stepKey = `step${i}`
//         const isCompleted = !!steps[stepKey]
//         stepStatus.push({
//           stepNumber: i,
//           title: stepTitles[i] || `Step ${i}`,
//           completed: isCompleted,
//           data: isCompleted ? steps[stepKey] : null
//         })
//       }

//       return {
//         success: true,
//         data: {
//           steps: stepStatus,
//           completedSteps,
//           totalSteps,
//           percentage,
//           isComplete: progress.data.isComplete,
//           currentStep: progress.data.currentStep,
//           nextStep: progress.data.nextStep,
//           wizard: progress.data.wizard,
//           profile: profile.data
//         }
//       }

//     } catch (error) {
//       console.error('Error getting wizard summary:', error)
//       throw error
//     }
//   }
// }

// // Export singleton instance
// export default new WorkerWizardService()





// src/worker/services/workerWizardService.js
import workerService from './workerService'
import api from '../../services/api'

class WorkerWizardService {
  /**
   * ✅ Save wizard step - Saves to Workers table via workerService
   */
  async saveStep(userId, stepNumber, data) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!stepNumber || stepNumber < 1 || stepNumber > 5) {
        throw new Error('Valid step number (1-5) is required')
      }
      if (!data) throw new Error('Data is required')

      console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)

      const sectionMap = {
        1: 'basics',
        2: 'trade',
        3: 'workHistory',
        4: 'availability',
        5: 'emergency'
      }

      const section = sectionMap[stepNumber]
      
      const result = await workerService.updateSection(userId, section, data)
      await this.updateWizardProgress(userId, stepNumber)
      
      console.log(`✅ Step ${stepNumber} saved to Workers table, progress updated`)
      return result

    } catch (error) {
      console.error(`Error saving step ${stepNumber}:`, error)
      throw error
    }
  }

  /**
   * ✅ Get wizard progress with resume information
   */
  async getProgress(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      console.log(`📊 Getting wizard progress for user: ${userId}`)

      const progress = await workerService.getWizardProgress(userId)
      
      if (!progress.success) {
        return {
          success: true,
          data: {
            steps: {},
            currentStep: 1,
            nextStep: 1,
            isComplete: false,
            totalSteps: 5,
            wizard: null
          }
        }
      }

      return progress

    } catch (error) {
      console.error('Error getting wizard progress:', error)
      throw error
    }
  }

  /**
   * ✅ Update wizard progress
   */
  async updateWizardProgress(userId, stepNumber, completed = false) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!stepNumber || stepNumber < 1 || stepNumber > 5) {
        throw new Error('Valid step number (1-5) is required')
      }

      console.log(`📝 Updating wizard progress: step=${stepNumber}, completed=${completed}`)

      return await workerService.updateWizardProgress(userId, stepNumber, completed)

    } catch (error) {
      console.error('Error updating wizard progress:', error)
      throw error
    }
  }

  /**
   * ✅ Check if wizard needs to resume
   */
  async checkResume(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      const result = await workerService.checkWizardResume(userId)
      console.log(`🔄 Resume check result:`, result)
      return result

    } catch (error) {
      console.error('Error checking wizard resume:', error)
      return { needsResume: false, step: 1, error: error.message }
    }
  }

  /**
   * ✅ Complete the wizard - Create profile in Workers table
   */
  async completeWizard(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      console.log(`🏁 Completing wizard for user: ${userId}`)

      // ✅ Get all wizard data
      const profile = await workerService.getWorkerProfile(userId)
      
      if (!profile.success || !profile.data) {
        throw new Error('No profile data found. Please complete wizard steps first.')
      }

      const data = profile.data

      // ✅ Build complete profile with all sections
      const completeProfile = {
        basics: data.basics || {},
        trade: data.trade || {},
        workHistory: data.workHistory || {},
        availability: data.availability || {},
        emergency: data.emergency || {},
        certifications: data.certifications || {},
        tax: data.tax || {},
        payment: data.payment || {},
        medical: data.medical || {},
        wizard: {
          completed: true,
          completedAt: new Date().toISOString(),
          startedAt: data.wizard?.startedAt || new Date().toISOString(),
          lastUpdatedAt: new Date().toISOString()
        }
      }

      // ✅ Save complete profile
      await workerService.updateSection(userId, 'wizard', {
        completed: true,
        completedAt: new Date().toISOString()
      })

      console.log(`✅ Wizard completed for user: ${userId}`)

      return {
        success: true,
        message: 'Wizard completed successfully',
        data: {
          userId,
          completedAt: new Date().toISOString()
        }
      }

    } catch (error) {
      console.error('Error completing wizard:', error)
      throw error
    }
  }

  /**
   * ✅ Get current step data
   */
  async getStepData(userId, stepNumber) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!stepNumber || stepNumber < 1 || stepNumber > 5) {
        throw new Error('Valid step number (1-5) is required')
      }

      const progress = await this.getProgress(userId)
      
      if (progress.success && progress.data.steps) {
        const stepKey = `step${stepNumber}`
        return progress.data.steps[stepKey] || null
      }
      
      return null

    } catch (error) {
      console.error(`Error getting step ${stepNumber} data:`, error)
      throw error
    }
  }

  /**
   * ✅ Check if wizard is complete
   */
  async isWizardComplete(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      const progress = await this.getProgress(userId)
      return progress.success && progress.data.isComplete === true

    } catch (error) {
      console.error('Error checking wizard completion:', error)
      return false
    }
  }

  /**
   * ✅ Upload certificate to S3 and save to Workers table
   */
  async uploadCertificate(userId, file, rowIndex = 0) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!file) throw new Error('File is required')

      console.log(`📄 Uploading certificate (row ${rowIndex}) for user: ${userId}`)

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB')
      }

      const allowedTypes = [
        'application/pdf',
        'image/jpeg',
        'image/png',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Allowed: PDF, JPEG, PNG, DOC, DOCX')
      }

      const response = await api.post('/upload/certificate', {
        userId,
        fileName: file.name,
        fileType: file.type,
        rowIndex
      })

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to get upload URL')
      }

      const { uploadUrl, fileKey, fileUrl } = response.data.data

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
          'Content-Disposition': `inline; filename="${encodeURIComponent(file.name)}"`
        }
      })

      if (!uploadResponse.ok) {
        throw new Error(`S3 upload failed with status: ${uploadResponse.status}`)
      }

      console.log(`✅ Certificate (row ${rowIndex}) uploaded to S3`)

      const updatedCertData = await this.updateCertificationRow(
        userId,
        rowIndex,
        {
          uploadRef: file.name,
          fileKey: fileKey,
          fileUrl: fileUrl,
          uploadedAt: new Date().toISOString()
        }
      )

      console.log(`✅ Certificate saved to Workers table`)

      return {
        success: true,
        fileKey,
        fileUrl,
        fileName: file.name,
        rowIndex,
        certData: updatedCertData
      }

    } catch (error) {
      console.error('Error uploading certificate:', error)
      throw error
    }
  }

  /**
   * ✅ Update a specific certification row in Workers table
   */
  async updateCertificationRow(userId, rowIndex, rowData) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (rowIndex === undefined || rowIndex === null) {
        throw new Error('Row index is required')
      }
      if (!rowData) throw new Error('Row data is required')

      console.log(`📝 Updating certification row ${rowIndex} for user: ${userId}`)

      const profile = await workerService.getWorkerProfile(userId)
      const existingCerts = profile.data?.certifications || {}
      const certRows = existingCerts.certRows || []

      while (certRows.length <= rowIndex) {
        certRows.push({
          name: '',
          cardNumber: '',
          issueDate: '',
          expirationDate: '',
          uploadRef: '',
          fileKey: '',
          fileUrl: ''
        })
      }

      certRows[rowIndex] = {
        ...certRows[rowIndex],
        ...rowData
      }

      const updatedCerts = {
        ...existingCerts,
        certRows,
        lastUpdatedAt: new Date().toISOString()
      }

      await workerService.updateCertifications(userId, updatedCerts)

      return updatedCerts

    } catch (error) {
      console.error(`Error updating certification row ${rowIndex}:`, error)
      throw error
    }
  }

  /**
   * ✅ Get wizard completion percentage
   */
  async getCompletionPercentage(userId) {
    try {
      if (!userId) throw new Error('User ID is required')

      const progress = await this.getProgress(userId)
      
      if (!progress.success) return 0

      const { steps, totalSteps } = progress.data
      const completedSteps = Object.keys(steps).length
      
      return Math.round((completedSteps / totalSteps) * 100)

    } catch (error) {
      console.error('Error calculating completion percentage:', error)
      return 0
    }
  }

  /**
   * ✅ Upload profile image
   */
  async uploadProfileImage(userId, file) {
    try {
      if (!userId) throw new Error('User ID is required')
      if (!file) throw new Error('File is required')

      console.log(`📸 Uploading profile image for user: ${userId}`)

      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB')
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(file.type)) {
        throw new Error('Invalid file type. Allowed: JPEG, PNG, GIF, WEBP')
      }

      const response = await api.post('/upload/profile', {
        userId,
        fileName: file.name,
        fileType: file.type
      })

      if (!response.data.success) {
        throw new Error(response.data.message || 'Failed to get upload URL')
      }

      const { uploadUrl, fileKey, fileUrl, viewUrl } = response.data.data

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      })

      if (!uploadResponse.ok) {
        throw new Error(`S3 upload failed with status: ${uploadResponse.status}`)
      }

      console.log(`✅ Profile image uploaded to S3`)

      const profile = await workerService.getWorkerProfile(userId)
      const basics = profile.data?.basics || {}

      await workerService.updateBasics(userId, {
        ...basics,
        profilePreview: viewUrl || fileUrl,
        profileImageKey: fileKey,
        profileImageUrl: fileUrl,
        profileImageUpdatedAt: new Date().toISOString()
      })

      console.log(`✅ Profile image saved to Workers table`)

      return {
        success: true,
        fileKey,
        fileUrl,
        viewUrl: viewUrl || fileUrl,
        fileName: file.name
      }

    } catch (error) {
      console.error('Error uploading profile image:', error)
      throw error
    }
  }

  /**
   * ✅ Get step title by step number
   */
  getStepTitle(stepNumber) {
    const titles = {
      1: 'Personal Information',
      2: 'Trade Profile & Skill Matrix',
      3: 'Work History & Project Experience',
      4: 'Availability, Travel & Pay Preferences',
      5: 'Emergency Contact & Acknowledgments'
    }
    return titles[stepNumber] || `Step ${stepNumber}`
  }

  /**
   * ✅ Get step subtitle by step number
   */
  getStepSubtitle(stepNumber) {
    const subtitles = {
      1: 'Basic personal information, contact details, and address.',
      2: 'Primary and secondary trade, skill levels, and experience.',
      3: 'Recent projects, roles, and reference information.',
      4: 'Work radius, availability, pay rates, and travel preferences.',
      5: 'Emergency contact information and policy acknowledgments.'
    }
    return subtitles[stepNumber] || ''
  }

  /**
   * ✅ Get section name by step number
   */
  getSectionName(stepNumber) {
    const sectionMap = {
      1: 'basics',
      2: 'trade',
      3: 'workHistory',
      4: 'availability',
      5: 'emergency'
    }
    return sectionMap[stepNumber] || null
  }
}

export default new WorkerWizardService()