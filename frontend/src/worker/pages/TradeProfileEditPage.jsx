// // src/worker/pages/TradeProfileEditPage.jsx
// import { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'
// import { SelectField, TextField } from '../../common/components/TextField'

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

// function IconArrowLeft(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// // Trade Profile Constants
// const TRADE_LEVEL_MAP = {
//   'Metal Framing': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Drywall Hanging': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Taping/Finishing': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Acoustical Ceilings': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Interior Carpentry': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Helpers/Labourers': ['Helper', 'Lead Helper'],
//   'Insulation': ['Helper', 'Mechanic', 'Lead'],
//   'Demolition/Punch/Final Clean': ['Helper', 'Mechanic'],
//   'Leads/Foremen': ['Lead/Foreman'],
//   'Other': [],
// }

// const LEAD_FOREMAN_RESPONSIBILITIES = [
//   'Crew size managed',
//   'Manpower planning',
//   'Daily planning',
//   'Daily enforcement',
//   'Housekeeping enforcement',
//   'Daily reporting',
//   'Punch closeout',
//   'Coordination with superintendent',
// ]

// const METAL_FRAMING_SKILLS = [
//   'Layout',
//   'Shaft walls',
//   'Partition types',
//   'Rated assemblies',
//   'Stud/track gauge',
//   'Bulkheads/softits',
//   'Backing/blocking',
//   'High-wall framing',
//   'MEP Coordination',
// ]

// const DRYWALL_HANGING_SKILLS = [
//   'Walls',
//   'Ceiling',
//   'Fire-rated board',
//   'Abuse board',
//   'Shaft-wall board',
//   'High walls',
//   'Production hanging',
//   'Lift work',
//   'Blueprint reading',
// ]

// const TAPING_FINISHING_SKILLS = [
//   'Level 1-5 finish',
//   'Skim coat',
//   'Texture match',
//   'Punch repair',
//   'Corner bead systems',
//   'Smooth finish',
// ]

// const ACOUSTICAL_CEILINGS_SKILLS = [
//   'Standard grid',
//   'Tegular',
//   'Specialty ceilings',
//   'Clouds/baffles',
//   'Seismic requirements',
//   'Light/HVAC/sprinkler coordination',
// ]

// const INTERIOR_CARPENTRY_SKILLS = [
//   'Backing',
//   'Blocking',
//   'Doors/frames/hardware support',
//   'Trim/carpentry',
//   'Finish carpentry',
// ]

// const HELPERS_LABOURERS_SKILLS = [
//   'Material movement',
//   'Trade Assistance',
//   'Cleanup',
//   'Preparation work',
// ]

// const INSULATION_SKILLS = [
//   'Wall Insulation',
//   'Bat Insulation',
//   'Sound Insulation',
//   'Specialty Insulation',
// ]

// const DEMOLITION_SKILLS = [
//   'Demolition',
//   'Removal Support',
//   'Clean up',
//   'Punch work',
//   'Final clean',
//   'Closeout Support',
// ]

// export function TradeProfileEditPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   // Get data from location state or initialize empty
//   const initialData = location?.state?.tradeData || {
//     primaryTrade: '',
//     primaryOtherTrade: '',
//     workerLevel: '',
//     yearOfExperience: '',
//     secondaryTrade: '',
//     secondaryOtherTrade: '',
//     secondaryWorkerLevel: '',
//     secondaryYearOfExperience: '',
//     leadForemanResponsibilities: {},
//     metalFramingSkills: {},
//     drywallHangingSkills: {},
//     tapingFinishingSkills: {},
//     acousticalCeilingsSkills: {},
//     interiorCarpentrySkills: {},
//     helpersLabourersSkills: {},
//     insulationSkills: {},
//     demolitionSkills: {},
//     secondaryLeadForemanResponsibilities: {},
//     secondaryMetalFramingSkills: {},
//     secondaryDrywallHangingSkills: {},
//     secondaryTapingFinishingSkills: {},
//     secondaryAcousticalCeilingsSkills: {},
//     secondaryInteriorCarpentrySkills: {},
//     secondaryHelpersLabourersSkills: {},
//     secondaryInsulationSkills: {},
//     secondaryDemolitionSkills: {},
//     additionalSkillsTools: '',
//   }

//   const [tradeData, setTradeData] = useState(initialData)
//   const [isSaving, setIsSaving] = useState(false)

//   const handleChange = (field, value) => {
//     setTradeData({ ...tradeData, [field]: value })
//   }

//   const handleTradeChange = (value) => {
//     setTradeData({
//       ...tradeData,
//       primaryTrade: value,
//       primaryOtherTrade: '',
//       workerLevel: '',
//       leadForemanResponsibilities: {},
//       metalFramingSkills: {},
//       drywallHangingSkills: {},
//       tapingFinishingSkills: {},
//       acousticalCeilingsSkills: {},
//       interiorCarpentrySkills: {},
//       helpersLabourersSkills: {},
//       insulationSkills: {},
//       demolitionSkills: {},
//     })
//   }

//   const handleSecondaryTradeChange = (value) => {
//     setTradeData({
//       ...tradeData,
//       secondaryTrade: value,
//       secondaryOtherTrade: '',
//       secondaryWorkerLevel: '',
//       secondaryLeadForemanResponsibilities: {},
//       secondaryMetalFramingSkills: {},
//       secondaryDrywallHangingSkills: {},
//       secondaryTapingFinishingSkills: {},
//       secondaryAcousticalCeilingsSkills: {},
//       secondaryInteriorCarpentrySkills: {},
//       secondaryHelpersLabourersSkills: {},
//       secondaryInsulationSkills: {},
//       secondaryDemolitionSkills: {},
//     })
//   }

//   const handleLevelChange = (value) => {
//     const updates = {
//       ...tradeData,
//       workerLevel: value,
//     }
//     updates.leadForemanResponsibilities = {}
//     updates.metalFramingSkills = {}
//     updates.drywallHangingSkills = {}
//     updates.tapingFinishingSkills = {}
//     updates.acousticalCeilingsSkills = {}
//     updates.interiorCarpentrySkills = {}
//     updates.helpersLabourersSkills = {}
//     updates.insulationSkills = {}
//     updates.demolitionSkills = {}
//     setTradeData(updates)
//   }

//   const handleSecondaryLevelChange = (value) => {
//     const updates = {
//       ...tradeData,
//       secondaryWorkerLevel: value,
//     }
//     updates.secondaryLeadForemanResponsibilities = {}
//     updates.secondaryMetalFramingSkills = {}
//     updates.secondaryDrywallHangingSkills = {}
//     updates.secondaryTapingFinishingSkills = {}
//     updates.secondaryAcousticalCeilingsSkills = {}
//     updates.secondaryInteriorCarpentrySkills = {}
//     updates.secondaryHelpersLabourersSkills = {}
//     updates.secondaryInsulationSkills = {}
//     updates.secondaryDemolitionSkills = {}
//     setTradeData(updates)
//   }

//   const shouldShowTradeSkills = (level) => {
//     if (level === 'Lead' || level === 'Lead/Foreman') return false
//     return true
//   }

