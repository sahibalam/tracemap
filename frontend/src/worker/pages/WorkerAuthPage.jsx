// // src/worker/pages/WorkerAuthPage.jsx
// import { useState, useEffect, useMemo } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TextField, SelectField } from '../../common/components/TextField'
// import { IconUser, IconMail, IconLock, IconPhone, IconLocation, IconGlobe } from '../../common/components/Icons'
// import { formatPhoneNumber, formatZipCode } from '../../common/utils/validation'

// export function WorkerAuthPage({ initialMode = 'login' }) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [mode, setMode] = useState(initialMode)
//   const [loginUsername, setLoginUsername] = useState('')
//   const [loginPassword, setLoginPassword] = useState('')
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [dob, setDob] = useState('')
//   const [registerPassword, setRegisterPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [city, setCity] = useState('')
//   const [stateUS, setStateUS] = useState('')
//   const [zip, setZip] = useState('')
//   const [language, setLanguage] = useState('')
  
//   // Validation errors
//   const [phoneError, setPhoneError] = useState('')
//   const [zipError, setZipError] = useState('')
//   const [passwordError, setPasswordError] = useState('')
//   const [passwordStrength, setPasswordStrength] = useState('')
//   const [dobError, setDobError] = useState('')

//   const usStates = useMemo(() => [
//     { name: 'Alabama', code: 'AL' }, { name: 'Alaska', code: 'AK' },
//     { name: 'Arizona', code: 'AZ' }, { name: 'Arkansas', code: 'AR' },
//     { name: 'California', code: 'CA' }, { name: 'Colorado', code: 'CO' },
//     { name: 'Connecticut', code: 'CT' }, { name: 'Delaware', code: 'DE' },
//     { name: 'Florida', code: 'FL' }, { name: 'Georgia', code: 'GA' },
//     { name: 'Hawaii', code: 'HI' }, { name: 'Idaho', code: 'ID' },
//     { name: 'Illinois', code: 'IL' }, { name: 'Indiana', code: 'IN' },
//     { name: 'Iowa', code: 'IA' }, { name: 'Kansas', code: 'KS' },
//     { name: 'Kentucky', code: 'KY' }, { name: 'Louisiana', code: 'LA' },
//     { name: 'Maine', code: 'ME' }, { name: 'Maryland', code: 'MD' },
//     { name: 'Massachusetts', code: 'MA' }, { name: 'Michigan', code: 'MI' },
//     { name: 'Minnesota', code: 'MN' }, { name: 'Mississippi', code: 'MS' },
//     { name: 'Missouri', code: 'MO' }, { name: 'Montana', code: 'MT' },
//     { name: 'Nebraska', code: 'NE' }, { name: 'Nevada', code: 'NV' },
//     { name: 'New Hampshire', code: 'NH' }, { name: 'New Jersey', code: 'NJ' },
//     { name: 'New Mexico', code: 'NM' }, { name: 'New York', code: 'NY' },
//     { name: 'North Carolina', code: 'NC' }, { name: 'North Dakota', code: 'ND' },
//     { name: 'Ohio', code: 'OH' }, { name: 'Oklahoma', code: 'OK' },
//     { name: 'Oregon', code: 'OR' }, { name: 'Pennsylvania', code: 'PA' },
//     { name: 'Rhode Island', code: 'RI' }, { name: 'South Carolina', code: 'SC' },
//     { name: 'South Dakota', code: 'SD' }, { name: 'Tennessee', code: 'TN' },
//     { name: 'Texas', code: 'TX' }, { name: 'Utah', code: 'UT' },
//     { name: 'Vermont', code: 'VT' }, { name: 'Virginia', code: 'VA' },
//     { name: 'Washington', code: 'WA' }, { name: 'West Virginia', code: 'WV' },
//     { name: 'Wisconsin', code: 'WI' }, { name: 'Wyoming', code: 'WY' },
//   ], [])

//   useEffect(() => {
//     const nextMode = location.pathname === '/register' ? 'register' : 'login'
//     setMode(nextMode)
//   }, [location.pathname])

