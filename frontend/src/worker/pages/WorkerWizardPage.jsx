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


// // src/worker/pages/WorkerWizardPage.jsx
// import { useState, useEffect } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'
// import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
// import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
// import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
// import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
// import { WizardStep5 } from '../components/wizard-steps/WizardStep5'

// export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [step, setStep] = useState(1)
//   const maxStep = 5

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
      
//       // Step 2 - Emergency Medical
//       bloodGroup: '',
//       emergencyMedicalInfo: 'none',
//       emergencyMedicalFlags: {},
//       emergencyInstructions: '',
      
//       // Step 3 - Trade Profile & Skill Matrix
//       primaryTrade: '',
//       workerLevel: '',
//       yearOfExperience: '',
//       skills: {},
//       fieldReadiness: {},
//       additionalSkillsList: {},
//       additionalSkills: '',
//       travelRadiusMiles: '',
//       languages: '',
      
//       // Step 4 - Work History
//       projects: [
//         { 
//           name: '', 
//           client: '', 
//           phone: '',
//           trade: '', 
//           role: '', 
//           start: '', 
//           end: '', 
//           scope: '' 
//         },
//         { 
//           name: '', 
//           client: '', 
//           phone: '',
//           trade: '', 
//           role: '', 
//           start: '', 
//           end: '', 
//           scope: '' 
//         },
//         { 
//           name: '', 
//           client: '', 
//           phone: '',
//           trade: '', 
//           role: '', 
//           start: '', 
//           end: '', 
//           scope: '' 
//         },
//       ],
//       projectConditions: {},
//       referenceName: '',
//       referenceTitle: '',
//       referencePhone: '',
//       reviewerNotes: '',
      
//       // Step 5 - Certifications
//       certChecklist: {},
//       certRows: [
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//         { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
//       ],
//       safetyFlags: {},
      
//       // Step 6 - Emergency Contact & Acknowledgments
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
//     'Trade Profile & Skill Matrix',
//     //'Emergency Medical Information',
//     'Work History & Project Experience',
//     'Availability, Travel, Pay & Assignment Preferences',
//    // 'Certifications, Safety & Equipment Qualifications',
//     'Emergency Contact, Policies & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Use for initial account creation, identity basics, contact data, and public profile photo.',
//     'Use to classify primary trade, level, years of experience, specialty skills, and field capability.',
//     //'Optional information to assist emergency responders.',
//     'Use to collect recent projects, type of work performed, role held, and reference-ready experience.',
//     'Use to collect start date, schedule, travel radius, pay preference, and deployment expectations.',
//    // 'Use to collect proof of OSHA, lift, PIT, CPR, and related safety training relevant to interiors work.',
//     'Use to capture emergency contact details and signed acknowledgments required before activation.'
//   ]

//   const goNext = () => setStep((s) => Math.min(maxStep, s + 1))
//   const goPrev = () => setStep((s) => Math.max(1, s - 1))

//  // In WorkerWizardPage.jsx

// const finishWizard = () => {
//   // Navigate to success page instead of summary
//   navigate('/registration-success', {
//     state: {
//       basics: {
//         legalFirstName: wizardData.legalFirstName,
//         legalLastName: wizardData.legalLastName,
//         displayName: wizardData.displayName,
//         emailAddress: wizardData.emailAddress,
//         mobilePhone: wizardData.mobilePhone,
//         dob: wizardData.dob,
//         addressLine1: wizardData.addressLine1,
//         addressLine2: wizardData.addressLine2,
//         city: wizardData.city,
//         stateCode: wizardData.stateCode,
//         zip: wizardData.zip,
//         currentAddressLine1: wizardData.currentAddressLine1,
//         currentAddressLine2: wizardData.currentAddressLine2,
//         currentCity: wizardData.currentCity,
//         currentStateCode: wizardData.currentStateCode,
//         currentZip: wizardData.currentZip,
//       },
//       trade: {
//         primaryTrade: wizardData.primaryTrade,
//         workerLevel: wizardData.workerLevel,
//         yearOfExperience: wizardData.yearOfExperience,
//         skills: wizardData.skills,
//         additionalSkillsList: wizardData.additionalSkillsList,
//         additionalSkills: wizardData.additionalSkills,
//         travelRadiusMiles: wizardData.travelRadiusMiles,
//       },
//       workHistory: {
//         projects: wizardData.projects,
//         projectConditions: wizardData.projectConditions,
//         referenceName: wizardData.referenceName,
//         referenceTitle: wizardData.referenceTitle,
//         referencePhone: wizardData.referencePhone,
//       },
//       certifications: {
//         certChecklist: wizardData.certChecklist,
//         safetyFlags: wizardData.safetyFlags,
//       },
//       medical: {
//         emergencyMedicalInfo: wizardData.emergencyMedicalInfo,
//         bloodGroup: wizardData.bloodGroup,
//         emergencyMedicalFlags: wizardData.emergencyMedicalFlags,
//         emergencyInstructions: wizardData.emergencyInstructions,
//       },
//       acknowledgments: {
//         emergencyContactName: wizardData.emergencyContactName,
//         emergencyContactRelationship: wizardData.emergencyContactRelationship,
//         emergencyContactPhone: wizardData.emergencyContactPhone,
//         policyAcks: wizardData.policyAcks,
//         signatureWorkerName: wizardData.signatureWorkerName,
//         signatureDate: wizardData.signatureDate,
//       },
//     },
//   })
// }

//   const wizardInner = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         {/* ✅ Sticky Header */}
//         <div className="wizardHeader" style={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 10,
//           background: 'white',
//           padding: '16px 24px',
//           borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
//         }}>
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

//         {/* ✅ Scrollable Content */}
//         <div className="wizardBody" style={{
//           maxHeight: 'calc(100vh - 280px)',
//           overflowY: 'auto',
//           padding: '20px 24px',
//           scrollBehavior: 'smooth'
//         }}>
//           {step === 1 && <WizardStep1 data={wizardData} onChange={setWizardData} onNext={goNext} />}
//           {step === 2 && <WizardStep2 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//           {step === 3 && <WizardStep3 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//           {step === 4 && <WizardStep4 data={wizardData} onChange={setWizardData} onNext={goNext} onBack={goPrev} />}
//           {step === 5 && <WizardStep5 data={wizardData} onChange={setWizardData} onFinish={finishWizard} onBack={goPrev} />}
//         </div>

//         {/* ✅ Sticky Footer */}
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
//             disabled={step === 1}
//             style={{
//               opacity: step === 1 ? 0.4 : 1,
//               cursor: step === 1 ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <span className="wizardPillBtnLabel">Back</span>
//             <span className="wizardPillBtnIcon">←</span>
//           </button>

