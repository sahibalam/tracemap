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



// // src/worker/pages/WorkerSummaryPage.jsx
// import { useState } from 'react'
// import { useNavigate, useLocation, NavLink } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'

// // Icons
// function IconGrid(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconFolder(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconChart(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconSupport(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconPencil(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" fill="currentColor" />
//     </svg>
//   )
// }

// export function WorkerSummaryPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const data = location?.state ?? {}

//   const basics = data.basics ?? {}
//   const trade = data.trade ?? {}
//   const workHistory = data.workHistory ?? {}
//   const projects = workHistory.projects ?? []
//   const certifications = data.certifications ?? {}
//   const tax = data.tax ?? {}
//   const availability = data.availability ?? {}
//   const medical = data.medical ?? {}
//   const acknowledgments = data.acknowledgments ?? {}

//   const displayValue = (value, fallback) => {
//     if (value === 0) return 0
//     if (value === false) return false
//     if (value === null || value === undefined) return fallback
//     if (typeof value === 'string' && value.trim() === '') return fallback
//     return value
//   }

//   const fallbackProjects = [
//     {
//       name: 'ABC construct',
//       client: 'XYZ Inc',
//       city: 'XYZ',
//       state: 'FL',
//       role: 'Helper',
//       start: '04/12/2024',
//       end: '04/15/2025',
//     },
//     {
//       name: 'DMC construct',
//       client: 'DMX Inc',
//       city: 'XYZ',
//       state: 'CA',
//       role: 'Helper',
//       start: '04/05/2024',
//       end: '04/10/2025',
//     },
//   ]

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
       

//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <NavLink to="/projects" className={({ isActive }) => `sideItem ${isActive ? 'sideItemActive' : ''}`}>
//                 <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge" aria-label="12 projects">12</span>
//               </NavLink>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconChart /></span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon" aria-hidden="true"><IconUser /></span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div className="wizardSummaryPage">
//             <div className="wizardSummaryTop">
//               {/* Basics Identity Card */}
//               <div className="wizardSummaryCard">
//                 <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
//                   <span>Basics Identity</span>
//                   <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Basics Identity" disabled>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div className="wizardSummaryCardBody">
//                   <div className="wizardSummaryIdentity">
//                     <div className="wizardSummaryIdentityLeft">
//                       <img className="wizardSummaryAvatar" src="/assets/worker.avif" alt="Worker" />
//                       <div className="wizardSummaryStatusPill">Active</div>
//                     </div>
//                     <div className="wizardSummaryIdentityRight">
//                       <div className="wizardSummaryRow">
//                         <div className="wizardSummaryLabel">Name</div>
//                         <div className="wizardSummaryValue">
//                           {displayValue(`${basics.legalFirstName ?? ''} ${basics.legalLastName ?? ''}`.trim(), 'John Smith')}
//                         </div>
//                       </div>
//                       <div className="wizardSummaryRow">
//                         <div className="wizardSummaryLabel">Email</div>
//                         <div className="wizardSummaryValue">{displayValue(basics.emailAddress, 'john.smith@email.com')}</div>
//                       </div>
//                       <div className="wizardSummaryRow">
//                         <div className="wizardSummaryLabel">Phone</div>
//                         <div className="wizardSummaryValue">{displayValue(basics.mobilePhone, '(555) 123-4567')}</div>
//                       </div>
//                       <div className="wizardSummaryRow">
//                         <div className="wizardSummaryLabel">DOB</div>
//                         <div className="wizardSummaryValue">{displayValue(basics.dob, '01/01/1990')}</div>
//                       </div>
//                       <div className="wizardSummaryRow">
//                         <div className="wizardSummaryLabel">Address</div>
//                         <div className="wizardSummaryValue">
//                           {displayValue(
//                             [basics.addressLine1, basics.addressLine2, basics.city, basics.stateCode, basics.zip].filter(Boolean).join(', '),
//                             '123 Main St, Miami, FL 33101',
//                           )}
//                         </div>
//                       </div>
//                       <div className="wizardSummaryRow">
//                         <div className="wizardSummaryLabel">Display Name</div>
//                         <div className="wizardSummaryValue">{displayValue(basics.displayName, 'Johnny')}</div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Trade Profile Card */}
//               <div className="wizardSummaryCard">
//                 <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
//                   <span>Trade Profile & Skill Matrix</span>
//                   <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Trade profile" disabled>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div className="wizardSummaryCardBody">
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Primary trade</div>
//                     <div className="wizardSummaryValue">{displayValue(trade.primaryTrade, 'Drywall')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Primary level</div>
//                     <div className="wizardSummaryValue">{displayValue(trade.primaryLevel, 'Helper')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Years of experience</div>
//                     <div className="wizardSummaryValue">{displayValue(trade.yearsExperience, '4 years')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Travel radius</div>
//                     <div className="wizardSummaryValue">{displayValue(trade.travelRadiusMiles, '20 miles')}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Medical Card */}
//               <div className="wizardSummaryCard">
//                 <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
//                   <span>Emergency Medical</span>
//                   <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Emergency Medical" disabled>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div className="wizardSummaryCardBody">
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Blood Group</div>
//                     <div className="wizardSummaryValue">{displayValue(medical.bloodGroup, 'Not specified')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Medical Info</div>
//                     <div className="wizardSummaryValue">
//                       {displayValue(
//                         medical.emergencyMedicalInfo === 'disclosure' ? 'Voluntary disclosure provided' : 
//                         medical.emergencyMedicalInfo === 'skip' ? 'Skipped for now' : 'None',
//                         'None'
//                       )}
//                     </div>
//                   </div>
//                   {medical.emergencyInstructions && (
//                     <div className="wizardSummaryRow">
//                       <div className="wizardSummaryLabel">Instructions</div>
//                       <div className="wizardSummaryValue">{medical.emergencyInstructions}</div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Work History Wide Card */}
//             <div className="wizardSummaryWideCard">
//               <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
//                 <span>Work History & Project Experience</span>
//                 <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Work History" disabled>
//                   <IconPencil />
//                 </button>
//               </div>
//               <div className="wizardSummaryWideBody">
//                 <div className="wizardSummaryTable">
//                   <div className="wizardSummaryTableHead">
//                     <div>Project name</div>
//                     <div>Client</div>
//                     <div>City, State</div>
//                     <div>Role</div>
//                     <div>Start</div>
//                     <div>End</div>
//                   </div>
//                   {(projects.length ? projects : fallbackProjects).map((p, idx) => (
//                     <div key={idx} className="wizardSummaryTableRow">
//                       <div>{displayValue(p.name, 'ABC construct')}</div>
//                       <div>{displayValue(p.client, 'XYZ Inc')}</div>
//                       <div>{displayValue([p.city, p.state].filter(Boolean).join(', '), 'XYZ, FL')}</div>
//                       <div>{displayValue(p.role, 'Helper')}</div>
//                       <div>{displayValue(p.start, '04/12/2024')}</div>
//                       <div>{displayValue(p.end, '04/15/2025')}</div>
//                     </div>
//                   ))}
//                 </div>
//                 {workHistory.referenceName && (
//                   <div style={{ marginTop: 16, padding: '0 12px 12px' }}>
//                     <div className="wizardSummaryRow">
//                       <div className="wizardSummaryLabel">Reference</div>
//                       <div className="wizardSummaryValue">
//                         {displayValue(workHistory.referenceName, '')} {workHistory.referenceTitle ? `(${workHistory.referenceTitle})` : ''}
//                         {workHistory.referencePhone ? ` - ${workHistory.referencePhone}` : ''}
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             <div className="wizardSummaryBottom">
//               {/* Certifications Card */}
//               <div className="wizardSummaryCard">
//                 <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
//                   <span>Certifications & Safety</span>
//                   <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Certifications" disabled>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div className="wizardSummaryCardBody">
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">OSHA 10</div>
//                     <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['OSHA 10'] ? '✓ Yes' : 'Not specified'}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">OSHA 30</div>
//                     <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['OSHA 30'] ? '✓ Yes' : 'Not specified'}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Scissor Lift</div>
//                     <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['Scissor lift'] ? '✓ Yes' : 'Not specified'}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">CPR / First Aid</div>
//                     <div className="wizardSummaryValue">{(certifications.certChecklist ?? {})['CPR / First Aid'] ? '✓ Yes' : 'Not specified'}</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Tax & Compliance Card */}
//               <div className="wizardSummaryCard">
//                 <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
//                   <span>Tax & Compliance</span>
//                   <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Tax & Compliance" disabled>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div className="wizardSummaryCardBody">
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Classification</div>
//                     <div className="wizardSummaryValue">
//                       {displayValue(
//                         tax.classificationPath === 'employee' ? 'Employee / W-2' : 
//                         tax.classificationPath === 'subcontractor' ? 'Subcontractor / 1099' : 'Not specified',
//                         'Not specified'
//                       )}
//                     </div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">State of Work</div>
//                     <div className="wizardSummaryValue">{displayValue(tax.stateOfWork, 'Not specified')}</div>
//                   </div>
//                   {tax.classificationPath === 'employee' && (
//                     <div className="wizardSummaryRow">
//                       <div className="wizardSummaryLabel">Tax Name</div>
//                       <div className="wizardSummaryValue">{displayValue(tax.employeeTaxName, 'Not specified')}</div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Availability Card */}
//               <div className="wizardSummaryCard">
//                 <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
//                   <span>Availability & Pay</span>
//                   <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Availability" disabled>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div className="wizardSummaryCardBody">
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Earliest Start</div>
//                     <div className="wizardSummaryValue">{displayValue(availability.earliestStartDate, 'Not specified')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Hourly Rate</div>
//                     <div className="wizardSummaryValue">{displayValue(availability.hourlyRateRequested ? `$${availability.hourlyRateRequested}` : '', 'Not specified')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Pay Preferences</div>
//                     <div className="wizardSummaryValue">
//                       {Object.keys(availability.payPrefs || {}).filter(k => availability.payPrefs[k]).join(', ') || 'Not specified'}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Emergency Contact & Acknowledgments */}
//             <div className="wizardSummaryBottom">
//               <div className="wizardSummaryCard">
//                 <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
//                   <span>Emergency Contact</span>
//                   <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Emergency contact" disabled>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div className="wizardSummaryCardBody">
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Name</div>
//                     <div className="wizardSummaryValue">{displayValue(acknowledgments.emergencyContactName, 'Not specified')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Relationship</div>
//                     <div className="wizardSummaryValue">{displayValue(acknowledgments.emergencyContactRelationship, 'Not specified')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Phone</div>
//                     <div className="wizardSummaryValue">{displayValue(acknowledgments.emergencyContactPhone, 'Not specified')}</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="wizardSummaryCard">
//                 <div className="wizardSummaryCardTitle wizardSummaryCardTitleWithAction">
//                   <span>Acknowledgments & Signature</span>
//                   <button type="button" className="wizardSummaryEditBtn" aria-label="Edit Acknowledgments" disabled>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div className="wizardSummaryCardBody">
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Signed by</div>
//                     <div className="wizardSummaryValue">{displayValue(acknowledgments.signatureWorkerName, 'Not signed')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Date</div>
//                     <div className="wizardSummaryValue">{displayValue(acknowledgments.signatureDate, 'Not specified')}</div>
//                   </div>
//                   <div className="wizardSummaryRow">
//                     <div className="wizardSummaryLabel">Policies Accepted</div>
//                     <div className="wizardSummaryValue">
//                       {Object.keys(acknowledgments.policyAcks || {}).filter(k => acknowledgments.policyAcks[k]).length || 0} of 5 accepted
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="wizardSummaryFooter">
//               <button type="button" className="btn btnPrimary" onClick={() => navigate('/wizard')}>
//                 Back to wizard
//               </button>
//               <button type="button" className="btn btnSuccess" onClick={() => navigate('/')}>
//                 Go to Home
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }





