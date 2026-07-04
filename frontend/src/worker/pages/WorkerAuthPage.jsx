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


// // src/worker/pages/WorkerAuthPage.jsx
// import { useState, useEffect, useMemo } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TextField, SelectField } from '../../common/components/TextField'
// import { IconUser, IconMail, IconLock, IconPhone, IconGlobe } from '../../common/components/Icons'
// import { formatPhoneNumber } from '../../common/utils/validation'

// // Eye icon component
// function IconEye(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconEyeOff(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
//     </svg>
//   )
// }

// // Custom Password Input Component
// function PasswordInput({ placeholder, value, onChange, icon, showPassword, onToggle }) {
//   return (
//     <div className="password-input-wrapper">
//       <div className="password-input-container">
//         <span className="password-input-icon">{icon}</span>
//         <input
//           type={showPassword ? 'text' : 'password'}
//           className="password-input-field"
//           placeholder={placeholder}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />
//         <button
//           type="button"
//           className="password-eye-btn"
//           onClick={onToggle}
//           aria-label={showPassword ? 'Hide password' : 'Show password'}
//         >
//           {showPassword ? <IconEyeOff /> : <IconEye />}
//         </button>
//       </div>
//     </div>
//   )
// }

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
//   const [language, setLanguage] = useState('')
  
//   // Password visibility states
//   const [showLoginPassword, setShowLoginPassword] = useState(false)
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
//   // Validation errors
//   const [phoneError, setPhoneError] = useState('')
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
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return `${parts[0]}/${parts[1]}/${parts[2]}`
//     }
//     return dateStr
//   }

//   // Format date to YYYY-MM-DD for storage
//   const formatDateToYYYYMMDD = (dateStr) => {
//     if (!dateStr) return ''
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return `${parts[2]}-${parts[0]}-${parts[1]}`
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

//   // Handle date change from react-datepicker
//   const handleDateChange = (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       const formattedDate = `${month}/${day}/${year}`
//       setDob(formattedDate)
//       validateDob(formattedDate)
//     } else {
//       setDob('')
//       setDobError('')
//     }
//   }

//   // Parse date string to Date object for react-datepicker
//   const parseDate = (dateStr) => {
//     if (!dateStr) return null
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
//     }
//     return null
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

//  const onSubmit = (e) => {
//   e.preventDefault()
  
//   if (mode === 'login') {
//     console.log('Login:', loginUsername, loginPassword)
//     return
//   }
  
//   const phoneDigits = phoneNumber.replace(/\D/g, '')
//   const isPhoneValid = phoneDigits.length === 10
//   const passwordValidation = validatePassword(registerPassword)
//   const isPasswordValid = passwordValidation.valid && registerPassword === confirmPassword
  
//   const age = calculateAge(formatDateToYYYYMMDD(dob))
//   const isAgeValid = age >= 18
  
//   if (!isAgeValid) {
//     setDobError('You must be at least 18 years old to register')
//   }
  
//   if (!isPhoneValid) {
//     setPhoneError('Phone number must be 10 digits')
//   }
//   if (!passwordValidation.valid) {
//     setPasswordError(passwordValidation.message)
//   }
//   if (registerPassword !== confirmPassword) {
//     setPasswordError('Passwords do not match')
//   }
  
//   if (isPhoneValid && isPasswordValid && isAgeValid) {
//     // ✅ Store in localStorage (for email verification callback)
//     localStorage.setItem('pendingEmail', email)
//     localStorage.setItem('pendingPassword', registerPassword)
//     localStorage.setItem('pendingPhoneNumber', phoneNumber)
//     localStorage.setItem('pendingFirstName', firstName)
//     localStorage.setItem('pendingLastName', lastName)
//     localStorage.setItem('pendingDob', formatDateToYYYYMMDD(dob))
//     localStorage.setItem('pendingLanguage', language)
    
//     // ✅ ALSO store in sessionStorage (for wizard auto-populate)
//     sessionStorage.setItem('wizardFirstName', firstName)
//     sessionStorage.setItem('wizardLastName', lastName)
//     sessionStorage.setItem('wizardEmail', email)
//     sessionStorage.setItem('wizardPhone', phoneNumber)
//     sessionStorage.setItem('wizardDob', formatDateToYYYYMMDD(dob))
//     sessionStorage.setItem('wizardLanguage', language)
//     sessionStorage.setItem('wizardFromRegister', 'true')
    
//     navigate('/verify', { 
//       state: { 
//         email, 
//         phoneNumber, 
//         fullName: `${firstName} ${lastName}`,
//         firstName,
//         lastName,
//         registerPassword,
//         dob: formatDateToYYYYMMDD(dob)
//       } 
//     })
//   }
// }

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

//   const customStyles = `
//     .auth-date-picker .react-datepicker__input-container input {
//       width: 100%;
//       height: 44px;
//       padding: 0 12px;
//       padding-right: 36px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 10px;
//       font-size: 14px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//       cursor: pointer;
//     }

//     .auth-date-picker .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .auth-date-picker .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .auth-date-picker .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .auth-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//       z-index: 1000;
//     }

//     .auth-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }

//     .auth-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }

//     .auth-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }

//     .auth-date-picker .react-datepicker__day {
//       width: 32px;
//       height: 32px;
//       line-height: 32px;
//       margin: 2px;
//       border-radius: 8px;
//       font-size: 13px;
//       color: #17263a;
//       transition: all 0.15s ease;
//       cursor: pointer;
//     }

//     .auth-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }

//     .auth-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }

//     .auth-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }

//     .auth-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }

//     .auth-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }

//     .auth-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }

//     .auth-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }

//     .auth-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }

//     .auth-date-picker .react-datepicker__day--outside-month {
//       color: rgba(23, 38, 58, 0.2);
//     }

//     .auth-date-picker .react-datepicker__navigation {
//       top: 12px;
//       background: transparent;
//       border: none;
//       cursor: pointer;
//       padding: 0;
//       width: 28px;
//       height: 28px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       border-radius: 6px;
//       transition: all 0.15s ease;
//     }

//     .auth-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }

//     .auth-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }

//     .auth-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }

//     .auth-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }

//     .auth-date-picker .react-datepicker__input-container {
//       position: relative;
//       width: 100%;
//     }

//     .auth-date-picker .react-datepicker-wrapper {
//       width: 100%;
//     }

//     .auth-date-picker .react-datepicker__input-container::after {
//       content: '📅';
//       position: absolute;
//       right: 12px;
//       top: 50%;
//       transform: translateY(-50%);
//       font-size: 16px;
//       pointer-events: none;
//       opacity: 0.6;
//     }

//     .auth-date-picker .react-datepicker-popper {
//       z-index: 9999 !important;
//     }

//     .password-input-wrapper {
//       width: 100%;
//       max-width: 100%;
//       box-sizing: border-box;
//     }

//     .password-input-container {
//       position: relative;
//       display: flex;
//       align-items: center;
//       width: 100%;
//       height: 44px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 10px;
//       background: white;
//       transition: all 0.2s ease;
//       box-sizing: border-box;
//       overflow: hidden;
//     }

//     .password-input-container:focus-within {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .password-input-container:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .password-input-icon {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 0 10px;
//       color: rgba(23, 38, 58, 0.4);
//       flex-shrink: 0;
//       min-width: 38px;
//     }

//     .password-input-icon svg {
//       width: 18px;
//       height: 18px;
//     }

//     .password-input-field {
//       flex: 1;
//       height: 100%;
//       border: none;
//       outline: none;
//       padding: 0 4px;
//       font-size: 14px;
//       color: #17263a;
//       background: transparent;
//       font-family: inherit;
//       min-width: 0;
//       width: 100%;
//     }

//     .password-input-field::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .password-eye-btn {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 0 10px;
//       background: none;
//       border: none;
//       cursor: pointer;
//       color: rgba(23, 38, 58, 0.4);
//       transition: color 0.2s ease;
//       flex-shrink: 0;
//       height: 100%;
//       min-width: 38px;
//     }

//     .password-eye-btn:hover {
//       color: #0f4ea9;
//     }

//     .password-eye-btn:focus {
//       outline: none;
//     }

//     .password-eye-btn svg {
//       width: 18px;
//       height: 18px;
//     }

//     .formGrid2 {
//       display: grid;
//       grid-template-columns: 1fr 1fr;
//       gap: 7px;
//       width: 100%;
//       max-width: 100%;
//       box-sizing: border-box;
//       margin-bottom: 2px;
//     }

//     .formGrid2 > * {
//       min-width: 0;
//       max-width: 100%;
//       box-sizing: border-box;
//     }

//     .authCardCompact {
//       max-width: 100%;
//       overflow: hidden;
//       padding: 16px 20px 20px 20px;
//       max-height: 90vh;
//       overflow-y: auto;
//     }

//     .authCard {
//       max-width: 100%;
//       box-sizing: border-box;
//     }

