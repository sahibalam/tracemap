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
      <p className="wizardStepSubtitle">
      </p>
      
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
        {/* Flags selected note */}
        <div className="wizardFlagsNote">
          <span className="wizardFlagsNoteIcon">📌</span>
          <span className="wizardFlagsNoteText">Flags selected - Triggers admin review or automatic matching rule</span>
        </div>

        {/* WAGE & PAYROLL */}
        <div className="wizardCategorySection">
          <h3 className="wizardCategoryTitle">WAGE & PAYROLL</h3>
          <div className="wizardCheckboxGrid">
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.davisBaconFlag || false}
                onChange={handleCheckboxChange('davisBaconFlag')}
              />
              <span>Davis-Bacon / Federal Prevailing Wage</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.statePrevailingWageFlag || false}
                onChange={handleCheckboxChange('statePrevailingWageFlag')}
              />
              <span>State Prevailing Wage</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.localPrevailingWageFlag || false}
                onChange={handleCheckboxChange('localPrevailingWageFlag')}
              />
              <span>Local Prevailing Wage</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.certifiedPayrollRequiredFlag || false}
                onChange={handleCheckboxChange('certifiedPayrollRequiredFlag')}
              />
              <span>Certified Payroll</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.unionRequirementFlag || false}
                onChange={handleCheckboxChange('unionRequirementFlag')}
              />
              <span>Union / PLA Requirement</span>
            </label>
          </div>
        </div>

        {/* WORKER ELIGIBILITY */}
        <div className="wizardCategorySection">
          <h3 className="wizardCategoryTitle">WORKER ELIGIBILITY</h3>
          <div className="wizardCheckboxGrid">
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.backgroundCheckFlag || false}
                onChange={handleCheckboxChange('backgroundCheckFlag')}
              />
              <span>Background Check</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.drugTestFlag || false}
                onChange={handleCheckboxChange('drugTestFlag')}
              />
              <span>Drug Test</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.osha10Flag || false}
                onChange={handleCheckboxChange('osha10Flag')}
              />
              <span>OSHA 10</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.osha30Flag || false}
                onChange={handleCheckboxChange('osha30Flag')}
              />
              <span>OSHA 30</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.usCitizenOnlyFlag || false}
                onChange={handleCheckboxChange('usCitizenOnlyFlag')}
              />
              <span>U.S. Citizen Only</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.healthcareFacilityFlag || false}
                onChange={handleCheckboxChange('healthcareFacilityFlag')}
              />
              <span>Healthcare Facility Requirements</span>
            </label>
          </div>
        </div>

        {/* SITE ACCESS */}
        <div className="wizardCategorySection">
          <h3 className="wizardCategoryTitle">SITE ACCESS</h3>
          <div className="wizardCheckboxGrid">
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.badgeRequiredFlag || false}
                onChange={handleCheckboxChange('badgeRequiredFlag')}
              />
              <span>Badge Required</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.securityClearanceFlag || false}
                onChange={handleCheckboxChange('securityClearanceFlag')}
              />
              <span>Security Clearance</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.airportAccessFlag || false}
                onChange={handleCheckboxChange('airportAccessFlag')}
              />
              <span>Airport Access</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.portAccessFlag || false}
                onChange={handleCheckboxChange('portAccessFlag')}
              />
              <span>Port Access</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.militaryBaseAccessFlag || false}
                onChange={handleCheckboxChange('militaryBaseAccessFlag')}
              />
              <span>Military Base Access</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.nasaAccessFlag || false}
                onChange={handleCheckboxChange('nasaAccessFlag')}
              />
              <span>NASA / Space Facility Access</span>
            </label>
          </div>
        </div>

        {/* LOGISTICS & SCHEDULE */}
        <div className="wizardCategorySection">
          <h3 className="wizardCategoryTitle">LOGISTICS & SCHEDULE</h3>
          <div className="wizardCheckboxGrid">
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.travelRequiredFlag || false}
                onChange={handleCheckboxChange('travelRequiredFlag')}
              />
              <span>Travel Required</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.perDiemRequiredFlag || false}
                onChange={handleCheckboxChange('perDiemRequiredFlag')}
              />
              <span>Per Diem Required</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.hotelRequiredFlag || false}
                onChange={handleCheckboxChange('hotelRequiredFlag')}
              />
              <span>Hotel Required</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.nightShiftFlag || false}
                onChange={handleCheckboxChange('nightShiftFlag')}
              />
              <span>Night Shift</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.weekendShiftFlag || false}
                onChange={handleCheckboxChange('weekendShiftFlag')}
              />
              <span>Weekend Shift</span>
            </label>
            <label className="wizardCheckboxLabel">
              <input 
                type="checkbox" 
                checked={data.highUrgencyFlag || false}
                onChange={handleCheckboxChange('highUrgencyFlag')}
              />
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

