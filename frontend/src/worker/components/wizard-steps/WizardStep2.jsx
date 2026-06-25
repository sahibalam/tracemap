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

// Taping/Finishing Skills (applies to Helper, Mechanic, Advanced Mechanic)
const TAPING_FINISHING_SKILLS = [
  'Level 1-5 finish',
  'Skim coat',
  'Texture match',
  'Punch repair',
  'Corner bead systems',
  'Smooth finish',
]

// Acoustical Ceilings Skills (applies to Helper, Mechanic, Advanced Mechanic)
const ACOUSTICAL_CEILINGS_SKILLS = [
  'Standard grid',
  'Tegular',
  'Specialty ceilings',
  'Clouds/baffles',
  'Seismic requirements',
  'Light/HVAC/sprinkler coordination',
]

// Interior Carpentry Skills (applies to Helper, Mechanic, Advanced Mechanic)
const INTERIOR_CARPENTRY_SKILLS = [
  'Backing',
  'Blocking',
  'Doors/frames/hardware support',
  'Trim/carpentry',
  'Finish carpentry',
]

// Helpers/Labourers Skills (applies to Helper, Lead Helper)
const HELPERS_LABOURERS_SKILLS = [
  'Material movement',
  'Trade Assistance',
  'Cleanup',
  'Preparation work',
]

// Insulation Skills (applies to Helper, Mechanic, Lead)
const INSULATION_SKILLS = [
  'Wall Insulation',
  'Bat Insulation',
  'Sound Insulation',
  'Specialty Insulation',
]