//   // Calculate age from date
//   const calculateAge = (dateStr) => {
//     if (!dateStr) return 0
//     const birth = new Date(dateStr)
//     const today = new Date()
//     let age = today.getFullYear() - birth.getFullYear()
//     const monthDiff = today.getMonth() - birth.getMonth()
//     if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
//       age--
//     }
//     return age
//   }

//   // Format date to MM/DD/YYYY for display
//   const formatDateToMMDDYYYY = (dateStr) => {
//     if (!dateStr) return ''
//     const parts = dateStr.split('-')
//     if (parts.length === 3) {
//       return `${parts[1]}/${parts[2]}/${parts[0]}`
//     }
//     return dateStr
//   }

//   // Validate date of birth (must be 18+)
//   const validateDob = (dateStr) => {
//     if (!dateStr) {
//       setDobError('')
//       return false
//     }
    
//     const age = calculateAge(dateStr)
//     if (age < 18) {
//       setDobError('You must be at least 18 years old to register')
//       return false
//     }
//     if (age > 100) {
//       setDobError('Please enter a valid date of birth')
//       return false
//     }
//     setDobError('')
//     return true
//   }

//   // Handle DOB change
//   const handleDobChange = (value) => {
//     setDob(value)
//     validateDob(value)
//   }

//   // Get max date for 18 years ago
//   const getMaxDate = () => {
//     const date = new Date()
//     date.setFullYear(date.getFullYear() - 18)
//     return date.toISOString().split('T')[0]
//   }

//   // Validate password strength
//   const validatePassword = (password) => {
//     if (password.length < 8) {
//       return { valid: false, message: 'Password must be at least 8 characters' }
//     }
//     const hasLetter = /[A-Za-z]/.test(password)
//     const hasNumber = /[0-9]/.test(password)
//     if (!hasLetter || !hasNumber) {
//       return { valid: false, message: 'Password must contain both letters and numbers' }
//     }
//     return { valid: true, message: '' }
//   }

//   // Get password strength indicator
//   const getPasswordStrength = (password) => {
//     if (!password) return ''
//     let strength = 0
//     if (password.length >= 8) strength++
//     if (/[A-Za-z]/.test(password)) strength++
//     if (/[0-9]/.test(password)) strength++
//     if (/[A-Z]/.test(password)) strength++
//     if (/[a-z]/.test(password)) strength++
//     if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength++
//     if (strength <= 2) return 'Weak'
//     if (strength <= 4) return 'Medium'
//     return 'Strong'
//   }

//   // Handle phone number change with formatting
//   const handlePhoneChange = (value) => {
//     const formatted = formatPhoneNumber(value)
//     setPhoneNumber(formatted)
//     const digits = formatted.replace(/\D/g, '')
//     if (digits.length === 10) {
//       setPhoneError('')
//     } else if (digits.length > 0 && digits.length < 10) {
//       setPhoneError('Phone number must be 10 digits')
//     } else {
//       setPhoneError('')
//     }
//   }

//   // Handle ZIP code change with formatting
//   const handleZipChange = (value) => {
//     const formatted = formatZipCode(value)
//     setZip(formatted)
//     if (formatted.length === 5) {
//       setZipError('')
//     } else if (formatted.length > 0 && formatted.length < 5) {
//       setZipError('ZIP code must be 5 digits')
//     } else {
//       setZipError('')
//     }
//   }

//   // Handle password change with validation
//   const handlePasswordChange = (value) => {
//     setRegisterPassword(value)
//     const validation = validatePassword(value)
//     const strength = getPasswordStrength(value)
//     setPasswordStrength(strength)
//     if (!validation.valid && value.length > 0) {
//       setPasswordError(validation.message)
//     } else if (confirmPassword && value !== confirmPassword) {
//       setPasswordError('Passwords do not match')
//     } else {
//       setPasswordError('')
//     }
//   }

