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
// import { WizardStep7 } from '../components/wizard-steps/WizardStep7'
// import { WizardStep8 } from '../components/wizard-steps/WizardStep8'
// import { WizardStep9 } from '../components/wizard-steps/WizardStep9'

// export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [step, setStep] = useState(1)
//   const maxStep = 9

//   // Wizard data state
//   const [wizardData, setWizardData] = useState({
//     // Step 1
//     emailAddress: '',
//     mobilePhone: '',
//     tempPassword: '',
//     smsCodeVerified: '',
//     emailVerified: '',
//     legalFirstName: '',
//     legalLastName: '',
//     displayName: '',
//     dob: '',
//     addressLine1: '',
//     addressLine2: '',
//     city: '',
//     stateCode: '',
//     zip: '',
//     profilePhotoRef: '',
//     primaryLanguage: '',
//     additionalLanguages: '',
//     currentCityMarket: '',
//     acceptTerms: false,
//     acceptPrivacy: false,
//     consentElectronic: false,
//     certifyAccurate: false,
    
//     // Step 2
//     bloodGroup: '',
//     emergencyMedicalInfo: 'none',
//     emergencyMedicalFlags: {},
//     emergencyInstructions: '',
    
//     // Step 3
//     primaryTrade: '',
//     secondaryTrades: '',
//     primaryLevel: '',
//     yearsExperience: '',
//     interiorsSkills: {},
//     additionalSkills: '',
//     fieldReadiness: {},
//     travelRadiusMiles: '',
//     languages: '',
    
//     // Step 4 & 5
//     projects: [
//       { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//       { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//       { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//     ],
//     projectConditions: {},
//     referenceName: '',
//     referenceTitle: '',
//     referencePhone: '',
//     reviewerNotes: '',
    
//     // Step 6
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
    
//     // Step 7
//     earliestStartDate: '',
//     hourlyRateRequested: '',
//     pieceworkNotes: '',
//     payPrefs: {},
//     homeMarketCity: '',
//     statesWillingToWorkIn: '',
//     travelPrefs: {},
//     availability: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' },
    
//     // Step 8
//     certChecklist: {},
//     certRows: [
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//       { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//     ],
//     safetyFlags: {},
    
//     // Step 9
//     emergencyContactName: '',
//     emergencyContactRelationship: '',
//     emergencyContactPhone: '',
//     policyAcks: {},
//     signatureWorkerName: '',
//     signatureDate: '',
//     signatureToken: '',
//   })

//   useEffect(() => {
//     const requested = initialStepOverride ?? location?.state?.initialStep
//     if (typeof requested === 'number' && Number.isFinite(requested)) {
//       setStep((prev) => (prev === requested ? prev : Math.min(maxStep, Math.max(1, requested))))
//     }
//   }, [initialStepOverride, location?.state?.initialStep])

//   const stepTitles = [
//     'Worker Account & Identity Intake',
//     'Emergency Medical Information',
//     'Trade Profile & Skill Matrix',
//     'Work History & Project Experience',
//     'Work History & Project Experience — Continued',
//     'Classification, Tax & Compliance Intake',
//     'Availability, Travel, Pay & Assignment Preferences',
//     'Certifications, Safety & Equipment Qualifications',
//     'Emergency Contact, Policies & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Use for initial account creation, identity basics, contact data, and public profile photo.',
//     'Optional information to assist emergency responders.',
//     'Use to classify primary trade, level, years of experience, specialty skills, and field capability.',
//     'Use to collect recent projects, type of work performed, role held, and reference-ready experience.',
//     'Continue collecting recent project history and references.',
//     'Use to route the worker or subcontractor through the correct compliance path for W-2 / 1099 onboarding.',
//     'Use to collect start date, schedule, travel radius, pay preference, and deployment expectations.',
//     'Use to collect proof of OSHA, lift, PIT, CPR, and related safety training relevant to interiors work.',
//     'Use to capture emergency contact details and signed acknowledgments required before activation.'
//   ]

//   const goNext = () => setStep((s) => Math.min(maxStep, s + 1))
//   const goPrev = () => setStep((s) => Math.max(1, s - 1))