//   // Primary toggle handlers
//   const handlePrimaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = tradeData.leadForemanResponsibilities || {}
//     handleChange('leadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handlePrimaryMetalFramingToggle = (skill) => (e) => {
//     const current = tradeData.metalFramingSkills || {}
//     handleChange('metalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDrywallHangingToggle = (skill) => (e) => {
//     const current = tradeData.drywallHangingSkills || {}
//     handleChange('drywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryTapingFinishingToggle = (skill) => (e) => {
//     const current = tradeData.tapingFinishingSkills || {}
//     handleChange('tapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = tradeData.acousticalCeilingsSkills || {}
//     handleChange('acousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = tradeData.interiorCarpentrySkills || {}
//     handleChange('interiorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = tradeData.helpersLabourersSkills || {}
//     handleChange('helpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInsulationToggle = (skill) => (e) => {
//     const current = tradeData.insulationSkills || {}
//     handleChange('insulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDemolitionToggle = (skill) => (e) => {
//     const current = tradeData.demolitionSkills || {}
//     handleChange('demolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   // Secondary toggle handlers
//   const handleSecondaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = tradeData.secondaryLeadForemanResponsibilities || {}
//     handleChange('secondaryLeadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handleSecondaryMetalFramingToggle = (skill) => (e) => {
//     const current = tradeData.secondaryMetalFramingSkills || {}
//     handleChange('secondaryMetalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDrywallHangingToggle = (skill) => (e) => {
//     const current = tradeData.secondaryDrywallHangingSkills || {}
//     handleChange('secondaryDrywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryTapingFinishingToggle = (skill) => (e) => {
//     const current = tradeData.secondaryTapingFinishingSkills || {}
//     handleChange('secondaryTapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = tradeData.secondaryAcousticalCeilingsSkills || {}
//     handleChange('secondaryAcousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = tradeData.secondaryInteriorCarpentrySkills || {}
//     handleChange('secondaryInteriorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = tradeData.secondaryHelpersLabourersSkills || {}
//     handleChange('secondaryHelpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInsulationToggle = (skill) => (e) => {
//     const current = tradeData.secondaryInsulationSkills || {}
//     handleChange('secondaryInsulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDemolitionToggle = (skill) => (e) => {
//     const current = tradeData.secondaryDemolitionSkills || {}
//     handleChange('secondaryDemolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const workerLevels = TRADE_LEVEL_MAP[tradeData.primaryTrade] || []
//   const secondaryWorkerLevels = TRADE_LEVEL_MAP[tradeData.secondaryTrade] || []
  
//   const isDuplicate = tradeData.primaryTrade && tradeData.secondaryTrade && 
//                       tradeData.workerLevel && tradeData.secondaryWorkerLevel &&
//                       tradeData.primaryTrade === tradeData.secondaryTrade && 
//                       tradeData.workerLevel === tradeData.secondaryWorkerLevel

//   const getSecondaryTradeOptions = () => {
//     return Object.keys(TRADE_LEVEL_MAP)
//   }

//   const isPrimaryOther = tradeData.primaryTrade === 'Other'
//   const isSecondaryOther = tradeData.secondaryTrade === 'Other'

//   const handleSave = () => {
//     setIsSaving(true)
//     setTimeout(() => {
//       navigate('/wizard/summary', { 
//         state: { 
//           ...location?.state?.parentData,
//           tradeData: tradeData,
//           updatedTrade: true 
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
//                 Edit Trade Profile
//               </span>
//             </div>

//             {/* Scrollable Content Area */}
//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               paddingBottom: '16px',
//             }}>
//               {/* Trade Profile Form */}
//               <div style={{
//                 background: 'white',
//                 borderRadius: '16px',
//                 padding: '32px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//               }}>
//                 <div style={{ marginBottom: 16 }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     Trade Profile & Skill Matrix
//                   </div>

//                   {/* Primary Trade Section */}
//                   <div style={{ marginBottom: 16 }}>
//                     <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//                       Primary Trade
//                     </div>
//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
//                       <SelectField
//                         label=""
//                         value={tradeData.primaryTrade || ''}
//                         onChange={handleTradeChange}
//                       >
//                         <option value="">Select Trade</option>
//                         {Object.keys(TRADE_LEVEL_MAP).map((trade) => (
//                           <option key={trade} value={trade}>
//                             {trade}
//                           </option>
//                         ))}
//                       </SelectField>

//                       {isPrimaryOther ? (
//                         <TextField
//                           label=""
//                           value={tradeData.primaryOtherTrade || ''}
//                           onChange={(value) => handleChange('primaryOtherTrade', value)}
//                           placeholder="Enter Primary Trade"
//                         />
//                       ) : (
//                         <SelectField
//                           label=""
//                           value={tradeData.workerLevel || ''}
//                           disabled={!tradeData.primaryTrade}
//                           onChange={handleLevelChange}
//                         >
//                           <option value="">Select Worker Level</option>
//                           {workerLevels.map((level) => (
//                             <option key={level} value={level}>
//                               {level}
//                             </option>
//                           ))}
//                         </SelectField>
//                       )}

//                       <TextField
//                         label=""
//                         type="number"
//                         min="0"
//                         value={tradeData.yearOfExperience || ''}
//                         onChange={(value) => handleChange('yearOfExperience', value)}
//                         placeholder="Enter years"
//                       />
//                     </div>

//                     {/* Show custom trade input when Other is selected */}
//                     {isPrimaryOther && tradeData.primaryOtherTrade && (
//                       <div style={{
//                         marginTop: 8,
//                         fontSize: '13px',
//                         color: '#0f4ea9',
//                         fontWeight: 500,
//                         padding: '8px 12px',
//                         background: 'rgba(15, 78, 169, 0.05)',
//                         borderRadius: '8px',
//                         border: '1px solid rgba(15, 78, 169, 0.1)',
//                       }}>
//                         Custom Trade: {tradeData.primaryOtherTrade}
//                       </div>
//                     )}

//                     {/* Primary Trade Skills */}
//                     {!isPrimaryOther && tradeData.primaryTrade && tradeData.workerLevel && shouldShowTradeSkills(tradeData.workerLevel) && (
//                       <>
//                         {tradeData.primaryTrade === 'Metal Framing' && 
//                          (tradeData.workerLevel === 'Helper' || tradeData.workerLevel === 'Mechanic' || tradeData.workerLevel === 'Advanced Mechanic') && (
//                           <fieldset style={{
//                             marginTop: 16,
//                             padding: '16px 20px 20px 20px',
//                             border: '1px solid rgba(15, 78, 169, 0.2)',
//                             borderRadius: '12px',
//                             background: 'rgba(15, 78, 169, 0.03)',
//                             position: 'relative',
//                           }}>
//                             <legend style={{
//                               padding: '0 12px',
//                               fontSize: '14px',
//                               fontWeight: 600,
//                               color: '#0f4ea9',
//                               background: 'white',
//                               borderRadius: '8px',
//                               marginLeft: '8px',
//                             }}>
//                               Metal Framing ({tradeData.workerLevel === 'Helper' ? 'H' : tradeData.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                             </legend>
//                             <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
//                               {METAL_FRAMING_SKILLS.map((skill) => (
//                                 <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                                   <input
//                                     type="checkbox"
//                                     checked={!!(tradeData.metalFramingSkills?.[skill] || false)}
//                                     onChange={handlePrimaryMetalFramingToggle(skill)}
//                                   />
//                                   <span style={{ fontSize: '14px', color: '#17263a' }}>{skill}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           </fieldset>
//                         )}

//                         {/* Add other trade skills similarly... */}
//                         {/* Drywall Hanging */}
//                         {tradeData.primaryTrade === 'Drywall Hanging' && 
//                          (tradeData.workerLevel === 'Helper' || tradeData.workerLevel === 'Mechanic' || tradeData.workerLevel === 'Advanced Mechanic') && (
//                           <fieldset style={{
//                             marginTop: 16,
//                             padding: '16px 20px 20px 20px',
//                             border: '1px solid rgba(15, 78, 169, 0.2)',
//                             borderRadius: '12px',
//                             background: 'rgba(15, 78, 169, 0.03)',
//                             position: 'relative',
//                           }}>
//                             <legend style={{
//                               padding: '0 12px',
//                               fontSize: '14px',
//                               fontWeight: 600,
//                               color: '#0f4ea9',
//                               background: 'white',
//                               borderRadius: '8px',
//                               marginLeft: '8px',
//                             }}>
//                               Drywall Hanging ({tradeData.workerLevel === 'Helper' ? 'H' : tradeData.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                             </legend>
//                             <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
//                               {DRYWALL_HANGING_SKILLS.map((skill) => (
//                                 <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                                   <input
//                                     type="checkbox"
//                                     checked={!!(tradeData.drywallHangingSkills?.[skill] || false)}
//                                     onChange={handlePrimaryDrywallHangingToggle(skill)}
//                                   />
//                                   <span style={{ fontSize: '14px', color: '#17263a' }}>{skill}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           </fieldset>
//                         )}

