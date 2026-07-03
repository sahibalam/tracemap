// // src/worker/pages/TaxEditPage.jsx
// import { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'
// import { TextField } from '../../common/components/TextField'
// import { IconUser, IconSupport, IconLocation } from '../../common/components/Icons'

// // US States data
// const US_STATES = [
//   { name: 'Alabama', code: 'AL' },
//   { name: 'Alaska', code: 'AK' },
//   { name: 'Arizona', code: 'AZ' },
//   { name: 'Arkansas', code: 'AR' },
//   { name: 'California', code: 'CA' },
//   { name: 'Colorado', code: 'CO' },
//   { name: 'Connecticut', code: 'CT' },
//   { name: 'Delaware', code: 'DE' },
//   { name: 'Florida', code: 'FL' },
//   { name: 'Georgia', code: 'GA' },
//   { name: 'Hawaii', code: 'HI' },
//   { name: 'Idaho', code: 'ID' },
//   { name: 'Illinois', code: 'IL' },
//   { name: 'Indiana', code: 'IN' },
//   { name: 'Iowa', code: 'IA' },
//   { name: 'Kansas', code: 'KS' },
//   { name: 'Kentucky', code: 'KY' },
//   { name: 'Louisiana', code: 'LA' },
//   { name: 'Maine', code: 'ME' },
//   { name: 'Maryland', code: 'MD' },
//   { name: 'Massachusetts', code: 'MA' },
//   { name: 'Michigan', code: 'MI' },
//   { name: 'Minnesota', code: 'MN' },
//   { name: 'Mississippi', code: 'MS' },
//   { name: 'Missouri', code: 'MO' },
//   { name: 'Montana', code: 'MT' },
//   { name: 'Nebraska', code: 'NE' },
//   { name: 'Nevada', code: 'NV' },
//   { name: 'New Hampshire', code: 'NH' },
//   { name: 'New Jersey', code: 'NJ' },
//   { name: 'New Mexico', code: 'NM' },
//   { name: 'New York', code: 'NY' },
//   { name: 'North Carolina', code: 'NC' },
//   { name: 'North Dakota', code: 'ND' },
//   { name: 'Ohio', code: 'OH' },
//   { name: 'Oklahoma', code: 'OK' },
//   { name: 'Oregon', code: 'OR' },
//   { name: 'Pennsylvania', code: 'PA' },
//   { name: 'Rhode Island', code: 'RI' },
//   { name: 'South Carolina', code: 'SC' },
//   { name: 'South Dakota', code: 'SD' },
//   { name: 'Tennessee', code: 'TN' },
//   { name: 'Texas', code: 'TX' },
//   { name: 'Utah', code: 'UT' },
//   { name: 'Vermont', code: 'VT' },
//   { name: 'Virginia', code: 'VA' },
//   { name: 'Washington', code: 'WA' },
//   { name: 'West Virginia', code: 'WV' },
//   { name: 'Wisconsin', code: 'WI' },
//   { name: 'Wyoming', code: 'WY' },
// ]

// // State Dropdown Component
// function StateDropdown({ value, onChange, placeholder = 'Select State' }) {
//   return (
//     <div style={{ position: 'relative' }}>
//       <select
//         value={value || ''}
//         onChange={(e) => onChange(e.target.value)}
//         style={{
//           width: '100%',
//           height: '48px',
//           padding: '0 16px',
//           paddingRight: '40px',
//           border: '1px solid rgba(18, 38, 63, 0.12)',
//           borderRadius: '12px',
//           fontSize: '14px',
//           outline: 'none',
//           background: 'white',
//           color: value ? '#17263a' : '#6b7280',
//           transition: 'all 0.2s ease',
//           fontFamily: 'inherit',
//           appearance: 'none',
//           cursor: 'pointer',
//           backgroundColor: '#fff',
//           backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2317263a' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
//           backgroundRepeat: 'no-repeat',
//           backgroundPosition: 'right 14px center',
//         }}
//         onFocus={(e) => {
//           e.target.style.borderColor = '#0f4ea9'
//           e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//         }}
//         onBlur={(e) => {
//           e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//           e.target.style.boxShadow = 'none'
//         }}
//       >
//         <option value="">{placeholder}</option>
//         {US_STATES.map((state) => (
//           <option key={state.code} value={state.code}>
//             {state.name}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }

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

