
// // src/worker/components/wizard-steps/WizardStep1.jsx
// import { useState, useRef, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconMail, IconPhone, IconLocation, IconUpload } from '../../../common/components/Icons'

// // US States data
// const US_STATES = [
//   { name: 'Alabama', code: 'AL' },
//   { name: 'Alaska', code: 'AK' },
//   { name: 'Arizona', code: 'AZ' },
//   { name: 'Arkansas', code: 'AR' },
//   { name: 'California', code: 'CA' },
//   { name: 'Colorado', code: 'CO' },
//   { name: 'Connecticut', code: 'CT' },
//   { name: 'Delaware', code: 'DE' },
//   { name: 'Florida', code: 'FL' },
//   { name: 'Georgia', code: 'GA' },
//   { name: 'Hawaii', code: 'HI' },
//   { name: 'Idaho', code: 'ID' },
//   { name: 'Illinois', code: 'IL' },
//   { name: 'Indiana', code: 'IN' },
//   { name: 'Iowa', code: 'IA' },
//   { name: 'Kansas', code: 'KS' },
//   { name: 'Kentucky', code: 'KY' },
//   { name: 'Louisiana', code: 'LA' },
//   { name: 'Maine', code: 'ME' },
//   { name: 'Maryland', code: 'MD' },
//   { name: 'Massachusetts', code: 'MA' },
//   { name: 'Michigan', code: 'MI' },
//   { name: 'Minnesota', code: 'MN' },
//   { name: 'Mississippi', code: 'MS' },
//   { name: 'Missouri', code: 'MO' },
//   { name: 'Montana', code: 'MT' },
//   { name: 'Nebraska', code: 'NE' },
//   { name: 'Nevada', code: 'NV' },
//   { name: 'New Hampshire', code: 'NH' },
//   { name: 'New Jersey', code: 'NJ' },
//   { name: 'New Mexico', code: 'NM' },
//   { name: 'New York', code: 'NY' },
//   { name: 'North Carolina', code: 'NC' },
//   { name: 'North Dakota', code: 'ND' },
//   { name: 'Ohio', code: 'OH' },
//   { name: 'Oklahoma', code: 'OK' },
//   { name: 'Oregon', code: 'OR' },
//   { name: 'Pennsylvania', code: 'PA' },
//   { name: 'Rhode Island', code: 'RI' },
//   { name: 'South Carolina', code: 'SC' },
//   { name: 'South Dakota', code: 'SD' },
//   { name: 'Tennessee', code: 'TN' },
//   { name: 'Texas', code: 'TX' },
//   { name: 'Utah', code: 'UT' },
//   { name: 'Vermont', code: 'VT' },
//   { name: 'Virginia', code: 'VA' },
//   { name: 'Washington', code: 'WA' },
//   { name: 'West Virginia', code: 'WV' },
//   { name: 'Wisconsin', code: 'WI' },
//   { name: 'Wyoming', code: 'WY' },
// ]

// // Custom State Dropdown Component
// function StateDropdown({ value, onChange, placeholder = 'State' }) {
//   const { t } = useTranslation()
//   const [isOpen, setIsOpen] = useState(false)
//   const dropdownRef = useRef(null)

//   const getStateName = (code) => {
//     if (!code) return ''
//     const state = US_STATES.find(s => s.code === code)
//     return state ? state.name : ''
//   }