//                         {/* Taping/Finishing */}
//                         {tradeData.primaryTrade === 'Taping/Finishing' && 
//                          (tradeData.workerLevel === 'Helper' || tradeData.workerLevel === 'Mechanic' || tradeData.workerLevel === 'Advanced Mechanic') && (
//                           <fieldset style={{
//                             marginTop: 16,
//                             padding: '16px 20px 20px 20px',
//                             border: '1px solid rgba(15, 78, 169, 0.2)',
//                             borderRadius: '12px',
//                             background: 'rgba(15, 78, 169, 0.03)',
//                             position: 'relative',
//                           }}>
//                             <legend style={{
//                               padding: '0 12px',
//                               fontSize: '14px',
//                               fontWeight: 600,
//                               color: '#0f4ea9',
//                               background: 'white',
//                               borderRadius: '8px',
//                               marginLeft: '8px',
//                             }}>
//                               Taping/Finishing ({tradeData.workerLevel === 'Helper' ? 'H' : tradeData.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                             </legend>
//                             <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
//                               {TAPING_FINISHING_SKILLS.map((skill) => (
//                                 <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                                   <input
//                                     type="checkbox"
//                                     checked={!!(tradeData.tapingFinishingSkills?.[skill] || false)}
//                                     onChange={handlePrimaryTapingFinishingToggle(skill)}
//                                   />
//                                   <span style={{ fontSize: '14px', color: '#17263a' }}>{skill}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           </fieldset>
//                         )}
//                       </>
//                     )}

//                     {/* Primary Lead/Foreman Responsibilities */}
//                     {!isPrimaryOther && (tradeData.workerLevel === 'Lead' || tradeData.workerLevel === 'Lead/Foreman') && (
//                       <fieldset style={{
//                         marginTop: 16,
//                         padding: '16px 20px 20px 20px',
//                         border: '1px solid rgba(15, 78, 169, 0.2)',
//                         borderRadius: '12px',
//                         background: 'rgba(15, 78, 169, 0.03)',
//                         position: 'relative',
//                       }}>
//                         <legend style={{
//                           padding: '0 12px',
//                           fontSize: '14px',
//                           fontWeight: 600,
//                           color: '#0f4ea9',
//                           background: 'white',
//                           borderRadius: '8px',
//                           marginLeft: '8px',
//                         }}>
//                           {tradeData.workerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                         </legend>

//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
//                           {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                             <label key={responsibility} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                               <input
//                                 type="checkbox"
//                                 checked={!!(tradeData.leadForemanResponsibilities?.[responsibility] || false)}
//                                 onChange={handlePrimaryResponsibilityToggle(responsibility)}
//                               />
//                               <span style={{ fontSize: '14px', color: '#17263a' }}>{responsibility}</span>
//                             </label>
//                           ))}
//                         </div>
//                       </fieldset>
//                     )}
//                   </div>

//                   {/* Secondary Trade Section */}
//                   <div style={{ marginTop: 16 }}>
//                     <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//                       Secondary Trade
//                     </div>
//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
//                       <SelectField
//                         label=""
//                         value={tradeData.secondaryTrade || ''}
//                         onChange={handleSecondaryTradeChange}
//                       >
//                         <option value="">Select Trade</option>
//                         {getSecondaryTradeOptions().map((trade) => (
//                           <option key={trade} value={trade}>
//                             {trade}
//                           </option>
//                         ))}
//                       </SelectField>

//                       {isSecondaryOther ? (
//                         <TextField
//                           label=""
//                           value={tradeData.secondaryOtherTrade || ''}
//                           onChange={(value) => handleChange('secondaryOtherTrade', value)}
//                           placeholder="Enter Secondary Trade"
//                         />
//                       ) : (
//                         <SelectField
//                           label=""
//                           value={tradeData.secondaryWorkerLevel || ''}
//                           disabled={!tradeData.secondaryTrade}
//                           onChange={handleSecondaryLevelChange}
//                         >
//                           <option value="">Select Worker Level</option>
//                           {secondaryWorkerLevels.map((level) => (
//                             <option key={level} value={level}>
//                               {level}
//                             </option>
//                           ))}
//                         </SelectField>
//                       )}

//                       <TextField
//                         label=""
//                         type="number"
//                         min="0"
//                         value={tradeData.secondaryYearOfExperience || ''}
//                         onChange={(value) => handleChange('secondaryYearOfExperience', value)}
//                         placeholder="Enter years"
//                       />
//                     </div>

//                     {/* Duplicate Validation Error */}
//                     {isDuplicate && (
//                       <div style={{
//                         marginTop: 8,
//                         padding: '10px 16px',
//                         background: '#fee2e2',
//                         border: '1px solid #fecaca',
//                         borderRadius: '8px',
//                         color: '#dc2626',
//                         fontSize: '13px',
//                         fontWeight: 500,
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px'
//                       }}>
//                         <span style={{ fontSize: '18px' }}>⚠️</span>
//                         Secondary Trade and Level cannot be the same as Primary Trade and Level. Please select different values.
//                       </div>
//                     )}

//                     {/* Additional Skills/Tools/Systems */}
//                     <div style={{ marginTop: 16 }}>
//                       <div style={{ 
//                         fontSize: '14px', 
//                         fontWeight: 600, 
//                         color: '#17263a', 
//                         marginBottom: 8 
//                       }}>
//                         Additional Skills / Tools / Systems
//                       </div>
//                       <textarea
//                         value={tradeData.additionalSkillsTools || ''}
//                         onChange={(e) => handleChange('additionalSkillsTools', e.target.value)}
//                         placeholder="Enter additional skills, tools, or systems you have experience with..."
//                         rows={4}
//                         style={{
//                           width: '100%',
//                           padding: '12px 16px',
//                           border: '1px solid rgba(18, 38, 63, 0.12)',
//                           borderRadius: '12px',
//                           fontSize: '14px',
//                           fontFamily: 'inherit',
//                           resize: 'vertical',
//                           outline: 'none',
//                           transition: 'all 0.2s ease',
//                           background: 'white',
//                           color: '#17263a',
//                           minHeight: '100px',
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
//                         fontSize: '11px', 
//                         color: 'rgba(23, 38, 58, 0.5)', 
//                         marginTop: '4px',
//                         textAlign: 'right'
//                       }}>
//                         {tradeData.additionalSkillsTools?.length || 0} characters
//                       </div>
//                     </div>
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




// // src/worker/pages/TradeProfileEditPage.jsx
// import { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'
// import { SelectField, TextField } from '../../common/components/TextField'

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

// function IconArrowLeft(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// // Trade Profile Constants
// const TRADE_LEVEL_MAP = {
//   'Metal Framing': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Drywall Hanging': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Taping/Finishing': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Acoustical Ceilings': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Interior Carpentry': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
//   'Helpers/Labourers': ['Helper', 'Lead Helper'],
//   'Insulation': ['Helper', 'Mechanic', 'Lead'],
//   'Demolition/Punch/Final Clean': ['Helper', 'Mechanic'],
//   'Leads/Foremen': ['Lead/Foreman'],
//   'Other': [],
// }

// const LEAD_FOREMAN_RESPONSIBILITIES = [
//   'Crew size managed',
//   'Manpower planning',
//   'Daily planning',
//   'Daily enforcement',
//   'Housekeeping enforcement',
//   'Daily reporting',
//   'Punch closeout',
//   'Coordination with superintendent',
// ]

// const METAL_FRAMING_SKILLS = [
//   'Layout',
//   'Shaft walls',
//   'Partition types',
//   'Rated assemblies',
//   'Stud/track gauge',
//   'Bulkheads/softits',
//   'Backing/blocking',
//   'High-wall framing',
//   'MEP Coordination',
// ]

// const DRYWALL_HANGING_SKILLS = [
//   'Walls',
//   'Ceiling',
//   'Fire-rated board',
//   'Abuse board',
//   'Shaft-wall board',
//   'High walls',
//   'Production hanging',
//   'Lift work',
//   'Blueprint reading',
// ]

// const TAPING_FINISHING_SKILLS = [
//   'Level 1-5 finish',
//   'Skim coat',
//   'Texture match',
//   'Punch repair',
//   'Corner bead systems',
//   'Smooth finish',
// ]

