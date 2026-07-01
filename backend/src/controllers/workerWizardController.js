// backend/src/controllers/workerWizardController.js
import { docClient, WORKER_WIZARD_TABLE, WORKERS_TABLE } from '../config/aws.js'
import { 
  PutCommand, 
  GetCommand, 
  QueryCommand, 
  UpdateCommand, 
  TransactWriteCommand 
} from '@aws-sdk/lib-dynamodb'

// ============================================
// 💾 SAVE WIZARD STEP
// ============================================

export const saveWizardStep = async (req, res) => {
  try {
    const { userId, stepNumber, stepData } = req.body
    
    if (!userId || !stepNumber || !stepData) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, stepNumber, stepData'
      })
    }

    console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)

    const timestamp = new Date().toISOString()
    
    const item = {
      PK: `WORKER#${userId}`,
      SK: `STEP#${stepNumber}`,
      stepNumber,
      data: stepData,
      updatedAt: timestamp,
      ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days TTL
    }

    if (stepNumber === 1) {
      item.createdAt = timestamp
    }

    await docClient.send(new PutCommand({
      TableName: WORKER_WIZARD_TABLE,
      Item: item
    }))

    // Update wizard progress
    await updateWizardProgress(userId, stepNumber)

    res.status(200).json({
      success: true,
      message: `Step ${stepNumber} saved successfully`,
      data: item
    })

  } catch (error) {
    console.error('Error saving wizard step:', error)
    res.status(500).json({
      success: false,
      message: 'Error saving wizard step',
      error: error.message
    })
  }
}

// ============================================
// 📊 GET WIZARD PROGRESS
// ============================================

export const getWizardProgress = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId'
      })
    }

    console.log(`📊 Getting wizard progress for user: ${userId}`)

    // Get all wizard steps
    const result = await docClient.send(new QueryCommand({
      TableName: WORKER_WIZARD_TABLE,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': 'STEP#'
      }
    }))

    // Get status
    const statusResult = await docClient.send(new GetCommand({
      TableName: WORKER_WIZARD_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'STATUS'
      }
    }))

    // Organize data
    const steps = {}
    let currentStep = 0
    let isComplete = false

    result.Items.forEach(item => {
      const stepNum = item.stepNumber
      steps[`step${stepNum}`] = item.data
      if (stepNum > currentStep) currentStep = stepNum
    })

    if (statusResult.Item) {
      isComplete = statusResult.Item.isComplete || false
      currentStep = statusResult.Item.currentStep || currentStep
    }

    res.status(200).json({
      success: true,
      data: {
        currentStep,
        completedSteps: Object.keys(steps).length,
        steps,
        isComplete,
        lastUpdated: statusResult.Item?.updatedAt || null
      }
    })

  } catch (error) {
    console.error('Error getting wizard progress:', error)
    res.status(500).json({
      success: false,
      message: 'Error getting wizard progress',
      error: error.message
    })
  }
}

// ============================================
// 🔄 UPDATE WIZARD PROGRESS
// ============================================

export const updateWizardProgress = async (userId, stepNumber) => {
  try {
    await docClient.send(new PutCommand({
      TableName: WORKER_WIZARD_TABLE,
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'STATUS',
        currentStep: stepNumber,
        isComplete: stepNumber === 5,
        lastUpdated: new Date().toISOString(),
        ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
      }
    }))
  } catch (error) {
    console.error('Error updating wizard progress:', error)
    throw error
  }
}

// ============================================
// ✅ COMPLETE WIZARD
// ============================================

export const completeWizard = async (req, res) => {
  try {
    const { userId } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId'
      })
    }

    console.log(`✅ Completing wizard for user: ${userId}`)

    // Get all wizard data
    const result = await docClient.send(new QueryCommand({
      TableName: WORKER_WIZARD_TABLE,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': 'STEP#'
      }
    }))

    // Build production data
    const wizardSteps = {}
    result.Items.forEach(item => {
      wizardSteps[`step${item.stepNumber}`] = item.data
    })

    // Validate all steps are complete
    for (let i = 1; i <= 5; i++) {
      if (!wizardSteps[`step${i}`]) {
        return res.status(400).json({
          success: false,
          message: `Step ${i} is incomplete`
        })
      }
    }

    // Transform to production format
    const workerData = transformToProductionData(wizardSteps, userId)

    // Save to production table using transaction
    await saveToProductionTable(userId, workerData)

    // Mark wizard as complete
    await docClient.send(new UpdateCommand({
      TableName: WORKER_WIZARD_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'STATUS'
      },
      UpdateExpression: 'SET isComplete = :complete, completedAt = :completedAt',
      ExpressionAttributeValues: {
        ':complete': true,
        ':completedAt': new Date().toISOString()
      }
    }))

    res.status(200).json({
      success: true,
      message: 'Wizard completed successfully',
      data: { workerId: userId }
    })

  } catch (error) {
    console.error('Error completing wizard:', error)
    res.status(500).json({
      success: false,
      message: 'Error completing wizard',
      error: error.message
    })
  }
}

// ============================================
// 🔄 TRANSFORM TO PRODUCTION DATA
// ============================================

