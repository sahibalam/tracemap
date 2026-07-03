// // backend/src/controllers/workerController.js
// import { docClient, WORKERS_TABLE } from '../config/aws.js'
// import { 
//   QueryCommand, 
//   PutCommand, 
//   UpdateCommand, 
//   DeleteCommand,
//   ScanCommand
// } from '@aws-sdk/lib-dynamodb'

// // ============================================
// // 📊 GET COMPLETE WORKER PROFILE
// // ============================================

// export const getWorkerProfile = async (req, res) => {
//   try {
//     const { userId } = req.params

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`📊 Fetching profile for user: ${userId}`)

//     // Get all profile sections from Workers Table
//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKERS_TABLE,
//       KeyConditionExpression: 'PK = :pk',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`
//       }
//     }))
    
//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Profile not found for this user'
//       })
//     }

//     // Organize data by SK
//     const profile = {}
//     result.Items.forEach(item => {
//       const { PK, SK, ...data } = item
//       // Convert SK to lowercase for consistent access
//       const key = SK.toLowerCase()
//       profile[key] = data
//     })

//     res.json({
//       success: true,
//       data: profile
//     })
    
//   } catch (error) {
//     console.error('Error fetching profile:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error fetching profile'
//     })
//   }
// }

// // ============================================
// // 📝 UPDATE ENTIRE WORKER PROFILE
// // ============================================

// export const updateWorkerProfile = async (req, res) => {
//   try {
//     const { userId } = req.params
//     const { section, data } = req.body

//     if (!userId || !section || !data) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: userId, section, data'
//       })
//     }

//     console.log(`📝 Updating ${section} for user: ${userId}`)

//     const timestamp = new Date().toISOString()

//     // Check if profile exists
//     const existingProfile = await docClient.send(new QueryCommand({
//       TableName: WORKERS_TABLE,
//       KeyConditionExpression: 'PK = :pk AND SK = :sk',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': section.toUpperCase()
//       }
//     }))

//     // If section doesn't exist, create it
//     if (!existingProfile.Items || existingProfile.Items.length === 0) {
//       await docClient.send(new PutCommand({
//         TableName: WORKERS_TABLE,
//         Item: {
//           PK: `WORKER#${userId}`,
//           SK: section.toUpperCase(),
//           ...data,
//           createdAt: timestamp,
//           updatedAt: timestamp
//         }
//       }))
//     } else {
//       // Update existing section
//       await docClient.send(new UpdateCommand({
//         TableName: WORKERS_TABLE,
//         Key: {
//           PK: `WORKER#${userId}`,
//           SK: section.toUpperCase()
//         },
//         UpdateExpression: 'SET #data = :data, updatedAt = :timestamp',
//         ExpressionAttributeNames: {
//           '#data': 'data'
//         },
//         ExpressionAttributeValues: {
//           ':data': data,
//           ':timestamp': timestamp
//         }
//       }))
//     }

//     res.json({
//       success: true,
//       message: `${section} updated successfully`
//     })

//   } catch (error) {
//     console.error('Error updating profile:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error updating profile'
//     })
//   }
// }

// // ============================================
// // 🔄 UPDATE SPECIFIC PROFILE SECTION (PATCH)
// // ============================================

// export const updateWorkerProfileSection = async (req, res) => {
//   try {
//     const { userId, section } = req.params
//     const { data } = req.body

//     if (!userId || !section || !data) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing required fields: userId, section, data'
//       })
//     }

//     console.log(`📝 Updating section ${section} for user: ${userId}`)

//     const timestamp = new Date().toISOString()
//     const sectionKey = section.toUpperCase()

//     // Get existing section data
//     const existing = await docClient.send(new QueryCommand({
//       TableName: WORKERS_TABLE,
//       KeyConditionExpression: 'PK = :pk AND SK = :sk',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': sectionKey
//       }
//     }))

//     let existingData = {}
//     if (existing.Items && existing.Items.length > 0) {
//       const { PK, SK, ...rest } = existing.Items[0]
//       existingData = rest
//     }