// // src/worker/pages/WorkerSummaryPage.jsx
// import { useState } from 'react'
// import { useNavigate, useLocation, NavLink } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'

// // Icons
// function IconGrid(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconFolder(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconChart(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconSupport(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconPencil(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconCheckCircle(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconTrophy(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="currentColor" />
//     </svg>
//   )
// }

// export function WorkerSummaryPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const data = location?.state ?? {}

//   const basics = data.basics ?? {}
//   const trade = data.trade ?? {}
//   const workHistory = data.workHistory ?? {}
//   const projects = workHistory.projects ?? []
//   const certifications = data.certifications ?? {}
//   const tax = data.tax ?? {}
//   const availability = data.availability ?? {}
//   const medical = data.medical ?? {}
//   const acknowledgments = data.acknowledgments ?? {}

//   const displayValue = (value, fallback) => {
//     if (value === 0) return 0
//     if (value === false) return false
//     if (value === null || value === undefined) return fallback || '—'
//     if (typeof value === 'string' && value.trim() === '') return fallback || '—'
//     return value
//   }

//   const fallbackProjects = [
//     {
//       name: 'ABC construct',
//       client: 'XYZ Inc',
//       role: 'Helper',
//       trade: 'Drywall',
//     },
//     {
//       name: 'DMC construct',
//       client: 'DMX Inc',
//       role: 'Helper',
//       trade: 'Drywall',
//     },
//   ]

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <NavLink to="/projects" className={({ isActive }) => `sideItem ${isActive ? 'sideItemActive' : ''}`}>
//                 <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge" aria-label="12 projects">12</span>
//               </NavLink>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconChart /></span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon" aria-hidden="true"><IconUser /></span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div className="wizardSummaryPage" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            
//             {/* Row 1: Basic Information, Trade Profile, Subscription & Rewards */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Basic Information Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Basic Information</span>
//                   <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
//                     <img src="/assets/worker.avif" alt="Worker" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
//                     <div>
//                       <div style={{ fontWeight: 600, fontSize: '16px', color: '#17263a' }}>{displayValue(`${basics.legalFirstName ?? ''} ${basics.legalLastName ?? ''}`.trim(), 'Marcus Webb')}</div>
//                       <span style={{ fontSize: '12px', color: '#2fb463', fontWeight: 500 }}>Active</span>
//                     </div>
//                   </div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Date of Birth</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basics.dob)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Language</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basics.primaryLanguage)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Email</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basics.emailAddress)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Phone No.</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basics.mobilePhone)}</div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Address</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue([basics.addressLine1, basics.city, basics.stateCode, basics.zip].filter(Boolean).join(', '))}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Trade Profile Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Trade Profile</span>
//                   <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Primary Trade</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(trade.primaryTrade)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Secondary Trade</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(trade.secondaryTrade || '—')}</div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Experience</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(trade.yearOfExperience || trade.yearsExperience)} years</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Subscription & Rewards Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Subscription & Rewards</span>
//                   <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Active Plan</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Pro</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Plan tier</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Professional</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Renews</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Dec 31, 2026</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Pro Field</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Drywall</span>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(15,78,169,0.06)', borderRadius: '8px', textAlign: 'center' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
//                       <IconTrophy style={{ color: '#f59e0b' }} />
//                       <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f4ea9' }}>12</span>
//                       <span style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>Skill-verified by TradeOps</span>
//                     </div>
//                     <div style={{ fontSize: '12px', color: '#2fb463', fontWeight: 600, marginTop: '4px' }}>TRADE POINTS</div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Row 2: Work History */}
//             <div className="wizardSummaryWideCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', marginBottom: '20px' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                 <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Work History</span>
//                 <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                   <IconPencil />
//                 </button>
//               </div>
//               <div>
//                 {/* Table Header */}
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', padding: '8px 12px', borderBottom: '2px solid rgba(18,38,63,0.08)', fontWeight: 600, fontSize: '12px', color: 'rgba(23,38,58,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//                   <div>PROJECT</div>
//                   <div>COMPANY</div>
//                   <div>TRADE</div>
//                   <div>ROLE</div>
//                 </div>
//                 {/* Table Rows */}
//                 {(projects.length ? projects : fallbackProjects).map((p, idx) => (
//                   <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', padding: '10px 12px', borderBottom: idx < (projects.length ? projects.length - 1 : fallbackProjects.length - 1) ? '1px solid rgba(18,38,63,0.06)' : 'none', fontSize: '14px', color: '#17263a' }}>
//                     <div>{displayValue(p.name, 'ABC construct')}</div>
//                     <div>{displayValue(p.client, 'XYZ Inc')}</div>
//                     <div>{displayValue(p.trade, 'Drywall')}</div>
//                     <div>{displayValue(p.role, 'Helper')}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Row 3: Availability & Rate, Certifications & Safety, Tax Profile, Payment/Bank Details */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Availability & Rate Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Availability & Rate</span>
//                   <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Hourly Rate</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(availability.hourlyRateRequested ? `$${availability.hourlyRateRequested}` : '—')}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Travel</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{trade.travelRadiusMiles ? 'Yes' : 'No'}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Available</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(availability.earliestStartDate, 'Immediate')}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Certifications & Safety Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Certifications & Safety</span>
//                   <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>OSHA 30</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Verified
//                       </span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Forklift Certified</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Tax Profile Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Tax Profile</span>
//                   <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Classification</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(tax.classificationPath === 'employee' ? 'W2 Employee' : tax.classificationPath === 'subcontractor' ? '1099 Contractor' : '—')}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Tax Verified</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment/Bank Details Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Payment / Bank Details</span>
//                   <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Bank</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Chase Bank</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>ACH</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Enabled
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Row 4: Medical Details & Emergency Contact */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Medical Details Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Medical Details</span>
//                   <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Blood Group</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(medical.bloodGroup)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Allergies</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>No Allergies</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Contact Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Emergency Contact</span>
//                   <button type="button" disabled style={{ background: 'none', border: 'none', color: '#0f4ea9', cursor: 'pointer' }}>
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Name</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(acknowledgments.emergencyContactName)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Relationship</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(acknowledgments.emergencyContactRelationship)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Phone</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(acknowledgments.emergencyContactPhone)}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Footer Buttons */}
//             <div className="wizardSummaryFooter" style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(18,38,63,0.08)' }}>
//               <button type="button" className="btn btnPrimary" onClick={() => navigate('/wizard')} style={{ padding: '10px 24px', borderRadius: '8px', background: '#0f4ea9', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Back to wizard
//               </button>
//               <button type="button" className="btn btnSuccess" onClick={() => navigate('/')} style={{ padding: '10px 24px', borderRadius: '8px', background: '#2fb463', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Go to Home
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }



// // src/worker/pages/WorkerSummaryPage.jsx
// import { useState } from 'react'
// import { useNavigate, useLocation, NavLink } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'

// // Icons
// function IconGrid(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconFolder(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconChart(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconSupport(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconPencil(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconCheckCircle(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconTrophy(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="currentColor" />
//     </svg>
//   )
// }

// export function WorkerSummaryPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const data = location?.state ?? {}

