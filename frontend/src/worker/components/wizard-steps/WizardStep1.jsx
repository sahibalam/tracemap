// // src/worker/components/wizard-steps/WizardStep1.jsx
// import { TextField, SelectField } from '../../../common/components/TextField'
// import { IconUser, IconMail, IconLock, IconPhone, IconLocation, IconSupport, IconGlobe } from '../../../common/components/Icons'

// export function WizardStep1({ data, onChange, onNext }) {
//   const handleChange = (field, value) => {
//     onChange({ ...data, [field]: value })
//   }

//   const setToggle = (setter) => (e) => setter(e.target.checked)

//   const isValid = data.emailAddress && data.mobilePhone && data.tempPassword && data.legalFirstName && data.legalLastName && data.dob && data.addressLine1 && data.city && data.stateCode && data.zip

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">1. Account Creation</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder="Email address" 
//               icon={<IconMail />} 
//               value={data.emailAddress || ''} 
//               onChange={(v) => handleChange('emailAddress', v)} 
//             />
//             <TextField 
//               placeholder="Mobile phone" 
//               icon={<IconPhone />} 
//               value={data.mobilePhone || ''} 
//               onChange={(v) => handleChange('mobilePhone', v)} 
//             />
//             <TextField
//               type="password"
//               placeholder="Enter Password"
//               icon={<IconLock />}
//               value={data.tempPassword || ''}
//               onChange={(v) => handleChange('tempPassword', v)}
//             />
//             <div className="wizardChecks">
//               <label className="wizardCheck">
//                 <input type="checkbox" />
//                 Enable biometric sign-in on supported devices
//               </label>
//               <label className="wizardCheck">
//                 <input type="checkbox" />
//                 Opt in to SMS job alerts
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">2. Identity & Contact</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder="Legal first name" 
//               icon={<IconUser />} 
//               value={data.legalFirstName || ''} 
//               onChange={(v) => handleChange('legalFirstName', v)} 
//             />
//             <TextField 
//               placeholder="Address line 1" 
//               icon={<IconLocation />} 
//               value={data.addressLine1 || ''} 
//               onChange={(v) => handleChange('addressLine1', v)} 
//             />
//             <TextField 
//               placeholder="Legal last name" 
//               icon={<IconUser />} 
//               value={data.legalLastName || ''} 
//               onChange={(v) => handleChange('legalLastName', v)} 
//             />
//             <TextField 
//               placeholder="Address line 2" 
//               icon={<IconLocation />} 
//               value={data.addressLine2 || ''} 
//               onChange={(v) => handleChange('addressLine2', v)} 
//             />
//             <TextField 
//               placeholder="Preferred / display name" 
//               icon={<IconUser />} 
//               value={data.displayName || ''} 
//               onChange={(v) => handleChange('displayName', v)} 
//             />
//             <div className="wizardGrid3">
//               <TextField 
//                 placeholder="City" 
//                 icon={<IconLocation />} 
//                 value={data.city || ''} 
//                 onChange={(v) => handleChange('city', v)} 
//               />
//               <TextField 
//                 placeholder="State" 
//                 icon={<IconLocation />} 
//                 value={data.stateCode || ''} 
//                 onChange={(v) => handleChange('stateCode', v)} 
//               />
//               <TextField 
//                 placeholder="ZIP" 
//                 icon={<IconLocation />} 
//                 value={data.zip || ''} 
//                 onChange={(v) => handleChange('zip', v)} 
//               />
//             </div>
//             <TextField 
//               placeholder="Date of birth (MM/DD/YYYY)" 
//               icon={<IconSupport />} 
//               value={data.dob || ''} 
//               onChange={(v) => handleChange('dob', v)} 
//             />
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">3. Public Profile Basics</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder="Profile photo upload reference" 
//               icon={<IconSupport />} 
//               value={data.profilePhotoRef || ''} 
//               onChange={(v) => handleChange('profilePhotoRef', v)} 
//             />
//             <TextField 
//               placeholder="Primary language" 
//               icon={<IconGlobe />} 
//               value={data.primaryLanguage || ''} 
//               onChange={(v) => handleChange('primaryLanguage', v)} 
//             />
//             <TextField 
//               placeholder="Additional languages" 
//               icon={<IconGlobe />} 
//               value={data.additionalLanguages || ''} 
//               onChange={(v) => handleChange('additionalLanguages', v)} 
//             />
//             <TextField
//               placeholder="Current city / market"
//               icon={<IconLocation />}
//               value={data.currentCityMarket || ''}
//               onChange={(v) => handleChange('currentCityMarket', v)}
//             />
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">4. Terms & Consent</div>
//           <div className="wizardChecks wizardChecks2">
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptTerms || false} onChange={setToggle((v) => handleChange('acceptTerms', v))} />
//               I accept the TradesMap Terms of Use
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptPrivacy || false} onChange={setToggle((v) => handleChange('acceptPrivacy', v))} />
//               I accept the Privacy Notice
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.consentElectronic || false} onChange={setToggle((v) => handleChange('consentElectronic', v))} />
//               I consent to electronic records and signatures
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.certifyAccurate || false} onChange={setToggle((v) => handleChange('certifyAccurate', v))} />
//               I certify the information entered is accurate
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="wizardFooter">
//         <button type="button" className="wizardPillBtn" disabled>
//           <span className="wizardPillBtnLabel">Back</span>
//           <span className="wizardPillBtnIcon">←</span>
//         </button>
//         <div className="wizardFooterRight">
//           <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext} disabled={!isValid}>
//             <span className="wizardPillBtnLabel">Next</span>
//             <span className="wizardPillBtnIcon">→</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }




