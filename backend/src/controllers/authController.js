// // backend/src/controllers/authController.js
// import { sendVerificationEmail } from '../services/emailService.js' // ✅ This now uses Resend
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

// // ✅ Store verification tokens (temporary - use Redis in production)
// const verificationStore = {}
// const passwordResetStore = {}

// // ============================================================
// // 📧 EMAIL VERIFICATION
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

//     console.log(`📧 Sending verification email to: ${email}`)
    
//     const token = generateVerificationToken()
    
//     verificationStore[token] = {
//       email,
//       verified: false,
//       createdAt: Date.now()
//     }

//     const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`
    
//     // ✅ Send verification email using Resend
//     const result = await sendVerificationEmail(email, verificationLink)

//     if (result.success) {
//       res.json({
//         success: true,
//         message: "Verification email sent successfully",
//         data: {
//           email,
//           messageId: result.messageId
//         }
//       })
//     } else {
//       res.status(500).json({
//         success: false,
//         message: result.message || 'Failed to send verification email'
//       })
//     }

//   } catch (error) {
//     console.error('❌ Send verification error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to send verification email'
//     })
//   }
// }

// export const verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.query

//     if (!token) {
//       return res.status(400).json({
//         success: false,
//         message: 'Verification token is required'
//       })
//     }

//     const verificationData = verificationStore[token]
    
//     if (!verificationData) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid or expired verification token'
//       })
//     }

//     // ✅ Check if token is expired (24 hours)
//     const tokenAge = Date.now() - verificationData.createdAt
//     if (tokenAge > 24 * 60 * 60 * 1000) { // 24 hours
//       delete verificationStore[token]
//       return res.status(400).json({
//         success: false,
//         message: 'Verification token has expired. Please request a new one.'
//       })
//     }

//     // ✅ Mark as verified
//     verificationData.verified = true

//     // ✅ Update user's emailVerified status in DynamoDB
//     if (verificationData.userId) {
//       try {
//         await docClient.send(new UpdateCommand({
//           TableName: WORKERS_TABLE,
//           Key: {
//             PK: `WORKER#${verificationData.userId}`,
//             SK: 'PROFILE'
//           },
//           UpdateExpression: 'SET emailVerified = :verified, updatedAt = :timestamp',
//           ExpressionAttributeValues: {
//             ':verified': true,
//             ':timestamp': new Date().toISOString()
//           }
//         }))
//         console.log(`✅ Email verified for user: ${verificationData.userId}`)
//       } catch (dbError) {
//         console.error('❌ Failed to update emailVerified status:', dbError)
//         // Continue even if DB update fails - the verification store is already updated
//       }
//     }

//     console.log(`✅ Email verified successfully: ${verificationData.email}`)

//     res.json({
//       success: true,
//       email: verificationData.email,
//       message: 'Email verified successfully! You can now login.'
//     })

//   } catch (error) {
//     console.error('❌ Verify email error:', error)
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

//     // ✅ Check if email is verified (optional - can be skipped for development)
//     // const isEmailVerified = user.emailVerified || false
//     // if (!isEmailVerified) {
//     //   return res.status(403).json({
//     //     success: false,
//     //     message: 'Please verify your email before logging in'
//     //   })
//     // }

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

//     // ✅ Send verification email
//     const token = generateVerificationToken()
//     verificationStore[token] = {
//       email,
//       verified: false,
//       userId,
//       createdAt: Date.now()
//     }
//     const verificationLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`
    
//     // ✅ Send verification email using Resend
//     const emailResult = await sendVerificationEmail(email, verificationLink)
    
//     if (!emailResult.success) {
//       console.warn(`⚠️ Verification email failed to send: ${emailResult.message}`)
//       // Continue anyway - user can request verification later
//     }

//     console.log(`✅ User registered: ${email}`)

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully. Please verify your email.',
//       data: {
//         userId,
//         email,
//         verificationSent: emailResult.success
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
//     const { token } = req.query

//     if (!token || !verificationStore[token]) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid token'
//       })
//     }

//     const data = verificationStore[token]
//     res.json({
//       success: true,
//       data: {
//         email: data.email,
//         verified: data.verified
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
// // 🔧 HELPERS
// // ============================================================

// function generateVerificationToken() {
//   return Math.random().toString(36).substring(2, 15) + 
//          Math.random().toString(36).substring(2, 15)
// }

