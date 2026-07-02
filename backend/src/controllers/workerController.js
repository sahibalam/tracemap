// backend/src/controllers/workerController.js
import { docClient, WORKERS_TABLE } from '../config/aws.js'
import { 
  QueryCommand, 
  PutCommand, 
  UpdateCommand, 
  DeleteCommand,
  ScanCommand
} from '@aws-sdk/lib-dynamodb'

// ============================================
// 📊 GET COMPLETE WORKER PROFILE
// ============================================

export const getWorkerProfile = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId'
      })
    }

    console.log(`📊 Fetching profile for user: ${userId}`)

    // Get all profile sections from Workers Table
    const result = await docClient.send(new QueryCommand({
      TableName: WORKERS_TABLE,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`
      }
    }))
    
    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found for this user'
      })
    }

    // Organize data by SK
    const profile = {}
    result.Items.forEach(item => {
      const { PK, SK, ...data } = item
      // Convert SK to lowercase for consistent access
      const key = SK.toLowerCase()
      profile[key] = data
    })

    res.json({
      success: true,
      data: profile
    })
    
  } catch (error) {
    console.error('Error fetching profile:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching profile'
    })
  }
}

// ============================================
// 📝 UPDATE ENTIRE WORKER PROFILE
// ============================================

export const updateWorkerProfile = async (req, res) => {
  try {
    const { userId } = req.params
    const { section, data } = req.body

    if (!userId || !section || !data) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, section, data'
      })
    }

    console.log(`📝 Updating ${section} for user: ${userId}`)

    const timestamp = new Date().toISOString()

    // Check if profile exists
    const existingProfile = await docClient.send(new QueryCommand({
      TableName: WORKERS_TABLE,
      KeyConditionExpression: 'PK = :pk AND SK = :sk',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': section.toUpperCase()
      }
    }))

    // If section doesn't exist, create it
    if (!existingProfile.Items || existingProfile.Items.length === 0) {
      await docClient.send(new PutCommand({
        TableName: WORKERS_TABLE,
        Item: {
          PK: `WORKER#${userId}`,
          SK: section.toUpperCase(),
          ...data,
          createdAt: timestamp,
          updatedAt: timestamp
        }
      }))
    } else {
      // Update existing section
      await docClient.send(new UpdateCommand({
        TableName: WORKERS_TABLE,
        Key: {
          PK: `WORKER#${userId}`,
          SK: section.toUpperCase()
        },
        UpdateExpression: 'SET #data = :data, updatedAt = :timestamp',
        ExpressionAttributeNames: {
          '#data': 'data'
        },
        ExpressionAttributeValues: {
          ':data': data,
          ':timestamp': timestamp
        }
      }))
    }

    res.json({
      success: true,
      message: `${section} updated successfully`
    })

  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating profile'
    })
  }
}

// ============================================
// 🔄 UPDATE SPECIFIC PROFILE SECTION (PATCH)
// ============================================

export const updateWorkerProfileSection = async (req, res) => {
  try {
    const { userId, section } = req.params
    const { data } = req.body

    if (!userId || !section || !data) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: userId, section, data'
      })
    }

    console.log(`📝 Updating section ${section} for user: ${userId}`)

    const timestamp = new Date().toISOString()
    const sectionKey = section.toUpperCase()

    // Get existing section data
    const existing = await docClient.send(new QueryCommand({
      TableName: WORKERS_TABLE,
      KeyConditionExpression: 'PK = :pk AND SK = :sk',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': sectionKey
      }
    }))

    let existingData = {}
    if (existing.Items && existing.Items.length > 0) {
      const { PK, SK, ...rest } = existing.Items[0]
      existingData = rest
    }

    // Merge existing data with new data
    const mergedData = {
      ...existingData,
      ...data,
      updatedAt: timestamp
    }

    // If section doesn't exist, create it
    if (!existing.Items || existing.Items.length === 0) {
      await docClient.send(new PutCommand({
        TableName: WORKERS_TABLE,
        Item: {
          PK: `WORKER#${userId}`,
          SK: sectionKey,
          ...mergedData,
          createdAt: timestamp
        }
      }))
    } else {
      // Update existing section
      await docClient.send(new UpdateCommand({
        TableName: WORKERS_TABLE,
        Key: {
          PK: `WORKER#${userId}`,
          SK: sectionKey
        },
        UpdateExpression: 'SET #data = :data, updatedAt = :timestamp',
        ExpressionAttributeNames: {
          '#data': 'data'
        },
        ExpressionAttributeValues: {
          ':data': mergedData,
          ':timestamp': timestamp
        }
      }))
    }

    res.json({
      success: true,
      message: `${section} updated successfully`,
      data: mergedData
    })

  } catch (error) {
    console.error('Error updating section:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating section'
    })
  }
}

// ============================================
// 🗑️ DELETE WORKER PROFILE
// ============================================