// Demolition/Punch/Final Clean Skills (applies to Helper, Mechanic)
const DEMOLITION_SKILLS = [
  'Demolition',
  'Removal Support',
  'Clean up',
  'Punch work',
  'Final clean',
  'Closeout Support',
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
      tapingFinishingSkills: {},
      acousticalCeilingsSkills: {},
      interiorCarpentrySkills: {},
      helpersLabourersSkills: {},
      insulationSkills: {},
      demolitionSkills: {},
    })
  }

  const handleSecondaryTradeChange = (value) => {
    onChange({
      ...data,
      secondaryTrade: value,
      secondaryWorkerLevel: '',
      secondaryLeadForemanResponsibilities: {},
      secondaryMetalFramingSkills: {},
      secondaryDrywallHangingSkills: {},
      secondaryTapingFinishingSkills: {},
      secondaryAcousticalCeilingsSkills: {},
      secondaryInteriorCarpentrySkills: {},
      secondaryHelpersLabourersSkills: {},
      secondaryInsulationSkills: {},
      secondaryDemolitionSkills: {},
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

    // Reset taping/finishing skills if not Taping/Finishing trade or not Helper/Mechanic/Advanced Mechanic
    if (data.primaryTrade !== 'Taping/Finishing' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.tapingFinishingSkills = {}
    }

    // Reset acoustical ceilings skills if not Acoustical Ceilings trade or not Helper/Mechanic/Advanced Mechanic
    if (data.primaryTrade !== 'Acoustical Ceilings' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.acousticalCeilingsSkills = {}
    }

    // Reset interior carpentry skills if not Interior Carpentry trade or not Helper/Mechanic/Advanced Mechanic
    if (data.primaryTrade !== 'Interior Carpentry' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.interiorCarpentrySkills = {}
    }

    // Reset helpers/labourers skills if not Helpers/Labourers trade or not Helper/Lead Helper
    if (data.primaryTrade !== 'Helpers/Labourers' || 
        (value !== 'Helper' && value !== 'Lead Helper')) {
      updates.helpersLabourersSkills = {}
    }

    // Reset insulation skills if not Insulation trade or not Helper/Mechanic/Lead
    if (data.primaryTrade !== 'Insulation' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Lead')) {
      updates.insulationSkills = {}
    }

    // Reset demolition skills if not Demolition/Punch/Final Clean trade or not Helper/Mechanic
    if (data.primaryTrade !== 'Demolition/Punch/Final Clean' || 
        (value !== 'Helper' && value !== 'Mechanic')) {
      updates.demolitionSkills = {}
    }

    onChange(updates)
  }

  const handleSecondaryLevelChange = (value) => {
    const updates = {
      ...data,
      secondaryWorkerLevel: value,
    }

    // Reset secondary responsibilities if not "Lead" or "Lead/Foreman"
    if (value !== 'Lead' && value !== 'Lead/Foreman') {
      updates.secondaryLeadForemanResponsibilities = {}
    }

    // Reset secondary metal framing skills if not Metal Framing trade or not Helper/Mechanic/Advanced Mechanic
    if (data.secondaryTrade !== 'Metal Framing' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.secondaryMetalFramingSkills = {}
    }

    // Reset secondary drywall hanging skills if not Drywall Hanging trade or not Helper/Mechanic/Advanced Mechanic
    if (data.secondaryTrade !== 'Drywall Hanging' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.secondaryDrywallHangingSkills = {}
    }

    // Reset secondary taping/finishing skills if not Taping/Finishing trade or not Helper/Mechanic/Advanced Mechanic
    if (data.secondaryTrade !== 'Taping/Finishing' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.secondaryTapingFinishingSkills = {}
    }

    // Reset secondary acoustical ceilings skills if not Acoustical Ceilings trade or not Helper/Mechanic/Advanced Mechanic
    if (data.secondaryTrade !== 'Acoustical Ceilings' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.secondaryAcousticalCeilingsSkills = {}
    }

    // Reset secondary interior carpentry skills if not Interior Carpentry trade or not Helper/Mechanic/Advanced Mechanic
    if (data.secondaryTrade !== 'Interior Carpentry' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
      updates.secondaryInteriorCarpentrySkills = {}
    }

    // Reset secondary helpers/labourers skills if not Helpers/Labourers trade or not Helper/Lead Helper
    if (data.secondaryTrade !== 'Helpers/Labourers' || 
        (value !== 'Helper' && value !== 'Lead Helper')) {
      updates.secondaryHelpersLabourersSkills = {}
    }

    // Reset secondary insulation skills if not Insulation trade or not Helper/Mechanic/Lead
    if (data.secondaryTrade !== 'Insulation' || 
        (value !== 'Helper' && value !== 'Mechanic' && value !== 'Lead')) {
      updates.secondaryInsulationSkills = {}
    }

    // Reset secondary demolition skills if not Demolition/Punch/Final Clean trade or not Helper/Mechanic
    if (data.secondaryTrade !== 'Demolition/Punch/Final Clean' || 
        (value !== 'Helper' && value !== 'Mechanic')) {
      updates.secondaryDemolitionSkills = {}
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

  const handleSecondaryResponsibilityToggle = (responsibility) => (e) => {
    const current = data.secondaryLeadForemanResponsibilities || {}
    handleChange('secondaryLeadForemanResponsibilities', {
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

  const handleSecondaryMetalFramingSkillToggle = (skill) => (e) => {
    const current = data.secondaryMetalFramingSkills || {}
    handleChange('secondaryMetalFramingSkills', {
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

  const handleSecondaryDrywallHangingSkillToggle = (skill) => (e) => {
    const current = data.secondaryDrywallHangingSkills || {}
    handleChange('secondaryDrywallHangingSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleTapingFinishingSkillToggle = (skill) => (e) => {
    const current = data.tapingFinishingSkills || {}
    handleChange('tapingFinishingSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleSecondaryTapingFinishingSkillToggle = (skill) => (e) => {
    const current = data.secondaryTapingFinishingSkills || {}
    handleChange('secondaryTapingFinishingSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleAcousticalCeilingsSkillToggle = (skill) => (e) => {
    const current = data.acousticalCeilingsSkills || {}
    handleChange('acousticalCeilingsSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleSecondaryAcousticalCeilingsSkillToggle = (skill) => (e) => {
    const current = data.secondaryAcousticalCeilingsSkills || {}
    handleChange('secondaryAcousticalCeilingsSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleInteriorCarpentrySkillToggle = (skill) => (e) => {
    const current = data.interiorCarpentrySkills || {}
    handleChange('interiorCarpentrySkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleSecondaryInteriorCarpentrySkillToggle = (skill) => (e) => {
    const current = data.secondaryInteriorCarpentrySkills || {}
    handleChange('secondaryInteriorCarpentrySkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleHelpersLabourersSkillToggle = (skill) => (e) => {
    const current = data.helpersLabourersSkills || {}
    handleChange('helpersLabourersSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleSecondaryHelpersLabourersSkillToggle = (skill) => (e) => {
    const current = data.secondaryHelpersLabourersSkills || {}
    handleChange('secondaryHelpersLabourersSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleInsulationSkillToggle = (skill) => (e) => {
    const current = data.insulationSkills || {}
    handleChange('insulationSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleSecondaryInsulationSkillToggle = (skill) => (e) => {
    const current = data.secondaryInsulationSkills || {}
    handleChange('secondaryInsulationSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleDemolitionSkillToggle = (skill) => (e) => {
    const current = data.demolitionSkills || {}
    handleChange('demolitionSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const handleSecondaryDemolitionSkillToggle = (skill) => (e) => {
    const current = data.secondaryDemolitionSkills || {}
    handleChange('secondaryDemolitionSkills', {
      ...current,
      [skill]: e.target.checked,
    })
  }

  const workerLevels = TRADE_LEVEL_MAP[data.primaryTrade] || []
  const secondaryWorkerLevels = TRADE_LEVEL_MAP[data.secondaryTrade] || []
  
  // Check if secondary trade and level match primary trade and level
  const isDuplicate = data.primaryTrade && data.secondaryTrade && 
                      data.workerLevel && data.secondaryWorkerLevel &&
                      data.primaryTrade === data.secondaryTrade && 
                      data.workerLevel === data.secondaryWorkerLevel

  // Show responsibilities for both "Lead" AND "Lead/Foreman"
  const showLeadForemanSection = data.workerLevel === 'Lead' || data.workerLevel === 'Lead/Foreman'
  const showSecondaryLeadForemanSection = data.secondaryWorkerLevel === 'Lead' || data.secondaryWorkerLevel === 'Lead/Foreman'
  
  // Show Metal Framing skills when:
  // 1. Primary Trade is "Metal Framing"
  // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
  const showMetalFramingSection = 
    data.primaryTrade === 'Metal Framing' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

  const showSecondaryMetalFramingSection = 
    data.secondaryTrade === 'Metal Framing' && 
    (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

  // Show Drywall Hanging skills when:
  // 1. Primary Trade is "Drywall Hanging"
  // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
  const showDrywallHangingSection = 
    data.primaryTrade === 'Drywall Hanging' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

  const showSecondaryDrywallHangingSection = 
    data.secondaryTrade === 'Drywall Hanging' && 
    (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

  // Show Taping/Finishing skills when:
  // 1. Primary Trade is "Taping/Finishing"
  // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
  const showTapingFinishingSection = 
    data.primaryTrade === 'Taping/Finishing' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

  const showSecondaryTapingFinishingSection = 
    data.secondaryTrade === 'Taping/Finishing' && 
    (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

  // Show Acoustical Ceilings skills when:
  // 1. Primary Trade is "Acoustical Ceilings"
  // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
  const showAcousticalCeilingsSection = 
    data.primaryTrade === 'Acoustical Ceilings' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

  const showSecondaryAcousticalCeilingsSection = 
    data.secondaryTrade === 'Acoustical Ceilings' && 
    (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

  // Show Interior Carpentry skills when:
  // 1. Primary Trade is "Interior Carpentry"
  // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
  const showInteriorCarpentrySection = 
    data.primaryTrade === 'Interior Carpentry' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

  const showSecondaryInteriorCarpentrySection = 
    data.secondaryTrade === 'Interior Carpentry' && 
    (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

  // Show Helpers/Labourers skills when:
  // 1. Primary Trade is "Helpers/Labourers"
  // 2. Worker Level is "Helper" or "Lead Helper"
  const showHelpersLabourersSection = 
    data.primaryTrade === 'Helpers/Labourers' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Lead Helper')

  const showSecondaryHelpersLabourersSection = 
    data.secondaryTrade === 'Helpers/Labourers' && 
    (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Lead Helper')

  // Show Insulation skills when:
  // 1. Primary Trade is "Insulation"
  // 2. Worker Level is "Helper", "Mechanic", or "Lead"
  const showInsulationSection = 
    data.primaryTrade === 'Insulation' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Lead')

  const showSecondaryInsulationSection = 
    data.secondaryTrade === 'Insulation' && 
    (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Lead')

  // Show Demolition skills when:
  // 1. Primary Trade is "Demolition/Punch/Final Clean"
  // 2. Worker Level is "Helper" or "Mechanic"
  const showDemolitionSection = 
    data.primaryTrade === 'Demolition/Punch/Final Clean' && 
    (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic')

  const showSecondaryDemolitionSection = 
    data.secondaryTrade === 'Demolition/Punch/Final Clean' && 
    (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic')

  // Get the level abbreviation for display
  const getLevelAbbreviation = (level) => {
    switch(level) {
      case 'Helper': return 'H'
      case 'Mechanic': return 'M'
      case 'Advanced Mechanic': return 'A'
      case 'Lead Helper': return 'LH'
      case 'Lead': return 'L'
      default: return ''
    }
  }

  // Get the legend title based on trade and level
  const getLegendTitle = (trade, level) => {
    const abbr = getLevelAbbreviation(level)
    return `${trade} (${abbr})`
  }

  // Get all trade options for secondary (excluding the primary trade)
  const getSecondaryTradeOptions = () => {
    return Object.keys(TRADE_LEVEL_MAP).filter(trade => trade !== data.primaryTrade)
  }

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">Trade Profile & Skill Matrix</div>

          {/* Primary Trade Row */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
              Primary Trade
            </div>
            <div className="wizardGrid3">
              {/* Primary Trade */}
              <SelectField
                label=""
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
                label=""
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
                label=""
                type="number"
                min="0"
                value={data.yearOfExperience || ''}
                onChange={(value) => handleChange('yearOfExperience', value)}
                placeholder="Enter years"
              />
            </div>
          </div>

          {/* Secondary Trade Row */}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
              Secondary Trade
            </div>
            <div className="wizardGrid3">
              {/* Secondary Trade */}
              <SelectField
                label=""
                value={data.secondaryTrade || ''}
                onChange={handleSecondaryTradeChange}
              >
                <option value="">Select Trade</option>
                {getSecondaryTradeOptions().map((trade) => (
                  <option key={trade} value={trade}>
                    {trade}
                  </option>
                ))}
              </SelectField>

              {/* Secondary Worker Level */}
              <SelectField
                label=""
                value={data.secondaryWorkerLevel || ''}
                disabled={!data.secondaryTrade}
                onChange={handleSecondaryLevelChange}
              >
                <option value="">Select Worker Level</option>
                {secondaryWorkerLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </SelectField>

              {/* Secondary Year of Experience */}
              <TextField
                label=""
                type="number"
                min="0"
                value={data.secondaryYearOfExperience || ''}
                onChange={(value) => handleChange('secondaryYearOfExperience', value)}
                placeholder="Enter years"
              />
            </div>

            {/* Duplicate Validation Error */}
            {isDuplicate && (
              <div style={{
                marginTop: 8,
                padding: '10px 16px',
                background: '#fee2e2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span style={{ fontSize: '18px' }}>⚠️</span>
                Secondary Trade and Level cannot be the same as Primary Trade and Level. Please select different values.
              </div>
            )}
          </div>

          {/* Primary Trade Legend Fields */}
          {!isDuplicate && (
            <>
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

              {/* Taping/Finishing Skills - Legend Field Format */}
              {showTapingFinishingSection && (
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
                    {TAPING_FINISHING_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.tapingFinishingSkills?.[skill] || false)}
                          onChange={handleTapingFinishingSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Acoustical Ceilings Skills - Legend Field Format */}
              {showAcousticalCeilingsSection && (
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
                    {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.acousticalCeilingsSkills?.[skill] || false)}
                          onChange={handleAcousticalCeilingsSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Interior Carpentry Skills - Legend Field Format */}
              {showInteriorCarpentrySection && (
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
                    {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.interiorCarpentrySkills?.[skill] || false)}
                          onChange={handleInteriorCarpentrySkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Helpers/Labourers Skills - Legend Field Format */}
              {showHelpersLabourersSection && (
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
                    {HELPERS_LABOURERS_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.helpersLabourersSkills?.[skill] || false)}
                          onChange={handleHelpersLabourersSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Insulation Skills - Legend Field Format */}
              {showInsulationSection && (
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
                    {INSULATION_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.insulationSkills?.[skill] || false)}
                          onChange={handleInsulationSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Demolition/Punch/Final Clean Skills - Legend Field Format */}
              {showDemolitionSection && (
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
                    {DEMOLITION_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.demolitionSkills?.[skill] || false)}
                          onChange={handleDemolitionSkillToggle(skill)}
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
            </>
          )}

          {/* Secondary Trade Legend Fields */}
          {!isDuplicate && data.secondaryTrade && (
            <>
              {/* Secondary Metal Framing Skills */}
              {showSecondaryMetalFramingSection && (
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
                    {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
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
                          checked={!!(data.secondaryMetalFramingSkills?.[skill] || false)}
                          onChange={handleSecondaryMetalFramingSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Secondary Drywall Hanging Skills */}
              {showSecondaryDrywallHangingSection && (
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
                    {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
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
                          checked={!!(data.secondaryDrywallHangingSkills?.[skill] || false)}
                          onChange={handleSecondaryDrywallHangingSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Secondary Taping/Finishing Skills */}
              {showSecondaryTapingFinishingSection && (
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
                    {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
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
                    {TAPING_FINISHING_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.secondaryTapingFinishingSkills?.[skill] || false)}
                          onChange={handleSecondaryTapingFinishingSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Secondary Acoustical Ceilings Skills */}
              {showSecondaryAcousticalCeilingsSection && (
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
                    {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
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
                    {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.secondaryAcousticalCeilingsSkills?.[skill] || false)}
                          onChange={handleSecondaryAcousticalCeilingsSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Secondary Interior Carpentry Skills */}
              {showSecondaryInteriorCarpentrySection && (
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
                    {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
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
                    {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.secondaryInteriorCarpentrySkills?.[skill] || false)}
                          onChange={handleSecondaryInteriorCarpentrySkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Secondary Helpers/Labourers Skills */}
              {showSecondaryHelpersLabourersSection && (
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
                    {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
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
                    {HELPERS_LABOURERS_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.secondaryHelpersLabourersSkills?.[skill] || false)}
                          onChange={handleSecondaryHelpersLabourersSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Secondary Insulation Skills */}
              {showSecondaryInsulationSection && (
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
                    {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
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
                    {INSULATION_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.secondaryInsulationSkills?.[skill] || false)}
                          onChange={handleSecondaryInsulationSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Secondary Demolition Skills */}
              {showSecondaryDemolitionSection && (
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
                    {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
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
                    {DEMOLITION_SKILLS.map((skill) => (
                      <label key={skill} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.secondaryDemolitionSkills?.[skill] || false)}
                          onChange={handleSecondaryDemolitionSkillToggle(skill)}
                        />
                        {skill}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}

              {/* Secondary Lead/Foreman Responsibilities */}
              {showSecondaryLeadForemanSection && (
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
                    {data.secondaryWorkerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
                  </legend>

                  <div className="wizardGrid2" style={{ marginTop: 4 }}>
                    {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
                      <label key={responsibility} className="wizardCheck">
                        <input
                          type="checkbox"
                          checked={!!(data.secondaryLeadForemanResponsibilities?.[responsibility] || false)}
                          onChange={handleSecondaryResponsibilityToggle(responsibility)}
                        />
                        {responsibility}
                      </label>
                    ))}
                  </div>
                </fieldset>
              )}
            </>
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
            disabled={isDuplicate}
          >
            <span className="wizardPillBtnLabel">Next</span>
            <span className="wizardPillBtnIcon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}