// // src/worker/components/wizard-steps/WizardStep1.jsx
// import { useState, useRef } from 'react'
// import { TextField, SelectField } from '../../../common/components/TextField'
// import { IconUser, IconMail, IconLock, IconPhone, IconLocation, IconSupport, IconGlobe, IconCamera, IconUpload } from '../../../common/components/Icons'

// export function WizardStep1({ data, onChange, onNext }) {
//   const [profilePreview, setProfilePreview] = useState(data.profilePreview || '')
//   const [profileImage, setProfileImage] = useState(null)
  
//   // Refs for file inputs
//   const uploadRef = useRef(null)
//   const cameraRef = useRef(null)
  
//   // Detect if device is mobile
//   const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

//   const handleChange = (field, value) => {
//     onChange({ ...data, [field]: value })
//   }

//   const setToggle = (setter) => (e) => setter(e.target.checked)

//   // Handle profile image upload from gallery
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setProfileImage(file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setProfilePreview(reader.result)
//         handleChange('profilePreview', reader.result)
//         handleChange('profileImage', file)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   // Handle camera click
//   const handleCameraClick = async () => {
//     if (isMobile) {
//       cameraRef.current?.click()
//     } else {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true })
//         const video = document.createElement('video')
//         video.srcObject = stream
//         video.play()
//         const canvas = document.createElement('canvas')
//         const ctx = canvas.getContext('2d')
//         setTimeout(() => {
//           canvas.width = video.videoWidth
//           canvas.height = video.videoHeight
//           ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
//           canvas.toBlob((blob) => {
//             const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' })
//             setProfileImage(file)
//             const reader = new FileReader()
//             reader.onloadend = () => {
//               setProfilePreview(reader.result)
//               handleChange('profilePreview', reader.result)
//               handleChange('profileImage', file)
//             }
//             reader.readAsDataURL(file)
//           }, 'image/jpeg', 0.8)
//           stream.getTracks().forEach(track => track.stop())
//         }, 500)
//       } catch (err) {
//         console.error('Camera error:', err)
//         alert('Unable to access camera. Please check permissions.')
//       }
//     }
//   }

//   const isValid = data.emailAddress && data.mobilePhone && data.tempPassword && data.legalFirstName && data.legalLastName && data.dob && data.city && data.stateCode && data.zip

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">1. Account Creation</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder="Email address" 
//               icon={<IconMail />} 
//               value={data.emailAddress || ''} 
//               onChange={(v) => handleChange('emailAddress', v)} 
//             />
//             <TextField 
//               placeholder="Mobile phone" 
//               icon={<IconPhone />} 
//               value={data.mobilePhone || ''} 
//               onChange={(v) => handleChange('mobilePhone', v)} 
//             />
//             <TextField
//               type="password"
//               placeholder="Enter Password"
//               icon={<IconLock />}
//               value={data.tempPassword || ''}
//               onChange={(v) => handleChange('tempPassword', v)}
//             />
//             <div className="wizardChecks">
//               <label className="wizardCheck">
//                 <input type="checkbox" />
//                 Enable biometric sign-in on supported devices
//               </label>
//               <label className="wizardCheck">
//                 <input type="checkbox" />
//                 Opt in to SMS job alerts
//               </label>
//             </div>
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">2. Identity & Contact</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder="Legal first name" 
//               icon={<IconUser />} 
//               value={data.legalFirstName || ''} 
//               onChange={(v) => handleChange('legalFirstName', v)} 
//             />
//             <TextField 
//               placeholder="Address line 1" 
//               icon={<IconLocation />} 
//               value={data.addressLine1 || ''} 
//               onChange={(v) => handleChange('addressLine1', v)} 
//             />
//             <TextField 
//               placeholder="Legal last name" 
//               icon={<IconUser />} 
//               value={data.legalLastName || ''} 
//               onChange={(v) => handleChange('legalLastName', v)} 
//             />
//             <TextField 
//               placeholder="Address line 2" 
//               icon={<IconLocation />} 
//               value={data.addressLine2 || ''} 
//               onChange={(v) => handleChange('addressLine2', v)} 
//             />
//             <TextField 
//               placeholder="Preferred / display name" 
//               icon={<IconUser />} 
//               value={data.displayName || ''} 
//               onChange={(v) => handleChange('displayName', v)} 
//             />
//             <div className="wizardGrid3">
//               <TextField 
//                 placeholder="City" 
//                 icon={<IconLocation />} 
//                 value={data.city || ''} 
//                 onChange={(v) => handleChange('city', v)} 
//               />
//               <TextField 
//                 placeholder="State" 
//                 icon={<IconLocation />} 
//                 value={data.stateCode || ''} 
//                 onChange={(v) => handleChange('stateCode', v)} 
//               />
//               <TextField 
//                 placeholder="ZIP" 
//                 icon={<IconLocation />} 
//                 value={data.zip || ''} 
//                 onChange={(v) => handleChange('zip', v)} 
//               />
//             </div>
//             <TextField 
//               placeholder="Date of birth (MM/DD/YYYY)" 
//               icon={<IconSupport />} 
//               value={data.dob || ''} 
//               onChange={(v) => handleChange('dob', v)} 
//             />
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">3. Public Profile Basics</div>
          
//           {/* Profile Photo Upload Section */}
//           <div style={{ marginBottom: '16px' }}>
//             <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
//               {/* Profile Image Preview */}
//               <div style={{ 
//                 width: '80px', 
//                 height: '80px', 
//                 borderRadius: '50%', 
//                 background: 'rgba(15,78,169,0.1)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 overflow: 'hidden',
//                 border: '2px solid rgba(15,78,169,0.2)'
//               }}>
//                 {profilePreview ? (
//                   <img src={profilePreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//                 ) : (
//                   <IconUser style={{ width: '40px', height: '40px', color: 'rgba(15,78,169,0.5)' }} />
//                 )}
//               </div>
              
//               {/* Buttons */}
//               <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
//                 {/* Upload Button */}
//                 <button
//                   type="button"
//                   onClick={() => uploadRef.current?.click()}
//                   style={{ 
//                     display: 'inline-flex', 
//                     alignItems: 'center', 
//                     gap: '6px',
//                     padding: '8px 16px',
//                     background: 'rgba(15,78,169,0.1)',
//                     borderRadius: '25px',
//                     cursor: 'pointer',
//                     fontSize: '13px',
//                     fontWeight: '600',
//                     border: 'none'
//                   }}
//                 >
//                   <IconUpload style={{ width: '14px', height: '14px' }} />
//                   Upload Photo
//                 </button>
//                 <input 
//                   ref={uploadRef}
//                   type="file" 
//                   accept="image/*" 
//                   onChange={handleFileUpload} 
//                   style={{ display: 'none' }} 
//                 />
                
//                 {/* Camera/Webcam Button */}
//                 <button
//                   type="button"
//                   onClick={handleCameraClick}
//                   style={{ 
//                     display: 'inline-flex', 
//                     alignItems: 'center', 
//                     gap: '6px',
//                     padding: '8px 16px',
//                     background: 'rgba(15,78,169,0.1)',
//                     borderRadius: '25px',
//                     cursor: 'pointer',
//                     fontSize: '13px',
//                     fontWeight: '600',
//                     border: 'none'
//                   }}
//                 >
//                   <IconCamera style={{ width: '14px', height: '14px' }} />
//                   {isMobile ? 'Take Photo' : 'Use Webcam'}
//                 </button>
//                 <input 
//                   ref={cameraRef}
//                   type="file" 
//                   accept="image/*" 
//                   capture={isMobile ? 'environment' : undefined}
//                   onChange={handleFileUpload} 
//                   style={{ display: 'none' }} 
//                 />
//               </div>
//             </div>
//             <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginTop: '8px' }}>
//               Upload a profile photo or take a photo using your camera
//             </div>
//           </div>

//           <div className="wizardGrid2">
//             <TextField 
//               placeholder="Primary language" 
//               icon={<IconGlobe />} 
//               value={data.primaryLanguage || ''} 
//               onChange={(v) => handleChange('primaryLanguage', v)} 
//             />
//             <TextField 
//               placeholder="Additional languages" 
//               icon={<IconGlobe />} 
//               value={data.additionalLanguages || ''} 
//               onChange={(v) => handleChange('additionalLanguages', v)} 
//             />
//             <TextField
//               placeholder="Current city / market"
//               icon={<IconLocation />}
//               value={data.currentCityMarket || ''}
//               onChange={(v) => handleChange('currentCityMarket', v)}
//             />
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">4. Terms & Consent</div>
//           <div className="wizardChecks wizardChecks2">
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptTerms || false} onChange={setToggle((v) => handleChange('acceptTerms', v))} />
//               I accept the TradesMap Terms of Use
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptPrivacy || false} onChange={setToggle((v) => handleChange('acceptPrivacy', v))} />
//               I accept the Privacy Notice
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.consentElectronic || false} onChange={setToggle((v) => handleChange('consentElectronic', v))} />
//               I consent to electronic records and signatures
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.certifyAccurate || false} onChange={setToggle((v) => handleChange('certifyAccurate', v))} />
//               I certify the information entered is accurate
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="wizardFooter">
//         <button type="button" className="wizardPillBtn" disabled>
//           <span className="wizardPillBtnLabel">Back</span>
//           <span className="wizardPillBtnIcon">←</span>
//         </button>
//         <div className="wizardFooterRight">
//           <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext} disabled={!isValid}>
//             <span className="wizardPillBtnLabel">Next</span>
//             <span className="wizardPillBtnIcon">→</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // src/worker/components/wizard-steps/WizardStep1.jsx
// import { useState, useRef } from 'react'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconMail, IconPhone, IconLocation, IconUpload } from '../../../common/components/Icons'

