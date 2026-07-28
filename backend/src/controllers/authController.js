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
// const phoneUpdateStore = {}

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

// export const requestEmailUpdate = async (req, res) => {
//   try {
//     const { userId, newEmail, currentPassword } = req.body

//     if (!userId || !newEmail) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID and new email are required'
//       })
//     }

//     console.log(`📧 Email update requested for user: ${userId} to: ${newEmail}`)

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

//     if (currentPassword && currentPassword.trim() !== '') {
//       const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
//       if (!isValidPassword) {
//         return res.status(401).json({
//           success: false,
//           message: 'Current password is incorrect'
//         })
//       }
//     }

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

//     const verificationCode = generateVerificationCode()
//     const timestamp = new Date().toISOString()

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

//     const tokenAge = Date.now() - updateData.createdAt
//     if (tokenAge > 10 * 60 * 1000) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Verification code has expired. Please request a new one.'
//       })
//     }

//     if (updateData.attempts >= 5) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new code.'
//       })
//     }

//     if (updateData.code !== code) {
//       updateData.attempts += 1
//       const remainingAttempts = 5 - updateData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid code. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     const timestamp = new Date().toISOString()
//     const gmtDate = new Date().toUTCString()
//     const gmtTime = new Date().toTimeString()
    
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

//     const updatedProfile = { ...currentProfile }

//     if (updatedProfile.basics) {
//       updatedProfile.basics = {
//         ...updatedProfile.basics,
//         emailAddress: newEmail
//       }
//     }

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

//     if (updatedProfile.emailAddress !== undefined) {
//       updatedProfile.emailAddress = newEmail
//     }

//     updatedProfile.lastEmailUpdate = timestamp

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

//     await logEmailChange({
//       workerId: updateData.userId,
//       oldEmail: updateData.oldEmail,
//       newEmail: newEmail,
//       timestamp: timestamp,
//       gmtDate: gmtDate,
//       gmtTime: gmtTime,
//       ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
//     })

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

// // ============================================================
// // 📱 PHONE UPDATE WITH VERIFICATION
// // ============================================================

// export const requestPhoneUpdate = async (req, res) => {
//   try {
//     const { userId, newPhone } = req.body

//     if (!userId || !newPhone) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID and new phone number are required'
//       })
//     }

//     const digitsOnly = newPhone.replace(/\D/g, '')
    
//     if (digitsOnly.length !== 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter a valid 10-digit phone number'
//       })
//     }

//     console.log(`📱 Phone update requested for user: ${userId} to: ${digitsOnly}`)

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

//     const phoneCheck = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#phone = :phone',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#phone': 'mobilePhone'
//       },
//       ExpressionAttributeValues: {
//         ':phone': digitsOnly
//       }
//     }))

//     if (phoneCheck.Items && phoneCheck.Items.length > 0) {
//       return res.status(409).json({
//         success: false,
//         message: 'This phone number is already registered'
//       })
//     }

//     const otpCode = generateVerificationCode()
//     const timestamp = new Date().toISOString()

//     phoneUpdateStore[digitsOnly] = {
//       userId,
//       oldPhone: user.profile.basics.mobilePhone || '',
//       newPhone: digitsOnly,
//       code: otpCode,
//       verified: false,
//       createdAt: Date.now(),
//       attempts: 0,
//       timestamp
//     }

//     console.log(`✅ OTP generated for ${digitsOnly}`)

//     res.json({
//       success: true,
//       message: 'OTP generated successfully',
//       data: {
//         newPhone: digitsOnly,
//       }
//     })

//   } catch (error) {
//     console.error('❌ Request phone update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to request phone update'
//     })
//   }
// }

// export const verifyPhoneUpdate = async (req, res) => {
//   try {
//     const { newPhone, code } = req.body

//     if (!newPhone || !code) {
//       return res.status(400).json({
//         success: false,
//         message: 'Phone number and OTP are required'
//       })
//     }

//     const digitsOnly = newPhone.replace(/\D/g, '')
    
//     console.log(`🔐 Verifying phone update for: ${digitsOnly}`)

//     const updateData = phoneUpdateStore[digitsOnly]
    
//     if (!updateData) {
//       return res.status(400).json({
//         success: false,
//         message: 'No verification found. Please request a new OTP.'
//       })
//     }

//     const tokenAge = Date.now() - updateData.createdAt
//     if (tokenAge > 10 * 60 * 1000) {
//       delete phoneUpdateStore[digitsOnly]
//       return res.status(400).json({
//         success: false,
//         message: 'OTP has expired. Please request a new one.'
//       })
//     }

//     if (updateData.attempts >= 5) {
//       delete phoneUpdateStore[digitsOnly]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new OTP.'
//       })
//     }

//     if (updateData.code !== code) {
//       updateData.attempts += 1
//       const remainingAttempts = 5 - updateData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid OTP. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     const timestamp = new Date().toISOString()
//     const gmtDate = new Date().toUTCString()
//     const gmtTime = new Date().toTimeString()
    
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

//     const updatedProfile = { ...currentProfile }

//     if (updatedProfile.basics) {
//       updatedProfile.basics = {
//         ...updatedProfile.basics,
//         mobilePhone: digitsOnly
//       }
//     }

//     const sectionsWithPhone = [
//       'trade', 'workHistory', 'availability', 'emergency', 
//       'certifications', 'tax', 'payment', 'medical', 'wizard'
//     ]

//     sectionsWithPhone.forEach(section => {
//       if (updatedProfile[section]) {
//         updatedProfile[section] = {
//           ...updatedProfile[section],
//           mobilePhone: digitsOnly
//         }
//       }
//     })