//     // Merge existing data with new data
//     const mergedData = {
//       ...existingData,
//       ...data,
//       updatedAt: timestamp
//     }

//     // If section doesn't exist, create it
//     if (!existing.Items || existing.Items.length === 0) {
//       await docClient.send(new PutCommand({
//         TableName: WORKERS_TABLE,
//         Item: {
//           PK: `WORKER#${userId}`,
//           SK: sectionKey,
//           ...mergedData,
//           createdAt: timestamp
//         }
//       }))
//     } else {
//       // Update existing section
//       await docClient.send(new UpdateCommand({
//         TableName: WORKERS_TABLE,
//         Key: {
//           PK: `WORKER#${userId}`,
//           SK: sectionKey
//         },
//         UpdateExpression: 'SET #data = :data, updatedAt = :timestamp',
//         ExpressionAttributeNames: {
//           '#data': 'data'
//         },
//         ExpressionAttributeValues: {
//           ':data': mergedData,
//           ':timestamp': timestamp
//         }
//       }))
//     }

//     res.json({
//       success: true,
//       message: `${section} updated successfully`,
//       data: mergedData
//     })

//   } catch (error) {
//     console.error('Error updating section:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error updating section'
//     })
//   }
// }

// // ============================================
// // 🗑️ DELETE WORKER PROFILE
// // ============================================

// export const deleteWorkerProfile = async (req, res) => {
//   try {
//     const { userId } = req.params

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`🗑️ Deleting profile for user: ${userId}`)

//     // Get all sections
//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKERS_TABLE,
//       KeyConditionExpression: 'PK = :pk',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`
//       }
//     }))

//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Profile not found'
//       })
//     }

//     // Delete all sections
//     for (const item of result.Items) {
//       await docClient.send(new DeleteCommand({
//         TableName: WORKERS_TABLE,
//         Key: {
//           PK: item.PK,
//           SK: item.SK
//         }
//       }))
//     }

//     res.json({
//       success: true,
//       message: 'Profile deleted successfully'
//     })

//   } catch (error) {
//     console.error('Error deleting profile:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error deleting profile'
//     })
//   }
// }

// // ============================================
// // 🔍 GET WORKER BY EMAIL
// // ============================================

// export const getWorkerByEmail = async (req, res) => {
//   try {
//     const { email } = req.params

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing email'
//       })
//     }

//     console.log(`📧 Looking for worker with email: ${email}`)

//     // Query using GSI if you have one, otherwise scan (not recommended for production)
//     // This assumes you have a GSI on email field
//     // If you don't have GSI, use Scan (but this is slow for large datasets)
    
//     // Try using GSI first (if you created one)
//     try {
//       const result = await docClient.send(new QueryCommand({
//         TableName: WORKERS_TABLE,
//         IndexName: 'EmailIndex', // You need to create this GSI
//         KeyConditionExpression: 'email = :email',
//         ExpressionAttributeValues: {
//           ':email': email
//         }
//       }))

//       if (!result.Items || result.Items.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: 'Worker not found with this email'
//         })
//       }

//       // Get full profile for this user
//       const userId = result.Items[0].PK.replace('WORKER#', '')
//       return await getWorkerProfile(req, res)

//     } catch (gsiError) {
//       // If GSI doesn't exist, fallback to scan
//       console.log('⚠️ GSI not found, falling back to scan...')
      
//       const scanResult = await docClient.send(new ScanCommand({
//         TableName: WORKERS_TABLE,
//         FilterExpression: 'email = :email',
//         ExpressionAttributeValues: {
//           ':email': email
//         }
//       }))

//       if (!scanResult.Items || scanResult.Items.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: 'Worker not found with this email'
//         })
//       }

//       res.json({
//         success: true,
//         data: scanResult.Items[0]
//       })
//     }

//   } catch (error) {
//     console.error('Error fetching worker by email:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error fetching worker'
//     })
//   }
// }

// // ============================================
// // 📋 GET ALL WORKERS (with pagination)
// // ============================================