// // IconSupport component
// function IconSupport(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
//     </svg>
//   )
// }

// export function WizardStep1({ data, onChange, onNext }) {
//   const [profilePreview, setProfilePreview] = useState(data.profilePreview || '')
//   const [profileImage, setProfileImage] = useState(null)
  
//   // Refs for file inputs
//   const uploadRef = useRef(null)
  
//   const handleChange = (field, value) => {
//     onChange({ ...data, [field]: value })
//   }

//   // Handle profile image upload
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       setProfileImage(file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         setProfilePreview(reader.result)
//         handleChange('profilePreview', reader.result)
//         handleChange('profileImage', file)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const isValid = data.emailAddress && data.mobilePhone && data.legalFirstName && data.legalLastName && data.dob && data.city && data.stateCode && data.zip

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         {/* Personal Information Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Personal Information</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder="First name" 
//               icon={<IconUser />} 
//               value={data.legalFirstName || ''} 
//               onChange={(v) => handleChange('legalFirstName', v)} 
//             />
//             <TextField 
//               placeholder="Last name" 
//               icon={<IconUser />} 
//               value={data.legalLastName || ''} 
//               onChange={(v) => handleChange('legalLastName', v)} 
//             />
//             <TextField 
//               placeholder="Email Address" 
//               icon={<IconMail />} 
//               value={data.emailAddress || ''} 
//               onChange={(v) => handleChange('emailAddress', v)} 
//             />
//             <TextField 
//               placeholder="Mobile number" 
//               icon={<IconPhone />} 
//               value={data.mobilePhone || ''} 
//               onChange={(v) => handleChange('mobilePhone', v)} 
//             />
//           </div>
//         </div>

//         {/* Address Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Address</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder="Address" 
//               icon={<IconLocation />} 
//               value={data.addressLine1 || ''} 
//               onChange={(v) => handleChange('addressLine1', v)} 
//             />
//             <div className="wizardGrid3" style={{ gridColumn: '1 / -1' }}>
//               <TextField 
//                 placeholder="City" 
//                 icon={<IconLocation />} 
//                 value={data.city || ''} 
//                 onChange={(v) => handleChange('city', v)} 
//               />
//               <TextField 
//                 placeholder="State" 
//                 icon={<IconLocation />} 
//                 value={data.stateCode || ''} 
//                 onChange={(v) => handleChange('stateCode', v)} 
//               />
//               <TextField 
//                 placeholder="Zip" 
//                 icon={<IconLocation />} 
//                 value={data.zip || ''} 
//                 onChange={(v) => handleChange('zip', v)} 
//               />
//             </div>
//           </div>
//         </div>

//         {/* Current Address Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Current Address</div>
//           <div className="wizardGrid2">
//             <TextField 
//               placeholder="Address" 
//               icon={<IconLocation />} 
//               value={data.currentAddressLine1 || ''} 
//               onChange={(v) => handleChange('currentAddressLine1', v)} 
//             />
//             <div className="wizardGrid3" style={{ gridColumn: '1 / -1' }}>
//               <TextField 
//                 placeholder="City" 
//                 icon={<IconLocation />} 
//                 value={data.currentCity || ''} 
//                 onChange={(v) => handleChange('currentCity', v)} 
//               />
//               <TextField 
//                 placeholder="State" 
//                 icon={<IconLocation />} 
//                 value={data.currentStateCode || ''} 
//                 onChange={(v) => handleChange('currentStateCode', v)} 
//               />
//               <TextField 
//                 placeholder="Zip" 
//                 icon={<IconLocation />} 
//                 value={data.currentZip || ''} 
//                 onChange={(v) => handleChange('currentZip', v)} 
//               />
//             </div>
//           </div>
//         </div>

//         {/* Details Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Details</div>
//           <div className="wizardGrid2">
//             <div>
//               <TextField 
//                 placeholder="Date of birth" 
//                 icon={<IconSupport />} 
//                 value={data.dob || ''} 
//                 onChange={(v) => handleChange('dob', v)} 
//               />
//               <div style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', marginTop: '4px' }}>
//                 MM-DD-YYYY
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Language(s) Known Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Language(s) Known</div>
//           <div className="wizardChecks" style={{ display: 'flex', gap: '20px' }}>
//             <label className="wizardCheck">
//               <input 
//                 type="radio" 
//                 name="primaryLanguage" 
//                 checked={data.primaryLanguage === 'English'} 
//                 onChange={() => handleChange('primaryLanguage', 'English')} 
//               />
//               English
//             </label>
//             <label className="wizardCheck">
//               <input 
//                 type="radio" 
//                 name="primaryLanguage" 
//                 checked={data.primaryLanguage === 'English+Spanish'} 
//                 onChange={() => handleChange('primaryLanguage', 'English+Spanish')} 
//               />
//               English+Spanish
//             </label>
//             <label className="wizardCheck">
//               <input 
//                 type="radio" 
//                 name="primaryLanguage" 
//                 checked={data.primaryLanguage === 'Spanish'} 
//                 onChange={() => handleChange('primaryLanguage', 'Spanish')} 
//               />
//               Spanish
//             </label>
//           </div>
//         </div>

//         {/* Profile Image Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Profile Image</div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
//             {/* Profile Image Preview */}
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
            
//             {/* Upload Button */}
//             <button
//               type="button"
//               onClick={() => uploadRef.current?.click()}
//               style={{ 
//                 display: 'inline-flex', 
//                 alignItems: 'center', 
//                 gap: '6px',
//                 padding: '8px 20px',
//                 background: 'rgba(15,78,169,0.1)',
//                 borderRadius: '25px',
//                 cursor: 'pointer',
//                 fontSize: '13px',
//                 fontWeight: '600',
//                 border: 'none'
//               }}
//             >
//               <IconUpload style={{ width: '14px', height: '14px' }} />
//               Upload
//             </button>
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
//           <div className="wizardSectionBar">Agreements</div>
//           <div className="wizardChecks">
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptTerms || false} onChange={(e) => handleChange('acceptTerms', e.target.checked)} />
//               I accept the bottomless terms of use
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.acceptPrivacy || false} onChange={(e) => handleChange('acceptPrivacy', e.target.checked)} />
//               I accept the privacy policy
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.consentElectronic || false} onChange={(e) => handleChange('consentElectronic', e.target.checked)} />
//               I consent to electronic records
//             </label>
//             <label className="wizardCheck">
//               <input type="checkbox" checked={data.certifyAccurate || false} onChange={(e) => handleChange('certifyAccurate', e.target.checked)} />
//               I confirm the information entered is accurate
//             </label>
//           </div>
//         </div>
//       </div>