//   // Handle confirm password change
//   const handleConfirmPasswordChange = (value) => {
//     setConfirmPassword(value)
//     if (registerPassword !== value) {
//       setPasswordError('Passwords do not match')
//     } else {
//       const validation = validatePassword(registerPassword)
//       if (!validation.valid) {
//         setPasswordError(validation.message)
//       } else {
//         setPasswordError('')
//       }
//     }
//   }

//   const onSubmit = (e) => {
//     e.preventDefault()
    
//     if (mode === 'login') {
//       console.log('Login:', loginUsername, loginPassword)
//       return
//     }
    
//     const phoneDigits = phoneNumber.replace(/\D/g, '')
//     const isPhoneValid = phoneDigits.length === 10
//     const isZipValid = zip.length === 5
//     const passwordValidation = validatePassword(registerPassword)
//     const isPasswordValid = passwordValidation.valid && registerPassword === confirmPassword
    
//     // Validate DOB
//     const age = calculateAge(dob)
//     const isAgeValid = age >= 18
    
//     if (!isAgeValid) {
//       setDobError('You must be at least 18 years old to register')
//     }
    
//     if (!isPhoneValid) {
//       setPhoneError('Phone number must be 10 digits')
//     }
//     if (!isZipValid) {
//       setZipError('ZIP code must be 5 digits')
//     }
//     if (!passwordValidation.valid) {
//       setPasswordError(passwordValidation.message)
//     }
//     if (registerPassword !== confirmPassword) {
//       setPasswordError('Passwords do not match')
//     }
    
//     if (isPhoneValid && isZipValid && isPasswordValid && isAgeValid) {
//       // Store data in localStorage for email verification callback
//       localStorage.setItem('pendingEmail', email)
//       localStorage.setItem('pendingPassword', registerPassword)
//       localStorage.setItem('pendingPhoneNumber', phoneNumber)
//       localStorage.setItem('pendingFirstName', firstName)
//       localStorage.setItem('pendingLastName', lastName)
//       localStorage.setItem('pendingDob', dob)
//       localStorage.setItem('pendingCity', city)
//       localStorage.setItem('pendingState', stateUS)
//       localStorage.setItem('pendingZip', zip)
//       localStorage.setItem('pendingLanguage', language)
      
//       navigate('/verify', { 
//         state: { 
//           email, 
//           phoneNumber, 
//           fullName: `${firstName} ${lastName}`,
//           firstName,
//           lastName,
//           registerPassword,
//           dob
//         } 
//       })
//     }
//   }

//   const getStrengthColor = () => {
//     switch(passwordStrength) {
//       case 'Weak': return '#e11d48'
//       case 'Medium': return '#f59e0b'
//       case 'Strong': return '#2fb463'
//       default: return 'rgba(23,38,58,0.3)'
//     }
//   }

//   const getDobDisplay = () => {
//     if (!dob) return ''
//     return formatDateToMMDDYYYY(dob)
//   }

//   return (
//     <div className="authPage">
//       <div className="bg bgAuth" />
//       <div className="bgOverlay" />
//       <main className="authMain">
//         <div className="authBrand">
//           <img className="authLogo" src="/assets/logo_tradesmap.png" alt="" />
//         </div>
//         <div className="authCard authCardCompact">
//           <div className={`tabs ${mode}`}>
//             <button className={`tab ${mode === 'login' ? 'tabActive' : ''}`} onClick={() => navigate('/login')}>Log in</button>
//             <button className={`tab ${mode === 'register' ? 'tabActive' : ''}`} onClick={() => navigate('/register')}>Register</button>
//             <div className={`tabIndicator ${mode === 'login' ? 'tabLeft' : 'tabRight'}`} />
//           </div>
          
//           <form onSubmit={onSubmit}>
//             {mode === 'login' ? (
//               <>
//                 <TextField placeholder="Username" icon={<IconUser />} value={loginUsername} onChange={setLoginUsername} />
//                 <TextField type="password" placeholder="Password" icon={<IconLock />} value={loginPassword} onChange={setLoginPassword} />
//                 <button type="submit" className="btn btnPrimary">Log in</button>
//               </>
//             ) : (
//               <>
//                 {/* First Name + Last Name Row */}
//                 <div className="formGrid2">
//                   <TextField placeholder="First name" icon={<IconUser />} value={firstName} onChange={setFirstName} />
//                   <TextField placeholder="Last name" icon={<IconUser />} value={lastName} onChange={setLastName} />
//                 </div>
                
