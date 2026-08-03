
// // src/worker/components/wizard-steps/WizardStep6.jsx
// import { useTranslation } from 'react-i18next'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconPhone } from '../../../common/components/Icons'

// export function WizardStep6({ data, onChange, onFinish, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ FIX: Handle change - only update specific field
//   const handleChange = (field, value) => {
//     onChange({ [field]: value })
//   }

//   // ✅ FIX: Toggle policy acks
//   const togglePolicyAck = (key) => (e) => {
//     const current = data.policyAcks || {}
//     onChange({
//       policyAcks: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//   }

//   const isValid = data.emergencyContactName && data.emergencyContactRelationship && data.emergencyContactPhone

//   const policyItems = [
//     'wizard.step6.policy1',
//     'wizard.step6.policy2',
//     'wizard.step6.policy3',
//     'wizard.step6.policy4',
//     'wizard.step6.policy5'
//   ]

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step6.emergencyContact')}</div>
//           <div className="wizardGrid3">
//             <TextField
//               placeholder={t('wizard.step6.contactName')}
//               icon={<IconUser />}
//               value={data.emergencyContactName || ''}
//               onChange={(v) => handleChange('emergencyContactName', v)}
//             />
//             <TextField
//               placeholder={t('wizard.step6.relationship')}
//               icon={<IconSupport />}
//               value={data.emergencyContactRelationship || ''}
//               onChange={(v) => handleChange('emergencyContactRelationship', v)}
//             />
//             <TextField
//               placeholder={t('wizard.step6.phone')}
//               icon={<IconPhone />}
//               value={data.emergencyContactPhone || ''}
//               onChange={(v) => handleChange('emergencyContactPhone', v)}
//             />
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step6.acknowledgments')}</div>
//           <div className="wizardChecks">
//             {policyItems.map((itemKey) => (
//               <label key={itemKey} className="wizardCheck">
//                 <input 
//                   type="checkbox" 
//                   checked={!!(data.policyAcks?.[itemKey] || false)} 
//                   onChange={togglePolicyAck(itemKey)} 
//                 />
//                 {t(itemKey)}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Optional: Add validation message */}
//         {!isValid && (
//           <div style={{
//             marginTop: '16px',
//             padding: '12px 16px',
//             background: '#fef3c7',
//             border: '1px solid #fcd34d',
//             borderRadius: '8px',
//             color: '#92400e',
//             fontSize: '13px',
//           }}>
//             ⚠️ {t('wizard.step6.completeFields')}
//           </div>
//         )}

//         {isValid && Object.keys(data.policyAcks || {}).length === policyItems.length && (
//           <div style={{
//             marginTop: '16px',
//             padding: '12px 16px',
//             background: '#d1fae5',
//             border: '1px solid #6ee7b7',
//             borderRadius: '8px',
//             color: '#065f46',
//             fontSize: '13px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}>
//             ✅ {t('wizard.step6.allCompleted')}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default WizardStep6





// // src/worker/components/wizard-steps/WizardStep6.jsx
// import { useTranslation } from 'react-i18next'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconPhone } from '../../../common/components/Icons'

// export function WizardStep6({ data, onChange, onFinish, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ FIX: Handle change - only update specific field
//   const handleChange = (field, value) => {
//     onChange({ [field]: value })
//   }

//   // ✅ FIX: Toggle policy acks
//   const togglePolicyAck = (key) => (e) => {
//     const current = data.policyAcks || {}
//     onChange({
//       policyAcks: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//   }

//   const isValid = data.emergencyContactName && data.emergencyContactRelationship && data.emergencyContactPhone

