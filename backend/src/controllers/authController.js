

// // backend/src/controllers/authController.js
// import { sendVerificationEmail } from '../services/emailService.js'
// import { sendPasswordResetEmail } from '../services/resendEmailService.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import { docClient, WORKERS_TABLE } from '../config/aws.js'
// import { 
//   GetCommand, 
//   ScanCommand, 
//   PutCommand, 
//   UpdateCommand 
// } from '@aws-sdk/lib-dynamodb'

// // ✅ Store verification codes (temporary - use Redis in production)
// const verificationStore = {}
// const passwordResetStore = {}
// const emailUpdateStore = {}

// // ============================================================
// // 📧 EMAIL VERIFICATION - SEND CODE
// // ============================================================

// export const sendEmailVerification = async (req, res) => {
//   try {
//     const { email } = req.body
    
//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required'
//       })
//     }

//     console.log(`📧 Sending verification code to: ${email}`)
    
//     // ✅ Generate 6-digit verification code
//     const verificationCode = generateVerificationCode()
    
//     // ✅ Store with expiry (10 minutes)
//     verificationStore[email] = {
//       code: verificationCode,
//       verified: false,
//       createdAt: Date.now(),
//       attempts: 0
//     }

//     // ✅ Send verification code via email
//     const result = await sendVerificationEmail(email, verificationCode)

//     if (result.success) {
//       res.json({
//         success: true,
//         message: "Verification code sent successfully",
//         data: {
//           email,
//           messageId: result.messageId
//         }
//       })
//     } else {
//       res.status(500).json({
//         success: false,
//         message: result.message || 'Failed to send verification code'
//       })
//     }

//   } catch (error) {
//     console.error('❌ Send verification error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to send verification code'
//     })
//   }
// }

// // ============================================================
// // ✅ VERIFY EMAIL CODE
// // ============================================================

// export const verifyEmailCode = async (req, res) => {
//   try {
//     const { email, code } = req.body

//     if (!email || !code) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and verification code are required'
//       })
//     }

//     console.log(`🔐 Verifying email code for: ${email}`)

//     const verificationData = verificationStore[email]
    
//     if (!verificationData) {
//       return res.status(400).json({
//         success: false,
//         message: 'No verification code found. Please request a new one.'
//       })
//     }

//     // ✅ Check if code is expired (10 minutes)
//     const tokenAge = Date.now() - verificationData.createdAt
//     if (tokenAge > 10 * 60 * 1000) { // 10 minutes
//       delete verificationStore[email]
//       return res.status(400).json({
//         success: false,
//         message: 'Verification code has expired. Please request a new one.'
//       })
//     }

//     // ✅ Check attempts (max 5 attempts)
//     if (verificationData.attempts >= 5) {
//       delete verificationStore[email]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new code.'
//       })
//     }

//     // ✅ Verify code
//     if (verificationData.code !== code) {
//       verificationData.attempts += 1
//       const remainingAttempts = 5 - verificationData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid code. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     // ✅ Code is correct - mark as verified
//     verificationData.verified = true

//     // ✅ Find user by email in DynamoDB
//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     const users = result.Items || []
    
//     if (users.length > 0) {
//       const user = users[0]
//       // ✅ Update user's emailVerified status in DynamoDB
//       try {
//         await docClient.send(new UpdateCommand({
//           TableName: WORKERS_TABLE,
//           Key: {
//             PK: `WORKER#${user.userId}`,
//             SK: 'PROFILE'
//           },
//           UpdateExpression: 'SET emailVerified = :verified, updatedAt = :timestamp',
//           ExpressionAttributeValues: {
//             ':verified': true,
//             ':timestamp': new Date().toISOString()
//           }
//         }))
//         console.log(`✅ Email verified for user: ${user.userId}`)
//       } catch (dbError) {
//         console.error('❌ Failed to update emailVerified status:', dbError)
//       }
//     }

//     // ✅ Clean up
//     delete verificationStore[email]

//     console.log(`✅ Email verified successfully: ${email}`)

//     res.json({
//       success: true,
//       message: 'Email verified successfully!',
//       data: {
//         email,
//         verified: true
//       }
//     })

//   } catch (error) {
//     console.error('❌ Verify email code error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to verify email'
//     })
//   }
// }

// // ============================================================
// // 🔐 LOGIN
// // ============================================================

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and password are required'
//       })
//     }

//     console.log(`🔐 Login attempt for: ${email}`)

//     // ✅ Find user by email in DynamoDB
//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     const users = result.Items || []
    
//     if (users.length === 0) {
//       return res.status(401).json({
//         success: false,
//         message: 'No account found with this email'
//       })
//     }

//     const user = users[0]
    
//     // ✅ Check if password is set
//     if (!user.passwordHash) {
//       return res.status(401).json({
//         success: false,
//         message: 'Password not set. Please register first.'
//       })
//     }

//     // ✅ Verify password
//     const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    
//     if (!isValidPassword) {
//       return res.status(401).json({
//         success: false,
//         message: 'Incorrect password'
//       })
//     }

//     // ✅ Generate JWT Token
//     const token = jwt.sign(
//       { userId: user.userId, email: email },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '7d' }
//     )

//     console.log(`✅ Login successful for: ${email}`)

//     res.json({
//       success: true,
//       data: {
//         userId: user.userId,
//         email: email,
//         token: token,
//         profile: user.profile
//       }
//     })

//   } catch (error) {
//     console.error('❌ Login error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Login failed'
//     })
//   }
// }

// // ============================================================
// // 📝 REGISTER - NO AUTO EMAIL SENDING
// // ============================================================

// export const register = async (req, res) => {
//   try {
//     const { email, password, firstName, lastName, phoneNumber, dob } = req.body

//     if (!email || !password || !firstName || !lastName) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email, password, first name, and last name are required'
//       })
//     }

//     console.log(`📝 Register attempt for: ${email}`)

//     // ✅ Check if user already exists
//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     if (result.Items && result.Items.length > 0) {
//       return res.status(409).json({
//         success: false,
//         message: 'User already exists with this email'
//       })
//     }

//     // ✅ Hash password
//     const salt = await bcrypt.genSalt(10)
//     const passwordHash = await bcrypt.hash(password, salt)

//     // ✅ Create user ID
//     const userId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

