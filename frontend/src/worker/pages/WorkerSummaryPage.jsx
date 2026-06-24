// // src/worker/pages/WorkerSummaryPage.jsx
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'

// export function WorkerSummaryPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const data = location?.state ?? {}

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />
//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue">
//           <div className="sideNavHeader">
//             <div className="sideMark"><img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" /></div>
//             <div className="sideMeta"><div className="sideTitle">Tradesmap</div></div>
//           </div>
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup">
//               <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconGrid /></span><span className="sideText">Overview</span></span>
//               <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconFolder /></span><span className="sideText">Projects</span><span className="sideBadge">12</span></span>
//               <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconChart /></span><span className="sideText">Revenues</span></span>
//               <a className="sideItem sideItemActive" href="#"><span className="sideIcon"><IconUser /></span><span className="sideText">Profile</span></a>
//             </nav>
//           </div>
//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}><span className="sideIcon"><IconLogout /></span><span className="sideText">Sign out</span></button>
//               <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconSupport /></span><span className="sideText">Support</span></span>
//             </nav>
//           </div>
//         </aside>
//         <main className="appContent">
//           <div style={{ padding: '40px', textAlign: 'center' }}>
//             <h2>Registration Complete!</h2>
//             <p>Thank you for registering with TradesMap.</p>
//             <button className="btn btnPrimary" onClick={() => navigate('/')}>Go to Home</button>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// // Icons
// function IconGrid(props) {
//   return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/></svg>
// }
// function IconFolder(props) {
//   return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/></svg>
// }
// function IconChart(props) {
//   return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/></svg>
// }
// function IconLogout(props) {
//   return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/></svg>
// }
// function IconSupport(props) {
//   return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor"/></svg>
// }
// function IconUser(props) {
//   return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/></svg>
// }



// src/worker/pages/WorkerSummaryPage.jsx
import { useState } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'

// Icons
function IconGrid(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
    </svg>
  )
}

function IconFolder(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor" />
    </svg>
  )
}

function IconChart(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor" />
    </svg>
  )
}

function IconLogout(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
    </svg>
  )
}

function IconSupport(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
    </svg>
  )
}

function IconUser(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
    </svg>
  )
}

function IconPencil(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" fill="currentColor" />
    </svg>
  )
}

