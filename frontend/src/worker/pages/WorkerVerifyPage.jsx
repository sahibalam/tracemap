// // frontend/src/worker/pages/WorkerVerifyPage.jsx
// import { useState, useEffect, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'
// import { TextField } from '../../common/components/TextField'
// import { IconMail, IconPhone } from '../../common/components/Icons'
// import { 
//   registerAndSendEmailVerification, 
//   checkEmailVerified,
//   setupRecaptcha,
//   sendPhoneOTP,
//   verifyPhoneOTP,
//   signInAndCheckEmail  // Add this import
// } from '../../services/verificationService'
// import { auth } from '../../firebase/config'  // Add this import

// export function WorkerVerifyPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   const email = location?.state?.email ?? localStorage.getItem('pendingEmail') ?? ''
//   const phoneNumber = location?.state?.phoneNumber ?? localStorage.getItem('pendingPhoneNumber') ?? ''
//   const password = location?.state?.registerPassword ?? localStorage.getItem('pendingPassword') ?? ''
  
//   const [emailVerified, setEmailVerified] = useState(location?.state?.emailVerified ?? false)
//   const [phoneVerified, setPhoneVerified] = useState(false)
//   const [emailSent, setEmailSent] = useState(false)
//   const [showPhoneOtp, setShowPhoneOtp] = useState(false)
//   const [phoneOtp, setPhoneOtp] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [emailLoading, setEmailLoading] = useState(false)
//   const [firebaseUser, setFirebaseUser] = useState(null)
//   const [error, setError] = useState('')
//   const [checkingEmail, setCheckingEmail] = useState(false)
  
//   const recaptchaContainerRef = useRef(null)

//   // Auto-check email verification status when returning from email link
//   useEffect(() => {
//     const checkEmailVerificationStatus = async () => {
//       if (!email || !password) return
//       if (emailVerified) return  // Already verified
      
//       setCheckingEmail(true)
//       try {
//         const result = await signInAndCheckEmail(email, password)
//         if (result.success && result.isEmailVerified) {
//           setEmailVerified(true)
//           setEmailSent(true)
//           setError('')
          
//           // Clear pending data from localStorage
//           localStorage.removeItem('pendingEmail')
//           localStorage.removeItem('pendingPassword')
//           localStorage.removeItem('pendingPhoneNumber')
//           localStorage.removeItem('pendingFirstName')
//           localStorage.removeItem('pendingLastName')
//           localStorage.removeItem('pendingDob')
//           localStorage.removeItem('pendingAddress')
//           localStorage.removeItem('pendingCity')
//           localStorage.removeItem('pendingState')
//           localStorage.removeItem('pendingZip')
//           localStorage.removeItem('pendingLanguage')
//         }
//       } catch (error) {
//         console.error('Error checking email status:', error)
//       } finally {
//         setCheckingEmail(false)
//       }
//     }
    
//     // Check immediately
//     checkEmailVerificationStatus()
    
//     // Check every 3 seconds (in case user just verified)
//     const interval = setInterval(checkEmailVerificationStatus, 3000)
    
//     return () => clearInterval(interval)
//   }, [email, password, emailVerified])

//   // Send Email Verification Link
//   const handleSendEmailLink = async () => {
//     if (!password) {
//       setError('Password is required for email verification')
//       return
//     }
    
//     setEmailLoading(true)
//     setError('')
    
//     try {
//       const result = await registerAndSendEmailVerification(email, password)
      
//       if (result.success) {
//         setFirebaseUser(result.user)
//         setEmailSent(true)
        
//         // Also check periodically for email verification
//         const interval = setInterval(async () => {
//           const verified = await checkEmailVerified(result.user)
//           if (verified) {
//             setEmailVerified(true)
//             clearInterval(interval)
//             setError('')
//           }
//         }, 3000)
        
//       } else {
//         setError(result.message)
//       }
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setEmailLoading(false)
//     }
//   }

//   // Send Phone OTP
//   const handleSendPhoneOTP = async () => {
//     if (!recaptchaContainerRef.current) {
//       setError('Please wait...')
//       return
//     }
    
//     setLoading(true)
//     setError('')
    
//     try {
//       const recaptchaVerifier = setupRecaptcha('recaptcha-container')
//       const result = await sendPhoneOTP(phoneNumber, recaptchaVerifier)
      