// function IconSupportIcon(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUserIcon(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLocationIcon(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconArrowLeft(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// export function TaxEditPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   // Get data from location state or initialize empty
//   const initialData = location?.state?.taxData || {
//     classificationPath: '',
//     stateOfWork: '',
//     employeeTaxName: '',
//     employeeSsn: '',
//     employeeStartDate: '',
//     employeeFlags: {},
//     reviewerName: '',
//     complianceNotes: '',
//     entityLegalName: '',
//     entityEin: '',
//     entityType: '',
//     entityStateRegistration: '',
//     entityDbaName: '',
//     entityAuthorizedSigner: '',
//     entityFlags: {},
//     stateSpecificFlags: {},
//   }

//   const [taxData, setTaxData] = useState(initialData)
//   const [isSaving, setIsSaving] = useState(false)

//   const handleChange = (field, value) => {
//     setTaxData({ ...taxData, [field]: value })
//   }

//   const toggleMapValue = (key, setMap) => (e) => {
//     const current = taxData[key] || {}
//     setMap({ ...current, [key]: e.target.checked })
//   }

//   const setEmployeeFlags = (flags) => handleChange('employeeFlags', flags)
//   const setEntityFlags = (flags) => handleChange('entityFlags', flags)
//   const setStateSpecificFlags = (flags) => handleChange('stateSpecificFlags', flags)

//   const handleSave = () => {
//     setIsSaving(true)
//     // Simulate save delay
//     setTimeout(() => {
//       // Navigate back to summary with updated data
//       navigate('/wizard/summary', { 
//         state: { 
//           ...location?.state?.parentData,
//           taxData: taxData,
//           updatedTax: true 
//         },
//         replace: true 
//       })
//       setIsSaving(false)
//     }, 500)
//   }

//   const handleBack = () => {
//     navigate('/wizard/summary')
//   }

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
//                 <span className="sideIcon" aria-hidden="true"><IconUserIcon /></span>
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
//                 <span className="sideIcon" aria-hidden="true"><IconSupportIcon /></span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div style={{ 
//             padding: '24px', 
//             maxWidth: '1100px', 
//             margin: '0 auto', 
//             height: 'calc(100vh - 120px)', 
//             display: 'flex', 
//             flexDirection: 'column' 
//           }}>
            
//             {/* Sticky Header with Back button - Transparent background */}
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '16px',
//               marginBottom: '16px',
//               paddingBottom: '16px',
//               borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
//               flexShrink: 0,
//               background: 'transparent',
//               zIndex: 10,
//             }}>
//               <button
//                 onClick={handleBack}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   color: '#17263a',
//                   fontSize: '14px',
//                   fontWeight: 500,
//                   padding: '8px 12px',
//                   borderRadius: '8px',
//                   transition: 'background 0.2s',
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
//                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//               >
//                 <IconArrowLeft />
//                 Back
//               </button>
//               <span style={{
//                 fontSize: '16px',
//                 fontWeight: 600,
//                 color: '#17263a',
//               }}>
//                 Edit Tax Profile
//               </span>
//             </div>

//             {/* Scrollable Content Area */}
//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               paddingBottom: '16px',
//             }}>
//               {/* Tax Form */}
//               <div style={{
//                 background: 'white',
//                 borderRadius: '16px',
//                 padding: '32px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//               }}>
                
//                 {/* Section 1: Classification Selection & Routing */}
//                 <div style={{ marginBottom: '24px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     1. Classification Selection & Routing
//                   </div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                       <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                         <input
//                           type="radio"
//                           name="classificationPath"
//                           checked={taxData.classificationPath === 'employee'}
//                           onChange={() => handleChange('classificationPath', 'employee')}
//                         />
//                         <span style={{ fontSize: '14px', color: '#17263a' }}>Employee / W-2 path</span>
//                       </label>
//                       <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                         <input
//                           type="radio"
//                           name="classificationPath"
//                           checked={taxData.classificationPath === 'subcontractor'}
//                           onChange={() => handleChange('classificationPath', 'subcontractor')}
//                         />
//                         <span style={{ fontSize: '14px', color: '#17263a' }}>Subcontractor / 1099 / entity path</span>
//                       </label>
//                     </div>

