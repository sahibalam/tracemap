// // src/worker/pages/MedicalEditPage.jsx
// import { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
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

// export function MedicalEditPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   // Get data from location state or initialize empty
//   const initialData = location?.state?.medicalData || {
//     bloodGroup: '',
//     emergencyMedicalInfo: 'none',
//     emergencyMedicalFlags: {},
//     emergencyInstructions: '',
//   }

//   const [medicalData, setMedicalData] = useState(initialData)
//   const [isSaving, setIsSaving] = useState(false)

//   const handleChange = (field, value) => {
//     setMedicalData({ ...medicalData, [field]: value })
//   }

//   const toggleFlag = (key) => {
//     const current = medicalData.emergencyMedicalFlags || {}
//     setMedicalData({
//       ...medicalData,
//       emergencyMedicalFlags: {
//         ...current,
//         [key]: !current[key],
//       },
//     })
//   }

//   const handleSave = () => {
//     setIsSaving(true)
//     // Simulate save delay
//     setTimeout(() => {
//       // Navigate back to summary with updated data
//       navigate('/wizard/summary', { 
//         state: { 
//           ...location?.state?.parentData,
//           medicalData: medicalData,
//           updatedMedical: true 
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
//                 Edit Medical Details
//               </span>
//             </div>

//             {/* Scrollable Content Area */}
//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               paddingBottom: '16px',
//             }}>
//               {/* Medical Form */}
//               <div style={{
//                 background: 'white',
//                 borderRadius: '16px',
//                 padding: '32px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//               }}>
//                 {/* Blood Group */}
//                 <div style={{ marginBottom: '24px' }}>
//                   <label style={{
//                     display: 'block',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '8px',
//                   }}>
//                     Blood Group
//                   </label>
//                   <select
//                     value={medicalData.bloodGroup}
//                     onChange={(e) => handleChange('bloodGroup', e.target.value)}
//                     style={{
//                       width: '100%',
//                       height: '48px',
//                       padding: '0 16px',
//                       border: '1px solid rgba(18, 38, 63, 0.12)',
//                       borderRadius: '12px',
//                       fontSize: '14px',
//                       outline: 'none',
//                       background: 'white',
//                       color: '#17263a',
//                       transition: 'all 0.2s ease',
//                       fontFamily: 'inherit',
//                     }}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = '#0f4ea9'
//                       e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                       e.target.style.boxShadow = 'none'
//                     }}
//                   >
//                     <option value="">Select blood group</option>
//                     {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
//                       <option key={bg} value={bg}>{bg}</option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Emergency Medical Info Radio */}
//                 <div style={{ marginBottom: '24px' }}>
//                   <div style={{
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '12px',
//                   }}>
//                     Do you have emergency medical information first aid personnel or emergency responders should know?
//                   </div>

//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//                     <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                       <input
//                         type="radio"
//                         name="emergencyMedicalInfo"
//                         checked={medicalData.emergencyMedicalInfo === 'none'}
//                         onChange={() => handleChange('emergencyMedicalInfo', 'none')}
//                       />
//                       <span style={{ fontSize: '14px', color: '#17263a' }}>No emergency medical information</span>
//                     </label>
//                     <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                       <input
//                         type="radio"
//                         name="emergencyMedicalInfo"
//                         checked={medicalData.emergencyMedicalInfo === 'disclosure'}
//                         onChange={() => handleChange('emergencyMedicalInfo', 'disclosure')}
//                       />
//                       <span style={{ fontSize: '14px', color: '#17263a' }}>Yes, voluntary disclosure</span>
//                     </label>
//                     <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                       <input
//                         type="radio"
//                         name="emergencyMedicalInfo"
//                         checked={medicalData.emergencyMedicalInfo === 'skip'}
//                         onChange={() => handleChange('emergencyMedicalInfo', 'skip')}
//                       />
//                       <span style={{ fontSize: '14px', color: '#17263a' }}>Skip for now</span>
//                     </label>
//                   </div>
//                 </div>

