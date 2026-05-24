import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ============ ICONS ============
function IconPlus(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 4v16m-8-8h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
}

function IconArrowLeft(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconArrowRight(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconCheck(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconBell(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 22a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 22Zm7-6V11a7 7 0 0 0-5.5-6.8V3.5a1.5 1.5 0 0 0-3 0v.7A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z" fill="currentColor"/>
    </svg>
  )
}

function IconSearch(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 2a8 8 0 1 0 5.3 14l4.2 4.2 1.4-1.4-4.2-4.2A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" fill="currentColor"/>
    </svg>
  )
}

function IconFolder(props) {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 4h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="currentColor" opacity="0.2"/>
      <path d="M4 4h6l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
    </svg>
  )
}

// ============ WIZARD STEP 1: BASIC PROJECT INFORMATION ============
function WizardStep1({ data, onChange, onNext }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const isValid = data.projectName && data.projectName.trim() !== ''

  const projectSectors = [
    "Residential", "Commercial", "Industrial", "Infrastructure", 
    "Healthcare", "Education", "Retail", "Hospitality", 
    "Government", "Transportation", "Energy", "Water/Wastewater",
    "Environmental", "Telecommunications", "Marine", "Aviation",
    "Sports & Recreation", "Religious", "Mixed-Use", "Renovation"
  ]

  return (
    <div className="wizardStep">
      <h2 className="wizardStepTitle">Basic Project Information</h2>
      <p className="wizardStepSubtitle"></p>
      
      <div className="wizardForm">
        <div className="wizardField">
          <label className="wizardFieldLabel">Project Name *</label>
          <input 
            type="text" 
            className="wizardFieldInput" 
            placeholder="Enter project name"
            value={data.projectName || ''}
            onChange={(e) => handleChange('projectName', e.target.value)}
          />
        </div>

        <div className="wizardRow">
          <div className="wizardField">
            <label className="wizardFieldLabel">Company Project Number</label>
            <input 
              type="text" 
              className="wizardFieldInput" 
              placeholder="Enter company project number"
              value={data.companyProjectNumber || ''}
              onChange={(e) => handleChange('companyProjectNumber', e.target.value)}
            />
          </div>
          <div className="wizardField">
            <label className="wizardFieldLabel">Project Type/Sectors</label>
            <select 
              className="wizardFieldSelect"
              value={data.projectType || ''}
              onChange={(e) => handleChange('projectType', e.target.value)}
            >
              <option value="">Select project type/sector</option>
              {projectSectors.map(sector => (
                <option key={sector} value={sector}>{sector}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="wizardField">
          <label className="wizardFieldLabel">Project Description</label>
          <textarea 
            className="wizardFieldTextarea" 
            placeholder="Describe the project scope and objectives"
            rows="3"
            value={data.projectDescription || ''}
            onChange={(e) => handleChange('projectDescription', e.target.value)}
          />
        </div>

        <div className="wizardRow">
          <div className="wizardField">
            <label className="wizardFieldLabel">Project Contact/Superintendent</label>
            <input 
              type="text" 
              className="wizardFieldInput" 
              placeholder="Name of primary contact or superintendent"
              value={data.projectContact || ''}
              onChange={(e) => handleChange('projectContact', e.target.value)}
            />
          </div>
          <div className="wizardField">
            <label className="wizardFieldLabel">Estimated Project Duration</label>
            <input 
              type="text" 
              className="wizardFieldInput" 
              placeholder="e.g., 3 months, 12 weeks, 90 days"
              value={data.estimatedDuration || ''}
              onChange={(e) => handleChange('estimatedDuration', e.target.value)}
            />
          </div>
        </div>

        <div className="wizardField">
          <label className="wizardFieldLabel">Company Note</label>
          <textarea 
            className="wizardFieldTextarea" 
            placeholder="Add any internal notes, special instructions, or additional information about this project"
            rows="3"
            value={data.companyNote || ''}
            onChange={(e) => handleChange('companyNote', e.target.value)}
          />
        </div>
      </div>

      <div className="wizardActions">
        <button className="wizardPillBtn wizardPillBtnSecondary" disabled>
          <span className="wizardPillBtnIcon"><IconArrowLeft /></span>
          <span className="wizardPillBtnLabel">Back</span>
        </button>
        <button className="wizardPillBtn wizardPillBtnPrimary" onClick={onNext} disabled={!isValid}>
          <span className="wizardPillBtnLabel">Next</span>
          <span className="wizardPillBtnIcon"><IconArrowRight /></span>
        </button>
      </div>
    </div>
  )
}

// ============ WIZARD STEP 2: LOCATION & WORK RADIUS ============
function WizardStep2({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="wizardStep">
      <h2 className="wizardStepTitle">Location & Work Radius</h2>
      <p className="wizardStepSubtitle"></p>
      
      <div className="wizardForm">
        <div className="wizardField">
          <label className="wizardFieldLabel">Project Address</label>
          <input 
            type="text" 
            className="wizardFieldInput" 
            placeholder="Enter street address"
            value={data.address || ''}
            onChange={(e) => handleChange('address', e.target.value)}
          />
        </div>

        <div className="wizardGrid4">
          <div className="wizardField">
            <label className="wizardFieldLabel">City</label>
            <input 
              type="text" 
              className="wizardFieldInput" 
              placeholder="City"
              value={data.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
            />
          </div>
          <div className="wizardField">
            <label className="wizardFieldLabel">County</label>
            <input 
              type="text" 
              className="wizardFieldInput" 
              placeholder="County"
              value={data.county || ''}
              onChange={(e) => handleChange('county', e.target.value)}
            />
          </div>
          <div className="wizardField">
            <label className="wizardFieldLabel">State</label>
            <input 
              type="text" 
              className="wizardFieldInput" 
              placeholder="State"
              value={data.state || ''}
              onChange={(e) => handleChange('state', e.target.value)}
            />
          </div>
          <div className="wizardField">
            <label className="wizardFieldLabel">ZIP</label>
            <input 
              type="text" 
              className="wizardFieldInput" 
              placeholder="ZIP Code"
              value={data.zip || ''}
              onChange={(e) => handleChange('zip', e.target.value)}
            />
          </div>
        </div>

        <div className="wizardSectionDivider">
          <h3 className="wizardSectionTitle">Work Radius</h3>
        </div>

        <div className="wizardField">
          <label className="wizardFieldLabel">Site</label>
          <input 
            type="text" 
            className="wizardFieldInput" 
            placeholder="Enter site name or location"
            value={data.site || ''}
            onChange={(e) => handleChange('site', e.target.value)}
          />
        </div>

        <div className="wizardField">
          <label className="wizardFieldLabel">Access Instructions</label>
          <textarea 
            className="wizardFieldTextarea" 
            placeholder="Enter any special access instructions, parking details, security requirements, or site-specific directions"
            rows="3"
            value={data.accessInstructions || ''}
            onChange={(e) => handleChange('accessInstructions', e.target.value)}
          />
        </div>
      </div>

      <div className="wizardActions">
        <button className="wizardPillBtn wizardPillBtnSecondary" onClick={onBack}>
          <span className="wizardPillBtnIcon"><IconArrowLeft /></span>
          <span className="wizardPillBtnLabel">Back</span>
        </button>
        <button className="wizardPillBtn wizardPillBtnPrimary" onClick={onNext}>
          <span className="wizardPillBtnLabel">Next</span>
          <span className="wizardPillBtnIcon"><IconArrowRight /></span>
        </button>
      </div>
    </div>
  )
}

// ============ WIZARD STEP 3: PROJECT CLASSIFICATION ============
function WizardStep3({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const handleToggleChange = (field) => (value) => {
    onChange({ ...data, [field]: value })
  }

  const projectSectorOptions = [
    "Select sector...",
    "Private Commercial",
    "Multifamily",
    "Industrial",
    "Healthcare",
    "Education",
    "State / Local",
    "Federal",
    "Secure"
  ]

  const fundingTypeOptions = [
    "Select funding...",
    "Private",
    "State / Local Public",
    "Federal",
    "Mixed",
    "Unknown"
  ]

  const ToggleButton = ({ value, onChange, label, hint }) => {
    return (
      <div className="wizardToggleItem">
        <div className="wizardToggleHeader">
          <span className="wizardToggleLabel">{label}</span>
          <div className="wizardToggleSwitch">
            <button
              type="button"
              className={`wizardToggleOption ${!value ? 'active' : ''}`}
              onClick={() => onChange(false)}
            />
            <button
              type="button"
              className={`wizardToggleOption ${value ? 'active' : ''}`}
              onClick={() => onChange(true)}
            />
          </div>
        </div>
        <p className="wizardToggleHint">{hint}</p>
      </div>
    )
  }

  return (
    <div className="wizardStep">
      <h2 className="wizardStepTitle">Project Classification</h2>
      <p className="wizardStepSubtitle"></p>
      
      <div className="wizardForm">
        <div className="wizardRow">
          <div className="wizardField">
            <div className="wizardFieldHeader">
              <label className="wizardFieldLabel">PROJECT SECTOR</label>
              <span className="wizardFieldRequired">REQUIRED</span>
            </div>
            <select 
              className="wizardFieldSelect"
              value={data.projectSector || ''}
              onChange={(e) => handleChange('projectSector', e.target.value)}
            >
              {projectSectorOptions.map(option => (
                <option key={option} value={option === "Select sector..." ? "" : option}>
                  {option}
                </option>
              ))}
            </select>
            <p className="wizardFieldHint">
              Identifies construction sector — affects rate logic, matching, and admin review.
            </p>
          </div>

          <div className="wizardField">
            <div className="wizardFieldHeader">
              <label className="wizardFieldLabel">FUNDING TYPE</label>
              <span className="wizardFieldRequired">REQUIRED</span>
            </div>
            <select 
              className="wizardFieldSelect"
              value={data.fundingType || ''}
              onChange={(e) => handleChange('fundingType', e.target.value)}
            >
              {fundingTypeOptions.map(option => (
                <option key={option} value={option === "Select funding..." ? "" : option}>
                  {option}
                </option>
              ))}
            </select>
            <p className="wizardFieldHint">
              Determines prevailing wage review eligibility.
            </p>
          </div>
        </div>

        <div className="wizardComplianceHeader">
          <span className="wizardComplianceTitle">COMPLIANCE FLAGS</span>
          <span className="wizardComplianceBadge">CONDITIONAL</span>
        </div>

        <ToggleButton
          value={data.prevailingWageFlag || false}
          onChange={handleToggleChange('prevailingWageFlag')}
          label="Prevailing Wage"
          hint="Indicates wage rules may apply — triggers admin review & rate engine if on or unknown."
        />

        <ToggleButton
          value={data.certifiedPayrollFlag || false}
          onChange={handleToggleChange('certifiedPayrollFlag')}
          label="Certified Payroll"
          hint="Indicates payroll reporting may be required — project will not auto-publish if enabled."
        />

        <ToggleButton
          value={data.secureSiteFlag || false}
          onChange={handleToggleChange('secureSiteFlag')}
          label="Secure Site"
          hint="Indicates restricted access — used for eligibility review. Examples: military, airport, NASA, port."
        />

        <div className="wizardField">
          <div className="wizardFieldHeader">
            <label className="wizardFieldLabel">CLASSIFICATION NOTES</label>
            <span className="wizardFieldOptional">OPTIONAL</span>
          </div>
          <textarea 
            className="wizardFieldTextarea" 
            placeholder="Add internal notes about uncertainty or special conditions for this project..."
            rows="4"
            value={data.classificationNotes || ''}
            onChange={(e) => handleChange('classificationNotes', e.target.value)}
          />
          <p className="wizardFieldFootnote">
            These notes are internal by default and will not be shown to workers unless approved by an admin.
          </p>
        </div>
      </div>

      <div className="wizardActions">
        <button className="wizardPillBtn wizardPillBtnSecondary" onClick={onBack}>
          <span className="wizardPillBtnIcon"><IconArrowLeft /></span>
          <span className="wizardPillBtnLabel">Back</span>
        </button>
        <button className="wizardPillBtn wizardPillBtnPrimary" onClick={onNext}>
          <span className="wizardPillBtnLabel">Next</span>
          <span className="wizardPillBtnIcon"><IconArrowRight /></span>
        </button>
      </div>
    </div>
  )
}

// ============ WIZARD STEP 4: SPECIAL REQUIREMENTS ============
function WizardStep4({ data, onChange, onNext, onBack }) {
  const handleCheckboxChange = (field) => (e) => {
    onChange({ ...data, [field]: e.target.checked })
  }

  return (
    <div className="wizardStep">
      <h2 className="wizardStepTitle">Special Requirements</h2>
      <p className="wizardStepSubtitle"></p>
      
      <div className="wizardForm">
        <div className="wizardFlagsNote">
          <span className="wizardFlagsNoteIcon">📌</span>
          <span className="wizardFlagsNoteText">Flags selected - Triggers admin review or automatic matching rule</span>
        </div>

        <div className="wizardCategorySection">
          <h3 className="wizardCategoryTitle">WAGE & PAYROLL</h3>
          <div className="wizardCheckboxGrid">
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.davisBaconFlag || false} onChange={handleCheckboxChange('davisBaconFlag')} />
              <span>Davis-Bacon / Federal Prevailing Wage</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.statePrevailingWageFlag || false} onChange={handleCheckboxChange('statePrevailingWageFlag')} />
              <span>State Prevailing Wage</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.localPrevailingWageFlag || false} onChange={handleCheckboxChange('localPrevailingWageFlag')} />
              <span>Local Prevailing Wage</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.certifiedPayrollRequiredFlag || false} onChange={handleCheckboxChange('certifiedPayrollRequiredFlag')} />
              <span>Certified Payroll</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.unionRequirementFlag || false} onChange={handleCheckboxChange('unionRequirementFlag')} />
              <span>Union / PLA Requirement</span>
            </label>
          </div>
        </div>

        <div className="wizardCategorySection">
          <h3 className="wizardCategoryTitle">WORKER ELIGIBILITY</h3>
          <div className="wizardCheckboxGrid">
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.backgroundCheckFlag || false} onChange={handleCheckboxChange('backgroundCheckFlag')} />
              <span>Background Check</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.drugTestFlag || false} onChange={handleCheckboxChange('drugTestFlag')} />
              <span>Drug Test</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.osha10Flag || false} onChange={handleCheckboxChange('osha10Flag')} />
              <span>OSHA 10</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.osha30Flag || false} onChange={handleCheckboxChange('osha30Flag')} />
              <span>OSHA 30</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.usCitizenOnlyFlag || false} onChange={handleCheckboxChange('usCitizenOnlyFlag')} />
              <span>U.S. Citizen Only</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.healthcareFacilityFlag || false} onChange={handleCheckboxChange('healthcareFacilityFlag')} />
              <span>Healthcare Facility Requirements</span>
            </label>
          </div>
        </div>

        <div className="wizardCategorySection">
          <h3 className="wizardCategoryTitle">SITE ACCESS</h3>
          <div className="wizardCheckboxGrid">
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.badgeRequiredFlag || false} onChange={handleCheckboxChange('badgeRequiredFlag')} />
              <span>Badge Required</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.securityClearanceFlag || false} onChange={handleCheckboxChange('securityClearanceFlag')} />
              <span>Security Clearance</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.airportAccessFlag || false} onChange={handleCheckboxChange('airportAccessFlag')} />
              <span>Airport Access</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.portAccessFlag || false} onChange={handleCheckboxChange('portAccessFlag')} />
              <span>Port Access</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.militaryBaseAccessFlag || false} onChange={handleCheckboxChange('militaryBaseAccessFlag')} />
              <span>Military Base Access</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.nasaAccessFlag || false} onChange={handleCheckboxChange('nasaAccessFlag')} />
              <span>NASA / Space Facility Access</span>
            </label>
          </div>
        </div>

        <div className="wizardCategorySection">
          <h3 className="wizardCategoryTitle">LOGISTICS & SCHEDULE</h3>
          <div className="wizardCheckboxGrid">
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.travelRequiredFlag || false} onChange={handleCheckboxChange('travelRequiredFlag')} />
              <span>Travel Required</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.perDiemRequiredFlag || false} onChange={handleCheckboxChange('perDiemRequiredFlag')} />
              <span>Per Diem Required</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.hotelRequiredFlag || false} onChange={handleCheckboxChange('hotelRequiredFlag')} />
              <span>Hotel Required</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.nightShiftFlag || false} onChange={handleCheckboxChange('nightShiftFlag')} />
              <span>Night Shift</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.weekendShiftFlag || false} onChange={handleCheckboxChange('weekendShiftFlag')} />
              <span>Weekend Shift</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input type="checkbox" checked={data.highUrgencyFlag || false} onChange={handleCheckboxChange('highUrgencyFlag')} />
              <span>High Urgency / Short Notice</span>
            </label>
          </div>
        </div>
      </div>

      <div className="wizardActions">
        <button className="wizardPillBtn wizardPillBtnSecondary" onClick={onBack}>
          <span className="wizardPillBtnIcon"><IconArrowLeft /></span>
          <span className="wizardPillBtnLabel">Back</span>
        </button>
        <button className="wizardPillBtn wizardPillBtnPrimary" onClick={onNext}>
          <span className="wizardPillBtnLabel">Next</span>
          <span className="wizardPillBtnIcon"><IconArrowRight /></span>
        </button>
      </div>
    </div>
  )
}