//   const finishWizard = () => {
//     navigate('/wizard/summary', {
//       state: {
//         basics: {
//           legalFirstName: wizardData.legalFirstName,
//           legalLastName: wizardData.legalLastName,
//           displayName: wizardData.displayName,
//           emailAddress: wizardData.emailAddress,
//           mobilePhone: wizardData.mobilePhone,
//           dob: wizardData.dob,
//           addressLine1: wizardData.addressLine1,
//           addressLine2: wizardData.addressLine2,
//           city: wizardData.city,
//           stateCode: wizardData.stateCode,
//           zip: wizardData.zip,
//         },
//         trade: {
//           primaryTrade: wizardData.primaryTrade,
//           primaryLevel: wizardData.primaryLevel,
//           yearsExperience: wizardData.yearsExperience,
//           travelRadiusMiles: wizardData.travelRadiusMiles,
//         },
//         workHistory: {
//           projects: wizardData.projects,
//           projectConditions: wizardData.projectConditions,
//           referenceName: wizardData.referenceName,
//           referenceTitle: wizardData.referenceTitle,
//           referencePhone: wizardData.referencePhone,
//         },
//         certifications: {
//           certChecklist: wizardData.certChecklist,
//           safetyFlags: wizardData.safetyFlags,
//         },
//         tax: {
//           classificationPath: wizardData.classificationPath,
//           stateOfWork: wizardData.stateOfWork,
//           employeeTaxName: wizardData.employeeTaxName,
//         },
//         availability: {
//           earliestStartDate: wizardData.earliestStartDate,
//           hourlyRateRequested: wizardData.hourlyRateRequested,
//           payPrefs: wizardData.payPrefs,
//         },
//         medical: {
//           emergencyMedicalInfo: wizardData.emergencyMedicalInfo,
//           bloodGroup: wizardData.bloodGroup,
//           emergencyMedicalFlags: wizardData.emergencyMedicalFlags,
//           emergencyInstructions: wizardData.emergencyInstructions,
//         },
//         acknowledgments: {
//           emergencyContactName: wizardData.emergencyContactName,
//           emergencyContactRelationship: wizardData.emergencyContactRelationship,
//           emergencyContactPhone: wizardData.emergencyContactPhone,
//           policyAcks: wizardData.policyAcks,
//           signatureWorkerName: wizardData.signatureWorkerName,
//           signatureDate: wizardData.signatureDate,
//         },
//       },
//     })
//   }

//   const wizardInner = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         <div className="wizardHeader">
//           <div>
//             <div className="wizardTitle">{stepTitles[step - 1]}</div>
//             <div className="wizardSubtitle">{stepSubtitles[step - 1]}</div>
//           </div>

//           <div className="wizardStepPills" aria-label="Wizard steps">
//             {Array.from({ length: maxStep }).map((_, idx) => {
//               const n = idx + 1
//               return (
//                 <button
//                   key={n}
//                   type="button"
//                   className={`wizardStepPill ${step === n ? 'wizardStepPillActive' : ''}`}
//                   onClick={() => setStep(n)}
//                 >
//                   {n}
//                 </button>
//               )
//             })}
//           </div>
//         </div>

//         {step === 1 && <WizardStep1 data={wizardData} onChange={setWizardData} onNext={goNext} />}
//         {step === 2 && <WizardStep2 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 3 && <WizardStep3 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 4 && <WizardStep4 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 5 && <WizardStep5 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 6 && <WizardStep6 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 7 && <WizardStep7 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 8 && <WizardStep8 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 9 && <WizardStep9 data={wizardData} onChange={setWizardData} onFinish={finishWizard} onBack={goPrev} />}
//       </div>
//     </div>
//   )

//   if (embedded) {
//     return <div className="wizardEmbedded">{wizardInner}</div>
//   }

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavHeader">
//             <div className="sideMark" aria-hidden="true">
//               <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
//             </div>
//             <div className="sideMeta">
//               <div className="sideTitle">Tradesmap</div>
//             </div>
//           </div>

//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">{wizardInner}</main>
//       </div>
//     </div>
//   )
// }


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
// import { WizardStep7 } from '../components/wizard-steps/WizardStep7'
// import { WizardStep8 } from '../components/wizard-steps/WizardStep8'
// import { WizardStep9 } from '../components/wizard-steps/WizardStep9'

// export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [step, setStep] = useState(1)
//   const maxStep = 9

//   // ✅ Initialize state with data from localStorage
//   const [wizardData, setWizardData] = useState(() => {
//     // Read from localStorage
//     const pendingFirstName = localStorage.getItem('pendingFirstName') || ''
//     const pendingLastName = localStorage.getItem('pendingLastName') || ''
//     const pendingEmail = localStorage.getItem('pendingEmail') || ''
//     const pendingPhoneNumber = localStorage.getItem('pendingPhoneNumber') || ''
//     const pendingDob = localStorage.getItem('pendingDob') || ''
//     const pendingCity = localStorage.getItem('pendingCity') || ''
//     const pendingState = localStorage.getItem('pendingState') || ''
//     const pendingZip = localStorage.getItem('pendingZip') || ''
//     const pendingLanguage = localStorage.getItem('pendingLanguage') || ''

//     // Format DOB from YYYY-MM-DD to MM/DD/YYYY
//     let formattedDob = ''
//     if (pendingDob) {
//       const parts = pendingDob.split('-')
//       if (parts.length === 3) {
//         formattedDob = `${parts[1]}/${parts[2]}/${parts[0]}`
//       }
//     }

//     // Convert language
//     let language = ''
//     if (pendingLanguage === 'es') {
//       language = 'Spanish'
//     } else if (pendingLanguage === 'en') {
//       language = 'English'
//     }

//     return {
//       // Step 1 - Auto-filled from localStorage
//       emailAddress: pendingEmail,
//       mobilePhone: pendingPhoneNumber,
//       tempPassword: '',
//       smsCodeVerified: '',
//       emailVerified: '',
//       legalFirstName: pendingFirstName,
//       legalLastName: pendingLastName,
//       displayName: '',
//       dob: formattedDob,
//       addressLine1: '',
//       addressLine2: '',
//       city: pendingCity,
//       stateCode: pendingState,
//       zip: pendingZip,
//       currentAddressLine1: '',
//       currentAddressLine2: '',
//       currentCity: '',
//       currentStateCode: '',
//       currentZip: '',
//       profilePhotoRef: '',
//       primaryLanguage: language,
//       additionalLanguages: '',
//       currentCityMarket: '',
//       acceptTerms: false,
//       acceptPrivacy: false,
//       consentElectronic: false,
//       certifyAccurate: false,
      