//                     <div>
//                       <StateDropdown
//                         value={taxData.stateOfWork || ''}
//                         onChange={(v) => handleChange('stateOfWork', v)}
//                         placeholder="Select State of work"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 {/* Section 2: Employee / W-2 Path Requirements */}
//                 {taxData.classificationPath === 'employee' && (
//                   <div style={{ marginBottom: '24px' }}>
//                     <div style={{
//                       fontSize: '16px',
//                       fontWeight: 600,
//                       color: '#17263a',
//                       marginBottom: '16px',
//                       paddingBottom: '8px',
//                       borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                     }}>
//                       2. Employee / W-2 Path Requirements
//                     </div>
//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
//                       <TextField
//                         placeholder="Legal tax name"
//                         icon={<IconUserIcon />}
//                         value={taxData.employeeTaxName || ''}
//                         onChange={(v) => handleChange('employeeTaxName', v)}
//                       />
//                       <TextField 
//                         placeholder="SSN" 
//                         icon={<IconSupportIcon />} 
//                         value={taxData.employeeSsn || ''} 
//                         onChange={(v) => handleChange('employeeSsn', v)} 
//                       />
//                       <TextField
//                         placeholder="Employee start date"
//                         icon={<IconSupportIcon />}
//                         value={taxData.employeeStartDate || ''}
//                         onChange={(v) => handleChange('employeeStartDate', v)}
//                       />
//                     </div>

//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
//                       {[
//                         'Form I-9 completed',
//                         'Identity / work authorization reviewed',
//                         'Form W-4 completed',
//                         'New-hire reporting required / completed',
//                         "Workers' comp review required",
//                         'Official form edition used',
//                       ].map((k) => (
//                         <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                           <input type="checkbox" checked={!!(taxData.employeeFlags?.[k] || false)} onChange={toggleMapValue(k, setEmployeeFlags)} />
//                           <span style={{ fontSize: '14px', color: '#17263a' }}>{k}</span>
//                         </label>
//                       ))}
//                     </div>

//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
//                       <TextField
//                         placeholder="Reviewer name"
//                         icon={<IconUserIcon />}
//                         value={taxData.reviewerName || ''}
//                         onChange={(v) => handleChange('reviewerName', v)}
//                       />
//                       <TextField
//                         placeholder="Compliance notes"
//                         icon={<IconSupportIcon />}
//                         value={taxData.complianceNotes || ''}
//                         onChange={(v) => handleChange('complianceNotes', v)}
//                       />
//                     </div>
//                   </div>
//                 )}

//                 {/* Section 3: Subcontractor / 1099 / Entity Path Requirements */}
//                 {taxData.classificationPath === 'subcontractor' && (
//                   <div style={{ marginBottom: '24px' }}>
//                     <div style={{
//                       fontSize: '16px',
//                       fontWeight: 600,
//                       color: '#17263a',
//                       marginBottom: '16px',
//                       paddingBottom: '8px',
//                       borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                     }}>
//                       3. Subcontractor / 1099 / Entity Path Requirements
//                     </div>
//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
//                       <TextField
//                         placeholder="Legal entity name"
//                         icon={<IconSupportIcon />}
//                         value={taxData.entityLegalName || ''}
//                         onChange={(v) => handleChange('entityLegalName', v)}
//                       />
//                       <TextField 
//                         placeholder="EIN" 
//                         icon={<IconSupportIcon />} 
//                         value={taxData.entityEin || ''} 
//                         onChange={(v) => handleChange('entityEin', v)} 
//                       />
//                       <TextField
//                         placeholder="Entity type"
//                         icon={<IconSupportIcon />}
//                         value={taxData.entityType || ''}
//                         onChange={(v) => handleChange('entityType', v)}
//                       />
//                       <TextField
//                         placeholder="State of registration"
//                         icon={<IconLocationIcon />}
//                         value={taxData.entityStateRegistration || ''}
//                         onChange={(v) => handleChange('entityStateRegistration', v)}
//                       />
//                     </div>

