// frontend/src/pages/EmailVerificationHandler.jsx
import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { applyActionCode, auth } from '../firebase/config'

export function EmailVerificationHandler() {
  const navigate = useNavigate()
  const location = useLocation()
  const [status, setStatus] = useState('verifying')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        const queryParams = new URLSearchParams(location.search)
        const mode = queryParams.get('mode')
        const oobCode = queryParams.get('oobCode')

        if (mode === 'verifyEmail' && oobCode) {
          // Verify the email with Firebase
          await applyActionCode(auth, oobCode)
          
          setStatus('success')
          setMessage('Email verified successfully! Redirecting to verification page...')
          
          // Get pending data from localStorage
          const pendingEmail = localStorage.getItem('pendingEmail')
          const pendingPhone = localStorage.getItem('pendingPhoneNumber')
          const pendingPassword = localStorage.getItem('pendingPassword')
          const pendingFirstName = localStorage.getItem('pendingFirstName')
          const pendingLastName = localStorage.getItem('pendingLastName')
          
          // Redirect back to verify page after 2 seconds
          setTimeout(() => {
            navigate('/verify', { 
              state: { 
                email: pendingEmail,
                phoneNumber: pendingPhone,
                registerPassword: pendingPassword,
                firstName: pendingFirstName,
                lastName: pendingLastName,
                emailVerified: true  // This will set emailVerified = true in verify page
              } 
            })
          }, 2000)
        } else {
          setStatus('error')
          setMessage('Invalid verification link')
          setTimeout(() => navigate('/register'), 3000)
        }
      } catch (error) {
        console.error('Verification error:', error)
        setStatus('error')
        setMessage(error.message || 'Verification failed. Please try again.')
        setTimeout(() => navigate('/register'), 3000)
      }
    }

    handleEmailVerification()
  }, [location, navigate])

  return (
    <div className="authPage">
      <div className="bg bgAuth" />
      <div className="bgOverlay" />
      <main className="authMain">
        <div className="authCard authCardCompact" style={{ textAlign: 'center', padding: '40px' }}>
          {status === 'verifying' && (
            <>
              <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
              <h2>Verifying your email...</h2>
              <p>Please wait while we verify your email address.</p>
            </>
          )}
          {status === 'success' && (
            <>
              <div style={{ fontSize: '48px', marginBottom: '20px', color: '#2fb463' }}>✓</div>
              <h2 style={{ color: '#2fb463' }}>Email Verified Successfully!</h2>
              <p>{message}</p>
            </>
          )}
          {status === 'error' && (
            <>
              <div style={{ fontSize: '48px', marginBottom: '20px', color: '#e11d48' }}>✗</div>
              <h2 style={{ color: '#e11d48' }}>Verification Failed</h2>
              <p>{message}</p>
              <button 
                onClick={() => navigate('/register')}
                style={{ marginTop: '20px', padding: '10px 20px', background: '#0f4ea9', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
              >
                Back to Registration
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  )
}