//           <div className="wizardFooterRight">
//             {step < maxStep ? (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
//                 onClick={goNext}
//               >
//                 <span className="wizardPillBtnLabel">Next</span>
//                 <span className="wizardPillBtnIcon">→</span>
//               </button>
//             ) : (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnSuccess" 
//                 onClick={finishWizard}
//               >
//                 <span className="wizardPillBtnLabel">Finish</span>
//                 <span className="wizardPillBtnIcon">✓</span>
//               </button>
//             )}
//           </div>
//         </div>
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
// import wizardService from '../services/workerWizardService'
// import { auth } from '../../firebase/config'

// export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [step, setStep] = useState(1)
//   const maxStep = 5
//   const [error, setError] = useState('')
//   const [isSaving, setIsSaving] = useState(false)

//   // ✅ Initialize state with data from localStorage
//   const [wizardData, setWizardData] = useState(() => {
//     // Read from localStorage
//     const pendingFirstName = localStorage.getItem('pendingFirstName') || ''
//     const pendingLastName = localStorage.getItem('pendingLastName') || ''
//     const pendingEmail = localStorage.getItem('pendingEmail') || ''
//     const pendingPhoneNumber = localStorage.getItem('pendingPhoneNumber') || ''
//     const pendingDob = localStorage.getItem('pendingDob') || ''
//     const pendingLanguage = localStorage.getItem('pendingLanguage') || ''

//     // Format DOB from YYYY-MM-DD to MM/DD/YYYY
//     let formattedDob = ''
//     if (pendingDob) {
//       const parts = pendingDob.split('-')
//       if (parts.length === 3) {
//         formattedDob = `${parts[1]}/${parts[2]}/${parts[0]}`
//       }
//     }

//     return {
//       // Step 1: Personal Information
//       legalFirstName: pendingFirstName,
//       legalLastName: pendingLastName,
//       emailAddress: pendingEmail,
//       mobilePhone: pendingPhoneNumber,
//       dob: formattedDob,
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
//       english: false,
//       englishSpanish: false,
//       spanish: false,
//       profilePreview: '',
//       profileImageKey: '',
//       profileImageUrl: '',
//       acceptTerms: false,
//       acceptPrivacy: false,
//       consentElectronic: false,
//       certifyAccurate: false,

//       // Step 2: Trade Profile
//       primaryTrade: '',
//       primaryOtherTrade: '',
//       workerLevel: '',
//       yearOfExperience: '',
//       secondaryTrade: '',
//       secondaryOtherTrade: '',
//       secondaryWorkerLevel: '',
//       secondaryYearOfExperience: '',
//       leadForemanResponsibilities: {},
//       metalFramingSkills: {},
//       drywallHangingSkills: {},
//       tapingFinishingSkills: {},
//       acousticalCeilingsSkills: {},
//       interiorCarpentrySkills: {},
//       helpersLabourersSkills: {},
//       insulationSkills: {},
//       demolitionSkills: {},
//       secondaryLeadForemanResponsibilities: {},
//       secondaryMetalFramingSkills: {},
//       secondaryDrywallHangingSkills: {},
//       secondaryTapingFinishingSkills: {},
//       secondaryAcousticalCeilingsSkills: {},
//       secondaryInteriorCarpentrySkills: {},
//       secondaryHelpersLabourersSkills: {},
//       secondaryInsulationSkills: {},
//       secondaryDemolitionSkills: {},
//       additionalSkillsTools: '',

//       // Step 3: Work History
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],

//       // Step 4: Availability
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},

//       // Step 5: Emergency Contact
//       emergencyContactName: '',
//       emergencyContactRelationship: '',
//       emergencyContactPhone: '',
//       policyAcks: {},
//     }
//   })

//   // ✅ Load saved wizard progress from backend
//   useEffect(() => {
//     const loadSavedProgress = async () => {
//       try {
//         // Get userId from Firebase or localStorage
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
//           return
//         }

//         const result = await wizardService.getProgress(userId)
//         if (result.success && result.data) {
//           const { steps, currentStep } = result.data
          
//           // Merge saved data with current state
//           const savedData = {}
//           Object.keys(steps).forEach(key => {
//             const stepNum = parseInt(key.replace('step', ''))
//             savedData[`step${stepNum}`] = steps[key]
//           })

//           setWizardData(prev => ({
//             ...prev,
//             ...savedData.step1 || {},
//             ...savedData.step2 || {},
//             ...savedData.step3 || {},
//             ...savedData.step4 || {},
//             ...savedData.step5 || {},
//           }))

//           // Set current step to the last saved step
//           if (currentStep > 1) {
//             setStep(currentStep)
//           }
//         }
//       } catch (error) {
//         console.error('Error loading wizard progress:', error)
//       }
//     }

//     loadSavedProgress()
//   }, [])

//   // ✅ Clear localStorage AFTER data is loaded into state
//   useEffect(() => {
//     const hasPendingData = localStorage.getItem('pendingFirstName') || 
//                           localStorage.getItem('pendingEmail') ||
//                           localStorage.getItem('pendingPhoneNumber')
    
//     if (hasPendingData) {
//       const itemsToRemove = [
//         'pendingFirstName', 'pendingLastName', 'pendingEmail', 'pendingPhoneNumber',
//         'pendingDob', 'pendingLanguage'
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

//   // ✅ FIX: Handle data updates properly - MERGE not REPLACE
//   const handleDataChange = (newData) => {
//     setWizardData(prev => {
//       // If newData is a function, call it with current state
//       if (typeof newData === 'function') {
//         const result = newData(prev)
//         return { ...prev, ...result }
//       }
      
//       // Deep merge for nested objects
//       const merged = { ...prev }
//       Object.keys(newData).forEach(key => {
//         if (typeof newData[key] === 'object' && newData[key] !== null && !Array.isArray(newData[key])) {
//           // Merge nested objects
//           merged[key] = { ...prev[key], ...newData[key] }
//         } else {
//           // Direct assignment for primitives and arrays
//           merged[key] = newData[key]
//         }
//       })
      
//       return merged
//     })
//   }

//   // ✅ Save current step to backend
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
//       console.log(`✅ Step ${step} saved to backend`)
//     } catch (error) {
//       console.error('Error saving step:', error)
//       setError(error.message || 'Failed to save step')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Primary and secondary trade, skill levels, and experience.',
//     'Recent projects, roles, and reference information.',
//     'Work radius, availability, pay rates, and travel preferences.',
//     'Emergency contact information and policy acknowledgments.'
//   ]

//   // ✅ Save before navigating
//   const goNext = async () => {
//     await saveCurrentStep()
//     setStep((s) => Math.min(maxStep, s + 1))
//     window.scrollTo(0, 0)
//   }

//   const goPrev = async () => {
//     await saveCurrentStep()
//     setStep((s) => Math.max(1, s - 1))
//     window.scrollTo(0, 0)
//   }

