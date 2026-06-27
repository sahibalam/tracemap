// src/worker/components/wizard-steps/WizardStep9.jsx
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconSupport, IconPhone } from '../../../common/components/Icons'

export function WizardStep9({ data, onChange, onFinish, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setPolicyAcks = (acks) => handleChange('policyAcks', acks)

  const isValid = data.emergencyContactName && data.emergencyContactRelationship && data.emergencyContactPhone && data.signatureWorkerName && data.signatureDate

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
            {[
              'I understand project assignment is contingent on profile, compliance, and project-specific approval.',
              'I will provide accurate information and update certifications when they expire.',
              'I understand I may be removed from assignment or hidden from matching if safety or conduct issues arise.',
              'I will follow site safety, housekeeping, attendance, and reporting requirements.',
              'I consent to electronic records, signature, and communications through the app.',
            ].map((k) => (
              <label key={k} className="wizardCheck">
                <input type="checkbox" checked={!!(data.policyAcks?.[k] || false)} onChange={toggleMapValue(k, setPolicyAcks)} />
                {k}
              </label>
            ))}
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">3. Signature</div>
          <div className="wizardGrid3">
            <TextField
              placeholder="Worker full legal name"
              icon={<IconUser />}
              value={data.signatureWorkerName || ''}
              onChange={(v) => handleChange('signatureWorkerName', v)}
            />
            <TextField
              placeholder="Date"
              icon={<IconSupport />}
              value={data.signatureDate || ''}
              onChange={(v) => handleChange('signatureDate', v)}
            />
            <TextField
              placeholder="Signature / e-sign token"
              icon={<IconSupport />}
              value={data.signatureToken || ''}
              onChange={(v) => handleChange('signatureToken', v)}
            />
          </div>
        </div>
      </div>

      <div className="wizardFooter">
        <button type="button" className="wizardPillBtn" onClick={onBack}>
          <span className="wizardPillBtnLabel">Back</span>
          <span className="wizardPillBtnIcon">←</span>
        </button>
        <div className="wizardFooterRight">
          <button type="button" className="wizardPillBtn wizardPillBtnSuccess" onClick={onFinish} disabled={!isValid}>
            <span className="wizardPillBtnLabel">Finish</span>
            <span className="wizardPillBtnIcon">✓</span>
          </button>
        </div>
      </div>
    </div>
  )
}