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

// Lead/Foreman responsibilities (applies to both "Lead" and "Lead/Foreman")
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

// Metal Framing Skills (applies to Helper, Mechanic, Advanced Mechanic)
const METAL_FRAMING_SKILLS = [
  'Layout',
  'Shaft walls',
  'Partition types',
  'Rated assemblies',
  'Stud/track gauge',
  'Bulkheads/softits',
  'Backing/blocking',
  'High-wall framing',
  'MEP Coordination',
]

// Drywall Hanging Skills (applies to Helper, Mechanic, Advanced Mechanic)
const DRYWALL_HANGING_SKILLS = [
  'Walls',
  'Ceiling',
  'Fire-rated board',
  'Abuse board',
  'Shaft-wall board',
  'High walls',
  'Production hanging',
  'Lift work',
  'Blueprint reading',
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
      metalFramingSkills: {},
      drywallHangingSkills: {},
    })
  }

  const handleLevelChange = (value) => {
    const updates = {
      ...data,
      workerLevel: value,
    }

    // Reset responsibilities if not "Lead" or "Lead/Foreman"
    if (value !== 'Lead' && value !== 'Lead/Foreman') {
      updates.leadForemanResponsibilities = {}
    }

    // Reset metal framing skills if not Metal Framing trade or not Helper/Mechanic/Advanced Mechanic
    if (data.primaryTrade !== 'Metal Framing' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.metalFramingSkills = {}
    }

    // Reset drywall hanging skills if not Drywall Hanging trade or not Helper/Mechanic/Advanced Mechanic
    if (data.primaryTrade !== 'Drywall Hanging' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.drywallHangingSkills = {}
    }

    onChange(updates)
  }

  const handleResponsibilityToggle = (responsibility) => (e) => {
    const current = data.leadForemanResponsibilities || {}
    handleChange('leadForemanResponsibilities', {
      ...current,
      [responsibility]: e.target.checked,
    })
  }

  const handleMetalFramingSkillToggle = (skill) => (e) => {
    const current = data.metalFramingSkills || {}
    handleChange('metalFramingSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleDrywallHangingSkillToggle = (skill) => (e) => {
    const current = data.drywallHangingSkills || {}
    handleChange('drywallHangingSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const workerLevels = TRADE_LEVEL_MAP[data.primaryTrade] || []
  
  // Show responsibilities for both "Lead" AND "Lead/Foreman"
  const showLeadForemanSection = data.workerLevel === 'Lead' || data.workerLevel === 'Lead/Foreman'
  
  // Show Metal Framing skills when:
  // 1. Primary Trade is "Metal Framing"
  // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
  const showMetalFramingSection = 
    data.primaryTrade === 'Metal Framing' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

  // Show Drywall Hanging skills when:
  // 1. Primary Trade is "Drywall Hanging"
  // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
  const showDrywallHangingSection = 
    data.primaryTrade === 'Drywall Hanging' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

  // Get the level abbreviation for display
  const getLevelAbbreviation = (level) => {
    switch(level) {
      case 'Helper': return 'H'
      case 'Mechanic': return 'M'
      case 'Advanced Mechanic': return 'A'
      default: return ''
    }
  }

  // Get the legend title based on trade and level
  const getLegendTitle = (trade, level) => {
    const abbr = getLevelAbbreviation(level)
    return `${trade} (${abbr})`
  }

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

          {/* Metal Framing Skills - Legend Field Format */}
          {showMetalFramingSection && (
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
                marginLeft: '8px',
              }}>
                {getLegendTitle(data.primaryTrade, data.workerLevel)}
              </legend>

              <div style={{ 
                fontSize: '12px', 
                color: 'rgba(23, 38, 58, 0.5)', 
                marginBottom: 12,
                marginTop: 4,
                fontWeight: 500,
              }}>
                Skills
              </div>

              <div className="wizardGrid2" style={{ marginTop: 4 }}>
                {METAL_FRAMING_SKILLS.map((skill) => (
                  <label key={skill} className="wizardCheck">
                    <input
                      type="checkbox"
                      checked={!!(data.metalFramingSkills?.[skill] || false)}
                      onChange={handleMetalFramingSkillToggle(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {/* Drywall Hanging Skills - Legend Field Format */}
          {showDrywallHangingSection && (
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
                marginLeft: '8px',
              }}>
                {getLegendTitle(data.primaryTrade, data.workerLevel)}
              </legend>

              <div style={{ 
                fontSize: '12px', 
                color: 'rgba(23, 38, 58, 0.5)', 
                marginBottom: 12,
                marginTop: 4,
                fontWeight: 500,
              }}>
                Skills
              </div>

              <div className="wizardGrid2" style={{ marginTop: 4 }}>
                {DRYWALL_HANGING_SKILLS.map((skill) => (
                  <label key={skill} className="wizardCheck">
                    <input
                      type="checkbox"
                      checked={!!(data.drywallHangingSkills?.[skill] || false)}
                      onChange={handleDrywallHangingSkillToggle(skill)}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

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
                marginLeft: '8px',
              }}>
                {data.workerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
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