//   // ✅ Complete wizard
//   const finishWizard = async () => {
//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId) {
//         throw new Error('User ID not found')
//       }
      
//       setIsSaving(true)
      
//       // Save final step
//       await saveCurrentStep()
      
//       // Complete wizard - Moves data to Workers Table
//       const result = await wizardService.completeWizard(userId)
//       console.log('✅ Wizard completed:', result)
      
//       // Navigate to success page
//       navigate('/wizard/summary', {
//         state: {
//           basics: {
//             legalFirstName: wizardData.legalFirstName,
//             legalLastName: wizardData.legalLastName,
//             emailAddress: wizardData.emailAddress,
//             mobilePhone: wizardData.mobilePhone,
//             dob: wizardData.dob,
//             addressLine1: wizardData.addressLine1,
//             addressLine2: wizardData.addressLine2,
//             city: wizardData.city,
//             stateCode: wizardData.stateCode,
//             zip: wizardData.zip,
//             currentAddressLine1: wizardData.currentAddressLine1,
//             currentAddressLine2: wizardData.currentAddressLine2,
//             currentCity: wizardData.currentCity,
//             currentStateCode: wizardData.currentStateCode,
//             currentZip: wizardData.currentZip,
//             sameAsAddress: wizardData.sameAsAddress,
//             english: wizardData.english,
//             englishSpanish: wizardData.englishSpanish,
//             spanish: wizardData.spanish,
//             profilePreview: wizardData.profilePreview,
//             profileImageKey: wizardData.profileImageKey,
//             profileImageUrl: wizardData.profileImageUrl,
//             acceptTerms: wizardData.acceptTerms,
//             acceptPrivacy: wizardData.acceptPrivacy,
//             consentElectronic: wizardData.consentElectronic,
//             certifyAccurate: wizardData.certifyAccurate,
//           },
//           trade: {
//             primaryTrade: wizardData.primaryTrade,
//             primaryOtherTrade: wizardData.primaryOtherTrade,
//             workerLevel: wizardData.workerLevel,
//             yearOfExperience: wizardData.yearOfExperience,
//             secondaryTrade: wizardData.secondaryTrade,
//             secondaryOtherTrade: wizardData.secondaryOtherTrade,
//             secondaryWorkerLevel: wizardData.secondaryWorkerLevel,
//             secondaryYearOfExperience: wizardData.secondaryYearOfExperience,
//             leadForemanResponsibilities: wizardData.leadForemanResponsibilities,
//             metalFramingSkills: wizardData.metalFramingSkills,
//             drywallHangingSkills: wizardData.drywallHangingSkills,
//             tapingFinishingSkills: wizardData.tapingFinishingSkills,
//             acousticalCeilingsSkills: wizardData.acousticalCeilingsSkills,
//             interiorCarpentrySkills: wizardData.interiorCarpentrySkills,
//             helpersLabourersSkills: wizardData.helpersLabourersSkills,
//             insulationSkills: wizardData.insulationSkills,
//             demolitionSkills: wizardData.demolitionSkills,
//             secondaryLeadForemanResponsibilities: wizardData.secondaryLeadForemanResponsibilities,
//             secondaryMetalFramingSkills: wizardData.secondaryMetalFramingSkills,
//             secondaryDrywallHangingSkills: wizardData.secondaryDrywallHangingSkills,
//             secondaryTapingFinishingSkills: wizardData.secondaryTapingFinishingSkills,
//             secondaryAcousticalCeilingsSkills: wizardData.secondaryAcousticalCeilingsSkills,
//             secondaryInteriorCarpentrySkills: wizardData.secondaryInteriorCarpentrySkills,
//             secondaryHelpersLabourersSkills: wizardData.secondaryHelpersLabourersSkills,
//             secondaryInsulationSkills: wizardData.secondaryInsulationSkills,
//             secondaryDemolitionSkills: wizardData.secondaryDemolitionSkills,
//             additionalSkillsTools: wizardData.additionalSkillsTools,
//           },
//           workHistory: {
//             projects: wizardData.projects,
//           },
//           availability: {
//             hourlyRate: wizardData.hourlyRate,
//             payPrefs: wizardData.payPrefs,
//             travelRadius: wizardData.travelRadius,
//             willingToTravel: wizardData.willingToTravel,
//             travelPrefs: wizardData.travelPrefs,
//             availability: wizardData.availability,
//           },
//           acknowledgments: {
//             emergencyContactName: wizardData.emergencyContactName,
//             emergencyContactRelationship: wizardData.emergencyContactRelationship,
//             emergencyContactPhone: wizardData.emergencyContactPhone,
//             policyAcks: wizardData.policyAcks,
//           }
//         }
//       })
//     } catch (error) {
//       console.error('Error completing wizard:', error)
//       setError(error.message || 'Failed to complete wizard')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   const wizardInner = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         {/* Sticky Header */}
//         <div className="wizardHeader" style={{
//           position: 'sticky',
//           top: 0,
//           zIndex: 10,
//           background: 'white',
//           padding: '16px 24px',
//           borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
//           boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
//         }}>
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

//         {/* Error Display */}
//         {error && (
//           <div style={{
//             padding: '12px 20px',
//             background: '#fee2e2',
//             color: '#dc2626',
//             borderBottom: '1px solid #fecaca',
//             fontSize: '14px'
//           }}>
//             ❌ {error}
//             <button
//               onClick={() => setError('')}
//               style={{
//                 float: 'right',
//                 background: 'none',
//                 border: 'none',
//                 cursor: 'pointer',
//                 color: '#dc2626',
//                 fontWeight: 'bold'
//               }}
//             >
//               ×
//             </button>
//           </div>
//         )}

//         {/* Scrollable Content */}
//         <div className="wizardBody" style={{
//           maxHeight: 'calc(100vh - 320px)',
//           overflowY: 'auto',
//           padding: '20px 24px',
//           scrollBehavior: 'smooth'
//         }}>
//           {step === 1 && <WizardStep1 data={wizardData} onChange={handleDataChange} onNext={goNext} />}
//           {step === 2 && <WizardStep2 data={wizardData} onChange={handleDataChange} onNext={goNext} onBack={goPrev} />}
//           {step === 3 && <WizardStep3 data={wizardData} onChange={handleDataChange} onNext={goNext} onBack={goPrev} />}
//           {step === 4 && <WizardStep4 data={wizardData} onChange={handleDataChange} onNext={goNext} onBack={goPrev} />}
//           {step === 5 && <WizardStep5 data={wizardData} onChange={handleDataChange} onFinish={finishWizard} onBack={goPrev} />}
//         </div>

