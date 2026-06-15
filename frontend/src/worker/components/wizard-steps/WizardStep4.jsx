// src/worker/components/wizard-steps/WizardStep4.jsx
import { TextField } from '../../../common/components/TextField'
import { IconFolder, IconSupport, IconLocation, IconUser } from '../../../common/components/Icons'

export function WizardStep4({ data, onChange, onNext, onBack }) {
  const updateProjectField = (index, key) => (value) => {
    const projects = [...(data.projects || [])]
    projects[index] = { ...projects[index], [key]: value }
    onChange({ ...data, projects })
  }

  const projects = data.projects || [
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
  ]

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">Recent Projects (Last 3 to 5 Relevant Projects)</div>
          <div className="wizardProjectList">
            {[0, 1].map((idx) => (
              <div key={idx} className="wizardProjectCard">
                <div className="wizardProjectTitle">Project {idx + 1}</div>
                <div className="wizardGrid2">
                  <TextField
                    placeholder="Project name"
                    icon={<IconFolder />}
                    value={projects[idx]?.name || ''}
                    onChange={updateProjectField(idx, 'name')}
                  />
                  <TextField
                    placeholder="Client / GC"
                    icon={<IconSupport />}
                    value={projects[idx]?.client || ''}
                    onChange={updateProjectField(idx, 'client')}
                  />
                </div>

                <div className="wizardGrid4">
                  <TextField
                    placeholder="City"
                    icon={<IconLocation />}
                    value={projects[idx]?.city || ''}
                    onChange={updateProjectField(idx, 'city')}
                  />
                  <TextField
                    placeholder="State"
                    icon={<IconLocation />}
                    value={projects[idx]?.state || ''}
                    onChange={updateProjectField(idx, 'state')}
                  />
                  <TextField
                    placeholder="Role"
                    icon={<IconUser />}
                    value={projects[idx]?.role || ''}
                    onChange={updateProjectField(idx, 'role')}
                  />
                  <TextField
                    placeholder="Trade"
                    icon={<IconSupport />}
                    value={projects[idx]?.trade || ''}
                    onChange={updateProjectField(idx, 'trade')}
                  />
                </div>

                <div className="wizardGrid2">
                  <TextField
                    placeholder="Start date"
                    icon={<IconSupport />}
                    value={projects[idx]?.start || ''}
                    onChange={updateProjectField(idx, 'start')}
                  />
                  <TextField
                    placeholder="End date"
                    icon={<IconSupport />}
                    value={projects[idx]?.end || ''}
                    onChange={updateProjectField(idx, 'end')}
                  />
                </div>

                <TextField
                  placeholder="Scope summary"
                  icon={<IconSupport />}
                  value={projects[idx]?.scope || ''}
                  onChange={updateProjectField(idx, 'scope')}
                />
              </div>
            ))}
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