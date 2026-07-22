// // backend/src/controllers/workerWizardController.js
// import { docClient, WORKER_WIZARD_TABLE, WORKERS_TABLE } from '../config/aws.js'
// import { 
//   PutCommand, 
//   GetCommand, 
//   QueryCommand, 
//   UpdateCommand, 
//   TransactWriteCommand 
// } from '@aws-sdk/lib-dynamodb'

// // ============================================
// // 💾 SAVE WIZARD STEP
// // ============================================

// export const saveWizardStep = async (req, res) => {
//   try {
//     const { userId, stepNumber, stepData } = req.body
    
//     if (!userId || !stepNumber || !stepData) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: userId, stepNumber, stepData'
//       })
//     }

//     console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)

//     const timestamp = new Date().toISOString()
    
//     const item = {
//       PK: `WORKER#${userId}`,
//       SK: `STEP#${stepNumber}`,
//       stepNumber,
//       data: stepData,
//       updatedAt: timestamp,
//       ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60) // 30 days TTL
//     }

//     if (stepNumber === 1) {
//       item.createdAt = timestamp
//     }

//     await docClient.send(new PutCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Item: item
//     }))

//     // Update wizard progress
//     await updateWizardProgress(userId, stepNumber)

//     res.status(200).json({
//       success: true,
//       message: `Step ${stepNumber} saved successfully`,
//       data: item
//     })

//   } catch (error) {
//     console.error('Error saving wizard step:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error saving wizard step',
//       error: error.message
//     })
//   }
// }

// // ============================================
// // 📊 GET WIZARD PROGRESS
// // ============================================

// export const getWizardProgress = async (req, res) => {
//   try {
//     const { userId } = req.params

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`📊 Getting wizard progress for user: ${userId}`)

//     // Get all wizard steps
//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'STEP#'
//       }
//     }))

//     // Get status
//     const statusResult = await docClient.send(new GetCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'STATUS'
//       }
//     }))

//     // Organize data
//     const steps = {}
//     let currentStep = 0
//     let isComplete = false

//     result.Items.forEach(item => {
//       const stepNum = item.stepNumber
//       steps[`step${stepNum}`] = item.data
//       if (stepNum > currentStep) currentStep = stepNum
//     })

//     if (statusResult.Item) {
//       isComplete = statusResult.Item.isComplete || false
//       currentStep = statusResult.Item.currentStep || currentStep
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         currentStep,
//         completedSteps: Object.keys(steps).length,
//         steps,
//         isComplete,
//         lastUpdated: statusResult.Item?.updatedAt || null
//       }
//     })

//   } catch (error) {
//     console.error('Error getting wizard progress:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error getting wizard progress',
//       error: error.message
//     })
//   }
// }

// // ============================================
// // 🔄 UPDATE WIZARD PROGRESS
// // ============================================

// export const updateWizardProgress = async (userId, stepNumber) => {
//   try {
//     await docClient.send(new PutCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'STATUS',
//         currentStep: stepNumber,
//         isComplete: stepNumber === 5,
//         lastUpdated: new Date().toISOString(),
//         ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
//       }
//     }))
//   } catch (error) {
//     console.error('Error updating wizard progress:', error)
//     throw error
//   }
// }

// // ============================================
// // ✅ COMPLETE WIZARD
// // ============================================

// export const completeWizard = async (req, res) => {
//   try {
//     const { userId } = req.body

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`✅ Completing wizard for user: ${userId}`)

//     // Get all wizard data
//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'STEP#'
//       }
//     }))

//     // Build production data
//     const wizardSteps = {}
//     result.Items.forEach(item => {
//       wizardSteps[`step${item.stepNumber}`] = item.data
//     })

//     // Validate all steps are complete
//     for (let i = 1; i <= 5; i++) {
//       if (!wizardSteps[`step${i}`]) {
//         return res.status(400).json({
//           success: false,
//           message: `Step ${i} is incomplete`
//         })
//       }
//     }

//     // Transform to production format
//     const workerData = transformToProductionData(wizardSteps, userId)

//     // Save to production table using transaction
//     await saveToProductionTable(userId, workerData)

//     // Mark wizard as complete
//     await docClient.send(new UpdateCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'STATUS'
//       },
//       UpdateExpression: 'SET isComplete = :complete, completedAt = :completedAt',
//       ExpressionAttributeValues: {
//         ':complete': true,
//         ':completedAt': new Date().toISOString()
//       }
//     }))

//     res.status(200).json({
//       success: true,
//       message: 'Wizard completed successfully',
//       data: { workerId: userId }
//     })

//   } catch (error) {
//     console.error('Error completing wizard:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error completing wizard',
//       error: error.message
//     })
//   }
// }

// // ============================================
// // 🔄 TRANSFORM TO PRODUCTION DATA
// // ============================================

// const transformToProductionData = (wizardSteps, userId) => {
//   const step1 = wizardSteps.step1 || {}
//   const step2 = wizardSteps.step2 || {}
//   const step3 = wizardSteps.step3 || {}
//   const step4 = wizardSteps.step4 || {}
//   const step5 = wizardSteps.step5 || {}