//       // Step 2
//       bloodGroup: '',
//       emergencyMedicalInfo: 'none',
//       emergencyMedicalFlags: {},
//       emergencyInstructions: '',
      
//       // Step 3
//       primaryTrade: '',
//       secondaryTrades: '',
//       primaryLevel: '',
//       yearsExperience: '',
//       interiorsSkills: {},
//       additionalSkills: '',
//       fieldReadiness: {},
//       travelRadiusMiles: '',
//       languages: '',
      
//       // Step 4 & 5
//       projects: [
//         { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//         { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//         { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//       ],
//       projectConditions: {},
//       referenceName: '',
//       referenceTitle: '',
//       referencePhone: '',
//       reviewerNotes: '',
      
//       // Step 6
//       classificationPath: '',
//       stateOfWork: '',
//       employeeTaxName: '',
//       employeeSsn: '',
//       employeeStartDate: '',
//       employeeFlags: {},
//       reviewerName: '',
//       complianceNotes: '',
//       entityLegalName: '',
//       entityEin: '',
//       entityType: '',
//       entityStateRegistration: '',
//       entityDbaName: '',
//       entityAuthorizedSigner: '',
//       entityFlags: {},
//       stateSpecificFlags: {},
      
//       // Step 7
//       earliestStartDate: '',
//       hourlyRateRequested: '',
//       pieceworkNotes: '',
//       payPrefs: {},
//       homeMarketCity: '',
//       statesWillingToWorkIn: '',
//       travelPrefs: {},
//       availability: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' },
      
//       // Step 8
//       certChecklist: {},
//       certRows: [
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//       ],
//       safetyFlags: {},
      
//       // Step 9
//       emergencyContactName: '',
//       emergencyContactRelationship: '',
//       emergencyContactPhone: '',
//       policyAcks: {},
//       signatureWorkerName: '',
//       signatureDate: '',
//       signatureToken: '',
//     }
//   })

//   // ✅ Clear localStorage AFTER data is loaded into state
//   useEffect(() => {
//     // Only clear if we have data in localStorage
//     const hasPendingData = localStorage.getItem('pendingFirstName') || 
//                           localStorage.getItem('pendingEmail') ||
//                           localStorage.getItem('pendingPhoneNumber')
    
//     if (hasPendingData) {
//       // Clear pending data after it's been loaded into state
//       const itemsToRemove = [
//         'pendingFirstName', 'pendingLastName', 'pendingEmail', 'pendingPhoneNumber',
//         'pendingDob', 'pendingCity', 'pendingState', 'pendingZip', 'pendingLanguage',
//         'pendingPassword'
//       ]
//       itemsToRemove.forEach(item => localStorage.removeItem(item))
//       console.log('✅ Cleared pending registration data from localStorage')
//     }
//   }, []) // Empty dependency array = runs once on mount

//   useEffect(() => {
//     const requested = initialStepOverride ?? location?.state?.initialStep
//     if (typeof requested === 'number' && Number.isFinite(requested)) {
//       setStep((prev) => (prev === requested ? prev : Math.min(maxStep, Math.max(1, requested))))
//     }
//   }, [initialStepOverride, location?.state?.initialStep])

//   const stepTitles = [
//     'Worker Account & Identity Intake',
//     'Emergency Medical Information',
//     'Trade Profile & Skill Matrix',
//     'Work History & Project Experience',
//     'Work History & Project Experience — Continued',
//     'Classification, Tax & Compliance Intake',
//     'Availability, Travel, Pay & Assignment Preferences',
//     'Certifications, Safety & Equipment Qualifications',
//     'Emergency Contact, Policies & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Use for initial account creation, identity basics, contact data, and public profile photo.',
//     'Optional information to assist emergency responders.',
//     'Use to classify primary trade, level, years of experience, specialty skills, and field capability.',
//     'Use to collect recent projects, type of work performed, role held, and reference-ready experience.',
//     'Continue collecting recent project history and references.',
//     'Use to route the worker or subcontractor through the correct compliance path for W-2 / 1099 onboarding.',
//     'Use to collect start date, schedule, travel radius, pay preference, and deployment expectations.',
//     'Use to collect proof of OSHA, lift, PIT, CPR, and related safety training relevant to interiors work.',
//     'Use to capture emergency contact details and signed acknowledgments required before activation.'
//   ]

//   const goNext = () => setStep((s) => Math.min(maxStep, s + 1))
//   const goPrev = () => setStep((s) => Math.max(1, s - 1))

