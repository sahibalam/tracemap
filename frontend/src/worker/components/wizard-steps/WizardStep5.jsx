// src/worker/components/wizard-steps/WizardStep5.jsx
import { TextField } from '../../../common/components/TextField'
import { IconFolder, IconSupport, IconLocation, IconUser, IconPhone } from '../../../common/components/Icons'

export function WizardStep5({ data, onChange, onNext, onBack }) {
  const updateProjectField = (index, key) => (value) => {
    const projects = [...(data.projects || [])]
    projects[index] = { ...projects[index], [key]: value }
    onChange({ ...data, projects })
  }

  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setProjectConditions = (conditions) => handleChange('projectConditions', conditions)
  const setProjectConditionsState = (conditions) => handleChange('projectConditions', conditions)

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const projects = data.projects || [
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
  ]

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">Project 3</div>
          <div className="wizardProjectCard">
            <div className="wizardGrid2">
              <TextField
                placeholder="Project name"
                icon={<IconFolder />}
                value={projects[2]?.name || ''}
                onChange={updateProjectField(2, 'name')}
              />
              <TextField
                placeholder="Client / GC"
                icon={<IconSupport />}
                value={projects[2]?.client || ''}
                onChange={updateProjectField(2, 'client')}
              />
            </div>

            <div className="wizardGrid4">
              <TextField
                placeholder="City"
                icon={<IconLocation />}
                value={projects[2]?.city || ''}
                onChange={updateProjectField(2, 'city')}
              />
              <TextField
                placeholder="State"
                icon={<IconLocation />}
                value={projects[2]?.state || ''}
                onChange={updateProjectField(2, 'state')}
              />
              <TextField
                placeholder="Role"
                icon={<IconUser />}
                value={projects[2]?.role || ''}
                onChange={updateProjectField(2, 'role')}
              />
              <TextField
                placeholder="Trade"
                icon={<IconSupport />}
                value={projects[2]?.trade || ''}
                onChange={updateProjectField(2, 'trade')}
              />
            </div>

            <div className="wizardGrid2">
              <TextField
                placeholder="Start date"
                icon={<IconSupport />}
                value={projects[2]?.start || ''}
                onChange={updateProjectField(2, 'start')}
              />
              <TextField
                placeholder="End date"
                icon={<IconSupport />}
                value={projects[2]?.end || ''}
                onChange={updateProjectField(2, 'end')}
              />
            </div>

            <TextField
              placeholder="Scope summary"
              icon={<IconSupport />}
              value={projects[2]?.scope || ''}
              onChange={updateProjectField(2, 'scope')}
            />
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">Reference & Project Conditions</div>
          <div className="wizardGrid3 wizardGrid3Tight">
            {[
              'Worked secure / badged projects',
              'Worked at heights',
              'Worked weekend shifts',
              'Worked fast-track schedule',
              'Worked multi-floor projects',
              'Used lifts on project',
            ].map((k) => (
              <label key={k} className="wizardCheck">
                <input type="checkbox" checked={!!(data.projectConditions?.[k] || false)} onChange={toggleMapValue(k, setProjectConditions)} />
                {k}
              </label>
            ))}
          </div>

          <div className="wizardGrid3">
            <TextField
              placeholder="Reference name"
              icon={<IconUser />}
              value={data.referenceName || ''}
              onChange={(v) => handleChange('referenceName', v)}
            />
            <TextField
              placeholder="Reference title"
              icon={<IconSupport />}
              value={data.referenceTitle || ''}
              onChange={(v) => handleChange('referenceTitle', v)}
            />
            <TextField
              placeholder="Reference phone"
              icon={<IconPhone />}
              value={data.referencePhone || ''}
              onChange={(v) => handleChange('referencePhone', v)}
            />
          </div>

          <TextField
            placeholder="Notes for reviewer / superintendent comments"
            icon={<IconSupport />}
            value={data.reviewerNotes || ''}
            onChange={(v) => handleChange('reviewerNotes', v)}
          />
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