//   return {
//     profile: {
//       fullName: `${step1.legalFirstName || ''} ${step1.legalLastName || ''}`.trim(),
//       firstName: step1.legalFirstName || '',
//       lastName: step1.legalLastName || '',
//       email: step1.emailAddress || '',
//       phone: step1.mobilePhone || '',
//       dob: step1.dob || '',
//       address: {
//         line1: step1.addressLine1 || '',
//         line2: step1.addressLine2 || '',
//         city: step1.city || '',
//         state: step1.stateCode || '',
//         zip: step1.zip || ''
//       },
//       languages: {
//         english: step1.english || false,
//         spanish: step1.spanish || false,
//         englishSpanish: step1.englishSpanish || false
//       },
//       profileImage: step1.profileImageUrl || step1.profilePreview || null,
//       profileImageKey: step1.profileImageKey || null
//     },
//     trade: {
//       primary: step2.primaryTrade || '',
//       primaryOther: step2.primaryOtherTrade || '',
//       primaryLevel: step2.workerLevel || '',
//       primaryExperience: parseInt(step2.yearOfExperience) || 0,
//       secondary: step2.secondaryTrade || '',
//       secondaryOther: step2.secondaryOtherTrade || '',
//       secondaryLevel: step2.secondaryWorkerLevel || '',
//       secondaryExperience: parseInt(step2.secondaryYearOfExperience) || 0,
//       leadForemanResponsibilities: step2.leadForemanResponsibilities || {},
//       metalFramingSkills: step2.metalFramingSkills || {},
//       drywallHangingSkills: step2.drywallHangingSkills || {},
//       tapingFinishingSkills: step2.tapingFinishingSkills || {},
//       acousticalCeilingsSkills: step2.acousticalCeilingsSkills || {},
//       interiorCarpentrySkills: step2.interiorCarpentrySkills || {},
//       helpersLabourersSkills: step2.helpersLabourersSkills || {},
//       insulationSkills: step2.insulationSkills || {},
//       demolitionSkills: step2.demolitionSkills || {},
//       secondaryLeadForemanResponsibilities: step2.secondaryLeadForemanResponsibilities || {},
//       secondaryMetalFramingSkills: step2.secondaryMetalFramingSkills || {},
//       secondaryDrywallHangingSkills: step2.secondaryDrywallHangingSkills || {},
//       secondaryTapingFinishingSkills: step2.secondaryTapingFinishingSkills || {},
//       secondaryAcousticalCeilingsSkills: step2.secondaryAcousticalCeilingsSkills || {},
//       secondaryInteriorCarpentrySkills: step2.secondaryInteriorCarpentrySkills || {},
//       secondaryHelpersLabourersSkills: step2.secondaryHelpersLabourersSkills || {},
//       secondaryInsulationSkills: step2.secondaryInsulationSkills || {},
//       secondaryDemolitionSkills: step2.secondaryDemolitionSkills || {},
//       additionalSkillsTools: step2.additionalSkillsTools || ''
//     },
//     workHistory: {
//       projects: step3.projects || [],
//       projectConditions: step3.projectConditions || {},
//       referenceName: step3.referenceName || '',
//       referenceTitle: step3.referenceTitle || '',
//       referencePhone: step3.referencePhone || '',
//       reviewerNotes: step3.reviewerNotes || ''
//     },
//     availability: {
//       hourlyRate: step4.hourlyRate || '',
//       payPrefs: step4.payPrefs || {},
//       travelRadius: step4.travelRadius || 50,
//       willingToTravel: step4.willingToTravel || '',
//       travelPrefs: step4.travelPrefs || {},
//       availability: step4.availability || {}
//     },
//     certifications: {
//       certChecklist: step5.certChecklist || {},
//       certRows: step5.certRows || [],
//       safetyFlags: step5.safetyFlags || {}
//     },
//     emergencyContact: {
//       name: step5.emergencyContactName || '',
//       relationship: step5.emergencyContactRelationship || '',
//       phone: step5.emergencyContactPhone || ''
//     },
//     policyAcks: step5.policyAcks || {},
//     status: 'PENDING_VERIFICATION',
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     userId
//   }
// }

// // ============================================
// // 💾 SAVE TO PRODUCTION TABLE
// // ============================================

// const saveToProductionTable = async (userId, workerData) => {
//   const items = []

//   // Profile
//   items.push({
//     PutRequest: {
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'PROFILE',
//         ...workerData.profile,
//         status: workerData.status,
//         createdAt: workerData.createdAt,
//         updatedAt: workerData.updatedAt,
//         userId: workerData.userId
//       }
//     }
//   })

//   // Trade
//   items.push({
//     PutRequest: {
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'TRADE',
//         ...workerData.trade,
//         updatedAt: workerData.updatedAt
//       }
//     }
//   })

