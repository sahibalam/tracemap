// // src/worker/components/wizard-steps/WizardStep5.jsx
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconPhone } from '../../../common/components/Icons'

// export function WizardStep5({ data, onChange, onFinish, onBack }) {
//   const handleChange = (field, value) => {
//     onChange({ ...data, [field]: value })
//   }

//   const toggleMapValue = (key, setMap) => (e) => {
//     const current = data[key] || {}
//     setMap({ ...current, [key]: e.target.checked })
//   }

//   const setPolicyAcks = (acks) => handleChange('policyAcks', acks)

//   const isValid = data.emergencyContactName && data.emergencyContactRelationship && data.emergencyContactPhone

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">1. Emergency Contact</div>
//           <div className="wizardGrid3">
//             <TextField
//               placeholder="Contact name"
//               icon={<IconUser />}
//               value={data.emergencyContactName || ''}
//               onChange={(v) => handleChange('emergencyContactName', v)}
//             />
//             <TextField
//               placeholder="Relationship"
//               icon={<IconSupport />}
//               value={data.emergencyContactRelationship || ''}
//               onChange={(v) => handleChange('emergencyContactRelationship', v)}
//             />
//             <TextField
//               placeholder="Phone"
//               icon={<IconPhone />}
//               value={data.emergencyContactPhone || ''}
//               onChange={(v) => handleChange('emergencyContactPhone', v)}
//             />
//           </div>
//         </div>

//         <div className="wizardSection">
//           <div className="wizardSectionBar">2. Acknowledgments</div>
//           <div className="wizardChecks">
//             {[
//               'I understand project assignment is contingent on profile, compliance, and project-specific approval.',
//               'I will provide accurate information and update certifications when they expire.',
//               'I understand I may be removed from assignment or hidden from matching if safety or conduct issues arise.',
//               'I will follow site safety, housekeeping, attendance, and reporting requirements.',
//               'I consent to electronic records, signature, and communications through the app.',
//             ].map((k) => (
//               <label key={k} className="wizardCheck">
//                 <input type="checkbox" checked={!!(data.policyAcks?.[k] || false)} onChange={toggleMapValue(k, setPolicyAcks)} />
//                 {k}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* ❌ REMOVED: Section 3. Signature */}
//       </div>
//     </div>
//   )
// }


// src/worker/components/wizard-steps/WizardStep5.jsx
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconSupport, IconPhone } from '../../../common/components/Icons'

export function WizardStep5({ data, onChange, onFinish, onBack }) {
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
    'I understand project assignment is contingent on profile, compliance, and project-specific approval.',
    'I will provide accurate information and update certifications when they expire.',
    'I understand I may be removed from assignment or hidden from matching if safety or conduct issues arise.',
    'I will follow site safety, housekeeping, attendance, and reporting requirements.',
    'I consent to electronic records, signature, and communications through the app.',
  ]

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">1. Emergency Contact</div>
          <div className="wizardGrid3">
            <TextField
              placeholder="Contact name"
              icon={<IconUser />}
              value={data.emergencyContactName || ''}
              onChange={(v) => handleChange('emergencyContactName', v)}
            />
            <TextField
              placeholder="Relationship"
              icon={<IconSupport />}
              value={data.emergencyContactRelationship || ''}
              onChange={(v) => handleChange('emergencyContactRelationship', v)}
            />
            <TextField
              placeholder="Phone"
              icon={<IconPhone />}
              value={data.emergencyContactPhone || ''}
              onChange={(v) => handleChange('emergencyContactPhone', v)}
            />
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">2. Acknowledgments</div>
          <div className="wizardChecks">
            {policyItems.map((item) => (
              <label key={item} className="wizardCheck">
                <input 
                  type="checkbox" 
                  checked={!!(data.policyAcks?.[item] || false)} 
                  onChange={togglePolicyAck(item)} 
                />
                {item}
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
            ⚠️ Please fill in all emergency contact fields before proceeding.
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
            ✅ All fields completed! You're ready to finish.
          </div>
        )}
      </div>
    </div>
  )
}