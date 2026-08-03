
// // src/worker/pages/WorkerWizardPage.jsx
// import { useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'
// import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
// import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
// import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
// import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
// import { WizardStep5 } from '../components/wizard-steps/WizardStep5'
// import { WizardStep6 } from '../components/wizard-steps/WizardStep6'
// import wizardService from '../services/workerWizardService'
// import workerService from '../services/workerService'
// import { auth } from '../../firebase/config'

// // ✅ Helper function to convert YYYY-MM-DD to MM/DD/YYYY
// const formatDateForDisplay = (dateStr) => {
//   if (!dateStr) return ''
//   if (dateStr.includes('/')) return dateStr
//   const parts = dateStr.split('-')
//   if (parts.length === 3) {
//     return `${parts[1]}/${parts[2]}/${parts[0]}`
//   }
//   return dateStr
// }

// // Icons for sidebar
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

// export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   // ============================================================
//   // STATE MANAGEMENT
//   // ============================================================
  
//   const [step, setStep] = useState(1)
//   const maxStep = 6 // ✅ Updated to 6 steps
//   const [error, setError] = useState('')
//   const [isSaving, setIsSaving] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [isResuming, setIsResuming] = useState(false)
  
//   // ✅ Initialize with data from localStorage and location.state
//   const [wizardData, setWizardData] = useState(() => {
//     const firstName = localStorage.getItem('pendingFirstName') || ''
//     const lastName = localStorage.getItem('pendingLastName') || ''
//     const email = localStorage.getItem('pendingEmail') || ''
//     const phone = localStorage.getItem('pendingPhoneNumber') || ''
//     const dob = localStorage.getItem('pendingDob') || ''
//     const language = localStorage.getItem('pendingLanguage') || ''
    
//     const fromVerification = location?.state?.fromVerification || false
//     const state = location?.state || {}
    
//     return {
//       // Step 1: Personal Information
//       legalFirstName: fromVerification ? (state.firstName || firstName) : firstName,
//       legalLastName: fromVerification ? (state.lastName || lastName) : lastName,
//       emailAddress: fromVerification ? (state.email || email) : email,
//       mobilePhone: fromVerification ? (state.phoneNumber || phone) : phone,
//       dob: fromVerification 
//         ? (formatDateForDisplay(state.dob) || formatDateForDisplay(dob))
//         : formatDateForDisplay(dob),
//       addressLine1: '',
//       addressLine2: '',
//       city: '',
//       stateCode: '',
//       zip: '',
//       currentAddressLine1: '',
//       currentAddressLine2: '',
//       currentCity: '',
//       currentStateCode: '',
//       currentZip: '',
//       sameAsAddress: false,
//       english: fromVerification ? (state.language === 'en' || language === 'en') : (language === 'en'),
//       englishSpanish: false,
//       spanish: fromVerification ? (state.language === 'es' || language === 'es') : (language === 'es'),
//       profilePreview: '',
//       profileImageKey: '',
//       profileImageUrl: '',
//       acceptTerms: false,
//       acceptPrivacy: false,
//       consentElectronic: false,
//       certifyAccurate: false,

//       // Step 2: Trade Profile
//       mainTrade: '',
//       skillGroups: {},
//       skillDetails: {},

//       // Step 3: Tools, Certifications & Requirements
//       toolsCertifications: {},
//       heavyEquipment: {},

//       // Step 4: Work History
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],

//       // Step 5: Availability
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},

//       // Step 6: Emergency Contact & Certifications
//       emergencyContactName: '',
//       emergencyContactRelationship: '',
//       emergencyContactPhone: '',
//       policyAcks: {},
//       certChecklist: {},
//       certRows: [
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//       ],
//       safetyFlags: {},
//     }
//   })

//   // ============================================================
//   // ✅ ENSURE AUTH TOKEN IS SET (CRITICAL FOR AVATAR)
//   // ============================================================

//   useEffect(() => {
//     // ✅ Generate a session token
//     const generateSessionToken = () => {
//       return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//     }

//     // ✅ If authToken is passed from verification page, set it
//     if (location?.state?.authToken) {
//       localStorage.setItem('authToken', location.state.authToken)
//       console.log('✅ Auth token set from verification page')
//     }
    
//     // ✅ If we have userId but no authToken, create one
//     const userId = localStorage.getItem('userId')
//     const authToken = localStorage.getItem('authToken')
    
//     if (userId && !authToken) {
//       const sessionToken = generateSessionToken()
//       localStorage.setItem('authToken', sessionToken)
//       console.log('✅ New auth token created in wizard:', sessionToken)
//     }
    
//     // ✅ Set user name for avatar if available
//     if (location?.state?.firstName) {
//       localStorage.setItem('userFirstName', location.state.firstName)
//       localStorage.setItem('pendingFirstName', location.state.firstName)
//     }
//     if (location?.state?.lastName) {
//       localStorage.setItem('userLastName', location.state.lastName)
//       localStorage.setItem('pendingLastName', location.state.lastName)
//     }
    
//     // ✅ Trigger profile update event for avatar
//     const firstName = localStorage.getItem('userFirstName') || 
//                       localStorage.getItem('pendingFirstName') || 
//                       'User'
//     window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//       detail: { 
//         firstName: firstName,
//         profileImage: localStorage.getItem('userProfileImage')
//       }
//     }))
    
//     console.log('✅ Auth token check complete. Token exists:', !!localStorage.getItem('authToken'))
    
//   }, [location?.state])

//   // ============================================================
//   // LOAD WIZARD STATE - RESUME FEATURE
//   // ============================================================

//   useEffect(() => {
//     const loadWizardState = async () => {
//       try {
//         // ✅ If coming from verification page, use location.state
//         if (location?.state?.fromVerification) {
//           const state = location.state
//           console.log('✅ Wizard loaded from verification data:', state)
          
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: state.firstName || prev.legalFirstName || '',
//             legalLastName: state.lastName || prev.legalLastName || '',
//             emailAddress: state.email || prev.emailAddress || '',
//             mobilePhone: state.phoneNumber || prev.mobilePhone || '',
//             dob: formatDateForDisplay(state.dob) || prev.dob || '',
//             english: state.language === 'en' || prev.english || false,
//             spanish: state.language === 'es' || prev.spanish || false,
//           }))
          
//           setLoading(false)
//           return
//         }

//         // ✅ Check for existing data in localStorage
//         const firstName = localStorage.getItem('pendingFirstName')
//         const email = localStorage.getItem('pendingEmail')
//         const dob = localStorage.getItem('pendingDob')
        
//         if (firstName || email) {
//           console.log('✅ Loading wizard from localStorage')
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: firstName || prev.legalFirstName || '',
//             legalLastName: localStorage.getItem('pendingLastName') || prev.legalLastName || '',
//             emailAddress: email || prev.emailAddress || '',
//             mobilePhone: localStorage.getItem('pendingPhoneNumber') || prev.mobilePhone || '',
//             dob: formatDateForDisplay(dob) || prev.dob || '',
//             english: localStorage.getItem('pendingLanguage') === 'en' || prev.english || false,
//             spanish: localStorage.getItem('pendingLanguage') === 'es' || prev.spanish || false,
//           }))
          
//           setLoading(false)
//           return
//         }

//         // ✅ Normal flow - check user login and resume
//         let userId = localStorage.getItem('userId')
//         if (!userId) {
//           const user = auth.currentUser
//           if (user) {
//             userId = user.uid
//             localStorage.setItem('userId', userId)
//           }
//         }

//         if (!userId) {
//           console.log('No userId found, starting fresh wizard')
//           setLoading(false)
//           return
//         }

//         // ✅ Check resume
//         const resumeCheck = await wizardService.checkResume(userId)
        
//         if (resumeCheck.needsResume) {
//           setIsResuming(true)
//           const stepToResume = resumeCheck.step
          
//           console.log(`🔄 Resuming wizard from step ${stepToResume}`)
          
//           const progress = await wizardService.getProgress(userId)
          
//           if (progress.success && progress.data.steps) {
//             const savedData = {}
//             Object.keys(progress.data.steps).forEach(key => {
//               const stepNum = parseInt(key.replace('step', ''))
//               const stepKey = `step${stepNum}`
//               savedData[stepKey] = progress.data.steps[key]
//             })
            
//             setWizardData(prev => ({
//               ...prev,
//               ...savedData
//             }))
//           }
          
//           setStep(stepToResume)
//         } else {
//           setStep(1)
//         }

//       } catch (error) {
//         console.error('Error loading wizard state:', error)
//         setError(error.message || 'Failed to load wizard state')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadWizardState()
//   }, [location?.state])

//   // ============================================================
//   // HANDLE DATA CHANGES
//   // ============================================================

//   const handleDataChange = (newData) => {
//     setWizardData(prev => {
//       if (typeof newData === 'function') {
//         const result = newData(prev)
//         return { ...prev, ...result }
//       }
      
//       const merged = { ...prev }
//       Object.keys(newData).forEach(key => {
//         if (typeof newData[key] === 'object' && newData[key] !== null && !Array.isArray(newData[key])) {
//           merged[key] = { ...prev[key], ...newData[key] }
//         } else {
//           merged[key] = newData[key]
//         }
//       })
      
//       return merged
//     })
//   }

//   // ============================================================
//   // SAVE CURRENT STEP
//   // ============================================================

//   const saveCurrentStep = async () => {
//     try {
//       let userId = localStorage.getItem('userId')
//       if (!userId) {
//         const user = auth.currentUser
//         if (user) {
//           userId = user.uid
//           localStorage.setItem('userId', userId)
//         }
//       }
      
//       if (!userId) {
//         console.warn('No userId found, skipping save')
//         return
//       }
      
//       setIsSaving(true)
//       await wizardService.saveStep(userId, step, wizardData)
//       console.log(`✅ Step ${step} saved successfully`)
//     } catch (error) {
//       console.error('Error saving step:', error)
//       setError(error.message || 'Failed to save step')
//       throw error
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // ============================================================
//   // NAVIGATION
//   // ============================================================

//   const goNext = async () => {
//     try {
//       await saveCurrentStep()
//       setStep((s) => Math.min(maxStep, s + 1))
//       window.scrollTo(0, 0)
//       setError('')
//     } catch (error) {
//       // Error already set in saveCurrentStep
//     }
//   }

//   const goPrev = async () => {
//     try {
//       await saveCurrentStep()
//       setStep((s) => Math.max(1, s - 1))
//       window.scrollTo(0, 0)
//       setError('')
//     } catch (error) {
//       // Error already set in saveCurrentStep
//     }
//   }

//   // ============================================================
//   // ✅ FINISH WIZARD - Navigate to Registration Success Page
//   // ============================================================

//   const finishWizard = async () => {
//     try {
//       let userId = localStorage.getItem('userId')
//       if (!userId) {
//         const user = auth.currentUser
//         if (user) {
//           userId = user.uid
//           localStorage.setItem('userId', userId)
//         }
//       }
      
//       if (!userId) {
//         throw new Error('User ID not found')
//       }
      
//       setIsSaving(true)
//       setError('')
      
//       // ✅ Save final step
//       await wizardService.saveStep(userId, 6, wizardData)
      
//       // ✅ Complete wizard - This marks wizard as complete
//       await wizardService.completeWizard(userId)
      
//       console.log('✅ Wizard completed successfully')
      
//       // ✅ Navigate to Registration Success Page
//       navigate('/registration-success', { 
//         replace: true 
//       })
      
//     } catch (error) {
//       console.error('Error completing wizard:', error)
//       setError(error.message || 'Failed to complete wizard')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================

//   // ✅ Updated step titles and subtitles for 6 steps
//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Tools, Certifications & Requirements',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Select your primary trade, skill groups, and experience levels.',
//     'Select the tools, certifications, and requirements you possess.',
//     'Recent projects, roles, and reference information.',
//     'Work radius, availability, pay rates, and travel preferences.',
//     'Emergency contact information and policy acknowledgments.'
//   ]

//   // Loading state
//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         flexDirection: 'column',
//         gap: '16px'
//       }}>
//         <div style={{ 
//           width: '48px', 
//           height: '48px', 
//           border: '4px solid rgba(15, 78, 169, 0.1)',
//           borderTop: '4px solid #0f4ea9',
//           borderRadius: '50%',
//           animation: 'spin 1s linear infinite'
//         }} />
//         <p style={{ color: '#17263a', fontSize: '16px', fontWeight: 500 }}>
//           {isResuming ? 'Resuming your wizard...' : 'Loading wizard...'}
//         </p>
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     )
//   }

//   // Wizard content
//   const wizardContent = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         {/* Header */}
//         <div className="wizardHeader" style={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 10,
//           background: 'white',
//           padding: '16px 24px',
//           borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '12px'
//         }}>
//           <div>
//             <div className="wizardTitle" style={{
//               fontSize: '18px',
//               fontWeight: 700,
//               color: '#17263a'
//             }}>
//               {stepTitles[step - 1]}
//               {isResuming && step === 1 && (
//                 <span style={{
//                   fontSize: '12px',
//                   fontWeight: 500,
//                   color: '#0f4ea9',
//                   marginLeft: '12px',
//                   background: 'rgba(15, 78, 169, 0.08)',
//                   padding: '2px 12px',
//                   borderRadius: '12px'
//                 }}>
//                   Resumed
//                 </span>
//               )}
//             </div>
//             <div className="wizardSubtitle" style={{
//               fontSize: '13px',
//               color: 'rgba(23, 38, 58, 0.6)',
//               marginTop: '4px'
//             }}>
//               {stepSubtitles[step - 1]}
//             </div>
//           </div>