//   // Work History
//   items.push({
//     PutRequest: {
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'WORK_HISTORY',
//         ...workerData.workHistory,
//         updatedAt: workerData.updatedAt
//       }
//     }
//   })

//   // Availability
//   items.push({
//     PutRequest: {
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'AVAILABILITY',
//         ...workerData.availability,
//         updatedAt: workerData.updatedAt
//       }
//     }
//   })

//   // Certifications
//   items.push({
//     PutRequest: {
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'CERTIFICATIONS',
//         ...workerData.certifications,
//         updatedAt: workerData.updatedAt
//       }
//     }
//   })

//   // Emergency Contact
//   items.push({
//     PutRequest: {
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'EMERGENCY_CONTACT',
//         ...workerData.emergencyContact,
//         updatedAt: workerData.updatedAt
//       }
//     }
//   })

//   // Policy Acknowledgments
//   items.push({
//     PutRequest: {
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'POLICY_ACKS',
//         ...workerData.policyAcks,
//         updatedAt: workerData.updatedAt
//       }
//     }
//   })

//   // Batch write to production table
//   await docClient.send(new TransactWriteCommand({
//     TransactItems: items.map(item => ({ Put: item.PutRequest }))
//   }))

//   console.log(`✅ Worker data saved to production table for user: ${userId}`)
// }


// import { docClient, WORKER_WIZARD_TABLE, WORKERS_TABLE } from '../config/aws.js'
// import { 
//   PutCommand, 
//   GetCommand, 
//   QueryCommand, 
//   UpdateCommand,
//   BatchWriteCommand
// } from '@aws-sdk/lib-dynamodb'

// // ============================================
// // 💾 SAVE WIZARD STEP
// // ============================================

// export const saveWizardStep = async (req, res) => {
//   try {
//     const { userId, stepNumber, stepData } = req.body
    
//     if (!userId || !stepNumber || !stepData) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: userId, stepNumber, stepData'
//       })
//     }

//     console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)

//     const timestamp = new Date().toISOString()
    
//     const item = {
//       PK: `WORKER#${userId}`,
//       SK: `STEP#${stepNumber}`,
//       stepNumber,
//       data: stepData,
//       updatedAt: timestamp,
//       ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
//     }

//     if (stepNumber === 1) {
//       item.createdAt = timestamp
//     }

//     await docClient.send(new PutCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Item: item
//     }))

//     await updateWizardProgress(userId, stepNumber)

//     res.status(200).json({
//       success: true,
//       message: `Step ${stepNumber} saved successfully`,
//       data: item
//     })

//   } catch (error) {
//     console.error('Error saving wizard step:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error saving wizard step',
//       error: error.message
//     })
//   }
// }

// // ============================================
// // 📊 GET WIZARD PROGRESS
// // ============================================

// export const getWizardProgress = async (req, res) => {
//   try {
//     const { userId } = req.params

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`📊 Getting wizard progress for user: ${userId}`)

//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'STEP#'
//       }
//     }))

//     const statusResult = await docClient.send(new GetCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'STATUS'
//       }
//     }))

//     const steps = {}
//     let currentStep = 0
//     let isComplete = false

//     result.Items.forEach(item => {
//       const stepNum = item.stepNumber
//       steps[`step${stepNum}`] = item.data
//       if (stepNum > currentStep) currentStep = stepNum
//     })

//     if (statusResult.Item) {
//       isComplete = statusResult.Item.isComplete || false
//       currentStep = statusResult.Item.currentStep || currentStep
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         currentStep,
//         completedSteps: Object.keys(steps).length,
//         steps,
//         isComplete,
//         lastUpdated: statusResult.Item?.updatedAt || null
//       }
//     })

//   } catch (error) {
//     console.error('Error getting wizard progress:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error getting wizard progress',
//       error: error.message
//     })
//   }
// }

// // ============================================
// // 🔄 UPDATE WIZARD PROGRESS
// // ============================================

// export const updateWizardProgress = async (userId, stepNumber) => {
//   try {
//     await docClient.send(new PutCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'STATUS',
//         currentStep: stepNumber,
//         isComplete: stepNumber === 5,
//         lastUpdated: new Date().toISOString(),
//         ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
//       }
//     }))
//   } catch (error) {
//     console.error('Error updating wizard progress:', error)
//     throw error
//   }
// }

// // ============================================
// // ✅ COMPLETE WIZARD
// // ============================================

// export const completeWizard = async (req, res) => {
//   try {
//     const { userId } = req.body

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`✅ Completing wizard for user: ${userId}`)

//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'STEP#'
//       }
//     }))

//     const wizardSteps = {}
//     result.Items.forEach(item => {
//       wizardSteps[`step${item.stepNumber}`] = item.data
//     })

//     for (let i = 1; i <= 5; i++) {
//       if (!wizardSteps[`step${i}`]) {
//         return res.status(400).json({
//           success: false,
//           message: `Step ${i} is incomplete`
//         })
//       }
//     }

//     const workerData = transformToProductionData(wizardSteps, userId)
//     await saveToProductionTable(userId, workerData)