//     // ✅ Create profile in DynamoDB
//     const timestamp = new Date().toISOString()
//     const profile = {
//       basics: {
//         legalFirstName: firstName,
//         legalLastName: lastName,
//         emailAddress: email,
//         mobilePhone: phoneNumber || '',
//         dob: dob || '',
//       },
//       wizard: {
//         startedAt: timestamp,
//         lastUpdatedAt: timestamp,
//         completed: false
//       }
//     }

//     // ✅ Save to DynamoDB
//     await docClient.send(new PutCommand({
//       TableName: WORKERS_TABLE,
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'PROFILE',
//         userId,
//         profile,
//         passwordHash,
//         status: 'active',
//         emailVerified: false,
//         createdAt: timestamp,
//         updatedAt: timestamp,
//         ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
//       }
//     }))

//     // ✅ Generate verification code and store it (but DON'T send email)
//     const verificationCode = generateVerificationCode()
//     verificationStore[email] = {
//       code: verificationCode,
//       verified: false,
//       userId,
//       createdAt: Date.now(),
//       attempts: 0
//     }

//     console.log(`✅ User registered: ${email}`)

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully. Please verify your email.',
//       data: {
//         userId,
//         email,
//         verificationSent: false
//       }
//     })

//   } catch (error) {
//     console.error('❌ Registration error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Registration failed'
//     })
//   }
// }

// // ============================================================
// // 🔑 PASSWORD RESET
// // ============================================================

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required'
//       })
//     }

//     console.log(`🔑 Password reset requested for: ${email}`)

//     // ✅ Find user
//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'No account found with this email'
//       })
//     }

//     const user = result.Items[0]

//     // ✅ Generate reset token
//     const resetToken = generateVerificationToken()
//     passwordResetStore[resetToken] = {
//       email,
//       userId: user.userId,
//       createdAt: Date.now()
//     }

//     const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`
    
//     // ✅ Send password reset email using Resend SMTP
//     await sendPasswordResetEmail(email, resetLink)

//     console.log(`✅ Password reset email sent to: ${email}`)

//     res.json({
//       success: true,
//       message: 'Password reset email sent. Please check your inbox.'
//     })

//   } catch (error) {
//     console.error('❌ Forgot password error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to send reset email'
//     })
//   }
// }

// export const resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body

//     if (!token || !newPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'Token and new password are required'
//       })
//     }

//     const resetData = passwordResetStore[token]
//     if (!resetData) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired token'
//       })
//     }

//     // Check if token is expired (1 hour)
//     const tokenAge = Date.now() - resetData.createdAt
//     if (tokenAge > 3600000) { // 1 hour in milliseconds
//       delete passwordResetStore[token]
//       return res.status(400).json({
//         success: false,
//         message: 'Token has expired. Please request a new password reset.'
//       })
//     }

//     // ✅ Hash new password
//     const salt = await bcrypt.genSalt(10)
//     const passwordHash = await bcrypt.hash(newPassword, salt)

//     // ✅ Update password in DynamoDB
//     await docClient.send(new UpdateCommand({
//       TableName: WORKERS_TABLE,
//       Key: {
//         PK: `WORKER#${resetData.userId}`,
//         SK: 'PROFILE'
//       },
//       UpdateExpression: 'SET passwordHash = :passwordHash, updatedAt = :timestamp',
//       ExpressionAttributeValues: {
//         ':passwordHash': passwordHash,
//         ':timestamp': new Date().toISOString()
//       }
//     }))

//     // ✅ Delete used token
//     delete passwordResetStore[token]

//     console.log(`✅ Password reset successful for: ${resetData.email}`)

//     res.json({
//       success: true,
//       message: 'Password reset successfully. You can now login with your new password.'
//     })

//   } catch (error) {
//     console.error('❌ Reset password error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to reset password'
//     })
//   }
// }

// // ============================================================
// // 📊 CHECK EMAIL VERIFICATION STATUS
// // ============================================================

// export const checkEmailVerification = async (req, res) => {
//   try {
//     const { email } = req.query

//     if (!email || !verificationStore[email]) {
//       return res.status(400).json({
//         success: false,
//         message: 'No verification found for this email'
//       })
//     }

//     const data = verificationStore[email]
//     res.json({
//       success: true,
//       data: {
//         email: data.email || email,
//         verified: data.verified || false,
//         codeSent: !!data.code
//       }
//     })

//   } catch (error) {
//     console.error('❌ Check verification error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message
//     })
//   }
// }

// // ============================================================
// // 📧 EMAIL UPDATE WITH VERIFICATION
// // ============================================================

// /**
//  * ✅ Request email update - sends verification code to new email
//  * POST /api/auth/request-email-update
//  */
// export const requestEmailUpdate = async (req, res) => {
//   try {
//     const { userId, newEmail, currentPassword } = req.body

//     if (!userId || !newEmail || !currentPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID, new email, and current password are required'
//       })
//     }

//     console.log(`📧 Email update requested for user: ${userId} to: ${newEmail}`)

//     // ✅ Find user
//     const result = await docClient.send(new GetCommand({
//       TableName: WORKERS_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'PROFILE'
//       }
//     }))

//     if (!result.Item) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       })
//     }

//     const user = result.Item

//     // ✅ Verify current password
//     const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
    
//     if (!isValidPassword) {
//       return res.status(401).json({
//         success: false,
//         message: 'Current password is incorrect'
//       })
//     }

//     // ✅ Check if new email already exists
//     const emailCheck = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': newEmail
//       }
//     }))

//     if (emailCheck.Items && emailCheck.Items.length > 0) {
//       return res.status(409).json({
//         success: false,
//         message: 'This email is already registered'
//       })
//     }

//     // ✅ Generate verification code
//     const verificationCode = generateVerificationCode()
//     const timestamp = new Date().toISOString()

//     // ✅ Store email update request
//     emailUpdateStore[newEmail] = {
//       userId,
//       oldEmail: user.profile.basics.emailAddress,
//       newEmail,
//       code: verificationCode,
//       verified: false,
//       createdAt: Date.now(),
//       attempts: 0,
//       timestamp
//     }

//     // ✅ Send verification code to new email
//     const emailResult = await sendVerificationEmail(newEmail, verificationCode)

//     if (!emailResult.success) {
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to send verification email. Please try again.'
//       })
//     }

//     console.log(`✅ Verification code sent to ${newEmail}`)

//     res.json({
//       success: true,
//       message: 'Verification code sent to new email',
//       data: {
//         newEmail,
//         messageId: emailResult.messageId
//       }
//     })