//   const finishWizard = () => {
//     navigate('/wizard/summary', {
//       state: {
//         basics: {
//           legalFirstName: wizardData.legalFirstName,
//           legalLastName: wizardData.legalLastName,
//           displayName: wizardData.displayName,
//           emailAddress: wizardData.emailAddress,
//           mobilePhone: wizardData.mobilePhone,
//           dob: wizardData.dob,
//           addressLine1: wizardData.addressLine1,
//           addressLine2: wizardData.addressLine2,
//           city: wizardData.city,
//           stateCode: wizardData.stateCode,
//           zip: wizardData.zip,
//           currentAddressLine1: wizardData.currentAddressLine1,
//           currentAddressLine2: wizardData.currentAddressLine2,
//           currentCity: wizardData.currentCity,
//           currentStateCode: wizardData.currentStateCode,
//           currentZip: wizardData.currentZip,
//         },
//         trade: {
//           primaryTrade: wizardData.primaryTrade,
//           primaryLevel: wizardData.primaryLevel,
//           yearsExperience: wizardData.yearsExperience,
//           travelRadiusMiles: wizardData.travelRadiusMiles,
//         },
//         workHistory: {
//           projects: wizardData.projects,
//           projectConditions: wizardData.projectConditions,
//           referenceName: wizardData.referenceName,
//           referenceTitle: wizardData.referenceTitle,
//           referencePhone: wizardData.referencePhone,
//         },
//         certifications: {
//           certChecklist: wizardData.certChecklist,
//           safetyFlags: wizardData.safetyFlags,
//         },
//         tax: {
//           classificationPath: wizardData.classificationPath,
//           stateOfWork: wizardData.stateOfWork,
//           employeeTaxName: wizardData.employeeTaxName,
//         },
//         availability: {
//           earliestStartDate: wizardData.earliestStartDate,
//           hourlyRateRequested: wizardData.hourlyRateRequested,
//           payPrefs: wizardData.payPrefs,
//         },
//         medical: {
//           emergencyMedicalInfo: wizardData.emergencyMedicalInfo,
//           bloodGroup: wizardData.bloodGroup,
//           emergencyMedicalFlags: wizardData.emergencyMedicalFlags,
//           emergencyInstructions: wizardData.emergencyInstructions,
//         },
//         acknowledgments: {
//           emergencyContactName: wizardData.emergencyContactName,
//           emergencyContactRelationship: wizardData.emergencyContactRelationship,
//           emergencyContactPhone: wizardData.emergencyContactPhone,
//           policyAcks: wizardData.policyAcks,
//           signatureWorkerName: wizardData.signatureWorkerName,
//           signatureDate: wizardData.signatureDate,
//         },
//       },
//     })
//   }

//   const wizardInner = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         <div className="wizardHeader">
//           <div>
//             <div className="wizardTitle">{stepTitles[step - 1]}</div>
//             <div className="wizardSubtitle">{stepSubtitles[step - 1]}</div>
//           </div>

//           <div className="wizardStepPills" aria-label="Wizard steps">
//             {Array.from({ length: maxStep }).map((_, idx) => {
//               const n = idx + 1
//               return (
//                 <button
//                   key={n}
//                   type="button"
//                   className={`wizardStepPill ${step === n ? 'wizardStepPillActive' : ''}`}
//                   onClick={() => setStep(n)}
//                 >
//                   {n}
//                 </button>
//               )
//             })}
//           </div>
//         </div>

//         {step === 1 && <WizardStep1 data={wizardData} onChange={setWizardData} onNext={goNext} />}
//         {step === 2 && <WizardStep2 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 3 && <WizardStep3 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 4 && <WizardStep4 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 5 && <WizardStep5 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 6 && <WizardStep6 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 7 && <WizardStep7 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 8 && <WizardStep8 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 9 && <WizardStep9 data={wizardData} onChange={setWizardData} onFinish={finishWizard} onBack={goPrev} />}
//       </div>
//     </div>
//   )

//   if (embedded) {
//     return <div className="wizardEmbedded">{wizardInner}</div>
//   }

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavHeader">
//             <div className="sideMark" aria-hidden="true">
//               <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
//             </div>
//             <div className="sideMeta">
//               <div className="sideTitle">Tradesmap</div>
//             </div>
//           </div>

//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">{wizardInner}</main>
//       </div>
//     </div>
//   )
// }




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

// export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [step, setStep] = useState(1)
//   const maxStep = 6

//   // ✅ Initialize state with data from localStorage
//   const [wizardData, setWizardData] = useState(() => {
//     // Read from localStorage
//     const pendingFirstName = localStorage.getItem('pendingFirstName') || ''
//     const pendingLastName = localStorage.getItem('pendingLastName') || ''
//     const pendingEmail = localStorage.getItem('pendingEmail') || ''
//     const pendingPhoneNumber = localStorage.getItem('pendingPhoneNumber') || ''
//     const pendingDob = localStorage.getItem('pendingDob') || ''
//     const pendingCity = localStorage.getItem('pendingCity') || ''
//     const pendingState = localStorage.getItem('pendingState') || ''
//     const pendingZip = localStorage.getItem('pendingZip') || ''
//     const pendingLanguage = localStorage.getItem('pendingLanguage') || ''

//     // Format DOB from YYYY-MM-DD to MM/DD/YYYY
//     let formattedDob = ''
//     if (pendingDob) {
//       const parts = pendingDob.split('-')
//       if (parts.length === 3) {
//         formattedDob = `${parts[1]}/${parts[2]}/${parts[0]}`
//       }
//     }

//     // Convert language
//     let language = ''
//     if (pendingLanguage === 'es') {
//       language = 'Spanish'
//     } else if (pendingLanguage === 'en') {
//       language = 'English'
//     }

