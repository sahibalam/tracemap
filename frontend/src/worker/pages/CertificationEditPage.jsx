// // src/worker/pages/CertificationEditPage.jsx
// import { useState, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
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

// function IconArrowLeft(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// export function CertificationEditPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   // Get data from location state or initialize empty
//   const initialData = location?.state?.certData || {
//     certChecklist: {},
//     certRows: [
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//     ],
//     safetyFlags: {},
//   }

//   const [certData, setCertData] = useState(initialData)
//   const [isSaving, setIsSaving] = useState(false)
//   const [openDatePicker, setOpenDatePicker] = useState(null)
//   const fileInputRefs = useRef({})

//   const handleChange = (field, value) => {
//     setCertData({ ...certData, [field]: value })
//   }

//   const toggleMapValue = (key, setMap) => (e) => {
//     const current = certData[key] || {}
//     setMap({ ...current, [key]: e.target.checked })
//   }

//   const setCertChecklist = (checklist) => handleChange('certChecklist', checklist)

//   const updateCertRow = (index, key) => (value) => {
//     const rows = [...(certData.certRows || [])]
//     rows[index] = { ...rows[index], [key]: value }
//     handleChange('certRows', rows)
//   }

//   // Handle file upload
//   const handleFileUpload = (index) => (e) => {
//     const file = e.target.files[0]
//     if (file) {
//       updateCertRow(index, 'uploadRef')(file.name)
//       console.log(`File uploaded for row ${index}:`, file.name)
//     }
//   }

//   // Trigger file input click
//   const triggerFileUpload = (index) => () => {
//     if (fileInputRefs.current[index]) {
//       fileInputRefs.current[index].click()
//     }
//   }

//   // Handle date change from react-datepicker
//   const handleDateChange = (index, field) => (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       updateCertRow(index, field)(`${month}/${day}/${year}`)
//     } else {
//       updateCertRow(index, field)('')
//     }
//     setOpenDatePicker(null)
//   }

//   // Parse date string to Date object for react-datepicker
//   const parseDate = (dateStr) => {
//     if (!dateStr) return null
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
//     }
//     return null
//   }

//   const handleSave = () => {
//     setIsSaving(true)
//     // Simulate save delay
//     setTimeout(() => {
//       // Navigate back to summary with updated data
//       navigate('/wizard/summary', { 
//         state: { 
//           ...location?.state?.parentData,
//           certData: certData,
//           updatedCert: true 
//         },
//         replace: true 
//       })
//       setIsSaving(false)
//     }, 500)
//   }

//   const handleBack = () => {
//     navigate('/wizard/summary')
//   }

//   // Custom styles for date picker
//   const datePickerStyles = `
//     .cert-date-picker .react-datepicker__input-container input {
//       width: 100%;
//       height: 36px;
//       padding: 0 8px;
//       padding-right: 28px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 6px;
//       font-size: 13px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//       cursor: pointer;
//     }

//     .cert-date-picker .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .cert-date-picker .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .cert-date-picker .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .cert-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//     }

//     .cert-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }

//     .cert-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }

//     .cert-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }

//     .cert-date-picker .react-datepicker__day {
//       width: 32px;
//       height: 32px;
//       line-height: 32px;
//       margin: 2px;
//       border-radius: 8px;
//       font-size: 13px;
//       color: #17263a;
//       transition: all 0.15s ease;
//       cursor: pointer;
//     }

//     .cert-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }

//     .cert-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }

//     .cert-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }

//     .cert-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }

//     .cert-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }

//     .cert-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }

//     .cert-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }

//     .cert-date-picker .react-datepicker__navigation {
//       top: 12px;
//       background: transparent;
//       border: none;
//       cursor: pointer;
//       padding: 0;
//       width: 28px;
//       height: 28px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       border-radius: 6px;
//       transition: all 0.15s ease;
//     }

//     .cert-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }

//     .cert-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }

//     .cert-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }

//     .cert-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }

//     .cert-date-picker .react-datepicker__input-container {
//       width: 100%;
//     }

//     .cert-date-picker .react-datepicker-wrapper {
//       width: 100%;
//     }

//     .cert-date-picker .react-datepicker__input-container {
//       position: relative;
//     }

//     .cert-date-picker .react-datepicker__input-container::after {
//       content: '📅';
//       position: absolute;
//       right: 8px;
//       top: 50%;
//       transform: translateY(-50%);
//       font-size: 14px;
//       pointer-events: none;
//       opacity: 0.6;
//     }

//     .react-datepicker-popper {
//       z-index: 9999 !important;
//     }

//     .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
//       display: none;
//     }
//   `

//   // File upload button styles
//   const fileUploadStyles = `
//     .file-upload-btn {
//       display: inline-flex;
//       align-items: center;
//       gap: 4px;
//       padding: 4px 12px;
//       background: rgba(15, 78, 169, 0.08);
//       color: #0f4ea9;
//       border: 1px solid rgba(15, 78, 169, 0.2);
//       border-radius: 6px;
//       font-size: 12px;
//       font-weight: 500;
//       cursor: pointer;
//       transition: all 0.2s ease;
//       width: 100%;
//       justify-content: center;
//       white-space: nowrap;
//     }

//     .file-upload-btn:hover {
//       background: rgba(15, 78, 169, 0.15);
//       border-color: #0f4ea9;
//     }

//     .file-upload-btn.has-file {
//       background: rgba(47, 180, 99, 0.1);
//       border-color: #2fb463;
//       color: #2fb463;
//     }

//     .file-upload-btn .file-name {
//       max-width: 80px;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//     }
//   `

//   const certRows = certData.certRows || [
//     { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//     { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//     { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
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
//           <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            
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
//                 Edit Certifications & Safety
//               </span>
//             </div>

//             {/* Scrollable Content Area */}
//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               paddingBottom: '16px',
//             }}>
//               {/* Certification Form */}
//               <div style={{
//                 background: 'white',
//                 borderRadius: '16px',
//                 padding: '32px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//               }}>
//                 <style>{datePickerStyles}</style>
//                 <style>{fileUploadStyles}</style>
                