//       if (result.success) {
//         setShowPhoneOtp(true)
//       } else {
//         setError(result.message)
//       }
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Verify Phone OTP
//   const handleVerifyPhone = async () => {
//     if (!phoneOtp || phoneOtp.length !== 6) {
//       setError('Please enter 6-digit OTP')
//       return
//     }
    
//     setLoading(true)
//     setError('')
    
//     try {
//       const result = await verifyPhoneOTP(phoneOtp)
      
//       if (result.success) {
//         setPhoneVerified(true)
//         setShowPhoneOtp(false)
//       } else {
//         setError(result.message)
//       }
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Proceed to wizard when both verified
//   const handleProceed = () => {
//     if (emailVerified && phoneVerified) {
//       navigate('/wizard', { 
//         state: { 
//           email, 
//           phoneNumber,
//           isEmailVerified: emailVerified,
//           isPhoneVerified: phoneVerified
//         } 
//       })
//     }
//   }

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue">
//           <div className="sideNavHeader">
//             <div className="sideMark">
//               <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
//             </div>
//             <div className="sideMeta">
//               <div className="sideTitle">Tradesmap</div>
//             </div>
//           </div>

//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup">
//               <span className="sideItem sideItemDisabled">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon">
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
//             <nav className="sideGroup">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled">
//                 <span className="sideIcon">
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
//           <div className="verifyPage">
//             <div className="authCard authCardCompact verifyCard verifyCardV2">
//               <div className="verifyTitle verifyTitleV2">
//                 Confirm your email and phone number to secure your account.
//               </div>

//               {error && (
//                 <div style={{ color: '#e11d48', fontSize: '13px', marginBottom: '16px', padding: '10px', background: '#ffe5e5', borderRadius: '8px' }}>
//                   {error}
//                 </div>
//               )}

//               {checkingEmail && !emailVerified && (
//                 <div style={{ color: '#0f4ea9', fontSize: '13px', marginBottom: '16px', padding: '10px', background: '#e5f0ff', borderRadius: '8px' }}>
//                   ⏳ Checking email verification status...
//                 </div>
//               )}

//               <div className="verifyRows">
//                 {/* Email Row */}
//                 <div className="verifyRow">
//                   <div className="verifyRowLabel">
//                     Email ID <span className="verifyRequired">*</span>
//                   </div>

//                   <div className="verifyRowMain">
//                     <TextField placeholder="Email" icon={<IconMail />} value={email} readOnly />
                    
//                     <div className="verifyRowActions">
//                       {!emailVerified ? (
//                         <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
//                           <button 
//                             type="button" 
//                             className="verifyEmailBtn" 
//                             onClick={handleSendEmailLink}
//                             disabled={emailLoading || emailSent}
//                           >
//                             {emailLoading ? 'Sending...' : emailSent ? 'Email Sent!' : 'Send Email'}
//                           </button>
//                           {emailSent && !emailVerified && (
//                             <button type="button" className="verifyResendSmall" onClick={handleSendEmailLink}>
//                               Resend
//                             </button>
//                           )}
//                         </div>
//                       ) : (
//                         <span style={{ color: '#2fb463', fontWeight: 600 }}>✓ Verified</span>
//                       )}
//                     </div>
                    
//                     {emailSent && !emailVerified && (
//                       <div style={{ fontSize: '11px', color: 'rgba(23,38,58,0.6)', marginTop: '6px' }}>
//                         📧 Verification link sent to {email}. Check your inbox and click the link to verify.
//                         <br />
//                         <span style={{ color: '#f59e0b' }}>💡 Tip: Check your spam folder if you don't see the email.</span>
//                       </div>
//                     )}
                    
//                     {emailVerified && (
//                       <div style={{ fontSize: '11px', color: '#2fb463', marginTop: '6px' }}>
//                         ✓ Email verified! You can now verify your phone number.
//                       </div>
//                     )}
//                   </div>

//                   <div className="verifyRowRight">
//                     <div className="verifyRowHint">Not your email?</div>
//                     <button type="button" className="verifyChange" onClick={() => navigate('/register')}>Change</button>
//                   </div>
//                 </div>

//                 {/* Phone Row */}
//                 <div className="verifyRow">
//                   <div className="verifyRowLabel">
//                     Phone No. <span className="verifyRequired">*</span>
//                   </div>

//                   <div className="verifyRowMain">
//                     <TextField placeholder="Phone" icon={<IconPhone />} value={phoneNumber} readOnly />
                    