//   const getDisplayText = () => {
//     if (!value) return placeholder
//     const name = getStateName(value)
//     return name || placeholder
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   return (
//     <div ref={dropdownRef} style={{ position: 'relative' }}>
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           width: '100%',
//           height: '48px',
//           padding: '0 16px',
//           paddingRight: '40px',
//           border: '1px solid rgba(18, 38, 63, 0.12)',
//           borderRadius: '12px',
//           fontSize: '14px',
//           outline: 'none',
//           background: 'white',
//           color: value ? '#17263a' : '#6b7280',
//           transition: 'all 0.2s ease',
//           fontFamily: 'inherit',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           userSelect: 'none',
//           boxShadow: isOpen ? '0 0 0 3px rgba(15, 78, 169, 0.1)' : 'none',
//           borderColor: isOpen ? '#0f4ea9' : 'rgba(18, 38, 63, 0.12)',
//         }}
//         onMouseEnter={(e) => {
//           if (!isOpen) {
//             e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.4)'
//           }
//         }}
//         onMouseLeave={(e) => {
//           if (!isOpen) {
//             e.currentTarget.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//           }
//         }}
//       >
//         <span>{getDisplayText()}</span>
//         <svg 
//           width="12" 
//           height="12" 
//           viewBox="0 0 12 12" 
//           style={{
//             transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//             transition: 'transform 0.2s ease',
//             flexShrink: 0
//           }}
//         >
//           <path fill="#17263a" d="M6 8L1 3h10z" />
//         </svg>
//       </div>

//       {isOpen && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 'calc(100% + 4px)',
//             left: 0,
//             right: 0,
//             maxHeight: '200px',
//             overflowY: 'auto',
//             background: 'white',
//             border: '1px solid rgba(18, 38, 63, 0.12)',
//             borderRadius: '12px',
//             boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
//             zIndex: 1000,
//             padding: '4px 0',
//           }}
//         >
//           <div
//             onClick={() => {
//               onChange('')
//               setIsOpen(false)
//             }}
//             style={{
//               padding: '10px 16px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               color: '#6b7280',
//               transition: 'all 0.15s ease',
//               borderRadius: '8px',
//               margin: '2px 4px',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent'
//             }}
//           >
//             {placeholder}
//           </div>

//           {US_STATES.map((state) => (
//             <div
//               key={state.code}
//               onClick={() => {
//                 onChange(state.code)
//                 setIsOpen(false)
//               }}
//               style={{
//                 padding: '10px 16px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 color: value === state.code ? '#0f4ea9' : '#17263a',
//                 fontWeight: value === state.code ? '600' : '400',
//                 background: value === state.code ? 'rgba(15, 78, 169, 0.08)' : 'transparent',
//                 transition: 'all 0.15s ease',
//                 borderRadius: '8px',
//                 margin: '2px 4px',
//               }}
//               onMouseEnter={(e) => {
//                 if (value !== state.code) {
//                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.05)'
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (value !== state.code) {
//                   e.currentTarget.style.background = 'transparent'
//                 }
//               }}
//             >
//               {state.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export function WizardStep1({ data, onChange, onNext }) {
//   const { t } = useTranslation()
//   const [profilePreview, setProfilePreview] = useState(data.profilePreview || '')
//   const [isUploading, setIsUploading] = useState(false)
//   const [uploadError, setUploadError] = useState('')
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  
//   const uploadRef = useRef(null)
//   const datePickerRef = useRef(null)

//   const handleChange = (field, value) => {
//     console.log(`Updating ${field} to:`, value)
//     onChange({ [field]: value })
//   }

//   const handleCheckboxChange = (field) => (e) => {
//     onChange({ [field]: e.target.checked })
//   }

//   const handleSameAsAddressChange = (e) => {
//     const checked = e.target.checked
//     onChange({
//       sameAsAddress: checked,
//       currentAddressLine1: checked ? data.addressLine1 : '',
//       currentCity: checked ? data.city : '',
//       currentStateCode: checked ? data.stateCode : '',
//       currentZip: checked ? data.zip : '',
//     })
//   }

//   // ✅ DIRECT API CALL - bypasses the service entirely (fixes Vite minification issue)
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError(t('wizard.step1.uploadError') || 'File size must be less than 5MB')
//       return
//     }
//     if (!file.type.startsWith('image/')) {
//       setUploadError(t('wizard.step1.uploadError') || 'Please upload an image file')
//       return
//     }

//     setIsUploading(true)
//     setUploadError('')

//     try {
//       const userId = localStorage.getItem('userId') || 'temp-user'
//       console.log('👤 User ID:', userId)

//       // ✅ Direct API call - no service
//       const response = await fetch('/api/upload/profile', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId,
//           fileName: file.name,
//           fileType: file.type
//         })
//       })

//       const result = await response.json()
//       console.log('🔍 Backend Response:', result)

//       if (!result.success) {
//         throw new Error(result.message || 'Failed to get upload URL')
//       }

//       const { uploadUrl, fileKey, fileUrl, viewUrl } = result.data

//       if (!uploadUrl) {
//         throw new Error('No upload URL received from server')
//       }

//       console.log('📤 Uploading to S3:', uploadUrl)

//       // ✅ Upload directly to S3
//       const uploadResponse = await fetch(uploadUrl, {
//         method: 'PUT',
//         body: file,
//         headers: { 'Content-Type': file.type }
//       })

//       if (!uploadResponse.ok) {
//         throw new Error(`Upload failed: ${uploadResponse.status}`)
//       }

//       console.log('✅ S3 Upload successful!')

//       // ✅ Get view URL
//       const viewUrlResponse = await fetch(`/api/upload/view/${encodeURIComponent(fileKey)}`)
//       const viewData = await viewUrlResponse.json()

//       let displayUrl = fileUrl
//       if (viewData.success) {
//         displayUrl = viewData.data.viewUrl
//       }

//       // ✅ Update state
//       setProfilePreview(displayUrl)
//       onChange({
//         profilePreview: displayUrl,
//         profileImageKey: fileKey,
//         profileImageUrl: fileUrl
//       })

//       localStorage.setItem('userProfileImage', displayUrl)
//       window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//         detail: { profileImage: displayUrl }
//       }))

//       console.log('✅ Profile image upload complete!')

//     } catch (error) {
//       console.error('❌ Error uploading profile image:', error)
//       setUploadError(error.message || t('wizard.step1.uploadError') || 'Failed to upload image. Please try again.')
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleDateChange = (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       onChange({ dob: `${month}/${day}/${year}` })
//     } else {
//       onChange({ dob: '' })
//     }
//     setIsDatePickerOpen(false)
//   }

//   const parseDate = (dateStr) => {
//     if (!dateStr) return null
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
//     }
//     return null
//   }

//   const isValid = data.emailAddress && data.mobilePhone && data.legalFirstName && 
//                   data.legalLastName && data.dob && data.city && data.stateCode && data.zip

//   const datePickerStyles = `
//     .date-picker-wrapper {
//       position: relative;
//       width: 100%;
//     }
//     .date-picker-wrapper .react-datepicker__input-container {
//       display: block;
//       width: 100%;
//     }
//     .date-picker-wrapper .react-datepicker__input-container input {
//       width: 100%;
//       height: 40px;
//       padding: 0 12px;
//       padding-right: 36px !important;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 8px;
//       font-size: 13px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//       box-sizing: border-box;
//     }
//     .date-picker-wrapper .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }
//     .date-picker-wrapper .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }
//     .date-picker-wrapper .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }
//     .date-picker-wrapper .calendar-icon {
//       position: absolute;
//       right: 10px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: rgba(23, 38, 58, 0.5);
//       pointer-events: none;
//       font-size: 16px;
//       line-height: 1;
//       z-index: 2;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .date-picker-wrapper .react-datepicker-wrapper {
//       display: block;
//       width: 100%;
//     }
//     .custom-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//     }
//     .custom-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }
//     .custom-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }
//     .custom-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }
//     .custom-date-picker .react-datepicker__day {
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
//     .custom-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }
//     .custom-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }
//     .custom-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }
//     .custom-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }
//     .custom-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }
//     .custom-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }
//     .custom-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }
//     .custom-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }
//     .custom-date-picker .react-datepicker__day--outside-month {
//       color: rgba(23, 38, 58, 0.2);
//     }
//     .custom-date-picker .react-datepicker__navigation {
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
//     .custom-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }
//     .custom-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }
//     .custom-date-picker .react-datepicker__navigation-icon:hover::before {
//       border-color: #0f4ea9;
//     }
//     .custom-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }
//     .custom-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }
//     .custom-date-picker .react-datepicker__month-dropdown,
//     .custom-date-picker .react-datepicker__year-dropdown {
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
//       background: white;
//       padding: 4px;
//     }
//     .custom-date-picker .react-datepicker__month-option,
//     .custom-date-picker .react-datepicker__year-option {
//       padding: 8px 16px;
//       border-radius: 8px;
//       transition: all 0.15s ease;
//       cursor: pointer;
//     }
//     .custom-date-picker .react-datepicker__month-option:hover,
//     .custom-date-picker .react-datepicker__year-option:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }
//     .custom-date-picker .react-datepicker__month-option--selected,
//     .custom-date-picker .react-datepicker__year-option--selected {
//       background: rgba(15, 78, 169, 0.1);
//       font-weight: 600;
//     }
//   `

//   return (
//     <div className="wizardStep">
//       <style>{datePickerStyles}</style>
      
//       <div className="wizardBody">
//         {/* Personal Information Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step1.title')}</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder={t('auth.firstName')} 
//               icon={<IconUser />} 
//               value={data.legalFirstName || ''} 
//               onChange={(v) => handleChange('legalFirstName', v)} 
//             />
//             <TextField 
//               placeholder={t('auth.lastName')} 
//               icon={<IconUser />} 
//               value={data.legalLastName || ''} 
//               onChange={(v) => handleChange('legalLastName', v)} 
//             />
//             <TextField 
//               placeholder={t('auth.emailAddress')} 
//               icon={<IconMail />} 
//               value={data.emailAddress || ''} 
//               onChange={(v) => handleChange('emailAddress', v)} 
//             />
//             <TextField 
//               placeholder={t('auth.mobileNumber')} 
//               icon={<IconPhone />} 
//               value={data.mobilePhone || ''} 
//               onChange={(v) => handleChange('mobilePhone', v)} 
//             />
//           </div>
//         </div>

//         {/* Address + Current Address */}
//         <div className="wizardSection">
//           <div className="wizardGrid2">
//             {/* Address */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step1.address')}</div>
//               <TextField
//                 placeholder={t('wizard.step1.address')}
//                 icon={<IconLocation />}
//                 value={data.addressLine1 || ''}
//                 onChange={(v) => handleChange('addressLine1', v)}
//               />
//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <TextField
//                   placeholder={t('wizard.step1.city')}
//                   icon={<IconLocation />}
//                   value={data.city || ''}
//                   onChange={(v) => handleChange('city', v)}
//                   style={{ flex: 1 }}
//                 />
//                 <div style={{ flex: 1 }}>
//                   <StateDropdown
//                     value={data.stateCode || ''}
//                     onChange={(v) => handleChange('stateCode', v)}
//                     placeholder={t('wizard.step1.state')}
//                   />
//                 </div>
//                 <TextField
//                   placeholder={t('wizard.step1.zip')}
//                   icon={<IconLocation />}
//                   value={data.zip || ''}
//                   onChange={(v) => handleChange('zip', v)}
//                   style={{ flex: 1 }}
//                 />
//               </div>
//             </div>

//             {/* Current Address */}
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
//                 <div className="wizardSectionBar" style={{ marginBottom: 0 }}>
//                   {t('wizard.step1.currentAddress')}
//                 </div>
//                 <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.sameAsAddress || false}
//                     onChange={handleSameAsAddressChange}
//                   />
//                   {t('wizard.step1.sameAsAddress')}
//                 </label>
//               </div>
//               <TextField
//                 placeholder={t('wizard.step1.address')}
//                 icon={<IconLocation />}
//                 value={data.currentAddressLine1 || ''}
//                 onChange={(v) => handleChange('currentAddressLine1', v)}
//               />
//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <TextField
//                   placeholder={t('wizard.step1.city')}
//                   icon={<IconLocation />}
//                   value={data.currentCity || ''}
//                   onChange={(v) => handleChange('currentCity', v)}
//                   style={{ flex: 1 }}
//                 />
//                 <div style={{ flex: 1 }}>
//                   <StateDropdown
//                     value={data.currentStateCode || ''}
//                     onChange={(v) => handleChange('currentStateCode', v)}
//                     placeholder={t('wizard.step1.state')}
//                   />
//                 </div>
//                 <TextField
//                   placeholder={t('wizard.step1.zip')}
//                   icon={<IconLocation />}
//                   value={data.currentZip || ''}
//                   onChange={(v) => handleChange('currentZip', v)}
//                   style={{ flex: 1 }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Details */}
//         <div className="wizardSection">
//           <div className="wizardGrid2">
//             {/* DOB */}
//             <div>
//               <div className="wizardSectionBar">{t('auth.dateOfBirth')}</div>
//               <div className="date-picker-wrapper custom-date-picker">
//                 <DatePicker
//                   ref={datePickerRef}
//                   selected={parseDate(data.dob)}
//                   onChange={handleDateChange}
//                   dateFormat="MM/dd/yyyy"
//                   placeholderText={t('auth.dateOfBirth')}
//                   maxDate={new Date()}
//                   onCalendarOpen={() => setIsDatePickerOpen(true)}
//                   onCalendarClose={() => setIsDatePickerOpen(false)}
//                   showYearDropdown
//                   showMonthDropdown
//                   dropdownMode="select"
//                   yearDropdownItemNumber={100}
//                   scrollableYearDropdown
//                   className="date-picker-input"
//                   popperPlacement="bottom-start"
//                   popperModifiers={[
//                     {
//                       name: 'offset',
//                       options: {
//                         offset: [0, 8],
//                       },
//                     },
//                   ]}
//                 />
//                 <span className="calendar-icon">📅</span>
//               </div>
//             </div>

//             {/* Languages */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step1.languagesKnown')}</div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
//                 <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.english || false}
//                     onChange={handleCheckboxChange('english')}
//                   />
//                   {t('wizard.step1.english')}
//                 </label>
//                 <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.englishSpanish || false}
//                     onChange={handleCheckboxChange('englishSpanish')}
//                   />
//                   {t('wizard.step1.englishSpanish')}
//                 </label>
//                 <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.spanish || false}
//                     onChange={handleCheckboxChange('spanish')}
//                   />
//                   {t('wizard.step1.spanish')}
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Profile Image Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step1.profileImage')}</div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
//             <div style={{ 
//               width: '80px', 
//               height: '80px', 
//               borderRadius: '50%', 
//               background: 'rgba(15,78,169,0.1)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               overflow: 'hidden',
//               border: '2px solid rgba(15,78,169,0.2)'
//             }}>
//               {profilePreview ? (
//                 <img src={profilePreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//               ) : (
//                 <IconUser style={{ width: '40px', height: '40px', color: 'rgba(15,78,169,0.5)' }} />
//               )}
//             </div>
            
//             <div>
//               <button
//                 type="button"
//                 onClick={() => uploadRef.current?.click()}
//                 disabled={isUploading}
//                 style={{ 
//                   display: 'inline-flex', 
//                   alignItems: 'center', 
//                   gap: '6px',
//                   padding: '8px 24px',
//                   background: isUploading ? 'rgba(15,78,169,0.05)' : 'rgba(15,78,169,0.1)',
//                   borderRadius: '25px',
//                   cursor: isUploading ? 'not-allowed' : 'pointer',
//                   fontSize: '13px',
//                   fontWeight: '600',
//                   border: 'none',
//                   color: isUploading ? '#94a3b8' : '#0f4ea9',
//                   opacity: isUploading ? 0.6 : 1
//                 }}
//               >
//                 {isUploading ? t('wizard.step1.uploading') || '⏳ Uploading...' : (
//                   <>
//                     <IconUpload style={{ width: '14px', height: '14px' }} />
//                     {t('wizard.step1.upload')}
//                   </>
//                 )}
//               </button>
//               {uploadError && (
//                 <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>
//                   {uploadError}
//                 </div>
//               )}
//             </div>
//             <input 
//               ref={uploadRef}
//               type="file" 
//               accept="image/*" 
//               onChange={handleFileUpload} 
//               style={{ display: 'none' }} 
//             />
//           </div>
//         </div>

//         {/* Agreements Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step1.agreements')}</div>
//           <div className="wizardChecks">
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptTerms || false} onChange={handleCheckboxChange('acceptTerms')} />
//               {t('wizard.step1.acceptTerms')}
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptPrivacy || false} onChange={handleCheckboxChange('acceptPrivacy')} />
//               {t('wizard.step1.acceptPrivacy')}
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.consentElectronic || false} onChange={handleCheckboxChange('consentElectronic')} />
//               {t('wizard.step1.consentElectronic')}
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.certifyAccurate || false} onChange={handleCheckboxChange('certifyAccurate')} />
//               {t('wizard.step1.certifyAccurate')}
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep1




// // src/worker/components/wizard-steps/WizardStep1.jsx
// import { useState, useRef, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconMail, IconPhone, IconLocation, IconUpload } from '../../../common/components/Icons'

// // US States data
// const US_STATES = [
//   { name: 'Alabama', code: 'AL' },
//   { name: 'Alaska', code: 'AK' },
//   { name: 'Arizona', code: 'AZ' },
//   { name: 'Arkansas', code: 'AR' },
//   { name: 'California', code: 'CA' },
//   { name: 'Colorado', code: 'CO' },
//   { name: 'Connecticut', code: 'CT' },
//   { name: 'Delaware', code: 'DE' },
//   { name: 'Florida', code: 'FL' },
//   { name: 'Georgia', code: 'GA' },
//   { name: 'Hawaii', code: 'HI' },
//   { name: 'Idaho', code: 'ID' },
//   { name: 'Illinois', code: 'IL' },
//   { name: 'Indiana', code: 'IN' },
//   { name: 'Iowa', code: 'IA' },
//   { name: 'Kansas', code: 'KS' },
//   { name: 'Kentucky', code: 'KY' },
//   { name: 'Louisiana', code: 'LA' },
//   { name: 'Maine', code: 'ME' },
//   { name: 'Maryland', code: 'MD' },
//   { name: 'Michigan', code: 'MI' },
//   { name: 'Minnesota', code: 'MN' },
//   { name: 'Mississippi', code: 'MS' },
//   { name: 'Missouri', code: 'MO' },
//   { name: 'Montana', code: 'MT' },
//   { name: 'Nebraska', code: 'NE' },
//   { name: 'Nevada', code: 'NV' },
//   { name: 'New Hampshire', code: 'NH' },
//   { name: 'New Jersey', code: 'NJ' },
//   { name: 'New Mexico', code: 'NM' },
//   { name: 'New York', code: 'NY' },
//   { name: 'North Carolina', code: 'NC' },
//   { name: 'North Dakota', code: 'ND' },
//   { name: 'Ohio', code: 'OH' },
//   { name: 'Oklahoma', code: 'OK' },
//   { name: 'Oregon', code: 'OR' },
//   { name: 'Pennsylvania', code: 'PA' },
//   { name: 'Rhode Island', code: 'RI' },
//   { name: 'South Carolina', code: 'SC' },
//   { name: 'South Dakota', code: 'SD' },
//   { name: 'Tennessee', code: 'TN' },
//   { name: 'Texas', code: 'TX' },
//   { name: 'Utah', code: 'UT' },
//   { name: 'Vermont', code: 'VT' },
//   { name: 'New Jersey', code: 'NJ' },
//   { name: 'New Mexico', code: 'NM' },
//   { name: 'New York', code: 'NY' },
//   { name: 'North Carolina', code: 'NC' },
//   { name: 'North Dakota', code: 'ND' },
//   { name: 'Ohio', code: 'OH' },
//   { name: 'Oklahoma', code: 'OK' },
//   { name: 'Oregon', code: 'OR' },
//   { name: 'Pennsylvania', code: 'PA' },
//   { name: 'Rhode Island', code: 'RI' },
//   { name: 'South Carolina', code: 'SC' },
//   { name: 'South Dakota', code: 'SD' },
//   { name: 'Tennessee', code: 'TN' },
//   { name: 'Texas', code: 'TX' },
//   { name: 'Utah', code: 'UT' },
//   { name: 'Vermont', code: 'VT' },
//   { name: 'Virginia', code: 'VA' },
//   { name: 'Washington', code: 'WA' },
//   { name: 'West Virginia', code: 'WV' },
//   { name: 'Wisconsin', code: 'WI' },
//   { name: 'Wyoming', code: 'WY' },
// ]

