
// // src/worker/pages/AccountSettingsPage.jsx
// import { useState, useEffect, useRef, useCallback } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { TopNav } from '../../common/components/TopNav'
// import { TextField } from '../../common/components/TextField'
// import { IconUser, IconMail, IconPhone, IconGlobe, IconLock, IconArrowLeft, IconEye, IconEyeOff } from '../../common/components/Icons'
// import api from '../../services/api'
// import workerService from '../services/workerService'
// import { 
//   requestEmailUpdate, 
//   verifyEmailUpdate, 
//   checkEmailAvailability,
//   setupRecaptcha,
//   sendPhoneOTP,
//   verifyPhoneOTP
// } from '../../services/verificationService'
// import { ReportIssueModal } from '../components/ReportIssueModal' // ✅ Added import

// // Password Input Component with eye toggle
// function PasswordInput({ placeholder, value, onChange, showPassword, onToggle, label }) {
//   return (
//     <div style={{ width: '100%' }}>
//       {label && (
//         <label style={{
//           fontSize: '14px',
//           fontWeight: 600,
//           color: '#17263a',
//           display: 'block',
//           marginBottom: '6px'
//         }}>
//           {label}
//         </label>
//       )}
//       <div style={{
//         display: 'flex',
//         alignItems: 'center',
//         width: '100%',
//         height: '44px',
//         border: '1px solid rgba(18, 38, 63, 0.12)',
//         borderRadius: '10px',
//         background: 'white',
//         transition: 'all 0.2s ease',
//         overflow: 'hidden'
//       }}>
//         <span style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           padding: '0 10px',
//           color: 'rgba(23, 38, 58, 0.4)',
//           flexShrink: 0,
//           minWidth: '38px'
//         }}>
//           <IconLock />
//         </span>
//         <input
//           type={showPassword ? 'text' : 'password'}
//           style={{
//             flex: 1,
//             height: '100%',
//             border: 'none',
//             outline: 'none',
//             padding: '0 4px',
//             fontSize: '14px',
//             color: '#17263a',
//             background: 'transparent',
//             fontFamily: 'inherit',
//             minWidth: 0,
//             width: '100%'
//           }}
//           placeholder={placeholder}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />
//         <button
//           type="button"
//           onClick={onToggle}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             padding: '0 10px',
//             background: 'none',
//             border: 'none',
//             cursor: 'pointer',
//             color: 'rgba(23, 38, 58, 0.4)',
//             transition: 'color 0.2s ease',
//             flexShrink: 0,
//             height: '100%',
//             minWidth: '38px'
//           }}
//         >
//           {showPassword ? <IconEyeOff /> : <IconEye />}
//         </button>
//       </div>
//     </div>
//   )
// }

// // Password Modal Component
// function PasswordModal({ isOpen, onClose, onUpdate, onForgotPassword, loading }) {
//   const [oldPassword, setOldPassword] = useState('')
//   const [newPassword, setNewPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [showOldPassword, setShowOldPassword] = useState(false)
//   const [showNewPassword, setShowNewPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [error, setError] = useState('')

//   if (!isOpen) return null

//   const handleUpdate = () => {
//     if (!oldPassword || !newPassword || !confirmPassword) {
//       setError('All fields are required')
//       return
//     }
//     if (newPassword.length < 8) {
//       setError('Password must be at least 8 characters')
//       return
//     }
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match')
//       return
//     }
//     setError('')
//     onUpdate(oldPassword, newPassword)
//   }

//   const handleForgotPassword = () => {
//     onForgotPassword()
//     onClose()
//   }