//           <div className="wizardStepPills" aria-label="Wizard steps" style={{
//             display: 'flex',
//             gap: '8px'
//           }}>
//             {Array.from({ length: maxStep }).map((_, idx) => {
//               const n = idx + 1
//               return (
//                 <button
//                   key={n}
//                   type="button"
//                   className={`wizardStepPill ${step === n ? 'wizardStepPillActive' : ''}`}
//                   onClick={() => setStep(n)}
//                   style={{
//                     width: '32px',
//                     height: '32px',
//                     borderRadius: '50%',
//                     border: step === n ? '2px solid #0f4ea9' : '1px solid rgba(18, 38, 63, 0.12)',
//                     background: step === n ? '#0f4ea9' : 'white',
//                     color: step === n ? 'white' : '#17263a',
//                     cursor: 'pointer',
//                     fontWeight: 600,
//                     fontSize: '13px',
//                     transition: 'all 0.2s ease'
//                   }}
//                 >
//                   {n}
//                 </button>
//               )
//             })}
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div style={{
//             padding: '12px 20px',
//             background: '#fee2e2',
//             color: '#dc2626',
//             borderBottom: '1px solid #fecaca',
//             fontSize: '14px',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}>
//             <span>❌ {error}</span>
//             <button
//               onClick={() => setError('')}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 color: '#dc2626',
//                 fontWeight: 'bold',
//                 fontSize: '18px'
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Body */}
//         <div className="wizardBody" style={{
//           maxHeight: 'calc(100vh - 320px)',
//           overflowY: 'auto',
//           padding: '20px 24px',
//           scrollBehavior: 'smooth'
//         }}>
//           {step === 1 && (
//             <WizardStep1 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//             />
//           )}
//           {step === 2 && (
//             <WizardStep2 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 3 && (
//             <WizardStep3 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 4 && (
//             <WizardStep4 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 5 && (
//             <WizardStep5 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 6 && (
//             <WizardStep6 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onFinish={finishWizard} 
//               onBack={goPrev} 
//             />
//           )}
//         </div>

//         {/* Footer */}
//         <div className="wizardFooter" style={{
//           position: 'sticky',
//           bottom: 0,
//           zIndex: 10,
//           background: 'white',
//           padding: '12px 24px',
//           borderTop: '1px solid rgba(18, 38, 63, 0.06)',
//           boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <button 
//             type="button" 
//             className="wizardPillBtn" 
//             onClick={step === 1 ? () => navigate('/verify') : goPrev}
//             disabled={step === 1 && isSaving}
//             style={{
//               padding: '8px 20px',
//               borderRadius: '8px',
//               background: 'transparent',
//               color: '#17263a',
//               border: '1px solid rgba(18, 38, 63, 0.12)',
//               cursor: 'pointer',
//               fontWeight: 500,
//               fontSize: '14px',
//               transition: 'all 0.2s',
//               opacity: step === 1 ? 0.6 : 1,
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}
//           >
//             <span>{step === 1 ? 'Back' : 'Back'}</span>
//           </button>

//           <div className="wizardFooterRight">
//             {step < maxStep ? (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
//                 onClick={goNext}
//                 disabled={isSaving}
//                 style={{
//                   padding: '8px 24px',
//                   borderRadius: '8px',
//                   background: isSaving ? '#94a3b8' : '#0f4ea9',
//                   color: 'white',
//                   border: 'none',
//                   cursor: isSaving ? 'not-allowed' : 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   opacity: isSaving ? 0.7 : 1
//                 }}
//               >
//                 <span>{isSaving ? 'Saving...' : 'Next'}</span>
//                 <span>→</span>
//               </button>
//             ) : (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnSuccess" 
//                 onClick={finishWizard}
//                 disabled={isSaving}
//                 style={{
//                   padding: '8px 24px',
//                   borderRadius: '8px',
//                   background: isSaving ? '#94a3b8' : '#2fb463',
//                   color: 'white',
//                   border: 'none',
//                   cursor: isSaving ? 'not-allowed' : 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   opacity: isSaving ? 0.7 : 1
//                 }}
//               >
//                 <span>{isSaving ? 'Saving...' : 'Finish'}</span>
//                 <span>✓</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )

//   if (embedded) {
//     return <div className="wizardEmbedded">{wizardContent}</div>
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

//         <main className="appContent">{wizardContent}</main>
//       </div>
//     </div>
//   )
// }

// export default WorkerWizardPage



// // src/worker/pages/WorkerWizardPage.jsx
// import { useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { TopNav } from '../../common/components/TopNav'
// import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
// import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
// import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
// import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
// import { WizardStep5 } from '../components/wizard-steps/WizardStep5'
// import { WizardStep6 } from '../components/wizard-steps/WizardStep6'
// import wizardService from '../services/workerWizardService'
// import workerService from '../services/workerService'
// import { auth } from '../../firebase/config'
// import { changeLanguage, getStoredLanguage, setUserLanguage } from '../../i18n/config' // ✅ IMPORT LANGUAGE HELPERS

// // ✅ Helper function to convert YYYY-MM-DD to MM/DD/YYYY
// const formatDateForDisplay = (dateStr) => {
//   if (!dateStr) return ''
//   if (dateStr.includes('/')) return dateStr
//   const parts = dateStr.split('-')
//   if (parts.length === 3) {
//     return `${parts[1]}/${parts[2]}/${parts[0]}`
//   }
//   return dateStr
// }

// // Icons for sidebar
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

// export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
//   const { t, i18n } = useTranslation() // ✅ ADD i18n
//   const navigate = useNavigate()
//   const location = useLocation()

//   // ============================================================
//   // STATE MANAGEMENT
//   // ============================================================
  
//   const [step, setStep] = useState(1)
//   const maxStep = 6
//   const [error, setError] = useState('')
//   const [isSaving, setIsSaving] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [isResuming, setIsResuming] = useState(false)
  
//   // ✅ Initialize with data from localStorage and location.state
//   const [wizardData, setWizardData] = useState(() => {
//     const firstName = localStorage.getItem('pendingFirstName') || ''
//     const lastName = localStorage.getItem('pendingLastName') || ''
//     const email = localStorage.getItem('pendingEmail') || ''
//     const phone = localStorage.getItem('pendingPhoneNumber') || ''
//     const dob = localStorage.getItem('pendingDob') || ''
//     const language = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage') || 'en'
    
//     const fromVerification = location?.state?.fromVerification || false
//     const state = location?.state || {}
    
//     return {
//       // Step 1: Personal Information
//       legalFirstName: fromVerification ? (state.firstName || firstName) : firstName,
//       legalLastName: fromVerification ? (state.lastName || lastName) : lastName,
//       emailAddress: fromVerification ? (state.email || email) : email,
//       mobilePhone: fromVerification ? (state.phoneNumber || phone) : phone,
//       dob: fromVerification 
//         ? (formatDateForDisplay(state.dob) || formatDateForDisplay(dob))
//         : formatDateForDisplay(dob),
//       addressLine1: '',
//       addressLine2: '',
//       city: '',
//       stateCode: '',
//       zip: '',
//       currentAddressLine1: '',
//       currentAddressLine2: '',
//       currentCity: '',
//       currentStateCode: '',
//       currentZip: '',
//       sameAsAddress: false,
//       english: fromVerification ? (state.language === 'en' || language === 'en') : (language === 'en'),
//       englishSpanish: false,
//       spanish: fromVerification ? (state.language === 'es' || language === 'es') : (language === 'es'),
//       profilePreview: '',
//       profileImageKey: '',
//       profileImageUrl: '',
//       acceptTerms: false,
//       acceptPrivacy: false,
//       consentElectronic: false,
//       certifyAccurate: false,

//       // Step 2: Trade Profile
//       mainTrade: '',
//       skillGroups: {},
//       skillDetails: {},

//       // Step 3: Tools, Certifications & Requirements
//       toolsCertifications: {},
//       heavyEquipment: {},

//       // Step 4: Work History
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],

//       // Step 5: Availability
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},

//       // Step 6: Emergency Contact & Certifications
//       emergencyContactName: '',
//       emergencyContactRelationship: '',
//       emergencyContactPhone: '',
//       policyAcks: {},
//       certChecklist: {},
//       certRows: [
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//       ],
//       safetyFlags: {},
//     }
//   })

//   // ============================================================
//   // ✅ ENSURE LANGUAGE IS SET ON WIZARD LOAD
//   // ============================================================

//   useEffect(() => {
//     const syncLanguage = () => {
//       const storedLang = getStoredLanguage() || 'en'
//       const langFromState = location?.state?.language
//       const langFromLocal = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage')
//       const targetLang = langFromState || langFromLocal || storedLang || 'en'
      
//       if (targetLang && targetLang !== i18n.language) {
//         console.log('🔄 Syncing wizard language to:', targetLang)
//         changeLanguage(targetLang)
//         setUserLanguage(targetLang)
//       }
//     }
    
//     syncLanguage()
//   }, [i18n, location?.state?.language])

//   // ============================================================
//   // ✅ ENSURE AUTH TOKEN IS SET (CRITICAL FOR AVATAR)
//   // ============================================================

//   useEffect(() => {
//     // ✅ Generate a session token
//     const generateSessionToken = () => {
//       return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//     }

//     // ✅ If authToken is passed from verification page, set it
//     if (location?.state?.authToken) {
//       localStorage.setItem('authToken', location.state.authToken)
//       console.log('✅ Auth token set from verification page')
//     }
    
//     // ✅ If we have userId but no authToken, create one
//     const userId = localStorage.getItem('userId')
//     const authToken = localStorage.getItem('authToken')
    
//     if (userId && !authToken) {
//       const sessionToken = generateSessionToken()
//       localStorage.setItem('authToken', sessionToken)
//       console.log('✅ New auth token created in wizard:', sessionToken)
//     }
    
//     // ✅ Set user name for avatar if available
//     if (location?.state?.firstName) {
//       localStorage.setItem('userFirstName', location.state.firstName)
//       localStorage.setItem('pendingFirstName', location.state.firstName)
//     }
//     if (location?.state?.lastName) {
//       localStorage.setItem('userLastName', location.state.lastName)
//       localStorage.setItem('pendingLastName', location.state.lastName)
//     }
    
//     // ✅ Trigger profile update event for avatar
//     const firstName = localStorage.getItem('userFirstName') || 
//                       localStorage.getItem('pendingFirstName') || 
//                       'User'
//     window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//       detail: { 
//         firstName: firstName,
//         profileImage: localStorage.getItem('userProfileImage')
//       }
//     }))
    
//     console.log('✅ Auth token check complete. Token exists:', !!localStorage.getItem('authToken'))
    
//   }, [location?.state])

//   // ============================================================
//   // LOAD WIZARD STATE - RESUME FEATURE
//   // ============================================================

//   useEffect(() => {
//     const loadWizardState = async () => {
//       try {
//         // ✅ If coming from verification page, use location.state
//         if (location?.state?.fromVerification) {
//           const state = location.state
//           console.log('✅ Wizard loaded from verification data:', state)
          
//           // ✅ Ensure language is set from verification data
//           const langFromState = state.language || 'en'
//           if (langFromState !== i18n.language) {
//             changeLanguage(langFromState)
//             setUserLanguage(langFromState)
//           }
          
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: state.firstName || prev.legalFirstName || '',
//             legalLastName: state.lastName || prev.legalLastName || '',
//             emailAddress: state.email || prev.emailAddress || '',
//             mobilePhone: state.phoneNumber || prev.mobilePhone || '',
//             dob: formatDateForDisplay(state.dob) || prev.dob || '',
//             english: state.language === 'en' || prev.english || false,
//             spanish: state.language === 'es' || prev.spanish || false,
//           }))
          
//           setLoading(false)
//           return
//         }

//         // ✅ Check for existing data in localStorage
//         const firstName = localStorage.getItem('pendingFirstName')
//         const email = localStorage.getItem('pendingEmail')
//         const dob = localStorage.getItem('pendingDob')
//         const language = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage') || 'en'
        
//         // ✅ Ensure language is set from localStorage
//         if (language !== i18n.language) {
//           changeLanguage(language)
//           setUserLanguage(language)
//         }
        
//         if (firstName || email) {
//           console.log('✅ Loading wizard from localStorage')
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: firstName || prev.legalFirstName || '',
//             legalLastName: localStorage.getItem('pendingLastName') || prev.legalLastName || '',
//             emailAddress: email || prev.emailAddress || '',
//             mobilePhone: localStorage.getItem('pendingPhoneNumber') || prev.mobilePhone || '',
//             dob: formatDateForDisplay(dob) || prev.dob || '',
//             english: language === 'en' || prev.english || false,
//             spanish: language === 'es' || prev.spanish || false,
//           }))
          
//           setLoading(false)
//           return
//         }

//         // ✅ Normal flow - check user login and resume
//         let userId = localStorage.getItem('userId')
//         if (!userId) {
//           const user = auth.currentUser
//           if (user) {
//             userId = user.uid
//             localStorage.setItem('userId', userId)
//           }
//         }

//         if (!userId) {
//           console.log('No userId found, starting fresh wizard')
//           setLoading(false)
//           return
//         }

//         // ✅ Check resume
//         const resumeCheck = await wizardService.checkResume(userId)
        
//         if (resumeCheck.needsResume) {
//           setIsResuming(true)
//           const stepToResume = resumeCheck.step
          
//           console.log(`🔄 Resuming wizard from step ${stepToResume}`)
          
//           const progress = await wizardService.getProgress(userId)
          
//           if (progress.success && progress.data.steps) {
//             const savedData = {}
//             Object.keys(progress.data.steps).forEach(key => {
//               const stepNum = parseInt(key.replace('step', ''))
//               const stepKey = `step${stepNum}`
//               savedData[stepKey] = progress.data.steps[key]
//             })
            
//             setWizardData(prev => ({
//               ...prev,
//               ...savedData
//             }))
//           }
          
//           setStep(stepToResume)
//         } else {
//           setStep(1)
//         }