//                 {/* Section 1: Certification Checklist */}
//                 <div style={{ marginBottom: '32px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     1. Certification Checklist
//                   </div>
//                   <div style={{ 
//                     display: 'grid', 
//                     gridTemplateColumns: '1fr 1fr 1fr', 
//                     gap: '16px'
//                   }}>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                       {['OSHA 10', 'OSHA 30', 'Scissor lift'].map((k) => (
//                         <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                           <input type="checkbox" checked={!!(certData.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
//                           <span style={{ fontSize: '14px', color: '#17263a' }}>{k}</span>
//                         </label>
//                       ))}
//                     </div>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                       {['Boom / aerial lift', 'Forklift / PIT', 'CPR / First Aid'].map((k) => (
//                         <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                           <input type="checkbox" checked={!!(certData.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
//                           <span style={{ fontSize: '14px', color: '#17263a' }}>{k}</span>
//                         </label>
//                       ))}
//                     </div>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                       {['Fall protection', 'HazCom', 'Site-specific orientation'].map((k) => (
//                         <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                           <input type="checkbox" checked={!!(certData.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
//                           <span style={{ fontSize: '14px', color: '#17263a' }}>{k}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Section 2: Verification Data */}
//                 <div style={{ marginBottom: '24px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     2. Verification Data
//                   </div>
                  
//                   {/* Table with fixed column widths */}
//                   <div style={{ 
//                     width: '100%', 
//                     overflowX: 'auto',
//                     position: 'relative'
//                   }}>
//                     {/* Header Row */}
//                     <div style={{ 
//                       display: 'grid', 
//                       gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr',
//                       gap: '8px',
//                       padding: '8px 4px',
//                       borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                       fontWeight: 600,
//                       fontSize: '13px',
//                       color: '#17263a',
//                       minWidth: '700px'
//                     }}>
//                       <div>Certification / card name</div>
//                       <div>Card number / ID</div>
//                       <div>Issue date</div>
//                       <div>Expiration date</div>
//                       <div>Upload / file ref</div>
//                     </div>

//                     {/* Data Rows */}
//                     {certRows.map((row, idx) => (
//                       <div 
//                         key={idx} 
//                         style={{ 
//                           display: 'grid', 
//                           gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr',
//                           gap: '8px',
//                           padding: '6px 4px',
//                           borderBottom: idx < certRows.length - 1 ? '1px solid rgba(18, 38, 63, 0.06)' : 'none',
//                           alignItems: 'center',
//                           minWidth: '700px'
//                         }}
//                       >
//                         {/* Certification / card name */}
//                         <input 
//                           value={row.name} 
//                           onChange={(e) => updateCertRow(idx, 'name')(e.target.value)}
//                           placeholder="e.g. OSHA 10"
//                           style={{
//                             width: '100%',
//                             padding: '6px 10px',
//                             border: '1px solid rgba(18, 38, 63, 0.12)',
//                             borderRadius: '6px',
//                             fontSize: '13px',
//                             outline: 'none',
//                             transition: 'all 0.2s ease',
//                             background: 'white',
//                             color: '#17263a',
//                             boxSizing: 'border-box'
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = '#0f4ea9'
//                             e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                             e.target.style.boxShadow = 'none'
//                           }}
//                         />

//                         {/* Card number / ID */}
//                         <input 
//                           value={row.cardNumber} 
//                           onChange={(e) => updateCertRow(idx, 'cardNumber')(e.target.value)}
//                           placeholder="Card ID"
//                           style={{
//                             width: '100%',
//                             padding: '6px 10px',
//                             border: '1px solid rgba(18, 38, 63, 0.12)',
//                             borderRadius: '6px',
//                             fontSize: '13px',
//                             outline: 'none',
//                             transition: 'all 0.2s ease',
//                             background: 'white',
//                             color: '#17263a',
//                             boxSizing: 'border-box'
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = '#0f4ea9'
//                             e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                             e.target.style.boxShadow = 'none'
//                           }}
//                         />

//                         {/* Issue date - Calendar Picker */}
//                         <div className="cert-date-picker" style={{ width: '100%', position: 'relative' }}>
//                           <DatePicker
//                             selected={parseDate(row.issueDate)}
//                             onChange={handleDateChange(idx, 'issueDate')}
//                             dateFormat="MM/dd/yyyy"
//                             placeholderText="MM/DD/YYYY"
//                             maxDate={new Date()}
//                             showYearDropdown
//                             showMonthDropdown
//                             dropdownMode="select"
//                             yearDropdownItemNumber={100}
//                             scrollableYearDropdown
//                             className="date-picker-input"
//                             popperPlacement="bottom-start"
//                             popperModifiers={[
//                               {
//                                 name: 'offset',
//                                 options: {
//                                   offset: [0, 8],
//                                 },
//                               },
//                               {
//                                 name: 'preventOverflow',
//                                 options: {
//                                   boundariesElement: 'viewport',
//                                 },
//                               },
//                               {
//                                 name: 'flip',
//                                 options: {
//                                   fallbackPlacements: ['top-start', 'bottom-start'],
//                                 },
//                               },
//                             ]}
//                             onCalendarOpen={() => setOpenDatePicker(`issue-${idx}`)}
//                             onCalendarClose={() => setOpenDatePicker(null)}
//                           />
//                         </div>

//                         {/* Expiration date - Calendar Picker */}
//                         <div className="cert-date-picker" style={{ width: '100%', position: 'relative' }}>
//                           <DatePicker
//                             selected={parseDate(row.expirationDate)}
//                             onChange={handleDateChange(idx, 'expirationDate')}
//                             dateFormat="MM/dd/yyyy"
//                             placeholderText="MM/DD/YYYY"
//                             showYearDropdown
//                             showMonthDropdown
//                             dropdownMode="select"
//                             yearDropdownItemNumber={100}
//                             scrollableYearDropdown
//                             className="date-picker-input"
//                             popperPlacement="bottom-start"
//                             popperModifiers={[
//                               {
//                                 name: 'offset',
//                                 options: {
//                                   offset: [0, 8],
//                                 },
//                               },
//                               {
//                                 name: 'preventOverflow',
//                                 options: {
//                                   boundariesElement: 'viewport',
//                                 },
//                               },
//                               {
//                                 name: 'flip',
//                                 options: {
//                                   fallbackPlacements: ['top-start', 'bottom-start'],
//                                 },
//                               },
//                             ]}
//                             onCalendarOpen={() => setOpenDatePicker(`exp-${idx}`)}
//                             onCalendarClose={() => setOpenDatePicker(null)}
//                           />
//                         </div>

