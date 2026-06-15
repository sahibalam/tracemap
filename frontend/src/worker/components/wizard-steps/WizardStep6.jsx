// src/worker/components/wizard-steps/WizardStep6.jsx
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

export function WizardStep6({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setEmployeeFlags = (flags) => handleChange('employeeFlags', flags)
  const setEntityFlags = (flags) => handleChange('entityFlags', flags)
  const setStateSpecificFlags = (flags) => handleChange('stateSpecificFlags', flags)

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">1. Classification Selection & Routing</div>
          <div className="wizardGrid2">
            <div className="wizardChecks wizardChecks2">
              <label className="wizardCheck">
                <input
                  type="radio"
                  name="classificationPath"
                  checked={data.classificationPath === 'employee'}
                  onChange={() => handleChange('classificationPath', 'employee')}
                />
                Employee / W-2 path
              </label>
              <label className="wizardCheck">
                <input
                  type="radio"
                  name="classificationPath"
                  checked={data.classificationPath === 'subcontractor'}
                  onChange={() => handleChange('classificationPath', 'subcontractor')}
                />
                Subcontractor / 1099 / entity path
              </label>
            </div>

            <TextField
              placeholder="State of work"
              icon={<IconLocation />}
              value={data.stateOfWork || ''}
              onChange={(v) => handleChange('stateOfWork', v)}
            />
          </div>
        </div>

        {data.classificationPath === 'employee' ? (
          <div className="wizardSection">
            <div className="wizardSectionBar">2. Employee / W-2 Path Requirements</div>
            <div className="wizardGrid3">
              <TextField
                placeholder="Legal tax name"
                icon={<IconUser />}
                value={data.employeeTaxName || ''}
                onChange={(v) => handleChange('employeeTaxName', v)}
              />
              <TextField 
                placeholder="SSN" 
                icon={<IconSupport />} 
                value={data.employeeSsn || ''} 
                onChange={(v) => handleChange('employeeSsn', v)} 
              />
              <TextField
                placeholder="Employee start date"
                icon={<IconSupport />}
                value={data.employeeStartDate || ''}
                onChange={(v) => handleChange('employeeStartDate', v)}
              />
            </div>

            <div className="wizardGrid3 wizardGrid3Tight">
              {[
                'Form I-9 completed',
                'Identity / work authorization reviewed',
                'Form W-4 completed',
                'New-hire reporting required / completed',
                "Workers' comp review required",
                'Official form edition used',
              ].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.employeeFlags?.[k] || false)} onChange={toggleMapValue(k, setEmployeeFlags)} />
                  {k}
                </label>
              ))}
            </div>

            <div className="wizardGrid2">
              <TextField
                placeholder="Reviewer name"
                icon={<IconUser />}
                value={data.reviewerName || ''}
                onChange={(v) => handleChange('reviewerName', v)}
              />
              <TextField
                placeholder="Compliance notes"
                icon={<IconSupport />}
                value={data.complianceNotes || ''}
                onChange={(v) => handleChange('complianceNotes', v)}
              />
            </div>
          </div>
        ) : null}

        {data.classificationPath === 'subcontractor' ? (
          <div className="wizardSection">
            <div className="wizardSectionBar">3. Subcontractor / 1099 / Entity Path Requirements</div>
            <div className="wizardGrid4">
              <TextField
                placeholder="Legal entity name"
                icon={<IconSupport />}
                value={data.entityLegalName || ''}
                onChange={(v) => handleChange('entityLegalName', v)}
              />
              <TextField 
                placeholder="EIN" 
                icon={<IconSupport />} 
                value={data.entityEin || ''} 
                onChange={(v) => handleChange('entityEin', v)} 
              />
              <TextField
                placeholder="Entity type"
                icon={<IconSupport />}
                value={data.entityType || ''}
                onChange={(v) => handleChange('entityType', v)}
              />
              <TextField
                placeholder="State of registration"
                icon={<IconLocation />}
                value={data.entityStateRegistration || ''}
                onChange={(v) => handleChange('entityStateRegistration', v)}
              />
            </div>

            <div className="wizardGrid2">
              <TextField
                placeholder="DBA / trade name"
                icon={<IconSupport />}
                value={data.entityDbaName || ''}
                onChange={(v) => handleChange('entityDbaName', v)}
              />
              <TextField
                placeholder="Authorized signer"
                icon={<IconUser />}
                value={data.entityAuthorizedSigner || ''}
                onChange={(v) => handleChange('entityAuthorizedSigner', v)}
              />
            </div>

            <div className="wizardGrid3 wizardGrid3Tight">
              {[
                'Form W-9 completed',
                'TIN match verified where required',
                'Backup withholding flag reviewed',
                'Independent contractor reporting needed',
                'Contract / entity documentation reviewed',
              ].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.entityFlags?.[k] || false)} onChange={toggleMapValue(k, setEntityFlags)} />
                  {k}
                </label>
              ))}
            </div>
          </div>
        ) : null}

        <div className="wizardSection">
          <div className="wizardSectionBar">4. State-Specific Flags</div>
          <div className="wizardGrid3 wizardGrid3Tight">
            {['Florida worker or project', 'Texas worker or project', "Workers' comp review required"].map((k) => (
              <label key={k} className="wizardCheck">
                <input type="checkbox" checked={!!(data.stateSpecificFlags?.[k] || false)} onChange={toggleMapValue(k, setStateSpecificFlags)} />
                {k}
              </label>
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