//       } catch (error) {
//         console.error('Error loading wizard state:', error)
//         setError(error.message || 'Failed to load wizard state')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadWizardState()
//   }, [location?.state, i18n])

//   // ============================================================
//   // HANDLE DATA CHANGES
//   // ============================================================

//   const handleDataChange = (newData) => {
//     setWizardData(prev => {
//       if (typeof newData === 'function') {
//         const result = newData(prev)
//         return { ...prev, ...result }
//       }
      
//       const merged = { ...prev }
//       Object.keys(newData).forEach(key => {
//         if (typeof newData[key] === 'object' && newData[key] !== null && !Array.isArray(newData[key])) {
//           merged[key] = { ...prev[key], ...newData[key] }
//         } else {
//           merged[key] = newData[key]
//         }
//       })
      
//       return merged
//     })
//   }

//   // ============================================================
//   // SAVE CURRENT STEP
//   // ============================================================

//   const saveCurrentStep = async () => {
//     try {
//       let userId = localStorage.getItem('userId')
//       if (!userId) {
//         const user = auth.currentUser
//         if (user) {
//           userId = user.uid
//           localStorage.setItem('userId', userId)
//         }
//       }
      
//       if (!userId) {
//         console.warn('No userId found, skipping save')
//         return
//       }
      
//       setIsSaving(true)
//       await wizardService.saveStep(userId, step, wizardData)
//       console.log(`✅ Step ${step} saved successfully`)
//     } catch (error) {
//       console.error('Error saving step:', error)
//       setError(error.message || 'Failed to save step')
//       throw error
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // ============================================================
//   // NAVIGATION
//   // ============================================================

//   const goNext = async () => {
//     try {
//       await saveCurrentStep()
//       setStep((s) => Math.min(maxStep, s + 1))
//       window.scrollTo(0, 0)
//       setError('')
//     } catch (error) {
//       // Error already set in saveCurrentStep
//     }
//   }

//   const goPrev = async () => {
//     try {
//       await saveCurrentStep()
//       setStep((s) => Math.max(1, s - 1))
//       window.scrollTo(0, 0)
//       setError('')
//     } catch (error) {
//       // Error already set in saveCurrentStep
//     }
//   }

//   // ============================================================
//   // ✅ FINISH WIZARD - Navigate to Registration Success Page
//   // ============================================================

//   const finishWizard = async () => {
//     try {
//       let userId = localStorage.getItem('userId')
//       if (!userId) {
//         const user = auth.currentUser
//         if (user) {
//           userId = user.uid
//           localStorage.setItem('userId', userId)
//         }
//       }
      
//       if (!userId) {
//         throw new Error('User ID not found')
//       }
      
//       setIsSaving(true)
//       setError('')
      
//       // ✅ Save final step
//       await wizardService.saveStep(userId, 6, wizardData)
      
//       // ✅ Complete wizard - This marks wizard as complete
//       await wizardService.completeWizard(userId)
      
//       console.log('✅ Wizard completed successfully')
      
//       // ✅ Navigate to Registration Success Page
//       navigate('/registration-success', { 
//         replace: true 
//       })
      
//     } catch (error) {
//       console.error('Error completing wizard:', error)
//       setError(error.message || 'Failed to complete wizard')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================

//   // ✅ Updated step titles and subtitles for 6 steps
//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Tools, Certifications & Requirements',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Select your primary trade, skill groups, and experience levels.',
//     'Select the tools, certifications, and requirements you possess.',
//     'Recent projects, roles, and reference information.',
//     'Work radius, availability, pay rates, and travel preferences.',
//     'Emergency contact information and policy acknowledgments.'
//   ]

//   // Loading state
//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         flexDirection: 'column',
//         gap: '16px'
//       }}>
//         <div style={{ 
//           width: '48px', 
//           height: '48px', 
//           border: '4px solid rgba(15, 78, 169, 0.1)',
//           borderTop: '4px solid #0f4ea9',
//           borderRadius: '50%',
//           animation: 'spin 1s linear infinite'
//         }} />
//         <p style={{ color: '#17263a', fontSize: '16px', fontWeight: 500 }}>
//           {isResuming ? 'Resuming your wizard...' : 'Loading wizard...'}
//         </p>
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     )
//   }

//   // Wizard content
//   const wizardContent = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         {/* Header */}
//         <div className="wizardHeader" style={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 10,
//           background: 'white',
//           padding: '16px 24px',
//           borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '12px'
//         }}>
//           <div>
//             <div className="wizardTitle" style={{
//               fontSize: '18px',
//               fontWeight: 700,
//               color: '#17263a'
//             }}>
//               {stepTitles[step - 1]}
//               {isResuming && step === 1 && (
//                 <span style={{
//                   fontSize: '12px',
//                   fontWeight: 500,
//                   color: '#0f4ea9',
//                   marginLeft: '12px',
//                   background: 'rgba(15, 78, 169, 0.08)',
//                   padding: '2px 12px',
//                   borderRadius: '12px'
//                 }}>
//                   Resumed
//                 </span>
//               )}
//             </div>
//             <div className="wizardSubtitle" style={{
//               fontSize: '13px',
//               color: 'rgba(23, 38, 58, 0.6)',
//               marginTop: '4px'
//             }}>
//               {stepSubtitles[step - 1]}
//             </div>
//           </div>

//           <div className="wizardStepPills" aria-label="Wizard steps" style={{
//             display: 'flex',
//             gap: '8px'
//           }}>
//             {Array.from({ length: maxStep }).map((_, idx) => {
//               const n = idx + 1
//               return (
//                 <button
//                   key={n}
//                   type="button"
//                   className={`wizardStepPill ${step === n ? 'wizardStepPillActive' : ''}`}
//                   onClick={() => setStep(n)}
//                   style={{
//                     width: '32px',
//                     height: '32px',
//                     borderRadius: '50%',
//                     border: step === n ? '2px solid #0f4ea9' : '1px solid rgba(18, 38, 63, 0.12)',
//                     background: step === n ? '#0f4ea9' : 'white',
//                     color: step === n ? 'white' : '#17263a',
//                     cursor: 'pointer',
//                     fontWeight: 600,
//                     fontSize: '13px',
//                     transition: 'all 0.2s ease'
//                   }}
//                 >
//                   {n}
//                 </button>
//               )
//             })}
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div style={{
//             padding: '12px 20px',
//             background: '#fee2e2',
//             color: '#dc2626',
//             borderBottom: '1px solid #fecaca',
//             fontSize: '14px',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}>
//             <span>❌ {error}</span>
//             <button
//               onClick={() => setError('')}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 color: '#dc2626',
//                 fontWeight: 'bold',
//                 fontSize: '18px'
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Body */}
//         <div className="wizardBody" style={{
//           maxHeight: 'calc(100vh - 320px)',
//           overflowY: 'auto',
//           padding: '20px 24px',
//           scrollBehavior: 'smooth'
//         }}>
//           {step === 1 && (
//             <WizardStep1 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//             />
//           )}
//           {step === 2 && (
//             <WizardStep2 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 3 && (
//             <WizardStep3 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 4 && (
//             <WizardStep4 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 5 && (
//             <WizardStep5 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 6 && (
//             <WizardStep6 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onFinish={finishWizard} 
//               onBack={goPrev} 
//             />
//           )}
//         </div>

//         {/* Footer */}
//         <div className="wizardFooter" style={{
//           position: 'sticky',
//           bottom: 0,
//           zIndex: 10,
//           background: 'white',
//           padding: '12px 24px',
//           borderTop: '1px solid rgba(18, 38, 63, 0.06)',
//           boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <button 
//             type="button" 
//             className="wizardPillBtn" 
//             onClick={step === 1 ? () => navigate('/verify') : goPrev}
//             disabled={step === 1 && isSaving}
//             style={{
//               padding: '8px 20px',
//               borderRadius: '8px',
//               background: 'transparent',
//               color: '#17263a',
//               border: '1px solid rgba(18, 38, 63, 0.12)',
//               cursor: 'pointer',
//               fontWeight: 500,
//               fontSize: '14px',
//               transition: 'all 0.2s',
//               opacity: step === 1 ? 0.6 : 1,
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}
//           >
//             <span>{step === 1 ? 'Back' : 'Back'}</span>
//           </button>

//           <div className="wizardFooterRight">
//             {step < maxStep ? (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
//                 onClick={goNext}
//                 disabled={isSaving}
//                 style={{
//                   padding: '8px 24px',
//                   borderRadius: '8px',
//                   background: isSaving ? '#94a3b8' : '#0f4ea9',
//                   color: 'white',
//                   border: 'none',
//                   cursor: isSaving ? 'not-allowed' : 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   opacity: isSaving ? 0.7 : 1
//                 }}
//               >
//                 <span>{isSaving ? 'Saving...' : 'Next'}</span>
//                 <span>→</span>
//               </button>
//             ) : (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnSuccess" 
//                 onClick={finishWizard}
//                 disabled={isSaving}
//                 style={{
//                   padding: '8px 24px',
//                   borderRadius: '8px',
//                   background: isSaving ? '#94a3b8' : '#2fb463',
//                   color: 'white',
//                   border: 'none',
//                   cursor: isSaving ? 'not-allowed' : 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   opacity: isSaving ? 0.7 : 1
//                 }}
//               >
//                 <span>{isSaving ? 'Saving...' : 'Finish'}</span>
//                 <span>✓</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )

//   if (embedded) {
//     return <div className="wizardEmbedded">{wizardContent}</div>
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

//         <main className="appContent">{wizardContent}</main>
//       </div>
//     </div>
//   )
// }

// export default WorkerWizardPage



// // src/worker/pages/WorkerWizardPage.jsx
// import { useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { TopNav } from '../../common/components/TopNav'
// import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
// import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
// import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
// import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
// import { WizardStep5 } from '../components/wizard-steps/WizardStep5'
// import { WizardStep6 } from '../components/wizard-steps/WizardStep6'
// import wizardService from '../services/workerWizardService'
// import workerService from '../services/workerService'
// import { auth } from '../../firebase/config'
// import { changeLanguage, getStoredLanguage, setUserLanguage } from '../../i18n/config'

// // ✅ Helper function to convert YYYY-MM-DD to MM/DD/YYYY
// const formatDateForDisplay = (dateStr) => {
//   if (!dateStr) return ''
//   if (dateStr.includes('/')) return dateStr
//   const parts = dateStr.split('-')
//   if (parts.length === 3) {
//     return `${parts[1]}/${parts[2]}/${parts[0]}`
//   }
//   return dateStr
// }

// // Icons for sidebar
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

// export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
//   const { t, i18n } = useTranslation()
//   const navigate = useNavigate()
//   const location = useLocation()

//   // ============================================================
//   // STATE MANAGEMENT
//   // ============================================================
  
//   const [step, setStep] = useState(1)
//   const maxStep = 6
//   const [error, setError] = useState('')
//   const [isSaving, setIsSaving] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [isResuming, setIsResuming] = useState(false)
//   const [completedSteps, setCompletedSteps] = useState([]) // ✅ Track completed steps
  
//   // ✅ Initialize with data from localStorage and location.state
//   const [wizardData, setWizardData] = useState(() => {
//     const firstName = localStorage.getItem('pendingFirstName') || ''
//     const lastName = localStorage.getItem('pendingLastName') || ''
//     const email = localStorage.getItem('pendingEmail') || ''
//     const phone = localStorage.getItem('pendingPhoneNumber') || ''
//     const dob = localStorage.getItem('pendingDob') || ''
//     const language = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage') || 'en'
    
//     const fromVerification = location?.state?.fromVerification || false
//     const state = location?.state || {}
    
//     return {
//       // Step 1: Personal Information
//       legalFirstName: fromVerification ? (state.firstName || firstName) : firstName,
//       legalLastName: fromVerification ? (state.lastName || lastName) : lastName,
//       emailAddress: fromVerification ? (state.email || email) : email,
//       mobilePhone: fromVerification ? (state.phoneNumber || phone) : phone,
//       dob: fromVerification 
//         ? (formatDateForDisplay(state.dob) || formatDateForDisplay(dob))
//         : formatDateForDisplay(dob),
//       addressLine1: '',
//       addressLine2: '',
//       city: '',
//       stateCode: '',
//       zip: '',
//       currentAddressLine1: '',
//       currentAddressLine2: '',
//       currentCity: '',
//       currentStateCode: '',
//       currentZip: '',
//       sameAsAddress: false,
//       english: fromVerification ? (state.language === 'en' || language === 'en') : (language === 'en'),
//       englishSpanish: false,
//       spanish: fromVerification ? (state.language === 'es' || language === 'es') : (language === 'es'),
//       profilePreview: '',
//       profileImageKey: '',
//       profileImageUrl: '',
//       acceptTerms: false,
//       acceptPrivacy: false,
//       consentElectronic: false,
//       certifyAccurate: false,

//       // Step 2: Trade Profile
//       mainTrade: '',
//       skillGroups: {},
//       skillDetails: {},

//       // Step 3: Tools, Certifications & Requirements
//       toolsCertifications: {},
//       heavyEquipment: {},

//       // Step 4: Work History
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],

//       // Step 5: Availability
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},

//       // Step 6: Emergency Contact & Certifications
//       emergencyContactName: '',
//       emergencyContactRelationship: '',
//       emergencyContactPhone: '',
//       policyAcks: {},
//       certChecklist: {},
//       certRows: [
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//       ],
//       safetyFlags: {},
//     }
//   })

//   // ============================================================
//   // ✅ CHECK WHICH STEPS ARE COMPLETED
//   // ============================================================

//   const checkCompletedSteps = () => {
//     const completed = []
    
//     // Check Step 1: Basics
//     if (wizardData.legalFirstName && wizardData.legalLastName && 
//         wizardData.emailAddress && wizardData.mobilePhone && wizardData.dob) {
//       completed.push(1)
//     }
    