//     await docClient.send(new UpdateCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'STATUS'
//       },
//       UpdateExpression: 'SET isComplete = :complete, completedAt = :completedAt',
//       ExpressionAttributeValues: {
//         ':complete': true,
//         ':completedAt': new Date().toISOString()
//       }
//     }))

//     res.status(200).json({
//       success: true,
//       message: 'Wizard completed successfully',
//       data: { workerId: userId }
//     })

//   } catch (error) {
//     console.error('Error completing wizard:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error completing wizard',
//       error: error.message
//     })
//   }
// }

// // ============================================
// // 🔄 TRANSFORM TO PRODUCTION DATA
// // ============================================

// const transformToProductionData = (wizardSteps, userId) => {
//   const step1 = wizardSteps.step1 || {}
//   const step2 = wizardSteps.step2 || {}
//   const step3 = wizardSteps.step3 || {}
//   const step4 = wizardSteps.step4 || {}
//   const step5 = wizardSteps.step5 || {}

//   return {
//     profile: {
//       fullName: `${step1.legalFirstName || ''} ${step1.legalLastName || ''}`.trim(),
//       firstName: step1.legalFirstName || '',
//       lastName: step1.legalLastName || '',
//       email: step1.emailAddress || '',
//       phone: step1.mobilePhone || '',
//       dob: step1.dob || '',
//       address: {
//         line1: step1.addressLine1 || '',
//         line2: step1.addressLine2 || '',
//         city: step1.city || '',
//         state: step1.stateCode || '',
//         zip: step1.zip || ''
//       },
//       languages: {
//         english: step1.english || false,
//         spanish: step1.spanish || false,
//         englishSpanish: step1.englishSpanish || false
//       },
//       profileImage: step1.profileImageUrl || step1.profilePreview || null,
//       profileImageKey: step1.profileImageKey || null
//     },
//     trade: {
//       primary: step2.primaryTrade || '',
//       primaryOther: step2.primaryOtherTrade || '',
//       primaryLevel: step2.workerLevel || '',
//       primaryExperience: parseInt(step2.yearOfExperience) || 0,
//       secondary: step2.secondaryTrade || '',
//       secondaryOther: step2.secondaryOtherTrade || '',
//       secondaryLevel: step2.secondaryWorkerLevel || '',
//       secondaryExperience: parseInt(step2.secondaryYearOfExperience) || 0,
//       leadForemanResponsibilities: step2.leadForemanResponsibilities || {},
//       metalFramingSkills: step2.metalFramingSkills || {},
//       drywallHangingSkills: step2.drywallHangingSkills || {},
//       tapingFinishingSkills: step2.tapingFinishingSkills || {},
//       acousticalCeilingsSkills: step2.acousticalCeilingsSkills || {},
//       interiorCarpentrySkills: step2.interiorCarpentrySkills || {},
//       helpersLabourersSkills: step2.helpersLabourersSkills || {},
//       insulationSkills: step2.insulationSkills || {},
//       demolitionSkills: step2.demolitionSkills || {},
//       secondaryLeadForemanResponsibilities: step2.secondaryLeadForemanResponsibilities || {},
//       secondaryMetalFramingSkills: step2.secondaryMetalFramingSkills || {},
//       secondaryDrywallHangingSkills: step2.secondaryDrywallHangingSkills || {},
//       secondaryTapingFinishingSkills: step2.secondaryTapingFinishingSkills || {},
//       secondaryAcousticalCeilingsSkills: step2.secondaryAcousticalCeilingsSkills || {},
//       secondaryInteriorCarpentrySkills: step2.secondaryInteriorCarpentrySkills || {},
//       secondaryHelpersLabourersSkills: step2.secondaryHelpersLabourersSkills || {},
//       secondaryInsulationSkills: step2.secondaryInsulationSkills || {},
//       secondaryDemolitionSkills: step2.secondaryDemolitionSkills || {},
//       additionalSkillsTools: step2.additionalSkillsTools || ''
//     },
//     workHistory: {
//       projects: step3.projects || [],
//       projectConditions: step3.projectConditions || {},
//       referenceName: step3.referenceName || '',
//       referenceTitle: step3.referenceTitle || '',
//       referencePhone: step3.referencePhone || '',
//       reviewerNotes: step3.reviewerNotes || ''
//     },
//     availability: {
//       hourlyRate: step4.hourlyRate || '',
//       payPrefs: step4.payPrefs || {},
//       travelRadius: step4.travelRadius || 50,
//       willingToTravel: step4.willingToTravel || '',
//       travelPrefs: step4.travelPrefs || {},
//       availability: step4.availability || {}
//     },
//     certifications: {
//       certChecklist: step5.certChecklist || {},
//       certRows: step5.certRows || [],
//       safetyFlags: step5.safetyFlags || {}
//     },
//     emergencyContact: {
//       name: step5.emergencyContactName || '',
//       relationship: step5.emergencyContactRelationship || '',
//       phone: step5.emergencyContactPhone || ''
//     },
//     policyAcks: step5.policyAcks || {},
//     status: 'PENDING_VERIFICATION',
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     userId
//   }
// }