//       <div className="wizardFooter">
//         <button type="button" className="wizardPillBtn" disabled>
//           <span className="wizardPillBtnLabel">Back</span>
//           <span className="wizardPillBtnIcon">←</span>
//         </button>
//         <div className="wizardFooterRight">
//           <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext} disabled={!isValid}>
//             <span className="wizardPillBtnLabel">Next</span>
//             <span className="wizardPillBtnIcon">→</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }// src/worker/components/wizard-steps/WizardStep1.jsx
import { useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconMail, IconPhone, IconLocation, IconUpload } from '../../../common/components/Icons'

// IconSupport component
function IconSupport(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
    </svg>
  )
}

export function WizardStep1({ data, onChange, onNext }) {
  const [profilePreview, setProfilePreview] = useState(data.profilePreview || '')
  const [profileImage, setProfileImage] = useState(null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  
  const uploadRef = useRef(null)
  const datePickerRef = useRef(null)
  
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setProfileImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setProfilePreview(reader.result)
        handleChange('profilePreview', reader.result)
        handleChange('profileImage', file)
      }
      reader.readAsDataURL(file)
    }
  }

  // Handle date change from react-datepicker
  const handleDateChange = (date) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      handleChange('dob', `${month}/${day}/${year}`)
    } else {
      handleChange('dob', '')
    }
    setIsDatePickerOpen(false)
  }

  // Parse date string to Date object for react-datepicker
  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
    }
    return null
  }

  const isValid = data.emailAddress && data.mobilePhone && data.legalFirstName && data.legalLastName && data.dob && data.city && data.stateCode && data.zip

  // Custom styles for date picker
  const datePickerStyles = `
    .custom-date-picker .react-datepicker__input-container input {
      width: 100%;
      height: 48px;
      padding: 0 16px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 12px;
      font-size: 14px;
      outline: none;
      background: white;
      color: #17263a;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .custom-date-picker .react-datepicker__input-container input:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .custom-date-picker .react-datepicker__input-container input:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .custom-date-picker .react-datepicker__input-container input::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }

    /* Calendar dropdown styling */
    .custom-date-picker .react-datepicker {
      font-family: inherit;
      border-radius: 16px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
      background: white;
      padding: 8px;
      overflow: hidden;
    }

    .custom-date-picker .react-datepicker__header {
      background: white;
      border-bottom: 1px solid rgba(18, 38, 63, 0.06);
      padding: 12px 0 8px 0;
      border-radius: 16px 16px 0 0;
    }

    .custom-date-picker .react-datepicker__current-month {
      color: #17263a;
      font-weight: 700;
      font-size: 15px;
      padding-bottom: 4px;
    }

    .custom-date-picker .react-datepicker__day-name {
      color: rgba(23, 38, 58, 0.5);
      font-weight: 600;
      font-size: 12px;
      width: 36px;
      margin: 2px;
    }

    .custom-date-picker .react-datepicker__day {
      width: 36px;
      height: 36px;
      line-height: 36px;
      margin: 2px;
      border-radius: 10px;
      font-size: 14px;
      color: #17263a;
      transition: all 0.15s ease;
      cursor: pointer;
    }

    .custom-date-picker .react-datepicker__day:hover {
      background: rgba(15, 78, 169, 0.08);
      border-radius: 10px;
    }

    .custom-date-picker .react-datepicker__day--selected {
      background: #0f4ea9 !important;
      color: white !important;
      border-radius: 10px;
      font-weight: 600;
    }

    .custom-date-picker .react-datepicker__day--selected:hover {
      background: #0b3f90 !important;
    }

    .custom-date-picker .react-datepicker__day--keyboard-selected {
      background: rgba(15, 78, 169, 0.15);
      border-radius: 10px;
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
      top: 14px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      transition: all 0.15s ease;
    }

    .custom-date-picker .react-datepicker__navigation:hover {
      background: rgba(15, 78, 169, 0.08);
    }

    .custom-date-picker .react-datepicker__navigation-icon::before {
      border-color: #17263a;
      border-width: 2px 2px 0 0;
      height: 8px;
      width: 8px;
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

    /* Month dropdown styling */
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

    /* Custom calendar icon in input */
    .date-picker-wrapper {
      position: relative;
    }

    .date-picker-wrapper .calendar-icon {
      position: absolute;
      right: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(23, 38, 58, 0.4);
      pointer-events: none;
      font-size: 18px;
      line-height: 1;
    }

    .date-picker-wrapper .react-datepicker__input-container input {
      padding-right: 44px !important;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
      .custom-date-picker .react-datepicker {
        width: 100% !important;
        max-width: 320px;
      }
      
      .custom-date-picker .react-datepicker__day {
        width: 32px;
        height: 32px;
        line-height: 32px;
        font-size: 13px;
      }
      
      .custom-date-picker .react-datepicker__day-name {
        width: 32px;
        font-size: 11px;
      }
    }
  `

  return (
    <div className="wizardStep">
      {/* Inject custom styles */}
      <style>{datePickerStyles}</style>
      
      <div className="wizardBody">
        {/* Personal Information Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Personal Information</div>
          <div className="wizardGrid2">
            <TextField 
              placeholder="First name" 
              icon={<IconUser />} 
              value={data.legalFirstName || ''} 
              onChange={(v) => handleChange('legalFirstName', v)} 
            />
            <TextField 
              placeholder="Last name" 
              icon={<IconUser />} 
              value={data.legalLastName || ''} 
              onChange={(v) => handleChange('legalLastName', v)} 
            />
            <TextField 
              placeholder="Email Address" 
              icon={<IconMail />} 
              value={data.emailAddress || ''} 
              onChange={(v) => handleChange('emailAddress', v)} 
            />
            <TextField 
              placeholder="Mobile number" 
              icon={<IconPhone />} 
              value={data.mobilePhone || ''} 
              onChange={(v) => handleChange('mobilePhone', v)} 
            />
          </div>
        </div>

        {/* Address + Current Address */}
        <div className="wizardSection">
          <div className="wizardGrid2">
            {/* Address */}
            <div>
              <div className="wizardSectionBar">Address</div>
              <TextField
                placeholder="Address"
                icon={<IconLocation />}
                value={data.addressLine1 || ''}
                onChange={(v) => handleChange('addressLine1', v)}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <TextField
                  placeholder="City"
                  icon={<IconLocation />}
                  value={data.city || ''}
                  onChange={(v) => handleChange('city', v)}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="State"
                  icon={<IconLocation />}
                  value={data.stateCode || ''}
                  onChange={(v) => handleChange('stateCode', v)}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="Zip"
                  icon={<IconLocation />}
                  value={data.zip || ''}
                  onChange={(v) => handleChange('zip', v)}
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            {/* Current Address */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div className="wizardSectionBar" style={{ marginBottom: 0 }}>
                  Current Address
                </div>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={data.sameAsAddress || false}
                    onChange={(e) => {
                      const checked = e.target.checked
                      onChange({
                        ...data,
                        sameAsAddress: checked,
                        currentAddressLine1: checked ? data.addressLine1 : '',
                        currentCity: checked ? data.city : '',
                        currentStateCode: checked ? data.stateCode : '',
                        currentZip: checked ? data.zip : '',
                      })
                    }}
                  />
                  Same as Address
                </label>
              </div>
              <TextField
                placeholder="Address"
                icon={<IconLocation />}
                value={data.currentAddressLine1 || ''}
                onChange={(v) => handleChange('currentAddressLine1', v)}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <TextField
                  placeholder="City"
                  icon={<IconLocation />}
                  value={data.currentCity || ''}
                  onChange={(v) => handleChange('currentCity', v)}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="State"
                  icon={<IconLocation />}
                  value={data.currentStateCode || ''}
                  onChange={(v) => handleChange('currentStateCode', v)}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="Zip"
                  icon={<IconLocation />}
                  value={data.currentZip || ''}
                  onChange={(v) => handleChange('currentZip', v)}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="wizardSection">
          <div className="wizardGrid2">
            {/* DOB - React DatePicker with Custom Styling */}
            <div>
              <div className="wizardSectionBar">Date of Birth</div>
              <div className="date-picker-wrapper custom-date-picker">
                <DatePicker
                  ref={datePickerRef}
                  selected={parseDate(data.dob)}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  maxDate={new Date()}
                  onCalendarOpen={() => setIsDatePickerOpen(true)}
                  onCalendarClose={() => setIsDatePickerOpen(false)}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  className="date-picker-input"
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
                <div style={{ 
                  fontSize: '11px', 
                  color: 'rgba(23,38,58,0.5)', 
                  marginTop: '4px',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>MM/DD/YYYY</span>
                  {data.dob && (
                    <span style={{ color: '#2fb463' }}>
                      ✓ {data.dob}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="wizardSectionBar">Language(s) Known</div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
                <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={data.english || false}
                    onChange={(e) => handleChange('english', e.target.checked)}
                  />
                  English
                </label>
                <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={data.englishSpanish || false}
                    onChange={(e) => handleChange('englishSpanish', e.target.checked)}
                  />
                  English+Spanish
                </label>
                <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={data.spanish || false}
                    onChange={(e) => handleChange('spanish', e.target.checked)}
                  />
                  Spanish
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Profile Image</div>
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
            
            <button
              type="button"
              onClick={() => uploadRef.current?.click()}
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '6px',
                padding: '8px 24px',
                background: 'rgba(15,78,169,0.1)',
                borderRadius: '25px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                border: 'none',
                color: '#0f4ea9'
              }}
            >
              <IconUpload style={{ width: '14px', height: '14px' }} />
              Upload
            </button>
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
          <div className="wizardSectionBar">Agreements</div>
          <div className="wizardChecks">
            <label className="wizardCheck">
              <input type="checkbox" checked={data.acceptTerms || false} onChange={(e) => handleChange('acceptTerms', e.target.checked)} />
              I accept the bottomless terms of use
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.acceptPrivacy || false} onChange={(e) => handleChange('acceptPrivacy', e.target.checked)} />
              I accept the privacy policy
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.consentElectronic || false} onChange={(e) => handleChange('consentElectronic', e.target.checked)} />
              I consent to electronic records
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.certifyAccurate || false} onChange={(e) => handleChange('certifyAccurate', e.target.checked)} />
              I confirm the information entered is accurate
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}