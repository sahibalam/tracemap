// src/company/pages/CompanyAuthPage.jsx
import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TextField, SelectField } from '../../common/components/TextField'
import { IconUser, IconMail, IconLock, IconPhone, IconGlobe, IconSupport } from '../../common/components/Icons'
import { formatPhoneNumber } from '../../common/utils/validation'

export function CompanyAuthPage({ initialMode = 'login' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [mode, setMode] = useState(initialMode)

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [companyEmail, setCompanyEmail] = useState('')
  const [companyPhone, setCompanyPhone] = useState('')
  const [companyFirstName, setCompanyFirstName] = useState('')
  const [companyLastName, setCompanyLastName] = useState('')
  const [companyPassword, setCompanyPassword] = useState('')
  const [companyConfirmPassword, setCompanyConfirmPassword] = useState('')
  const [companyLanguage, setCompanyLanguage] = useState('')
  const [companyRole, setCompanyRole] = useState('')
  const [companyAcceptTerms, setCompanyAcceptTerms] = useState(false)
  const [companyAcceptPrivacy, setCompanyAcceptPrivacy] = useState(false)

  // Validation errors
  const [phoneError, setPhoneError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')

  const submitLabel = useMemo(() => (mode === 'login' ? 'Log in' : 'Create account'), [mode])

  useEffect(() => {
    const nextMode = location.pathname === '/company/register' ? 'register' : 'login'
    setMode(nextMode)
  }, [location.pathname])

  // Validate password strength
  const validatePassword = (password) => {
    // Check minimum 8 characters
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters' }
    }
    
    // Check for letters and numbers (alphanumeric)
    const hasLetter = /[A-Za-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    
    if (!hasLetter || !hasNumber) {
      return { valid: false, message: 'Password must contain both letters and numbers' }
    }
    
    return { valid: true, message: '' }
  }

  // Get password strength indicator
  const getPasswordStrength = (password) => {
    if (!password) return ''
    
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Za-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
    
    if (strength <= 2) return 'Weak'
    if (strength <= 4) return 'Medium'
    return 'Strong'
  }

  // Handle password change with validation
  const handlePasswordChange = (value) => {
    setCompanyPassword(value)
    
    // Validate password
    const validation = validatePassword(value)
    const strength = getPasswordStrength(value)
    setPasswordStrength(strength)
    
    if (!validation.valid && value.length > 0) {
      setPasswordError(validation.message)
    } else if (companyConfirmPassword && value !== companyConfirmPassword) {
      setPasswordError('Passwords do not match')
    } else {
      setPasswordError('')
    }
  }

  // Handle confirm password change
  const handleConfirmPasswordChange = (value) => {
    setCompanyConfirmPassword(value)
    
    if (companyPassword !== value) {
      setPasswordError('Passwords do not match')
    } else {
      // Also check password strength if confirm matches
      const validation = validatePassword(companyPassword)
      if (!validation.valid) {
        setPasswordError(validation.message)
      } else {
        setPasswordError('')
      }
    }
  }

  // Handle phone number change with formatting
  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value)
    setCompanyPhone(formatted)
    
    const digits = formatted.replace(/\D/g, '')
    if (digits.length === 10) {
      setPhoneError('')
    } else if (digits.length > 0 && digits.length < 10) {
      setPhoneError('Phone number must be 10 digits')
    } else {
      setPhoneError('')
    }
  }

  // Get color for password strength indicator
  const getStrengthColor = () => {
    switch(passwordStrength) {
      case 'Weak': return '#e11d48'
      case 'Medium': return '#f59e0b'
      case 'Strong': return '#2fb463'
      default: return 'rgba(23,38,58,0.3)'
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    if (mode === 'register') {
      const phoneDigits = companyPhone.replace(/\D/g, '')
      const isPhoneValid = phoneDigits.length === 10
      const passwordValidation = validatePassword(companyPassword)
      const isPasswordValid = passwordValidation.valid && companyPassword === companyConfirmPassword
      
      if (!isPhoneValid) {
        setPhoneError('Phone number must be 10 digits')
        return
      }
      
      if (!passwordValidation.valid) {
        setPasswordError(passwordValidation.message)
        return
      }
      
      if (companyPassword !== companyConfirmPassword) {
        setPasswordError('Passwords do not match')
        return
      }
      
      navigate('/company/verify', {
        state: {
          email: companyEmail,
          phoneNumber: companyPhone,
          firstName: companyFirstName,
          lastName: companyLastName,
          language: companyLanguage,
          role: companyRole,
          acceptTerms: companyAcceptTerms,
          acceptPrivacy: companyAcceptPrivacy,
        },
      })
      return
    }
  }

  return (
    <div className="authPage">
      <div className="bg bgAuth" />
      <div className="bgOverlay" />

      <main className="authMain">
        <div className="authBrand" aria-hidden="true">
          <img className="authLogo" src="/assets/logo_tradesmap.png" alt="" />
        </div>

        <div className="authCard authCardCompact">
          <div className={`tabs ${mode}`} role="tablist" aria-label="Company authentication tabs">
            <button
              type="button"
              className={`tab ${mode === 'login' ? 'tabActive' : ''}`}
              role="tab"
              aria-selected={mode === 'login'}
              onClick={() => navigate('/company/login')}
            >
              Log in
            </button>
            <button
              type="button"
              className={`tab ${mode === 'register' ? 'tabActive' : ''}`}
              role="tab"
              aria-selected={mode === 'register'}
              onClick={() => navigate('/company/register')}
            >
              Register
            </button>
            <div className={`tabIndicator ${mode === 'login' ? 'tabLeft' : 'tabRight'}`} aria-hidden="true" />
          </div>

          <form className="form" onSubmit={onSubmit} noValidate={mode === 'register'}>
            {mode === 'login' ? (
              <>
                <TextField label="" placeholder="Username" icon={<IconUser />} value={loginUsername} onChange={setLoginUsername} />
                <TextField
                  label=""
                  placeholder="Password"
                  type="password"
                  icon={<IconLock />}
                  value={loginPassword}
                  onChange={setLoginPassword}
                />
                <div className="formRow">
                  <a className="link" href="#">Forgot password?</a>
                </div>
                <button type="submit" className="btn btnPrimary">{submitLabel}</button>
              </>
            ) : (
              <>
                {/* Row 1: Email ID | Phone */}
                <div className="formGrid2">
                  <TextField label="" placeholder="Email ID" icon={<IconMail />} value={companyEmail} onChange={setCompanyEmail} />
                  
                  {/* Phone Field */}
                  <div>
                    <div style={{ 
                      display: 'flex', 
                      border: '1px solid rgba(18,38,63,0.12)', 
                      borderRadius: '12px', 
                      height: '48px', 
                      background: 'white', 
                      width: '100%' 
                    }}>
                      <span style={{ 
                        padding: '0 12px', 
                        display: 'flex', 
                        alignItems: 'center', 
                        fontWeight: 600, 
                        fontSize: '14px',
                        borderRight: '1px solid rgba(18,38,63,0.12)',
                        color: '#17263a'
                      }}>
                        🇺🇸 +1
                      </span>
                      <input 
                        type="tel"
                        placeholder="555-555-5555"
                        value={companyPhone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        maxLength={12}
                        style={{ 
                          flex: 1, 
                          border: 'none', 
                          outline: 'none', 
                          padding: '0 12px',
                          borderRadius: '12px',
                          fontSize: '14px'
                        }}
                      />
                    </div>
                    {phoneError && (
                      <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>
                        {phoneError}
                      </div>
                    )}
                  </div>
                </div>

                {/* Row 2: First name | Last name */}
                <div className="formGrid2">
                  <TextField label="" placeholder="First name" icon={<IconUser />} value={companyFirstName} onChange={setCompanyFirstName} />
                  <TextField label="" placeholder="Last name" icon={<IconUser />} value={companyLastName} onChange={setCompanyLastName} />
                </div>

                {/* Row 3: Language | Role (Swapped - Language first, then Role) */}
                <div className="formGrid2">
                  <SelectField label="" icon={<IconGlobe />} value={companyLanguage} onChange={setCompanyLanguage}>
                    <option value="" disabled>Language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </SelectField>
                  <SelectField label="" icon={<IconSupport />} value={companyRole} onChange={setCompanyRole}>
                    <option value="" disabled>Select the role</option>
                    <option value="company_admin">Company Admin</option>
                    <option value="operations_manager">Operations Manager</option>
                    <option value="project_manager">Project Manager</option>
                    <option value="superintendent">Superintendent</option>
                    <option value="recruiter">Recruiter</option>
                    <option value="safety_manager">Safety Manager</option>
                    <option value="billing_ap">Billing/AP</option>
                    <option value="read_only">Read only</option>
                  </SelectField>
                </div>

                {/* Row 4: Password | Confirm Password */}
                <div className="formGrid2">
                  <div style={{ width: '100%' }}>
                    <TextField
                      label=""
                      placeholder="Password"
                      type="password"
                      icon={<IconLock />}
                      value={companyPassword}
                      onChange={handlePasswordChange}
                    />
                    {companyPassword && (
                      <div style={{ marginTop: '4px' }}>
                        <div style={{ 
                          height: '3px', 
                          background: getStrengthColor(), 
                          width: passwordStrength === 'Weak' ? '33%' : passwordStrength === 'Medium' ? '66%' : '100%',
                          borderRadius: '3px',
                          transition: 'all 0.3s ease'
                        }} />
                        <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>
                          {passwordStrength} password
                        </span>
                        <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>
                          (min 8 chars, letters & numbers)
                        </span>
                      </div>
                    )}
                  </div>
                  <TextField
                    label=""
                    placeholder="Confirm Password"
                    type="password"
                    icon={<IconLock />}
                    value={companyConfirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </div>
                {passwordError && (
                  <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '-12px' }}>
                    {passwordError}
                  </div>
                )}

                {/* Row 5: Accept Terms */}
                <div className="wizardChecks wizardChecks2">
                  <label className="wizardCheck">
                    <input type="checkbox" checked={companyAcceptTerms} onChange={(e) => setCompanyAcceptTerms(e.target.checked)} />
                    Accept terms of service
                  </label>
                  <label className="wizardCheck">
                    <input type="checkbox" checked={companyAcceptPrivacy} onChange={(e) => setCompanyAcceptPrivacy(e.target.checked)} />
                    Accept Privacy Policy
                  </label>
                </div>

                {/* Row 6: Submit Button */}
                <button type="submit" className="btn btnSuccess">{submitLabel}</button>
              </>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}