
// // src/worker/pages/WorkerSummaryPage.jsx
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { TopNav } from '../../common/components/TopNav'
// import workerService from '../services/workerService'
// import api from '../../services/api'

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

// function IconChevronRight(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconCheck(props) {
//   return (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// function IconWrench(props) {
//   return (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M22 6.5L17.5 11 13 6.5 17.5 2 22 6.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       <path d="M4 20L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       <path d="M12 12l-4 4 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// export function WorkerSummaryPage() {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
  
//   // ============================================================
//   // STATE MANAGEMENT
//   // ============================================================
  
//   const [profile, setProfile] = useState({})
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [profileImage, setProfileImage] = useState('')
//   const [imageLoading, setImageLoading] = useState(false)
//   const [expandedTrade, setExpandedTrade] = useState(null)
//   const [expandedTools, setExpandedTools] = useState(false)

//   // ============================================================
//   // ✅ GET FRESH PROFILE IMAGE URL
//   // ============================================================
  
//   const getFreshProfileImage = async (fileKey) => {
//     if (!fileKey) return null
    
//     try {
//       console.log('🔄 Getting fresh profile image URL for:', fileKey)
//       setImageLoading(true)
      
//       const response = await api.get(`/upload/view/${encodeURIComponent(fileKey)}`)
      
//       if (response.data.success && response.data.data.viewUrl) {
//         console.log('✅ Fresh profile image URL generated')
//         return response.data.data.viewUrl
//       }
//       return null
//     } finally {
//       setImageLoading(false)
//     }
//   }

//   // ============================================================
//   // ✅ ALWAYS FETCH FROM DYNAMODB
//   // ============================================================
  
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const userId = localStorage.getItem('userId')
        
//         if (!userId) {
//           setError('User not logged in. Please login again.')
//           setLoading(false)
//           return
//         }

//         console.log('📊 Fetching profile from DynamoDB for user:', userId)
        
//         const result = await workerService.getWorkerProfile(userId)
        
//         if (result.success && result.data) {
//           console.log('✅ Profile loaded from DynamoDB')
//           setProfile(result.data)
          
//           const basics = result.data.basics || {}
//           if (basics.profileImageKey) {
//             const freshUrl = await getFreshProfileImage(basics.profileImageKey)
//             if (freshUrl) {
//               setProfileImage(freshUrl)
//               setProfile(prev => ({
//                 ...prev,
//                 basics: {
//                   ...prev.basics,
//                   profilePreview: freshUrl
//                 }
//               }))
//             } else if (basics.profilePreview) {
//               setProfileImage(basics.profilePreview)
//             }
//           } else {
//             setProfileImage('/assets/worker.avif')
//           }
          
//           setError('')
//         } else {
//           setError('No profile data found. Please complete the wizard.')
//         }
//       } catch (error) {
//         console.error('❌ Error loading profile:', error)
//         setError(error.message || 'Failed to load profile')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadProfile()
//   }, [])

//   // ============================================================
//   // DATA EXTRACTION
//   // ============================================================
  
//   const basics = profile.basics || {}
//   const trade = profile.trade || {}
//   const workHistory = profile.workHistory || {}
//   const projects = workHistory.projects || []
//   const availability = profile.availability || {}
//   const medical = profile.medical || {}
//   const certifications = profile.certifications || {}
//   const tax = profile.tax || {}
//   const payment = profile.payment || {}
//   const emergency = profile.emergency || {}

//   const mainTrade = trade.mainTrade || ''
//   const skillGroups = trade.skillGroups || {}
//   const skillDetails = trade.skillDetails || {}
//   const toolsCertifications = trade.toolsCertifications || {}
//   const heavyEquipment = trade.heavyEquipment || {}

//   // ============================================================
//   // HELPER FUNCTIONS
//   // ============================================================
  
//   const displayValue = (value, placeholder = '—') => {
//     if (value === null || value === undefined || value === '') {
//       return placeholder
//     }
//     if (typeof value === 'string' && value.trim() === '') {
//       return placeholder
//     }
//     return value
//   }

//   const formatPhone = (phone) => {
//     if (!phone) return '—'
//     const cleaned = phone.replace(/\D/g, '')
//     if (cleaned.length === 10) {
//       return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
//     }
//     return phone
//   }

//   const fullName = [basics.legalFirstName, basics.legalLastName].filter(Boolean).join(' ') || '—'
//   const address = [basics.addressLine1, basics.city, basics.stateCode, basics.zip].filter(Boolean).join(', ')
  
//   const language = basics.english ? (basics.spanish ? t('summary.languages.both') : t('summary.languages.english')) : (basics.spanish ? t('summary.languages.spanish') : '—')
  
//   const certChecklist = certifications.certChecklist || {}
//   const certNames = Object.keys(certChecklist).filter(key => certChecklist[key])
//   const certText = certNames.length > 0 ? certNames.join(', ') : t('summary.noCertifications')
  
//   const avail = availability.availability || {}
//   const availableDays = Object.keys(avail).filter(key => avail[key])
//   const availabilityText = availableDays.length > 0 ? availableDays.map(d => t(`summary.days.${d.toLowerCase()}`) || d.charAt(0).toUpperCase() + d.slice(1)).join(', ') : t('summary.notSpecified')
  
//   const taxPath = tax.classificationPath || ''
//   const taxText = taxPath === 'employee' ? t('summary.w2Employee') : taxPath === 'subcontractor' ? t('summary.contractor') : '—'
  
//   const medicalFlags = medical.emergencyMedicalFlags || {}
//   const allergies = Object.keys(medicalFlags).filter(key => medicalFlags[key])
//   const allergiesText = allergies.length > 0 ? allergies.join(', ') : t('summary.noAllergies')
  
//   const bankName = payment.bankName || t('summary.notSet')
//   const achEnabled = payment.achEnabled ? t('summary.enabled') : t('summary.notEnabled')

//   const fallbackProjects = [
//     { name: t('summary.noProjects'), client: '—', role: '—', trade: '—' },
//   ]

//   const imageSrc = profileImage || basics.profilePreview || "/assets/worker.avif"

//   const selectedToolsCount = Object.values(toolsCertifications).filter(v => v === true).length
//   const totalToolsCount = Object.keys(toolsCertifications).length

//   const selectedHeavyCount = Object.values(heavyEquipment).filter(v => v === true).length
//   const totalHeavyCount = Object.keys(heavyEquipment).length

//   const getSkillGroupsWithDetails = () => {
//     const groups = Object.keys(skillGroups).filter(key => skillGroups[key] === true)
//     return groups.map(group => ({
//       name: group,
//       experience: skillDetails[group]?.experience || '',
//       years: skillDetails[group]?.years || '',
//       skills: skillDetails[group]?.skills || {}
//     }))
//   }

//   const skillGroupsList = getSkillGroupsWithDetails()

//   // ============================================================
//   // NAVIGATION HANDLERS
//   // ============================================================
  
//   const handleEditBasic = () => {
//     navigate('/basic-info/edit', {
//       state: {
//         basicData: basics,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditTrade = () => {
//     navigate('/trade-profile/edit', {
//       state: {
//         tradeData: {
//           mainTrade: trade.mainTrade || '',
//           skillGroups: trade.skillGroups || {},
//           skillDetails: trade.skillDetails || {},
//           toolsCertifications: trade.toolsCertifications || {},
//           heavyEquipment: trade.heavyEquipment || {},
//         },
//         parentData: profile
//       }
//     })
//   }

//   const handleEditWorkHistory = () => {
//     navigate('/work-history/edit', {
//       state: {
//         workHistoryData: workHistory,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditAvailability = () => {
//     navigate('/availability/edit', {
//       state: {
//         availabilityData: availability,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditCertifications = () => {
//     navigate('/certification/edit', {
//       state: {
//         certData: certifications,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditTax = () => {
//     navigate('/tax/edit', {
//       state: {
//         taxData: tax,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditPayment = () => {
//     navigate('/payment/edit', {
//       state: {
//         paymentData: payment,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditMedical = () => {
//     navigate('/medical/edit', {
//       state: {
//         medicalData: medical,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditEmergency = () => {
//     navigate('/emergency-contact/edit', {
//       state: {
//         emergencyData: emergency,
//         parentData: profile
//       }
//     })
//   }

//   // ============================================================
//   // TRADE DISPLAY HELPERS
//   // ============================================================
  
//   const getLevelAbbreviation = (level) => {
//     if (level === 'Helper') return 'H'
//     if (level === 'Apprentice') return 'A'
//     if (level === 'Skilled Worker') return 'SW'
//     if (level === 'Journeyman/Mechanic') return 'J'
//     if (level === 'Lead') return 'L'
//     if (level === 'Foreman') return 'F'
//     if (level === 'Lead/Foreman') return 'LF'
//     return level
//   }

//   const toggleTradeExpansion = (index) => {
//     setExpandedTrade(expandedTrade === index ? null : index)
//   }

//   const toggleToolsExpansion = () => {
//     setExpandedTools(!expandedTools)
//   }

//   // ============================================================
//   // RENDER - LOADING STATE
//   // ============================================================
  
//   if (loading) {
//     return (
//       <div className="appShell">
//         <TopNav variant="solid" />
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '80vh',
//           flexDirection: 'column',
//           gap: '16px'
//         }}>
//           <div style={{ 
//             width: '40px', 
//             height: '40px', 
//             border: '3px solid rgba(15, 78, 169, 0.1)',
//             borderTop: '3px solid #0f4ea9',
//             borderRadius: '50%',
//             animation: 'spin 1s linear infinite'
//           }} />
//           <p style={{ color: '#17263a' }}>{t('summary.loading')}</p>
//           <style>{`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}</style>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // RENDER - ERROR STATE
//   // ============================================================
  
//   if (error) {
//     return (
//       <div className="appShell">
//         <TopNav variant="solid" />
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '80vh',
//           flexDirection: 'column',
//           gap: '16px'
//         }}>
//           <p style={{ color: '#dc2626', fontSize: '16px' }}>❌ {error}</p>
//           <button 
//             onClick={() => navigate('/wizard')}
//             style={{
//               padding: '10px 24px',
//               background: '#0f4ea9',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer'
//             }}
//           >
//             {t('summary.goToWizard')}
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // RENDER - MAIN CONTENT
//   // ============================================================
  