//     .authMain {
//       max-width: 100%;
//       padding: 20px;
//       box-sizing: border-box;
//     }

//     .password-strength-container {
//       margin-top: 2px;
//       margin-bottom: 4px;
//       padding: 0 2px;
//     }

//     .password-strength-bar {
//       height: 3px;
//       border-radius: 3px;
//       transition: width 0.3s ease;
//       margin-bottom: 2px;
//     }

//     .btn {
//       margin-top: 4px;
//       width: 100%;
//       padding: 10px;
//       font-size: 14px;
//     }
// .createAccountBtn {
//   width: 180px !important;
//   height: 24px !important;
//   min-height: 24px !important;
//   padding: 0 !important;
//   font-size: 13px !important;
//   margin: 6px auto 0 !important;
//   display: block !important;
// }

//     .field {
//       margin-bottom: 0 !important;
//     }

//     .formGrid2 .field {
//       margin-bottom: 0 !important;
//     }

//     .auth-date-picker {
//       margin-bottom: 0;
//     }

//     .auth-date-picker .react-datepicker__input-container input {
//       margin-bottom: 0;
//     }

//     .authBrand {
//       margin-bottom: 12px;
//       text-align: center;
//     }

//     .authBrand .authLogo {
//       max-height: 120px;
//       width: auto;
//     }

//     .tabs {
//       margin-bottom: 12px;
//     }

//     .tab {
//       padding: 8px 20px;
//       font-size: 14px;
//     }

//     form {
//       display: flex;
//       flex-direction: column;
//       gap: 2px;
//     }
//   `

//   return (
//     <div className="authPage">
//       <style>{customStyles}</style>
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
//                 <PasswordInput
//                   placeholder="Password"
//                   icon={<IconLock />}
//                   value={loginPassword}
//                   onChange={setLoginPassword}
//                   showPassword={showLoginPassword}
//                   onToggle={() => setShowLoginPassword(!showLoginPassword)}
//                 />
//                 <button type="submit" className="btn btnPrimary">Log in</button>
//               </>
//             ) : (
//               <>
//                 <div className="formGrid2">
//                   <TextField placeholder="First name" icon={<IconUser />} value={firstName} onChange={setFirstName} />
//                   <TextField placeholder="Last name" icon={<IconUser />} value={lastName} onChange={setLastName} />
//                 </div>
                
//                 <div className="formGrid2">
//                   <TextField placeholder="Email" icon={<IconMail />} value={email} onChange={setEmail} />
//                   <div className="auth-date-picker">
//                     <DatePicker
//                       selected={parseDate(dob)}
//                       onChange={handleDateChange}
//                       dateFormat="MM/dd/yyyy"
//                       placeholderText="MM/DD/YYYY"
//                       maxDate={new Date()}
//                       showYearDropdown
//                       showMonthDropdown
//                       dropdownMode="select"
//                       yearDropdownItemNumber={100}
//                       scrollableYearDropdown
//                       className="date-picker-input"
//                       popperPlacement="bottom-start"
//                       popperModifiers={[
//                         {
//                           name: 'offset',
//                           options: {
//                             offset: [0, 8],
//                           },
//                         },
//                         {
//                           name: 'preventOverflow',
//                           options: {
//                             boundariesElement: 'viewport',
//                           },
//                         },
//                         {
//                           name: 'flip',
//                           options: {
//                             fallbackPlacements: ['top-start', 'bottom-start'],
//                           },
//                         },
//                       ]}
//                     />
//                     {dobError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{dobError}</div>}
//                     {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) >= 18 && (
//                       <div style={{ color: '#2fb463', fontSize: '11px', marginTop: '2px' }}>
//                         ✓ Age: {calculateAge(formatDateToYYYYMMDD(dob))} years
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="formGrid2">
//                   <div style={{ width: '100%' }}>
//                     <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '10px', height: '44px', background: 'white', width: '100%' }}>
//                       <span style={{ 
//                         padding: '0 10px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '13px',
//                         borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
//                       }}>
//                         +1
//                       </span>
//                       <input 
//                         type="tel" placeholder="555-555-5555" value={phoneNumber}
//                         onChange={(e) => handlePhoneChange(e.target.value)} maxLength={12}
//                         style={{ flex: 1, border: 'none', outline: 'none', padding: '0 10px', borderRadius: '10px', fontSize: '14px' }}
//                       />
//                     </div>
//                     {phoneError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{phoneError}</div>}
//                   </div>
//                   <SelectField icon={<IconGlobe />} value={language} onChange={setLanguage}>
//                     <option value="" disabled>Language</option>
//                     <option value="en">English</option>
//                     <option value="es">Spanish</option>
//                   </SelectField>
//                 </div>
                
//                 <div className="formGrid2">
//                   <PasswordInput
//                     placeholder="Password"
//                     icon={<IconLock />}
//                     value={registerPassword}
//                     onChange={handlePasswordChange}
//                     showPassword={showRegisterPassword}
//                     onToggle={() => setShowRegisterPassword(!showRegisterPassword)}
//                   />
//                   <PasswordInput
//                     placeholder="Confirm Password"
//                     icon={<IconLock />}
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     showPassword={showConfirmPassword}
//                     onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//                   />
//                 </div>
                
//                 {registerPassword && (
//                   <div className="password-strength-container">
//                     <div 
//                       className="password-strength-bar" 
//                       style={{ 
//                         width: passwordStrength === 'Weak' ? '33%' : passwordStrength === 'Medium' ? '66%' : '100%',
//                         background: getStrengthColor()
//                       }} 
//                     />
//                     <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>
//                       {passwordStrength} password
//                     </span>
//                     <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>
//                       (min 8 chars, letters & numbers)
//                     </span>
//                   </div>
//                 )}
                
//                 {passwordError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '2px' }}>{passwordError}</div>}
                
//                 <button
//   type="submit"
//   className="btn btnSuccess createAccountBtn"
// >
//   Create account
// </button>
//               </>
//             )}
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default WorkerAuthPage







// // src/worker/pages/WorkerAuthPage.jsx
// import { useState, useEffect, useMemo } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TextField, SelectField } from '../../common/components/TextField'
// import { IconUser, IconMail, IconLock, IconPhone, IconGlobe } from '../../common/components/Icons'
// import { formatPhoneNumber } from '../../common/utils/validation'
// import { auth } from '../../firebase/config'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import workerService from '../services/workerService'
// import authService from '../../services/authService'

// // Eye icon component
// function IconEye(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconEyeOff(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
//     </svg>
//   )
// }

// // Custom Password Input Component
// function PasswordInput({ placeholder, value, onChange, icon, showPassword, onToggle }) {
//   return (
//     <div className="password-input-wrapper">
//       <div className="password-input-container">
//         <span className="password-input-icon">{icon}</span>
//         <input
//           type={showPassword ? 'text' : 'password'}
//           className="password-input-field"
//           placeholder={placeholder}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />
//         <button
//           type="button"
//           className="password-eye-btn"
//           onClick={onToggle}
//           aria-label={showPassword ? 'Hide password' : 'Show password'}
//         >
//           {showPassword ? <IconEyeOff /> : <IconEye />}
//         </button>
//       </div>
//     </div>
//   )
// }

// export function WorkerAuthPage({ initialMode = 'login' }) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [mode, setMode] = useState(initialMode)
//   const [loginUsername, setLoginUsername] = useState('')
//   const [loginPassword, setLoginPassword] = useState('')
//   const [loginError, setLoginError] = useState('')
//   const [loginLoading, setLoginLoading] = useState(false)
  
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [dob, setDob] = useState('')
//   const [registerPassword, setRegisterPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [language, setLanguage] = useState('')
  
//   // Password visibility states
//   const [showLoginPassword, setShowLoginPassword] = useState(false)
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
//   // Validation errors
//   const [phoneError, setPhoneError] = useState('')
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

//   // ============================================================
//   // ✅ LOGIN HANDLER
//   // ============================================================
  
//   const handleLogin = async (e) => {
//   e.preventDefault()
  
//   if (!loginUsername || !loginPassword) {
//     setLoginError('Please enter both email and password')
//     return
//   }

//   setLoginLoading(true)
//   setLoginError('')

//   try {
//     console.log('🔐 Attempting login for:', loginUsername)
    
//     // ✅ Use custom auth service (not Firebase)
//     const result = await authService.login(loginUsername, loginPassword)
    
//     if (result.success) {
//       console.log('✅ Login successful')
      
//       // ✅ Navigate to summary page
//       navigate('/wizard/summary', { replace: true })
//     }
    
//   } catch (error) {
//     console.error('❌ Login error:', error)
//     setLoginError(error.message || 'Login failed. Please try again.')
//   } finally {
//     setLoginLoading(false)
//   }
// }

//   // ============================================================
//   // REGISTER HANDLER
//   // ============================================================
  
