// src/worker/components/wizard-steps/WizardStep4.jsx
import { TextField, SelectField } from '../../../common/components/TextField'
import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

export function WizardStep4({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setPayPrefs = (prefs) => handleChange('payPrefs', prefs)
  const setTravelPrefs = (prefs) => handleChange('travelPrefs', prefs)

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        {/* Hourly Rate Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Hourly Rate</div>
          <div style={{ maxWidth: '300px' }}>
            <TextField
              placeholder="$"
              icon={<IconSupport />}
              value={data.hourlyRate || ''}
              onChange={(v) => handleChange('hourlyRate', v)}
            />
          </div>
        </div>

        {/* Travel Radius Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Travel Radius</div>
          <div style={{ maxWidth: '300px' }}>
            <SelectField
              icon={<IconLocation />}
              value={data.travelRadius || ''}
              onChange={(v) => handleChange('travelRadius', v)}
            >
              <option value="">Select Radius</option>
              <option value="50">50 miles</option>
              <option value="75">75 miles</option>
              <option value="100">100 miles</option>
            </SelectField>
          </div>
        </div>

        {/* Availability Options */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Availability</div>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <label className="wizardCheck">
              <input
                type="checkbox"
                checked={!!(data.payPrefs?.overtime || false)}
                onChange={toggleMapValue('overtime', setPayPrefs)}
              />
              Open to overtime
            </label>
            <label className="wizardCheck">
              <input
                type="checkbox"
                checked={!!(data.payPrefs?.weekends || false)}
                onChange={toggleMapValue('weekends', setPayPrefs)}
              />
              Available on weekends
            </label>
          </div>
        </div>

        {/* Willingness to Travel Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Willingness to Travel</div>
          <div style={{ maxWidth: '300px' }}>
            <SelectField
              icon={<IconLocation />}
              value={data.willingToTravel || ''}
              onChange={(v) => {
                handleChange('willingToTravel', v)
                // Reset travel preferences if 'No' is selected
                if (v === 'no') {
                  handleChange('travelPrefs', {})
                }
              }}
            >
              <option value="">Select Option</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </SelectField>
          </div>

          {/* Travel Preferences - Only show if "Yes" is selected */}
          {data.willingToTravel === 'yes' && (
            <div style={{ 
              marginTop: 12,
              padding: '16px 20px',
              border: '1px solid rgba(15, 78, 169, 0.2)',
              borderRadius: '12px',
              background: 'rgba(15, 78, 169, 0.03)',
            }}>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: 500, 
                color: '#17263a',
                marginBottom: '10px'
              }}>
                Travel Preferences
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.housing || false)}
                    onChange={toggleMapValue('housing', setTravelPrefs)}
                  />
                  Needs housing for travel work
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.perDiem || false)}
                    onChange={toggleMapValue('perDiem', setTravelPrefs)}
                  />
                  Needs per diem
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.transportation || false)}
                    onChange={toggleMapValue('transportation', setTravelPrefs)}
                  />
                  Own transportation
                </label>
              </div>
            </div>
          )}
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