//                 {/* Email + Date of Birth Row */}
//                 <div className="formGrid2">
//                   <TextField placeholder="Email" icon={<IconMail />} value={email} onChange={setEmail} />
//                   <div>
//                     <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '12px', height: '48px', background: 'white', width: '100%' }}>
//                       <span style={{ 
//                         padding: '0 12px', display: 'flex', alignItems: 'center', 
//                         borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
//                       }}>
//                         📅
//                       </span>
//                       <input 
//                         type="date"
//                         value={dob}
//                         onChange={(e) => handleDobChange(e.target.value)}
//                         max={getMaxDate()}
//                         style={{ 
//                           flex: 1, border: 'none', outline: 'none', padding: '0 12px',
//                           borderRadius: '12px', fontSize: '14px'
//                         }}
//                       />
//                     </div>
//                     {dobError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>{dobError}</div>}
//                     {!dobError && dob && calculateAge(dob) >= 18 && (
//                       <div style={{ color: '#2fb463', fontSize: '11px', marginTop: '4px' }}>
//                         ✓ Age: {calculateAge(dob)} years (DOB: {getDobDisplay()})
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 {/* Phone + Language Row */}
//                 <div className="formGrid2">
//                   <div style={{ width: '100%' }}>
//                     <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '12px', height: '48px', background: 'white', width: '100%' }}>
//                       <span style={{ 
//                         padding: '0 12px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '14px',
//                         borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
//                       }}>
//                         +1
//                       </span>
//                       <input 
//                         type="tel" placeholder="555-555-5555" value={phoneNumber}
//                         onChange={(e) => handlePhoneChange(e.target.value)} maxLength={12}
//                         style={{ flex: 1, border: 'none', outline: 'none', padding: '0 12px', borderRadius: '12px', fontSize: '14px' }}
//                       />
//                     </div>
//                     {phoneError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>{phoneError}</div>}
//                   </div>
//                   <SelectField icon={<IconGlobe />} value={language} onChange={setLanguage}>
//                     <option value="" disabled>Language</option>
//                     <option value="en">English</option>
//                     <option value="es">Spanish</option>
//                   </SelectField>
//                 </div>
                
//                 {/* City + State + Zip Row */}
//                 <div className="formGrid3">
//                   <TextField placeholder="City" value={city} onChange={setCity} />
//                   <SelectField value={stateUS} onChange={setStateUS}>
//                     <option value="" disabled>State</option>
//                     {usStates.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
//                   </SelectField>
//                   <div>
//                     <TextField placeholder="Zip Code" value={zip} onChange={handleZipChange} maxLength={5} />
//                     {zipError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>{zipError}</div>}
//                   </div>
//                 </div>
                
//                 {/* Password + Confirm Password Row */}
//                 <div className="formGrid2">
//                   <div style={{ width: '100%' }}>
//                     <TextField type="password" placeholder="Password" icon={<IconLock />} value={registerPassword} onChange={handlePasswordChange} />
//                     {registerPassword && (
//                       <div style={{ marginTop: '4px' }}>
//                         <div style={{ height: '3px', background: getStrengthColor(), width: passwordStrength === 'Weak' ? '33%' : passwordStrength === 'Medium' ? '66%' : '100%', borderRadius: '3px' }} />
//                         <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>{passwordStrength} password</span>
//                         <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>(min 8 chars, letters & numbers)</span>
//                       </div>
//                     )}
//                   </div>
//                   <TextField type="password" placeholder="Confirm Password" icon={<IconLock />} value={confirmPassword} onChange={handleConfirmPasswordChange} />
//                 </div>
//                 {passwordError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '-8px' }}>{passwordError}</div>}
                
