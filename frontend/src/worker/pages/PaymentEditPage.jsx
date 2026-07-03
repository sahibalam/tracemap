// // src/worker/pages/PaymentEditPage.jsx
// import { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'
// import { TextField } from '../../common/components/TextField'
// import { IconUser, IconSupport, IconLocation } from '../../common/components/Icons'

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

// function IconBank(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M4 10h16v2H4V10zm0 4h16v2H4v-2zm0-8h16v2H4V6zm0 12h16v2H4v-2zM2 20h20v2H2v-2z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconCreditCard(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm0-4h2v2h-2v-2z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconMobile(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconEmail(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
//     </svg>
//   )
// }

// export function PaymentEditPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   // Get data from location state or initialize empty
//   const initialData = location?.state?.paymentData || {
//     fullName: '',
//     bankAccountNumber: '',
//     routingNumber: '',
//     accountType: '',
//     bankName: '',
//     emailId: '',
//     mobileNumber: '',
//   }

//   const [paymentData, setPaymentData] = useState(initialData)
//   const [isSaving, setIsSaving] = useState(false)

//   const handleChange = (field, value) => {
//     setPaymentData({ ...paymentData, [field]: value })
//   }

//   const handleSave = () => {
//     setIsSaving(true)
//     // Simulate save delay
//     setTimeout(() => {
//       // Navigate back to summary with updated data
//       navigate('/wizard/summary', { 
//         state: { 
//           ...location?.state?.parentData,
//           paymentData: paymentData,
//           updatedPayment: true 
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
//                 Payment & Bank Details
//               </span>
//             </div>

//             {/* Scrollable Content Area */}
//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               paddingBottom: '16px',
//             }}>
//               {/* Payment Form */}
//               <div style={{
//                 background: 'white',
//                 borderRadius: '16px',
//                 padding: '32px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//               }}>
//                 {/* Full Name - Full width */}
//                 <div style={{ marginBottom: '20px' }}>
//                   <label style={{
//                     display: 'block',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '6px',
//                   }}>
//                     Full Name
//                   </label>
//                   <TextField
//                     placeholder="Enter full name"
//                     icon={<IconUserIcon />}
//                     value={paymentData.fullName || ''}
//                     onChange={(v) => handleChange('fullName', v)}
//                   />
//                 </div>

//                 {/* Bank Account Number & Routing Number - Side by side */}
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
//                   <div>
//                     <label style={{
//                       display: 'block',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#17263a',
//                       marginBottom: '6px',
//                     }}>
//                       Bank Account Number
//                     </label>
//                     <TextField
//                       placeholder="Enter account number"
//                       icon={<IconBank />}
//                       value={paymentData.bankAccountNumber || ''}
//                       onChange={(v) => handleChange('bankAccountNumber', v)}
//                     />
//                   </div>
//                   <div>
//                     <label style={{
//                       display: 'block',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#17263a',
//                       marginBottom: '6px',
//                     }}>
//                       Routing Number
//                     </label>
//                     <TextField
//                       placeholder="Enter routing number"
//                       icon={<IconCreditCard />}
//                       value={paymentData.routingNumber || ''}
//                       onChange={(v) => handleChange('routingNumber', v)}
//                     />
//                     <div style={{
//                       fontSize: '11px',
//                       color: 'rgba(23, 38, 58, 0.5)',
//                       marginTop: '4px',
//                     }}>
//                       (ABA Routing Number)
//                     </div>
//                   </div>
//                 </div>