// // Custom State Dropdown Component
// function StateDropdown({ value, onChange, placeholder = 'State' }) {
//   const { t } = useTranslation()
//   const [isOpen, setIsOpen] = useState(false)
//   const dropdownRef = useRef(null)

//   const getStateName = (code) => {
//     if (!code) return ''
//     const state = US_STATES.find(s => s.code === code)
//     return state ? state.name : ''
//   }

//   const getDisplayText = () => {
//     if (!value) return placeholder
//     const name = getStateName(value)
//     return name || placeholder
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   return (
//     <div ref={dropdownRef} style={{ position: 'relative' }}>
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           width: '100%',
//           height: '48px',
//           padding: '0 16px',
//           paddingRight: '40px',
//           border: '1px solid rgba(18, 38, 63, 0.12)',
//           borderRadius: '12px',
//           fontSize: '14px',
//           outline: 'none',
//           background: 'white',
//           color: value ? '#17263a' : '#6b7280',
//           transition: 'all 0.2s ease',
//           fontFamily: 'inherit',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           userSelect: 'none',
//           boxShadow: isOpen ? '0 0 0 3px rgba(15, 78, 169, 0.1)' : 'none',
//           borderColor: isOpen ? '#0f4ea9' : 'rgba(18, 38, 63, 0.12)',
//         }}
//         onMouseEnter={(e) => {
//           if (!isOpen) {
//             e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.4)'
//           }
//         }}
//         onMouseLeave={(e) => {
//           if (!isOpen) {
//             e.currentTarget.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//           }
//         }}
//       >
//         <span>{getDisplayText()}</span>
//         <svg 
//           width="12" 
//           height="12" 
//           viewBox="0 0 12 12" 
//           style={{
//             transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//             transition: 'transform 0.2s ease',
//             flexShrink: 0
//           }}
//         >
//           <path fill="#17263a" d="M6 8L1 3h10z" />
//         </svg>
//       </div>

//       {isOpen && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 'calc(100% + 4px)',
//             left: 0,
//             right: 0,
//             maxHeight: '200px',
//             overflowY: 'auto',
//             background: 'white',
//             border: '1px solid rgba(18, 38, 63, 0.12)',
//             borderRadius: '12px',
//             boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
//             zIndex: 1000,
//             padding: '4px 0',
//           }}
//         >
//           <div
//             onClick={() => {
//               onChange('')
//               setIsOpen(false)
//             }}
//             style={{
//               padding: '10px 16px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               color: '#6b7280',
//               transition: 'all 0.15s ease',
//               borderRadius: '8px',
//               margin: '2px 4px',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent'
//             }}
//           >
//             {placeholder}
//           </div>

//           {US_STATES.map((state) => (
//             <div
//               key={state.code}
//               onClick={() => {
//                 onChange(state.code)
//                 setIsOpen(false)
//               }}
//               style={{
//                 padding: '10px 16px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 color: value === state.code ? '#0f4ea9' : '#17263a',
//                 fontWeight: value === state.code ? '600' : '400',
//                 background: value === state.code ? 'rgba(15, 78, 169, 0.08)' : 'transparent',
//                 transition: 'all 0.15s ease',
//                 borderRadius: '8px',
//                 margin: '2px 4px',
//               }}
//               onMouseEnter={(e) => {
//                 if (value !== state.code) {
//                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.05)'
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (value !== state.code) {
//                   e.currentTarget.style.background = 'transparent'
//                 }
//               }}
//             >
//               {state.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export function WizardStep1({ data, onChange, onNext }) {
//   const { t } = useTranslation()
//   const [profilePreview, setProfilePreview] = useState(data.profilePreview || '')
//   const [isUploading, setIsUploading] = useState(false)
//   const [uploadError, setUploadError] = useState('')
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  
//   const uploadRef = useRef(null)
//   const datePickerRef = useRef(null)

//   const handleChange = (field, value) => {
//     console.log(`Updating ${field} to:`, value)
//     onChange({ [field]: value })
//   }

//   const handleCheckboxChange = (field) => (e) => {
//     onChange({ [field]: e.target.checked })
//   }

//   const handleSameAsAddressChange = (e) => {
//     const checked = e.target.checked
//     onChange({
//       sameAsAddress: checked,
//       currentAddressLine1: checked ? data.addressLine1 : '',
//       currentCity: checked ? data.city : '',
//       currentStateCode: checked ? data.stateCode : '',
//       currentZip: checked ? data.zip : '',
//     })
//   }

//   // ✅ DIRECT API CALL - bypasses the service entirely (fixes Vite minification issue)
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError(t('wizard.step1.uploadError') || 'File size must be less than 5MB')
//       return
//     }
//     if (!file.type.startsWith('image/')) {
//       setUploadError(t('wizard.step1.uploadError') || 'Please upload an image file')
//       return
//     }

//     setIsUploading(true)
//     setUploadError('')

//     try {
//       const userId = localStorage.getItem('userId') || 'temp-user'
//       console.log('👤 User ID:', userId)

//       // ✅ Direct API call - no service
//       const response = await fetch('/api/upload/profile', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId,
//           fileName: file.name,
//           fileType: file.type
//         })
//       })

//       const result = await response.json()
//       console.log('🔍 Backend Response:', result)

//       if (!result.success) {
//         throw new Error(result.message || 'Failed to get upload URL')
//       }

//       const { uploadUrl, fileKey, fileUrl, viewUrl } = result.data

//       if (!uploadUrl) {
//         throw new Error('No upload URL received from server')
//       }

//       console.log('📤 Uploading to S3:', uploadUrl)

//       // ✅ Upload directly to S3
//       const uploadResponse = await fetch(uploadUrl, {
//         method: 'PUT',
//         body: file,
//         headers: { 'Content-Type': file.type }
//       })

//       if (!uploadResponse.ok) {
//         throw new Error(`Upload failed: ${uploadResponse.status}`)
//       }

//       console.log('✅ S3 Upload successful!')

//       // ✅ Get view URL
//       const viewUrlResponse = await fetch(`/api/upload/view/${encodeURIComponent(fileKey)}`)
//       const viewData = await viewUrlResponse.json()

//       let displayUrl = fileUrl
//       if (viewData.success) {
//         displayUrl = viewData.data.viewUrl
//       }

//       // ✅ Update state
//       setProfilePreview(displayUrl)
//       onChange({
//         profilePreview: displayUrl,
//         profileImageKey: fileKey,
//         profileImageUrl: fileUrl
//       })

//       localStorage.setItem('userProfileImage', displayUrl)
//       window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//         detail: { profileImage: displayUrl }
//       }))

//       console.log('✅ Profile image upload complete!')

//     } catch (error) {
//       console.error('❌ Error uploading profile image:', error)
//       setUploadError(error.message || t('wizard.step1.uploadError') || 'Failed to upload image. Please try again.')
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleDateChange = (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       onChange({ dob: `${month}/${day}/${year}` })
//     } else {
//       onChange({ dob: '' })
//     }
//     setIsDatePickerOpen(false)
//   }

//   const parseDate = (dateStr) => {
//     if (!dateStr) return null
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
//     }
//     return null
//   }

//   const isValid = data.emailAddress && data.mobilePhone && data.legalFirstName && 
//                   data.legalLastName && data.dob && data.city && data.stateCode && data.zip

//   const datePickerStyles = `
//     .date-picker-wrapper {
//       position: relative;
//       width: 100%;
//     }
//     .date-picker-wrapper .react-datepicker__input-container {
//       display: block;
//       width: 100%;
//     }
//     .date-picker-wrapper .react-datepicker__input-container input {
//       width: 100%;
//       height: 40px;
//       padding: 0 12px;
//       padding-right: 36px !important;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 8px;
//       font-size: 13px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//       box-sizing: border-box;
//     }
//     .date-picker-wrapper .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }
//     .date-picker-wrapper .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }
//     .date-picker-wrapper .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }
//     .date-picker-wrapper .calendar-icon {
//       position: absolute;
//       right: 10px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: rgba(23, 38, 58, 0.5);
//       pointer-events: none;
//       font-size: 16px;
//       line-height: 1;
//       z-index: 2;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .date-picker-wrapper .react-datepicker-wrapper {
//       display: block;
//       width: 100%;
//     }
//     .custom-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//     }
//     .custom-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }
//     .custom-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }
//     .custom-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }
//     .custom-date-picker .react-datepicker__day {
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
//     .custom-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }
//     .custom-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }
//     .custom-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }
//     .custom-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }
//     .custom-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }
//     .custom-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }
//     .custom-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }
//     .custom-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }
//     .custom-date-picker .react-datepicker__day--outside-month {
//       color: rgba(23, 38, 58, 0.2);
//     }
//     .custom-date-picker .react-datepicker__navigation {
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
//     .custom-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }
//     .custom-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }
//     .custom-date-picker .react-datepicker__navigation-icon:hover::before {
//       border-color: #0f4ea9;
//     }
//     .custom-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }
//     .custom-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }
//     .custom-date-picker .react-datepicker__month-dropdown,
//     .custom-date-picker .react-datepicker__year-dropdown {
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
//       background: white;
//       padding: 4px;
//     }
//     .custom-date-picker .react-datepicker__month-option,
//     .custom-date-picker .react-datepicker__year-option {
//       padding: 8px 16px;
//       border-radius: 8px;
//       transition: all 0.15s ease;
//       cursor: pointer;
//     }
//     .custom-date-picker .react-datepicker__month-option:hover,
//     .custom-date-picker .react-datepicker__year-option:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }
//     .custom-date-picker .react-datepicker__month-option--selected,
//     .custom-date-picker .react-datepicker__year-option--selected {
//       background: rgba(15, 78, 169, 0.1);
//       font-weight: 600;
//     }
//   `

//   // ✅ Check if user is authenticated (has userId) - if so, fields are read-only
//   const userId = localStorage.getItem('userId')
//   const isAuthenticated = !!userId

//   return (
//     <div className="wizardStep">
//       <style>{datePickerStyles}</style>
      
//       <div className="wizardBody">
//         {/* Personal Information Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step1.title')}</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder={t('auth.firstName')} 
//               icon={<IconUser />} 
//               value={data.legalFirstName || ''} 
//               onChange={(v) => handleChange('legalFirstName', v)}
//               readOnly={isAuthenticated}
//             />
//             <TextField 
//               placeholder={t('auth.lastName')} 
//               icon={<IconUser />} 
//               value={data.legalLastName || ''} 
//               onChange={(v) => handleChange('legalLastName', v)}
//               readOnly={isAuthenticated}
//             />
//             <TextField 
//               placeholder={t('auth.emailAddress')} 
//               icon={<IconMail />} 
//               value={data.emailAddress || ''} 
//               onChange={(v) => handleChange('emailAddress', v)}
//               readOnly={isAuthenticated}
//             />
//             <TextField 
//               placeholder={t('auth.mobileNumber')} 
//               icon={<IconPhone />} 
//               value={data.mobilePhone || ''} 
//               onChange={(v) => handleChange('mobilePhone', v)}
//               readOnly={isAuthenticated}
//             />
//           </div>
//         </div>

//         {/* Address + Current Address */}
//         <div className="wizardSection">
//           <div className="wizardGrid2">
//             {/* Address */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step1.address')}</div>
//               <TextField
//                 placeholder={t('wizard.step1.address')}
//                 icon={<IconLocation />}
//                 value={data.addressLine1 || ''}
//                 onChange={(v) => handleChange('addressLine1', v)}
//               />
//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <TextField
//                   placeholder={t('wizard.step1.city')}
//                   icon={<IconLocation />}
//                   value={data.city || ''}
//                   onChange={(v) => handleChange('city', v)}
//                   style={{ flex: 1 }}
//                 />
//                 <div style={{ flex: 1 }}>
//                   <StateDropdown
//                     value={data.stateCode || ''}
//                     onChange={(v) => handleChange('stateCode', v)}
//                     placeholder={t('wizard.step1.state')}
//                   />
//                 </div>
//                 <TextField
//                   placeholder={t('wizard.step1.zip')}
//                   icon={<IconLocation />}
//                   value={data.zip || ''}
//                   onChange={(v) => handleChange('zip', v)}
//                   style={{ flex: 1 }}
//                 />
//               </div>
//             </div>

//             {/* Current Address */}
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
//                 <div className="wizardSectionBar" style={{ marginBottom: 0 }}>
//                   {t('wizard.step1.currentAddress')}
//                 </div>
//                 <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.sameAsAddress || false}
//                     onChange={handleSameAsAddressChange}
//                   />
//                   {t('wizard.step1.sameAsAddress')}
//                 </label>
//               </div>
//               <TextField
//                 placeholder={t('wizard.step1.address')}
//                 icon={<IconLocation />}
//                 value={data.currentAddressLine1 || ''}
//                 onChange={(v) => handleChange('currentAddressLine1', v)}
//               />
//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <TextField
//                   placeholder={t('wizard.step1.city')}
//                   icon={<IconLocation />}
//                   value={data.currentCity || ''}
//                   onChange={(v) => handleChange('currentCity', v)}
//                   style={{ flex: 1 }}
//                 />
//                 <div style={{ flex: 1 }}>
//                   <StateDropdown
//                     value={data.currentStateCode || ''}
//                     onChange={(v) => handleChange('currentStateCode', v)}
//                     placeholder={t('wizard.step1.state')}
//                   />
//                 </div>
//                 <TextField
//                   placeholder={t('wizard.step1.zip')}
//                   icon={<IconLocation />}
//                   value={data.currentZip || ''}
//                   onChange={(v) => handleChange('currentZip', v)}
//                   style={{ flex: 1 }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Details */}
//         <div className="wizardSection">
//           <div className="wizardGrid2">
//             {/* DOB */}
//             <div>
//               <div className="wizardSectionBar">{t('auth.dateOfBirth')}</div>
//               <div className="date-picker-wrapper custom-date-picker">
//                 <DatePicker
//                   ref={datePickerRef}
//                   selected={parseDate(data.dob)}
//                   onChange={handleDateChange}
//                   dateFormat="MM/dd/yyyy"
//                   placeholderText={t('auth.dateOfBirth')}
//                   maxDate={new Date()}
//                   onCalendarOpen={() => setIsDatePickerOpen(true)}
//                   onCalendarClose={() => setIsDatePickerOpen(false)}
//                   showYearDropdown
//                   showMonthDropdown
//                   dropdownMode="select"
//                   yearDropdownItemNumber={100}
//                   scrollableYearDropdown
//                   className="date-picker-input"
//                   popperPlacement="bottom-start"
//                   popperModifiers={[
//                     {
//                       name: 'offset',
//                       options: {
//                         offset: [0, 8],
//                       },
//                     },
//                   ]}
//                 />
//                 <span className="calendar-icon">📅</span>
//               </div>
//             </div>

//             {/* Languages */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step1.languagesKnown')}</div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
//                 <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.english || false}
//                     onChange={handleCheckboxChange('english')}
//                   />
//                   {t('wizard.step1.english')}
//                 </label>
//                 <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.englishSpanish || false}
//                     onChange={handleCheckboxChange('englishSpanish')}
//                   />
//                   {t('wizard.step1.englishSpanish')}
//                 </label>
//                 <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.spanish || false}
//                     onChange={handleCheckboxChange('spanish')}
//                   />
//                   {t('wizard.step1.spanish')}
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Profile Image Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step1.profileImage')}</div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
//             <div style={{ 
//               width: '80px', 
//               height: '80px', 
//               borderRadius: '50%', 
//               background: 'rgba(15,78,169,0.1)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               overflow: 'hidden',
//               border: '2px solid rgba(15,78,169,0.2)'
//             }}>
//               {profilePreview ? (
//                 <img src={profilePreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//               ) : (
//                 <IconUser style={{ width: '40px', height: '40px', color: 'rgba(15,78,169,0.5)' }} />
//               )}
//             </div>
            
//             <div>
//               <button
//                 type="button"
//                 onClick={() => uploadRef.current?.click()}
//                 disabled={isUploading}
//                 style={{ 
//                   display: 'inline-flex', 
//                   alignItems: 'center', 
//                   gap: '6px',
//                   padding: '8px 24px',
//                   background: isUploading ? 'rgba(15,78,169,0.05)' : 'rgba(15,78,169,0.1)',
//                   borderRadius: '25px',
//                   cursor: isUploading ? 'not-allowed' : 'pointer',
//                   fontSize: '13px',
//                   fontWeight: '600',
//                   border: 'none',
//                   color: isUploading ? '#94a3b8' : '#0f4ea9',
//                   opacity: isUploading ? 0.6 : 1
//                 }}
//               >
//                 {isUploading ? t('wizard.step1.uploading') || '⏳ Uploading...' : (
//                   <>
//                     <IconUpload style={{ width: '14px', height: '14px' }} />
//                     {t('wizard.step1.upload')}
//                   </>
//                 )}
//               </button>
//               {uploadError && (
//                 <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>
//                   {uploadError}
//                 </div>
//               )}
//             </div>
//             <input 
//               ref={uploadRef}
//               type="file" 
//               accept="image/*" 
//               onChange={handleFileUpload} 
//               style={{ display: 'none' }} 
//             />
//           </div>
//         </div>

//         {/* Agreements Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step1.agreements')}</div>
//           <div className="wizardChecks">
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptTerms || false} onChange={handleCheckboxChange('acceptTerms')} />
//               {t('wizard.step1.acceptTerms')}
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptPrivacy || false} onChange={handleCheckboxChange('acceptPrivacy')} />
//               {t('wizard.step1.acceptPrivacy')}
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.consentElectronic || false} onChange={handleCheckboxChange('consentElectronic')} />
//               {t('wizard.step1.consentElectronic')}
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.certifyAccurate || false} onChange={handleCheckboxChange('certifyAccurate')} />
//               {t('wizard.step1.certifyAccurate')}
//             </label>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep1








