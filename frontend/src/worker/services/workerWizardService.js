
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
      if (!stepNumber || stepNumber < 1 || stepNumber > 6) {
        throw new Error('Valid step number (1-6) is required')
      }
      if (!data) throw new Error('Data is required')

      console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)

      // ✅ Updated section mapping for 6 steps
      const sectionMap = {
        1: 'basics',
        2: 'trade',        // Trade Profile & Skill Matrix
        3: 'trade',        // Tools, Certifications & Requirements (also goes to trade section)
        4: 'workHistory',
        5: 'availability',
        6: 'emergency'
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
            totalSteps: 6, // ✅ Updated to 6
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
      if (!stepNumber || stepNumber < 1 || stepNumber > 6) {
        throw new Error('Valid step number (1-6) is required')
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
      if (!stepNumber || stepNumber < 1 || stepNumber > 6) {
        throw new Error('Valid step number (1-6) is required')
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
   * ✅ Get step title by step number (Updated for 6 steps)
   */
  getStepTitle(stepNumber) {
    const titles = {
      1: 'Personal Information',
      2: 'Trade Profile & Skill Matrix',
      3: 'Tools, Certifications & Requirements',
      4: 'Work History & Project Experience',
      5: 'Availability, Travel & Pay Preferences',
      6: 'Emergency Contact & Acknowledgments'
    }
    return titles[stepNumber] || `Step ${stepNumber}`
  }

  /**
   * ✅ Get step subtitle by step number (Updated for 6 steps)
   */
  getStepSubtitle(stepNumber) {
    const subtitles = {
      1: 'Basic personal information, contact details, and address.',
      2: 'Select your primary trade, skill groups, and experience levels.',
      3: 'Select the tools, certifications, and requirements you possess.',
      4: 'Recent projects, roles, and reference information.',
      5: 'Work radius, availability, pay rates, and travel preferences.',
      6: 'Emergency contact information and policy acknowledgments.'
    }
    return subtitles[stepNumber] || ''
  }

  /**
   * ✅ Get section name by step number (Updated for 6 steps)
   */
  getSectionName(stepNumber) {
    const sectionMap = {
      1: 'basics',
      2: 'trade',
      3: 'trade',  // Tools & Certifications also go to trade section
      4: 'workHistory',
      5: 'availability',
      6: 'emergency'
    }
    return sectionMap[stepNumber] || null
  }
}

export default new WorkerWizardService()