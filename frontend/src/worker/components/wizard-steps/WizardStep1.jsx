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




// src/worker/components/wizard-steps/WizardStep1.jsx
import { useState, useRef } from 'react'
import { TextField, SelectField } from '../../../common/components/TextField'
import { IconUser, IconMail, IconLock, IconPhone, IconLocation, IconSupport, IconGlobe, IconCamera, IconUpload } from '../../../common/components/Icons'

export function WizardStep1({ data, onChange, onNext }) {
  const [profilePreview, setProfilePreview] = useState(data.profilePreview || '')
  const [profileImage, setProfileImage] = useState(null)
  
  // Refs for file inputs
  const uploadRef = useRef(null)
  const cameraRef = useRef(null)
  
  // Detect if device is mobile
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const setToggle = (setter) => (e) => setter(e.target.checked)

  // Handle profile image upload from gallery
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
              handleChange('profilePreview', reader.result)
              handleChange('profileImage', file)
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

  const isValid = data.emailAddress && data.mobilePhone && data.tempPassword && data.legalFirstName && data.legalLastName && data.dob && data.city && data.stateCode && data.zip

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">1. Account Creation</div>
          <div className="wizardGrid2">
            <TextField 
              placeholder="Email address" 
              icon={<IconMail />} 
              value={data.emailAddress || ''} 
              onChange={(v) => handleChange('emailAddress', v)} 
            />
            <TextField 
              placeholder="Mobile phone" 
              icon={<IconPhone />} 
              value={data.mobilePhone || ''} 
              onChange={(v) => handleChange('mobilePhone', v)} 
            />
            <TextField
              type="password"
              placeholder="Enter Password"
              icon={<IconLock />}
              value={data.tempPassword || ''}
              onChange={(v) => handleChange('tempPassword', v)}
            />
            <div className="wizardChecks">
              <label className="wizardCheck">
                <input type="checkbox" />
                Enable biometric sign-in on supported devices
              </label>
              <label className="wizardCheck">
                <input type="checkbox" />
                Opt in to SMS job alerts
              </label>
            </div>
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">2. Identity & Contact</div>
          <div className="wizardGrid2">
            <TextField 
              placeholder="Legal first name" 
              icon={<IconUser />} 
              value={data.legalFirstName || ''} 
              onChange={(v) => handleChange('legalFirstName', v)} 
            />
            <TextField 
              placeholder="Address line 1" 
              icon={<IconLocation />} 
              value={data.addressLine1 || ''} 
              onChange={(v) => handleChange('addressLine1', v)} 
            />
            <TextField 
              placeholder="Legal last name" 
              icon={<IconUser />} 
              value={data.legalLastName || ''} 
              onChange={(v) => handleChange('legalLastName', v)} 
            />
            <TextField 
              placeholder="Address line 2" 
              icon={<IconLocation />} 
              value={data.addressLine2 || ''} 
              onChange={(v) => handleChange('addressLine2', v)} 
            />
            <TextField 
              placeholder="Preferred / display name" 
              icon={<IconUser />} 
              value={data.displayName || ''} 
              onChange={(v) => handleChange('displayName', v)} 
            />
            <div className="wizardGrid3">
              <TextField 
                placeholder="City" 
                icon={<IconLocation />} 
                value={data.city || ''} 
                onChange={(v) => handleChange('city', v)} 
              />
              <TextField 
                placeholder="State" 
                icon={<IconLocation />} 
                value={data.stateCode || ''} 
                onChange={(v) => handleChange('stateCode', v)} 
              />
              <TextField 
                placeholder="ZIP" 
                icon={<IconLocation />} 
                value={data.zip || ''} 
                onChange={(v) => handleChange('zip', v)} 
              />
            </div>
            <TextField 
              placeholder="Date of birth (MM/DD/YYYY)" 
              icon={<IconSupport />} 
              value={data.dob || ''} 
              onChange={(v) => handleChange('dob', v)} 
            />
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">3. Public Profile Basics</div>
          
          {/* Profile Photo Upload Section */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
              {/* Profile Image Preview */}
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
              
              {/* Buttons */}
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {/* Upload Button */}
                <button
                  type="button"
                  onClick={() => uploadRef.current?.click()}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    padding: '8px 16px',
                    background: 'rgba(15,78,169,0.1)',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: 'none'
                  }}
                >
                  <IconUpload style={{ width: '14px', height: '14px' }} />
                  Upload Photo
                </button>
                <input 
                  ref={uploadRef}
                  type="file" 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  style={{ display: 'none' }} 
                />
                
                {/* Camera/Webcam Button */}
                <button
                  type="button"
                  onClick={handleCameraClick}
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '6px',
                    padding: '8px 16px',
                    background: 'rgba(15,78,169,0.1)',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: 'none'
                  }}
                >
                  <IconCamera style={{ width: '14px', height: '14px' }} />
                  {isMobile ? 'Take Photo' : 'Use Webcam'}
                </button>
                <input 
                  ref={cameraRef}
                  type="file" 
                  accept="image/*" 
                  capture={isMobile ? 'environment' : undefined}
                  onChange={handleFileUpload} 
                  style={{ display: 'none' }} 
                />
              </div>
            </div>
            <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginTop: '8px' }}>
              Upload a profile photo or take a photo using your camera
            </div>
          </div>

          <div className="wizardGrid2">
            <TextField 
              placeholder="Primary language" 
              icon={<IconGlobe />} 
              value={data.primaryLanguage || ''} 
              onChange={(v) => handleChange('primaryLanguage', v)} 
            />
            <TextField 
              placeholder="Additional languages" 
              icon={<IconGlobe />} 
              value={data.additionalLanguages || ''} 
              onChange={(v) => handleChange('additionalLanguages', v)} 
            />
            <TextField
              placeholder="Current city / market"
              icon={<IconLocation />}
              value={data.currentCityMarket || ''}
              onChange={(v) => handleChange('currentCityMarket', v)}
            />
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">4. Terms & Consent</div>
          <div className="wizardChecks wizardChecks2">
            <label className="wizardCheck">
              <input type="checkbox" checked={data.acceptTerms || false} onChange={setToggle((v) => handleChange('acceptTerms', v))} />
              I accept the TradesMap Terms of Use
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.acceptPrivacy || false} onChange={setToggle((v) => handleChange('acceptPrivacy', v))} />
              I accept the Privacy Notice
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.consentElectronic || false} onChange={setToggle((v) => handleChange('consentElectronic', v))} />
              I consent to electronic records and signatures
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.certifyAccurate || false} onChange={setToggle((v) => handleChange('certifyAccurate', v))} />
              I certify the information entered is accurate
            </label>
          </div>
        </div>
      </div>

      <div className="wizardFooter">
        <button type="button" className="wizardPillBtn" disabled>
          <span className="wizardPillBtnLabel">Back</span>
          <span className="wizardPillBtnIcon">←</span>
        </button>
        <div className="wizardFooterRight">
          <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext} disabled={!isValid}>
            <span className="wizardPillBtnLabel">Next</span>
            <span className="wizardPillBtnIcon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}