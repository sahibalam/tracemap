// backend/src/controllers/authController.js






// backend/src/controllers/authController.js

import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { docClient, WORKERS_TABLE } from '../config/aws.js'
import { GetCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

// ✅ Store verification tokens (temporary - use Redis in production)
const verificationStore = {}
const passwordResetStore = {}

// ============================================================
// 📧 EMAIL VERIFICATION (Already working with AWS SES)
// ============================================================

export const sendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body
    const token = generateVerificationToken()
    
    verificationStore[token] = {
      email,
      verified: false,
      createdAt: Date.now()
    }

    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`
    await sendVerificationEmail(email, verificationLink)

    res.json({
      success: true,
      message: "Verification email sent"
    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

export const verifyEmail = async (req, res) => {
  const { token } = req.query

  if (!verificationStore[token]) {
    return res.status(400).json({
      success: false,
      message: "Invalid token"
    })
  }

  verificationStore[token].verified = true

  res.json({
    success: true,
    email: verificationStore[token].email,
    message: "Email verified successfully"
  })
}

// ============================================================
// 🔐 LOGIN - NEW
// ============================================================

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      })
    }

    console.log(`🔐 Login attempt for: ${email}`)

    // ✅ Find user by email in DynamoDB
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

    const users = result.Items || []
    
    if (users.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'No account found with this email'
      })
    }

    const user = users[0]
    
    // ✅ Check if password is set and verified
    if (!user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: 'Password not set. Please register first.'
      })
    }

    // ✅ Verify password
    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password'
      })
    }

    // ✅ Generate JWT Token
    const token = jwt.sign(
      { userId: user.userId, email: email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    )

    console.log(`✅ Login successful for: ${email}`)

    res.json({
      success: true,
      data: {
        userId: user.userId,
        email: email,
        token: token,
        profile: user.profile
      }
    })

  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Login failed'
    })
  }
}

// ============================================================
// 📝 REGISTER - NEW
// ============================================================

export const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, phoneNumber, dob } = req.body

    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({
        success: false,
        message: 'Email, password, first name, and last name are required'
      })
    }

    console.log(`📝 Register attempt for: ${email}`)

    // ✅ Check if user already exists
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

    if (result.Items && result.Items.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'User already exists with this email'
      })
    }

    // ✅ Hash password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    // ✅ Create user ID (you can use Firebase UID or generate your own)
    const userId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // ✅ Create profile in DynamoDB
    const timestamp = new Date().toISOString()
    const profile = {
      basics: {
        legalFirstName: firstName,
        legalLastName: lastName,
        emailAddress: email,
        mobilePhone: phoneNumber || '',
        dob: dob || '',
      },
      wizard: {
        startedAt: timestamp,
        lastUpdatedAt: timestamp,
        completed: false
      }
    }

    await docClient.send(new PutCommand({
      TableName: WORKERS_TABLE,
      Item: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE',
        userId,
        profile,
        passwordHash,
        status: 'active',
        emailVerified: false,
        createdAt: timestamp,
        updatedAt: timestamp,
        ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
      }
    }))

    // ✅ Send verification email
    const token = generateVerificationToken()
    verificationStore[token] = {
      email,
      verified: false,
      userId,
      createdAt: Date.now()
    }
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${token}`
    await sendVerificationEmail(email, verificationLink)

    console.log(`✅ User registered: ${email}`)

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email.',
      data: {
        userId,
        email
      }
    })

  } catch (error) {
    console.error('❌ Registration error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Registration failed'
    })
  }
}

// ============================================================
//🔑 PASSWORD RESET - NEW
// ============================================================

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    // ✅ Find user
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

    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No account found with this email'
      })
    }

    // ✅ Generate reset token
    const resetToken = generateVerificationToken()
    passwordResetStore[resetToken] = {
      email,
      userId: result.Items[0].userId,
      createdAt: Date.now()
    }

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`
    await sendPasswordResetEmail(email, resetLink)

    res.json({
      success: true,
      message: 'Password reset email sent'
    })

  } catch (error) {
    console.error('❌ Forgot password error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send reset email'
    })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Token and new password are required'
      })
    }

    const resetData = passwordResetStore[token]
    if (!resetData) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired token'
      })
    }

    // ✅ Hash new password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(newPassword, salt)

    // ✅ Update password in DynamoDB
    await docClient.send(new UpdateCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${resetData.userId}`,
        SK: 'PROFILE'
      },
      UpdateExpression: 'SET passwordHash = :passwordHash, updatedAt = :timestamp',
      ExpressionAttributeValues: {
        ':passwordHash': passwordHash,
        ':timestamp': new Date().toISOString()
      }
    }))

    // ✅ Delete used token
    delete passwordResetStore[token]

    res.json({
      success: true,
      message: 'Password reset successfully'
    })

  } catch (error) {
    console.error('❌ Reset password error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to reset password'
    })
  }
}

// ============================================================
// 📊 CHECK EMAIL VERIFICATION STATUS
// ============================================================

export const checkEmailVerification = async (req, res) => {
  try {
    const { token } = req.query

    if (!token || !verificationStore[token]) {
      return res.status(400).json({
        success: false,
        message: 'Invalid token'
      })
    }

    const data = verificationStore[token]
    res.json({
      success: true,
      data: {
        email: data.email,
        verified: data.verified
      }
    })

  } catch (error) {
    console.error('❌ Check verification error:', error)
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

// ============================================================
// 🔧 HELPERS
// ============================================================

function generateVerificationToken() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

// ============================================================
// 🏥 EXPORT ALL
// ============================================================

export default {
  sendEmailVerification,
  verifyEmail,
  login,
  register,
  forgotPassword,
  resetPassword,
  checkEmailVerification
}