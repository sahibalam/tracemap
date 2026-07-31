// // src/worker/pages/WorkerAuthPage.jsx
// import { useState, useEffect, useMemo, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { TextField, SelectField } from '../../common/components/TextField'
// import { IconUser, IconMail, IconLock, IconPhone, IconGlobe } from '../../common/components/Icons'
// import { formatPhoneNumber } from '../../common/utils/validation'
// import authService from '../../services/authService'
// import { ForgotPasswordModal } from '../components/ForgotPasswordModal'
// import { LanguageSwitcher } from '../../common/components/LanguageSwitcher'

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

// // Helper functions for date handling
// const getDaysInMonth = (month, year) => {
//   if (!month || !year) return 31
  
//   const monthsWith30Days = [4, 6, 9, 11]
  
//   if (monthsWith30Days.includes(parseInt(month))) {
//     return 30
//   }
  
//   if (parseInt(month) === 2) {
//     const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
//     return isLeapYear ? 29 : 28
//   }
  
//   return 31
// }

// const getMonthOptions = () => {
//   const months = []
//   for (let i = 1; i <= 12; i++) {
//     months.push({ value: i, label: new Date(2000, i - 1, 1).toLocaleString('default', { month: 'long' }) })
//   }
//   return months
// }

// const getYearRange = () => {
//   const currentYear = new Date().getFullYear()
//   const maxYear = currentYear - 18
//   const minYear = 1980
//   const years = []
  
//   for (let year = maxYear; year >= minYear; year--) {
//     years.push(year)
//   }
//   return years
// }

// export function WorkerAuthPage({ initialMode = 'login' }) {
//   const { t } = useTranslation()
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
  
//   const [selectedYear, setSelectedYear] = useState('')
//   const [selectedMonth, setSelectedMonth] = useState('')
//   const [selectedDay, setSelectedDay] = useState('')
//   const [daysInMonth, setDaysInMonth] = useState(31)
  
//   const [emailError, setEmailError] = useState('')
//   const [isCheckingEmail, setIsCheckingEmail] = useState(false)
//   const [emailCheckTimeout, setEmailCheckTimeout] = useState(null)
//   const [emailValid, setEmailValid] = useState(false)
  
//   const [showLoginPassword, setShowLoginPassword] = useState(false)
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
//   const [phoneError, setPhoneError] = useState('')
//   const [passwordError, setPasswordError] = useState('')
//   const [passwordStrength, setPasswordStrength] = useState('')
//   const [dobError, setDobError] = useState('')

//   const [showForgotPassword, setShowForgotPassword] = useState(false)

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

//   useEffect(() => {
//     if (selectedMonth && selectedYear) {
//       const days = getDaysInMonth(parseInt(selectedMonth), parseInt(selectedYear))
//       setDaysInMonth(days)
//       if (selectedDay && parseInt(selectedDay) > days) {
//         setSelectedDay('')
//         if (dob) {
//           setDob('')
//           setDobError('')
//         }
//       }
//     }
//   }, [selectedMonth, selectedYear])

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
//       setDobError(t('auth.ageRequired'))
//       return false
//     }
//     if (age > 100) {
//       setDobError(t('auth.validDateOfBirth'))
//       return false
//     }
//     setDobError('')
//     return true
//   }

//   const handleDateChangeFromDropdown = (year, month, day) => {
//     if (year && month && day) {
//       const monthStr = String(month).padStart(2, '0')
//       const dayStr = String(day).padStart(2, '0')
//       const formattedDate = `${monthStr}/${dayStr}/${year}`
//       setDob(formattedDate)
//       validateDob(formattedDate)
//     } else {
//       setDob('')
//       setDobError('')
//     }
//   }

//   const validatePassword = (password) => {
//     if (password.length < 8) {
//       return { valid: false, message: t('auth.passwordMinLength') }
//     }
//     const hasLetter = /[A-Za-z]/.test(password)
//     const hasNumber = /[0-9]/.test(password)
//     if (!hasLetter || !hasNumber) {
//       return { valid: false, message: t('auth.passwordLettersNumbers') }
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
//     if (strength <= 2) return t('auth.weak')
//     if (strength <= 4) return t('auth.medium')
//     return t('auth.strong')
//   }

//   const handlePhoneChange = (value) => {
//     const formatted = formatPhoneNumber(value)
//     setPhoneNumber(formatted)
//     const digits = formatted.replace(/\D/g, '')
//     if (digits.length === 10) {
//       setPhoneError('')
//     } else if (digits.length > 0 && digits.length < 10) {
//       setPhoneError(t('auth.phoneRequired'))
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
//       setPasswordError(t('auth.passwordsDoNotMatch'))
//     } else {
//       setPasswordError('')
//     }
//   }

//   const handleConfirmPasswordChange = (value) => {
//     setConfirmPassword(value)
//     if (registerPassword !== value) {
//       setPasswordError(t('auth.passwordsDoNotMatch'))
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
//       case t('auth.weak'): return '#e11d48'
//       case t('auth.medium'): return '#f59e0b'
//       case t('auth.strong'): return '#2fb463'
//       default: return 'rgba(23,38,58,0.3)'
//     }
//   }

