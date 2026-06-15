// src/worker/components/wizard-steps/WizardStep3.jsx
import { TextField } from '../../../common/components/TextField'
import { IconSupport, IconGlobe } from '../../../common/components/Icons'

export function WizardStep3({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setInteriorsSkills = (skills) => handleChange('interiorsSkills', skills)
  const setFieldReadiness = (readiness) => handleChange('fieldReadiness', readiness)

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">1. Trade Classification</div>
          <div className="wizardGrid2">
            <TextField 
              placeholder="Primary trade" 
              icon={<IconSupport />} 
              value={data.primaryTrade || ''} 
              onChange={(v) => handleChange('primaryTrade', v)} 
            />
            <TextField 
              placeholder="Primary level (Helper / Mechanic / Lead / Foreman)" 
              icon={<IconSupport />} 
              value={data.primaryLevel || ''} 
              onChange={(v) => handleChange('primaryLevel', v)} 
            />
            <TextField 
              placeholder="Secondary trade(s)" 
              icon={<IconSupport />} 
              value={data.secondaryTrades || ''} 
              onChange={(v) => handleChange('secondaryTrades', v)} 
            />
            <TextField
              placeholder="Years of experience — primary trade"
              icon={<IconSupport />}
              value={data.yearsExperience || ''}
              onChange={(v) => handleChange('yearsExperience', v)}
            />
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">2. Interiors Skill Areas</div>
          <div className="wizardSkillsGrid">
            <div className="wizardSkillCol">
              <div className="wizardSkillTitle">Metal framing</div>
              {[
                'Layout',
                'Stud/track framing',
                'Soffits / bulkheads',
                'Shaft wall',
                'Backing / blocking',
                'Rated walls',
                'High wall work',
              ].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.interiorsSkills?.[`mf:${k}`] || false)} onChange={toggleMapValue(`mf:${k}`, setInteriorsSkills)} />
                  {k}
                </label>
              ))}
            </div>
            <div className="wizardSkillCol">
              <div className="wizardSkillTitle">Drywall hanging</div>
              {['Walls', 'Ceilings', 'Fire-rated board', 'Abuse / moisture board', 'High walls', 'Production hanging', 'Lift work'].map(
                (k) => (
                  <label key={k} className="wizardCheck">
                    <input type="checkbox" checked={!!(data.interiorsSkills?.[`dh:${k}`] || false)} onChange={toggleMapValue(`dh:${k}`, setInteriorsSkills)} />
                    {k}
                  </label>
                ),
              )}
            </div>
            <div className="wizardSkillCol">
              <div className="wizardSkillTitle">Ceilings / finishing</div>
              {[
                'Grid & tile',
                'Tegular / specialty',
                'Clouds / baffles',
                'Level 4 finish',
                'Level 5 finish',
                'Punch / touch-up',
                'Texture match',
              ].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.interiorsSkills?.[`cf:${k}`] || false)} onChange={toggleMapValue(`cf:${k}`, setInteriorsSkills)} />
                  {k}
                </label>
              ))}
            </div>
          </div>

          <div className="wizardWideField">
            <TextField
              placeholder="Additional skills / tools / systems worked with"
              icon={<IconSupport />}
              value={data.additionalSkills || ''}
              onChange={(v) => handleChange('additionalSkills', v)}
            />
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">3. Field Readiness</div>
          <div className="wizardGrid3">
            {[
              'blueprints', 'lifts', 'occupied', 'nightShifts', 'travel', 'leadCrew'
            ].map((k) => (
              <label key={k} className="wizardCheck">
                <input type="checkbox" checked={!!(data.fieldReadiness?.[k] || false)} onChange={toggleMapValue(k, setFieldReadiness)} />
                {k === 'blueprints' && 'Can read blueprints / plans'}
                {k === 'lifts' && 'Comfortable on lifts'}
                {k === 'occupied' && 'Worked occupied spaces'}
                {k === 'nightShifts' && 'Available for night shifts'}
                {k === 'travel' && 'Available for travel'}
                {k === 'leadCrew' && 'Can lead a crew'}
              </label>
            ))}
          </div>

          <div className="wizardGrid2">
            <TextField
              placeholder="Travel radius (miles)"
              icon={<IconSupport />}
              value={data.travelRadiusMiles || ''}
              onChange={(v) => handleChange('travelRadiusMiles', v)}
            />
            <TextField 
              placeholder="Languages" 
              icon={<IconGlobe />} 
              value={data.languages || ''} 
              onChange={(v) => handleChange('languages', v)} 
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
          <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext}>
            <span className="wizardPillBtnLabel">Next</span>
            <span className="wizardPillBtnIcon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}