//                         {/* Upload / file ref - File Upload Button */}
//                         <div>
//                           <input
//                             ref={(el) => (fileInputRefs.current[idx] = el)}
//                             type="file"
//                             accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                             onChange={handleFileUpload(idx)}
//                             style={{ display: 'none' }}
//                           />
//                           <button
//                             type="button"
//                             className={`file-upload-btn ${row.uploadRef ? 'has-file' : ''}`}
//                             onClick={triggerFileUpload(idx)}
//                             title={row.uploadRef || 'Upload file'}
//                           >
//                             {row.uploadRef ? (
//                               <>
//                                 <span>📎</span>
//                                 <span className="file-name">{row.uploadRef}</span>
//                               </>
//                             ) : (
//                               <>
//                                 <span>📤</span>
//                                 <span>Upload</span>
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       </div>
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






// // src/worker/pages/CertificationEditPage.jsx
// import { useState, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TopNav } from '../../common/components/TopNav'
// import wizardService from '../services/workerWizardService'

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

// function IconArrowLeft(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// export function CertificationEditPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   // Get data from location state or initialize empty
//   const initialData = location?.state?.certData || {
//     certChecklist: {},
//     certRows: [
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//     ],
//     safetyFlags: {},
//   }

//   const [certData, setCertData] = useState(initialData)
//   const [isSaving, setIsSaving] = useState(false)
//   const [uploadingIndex, setUploadingIndex] = useState(null)
//   const [uploadError, setUploadError] = useState('')
//   const [openDatePicker, setOpenDatePicker] = useState(null)
//   const fileInputRefs = useRef({})

//   const handleChange = (field, value) => {
//     setCertData({ ...certData, [field]: value })
//   }

//   const toggleMapValue = (key, setMap) => (e) => {
//     const current = certData[key] || {}
//     setMap({ ...current, [key]: e.target.checked })
//   }

//   const setCertChecklist = (checklist) => handleChange('certChecklist', checklist)
//   const setSafetyFlags = (flags) => handleChange('safetyFlags', flags)

//   const updateCertRow = (index, key) => (value) => {
//     const rows = [...(certData.certRows || [])]
//     rows[index] = { ...rows[index], [key]: value }
//     handleChange('certRows', rows)
//   }

//   // ✅ Handle file upload to S3
//   const handleFileUpload = (index) => async (e) => {
//     const file = e.target.files[0]
//     if (!file) return

//     // Validate file size (max 5MB)
//     if (file.size > 5 * 1024 * 1024) {
//       setUploadError('File size must be less than 5MB')
//       return
//     }

//     // Validate file type
//     const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
//     if (!allowedTypes.includes(file.type)) {
//       setUploadError('Invalid file type. Allowed: PDF, JPEG, PNG, DOC, DOCX')
//       return
//     }

//     setUploadingIndex(index)
//     setUploadError('')

//     try {
//       const userId = localStorage.getItem('userId') || 'temp-user'
      
//       // Step 1: Get presigned URL from backend
//       const result = await wizardService.uploadCertificate(userId, file, index)
      
//       if (result.success) {
//         // Step 2: Upload file to S3
//         const uploadResponse = await fetch(result.uploadUrl, {
//           method: 'PUT',
//           body: file,
//           headers: { 'Content-Type': file.type }
//         })

//         if (!uploadResponse.ok) {
//           throw new Error(`Upload failed: ${uploadResponse.status}`)
//         }

//         // Step 3: Update the row with file info
//         updateCertRow(index, 'uploadRef')(file.name)
//         updateCertRow(index, 'fileKey')(result.fileKey)
//         updateCertRow(index, 'fileUrl')(result.fileUrl)

//         console.log(`✅ Certificate uploaded for row ${index}:`, file.name)
//       }
//     } catch (error) {
//       console.error('Error uploading certificate:', error)
//       setUploadError(error.message || 'Failed to upload file')
//     } finally {
//       setUploadingIndex(null)
//     }
//   }

//   // Trigger file input click
//   const triggerFileUpload = (index) => () => {
//     if (fileInputRefs.current[index]) {
//       fileInputRefs.current[index].click()
//     }
//   }

//   // Handle date change from react-datepicker
//   const handleDateChange = (index, field) => (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       updateCertRow(index, field)(`${month}/${day}/${year}`)
//     } else {
//       updateCertRow(index, field)('')
//     }
//     setOpenDatePicker(null)
//   }

//   // Parse date string to Date object for react-datepicker
//   const parseDate = (dateStr) => {
//     if (!dateStr) return null
//     const parts = dateStr.split('/')
//     if (parts.length === 3) {
//       return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
//     }
//     return null
//   }

//   // ✅ Save to backend
//   const handleSave = async () => {
//     setIsSaving(true)
//     setUploadError('')

//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId) {
//         throw new Error('User ID not found')
//       }

//       // Save certification data to backend (Step 5)
//       await wizardService.saveStep(userId, 5, certData)
//       console.log('✅ Certifications saved to backend')

//       // Navigate back to summary with updated data
//       navigate('/wizard/summary', {
//         state: {
//           ...location?.state?.parentData,
//           certData: certData,
//           updatedCert: true
//         },
//         replace: true
//       })
//     } catch (error) {
//       console.error('Error saving certifications:', error)
//       setUploadError(error.message || 'Failed to save certifications')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // ✅ FIXED: Pass parent data back when cancel/back is clicked
//   const handleBack = () => {
//     navigate('/wizard/summary', {
//       state: location?.state?.parentData || {},
//       replace: true
//     })
//   }

//   // Custom styles for date picker
//   const datePickerStyles = `
//     .cert-date-picker .react-datepicker__input-container input {
//       width: 100%;
//       height: 36px;
//       padding: 0 8px;
//       padding-right: 28px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 6px;
//       font-size: 13px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//       cursor: pointer;
//     }