// // ============================================
// // 💾 SAVE TO PRODUCTION TABLE (FIXED - Using BatchWriteCommand)
// // ============================================

// const saveToProductionTable = async (userId, workerData) => {
//   const timestamp = new Date().toISOString()
  
//   const items = []
  
//   const addItem = (sk, data) => {
//     items.push({
//       PutRequest: {
//         Item: {
//           PK: `WORKER#${userId}`,
//           SK: sk,
//           ...data,
//           updatedAt: timestamp
//         }
//       }
//     })
//   }

//   addItem('PROFILE', workerData.profile)
//   addItem('TRADE', workerData.trade)
//   addItem('WORK_HISTORY', workerData.workHistory)
//   addItem('AVAILABILITY', workerData.availability)
//   addItem('CERTIFICATIONS', workerData.certifications)
//   addItem('EMERGENCY_CONTACT', workerData.emergencyContact)
//   addItem('POLICY_ACKS', workerData.policyAcks)

//   // Use BatchWrite instead of TransactWrite
//   for (let i = 0; i < items.length; i += 25) {
//     const batch = items.slice(i, i + 25)
    
//     await docClient.send(new BatchWriteCommand({
//       RequestItems: {
//         [WORKERS_TABLE]: batch
//       }
//     }))
//   }

//   console.log(`✅ Worker data saved to production table for user: ${userId}`)
// }




// // backend/src/controllers/workerWizardController.js
// import { docClient, WORKER_WIZARD_TABLE, WORKERS_TABLE } from '../config/aws.js'
// import { 
//   PutCommand, 
//   GetCommand, 
//   QueryCommand, 
//   UpdateCommand,
//   BatchWriteCommand
// } from '@aws-sdk/lib-dynamodb'
// import bcrypt from 'bcryptjs'  // ✅ ADDED for password hashing

// // ============================================
// // 💾 SAVE WIZARD STEP
// // ============================================

// export const saveWizardStep = async (req, res) => {
//   try {
//     const { userId, stepNumber, stepData } = req.body
    
//     if (!userId || !stepNumber || !stepData) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: userId, stepNumber, stepData'
//       })
//     }

//     console.log(`💾 Saving step ${stepNumber} for user: ${userId}`)

//     const timestamp = new Date().toISOString()
    
//     const item = {
//       PK: `WORKER#${userId}`,
//       SK: `STEP#${stepNumber}`,
//       stepNumber,
//       data: stepData,
//       updatedAt: timestamp,
//       ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
//     }

//     if (stepNumber === 1) {
//       item.createdAt = timestamp
//     }

//     await docClient.send(new PutCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Item: item
//     }))

//     await updateWizardProgress(userId, stepNumber)

//     res.status(200).json({
//       success: true,
//       message: `Step ${stepNumber} saved successfully`,
//       data: item
//     })

//   } catch (error) {
//     console.error('Error saving wizard step:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error saving wizard step',
//       error: error.message
//     })
//   }
// }

// // ============================================
// // 📊 GET WIZARD PROGRESS
// // ============================================

// export const getWizardProgress = async (req, res) => {
//   try {
//     const { userId } = req.params

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`📊 Getting wizard progress for user: ${userId}`)

//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'STEP#'
//       }
//     }))

//     const statusResult = await docClient.send(new GetCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'STATUS'
//       }
//     }))

//     const steps = {}
//     let currentStep = 0
//     let isComplete = false

//     result.Items.forEach(item => {
//       const stepNum = item.stepNumber
//       steps[`step${stepNum}`] = item.data
//       if (stepNum > currentStep) currentStep = stepNum
//     })

//     if (statusResult.Item) {
//       isComplete = statusResult.Item.isComplete || false
//       currentStep = statusResult.Item.currentStep || currentStep
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         currentStep,
//         completedSteps: Object.keys(steps).length,
//         steps,
//         isComplete,
//         lastUpdated: statusResult.Item?.updatedAt || null
//       }
//     })

//   } catch (error) {
//     console.error('Error getting wizard progress:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error getting wizard progress',
//       error: error.message
//     })
//   }
// }

// // ============================================
// // 🔄 UPDATE WIZARD PROGRESS
// // ============================================

// export const updateWizardProgress = async (userId, stepNumber) => {
//   try {
//     await docClient.send(new PutCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'STATUS',
//         currentStep: stepNumber,
//         isComplete: stepNumber === 5,
//         lastUpdated: new Date().toISOString(),
//         ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
//       }
//     }))
//   } catch (error) {
//     console.error('Error updating wizard progress:', error)
//     throw error
//   }
// }

// // ============================================
// // ✅ COMPLETE WIZARD - FIXED with passwordHash
// // ============================================

// export const completeWizard = async (req, res) => {
//   try {
//     const { userId, password } = req.body  // ✅ Get password from request

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`✅ Completing wizard for user: ${userId}`)