//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
//                       <TextField
//                         placeholder="DBA / trade name"
//                         icon={<IconSupportIcon />}
//                         value={taxData.entityDbaName || ''}
//                         onChange={(v) => handleChange('entityDbaName', v)}
//                       />
//                       <TextField
//                         placeholder="Authorized signer"
//                         icon={<IconUserIcon />}
//                         value={taxData.entityAuthorizedSigner || ''}
//                         onChange={(v) => handleChange('entityAuthorizedSigner', v)}
//                       />
//                     </div>

//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
//                       {[
//                         'Form W-9 completed',
//                         'TIN match verified where required',
//                         'Backup withholding flag reviewed',
//                         'Independent contractor reporting needed',
//                         'Contract / entity documentation reviewed',
//                       ].map((k) => (
//                         <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                           <input type="checkbox" checked={!!(taxData.entityFlags?.[k] || false)} onChange={toggleMapValue(k, setEntityFlags)} />
//                           <span style={{ fontSize: '14px', color: '#17263a' }}>{k}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Section 4: State-Specific Flags */}
//                 <div style={{ marginBottom: '24px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     4. State-Specific Flags
//                   </div>
//                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
//                     {['Florida worker or project', 'Texas worker or project', "Workers' comp review required"].map((k) => (
//                       <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                         <input type="checkbox" checked={!!(taxData.stateSpecificFlags?.[k] || false)} onChange={toggleMapValue(k, setStateSpecificFlags)} />
//                         <span style={{ fontSize: '14px', color: '#17263a' }}>{k}</span>
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sticky Footer with Cancel and Save buttons - Transparent background */}
//             <div style={{
//               display: 'flex',
//               justifyContent: 'flex-end',
//               gap: '12px',
//               paddingTop: '16px',
//               paddingBottom: '8px',
//               borderTop: '1px solid rgba(18, 38, 63, 0.08)',
//               flexShrink: 0,
//               background: 'transparent',
//               zIndex: 10,
//             }}>
//               <button
//                 onClick={handleBack}
//                 style={{
//                   padding: '10px 24px',
//                   borderRadius: '8px',
//                   background: 'transparent',
//                   color: '#17263a',
//                   border: '1px solid rgba(18, 38, 63, 0.12)',
//                   cursor: 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                 }}
//                 onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
//                 onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleSave}
//                 disabled={isSaving}
//                 style={{
//                   padding: '10px 32px',
//                   borderRadius: '8px',
//                   background: isSaving ? '#94a3b8' : '#0f4ea9',
//                   color: 'white',
//                   border: 'none',
//                   cursor: isSaving ? 'not-allowed' : 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                   opacity: isSaving ? 0.7 : 1,
//                 }}
//                 onMouseEnter={(e) => {
//                   if (!isSaving) {
//                     e.currentTarget.style.background = '#0b3f90'
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isSaving) {
//                     e.currentTarget.style.background = '#0f4ea9'
//                   }
//                 }}
//               >
//                 {isSaving ? 'Saving...' : 'Save Changes'}
//               </button>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }






// src/worker/pages/TaxEditPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import workerService from "../../services/workerService";

// ============================================================
// ICONS
// ============================================================

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

function IconSupportIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
    </svg>
  )
}

function IconUserIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
    </svg>
  )
}

function IconLocationIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="currentColor" />
    </svg>
  )
}