//   const policyItems = [
//     'wizard.step6.policy1',
//     'wizard.step6.policy2',
//     'wizard.step6.policy3',
//     'wizard.step6.policy4',
//     'wizard.step6.policy5'
//   ]

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step6.emergencyContact')}</div>
//           <div className="wizardGrid3">
//             <TextField
//               placeholder={t('wizard.step6.contactName')}
//               icon={<IconUser />}
//               value={data.emergencyContactName || ''}
//               onChange={(v) => handleChange('emergencyContactName', v)}
//             />
//             <TextField
//               placeholder={t('wizard.step6.relationship')}
//               icon={<IconSupport />}
//               value={data.emergencyContactRelationship || ''}
//               onChange={(v) => handleChange('emergencyContactRelationship', v)}
//             />
//             <TextField
//               placeholder={t('wizard.step6.phone')}
//               icon={<IconPhone />}
//               value={data.emergencyContactPhone || ''}
//               onChange={(v) => handleChange('emergencyContactPhone', v)}
//             />
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step6.acknowledgments')}</div>
//           <div className="wizardChecks">
//             {policyItems.map((itemKey) => (
//               <label key={itemKey} className="wizardCheck">
//                 <input 
//                   type="checkbox" 
//                   checked={!!(data.policyAcks?.[itemKey] || false)} 
//                   onChange={togglePolicyAck(itemKey)} 
//                 />
//                 {t(itemKey)}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Optional: Add validation message */}
//         {!isValid && (
//           <div style={{
//             marginTop: '16px',
//             padding: '12px 16px',
//             background: '#fef3c7',
//             border: '1px solid #fcd34d',
//             borderRadius: '8px',
//             color: '#92400e',
//             fontSize: '13px',
//           }}>
//             ⚠️ {t('wizard.step6.completeFields')}
//           </div>
//         )}

//         {isValid && Object.keys(data.policyAcks || {}).length === policyItems.length && (
//           <div style={{
//             marginTop: '16px',
//             padding: '12px 16px',
//             background: '#d1fae5',
//             border: '1px solid #6ee7b7',
//             borderRadius: '8px',
//             color: '#065f46',
//             fontSize: '13px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}>
//             ✅ {t('wizard.step6.allCompleted')}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default WizardStep6







// // src/worker/components/wizard-steps/WizardStep6.jsx
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconPhone } from '../../../common/components/Icons'

// export function WizardStep6({ data, onChange, onFinish, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ Validation error states
//   const [contactNameError, setContactNameError] = useState('')
//   const [relationshipError, setRelationshipError] = useState('')
//   const [phoneError, setPhoneError] = useState('')
//   const [acknowledgmentsError, setAcknowledgmentsError] = useState('')
  
//   // ✅ FIX: Handle change - only update specific field
//   const handleChange = (field, value) => {
//     onChange({ [field]: value })
//     // Clear error when field is updated
//     if (field === 'emergencyContactName') setContactNameError('')
//     if (field === 'emergencyContactRelationship') setRelationshipError('')
//     if (field === 'emergencyContactPhone') setPhoneError('')
//   }

//   // ✅ FIX: Toggle policy acks
//   const togglePolicyAck = (key) => (e) => {
//     const current = data.policyAcks || {}
//     onChange({
//       policyAcks: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//     // Clear acknowledgments error when any checkbox is toggled
//     setAcknowledgmentsError('')
//   }

//   // ✅ Validate all fields
//   const validateFields = () => {
//     let isValid = true

//     // Contact Name - Required
//     if (!data.emergencyContactName || data.emergencyContactName.trim() === '') {
//       setContactNameError('Contact name is required')
//       isValid = false
//     } else {
//       setContactNameError('')
//     }

//     // Relationship - Required
//     if (!data.emergencyContactRelationship || data.emergencyContactRelationship.trim() === '') {
//       setRelationshipError('Relationship is required')
//       isValid = false
//     } else {
//       setRelationshipError('')
//     }

//     // Phone Number - Required
//     if (!data.emergencyContactPhone || data.emergencyContactPhone.trim() === '') {
//       setPhoneError('Phone number is required')
//       isValid = false
//     } else {
//       setPhoneError('')
//     }

//     // Acknowledgments - Required (all must be checked)
//     const policyItems = [
//       'wizard.step6.policy1',
//       'wizard.step6.policy2',
//       'wizard.step6.policy3',
//       'wizard.step6.policy4',
//       'wizard.step6.policy5'
//     ]
//     const allChecked = policyItems.every(key => data.policyAcks?.[key] === true)
//     if (!allChecked) {
//       setAcknowledgmentsError('All acknowledgments must be accepted')
//       isValid = false
//     } else {
//       setAcknowledgmentsError('')
//     }

//     return isValid
//   }

//   // ✅ Handle Finish button click with validation - calls parent's onFinish
//   const handleFinish = () => {
//     const isValid = validateFields()
//     if (isValid && onFinish) {
//       onFinish()
//     } else {
//       // Scroll to first error
//       const firstError = document.querySelector('.field-error, .error-text')
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
//       }
//     }
//   }

//   const isValid = data.emergencyContactName && data.emergencyContactRelationship && data.emergencyContactPhone