//     return {
//       // Step 1 - Auto-filled from localStorage
//       emailAddress: pendingEmail,
//       mobilePhone: pendingPhoneNumber,
//       tempPassword: '',
//       smsCodeVerified: '',
//       emailVerified: '',
//       legalFirstName: pendingFirstName,
//       legalLastName: pendingLastName,
//       displayName: '',
//       dob: formattedDob,
//       addressLine1: '',
//       addressLine2: '',
//       city: pendingCity,
//       stateCode: pendingState,
//       zip: pendingZip,
//       currentAddressLine1: '',
//       currentAddressLine2: '',
//       currentCity: '',
//       currentStateCode: '',
//       currentZip: '',
//       profilePhotoRef: '',
//       primaryLanguage: language,
//       additionalLanguages: '',
//       currentCityMarket: '',
//       acceptTerms: false,
//       acceptPrivacy: false,
//       consentElectronic: false,
//       certifyAccurate: false,
      
//       // Step 2 - Emergency Medical (keeping as is)
//       bloodGroup: '',
//       emergencyMedicalInfo: 'none',
//       emergencyMedicalFlags: {},
//       emergencyInstructions: '',
      
//       // Step 3 - Updated for Trade Profile & Skill Matrix
//       primaryTrade: '',
//       workerLevel: '',              // NEW - replaces primaryLevel
//       yearOfExperience: '',         // NEW - replaces yearsExperience
//       skills: {},                   // NEW - skill areas
//       fieldReadiness: {},           // Keeping as is
//       additionalSkillsList: {},     // NEW - additional skills/tools
//       additionalSkills: '',         // Keeping as is
//       travelRadiusMiles: '',        // Keeping as is
//       languages: '',                // Keeping as is
      
//       // Step 4 & 5
//       projects: [
//         { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//         { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//         { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//       ],
//       projectConditions: {},
//       referenceName: '',
//       referenceTitle: '',
//       referencePhone: '',
//       reviewerNotes: '',
      
//       // Step 6
//       classificationPath: '',
//       stateOfWork: '',
//       employeeTaxName: '',
//       employeeSsn: '',
//       employeeStartDate: '',
//       employeeFlags: {},
//       reviewerName: '',
//       complianceNotes: '',
//       entityLegalName: '',
//       entityEin: '',
//       entityType: '',
//       entityStateRegistration: '',
//       entityDbaName: '',
//       entityAuthorizedSigner: '',
//       entityFlags: {},
//       stateSpecificFlags: {},
      
//       // Step 7
//       earliestStartDate: '',
//       hourlyRateRequested: '',
//       pieceworkNotes: '',
//       payPrefs: {},
//       homeMarketCity: '',
//       statesWillingToWorkIn: '',
//       travelPrefs: {},
//       availability: { mon: '', tue: '', wed: '', thu: '', fri: '', sat: '', sun: '' },
      
//       // Step 8
//       certChecklist: {},
//       certRows: [
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//       ],
//       safetyFlags: {},
      
//       // Step 9
//       emergencyContactName: '',
//       emergencyContactRelationship: '',
//       emergencyContactPhone: '',
//       policyAcks: {},
//       signatureWorkerName: '',
//       signatureDate: '',
//       signatureToken: '',
//     }
//   })

//   // ✅ Clear localStorage AFTER data is loaded into state
//   useEffect(() => {
//     // Only clear if we have data in localStorage
//     const hasPendingData = localStorage.getItem('pendingFirstName') || 
//                           localStorage.getItem('pendingEmail') ||
//                           localStorage.getItem('pendingPhoneNumber')
    
//     if (hasPendingData) {
//       // Clear pending data after it's been loaded into state
//       const itemsToRemove = [
//         'pendingFirstName', 'pendingLastName', 'pendingEmail', 'pendingPhoneNumber',
//         'pendingDob', 'pendingCity', 'pendingState', 'pendingZip', 'pendingLanguage',
//         'pendingPassword'
//       ]
//       itemsToRemove.forEach(item => localStorage.removeItem(item))
//       console.log('✅ Cleared pending registration data from localStorage')
//     }
//   }, [])

//   useEffect(() => {
//     const requested = initialStepOverride ?? location?.state?.initialStep
//     if (typeof requested === 'number' && Number.isFinite(requested)) {
//       setStep((prev) => (prev === requested ? prev : Math.min(maxStep, Math.max(1, requested))))
//     }
//   }, [initialStepOverride, location?.state?.initialStep])

//   const stepTitles = [
//     'Worker Account & Identity Intake',
//     'Trade Profile & Skill Matrix',      // Updated - now Step 2
//     'Emergency Medical Information',     // Updated - now Step 3
//     'Work History & Project Experience',
//     'Work History & Project Experience — Continued',
//     'Classification, Tax & Compliance Intake',
//     'Availability, Travel, Pay & Assignment Preferences',
//     'Certifications, Safety & Equipment Qualifications',
//     'Emergency Contact, Policies & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Use for initial account creation, identity basics, contact data, and public profile photo.',
//     'Use to classify primary trade, level, years of experience, specialty skills, and field capability.',  // Step 2
//     'Optional information to assist emergency responders.',  // Step 3
//     'Use to collect recent projects, type of work performed, role held, and reference-ready experience.',
//     'Continue collecting recent project history and references.',
//     'Use to route the worker or subcontractor through the correct compliance path for W-2 / 1099 onboarding.',
//     'Use to collect start date, schedule, travel radius, pay preference, and deployment expectations.',
//     'Use to collect proof of OSHA, lift, PIT, CPR, and related safety training relevant to interiors work.',
//     'Use to capture emergency contact details and signed acknowledgments required before activation.'
//   ]