const transformToProductionData = (wizardSteps, userId) => {
  const step1 = wizardSteps.step1 || {}
  const step2 = wizardSteps.step2 || {}
  const step3 = wizardSteps.step3 || {}
  const step4 = wizardSteps.step4 || {}
  const step5 = wizardSteps.step5 || {}

  return {
    profile: {
      fullName: `${step1.legalFirstName || ''} ${step1.legalLastName || ''}`.trim(),
      firstName: step1.legalFirstName || '',
      lastName: step1.legalLastName || '',
      email: step1.emailAddress || '',
      phone: step1.mobilePhone || '',
      dob: step1.dob || '',
      address: {
        line1: step1.addressLine1 || '',
        line2: step1.addressLine2 || '',
        city: step1.city || '',
        state: step1.stateCode || '',
        zip: step1.zip || ''
      },
      languages: {
        english: step1.english || false,
        spanish: step1.spanish || false,
        englishSpanish: step1.englishSpanish || false
      },
      profileImage: step1.profileImageUrl || step1.profilePreview || null,
      profileImageKey: step1.profileImageKey || null
    },
    trade: {
      primary: step2.primaryTrade || '',
      primaryOther: step2.primaryOtherTrade || '',
      primaryLevel: step2.workerLevel || '',
      primaryExperience: parseInt(step2.yearOfExperience) || 0,
      secondary: step2.secondaryTrade || '',
      secondaryOther: step2.secondaryOtherTrade || '',
      secondaryLevel: step2.secondaryWorkerLevel || '',
      secondaryExperience: parseInt(step2.secondaryYearOfExperience) || 0,
      leadForemanResponsibilities: step2.leadForemanResponsibilities || {},
      metalFramingSkills: step2.metalFramingSkills || {},
      drywallHangingSkills: step2.drywallHangingSkills || {},
      tapingFinishingSkills: step2.tapingFinishingSkills || {},
      acousticalCeilingsSkills: step2.acousticalCeilingsSkills || {},
      interiorCarpentrySkills: step2.interiorCarpentrySkills || {},
      helpersLabourersSkills: step2.helpersLabourersSkills || {},
      insulationSkills: step2.insulationSkills || {},
      demolitionSkills: step2.demolitionSkills || {},
      secondaryLeadForemanResponsibilities: step2.secondaryLeadForemanResponsibilities || {},
      secondaryMetalFramingSkills: step2.secondaryMetalFramingSkills || {},
      secondaryDrywallHangingSkills: step2.secondaryDrywallHangingSkills || {},
      secondaryTapingFinishingSkills: step2.secondaryTapingFinishingSkills || {},
      secondaryAcousticalCeilingsSkills: step2.secondaryAcousticalCeilingsSkills || {},
      secondaryInteriorCarpentrySkills: step2.secondaryInteriorCarpentrySkills || {},
      secondaryHelpersLabourersSkills: step2.secondaryHelpersLabourersSkills || {},
      secondaryInsulationSkills: step2.secondaryInsulationSkills || {},
      secondaryDemolitionSkills: step2.secondaryDemolitionSkills || {},
      additionalSkillsTools: step2.additionalSkillsTools || ''
    },
    workHistory: {
      projects: step3.projects || [],
      projectConditions: step3.projectConditions || {},
      referenceName: step3.referenceName || '',
      referenceTitle: step3.referenceTitle || '',
      referencePhone: step3.referencePhone || '',
      reviewerNotes: step3.reviewerNotes || ''
    },
    availability: {
      hourlyRate: step4.hourlyRate || '',
      payPrefs: step4.payPrefs || {},
      travelRadius: step4.travelRadius || 50,
      willingToTravel: step4.willingToTravel || '',
      travelPrefs: step4.travelPrefs || {},
      availability: step4.availability || {}
    },
    certifications: {
      certChecklist: step5.certChecklist || {},
      certRows: step5.certRows || [],
      safetyFlags: step5.safetyFlags || {}
    },
    emergencyContact: {
      name: step5.emergencyContactName || '',
      relationship: step5.emergencyContactRelationship || '',
      phone: step5.emergencyContactPhone || ''
    },
    policyAcks: step5.policyAcks || {},
    status: 'PENDING_VERIFICATION',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId
  }
}

// ============================================
// 💾 SAVE TO PRODUCTION TABLE
// ============================================

const saveToProductionTable = async (userId, workerData) => {
  const items = []

  // Profile
  items.push({
    PutRequest: {
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE',
        ...workerData.profile,
        status: workerData.status,
        createdAt: workerData.createdAt,
        updatedAt: workerData.updatedAt,
        userId: workerData.userId
      }
    }
  })

  // Trade
  items.push({
    PutRequest: {
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'TRADE',
        ...workerData.trade,
        updatedAt: workerData.updatedAt
      }
    }
  })

  // Work History
  items.push({
    PutRequest: {
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'WORK_HISTORY',
        ...workerData.workHistory,
        updatedAt: workerData.updatedAt
      }
    }
  })

  // Availability
  items.push({
    PutRequest: {
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'AVAILABILITY',
        ...workerData.availability,
        updatedAt: workerData.updatedAt
      }
    }
  })

  // Certifications
  items.push({
    PutRequest: {
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'CERTIFICATIONS',
        ...workerData.certifications,
        updatedAt: workerData.updatedAt
      }
    }
  })

  // Emergency Contact
  items.push({
    PutRequest: {
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'EMERGENCY_CONTACT',
        ...workerData.emergencyContact,
        updatedAt: workerData.updatedAt
      }
    }
  })

  // Policy Acknowledgments
  items.push({
    PutRequest: {
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'POLICY_ACKS',
        ...workerData.policyAcks,
        updatedAt: workerData.updatedAt
      }
    }
  })

  // Batch write to production table
  await docClient.send(new TransactWriteCommand({
    TransactItems: items.map(item => ({ Put: item.PutRequest }))
  }))

  console.log(`✅ Worker data saved to production table for user: ${userId}`)
}