// src/worker/components/wizard-steps/WizardStep6.jsx
import { TextField } from '../../../common/components/TextField'
import { IconSupport, IconLocation } from '../../../common/components/Icons'

export function WizardStep6({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setPayPrefs = (prefs) => handleChange('payPrefs', prefs)
  const setTravelPrefs = (prefs) => handleChange('travelPrefs', prefs)
  const setAvailability = (availability) => handleChange('availability', availability)

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">1. Start Date & Pay Structure</div>
          <div className="wizardGrid3">
            <TextField
              placeholder="Earliest start date"
              icon={<IconSupport />}
              value={data.earliestStartDate || ''}
              onChange={(v) => handleChange('earliestStartDate', v)}
            />
            <TextField
              placeholder="Hourly rate requested"
              icon={<IconSupport />}
              value={data.hourlyRateRequested || ''}
              onChange={(v) => handleChange('hourlyRateRequested', v)}
            />
            <TextField
              placeholder="Piecework basis / notes"
              icon={<IconSupport />}
              value={data.pieceworkNotes || ''}
              onChange={(v) => handleChange('pieceworkNotes', v)}
            />
          </div>

          <div className="wizardGrid5 wizardGrid5Tight">
            {['Hourly', 'Piecework', 'Both', 'Open to overtime', 'Available weekends'].map((k) => (
              <label key={k} className="wizardCheck">
                <input type="checkbox" checked={!!(data.payPrefs?.[k] || false)} onChange={toggleMapValue(k, setPayPrefs)} />
                {k}
              </label>
            ))}
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">2. Travel & Deployment</div>
          <div className="wizardGrid3">
            <TextField
              placeholder="Travel radius (mi)"
              icon={<IconSupport />}
              value={data.travelRadiusMiles || ''}
              onChange={(v) => handleChange('travelRadiusMiles', v)}
            />
            <TextField
              placeholder="Home market / city"
              icon={<IconLocation />}
              value={data.homeMarketCity || ''}
              onChange={(v) => handleChange('homeMarketCity', v)}
            />
            <TextField
              placeholder="States willing to work in"
              icon={<IconLocation />}
              value={data.statesWillingToWorkIn || ''}
              onChange={(v) => handleChange('statesWillingToWorkIn', v)}
            />
          </div>

          <div className="wizardGrid3 wizardGrid3Tight">
            {['Needs housing for travel work', 'Needs per diem', 'Own transportation'].map((k) => (
              <label key={k} className="wizardCheck">
                <input type="checkbox" checked={!!(data.travelPrefs?.[k] || false)} onChange={toggleMapValue(k, setTravelPrefs)} />
                {k}
              </label>
            ))}
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">3. Availability Calendar</div>
          <div className="wizardAvailability">
            {[
              ['Mon', 'mon'],
              ['Tue', 'tue'],
              ['Wed', 'wed'],
              ['Thu', 'thu'],
              ['Fri', 'fri'],
              ['Sat', 'sat'],
              ['Sun', 'sun'],
            ].map(([label, key]) => (
              <label key={key} className="wizardAvailabilityCell">
                <div className="wizardAvailabilityLabel">{label}</div>
                <input
                  className="wizardAvailabilityInput"
                  value={data.availability?.[key] || ''}
                  onChange={(e) => setAvailability({ ...data.availability, [key]: e.target.value })}
                  placeholder=""
                />
              </label>
            ))}
          </div>
          <div className="wizardAvailabilityHint">Enter start/end times if available. Leave blank if unavailable.</div>
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