// export const getAllWorkers = async (req, res) => {
//   try {
//     const { limit = 50, nextToken } = req.query

//     console.log(`📋 Fetching all workers (limit: ${limit})`)

//     const params = {
//       TableName: WORKERS_TABLE,
//       FilterExpression: 'begins_with(SK, :sk) AND SK = :profileSk',
//       ExpressionAttributeValues: {
//         ':sk': 'PROFILE',
//         ':profileSk': 'PROFILE'
//       },
//       Limit: parseInt(limit)
//     }

//     if (nextToken) {
//       params.ExclusiveStartKey = JSON.parse(Buffer.from(nextToken, 'base64').toString())
//     }

//     const result = await docClient.send(new ScanCommand(params))

//     // Transform data
//     const workers = result.Items.map(item => {
//       const { PK, SK, ...data } = item
//       return {
//         userId: PK.replace('WORKER#', ''),
//         ...data
//       }
//     })

//     // Generate next token
//     let newNextToken = null
//     if (result.LastEvaluatedKey) {
//       newNextToken = Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString('base64')
//     }

//     res.json({
//       success: true,
//       data: {
//         workers,
//         count: workers.length,
//         totalCount: result.Count || workers.length,
//         nextToken: newNextToken
//       }
//     })

//   } catch (error) {
//     console.error('Error fetching all workers:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error fetching workers'
//     })
//   }
// }

// // ============================================
// // 📦 GET WORKER AVAILABILITY
// // ============================================

// export const getWorkerAvailability = async (req, res) => {
//   try {
//     const { userId } = req.params

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`📦 Fetching availability for user: ${userId}`)

//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKERS_TABLE,
//       KeyConditionExpression: 'PK = :pk AND SK = :sk',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'AVAILABILITY'
//       }
//     }))

//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Availability not found'
//       })
//     }

//     const { PK, SK, ...data } = result.Items[0]

//     res.json({
//       success: true,
//       data: data
//     })

//   } catch (error) {
//     console.error('Error fetching availability:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error fetching availability'
//     })
//   }
// }

// // ============================================
// // 🔧 GET WORKER TRADE SKILLS
// // ============================================

// export const getWorkerTrade = async (req, res) => {
//   try {
//     const { userId } = req.params

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`🔧 Fetching trade skills for user: ${userId}`)

//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKERS_TABLE,
//       KeyConditionExpression: 'PK = :pk AND SK = :sk',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'TRADE'
//       }
//     }))

//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Trade skills not found'
//       })
//     }

//     const { PK, SK, ...data } = result.Items[0]

//     res.json({
//       success: true,
//       data: data
//     })

//   } catch (error) {
//     console.error('Error fetching trade skills:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error fetching trade skills'
//     })
//   }
// }

// // ============================================
// // 📜 GET WORKER CERTIFICATIONS
// // ============================================

// export const getWorkerCertifications = async (req, res) => {
//   try {
//     const { userId } = req.params

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`📜 Fetching certifications for user: ${userId}`)

//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKERS_TABLE,
//       KeyConditionExpression: 'PK = :pk AND SK = :sk',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'CERTIFICATIONS'
//       }
//     }))

//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Certifications not found'
//       })
//     }

//     const { PK, SK, ...data } = result.Items[0]

//     res.json({
//       success: true,
//       data: data
//     })

//   } catch (error) {
//     console.error('Error fetching certifications:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error fetching certifications'
//     })
//   }
// }

// // ============================================
// // 💼 GET WORKER WORK HISTORY
// // ============================================

// export const getWorkerWorkHistory = async (req, res) => {
//   try {
//     const { userId } = req.params

//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Missing userId'
//       })
//     }

//     console.log(`💼 Fetching work history for user: ${userId}`)

//     const result = await docClient.send(new QueryCommand({
//       TableName: WORKERS_TABLE,
//       KeyConditionExpression: 'PK = :pk AND SK = :sk',
//       ExpressionAttributeValues: {
//         ':pk': `WORKER#${userId}`,
//         ':sk': 'WORK_HISTORY'
//       }
//     }))