//   } catch (error) {
//     console.error('❌ Request email update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to request email update'
//     })
//   }
// }

// /**
//  * ✅ Verify email update code and complete the update
//  * POST /api/auth/verify-email-update
//  * UPDATED: Now updates email across ALL sections of the profile
//  */
// export const verifyEmailUpdate = async (req, res) => {
//   try {
//     const { newEmail, code } = req.body

//     if (!newEmail || !code) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and verification code are required'
//       })
//     }

//     console.log(`🔐 Verifying email update for: ${newEmail}`)

//     const updateData = emailUpdateStore[newEmail]
    
//     if (!updateData) {
//       return res.status(400).json({
//         success: false,
//         message: 'No verification found. Please request a new code.'
//       })
//     }

//     // ✅ Check if code is expired (10 minutes)
//     const tokenAge = Date.now() - updateData.createdAt
//     if (tokenAge > 10 * 60 * 1000) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Verification code has expired. Please request a new one.'
//       })
//     }

//     // ✅ Check attempts (max 5)
//     if (updateData.attempts >= 5) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new code.'
//       })
//     }

//     // ✅ Verify code
//     if (updateData.code !== code) {
//       updateData.attempts += 1
//       const remainingAttempts = 5 - updateData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid code. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     // ✅ Update email in ALL sections of DynamoDB
//     const timestamp = new Date().toISOString()
//     const gmtDate = new Date().toUTCString()
//     const gmtTime = new Date().toTimeString()
    
//     // Get current profile
//     const result = await docClient.send(new GetCommand({
//       TableName: WORKERS_TABLE,
//       Key: {
//         PK: `WORKER#${updateData.userId}`,
//         SK: 'PROFILE'
//       }
//     }))

//     if (!result.Item) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       })
//     }

//     const user = result.Item
//     const currentProfile = user.profile || {}

//     // ✅ Create updated profile with email in ALL sections
//     const updatedProfile = { ...currentProfile }

//     // 1. Update basics
//     if (updatedProfile.basics) {
//       updatedProfile.basics = {
//         ...updatedProfile.basics,
//         emailAddress: newEmail
//       }
//     }

//     // 2. Update ALL sections that might have email
//     const sectionsWithEmail = [
//       'trade', 
//       'workHistory', 
//       'availability', 
//       'emergency', 
//       'certifications', 
//       'tax', 
//       'payment', 
//       'medical', 
//       'wizard'
//     ]

//     sectionsWithEmail.forEach(section => {
//       if (updatedProfile[section]) {
//         updatedProfile[section] = {
//           ...updatedProfile[section],
//           emailAddress: newEmail
//         }
//       }
//     })

//     // 3. Also update root level if it exists
//     if (updatedProfile.emailAddress !== undefined) {
//       updatedProfile.emailAddress = newEmail
//     }

//     // 4. Add timestamp
//     updatedProfile.lastEmailUpdate = timestamp

//     // ✅ Save updated profile to DynamoDB
//     await docClient.send(new UpdateCommand({
//       TableName: WORKERS_TABLE,
//       Key: {
//         PK: `WORKER#${updateData.userId}`,
//         SK: 'PROFILE'
//       },
//       UpdateExpression: 'SET profile = :profile, updatedAt = :timestamp',
//       ExpressionAttributeValues: {
//         ':profile': updatedProfile,
//         ':timestamp': timestamp
//       }
//     }))

//     // ✅ Log the email change
//     await logEmailChange({
//       workerId: updateData.userId,
//       oldEmail: updateData.oldEmail,
//       newEmail: newEmail,
//       timestamp: timestamp,
//       gmtDate: gmtDate,
//       gmtTime: gmtTime,
//       ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
//     })

//     // ✅ Clean up
//     delete emailUpdateStore[newEmail]

//     console.log(`✅ Email updated successfully for user: ${updateData.userId}`)

//     res.json({
//       success: true,
//       message: 'Email updated successfully!',
//       data: {
//         userId: updateData.userId,
//         newEmail: newEmail,
//         oldEmail: updateData.oldEmail,
//         updatedAt: timestamp
//       }
//     })

//   } catch (error) {
//     console.error('❌ Verify email update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to verify and update email'
//     })
//   }
// }

// /**
//  * ✅ Check if email is available (not already registered)
//  * GET /api/auth/check-email-availability
//  */
// export const checkEmailAvailability = async (req, res) => {
//   try {
//     const { email } = req.query

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required'
//       })
//     }

//     console.log(`🔍 Checking email availability: ${email}`)

//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     const exists = result.Items && result.Items.length > 0

//     res.json({
//       success: true,
//       data: {
//         email,
//         available: !exists,
//         exists: exists
//       }
//     })

//   } catch (error) {
//     console.error('❌ Check email availability error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to check email availability'
//     })
//   }
// }

// /**
//  * ✅ Log email change to separate table
//  */
// const logEmailChange = async (data) => {
//   try {
//     const timestamp = new Date().toISOString()
    
//     console.log('📝 Logging email change:', data)

//     await docClient.send(new PutCommand({
//       TableName: 'EmailChangeLogs',
//       Item: {
//         PK: `EMAIL_LOG#${data.workerId}`,
//         SK: `${timestamp}`,
//         workerId: data.workerId,
//         oldEmail: data.oldEmail,
//         newEmail: data.newEmail,
//         changedAt: timestamp,
//         gmtDate: data.gmtDate || new Date().toUTCString(),
//         gmtTime: data.gmtTime || new Date().toTimeString(),
//         ipAddress: data.ipAddress || 'unknown',
//         ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60) // 1 year
//       }
//     }))
//     console.log('✅ Email change logged successfully')
//   } catch (error) {
//     console.error('❌ Failed to log email change:', error)
//     // Don't throw - just log the error
//   }
// }

// // ============================================================
// // 🔧 HELPERS
// // ============================================================

// function generateVerificationCode() {
//   // Generate 6-digit code
//   return Math.floor(100000 + Math.random() * 900000).toString()
// }

// function generateVerificationToken() {
//   return Math.random().toString(36).substring(2, 15) + 
//          Math.random().toString(36).substring(2, 15)
// }

// // ============================================================
// // 🏥 EXPORT ALL
// // ============================================================