//   const goNext = () => setStep((s) => Math.min(maxStep, s + 1))
//   const goPrev = () => setStep((s) => Math.max(1, s - 1))

//   const finishWizard = () => {
//     navigate('/wizard/summary', {
//       state: {
//         basics: {
//           legalFirstName: wizardData.legalFirstName,
//           legalLastName: wizardData.legalLastName,
//           displayName: wizardData.displayName,
//           emailAddress: wizardData.emailAddress,
//           mobilePhone: wizardData.mobilePhone,
//           dob: wizardData.dob,
//           addressLine1: wizardData.addressLine1,
//           addressLine2: wizardData.addressLine2,
//           city: wizardData.city,
//           stateCode: wizardData.stateCode,
//           zip: wizardData.zip,
//           currentAddressLine1: wizardData.currentAddressLine1,
//           currentAddressLine2: wizardData.currentAddressLine2,
//           currentCity: wizardData.currentCity,
//           currentStateCode: wizardData.currentStateCode,
//           currentZip: wizardData.currentZip,
//         },
//         trade: {
//           primaryTrade: wizardData.primaryTrade,
//           workerLevel: wizardData.workerLevel,           // Updated
//           yearOfExperience: wizardData.yearOfExperience, // Updated
//           skills: wizardData.skills,                     // NEW
//           additionalSkillsList: wizardData.additionalSkillsList, // NEW
//           additionalSkills: wizardData.additionalSkills,
//           travelRadiusMiles: wizardData.travelRadiusMiles,
//         },
//         workHistory: {
//           projects: wizardData.projects,
//           projectConditions: wizardData.projectConditions,
//           referenceName: wizardData.referenceName,
//           referenceTitle: wizardData.referenceTitle,
//           referencePhone: wizardData.referencePhone,
//         },
//         certifications: {
//           certChecklist: wizardData.certChecklist,
//           safetyFlags: wizardData.safetyFlags,
//         },
//         tax: {
//           classificationPath: wizardData.classificationPath,
//           stateOfWork: wizardData.stateOfWork,
//           employeeTaxName: wizardData.employeeTaxName,
//         },
//         availability: {
//           earliestStartDate: wizardData.earliestStartDate,
//           hourlyRateRequested: wizardData.hourlyRateRequested,
//           payPrefs: wizardData.payPrefs,
//         },
//         medical: {
//           emergencyMedicalInfo: wizardData.emergencyMedicalInfo,
//           bloodGroup: wizardData.bloodGroup,
//           emergencyMedicalFlags: wizardData.emergencyMedicalFlags,
//           emergencyInstructions: wizardData.emergencyInstructions,
//         },
//         acknowledgments: {
//           emergencyContactName: wizardData.emergencyContactName,
//           emergencyContactRelationship: wizardData.emergencyContactRelationship,
//           emergencyContactPhone: wizardData.emergencyContactPhone,
//           policyAcks: wizardData.policyAcks,
//           signatureWorkerName: wizardData.signatureWorkerName,
//           signatureDate: wizardData.signatureDate,
//         },
//       },
//     })
//   }

//   const wizardInner = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         <div className="wizardHeader">
//           <div>
//             <div className="wizardTitle">{stepTitles[step - 1]}</div>
//             <div className="wizardSubtitle">{stepSubtitles[step - 1]}</div>
//           </div>

//           <div className="wizardStepPills" aria-label="Wizard steps">
//             {Array.from({ length: maxStep }).map((_, idx) => {
//               const n = idx + 1
//               return (
//                 <button
//                   key={n}
//                   type="button"
//                   className={`wizardStepPill ${step === n ? 'wizardStepPillActive' : ''}`}
//                   onClick={() => setStep(n)}
//                 >
//                   {n}
//                 </button>
//               )
//             })}
//           </div>
//         </div>

//         {step === 1 && <WizardStep1 data={wizardData} onChange={setWizardData} onNext={goNext} />}
//         {step === 2 && <WizardStep2 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 3 && <WizardStep3 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 4 && <WizardStep4 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 5 && <WizardStep5 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//         {step === 6 && <WizardStep6 data={wizardData} onChange={setWizardData} onFinish={finishWizard} onBack={goPrev} />}
//       </div>
//     </div>
//   )

//   if (embedded) {
//     return <div className="wizardEmbedded">{wizardInner}</div>
//   }

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavHeader">
//             <div className="sideMark" aria-hidden="true">
//               <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
//             </div>
//             <div className="sideMeta">
//               <div className="sideTitle">Tradesmap</div>
//             </div>
//           </div>

//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">{wizardInner}</main>
//       </div>
//     </div>
//   )
// }