//         {/* Sticky Footer */}
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
//             disabled={step === 1 || isSaving}
//             style={{
//               opacity: step === 1 ? 0.4 : 1,
//               cursor: step === 1 ? 'not-allowed' : 'pointer'
//             }}
//           >
//             <span className="wizardPillBtnLabel">Back</span>
//             <span className="wizardPillBtnIcon">←</span>
//           </button>

//           <div className="wizardFooterRight">
//             {step < maxStep ? (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
//                 onClick={goNext}
//                 disabled={isSaving}
//               >
//                 <span className="wizardPillBtnLabel">{isSaving ? 'Saving...' : 'Next'}</span>
//                 <span className="wizardPillBtnIcon">→</span>
//               </button>
//             ) : (
//               <button 
//                 type="button" 
//                 className="wizardPillBtn wizardPillBtnSuccess" 
//                 onClick={finishWizard}
//                 disabled={isSaving}
//               >
//                 <span className="wizardPillBtnLabel">{isSaving ? 'Saving...' : 'Finish'}</span>
//                 <span className="wizardPillBtnIcon">✓</span>
//               </button>
//             )}
//           </div>
//         </div>
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
// import wizardService from '../services/workerWizardService'
// import workerService from '../services/workerService'
// import { auth } from '../../firebase/config'

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
//   const maxStep = 5
//   const [error, setError] = useState('')
//   const [isSaving, setIsSaving] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [isResuming, setIsResuming] = useState(false)
//   const [wizardData, setWizardData] = useState(() => {
//     // Initialize with default empty data
//     return {
//       // Step 1: Personal Information
//       legalFirstName: '',
//       legalLastName: '',
//       emailAddress: '',
//       mobilePhone: '',
//       dob: '',
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
//       english: false,
//       englishSpanish: false,
//       spanish: false,
//       profilePreview: '',
//       profileImageKey: '',
//       profileImageUrl: '',
//       acceptTerms: false,
//       acceptPrivacy: false,
//       consentElectronic: false,
//       certifyAccurate: false,

//       // Step 2: Trade Profile
//       primaryTrade: '',
//       primaryOtherTrade: '',
//       workerLevel: '',
//       yearOfExperience: '',
//       secondaryTrade: '',
//       secondaryOtherTrade: '',
//       secondaryWorkerLevel: '',
//       secondaryYearOfExperience: '',
//       leadForemanResponsibilities: {},
//       metalFramingSkills: {},
//       drywallHangingSkills: {},
//       tapingFinishingSkills: {},
//       acousticalCeilingsSkills: {},
//       interiorCarpentrySkills: {},
//       helpersLabourersSkills: {},
//       insulationSkills: {},
//       demolitionSkills: {},
//       secondaryLeadForemanResponsibilities: {},
//       secondaryMetalFramingSkills: {},
//       secondaryDrywallHangingSkills: {},
//       secondaryTapingFinishingSkills: {},
//       secondaryAcousticalCeilingsSkills: {},
//       secondaryInteriorCarpentrySkills: {},
//       secondaryHelpersLabourersSkills: {},
//       secondaryInsulationSkills: {},
//       secondaryDemolitionSkills: {},
//       additionalSkillsTools: '',

//       // Step 3: Work History
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],

//       // Step 4: Availability
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},

//       // Step 5: Emergency Contact & Certifications
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
//   // LOAD WIZARD STATE - RESUME FEATURE
//   // ============================================================

//   useEffect(() => {
//     const loadWizardState = async () => {
//       try {
//         // Get userId from localStorage or Firebase
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

//         // ✅ Check if wizard needs to resume
//         const resumeCheck = await wizardService.checkResume(userId)
        
//         console.log('🔄 Resume check result:', resumeCheck)

//         if (resumeCheck.needsResume) {
//           // ✅ Resume from where user left off
//           setIsResuming(true)
//           const stepToResume = resumeCheck.step
          
//           console.log(`🔄 Resuming wizard from step ${stepToResume}`)
          
//           // Load saved data
//           const progress = await wizardService.getProgress(userId)
          
//           if (progress.success && progress.data.steps) {
//             // Merge saved data with current state
//             const savedData = {}
//             Object.keys(progress.data.steps).forEach(key => {
//               const stepNum = parseInt(key.replace('step', ''))
//               const stepKey = `step${stepNum}`
//               savedData[stepKey] = progress.data.steps[key]
//             })
            
//             // Also check if there's any data in the main profile
//             const profile = await workerService.getWorkerProfile(userId)
//             if (profile.success && profile.data) {
//               // Merge any additional data from profile
//               Object.keys(profile.data).forEach(key => {
//                 if (!savedData[key] && typeof profile.data[key] === 'object') {
//                   savedData[key] = profile.data[key]
//                 }
//               })
//             }
            
//             setWizardData(prev => ({
//               ...prev,
//               ...savedData
//             }))
//           }
          
//           // Set step to resume
//           setStep(stepToResume)
//         } else {
//           // ✅ Start fresh from step 1
//           console.log('🔄 Starting fresh wizard from step 1')
          
//           // Check if user has any existing data (maybe from registration)
//           try {
//             const profile = await workerService.getWorkerProfile(userId)
//             if (profile.success && profile.data?.basics) {
//               // Pre-fill with existing data
//               setWizardData(prev => ({
//                 ...prev,
//                 ...profile.data.basics,
//                 ...profile.data
//               }))
//             }
//           } catch (e) {
//             // No existing data, use defaults
//           }
          
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
//   }, [])

//   // Handle initialStepOverride from location state
//   useEffect(() => {
//     const requested = initialStepOverride ?? location?.state?.initialStep
//     if (typeof requested === 'number' && Number.isFinite(requested)) {
//       setStep((prev) => (prev === requested ? prev : Math.min(maxStep, Math.max(1, requested))))
//     }
//   }, [initialStepOverride, location?.state?.initialStep])

//   // ============================================================
//   // DATA HANDLERS
//   // ============================================================

//   /**
//    * ✅ Handle data changes from wizard steps
//    * Merges new data with existing state
//    */
//   const handleDataChange = (newData) => {
//     setWizardData(prev => {
//       // If newData is a function, call it with current state
//       if (typeof newData === 'function') {
//         const result = newData(prev)
//         return { ...prev, ...result }
//       }
      
//       // Deep merge for nested objects
//       const merged = { ...prev }
//       Object.keys(newData).forEach(key => {
//         if (typeof newData[key] === 'object' && newData[key] !== null && !Array.isArray(newData[key])) {
//           // Merge nested objects
//           merged[key] = { ...prev[key], ...newData[key] }
//         } else {
//           // Direct assignment for primitives and arrays
//           merged[key] = newData[key]
//         }
//       })
      
//       return merged
//     })
//   }

//   /**
//    * ✅ Save current step to backend
//    */
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
      