//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'Work history not found'
//       })
//     }

//     const { PK, SK, ...data } = result.Items[0]

//     res.json({
//       success: true,
//       data: data
//     })

//   } catch (error) {
//     console.error('Error fetching work history:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Error fetching work history'
//     })
//   }
// }






// backend/src/controllers/workerController.js
import { docClient, WORKERS_TABLE } from '../config/aws.js'
import { GetCommand, PutCommand, UpdateCommand, DeleteCommand, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

// ============================================================
// 📊 PROFILE CRUD OPERATIONS
// ============================================================

/**
 * ✅ Get complete worker profile
 * GET /api/worker/profile/:userId
 */
export const getWorkerProfile = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    console.log(`📊 Fetching profile for user: ${userId}`)

    const result = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE'
      }
    }))

    if (!result.Item) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    // Return just the profile data, not the wrapper
    res.status(200).json({
      success: true,
      data: result.Item.profile || result.Item
    })

  } catch (error) {
    console.error('❌ Error getting profile:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting profile'
    })
  }
}

/**
 * ✅ Create new worker profile
 * POST /api/worker/profile
 */
export const createWorkerProfile = async (req, res) => {
  try {
    const { userId, profile } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    if (!profile) {
      return res.status(400).json({
        success: false,
        message: 'profile data is required'
      })
    }

    console.log(`📝 Creating profile for user: ${userId}`)

    const timestamp = new Date().toISOString()

    // Check if profile already exists
    const existingProfile = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE'
      }
    }))

    if (existingProfile.Item) {
      return res.status(409).json({
        success: false,
        message: 'Profile already exists. Use PUT or PATCH to update.'
      })
    }

    // Add wizard tracking if not present
    const profileWithWizard = {
      ...profile,
      wizard: {
        ...(profile.wizard || {}),
        startedAt: profile.wizard?.startedAt || timestamp,
        lastUpdatedAt: timestamp,
        completed: profile.wizard?.completed || false
      }
    }

    await docClient.send(new PutCommand({
      TableName: WORKERS_TABLE,
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE',
        userId,
        profile: profileWithWizard,
        status: 'active',
        createdAt: timestamp,
        updatedAt: timestamp,
        ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year
      }
    }))

    console.log(`✅ Profile created for user: ${userId}`)

    res.status(201).json({
      success: true,
      message: 'Profile created successfully',
      data: { 
        userId, 
        createdAt: timestamp,
        profile: profileWithWizard
      }
    })

  } catch (error) {
    console.error('❌ Error creating profile:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating profile'
    })
  }
}

/**
 * ✅ Update a specific section of worker profile (CRITICAL METHOD)
 * PATCH /api/worker/profile/:userId/section/:section
 * 
 * Supported sections: basics, trade, workHistory, availability, emergency,
 *                     certifications, tax, payment, medical, wizard
 */