export function WorkerSummaryPage() {
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
  const medical = data.medical ?? {}
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
            </div>
          </div>

          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
                <span className="sideText">Overview</span>
              </span>
              <NavLink to="/projects" className={({ isActive }) => `sideItem ${isActive ? 'sideItemActive' : ''}`}>
                <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">12</span>
              </NavLink>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconChart /></span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true"><IconUser /></span>
                <span className="sideText">Profile</span>
              </a>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup" aria-label="General">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div className="wizardSummaryPage">
            <div className="wizardSummaryTop">
              {/* Basics Identity Card */}
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Basics Identity</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Basics Identity" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryIdentity">
                    <div className="wizardSummaryIdentityLeft">
                      <img className="wizardSummaryAvatar" src="/assets/worker.avif" alt="Worker" />
                      <div className="wizardSummaryStatusPill">Active</div>
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
                        <div className="wizardSummaryLabel">Phone</div>
                        <div className="wizardSummaryValue">{displayValue(basics.mobilePhone, '(555) 123-4567')}</div>
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
                      <div className="wizardSummaryRow">
                        <div className="wizardSummaryLabel">Display Name</div>
                        <div className="wizardSummaryValue">{displayValue(basics.displayName, 'Johnny')}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trade Profile Card */}
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Trade Profile & Skill Matrix</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Trade profile" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Primary trade</div>
                    <div className="wizardSummaryValue">{displayValue(trade.primaryTrade, 'Drywall')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Primary level</div>
                    <div className="wizardSummaryValue">{displayValue(trade.primaryLevel, 'Helper')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Years of experience</div>
                    <div className="wizardSummaryValue">{displayValue(trade.yearsExperience, '4 years')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Travel radius</div>
                    <div className="wizardSummaryValue">{displayValue(trade.travelRadiusMiles, '20 miles')}</div>
                  </div>
                </div>
              </div>

              {/* Emergency Medical Card */}
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Emergency Medical</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Emergency Medical" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Blood Group</div>
                    <div className="wizardSummaryValue">{displayValue(medical.bloodGroup, 'Not specified')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Medical Info</div>
                    <div className="wizardSummaryValue">
                      {displayValue(
                        medical.emergencyMedicalInfo === 'disclosure' ? 'Voluntary disclosure provided' : 
                        medical.emergencyMedicalInfo === 'skip' ? 'Skipped for now' : 'None',
                        'None'
                      )}
                    </div>
                  </div>
                  {medical.emergencyInstructions && (
                    <div className="wizardSummaryRow">
                      <div className="wizardSummaryLabel">Instructions</div>
                      <div className="wizardSummaryValue">{medical.emergencyInstructions}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Work History Wide Card */}
            <div className="wizardSummaryWideCard">
              <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                <span>Work History & Project Experience</span>
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
                {workHistory.referenceName && (
                  <div style={{ marginTop: 16, padding: '0 12px 12px' }}>
                    <div className="wizardSummaryRow">
                      <div className="wizardSummaryLabel">Reference</div>
                      <div className="wizardSummaryValue">
                        {displayValue(workHistory.referenceName, '')} {workHistory.referenceTitle ? `(${workHistory.referenceTitle})` : ''}
                        {workHistory.referencePhone ? ` - ${workHistory.referencePhone}` : ''}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="wizardSummaryBottom">
              {/* Certifications Card */}
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Certifications & Safety</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Certifications" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">OSHA 10</div>
                    <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['OSHA 10'] ? '✓ Yes' : 'Not specified'}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">OSHA 30</div>
                    <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['OSHA 30'] ? '✓ Yes' : 'Not specified'}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Scissor Lift</div>
                    <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['Scissor lift'] ? '✓ Yes' : 'Not specified'}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">CPR / First Aid</div>
                    <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['CPR / First Aid'] ? '✓ Yes' : 'Not specified'}</div>
                  </div>
                </div>
              </div>

              {/* Tax & Compliance Card */}
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Tax & Compliance</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Tax & Compliance" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Classification</div>
                    <div className="wizardSummaryValue">
                      {displayValue(
                        tax.classificationPath === 'employee' ? 'Employee / W-2' : 
                        tax.classificationPath === 'subcontractor' ? 'Subcontractor / 1099' : 'Not specified',
                        'Not specified'
                      )}
                    </div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">State of Work</div>
                    <div className="wizardSummaryValue">{displayValue(tax.stateOfWork, 'Not specified')}</div>
                  </div>
                  {tax.classificationPath === 'employee' && (
                    <div className="wizardSummaryRow">
                      <div className="wizardSummaryLabel">Tax Name</div>
                      <div className="wizardSummaryValue">{displayValue(tax.employeeTaxName, 'Not specified')}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Availability Card */}
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Availability & Pay</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Availability" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Earliest Start</div>
                    <div className="wizardSummaryValue">{displayValue(availability.earliestStartDate, 'Not specified')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Hourly Rate</div>
                    <div className="wizardSummaryValue">{displayValue(availability.hourlyRateRequested ? `$${availability.hourlyRateRequested}` : '', 'Not specified')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Pay Preferences</div>
                    <div className="wizardSummaryValue">
                      {Object.keys(availability.payPrefs || {}).filter(k => availability.payPrefs[k]).join(', ') || 'Not specified'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency Contact & Acknowledgments */}
            <div className="wizardSummaryBottom">
              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Emergency Contact</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Emergency contact" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Name</div>
                    <div className="wizardSummaryValue">{displayValue(acknowledgments.emergencyContactName, 'Not specified')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Relationship</div>
                    <div className="wizardSummaryValue">{displayValue(acknowledgments.emergencyContactRelationship, 'Not specified')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Phone</div>
                    <div className="wizardSummaryValue">{displayValue(acknowledgments.emergencyContactPhone, 'Not specified')}</div>
                  </div>
                </div>
              </div>

              <div className="wizardSummaryCard">
                <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
                  <span>Acknowledgments & Signature</span>
                  <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Acknowledgments" disabled>
                    <IconPencil />
                  </button>
                </div>
                <div className="wizardSummaryCardBody">
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Signed by</div>
                    <div className="wizardSummaryValue">{displayValue(acknowledgments.signatureWorkerName, 'Not signed')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Date</div>
                    <div className="wizardSummaryValue">{displayValue(acknowledgments.signatureDate, 'Not specified')}</div>
                  </div>
                  <div className="wizardSummaryRow">
                    <div className="wizardSummaryLabel">Policies Accepted</div>
                    <div className="wizardSummaryValue">
                      {Object.keys(acknowledgments.policyAcks || {}).filter(k => acknowledgments.policyAcks[k]).length || 0} of 5 accepted
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="wizardSummaryFooter">
              <button type="button" className="btn btnPrimary" onClick={() => navigate('/wizard')}>
                Back to wizard
              </button>
              <button type="button" className="btn btnSuccess" onClick={() => navigate('/')}>
                Go to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}