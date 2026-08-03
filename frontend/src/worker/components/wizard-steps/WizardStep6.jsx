
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
//         {/* Emergency Contact Section */}
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

//         {/* Acknowledgments Section */}
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

//         {/* Status Messages */}
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

//       {/* ✅ Footer with Back and Finish buttons */}
//       <div className="wizardFooter" style={{
//         position: 'sticky',
//         bottom: 0,
//         zIndex: 10,
//         background: 'white',
//         padding: '12px 24px',
//         borderTop: '1px solid rgba(18, 38, 63, 0.06)',
//         boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginTop: '24px',
//         borderBottomLeftRadius: '12px',
//         borderBottomRightRadius: '12px',
//         flexWrap: 'wrap',
//         gap: '10px',
//       }}>
//         <button 
//           type="button" 
//           onClick={onBack}
//           style={{
//             padding: '8px 20px',
//             borderRadius: '8px',
//             background: 'transparent',
//             color: '#17263a',
//             border: '1px solid rgba(18, 38, 63, 0.12)',
//             cursor: 'pointer',
//             fontWeight: 500,
//             fontSize: '14px',
//             transition: 'all 0.2s',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <span>←</span> Back
//         </button>

//         <button 
//           type="button" 
//           onClick={handleFinish}
//           style={{
//             padding: '8px 24px',
//             borderRadius: '8px',
//             background: '#2fb463',
//             color: 'white',
//             border: 'none',
//             cursor: 'pointer',
//             fontWeight: 600,
//             fontSize: '14px',
//             transition: 'all 0.2s',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = '#259a52'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = '#2fb463'
//           }}
//         >
//           Finish <span>✓</span>
//         </button>
//       </div>

//       {/* CSS styles for error messages and responsiveness */}
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

//         /* ✅ Mobile Responsive Styles */
//         @media (max-width: 768px) {
//           .wizardStep .wizardBody {
//             padding: 12px !important;
//           }

//           /* Grid 3 columns - stack on mobile */
//           .wizardGrid3 {
//             grid-template-columns: 1fr !important;
//             gap: 12px !important;
//           }

//           /* TextField inputs - full width on mobile */
//           .wizardStep .wizardSection .fieldControl {
//             height: 38px !important;
//           }

//           .wizardStep .wizardSection .fieldInput {
//             font-size: 13px !important;
//           }

//           /* Emergency contact section header */
//           .wizardSectionBar {
//             font-size: 13px !important;
//           }

//           /* Acknowledgments checkboxes - stack on mobile */
//           .wizardChecks {
//             gap: 8px !important;
//           }

//           .wizardChecks label {
//             font-size: 13px !important;
//             padding: 6px 0 !important;
//           }

//           /* Status messages - full width on mobile */
//           .wizardStep .wizardSection + div[style*="margin-top: 16px"] {
//             margin-top: 12px !important;
//             padding: 10px 14px !important;
//             font-size: 12px !important;
//           }

//           /* Footer - stack on mobile */
//           .wizardFooter {
//             flex-direction: column !important;
//             gap: 10px !important;
//             padding: 12px 16px !important;
//             border-bottom-left-radius: 0 !important;
//             border-bottom-right-radius: 0 !important;
//           }

//           .wizardFooter button {
//             width: 100% !important;
//             justify-content: center !important;
//           }

//           /* Field error messages */
//           .field-error {
//             font-size: 10px !important;
//           }
//         }

//         @media (max-width: 480px) {
//           .wizardStep .wizardBody {
//             padding: 8px !important;
//           }

//           .wizardStep .wizardSection .fieldControl {
//             height: 34px !important;
//           }

//           .wizardStep .wizardSection .fieldInput {
//             font-size: 12px !important;
//           }

//           .wizardSectionBar {
//             font-size: 12px !important;
//           }

//           .wizardChecks label {
//             font-size: 12px !important;
//             padding: 4px 0 !important;
//           }

//           .wizardChecks label input {
//             width: 16px !important;
//             height: 16px !important;
//           }