//     if (updatedProfile.mobilePhone !== undefined) {
//       updatedProfile.mobilePhone = digitsOnly
//     }

//     updatedProfile.lastPhoneUpdate = timestamp

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

//     await logPhoneChange({
//       workerId: updateData.userId,
//       oldPhone: updateData.oldPhone,
//       newPhone: digitsOnly,
//       timestamp: timestamp,
//       gmtDate: gmtDate,
//       gmtTime: gmtTime,
//       ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
//     })

//     delete phoneUpdateStore[digitsOnly]

//     console.log(`✅ Phone updated successfully for user: ${updateData.userId}`)

//     res.json({
//       success: true,
//       message: 'Phone number updated successfully!',
//       data: {
//         userId: updateData.userId,
//         newPhone: digitsOnly,
//         oldPhone: updateData.oldPhone,
//         updatedAt: timestamp
//       }
//     })

//   } catch (error) {
//     console.error('❌ Verify phone update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to verify and update phone'
//     })
//   }
// }

// export const checkPhoneAvailability = async (req, res) => {
//   try {
//     const { phone } = req.query

//     if (!phone) {
//       return res.status(400).json({
//         success: false,
//         message: 'Phone number is required'
//       })
//     }

//     const digitsOnly = phone.replace(/\D/g, '')
    
//     if (digitsOnly.length !== 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter a valid 10-digit phone number'
//       })
//     }

//     console.log(`🔍 Checking phone availability: ${digitsOnly}`)

//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#phone = :phone',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#phone': 'mobilePhone'
//       },
//       ExpressionAttributeValues: {
//         ':phone': digitsOnly
//       }
//     }))

//     const exists = result.Items && result.Items.length > 0
//     const pendingUpdate = !!phoneUpdateStore[digitsOnly]

//     res.json({
//       success: true,
//       data: {
//         phone: digitsOnly,
//         available: !exists && !pendingUpdate,
//         exists: exists,
//         pendingUpdate: pendingUpdate
//       }
//     })

//   } catch (error) {
//     console.error('❌ Check phone availability error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to check phone availability'
//     })
//   }
// }

// // ============================================================
// // 📝 LOGGING FUNCTIONS
// // ============================================================

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

// const logPhoneChange = async (data) => {
//   try {
//     const timestamp = new Date().toISOString()
    
//     console.log('📝 Logging phone change:', {
//       workerId: data.workerId,
//       oldPhone: data.oldPhone,
//       newPhone: data.newPhone,
//       gmtDate: data.gmtDate,
//       gmtTime: data.gmtTime
//     })

//     await docClient.send(new PutCommand({
//       TableName: 'PhoneChangeLogs',
//       Item: {
//         PK: `PHONE_LOG#${data.workerId}`,
//         SK: `${timestamp}`,
//         workerId: data.workerId,
//         oldPhone: data.oldPhone,
//         newPhone: data.newPhone,
//         changedAt: timestamp,
//         gmtDate: data.gmtDate || new Date().toUTCString(),
//         gmtTime: data.gmtTime || new Date().toTimeString(),
//         ipAddress: data.ipAddress || 'unknown',
//         ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
//       }
//     }))
//     console.log('✅ Phone change logged successfully')
//   } catch (error) {
//     console.error('❌ Failed to log phone change:', error)
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
//   checkEmailAvailability,
//   requestPhoneUpdate,
//   verifyPhoneUpdate,
//   checkPhoneAvailability
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
// const phoneUpdateStore = {}

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
//  * currentPassword is OPTIONAL
//  */
// export const requestEmailUpdate = async (req, res) => {
//   try {
//     const { userId, newEmail, currentPassword } = req.body

//     if (!userId || !newEmail) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID and new email are required'
//       })
//     }

//     console.log(`📧 Email update requested for user: ${userId} to: ${newEmail}`)

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

//     // Optional password check
//     if (currentPassword && currentPassword.trim() !== '') {
//       const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
//       if (!isValidPassword) {
//         return res.status(401).json({
//           success: false,
//           message: 'Current password is incorrect'
//         })
//       }
//     }

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

//     const verificationCode = generateVerificationCode()
//     const timestamp = new Date().toISOString()

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

//     const tokenAge = Date.now() - updateData.createdAt
//     if (tokenAge > 10 * 60 * 1000) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Verification code has expired. Please request a new one.'
//       })
//     }

//     if (updateData.attempts >= 5) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new code.'
//       })
//     }

//     if (updateData.code !== code) {
//       updateData.attempts += 1
//       const remainingAttempts = 5 - updateData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid code. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     const timestamp = new Date().toISOString()
//     const gmtDate = new Date().toUTCString()
//     const gmtTime = new Date().toTimeString()
    
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

//     const updatedProfile = { ...currentProfile }

//     if (updatedProfile.basics) {
//       updatedProfile.basics = {
//         ...updatedProfile.basics,
//         emailAddress: newEmail
//       }
//     }

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

//     if (updatedProfile.emailAddress !== undefined) {
//       updatedProfile.emailAddress = newEmail
//     }

//     updatedProfile.lastEmailUpdate = timestamp

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

//     await logEmailChange({
//       workerId: updateData.userId,
//       oldEmail: updateData.oldEmail,
//       newEmail: newEmail,
//       timestamp: timestamp,
//       gmtDate: gmtDate,
//       gmtTime: gmtTime,
//       ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
//     })

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

// // ============================================================
// // 📱 PHONE UPDATE WITH VERIFICATION
// // ============================================================

// /**
//  * ✅ Request phone update - generates OTP for new phone
//  * POST /api/auth/request-phone-update
//  */
// export const requestPhoneUpdate = async (req, res) => {
//   try {
//     const { userId, newPhone } = req.body