// export default {
//   sendEmailVerification,
//   verifyEmailCode,
//   login,
//   register,
//   forgotPassword,
//   resetPassword,
//   checkEmailVerification,
//   requestEmailUpdate,
//   verifyEmailUpdate,
//   checkEmailAvailability
// }





// // backend/src/controllers/authController.js
// import { sendVerificationEmail } from '../services/emailService.js'
// import { sendPasswordResetEmail } from '../services/resendEmailService.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'
// import { docClient, WORKERS_TABLE } from '../config/aws.js'
// import { 
//   GetCommand, 
//   ScanCommand, 
//   PutCommand, 
//   UpdateCommand 
// } from '@aws-sdk/lib-dynamodb'

// // Store verification codes
// const verificationStore = {}
// const passwordResetStore = {}
// const emailUpdateStore = {}

// // ============================================================
// // 📧 EMAIL VERIFICATION - SEND CODE
// // ============================================================

// export const sendEmailVerification = async (req, res) => {
//   try {
//     const { email } = req.body
    
//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required'
//       })
//     }

//     console.log(`📧 Sending verification code to: ${email}`)
    
//     const verificationCode = generateVerificationCode()
    
//     verificationStore[email] = {
//       code: verificationCode,
//       verified: false,
//       createdAt: Date.now(),
//       attempts: 0
//     }

//     const result = await sendVerificationEmail(email, verificationCode)

//     if (result.success) {
//       res.json({
//         success: true,
//         message: "Verification code sent successfully",
//         data: {
//           email,
//           messageId: result.messageId
//         }
//       })
//     } else {
//       res.status(500).json({
//         success: false,
//         message: result.message || 'Failed to send verification code'
//       })
//     }

//   } catch (error) {
//     console.error('❌ Send verification error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to send verification code'
//     })
//   }
// }

// // ============================================================
// // ✅ VERIFY EMAIL CODE
// // ============================================================

// export const verifyEmailCode = async (req, res) => {
//   try {
//     const { email, code } = req.body

//     if (!email || !code) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and verification code are required'
//       })
//     }

//     console.log(`🔐 Verifying email code for: ${email}`)

//     const verificationData = verificationStore[email]
    
//     if (!verificationData) {
//       return res.status(400).json({
//         success: false,
//         message: 'No verification code found. Please request a new one.'
//       })
//     }

//     const tokenAge = Date.now() - verificationData.createdAt
//     if (tokenAge > 10 * 60 * 1000) {
//       delete verificationStore[email]
//       return res.status(400).json({
//         success: false,
//         message: 'Verification code has expired. Please request a new one.'
//       })
//     }

//     if (verificationData.attempts >= 5) {
//       delete verificationStore[email]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new code.'
//       })
//     }

//     if (verificationData.code !== code) {
//       verificationData.attempts += 1
//       const remainingAttempts = 5 - verificationData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid code. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     verificationData.verified = true

//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     const users = result.Items || []
    
//     if (users.length > 0) {
//       const user = users[0]
//       try {
//         await docClient.send(new UpdateCommand({
//           TableName: WORKERS_TABLE,
//           Key: {
//             PK: `WORKER#${user.userId}`,
//             SK: 'PROFILE'
//           },
//           UpdateExpression: 'SET emailVerified = :verified, updatedAt = :timestamp',
//           ExpressionAttributeValues: {
//             ':verified': true,
//             ':timestamp': new Date().toISOString()
//           }
//         }))
//         console.log(`✅ Email verified for user: ${user.userId}`)
//       } catch (dbError) {
//         console.error('❌ Failed to update emailVerified status:', dbError)
//       }
//     }

//     delete verificationStore[email]

//     console.log(`✅ Email verified successfully: ${email}`)

//     res.json({
//       success: true,
//       message: 'Email verified successfully!',
//       data: {
//         email,
//         verified: true
//       }
//     })

//   } catch (error) {
//     console.error('❌ Verify email code error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to verify email'
//     })
//   }
// }

// // ============================================================
// // 🔐 LOGIN
// // ============================================================

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body

//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and password are required'
//       })
//     }

//     console.log(`🔐 Login attempt for: ${email}`)

//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     const users = result.Items || []
    
//     if (users.length === 0) {
//       return res.status(401).json({
//         success: false,
//         message: 'No account found with this email'
//       })
//     }

//     const user = users[0]
    
//     if (!user.passwordHash) {
//       return res.status(401).json({
//         success: false,
//         message: 'Password not set. Please register first.'
//       })
//     }

//     const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    
//     if (!isValidPassword) {
//       return res.status(401).json({
//         success: false,
//         message: 'Incorrect password'
//       })
//     }

//     const token = jwt.sign(
//       { userId: user.userId, email: email },
//       process.env.JWT_SECRET || 'your-secret-key',
//       { expiresIn: '7d' }
//     )

//     console.log(`✅ Login successful for: ${email}`)

//     res.json({
//       success: true,
//       data: {
//         userId: user.userId,
//         email: email,
//         token: token,
//         profile: user.profile
//       }
//     })

//   } catch (error) {
//     console.error('❌ Login error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Login failed'
//     })
//   }
// }

// // ============================================================
// // 📝 REGISTER
// // ============================================================

// export const register = async (req, res) => {
//   try {
//     const { email, password, firstName, lastName, phoneNumber, dob } = req.body

//     if (!email || !password || !firstName || !lastName) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email, password, first name, and last name are required'
//       })
//     }

//     console.log(`📝 Register attempt for: ${email}`)

//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     if (result.Items && result.Items.length > 0) {
//       return res.status(409).json({
//         success: false,
//         message: 'User already exists with this email'
//       })
//     }

//     const salt = await bcrypt.genSalt(10)
//     const passwordHash = await bcrypt.hash(password, salt)

//     const userId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

//     const timestamp = new Date().toISOString()
//     const profile = {
//       basics: {
//         legalFirstName: firstName,
//         legalLastName: lastName,
//         emailAddress: email,
//         mobilePhone: phoneNumber || '',
//         dob: dob || '',
//       },
//       wizard: {
//         startedAt: timestamp,
//         lastUpdatedAt: timestamp,
//         completed: false
//       }
//     }

//     await docClient.send(new PutCommand({
//       TableName: WORKERS_TABLE,
//       Item: {
//         PK: `WORKER#${userId}`,
//         SK: 'PROFILE',
//         userId,
//         profile,
//         passwordHash,
//         status: 'active',
//         emailVerified: false,
//         createdAt: timestamp,
//         updatedAt: timestamp,
//         ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
//       }
//     }))