//                     {/* reCAPTCHA container */}
//                     <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
                    
//                     <div className="verifyRowActions">
//                       {!phoneVerified ? (
//                         <>
//                           {!showPhoneOtp ? (
//                             <button 
//                               type="button" 
//                               className="verifyOtpBtn" 
//                               onClick={handleSendPhoneOTP}
//                               disabled={loading || !emailVerified}
//                               style={{ opacity: !emailVerified ? 0.5 : 1 }}
//                             >
//                               {loading ? 'Sending...' : 'Send OTP'}
//                             </button>
//                           ) : (
//                             <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
//                               <input 
//                                 type="text"
//                                 placeholder="OTP"
//                                 value={phoneOtp}
//                                 onChange={(e) => setPhoneOtp(e.target.value)}
//                                 maxLength={6}
//                                 className="verifyOtpInput"
//                               />
//                               <button type="button" className="verifyOtpVerifyBtn" onClick={handleVerifyPhone} disabled={loading}>
//                                 Verify
//                               </button>
//                               <button type="button" className="verifyResendSmall" onClick={handleSendPhoneOTP}>
//                                 Resend
//                               </button>
//                             </div>
//                           )}
//                         </>
//                       ) : (
//                         <span style={{ color: '#2fb463', fontWeight: 600 }}>✓ Verified</span>
//                       )}
//                     </div>
//                     {!emailVerified && !phoneVerified && (
//                       <div style={{ fontSize: '11px', color: '#f59e0b', marginTop: '6px' }}>
//                         Please verify your email first, then verify your phone number.
//                       </div>
//                     )}
//                   </div>

//                   <div className="verifyRowRight">
//                     <div className="verifyRowHint">Not your phone?</div>
//                     <button type="button" className="verifyChange" onClick={() => navigate('/register')}>Change</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Progress & Next Button */}
//               <div style={{ marginTop: '28px', textAlign: 'center' }}>
//                 <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
//                   <div style={{ 
//                     width: emailVerified ? '80px' : '40px', 
//                     height: '4px', 
//                     background: emailVerified ? '#2fb463' : 'rgba(18,38,63,0.1)', 
//                     borderRadius: '4px',
//                     transition: 'all 0.3s ease'
//                   }} />
//                   <div style={{ 
//                     width: phoneVerified ? '80px' : '40px', 
//                     height: '4px', 
//                     background: phoneVerified ? '#2fb463' : 'rgba(18,38,63,0.1)', 
//                     borderRadius: '4px',
//                     transition: 'all 0.3s ease'
//                   }} />
//                 </div>
                
//                 {emailVerified && phoneVerified ? (
//                   <button className="btn btnSuccess" onClick={handleProceed} style={{ minWidth: '200px', padding: '12px 24px' }}>
//                     Continue to Wizard →
//                   </button>
//                 ) : (
//                   <p style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>
//                     {!emailVerified && !phoneVerified && 'Verify your email first, then verify your phone number'}
//                     {emailVerified && !phoneVerified && '✓ Email verified! Please verify your phone number'}
//                     {!emailVerified && phoneVerified && '✓ Phone verified! Please verify your email address'}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <style>{`
//         .verifyEmailBtn,
//         .verifyOtpBtn,
//         .verifyOtpVerifyBtn {
//           background: linear-gradient(180deg, #0f4ea9 0%, #0b3f90 100%);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           padding: 8px 16px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//           white-space: nowrap;
//           transition: all 0.2s ease;
//         }
        
//         .verifyEmailBtn:hover,
//         .verifyOtpBtn:hover,
//         .verifyOtpVerifyBtn:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(15, 78, 169, 0.25);
//         }
        
//         .verifyResendSmall {
//           background: transparent;
//           border: none;
//           color: #0f4ea9;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           padding: 8px 12px;
//         }
        
//         .verifyResendSmall:hover {
//           text-decoration: underline;
//         }
        
//         .verifyOtpInput {
//           width: 100px;
//           padding: 8px 12px;
//           border: 1px solid rgba(18, 38, 63, 0.15);
//           border-radius: 8px;
//           font-size: 14px;
//           text-align: center;
//           font-weight: 600;
//           outline: none;
//         }
        
//         .verifyOtpInput:focus {
//           border-color: #0f4ea9;
//           box-shadow: 0 0 0 2px rgba(15, 78, 169, 0.1);
//         }
        