//   const validateRegistration = () => {
//     const phoneDigits = phoneNumber.replace(/\D/g, '')
//     const isPhoneValid = phoneDigits.length === 10
//     const passwordValidation = validatePassword(registerPassword)
//     const isPasswordValid = passwordValidation.valid && registerPassword === confirmPassword
//     const age = calculateAge(formatDateToYYYYMMDD(dob))
//     const isAgeValid = age >= 18
    
//     if (!isAgeValid) {
//       setDobError('You must be at least 18 years old to register')
//     }
//     if (!isPhoneValid) {
//       setPhoneError('Phone number must be 10 digits')
//     }
//     if (!passwordValidation.valid) {
//       setPasswordError(passwordValidation.message)
//     }
//     if (registerPassword !== confirmPassword) {
//       setPasswordError('Passwords do not match')
//     }
    
//     return isPhoneValid && isPasswordValid && isAgeValid
//   }

//   const handleRegister = (e) => {
//     e.preventDefault()
    
//     if (validateRegistration()) {
//       // ✅ Store in localStorage (for email verification callback)
//       localStorage.setItem('pendingEmail', email)
//       localStorage.setItem('pendingPassword', registerPassword)
//       localStorage.setItem('pendingPhoneNumber', phoneNumber)
//       localStorage.setItem('pendingFirstName', firstName)
//       localStorage.setItem('pendingLastName', lastName)
//       localStorage.setItem('pendingDob', formatDateToYYYYMMDD(dob))
//       localStorage.setItem('pendingLanguage', language)
      
//       // ✅ ALSO store in sessionStorage (for wizard auto-populate)
//       sessionStorage.setItem('wizardFirstName', firstName)
//       sessionStorage.setItem('wizardLastName', lastName)
//       sessionStorage.setItem('wizardEmail', email)
//       sessionStorage.setItem('wizardPhone', phoneNumber)
//       sessionStorage.setItem('wizardDob', formatDateToYYYYMMDD(dob))
//       sessionStorage.setItem('wizardLanguage', language)
//       sessionStorage.setItem('wizardFromRegister', 'true')
      
//       navigate('/verify', { 
//         state: { 
//           email, 
//           phoneNumber, 
//           fullName: `${firstName} ${lastName}`,
//           firstName,
//           lastName,
//           registerPassword,
//           dob: formatDateToYYYYMMDD(dob)
//         } 
//       })
//     }
//   }

//   const onSubmit = (e) => {
//     e.preventDefault()
    
//     if (mode === 'login') {
//       handleLogin(e)
//     } else {
//       handleRegister(e)
//     }
//   }

//   // ============================================================
//   // HELPER FUNCTIONS (unchanged)
//   // ============================================================

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

//   const formatDateToMMDDYYYY = (dateStr) => {
//     if (!dateStr) return ''
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return `${parts[0]}/${parts[1]}/${parts[2]}`
//     }
//     return dateStr
//   }

//   const formatDateToYYYYMMDD = (dateStr) => {
//     if (!dateStr) return ''
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return `${parts[2]}-${parts[0]}-${parts[1]}`
//     }
//     return dateStr
//   }

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

//   const handleDateChange = (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       const formattedDate = `${month}/${day}/${year}`
//       setDob(formattedDate)
//       validateDob(formattedDate)
//     } else {
//       setDob('')
//       setDobError('')
//     }
//   }

//   const parseDate = (dateStr) => {
//     if (!dateStr) return null
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
//     }
//     return null
//   }

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

//   const getStrengthColor = () => {
//     switch(passwordStrength) {
//       case 'Weak': return '#e11d48'
//       case 'Medium': return '#f59e0b'
//       case 'Strong': return '#2fb463'
//       default: return 'rgba(23,38,58,0.3)'
//     }
//   }

//   // ============================================================
//   // STYLES
//   // ============================================================

//   const customStyles = `
//     .auth-date-picker .react-datepicker__input-container input {
//       width: 100%;
//       height: 44px;
//       padding: 0 12px;
//       padding-right: 36px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 10px;
//       font-size: 14px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//       cursor: pointer;
//     }

//     .auth-date-picker .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .auth-date-picker .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .auth-date-picker .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .auth-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//       z-index: 1000;
//     }

//     .auth-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }

//     .auth-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }

//     .auth-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }

//     .auth-date-picker .react-datepicker__day {
//       width: 32px;
//       height: 32px;
//       line-height: 32px;
//       margin: 2px;
//       border-radius: 8px;
//       font-size: 13px;
//       color: #17263a;
//       transition: all 0.15s ease;
//       cursor: pointer;
//     }

//     .auth-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }

//     .auth-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }

//     .auth-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }

//     .auth-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }

//     .auth-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }

//     .auth-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }

//     .auth-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }

//     .auth-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }

//     .auth-date-picker .react-datepicker__day--outside-month {
//       color: rgba(23, 38, 58, 0.2);
//     }

//     .auth-date-picker .react-datepicker__navigation {
//       top: 12px;
//       background: transparent;
//       border: none;
//       cursor: pointer;
//       padding: 0;
//       width: 28px;
//       height: 28px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       border-radius: 6px;
//       transition: all 0.15s ease;
//     }

//     .auth-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }

//     .auth-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }

//     .auth-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }

//     .auth-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }

//     .auth-date-picker .react-datepicker__input-container {
//       position: relative;
//       width: 100%;
//     }

//     .auth-date-picker .react-datepicker-wrapper {
//       width: 100%;
//     }

//     .auth-date-picker .react-datepicker__input-container::after {
//       content: '📅';
//       position: absolute;
//       right: 12px;
//       top: 50%;
//       transform: translateY(-50%);
//       font-size: 16px;
//       pointer-events: none;
//       opacity: 0.6;
//     }

//     .auth-date-picker .react-datepicker-popper {
//       z-index: 9999 !important;
//     }

//     .password-input-wrapper {
//       width: 100%;
//       max-width: 100%;
//       box-sizing: border-box;
//     }

//     .password-input-container {
//       position: relative;
//       display: flex;
//       align-items: center;
//       width: 100%;
//       height: 44px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 10px;
//       background: white;
//       transition: all 0.2s ease;
//       box-sizing: border-box;
//       overflow: hidden;
//     }

//     .password-input-container:focus-within {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .password-input-container:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .password-input-icon {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 0 10px;
//       color: rgba(23, 38, 58, 0.4);
//       flex-shrink: 0;
//       min-width: 38px;
//     }

//     .password-input-icon svg {
//       width: 18px;
//       height: 18px;
//     }

//     .password-input-field {
//       flex: 1;
//       height: 100%;
//       border: none;
//       outline: none;
//       padding: 0 4px;
//       font-size: 14px;
//       color: #17263a;
//       background: transparent;
//       font-family: inherit;
//       min-width: 0;
//       width: 100%;
//     }

//     .password-input-field::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .password-eye-btn {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 0 10px;
//       background: none;
//       border: none;
//       cursor: pointer;
//       color: rgba(23, 38, 58, 0.4);
//       transition: color 0.2s ease;
//       flex-shrink: 0;
//       height: 100%;
//       min-width: 38px;
//     }

//     .password-eye-btn:hover {
//       color: #0f4ea9;
//     }

//     .password-eye-btn:focus {
//       outline: none;
//     }

//     .password-eye-btn svg {
//       width: 18px;
//       height: 18px;
//     }

//     .formGrid2 {
//       display: grid;
//       grid-template-columns: 1fr 1fr;
//       gap: 7px;
//       width: 100%;
//       max-width: 100%;
//       box-sizing: border-box;
//       margin-bottom: 2px;
//     }

//     .formGrid2 > * {
//       min-width: 0;
//       max-width: 100%;
//       box-sizing: border-box;
//     }

//     .authCardCompact {
//       max-width: 100%;
//       overflow: hidden;
//       padding: 16px 20px 20px 20px;
//       max-height: 90vh;
//       overflow-y: auto;
//     }

//     .authCard {
//       max-width: 100%;
//       box-sizing: border-box;
//     }

//     .authMain {
//       max-width: 100%;
//       padding: 20px;
//       box-sizing: border-box;
//     }

//     .password-strength-container {
//       margin-top: 2px;
//       margin-bottom: 4px;
//       padding: 0 2px;
//     }

//     .password-strength-bar {
//       height: 3px;
//       border-radius: 3px;
//       transition: width 0.3s ease;
//       margin-bottom: 2px;
//     }

//     .btn {
//       margin-top: 4px;
//       width: 100%;
//       padding: 10px;
//       font-size: 14px;
//     }

//     .createAccountBtn {
//       width: 180px !important;
//       height: 24px !important;
//       min-height: 24px !important;
//       padding: 0 !important;
//       font-size: 13px !important;
//       margin: 6px auto 0 !important;
//       display: block !important;
//     }

//     .field {
//       margin-bottom: 0 !important;
//     }