//           .wizardStep .wizardSection + div[style*="margin-top: 16px"] {
//             padding: 8px 12px !important;
//             font-size: 11px !important;
//           }

//           /* Footer - more compact */
//           .wizardFooter {
//             padding: 10px 12px !important;
//           }

//           .wizardFooter button {
//             font-size: 13px !important;
//             padding: 10px 16px !important;
//           }

//           .field-error {
//             font-size: 9px !important;
//           }
//         }

//         /* Tablet optimization */
//         @media (min-width: 769px) and (max-width: 1024px) {
//           .wizardGrid3 {
//             grid-template-columns: 1fr 1fr !important;
//           }

//           .wizardGrid3 > div:last-child {
//             grid-column: span 2 !important;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default WizardStep6









// src/worker/components/wizard-steps/WizardStep6.jsx
import { useState } from 'react'
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
    <div className="wizardStep" style={{ touchAction: 'manipulation' }}>
      <div className="wizardBody" style={{ padding: '20px' }}>
        {/* Emergency Contact Section */}
        <div className="wizardSection" style={{ marginBottom: '24px' }}>
          <div className="wizardSectionBar" style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#17263a',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {t('wizard.step6.emergencyContact')} <span style={{ color: '#dc2626' }}>*</span>
          </div>
          <div className="wizardGrid3" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr 1fr', 
            gap: '16px'
          }}>
            <div>
              <TextField
                placeholder={t('wizard.step6.contactName')}
                icon={<IconUser />}
                value={data.emergencyContactName || ''}
                onChange={(v) => handleChange('emergencyContactName', v)}
                className={contactNameError ? 'field-error-input' : ''}
                style={{
                  height: '44px', // Touch-friendly height
                  fontSize: '16px', // Prevent iOS zoom
                }}
              />
              {contactNameError && <div className="field-error" style={{ 
                color: '#dc2626', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                ⚠️ {contactNameError}
              </div>}
            </div>
            <div>
              <TextField
                placeholder={t('wizard.step6.relationship')}
                icon={<IconSupport />}
                value={data.emergencyContactRelationship || ''}
                onChange={(v) => handleChange('emergencyContactRelationship', v)}
                className={relationshipError ? 'field-error-input' : ''}
                style={{
                  height: '44px', // Touch-friendly height
                  fontSize: '16px', // Prevent iOS zoom
                }}
              />
              {relationshipError && <div className="field-error" style={{ 
                color: '#dc2626', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                ⚠️ {relationshipError}
              </div>}
            </div>
            <div>
              <TextField
                placeholder={t('wizard.step6.phone')}
                icon={<IconPhone />}
                value={data.emergencyContactPhone || ''}
                onChange={(v) => handleChange('emergencyContactPhone', v)}
                className={phoneError ? 'field-error-input' : ''}
                style={{
                  height: '44px', // Touch-friendly height
                  fontSize: '16px', // Prevent iOS zoom
                }}
              />
              {phoneError && <div className="field-error" style={{ 
                color: '#dc2626', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                ⚠️ {phoneError}
              </div>}
            </div>
          </div>
        </div>

        {/* Acknowledgments Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar" style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#17263a',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {t('wizard.step6.acknowledgments')} <span style={{ color: '#dc2626' }}>*</span>
          </div>
          <div className="wizardChecks" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px'
          }}>
            {policyItems.map((itemKey) => (
              <label key={itemKey} className="wizardCheck" style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                cursor: 'pointer',
                padding: '10px 14px',
                minHeight: '44px',
                borderRadius: '8px',
                border: '1px solid rgba(18, 38, 63, 0.08)',
                background: 'white',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                userSelect: 'none',
                transition: 'all 0.2s ease',
                borderColor: data.policyAcks?.[itemKey] ? '#0f4ea9' : 'rgba(18, 38, 63, 0.08)',
                background: data.policyAcks?.[itemKey] ? 'rgba(15, 78, 169, 0.05)' : 'white'
              }}>
                <input 
                  type="checkbox" 
                  checked={!!(data.policyAcks?.[itemKey] || false)} 
                  onChange={togglePolicyAck(itemKey)}
                  style={{
                    width: '22px',
                    height: '22px',
                    minWidth: '22px',
                    cursor: 'pointer',
                    accentColor: '#0f4ea9',
                    touchAction: 'manipulation'
                  }}
                />
                <span style={{ fontSize: '14px', lineHeight: '1.4' }}>
                  {t(itemKey)}
                </span>
              </label>
            ))}
          </div>
          {acknowledgmentsError && <div className="field-error" style={{ 
            color: '#dc2626', 
            fontSize: '12px', 
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            ⚠️ {acknowledgmentsError}
          </div>}
        </div>

        {/* Status Messages */}
        {!isValid && (
          <div style={{
            marginTop: '20px',
            padding: '14px 18px',
            background: '#fef3c7',
            border: '1px solid #fcd34d',
            borderRadius: '8px',
            color: '#92400e',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minHeight: '48px'
          }}>
            ⚠️ {t('wizard.step6.completeFields')}
          </div>
        )}

        {isValid && Object.keys(data.policyAcks || {}).length === policyItems.length && (
          <div style={{
            marginTop: '20px',
            padding: '14px 18px',
            background: '#d1fae5',
            border: '1px solid #6ee7b7',
            borderRadius: '8px',
            color: '#065f46',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            minHeight: '48px'
          }}>
            ✅ {t('wizard.step6.allCompleted')}
          </div>
        )}
      </div>

      {/* ✅ Footer with Back and Finish buttons */}
      <div className="wizardFooter" style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        background: 'white',
        padding: '16px 20px',
        borderTop: '1px solid rgba(18, 38, 63, 0.06)',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '24px',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <button 
          type="button" 
          onClick={onBack}
          style={{
            padding: '12px 24px',
            minHeight: '48px',
            borderRadius: '8px',
            background: 'transparent',
            color: '#17263a',
            border: '1px solid rgba(18, 38, 63, 0.12)',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '16px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            flex: '1',
            minWidth: '120px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <span>←</span> Back
        </button>

        <button 
          type="button" 
          onClick={handleFinish}
          style={{
            padding: '12px 24px',
            minHeight: '48px',
            borderRadius: '8px',
            background: '#2fb463',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '16px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            flex: '1',
            minWidth: '120px',
            boxShadow: '0 2px 8px rgba(47, 180, 99, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#259a52'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#2fb463'
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.background = '#259a52'
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.background = '#2fb463'
          }}
        >
          Finish <span>✓</span>
        </button>
      </div>

      {/* CSS styles for error messages and responsiveness */}
      <style>{`
        /* Global touch optimizations */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        .field-error {
          color: #dc2626;
          font-size: 12px;
          margin-top: 4px;
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

        .error-text {
          color: #dc2626;
          font-size: 12px;
          margin-top: 4px;
        }

        /* Checkbox touch improvements */
        input[type="checkbox"] {
          touch-action: manipulation;
        }

        /* ✅ Mobile Responsive Styles */
        @media (max-width: 768px) {
          .wizardStep .wizardBody {
            padding: 16px !important;
          }

          /* Grid 3 columns - stack on mobile */
          .wizardGrid3 {
            grid-template-columns: 1fr !important;
            gap: 14px !important;
          }

          /* TextField inputs - full width on mobile */
          .wizardStep .wizardSection .fieldControl {
            height: 44px !important;
          }

          .wizardStep .wizardSection .fieldInput {
            font-size: 16px !important;
          }

          /* Emergency contact section header */
          .wizardSectionBar {
            font-size: 14px !important;
          }

          /* Acknowledgments checkboxes - stack on mobile */
          .wizardChecks {
            gap: 10px !important;
          }

          .wizardChecks label {
            font-size: 14px !important;
            padding: 10px 12px !important;
            min-height: 44px !important;
            width: 100% !important;
          }

          .wizardChecks label input {
            width: 22px !important;
            height: 22px !important;
            min-width: 22px !important;
          }

          /* Status messages - full width on mobile */
          .wizardStep .wizardSection + div[style*="margin-top: 20px"] {
            margin-top: 16px !important;
            padding: 12px 16px !important;
            font-size: 13px !important;
            min-height: 44px !important;
          }

          /* Footer - stack on mobile */
          .wizardFooter {
            flex-direction: column !important;
            gap: 12px !important;
            padding: 16px !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          }

          .wizardFooter button {
            width: 100% !important;
            min-height: 48px !important;
            font-size: 16px !important;
          }

          /* Field error messages */
          .field-error {
            font-size: 12px !important;
          }
        }

        @media (max-width: 480px) {
          .wizardStep .wizardBody {
            padding: 12px !important;
          }

          .wizardStep .wizardSection .fieldControl {
            height: 40px !important;
          }

          .wizardStep .wizardSection .fieldInput {
            font-size: 15px !important;
          }

          .wizardSectionBar {
            font-size: 13px !important;
          }

          .wizardChecks {
            gap: 8px !important;
          }

          .wizardChecks label {
            font-size: 13px !important;
            padding: 8px 10px !important;
            min-height: 40px !important;
          }

          .wizardChecks label input {
            width: 20px !important;
            height: 20px !important;
            min-width: 20px !important;
          }

          .wizardStep .wizardSection + div[style*="margin-top: 20px"] {
            padding: 10px 14px !important;
            font-size: 12px !important;
            min-height: 40px !important;
          }

          /* Footer - more compact */
          .wizardFooter {
            padding: 12px !important;
          }

          .wizardFooter button {
            font-size: 15px !important;
            padding: 12px 16px !important;
            min-height: 44px !important;
          }

          .field-error {
            font-size: 11px !important;
          }
        }

        @media (max-width: 380px) {
          .wizardStep .wizardBody {
            padding: 8px !important;
          }

          .wizardChecks label {
            font-size: 12px !important;
            padding: 6px 8px !important;
            min-height: 36px !important;
          }

          .wizardChecks label input {
            width: 18px !important;
            height: 18px !important;
            min-width: 18px !important;
          }

          .wizardStep .wizardSection .fieldControl {
            height: 36px !important;
          }

          .wizardStep .wizardSection .fieldInput {
            font-size: 14px !important;
          }

          .wizardStep .wizardSection + div[style*="margin-top: 20px"] {
            padding: 8px 12px !important;
            font-size: 11px !important;
            min-height: 36px !important;
          }

          .wizardFooter button {
            font-size: 14px !important;
            padding: 10px 14px !important;
            min-height: 40px !important;
          }
        }

        /* Tablet optimization */
        @media (min-width: 769px) and (max-width: 1024px) {
          .wizardGrid3 {
            grid-template-columns: 1fr 1fr !important;
          }

          .wizardGrid3 > div:last-child {
            grid-column: span 2 !important;
          }
        }

        /* Prevent zoom on input focus for iOS */
        @supports (-webkit-touch-callout: none) {
          input, select, textarea {
            font-size: 16px !important;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .wizardChecks label {
            background: #1a1a1a !important;
            border-color: rgba(255, 255, 255, 0.08) !important;
          }

          .wizardChecks label[style*="background: rgba(15, 78, 169, 0.05)"] {
            background: rgba(15, 78, 169, 0.15) !important;
          }

          .wizardChecks label span {
            color: #e5e7eb !important;
          }

          .wizardSectionBar {
            color: #e5e7eb !important;
          }

          .wizardFooter {
            background: #1a1a1a !important;
          }

          .wizardStep .wizardSection + div[style*="background: #fef3c7"] {
            background: #4a3a1a !important;
            border-color: #8a6a2a !important;
            color: #fcd34d !important;
          }

          .wizardStep .wizardSection + div[style*="background: #d1fae5"] {
            background: #0a3a2a !important;
            border-color: #2a7a5a !important;
            color: #6ee7b7 !important;
          }

          .field-error {
            color: #ef4444 !important;
          }

          .field-error-input {
            border-color: #ef4444 !important;
          }

          .field-error-input:focus {
            box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
          }
        }
      `}</style>
    </div>
  )
}

export default WizardStep6