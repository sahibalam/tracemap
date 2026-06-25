// src/worker/components/wizard-steps/WizardStep2.jsx
import { SelectField, TextField } from '../../../common/components/TextField'

const TRADE_LEVEL_MAP = {
  'Metal Framing': [
    'Helper',
    'Mechanic',
    'Advanced Mechanic',
    'Lead/Foreman',
  ],
  'Drywall Hanging': [
    'Helper',
    'Mechanic',
    'Advanced Mechanic',
    'Lead/Foreman',
  ],
  'Taping/Finishing': [
    'Helper',
    'Mechanic',
    'Advanced Mechanic',
    'Lead/Foreman',
  ],
  'Acoustical Ceilings': [
    'Helper',
    'Mechanic',
    'Advanced Mechanic',
    'Lead/Foreman',
  ],
  'Interior Carpentry': [
    'Helper',
    'Mechanic',
    'Advanced Mechanic',
    'Lead/Foreman',
  ],
  'Helpers/Labourers': [
    'Helper',
    'Lead Helper',
  ],
  'Insulation': [
    'Helper',
    'Mechanic',
    'Lead',
  ],
  'Demolition/Punch/Final Clean': [
    'Helper',
    'Mechanic',
  ],
  'Leads/Foremen': [
    'Lead/Foreman',
  ],
}

// Lead/Foreman responsibilities
const LEAD_FOREMAN_RESPONSIBILITIES = [
  'Crew size managed',
  'Manpower planning',
  'Daily planning',
  'Daily enforcement',
  'Housekeeping enforcement',
  'Daily reporting',
  'Punch closeout',
  'Coordination with superintendent',
]

export function WizardStep2({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value,
    })
  }

  const handleTradeChange = (value) => {
    onChange({
      ...data,
      primaryTrade: value,
      workerLevel: '',
      leadForemanResponsibilities: {}, // Reset responsibilities when trade changes
    })
  }

  const handleLevelChange = (value) => {
    onChange({
      ...data,
      workerLevel: value,
      // Reset responsibilities if not Lead/Foreman
      leadForemanResponsibilities: value === 'Lead/Foreman' ? (data.leadForemanResponsibilities || {}) : {},
    })
  }

  const handleResponsibilityToggle = (responsibility) => (e) => {
    const current = data.leadForemanResponsibilities || {}
    handleChange('leadForemanResponsibilities', {
      ...current,
      [responsibility]: e.target.checked,
    })
  }

  const workerLevels = TRADE_LEVEL_MAP[data.primaryTrade] || []
  const showLeadForemanSection = data.workerLevel === 'Lead/Foreman'

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">Trade Profile & Skill Matrix</div>

          {/* Three fields in one row */}
          <div className="wizardGrid3" style={{ marginTop: 20 }}>
            {/* Primary Trade */}
            <SelectField
              label="Primary Trade"
              value={data.primaryTrade || ''}
              onChange={handleTradeChange}
            >
              <option value="">Select Trade</option>
              {Object.keys(TRADE_LEVEL_MAP).map((trade) => (
                <option key={trade} value={trade}>
                  {trade}
                </option>
              ))}
            </SelectField>

            {/* Worker Level */}
            <SelectField
              label="Worker Levels"
              value={data.workerLevel || ''}
              disabled={!data.primaryTrade}
              onChange={handleLevelChange}
            >
              <option value="">Select Worker Level</option>
              {workerLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </SelectField>

            {/* Year of Experience */}
            <TextField
              label="Year of Experience"
              type="number"
              min="0"
              value={data.yearOfExperience || ''}
              onChange={(value) => handleChange('yearOfExperience', value)}
              placeholder="Enter years"
            />
          </div>

          {/* Lead/Foreman Responsibilities - Auto-generated when Lead/Foreman is selected */}
          {showLeadForemanSection && (
            <div style={{ marginTop: 24, borderTop: '1px solid rgba(18,38,63,0.08)', paddingTop: 20 }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#17263a',
                marginBottom: 12
              }}>
                Lead/Foreman Responsibilities
              </div>
              <div className="wizardGrid2" style={{ marginTop: 8 }}>
                {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
                  <label key={responsibility} className="wizardCheck">
                    <input
                      type="checkbox"
                      checked={!!(data.leadForemanResponsibilities?.[responsibility] || false)}
                      onChange={handleResponsibilityToggle(responsibility)}
                    />
                    {responsibility}
                  </label>
                ))}
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
          <button
            type="button"
            className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext"
            onClick={onNext}
          >
            <span className="wizardPillBtnLabel">Next</span>
            <span className="wizardPillBtnIcon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}