//     const verificationCode = generateVerificationCode()
//     verificationStore[email] = {
//       code: verificationCode,
//       verified: false,
//       userId,
//       createdAt: Date.now(),
//       attempts: 0
//     }

//     console.log(`✅ User registered: ${email}`)

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully. Please verify your email.',
//       data: {
//         userId,
//         email,
//         verificationSent: false
//       }
//     })

//   } catch (error) {
//     console.error('❌ Registration error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Registration failed'
//     })
//   }
// }

// // ============================================================
// // 🔑 PASSWORD RESET
// // ============================================================

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required'
//       })
//     }

//     console.log(`🔑 Password reset requested for: ${email}`)

//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     if (!result.Items || result.Items.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: 'No account found with this email'
//       })
//     }

//     const user = result.Items[0]

//     const resetToken = generateVerificationToken()
//     passwordResetStore[resetToken] = {
//       email,
//       userId: user.userId,
//       createdAt: Date.now()
//     }

//     const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`
    
//     await sendPasswordResetEmail(email, resetLink)

//     console.log(`✅ Password reset email sent to: ${email}`)

//     res.json({
//       success: true,
//       message: 'Password reset email sent. Please check your inbox.'
//     })

//   } catch (error) {
//     console.error('❌ Forgot password error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to send reset email'
//     })
//   }
// }

// export const resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body

//     if (!token || !newPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'Token and new password are required'
//       })
//     }

//     const resetData = passwordResetStore[token]
//     if (!resetData) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired token'
//       })
//     }

//     const tokenAge = Date.now() - resetData.createdAt
//     if (tokenAge > 3600000) {
//       delete passwordResetStore[token]
//       return res.status(400).json({
//         success: false,
//         message: 'Token has expired. Please request a new password reset.'
//       })
//     }

//     const salt = await bcrypt.genSalt(10)
//     const passwordHash = await bcrypt.hash(newPassword, salt)

//     await docClient.send(new UpdateCommand({
//       TableName: WORKERS_TABLE,
//       Key: {
//         PK: `WORKER#${resetData.userId}`,
//         SK: 'PROFILE'
//       },
//       UpdateExpression: 'SET passwordHash = :passwordHash, updatedAt = :timestamp',
//       ExpressionAttributeValues: {
//         ':passwordHash': passwordHash,
//         ':timestamp': new Date().toISOString()
//       }
//     }))

//     delete passwordResetStore[token]

//     console.log(`✅ Password reset successful for: ${resetData.email}`)

//     res.json({
//       success: true,
//       message: 'Password reset successfully. You can now login with your new password.'
//     })

//   } catch (error) {
//     console.error('❌ Reset password error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to reset password'
//     })
//   }
// }

// // ============================================================
// // 📊 CHECK EMAIL VERIFICATION STATUS
// // ============================================================

// export const checkEmailVerification = async (req, res) => {
//   try {
//     const { email } = req.query

//     if (!email || !verificationStore[email]) {
//       return res.status(400).json({
//         success: false,
//         message: 'No verification found for this email'
//       })
//     }

//     const data = verificationStore[email]
//     res.json({
//       success: true,
//       data: {
//         email: data.email || email,
//         verified: data.verified || false,
//         codeSent: !!data.code
//       }
//     })

//   } catch (error) {
//     console.error('❌ Check verification error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message
//     })
//   }
// }

// // ============================================================
// // 📧 EMAIL UPDATE WITH VERIFICATION
// // ============================================================

// /**
//  * ✅ Request email update - sends verification code to new email
//  */
// export const requestEmailUpdate = async (req, res) => {
//   try {
//     const { userId, newEmail, currentPassword } = req.body

//     if (!userId || !newEmail || !currentPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID, new email, and current password are required'
//       })
//     }

//     console.log(`📧 Email update requested for user: ${userId} to: ${newEmail}`)

//     // Find user
//     const result = await docClient.send(new GetCommand({
//       TableName: WORKERS_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'PROFILE'
//       }
//     }))

//     if (!result.Item) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       })
//     }

//     const user = result.Item

//     // Verify current password
//     const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
    
//     if (!isValidPassword) {
//       return res.status(401).json({
//         success: false,
//         message: 'Current password is incorrect'
//       })
//     }

//     // Check if new email already exists
//     const emailCheck = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': newEmail
//       }
//     }))

//     if (emailCheck.Items && emailCheck.Items.length > 0) {
//       return res.status(409).json({
//         success: false,
//         message: 'This email is already registered'
//       })
//     }

//     // Generate verification code
//     const verificationCode = generateVerificationCode()
//     const timestamp = new Date().toISOString()

//     // Store email update request
//     emailUpdateStore[newEmail] = {
//       userId,
//       oldEmail: user.profile.basics.emailAddress,
//       newEmail,
//       code: verificationCode,
//       verified: false,
//       createdAt: Date.now(),
//       attempts: 0,
//       timestamp
//     }

//     // Send verification code to new email
//     const emailResult = await sendVerificationEmail(newEmail, verificationCode)

//     if (!emailResult.success) {
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to send verification email. Please try again.'
//       })
//     }

//     console.log(`✅ Verification code sent to ${newEmail}`)

//     res.json({
//       success: true,
//       message: 'Verification code sent to new email',
//       data: {
//         newEmail,
//         messageId: emailResult.messageId
//       }
//     })

//   } catch (error) {
//     console.error('❌ Request email update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to request email update'
//     })
//   }
// }

// /**
//  * ✅ Verify email update code and complete the update
//  * Saves old email, new email, GMT date, GMT time to EmailChangeLogs
//  */
// export const verifyEmailUpdate = async (req, res) => {
//   try {
//     const { newEmail, code } = req.body

//     if (!newEmail || !code) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email and verification code are required'
//       })
//     }

//     console.log(`🔐 Verifying email update for: ${newEmail}`)

//     const updateData = emailUpdateStore[newEmail]
    
//     if (!updateData) {
//       return res.status(400).json({
//         success: false,
//         message: 'No verification found. Please request a new code.'
//       })
//     }

//     // Check if code is expired (10 minutes)
//     const tokenAge = Date.now() - updateData.createdAt
//     if (tokenAge > 10 * 60 * 1000) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Verification code has expired. Please request a new one.'
//       })
//     }