//         .verifyChange {
//           background: transparent;
//           border: none;
//           color: #0f4ea9;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           margin-top: 6px;
//         }
        
//         .verifyChange:hover {
//           text-decoration: underline;
//         }
        
//         .verifyRowHint {
//           font-size: 11px;
//           color: rgba(23, 38, 58, 0.55);
//           margin-bottom: 2px;
//         }
//       `}</style>
//     </div>
//   )
// }


// // frontend/src/worker/pages/WorkerVerifyPage.jsx
// import { useState, useRef, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'
// import { TextField } from '../../common/components/TextField'
// import { IconMail, IconPhone } from '../../common/components/Icons'
// import { 
//   registerAndSendEmailVerification,
//   setupRecaptcha,
//   sendPhoneOTP,
//   verifyPhoneOTP
// } from '../../services/verificationService'
// import { auth } from '../../firebase/config'

// export function WorkerVerifyPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   // Get data from location state or localStorage
//   const email = location?.state?.email ?? localStorage.getItem('pendingEmail') ?? ''
//   const phoneNumber = location?.state?.phoneNumber ?? localStorage.getItem('pendingPhoneNumber') ?? ''
//   const password = location?.state?.registerPassword ?? localStorage.getItem('pendingPassword') ?? ''
  
//   // Check if coming from email verification redirect
//   const isEmailVerifiedFromRedirect = location?.state?.emailVerified ?? false
  
//   const [emailVerified, setEmailVerified] = useState(isEmailVerifiedFromRedirect)
//   const [phoneVerified, setPhoneVerified] = useState(false)
//   const [emailSent, setEmailSent] = useState(false)
//   const [showPhoneOtp, setShowPhoneOtp] = useState(false)
//   const [phoneOtp, setPhoneOtp] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [emailLoading, setEmailLoading] = useState(false)
//   const [firebaseUser, setFirebaseUser] = useState(null)
//   const [error, setError] = useState('')
  
//   const recaptchaContainerRef = useRef(null)

//   // Send Email Verification Link
//   const handleSendEmailLink = async () => {
//     if (!password) {
//       setError('Password is required')
//       return
//     }
    
//     setEmailLoading(true)
//     setError('')
    
//     try {
//       const result =
//       await registerAndSendEmailVerification(
//         email
//       )
      
//       if (result.success) {
//         setFirebaseUser(result.user)
//         setEmailSent(true)
//         setError('')
//       } else {
//         setError(result.message)
//       }
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setEmailLoading(false)
//     }
//   }

//   // Send Phone OTP
//   const handleSendPhoneOTP = async () => {
//     setLoading(true)
//     setError('')
    
//     try {
//       const recaptchaVerifier = setupRecaptcha('recaptcha-container')
//       const result = await sendPhoneOTP(phoneNumber, recaptchaVerifier)
      
//       if (result.success) {
//         setShowPhoneOtp(true)
//       } else {
//         setError(result.message)
//       }
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Verify Phone OTP
//   const handleVerifyPhone = async () => {
//     if (!phoneOtp || phoneOtp.length !== 6) {
//       setError('Please enter 6-digit OTP')
//       return
//     }
    
//     setLoading(true)
//     setError('')
    
//     try {
//       const result = await verifyPhoneOTP(phoneOtp)
      
//       if (result.success) {
//         setPhoneVerified(true)
//         setShowPhoneOtp(false)
//       } else {
//         setError(result.message)
//       }
//     } catch (err) {
//       setError(err.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Proceed to wizard when both verified
//   const handleProceed = () => {
//     if (emailVerified && phoneVerified) {
//       // Clear localStorage
//       localStorage.removeItem('pendingEmail')
//       localStorage.removeItem('pendingPassword')
//       localStorage.removeItem('pendingPhoneNumber')
//       localStorage.removeItem('pendingFirstName')
//       localStorage.removeItem('pendingLastName')
      
//       navigate('/wizard', { 
//         state: { 
//           email, 
//           phoneNumber,
//           isEmailVerified: emailVerified,
//           isPhoneVerified: phoneVerified
//         } 
//       })
//     }
//   }

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue">
//           <div className="sideNavHeader">
//             <div className="sideMark">
//               <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
//             </div>
//             <div className="sideMeta">
//               <div className="sideTitle">Tradesmap</div>
//             </div>
//           </div>