// // src/worker/components/wizard-steps/WizardStep1.jsx
// import { useState, useRef, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconMail, IconPhone, IconLocation, IconUpload } from '../../../common/components/Icons'

// // US States data
// const US_STATES = [
//   { name: 'Alabama', code: 'AL' },
//   { name: 'Alaska', code: 'AK' },
//   { name: 'Arizona', code: 'AZ' },
//   { name: 'Arkansas', code: 'AR' },
//   { name: 'California', code: 'CA' },
//   { name: 'Colorado', code: 'CO' },
//   { name: 'Connecticut', code: 'CT' },
//   { name: 'Delaware', code: 'DE' },
//   { name: 'Florida', code: 'FL' },
//   { name: 'Georgia', code: 'GA' },
//   { name: 'Hawaii', code: 'HI' },
//   { name: 'Idaho', code: 'ID' },
//   { name: 'Illinois', code: 'IL' },
//   { name: 'Indiana', code: 'IN' },
//   { name: 'Iowa', code: 'IA' },
//   { name: 'Kansas', code: 'KS' },
//   { name: 'Kentucky', code: 'KY' },
//   { name: 'Louisiana', code: 'LA' },
//   { name: 'Maine', code: 'ME' },
//   { name: 'Maryland', code: 'MD' },
//   { name: 'Massachusetts', code: 'MA' },
//   { name: 'Michigan', code: 'MI' },
//   { name: 'Minnesota', code: 'MN' },
//   { name: 'Mississippi', code: 'MS' },
//   { name: 'Missouri', code: 'MO' },
//   { name: 'Montana', code: 'MT' },
//   { name: 'Nebraska', code: 'NE' },
//   { name: 'Nevada', code: 'NV' },
//   { name: 'New Hampshire', code: 'NH' },
//   { name: 'New Jersey', code: 'NJ' },
//   { name: 'New Mexico', code: 'NM' },
//   { name: 'New York', code: 'NY' },
//   { name: 'North Carolina', code: 'NC' },
//   { name: 'North Dakota', code: 'ND' },
//   { name: 'Ohio', code: 'OH' },
//   { name: 'Oklahoma', code: 'OK' },
//   { name: 'Oregon', code: 'OR' },
//   { name: 'Pennsylvania', code: 'PA' },
//   { name: 'Rhode Island', code: 'RI' },
//   { name: 'South Carolina', code: 'SC' },
//   { name: 'South Dakota', code: 'SD' },
//   { name: 'Tennessee', code: 'TN' },
//   { name: 'Texas', code: 'TX' },
//   { name: 'Utah', code: 'UT' },
//   { name: 'Vermont', code: 'VT' },
//   { name: 'Virginia', code: 'VA' },
//   { name: 'Washington', code: 'WA' },
//   { name: 'West Virginia', code: 'WV' },
//   { name: 'Wisconsin', code: 'WI' },
//   { name: 'Wyoming', code: 'WY' },
// ]

// // Custom State Dropdown Component
// function StateDropdown({ value, onChange, placeholder = 'State', error }) {
//   const { t } = useTranslation()
//   const [isOpen, setIsOpen] = useState(false)
//   const dropdownRef = useRef(null)

//   const getStateName = (code) => {
//     if (!code) return ''
//     const state = US_STATES.find(s => s.code === code)
//     return state ? state.name : ''
//   }