//     .formGrid2 .field {
//       margin-bottom: 0 !important;
//     }

//     .auth-date-picker {
//       margin-bottom: 0;
//     }

//     .auth-date-picker .react-datepicker__input-container input {
//       margin-bottom: 0;
//     }

//     .authBrand {
//       margin-bottom: 12px;
//       text-align: center;
//     }

//     .authBrand .authLogo {
//       max-height: 120px;
//       width: auto;
//     }

//     .tabs {
//       margin-bottom: 12px;
//     }

//     .tab {
//       padding: 8px 20px;
//       font-size: 14px;
//     }

//     form {
//       display: flex;
//       flex-direction: column;
//       gap: 2px;
//     }

//     .login-error {
//       color: #dc2626;
//       font-size: 13px;
//       padding: 8px 12px;
//       background: #fee2e2;
//       border-radius: 8px;
//       margin-bottom: 8px;
//     }

//     .btn:disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }
//   `

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <div className="authPage">
//       <style>{customStyles}</style>
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
//                 {loginError && (
//                   <div className="login-error">❌ {loginError}</div>
//                 )}
                
//                 <TextField 
//                   placeholder="Email" 
//                   icon={<IconUser />} 
//                   value={loginUsername} 
//                   onChange={setLoginUsername} 
//                   type="email"
//                 />
                
//                 <PasswordInput
//                   placeholder="Password"
//                   icon={<IconLock />}
//                   value={loginPassword}
//                   onChange={setLoginPassword}
//                   showPassword={showLoginPassword}
//                   onToggle={() => setShowLoginPassword(!showLoginPassword)}
//                 />
                
//                 <button 
//                   type="submit" 
//                   className="btn btnPrimary"
//                   disabled={loginLoading}
//                 >
//                   {loginLoading ? 'Logging in...' : 'Log in'}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="formGrid2">
//                   <TextField placeholder="First name" icon={<IconUser />} value={firstName} onChange={setFirstName} />
//                   <TextField placeholder="Last name" icon={<IconUser />} value={lastName} onChange={setLastName} />
//                 </div>
                
//                 <div className="formGrid2">
//                   <TextField placeholder="Email" icon={<IconMail />} value={email} onChange={setEmail} />
//                   <div className="auth-date-picker">
//                     <DatePicker
//                       selected={parseDate(dob)}
//                       onChange={handleDateChange}
//                       dateFormat="MM/dd/yyyy"
//                       placeholderText="MM/DD/YYYY"
//                       maxDate={new Date()}
//                       showYearDropdown
//                       showMonthDropdown
//                       dropdownMode="select"
//                       yearDropdownItemNumber={100}
//                       scrollableYearDropdown
//                       className="date-picker-input"
//                       popperPlacement="bottom-start"
//                       popperModifiers={[
//                         {
//                           name: 'offset',
//                           options: {
//                             offset: [0, 8],
//                           },
//                         },
//                         {
//                           name: 'preventOverflow',
//                           options: {
//                             boundariesElement: 'viewport',
//                           },
//                         },
//                         {
//                           name: 'flip',
//                           options: {
//                             fallbackPlacements: ['top-start', 'bottom-start'],
//                           },
//                         },
//                       ]}
//                     />
//                     {dobError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{dobError}</div>}
//                     {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) >= 18 && (
//                       <div style={{ color: '#2fb463', fontSize: '11px', marginTop: '2px' }}>
//                         ✓ Age: {calculateAge(formatDateToYYYYMMDD(dob))} years
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="formGrid2">
//                   <div style={{ width: '100%' }}>
//                     <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '10px', height: '44px', background: 'white', width: '100%' }}>
//                       <span style={{ 
//                         padding: '0 10px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '13px',
//                         borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
//                       }}>
//                         +1
//                       </span>
//                       <input 
//                         type="tel" placeholder="555-555-5555" value={phoneNumber}
//                         onChange={(e) => handlePhoneChange(e.target.value)} maxLength={12}
//                         style={{ flex: 1, border: 'none', outline: 'none', padding: '0 10px', borderRadius: '10px', fontSize: '14px' }}
//                       />
//                     </div>
//                     {phoneError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{phoneError}</div>}
//                   </div>
//                   <SelectField icon={<IconGlobe />} value={language} onChange={setLanguage}>
//                     <option value="" disabled>Language</option>
//                     <option value="en">English</option>
//                     <option value="es">Spanish</option>
//                   </SelectField>
//                 </div>
                
//                 <div className="formGrid2">
//                   <PasswordInput
//                     placeholder="Password"
//                     icon={<IconLock />}
//                     value={registerPassword}
//                     onChange={handlePasswordChange}
//                     showPassword={showRegisterPassword}
//                     onToggle={() => setShowRegisterPassword(!showRegisterPassword)}
//                   />
//                   <PasswordInput
//                     placeholder="Confirm Password"
//                     icon={<IconLock />}
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     showPassword={showConfirmPassword}
//                     onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//                   />
//                 </div>
                
//                 {registerPassword && (
//                   <div className="password-strength-container">
//                     <div 
//                       className="password-strength-bar" 
//                       style={{ 
//                         width: passwordStrength === 'Weak' ? '33%' : passwordStrength === 'Medium' ? '66%' : '100%',
//                         background: getStrengthColor()
//                       }} 
//                     />
//                     <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>
//                       {passwordStrength} password
//                     </span>
//                     <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>
//                       (min 8 chars, letters & numbers)
//                     </span>
//                   </div>
//                 )}
                
//                 {passwordError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '2px' }}>{passwordError}</div>}
                
//                 <button
//                   type="submit"
//                   className="btn btnSuccess createAccountBtn"
//                 >
//                   Create account
//                 </button>
//               </>
//             )}
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default WorkerAuthPage



// // src/worker/pages/WorkerAuthPage.jsx
// import { useState, useEffect, useMemo } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TextField, SelectField } from '../../common/components/TextField'
// import { IconUser, IconMail, IconLock, IconPhone, IconGlobe } from '../../common/components/Icons'
// import { formatPhoneNumber } from '../../common/utils/validation'
// import { auth } from '../../firebase/config'
// import { signInWithEmailAndPassword } from 'firebase/auth'
// import workerService from '../services/workerService'
// import authService from '../../services/authService'

// // Eye icon component
// function IconEye(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconEyeOff(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z" fill="currentColor"/>
//     </svg>
//   )
// }

// // Custom Password Input Component
// function PasswordInput({ placeholder, value, onChange, icon, showPassword, onToggle }) {
//   return (
//     <div className="password-input-wrapper">
//       <div className="password-input-container">
//         <span className="password-input-icon">{icon}</span>
//         <input
//           type={showPassword ? 'text' : 'password'}
//           className="password-input-field"
//           placeholder={placeholder}
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//         />
//         <button
//           type="button"
//           className="password-eye-btn"
//           onClick={onToggle}
//           aria-label={showPassword ? 'Hide password' : 'Show password'}
//         >
//           {showPassword ? <IconEyeOff /> : <IconEye />}
//         </button>
//       </div>
//     </div>
//   )
// }

// export function WorkerAuthPage({ initialMode = 'login' }) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [mode, setMode] = useState(initialMode)
//   const [loginUsername, setLoginUsername] = useState('')
//   const [loginPassword, setLoginPassword] = useState('')
//   const [loginError, setLoginError] = useState('')
//   const [loginLoading, setLoginLoading] = useState(false)
  
//   const [firstName, setFirstName] = useState('')
//   const [lastName, setLastName] = useState('')
//   const [email, setEmail] = useState('')
//   const [dob, setDob] = useState('')
//   const [registerPassword, setRegisterPassword] = useState('')
//   const [confirmPassword, setConfirmPassword] = useState('')
//   const [phoneNumber, setPhoneNumber] = useState('')
//   const [language, setLanguage] = useState('')
  
//   // Password visibility states
//   const [showLoginPassword, setShowLoginPassword] = useState(false)
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
//   // Validation errors
//   const [phoneError, setPhoneError] = useState('')
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

//   // ============================================================
//   // ✅ LOGIN HANDLER
//   // ============================================================
  
//   const handleLogin = async (e) => {
//     e.preventDefault()
    
//     if (!loginUsername || !loginPassword) {
//       setLoginError('Please enter both email and password')
//       return
//     }

//     setLoginLoading(true)
//     setLoginError('')

//     try {
//       console.log('🔐 Attempting login for:', loginUsername)
      
//       const result = await authService.login(loginUsername, loginPassword)
      
//       if (result.success) {
//         console.log('✅ Login successful')
//         navigate('/wizard/summary', { replace: true })
//       }
      
//     } catch (error) {
//       console.error('❌ Login error:', error)
//       setLoginError(error.message || 'Login failed. Please try again.')
//     } finally {
//       setLoginLoading(false)
//     }
//   }

//   // ============================================================
//   // REGISTER HANDLER
//   // ============================================================
  