//   return (
//     <>
//       {/* Backdrop */}
//       <div 
//         style={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           right: 0,
//           bottom: 0,
//           background: 'rgba(0, 0, 0, 0.5)',
//           backdropFilter: 'blur(4px)',
//           zIndex: 9999,
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           animation: 'fadeIn 0.2s ease'
//         }}
//         onClick={onClose}
//       >
//         {/* Modal */}
//         <div 
//           style={{
//             background: 'white',
//             borderRadius: '16px',
//             maxWidth: '440px',
//             width: '90%',
//             padding: '32px 28px',
//             boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
//             animation: 'slideUp 0.3s ease',
//             maxHeight: '90vh',
//             overflowY: 'auto'
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div style={{
//             textAlign: 'center',
//             marginBottom: '24px'
//           }}>
//             <div style={{
//               width: '56px',
//               height: '56px',
//               borderRadius: '50%',
//               background: 'rgba(15, 78, 169, 0.1)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               margin: '0 auto 12px'
//             }}>
//               <IconLock style={{ width: '28px', height: '28px', color: '#0f4ea9' }} />
//             </div>
//             <h2 style={{
//               fontSize: '20px',
//               fontWeight: 700,
//               color: '#17263a',
//               margin: 0
//             }}>
//               Change Password
//             </h2>
//             <p style={{
//               fontSize: '14px',
//               color: 'rgba(23, 38, 58, 0.5)',
//               marginTop: '4px'
//             }}>
//               Enter your old password and choose a new one
//             </p>
//           </div>

//           {error && (
//             <div style={{
//               padding: '10px 14px',
//               background: '#fee2e2',
//               color: '#dc2626',
//               borderRadius: '8px',
//               fontSize: '13px',
//               marginBottom: '16px'
//             }}>
//               ❌ {error}
//             </div>
//           )}

//           {/* Old Password */}
//           <div style={{ marginBottom: '16px' }}>
//             <label style={{
//               fontSize: '14px',
//               fontWeight: 500,
//               color: '#17263a',
//               display: 'block',
//               marginBottom: '4px'
//             }}>
//               Enter old password
//             </label>
//             <PasswordInput
//               placeholder="Enter your current password"
//               value={oldPassword}
//               onChange={setOldPassword}
//               showPassword={showOldPassword}
//               onToggle={() => setShowOldPassword(!showOldPassword)}
//             />
//           </div>

//           {/* Forgot Password Link */}
//           <div style={{
//             textAlign: 'right',
//             marginBottom: '16px'
//           }}>
//             <button
//               onClick={handleForgotPassword}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 color: '#0f4ea9',
//                 fontSize: '13px',
//                 fontWeight: 500,
//                 cursor: 'pointer',
//                 textDecoration: 'underline'
//               }}
//             >
//               Forgot password?
//             </button>
//           </div>

//           {/* New Password */}
//           <div style={{ marginBottom: '16px' }}>
//             <label style={{
//               fontSize: '14px',
//               fontWeight: 500,
//               color: '#17263a',
//               display: 'block',
//               marginBottom: '4px'
//             }}>
//               Enter New password
//             </label>
//             <PasswordInput
//               placeholder="Enter new password"
//               value={newPassword}
//               onChange={setNewPassword}
//               showPassword={showNewPassword}
//               onToggle={() => setShowNewPassword(!showNewPassword)}
//             />
//           </div>

//           {/* Confirm Password */}
//           <div style={{ marginBottom: '24px' }}>
//             <label style={{
//               fontSize: '14px',
//               fontWeight: 500,
//               color: '#17263a',
//               display: 'block',
//               marginBottom: '4px'
//             }}>
//               Confirm password
//             </label>
//             <PasswordInput
//               placeholder="Confirm new password"
//               value={confirmPassword}
//               onChange={setConfirmPassword}
//               showPassword={showConfirmPassword}
//               onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//             />
//           </div>

//           {/* Update Button */}
//           <button
//             onClick={handleUpdate}
//             disabled={loading}
//             style={{
//               width: '100%',
//               padding: '12px',
//               background: loading ? '#94a3b8' : '#2fb463',
//               color: 'white',
//               border: 'none',
//               borderRadius: '10px',
//               fontSize: '16px',
//               fontWeight: 600,
//               cursor: loading ? 'not-allowed' : 'pointer',
//               transition: 'all 0.2s ease'
//             }}
//           >
//             {loading ? 'Updating...' : 'Update'}
//           </button>

//           {/* After Update Message */}
//           <div style={{
//             marginTop: '16px',
//             padding: '12px',
//             background: '#f0f7ff',
//             borderRadius: '8px',
//             textAlign: 'center',
//             fontSize: '13px',
//             color: 'rgba(23, 38, 58, 0.6)'
//           }}>
//             After Update, you will be logged out and taken to the login page.
//             <br />
//             <span style={{ fontSize: '11px', color: 'rgba(23, 38, 58, 0.4)' }}>
//               Please log in with your new password.
//             </span>
//           </div>
//         </div>
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(20px) scale(0.98);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0) scale(1);
//           }
//         }
//       `}</style>
//     </>
//   )
// }

// // Update Button Component
// function UpdateButton({ onClick, loading, label = 'Update', disabled = false }) {
//   return (
//     <button
//       onClick={onClick}
//       disabled={loading || disabled}
//       style={{
//         padding: '6px 16px',
//         background: (loading || disabled) ? '#94a3b8' : '#0f4ea9',
//         color: 'white',
//         border: 'none',
//         borderRadius: '6px',
//         fontSize: '12px',
//         fontWeight: 600,
//         cursor: (loading || disabled) ? 'not-allowed' : 'pointer',
//         transition: 'all 0.2s ease',
//         whiteSpace: 'nowrap',
//         minWidth: '70px',
//         height: '36px',
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//         flexShrink: 0
//       }}
//       onMouseEnter={(e) => {
//         if (!loading && !disabled) e.currentTarget.style.background = '#0b3f90'
//       }}
//       onMouseLeave={(e) => {
//         if (!loading && !disabled) e.currentTarget.style.background = '#0f4ea9'
//       }}
//     >
//       {loading ? '...' : label}
//     </button>
//   )
// }

// export function AccountSettingsPage() {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
  
//   const [loading, setLoading] = useState(true)
//   const [saving, setSaving] = useState({})
//   const [error, setError] = useState('')
//   const [success, setSuccess] = useState('')
  
//   // User data
//   const [email, setEmail] = useState('')
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [language, setLanguage] = useState('')
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
  
//   // Password modal state
//   const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
//   const [passwordLoading, setPasswordLoading] = useState(false)
  
//   // Email update fields
//   const [newEmail, setNewEmail] = useState('')
//   const [isEmailAvailable, setIsEmailAvailable] = useState(false)
//   const [isCheckingEmail, setIsCheckingEmail] = useState(false)
//   const [emailAvailabilityMessage, setEmailAvailabilityMessage] = useState('')
//   const [showEmailVerification, setShowEmailVerification] = useState(false)
//   const [emailVerificationCode, setEmailVerificationCode] = useState('')
//   const [isEmailCodeSending, setIsEmailCodeSending] = useState(false)
//   const [isEmailCodeVerifying, setIsEmailCodeVerifying] = useState(false)
//   const [emailCodeSent, setEmailCodeSent] = useState(false)
//   const [resendCooldown, setResendCooldown] = useState(0)
//   const emailCodeInputRef = useRef(null)
//   const cooldownIntervalRef = useRef(null)

//   // Phone update fields
//   const [newPhoneNumber, setNewPhoneNumber] = useState('')
//   const [isPhoneAvailable, setIsPhoneAvailable] = useState(false)
//   const [isCheckingPhone, setIsCheckingPhone] = useState(false)
//   const [phoneAvailabilityMessage, setPhoneAvailabilityMessage] = useState('')
//   const [showPhoneVerification, setShowPhoneVerification] = useState(false)
//   const [phoneVerificationCode, setPhoneVerificationCode] = useState('')
//   const [isPhoneCodeSending, setIsPhoneCodeSending] = useState(false)
//   const [isPhoneCodeVerifying, setIsPhoneCodeVerifying] = useState(false)
//   const [phoneCodeSent, setPhoneCodeSent] = useState(false)
//   const [phoneResendCooldown, setPhoneResendCooldown] = useState(0)
//   const phoneCodeInputRef = useRef(null)
//   const phoneCooldownIntervalRef = useRef(null)
  
//   // Delete account
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
//   const [deleteConfirmText, setDeleteConfirmText] = useState('')
  
//   // Report Issue Modal
//   const [isReportIssueOpen, setIsReportIssueOpen] = useState(false) // ✅ Added state
  
//   const userId = localStorage.getItem('userId')

//   // ✅ Create reCAPTCHA container
//   useEffect(() => {
//     let container = document.getElementById('recaptcha-container-phone')
//     if (!container) {
//       container = document.createElement('div')
//       container.id = 'recaptcha-container-phone'
//       container.style.position = 'fixed'
//       container.style.bottom = '-9999px'
//       container.style.left = '0'
//       container.style.width = '1px'
//       container.style.height = '1px'
//       container.style.opacity = '0'
//       container.style.pointerEvents = 'none'
//       document.body.appendChild(container)
//     }
    
//     return () => {
//       const el = document.getElementById('recaptcha-container-phone')
//       if (el) el.remove()
//     }
//   }, [])

//   // Load user data
//   useEffect(() => {
//     if (userId) {
//       loadUserData()
//     } else {
//       navigate('/login')
//     }
//   }, [userId])

//   useEffect(() => {
//     return () => {
//       if (cooldownIntervalRef.current) {
//         clearInterval(cooldownIntervalRef.current)
//       }
//       if (phoneCooldownIntervalRef.current) {
//         clearInterval(phoneCooldownIntervalRef.current)
//       }
//     }
//   }, [])

//   const loadUserData = async () => {
//     try {
//       setLoading(true)
//       setError('')
      
//       const result = await workerService.getWorkerProfile(userId)
      
//       if (result.success && result.data) {
//         const basics = result.data.basics || {}
//         setEmail(basics.emailAddress || '')
//         setNewEmail(basics.emailAddress || '')
//         setPhoneNumber(basics.mobilePhone || '')
//         setNewPhoneNumber(basics.mobilePhone || '')
//         setFirstName(basics.legalFirstName || '')
//         setLastName(basics.legalLastName || '')
        
//         if (basics.english && basics.spanish) {
//           setLanguage('en-es')
//         } else if (basics.spanish) {
//           setLanguage('es')
//         } else {
//           setLanguage('en')
//         }
//       }
//     } catch (err) {
//       console.error('Error loading user data:', err)
//       setError('Failed to load user data')
//     } finally {
//       setLoading(false)
//     }
//   }

//   // ============================================================
//   // PASSWORD UPDATE FUNCTIONS
//   // ============================================================

//   const handlePasswordUpdate = async (oldPassword, newPassword) => {
//     try {
//       setPasswordLoading(true)
//       setError('')
//       setSuccess('')

//       // Call the change password API
//       const response = await api.post('/auth/change-password', {
//         userId,
//         currentPassword: oldPassword,
//         newPassword
//       })

//       if (response.data.success) {
//         setSuccess('✅ Password updated successfully!')
//         setIsPasswordModalOpen(false)
        
//         // Show success message
//         setTimeout(() => {
//           // Logout and redirect to login
//           localStorage.clear()
//           sessionStorage.clear()
//           navigate('/login')
//         }, 2000)
//       } else {
//         setError(response.data.message || 'Failed to update password')
//       }
//     } catch (err) {
//       console.error('Error updating password:', err)
//       setError(err.response?.data?.message || err.message || 'Failed to update password')
//     } finally {
//       setPasswordLoading(false)
//     }
//   }

//   const handleForgotPassword = () => {
//     // Clear all session data and redirect to forgot password
//     localStorage.clear()
//     sessionStorage.clear()
//     navigate('/reset-password')
//   }

//   // ============================================================
//   // EMAIL UPDATE FUNCTIONS
//   // ============================================================

//   const checkEmailAvailabilityRealTime = async (emailToCheck) => {
//     if (!emailToCheck || emailToCheck === email) {
//       setIsEmailAvailable(false)
//       setEmailAvailabilityMessage('')
//       return
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(emailToCheck)) {
//       setIsEmailAvailable(false)
//       setEmailAvailabilityMessage('Please enter a valid email address')
//       return
//     }

//     setIsCheckingEmail(true)
//     setEmailAvailabilityMessage('Checking...')

//     try {
//       const result = await checkEmailAvailability(emailToCheck)
      
//       if (result.success) {
//         if (result.data.available) {
//           setIsEmailAvailable(true)
//           setEmailAvailabilityMessage('✓ Email is available')
//         } else {
//           setIsEmailAvailable(false)
//           setEmailAvailabilityMessage('✗ Email is already registered')
//         }
//       } else {
//         setIsEmailAvailable(false)
//         setEmailAvailabilityMessage('Error checking email')
//       }
//     } catch (err) {
//       console.error('Error checking email:', err)
//       setIsEmailAvailable(false)
//       setEmailAvailabilityMessage('Error checking email')
//     } finally {
//       setIsCheckingEmail(false)
//     }
//   }

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (newEmail && newEmail !== email) {
//         checkEmailAvailabilityRealTime(newEmail)
//       } else {
//         setIsEmailAvailable(false)
//         setEmailAvailabilityMessage('')
//       }
//     }, 500)

//     return () => clearTimeout(timer)
//   }, [newEmail])

//   const handleSendEmailVerification = async () => {
//     if (!newEmail || !isEmailAvailable) {
//       setError('Please enter a valid and available email address')
//       return
//     }

//     setIsEmailCodeSending(true)
//     setError('')
//     setSuccess('')

//     try {
//       const result = await requestEmailUpdate(userId, newEmail, '')
      
//       if (result.success) {
//         setEmailCodeSent(true)
//         setShowEmailVerification(true)
//         setResendCooldown(60)
//         setSuccess('Verification code sent to your new email!')
//         setTimeout(() => setSuccess(''), 5000)
        
//         if (cooldownIntervalRef.current) {
//           clearInterval(cooldownIntervalRef.current)
//         }
//         cooldownIntervalRef.current = setInterval(() => {
//           setResendCooldown((prev) => {
//             if (prev <= 1) {
//               clearInterval(cooldownIntervalRef.current)
//               return 0
//             }
//             return prev - 1
//           })
//         }, 1000)
        
//         setTimeout(() => {
//           if (emailCodeInputRef.current) {
//             emailCodeInputRef.current.focus()
//           }
//         }, 300)
//       } else {
//         setError(result.message || 'Failed to send verification code')
//       }
//     } catch (err) {
//       setError(err.message || 'An error occurred')
//     } finally {
//       setIsEmailCodeSending(false)
//     }
//   }

//   const handleVerifyEmailCode = async () => {
//     if (!emailVerificationCode || emailVerificationCode.length !== 6) {
//       setError('Please enter 6-digit verification code')
//       return
//     }

//     setIsEmailCodeVerifying(true)
//     setError('')
//     setSuccess('')

//     try {
//       const result = await verifyEmailUpdate(newEmail, emailVerificationCode)
      
//       if (result.success) {
//         setSuccess('✅ Email updated successfully!')
//         setEmail(newEmail)
//         setShowEmailVerification(false)
//         setEmailCodeSent(false)
//         setEmailVerificationCode('')
//         setIsEmailAvailable(false)
//         setEmailAvailabilityMessage('')
        
//         localStorage.setItem('pendingEmail', newEmail)
//         await loadUserData()
//         setTimeout(() => setSuccess(''), 5000)
//       } else {
//         setError(result.message || 'Invalid code. Please try again.')
//       }
//     } catch (err) {
//       setError(err.message || 'An error occurred')
//     } finally {
//       setIsEmailCodeVerifying(false)
//     }
//   }

//   const handleResendEmailCode = async () => {
//     if (resendCooldown > 0) return
//     await handleSendEmailVerification()
//   }

//   // ============================================================
//   // PHONE UPDATE FUNCTIONS
//   // ============================================================

//   const checkPhoneAvailabilityRealTime = async (phoneToCheck) => {
//     if (!phoneToCheck || phoneToCheck === phoneNumber) {
//       setIsPhoneAvailable(false)
//       setPhoneAvailabilityMessage('')
//       return
//     }

//     const digitsOnly = phoneToCheck.replace(/\D/g, '')
//     if (digitsOnly.length !== 10) {
//       setIsPhoneAvailable(false)
//       setPhoneAvailabilityMessage('Please enter a valid 10-digit phone number')
//       return
//     }

//     setIsCheckingPhone(true)
//     setPhoneAvailabilityMessage('Checking...')

//     try {
//       const response = await api.get(`/worker/phone/${digitsOnly}`)
      
//       if (response.data && response.data.success) {
//         const phoneData = response.data.data || {}
//         if (phoneData.available === true) {
//           setIsPhoneAvailable(true)
//           setPhoneAvailabilityMessage('✓ Phone number is available')
//         } else {
//           setIsPhoneAvailable(false)
//           setPhoneAvailabilityMessage('✗ Phone number is already registered')
//         }
//       } else {
//         setIsPhoneAvailable(false)
//         setPhoneAvailabilityMessage('Error checking phone number')
//       }
//     } catch (err) {
//       console.error('Error checking phone:', err)
//       setIsPhoneAvailable(false)
//       setPhoneAvailabilityMessage('Error checking phone number')
//     } finally {
//       setIsCheckingPhone(false)
//     }
//   }

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       if (newPhoneNumber && newPhoneNumber !== phoneNumber) {
//         checkPhoneAvailabilityRealTime(newPhoneNumber)
//       } else {
//         setIsPhoneAvailable(false)
//         setPhoneAvailabilityMessage('')
//       }
//     }, 500)

//     return () => clearTimeout(timer)
//   }, [newPhoneNumber])

//   const handleSendPhoneOTP = async () => {
//     if (!newPhoneNumber || !isPhoneAvailable) {
//       setError('Please enter a valid and available phone number')
//       return
//     }

//     setIsPhoneCodeSending(true)
//     setError('')
//     setSuccess('')

//     try {
//       const recaptchaVerifier = setupRecaptcha('recaptcha-container-phone')
      
//       if (!recaptchaVerifier) {
//         setError('Failed to initialize security verification. Please refresh and try again.')
//         setIsPhoneCodeSending(false)
//         return
//       }

//       const result = await sendPhoneOTP(newPhoneNumber, recaptchaVerifier)
      
//       if (result.success) {
//         setPhoneCodeSent(true)
//         setShowPhoneVerification(true)
//         setPhoneResendCooldown(60)
//         setSuccess('OTP sent to your new phone number!')
//         setTimeout(() => setSuccess(''), 5000)
        
//         if (phoneCooldownIntervalRef.current) {
//           clearInterval(phoneCooldownIntervalRef.current)
//         }
//         phoneCooldownIntervalRef.current = setInterval(() => {
//           setPhoneResendCooldown((prev) => {
//             if (prev <= 1) {
//               clearInterval(phoneCooldownIntervalRef.current)
//               return 0
//             }
//             return prev - 1
//           })
//         }, 1000)
        
//         setTimeout(() => {
//           if (phoneCodeInputRef.current) {
//             phoneCodeInputRef.current.focus()
//           }
//         }, 300)
//       } else {
//         setError(result.message || 'Failed to send OTP')
//       }
//     } catch (err) {
//       console.error('❌ Send OTP error:', err)
//       setError(err.message || 'An error occurred')
//     } finally {
//       setIsPhoneCodeSending(false)
//     }
//   }

//   const handleVerifyPhoneCode = async () => {
//     if (!phoneVerificationCode || phoneVerificationCode.length !== 6) {
//       setError('Please enter 6-digit OTP')
//       return
//     }

//     setIsPhoneCodeVerifying(true)
//     setError('')
//     setSuccess('')

//     try {
//       const result = await verifyPhoneOTP(phoneVerificationCode)
      
//       if (result.success) {
//         await workerService.updateBasics(userId, { mobilePhone: newPhoneNumber })
        
//         setSuccess('✅ Phone number updated successfully!')
//         setPhoneNumber(newPhoneNumber)
//         setShowPhoneVerification(false)
//         setPhoneCodeSent(false)
//         setPhoneVerificationCode('')
//         setIsPhoneAvailable(false)
//         setPhoneAvailabilityMessage('')
        
//         localStorage.setItem('pendingPhoneNumber', newPhoneNumber)
//         await loadUserData()
//         setTimeout(() => setSuccess(''), 5000)
//       } else {
//         setError(result.message || 'Invalid OTP. Please try again.')
//       }
//     } catch (err) {
//       console.error('❌ Verify OTP error:', err)
//       setError(err.message || 'An error occurred')
//     } finally {
//       setIsPhoneCodeVerifying(false)
//     }
//   }

//   const handleResendPhoneOTP = async () => {
//     if (phoneResendCooldown > 0) return
//     await handleSendPhoneOTP()
//   }

//   // ============================================================
//   // OTHER UPDATE FUNCTIONS
//   // ============================================================

//   const updateField = async (field, value) => {
//     try {
//       setSaving(prev => ({ ...prev, [field]: true }))
//       setError('')
//       setSuccess('')
      
//       const updateData = {}
//       updateData[field] = value
      
//       if (field === 'language') {
//         if (value === 'en') {
//           updateData.english = true
//           updateData.spanish = false
//           updateData.englishSpanish = false
//         } else if (value === 'es') {
//           updateData.english = false
//           updateData.spanish = true
//           updateData.englishSpanish = false
//         } else if (value === 'en-es') {
//           updateData.english = false
//           updateData.spanish = false
//           updateData.englishSpanish = true
//         }
//         delete updateData.language
//       }
      
//       if (field === 'firstName') {
//         await workerService.updateBasics(userId, { legalFirstName: value })
//         localStorage.setItem('pendingFirstName', value)
//       } else if (field === 'lastName') {
//         await workerService.updateBasics(userId, { legalLastName: value })
//         localStorage.setItem('pendingLastName', value)
//       } else if (field === 'language') {
//         await workerService.updateBasics(userId, updateData)
//       }
      
//       setSuccess(`${field} updated successfully!`)
//       setTimeout(() => setSuccess(''), 3000)
//       await loadUserData()
      
//     } catch (err) {
//       console.error(`Error updating ${field}:`, err)
//       setError(err.response?.data?.message || err.message || `Failed to update ${field}`)
//     } finally {
//       setSaving(prev => ({ ...prev, [field]: false }))
//     }
//   }

//   const handleDeleteAccount = async () => {
//     if (deleteConfirmText !== 'DELETE') {
//       setError('Please type "DELETE" to confirm')
//       return
//     }
    
//     try {
//       setSaving(prev => ({ ...prev, delete: true }))
//       setError('')
      
//       await api.delete(`/worker/profile/${userId}`)
      
//       localStorage.clear()
//       sessionStorage.clear()
      
//       navigate('/login')
      
//     } catch (err) {
//       console.error('Error deleting account:', err)
//       setError(err.response?.data?.message || err.message || 'Failed to delete account')
//       setSaving(prev => ({ ...prev, delete: false }))
//     }
//   }

//   const FieldRow = ({ label, children, icon }) => (
//     <div style={{
//       display: 'flex',
//       alignItems: 'center',
//       padding: '12px 16px',
//       borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
//       gap: '16px',
//       minHeight: '60px'
//     }}>
//       <div style={{
//         minWidth: '140px',
//         fontSize: '14px',
//         fontWeight: 500,
//         color: '#17263a',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px'
//       }}>
//         {icon && <span style={{ color: 'rgba(23,38,58,0.4)' }}>{icon}</span>}
//         {label}
//       </div>
//       <div style={{ flex: 1 }}>
//         {children}
//       </div>
//     </div>
//   )

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge" aria-label="12 projects">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon" aria-hidden="true">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon" aria-hidden="true">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div className="accountSettingsPage">
//             <div className="authCard" style={{
//               maxWidth: '900px',
//               width: '100%',
//               margin: '0 auto',
//               padding: '0',
//               overflow: 'hidden',
//               borderRadius: '16px'
//             }}>
//               <div style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 padding: '20px 24px',
//                 borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
//                 background: '#f8fafc'
//               }}>
//                 <button
//                   onClick={() => navigate('/wizard/summary')}
//                   style={{
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     color: '#17263a',
//                     padding: '6px 10px',
//                     borderRadius: '8px',
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '6px',
//                     fontSize: '14px',
//                     fontWeight: 500,
//                     transition: 'all 0.2s ease'
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
//                   onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                 >
//                   <IconArrowLeft />
//                   Back
//                 </button>
//                 <h2 style={{
//                   fontSize: '18px',
//                   fontWeight: 700,
//                   color: '#17263a',
//                   margin: 0,
//                   flex: 1
//                 }}>
//                   Account Settings
//                 </h2>
//               </div>

//               {loading ? (
//                 <div style={{ textAlign: 'center', padding: '60px 0' }}>
//                   <div style={{
//                     width: '40px',
//                     height: '40px',
//                     border: '4px solid rgba(15, 78, 169, 0.1)',
//                     borderTop: '4px solid #0f4ea9',
//                     borderRadius: '50%',
//                     animation: 'spin 1s linear infinite',
//                     margin: '0 auto'
//                   }} />
//                   <p style={{ marginTop: '16px', color: '#64748b' }}>Loading...</p>
//                 </div>
//               ) : (
//                 <div style={{ padding: '0' }}>
//                   {error && (
//                     <div style={{
//                       padding: '12px 20px',
//                       margin: '16px 24px',
//                       background: '#fee2e2',
//                       color: '#dc2626',
//                       borderRadius: '8px',
//                       fontSize: '14px'
//                     }}>
//                       ❌ {error}
//                     </div>
//                   )}
                  
//                   {success && (
//                     <div style={{
//                       padding: '12px 20px',
//                       margin: '16px 24px',
//                       background: '#dcfce7',
//                       color: '#16a34a',
//                       borderRadius: '8px',
//                       fontSize: '14px'
//                     }}>
//                       ✅ {success}
//                     </div>
//                   )}

//                   {/* Email Address */}
//                   <FieldRow label="Email Address" icon={<IconMail />}>
//                     <div>
//                       <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//                         <div style={{ flex: 1 }}>
//                           <input
//                             type="email"
//                             value={newEmail}
//                             onChange={(e) => setNewEmail(e.target.value)}
//                             placeholder="Email Address"
//                             style={{
//                               width: '100%',
//                               padding: '8px 12px',
//                               border: '1px solid rgba(18, 38, 63, 0.12)',
//                               borderRadius: '8px',
//                               fontSize: '14px',
//                               outline: 'none',
//                               background: 'white',
//                               transition: 'all 0.2s ease',
//                               height: '36px'
//                             }}
//                             onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
//                             onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
//                           />
//                         </div>
//                         <UpdateButton 
//                           onClick={handleSendEmailVerification}
//                           loading={isEmailCodeSending}
//                           disabled={!isEmailAvailable || newEmail === email}
//                           label="Send Code"
//                         />
//                       </div>
                      
//                       {newEmail !== email && (
//                         <div style={{ marginTop: '4px', fontSize: '12px' }}>
//                           {isCheckingEmail ? (
//                             <span style={{ color: '#0f4ea9' }}>⏳ Checking availability...</span>
//                           ) : emailAvailabilityMessage ? (
//                             <span style={{ 
//                               color: emailAvailabilityMessage.includes('available') ? '#2fb463' : '#dc2626' 
//                             }}>
//                               {emailAvailabilityMessage}
//                             </span>
//                           ) : null}
//                         </div>
//                       )}

//                       {showEmailVerification && (
//                         <div style={{ marginTop: '8px', padding: '12px', background: '#f0f7ff', borderRadius: '8px', border: '1px solid rgba(15,78,169,0.2)' }}>
//                           <div style={{ fontSize: '13px', fontWeight: 500, color: '#17263a', marginBottom: '8px' }}>
//                             Enter verification code sent to {newEmail}
//                           </div>
//                           <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//                             <input
//                               ref={emailCodeInputRef}
//                               type="text"
//                               value={emailVerificationCode}
//                               onChange={(e) => {
//                                 const value = e.target.value.replace(/\D/g, '')
//                                 if (value.length <= 6) {
//                                   setEmailVerificationCode(value)
//                                 }
//                               }}
//                               maxLength={6}
//                               placeholder="6-digit code"
//                               style={{
//                                 width: '150px',
//                                 padding: '8px 12px',
//                                 border: '1px solid rgba(18, 38, 63, 0.12)',
//                                 borderRadius: '8px',
//                                 fontSize: '14px',
//                                 outline: 'none',
//                                 background: 'white',
//                                 transition: 'all 0.2s ease',
//                                 height: '36px',
//                                 textAlign: 'center',
//                                 letterSpacing: '4px',
//                                 fontWeight: 600
//                               }}
//                               onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
//                               onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
//                             />
//                             <button
//                               onClick={handleVerifyEmailCode}
//                               disabled={isEmailCodeVerifying || emailVerificationCode.length !== 6}
//                               style={{
//                                 padding: '6px 20px',
//                                 background: (isEmailCodeVerifying || emailVerificationCode.length !== 6) ? '#94a3b8' : '#2fb463',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '6px',
//                                 fontSize: '13px',
//                                 fontWeight: 600,
//                                 cursor: (isEmailCodeVerifying || emailVerificationCode.length !== 6) ? 'not-allowed' : 'pointer',
//                                 transition: 'all 0.2s ease',
//                                 height: '36px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center'
//                               }}
//                             >
//                               {isEmailCodeVerifying ? 'Verifying...' : 'Verify'}
//                             </button>
//                             <button
//                               onClick={handleResendEmailCode}
//                               disabled={resendCooldown > 0 || isEmailCodeSending}
//                               style={{
//                                 padding: '6px 16px',
//                                 background: (resendCooldown > 0 || isEmailCodeSending) ? '#94a3b8' : 'transparent',
//                                 color: (resendCooldown > 0 || isEmailCodeSending) ? '#94a3b8' : '#0f4ea9',
//                                 border: 'none',
//                                 borderRadius: '6px',
//                                 fontSize: '12px',
//                                 fontWeight: 500,
//                                 cursor: (resendCooldown > 0 || isEmailCodeSending) ? 'not-allowed' : 'pointer',
//                                 transition: 'all 0.2s ease',
//                                 height: '36px'
//                               }}
//                             >
//                               {resendCooldown > 0 ? `${resendCooldown}s` : 'Resend'}
//                             </button>
//                           </div>
//                           <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
//                             Code expires in 10 minutes
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </FieldRow>

//                   {/* Phone Number */}
//                   <FieldRow label="Phone Number" icon={<IconPhone />}>
//                     <div>
//                       <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//                         <div style={{ flex: 1 }}>
//                           <input
//                             type="tel"
//                             value={newPhoneNumber}
//                             onChange={(e) => setNewPhoneNumber(e.target.value)}
//                             placeholder="Phone Number"
//                             style={{
//                               width: '100%',
//                               padding: '8px 12px',
//                               border: '1px solid rgba(18, 38, 63, 0.12)',
//                               borderRadius: '8px',
//                               fontSize: '14px',
//                               outline: 'none',
//                               background: 'white',
//                               transition: 'all 0.2s ease',
//                               height: '36px'
//                             }}
//                             onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
//                             onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
//                           />
//                         </div>
//                         <UpdateButton 
//                           onClick={handleSendPhoneOTP}
//                           loading={isPhoneCodeSending}
//                           disabled={!isPhoneAvailable || newPhoneNumber === phoneNumber}
//                           label="Send OTP"
//                         />
//                       </div>
                      
//                       {newPhoneNumber !== phoneNumber && (
//                         <div style={{ marginTop: '4px', fontSize: '12px' }}>
//                           {isCheckingPhone ? (
//                             <span style={{ color: '#0f4ea9' }}>⏳ Checking availability...</span>
//                           ) : phoneAvailabilityMessage ? (
//                             <span style={{ 
//                               color: phoneAvailabilityMessage.includes('available') ? '#2fb463' : '#dc2626' 
//                             }}>
//                               {phoneAvailabilityMessage}
//                             </span>
//                           ) : null}
//                         </div>
//                       )}

//                       {showPhoneVerification && (
//                         <div style={{ marginTop: '8px', padding: '12px', background: '#f0f7ff', borderRadius: '8px', border: '1px solid rgba(15,78,169,0.2)' }}>
//                           <div style={{ fontSize: '13px', fontWeight: 500, color: '#17263a', marginBottom: '8px' }}>
//                             Enter OTP sent to {newPhoneNumber}
//                           </div>
//                           <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//                             <input
//                               ref={phoneCodeInputRef}
//                               type="text"
//                               value={phoneVerificationCode}
//                               onChange={(e) => {
//                                 const value = e.target.value.replace(/\D/g, '')
//                                 if (value.length <= 6) {
//                                   setPhoneVerificationCode(value)
//                                 }
//                               }}
//                               maxLength={6}
//                               placeholder="6-digit OTP"
//                               style={{
//                                 width: '150px',
//                                 padding: '8px 12px',
//                                 border: '1px solid rgba(18, 38, 63, 0.12)',
//                                 borderRadius: '8px',
//                                 fontSize: '14px',
//                                 outline: 'none',
//                                 background: 'white',
//                                 transition: 'all 0.2s ease',
//                                 height: '36px',
//                                 textAlign: 'center',
//                                 letterSpacing: '4px',
//                                 fontWeight: 600
//                               }}
//                               onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
//                               onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
//                             />
//                             <button
//                               onClick={handleVerifyPhoneCode}
//                               disabled={isPhoneCodeVerifying || phoneVerificationCode.length !== 6}
//                               style={{
//                                 padding: '6px 20px',
//                                 background: (isPhoneCodeVerifying || phoneVerificationCode.length !== 6) ? '#94a3b8' : '#2fb463',
//                                 color: 'white',
//                                 border: 'none',
//                                 borderRadius: '6px',
//                                 fontSize: '13px',
//                                 fontWeight: 600,
//                                 cursor: (isPhoneCodeVerifying || phoneVerificationCode.length !== 6) ? 'not-allowed' : 'pointer',
//                                 transition: 'all 0.2s ease',
//                                 height: '36px',
//                                 display: 'flex',
//                                 alignItems: 'center',
//                                 justifyContent: 'center'
//                               }}
//                             >
//                               {isPhoneCodeVerifying ? 'Verifying...' : 'Verify'}
//                             </button>
//                             <button
//                               onClick={handleResendPhoneOTP}
//                               disabled={phoneResendCooldown > 0 || isPhoneCodeSending}
//                               style={{
//                                 padding: '6px 16px',
//                                 background: (phoneResendCooldown > 0 || isPhoneCodeSending) ? '#94a3b8' : 'transparent',
//                                 color: (phoneResendCooldown > 0 || isPhoneCodeSending) ? '#94a3b8' : '#0f4ea9',
//                                 border: 'none',
//                                 borderRadius: '6px',
//                                 fontSize: '12px',
//                                 fontWeight: 500,
//                                 cursor: (phoneResendCooldown > 0 || isPhoneCodeSending) ? 'not-allowed' : 'pointer',
//                                 transition: 'all 0.2s ease',
//                                 height: '36px'
//                               }}
//                             >
//                               {phoneResendCooldown > 0 ? `${phoneResendCooldown}s` : 'Resend'}
//                             </button>
//                           </div>
//                           <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
//                             OTP expires in 10 minutes
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </FieldRow>

//                   {/* Language */}
//                   <FieldRow label="Language" icon={<IconGlobe />}>
//                     <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//                       <div style={{ flex: 1 }}>
//                         <select
//                           value={language}
//                           onChange={(e) => setLanguage(e.target.value)}
//                           style={{
//                             width: '100%',
//                             padding: '8px 12px',
//                             border: '1px solid rgba(18, 38, 63, 0.12)',
//                             borderRadius: '8px',
//                             fontSize: '14px',
//                             background: 'white',
//                             fontFamily: 'inherit',
//                             cursor: 'pointer',
//                             height: '36px',
//                             outline: 'none'
//                           }}
//                           onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
//                           onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
//                         >
//                           <option value="en">English</option>
//                           <option value="es">Spanish</option>
//                         </select>
//                       </div>
//                       <UpdateButton 
//                         onClick={() => updateField('language', language)}
//                         loading={saving.language}
//                       />
//                     </div>
//                   </FieldRow>

//                   {/* Password - Updated with modal trigger */}
//                   <FieldRow label="Password" icon={<IconLock />}>
//                     <div style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%' }}>
//                       <div style={{ flex: 1 }}>
//                         <input
//                           type="password"
//                           value="••••••••"
//                           readOnly
//                           style={{
//                             width: '100%',
//                             padding: '8px 12px',
//                             border: '1px solid rgba(18, 38, 63, 0.12)',
//                             borderRadius: '8px',
//                             fontSize: '14px',
//                             outline: 'none',
//                             background: '#f8fafc',
//                             color: '#17263a',
//                             height: '36px',
//                             cursor: 'default',
//                             fontFamily: 'inherit'
//                           }}
//                         />
//                       </div>
//                       <UpdateButton 
//                         onClick={() => setIsPasswordModalOpen(true)}
//                         loading={false}
//                         label="Change"
//                       />
//                     </div>
//                   </FieldRow>

//                   {/* Report Issue & Delete Account */}
//                   <div style={{
//                     padding: '16px 24px',
//                     borderTop: '1px solid rgba(18, 38, 63, 0.06)',
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                     flexWrap: 'wrap',
//                     gap: '12px',
//                     background: '#f8fafc'
//                   }}>
//                     <button
//                       onClick={() => setIsReportIssueOpen(true)} // ✅ Open modal instead of mailto
//                       style={{
//                         background: 'none',
//                         border: 'none',
//                         color: '#0f4ea9',
//                         fontSize: '13px',
//                         fontWeight: 500,
//                         cursor: 'pointer',
//                         padding: '4px 0',
//                         transition: 'color 0.2s ease'
//                       }}
//                       onMouseEnter={(e) => e.currentTarget.style.color = '#0b3f90'}
//                       onMouseLeave={(e) => e.currentTarget.style.color = '#0f4ea9'}
//                     >
//                       Report an issue
//                     </button>

//                     <button
//                       onClick={() => setShowDeleteConfirm(true)}
//                       style={{
//                         background: 'none',
//                         border: 'none',
//                         color: '#dc2626',
//                         fontSize: '13px',
//                         fontWeight: 500,
//                         cursor: 'pointer',
//                         padding: '4px 0',
//                         transition: 'color 0.2s ease'
//                       }}
//                       onMouseEnter={(e) => e.currentTarget.style.color = '#b91c1c'}
//                       onMouseLeave={(e) => e.currentTarget.style.color = '#dc2626'}
//                     >
//                       Delete my Account
//                     </button>
//                   </div>

//                   {/* Delete Confirmation */}
//                   {showDeleteConfirm && (
//                     <div style={{
//                       margin: '16px 24px',
//                       padding: '16px',
//                       background: '#fee2e2',
//                       borderRadius: '10px',
//                       border: '1px solid #fecaca'
//                     }}>
//                       <p style={{
//                         fontSize: '14px',
//                         color: '#dc2626',
//                         margin: '0 0 12px 0',
//                         fontWeight: 500
//                       }}>
//                         ⚠️ Are you sure? This action cannot be undone.
//                       </p>
//                       <p style={{
//                         fontSize: '13px',
//                         color: '#64748b',
//                         margin: '0 0 12px 0'
//                       }}>
//                         Type <strong>DELETE</strong> to confirm:
//                       </p>
//                       <input
//                         type="text"
//                         value={deleteConfirmText}
//                         onChange={(e) => setDeleteConfirmText(e.target.value)}
//                         placeholder="Type DELETE to confirm"
//                         style={{
//                           width: '100%',
//                           padding: '10px 12px',
//                           border: '1px solid rgba(18, 38, 63, 0.12)',
//                           borderRadius: '8px',
//                           fontSize: '14px',
//                           outline: 'none',
//                           marginBottom: '12px'
//                         }}
//                       />
//                       <div style={{ display: 'flex', gap: '8px' }}>
//                         <button
//                           onClick={() => {
//                             setShowDeleteConfirm(false)
//                             setDeleteConfirmText('')
//                             setError('')
//                           }}
//                           style={{
//                             flex: 1,
//                             padding: '8px',
//                             background: 'transparent',
//                             border: '1px solid rgba(18, 38, 63, 0.12)',
//                             borderRadius: '8px',
//                             cursor: 'pointer',
//                             fontSize: '14px',
//                             fontWeight: 500,
//                             color: '#17263a'
//                           }}
//                         >
//                           Cancel
//                         </button>
//                         <button
//                           onClick={handleDeleteAccount}
//                           disabled={saving.delete}
//                           style={{
//                             flex: 1,
//                             padding: '8px',
//                             background: '#dc2626',
//                             border: 'none',
//                             borderRadius: '8px',
//                             cursor: saving.delete ? 'not-allowed' : 'pointer',
//                             fontSize: '14px',
//                             fontWeight: 500,
//                             color: 'white',
//                             opacity: saving.delete ? 0.6 : 1
//                           }}
//                         >
//                           {saving.delete ? 'Deleting...' : 'Delete Account'}
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Password Modal */}
//       <PasswordModal
//         isOpen={isPasswordModalOpen}
//         onClose={() => setIsPasswordModalOpen(false)}
//         onUpdate={handlePasswordUpdate}
//         onForgotPassword={handleForgotPassword}
//         loading={passwordLoading}
//       />

//       {/* Report Issue Modal */}
//       <ReportIssueModal
//         isOpen={isReportIssueOpen}
//         onClose={() => setIsReportIssueOpen(false)}
//         onSuccess={() => {
//           console.log('Issue reported successfully')
//           setSuccess('✅ Your issue has been reported. We\'ll look into it!')
//           setTimeout(() => setSuccess(''), 5000)
//         }}
//       />

//       <style>{`
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
        
//         .accountSettingsPage {
//           max-width: 940px;
//           margin: 0 auto;
//           padding: 24px;
//         }
        
//         @media (max-width: 768px) {
//           .accountSettingsPage {
//             padding: 16px;
//           }
//           .accountSettingsPage .authCard {
//             max-width: 100% !important;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default AccountSettingsPage





// src/worker/pages/AccountSettingsPage.jsx
import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import { IconUser, IconMail, IconPhone, IconGlobe, IconLock, IconArrowLeft, IconEye, IconEyeOff } from '../../common/components/Icons'
import api from '../../services/api'
import workerService from '../services/workerService'
import { 
  requestEmailUpdate, 
  verifyEmailUpdate, 
  checkEmailAvailability,
  setupRecaptcha,
  sendPhoneOTP,
  verifyPhoneOTP
} from '../../services/verificationService'
import { ReportIssueModal } from '../components/ReportIssueModal'

// Password Input Component with eye toggle
function PasswordInput({ placeholder, value, onChange, showPassword, onToggle, label }) {
  return (
    <div style={{ width: '100%' }}>
      {label && (
        <label style={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#17263a',
          display: 'block',
          marginBottom: '6px'
        }}>
          {label}
        </label>
      )}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        height: '44px',
        border: '1px solid rgba(18, 38, 63, 0.12)',
        borderRadius: '10px',
        background: 'white',
        transition: 'all 0.2s ease',
        overflow: 'hidden'
      }}>
        <span style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 10px',
          color: 'rgba(23, 38, 58, 0.4)',
          flexShrink: 0,
          minWidth: '38px'
        }}>
          <IconLock />
        </span>
        <input
          type={showPassword ? 'text' : 'password'}
          style={{
            flex: 1,
            height: '100%',
            border: 'none',
            outline: 'none',
            padding: '0 4px',
            fontSize: '14px',
            color: '#17263a',
            background: 'transparent',
            fontFamily: 'inherit',
            minWidth: 0,
            width: '100%'
          }}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          onClick={onToggle}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 10px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(23, 38, 58, 0.4)',
            transition: 'color 0.2s ease',
            flexShrink: 0,
            height: '100%',
            minWidth: '38px'
          }}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
    </div>
  )
}

