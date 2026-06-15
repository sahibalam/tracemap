// src/worker/pages/WorkerAuthPage.jsx
import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TextField, SelectField } from '../../common/components/TextField'
import { IconUser, IconMail, IconLock, IconPhone, IconLocation, IconGlobe, IconCamera, IconUpload } from '../../common/components/Icons'
import { formatPhoneNumber, formatZipCode } from '../../common/utils/validation'

export function WorkerAuthPage({ initialMode = 'login' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [mode, setMode] = useState(initialMode)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [dobDisplay, setDobDisplay] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [stateUS, setStateUS] = useState('')
  const [zip, setZip] = useState('')
  const [language, setLanguage] = useState('')
  const [profileImage, setProfileImage] = useState(null)
  const [profilePreview, setProfilePreview] = useState('')
  
  // Refs for file inputs
  const uploadRef = useRef(null)
  const cameraRef = useRef(null)
  
  // Validation errors
  const [phoneError, setPhoneError] = useState('')
  const [zipError, setZipError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const [dobError, setDobError] = useState('')

  const usStates = useMemo(() => [
    { name: 'Alabama', code: 'AL' }, { name: 'Alaska', code: 'AK' },
    { name: 'Arizona', code: 'AZ' }, { name: 'Arkansas', code: 'AR' },
    { name: 'California', code: 'CA' }, { name: 'Colorado', code: 'CO' },
    { name: 'Connecticut', code: 'CT' }, { name: 'Delaware', code: 'DE' },
    { name: 'Florida', code: 'FL' }, { name: 'Georgia', code: 'GA' },
    { name: 'Hawaii', code: 'HI' }, { name: 'Idaho', code: 'ID' },
    { name: 'Illinois', code: 'IL' }, { name: 'Indiana', code: 'IN' },
    { name: 'Iowa', code: 'IA' }, { name: 'Kansas', code: 'KS' },
    { name: 'Kentucky', code: 'KY' }, { name: 'Louisiana', code: 'LA' },
    { name: 'Maine', code: 'ME' }, { name: 'Maryland', code: 'MD' },
    { name: 'Massachusetts', code: 'MA' }, { name: 'Michigan', code: 'MI' },
    { name: 'Minnesota', code: 'MN' }, { name: 'Mississippi', code: 'MS' },
    { name: 'Missouri', code: 'MO' }, { name: 'Montana', code: 'MT' },
    { name: 'Nebraska', code: 'NE' }, { name: 'Nevada', code: 'NV' },
    { name: 'New Hampshire', code: 'NH' }, { name: 'New Jersey', code: 'NJ' },
    { name: 'New Mexico', code: 'NM' }, { name: 'New York', code: 'NY' },
    { name: 'North Carolina', code: 'NC' }, { name: 'North Dakota', code: 'ND' },
    { name: 'Ohio', code: 'OH' }, { name: 'Oklahoma', code: 'OK' },
    { name: 'Oregon', code: 'OR' }, { name: 'Pennsylvania', code: 'PA' },
    { name: 'Rhode Island', code: 'RI' }, { name: 'South Carolina', code: 'SC' },
    { name: 'South Dakota', code: 'SD' }, { name: 'Tennessee', code: 'TN' },
    { name: 'Texas', code: 'TX' }, { name: 'Utah', code: 'UT' },
    { name: 'Vermont', code: 'VT' }, { name: 'Virginia', code: 'VA' },
    { name: 'Washington', code: 'WA' }, { name: 'West Virginia', code: 'WV' },
    { name: 'Wisconsin', code: 'WI' }, { name: 'Wyoming', code: 'WY' },
  ], [])

  useEffect(() => {
    const nextMode = location.pathname === '/register' ? 'register' : 'login'
    setMode(nextMode)
  }, [location.pathname])

  // Detect if device is mobile
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  }, [])

  // Convert MM/DD/YYYY to Date object
  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      const month = parseInt(parts[0], 10)
      const day = parseInt(parts[1], 10)
      const year = parseInt(parts[2], 10)
      return new Date(year, month - 1, day)
    }
    return null
  }

  // Format date to MM/DD/YYYY
  const formatDateToMMDDYYYY = (date) => {
    if (!date) return ''
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()
    return `${month}/${day}/${year}`
  }

  // Calculate age from MM/DD/YYYY string
  const calculateAgeFromDisplay = (dateStr) => {
    const date = parseDate(dateStr)
    if (!date) return 0
    const today = new Date()
    let age = today.getFullYear() - date.getFullYear()
    const monthDiff = today.getMonth() - date.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age--
    }
    return age
  }

  // Validate date of birth (must be 18+)
  const validateDob = (value) => {
    if (!value) {
      setDobError('')
      return false
    }
    
    // Validate format MM/DD/YYYY
    const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d\d$/
    if (!dateRegex.test(value)) {
      setDobError('Invalid date format. Use MM/DD/YYYY')
      return false
    }
    
    const age = calculateAgeFromDisplay(value)
    if (age < 18) {
      setDobError('You must be at least 18 years old to register')
      return false
    }
    if (age > 100) {
      setDobError('Please enter a valid date of birth')
      return false
    }
    setDobError('')
    return true
  }

  // Handle DOB change with formatting
  const handleDobChange = (value) => {
    // Auto-format as user types
    let formatted = value.replace(/[^0-9]/g, '')
    if (formatted.length >= 3) {
      formatted = `${formatted.slice(0, 2)}/${formatted.slice(2)}`
    }
    if (formatted.length >= 6) {
      formatted = `${formatted.slice(0, 5)}/${formatted.slice(5, 9)}`
    }
    if (formatted.length > 10) {
      formatted = formatted.slice(0, 10)
    }
    
    setDobDisplay(formatted)
    
    // Validate when complete
    if (formatted.length === 10) {
      const dateObj = parseDate(formatted)
      if (dateObj) {
        setDob(formatDateToMMDDYYYY(dateObj))
        validateDob(formatted)
      } else {
        setDobError('Invalid date')
      }
    } else {
      setDobError('')
      setDob('')
    }
  }

  // Validate password strength
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

  // Handle phone number change with formatting
  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value)
    setPhoneNumber(formatted)
    const digits = formatted.replace(/\D/g, '')
    if (digits.length === 10) {
      setPhoneError('')
    } else if (digits.length > 0 && digits.length < 10) {
      setPhoneError('Phone number must be 10 digits')
    } else {
      setPhoneError('')
    }
  }

  // Handle ZIP code change with formatting
  const handleZipChange = (value) => {
    const formatted = formatZipCode(value)
    setZip(formatted)
    if (formatted.length === 5) {
      setZipError('')
    } else if (formatted.length > 0 && formatted.length < 5) {
      setZipError('ZIP code must be 5 digits')
    } else {
      setZipError('')
    }
  }

  // Handle password change with validation
  const handlePasswordChange = (value) => {
    setRegisterPassword(value)
    const validation = validatePassword(value)
    const strength = getPasswordStrength(value)
    setPasswordStrength(strength)
    if (!validation.valid && value.length > 0) {
      setPasswordError(validation.message)
    } else if (confirmPassword && value !== confirmPassword) {
      setPasswordError('Passwords do not match')
    } else {
      setPasswordError('')
    }
  }

  // Handle confirm password change
  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value)
    if (registerPassword !== value) {
      setPasswordError('Passwords do not match')
    } else {
      const validation = validatePassword(registerPassword)
      if (!validation.valid) {
        setPasswordError(validation.message)
      } else {
        setPasswordError('')
      }
    }
  }

  // Handle profile image upload from gallery
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle camera click
  const handleCameraClick = async () => {
    if (isMobile) {
      cameraRef.current?.click()
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        const video = document.createElement('video')
        video.srcObject = stream
        video.play()
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        setTimeout(() => {
          canvas.width = video.videoWidth
          canvas.height = video.videoHeight
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
          canvas.toBlob((blob) => {
            const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' })
            setProfileImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
              setProfilePreview(reader.result)
            }
            reader.readAsDataURL(file)
          }, 'image/jpeg', 0.8)
          stream.getTracks().forEach(track => track.stop())
        }, 500)
      } catch (err) {
        console.error('Camera error:', err)
        alert('Unable to access camera. Please check permissions.')
      }
    }
  }