//   // Check if we have updated basic data from the edit page
//   const updatedBasicData = location?.state?.basicData || {}
//   const hasUpdatedBasic = location?.state?.updatedBasic || false

//   // Check if we have updated medical data from the edit page
//   const updatedMedicalData = location?.state?.medicalData || {}
//   const hasUpdatedMedical = location?.state?.updatedMedical || false

//   // Check if we have updated tax data from the edit page
//   const updatedTaxData = location?.state?.taxData || {}
//   const hasUpdatedTax = location?.state?.updatedTax || false

//   // Check if we have updated certification data from the edit page
//   const updatedCertData = location?.state?.certData || {}
//   const hasUpdatedCert = location?.state?.updatedCert || false

//   // Check if we have updated payment data from the edit page
//   const updatedPaymentData = location?.state?.paymentData || {}
//   const hasUpdatedPayment = location?.state?.updatedPayment || false

//   // Check if we have updated availability data from the edit page
//   const updatedAvailabilityData = location?.state?.availabilityData || {}
//   const hasUpdatedAvailability = location?.state?.updatedAvailability || false

//   // Check if we have updated work history data from the edit page
//   const updatedWorkHistoryData = location?.state?.workHistoryData || {}
//   const hasUpdatedWorkHistory = location?.state?.updatedWorkHistory || false

//   // Check if we have updated trade data from the edit page
//   const updatedTradeData = location?.state?.tradeData || {}
//   const hasUpdatedTrade = location?.state?.updatedTrade || false

//   // Check if we have updated emergency data from the edit page
//   const updatedEmergencyData = location?.state?.emergencyData || {}
//   const hasUpdatedEmergency = location?.state?.updatedEmergency || false

//   // Initialize basic data from props or from updated data
//   const [basicData, setBasicData] = useState({
//     legalFirstName: hasUpdatedBasic ? updatedBasicData.legalFirstName : (data.basics?.legalFirstName || ''),
//     legalLastName: hasUpdatedBasic ? updatedBasicData.legalLastName : (data.basics?.legalLastName || ''),
//     emailAddress: hasUpdatedBasic ? updatedBasicData.emailAddress : (data.basics?.emailAddress || ''),
//     mobilePhone: hasUpdatedBasic ? updatedBasicData.mobilePhone : (data.basics?.mobilePhone || ''),
//     addressLine1: hasUpdatedBasic ? updatedBasicData.addressLine1 : (data.basics?.addressLine1 || ''),
//     addressLine2: hasUpdatedBasic ? updatedBasicData.addressLine2 : (data.basics?.addressLine2 || ''),
//     city: hasUpdatedBasic ? updatedBasicData.city : (data.basics?.city || ''),
//     stateCode: hasUpdatedBasic ? updatedBasicData.stateCode : (data.basics?.stateCode || ''),
//     zip: hasUpdatedBasic ? updatedBasicData.zip : (data.basics?.zip || ''),
//     currentAddressLine1: hasUpdatedBasic ? updatedBasicData.currentAddressLine1 : (data.basics?.currentAddressLine1 || ''),
//     currentAddressLine2: hasUpdatedBasic ? updatedBasicData.currentAddressLine2 : (data.basics?.currentAddressLine2 || ''),
//     currentCity: hasUpdatedBasic ? updatedBasicData.currentCity : (data.basics?.currentCity || ''),
//     currentStateCode: hasUpdatedBasic ? updatedBasicData.currentStateCode : (data.basics?.currentStateCode || ''),
//     currentZip: hasUpdatedBasic ? updatedBasicData.currentZip : (data.basics?.currentZip || ''),
//     sameAsAddress: hasUpdatedBasic ? updatedBasicData.sameAsAddress : (data.basics?.sameAsAddress || false),
//     dob: hasUpdatedBasic ? updatedBasicData.dob : (data.basics?.dob || ''),
//     english: hasUpdatedBasic ? updatedBasicData.english : (data.basics?.english || false),
//     englishSpanish: hasUpdatedBasic ? updatedBasicData.englishSpanish : (data.basics?.englishSpanish || false),
//     spanish: hasUpdatedBasic ? updatedBasicData.spanish : (data.basics?.spanish || false),
//     profilePreview: hasUpdatedBasic ? updatedBasicData.profilePreview : (data.basics?.profilePreview || ''),
//     profileImage: hasUpdatedBasic ? updatedBasicData.profileImage : (data.basics?.profileImage || null),
//     acceptTerms: hasUpdatedBasic ? updatedBasicData.acceptTerms : (data.basics?.acceptTerms || false),
//     acceptPrivacy: hasUpdatedBasic ? updatedBasicData.acceptPrivacy : (data.basics?.acceptPrivacy || false),
//     consentElectronic: hasUpdatedBasic ? updatedBasicData.consentElectronic : (data.basics?.consentElectronic || false),
//     certifyAccurate: hasUpdatedBasic ? updatedBasicData.certifyAccurate : (data.basics?.certifyAccurate || false),
//   })

//   // Initialize medical data from props or from updated data
//   const [medicalData, setMedicalData] = useState({
//     bloodGroup: hasUpdatedMedical ? updatedMedicalData.bloodGroup : (data.medical?.bloodGroup || ''),
//     emergencyMedicalInfo: hasUpdatedMedical ? updatedMedicalData.emergencyMedicalInfo : (data.medical?.emergencyMedicalInfo || 'none'),
//     emergencyMedicalFlags: hasUpdatedMedical ? updatedMedicalData.emergencyMedicalFlags : (data.medical?.emergencyMedicalFlags || {}),
//     emergencyInstructions: hasUpdatedMedical ? updatedMedicalData.emergencyInstructions : (data.medical?.emergencyInstructions || ''),
//   })

//   // Initialize tax data from props or from updated data
//   const [taxData, setTaxData] = useState({
//     classificationPath: hasUpdatedTax ? updatedTaxData.classificationPath : (data.tax?.classificationPath || ''),
//     stateOfWork: hasUpdatedTax ? updatedTaxData.stateOfWork : (data.tax?.stateOfWork || ''),
//     employeeTaxName: hasUpdatedTax ? updatedTaxData.employeeTaxName : (data.tax?.employeeTaxName || ''),
//     employeeSsn: hasUpdatedTax ? updatedTaxData.employeeSsn : (data.tax?.employeeSsn || ''),
//     employeeStartDate: hasUpdatedTax ? updatedTaxData.employeeStartDate : (data.tax?.employeeStartDate || ''),
//     employeeFlags: hasUpdatedTax ? updatedTaxData.employeeFlags : (data.tax?.employeeFlags || {}),
//     reviewerName: hasUpdatedTax ? updatedTaxData.reviewerName : (data.tax?.reviewerName || ''),
//     complianceNotes: hasUpdatedTax ? updatedTaxData.complianceNotes : (data.tax?.complianceNotes || ''),
//     entityLegalName: hasUpdatedTax ? updatedTaxData.entityLegalName : (data.tax?.entityLegalName || ''),
//     entityEin: hasUpdatedTax ? updatedTaxData.entityEin : (data.tax?.entityEin || ''),
//     entityType: hasUpdatedTax ? updatedTaxData.entityType : (data.tax?.entityType || ''),
//     entityStateRegistration: hasUpdatedTax ? updatedTaxData.entityStateRegistration : (data.tax?.entityStateRegistration || ''),
//     entityDbaName: hasUpdatedTax ? updatedTaxData.entityDbaName : (data.tax?.entityDbaName || ''),
//     entityAuthorizedSigner: hasUpdatedTax ? updatedTaxData.entityAuthorizedSigner : (data.tax?.entityAuthorizedSigner || ''),
//     entityFlags: hasUpdatedTax ? updatedTaxData.entityFlags : (data.tax?.entityFlags || {}),
//     stateSpecificFlags: hasUpdatedTax ? updatedTaxData.stateSpecificFlags : (data.tax?.stateSpecificFlags || {}),
//   })

//   // Initialize certification data from props or from updated data
//   const [certData, setCertData] = useState({
//     certChecklist: hasUpdatedCert ? updatedCertData.certChecklist : (data.certifications?.certChecklist || {}),
//     certRows: hasUpdatedCert ? updatedCertData.certRows : (data.certifications?.certRows || [
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//     ]),
//     safetyFlags: hasUpdatedCert ? updatedCertData.safetyFlags : (data.certifications?.safetyFlags || {}),
//   })

//   // Initialize payment data from props or from updated data
//   const [paymentData, setPaymentData] = useState({
//     fullName: hasUpdatedPayment ? updatedPaymentData.fullName : '',
//     bankAccountNumber: hasUpdatedPayment ? updatedPaymentData.bankAccountNumber : '',
//     routingNumber: hasUpdatedPayment ? updatedPaymentData.routingNumber : '',
//     accountType: hasUpdatedPayment ? updatedPaymentData.accountType : '',
//     bankName: hasUpdatedPayment ? updatedPaymentData.bankName : 'Chase Bank',
//     emailId: hasUpdatedPayment ? updatedPaymentData.emailId : '',
//     mobileNumber: hasUpdatedPayment ? updatedPaymentData.mobileNumber : '',
//   })

//   // Initialize availability data from props or from updated data
//   const [availabilityData, setAvailabilityData] = useState({
//     hourlyRate: hasUpdatedAvailability ? updatedAvailabilityData.hourlyRate : (data.availability?.hourlyRate || ''),
//     payPrefs: hasUpdatedAvailability ? updatedAvailabilityData.payPrefs : (data.availability?.payPrefs || {}),
//     travelRadius: hasUpdatedAvailability ? updatedAvailabilityData.travelRadius : (data.availability?.travelRadius || 50),
//     willingToTravel: hasUpdatedAvailability ? updatedAvailabilityData.willingToTravel : (data.availability?.willingToTravel || ''),
//     travelPrefs: hasUpdatedAvailability ? updatedAvailabilityData.travelPrefs : (data.availability?.travelPrefs || {}),
//     availability: hasUpdatedAvailability ? updatedAvailabilityData.availability : (data.availability?.availability || {}),
//   })