//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">{t('summary.workspace')}</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
//                 <span className="sideText">{t('summary.overview')}</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
//                 <span className="sideText">{t('summary.projects')}</span>
//                 <span className="sideBadge" aria-label="12 projects">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconChart /></span>
//                 <span className="sideText">{t('summary.revenues')}</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon" aria-hidden="true"><IconUser /></span>
//                 <span className="sideText">{t('summary.profile')}</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">{t('summary.general')}</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
//                 <span className="sideText">{t('summary.signOut')}</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
//                 <span className="sideText">{t('summary.support')}</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div className="wizardSummaryPage" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            
//             {/* ============================================================
//             Row 1: Basic Information, Trade Profile, Subscription & Rewards
//             ============================================================ */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* ✅ UPDATED Basic Information Card - Fixed clipping issues */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', minHeight: '280px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.basicInfo')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditBasic}
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
//                     <img 
//                       src={imageSrc} 
//                       alt="Profile" 
//                       style={{ 
//                         width: '48px', 
//                         height: '48px', 
//                         borderRadius: '50%', 
//                         objectFit: 'cover',
//                         background: '#f0f0f0',
//                         flexShrink: 0
//                       }}
//                       onError={(e) => {
//                         e.target.src = '/assets/worker.avif'
//                       }}
//                     />
//                     <div style={{ minWidth: 0, flex: 1 }}>
//                       <div style={{ fontWeight: 600, fontSize: '16px', color: '#17263a', wordBreak: 'break-word' }}>
//                         {fullName}
//                       </div>
//                       <span style={{ fontSize: '12px', color: '#e0d616', fontWeight: 500 }}>{t('summary.pending')}</span>
//                     </div>
//                   </div>
                  
//                   <div style={{ 
//                     display: 'grid', 
//                     gridTemplateColumns: '1fr 1fr', 
//                     gap: '6px 16px',
//                     marginTop: '4px'
//                   }}>
//                     <div>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.dob')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500 }}>
//                         {displayValue(basics.dob)}
//                       </div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.language')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500 }}>
//                         {language}
//                       </div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.email')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500, wordBreak: 'break-all' }}>
//                         {displayValue(basics.emailAddress)}
//                       </div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.phone')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500 }}>
//                         {formatPhone(basics.mobilePhone)}
//                       </div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.address')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500, wordBreak: 'break-word' }}>
//                         {displayValue(address)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Trade Profile Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', minHeight: '280px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.tradeProfile')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditTrade}
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
//                   {mainTrade ? (
//                     <>
//                       <div style={{ marginBottom: '12px' }}>
//                         <div style={{ 
//                           display: 'inline-block',
//                           padding: '4px 16px',
//                           background: 'rgba(15, 78, 169, 0.08)',
//                           border: '1px solid rgba(15, 78, 169, 0.15)',
//                           borderRadius: '20px',
//                           fontSize: '13px',
//                           fontWeight: 600,
//                           color: '#0f4ea9',
//                         }}>
//                           {mainTrade}
//                         </div>
//                       </div>

//                       {skillGroupsList.length > 0 && (
//                         <div style={{ marginBottom: '10px' }}>
//                           <div style={{ 
//                             fontSize: '11px', 
//                             fontWeight: 600, 
//                             color: 'rgba(23,38,58,0.5)',
//                             marginBottom: '4px',
//                             textTransform: 'uppercase',
//                             letterSpacing: '0.5px'
//                           }}>
//                             {t('wizard.step2.skillGroups')}
//                           </div>
//                           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
//                             {skillGroupsList.slice(0, 3).map((group, idx) => (
//                               <span key={idx} style={{
//                                 fontSize: '12px',
//                                 background: 'rgba(15, 78, 169, 0.06)',
//                                 color: '#17263a',
//                                 padding: '2px 10px',
//                                 borderRadius: '12px',
//                                 border: '1px solid rgba(15, 78, 169, 0.08)',
//                                 display: 'inline-flex',
//                                 alignItems: 'center',
//                                 gap: '4px'
//                               }}>
//                                 {group.name}
//                                 {group.experience && (
//                                   <span style={{ 
//                                     fontSize: '10px',
//                                     color: '#0f4ea9',
//                                     fontWeight: 600
//                                   }}>
//                                     ({group.experience})
//                                   </span>
//                                 )}
//                               </span>
//                             ))}
//                             {skillGroupsList.length > 3 && (
//                               <span style={{
//                                 fontSize: '12px',
//                                 color: 'rgba(23,38,58,0.5)',
//                                 padding: '2px 10px',
//                               }}>
//                                 +{skillGroupsList.length - 3} more
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {totalToolsCount > 0 && (
//                         <div style={{ marginBottom: '6px' }}>
//                           <div 
//                             style={{ 
//                               display: 'flex', 
//                               alignItems: 'center', 
//                               justifyContent: 'space-between',
//                               cursor: 'pointer',
//                               padding: '4px 0',
//                             }}
//                             onClick={toggleToolsExpansion}
//                           >
//                             <div style={{ 
//                               fontSize: '11px', 
//                               fontWeight: 600, 
//                               color: 'rgba(23,38,58,0.5)',
//                               textTransform: 'uppercase',
//                               letterSpacing: '0.5px',
//                               display: 'flex',
//                               alignItems: 'center',
//                               gap: '6px'
//                             }}>
//                               <IconWrench style={{ color: 'rgba(23,38,58,0.4)', width: '12px', height: '12px' }} />
//                               {t('wizard.step3.toolsCertifications')}
//                               <span style={{
//                                 fontSize: '11px',
//                                 color: selectedToolsCount === totalToolsCount ? '#2fb463' : '#0f4ea9',
//                                 fontWeight: 600,
//                               }}>
//                                 ({selectedToolsCount}/{totalToolsCount})
//                               </span>
//                             </div>
//                             <IconChevronRight style={{ 
//                               transform: expandedTools ? 'rotate(90deg)' : 'rotate(0deg)',
//                               transition: 'transform 0.2s',
//                               color: 'rgba(23,38,58,0.4)',
//                               width: '14px',
//                               height: '14px'
//                             }} />
//                           </div>
                          
//                           {expandedTools && (
//                             <div style={{ 
//                               marginTop: '6px',
//                               padding: '8px 10px',
//                               background: 'rgba(15, 78, 169, 0.03)',
//                               borderRadius: '6px',
//                               border: '1px solid rgba(15, 78, 169, 0.06)',
//                               maxHeight: '120px',
//                               overflowY: 'auto'
//                             }}>
//                               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
//                                 {Object.keys(toolsCertifications)
//                                   .filter(key => toolsCertifications[key] === true)
//                                   .slice(0, 8)
//                                   .map((tool, idx) => (
//                                     <span key={idx} style={{
//                                       fontSize: '11px',
//                                       background: 'rgba(47, 180, 99, 0.08)',
//                                       color: '#065f46',
//                                       padding: '2px 8px',
//                                       borderRadius: '12px',
//                                       border: '1px solid rgba(47, 180, 99, 0.1)',
//                                       display: 'inline-flex',
//                                       alignItems: 'center',
//                                       gap: '2px'
//                                     }}>
//                                       <IconCheck style={{ width: '10px', height: '10px' }} />
//                                       {tool}
//                                     </span>
//                                   ))}
//                                 {Object.keys(toolsCertifications).filter(key => toolsCertifications[key] === true).length > 8 && (
//                                   <span style={{
//                                     fontSize: '11px',
//                                     color: 'rgba(23,38,58,0.5)',
//                                     padding: '2px 8px',
//                                   }}>
//                                     +{Object.keys(toolsCertifications).filter(key => toolsCertifications[key] === true).length - 8} more
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {totalHeavyCount > 0 && (
//                         <div style={{ marginTop: '4px' }}>
//                           <div style={{ 
//                             fontSize: '11px', 
//                             color: 'rgba(23,38,58,0.5)',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '6px'
//                           }}>
//                             🚜 {t('wizard.step3.heavyEquipment')}
//                             <span style={{
//                               fontSize: '11px',
//                               color: selectedHeavyCount === totalHeavyCount ? '#2fb463' : '#0f4ea9',
//                               fontWeight: 600,
//                             }}>
//                               ({selectedHeavyCount}/{totalHeavyCount})
//                             </span>
//                           </div>
//                           {selectedHeavyCount > 0 && (
//                             <div style={{ 
//                               display: 'flex', 
//                               flexWrap: 'wrap', 
//                               gap: '4px',
//                               marginTop: '4px'
//                             }}>
//                               {Object.keys(heavyEquipment)
//                                 .filter(key => heavyEquipment[key] === true)
//                                 .slice(0, 4)
//                                 .map((item, idx) => (
//                                   <span key={idx} style={{
//                                     fontSize: '10px',
//                                     background: 'rgba(15, 78, 169, 0.06)',
//                                     color: '#17263a',
//                                     padding: '1px 8px',
//                                     borderRadius: '10px',
//                                     border: '1px solid rgba(15, 78, 169, 0.08)',
//                                   }}>
//                                     {item}
//                                   </span>
//                                 ))}
//                               {Object.keys(heavyEquipment).filter(key => heavyEquipment[key] === true).length > 4 && (
//                                 <span style={{
//                                   fontSize: '10px',
//                                   color: 'rgba(23,38,58,0.5)',
//                                   padding: '1px 8px',
//                                 }}>
//                                   +{Object.keys(heavyEquipment).filter(key => heavyEquipment[key] === true).length - 4}
//                                 </span>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div style={{ color: 'rgba(23,38,58,0.4)', fontSize: '14px', textAlign: 'center', padding: '12px 0' }}>
//                       {t('summary.noTradeInfo')}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Subscription & Rewards Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', minHeight: '280px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.subscription')}</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.activePlan')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Pro</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.planTier')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Professional</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.renews')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{t('summary.renewsDate')}</span>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(15,78,169,0.06)', borderRadius: '8px', textAlign: 'center' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
//                       <IconTrophy style={{ color: '#f59e0b', width: '20px', height: '20px' }} />
//                       <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f4ea9' }}>12</span>
//                       <span style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>{t('summary.tradePoints')}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//            {/* ============================================================
// Row 2: Work History - UPDATED (Role column removed)
// ============================================================ */}
// <div className="wizardSummaryWideCard" style={{ 
//   padding: '20px', 
//   border: '1px solid rgba(18,38,63,0.08)', 
//   borderRadius: '12px', 
//   background: 'white', 
//   marginBottom: '20px' 
// }}>
//   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//     <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.workHistory')}</span>
//     <button 
//       type="button" 
//       onClick={handleEditWorkHistory}
//       style={{ 
//         background: 'none', 
//         border: 'none', 
//         color: '#0f4ea9', 
//         cursor: 'pointer',
//         padding: '4px 8px',
//         borderRadius: '6px',
//         transition: 'background 0.2s',
//       }}
//       onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'}
//       onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
//     >
//       <IconPencil />
//     </button>
//   </div>
  
//   {projects.length > 0 ? (
//     <div>
//       {/* Header Row - 4 columns (Role removed) */}
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: '1.5fr 1.5fr 1.2fr 0.8fr', 
//         gap: '12px', 
//         padding: '10px 12px', 
//         borderBottom: '2px solid rgba(18,38,63,0.08)', 
//         fontWeight: 600, 
//         fontSize: '11px', 
//         color: 'rgba(23,38,58,0.5)', 
//         textTransform: 'uppercase', 
//         letterSpacing: '0.5px',
//         backgroundColor: 'rgba(15, 78, 169, 0.03)',
//         borderRadius: '8px 8px 0 0',
//       }}>
//         <div>{t('summary.project')}</div>
//         <div>{t('summary.company')}</div>
//         <div>{t('summary.trade')}</div>
//         <div style={{ textAlign: 'center' }}>Dates</div>
//       </div>

//       {/* Project Rows - 4 columns (Role removed) */}
//       {projects.map((p, idx) => {
//         const projectTrade = p.trade || p.projectTrade || p.primaryTrade || p.tradeType || (p.trade && p.trade.name) || ''
//         const projectCompany = p.client || p.company || ''
//         const startDate = p.start || p.startDate || ''
//         const endDate = p.end || p.endDate || ''
//         const dateDisplay = startDate || endDate ? `${startDate} - ${endDate}` : '—'
        
//         return (
//           <div 
//             key={idx} 
//             style={{ 
//               display: 'grid', 
//               gridTemplateColumns: '1.5fr 1.5fr 1.2fr 0.8fr', 
//               gap: '12px', 
//               padding: '12px 12px', 
//               borderBottom: idx < projects.length - 1 ? '1px solid rgba(18,38,63,0.06)' : 'none',
//               fontSize: '14px', 
//               color: '#17263a',
//               backgroundColor: idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
//               transition: 'background-color 0.2s',
//             }}
//             onMouseEnter={(e) => {
//               if (idx % 2 === 0) {
//                 e.currentTarget.style.backgroundColor = 'rgba(15, 78, 169, 0.06)'
//               } else {
//                 e.currentTarget.style.backgroundColor = 'rgba(15, 78, 169, 0.04)'
//               }
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.backgroundColor = idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent'
//             }}
//           >
//             <div style={{ 
//               fontWeight: 500, 
//               color: '#0f4ea9',
//               wordBreak: 'break-word',
//               display: 'flex',
//               alignItems: 'center',
//               gap: '6px'
//             }}>
//               <span style={{
//                 display: 'inline-flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: '20px',
//                 height: '20px',
//                 borderRadius: '50%',
//                 background: 'rgba(15, 78, 169, 0.1)',
//                 color: '#0f4ea9',
//                 fontSize: '10px',
//                 fontWeight: 700,
//                 flexShrink: 0
//               }}>
//                 {idx + 1}
//               </span>
//               {displayValue(p.name, 'Untitled Project')}
//             </div>
//             <div style={{ wordBreak: 'break-word', color: '#17263a' }}>{displayValue(projectCompany)}</div>
//             <div>
//               {projectTrade ? (
//                 <span style={{
//                   display: 'inline-block',
//                   padding: '2px 10px',
//                   background: 'rgba(15, 78, 169, 0.08)',
//                   borderRadius: '12px',
//                   fontSize: '12px',
//                   color: '#0f4ea9',
//                   fontWeight: 500,
//                 }}>
//                   {projectTrade}
//                 </span>
//               ) : (
//                 <span style={{ color: 'rgba(23,38,58,0.4)' }}>—</span>
//               )}
//             </div>
//             <div style={{ 
//               textAlign: 'center', 
//               fontSize: '12px', 
//               color: 'rgba(23,38,58,0.6)',
//               fontWeight: 500,
//               whiteSpace: 'nowrap'
//             }}>
//               {dateDisplay}
//             </div>
//           </div>
//         )
//       })}
//     </div>
//   ) : (
//     <div style={{ 
//       textAlign: 'center', 
//       padding: '40px 20px',
//       color: 'rgba(23,38,58,0.4)',
//       fontSize: '14px',
//     }}>
//       <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
//       <div>{t('summary.noProjects')}</div>
//       <div style={{ fontSize: '12px', marginTop: '4px' }}>
//         Add your work history to showcase your experience
//       </div>
//     </div>
//   )}
// </div>

//             {/* ============================================================
//             Row 3: Availability, Certifications, Tax, Payment
//             ============================================================ */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Availability & Rate Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.availabilityRate')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditAvailability}
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
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.hourlyRate')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(availability.hourlyRate ? `$${availability.hourlyRate}` : '—')}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.travel')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{availability.willingToTravel === 'yes' ? t('summary.yes') : t('summary.no')}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.available')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{availabilityText}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Certifications & Safety Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.certifications')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditCertifications}
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
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.certificationsList')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{certText}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.safety')}</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                          --
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Tax Profile Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.taxProfile')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditTax}
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
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.classification')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{taxText}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.taxVerified')}</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         --
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment/Bank Details Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.paymentDetails')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditPayment}
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
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.bank')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(bankName)}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>ACH</span>
//                       <span style={{ 
//                         color: achEnabled === t('summary.enabled') ? '#2fb463' : 'rgba(23,38,58,0.6)', 
//                         fontWeight: 500, 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         gap: '4px' 
//                       }}>
//                         {achEnabled === t('summary.enabled') ? (
//                           <>
//                             <IconCheckCircle style={{ width: '16px', height: '16px', color: '#2fb463' }} /> {t('summary.enabled')}
//                           </>
//                         ) : (
//                           t('summary.notEnabled')
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ============================================================
//             Row 4: Medical Details & Emergency Contact
//             ============================================================ */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Medical Details Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.medicalDetails')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditMedical}
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
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.bloodGroup')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(medical.bloodGroup)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.allergies')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{allergiesText}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Contact Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.emergencyContact')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditEmergency}
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
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.name')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(emergency.emergencyContactName)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.relationship')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(emergency.emergencyContactRelationship)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.phone')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{formatPhone(emergency.emergencyContactPhone)}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default WorkerSummaryPage