//     if (!userId || !newPhone) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID and new phone number are required'
//       })
//     }

//     const digitsOnly = newPhone.replace(/\D/g, '')
    
//     if (digitsOnly.length !== 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter a valid 10-digit phone number'
//       })
//     }

//     console.log(`📱 Phone update requested for user: ${userId} to: ${digitsOnly}`)

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

//     const phoneCheck = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#phone = :phone',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#phone': 'mobilePhone'
//       },
//       ExpressionAttributeValues: {
//         ':phone': digitsOnly
//       }
//     }))

//     if (phoneCheck.Items && phoneCheck.Items.length > 0) {
//       return res.status(409).json({
//         success: false,
//         message: 'This phone number is already registered'
//       })
//     }

//     const otpCode = generateVerificationCode()
//     const timestamp = new Date().toISOString()

//     phoneUpdateStore[digitsOnly] = {
//       userId,
//       oldPhone: user.profile.basics.mobilePhone || '',
//       newPhone: digitsOnly,
//       code: otpCode,
//       verified: false,
//       createdAt: Date.now(),
//       attempts: 0,
//       timestamp
//     }

//     console.log(`✅ OTP generated for ${digitsOnly}`)

//     res.json({
//       success: true,
//       message: 'OTP generated successfully',
//       data: {
//         newPhone: digitsOnly,
//       }
//     })

//   } catch (error) {
//     console.error('❌ Request phone update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to request phone update'
//     })
//   }
// }

// /**
//  * ✅ Verify phone OTP and complete the update
//  * POST /api/auth/verify-phone-update
//  */
// export const verifyPhoneUpdate = async (req, res) => {
//   try {
//     const { newPhone, code } = req.body

//     if (!newPhone || !code) {
//       return res.status(400).json({
//         success: false,
//         message: 'Phone number and OTP are required'
//       })
//     }

//     const digitsOnly = newPhone.replace(/\D/g, '')
    
//     console.log(`🔐 Verifying phone update for: ${digitsOnly}`)

//     const updateData = phoneUpdateStore[digitsOnly]
    
//     if (!updateData) {
//       return res.status(400).json({
//         success: false,
//         message: 'No verification found. Please request a new OTP.'
//       })
//     }

//     const tokenAge = Date.now() - updateData.createdAt
//     if (tokenAge > 10 * 60 * 1000) {
//       delete phoneUpdateStore[digitsOnly]
//       return res.status(400).json({
//         success: false,
//         message: 'OTP has expired. Please request a new one.'
//       })
//     }

//     if (updateData.attempts >= 5) {
//       delete phoneUpdateStore[digitsOnly]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new OTP.'
//       })
//     }

//     if (updateData.code !== code) {
//       updateData.attempts += 1
//       const remainingAttempts = 5 - updateData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid OTP. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     const timestamp = new Date().toISOString()
//     const gmtDate = new Date().toUTCString()
//     const gmtTime = new Date().toTimeString()
    
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

//     const updatedProfile = { ...currentProfile }

//     if (updatedProfile.basics) {
//       updatedProfile.basics = {
//         ...updatedProfile.basics,
//         mobilePhone: digitsOnly
//       }
//     }

//     const sectionsWithPhone = [
//       'trade', 'workHistory', 'availability', 'emergency', 
//       'certifications', 'tax', 'payment', 'medical', 'wizard'
//     ]

//     sectionsWithPhone.forEach(section => {
//       if (updatedProfile[section]) {
//         updatedProfile[section] = {
//           ...updatedProfile[section],
//           mobilePhone: digitsOnly
//         }
//       }
//     })

//     if (updatedProfile.mobilePhone !== undefined) {
//       updatedProfile.mobilePhone = digitsOnly
//     }

//     updatedProfile.lastPhoneUpdate = timestamp

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

//     await logPhoneChange({
//       workerId: updateData.userId,
//       oldPhone: updateData.oldPhone,
//       newPhone: digitsOnly,
//       timestamp: timestamp,
//       gmtDate: gmtDate,
//       gmtTime: gmtTime,
//       ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
//     })

//     delete phoneUpdateStore[digitsOnly]

//     console.log(`✅ Phone updated successfully for user: ${updateData.userId}`)

//     res.json({
//       success: true,
//       message: 'Phone number updated successfully!',
//       data: {
//         userId: updateData.userId,
//         newPhone: digitsOnly,
//         oldPhone: updateData.oldPhone,
//         updatedAt: timestamp
//       }
//     })

//   } catch (error) {
//     console.error('❌ Verify phone update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to verify and update phone'
//     })
//   }
// }

// /**
//  * ✅ Check if phone is available (REAL-TIME)
//  * GET /api/auth/check-phone-availability
//  */
// export const checkPhoneAvailability = async (req, res) => {
//   try {
//     const { phone } = req.query

//     if (!phone) {
//       return res.status(400).json({
//         success: false,
//         message: 'Phone number is required'
//       })
//     }

//     const digitsOnly = phone.replace(/\D/g, '')
    
//     if (digitsOnly.length !== 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter a valid 10-digit phone number'
//       })
//     }

//     console.log(`🔍 Checking phone availability: ${digitsOnly}`)

//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#phone = :phone',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#phone': 'mobilePhone'
//       },
//       ExpressionAttributeValues: {
//         ':phone': digitsOnly
//       }
//     }))

//     const exists = result.Items && result.Items.length > 0
//     const pendingUpdate = !!phoneUpdateStore[digitsOnly]

//     res.json({
//       success: true,
//       data: {
//         phone: digitsOnly,
//         available: !exists && !pendingUpdate,
//         exists: exists,
//         pendingUpdate: pendingUpdate
//       }
//     })