//                 {/* Submit Button */}
//                 <button type="submit" className="btn btnSuccess">Create account</button>
//               </>
//             )}
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }

// // Add this default export at the end
// export default WorkerAuthPage



// src/worker/pages/WorkerAuthPage.jsx
import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TextField, SelectField } from '../../common/components/TextField'
import { IconUser, IconMail, IconLock, IconPhone, IconLocation, IconGlobe } from '../../common/components/Icons'
import { formatPhoneNumber } from '../../common/utils/validation'

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
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [language, setLanguage] = useState('')
  
  // Validation errors
  const [phoneError, setPhoneError] = useState('')
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

  // Calculate age from date
  const calculateAge = (dateStr) => {
    if (!dateStr) return 0
    const birth = new Date(dateStr)
    const today = new Date()
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  // Format date to MM/DD/YYYY for display
  const formatDateToMMDDYYYY = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('-')
    if (parts.length === 3) {
      return `${parts[1]}/${parts[2]}/${parts[0]}`
    }
    return dateStr
  }

  // Validate date of birth (must be 18+)
  const validateDob = (dateStr) => {
    if (!dateStr) {
      setDobError('')
      return false
    }
    
    const age = calculateAge(dateStr)
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

  // Handle DOB change
  const handleDobChange = (value) => {
    setDob(value)
    validateDob(value)
  }

  // Get max date for 18 years ago
  const getMaxDate = () => {
    const date = new Date()
    date.setFullYear(date.getFullYear() - 18)
    return date.toISOString().split('T')[0]
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

  const onSubmit = (e) => {
    e.preventDefault()
    
    if (mode === 'login') {
      console.log('Login:', loginUsername, loginPassword)
      return
    }
    
    const phoneDigits = phoneNumber.replace(/\D/g, '')
    const isPhoneValid = phoneDigits.length === 10
    const passwordValidation = validatePassword(registerPassword)
    const isPasswordValid = passwordValidation.valid && registerPassword === confirmPassword
    
    // Validate DOB
    const age = calculateAge(dob)
    const isAgeValid = age >= 18
    
    if (!isAgeValid) {
      setDobError('You must be at least 18 years old to register')
    }
    
    if (!isPhoneValid) {
      setPhoneError('Phone number must be 10 digits')
    }
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.message)
    }
    if (registerPassword !== confirmPassword) {
      setPasswordError('Passwords do not match')
    }
    
    if (isPhoneValid && isPasswordValid && isAgeValid) {
      // Store data in localStorage for email verification callback
      localStorage.setItem('pendingEmail', email)
      localStorage.setItem('pendingPassword', registerPassword)
      localStorage.setItem('pendingPhoneNumber', phoneNumber)
      localStorage.setItem('pendingFirstName', firstName)
      localStorage.setItem('pendingLastName', lastName)
      localStorage.setItem('pendingDob', dob)
      localStorage.setItem('pendingLanguage', language)
      
      navigate('/verify', { 
        state: { 
          email, 
          phoneNumber, 
          fullName: `${firstName} ${lastName}`,
          firstName,
          lastName,
          registerPassword,
          dob
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

  const getDobDisplay = () => {
    if (!dob) return ''
    return formatDateToMMDDYYYY(dob)
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
                        type="date"
                        value={dob}
                        onChange={(e) => handleDobChange(e.target.value)}
                        max={getMaxDate()}
                        style={{ 
                          flex: 1, border: 'none', outline: 'none', padding: '0 12px',
                          borderRadius: '12px', fontSize: '14px'
                        }}
                      />
                    </div>
                    {dobError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>{dobError}</div>}
                    {!dobError && dob && calculateAge(dob) >= 18 && (
                      <div style={{ color: '#2fb463', fontSize: '11px', marginTop: '4px' }}>
                        ✓ Age: {calculateAge(dob)} years (DOB: {getDobDisplay()})
                      </div>
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
                      }}>
                        +1
                      </span>
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

// Add this default export at the end
export default WorkerAuthPage