//   // Initialize work history data from props or from updated data
//   const [workHistoryData, setWorkHistoryData] = useState({
//     projects: hasUpdatedWorkHistory ? updatedWorkHistoryData.projects : (data.workHistory?.projects || [
//       { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//     ]),
//     projectConditions: hasUpdatedWorkHistory ? updatedWorkHistoryData.projectConditions : (data.workHistory?.projectConditions || {}),
//     referenceName: hasUpdatedWorkHistory ? updatedWorkHistoryData.referenceName : (data.workHistory?.referenceName || ''),
//     referenceTitle: hasUpdatedWorkHistory ? updatedWorkHistoryData.referenceTitle : (data.workHistory?.referenceTitle || ''),
//     referencePhone: hasUpdatedWorkHistory ? updatedWorkHistoryData.referencePhone : (data.workHistory?.referencePhone || ''),
//     reviewerNotes: hasUpdatedWorkHistory ? updatedWorkHistoryData.reviewerNotes : (data.workHistory?.reviewerNotes || ''),
//   })

//   // Initialize trade data from props or from updated data
//   const [tradeData, setTradeData] = useState({
//     primaryTrade: hasUpdatedTrade ? updatedTradeData.primaryTrade : (data.trade?.primaryTrade || ''),
//     primaryOtherTrade: hasUpdatedTrade ? updatedTradeData.primaryOtherTrade : (data.trade?.primaryOtherTrade || ''),
//     workerLevel: hasUpdatedTrade ? updatedTradeData.workerLevel : (data.trade?.workerLevel || ''),
//     yearOfExperience: hasUpdatedTrade ? updatedTradeData.yearOfExperience : (data.trade?.yearOfExperience || ''),
//     secondaryTrade: hasUpdatedTrade ? updatedTradeData.secondaryTrade : (data.trade?.secondaryTrade || ''),
//     secondaryOtherTrade: hasUpdatedTrade ? updatedTradeData.secondaryOtherTrade : (data.trade?.secondaryOtherTrade || ''),
//     secondaryWorkerLevel: hasUpdatedTrade ? updatedTradeData.secondaryWorkerLevel : (data.trade?.secondaryWorkerLevel || ''),
//     secondaryYearOfExperience: hasUpdatedTrade ? updatedTradeData.secondaryYearOfExperience : (data.trade?.secondaryYearOfExperience || ''),
//     leadForemanResponsibilities: hasUpdatedTrade ? updatedTradeData.leadForemanResponsibilities : (data.trade?.leadForemanResponsibilities || {}),
//     metalFramingSkills: hasUpdatedTrade ? updatedTradeData.metalFramingSkills : (data.trade?.metalFramingSkills || {}),
//     drywallHangingSkills: hasUpdatedTrade ? updatedTradeData.drywallHangingSkills : (data.trade?.drywallHangingSkills || {}),
//     tapingFinishingSkills: hasUpdatedTrade ? updatedTradeData.tapingFinishingSkills : (data.trade?.tapingFinishingSkills || {}),
//     acousticalCeilingsSkills: hasUpdatedTrade ? updatedTradeData.acousticalCeilingsSkills : (data.trade?.acousticalCeilingsSkills || {}),
//     interiorCarpentrySkills: hasUpdatedTrade ? updatedTradeData.interiorCarpentrySkills : (data.trade?.interiorCarpentrySkills || {}),
//     helpersLabourersSkills: hasUpdatedTrade ? updatedTradeData.helpersLabourersSkills : (data.trade?.helpersLabourersSkills || {}),
//     insulationSkills: hasUpdatedTrade ? updatedTradeData.insulationSkills : (data.trade?.insulationSkills || {}),
//     demolitionSkills: hasUpdatedTrade ? updatedTradeData.demolitionSkills : (data.trade?.demolitionSkills || {}),
//     secondaryLeadForemanResponsibilities: hasUpdatedTrade ? updatedTradeData.secondaryLeadForemanResponsibilities : (data.trade?.secondaryLeadForemanResponsibilities || {}),
//     secondaryMetalFramingSkills: hasUpdatedTrade ? updatedTradeData.secondaryMetalFramingSkills : (data.trade?.secondaryMetalFramingSkills || {}),
//     secondaryDrywallHangingSkills: hasUpdatedTrade ? updatedTradeData.secondaryDrywallHangingSkills : (data.trade?.secondaryDrywallHangingSkills || {}),
//     secondaryTapingFinishingSkills: hasUpdatedTrade ? updatedTradeData.secondaryTapingFinishingSkills : (data.trade?.secondaryTapingFinishingSkills || {}),
//     secondaryAcousticalCeilingsSkills: hasUpdatedTrade ? updatedTradeData.secondaryAcousticalCeilingsSkills : (data.trade?.secondaryAcousticalCeilingsSkills || {}),
//     secondaryInteriorCarpentrySkills: hasUpdatedTrade ? updatedTradeData.secondaryInteriorCarpentrySkills : (data.trade?.secondaryInteriorCarpentrySkills || {}),
//     secondaryHelpersLabourersSkills: hasUpdatedTrade ? updatedTradeData.secondaryHelpersLabourersSkills : (data.trade?.secondaryHelpersLabourersSkills || {}),
//     secondaryInsulationSkills: hasUpdatedTrade ? updatedTradeData.secondaryInsulationSkills : (data.trade?.secondaryInsulationSkills || {}),
//     secondaryDemolitionSkills: hasUpdatedTrade ? updatedTradeData.secondaryDemolitionSkills : (data.trade?.secondaryDemolitionSkills || {}),
//     additionalSkillsTools: hasUpdatedTrade ? updatedTradeData.additionalSkillsTools : (data.trade?.additionalSkillsTools || ''),
//   })

//   // Initialize emergency data from props or from updated data
//   const [emergencyData, setEmergencyData] = useState({
//     emergencyContactName: hasUpdatedEmergency ? updatedEmergencyData.emergencyContactName : (data.acknowledgments?.emergencyContactName || ''),
//     emergencyContactRelationship: hasUpdatedEmergency ? updatedEmergencyData.emergencyContactRelationship : (data.acknowledgments?.emergencyContactRelationship || ''),
//     emergencyContactPhone: hasUpdatedEmergency ? updatedEmergencyData.emergencyContactPhone : (data.acknowledgments?.emergencyContactPhone || ''),
//   })

//   const basics = data.basics ?? {}
//   const trade = data.trade ?? {}
//   const workHistory = data.workHistory ?? {}
//   const projects = workHistory.projects ?? []
//   const certifications = data.certifications ?? {}
//   const tax = data.tax ?? {}
//   const availability = data.availability ?? {}
//   const medical = data.medical ?? {}
//   const acknowledgments = data.acknowledgments ?? {}

//   const displayValue = (value, fallback) => {
//     if (value === 0) return 0
//     if (value === false) return false
//     if (value === null || value === undefined) return fallback || '—'
//     if (typeof value === 'string' && value.trim() === '') return fallback || '—'
//     return value
//   }

//   // Get allergies display text
//   const getAllergiesText = () => {
//     const flags = medicalData.emergencyMedicalFlags || medical.emergencyMedicalFlags || {}
//     const allergies = Object.keys(flags).filter(key => flags[key])
//     if (allergies.length > 0) {
//       return allergies.join(', ')
//     }
//     return 'No allergies reported'
//   }

//   // Get tax classification display text
//   const getTaxClassificationText = () => {
//     const path = taxData.classificationPath || tax.classificationPath || ''
//     if (path === 'employee') return 'W2 Employee'
//     if (path === 'subcontractor') return '1099 Contractor'
//     return '—'
//   }

//   // Get certifications display text
//   const getCertificationsText = () => {
//     const checklist = certData.certChecklist || certifications.certChecklist || {}
//     const certs = Object.keys(checklist).filter(key => checklist[key])
//     if (certs.length > 0) {
//       return certs.join(', ')
//     }
//     return 'No certifications'
//   }

//   // Get availability display text
//   const getAvailabilityText = () => {
//     const avail = availabilityData.availability || availability.availability || {}
//     const days = Object.keys(avail).filter(key => avail[key])
//     if (days.length > 0) {
//       return days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(', ')
//     }
//     return 'Not specified'
//   }