//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'STEP#'
//       }
//     }))

//     const wizardSteps = {}
//     result.Items.forEach(item => {
//       wizardSteps[`step${item.stepNumber}`] = item.data
//     })

//     for (let i = 1; i <= 5; i++) {
//       if (!wizardSteps[`step${i}`]) {
//         return res.status(400).json({
//           success: false,
//           message: `Step ${i} is incomplete`
//         })
//       }
//     }

//     const workerData = transformToProductionData(wizardSteps, userId)
    
//     // ✅ Hash password if provided
//     let passwordHash = null
//     if (password) {
//       const salt = await bcrypt.genSalt(10)
//       passwordHash = await bcrypt.hash(password, salt)
//       console.log(`✅ Password hash generated for user: ${userId}`)
//     } else {
//       console.log(`⚠️ No password provided for user: ${userId}`)
//     }
    
//     // ✅ Save with passwordHash
//     await saveToProductionTable(userId, workerData, passwordHash)

//     await docClient.send(new UpdateCommand({
//       TableName: WORKER_WIZARD_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'STATUS'
//       },
//       UpdateExpression: 'SET isComplete = :complete, completedAt = :completedAt',
//       ExpressionAttributeValues: {
//         ':complete': true,
//         ':completedAt': new Date().toISOString()
//       }
//     }))

//     res.status(200).json({
//       success: true,
//       message: 'Wizard completed successfully',
//       data: { 
//         workerId: userId,
//         hasPassword: !!passwordHash
//       }
//     })

//   } catch (error) {
//     console.error('Error completing wizard:', error)
//     res.status(500).json({
//       success: false,
//       message: 'Error completing wizard',
//       error: error.message
//     })
//   }
// }

// // ============================================
// // 🔄 TRANSFORM TO PRODUCTION DATA
// // ============================================

// const transformToProductionData = (wizardSteps, userId) => {
//   const step1 = wizardSteps.step1 || {}
//   const step2 = wizardSteps.step2 || {}
//   const step3 = wizardSteps.step3 || {}
//   const step4 = wizardSteps.step4 || {}
//   const step5 = wizardSteps.step5 || {}

//   return {
//     profile: {
//       fullName: `${step1.legalFirstName || ''} ${step1.legalLastName || ''}`.trim(),
//       firstName: step1.legalFirstName || '',
//       lastName: step1.legalLastName || '',
//       email: step1.emailAddress || '',
//       phone: step1.mobilePhone || '',
//       dob: step1.dob || '',
//       address: {
//         line1: step1.addressLine1 || '',
//         line2: step1.addressLine2 || '',
//         city: step1.city || '',
//         state: step1.stateCode || '',
//         zip: step1.zip || ''
//       },
//       languages: {
//         english: step1.english || false,
//         spanish: step1.spanish || false,
//         englishSpanish: step1.englishSpanish || false
//       },
//       profileImage: step1.profileImageUrl || step1.profilePreview || null,
//       profileImageKey: step1.profileImageKey || null
//     },
//     trade: {
//       primary: step2.primaryTrade || '',
//       primaryOther: step2.primaryOtherTrade || '',
//       primaryLevel: step2.workerLevel || '',
//       primaryExperience: parseInt(step2.yearOfExperience) || 0,
//       secondary: step2.secondaryTrade || '',
//       secondaryOther: step2.secondaryOtherTrade || '',
//       secondaryLevel: step2.secondaryWorkerLevel || '',
//       secondaryExperience: parseInt(step2.secondaryYearOfExperience) || 0,
//       leadForemanResponsibilities: step2.leadForemanResponsibilities || {},
//       metalFramingSkills: step2.metalFramingSkills || {},
//       drywallHangingSkills: step2.drywallHangingSkills || {},
//       tapingFinishingSkills: step2.tapingFinishingSkills || {},
//       acousticalCeilingsSkills: step2.acousticalCeilingsSkills || {},
//       interiorCarpentrySkills: step2.interiorCarpentrySkills || {},
//       helpersLabourersSkills: step2.helpersLabourersSkills || {},
//       insulationSkills: step2.insulationSkills || {},
//       demolitionSkills: step2.demolitionSkills || {},
//       secondaryLeadForemanResponsibilities: step2.secondaryLeadForemanResponsibilities || {},
//       secondaryMetalFramingSkills: step2.secondaryMetalFramingSkills || {},
//       secondaryDrywallHangingSkills: step2.secondaryDrywallHangingSkills || {},
//       secondaryTapingFinishingSkills: step2.secondaryTapingFinishingSkills || {},
//       secondaryAcousticalCeilingsSkills: step2.secondaryAcousticalCeilingsSkills || {},
//       secondaryInteriorCarpentrySkills: step2.secondaryInteriorCarpentrySkills || {},
//       secondaryHelpersLabourersSkills: step2.secondaryHelpersLabourersSkills || {},
//       secondaryInsulationSkills: step2.secondaryInsulationSkills || {},
//       secondaryDemolitionSkills: step2.secondaryDemolitionSkills || {},
//       additionalSkillsTools: step2.additionalSkillsTools || ''
//     },
//     workHistory: {
//       projects: step3.projects || [],
//       projectConditions: step3.projectConditions || {},
//       referenceName: step3.referenceName || '',
//       referenceTitle: step3.referenceTitle || '',
//       referencePhone: step3.referencePhone || '',
//       reviewerNotes: step3.reviewerNotes || ''
//     },
//     availability: {
//       hourlyRate: step4.hourlyRate || '',
//       payPrefs: step4.payPrefs || {},
//       travelRadius: step4.travelRadius || 50,
//       willingToTravel: step4.willingToTravel || '',
//       travelPrefs: step4.travelPrefs || {},
//       availability: step4.availability || {}
//     },
//     certifications: {
//       certChecklist: step5.certChecklist || {},
//       certRows: step5.certRows || [],
//       safetyFlags: step5.safetyFlags || {}
//     },
//     emergencyContact: {
//       name: step5.emergencyContactName || '',
//       relationship: step5.emergencyContactRelationship || '',
//       phone: step5.emergencyContactPhone || ''
//     },
//     policyAcks: step5.policyAcks || {},
//     status: 'PENDING_VERIFICATION',
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//     userId
//   }
// }