//     .cert-date-picker .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .cert-date-picker .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .cert-date-picker .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .cert-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//     }

//     .cert-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }

//     .cert-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }

//     .cert-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }

//     .cert-date-picker .react-datepicker__day {
//       width: 32px;
//       height: 32px;
//       line-height: 32px;
//       margin: 2px;
//       border-radius: 8px;
//       font-size: 13px;
//       color: #17263a;
//       transition: all 0.15s ease;
//       cursor: pointer;
//     }

//     .cert-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }

//     .cert-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }

//     .cert-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }

//     .cert-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }

//     .cert-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }

//     .cert-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }

//     .cert-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }

//     .cert-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }

//     .cert-date-picker .react-datepicker__navigation {
//       top: 12px;
//       background: transparent;
//       border: none;
//       cursor: pointer;
//       padding: 0;
//       width: 28px;
//       height: 28px;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       border-radius: 6px;
//       transition: all 0.15s ease;
//     }

//     .cert-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }

//     .cert-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }

//     .cert-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }

//     .cert-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }

//     .cert-date-picker .react-datepicker__input-container {
//       width: 100%;
//     }

//     .cert-date-picker .react-datepicker-wrapper {
//       width: 100%;
//     }

//     .cert-date-picker .react-datepicker__input-container {
//       position: relative;
//     }

//     .cert-date-picker .react-datepicker__input-container::after {
//       content: '📅';
//       position: absolute;
//       right: 8px;
//       top: 50%;
//       transform: translateY(-50%);
//       font-size: 14px;
//       pointer-events: none;
//       opacity: 0.6;
//     }

//     .react-datepicker-popper {
//       z-index: 9999 !important;
//     }
//   `

//   // File upload button styles
//   const fileUploadStyles = `
//     .file-upload-btn {
//       display: inline-flex;
//       align-items: center;
//       gap: 4px;
//       padding: 4px 12px;
//       background: rgba(15, 78, 169, 0.08);
//       color: #0f4ea9;
//       border: 1px solid rgba(15, 78, 169, 0.2);
//       border-radius: 6px;
//       font-size: 12px;
//       font-weight: 500;
//       cursor: pointer;
//       transition: all 0.2s ease;
//       width: 100%;
//       justify-content: center;
//       white-space: nowrap;
//     }

//     .file-upload-btn:hover {
//       background: rgba(15, 78, 169, 0.15);
//       border-color: #0f4ea9;
//     }

//     .file-upload-btn.has-file {
//       background: rgba(47, 180, 99, 0.1);
//       border-color: #2fb463;
//       color: #2fb463;
//     }

//     .file-upload-btn .file-name {
//       max-width: 80px;
//       overflow: hidden;
//       text-overflow: ellipsis;
//       white-space: nowrap;
//     }

//     .file-upload-btn:disabled {
//       opacity: 0.6;
//       cursor: not-allowed;
//     }
//   `

//   const certRows = certData.certRows || [
//     { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//     { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//     { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
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
//           <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }}>
            
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
//                 Edit Certifications & Safety
//               </span>
//             </div>

//             {/* Error Display */}
//             {uploadError && (
//               <div style={{
//                 padding: '12px 16px',
//                 background: '#fee2e2',
//                 color: '#dc2626',
//                 border: '1px solid #fecaca',
//                 borderRadius: '8px',
//                 marginBottom: '16px',
//                 fontSize: '14px'
//               }}>
//                 ❌ {uploadError}
//                 <button
//                   onClick={() => setUploadError('')}
//                   style={{
//                     float: 'right',
//                     background: 'none',
//                     border: 'none',
//                     cursor: 'pointer',
//                     color: '#dc2626',
//                     fontWeight: 'bold'
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>
//             )}

//             {/* Scrollable Content Area */}
//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               paddingBottom: '16px',
//             }}>
//               {/* Certification Form */}
//               <div style={{
//                 background: 'white',
//                 borderRadius: '16px',
//                 padding: '32px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//               }}>
//                 <style>{datePickerStyles}</style>
//                 <style>{fileUploadStyles}</style>
                
//                 {/* Section 1: Certification Checklist */}
//                 <div style={{ marginBottom: '32px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     1. Certification Checklist
//                   </div>
//                   <div style={{ 
//                     display: 'grid', 
//                     gridTemplateColumns: '1fr 1fr 1fr', 
//                     gap: '16px'
//                   }}>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                       {['OSHA 10', 'OSHA 30', 'Scissor lift'].map((k) => (
//                         <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                           <input type="checkbox" checked={!!(certData.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
//                           <span style={{ fontSize: '14px', color: '#17263a' }}>{k}</span>
//                         </label>
//                       ))}
//                     </div>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                       {['Boom / aerial lift', 'Forklift / PIT', 'CPR / First Aid'].map((k) => (
//                         <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                           <input type="checkbox" checked={!!(certData.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
//                           <span style={{ fontSize: '14px', color: '#17263a' }}>{k}</span>
//                         </label>
//                       ))}
//                     </div>
//                     <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                       {['Fall protection', 'HazCom', 'Site-specific orientation'].map((k) => (
//                         <label key={k} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                           <input type="checkbox" checked={!!(certData.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
//                           <span style={{ fontSize: '14px', color: '#17263a' }}>{k}</span>
//                         </label>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Section 2: Verification Data */}
//                 <div style={{ marginBottom: '24px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     2. Verification Data
//                   </div>
                  
//                   {/* Table with fixed column widths */}
//                   <div style={{ 
//                     width: '100%', 
//                     overflowX: 'auto',
//                     position: 'relative'
//                   }}>
//                     {/* Header Row */}
//                     <div style={{ 
//                       display: 'grid', 
//                       gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr',
//                       gap: '8px',
//                       padding: '8px 4px',
//                       borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                       fontWeight: 600,
//                       fontSize: '13px',
//                       color: '#17263a',
//                       minWidth: '700px'
//                     }}>
//                       <div>Certification / card name</div>
//                       <div>Card number / ID</div>
//                       <div>Issue date</div>
//                       <div>Expiration date</div>
//                       <div>Upload / file ref</div>
//                     </div>