//   const policyItems = [
//     'wizard.step6.policy1',
//     'wizard.step6.policy2',
//     'wizard.step6.policy3',
//     'wizard.step6.policy4',
//     'wizard.step6.policy5'
//   ]

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step6.emergencyContact')} <span style={{ color: '#dc2626' }}>*</span></div>
//           <div className="wizardGrid3">
//             <div>
//               <TextField
//                 placeholder={t('wizard.step6.contactName')}
//                 icon={<IconUser />}
//                 value={data.emergencyContactName || ''}
//                 onChange={(v) => handleChange('emergencyContactName', v)}
//                 className={contactNameError ? 'field-error-input' : ''}
//               />
//               {contactNameError && <div className="field-error">⚠️ {contactNameError}</div>}
//             </div>
//             <div>
//               <TextField
//                 placeholder={t('wizard.step6.relationship')}
//                 icon={<IconSupport />}
//                 value={data.emergencyContactRelationship || ''}
//                 onChange={(v) => handleChange('emergencyContactRelationship', v)}
//                 className={relationshipError ? 'field-error-input' : ''}
//               />
//               {relationshipError && <div className="field-error">⚠️ {relationshipError}</div>}
//             </div>
//             <div>
//               <TextField
//                 placeholder={t('wizard.step6.phone')}
//                 icon={<IconPhone />}
//                 value={data.emergencyContactPhone || ''}
//                 onChange={(v) => handleChange('emergencyContactPhone', v)}
//                 className={phoneError ? 'field-error-input' : ''}
//               />
//               {phoneError && <div className="field-error">⚠️ {phoneError}</div>}
//             </div>
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step6.acknowledgments')} <span style={{ color: '#dc2626' }}>*</span></div>
//           <div className="wizardChecks">
//             {policyItems.map((itemKey) => (
//               <label key={itemKey} className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                 <input 
//                   type="checkbox" 
//                   checked={!!(data.policyAcks?.[itemKey] || false)} 
//                   onChange={togglePolicyAck(itemKey)} 
//                 />
//                 {t(itemKey)}
//               </label>
//             ))}
//           </div>
//           {acknowledgmentsError && <div className="field-error">⚠️ {acknowledgmentsError}</div>}
//         </div>

//         {/* Error message if fields are incomplete */}
//         {!isValid && (
//           <div style={{
//             marginTop: '16px',
//             padding: '12px 16px',
//             background: '#fef3c7',
//             border: '1px solid #fcd34d',
//             borderRadius: '8px',
//             color: '#92400e',
//             fontSize: '13px',
//           }}>
//             ⚠️ {t('wizard.step6.completeFields')}
//           </div>
//         )}

//         {isValid && Object.keys(data.policyAcks || {}).length === policyItems.length && (
//           <div style={{
//             marginTop: '16px',
//             padding: '12px 16px',
//             background: '#d1fae5',
//             border: '1px solid #6ee7b7',
//             borderRadius: '8px',
//             color: '#065f46',
//             fontSize: '13px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}>
//             ✅ {t('wizard.step6.allCompleted')}
//           </div>
//         )}
//       </div>

//       {/* CSS styles for error messages */}
//       <style>{`
//         .field-error {
//           color: #dc2626;
//           font-size: 11px;
//           margin-top: 4px;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }

//         .field-error-input {
//           border-color: #dc2626 !important;
//         }

//         .field-error-input:focus {
//           border-color: #dc2626 !important;
//           box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
//         }

//         .error-text {
//           color: #dc2626;
//           font-size: 12px;
//           margin-top: 4px;
//         }

//         .wizardCheck {
//           display: flex !important;
//           align-items: center !important;
//           gap: 8px !important;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default WizardStep6












// src/worker/components/wizard-steps/WizardStep6.jsx
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconSupport, IconPhone } from '../../../common/components/Icons'