// // ============================================
// // 💾 SAVE TO PRODUCTION TABLE - FIXED with passwordHash
// // ============================================

// const saveToProductionTable = async (userId, workerData, passwordHash = null) => {
//   const timestamp = new Date().toISOString()
  
//   const items = []
  
//   const addItem = (sk, data) => {
//     // ✅ Create item with passwordHash for PROFILE
//     const item = {
//       PK: `WORKER#${userId}`,
//       SK: sk,
//       ...data,
//       updatedAt: timestamp
//     }
    
//     // ✅ Add passwordHash to PROFILE item only
//     if (sk === 'PROFILE' && passwordHash) {
//       item.passwordHash = passwordHash
//       console.log(`✅ Adding passwordHash to PROFILE for user: ${userId}`)
//     }
    
//     items.push({
//       PutRequest: {
//         Item: item
//       }
//     })
//   }

//   addItem('PROFILE', workerData.profile)
//   addItem('TRADE', workerData.trade)
//   addItem('WORK_HISTORY', workerData.workHistory)
//   addItem('AVAILABILITY', workerData.availability)
//   addItem('CERTIFICATIONS', workerData.certifications)
//   addItem('EMERGENCY_CONTACT', workerData.emergencyContact)
//   addItem('POLICY_ACKS', workerData.policyAcks)

//   // Use BatchWrite instead of TransactWrite
//   for (let i = 0; i < items.length; i += 25) {
//     const batch = items.slice(i, i + 25)
    
//     await docClient.send(new BatchWriteCommand({
//       RequestItems: {
//         [WORKERS_TABLE]: batch
//       }
//     }))
//   }

//   console.log(`✅ Worker data saved to production table for user: ${userId}`)
//   if (passwordHash) {
//     console.log(`✅ Password hash saved for user: ${userId}`)
//   }
// }

// // ============================================
// // 📋 EXPORT ALL
// // ============================================

// export default {
//   saveWizardStep,
//   getWizardProgress,
//   completeWizard
// }