// ============ WIZARD STEP 5: WORK TYPE SELECTION ============
function WizardStep5({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }
  const handleRadioChange = (field) => (e) => {
    onChange({ ...data, [field]: e.target.value })
  }

  const workTypeOptions = [
    "Select work type...",
    "Hourly Workforce Posting",
    "Lump Sum / Execution Support"
  ]

  const primaryTradeOptions = [
    "Electrical", "Plumbing", "HVAC", "Carpentry", "Concrete",
    "Steel/Iron", "Roofing", "Painting", "Drywall", "Masonry",
    "Demolition", "General Labor"
  ]

  const urgencyOptions = [
    { value: "normal", label: "Normal", description: "Standard matching priority, no premium applied." },
    { value: "urgent", label: "Urgent", description: "Boosted matching priority, premium rates may apply." },
    { value: "emergency", label: "Emergency / Short Notice", description: "Highest priority, premium rates apply, admin notified." }
  ]

  const isValid = data.workType && data.workType !== '' && data.primaryTrade && data.urgencyLevel

  return (
    <div className="wizardStep">
      <h2 className="wizardStepTitle">Work Type Selection</h2>
      <p className="wizardStepSubtitle"></p>
      
      <div className="wizardForm">
        <div className="wizardField">
          <div className="wizardFieldHeader">
            <label className="wizardFieldLabel">WORK TYPE</label>
            <span className="wizardFieldRequired">REQUIRED</span>
          </div>
          <select 
            className="wizardFieldSelect"
            value={data.workType || ''}
            onChange={(e) => handleChange('workType', e.target.value)}
          >
            {workTypeOptions.map(option => (
              <option key={option} value={option === "Select work type..." ? "" : option}>
                {option}
              </option>
            ))}
          </select>
          <p className="wizardFieldHint">
            Determines the workflow path and controls subsequent form screens.
          </p>
        </div>

        <div className="wizardField">
          <div className="wizardFieldHeader">
            <label className="wizardFieldLabel">PRIMARY TRADE CATEGORY</label>
            <span className="wizardFieldRequired">REQUIRED</span>
          </div>
          <div className="wizardTradeGrid">
            {primaryTradeOptions.map(trade => (
              <label key={trade} className="wizardTradeLabel">
                <input 
                  type="radio" 
                  name="primaryTrade"
                  value={trade}
                  checked={data.primaryTrade === trade}
                  onChange={handleRadioChange('primaryTrade')}
                />
                <span>{trade}</span>
              </label>
            ))}
          </div>
          <p className="wizardFieldHint">
            Sets the initial trade scope — can expand to multiple trade packages after posting.
          </p>
        </div>

        <div className="wizardManagementSection">
          <div className="wizardFieldHeader">
            <label className="wizardFieldLabel">SELF-MANAGED OR SUPPORT NEEDED</label>
            <span className="wizardFieldConditional">CONDITIONAL</span>
          </div>
          <div className="wizardManagementOptions">
            <label className={`wizardManagementCard ${data.managementStyle === 'self-managed' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="managementStyle"
                value="self-managed"
                checked={data.managementStyle === 'self-managed'}
                onChange={handleRadioChange('managementStyle')}
              />
              <div className="wizardManagementContent">
                <strong>Self-Managed</strong>
                <span>Your company manages workers directly. TradesMap handles matching and payments only.</span>
              </div>
            </label>
            <label className={`wizardManagementCard ${data.managementStyle === 'support-needed' ? 'active' : ''}`}>
              <input 
                type="radio" 
                name="managementStyle"
                value="support-needed"
                checked={data.managementStyle === 'support-needed'}
                onChange={handleRadioChange('managementStyle')}
              />
              <div className="wizardManagementContent">
                <strong>Support Needed</strong>
                <span>TradesMap provides active workforce management, operations support, and oversight.</span>
              </div>
            </label>
          </div>
          <p className="wizardFieldHint">
            Useful for hourly vs managed support decisions. Affects admin review routing.
          </p>
        </div>

        <div className="wizardField">
          <div className="wizardFieldHeader">
            <label className="wizardFieldLabel">URGENCY LEVEL</label>
            <span className="wizardFieldRequired">REQUIRED</span>
          </div>
          <div className="wizardUrgencyOptions">
            {urgencyOptions.map(option => (
              <label key={option.value} className={`wizardUrgencyCard ${data.urgencyLevel === option.value ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="urgencyLevel"
                  value={option.value}
                  checked={data.urgencyLevel === option.value}
                  onChange={handleRadioChange('urgencyLevel')}
                />
                <div className="wizardUrgencyContent">
                  <strong>{option.label}</strong>
                  <span>{option.description}</span>
                </div>
              </label>
            ))}
          </div>
          <p className="wizardFieldHint">
            Used for matching priority and premium rate logic.
          </p>
        </div>
      </div>

      <div className="wizardActions">
        <button className="wizardPillBtn wizardPillBtnSecondary" onClick={onBack}>
          <span className="wizardPillBtnIcon"><IconArrowLeft /></span>
          <span className="wizardPillBtnLabel">Back</span>
        </button>
        <button className="wizardPillBtn wizardPillBtnPrimary" onClick={onNext} disabled={!isValid}>
          <span className="wizardPillBtnLabel">Next</span>
          <span className="wizardPillBtnIcon"><IconArrowRight /></span>
        </button>
      </div>
    </div>
  )
}