//                     {/* Data Rows */}
//                     {certRows.map((row, idx) => (
//                       <div 
//                         key={idx} 
//                         style={{ 
//                           display: 'grid', 
//                           gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr',
//                           gap: '8px',
//                           padding: '6px 4px',
//                           borderBottom: idx < certRows.length - 1 ? '1px solid rgba(18, 38, 63, 0.06)' : 'none',
//                           alignItems: 'center',
//                           minWidth: '700px'
//                         }}
//                       >
//                         {/* Certification / card name */}
//                         <input 
//                           value={row.name} 
//                           onChange={(e) => updateCertRow(idx, 'name')(e.target.value)}
//                           placeholder="e.g. OSHA 10"
//                           style={{
//                             width: '100%',
//                             padding: '6px 10px',
//                             border: '1px solid rgba(18, 38, 63, 0.12)',
//                             borderRadius: '6px',
//                             fontSize: '13px',
//                             outline: 'none',
//                             transition: 'all 0.2s ease',
//                             background: 'white',
//                             color: '#17263a',
//                             boxSizing: 'border-box'
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = '#0f4ea9'
//                             e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                             e.target.style.boxShadow = 'none'
//                           }}
//                         />

//                         {/* Card number / ID */}
//                         <input 
//                           value={row.cardNumber} 
//                           onChange={(e) => updateCertRow(idx, 'cardNumber')(e.target.value)}
//                           placeholder="Card ID"
//                           style={{
//                             width: '100%',
//                             padding: '6px 10px',
//                             border: '1px solid rgba(18, 38, 63, 0.12)',
//                             borderRadius: '6px',
//                             fontSize: '13px',
//                             outline: 'none',
//                             transition: 'all 0.2s ease',
//                             background: 'white',
//                             color: '#17263a',
//                             boxSizing: 'border-box'
//                           }}
//                           onFocus={(e) => {
//                             e.target.style.borderColor = '#0f4ea9'
//                             e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                           }}
//                           onBlur={(e) => {
//                             e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                             e.target.style.boxShadow = 'none'
//                           }}
//                         />

//                         {/* Issue date - Calendar Picker */}
//                         <div className="cert-date-picker" style={{ width: '100%', position: 'relative' }}>
//                           <DatePicker
//                             selected={parseDate(row.issueDate)}
//                             onChange={handleDateChange(idx, 'issueDate')}
//                             dateFormat="MM/dd/yyyy"
//                             placeholderText="MM/DD/YYYY"
//                             maxDate={new Date()}
//                             showYearDropdown
//                             showMonthDropdown
//                             dropdownMode="select"
//                             yearDropdownItemNumber={100}
//                             scrollableYearDropdown
//                             className="date-picker-input"
//                             popperPlacement="bottom-start"
//                             popperModifiers={[
//                               {
//                                 name: 'offset',
//                                 options: {
//                                   offset: [0, 8],
//                                 },
//                               },
//                               {
//                                 name: 'preventOverflow',
//                                 options: {
//                                   boundariesElement: 'viewport',
//                                 },
//                               },
//                               {
//                                 name: 'flip',
//                                 options: {
//                                   fallbackPlacements: ['top-start', 'bottom-start'],
//                                 },
//                               },
//                             ]}
//                             onCalendarOpen={() => setOpenDatePicker(`issue-${idx}`)}
//                             onCalendarClose={() => setOpenDatePicker(null)}
//                           />
//                         </div>

//                         {/* Expiration date - Calendar Picker */}
//                         <div className="cert-date-picker" style={{ width: '100%', position: 'relative' }}>
//                           <DatePicker
//                             selected={parseDate(row.expirationDate)}
//                             onChange={handleDateChange(idx, 'expirationDate')}
//                             dateFormat="MM/dd/yyyy"
//                             placeholderText="MM/DD/YYYY"
//                             showYearDropdown
//                             showMonthDropdown
//                             dropdownMode="select"
//                             yearDropdownItemNumber={100}
//                             scrollableYearDropdown
//                             className="date-picker-input"
//                             popperPlacement="bottom-start"
//                             popperModifiers={[
//                               {
//                                 name: 'offset',
//                                 options: {
//                                   offset: [0, 8],
//                                 },
//                               },
//                               {
//                                 name: 'preventOverflow',
//                                 options: {
//                                   boundariesElement: 'viewport',
//                                 },
//                               },
//                               {
//                                 name: 'flip',
//                                 options: {
//                                   fallbackPlacements: ['top-start', 'bottom-start'],
//                                 },
//                               },
//                             ]}
//                             onCalendarOpen={() => setOpenDatePicker(`exp-${idx}`)}
//                             onCalendarClose={() => setOpenDatePicker(null)}
//                           />
//                         </div>

//                         {/* Upload / file ref - File Upload Button */}
//                         <div>
//                           <input
//                             ref={(el) => (fileInputRefs.current[idx] = el)}
//                             type="file"
//                             accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
//                             onChange={handleFileUpload(idx)}
//                             style={{ display: 'none' }}
//                           />
//                           <button
//                             type="button"
//                             className={`file-upload-btn ${row.uploadRef ? 'has-file' : ''}`}
//                             onClick={triggerFileUpload(idx)}
//                             disabled={uploadingIndex === idx}
//                             title={row.uploadRef || 'Upload file'}
//                           >
//                             {uploadingIndex === idx ? (
//                               <>⏳ Uploading...</>
//                             ) : row.uploadRef ? (
//                               <>
//                                 <span>📎</span>
//                                 <span className="file-name">{row.uploadRef}</span>
//                               </>
//                             ) : (
//                               <>
//                                 <span>📤</span>
//                                 <span>Upload</span>
//                               </>
//                             )}
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Section 3: Safety Flags */}
//                 <div style={{ marginTop: '24px' }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     3. Safety Flags
//                   </div>
//                   <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//                     {['Safety training completed', 'PPE available', 'Site orientation completed'].map((flag) => (
//                       <label key={flag} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                         <input
//                           type="checkbox"
//                           checked={!!(certData.safetyFlags?.[flag] || false)}
//                           onChange={toggleMapValue(flag, setSafetyFlags)}
//                         />
//                         <span style={{ fontSize: '14px', color: '#17263a' }}>{flag}</span>
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