//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup">
//               <span className="sideItem sideItemDisabled">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon">
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
//             <nav className="sideGroup">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled">
//                 <span className="sideIcon">
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
//           <div className="verifyPage">
//             <div className="authCard authCardCompact verifyCard verifyCardV2">
//               <div className="verifyTitle verifyTitleV2">
//                 Confirm your email and phone number to secure your account.
//               </div>

//               {error && (
//                 <div style={{ color: '#e11d48', fontSize: '13px', marginBottom: '16px', padding: '10px', background: '#ffe5e5', borderRadius: '8px' }}>
//                   {error}
//                 </div>
//               )}

//               <div className="verifyRows">
//                 {/* Email Row */}
//                 <div className="verifyRow">
//                   <div className="verifyRowLabel">
//                     Email ID <span className="verifyRequired">*</span>
//                   </div>

//                   <div className="verifyRowMain">
//                     <TextField placeholder="Email" icon={<IconMail />} value={email} readOnly />
                    
//                     <div className="verifyRowActions">
//                       {!emailVerified ? (
//                         <button 
//                           type="button" 
//                           className="verifyEmailBtn" 
//                           onClick={handleSendEmailLink}
//                           disabled={emailLoading}
//                         >
//                           {emailLoading ? 'Sending...' : 'Send Verification Email'}
//                         </button>
//                       ) : (
//                         <span style={{ color: '#2fb463', fontWeight: 600 }}>✓ Verified</span>
//                       )}
//                     </div>
                    
//                     {emailSent && !emailVerified && (
//                       <div style={{ fontSize: '11px', color: 'rgba(23,38,58,0.6)', marginTop: '6px' }}>
//                         📧 Verification link sent to {email}. 
//                         <br />
//                         <span style={{ color: '#f59e0b' }}>💡 Click the link in your email to verify. Check spam folder if not found.</span>
//                       </div>
//                     )}
                    
//                     {emailVerified && (
//                       <div style={{ fontSize: '11px', color: '#2fb463', marginTop: '6px' }}>
//                         ✓ Email verified! You can now verify your phone number.
//                       </div>
//                     )}
//                   </div>

//                   <div className="verifyRowRight">
//                     <div className="verifyRowHint">Not your email?</div>
//                     <button type="button" className="verifyChange" onClick={() => navigate('/register')}>Change</button>
//                   </div>
//                 </div>

//                 {/* Phone Row - Only enabled after email verified */}
//                 <div className="verifyRow">
//                   <div className="verifyRowLabel">
//                     Phone No. <span className="verifyRequired">*</span>
//                   </div>

//                   <div className="verifyRowMain">
//                     <TextField placeholder="Phone" icon={<IconPhone />} value={phoneNumber} readOnly />
                    
//                     {/* reCAPTCHA container */}
//                     <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
                    
//                     <div className="verifyRowActions">
//                       {!emailVerified ? (
//                         <button 
//                           type="button" 
//                           className="verifyOtpBtnDisabled" 
//                           disabled={true}
//                           style={{ opacity: 0.5, cursor: 'not-allowed' }}
//                         >
//                           Verify email first
//                         </button>
//                       ) : !phoneVerified ? (
//                         <>
//                           {!showPhoneOtp ? (
//                             <button 
//                               type="button" 
//                               className="verifyOtpBtn" 
//                               onClick={handleSendPhoneOTP}
//                               disabled={loading}
//                             >
//                               {loading ? 'Sending...' : 'Send OTP'}
//                             </button>
//                           ) : (
//                             <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
//                               <input 
//                                 type="text"
//                                 placeholder="OTP"
//                                 value={phoneOtp}
//                                 onChange={(e) => setPhoneOtp(e.target.value)}
//                                 maxLength={6}
//                                 className="verifyOtpInput"
//                               />
//                               <button type="button" className="verifyOtpVerifyBtn" onClick={handleVerifyPhone} disabled={loading}>
//                                 Verify
//                               </button>
//                               <button type="button" className="verifyResendSmall" onClick={handleSendPhoneOTP}>
//                                 Resend
//                               </button>
//                             </div>
//                           )}
//                         </>
//                       ) : (
//                         <span style={{ color: '#2fb463', fontWeight: 600 }}>✓ Verified</span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="verifyRowRight">
//                     <div className="verifyRowHint">Not your phone?</div>
//                     <button type="button" className="verifyChange" onClick={() => navigate('/register')}>Change</button>
//                   </div>
//                 </div>
//               </div>