//       // Validate step before saving
//       const validation = wizardService.validateStep(step, wizardData)
//       if (!validation.valid) {
//         throw new Error(validation.errors.join(', '))
//       }
      
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
//   // NAVIGATION HANDLERS
//   // ============================================================

//   /**
//    * ✅ Go to next step
//    */
//   const goNext = async () => {
//     try {
//       await saveCurrentStep()
//       setStep((s) => Math.min(maxStep, s + 1))
//       window.scrollTo(0, 0)
//       setError('')
//     } catch (error) {
//       // Error is already set in saveCurrentStep
//     }
//   }

//   /**
//    * ✅ Go to previous step
//    */
//   const goPrev = async () => {
//     try {
//       await saveCurrentStep()
//       setStep((s) => Math.max(1, s - 1))
//       window.scrollTo(0, 0)
//       setError('')
//     } catch (error) {
//       // Error is already set in saveCurrentStep
//     }
//   }

//   /**
//    * ✅ Complete wizard
//    */
//   const finishWizard = async () => {
//     try {
//       let userId = localStorage.getItem("userId");
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
      
//       // Validate step 5
//       const validation = wizardService.validateStep(5, wizardData)
//       if (!validation.valid) {
//         throw new Error(validation.errors.join(', '))
//       }
      
//       // Save final step
//       await wizardService.saveStep(userId, 5, wizardData)
      
//       // Complete wizard
//       await wizardService.completeWizard(userId)
      
//       console.log('✅ Wizard completed successfully')
      
//       // Navigate to summary page with all data
//       navigate('/wizard/summary', {
//         state: {
//           ...wizardData,
//           wizardCompleted: true,
//           completedAt: new Date().toISOString()
//         },
//         replace: true
//       })
      
//     } catch (error) {
//       console.error('Error completing wizard:', error)
//       setError(error.message || 'Failed to complete wizard')
//     } finally {
//       setIsSaving(false)
//     }
//   }

//   /**
//    * ✅ Cancel wizard
//    */
//   const cancelWizard = async () => {
//     try {
//       // Save current step before cancel
//       await saveCurrentStep()
      
//       // Navigate to summary or home
//       navigate('/wizard/summary', {
//         state: {
//           ...wizardData,
//           wizardCancelled: true,
//           cancelledAt: new Date().toISOString()
//         },
//         replace: true
//       })
//     } catch (error) {
//       // Even if save fails, navigate to summary
//       navigate('/wizard/summary')
//     }
//   }

//   // ============================================================
//   // STEP CONFIGURATION
//   // ============================================================

//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Primary and secondary trade, skill levels, and experience.',
//     'Recent projects, roles, and reference information.',
//     'Work radius, availability, pay rates, and travel preferences.',
//     'Emergency contact information and policy acknowledgments.'
//   ]

//   // ============================================================
//   // RENDER FUNCTIONS
//   // ============================================================

//   /**
//    * ✅ Render loading state
//    */
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
//           animation: 'spin 1s linear infinite',
//         }} />
//         <p style={{ 
//           color: '#17263a', 
//           fontSize: '16px',
//           fontWeight: 500
//         }}>
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

//   /**
//    * ✅ Wizard content
//    */
//   const wizardContent = (
//     <div className="wizardPage">
//       <div className="wizardCard">
//         {/* Sticky Header */}
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

//         {/* Scrollable Content */}
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
//               onFinish={finishWizard} 
//               onBack={goPrev} 
//             />
//           )}
//         </div>

//         {/* Sticky Footer */}
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
//           <div style={{ display: 'flex', gap: '12px' }}>
//             <button 
//               type="button" 
//               className="wizardPillBtn" 
//               onClick={step === 1 ? cancelWizard : goPrev}
//               disabled={step === 1 && !isSaving}
//               style={{
//                 padding: '8px 20px',
//                 borderRadius: '8px',
//                 background: 'transparent',
//                 color: '#17263a',
//                 border: '1px solid rgba(18, 38, 63, 0.12)',
//                 cursor: (step === 1 && !isSaving) ? 'pointer' : 'pointer',
//                 opacity: step === 1 ? 0.6 : 1,
//                 fontWeight: 500,
//                 fontSize: '14px',
//                 transition: 'all 0.2s',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}
//               onMouseEnter={(e) => {
//                 if (!(step === 1 && isSaving)) {
//                   e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent'
//               }}
//             >
//               <span>{step === 1 ? 'Cancel' : 'Back'}</span>
//             </button>
//           </div>

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
//                 onMouseEnter={(e) => {
//                   if (!isSaving) {
//                     e.currentTarget.style.background = '#259c54'
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (!isSaving) {
//                     e.currentTarget.style.background = '#2fb463'
//                   }
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

//   // ============================================================
//   // EMBEDDED MODE (No sidebar)
//   // ============================================================

//   if (embedded) {
//     return <div className="wizardEmbedded">{wizardContent}</div>
//   }

//   // ============================================================
//   // FULL PAGE WITH SIDEBAR
//   // ============================================================

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
// import { TopNav } from '../../common/components/TopNav'
// import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
// import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
// import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
// import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
// import { WizardStep5 } from '../components/wizard-steps/WizardStep5'
// import wizardService from '../services/workerWizardService'
// import workerService from '../services/workerService'
// import { auth } from '../../firebase/config'

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
//   const maxStep = 5
//   const [error, setError] = useState('')
//   const [isSaving, setIsSaving] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [isResuming, setIsResuming] = useState(false)
  
//   // ✅ Initialize with default empty data
//   const [wizardData, setWizardData] = useState(() => {
//     // ✅ Check if coming from verification page
//     const fromVerification = location?.state?.fromVerification || false
    
//     if (fromVerification) {
//       // ✅ Pre-populate from location.state
//       return {
//         // Step 1: Personal Information
//         legalFirstName: location.state.firstName || '',
//         legalLastName: location.state.lastName || '',
//         emailAddress: location.state.email || '',
//         mobilePhone: location.state.phoneNumber || '',
//         dob: location.state.dob || '',
//         addressLine1: '',
//         addressLine2: '',
//         city: '',
//         stateCode: '',
//         zip: '',
//         currentAddressLine1: '',
//         currentAddressLine2: '',
//         currentCity: '',
//         currentStateCode: '',
//         currentZip: '',
//         sameAsAddress: false,
//         english: location.state.language === 'en' || false,
//         englishSpanish: false,
//         spanish: location.state.language === 'es' || false,
//         profilePreview: '',
//         profileImageKey: '',
//         profileImageUrl: '',
//         acceptTerms: false,
//         acceptPrivacy: false,
//         consentElectronic: false,
//         certifyAccurate: false,

//         // Step 2: Trade Profile
//         primaryTrade: '',
//         primaryOtherTrade: '',
//         workerLevel: '',
//         yearOfExperience: '',
//         secondaryTrade: '',
//         secondaryOtherTrade: '',
//         secondaryWorkerLevel: '',
//         secondaryYearOfExperience: '',
//         leadForemanResponsibilities: {},
//         metalFramingSkills: {},
//         drywallHangingSkills: {},
//         tapingFinishingSkills: {},
//         acousticalCeilingsSkills: {},
//         interiorCarpentrySkills: {},
//         helpersLabourersSkills: {},
//         insulationSkills: {},
//         demolitionSkills: {},
//         secondaryLeadForemanResponsibilities: {},
//         secondaryMetalFramingSkills: {},
//         secondaryDrywallHangingSkills: {},
//         secondaryTapingFinishingSkills: {},
//         secondaryAcousticalCeilingsSkills: {},
//         secondaryInteriorCarpentrySkills: {},
//         secondaryHelpersLabourersSkills: {},
//         secondaryInsulationSkills: {},
//         secondaryDemolitionSkills: {},
//         additionalSkillsTools: '',

//         // Step 3: Work History
//         projects: [
//           { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//           { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//           { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         ],

//         // Step 4: Availability
//         hourlyRate: '',
//         payPrefs: {},
//         travelRadius: 50,
//         willingToTravel: '',
//         travelPrefs: {},
//         availability: {},

//         // Step 5: Emergency Contact & Certifications
//         emergencyContactName: '',
//         emergencyContactRelationship: '',
//         emergencyContactPhone: '',
//         policyAcks: {},
//         certChecklist: {},
//         certRows: [
//           { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//           { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//           { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '', fileKey: '', fileUrl: '' },
//         ],
//         safetyFlags: {},
//       }
//     }
    
//     // Default empty state
//     return {
//       legalFirstName: '',
//       legalLastName: '',
//       emailAddress: '',
//       mobilePhone: '',
//       dob: '',
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
//       english: false,
//       englishSpanish: false,
//       spanish: false,
//       profilePreview: '',
//       profileImageKey: '',
//       profileImageUrl: '',
//       acceptTerms: false,
//       acceptPrivacy: false,
//       consentElectronic: false,
//       certifyAccurate: false,
//       primaryTrade: '',
//       primaryOtherTrade: '',
//       workerLevel: '',
//       yearOfExperience: '',
//       secondaryTrade: '',
//       secondaryOtherTrade: '',
//       secondaryWorkerLevel: '',
//       secondaryYearOfExperience: '',
//       leadForemanResponsibilities: {},
//       metalFramingSkills: {},
//       drywallHangingSkills: {},
//       tapingFinishingSkills: {},
//       acousticalCeilingsSkills: {},
//       interiorCarpentrySkills: {},
//       helpersLabourersSkills: {},
//       insulationSkills: {},
//       demolitionSkills: {},
//       secondaryLeadForemanResponsibilities: {},
//       secondaryMetalFramingSkills: {},
//       secondaryDrywallHangingSkills: {},
//       secondaryTapingFinishingSkills: {},
//       secondaryAcousticalCeilingsSkills: {},
//       secondaryInteriorCarpentrySkills: {},
//       secondaryHelpersLabourersSkills: {},
//       secondaryInsulationSkills: {},
//       secondaryDemolitionSkills: {},
//       additionalSkillsTools: '',
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},
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
//   // LOAD WIZARD STATE - RESUME FEATURE
//   // ============================================================