//                 {/* Emergency Medical Flags - Only show when disclosure is selected */}
//                 {medicalData.emergencyMedicalInfo === 'disclosure' && (
//                   <div style={{ marginBottom: '24px' }}>
//                     <div style={{
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#17263a',
//                       marginBottom: '12px',
//                     }}>
//                       Medical Conditions
//                     </div>
//                     <div style={{
//                       display: 'grid',
//                       gridTemplateColumns: '1fr 1fr',
//                       gap: '8px',
//                     }}>
//                       {[
//                         'Severe allergy',
//                         'Diabetes / blood sugar risk',
//                         'Heart condition / device',
//                         'Mobility / communication limitation',
//                         'Asthma / respiratory risk',
//                         'Seizure condition',
//                         'Bleeding risk',
//                         'Emergency medication/device carried',
//                       ].map((condition) => (
//                         <label key={condition} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                           <input
//                             type="checkbox"
//                             checked={!!(medicalData.emergencyMedicalFlags?.[condition] || false)}
//                             onChange={() => toggleFlag(condition)}
//                           />
//                           <span style={{ fontSize: '14px', color: '#17263a' }}>{condition}</span>
//                         </label>
//                       ))}
//                     </div>

//                     {/* Emergency Instructions */}
//                     <div style={{ marginTop: '16px' }}>
//                       <label style={{
//                         display: 'block',
//                         fontSize: '14px',
//                         fontWeight: 600,
//                         color: '#17263a',
//                         marginBottom: '6px',
//                       }}>
//                         Important Emergency Instructions
//                       </label>
//                       <div style={{
//                         fontSize: '12px',
//                         color: 'rgba(23, 38, 58, 0.6)',
//                         marginBottom: '8px',
//                       }}>
//                         Do not include genetic or highly sensitive medical details.
//                       </div>
//                       <textarea
//                         value={medicalData.emergencyInstructions || ''}
//                         onChange={(e) => handleChange('emergencyInstructions', e.target.value)}
//                         placeholder="Enter instructions (max 1000 characters)"
//                         maxLength={1000}
//                         rows={4}
//                         style={{
//                           width: '100%',
//                           padding: '12px 16px',
//                           border: '1px solid rgba(18, 38, 63, 0.12)',
//                           borderRadius: '12px',
//                           fontSize: '14px',
//                           fontFamily: 'inherit',
//                           outline: 'none',
//                           resize: 'vertical',
//                           transition: 'all 0.2s ease',
//                         }}
//                         onFocus={(e) => {
//                           e.target.style.borderColor = '#0f4ea9'
//                           e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                         }}
//                         onBlur={(e) => {
//                           e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                           e.target.style.boxShadow = 'none'
//                         }}
//                       />
//                       <div style={{
//                         fontSize: '12px',
//                         color: 'rgba(23, 38, 58, 0.4)',
//                         textAlign: 'right',
//                         marginTop: '4px',
//                       }}>
//                         {medicalData.emergencyInstructions?.length || 0}/1000
//                       </div>
//                     </div>
//                   </div>
//                 )}
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





// src/worker/pages/MedicalEditPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import workerService from '../services/workerService'

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

function IconArrowLeft(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconHeart(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
    </svg>
  )
}

