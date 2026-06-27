// src/worker/components/wizard-steps/WizardStep7.jsx

export function WizardStep7({ data, onChange, onNext, onBack }) {
  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setCertChecklist = (checklist) => handleChange('certChecklist', checklist)
  const setSafetyFlags = (flags) => handleChange('safetyFlags', flags)

  const updateCertRow = (index, key) => (value) => {
    const rows = [...(data.certRows || [])]
    rows[index] = { ...rows[index], [key]: value }
    handleChange('certRows', rows)
  }

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const certRows = data.certRows || [
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
  ]

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">1. Certification Checklist</div>
          <div className="wizardSkillsGrid">
            <div className="wizardSkillCol">
              {['OSHA 10', 'OSHA 30', 'Scissor lift'].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
                  {k}
                </label>
              ))}
            </div>
            <div className="wizardSkillCol">
              {['Boom / aerial lift', 'Forklift / PIT', 'CPR / First Aid'].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
                  {k}
                </label>
              ))}
            </div>
            <div className="wizardSkillCol">
              {['Fall protection', 'HazCom', 'Site-specific orientation'].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
                  {k}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">2. Verification Data</div>
          <div className="wizardTable">
            <div className="wizardTableHead">
              <div>Certification / card name</div>
              <div>Card number / ID</div>
              <div>Issue date</div>
              <div>Expiration date</div>
              <div>Upload / file ref</div>
            </div>
            {certRows.map((row, idx) => (
              <div key={idx} className="wizardTableRow">
                <input className="wizardTableInput" value={row.name} onChange={(e) => updateCertRow(idx, 'name')(e.target.value)} />
                <input className="wizardTableInput" value={row.cardNumber} onChange={(e) => updateCertRow(idx, 'cardNumber')(e.target.value)} />
                <input className="wizardTableInput" value={row.issueDate} onChange={(e) => updateCertRow(idx, 'issueDate')(e.target.value)} />
                <input className="wizardTableInput" value={row.expirationDate} onChange={(e) => updateCertRow(idx, 'expirationDate')(e.target.value)} />
                <input className="wizardTableInput" value={row.uploadRef} onChange={(e) => updateCertRow(idx, 'uploadRef')(e.target.value)} />
              </div>
            ))}
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">3. Safety Readiness Flags</div>
          <div className="wizardGrid2 wizardGrid2Tight">
            {[
              'Worker understands stop-work authority for unsafe conditions',
              'Drug-screen-ready if required by project',
              'Worker can provide PPE for standard interior scopes',
              'Badge / secure-site onboarding available',
            ].map((k) => (
              <label key={k} className="wizardCheck">
                <input type="checkbox" checked={!!(data.safetyFlags?.[k] || false)} onChange={toggleMapValue(k, setSafetyFlags)} />
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