//   useEffect(() => {
//     const loadWizardState = async () => {
//       try {
//         // ✅ If coming from verification page, data already loaded
//         if (location?.state?.fromVerification) {
//           console.log('✅ Wizard loaded from verification data')
//           setLoading(false)
          
//           // ✅ Clear sessionStorage data
//           sessionStorage.removeItem('wizardFirstName')
//           sessionStorage.removeItem('wizardLastName')
//           sessionStorage.removeItem('wizardEmail')
//           sessionStorage.removeItem('wizardPhone')
//           sessionStorage.removeItem('wizardDob')
//           sessionStorage.removeItem('wizardLanguage')
//           sessionStorage.removeItem('wizardFromRegister')
          
//           // ✅ Clear localStorage pending data
//           const pendingItems = [
//             'pendingFirstName', 'pendingLastName', 'pendingEmail', 
//             'pendingPhoneNumber', 'pendingDob', 'pendingLanguage', 'pendingPassword'
//           ]
//           pendingItems.forEach(item => localStorage.removeItem(item))
          
//           return
//         }

//         // ✅ Check for sessionStorage data (backup)
//         const sessionFirstName = sessionStorage.getItem('wizardFirstName')
//         const sessionEmail = sessionStorage.getItem('wizardEmail')
        
//         if (sessionFirstName || sessionEmail) {
//           console.log('✅ Loading wizard from sessionStorage')
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: sessionFirstName || '',
//             legalLastName: sessionStorage.getItem('wizardLastName') || '',
//             emailAddress: sessionEmail || '',
//             mobilePhone: sessionStorage.getItem('wizardPhone') || '',
//             dob: sessionStorage.getItem('wizardDob') || '',
//             english: sessionStorage.getItem('wizardLanguage') === 'en',
//             spanish: sessionStorage.getItem('wizardLanguage') === 'es',
//           }))
          
//           // Clear sessionStorage
//           sessionStorage.removeItem('wizardFirstName')
//           sessionStorage.removeItem('wizardLastName')
//           sessionStorage.removeItem('wizardEmail')
//           sessionStorage.removeItem('wizardPhone')
//           sessionStorage.removeItem('wizardDob')
//           sessionStorage.removeItem('wizardLanguage')
//           sessionStorage.removeItem('wizardFromRegister')
          
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
//           // ✅ Check if there's any pending data from registration
//           const pendingFirstName = localStorage.getItem('pendingFirstName') || ''
//           const pendingEmail = localStorage.getItem('pendingEmail') || ''
          
//           if (pendingFirstName || pendingEmail) {
//             setWizardData(prev => ({
//               ...prev,
//               legalFirstName: pendingFirstName,
//               legalLastName: localStorage.getItem('pendingLastName') || '',
//               emailAddress: pendingEmail,
//               mobilePhone: localStorage.getItem('pendingPhoneNumber') || '',
//               dob: localStorage.getItem('pendingDob') || '',
//               english: localStorage.getItem('pendingLanguage') === 'en',
//               spanish: localStorage.getItem('pendingLanguage') === 'es',
//             }))
            
//             // Clear pending data
//             const pendingItems = [
//               'pendingFirstName', 'pendingLastName', 'pendingEmail', 
//               'pendingPhoneNumber', 'pendingDob', 'pendingLanguage', 'pendingPassword'
//             ]
//             pendingItems.forEach(item => localStorage.removeItem(item))
//           }
          
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

//   const finishWizard = async () => {
//     try {
//       let userId = localStorage.getItem('userId');
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
      
