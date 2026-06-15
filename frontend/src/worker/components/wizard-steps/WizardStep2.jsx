// src/worker/components/wizard-steps/WizardStep2.jsx
import { SelectField } from '../../../common/components/TextField'
import { IconSupport } from '../../../common/components/Icons'

export function WizardStep2({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setEmergencyMedicalFlags = (flags) => handleChange('emergencyMedicalFlags', flags)
  const setEmergencyMedicalInfo = (value) => handleChange('emergencyMedicalInfo', value)

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">Emergency Medical Information</div>
          <div className="wizardSubtitle" style={{ marginTop: 8 }}>
            Optional information to assist emergency responders
          </div>

          <div className="wizardGrid2" style={{ marginTop: 12 }}>
            <SelectField label="Blood Group" icon={<IconSupport />} value={data.bloodGroup || ''} onChange={(v) => handleChange('bloodGroup', v)}>
              <option value="" disabled>Select blood group</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </SelectField>
          </div>

          <div style={{ marginTop: 16 }}>
            Do you have emergency medical information first aid personnel or emergency responders should know?
          </div>

          <div className="wizardChecks" style={{ marginTop: 12 }}>
            <label className="wizardCheck">
              <input
                type="radio"
                name="emergencyMedicalInfo"
                checked={data.emergencyMedicalInfo === 'none'}
                onChange={() => setEmergencyMedicalInfo('none')}
              />
              No emergency medical information
            </label>
            <label className="wizardCheck">
              <input
                type="radio"
                name="emergencyMedicalInfo"
                checked={data.emergencyMedicalInfo === 'disclosure'}
                onChange={() => setEmergencyMedicalInfo('disclosure')}
              />
              Yes, voluntary disclosure
            </label>
            <label className="wizardCheck">
              <input
                type="radio"
                name="emergencyMedicalInfo"
                checked={data.emergencyMedicalInfo === 'skip'}
                onChange={() => setEmergencyMedicalInfo('skip')}
              />
              Skip for now
            </label>
          </div>

          {data.emergencyMedicalInfo === 'disclosure' ? (
            <div style={{ marginTop: 16 }}>
              <div className="wizardGrid2 wizardGrid2Tight">
                {[
                  'Severe allergy',
                  'Diabetes / blood sugar risk',
                  'Heart condition / device',
                  'Mobility / communication limitation',
                  'Asthma / respiratory risk',
                  'Seizure condition',
                  'Bleeding risk',
                  'Emergency medication/device carried',
                ].map((k) => (
                  <label key={k} className="wizardCheck">
                    <input type="checkbox" checked={!!(data.emergencyMedicalFlags?.[k] || false)} onChange={toggleMapValue(k, setEmergencyMedicalFlags)} />
                    {k}
                  </label>
                ))}
              </div>

              <div style={{ marginTop: 12, fontWeight: 600 }}>Important Emergency Instructions</div>
              <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85 }}>
                Do not include genetic or highly sensitive medical details.
              </div>

              <div style={{ marginTop: 10 }}>
                <textarea
                  className="wizardTextArea"
                  value={data.emergencyInstructions || ''}
                  onChange={(e) => handleChange('emergencyInstructions', e.target.value)}
                  placeholder="Enter instructions (max 1000 characters)"
                  maxLength={1000}
                  rows={4}
                />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="wizardFooter">
        <button type="button" className="wizardPillBtn" onClick={onBack}>
          <span className="wizardPillBtnLabel">Back</span>
          <span className="wizardPillBtnIcon">←</span>
        </button>
        <div className="wizardFooterRight">
          <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext}>
            <span className="wizardPillBtnLabel">Next</span>
            <span className="wizardPillBtnIcon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}