//   const getDisplayText = () => {
//     if (!value) return placeholder
//     const name = getStateName(value)
//     return name || placeholder
//   }

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   return (
//     <div ref={dropdownRef} style={{ position: 'relative' }}>
//       <div
//         onClick={() => setIsOpen(!isOpen)}
//         style={{
//           width: '100%',
//           height: '48px',
//           padding: '0 16px',
//           paddingRight: '40px',
//           border: error ? '1px solid #dc2626' : '1px solid rgba(18, 38, 63, 0.12)',
//           borderRadius: '12px',
//           fontSize: '14px',
//           outline: 'none',
//           background: 'white',
//           color: value ? '#17263a' : '#6b7280',
//           transition: 'all 0.2s ease',
//           fontFamily: 'inherit',
//           cursor: 'pointer',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           userSelect: 'none',
//           boxShadow: isOpen ? '0 0 0 3px rgba(15, 78, 169, 0.1)' : error ? '0 0 0 3px rgba(220, 38, 38, 0.1)' : 'none',
//           borderColor: isOpen ? '#0f4ea9' : error ? '#dc2626' : 'rgba(18, 38, 63, 0.12)',
//         }}
//         onMouseEnter={(e) => {
//           if (!isOpen && !error) {
//             e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.4)'
//           }
//         }}
//         onMouseLeave={(e) => {
//           if (!isOpen && !error) {
//             e.currentTarget.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//           }
//         }}
//       >
//         <span>{getDisplayText()}</span>
//         <svg 
//           width="12" 
//           height="12" 
//           viewBox="0 0 12 12" 
//           style={{
//             transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
//             transition: 'transform 0.2s ease',
//             flexShrink: 0
//           }}
//         >
//           <path fill="#17263a" d="M6 8L1 3h10z" />
//         </svg>
//       </div>

//       {isOpen && (
//         <div
//           style={{
//             position: 'absolute',
//             top: 'calc(100% + 4px)',
//             left: 0,
//             right: 0,
//             maxHeight: '200px',
//             overflowY: 'auto',
//             background: 'white',
//             border: '1px solid rgba(18, 38, 63, 0.12)',
//             borderRadius: '12px',
//             boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
//             zIndex: 1000,
//             padding: '4px 0',
//           }}
//         >
//           <div
//             onClick={() => {
//               onChange('')
//               setIsOpen(false)
//             }}
//             style={{
//               padding: '10px 16px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               color: '#6b7280',
//               transition: 'all 0.15s ease',
//               borderRadius: '8px',
//               margin: '2px 4px',
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.background = 'transparent'
//             }}
//           >
//             {placeholder}
//           </div>

//           {US_STATES.map((state) => (
//             <div
//               key={state.code}
//               onClick={() => {
//                 onChange(state.code)
//                 setIsOpen(false)
//               }}
//               style={{
//                 padding: '10px 16px',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 color: value === state.code ? '#0f4ea9' : '#17263a',
//                 fontWeight: value === state.code ? '600' : '400',
//                 background: value === state.code ? 'rgba(15, 78, 169, 0.08)' : 'transparent',
//                 transition: 'all 0.15s ease',
//                 borderRadius: '8px',
//                 margin: '2px 4px',
//               }}
//               onMouseEnter={(e) => {
//                 if (value !== state.code) {
//                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.05)'
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (value !== state.code) {
//                   e.currentTarget.style.background = 'transparent'
//                 }
//               }}
//             >
//               {state.name}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export function WizardStep1({ data, onChange, onNext }) {
//   const { t } = useTranslation()
//   const [profilePreview, setProfilePreview] = useState(data.profilePreview || '')
//   const [isUploading, setIsUploading] = useState(false)
//   const [uploadError, setUploadError] = useState('')
//   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  
//   // ✅ Validation error states
//   const [addressError, setAddressError] = useState('')
//   const [cityError, setCityError] = useState('')
//   const [stateError, setStateError] = useState('')
//   const [zipError, setZipError] = useState('')
//   const [currentAddressError, setCurrentAddressError] = useState('')
//   const [currentCityError, setCurrentCityError] = useState('')
//   const [currentStateError, setCurrentStateError] = useState('')
//   const [currentZipError, setCurrentZipError] = useState('')
//   const [dobError, setDobError] = useState('')
//   const [languagesError, setLanguagesError] = useState('')
//   const [agreementsError, setAgreementsError] = useState('')
  
//   const uploadRef = useRef(null)
//   const datePickerRef = useRef(null)

//   // ✅ Validate all fields and return validation state
//   const validateFields = () => {
//     let isValid = true

//     // Address - All fields required
//     if (!data.addressLine1?.trim()) {
//       setAddressError('Address is required')
//       isValid = false
//     } else {
//       setAddressError('')
//     }

//     if (!data.city?.trim()) {
//       setCityError('City is required')
//       isValid = false
//     } else {
//       setCityError('')
//     }

//     if (!data.stateCode) {
//       setStateError('State is required')
//       isValid = false
//     } else {
//       setStateError('')
//     }

//     if (!data.zip?.trim()) {
//       setZipError('Zip code is required')
//       isValid = false
//     } else {
//       setZipError('')
//     }

//     // Current Address - Required
//     if (!data.currentAddressLine1?.trim()) {
//       setCurrentAddressError('Current address is required')
//       isValid = false
//     } else {
//       setCurrentAddressError('')
//     }

//     if (!data.currentCity?.trim()) {
//       setCurrentCityError('Current city is required')
//       isValid = false
//     } else {
//       setCurrentCityError('')
//     }

//     if (!data.currentStateCode) {
//       setCurrentStateError('Current state is required')
//       isValid = false
//     } else {
//       setCurrentStateError('')
//     }

//     if (!data.currentZip?.trim()) {
//       setCurrentZipError('Current zip code is required')
//       isValid = false
//     } else {
//       setCurrentZipError('')
//     }

//     // Date of Birth - Required
//     if (!data.dob) {
//       setDobError('Date of Birth is required')
//       isValid = false
//     } else {
//       setDobError('')
//     }

//     // Languages Known - Required (at least one)
//     if (!data.english && !data.englishSpanish && !data.spanish) {
//       setLanguagesError('Please select at least one language')
//       isValid = false
//     } else {
//       setLanguagesError('')
//     }

//     // Agreements - Required (all must be checked)
//     if (!data.acceptTerms || !data.acceptPrivacy || !data.consentElectronic || !data.certifyAccurate) {
//       setAgreementsError('All agreements must be accepted')
//       isValid = false
//     } else {
//       setAgreementsError('')
//     }

//     return isValid
//   }

//   // ✅ Handle Next button click with validation - calls the parent's onNext
//   const handleNext = () => {
//     const isValid = validateFields()
//     if (isValid && onNext) {
//       onNext()
//     } else {
//       // Scroll to first error
//       const firstError = document.querySelector('.field-error, .error-text')
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
//       }
//     }
//   }

//   const handleChange = (field, value) => {
//     console.log(`Updating ${field} to:`, value)
//     onChange({ [field]: value })
    
//     // Clear errors when field is updated
//     if (field === 'addressLine1') setAddressError('')
//     if (field === 'city') setCityError('')
//     if (field === 'stateCode') setStateError('')
//     if (field === 'zip') setZipError('')
//     if (field === 'currentAddressLine1') setCurrentAddressError('')
//     if (field === 'currentCity') setCurrentCityError('')
//     if (field === 'currentStateCode') setCurrentStateError('')
//     if (field === 'currentZip') setCurrentZipError('')
//     if (field === 'dob') setDobError('')
//   }

//   const handleCheckboxChange = (field) => (e) => {
//     onChange({ [field]: e.target.checked })
//     // Clear agreements error when any checkbox changes
//     if (['acceptTerms', 'acceptPrivacy', 'consentElectronic', 'certifyAccurate'].includes(field)) {
//       setAgreementsError('')
//     }
//     // Clear languages error when language checkbox changes
//     if (['english', 'englishSpanish', 'spanish'].includes(field)) {
//       setLanguagesError('')
//     }
//   }

//   const handleSameAsAddressChange = (e) => {
//     const checked = e.target.checked
//     onChange({
//       sameAsAddress: checked,
//       currentAddressLine1: checked ? data.addressLine1 : '',
//       currentCity: checked ? data.city : '',
//       currentStateCode: checked ? data.stateCode : '',
//       currentZip: checked ? data.zip : '',
//     })
//     // Clear current address errors when using same as address
//     if (checked) {
//       setCurrentAddressError('')
//       setCurrentCityError('')
//       setCurrentStateError('')
//       setCurrentZipError('')
//     }
//   }

//   // ✅ DIRECT API CALL - bypasses the service entirely (fixes Vite minification issue)
//   const handleFileUpload = async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError(t('wizard.step1.uploadError') || 'File size must be less than 5MB')
//       return
//     }
//     if (!file.type.startsWith('image/')) {
//       setUploadError(t('wizard.step1.uploadError') || 'Please upload an image file')
//       return
//     }

//     setIsUploading(true)
//     setUploadError('')

//     try {
//       const userId = localStorage.getItem('userId') || 'temp-user'
//       console.log('👤 User ID:', userId)

//       const response = await fetch('/api/upload/profile', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           userId,
//           fileName: file.name,
//           fileType: file.type
//         })
//       })

//       const result = await response.json()
//       console.log('🔍 Backend Response:', result)

//       if (!result.success) {
//         throw new Error(result.message || 'Failed to get upload URL')
//       }

//       const { uploadUrl, fileKey, fileUrl, viewUrl } = result.data

//       if (!uploadUrl) {
//         throw new Error('No upload URL received from server')
//       }

//       console.log('📤 Uploading to S3:', uploadUrl)

//       const uploadResponse = await fetch(uploadUrl, {
//         method: 'PUT',
//         body: file,
//         headers: { 'Content-Type': file.type }
//       })

//       if (!uploadResponse.ok) {
//         throw new Error(`Upload failed: ${uploadResponse.status}`)
//       }

//       console.log('✅ S3 Upload successful!')

//       const viewUrlResponse = await fetch(`/api/upload/view/${encodeURIComponent(fileKey)}`)
//       const viewData = await viewUrlResponse.json()

//       let displayUrl = fileUrl
//       if (viewData.success) {
//         displayUrl = viewData.data.viewUrl
//       }

//       setProfilePreview(displayUrl)
//       onChange({
//         profilePreview: displayUrl,
//         profileImageKey: fileKey,
//         profileImageUrl: fileUrl
//       })

//       localStorage.setItem('userProfileImage', displayUrl)
//       window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//         detail: { profileImage: displayUrl }
//       }))

//       console.log('✅ Profile image upload complete!')

//     } catch (error) {
//       console.error('❌ Error uploading profile image:', error)
//       setUploadError(error.message || t('wizard.step1.uploadError') || 'Failed to upload image. Please try again.')
//     } finally {
//       setIsUploading(false)
//     }
//   }

//   const handleDateChange = (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       onChange({ dob: `${month}/${day}/${year}` })
//       setDobError('')
//     } else {
//       onChange({ dob: '' })
//       setDobError('Date of Birth is required')
//     }
//     setIsDatePickerOpen(false)
//   }

//   const parseDate = (dateStr) => {
//     if (!dateStr) return null
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
//     }
//     return null
//   }

//   const datePickerStyles = `
//     .date-picker-wrapper {
//       position: relative;
//       width: 100%;
//     }
//     .date-picker-wrapper .react-datepicker__input-container {
//       display: block;
//       width: 100%;
//     }
//     .date-picker-wrapper .react-datepicker__input-container input {
//       width: 100%;
//       height: 40px;
//       padding: 0 12px;
//       padding-right: 36px !important;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 8px;
//       font-size: 13px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//       box-sizing: border-box;
//     }
//     .date-picker-wrapper .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }
//     .date-picker-wrapper .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }
//     .date-picker-wrapper .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }
//     .date-picker-wrapper .calendar-icon {
//       position: absolute;
//       right: 10px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: rgba(23, 38, 58, 0.5);
//       pointer-events: none;
//       font-size: 16px;
//       line-height: 1;
//       z-index: 2;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//     }
//     .date-picker-wrapper .react-datepicker-wrapper {
//       display: block;
//       width: 100%;
//     }
//     .custom-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//     }
//     .custom-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }
//     .custom-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }
//     .custom-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }
//     .custom-date-picker .react-datepicker__day {
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
//     .custom-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }
//     .custom-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }
//     .custom-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }
//     .custom-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }
//     .custom-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }
//     .custom-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }
//     .custom-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }
//     .custom-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }
//     .custom-date-picker .react-datepicker__day--outside-month {
//       color: rgba(23, 38, 58, 0.2);
//     }
//     .custom-date-picker .react-datepicker__navigation {
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
//     .custom-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }
//     .custom-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }
//     .custom-date-picker .react-datepicker__navigation-icon:hover::before {
//       border-color: #0f4ea9;
//     }
//     .custom-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }
//     .custom-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }
//     .custom-date-picker .react-datepicker__month-dropdown,
//     .custom-date-picker .react-datepicker__year-dropdown {
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
//       background: white;
//       padding: 4px;
//     }
//     .custom-date-picker .react-datepicker__month-option,
//     .custom-date-picker .react-datepicker__year-option {
//       padding: 8px 16px;
//       border-radius: 8px;
//       transition: all 0.15s ease;
//       cursor: pointer;
//     }
//     .custom-date-picker .react-datepicker__month-option:hover,
//     .custom-date-picker .react-datepicker__year-option:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }
//     .custom-date-picker .react-datepicker__month-option--selected,
//     .custom-date-picker .react-datepicker__year-option--selected {
//       background: rgba(15, 78, 169, 0.1);
//       font-weight: 600;
//     }

//     .field-error {
//       color: #dc2626;
//       font-size: 11px;
//       margin-top: 4px;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//     }

//     .error-text {
//       color: #dc2626;
//       font-size: 12px;
//       margin-top: 4px;
//     }

//     .field-error-input {
//       border-color: #dc2626 !important;
//     }

//     .field-error-input:focus {
//       border-color: #dc2626 !important;
//       box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
//     }
//   `

//   // ✅ Check if user is authenticated (has userId) - if so, fields are read-only
//   const userId = localStorage.getItem('userId')
//   const isAuthenticated = !!userId

//   return (
//     <div className="wizardStep">
//       <style>{datePickerStyles}</style>
      
//       <div className="wizardBody">
//         {/* Personal Information Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step1.title')}</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder={t('auth.firstName')} 
//               icon={<IconUser />} 
//               value={data.legalFirstName || ''} 
//               onChange={(v) => handleChange('legalFirstName', v)}
//               readOnly={isAuthenticated}
//             />
//             <TextField 
//               placeholder={t('auth.lastName')} 
//               icon={<IconUser />} 
//               value={data.legalLastName || ''} 
//               onChange={(v) => handleChange('legalLastName', v)}
//               readOnly={isAuthenticated}
//             />
//             <TextField 
//               placeholder={t('auth.emailAddress')} 
//               icon={<IconMail />} 
//               value={data.emailAddress || ''} 
//               onChange={(v) => handleChange('emailAddress', v)}
//               readOnly={isAuthenticated}
//             />
//             <TextField 
//               placeholder={t('auth.mobileNumber')} 
//               icon={<IconPhone />} 
//               value={data.mobilePhone || ''} 
//               onChange={(v) => handleChange('mobilePhone', v)}
//               readOnly={isAuthenticated}
//             />
//           </div>
//         </div>

//         {/* Address + Current Address */}
//         <div className="wizardSection">
//           <div className="wizardGrid2">
//             {/* Address */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step1.address')} <span style={{ color: '#dc2626' }}>*</span></div>
//               <TextField
//                 placeholder={t('wizard.step1.address')}
//                 icon={<IconLocation />}
//                 value={data.addressLine1 || ''}
//                 onChange={(v) => handleChange('addressLine1', v)}
//                 className={addressError ? 'field-error-input' : ''}
//               />
//               {addressError && <div className="field-error">⚠️ {addressError}</div>}
              
//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <div style={{ flex: 1 }}>
//                   <TextField
//                     placeholder={t('wizard.step1.city')}
//                     icon={<IconLocation />}
//                     value={data.city || ''}
//                     onChange={(v) => handleChange('city', v)}
//                     className={cityError ? 'field-error-input' : ''}
//                   />
//                   {cityError && <div className="field-error">⚠️ {cityError}</div>}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <StateDropdown
//                     value={data.stateCode || ''}
//                     onChange={(v) => handleChange('stateCode', v)}
//                     placeholder={t('wizard.step1.state')}
//                     error={!!stateError}
//                   />
//                   {stateError && <div className="field-error">⚠️ {stateError}</div>}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <TextField
//                     placeholder={t('wizard.step1.zip')}
//                     icon={<IconLocation />}
//                     value={data.zip || ''}
//                     onChange={(v) => handleChange('zip', v)}
//                     className={zipError ? 'field-error-input' : ''}
//                   />
//                   {zipError && <div className="field-error">⚠️ {zipError}</div>}
//                 </div>
//               </div>
//             </div>

//             {/* Current Address */}
//             <div>
//               <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
//                 <div className="wizardSectionBar" style={{ marginBottom: 0 }}>
//                   {t('wizard.step1.currentAddress')} <span style={{ color: '#dc2626' }}>*</span>
//                 </div>
//                 <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.sameAsAddress || false}
//                     onChange={handleSameAsAddressChange}
//                   />
//                   {t('wizard.step1.sameAsAddress')}
//                 </label>
//               </div>
//               <TextField
//                 placeholder={t('wizard.step1.address')}
//                 icon={<IconLocation />}
//                 value={data.currentAddressLine1 || ''}
//                 onChange={(v) => handleChange('currentAddressLine1', v)}
//                 className={currentAddressError ? 'field-error-input' : ''}
//               />
//               {currentAddressError && <div className="field-error">⚠️ {currentAddressError}</div>}
              
//               <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
//                 <div style={{ flex: 1 }}>
//                   <TextField
//                     placeholder={t('wizard.step1.city')}
//                     icon={<IconLocation />}
//                     value={data.currentCity || ''}
//                     onChange={(v) => handleChange('currentCity', v)}
//                     className={currentCityError ? 'field-error-input' : ''}
//                   />
//                   {currentCityError && <div className="field-error">⚠️ {currentCityError}</div>}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <StateDropdown
//                     value={data.currentStateCode || ''}
//                     onChange={(v) => handleChange('currentStateCode', v)}
//                     placeholder={t('wizard.step1.state')}
//                     error={!!currentStateError}
//                   />
//                   {currentStateError && <div className="field-error">⚠️ {currentStateError}</div>}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <TextField
//                     placeholder={t('wizard.step1.zip')}
//                     icon={<IconLocation />}
//                     value={data.currentZip || ''}
//                     onChange={(v) => handleChange('currentZip', v)}
//                     className={currentZipError ? 'field-error-input' : ''}
//                   />
//                   {currentZipError && <div className="field-error">⚠️ {currentZipError}</div>}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Details */}
//         <div className="wizardSection">
//           <div className="wizardGrid2">
//             {/* DOB */}
//             <div>
//               <div className="wizardSectionBar">{t('auth.dateOfBirth')} <span style={{ color: '#dc2626' }}>*</span></div>
//               <div className="date-picker-wrapper custom-date-picker">
//                 <DatePicker
//                   ref={datePickerRef}
//                   selected={parseDate(data.dob)}
//                   onChange={handleDateChange}
//                   dateFormat="MM/dd/yyyy"
//                   placeholderText={t('auth.dateOfBirth')}
//                   maxDate={new Date()}
//                   onCalendarOpen={() => setIsDatePickerOpen(true)}
//                   onCalendarClose={() => setIsDatePickerOpen(false)}
//                   showYearDropdown
//                   showMonthDropdown
//                   dropdownMode="select"
//                   yearDropdownItemNumber={100}
//                   scrollableYearDropdown
//                   className={`date-picker-input ${dobError ? 'field-error-input' : ''}`}
//                   popperPlacement="bottom-start"
//                   popperModifiers={[
//                     {
//                       name: 'offset',
//                       options: {
//                         offset: [0, 8],
//                       },
//                     },
//                   ]}
//                 />
//                 <span className="calendar-icon">📅</span>
//               </div>
//               {dobError && <div className="field-error">⚠️ {dobError}</div>}
//             </div>

//             {/* Languages */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step1.languagesKnown')} <span style={{ color: '#dc2626' }}>*</span></div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
//                 <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.english || false}
//                     onChange={handleCheckboxChange('english')}
//                   />
//                   {t('wizard.step1.english')}
//                 </label>
//                 <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.englishSpanish || false}
//                     onChange={handleCheckboxChange('englishSpanish')}
//                   />
//                   {t('wizard.step1.englishSpanish')}
//                 </label>
//                 <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
//                   <input
//                     type="checkbox"
//                     checked={data.spanish || false}
//                     onChange={handleCheckboxChange('spanish')}
//                   />
//                   {t('wizard.step1.spanish')}
//                 </label>
//               </div>
//               {languagesError && <div className="field-error">⚠️ {languagesError}</div>}
//             </div>
//           </div>
//         </div>

//         {/* Profile Image Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step1.profileImage')}</div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
//             <div style={{ 
//               width: '80px', 
//               height: '80px', 
//               borderRadius: '50%', 
//               background: 'rgba(15,78,169,0.1)',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               overflow: 'hidden',
//               border: '2px solid rgba(15,78,169,0.2)'
//             }}>
//               {profilePreview ? (
//                 <img src={profilePreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//               ) : (
//                 <IconUser style={{ width: '40px', height: '40px', color: 'rgba(15,78,169,0.5)' }} />
//               )}
//             </div>
            
//             <div>
//               <button
//                 type="button"
//                 onClick={() => uploadRef.current?.click()}
//                 disabled={isUploading}
//                 style={{ 
//                   display: 'inline-flex', 
//                   alignItems: 'center', 
//                   gap: '6px',
//                   padding: '8px 24px',
//                   background: isUploading ? 'rgba(15,78,169,0.05)' : 'rgba(15,78,169,0.1)',
//                   borderRadius: '25px',
//                   cursor: isUploading ? 'not-allowed' : 'pointer',
//                   fontSize: '13px',
//                   fontWeight: '600',
//                   border: 'none',
//                   color: isUploading ? '#94a3b8' : '#0f4ea9',
//                   opacity: isUploading ? 0.6 : 1
//                 }}
//               >
//                 {isUploading ? t('wizard.step1.uploading') || '⏳ Uploading...' : (
//                   <>
//                     <IconUpload style={{ width: '14px', height: '14px' }} />
//                     {t('wizard.step1.upload')}
//                   </>
//                 )}
//               </button>
//               {uploadError && (
//                 <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>
//                   {uploadError}
//                 </div>
//               )}
//             </div>
//             <input 
//               ref={uploadRef}
//               type="file" 
//               accept="image/*" 
//               onChange={handleFileUpload} 
//               style={{ display: 'none' }} 
//             />
//           </div>
//         </div>

//         {/* Agreements Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step1.agreements')} <span style={{ color: '#dc2626' }}>*</span></div>
//           <div className="wizardChecks">
//             <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <input type="checkbox" checked={data.acceptTerms || false} onChange={handleCheckboxChange('acceptTerms')} />
//               {t('wizard.step1.acceptTerms')}
//             </label>
//             <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <input type="checkbox" checked={data.acceptPrivacy || false} onChange={handleCheckboxChange('acceptPrivacy')} />
//               {t('wizard.step1.acceptPrivacy')}
//             </label>
//             <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <input type="checkbox" checked={data.consentElectronic || false} onChange={handleCheckboxChange('consentElectronic')} />
//               {t('wizard.step1.consentElectronic')}
//             </label>
//             <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//               <input type="checkbox" checked={data.certifyAccurate || false} onChange={handleCheckboxChange('certifyAccurate')} />
//               {t('wizard.step1.certifyAccurate')}
//             </label>
//           </div>
//           {agreementsError && <div className="field-error">⚠️ {agreementsError}</div>}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep1








// src/worker/components/wizard-steps/WizardStep1.jsx
import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconMail, IconPhone, IconLocation, IconUpload } from '../../../common/components/Icons'

// US States data
const US_STATES = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DE' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'ID' },
  { name: 'Illinois', code: 'IL' },
  { name: 'Indiana', code: 'IN' },
  { name: 'Iowa', code: 'IA' },
  { name: 'Kansas', code: 'KS' },
  { name: 'Kentucky', code: 'KY' },
  { name: 'Louisiana', code: 'LA' },
  { name: 'Maine', code: 'ME' },
  { name: 'Maryland', code: 'MD' },
  { name: 'Massachusetts', code: 'MA' },
  { name: 'Michigan', code: 'MI' },
  { name: 'Minnesota', code: 'MN' },
  { name: 'Mississippi', code: 'MS' },
  { name: 'Missouri', code: 'MO' },
  { name: 'Montana', code: 'MT' },
  { name: 'Nebraska', code: 'NE' },
  { name: 'Nevada', code: 'NV' },
  { name: 'New Hampshire', code: 'NH' },
  { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' },
  { name: 'New York', code: 'NY' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'North Dakota', code: 'ND' },
  { name: 'Ohio', code: 'OH' },
  { name: 'Oklahoma', code: 'OK' },
  { name: 'Oregon', code: 'OR' },
  { name: 'Pennsylvania', code: 'PA' },
  { name: 'Rhode Island', code: 'RI' },
  { name: 'South Carolina', code: 'SC' },
  { name: 'South Dakota', code: 'SD' },
  { name: 'Tennessee', code: 'TN' },
  { name: 'Texas', code: 'TX' },
  { name: 'Utah', code: 'UT' },
  { name: 'Vermont', code: 'VT' },
  { name: 'Virginia', code: 'VA' },
  { name: 'Washington', code: 'WA' },
  { name: 'West Virginia', code: 'WV' },
  { name: 'Wisconsin', code: 'WI' },
  { name: 'Wyoming', code: 'WY' },
]

// Custom State Dropdown Component
function StateDropdown({ value, onChange, placeholder = 'State', error }) {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  const getStateName = (code) => {
    if (!code) return ''
    const state = US_STATES.find(s => s.code === code)
    return state ? state.name : ''
  }

  const getDisplayText = () => {
    if (!value) return placeholder
    const name = getStateName(value)
    return name || placeholder
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          height: '48px',
          padding: '0 16px',
          paddingRight: '40px',
          border: error ? '1px solid #dc2626' : '1px solid rgba(18, 38, 63, 0.12)',
          borderRadius: '12px',
          fontSize: '14px',
          outline: 'none',
          background: 'white',
          color: value ? '#17263a' : '#6b7280',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(15, 78, 169, 0.1)' : error ? '0 0 0 3px rgba(220, 38, 38, 0.1)' : 'none',
          borderColor: isOpen ? '#0f4ea9' : error ? '#dc2626' : 'rgba(18, 38, 63, 0.12)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen && !error) {
            e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.4)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen && !error) {
            e.currentTarget.style.borderColor = 'rgba(18, 38, 63, 0.12)'
          }
        }}
      >
        <span>{getDisplayText()}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0
          }}
        >
          <path fill="#17263a" d="M6 8L1 3h10z" />
        </svg>
      </div>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'auto',
            background: 'white',
            border: '1px solid rgba(18, 38, 63, 0.12)',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            zIndex: 1000,
            padding: '4px 0',
          }}
        >
          <div
            onClick={() => {
              onChange('')
              setIsOpen(false)
            }}
            style={{
              padding: '10px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#6b7280',
              transition: 'all 0.15s ease',
              borderRadius: '8px',
              margin: '2px 4px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {placeholder}
          </div>

          {US_STATES.map((state) => (
            <div
              key={state.code}
              onClick={() => {
                onChange(state.code)
                setIsOpen(false)
              }}
              style={{
                padding: '10px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                color: value === state.code ? '#0f4ea9' : '#17263a',
                fontWeight: value === state.code ? '600' : '400',
                background: value === state.code ? 'rgba(15, 78, 169, 0.08)' : 'transparent',
                transition: 'all 0.15s ease',
                borderRadius: '8px',
                margin: '2px 4px',
              }}
              onMouseEnter={(e) => {
                if (value !== state.code) {
                  e.currentTarget.style.background = 'rgba(15, 78, 169, 0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (value !== state.code) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {state.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ✅ Mobile Sidebar Content Component
function MobileSidebarContent() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  return (
    <>
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
    </>
  )
}

export function WizardStep1({ data, onChange, onNext, onBack }) {
  const { t } = useTranslation()
  const [profilePreview, setProfilePreview] = useState(data.profilePreview || '')
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  
  // ✅ Validation error states
  const [addressError, setAddressError] = useState('')
  const [cityError, setCityError] = useState('')
  const [stateError, setStateError] = useState('')
  const [zipError, setZipError] = useState('')
  const [currentAddressError, setCurrentAddressError] = useState('')
  const [currentCityError, setCurrentCityError] = useState('')
  const [currentStateError, setCurrentStateError] = useState('')
  const [currentZipError, setCurrentZipError] = useState('')
  const [dobError, setDobError] = useState('')
  const [languagesError, setLanguagesError] = useState('')
  const [agreementsError, setAgreementsError] = useState('')
  
  const uploadRef = useRef(null)
  const datePickerRef = useRef(null)

  // ✅ Validate all fields and return validation state
  const validateFields = () => {
    let isValid = true

    // Address - All fields required
    if (!data.addressLine1?.trim()) {
      setAddressError('Address is required')
      isValid = false
    } else {
      setAddressError('')
    }

    if (!data.city?.trim()) {
      setCityError('City is required')
      isValid = false
    } else {
      setCityError('')
    }

    if (!data.stateCode) {
      setStateError('State is required')
      isValid = false
    } else {
      setStateError('')
    }

    if (!data.zip?.trim()) {
      setZipError('Zip code is required')
      isValid = false
    } else {
      setZipError('')
    }

    // Current Address - Required
    if (!data.currentAddressLine1?.trim()) {
      setCurrentAddressError('Current address is required')
      isValid = false
    } else {
      setCurrentAddressError('')
    }

    if (!data.currentCity?.trim()) {
      setCurrentCityError('Current city is required')
      isValid = false
    } else {
      setCurrentCityError('')
    }

    if (!data.currentStateCode) {
      setCurrentStateError('Current state is required')
      isValid = false
    } else {
      setCurrentStateError('')
    }

    if (!data.currentZip?.trim()) {
      setCurrentZipError('Current zip code is required')
      isValid = false
    } else {
      setCurrentZipError('')
    }

    // Date of Birth - Required
    if (!data.dob) {
      setDobError('Date of Birth is required')
      isValid = false
    } else {
      setDobError('')
    }

    // Languages Known - Required (at least one)
    if (!data.english && !data.englishSpanish && !data.spanish) {
      setLanguagesError('Please select at least one language')
      isValid = false
    } else {
      setLanguagesError('')
    }

    // Agreements - Required (all must be checked)
    if (!data.acceptTerms || !data.acceptPrivacy || !data.consentElectronic || !data.certifyAccurate) {
      setAgreementsError('All agreements must be accepted')
      isValid = false
    } else {
      setAgreementsError('')
    }

    return isValid
  }

  // ✅ Handle Next button click with validation - calls the parent's onNext
  const handleNext = () => {
    const isValid = validateFields()
    if (isValid && onNext) {
      onNext()
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.field-error, .error-text')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const handleChange = (field, value) => {
    console.log(`Updating ${field} to:`, value)
    onChange({ [field]: value })
    
    // Clear errors when field is updated
    if (field === 'addressLine1') setAddressError('')
    if (field === 'city') setCityError('')
    if (field === 'stateCode') setStateError('')
    if (field === 'zip') setZipError('')
    if (field === 'currentAddressLine1') setCurrentAddressError('')
    if (field === 'currentCity') setCurrentCityError('')
    if (field === 'currentStateCode') setCurrentStateError('')
    if (field === 'currentZip') setCurrentZipError('')
    if (field === 'dob') setDobError('')
  }

  const handleCheckboxChange = (field) => (e) => {
    onChange({ [field]: e.target.checked })
    // Clear agreements error when any checkbox changes
    if (['acceptTerms', 'acceptPrivacy', 'consentElectronic', 'certifyAccurate'].includes(field)) {
      setAgreementsError('')
    }
    // Clear languages error when language checkbox changes
    if (['english', 'englishSpanish', 'spanish'].includes(field)) {
      setLanguagesError('')
    }
  }

  const handleSameAsAddressChange = (e) => {
    const checked = e.target.checked
    onChange({
      sameAsAddress: checked,
      currentAddressLine1: checked ? data.addressLine1 : '',
      currentCity: checked ? data.city : '',
      currentStateCode: checked ? data.stateCode : '',
      currentZip: checked ? data.zip : '',
    })
    // Clear current address errors when using same as address
    if (checked) {
      setCurrentAddressError('')
      setCurrentCityError('')
      setCurrentStateError('')
      setCurrentZipError('')
    }
  }

  // ✅ DIRECT API CALL - bypasses the service entirely (fixes Vite minification issue)
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      setUploadError(t('wizard.step1.uploadError') || 'File size must be less than 5MB')
      return
    }
    if (!file.type.startsWith('image/')) {
      setUploadError(t('wizard.step1.uploadError') || 'Please upload an image file')
      return
    }

    setIsUploading(true)
    setUploadError('')

    try {
      const userId = localStorage.getItem('userId') || 'temp-user'
      console.log('👤 User ID:', userId)

      const response = await fetch('/api/upload/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          fileName: file.name,
          fileType: file.type
        })
      })

      const result = await response.json()
      console.log('🔍 Backend Response:', result)

      if (!result.success) {
        throw new Error(result.message || 'Failed to get upload URL')
      }

      const { uploadUrl, fileKey, fileUrl, viewUrl } = result.data

      if (!uploadUrl) {
        throw new Error('No upload URL received from server')
      }

      console.log('📤 Uploading to S3:', uploadUrl)

      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: { 'Content-Type': file.type }
      })

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed: ${uploadResponse.status}`)
      }

      console.log('✅ S3 Upload successful!')

      const viewUrlResponse = await fetch(`/api/upload/view/${encodeURIComponent(fileKey)}`)
      const viewData = await viewUrlResponse.json()

      let displayUrl = fileUrl
      if (viewData.success) {
        displayUrl = viewData.data.viewUrl
      }

      setProfilePreview(displayUrl)
      onChange({
        profilePreview: displayUrl,
        profileImageKey: fileKey,
        profileImageUrl: fileUrl
      })

      localStorage.setItem('userProfileImage', displayUrl)
      window.dispatchEvent(new CustomEvent('profileImageUpdated', {
        detail: { profileImage: displayUrl }
      }))

      console.log('✅ Profile image upload complete!')

    } catch (error) {
      console.error('❌ Error uploading profile image:', error)
      setUploadError(error.message || t('wizard.step1.uploadError') || 'Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDateChange = (date) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      onChange({ dob: `${month}/${day}/${year}` })
      setDobError('')
    } else {
      onChange({ dob: '' })
      setDobError('Date of Birth is required')
    }
    setIsDatePickerOpen(false)
  }

  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
    }
    return null
  }

  const datePickerStyles = `
    .date-picker-wrapper {
      position: relative;
      width: 100%;
    }
    .date-picker-wrapper .react-datepicker__input-container {
      display: block;
      width: 100%;
    }
    .date-picker-wrapper .react-datepicker__input-container input {
      width: 100%;
      height: 40px;
      padding: 0 12px;
      padding-right: 36px !important;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 8px;
      font-size: 13px;
      outline: none;
      background: white;
      color: #17263a;
      transition: all 0.2s ease;
      font-family: inherit;
      box-sizing: border-box;
    }
    .date-picker-wrapper .react-datepicker__input-container input:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }
    .date-picker-wrapper .react-datepicker__input-container input:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }
    .date-picker-wrapper .react-datepicker__input-container input::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }
    .date-picker-wrapper .calendar-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(23, 38, 58, 0.5);
      pointer-events: none;
      font-size: 16px;
      line-height: 1;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .date-picker-wrapper .react-datepicker-wrapper {
      display: block;
      width: 100%;
    }
    .custom-date-picker .react-datepicker {
      font-family: inherit;
      border-radius: 12px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
      background: white;
      padding: 8px;
      overflow: hidden;
      font-size: 13px;
    }
    .custom-date-picker .react-datepicker__header {
      background: white;
      border-bottom: 1px solid rgba(18, 38, 63, 0.06);
      padding: 10px 0 6px 0;
      border-radius: 12px 12px 0 0;
    }
    .custom-date-picker .react-datepicker__current-month {
      color: #17263a;
      font-weight: 700;
      font-size: 14px;
      padding-bottom: 4px;
    }
    .custom-date-picker .react-datepicker__day-name {
      color: rgba(23, 38, 58, 0.5);
      font-weight: 600;
      font-size: 11px;
      width: 32px;
      margin: 2px;
    }
    .custom-date-picker .react-datepicker__day {
      width: 32px;
      height: 32px;
      line-height: 32px;
      margin: 2px;
      border-radius: 8px;
      font-size: 13px;
      color: #17263a;
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .custom-date-picker .react-datepicker__day:hover {
      background: rgba(15, 78, 169, 0.08);
      border-radius: 8px;
    }
    .custom-date-picker .react-datepicker__day--selected {
      background: #0f4ea9 !important;
      color: white !important;
      border-radius: 8px;
      font-weight: 600;
    }
    .custom-date-picker .react-datepicker__day--selected:hover {
      background: #0b3f90 !important;
    }
    .custom-date-picker .react-datepicker__day--keyboard-selected {
      background: rgba(15, 78, 169, 0.15);
      border-radius: 8px;
    }
    .custom-date-picker .react-datepicker__day--today {
      font-weight: 700;
      color: #0f4ea9;
    }
    .custom-date-picker .react-datepicker__day--today::after {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: #0f4ea9;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: -2px;
    }
    .custom-date-picker .react-datepicker__day--disabled {
      color: rgba(23, 38, 58, 0.2);
      cursor: not-allowed;
    }
    .custom-date-picker .react-datepicker__day--disabled:hover {
      background: transparent;
    }
    .custom-date-picker .react-datepicker__day--outside-month {
      color: rgba(23, 38, 58, 0.2);
    }
    .custom-date-picker .react-datepicker__navigation {
      top: 12px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: all 0.15s ease;
    }
    .custom-date-picker .react-datepicker__navigation:hover {
      background: rgba(15, 78, 169, 0.08);
    }
    .custom-date-picker .react-datepicker__navigation-icon::before {
      border-color: #17263a;
      border-width: 2px 2px 0 0;
      height: 7px;
      width: 7px;
    }
    .custom-date-picker .react-datepicker__navigation-icon:hover::before {
      border-color: #0f4ea9;
    }
    .custom-date-picker .react-datepicker__day--weekend {
      color: #e11d48;
    }
    .custom-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
      color: white;
    }
    .custom-date-picker .react-datepicker__month-dropdown,
    .custom-date-picker .react-datepicker__year-dropdown {
      border-radius: 12px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      background: white;
      padding: 4px;
    }
    .custom-date-picker .react-datepicker__month-option,
    .custom-date-picker .react-datepicker__year-option {
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.15s ease;
      cursor: pointer;
    }
    .custom-date-picker .react-datepicker__month-option:hover,
    .custom-date-picker .react-datepicker__year-option:hover {
      background: rgba(15, 78, 169, 0.08);
    }
    .custom-date-picker .react-datepicker__month-option--selected,
    .custom-date-picker .react-datepicker__year-option--selected {
      background: rgba(15, 78, 169, 0.1);
      font-weight: 600;
    }

    .field-error {
      color: #dc2626;
      font-size: 11px;
      margin-top: 4px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .error-text {
      color: #dc2626;
      font-size: 12px;
      margin-top: 4px;
    }

    .field-error-input {
      border-color: #dc2626 !important;
    }

    .field-error-input:focus {
      border-color: #dc2626 !important;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }
  `

  // ✅ Check if user is authenticated (has userId) - if so, fields are read-only
  const userId = localStorage.getItem('userId')
  const isAuthenticated = !!userId

  return (
    <div className="wizardStep">
      <style>{datePickerStyles}</style>
      
      <div className="wizardBody">
        {/* Personal Information Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">{t('wizard.step1.title')}</div>
          <div className="wizardGrid2">
            <TextField 
              placeholder={t('auth.firstName')} 
              icon={<IconUser />} 
              value={data.legalFirstName || ''} 
              onChange={(v) => handleChange('legalFirstName', v)}
              readOnly={isAuthenticated}
            />
            <TextField 
              placeholder={t('auth.lastName')} 
              icon={<IconUser />} 
              value={data.legalLastName || ''} 
              onChange={(v) => handleChange('legalLastName', v)}
              readOnly={isAuthenticated}
            />
            <TextField 
              placeholder={t('auth.emailAddress')} 
              icon={<IconMail />} 
              value={data.emailAddress || ''} 
              onChange={(v) => handleChange('emailAddress', v)}
              readOnly={isAuthenticated}
            />
            <TextField 
              placeholder={t('auth.mobileNumber')} 
              icon={<IconPhone />} 
              value={data.mobilePhone || ''} 
              onChange={(v) => handleChange('mobilePhone', v)}
              readOnly={isAuthenticated}
            />
          </div>
        </div>

        {/* Address + Current Address */}
        <div className="wizardSection">
          <div className="wizardGrid2">
            {/* Address */}
            <div>
              <div className="wizardSectionBar">{t('wizard.step1.address')} <span style={{ color: '#dc2626' }}>*</span></div>
              <TextField
                placeholder={t('wizard.step1.address')}
                icon={<IconLocation />}
                value={data.addressLine1 || ''}
                onChange={(v) => handleChange('addressLine1', v)}
                className={addressError ? 'field-error-input' : ''}
              />
              {addressError && <div className="field-error">⚠️ {addressError}</div>}
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div style={{ flex: 1 }}>
                  <TextField
                    placeholder={t('wizard.step1.city')}
                    icon={<IconLocation />}
                    value={data.city || ''}
                    onChange={(v) => handleChange('city', v)}
                    className={cityError ? 'field-error-input' : ''}
                  />
                  {cityError && <div className="field-error">⚠️ {cityError}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <StateDropdown
                    value={data.stateCode || ''}
                    onChange={(v) => handleChange('stateCode', v)}
                    placeholder={t('wizard.step1.state')}
                    error={!!stateError}
                  />
                  {stateError && <div className="field-error">⚠️ {stateError}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <TextField
                    placeholder={t('wizard.step1.zip')}
                    icon={<IconLocation />}
                    value={data.zip || ''}
                    onChange={(v) => handleChange('zip', v)}
                    className={zipError ? 'field-error-input' : ''}
                  />
                  {zipError && <div className="field-error">⚠️ {zipError}</div>}
                </div>
              </div>
            </div>

            {/* Current Address */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div className="wizardSectionBar" style={{ marginBottom: 0 }}>
                  {t('wizard.step1.currentAddress')} <span style={{ color: '#dc2626' }}>*</span>
                </div>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={data.sameAsAddress || false}
                    onChange={handleSameAsAddressChange}
                  />
                  {t('wizard.step1.sameAsAddress')}
                </label>
              </div>
              <TextField
                placeholder={t('wizard.step1.address')}
                icon={<IconLocation />}
                value={data.currentAddressLine1 || ''}
                onChange={(v) => handleChange('currentAddressLine1', v)}
                className={currentAddressError ? 'field-error-input' : ''}
              />
              {currentAddressError && <div className="field-error">⚠️ {currentAddressError}</div>}
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <div style={{ flex: 1 }}>
                  <TextField
                    placeholder={t('wizard.step1.city')}
                    icon={<IconLocation />}
                    value={data.currentCity || ''}
                    onChange={(v) => handleChange('currentCity', v)}
                    className={currentCityError ? 'field-error-input' : ''}
                  />
                  {currentCityError && <div className="field-error">⚠️ {currentCityError}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <StateDropdown
                    value={data.currentStateCode || ''}
                    onChange={(v) => handleChange('currentStateCode', v)}
                    placeholder={t('wizard.step1.state')}
                    error={!!currentStateError}
                  />
                  {currentStateError && <div className="field-error">⚠️ {currentStateError}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <TextField
                    placeholder={t('wizard.step1.zip')}
                    icon={<IconLocation />}
                    value={data.currentZip || ''}
                    onChange={(v) => handleChange('currentZip', v)}
                    className={currentZipError ? 'field-error-input' : ''}
                  />
                  {currentZipError && <div className="field-error">⚠️ {currentZipError}</div>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="wizardSection">
          <div className="wizardGrid2">
            {/* DOB */}
            <div>
              <div className="wizardSectionBar">{t('auth.dateOfBirth')} <span style={{ color: '#dc2626' }}>*</span></div>
              <div className="date-picker-wrapper custom-date-picker">
                <DatePicker
                  ref={datePickerRef}
                  selected={parseDate(data.dob)}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  placeholderText={t('auth.dateOfBirth')}
                  maxDate={new Date()}
                  onCalendarOpen={() => setIsDatePickerOpen(true)}
                  onCalendarClose={() => setIsDatePickerOpen(false)}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  className={`date-picker-input ${dobError ? 'field-error-input' : ''}`}
                  popperPlacement="bottom-start"
                  popperModifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 8],
                      },
                    },
                  ]}
                />
                <span className="calendar-icon">📅</span>
              </div>
              {dobError && <div className="field-error">⚠️ {dobError}</div>}
            </div>

            {/* Languages */}
            <div>
              <div className="wizardSectionBar">{t('wizard.step1.languagesKnown')} <span style={{ color: '#dc2626' }}>*</span></div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
                <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={data.english || false}
                    onChange={handleCheckboxChange('english')}
                  />
                  {t('wizard.step1.english')}
                </label>
                <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={data.englishSpanish || false}
                    onChange={handleCheckboxChange('englishSpanish')}
                  />
                  {t('wizard.step1.englishSpanish')}
                </label>
                <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={data.spanish || false}
                    onChange={handleCheckboxChange('spanish')}
                  />
                  {t('wizard.step1.spanish')}
                </label>
              </div>
              {languagesError && <div className="field-error">⚠️ {languagesError}</div>}
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">{t('wizard.step1.profileImage')}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'rgba(15,78,169,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '2px solid rgba(15,78,169,0.2)'
            }}>
              {profilePreview ? (
                <img src={profilePreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <IconUser style={{ width: '40px', height: '40px', color: 'rgba(15,78,169,0.5)' }} />
              )}
            </div>
            
            <div>
              <button
                type="button"
                onClick={() => uploadRef.current?.click()}
                disabled={isUploading}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  padding: '8px 24px',
                  background: isUploading ? 'rgba(15,78,169,0.05)' : 'rgba(15,78,169,0.1)',
                  borderRadius: '25px',
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  border: 'none',
                  color: isUploading ? '#94a3b8' : '#0f4ea9',
                  opacity: isUploading ? 0.6 : 1
                }}
              >
                {isUploading ? t('wizard.step1.uploading') || '⏳ Uploading...' : (
                  <>
                    <IconUpload style={{ width: '14px', height: '14px' }} />
                    {t('wizard.step1.upload')}
                  </>
                )}
              </button>
              {uploadError && (
                <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>
                  {uploadError}
                </div>
              )}
            </div>
            <input 
              ref={uploadRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
          </div>
        </div>

        {/* Agreements Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">{t('wizard.step1.agreements')} <span style={{ color: '#dc2626' }}>*</span></div>
          <div className="wizardChecks">
            <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" checked={data.acceptTerms || false} onChange={handleCheckboxChange('acceptTerms')} />
              {t('wizard.step1.acceptTerms')}
            </label>
            <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" checked={data.acceptPrivacy || false} onChange={handleCheckboxChange('acceptPrivacy')} />
              {t('wizard.step1.acceptPrivacy')}
            </label>
            <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" checked={data.consentElectronic || false} onChange={handleCheckboxChange('consentElectronic')} />
              {t('wizard.step1.consentElectronic')}
            </label>
            <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input type="checkbox" checked={data.certifyAccurate || false} onChange={handleCheckboxChange('certifyAccurate')} />
              {t('wizard.step1.certifyAccurate')}
            </label>
          </div>
          {agreementsError && <div className="field-error">⚠️ {agreementsError}</div>}
        </div>
      </div>
    </div>
  )
}

export default WizardStep1