//   } catch (error) {
//     console.error('❌ Check phone availability error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to check phone availability'
//     })
//   }
// }

// // ============================================================
// // 📝 LOGGING FUNCTIONS
// // ============================================================

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

// /**
//  * ✅ Log phone change to PhoneChangeLogs table
//  */
// const logPhoneChange = async (data) => {
//   try {
//     const timestamp = new Date().toISOString()
    
//     console.log('📝 Logging phone change:', {
//       workerId: data.workerId,
//       oldPhone: data.oldPhone,
//       newPhone: data.newPhone,
//       gmtDate: data.gmtDate,
//       gmtTime: data.gmtTime
//     })

//     await docClient.send(new PutCommand({
//       TableName: 'PhoneChangeLogs',
//       Item: {
//         PK: `PHONE_LOG#${data.workerId}`,
//         SK: `${timestamp}`,
//         workerId: data.workerId,
//         oldPhone: data.oldPhone,
//         newPhone: data.newPhone,
//         changedAt: timestamp,
//         gmtDate: data.gmtDate || new Date().toUTCString(),
//         gmtTime: data.gmtTime || new Date().toTimeString(),
//         ipAddress: data.ipAddress || 'unknown',
//         ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
//       }
//     }))
//     console.log('✅ Phone change logged successfully')
//   } catch (error) {
//     console.error('❌ Failed to log phone change:', error)
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
//   checkEmailAvailability,
//   requestPhoneUpdate,
//   verifyPhoneUpdate,
//   checkPhoneAvailability
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
// const phoneUpdateStore = {}

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
//  * currentPassword is OPTIONAL
//  */
// export const requestEmailUpdate = async (req, res) => {
//   try {
//     const { userId, newEmail, currentPassword } = req.body

//     if (!userId || !newEmail) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID and new email are required'
//       })
//     }

//     console.log(`📧 Email update requested for user: ${userId} to: ${newEmail}`)

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

//     // Optional password check
//     if (currentPassword && currentPassword.trim() !== '') {
//       const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
//       if (!isValidPassword) {
//         return res.status(401).json({
//           success: false,
//           message: 'Current password is incorrect'
//         })
//       }
//     }

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

//     const verificationCode = generateVerificationCode()
//     const timestamp = new Date().toISOString()

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

//     const tokenAge = Date.now() - updateData.createdAt
//     if (tokenAge > 10 * 60 * 1000) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Verification code has expired. Please request a new one.'
//       })
//     }

//     if (updateData.attempts >= 5) {
//       delete emailUpdateStore[newEmail]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new code.'
//       })
//     }

//     if (updateData.code !== code) {
//       updateData.attempts += 1
//       const remainingAttempts = 5 - updateData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid code. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     const timestamp = new Date().toISOString()
//     const gmtDate = new Date().toUTCString()
//     const gmtTime = new Date().toTimeString()
    
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

//     const updatedProfile = { ...currentProfile }

//     if (updatedProfile.basics) {
//       updatedProfile.basics = {
//         ...updatedProfile.basics,
//         emailAddress: newEmail
//       }
//     }

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

//     if (updatedProfile.emailAddress !== undefined) {
//       updatedProfile.emailAddress = newEmail
//     }

//     updatedProfile.lastEmailUpdate = timestamp

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

//     await logEmailChange({
//       workerId: updateData.userId,
//       oldEmail: updateData.oldEmail,
//       newEmail: newEmail,
//       timestamp: timestamp,
//       gmtDate: gmtDate,
//       gmtTime: gmtTime,
//       ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
//     })

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

// // ============================================================
// // 📱 PHONE UPDATE WITH VERIFICATION
// // ============================================================

// /**
//  * ✅ Request phone update - generates OTP for new phone
//  * POST /api/auth/request-phone-update
//  */
// export const requestPhoneUpdate = async (req, res) => {
//   try {
//     const { userId, newPhone } = req.body

//     if (!userId || !newPhone) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID and new phone number are required'
//       })
//     }

//     const digitsOnly = newPhone.replace(/\D/g, '')
    
//     if (digitsOnly.length !== 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter a valid 10-digit phone number'
//       })
//     }

//     console.log(`📱 Phone update requested for user: ${userId} to: ${digitsOnly}`)

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

//     const phoneCheck = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#phone = :phone',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#phone': 'mobilePhone'
//       },
//       ExpressionAttributeValues: {
//         ':phone': digitsOnly
//       }
//     }))

//     if (phoneCheck.Items && phoneCheck.Items.length > 0) {
//       return res.status(409).json({
//         success: false,
//         message: 'This phone number is already registered'
//       })
//     }

//     const otpCode = generateVerificationCode()
//     const timestamp = new Date().toISOString()

//     phoneUpdateStore[digitsOnly] = {
//       userId,
//       oldPhone: user.profile.basics.mobilePhone || '',
//       newPhone: digitsOnly,
//       code: otpCode,
//       verified: false,
//       createdAt: Date.now(),
//       attempts: 0,
//       timestamp
//     }

//     console.log(`✅ OTP generated for ${digitsOnly}`)

//     res.json({
//       success: true,
//       message: 'OTP generated successfully',
//       data: {
//         newPhone: digitsOnly,
//       }
//     })

//   } catch (error) {
//     console.error('❌ Request phone update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to request phone update'
//     })
//   }
// }

// /**
//  * ✅ Verify phone OTP and complete the update
//  * POST /api/auth/verify-phone-update
//  */
// export const verifyPhoneUpdate = async (req, res) => {
//   try {
//     const { newPhone, code } = req.body

//     if (!newPhone || !code) {
//       return res.status(400).json({
//         success: false,
//         message: 'Phone number and OTP are required'
//       })
//     }