// src/worker/pages/CertificationEditPage.jsx
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import workerService from '../services/workerService'
import wizardService from '../services/workerWizardService'

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

function IconArrowLeft(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function CertificationEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [certData, setCertData] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [uploadingIndex, setUploadingIndex] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const fileInputRefs = useRef({})

  // ============================================================
  // LOAD DATA FROM WORKERS TABLE
  // ============================================================
  
  useEffect(() => {
    const loadCertifications = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setError('User ID not found. Please login again.')
          setLoading(false)
          return
        }

        // If data is in location state, use it
        if (location?.state?.certData) {
          console.log('📋 Using certification data from location state')
          setCertData(location.state.certData)
          setLoading(false)
          return
        }

        // Otherwise fetch from server
        console.log('📊 Fetching certification data from Workers table')
        const profile = await workerService.getWorkerProfile(userId)
        
        if (profile.success && profile.data?.certifications) {
          setCertData(profile.data.certifications)
          console.log('✅ Certification data loaded from Workers table')
        } else {
          // Initialize with empty data
          setCertData({
            certChecklist: {},
            certRows: [
              { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
              { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
              { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
            ],
            safetyFlags: {},
          })
          console.log('📝 Initialized empty certification data')
        }
      } catch (error) {
        console.error('❌ Error loading certifications:', error)
        setError(error.message || 'Failed to load certifications')
      } finally {
        setLoading(false)
      }
    }

    loadCertifications()
  }, [location?.state?.certData])

  // ============================================================
  // HANDLERS
  // ============================================================
  
  const handleChange = (field, value) => {
    setCertData({ ...certData, [field]: value })
  }

  const toggleCertChecklist = (key) => (e) => {
    const current = certData.certChecklist || {}
    setCertData({
      ...certData,
      certChecklist: {
        ...current,
        [key]: e.target.checked,
      },
    })
  }

  const toggleSafetyFlag = (key) => (e) => {
    const current = certData.safetyFlags || {}
    setCertData({
      ...certData,
      safetyFlags: {
        ...current,
        [key]: e.target.checked,
      },
    })
  }

  const updateCertRow = (index, key) => (value) => {
    const rows = [...(certData.certRows || [])]
    if (!rows[index]) {
      rows[index] = { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
    }
    rows[index] = { ...rows[index], [key]: value }
    setCertData({ ...certData, certRows: rows })
  }

  // ============================================================
  // FILE UPLOAD HANDLER
  // ============================================================
  
  const handleFileUpload = (index) => async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB')
      return
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]
    if (!allowedTypes.includes(file.type)) {
      setUploadError('Invalid file type. Allowed: PDF, JPEG, PNG, DOC, DOCX')
      return
    }

    setUploadingIndex(index)
    setUploadError('')

    try {
      const userId = localStorage.getItem('userId')
      if (!userId) throw new Error('User ID not found')

      console.log(`📄 Uploading certificate (row ${index}) for user: ${userId}`)

      // Upload to S3 and save to Workers table
      const result = await wizardService.uploadCertificate(userId, file, index)
      
      if (result.success) {
        // Update the specific row with file info
        const rows = [...(certData.certRows || [])]
        if (!rows[index]) {
          rows[index] = { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' }
        }
        rows[index] = {
          ...rows[index],
          uploadRef: file.name,
          fileKey: result.fileKey,
          fileUrl: result.fileUrl,
          uploadedAt: new Date().toISOString()
        }
        setCertData({ ...certData, certRows: rows })
        setSuccess(`File "${file.name}" uploaded successfully!`)
      }
    } catch (error) {
      console.error('Error uploading certificate:', error)
      setUploadError(error.message || 'Failed to upload file')
    } finally {
      setUploadingIndex(null)
    }
  }

  // Trigger file input click
  const triggerFileUpload = (index) => () => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click()
    }
  }

  // ============================================================
  // DATE HANDLERS
  // ============================================================
  
  const handleDateChange = (index, field) => (date) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      updateCertRow(index, field)(`${month}/${day}/${year}`)
    } else {
      updateCertRow(index, field)('')
    }
  }

  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
    }
    return null
  }

  // ============================================================
  // DELETE CERTIFICATE
  // ============================================================
  
  const handleDeleteCertificate = async (index, fileKey) => {
    if (!fileKey) {
      // Just clear the row if no file
      updateCertRow(index, 'uploadRef')('')
      updateCertRow(index, 'fileKey')('')
      updateCertRow(index, 'fileUrl')('')
      return
    }

    if (!confirm('Are you sure you want to delete this certificate?')) return

    try {
      const userId = localStorage.getItem('userId')
      if (!userId) throw new Error('User ID not found')

      await wizardService.deleteCertificate(userId, index, fileKey)
      
      // Clear the row
      updateCertRow(index, 'uploadRef')('')
      updateCertRow(index, 'fileKey')('')
      updateCertRow(index, 'fileUrl')('')
      
      setSuccess('Certificate deleted successfully!')
    } catch (error) {
      console.error('Error deleting certificate:', error)
      setError(error.message || 'Failed to delete certificate')
    }
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

      console.log('💾 Saving certifications to Workers table')

      // Validate: At least some data should be present
      const hasChecklist = Object.values(certData.certChecklist || {}).some(v => v === true)
      const hasSafetyFlags = Object.values(certData.safetyFlags || {}).some(v => v === true)
      const hasCertRows = (certData.certRows || []).some(row => 
        row.name || row.cardNumber || row.uploadRef
      )

      if (!hasChecklist && !hasSafetyFlags && !hasCertRows) {
        throw new Error('Please add at least one certification, checklist item, or safety flag')
      }

      // Save to Workers table via workerService
      await workerService.updateCertifications(userId, certData)
      
      console.log('✅ Certifications saved to Workers table')
      setSuccess('Certifications saved successfully!')

      // Navigate back to summary with updated data
      setTimeout(() => {
        navigate('/wizard/summary', {
          state: {
            ...location?.state?.parentData,
            certifications: certData,
            updatedCert: true
          },
          replace: true
        })
      }, 500)

    } catch (error) {
      console.error('❌ Error saving certifications:', error)
      setError(error.message || 'Failed to save certifications')
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
  // RENDER HELPERS
  // ============================================================
  
  const certRows = certData.certRows || [
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
  ]

  // ============================================================
  // STYLES
  // ============================================================
  
  const datePickerStyles = `
    .cert-date-picker .react-datepicker__input-container input {
      width: 100%;
      height: 36px;
      padding: 0 8px;
      padding-right: 28px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 6px;
      font-size: 13px;
      outline: none;
      background: white;
      color: #17263a;
      transition: all 0.2s ease;
      font-family: inherit;
      cursor: pointer;
    }

    .cert-date-picker .react-datepicker__input-container input:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .cert-date-picker .react-datepicker__input-container input:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .cert-date-picker .react-datepicker__input-container input::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }

    .cert-date-picker .react-datepicker {
      font-family: inherit;
      border-radius: 12px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
      background: white;
      padding: 8px;
      overflow: hidden;
      font-size: 13px;
    }

    .cert-date-picker .react-datepicker__header {
      background: white;
      border-bottom: 1px solid rgba(18, 38, 63, 0.06);
      padding: 10px 0 6px 0;
      border-radius: 12px 12px 0 0;
    }

    .cert-date-picker .react-datepicker__current-month {
      color: #17263a;
      font-weight: 700;
      font-size: 14px;
      padding-bottom: 4px;
    }

    .cert-date-picker .react-datepicker__day-name {
      color: rgba(23, 38, 58, 0.5);
      font-weight: 600;
      font-size: 11px;
      width: 32px;
      margin: 2px;
    }

    .cert-date-picker .react-datepicker__day {
      width: 32px;
      height: 32px;
      line-height: 32px;
      margin: 2px;
      border-radius: 8px;
      font-size: 13px;
      color: #17263a;
      transition: all 0.15s ease;
      cursor: pointer;
    }

    .cert-date-picker .react-datepicker__day:hover {
      background: rgba(15, 78, 169, 0.08);
      border-radius: 8px;
    }

    .cert-date-picker .react-datepicker__day--selected {
      background: #0f4ea9 !important;
      color: white !important;
      border-radius: 8px;
      font-weight: 600;
    }

    .cert-date-picker .react-datepicker__day--selected:hover {
      background: #0b3f90 !important;
    }

    .cert-date-picker .react-datepicker__day--keyboard-selected {
      background: rgba(15, 78, 169, 0.15);
      border-radius: 8px;
    }

    .cert-date-picker .react-datepicker__day--today {
      font-weight: 700;
      color: #0f4ea9;
    }

    .cert-date-picker .react-datepicker__day--today::after {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: #0f4ea9;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: -2px;
    }

    .cert-date-picker .react-datepicker__day--disabled {
      color: rgba(23, 38, 58, 0.2);
      cursor: not-allowed;
    }

    .cert-date-picker .react-datepicker__day--disabled:hover {
      background: transparent;
    }

    .cert-date-picker .react-datepicker__navigation {
      top: 12px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .cert-date-picker .react-datepicker__navigation:hover {
      background: rgba(15, 78, 169, 0.08);
    }

    .cert-date-picker .react-datepicker__navigation-icon::before {
      border-color: #17263a;
      border-width: 2px 2px 0 0;
      height: 7px;
      width: 7px;
    }

    .cert-date-picker .react-datepicker__day--weekend {
      color: #e11d48;
    }

    .cert-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
      color: white;
    }

    .cert-date-picker .react-datepicker__input-container {
      width: 100%;
    }

    .cert-date-picker .react-datepicker-wrapper {
      width: 100%;
    }

    .cert-date-picker .react-datepicker__input-container {
      position: relative;
    }

    .cert-date-picker .react-datepicker__input-container::after {
      content: '📅';
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      pointer-events: none;
      opacity: 0.6;
    }

    .react-datepicker-popper {
      z-index: 9999 !important;
    }
  `

  const fileUploadStyles = `
    .file-upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      background: rgba(15, 78, 169, 0.08);
      color: #0f4ea9;
      border: 1px solid rgba(15, 78, 169, 0.2);
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 100%;
      justify-content: center;
      white-space: nowrap;
    }

    .file-upload-btn:hover {
      background: rgba(15, 78, 169, 0.15);
      border-color: #0f4ea9;
    }

    .file-upload-btn.has-file {
      background: rgba(47, 180, 99, 0.1);
      border-color: #2fb463;
      color: #2fb463;
    }

    .file-upload-btn .file-name {
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .file-upload-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .file-upload-btn .delete-btn {
      margin-left: 4px;
      color: #dc2626;
      background: none;
      border: none;
      cursor: pointer;
      font-size: 14px;
      padding: 0 4px;
    }

    .file-upload-btn .delete-btn:hover {
      color: #b91c1c;
    }
  `

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
          <p style={{ color: '#17263a' }}>Loading certifications...</p>
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
                Edit Certifications & Safety
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

            {uploadError && (
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
                <span>❌ {uploadError}</span>
                <button
                  onClick={() => setUploadError('')}
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
              <style>{datePickerStyles}</style>
              <style>{fileUploadStyles}</style>
              
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(18, 38, 63, 0.08)',
              }}>
                
                {/* ============================================================
                SECTION 1: CERTIFICATION CHECKLIST
                ============================================================ */}
                <div style={{ marginBottom: '32px' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                  }}>
                    1. Certification Checklist
                  </div>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr 1fr', 
                    gap: '8px'
                  }}>
                    {[
                      'OSHA 10',
                      'OSHA 30',
                      'Scissor lift',
                      'Boom / aerial lift',
                      'Forklift / PIT',
                      'CPR / First Aid',
                      'Fall protection',
                      'HazCom',
                      'Site-specific orientation'
                    ].map((cert) => (
                      <label key={cert} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(15, 78, 169, 0.03)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                      >
                        <input
                          type="checkbox"
                          checked={!!(certData.certChecklist?.[cert] || false)}
                          onChange={toggleCertChecklist(cert)}
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            accentColor: '#0f4ea9',
                          }}
                        />
                        <span style={{ fontSize: '14px', color: '#17263a' }}>{cert}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* ============================================================
                SECTION 2: VERIFICATION DATA
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
                    2. Verification Data
                  </div>
                  
                  <div style={{ 
                    width: '100%', 
                    overflowX: 'auto',
                    position: 'relative'
                  }}>
                    {/* Header Row */}
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr',
                      gap: '8px',
                      padding: '8px 4px',
                      borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                      fontWeight: 600,
                      fontSize: '12px',
                      color: 'rgba(23, 38, 58, 0.6)',
                      minWidth: '700px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.3px',
                    }}>
                      <div>Certification / card name</div>
                      <div>Card number / ID</div>
                      <div>Issue date</div>
                      <div>Expiration date</div>
                      <div>Upload / file ref</div>
                    </div>

                    {/* Data Rows */}
                    {certRows.map((row, idx) => (
                      <div 
                        key={idx} 
                        style={{ 
                          display: 'grid', 
                          gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr',
                          gap: '8px',
                          padding: '6px 4px',
                          borderBottom: idx < certRows.length - 1 ? '1px solid rgba(18, 38, 63, 0.06)' : 'none',
                          alignItems: 'center',
                          minWidth: '700px'
                        }}
                      >
                        {/* Certification / card name */}
                        <input 
                          value={row.name || ''} 
                          onChange={(e) => updateCertRow(idx, 'name')(e.target.value)}
                          placeholder="e.g. OSHA 10"
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            border: '1px solid rgba(18, 38, 63, 0.12)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            background: 'white',
                            color: '#17263a',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0f4ea9'
                            e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
                            e.target.style.boxShadow = 'none'
                          }}
                        />

                        {/* Card number / ID */}
                        <input 
                          value={row.cardNumber || ''} 
                          onChange={(e) => updateCertRow(idx, 'cardNumber')(e.target.value)}
                          placeholder="Card ID"
                          style={{
                            width: '100%',
                            padding: '6px 10px',
                            border: '1px solid rgba(18, 38, 63, 0.12)',
                            borderRadius: '6px',
                            fontSize: '13px',
                            outline: 'none',
                            transition: 'all 0.2s ease',
                            background: 'white',
                            color: '#17263a',
                            boxSizing: 'border-box'
                          }}
                          onFocus={(e) => {
                            e.target.style.borderColor = '#0f4ea9'
                            e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
                          }}
                          onBlur={(e) => {
                            e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
                            e.target.style.boxShadow = 'none'
                          }}
                        />

                        {/* Issue date - Calendar Picker */}
                        <div className="cert-date-picker" style={{ width: '100%', position: 'relative' }}>
                          <DatePicker
                            selected={parseDate(row.issueDate)}
                            onChange={handleDateChange(idx, 'issueDate')}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="MM/DD/YYYY"
                            maxDate={new Date()}
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            yearDropdownItemNumber={100}
                            scrollableYearDropdown
                            popperPlacement="bottom-start"
                          />
                        </div>

                        {/* Expiration date - Calendar Picker */}
                        <div className="cert-date-picker" style={{ width: '100%', position: 'relative' }}>
                          <DatePicker
                            selected={parseDate(row.expirationDate)}
                            onChange={handleDateChange(idx, 'expirationDate')}
                            dateFormat="MM/dd/yyyy"
                            placeholderText="MM/DD/YYYY"
                            showYearDropdown
                            showMonthDropdown
                            dropdownMode="select"
                            yearDropdownItemNumber={100}
                            scrollableYearDropdown
                            popperPlacement="bottom-start"
                          />
                        </div>

                        {/* Upload / file ref - File Upload Button */}
                        <div>
                          <input
                            ref={(el) => (fileInputRefs.current[idx] = el)}
                            type="file"
                            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                            onChange={handleFileUpload(idx)}
                            style={{ display: 'none' }}
                          />
                          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                            <button
                              type="button"
                              className={`file-upload-btn ${row.uploadRef ? 'has-file' : ''}`}
                              onClick={triggerFileUpload(idx)}
                              disabled={uploadingIndex === idx}
                              title={row.uploadRef || 'Upload file'}
                              style={{ flex: 1 }}
                            >
                              {uploadingIndex === idx ? (
                                <>⏳ Uploading...</>
                              ) : row.uploadRef ? (
                                <>
                                  <span>📎</span>
                                  <span className="file-name">{row.uploadRef}</span>
                                </>
                              ) : (
                                <>
                                  <span>📤</span>
                                  <span>Upload</span>
                                </>
                              )}
                            </button>
                            {row.uploadRef && (
                              <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDeleteCertificate(idx, row.fileKey)}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  cursor: 'pointer',
                                  color: '#dc2626',
                                  fontSize: '16px',
                                  padding: '4px 6px',
                                  borderRadius: '4px',
                                  transition: 'background 0.2s',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)'
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent'
                                }}
                                title="Delete file"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ============================================================
                SECTION 3: SAFETY FLAGS
                ============================================================ */}
                <div style={{ marginTop: '24px' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                  }}>
                    3. Safety Flags
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gap: '20px', 
                    flexWrap: 'wrap',
                    padding: '12px',
                    background: 'rgba(15, 78, 169, 0.02)',
                    borderRadius: '12px',
                    border: '1px solid rgba(15, 78, 169, 0.06)',
                  }}>
                    {['Safety training completed', 'PPE available', 'Site orientation completed'].map((flag) => (
                      <label key={flag} style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '6px',
                        transition: 'background 0.15s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(15, 78, 169, 0.03)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                      >
                        <input
                          type="checkbox"
                          checked={!!(certData.safetyFlags?.[flag] || false)}
                          onChange={toggleSafetyFlag(flag)}
                          style={{
                            width: '18px',
                            height: '18px',
                            cursor: 'pointer',
                            accentColor: '#0f4ea9',
                          }}
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

export default CertificationEditPage