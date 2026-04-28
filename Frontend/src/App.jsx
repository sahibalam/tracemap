import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

function IconUser(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WizardSummaryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location?.state ?? {}

  const basics = data.basics ?? {}
  const trade = data.trade ?? {}
  const workHistory = data.workHistory ?? {}
  const projects = workHistory.projects ?? []
  const certifications = data.certifications ?? {}
  const tax = data.tax ?? {}
  const availability = data.availability ?? {}
  const acknowledgments = data.acknowledgments ?? {}

  const displayValue = (value, fallback) => {
    if (value === 0) return 0
    if (value === false) return false
    if (value === null || value === undefined) return fallback
    if (typeof value === 'string' && value.trim() === '') return fallback
    return value
  }

  const fallbackProjects = [
    {
      name: 'ABC construct',
      client: 'XYZ Inc',
      city: 'XYZ',
      state: 'FL',
      role: 'Helper',
      start: '04/12/2024',
      end: '04/15/2025',
    },
    {
      name: 'DMC construct',
      client: 'DMX Inc',
      city: 'XYZ',
      state: 'CA',
      role: 'Helper',
      start: '04/05/2024',
      end: '04/10/2025',
    },
  ]

  const [editBasicsOpen, setEditBasicsOpen] = useState(false)

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavHeader">
            <div className="sideMark" aria-hidden="true">
              <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
            </div>
            <div className="sideMeta">
              <div className="sideTitle">Tradesmap</div>
              <div className="sideSubtitle">Studio work workspace</div>
            </div>
          </div>

          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconGrid />
                </span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconFolder />
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">
                  12
                </span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconChart />
                </span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true">
                  <IconUser />
                </span>
                <span className="sideText">Profile</span>
              </a>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup" aria-label="General">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon" aria-hidden="true">
                  <IconLogout />
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconSupport />
                </span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div className="wizardSummaryPage">
            <div className="wizardSummaryTop">
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Basics Identity</span>
                  <button
                    type="button"
                    className="wizardSummaryEditBtn"
                    aria-label="Edit Basics Identity"
                    onClick={() => setEditBasicsOpen(true)}
                  >
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryIdentity">
                    <div className="wizardSummaryIdentityLeft">
                      <img className="wizardSummaryAvatar" src="/assets/worker.avif" alt="Worker" />
                      <div className="wizardSummaryStatusPill">{displayValue(basics.workerStatus, 'Active')}</div>
                    </div>
                    <div className="wizardSummaryIdentityRight">
                      <div className="wizardSummaryRow">
                        <div className="wizardSummaryLabel">Name</div>
                        <div className="wizardSummaryValue">
                          {displayValue(`${basics.legalFirstName ?? ''} ${basics.legalLastName ?? ''}`.trim(), 'John Smith')}
                        </div>
                      </div>
                      <div className="wizardSummaryRow">
                        <div className="wizardSummaryLabel">Email</div>
                        <div className="wizardSummaryValue">{displayValue(basics.emailAddress, 'john.smith@email.com')}</div>
                      </div>
                      <div className="wizardSummaryRow">
                        <div className="wizardSummaryLabel">DOB</div>
                        <div className="wizardSummaryValue">{displayValue(basics.dob, '01/01/1990')}</div>
                      </div>
                      <div className="wizardSummaryRow">
                        <div className="wizardSummaryLabel">Address</div>
                        <div className="wizardSummaryValue">
                          {displayValue(
                            [basics.addressLine1, basics.addressLine2, basics.city, basics.stateCode, basics.zip].filter(Boolean).join(', '),
                            '123 Main St, Miami, FL 33101',
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Trade profile & skill Matrix</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Trade profile" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Primary trade</div>
                    <div className="wizardSummaryValue">{displayValue(trade.primaryTrade, 'ABC')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Primary level</div>
                    <div className="wizardSummaryValue">{displayValue(trade.primaryLevel, 'Helper')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Years of experience</div>
                    <div className="wizardSummaryValue">{displayValue(trade.yearsExperience, '4 years')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="wizardSummaryWideCard">
              <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                <span>Work History & project experience</span>
                <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Work History" disabled>
                  <IconPencil />
                </button>
              </div>
              <div className="wizardSummaryWideBody">
                <div className="wizardSummaryTable">
                  <div className="wizardSummaryTableHead">
                    <div>Project name</div>
                    <div>Client</div>
                    <div>City, State</div>
                    <div>Role</div>
                    <div>Start</div>
                    <div>End</div>
                  </div>
                  {(projects.length ? projects : fallbackProjects).map((p, idx) => (
                    <div key={idx} className="wizardSummaryTableRow">
                      <div>{displayValue(p.name, 'ABC construct')}</div>
                      <div>{displayValue(p.client, 'XYZ Inc')}</div>
                      <div>{displayValue([p.city, p.state].filter(Boolean).join(', '), 'XYZ, FL')}</div>
                      <div>{displayValue(p.role, 'Helper')}</div>
                      <div>{displayValue(p.start, '04/12/2024')}</div>
                      <div>{displayValue(p.end, '04/15/2025')}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="wizardSummaryBottom">
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Certification, safety & qualification</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Certifications" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">OSHA 10</div>
                    <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['OSHA 10'] ? 'Yes' : 'Yes'}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">HazCom</div>
                    <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['HazCom'] ? 'Yes' : 'Yes'}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Boom</div>
                    <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['Boom / aerial lift'] ? 'Yes' : 'Yes'}</div>
                  </div>
                </div>
              </div>

              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Tax & Compliance</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Tax & Compliance" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">State</div>
                    <div className="wizardSummaryValue">{displayValue(tax.stateOfWork, 'FL')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Legal tax name</div>
                    <div className="wizardSummaryValue">{displayValue(tax.employeeTaxName, 'John')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Tax Form</div>
                    <div className="wizardSummaryValue">{displayValue(tax.classificationPath, 'W2')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="wizardSummaryWideCard">
              <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                <span>Availability, Travel, Pay</span>
                <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Availability, Travel, Pay" disabled>
                  <IconPencil />
                </button>
              </div>
              <div className="wizardSummaryWideBody">
                <div className="wizardSummaryCardBody" style={{ padding: 0 }}>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Hourly</div>
                    <div className="wizardSummaryValue">{availability.hourlyRateRequested ? 'Yes' : 'Yes'}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Hourly Rate</div>
                    <div className="wizardSummaryValue">{displayValue(availability.hourlyRateRequested, '$27')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Travel radius</div>
                    <div className="wizardSummaryValue">{displayValue(trade.travelRadiusMiles, '20 miles')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">City</div>
                    <div className="wizardSummaryValue">{displayValue(basics.city, 'Miami')}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="wizardSummaryBottom">
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Emergency contact</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Emergency contact" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Name</div>
                    <div className="wizardSummaryValue">{displayValue(acknowledgments.emergencyContactName, 'Ronald')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Relationship</div>
                    <div className="wizardSummaryValue">{displayValue(acknowledgments.emergencyContactRelationship, 'Brother')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Phone</div>
                    <div className="wizardSummaryValue">{displayValue(acknowledgments.emergencyContactPhone, '213 765 4589')}</div>
                  </div>
                </div>
              </div>
              <div />
            </div>

            <div className="wizardSummaryFooter">
              <button type="button" className="btn btnPrimary" onClick={() => navigate('/wizard')}>
                Back to wizard
              </button>
            </div>
          </div>

          {editBasicsOpen ? (
            <div className="tmModalOverlay" role="dialog" aria-modal="true" aria-label="Edit Basics Identity">
              <div className="tmModal">
                <div className="tmModalHeader">
                  <div className="tmModalTitle">Edit Basics Identity</div>
                  <button type="button" className="tmModalClose" aria-label="Close" onClick={() => setEditBasicsOpen(false)}>
                    ×
                  </button>
                </div>
                <div className="tmModalBody tmModalBodyEmbed">
                  <WizardPage embedded initialStepOverride={1} />
                </div>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}

function WizardPage({ embedded = false, initialStepOverride }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [step, setStep] = useState(1)

  const maxStep = 8

  useEffect(() => {
    const requested = initialStepOverride ?? location?.state?.initialStep
    if (typeof requested === 'number' && Number.isFinite(requested)) {
      setStep((prev) => (prev === requested ? prev : Math.min(maxStep, Math.max(1, requested))))
    }
  }, [initialStepOverride, location?.state?.initialStep])

  const [emailAddress, setEmailAddress] = useState('')
  const [mobilePhone, setMobilePhone] = useState('')
  const [tempPassword, setTempPassword] = useState('')
  const [smsCodeVerified, setSmsCodeVerified] = useState('')
  const [emailVerified, setEmailVerified] = useState('')

  const [legalFirstName, setLegalFirstName] = useState('')
  const [legalLastName, setLegalLastName] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [dob, setDob] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [addressLine2, setAddressLine2] = useState('')
  const [city, setCity] = useState('')
  const [stateCode, setStateCode] = useState('')
  const [zip, setZip] = useState('')

  const [profilePhotoRef, setProfilePhotoRef] = useState('')
  const [primaryLanguage, setPrimaryLanguage] = useState('')
  const [additionalLanguages, setAdditionalLanguages] = useState('')
  const [currentCityMarket, setCurrentCityMarket] = useState('')

  const [acceptTerms, setAcceptTerms] = useState(false)
  const [acceptPrivacy, setAcceptPrivacy] = useState(false)
  const [consentElectronic, setConsentElectronic] = useState(false)
  const [certifyAccurate, setCertifyAccurate] = useState(false)

  const [primaryTrade, setPrimaryTrade] = useState('')
  const [secondaryTrades, setSecondaryTrades] = useState('')
  const [primaryLevel, setPrimaryLevel] = useState('')
  const [yearsExperience, setYearsExperience] = useState('')

  const [interiorsSkills, setInteriorsSkills] = useState({})
  const [additionalSkills, setAdditionalSkills] = useState('')

  const [fieldReadiness, setFieldReadiness] = useState({})
  const [travelRadiusMiles, setTravelRadiusMiles] = useState('')
  const [languages, setLanguages] = useState('')

  const [projects, setProjects] = useState([
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
  ])

  const [projectConditions, setProjectConditions] = useState({})
  const [referenceName, setReferenceName] = useState('')
  const [referenceTitle, setReferenceTitle] = useState('')
  const [referencePhone, setReferencePhone] = useState('')
  const [reviewerNotes, setReviewerNotes] = useState('')

  const [classificationPath, setClassificationPath] = useState('')
  const [stateOfWork, setStateOfWork] = useState('')

  const [employeeTaxName, setEmployeeTaxName] = useState('')
  const [employeeSsn, setEmployeeSsn] = useState('')
  const [employeeStartDate, setEmployeeStartDate] = useState('')
  const [employeeFlags, setEmployeeFlags] = useState({})
  const [reviewerName, setReviewerName] = useState('')
  const [complianceNotes, setComplianceNotes] = useState('')

  const [entityLegalName, setEntityLegalName] = useState('')
  const [entityEin, setEntityEin] = useState('')
  const [entityType, setEntityType] = useState('')
  const [entityStateRegistration, setEntityStateRegistration] = useState('')
  const [entityDbaName, setEntityDbaName] = useState('')
  const [entityAuthorizedSigner, setEntityAuthorizedSigner] = useState('')
  const [entityFlags, setEntityFlags] = useState({})

  const [stateSpecificFlags, setStateSpecificFlags] = useState({})

  const [earliestStartDate, setEarliestStartDate] = useState('')
  const [hourlyRateRequested, setHourlyRateRequested] = useState('')
  const [pieceworkNotes, setPieceworkNotes] = useState('')
  const [payPrefs, setPayPrefs] = useState({})

  const [homeMarketCity, setHomeMarketCity] = useState('')
  const [statesWillingToWorkIn, setStatesWillingToWorkIn] = useState('')
  const [travelPrefs, setTravelPrefs] = useState({})

  const [availability, setAvailability] = useState({ mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' })

  const [certChecklist, setCertChecklist] = useState({})
  const [certRows, setCertRows] = useState([
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
  ])
  const [safetyFlags, setSafetyFlags] = useState({})

  const [emergencyContactName, setEmergencyContactName] = useState('')
  const [emergencyContactRelationship, setEmergencyContactRelationship] = useState('')
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('')
  const [policyAcks, setPolicyAcks] = useState({})
  const [signatureWorkerName, setSignatureWorkerName] = useState('')
  const [signatureDate, setSignatureDate] = useState('')
  const [signatureToken, setSignatureToken] = useState('')

  const setToggle = (setter) => (e) => setter(e.target.checked)
  const toggleMapValue = (key, setMap) => (e) => setMap((prev) => ({ ...prev, [key]: e.target.checked }))

  const updateProjectField = (index, key) => (value) =>
    setProjects((prev) => prev.map((p, i) => (i === index ? { ...p, [key]: value } : p)))

  const updateCertRow = (index, key) => (value) =>
    setCertRows((prev) => prev.map((r, i) => (i === index ? { ...r, [key]: value } : r)))

  const stepTitle =
    step === 1
      ? 'Worker Account & Identity Intake'
      : step === 2
        ? 'Trade Profile & Skill Matrix'
        : step === 3
          ? 'Work History & Project Experience'
          : step === 4
            ? 'Work History & Project Experience — Continued'
            : step === 5
              ? 'Classification, Tax & Compliance Intake'
              : step === 6
                ? 'Availability, Travel, Pay & Assignment Preferences'
                : step === 7
                  ? 'Certifications, Safety & Equipment Qualifications'
                  : 'Emergency Contact, Policies & Acknowledgments'

  const stepSubtitle =
    step === 1
      ? 'Use for initial account creation, identity basics, contact data, and public profile photo.'
      : step === 2
        ? 'Use to classify primary trade, level, years of experience, specialty skills, and field capability.'
        : step === 3
          ? 'Use to collect recent projects, type of work performed, role held, and reference-ready experience.'
          : step === 4
            ? 'Continue collecting recent project history and references.'
            : step === 5
              ? 'Use to route the worker or subcontractor through the correct compliance path for W-2 / 1099 onboarding.'
              : step === 6
                ? 'Use to collect start date, schedule, travel radius, pay preference, and deployment expectations.'
                : step === 7
                  ? 'Use to collect proof of OSHA, lift, PIT, CPR, and related safety training relevant to interiors work.'
                  : 'Use to capture emergency contact details and signed acknowledgments required before activation.'

  const goNext = () => setStep((s) => Math.min(maxStep, s + 1))
  const goPrev = () => setStep((s) => Math.max(1, s - 1))

  const finishWizard = () =>
    navigate('/wizard/summary', {
      state: {
        basics: {
          legalFirstName,
          legalLastName,
          displayName,
          emailAddress,
          mobilePhone,
          dob,
          addressLine1,
          addressLine2,
          city,
          stateCode,
          zip,
        },
        trade: {
          primaryTrade,
          primaryLevel,
          yearsExperience,
          travelRadiusMiles,
        },
        workHistory: {
          projects,
          projectConditions,
          referenceName,
          referenceTitle,
          referencePhone,
        },
        certifications: {
          certChecklist,
          safetyFlags,
        },
        tax: {
          classificationPath,
          stateOfWork,
          employeeTaxName,
        },
        availability: {
          earliestStartDate,
          hourlyRateRequested,
          payPrefs,
        },
        acknowledgments: {
          emergencyContactName,
          emergencyContactRelationship,
          emergencyContactPhone,
          policyAcks,
          signatureWorkerName,
          signatureDate,
        },
      },
    })

  const wizardInner = (
    <div className="wizardPage">
      <div className="wizardCard">
        <div className="wizardHeader">
          <div>
            <div className="wizardTitle">{stepTitle}</div>
            <div className="wizardSubtitle">{stepSubtitle}</div>
          </div>

          <div className="wizardStepPills" aria-label="Wizard steps">
            {Array.from({ length: maxStep }).map((_, idx) => {
              const n = idx + 1
              return (
                <button
                  key={n}
                  type="button"
                  className={`wizardStepPill ${step === n ? 'wizardStepPillActive' : ''}`}
                  onClick={() => setStep(n)}
                >
                  {n}
                </button>
              )
            })}
          </div>
        </div>

              {step === 1 ? (
                <div className="wizardBody">
                  <div className="wizardSection">
                    <div className="wizardSectionBar">1. Account Creation</div>
                    <div className="wizardGrid2">
                      <TextField label="" placeholder="Email address" icon={<IconMail />} value={emailAddress} onChange={setEmailAddress} />
                      <TextField label="" placeholder="SMS code verified" icon={<IconSupport />} value={smsCodeVerified} onChange={setSmsCodeVerified} />
                      <TextField label="" placeholder="Mobile phone" icon={<IconPhone />} value={mobilePhone} onChange={setMobilePhone} />
                      <TextField label="" placeholder="Email verified" icon={<IconSupport />} value={emailVerified} onChange={setEmailVerified} />
                      <TextField
                        label=""
                        placeholder="Password / temporary password"
                        type="password"
                        icon={<IconLock />}
                        value={tempPassword}
                        onChange={setTempPassword}
                      />
                      <div className="wizardChecks">
                        <label className="wizardCheck">
                          <input type="checkbox" />
                          Enable biometric sign-in on supported devices
                        </label>
                        <label className="wizardCheck">
                          <input type="checkbox" />
                          Opt in to SMS job alerts
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="wizardSection">
                    <div className="wizardSectionBar">2. Identity & Contact</div>
                    <div className="wizardGrid2">
                      <TextField label="" placeholder="Legal first name" icon={<IconUser />} value={legalFirstName} onChange={setLegalFirstName} />
                      <TextField label="" placeholder="Address line 1" icon={<IconLocation />} value={addressLine1} onChange={setAddressLine1} />
                      <TextField label="" placeholder="Legal last name" icon={<IconUser />} value={legalLastName} onChange={setLegalLastName} />
                      <TextField label="" placeholder="Address line 2" icon={<IconLocation />} value={addressLine2} onChange={setAddressLine2} />
                      <TextField label="" placeholder="Preferred / display name" icon={<IconUser />} value={displayName} onChange={setDisplayName} />
                      <div className="wizardGrid3">
                        <TextField label="" placeholder="City" icon={<IconLocation />} value={city} onChange={setCity} />
                        <TextField label="" placeholder="State" icon={<IconLocation />} value={stateCode} onChange={setStateCode} />
                        <TextField label="" placeholder="ZIP" icon={<IconLocation />} value={zip} onChange={setZip} />
                      </div>
                      <TextField label="" placeholder="Date of birth (MM/DD/YYYY)" icon={<IconSupport />} value={dob} onChange={setDob} />
                    </div>
                  </div>

                  <div className="wizardSection">
                    <div className="wizardSectionBar">3. Public Profile Basics</div>
                    <div className="wizardGrid2">
                      <TextField label="" placeholder="Profile photo upload reference" icon={<IconSupport />} value={profilePhotoRef} onChange={setProfilePhotoRef} />
                      <TextField label="" placeholder="Primary language" icon={<IconGlobe />} value={primaryLanguage} onChange={setPrimaryLanguage} />
                      <TextField label="" placeholder="Additional languages" icon={<IconGlobe />} value={additionalLanguages} onChange={setAdditionalLanguages} />
                      <TextField
                        label=""
                        placeholder="Current city / market"
                        icon={<IconLocation />}
                        value={currentCityMarket}
                        onChange={setCurrentCityMarket}
                      />
                    </div>
                  </div>

                  <div className="wizardSection">
                    <div className="wizardSectionBar">4. Terms & Consent</div>
                    <div className="wizardChecks wizardChecks2">
                      <label className="wizardCheck">
                        <input type="checkbox" checked={acceptTerms} onChange={setToggle(setAcceptTerms)} />
                        I accept the TradesMap Terms of Use
                      </label>
                      <label className="wizardCheck">
                        <input type="checkbox" checked={acceptPrivacy} onChange={setToggle(setAcceptPrivacy)} />
                        I accept the Privacy Notice
                      </label>
                      <label className="wizardCheck">
                        <input type="checkbox" checked={consentElectronic} onChange={setToggle(setConsentElectronic)} />
                        I consent to electronic records and signatures
                      </label>
                      <label className="wizardCheck">
                        <input type="checkbox" checked={certifyAccurate} onChange={setToggle(setCertifyAccurate)} />
                        I certify the information entered is accurate
                      </label>
                    </div>
                  </div>
                </div>
              ) : step === 2 ? (
                <div className="wizardBody">
                  <div className="wizardSection">
                    <div className="wizardSectionBar">1. Trade Classification</div>
                    <div className="wizardGrid2">
                      <TextField label="" placeholder="Primary trade" icon={<IconSupport />} value={primaryTrade} onChange={setPrimaryTrade} />
                      <TextField label="" placeholder="Primary level (Helper / Mechanic / Lead / Foreman)" icon={<IconSupport />} value={primaryLevel} onChange={setPrimaryLevel} />
                      <TextField label="" placeholder="Secondary trade(s)" icon={<IconSupport />} value={secondaryTrades} onChange={setSecondaryTrades} />
                      <TextField
                        label=""
                        placeholder="Years of experience — primary trade"
                        icon={<IconSupport />}
                        value={yearsExperience}
                        onChange={setYearsExperience}
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
                            <input type="checkbox" checked={!!interiorsSkills[`mf:${k}`]} onChange={toggleMapValue(`mf:${k}`, setInteriorsSkills)} />
                            {k}
                          </label>
                        ))}
                      </div>
                      <div className="wizardSkillCol">
                        <div className="wizardSkillTitle">Drywall hanging</div>
                        {['Walls', 'Ceilings', 'Fire-rated board', 'Abuse / moisture board', 'High walls', 'Production hanging', 'Lift work'].map(
                          (k) => (
                            <label key={k} className="wizardCheck">
                              <input type="checkbox" checked={!!interiorsSkills[`dh:${k}`]} onChange={toggleMapValue(`dh:${k}`, setInteriorsSkills)} />
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
                            <input type="checkbox" checked={!!interiorsSkills[`cf:${k}`]} onChange={toggleMapValue(`cf:${k}`, setInteriorsSkills)} />
                            {k}
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="wizardWideField">
                      <TextField
                        label=""
                        placeholder="Additional skills / tools / systems worked with"
                        icon={<IconSupport />}
                        value={additionalSkills}
                        onChange={setAdditionalSkills}
                      />
                    </div>
                  </div>

                  <div className="wizardSection">
                    <div className="wizardSectionBar">3. Field Readiness</div>
                    <div className="wizardGrid3">
                      <label className="wizardCheck">
                        <input type="checkbox" checked={!!fieldReadiness.blueprints} onChange={toggleMapValue('blueprints', setFieldReadiness)} />
                        Can read blueprints / plans
                      </label>
                      <label className="wizardCheck">
                        <input type="checkbox" checked={!!fieldReadiness.lifts} onChange={toggleMapValue('lifts', setFieldReadiness)} />
                        Comfortable on lifts
                      </label>
                      <label className="wizardCheck">
                        <input type="checkbox" checked={!!fieldReadiness.occupied} onChange={toggleMapValue('occupied', setFieldReadiness)} />
                        Worked occupied spaces
                      </label>
                      <label className="wizardCheck">
                        <input type="checkbox" checked={!!fieldReadiness.nightShifts} onChange={toggleMapValue('nightShifts', setFieldReadiness)} />
                        Available for night shifts
                      </label>
                      <label className="wizardCheck">
                        <input type="checkbox" checked={!!fieldReadiness.travel} onChange={toggleMapValue('travel', setFieldReadiness)} />
                        Available for travel
                      </label>
                      <label className="wizardCheck">
                        <input type="checkbox" checked={!!fieldReadiness.leadCrew} onChange={toggleMapValue('leadCrew', setFieldReadiness)} />
                        Can lead a crew
                      </label>
                    </div>

                    <div className="wizardGrid2">
                      <TextField
                        label=""
                        placeholder="Travel radius (miles)"
                        icon={<IconSupport />}
                        value={travelRadiusMiles}
                        onChange={setTravelRadiusMiles}
                      />
                      <TextField label="" placeholder="Languages" icon={<IconGlobe />} value={languages} onChange={setLanguages} />
                    </div>
                  </div>
                </div>
              ) : step === 3 ? (
                <div className="wizardBody">
                  <div className="wizardSection">
                    <div className="wizardSectionBar">Recent Projects (Last 3 to 5 Relevant Projects)</div>
                    <div className="wizardProjectList">
                      {[0, 1].map((idx) => (
                        <div key={idx} className="wizardProjectCard">
                          <div className="wizardProjectTitle">Project {idx + 1}</div>
                          <div className="wizardGrid2">
                            <TextField
                              label=""
                              placeholder="Project name"
                              icon={<IconFolder />}
                              value={projects[idx].name}
                              onChange={updateProjectField(idx, 'name')}
                            />
                            <TextField
                              label=""
                              placeholder="Client / GC"
                              icon={<IconSupport />}
                              value={projects[idx].client}
                              onChange={updateProjectField(idx, 'client')}
                            />
                          </div>

                          <div className="wizardGrid4">
                            <TextField
                              label=""
                              placeholder="City"
                              icon={<IconLocation />}
                              value={projects[idx].city}
                              onChange={updateProjectField(idx, 'city')}
                            />
                            <TextField
                              label=""
                              placeholder="State"
                              icon={<IconLocation />}
                              value={projects[idx].state}
                              onChange={updateProjectField(idx, 'state')}
                            />
                            <TextField
                              label=""
                              placeholder="Role"
                              icon={<IconUser />}
                              value={projects[idx].role}
                              onChange={updateProjectField(idx, 'role')}
                            />
                            <TextField
                              label=""
                              placeholder="Trade"
                              icon={<IconSupport />}
                              value={projects[idx].trade}
                              onChange={updateProjectField(idx, 'trade')}
                            />
                          </div>

                          <div className="wizardGrid2">
                            <TextField
                              label=""
                              placeholder="Start date"
                              icon={<IconSupport />}
                              value={projects[idx].start}
                              onChange={updateProjectField(idx, 'start')}
                            />
                            <TextField
                              label=""
                              placeholder="End date"
                              icon={<IconSupport />}
                              value={projects[idx].end}
                              onChange={updateProjectField(idx, 'end')}
                            />
                          </div>

                          <TextField
                            label=""
                            placeholder="Scope summary"
                            icon={<IconSupport />}
                            value={projects[idx].scope}
                            onChange={updateProjectField(idx, 'scope')}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : step === 4 ? (
                <div className="wizardBody">
                  <div className="wizardSection">
                    <div className="wizardSectionBar">Project 3</div>
                    <div className="wizardProjectCard">
                      <div className="wizardGrid2">
                        <TextField
                          label=""
                          placeholder="Project name"
                          icon={<IconFolder />}
                          value={projects[2].name}
                          onChange={updateProjectField(2, 'name')}
                        />
                        <TextField
                          label=""
                          placeholder="Client / GC"
                          icon={<IconSupport />}
                          value={projects[2].client}
                          onChange={updateProjectField(2, 'client')}
                        />
                      </div>

                      <div className="wizardGrid4">
                        <TextField
                          label=""
                          placeholder="City"
                          icon={<IconLocation />}
                          value={projects[2].city}
                          onChange={updateProjectField(2, 'city')}
                        />
                        <TextField
                          label=""
                          placeholder="State"
                          icon={<IconLocation />}
                          value={projects[2].state}
                          onChange={updateProjectField(2, 'state')}
                        />
                        <TextField
                          label=""
                          placeholder="Role"
                          icon={<IconUser />}
                          value={projects[2].role}
                          onChange={updateProjectField(2, 'role')}
                        />
                        <TextField
                          label=""
                          placeholder="Trade"
                          icon={<IconSupport />}
                          value={projects[2].trade}
                          onChange={updateProjectField(2, 'trade')}
                        />
                      </div>

                      <div className="wizardGrid2">
                        <TextField
                          label=""
                          placeholder="Start date"
                          icon={<IconSupport />}
                          value={projects[2].start}
                          onChange={updateProjectField(2, 'start')}
                        />
                        <TextField
                          label=""
                          placeholder="End date"
                          icon={<IconSupport />}
                          value={projects[2].end}
                          onChange={updateProjectField(2, 'end')}
                        />
                      </div>

                      <TextField
                        label=""
                        placeholder="Scope summary"
                        icon={<IconSupport />}
                        value={projects[2].scope}
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
                          <input type="checkbox" checked={!!projectConditions[k]} onChange={toggleMapValue(k, setProjectConditions)} />
                          {k}
                        </label>
                      ))}
                    </div>

                    <div className="wizardGrid3">
                      <TextField
                        label=""
                        placeholder="Reference name"
                        icon={<IconUser />}
                        value={referenceName}
                        onChange={setReferenceName}
                      />
                      <TextField
                        label=""
                        placeholder="Reference title"
                        icon={<IconSupport />}
                        value={referenceTitle}
                        onChange={setReferenceTitle}
                      />
                      <TextField
                        label=""
                        placeholder="Reference phone"
                        icon={<IconPhone />}
                        value={referencePhone}
                        onChange={setReferencePhone}
                      />
                    </div>

                    <TextField
                      label=""
                      placeholder="Notes for reviewer / superintendent comments"
                      icon={<IconSupport />}
                      value={reviewerNotes}
                      onChange={setReviewerNotes}
                    />
                  </div>
                </div>
              ) : step === 5 ? (
                <div className="wizardBody">
                  <div className="wizardSection">
                    <div className="wizardSectionBar">1. Classification Selection & Routing</div>
                    <div className="wizardGrid2">
                      <div className="wizardChecks wizardChecks2">
                        <label className="wizardCheck">
                          <input
                            type="radio"
                            name="classificationPath"
                            checked={classificationPath === 'employee'}
                            onChange={() => setClassificationPath('employee')}
                          />
                          Employee / W-2 path
                        </label>
                        <label className="wizardCheck">
                          <input
                            type="radio"
                            name="classificationPath"
                            checked={classificationPath === 'subcontractor'}
                            onChange={() => setClassificationPath('subcontractor')}
                          />
                          Subcontractor / 1099 / entity path
                        </label>
                      </div>

                      <TextField
                        label=""
                        placeholder="State of work"
                        icon={<IconLocation />}
                        value={stateOfWork}
                        onChange={setStateOfWork}
                      />
                    </div>
                  </div>

                  {classificationPath === 'employee' ? (
                    <div className="wizardSection">
                      <div className="wizardSectionBar">2. Employee / W-2 Path Requirements</div>
                      <div className="wizardGrid3">
                        <TextField
                          label=""
                          placeholder="Legal tax name"
                          icon={<IconUser />}
                          value={employeeTaxName}
                          onChange={setEmployeeTaxName}
                        />
                        <TextField label="" placeholder="SSN" icon={<IconSupport />} value={employeeSsn} onChange={setEmployeeSsn} />
                        <TextField
                          label=""
                          placeholder="Employee start date"
                          icon={<IconSupport />}
                          value={employeeStartDate}
                          onChange={setEmployeeStartDate}
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
                            <input type="checkbox" checked={!!employeeFlags[k]} onChange={toggleMapValue(k, setEmployeeFlags)} />
                            {k}
                          </label>
                        ))}
                      </div>

                      <div className="wizardGrid2">
                        <TextField
                          label=""
                          placeholder="Reviewer name"
                          icon={<IconUser />}
                          value={reviewerName}
                          onChange={setReviewerName}
                        />
                        <TextField
                          label=""
                          placeholder="Compliance notes"
                          icon={<IconSupport />}
                          value={complianceNotes}
                          onChange={setComplianceNotes}
                        />
                      </div>
                    </div>
                  ) : null}

                  {classificationPath === 'subcontractor' ? (
                    <div className="wizardSection">
                      <div className="wizardSectionBar">3. Subcontractor / 1099 / Entity Path Requirements</div>
                      <div className="wizardGrid4">
                        <TextField
                          label=""
                          placeholder="Legal entity name"
                          icon={<IconSupport />}
                          value={entityLegalName}
                          onChange={setEntityLegalName}
                        />
                        <TextField label="" placeholder="EIN" icon={<IconSupport />} value={entityEin} onChange={setEntityEin} />
                        <TextField
                          label=""
                          placeholder="Entity type"
                          icon={<IconSupport />}
                          value={entityType}
                          onChange={setEntityType}
                        />
                        <TextField
                          label=""
                          placeholder="State of registration"
                          icon={<IconLocation />}
                          value={entityStateRegistration}
                          onChange={setEntityStateRegistration}
                        />
                      </div>

                      <div className="wizardGrid2">
                        <TextField
                          label=""
                          placeholder="DBA / trade name"
                          icon={<IconSupport />}
                          value={entityDbaName}
                          onChange={setEntityDbaName}
                        />
                        <TextField
                          label=""
                          placeholder="Authorized signer"
                          icon={<IconUser />}
                          value={entityAuthorizedSigner}
                          onChange={setEntityAuthorizedSigner}
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
                            <input type="checkbox" checked={!!entityFlags[k]} onChange={toggleMapValue(k, setEntityFlags)} />
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
                          <input type="checkbox" checked={!!stateSpecificFlags[k]} onChange={toggleMapValue(k, setStateSpecificFlags)} />
                          {k}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ) : step === 6 ? (
                <div className="wizardBody">
                  <div className="wizardSection">
                    <div className="wizardSectionBar">1. Start Date & Pay Structure</div>
                    <div className="wizardGrid3">
                      <TextField
                        label=""
                        placeholder="Earliest start date"
                        icon={<IconSupport />}
                        value={earliestStartDate}
                        onChange={setEarliestStartDate}
                      />
                      <TextField
                        label=""
                        placeholder="Hourly rate requested"
                        icon={<IconSupport />}
                        value={hourlyRateRequested}
                        onChange={setHourlyRateRequested}
                      />
                      <TextField
                        label=""
                        placeholder="Piecework basis / notes"
                        icon={<IconSupport />}
                        value={pieceworkNotes}
                        onChange={setPieceworkNotes}
                      />
                    </div>

                    <div className="wizardGrid5 wizardGrid5Tight">
                      {['Hourly', 'Piecework', 'Both', 'Open to overtime', 'Available weekends'].map((k) => (
                        <label key={k} className="wizardCheck">
                          <input type="checkbox" checked={!!payPrefs[k]} onChange={toggleMapValue(k, setPayPrefs)} />
                          {k}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="wizardSection">
                    <div className="wizardSectionBar">2. Travel & Deployment</div>
                    <div className="wizardGrid3">
                      <TextField
                        label=""
                        placeholder="Travel radius (mi)"
                        icon={<IconSupport />}
                        value={travelRadiusMiles}
                        onChange={setTravelRadiusMiles}
                      />
                      <TextField
                        label=""
                        placeholder="Home market / city"
                        icon={<IconLocation />}
                        value={homeMarketCity}
                        onChange={setHomeMarketCity}
                      />
                      <TextField
                        label=""
                        placeholder="States willing to work in"
                        icon={<IconLocation />}
                        value={statesWillingToWorkIn}
                        onChange={setStatesWillingToWorkIn}
                      />
                    </div>

                    <div className="wizardGrid3 wizardGrid3Tight">
                      {['Needs housing for travel work', 'Needs per diem', 'Own transportation'].map((k) => (
                        <label key={k} className="wizardCheck">
                          <input type="checkbox" checked={!!travelPrefs[k]} onChange={toggleMapValue(k, setTravelPrefs)} />
                          {k}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="wizardSection">
                    <div className="wizardSectionBar">3. Availability Calendar</div>
                    <div className="wizardAvailability">
                      {[
                        ['Mon', 'mon'],
                        ['Tue', 'tue'],
                        ['Wed', 'wed'],
                        ['Thu', 'thu'],
                        ['Fri', 'fri'],
                        ['Sat', 'sat'],
                        ['Sun', 'sun'],
                      ].map(([label, key]) => (
                        <label key={key} className="wizardAvailabilityCell">
                          <div className="wizardAvailabilityLabel">{label}</div>
                          <input
                            className="wizardAvailabilityInput"
                            value={availability[key]}
                            onChange={(e) => setAvailability((prev) => ({ ...prev, [key]: e.target.value }))}
                            placeholder=""
                          />
                        </label>
                      ))}
                    </div>
                    <div className="wizardAvailabilityHint">Enter start/end times if available. Leave blank if unavailable.</div>
                  </div>
                </div>
              ) : step === 7 ? (
                <div className="wizardBody">
                  <div className="wizardSection">
                    <div className="wizardSectionBar">1. Certification Checklist</div>
                    <div className="wizardSkillsGrid">
                      <div className="wizardSkillCol">
                        {['OSHA 10', 'OSHA 30', 'Scissor lift'].map((k) => (
                          <label key={k} className="wizardCheck">
                            <input type="checkbox" checked={!!certChecklist[k]} onChange={toggleMapValue(k, setCertChecklist)} />
                            {k}
                          </label>
                        ))}
                      </div>
                      <div className="wizardSkillCol">
                        {['Boom / aerial lift', 'Forklift / PIT', 'CPR / First Aid'].map((k) => (
                          <label key={k} className="wizardCheck">
                            <input type="checkbox" checked={!!certChecklist[k]} onChange={toggleMapValue(k, setCertChecklist)} />
                            {k}
                          </label>
                        ))}
                      </div>
                      <div className="wizardSkillCol">
                        {['Fall protection', 'HazCom', 'Site-specific orientation'].map((k) => (
                          <label key={k} className="wizardCheck">
                            <input type="checkbox" checked={!!certChecklist[k]} onChange={toggleMapValue(k, setCertChecklist)} />
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
                          <input
                            className="wizardTableInput"
                            value={row.cardNumber}
                            onChange={(e) => updateCertRow(idx, 'cardNumber')(e.target.value)}
                          />
                          <input
                            className="wizardTableInput"
                            value={row.issueDate}
                            onChange={(e) => updateCertRow(idx, 'issueDate')(e.target.value)}
                          />
                          <input
                            className="wizardTableInput"
                            value={row.expirationDate}
                            onChange={(e) => updateCertRow(idx, 'expirationDate')(e.target.value)}
                          />
                          <input
                            className="wizardTableInput"
                            value={row.uploadRef}
                            onChange={(e) => updateCertRow(idx, 'uploadRef')(e.target.value)}
                          />
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
                          <input type="checkbox" checked={!!safetyFlags[k]} onChange={toggleMapValue(k, setSafetyFlags)} />
                          {k}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="wizardBody">
                  <div className="wizardSection">
                    <div className="wizardSectionBar">1. Emergency Contact</div>
                    <div className="wizardGrid3">
                      <TextField
                        label=""
                        placeholder="Contact name"
                        icon={<IconUser />}
                        value={emergencyContactName}
                        onChange={setEmergencyContactName}
                      />
                      <TextField
                        label=""
                        placeholder="Relationship"
                        icon={<IconSupport />}
                        value={emergencyContactRelationship}
                        onChange={setEmergencyContactRelationship}
                      />
                      <TextField
                        label=""
                        placeholder="Phone"
                        icon={<IconPhone />}
                        value={emergencyContactPhone}
                        onChange={setEmergencyContactPhone}
                      />
                    </div>
                  </div>

                  <div className="wizardSection">
                    <div className="wizardSectionBar">2. Acknowledgments</div>
                    <div className="wizardChecks">
                      {[
                        'I understand project assignment is contingent on profile, compliance, and project-specific approval.',
                        'I will provide accurate information and update certifications when they expire.',
                        'I understand I may be removed from assignment or hidden from matching if safety or conduct issues arise.',
                        'I will follow site safety, housekeeping, attendance, and reporting requirements.',
                        'I consent to electronic records, signature, and communications through the app.',
                      ].map((k) => (
                        <label key={k} className="wizardCheck">
                          <input type="checkbox" checked={!!policyAcks[k]} onChange={toggleMapValue(k, setPolicyAcks)} />
                          {k}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="wizardSection">
                    <div className="wizardSectionBar">3. Signature</div>
                    <div className="wizardGrid3">
                      <TextField
                        label=""
                        placeholder="Worker full legal name"
                        icon={<IconUser />}
                        value={signatureWorkerName}
                        onChange={setSignatureWorkerName}
                      />
                      <TextField
                        label=""
                        placeholder="Date"
                        icon={<IconSupport />}
                        value={signatureDate}
                        onChange={setSignatureDate}
                      />
                      <TextField
                        label=""
                        placeholder="Signature / e-sign token"
                        icon={<IconSupport />}
                        value={signatureToken}
                        onChange={setSignatureToken}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="wizardFooter">
                <button type="button" className="btn" onClick={() => navigate('/verify')}>
                  Back
                </button>
                <div className="wizardFooterRight">
                  {step > 1 ? (
                    <button type="button" className="btn" onClick={goPrev}>
                      Previous
                    </button>
                  ) : null}
                  {step < maxStep ? (
                    <button type="button" className="btn btnPrimary wizardNextBtn" onClick={goNext}>
                      Next
                    </button>
                  ) : (
                    <button type="button" className="btn btnSuccess" onClick={finishWizard}>
                      Finish
                    </button>
                  )}
                </div>
              </div>
      </div>
    </div>
  )

  if (embedded) {
    return <div className="wizardEmbedded">{wizardInner}</div>
  }

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavHeader">
            <div className="sideMark" aria-hidden="true">
              <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
            </div>
            <div className="sideMeta">
              <div className="sideTitle">Tradesmap</div>
              <div className="sideSubtitle">Studio work workspace</div>
            </div>
          </div>

          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconGrid />
                </span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconFolder />
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">
                  12
                </span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconChart />
                </span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true">
                  <IconUser />
                </span>
                <span className="sideText">Profile</span>
              </a>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup" aria-label="General">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon" aria-hidden="true">
                  <IconLogout />
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconSupport />
                </span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">{wizardInner}</main>
      </div>
    </div>
  )
}

function IconGrid(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconFolder(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconChart(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconSupport(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2a8 8 0 0 0-8 8v4a3 3 0 0 0 3 3h1v-8H7a1 1 0 0 0-1 1v4a1 1 0 0 1-1-1v-3a7 7 0 0 1 14 0v3a1 1 0 0 1-1 1v-4a1 1 0 0 0-1-1h-1v8h1a3 3 0 0 0 3-3v-4a8 8 0 0 0-8-8Zm-1 18h2a2 2 0 0 0 2-2h-6a2 2 0 0 0 2 2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconLogout(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconBell(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 22a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 22Zm7-6V11a7 7 0 0 0-5.5-6.8V3.5a1.5 1.5 0 0 0-3 0v.7A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconSearch(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M10 2a8 8 0 1 0 5.3 14l4.2 4.2 1.4-1.4-4.2-4.2A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconMail(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconLock(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Zm-7-2a2 2 0 0 1 4 0v2h-4V7Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconPhone(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconLocation(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconGlobe(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm7.93 9h-3.17a15.74 15.74 0 0 0-1.33-5.11A8.02 8.02 0 0 1 19.93 11ZM12 4.07A13.87 13.87 0 0 1 13.94 11h-3.88A13.87 13.87 0 0 1 12 4.07ZM4.07 13h3.17a15.74 15.74 0 0 0 1.33 5.11A8.02 8.02 0 0 1 4.07 13ZM7.24 11H4.07a8.02 8.02 0 0 1 4.5-5.11A15.74 15.74 0 0 0 7.24 11Zm2.82 2h3.88A13.87 13.87 0 0 1 12 19.93 13.87 13.87 0 0 1 10.06 13Zm5.37 5.11A15.74 15.74 0 0 0 16.76 13h3.17a8.02 8.02 0 0 1-4.5 5.11ZM16.76 11h-3.17a15.74 15.74 0 0 0-1.33-5.11A8.02 8.02 0 0 1 16.76 11Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconPencil(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TextField({
  label,
  placeholder,
  type = 'text',
  icon,
  value,
  onChange,
  inputMode,
  maxLength,
  pattern,
  readOnly,
}) {
  return (
    <label className="field">
      <div className="fieldLabel">{label}</div>
      <div className="fieldControl">
        <span className="fieldIcon">{icon}</span>
        <input
          className="fieldInput"
          placeholder={placeholder}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          pattern={pattern}
          readOnly={readOnly}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </div>
    </label>
  )
}

function SelectField({ label, icon, value, onChange, children }) {
  return (
    <label className="field">
      <div className="fieldLabel">{label}</div>
      <div className="fieldControl">
        <span className="fieldIcon">{icon}</span>
        <select className="fieldSelect" value={value} onChange={(e) => onChange(e.target.value)} required>
          {children}
        </select>
      </div>
    </label>
  )
}

function TopNav({ variant = 'transparent' }) {
  const navigate = useNavigate()

  return (
    <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`}>
      <div className="topbarInner">
        <Link to="/" className="brand brandLink" aria-label="TradesMap home">
          <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
        </Link>

        {variant === 'transparent' ? (
          <nav className="navLinks" aria-label="Top navigation">
            <a href="#" className="navLink">
              Faqs
            </a>
            <a href="#" className="navLink">
              About
            </a>
            <a href="#" className="navLink">
              Contact
            </a>
          </nav>
        ) : null}

        {variant === 'solid' ? (
          <div className="topbarCenter" aria-label="Header search">
            <div className="topbarSearch">
              <span className="topbarSearchIcon" aria-hidden="true">
                <IconSearch />
              </span>
              <input className="topbarSearchInput" type="search" placeholder="Search" />
            </div>
          </div>
        ) : null}

        <nav className="navActions" aria-label="Authentication navigation">
          {variant === 'solid' ? (
            <button type="button" className="navIconButton" aria-label="Notifications" onClick={() => navigate('/login')}>
              <IconBell />
              <span className="navIconBadge" aria-hidden="true">
                7
              </span>
            </button>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}

function HomePage() {
  return (
    <div className="home">
      <div className="bg bgAuth" />
      <div className="bgOverlay" />
      <TopNav variant="transparent" />

      <main className="homeMain">
        <div className="wipCard" role="status">
          Work in progress
        </div>
      </main>
    </div>
  )
}

function AuthPage({ initialMode = 'login' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [mode, setMode] = useState(initialMode)

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [stateUS, setStateUS] = useState('')
  const [zip, setZip] = useState('')
  const [language, setLanguage] = useState('')

  const usStates = useMemo(
    () => [
      { name: 'Alabama', code: 'AL' },
      { name: 'Alaska', code: 'AK' },
      { name: 'Arizona', code: 'AZ' },
      { name: 'Arkansas', code: 'AR' },
      { name: 'California', code: 'CA' },
      { name: 'Colorado', code: 'CO' },
      { name: 'Connecticut', code: 'CT' },
      { name: 'Delaware', code: 'DE' },
      { name: 'Florida', code: 'FL' },
      { name: 'Georgia', code: 'GA' },
      { name: 'Hawaii', code: 'HI' },
      { name: 'Idaho', code: 'ID' },
      { name: 'Illinois', code: 'IL' },
      { name: 'Indiana', code: 'IN' },
      { name: 'Iowa', code: 'IA' },
      { name: 'Kansas', code: 'KS' },
      { name: 'Kentucky', code: 'KY' },
      { name: 'Louisiana', code: 'LA' },
      { name: 'Maine', code: 'ME' },
      { name: 'Maryland', code: 'MD' },
      { name: 'Massachusetts', code: 'MA' },
      { name: 'Michigan', code: 'MI' },
      { name: 'Minnesota', code: 'MN' },
      { name: 'Mississippi', code: 'MS' },
      { name: 'Missouri', code: 'MO' },
      { name: 'Montana', code: 'MT' },
      { name: 'Nebraska', code: 'NE' },
      { name: 'Nevada', code: 'NV' },
      { name: 'New Hampshire', code: 'NH' },
      { name: 'New Jersey', code: 'NJ' },
      { name: 'New Mexico', code: 'NM' },
      { name: 'New York', code: 'NY' },
      { name: 'North Carolina', code: 'NC' },
      { name: 'North Dakota', code: 'ND' },
      { name: 'Ohio', code: 'OH' },
      { name: 'Oklahoma', code: 'OK' },
      { name: 'Oregon', code: 'OR' },
      { name: 'Pennsylvania', code: 'PA' },
      { name: 'Rhode Island', code: 'RI' },
      { name: 'South Carolina', code: 'SC' },
      { name: 'South Dakota', code: 'SD' },
      { name: 'Tennessee', code: 'TN' },
      { name: 'Texas', code: 'TX' },
      { name: 'Utah', code: 'UT' },
      { name: 'Vermont', code: 'VT' },
      { name: 'Virginia', code: 'VA' },
      { name: 'Washington', code: 'WA' },
      { name: 'West Virginia', code: 'WV' },
      { name: 'Wisconsin', code: 'WI' },
      { name: 'Wyoming', code: 'WY' },
    ],
    [],
  )

  const submitLabel = useMemo(() => (mode === 'login' ? 'Log in' : 'Create account'), [mode])

  useEffect(() => {
    const nextMode = location.pathname === '/register' ? 'register' : 'login'
    setMode(nextMode)
  }, [location.pathname])

  const onSubmit = (e) => {
    e.preventDefault()
    if (mode === 'register') {
      navigate('/verify', {
        state: {
          email,
          phoneNumber,
        },
      })
      return
    }

    // UI only (no backend wiring yet)
  }

  return (
    <div className="authPage">
      <div className="bg bgAuth" />
      <div className="bgOverlay" />

      <main className="authMain">
        <div className="authBrand" aria-hidden="true">
          <img className="authLogo" src="/assets/logo_tradesmap.png" alt="" />
        </div>

        <div className="authCard authCardCompact">
          <div className={`tabs ${mode}`} role="tablist" aria-label="Authentication tabs">
            <button
              type="button"
              className={`tab ${mode === 'login' ? 'tabActive' : ''}`}
              role="tab"
              aria-selected={mode === 'login'}
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
            <button
              type="button"
              className={`tab ${mode === 'register' ? 'tabActive' : ''}`}
              role="tab"
              aria-selected={mode === 'register'}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <div className={`tabIndicator ${mode === 'login' ? 'tabLeft' : 'tabRight'}`} aria-hidden="true" />
          </div>

          <form className="form" onSubmit={onSubmit}>
            {mode === 'login' ? (
              <>
                <TextField
                  label=""
                  placeholder="Username"
                  icon={<IconUser />}
                  value={loginUsername}
                  onChange={setLoginUsername}
                />

                <TextField
                  label=""
                  placeholder="Password"
                  type="password"
                  icon={<IconLock />}
                  value={loginPassword}
                  onChange={setLoginPassword}
                />

                <div className="formRow">
                  <a className="link" href="#">
                    Forgot password?
                  </a>
                </div>

                <button type="submit" className="btn btnPrimary">
                  {submitLabel}
                </button>
              </>
            ) : (
              <>
                <TextField
                  label=""
                  placeholder="Full name"
                  icon={<IconUser />}
                  value={fullName}
                  onChange={setFullName}
                />

                <TextField
                  label=""
                  placeholder="Email"
                  icon={<IconMail />}
                  value={email}
                  onChange={setEmail}
                />

                <div className="formGrid2">
                  <TextField
                    label=""
                    placeholder="Phone number"
                    icon={<IconPhone />}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    inputMode="tel"
                  />

                  <SelectField label="" icon={<IconGlobe />} value={language} onChange={setLanguage}>
                    <option value="" disabled>
                      Language
                    </option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </SelectField>
                </div>

                <TextField
                  label=""
                  placeholder="Address"
                  icon={<IconLocation />}
                  value={address}
                  onChange={setAddress}
                />

                <div className="formGrid3">
                  <TextField
                    label=""
                    placeholder="City"
                    icon={<IconLocation />}
                    value={city}
                    onChange={setCity}
                  />

                  <SelectField label="" icon={<IconLocation />} value={stateUS} onChange={setStateUS}>
                    <option value="" disabled>
                      State
                    </option>
                    {usStates.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </SelectField>

                  <TextField
                    label=""
                    placeholder="Zip"
                    icon={<IconLocation />}
                    value={zip}
                    onChange={(v) => setZip(String(v).replace(/\D/g, '').slice(0, 5))}
                    inputMode="numeric"
                    maxLength={5}
                    pattern="[0-9]{5}"
                  />
                </div>

                <TextField
                  label=""
                  placeholder="Password"
                  type="password"
                  icon={<IconLock />}
                  value={registerPassword}
                  onChange={setRegisterPassword}
                />

                <button type="submit" className="btn btnSuccess">
                  {submitLabel}
                </button>
              </>
            )}
          </form>
        </div>
      </main>
    </div>
  )
}

function VerifyPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const email = location?.state?.email ?? ''
  const phoneNumber = location?.state?.phoneNumber ?? ''

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavHeader">
            <div className="sideMark" aria-hidden="true">
              <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
            </div>
            <div className="sideMeta">
              <div className="sideTitle">Tradesmap</div>
              <div className="sideSubtitle">Studio work workspace</div>
            </div>
          </div>

          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconGrid />
                </span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconFolder />
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">
                  12
                </span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconChart />
                </span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true">
                  <IconUser />
                </span>
                <span className="sideText">Profile</span>
              </a>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup" aria-label="General">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon" aria-hidden="true">
                  <IconLogout />
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <IconSupport />
                </span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div className="verifyPage">
            <div className="authCard authCardCompact verifyCard verifyCardV2">
              <div className="verifyTitle verifyTitleV2">Confirm your email and phone number to secure your account.</div>

              <div className="verifyRows" role="group" aria-label="Verification">
                <div className="verifyRow">
                  <div className="verifyRowLabel">
                    Email ID <span className="verifyRequired" aria-hidden="true">*</span>
                  </div>

                  <div className="verifyRowMain">
                    <TextField
                      label=""
                      placeholder="Email"
                      icon={<IconMail />}
                      value={email}
                      readOnly
                    />

                    <div className="verifyRowActions">
                      <button type="button" className="btn btnPrimary verifyInlineBtn" onClick={() => navigate('/login')}>
                        Verify
                      </button>
                      <button type="button" className="verifyResend" onClick={() => {}}>
                        Resend
                      </button>
                    </div>
                  </div>

                  <div className="verifyRowRight">
                    <div className="verifyRowHint">Not your email?</div>
                    <button type="button" className="verifyChange" onClick={() => navigate('/register')}>
                      Change it
                    </button>
                  </div>
                </div>

                <div className="verifyRow">
                  <div className="verifyRowLabel">
                    Phone No. <span className="verifyRequired" aria-hidden="true">*</span>
                  </div>

                  <div className="verifyRowMain">
                    <TextField
                      label=""
                      placeholder="Phone"
                      icon={<IconPhone />}
                      value={phoneNumber}
                      readOnly
                    />

                    <div className="verifyRowActions">
                      <button type="button" className="btn btnPrimary verifyInlineBtn" onClick={() => navigate('/wizard')}>
                        Verify
                      </button>
                    </div>
                  </div>

                  <div className="verifyRowRight">
                    <div className="verifyRowHint">Not your phone?</div>
                    <button type="button" className="verifyChange" onClick={() => navigate('/register')}>
                      Change it
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage initialMode="login" />} />
      <Route path="/register" element={<AuthPage initialMode="register" />} />
      <Route path="/verify" element={<VerifyPage />} />
      <Route path="/wizard" element={<WizardPage />} />
      <Route path="/wizard/summary" element={<WizardSummaryPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