// ============ WIZARD STEP 6: DEMAND PACKAGE ============
function WizardStep6({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }
  const handleMultiCheckbox = (field, option) => (e) => {
    const current = data[field] || []
    if (e.target.checked) onChange({ ...data, [field]: [...current, option] })
    else onChange({ ...data, [field]: current.filter(item => item !== option) })
  }

  const renderHourlyUI = () => {
    const tradeOptions = [
      "Electrical", "Plumbing", "HVAC", "Carpentry", "Concrete",
      "Steel/Iron", "Roofing", "Painting", "Drywall", "Masonry",
      "Demolition", "General Labor"
    ]
    const roleOptions = ["Foreman", "Journeyman", "Apprentice", "Laborer", "Operator", "Helper"]
    const workScheduleOptions = [
      { value: "day", label: "Day Shift", desc: "Standard hours, Mon-Fri" },
      { value: "weekend", label: "Weekend", desc: "Saturday and/or Sunday shifts" },
      { value: "night", label: "Night Shift", desc: "Overnight hours, overtime potential" },
      { value: "overtime", label: "Overtime", desc: "Extended hours, premium rates apply" }
    ]
    const credentialOptions = [
      "OSHA 10", "OSHA 30", "Lift Certified", "Badge Required",
      "Background Check", "Drug Test", "Security Clearance",
      "Healthcare Cert.", "Trade License", "U.S. Citizen Only"
    ]

    return (
      <>
        <div className="wizardField">
          <div className="wizardFieldHeader"><label className="wizardFieldLabel">TRADE & ROLE</label></div>
          <div className="wizardRow">
            <div className="wizardField">
              <label className="wizardFieldLabel">TRADE *</label>
              <select 
                className="wizardFieldSelect" 
                value={data.demandTrade || ''} 
                onChange={(e) => handleChange('demandTrade', e.target.value)}
              >
                <option value="">Select trade...</option>
                {tradeOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <p className="wizardFieldHint">Defines type of work — used for matching.</p>
            </div>
            <div className="wizardField">
              <label className="wizardFieldLabel">ROLE / SKILL LEVEL *</label>
              <select 
                className="wizardFieldSelect" 
                value={data.demandRole || ''} 
                onChange={(e) => handleChange('demandRole', e.target.value)}
              >
                <option value="">Select role...</option>
                {roleOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
              <p className="wizardFieldHint">Affects rate calculation and worker matching.</p>
            </div>
          </div>
        </div>

        <div className="wizardField">
          <div className="wizardFieldHeader"><label className="wizardFieldLabel">STAFFING</label></div>
          <div className="wizardRow">
            <div className="wizardField">
              <label className="wizardFieldLabel">QUANTITY NEEDED *</label>
              <input 
                type="number" 
                className="wizardFieldInput" 
                placeholder="Number of workers" 
                value={data.demandQuantity || ''} 
                onChange={(e) => handleChange('demandQuantity', e.target.value)} 
              />
              <p className="wizardFieldHint">Supports multiple workers per trade.</p>
            </div>
            <div className="wizardField">
              <label className="wizardFieldLabel">BACKUP QUANTITY</label>
              <input 
                type="number" 
                className="wizardFieldInput" 
                placeholder="Optional reserve" 
                value={data.demandBackup || ''} 
                onChange={(e) => handleChange('demandBackup', e.target.value)} 
              />
              <p className="wizardFieldHint">Reserve workers for waitlist. e.g. 10 needed + 5 backup.</p>
            </div>
          </div>
        </div>

        <div className="wizardField">
          <div className="wizardFieldHeader"><label className="wizardFieldLabel">SCHEDULE</label></div>
          <div className="wizardRow">
            <div className="wizardField">
              <label className="wizardFieldLabel">START DATE *</label>
              <input 
                type="date" 
                className="wizardFieldInput" 
                value={data.demandStartDate || ''} 
                onChange={(e) => handleChange('demandStartDate', e.target.value)} 
              />
              <p className="wizardFieldHint">When workers are needed. Connects to project schedule.</p>
            </div>
            <div className="wizardField">
              <label className="wizardFieldLabel">EXPECTED DURATION *</label>
              <input 
                type="text" 
                className="wizardFieldInput" 
                placeholder="e.g., 2 weeks, 1 month, or date range" 
                value={data.demandDuration || ''} 
                onChange={(e) => handleChange('demandDuration', e.target.value)} 
              />
              <p className="wizardFieldHint">Weeks | Months | Date Range</p>
            </div>
          </div>
        </div>

        <div className="wizardField">
          <div className="wizardFieldHeader">
            <label className="wizardFieldLabel">WORK SCHEDULE</label>
            <span className="wizardFieldRequired">REQUIRED</span>
          </div>
          <div className="wizardCheckboxGrid">
            {workScheduleOptions.map(opt => (
              <label key={opt.value} className="wizardCheckboxLabel">
                <input 
                  type="checkbox" 
                  checked={(data.demandWorkSchedule || []).includes(opt.value)} 
                  onChange={handleMultiCheckbox('demandWorkSchedule', opt.value)} 
                />
                <div>
                  <strong>{opt.label}</strong>
                  <span style={{ display: 'block', fontSize: '12px', color: 'rgba(23,38,58,0.6)' }}>{opt.desc}</span>
                </div>
              </label>
            ))}
          </div>
          <p className="wizardFieldHint">Affects worker availability matching and rate calculations.</p>
        </div>

        <div className="wizardField">
          <div className="wizardFieldHeader">
            <label className="wizardFieldLabel">REQUIRED CREDENTIALS</label>
            <span className="wizardFieldConditional">Conditional</span>
          </div>
          <div className="wizardCheckboxGrid">
            {credentialOptions.map(cred => (
              <label key={cred} className="wizardCheckboxLabel">
                <input 
                  type="checkbox" 
                  checked={(data.demandCredentials || []).includes(cred)} 
                  onChange={handleMultiCheckbox('demandCredentials', cred)} 
                />
                <span>{cred}</span>
              </label>
            ))}
          </div>
          <p className="wizardFieldHint">Select all credentials required for eligibility screening on this package.</p>
        </div>

        <div className="wizardField">
          <div className="wizardFieldHeader"><label className="wizardFieldLabel">NOTES</label></div>
          <div className="wizardRow">
            <div className="wizardField">
              <label className="wizardFieldLabel">Worker-Facing</label>
              <textarea 
                className="wizardFieldTextarea" 
                rows="2" 
                placeholder="Notes visible to workers on their opportunity card..." 
                value={data.demandWorkerNotes || ''} 
                onChange={(e) => handleChange('demandWorkerNotes', e.target.value)} 
              />
              <p className="wizardFieldHint">Do not include sensitive company information, rates, or internal references.</p>
            </div>
            <div className="wizardField">
              <label className="wizardFieldLabel">Internal Only</label>
              <textarea 
                className="wizardFieldTextarea" 
                rows="2" 
                placeholder="Internal notes for TradesMap team..." 
                value={data.demandInternalNotes || ''} 
                onChange={(e) => handleChange('demandInternalNotes', e.target.value)} 
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  const renderLumpSumUI = () => (
    <>
      <div className="wizardField">
        <div className="wizardFieldHeader">
          <label className="wizardFieldLabel">SCOPE DESCRIPTION</label>
          <span className="wizardFieldRequired">REQUIRED</span>
        </div>
        <textarea 
          className="wizardFieldTextarea" 
          placeholder="Describe the requested scope of work. e.g. framing/drywall/ACT package for floors 3-6..." 
          rows="4" 
          value={data.scopeDescription || ''} 
          onChange={(e) => handleChange('scopeDescription', e.target.value)} 
        />
        <p className="wizardFieldHint">Used for construction review. Be specific - include trades, areas, and any known constraints.</p>
      </div>

      <div className="wizardField">
        <div className="wizardFieldHeader">
          <label className="wizardFieldLabel">PLANS/DRAWINGS UPLOAD</label>
          <span className="wizardFieldRequired">REQUIRED</span>
        </div>
        <div className="wizardFileUpload">
          <button type="button" className="wizardUploadBtn" onClick={() => document.getElementById('plansUpload').click()}>
            Click to upload plans & drawings
          </button>
          <input 
            id="plansUpload"
            type="file" 
            style={{ display: 'none' }}
            onChange={(e) => { const file = e.target.files[0]; if (file) handleChange('plansFileName', file.name) }}
            accept=".pdf,.dwg,.jpg,.jpeg,.png"
            multiple
          />
          <span className="wizardFileName">{data.plansFileName || 'No file selected'}</span>
        </div>
        <p className="wizardFieldHint">PDF, DWG, sketches, addenda, specs - up to 50MB each. Required for admin and construction review.</p>
      </div>

      <div className="wizardField">
        <div className="wizardFieldHeader">
          <label className="wizardFieldLabel">SCHEDULE UPLOAD OR DATES</label>
          <span className="wizardFieldRequired">REQUIRED</span>
        </div>
        <div className="wizardFileUpload">
          <button type="button" className="wizardUploadBtn" onClick={() => document.getElementById('scheduleUpload').click()}>
            Upload schedule file
          </button>
          <input 
            id="scheduleUpload"
            type="file" 
            style={{ display: 'none' }}
            onChange={(e) => { const file = e.target.files[0]; if (file) handleChange('scheduleFileName', file.name) }}
            accept=".pdf,.xlsx,.xls,.csv,.mpp"
          />
          <span className="wizardFileName">{data.scheduleFileName || 'No file selected'}</span>
        </div>
        <p className="wizardFieldHint">PDF, Excel, MPP, CSV</p>
        <div className="wizardOrDivider"><span>- or enter dates manually -</span></div>
        <div className="wizardRow">
          <div className="wizardField">
            <label className="wizardFieldLabel">Start Date</label>
            <input type="date" className="wizardFieldInput" value={data.projectStartDate || ''} onChange={(e) => handleChange('projectStartDate', e.target.value)} />
          </div>
          <div className="wizardField">
            <label className="wizardFieldLabel">End Date / Milestone</label>
            <input type="date" className="wizardFieldInput" value={data.projectEndDate || ''} onChange={(e) => handleChange('projectEndDate', e.target.value)} />
          </div>
        </div>
        <p className="wizardFieldHint">Must include start/end or key milestones. Used for risk and manpower planning.</p>
      </div>

      <div className="wizardField">
        <div className="wizardFieldHeader">
          <label className="wizardFieldLabel">REQUESTED TRADE SCOPE</label>
          <span className="wizardFieldRequired">REQUIRED</span>
        </div>
        <div className="wizardTradeGrid">
          {["Electrical","Plumbing","HVAC","Carpentry","Concrete","Steel/Iron","Roofing","Painting","Drywall / Framing","Masonry","General Labor","Demolition"].map(trade => (
            <label key={trade} className="wizardTradeLabel">
              <input 
                type="checkbox" 
                value={trade}
                checked={(data.requestedTrades || []).includes(trade)}
                onChange={(e) => {
                  const current = data.requestedTrades || []
                  if (e.target.checked) handleChange('requestedTrades', [...current, trade])
                  else handleChange('requestedTrades', current.filter(t => t !== trade))
                }}
              />
              <span>{trade}</span>
            </label>
          ))}
        </div>
        <p className="wizardFieldHint">Multiple trades can be selected. Used for estimating and manpower planning.</p>
      </div>

      <div className="wizardField">
        <div className="wizardFieldHeader">
          <label className="wizardFieldLabel">BUDGET / TARGET PRICE</label>
          <span className="wizardFieldOptional">OPTIONAL</span>
        </div>
        <div className="wizardCurrencyInput">
          <span className="currencySymbol">$</span>
          <input 
            type="text" 
            className="wizardFieldInputCurrency" 
            placeholder="0.00" 
            value={data.targetBudget || ''} 
            onChange={(e) => handleChange('targetBudget', e.target.value)} 
          />
        </div>
        <p className="wizardFieldHint">Optional company budget expectation. Helps determine commercial feasibility during review.</p>
      </div>

      <div className="wizardField">
        <div className="wizardFieldHeader">
          <label className="wizardFieldLabel">SUPERINTENDENT PROVIDED BY COMPANY</label>
          <span className="wizardFieldRequired">REQUIRED</span>
        </div>
        <div className="wizardRadioOptions">
          <label className={`wizardRadioCard ${data.superintendentProvided === 'yes' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="superintendentProvided"
              value="yes"
              checked={data.superintendentProvided === 'yes'}
              onChange={(e) => handleChange('superintendentProvided', e.target.value)}
            />
            <div className="wizardRadioContent">
              <strong>Yes — Company provides</strong>
              <span>Your team provides field leadership. TradesMap may supply foreman or pusher support.</span>
            </div>
          </label>
          <label className={`wizardRadioCard ${data.superintendentProvided === 'no' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="superintendentProvided"
              value="no"
              checked={data.superintendentProvided === 'no'}
              onChange={(e) => handleChange('superintendentProvided', e.target.value)}
            />
            <div className="wizardRadioContent">
              <strong>No — Support needed</strong>
              <span>TradesMap will assign field leadership as part of the execution plan.</span>
            </div>
          </label>
        </div>
        <p className="wizardFieldHint">Defines field leadership structure and execution model routing.</p>
      </div>

      <div className="wizardField">
        <div className="wizardFieldHeader">
          <label className="wizardFieldLabel">TRADESMAP FIELD LEAD NEEDED</label>
          <span className="wizardFieldConditional">CONDITIONAL</span>
        </div>
        <div className="wizardRadioOptionsHorizontal">
          <label className={`wizardRadioCardHorizontal ${data.fieldLeadNeeded === 'yes' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="fieldLeadNeeded"
              value="yes"
              checked={data.fieldLeadNeeded === 'yes'}
              onChange={(e) => handleChange('fieldLeadNeeded', e.target.value)}
            />
            <div className="wizardRadioContent">
              <strong>Yes</strong>
              <span>A TradesMap field lead will be assigned to this project.</span>
            </div>
          </label>
          <label className={`wizardRadioCardHorizontal ${data.fieldLeadNeeded === 'no' ? 'active' : ''}`}>
            <input 
              type="radio" 
              name="fieldLeadNeeded"
              value="no"
              checked={data.fieldLeadNeeded === 'no'}
              onChange={(e) => handleChange('fieldLeadNeeded', e.target.value)}
            />
            <div className="wizardRadioContent">
              <strong>No</strong>
              <span>No additional field lead required from TradesMap.</span>
            </div>
          </label>
        </div>
        <p className="wizardFieldHint">Used for execution planning. Determines support role assignment.</p>
      </div>

      <div className="wizardField">
        <div className="wizardFieldHeader">
          <label className="wizardFieldLabel">RISK NOTES</label>
          <span className="wizardFieldOptional">OPTIONAL</span>
        </div>
        <textarea 
          className="wizardFieldTextarea" 
          placeholder="Note any known risks — schedule delays, site access issues, material lead times, productivity concerns, drawing quality, etc."
          rows="4"
          value={data.riskNotes || ''}
          onChange={(e) => handleChange('riskNotes', e.target.value)}
        />
        <p className="wizardFieldHint">Used during review. Helps operations anticipate challenges before mobilization.</p>
      </div>
    </>
  )

  const isValid = data.workType === 'Hourly Workforce Posting'
    ? (data.demandTrade && data.demandRole && data.demandQuantity && data.demandStartDate && data.demandDuration && (data.demandWorkSchedule || []).length > 0)
    : (data.workType === 'Lump Sum / Execution Support'
        ? (data.scopeDescription && data.plansFileName && (data.scheduleFileName || (data.projectStartDate && data.projectEndDate)) && (data.requestedTrades || []).length > 0 && data.superintendentProvided)
        : false)

  return (
    <div className="wizardStep">
      <h2 className="wizardStepTitle">
        {data.workType === 'Hourly Workforce Posting' ? 'Demand Package Details' : 'Execution Support Details'}
      </h2>
      <p className="wizardStepSubtitle"></p>
      <div className="wizardForm">
        {data.workType === 'Hourly Workforce Posting' && renderHourlyUI()}
        {data.workType === 'Lump Sum / Execution Support' && renderLumpSumUI()}
      </div>
      <div className="wizardActions">
        <button className="wizardPillBtn wizardPillBtnSecondary" onClick={onBack}>
          <span className="wizardPillBtnIcon"><IconArrowLeft /></span>
          <span className="wizardPillBtnLabel">Back</span>
        </button>
        <button className="wizardPillBtn wizardPillBtnPrimary" onClick={onNext} disabled={!isValid}>
          <span className="wizardPillBtnLabel">Next</span>
          <span className="wizardPillBtnIcon"><IconArrowRight /></span>
        </button>
      </div>
    </div>
  )
}

// ============ WIZARD STEP 7: REVIEW & SUBMIT ============
function WizardStep7({ data, onBack, onSubmit }) {
  return (
    <div className="wizardStep">
      <h2 className="wizardStepTitle">Review & Submit</h2>
      <p className="wizardStepSubtitle"></p>
      
      <div className="wizardReview">
        <div className="wizardReviewSection">
          <h3 className="wizardReviewTitle">Basic Information</h3>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Project Name:</span>
            <span className="wizardReviewValue">{data.projectName || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Project Number:</span>
            <span className="wizardReviewValue">{data.companyProjectNumber || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Project Type:</span>
            <span className="wizardReviewValue">{data.projectType || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Description:</span>
            <span className="wizardReviewValue">{data.projectDescription || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Contact:</span>
            <span className="wizardReviewValue">{data.projectContact || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Duration:</span>
            <span className="wizardReviewValue">{data.estimatedDuration || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Company Note:</span>
            <span className="wizardReviewValue">{data.companyNote || '-'}</span>
          </div>
        </div>

        <div className="wizardReviewSection">
          <h3 className="wizardReviewTitle">Location & Work Radius</h3>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Address:</span>
            <span className="wizardReviewValue">{data.address || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">City:</span>
            <span className="wizardReviewValue">{data.city || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">County:</span>
            <span className="wizardReviewValue">{data.county || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">State:</span>
            <span className="wizardReviewValue">{data.state || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">ZIP:</span>
            <span className="wizardReviewValue">{data.zip || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Site:</span>
            <span className="wizardReviewValue">{data.site || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Access Instructions:</span>
            <span className="wizardReviewValue">{data.accessInstructions || '-'}</span>
          </div>
        </div>

        <div className="wizardReviewSection">
          <h3 className="wizardReviewTitle">Project Classification</h3>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Project Sector:</span>
            <span className="wizardReviewValue">{data.projectSector || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Funding Type:</span>
            <span className="wizardReviewValue">{data.fundingType || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Prevailing Wage:</span>
            <span className="wizardReviewValue">{data.prevailingWageFlag ? 'ON' : 'OFF'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Certified Payroll:</span>
            <span className="wizardReviewValue">{data.certifiedPayrollFlag ? 'ON' : 'OFF'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Secure Site:</span>
            <span className="wizardReviewValue">{data.secureSiteFlag ? 'ON' : 'OFF'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Classification Notes:</span>
            <span className="wizardReviewValue">{data.classificationNotes || '-'}</span>
          </div>
        </div>

        <div className="wizardReviewSection">
          <h3 className="wizardReviewTitle">Special Requirements</h3>
          <div className="wizardReviewGrid">
            <div>
              <strong>WAGE & PAYROLL:</strong>
              <ul>
                <li>Davis-Bacon: {data.davisBaconFlag ? '✓' : '✗'}</li>
                <li>State Prevailing Wage: {data.statePrevailingWageFlag ? '✓' : '✗'}</li>
                <li>Local Prevailing Wage: {data.localPrevailingWageFlag ? '✓' : '✗'}</li>
                <li>Certified Payroll: {data.certifiedPayrollRequiredFlag ? '✓' : '✗'}</li>
                <li>Union Requirement: {data.unionRequirementFlag ? '✓' : '✗'}</li>
              </ul>
            </div>
            <div>
              <strong>WORKER ELIGIBILITY:</strong>
              <ul>
                <li>Background Check: {data.backgroundCheckFlag ? '✓' : '✗'}</li>
                <li>Drug Test: {data.drugTestFlag ? '✓' : '✗'}</li>
                <li>OSHA 10: {data.osha10Flag ? '✓' : '✗'}</li>
                <li>OSHA 30: {data.osha30Flag ? '✓' : '✗'}</li>
                <li>U.S. Citizen Only: {data.usCitizenOnlyFlag ? '✓' : '✗'}</li>
                <li>Healthcare Facility: {data.healthcareFacilityFlag ? '✓' : '✗'}</li>
              </ul>
            </div>
            <div>
              <strong>SITE ACCESS:</strong>
              <ul>
                <li>Badge Required: {data.badgeRequiredFlag ? '✓' : '✗'}</li>
                <li>Security Clearance: {data.securityClearanceFlag ? '✓' : '✗'}</li>
                <li>Airport Access: {data.airportAccessFlag ? '✓' : '✗'}</li>
                <li>Port Access: {data.portAccessFlag ? '✓' : '✗'}</li>
                <li>Military Base: {data.militaryBaseAccessFlag ? '✓' : '✗'}</li>
                <li>NASA Access: {data.nasaAccessFlag ? '✓' : '✗'}</li>
              </ul>
            </div>
            <div>
              <strong>LOGISTICS & SCHEDULE:</strong>
              <ul>
                <li>Travel Required: {data.travelRequiredFlag ? '✓' : '✗'}</li>
                <li>Per Diem Required: {data.perDiemRequiredFlag ? '✓' : '✗'}</li>
                <li>Hotel Required: {data.hotelRequiredFlag ? '✓' : '✗'}</li>
                <li>Night Shift: {data.nightShiftFlag ? '✓' : '✗'}</li>
                <li>Weekend Shift: {data.weekendShiftFlag ? '✓' : '✗'}</li>
                <li>High Urgency: {data.highUrgencyFlag ? '✓' : '✗'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="wizardReviewSection">
          <h3 className="wizardReviewTitle">Work Type & Details</h3>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Work Type:</span>
            <span className="wizardReviewValue">{data.workType || '-'}</span>
          </div>
          {data.workType === 'Hourly Workforce Posting' && (
            <>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Primary Trade:</span>
                <span className="wizardReviewValue">{data.primaryTrade || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Management Style:</span>
                <span className="wizardReviewValue">{data.managementStyle === 'self-managed' ? 'Self-Managed' : 'Support Needed'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Urgency:</span>
                <span className="wizardReviewValue">{data.urgencyLevel || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Demand Trade:</span>
                <span className="wizardReviewValue">{data.demandTrade || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Role/Skill:</span>
                <span className="wizardReviewValue">{data.demandRole || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Quantity/Backup:</span>
                <span className="wizardReviewValue">{data.demandQuantity || '0'} / {data.demandBackup || '0'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Schedule:</span>
                <span className="wizardReviewValue">Start {data.demandStartDate || '-'}, Duration {data.demandDuration || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Work Schedules:</span>
                <span className="wizardReviewValue">{(data.demandWorkSchedule || []).join(', ') || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Credentials:</span>
                <span className="wizardReviewValue">{(data.demandCredentials || []).join(', ') || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Worker Notes:</span>
                <span className="wizardReviewValue">{data.demandWorkerNotes || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Internal Notes:</span>
                <span className="wizardReviewValue">{data.demandInternalNotes || '-'}</span>
              </div>
            </>
          )}
          {data.workType === 'Lump Sum / Execution Support' && (
            <>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Scope Description:</span>
                <span className="wizardReviewValue">{data.scopeDescription || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Plans:</span>
                <span className="wizardReviewValue">{data.plansFileName || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Schedule:</span>
                <span className="wizardReviewValue">{data.scheduleFileName || (data.projectStartDate ? `${data.projectStartDate} to ${data.projectEndDate}` : '-')}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Requested Trades:</span>
                <span className="wizardReviewValue">{(data.requestedTrades || []).join(', ') || '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Target Budget:</span>
                <span className="wizardReviewValue">{data.targetBudget ? `$${data.targetBudget}` : '-'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Superintendent:</span>
                <span className="wizardReviewValue">{data.superintendentProvided === 'yes' ? 'Company Provides' : 'Support Needed'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Field Lead:</span>
                <span className="wizardReviewValue">{data.fieldLeadNeeded === 'yes' ? 'Yes' : 'No'}</span>
              </div>
              <div className="wizardReviewRow">
                <span className="wizardReviewLabel">Risk Notes:</span>
                <span className="wizardReviewValue">{data.riskNotes || '-'}</span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="wizardActions">
        <button className="wizardPillBtn wizardPillBtnSecondary" onClick={onBack}>
          <span className="wizardPillBtnIcon"><IconArrowLeft /></span>
          <span className="wizardPillBtnLabel">Back</span>
        </button>
        <button className="wizardPillBtn wizardPillBtnSuccess" onClick={onSubmit}>
          <span className="wizardPillBtnLabel">Submit Project</span>
          <span className="wizardPillBtnIcon"><IconCheck /></span>
        </button>
      </div>
    </div>
  )
}

// ============ MAIN WIZARD COMPONENT ============
function ProjectWizard({ onComplete, onCancel }) {
  const [step, setStep] = useState(1)
  const [wizardData, setWizardData] = useState({
    // Step 1
    projectName: '',
    companyProjectNumber: '',
    projectType: '',
    projectDescription: '',
    projectContact: '',
    estimatedDuration: '',
    companyNote: '',
    // Step 2
    address: '',
    city: '',
    county: '',
    state: '',
    zip: '',
    site: '',
    accessInstructions: '',
    // Step 3
    projectSector: '',
    fundingType: '',
    prevailingWageFlag: false,
    certifiedPayrollFlag: false,
    secureSiteFlag: false,
    classificationNotes: '',
    // Step 4
    davisBaconFlag: false,
    statePrevailingWageFlag: false,
    localPrevailingWageFlag: false,
    certifiedPayrollRequiredFlag: false,
    unionRequirementFlag: false,
    backgroundCheckFlag: false,
    drugTestFlag: false,
    osha10Flag: false,
    osha30Flag: false,
    usCitizenOnlyFlag: false,
    healthcareFacilityFlag: false,
    badgeRequiredFlag: false,
    securityClearanceFlag: false,
    airportAccessFlag: false,
    portAccessFlag: false,
    militaryBaseAccessFlag: false,
    nasaAccessFlag: false,
    travelRequiredFlag: false,
    perDiemRequiredFlag: false,
    hotelRequiredFlag: false,
    nightShiftFlag: false,
    weekendShiftFlag: false,
    highUrgencyFlag: false,
    // Step 5
    workType: '',
    primaryTrade: '',
    managementStyle: '',
    urgencyLevel: '',
    // Step 6 - Hourly
    demandTrade: '',
    demandRole: '',
    demandQuantity: '',
    demandBackup: '',
    demandStartDate: '',
    demandDuration: '',
    demandWorkSchedule: [],
    demandCredentials: [],
    demandWorkerNotes: '',
    demandInternalNotes: '',
    // Step 6 - Lump Sum
    scopeDescription: '',
    plansFileName: '',
    scheduleFileName: '',
    projectStartDate: '',
    projectEndDate: '',
    requestedTrades: [],
    targetBudget: '',
    superintendentProvided: '',
    fieldLeadNeeded: '',
    riskNotes: ''
  })

  const updateWizardData = (newData) => {
    setWizardData(newData)
  }

  const handleNext = () => setStep(step + 1)
  const handleBack = () => setStep(step - 1)

  const handleSubmit = () => {
    const newProject = { ...wizardData, id: Date.now(), createdAt: new Date().toISOString() }
    onComplete(newProject)
  }

  const stepNames = ['Basic Info', 'Location', 'Classification', 'Requirements', 'Work Type', 'Demand Package', 'Review']

  return (
    <div className="projectWizard">
      <div className="wizardStickyHeader">
       
        <div className="wizardSteps">
          {stepNames.map((name, idx) => (
            <div key={idx} className={`wizardStepIndicator ${step > idx + 1 ? 'completed' : ''} ${step === idx + 1 ? 'active' : ''}`}>
              <div className="wizardStepCircle">{step > idx + 1 ? <IconCheck /> : idx + 1}</div>
              <span className="wizardStepName">{name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="wizardContent">
        {step === 1 && <WizardStep1 data={wizardData} onChange={updateWizardData} onNext={handleNext} />}
        {step === 2 && <WizardStep2 data={wizardData} onChange={updateWizardData} onNext={handleNext} onBack={handleBack} />}
        {step === 3 && <WizardStep3 data={wizardData} onChange={updateWizardData} onNext={handleNext} onBack={handleBack} />}
        {step === 4 && <WizardStep4 data={wizardData} onChange={updateWizardData} onNext={handleNext} onBack={handleBack} />}
        {step === 5 && <WizardStep5 data={wizardData} onChange={updateWizardData} onNext={handleNext} onBack={handleBack} />}
        {step === 6 && <WizardStep6 data={wizardData} onChange={updateWizardData} onNext={handleNext} onBack={handleBack} />}
        {step === 7 && <WizardStep7 data={wizardData} onBack={handleBack} onSubmit={handleSubmit} />}
      </div>
    </div>
  )
}

// ============ MAIN PROJECT PAGE COMPONENT ============
export default function ProjectPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [showWizard, setShowWizard] = useState(false)

  const handleAddProject = () => setShowWizard(true)
  const handleWizardComplete = (newProject) => {
    setProjects([...projects, newProject])
    setShowWizard(false)
  }
  const handleWizardCancel = () => setShowWizard(false)

  return (
    <div className="appShell">
      <header className="topbar topbarSolid">
        <div className="topbarInner">
          <a href="/" className="brand brandLink">
            <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
          </a>
          <div className="topbarCenter">
            <div className="topbarSearch">
              <span className="topbarSearchIcon"><IconSearch /></span>
              <input className="topbarSearchInput" type="search" placeholder="Search" />
            </div>
          </div>
          <nav className="navActions">
            <div className="navActionsSolid">
              <button type="button" className="navIconButton"><IconBell /><span className="navIconBadge">3</span></button>
              <img className="topbarAvatar" src="/assets/worker.avif" alt="Avatar" />
            </div>
          </nav>
        </div>
      </header>
      
      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue">
          <div className="sideNavHeader">
            <div className="sideMark"><img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" /></div>
            <div className="sideMeta"><div className="sideTitle">Tradesmap</div></div>
          </div>
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup">
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/></svg></span>
                <span className="sideText">Overview</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/></svg></span>
                <span className="sideText">Projects</span>
                <span className="sideBadge">{projects.length}</span>
              </a>
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/></svg></span>
                <span className="sideText">Revenues</span>
              </span>
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/></svg></span>
                <span className="sideText">Profile</span>
              </span>
            </nav>
          </div>
          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/company/login')}>
                <span className="sideIcon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/></svg></span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/></svg></span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>
        
        <main className="appContent">
          {showWizard ? (
            <ProjectWizard onComplete={handleWizardComplete} onCancel={handleWizardCancel} />
          ) : (
            <div className="projectPage">
              <div className="projectHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div><h1 className="projectTitle">Projects</h1><p className="projectSubtitle">Manage your construction projects</p></div>
                <button className="projectBtn projectBtnPrimary" onClick={handleAddProject} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><IconPlus /> Add Project</button>
              </div>
              {projects.length === 0 ? (
                <div className="projectSection" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center', minHeight: '400px' }}>
                  <div style={{ color: 'rgba(23, 38, 58, 0.45)', marginBottom: '16px' }}><IconFolder /></div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'rgba(23, 38, 58, 0.72)', margin: '0 0 8px 0' }}>No Projects Yet</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(23, 38, 58, 0.55)', margin: '0 0 24px 0' }}>Click the "Add Project" button to create your first project</p>
                  <button className="projectBtn projectBtnPrimary" onClick={handleAddProject} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><IconPlus /> Add Project</button>
                </div>
              ) : (
                <div className="projectSection">
                  <div className="projectList">
                    {projects.map(project => (
                      <div key={project.id} className="projectCard">
                        <h3>{project.projectName}</h3>
                        <p>{project.projectDescription || 'No description provided'}</p>
                        <div className="projectCardMeta">
                          <span>📅 Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                          <span>👥 {project.workerCount || 0} workers</span>
                        </div>
                        <small>Work Type: {project.workType || 'Not specified'}</small>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <style>{`
        /* ========== BASE & RESET ========== */
        :root {
          --pageMax: 1200px;
          --cardRadius: 14px;
          --shadow: 0 24px 60px rgba(18, 38, 63, 0.24);
          --text: #17263a;
          --muted: rgba(23, 38, 58, 0.65);
          --line: rgba(18, 38, 63, 0.12);
          --tabBg: rgba(15, 23, 42, 0.04);
          --blue: #0f4ea9;
          --blue2: #0b3f90;
          --green: #2fb463;
        }
        * { box-sizing: border-box; }
        html, body { height: 100%; }
        body {
          margin: 0;
          font-family: ui-sans-serif, system-ui, "Inter", "SF Pro Display", sans-serif;
          color: var(--text);
          overflow: hidden;
        }
        a { color: inherit; }
        
        /* ========== APP SHELL ========== */
        .appShell {
          height: 100vh;
          overflow: hidden;
          background: radial-gradient(circle at 18% 12%, rgba(15,78,169,0.14) 0%, rgba(255,255,255,0) 55%),
                      radial-gradient(circle at 80% 20%, rgba(47,180,99,0.1) 0%, rgba(255,255,255,0) 55%),
                      linear-gradient(180deg, #f8faff 0%, #f3f6fc 100%);
        }
        .appShellBody {
          max-width: var(--pageMax);
          margin: 0 auto;
          padding: 0 22px 22px;
          height: calc(100vh - 110px);
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 22px;
        }
        .appShellBodyVerify {
          max-width: 100%;
          margin: 0;
          padding: 16px 22px 0 22px;
        }
        .appContent {
          overflow: auto;
          scrollbar-width: none;
        }
        .appContent::-webkit-scrollbar { width: 0; height: 0; }
        
        /* ========== TOPBAR ========== */
        .topbar { position: relative; z-index: 2; width: 100%; }
        .topbarInner {
          max-width: var(--pageMax);
          margin: 0 auto;
          padding: 18px 22px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 18px;
        }
        .topbarSolid .topbarInner { max-width: none; margin: 0; padding: 10px 22px; }
        .topbarSolid {
          background: rgba(255,255,255,0.78);
          border-bottom: 1px solid rgba(18,38,63,0.08);
          backdrop-filter: blur(12px);
        }
        .brandLogo { width: 252px; height: 64px; object-fit: contain; }
        .topbarSolid .brandLogo { width: 268px; height: 54px; }
        .topbarSearch {
          width: min(420px,100%);
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.62);
          border: 1px solid rgba(18,38,63,0.12);
          backdrop-filter: blur(10px);
        }
        .topbarAvatar {
          width: 38px; height: 38px;
          border-radius: 999px;
          object-fit: cover;
          border: 1px solid rgba(18,38,63,0.12);
        }
        .navIconButton {
          position: relative;
          width: 44px; height: 44px;
          border-radius: 999px;
          border: 1px solid rgba(18,38,63,0.12);
          background: rgba(255,255,255,0.62);
          cursor: pointer;
        }
        .navIconBadge {
          position: absolute;
          top: -4px; right: -4px;
          min-width: 18px; height: 18px;
          border-radius: 999px;
          background: linear-gradient(180deg, #2fb463 0%, #16a053 100%);
          color: white;
          font-size: 11px;
          font-weight: 900;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        
        /* ========== SIDENAV ========== */
        .sideNav {
          height: 100%;
          border-radius: 18px;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(18,38,63,0.08);
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
        }
        .sideNavBlue {
          background: rgba(255,255,255,0.72);
          backdrop-filter: blur(12px);
        }
        .sideItem {
          display: grid;
          grid-template-columns: 22px 1fr auto;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border-radius: 14px;
          font-weight: 800;
          color: rgba(23,38,58,0.72);
          text-decoration: none;
          cursor: pointer;
        }
        .sideItemActive {
          background: linear-gradient(180deg, var(--blue) 0%, var(--blue2) 100%);
          color: white;
        }
        .sideBadge {
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.18);
          font-size: 12px;
          font-weight: 900;
        }
        .sideGroupLabel {
          padding: 14px 10px 8px;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1.4px;
          text-transform: uppercase;
          color: rgba(23,38,58,0.35);
        }
        
        /* ========== WIZARD STYLES ========== */
        .projectWizard {
          background: rgba(255,255,255,0.96);
          border-radius: 20px;
          border: 1px solid rgba(18,38,63,0.08);
          box-shadow: 0 24px 60px rgba(18,38,63,0.2);
          overflow: visible;
          position: relative;
          max-height: calc(100vh - 40px);
          display: flex;
          flex-direction: column;
        }
        .wizardStickyHeader {
          position: sticky;
          top: 0;
          background: rgba(255,255,255,0.98);
          backdrop-filter: blur(10px);
          z-index: 20;
          border-bottom: 1px solid rgba(18,38,63,0.08);
          border-radius: 20px 20px 0 0;
        }
        .wizardCloseWrapper {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 30;
        }
        .wizardCloseBtn {
          width: 32px; height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(18,38,63,0.1);
          background: rgba(255,255,255,0.95);
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .wizardSteps {
          display: flex;
          padding: 24px 48px 16px 24px;
          gap: 8px;
          background: rgba(255,255,255,0.98);
        }
        .wizardStepIndicator {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
        }
        .wizardStepIndicator:not(:last-child):before {
          content: '';
          position: absolute;
          top: 18px;
          left: 50%;
          width: 100%;
          height: 2px;
          background: rgba(18,38,63,0.1);
          z-index: 0;
        }
        .wizardStepIndicator.completed:not(:last-child):before { background: var(--green); }
        .wizardStepCircle {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: white;
          border: 2px solid rgba(18,38,63,0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 14px;
          color: rgba(23,38,58,0.6);
          position: relative;
          z-index: 1;
        }
        .wizardStepIndicator.active .wizardStepCircle {
          border-color: var(--blue);
          background: linear-gradient(180deg, var(--blue) 0%, var(--blue2) 100%);
          color: white;
        }
        .wizardStepIndicator.completed .wizardStepCircle {
          border-color: var(--green);
          background: var(--green);
          color: white;
        }
        .wizardStepName {
          font-size: 11px;
          font-weight: 700;
          color: rgba(23,38,58,0.6);
          text-align: center;
          white-space: nowrap;
        }
        .wizardStepIndicator.active .wizardStepName { color: var(--blue); font-weight: 900; }
        .wizardContent {
          padding: 24px;
          overflow-y: auto;
          flex: 1;
          max-height: calc(100vh - 200px);
        }
        .wizardContent::-webkit-scrollbar { width: 6px; }
        .wizardContent::-webkit-scrollbar-track { background: rgba(18,38,63,0.05); border-radius: 10px; }
        .wizardContent::-webkit-scrollbar-thumb { background: rgba(15,78,169,0.3); border-radius: 10px; }
        
        /* ========== FORM ELEMENTS ========== */
        .wizardStep { animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity:0; transform:translateX(20px); } to { opacity:1; transform:translateX(0); } }
        .wizardStepTitle { font-size: 18px; font-weight: 900; margin: 0 0 8px; }
        .wizardStepSubtitle { font-size: 13px; color: rgba(23,38,58,0.6); margin: 0 0 24px; }
        .wizardForm { display: flex; flex-direction: column; gap: 20px; }
        .wizardField { display: flex; flex-direction: column; gap: 8px; }
        .wizardFieldLabel { font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.3px; color: rgba(23,38,58,0.75); }
        .wizardFieldHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .wizardFieldRequired, .wizardFieldConditional, .wizardFieldOptional {
          font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: 20px;
        }
        .wizardFieldRequired { color: #ef4444; background: rgba(239,68,68,0.1); }
        .wizardFieldConditional { color: #f59e0b; background: rgba(245,158,11,0.1); }
        .wizardFieldOptional { color: rgba(23,38,58,0.5); background: rgba(18,38,63,0.08); }
        .wizardFieldInput, .wizardFieldSelect, .wizardFieldTextarea {
          padding: 12px 16px;
          border: 1.5px solid rgba(18,38,63,0.1);
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          background: white;
        }
        .wizardFieldInput:focus, .wizardFieldSelect:focus, .wizardFieldTextarea:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(15,78,169,0.1);
        }
        .wizardFieldHint { font-size: 12px; color: rgba(23,38,58,0.55); margin-top: 4px; font-weight: 500; }
        .wizardFieldFootnote { font-size: 11px; color: rgba(23,38,58,0.5); margin-top: 6px; font-style: italic; }
        .wizardRow { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .wizardGrid4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .wizardSectionDivider { margin: 16px 0 12px; padding-bottom: 8px; border-bottom: 2px solid rgba(15,78,169,0.15); }
        .wizardSectionTitle { font-size: 16px; font-weight: 900; color: rgba(23,38,58,0.85); margin: 0; }
        
        /* ========== TOGGLE BUTTONS ========== */
        .wizardToggleItem {
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(18,38,63,0.08);
          border-radius: 16px;
          padding: 16px;
          margin-bottom: 12px;
        }
        .wizardToggleHeader { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .wizardToggleLabel { font-weight: 800; font-size: 15px; }
        .wizardToggleSwitch {
          display: flex;
          background: rgba(18,38,63,0.08);
          border-radius: 40px;
          padding: 3px;
          gap: 2px;
          width: 52px;
          height: 28px;
        }
        .wizardToggleOption {
          flex: 1;
          border: none;
          border-radius: 40px;
          cursor: pointer;
          background: transparent;
        }
        .wizardToggleOption.active {
          background: linear-gradient(180deg, var(--blue) 0%, var(--blue2) 100%);
        }
        .wizardToggleHint { font-size: 13px; color: rgba(23,38,58,0.6); margin: 0; }
        
        /* ========== CHECKBOX GRIDS ========== */
        .wizardFlagsNote {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(15,78,169,0.06);
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 8px;
        }
        .wizardCategorySection { margin-bottom: 24px; }
        .wizardCategoryTitle {
          font-size: 15px;
          font-weight: 900;
          margin: 0 0 12px;
          padding-bottom: 6px;
          border-bottom: 2px solid rgba(15,78,169,0.15);
        }
        .wizardCheckboxGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }
        .wizardCheckboxLabel {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 12px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(18,38,63,0.08);
          border-radius: 12px;
          cursor: pointer;
        }
        .wizardCheckboxLabel:hover { background: rgba(15,78,169,0.04); border-color: rgba(15,78,169,0.2); }
        .wizardCheckboxLabel input { accent-color: var(--blue); width: 18px; height: 18px; cursor: pointer; }
        
        /* ========== TRADE GRID ========== */
        .wizardTradeGrid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .wizardTradeLabel {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(18,38,63,0.08);
          border-radius: 12px;
          cursor: pointer;
          font-weight: 600;
        }
        .wizardTradeLabel:hover { background: rgba(15,78,169,0.04); }
        .wizardTradeLabel input { accent-color: var(--blue); width: 16px; height: 16px; }
        
        /* ========== MANAGEMENT & URGENCY CARDS ========== */
        .wizardManagementOptions, .wizardUrgencyOptions { display: flex; flex-direction: column; gap: 12px; }
        .wizardManagementCard, .wizardUrgencyCard {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(18,38,63,0.08);
          border-radius: 16px;
          cursor: pointer;
        }
        .wizardManagementCard.active, .wizardUrgencyCard.active {
          border-color: var(--blue);
          background: rgba(15,78,169,0.04);
        }
        .wizardManagementContent strong, .wizardUrgencyContent strong { font-size: 14px; font-weight: 800; display: block; }
        .wizardManagementContent span, .wizardUrgencyContent span { font-size: 13px; color: rgba(23,38,58,0.65); }
        
        /* ========== FILE UPLOAD ========== */
        .wizardFileUpload {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          padding: 16px;
          background: rgba(15,78,169,0.04);
          border: 1px dashed rgba(15,78,169,0.25);
          border-radius: 12px;
        }
        .wizardUploadBtn {
          padding: 10px 20px;
          background: linear-gradient(180deg, var(--blue) 0%, var(--blue2) 100%);
          color: white;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          cursor: pointer;
        }
        .wizardFileName { font-size: 13px; color: rgba(23,38,58,0.65); }
        .wizardOrDivider { text-align: center; margin: 16px 0; position: relative; }
        .wizardOrDivider span { background: rgba(255,255,255,0.96); padding: 0 12px; font-size: 12px; }
        .wizardOrDivider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: rgba(18,38,63,0.1); z-index: -1; }
        .wizardCurrencyInput {
          display: flex;
          align-items: center;
          border: 1.5px solid rgba(18,38,63,0.1);
          border-radius: 12px;
          background: white;
          overflow: hidden;
        }
        .currencySymbol { padding: 12px 0 12px 16px; background: rgba(15,78,169,0.04); font-weight: 600; }
        .wizardFieldInputCurrency { flex: 1; padding: 12px 16px; border: none; outline: none; }
        
        /* ========== RADIO CARDS ========== */
        .wizardRadioOptions { display: flex; flex-direction: column; gap: 12px; }
        .wizardRadioCard, .wizardRadioCardHorizontal {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: rgba(255,255,255,0.96);
          border: 1px solid rgba(18,38,63,0.08);
          border-radius: 16px;
          cursor: pointer;
        }
        .wizardRadioCard.active, .wizardRadioCardHorizontal.active { border-color: var(--blue); background: rgba(15,78,169,0.04); }
        .wizardRadioOptionsHorizontal { display: flex; gap: 16px; }
        
        /* ========== PILL BUTTONS ========== */
        .wizardActions { display: flex; justify-content: space-between; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(18,38,63,0.08); }
        .wizardPillBtn {
          display: inline-flex;
          align-items: stretch;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(18,38,63,0.12);
          box-shadow: 0 16px 34px rgba(18,38,63,0.12);
          cursor: pointer;
        }
        .wizardPillBtnLabel { padding: 12px 18px; min-width: 110px; font-weight: 950; text-align: center; background: transparent; }
        .wizardPillBtnIcon {
          width: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #94a3b8 0%, #64748b 100%);
          color: white;
        }
        .wizardPillBtnPrimary .wizardPillBtnIcon { background: linear-gradient(180deg, var(--blue) 0%, var(--blue2) 100%); }
        .wizardPillBtnSuccess .wizardPillBtnIcon { background: linear-gradient(180deg, var(--green) 0%, #249c54 100%); }
        .wizardPillBtn:disabled { opacity: 0.5; cursor: not-allowed; }
        
        /* ========== REVIEW SECTION ========== */
        .wizardReview { display: flex; flex-direction: column; gap: 24px; }
        .wizardReviewSection { background: rgba(15,78,169,0.04); border-radius: 16px; padding: 16px; }
        .wizardReviewTitle { font-size: 14px; font-weight: 900; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(18,38,63,0.08); }
        .wizardReviewRow { display: flex; padding: 8px 0; font-size: 13px; }
        .wizardReviewLabel { width: 140px; font-weight: 800; color: rgba(23,38,58,0.6); }
        .wizardReviewValue { flex: 1; font-weight: 600; color: rgba(23,38,58,0.85); }
        .wizardReviewGrid { display: grid; grid-template-columns: repeat(2,1fr); gap: 16px; }
        .wizardReviewGrid ul { margin: 8px 0 0; padding-left: 20px; }
        
        /* ========== PROJECT LIST ========== */
        .projectPage { padding: 24px 0; max-width: 100%; }
        .projectHeader { margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center; }
        .projectTitle { font-size: 28px; font-weight: 900; margin: 0 0 8px; }
        .projectSubtitle { font-size: 14px; color: rgba(23,38,58,0.65); margin: 0; font-weight: 600; }
        .projectSection { background: rgba(255,255,255,0.92); border: 1px solid rgba(18,38,63,0.08); border-radius: 16px; padding: 24px; }
        .projectBtnPrimary {
          background: linear-gradient(180deg, var(--green) 0%, #249c54 100%);
          color: white;
          padding: 12px 28px;
          border-radius: 12px;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }
        .projectList { display: grid; gap: 16px; }
        .projectCard {
          padding: 16px;
          border: 1px solid rgba(18,38,63,0.08);
          border-radius: 12px;
          background: rgba(255,255,255,0.9);
          transition: all 0.2s;
        }
        .projectCard:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(18,38,63,0.1); }
        .projectCard h3 { margin: 0 0 8px; font-size: 16px; font-weight: 900; color: var(--blue); }
        .projectCardMeta { display: flex; gap: 16px; margin-bottom: 8px; font-size: 12px; color: rgba(23,38,63,0.6); }
        
        /* ========== RESPONSIVE ========== */
        @media (max-width: 768px) {
          .wizardRow, .wizardGrid4, .wizardCheckboxGrid, .wizardTradeGrid, .wizardReviewGrid { grid-template-columns: 1fr; }
          .wizardRadioOptionsHorizontal { flex-direction: column; }
          .wizardFileUpload { flex-direction: column; align-items: stretch; }
          .wizardSteps { flex-direction: column; align-items: flex-start; padding: 20px 40px 12px 16px; }
          .wizardStepName { white-space: normal; font-size: 9px; }
          .wizardStepCircle { width: 30px; height: 30px; font-size: 12px; }
          .wizardStepIndicator:not(:last-child):before { display: none; }
          .wizardReviewRow { flex-direction: column; gap: 4px; }
          .wizardReviewLabel { width: auto; }
        }
      `}</style>
    </div>
  )
}