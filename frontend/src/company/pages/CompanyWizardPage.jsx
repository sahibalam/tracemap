// src/company/pages/CompanyWizardPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { TextField, SelectField } from '../../common/components/TextField'
import { 
  IconUser, IconMail, IconLock, IconPhone, IconLocation, 
  IconSupport, IconFolder, IconCheck, IconX, 
  IconChevronLeft, IconChevronRight, IconGrid, IconChart, IconLogout 
} from '../../common/components/Icons'

export function CompanyWizardPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const maxStep = 5

  // Form state
  const [legalName, setLegalName] = useState('')
  const [dbaName, setDbaName] = useState('')
  const [ein, setEin] = useState('')
  const [entityType, setEntityType] = useState('')
  const [formationDate, setFormationDate] = useState('')
  const [stateOfFormation, setStateOfFormation] = useState('')

  const [primaryAddress, setPrimaryAddress] = useState('')
  const [primaryCity, setPrimaryCity] = useState('')
  const [primaryState, setPrimaryState] = useState('')
  const [primaryZip, setPrimaryZip] = useState('')

  const [mailingAddress, setMailingAddress] = useState('')
  const [mailingCity, setMailingCity] = useState('')
  const [mailingState, setMailingState] = useState('')
  const [mailingZip, setMailingZip] = useState('')

  const [yearsInBusiness, setYearsInBusiness] = useState('')
  const [website, setWebsite] = useState('')
  const [companyType, setCompanyType] = useState('')
  const [deliveryModel, setDeliveryModel] = useState('')
  const [projectFocus, setProjectFocus] = useState({})

  const [projectSize, setProjectSize] = useState('')
  const [crewSize, setCrewSize] = useState('')
  const [travelWork, setTravelWork] = useState(null)
  const [shiftType, setShiftType] = useState(null)
  const [secureWork, setSecureWork] = useState(null)
  const [hourly, setHourly] = useState(null)
  const [piecework, setPiecework] = useState(null)
  const [foremanRequired, setForemanRequired] = useState(null)
  const [supplyExpectation, setSupplyExpectation] = useState('')
  const [workerDocs, setWorkerDocs] = useState('')

  const [w9TaxProfileFile, setW9TaxProfileFile] = useState('')
  const [coiFile, setCoiFile] = useState('')
  const [generalLiabilityFile, setGeneralLiabilityFile] = useState('')
  const [workersCompFile, setWorkersCompFile] = useState('')
  const [licensesFile, setLicensesFile] = useState('')
  const [billingEntityName, setBillingEntityName] = useState('')
  const [billingEmail, setBillingEmail] = useState('')
  const [billingPhone, setBillingPhone] = useState('')
  const [authorizedSignerAck, setAuthorizedSignerAck] = useState(false)
  const [acceptMsaAck, setAcceptMsaAck] = useState(false)

  const [users, setUsers] = useState([
    { name: 'Max', email: 'max@abc.com', role: 'Owner', phone: '+1 213 333 4444', status: 'Active' },
  ])
  const [inviteOpen, setInviteOpen] = useState(false)
  const [inviteFullName, setInviteFullName] = useState('')
  const [inviteEmail, setInviteEmail] = useState('')
  const [invitePhone, setInvitePhone] = useState('')
  const [inviteRole, setInviteRole] = useState('')
  const [invitePerms, setInvitePerms] = useState({})

  const toggleMapValue = (key, setMap) => (e) => setMap((prev) => ({ ...prev, [key]: e.target.checked }))

  const closeInvite = () => {
    setInviteOpen(false)
    setInviteFullName('')
    setInviteEmail('')
    setInvitePhone('')
    setInviteRole('')
    setInvitePerms({})
  }

  const sendInvite = () => {
    setUsers((prev) => [
      ...prev,
      {
        name: inviteFullName || 'New user',
        email: inviteEmail,
        role: inviteRole || 'Read only',
        phone: invitePhone,
        status: 'Invited',
      },
    ])
    closeInvite()
  }

  const stepTitle = step === 1 ? 'Business Identity' : step === 2 ? 'Business Classification' : step === 3 ? 'Operational Profile' : step === 4 ? 'Compliance & Documents' : 'Users, Roles & Access Control'
  const stepSubtitle = step === 1 ? 'Capture legal identity and address basics for the company profile.' : step === 2 ? 'Classify the business type, delivery model, and primary project focus.' : step === 3 ? 'Capture operational preferences and workforce requirements.' : step === 4 ? 'Upload required documents and complete legal acknowledgements.' : 'Invite additional company users and assign roles and permissions.'

  const goNext = () => setStep((s) => Math.min(maxStep, s + 1))
  const goPrev = () => setStep((s) => Math.max(1, s - 1))

  const wizardInner = (
    <div className="wizardPage">
      <div className="wizardCard">
        <div className="wizardHeader">
          <div>
            <div className="wizardTitle">{stepTitle}</div>
            <div className="wizardSubtitle">{stepSubtitle}</div>
          </div>
          <div className="wizardStepPills">
            {Array.from({ length: maxStep }).map((_, idx) => (
              <button key={idx + 1} type="button" className={`wizardStepPill ${step === idx + 1 ? 'wizardStepPillActive' : ''}`} onClick={() => setStep(idx + 1)}>
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="wizardBody">
            <div className="wizardSection">
              <div className="wizardSectionBar">Business Identity</div>
              <div className="wizardGrid2">
                <TextField placeholder="Legal Name" icon={<IconSupport />} value={legalName} onChange={setLegalName} />
                <TextField placeholder="DBA Name" icon={<IconSupport />} value={dbaName} onChange={setDbaName} />
              </div>
              <div className="wizardGrid2">
                <TextField placeholder="EIN" icon={<IconSupport />} value={ein} onChange={setEin} />
                <SelectField icon={<IconSupport />} value={entityType} onChange={setEntityType}>
                  <option value="" disabled>Entity Type</option>
                  <option value="llc">LLC</option>
                  <option value="corporation">Corporation</option>
                  <option value="partnership">Partnership</option>
                  <option value="sole_proprietor">Sole Proprietor</option>
                </SelectField>
              </div>
              <div className="wizardGrid2">
                <TextField placeholder="MM/DD/YYYY" icon={<IconSupport />} value={formationDate} onChange={setFormationDate} />
                <TextField placeholder="State of Formation" icon={<IconLocation />} value={stateOfFormation} onChange={setStateOfFormation} />
              </div>
            </div>
            <fieldset className="wizardFieldset">
              <legend className="wizardLegend">Primary Address</legend>
              <div className="wizardFieldsetBody">
                <TextField placeholder="Address" icon={<IconLocation />} value={primaryAddress} onChange={setPrimaryAddress} />
                <div className="wizardGrid3">
                  <TextField placeholder="City" icon={<IconLocation />} value={primaryCity} onChange={setPrimaryCity} />
                  <TextField placeholder="State" icon={<IconLocation />} value={primaryState} onChange={setPrimaryState} />
                  <TextField placeholder="Zip" icon={<IconLocation />} value={primaryZip} onChange={setPrimaryZip} />
                </div>
              </div>
            </fieldset>
            <fieldset className="wizardFieldset">
              <legend className="wizardLegend">Mailing Address</legend>
              <div className="wizardFieldsetBody">
                <TextField placeholder="Address" icon={<IconLocation />} value={mailingAddress} onChange={setMailingAddress} />
                <div className="wizardGrid3">
                  <TextField placeholder="City" icon={<IconLocation />} value={mailingCity} onChange={setMailingCity} />
                  <TextField placeholder="State" icon={<IconLocation />} value={mailingState} onChange={setMailingState} />
                  <TextField placeholder="Zip" icon={<IconLocation />} value={mailingZip} onChange={setMailingZip} />
                </div>
              </div>
            </fieldset>
            <div className="wizardSection">
              <div className="wizardSectionBar">Company Details</div>
              <div className="wizardGrid2">
                <SelectField icon={<IconSupport />} value={yearsInBusiness} onChange={setYearsInBusiness}>
                  <option value="" disabled>Years of Business</option>
                  {Array.from({ length: 51 }).map((_, idx) => <option key={idx} value={String(idx)}>{idx}</option>)}
                </SelectField>
                <TextField placeholder="Website" icon={<IconSupport />} value={website} onChange={setWebsite} />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="wizardBody">
            <div className="wizardSection">
              <div className="wizardSectionBar">Business Classification</div>
              <div className="wizardGrid2">
                <SelectField icon={<IconSupport />} value={companyType} onChange={setCompanyType}>
                  <option value="" disabled>Company type</option>
                  <option value="general_contractor">General Contractor</option>
                  <option value="sub_contractor">Sub Contractor</option>
                  <option value="staffing_partner">Staffing Partner</option>
                </SelectField>
                <SelectField icon={<IconSupport />} value={deliveryModel} onChange={setDeliveryModel}>
                  <option value="" disabled>Delivery Model</option>
                  <option value="labour_only">Labour Only</option>
                  <option value="labour_plus_supervisor">Labour + Supervisor</option>
                  <option value="self_performs_scope">Self Performs Scope</option>
                  <option value="staffing_general">Staffing General</option>
                  <option value="managed_network">Managed Network</option>
                  <option value="mixed_model">Mixed Model</option>
                </SelectField>
              </div>
            </div>
            <div className="wizardSection">
              <div className="wizardSectionBar">Project focus</div>
              <div className="wizardChecks wizardChecks2">
                {['Interiors', 'Retail', 'Industrial', 'Drywall & framing', 'Acoustical ceilings', 'Finish carpentry', 'Renovation', 'Retail Rollout', 'Hospitality / Medical / Education', 'Industrial Interiors', 'Government Secure', 'Mixed'].map((k) => (
                  <label key={k} className="wizardCheck">
                    <input type="checkbox" checked={!!projectFocus[k]} onChange={toggleMapValue(k, setProjectFocus)} />
                    {k}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="wizardBody">
            <div className="wizardSection">
              <div className="wizardSectionBar">Operational profile</div>
              <div className="wizardGrid2">
                <TextField placeholder="Project size" icon={<IconSupport />} value={projectSize} onChange={setProjectSize} />
                <TextField placeholder="Crew size" icon={<IconSupport />} value={crewSize} onChange={setCrewSize} />
              </div>
              <div className="wizardGrid2" style={{ marginTop: 6 }}>
                <div className="wizardToggleField">
                  <div className="wizardToggleLabel">Travel work</div>
                  <div className="wizardToggle">
                    <button type="button" className={`wizardToggleBtn ${travelWork === true ? 'wizardToggleBtnActive' : ''}`} onClick={() => setTravelWork(true)}>Yes</button>
                    <button type="button" className={`wizardToggleBtn ${travelWork === false ? 'wizardToggleBtnActive' : ''}`} onClick={() => setTravelWork(false)}>No</button>
                  </div>
                </div>
                <div className="wizardToggleField">
                  <div className="wizardToggleLabel">Shift type</div>
                  <div className="wizardToggle">
                    <button type="button" className={`wizardToggleBtn ${shiftType === true ? 'wizardToggleBtnActive' : ''}`} onClick={() => setShiftType(true)}>Yes</button>
                    <button type="button" className={`wizardToggleBtn ${shiftType === false ? 'wizardToggleBtnActive' : ''}`} onClick={() => setShiftType(false)}>No</button>
                  </div>
                </div>
              </div>
              <div className="wizardGrid2" style={{ marginTop: 6 }}>
                <div className="wizardToggleField">
                  <div className="wizardToggleLabel">Secure work</div>
                  <div className="wizardToggle">
                    <button type="button" className={`wizardToggleBtn ${secureWork === true ? 'wizardToggleBtnActive' : ''}`} onClick={() => setSecureWork(true)}>Yes</button>
                    <button type="button" className={`wizardToggleBtn ${secureWork === false ? 'wizardToggleBtnActive' : ''}`} onClick={() => setSecureWork(false)}>No</button>
                  </div>
                </div>
                <div className="wizardToggleField">
                  <div className="wizardToggleLabel">Hourly</div>
                  <div className="wizardToggle">
                    <button type="button" className={`wizardToggleBtn ${hourly === true ? 'wizardToggleBtnActive' : ''}`} onClick={() => setHourly(true)}>Yes</button>
                    <button type="button" className={`wizardToggleBtn ${hourly === false ? 'wizardToggleBtnActive' : ''}`} onClick={() => setHourly(false)}>No</button>
                  </div>
                </div>
              </div>
              <div className="wizardGrid2" style={{ marginTop: 6 }}>
                <div className="wizardToggleField">
                  <div className="wizardToggleLabel">Piecework</div>
                  <div className="wizardToggle">
                    <button type="button" className={`wizardToggleBtn ${piecework === true ? 'wizardToggleBtnActive' : ''}`} onClick={() => setPiecework(true)}>Yes</button>
                    <button type="button" className={`wizardToggleBtn ${piecework === false ? 'wizardToggleBtnActive' : ''}`} onClick={() => setPiecework(false)}>No</button>
                  </div>
                </div>
                <div className="wizardToggleField">
                  <div className="wizardToggleLabel">Foreman required</div>
                  <div className="wizardToggle">
                    <button type="button" className={`wizardToggleBtn ${foremanRequired === true ? 'wizardToggleBtnActive' : ''}`} onClick={() => setForemanRequired(true)}>Yes</button>
                    <button type="button" className={`wizardToggleBtn ${foremanRequired === false ? 'wizardToggleBtnActive' : ''}`} onClick={() => setForemanRequired(false)}>No</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="wizardSection">
              <div style={{ fontWeight: 900, marginBottom: 10 }}>Tradesmap is expected to supply</div>
              <div className="wizardChecks wizardChecksInline">
                <label className="wizardCheck"><input type="radio" name="supplyExpectation" checked={supplyExpectation === 'workers'} onChange={() => setSupplyExpectation('workers')} /> only workers</label>
                <label className="wizardCheck"><input type="radio" name="supplyExpectation" checked={supplyExpectation === 'workers_leadership'} onChange={() => setSupplyExpectation('workers_leadership')} /> workers + leadership</label>
              </div>
              <div style={{ fontWeight: 900, marginTop: 16 }}>What workers documents/certification required.</div>
              <div style={{ marginTop: 10 }}>
                <textarea className="wizardTextArea" value={workerDocs} onChange={(e) => setWorkerDocs(e.target.value)} placeholder="Enter required documents/certifications" rows={4} />
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="wizardBody">
            <div className="wizardSection">
              <div className="wizardSectionBar">Compliance & Documents</div>
              <div className="wizardSubtitle" style={{ marginTop: 8 }}>Upload required documents and complete legal acknowledgements.</div>
              <div style={{ marginTop: 14 }}>
                <label className="field"><div className="fieldLabel">W-9 / Tax profile</div><div className="fieldControl"><span className="fieldIcon"><IconFolder /></span><input className="fieldInput" type="file" onChange={(e) => setW9TaxProfileFile(e.target.files?.[0]?.name || '')} /></div></label>
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75, fontWeight: 700 }}>{w9TaxProfileFile || 'No file selected'}</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <label className="field"><div className="fieldLabel">Certificate of Insurance (COI)</div><div className="fieldControl"><span className="fieldIcon"><IconFolder /></span><input className="fieldInput" type="file" onChange={(e) => setCoiFile(e.target.files?.[0]?.name || '')} /></div></label>
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75, fontWeight: 700 }}>{coiFile || 'No file selected'}</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <label className="field"><div className="fieldLabel">General Liability Evidence</div><div className="fieldControl"><span className="fieldIcon"><IconFolder /></span><input className="fieldInput" type="file" onChange={(e) => setGeneralLiabilityFile(e.target.files?.[0]?.name || '')} /></div></label>
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75, fontWeight: 700 }}>{generalLiabilityFile || 'No file selected'}</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <label className="field"><div className="fieldLabel">Workers compensation</div><div className="fieldControl"><span className="fieldIcon"><IconFolder /></span><input className="fieldInput" type="file" onChange={(e) => setWorkersCompFile(e.target.files?.[0]?.name || '')} /></div></label>
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75, fontWeight: 700 }}>{workersCompFile || 'No file selected'}</div>
              </div>
              <div style={{ marginTop: 12 }}>
                <label className="field"><div className="fieldLabel">Licenses (if applicable)</div><div className="fieldControl"><span className="fieldIcon"><IconFolder /></span><input className="fieldInput" type="file" onChange={(e) => setLicensesFile(e.target.files?.[0]?.name || '')} /></div></label>
                <div style={{ marginTop: 6, fontSize: 12, opacity: 0.75, fontWeight: 700 }}>{licensesFile || 'No file selected'}</div>
              </div>
              <div className="wizardGrid2" style={{ marginTop: 16 }}>
                <TextField placeholder="Billing entity name" icon={<IconUser />} value={billingEntityName} onChange={setBillingEntityName} />
                <TextField placeholder="Billing email" icon={<IconMail />} value={billingEmail} onChange={setBillingEmail} />
              </div>
              <div className="wizardGrid2" style={{ marginTop: 8 }}>
                <TextField placeholder="Billing phone" icon={<IconPhone />} value={billingPhone} onChange={setBillingPhone} />
              </div>
              <div className="wizardChecks" style={{ marginTop: 14 }}>
                <label className="wizardCheck"><input type="checkbox" checked={authorizedSignerAck} onChange={(e) => setAuthorizedSignerAck(e.target.checked)} /> I confirm I am an authorized signer for this company</label>
                <label className="wizardCheck"><input type="checkbox" checked={acceptMsaAck} onChange={(e) => setAcceptMsaAck(e.target.checked)} /> I accept the terms & Master Service Agreement (MSA)</label>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="wizardBody">
            <div className="wizardSection">
              <div className="wizardSectionBar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
                <span>Users management</span>
                <button type="button" className="wizardPillBtn wizardPillBtnPrimary" onClick={() => setInviteOpen(true)}>
                  <span className="wizardPillBtnLabel">Invite user</span>
                  <span className="wizardPillBtnIcon" aria-hidden="true">+</span>
                </button>
              </div>
              <div className="wizardSummaryTable" style={{ marginTop: 12 }}>
                <div className="wizardSummaryTableHead" style={{ gridTemplateColumns: '1fr 1.4fr 0.8fr 1.1fr 0.8fr' }}>
                  <div>Name</div><div>Email</div><div>Role</div><div>Phone no.</div><div>Status</div>
                </div>
                {users.map((u, idx) => (
                  <div key={idx} className="wizardSummaryTableRow" style={{ gridTemplateColumns: '1fr 1.4fr 0.8fr 1.1fr 0.8fr' }}>
                    <div>{u.name}</div><div>{u.email}</div><div>{u.role}</div><div>{u.phone}</div><div><span className="wizardSummaryStatusPill">{u.status}</span></div>
                  </div>
                ))}
              </div>
            </div>
            {inviteOpen && (
              <div className="tmModalOverlay" role="dialog" aria-modal="true">
                <div className="tmModal">
                  <div className="tmModalHeader"><div className="tmModalTitle">Add user</div><button type="button" className="tmModalClose" onClick={closeInvite}>×</button></div>
                  <div className="tmModalBody">
                    <div className="wizardGrid2">
                      <TextField placeholder="Full name" icon={<IconUser />} value={inviteFullName} onChange={setInviteFullName} />
                      <TextField placeholder="Email" icon={<IconMail />} value={inviteEmail} onChange={setInviteEmail} />
                      <TextField placeholder="Phone number" icon={<IconPhone />} value={invitePhone} onChange={setInvitePhone} />
                      <SelectField icon={<IconSupport />} value={inviteRole} onChange={setInviteRole}>
                        <option value="" disabled>Select the role</option>
                        {['Company Admin', 'Operations Manager', 'Project Manager', 'Superintendent', 'Recruiter', 'Safety Manager', 'Billing / AP', 'Read only'].map(r => <option key={r} value={r}>{r}</option>)}
                      </SelectField>
                    </div>
                    <div style={{ marginTop: 12, fontWeight: 900 }}>Permissions</div>
                    <div className="wizardChecks wizardChecks2" style={{ marginTop: 10 }}>
                      {['Create projects', 'Edit projects', 'Manage users', 'Billing access', 'View workers', 'Request workers'].map(p => (
                        <label key={p} className="wizardCheck"><input type="checkbox" checked={!!invitePerms[p]} onChange={toggleMapValue(p, setInvitePerms)} />{p}</label>
                      ))}
                    </div>
                  </div>
                  <div className="tmModalFooter">
                    <button type="button" className="wizardPillBtn wizardPillBtnSecondary" onClick={closeInvite}><span className="wizardPillBtnLabel">Cancel</span><span className="wizardPillBtnIcon"><IconX /></span></button>
                    <button type="button" className="wizardPillBtn wizardPillBtnSuccess" onClick={sendInvite}><span className="wizardPillBtnLabel">Send invite</span><span className="wizardPillBtnIcon"><IconCheck /></span></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        <div className="wizardFooter">
          <button type="button" className="wizardPillBtn" onClick={step === 1 ? () => navigate('/company/verify') : goPrev}>
            <span className="wizardPillBtnLabel">Back</span><span className="wizardPillBtnIcon"><IconChevronLeft /></span>
          </button>
          <div className="wizardFooterRight">
            {step < maxStep ? (
              <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={goNext}>
                <span className="wizardPillBtnLabel">Next</span><span className="wizardPillBtnIcon"><IconChevronRight /></span>
              </button>
            ) : (
              <button type="button" className="wizardPillBtn wizardPillBtnSuccess" onClick={() => navigate('/')}>
                <span className="wizardPillBtnLabel">Finish</span><span className="wizardPillBtnIcon"><IconCheck /></span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="appShell">
      <TopNav variant="solid" />
      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue">
          <div className="sideNavHeader"><div className="sideMark"><img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" /></div><div className="sideMeta"><div className="sideTitle">Tradesmap</div></div></div>
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup">
              <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconGrid /></span><span className="sideText">Overview</span></span>
              <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconFolder /></span><span className="sideText">Projects</span><span className="sideBadge">12</span></span>
              <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconChart /></span><span className="sideText">Revenues</span></span>
              <a className="sideItem sideItemActive" href="#"><span className="sideIcon"><IconUser /></span><span className="sideText">Profile</span></a>
            </nav>
          </div>
          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/company/login')}><span className="sideIcon"><IconLogout /></span><span className="sideText">Sign out</span></button>
              <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconSupport /></span><span className="sideText">Support</span></span>
            </nav>
          </div>
        </aside>
        <main className="appContent">{wizardInner}</main>
      </div>
    </div>
  )
}