//     const digitsOnly = newPhone.replace(/\D/g, '')
    
//     console.log(`🔐 Verifying phone update for: ${digitsOnly}`)

//     const updateData = phoneUpdateStore[digitsOnly]
    
//     if (!updateData) {
//       return res.status(400).json({
//         success: false,
//         message: 'No verification found. Please request a new OTP.'
//       })
//     }

//     const tokenAge = Date.now() - updateData.createdAt
//     if (tokenAge > 10 * 60 * 1000) {
//       delete phoneUpdateStore[digitsOnly]
//       return res.status(400).json({
//         success: false,
//         message: 'OTP has expired. Please request a new one.'
//       })
//     }

//     if (updateData.attempts >= 5) {
//       delete phoneUpdateStore[digitsOnly]
//       return res.status(400).json({
//         success: false,
//         message: 'Too many failed attempts. Please request a new OTP.'
//       })
//     }

//     if (updateData.code !== code) {
//       updateData.attempts += 1
//       const remainingAttempts = 5 - updateData.attempts
//       return res.status(400).json({
//         success: false,
//         message: `Invalid OTP. ${remainingAttempts} attempts remaining.`
//       })
//     }

//     const timestamp = new Date().toISOString()
//     const gmtDate = new Date().toUTCString()
//     const gmtTime = new Date().toTimeString()
    
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

//     const updatedProfile = { ...currentProfile }

//     if (updatedProfile.basics) {
//       updatedProfile.basics = {
//         ...updatedProfile.basics,
//         mobilePhone: digitsOnly
//       }
//     }

//     const sectionsWithPhone = [
//       'trade', 'workHistory', 'availability', 'emergency', 
//       'certifications', 'tax', 'payment', 'medical', 'wizard'
//     ]

//     sectionsWithPhone.forEach(section => {
//       if (updatedProfile[section]) {
//         updatedProfile[section] = {
//           ...updatedProfile[section],
//           mobilePhone: digitsOnly
//         }
//       }
//     })

//     if (updatedProfile.mobilePhone !== undefined) {
//       updatedProfile.mobilePhone = digitsOnly
//     }

//     updatedProfile.lastPhoneUpdate = timestamp

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

//     await logPhoneChange({
//       workerId: updateData.userId,
//       oldPhone: updateData.oldPhone,
//       newPhone: digitsOnly,
//       timestamp: timestamp,
//       gmtDate: gmtDate,
//       gmtTime: gmtTime,
//       ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
//     })

//     delete phoneUpdateStore[digitsOnly]

//     console.log(`✅ Phone updated successfully for user: ${updateData.userId}`)

//     res.json({
//       success: true,
//       message: 'Phone number updated successfully!',
//       data: {
//         userId: updateData.userId,
//         newPhone: digitsOnly,
//         oldPhone: updateData.oldPhone,
//         updatedAt: timestamp
//       }
//     })

//   } catch (error) {
//     console.error('❌ Verify phone update error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to verify and update phone'
//     })
//   }
// }

// /**
//  * ✅ Check if phone is available (REAL-TIME)
//  * GET /api/auth/check-phone-availability
//  */
// export const checkPhoneAvailability = async (req, res) => {
//   try {
//     const { phone } = req.query

//     if (!phone) {
//       return res.status(400).json({
//         success: false,
//         message: 'Phone number is required'
//       })
//     }

//     const digitsOnly = phone.replace(/\D/g, '')
    
//     if (digitsOnly.length !== 10) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please enter a valid 10-digit phone number'
//       })
//     }

//     console.log(`🔍 Checking phone availability: ${digitsOnly}`)

//     const result = await docClient.send(new ScanCommand({
//       TableName: WORKERS_TABLE,
//       FilterExpression: '#profile.#basics.#phone = :phone',
//       ExpressionAttributeNames: {
//         '#profile': 'profile',
//         '#basics': 'basics',
//         '#phone': 'mobilePhone'
//       },
//       ExpressionAttributeValues: {
//         ':phone': digitsOnly
//       }
//     }))

//     const exists = result.Items && result.Items.length > 0
//     const pendingUpdate = !!phoneUpdateStore[digitsOnly]

//     res.json({
//       success: true,
//       data: {
//         phone: digitsOnly,
//         available: !exists && !pendingUpdate,
//         exists: exists,
//         pendingUpdate: pendingUpdate
//       }
//     })

//   } catch (error) {
//     console.error('❌ Check phone availability error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to check phone availability'
//     })
//   }
// }

// // ============================================================
// // 🔑 CHANGE PASSWORD
// // ============================================================

// /**
//  * ✅ Change password for authenticated user
//  * POST /api/auth/change-password
//  * Body: { userId, currentPassword, newPassword }
//  */
// export const changePassword = async (req, res) => {
//   try {
//     const { userId, currentPassword, newPassword } = req.body

//     if (!userId || !currentPassword || !newPassword) {
//       return res.status(400).json({
//         success: false,
//         message: 'User ID, current password, and new password are required'
//       })
//     }

//     console.log(`🔑 Password change requested for user: ${userId}`)

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

//     // ✅ Validate new password
//     if (newPassword.length < 8) {
//       return res.status(400).json({
//         success: false,
//         message: 'New password must be at least 8 characters'
//       })
//     }

//     // ✅ Hash new password
//     const salt = await bcrypt.genSalt(10)
//     const passwordHash = await bcrypt.hash(newPassword, salt)

//     // ✅ Update password in DynamoDB
//     await docClient.send(new UpdateCommand({
//       TableName: WORKERS_TABLE,
//       Key: {
//         PK: `WORKER#${userId}`,
//         SK: 'PROFILE'
//       },
//       UpdateExpression: 'SET passwordHash = :passwordHash, updatedAt = :timestamp',
//       ExpressionAttributeValues: {
//         ':passwordHash': passwordHash,
//         ':timestamp': new Date().toISOString()
//       }
//     }))