//   const validateRegistration = () => {
//     const phoneDigits = phoneNumber.replace(/\D/g, '')
//     const isPhoneValid = phoneDigits.length === 10
//     const passwordValidation = validatePassword(registerPassword)
//     const isPasswordValid = passwordValidation.valid && registerPassword === confirmPassword
//     const age = calculateAge(formatDateToYYYYMMDD(dob))
//     const isAgeValid = age >= 18
    
//     if (!isAgeValid) {
//       setDobError('You must be at least 18 years old to register')
//     }
//     if (!isPhoneValid) {
//       setPhoneError('Phone number must be 10 digits')
//     }
//     if (!passwordValidation.valid) {
//       setPasswordError(passwordValidation.message)
//     }
//     if (registerPassword !== confirmPassword) {
//       setPasswordError('Passwords do not match')
//     }
    
//     return isPhoneValid && isPasswordValid && isAgeValid
//   }

//   const handleRegister = (e) => {
//     e.preventDefault()
    
//     if (validateRegistration()) {
//       localStorage.setItem('pendingEmail', email)
//       localStorage.setItem('pendingPassword', registerPassword)
//       localStorage.setItem('pendingPhoneNumber', phoneNumber)
//       localStorage.setItem('pendingFirstName', firstName)
//       localStorage.setItem('pendingLastName', lastName)
//       localStorage.setItem('pendingDob', formatDateToYYYYMMDD(dob))
//       localStorage.setItem('pendingLanguage', language)
      
//       sessionStorage.setItem('wizardFirstName', firstName)
//       sessionStorage.setItem('wizardLastName', lastName)
//       sessionStorage.setItem('wizardEmail', email)
//       sessionStorage.setItem('wizardPhone', phoneNumber)
//       sessionStorage.setItem('wizardDob', formatDateToYYYYMMDD(dob))
//       sessionStorage.setItem('wizardLanguage', language)
//       sessionStorage.setItem('wizardFromRegister', 'true')
      
//       navigate('/verify', { 
//         state: { 
//           email, 
//           phoneNumber, 
//           fullName: `${firstName} ${lastName}`,
//           firstName,
//           lastName,
//           registerPassword,
//           dob: formatDateToYYYYMMDD(dob)
//         } 
//       })
//     }
//   }

//   const onSubmit = (e) => {
//     e.preventDefault()
    
//     if (mode === 'login') {
//       handleLogin(e)
//     } else {
//       handleRegister(e)
//     }
//   }

//   // ============================================================
//   // HELPER FUNCTIONS
//   // ============================================================

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

//   const formatDateToMMDDYYYY = (dateStr) => {
//     if (!dateStr) return ''
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return `${parts[0]}/${parts[1]}/${parts[2]}`
//     }
//     return dateStr
//   }

//   const formatDateToYYYYMMDD = (dateStr) => {
//     if (!dateStr) return ''
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return `${parts[2]}-${parts[0]}-${parts[1]}`
//     }
//     return dateStr
//   }

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

//   const handleDateChange = (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       const formattedDate = `${month}/${day}/${year}`
//       setDob(formattedDate)
//       validateDob(formattedDate)
//     } else {
//       setDob('')
//       setDobError('')
//     }
//   }

//   const parseDate = (dateStr) => {
//     if (!dateStr) return null
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
//     }
//     return null
//   }

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

//   const getStrengthColor = () => {
//     switch(passwordStrength) {
//       case 'Weak': return '#e11d48'
//       case 'Medium': return '#f59e0b'
//       case 'Strong': return '#2fb463'
//       default: return 'rgba(23,38,58,0.3)'
//     }
//   }

//   // ============================================================
//   // STYLES - Fixed Calendar Positioning
//   // ============================================================

//   const customStyles = `
//     /* ============================================================
//        DATE PICKER - COMPLETE FIX
//     ============================================================ */
    
//     /* ✅ Make sure calendar appears above everything */
//     .react-datepicker-popper {
//       z-index: 999999 !important;
//       position: fixed !important;
//     }

//     /* ✅ Calendar wrapper */
//     .react-datepicker-wrapper {
//       display: block !important;
//       width: 100% !important;
//     }

//     /* ✅ Input container */
//     .auth-date-picker {
//       position: relative;
//       width: 100%;
//     }

//     .auth-date-picker .react-datepicker__input-container {
//       display: block;
//       width: 100%;
//     }

//     .auth-date-picker .react-datepicker__input-container input {
//       width: 100%;
//       height: 44px;
//       padding: 0 12px;
//       padding-right: 36px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 10px;
//       font-size: 14px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//       cursor: pointer;
//       box-sizing: border-box;
//     }

//     .auth-date-picker .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .auth-date-picker .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .auth-date-picker .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .auth-date-picker .react-datepicker__input-container::after {
//       content: '📅';
//       position: absolute;
//       right: 12px;
//       top: 50%;
//       transform: translateY(-50%);
//       font-size: 16px;
//       pointer-events: none;
//       opacity: 0.6;
//     }

//     /* ✅ Calendar popup styles */
//     .react-datepicker {
//       font-family: inherit !important;
//       border-radius: 12px !important;
//       border: 1px solid rgba(18, 38, 63, 0.08) !important;
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04) !important;
//       background: white !important;
//       padding: 8px !important;
//       overflow: hidden !important;
//       font-size: 13px !important;
//       z-index: 999999 !important;
//       position: relative !important;
//     }

//     .react-datepicker__header {
//       background: white !important;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06) !important;
//       padding: 10px 0 6px 0 !important;
//       border-radius: 12px 12px 0 0 !important;
//     }

//     .react-datepicker__current-month {
//       color: #17263a !important;
//       font-weight: 700 !important;
//       font-size: 14px !important;
//       padding-bottom: 4px !important;
//     }

//     .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5) !important;
//       font-weight: 600 !important;
//       font-size: 11px !important;
//       width: 32px !important;
//       margin: 2px !important;
//     }

//     .react-datepicker__day {
//       width: 32px !important;
//       height: 32px !important;
//       line-height: 32px !important;
//       margin: 2px !important;
//       border-radius: 8px !important;
//       font-size: 13px !important;
//       color: #17263a !important;
//       transition: all 0.15s ease !important;
//       cursor: pointer !important;
//     }

//     .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08) !important;
//       border-radius: 8px !important;
//     }

//     .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px !important;
//       font-weight: 600 !important;
//     }

//     .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }

//     .react-datepicker__day--today {
//       font-weight: 700 !important;
//       color: #0f4ea9 !important;
//     }

//     .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }

//     .react-datepicker__navigation {
//       top: 12px !important;
//       background: transparent !important;
//       border: none !important;
//       cursor: pointer !important;
//       padding: 0 !important;
//       width: 28px !important;
//       height: 28px !important;
//       display: flex !important;
//       align-items: center !important;
//       justify-content: center !important;
//       border-radius: 6px !important;
//       transition: all 0.15s ease !important;
//     }

//     .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08) !important;
//     }

//     /* ✅ Fix for popper positioning */
//     .react-datepicker-popper[data-placement^="bottom"] {
//       padding-top: 8px !important;
//     }

//     .react-datepicker-popper[data-placement^="top"] {
//       padding-bottom: 8px !important;
//     }

//     /* ✅ Ensure calendar doesn't get clipped */
//     .authCardCompact {
//       max-width: 100% !important;
//       overflow: visible !important;
//       padding: 16px 20px 20px 20px !important;
//       max-height: 90vh !important;
//       overflow-y: auto !important;
//     }

//     /* ============================================================
//        PASSWORD INPUT
//     ============================================================ */
//     .password-input-wrapper {
//       width: 100%;
//       max-width: 100%;
//       box-sizing: border-box;
//     }

//     .password-input-container {
//       position: relative;
//       display: flex;
//       align-items: center;
//       width: 100%;
//       height: 44px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 10px;
//       background: white;
//       transition: all 0.2s ease;
//       box-sizing: border-box;
//       overflow: hidden;
//     }

//     .password-input-container:focus-within {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .password-input-container:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .password-input-icon {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 0 10px;
//       color: rgba(23, 38, 58, 0.4);
//       flex-shrink: 0;
//       min-width: 38px;
//     }

//     .password-input-icon svg {
//       width: 18px;
//       height: 18px;
//     }

//     .password-input-field {
//       flex: 1;
//       height: 100%;
//       border: none;
//       outline: none;
//       padding: 0 4px;
//       font-size: 14px;
//       color: #17263a;
//       background: transparent;
//       font-family: inherit;
//       min-width: 0;
//       width: 100%;
//     }

//     .password-input-field::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .password-eye-btn {
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 0 10px;
//       background: none;
//       border: none;
//       cursor: pointer;
//       color: rgba(23, 38, 58, 0.4);
//       transition: color 0.2s ease;
//       flex-shrink: 0;
//       height: 100%;
//       min-width: 38px;
//     }