// const ACOUSTICAL_CEILINGS_SKILLS = [
//   'Standard grid',
//   'Tegular',
//   'Specialty ceilings',
//   'Clouds/baffles',
//   'Seismic requirements',
//   'Light/HVAC/sprinkler coordination',
// ]

// const INTERIOR_CARPENTRY_SKILLS = [
//   'Backing',
//   'Blocking',
//   'Doors/frames/hardware support',
//   'Trim/carpentry',
//   'Finish carpentry',
// ]

// const HELPERS_LABOURERS_SKILLS = [
//   'Material movement',
//   'Trade Assistance',
//   'Cleanup',
//   'Preparation work',
// ]

// const INSULATION_SKILLS = [
//   'Wall Insulation',
//   'Bat Insulation',
//   'Sound Insulation',
//   'Specialty Insulation',
// ]

// const DEMOLITION_SKILLS = [
//   'Demolition',
//   'Removal Support',
//   'Clean up',
//   'Punch work',
//   'Final clean',
//   'Closeout Support',
// ]

// export function TradeProfileEditPage() {
//   const navigate = useNavigate()
//   const location = useLocation()
  
//   // Get data from location state or initialize empty
//   const initialData = location?.state?.tradeData || {
//     primaryTrade: '',
//     primaryOtherTrade: '',
//     workerLevel: '',
//     yearOfExperience: '',
//     secondaryTrade: '',
//     secondaryOtherTrade: '',
//     secondaryWorkerLevel: '',
//     secondaryYearOfExperience: '',
//     leadForemanResponsibilities: {},
//     metalFramingSkills: {},
//     drywallHangingSkills: {},
//     tapingFinishingSkills: {},
//     acousticalCeilingsSkills: {},
//     interiorCarpentrySkills: {},
//     helpersLabourersSkills: {},
//     insulationSkills: {},
//     demolitionSkills: {},
//     secondaryLeadForemanResponsibilities: {},
//     secondaryMetalFramingSkills: {},
//     secondaryDrywallHangingSkills: {},
//     secondaryTapingFinishingSkills: {},
//     secondaryAcousticalCeilingsSkills: {},
//     secondaryInteriorCarpentrySkills: {},
//     secondaryHelpersLabourersSkills: {},
//     secondaryInsulationSkills: {},
//     secondaryDemolitionSkills: {},
//     additionalSkillsTools: '',
//   }

//   const [tradeData, setTradeData] = useState(initialData)
//   const [isSaving, setIsSaving] = useState(false)

//   const handleChange = (field, value) => {
//     setTradeData({ ...tradeData, [field]: value })
//   }

//   const handleTradeChange = (value) => {
//     setTradeData({
//       ...tradeData,
//       primaryTrade: value,
//       primaryOtherTrade: '',
//       workerLevel: '',
//       leadForemanResponsibilities: {},
//       metalFramingSkills: {},
//       drywallHangingSkills: {},
//       tapingFinishingSkills: {},
//       acousticalCeilingsSkills: {},
//       interiorCarpentrySkills: {},
//       helpersLabourersSkills: {},
//       insulationSkills: {},
//       demolitionSkills: {},
//     })
//   }

//   const handleSecondaryTradeChange = (value) => {
//     setTradeData({
//       ...tradeData,
//       secondaryTrade: value,
//       secondaryOtherTrade: '',
//       secondaryWorkerLevel: '',
//       secondaryLeadForemanResponsibilities: {},
//       secondaryMetalFramingSkills: {},
//       secondaryDrywallHangingSkills: {},
//       secondaryTapingFinishingSkills: {},
//       secondaryAcousticalCeilingsSkills: {},
//       secondaryInteriorCarpentrySkills: {},
//       secondaryHelpersLabourersSkills: {},
//       secondaryInsulationSkills: {},
//       secondaryDemolitionSkills: {},
//     })
//   }

//   const handleLevelChange = (value) => {
//     const updates = {
//       ...tradeData,
//       workerLevel: value,
//     }
//     updates.leadForemanResponsibilities = {}
//     updates.metalFramingSkills = {}
//     updates.drywallHangingSkills = {}
//     updates.tapingFinishingSkills = {}
//     updates.acousticalCeilingsSkills = {}
//     updates.interiorCarpentrySkills = {}
//     updates.helpersLabourersSkills = {}
//     updates.insulationSkills = {}
//     updates.demolitionSkills = {}
//     setTradeData(updates)
//   }

//   const handleSecondaryLevelChange = (value) => {
//     const updates = {
//       ...tradeData,
//       secondaryWorkerLevel: value,
//     }
//     updates.secondaryLeadForemanResponsibilities = {}
//     updates.secondaryMetalFramingSkills = {}
//     updates.secondaryDrywallHangingSkills = {}
//     updates.secondaryTapingFinishingSkills = {}
//     updates.secondaryAcousticalCeilingsSkills = {}
//     updates.secondaryInteriorCarpentrySkills = {}
//     updates.secondaryHelpersLabourersSkills = {}
//     updates.secondaryInsulationSkills = {}
//     updates.secondaryDemolitionSkills = {}
//     setTradeData(updates)
//   }

//   const shouldShowTradeSkills = (level) => {
//     if (level === 'Lead' || level === 'Lead/Foreman') return false
//     return true
//   }

//   // Primary toggle handlers
//   const handlePrimaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = tradeData.leadForemanResponsibilities || {}
//     handleChange('leadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handlePrimaryMetalFramingToggle = (skill) => (e) => {
//     const current = tradeData.metalFramingSkills || {}
//     handleChange('metalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDrywallHangingToggle = (skill) => (e) => {
//     const current = tradeData.drywallHangingSkills || {}
//     handleChange('drywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryTapingFinishingToggle = (skill) => (e) => {
//     const current = tradeData.tapingFinishingSkills || {}
//     handleChange('tapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = tradeData.acousticalCeilingsSkills || {}
//     handleChange('acousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = tradeData.interiorCarpentrySkills || {}
//     handleChange('interiorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = tradeData.helpersLabourersSkills || {}
//     handleChange('helpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInsulationToggle = (skill) => (e) => {
//     const current = tradeData.insulationSkills || {}
//     handleChange('insulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDemolitionToggle = (skill) => (e) => {
//     const current = tradeData.demolitionSkills || {}
//     handleChange('demolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   // Secondary toggle handlers
//   const handleSecondaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = tradeData.secondaryLeadForemanResponsibilities || {}
//     handleChange('secondaryLeadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handleSecondaryMetalFramingToggle = (skill) => (e) => {
//     const current = tradeData.secondaryMetalFramingSkills || {}
//     handleChange('secondaryMetalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDrywallHangingToggle = (skill) => (e) => {
//     const current = tradeData.secondaryDrywallHangingSkills || {}
//     handleChange('secondaryDrywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryTapingFinishingToggle = (skill) => (e) => {
//     const current = tradeData.secondaryTapingFinishingSkills || {}
//     handleChange('secondaryTapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = tradeData.secondaryAcousticalCeilingsSkills || {}
//     handleChange('secondaryAcousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = tradeData.secondaryInteriorCarpentrySkills || {}
//     handleChange('secondaryInteriorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = tradeData.secondaryHelpersLabourersSkills || {}
//     handleChange('secondaryHelpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInsulationToggle = (skill) => (e) => {
//     const current = tradeData.secondaryInsulationSkills || {}
//     handleChange('secondaryInsulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDemolitionToggle = (skill) => (e) => {
//     const current = tradeData.secondaryDemolitionSkills || {}
//     handleChange('secondaryDemolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const workerLevels = TRADE_LEVEL_MAP[tradeData.primaryTrade] || []
//   const secondaryWorkerLevels = TRADE_LEVEL_MAP[tradeData.secondaryTrade] || []
  
//   const isDuplicate = tradeData.primaryTrade && tradeData.secondaryTrade && 
//                       tradeData.workerLevel && tradeData.secondaryWorkerLevel &&
//                       tradeData.primaryTrade === tradeData.secondaryTrade && 
//                       tradeData.workerLevel === tradeData.secondaryWorkerLevel

//   const getSecondaryTradeOptions = () => {
//     return Object.keys(TRADE_LEVEL_MAP)
//   }