//     // Check Step 2 & 3: Trade (combined)
//     if (wizardData.mainTrade) {
//       completed.push(2)
//       // Step 3 is considered complete if Step 2 is complete (they share the same data)
//       completed.push(3)
//     }
    
//     // Check Step 4: Work History
//     const hasProjects = wizardData.projects && wizardData.projects.some(p => p.name && p.client)
//     if (hasProjects) {
//       completed.push(4)
//     }
    
//     // Check Step 5: Availability
//     if (wizardData.hourlyRate && wizardData.willingToTravel) {
//       completed.push(5)
//     }
    
//     // Check Step 6: Emergency Contact
//     if (wizardData.emergencyContactName && wizardData.emergencyContactRelationship && 
//         wizardData.emergencyContactPhone) {
//       completed.push(6)
//     }
    
//     setCompletedSteps(completed)
//   }

//   // ============================================================
//   // ✅ ENSURE LANGUAGE IS SET ON WIZARD LOAD
//   // ============================================================

//   useEffect(() => {
//     const syncLanguage = () => {
//       const storedLang = getStoredLanguage() || 'en'
//       const langFromState = location?.state?.language
//       const langFromLocal = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage')
//       const targetLang = langFromState || langFromLocal || storedLang || 'en'
      
//       if (targetLang && targetLang !== i18n.language) {
//         console.log('🔄 Syncing wizard language to:', targetLang)
//         changeLanguage(targetLang)
//         setUserLanguage(targetLang)
//       }
//     }
    
//     syncLanguage()
//   }, [i18n, location?.state?.language])

//   // ============================================================
//   // ✅ ENSURE AUTH TOKEN IS SET (CRITICAL FOR AVATAR)
//   // ============================================================

//   useEffect(() => {
//     // ✅ Generate a session token
//     const generateSessionToken = () => {
//       return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//     }

//     // ✅ If authToken is passed from verification page, set it
//     if (location?.state?.authToken) {
//       localStorage.setItem('authToken', location.state.authToken)
//       console.log('✅ Auth token set from verification page')
//     }
    
//     // ✅ If we have userId but no authToken, create one
//     const userId = localStorage.getItem('userId')
//     const authToken = localStorage.getItem('authToken')
    
//     if (userId && !authToken) {
//       const sessionToken = generateSessionToken()
//       localStorage.setItem('authToken', sessionToken)
//       console.log('✅ New auth token created in wizard:', sessionToken)
//     }
    
//     // ✅ Set user name for avatar if available
//     if (location?.state?.firstName) {
//       localStorage.setItem('userFirstName', location.state.firstName)
//       localStorage.setItem('pendingFirstName', location.state.firstName)
//     }
//     if (location?.state?.lastName) {
//       localStorage.setItem('userLastName', location.state.lastName)
//       localStorage.setItem('pendingLastName', location.state.lastName)
//     }
    
//     // ✅ Trigger profile update event for avatar
//     const firstName = localStorage.getItem('userFirstName') || 
//                       localStorage.getItem('pendingFirstName') || 
//                       'User'
//     window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//       detail: { 
//         firstName: firstName,
//         profileImage: localStorage.getItem('userProfileImage')
//       }
//     }))
    
//     console.log('✅ Auth token check complete. Token exists:', !!localStorage.getItem('authToken'))
    
//   }, [location?.state])

//   // ✅ Check completed steps whenever wizardData changes
//   useEffect(() => {
//     checkCompletedSteps()
//   }, [wizardData])

//   // ============================================================
//   // LOAD WIZARD STATE - RESUME FEATURE
//   // ============================================================

//   useEffect(() => {
//     const loadWizardState = async () => {
//       try {
//         // ✅ If coming from verification page, use location.state
//         if (location?.state?.fromVerification) {
//           const state = location.state
//           console.log('✅ Wizard loaded from verification data:', state)
          
//           // ✅ Ensure language is set from verification data
//           const langFromState = state.language || 'en'
//           if (langFromState !== i18n.language) {
//             changeLanguage(langFromState)
//             setUserLanguage(langFromState)
//           }
          
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: state.firstName || prev.legalFirstName || '',
//             legalLastName: state.lastName || prev.legalLastName || '',
//             emailAddress: state.email || prev.emailAddress || '',
//             mobilePhone: state.phoneNumber || prev.mobilePhone || '',
//             dob: formatDateForDisplay(state.dob) || prev.dob || '',
//             english: state.language === 'en' || prev.english || false,
//             spanish: state.language === 'es' || prev.spanish || false,
//           }))
          
//           setLoading(false)
//           return
//         }

//         // ✅ Check for existing data in localStorage
//         const firstName = localStorage.getItem('pendingFirstName')
//         const email = localStorage.getItem('pendingEmail')
//         const dob = localStorage.getItem('pendingDob')
//         const language = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage') || 'en'
        
//         // ✅ Ensure language is set from localStorage
//         if (language !== i18n.language) {
//           changeLanguage(language)
//           setUserLanguage(language)
//         }
        
//         if (firstName || email) {
//           console.log('✅ Loading wizard from localStorage')
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: firstName || prev.legalFirstName || '',
//             legalLastName: localStorage.getItem('pendingLastName') || prev.legalLastName || '',
//             emailAddress: email || prev.emailAddress || '',
//             mobilePhone: localStorage.getItem('pendingPhoneNumber') || prev.mobilePhone || '',
//             dob: formatDateForDisplay(dob) || prev.dob || '',
//             english: language === 'en' || prev.english || false,
//             spanish: language === 'es' || prev.spanish || false,
//           }))
          
//           setLoading(false)
//           return
//         }

//         // ✅ Normal flow - check user login and resume
//         let userId = localStorage.getItem('userId')
//         if (!userId) {
//           const user = auth.currentUser
//           if (user) {
//             userId = user.uid
//             localStorage.setItem('userId', userId)
//           }
//         }

//         if (!userId) {
//           console.log('No userId found, starting fresh wizard')
//           setLoading(false)
//           return
//         }

//         // ✅ Check resume
//         const resumeCheck = await wizardService.checkResume(userId)
        
//         if (resumeCheck.needsResume) {
//           setIsResuming(true)
//           const stepToResume = resumeCheck.step
          
//           console.log(`🔄 Resuming wizard from step ${stepToResume}`)
          
//           const progress = await wizardService.getProgress(userId)
          
//           if (progress.success && progress.data.steps) {
//             const savedData = {}
//             Object.keys(progress.data.steps).forEach(key => {
//               const stepNum = parseInt(key.replace('step', ''))
//               const stepKey = `step${stepNum}`
//               savedData[stepKey] = progress.data.steps[key]
//             })
            
//             setWizardData(prev => ({
//               ...prev,
//               ...savedData
//             }))
//           }
          
//           setStep(stepToResume)
//         } else {
//           setStep(1)
//         }

//       } catch (error) {
//         console.error('Error loading wizard state:', error)
//         setError(error.message || 'Failed to load wizard state')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadWizardState()
//   }, [location?.state, i18n])

//   // ============================================================
//   // HANDLE STEP NAVIGATION - LOCKED
//   // ============================================================

//   const handleStepClick = (targetStep) => {
//     // ✅ Can only navigate to current step or completed steps
//     const maxAllowedStep = Math.max(...completedSteps, step)
    
//     if (targetStep <= maxAllowedStep + 1) {
//       setStep(targetStep)
//       window.scrollTo(0, 0)
//       setError('')
//     } else {
//       // Show error message
//       setError(`Please complete Step ${targetStep - 1} first before accessing Step ${targetStep}`)
//       setTimeout(() => setError(''), 3000)
//     }
//   }

//   // ============================================================
//   // HANDLE DATA CHANGES
//   // ============================================================

//   const handleDataChange = (newData) => {
//     setWizardData(prev => {
//       if (typeof newData === 'function') {
//         const result = newData(prev)
//         return { ...prev, ...result }
//       }
      
//       const merged = { ...prev }
//       Object.keys(newData).forEach(key => {
//         if (typeof newData[key] === 'object' && newData[key] !== null && !Array.isArray(newData[key])) {
//           merged[key] = { ...prev[key], ...newData[key] }
//         } else {
//           merged[key] = newData[key]
//         }
//       })
      
//       return merged
//     })
//   }

//   // ============================================================
//   // SAVE CURRENT STEP
//   // ============================================================

//   const saveCurrentStep = async () => {
//     try {
//       let userId = localStorage.getItem('userId')
//       if (!userId) {
//         const user = auth.currentUser
//         if (user) {
//           userId = user.uid
//           localStorage.setItem('userId', userId)
//         }
//       }
      
//       if (!userId) {
//         console.warn('No userId found, skipping save')
//         return
//       }
      
//       setIsSaving(true)
//       await wizardService.saveStep(userId, step, wizardData)
//       console.log(`✅ Step ${step} saved successfully`)
//     } catch (error) {
//       console.error('Error saving step:', error)
//       setError(error.message || 'Failed to save step')
//       throw error
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // ============================================================
//   // NAVIGATION
//   // ============================================================

//   const goNext = async () => {
//     try {
//       await saveCurrentStep()
//       // ✅ Only allow going to next step if current step is complete
//       if (completedSteps.includes(step) || step === 1) {
//         setStep((s) => Math.min(maxStep, s + 1))
//         window.scrollTo(0, 0)
//         setError('')
//       } else {
//         setError(`Please complete all fields in Step ${step} before proceeding`)
//         setTimeout(() => setError(''), 3000)
//       }
//     } catch (error) {
//       // Error already set in saveCurrentStep
//     }
//   }

//   const goPrev = async () => {
//     try {
//       await saveCurrentStep()
//       setStep((s) => Math.max(1, s - 1))
//       window.scrollTo(0, 0)
//       setError('')
//     } catch (error) {
//       // Error already set in saveCurrentStep
//     }
//   }

//   // ============================================================
//   // ✅ FINISH WIZARD - Navigate to Registration Success Page
//   // ============================================================

//   const finishWizard = async () => {
//     try {
//       let userId = localStorage.getItem('userId')
//       if (!userId) {
//         const user = auth.currentUser
//         if (user) {
//           userId = user.uid
//           localStorage.setItem('userId', userId)
//         }
//       }
      
//       if (!userId) {
//         throw new Error('User ID not found')
//       }
      
//       setIsSaving(true)
//       setError('')
      
//       // ✅ Save final step
//       await wizardService.saveStep(userId, 6, wizardData)
      
//       // ✅ Complete wizard - This marks wizard as complete
//       await wizardService.completeWizard(userId)
      
//       console.log('✅ Wizard completed successfully')
      
//       // ✅ Navigate to Registration Success Page
//       navigate('/registration-success', { 
//         replace: true 
//       })
      
//     } catch (error) {
//       console.error('Error completing wizard:', error)
//       setError(error.message || 'Failed to complete wizard')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // ============================================================
//   // RENDER
//   // ============================================================

//   // ✅ Updated step titles and subtitles for 6 steps
//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Tools, Certifications & Requirements',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Select your primary trade, skill groups, and experience levels.',
//     'Select the tools, certifications, and requirements you possess.',
//     'Recent projects, roles, and reference information.',
//     'Work radius, availability, pay rates, and travel preferences.',
//     'Emergency contact information and policy acknowledgments.'
//   ]

//   // Loading state
//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         flexDirection: 'column',
//         gap: '16px'
//       }}>
//         <div style={{ 
//           width: '48px', 
//           height: '48px', 
//           border: '4px solid rgba(15, 78, 169, 0.1)',
//           borderTop: '4px solid #0f4ea9',
//           borderRadius: '50%',
//           animation: 'spin 1s linear infinite'
//         }} />
//         <p style={{ color: '#17263a', fontSize: '16px', fontWeight: 500 }}>
//           {isResuming ? 'Resuming your wizard...' : 'Loading wizard...'}
//         </p>
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     )
//   }

//   // Wizard content
//   const wizardContent = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         {/* Header */}
//         <div className="wizardHeader" style={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 10,
//           background: 'white',
//           padding: '16px 24px',
//           borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '12px'
//         }}>
//           <div>
//             <div className="wizardTitle" style={{
//               fontSize: '18px',
//               fontWeight: 700,
//               color: '#17263a'
//             }}>
//               {stepTitles[step - 1]}
//               {isResuming && step === 1 && (
//                 <span style={{
//                   fontSize: '12px',
//                   fontWeight: 500,
//                   color: '#0f4ea9',
//                   marginLeft: '12px',
//                   background: 'rgba(15, 78, 169, 0.08)',
//                   padding: '2px 12px',
//                   borderRadius: '12px'
//                 }}>
//                   Resumed
//                 </span>
//               )}
//             </div>
//             <div className="wizardSubtitle" style={{
//               fontSize: '13px',
//               color: 'rgba(23, 38, 58, 0.6)',
//               marginTop: '4px'
//             }}>
//               {stepSubtitles[step - 1]}
//             </div>
//           </div>

//           <div className="wizardStepPills" aria-label="Wizard steps" style={{
//             display: 'flex',
//             gap: '8px'
//           }}>
//             {Array.from({ length: maxStep }).map((_, idx) => {
//               const n = idx + 1
//               const isActive = step === n
//               const isCompleted = completedSteps.includes(n)
//               const isLocked = n > Math.max(...completedSteps, 1) + 1
              
