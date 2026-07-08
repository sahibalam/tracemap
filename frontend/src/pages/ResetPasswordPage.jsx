// src/pages/ResetPasswordPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import authService from '../services/authService'
import { IconLock } from '../common/components/Icons'

// Eye icon components
function IconEye(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
    </svg>
  )
}

function IconEyeOff(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
    </svg>
  )
}

// Custom Password Input Component
function PasswordInput({ placeholder, value, onChange, showPassword, onToggle }) {
  return (
    <div className="reset-password-input-wrapper">
      <div className="reset-password-input-container">
        <span className="reset-password-input-icon"><IconLock /></span>
        <input
          type={showPassword ? 'text' : 'password'}
          className="reset-password-input-field"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="reset-password-eye-btn"
          onClick={onToggle}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
    </div>
  )
}

export function ResetPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tokenParam = params.get('token')
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      setError('Invalid or missing reset token')
    }
  }, [location])

  const validatePassword = (password) => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters' }
    }
    const hasLetter = /[A-Za-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    if (!hasLetter || !hasNumber) {
      return { valid: false, message: 'Password must contain both letters and numbers' }
    }
    return { valid: true, message: '' }
  }

  const handleNewPasswordChange = (value) => {
    setNewPassword(value)
    const validation = validatePassword(value)
    if (!validation.valid && value.length > 0) {
      setPasswordError(validation.message)
    } else if (confirmPassword && value !== confirmPassword) {
      setPasswordError('Passwords do not match')
    } else {
      setPasswordError('')
    }
  }

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value)
    if (newPassword !== value) {
      setPasswordError('Passwords do not match')
    } else {
      const validation = validatePassword(newPassword)
      if (!validation.valid) {
        setPasswordError(validation.message)
      } else {
        setPasswordError('')
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!token) {
      setError('Invalid reset token')
      return
    }

    if (!newPassword || !confirmPassword) {
      setError('Please enter and confirm your new password')
      return
    }

    const validation = validatePassword(newPassword)
    if (!validation.valid) {
      setPasswordError(validation.message)
      return
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }

    setStatus('loading')
    setError('')
    setMessage('')

    try {
      const result = await authService.resetPassword(token, newPassword)
      
      if (result.success) {
        setStatus('success')
        setMessage('Your password has been updated successfully.')
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      }
    } catch (error) {
      setStatus('error')
      setError(error.message || 'Failed to reset password. Please try again.')
    }
  }

  return (
    <div className="reset-password-page">
      <style>
        {`
          .reset-password-page {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f5f7fa;
            padding: 20px;
          }

          .reset-password-card {
            background: white;
            border-radius: 16px;
            padding: 40px;
            max-width: 440px;
            width: 100%;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          }

          .reset-password-logo {
            text-align: center;
            margin-bottom: 24px;
          }

          .reset-password-logo img {
            max-height: 60px;
            width: auto;
          }

          .reset-password-title {
            font-size: 22px;
            font-weight: 700;
            color: #17263a;
            margin-bottom: 8px;
            text-align: center;
          }

          .reset-password-subtitle {
            font-size: 14px;
            color: rgba(23, 38, 58, 0.6);
            text-align: center;
            margin-bottom: 28px;
          }

          .reset-password-form {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }

          .reset-password-input-wrapper {
            width: 100%;
            max-width: 100%;
            box-sizing: border-box;
          }

          .reset-password-input-container {
            position: relative;
            display: flex;
            align-items: center;
            width: 100%;
            height: 48px;
            border: 1px solid rgba(18, 38, 63, 0.12);
            border-radius: 10px;
            background: white;
            transition: all 0.2s ease;
            box-sizing: border-box;
            overflow: hidden;
          }

          .reset-password-input-container:focus-within {
            border-color: #0f4ea9;
            box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
          }

          .reset-password-input-container:hover {
            border-color: rgba(15, 78, 169, 0.4);
          }

          .reset-password-input-icon {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 12px;
            color: rgba(23, 38, 58, 0.4);
            flex-shrink: 0;
            min-width: 38px;
          }

          .reset-password-input-icon svg {
            width: 18px;
            height: 18px;
          }

          .reset-password-input-field {
            flex: 1;
            height: 100%;
            border: none;
            outline: none;
            padding: 0 4px;
            font-size: 14px;
            color: #17263a;
            background: transparent;
            font-family: inherit;
            min-width: 0;
            width: 100%;
          }

          .reset-password-input-field::placeholder {
            color: rgba(23, 38, 58, 0.4);
          }

          .reset-password-eye-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0 12px;
            background: none;
            border: none;
            cursor: pointer;
            color: rgba(23, 38, 58, 0.4);
            transition: color 0.2s ease;
            flex-shrink: 0;
            height: 100%;
            min-width: 38px;
          }

          .reset-password-eye-btn:hover {
            color: #0f4ea9;
          }

          .reset-password-eye-btn:focus {
            outline: none;
          }

          .reset-password-eye-btn svg {
            width: 18px;
            height: 18px;
          }

          .reset-password-error {
            color: #dc2626;
            font-size: 13px;
            padding: 10px 14px;
            background: #fee2e2;
            border-radius: 8px;
            text-align: center;
          }

          .reset-password-success {
            text-align: center;
            padding: 20px 0;
          }

          .reset-password-success .checkmark {
            font-size: 48px;
            color: #2fb463;
            margin-bottom: 12px;
          }

          .reset-password-success h3 {
            color: #17263a;
            margin-bottom: 8px;
          }

          .reset-password-success p {
            color: rgba(23, 38, 58, 0.6);
            font-size: 14px;
            line-height: 1.6;
          }

          .reset-password-button {
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
            margin-top: 8px;
          }

          .reset-password-button:hover:not(:disabled) {
            background: #0b3f90;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
          }

          .reset-password-button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .reset-password-login-link {
            text-align: center;
            margin-top: 16px;
            font-size: 14px;
            color: rgba(23, 38, 58, 0.5);
          }

          .reset-password-login-link a {
            color: #0f4ea9;
            text-decoration: none;
            font-weight: 600;
          }

          .reset-password-login-link a:hover {
            text-decoration: underline;
          }

          .password-strength-container {
            margin-top: -4px;
            margin-bottom: 4px;
            padding: 0 2px;
          }

          .password-strength-bar {
            height: 3px;
            border-radius: 3px;
            transition: width 0.3s ease;
            margin-bottom: 2px;
          }

          .password-error-text {
            color: #dc2626;
            font-size: 12px;
            margin-top: -8px;
          }
        `}
      </style>

      <div className="reset-password-card">
        <div className="reset-password-logo">
          <img src="/assets/logo_tradesmap.png" alt="TradesMap" />
        </div>

        {status === 'success' ? (
          <div className="reset-password-success">
            <div className="checkmark">✓</div>
            <h3>Password Updated!</h3>
            <p>{message}</p>
            <p style={{ fontSize: '13px', color: 'rgba(23,38,58,0.5)', marginTop: '12px' }}>
              Redirecting to login...
            </p>
          </div>
        ) : (
          <>
            <h2 className="reset-password-title">Reset Password</h2>
            <p className="reset-password-subtitle">Enter your new password below.</p>

            <form className="reset-password-form" onSubmit={handleSubmit}>
              <PasswordInput
                placeholder="Enter New Password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                showPassword={showNewPassword}
                onToggle={() => setShowNewPassword(!showNewPassword)}
              />

              <PasswordInput
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                showPassword={showConfirmPassword}
                onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
              />

              {passwordError && (
                <div className="password-error-text">{passwordError}</div>
              )}

              {newPassword && newPassword.length > 0 && (
                <div className="password-strength-container">
                  <div 
                    className="password-strength-bar" 
                    style={{ 
                      width: newPassword.length < 8 ? '33%' : newPassword.length < 10 ? '66%' : '100%',
                      background: newPassword.length < 8 ? '#e11d48' : newPassword.length < 10 ? '#f59e0b' : '#2fb463'
                    }} 
                  />
                  <span style={{ 
                    fontSize: '11px', 
                    color: newPassword.length < 8 ? '#e11d48' : newPassword.length < 10 ? '#f59e0b' : '#2fb463',
                    fontWeight: 600
                  }}>
                    {newPassword.length < 8 ? 'Weak' : newPassword.length < 10 ? 'Medium' : 'Strong'} password
                  </span>
                  <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>
                    (min 8 chars, letters & numbers)
                  </span>
                </div>
              )}

              {error && (
                <div className="reset-password-error">{error}</div>
              )}

              <button 
                type="submit" 
                className="reset-password-button"
                disabled={status === 'loading' || !token}
              >
                {status === 'loading' ? 'Updating...' : 'Update Password'}
              </button>

              <div className="reset-password-login-link">
                Remember your password? <a href="/login">Log in</a>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default ResetPasswordPage