export const updateWorkerProfileSection = async (req, res) => {
  try {
    const { userId, section } = req.params
    const { data } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    if (!section) {
      return res.status(400).json({
        success: false,
        message: 'section is required'
      })
    }

    if (!data) {
      return res.status(400).json({
        success: false,
        message: 'data is required'
      })
    }

    console.log(`📝 Updating ${section} for user: ${userId}`)

    const timestamp = new Date().toISOString()
    const PK = `WORKER#${userId}`
    const SK = 'PROFILE'

    // Check if profile exists
    const getResult = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: { PK, SK }
    }))

    if (!getResult.Item) {
      // Create profile with this section
      console.log(`📝 Profile not found, creating new profile with ${section}`)
      
      const newProfile = {
        [section]: data,
        wizard: {
          startedAt: timestamp,
          lastUpdatedAt: timestamp,
          completed: false
        }
      }

      await docClient.send(new PutCommand({
        TableName: WORKERS_TABLE,
        Item: {
          PK,
          SK,
          userId,
          profile: newProfile,
          status: 'active',
          createdAt: timestamp,
          updatedAt: timestamp,
          ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
        }
      }))

      console.log(`✅ Profile created with ${section} for user: ${userId}`)

      return res.status(201).json({
        success: true,
        message: `Profile created with ${section}`,
        data: { userId, section, updatedAt: timestamp }
      })
    }

    // Update the specific section
    await docClient.send(new UpdateCommand({
      TableName: WORKERS_TABLE,
      Key: { PK, SK },
      UpdateExpression: `SET #profile.#section = :data, updatedAt = :timestamp`,
      ExpressionAttributeNames: {
        '#profile': 'profile',
        '#section': section
      },
      ExpressionAttributeValues: {
        ':data': data,
        ':timestamp': timestamp
      }
    }))

    console.log(`✅ ${section} updated successfully for user: ${userId}`)

    res.status(200).json({
      success: true,
      message: `${section} updated successfully`,
      data: { userId, section, updatedAt: timestamp }
    })

  } catch (error) {
    console.error(`❌ Error updating ${section}:`, error)
    res.status(500).json({
      success: false,
      message: error.message || `Error updating ${section}`
    })
  }
}

/**
 * ✅ Update entire worker profile (PUT - full replace)
 * PUT /api/worker/profile/:userId
 * ⚠️ DEPRECATED: Use PATCH for section-wise updates
 */
export const updateWorkerProfile = async (req, res) => {
  try {
    const { userId } = req.params
    const { profile } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    if (!profile) {
      return res.status(400).json({
        success: false,
        message: 'profile data is required'
      })
    }

    console.warn(`⚠️ PUT /profile/${userId} is deprecated, use PATCH for section-wise updates`)
    console.log(`📝 Updating entire profile for user: ${userId}`)

    const timestamp = new Date().toISOString()
    const PK = `WORKER#${userId}`
    const SK = 'PROFILE'

    // Check if profile exists
    const getResult = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: { PK, SK }
    }))

    if (!getResult.Item) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found. Use POST to create or PATCH to update sections.'
      })
    }

    // Preserve wizard data if not provided
    const existingWizard = getResult.Item.profile?.wizard || {}
    const profileWithWizard = {
      ...profile,
      wizard: {
        ...existingWizard,
        ...(profile.wizard || {}),
        lastUpdatedAt: timestamp
      }
    }

    await docClient.send(new UpdateCommand({
      TableName: WORKERS_TABLE,
      Key: { PK, SK },
      UpdateExpression: `SET #profile = :profile, updatedAt = :timestamp`,
      ExpressionAttributeNames: {
        '#profile': 'profile'
      },
      ExpressionAttributeValues: {
        ':profile': profileWithWizard,
        ':timestamp': timestamp
      }
    }))

    console.log(`✅ Profile updated for user: ${userId}`)

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { userId, updatedAt: timestamp }
    })

  } catch (error) {
    console.error('❌ Error updating profile:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating profile'
    })
  }
}

/**
 * ✅ Delete worker profile (soft delete)
 * DELETE /api/worker/profile/:userId
 */
export const deleteWorkerProfile = async (req, res) => {
  try {
    const { userId } = req.params
    const { hardDelete } = req.query

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    console.log(`🗑️ Deleting profile for user: ${userId}`)

    const PK = `WORKER#${userId}`
    const SK = 'PROFILE'

    // Check if profile exists
    const getResult = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: { PK, SK }
    }))

    if (!getResult.Item) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    if (hardDelete === 'true') {
      // Hard delete - remove from database
      await docClient.send(new DeleteCommand({
        TableName: WORKERS_TABLE,
        Key: { PK, SK }
      }))
      console.log(`✅ Profile hard deleted for user: ${userId}`)
    } else {
      // Soft delete - mark as deleted
      await docClient.send(new UpdateCommand({
        TableName: WORKERS_TABLE,
        Key: { PK, SK },
        UpdateExpression: `SET #status = :status, deletedAt = :deletedAt`,
        ExpressionAttributeNames: {
          '#status': 'status'
        },
        ExpressionAttributeValues: {
          ':status': 'deleted',
          ':deletedAt': new Date().toISOString()
        }
      }))
      console.log(`✅ Profile soft deleted for user: ${userId}`)
    }

    res.status(200).json({
      success: true,
      message: hardDelete === 'true' ? 'Profile permanently deleted' : 'Profile soft deleted',
      data: { userId, hardDelete: hardDelete === 'true' }
    })

  } catch (error) {
    console.error('❌ Error deleting profile:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting profile'
    })
  }
}