// // src/worker/pages/WorkerSummaryPage.jsx
// import { useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { TopNav } from '../../common/components/TopNav'
// import workerService from '../services/workerService'
// import api from '../../services/api'

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

// function IconChevronRight(props) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconCheck(props) {
//   return (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// function IconWrench(props) {
//   return (
//     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M22 6.5L17.5 11 13 6.5 17.5 2 22 6.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//       <path d="M4 20L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//       <path d="M12 12l-4 4 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// export function WorkerSummaryPage() {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
  
//   // ============================================================
//   // STATE MANAGEMENT
//   // ============================================================
  
//   const [profile, setProfile] = useState({})
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [profileImage, setProfileImage] = useState('')
//   const [imageLoading, setImageLoading] = useState(false)
//   const [expandedTrade, setExpandedTrade] = useState(null)
//   const [expandedTools, setExpandedTools] = useState(false)

//   // ============================================================
//   // ✅ GET FRESH PROFILE IMAGE URL
//   // ============================================================
  
//   const getFreshProfileImage = async (fileKey) => {
//     if (!fileKey) return null
    
//     try {
//       console.log('🔄 Getting fresh profile image URL for:', fileKey)
//       setImageLoading(true)
      
//       const response = await api.get(`/upload/view/${encodeURIComponent(fileKey)}`)
      
//       if (response.data.success && response.data.data.viewUrl) {
//         console.log('✅ Fresh profile image URL generated')
//         return response.data.data.viewUrl
//       }
//       return null
//     } finally {
//       setImageLoading(false)
//     }
//   }

//   // ============================================================
//   // ✅ ALWAYS FETCH FROM DYNAMODB
//   // ============================================================
  
//   useEffect(() => {
//     const loadProfile = async () => {
//       try {
//         const userId = localStorage.getItem('userId')
        
//         if (!userId) {
//           setError('User not logged in. Please login again.')
//           setLoading(false)
//           return
//         }

//         console.log('📊 Fetching profile from DynamoDB for user:', userId)
        
//         const result = await workerService.getWorkerProfile(userId)
        
//         if (result.success && result.data) {
//           console.log('✅ Profile loaded from DynamoDB')
//           setProfile(result.data)
          
//           const basics = result.data.basics || {}
//           if (basics.profileImageKey) {
//             const freshUrl = await getFreshProfileImage(basics.profileImageKey)
//             if (freshUrl) {
//               setProfileImage(freshUrl)
//               setProfile(prev => ({
//                 ...prev,
//                 basics: {
//                   ...prev.basics,
//                   profilePreview: freshUrl
//                 }
//               }))
//             } else if (basics.profilePreview) {
//               setProfileImage(basics.profilePreview)
//             }
//           } else {
//             setProfileImage('/assets/worker.avif')
//           }
          
//           setError('')
//         } else {
//           setError('No profile data found. Please complete the wizard.')
//         }
//       } catch (error) {
//         console.error('❌ Error loading profile:', error)
//         setError(error.message || 'Failed to load profile')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadProfile()
//   }, [])

//   // ============================================================
//   // DATA EXTRACTION
//   // ============================================================
  
//   const basics = profile.basics || {}
//   const trade = profile.trade || {}
//   const workHistory = profile.workHistory || {}
//   const projects = workHistory.projects || []
//   const availability = profile.availability || {}
//   const medical = profile.medical || {}
//   const certifications = profile.certifications || {}
//   const tax = profile.tax || {}
//   const payment = profile.payment || {}
//   const emergency = profile.emergency || {}

//   const mainTrade = trade.mainTrade || ''
//   const skillGroups = trade.skillGroups || {}
//   const skillDetails = trade.skillDetails || {}
//   const toolsCertifications = trade.toolsCertifications || {}
//   const heavyEquipment = trade.heavyEquipment || {}

//   // ============================================================
//   // HELPER FUNCTIONS
//   // ============================================================
  
//   const displayValue = (value, placeholder = '—') => {
//     if (value === null || value === undefined || value === '') {
//       return placeholder
//     }
//     if (typeof value === 'string' && value.trim() === '') {
//       return placeholder
//     }
//     return value
//   }

//   const formatPhone = (phone) => {
//     if (!phone) return '—'
//     const cleaned = phone.replace(/\D/g, '')
//     if (cleaned.length === 10) {
//       return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
//     }
//     return phone
//   }

//   const fullName = [basics.legalFirstName, basics.legalLastName].filter(Boolean).join(' ') || '—'
//   const address = [basics.addressLine1, basics.city, basics.stateCode, basics.zip].filter(Boolean).join(', ')
  
//   const language = basics.english ? (basics.spanish ? t('summary.languages.both') : t('summary.languages.english')) : (basics.spanish ? t('summary.languages.spanish') : '—')
  
//   // ✅ FIX: Get certifications from trade.toolsCertifications (WizardStep3 data)
//   const toolsCerts = toolsCertifications || {}
//   const certNames = Object.keys(toolsCerts).filter(key => toolsCerts[key] === true)
  
//   // Also check certifications.certChecklist for backward compatibility
//   const certChecklist = certifications.certChecklist || {}
//   const legacyCertNames = Object.keys(certChecklist).filter(key => certChecklist[key])
  
//   // Prefer toolsCertifications, fallback to legacy certChecklist
//   const finalCertNames = certNames.length > 0 ? certNames : legacyCertNames
//   const certText = finalCertNames.length > 0 ? finalCertNames.join(', ') : t('summary.noCertifications')
  
//   const avail = availability.availability || {}
//   const availableDays = Object.keys(avail).filter(key => avail[key])
//   const availabilityText = availableDays.length > 0 ? availableDays.map(d => t(`summary.days.${d.toLowerCase()}`) || d.charAt(0).toUpperCase() + d.slice(1)).join(', ') : t('summary.notSpecified')
  