//                 {/* Account Type & Bank Name - Side by side */}
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
//                   <div>
//                     <label style={{
//                       display: 'block',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#17263a',
//                       marginBottom: '6px',
//                     }}>
//                       Account Type
//                     </label>
//                     <select
//                       value={paymentData.accountType || ''}
//                       onChange={(e) => handleChange('accountType', e.target.value)}
//                       style={{
//                         width: '100%',
//                         height: '48px',
//                         padding: '0 16px',
//                         border: '1px solid rgba(18, 38, 63, 0.12)',
//                         borderRadius: '12px',
//                         fontSize: '14px',
//                         outline: 'none',
//                         background: 'white',
//                         color: paymentData.accountType ? '#17263a' : '#6b7280',
//                         transition: 'all 0.2s ease',
//                         fontFamily: 'inherit',
//                       }}
//                       onFocus={(e) => {
//                         e.target.style.borderColor = '#0f4ea9'
//                         e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                       }}
//                       onBlur={(e) => {
//                         e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                         e.target.style.boxShadow = 'none'
//                       }}
//                     >
//                       <option value="">Select account type</option>
//                       <option value="checking">Checking</option>
//                       <option value="savings">Savings</option>
//                       <option value="business">Business</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label style={{
//                       display: 'block',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#17263a',
//                       marginBottom: '6px',
//                     }}>
//                       Bank Name
//                     </label>
//                     <TextField
//                       placeholder="Enter bank name"
//                       icon={<IconBank />}
//                       value={paymentData.bankName || ''}
//                       onChange={(v) => handleChange('bankName', v)}
//                     />
//                   </div>
//                 </div>

//                 {/* Email ID & Mobile Number - Side by side */}
//                 <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
//                   <div>
//                     <label style={{
//                       display: 'block',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#17263a',
//                       marginBottom: '6px',
//                     }}>
//                       Email ID
//                     </label>
//                     <TextField
//                       placeholder="Enter email address"
//                       icon={<IconEmail />}
//                       value={paymentData.emailId || ''}
//                       onChange={(v) => handleChange('emailId', v)}
//                     />
//                   </div>
//                   <div>
//                     <label style={{
//                       display: 'block',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#17263a',
//                       marginBottom: '6px',
//                     }}>
//                       Mobile Number
//                     </label>
//                     <TextField
//                       placeholder="Enter mobile number"
//                       icon={<IconMobile />}
//                       value={paymentData.mobileNumber || ''}
//                       onChange={(v) => handleChange('mobileNumber', v)}
//                     />
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





// src/worker/pages/PaymentEditPage.jsx
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

function IconArrowLeft(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconBank(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 10h16v2H4V10zm0 4h16v2H4v-2zm0-8h16v2H4V6zm0 12h16v2H4v-2zM2 20h20v2H2v-2z" fill="currentColor" />
    </svg>
  )
}

function IconCreditCard(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6v-2zm0 4h8v2H6v-2zm10 0h2v2h-2v-2zm0-4h2v2h-2v-2z" fill="currentColor" />
    </svg>
  )
}

function IconMobile(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z" fill="currentColor" />
    </svg>
  )
}

function IconEmail(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill="currentColor" />
    </svg>
  )
}