function IconAlert(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor" />
    </svg>
  )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function MedicalEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [medicalData, setMedicalData] = useState({})
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // ============================================================
  // LOAD DATA FROM WORKERS TABLE
  // ============================================================
  
  useEffect(() => {
    const loadMedicalData = async () => {
      try {
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setError('User ID not found. Please login again.')
          setLoading(false)
          return
        }

        // If data is in location state, use it
        if (location?.state?.medicalData) {
          console.log('📋 Using medical data from location state')
          setMedicalData(location.state.medicalData)
          setLoading(false)
          return
        }

        // Otherwise fetch from server
        console.log('📊 Fetching medical data from Workers table')
        const profile = await workerService.getWorkerProfile(userId)
        
        if (profile.success && profile.data?.medical) {
          setMedicalData(profile.data.medical)
          console.log('✅ Medical data loaded from Workers table')
        } else {
          // Initialize with empty data
          setMedicalData({
            bloodGroup: '',
            emergencyMedicalInfo: 'none', // 'none', 'disclosure', 'skip'
            emergencyMedicalFlags: {},
            emergencyInstructions: '',
          })
          console.log('📝 Initialized empty medical data')
        }
      } catch (error) {
        console.error('❌ Error loading medical data:', error)
        setError(error.message || 'Failed to load medical data')
      } finally {
        setLoading(false)
      }
    }

    loadMedicalData()
  }, [location?.state?.medicalData])

  // ============================================================
  // HANDLERS
  // ============================================================
  
  const handleChange = (field, value) => {
    setMedicalData({ ...medicalData, [field]: value })
  }

  const toggleFlag = (key) => {
    const current = medicalData.emergencyMedicalFlags || {}
    setMedicalData({
      ...medicalData,
      emergencyMedicalFlags: {
        ...current,
        [key]: !current[key],
      },
    })
  }

  // ============================================================
  // VALIDATION
  // ============================================================
  
  const validateForm = () => {
    const errors = []

    if (!medicalData.bloodGroup) {
      errors.push('Blood group is required')
    }

    if (medicalData.emergencyMedicalInfo === 'disclosure') {
      // Check if at least one flag is selected
      const flags = medicalData.emergencyMedicalFlags || {}
      const hasFlag = Object.values(flags).some(value => value === true)
      if (!hasFlag) {
        errors.push('Please select at least one medical condition')
      }

      if (medicalData.emergencyInstructions && medicalData.emergencyInstructions.length > 1000) {
        errors.push('Emergency instructions must be less than 1000 characters')
      }
    }

    return errors
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

      console.log('💾 Saving medical details to Workers table')

      // Save to Workers table via workerService
      await workerService.updateMedical(userId, medicalData)
      
      console.log('✅ Medical details saved to Workers table')
      setSuccess('Medical details saved successfully!')

      // Navigate back to summary with updated data
      setTimeout(() => {
        navigate('/wizard/summary', { 
          state: { 
            ...location?.state?.parentData,
            medical: medicalData,
            updatedMedical: true 
          },
          replace: true 
        })
      }, 500)

    } catch (error) {
      console.error('❌ Error saving medical:', error)
      setError(error.message || 'Failed to save medical details')
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
  
  const getBloodGroupColor = (bloodGroup) => {
    if (!bloodGroup) return 'rgba(23, 38, 58, 0.5)'
    const colors = {
      'A+': '#0f4ea9',
      'A-': '#0f4ea9',
      'B+': '#dc2626',
      'B-': '#dc2626',
      'AB+': '#7c3aed',
      'AB-': '#7c3aed',
      'O+': '#2fb463',
      'O-': '#2fb463',
    }
    return colors[bloodGroup] || '#17263a'
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
          <p style={{ color: '#17263a' }}>Loading medical details...</p>
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
                Edit Medical Details
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
                SECTION 1: BLOOD GROUP
                ============================================================ */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '8px',
                  }}>
                    Blood Group <span style={{ color: '#dc2626' }}>*</span>
                  </label>
                  <select
                    value={medicalData.bloodGroup || ''}
                    onChange={(e) => handleChange('bloodGroup', e.target.value)}
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: '48px',
                      padding: '0 16px',
                      paddingRight: '40px',
                      border: `2px solid ${getBloodGroupColor(medicalData.bloodGroup)}`,
                      borderRadius: '12px',
                      fontSize: '14px',
                      outline: 'none',
                      background: 'white',
                      color: medicalData.bloodGroup ? '#17263a' : '#6b7280',
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
                      e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
                    }}
                    onBlur={(e) => {
                      e.target.style.boxShadow = 'none'
                    }}
                  >
                    <option value="">Select blood group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  {medicalData.bloodGroup && (
                    <div style={{
                      marginTop: '6px',
                      fontSize: '12px',
                      color: getBloodGroupColor(medicalData.bloodGroup),
                      fontWeight: 500,
                    }}>
                      ✓ Blood group selected: {medicalData.bloodGroup}
                    </div>
                  )}
                </div>

                {/* ============================================================
                SECTION 2: EMERGENCY MEDICAL INFO
                ============================================================ */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '12px',
                  }}>
                    Do you have emergency medical information first aid personnel or emergency responders should know?
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '10px',
                    padding: '12px',
                    background: 'rgba(15, 78, 169, 0.03)',
                    borderRadius: '12px',
                    border: '1px solid rgba(15, 78, 169, 0.08)',
                  }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="emergencyMedicalInfo"
                        checked={medicalData.emergencyMedicalInfo === 'none'}
                        onChange={() => handleChange('emergencyMedicalInfo', 'none')}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          accentColor: '#0f4ea9',
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#17263a' }}>
                        No emergency medical information
                      </span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="emergencyMedicalInfo"
                        checked={medicalData.emergencyMedicalInfo === 'disclosure'}
                        onChange={() => handleChange('emergencyMedicalInfo', 'disclosure')}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          accentColor: '#0f4ea9',
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#17263a' }}>
                        Yes, voluntary disclosure
                      </span>
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="emergencyMedicalInfo"
                        checked={medicalData.emergencyMedicalInfo === 'skip'}
                        onChange={() => handleChange('emergencyMedicalInfo', 'skip')}
                        style={{
                          width: '18px',
                          height: '18px',
                          cursor: 'pointer',
                          accentColor: '#0f4ea9',
                        }}
                      />
                      <span style={{ fontSize: '14px', color: '#17263a' }}>
                        Skip for now
                      </span>
                    </label>
                  </div>
                </div>

                {/* ============================================================
                SECTION 3: MEDICAL CONDITIONS - Only show when disclosure is selected
                ============================================================ */}
                {medicalData.emergencyMedicalInfo === 'disclosure' && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <IconHeart style={{ color: '#dc2626' }} />
                      Medical Conditions <span style={{ color: '#dc2626' }}>*</span>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '8px',
                      padding: '12px',
                      background: 'rgba(220, 38, 38, 0.03)',
                      borderRadius: '12px',
                      border: '1px solid rgba(220, 38, 38, 0.1)',
                    }}>
                      {[
                        'Severe allergy',
                        'Diabetes / blood sugar risk',
                        'Heart condition / device',
                        'Mobility / communication limitation',
                        'Asthma / respiratory risk',
                        'Seizure condition',
                        'Bleeding risk',
                        'Emergency medication/device carried',
                      ].map((condition) => (
                        <label key={condition} style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '10px', 
                          cursor: 'pointer',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          transition: 'background 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'rgba(15, 78, 169, 0.05)'
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent'
                        }}
                        >
                          <input
                            type="checkbox"
                            checked={!!(medicalData.emergencyMedicalFlags?.[condition] || false)}
                            onChange={() => toggleFlag(condition)}
                            style={{
                              width: '18px',
                              height: '18px',
                              cursor: 'pointer',
                              accentColor: '#0f4ea9',
                            }}
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>{condition}</span>
                        </label>
                      ))}
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(23, 38, 58, 0.5)',
                      marginTop: '8px',
                    }}>
                      Select all that apply
                    </div>
                  </div>
                )}

                {/* ============================================================
                SECTION 4: EMERGENCY INSTRUCTIONS - Only show when disclosure is selected
                ============================================================ */}
                {medicalData.emergencyMedicalInfo === 'disclosure' && (
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '6px',
                    }}>
                      <IconAlert style={{ 
                        display: 'inline-block', 
                        marginRight: '6px',
                        color: '#f59e0b',
                        verticalAlign: 'middle',
                      }} />
                      Important Emergency Instructions
                    </label>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(23, 38, 58, 0.6)',
                      marginBottom: '8px',
                      padding: '8px 12px',
                      background: 'rgba(251, 191, 36, 0.08)',
                      borderRadius: '8px',
                      border: '1px solid rgba(251, 191, 36, 0.15)',
                    }}>
                      ⚠️ Do not include genetic or highly sensitive medical details.
                      This information will be available to first responders in case of emergency.
                    </div>
                    <textarea
                      value={medicalData.emergencyInstructions || ''}
                      onChange={(e) => handleChange('emergencyInstructions', e.target.value)}
                      placeholder="Enter important instructions for first responders..."
                      maxLength={1000}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid rgba(18, 38, 63, 0.12)',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'all 0.2s ease',
                        background: 'white',
                        color: '#17263a',
                        minHeight: '100px',
                        boxSizing: 'border-box',
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
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '4px',
                    }}>
                      <span style={{
                        fontSize: '12px',
                        color: 'rgba(23, 38, 58, 0.4)',
                      }}>
                        {medicalData.emergencyInstructions?.length || 0} / 1000 characters
                      </span>
                      {medicalData.emergencyInstructions?.length > 800 && (
                        <span style={{
                          fontSize: '12px',
                          color: '#f59e0b',
                          fontWeight: 500,
                        }}>
                          ⚠️ Approaching character limit
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* ============================================================
                SECTION 5: PRIVACY NOTE
                ============================================================ */}
                <div style={{
                  marginTop: '16px',
                  padding: '12px 16px',
                  background: 'rgba(15, 78, 169, 0.03)',
                  border: '1px solid rgba(15, 78, 169, 0.08)',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}>
                  <IconSupport style={{ 
                    width: '18px', 
                    height: '18px', 
                    color: '#0f4ea9',
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
                      Your medical information is private
                    </div>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(23, 38, 58, 0.6)',
                    }}>
                      This information is stored securely and only shared with authorized personnel 
                      in case of emergency. You can update or remove this information at any time.
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

export default MedicalEditPage