//   const taxPath = tax.classificationPath || ''
//   const taxText = taxPath === 'employee' ? t('summary.w2Employee') : taxPath === 'subcontractor' ? t('summary.contractor') : '—'
  
//   const medicalFlags = medical.emergencyMedicalFlags || {}
//   const allergies = Object.keys(medicalFlags).filter(key => medicalFlags[key])
//   const allergiesText = allergies.length > 0 ? allergies.join(', ') : t('summary.noAllergies')
  
//   const bankName = payment.bankName || t('summary.notSet')
//   const achEnabled = payment.achEnabled ? t('summary.enabled') : t('summary.notEnabled')

//   const fallbackProjects = [
//     { name: t('summary.noProjects'), client: '—', role: '—', trade: '—' },
//   ]

//   const imageSrc = profileImage || basics.profilePreview || "/assets/worker.avif"

//   const selectedToolsCount = Object.values(toolsCertifications).filter(v => v === true).length
//   const totalToolsCount = Object.keys(toolsCertifications).length

//   const selectedHeavyCount = Object.values(heavyEquipment).filter(v => v === true).length
//   const totalHeavyCount = Object.keys(heavyEquipment).length

//   const getSkillGroupsWithDetails = () => {
//     const groups = Object.keys(skillGroups).filter(key => skillGroups[key] === true)
//     return groups.map(group => ({
//       name: group,
//       experience: skillDetails[group]?.experience || '',
//       years: skillDetails[group]?.years || '',
//       skills: skillDetails[group]?.skills || {}
//     }))
//   }

//   const skillGroupsList = getSkillGroupsWithDetails()

//   // ============================================================
//   // NAVIGATION HANDLERS
//   // ============================================================
  
//   const handleEditBasic = () => {
//     navigate('/basic-info/edit', {
//       state: {
//         basicData: basics,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditTrade = () => {
//     navigate('/trade-profile/edit', {
//       state: {
//         tradeData: {
//           mainTrade: trade.mainTrade || '',
//           skillGroups: trade.skillGroups || {},
//           skillDetails: trade.skillDetails || {},
//           toolsCertifications: trade.toolsCertifications || {},
//           heavyEquipment: trade.heavyEquipment || {},
//         },
//         parentData: profile
//       }
//     })
//   }

//   const handleEditWorkHistory = () => {
//     navigate('/work-history/edit', {
//       state: {
//         workHistoryData: workHistory,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditAvailability = () => {
//     navigate('/availability/edit', {
//       state: {
//         availabilityData: availability,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditCertifications = () => {
//     navigate('/certification/edit', {
//       state: {
//         certData: {
//           certChecklist: certifications.certChecklist || {},
//           certRows: certifications.certRows || [],
//           safetyFlags: certifications.safetyFlags || {},
//         },
//         parentData: profile
//       }
//     })
//   }

//   const handleEditTax = () => {
//     navigate('/tax/edit', {
//       state: {
//         taxData: tax,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditPayment = () => {
//     navigate('/payment/edit', {
//       state: {
//         paymentData: payment,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditMedical = () => {
//     navigate('/medical/edit', {
//       state: {
//         medicalData: medical,
//         parentData: profile
//       }
//     })
//   }

//   const handleEditEmergency = () => {
//     navigate('/emergency-contact/edit', {
//       state: {
//         emergencyData: emergency,
//         parentData: profile
//       }
//     })
//   }

//   // ============================================================
//   // TRADE DISPLAY HELPERS
//   // ============================================================
  
//   const getLevelAbbreviation = (level) => {
//     if (level === 'Helper') return 'H'
//     if (level === 'Apprentice') return 'A'
//     if (level === 'Skilled Worker') return 'SW'
//     if (level === 'Journeyman/Mechanic') return 'J'
//     if (level === 'Lead') return 'L'
//     if (level === 'Foreman') return 'F'
//     if (level === 'Lead/Foreman') return 'LF'
//     return level
//   }

//   const toggleTradeExpansion = (index) => {
//     setExpandedTrade(expandedTrade === index ? null : index)
//   }

//   const toggleToolsExpansion = () => {
//     setExpandedTools(!expandedTools)
//   }

//   // ============================================================
//   // RENDER - LOADING STATE
//   // ============================================================
  
//   if (loading) {
//     return (
//       <div className="appShell">
//         <TopNav variant="solid" />
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '80vh',
//           flexDirection: 'column',
//           gap: '16px'
//         }}>
//           <div style={{ 
//             width: '40px', 
//             height: '40px', 
//             border: '3px solid rgba(15, 78, 169, 0.1)',
//             borderTop: '3px solid #0f4ea9',
//             borderRadius: '50%',
//             animation: 'spin 1s linear infinite'
//           }} />
//           <p style={{ color: '#17263a' }}>{t('summary.loading')}</p>
//           <style>{`
//             @keyframes spin {
//               0% { transform: rotate(0deg); }
//               100% { transform: rotate(360deg); }
//             }
//           `}</style>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // RENDER - ERROR STATE
//   // ============================================================
  
//   if (error) {
//     return (
//       <div className="appShell">
//         <TopNav variant="solid" />
//         <div style={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           alignItems: 'center', 
//           height: '80vh',
//           flexDirection: 'column',
//           gap: '16px'
//         }}>
//           <p style={{ color: '#dc2626', fontSize: '16px' }}>❌ {error}</p>
//           <button 
//             onClick={() => navigate('/wizard')}
//             style={{
//               padding: '10px 24px',
//               background: '#0f4ea9',
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer'
//             }}
//           >
//             {t('summary.goToWizard')}
//           </button>
//         </div>
//       </div>
//     )
//   }

//   // ============================================================
//   // RENDER - MAIN CONTENT
//   // ============================================================
  
//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">{t('summary.workspace')}</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
//                 <span className="sideText">{t('summary.overview')}</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
//                 <span className="sideText">{t('summary.projects')}</span>
//                 <span className="sideBadge" aria-label="12 projects">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconChart /></span>
//                 <span className="sideText">{t('summary.revenues')}</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon" aria-hidden="true"><IconUser /></span>
//                 <span className="sideText">{t('summary.profile')}</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">{t('summary.general')}</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
//                 <span className="sideText">{t('summary.signOut')}</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
//                 <span className="sideText">{t('summary.support')}</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div className="wizardSummaryPage" style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto' }}>
            
//             {/* ============================================================
//             Row 1: Basic Information, Trade Profile, Subscription & Rewards
//             ============================================================ */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Basic Information Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', minHeight: '280px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.basicInfo')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditBasic}
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
//                     <img 
//                       src={imageSrc} 
//                       alt="Profile" 
//                       style={{ 
//                         width: '48px', 
//                         height: '48px', 
//                         borderRadius: '50%', 
//                         objectFit: 'cover',
//                         background: '#f0f0f0',
//                         flexShrink: 0
//                       }}
//                       onError={(e) => {
//                         e.target.src = '/assets/worker.avif'
//                       }}
//                     />
//                     <div style={{ minWidth: 0, flex: 1 }}>
//                       <div style={{ fontWeight: 600, fontSize: '16px', color: '#17263a', wordBreak: 'break-word' }}>
//                         {fullName}
//                       </div>
//                       <span style={{ fontSize: '12px', color: '#e0d616', fontWeight: 500 }}>{t('summary.pending')}</span>
//                     </div>
//                   </div>
                  
//                   <div style={{ 
//                     display: 'grid', 
//                     gridTemplateColumns: '1fr 1fr', 
//                     gap: '6px 16px',
//                     marginTop: '4px'
//                   }}>
//                     <div>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.dob')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500 }}>
//                         {displayValue(basics.dob)}
//                       </div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.language')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500 }}>
//                         {language}
//                       </div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.email')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500, wordBreak: 'break-all' }}>
//                         {displayValue(basics.emailAddress)}
//                       </div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.phone')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500 }}>
//                         {formatPhone(basics.mobilePhone)}
//                       </div>
//                     </div>
//                     <div style={{ gridColumn: '1 / -1' }}>
//                       <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
//                         {t('summary.address')}
//                       </span>
//                       <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500, wordBreak: 'break-word' }}>
//                         {displayValue(address)}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Trade Profile Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', minHeight: '280px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.tradeProfile')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditTrade}
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
//                   {mainTrade ? (
//                     <>
//                       <div style={{ marginBottom: '12px' }}>
//                         <div style={{ 
//                           display: 'inline-block',
//                           padding: '4px 16px',
//                           background: 'rgba(15, 78, 169, 0.08)',
//                           border: '1px solid rgba(15, 78, 169, 0.15)',
//                           borderRadius: '20px',
//                           fontSize: '13px',
//                           fontWeight: 600,
//                           color: '#0f4ea9',
//                         }}>
//                           {mainTrade}
//                         </div>
//                       </div>

//                       {skillGroupsList.length > 0 && (
//                         <div style={{ marginBottom: '10px' }}>
//                           <div style={{ 
//                             fontSize: '11px', 
//                             fontWeight: 600, 
//                             color: 'rgba(23,38,58,0.5)',
//                             marginBottom: '4px',
//                             textTransform: 'uppercase',
//                             letterSpacing: '0.5px'
//                           }}>
//                             {t('wizard.step2.skillGroups')}
//                           </div>
//                           <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
//                             {skillGroupsList.slice(0, 3).map((group, idx) => (
//                               <span key={idx} style={{
//                                 fontSize: '12px',
//                                 background: 'rgba(15, 78, 169, 0.06)',
//                                 color: '#17263a',
//                                 padding: '2px 10px',
//                                 borderRadius: '12px',
//                                 border: '1px solid rgba(15, 78, 169, 0.08)',
//                                 display: 'inline-flex',
//                                 alignItems: 'center',
//                                 gap: '4px'
//                               }}>
//                                 {group.name}
//                                 {group.experience && (
//                                   <span style={{ 
//                                     fontSize: '10px',
//                                     color: '#0f4ea9',
//                                     fontWeight: 600
//                                   }}>
//                                     ({group.experience})
//                                   </span>
//                                 )}
//                               </span>
//                             ))}
//                             {skillGroupsList.length > 3 && (
//                               <span style={{
//                                 fontSize: '12px',
//                                 color: 'rgba(23,38,58,0.5)',
//                                 padding: '2px 10px',
//                               }}>
//                                 +{skillGroupsList.length - 3} more
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       )}