//   const fallbackProjects = [
//     {
//       name: 'ABC construct',
//       client: 'XYZ Inc',
//       role: 'Helper',
//       trade: 'Drywall',
//     },
//     {
//       name: 'DMC construct',
//       client: 'DMX Inc',
//       role: 'Helper',
//       trade: 'Drywall',
//     },
//   ]

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
//                 <span className="sideText">Overview</span>
//               </span>
//               {/* Projects - Disabled */}
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge" aria-label="12 projects">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconChart /></span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon" aria-hidden="true"><IconUser /></span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div className="wizardSummaryPage" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            
//             {/* Row 1: Basic Information, Trade Profile, Subscription & Rewards */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Basic Information Card - Updated with navigation */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Basic Information</span>
//                   <button 
//                     type="button" 
//                     onClick={() => {
//                       navigate('/basic-info/edit', { 
//                         state: { 
//                           basicData: {
//                             legalFirstName: basicData.legalFirstName || basics.legalFirstName || '',
//                             legalLastName: basicData.legalLastName || basics.legalLastName || '',
//                             emailAddress: basicData.emailAddress || basics.emailAddress || '',
//                             mobilePhone: basicData.mobilePhone || basics.mobilePhone || '',
//                             addressLine1: basicData.addressLine1 || basics.addressLine1 || '',
//                             addressLine2: basicData.addressLine2 || basics.addressLine2 || '',
//                             city: basicData.city || basics.city || '',
//                             stateCode: basicData.stateCode || basics.stateCode || '',
//                             zip: basicData.zip || basics.zip || '',
//                             currentAddressLine1: basicData.currentAddressLine1 || basics.currentAddressLine1 || '',
//                             currentAddressLine2: basicData.currentAddressLine2 || basics.currentAddressLine2 || '',
//                             currentCity: basicData.currentCity || basics.currentCity || '',
//                             currentStateCode: basicData.currentStateCode || basics.currentStateCode || '',
//                             currentZip: basicData.currentZip || basics.currentZip || '',
//                             sameAsAddress: basicData.sameAsAddress || basics.sameAsAddress || false,
//                             dob: basicData.dob || basics.dob || '',
//                             english: basicData.english || basics.english || false,
//                             englishSpanish: basicData.englishSpanish || basics.englishSpanish || false,
//                             spanish: basicData.spanish || basics.spanish || false,
//                             profilePreview: basicData.profilePreview || basics.profilePreview || '',
//                             profileImage: basicData.profileImage || basics.profileImage || null,
//                             acceptTerms: basicData.acceptTerms || basics.acceptTerms || false,
//                             acceptPrivacy: basicData.acceptPrivacy || basics.acceptPrivacy || false,
//                             consentElectronic: basicData.consentElectronic || basics.consentElectronic || false,
//                             certifyAccurate: basicData.certifyAccurate || basics.certifyAccurate || false,
//                           },
//                           parentData: data
//                         } 
//                       })
//                     }}
//                     style={{ 
//                       background: 'none', 
//                       border: 'none', 
//                       color: '#0f4ea9', 
//                       cursor: 'pointer',
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//                     onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
//                     <img src="/assets/worker.avif" alt="Worker" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
//                     <div>
//                       <div style={{ fontWeight: 600, fontSize: '16px', color: '#17263a' }}>
//                         {displayValue(`${(basicData.legalFirstName || basics.legalFirstName) ?? ''} ${(basicData.legalLastName || basics.legalLastName) ?? ''}`.trim(), 'Marcus Webb')}
//                       </div>
//                       <span style={{ fontSize: '12px', color: '#2fb463', fontWeight: 500 }}>Active</span>
//                     </div>
//                   </div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Date of Birth</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basicData.dob || basics.dob)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Language</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {basicData.english ? 'English' : ''}
//                         {basicData.english && basicData.spanish ? ' / ' : ''}
//                         {basicData.spanish ? 'Spanish' : ''}
//                         {!basicData.english && !basicData.spanish ? '—' : ''}
//                       </div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Email</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basicData.emailAddress || basics.emailAddress)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Phone No.</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basicData.mobilePhone || basics.mobilePhone)}</div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Address</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {displayValue([basicData.addressLine1 || basics.addressLine1, basicData.city || basics.city, basicData.stateCode || basics.stateCode, basicData.zip || basics.zip].filter(Boolean).join(', '))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Trade Profile Card - Updated with navigation */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Trade Profile</span>
//                   <button 
//                     type="button" 
//                     onClick={() => {
//                       navigate('/trade-profile/edit', { 
//                         state: { 
//                           tradeData: {
//                             primaryTrade: tradeData.primaryTrade || trade.primaryTrade || '',
//                             primaryOtherTrade: tradeData.primaryOtherTrade || trade.primaryOtherTrade || '',
//                             workerLevel: tradeData.workerLevel || trade.workerLevel || '',
//                             yearOfExperience: tradeData.yearOfExperience || trade.yearOfExperience || '',
//                             secondaryTrade: tradeData.secondaryTrade || trade.secondaryTrade || '',
//                             secondaryOtherTrade: tradeData.secondaryOtherTrade || trade.secondaryOtherTrade || '',
//                             secondaryWorkerLevel: tradeData.secondaryWorkerLevel || trade.secondaryWorkerLevel || '',
//                             secondaryYearOfExperience: tradeData.secondaryYearOfExperience || trade.secondaryYearOfExperience || '',
//                             leadForemanResponsibilities: tradeData.leadForemanResponsibilities || trade.leadForemanResponsibilities || {},
//                             metalFramingSkills: tradeData.metalFramingSkills || trade.metalFramingSkills || {},
//                             drywallHangingSkills: tradeData.drywallHangingSkills || trade.drywallHangingSkills || {},
//                             tapingFinishingSkills: tradeData.tapingFinishingSkills || trade.tapingFinishingSkills || {},
//                             acousticalCeilingsSkills: tradeData.acousticalCeilingsSkills || trade.acousticalCeilingsSkills || {},
//                             interiorCarpentrySkills: tradeData.interiorCarpentrySkills || trade.interiorCarpentrySkills || {},
//                             helpersLabourersSkills: tradeData.helpersLabourersSkills || trade.helpersLabourersSkills || {},
//                             insulationSkills: tradeData.insulationSkills || trade.insulationSkills || {},
//                             demolitionSkills: tradeData.demolitionSkills || trade.demolitionSkills || {},
//                             secondaryLeadForemanResponsibilities: tradeData.secondaryLeadForemanResponsibilities || trade.secondaryLeadForemanResponsibilities || {},
//                             secondaryMetalFramingSkills: tradeData.secondaryMetalFramingSkills || trade.secondaryMetalFramingSkills || {},
//                             secondaryDrywallHangingSkills: tradeData.secondaryDrywallHangingSkills || trade.secondaryDrywallHangingSkills || {},
//                             secondaryTapingFinishingSkills: tradeData.secondaryTapingFinishingSkills || trade.secondaryTapingFinishingSkills || {},
//                             secondaryAcousticalCeilingsSkills: tradeData.secondaryAcousticalCeilingsSkills || trade.secondaryAcousticalCeilingsSkills || {},
//                             secondaryInteriorCarpentrySkills: tradeData.secondaryInteriorCarpentrySkills || trade.secondaryInteriorCarpentrySkills || {},
//                             secondaryHelpersLabourersSkills: tradeData.secondaryHelpersLabourersSkills || trade.secondaryHelpersLabourersSkills || {},
//                             secondaryInsulationSkills: tradeData.secondaryInsulationSkills || trade.secondaryInsulationSkills || {},
//                             secondaryDemolitionSkills: tradeData.secondaryDemolitionSkills || trade.secondaryDemolitionSkills || {},
//                             additionalSkillsTools: tradeData.additionalSkillsTools || trade.additionalSkillsTools || '',
//                           },
//                           parentData: data
//                         } 
//                       })
//                     }}
//                     style={{ 
//                       background: 'none', 
//                       border: 'none', 
//                       color: '#0f4ea9', 
//                       cursor: 'pointer',
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//                     onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Primary Trade</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {displayValue(tradeData.primaryTrade || trade.primaryTrade)}
//                       </div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Secondary Trade</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {displayValue(tradeData.secondaryTrade || trade.secondaryTrade || '—')}
//                       </div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Experience</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {displayValue(tradeData.yearOfExperience || trade.yearOfExperience || trade.yearsExperience)} years
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Subscription & Rewards Card - Updated: removed pencil, Pro Field, and Skill-verified */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Subscription & Rewards</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Active Plan</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Pro</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Plan tier</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Professional</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Renews</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Dec 31, 2026</span>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(15,78,169,0.06)', borderRadius: '8px', textAlign: 'center' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
//                       <IconTrophy style={{ color: '#f59e0b' }} />
//                       <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f4ea9' }}>12</span>
//                       <span style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>Trade Points</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Row 2: Work History - Updated with navigation */}
//             <div className="wizardSummaryWideCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', marginBottom: '20px' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                 <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Work History</span>
//                 <button 
//                   type="button" 
//                   onClick={() => {
//                     navigate('/work-history/edit', { 
//                       state: { 
//                         workHistoryData: {
//                           projects: workHistoryData.projects || workHistory.projects || [
//                             { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//                             { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//                             { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//                           ],
//                           projectConditions: workHistoryData.projectConditions || workHistory.projectConditions || {},
//                           referenceName: workHistoryData.referenceName || workHistory.referenceName || '',
//                           referenceTitle: workHistoryData.referenceTitle || workHistory.referenceTitle || '',
//                           referencePhone: workHistoryData.referencePhone || workHistory.referencePhone || '',
//                           reviewerNotes: workHistoryData.reviewerNotes || workHistory.reviewerNotes || '',
//                         },
//                         parentData: data
//                       } 
//                     })
//                   }}
//                   style={{ 
//                     background: 'none', 
//                     border: 'none', 
//                     color: '#0f4ea9', 
//                     cursor: 'pointer',
//                     padding: '4px 8px',
//                     borderRadius: '6px',
//                     transition: 'background 0.2s',
//                   }}
//                   onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//                   onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                 >
//                   <IconPencil />
//                 </button>
//               </div>
//               <div>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', padding: '8px 12px', borderBottom: '2px solid rgba(18,38,63,0.08)', fontWeight: 600, fontSize: '12px', color: 'rgba(23,38,58,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//                   <div>PROJECT</div>
//                   <div>COMPANY</div>
//                   <div>TRADE</div>
//                   <div>ROLE</div>
//                 </div>
//                 {(projects.length ? projects : fallbackProjects).map((p, idx) => (
//                   <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', padding: '10px 12px', borderBottom: idx < (projects.length ? projects.length - 1 : fallbackProjects.length - 1) ? '1px solid rgba(18,38,63,0.06)' : 'none', fontSize: '14px', color: '#17263a' }}>
//                     <div>{displayValue(p.name, 'ABC construct')}</div>
//                     <div>{displayValue(p.client, 'XYZ Inc')}</div>
//                     <div>{displayValue(p.trade, 'Drywall')}</div>
//                     <div>{displayValue(p.role, 'Helper')}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Row 3: Availability & Rate, Certifications & Safety, Tax Profile, Payment/Bank Details */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Availability & Rate Card - Updated with navigation */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Availability & Rate</span>
//                   <button 
//                     type="button" 
//                     onClick={() => {
//                       navigate('/availability/edit', { 
//                         state: { 
//                           availabilityData: {
//                             hourlyRate: availabilityData.hourlyRate || availability.hourlyRate || '',
//                             payPrefs: availabilityData.payPrefs || availability.payPrefs || {},
//                             travelRadius: availabilityData.travelRadius || availability.travelRadius || 50,
//                             willingToTravel: availabilityData.willingToTravel || availability.willingToTravel || '',
//                             travelPrefs: availabilityData.travelPrefs || availability.travelPrefs || {},
//                             availability: availabilityData.availability || availability.availability || {},
//                           },
//                           parentData: data
//                         } 
//                       })
//                     }}
//                     style={{ 
//                       background: 'none', 
//                       border: 'none', 
//                       color: '#0f4ea9', 
//                       cursor: 'pointer',
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//                     onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Hourly Rate</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>
//                         {displayValue(availabilityData.hourlyRate || availability.hourlyRate || availability.hourlyRateRequested ? `$${availabilityData.hourlyRate || availability.hourlyRate || availability.hourlyRateRequested}` : '—')}
//                       </span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Travel</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>
//                         {availabilityData.willingToTravel === 'yes' || availability.willingToTravel === 'yes' || trade.travelRadiusMiles ? 'Yes' : 'No'}
//                       </span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Available</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>
//                         {getAvailabilityText() !== 'Not specified' ? getAvailabilityText() : 'Immediate'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Certifications & Safety Card - Updated with navigation */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Certifications & Safety</span>
//                   <button 
//                     type="button" 
//                     onClick={() => {
//                       navigate('/certification/edit', { 
//                         state: { 
//                           certData: {
//                             certChecklist: certData.certChecklist || certifications.certChecklist || {},
//                             certRows: certData.certRows || certifications.certRows || [
//                               { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//                               { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//                               { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//                             ],
//                             safetyFlags: certData.safetyFlags || certifications.safetyFlags || {},
//                           },
//                           parentData: data
//                         } 
//                       })
//                     }}
//                     style={{ 
//                       background: 'none', 
//                       border: 'none', 
//                       color: '#0f4ea9', 
//                       cursor: 'pointer',
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//                     onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Certifications</span>
//                       <span style={{ color: '#17263a', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>
//                         {getCertificationsText() !== 'No certifications' ? (
//                           <span style={{ fontSize: '12px' }}>{getCertificationsText()}</span>
//                         ) : (
//                           'No certifications'
//                         )}
//                       </span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Safety</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Tax Profile Card - Updated with navigation */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Tax Profile</span>
//                   <button 
//                     type="button" 
//                     onClick={() => {
//                       navigate('/tax/edit', { 
//                         state: { 
//                           taxData: {
//                             classificationPath: taxData.classificationPath || tax.classificationPath || '',
//                             stateOfWork: taxData.stateOfWork || tax.stateOfWork || '',
//                             employeeTaxName: taxData.employeeTaxName || tax.employeeTaxName || '',
//                             employeeSsn: taxData.employeeSsn || tax.employeeSsn || '',
//                             employeeStartDate: taxData.employeeStartDate || tax.employeeStartDate || '',
//                             employeeFlags: taxData.employeeFlags || tax.employeeFlags || {},
//                             reviewerName: taxData.reviewerName || tax.reviewerName || '',
//                             complianceNotes: taxData.complianceNotes || tax.complianceNotes || '',
//                             entityLegalName: taxData.entityLegalName || tax.entityLegalName || '',
//                             entityEin: taxData.entityEin || tax.entityEin || '',
//                             entityType: taxData.entityType || tax.entityType || '',
//                             entityStateRegistration: taxData.entityStateRegistration || tax.entityStateRegistration || '',
//                             entityDbaName: taxData.entityDbaName || tax.entityDbaName || '',
//                             entityAuthorizedSigner: taxData.entityAuthorizedSigner || tax.entityAuthorizedSigner || '',
//                             entityFlags: taxData.entityFlags || tax.entityFlags || {},
//                             stateSpecificFlags: taxData.stateSpecificFlags || tax.stateSpecificFlags || {},
//                           },
//                           parentData: data
//                         } 
//                       })
//                     }}
//                     style={{ 
//                       background: 'none', 
//                       border: 'none', 
//                       color: '#0f4ea9', 
//                       cursor: 'pointer',
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//                     onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Classification</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>
//                         {getTaxClassificationText()}
//                       </span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Tax Verified</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment/Bank Details Card - Updated with navigation */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Payment / Bank Details</span>
//                   <button 
//                     type="button" 
//                     onClick={() => {
//                       navigate('/payment/edit', { 
//                         state: { 
//                           paymentData: {
//                             fullName: paymentData.fullName || '',
//                             bankAccountNumber: paymentData.bankAccountNumber || '',
//                             routingNumber: paymentData.routingNumber || '',
//                             accountType: paymentData.accountType || '',
//                             bankName: paymentData.bankName || 'Chase Bank',
//                             emailId: paymentData.emailId || '',
//                             mobileNumber: paymentData.mobileNumber || '',
//                           },
//                           parentData: data
//                         } 
//                       })
//                     }}
//                     style={{ 
//                       background: 'none', 
//                       border: 'none', 
//                       color: '#0f4ea9', 
//                       cursor: 'pointer',
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//                     onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Bank</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>
//                         {displayValue(paymentData.bankName || 'Chase Bank')}
//                       </span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>ACH</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Enabled
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Row 4: Medical Details & Emergency Contact */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Medical Details Card - Navigates to medical edit page */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Medical Details</span>
//                   <button 
//                     type="button" 
//                     onClick={() => {
//                       navigate('/medical/edit', { 
//                         state: { 
//                           medicalData: {
//                             bloodGroup: medicalData.bloodGroup || medical.bloodGroup || '',
//                             emergencyMedicalInfo: medicalData.emergencyMedicalInfo || medical.emergencyMedicalInfo || 'none',
//                             emergencyMedicalFlags: medicalData.emergencyMedicalFlags || medical.emergencyMedicalFlags || {},
//                             emergencyInstructions: medicalData.emergencyInstructions || medical.emergencyInstructions || '',
//                           },
//                           parentData: data
//                         } 
//                       })
//                     }}
//                     style={{ 
//                       background: 'none', 
//                       border: 'none', 
//                       color: '#0f4ea9', 
//                       cursor: 'pointer',
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//                     onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Blood Group</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {displayValue(medicalData.bloodGroup || medical.bloodGroup)}
//                       </div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Allergies</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {getAllergiesText()}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Contact Card - Updated with navigation */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Emergency Contact</span>
//                   <button 
//                     type="button" 
//                     onClick={() => {
//                       navigate('/emergency-contact/edit', { 
//                         state: { 
//                           emergencyData: {
//                             emergencyContactName: emergencyData.emergencyContactName || acknowledgments.emergencyContactName || '',
//                             emergencyContactRelationship: emergencyData.emergencyContactRelationship || acknowledgments.emergencyContactRelationship || '',
//                             emergencyContactPhone: emergencyData.emergencyContactPhone || acknowledgments.emergencyContactPhone || '',
//                           },
//                           parentData: data
//                         } 
//                       })
//                     }}
//                     style={{ 
//                       background: 'none', 
//                       border: 'none', 
//                       color: '#0f4ea9', 
//                       cursor: 'pointer',
//                       padding: '4px 8px',
//                       borderRadius: '6px',
//                       transition: 'background 0.2s',
//                     }}
//                     onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//                     onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//                   >
//                     <IconPencil />
//                   </button>
//                 </div>
//                 <div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Name</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {displayValue(emergencyData.emergencyContactName || acknowledgments.emergencyContactName)}
//                       </div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Relationship</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {displayValue(emergencyData.emergencyContactRelationship || acknowledgments.emergencyContactRelationship)}
//                       </div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Phone</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>
//                         {displayValue(emergencyData.emergencyContactPhone || acknowledgments.emergencyContactPhone)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Footer Buttons */}
//             <div className="wizardSummaryFooter" style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(18,38,58,0.08)' }}>
//               <button type="button" className="btn btnPrimary" onClick={() => navigate('/wizard')} style={{ padding: '10px 24px', borderRadius: '8px', background: '#0f4ea9', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Back to wizard
//               </button>
//               <button type="button" className="btn btnSuccess" onClick={() => navigate('/')} style={{ padding: '10px 24px', borderRadius: '8px', background: '#2fb463', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Go to Home
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }



