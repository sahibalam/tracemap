
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

  // ✅ Handle Finish button click with validation
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
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">{t('wizard.step6.emergencyContact')} <span style={{ color: '#dc2626' }}>*</span></div>
          <div className="wizardGrid3">
            <div>
              <TextField
                placeholder={t('wizard.step6.contactName')}
                icon={<IconUser />}
                value={data.emergencyContactName || ''}
                onChange={(v) => handleChange('emergencyContactName', v)}
                className={contactNameError ? 'field-error-input' : ''}
              />
              {contactNameError && <div className="field-error">⚠️ {contactNameError}</div>}
            </div>
            <div>
              <TextField
                placeholder={t('wizard.step6.relationship')}
                icon={<IconSupport />}
                value={data.emergencyContactRelationship || ''}
                onChange={(v) => handleChange('emergencyContactRelationship', v)}
                className={relationshipError ? 'field-error-input' : ''}
              />
              {relationshipError && <div className="field-error">⚠️ {relationshipError}</div>}
            </div>
            <div>
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

        <div className="wizardSection">
          <div className="wizardSectionBar">{t('wizard.step6.acknowledgments')} <span style={{ color: '#dc2626' }}>*</span></div>
          <div className="wizardChecks">
            {policyItems.map((itemKey) => (
              <label key={itemKey} className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input 
                  type="checkbox" 
                  checked={!!(data.policyAcks?.[itemKey] || false)} 
                  onChange={togglePolicyAck(itemKey)} 
                />
                {t(itemKey)}
              </label>
            ))}
          </div>
          {acknowledgmentsError && <div className="field-error">⚠️ {acknowledgmentsError}</div>}
        </div>

        {/* Error message if fields are incomplete */}
        {!isValid && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: '#fef3c7',
            border: '1px solid #fcd34d',
            borderRadius: '8px',
            color: '#92400e',
            fontSize: '13px',
          }}>
            ⚠️ {t('wizard.step6.completeFields')}
          </div>
        )}

        {isValid && Object.keys(data.policyAcks || {}).length === policyItems.length && (
          <div style={{
            marginTop: '16px',
            padding: '12px 16px',
            background: '#d1fae5',
            border: '1px solid #6ee7b7',
            borderRadius: '8px',
            color: '#065f46',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            ✅ {t('wizard.step6.allCompleted')}
          </div>
        )}
      </div>

      {/* Footer with Back and Finish buttons */}
      <div className="wizardFooter" style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        background: 'white',
        padding: '12px 24px',
        borderTop: '1px solid rgba(18, 38, 63, 0.06)',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '20px'
      }}>
        <button 
          type="button" 
          className="wizardPillBtn" 
          onClick={onBack}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            background: 'transparent',
            color: '#17263a',
            border: '1px solid rgba(18, 38, 63, 0.12)',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '14px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span>← {t('common.back') || 'Back'}</span>
        </button>

        <button 
          type="button" 
          className="wizardPillBtn wizardPillBtnSuccess" 
          onClick={handleFinish}
          style={{
            padding: '8px 24px',
            borderRadius: '8px',
            background: '#2fb463',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1a9e4f'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#2fb463'
          }}
        >
          <span>{t('common.finish') || 'Finish'}</span>
          <span>✓</span>
        </button>
      </div>

      {/* CSS styles for error messages */}
      <style>{`
        .field-error {
          color: #dc2626;
          font-size: 11px;
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

        .wizardCheck {
          display: flex !important;
          align-items: center !important;
          gap: 8px !important;
        }
      `}</style>
    </div>
  )
}

export default WizardStep6