//   const isPrimaryOther = tradeData.primaryTrade === 'Other'
//   const isSecondaryOther = tradeData.secondaryTrade === 'Other'

//   const handleSave = () => {
//     setIsSaving(true)
//     setTimeout(() => {
//       navigate('/wizard/summary', { 
//         state: { 
//           ...location?.state?.parentData,
//           tradeData: tradeData,
//           updatedTrade: true 
//         },
//         replace: true 
//       })
//       setIsSaving(false)
//     }, 500)
//   }

//   // ✅ FIXED: Pass parent data back when cancel/back is clicked
//   const handleBack = () => {
//     navigate('/wizard/summary', {
//       state: location?.state?.parentData || {},
//       replace: true
//     })
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
//                 Edit Trade Profile
//               </span>
//             </div>

//             {/* Scrollable Content Area */}
//             <div style={{
//               flex: 1,
//               overflowY: 'auto',
//               paddingBottom: '16px',
//             }}>
//               {/* Trade Profile Form */}
//               <div style={{
//                 background: 'white',
//                 borderRadius: '16px',
//                 padding: '32px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//               }}>
//                 <div style={{ marginBottom: 16 }}>
//                   <div style={{
//                     fontSize: '16px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                     marginBottom: '16px',
//                     paddingBottom: '8px',
//                     borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//                   }}>
//                     Trade Profile & Skill Matrix
//                   </div>

//                   {/* Primary Trade Section */}
//                   <div style={{ marginBottom: 16 }}>
//                     <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//                       Primary Trade
//                     </div>
//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
//                       <SelectField
//                         label=""
//                         value={tradeData.primaryTrade || ''}
//                         onChange={handleTradeChange}
//                       >
//                         <option value="">Select Trade</option>
//                         {Object.keys(TRADE_LEVEL_MAP).map((trade) => (
//                           <option key={trade} value={trade}>
//                             {trade}
//                           </option>
//                         ))}
//                       </SelectField>

//                       {isPrimaryOther ? (
//                         <TextField
//                           label=""
//                           value={tradeData.primaryOtherTrade || ''}
//                           onChange={(value) => handleChange('primaryOtherTrade', value)}
//                           placeholder="Enter Primary Trade"
//                         />
//                       ) : (
//                         <SelectField
//                           label=""
//                           value={tradeData.workerLevel || ''}
//                           disabled={!tradeData.primaryTrade}
//                           onChange={handleLevelChange}
//                         >
//                           <option value="">Select Worker Level</option>
//                           {workerLevels.map((level) => (
//                             <option key={level} value={level}>
//                               {level}
//                             </option>
//                           ))}
//                         </SelectField>
//                       )}

//                       <TextField
//                         label=""
//                         type="number"
//                         min="0"
//                         value={tradeData.yearOfExperience || ''}
//                         onChange={(value) => handleChange('yearOfExperience', value)}
//                         placeholder="Enter years"
//                       />
//                     </div>

//                     {/* Show custom trade input when Other is selected */}
//                     {isPrimaryOther && tradeData.primaryOtherTrade && (
//                       <div style={{
//                         marginTop: 8,
//                         fontSize: '13px',
//                         color: '#0f4ea9',
//                         fontWeight: 500,
//                         padding: '8px 12px',
//                         background: 'rgba(15, 78, 169, 0.05)',
//                         borderRadius: '8px',
//                         border: '1px solid rgba(15, 78, 169, 0.1)',
//                       }}>
//                         Custom Trade: {tradeData.primaryOtherTrade}
//                       </div>
//                     )}

//                     {/* Primary Trade Skills */}
//                     {!isPrimaryOther && tradeData.primaryTrade && tradeData.workerLevel && shouldShowTradeSkills(tradeData.workerLevel) && (
//                       <>
//                         {tradeData.primaryTrade === 'Metal Framing' && 
//                          (tradeData.workerLevel === 'Helper' || tradeData.workerLevel === 'Mechanic' || tradeData.workerLevel === 'Advanced Mechanic') && (
//                           <fieldset style={{
//                             marginTop: 16,
//                             padding: '16px 20px 20px 20px',
//                             border: '1px solid rgba(15, 78, 169, 0.2)',
//                             borderRadius: '12px',
//                             background: 'rgba(15, 78, 169, 0.03)',
//                             position: 'relative',
//                           }}>
//                             <legend style={{
//                               padding: '0 12px',
//                               fontSize: '14px',
//                               fontWeight: 600,
//                               color: '#0f4ea9',
//                               background: 'white',
//                               borderRadius: '8px',
//                               marginLeft: '8px',
//                             }}>
//                               Metal Framing ({tradeData.workerLevel === 'Helper' ? 'H' : tradeData.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                             </legend>
//                             <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
//                               {METAL_FRAMING_SKILLS.map((skill) => (
//                                 <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                                   <input
//                                     type="checkbox"
//                                     checked={!!(tradeData.metalFramingSkills?.[skill] || false)}
//                                     onChange={handlePrimaryMetalFramingToggle(skill)}
//                                   />
//                                   <span style={{ fontSize: '14px', color: '#17263a' }}>{skill}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           </fieldset>
//                         )}

//                         {/* Add other trade skills similarly... */}
//                         {/* Drywall Hanging */}
//                         {tradeData.primaryTrade === 'Drywall Hanging' && 
//                          (tradeData.workerLevel === 'Helper' || tradeData.workerLevel === 'Mechanic' || tradeData.workerLevel === 'Advanced Mechanic') && (
//                           <fieldset style={{
//                             marginTop: 16,
//                             padding: '16px 20px 20px 20px',
//                             border: '1px solid rgba(15, 78, 169, 0.2)',
//                             borderRadius: '12px',
//                             background: 'rgba(15, 78, 169, 0.03)',
//                             position: 'relative',
//                           }}>
//                             <legend style={{
//                               padding: '0 12px',
//                               fontSize: '14px',
//                               fontWeight: 600,
//                               color: '#0f4ea9',
//                               background: 'white',
//                               borderRadius: '8px',
//                               marginLeft: '8px',
//                             }}>
//                               Drywall Hanging ({tradeData.workerLevel === 'Helper' ? 'H' : tradeData.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                             </legend>
//                             <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
//                               {DRYWALL_HANGING_SKILLS.map((skill) => (
//                                 <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                                   <input
//                                     type="checkbox"
//                                     checked={!!(tradeData.drywallHangingSkills?.[skill] || false)}
//                                     onChange={handlePrimaryDrywallHangingToggle(skill)}
//                                   />
//                                   <span style={{ fontSize: '14px', color: '#17263a' }}>{skill}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           </fieldset>
//                         )}

//                         {/* Taping/Finishing */}
//                         {tradeData.primaryTrade === 'Taping/Finishing' && 
//                          (tradeData.workerLevel === 'Helper' || tradeData.workerLevel === 'Mechanic' || tradeData.workerLevel === 'Advanced Mechanic') && (
//                           <fieldset style={{
//                             marginTop: 16,
//                             padding: '16px 20px 20px 20px',
//                             border: '1px solid rgba(15, 78, 169, 0.2)',
//                             borderRadius: '12px',
//                             background: 'rgba(15, 78, 169, 0.03)',
//                             position: 'relative',
//                           }}>
//                             <legend style={{
//                               padding: '0 12px',
//                               fontSize: '14px',
//                               fontWeight: 600,
//                               color: '#0f4ea9',
//                               background: 'white',
//                               borderRadius: '8px',
//                               marginLeft: '8px',
//                             }}>
//                               Taping/Finishing ({tradeData.workerLevel === 'Helper' ? 'H' : tradeData.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                             </legend>
//                             <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
//                               {TAPING_FINISHING_SKILLS.map((skill) => (
//                                 <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                                   <input
//                                     type="checkbox"
//                                     checked={!!(tradeData.tapingFinishingSkills?.[skill] || false)}
//                                     onChange={handlePrimaryTapingFinishingToggle(skill)}
//                                   />
//                                   <span style={{ fontSize: '14px', color: '#17263a' }}>{skill}</span>
//                                 </label>
//                               ))}
//                             </div>
//                           </fieldset>
//                         )}
//                       </>
//                     )}