// import { useState } from 'react'
// import { useNavigate, useLocation, NavLink } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'

// // Icons
// function IconGrid(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconFolder(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconChart(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconSupport(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconPencil(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25ZM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconCheckCircle(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconTrophy(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="currentColor" />
//     </svg>
//   )
// }

// export function WorkerSummaryPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const data = location?.state ?? {}

//   // ✅ FIX: Get data from the correct location
//   const basics = data.basics || {}
//   const trade = data.trade || {}
//   const workHistory = data.workHistory || {}
//   const projects = workHistory.projects || []
//   const availability = data.availability || {}
//   const medical = data.medical || {}
//   const certifications = data.certifications || {}
//   const tax = data.tax || {}
//   const acknowledgments = data.acknowledgments || {}

//   // ✅ FIX: Display function that shows actual data or placeholder
//   const displayValue = (value, placeholder = '—') => {
//     if (value === null || value === undefined || value === '') {
//       return placeholder
//     }
//     if (typeof value === 'string' && value.trim() === '') {
//       return placeholder
//     }
//     return value
//   }

//   // Get full name
//   const fullName = [basics.legalFirstName, basics.legalLastName].filter(Boolean).join(' ') || '—'

//   // Get address
//   const address = [basics.addressLine1, basics.city, basics.stateCode, basics.zip].filter(Boolean).join(', ')