function IconArrowLeft(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ============================================================
// US STATES DATA
// ============================================================

const US_STATES = [
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
]

// ============================================================
// STATE DROPDOWN COMPONENT
// ============================================================

function StateDropdown({ value, onChange, placeholder = 'Select State' }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          height: '48px',
          padding: '0 16px',
          paddingRight: '40px',
          border: '1px solid rgba(18, 38, 63, 0.12)',
          borderRadius: '12px',
          fontSize: '14px',
          outline: 'none',
          background: 'white',
          color: value ? '#17263a' : '#6b7280',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
          appearance: 'none',
          cursor: 'pointer',
          backgroundColor: '#fff',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2317263a' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#0f4ea9'
          e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
          e.target.style.boxShadow = 'none'
        }}
      >
        <option value="">{placeholder}</option>
        {US_STATES.map((state) => (
          <option key={state.code} value={state.code}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function TaxEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [taxData, setTaxData] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // ============================================================
  // LOAD DATA FROM WORKERS TABLE
  // ============================================================
  
  useEffect(() => {
    const loadTaxData = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setError('User ID not found. Please login again.')
          setLoading(false)
          return
        }

        // If data is in location state, use it
        if (location?.state?.taxData) {
          console.log('📋 Using tax data from location state')
          setTaxData(location.state.taxData)
          setLoading(false)
          return
        }

        // Otherwise fetch from server
        console.log('📊 Fetching tax data from Workers table')
        const profile = await workerService.getWorkerProfile(userId)
        
        if (profile.success && profile.data?.tax) {
          setTaxData(profile.data.tax)
          console.log('✅ Tax data loaded from Workers table')
        } else {
          // Initialize with empty data
          setTaxData({
            classificationPath: '',
            stateOfWork: '',
            employeeTaxName: '',
            employeeSsn: '',
            employeeStartDate: '',
            employeeFlags: {},
            reviewerName: '',
            complianceNotes: '',
            entityLegalName: '',
            entityEin: '',
            entityType: '',
            entityStateRegistration: '',
            entityDbaName: '',
            entityAuthorizedSigner: '',
            entityFlags: {},
            stateSpecificFlags: {},
          })
          console.log('📝 Initialized empty tax data')
        }
      } catch (error) {
        console.error('❌ Error loading tax data:', error)
        setError(error.message || 'Failed to load tax data')
      } finally {
        setLoading(false)
      }
    }

    loadTaxData()
  }, [location?.state?.taxData])

  // ============================================================
  // HANDLERS
  // ============================================================
  
  const handleChange = (field, value) => {
    setTaxData({ ...taxData, [field]: value })
  }

  const toggleEmployeeFlag = (key) => (e) => {
    const current = taxData.employeeFlags || {}
    setTaxData({
      ...taxData,
      employeeFlags: {
        ...current,
        [key]: e.target.checked,
      },
    })
  }

  const toggleEntityFlag = (key) => (e) => {
    const current = taxData.entityFlags || {}
    setTaxData({
      ...taxData,
      entityFlags: {
        ...current,
        [key]: e.target.checked,
      },
    })
  }

  const toggleStateSpecificFlag = (key) => (e) => {
    const current = taxData.stateSpecificFlags || {}
    setTaxData({
      ...taxData,
      stateSpecificFlags: {
        ...current,
        [key]: e.target.checked,
      },
    })
  }

  // ============================================================
  // SAVE TO WORKERS TABLE
  // ============================================================
  
  const handleSave = async () => {
    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        throw new Error('User ID not found. Please login again.')
      }

      console.log('💾 Saving tax profile to Workers table')

      // Save to Workers table via workerService
      await workerService.updateTax(userId, taxData)
      
      console.log('✅ Tax profile saved to Workers table')
      setSuccess('Tax profile saved successfully!')

      // Navigate back to summary with updated data
      setTimeout(() => {
        navigate('/wizard/summary', { 
          state: { 
            ...location?.state?.parentData,
            tax: taxData,
            updatedTax: true 
          },
          replace: true 
        })
      }, 500)

    } catch (error) {
      console.error('❌ Error saving tax:', error)
      setError(error.message || 'Failed to save tax information')
    } finally {
      setIsSaving(false)
    }
  }

  const handleBack = () => {
    navigate('/wizard/summary', {
      state: location?.state?.parentData || {},
      replace: true
    })
  }

  // ============================================================
  // RENDER
  // ============================================================
  
  // Loading state
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
          <p style={{ color: '#17263a' }}>Loading tax profile...</p>
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
                <span className="sideIcon" aria-hidden="true"><IconUserIcon /></span>
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
                <span className="sideIcon" aria-hidden="true"><IconSupportIcon /></span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div style={{ 
            padding: '24px', 
            maxWidth: '1100px', 
            margin: '0 auto', 
            height: 'calc(100vh - 120px)', 
            display: 'flex', 
            flexDirection: 'column' 
          }}>
            
            {/* ============================================================
            HEADER
            ============================================================ */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              marginBottom: '16px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
              flexShrink: 0,
              background: 'transparent',
              zIndex: 10,
            }}>
              <button
                onClick={handleBack}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#17263a',
                  fontSize: '14px',
                  fontWeight: 500,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <IconArrowLeft />
                Back
              </button>
              <span style={{
                fontSize: '16px',
                fontWeight: 600,
                color: '#17263a',
              }}>
                Edit Tax Profile
              </span>
            </div>

            {/* ============================================================
            NOTIFICATIONS
            ============================================================ */}
            {error && (
              <div style={{
                padding: '12px 16px',
                background: '#fee2e2',
                color: '#dc2626',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>❌ {error}</span>
                <button
                  onClick={() => setError('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#dc2626',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {success && (
              <div style={{
                padding: '12px 16px',
                background: '#d1fae5',
                color: '#065f46',
                border: '1px solid #6ee7b7',
                borderRadius: '8px',
                marginBottom: '16px',
                fontSize: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span>✅ {success}</span>
                <button
                  onClick={() => setSuccess('')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#065f46',
                    fontWeight: 'bold',
                    fontSize: '18px'
                  }}
                >
                  ×
                </button>
              </div>
            )}

            {/* ============================================================
            CONTENT - SCROLLABLE
            ============================================================ */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              paddingBottom: '16px',
            }}>
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(18, 38, 63, 0.08)',
              }}>
                
                {/* ============================================================
                SECTION 1: CLASSIFICATION SELECTION
                ============================================================ */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                  }}>
                    1. Classification Selection & Routing
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="classificationPath"
                          checked={taxData.classificationPath === 'employee'}
                          onChange={() => handleChange('classificationPath', 'employee')}
                        />
                        <span style={{ fontSize: '14px', color: '#17263a' }}>Employee / W-2 path</span>
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="radio"
                          name="classificationPath"
                          checked={taxData.classificationPath === 'subcontractor'}
                          onChange={() => handleChange('classificationPath', 'subcontractor')}
                        />
                        <span style={{ fontSize: '14px', color: '#17263a' }}>Subcontractor / 1099 / entity path</span>
                      </label>
                    </div>

                    <div>
                      <StateDropdown
                        value={taxData.stateOfWork || ''}
                        onChange={(v) => handleChange('stateOfWork', v)}
                        placeholder="Select State of work"
                      />
                    </div>
                  </div>
                </div>

                {/* ============================================================
                SECTION 2: EMPLOYEE / W-2 PATH
                ============================================================ */}
                {taxData.classificationPath === 'employee' && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '16px',
                      paddingBottom: '8px',
                      borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                    }}>
                      2. Employee / W-2 Path Requirements
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <TextField
                        placeholder="Legal tax name"
                        icon={<IconUserIcon />}
                        value={taxData.employeeTaxName || ''}
                        onChange={(v) => handleChange('employeeTaxName', v)}
                      />
                      <TextField 
                        placeholder="SSN" 
                        icon={<IconSupportIcon />} 
                        value={taxData.employeeSsn || ''} 
                        onChange={(v) => handleChange('employeeSsn', v)} 
                      />
                      <TextField
                        placeholder="Employee start date"
                        icon={<IconSupportIcon />}
                        value={taxData.employeeStartDate || ''}
                        onChange={(v) => handleChange('employeeStartDate', v)}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '12px' }}>
                      {[
                        'Form I-9 completed',
                        'Identity / work authorization reviewed',
                        'Form W-4 completed',
                        'New-hire reporting required / completed',
                        "Workers' comp review required",
                        'Official form edition used',
                      ].map((flag) => (
                        <label key={flag} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={!!(taxData.employeeFlags?.[flag] || false)} 
                            onChange={toggleEmployeeFlag(flag)} 
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>{flag}</span>
                        </label>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <TextField
                        placeholder="Reviewer name"
                        icon={<IconUserIcon />}
                        value={taxData.reviewerName || ''}
                        onChange={(v) => handleChange('reviewerName', v)}
                      />
                      <TextField
                        placeholder="Compliance notes"
                        icon={<IconSupportIcon />}
                        value={taxData.complianceNotes || ''}
                        onChange={(v) => handleChange('complianceNotes', v)}
                      />
                    </div>
                  </div>
                )}

                {/* ============================================================
                SECTION 3: SUBCONTRACTOR / 1099 PATH
                ============================================================ */}
                {taxData.classificationPath === 'subcontractor' && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '16px',
                      paddingBottom: '8px',
                      borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                    }}>
                      3. Subcontractor / 1099 / Entity Path Requirements
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <TextField
                        placeholder="Legal entity name"
                        icon={<IconSupportIcon />}
                        value={taxData.entityLegalName || ''}
                        onChange={(v) => handleChange('entityLegalName', v)}
                      />
                      <TextField 
                        placeholder="EIN" 
                        icon={<IconSupportIcon />} 
                        value={taxData.entityEin || ''} 
                        onChange={(v) => handleChange('entityEin', v)} 
                      />
                      <TextField
                        placeholder="Entity type"
                        icon={<IconSupportIcon />}
                        value={taxData.entityType || ''}
                        onChange={(v) => handleChange('entityType', v)}
                      />
                      <TextField
                        placeholder="State of registration"
                        icon={<IconLocationIcon />}
                        value={taxData.entityStateRegistration || ''}
                        onChange={(v) => handleChange('entityStateRegistration', v)}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                      <TextField
                        placeholder="DBA / trade name"
                        icon={<IconSupportIcon />}
                        value={taxData.entityDbaName || ''}
                        onChange={(v) => handleChange('entityDbaName', v)}
                      />
                      <TextField
                        placeholder="Authorized signer"
                        icon={<IconUserIcon />}
                        value={taxData.entityAuthorizedSigner || ''}
                        onChange={(v) => handleChange('entityAuthorizedSigner', v)}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                      {[
                        'Form W-9 completed',
                        'TIN match verified where required',
                        'Backup withholding flag reviewed',
                        'Independent contractor reporting needed',
                        'Contract / entity documentation reviewed',
                      ].map((flag) => (
                        <label key={flag} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={!!(taxData.entityFlags?.[flag] || false)} 
                            onChange={toggleEntityFlag(flag)} 
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>{flag}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* ============================================================
                SECTION 4: STATE-SPECIFIC FLAGS
                ============================================================ */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                  }}>
                    4. State-Specific Flags
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                    {['Florida worker or project', 'Texas worker or project', "Workers' comp review required"].map((flag) => (
                      <label key={flag} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input 
                          type="checkbox" 
                          checked={!!(taxData.stateSpecificFlags?.[flag] || false)} 
                          onChange={toggleStateSpecificFlag(flag)} 
                        />
                        <span style={{ fontSize: '14px', color: '#17263a' }}>{flag}</span>
                      </label>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* ============================================================
            FOOTER
            ============================================================ */}
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              paddingTop: '16px',
              paddingBottom: '8px',
              borderTop: '1px solid rgba(18, 38, 63, 0.08)',
              flexShrink: 0,
              background: 'transparent',
              zIndex: 10,
            }}>
              <button
                onClick={handleBack}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  background: 'transparent',
                  color: '#17263a',
                  border: '1px solid rgba(18, 38, 63, 0.12)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                style={{
                  padding: '10px 32px',
                  borderRadius: '8px',
                  background: isSaving ? '#94a3b8' : '#0f4ea9',
                  color: 'white',
                  border: 'none',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  opacity: isSaving ? 0.7 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.background = '#0b3f90'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSaving) {
                    e.currentTarget.style.background = '#0f4ea9'
                  }
                }}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  )
}

export default TaxEditPage