// backend/src/controllers/workerWizardController.js
import { docClient, WORKER_WIZARD_TABLE, WORKERS_TABLE } from '../config/aws.js'
import { 
  PutCommand, 
  GetCommand, 
  QueryCommand, 
  UpdateCommand,
  BatchWriteCommand
} from '@aws-sdk/lib-dynamodb'
import bcrypt from 'bcryptjs'

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

    // ✅ Updated to support 6 steps
    if (stepNumber < 1 || stepNumber > 6) {
      return res.status(400).json({
        success: false,
        message: 'stepNumber must be between 1 and 6'
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
      ttl: Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60)
    }

    if (stepNumber === 1) {
      item.createdAt = timestamp
    }

    await docClient.send(new PutCommand({
      TableName: WORKER_WIZARD_TABLE,
      Item: item
    }))

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

    const result = await docClient.send(new QueryCommand({
      TableName: WORKER_WIZARD_TABLE,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': 'STEP#'
      }
    }))

    const statusResult = await docClient.send(new GetCommand({
      TableName: WORKER_WIZARD_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'STATUS'
      }
    }))

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

    // ✅ Determine next step for 6-step wizard
    let nextStep = 1
    for (let i = 1; i <= 6; i++) {
      if (!steps[`step${i}`]) {
        nextStep = i
        break
      }
    }

    res.status(200).json({
      success: true,
      data: {
        currentStep,
        nextStep,
        completedSteps: Object.keys(steps).length,
        totalSteps: 6,
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
        isComplete: stepNumber === 6, // ✅ Updated to 6
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
// ✅ COMPLETE WIZARD - Updated for 6 steps
// ============================================

export const completeWizard = async (req, res) => {
  try {
    const { userId, password } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId'
      })
    }

    console.log(`✅ Completing wizard for user: ${userId}`)

    const result = await docClient.send(new QueryCommand({
      TableName: WORKER_WIZARD_TABLE,
      KeyConditionExpression: 'PK = :pk AND begins_with(SK, :sk)',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': 'STEP#'
      }
    }))

    const wizardSteps = {}
    result.Items.forEach(item => {
      wizardSteps[`step${item.stepNumber}`] = item.data
    })

    // ✅ Check all 6 steps are complete
    for (let i = 1; i <= 6; i++) {
      if (!wizardSteps[`step${i}`]) {
        return res.status(400).json({
          success: false,
          message: `Step ${i} is incomplete`
        })
      }
    }

    const workerData = transformToProductionData(wizardSteps, userId)
    
    // Hash password if provided
    let passwordHash = null
    if (password) {
      const salt = await bcrypt.genSalt(10)
      passwordHash = await bcrypt.hash(password, salt)
      console.log(`✅ Password hash generated for user: ${userId}`)
    } else {
      console.log(`⚠️ No password provided for user: ${userId}`)
    }
    
    await saveToProductionTable(userId, workerData, passwordHash)

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
      data: { 
        workerId: userId,
        hasPassword: !!passwordHash
      }
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
// 🔄 TRANSFORM TO PRODUCTION DATA - Updated for 6 steps
// ============================================

const transformToProductionData = (wizardSteps, userId) => {
  const step1 = wizardSteps.step1 || {}
  const step2 = wizardSteps.step2 || {}      // Trade Profile & Skill Matrix
  const step3 = wizardSteps.step3 || {}      // Tools, Certifications & Requirements
  const step4 = wizardSteps.step4 || {}      // Work History
  const step5 = wizardSteps.step5 || {}      // Availability
  const step6 = wizardSteps.step6 || {}      // Emergency Contact

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
    // ✅ Step 2 & 3 both go to trade section
    trade: {
      // Step 2: Trade Profile & Skill Matrix
      mainTrade: step2.mainTrade || '',
      skillGroups: step2.skillGroups || {},
      skillDetails: step2.skillDetails || {},
      // Step 3: Tools, Certifications & Requirements
      toolsCertifications: step3.toolsCertifications || {},
      heavyEquipment: step3.heavyEquipment || {},
    },
    workHistory: {
      projects: step4.projects || [],
    },
    availability: {
      hourlyRate: step5.hourlyRate || '',
      payPrefs: step5.payPrefs || {},
      travelRadius: step5.travelRadius || 50,
      willingToTravel: step5.willingToTravel || '',
      travelPrefs: step5.travelPrefs || {},
      availability: step5.availability || {}
    },
    emergency: {
      emergencyContactName: step6.emergencyContactName || '',
      emergencyContactRelationship: step6.emergencyContactRelationship || '',
      emergencyContactPhone: step6.emergencyContactPhone || '',
    },
    policyAcks: step6.policyAcks || {},
    certifications: {
      certChecklist: step6.certChecklist || {},
      certRows: step6.certRows || [],
      safetyFlags: step6.safetyFlags || {}
    },
    status: 'PENDING_VERIFICATION',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId
  }
}

// ============================================
// 💾 SAVE TO PRODUCTION TABLE
// ============================================

const saveToProductionTable = async (userId, workerData, passwordHash = null) => {
  const timestamp = new Date().toISOString()
  
  const items = []
  
  const addItem = (sk, data) => {
    const item = {
      PK: `WORKER#${userId}`,
      SK: sk,
      ...data,
      updatedAt: timestamp
    }
    
    if (sk === 'PROFILE' && passwordHash) {
      item.passwordHash = passwordHash
      console.log(`✅ Adding passwordHash to PROFILE for user: ${userId}`)
    }
    
    items.push({
      PutRequest: {
        Item: item
      }
    })
  }

  addItem('PROFILE', workerData.profile)
  addItem('TRADE', workerData.trade)
  addItem('WORK_HISTORY', workerData.workHistory)
  addItem('AVAILABILITY', workerData.availability)
  addItem('EMERGENCY', workerData.emergency)
  addItem('POLICY_ACKS', workerData.policyAcks)
  addItem('CERTIFICATIONS', workerData.certifications)

  // Use BatchWrite instead of TransactWrite
  for (let i = 0; i < items.length; i += 25) {
    const batch = items.slice(i, i + 25)
    
    await docClient.send(new BatchWriteCommand({
      RequestItems: {
        [WORKERS_TABLE]: batch
      }
    }))
  }

  console.log(`✅ Worker data saved to production table for user: ${userId}`)
  if (passwordHash) {
    console.log(`✅ Password hash saved for user: ${userId}`)
  }
}

// ============================================
// 📋 EXPORT ALL
// ============================================

export default {
  saveWizardStep,
  getWizardProgress,
  completeWizard
}