//     // Check attempts (max 5)
//     if (updateData.attempts >= 5) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new code.'
//       })
//     }

//     // Verify code
//     if (updateData.code !== code) {
//       updateData.attempts += 1
//       const remainingAttempts = 5 - updateData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid code. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     // Update email in ALL sections
//     const timestamp = new Date().toISOString()
//     const gmtDate = new Date().toUTCString()
//     const gmtTime = new Date().toTimeString()
    
//     // Get current profile
//     const result = await docClient.send(new GetCommand({
//       TableName: WORKERS_TABLE,
//       Key: {
//         PK: `WORKER#${updateData.userId}`,
//         SK: 'PROFILE'
//       }
//     }))

//     if (!result.Item) {
//       return res.status(404).json({
//         success: false,
//         message: 'User not found'
//       })
//     }

//     const user = result.Item
//     const currentProfile = user.profile || {}

//     // Create updated profile with email in ALL sections
//     const updatedProfile = { ...currentProfile }

//     // Update basics
//     if (updatedProfile.basics) {
//       updatedProfile.basics = {
//         ...updatedProfile.basics,
//         emailAddress: newEmail
//       }
//     }

//     // Update ALL sections that might have email
//     const sectionsWithEmail = [
//       'trade', 'workHistory', 'availability', 'emergency', 
//       'certifications', 'tax', 'payment', 'medical', 'wizard'
//     ]

//     sectionsWithEmail.forEach(section => {
//       if (updatedProfile[section]) {
//         updatedProfile[section] = {
//           ...updatedProfile[section],
//           emailAddress: newEmail
//         }
//       }
//     })

//     // Update root level if it exists
//     if (updatedProfile.emailAddress !== undefined) {
//       updatedProfile.emailAddress = newEmail
//     }

//     // Add timestamp
//     updatedProfile.lastEmailUpdate = timestamp

//     // Save updated profile
//     await docClient.send(new UpdateCommand({
//       TableName: WORKERS_TABLE,
//       Key: {
//         PK: `WORKER#${updateData.userId}`,
//         SK: 'PROFILE'
//       },
//       UpdateExpression: 'SET profile = :profile, updatedAt = :timestamp',
//       ExpressionAttributeValues: {
//         ':profile': updatedProfile,
//         ':timestamp': timestamp
//       }
//     }))

//     // ✅ Log the email change to EmailChangeLogs table
//     await logEmailChange({
//       workerId: updateData.userId,
//       oldEmail: updateData.oldEmail,
//       newEmail: newEmail,
//       timestamp: timestamp,
//       gmtDate: gmtDate,
//       gmtTime: gmtTime,
//       ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
//     })

//     // Clean up
//     delete emailUpdateStore[newEmail]

//     console.log(`✅ Email updated successfully for user: ${updateData.userId}`)

//     res.json({
//       success: true,
//       message: 'Email updated successfully!',
//       data: {
//         userId: updateData.userId,
//         newEmail: newEmail,
//         oldEmail: updateData.oldEmail,
//         updatedAt: timestamp
//       }
//     })

//   } catch (error) {
//     console.error('❌ Verify email update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to verify and update email'
//     })
//   }
// }

// /**
//  * ✅ Check if email is available (REAL-TIME)
//  */
// export const checkEmailAvailability = async (req, res) => {
//   try {
//     const { email } = req.query

//     if (!email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Email is required'
//       })
//     }

//     console.log(`🔍 Checking email availability: ${email}`)

//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#email = :email',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#email': 'emailAddress'
//       },
//       ExpressionAttributeValues: {
//         ':email': email
//       }
//     }))

//     const exists = result.Items && result.Items.length > 0

//     res.json({
//       success: true,
//       data: {
//         email,
//         available: !exists,
//         exists: exists
//       }
//     })

//   } catch (error) {
//     console.error('❌ Check email availability error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to check email availability'
//     })
//   }
// }

// /**
//  * ✅ Log email change to EmailChangeLogs table
//  */
// const logEmailChange = async (data) => {
//   try {
//     const timestamp = new Date().toISOString()
    
//     console.log('📝 Logging email change:', {
//       workerId: data.workerId,
//       oldEmail: data.oldEmail,
//       newEmail: data.newEmail,
//       gmtDate: data.gmtDate,
//       gmtTime: data.gmtTime
//     })

//     await docClient.send(new PutCommand({
//       TableName: 'EmailChangeLogs',
//       Item: {
//         PK: `EMAIL_LOG#${data.workerId}`,
//         SK: `${timestamp}`,
//         workerId: data.workerId,
//         oldEmail: data.oldEmail,
//         newEmail: data.newEmail,
//         changedAt: timestamp,
//         gmtDate: data.gmtDate || new Date().toUTCString(),
//         gmtTime: data.gmtTime || new Date().toTimeString(),
//         ipAddress: data.ipAddress || 'unknown',
//         ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
//       }
//     }))
//     console.log('✅ Email change logged successfully')
//   } catch (error) {
//     console.error('❌ Failed to log email change:', error)
//   }
// }

// // ============================================================
// // 🔧 HELPERS
// // ============================================================

// function generateVerificationCode() {
//   return Math.floor(100000 + Math.random() * 900000).toString()
// }

// function generateVerificationToken() {
//   return Math.random().toString(36).substring(2, 15) + 
//          Math.random().toString(36).substring(2, 15)
// }

// // ============================================================
// // 🏥 EXPORT ALL
// // ============================================================

// export default {
//   sendEmailVerification,
//   verifyEmailCode,
//   login,
//   register,
//   forgotPassword,
//   resetPassword,
//   checkEmailVerification,
//   requestEmailUpdate,
//   verifyEmailUpdate,
//   checkEmailAvailability
// }









// backend/src/controllers/authController.js
import { sendVerificationEmail } from '../services/emailService.js'
import { sendPasswordResetEmail } from '../services/resendEmailService.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { docClient, WORKERS_TABLE } from '../config/aws.js'
import { 
  GetCommand, 
  ScanCommand, 
  PutCommand, 
  UpdateCommand 
} from '@aws-sdk/lib-dynamodb'

// Store verification codes
const verificationStore = {}
const passwordResetStore = {}
const emailUpdateStore = {}

// ============================================================
// 📧 EMAIL VERIFICATION - SEND CODE
// ============================================================