// ============================================================
// 🔍 SEARCH AND QUERY OPERATIONS
// ============================================================

/**
 * ✅ Get worker by email
 * GET /api/worker/email/:email
 */
export const getWorkerByEmail = async (req, res) => {
  try {
    const { email } = req.params

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'email is required'
      })
    }

    console.log(`📧 Looking for worker with email: ${email}`)

    // Query by GSI (assuming email index exists)
    // If no GSI, scan the table (not recommended for production)
    const result = await docClient.send(new ScanCommand({
      TableName: WORKERS_TABLE,
      FilterExpression: '#profile.#basics.#email = :email',
      ExpressionAttributeNames: {
        '#profile': 'profile',
        '#basics': 'basics',
        '#email': 'emailAddress'
      },
      ExpressionAttributeValues: {
        ':email': email
      }
    }))

    const workers = result.Items || []
    
    if (workers.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Worker not found with this email'
      })
    }

    res.status(200).json({
      success: true,
      data: workers.map(item => ({
        userId: item.userId,
        profile: item.profile,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      }))
    })

  } catch (error) {
    console.error('❌ Error getting worker by email:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting worker by email'
    })
  }
}

/**
 * ✅ Get all workers (with pagination)
 * GET /api/worker/all?limit=20&lastKey=...
 */
export const getAllWorkers = async (req, res) => {
  try {
    const { limit = 20, lastKey } = req.query

    console.log(`📊 Fetching all workers (limit: ${limit})`)

    const params = {
      TableName: WORKERS_TABLE,
      Limit: parseInt(limit),
      FilterExpression: '#status = :status',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': 'active'
      }
    }

    // Add pagination if lastKey provided
    if (lastKey) {
      params.ExclusiveStartKey = JSON.parse(Buffer.from(lastKey, 'base64').toString())
    }

    const result = await docClient.send(new ScanCommand(params))

    const workers = result.Items || []
    
    // Prepare next page token
    let nextKey = null
    if (result.LastEvaluatedKey) {
      nextKey = Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString('base64')
    }

    res.status(200).json({
      success: true,
      data: workers.map(item => ({
        userId: item.userId,
        profile: item.profile,
        status: item.status,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt
      })),
      pagination: {
        count: workers.length,
        limit: parseInt(limit),
        nextKey: nextKey,
        hasMore: !!nextKey
      }
    })

  } catch (error) {
    console.error('❌ Error getting all workers:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting all workers'
    })
  }
}

// ============================================================
// 📦 SPECIFIC SECTION GETTERS
// ============================================================

/**
 * ✅ Get worker availability
 * GET /api/worker/:userId/availability
 */
export const getWorkerAvailability = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    const result = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE'
      }
    }))

    if (!result.Item) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    const availability = result.Item.profile?.availability || null

    res.status(200).json({
      success: true,
      data: availability
    })

  } catch (error) {
    console.error('❌ Error getting availability:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting availability'
    })
  }
}

/**
 * ✅ Get worker trade skills
 * GET /api/worker/:userId/trade
 */
export const getWorkerTrade = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    const result = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE'
      }
    }))

    if (!result.Item) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    const trade = result.Item.profile?.trade || null

    res.status(200).json({
      success: true,
      data: trade
    })

  } catch (error) {
    console.error('❌ Error getting trade:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting trade'
    })
  }
}

/**
 * ✅ Get worker certifications
 * GET /api/worker/:userId/certifications
 */