//                     {/* Primary Lead/Foreman Responsibilities */}
//                     {!isPrimaryOther && (tradeData.workerLevel === 'Lead' || tradeData.workerLevel === 'Lead/Foreman') && (
//                       <fieldset style={{
//                         marginTop: 16,
//                         padding: '16px 20px 20px 20px',
//                         border: '1px solid rgba(15, 78, 169, 0.2)',
//                         borderRadius: '12px',
//                         background: 'rgba(15, 78, 169, 0.03)',
//                         position: 'relative',
//                       }}>
//                         <legend style={{
//                           padding: '0 12px',
//                           fontSize: '14px',
//                           fontWeight: 600,
//                           color: '#0f4ea9',
//                           background: 'white',
//                           borderRadius: '8px',
//                           marginLeft: '8px',
//                         }}>
//                           {tradeData.workerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                         </legend>

//                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
//                           {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                             <label key={responsibility} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
//                               <input
//                                 type="checkbox"
//                                 checked={!!(tradeData.leadForemanResponsibilities?.[responsibility] || false)}
//                                 onChange={handlePrimaryResponsibilityToggle(responsibility)}
//                               />
//                               <span style={{ fontSize: '14px', color: '#17263a' }}>{responsibility}</span>
//                             </label>
//                           ))}
//                         </div>
//                       </fieldset>
//                     )}
//                   </div>

//                   {/* Secondary Trade Section */}
//                   <div style={{ marginTop: 16 }}>
//                     <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//                       Secondary Trade
//                     </div>
//                     <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
//                       <SelectField
//                         label=""
//                         value={tradeData.secondaryTrade || ''}
//                         onChange={handleSecondaryTradeChange}
//                       >
//                         <option value="">Select Trade</option>
//                         {getSecondaryTradeOptions().map((trade) => (
//                           <option key={trade} value={trade}>
//                             {trade}
//                           </option>
//                         ))}
//                       </SelectField>

//                       {isSecondaryOther ? (
//                         <TextField
//                           label=""
//                           value={tradeData.secondaryOtherTrade || ''}
//                           onChange={(value) => handleChange('secondaryOtherTrade', value)}
//                           placeholder="Enter Secondary Trade"
//                         />
//                       ) : (
//                         <SelectField
//                           label=""
//                           value={tradeData.secondaryWorkerLevel || ''}
//                           disabled={!tradeData.secondaryTrade}
//                           onChange={handleSecondaryLevelChange}
//                         >
//                           <option value="">Select Worker Level</option>
//                           {secondaryWorkerLevels.map((level) => (
//                             <option key={level} value={level}>
//                               {level}
//                             </option>
//                           ))}
//                         </SelectField>
//                       )}

//                       <TextField
//                         label=""
//                         type="number"
//                         min="0"
//                         value={tradeData.secondaryYearOfExperience || ''}
//                         onChange={(value) => handleChange('secondaryYearOfExperience', value)}
//                         placeholder="Enter years"
//                       />
//                     </div>

//                     {/* Duplicate Validation Error */}
//                     {isDuplicate && (
//                       <div style={{
//                         marginTop: 8,
//                         padding: '10px 16px',
//                         background: '#fee2e2',
//                         border: '1px solid #fecaca',
//                         borderRadius: '8px',
//                         color: '#dc2626',
//                         fontSize: '13px',
//                         fontWeight: 500,
//                         display: 'flex',
//                         alignItems: 'center',
//                         gap: '8px'
//                       }}>
//                         <span style={{ fontSize: '18px' }}>⚠️</span>
//                         Secondary Trade and Level cannot be the same as Primary Trade and Level. Please select different values.
//                       </div>
//                     )}

//                     {/* Additional Skills/Tools/Systems */}
//                     <div style={{ marginTop: 16 }}>
//                       <div style={{ 
//                         fontSize: '14px', 
//                         fontWeight: 600, 
//                         color: '#17263a', 
//                         marginBottom: 8 
//                       }}>
//                         Additional Skills / Tools / Systems
//                       </div>
//                       <textarea
//                         value={tradeData.additionalSkillsTools || ''}
//                         onChange={(e) => handleChange('additionalSkillsTools', e.target.value)}
//                         placeholder="Enter additional skills, tools, or systems you have experience with..."
//                         rows={4}
//                         style={{
//                           width: '100%',
//                           padding: '12px 16px',
//                           border: '1px solid rgba(18, 38, 63, 0.12)',
//                           borderRadius: '12px',
//                           fontSize: '14px',
//                           fontFamily: 'inherit',
//                           resize: 'vertical',
//                           outline: 'none',
//                           transition: 'all 0.2s ease',
//                           background: 'white',
//                           color: '#17263a',
//                           minHeight: '100px',
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
//                         fontSize: '11px', 
//                         color: 'rgba(23, 38, 58, 0.5)', 
//                         marginTop: '4px',
//                         textAlign: 'right'
//                       }}>
//                         {tradeData.additionalSkillsTools?.length || 0} characters
//                       </div>
//                     </div>
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









// src/worker/pages/TradeProfileEditPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { SelectField, TextField } from '../../common/components/TextField'
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

// Trade Profile Constants
const TRADE_LEVEL_MAP = {
  'Metal Framing': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
  'Drywall Hanging': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
  'Taping/Finishing': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
  'Acoustical Ceilings': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
  'Interior Carpentry': ['Helper', 'Mechanic', 'Advanced Mechanic', 'Lead/Foreman'],
  'Helpers/Labourers': ['Helper', 'Lead Helper'],
  'Insulation': ['Helper', 'Mechanic', 'Lead'],
  'Demolition/Punch/Final Clean': ['Helper', 'Mechanic'],
  'Leads/Foremen': ['Lead/Foreman'],
  'Other': [],
}

const LEAD_FOREMAN_RESPONSIBILITIES = [
  'Crew size managed',
  'Manpower planning',
  'Daily planning',
  'Daily enforcement',
  'Housekeeping enforcement',
  'Daily reporting',
  'Punch closeout',
  'Coordination with superintendent',
]

// Helper functions for skills
const getTradeSkills = (trade) => {
  const skillMap = {
    'Metal Framing': [
      'Layout', 'Shaft walls', 'Partition types', 'Rated assemblies',
      'Stud/track gauge', 'Bulkheads/softits', 'Backing/blocking',
      'High-wall framing', 'MEP Coordination'
    ],
    'Drywall Hanging': [
      'Walls', 'Ceiling', 'Fire-rated board', 'Abuse board',
      'Shaft-wall board', 'High walls', 'Production hanging',
      'Lift work', 'Blueprint reading'
    ],
    'Taping/Finishing': [
      'Level 1-5 finish', 'Skim coat', 'Texture match',
      'Punch repair', 'Corner bead systems', 'Smooth finish'
    ],
    'Acoustical Ceilings': [
      'Standard grid', 'Tegular', 'Specialty ceilings',
      'Clouds/baffles', 'Seismic requirements',
      'Light/HVAC/sprinkler coordination'
    ],
    'Interior Carpentry': [
      'Backing', 'Blocking', 'Doors/frames/hardware support',
      'Trim/carpentry', 'Finish carpentry'
    ],
    'Helpers/Labourers': [
      'Material movement', 'Trade Assistance', 'Cleanup', 'Preparation work'
    ],
    'Insulation': [
      'Wall Insulation', 'Bat Insulation', 'Sound Insulation', 'Specialty Insulation'
    ],
    'Demolition/Punch/Final Clean': [
      'Demolition', 'Removal Support', 'Clean up', 'Punch work',
      'Final clean', 'Closeout Support'
    ],
  }
  return skillMap[trade] || []
}

const shouldShowTradeSkills = (level) => {
  if (level === 'Lead' || level === 'Lead/Foreman') return false
  return true
}

const isOtherTrade = (trade) => trade === 'Other'

const createInitialTradeRow = () => ({
  id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
  trade: '',
  otherTrade: '',
  level: '',
  experience: '',
  skills: {},
  responsibilities: {},
})

