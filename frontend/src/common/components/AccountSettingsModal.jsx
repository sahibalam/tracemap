// src/common/components/AccountSettingsModal.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TextField } from './TextField'
import { IconUser, IconMail, IconPhone, IconGlobe, IconLock } from './Icons'
import api from '../../services/api'
import workerService from '../../worker/services/workerService'

function IconClose(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
    </svg>
  )
}

function IconEye(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
    </svg>
  )
}

function IconEyeOff(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor" />
    </svg>
  )
}

// Password Input Component
function PasswordInput({ placeholder, value, onChange, showPassword, onToggle }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
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

export function AccountSettingsModal({ isOpen, onClose }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  // User data
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [language, setLanguage] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  
  // Password fields
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  
  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  
  const userId = localStorage.getItem('userId')

  // Load user data
  useEffect(() => {
    if (isOpen && userId) {
      loadUserData()
    }
  }, [isOpen, userId])

  const loadUserData = async () => {
    try {
      setLoading(true)
      setError('')
      
      const result = await workerService.getWorkerProfile(userId)
      
      if (result.success && result.data) {
        const basics = result.data.basics || {}
        setEmail(basics.emailAddress || '')
        setPhoneNumber(basics.mobilePhone || '')
        setFirstName(basics.legalFirstName || '')
        setLastName(basics.legalLastName || '')
        
        // Detect language
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

  const validatePassword = (password) => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters' }
    }
    const hasLetter = /[A-Za-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    if (!hasLetter || !hasNumber) {
      return { valid: false, message: 'Password must contain letters and numbers' }
    }
    return { valid: true, message: '' }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')
      setSuccess('')
      
      // Update basic info
      const updateData = {
        legalFirstName: firstName,
        legalLastName: lastName,
        emailAddress: email,
        mobilePhone: phoneNumber,
      }
      
      // Add language preference
      if (language === 'en') {
        updateData.english = true
        updateData.spanish = false
        updateData.englishSpanish = false
      } else if (language === 'es') {
        updateData.english = false
        updateData.spanish = true
        updateData.englishSpanish = false
      } else if (language === 'en-es') {
        updateData.english = false
        updateData.spanish = false
        updateData.englishSpanish = true
      }
      
      await workerService.updateBasics(userId, updateData)
      
      // Update password if provided
      if (newPassword) {
        const validation = validatePassword(newPassword)
        if (!validation.valid) {
          setPasswordError(validation.message)
          setSaving(false)
          return
        }
        
        if (newPassword !== confirmPassword) {
          setPasswordError('Passwords do not match')
          setSaving(false)
          return
        }
        
        // Call password update API
        await api.post('/auth/change-password', {
          userId,
          currentPassword,
          newPassword
        })
      }
      
      setSuccess('Account settings updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
      
      // Clear password fields
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
      setPasswordError('')
      
      // Update localStorage
      localStorage.setItem('pendingFirstName', firstName)
      localStorage.setItem('pendingLastName', lastName)
      
      // Refresh user data
      await loadUserData()
      
    } catch (err) {
      console.error('Error saving settings:', err)
      setError(err.response?.data?.message || err.message || 'Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      setError('Please type "DELETE" to confirm')
      return
    }
    
    try {
      setSaving(true)
      setError('')
      
      await api.delete(`/worker/profile/${userId}`)
      
      // Clear all local storage
      localStorage.clear()
      sessionStorage.clear()
      
      navigate('/login')
      onClose()
      
    } catch (err) {
      console.error('Error deleting account:', err)
      setError(err.response?.data?.message || err.message || 'Failed to delete account')
      setSaving(false)
    }
  }

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
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
        {/* Modal */}
        <div 
          style={{
            background: 'white',
            borderRadius: '16px',
            maxWidth: '560px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.3s ease'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#17263a',
              margin: 0
            }}>
              Account Settings
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
                color: '#64748b',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <IconClose />
            </button>
          </div>

          {/* Body */}
          <div style={{
            padding: '24px',
            overflowY: 'auto',
            maxHeight: 'calc(90vh - 140px)'
          }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
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
              <>
                {error && (
                  <div style={{
                    padding: '12px 16px',
                    background: '#fee2e2',
                    color: '#dc2626',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    ❌ {error}
                  </div>
                )}
                
                {success && (
                  <div style={{
                    padding: '12px 16px',
                    background: '#dcfce7',
                    color: '#16a34a',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    fontSize: '14px'
                  }}>
                    ✅ {success}
                  </div>
                )}

                {/* Email */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#17263a',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Email Address
                  </label>
                  <TextField
                    placeholder="Email"
                    icon={<IconMail />}
                    value={email}
                    onChange={setEmail}
                    readOnly
                  />
                </div>

                {/* Phone Number */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#17263a',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Phone Number
                  </label>
                  <TextField
                    placeholder="Phone Number"
                    icon={<IconPhone />}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                  />
                </div>

                {/* Language */}
                <div style={{ marginBottom: '16px' }}>
                  <label style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#17263a',
                    display: 'block',
                    marginBottom: '4px'
                  }}>
                    Language
                  </label>
                  <div style={{
                    display: 'flex',
                    border: '1px solid rgba(18, 38, 63, 0.12)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                  }}>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: 'none',
                        outline: 'none',
                        fontSize: '14px',
                        background: 'white',
                        fontFamily: 'inherit',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="en-es">English & Spanish</option>
                    </select>
                  </div>
                </div>

                {/* Password Section */}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(18, 38, 63, 0.08)'
                }}>
                  <h3 style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#17263a',
                    margin: '0 0 12px 0'
                  }}>
                    Change Password
                  </h3>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#17263a',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      Current Password
                    </label>
                    <PasswordInput
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={setCurrentPassword}
                      showPassword={showCurrentPassword}
                      onToggle={() => setShowCurrentPassword(!showCurrentPassword)}
                    />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#17263a',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      New Password
                    </label>
                    <PasswordInput
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={setNewPassword}
                      showPassword={showNewPassword}
                      onToggle={() => setShowNewPassword(!showNewPassword)}
                    />
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#17263a',
                      display: 'block',
                      marginBottom: '4px'
                    }}>
                      Confirm New Password
                    </label>
                    <PasswordInput
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      showPassword={showConfirmPassword}
                      onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  </div>

                  {passwordError && (
                    <div style={{
                      color: '#dc2626',
                      fontSize: '12px',
                      marginTop: '4px'
                    }}>
                      {passwordError}
                    </div>
                  )}
                </div>

                {/* Save Button */}
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    width: '100%',
                    padding: '12px',
                    marginTop: '24px',
                    background: saving ? '#94a3b8' : '#0f4ea9',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!saving) e.currentTarget.style.background = '#0b3f90'
                  }}
                  onMouseLeave={(e) => {
                    if (!saving) e.currentTarget.style.background = '#0f4ea9'
                  }}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>

                {/* Report Issue & Delete Account */}
                <div style={{
                  marginTop: '24px',
                  paddingTop: '24px',
                  borderTop: '1px solid rgba(18, 38, 63, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <button
                    onClick={() => window.open('mailto:support@tradesmap.com', '_blank')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0f4ea9',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      padding: '4px 0'
                    }}
                  >
                    Report an issue
                  </button>

                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      fontSize: '14px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      padding: '4px 0'
                    }}
                  >
                    Delete my Account
                  </button>
                </div>

                {/* Delete Confirmation */}
                {showDeleteConfirm && (
                  <div style={{
                    marginTop: '16px',
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
                        disabled={saving}
                        style={{
                          flex: 1,
                          padding: '8px',
                          background: '#dc2626',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: saving ? 'not-allowed' : 'pointer',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: 'white',
                          opacity: saving ? 0.6 : 1
                        }}
                      >
                        {saving ? 'Deleting...' : 'Delete Account'}
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
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
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  )
}

export default AccountSettingsModal