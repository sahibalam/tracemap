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
      leadForemanResponsibilities: {},
    })
  }

  const handleLevelChange = (value) => {
    onChange({
      ...data,
      workerLevel: value,
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

          {/* Lead/Foreman Responsibilities - Legend Field Format */}
          {showLeadForemanSection && (
            <fieldset style={{
              marginTop: 24,
              padding: '16px 20px 20px 20px',
              border: '1px solid rgba(15, 78, 169, 0.2)',
              borderRadius: '12px',
              background: 'rgba(15, 78, 169, 0.03)',
              position: 'relative',
            }}>
              <legend style={{
                padding: '0 12px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#0f4ea9',
                background: 'white',
                borderRadius: '8px',
                padding: '0 12px',
                marginLeft: '8px',
              }}>
                Lead/Foreman Responsibilities
              </legend>

              <div className="wizardGrid2" style={{ marginTop: 4 }}>
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
            </fieldset>
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