//               return (
//                 <button
//                   key={n}
//                   type="button"
//                   className={`wizardStepPill ${isActive ? 'wizardStepPillActive' : ''}`}
//                   onClick={() => !isLocked && handleStepClick(n)}
//                   disabled={isLocked}
//                   style={{
//                     width: '32px',
//                     height: '32px',
//                     borderRadius: '50%',
//                     border: isActive ? '2px solid #0f4ea9' : 
//                            isCompleted ? '2px solid #2fb463' : 
//                            '1px solid rgba(18, 38, 63, 0.12)',
//                     background: isActive ? '#0f4ea9' : 
//                                isCompleted ? '#2fb463' : 
//                                'white',
//                     color: isActive ? 'white' : 
//                            isCompleted ? 'white' : 
//                            '#17263a',
//                     cursor: isLocked ? 'not-allowed' : 'pointer',
//                     fontWeight: 600,
//                     fontSize: '13px',
//                     transition: 'all 0.2s ease',
//                     opacity: isLocked ? 0.4 : 1,
//                     position: 'relative'
//                   }}
//                   title={isLocked ? `Complete Step ${n - 1} first` : `Go to Step ${n}`}
//                 >
//                   {isCompleted && !isActive ? '✓' : n}
//                 </button>
//               )
//             })}
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div style={{
//             padding: '12px 20px',
//             background: '#fee2e2',
//             color: '#dc2626',
//             borderBottom: '1px solid #fecaca',
//             fontSize: '14px',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}>
//             <span>❌ {error}</span>
//             <button
//               onClick={() => setError('')}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 color: '#dc2626',
//                 fontWeight: 'bold',
//                 fontSize: '18px'
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Body */}
//         <div className="wizardBody" style={{
//           maxHeight: 'calc(100vh - 320px)',
//           overflowY: 'auto',
//           padding: '20px 24px',
//           scrollBehavior: 'smooth'
//         }}>
//           {step === 1 && (
//             <WizardStep1 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//             />
//           )}
//           {step === 2 && (
//             <WizardStep2 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 3 && (
//             <WizardStep3 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 4 && (
//             <WizardStep4 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 5 && (
//             <WizardStep5 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 6 && (
//             <WizardStep6 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onFinish={finishWizard} 
//               onBack={goPrev} 
//             />
//           )}
//         </div>

//         {/* Footer */}
//         <div className="wizardFooter" style={{
//           position: 'sticky',
//           bottom: 0,
//           zIndex: 10,
//           background: 'white',
//           padding: '12px 24px',
//           borderTop: '1px solid rgba(18, 38, 63, 0.06)',
//           boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center'
//         }}>
//           <button 
//             type="button" 
//             className="wizardPillBtn" 
//             onClick={step === 1 ? () => navigate('/verify') : goPrev}
//             disabled={step === 1 && isSaving}
//             style={{
//               padding: '8px 20px',
//               borderRadius: '8px',
//               background: 'transparent',
//               color: '#17263a',
//               border: '1px solid rgba(18, 38, 63, 0.12)',
//               cursor: 'pointer',
//               fontWeight: 500,
//               fontSize: '14px',
//               transition: 'all 0.2s',
//               opacity: step === 1 ? 0.6 : 1,
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}
//           >
//             <span>{step === 1 ? 'Back' : 'Back'}</span>
//           </button>

//           <div className="wizardFooterRight">
//             {step < maxStep ? (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
//                 onClick={goNext}
//                 disabled={isSaving || !completedSteps.includes(step)}
//                 style={{
//                   padding: '8px 24px',
//                   borderRadius: '8px',
//                   background: isSaving || !completedSteps.includes(step) ? '#94a3b8' : '#0f4ea9',
//                   color: 'white',
//                   border: 'none',
//                   cursor: (isSaving || !completedSteps.includes(step)) ? 'not-allowed' : 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   opacity: (isSaving || !completedSteps.includes(step)) ? 0.7 : 1
//                 }}
//                 title={!completedSteps.includes(step) ? `Complete all fields in Step ${step} first` : ''}
//               >
//                 <span>{isSaving ? 'Saving...' : 'Next'}</span>
//                 <span>→</span>
//               </button>
//             ) : (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnSuccess" 
//                 onClick={finishWizard}
//                 disabled={isSaving || !completedSteps.includes(6)}
//                 style={{
//                   padding: '8px 24px',
//                   borderRadius: '8px',
//                   background: isSaving || !completedSteps.includes(6) ? '#94a3b8' : '#2fb463',
//                   color: 'white',
//                   border: 'none',
//                   cursor: (isSaving || !completedSteps.includes(6)) ? 'not-allowed' : 'pointer',
//                   fontWeight: 600,
//                   fontSize: '14px',
//                   transition: 'all 0.2s',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '8px',
//                   opacity: (isSaving || !completedSteps.includes(6)) ? 0.7 : 1
//                 }}
//                 title={!completedSteps.includes(6) ? 'Complete all fields in Step 6 first' : ''}
//               >
//                 <span>{isSaving ? 'Saving...' : 'Finish'}</span>
//                 <span>✓</span>
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )

//   if (embedded) {
//     return <div className="wizardEmbedded">{wizardContent}</div>
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

//         <main className="appContent">{wizardContent}</main>
//       </div>
//     </div>
//   )
// }

// export default WorkerWizardPage






// // src/worker/pages/WorkerWizardPage.jsx
// import { useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { TopNav } from '../../common/components/TopNav'
// import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
// import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
// import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
// import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
// import { WizardStep5 } from '../components/wizard-steps/WizardStep5'
// import { WizardStep6 } from '../components/wizard-steps/WizardStep6'
// import wizardService from '../services/workerWizardService'
// import workerService from '../services/workerService'
// import { auth } from '../../firebase/config'
// import { changeLanguage, getStoredLanguage, setUserLanguage } from '../../i18n/config'

// // ✅ Helper function to convert YYYY-MM-DD to MM/DD/YYYY
// const formatDateForDisplay = (dateStr) => {
//   if (!dateStr) return ''
//   if (dateStr.includes('/')) return dateStr
//   const parts = dateStr.split('-')
//   if (parts.length === 3) {
//     return `${parts[1]}/${parts[2]}/${parts[0]}`
//   }
//   return dateStr
// }

// // Icons for sidebar
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

// export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
//   const { t, i18n } = useTranslation()
//   const navigate = useNavigate()
//   const location = useLocation()

//   // ============================================================
//   // STATE MANAGEMENT
//   // ============================================================
  
//   const [step, setStep] = useState(1)
//   const maxStep = 6
//   const [error, setError] = useState('')
//   const [isSaving, setIsSaving] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [isResuming, setIsResuming] = useState(false)
//   const [completedSteps, setCompletedSteps] = useState([]) // ✅ Track completed steps
  
//   // ✅ Initialize with data from localStorage and location.state
//   const [wizardData, setWizardData] = useState(() => {
//     const firstName = localStorage.getItem('pendingFirstName') || ''
//     const lastName = localStorage.getItem('pendingLastName') || ''
//     const email = localStorage.getItem('pendingEmail') || ''
//     const phone = localStorage.getItem('pendingPhoneNumber') || ''
//     const dob = localStorage.getItem('pendingDob') || ''
//     const language = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage') || 'en'
    
//     const fromVerification = location?.state?.fromVerification || false
//     const state = location?.state || {}
    
//     return {
//       // Step 1: Personal Information
//       legalFirstName: fromVerification ? (state.firstName || firstName) : firstName,
//       legalLastName: fromVerification ? (state.lastName || lastName) : lastName,
//       emailAddress: fromVerification ? (state.email || email) : email,
//       mobilePhone: fromVerification ? (state.phoneNumber || phone) : phone,
//       dob: fromVerification 
//         ? (formatDateForDisplay(state.dob) || formatDateForDisplay(dob))
//         : formatDateForDisplay(dob),
//       addressLine1: '',
//       addressLine2: '',
//       city: '',
//       stateCode: '',
//       zip: '',
//       currentAddressLine1: '',
//       currentAddressLine2: '',
//       currentCity: '',
//       currentStateCode: '',
//       currentZip: '',
//       sameAsAddress: false,
//       english: fromVerification ? (state.language === 'en' || language === 'en') : (language === 'en'),
//       englishSpanish: false,
//       spanish: fromVerification ? (state.language === 'es' || language === 'es') : (language === 'es'),
//       profilePreview: '',
//       profileImageKey: '',
//       profileImageUrl: '',
//       acceptTerms: false,
//       acceptPrivacy: false,
//       consentElectronic: false,
//       certifyAccurate: false,

//       // Step 2: Trade Profile
//       mainTrade: '',
//       skillGroups: {},
//       skillDetails: {},

//       // Step 3: Tools, Certifications & Requirements
//       toolsCertifications: {},
//       heavyEquipment: {},

//       // Step 4: Work History
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],

//       // Step 5: Availability
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},

//       // Step 6: Emergency Contact & Certifications
//       emergencyContactName: '',
//       emergencyContactRelationship: '',
//       emergencyContactPhone: '',
//       policyAcks: {},
//       certChecklist: {},
//       certRows: [
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//       ],
//       safetyFlags: {},
//     }
//   })

//   // ============================================================
//   // ✅ CHECK WHICH STEPS ARE COMPLETED
//   // ============================================================

//   const checkCompletedSteps = () => {
//     const completed = []
    
//     // Check Step 1: Basics
//     if (wizardData.legalFirstName && wizardData.legalLastName && 
//         wizardData.emailAddress && wizardData.mobilePhone && wizardData.dob) {
//       completed.push(1)
//     }
    
//     // Check Step 2 & 3: Trade (combined)
//     if (wizardData.mainTrade) {
//       completed.push(2)
//       // Step 3 is considered complete if Step 2 is complete (they share the same data)
//       completed.push(3)
//     }
    
//     // Check Step 4: Work History
//     const hasProjects = wizardData.projects && wizardData.projects.some(p => p.name && p.client)
//     if (hasProjects) {
//       completed.push(4)
//     }
    
//     // Check Step 5: Availability
//     if (wizardData.hourlyRate && wizardData.willingToTravel) {
//       completed.push(5)
//     }
    
//     // Check Step 6: Emergency Contact
//     if (wizardData.emergencyContactName && wizardData.emergencyContactRelationship && 
//         wizardData.emergencyContactPhone) {
//       completed.push(6)
//     }
    
//     setCompletedSteps(completed)
//   }

//   // ============================================================
//   // ✅ ENSURE LANGUAGE IS SET ON WIZARD LOAD
//   // ============================================================

//   useEffect(() => {
//     const syncLanguage = () => {
//       const storedLang = getStoredLanguage() || 'en'
//       const langFromState = location?.state?.language
//       const langFromLocal = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage')
//       const targetLang = langFromState || langFromLocal || storedLang || 'en'
      
//       if (targetLang && targetLang !== i18n.language) {
//         console.log('🔄 Syncing wizard language to:', targetLang)
//         changeLanguage(targetLang)
//         setUserLanguage(targetLang)
//       }
//     }
    
//     syncLanguage()
//   }, [i18n, location?.state?.language])

//   // ============================================================
//   // ✅ ENSURE AUTH TOKEN IS SET (CRITICAL FOR AVATAR)
//   // ============================================================

//   useEffect(() => {
//     // ✅ Generate a session token
//     const generateSessionToken = () => {
//       return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
//     }

//     // ✅ If authToken is passed from verification page, set it
//     if (location?.state?.authToken) {
//       localStorage.setItem('authToken', location.state.authToken)
//       console.log('✅ Auth token set from verification page')
//     }
    
//     // ✅ If we have userId but no authToken, create one
//     const userId = localStorage.getItem('userId')
//     const authToken = localStorage.getItem('authToken')
    
//     if (userId && !authToken) {
//       const sessionToken = generateSessionToken()
//       localStorage.setItem('authToken', sessionToken)
//       console.log('✅ New auth token created in wizard:', sessionToken)
//     }
    
//     // ✅ Set user name for avatar if available
//     if (location?.state?.firstName) {
//       localStorage.setItem('userFirstName', location.state.firstName)
//       localStorage.setItem('pendingFirstName', location.state.firstName)
//     }
//     if (location?.state?.lastName) {
//       localStorage.setItem('userLastName', location.state.lastName)
//       localStorage.setItem('pendingLastName', location.state.lastName)
//     }
    
//     // ✅ Trigger profile update event for avatar
//     const firstName = localStorage.getItem('userFirstName') || 
//                       localStorage.getItem('pendingFirstName') || 
//                       'User'
//     window.dispatchEvent(new CustomEvent('profileImageUpdated', {
//       detail: { 
//         firstName: firstName,
//         profileImage: localStorage.getItem('userProfileImage')
//       }
//     }))
    
//     console.log('✅ Auth token check complete. Token exists:', !!localStorage.getItem('authToken'))
    
//   }, [location?.state])

//   // ✅ Check completed steps whenever wizardData changes
//   useEffect(() => {
//     checkCompletedSteps()
//   }, [wizardData])

//   // ============================================================
//   // LOAD WIZARD STATE - RESUME FEATURE
//   // ============================================================

//   useEffect(() => {
//     const loadWizardState = async () => {
//       try {
//         // ✅ If coming from verification page, use location.state
//         if (location?.state?.fromVerification) {
//           const state = location.state
//           console.log('✅ Wizard loaded from verification data:', state)
          
//           // ✅ Ensure language is set from verification data
//           const langFromState = state.language || 'en'
//           if (langFromState !== i18n.language) {
//             changeLanguage(langFromState)
//             setUserLanguage(langFromState)
//           }
          
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: state.firstName || prev.legalFirstName || '',
//             legalLastName: state.lastName || prev.legalLastName || '',
//             emailAddress: state.email || prev.emailAddress || '',
//             mobilePhone: state.phoneNumber || prev.mobilePhone || '',
//             dob: formatDateForDisplay(state.dob) || prev.dob || '',
//             english: state.language === 'en' || prev.english || false,
//             spanish: state.language === 'es' || prev.spanish || false,
//           }))
          
//           setLoading(false)
//           return
//         }

//         // ✅ Check for existing data in localStorage
//         const firstName = localStorage.getItem('pendingFirstName')
//         const email = localStorage.getItem('pendingEmail')
//         const dob = localStorage.getItem('pendingDob')
//         const language = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage') || 'en'
        
