// src/worker/components/wizard-steps/WizardStep4.jsx
import { TextField } from '../../../common/components/TextField'
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
        {/* Row 1: Hourly Rate + Availability */}
        <div className="wizardSection">
          <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
            {/* Hourly Rate */}
            <div>
              <div className="wizardSectionBar">Hourly Rate</div>
              <div style={{ maxWidth: '200px' }}>
                <TextField
                  placeholder="$$"
                  icon={<IconSupport />}
                  value={data.hourlyRate || ''}
                  onChange={(v) => handleChange('hourlyRate', v)}
                />
              </div>
            </div>

            {/* Availability */}
            <div>
              <div className="wizardSectionBar">Availability</div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
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
          </div>
        </div>

        {/* Row 2: Travel Radius + Willingness to Travel */}
        <div className="wizardSection">
          <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
            {/* Travel Radius */}
            <div>
              <div className="wizardSectionBar">Travel Radius</div>
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '4px' }}>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="travelRadius"
                    value="50"
                    checked={data.travelRadius === '50'}
                    onChange={() => handleChange('travelRadius', '50')}
                  />
                  50 miles
                </label>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="travelRadius"
                    value="75"
                    checked={data.travelRadius === '75'}
                    onChange={() => handleChange('travelRadius', '75')}
                  />
                  75 miles
                </label>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="travelRadius"
                    value="100"
                    checked={data.travelRadius === '100'}
                    onChange={() => handleChange('travelRadius', '100')}
                  />
                  100 miles
                </label>
              </div>
            </div>

            {/* Willingness to Travel */}
            <div>
              <div className="wizardSectionBar">Willingness to Travel</div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="yes"
                    checked={data.willingToTravel === 'yes'}
                    onChange={() => {
                      handleChange('willingToTravel', 'yes')
                    }}
                  />
                  Yes
                </label>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="no"
                    checked={data.willingToTravel === 'no'}
                    onChange={() => {
                      handleChange('willingToTravel', 'no')
                      // Reset travel preferences if 'No' is selected
                      handleChange('travelPrefs', {})
                    }}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Preferences - Only show if "Yes" is selected */}
        {data.willingToTravel === 'yes' && (
          <div className="wizardSection">
            <div style={{ 
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
          </div>
        )}
      </div>
    </div>
  )
}