//   // Get language
//   const language = basics.english ? (basics.spanish ? 'English / Spanish' : 'English') : (basics.spanish ? 'Spanish' : '—')

//   // Get certifications
//   const certChecklist = certifications.certChecklist || {}
//   const certNames = Object.keys(certChecklist).filter(key => certChecklist[key])
//   const certText = certNames.length > 0 ? certNames.join(', ') : 'No certifications'

//   // Get availability days
//   const avail = availability.availability || {}
//   const availableDays = Object.keys(avail).filter(key => avail[key])
//   const availabilityText = availableDays.length > 0 ? availableDays.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ') : 'Not specified'

//   // Get tax classification
//   const taxPath = tax.classificationPath || ''
//   const taxText = taxPath === 'employee' ? 'W2 Employee' : taxPath === 'subcontractor' ? '1099 Contractor' : '—'

//   // Get allergies
//   const medicalFlags = medical.emergencyMedicalFlags || {}
//   const allergies = Object.keys(medicalFlags).filter(key => medicalFlags[key])
//   const allergiesText = allergies.length > 0 ? allergies.join(', ') : 'No allergies reported'

//   // Fallback projects (only if no real projects)
//   const fallbackProjects = [
//     { name: 'ABC construct', client: 'XYZ Inc', role: 'Helper', trade: 'Drywall' },
//     { name: 'DMC construct', client: 'DMX Inc', role: 'Helper', trade: 'Drywall' },
//   ]

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge" aria-label="12 projects">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconChart /></span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon" aria-hidden="true"><IconUser /></span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div className="wizardSummaryPage" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            
//             {/* Row 1: Basic Information, Trade Profile, Subscription & Rewards */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Basic Information Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Basic Information</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
//                     <img src="/assets/worker.avif" alt="Worker" style={{ width: '48px', height: '48px', borderRadius: '50%' }} />
//                     <div>
//                       <div style={{ fontWeight: 600, fontSize: '16px', color: '#17263a' }}>{fullName}</div>
//                       <span style={{ fontSize: '12px', color: '#2fb463', fontWeight: 500 }}>Active</span>
//                     </div>
//                   </div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Date of Birth</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basics.dob)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Language</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{language}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Email</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basics.emailAddress)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Phone No.</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basics.mobilePhone)}</div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Address</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(address)}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Trade Profile Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Trade Profile</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Primary Trade</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(trade.primaryTrade)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Secondary Trade</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(trade.secondaryTrade, '—')}</div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Experience</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(trade.yearOfExperience)} years</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Subscription & Rewards Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Subscription & Rewards</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Active Plan</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Pro</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Plan tier</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Professional</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Renews</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Dec 31, 2026</span>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(15,78,169,0.06)', borderRadius: '8px', textAlign: 'center' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
//                       <IconTrophy style={{ color: '#f59e0b' }} />
//                       <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f4ea9' }}>12</span>
//                       <span style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>Trade Points</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Row 2: Work History */}
//             <div className="wizardSummaryWideCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', marginBottom: '20px' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                 <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Work History</span>
//               </div>
//               <div>
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', padding: '8px 12px', borderBottom: '2px solid rgba(18,38,63,0.08)', fontWeight: 600, fontSize: '12px', color: 'rgba(23,38,58,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
//                   <div>PROJECT</div>
//                   <div>COMPANY</div>
//                   <div>TRADE</div>
//                   <div>ROLE</div>
//                 </div>
//                 {(projects.length ? projects : fallbackProjects).map((p, idx) => (
//                   <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', padding: '10px 12px', borderBottom: idx < (projects.length ? projects.length - 1 : fallbackProjects.length - 1) ? '1px solid rgba(18,38,63,0.06)' : 'none', fontSize: '14px', color: '#17263a' }}>
//                     <div>{displayValue(p.name, 'ABC construct')}</div>
//                     <div>{displayValue(p.client, 'XYZ Inc')}</div>
//                     <div>{displayValue(p.trade, 'Drywall')}</div>
//                     <div>{displayValue(p.role, 'Helper')}</div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Row 3: Availability & Rate, Certifications & Safety, Tax Profile, Payment/Bank Details */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Availability & Rate Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Availability & Rate</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Hourly Rate</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(availability.hourlyRate ? `$${availability.hourlyRate}` : '—')}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Travel</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{availability.willingToTravel === 'yes' ? 'Yes' : 'No'}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Available</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{availabilityText}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Certifications & Safety Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Certifications & Safety</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Certifications</span>
//                       <span style={{ color: '#17263a', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{certText}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Safety</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Tax Profile Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Tax Profile</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Classification</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{taxText}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Tax Verified</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Verified
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment/Bank Details Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Payment / Bank Details</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>Bank</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Chase Bank</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>ACH</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Enabled
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Row 4: Medical Details & Emergency Contact */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Medical Details Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Medical Details</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Blood Group</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(medical.bloodGroup)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Allergies</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{allergiesText}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Contact Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Emergency Contact</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px' }}>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Name</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(acknowledgments.emergencyContactName)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Relationship</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(acknowledgments.emergencyContactRelationship)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Phone</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(acknowledgments.emergencyContactPhone)}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Footer Buttons */}
//             <div className="wizardSummaryFooter" style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(18,38,58,0.08)' }}>
//               <button type="button" className="btn btnPrimary" onClick={() => navigate('/wizard')} style={{ padding: '10px 24px', borderRadius: '8px', background: '#0f4ea9', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Back to wizard
//               </button>
//               <button type="button" className="btn btnSuccess" onClick={() => navigate('/')} style={{ padding: '10px 24px', borderRadius: '8px', background: '#2fb463', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
//                 Go to Home
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }


// src/worker/pages/WorkerSummaryPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation, NavLink } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import workerService from '../services/workerService'

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

function IconCheckCircle(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor" />
    </svg>
  )
}

function IconTrophy(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z" fill="currentColor" />
    </svg>
  )
}