//       await wizardService.saveStep(userId, 5, wizardData)
//       await wizardService.completeWizard(userId)
      
//       navigate('/wizard/summary', {
//         state: {
//           ...wizardData,
//           wizardCompleted: true,
//           completedAt: new Date().toISOString()
//         },
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

//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Primary and secondary trade, skill levels, and experience.',
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
// import { TopNav } from '../../common/components/TopNav'
// import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
// import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
// import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
// import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
// import { WizardStep5 } from '../components/wizard-steps/WizardStep5'
// import wizardService from '../services/workerWizardService'
// import workerService from '../services/workerService'
// import { auth } from '../../firebase/config'

// // ✅ Helper function to convert YYYY-MM-DD to MM/DD/YYYY
// const formatDateForDisplay = (dateStr) => {
//   if (!dateStr) return ''
//   // If already in MM/DD/YYYY format, return as is
//   if (dateStr.includes('/')) return dateStr
//   // Convert YYYY-MM-DD to MM/DD/YYYY
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
//   const maxStep = 5
//   const [error, setError] = useState('')
//   const [isSaving, setIsSaving] = useState(false)
//   const [loading, setLoading] = useState(true)
//   const [isResuming, setIsResuming] = useState(false)
  
//   // ✅ Initialize with data from localStorage and location.state
//   const [wizardData, setWizardData] = useState(() => {
//     // ✅ Always check localStorage first (never clear it!)
//     const firstName = localStorage.getItem('pendingFirstName') || ''
//     const lastName = localStorage.getItem('pendingLastName') || ''
//     const email = localStorage.getItem('pendingEmail') || ''
//     const phone = localStorage.getItem('pendingPhoneNumber') || ''
//     const dob = localStorage.getItem('pendingDob') || ''  // YYYY-MM-DD format
//     const language = localStorage.getItem('pendingLanguage') || ''
    
//     // Also check location.state (from verification page)
//     const fromVerification = location?.state?.fromVerification || false
//     const state = location?.state || {}
    
//     return {
//       // Step 1: Personal Information
//       legalFirstName: fromVerification ? (state.firstName || firstName) : firstName,
//       legalLastName: fromVerification ? (state.lastName || lastName) : lastName,
//       emailAddress: fromVerification ? (state.email || email) : email,
//       mobilePhone: fromVerification ? (state.phoneNumber || phone) : phone,
//       dob: fromVerification 
//         ? (formatDateForDisplay(state.dob) || formatDateForDisplay(dob))  // ✅ Convert
//         : formatDateForDisplay(dob),  // ✅ Convert
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
//       primaryTrade: '',
//       primaryOtherTrade: '',
//       workerLevel: '',
//       yearOfExperience: '',
//       secondaryTrade: '',
//       secondaryOtherTrade: '',
//       secondaryWorkerLevel: '',
//       secondaryYearOfExperience: '',
//       leadForemanResponsibilities: {},
//       metalFramingSkills: {},
//       drywallHangingSkills: {},
//       tapingFinishingSkills: {},
//       acousticalCeilingsSkills: {},
//       interiorCarpentrySkills: {},
//       helpersLabourersSkills: {},
//       insulationSkills: {},
//       demolitionSkills: {},
//       secondaryLeadForemanResponsibilities: {},
//       secondaryMetalFramingSkills: {},
//       secondaryDrywallHangingSkills: {},
//       secondaryTapingFinishingSkills: {},
//       secondaryAcousticalCeilingsSkills: {},
//       secondaryInteriorCarpentrySkills: {},
//       secondaryHelpersLabourersSkills: {},
//       secondaryInsulationSkills: {},
//       secondaryDemolitionSkills: {},
//       additionalSkillsTools: '',

//       // Step 3: Work History
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],

//       // Step 4: Availability
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},

//       // Step 5: Emergency Contact & Certifications
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
//   // LOAD WIZARD STATE - RESUME FEATURE
//   // ============================================================

//   useEffect(() => {
//     const loadWizardState = async () => {
//       try {
//         // ✅ If coming from verification page, use location.state
//         if (location?.state?.fromVerification) {
//           const state = location.state
//           console.log('✅ Wizard loaded from verification data:', state)
          
//           // Update state with data from verification
//           setWizardData(prev => ({
//             ...prev,
//             legalFirstName: state.firstName || prev.legalFirstName || '',
//             legalLastName: state.lastName || prev.legalLastName || '',
//             emailAddress: state.email || prev.emailAddress || '',
//             mobilePhone: state.phoneNumber || prev.mobilePhone || '',
//             dob: formatDateForDisplay(state.dob) || prev.dob || '',  // ✅ Convert
//             english: state.language === 'en' || prev.english || false,
//             spanish: state.language === 'es' || prev.spanish || false,
//           }))
          
//           // ✅ DON'T clear localStorage! Keep for future use
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
//             dob: formatDateForDisplay(dob) || prev.dob || '',  // ✅ Convert
//             english: localStorage.getItem('pendingLanguage') === 'en' || prev.english || false,
//             spanish: localStorage.getItem('pendingLanguage') === 'es' || prev.spanish || false,
//           }))
          
//           // ✅ DON'T clear localStorage!
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
//           // Start from step 1
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
//       await wizardService.saveStep(userId, 5, wizardData)
      
//       // ✅ Complete wizard - This marks wizard as complete
//       await wizardService.completeWizard(userId)
      
//       console.log('✅ Wizard completed successfully')
      
//       // ✅ Navigate to summary page (without state, it will fetch from DynamoDB)
//       navigate('/wizard/summary', { 
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

//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Primary and secondary trade, skill levels, and experience.',
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
// import { TopNav } from '../../common/components/TopNav'
// import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
// import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
// import { WizardStep3 } from '../components/wizard-steps/WizardStep3'
// import { WizardStep4 } from '../components/wizard-steps/WizardStep4'
// import { WizardStep5 } from '../components/wizard-steps/WizardStep5'
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
//   const maxStep = 5
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
//       primaryTrade: '',
//       primaryOtherTrade: '',
//       workerLevel: '',
//       yearOfExperience: '',
//       secondaryTrade: '',
//       secondaryOtherTrade: '',
//       secondaryWorkerLevel: '',
//       secondaryYearOfExperience: '',
//       leadForemanResponsibilities: {},
//       metalFramingSkills: {},
//       drywallHangingSkills: {},
//       tapingFinishingSkills: {},
//       acousticalCeilingsSkills: {},
//       interiorCarpentrySkills: {},
//       helpersLabourersSkills: {},
//       insulationSkills: {},
//       demolitionSkills: {},
//       secondaryLeadForemanResponsibilities: {},
//       secondaryMetalFramingSkills: {},
//       secondaryDrywallHangingSkills: {},
//       secondaryTapingFinishingSkills: {},
//       secondaryAcousticalCeilingsSkills: {},
//       secondaryInteriorCarpentrySkills: {},
//       secondaryHelpersLabourersSkills: {},
//       secondaryInsulationSkills: {},
//       secondaryDemolitionSkills: {},
//       additionalSkillsTools: '',