//                       {totalToolsCount > 0 && (
//                         <div style={{ marginBottom: '6px' }}>
//                           <div 
//                             style={{ 
//                               display: 'flex', 
//                               alignItems: 'center', 
//                               justifyContent: 'space-between',
//                               cursor: 'pointer',
//                               padding: '4px 0',
//                             }}
//                             onClick={toggleToolsExpansion}
//                           >
//                             <div style={{ 
//                               fontSize: '11px', 
//                               fontWeight: 600, 
//                               color: 'rgba(23,38,58,0.5)',
//                               textTransform: 'uppercase',
//                               letterSpacing: '0.5px',
//                               display: 'flex',
//                               alignItems: 'center',
//                               gap: '6px'
//                             }}>
//                               <IconWrench style={{ color: 'rgba(23,38,58,0.4)', width: '12px', height: '12px' }} />
//                               {t('wizard.step3.toolsCertifications')}
//                               <span style={{
//                                 fontSize: '11px',
//                                 color: selectedToolsCount === totalToolsCount ? '#2fb463' : '#0f4ea9',
//                                 fontWeight: 600,
//                               }}>
//                                 ({selectedToolsCount}/{totalToolsCount})
//                               </span>
//                             </div>
//                             <IconChevronRight style={{ 
//                               transform: expandedTools ? 'rotate(90deg)' : 'rotate(0deg)',
//                               transition: 'transform 0.2s',
//                               color: 'rgba(23,38,58,0.4)',
//                               width: '14px',
//                               height: '14px'
//                             }} />
//                           </div>
                          
//                           {expandedTools && (
//                             <div style={{ 
//                               marginTop: '6px',
//                               padding: '8px 10px',
//                               background: 'rgba(15, 78, 169, 0.03)',
//                               borderRadius: '6px',
//                               border: '1px solid rgba(15, 78, 169, 0.06)',
//                               maxHeight: '120px',
//                               overflowY: 'auto'
//                             }}>
//                               <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
//                                 {Object.keys(toolsCertifications)
//                                   .filter(key => toolsCertifications[key] === true)
//                                   .slice(0, 8)
//                                   .map((tool, idx) => (
//                                     <span key={idx} style={{
//                                       fontSize: '11px',
//                                       background: 'rgba(47, 180, 99, 0.08)',
//                                       color: '#065f46',
//                                       padding: '2px 8px',
//                                       borderRadius: '12px',
//                                       border: '1px solid rgba(47, 180, 99, 0.1)',
//                                       display: 'inline-flex',
//                                       alignItems: 'center',
//                                       gap: '2px'
//                                     }}>
//                                       <IconCheck style={{ width: '10px', height: '10px' }} />
//                                       {tool}
//                                     </span>
//                                   ))}
//                                 {Object.keys(toolsCertifications).filter(key => toolsCertifications[key] === true).length > 8 && (
//                                   <span style={{
//                                     fontSize: '11px',
//                                     color: 'rgba(23,38,58,0.5)',
//                                     padding: '2px 8px',
//                                   }}>
//                                     +{Object.keys(toolsCertifications).filter(key => toolsCertifications[key] === true).length - 8} more
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       )}

//                       {totalHeavyCount > 0 && (
//                         <div style={{ marginTop: '4px' }}>
//                           <div style={{ 
//                             fontSize: '11px', 
//                             color: 'rgba(23,38,58,0.5)',
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '6px'
//                           }}>
//                             🚜 {t('wizard.step3.heavyEquipment')}
//                             <span style={{
//                               fontSize: '11px',
//                               color: selectedHeavyCount === totalHeavyCount ? '#2fb463' : '#0f4ea9',
//                               fontWeight: 600,
//                             }}>
//                               ({selectedHeavyCount}/{totalHeavyCount})
//                             </span>
//                           </div>
//                           {selectedHeavyCount > 0 && (
//                             <div style={{ 
//                               display: 'flex', 
//                               flexWrap: 'wrap', 
//                               gap: '4px',
//                               marginTop: '4px'
//                             }}>
//                               {Object.keys(heavyEquipment)
//                                 .filter(key => heavyEquipment[key] === true)
//                                 .slice(0, 4)
//                                 .map((item, idx) => (
//                                   <span key={idx} style={{
//                                     fontSize: '10px',
//                                     background: 'rgba(15, 78, 169, 0.06)',
//                                     color: '#17263a',
//                                     padding: '1px 8px',
//                                     borderRadius: '10px',
//                                     border: '1px solid rgba(15, 78, 169, 0.08)',
//                                   }}>
//                                     {item}
//                                   </span>
//                                 ))}
//                               {Object.keys(heavyEquipment).filter(key => heavyEquipment[key] === true).length > 4 && (
//                                 <span style={{
//                                   fontSize: '10px',
//                                   color: 'rgba(23,38,58,0.5)',
//                                   padding: '1px 8px',
//                                 }}>
//                                   +{Object.keys(heavyEquipment).filter(key => heavyEquipment[key] === true).length - 4}
//                                 </span>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       )}
//                     </>
//                   ) : (
//                     <div style={{ color: 'rgba(23,38,58,0.4)', fontSize: '14px', textAlign: 'center', padding: '12px 0' }}>
//                       {t('summary.noTradeInfo')}
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Subscription & Rewards Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', minHeight: '280px' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.subscription')}</span>
//                 </div>
//                 <div>
//                   <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.activePlan')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Pro</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.planTier')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>Professional</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.renews')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{t('summary.renewsDate')}</span>
//                     </div>
//                   </div>
//                   <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(15,78,169,0.06)', borderRadius: '8px', textAlign: 'center' }}>
//                     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
//                       <IconTrophy style={{ color: '#f59e0b', width: '20px', height: '20px' }} />
//                       <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f4ea9' }}>12</span>
//                       <span style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>{t('summary.tradePoints')}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ============================================================
//             Row 2: Work History
//             ============================================================ */}
//             <div className="wizardSummaryWideCard" style={{ 
//               padding: '20px', 
//               border: '1px solid rgba(18,38,63,0.08)', 
//               borderRadius: '12px', 
//               background: 'white', 
//               marginBottom: '20px' 
//             }}>
//               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                 <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.workHistory')}</span>
//                 <button 
//                   type="button" 
//                   onClick={handleEditWorkHistory}
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
              
//               {projects.length > 0 ? (
//                 <div>
//                   <div style={{ 
//                     display: 'grid', 
//                     gridTemplateColumns: '1.5fr 1.5fr 1.2fr 0.8fr', 
//                     gap: '12px', 
//                     padding: '10px 12px', 
//                     borderBottom: '2px solid rgba(18,38,63,0.08)', 
//                     fontWeight: 600, 
//                     fontSize: '11px', 
//                     color: 'rgba(23,38,58,0.5)', 
//                     textTransform: 'uppercase', 
//                     letterSpacing: '0.5px',
//                     backgroundColor: 'rgba(15, 78, 169, 0.03)',
//                     borderRadius: '8px 8px 0 0',
//                   }}>
//                     <div>{t('summary.project')}</div>
//                     <div>{t('summary.company')}</div>
//                     <div>{t('summary.trade')}</div>
//                     <div style={{ textAlign: 'center' }}>Dates</div>
//                   </div>

//                   {projects.map((p, idx) => {
//                     const projectTrade = p.trade || p.projectTrade || p.primaryTrade || p.tradeType || (p.trade && p.trade.name) || ''
//                     const projectCompany = p.client || p.company || ''
//                     const startDate = p.start || p.startDate || ''
//                     const endDate = p.end || p.endDate || ''
//                     const dateDisplay = startDate || endDate ? `${startDate} - ${endDate}` : '—'
                    