//               {/* Progress & Next Button */}
//               <div style={{ marginTop: '28px', textAlign: 'center' }}>
//                 <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
//                   <div style={{ 
//                     width: emailVerified ? '80px' : '40px', 
//                     height: '4px', 
//                     background: emailVerified ? '#2fb463' : 'rgba(18,38,63,0.1)', 
//                     borderRadius: '4px'
//                   }} />
//                   <div style={{ 
//                     width: phoneVerified ? '80px' : '40px', 
//                     height: '4px', 
//                     background: phoneVerified ? '#2fb463' : 'rgba(18,38,63,0.1)', 
//                     borderRadius: '4px'
//                   }} />
//                 </div>
                
//                 {emailVerified && phoneVerified ? (
//                   <button className="btn btnSuccess" onClick={handleProceed} style={{ minWidth: '200px', padding: '12px 24px' }}>
//                     Continue to Wizard →
//                   </button>
//                 ) : (
//                   <p style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>
//                     {!emailVerified && 'Please verify your email first'}
//                     {emailVerified && !phoneVerified && '✓ Email verified! Please verify your phone number'}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>

//       <style>{`
//         .verifyEmailBtn,
//         .verifyOtpBtn,
//         .verifyOtpVerifyBtn {
//           background: linear-gradient(180deg, #0f4ea9 0%, #0b3f90 100%);
//           color: white;
//           border: none;
//           border-radius: 8px;
//           padding: 8px 20px;
//           font-size: 13px;
//           font-weight: 600;
//           cursor: pointer;
//         }
        
//         .verifyOtpBtnDisabled {
//           background: #ccc;
//           color: #666;
//           border: none;
//           border-radius: 8px;
//           padding: 8px 20px;
//           font-size: 13px;
//           font-weight: 600;
//         }
        
//         .verifyEmailBtn:hover,
//         .verifyOtpBtn:hover,
//         .verifyOtpVerifyBtn:hover {
//           transform: translateY(-1px);
//           box-shadow: 0 4px 12px rgba(15, 78, 169, 0.25);
//         }
        
//         .verifyResendSmall {
//           background: transparent;
//           border: none;
//           color: #0f4ea9;
//           font-size: 12px;
//           font-weight: 600;
//           cursor: pointer;
//           padding: 8px 12px;
//         }
        
//         .verifyResendSmall:hover {
//           text-decoration: underline;
//         }
        
//         .verifyOtpInput {
//           width: 100px;
//           padding: 8px 12px;
//           border: 1px solid rgba(18, 38, 63, 0.15);
//           border-radius: 8px;
//           font-size: 14px;
//           text-align: center;
//           outline: none;
//         }
        
//         .verifyOtpInput:focus {
//           border-color: #0f4ea9;
//           box-shadow: 0 0 0 2px rgba(15, 78, 169, 0.1);
//         }
        
//         .verifyChange {
//           background: transparent;
//           border: none;
//           color: #0f4ea9;
//           font-size: 12px;
//           cursor: pointer;
//           margin-top: 6px;
//         }
        
//         .verifyChange:hover {
//           text-decoration: underline;
//         }
        
//         .verifyRowHint {
//           font-size: 11px;
//           color: rgba(23, 38, 58, 0.55);
//           margin-bottom: 2px;
//         }
//       `}</style>
//     </div>
//   )
// }




// frontend/src/worker/pages/WorkerVerifyPage.jsx
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import { IconMail, IconPhone } from '../../common/components/Icons'
import { 
  registerAndSendEmailVerification,
  setupRecaptcha,
  sendPhoneOTP,
  verifyPhoneOTP
} from '../../services/verificationService'
import { auth } from '../../firebase/config'