export const sendEmailVerification = async (req, res) => {
  try {
    const { email } = req.body
    
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    console.log(`📧 Sending verification code to: ${email}`)
    
    const verificationCode = generateVerificationCode()
    
    verificationStore[email] = {
      code: verificationCode,
      verified: false,
      createdAt: Date.now(),
      attempts: 0
    }

    const result = await sendVerificationEmail(email, verificationCode)

    if (result.success) {
      res.json({
        success: true,
        message: "Verification code sent successfully",
        data: {
          email,
          messageId: result.messageId
        }
      })
    } else {
      res.status(500).json({
        success: false,
        message: result.message || 'Failed to send verification code'
      })
    }

  } catch (error) {
    console.error('❌ Send verification error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to send verification code'
    })
  }
}

// ============================================================
// ✅ VERIFY EMAIL CODE
// ============================================================

export const verifyEmailCode = async (req, res) => {
  try {
    const { email, code } = req.body

    if (!email || !code) {
      return res.status(400).json({
        success: false,
        message: 'Email and verification code are required'
      })
    }

    console.log(`🔐 Verifying email code for: ${email}`)

    const verificationData = verificationStore[email]
    
    if (!verificationData) {
      return res.status(400).json({
        success: false,
        message: 'No verification code found. Please request a new one.'
      })
    }

    const tokenAge = Date.now() - verificationData.createdAt
    if (tokenAge > 10 * 60 * 1000) {
      delete verificationStore[email]
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new one.'
      })
    }

    if (verificationData.attempts >= 5) {
      delete verificationStore[email]
      return res.status(400).json({
        success: false,
        message: 'Too many failed attempts. Please request a new code.'
      })
    }

    if (verificationData.code !== code) {
      verificationData.attempts += 1
      const remainingAttempts = 5 - verificationData.attempts
      return res.status(400).json({
        success: false,
        message: `Invalid code. ${remainingAttempts} attempts remaining.`
      })
    }

    verificationData.verified = true

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
    
    if (users.length > 0) {
      const user = users[0]
      try {
        await docClient.send(new UpdateCommand({
          TableName: WORKERS_TABLE,
          Key: {
            PK: `WORKER#${user.userId}`,
            SK: 'PROFILE'
          },
          UpdateExpression: 'SET emailVerified = :verified, updatedAt = :timestamp',
          ExpressionAttributeValues: {
            ':verified': true,
            ':timestamp': new Date().toISOString()
          }
        }))
        console.log(`✅ Email verified for user: ${user.userId}`)
      } catch (dbError) {
        console.error('❌ Failed to update emailVerified status:', dbError)
      }
    }

    delete verificationStore[email]

    console.log(`✅ Email verified successfully: ${email}`)

    res.json({
      success: true,
      message: 'Email verified successfully!',
      data: {
        email,
        verified: true
      }
    })

  } catch (error) {
    console.error('❌ Verify email code error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify email'
    })
  }
}

// ============================================================
// 🔐 LOGIN
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
    
    if (!user.passwordHash) {
      return res.status(401).json({
        success: false,
        message: 'Password not set. Please register first.'
      })
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash)
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect password'
      })
    }

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
// 📝 REGISTER
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

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const userId = `USER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

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

    const verificationCode = generateVerificationCode()
    verificationStore[email] = {
      code: verificationCode,
      verified: false,
      userId,
      createdAt: Date.now(),
      attempts: 0
    }

    console.log(`✅ User registered: ${email}`)

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email.',
      data: {
        userId,
        email,
        verificationSent: false
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
// 🔑 PASSWORD RESET
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

    console.log(`🔑 Password reset requested for: ${email}`)

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

    const user = result.Items[0]

    const resetToken = generateVerificationToken()
    passwordResetStore[resetToken] = {
      email,
      userId: user.userId,
      createdAt: Date.now()
    }

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`
    
    await sendPasswordResetEmail(email, resetLink)

    console.log(`✅ Password reset email sent to: ${email}`)

    res.json({
      success: true,
      message: 'Password reset email sent. Please check your inbox.'
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

    const tokenAge = Date.now() - resetData.createdAt
    if (tokenAge > 3600000) {
      delete passwordResetStore[token]
      return res.status(400).json({
        success: false,
        message: 'Token has expired. Please request a new password reset.'
      })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(newPassword, salt)

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

    delete passwordResetStore[token]

    console.log(`✅ Password reset successful for: ${resetData.email}`)

    res.json({
      success: true,
      message: 'Password reset successfully. You can now login with your new password.'
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
    const { email } = req.query

    if (!email || !verificationStore[email]) {
      return res.status(400).json({
        success: false,
        message: 'No verification found for this email'
      })
    }

    const data = verificationStore[email]
    res.json({
      success: true,
      data: {
        email: data.email || email,
        verified: data.verified || false,
        codeSent: !!data.code
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
// 📧 EMAIL UPDATE WITH VERIFICATION
// ============================================================

/**
 * ✅ Request email update - sends verification code to new email
 * UPDATED: currentPassword is now OPTIONAL (can be empty string)
 */
export const requestEmailUpdate = async (req, res) => {
  try {
    const { userId, newEmail, currentPassword } = req.body

    // ✅ Only require userId and newEmail
    if (!userId || !newEmail) {
      return res.status(400).json({
        success: false,
        message: 'User ID and new email are required'
      })
    }

    console.log(`📧 Email update requested for user: ${userId} to: ${newEmail}`)

    // Find user
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
        message: 'User not found'
      })
    }

    const user = result.Item

    // ✅ OPTIONAL: Only verify current password if provided and not empty
    if (currentPassword && currentPassword.trim() !== '') {
      const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        })
      }
    }

    // Check if new email already exists
    const emailCheck = await docClient.send(new ScanCommand({
      TableName: WORKERS_TABLE,
      FilterExpression: '#profile.#basics.#email = :email',
      ExpressionAttributeNames: {
        '#profile': 'profile',
        '#basics': 'basics',
        '#email': 'emailAddress'
      },
      ExpressionAttributeValues: {
        ':email': newEmail
      }
    }))

    if (emailCheck.Items && emailCheck.Items.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'This email is already registered'
      })
    }

    // Generate verification code
    const verificationCode = generateVerificationCode()
    const timestamp = new Date().toISOString()

    // Store email update request
    emailUpdateStore[newEmail] = {
      userId,
      oldEmail: user.profile.basics.emailAddress,
      newEmail,
      code: verificationCode,
      verified: false,
      createdAt: Date.now(),
      attempts: 0,
      timestamp
    }

    // Send verification code to new email
    const emailResult = await sendVerificationEmail(newEmail, verificationCode)

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to send verification email. Please try again.'
      })
    }

    console.log(`✅ Verification code sent to ${newEmail}`)

    res.json({
      success: true,
      message: 'Verification code sent to new email',
      data: {
        newEmail,
        messageId: emailResult.messageId
      }
    })

  } catch (error) {
    console.error('❌ Request email update error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to request email update'
    })
  }
}