export function WizardStep6({ data, onChange, onFinish, onBack }) {
  const { t } = useTranslation()
  
  // ✅ Validation error states
  const [contactNameError, setContactNameError] = useState('')
  const [relationshipError, setRelationshipError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [acknowledgmentsError, setAcknowledgmentsError] = useState('')
  
  // ✅ Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // ✅ FIX: Handle change - only update specific field
  const handleChange = (field, value) => {
    onChange({ [field]: value })
    // Clear error when field is updated
    if (field === 'emergencyContactName') setContactNameError('')
    if (field === 'emergencyContactRelationship') setRelationshipError('')
    if (field === 'emergencyContactPhone') setPhoneError('')
  }

  // ✅ FIX: Toggle policy acks
  const togglePolicyAck = (key) => (e) => {
    const current = data.policyAcks || {}
    onChange({
      policyAcks: {
        ...current,
        [key]: e.target.checked
      }
    })
    // Clear acknowledgments error when any checkbox is toggled
    setAcknowledgmentsError('')
  }

  // ✅ Validate all fields
  const validateFields = () => {
    let isValid = true

    // Contact Name - Required
    if (!data.emergencyContactName || data.emergencyContactName.trim() === '') {
      setContactNameError('Contact name is required')
      isValid = false
    } else {
      setContactNameError('')
    }

    // Relationship - Required
    if (!data.emergencyContactRelationship || data.emergencyContactRelationship.trim() === '') {
      setRelationshipError('Relationship is required')
      isValid = false
    } else {
      setRelationshipError('')
    }

    // Phone Number - Required
    if (!data.emergencyContactPhone || data.emergencyContactPhone.trim() === '') {
      setPhoneError('Phone number is required')
      isValid = false
    } else {
      setPhoneError('')
    }

    // Acknowledgments - Required (all must be checked)
    const policyItems = [
      'wizard.step6.policy1',
      'wizard.step6.policy2',
      'wizard.step6.policy3',
      'wizard.step6.policy4',
      'wizard.step6.policy5'
    ]
    const allChecked = policyItems.every(key => data.policyAcks?.[key] === true)
    if (!allChecked) {
      setAcknowledgmentsError('All acknowledgments must be accepted')
      isValid = false
    } else {
      setAcknowledgmentsError('')
    }

    return isValid
  }

  // ✅ Handle Finish button click with validation - calls parent's onFinish
  const handleFinish = () => {
    const isValid = validateFields()
    if (isValid && onFinish) {
      onFinish()
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.field-error, .error-text')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const isValid = data.emergencyContactName && data.emergencyContactRelationship && data.emergencyContactPhone

  const policyItems = [
    'wizard.step6.policy1',
    'wizard.step6.policy2',
    'wizard.step6.policy3',
    'wizard.step6.policy4',
    'wizard.step6.policy5'
  ]

  return (
    <div className="wizardStep wizardStep6">
      <div className="wizardBody">
        {/* Emergency Contact Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">
            {t('wizard.step6.emergencyContact')} <span style={{ color: '#dc2626' }}>*</span>
          </div>
          
          {/* ✅ Responsive Grid - Stack on mobile, 3 columns on desktop */}
          <div className={`wizardGrid3 ${isMobile ? 'wizardGridMobile' : ''}`}>
            <div className="wizardFieldWrapper">
              <TextField
                placeholder={t('wizard.step6.contactName')}
                icon={<IconUser />}
                value={data.emergencyContactName || ''}
                onChange={(v) => handleChange('emergencyContactName', v)}
                className={contactNameError ? 'field-error-input' : ''}
              />
              {contactNameError && <div className="field-error">⚠️ {contactNameError}</div>}
            </div>
            <div className="wizardFieldWrapper">
              <TextField
                placeholder={t('wizard.step6.relationship')}
                icon={<IconSupport />}
                value={data.emergencyContactRelationship || ''}
                onChange={(v) => handleChange('emergencyContactRelationship', v)}
                className={relationshipError ? 'field-error-input' : ''}
              />
              {relationshipError && <div className="field-error">⚠️ {relationshipError}</div>}
            </div>
            <div className="wizardFieldWrapper">
              <TextField
                placeholder={t('wizard.step6.phone')}
                icon={<IconPhone />}
                value={data.emergencyContactPhone || ''}
                onChange={(v) => handleChange('emergencyContactPhone', v)}
                className={phoneError ? 'field-error-input' : ''}
              />
              {phoneError && <div className="field-error">⚠️ {phoneError}</div>}
            </div>
          </div>
        </div>

        {/* Acknowledgments Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">
            {t('wizard.step6.acknowledgments')} <span style={{ color: '#dc2626' }}>*</span>
          </div>
          
          {/* ✅ Responsive Checkboxes */}
          <div className={`wizardChecks ${isMobile ? 'wizardChecksMobile' : ''}`}>
            {policyItems.map((itemKey) => (
              <label key={itemKey} className="wizardCheck">
                <input 
                  type="checkbox" 
                  checked={!!(data.policyAcks?.[itemKey] || false)} 
                  onChange={togglePolicyAck(itemKey)} 
                />
                <span className="wizardCheckLabel">{t(itemKey)}</span>
              </label>
            ))}
          </div>
          {acknowledgmentsError && <div className="field-error">⚠️ {acknowledgmentsError}</div>}
        </div>

        {/* Status Messages */}
        {!isValid && (
          <div className="wizardStatusMessage wizardStatusWarning">
            ⚠️ {t('wizard.step6.completeFields')}
          </div>
        )}

        {isValid && Object.keys(data.policyAcks || {}).length === policyItems.length && (
          <div className="wizardStatusMessage wizardStatusSuccess">
            ✅ {t('wizard.step6.allCompleted')}
          </div>
        )}
      </div>

      {/* ✅ Comprehensive Mobile-First CSS */}
      <style>{`
        /* ============================================================
           BASE STYLES
           ============================================================ */
        .wizardStep6 {
          width: 100%;
          max-width: 100%;
          overflow-x: hidden;
        }

        .wizardStep6 .wizardBody {
          padding: 0;
          width: 100%;
        }

        /* Section spacing */
        .wizardStep6 .wizardSection {
          margin-bottom: 24px;
          width: 100%;
        }

        .wizardStep6 .wizardSection:last-child {
          margin-bottom: 0;
        }

        /* Section bar */
        .wizardStep6 .wizardSectionBar {
          font-size: 15px;
          font-weight: 600;
          color: #17263a;
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid rgba(15, 78, 169, 0.1);
        }

        /* ============================================================
           GRID LAYOUT - Desktop (3 columns)
           ============================================================ */
        .wizardStep6 .wizardGrid3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          width: 100%;
        }

        .wizardStep6 .wizardFieldWrapper {
          display: flex;
          flex-direction: column;
          width: 100%;
          min-width: 0; /* Prevents overflow */
        }

        /* ============================================================
           GRID LAYOUT - Mobile (1 column)
           ============================================================ */
        .wizardStep6 .wizardGridMobile {
          grid-template-columns: 1fr !important;
          gap: 12px !important;
        }

        .wizardStep6 .wizardGridMobile .wizardFieldWrapper {
          width: 100%;
        }

        /* ============================================================
           CHECKBOXES - Desktop
           ============================================================ */
        .wizardStep6 .wizardChecks {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
        }

        .wizardStep6 .wizardCheck {
          display: flex !important;
          align-items: flex-start !important;
          gap: 10px !important;
          padding: 8px 12px;
          border-radius: 8px;
          background: rgba(18, 38, 63, 0.02);
          transition: background 0.2s ease;
          cursor: pointer;
          width: 100%;
          min-height: 44px; /* Touch-friendly */
        }

        .wizardStep6 .wizardCheck:hover {
          background: rgba(15, 78, 169, 0.04);
        }

        .wizardStep6 .wizardCheck input[type="checkbox"] {
          flex-shrink: 0;
          width: 18px;
          height: 18px;
          margin-top: 2px;
          accent-color: #0f4ea9;
          cursor: pointer;
        }

        .wizardStep6 .wizardCheckLabel {
          font-size: 14px;
          line-height: 1.5;
          color: #17263a;
          word-break: break-word;
        }

        /* ============================================================
           CHECKBOXES - Mobile
           ============================================================ */
        .wizardStep6 .wizardChecksMobile {
          gap: 8px !important;
        }

        .wizardStep6 .wizardChecksMobile .wizardCheck {
          padding: 10px 12px !important;
          min-height: 48px !important;
        }

        .wizardStep6 .wizardChecksMobile .wizardCheck input[type="checkbox"] {
          width: 20px !important;
          height: 20px !important;
          margin-top: 1px !important;
        }

        .wizardStep6 .wizardChecksMobile .wizardCheckLabel {
          font-size: 13px !important;
          line-height: 1.4 !important;
        }

        /* ============================================================
           FIELD ERRORS
           ============================================================ */
        .wizardStep6 .field-error {
          color: #dc2626;
          font-size: 12px;
          margin-top: 4px;
          display: flex;
          align-items: center;
          gap: 4px;
          padding-left: 4px;
        }

        .wizardStep6 .field-error-input {
          border-color: #dc2626 !important;
        }

        .wizardStep6 .field-error-input:focus {
          border-color: #dc2626 !important;
          box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
        }

        .wizardStep6 .error-text {
          color: #dc2626;
          font-size: 12px;
          margin-top: 4px;
        }

        /* ============================================================
           STATUS MESSAGES
           ============================================================ */
        .wizardStep6 .wizardStatusMessage {
          margin-top: 16px;
          padding: 12px 16px;
          border-radius: 8px;
          font-size: 13px;
          line-height: 1.5;
          display: flex;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
        }

        .wizardStep6 .wizardStatusWarning {
          background: #fef3c7;
          border: 1px solid #fcd34d;
          color: #92400e;
        }

        .wizardStep6 .wizardStatusSuccess {
          background: #d1fae5;
          border: 1px solid #6ee7b7;
          color: #065f46;
        }

        /* ============================================================
           RESPONSIVE BREAKPOINTS
           ============================================================ */

        /* Tablets and small desktops */
        @media (max-width: 1024px) {
          .wizardStep6 .wizardGrid3 {
            gap: 14px;
          }
        }

        /* Mobile (max-width: 768px) */
        @media (max-width: 768px) {
          .wizardStep6 .wizardSection {
            margin-bottom: 20px;
          }

          .wizardStep6 .wizardSectionBar {
            font-size: 14px;
            margin-bottom: 10px;
            padding-bottom: 6px;
          }

          .wizardStep6 .wizardGrid3 {
            gap: 10px;
          }

          /* TextField should be full width on mobile */
          .wizardStep6 .wizardFieldWrapper .textFieldWrapper {
            width: 100% !important;
          }

          .wizardStep6 .wizardFieldWrapper input,
          .wizardStep6 .wizardFieldWrapper .textFieldInput {
            width: 100% !important;
            font-size: 16px !important; /* Prevents iOS zoom */
          }

          .wizardStep6 .field-error {
            font-size: 11px;
          }

          .wizardStep6 .wizardStatusMessage {
            font-size: 12px;
            padding: 10px 14px;
          }
        }

        /* Small mobile (max-width: 480px) */
        @media (max-width: 480px) {
          .wizardStep6 .wizardSection {
            margin-bottom: 16px;
          }

          .wizardStep6 .wizardSectionBar {
            font-size: 13px;
            margin-bottom: 8px;
          }

          .wizardStep6 .wizardGrid3 {
            gap: 8px;
          }

          .wizardStep6 .wizardCheck {
            padding: 8px 10px !important;
            min-height: 40px !important;
          }

          .wizardStep6 .wizardCheck input[type="checkbox"] {
            width: 18px !important;
            height: 18px !important;
          }

          .wizardStep6 .wizardCheckLabel {
            font-size: 12px !important;
          }

          .wizardStep6 .wizardStatusMessage {
            font-size: 11px;
            padding: 8px 12px;
          }
        }

        /* ============================================================
           TEXTFIELD OVERRIDES
           ============================================================ */
        .wizardStep6 .textFieldWrapper {
          width: 100%;
        }

        .wizardStep6 .textFieldWrapper .textFieldInput {
          width: 100%;
          padding: 10px 12px;
          font-size: 14px;
          border: 1px solid rgba(18, 38, 63, 0.12);
          border-radius: 8px;
          transition: border-color 0.2s, box-shadow 0.2s;
          background: white;
          min-height: 44px;
        }

        .wizardStep6 .textFieldWrapper .textFieldInput:focus {
          outline: none;
          border-color: #0f4ea9;
          box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.08);
        }

        .wizardStep6 .textFieldWrapper .textFieldInput::placeholder {
          color: rgba(23, 38, 58, 0.4);
        }

        /* Mobile text field adjustments */
        @media (max-width: 768px) {
          .wizardStep6 .textFieldWrapper .textFieldInput {
            font-size: 16px !important; /* Prevents iOS zoom */
            padding: 12px 14px !important;
            min-height: 48px !important;
          }
        }

        /* ============================================================
           SCROLLBAR STYLING
           ============================================================ */
        .wizardStep6 .wizardBody::-webkit-scrollbar {
          width: 4px;
        }

        .wizardStep6 .wizardBody::-webkit-scrollbar-track {
          background: rgba(18, 38, 63, 0.04);
          border-radius: 4px;
        }

        .wizardStep6 .wizardBody::-webkit-scrollbar-thumb {
          background: rgba(15, 78, 169, 0.2);
          border-radius: 4px;
        }

        .wizardStep6 .wizardBody::-webkit-scrollbar-thumb:hover {
          background: rgba(15, 78, 169, 0.3);
        }
      `}</style>
    </div>
  )
}

export default WizardStep6