export function WorkerVerifyPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get data from location state or localStorage
  const email = location?.state?.email ?? localStorage.getItem('pendingEmail') ?? ''
  const phoneNumber = location?.state?.phoneNumber ?? localStorage.getItem('pendingPhoneNumber') ?? ''
  const password = location?.state?.registerPassword ?? localStorage.getItem('pendingPassword') ?? ''
  
  // Check if coming from email verification redirect
  const isEmailVerifiedFromRedirect = location?.state?.emailVerified ?? false
  
  const [emailVerified, setEmailVerified] = useState(isEmailVerifiedFromRedirect)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [showPhoneOtp, setShowPhoneOtp] = useState(false)
  const [phoneOtp, setPhoneOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [firebaseUser, setFirebaseUser] = useState(null)
  const [error, setError] = useState('')
  
  const recaptchaContainerRef = useRef(null)

  // Send Email Verification Link
  const handleSendEmailLink = async () => {
    if (!password) {
      setError('Password is required')
      return
    }
    
    setEmailLoading(true)
    setError('')
    
    try {
      const result = await registerAndSendEmailVerification(email)
      
      if (result.success) {
        setFirebaseUser(result.user)
        setEmailSent(true)
        setError('')
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setEmailLoading(false)
    }
  }

  // Send Phone OTP
  const handleSendPhoneOTP = async () => {
    setLoading(true)
    setError('')
    
    try {
      const recaptchaVerifier = setupRecaptcha('recaptcha-container')
      const result = await sendPhoneOTP(phoneNumber, recaptchaVerifier)
      
      if (result.success) {
        setShowPhoneOtp(true)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Verify Phone OTP
  const handleVerifyPhone = async () => {
    if (!phoneOtp || phoneOtp.length !== 6) {
      setError('Please enter 6-digit OTP')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const result = await verifyPhoneOTP(phoneOtp)
      
      if (result.success) {
        setPhoneVerified(true)
        setShowPhoneOtp(false)
      } else {
        setError(result.message)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // ✅ FIXED: Proceed to wizard without clearing localStorage
  const handleProceed = () => {
    if (emailVerified && phoneVerified) {
      // ✅ DO NOT clear localStorage here
      // The wizard will handle clearing it after loading the data
      
      navigate('/wizard', { 
        state: { 
          email, 
          phoneNumber,
          isEmailVerified: emailVerified,
          isPhoneVerified: phoneVerified
        } 
      })
    }
  }

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue">
          <div className="sideNavHeader">
            <div className="sideMark">
              <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
            </div>
            <div className="sideMeta">
              <div className="sideTitle">Tradesmap</div>
            </div>
          </div>

          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup">
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge">12</span>
              </span>
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon">
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
            <nav className="sideGroup">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
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
          <div className="verifyPage">
            <div className="authCard authCardCompact verifyCard verifyCardV2">
              <div className="verifyTitle verifyTitleV2">
                Confirm your email and phone number to secure your account.
              </div>

              {error && (
                <div style={{ color: '#e11d48', fontSize: '13px', marginBottom: '16px', padding: '10px', background: '#ffe5e5', borderRadius: '8px' }}>
                  {error}
                </div>
              )}

              <div className="verifyRows">
                {/* Email Row */}
                <div className="verifyRow">
                  <div className="verifyRowLabel">
                    Email ID <span className="verifyRequired">*</span>
                  </div>

                  <div className="verifyRowMain">
                    <TextField placeholder="Email" icon={<IconMail />} value={email} readOnly />
                    
                    <div className="verifyRowActions">
                      {!emailVerified ? (
                        <button 
                          type="button" 
                          className="verifyEmailBtn" 
                          onClick={handleSendEmailLink}
                          disabled={emailLoading}
                        >
                          {emailLoading ? 'Sending...' : 'Send Verification Email'}
                        </button>
                      ) : (
                        <span style={{ color: '#2fb463', fontWeight: 600 }}>✓ Verified</span>
                      )}
                    </div>
                    
                    {emailSent && !emailVerified && (
                      <div style={{ fontSize: '11px', color: 'rgba(23,38,58,0.6)', marginTop: '6px' }}>
                        📧 Verification link sent to {email}. 
                        <br />
                        <span style={{ color: '#f59e0b' }}>💡 Click the link in your email to verify. Check spam folder if not found.</span>
                      </div>
                    )}
                    
                    {emailVerified && (
                      <div style={{ fontSize: '11px', color: '#2fb463', marginTop: '6px' }}>
                        ✓ Email verified! You can now verify your phone number.
                      </div>
                    )}
                  </div>

                  <div className="verifyRowRight">
                    <div className="verifyRowHint">Not your email?</div>
                    <button type="button" className="verifyChange" onClick={() => navigate('/register')}>Change</button>
                  </div>
                </div>

                {/* Phone Row - Only enabled after email verified */}
                <div className="verifyRow">
                  <div className="verifyRowLabel">
                    Phone No. <span className="verifyRequired">*</span>
                  </div>

                  <div className="verifyRowMain">
                    <TextField placeholder="Phone" icon={<IconPhone />} value={phoneNumber} readOnly />
                    
                    {/* reCAPTCHA container */}
                    <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
                    
                    <div className="verifyRowActions">
                      {!emailVerified ? (
                        <button 
                          type="button" 
                          className="verifyOtpBtnDisabled" 
                          disabled={true}
                          style={{ opacity: 0.5, cursor: 'not-allowed' }}
                        >
                          Verify email first
                        </button>
                      ) : !phoneVerified ? (
                        <>
                          {!showPhoneOtp ? (
                            <button 
                              type="button" 
                              className="verifyOtpBtn" 
                              onClick={handleSendPhoneOTP}
                              disabled={loading}
                            >
                              {loading ? 'Sending...' : 'Send OTP'}
                            </button>
                          ) : (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                              <input 
                                type="text"
                                placeholder="OTP"
                                value={phoneOtp}
                                onChange={(e) => setPhoneOtp(e.target.value)}
                                maxLength={6}
                                className="verifyOtpInput"
                              />
                              <button type="button" className="verifyOtpVerifyBtn" onClick={handleVerifyPhone} disabled={loading}>
                                Verify
                              </button>
                              <button type="button" className="verifyResendSmall" onClick={handleSendPhoneOTP}>
                                Resend
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <span style={{ color: '#2fb463', fontWeight: 600 }}>✓ Verified</span>
                      )}
                    </div>
                  </div>

                  <div className="verifyRowRight">
                    <div className="verifyRowHint">Not your phone?</div>
                    <button type="button" className="verifyChange" onClick={() => navigate('/register')}>Change</button>
                  </div>
                </div>
              </div>

              {/* Progress & Next Button */}
              <div style={{ marginTop: '28px', textAlign: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <div style={{ 
                    width: emailVerified ? '80px' : '40px', 
                    height: '4px', 
                    background: emailVerified ? '#2fb463' : 'rgba(18,38,63,0.1)', 
                    borderRadius: '4px'
                  }} />
                  <div style={{ 
                    width: phoneVerified ? '80px' : '40px', 
                    height: '4px', 
                    background: phoneVerified ? '#2fb463' : 'rgba(18,38,63,0.1)', 
                    borderRadius: '4px'
                  }} />
                </div>
                
                {emailVerified && phoneVerified ? (
                  <button className="btn btnSuccess" onClick={handleProceed} style={{ minWidth: '200px', padding: '12px 24px' }}>
                    Continue to Wizard →
                  </button>
                ) : (
                  <p style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>
                    {!emailVerified && 'Please verify your email first'}
                    {emailVerified && !phoneVerified && '✓ Email verified! Please verify your phone number'}
                  </p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <style>{`
        .verifyEmailBtn,
        .verifyOtpBtn,
        .verifyOtpVerifyBtn {
          background: linear-gradient(180deg, #0f4ea9 0%, #0b3f90 100%);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }
        
        .verifyOtpBtnDisabled {
          background: #ccc;
          color: #666;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
        }
        
        .verifyEmailBtn:hover,
        .verifyOtpBtn:hover,
        .verifyOtpVerifyBtn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(15, 78, 169, 0.25);
        }
        
        .verifyResendSmall {
          background: transparent;
          border: none;
          color: #0f4ea9;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 12px;
        }
        
        .verifyResendSmall:hover {
          text-decoration: underline;
        }
        
        .verifyOtpInput {
          width: 100px;
          padding: 8px 12px;
          border: 1px solid rgba(18, 38, 63, 0.15);
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
          outline: none;
        }
        
        .verifyOtpInput:focus {
          border-color: #0f4ea9;
          box-shadow: 0 0 0 2px rgba(15, 78, 169, 0.1);
        }
        
        .verifyChange {
          background: transparent;
          border: none;
          color: #0f4ea9;
          font-size: 12px;
          cursor: pointer;
          margin-top: 6px;
        }
        
        .verifyChange:hover {
          text-decoration: underline;
        }
        
        .verifyRowHint {
          font-size: 11px;
          color: rgba(23, 38, 58, 0.55);
          margin-bottom: 2px;
        }
      `}</style>
    </div>
  )
}