//         // ✅ Ensure language is set from localStorage
//         if (language !== i18n.language) {
//           changeLanguage(language)
//           setUserLanguage(language)
//         }
        
//         if (firstName || email) {
//           console.log('✅ Loading wizard from localStorage')
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: firstName || prev.legalFirstName || '',
//             legalLastName: localStorage.getItem('pendingLastName') || prev.legalLastName || '',
//             emailAddress: email || prev.emailAddress || '',
//             mobilePhone: localStorage.getItem('pendingPhoneNumber') || prev.mobilePhone || '',
//             dob: formatDateForDisplay(dob) || prev.dob || '',
//             english: language === 'en' || prev.english || false,
//             spanish: language === 'es' || prev.spanish || false,
//           }))
          
//           setLoading(false)
//           return
//         }

//         // ✅ Normal flow - check user login and resume
//         let userId = localStorage.getItem('userId')
//         if (!userId) {
//           const user = auth.currentUser
//           if (user) {
//             userId = user.uid
//             localStorage.setItem('userId', userId)
//           }
//         }

//         if (!userId) {
//           console.log('No userId found, starting fresh wizard')
//           setLoading(false)
//           return
//         }

//         // ✅ Check resume
//         const resumeCheck = await wizardService.checkResume(userId)
        
//         if (resumeCheck.needsResume) {
//           setIsResuming(true)
//           const stepToResume = resumeCheck.step
          
//           console.log(`🔄 Resuming wizard from step ${stepToResume}`)
          
//           const progress = await wizardService.getProgress(userId)
          
//           if (progress.success && progress.data.steps) {
//             const savedData = {}
//             Object.keys(progress.data.steps).forEach(key => {
//               const stepNum = parseInt(key.replace('step', ''))
//               const stepKey = `step${stepNum}`
//               savedData[stepKey] = progress.data.steps[key]
//             })
            
//             setWizardData(prev => ({
//               ...prev,
//               ...savedData
//             }))
//           }
          
//           setStep(stepToResume)
//         } else {
//           setStep(1)
//         }

//       } catch (error) {
//         console.error('Error loading wizard state:', error)
//         setError(error.message || 'Failed to load wizard state')
//       } finally {
//         setLoading(false)
//       }
//     }

//     loadWizardState()
//   }, [location?.state, i18n])

//   // ============================================================
//   // HANDLE STEP NAVIGATION - LOCKED
//   // ============================================================

//   const handleStepClick = (targetStep) => {
//     // ✅ Can only navigate to current step or completed steps
//     const maxAllowedStep = Math.max(...completedSteps, step)
    
//     if (targetStep <= maxAllowedStep + 1) {
//       setStep(targetStep)
//       window.scrollTo(0, 0)
//       setError('')
//     } else {
//       // Show error message
//       setError(`Please complete Step ${targetStep - 1} first before accessing Step ${targetStep}`)
//       setTimeout(() => setError(''), 3000)
//     }
//   }

//   // ============================================================
//   // HANDLE DATA CHANGES
//   // ============================================================

//   const handleDataChange = (newData) => {
//     setWizardData(prev => {
//       if (typeof newData === 'function') {
//         const result = newData(prev)
//         return { ...prev, ...result }
//       }
      
//       const merged = { ...prev }
//       Object.keys(newData).forEach(key => {
//         if (typeof newData[key] === 'object' && newData[key] !== null && !Array.isArray(newData[key])) {
//           merged[key] = { ...prev[key], ...newData[key] }
//         } else {
//           merged[key] = newData[key]
//         }
//       })
      
//       return merged
//     })
//   }

//   // ============================================================
//   // SAVE CURRENT STEP
//   // ============================================================

//   const saveCurrentStep = async () => {
//     try {
//       let userId = localStorage.getItem('userId')
//       if (!userId) {
//         const user = auth.currentUser
//         if (user) {
//           userId = user.uid
//           localStorage.setItem('userId', userId)
//         }
//       }
      
//       if (!userId) {
//         console.warn('No userId found, skipping save')
//         return
//       }
      
//       setIsSaving(true)
//       await wizardService.saveStep(userId, step, wizardData)
//       console.log(`✅ Step ${step} saved successfully`)
//     } catch (error) {
//       console.error('Error saving step:', error)
//       setError(error.message || 'Failed to save step')
//       throw error
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   // ============================================================
//   // ✅ SKIP STEP 3 - Go to next step without saving
//   // ============================================================

//   const handleSkipStep3 = () => {
//     // ✅ Go to step 4 directly without saving step 3 data
//     setStep(4)
//     window.scrollTo(0, 0)
//     setError('')
//     console.log('⏭️ Skipped Step 3')
//   }

//   // ============================================================
//   // NAVIGATION
//   // ============================================================

//   const goNext = async () => {
//     try {
//       await saveCurrentStep()
//       // ✅ Only allow going to next step if current step is complete
//       if (completedSteps.includes(step) || step === 1) {
//         setStep((s) => Math.min(maxStep, s + 1))
//         window.scrollTo(0, 0)
//         setError('')
//       } else {
//         setError(`Please complete all fields in Step ${step} before proceeding`)
//         setTimeout(() => setError(''), 3000)
//       }
//     } catch (error) {
//       // Error already set in saveCurrentStep
//     }
//   }

//   const goPrev = async () => {
//     try {
//       await saveCurrentStep()
//       setStep((s) => Math.max(1, s - 1))
//       window.scrollTo(0, 0)
//       setError('')
//     } catch (error) {
//       // Error already set in saveCurrentStep
//     }
//   }

//   // ============================================================
//   // ✅ FINISH WIZARD - Navigate to Registration Success Page
//   // ============================================================

//  // src/worker/pages/WorkerWizardPage.jsx

// const finishWizard = async () => {
//   try {
//     let userId = localStorage.getItem('userId')
//     if (!userId) {
//       const user = auth.currentUser
//       if (user) {
//         userId = user.uid
//         localStorage.setItem('userId', userId)
//       }
//     }
    
//     if (!userId) {
//       throw new Error('User ID not found')
//     }
    
//     setIsSaving(true)
//     setError('')
    
//     // Save final step
//     await wizardService.saveStep(userId, 6, wizardData)
    
//     // Complete wizard
//     await wizardService.completeWizard(userId)
    
//     console.log('✅ Wizard completed successfully')
    
//     // ✅ STEP 13: Set wizard completed flag before navigation
//     localStorage.setItem('wizardCompleted', 'true')
//     localStorage.setItem('wizardCompletedDate', new Date().toISOString())
    
//     // ✅ STEP 14: Dispatch event for TopNav
//     window.dispatchEvent(new CustomEvent('wizardCompleted', {
//       detail: { completed: true }
//     }))
    
//     // Navigate to Registration Success Page
//     navigate('/registration-success', { 
//       replace: true 
//     })
    
//   } catch (error) {
//     console.error('Error completing wizard:', error)
//     setError(error.message || 'Failed to complete wizard')
//   } finally {
//     setIsSaving(false)
//   }
// }

//   // ============================================================
//   // RENDER
//   // ============================================================

//   // ✅ Updated step titles and subtitles for 6 steps
//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Tools, Certifications & Requirements',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Select your primary trade, skill groups, and experience levels.',
//     'Select the tools, certifications, and requirements you possess.',
//     'Recent projects, roles, and reference information.',
//     'Work radius, availability, pay rates, and travel preferences.',
//     'Emergency contact information and policy acknowledgments.'
//   ]

//   // Loading state
//   if (loading) {
//     return (
//       <div style={{ 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center', 
//         height: '100vh',
//         flexDirection: 'column',
//         gap: '16px'
//       }}>
//         <div style={{ 
//           width: '48px', 
//           height: '48px', 
//           border: '4px solid rgba(15, 78, 169, 0.1)',
//           borderTop: '4px solid #0f4ea9',
//           borderRadius: '50%',
//           animation: 'spin 1s linear infinite'
//         }} />
//         <p style={{ color: '#17263a', fontSize: '16px', fontWeight: 500 }}>
//           {isResuming ? 'Resuming your wizard...' : 'Loading wizard...'}
//         </p>
//         <style>{`
//           @keyframes spin {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//         `}</style>
//       </div>
//     )
//   }

//   // Wizard content
//   const wizardContent = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         {/* Header */}
//         <div className="wizardHeader" style={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 10,
//           background: 'white',
//           padding: '16px 24px',
//           borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
//           display: 'flex',
//           justifyContent: 'space-between',
//           alignItems: 'center',
//           flexWrap: 'wrap',
//           gap: '12px'
//         }}>
//           <div>
//             <div className="wizardTitle" style={{
//               fontSize: '18px',
//               fontWeight: 700,
//               color: '#17263a'
//             }}>
//               {stepTitles[step - 1]}
//               {isResuming && step === 1 && (
//                 <span style={{
//                   fontSize: '12px',
//                   fontWeight: 500,
//                   color: '#0f4ea9',
//                   marginLeft: '12px',
//                   background: 'rgba(15, 78, 169, 0.08)',
//                   padding: '2px 12px',
//                   borderRadius: '12px'
//                 }}>
//                   Resumed
//                 </span>
//               )}
//             </div>
//             <div className="wizardSubtitle" style={{
//               fontSize: '13px',
//               color: 'rgba(23, 38, 58, 0.6)',
//               marginTop: '4px'
//             }}>
//               {stepSubtitles[step - 1]}
//             </div>
//           </div>

//           <div className="wizardStepPills" aria-label="Wizard steps" style={{
//             display: 'flex',
//             gap: '8px'
//           }}>
//             {Array.from({ length: maxStep }).map((_, idx) => {
//               const n = idx + 1
//               const isActive = step === n
//               const isCompleted = completedSteps.includes(n)
//               const isLocked = n > Math.max(...completedSteps, 1) + 1
              
//               return (
//                 <button
//                   key={n}
//                   type="button"
//                   className={`wizardStepPill ${isActive ? 'wizardStepPillActive' : ''}`}
//                   onClick={() => !isLocked && handleStepClick(n)}
//                   disabled={isLocked}
//                   style={{
//                     width: '32px',
//                     height: '32px',
//                     borderRadius: '50%',
//                     border: isActive ? '2px solid #0f4ea9' : 
//                            isCompleted ? '2px solid #2fb463' : 
//                            '1px solid rgba(18, 38, 63, 0.12)',
//                     background: isActive ? '#0f4ea9' : 
//                                isCompleted ? '#2fb463' : 
//                                'white',
//                     color: isActive ? 'white' : 
//                            isCompleted ? 'white' : 
//                            '#17263a',
//                     cursor: isLocked ? 'not-allowed' : 'pointer',
//                     fontWeight: 600,
//                     fontSize: '13px',
//                     transition: 'all 0.2s ease',
//                     opacity: isLocked ? 0.4 : 1,
//                     position: 'relative'
//                   }}
//                   title={isLocked ? `Complete Step ${n - 1} first` : `Go to Step ${n}`}
//                 >
//                   {isCompleted && !isActive ? '✓' : n}
//                 </button>
//               )
//             })}
//           </div>
//         </div>

//         {/* Error Display */}
//         {error && (
//           <div style={{
//             padding: '12px 20px',
//             background: '#fee2e2',
//             color: '#dc2626',
//             borderBottom: '1px solid #fecaca',
//             fontSize: '14px',
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center'
//           }}>
//             <span>❌ {error}</span>
//             <button
//               onClick={() => setError('')}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 color: '#dc2626',
//                 fontWeight: 'bold',
//                 fontSize: '18px'
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Body */}
//         <div className="wizardBody" style={{
//           maxHeight: 'calc(100vh - 320px)',
//           overflowY: 'auto',
//           padding: '20px 24px',
//           scrollBehavior: 'smooth'
//         }}>
//           {step === 1 && (
//             <WizardStep1 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//             />
//           )}
//           {step === 2 && (
//             <WizardStep2 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 3 && (
//             <WizardStep3 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//               onSkip={handleSkipStep3}  // ✅ ADDED - Skip handler for Step 3
//             />
//           )}
//           {step === 4 && (
//             <WizardStep4 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 5 && (
//             <WizardStep5 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onNext={goNext} 
//               onBack={goPrev} 
//             />
//           )}
//           {step === 6 && (
//             <WizardStep6 
//               data={wizardData} 
//               onChange={handleDataChange} 
//               onFinish={finishWizard} 
//               onBack={goPrev} 
//             />
//           )}
//         </div>

//       {/* Footer */}
// <div className="wizardFooter" style={{
//   position: 'sticky',
//   bottom: 0,
//   zIndex: 10,
//   background: 'white',
//   padding: '12px 24px',
//   borderTop: '1px solid rgba(18, 38, 63, 0.06)',
//   boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center'
// }}>
//   <button 
//     type="button" 
//     className="wizardPillBtn" 
//     onClick={step === 1 ? () => navigate('/verify') : goPrev}
//     disabled={step === 1 && isSaving}
//     style={{
//       padding: '8px 20px',
//       borderRadius: '8px',
//       background: 'transparent',
//       color: '#17263a',
//       border: '1px solid rgba(18, 38, 63, 0.12)',
//       cursor: 'pointer',
//       fontWeight: 500,
//       fontSize: '14px',
//       transition: 'all 0.2s',
//       opacity: step === 1 ? 0.6 : 1,
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     }}
//   >
//     <span>{step === 1 ? 'Back' : 'Back'}</span>
//   </button>