const onSubmit = (e) => {
  e.preventDefault()
  
  if (mode === 'login') {
    console.log('Login:', loginUsername, loginPassword)
    return
  }
  
  const phoneDigits = phoneNumber.replace(/\D/g, '')
  const isPhoneValid = phoneDigits.length === 10
  const isZipValid = zip.length === 5
  const passwordValidation = validatePassword(registerPassword)
  const isPasswordValid = passwordValidation.valid && registerPassword === confirmPassword
  
  // Validate DOB
  let isAgeValid = false
  if (dobDisplay.length === 10) {
    const age = calculateAgeFromDisplay(dobDisplay)
    isAgeValid = age >= 18
    if (!isAgeValid) {
      setDobError('You must be at least 18 years old to register')
    }
  } else {
    setDobError('Please enter valid date of birth (MM/DD/YYYY)')
  }
  
  if (!isPhoneValid) {
    setPhoneError('Phone number must be 10 digits')
  }
  if (!isZipValid) {
    setZipError('ZIP code must be 5 digits')
  }
  if (!passwordValidation.valid) {
    setPasswordError(passwordValidation.message)
  }
  if (registerPassword !== confirmPassword) {
    setPasswordError('Passwords do not match')
  }
  
  if (isPhoneValid && isZipValid && isPasswordValid && isAgeValid && dobDisplay.length === 10) {
    // ✅ ADD THIS - Store data in localStorage for email verification callback
    localStorage.setItem('pendingEmail', email)
    localStorage.setItem('pendingPassword', registerPassword)
    localStorage.setItem('pendingPhoneNumber', phoneNumber)
    localStorage.setItem('pendingFirstName', firstName)
    localStorage.setItem('pendingLastName', lastName)
    localStorage.setItem('pendingDob', dobDisplay)
    localStorage.setItem('pendingAddress', address)
    localStorage.setItem('pendingCity', city)
    localStorage.setItem('pendingState', stateUS)
    localStorage.setItem('pendingZip', zip)
    localStorage.setItem('pendingLanguage', language)
    
    navigate('/verify', { 
      state: { 
        email, 
        phoneNumber, 
        fullName: `${firstName} ${lastName}`,
        firstName,
        lastName,
        profilePreview,
        registerPassword,
        dob: dobDisplay
      } 
    })
  }
}

  const getStrengthColor = () => {
    switch(passwordStrength) {
      case 'Weak': return '#e11d48'
      case 'Medium': return '#f59e0b'
      case 'Strong': return '#2fb463'
      default: return 'rgba(23,38,58,0.3)'
    }
  }

  return (
    <div className="authPage">
      <div className="bg bgAuth" />
      <div className="bgOverlay" />
      <main className="authMain">
        <div className="authBrand">
          <img className="authLogo" src="/assets/logo_tradesmap.png" alt="" />
        </div>
        <div className="authCard authCardCompact">
          <div className={`tabs ${mode}`}>
            <button className={`tab ${mode === 'login' ? 'tabActive' : ''}`} onClick={() => navigate('/login')}>Log in</button>
            <button className={`tab ${mode === 'register' ? 'tabActive' : ''}`} onClick={() => navigate('/register')}>Register</button>
            <div className={`tabIndicator ${mode === 'login' ? 'tabLeft' : 'tabRight'}`} />
          </div>
          
          <form onSubmit={onSubmit}>
            {mode === 'login' ? (
              <>
                <TextField placeholder="Username" icon={<IconUser />} value={loginUsername} onChange={setLoginUsername} />
                <TextField type="password" placeholder="Password" icon={<IconLock />} value={loginPassword} onChange={setLoginPassword} />
                <button type="submit" className="btn btnPrimary">Log in</button>
              </>
            ) : (
              <>
                {/* Profile Picture Row */}
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ 
                      width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(15,78,169,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden',
                      border: '2px solid rgba(15,78,169,0.2)', margin: '0 auto'
                    }}>
                      {profilePreview ? (
                        <img src={profilePreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <IconUser style={{ width: '40px', height: '40px', color: 'rgba(15,78,169,0.5)' }} />
                      )}
                    </div>
                    
                    <input ref={uploadRef} type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
                    <input ref={cameraRef} type="file" accept="image/*" capture={isMobile ? 'environment' : undefined} onChange={handleFileUpload} style={{ display: 'none' }} />
                    
                    <div style={{ display: 'flex', gap: '12px', marginTop: '12px', justifyContent: 'center' }}>
                      <button type="button" onClick={() => uploadRef.current?.click()} style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                        background: 'rgba(15,78,169,0.1)', borderRadius: '25px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: '600', border: 'none', justifyContent: 'center'
                      }}>
                        <IconUpload style={{ width: '14px', height: '14px' }} /> Upload
                      </button>
                      <button type="button" onClick={handleCameraClick} style={{ 
                        display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px',
                        background: 'rgba(15,78,169,0.1)', borderRadius: '25px', cursor: 'pointer',
                        fontSize: '13px', fontWeight: '600', border: 'none', justifyContent: 'center'
                      }}>
                        <IconCamera style={{ width: '14px', height: '14px' }} /> {isMobile ? 'Camera' : 'Webcam'}
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* First Name + Last Name Row */}
                <div className="formGrid2">
                  <TextField placeholder="First name" icon={<IconUser />} value={firstName} onChange={setFirstName} />
                  <TextField placeholder="Last name" icon={<IconUser />} value={lastName} onChange={setLastName} />
                </div>
                
                {/* Email + Date of Birth Row */}
                <div className="formGrid2">
                  <TextField placeholder="Email" icon={<IconMail />} value={email} onChange={setEmail} />
                  <div>
                    <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '12px', height: '48px', background: 'white', width: '100%' }}>
                      <span style={{ 
                        padding: '0 12px', display: 'flex', alignItems: 'center', 
                        borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
                      }}>
                        📅
                      </span>
                      <input 
                        type="text"
                        placeholder="MM/DD/YYYY"
                        value={dobDisplay}
                        onChange={(e) => handleDobChange(e.target.value)}
                        maxLength={10}
                        style={{ 
                          flex: 1, border: 'none', outline: 'none', padding: '0 12px',
                          borderRadius: '12px', fontSize: '14px'
                        }}
                      />
                    </div>
                    {dobError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>{dobError}</div>}
                    {!dobError && dobDisplay.length === 10 && calculateAgeFromDisplay(dobDisplay) >= 18 && (
                      <div style={{ color: '#2fb463', fontSize: '11px', marginTop: '4px' }}>✓ Age: {calculateAgeFromDisplay(dobDisplay)} years</div>
                    )}
                  </div>
                </div>
                
                {/* Phone + Language Row */}
                <div className="formGrid2">
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '12px', height: '48px', background: 'white', width: '100%' }}>
                      <span style={{ 
                        padding: '0 12px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '14px',
                        borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
                      }}>🇺🇸 +1</span>
                      <input 
                        type="tel" placeholder="555-555-5555" value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)} maxLength={12}
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '0 12px', borderRadius: '12px', fontSize: '14px' }}
                      />
                    </div>
                    {phoneError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>{phoneError}</div>}
                  </div>
                  <SelectField icon={<IconGlobe />} value={language} onChange={setLanguage}>
                    <option value="" disabled>Language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </SelectField>
                </div>
                
                {/* Address */}
                <TextField placeholder="Address" icon={<IconLocation />} value={address} onChange={setAddress} />
                
                {/* City + State + Zip Row */}
                <div className="formGrid3">
                  <TextField placeholder="City" value={city} onChange={setCity} />
                  <SelectField value={stateUS} onChange={setStateUS}>
                    <option value="" disabled>State</option>
                    {usStates.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
                  </SelectField>
                  <div>
                    <TextField placeholder="Zip Code" value={zip} onChange={handleZipChange} maxLength={5} />
                    {zipError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>{zipError}</div>}
                  </div>
                </div>
                
                {/* Password + Confirm Password Row */}
                <div className="formGrid2">
                  <div style={{ width: '100%' }}>
                    <TextField type="password" placeholder="Password" icon={<IconLock />} value={registerPassword} onChange={handlePasswordChange} />
                    {registerPassword && (
                      <div style={{ marginTop: '4px' }}>
                        <div style={{ height: '3px', background: getStrengthColor(), width: passwordStrength === 'Weak' ? '33%' : passwordStrength === 'Medium' ? '66%' : '100%', borderRadius: '3px' }} />
                        <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>{passwordStrength} password</span>
                        <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>(min 8 chars, letters & numbers)</span>
                      </div>
                    )}
                  </div>
                  <TextField type="password" placeholder="Confirm Password" icon={<IconLock />} value={confirmPassword} onChange={handleConfirmPasswordChange} />
                </div>
                {passwordError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '-8px' }}>{passwordError}</div>}
                
                {/* Submit Button */}
                <button type="submit" className="btn btnSuccess">Create account</button>
              </>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}