export const getWorkerCertifications = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    const result = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE'
      }
    }))

    if (!result.Item) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    const certifications = result.Item.profile?.certifications || null

    res.status(200).json({
      success: true,
      data: certifications
    })

  } catch (error) {
    console.error('❌ Error getting certifications:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting certifications'
    })
  }
}

/**
 * ✅ Get worker work history
 * GET /api/worker/:userId/work-history
 */
export const getWorkerWorkHistory = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    const result = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE'
      }
    }))

    if (!result.Item) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    const workHistory = result.Item.profile?.workHistory || null

    res.status(200).json({
      success: true,
      data: workHistory
    })

  } catch (error) {
    console.error('❌ Error getting work history:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error getting work history'
    })
  }
}

// ============================================================
// 🏥 HEALTH CHECK
// ============================================================

/**
 * ✅ Health check for worker routes
 * GET /api/worker/health
 */
export const workerHealthCheck = async (req, res) => {
  try {
    // Check DynamoDB connection
    await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: 'HEALTH_CHECK',
        SK: 'HEALTH_CHECK'
      }
    }))

    res.status(200).json({
      status: 'OK',
      service: 'Worker Profile Service',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development',
      database: 'DynamoDB',
      table: WORKERS_TABLE
    })

  } catch (error) {
    console.error('❌ Health check failed:', error)
    res.status(500).json({
      status: 'ERROR',
      service: 'Worker Profile Service',
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
}

// ============================================================
// 📊 BULK OPERATIONS
// ============================================================

/**
 * ✅ Update multiple sections at once
 * POST /api/worker/profile/:userId/bulk
 * Body: { sections: { basics: {...}, trade: {...} } }
 */
export const bulkUpdateProfile = async (req, res) => {
  try {
    const { userId } = req.params
    const { sections } = req.body

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'userId is required'
      })
    }

    if (!sections || typeof sections !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'sections object is required'
      })
    }

    console.log(`📝 Bulk updating sections for user: ${userId}`)

    const timestamp = new Date().toISOString()
    const PK = `WORKER#${userId}`
    const SK = 'PROFILE'

    // Check if profile exists
    const getResult = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: { PK, SK }
    }))

    if (!getResult.Item) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found. Create profile first.'
      })
    }

    // Build update expression for multiple sections
    let updateExpression = 'SET '
    const expressionAttributeNames = {
      '#profile': 'profile'
    }
    const expressionAttributeValues = {
      ':timestamp': timestamp
    }

    const sectionKeys = Object.keys(sections)
    sectionKeys.forEach((section, index) => {
      const attrName = `#section${index}`
      const attrValue = `:section${index}`
      updateExpression += `${attrName} = ${attrValue}`
      if (index < sectionKeys.length - 1) {
        updateExpression += ', '
      }
      expressionAttributeNames[attrName] = `profile.${section}`
      expressionAttributeValues[attrValue] = sections[section]
    })

    updateExpression += ', updatedAt = :timestamp'

    await docClient.send(new UpdateCommand({
      TableName: WORKERS_TABLE,
      Key: { PK, SK },
      UpdateExpression: updateExpression,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues
    }))

    console.log(`✅ Bulk update completed for user: ${userId}`)

    res.status(200).json({
      success: true,
      message: 'Bulk update completed successfully',
      data: {
        userId,
        updatedSections: sectionKeys,
        updatedAt: timestamp
      }
    })

  } catch (error) {
    console.error('❌ Error in bulk update:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error in bulk update'
    })
  }
}

// ============================================================
// 📋 EXPORT ALL CONTROLLERS
// ============================================================

export default {
  getWorkerProfile,
  createWorkerProfile,
  updateWorkerProfile,
  updateWorkerProfileSection,
  deleteWorkerProfile,
  getWorkerByEmail,
  getAllWorkers,
  getWorkerAvailability,
  getWorkerTrade,
  getWorkerCertifications,
  getWorkerWorkHistory,
  workerHealthCheck,
  bulkUpdateProfile
}