//   <div className="wizardFooterRight" style={{
//     display: 'flex',
//     gap: '12px',
//     alignItems: 'center'
//   }}>
//     {/* ✅ SKIP BUTTON - Only show on Step 3 */}
//     {step === 3 && (
//       <button 
//         type="button" 
//         className="wizardPillBtn wizardPillBtnSkip" 
//         onClick={handleSkipStep3}
//         style={{
//           padding: '8px 24px',
//           borderRadius: '8px',
//           background: 'transparent',
//           color: '#17263a',
//           border: '1px solid rgba(18, 38, 63, 0.2)',
//           cursor: 'pointer',
//           fontWeight: 500,
//           fontSize: '14px',
//           transition: 'all 0.2s',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px'
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'
//           e.currentTarget.style.borderColor = 'rgba(18, 38, 63, 0.3)'
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.background = 'transparent'
//           e.currentTarget.style.borderColor = 'rgba(18, 38, 63, 0.2)'
//         }}
//       >
//         <span>{t('common.skip') || 'Skip'}</span>
//         <span>→</span>
//       </button>
//     )}

//     {step < maxStep ? (
//       <button 
//         type="button" 
//         className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
//         onClick={goNext}
//         disabled={isSaving || !completedSteps.includes(step)}
//         style={{
//           padding: '8px 24px',
//           borderRadius: '8px',
//           background: isSaving || !completedSteps.includes(step) ? '#94a3b8' : '#0f4ea9',
//           color: 'white',
//           border: 'none',
//           cursor: (isSaving || !completedSteps.includes(step)) ? 'not-allowed' : 'pointer',
//           fontWeight: 600,
//           fontSize: '14px',
//           transition: 'all 0.2s',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           opacity: (isSaving || !completedSteps.includes(step)) ? 0.7 : 1
//         }}
//         title={!completedSteps.includes(step) ? `Complete all fields in Step ${step} first` : ''}
//       >
//         <span>{isSaving ? 'Saving...' : 'Next'}</span>
//         <span>→</span>
//       </button>
//     ) : (
//       <button 
//         type="button" 
//         className="wizardPillBtn wizardPillBtnSuccess" 
//         onClick={finishWizard}
//         disabled={isSaving || !completedSteps.includes(6)}
//         style={{
//           padding: '8px 24px',
//           borderRadius: '8px',
//           background: isSaving || !completedSteps.includes(6) ? '#94a3b8' : '#2fb463',
//           color: 'white',
//           border: 'none',
//           cursor: (isSaving || !completedSteps.includes(6)) ? 'not-allowed' : 'pointer',
//           fontWeight: 600,
//           fontSize: '14px',
//           transition: 'all 0.2s',
//           display: 'flex',
//           alignItems: 'center',
//           gap: '8px',
//           opacity: (isSaving || !completedSteps.includes(6)) ? 0.7 : 1
//         }}
//         title={!completedSteps.includes(6) ? 'Complete all fields in Step 6 first' : ''}
//       >
//         <span>{isSaving ? 'Saving...' : 'Finish'}</span>
//         <span>✓</span>
//       </button>
//     )}
//   </div>
// </div>
//       </div>
//     </div>
//   )

//   if (embedded) {
//     return <div className="wizardEmbedded">{wizardContent}</div>
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

//         <main className="appContent">{wizardContent}</main>
//       </div>
//     </div>
//   )
// }

// export default WorkerWizardPage








// src/worker/pages/WorkerWizardPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TopNav } from '../../common/components/TopNav'
import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
import { WizardStep5 } from '../components/wizard-steps/WizardStep5'
import { WizardStep6 } from '../components/wizard-steps/WizardStep6'
import wizardService from '../services/workerWizardService'
import workerService from '../services/workerService'
import { auth } from '../../firebase/config'
import { changeLanguage, getStoredLanguage, setUserLanguage } from '../../i18n/config'

// ✅ Helper function to convert YYYY-MM-DD to MM/DD/YYYY
const formatDateForDisplay = (dateStr) => {
  if (!dateStr) return ''
  if (dateStr.includes('/')) return dateStr
  const parts = dateStr.split('-')
  if (parts.length === 3) {
    return `${parts[1]}/${parts[2]}/${parts[0]}`
  }
  return dateStr
}

// Icons for sidebar
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

// ✅ Mobile Sidebar Content Component
function MobileSidebarContent() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  return (
    <>
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
    </>
  )
}

