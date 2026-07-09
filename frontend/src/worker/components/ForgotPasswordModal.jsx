// // src/worker/components/ForgotPasswordModal.jsx
// import { useState } from 'react'
// import { IconMail } from '../../common/components/Icons'
// import authService from '../../services/authService'

// export function ForgotPasswordModal({ isOpen, onClose, onSuccess }) {
//   const [email, setEmail] = useState('')
//   const [status, setStatus] = useState('idle') // idle | loading | success | error
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')

//   if (!isOpen) return null

//   const handleSubmit = async (e) => {
//     e.preventDefault()
    
//     if (!email) {
//       setError('Please enter your email address')
//       return
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(email)) {
//       setError('Please enter a valid email address')
//       return
//     }

//     setStatus('loading')
//     setError('')
//     setMessage('')

//     try {
//       const result = await authService.forgotPassword(email)
      
//       if (result.success) {
//         setStatus('success')
//         setMessage('A password recovery link has been sent to your email.')
//         setTimeout(() => {
//           onSuccess && onSuccess()
//         }, 2000)
//       }
//     } catch (error) {
//       setStatus('error')
//       setError(error.message || 'Failed to send recovery email. Please try again.')
//     }
//   }

//   return (
//     <>
//       <style>
//         {`
//           .modal-overlay {
//             position: fixed;
//             top: 0;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: rgba(0, 0, 0, 0.5);
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             z-index: 10000;
//             animation: fadeIn 0.2s ease;
//           }

//           .modal-content {
//             background: white;
//             border-radius: 16px;
//             padding: 32px 40px;
//             max-width: 440px;
//             width: 90%;
//             box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
//             animation: slideUp 0.3s ease;
//           }

//           @keyframes fadeIn {
//             from { opacity: 0; }
//             to { opacity: 1; }
//           }

//           @keyframes slideUp {
//             from { transform: translateY(20px); opacity: 0; }
//             to { transform: translateY(0); opacity: 1; }
//           }

//           .modal-title {
//             font-size: 20px;
//             font-weight: 700;
//             color: #17263a;
//             margin-bottom: 8px;
//             text-align: center;
//           }

//           .modal-subtitle {
//             font-size: 14px;
//             color: rgba(23, 38, 58, 0.6);
//             text-align: center;
//             margin-bottom: 24px;
//           }

//           .modal-form {
//             display: flex;
//             flex-direction: column;
//             gap: 16px;
//           }

//           .modal-input-wrapper {
//             position: relative;
//             display: flex;
//             align-items: center;
//             border: 1px solid rgba(18, 38, 63, 0.12);
//             border-radius: 10px;
//             background: white;
//             transition: all 0.2s ease;
//             height: 48px;
//           }

//           .modal-input-wrapper:focus-within {
//             border-color: #0f4ea9;
//             box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//           }

//           .modal-input-wrapper .icon {
//             padding: 0 12px;
//             color: rgba(23, 38, 58, 0.4);
//             display: flex;
//             align-items: center;
//           }

//           .modal-input-wrapper .icon svg {
//             width: 18px;
//             height: 18px;
//           }

//           .modal-input-wrapper input {
//             flex: 1;
//             border: none;
//             outline: none;
//             padding: 0 12px 0 0;
//             font-size: 14px;
//             color: #17263a;
//             background: transparent;
//             height: 100%;
//             font-family: inherit;
//           }

//           .modal-input-wrapper input::placeholder {
//             color: rgba(23, 38, 58, 0.4);
//           }

//           .modal-button {
//             width: 100%;
//             padding: 12px;
//             border: none;
//             border-radius: 10px;
//             font-size: 15px;
//             font-weight: 600;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             background: #0f4ea9;
//             color: white;
//             height: 48px;
//           }

//           .modal-button:hover:not(:disabled) {
//             background: #0b3f90;
//             transform: translateY(-1px);
//             box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
//           }

//           .modal-button:disabled {
//             opacity: 0.6;
//             cursor: not-allowed;
//           }

//           .modal-close {
//             background: none;
//             border: none;
//             color: rgba(23, 38, 58, 0.4);
//             cursor: pointer;
//             font-size: 14px;
//             padding: 8px;
//             transition: color 0.2s ease;
//           }

//           .modal-close:hover {
//             color: #17263a;
//           }

//           .modal-success {
//             text-align: center;
//             padding: 20px 0;
//           }

//           .modal-success .checkmark {
//             font-size: 48px;
//             color: #2fb463;
//             margin-bottom: 12px;
//           }

//           .modal-success h3 {
//             color: #17263a;
//             margin-bottom: 8px;
//           }

//           .modal-success p {
//             color: rgba(23, 38, 58, 0.6);
//             font-size: 14px;
//             line-height: 1.6;
//           }

//           .modal-error {
//             color: #dc2626;
//             font-size: 13px;
//             padding: 8px 12px;
//             background: #fee2e2;
//             border-radius: 8px;
//             text-align: center;
//           }

//           .modal-divider {
//             border: none;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             margin: 8px 0 16px;
//           }

//           .modal-footer-text {
//             font-size: 13px;
//             color: rgba(23, 38, 58, 0.5);
//             text-align: center;
//             margin-top: 12px;
//           }

//           .modal-footer-text a {
//             color: #0f4ea9;
//             text-decoration: none;
//             font-weight: 600;
//           }

//           .modal-footer-text a:hover {
//             text-decoration: underline;
//           }

//           .modal-header {
//             display: flex;
//             justify-content: flex-end;
//             margin-bottom: 8px;
//           }
//         `}
//       </style>

//       <div className="modal-overlay" onClick={onClose}>
//         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//           <div className="modal-header">
//             <button className="modal-close" onClick={onClose}>✕</button>
//           </div>

//           {status === 'success' ? (
//             <div className="modal-success">
//               <div className="checkmark">✓</div>
//               <h3>Check Your Email</h3>
//               <p>{message || 'A password recovery link has been sent to your email.'}</p>
//               <hr className="modal-divider" />
//               <p style={{ fontSize: '13px', color: 'rgba(23,38,58,0.5)', marginTop: '8px' }}>
//                 Didn't receive the email? <a href="#" onClick={(e) => { e.preventDefault(); setStatus('idle'); setEmail(''); }}>Try again</a>
//               </p>
//             </div>
//           ) : (
//             <>
//               <h2 className="modal-title">Reset Password</h2>
//               <p className="modal-subtitle">Enter your email address and we'll send you a link to reset your password.</p>

//               <form className="modal-form" onSubmit={handleSubmit}>
//                 <div className="modal-input-wrapper">
//                   <span className="icon"><IconMail /></span>
//                   <input
//                     type="email"
//                     placeholder="Enter your email address"
//                     value={email}
//                     onChange={(e) => {
//                       setEmail(e.target.value)
//                       setError('')
//                     }}
//                     disabled={status === 'loading'}
//                     autoFocus
//                   />
//                 </div>

//                 {error && (
//                   <div className="modal-error">{error}</div>
//                 )}

//                 <button 
//                   type="submit" 
//                   className="modal-button"
//                   disabled={status === 'loading'}
//                 >
//                   {status === 'loading' ? 'Sending...' : 'Send Recovery Email'}
//                 </button>

//                 <p className="modal-footer-text">
//                   Remember your password? <a href="#" onClick={(e) => { e.preventDefault(); onClose(); }}>Log in</a>
//                 </p>
//               </form>
//             </>
//           )}
//         </div>
//       </div>
//     </>
//   )
// }





// src/worker/components/ForgotPasswordModal.jsx
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { IconMail } from '../../common/components/Icons'
import authService from '../../services/authService'

export function ForgotPasswordModal({ isOpen, onClose, onSuccess }) {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus()
      }, 100)
    }
  }, [isOpen])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStatus('idle')
      setEmail('')
      setError('')
      setMessage('')
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      setError(t('auth.emailRequired'))
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError(t('auth.validEmail'))
      return
    }

    setStatus('loading')
    setError('')
    setMessage('')

    try {
      const result = await authService.forgotPassword(email)
      
      if (result.success) {
        setStatus('success')
        setMessage(t('auth.passwordResetSent'))
        setTimeout(() => {
          if (onSuccess) {
            onSuccess()
          }
          // Close modal after success
          setTimeout(() => {
            onClose()
          }, 3000)
        }, 2000)
      } else {
        setStatus('error')
        setError(result.message || t('auth.loginError'))
      }
    } catch (error) {
      console.error('Forgot password error:', error)
      setStatus('error')
      setError(error.message || t('auth.loginError'))
    }
  }

  const handleTryAgain = (e) => {
    e.preventDefault()
    setStatus('idle')
    setEmail('')
    setError('')
    setMessage('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const handleClose = () => {
    onClose()
  }

  return (
    <>
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: fadeIn 0.2s ease;
            padding: 20px;
          }

          .modal-content {
            background: white;
            border-radius: 16px;
            padding: 32px 40px;
            max-width: 440px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
            animation: slideUp 0.3s ease;
            position: relative;
            max-height: 90vh;
            overflow-y: auto;
          }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          .modal-header {
            display: flex;
            justify-content: flex-end;
            margin-bottom: 8px;
          }

          .modal-close {
            background: none;
            border: none;
            color: rgba(23, 38, 58, 0.4);
            cursor: pointer;
            font-size: 18px;
            padding: 8px;
            transition: color 0.2s ease;
            border-radius: 8px;
            line-height: 1;
          }

          .modal-close:hover {
            color: #17263a;
            background: rgba(23, 38, 58, 0.06);
          }

          .modal-title {
            font-size: 20px;
            font-weight: 700;
            color: #17263a;
            margin-bottom: 8px;
            text-align: center;
          }

          .modal-subtitle {
            font-size: 14px;
            color: rgba(23, 38, 58, 0.6);
            text-align: center;
            margin-bottom: 24px;
            line-height: 1.5;
          }

          .modal-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .modal-input-wrapper {
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid rgba(18, 38, 63, 0.12);
            border-radius: 10px;
            background: white;
            transition: all 0.2s ease;
            height: 48px;
          }

          .modal-input-wrapper:focus-within {
            border-color: #0f4ea9;
            box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
          }

          .modal-input-wrapper:hover {
            border-color: rgba(15, 78, 169, 0.4);
          }

          .modal-input-wrapper .icon {
            padding: 0 12px;
            color: rgba(23, 38, 58, 0.4);
            display: flex;
            align-items: center;
            flex-shrink: 0;
          }

          .modal-input-wrapper .icon svg {
            width: 18px;
            height: 18px;
          }

          .modal-input-wrapper input {
            flex: 1;
            border: none;
            outline: none;
            padding: 0 12px 0 0;
            font-size: 14px;
            color: #17263a;
            background: transparent;
            height: 100%;
            font-family: inherit;
            min-width: 0;
          }

          .modal-input-wrapper input::placeholder {
            color: rgba(23, 38, 58, 0.4);
          }

          .modal-input-wrapper input:disabled {
            opacity: 0.6;
          }

          .modal-button {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 10px;
            font-size: 15px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            background: #0f4ea9;
            color: white;
            height: 48px;
            font-family: inherit;
          }

          .modal-button:hover:not(:disabled) {
            background: #0b3f90;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
          }

          .modal-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            transform: none;
          }

          .modal-success {
            text-align: center;
            padding: 20px 0;
          }

          .modal-success .checkmark {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 64px;
            height: 64px;
            border-radius: 50%;
            background: #d1fae5;
            margin: 0 auto 16px;
            font-size: 32px;
            color: #2fb463;
          }

          .modal-success h3 {
            font-size: 18px;
            color: #17263a;
            margin-bottom: 8px;
          }

          .modal-success p {
            color: rgba(23, 38, 58, 0.6);
            font-size: 14px;
            line-height: 1.6;
            margin-bottom: 8px;
          }

          .modal-success .email-display {
            font-weight: 600;
            color: #17263a;
            word-break: break-all;
          }

          .modal-error {
            color: #dc2626;
            font-size: 13px;
            padding: 10px 14px;
            background: #fee2e2;
            border-radius: 8px;
            text-align: center;
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: center;
          }

          .modal-divider {
            border: none;
            border-top: 1px solid rgba(18, 38, 63, 0.08);
            margin: 16px 0;
          }

          .modal-footer-text {
            font-size: 13px;
            color: rgba(23, 38, 58, 0.5);
            text-align: center;
            margin-top: 4px;
          }

          .modal-footer-text a {
            color: #0f4ea9;
            text-decoration: none;
            font-weight: 600;
            cursor: pointer;
          }

          .modal-footer-text a:hover {
            text-decoration: underline;
          }

          .modal-try-again {
            color: #0f4ea9;
            text-decoration: underline;
            cursor: pointer;
            font-weight: 500;
            background: none;
            border: none;
            font-size: 13px;
            padding: 4px 8px;
            font-family: inherit;
            transition: color 0.2s ease;
          }

          .modal-try-again:hover {
            color: #0b3f90;
          }

          .modal-spinner {
            display: inline-block;
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.8s linear infinite;
            margin-right: 8px;
            vertical-align: middle;
          }

          @keyframes spin {
            to { transform: rotate(360deg); }
          }

          .modal-loading-text {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          /* Responsive */
          @media (max-width: 480px) {
            .modal-content {
              padding: 24px 20px;
              border-radius: 12px;
            }

            .modal-title {
              font-size: 18px;
            }

            .modal-subtitle {
              font-size: 13px;
            }
          }
        `}
      </style>

      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <button className="modal-close" onClick={handleClose} aria-label="Close modal">
              ✕
            </button>
          </div>

          {status === 'success' ? (
            <div className="modal-success">
              <div className="checkmark">✓</div>
              <h3>{t('auth.checkYourEmail')}</h3>
              <p>
                {t('auth.passwordResetSent')}
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(23,38,58,0.5)', marginTop: '4px' }}>
                <span className="email-display">{email}</span>
              </p>
              <hr className="modal-divider" />
              <p style={{ fontSize: '13px', color: 'rgba(23,38,58,0.5)' }}>
                {t('auth.didntReceiveEmail')}{' '}
                <button 
                  className="modal-try-again" 
                  onClick={handleTryAgain}
                >
                  {t('auth.tryAgain')}
                </button>
              </p>
            </div>
          ) : (
            <>
              <h2 className="modal-title">{t('auth.resetPassword')}</h2>
              <p className="modal-subtitle">{t('auth.enterEmailReset')}</p>

              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="modal-input-wrapper">
                  <span className="icon"><IconMail /></span>
                  <input
                    ref={inputRef}
                    type="email"
                    placeholder={t('auth.email')}
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError('')
                    }}
                    disabled={status === 'loading'}
                    autoComplete="email"
                  />
                </div>

                {error && (
                  <div className="modal-error">
                    <span>⚠️</span> {error}
                  </div>
                )}

                <button 
                  type="submit" 
                  className="modal-button"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <span className="modal-loading-text">
                      <span className="modal-spinner"></span>
                      {t('auth.sending')}
                    </span>
                  ) : (
                    t('auth.sendRecoveryEmail')
                  )}
                </button>

                <p className="modal-footer-text">
                  {t('auth.rememberPassword')}{' '}
                  <a onClick={handleClose}>
                    {t('auth.logIn')}
                  </a>
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ForgotPasswordModal