//     console.log(`✅ Password changed successfully for user: ${userId}`)

//     res.json({
//       success: true,
//       message: 'Password updated successfully',
//       data: {
//         userId,
//         updatedAt: new Date().toISOString()
//       }
//     })

//   } catch (error) {
//     console.error('❌ Change password error:', error)
//     res.status(500).json({
//       success: false,
//       message: error.message || 'Failed to change password'
//     })
//   }
// }

// // ============================================================
// // 📝 LOGGING FUNCTIONS
// // ============================================================

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

// /**
//  * ✅ Log phone change to PhoneChangeLogs table
//  */
// const logPhoneChange = async (data) => {
//   try {
//     const timestamp = new Date().toISOString()
    
//     console.log('📝 Logging phone change:', {
//       workerId: data.workerId,
//       oldPhone: data.oldPhone,
//       newPhone: data.newPhone,
//       gmtDate: data.gmtDate,
//       gmtTime: data.gmtTime
//     })

//     await docClient.send(new PutCommand({
//       TableName: 'PhoneChangeLogs',
//       Item: {
//         PK: `PHONE_LOG#${data.workerId}`,
//         SK: `${timestamp}`,
//         workerId: data.workerId,
//         oldPhone: data.oldPhone,
//         newPhone: data.newPhone,
//         changedAt: timestamp,
//         gmtDate: data.gmtDate || new Date().toUTCString(),
//         gmtTime: data.gmtTime || new Date().toTimeString(),
//         ipAddress: data.ipAddress || 'unknown',
//         ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
//       }
//     }))
//     console.log('✅ Phone change logged successfully')
//   } catch (error) {
//     console.error('❌ Failed to log phone change:', error)
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
//   checkEmailAvailability,
//   requestPhoneUpdate,
//   verifyPhoneUpdate,
//   checkPhoneAvailability,
//   changePassword // ✅ Added changePassword
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
const phoneUpdateStore = {}

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
 * currentPassword is OPTIONAL
 */
export const requestEmailUpdate = async (req, res) => {
  try {
    const { userId, newEmail, currentPassword } = req.body

    if (!userId || !newEmail) {
      return res.status(400).json({
        success: false,
        message: 'User ID and new email are required'
      })
    }

    console.log(`📧 Email update requested for user: ${userId} to: ${newEmail}`)

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

    // Optional password check
    if (currentPassword && currentPassword.trim() !== '') {
      const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
      if (!isValidPassword) {
        return res.status(401).json({
          success: false,
          message: 'Current password is incorrect'
        })
      }
    }

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

    const verificationCode = generateVerificationCode()
    const timestamp = new Date().toISOString()

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

    const tokenAge = Date.now() - updateData.createdAt
    if (tokenAge > 10 * 60 * 1000) {
      delete emailUpdateStore[newEmail]
      return res.status(400).json({
        success: false,
        message: 'Verification code has expired. Please request a new one.'
      })
    }

    if (updateData.attempts >= 5) {
      delete emailUpdateStore[newEmail]
      return res.status(400).json({
        success: false,
        message: 'Too many failed attempts. Please request a new code.'
      })
    }

    if (updateData.code !== code) {
      updateData.attempts += 1
      const remainingAttempts = 5 - updateData.attempts
      return res.status(400).json({
        success: false,
        message: `Invalid code. ${remainingAttempts} attempts remaining.`
      })
    }

    const timestamp = new Date().toISOString()
    const gmtDate = new Date().toUTCString()
    const gmtTime = new Date().toTimeString()
    
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

    const updatedProfile = { ...currentProfile }

    if (updatedProfile.basics) {
      updatedProfile.basics = {
        ...updatedProfile.basics,
        emailAddress: newEmail
      }
    }

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

    if (updatedProfile.emailAddress !== undefined) {
      updatedProfile.emailAddress = newEmail
    }

    updatedProfile.lastEmailUpdate = timestamp

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

    await logEmailChange({
      workerId: updateData.userId,
      oldEmail: updateData.oldEmail,
      newEmail: newEmail,
      timestamp: timestamp,
      gmtDate: gmtDate,
      gmtTime: gmtTime,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    })

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

// ============================================================
// 📱 PHONE UPDATE WITH VERIFICATION
// ============================================================

/**
 * ✅ Request phone update - generates OTP for new phone
 * POST /api/auth/request-phone-update
 */
export const requestPhoneUpdate = async (req, res) => {
  try {
    const { userId, newPhone } = req.body

    if (!userId || !newPhone) {
      return res.status(400).json({
        success: false,
        message: 'User ID and new phone number are required'
      })
    }

    const digitsOnly = newPhone.replace(/\D/g, '')
    
    if (digitsOnly.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit phone number'
      })
    }

    console.log(`📱 Phone update requested for user: ${userId} to: ${digitsOnly}`)

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

    const phoneCheck = await docClient.send(new ScanCommand({
      TableName: WORKERS_TABLE,
      FilterExpression: '#profile.#basics.#phone = :phone',
      ExpressionAttributeNames: {
        '#profile': 'profile',
        '#basics': 'basics',
        '#phone': 'mobilePhone'
      },
      ExpressionAttributeValues: {
        ':phone': digitsOnly
      }
    }))

    if (phoneCheck.Items && phoneCheck.Items.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'This phone number is already registered'
      })
    }

    const otpCode = generateVerificationCode()
    const timestamp = new Date().toISOString()

    phoneUpdateStore[digitsOnly] = {
      userId,
      oldPhone: user.profile.basics.mobilePhone || '',
      newPhone: digitsOnly,
      code: otpCode,
      verified: false,
      createdAt: Date.now(),
      attempts: 0,
      timestamp
    }

    console.log(`✅ OTP generated for ${digitsOnly}`)

    res.json({
      success: true,
      message: 'OTP generated successfully',
      data: {
        newPhone: digitsOnly,
      }
    })

  } catch (error) {
    console.error('❌ Request phone update error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to request phone update'
    })
  }
}