// // ============================================================
// // 🏥 EXPORT ALL
// // ============================================================

// export default {
//   sendEmailVerification,
//   verifyEmail,
//   login,
//   register,
//   forgotPassword,
//   resetPassword,
//   checkEmailVerification
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

// // ✅ Store verification codes (temporary - use Redis in production)
// const verificationStore = {}
// const passwordResetStore = {}

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

//     // ✅ Generate verification code
//     const verificationCode = generateVerificationCode()
//     verificationStore[email] = {
//       code: verificationCode,
//       verified: false,
//       userId,
//       createdAt: Date.now(),
//       attempts: 0
//     }

//     // ✅ Send verification code via email
//     const emailResult = await sendVerificationEmail(email, verificationCode)
    
//     if (!emailResult.success) {
//       console.warn(`⚠️ Verification email failed to send: ${emailResult.message}`)
//     }

//     console.log(`✅ User registered: ${email}`)

//     res.status(201).json({
//       success: true,
//       message: 'User registered successfully. Please verify your email.',
//       data: {
//         userId,
//         email,
//         verificationSent: emailResult.success
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
//   verifyEmailCode,  // ✅ New function
//   login,
//   register,
//   forgotPassword,
//   resetPassword,
//   checkEmailVerification
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

// ✅ Store verification codes (temporary - use Redis in production)
const verificationStore = {}
const passwordResetStore = {}

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
    
    // ✅ Generate 6-digit verification code
    const verificationCode = generateVerificationCode()
    
    // ✅ Store with expiry (10 minutes)
    verificationStore[email] = {
      code: verificationCode,
      verified: false,
      createdAt: Date.now(),
      attempts: 0
    }

    // ✅ Send verification code via email
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

    // ✅ Check if code is expired (10 minutes)
    const tokenAge = Date.now() - verificationData.createdAt
    if (tokenAge > 10 * 60 * 1000) { // 10 minutes
      delete verificationStore[email]
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new one.'
      })
    }

    // ✅ Check attempts (max 5 attempts)
    if (verificationData.attempts >= 5) {
      delete verificationStore[email]
      return res.status(400).json({
        success: false,
        message: 'Too many failed attempts. Please request a new code.'
      })
    }

    // ✅ Verify code
    if (verificationData.code !== code) {
      verificationData.attempts += 1
      const remainingAttempts = 5 - verificationData.attempts
      return res.status(400).json({
        success: false,
        message: `Invalid code. ${remainingAttempts} attempts remaining.`
      })
    }

    // ✅ Code is correct - mark as verified
    verificationData.verified = true

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
    
    if (users.length > 0) {
      const user = users[0]
      // ✅ Update user's emailVerified status in DynamoDB
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

    // ✅ Clean up
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
    
    // ✅ Check if password is set
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
// 📝 REGISTER - NO AUTO EMAIL SENDING
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

    // ✅ Create user ID
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

    // ✅ Save to DynamoDB
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

    // ✅ Generate verification code and store it (but DON'T send email)
    const verificationCode = generateVerificationCode()
    verificationStore[email] = {
      code: verificationCode,
      verified: false,
      userId,
      createdAt: Date.now(),
      attempts: 0
    }

    // ❌ REMOVED: Auto-send email during registration
    // The user will request the code on the verify page
    // const emailResult = await sendVerificationEmail(email, verificationCode)

    console.log(`✅ User registered: ${email}`)

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please verify your email.',
      data: {
        userId,
        email,
        verificationSent: false  // ✅ Always false now
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

    const user = result.Items[0]

    // ✅ Generate reset token
    const resetToken = generateVerificationToken()
    passwordResetStore[resetToken] = {
      email,
      userId: user.userId,
      createdAt: Date.now()
    }

    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${resetToken}`
    
    // ✅ Send password reset email using Resend SMTP
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

    // Check if token is expired (1 hour)
    const tokenAge = Date.now() - resetData.createdAt
    if (tokenAge > 3600000) { // 1 hour in milliseconds
      delete passwordResetStore[token]
      return res.status(400).json({
        success: false,
        message: 'Token has expired. Please request a new password reset.'
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
// 🔧 HELPERS
// ============================================================

function generateVerificationCode() {
  // Generate 6-digit code
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
  checkEmailVerification
}