function IconLock(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill="currentColor" />
    </svg>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function PaymentEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [paymentData, setPaymentData] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // ============================================================
  // LOAD DATA FROM WORKERS TABLE
  // ============================================================
  
  useEffect(() => {
    const loadPaymentData = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setError('User ID not found. Please login again.')
          setLoading(false)
          return
        }

        // If data is in location state, use it
        if (location?.state?.paymentData) {
          console.log('📋 Using payment data from location state')
          setPaymentData(location.state.paymentData)
          setLoading(false)
          return
        }

        // Otherwise fetch from server
        console.log('📊 Fetching payment data from Workers table')
        const profile = await workerService.getWorkerProfile(userId)
        
        if (profile.success && profile.data?.payment) {
          setPaymentData(profile.data.payment)
          console.log('✅ Payment data loaded from Workers table')
        } else {
          // Initialize with empty data
          setPaymentData({
            fullName: '',
            bankAccountNumber: '',
            routingNumber: '',
            accountType: '',
            bankName: '',
            emailId: '',
            mobileNumber: '',
            achEnabled: false,
          })
          console.log('📝 Initialized empty payment data')
        }
      } catch (error) {
        console.error('❌ Error loading payment data:', error)
        setError(error.message || 'Failed to load payment data')
      } finally {
        setLoading(false)
      }
    }

    loadPaymentData()
  }, [location?.state?.paymentData])

  // ============================================================
  // HANDLERS
  // ============================================================
  
  const handleChange = (field, value) => {
    setPaymentData({ ...paymentData, [field]: value })
  }

  const handleCheckboxChange = (field) => (e) => {
    setPaymentData({ ...paymentData, [field]: e.target.checked })
  }

  // ============================================================
  // VALIDATION
  // ============================================================
  
  const validateForm = () => {
    const errors = []

    if (!paymentData.fullName || paymentData.fullName.trim() === '') {
      errors.push('Full name is required')
    }

    if (!paymentData.bankAccountNumber || paymentData.bankAccountNumber.trim() === '') {
      errors.push('Bank account number is required')
    }

    if (!paymentData.routingNumber || paymentData.routingNumber.trim() === '') {
      errors.push('Routing number is required')
    }

    if (paymentData.routingNumber && paymentData.routingNumber.length !== 9) {
      errors.push('Routing number must be 9 digits')
    }

    if (!paymentData.accountType) {
      errors.push('Account type is required')
    }

    if (!paymentData.bankName || paymentData.bankName.trim() === '') {
      errors.push('Bank name is required')
    }

    if (paymentData.emailId && !isValidEmail(paymentData.emailId)) {
      errors.push('Please enter a valid email address')
    }

    if (paymentData.mobileNumber && !isValidPhone(paymentData.mobileNumber)) {
      errors.push('Please enter a valid mobile number')
    }

    return errors
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const isValidPhone = (phone) => {
    const digits = phone.replace(/\D/g, '')
    return digits.length === 10
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

      // Validate form
      const validationErrors = validateForm()
      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join('. '))
      }

      console.log('💾 Saving payment details to Workers table')

      // Save to Workers table via workerService
      await workerService.updatePayment(userId, paymentData)
      
      console.log('✅ Payment details saved to Workers table')
      setSuccess('Payment details saved successfully!')

      // Navigate back to summary with updated data
      setTimeout(() => {
        navigate('/wizard/summary', { 
          state: { 
            ...location?.state?.parentData,
            payment: paymentData,
            updatedPayment: true 
          },
          replace: true 
        })
      }, 500)

    } catch (error) {
      console.error('❌ Error saving payment:', error)
      setError(error.message || 'Failed to save payment details')
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
          <p style={{ color: '#17263a' }}>Loading payment details...</p>
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
                Payment & Bank Details
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
                FULL NAME
                ============================================================ */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '6px',
                  }}>
                    Full Name <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <TextField
                    placeholder="Enter full name as per bank account"
                    icon={<IconUserIcon />}
                    value={paymentData.fullName || ''}
                    onChange={(v) => handleChange('fullName', v)}
                  />
                  <div style={{
                    fontSize: '11px',
                    color: 'rgba(23, 38, 58, 0.5)',
                    marginTop: '4px',
                  }}>
                    Name should match your bank account exactly
                  </div>
                </div>

                {/* ============================================================
                BANK ACCOUNT NUMBER & ROUTING NUMBER
                ============================================================ */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '6px',
                    }}>
                      Bank Account Number <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <TextField
                      placeholder="Enter account number"
                      icon={<IconBank />}
                      value={paymentData.bankAccountNumber || ''}
                      onChange={(v) => handleChange('bankAccountNumber', v)}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '6px',
                    }}>
                      Routing Number <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <TextField
                      placeholder="Enter 9-digit routing number"
                      icon={<IconCreditCard />}
                      value={paymentData.routingNumber || ''}
                      onChange={(v) => handleChange('routingNumber', v)}
                      maxLength={9}
                    />
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(23, 38, 58, 0.5)',
                      marginTop: '4px',
                    }}>
                      (ABA Routing Number - 9 digits)
                    </div>
                  </div>
                </div>

                {/* ============================================================
                ACCOUNT TYPE & BANK NAME
                ============================================================ */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '6px',
                    }}>
                      Account Type <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <select
                      value={paymentData.accountType || ''}
                      onChange={(e) => handleChange('accountType', e.target.value)}
                      style={{
                        width: '100%',
                        height: '48px',
                        padding: '0 16px',
                        border: '1px solid rgba(18, 38, 63, 0.12)',
                        borderRadius: '12px',
                        fontSize: '14px',
                        outline: 'none',
                        background: 'white',
                        color: paymentData.accountType ? '#17263a' : '#6b7280',
                        transition: 'all 0.2s ease',
                        fontFamily: 'inherit',
                        cursor: 'pointer',
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
                      <option value="">Select account type</option>
                      <option value="checking">Checking</option>
                      <option value="savings">Savings</option>
                      <option value="business">Business</option>
                    </select>
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '6px',
                    }}>
                      Bank Name <span style={{ color: '#dc2626' }}>*</span>
                    </label>
                    <TextField
                      placeholder="Enter bank name"
                      icon={<IconBank />}
                      value={paymentData.bankName || ''}
                      onChange={(v) => handleChange('bankName', v)}
                    />
                  </div>
                </div>

                {/* ============================================================
                EMAIL ID & MOBILE NUMBER
                ============================================================ */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '6px',
                    }}>
                      Email ID
                    </label>
                    <TextField
                      placeholder="Enter email address"
                      icon={<IconEmail />}
                      value={paymentData.emailId || ''}
                      onChange={(v) => handleChange('emailId', v)}
                      type="email"
                    />
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(23, 38, 58, 0.5)',
                      marginTop: '4px',
                    }}>
                      For payment notifications and receipts
                    </div>
                  </div>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '6px',
                    }}>
                      Mobile Number
                    </label>
                    <TextField
                      placeholder="Enter mobile number"
                      icon={<IconMobile />}
                      value={paymentData.mobileNumber || ''}
                      onChange={(v) => handleChange('mobileNumber', v)}
                      maxLength={12}
                    />
                    <div style={{
                      fontSize: '11px',
                      color: 'rgba(23, 38, 58, 0.5)',
                      marginTop: '4px',
                    }}>
                      For SMS alerts and verification
                    </div>
                  </div>
                </div>

                {/* ============================================================
                ACH ENABLED - Checkbox
                ============================================================ */}
                <div style={{ 
                  marginTop: '16px',
                  padding: '16px 20px',
                  background: 'rgba(15, 78, 169, 0.03)',
                  borderRadius: '12px',
                  border: '1px solid rgba(15, 78, 169, 0.08)',
                }}>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px', 
                    cursor: 'pointer',
                    fontWeight: 500,
                    fontSize: '14px',
                    color: '#17263a'
                  }}>
                    <input
                      type="checkbox"
                      checked={paymentData.achEnabled || false}
                      onChange={handleCheckboxChange('achEnabled')}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#0f4ea9',
                      }}
                    />
                    <span>Enable ACH payments</span>
                    <span style={{
                      fontSize: '12px',
                      fontWeight: 400,
                      color: 'rgba(23, 38, 58, 0.5)',
                      marginLeft: '4px'
                    }}>
                      (Automated Clearing House - Direct deposit)
                    </span>
                  </label>
                  <div style={{
                    fontSize: '12px',
                    color: 'rgba(23, 38, 58, 0.5)',
                    marginTop: '8px',
                    paddingLeft: '30px',
                  }}>
                    Enable this to receive payments directly to your bank account via ACH transfer
                  </div>
                </div>

                {/* ============================================================
                SECURITY NOTE
                ============================================================ */}
                <div style={{
                  marginTop: '20px',
                  padding: '12px 16px',
                  background: 'rgba(251, 191, 36, 0.08)',
                  border: '1px solid rgba(251, 191, 36, 0.2)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}>
                  <IconLock style={{ 
                    width: '18px', 
                    height: '18px', 
                    color: '#f59e0b',
                    flexShrink: 0,
                    marginTop: '1px'
                  }} />
                  <div>
                    <div style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '2px',
                    }}>
                      Your information is secure
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(23, 38, 58, 0.6)',
                    }}>
                      All bank details are encrypted and stored securely. We never share your financial information with third parties.
                    </div>
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

export default PaymentEditPage