/**
 * ✅ Verify phone OTP and complete the update
 * POST /api/auth/verify-phone-update
 */
export const verifyPhoneUpdate = async (req, res) => {
  try {
    const { newPhone, code } = req.body

    if (!newPhone || !code) {
      return res.status(400).json({
        success: false,
        message: 'Phone number and OTP are required'
      })
    }

    const digitsOnly = newPhone.replace(/\D/g, '')
    
    console.log(`🔐 Verifying phone update for: ${digitsOnly}`)

    const updateData = phoneUpdateStore[digitsOnly]
    
    if (!updateData) {
      return res.status(400).json({
        success: false,
        message: 'No verification found. Please request a new OTP.'
      })
    }

    const tokenAge = Date.now() - updateData.createdAt
    if (tokenAge > 10 * 60 * 1000) {
      delete phoneUpdateStore[digitsOnly]
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please request a new one.'
      })
    }

    if (updateData.attempts >= 5) {
      delete phoneUpdateStore[digitsOnly]
      return res.status(400).json({
        success: false,
        message: 'Too many failed attempts. Please request a new OTP.'
      })
    }

    if (updateData.code !== code) {
      updateData.attempts += 1
      const remainingAttempts = 5 - updateData.attempts
      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${remainingAttempts} attempts remaining.`
      })
    }

    const timestamp = new Date().toISOString()
    const gmtDate = new Date().toUTCString()
    const gmtTime = new Date().toTimeString()
    
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

    const updatedProfile = { ...currentProfile }

    if (updatedProfile.basics) {
      updatedProfile.basics = {
        ...updatedProfile.basics,
        mobilePhone: digitsOnly
      }
    }

    const sectionsWithPhone = [
      'trade', 'workHistory', 'availability', 'emergency', 
      'certifications', 'tax', 'payment', 'medical', 'wizard'
    ]

    sectionsWithPhone.forEach(section => {
      if (updatedProfile[section]) {
        updatedProfile[section] = {
          ...updatedProfile[section],
          mobilePhone: digitsOnly
        }
      }
    })

    if (updatedProfile.mobilePhone !== undefined) {
      updatedProfile.mobilePhone = digitsOnly
    }

    updatedProfile.lastPhoneUpdate = timestamp

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

    await logPhoneChange({
      workerId: updateData.userId,
      oldPhone: updateData.oldPhone,
      newPhone: digitsOnly,
      timestamp: timestamp,
      gmtDate: gmtDate,
      gmtTime: gmtTime,
      ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown'
    })

    delete phoneUpdateStore[digitsOnly]

    console.log(`✅ Phone updated successfully for user: ${updateData.userId}`)

    res.json({
      success: true,
      message: 'Phone number updated successfully!',
      data: {
        userId: updateData.userId,
        newPhone: digitsOnly,
        oldPhone: updateData.oldPhone,
        updatedAt: timestamp
      }
    })

  } catch (error) {
    console.error('❌ Verify phone update error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to verify and update phone'
    })
  }
}

/**
 * ✅ Check if phone is available (REAL-TIME)
 * GET /api/auth/check-phone-availability
 */
export const checkPhoneAvailability = async (req, res) => {
  try {
    const { phone } = req.query

    if (!phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required'
      })
    }

    const digitsOnly = phone.replace(/\D/g, '')
    
    if (digitsOnly.length !== 10) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid 10-digit phone number'
      })
    }

    console.log(`🔍 Checking phone availability: ${digitsOnly}`)

    const result = await docClient.send(new ScanCommand({
      TableName: WORKERS_TABLE,
      FilterExpression: '#profile.#basics.#phone = :phone',
      ExpressionAttributeNames: {
        '#profile': 'profile',
        '#basics': 'basics',
        '#phone': 'mobilePhone'
      },
      ExpressionAttributeValues: {
        ':phone': digitsOnly
      }
    }))

    const exists = result.Items && result.Items.length > 0
    const pendingUpdate = !!phoneUpdateStore[digitsOnly]

    res.json({
      success: true,
      data: {
        phone: digitsOnly,
        available: !exists && !pendingUpdate,
        exists: exists,
        pendingUpdate: pendingUpdate
      }
    })

  } catch (error) {
    console.error('❌ Check phone availability error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to check phone availability'
    })
  }
}

// ============================================================
// 🔑 CHANGE PASSWORD
// ============================================================

/**
 * ✅ Change password for authenticated user
 * POST /api/auth/change-password
 * Body: { userId, currentPassword, newPassword }
 */
export const changePassword = async (req, res) => {
  try {
    const { userId, currentPassword, newPassword } = req.body

    if (!userId || !currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'User ID, current password, and new password are required'
      })
    }

    console.log(`🔑 Password change requested for user: ${userId}`)

    // ✅ Find user
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

    // ✅ Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, user.passwordHash)
    
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      })
    }

    // ✅ Validate new password
    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 8 characters'
      })
    }

    // ✅ Hash new password
    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(newPassword, salt)

    // ✅ Update password in DynamoDB
    await docClient.send(new UpdateCommand({
      TableName: WORKERS_TABLE,
      Key: {
        PK: `WORKER#${userId}`,
        SK: 'PROFILE'
      },
      UpdateExpression: 'SET passwordHash = :passwordHash, updatedAt = :timestamp',
      ExpressionAttributeValues: {
        ':passwordHash': passwordHash,
        ':timestamp': new Date().toISOString()
      }
    }))

    console.log(`✅ Password changed successfully for user: ${userId}`)

    res.json({
      success: true,
      message: 'Password updated successfully',
      data: {
        userId,
        updatedAt: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Change password error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to change password'
    })
  }
}