//     .password-eye-btn:hover {
//       color: #0f4ea9;
//     }

//     .password-eye-btn:focus {
//       outline: none;
//     }

//     .password-eye-btn svg {
//       width: 18px;
//       height: 18px;
//     }

//     /* ============================================================
//        FORM GRID
//     ============================================================ */
//     .formGrid2 {
//       display: grid;
//       grid-template-columns: 1fr 1fr;
//       gap: 7px;
//       width: 100%;
//       max-width: 100%;
//       box-sizing: border-box;
//       margin-bottom: 2px;
//     }

//     .formGrid2 > * {
//       min-width: 0;
//       max-width: 100%;
//       box-sizing: border-box;
//     }

//     /* ============================================================
//        OTHER STYLES
//     ============================================================ */
//     .password-strength-container {
//       margin-top: 2px;
//       margin-bottom: 4px;
//       padding: 0 2px;
//     }

//     .password-strength-bar {
//       height: 3px;
//       border-radius: 3px;
//       transition: width 0.3s ease;
//       margin-bottom: 2px;
//     }

//     .btn {
//       margin-top: 4px;
//       width: 100%;
//       padding: 10px;
//       font-size: 14px;
//     }

//     .createAccountBtn {
//       width: 180px !important;
//       height: 24px !important;
//       min-height: 24px !important;
//       padding: 0 !important;
//       font-size: 13px !important;
//       margin: 6px auto 0 !important;
//       display: block !important;
//     }

//     .field {
//       margin-bottom: 0 !important;
//     }

//     .formGrid2 .field {
//       margin-bottom: 0 !important;
//     }

//     .auth-date-picker {
//       margin-bottom: 0;
//     }

//     .auth-date-picker .react-datepicker__input-container input {
//       margin-bottom: 0;
//     }

//     .authBrand {
//       margin-bottom: 12px;
//       text-align: center;
//     }

//     .authBrand .authLogo {
//       max-height: 120px;
//       width: auto;
//     }

//     .tabs {
//       margin-bottom: 12px;
//     }

//     .tab {
//       padding: 8px 20px;
//       font-size: 14px;
//     }

//     form {
//       display: flex;
//       flex-direction: column;
//       gap: 2px;
//     }

//     .login-error {
//       color: #dc2626;
//       font-size: 13px;
//       padding: 8px 12px;
//       background: #fee2e2;
//       border-radius: 8px;
//       margin-bottom: 8px;
//     }

//     .btn:disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }
//   `

//   // ============================================================
//   // RENDER
//   // ============================================================

//   return (
//     <div className="authPage">
//       <style>{customStyles}</style>
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
//                 {loginError && (
//                   <div className="login-error">❌ {loginError}</div>
//                 )}
                
//                 <TextField 
//                   placeholder="Email" 
//                   icon={<IconUser />} 
//                   value={loginUsername} 
//                   onChange={setLoginUsername} 
//                   type="email"
//                 />
                
//                 <PasswordInput
//                   placeholder="Password"
//                   icon={<IconLock />}
//                   value={loginPassword}
//                   onChange={setLoginPassword}
//                   showPassword={showLoginPassword}
//                   onToggle={() => setShowLoginPassword(!showLoginPassword)}
//                 />
                
//                 <button 
//                   type="submit" 
//                   className="btn btnPrimary"
//                   disabled={loginLoading}
//                 >
//                   {loginLoading ? 'Logging in...' : 'Log in'}
//                 </button>
//               </>
//             ) : (
//               <>
//                 <div className="formGrid2">
//                   <TextField placeholder="First name" icon={<IconUser />} value={firstName} onChange={setFirstName} />
//                   <TextField placeholder="Last name" icon={<IconUser />} value={lastName} onChange={setLastName} />
//                 </div>
                
//                 <div className="formGrid2">
//                   <TextField placeholder="Email" icon={<IconMail />} value={email} onChange={setEmail} />
                  
//                   {/* ✅ FIXED: DatePicker with correct positioning */}
//                   <div className="auth-date-picker">
//                     <DatePicker
//                       selected={parseDate(dob)}
//                       onChange={handleDateChange}
//                       dateFormat="MM/dd/yyyy"
//                       placeholderText="MM/DD/YYYY"
//                       maxDate={new Date()}
//                       showYearDropdown
//                       showMonthDropdown
//                       dropdownMode="select"
//                       yearDropdownItemNumber={100}
//                       scrollableYearDropdown
//                       // ✅ Remove portalId - let it render normally
//                       // ✅ Use correct popper placement
//                       popperPlacement="bottom-start"
//                       popperModifiers={[
//                         {
//                           name: 'offset',
//                           options: {
//                             offset: [0, 10],
//                           },
//                         },
//                         {
//                           name: 'preventOverflow',
//                           options: {
//                             boundariesElement: 'viewport',
//                           },
//                         },
//                         {
//                           name: 'flip',
//                           options: {
//                             fallbackPlacements: ['top-start', 'bottom-start', 'right', 'left'],
//                           },
//                         },
//                       ]}
//                     />
//                     {dobError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{dobError}</div>}
//                     {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) >= 18 && (
//                       <div style={{ color: '#2fb463', fontSize: '11px', marginTop: '2px' }}>
//                         ✓ Age: {calculateAge(formatDateToYYYYMMDD(dob))} years
//                       </div>
//                     )}
//                   </div>
//                 </div>
                
//                 <div className="formGrid2">
//                   <div style={{ width: '100%' }}>
//                     <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '10px', height: '44px', background: 'white', width: '100%' }}>
//                       <span style={{ 
//                         padding: '0 10px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '13px',
//                         borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
//                       }}>
//                         +1
//                       </span>
//                       <input 
//                         type="tel" placeholder="555-555-5555" value={phoneNumber}
//                         onChange={(e) => handlePhoneChange(e.target.value)} maxLength={12}
//                         style={{ flex: 1, border: 'none', outline: 'none', padding: '0 10px', borderRadius: '10px', fontSize: '14px' }}
//                       />
//                     </div>
//                     {phoneError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{phoneError}</div>}
//                   </div>
//                   <SelectField icon={<IconGlobe />} value={language} onChange={setLanguage}>
//                     <option value="" disabled>Language</option>
//                     <option value="en">English</option>
//                     <option value="es">Spanish</option>
//                   </SelectField>
//                 </div>
                
//                 <div className="formGrid2">
//                   <PasswordInput
//                     placeholder="Password"
//                     icon={<IconLock />}
//                     value={registerPassword}
//                     onChange={handlePasswordChange}
//                     showPassword={showRegisterPassword}
//                     onToggle={() => setShowRegisterPassword(!showRegisterPassword)}
//                   />
//                   <PasswordInput
//                     placeholder="Confirm Password"
//                     icon={<IconLock />}
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     showPassword={showConfirmPassword}
//                     onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//                   />
//                 </div>
                
//                 {registerPassword && (
//                   <div className="password-strength-container">
//                     <div 
//                       className="password-strength-bar" 
//                       style={{ 
//                         width: passwordStrength === 'Weak' ? '33%' : passwordStrength === 'Medium' ? '66%' : '100%',
//                         background: getStrengthColor()
//                       }} 
//                     />
//                     <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>
//                       {passwordStrength} password
//                     </span>
//                     <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>
//                       (min 8 chars, letters & numbers)
//                     </span>
//                   </div>
//                 )}
                
//                 {passwordError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '2px' }}>{passwordError}</div>}
                
//                 <button
//                   type="submit"
//                   className="btn btnSuccess createAccountBtn"
//                 >
//                   Create account
//                 </button>
//               </>
//             )}
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }

// export default WorkerAuthPage










// src/worker/pages/WorkerAuthPage.jsx
import { useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TextField, SelectField } from '../../common/components/TextField'
import { IconUser, IconMail, IconLock, IconPhone, IconGlobe } from '../../common/components/Icons'
import { formatPhoneNumber } from '../../common/utils/validation'
import authService from '../../services/authService'

// Eye icon component
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
function PasswordInput({ placeholder, value, onChange, icon, showPassword, onToggle }) {
  return (
    <div className="password-input-wrapper">
      <div className="password-input-container">
        <span className="password-input-icon">{icon}</span>
        <input
          type={showPassword ? 'text' : 'password'}
          className="password-input-field"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="password-eye-btn"
          onClick={onToggle}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <IconEyeOff /> : <IconEye />}
        </button>
      </div>
    </div>
  )
}