// Password Modal Component
function PasswordModal({ isOpen, onClose, onUpdate, onForgotPassword, loading }) {
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleUpdate = () => {
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setError('')
    onUpdate(oldPassword, newPassword)
  }

  const handleForgotPassword = () => {
    onForgotPassword()
    onClose()
  }

  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={onClose}
      >
        <div 
          style={{
            background: 'white',
            borderRadius: '16px',
            maxWidth: '440px',
            width: '90%',
            padding: '32px 28px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.3s ease',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'rgba(15, 78, 169, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px'
            }}>
              <IconLock style={{ width: '28px', height: '28px', color: '#0f4ea9' }} />
            </div>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#17263a',
              margin: 0
            }}>
              Change Password
            </h2>
            <p style={{
              fontSize: '14px',
              color: 'rgba(23, 38, 58, 0.5)',
              marginTop: '4px'
            }}>
              Enter your old password and choose a new one
            </p>
          </div>

          {error && (
            <div style={{
              padding: '10px 14px',
              background: '#fee2e2',
              color: '#dc2626',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px'
            }}>
              ❌ {error}
            </div>
          )}

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#17263a',
              display: 'block',
              marginBottom: '4px'
            }}>
              Enter old password
            </label>
            <PasswordInput
              placeholder="Enter your current password"
              value={oldPassword}
              onChange={setOldPassword}
              showPassword={showOldPassword}
              onToggle={() => setShowOldPassword(!showOldPassword)}
            />
          </div>

          <div style={{
            textAlign: 'right',
            marginBottom: '16px'
          }}>
            <button
              onClick={handleForgotPassword}
              style={{
                background: 'none',
                border: 'none',
                color: '#0f4ea9',
                fontSize: '13px',
                fontWeight: 500,
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Forgot password?
            </button>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#17263a',
              display: 'block',
              marginBottom: '4px'
            }}>
              Enter New password
            </label>
            <PasswordInput
              placeholder="Enter new password"
              value={newPassword}
              onChange={setNewPassword}
              showPassword={showNewPassword}
              onToggle={() => setShowNewPassword(!showNewPassword)}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#17263a',
              display: 'block',
              marginBottom: '4px'
            }}>
              Confirm password
            </label>
            <PasswordInput
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              showPassword={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>

          <button
            onClick={handleUpdate}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#94a3b8' : '#2fb463',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>

          <div style={{
            marginTop: '16px',
            padding: '12px',
            background: '#f0f7ff',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '13px',
            color: 'rgba(23, 38, 58, 0.6)'
          }}>
            After Update, you will be logged out and taken to the login page.
            <br />
            <span style={{ fontSize: '11px', color: 'rgba(23, 38, 58, 0.4)' }}>
              Please log in with your new password.
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  )
}