//   const checkEmailExists = async (emailToCheck) => {
//     if (!emailToCheck || emailToCheck.length < 3) {
//       setEmailError('')
//       setEmailValid(false)
//       return false
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(emailToCheck)) {
//       setEmailError(t('auth.validEmail'))
//       setEmailValid(false)
//       return false
//     }

//     setIsCheckingEmail(true)
//     setEmailError('')
//     setEmailValid(false)

//     try {
//       const url = `/api/worker/email/${encodeURIComponent(emailToCheck)}`
//       const response = await fetch(url)
//       const data = await response.json()

//       if (data.success && data.data && data.data.length > 0) {
//         setEmailError(t('auth.emailAlreadyRegistered'))
//         setEmailValid(false)
//         return true
//       } else {
//         setEmailError('')
//         setEmailValid(true)
//         return false
//       }
//     } catch (error) {
//       console.error('❌ Fetch error:', error)
//       setEmailError('')
//       setEmailValid(true)
//       return false
//     } finally {
//       setIsCheckingEmail(false)
//     }
//   }

//   const handleEmailChange = (value) => {
//     setEmail(value)
//     setEmailError('')
//     setEmailValid(false)
    
//     if (emailCheckTimeout) {
//       clearTimeout(emailCheckTimeout)
//     }

//     if (value && value.length > 3) {
//       const timeout = setTimeout(() => {
//         checkEmailExists(value)
//       }, 500)
//       setEmailCheckTimeout(timeout)
//     }
//   }

//   const generateSessionToken = () => {
//     return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//   }

//   const handleLogin = async (e) => {
//     e.preventDefault()
    
//     if (!loginUsername || !loginPassword) {
//       setLoginError(t('auth.enterEmailAndPassword'))
//       return
//     }

//     setLoginLoading(true)
//     setLoginError('')

//     try {
//       const result = await authService.login(loginUsername, loginPassword)
      
//       if (result.success) {
//         const token = result.data?.token || generateSessionToken()
//         localStorage.setItem('authToken', token)
//         localStorage.setItem('userId', result.data?.userId || '')
        
//         if (result.data?.profile?.basics) {
//           const basics = result.data.profile.basics
//           localStorage.setItem('userFirstName', basics.legalFirstName || '')
//           localStorage.setItem('userLastName', basics.legalLastName || '')
//           localStorage.setItem('pendingFirstName', basics.legalFirstName || '')
//           localStorage.setItem('pendingLastName', basics.legalLastName || '')
//           localStorage.setItem('pendingEmail', basics.emailAddress || '')
//         }
        
//         window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//           detail: { 
//             firstName: localStorage.getItem('userFirstName') || 'User',
//             profileImage: localStorage.getItem('userProfileImage')
//           }
//         }))
        
//         navigate('/wizard/summary', { replace: true })
//       }
      
//     } catch (error) {
//       console.error('❌ Login error:', error)
//       setLoginError(error.message || t('auth.loginError'))
//     } finally {
//       setLoginLoading(false)
//     }
//   }

//   const validateRegistration = async () => {
//     const phoneDigits = phoneNumber.replace(/\D/g, '')
//     const isPhoneValid = phoneDigits.length === 10
//     const passwordValidation = validatePassword(registerPassword)
//     const isPasswordValid = passwordValidation.valid && registerPassword === confirmPassword
//     const age = calculateAge(formatDateToYYYYMMDD(dob))
//     const isAgeValid = age >= 18
    
//     let isEmailAvailable = true
//     if (email && !emailError) {
//       const exists = await checkEmailExists(email)
//       if (exists) {
//         isEmailAvailable = false
//       }
//     }
    
//     if (!isAgeValid) {
//       setDobError(t('auth.ageRequired'))
//     }
//     if (!isPhoneValid) {
//       setPhoneError(t('auth.phoneRequired'))
//     }
//     if (!passwordValidation.valid) {
//       setPasswordError(passwordValidation.message)
//     }
//     if (registerPassword !== confirmPassword) {
//       setPasswordError(t('auth.passwordsDoNotMatch'))
//     }
    
//     return isPhoneValid && isPasswordValid && isAgeValid && isEmailAvailable
//   }

//   const handleRegister = async (e) => {
//     e.preventDefault()
    
//     const isValid = await validateRegistration()
    
//     if (isValid) {
//       try {
//         const result = await authService.register({
//           email,
//           password: registerPassword,
//           firstName,
//           lastName,
//           phoneNumber,
//           dob: formatDateToYYYYMMDD(dob)
//         })
        
//         if (result.success) {
//           localStorage.setItem('pendingEmail', email)
//           localStorage.setItem('pendingPassword', registerPassword)
//           localStorage.setItem('pendingPhoneNumber', phoneNumber)
//           localStorage.setItem('pendingFirstName', firstName)
//           localStorage.setItem('pendingLastName', lastName)
//           localStorage.setItem('pendingDob', formatDateToYYYYMMDD(dob))
//           localStorage.setItem('pendingLanguage', language)
//           localStorage.setItem('userId', result.data.userId)
          
//           const sessionToken = generateSessionToken()
//           localStorage.setItem('authToken', sessionToken)
//           localStorage.setItem('userFirstName', firstName)
//           localStorage.setItem('userLastName', lastName)
          
//           window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//             detail: { 
//               firstName: firstName,
//               lastName: lastName,
//               profileImage: localStorage.getItem('userProfileImage')
//             }
//           }))
          
//           sessionStorage.setItem('wizardFirstName', firstName)
//           sessionStorage.setItem('wizardLastName', lastName)
//           sessionStorage.setItem('wizardEmail', email)
//           sessionStorage.setItem('wizardPhone', phoneNumber)
//           sessionStorage.setItem('wizardDob', formatDateToYYYYMMDD(dob))
//           sessionStorage.setItem('wizardLanguage', language)
//           sessionStorage.setItem('wizardFromRegister', 'true')
          
//           navigate('/verify', { 
//             state: { 
//               email, 
//               phoneNumber, 
//               fullName: `${firstName} ${lastName}`,
//               firstName,
//               lastName,
//               registerPassword,
//               dob: formatDateToYYYYMMDD(dob)
//             } 
//           })
//         } else {
//           setLoginError(result.message || t('auth.loginError'))
//         }
        
//       } catch (error) {
//         console.error('❌ Registration error:', error)
//         setLoginError(error.message || t('auth.loginError'))
//       }
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

//   const customStyles = `
//     .custom-dob-picker {
//       width: 100%;
//     }

//     .custom-dob-picker select {
//       appearance: none;
//       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2317263a' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
//       background-repeat: no-repeat;
//       background-position: right 12px center;
//       padding: 8px 32px 8px 12px;
//       height: 44px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 10px;
//       font-size: 14px;
//       background-color: white;
//       width: 100%;
//       outline: none;
//       font-family: inherit;
//       cursor: pointer;
//       transition: all 0.2s ease;
//       box-sizing: border-box;
//     }

//     .custom-dob-picker select:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .custom-dob-picker select:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .custom-dob-picker select option {
//       padding: 8px 12px;
//       font-size: 14px;
//     }

//     .custom-dob-picker select:disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }

//     .dob-error {
//       color: #dc2626;
//       font-size: 11px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//     }

//     .dob-success {
//       color: #2fb463;
//       font-size: 11px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//     }

//     .dob-validation-container {
//       margin-top: 4px;
//       min-height: 20px;
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

//     .formGrid3 {
//       display: grid;
//       grid-template-columns: 1fr 1fr 1fr;
//       gap: 7px;
//       width: 100%;
//       max-width: 100%;
//       box-sizing: border-box;
//       margin-bottom: 2px;
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

//     .forgot-password-link {
//       text-align: center;
//       margin-top: 12px;
//       font-size: 14px;
//       color: rgba(23, 38, 58, 0.5);
//     }

//     .forgot-password-link button {
//       background: none;
//       border: none;
//       color: #0f4ea9;
//       cursor: pointer;
//       font-size: 14px;
//       font-weight: 500;
//       text-decoration: underline;
//       padding: 4px 8px;
//       transition: color 0.2s ease;
//     }

//     .forgot-password-link button:hover {
//       color: #0b3f90;
//     }

//     .auth-language-switcher {
//       margin-top: 12px;
//       display: flex;
//       justify-content: center;
//     }

//     .email-error {
//       color: #dc2626;
//       font-size: 12px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 6px;
//       padding: 6px 10px;
//       background: #fee2e2;
//       border-radius: 6px;
//     }

//     .email-error a {
//       color: #0f4ea9;
//       text-decoration: underline;
//       cursor: pointer;
//       font-weight: 600;
//     }

//     .email-error a:hover {
//       color: #0b3f90;
//     }

//     .email-checking {
//       color: #0f4ea9;
//       font-size: 12px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .email-available {
//       color: #2fb463;
//       font-size: 12px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//     }

//     .authCardCompact {
//       max-width: 100% !important;
//       overflow: visible !important;
//       padding: 16px 20px 20px 20px !important;
//       max-height: 90vh !important;
//       overflow-y: auto !important;
//     }

//     .dob-label {
//       font-size: 14px;
//       font-weight: 500;
//       color: #17263a;
//       margin-bottom: 4px;
//       display: block;
//     }

//     .dob-wrapper {
//       margin-bottom: 4px;
//     }
//   `

//   return (
//     <div className="authPage">
//       <style>{customStyles}</style>
//       <div className="bg bgAuth" />
//       <div className="bgOverlay" />
//       <main className="authMain">
//         <div className="authBrand">
//           <img className="authLogo" src="/assets/logo_tradesmap.png" alt="TradesMap" />
//           <div className="auth-language-switcher">
//             <LanguageSwitcher variant="inline" />
//           </div>
//         </div>
//         <div className="authCard authCardCompact">
//           <div className={`tabs ${mode}`}>
//             <button 
//               className={`tab ${mode === 'login' ? 'tabActive' : ''}`} 
//               onClick={() => navigate('/login')}
//             >
//               {t('auth.login')}
//             </button>
//             <button 
//               className={`tab ${mode === 'register' ? 'tabActive' : ''}`} 
//               onClick={() => navigate('/register')}
//             >
//               {t('auth.register')}
//             </button>
//             <div className={`tabIndicator ${mode === 'login' ? 'tabLeft' : 'tabRight'}`} />
//           </div>
          
//           <form onSubmit={onSubmit}>
//             {mode === 'login' ? (
//               <>
//                 {loginError && (
//                   <div className="login-error">❌ {loginError}</div>
//                 )}
                
//                 <TextField 
//                   placeholder={t('auth.email')} 
//                   icon={<IconUser />} 
//                   value={loginUsername} 
//                   onChange={setLoginUsername} 
//                   type="email"
//                 />
                
//                 <PasswordInput
//                   placeholder={t('auth.password')}
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
//                   {loginLoading ? t('auth.loggingIn') : t('auth.login')}
//                 </button>

//                 <div className="forgot-password-link">
//                   <button 
//                     type="button"
//                     onClick={() => setShowForgotPassword(true)}
//                   >
//                     {t('auth.forgotPassword')}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 {/* Row 1: First Name & Last Name */}
//                 <div className="formGrid2">
//                   <TextField 
//                     placeholder={t('auth.firstName')} 
//                     icon={<IconUser />} 
//                     value={firstName} 
//                     onChange={setFirstName} 
//                   />
//                   <TextField 
//                     placeholder={t('auth.lastName')} 
//                     icon={<IconUser />} 
//                     value={lastName} 
//                     onChange={setLastName} 
//                   />
//                 </div>
                
//                 {/* Row 2: Email & Phone Number */}
//                 <div className="formGrid2">
//                   <div className="field">
//                     <div className="fieldControl">
//                       <span className="fieldIcon"><IconMail /></span>
//                       <input
//                         type="email"
//                         className="fieldInput"
//                         placeholder={t('auth.emailAddress')}
//                         value={email}
//                         onChange={(e) => {
//                           const value = e.target.value
//                           handleEmailChange(value)
//                         }}
//                       />
//                     </div>
//                     {/* Email validation status */}
//                     <div style={{ marginTop: '2px' }}>
//                       {isCheckingEmail && (
//                         <div className="email-checking">
//                           <span>⏳</span> {t('auth.checkingEmail')}
//                         </div>
//                       )}
//                       {emailError && (
//                         <div className="email-error">
//                           <span>⚠️</span> {emailError}
//                           <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login') }}>
//                             {t('auth.logIn')}
//                           </a>
//                         </div>
//                       )}
//                       {email && !isCheckingEmail && !emailError && emailValid && email.length > 3 && (
//                         <div className="email-available">
//                           <span>✓</span> {t('auth.emailAvailable')}
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div style={{ width: '100%' }}>
//                     <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '10px', height: '44px', background: 'white', width: '100%' }}>
//                       <span style={{ 
//                         padding: '0 10px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '13px',
//                         borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
//                       }}>
//                         +1
//                       </span>
//                       <input 
//                         type="tel" 
//                         placeholder="555-555-5555" 
//                         value={phoneNumber}
//                         onChange={(e) => handlePhoneChange(e.target.value)} 
//                         maxLength={12}
//                         style={{ flex: 1, border: 'none', outline: 'none', padding: '0 10px', borderRadius: '10px', fontSize: '14px' }}
//                       />
//                     </div>
//                     {phoneError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{phoneError}</div>}
//                   </div>
//                 </div>
                
//                 {/* Row 3: Date of Birth - Full Row with Label */}
//                 <div className="dob-wrapper">
//                   <label className="dob-label">{t('auth.dateOfBirth')}</label>
//                   <div className="custom-dob-picker">
//                     <div className="formGrid3" style={{ gap: '7px' }}>
//                       {/* Year First */}
//                       <select 
//                         value={selectedYear}
//                         onChange={(e) => {
//                           const year = e.target.value
//                           setSelectedYear(year)
//                           if (year && selectedMonth && selectedDay) {
//                             handleDateChangeFromDropdown(
//                               parseInt(year),
//                               parseInt(selectedMonth), 
//                               parseInt(selectedDay)
//                             )
//                           }
//                         }}
//                       >
//                         <option value="">{t('auth.year') || 'Year'}</option>
//                         {getYearRange().map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>

//                       {/* Month Second */}
//                       <select 
//                         value={selectedMonth}
//                         onChange={(e) => {
//                           const month = e.target.value
//                           setSelectedMonth(month)
//                           if (selectedYear && month && selectedDay) {
//                             handleDateChangeFromDropdown(
//                               parseInt(selectedYear),
//                               parseInt(month), 
//                               parseInt(selectedDay)
//                             )
//                           }
//                         }}
//                       >
//                         <option value="">{t('auth.month') || 'Month'}</option>
//                         {getMonthOptions().map(month => (
//                           <option key={month.value} value={month.value}>
//                             {month.label}
//                           </option>
//                         ))}
//                       </select>

//                       {/* Day Third */}
//                       <select 
//                         value={selectedDay}
//                         onChange={(e) => {
//                           const day = e.target.value
//                           setSelectedDay(day)
//                           if (selectedYear && selectedMonth && day) {
//                             handleDateChangeFromDropdown(
//                               parseInt(selectedYear),
//                               parseInt(selectedMonth), 
//                               parseInt(day)
//                             )
//                           }
//                         }}
//                       >
//                         <option value="">{t('auth.day') || 'Day'}</option>
//                         {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
//                           <option key={day} value={day}>{day}</option>
//                         ))}
//                       </select>
//                     </div>
                    
//                     {/* DOB Validation Messages */}
//                     <div className="dob-validation-container">
//                       {dobError && (
//                         <div className="dob-error">
//                           <span>⚠️</span> {dobError}
//                         </div>
//                       )}
//                       {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) >= 18 && (
//                         <div className="dob-success">
//                           <span>✓</span> {t('auth.age')}: {calculateAge(formatDateToYYYYMMDD(dob))} {t('auth.years')}
//                         </div>
//                       )}
//                       {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) < 18 && calculateAge(formatDateToYYYYMMDD(dob)) > 0 && (
//                         <div className="dob-error">
//                           <span>⚠️</span> {t('auth.ageRequired')}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Row 4: Language - Full Row */}
//                 <div style={{ width: '100%', marginBottom: '4px' }}>
//                   <SelectField icon={<IconGlobe />} value={language} onChange={setLanguage}>
//                     <option value="" disabled>{t('auth.language')}</option>
//                     <option value="en">{t('wizard.step1.english')}</option>
//                     <option value="es">{t('wizard.step1.spanish')}</option>
//                   </SelectField>
//                 </div>
                
//                 {/* Row 5: Password & Confirm Password */}
//                 <div className="formGrid2">
//                   <PasswordInput
//                     placeholder={t('auth.password')}
//                     icon={<IconLock />}
//                     value={registerPassword}
//                     onChange={handlePasswordChange}
//                     showPassword={showRegisterPassword}
//                     onToggle={() => setShowRegisterPassword(!showRegisterPassword)}
//                   />
//                   <PasswordInput
//                     placeholder={t('auth.confirmPassword')}
//                     icon={<IconLock />}
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     showPassword={showConfirmPassword}
//                     onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//                   />
//                 </div>
                
//                 {/* Password Strength */}
//                 {registerPassword && (
//                   <div className="password-strength-container">
//                     <div 
//                       className="password-strength-bar" 
//                       style={{ 
//                         width: passwordStrength === t('auth.weak') ? '33%' : passwordStrength === t('auth.medium') ? '66%' : '100%',
//                         background: getStrengthColor()
//                       }} 
//                     />
//                     <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>
//                       {passwordStrength} {t('auth.passwordStrength')}
//                     </span>
//                     <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>
//                       ({t('auth.passwordRequirements')})
//                     </span>
//                   </div>
//                 )}
                
//                 {passwordError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '2px' }}>{passwordError}</div>}
                
//                 {/* Create Account Button */}
//                 <button
//                   type="submit"
//                   className="btn btnSuccess createAccountBtn"
//                   disabled={!!emailError || isCheckingEmail}
//                 >
//                   {t('auth.createAccount')}
//                 </button>
//               </>
//             )}
//           </form>
//         </div>
//       </main>

//       <ForgotPasswordModal
//         isOpen={showForgotPassword}
//         onClose={() => setShowForgotPassword(false)}
//         onSuccess={() => {
//           setShowForgotPassword(false)
//           console.log('Password reset email sent successfully')
//         }}
//       />
//     </div>
//   )
// }

// export default WorkerAuthPage




// // src/worker/pages/WorkerAuthPage.jsx
// import { useState, useEffect, useMemo, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { TextField, SelectField } from '../../common/components/TextField'
// import { IconUser, IconMail, IconLock, IconPhone, IconGlobe } from '../../common/components/Icons'
// import { formatPhoneNumber } from '../../common/utils/validation'
// import authService from '../../services/authService'
// import { ForgotPasswordModal } from '../components/ForgotPasswordModal'
// import { setUserLanguage, changeLanguage, getStoredLanguage } from '../../i18n/config'

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

// // Helper functions for date handling
// const getDaysInMonth = (month, year) => {
//   if (!month || !year) return 31
  
//   const monthsWith30Days = [4, 6, 9, 11]
  
//   if (monthsWith30Days.includes(parseInt(month))) {
//     return 30
//   }
  
//   if (parseInt(month) === 2) {
//     const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
//     return isLeapYear ? 29 : 28
//   }
  
//   return 31
// }

// const getMonthOptions = () => {
//   const months = []
//   for (let i = 1; i <= 12; i++) {
//     months.push({ value: i, label: new Date(2000, i - 1, 1).toLocaleString('default', { month: 'long' }) })
//   }
//   return months
// }

// const getYearRange = () => {
//   const currentYear = new Date().getFullYear()
//   const maxYear = currentYear - 18
//   const minYear = 1980
//   const years = []
  
//   for (let year = maxYear; year >= minYear; year--) {
//     years.push(year)
//   }
//   return years
// }

// export function WorkerAuthPage({ initialMode = 'login' }) {
//   const { t, i18n } = useTranslation()
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
  
//   const [selectedYear, setSelectedYear] = useState('')
//   const [selectedMonth, setSelectedMonth] = useState('')
//   const [selectedDay, setSelectedDay] = useState('')
//   const [daysInMonth, setDaysInMonth] = useState(31)
  
//   const [emailError, setEmailError] = useState('')
//   const [isCheckingEmail, setIsCheckingEmail] = useState(false)
//   const [emailCheckTimeout, setEmailCheckTimeout] = useState(null)
//   const [emailValid, setEmailValid] = useState(false)
  
//   const [showLoginPassword, setShowLoginPassword] = useState(false)
//   const [showRegisterPassword, setShowRegisterPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
//   const [phoneError, setPhoneError] = useState('')
//   const [passwordError, setPasswordError] = useState('')
//   const [passwordStrength, setPasswordStrength] = useState('')
//   const [dobError, setDobError] = useState('')

//   const [showForgotPassword, setShowForgotPassword] = useState(false)

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

//   useEffect(() => {
//     if (selectedMonth && selectedYear) {
//       const days = getDaysInMonth(parseInt(selectedMonth), parseInt(selectedYear))
//       setDaysInMonth(days)
//       if (selectedDay && parseInt(selectedDay) > days) {
//         setSelectedDay('')
//         if (dob) {
//           setDob('')
//           setDobError('')
//         }
//       }
//     }
//   }, [selectedMonth, selectedYear])

//   // ✅ Check for stored language on mount
//   useEffect(() => {
//     const storedLang = getStoredLanguage()
//     if (storedLang && storedLang !== i18n.language) {
//       changeLanguage(storedLang)
//     }
//   }, [i18n])

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
//       setDobError(t('auth.ageRequired'))
//       return false
//     }
//     if (age > 100) {
//       setDobError(t('auth.validDateOfBirth'))
//       return false
//     }
//     setDobError('')
//     return true
//   }

//   const handleDateChangeFromDropdown = (year, month, day) => {
//     if (year && month && day) {
//       const monthStr = String(month).padStart(2, '0')
//       const dayStr = String(day).padStart(2, '0')
//       const formattedDate = `${monthStr}/${dayStr}/${year}`
//       setDob(formattedDate)
//       validateDob(formattedDate)
//     } else {
//       setDob('')
//       setDobError('')
//     }
//   }

//   const validatePassword = (password) => {
//     if (password.length < 8) {
//       return { valid: false, message: t('auth.passwordMinLength') }
//     }
//     const hasLetter = /[A-Za-z]/.test(password)
//     const hasNumber = /[0-9]/.test(password)
//     if (!hasLetter || !hasNumber) {
//       return { valid: false, message: t('auth.passwordLettersNumbers') }
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
//     if (strength <= 2) return t('auth.weak')
//     if (strength <= 4) return t('auth.medium')
//     return t('auth.strong')
//   }

//   const handlePhoneChange = (value) => {
//     const formatted = formatPhoneNumber(value)
//     setPhoneNumber(formatted)
//     const digits = formatted.replace(/\D/g, '')
//     if (digits.length === 10) {
//       setPhoneError('')
//     } else if (digits.length > 0 && digits.length < 10) {
//       setPhoneError(t('auth.phoneRequired'))
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
//       setPasswordError(t('auth.passwordsDoNotMatch'))
//     } else {
//       setPasswordError('')
//     }
//   }

//   const handleConfirmPasswordChange = (value) => {
//     setConfirmPassword(value)
//     if (registerPassword !== value) {
//       setPasswordError(t('auth.passwordsDoNotMatch'))
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
//       case t('auth.weak'): return '#e11d48'
//       case t('auth.medium'): return '#f59e0b'
//       case t('auth.strong'): return '#2fb463'
//       default: return 'rgba(23,38,58,0.3)'
//     }
//   }

//   const checkEmailExists = async (emailToCheck) => {
//     if (!emailToCheck || emailToCheck.length < 3) {
//       setEmailError('')
//       setEmailValid(false)
//       return false
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     if (!emailRegex.test(emailToCheck)) {
//       setEmailError(t('auth.validEmail'))
//       setEmailValid(false)
//       return false
//     }

//     setIsCheckingEmail(true)
//     setEmailError('')
//     setEmailValid(false)

//     try {
//       const url = `/api/worker/email/${encodeURIComponent(emailToCheck)}`
//       const response = await fetch(url)
//       const data = await response.json()

//       if (data.success && data.data && data.data.length > 0) {
//         setEmailError(t('auth.emailAlreadyRegistered'))
//         setEmailValid(false)
//         return true
//       } else {
//         setEmailError('')
//         setEmailValid(true)
//         return false
//       }
//     } catch (error) {
//       console.error('❌ Fetch error:', error)
//       setEmailError('')
//       setEmailValid(true)
//       return false
//     } finally {
//       setIsCheckingEmail(false)
//     }
//   }

//   const handleEmailChange = (value) => {
//     setEmail(value)
//     setEmailError('')
//     setEmailValid(false)
    
//     if (emailCheckTimeout) {
//       clearTimeout(emailCheckTimeout)
//     }

//     if (value && value.length > 3) {
//       const timeout = setTimeout(() => {
//         checkEmailExists(value)
//       }, 500)
//       setEmailCheckTimeout(timeout)
//     }
//   }

//   const generateSessionToken = () => {
//     return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//   }

//   // ============================================================
//   // ✅ LOGIN HANDLER - Restore language from database
//   // ============================================================

//   const handleLogin = async (e) => {
//     e.preventDefault()
    
//     if (!loginUsername || !loginPassword) {
//       setLoginError(t('auth.enterEmailAndPassword'))
//       return
//     }

//     setLoginLoading(true)
//     setLoginError('')

//     try {
//       const result = await authService.login(loginUsername, loginPassword)
      
//       if (result.success) {
//         const token = result.data?.token || generateSessionToken()
//         const userId = result.data?.userId || ''
//         const userLanguage = result.data?.language || 'en'
        
//         localStorage.setItem('authToken', token)
//         localStorage.setItem('userId', userId)
        
//         setUserLanguage(userLanguage)
        
//         if (result.data?.profile?.basics) {
//           const basics = result.data.profile.basics
//           localStorage.setItem('userFirstName', basics.legalFirstName || '')
//           localStorage.setItem('userLastName', basics.legalLastName || '')
//           localStorage.setItem('pendingFirstName', basics.legalFirstName || '')
//           localStorage.setItem('pendingLastName', basics.legalLastName || '')
//           localStorage.setItem('pendingEmail', basics.emailAddress || '')
//         }
        
//         window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//           detail: { 
//             firstName: localStorage.getItem('userFirstName') || 'User',
//             profileImage: localStorage.getItem('userProfileImage')
//           }
//         }))
        
//         navigate('/wizard/summary', { replace: true })
//       }
      
//     } catch (error) {
//       console.error('❌ Login error:', error)
//       setLoginError(error.message || t('auth.loginError'))
//     } finally {
//       setLoginLoading(false)
//     }
//   }

//   // ============================================================
//   // ✅ REGISTER HANDLER - Save language to database
//   // ============================================================

//   const validateRegistration = async () => {
//     const phoneDigits = phoneNumber.replace(/\D/g, '')
//     const isPhoneValid = phoneDigits.length === 10
//     const passwordValidation = validatePassword(registerPassword)
//     const isPasswordValid = passwordValidation.valid && registerPassword === confirmPassword
//     const age = calculateAge(formatDateToYYYYMMDD(dob))
//     const isAgeValid = age >= 18
    
//     let isEmailAvailable = true
//     if (email && !emailError) {
//       const exists = await checkEmailExists(email)
//       if (exists) {
//         isEmailAvailable = false
//       }
//     }
    
//     if (!isAgeValid) {
//       setDobError(t('auth.ageRequired'))
//     }
//     if (!isPhoneValid) {
//       setPhoneError(t('auth.phoneRequired'))
//     }
//     if (!passwordValidation.valid) {
//       setPasswordError(passwordValidation.message)
//     }
//     if (registerPassword !== confirmPassword) {
//       setPasswordError(t('auth.passwordsDoNotMatch'))
//     }
    
//     return isPhoneValid && isPasswordValid && isAgeValid && isEmailAvailable
//   }

//   const handleRegister = async (e) => {
//     e.preventDefault()
    
//     const isValid = await validateRegistration()
    
//     if (isValid) {
//       try {
//         const result = await authService.register({
//           email,
//           password: registerPassword,
//           firstName,
//           lastName,
//           phoneNumber,
//           dob: formatDateToYYYYMMDD(dob),
//           language: language
//         })
        
//         if (result.success) {
//           localStorage.setItem('pendingEmail', email)
//           localStorage.setItem('pendingPassword', registerPassword)
//           localStorage.setItem('pendingPhoneNumber', phoneNumber)
//           localStorage.setItem('pendingFirstName', firstName)
//           localStorage.setItem('pendingLastName', lastName)
//           localStorage.setItem('pendingDob', formatDateToYYYYMMDD(dob))
//           localStorage.setItem('pendingLanguage', language)
//           localStorage.setItem('userId', result.data.userId)
          
//           setUserLanguage(language)
          
//           const sessionToken = generateSessionToken()
//           localStorage.setItem('authToken', sessionToken)
//           localStorage.setItem('userFirstName', firstName)
//           localStorage.setItem('userLastName', lastName)
          
//           window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//             detail: { 
//               firstName: firstName,
//               lastName: lastName,
//               profileImage: localStorage.getItem('userProfileImage')
//             }
//           }))
          
//           sessionStorage.setItem('wizardFirstName', firstName)
//           sessionStorage.setItem('wizardLastName', lastName)
//           sessionStorage.setItem('wizardEmail', email)
//           sessionStorage.setItem('wizardPhone', phoneNumber)
//           sessionStorage.setItem('wizardDob', formatDateToYYYYMMDD(dob))
//           sessionStorage.setItem('wizardLanguage', language)
//           sessionStorage.setItem('wizardFromRegister', 'true')
          
//           navigate('/verify', { 
//             state: { 
//               email, 
//               phoneNumber, 
//               fullName: `${firstName} ${lastName}`,
//               firstName,
//               lastName,
//               registerPassword,
//               dob: formatDateToYYYYMMDD(dob),
//               language: language
//             } 
//           })
//         } else {
//           setLoginError(result.message || t('auth.loginError'))
//         }
        
//       } catch (error) {
//         console.error('❌ Registration error:', error)
//         setLoginError(error.message || t('auth.loginError'))
//       }
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

//   const customStyles = `
//     .custom-dob-picker {
//       width: 100%;
//     }

//     .custom-dob-picker select {
//       appearance: none;
//       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2317263a' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
//       background-repeat: no-repeat;
//       background-position: right 12px center;
//       padding: 8px 32px 8px 12px;
//       height: 44px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 10px;
//       font-size: 14px;
//       background-color: white;
//       width: 100%;
//       outline: none;
//       font-family: inherit;
//       cursor: pointer;
//       transition: all 0.2s ease;
//       box-sizing: border-box;
//     }

//     .custom-dob-picker select:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .custom-dob-picker select:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .custom-dob-picker select option {
//       padding: 8px 12px;
//       font-size: 14px;
//     }

//     .custom-dob-picker select:disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }

//     .dob-error {
//       color: #dc2626;
//       font-size: 11px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//     }

//     .dob-success {
//       color: #2fb463;
//       font-size: 11px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//     }

//     .dob-validation-container {
//       margin-top: 4px;
//       min-height: 20px;
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

//     .formGrid3 {
//       display: grid;
//       grid-template-columns: 1fr 1fr 1fr;
//       gap: 7px;
//       width: 100%;
//       max-width: 100%;
//       box-sizing: border-box;
//       margin-bottom: 2px;
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

//     .forgot-password-link {
//       text-align: center;
//       margin-top: 12px;
//       font-size: 14px;
//       color: rgba(23, 38, 58, 0.5);
//     }

//     .forgot-password-link button {
//       background: none;
//       border: none;
//       color: #0f4ea9;
//       cursor: pointer;
//       font-size: 14px;
//       font-weight: 500;
//       text-decoration: underline;
//       padding: 4px 8px;
//       transition: color 0.2s ease;
//     }

//     .forgot-password-link button:hover {
//       color: #0b3f90;
//     }

//     .auth-language-switcher {
//       margin-top: 12px;
//       display: flex;
//       justify-content: center;
//     }

//     .email-error {
//       color: #dc2626;
//       font-size: 12px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 6px;
//       padding: 6px 10px;
//       background: #fee2e2;
//       border-radius: 6px;
//     }

//     .email-error a {
//       color: #0f4ea9;
//       text-decoration: underline;
//       cursor: pointer;
//       font-weight: 600;
//     }

//     .email-error a:hover {
//       color: #0b3f90;
//     }

//     .email-checking {
//       color: #0f4ea9;
//       font-size: 12px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 6px;
//     }

//     .email-available {
//       color: #2fb463;
//       font-size: 12px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//     }

//     .authCardCompact {
//       max-width: 100% !important;
//       overflow: visible !important;
//       padding: 16px 20px 20px 20px !important;
//       max-height: 90vh !important;
//       overflow-y: auto !important;
//     }

//     .dob-label {
//       font-size: 14px;
//       font-weight: 500;
//       color: #17263a;
//       margin-bottom: 4px;
//       display: block;
//     }

//     .dob-wrapper {
//       margin-bottom: 4px;
//     }
//   `

//   return (
//     <div className="authPage">
//       <style>{customStyles}</style>
//       <div className="bg bgAuth" />
//       <div className="bgOverlay" />
//       <main className="authMain">
//         <div className="authBrand">
//           <img className="authLogo" src="/assets/logo_tradesmap.png" alt="TradesMap" />
//           {/* ❌ REMOVED: LanguageSwitcher */}
//         </div>
//         <div className="authCard authCardCompact">
//           <div className={`tabs ${mode}`}>
//             <button 
//               className={`tab ${mode === 'login' ? 'tabActive' : ''}`} 
//               onClick={() => navigate('/login')}
//             >
//               {t('auth.login')}
//             </button>
//             <button 
//               className={`tab ${mode === 'register' ? 'tabActive' : ''}`} 
//               onClick={() => navigate('/register')}
//             >
//               {t('auth.register')}
//             </button>
//             <div className={`tabIndicator ${mode === 'login' ? 'tabLeft' : 'tabRight'}`} />
//           </div>
          
//           <form onSubmit={onSubmit}>
//             {mode === 'login' ? (
//               <>
//                 {loginError && (
//                   <div className="login-error">❌ {loginError}</div>
//                 )}
                
//                 <TextField 
//                   placeholder={t('auth.email')} 
//                   icon={<IconUser />} 
//                   value={loginUsername} 
//                   onChange={setLoginUsername} 
//                   type="email"
//                 />
                
//                 <PasswordInput
//                   placeholder={t('auth.password')}
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
//                   {loginLoading ? t('auth.loggingIn') : t('auth.login')}
//                 </button>

//                 <div className="forgot-password-link">
//                   <button 
//                     type="button"
//                     onClick={() => setShowForgotPassword(true)}
//                   >
//                     {t('auth.forgotPassword')}
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 {/* Row 1: First Name & Last Name */}
//                 <div className="formGrid2">
//                   <TextField 
//                     placeholder={t('auth.firstName')} 
//                     icon={<IconUser />} 
//                     value={firstName} 
//                     onChange={setFirstName} 
//                   />
//                   <TextField 
//                     placeholder={t('auth.lastName')} 
//                     icon={<IconUser />} 
//                     value={lastName} 
//                     onChange={setLastName} 
//                   />
//                 </div>
                
//                 {/* Row 2: Email & Phone Number */}
//                 <div className="formGrid2">
//                   <div className="field">
//                     <div className="fieldControl">
//                       <span className="fieldIcon"><IconMail /></span>
//                       <input
//                         type="email"
//                         className="fieldInput"
//                         placeholder={t('auth.emailAddress')}
//                         value={email}
//                         onChange={(e) => {
//                           const value = e.target.value
//                           handleEmailChange(value)
//                         }}
//                       />
//                     </div>
//                     {/* Email validation status */}
//                     <div style={{ marginTop: '2px' }}>
//                       {isCheckingEmail && (
//                         <div className="email-checking">
//                           <span>⏳</span> {t('auth.checkingEmail')}
//                         </div>
//                       )}
//                       {emailError && (
//                         <div className="email-error">
//                           <span>⚠️</span> {emailError}
//                           <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login') }}>
//                             {t('auth.logIn')}
//                           </a>
//                         </div>
//                       )}
//                       {email && !isCheckingEmail && !emailError && emailValid && email.length > 3 && (
//                         <div className="email-available">
//                           <span>✓</span> {t('auth.emailAvailable')}
//                         </div>
//                       )}
//                     </div>
//                   </div>
                  
//                   <div style={{ width: '100%' }}>
//                     <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '10px', height: '44px', background: 'white', width: '100%' }}>
//                       <span style={{ 
//                         padding: '0 10px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '13px',
//                         borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
//                       }}>
//                         +1
//                       </span>
//                       <input 
//                         type="tel" 
//                         placeholder="555-555-5555" 
//                         value={phoneNumber}
//                         onChange={(e) => handlePhoneChange(e.target.value)} 
//                         maxLength={12}
//                         style={{ flex: 1, border: 'none', outline: 'none', padding: '0 10px', borderRadius: '10px', fontSize: '14px' }}
//                       />
//                     </div>
//                     {phoneError && <div style={{ color: '#e11d48', fontSize: '11px', marginTop: '2px' }}>{phoneError}</div>}
//                   </div>
//                 </div>
                
//                 {/* Row 3: Date of Birth - Full Row with Label */}
//                 <div className="dob-wrapper">
//                   <label className="dob-label">{t('auth.dateOfBirth')}</label>
//                   <div className="custom-dob-picker">
//                     <div className="formGrid3" style={{ gap: '7px' }}>
//                       {/* Year First */}
//                       <select 
//                         value={selectedYear}
//                         onChange={(e) => {
//                           const year = e.target.value
//                           setSelectedYear(year)
//                           if (year && selectedMonth && selectedDay) {
//                             handleDateChangeFromDropdown(
//                               parseInt(year),
//                               parseInt(selectedMonth), 
//                               parseInt(selectedDay)
//                             )
//                           }
//                         }}
//                       >
//                         <option value="">{t('auth.year') || 'Year'}</option>
//                         {getYearRange().map(year => (
//                           <option key={year} value={year}>{year}</option>
//                         ))}
//                       </select>

//                       {/* Month Second */}
//                       <select 
//                         value={selectedMonth}
//                         onChange={(e) => {
//                           const month = e.target.value
//                           setSelectedMonth(month)
//                           if (selectedYear && month && selectedDay) {
//                             handleDateChangeFromDropdown(
//                               parseInt(selectedYear),
//                               parseInt(month), 
//                               parseInt(selectedDay)
//                             )
//                           }
//                         }}
//                       >
//                         <option value="">{t('auth.month') || 'Month'}</option>
//                         {getMonthOptions().map(month => (
//                           <option key={month.value} value={month.value}>
//                             {month.label}
//                           </option>
//                         ))}
//                       </select>

//                       {/* Day Third */}
//                       <select 
//                         value={selectedDay}
//                         onChange={(e) => {
//                           const day = e.target.value
//                           setSelectedDay(day)
//                           if (selectedYear && selectedMonth && day) {
//                             handleDateChangeFromDropdown(
//                               parseInt(selectedYear),
//                               parseInt(selectedMonth), 
//                               parseInt(day)
//                             )
//                           }
//                         }}
//                       >
//                         <option value="">{t('auth.day') || 'Day'}</option>
//                         {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
//                           <option key={day} value={day}>{day}</option>
//                         ))}
//                       </select>
//                     </div>
                    
//                     {/* DOB Validation Messages */}
//                     <div className="dob-validation-container">
//                       {dobError && (
//                         <div className="dob-error">
//                           <span>⚠️</span> {dobError}
//                         </div>
//                       )}
//                       {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) >= 18 && (
//                         <div className="dob-success">
//                           <span>✓</span> {t('auth.age')}: {calculateAge(formatDateToYYYYMMDD(dob))} {t('auth.years')}
//                         </div>
//                       )}
//                       {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) < 18 && calculateAge(formatDateToYYYYMMDD(dob)) > 0 && (
//                         <div className="dob-error">
//                           <span>⚠️</span> {t('auth.ageRequired')}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
                
//                 {/* Row 4: Language - Full Row */}
//                 <div style={{ width: '100%', marginBottom: '4px' }}>
//                   <SelectField icon={<IconGlobe />} value={language} onChange={setLanguage}>
//                     <option value="" disabled>{t('auth.language')}</option>
//                     <option value="en">{t('wizard.step1.english')}</option>
//                     <option value="es">{t('wizard.step1.spanish')}</option>
//                   </SelectField>
//                 </div>
                
//                 {/* Row 5: Password & Confirm Password */}
//                 <div className="formGrid2">
//                   <PasswordInput
//                     placeholder={t('auth.password')}
//                     icon={<IconLock />}
//                     value={registerPassword}
//                     onChange={handlePasswordChange}
//                     showPassword={showRegisterPassword}
//                     onToggle={() => setShowRegisterPassword(!showRegisterPassword)}
//                   />
//                   <PasswordInput
//                     placeholder={t('auth.confirmPassword')}
//                     icon={<IconLock />}
//                     value={confirmPassword}
//                     onChange={handleConfirmPasswordChange}
//                     showPassword={showConfirmPassword}
//                     onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
//                   />
//                 </div>
                
//                 {/* Password Strength */}
//                 {registerPassword && (
//                   <div className="password-strength-container">
//                     <div 
//                       className="password-strength-bar" 
//                       style={{ 
//                         width: passwordStrength === t('auth.weak') ? '33%' : passwordStrength === t('auth.medium') ? '66%' : '100%',
//                         background: getStrengthColor()
//                       }} 
//                     />
//                     <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>
//                       {passwordStrength} {t('auth.passwordStrength')}
//                     </span>
//                     <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>
//                       ({t('auth.passwordRequirements')})
//                     </span>
//                   </div>
//                 )}
                
//                 {passwordError && <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '2px' }}>{passwordError}</div>}
                
//                 {/* Create Account Button */}
//                 <button
//                   type="submit"
//                   className="btn btnSuccess createAccountBtn"
//                   disabled={!!emailError || isCheckingEmail}
//                 >
//                   {t('auth.createAccount')}
//                 </button>
//               </>
//             )}
//           </form>
//         </div>
//       </main>

//       <ForgotPasswordModal
//         isOpen={showForgotPassword}
//         onClose={() => setShowForgotPassword(false)}
//         onSuccess={() => {
//           setShowForgotPassword(false)
//           console.log('Password reset email sent successfully')
//         }}
//       />
//     </div>
//   )
// }

// export default WorkerAuthPage














// src/worker/pages/WorkerAuthPage.jsx
import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TextField, SelectField } from '../../common/components/TextField'
import { IconUser, IconMail, IconLock, IconPhone, IconGlobe } from '../../common/components/Icons'
import { formatPhoneNumber } from '../../common/utils/validation'
import authService from '../../services/authService'
import { ForgotPasswordModal } from '../components/ForgotPasswordModal'
import { setUserLanguage, changeLanguage, getStoredLanguage } from '../../i18n/config'

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
function PasswordInput({ placeholder, value, onChange, icon, showPassword, onToggle, error }) {
  return (
    <div className="password-input-wrapper">
      <div className={`password-input-container ${error ? 'password-input-error' : ''}`}>
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

// Helper functions for date handling
const getDaysInMonth = (month, year) => {
  if (!month || !year) return 31
  
  const monthsWith30Days = [4, 6, 9, 11]
  
  if (monthsWith30Days.includes(parseInt(month))) {
    return 30
  }
  
  if (parseInt(month) === 2) {
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)
    return isLeapYear ? 29 : 28
  }
  
  return 31
}

const getMonthOptions = () => {
  const months = []
  for (let i = 1; i <= 12; i++) {
    months.push({ value: i, label: new Date(2000, i - 1, 1).toLocaleString('default', { month: 'long' }) })
  }
  return months
}

const getYearRange = () => {
  const currentYear = new Date().getFullYear()
  const maxYear = currentYear - 18
  const minYear = 1980
  const years = []
  
  for (let year = maxYear; year >= minYear; year--) {
    years.push(year)
  }
  return years
}

export function WorkerAuthPage({ initialMode = 'login' }) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  const [mode, setMode] = useState(initialMode)
  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [loginLoading, setLoginLoading] = useState(false)
  
  // Registration fields
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [dob, setDob] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [language, setLanguage] = useState('')
  
  // Date dropdown states
  const [selectedYear, setSelectedYear] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedDay, setSelectedDay] = useState('')
  const [daysInMonth, setDaysInMonth] = useState(31)
  
  // Validation errors
  const [emailError, setEmailError] = useState('')
  const [isCheckingEmail, setIsCheckingEmail] = useState(false)
  const [emailCheckTimeout, setEmailCheckTimeout] = useState(null)
  const [emailValid, setEmailValid] = useState(false)
  
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
  const [phoneError, setPhoneError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState('')
  const [dobError, setDobError] = useState('')
  
  // ✅ NEW: Field validation errors
  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [languageError, setLanguageError] = useState('')

  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [registerError, setRegisterError] = useState('')

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

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const days = getDaysInMonth(parseInt(selectedMonth), parseInt(selectedYear))
      setDaysInMonth(days)
      if (selectedDay && parseInt(selectedDay) > days) {
        setSelectedDay('')
        if (dob) {
          setDob('')
          setDobError('')
        }
      }
    }
  }, [selectedMonth, selectedYear])

  // ✅ Check for stored language on mount
  useEffect(() => {
    const storedLang = getStoredLanguage()
    if (storedLang && storedLang !== i18n.language) {
      changeLanguage(storedLang)
    }
  }, [i18n])

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
      setDobError(t('auth.ageRequired'))
      return false
    }
    const age = calculateAge(dateStr)
    if (age < 18) {
      setDobError(t('auth.ageRequired'))
      return false
    }
    if (age > 100) {
      setDobError(t('auth.validDateOfBirth'))
      return false
    }
    setDobError('')
    return true
  }

  const handleDateChangeFromDropdown = (year, month, day) => {
    if (year && month && day) {
      const monthStr = String(month).padStart(2, '0')
      const dayStr = String(day).padStart(2, '0')
      const formattedDate = `${monthStr}/${dayStr}/${year}`
      setDob(formattedDate)
      validateDob(formattedDate)
    } else {
      setDob('')
      setDobError('')
    }
  }

  const validatePassword = (password) => {
    if (password.length < 8) {
      return { valid: false, message: t('auth.passwordMinLength') }
    }
    const hasLetter = /[A-Za-z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    if (!hasLetter || !hasNumber) {
      return { valid: false, message: t('auth.passwordLettersNumbers') }
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
    if (strength <= 2) return t('auth.weak')
    if (strength <= 4) return t('auth.medium')
    return t('auth.strong')
  }

  const handlePhoneChange = (value) => {
    const formatted = formatPhoneNumber(value)
    setPhoneNumber(formatted)
    const digits = formatted.replace(/\D/g, '')
    if (digits.length === 10) {
      setPhoneError('')
    } else if (digits.length > 0 && digits.length < 10) {
      setPhoneError(t('auth.phoneRequired'))
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
      setPasswordError(t('auth.passwordsDoNotMatch'))
    } else {
      setPasswordError('')
    }
  }

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value)
    if (registerPassword !== value) {
      setPasswordError(t('auth.passwordsDoNotMatch'))
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
      case t('auth.weak'): return '#e11d48'
      case t('auth.medium'): return '#f59e0b'
      case t('auth.strong'): return '#2fb463'
      default: return 'rgba(23,38,58,0.3)'
    }
  }

  const checkEmailExists = async (emailToCheck) => {
    if (!emailToCheck || emailToCheck.length < 3) {
      setEmailError('')
      setEmailValid(false)
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(emailToCheck)) {
      setEmailError(t('auth.validEmail'))
      setEmailValid(false)
      return false
    }

    setIsCheckingEmail(true)
    setEmailError('')
    setEmailValid(false)

    try {
      const url = `/api/worker/email/${encodeURIComponent(emailToCheck)}`
      const response = await fetch(url)
      const data = await response.json()

      if (data.success && data.data && data.data.length > 0) {
        setEmailError(t('auth.emailAlreadyRegistered'))
        setEmailValid(false)
        return true
      } else {
        setEmailError('')
        setEmailValid(true)
        return false
      }
    } catch (error) {
      console.error('❌ Fetch error:', error)
      setEmailError('')
      setEmailValid(true)
      return false
    } finally {
      setIsCheckingEmail(false)
    }
  }

  const handleEmailChange = (value) => {
    setEmail(value)
    setEmailError('')
    setEmailValid(false)
    
    if (emailCheckTimeout) {
      clearTimeout(emailCheckTimeout)
    }

    if (value && value.length > 3) {
      const timeout = setTimeout(() => {
        checkEmailExists(value)
      }, 500)
      setEmailCheckTimeout(timeout)
    }
  }

  const generateSessionToken = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // ============================================================
  // ✅ LOGIN HANDLER
  // ============================================================

  const handleLogin = async (e) => {
    e.preventDefault()
    
    if (!loginUsername || !loginPassword) {
      setLoginError(t('auth.enterEmailAndPassword'))
      return
    }

    setLoginLoading(true)
    setLoginError('')

    try {
      const result = await authService.login(loginUsername, loginPassword)
      
      if (result.success) {
        const token = result.data?.token || generateSessionToken()
        const userId = result.data?.userId || ''
        const userLanguage = result.data?.language || 'en'
        
        localStorage.setItem('authToken', token)
        localStorage.setItem('userId', userId)
        
        setUserLanguage(userLanguage)
        
        if (result.data?.profile?.basics) {
          const basics = result.data.profile.basics
          localStorage.setItem('userFirstName', basics.legalFirstName || '')
          localStorage.setItem('userLastName', basics.legalLastName || '')
          localStorage.setItem('pendingFirstName', basics.legalFirstName || '')
          localStorage.setItem('pendingLastName', basics.legalLastName || '')
          localStorage.setItem('pendingEmail', basics.emailAddress || '')
        }
        
        window.dispatchEvent(new CustomEvent('profileImageUpdated', {
          detail: { 
            firstName: localStorage.getItem('userFirstName') || 'User',
            profileImage: localStorage.getItem('userProfileImage')
          }
        }))
        
        navigate('/wizard/summary', { replace: true })
      }
      
    } catch (error) {
      console.error('❌ Login error:', error)
      setLoginError(error.message || t('auth.loginError'))
    } finally {
      setLoginLoading(false)
    }
  }

  // ============================================================
  // ✅ REGISTER HANDLER - With all validations
  // ============================================================

  const validateRegistration = () => {
    let isValid = true
    let errorMessages = []

    // ✅ First Name - Required
    if (!firstName.trim()) {
      setFirstNameError(t('auth.firstName') + ' is required')
      isValid = false
    } else {
      setFirstNameError('')
    }

    // ✅ Last Name - Required
    if (!lastName.trim()) {
      setLastNameError(t('auth.lastName') + ' is required')
      isValid = false
    } else {
      setLastNameError('')
    }

    // ✅ Email - Required (already handled by email validation)
    if (!email || emailError) {
      isValid = false
    }

    // ✅ Phone - Required
    const phoneDigits = phoneNumber.replace(/\D/g, '')
    if (phoneDigits.length !== 10) {
      setPhoneError(t('auth.phoneRequired'))
      isValid = false
    } else {
      setPhoneError('')
    }

    // ✅ Date of Birth - Required
    const age = calculateAge(formatDateToYYYYMMDD(dob))
    if (!dob || age < 18) {
      setDobError(t('auth.ageRequired'))
      isValid = false
    } else {
      setDobError('')
    }

    // ✅ Language Selection - Required
    if (!language) {
      setLanguageError('Language selection is required')
      isValid = false
    } else {
      setLanguageError('')
    }

    // ✅ Password - Required
    const passwordValidation = validatePassword(registerPassword)
    if (!passwordValidation.valid) {
      setPasswordError(passwordValidation.message)
      isValid = false
    }

    // ✅ Confirm Password - Required
    if (!confirmPassword || registerPassword !== confirmPassword) {
      setPasswordError(t('auth.passwordsDoNotMatch'))
      isValid = false
    }

    // ✅ Check if email is available
    if (email && !emailError && !emailValid) {
      // Email validation is async, handled separately
      // But if there's an email error, it's already invalid
      if (emailError) {
        isValid = false
      }
    }

    return isValid
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setRegisterError('')
    
    const isValid = validateRegistration()
    
    if (!isValid) {
      // Scroll to the first error
      const firstError = document.querySelector('.field-error, .password-input-error, .dob-error, .email-error')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      return
    }

    try {
      const result = await authService.register({
        email,
        password: registerPassword,
        firstName,
        lastName,
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        dob: formatDateToYYYYMMDD(dob),
        language: language
      })
      
      if (result.success) {
        localStorage.setItem('pendingEmail', email)
        localStorage.setItem('pendingPassword', registerPassword)
        localStorage.setItem('pendingPhoneNumber', phoneNumber.replace(/\D/g, ''))
        localStorage.setItem('pendingFirstName', firstName)
        localStorage.setItem('pendingLastName', lastName)
        localStorage.setItem('pendingDob', formatDateToYYYYMMDD(dob))
        localStorage.setItem('pendingLanguage', language)
        localStorage.setItem('userId', result.data.userId)
        
        setUserLanguage(language)
        
        const sessionToken = generateSessionToken()
        localStorage.setItem('authToken', sessionToken)
        localStorage.setItem('userFirstName', firstName)
        localStorage.setItem('userLastName', lastName)
        
        window.dispatchEvent(new CustomEvent('profileImageUpdated', {
          detail: { 
            firstName: firstName,
            lastName: lastName,
            profileImage: localStorage.getItem('userProfileImage')
          }
        }))
        
        sessionStorage.setItem('wizardFirstName', firstName)
        sessionStorage.setItem('wizardLastName', lastName)
        sessionStorage.setItem('wizardEmail', email)
        sessionStorage.setItem('wizardPhone', phoneNumber.replace(/\D/g, ''))
        sessionStorage.setItem('wizardDob', formatDateToYYYYMMDD(dob))
        sessionStorage.setItem('wizardLanguage', language)
        sessionStorage.setItem('wizardFromRegister', 'true')
        
        navigate('/verify', { 
          state: { 
            email, 
            phoneNumber: phoneNumber.replace(/\D/g, ''), 
            fullName: `${firstName} ${lastName}`,
            firstName,
            lastName,
            registerPassword,
            dob: formatDateToYYYYMMDD(dob),
            language: language
          } 
        })
      } else {
        setRegisterError(result.message || t('auth.loginError'))
      }
      
    } catch (error) {
      console.error('❌ Registration error:', error)
      setRegisterError(error.message || t('auth.loginError'))
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    
    if (mode === 'login') {
      handleLogin(e)
    } else {
      handleRegister(e)
    }
  }

  const customStyles = `
    .custom-dob-picker {
      width: 100%;
    }

    .custom-dob-picker select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2317263a' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
      padding: 8px 32px 8px 12px;
      height: 44px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 10px;
      font-size: 14px;
      background-color: white;
      width: 100%;
      outline: none;
      font-family: inherit;
      cursor: pointer;
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    .custom-dob-picker select:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .custom-dob-picker select:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .custom-dob-picker select option {
      padding: 8px 12px;
      font-size: 14px;
    }

    .custom-dob-picker select:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .dob-error {
      color: #dc2626;
      font-size: 11px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .dob-success {
      color: #2fb463;
      font-size: 11px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .dob-validation-container {
      margin-top: 4px;
      min-height: 20px;
    }

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

    .password-input-error {
      border-color: #dc2626 !important;
    }

    .password-input-error:focus-within {
      border-color: #dc2626 !important;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
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

    .formGrid3 {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 7px;
      width: 100%;
      max-width: 100%;
      box-sizing: border-box;
      margin-bottom: 2px;
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

    .register-error {
      color: #dc2626;
      font-size: 13px;
      padding: 8px 12px;
      background: #fee2e2;
      border-radius: 8px;
      margin-bottom: 4px;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .forgot-password-link {
      text-align: center;
      margin-top: 12px;
      font-size: 14px;
      color: rgba(23, 38, 58, 0.5);
    }

    .forgot-password-link button {
      background: none;
      border: none;
      color: #0f4ea9;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      text-decoration: underline;
      padding: 4px 8px;
      transition: color 0.2s ease;
    }

    .forgot-password-link button:hover {
      color: #0b3f90;
    }

    .auth-language-switcher {
      margin-top: 12px;
      display: flex;
      justify-content: center;
    }

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

    .authCardCompact {
      max-width: 100% !important;
      overflow: visible !important;
      padding: 16px 20px 20px 20px !important;
      max-height: 90vh !important;
      overflow-y: auto !important;
    }

    .dob-label {
      font-size: 14px;
      font-weight: 500;
      color: #17263a;
      margin-bottom: 4px;
      display: block;
    }

    .dob-wrapper {
      margin-bottom: 4px;
    }

    .field-error {
      color: #dc2626;
      font-size: 11px;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .field-success {
      color: #2fb463;
      font-size: 11px;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .field-error-input {
      border-color: #dc2626 !important;
    }

    .field-error-input:focus {
      border-color: #dc2626 !important;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }
  `

  return (
    <div className="authPage">
      <style>{customStyles}</style>
      <div className="bg bgAuth" />
      <div className="bgOverlay" />
      <main className="authMain">
        <div className="authBrand">
          <img className="authLogo" src="/assets/logo_tradesmap.png" alt="TradesMap" />
        </div>
        <div className="authCard authCardCompact">
          <div className={`tabs ${mode}`}>
            <button 
              className={`tab ${mode === 'login' ? 'tabActive' : ''}`} 
              onClick={() => navigate('/login')}
            >
              {t('auth.login')}
            </button>
            <button 
              className={`tab ${mode === 'register' ? 'tabActive' : ''}`} 
              onClick={() => navigate('/register')}
            >
              {t('auth.register')}
            </button>
            <div className={`tabIndicator ${mode === 'login' ? 'tabLeft' : 'tabRight'}`} />
          </div>
          
          <form onSubmit={onSubmit}>
            {mode === 'login' ? (
              <>
                {loginError && (
                  <div className="login-error">❌ {loginError}</div>
                )}
                
                <TextField 
                  placeholder={t('auth.email')} 
                  icon={<IconUser />} 
                  value={loginUsername} 
                  onChange={setLoginUsername} 
                  type="email"
                />
                
                <PasswordInput
                  placeholder={t('auth.password')}
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
                  {loginLoading ? t('auth.loggingIn') : t('auth.login')}
                </button>

                <div className="forgot-password-link">
                  <button 
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                  >
                    {t('auth.forgotPassword')}
                  </button>
                </div>
              </>
            ) : (
              <>
                {registerError && (
                  <div className="register-error">❌ {registerError}</div>
                )}
                
                {/* Row 1: First Name & Last Name */}
                <div className="formGrid2">
                  <div>
                    <TextField 
                      placeholder={t('auth.firstName')} 
                      icon={<IconUser />} 
                      value={firstName} 
                      onChange={setFirstName} 
                      className={firstNameError ? 'field-error-input' : ''}
                    />
                    {firstNameError && <div className="field-error">⚠️ {firstNameError}</div>}
                  </div>
                  <div>
                    <TextField 
                      placeholder={t('auth.lastName')} 
                      icon={<IconUser />} 
                      value={lastName} 
                      onChange={setLastName}
                      className={lastNameError ? 'field-error-input' : ''}
                    />
                    {lastNameError && <div className="field-error">⚠️ {lastNameError}</div>}
                  </div>
                </div>
                
                {/* Row 2: Email & Phone Number */}
                <div className="formGrid2">
                  <div className="field">
                    <div className={`fieldControl ${emailError ? 'field-error-input' : ''}`}>
                      <span className="fieldIcon"><IconMail /></span>
                      <input
                        type="email"
                        className="fieldInput"
                        placeholder={t('auth.emailAddress')}
                        value={email}
                        onChange={(e) => {
                          const value = e.target.value
                          handleEmailChange(value)
                        }}
                      />
                    </div>
                    {/* Email validation status */}
                    <div style={{ marginTop: '2px' }}>
                      {isCheckingEmail && (
                        <div className="email-checking">
                          <span>⏳</span> {t('auth.checkingEmail')}
                        </div>
                      )}
                      {emailError && (
                        <div className="email-error">
                          <span>⚠️</span> {emailError}
                          <a href="/login" onClick={(e) => { e.preventDefault(); navigate('/login') }}>
                            {t('auth.logIn')}
                          </a>
                        </div>
                      )}
                      {email && !isCheckingEmail && !emailError && emailValid && email.length > 3 && (
                        <div className="email-available">
                          <span>✓</span> {t('auth.emailAvailable')}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ display: 'flex', border: '1px solid rgba(18,38,63,0.12)', borderRadius: '10px', height: '44px', background: 'white', width: '100%', borderColor: phoneError ? '#dc2626' : undefined }}>
                      <span style={{ 
                        padding: '0 10px', display: 'flex', alignItems: 'center', fontWeight: 600, fontSize: '13px',
                        borderRight: '1px solid rgba(18,38,63,0.12)', color: '#17263a'
                      }}>
                        +1
                      </span>
                      <input 
                        type="tel" 
                        placeholder="555-555-5555" 
                        value={phoneNumber}
                        onChange={(e) => handlePhoneChange(e.target.value)} 
                        maxLength={12}
                        style={{ flex: 1, border: 'none', outline: 'none', padding: '0 10px', borderRadius: '10px', fontSize: '14px' }}
                      />
                    </div>
                    {phoneError && <div className="field-error">⚠️ {phoneError}</div>}
                  </div>
                </div>
                
                {/* Row 3: Date of Birth - Full Row with Label */}
                <div className="dob-wrapper">
                  <label className="dob-label">{t('auth.dateOfBirth')} <span style={{ color: '#dc2626' }}>*</span></label>
                  <div className="custom-dob-picker">
                    <div className="formGrid3" style={{ gap: '7px' }}>
                      <select 
                        value={selectedYear}
                        onChange={(e) => {
                          const year = e.target.value
                          setSelectedYear(year)
                          if (year && selectedMonth && selectedDay) {
                            handleDateChangeFromDropdown(
                              parseInt(year),
                              parseInt(selectedMonth), 
                              parseInt(selectedDay)
                            )
                          }
                        }}
                        style={{ borderColor: dobError ? '#dc2626' : undefined }}
                      >
                        <option value="">{t('auth.year') || 'Year'}</option>
                        {getYearRange().map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>

                      <select 
                        value={selectedMonth}
                        onChange={(e) => {
                          const month = e.target.value
                          setSelectedMonth(month)
                          if (selectedYear && month && selectedDay) {
                            handleDateChangeFromDropdown(
                              parseInt(selectedYear),
                              parseInt(month), 
                              parseInt(selectedDay)
                            )
                          }
                        }}
                        style={{ borderColor: dobError ? '#dc2626' : undefined }}
                      >
                        <option value="">{t('auth.month') || 'Month'}</option>
                        {getMonthOptions().map(month => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>

                      <select 
                        value={selectedDay}
                        onChange={(e) => {
                          const day = e.target.value
                          setSelectedDay(day)
                          if (selectedYear && selectedMonth && day) {
                            handleDateChangeFromDropdown(
                              parseInt(selectedYear),
                              parseInt(selectedMonth), 
                              parseInt(day)
                            )
                          }
                        }}
                        style={{ borderColor: dobError ? '#dc2626' : undefined }}
                      >
                        <option value="">{t('auth.day') || 'Day'}</option>
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => (
                          <option key={day} value={day}>{day}</option>
                        ))}
                      </select>
                    </div>
                    
                    {/* DOB Validation Messages */}
                    <div className="dob-validation-container">
                      {dobError && (
                        <div className="dob-error">
                          <span>⚠️</span> {dobError}
                        </div>
                      )}
                      {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) >= 18 && (
                        <div className="dob-success">
                          <span>✓</span> {t('auth.age')}: {calculateAge(formatDateToYYYYMMDD(dob))} {t('auth.years')}
                        </div>
                      )}
                      {!dobError && dob && calculateAge(formatDateToYYYYMMDD(dob)) < 18 && calculateAge(formatDateToYYYYMMDD(dob)) > 0 && (
                        <div className="dob-error">
                          <span>⚠️</span> {t('auth.ageRequired')}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Row 4: Language - Full Row */}
                <div style={{ width: '100%', marginBottom: '4px' }}>
                  <SelectField 
                    icon={<IconGlobe />} 
                    value={language} 
                    onChange={setLanguage}
                    className={languageError ? 'field-error-input' : ''}
                  >
                    <option value="">{t('auth.language')} *</option>
                    <option value="en">{t('wizard.step1.english')}</option>
                    <option value="es">{t('wizard.step1.spanish')}</option>
                  </SelectField>
                  {languageError && <div className="field-error">⚠️ {languageError}</div>}
                </div>
                
                {/* Row 5: Password & Confirm Password */}
                <div className="formGrid2">
                  <div>
                    <PasswordInput
                      placeholder={t('auth.password')}
                      icon={<IconLock />}
                      value={registerPassword}
                      onChange={handlePasswordChange}
                      showPassword={showRegisterPassword}
                      onToggle={() => setShowRegisterPassword(!showRegisterPassword)}
                      error={passwordError && !confirmPassword}
                    />
                  </div>
                  <div>
                    <PasswordInput
                      placeholder={t('auth.confirmPassword')}
                      icon={<IconLock />}
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      showPassword={showConfirmPassword}
                      onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                      error={passwordError && confirmPassword}
                    />
                  </div>
                </div>
                
                {/* Password Strength */}
                {registerPassword && (
                  <div className="password-strength-container">
                    <div 
                      className="password-strength-bar" 
                      style={{ 
                        width: passwordStrength === t('auth.weak') ? '33%' : passwordStrength === t('auth.medium') ? '66%' : '100%',
                        background: getStrengthColor()
                      }} 
                    />
                    <span style={{ fontSize: '11px', color: getStrengthColor(), fontWeight: 600 }}>
                      {passwordStrength} {t('auth.passwordStrength')}
                    </span>
                    <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginLeft: '8px' }}>
                      ({t('auth.passwordRequirements')})
                    </span>
                  </div>
                )}
                
                {passwordError && <div className="field-error">⚠️ {passwordError}</div>}
                
                {/* Create Account Button */}
                <button
                  type="submit"
                  className="btn btnSuccess createAccountBtn"
                  disabled={!!emailError || isCheckingEmail}
                >
                  {t('auth.createAccount')}
                </button>
              </>
            )}
          </form>
        </div>
      </main>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSuccess={() => {
          setShowForgotPassword(false)
          console.log('Password reset email sent successfully')
        }}
      />
    </div>
  )
}

export default WorkerAuthPage