export function WorkerAuthPage({ initialMode = 'login' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [mode, setMode] = useState(initialMode)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [language, setLanguage] = useState('')
  
  // Email validation states
  const [emailError, setEmailError] = useState('')
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [emailCheckTimeout, setEmailCheckTimeout] = useState(null)
  const [emailValid, setEmailValid] = useState(false)
  
  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
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

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================

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

  const formatDateToMMDDYYYY = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return `${parts[0]}/${parts[1]}/${parts[2]}`
    }
    return dateStr
  }

  const formatDateToYYYYMMDD = (dateStr) => {
    if (!dateStr) return ''
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return `${parts[2]}-${parts[0]}-${parts[1]}`
    }
    return dateStr
  }

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

  const handleDateChange = (date) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      const formattedDate = `${month}/${day}/${year}`
      setDob(formattedDate)
      validateDob(formattedDate)
    } else {
      setDob('')
      setDobError('')
    }
  }

  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
    }
    return null
  }

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

  const getStrengthColor = () => {
    switch(passwordStrength) {
      case 'Weak': return '#e11d48'
      case 'Medium': return '#f59e0b'
      case 'Strong': return '#2fb463'
      default: return 'rgba(23,38,58,0.3)'
    }
  }

  // ============================================================
  // ✅ CHECK EMAIL EXISTS IN REAL-TIME
  // ============================================================
  
  const checkEmailExists = async (emailToCheck) => {
    console.log('🔍 checkEmailExists called with:', emailToCheck)
    
    if (!emailToCheck || emailToCheck.length < 3) {
      setEmailError('')
      setEmailValid(false)
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailToCheck)) {
      setEmailError('Please enter a valid email address')
      setEmailValid(false)
      return false
    }

    setIsCheckingEmail(true)
    setEmailError('')
    setEmailValid(false)

    try {
      console.log('🔍 Checking email via API:', emailToCheck)
      
      const response = await fetch(`/api/worker/email/${encodeURIComponent(emailToCheck)}`)
      const data = await response.json()
      console.log('📥 Email check response:', data)

      if (data.success && data.data && data.data.length > 0) {
        console.log('❌ Email EXISTS:', emailToCheck)
        setEmailError('❌ This email is already registered. Please login instead.')
        setEmailValid(false)
        return true
      } else {
        console.log('✅ Email AVAILABLE:', emailToCheck)
        setEmailError('')
        setEmailValid(true)
        return false
      }
    } catch (error) {
      console.error('❌ Error checking email:', error)
      setEmailError('')
      setEmailValid(true)
      return false
    } finally {
      setIsCheckingEmail(false)
    }
  }

  // ✅ FIXED: handleEmailChange now receives value directly
  const handleEmailChange = (value) => {
    console.log('📝 handleEmailChange called with value:', value)
    setEmail(value)
    setEmailError('')
    setEmailValid(false)
    
    if (emailCheckTimeout) {
      clearTimeout(emailCheckTimeout)
    }

    if (value && value.length > 3) {
      console.log('⏳ Scheduling email check for:', value)
      const timeout = setTimeout(() => {
        console.log('⏰ Running email check for:', value)
        checkEmailExists(value)
      }, 500)
      setEmailCheckTimeout(timeout)
    }
  }

  // ============================================================
  // ✅ LOGIN HANDLER
  // ============================================================
  
  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!loginUsername || !loginPassword) {
      setLoginError('Please enter both email and password')
      return
    }

    setLoginLoading(true)
    setLoginError('')

    try {
      console.log('🔐 Attempting login for:', loginUsername)
      
      const result = await authService.login(loginUsername, loginPassword)
      
      if (result.success) {
        console.log('✅ Login successful')
        navigate('/wizard/summary', { replace: true })
      }
      
    } catch (error) {
      console.error('❌ Login error:', error)
      setLoginError(error.message || 'Login failed. Please try again.')
    } finally {
      setLoginLoading(false)
    }
  }

  // ============================================================
  // ✅ REGISTER HANDLER
  // ============================================================
  
  const validateRegistration = async () => {
    const phoneDigits = phoneNumber.replace(/\D/g, '')
    const isPhoneValid = phoneDigits.length === 10
    const passwordValidation = validatePassword(registerPassword)
    const isPasswordValid = passwordValidation.valid && registerPassword === confirmPassword
    const age = calculateAge(formatDateToYYYYMMDD(dob))
    const isAgeValid = age >= 18
    
    let isEmailAvailable = true
    if (email && !emailError) {
      const exists = await checkEmailExists(email)
      if (exists) {
        isEmailAvailable = false
      }
    }
    
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
    
    return isPhoneValid && isPasswordValid && isAgeValid && isEmailAvailable
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    
    const isValid = await validateRegistration()
    
    if (isValid) {
      localStorage.setItem('pendingEmail', email)
      localStorage.setItem('pendingPassword', registerPassword)
      localStorage.setItem('pendingPhoneNumber', phoneNumber)
      localStorage.setItem('pendingFirstName', firstName)
      localStorage.setItem('pendingLastName', lastName)
      localStorage.setItem('pendingDob', formatDateToYYYYMMDD(dob))
      localStorage.setItem('pendingLanguage', language)
      
      sessionStorage.setItem('wizardFirstName', firstName)
      sessionStorage.setItem('wizardLastName', lastName)
      sessionStorage.setItem('wizardEmail', email)
      sessionStorage.setItem('wizardPhone', phoneNumber)
      sessionStorage.setItem('wizardDob', formatDateToYYYYMMDD(dob))
      sessionStorage.setItem('wizardLanguage', language)
      sessionStorage.setItem('wizardFromRegister', 'true')
      
      navigate('/verify', { 
        state: { 
          email, 
          phoneNumber, 
          fullName: `${firstName} ${lastName}`,
          firstName,
          lastName,
          registerPassword,
          dob: formatDateToYYYYMMDD(dob)
        } 
      })
    }
  }

  // ============================================================
  // ✅ SUBMIT HANDLER
  // ============================================================

  const onSubmit = (e) => {
    e.preventDefault()
    
    if (mode === 'login') {
      handleLogin(e)
    } else {
      handleRegister(e)
    }
  }

  // ============================================================
  // STYLES
  // ============================================================

  const customStyles = `
    /* ============================================================
       DATE PICKER - COMPLETE FIX
    ============================================================ */
    
    .react-datepicker-popper {
      z-index: 999999 !important;
      position: fixed !important;
    }

    .react-datepicker-wrapper {
      display: block !important;
      width: 100% !important;
    }

    .auth-date-picker {
      position: relative;
      width: 100%;
    }

    .auth-date-picker .react-datepicker__input-container {
      display: block;
      width: 100%;
    }

    .auth-date-picker .react-datepicker__input-container input {
      width: 100%;
      height: 44px;
      padding: 0 12px;
      padding-right: 36px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 10px;
      font-size: 14px;
      outline: none;
      background: white;
      color: #17263a;
      transition: all 0.2s ease;
      font-family: inherit;
      cursor: pointer;
      box-sizing: border-box;
    }

    .auth-date-picker .react-datepicker__input-container input:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .auth-date-picker .react-datepicker__input-container input:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .auth-date-picker .react-datepicker__input-container input::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }

    .auth-date-picker .react-datepicker__input-container::after {
      content: '📅';
      position: absolute;
      right: 12px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 16px;
      pointer-events: none;
      opacity: 0.6;
    }

    .react-datepicker {
      font-family: inherit !important;
      border-radius: 12px !important;
      border: 1px solid rgba(18, 38, 63, 0.08) !important;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04) !important;
      background: white !important;
      padding: 8px !important;
      overflow: hidden !important;
      font-size: 13px !important;
      z-index: 999999 !important;
      position: relative !important;
    }

    .react-datepicker__header {
      background: white !important;
      border-bottom: 1px solid rgba(18, 38, 63, 0.06) !important;
      padding: 10px 0 6px 0 !important;
      border-radius: 12px 12px 0 0 !important;
    }

    .react-datepicker__current-month {
      color: #17263a !important;
      font-weight: 700 !important;
      font-size: 14px !important;
      padding-bottom: 4px !important;
    }

    .react-datepicker__day-name {
      color: rgba(23, 38, 58, 0.5) !important;
      font-weight: 600 !important;
      font-size: 11px !important;
      width: 32px !important;
      margin: 2px !important;
    }

    .react-datepicker__day {
      width: 32px !important;
      height: 32px !important;
      line-height: 32px !important;
      margin: 2px !important;
      border-radius: 8px !important;
      font-size: 13px !important;
      color: #17263a !important;
      transition: all 0.15s ease !important;
      cursor: pointer !important;
    }

    .react-datepicker__day:hover {
      background: rgba(15, 78, 169, 0.08) !important;
      border-radius: 8px !important;
    }

    .react-datepicker__day--selected {
      background: #0f4ea9 !important;
      color: white !important;
      border-radius: 8px !important;
      font-weight: 600 !important;
    }

    .react-datepicker__day--selected:hover {
      background: #0b3f90 !important;
    }

    .react-datepicker__day--today {
      font-weight: 700 !important;
      color: #0f4ea9 !important;
    }

    .react-datepicker__day--today::after {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: #0f4ea9;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: -2px;
    }

    .react-datepicker__navigation {
      top: 12px !important;
      background: transparent !important;
      border: none !important;
      cursor: pointer !important;
      padding: 0 !important;
      width: 28px !important;
      height: 28px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      border-radius: 6px !important;
      transition: all 0.15s ease !important;
    }

    .react-datepicker__navigation:hover {
      background: rgba(15, 78, 169, 0.08) !important;
    }

    .react-datepicker-popper[data-placement^="bottom"] {
      padding-top: 8px !important;
    }

    .react-datepicker-popper[data-placement^="top"] {
      padding-bottom: 8px !important;
    }

    .authCardCompact {
      max-width: 100% !important;
      overflow: visible !important;
      padding: 16px 20px 20px 20px !important;
      max-height: 90vh !important;
      overflow-y: auto !important;
    }

    /* Email validation styles */
    .email-error {
      color: #dc2626;
      font-size: 12px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      background: #fee2e2;
      border-radius: 6px;
    }

    .email-error a {
      color: #0f4ea9;
      text-decoration: underline;
      cursor: pointer;
      font-weight: 600;
    }

    .email-error a:hover {
      color: #0b3f90;
    }

    .email-checking {
      color: #0f4ea9;
      font-size: 12px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .email-available {
      color: #2fb463;
      font-size: 12px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    /* ============================================================
       PASSWORD INPUT
    ============================================================ */
    .password-input-wrapper {
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
    }

    .password-input-container {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 44px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 10px;
      background: white;
      transition: all 0.2s ease;
      box-sizing: border-box;
      overflow: hidden;
    }

    .password-input-container:focus-within {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .password-input-container:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .password-input-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      color: rgba(23, 38, 58, 0.4);
      flex-shrink: 0;
      min-width: 38px;
    }

    .password-input-icon svg {
      width: 18px;
      height: 18px;
    }

    .password-input-field {
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

    .password-input-field::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }

    .password-eye-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      background: none;
      border: none;
      cursor: pointer;
      color: rgba(23, 38, 58, 0.4);
      transition: color 0.2s ease;
      flex-shrink: 0;
      height: 100%;
      min-width: 38px;
    }

    .password-eye-btn:hover {
      color: #0f4ea9;
    }

    .password-eye-btn:focus {
      outline: none;
    }

    .password-eye-btn svg {
      width: 18px;
      height: 18px;
    }

    /* ============================================================
       FORM GRID
    ============================================================ */
    .formGrid2 {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 7px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      margin-bottom: 2px;
    }

    .formGrid2 > * {
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
    }

    .password-strength-container {
      margin-top: 2px;
      margin-bottom: 4px;
      padding: 0 2px;
    }

    .password-strength-bar {
      height: 3px;
      border-radius: 3px;
      transition: width 0.3s ease;
      margin-bottom: 2px;
    }

    .btn {
      margin-top: 4px;
      width: 100%;
      padding: 10px;
      font-size: 14px;
    }

    .createAccountBtn {
      width: 180px !important;
      height: 24px !important;
      min-height: 24px !important;
      padding: 0 !important;
      font-size: 13px !important;
      margin: 6px auto 0 !important;
      display: block !important;
    }

    .field {
      margin-bottom: 0 !important;
    }

    .formGrid2 .field {
      margin-bottom: 0 !important;
    }

    .auth-date-picker {
      margin-bottom: 0;
    }

    .auth-date-picker .react-datepicker__input-container input {
      margin-bottom: 0;
    }

    .authBrand {
      margin-bottom: 12px;
      text-align: center;
    }

    .authBrand .authLogo {
      max-height: 120px;
      width: auto;
    }

    .tabs {
      margin-bottom: 12px;
    }

    .tab {
      padding: 8px 20px;
      font-size: 14px;
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .login-error {
      color: #dc2626;
      font-size: 13px;
      padding: 8px 12px;
      background: #fee2e2;
      border-radius: 8px;
      margin-bottom: 8px;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="authPage">
      <style>{customStyles}</style>
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
                {loginError && (
                  <div className="login-error">❌ {loginError}</div>
                )}
                
                <TextField 
                  placeholder="Email" 
                  icon={<IconUser />} 
                  value={loginUsername} 
                  onChange={setLoginUsername} 
                  type="email"
                />
                
                <PasswordInput
                  placeholder="Password"
                  icon={<IconLock />}
                  value={loginPassword}
                  onChange={setLoginPassword}
                  showPassword={showLoginPassword}
                  onToggle={() => setShowLoginPassword(!showLoginPassword)}
                />
                
                <button 
                  type="submit" 
                  className="btn btnPrimary"
                  disabled={loginLoading}
                >
                  {loginLoading ? 'Logging in...' : 'Log in'}
                </button>
              </>
            ) : (
              <>
                <div className="formGrid2">
                  <TextField placeholder="First name" icon={<IconUser />} value={firstName} onChange={setFirstName} />
                  <TextField placeholder="Last name" icon={<IconUser />} value={lastName} onChange={setLastName} />
                </div>
                
                <div className="formGrid2">
                  {/* ✅ FIXED: onChange passes value directly */}
                  <TextField 
                    placeholder="Email" 
                    icon={<IconMail />} 
                    value={email} 
                    onChange={(value) => handleEmailChange(value)} 
                    type="email"
                  />
                  
                  <div className="auth-date-picker">
                    <DatePicker
                      selected={parseDate(dob)}
                      onChange={handleDateChange}
                      dateFormat="MM/dd/yyyy"
                      placeholderText="MM/DD/YYYY"
                      maxDate={new Date()}
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      yearDropdownItemNumber={100}
                      scrollableYearDropdown
                      popperPlacement="bottom-start"
                      popperModifiers={[
                        {
                          name: 'offset',
                          options: {
                            offset: [0, 10],
                          },
                        },
                        {
                          name: 'preventOverflow',
                          options: {
                            boundariesElement: 'viewport',
                          },
                        },
                        {
                          name: 'flip',
                          options: {
                            fallbackPlacements: ['top-start', 'bottom-start', 'right', 'left'],
                          },
                        },
                      ]}
                    />
                    {dobError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{dobError}</div>}
                    {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) >= 18 && (
                      <div style={{ color: '#2fb463', fontSize: '11px', marginTop: '2px' }}>
                        ✓ Age: {calculateAge(formatDateToYYYYMMDD(dob))} years
                      </div>
                    )}
                  </div>
                </div>

                {/* ✅ Email validation status */}
                <div style={{ marginTop: '-6px', marginBottom: '4px' }}>
                  {isCheckingEmail && (
                    <div className="email-checking">
                      <span>⏳</span> Checking email availability...
                    </div>
                  )}
                  {emailError && (
                    <div className="email-error">
                      <span>⚠️</span> {emailError}
                      <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login') }}>
                        Login here
                      </a>
                    </div>
                  )}
                  {email && !isCheckingEmail && !emailError && emailValid && email.length > 3 && (
                    <div className="email-available">
                      <span>✓</span> Email is available
                    </div>
                  )}
                </div>
                
                <div className="formGrid2">
                  <div style={{ width: '100%' }}>
                    <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '10px', height: '44px', background: 'white', width: '100%' }}>
                      <span style={{ 
                        padding: '0 10px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '13px',
                        borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
                      }}>
                        +1
                      </span>
                      <input 
                        type="tel" placeholder="555-555-5555" value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)} maxLength={12}
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '0 10px', borderRadius: '10px', fontSize: '14px' }}
                      />
                    </div>
                    {phoneError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{phoneError}</div>}
                  </div>
                  <SelectField icon={<IconGlobe />} value={language} onChange={setLanguage}>
                    <option value="" disabled>Language</option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </SelectField>
                </div>
                
                <div className="formGrid2">
                  <PasswordInput
                    placeholder="Password"
                    icon={<IconLock />}
                    value={registerPassword}
                    onChange={handlePasswordChange}
                    showPassword={showRegisterPassword}
                    onToggle={() => setShowRegisterPassword(!showRegisterPassword)}
                  />
                  <PasswordInput
                    placeholder="Confirm Password"
                    icon={<IconLock />}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    showPassword={showConfirmPassword}
                    onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  />
                </div>
                
                {registerPassword && (
                  <div className="password-strength-container">
                    <div 
                      className="password-strength-bar" 
                      style={{ 
                        width: passwordStrength === 'Weak' ? '33%' : passwordStrength === 'Medium' ? '66%' : '100%',
                        background: getStrengthColor()
                      }} 
                    />
                    <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>
                      {passwordStrength} password
                    </span>
                    <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>
                      (min 8 chars, letters & numbers)
                    </span>
                  </div>
                )}
                
                {passwordError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '2px' }}>{passwordError}</div>}
                
                <button
                  type="submit"
                  className="btn btnSuccess createAccountBtn"
                  disabled={!!emailError || isCheckingEmail}
                >
                  Create account
                </button>
              </>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}

export default WorkerAuthPage