function UpdateButton({ onClick, loading, label = 'Update', disabled = false, variant = 'primary' }) {
  const colors = variant === 'primary' 
    ? { default: '#0f4ea9', hover: '#0b3f90', disabled: '#94a3b8' }
    : { default: '#e5e7eb', hover: '#d1d5db', disabled: '#f3f4f6' };
  
  return (
    <button
      onClick={onClick}
      disabled={loading || disabled}
      style={{
        padding: '6px 16px',
        background: (loading || disabled) ? colors.disabled : colors.default,
        color: variant === 'primary' ? 'white' : '#374151',
        border: variant === 'secondary' ? '1px solid #d1d5db' : 'none',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: (loading || disabled) ? 'not-allowed' : 'pointer',
        transition: 'all 0.2s ease',
        whiteSpace: 'nowrap',
        minWidth: '70px',
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}
      onMouseEnter={(e) => {
        if (!loading && !disabled) e.currentTarget.style.background = colors.hover
      }}
      onMouseLeave={(e) => {
        if (!loading && !disabled) e.currentTarget.style.background = colors.default
      }}
    >
      {loading ? '...' : label}
    </button>
  )
}

export function AccountSettingsPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState({})
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // User data
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [language, setLanguage] = useState('')
  
  // Password modal state
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  
  // Email update states - using refs for input values to prevent re-renders
  const [isEditingEmail, setIsEditingEmail] = useState(false)
  const emailInputRef = useRef(null)
  const [emailDisplayValue, setEmailDisplayValue] = useState('')
  const [isEmailAvailable, setIsEmailAvailable] = useState(false)
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [emailAvailabilityMessage, setEmailAvailabilityMessage] = useState('')
  const [showEmailVerification, setShowEmailVerification] = useState(false)
  const [emailVerificationCode, setEmailVerificationCode] = useState('')
  const [isEmailCodeSending, setIsEmailCodeSending] = useState(false)
  const [isEmailCodeVerifying, setIsEmailCodeVerifying] = useState(false)
  const [emailCodeSent, setEmailCodeSent] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(0)
  const emailCodeInputRef = useRef(null)
  const cooldownIntervalRef = useRef(null)
  const emailCheckTimeoutRef = useRef(null)

  // Phone update states - using refs for input values to prevent re-renders
  const [isEditingPhone, setIsEditingPhone] = useState(false)
  const phoneInputRef = useRef(null)
  const [phoneDisplayValue, setPhoneDisplayValue] = useState('')
  const [isPhoneAvailable, setIsPhoneAvailable] = useState(false)
  const [isCheckingPhone, setIsCheckingPhone] = useState(false)
  const [phoneAvailabilityMessage, setPhoneAvailabilityMessage] = useState('')
  const [showPhoneVerification, setShowPhoneVerification] = useState(false)
  const [phoneVerificationCode, setPhoneVerificationCode] = useState('')
  const [isPhoneCodeSending, setIsPhoneCodeSending] = useState(false)
  const [isPhoneCodeVerifying, setIsPhoneCodeVerifying] = useState(false)
  const [phoneCodeSent, setPhoneCodeSent] = useState(false)
  const [phoneResendCooldown, setPhoneResendCooldown] = useState(0)
  const phoneCodeInputRef = useRef(null)
  const phoneCooldownIntervalRef = useRef(null)
  const phoneCheckTimeoutRef = useRef(null)
  
  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  
  // Report Issue Modal
  const [isReportIssueOpen, setIsReportIssueOpen] = useState(false)
  
  const userId = localStorage.getItem('userId')

  // Create reCAPTCHA container
  useEffect(() => {
    let container = document.getElementById('recaptcha-container-phone')
    if (!container) {
      container = document.createElement('div')
      container.id = 'recaptcha-container-phone'
      container.style.position = 'fixed'
      container.style.bottom = '-9999px'
      container.style.left = '0'
      container.style.width = '1px'
      container.style.height = '1px'
      container.style.opacity = '0'
      container.style.pointerEvents = 'none'
      document.body.appendChild(container)
    }
    
    return () => {
      const el = document.getElementById('recaptcha-container-phone')
      if (el) el.remove()
    }
  }, [])

  // Load user data
  useEffect(() => {
    if (userId) {
      loadUserData()
    } else {
      navigate('/login')
    }
  }, [userId])

  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current)
      }
      if (phoneCooldownIntervalRef.current) {
        clearInterval(phoneCooldownIntervalRef.current)
      }
      if (emailCheckTimeoutRef.current) {
        clearTimeout(emailCheckTimeoutRef.current)
      }
      if (phoneCheckTimeoutRef.current) {
        clearTimeout(phoneCheckTimeoutRef.current)
      }
    }
  }, [])

  const loadUserData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const result = await workerService.getWorkerProfile(userId)
      
      if (result.success && result.data) {
        const basics = result.data.basics || {}
        setEmail(basics.emailAddress || '')
        setEmailDisplayValue(basics.emailAddress || '')
        setPhoneNumber(basics.mobilePhone || '')
        setPhoneDisplayValue(basics.mobilePhone || '')
        
        if (basics.english && basics.spanish) {
          setLanguage('en-es')
        } else if (basics.spanish) {
          setLanguage('es')
        } else {
          setLanguage('en')
        }
      }
    } catch (err) {
      console.error('Error loading user data:', err)
      setError('Failed to load user data')
    } finally {
      setLoading(false)
    }
  }

  // ============================================================
  // PASSWORD UPDATE FUNCTIONS
  // ============================================================

  const handlePasswordUpdate = async (oldPassword, newPassword) => {
    try {
      setPasswordLoading(true)
      setError('')
      setSuccess('')

      const response = await api.post('/auth/change-password', {
        userId,
        currentPassword: oldPassword,
        newPassword
      })

      if (response.data.success) {
        setSuccess('✅ Password updated successfully!')
        setIsPasswordModalOpen(false)
        
        setTimeout(() => {
          localStorage.clear()
          sessionStorage.clear()
          navigate('/login')
        }, 2000)
      } else {
        setError(response.data.message || 'Failed to update password')
      }
    } catch (err) {
      console.error('Error updating password:', err)
      setError(err.response?.data?.message || err.message || 'Failed to update password')
    } finally {
      setPasswordLoading(false)
    }
  }

  const handleForgotPassword = () => {
    localStorage.clear()
    sessionStorage.clear()
    navigate('/reset-password')
  }

  // ============================================================
  // EMAIL UPDATE FUNCTIONS
  // ============================================================

  const checkEmailAvailabilityRealTime = async (emailToCheck) => {
    if (!emailToCheck || emailToCheck === email || !isEditingEmail) {
      setIsEmailAvailable(false)
      setEmailAvailabilityMessage('')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailToCheck)) {
      setIsEmailAvailable(false)
      setEmailAvailabilityMessage('Please enter a valid email address')
      return
    }

    setIsCheckingEmail(true)
    setEmailAvailabilityMessage('Checking...')

    try {
      const result = await checkEmailAvailability(emailToCheck)
      
      if (result.success) {
        if (result.data.available) {
          setIsEmailAvailable(true)
          setEmailAvailabilityMessage('✓ Email is available')
        } else {
          setIsEmailAvailable(false)
          setEmailAvailabilityMessage('✗ Email is already registered')
        }
      } else {
        setIsEmailAvailable(false)
        setEmailAvailabilityMessage('Error checking email')
      }
    } catch (err) {
      console.error('Error checking email:', err)
      setIsEmailAvailable(false)
      setEmailAvailabilityMessage('Error checking email')
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleEmailInputChange = (e) => {
    const value = e.target.value
    setEmailDisplayValue(value)
    
    if (emailCheckTimeoutRef.current) {
      clearTimeout(emailCheckTimeoutRef.current)
    }

    if (value && value.length > 3 && value !== email && isEditingEmail) {
      emailCheckTimeoutRef.current = setTimeout(() => {
        checkEmailAvailabilityRealTime(value)
      }, 500)
    } else {
      setIsEmailAvailable(false)
      setEmailAvailabilityMessage('')
    }
  }

  const handleStartEditEmail = () => {
    setIsEditingEmail(true)
    setEmailDisplayValue(email)
    setIsEmailAvailable(false)
    setEmailAvailabilityMessage('')
    setTimeout(() => {
      if (emailInputRef.current) {
        emailInputRef.current.focus()
      }
    }, 100)
  }

  const handleCancelEditEmail = () => {
    setIsEditingEmail(false)
    setEmailDisplayValue(email)
    setIsEmailAvailable(false)
    setEmailAvailabilityMessage('')
    setShowEmailVerification(false)
    setEmailVerificationCode('')
    setEmailCodeSent(false)
    setError('')
    if (emailCheckTimeoutRef.current) {
      clearTimeout(emailCheckTimeoutRef.current)
    }
  }

  const handleSendEmailVerification = async () => {
    const currentEmail = emailDisplayValue
    if (!currentEmail || !isEmailAvailable) {
      setError('Please enter a valid and available email address')
      return
    }

    setIsEmailCodeSending(true)
    setError('')
    setSuccess('')

    try {
      const result = await requestEmailUpdate(userId, currentEmail, '')
      
      if (result.success) {
        setEmailCodeSent(true)
        setShowEmailVerification(true)
        setResendCooldown(60)
        setSuccess('Verification code sent to your new email!')
        setTimeout(() => setSuccess(''), 5000)
        
        if (cooldownIntervalRef.current) {
          clearInterval(cooldownIntervalRef.current)
        }
        cooldownIntervalRef.current = setInterval(() => {
          setResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(cooldownIntervalRef.current)
              return 0
            }
            return prev - 1
          })
        }, 1000)
        
        setTimeout(() => {
          if (emailCodeInputRef.current) {
            emailCodeInputRef.current.focus()
          }
        }, 300)
      } else {
        setError(result.message || 'Failed to send verification code')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsEmailCodeSending(false)
    }
  }

  const handleVerifyEmailCode = async () => {
    if (!emailVerificationCode || emailVerificationCode.length !== 6) {
      setError('Please enter 6-digit verification code')
      return
    }

    setIsEmailCodeVerifying(true)
    setError('')
    setSuccess('')

    try {
      const result = await verifyEmailUpdate(emailDisplayValue, emailVerificationCode)
      
      if (result.success) {
        setSuccess('✅ Email updated successfully!')
        const newEmail = emailDisplayValue
        setEmail(newEmail)
        setShowEmailVerification(false)
        setEmailCodeSent(false)
        setEmailVerificationCode('')
        setIsEmailAvailable(false)
        setEmailAvailabilityMessage('')
        setIsEditingEmail(false)
        
        localStorage.setItem('pendingEmail', newEmail)
        await loadUserData()
        setTimeout(() => setSuccess(''), 5000)
      } else {
        setError(result.message || 'Invalid code. Please try again.')
      }
    } catch (err) {
      setError(err.message || 'An error occurred')
    } finally {
      setIsEmailCodeVerifying(false)
    }
  }

  const handleResendEmailCode = async () => {
    if (resendCooldown > 0) return
    await handleSendEmailVerification()
  }

  // ============================================================
  // PHONE UPDATE FUNCTIONS
  // ============================================================

  const checkPhoneAvailabilityRealTime = async (phoneToCheck) => {
    if (!phoneToCheck || phoneToCheck === phoneNumber || !isEditingPhone) {
      setIsPhoneAvailable(false)
      setPhoneAvailabilityMessage('')
      return
    }

    const digitsOnly = phoneToCheck.replace(/\D/g, '')
    if (digitsOnly.length !== 10) {
      setIsPhoneAvailable(false)
      setPhoneAvailabilityMessage('Please enter a valid 10-digit phone number')
      return
    }

    setIsCheckingPhone(true)
    setPhoneAvailabilityMessage('Checking...')

    try {
      const response = await api.get(`/worker/phone/${digitsOnly}`)
      
      if (response.data && response.data.success) {
        const phoneData = response.data.data || {}
        if (phoneData.available === true) {
          setIsPhoneAvailable(true)
          setPhoneAvailabilityMessage('✓ Phone number is available')
        } else {
          setIsPhoneAvailable(false)
          setPhoneAvailabilityMessage('✗ Phone number is already registered')
        }
      } else {
        setIsPhoneAvailable(false)
        setPhoneAvailabilityMessage('Error checking phone number')
      }
    } catch (err) {
      console.error('Error checking phone:', err)
      setIsPhoneAvailable(false)
      setPhoneAvailabilityMessage('Error checking phone number')
    } finally {
      setIsCheckingPhone(false)
    }
  }

  const handlePhoneInputChange = (e) => {
    const value = e.target.value
    setPhoneDisplayValue(value)
    
    if (phoneCheckTimeoutRef.current) {
      clearTimeout(phoneCheckTimeoutRef.current)
    }

    if (value && value.length > 3 && value !== phoneNumber && isEditingPhone) {
      phoneCheckTimeoutRef.current = setTimeout(() => {
        checkPhoneAvailabilityRealTime(value)
      }, 500)
    } else {
      setIsPhoneAvailable(false)
      setPhoneAvailabilityMessage('')
    }
  }

  const handleStartEditPhone = () => {
    setIsEditingPhone(true)
    setPhoneDisplayValue(phoneNumber)
    setIsPhoneAvailable(false)
    setPhoneAvailabilityMessage('')
    setTimeout(() => {
      if (phoneInputRef.current) {
        phoneInputRef.current.focus()
      }
    }, 100)
  }

  const handleCancelEditPhone = () => {
    setIsEditingPhone(false)
    setPhoneDisplayValue(phoneNumber)
    setIsPhoneAvailable(false)
    setPhoneAvailabilityMessage('')
    setShowPhoneVerification(false)
    setPhoneVerificationCode('')
    setPhoneCodeSent(false)
    setError('')
    if (phoneCheckTimeoutRef.current) {
      clearTimeout(phoneCheckTimeoutRef.current)
    }
  }

  const handleSendPhoneOTP = async () => {
    const currentPhone = phoneDisplayValue
    if (!currentPhone || !isPhoneAvailable) {
      setError('Please enter a valid and available phone number')
      return
    }

    setIsPhoneCodeSending(true)
    setError('')
    setSuccess('')

    try {
      const recaptchaVerifier = setupRecaptcha('recaptcha-container-phone')
      
      if (!recaptchaVerifier) {
        setError('Failed to initialize security verification. Please refresh and try again.')
        setIsPhoneCodeSending(false)
        return
      }

      const result = await sendPhoneOTP(currentPhone, recaptchaVerifier)
      
      if (result.success) {
        setPhoneCodeSent(true)
        setShowPhoneVerification(true)
        setPhoneResendCooldown(60)
        setSuccess('OTP sent to your new phone number!')
        setTimeout(() => setSuccess(''), 5000)
        
        if (phoneCooldownIntervalRef.current) {
          clearInterval(phoneCooldownIntervalRef.current)
        }
        phoneCooldownIntervalRef.current = setInterval(() => {
          setPhoneResendCooldown((prev) => {
            if (prev <= 1) {
              clearInterval(phoneCooldownIntervalRef.current)
              return 0
            }
            return prev - 1
          })
        }, 1000)
        
        setTimeout(() => {
          if (phoneCodeInputRef.current) {
            phoneCodeInputRef.current.focus()
          }
        }, 300)
      } else {
        setError(result.message || 'Failed to send OTP')
      }
    } catch (err) {
      console.error('❌ Send OTP error:', err)
      setError(err.message || 'An error occurred')
    } finally {
      setIsPhoneCodeSending(false)
    }
  }

  const handleVerifyPhoneCode = async () => {
    if (!phoneVerificationCode || phoneVerificationCode.length !== 6) {
      setError('Please enter 6-digit OTP')
      return
    }

    setIsPhoneCodeVerifying(true)
    setError('')
    setSuccess('')

    try {
      const result = await verifyPhoneOTP(phoneVerificationCode)
      
      if (result.success) {
        await workerService.updateBasics(userId, { mobilePhone: phoneDisplayValue })
        
        setSuccess('✅ Phone number updated successfully!')
        const newPhone = phoneDisplayValue
        setPhoneNumber(newPhone)
        setShowPhoneVerification(false)
        setPhoneCodeSent(false)
        setPhoneVerificationCode('')
        setIsPhoneAvailable(false)
        setPhoneAvailabilityMessage('')
        setIsEditingPhone(false)
        
        localStorage.setItem('pendingPhoneNumber', newPhone)
        await loadUserData()
        setTimeout(() => setSuccess(''), 5000)
      } else {
        setError(result.message || 'Invalid OTP. Please try again.')
      }
    } catch (err) {
      console.error('❌ Verify OTP error:', err)
      setError(err.message || 'An error occurred')
    } finally {
      setIsPhoneCodeVerifying(false)
    }
  }

  const handleResendPhoneOTP = async () => {
    if (phoneResendCooldown > 0) return
    await handleSendPhoneOTP()
  }

  // ============================================================
  // OTHER UPDATE FUNCTIONS
  // ============================================================

  const updateField = async (field, value) => {
    try {
      setSaving(prev => ({ ...prev, [field]: true }))
      setError('')
      setSuccess('')
      
      const updateData = {}
      updateData[field] = value
      
      if (field === 'language') {
        if (value === 'en') {
          updateData.english = true
          updateData.spanish = false
          updateData.englishSpanish = false
        } else if (value === 'es') {
          updateData.english = false
          updateData.spanish = true
          updateData.englishSpanish = false
        } else if (value === 'en-es') {
          updateData.english = false
          updateData.spanish = false
          updateData.englishSpanish = true
        }
        delete updateData.language
      }
      
      if (field === 'language') {
        await workerService.updateBasics(userId, updateData)
      }
      
      setSuccess(`${field} updated successfully!`)
      setTimeout(() => setSuccess(''), 3000)
      await loadUserData()
      
    } catch (err) {
      console.error(`Error updating ${field}:`, err)
      setError(err.response?.data?.message || err.message || `Failed to update ${field}`)
    } finally {
      setSaving(prev => ({ ...prev, [field]: false }))
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setError('Please type "DELETE" to confirm')
      return
    }
    
    try {
      setSaving(prev => ({ ...prev, delete: true }))
      setError('')
      
      await api.delete(`/worker/profile/${userId}`)
      
      localStorage.clear()
      sessionStorage.clear()
      
      navigate('/login')
      
    } catch (err) {
      console.error('Error deleting account:', err)
      setError(err.response?.data?.message || err.message || 'Failed to delete account')
      setSaving(prev => ({ ...prev, delete: false }))
    }
  }

  const FieldRow = ({ label, children, icon }) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px 16px',
      borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
      gap: '16px',
      minHeight: '60px'
    }}>
      <div style={{
        minWidth: '140px',
        fontSize: '14px',
        fontWeight: 500,
        color: '#17263a',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {icon && <span style={{ color: 'rgba(23,38,58,0.4)' }}>{icon}</span>}
        {label}
      </div>
      <div style={{ flex: 1 }}>
        {children}
      </div>
    </div>
  )

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">12</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Profile</span>
              </a>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup" aria-label="General">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div className="accountSettingsPage">
            <div className="authCard" style={{
              maxWidth: '900px',
              width: '100%',
              margin: '0 auto',
              padding: '0',
              overflow: 'hidden',
              borderRadius: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '20px 24px',
                borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
                background: '#f8fafc'
              }}>
                <button
                  onClick={() => navigate('/wizard/summary')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#17263a',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <IconArrowLeft />
                  Back
                </button>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#17263a',
                  margin: 0,
                  flex: 1
                }}>
                  Account Settings
                </h2>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid rgba(15, 78, 169, 0.1)',
                    borderTop: '4px solid #0f4ea9',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                  }} />
                  <p style={{ marginTop: '16px', color: '#64748b' }}>Loading...</p>
                </div>
              ) : (
                <div style={{ padding: '0' }}>
                  {error && (
                    <div style={{
                      padding: '12px 20px',
                      margin: '16px 24px',
                      background: '#fee2e2',
                      color: '#dc2626',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}>
                      ❌ {error}
                    </div>
                  )}
                  
                  {success && (
                    <div style={{
                      padding: '12px 20px',
                      margin: '16px 24px',
                      background: '#dcfce7',
                      color: '#16a34a',
                      borderRadius: '8px',
                      fontSize: '14px'
                    }}>
                      ✅ {success}
                    </div>
                  )}

                  {/* Email Address */}
                  <FieldRow label="Email Address" icon={<IconMail />}>
                    <div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <input
                            ref={emailInputRef}
                            name="email-input"
                            type="email"
                            value={emailDisplayValue}
                            onChange={handleEmailInputChange}
                            placeholder="Email Address"
                            readOnly={!isEditingEmail}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              border: '1px solid rgba(18, 38, 63, 0.12)',
                              borderRadius: '8px',
                              fontSize: '14px',
                              outline: 'none',
                              background: isEditingEmail ? 'white' : '#f3f4f6',
                              transition: 'all 0.2s ease',
                              height: '36px',
                              cursor: isEditingEmail ? 'text' : 'default',
                              color: isEditingEmail ? '#17263a' : '#6b7280'
                            }}
                            onFocus={(e) => {
                              if (isEditingEmail) e.target.style.borderColor = '#0f4ea9'
                            }}
                            onBlur={(e) => {
                              if (isEditingEmail) e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
                            }}
                          />
                        </div>
                        {!isEditingEmail ? (
                          <UpdateButton 
                            onClick={handleStartEditEmail}
                            label="Update"
                            variant="primary"
                          />
                        ) : (
                          <>
                            <UpdateButton 
                              onClick={handleCancelEditEmail}
                              label="Cancel"
                              variant="secondary"
                            />
                            <UpdateButton 
                              onClick={handleSendEmailVerification}
                              loading={isEmailCodeSending}
                              disabled={!isEmailAvailable || emailDisplayValue === email || showEmailVerification}
                              label="Send Code"
                              variant="primary"
                            />
                          </>
                        )}
                      </div>
                      
                      {isEditingEmail && emailDisplayValue !== email && (
                        <div style={{ marginTop: '4px', fontSize: '12px' }}>
                          {isCheckingEmail ? (
                            <span style={{ color: '#0f4ea9' }}>⏳ Checking availability...</span>
                          ) : emailAvailabilityMessage ? (
                            <span style={{ 
                              color: emailAvailabilityMessage.includes('available') ? '#2fb463' : '#dc2626' 
                            }}>
                              {emailAvailabilityMessage}
                            </span>
                          ) : null}
                        </div>
                      )}

                      {isEditingEmail && showEmailVerification && (
                        <div style={{ marginTop: '8px', padding: '12px', background: '#f0f7ff', borderRadius: '8px', border: '1px solid rgba(15,78,169,0.2)' }}>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: '#17263a', marginBottom: '8px' }}>
                            Enter verification code sent to {emailDisplayValue}
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input
                              ref={emailCodeInputRef}
                              type="text"
                              value={emailVerificationCode}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '')
                                if (value.length <= 6) {
                                  setEmailVerificationCode(value)
                                }
                              }}
                              maxLength={6}
                              placeholder="6-digit code"
                              style={{
                                width: '150px',
                                padding: '8px 12px',
                                border: '1px solid rgba(18, 38, 63, 0.12)',
                                borderRadius: '8px',
                                fontSize: '14px',
                                outline: 'none',
                                background: 'white',
                                transition: 'all 0.2s ease',
                                height: '36px',
                                textAlign: 'center',
                                letterSpacing: '4px',
                                fontWeight: 600
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
                              onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
                            />
                            <button
                              onClick={handleVerifyEmailCode}
                              disabled={isEmailCodeVerifying || emailVerificationCode.length !== 6}
                              style={{
                                padding: '6px 20px',
                                background: (isEmailCodeVerifying || emailVerificationCode.length !== 6) ? '#94a3b8' : '#2fb463',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: (isEmailCodeVerifying || emailVerificationCode.length !== 6) ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {isEmailCodeVerifying ? 'Verifying...' : 'Verify'}
                            </button>
                            <button
                              onClick={handleResendEmailCode}
                              disabled={resendCooldown > 0 || isEmailCodeSending}
                              style={{
                                padding: '6px 16px',
                                background: (resendCooldown > 0 || isEmailCodeSending) ? '#94a3b8' : 'transparent',
                                color: (resendCooldown > 0 || isEmailCodeSending) ? '#94a3b8' : '#0f4ea9',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 500,
                                cursor: (resendCooldown > 0 || isEmailCodeSending) ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                height: '36px'
                              }}
                            >
                              {resendCooldown > 0 ? `${resendCooldown}s` : 'Resend'}
                            </button>
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                            Code expires in 10 minutes
                          </div>
                        </div>
                      )}
                    </div>
                  </FieldRow>

                  {/* Phone Number */}
                  <FieldRow label="Phone Number" icon={<IconPhone />}>
                    <div>
                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <input
                            ref={phoneInputRef}
                            name="phone-input"
                            type="tel"
                            value={phoneDisplayValue}
                            onChange={handlePhoneInputChange}
                            placeholder="Phone Number"
                            readOnly={!isEditingPhone}
                            style={{
                              width: '100%',
                              padding: '8px 12px',
                              border: '1px solid rgba(18, 38, 63, 0.12)',
                              borderRadius: '8px',
                              fontSize: '14px',
                              outline: 'none',
                              background: isEditingPhone ? 'white' : '#f3f4f6',
                              transition: 'all 0.2s ease',
                              height: '36px',
                              cursor: isEditingPhone ? 'text' : 'default',
                              color: isEditingPhone ? '#17263a' : '#6b7280'
                            }}
                            onFocus={(e) => {
                              if (isEditingPhone) e.target.style.borderColor = '#0f4ea9'
                            }}
                            onBlur={(e) => {
                              if (isEditingPhone) e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
                            }}
                          />
                        </div>
                        {!isEditingPhone ? (
                          <UpdateButton 
                            onClick={handleStartEditPhone}
                            label="Update"
                            variant="primary"
                          />
                        ) : (
                          <>
                            <UpdateButton 
                              onClick={handleCancelEditPhone}
                              label="Cancel"
                              variant="secondary"
                            />
                            <UpdateButton 
                              onClick={handleSendPhoneOTP}
                              loading={isPhoneCodeSending}
                              disabled={!isPhoneAvailable || phoneDisplayValue === phoneNumber || showPhoneVerification}
                              label="Send OTP"
                              variant="primary"
                            />
                          </>
                        )}
                      </div>
                      
                      {isEditingPhone && phoneDisplayValue !== phoneNumber && (
                        <div style={{ marginTop: '4px', fontSize: '12px' }}>
                          {isCheckingPhone ? (
                            <span style={{ color: '#0f4ea9' }}>⏳ Checking availability...</span>
                          ) : phoneAvailabilityMessage ? (
                            <span style={{ 
                              color: phoneAvailabilityMessage.includes('available') ? '#2fb463' : '#dc2626' 
                            }}>
                              {phoneAvailabilityMessage}
                            </span>
                          ) : null}
                        </div>
                      )}

                      {isEditingPhone && showPhoneVerification && (
                        <div style={{ marginTop: '8px', padding: '12px', background: '#f0f7ff', borderRadius: '8px', border: '1px solid rgba(15,78,169,0.2)' }}>
                          <div style={{ fontSize: '13px', fontWeight: 500, color: '#17263a', marginBottom: '8px' }}>
                            Enter OTP sent to {phoneDisplayValue}
                          </div>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <input
                              ref={phoneCodeInputRef}
                              type="text"
                              value={phoneVerificationCode}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '')
                                if (value.length <= 6) {
                                  setPhoneVerificationCode(value)
                                }
                              }}
                              maxLength={6}
                              placeholder="6-digit OTP"
                              style={{
                                width: '150px',
                                padding: '8px 12px',
                                border: '1px solid rgba(18, 38, 63, 0.12)',
                                borderRadius: '8px',
                                fontSize: '14px',
                                outline: 'none',
                                background: 'white',
                                transition: 'all 0.2s ease',
                                height: '36px',
                                textAlign: 'center',
                                letterSpacing: '4px',
                                fontWeight: 600
                              }}
                              onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
                              onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
                            />
                            <button
                              onClick={handleVerifyPhoneCode}
                              disabled={isPhoneCodeVerifying || phoneVerificationCode.length !== 6}
                              style={{
                                padding: '6px 20px',
                                background: (isPhoneCodeVerifying || phoneVerificationCode.length !== 6) ? '#94a3b8' : '#2fb463',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '13px',
                                fontWeight: 600,
                                cursor: (isPhoneCodeVerifying || phoneVerificationCode.length !== 6) ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                height: '36px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                            >
                              {isPhoneCodeVerifying ? 'Verifying...' : 'Verify'}
                            </button>
                            <button
                              onClick={handleResendPhoneOTP}
                              disabled={phoneResendCooldown > 0 || isPhoneCodeSending}
                              style={{
                                padding: '6px 16px',
                                background: (phoneResendCooldown > 0 || isPhoneCodeSending) ? '#94a3b8' : 'transparent',
                                color: (phoneResendCooldown > 0 || isPhoneCodeSending) ? '#94a3b8' : '#0f4ea9',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '12px',
                                fontWeight: 500,
                                cursor: (phoneResendCooldown > 0 || isPhoneCodeSending) ? 'not-allowed' : 'pointer',
                                transition: 'all 0.2s ease',
                                height: '36px'
                              }}
                            >
                              {phoneResendCooldown > 0 ? `${phoneResendCooldown}s` : 'Resend'}
                            </button>
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>
                            OTP expires in 10 minutes
                          </div>
                        </div>
                      )}
                    </div>
                  </FieldRow>

                  {/* Language */}
                  <FieldRow label="Language" icon={<IconGlobe />}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid rgba(18, 38, 63, 0.12)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            background: 'white',
                            fontFamily: 'inherit',
                            cursor: 'pointer',
                            height: '36px',
                            outline: 'none'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
                        >
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                        </select>
                      </div>
                      <UpdateButton 
                        onClick={() => updateField('language', language)}
                        loading={saving.language}
                        label="Update"
                        variant="primary"
                      />
                    </div>
                  </FieldRow>

                  {/* Password */}
                  <FieldRow label="Password" icon={<IconLock />}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', width: '100%' }}>
                      <div style={{ flex: 1 }}>
                        <input
                          type="password"
                          value="••••••••"
                          readOnly
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid rgba(18, 38, 63, 0.12)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            background: '#f3f4f6',
                            color: '#6b7280',
                            height: '36px',
                            cursor: 'default',
                            fontFamily: 'inherit'
                          }}
                        />
                      </div>
                      <UpdateButton 
                        onClick={() => setIsPasswordModalOpen(true)}
                        loading={false}
                        label="Change"
                        variant="primary"
                      />
                    </div>
                  </FieldRow>

                  {/* Report Issue & Delete Account */}
                  <div style={{
                    padding: '16px 24px',
                    borderTop: '1px solid rgba(18, 38, 63, 0.06)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    background: '#f8fafc'
                  }}>
                    <button
                      onClick={() => setIsReportIssueOpen(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#0f4ea9',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        padding: '4px 0',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#0b3f90'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#0f4ea9'}
                    >
                      Report an issue
                    </button>

                    <button
                      onClick={() => setShowDeleteConfirm(true)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#dc2626',
                        fontSize: '13px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        padding: '4px 0',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#b91c1c'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#dc2626'}
                    >
                      Delete my Account
                    </button>
                  </div>

                  {/* Delete Confirmation */}
                  {showDeleteConfirm && (
                    <div style={{
                      margin: '16px 24px',
                      padding: '16px',
                      background: '#fee2e2',
                      borderRadius: '10px',
                      border: '1px solid #fecaca'
                    }}>
                      <p style={{
                        fontSize: '14px',
                        color: '#dc2626',
                        margin: '0 0 12px 0',
                        fontWeight: 500
                      }}>
                        ⚠️ Are you sure? This action cannot be undone.
                      </p>
                      <p style={{
                        fontSize: '13px',
                        color: '#64748b',
                        margin: '0 0 12px 0'
                      }}>
                        Type <strong>DELETE</strong> to confirm:
                      </p>
                      <input
                        type="text"
                        value={deleteConfirmText}
                        onChange={(e) => setDeleteConfirmText(e.target.value)}
                        placeholder="Type DELETE to confirm"
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid rgba(18, 38, 63, 0.12)',
                          borderRadius: '8px',
                          fontSize: '14px',
                          outline: 'none',
                          marginBottom: '12px'
                        }}
                      />
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                          onClick={() => {
                            setShowDeleteConfirm(false)
                            setDeleteConfirmText('')
                            setError('')
                          }}
                          style={{
                            flex: 1,
                            padding: '8px',
                            background: 'transparent',
                            border: '1px solid rgba(18, 38, 63, 0.12)',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#17263a'
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleDeleteAccount}
                          disabled={saving.delete}
                          style={{
                            flex: 1,
                            padding: '8px',
                            background: '#dc2626',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: saving.delete ? 'not-allowed' : 'pointer',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'white',
                            opacity: saving.delete ? 0.6 : 1
                          }}
                        >
                          {saving.delete ? 'Deleting...' : 'Delete Account'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onUpdate={handlePasswordUpdate}
        onForgotPassword={handleForgotPassword}
        loading={passwordLoading}
      />

      <ReportIssueModal
        isOpen={isReportIssueOpen}
        onClose={() => setIsReportIssueOpen(false)}
        onSuccess={() => {
          console.log('Issue reported successfully')
          setSuccess('✅ Your issue has been reported. We\'ll look into it!')
          setTimeout(() => setSuccess(''), 5000)
        }}
      />

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .accountSettingsPage {
          max-width: 940px;
          margin: 0 auto;
          padding: 24px;
        }
        
        @media (max-width: 768px) {
          .accountSettingsPage {
            padding: 16px;
          }
          .accountSettingsPage .authCard {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}

export default AccountSettingsPage