//       // Step 3: Work History
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],

//       // Step 4: Availability
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},

//       // Step 5: Emergency Contact & Certifications
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
//       await wizardService.saveStep(userId, 5, wizardData)
      
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

//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Primary and secondary trade, skill levels, and experience.',
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
// import { TopNav } from '../../common/components/TopNav'
// import { WizardStep1 } from '../components/wizard-steps/WizardStep1'
// import { WizardStep2 } from '../components/wizard-steps/WizardStep2'
// import { WizardStep3 } from '../components/wizard-steps/WizardStep4'
// import { WizardStep4 } from '../components/wizard-steps/WizardStep5'
// import { WizardStep5 } from '../components/wizard-steps/WizardStep6'
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
//   const maxStep = 5
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
//       primaryTrade: '',
//       primaryOtherTrade: '',
//       workerLevel: '',
//       yearOfExperience: '',
//       secondaryTrade: '',
//       secondaryOtherTrade: '',
//       secondaryWorkerLevel: '',
//       secondaryYearOfExperience: '',
//       leadForemanResponsibilities: {},
//       metalFramingSkills: {},
//       drywallHangingSkills: {},
//       tapingFinishingSkills: {},
//       acousticalCeilingsSkills: {},
//       interiorCarpentrySkills: {},
//       helpersLabourersSkills: {},
//       insulationSkills: {},
//       demolitionSkills: {},
//       secondaryLeadForemanResponsibilities: {},
//       secondaryMetalFramingSkills: {},
//       secondaryDrywallHangingSkills: {},
//       secondaryTapingFinishingSkills: {},
//       secondaryAcousticalCeilingsSkills: {},
//       secondaryInteriorCarpentrySkills: {},
//       secondaryHelpersLabourersSkills: {},
//       secondaryInsulationSkills: {},
//       secondaryDemolitionSkills: {},
//       additionalSkillsTools: '',

//       // Step 3: Work History
//       projects: [
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//         { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
//       ],

//       // Step 4: Availability
//       hourlyRate: '',
//       payPrefs: {},
//       travelRadius: 50,
//       willingToTravel: '',
//       travelPrefs: {},
//       availability: {},

//       // Step 5: Emergency Contact & Certifications
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
//       await wizardService.saveStep(userId, 5, wizardData)
      
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

//   const stepTitles = [
//     'Personal Information',
//     'Trade Profile & Skill Matrix',
//     'Work History & Project Experience',
//     'Availability, Travel & Pay Preferences',
//     'Emergency Contact & Acknowledgments'
//   ]

//   const stepSubtitles = [
//     'Basic personal information, contact details, and address.',
//     'Primary and secondary trade, skill levels, and experience.',
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
import wizardService from '../services/workerWizardService'
import workerService from '../services/workerService'
import { auth } from '../../firebase/config'

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

export function WorkerWizardPage({ embedded = false, initialStepOverride }) {
  const navigate = useNavigate()
  const location = useLocation()

  // ============================================================
  // STATE MANAGEMENT
  // ============================================================
  
  const [step, setStep] = useState(1)
  const maxStep = 6 // ✅ Updated to 6 steps
  const [error, setError] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isResuming, setIsResuming] = useState(false)
  
  // ✅ Initialize with data from localStorage and location.state
  const [wizardData, setWizardData] = useState(() => {
    const firstName = localStorage.getItem('pendingFirstName') || ''
    const lastName = localStorage.getItem('pendingLastName') || ''
    const email = localStorage.getItem('pendingEmail') || ''
    const phone = localStorage.getItem('pendingPhoneNumber') || ''
    const dob = localStorage.getItem('pendingDob') || ''
    const language = localStorage.getItem('pendingLanguage') || ''
    
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
        
        if (firstName || email) {
          console.log('✅ Loading wizard from localStorage')
          setWizardData(prev => ({
            ...prev,
            legalFirstName: firstName || prev.legalFirstName || '',
            legalLastName: localStorage.getItem('pendingLastName') || prev.legalLastName || '',
            emailAddress: email || prev.emailAddress || '',
            mobilePhone: localStorage.getItem('pendingPhoneNumber') || prev.mobilePhone || '',
            dob: formatDateForDisplay(dob) || prev.dob || '',
            english: localStorage.getItem('pendingLanguage') === 'en' || prev.english || false,
            spanish: localStorage.getItem('pendingLanguage') === 'es' || prev.spanish || false,
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
  }, [location?.state])

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
  // NAVIGATION
  // ============================================================

  const goNext = async () => {
    try {
      await saveCurrentStep()
      setStep((s) => Math.min(maxStep, s + 1))
      window.scrollTo(0, 0)
      setError('')
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
      
      // ✅ Save final step
      await wizardService.saveStep(userId, 6, wizardData)
      
      // ✅ Complete wizard - This marks wizard as complete
      await wizardService.completeWizard(userId)
      
      console.log('✅ Wizard completed successfully')
      
      // ✅ Navigate to Registration Success Page
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
              return (
                <button
                  key={n}
                  type="button"
                  className={`wizardStepPill ${step === n ? 'wizardStepPillActive' : ''}`}
                  onClick={() => setStep(n)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    border: step === n ? '2px solid #0f4ea9' : '1px solid rgba(18, 38, 63, 0.12)',
                    background: step === n ? '#0f4ea9' : 'white',
                    color: step === n ? 'white' : '#17263a',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '13px',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {n}
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

          <div className="wizardFooterRight">
            {step < maxStep ? (
              <button 
                type="button" 
                className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
                onClick={goNext}
                disabled={isSaving}
                style={{
                  padding: '8px 24px',
                  borderRadius: '8px',
                  background: isSaving ? '#94a3b8' : '#0f4ea9',
                  color: 'white',
                  border: 'none',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: isSaving ? 0.7 : 1
                }}
              >
                <span>{isSaving ? 'Saving...' : 'Next'}</span>
                <span>→</span>
              </button>
            ) : (
              <button 
                type="button" 
                className="wizardPillBtn wizardPillBtnSuccess" 
                onClick={finishWizard}
                disabled={isSaving}
                style={{
                  padding: '8px 24px',
                  borderRadius: '8px',
                  background: isSaving ? '#94a3b8' : '#2fb463',
                  color: 'white',
                  border: 'none',
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  fontSize: '14px',
                  transition: 'all 0.2s',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  opacity: isSaving ? 0.7 : 1
                }}
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

        <main className="appContent">{wizardContent}</main>
      </div>
    </div>
  )
}

export default WorkerWizardPage