/**
 * ✅ Verify email update code and complete the update
 * Saves old email, new email, GMT date, GMT time to EmailChangeLogs
 */
export const verifyEmailUpdate = async (req, res) => {
  try {
    const { newEmail, code } = req.body

    if (!newEmail || !code) {
      return res.status(400).json({
        success: false,
        message: 'Email and verification code are required'
      })
    }

    console.log(`🔐 Verifying email update for: ${newEmail}`)

    const updateData = emailUpdateStore[newEmail]
    
    if (!updateData) {
      return res.status(400).json({
        success: false,
        message: 'No verification found. Please request a new code.'
      })
    }

    // Check if code is expired (10 minutes)
    const tokenAge = Date.now() - updateData.createdAt
    if (tokenAge > 10 * 60 * 1000) {
      delete emailUpdateStore[newEmail]
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new one.'
      })
    }

    // Check attempts (max 5)
    if (updateData.attempts >= 5) {
      delete emailUpdateStore[newEmail]
      return res.status(400).json({
        success: false,
        message: 'Too many failed attempts. Please request a new code.'
      })
    }

    // Verify code
    if (updateData.code !== code) {
      updateData.attempts += 1
      const remainingAttempts = 5 - updateData.attempts
      return res.status(400).json({
        success: false,
        message: `Invalid code. ${remainingAttempts} attempts remaining.`
      })
    }

    // Update email in ALL sections
    const timestamp = new Date().toISOString()
    const gmtDate = new Date().toUTCString()
    const gmtTime = new Date().toTimeString()
    
    // Get current profile
    const result = await docClient.send(new GetCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${updateData.userId}`,
        SK: 'PROFILE'
      }
    }))

    if (!result.Item) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      })
    }

    const user = result.Item
    const currentProfile = user.profile || {}

    // Create updated profile with email in ALL sections
    const updatedProfile = { ...currentProfile }

    // Update basics
    if (updatedProfile.basics) {
      updatedProfile.basics = {
        ...updatedProfile.basics,
        emailAddress: newEmail
      }
    }

    // Update ALL sections that might have email
    const sectionsWithEmail = [
      'trade', 'workHistory', 'availability', 'emergency', 
      'certifications', 'tax', 'payment', 'medical', 'wizard'
    ]

    sectionsWithEmail.forEach(section => {
      if (updatedProfile[section]) {
        updatedProfile[section] = {
          ...updatedProfile[section],
          emailAddress: newEmail
        }
      }
    })

    // Update root level if it exists
    if (updatedProfile.emailAddress !== undefined) {
      updatedProfile.emailAddress = newEmail
    }

    // Add timestamp
    updatedProfile.lastEmailUpdate = timestamp

    // Save updated profile
    await docClient.send(new UpdateCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${updateData.userId}`,
        SK: 'PROFILE'
      },
      UpdateExpression: 'SET profile = :profile, updatedAt = :timestamp',
      ExpressionAttributeValues: {
        ':profile': updatedProfile,
        ':timestamp': timestamp
      }
    }))

    // ✅ Log the email change to EmailChangeLogs table
    await logEmailChange({
      workerId: updateData.userId,
      oldEmail: updateData.oldEmail,
      newEmail: newEmail,
      timestamp: timestamp,
      gmtDate: gmtDate,
      gmtTime: gmtTime,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    })

    // Clean up
    delete emailUpdateStore[newEmail]

    console.log(`✅ Email updated successfully for user: ${updateData.userId}`)

    res.json({
      success: true,
      message: 'Email updated successfully!',
      data: {
        userId: updateData.userId,
        newEmail: newEmail,
        oldEmail: updateData.oldEmail,
        updatedAt: timestamp
      }
    })

  } catch (error) {
    console.error('❌ Verify email update error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify and update email'
    })
  }
}

/**
 * ✅ Check if email is available (REAL-TIME)
 */
export const checkEmailAvailability = async (req, res) => {
  try {
    const { email } = req.query

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      })
    }

    console.log(`🔍 Checking email availability: ${email}`)

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

    const exists = result.Items && result.Items.length > 0

    res.json({
      success: true,
      data: {
        email,
        available: !exists,
        exists: exists
      }
    })

  } catch (error) {
    console.error('❌ Check email availability error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to check email availability'
    })
  }
}

/**
 * ✅ Log email change to EmailChangeLogs table
 */
const logEmailChange = async (data) => {
  try {
    const timestamp = new Date().toISOString()
    
    console.log('📝 Logging email change:', {
      workerId: data.workerId,
      oldEmail: data.oldEmail,
      newEmail: data.newEmail,
      gmtDate: data.gmtDate,
      gmtTime: data.gmtTime
    })

    await docClient.send(new PutCommand({
      TableName: 'EmailChangeLogs',
      Item: {
        PK: `EMAIL_LOG#${data.workerId}`,
        SK: `${timestamp}`,
        workerId: data.workerId,
        oldEmail: data.oldEmail,
        newEmail: data.newEmail,
        changedAt: timestamp,
        gmtDate: data.gmtDate || new Date().toUTCString(),
        gmtTime: data.gmtTime || new Date().toTimeString(),
        ipAddress: data.ipAddress || 'unknown',
        ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
      }
    }))
    console.log('✅ Email change logged successfully')
  } catch (error) {
    console.error('❌ Failed to log email change:', error)
  }
}

// ============================================================
// 🔧 HELPERS
// ============================================================

function generateVerificationCode() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

function generateVerificationToken() {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15)
}

// ============================================================
// 🏥 EXPORT ALL
// ============================================================

export default {
  sendEmailVerification,
  verifyEmailCode,
  login,
  register,
  forgotPassword,
  resetPassword,
  checkEmailVerification,
  requestEmailUpdate,
  verifyEmailUpdate,
  checkEmailAvailability
}