// src/worker/pages/WorkerWizardPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
import { WizardStep5 } from '../components/wizard-steps/WizardStep5'
import { WizardStep6 } from '../components/wizard-steps/WizardStep6'

export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [step, setStep] = useState(1)
  const maxStep = 6

  // ✅ Initialize state with data from localStorage
  const [wizardData, setWizardData] = useState(() => {
    // Read from localStorage
    const pendingFirstName = localStorage.getItem('pendingFirstName') || ''
    const pendingLastName = localStorage.getItem('pendingLastName') || ''
    const pendingEmail = localStorage.getItem('pendingEmail') || ''
    const pendingPhoneNumber = localStorage.getItem('pendingPhoneNumber') || ''
    const pendingDob = localStorage.getItem('pendingDob') || ''
    const pendingCity = localStorage.getItem('pendingCity') || ''
    const pendingState = localStorage.getItem('pendingState') || ''
    const pendingZip = localStorage.getItem('pendingZip') || ''
    const pendingLanguage = localStorage.getItem('pendingLanguage') || ''

    // Format DOB from YYYY-MM-DD to MM/DD/YYYY
    let formattedDob = ''
    if (pendingDob) {
      const parts = pendingDob.split('-')
      if (parts.length === 3) {
        formattedDob = `${parts[1]}/${parts[2]}/${parts[0]}`
      }
    }

    // Convert language
    let language = ''
    if (pendingLanguage === 'es') {
      language = 'Spanish'
    } else if (pendingLanguage === 'en') {
      language = 'English'
    }

    return {
      // Step 1 - Auto-filled from localStorage
      emailAddress: pendingEmail,
      mobilePhone: pendingPhoneNumber,
      tempPassword: '',
      smsCodeVerified: '',
      emailVerified: '',
      legalFirstName: pendingFirstName,
      legalLastName: pendingLastName,
      displayName: '',
      dob: formattedDob,
      addressLine1: '',
      addressLine2: '',
      city: pendingCity,
      stateCode: pendingState,
      zip: pendingZip,
      currentAddressLine1: '',
      currentAddressLine2: '',
      currentCity: '',
      currentStateCode: '',
      currentZip: '',
      profilePhotoRef: '',
      primaryLanguage: language,
      additionalLanguages: '',
      currentCityMarket: '',
      acceptTerms: false,
      acceptPrivacy: false,
      consentElectronic: false,
      certifyAccurate: false,
      
      // Step 2 - Emergency Medical
      bloodGroup: '',
      emergencyMedicalInfo: 'none',
      emergencyMedicalFlags: {},
      emergencyInstructions: '',
      
      // Step 3 - Trade Profile & Skill Matrix
      primaryTrade: '',
      workerLevel: '',
      yearOfExperience: '',
      skills: {},
      fieldReadiness: {},
      additionalSkillsList: {},
      additionalSkills: '',
      travelRadiusMiles: '',
      languages: '',
      
      // Step 4 - Work History
      projects: [
        { 
          name: '', 
          client: '', 
          phone: '',
          trade: '', 
          role: '', 
          start: '', 
          end: '', 
          scope: '' 
        },
        { 
          name: '', 
          client: '', 
          phone: '',
          trade: '', 
          role: '', 
          start: '', 
          end: '', 
          scope: '' 
        },
        { 
          name: '', 
          client: '', 
          phone: '',
          trade: '', 
          role: '', 
          start: '', 
          end: '', 
          scope: '' 
        },
      ],
      projectConditions: {},
      referenceName: '',
      referenceTitle: '',
      referencePhone: '',
      reviewerNotes: '',
      
      // Step 5 - Certifications
      certChecklist: {},
      certRows: [
        { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
        { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
        { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
      ],
      safetyFlags: {},
      
      // Step 6 - Emergency Contact & Acknowledgments
      emergencyContactName: '',
      emergencyContactRelationship: '',
      emergencyContactPhone: '',
      policyAcks: {},
      signatureWorkerName: '',
      signatureDate: '',
      signatureToken: '',
    }
  })

  // ✅ Clear localStorage AFTER data is loaded into state
  useEffect(() => {
    // Only clear if we have data in localStorage
    const hasPendingData = localStorage.getItem('pendingFirstName') || 
                          localStorage.getItem('pendingEmail') ||
                          localStorage.getItem('pendingPhoneNumber')
    
    if (hasPendingData) {
      // Clear pending data after it's been loaded into state
      const itemsToRemove = [
        'pendingFirstName', 'pendingLastName', 'pendingEmail', 'pendingPhoneNumber',
        'pendingDob', 'pendingCity', 'pendingState', 'pendingZip', 'pendingLanguage',
        'pendingPassword'
      ]
      itemsToRemove.forEach(item => localStorage.removeItem(item))
      console.log('✅ Cleared pending registration data from localStorage')
    }
  }, [])

  useEffect(() => {
    const requested = initialStepOverride ?? location?.state?.initialStep
    if (typeof requested === 'number' && Number.isFinite(requested)) {
      setStep((prev) => (prev === requested ? prev : Math.min(maxStep, Math.max(1, requested))))
    }
  }, [initialStepOverride, location?.state?.initialStep])

  const stepTitles = [
    'Worker Account & Identity Intake',
    'Trade Profile & Skill Matrix',
    //'Emergency Medical Information',
    'Work History & Project Experience',
    'Availability, Travel, Pay & Assignment Preferences',
    'Certifications, Safety & Equipment Qualifications',
    'Emergency Contact, Policies & Acknowledgments'
  ]

  const stepSubtitles = [
    'Use for initial account creation, identity basics, contact data, and public profile photo.',
    'Use to classify primary trade, level, years of experience, specialty skills, and field capability.',
    //'Optional information to assist emergency responders.',
    'Use to collect recent projects, type of work performed, role held, and reference-ready experience.',
    'Use to collect start date, schedule, travel radius, pay preference, and deployment expectations.',
    'Use to collect proof of OSHA, lift, PIT, CPR, and related safety training relevant to interiors work.',
    'Use to capture emergency contact details and signed acknowledgments required before activation.'
  ]

  const goNext = () => setStep((s) => Math.min(maxStep, s + 1))
  const goPrev = () => setStep((s) => Math.max(1, s - 1))

  const finishWizard = () => {
    navigate('/wizard/summary', {
      state: {
        basics: {
          legalFirstName: wizardData.legalFirstName,
          legalLastName: wizardData.legalLastName,
          displayName: wizardData.displayName,
          emailAddress: wizardData.emailAddress,
          mobilePhone: wizardData.mobilePhone,
          dob: wizardData.dob,
          addressLine1: wizardData.addressLine1,
          addressLine2: wizardData.addressLine2,
          city: wizardData.city,
          stateCode: wizardData.stateCode,
          zip: wizardData.zip,
          currentAddressLine1: wizardData.currentAddressLine1,
          currentAddressLine2: wizardData.currentAddressLine2,
          currentCity: wizardData.currentCity,
          currentStateCode: wizardData.currentStateCode,
          currentZip: wizardData.currentZip,
        },
        trade: {
          primaryTrade: wizardData.primaryTrade,
          workerLevel: wizardData.workerLevel,
          yearOfExperience: wizardData.yearOfExperience,
          skills: wizardData.skills,
          additionalSkillsList: wizardData.additionalSkillsList,
          additionalSkills: wizardData.additionalSkills,
          travelRadiusMiles: wizardData.travelRadiusMiles,
        },
        workHistory: {
          projects: wizardData.projects,
          projectConditions: wizardData.projectConditions,
          referenceName: wizardData.referenceName,
          referenceTitle: wizardData.referenceTitle,
          referencePhone: wizardData.referencePhone,
        },
        certifications: {
          certChecklist: wizardData.certChecklist,
          safetyFlags: wizardData.safetyFlags,
        },
        medical: {
          emergencyMedicalInfo: wizardData.emergencyMedicalInfo,
          bloodGroup: wizardData.bloodGroup,
          emergencyMedicalFlags: wizardData.emergencyMedicalFlags,
          emergencyInstructions: wizardData.emergencyInstructions,
        },
        acknowledgments: {
          emergencyContactName: wizardData.emergencyContactName,
          emergencyContactRelationship: wizardData.emergencyContactRelationship,
          emergencyContactPhone: wizardData.emergencyContactPhone,
          policyAcks: wizardData.policyAcks,
          signatureWorkerName: wizardData.signatureWorkerName,
          signatureDate: wizardData.signatureDate,
        },
      },
    })
  }

  const wizardInner = (
    <div className="wizardPage">
      <div className="wizardCard">
        {/* ✅ Sticky Header */}
        <div className="wizardHeader" style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: 'white',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
        }}>
          <div>
            <div className="wizardTitle">{stepTitles[step - 1]}</div>
            <div className="wizardSubtitle">{stepSubtitles[step - 1]}</div>
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

        {/* ✅ Scrollable Content */}
        <div className="wizardBody" style={{
          maxHeight: 'calc(100vh - 280px)',
          overflowY: 'auto',
          padding: '20px 24px',
          scrollBehavior: 'smooth'
        }}>
          {step === 1 && <WizardStep1 data={wizardData} onChange={setWizardData} onNext={goNext} />}
          {step === 2 && <WizardStep2 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
          {step === 3 && <WizardStep3 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
          {step === 4 && <WizardStep4 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
          {step === 5 && <WizardStep5 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
          {step === 6 && <WizardStep6 data={wizardData} onChange={setWizardData} onFinish={finishWizard} onBack={goPrev} />}
        </div>

        {/* ✅ Sticky Footer */}
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
            disabled={step === 1}
            style={{
              opacity: step === 1 ? 0.4 : 1,
              cursor: step === 1 ? 'not-allowed' : 'pointer'
            }}
          >
            <span className="wizardPillBtnLabel">Back</span>
            <span className="wizardPillBtnIcon">←</span>
          </button>

          <div className="wizardFooterRight">
            {step < maxStep ? (
              <button 
                type="button" 
                className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
                onClick={goNext}
              >
                <span className="wizardPillBtnLabel">Next</span>
                <span className="wizardPillBtnIcon">→</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="wizardPillBtn wizardPillBtnSuccess" 
                onClick={finishWizard}
              >
                <span className="wizardPillBtnLabel">Finish</span>
                <span className="wizardPillBtnIcon">✓</span>
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

          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge">12</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Profile</span>
              </a>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup" aria-label="General">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/>
                  </svg>
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