// ============ WIZARD STEP 5: BUDGET & TEAM ============
function WizardStep5({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  return (
    <div className="wizardStep">
      <h2 className="wizardStepTitle">Budget & Team</h2>
      <p className="wizardStepSubtitle">Enter budget and team information</p>
      
      <div className="wizardForm">
        <div className="wizardRow">
          <div className="wizardField">
            <label className="wizardFieldLabel">Project Budget</label>
            <input 
              type="text" 
              className="wizardFieldInput" 
              placeholder="$"
              value={data.budget || ''}
              onChange={(e) => handleChange('budget', e.target.value)}
            />
          </div>
          <div className="wizardField">
            <label className="wizardFieldLabel">Number of Workers</label>
            <input 
              type="number" 
              className="wizardFieldInput" 
              placeholder="0"
              value={data.workerCount || ''}
              onChange={(e) => handleChange('workerCount', e.target.value)}
            />
          </div>
        </div>

        <div className="wizardField">
          <label className="wizardFieldLabel">Team Members / Contractors</label>
          <textarea 
            className="wizardFieldTextarea" 
            placeholder="List key team members and contractors"
            rows="3"
            value={data.teamMembers || ''}
            onChange={(e) => handleChange('teamMembers', e.target.value)}
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

// ============ WIZARD STEP 6: REVIEW & SUBMIT ============
function WizardStep6({ data, onBack, onSubmit }) {
  return (
    <div className="wizardStep">
      <h2 className="wizardStepTitle">Review & Submit</h2>
      <p className="wizardStepSubtitle">Review your project information before submitting</p>
      
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
                <li>Davis-Bacon / Federal Prevailing Wage: {data.davisBaconFlag ? '✓' : '✗'}</li>
                <li>State Prevailing Wage: {data.statePrevailingWageFlag ? '✓' : '✗'}</li>
                <li>Local Prevailing Wage: {data.localPrevailingWageFlag ? '✓' : '✗'}</li>
                <li>Certified Payroll: {data.certifiedPayrollRequiredFlag ? '✓' : '✗'}</li>
                <li>Union / PLA Requirement: {data.unionRequirementFlag ? '✓' : '✗'}</li>
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
                <li>Healthcare Facility Requirements: {data.healthcareFacilityFlag ? '✓' : '✗'}</li>
              </ul>
            </div>
            <div>
              <strong>SITE ACCESS:</strong>
              <ul>
                <li>Badge Required: {data.badgeRequiredFlag ? '✓' : '✗'}</li>
                <li>Security Clearance: {data.securityClearanceFlag ? '✓' : '✗'}</li>
                <li>Airport Access: {data.airportAccessFlag ? '✓' : '✗'}</li>
                <li>Port Access: {data.portAccessFlag ? '✓' : '✗'}</li>
                <li>Military Base Access: {data.militaryBaseAccessFlag ? '✓' : '✗'}</li>
                <li>NASA / Space Facility Access: {data.nasaAccessFlag ? '✓' : '✗'}</li>
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
                <li>High Urgency / Short Notice: {data.highUrgencyFlag ? '✓' : '✗'}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="wizardReviewSection">
          <h3 className="wizardReviewTitle">Budget & Team</h3>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Budget:</span>
            <span className="wizardReviewValue">{data.budget || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Workers:</span>
            <span className="wizardReviewValue">{data.workerCount || '-'}</span>
          </div>
          <div className="wizardReviewRow">
            <span className="wizardReviewLabel">Team Members:</span>
            <span className="wizardReviewValue">{data.teamMembers || '-'}</span>
          </div>
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
    // Step 4 - Special Requirements
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
    budget: '',
    workerCount: '',
    teamMembers: ''
  })

  const updateWizardData = (newData) => {
    setWizardData(newData)
  }

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    const newProject = {
      ...wizardData,
      id: Date.now(),
      createdAt: new Date().toISOString()
    }
    onComplete(newProject)
  }

  const stepNames = ['Basic Info', 'Location', 'Classification', 'Requirements', 'Budget', 'Review']

  return (
    <div className="projectWizard">
      <div className="wizardCloseWrapper">
        <button className="wizardCloseBtn" onClick={onCancel}>×</button>
      </div>
      
      <div className="wizardSteps">
        {stepNames.map((name, idx) => (
          <div key={idx} className={`wizardStepIndicator ${step > idx + 1 ? 'completed' : ''} ${step === idx + 1 ? 'active' : ''}`}>
            <div className="wizardStepCircle">{step > idx + 1 ? <IconCheck /> : idx + 1}</div>
            <span className="wizardStepName">{name}</span>
          </div>
        ))}
      </div>
      
      <div className="wizardContent">
        {step === 1 && (
          <WizardStep1 
            data={wizardData} 
            onChange={updateWizardData} 
            onNext={handleNext} 
          />
        )}
        {step === 2 && (
          <WizardStep2 
            data={wizardData} 
            onChange={updateWizardData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {step === 3 && (
          <WizardStep3 
            data={wizardData} 
            onChange={updateWizardData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {step === 4 && (
          <WizardStep4 
            data={wizardData} 
            onChange={updateWizardData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {step === 5 && (
          <WizardStep5 
            data={wizardData} 
            onChange={updateWizardData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {step === 6 && (
          <WizardStep6 
            data={wizardData} 
            onBack={handleBack} 
            onSubmit={handleSubmit} 
          />
        )}
      </div>
    </div>
  )
}

// ============ MAIN PROJECT PAGE COMPONENT ============
export default function ProjectPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [showWizard, setShowWizard] = useState(false)

  const handleAddProject = () => {
    setShowWizard(true)
  }

  const handleWizardComplete = (newProject) => {
    setProjects([...projects, newProject])
    setShowWizard(false)
  }

  const handleWizardCancel = () => {
    setShowWizard(false)
  }

  return (
    <div className="appShell">
      <header className="topbar topbarSolid">
        <div className="topbarInner">
          <a href="/" className="brand brandLink">
            <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
          </a>
          
          <div className="topbarCenter">
            <div className="topbarSearch">
              <span className="topbarSearchIcon">
                <IconSearch />
              </span>
              <input className="topbarSearchInput" type="search" placeholder="Search" />
            </div>
          </div>
          
          <nav className="navActions">
            <div className="navActionsSolid">
              <button type="button" className="navIconButton">
                <IconBell />
                <span className="navIconBadge">3</span>
              </button>
              <img className="topbarAvatar" src="/assets/worker.avif" alt="Avatar" />
            </div>
          </nav>
        </div>
      </header>
      
      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue">
          <div className="sideNavHeader">
            <div className="sideMark">
              <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
            </div>
            <div className="sideMeta">
              <div className="sideTitle">Tradesmap</div>
            </div>
          </div>
          
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup">
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Overview</span>
              </span>
              
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge">{projects.length}</span>
              </a>
              
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Revenues</span>
              </span>
              
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Profile</span>
              </span>
            </nav>
          </div>
          
          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/company/login')}>
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>
        
        <main className="appContent">
          {showWizard ? (
            <ProjectWizard 
              onComplete={handleWizardComplete} 
              onCancel={handleWizardCancel} 
            />
          ) : (
            <div className="projectPage">
              <div className="projectHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h1 className="projectTitle">Projects</h1>
                  <p className="projectSubtitle">Manage your construction projects</p>
                </div>
                <button 
                  className="projectBtn projectBtnPrimary" 
                  onClick={handleAddProject}
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <IconPlus />
                  Add Project
                </button>
              </div>
              
              {projects.length === 0 ? (
                <div className="projectSection" style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  padding: '60px 24px',
                  textAlign: 'center',
                  minHeight: '400px'
                }}>
                  <div style={{ color: 'rgba(23, 38, 58, 0.45)', marginBottom: '16px' }}>
                    <IconFolder />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'rgba(23, 38, 58, 0.72)', margin: '0 0 8px 0' }}>
                    No Projects Yet
                  </h3>
                  <p style={{ fontSize: '14px', color: 'rgba(23, 38, 58, 0.55)', margin: '0 0 24px 0' }}>
                    Click the "Add Project" button to create your first project
                  </p>
                  <button 
                    className="projectBtn projectBtnPrimary" 
                    onClick={handleAddProject}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <IconPlus />
                    Add Project
                  </button>
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
                        <small>Sector: {project.projectSector || 'Not specified'}</small>
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
        /* Wizard Styles */
        .projectWizard {
          background: rgba(255, 255, 255, 0.96);
          border-radius: 20px;
          border: 1px solid rgba(18, 38, 63, 0.08);
          box-shadow: 0 24px 60px rgba(18, 38, 63, 0.2);
          overflow: hidden;
          position: relative;
        }
        
        .wizardCloseWrapper {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
        }
        
        .wizardCloseBtn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid rgba(18, 38, 63, 0.1);
          background: rgba(255, 255, 255, 0.95);
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }
        
        .wizardCloseBtn:hover {
          background: rgba(255, 255, 255, 1);
          border-color: rgba(18, 38, 63, 0.2);
        }
        
        .wizardSteps {
          display: flex;
          padding: 32px 24px 0;
          gap: 8px;
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
          background: rgba(18, 38, 63, 0.1);
          z-index: 0;
        }
        
        .wizardStepIndicator.completed:not(:last-child):before {
          background: var(--green);
        }
        
        .wizardStepCircle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.9);
          border: 2px solid rgba(18, 38, 63, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 14px;
          color: rgba(23, 38, 58, 0.6);
          position: relative;
          z-index: 1;
          background: white;
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
          color: rgba(23, 38, 58, 0.6);
          text-align: center;
        }
        
        .wizardStepIndicator.active .wizardStepName {
          color: var(--blue);
          font-weight: 900;
        }
        
        .wizardContent {
          padding: 24px;
        }
        
        .wizardStep {
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .wizardStepTitle {
          font-size: 18px;
          font-weight: 900;
          color: rgba(23, 38, 58, 0.9);
          margin: 0 0 8px 0;
        }
        
        .wizardStepSubtitle {
          font-size: 13px;
          color: rgba(23, 38, 58, 0.6);
          margin: 0 0 24px 0;
        }
        
        .wizardForm {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .wizardField {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        
        .wizardFieldLabel {
          font-size: 13px;
          font-weight: 800;
          color: rgba(23, 38, 58, 0.75);
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }
        
        .wizardFieldHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .wizardFieldRequired {
          font-size: 11px;
          font-weight: 800;
          color: #ef4444;
          background: rgba(239, 68, 68, 0.1);
          padding: 2px 8px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }
        
        .wizardFieldOptional {
          font-size: 11px;
          font-weight: 800;
          color: rgba(23, 38, 58, 0.5);
          background: rgba(18, 38, 63, 0.08);
          padding: 2px 8px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }
        
        .wizardFieldInput {
          padding: 12px 16px;
          border: 1.5px solid rgba(18, 38, 63, 0.1);
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
        }
        
        .wizardFieldInput:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
        }
        
        .wizardFieldSelect {
          padding: 12px 16px;
          border: 1.5px solid rgba(18, 38, 63, 0.1);
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          transition: all 0.2s ease;
          background: white;
          cursor: pointer;
        }
        
        .wizardFieldSelect:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
        }
        
        .wizardFieldTextarea {
          padding: 12px 16px;
          border: 1.5px solid rgba(18, 38, 63, 0.1);
          border-radius: 12px;
          font-size: 14px;
          outline: none;
          resize: vertical;
          font-family: inherit;
        }
        
        .wizardFieldTextarea:focus {
          border-color: var(--blue);
          box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
        }
        
        .wizardFieldHint {
          font-size: 12px;
          color: rgba(23, 38, 58, 0.55);
          margin-top: 4px;
          font-weight: 500;
        }
        
        .wizardFieldFootnote {
          font-size: 11px;
          color: rgba(23, 38, 58, 0.5);
          margin-top: 6px;
          font-style: italic;
        }
        
        .wizardRow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        
        .wizardGrid4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        
        .wizardSectionDivider {
          margin: 16px 0 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid rgba(15, 78, 169, 0.15);
        }
        
        .wizardSectionTitle {
          font-size: 16px;
          font-weight: 900;
          color: rgba(23, 38, 58, 0.85);
          margin: 0;
          letter-spacing: 0.3px;
        }
        
        .wizardComplianceHeader {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin: 16px 0 12px;
        }
        
        .wizardComplianceTitle {
          font-size: 16px;
          font-weight: 900;
          color: rgba(23, 38, 58, 0.85);
          letter-spacing: 0.3px;
        }
        
        .wizardComplianceBadge {
          font-size: 10px;
          font-weight: 800;
          color: rgba(23, 38, 58, 0.55);
          background: rgba(18, 38, 63, 0.08);
          padding: 3px 10px;
          border-radius: 20px;
          letter-spacing: 0.5px;
        }
        
        /* Toggle Button Styles */
        .wizardToggleItem {
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(18, 38, 63, 0.08);
          border-radius: 16px;
          padding: 16px;
          transition: all 0.2s ease;
          margin-bottom: 12px;
        }
        
        .wizardToggleItem:hover {
          background: rgba(15, 78, 169, 0.02);
          border-color: rgba(15, 78, 169, 0.15);
        }
        
        .wizardToggleHeader {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .wizardToggleLabel {
          font-weight: 800;
          font-size: 15px;
          color: rgba(23, 38, 58, 0.88);
        }
        
        .wizardToggleSwitch {
          display: flex;
          background: rgba(18, 38, 63, 0.08);
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
          transition: all 0.2s ease;
          background: transparent;
        }
        
        .wizardToggleOption.active {
          background: linear-gradient(180deg, var(--blue) 0%, var(--blue2) 100%);
          box-shadow: 0 2px 4px rgba(15, 78, 169, 0.2);
        }
        
        .wizardToggleHint {
          font-size: 13px;
          color: rgba(23, 38, 58, 0.6);
          line-height: 1.4;
          margin: 0;
        }
        
        /* Special Requirements Styles */
        .wizardFlagsNote {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(15, 78, 169, 0.06);
          border-radius: 12px;
          padding: 12px 16px;
          margin-bottom: 8px;
        }
        
        .wizardFlagsNoteIcon {
          font-size: 18px;
        }
        
        .wizardFlagsNoteText {
          font-size: 13px;
          font-weight: 600;
          color: rgba(23, 38, 58, 0.7);
        }
        
        .wizardCategorySection {
          margin-bottom: 24px;
        }
        
        .wizardCategoryTitle {
          font-size: 15px;
          font-weight: 900;
          color: rgba(23, 38, 58, 0.85);
          margin: 0 0 12px 0;
          padding-bottom: 6px;
          border-bottom: 2px solid rgba(15, 78, 169, 0.15);
          letter-spacing: 0.3px;
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
          color: rgba(23, 38, 58, 0.78);
          cursor: pointer;
          padding: 8px 12px;
          background: rgba(255, 255, 255, 0.96);
          border: 1px solid rgba(18, 38, 63, 0.08);
          border-radius: 12px;
          transition: all 0.2s ease;
        }
        
        .wizardCheckboxLabel:hover {
          background: rgba(15, 78, 169, 0.04);
          border-color: rgba(15, 78, 169, 0.2);
        }
        
        .wizardCheckboxLabel input[type="checkbox"] {
          width: 18px;
          height: 18px;
          cursor: pointer;
          accent-color: var(--blue);
        }
        
        .wizardActions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(18, 38, 63, 0.08);
        }
        
        /* wizardPillBtn Styles */
        .wizardPillBtn {
          appearance: none;
          border: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: stretch;
          padding: 0;
          border-radius: 999px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(18, 38, 63, 0.12);
          box-shadow: 0 16px 34px rgba(18, 38, 63, 0.12);
          transform: translateY(0);
          transition: transform 140ms ease, box-shadow 140ms ease, filter 140ms ease;
        }
        
        .wizardPillBtn:hover {
          transform: translateY(-1px);
          box-shadow: 0 18px 40px rgba(18, 38, 63, 0.16);
        }
        
        .wizardPillBtn:active {
          transform: translateY(0);
          box-shadow: 0 14px 30px rgba(18, 38, 63, 0.12);
        }
        
        .wizardPillBtnLabel {
          padding: 12px 18px;
          min-width: 110px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 950;
          letter-spacing: 0.2px;
          color: rgba(23, 38, 58, 0.72);
          background: transparent;
        }
        
        .wizardPillBtnIcon {
          width: 54px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.98);
          background: linear-gradient(180deg, rgba(148, 163, 184, 1) 0%, rgba(100, 116, 139, 1) 100%);
        }
        
        .wizardPillBtnIcon svg {
          width: 22px;
          height: 22px;
        }
        
        .wizardPillBtnPrimary .wizardPillBtnIcon {
          background: linear-gradient(180deg, rgba(15, 78, 169, 1) 0%, rgba(11, 63, 144, 1) 100%);
        }
        
        .wizardPillBtnPrimary .wizardPillBtnLabel {
          color: rgba(23, 38, 58, 0.86);
        }
        
        .wizardPillBtnSecondary .wizardPillBtnIcon {
          background: linear-gradient(180deg, rgba(148, 163, 184, 1) 0%, rgba(100, 116, 139, 1) 100%);
        }
        
        .wizardPillBtnSecondary .wizardPillBtnLabel {
          color: rgba(23, 38, 58, 0.74);
        }
        
        .wizardPillBtnSuccess .wizardPillBtnIcon {
          background: linear-gradient(180deg, rgba(47, 180, 99, 1) 0%, rgba(36, 156, 84, 1) 100%);
        }
        
        .wizardPillBtnSuccess .wizardPillBtnLabel {
          color: rgba(23, 38, 58, 0.86);
        }
        
        .wizardPillBtn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }
        
        .wizardReview {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .wizardReviewSection {
          background: rgba(15, 78, 169, 0.04);
          border-radius: 16px;
          padding: 16px;
        }
        
        .wizardReviewTitle {
          font-size: 14px;
          font-weight: 900;
          color: rgba(23, 38, 58, 0.8);
          margin: 0 0 12px 0;
          padding-bottom: 8px;
          border-bottom: 1px solid rgba(18, 38, 63, 0.08);
        }
        
        .wizardReviewRow {
          display: flex;
          padding: 8px 0;
          font-size: 13px;
        }
        
        .wizardReviewLabel {
          width: 140px;
          font-weight: 800;
          color: rgba(23, 38, 58, 0.6);
        }
        
        .wizardReviewValue {
          flex: 1;
          color: rgba(23, 38, 58, 0.85);
          font-weight: 600;
        }
        
        .wizardReviewGrid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }
        
        .wizardReviewGrid ul {
          margin: 8px 0 0 0;
          padding-left: 20px;
        }
        
        .wizardReviewGrid li {
          font-size: 12px;
          padding: 4px 0;
          color: rgba(23, 38, 58, 0.7);
        }
        
        .projectList {
          display: grid;
          gap: 16px;
        }
        
        .projectCard {
          padding: 16px;
          border: 1px solid rgba(18, 38, 63, 0.08);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          transition: all 0.2s ease;
        }
        
        .projectCard:hover {
          box-shadow: 0 4px 12px rgba(18, 38, 63, 0.1);
          transform: translateY(-2px);
        }
        
        .projectCard h3 {
          margin: 0 0 8px 0;
          font-size: 16px;
          font-weight: 900;
          color: var(--blue);
        }
        
        .projectCard p {
          margin: 0 0 12px 0;
          font-size: 13px;
          color: rgba(23, 38, 63, 0.7);
        }
        
        .projectCardMeta {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
          font-size: 12px;
          color: rgba(23, 38, 63, 0.6);
        }
        
        .projectCard small {
          font-size: 11px;
          color: rgba(23, 38, 63, 0.5);
        }
        
        @media (max-width: 768px) {
          .wizardRow {
            grid-template-columns: 1fr;
          }
          
          .wizardGrid4 {
            grid-template-columns: 1fr;
            gap: 12px;
          }
          
          .wizardCheckboxGrid {
            grid-template-columns: 1fr;
          }
          
          .wizardReviewGrid {
            grid-template-columns: 1fr;
          }
          
          .wizardSteps {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .wizardStepIndicator:not(:last-child):before {
            display: none;
          }
          
          .wizardReviewRow {
            flex-direction: column;
            gap: 4px;
          }
          
          .wizardReviewLabel {
            width: auto;
          }
          
          .projectCardMeta {
            flex-direction: column;
            gap: 4px;
          }
          
          .wizardToggleItem {
            padding: 12px;
          }
          
          .wizardToggleHeader {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }
          
          .wizardToggleLabel {
            font-size: 14px;
          }
          
          .wizardToggleHint {
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  )
}