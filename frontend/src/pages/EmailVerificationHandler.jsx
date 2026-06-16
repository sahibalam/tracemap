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
    setStatus('success')
    setMessage('Email verified successfully! Redirecting...')
  
    const pendingEmail = localStorage.getItem('pendingEmail')
    const pendingPhone = localStorage.getItem('pendingPhoneNumber')
    const pendingPassword = localStorage.getItem('pendingPassword')
    const pendingFirstName = localStorage.getItem('pendingFirstName')
    const pendingLastName = localStorage.getItem('pendingLastName')
  
    setTimeout(() => {
      navigate('/verify', {
        state: {
          email: pendingEmail,
          phoneNumber: pendingPhone,
          registerPassword: pendingPassword,
          firstName: pendingFirstName,
          lastName: pendingLastName,
          emailVerified: true
        }
      })
    }, 2000)
  }, [navigate])

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