export const deleteWorkerProfile = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId'
      })
    }

    console.log(`🗑️ Deleting profile for user: ${userId}`)

    // Get all sections
    const result = await docClient.send(new QueryCommand({
      TableName: WORKERS_TABLE,
      KeyConditionExpression: 'PK = :pk',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`
      }
    }))

    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Profile not found'
      })
    }

    // Delete all sections
    for (const item of result.Items) {
      await docClient.send(new DeleteCommand({
        TableName: WORKERS_TABLE,
        Key: {
          PK: item.PK,
          SK: item.SK
        }
      }))
    }

    res.json({
      success: true,
      message: 'Profile deleted successfully'
    })

  } catch (error) {
    console.error('Error deleting profile:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting profile'
    })
  }
}

// ============================================
// 🔍 GET WORKER BY EMAIL
// ============================================

export const getWorkerByEmail = async (req, res) => {
  try {
    const { email } = req.params

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Missing email'
      })
    }

    console.log(`📧 Looking for worker with email: ${email}`)

    // Query using GSI if you have one, otherwise scan (not recommended for production)
    // This assumes you have a GSI on email field
    // If you don't have GSI, use Scan (but this is slow for large datasets)
    
    // Try using GSI first (if you created one)
    try {
      const result = await docClient.send(new QueryCommand({
        TableName: WORKERS_TABLE,
        IndexName: 'EmailIndex', // You need to create this GSI
        KeyConditionExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email
        }
      }))

      if (!result.Items || result.Items.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Worker not found with this email'
        })
      }

      // Get full profile for this user
      const userId = result.Items[0].PK.replace('WORKER#', '')
      return await getWorkerProfile(req, res)

    } catch (gsiError) {
      // If GSI doesn't exist, fallback to scan
      console.log('⚠️ GSI not found, falling back to scan...')
      
      const scanResult = await docClient.send(new ScanCommand({
        TableName: WORKERS_TABLE,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email
        }
      }))

      if (!scanResult.Items || scanResult.Items.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Worker not found with this email'
        })
      }

      res.json({
        success: true,
        data: scanResult.Items[0]
      })
    }

  } catch (error) {
    console.error('Error fetching worker by email:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching worker'
    })
  }
}

// ============================================
// 📋 GET ALL WORKERS (with pagination)
// ============================================

export const getAllWorkers = async (req, res) => {
  try {
    const { limit = 50, nextToken } = req.query

    console.log(`📋 Fetching all workers (limit: ${limit})`)

    const params = {
      TableName: WORKERS_TABLE,
      FilterExpression: 'begins_with(SK, :sk) AND SK = :profileSk',
      ExpressionAttributeValues: {
        ':sk': 'PROFILE',
        ':profileSk': 'PROFILE'
      },
      Limit: parseInt(limit)
    }

    if (nextToken) {
      params.ExclusiveStartKey = JSON.parse(Buffer.from(nextToken, 'base64').toString())
    }

    const result = await docClient.send(new ScanCommand(params))

    // Transform data
    const workers = result.Items.map(item => {
      const { PK, SK, ...data } = item
      return {
        userId: PK.replace('WORKER#', ''),
        ...data
      }
    })

    // Generate next token
    let newNextToken = null
    if (result.LastEvaluatedKey) {
      newNextToken = Buffer.from(JSON.stringify(result.LastEvaluatedKey)).toString('base64')
    }

    res.json({
      success: true,
      data: {
        workers,
        count: workers.length,
        totalCount: result.Count || workers.length,
        nextToken: newNextToken
      }
    })

  } catch (error) {
    console.error('Error fetching all workers:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching workers'
    })
  }
}

// ============================================
// 📦 GET WORKER AVAILABILITY
// ============================================

export const getWorkerAvailability = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId'
      })
    }

    console.log(`📦 Fetching availability for user: ${userId}`)

    const result = await docClient.send(new QueryCommand({
      TableName: WORKERS_TABLE,
      KeyConditionExpression: 'PK = :pk AND SK = :sk',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': 'AVAILABILITY'
      }
    }))

    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Availability not found'
      })
    }

    const { PK, SK, ...data } = result.Items[0]

    res.json({
      success: true,
      data: data
    })

  } catch (error) {
    console.error('Error fetching availability:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching availability'
    })
  }
}

// ============================================
// 🔧 GET WORKER TRADE SKILLS
// ============================================

export const getWorkerTrade = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId'
      })
    }

    console.log(`🔧 Fetching trade skills for user: ${userId}`)

    const result = await docClient.send(new QueryCommand({
      TableName: WORKERS_TABLE,
      KeyConditionExpression: 'PK = :pk AND SK = :sk',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': 'TRADE'
      }
    }))

    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Trade skills not found'
      })
    }

    const { PK, SK, ...data } = result.Items[0]

    res.json({
      success: true,
      data: data
    })

  } catch (error) {
    console.error('Error fetching trade skills:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching trade skills'
    })
  }
}

// ============================================
// 📜 GET WORKER CERTIFICATIONS
// ============================================

export const getWorkerCertifications = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId'
      })
    }

    console.log(`📜 Fetching certifications for user: ${userId}`)

    const result = await docClient.send(new QueryCommand({
      TableName: WORKERS_TABLE,
      KeyConditionExpression: 'PK = :pk AND SK = :sk',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': 'CERTIFICATIONS'
      }
    }))

    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Certifications not found'
      })
    }

    const { PK, SK, ...data } = result.Items[0]

    res.json({
      success: true,
      data: data
    })

  } catch (error) {
    console.error('Error fetching certifications:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching certifications'
    })
  }
}

// ============================================
// 💼 GET WORKER WORK HISTORY
// ============================================

export const getWorkerWorkHistory = async (req, res) => {
  try {
    const { userId } = req.params

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: 'Missing userId'
      })
    }

    console.log(`💼 Fetching work history for user: ${userId}`)

    const result = await docClient.send(new QueryCommand({
      TableName: WORKERS_TABLE,
      KeyConditionExpression: 'PK = :pk AND SK = :sk',
      ExpressionAttributeValues: {
        ':pk': `WORKER#${userId}`,
        ':sk': 'WORK_HISTORY'
      }
    }))

    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Work history not found'
      })
    }

    const { PK, SK, ...data } = result.Items[0]

    res.json({
      success: true,
      data: data
    })

  } catch (error) {
    console.error('Error fetching work history:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching work history'
    })
  }
}