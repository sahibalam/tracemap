
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
import { useTranslation } from 'react-i18next'
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconSupport, IconPhone } from '../../../common/components/Icons'

export function WizardStep6({ data, onChange, onFinish, onBack }) {
  const { t } = useTranslation()
  
  // ✅ FIX: Handle change - only update specific field
  const handleChange = (field, value) => {
    onChange({ [field]: value })
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
          <div className="wizardSectionBar">{t('wizard.step6.emergencyContact')}</div>
          <div className="wizardGrid3">
            <TextField
              placeholder={t('wizard.step6.contactName')}
              icon={<IconUser />}
              value={data.emergencyContactName || ''}
              onChange={(v) => handleChange('emergencyContactName', v)}
            />
            <TextField
              placeholder={t('wizard.step6.relationship')}
              icon={<IconSupport />}
              value={data.emergencyContactRelationship || ''}
              onChange={(v) => handleChange('emergencyContactRelationship', v)}
            />
            <TextField
              placeholder={t('wizard.step6.phone')}
              icon={<IconPhone />}
              value={data.emergencyContactPhone || ''}
              onChange={(v) => handleChange('emergencyContactPhone', v)}
            />
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">{t('wizard.step6.acknowledgments')}</div>
          <div className="wizardChecks">
            {policyItems.map((itemKey) => (
              <label key={itemKey} className="wizardCheck">
                <input 
                  type="checkbox" 
                  checked={!!(data.policyAcks?.[itemKey] || false)} 
                  onChange={togglePolicyAck(itemKey)} 
                />
                {t(itemKey)}
              </label>
            ))}
          </div>
        </div>

        {/* Optional: Add validation message */}
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
    </div>
  )
}

export default WizardStep6