//                     return (
//                       <div 
//                         key={idx} 
//                         style={{ 
//                           display: 'grid', 
//                           gridTemplateColumns: '1.5fr 1.5fr 1.2fr 0.8fr', 
//                           gap: '12px', 
//                           padding: '12px 12px', 
//                           borderBottom: idx < projects.length - 1 ? '1px solid rgba(18,38,63,0.06)' : 'none',
//                           fontSize: '14px', 
//                           color: '#17263a',
//                           backgroundColor: idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
//                           transition: 'background-color 0.2s',
//                         }}
//                         onMouseEnter={(e) => {
//                           if (idx % 2 === 0) {
//                             e.currentTarget.style.backgroundColor = 'rgba(15, 78, 169, 0.06)'
//                           } else {
//                             e.currentTarget.style.backgroundColor = 'rgba(15, 78, 169, 0.04)'
//                           }
//                         }}
//                         onMouseLeave={(e) => {
//                           e.currentTarget.style.backgroundColor = idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent'
//                         }}
//                       >
//                         <div style={{ 
//                           fontWeight: 500, 
//                           color: '#0f4ea9',
//                           wordBreak: 'break-word',
//                           display: 'flex',
//                           alignItems: 'center',
//                           gap: '6px'
//                         }}>
//                           <span style={{
//                             display: 'inline-flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             width: '20px',
//                             height: '20px',
//                             borderRadius: '50%',
//                             background: 'rgba(15, 78, 169, 0.1)',
//                             color: '#0f4ea9',
//                             fontSize: '10px',
//                             fontWeight: 700,
//                             flexShrink: 0
//                           }}>
//                             {idx + 1}
//                           </span>
//                           {displayValue(p.name, 'Untitled Project')}
//                         </div>
//                         <div style={{ wordBreak: 'break-word', color: '#17263a' }}>{displayValue(projectCompany)}</div>
//                         <div>
//                           {projectTrade ? (
//                             <span style={{
//                               display: 'inline-block',
//                               padding: '2px 10px',
//                               background: 'rgba(15, 78, 169, 0.08)',
//                               borderRadius: '12px',
//                               fontSize: '12px',
//                               color: '#0f4ea9',
//                               fontWeight: 500,
//                             }}>
//                               {projectTrade}
//                             </span>
//                           ) : (
//                             <span style={{ color: 'rgba(23,38,58,0.4)' }}>—</span>
//                           )}
//                         </div>
//                         <div style={{ 
//                           textAlign: 'center', 
//                           fontSize: '12px', 
//                           color: 'rgba(23,38,58,0.6)',
//                           fontWeight: 500,
//                           whiteSpace: 'nowrap'
//                         }}>
//                           {dateDisplay}
//                         </div>
//                       </div>
//                     )
//                   })}
//                 </div>
//               ) : (
//                 <div style={{ 
//                   textAlign: 'center', 
//                   padding: '40px 20px',
//                   color: 'rgba(23,38,58,0.4)',
//                   fontSize: '14px',
//                 }}>
//                   <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
//                   <div>{t('summary.noProjects')}</div>
//                   <div style={{ fontSize: '12px', marginTop: '4px' }}>
//                     Add your work history to showcase your experience
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* ============================================================
//             Row 3: Availability, Certifications, Tax, Payment
//             ============================================================ */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Availability & Rate Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.availabilityRate')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditAvailability}
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
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.hourlyRate')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(availability.hourlyRate ? `$${availability.hourlyRate}` : '—')}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.travel')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{availability.willingToTravel === 'yes' ? t('summary.yes') : t('summary.no')}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.available')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{availabilityText}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* ✅ UPDATED Certifications & Safety Card - Now reads from trade.toolsCertifications */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.certifications')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditCertifications}
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
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.certificationsList')}</span>
//                       <span style={{ 
//                         color: finalCertNames.length > 0 ? '#17263a' : 'rgba(23,38,58,0.4)', 
//                         fontWeight: 500, 
//                         textAlign: 'right', 
//                         maxWidth: '60%',
//                         wordBreak: 'break-word',
//                         fontSize: '13px'
//                       }}>
//                         {finalCertNames.length > 0 ? (
//                           finalCertNames.slice(0, 3).join(', ') + (finalCertNames.length > 3 ? ` +${finalCertNames.length - 3} more` : '')
//                         ) : (
//                           t('summary.noCertifications')
//                         )}
//                       </span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.safety')}</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         {finalCertNames.length > 0 ? (
//                           <>
//                             <IconCheckCircle style={{ width: '16px', height: '16px', color: '#2fb463' }} />
//                             {finalCertNames.length} {finalCertNames.length === 1 ? 'certification' : 'certifications'}
//                           </>
//                         ) : (
//                           '--'
//                         )}
//                       </span>
//                     </div>
//                     {/* Show count of selected certifications */}
//                     {finalCertNames.length > 0 && (
//                       <div style={{
//                         marginTop: '4px',
//                         padding: '6px 10px',
//                         background: 'rgba(15, 78, 169, 0.04)',
//                         borderRadius: '6px',
//                         fontSize: '11px',
//                         color: 'rgba(23,38,58,0.5)',
//                         display: 'flex',
//                         flexWrap: 'wrap',
//                         gap: '4px'
//                       }}>
//                         {finalCertNames.slice(0, 5).map((cert, idx) => (
//                           <span key={idx} style={{
//                             background: 'rgba(47, 180, 99, 0.08)',
//                             color: '#065f46',
//                             padding: '1px 8px',
//                             borderRadius: '10px',
//                             fontSize: '10px',
//                             border: '1px solid rgba(47, 180, 99, 0.1)'
//                           }}>
//                             {cert}
//                           </span>
//                         ))}
//                         {finalCertNames.length > 5 && (
//                           <span style={{
//                             color: 'rgba(23,38,58,0.4)',
//                             fontSize: '10px',
//                             padding: '1px 4px'
//                           }}>
//                             +{finalCertNames.length - 5} more
//                           </span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Tax Profile Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.taxProfile')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditTax}
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
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.classification')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{taxText}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.taxVerified')}</span>
//                       <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
//                         --
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Payment/Bank Details Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.paymentDetails')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditPayment}
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
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.bank')}</span>
//                       <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(bankName)}</span>
//                     </div>
//                     <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
//                       <span style={{ color: 'rgba(23,38,58,0.6)' }}>ACH</span>
//                       <span style={{ 
//                         color: achEnabled === t('summary.enabled') ? '#2fb463' : 'rgba(23,38,58,0.6)', 
//                         fontWeight: 500, 
//                         display: 'flex', 
//                         alignItems: 'center', 
//                         gap: '4px' 
//                       }}>
//                         {achEnabled === t('summary.enabled') ? (
//                           <>
//                             <IconCheckCircle style={{ width: '16px', height: '16px', color: '#2fb463' }} /> {t('summary.enabled')}
//                           </>
//                         ) : (
//                           t('summary.notEnabled')
//                         )}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* ============================================================
//             Row 4: Medical Details & Emergency Contact
//             ============================================================ */}
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
//               {/* Medical Details Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.medicalDetails')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditMedical}
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
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.bloodGroup')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(medical.bloodGroup)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.allergies')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{allergiesText}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Emergency Contact Card */}
//               <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//                   <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.emergencyContact')}</span>
//                   <button 
//                     type="button" 
//                     onClick={handleEditEmergency}
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
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.name')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(emergency.emergencyContactName)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.relationship')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(emergency.emergencyContactRelationship)}</div>
//                     </div>
//                     <div>
//                       <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.phone')}</span>
//                       <div style={{ fontSize: '14px', color: '#17263a' }}>{formatPhone(emergency.emergencyContactPhone)}</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default WorkerSummaryPage










// src/worker/pages/WorkerSummaryPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TopNav } from '../../common/components/TopNav'
import workerService from '../services/workerService'
import api from '../../services/api'

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

function IconChevronRight(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z" fill="currentColor" />
    </svg>
  )
}