export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [step, setStep] = useState(1)
  const maxStep = 6
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isResuming, setIsResuming] = useState(false)
  const [completedSteps, setCompletedSteps] = useState([]) // ✅ Track completed steps
  
  // ✅ Initialize with data from localStorage and location.state
  const [wizardData, setWizardData] = useState(() => {
    const firstName = localStorage.getItem('pendingFirstName') || ''
    const lastName = localStorage.getItem('pendingLastName') || ''
    const email = localStorage.getItem('pendingEmail') || ''
    const phone = localStorage.getItem('pendingPhoneNumber') || ''
    const dob = localStorage.getItem('pendingDob') || ''
    const language = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage') || 'en'
    
    const fromVerification = location?.state?.fromVerification || false
    const state = location?.state || {}
    
    return {
      // Step 1: Personal Information
      legalFirstName: fromVerification ? (state.firstName || firstName) : firstName,
      legalLastName: fromVerification ? (state.lastName || lastName) : lastName,
      emailAddress: fromVerification ? (state.email || email) : email,
      mobilePhone: fromVerification ? (state.phoneNumber || phone) : phone,
      dob: fromVerification 
        ? (formatDateForDisplay(state.dob) || formatDateForDisplay(dob))
        : formatDateForDisplay(dob),
      addressLine1: '',
      addressLine2: '',
      city: '',
      stateCode: '',
      zip: '',
      currentAddressLine1: '',
      currentAddressLine2: '',
      currentCity: '',
      currentStateCode: '',
      currentZip: '',
      sameAsAddress: false,
      english: fromVerification ? (state.language === 'en' || language === 'en') : (language === 'en'),
      englishSpanish: false,
      spanish: fromVerification ? (state.language === 'es' || language === 'es') : (language === 'es'),
      profilePreview: '',
      profileImageKey: '',
      profileImageUrl: '',
      acceptTerms: false,
      acceptPrivacy: false,
      consentElectronic: false,
      certifyAccurate: false,

      // Step 2: Trade Profile
      mainTrade: '',
      skillGroups: {},
      skillDetails: {},

      // Step 3: Tools, Certifications & Requirements
      toolsCertifications: {},
      heavyEquipment: {},

      // Step 4: Work History
      projects: [
        { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
        { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
        { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
      ],

      // Step 5: Availability
      hourlyRate: '',
      payPrefs: {},
      travelRadius: 50,
      willingToTravel: '',
      travelPrefs: {},
      availability: {},

      // Step 6: Emergency Contact & Certifications
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '',
      policyAcks: {},
      certChecklist: {},
      certRows: [
        { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
        { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
        { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
      ],
      safetyFlags: {},
    }
  })

  // ============================================================
  // ✅ CHECK WHICH STEPS ARE COMPLETED
  // ============================================================

  const checkCompletedSteps = () => {
    const completed = []
    
    // Check Step 1: Basics
    if (wizardData.legalFirstName && wizardData.legalLastName && 
        wizardData.emailAddress && wizardData.mobilePhone && wizardData.dob) {
      completed.push(1)
    }
    
    // Check Step 2 & 3: Trade (combined)
    if (wizardData.mainTrade) {
      completed.push(2)
      // Step 3 is considered complete if Step 2 is complete (they share the same data)
      completed.push(3)
    }
    
    // Check Step 4: Work History
    const hasProjects = wizardData.projects && wizardData.projects.some(p => p.name && p.client)
    if (hasProjects) {
      completed.push(4)
    }
    
    // Check Step 5: Availability
    if (wizardData.hourlyRate && wizardData.willingToTravel) {
      completed.push(5)
    }
    
    // Check Step 6: Emergency Contact
    if (wizardData.emergencyContactName && wizardData.emergencyContactRelationship && 
        wizardData.emergencyContactPhone) {
      completed.push(6)
    }
    
    setCompletedSteps(completed)
  }

  // ============================================================
  // ✅ ENSURE LANGUAGE IS SET ON WIZARD LOAD
  // ============================================================

  useEffect(() => {
    const syncLanguage = () => {
      const storedLang = getStoredLanguage() || 'en'
      const langFromState = location?.state?.language
      const langFromLocal = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage')
      const targetLang = langFromState || langFromLocal || storedLang || 'en'
      
      if (targetLang && targetLang !== i18n.language) {
        console.log('🔄 Syncing wizard language to:', targetLang)
        changeLanguage(targetLang)
        setUserLanguage(targetLang)
      }
    }
    
    syncLanguage()
  }, [i18n, location?.state?.language])

  // ============================================================
  // ✅ ENSURE AUTH TOKEN IS SET (CRITICAL FOR AVATAR)
  // ============================================================

  useEffect(() => {
    // ✅ Generate a session token
    const generateSessionToken = () => {
      return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    }

    // ✅ If authToken is passed from verification page, set it
    if (location?.state?.authToken) {
      localStorage.setItem('authToken', location.state.authToken)
      console.log('✅ Auth token set from verification page')
    }
    
    // ✅ If we have userId but no authToken, create one
    const userId = localStorage.getItem('userId')
    const authToken = localStorage.getItem('authToken')
    
    if (userId && !authToken) {
      const sessionToken = generateSessionToken()
      localStorage.setItem('authToken', sessionToken)
      console.log('✅ New auth token created in wizard:', sessionToken)
    }
    
    // ✅ Set user name for avatar if available
    if (location?.state?.firstName) {
      localStorage.setItem('userFirstName', location.state.firstName)
      localStorage.setItem('pendingFirstName', location.state.firstName)
    }
    if (location?.state?.lastName) {
      localStorage.setItem('userLastName', location.state.lastName)
      localStorage.setItem('pendingLastName', location.state.lastName)
    }
    
    // ✅ Trigger profile update event for avatar
    const firstName = localStorage.getItem('userFirstName') || 
                      localStorage.getItem('pendingFirstName') || 
                      'User'
    window.dispatchEvent(new CustomEvent('profileImageUpdated', {
      detail: { 
        firstName: firstName,
        profileImage: localStorage.getItem('userProfileImage')
      }
    }))
    
    console.log('✅ Auth token check complete. Token exists:', !!localStorage.getItem('authToken'))
    
  }, [location?.state])

  // ✅ Check completed steps whenever wizardData changes
  useEffect(() => {
    checkCompletedSteps()
  }, [wizardData])

  // ============================================================
  // LOAD WIZARD STATE - RESUME FEATURE
  // ============================================================

  useEffect(() => {
    const loadWizardState = async () => {
      try {
        // ✅ If coming from verification page, use location.state
        if (location?.state?.fromVerification) {
          const state = location.state
          console.log('✅ Wizard loaded from verification data:', state)
          
          // ✅ Ensure language is set from verification data
          const langFromState = state.language || 'en'
          if (langFromState !== i18n.language) {
            changeLanguage(langFromState)
            setUserLanguage(langFromState)
          }
          
          setWizardData(prev => ({
            ...prev,
            legalFirstName: state.firstName || prev.legalFirstName || '',
            legalLastName: state.lastName || prev.legalLastName || '',
            emailAddress: state.email || prev.emailAddress || '',
            mobilePhone: state.phoneNumber || prev.mobilePhone || '',
            dob: formatDateForDisplay(state.dob) || prev.dob || '',
            english: state.language === 'en' || prev.english || false,
            spanish: state.language === 'es' || prev.spanish || false,
          }))
          
          setLoading(false)
          return
        }

        // ✅ Check for existing data in localStorage
        const firstName = localStorage.getItem('pendingFirstName')
        const email = localStorage.getItem('pendingEmail')
        const dob = localStorage.getItem('pendingDob')
        const language = localStorage.getItem('pendingLanguage') || localStorage.getItem('userLanguage') || 'en'
        
        // ✅ Ensure language is set from localStorage
        if (language !== i18n.language) {
          changeLanguage(language)
          setUserLanguage(language)
        }
        
        if (firstName || email) {
          console.log('✅ Loading wizard from localStorage')
          setWizardData(prev => ({
            ...prev,
            legalFirstName: firstName || prev.legalFirstName || '',
            legalLastName: localStorage.getItem('pendingLastName') || prev.legalLastName || '',
            emailAddress: email || prev.emailAddress || '',
            mobilePhone: localStorage.getItem('pendingPhoneNumber') || prev.mobilePhone || '',
            dob: formatDateForDisplay(dob) || prev.dob || '',
            english: language === 'en' || prev.english || false,
            spanish: language === 'es' || prev.spanish || false,
          }))
          
          setLoading(false)
          return
        }

        // ✅ Normal flow - check user login and resume
        let userId = localStorage.getItem('userId')
        if (!userId) {
          const user = auth.currentUser
          if (user) {
            userId = user.uid
            localStorage.setItem('userId', userId)
          }
        }

        if (!userId) {
          console.log('No userId found, starting fresh wizard')
          setLoading(false)
          return
        }

        // ✅ Check resume
        const resumeCheck = await wizardService.checkResume(userId)
        
        if (resumeCheck.needsResume) {
          setIsResuming(true)
          const stepToResume = resumeCheck.step
          
          console.log(`🔄 Resuming wizard from step ${stepToResume}`)
          
          const progress = await wizardService.getProgress(userId)
          
          if (progress.success && progress.data.steps) {
            const savedData = {}
            Object.keys(progress.data.steps).forEach(key => {
              const stepNum = parseInt(key.replace('step', ''))
              const stepKey = `step${stepNum}`
              savedData[stepKey] = progress.data.steps[key]
            })
            
            setWizardData(prev => ({
              ...prev,
              ...savedData
            }))
          }
          
          setStep(stepToResume)
        } else {
          setStep(1)
        }

      } catch (error) {
        console.error('Error loading wizard state:', error)
        setError(error.message || 'Failed to load wizard state')
      } finally {
        setLoading(false)
      }
    }

    loadWizardState()
  }, [location?.state, i18n])

  // ============================================================
  // HANDLE STEP NAVIGATION - LOCKED
  // ============================================================

  const handleStepClick = (targetStep) => {
    // ✅ Can only navigate to current step or completed steps
    const maxAllowedStep = Math.max(...completedSteps, step)
    
    if (targetStep <= maxAllowedStep + 1) {
      setStep(targetStep)
      window.scrollTo(0, 0)
      setError('')
    } else {
      // Show error message
      setError(`Please complete Step ${targetStep - 1} first before accessing Step ${targetStep}`)
      setTimeout(() => setError(''), 3000)
    }
  }

  // ============================================================
  // HANDLE DATA CHANGES
  // ============================================================

  const handleDataChange = (newData) => {
    setWizardData(prev => {
      if (typeof newData === 'function') {
        const result = newData(prev)
        return { ...prev, ...result }
      }
      
      const merged = { ...prev }
      Object.keys(newData).forEach(key => {
        if (typeof newData[key] === 'object' && newData[key] !== null && !Array.isArray(newData[key])) {
          merged[key] = { ...prev[key], ...newData[key] }
        } else {
          merged[key] = newData[key]
        }
      })
      
      return merged
    })
  }

  // ============================================================
  // SAVE CURRENT STEP
  // ============================================================

  const saveCurrentStep = async () => {
    try {
      let userId = localStorage.getItem('userId')
      if (!userId) {
        const user = auth.currentUser
        if (user) {
          userId = user.uid
          localStorage.setItem('userId', userId)
        }
      }
      
      if (!userId) {
        console.warn('No userId found, skipping save')
        return
      }
      
      setIsSaving(true)
      await wizardService.saveStep(userId, step, wizardData)
      console.log(`✅ Step ${step} saved successfully`)
    } catch (error) {
      console.error('Error saving step:', error)
      setError(error.message || 'Failed to save step')
      throw error
    } finally {
      setIsSaving(false)
    }
  }

  // ============================================================
  // ✅ SKIP STEP 3 - Go to next step without saving
  // ============================================================

  const handleSkipStep3 = () => {
    // ✅ Go to step 4 directly without saving step 3 data
    setStep(4)
    window.scrollTo(0, 0)
    setError('')
    console.log('⏭️ Skipped Step 3')
  }

  // ============================================================
  // NAVIGATION
  // ============================================================

  const goNext = async () => {
    try {
      await saveCurrentStep()
      // ✅ Only allow going to next step if current step is complete
      if (completedSteps.includes(step) || step === 1) {
        setStep((s) => Math.min(maxStep, s + 1))
        window.scrollTo(0, 0)
        setError('')
      } else {
        setError(`Please complete all fields in Step ${step} before proceeding`)
        setTimeout(() => setError(''), 3000)
      }
    } catch (error) {
      // Error already set in saveCurrentStep
    }
  }

  const goPrev = async () => {
    try {
      await saveCurrentStep()
      setStep((s) => Math.max(1, s - 1))
      window.scrollTo(0, 0)
      setError('')
    } catch (error) {
      // Error already set in saveCurrentStep
    }
  }

  // ============================================================
  // ✅ FINISH WIZARD - Navigate to Registration Success Page
  // ============================================================

  const finishWizard = async () => {
    try {
      let userId = localStorage.getItem('userId')
      if (!userId) {
        const user = auth.currentUser
        if (user) {
          userId = user.uid
          localStorage.setItem('userId', userId)
        }
      }
      
      if (!userId) {
        throw new Error('User ID not found')
      }
      
      setIsSaving(true)
      setError('')
      
      // Save final step
      await wizardService.saveStep(userId, 6, wizardData)
      
      // Complete wizard
      await wizardService.completeWizard(userId)
      
      console.log('✅ Wizard completed successfully')
      
      // ✅ STEP 13: Set wizard completed flag before navigation
      localStorage.setItem('wizardCompleted', 'true')
      localStorage.setItem('wizardCompletedDate', new Date().toISOString())
      
      // ✅ STEP 14: Dispatch event for TopNav
      window.dispatchEvent(new CustomEvent('wizardCompleted', {
        detail: { completed: true }
      }))
      
      // Navigate to Registration Success Page
      navigate('/registration-success', { 
        replace: true 
      })
      
    } catch (error) {
      console.error('Error completing wizard:', error)
      setError(error.message || 'Failed to complete wizard')
    } finally {
      setIsSaving(false)
    }
  }

  // ============================================================
  // RENDER
  // ============================================================

  // ✅ Updated step titles and subtitles for 6 steps
  const stepTitles = [
    'Personal Information',
    'Trade Profile & Skill Matrix',
    'Tools, Certifications & Requirements',
    'Work History & Project Experience',
    'Availability, Travel & Pay Preferences',
    'Emergency Contact & Acknowledgments'
  ]

  const stepSubtitles = [
    'Basic personal information, contact details, and address.',
    'Select your primary trade, skill groups, and experience levels.',
    'Select the tools, certifications, and requirements you possess.',
    'Recent projects, roles, and reference information.',
    'Work radius, availability, pay rates, and travel preferences.',
    'Emergency contact information and policy acknowledgments.'
  ]

  // Loading state
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '16px'
      }}>
        <div style={{ 
          width: '48px', 
          height: '48px', 
          border: '4px solid rgba(15, 78, 169, 0.1)',
          borderTop: '4px solid #0f4ea9',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <p style={{ color: '#17263a', fontSize: '16px', fontWeight: 500 }}>
          {isResuming ? 'Resuming your wizard...' : 'Loading wizard...'}
        </p>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    )
  }

  // Wizard content
  const wizardContent = (
    <div className="wizardPage">
      <div className="wizardCard">
        {/* Header */}
        <div className="wizardHeader" style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'white',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div>
            <div className="wizardTitle" style={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#17263a'
            }}>
              {stepTitles[step - 1]}
              {isResuming && step === 1 && (
                <span style={{
                  fontSize: '12px',
                  fontWeight: 500,
                  color: '#0f4ea9',
                  marginLeft: '12px',
                  background: 'rgba(15, 78, 169, 0.08)',
                  padding: '2px 12px',
                  borderRadius: '12px'
                }}>
                  Resumed
                </span>
              )}
            </div>
            <div className="wizardSubtitle" style={{
              fontSize: '13px',
              color: 'rgba(23, 38, 58, 0.6)',
              marginTop: '4px'
            }}>
              {stepSubtitles[step - 1]}
            </div>
          </div>

          <div className="wizardStepPills" aria-label="Wizard steps" style={{
            display: 'flex',
            gap: '8px'
          }}>
            {Array.from({ length: maxStep }).map((_, idx) => {
              const n = idx + 1
              const isActive = step === n
              const isCompleted = completedSteps.includes(n)
              const isLocked = n > Math.max(...completedSteps, 1) + 1
              
              return (
                <button
                  key={n}
                  type="button"
                  className={`wizardStepPill ${isActive ? 'wizardStepPillActive' : ''}`}
                  onClick={() => !isLocked && handleStepClick(n)}
                  disabled={isLocked}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: isActive ? '2px solid #0f4ea9' : 
                           isCompleted ? '2px solid #2fb463' : 
                           '1px solid rgba(18, 38, 63, 0.12)',
                    background: isActive ? '#0f4ea9' : 
                               isCompleted ? '#2fb463' : 
                               'white',
                    color: isActive ? 'white' : 
                           isCompleted ? 'white' : 
                           '#17263a',
                    cursor: isLocked ? 'not-allowed' : 'pointer',
                    fontWeight: 600,
                    fontSize: '13px',
                    transition: 'all 0.2s ease',
                    opacity: isLocked ? 0.4 : 1,
                    position: 'relative'
                  }}
                  title={isLocked ? `Complete Step ${n - 1} first` : `Go to Step ${n}`}
                >
                  {isCompleted && !isActive ? '✓' : n}
                </button>
              )
            })}
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div style={{
            padding: '12px 20px',
            background: '#fee2e2',
            color: '#dc2626',
            borderBottom: '1px solid #fecaca',
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

        {/* Body */}
        <div className="wizardBody" style={{
          maxHeight: 'calc(100vh - 320px)',
          overflowY: 'auto',
          padding: '20px 24px',
          scrollBehavior: 'smooth'
        }}>
          {step === 1 && (
            <WizardStep1 
              data={wizardData} 
              onChange={handleDataChange} 
              onNext={goNext} 
            />
          )}
          {step === 2 && (
            <WizardStep2 
              data={wizardData} 
              onChange={handleDataChange} 
              onNext={goNext} 
              onBack={goPrev} 
            />
          )}
          {step === 3 && (
            <WizardStep3 
              data={wizardData} 
              onChange={handleDataChange} 
              onNext={goNext} 
              onBack={goPrev} 
              onSkip={handleSkipStep3}  // ✅ ADDED - Skip handler for Step 3
            />
          )}
          {step === 4 && (
            <WizardStep4 
              data={wizardData} 
              onChange={handleDataChange} 
              onNext={goNext} 
              onBack={goPrev} 
            />
          )}
          {step === 5 && (
            <WizardStep5 
              data={wizardData} 
              onChange={handleDataChange} 
              onNext={goNext} 
              onBack={goPrev} 
            />
          )}
          {step === 6 && (
            <WizardStep6 
              data={wizardData} 
              onChange={handleDataChange} 
              onFinish={finishWizard} 
              onBack={goPrev} 
            />
          )}
        </div>

      {/* Footer */}
<div className="wizardFooter" style={{
  position: 'sticky',
  bottom: 0,
  zIndex: 10,
  background: 'white',
  padding: '12px 24px',
  borderTop: '1px solid rgba(18, 38, 63, 0.06)',
  boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}}>
  <button 
    type="button" 
    className="wizardPillBtn" 
    onClick={step === 1 ? () => navigate('/verify') : goPrev}
    disabled={step === 1 && isSaving}
    style={{
      padding: '8px 20px',
      borderRadius: '8px',
      background: 'transparent',
      color: '#17263a',
      border: '1px solid rgba(18, 38, 63, 0.12)',
      cursor: 'pointer',
      fontWeight: 500,
      fontSize: '14px',
      transition: 'all 0.2s',
      opacity: step === 1 ? 0.6 : 1,
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }}
  >
    <span>{step === 1 ? 'Back' : 'Back'}</span>
  </button>

  <div className="wizardFooterRight" style={{
    display: 'flex',
    gap: '12px',
    alignItems: 'center'
  }}>
    {/* ✅ SKIP BUTTON - Only show on Step 3 */}
    {step === 3 && (
      <button 
        type="button" 
        className="wizardPillBtn wizardPillBtnSkip" 
        onClick={handleSkipStep3}
        style={{
          padding: '8px 24px',
          borderRadius: '8px',
          background: 'transparent',
          color: '#17263a',
          border: '1px solid rgba(18, 38, 63, 0.2)',
          cursor: 'pointer',
          fontWeight: 500,
          fontSize: '14px',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'
          e.currentTarget.style.borderColor = 'rgba(18, 38, 63, 0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent'
          e.currentTarget.style.borderColor = 'rgba(18, 38, 63, 0.2)'
        }}
      >
        <span>{t('common.skip') || 'Skip'}</span>
        <span>→</span>
      </button>
    )}

    {step < maxStep ? (
      <button 
        type="button" 
        className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
        onClick={goNext}
        disabled={isSaving || !completedSteps.includes(step)}
        style={{
          padding: '8px 24px',
          borderRadius: '8px',
          background: isSaving || !completedSteps.includes(step) ? '#94a3b8' : '#0f4ea9',
          color: 'white',
          border: 'none',
          cursor: (isSaving || !completedSteps.includes(step)) ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: (isSaving || !completedSteps.includes(step)) ? 0.7 : 1
        }}
        title={!completedSteps.includes(step) ? `Complete all fields in Step ${step} first` : ''}
      >
        <span>{isSaving ? 'Saving...' : 'Next'}</span>
        <span>→</span>
      </button>
    ) : (
      <button 
        type="button" 
        className="wizardPillBtn wizardPillBtnSuccess" 
        onClick={finishWizard}
        disabled={isSaving || !completedSteps.includes(6)}
        style={{
          padding: '8px 24px',
          borderRadius: '8px',
          background: isSaving || !completedSteps.includes(6) ? '#94a3b8' : '#2fb463',
          color: 'white',
          border: 'none',
          cursor: (isSaving || !completedSteps.includes(6)) ? 'not-allowed' : 'pointer',
          fontWeight: 600,
          fontSize: '14px',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          opacity: (isSaving || !completedSteps.includes(6)) ? 0.7 : 1
        }}
        title={!completedSteps.includes(6) ? 'Complete all fields in Step 6 first' : ''}
      >
        <span>{isSaving ? 'Saving...' : 'Finish'}</span>
        <span>✓</span>
      </button>
    )}
  </div>
</div>
      </div>
    </div>
  )

  if (embedded) {
    return <div className="wizardEmbedded">{wizardContent}</div>
  }

  // ✅ Updated return with mobileMenuContent prop
  return (
    <div className="appShell">
      {/* ✅ Pass mobileMenuContent to TopNav */}
      <TopNav variant="solid" mobileMenuContent={<MobileSidebarContent />} />

      <div className="appShellBody appShellBodyVerify">
        {/* ✅ Sidebar - Hidden on mobile, visible on desktop */}
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

        <main className="appContent">{wizardContent}</main>
      </div>

      {/* ✅ Mobile CSS: Hide sidebar, show hamburger menu */}
      <style>{`
        @media (max-width: 768px) {
          .sideNav {
            display: none !important;
          }
          .appShellBody {
            grid-template-columns: 1fr !important;
          }
        }
        @media (min-width: 769px) {
          .sideNav {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  )
}

export default WorkerWizardPage