export function TradeProfileEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Load data from location state or fetch from server
  const [loading, setLoading] = useState(true)
  const [tradeData, setTradeData] = useState({})
  const [tradeRows, setTradeRows] = useState([])
  const [additionalSkillsTools, setAdditionalSkillsTools] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  // Load data from location state or server
  useEffect(() => {
    const loadData = async () => {
      try {
        // If data is in location state, use it
        if (location?.state?.tradeData) {
          const data = location.state.tradeData
          setTradeData(data)
          
          // Load trade rows from data
          if (data.tradeRows && data.tradeRows.length > 0) {
            setTradeRows(data.tradeRows)
          } else {
            // Fallback: convert primary/secondary to rows
            const rows = []
            if (data.primaryTrade) {
              rows.push({
                id: Date.now().toString() + '1',
                trade: data.primaryTrade,
                otherTrade: data.primaryOtherTrade || '',
                level: data.workerLevel || '',
                experience: data.yearOfExperience || '',
                skills: data.metalFramingSkills || data.drywallHangingSkills || 
                         data.tapingFinishingSkills || data.acousticalCeilingsSkills ||
                         data.interiorCarpentrySkills || data.helpersLabourersSkills ||
                         data.insulationSkills || data.demolitionSkills || {},
                responsibilities: data.leadForemanResponsibilities || {},
              })
            }
            if (data.secondaryTrade) {
              rows.push({
                id: Date.now().toString() + '2',
                trade: data.secondaryTrade,
                otherTrade: data.secondaryOtherTrade || '',
                level: data.secondaryWorkerLevel || '',
                experience: data.secondaryYearOfExperience || '',
                skills: data.secondaryMetalFramingSkills || data.secondaryDrywallHangingSkills || 
                         data.secondaryTapingFinishingSkills || data.secondaryAcousticalCeilingsSkills ||
                         data.secondaryInteriorCarpentrySkills || data.secondaryHelpersLabourersSkills ||
                         data.secondaryInsulationSkills || data.secondaryDemolitionSkills || {},
                responsibilities: data.secondaryLeadForemanResponsibilities || {},
              })
            }
            setTradeRows(rows.length > 0 ? rows : [createInitialTradeRow()])
          }
          
          setAdditionalSkillsTools(data.additionalSkillsTools || '')
          setLoading(false)
          return
        }

        // Otherwise fetch from server
        const userId = localStorage.getItem('userId')
        if (!userId) {
          setError('User ID not found')
          setLoading(false)
          return
        }

        const profile = await workerService.getWorkerProfile(userId)
        if (profile.success && profile.data?.trade) {
          const trade = profile.data.trade
          setTradeData(trade)
          
          // Load trade rows from server data
          if (trade.tradeRows && trade.tradeRows.length > 0) {
            // Add IDs to rows if they don't have them
            const rowsWithIds = trade.tradeRows.map((row, index) => ({
              ...row,
              id: row.id || Date.now().toString() + index,
            }))
            setTradeRows(rowsWithIds)
          } else {
            // Fallback: create rows from primary/secondary
            const rows = []
            if (trade.primaryTrade) {
              rows.push({
                id: Date.now().toString() + '1',
                trade: trade.primaryTrade,
                otherTrade: trade.primaryOtherTrade || '',
                level: trade.workerLevel || '',
                experience: trade.yearOfExperience || '',
                skills: trade.metalFramingSkills || trade.drywallHangingSkills || 
                         trade.tapingFinishingSkills || trade.acousticalCeilingsSkills ||
                         trade.interiorCarpentrySkills || trade.helpersLabourersSkills ||
                         trade.insulationSkills || trade.demolitionSkills || {},
                responsibilities: trade.leadForemanResponsibilities || {},
              })
            }
            if (trade.secondaryTrade) {
              rows.push({
                id: Date.now().toString() + '2',
                trade: trade.secondaryTrade,
                otherTrade: trade.secondaryOtherTrade || '',
                level: trade.secondaryWorkerLevel || '',
                experience: trade.secondaryYearOfExperience || '',
                skills: trade.secondaryMetalFramingSkills || trade.secondaryDrywallHangingSkills || 
                         trade.secondaryTapingFinishingSkills || trade.secondaryAcousticalCeilingsSkills ||
                         trade.secondaryInteriorCarpentrySkills || trade.secondaryHelpersLabourersSkills ||
                         trade.secondaryInsulationSkills || trade.secondaryDemolitionSkills || {},
                responsibilities: trade.secondaryLeadForemanResponsibilities || {},
              })
            }
            setTradeRows(rows.length > 0 ? rows : [createInitialTradeRow()])
          }
          
          setAdditionalSkillsTools(trade.additionalSkillsTools || '')
        } else {
          // Initialize with empty data
          setTradeRows([createInitialTradeRow()])
        }
      } catch (error) {
        console.error('Error loading trade data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [location?.state?.tradeData])

  // Handle trade row changes
  const handleTradeRowChange = (rowId, field, value) => {
    const updatedRows = tradeRows.map(row => {
      if (row.id === rowId) {
        if (field === 'trade') {
          return {
            ...row,
            trade: value,
            otherTrade: '',
            level: '',
            skills: {},
            responsibilities: {},
          }
        }
        return { ...row, [field]: value }
      }
      return row
    })
    setTradeRows(updatedRows)
  }

  // Handle skill toggle
  const handleSkillToggle = (rowId, skill) => (e) => {
    const updatedRows = tradeRows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          skills: {
            ...row.skills,
            [skill]: e.target.checked,
          }
        }
      }
      return row
    })
    setTradeRows(updatedRows)
  }

  // Handle responsibility toggle
  const handleResponsibilityToggle = (rowId, responsibility) => (e) => {
    const updatedRows = tradeRows.map(row => {
      if (row.id === rowId) {
        return {
          ...row,
          responsibilities: {
            ...row.responsibilities,
            [responsibility]: e.target.checked,
          }
        }
      }
      return row
    })
    setTradeRows(updatedRows)
  }

  // Add new trade row (max 40)
  const addTradeRow = () => {
    if (tradeRows.length < 40) {
      const newRow = createInitialTradeRow()
      setTradeRows([...tradeRows, newRow])
    }
  }

  // Remove trade row (min 1)
  const removeTradeRow = (rowId) => {
    if (tradeRows.length > 1) {
      setTradeRows(tradeRows.filter(row => row.id !== rowId))
    }
  }

  // Get all trade options
  const getTradeOptions = () => Object.keys(TRADE_LEVEL_MAP)

  // Get level options for a trade
  const getLevelOptions = (trade) => TRADE_LEVEL_MAP[trade] || []

  // Get skills for a trade
  const getSkills = (trade) => getTradeSkills(trade)

  // Check if level should show skills
  const shouldShowSkills = (level) => shouldShowTradeSkills(level)

  // Get responsibilities for Lead/Foreman
  const getResponsibilities = () => LEAD_FOREMAN_RESPONSIBILITIES

  // Save data
  const handleSave = async () => {
    setIsSaving(true)
    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        throw new Error('User ID not found')
      }

      // Prepare trade data for saving
      const tradeDataToSave = {
        tradeRows: tradeRows.map(row => ({
          trade: row.trade || '',
          otherTrade: row.otherTrade || '',
          level: row.level || '',
          experience: row.experience || '',
          skills: row.skills || {},
          responsibilities: row.responsibilities || {},
        })),
        additionalSkillsTools: additionalSkillsTools || '',
      }

      await workerService.updateTrade(userId, tradeDataToSave)
      
      navigate('/wizard/summary', { 
        state: { 
          ...location?.state?.parentData,
          trade: tradeDataToSave,
          updatedTrade: true 
        },
        replace: true 
      })
    } catch (error) {
      console.error('Error saving trade data:', error)
    } finally {
      setIsSaving(false)
    }
  }

  // ✅ FIXED: Pass parent data back when cancel/back is clicked
  const handleBack = () => {
    navigate('/wizard/summary', {
      state: location?.state?.parentData || {},
      replace: true
    })
  }

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
          <p style={{ color: '#17263a' }}>Loading trade profile...</p>
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
            
            {/* Sticky Header with Back button - Transparent background */}
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
                Edit Trade Profile
              </span>
            </div>

            {/* Scrollable Content Area */}
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
                <div style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#17263a',
                  marginBottom: '16px',
                  paddingBottom: '8px',
                  borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                }}>
                  Trade Profile & Skill Matrix
                </div>

                {/* Dynamic Trade Rows */}
                {tradeRows.map((row, index) => {
                  const isOther = row.trade === 'Other'
                  const levels = getLevelOptions(row.trade)
                  const skills = getSkills(row.trade)
                  const showSkills = row.trade && row.level && shouldShowSkills(row.level)
                  const showResponsibilities = row.trade && (row.level === 'Lead' || row.level === 'Lead/Foreman')
                  const responsibilities = getResponsibilities()
                  const rowNumber = index + 1

                  return (
                    <div key={row.id} style={{ 
                      marginBottom: index < tradeRows.length - 1 ? '32px' : '16px',
                      padding: '16px',
                      border: '1px solid rgba(18, 38, 63, 0.08)',
                      borderRadius: '12px',
                      background: index % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
                      position: 'relative'
                    }}>
                      {/* Row Header with Number and Delete Button */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '12px'
                      }}>
                        <div style={{
                          fontSize: '14px',
                          fontWeight: 600,
                          color: '#17263a',
                        }}>
                          Trade #{rowNumber}
                        </div>
                        {tradeRows.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeTradeRow(row.id)}
                            style={{
                              background: 'none',
                              border: 'none',
                              color: '#dc2626',
                              cursor: 'pointer',
                              fontSize: '14px',
                              padding: '4px 12px',
                              borderRadius: '6px',
                              transition: 'background 0.2s',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'rgba(220, 38, 38, 0.08)'
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent'
                            }}
                          >
                            ✕ Remove Trade
                          </button>
                        )}
                      </div>

                      {/* Trade Selection Row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                        <SelectField
                          label=""
                          value={row.trade || ''}
                          onChange={(value) => handleTradeRowChange(row.id, 'trade', value)}
                        >
                          <option value="">Select Trade</option>
                          {getTradeOptions().map((trade) => (
                            <option key={trade} value={trade}>
                              {trade}
                            </option>
                          ))}
                        </SelectField>

                        {isOther ? (
                          <TextField
                            label=""
                            value={row.otherTrade || ''}
                            onChange={(value) => handleTradeRowChange(row.id, 'otherTrade', value)}
                            placeholder="Enter Custom Trade"
                          />
                        ) : (
                          <SelectField
                            label=""
                            value={row.level || ''}
                            disabled={!row.trade}
                            onChange={(value) => handleTradeRowChange(row.id, 'level', value)}
                          >
                            <option value="">Select Worker Level</option>
                            {levels.map((level) => (
                              <option key={level} value={level}>
                                {level}
                              </option>
                            ))}
                          </SelectField>
                        )}

                        <TextField
                          label=""
                          type="number"
                          min="0"
                          value={row.experience || ''}
                          onChange={(value) => handleTradeRowChange(row.id, 'experience', value)}
                          placeholder="Enter years"
                        />
                      </div>

                      {/* Show custom trade input when "Other" is selected */}
                      {isOther && row.otherTrade && (
                        <div style={{
                          marginTop: 8,
                          fontSize: '13px',
                          color: '#0f4ea9',
                          fontWeight: 500,
                          padding: '8px 12px',
                          background: 'rgba(15, 78, 169, 0.05)',
                          borderRadius: '8px',
                          border: '1px solid rgba(15, 78, 169, 0.1)',
                        }}>
                          Custom Trade: {row.otherTrade}
                        </div>
                      )}

                      {/* Trade Skills */}
                      {showSkills && skills.length > 0 && (
                        <fieldset style={{
                          marginTop: 16,
                          padding: '16px 20px 20px 20px',
                          border: '1px solid rgba(15, 78, 169, 0.2)',
                          borderRadius: '12px',
                          background: 'rgba(15, 78, 169, 0.03)',
                          position: 'relative',
                        }}>
                          <legend style={{
                            padding: '0 12px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#0f4ea9',
                            background: 'white',
                            borderRadius: '8px',
                            marginLeft: '8px',
                          }}>
                            {row.trade} Skills ({row.level === 'Helper' ? 'H' : row.level === 'Mechanic' ? 'M' : 'A'})
                          </legend>
                          <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>
                            Skills for {row.trade} - {row.level} Level
                          </div>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
                            {skills.map((skill) => (
                              <label key={skill} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                  type="checkbox"
                                  checked={!!(row.skills?.[skill] || false)}
                                  onChange={handleSkillToggle(row.id, skill)}
                                />
                                <span style={{ fontSize: '14px', color: '#17263a' }}>{skill}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      )}

                      {/* Lead/Foreman Responsibilities */}
                      {showResponsibilities && (
                        <fieldset style={{
                          marginTop: 16,
                          padding: '16px 20px 20px 20px',
                          border: '1px solid rgba(15, 78, 169, 0.2)',
                          borderRadius: '12px',
                          background: 'rgba(15, 78, 169, 0.03)',
                          position: 'relative',
                        }}>
                          <legend style={{
                            padding: '0 12px',
                            fontSize: '14px',
                            fontWeight: 600,
                            color: '#0f4ea9',
                            background: 'white',
                            borderRadius: '8px',
                            marginLeft: '8px',
                          }}>
                            {row.level === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
                          </legend>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: 4 }}>
                            {responsibilities.map((responsibility) => (
                              <label key={responsibility} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                <input
                                  type="checkbox"
                                  checked={!!(row.responsibilities?.[responsibility] || false)}
                                  onChange={handleResponsibilityToggle(row.id, responsibility)}
                                />
                                <span style={{ fontSize: '14px', color: '#17263a' }}>{responsibility}</span>
                              </label>
                            ))}
                          </div>
                        </fieldset>
                      )}
                    </div>
                  )
                })}

                {/* Add Trade Button */}
                <div style={{ 
                  marginTop: '16px',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <button
                    type="button"
                    onClick={addTradeRow}
                    disabled={tradeRows.length >= 40}
                    style={{
                      padding: '10px 24px',
                      background: tradeRows.length >= 40 ? '#94a3b8' : 'rgba(15, 78, 169, 0.08)',
                      color: tradeRows.length >= 40 ? '#94a3b8' : '#0f4ea9',
                      border: `1px solid ${tradeRows.length >= 40 ? '#94a3b8' : 'rgba(15, 78, 169, 0.2)'}`,
                      borderRadius: '8px',
                      cursor: tradeRows.length >= 40 ? 'not-allowed' : 'pointer',
                      fontSize: '14px',
                      fontWeight: 500,
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      if (tradeRows.length < 40) {
                        e.currentTarget.style.background = 'rgba(15, 78, 169, 0.15)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (tradeRows.length < 40) {
                        e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'
                      }
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>+</span>
                    Add Trade {tradeRows.length >= 40 ? '(Max reached)' : `(${tradeRows.length}/40)`}
                  </button>
                </div>

                {/* Additional Skills/Tools/Systems Text Area */}
                <div style={{ marginTop: '24px' }}>
                  <div style={{ 
                    fontSize: '14px', 
                    fontWeight: 600, 
                    color: '#17263a', 
                    marginBottom: 8 
                  }}>
                    Additional Skills / Tools / Systems
                  </div>
                  <textarea
                    value={additionalSkillsTools || ''}
                    onChange={(e) => setAdditionalSkillsTools(e.target.value)}
                    placeholder="Enter additional skills, tools, or systems you have experience with..."
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid rgba(18, 38, 63, 0.12)',
                      borderRadius: '12px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                      background: 'white',
                      color: '#17263a',
                      minHeight: '100px',
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
                    fontSize: '11px', 
                    color: 'rgba(23, 38, 58, 0.5)', 
                    marginTop: '4px',
                    textAlign: 'right'
                  }}>
                    {additionalSkillsTools?.length || 0} characters
                  </div>
                </div>
              </div>
            </div>

            {/* Sticky Footer with Cancel and Save buttons - Transparent background */}
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