function IconChevronDown(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconCheck(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconWrench(props) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M22 6.5L17.5 11 13 6.5 17.5 2 22 6.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 20L12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 12l-4 4 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconMultipleTrades(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h10v2H4v-2z" fill="currentColor"/>
    </svg>
  )
}

export function WorkerSummaryPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  
  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [profile, setProfile] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [profileImage, setProfileImage] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [expandedTrade, setExpandedTrade] = useState(null)
  const [expandedTools, setExpandedTools] = useState(false)
  const [expandedTrades, setExpandedTrades] = useState({})

  // ============================================================
  // ✅ GET FRESH PROFILE IMAGE URL
  // ============================================================
  
  const getFreshProfileImage = async (fileKey) => {
    if (!fileKey) return null
    
    try {
      console.log('🔄 Getting fresh profile image URL for:', fileKey)
      setImageLoading(true)
      
      const response = await api.get(`/upload/view/${encodeURIComponent(fileKey)}`)
      
      if (response.data.success && response.data.data.viewUrl) {
        console.log('✅ Fresh profile image URL generated')
        return response.data.data.viewUrl
      }
      return null
    } finally {
      setImageLoading(false)
    }
  }

  // ============================================================
  // ✅ ALWAYS FETCH FROM DYNAMODB
  // ============================================================
  
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const userId = localStorage.getItem('userId')
        
        if (!userId) {
          setError('User not logged in. Please login again.')
          setLoading(false)
          return
        }

        console.log('📊 Fetching profile from DynamoDB for user:', userId)
        
        const result = await workerService.getWorkerProfile(userId)
        
        if (result.success && result.data) {
          console.log('✅ Profile loaded from DynamoDB')
          setProfile(result.data)
          
          const basics = result.data.basics || {}
          if (basics.profileImageKey) {
            const freshUrl = await getFreshProfileImage(basics.profileImageKey)
            if (freshUrl) {
              setProfileImage(freshUrl)
              setProfile(prev => ({
                ...prev,
                basics: {
                  ...prev.basics,
                  profilePreview: freshUrl
                }
              }))
            } else if (basics.profilePreview) {
              setProfileImage(basics.profilePreview)
            }
          } else {
            setProfileImage('/assets/worker.avif')
          }
          
          setError('')
        } else {
          setError('No profile data found. Please complete the wizard.')
        }
      } catch (error) {
        console.error('❌ Error loading profile:', error)
        setError(error.message || 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [])

  // ============================================================
  // DATA EXTRACTION
  // ============================================================
  
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

  // ✅ FIX: Get ALL trades from tradeRows
  const tradeRows = trade.tradeRows || []
  const allTrades = tradeRows.map(row => row.trade).filter(Boolean)
  
  // If no tradeRows, fallback to mainTrade
  const mainTrade = trade.mainTrade || ''
  const trades = allTrades.length > 0 ? allTrades : (mainTrade ? [mainTrade] : [])
  
  const skillGroups = trade.skillGroups || {}
  const skillDetails = trade.skillDetails || {}
  const toolsCertifications = trade.toolsCertifications || {}
  const heavyEquipment = trade.heavyEquipment || {}

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

  const formatPhone = (phone) => {
    if (!phone) return '—'
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
    }
    return phone
  }

  const fullName = [basics.legalFirstName, basics.legalLastName].filter(Boolean).join(' ') || '—'
  const address = [basics.addressLine1, basics.city, basics.stateCode, basics.zip].filter(Boolean).join(', ')
  
  const language = basics.english ? (basics.spanish ? t('summary.languages.both') : t('summary.languages.english')) : (basics.spanish ? t('summary.languages.spanish') : '—')
  
  // ✅ FIX: Get certifications from trade.toolsCertifications (WizardStep3 data)
  const toolsCerts = toolsCertifications || {}
  const certNames = Object.keys(toolsCerts).filter(key => toolsCerts[key] === true)
  
  // Also check certifications.certChecklist for backward compatibility
  const certChecklist = certifications.certChecklist || {}
  const legacyCertNames = Object.keys(certChecklist).filter(key => certChecklist[key])
  
  // Prefer toolsCertifications, fallback to legacy certChecklist
  const finalCertNames = certNames.length > 0 ? certNames : legacyCertNames
  const certText = finalCertNames.length > 0 ? finalCertNames.join(', ') : t('summary.noCertifications')
  
  const avail = availability.availability || {}
  const availableDays = Object.keys(avail).filter(key => avail[key])
  const availabilityText = availableDays.length > 0 ? availableDays.map(d => t(`summary.days.${d.toLowerCase()}`) || d.charAt(0).toUpperCase() + d.slice(1)).join(', ') : t('summary.notSpecified')
  
  const taxPath = tax.classificationPath || ''
  const taxText = taxPath === 'employee' ? t('summary.w2Employee') : taxPath === 'subcontractor' ? t('summary.contractor') : '—'
  
  const medicalFlags = medical.emergencyMedicalFlags || {}
  const allergies = Object.keys(medicalFlags).filter(key => medicalFlags[key])
  const allergiesText = allergies.length > 0 ? allergies.join(', ') : t('summary.noAllergies')
  
  const bankName = payment.bankName || t('summary.notSet')
  const achEnabled = payment.achEnabled ? t('summary.enabled') : t('summary.notEnabled')

  const fallbackProjects = [
    { name: t('summary.noProjects'), client: '—', role: '—', trade: '—' },
  ]

  const imageSrc = profileImage || basics.profilePreview || "/assets/worker.avif"

  const selectedToolsCount = Object.values(toolsCertifications).filter(v => v === true).length
  const totalToolsCount = Object.keys(toolsCertifications).length

  const selectedHeavyCount = Object.values(heavyEquipment).filter(v => v === true).length
  const totalHeavyCount = Object.keys(heavyEquipment).length

  const getSkillGroupsWithDetails = () => {
    const groups = Object.keys(skillGroups).filter(key => skillGroups[key] === true)
    return groups.map(group => ({
      name: group,
      experience: skillDetails[group]?.experience || '',
      years: skillDetails[group]?.years || '',
      skills: skillDetails[group]?.skills || {}
    }))
  }

  const skillGroupsList = getSkillGroupsWithDetails()

  // ✅ Get all skill groups organized by trade
  const getTradesWithSkillGroups = () => {
    return trades.map(tradeName => {
      // Find the trade row for this trade
      const tradeRow = tradeRows.find(row => row.trade === tradeName)
      if (!tradeRow) {
        return {
          trade: tradeName,
          skillGroups: [],
          skillDetails: {}
        }
      }
      
      const groups = Object.keys(tradeRow.skillGroups || {}).filter(key => tradeRow.skillGroups[key] === true)
      const details = tradeRow.skillDetails || {}
      
      return {
        trade: tradeName,
        skillGroups: groups.map(group => ({
          name: group,
          experience: details[group]?.experience || '',
          years: details[group]?.years || '',
          skills: details[group]?.skills || {}
        })),
        skillDetails: details
      }
    })
  }

  const tradesWithSkillGroups = getTradesWithSkillGroups()

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
        tradeData: {
          tradeRows: tradeRows,
          toolsCertifications: trade.toolsCertifications || {},
          heavyEquipment: trade.heavyEquipment || {},
        },
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
        certData: {
          certChecklist: certifications.certChecklist || {},
          certRows: certifications.certRows || [],
          safetyFlags: certifications.safetyFlags || {},
        },
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
  // TRADE DISPLAY HELPERS
  // ============================================================
  
  const getLevelAbbreviation = (level) => {
    if (level === 'Helper') return 'H'
    if (level === 'Apprentice') return 'A'
    if (level === 'Skilled Worker') return 'SW'
    if (level === 'Journeyman/Mechanic') return 'J'
    if (level === 'Lead') return 'L'
    if (level === 'Foreman') return 'F'
    if (level === 'Lead/Foreman') return 'LF'
    return level
  }

  const toggleTradeExpansion = (tradeName) => {
    setExpandedTrades(prev => ({
      ...prev,
      [tradeName]: !prev[tradeName]
    }))
  }

  const toggleToolsExpansion = () => {
    setExpandedTools(!expandedTools)
  }

  // ============================================================
  // RENDER - LOADING STATE
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
          <p style={{ color: '#17263a' }}>{t('summary.loading')}</p>
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

  // ============================================================
  // RENDER - ERROR STATE
  // ============================================================
  
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
            {t('summary.goToWizard')}
          </button>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER - MAIN CONTENT
  // ============================================================
  
  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavMain">
            <div className="sideGroupLabel">{t('summary.workspace')}</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
                <span className="sideText">{t('summary.overview')}</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
                <span className="sideText">{t('summary.projects')}</span>
                <span className="sideBadge" aria-label="12 projects">12</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconChart /></span>
                <span className="sideText">{t('summary.revenues')}</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true"><IconUser /></span>
                <span className="sideText">{t('summary.profile')}</span>
              </a>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">{t('summary.general')}</div>
            <nav className="sideGroup" aria-label="General">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon" aria-hidden="true"><IconLogout /></span>
                <span className="sideText">{t('summary.signOut')}</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
                <span className="sideText">{t('summary.support')}</span>
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
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', minHeight: '280px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.basicInfo')}</span>
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
                    <img 
                      src={imageSrc} 
                      alt="Profile" 
                      style={{ 
                        width: '48px', 
                        height: '48px', 
                        borderRadius: '50%', 
                        objectFit: 'cover',
                        background: '#f0f0f0',
                        flexShrink: 0
                      }}
                      onError={(e) => {
                        e.target.src = '/assets/worker.avif'
                      }}
                    />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '16px', color: '#17263a', wordBreak: 'break-word' }}>
                        {fullName}
                      </div>
                      <span style={{ fontSize: '12px', color: '#e0d616', fontWeight: 500 }}>{t('summary.pending')}</span>
                    </div>
                  </div>
                  
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1fr 1fr', 
                    gap: '6px 16px',
                    marginTop: '4px'
                  }}>
                    <div>
                      <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                        {t('summary.dob')}
                      </span>
                      <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500 }}>
                        {displayValue(basics.dob)}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                        {t('summary.language')}
                      </span>
                      <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500 }}>
                        {language}
                      </div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                        {t('summary.email')}
                      </span>
                      <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500, wordBreak: 'break-all' }}>
                        {displayValue(basics.emailAddress)}
                      </div>
                    </div>
                    <div>
                      <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                        {t('summary.phone')}
                      </span>
                      <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500 }}>
                        {formatPhone(basics.mobilePhone)}
                      </div>
                    </div>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <span style={{ fontSize: '11px', color: 'rgba(23,38,58,0.5)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                        {t('summary.address')}
                      </span>
                      <div style={{ fontSize: '14px', color: '#17263a', fontWeight: 500, wordBreak: 'break-word' }}>
                        {displayValue(address)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ UPDATED Trade Profile Card - Supports Multiple Trades */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', minHeight: '280px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>
                    {t('summary.tradeProfile')}
                    {trades.length > 1 && (
                      <span style={{
                        fontSize: '11px',
                        fontWeight: 400,
                        color: 'rgba(23,38,58,0.5)',
                        marginLeft: '8px'
                      }}>
                        ({trades.length} trades)
                      </span>
                    )}
                  </span>
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
                  {trades.length > 0 ? (
                    <>
                      {/* Show all trades with skill groups */}
                      {tradesWithSkillGroups.map((tradeData, index) => {
                        const isExpanded = expandedTrades[tradeData.trade] || false
                        const groupCount = tradeData.skillGroups.length
                        const hasSkillGroups = groupCount > 0
                        
                        return (
                          <div key={tradeData.trade} style={{ marginBottom: index < tradesWithSkillGroups.length - 1 ? '12px' : '0' }}>
                            {/* Trade header - clickable to expand */}
                            <div 
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                cursor: 'pointer',
                                padding: '6px 10px',
                                borderRadius: '6px',
                                background: isExpanded ? 'rgba(15, 78, 169, 0.05)' : 'rgba(15, 78, 169, 0.02)',
                                border: isExpanded ? '1px solid rgba(15, 78, 169, 0.15)' : '1px solid rgba(18,38,63,0.06)',
                                transition: 'all 0.2s ease',
                              }}
                              onClick={() => toggleTradeExpansion(tradeData.trade)}
                              onMouseEnter={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isExpanded) {
                                  e.currentTarget.style.background = 'rgba(15, 78, 169, 0.02)'
                                }
                              }}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                                <span style={{
                                  fontSize: '13px',
                                  fontWeight: 600,
                                  color: '#17263a',
                                }}>
                                  {tradeData.trade}
                                </span>
                                {hasSkillGroups && (
                                  <span style={{
                                    fontSize: '10px',
                                    color: 'rgba(23,38,58,0.4)',
                                    background: 'rgba(23,38,58,0.06)',
                                    padding: '1px 8px',
                                    borderRadius: '10px',
                                  }}>
                                    {groupCount} skills
                                  </span>
                                )}
                                {!hasSkillGroups && (
                                  <span style={{
                                    fontSize: '10px',
                                    color: 'rgba(23,38,58,0.3)',
                                    fontStyle: 'italic',
                                  }}>
                                    No skills added
                                  </span>
                                )}
                              </div>
                              {isExpanded ? (
                                <IconChevronDown style={{ width: '14px', height: '14px', color: 'rgba(23,38,58,0.4)' }} />
                              ) : (
                                <IconChevronRight style={{ width: '14px', height: '14px', color: 'rgba(23,38,58,0.4)' }} />
                              )}
                            </div>

                            {/* Expanded skill groups */}
                            {isExpanded && hasSkillGroups && (
                              <div style={{
                                marginTop: '6px',
                                padding: '8px 10px',
                                background: 'rgba(15, 78, 169, 0.03)',
                                borderRadius: '6px',
                                border: '1px solid rgba(15, 78, 169, 0.06)',
                              }}>
                                {tradeData.skillGroups.map((group, idx) => (
                                  <div key={idx} style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px',
                                    padding: '4px 0',
                                    fontSize: '12px',
                                    color: '#17263a',
                                    borderBottom: idx < tradeData.skillGroups.length - 1 ? '1px solid rgba(18,38,63,0.04)' : 'none',
                                  }}>
                                    <span style={{ fontWeight: 500 }}>{group.name}</span>
                                    {group.experience && (
                                      <span style={{
                                        fontSize: '10px',
                                        color: '#0f4ea9',
                                        background: 'rgba(15, 78, 169, 0.08)',
                                        padding: '1px 8px',
                                        borderRadius: '10px',
                                        fontWeight: 500,
                                      }}>
                                        {group.experience}
                                      </span>
                                    )}
                                    {group.years && (
                                      <span style={{
                                        fontSize: '10px',
                                        color: 'rgba(23,38,58,0.5)',
                                        background: 'rgba(23,38,58,0.06)',
                                        padding: '1px 8px',
                                        borderRadius: '10px',
                                      }}>
                                        {group.years} yrs
                                      </span>
                                    )}
                                    {Object.keys(group.skills).filter(s => group.skills[s] === true).length > 0 && (
                                      <span style={{
                                        fontSize: '10px',
                                        color: '#2fb463',
                                        background: 'rgba(47, 180, 99, 0.08)',
                                        padding: '1px 8px',
                                        borderRadius: '10px',
                                      }}>
                                        {Object.keys(group.skills).filter(s => group.skills[s] === true).length} skills
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )
                      })}
                      
                      {/* Tools & Certifications Summary */}
                      {totalToolsCount > 0 && (
                        <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid rgba(18,38,63,0.06)' }}>
                          <div 
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'space-between',
                              cursor: 'pointer',
                              padding: '4px 0',
                            }}
                            onClick={toggleToolsExpansion}
                          >
                            <div style={{ 
                              fontSize: '11px', 
                              fontWeight: 600, 
                              color: 'rgba(23,38,58,0.5)',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px'
                            }}>
                              <IconWrench style={{ color: 'rgba(23,38,58,0.4)', width: '12px', height: '12px' }} />
                              {t('wizard.step3.toolsCertifications')}
                              <span style={{
                                fontSize: '11px',
                                color: selectedToolsCount === totalToolsCount ? '#2fb463' : '#0f4ea9',
                                fontWeight: 600,
                              }}>
                                ({selectedToolsCount}/{totalToolsCount})
                              </span>
                            </div>
                            <IconChevronRight style={{ 
                              transform: expandedTools ? 'rotate(90deg)' : 'rotate(0deg)',
                              transition: 'transform 0.2s',
                              color: 'rgba(23,38,58,0.4)',
                              width: '14px',
                              height: '14px'
                            }} />
                          </div>
                          
                          {expandedTools && (
                            <div style={{ 
                              marginTop: '6px',
                              padding: '8px 10px',
                              background: 'rgba(15, 78, 169, 0.03)',
                              borderRadius: '6px',
                              border: '1px solid rgba(15, 78, 169, 0.06)',
                              maxHeight: '120px',
                              overflowY: 'auto'
                            }}>
                              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                {Object.keys(toolsCertifications)
                                  .filter(key => toolsCertifications[key] === true)
                                  .slice(0, 8)
                                  .map((tool, idx) => (
                                    <span key={idx} style={{
                                      fontSize: '11px',
                                      background: 'rgba(47, 180, 99, 0.08)',
                                      color: '#065f46',
                                      padding: '2px 8px',
                                      borderRadius: '12px',
                                      border: '1px solid rgba(47, 180, 99, 0.1)',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '2px'
                                    }}>
                                      <IconCheck style={{ width: '10px', height: '10px' }} />
                                      {tool}
                                    </span>
                                  ))}
                                {Object.keys(toolsCertifications).filter(key => toolsCertifications[key] === true).length > 8 && (
                                  <span style={{
                                    fontSize: '11px',
                                    color: 'rgba(23,38,58,0.5)',
                                    padding: '2px 8px',
                                  }}>
                                    +{Object.keys(toolsCertifications).filter(key => toolsCertifications[key] === true).length - 8} more
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Heavy Equipment Summary */}
                      {totalHeavyCount > 0 && (
                        <div style={{ marginTop: '8px' }}>
                          <div style={{ 
                            fontSize: '11px', 
                            color: 'rgba(23,38,58,0.5)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px'
                          }}>
                            🚜 {t('wizard.step3.heavyEquipment')}
                            <span style={{
                              fontSize: '11px',
                              color: selectedHeavyCount === totalHeavyCount ? '#2fb463' : '#0f4ea9',
                              fontWeight: 600,
                            }}>
                              ({selectedHeavyCount}/{totalHeavyCount})
                            </span>
                          </div>
                          {selectedHeavyCount > 0 && (
                            <div style={{ 
                              display: 'flex', 
                              flexWrap: 'wrap', 
                              gap: '4px',
                              marginTop: '4px'
                            }}>
                              {Object.keys(heavyEquipment)
                                .filter(key => heavyEquipment[key] === true)
                                .slice(0, 4)
                                .map((item, idx) => (
                                  <span key={idx} style={{
                                    fontSize: '10px',
                                    background: 'rgba(15, 78, 169, 0.06)',
                                    color: '#17263a',
                                    padding: '1px 8px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(15, 78, 169, 0.08)',
                                  }}>
                                    {item}
                                  </span>
                                ))}
                              {Object.keys(heavyEquipment).filter(key => heavyEquipment[key] === true).length > 4 && (
                                <span style={{
                                  fontSize: '10px',
                                  color: 'rgba(23,38,58,0.5)',
                                  padding: '1px 8px',
                                }}>
                                  +{Object.keys(heavyEquipment).filter(key => heavyEquipment[key] === true).length - 4}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </>
                  ) : (
                    <div style={{ color: 'rgba(23,38,58,0.4)', fontSize: '14px', textAlign: 'center', padding: '12px 0' }}>
                      {t('summary.noTradeInfo')}
                    </div>
                  )}
                </div>
              </div>

              {/* Subscription & Rewards Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white', minHeight: '280px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.subscription')}</span>
                </div>
                <div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.activePlan')}</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>Pro</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.planTier')}</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>Professional</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.renews')}</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{t('summary.renewsDate')}</span>
                    </div>
                  </div>
                  <div style={{ marginTop: '12px', padding: '12px', background: 'rgba(15,78,169,0.06)', borderRadius: '8px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <IconTrophy style={{ color: '#f59e0b', width: '20px', height: '20px' }} />
                      <span style={{ fontSize: '20px', fontWeight: 700, color: '#0f4ea9' }}>12</span>
                      <span style={{ fontSize: '13px', color: 'rgba(23,38,58,0.6)' }}>{t('summary.tradePoints')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ============================================================
            Row 2: Work History
            ============================================================ */}
            <div className="wizardSummaryWideCard" style={{ 
              padding: '20px', 
              border: '1px solid rgba(18,38,63,0.08)', 
              borderRadius: '12px', 
              background: 'white', 
              marginBottom: '20px' 
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.workHistory')}</span>
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
              
              {projects.length > 0 ? (
                <div>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '1.5fr 1.5fr 1.2fr 0.8fr', 
                    gap: '12px', 
                    padding: '10px 12px', 
                    borderBottom: '2px solid rgba(18,38,63,0.08)', 
                    fontWeight: 600, 
                    fontSize: '11px', 
                    color: 'rgba(23,38,58,0.5)', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.5px',
                    backgroundColor: 'rgba(15, 78, 169, 0.03)',
                    borderRadius: '8px 8px 0 0',
                  }}>
                    <div>{t('summary.project')}</div>
                    <div>{t('summary.company')}</div>
                    <div>{t('summary.trade')}</div>
                    <div style={{ textAlign: 'center' }}>Dates</div>
                  </div>

                  {projects.map((p, idx) => {
                    const projectTrade = p.trade || p.projectTrade || p.primaryTrade || p.tradeType || (p.trade && p.trade.name) || ''
                    const projectCompany = p.client || p.company || ''
                    const startDate = p.start || p.startDate || ''
                    const endDate = p.end || p.endDate || ''
                    const dateDisplay = startDate || endDate ? `${startDate} - ${endDate}` : '—'
                    
                    return (
                      <div 
                        key={idx} 
                        style={{ 
                          display: 'grid', 
                          gridTemplateColumns: '1.5fr 1.5fr 1.2fr 0.8fr', 
                          gap: '12px', 
                          padding: '12px 12px', 
                          borderBottom: idx < projects.length - 1 ? '1px solid rgba(18,38,63,0.06)' : 'none',
                          fontSize: '14px', 
                          color: '#17263a',
                          backgroundColor: idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
                          transition: 'background-color 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          if (idx % 2 === 0) {
                            e.currentTarget.style.backgroundColor = 'rgba(15, 78, 169, 0.06)'
                          } else {
                            e.currentTarget.style.backgroundColor = 'rgba(15, 78, 169, 0.04)'
                          }
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent'
                        }}
                      >
                        <div style={{ 
                          fontWeight: 500, 
                          color: '#0f4ea9',
                          wordBreak: 'break-word',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: 'rgba(15, 78, 169, 0.1)',
                            color: '#0f4ea9',
                            fontSize: '10px',
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {idx + 1}
                          </span>
                          {displayValue(p.name, 'Untitled Project')}
                        </div>
                        <div style={{ wordBreak: 'break-word', color: '#17263a' }}>{displayValue(projectCompany)}</div>
                        <div>
                          {projectTrade ? (
                            <span style={{
                              display: 'inline-block',
                              padding: '2px 10px',
                              background: 'rgba(15, 78, 169, 0.08)',
                              borderRadius: '12px',
                              fontSize: '12px',
                              color: '#0f4ea9',
                              fontWeight: 500,
                            }}>
                              {projectTrade}
                            </span>
                          ) : (
                            <span style={{ color: 'rgba(23,38,58,0.4)' }}>—</span>
                          )}
                        </div>
                        <div style={{ 
                          textAlign: 'center', 
                          fontSize: '12px', 
                          color: 'rgba(23,38,58,0.6)',
                          fontWeight: 500,
                          whiteSpace: 'nowrap'
                        }}>
                          {dateDisplay}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '40px 20px',
                  color: 'rgba(23,38,58,0.4)',
                  fontSize: '14px',
                }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>📋</div>
                  <div>{t('summary.noProjects')}</div>
                  <div style={{ fontSize: '12px', marginTop: '4px' }}>
                    Add your work history to showcase your experience
                  </div>
                </div>
              )}
            </div>

            {/* ============================================================
            Row 3: Availability, Certifications, Tax, Payment
            ============================================================ */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              
              {/* Availability & Rate Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.availabilityRate')}</span>
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
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.hourlyRate')}</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(availability.hourlyRate ? `$${availability.hourlyRate}` : '—')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.travel')}</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{availability.willingToTravel === 'yes' ? t('summary.yes') : t('summary.no')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.available')}</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{availabilityText}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* ✅ UPDATED Certifications & Safety Card - Now reads from trade.toolsCertifications */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.certifications')}</span>
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
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.certificationsList')}</span>
                      <span style={{ 
                        color: finalCertNames.length > 0 ? '#17263a' : 'rgba(23,38,58,0.4)', 
                        fontWeight: 500, 
                        textAlign: 'right', 
                        maxWidth: '60%',
                        wordBreak: 'break-word',
                        fontSize: '13px'
                      }}>
                        {finalCertNames.length > 0 ? (
                          finalCertNames.slice(0, 3).join(', ') + (finalCertNames.length > 3 ? ` +${finalCertNames.length - 3} more` : '')
                        ) : (
                          t('summary.noCertifications')
                        )}
                      </span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.safety')}</span>
                      <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        {finalCertNames.length > 0 ? (
                          <>
                            <IconCheckCircle style={{ width: '16px', height: '16px', color: '#2fb463' }} />
                            {finalCertNames.length} {finalCertNames.length === 1 ? 'certification' : 'certifications'}
                          </>
                        ) : (
                          '--'
                        )}
                      </span>
                    </div>
                    {/* Show count of selected certifications */}
                    {finalCertNames.length > 0 && (
                      <div style={{
                        marginTop: '4px',
                        padding: '6px 10px',
                        background: 'rgba(15, 78, 169, 0.04)',
                        borderRadius: '6px',
                        fontSize: '11px',
                        color: 'rgba(23,38,58,0.5)',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '4px'
                      }}>
                        {finalCertNames.slice(0, 5).map((cert, idx) => (
                          <span key={idx} style={{
                            background: 'rgba(47, 180, 99, 0.08)',
                            color: '#065f46',
                            padding: '1px 8px',
                            borderRadius: '10px',
                            fontSize: '10px',
                            border: '1px solid rgba(47, 180, 99, 0.1)'
                          }}>
                            {cert}
                          </span>
                        ))}
                        {finalCertNames.length > 5 && (
                          <span style={{
                            color: 'rgba(23,38,58,0.4)',
                            fontSize: '10px',
                            padding: '1px 4px'
                          }}>
                            +{finalCertNames.length - 5} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tax Profile Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.taxProfile')}</span>
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
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.classification')}</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{taxText}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.taxVerified')}</span>
                      <span style={{ color: '#2fb463', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                        --
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment/Bank Details Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.paymentDetails')}</span>
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
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>{t('summary.bank')}</span>
                      <span style={{ color: '#17263a', fontWeight: 500 }}>{displayValue(bankName)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                      <span style={{ color: 'rgba(23,38,58,0.6)' }}>ACH</span>
                      <span style={{ 
                        color: achEnabled === t('summary.enabled') ? '#2fb463' : 'rgba(23,38,58,0.6)', 
                        fontWeight: 500, 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '4px' 
                      }}>
                        {achEnabled === t('summary.enabled') ? (
                          <>
                            <IconCheckCircle style={{ width: '16px', height: '16px', color: '#2fb463' }} /> {t('summary.enabled')}
                          </>
                        ) : (
                          t('summary.notEnabled')
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
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.medicalDetails')}</span>
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
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.bloodGroup')}</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(medical.bloodGroup)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.allergies')}</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{allergiesText}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact Card */}
              <div className="wizardSummaryCard" style={{ padding: '20px', border: '1px solid rgba(18,38,63,0.08)', borderRadius: '12px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <span style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>{t('summary.emergencyContact')}</span>
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
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.name')}</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(emergency.emergencyContactName)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.relationship')}</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{displayValue(emergency.emergencyContactRelationship)}</div>
                    </div>
                    <div>
                      <span style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)' }}>{t('summary.phone')}</span>
                      <div style={{ fontSize: '14px', color: '#17263a' }}>{formatPhone(emergency.emergencyContactPhone)}</div>
                    </div>
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

export default WorkerSummaryPage