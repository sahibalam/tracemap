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

// Skill Areas
const SKILL_AREAS = [
  'Layout',
  'Framing',
  'Hanging',
  'Taping',
  'Finishing',
  'Grid/Tile',
  'Trim/Carpentry',
  'Insulation',
  'Demolition',
  'Punch/Final Clean',
  'Lead/Supervision',
  'Blueprint Reading',
]

// Field Readiness
const FIELD_READINESS = [
  { key: 'blueprints', label: 'Can read blueprints / plans' },
  { key: 'lifts', label: 'Comfortable on lifts' },
  { key: 'occupied', label: 'Worked occupied spaces' },
  { key: 'nightShifts', label: 'Available for night shifts' },
  { key: 'travel', label: 'Available for travel' },
  { key: 'leadCrew', label: 'Can lead a crew' },
]

// Additional Skills/Tools
const ADDITIONAL_SKILLS = [
  'Scaffolding',
  'Lift Operation',
  'Welding',
  'Power Tools',
  'Hand Tools',
  'Safety Training',
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
    })
  }

  const handleSkillToggle = (skill) => (e) => {
    const current = data.skills || {}
    handleChange('skills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleFieldReadinessToggle = (key) => (e) => {
    const current = data.fieldReadiness || {}
    handleChange('fieldReadiness', {
      ...current,
      [key]: e.target.checked,
    })
  }

  const handleAdditionalSkillToggle = (skill) => (e) => {
    const current = data.additionalSkillsList || {}
    handleChange('additionalSkillsList', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const workerLevels = TRADE_LEVEL_MAP[data.primaryTrade] || []

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        {/* Trade Profile & Skill Matrix Section */}
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
              onChange={(value) => handleChange('workerLevel', value)}
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
        </div>

        {/* Skill Areas Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Skill Areas</div>
          <div className="wizardGrid3" style={{ marginTop: 12 }}>
            {SKILL_AREAS.map((skill) => (
              <label key={skill} className="wizardCheck">
                <input
                  type="checkbox"
                  checked={!!(data.skills?.[skill] || false)}
                  onChange={handleSkillToggle(skill)}
                />
                {skill}
              </label>
            ))}
          </div>
        </div>

        {/* Field Readiness Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Field Readiness</div>
          <div className="wizardGrid3" style={{ marginTop: 12 }}>
            {FIELD_READINESS.map(({ key, label }) => (
              <label key={key} className="wizardCheck">
                <input
                  type="checkbox"
                  checked={!!(data.fieldReadiness?.[key] || false)}
                  onChange={handleFieldReadinessToggle(key)}
                />
                {label}
              </label>
            ))}
          </div>
        </div>

        {/* Additional Skills / Tools Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Additional Skills / Tools</div>
          <div className="wizardGrid3" style={{ marginTop: 12 }}>
            {ADDITIONAL_SKILLS.map((skill) => (
              <label key={skill} className="wizardCheck">
                <input
                  type="checkbox"
                  checked={!!(data.additionalSkillsList?.[skill] || false)}
                  onChange={handleAdditionalSkillToggle(skill)}
                />
                {skill}
              </label>
            ))}
          </div>

          {/* Other skills input */}
          <div style={{ marginTop: 12 }}>
            <TextField
              placeholder="Other skills / tools / systems worked with"
              value={data.additionalSkills || ''}
              onChange={(value) => handleChange('additionalSkills', value)}
            />
          </div>
        </div>

        {/* Travel & Deployment Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Travel & Deployment</div>
          <div className="wizardGrid2" style={{ marginTop: 12 }}>
            <TextField
              placeholder="Travel radius (miles)"
              type="number"
              min="0"
              value={data.travelRadiusMiles || ''}
              onChange={(value) => handleChange('travelRadiusMiles', value)}
            />
            <TextField
              placeholder="Languages"
              value={data.languages || ''}
              onChange={(value) => handleChange('languages', value)}
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