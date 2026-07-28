
// src/worker/pages/WorkerVerifyPage.jsx
import { useState, useRef, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import { IconMail, IconPhone } from '../../common/components/Icons'
import { 
  sendEmailVerificationCode,
  verifyEmailWithCode,
  checkEmailVerification,
  setupRecaptcha,
  sendPhoneOTP,
  verifyPhoneOTP
} from '../../services/verificationService'

export function WorkerVerifyPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // ✅ Get data from location state or localStorage
  const email = location?.state?.email ?? localStorage.getItem('pendingEmail') ?? ''
  const phoneNumber = location?.state?.phoneNumber ?? localStorage.getItem('pendingPhoneNumber') ?? ''
  const password = location?.state?.registerPassword ?? localStorage.getItem('pendingPassword') ?? ''
  const firstName = location?.state?.firstName ?? localStorage.getItem('pendingFirstName') ?? ''
  const lastName = location?.state?.lastName ?? localStorage.getItem('pendingLastName') ?? ''
  const dob = location?.state?.dob ?? localStorage.getItem('pendingDob') ?? ''
  const language = location?.state?.language ?? localStorage.getItem('pendingLanguage') ?? ''
  
  const [emailVerified, setEmailVerified] = useState(false)
  const [phoneVerified, setPhoneVerified] = useState(false)
  const [emailCodeSent, setEmailCodeSent] = useState(false)
  const [emailCode, setEmailCode] = useState('')
  const [showEmailOtp, setShowEmailOtp] = useState(false)
  const [showPhoneOtp, setShowPhoneOtp] = useState(false)
  const [phoneOtp, setPhoneOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailLoading, setEmailLoading] = useState(false)
  const [error, setError] = useState('')
  const [resendCooldown, setResendCooldown] = useState(0)
  const [isVerifying, setIsVerifying] = useState(false)
  
  const recaptchaContainerRef = useRef(null)
  const cooldownIntervalRef = useRef(null)
  
  // ✅ CRITICAL: Use refs to prevent double calls
  const isSendingRef = useRef(false)
  const isVerifyingRef = useRef(false)
  const lastRequestTimeRef = useRef(0)

  // ✅ Cleanup cooldown on unmount
  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current)
      }
    }
  }, [])

  // ✅ Send Email Verification Code - WITH COMPLETE DOUBLE-CALL PROTECTION
  const handleSendEmailCode = useCallback(async () => {
    // ✅ Prevent double calls with multiple checks
    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTimeRef.current
    
    // If less than 1 second since last request, block it
    if (timeSinceLastRequest < 1000) {
      console.log('⏳ Request too soon, blocking duplicate...')
      return
    }
    
    if (isSendingRef.current || emailLoading) {
      console.log('⏳ Already sending, blocking duplicate...')
      return
    }
    
    if (!email) {
      setError('Email is required')
      return
    }
    
    // Set flags
    isSendingRef.current = true
    lastRequestTimeRef.current = now
    setEmailLoading(true)
    setError('')
    setEmailCode('')
    
    try {
      console.log('📧 Sending verification code to:', email)
      const result = await sendEmailVerificationCode(email)
      
      if (result.success) {
        setEmailCodeSent(true)
        setShowEmailOtp(true)
        setError('')
        setResendCooldown(60)
        
        // Start cooldown timer
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
        
        console.log('✅ Verification code sent to:', email)
      } else {
        setError(result.message || 'Failed to send verification code')
      }
    } catch (err) {
      console.error('❌ Send code error:', err)
      setError(err.message || 'An error occurred while sending verification code')
    } finally {
      setEmailLoading(false)
      // ✅ Release the lock after delay
      setTimeout(() => {
        isSendingRef.current = false
      }, 500)
    }
  }, [email, emailLoading])

  // ✅ Verify Email Code - WITH COMPLETE DOUBLE-CALL PROTECTION
  const handleVerifyEmailCode = useCallback(async () => {
    // ✅ Prevent double calls
    const now = Date.now()
    const timeSinceLastRequest = now - lastRequestTimeRef.current
    
    if (timeSinceLastRequest < 1000) {
      console.log('⏳ Request too soon, blocking duplicate...')
      return
    }
    
    if (isVerifyingRef.current || isVerifying) {
      console.log('⏳ Already verifying, blocking duplicate...')
      return
    }
    
    if (!emailCode || emailCode.length !== 6) {
      setError('Please enter 6-digit verification code')
      return
    }
    
    // Set flags
    isVerifyingRef.current = true
    lastRequestTimeRef.current = now
    setIsVerifying(true)
    setLoading(true)
    setError('')
    
    try {
      console.log('🔐 Verifying code for:', email)
      const result = await verifyEmailWithCode(email, emailCode)
      
      if (result.success) {
        setEmailVerified(true)
        setShowEmailOtp(false)
        setError('')
        console.log('✅ Email verified successfully!')
      } else {
        setError(result.message || 'Invalid code. Please try again.')
      }
    } catch (err) {
      console.error('❌ Verify code error:', err)
      setError(err.message || 'An error occurred while verifying code')
    } finally {
      setLoading(false)
      setIsVerifying(false)
      // ✅ Release the lock after delay
      setTimeout(() => {
        isVerifyingRef.current = false
      }, 500)
    }
  }, [email, emailCode, isVerifying])

  // ✅ Send Phone OTP
  const handleSendPhoneOTP = useCallback(async () => {
    if (!emailVerified) {
      setError('Please verify your email first')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      const recaptchaVerifier = setupRecaptcha('recaptcha-container')
      const result = await sendPhoneOTP(phoneNumber, recaptchaVerifier)
      
      if (result.success) {
        setShowPhoneOtp(true)
        setError('')
      } else {
        setError(result.message || 'Failed to send OTP')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while sending OTP')
    } finally {
      setLoading(false)
    }
  }, [emailVerified, phoneNumber])

  // ✅ Verify Phone OTP
  const handleVerifyPhone = useCallback(async () => {
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
        setError('')
      } else {
        setError(result.message || 'Invalid OTP. Please try again.')
      }
    } catch (err) {
      setError(err.message || 'An error occurred while verifying OTP')
    } finally {
      setLoading(false)
    }
  }, [phoneOtp])

  // ✅ Resend Email Code
  const handleResendEmailCode = useCallback(async () => {
    if (resendCooldown > 0) return
    if (isSendingRef.current) return
    await handleSendEmailCode()
  }, [resendCooldown, handleSendEmailCode])

  // ✅ Proceed to wizard
  const handleProceed = useCallback(() => {
    if (emailVerified && phoneVerified) {
      console.log('📋 Proceeding to wizard with data:', { 
        firstName, lastName, email, phoneNumber, dob, language 
      })
      
      const generateSessionToken = () => {
        return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }
      
      const authToken = localStorage.getItem('authToken') || generateSessionToken()
      localStorage.setItem('authToken', authToken)
      
      navigate('/wizard', { 
        state: { 
          email, 
          phoneNumber,
          firstName,
          lastName,
          dob,
          language,
          password,
          authToken,
          fromVerification: true,
          emailVerified: true,
          phoneVerified: true
        },
        replace: true
      })
    }
  }, [emailVerified, phoneVerified, email, phoneNumber, firstName, lastName, dob, language, password, navigate])

  // ✅ Handle Enter key for email code input
  const handleEmailCodeKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && emailCode.length === 6) {
      e.preventDefault()
      handleVerifyEmailCode()
    }
  }, [emailCode, handleVerifyEmailCode])

  // ✅ Handle Enter key for phone OTP input
  const handlePhoneOtpKeyPress = useCallback((e) => {
    if (e.key === 'Enter' && phoneOtp.length === 6) {
      e.preventDefault()
      handleVerifyPhone()
    }
  }, [phoneOtp, handleVerifyPhone])

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
          <div className="verifyPage">
            <div className="authCard authCardCompact verifyCard verifyCardV2">
              <div className="verifyTitle verifyTitleV2">
                Confirm your email and phone number to secure your account.
              </div>

              {error && (
                <div style={{ 
                  color: '#dc2626', 
                  fontSize: '13px', 
                  marginBottom: '16px', 
                  padding: '12px 16px', 
                  background: '#fee2e2', 
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>❌</span> {error}
                </div>
              )}

              <div className="verifyRows">
                {/* ✅ Email Row - Code Verification */}
                <div className="verifyRow">
                  <div className="verifyRowLabel">
                    Email ID <span className="verifyRequired">*</span>
                  </div>

                  <div className="verifyRowMain">
                    <TextField 
                      placeholder="Email" 
                      icon={<IconMail />} 
                      value={email} 
                      readOnly 
                    />
                    
                    <div className="verifyRowActions">
                      {!emailVerified ? (
                        <>
                          {!showEmailOtp ? (
                            <button 
                              type="button" 
                              className="verifyEmailBtn" 
                              onClick={handleSendEmailCode}
                              disabled={emailLoading || resendCooldown > 0 || isSendingRef.current}
                            >
                              {emailLoading ? 'Sending...' : 'Send Verification Code'}
                            </button>
                          ) : (
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                              <input 
                                type="text"
                                placeholder="6-digit code"
                                value={emailCode}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '')
                                  if (value.length <= 6) {
                                    setEmailCode(value)
                                  }
                                }}
                                onKeyDown={handleEmailCodeKeyPress}
                                maxLength={6}
                                className="verifyOtpInput"
                                autoFocus
                                disabled={isVerifying || isVerifyingRef.current}
                              />
                              <button 
                                type="button" 
                                className="verifyOtpVerifyBtn" 
                                onClick={handleVerifyEmailCode} 
                                disabled={loading || emailCode.length !== 6 || isVerifying || isVerifyingRef.current}
                              >
                                {isVerifying ? 'Verifying...' : 'Verify'}
                              </button>
                              <button 
                                type="button" 
                                className="verifyResendSmall" 
                                onClick={handleResendEmailCode}
                                disabled={resendCooldown > 0 || emailLoading || isVerifying || isVerifyingRef.current || isSendingRef.current}
                              >
                                {resendCooldown > 0 ? `${resendCooldown}s` : 'Resend'}
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <span style={{ color: '#2fb463', fontWeight: 600 }}>✓ Verified</span>
                      )}
                    </div>
                    
                    {emailCodeSent && !emailVerified && showEmailOtp && (
                      <div style={{ fontSize: '11px', color: 'rgba(23,38,58,0.6)', marginTop: '6px' }}>
                        📧 Verification code sent to {email}. 
                        <br />
                        <span style={{ color: '#f59e0b' }}>
                          💡 Check your email for the 6-digit code. Check spam folder if not found.
                        </span>
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
                    <button type="button" className="verifyChange" onClick={() => navigate('/register')}>
                      Change
                    </button>
                  </div>
                </div>

                {/* ✅ Phone Row - OTP Verification */}
                <div className="verifyRow">
                  <div className="verifyRowLabel">
                    Phone No. <span className="verifyRequired">*</span>
                  </div>

                  <div className="verifyRowMain">
                    <TextField 
                      placeholder="Phone" 
                      icon={<IconPhone />} 
                      value={phoneNumber} 
                      readOnly 
                    />
                    
                    {/* reCAPTCHA container */}
                    <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
                    
                    <div className="verifyRowActions">
                      {!emailVerified ? (
                        <button 
                          type="button" 
                          className="verifyOtpBtnDisabled" 
                          disabled={true}
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
                                onChange={(e) => {
                                  const value = e.target.value.replace(/\D/g, '')
                                  if (value.length <= 6) {
                                    setPhoneOtp(value)
                                  }
                                }}
                                onKeyDown={handlePhoneOtpKeyPress}
                                maxLength={6}
                                className="verifyOtpInput"
                              />
                              <button 
                                type="button" 
                                className="verifyOtpVerifyBtn" 
                                onClick={handleVerifyPhone} 
                                disabled={loading || phoneOtp.length !== 6}
                              >
                                {loading ? 'Verifying...' : 'Verify'}
                              </button>
                              <button 
                                type="button" 
                                className="verifyResendSmall" 
                                onClick={handleSendPhoneOTP}
                                disabled={loading}
                              >
                                Resend
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <span style={{ color: '#2fb463', fontWeight: 600 }}>✓ Verified</span>
                      )}
                    </div>
                    
                    {showPhoneOtp && !phoneVerified && (
                      <div style={{ fontSize: '11px', color: 'rgba(23,38,58,0.6)', marginTop: '6px' }}>
                        📱 Enter the 6-digit code sent to {phoneNumber}
                      </div>
                    )}
                  </div>

                  <div className="verifyRowRight">
                    <div className="verifyRowHint">Not your phone?</div>
                    <button type="button" className="verifyChange" onClick={() => navigate('/register')}>
                      Change
                    </button>
                  </div>
                </div>
              </div>

              {/* ✅ Progress & Next Button */}
              <div style={{ marginTop: '28px', textAlign: 'center' }}>
                <div style={{ 
                  display: 'flex', 
                  gap: '8px', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  marginBottom: '20px' 
                }}>
                  <div style={{ 
                    width: emailVerified ? '80px' : '40px', 
                    height: '4px', 
                    background: emailVerified ? '#2fb463' : 'rgba(18,38,63,0.1)', 
                    borderRadius: '4px',
                    transition: 'all 0.3s ease'
                  }} />
                  <span style={{ fontSize: '12px', color: emailVerified ? '#2fb463' : 'rgba(18,38,63,0.3)', fontWeight: 600 }}>
                    {emailVerified ? '✓' : '1'}
                  </span>
                  <div style={{ 
                    width: phoneVerified ? '80px' : '40px', 
                    height: '4px', 
                    background: phoneVerified ? '#2fb463' : 'rgba(18,38,63,0.1)', 
                    borderRadius: '4px',
                    transition: 'all 0.3s ease'
                  }} />
                  <span style={{ fontSize: '12px', color: phoneVerified ? '#2fb463' : 'rgba(18,38,63,0.3)', fontWeight: 600 }}>
                    {phoneVerified ? '✓' : '2'}
                  </span>
                </div>
                
                {emailVerified && phoneVerified ? (
                  <button 
                    className="btn btnSuccess" 
                    onClick={handleProceed} 
                    style={{ 
                      minWidth: '200px', 
                      padding: '12px 24px',
                      fontSize: '16px',
                      fontWeight: 600
                    }}
                  >
                    Continue to Wizard →
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
                    <p style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>
                      {!emailVerified && '📧 Please verify your email first'}
                      {emailVerified && !phoneVerified && '📱 Email verified! Please verify your phone number'}
                    </p>
                  </div>
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
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        
        .verifyOtpBtnDisabled {
          background: #e5e7eb;
          color: #9ca3af;
          border: none;
          border-radius: 8px;
          padding: 8px 20px;
          font-size: 13px;
          font-weight: 600;
          white-space: nowrap;
        }
        
        .verifyEmailBtn:hover,
        .verifyOtpBtn:hover,
        .verifyOtpVerifyBtn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(15, 78, 169, 0.25);
        }
        
        .verifyEmailBtn:disabled,
        .verifyOtpBtn:disabled,
        .verifyOtpVerifyBtn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .verifyResendSmall {
          background: transparent;
          border: none;
          color: #0f4ea9;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 8px 12px;
          transition: color 0.2s ease;
        }
        
        .verifyResendSmall:hover {
          text-decoration: underline;
          color: #0b3f90;
        }
        
        .verifyResendSmall:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        
        .verifyOtpInput {
          width: 120px;
          padding: 8px 12px;
          border: 1px solid rgba(18, 38, 63, 0.15);
          border-radius: 8px;
          font-size: 14px;
          text-align: center;
          outline: none;
          transition: all 0.2s ease;
          font-weight: 600;
          letter-spacing: 2px;
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
          transition: color 0.2s ease;
        }
        
        .verifyChange:hover {
          text-decoration: underline;
          color: #0b3f90;
        }
        
        .verifyRowHint {
          font-size: 11px;
          color: rgba(23, 38, 58, 0.55);
          margin-bottom: 2px;
        }
        
        .verifyRow {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(18, 38, 63, 0.06);
        }
        
        .verifyRow:last-child {
          border-bottom: none;
        }
        
        .verifyRowLabel {
          min-width: 100px;
          font-size: 14px;
          font-weight: 500;
          color: #17263a;
          padding-top: 10px;
        }
        
        .verifyRequired {
          color: #dc2626;
        }
        
        .verifyRowMain {
          flex: 1;
        }
        
        .verifyRowActions {
          margin-top: 8px;
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
        }
        
        .verifyRowRight {
          min-width: 80px;
          text-align: right;
          padding-top: 10px;
        }
        
        .verifyTitle {
          font-size: 16px;
          font-weight: 500;
          color: #17263a;
          margin-bottom: 20px;
        }
        
        .verifyCard {
          padding: 24px !important;
        }
        
        .btnSuccess {
          background: #2fb463;
          color: white;
          border: none;
          border-radius: 10px;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        
        .btnSuccess:hover {
          background: #259a52;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(47, 180, 99, 0.3);
        }
        
        @media (max-width: 768px) {
          .verifyRow {
            flex-direction: column;
            gap: 8px;
          }
          
          .verifyRowLabel {
            min-width: auto;
            padding-top: 0;
          }
          
          .verifyRowRight {
            text-align: left;
            padding-top: 4px;
          }
          
          .verifyRowActions {
            flex-direction: column;
            align-items: stretch;
          }
          
          .verifyOtpInput {
            width: 100%;
          }
        }
      `}</style>
    </div>
  )
}

export default WorkerVerifyPage