export function WorkerSummaryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [isFromWizard, setIsFromWizard] = useState(false)

  // ============================================================
  // LOAD DATA FROM DYNAMODB
  // ============================================================
  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        // ✅ Check if data is coming from wizard completion
        if (location?.state && Object.keys(location.state).length > 0) {
          console.log('📋 Loading summary from location.state (wizard completion)')
          setProfile(location.state)
          setIsFromWizard(true)
          setLoading(false)
          return
        }

        // ✅ Otherwise fetch from DynamoDB
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setError('User not logged in')
          setLoading(false)
          return
        }

        console.log('📊 Fetching profile from DynamoDB for user:', userId)
        const result = await workerService.getWorkerProfile(userId)
        
        if (result.success && result.data) {
          console.log('✅ Profile loaded from DynamoDB:', result.data)
          setProfile(result.data)
        } else {
          setError('No profile data found')
        }
      } catch (error) {
        console.error('❌ Error loading profile:', error)
        setError(error.message || 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [location?.state])

  // ============================================================
  // DATA EXTRACTION
  // ============================================================
  
  // Get data from profile
  const basics = profile.basics || {}
  const trade = profile.trade || {}
  const workHistory = profile.workHistory || {}
  const projects = workHistory.projects || []
  const availability = profile.availability || {}
  const medical = profile.medical || {}
  const certifications = profile.certifications || {}
  const tax = profile.tax || {}
  const payment = profile.payment || {}
  const emergency = profile.emergency || {}

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================
  
  const displayValue = (value, placeholder = '—') => {
    if (value === null || value === undefined || value === '') {
      return placeholder
    }
    if (typeof value === 'string' && value.trim() === '') {
      return placeholder
    }
    return value
  }

  // Format phone number
  const formatPhone = (phone) => {
    if (!phone) return '—'
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
  }

  // Get full name
  const fullName = [basics.legalFirstName, basics.legalLastName].filter(Boolean).join(' ') || '—'

  // Get address
  const address = [basics.addressLine1, basics.city, basics.stateCode, basics.zip].filter(Boolean).join(', ')

  // Get language
  const language = basics.english ? (basics.spanish ? 'English / Spanish' : 'English') : (basics.spanish ? 'Spanish' : '—')

  // Get certifications
  const certChecklist = certifications.certChecklist || {}
  const certNames = Object.keys(certChecklist).filter(key => certChecklist[key])
  const certText = certNames.length > 0 ? certNames.join(', ') : 'No certifications'

  // Get availability days
  const avail = availability.availability || {}
  const availableDays = Object.keys(avail).filter(key => avail[key])
  const availabilityText = availableDays.length > 0 ? availableDays.map(d => d.charAt(0).toUpperCase() + d.slice(1)).join(', ') : 'Not specified'

  // Get tax classification
  const taxPath = tax.classificationPath || ''
  const taxText = taxPath === 'employee' ? 'W2 Employee' : taxPath === 'subcontractor' ? '1099 Contractor' : '—'

  // Get allergies
  const medicalFlags = medical.emergencyMedicalFlags || {}
  const allergies = Object.keys(medicalFlags).filter(key => medicalFlags[key])
  const allergiesText = allergies.length > 0 ? allergies.join(', ') : 'No allergies reported'

  // Get payment
  const bankName = payment.bankName || 'Not set'
  const achEnabled = payment.achEnabled ? 'Enabled' : 'Not enabled'

  // Get emergency contact
  const emergencyName = emergency.emergencyContactName || ''
  const emergencyRelationship = emergency.emergencyContactRelationship || ''
  const emergencyPhone = emergency.emergencyContactPhone || ''

  // Fallback projects
  const fallbackProjects = [
    { name: 'ABC construct', client: 'XYZ Inc', role: 'Helper', trade: 'Drywall' },
    { name: 'DMC construct', client: 'DMX Inc', role: 'Helper', trade: 'Drywall' },
  ]

  // ============================================================
  // NAVIGATION HANDLERS
  // ============================================================
  
  const handleEditBasic = () => {
    navigate('/basic-info/edit', {
      state: {
        basicData: basics,
        parentData: profile
      }
    })
  }

  const handleEditTrade = () => {
    navigate('/trade-profile/edit', {
      state: {
        tradeData: trade,
        parentData: profile
      }
    })
  }

  const handleEditWorkHistory = () => {
    navigate('/work-history/edit', {
      state: {
        workHistoryData: workHistory,
        parentData: profile
      }
    })
  }

  const handleEditAvailability = () => {
    navigate('/availability/edit', {
      state: {
        availabilityData: availability,
        parentData: profile
      }
    })
  }

  const handleEditCertifications = () => {
    navigate('/certification/edit', {
      state: {
        certData: certifications,
        parentData: profile
      }
    })
  }

  const handleEditTax = () => {
    navigate('/tax/edit', {
      state: {
        taxData: tax,
        parentData: profile
      }
    })
  }

  const handleEditPayment = () => {
    navigate('/payment/edit', {
      state: {
        paymentData: payment,
        parentData: profile
      }
    })
  }

  const handleEditMedical = () => {
    navigate('/medical/edit', {
      state: {
        medicalData: medical,
        parentData: profile
      }
    })
  }

  const handleEditEmergency = () => {
    navigate('/emergency-contact/edit', {
      state: {
        emergencyData: emergency,
        parentData: profile
      }
    })
  }

  // ============================================================
  // LOADING AND ERROR STATES
  // ============================================================
  
  if (loading) {
    return (
      <div className="appShell">
        <TopNav variant="solid" />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '80vh',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '3px solid rgba(15, 78, 169, 0.1)',
            borderTop: '3px solid #0f4ea9',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ color: '#17263a' }}>Loading profile...</p>
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="appShell">
        <TopNav variant="solid" />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '80vh',
          flexDirection: 'column',
          gap: '16px'
        }}>
          <p style={{ color: '#dc2626', fontSize: '16px' }}>❌ {error}</p>
          <button 
            onClick={() => navigate('/wizard')}
            style={{
              padding: '10px 24px',
              background: '#0f4ea9',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Go to Wizard
          </button>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER
  // ============================================================
  
  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">12</span>
              </span>
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
          <div className="wizardSummaryPage" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* ============================================================
            Row 1: Basic Information, Trade Profile, Subscription & Rewards
            ============================================================ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
              {/* Basic Information Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Basic Information</span>
                  <button 
                    type="button" 
                    onClick={handleEditBasic}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#0f4ea9', 
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <IconPencil />
                  </button>
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <img src={basics.profilePreview || "/assets/worker.avif"} alt="Worker" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '16px', color: '#17263a' }}>{fullName}</div>
                      <span style={{ fontSize: '12px', color: '#2fb463', fontWeight: 500 }}>Active</span>
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Date of Birth</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basics.dob)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Language</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{language}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Email</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(basics.emailAddress)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Phone No.</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{formatPhone(basics.mobilePhone)}</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Address</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(address)}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trade Profile Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Trade Profile</span>
                  <button 
                    type="button" 
                    onClick={handleEditTrade}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#0f4ea9', 
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <IconPencil />
                  </button>
                </div>
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Primary Trade</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(trade.primaryTrade)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Secondary Trade</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(trade.secondaryTrade, '—')}</div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Experience</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(trade.yearOfExperience)} years</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Subscription & Rewards Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Subscription & Rewards</span>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Active Plan</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>Pro</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Plan tier</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>Professional</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Renews</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>Dec 31, 2026</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(15,78,169,0.06)', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <IconTrophy style={{ color: '#f59e0b' }} />
                      <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f4ea9' }}>12</span>
                      <span style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>Trade Points</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================
            Row 2: Work History
            ============================================================ */}
            <div className="wizardSummaryWideCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Work History</span>
                <button 
                  type="button" 
                  onClick={handleEditWorkHistory}
                  style={{ 
                    background: 'none', 
                    border: 'none', 
                    color: '#0f4ea9', 
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <IconPencil />
                </button>
              </div>
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', padding: '8px 12px', borderBottom: '2px solid rgba(18,38,63,0.08)', fontWeight: 600, fontSize: '12px', color: 'rgba(23,38,58,0.5)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  <div>PROJECT</div>
                  <div>COMPANY</div>
                  <div>TRADE</div>
                  <div>ROLE</div>
                </div>
                {(projects.length > 0 ? projects : fallbackProjects).map((p, idx) => (
                  <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '8px', padding: '10px 12px', borderBottom: idx < (projects.length > 0 ? projects.length - 1 : fallbackProjects.length - 1) ? '1px solid rgba(18,38,63,0.06)' : 'none', fontSize: '14px', color: '#17263a' }}>
                    <div>{displayValue(p.name, 'ABC construct')}</div>
                    <div>{displayValue(p.client, 'XYZ Inc')}</div>
                    <div>{displayValue(p.trade, 'Drywall')}</div>
                    <div>{displayValue(p.role, 'Helper')}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ============================================================
            Row 3: Availability & Rate, Certifications & Safety, Tax Profile, Payment/Bank Details
            ============================================================ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
              {/* Availability & Rate Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Availability & Rate</span>
                  <button 
                    type="button" 
                    onClick={handleEditAvailability}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#0f4ea9', 
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <IconPencil />
                  </button>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Hourly Rate</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(availability.hourlyRate ? `$${availability.hourlyRate}` : '—')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Travel</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{availability.willingToTravel === 'yes' ? 'Yes' : 'No'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Available</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{availabilityText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications & Safety Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Certifications & Safety</span>
                  <button 
                    type="button" 
                    onClick={handleEditCertifications}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#0f4ea9', 
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <IconPencil />
                  </button>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Certifications</span>
                      <span style={{ color: '#17263a', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{certText}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Safety</span>
                      <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tax Profile Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Tax Profile</span>
                  <button 
                    type="button" 
                    onClick={handleEditTax}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#0f4ea9', 
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <IconPencil />
                  </button>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Classification</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{taxText}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Tax Verified</span>
                      <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <IconCheckCircle style={{ width: '16px', height: '16px' }} /> Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment/Bank Details Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Payment / Bank Details</span>
                  <button 
                    type="button" 
                    onClick={handleEditPayment}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#0f4ea9', 
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <IconPencil />
                  </button>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>Bank</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(bankName)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>ACH</span>
                      <span style={{ color: achEnabled === 'Enabled' ? '#2fb463' : 'rgba(23,38,58,0.6)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {achEnabled === 'Enabled' ? (
                          <>
                            <IconCheckCircle style={{ width: '16px', height: '16px', color: '#2fb463' }} /> Enabled
                          </>
                        ) : (
                          'Not enabled'
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================
            Row 4: Medical Details & Emergency Contact
            ============================================================ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
              {/* Medical Details Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Medical Details</span>
                  <button 
                    type="button" 
                    onClick={handleEditMedical}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#0f4ea9', 
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <IconPencil />
                  </button>
                </div>
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Blood Group</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(medical.bloodGroup)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Allergies</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{allergiesText}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Emergency Contact</span>
                  <button 
                    type="button" 
                    onClick={handleEditEmergency}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#0f4ea9', 
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '6px',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
                    <IconPencil />
                  </button>
                </div>
                <div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '4px 16px' }}>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Name</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(emergencyName)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Relationship</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(emergencyRelationship)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>Phone</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{formatPhone(emergencyPhone)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================
            Footer Buttons
            ============================================================ */}
            <div className="wizardSummaryFooter" style={{ display: 'flex', justifyContent: 'center', gap: '16px', paddingTop: '20px', borderTop: '1px solid rgba(18,38,58,0.08)' }}>
              <button type="button" className="btn btnPrimary" onClick={() => navigate('/wizard')} style={{ padding: '10px 24px', borderRadius: '8px', background: '#0f4ea9', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Back to wizard
              </button>
              <button type="button" className="btn btnSuccess" onClick={() => navigate('/')} style={{ padding: '10px 24px', borderRadius: '8px', background: '#2fb463', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                Go to Home
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}