// ============================================================
// 📝 REPORT ISSUE
// ============================================================

/**
 * ✅ Submit an issue report
 * POST /api/auth/report-issue
 * Body: { userId, issue, email, timestamp }
 */
export const reportIssue = async (req, res) => {
  try {
    const { userId, issue, email } = req.body

    if (!issue || !issue.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Issue description is required'
      })
    }

    console.log(`📝 New issue report from user: ${userId || 'anonymous'}`)

    const timestamp = new Date().toISOString()
    const gmtDate = new Date().toUTCString()
    const gmtTime = new Date().toTimeString()
    const issueId = `ISSUE_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`

    // ✅ Save issue to DynamoDB
    await docClient.send(new PutCommand({
      TableName: 'IssueReports',
      Item: {
        PK: `ISSUE#${issueId}`,
        SK: `${timestamp}`,
        issueId: issueId,
        userId: userId || 'anonymous',
        email: email || '',
        issue: issue.trim(),
        status: 'pending',
        submittedAt: timestamp,
        gmtDate: gmtDate,
        gmtTime: gmtTime,
        ipAddress: req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown',
        ttl: Math.floor(Date.now() / 1000) + (90 * 24 * 60 * 60) // 90 days
      }
    }))

    console.log(`✅ Issue reported successfully: ${issueId}`)

    res.json({
      success: true,
      message: 'Issue reported successfully',
      data: {
        issueId: issueId,
        submittedAt: timestamp
      }
    })

  } catch (error) {
    console.error('❌ Report issue error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to submit issue'
    })
  }
}

/**
 * ✅ Get all issue reports (Admin only)
 * GET /api/auth/issues
 */
export const getIssues = async (req, res) => {
  try {
    console.log('📊 Fetching all issue reports')

    const result = await docClient.send(new ScanCommand({
      TableName: 'IssueReports',
      Limit: 100
    }))

    const issues = result.Items || []
    
    // Sort by submittedAt (newest first)
    issues.sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))

    res.json({
      success: true,
      data: issues,
      count: issues.length
    })

  } catch (error) {
    console.error('❌ Get issues error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to fetch issues'
    })
  }
}

/**
 * ✅ Update issue status (Admin only)
 * PATCH /api/auth/issue/:issueId
 * Body: { status }
 */
export const updateIssueStatus = async (req, res) => {
  try {
    const { issueId } = req.params
    const { status } = req.body

    if (!issueId) {
      return res.status(400).json({
        success: false,
        message: 'Issue ID is required'
      })
    }

    if (!status || !['pending', 'in-progress', 'resolved', 'closed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (pending, in-progress, resolved, closed)'
      })
    }

    console.log(`📝 Updating issue ${issueId} to status: ${status}`)

    // Find the issue first
    const result = await docClient.send(new ScanCommand({
      TableName: 'IssueReports',
      FilterExpression: 'issueId = :issueId',
      ExpressionAttributeValues: {
        ':issueId': issueId
      }
    }))

    if (!result.Items || result.Items.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      })
    }

    const issue = result.Items[0]

    // Update status
    await docClient.send(new UpdateCommand({
      TableName: 'IssueReports',
      Key: {
        PK: issue.PK,
        SK: issue.SK
      },
      UpdateExpression: 'SET #status = :status, updatedAt = :updatedAt',
      ExpressionAttributeNames: {
        '#status': 'status'
      },
      ExpressionAttributeValues: {
        ':status': status,
        ':updatedAt': new Date().toISOString()
      }
    }))

    console.log(`✅ Issue ${issueId} status updated to: ${status}`)

    res.json({
      success: true,
      message: 'Issue status updated successfully',
      data: {
        issueId,
        status
      }
    })

  } catch (error) {
    console.error('❌ Update issue error:', error)
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update issue'
    })
  }
}

// ============================================================
// 📝 LOGGING FUNCTIONS
// ============================================================

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

/**
 * ✅ Log phone change to PhoneChangeLogs table
 */
const logPhoneChange = async (data) => {
  try {
    const timestamp = new Date().toISOString()
    
    console.log('📝 Logging phone change:', {
      workerId: data.workerId,
      oldPhone: data.oldPhone,
      newPhone: data.newPhone,
      gmtDate: data.gmtDate,
      gmtTime: data.gmtTime
    })

    await docClient.send(new PutCommand({
      TableName: 'PhoneChangeLogs',
      Item: {
        PK: `PHONE_LOG#${data.workerId}`,
        SK: `${timestamp}`,
        workerId: data.workerId,
        oldPhone: data.oldPhone,
        newPhone: data.newPhone,
        changedAt: timestamp,
        gmtDate: data.gmtDate || new Date().toUTCString(),
        gmtTime: data.gmtTime || new Date().toTimeString(),
        ipAddress: data.ipAddress || 'unknown',
        ttl: Math.floor(Date.now() / 1000) + (365 * 24 * 60 * 60)
      }
    }))
    console.log('✅ Phone change logged successfully')
  } catch (error) {
    console.error('❌ Failed to log phone change:', error)
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
  checkEmailAvailability,
  requestPhoneUpdate,
  verifyPhoneUpdate,
  checkPhoneAvailability,
  changePassword,
  reportIssue,
  getIssues,
  updateIssueStatus
}