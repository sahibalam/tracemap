// src/worker/pages/AccountSettingsPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import { IconUser, IconMail, IconPhone, IconGlobe, IconLock, IconArrowLeft } from '../../common/components/Icons'
import api from '../../services/api'
import workerService from '../services/workerService'

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
          {showPassword ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}

// Update Button Component
function UpdateButton({ onClick, loading, label = 'Update' }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        padding: '6px 16px',
        background: loading ? '#94a3b8' : '#0f4ea9',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        fontSize: '12px',
        fontWeight: 600,
        cursor: loading ? 'not-allowed' : 'pointer',
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
        if (!loading) e.currentTarget.style.background = '#0b3f90'
      }}
      onMouseLeave={(e) => {
        if (!loading) e.currentTarget.style.background = '#0f4ea9'
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
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  
  // Password fields
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  
  // Delete account
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState('')
  
  const userId = localStorage.getItem('userId')

  // Load user data
  useEffect(() => {
    if (userId) {
      loadUserData()
    } else {
      navigate('/login')
    }
  }, [userId])

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

  // Update individual fields
  const updateField = async (field, value) => {
    try {
      setSaving(prev => ({ ...prev, [field]: true }))
      setError('')
      setSuccess('')
      
      const updateData = {}
      updateData[field] = value
      
      // If updating language, handle the language fields
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
      
      // Handle field updates
      if (field === 'email') {
        await workerService.updateBasics(userId, { emailAddress: value })
        localStorage.setItem('pendingEmail', value)
      } else if (field === 'firstName') {
        await workerService.updateBasics(userId, { legalFirstName: value })
        localStorage.setItem('pendingFirstName', value)
      } else if (field === 'lastName') {
        await workerService.updateBasics(userId, { legalLastName: value })
        localStorage.setItem('pendingLastName', value)
      } else if (field === 'phoneNumber') {
        await workerService.updateBasics(userId, { mobilePhone: value })
      } else if (field === 'language') {
        await workerService.updateBasics(userId, updateData)
      } else if (field === 'password') {
        // Handle password update
        if (newPassword.length < 8) {
          setPasswordError('Password must be at least 8 characters')
          setSaving(prev => ({ ...prev, [field]: false }))
          return
        }
        
        if (newPassword !== confirmPassword) {
          setPasswordError('Passwords do not match')
          setSaving(prev => ({ ...prev, [field]: false }))
          return
        }
        
        await api.post('/auth/change-password', {
          userId,
          currentPassword,
          newPassword
        })
        
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setPasswordError('')
      }
      
      setSuccess(`${field} updated successfully!`)
      setTimeout(() => setSuccess(''), 3000)
      
      // Refresh user data
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
      
      // Clear all local storage
      localStorage.clear()
      sessionStorage.clear()
      
      navigate('/login')
      
    } catch (err) {
      console.error('Error deleting account:', err)
      setError(err.response?.data?.message || err.message || 'Failed to delete account')
      setSaving(prev => ({ ...prev, delete: false }))
    }
  }

  // Field row component with label and value on same row
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
              {/* Header with Back Button */}
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
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email Address"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid rgba(18, 38, 63, 0.12)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            background: 'white',
                            transition: 'all 0.2s ease',
                            height: '36px'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
                        />
                      </div>
                      <UpdateButton 
                        onClick={() => updateField('email', email)}
                        loading={saving.email}
                      />
                    </div>
                  </FieldRow>

                  {/* Phone Number */}
                  <FieldRow label="Phone Number" icon={<IconPhone />}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Phone Number"
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            border: '1px solid rgba(18, 38, 63, 0.12)',
                            borderRadius: '8px',
                            fontSize: '14px',
                            outline: 'none',
                            background: 'white',
                            transition: 'all 0.2s ease',
                            height: '36px'
                          }}
                          onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
                          onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
                        />
                      </div>
                      <UpdateButton 
                        onClick={() => updateField('phoneNumber', phoneNumber)}
                        loading={saving.phoneNumber}
                      />
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
                          <option value="en-es">English & Spanish</option>
                        </select>
                      </div>
                      <UpdateButton 
                        onClick={() => updateField('language', language)}
                        loading={saving.language}
                      />
                    </div>
                  </FieldRow>

                  {/* Password */}
                  <FieldRow label="Password" icon={<IconLock />}>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <div style={{ flex: 1, minWidth: '200px' }}>
                        <PasswordInput
                          placeholder="Enter new password to change"
                          value={newPassword}
                          onChange={setNewPassword}
                          showPassword={showPassword}
                          onToggle={() => setShowPassword(!showPassword)}
                        />
                        {passwordError && (
                          <div style={{
                            color: '#dc2626',
                            fontSize: '11px',
                            marginTop: '4px'
                          }}>
                            {passwordError}
                          </div>
                        )}
                      </div>
                      <UpdateButton 
                        onClick={() => updateField('password', newPassword)}
                        loading={saving.password}
                        label="Update"
                      />
                    </div>
                    {/* Confirm Password - only show if new password is entered */}
                    {newPassword && (
                      <div style={{ marginTop: '8px' }}>
                        <label style={{
                          fontSize: '12px',
                          fontWeight: 500,
                          color: '#17263a',
                          display: 'block',
                          marginBottom: '4px'
                        }}>
                          Confirm Password
                        </label>
                        <PasswordInput
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={setConfirmPassword}
                          showPassword={showPassword}
                          onToggle={() => setShowPassword(!showPassword)}
                        />
                      </div>
                    )}
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
                      onClick={() => window.open('mailto:support@tradesmap.com', '_blank')}
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