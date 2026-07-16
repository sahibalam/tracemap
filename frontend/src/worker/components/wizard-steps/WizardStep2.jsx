// // src/worker/components/wizard-steps/WizardStep2.jsx
// import { SelectField, TextField } from '../../../common/components/TextField'

// const TRADE_LEVEL_MAP = {
//   'Metal Framing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Drywall Hanging': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Taping/Finishing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Acoustical Ceilings': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Interior Carpentry': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Helpers/Labourers': [
//     'Helper',
//     'Lead Helper',
//   ],
//   'Insulation': [
//     'Helper',
//     'Mechanic',
//     'Lead',
//   ],
//   'Demolition/Punch/Final Clean': [
//     'Helper',
//     'Mechanic',
//   ],
//   'Leads/Foremen': [
//     'Lead/Foreman',
//   ],
// }

// // Lead/Foreman responsibilities (applies to both "Lead" and "Lead/Foreman")
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

// // Metal Framing Skills (applies to Helper, Mechanic, Advanced Mechanic)
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

// // Drywall Hanging Skills (applies to Helper, Mechanic, Advanced Mechanic)
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

// // Taping/Finishing Skills (applies to Helper, Mechanic, Advanced Mechanic)
// const TAPING_FINISHING_SKILLS = [
//   'Level 1-5 finish',
//   'Skim coat',
//   'Texture match',
//   'Punch repair',
//   'Corner bead systems',
//   'Smooth finish',
// ]

// // Acoustical Ceilings Skills (applies to Helper, Mechanic, Advanced Mechanic)
// const ACOUSTICAL_CEILINGS_SKILLS = [
//   'Standard grid',
//   'Tegular',
//   'Specialty ceilings',
//   'Clouds/baffles',
//   'Seismic requirements',
//   'Light/HVAC/sprinkler coordination',
// ]

// // Interior Carpentry Skills (applies to Helper, Mechanic, Advanced Mechanic)
// const INTERIOR_CARPENTRY_SKILLS = [
//   'Backing',
//   'Blocking',
//   'Doors/frames/hardware support',
//   'Trim/carpentry',
//   'Finish carpentry',
// ]

// // Helpers/Labourers Skills (applies to Helper, Lead Helper)
// const HELPERS_LABOURERS_SKILLS = [
//   'Material movement',
//   'Trade Assistance',
//   'Cleanup',
//   'Preparation work',
// ]

// // Insulation Skills (applies to Helper, Mechanic, Lead)
// const INSULATION_SKILLS = [
//   'Wall Insulation',
//   'Bat Insulation',
//   'Sound Insulation',
//   'Specialty Insulation',
// ]

// // Demolition/Punch/Final Clean Skills (applies to Helper, Mechanic)
// const DEMOLITION_SKILLS = [
//   'Demolition',
//   'Removal Support',
//   'Clean up',
//   'Punch work',
//   'Final clean',
//   'Closeout Support',
// ]

// export function WizardStep2({ data, onChange, onNext, onBack }) {
//   const handleChange = (field, value) => {
//     onChange({
//       ...data,
//       [field]: value,
//     })
//   }

//   const handleTradeChange = (value) => {
//     onChange({
//       ...data,
//       primaryTrade: value,
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
//     onChange({
//       ...data,
//       secondaryTrade: value,
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
//       ...data,
//       workerLevel: value,
//     }

//     // Reset responsibilities if not "Lead" or "Lead/Foreman"
//     if (value !== 'Lead' && value !== 'Lead/Foreman') {
//       updates.leadForemanResponsibilities = {}
//     }

//     // Reset metal framing skills if not Metal Framing trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.primaryTrade !== 'Metal Framing' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.metalFramingSkills = {}
//     }

//     // Reset drywall hanging skills if not Drywall Hanging trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.primaryTrade !== 'Drywall Hanging' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.drywallHangingSkills = {}
//     }

//     // Reset taping/finishing skills if not Taping/Finishing trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.primaryTrade !== 'Taping/Finishing' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.tapingFinishingSkills = {}
//     }

//     // Reset acoustical ceilings skills if not Acoustical Ceilings trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.primaryTrade !== 'Acoustical Ceilings' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.acousticalCeilingsSkills = {}
//     }

//     // Reset interior carpentry skills if not Interior Carpentry trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.primaryTrade !== 'Interior Carpentry' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.interiorCarpentrySkills = {}
//     }

//     // Reset helpers/labourers skills if not Helpers/Labourers trade or not Helper/Lead Helper
//     if (data.primaryTrade !== 'Helpers/Labourers' || 
//         (value !== 'Helper' && value !== 'Lead Helper')) {
//       updates.helpersLabourersSkills = {}
//     }

//     // Reset insulation skills if not Insulation trade or not Helper/Mechanic/Lead
//     if (data.primaryTrade !== 'Insulation' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Lead')) {
//       updates.insulationSkills = {}
//     }

//     // Reset demolition skills if not Demolition/Punch/Final Clean trade or not Helper/Mechanic
//     if (data.primaryTrade !== 'Demolition/Punch/Final Clean' || 
//         (value !== 'Helper' && value !== 'Mechanic')) {
//       updates.demolitionSkills = {}
//     }

//     onChange(updates)
//   }

//   const handleSecondaryLevelChange = (value) => {
//     const updates = {
//       ...data,
//       secondaryWorkerLevel: value,
//     }

//     // Reset secondary responsibilities if not "Lead" or "Lead/Foreman"
//     if (value !== 'Lead' && value !== 'Lead/Foreman') {
//       updates.secondaryLeadForemanResponsibilities = {}
//     }

//     // Reset secondary metal framing skills if not Metal Framing trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.secondaryTrade !== 'Metal Framing' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.secondaryMetalFramingSkills = {}
//     }

//     // Reset secondary drywall hanging skills if not Drywall Hanging trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.secondaryTrade !== 'Drywall Hanging' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.secondaryDrywallHangingSkills = {}
//     }

//     // Reset secondary taping/finishing skills if not Taping/Finishing trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.secondaryTrade !== 'Taping/Finishing' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.secondaryTapingFinishingSkills = {}
//     }

//     // Reset secondary acoustical ceilings skills if not Acoustical Ceilings trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.secondaryTrade !== 'Acoustical Ceilings' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.secondaryAcousticalCeilingsSkills = {}
//     }

//     // Reset secondary interior carpentry skills if not Interior Carpentry trade or not Helper/Mechanic/Advanced Mechanic
//     if (data.secondaryTrade !== 'Interior Carpentry' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Advanced Mechanic')) {
//       updates.secondaryInteriorCarpentrySkills = {}
//     }

//     // Reset secondary helpers/labourers skills if not Helpers/Labourers trade or not Helper/Lead Helper
//     if (data.secondaryTrade !== 'Helpers/Labourers' || 
//         (value !== 'Helper' && value !== 'Lead Helper')) {
//       updates.secondaryHelpersLabourersSkills = {}
//     }

//     // Reset secondary insulation skills if not Insulation trade or not Helper/Mechanic/Lead
//     if (data.secondaryTrade !== 'Insulation' || 
//         (value !== 'Helper' && value !== 'Mechanic' && value !== 'Lead')) {
//       updates.secondaryInsulationSkills = {}
//     }

//     // Reset secondary demolition skills if not Demolition/Punch/Final Clean trade or not Helper/Mechanic
//     if (data.secondaryTrade !== 'Demolition/Punch/Final Clean' || 
//         (value !== 'Helper' && value !== 'Mechanic')) {
//       updates.secondaryDemolitionSkills = {}
//     }

//     onChange(updates)
//   }

//   const handleResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.leadForemanResponsibilities || {}
//     handleChange('leadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handleSecondaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.secondaryLeadForemanResponsibilities || {}
//     handleChange('secondaryLeadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handleMetalFramingSkillToggle = (skill) => (e) => {
//     const current = data.metalFramingSkills || {}
//     handleChange('metalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryMetalFramingSkillToggle = (skill) => (e) => {
//     const current = data.secondaryMetalFramingSkills || {}
//     handleChange('secondaryMetalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleDrywallHangingSkillToggle = (skill) => (e) => {
//     const current = data.drywallHangingSkills || {}
//     handleChange('drywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDrywallHangingSkillToggle = (skill) => (e) => {
//     const current = data.secondaryDrywallHangingSkills || {}
//     handleChange('secondaryDrywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleTapingFinishingSkillToggle = (skill) => (e) => {
//     const current = data.tapingFinishingSkills || {}
//     handleChange('tapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryTapingFinishingSkillToggle = (skill) => (e) => {
//     const current = data.secondaryTapingFinishingSkills || {}
//     handleChange('secondaryTapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleAcousticalCeilingsSkillToggle = (skill) => (e) => {
//     const current = data.acousticalCeilingsSkills || {}
//     handleChange('acousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryAcousticalCeilingsSkillToggle = (skill) => (e) => {
//     const current = data.secondaryAcousticalCeilingsSkills || {}
//     handleChange('secondaryAcousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleInteriorCarpentrySkillToggle = (skill) => (e) => {
//     const current = data.interiorCarpentrySkills || {}
//     handleChange('interiorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInteriorCarpentrySkillToggle = (skill) => (e) => {
//     const current = data.secondaryInteriorCarpentrySkills || {}
//     handleChange('secondaryInteriorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleHelpersLabourersSkillToggle = (skill) => (e) => {
//     const current = data.helpersLabourersSkills || {}
//     handleChange('helpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryHelpersLabourersSkillToggle = (skill) => (e) => {
//     const current = data.secondaryHelpersLabourersSkills || {}
//     handleChange('secondaryHelpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleInsulationSkillToggle = (skill) => (e) => {
//     const current = data.insulationSkills || {}
//     handleChange('insulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInsulationSkillToggle = (skill) => (e) => {
//     const current = data.secondaryInsulationSkills || {}
//     handleChange('secondaryInsulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleDemolitionSkillToggle = (skill) => (e) => {
//     const current = data.demolitionSkills || {}
//     handleChange('demolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDemolitionSkillToggle = (skill) => (e) => {
//     const current = data.secondaryDemolitionSkills || {}
//     handleChange('secondaryDemolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const workerLevels = TRADE_LEVEL_MAP[data.primaryTrade] || []
//   const secondaryWorkerLevels = TRADE_LEVEL_MAP[data.secondaryTrade] || []
  
//   // Check if secondary trade and level match primary trade and level
//   const isDuplicate = data.primaryTrade && data.secondaryTrade && 
//                       data.workerLevel && data.secondaryWorkerLevel &&
//                       data.primaryTrade === data.secondaryTrade && 
//                       data.workerLevel === data.secondaryWorkerLevel

//   // Show responsibilities for both "Lead" AND "Lead/Foreman"
//   const showLeadForemanSection = data.workerLevel === 'Lead' || data.workerLevel === 'Lead/Foreman'
//   const showSecondaryLeadForemanSection = data.secondaryWorkerLevel === 'Lead' || data.secondaryWorkerLevel === 'Lead/Foreman'
  
//   // Show Metal Framing skills when:
//   // 1. Primary Trade is "Metal Framing"
//   // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
//   const showMetalFramingSection = 
//     data.primaryTrade === 'Metal Framing' && 
//     (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

//   const showSecondaryMetalFramingSection = 
//     data.secondaryTrade === 'Metal Framing' && 
//     (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

//   // Show Drywall Hanging skills when:
//   // 1. Primary Trade is "Drywall Hanging"
//   // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
//   const showDrywallHangingSection = 
//     data.primaryTrade === 'Drywall Hanging' && 
//     (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

//   const showSecondaryDrywallHangingSection = 
//     data.secondaryTrade === 'Drywall Hanging' && 
//     (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

//   // Show Taping/Finishing skills when:
//   // 1. Primary Trade is "Taping/Finishing"
//   // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
//   const showTapingFinishingSection = 
//     data.primaryTrade === 'Taping/Finishing' && 
//     (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

//   const showSecondaryTapingFinishingSection = 
//     data.secondaryTrade === 'Taping/Finishing' && 
//     (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

//   // Show Acoustical Ceilings skills when:
//   // 1. Primary Trade is "Acoustical Ceilings"
//   // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
//   const showAcousticalCeilingsSection = 
//     data.primaryTrade === 'Acoustical Ceilings' && 
//     (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

//   const showSecondaryAcousticalCeilingsSection = 
//     data.secondaryTrade === 'Acoustical Ceilings' && 
//     (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

//   // Show Interior Carpentry skills when:
//   // 1. Primary Trade is "Interior Carpentry"
//   // 2. Worker Level is "Helper", "Mechanic", or "Advanced Mechanic"
//   const showInteriorCarpentrySection = 
//     data.primaryTrade === 'Interior Carpentry' && 
//     (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic')

//   const showSecondaryInteriorCarpentrySection = 
//     data.secondaryTrade === 'Interior Carpentry' && 
//     (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic')

//   // Show Helpers/Labourers skills when:
//   // 1. Primary Trade is "Helpers/Labourers"
//   // 2. Worker Level is "Helper" or "Lead Helper"
//   const showHelpersLabourersSection = 
//     data.primaryTrade === 'Helpers/Labourers' && 
//     (data.workerLevel === 'Helper' || data.workerLevel === 'Lead Helper')

//   const showSecondaryHelpersLabourersSection = 
//     data.secondaryTrade === 'Helpers/Labourers' && 
//     (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Lead Helper')

//   // Show Insulation skills when:
//   // 1. Primary Trade is "Insulation"
//   // 2. Worker Level is "Helper", "Mechanic", or "Lead"
//   const showInsulationSection = 
//     data.primaryTrade === 'Insulation' && 
//     (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Lead')

//   const showSecondaryInsulationSection = 
//     data.secondaryTrade === 'Insulation' && 
//     (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Lead')

//   // Show Demolition skills when:
//   // 1. Primary Trade is "Demolition/Punch/Final Clean"
//   // 2. Worker Level is "Helper" or "Mechanic"
//   const showDemolitionSection = 
//     data.primaryTrade === 'Demolition/Punch/Final Clean' && 
//     (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic')

//   const showSecondaryDemolitionSection = 
//     data.secondaryTrade === 'Demolition/Punch/Final Clean' && 
//     (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic')

//   // Get the level abbreviation for display
//   const getLevelAbbreviation = (level) => {
//     switch(level) {
//       case 'Helper': return 'H'
//       case 'Mechanic': return 'M'
//       case 'Advanced Mechanic': return 'A'
//       case 'Lead Helper': return 'LH'
//       case 'Lead': return 'L'
//       default: return ''
//     }
//   }

//   // Get the legend title based on trade and level
//   const getLegendTitle = (trade, level) => {
//     const abbr = getLevelAbbreviation(level)
//     return `${trade} (${abbr})`
//   }

//   // Get all trade options for secondary (excluding the primary trade)
//   const getSecondaryTradeOptions = () => {
//     return Object.keys(TRADE_LEVEL_MAP).filter(trade => trade !== data.primaryTrade)
//   }

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Trade Profile & Skill Matrix</div>

//           {/* Primary Trade Row */}
//           <div style={{ marginBottom: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Primary Trade
//             </div>
//             <div className="wizardGrid3">
//               {/* Primary Trade */}
//               <SelectField
//                 label=""
//                 value={data.primaryTrade || ''}
//                 onChange={handleTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {Object.keys(TRADE_LEVEL_MAP).map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               {/* Worker Level */}
//               <SelectField
//                 label=""
//                 value={data.workerLevel || ''}
//                 disabled={!data.primaryTrade}
//                 onChange={handleLevelChange}
//               >
//                 <option value="">Select Worker Level</option>
//                 {workerLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </SelectField>

//               {/* Year of Experience */}
//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.yearOfExperience || ''}
//                 onChange={(value) => handleChange('yearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>
//           </div>

//           {/* Secondary Trade Row */}
//           <div style={{ marginTop: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Secondary Trade
//             </div>
//             <div className="wizardGrid3">
//               {/* Secondary Trade */}
//               <SelectField
//                 label=""
//                 value={data.secondaryTrade || ''}
//                 onChange={handleSecondaryTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {getSecondaryTradeOptions().map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               {/* Secondary Worker Level */}
//               <SelectField
//                 label=""
//                 value={data.secondaryWorkerLevel || ''}
//                 disabled={!data.secondaryTrade}
//                 onChange={handleSecondaryLevelChange}
//               >
//                 <option value="">Select Worker Level</option>
//                 {secondaryWorkerLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </SelectField>

//               {/* Secondary Year of Experience */}
//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.secondaryYearOfExperience || ''}
//                 onChange={(value) => handleChange('secondaryYearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>

//             {/* Duplicate Validation Error */}
//             {isDuplicate && (
//               <div style={{
//                 marginTop: 8,
//                 padding: '10px 16px',
//                 background: '#fee2e2',
//                 border: '1px solid #fecaca',
//                 borderRadius: '8px',
//                 color: '#dc2626',
//                 fontSize: '13px',
//                 fontWeight: 500,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}>
//                 <span style={{ fontSize: '18px' }}>⚠️</span>
//                 Secondary Trade and Level cannot be the same as Primary Trade and Level. Please select different values.
//               </div>
//             )}
//           </div>

//           {/* Primary Trade Legend Fields */}
//           {!isDuplicate && (
//             <>
//               {/* Metal Framing Skills - Legend Field Format */}
//               {showMetalFramingSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.primaryTrade, data.workerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {METAL_FRAMING_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.metalFramingSkills?.[skill] || false)}
//                           onChange={handleMetalFramingSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Drywall Hanging Skills - Legend Field Format */}
//               {showDrywallHangingSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.primaryTrade, data.workerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {DRYWALL_HANGING_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.drywallHangingSkills?.[skill] || false)}
//                           onChange={handleDrywallHangingSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Taping/Finishing Skills - Legend Field Format */}
//               {showTapingFinishingSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.primaryTrade, data.workerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {TAPING_FINISHING_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.tapingFinishingSkills?.[skill] || false)}
//                           onChange={handleTapingFinishingSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Acoustical Ceilings Skills - Legend Field Format */}
//               {showAcousticalCeilingsSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.primaryTrade, data.workerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.acousticalCeilingsSkills?.[skill] || false)}
//                           onChange={handleAcousticalCeilingsSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Interior Carpentry Skills - Legend Field Format */}
//               {showInteriorCarpentrySection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.primaryTrade, data.workerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.interiorCarpentrySkills?.[skill] || false)}
//                           onChange={handleInteriorCarpentrySkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Helpers/Labourers Skills - Legend Field Format */}
//               {showHelpersLabourersSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.primaryTrade, data.workerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.helpersLabourersSkills?.[skill] || false)}
//                           onChange={handleHelpersLabourersSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Insulation Skills - Legend Field Format */}
//               {showInsulationSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.primaryTrade, data.workerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {INSULATION_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.insulationSkills?.[skill] || false)}
//                           onChange={handleInsulationSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Demolition/Punch/Final Clean Skills - Legend Field Format */}
//               {showDemolitionSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.primaryTrade, data.workerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {DEMOLITION_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.demolitionSkills?.[skill] || false)}
//                           onChange={handleDemolitionSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Lead/Foreman Responsibilities - Legend Field Format */}
//               {showLeadForemanSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {data.workerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                   </legend>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                       <label key={responsibility} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.leadForemanResponsibilities?.[responsibility] || false)}
//                           onChange={handleResponsibilityToggle(responsibility)}
//                         />
//                         {responsibility}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}
//             </>
//           )}

//           {/* Secondary Trade Legend Fields */}
//           {!isDuplicate && data.secondaryTrade && (
//             <>
//               {/* Secondary Metal Framing Skills */}
//               {showSecondaryMetalFramingSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {METAL_FRAMING_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.secondaryMetalFramingSkills?.[skill] || false)}
//                           onChange={handleSecondaryMetalFramingSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Secondary Drywall Hanging Skills */}
//               {showSecondaryDrywallHangingSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {DRYWALL_HANGING_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.secondaryDrywallHangingSkills?.[skill] || false)}
//                           onChange={handleSecondaryDrywallHangingSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Secondary Taping/Finishing Skills */}
//               {showSecondaryTapingFinishingSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {TAPING_FINISHING_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.secondaryTapingFinishingSkills?.[skill] || false)}
//                           onChange={handleSecondaryTapingFinishingSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Secondary Acoustical Ceilings Skills */}
//               {showSecondaryAcousticalCeilingsSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.secondaryAcousticalCeilingsSkills?.[skill] || false)}
//                           onChange={handleSecondaryAcousticalCeilingsSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Secondary Interior Carpentry Skills */}
//               {showSecondaryInteriorCarpentrySection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.secondaryInteriorCarpentrySkills?.[skill] || false)}
//                           onChange={handleSecondaryInteriorCarpentrySkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Secondary Helpers/Labourers Skills */}
//               {showSecondaryHelpersLabourersSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.secondaryHelpersLabourersSkills?.[skill] || false)}
//                           onChange={handleSecondaryHelpersLabourersSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Secondary Insulation Skills */}
//               {showSecondaryInsulationSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {INSULATION_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.secondaryInsulationSkills?.[skill] || false)}
//                           onChange={handleSecondaryInsulationSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Secondary Demolition Skills */}
//               {showSecondaryDemolitionSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {getLegendTitle(data.secondaryTrade, data.secondaryWorkerLevel)}
//                   </legend>

//                   <div style={{ 
//                     fontSize: '12px', 
//                     color: 'rgba(23, 38, 58, 0.5)', 
//                     marginBottom: 12,
//                     marginTop: 4,
//                     fontWeight: 500,
//                   }}>
//                     Skills
//                   </div>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {DEMOLITION_SKILLS.map((skill) => (
//                       <label key={skill} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.secondaryDemolitionSkills?.[skill] || false)}
//                           onChange={handleSecondaryDemolitionSkillToggle(skill)}
//                         />
//                         {skill}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}

//               {/* Secondary Lead/Foreman Responsibilities */}
//               {showSecondaryLeadForemanSection && (
//                 <fieldset style={{
//                   marginTop: 24,
//                   padding: '16px 20px 20px 20px',
//                   border: '1px solid rgba(15, 78, 169, 0.2)',
//                   borderRadius: '12px',
//                   background: 'rgba(15, 78, 169, 0.03)',
//                   position: 'relative',
//                 }}>
//                   <legend style={{
//                     padding: '0 12px',
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#0f4ea9',
//                     background: 'white',
//                     borderRadius: '8px',
//                     marginLeft: '8px',
//                   }}>
//                     {data.secondaryWorkerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                   </legend>

//                   <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                     {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                       <label key={responsibility} className="wizardCheck">
//                         <input
//                           type="checkbox"
//                           checked={!!(data.secondaryLeadForemanResponsibilities?.[responsibility] || false)}
//                           onChange={handleSecondaryResponsibilityToggle(responsibility)}
//                         />
//                         {responsibility}
//                       </label>
//                     ))}
//                   </div>
//                 </fieldset>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       <div className="wizardFooter">
//         <button type="button" className="wizardPillBtn" onClick={onBack}>
//           <span className="wizardPillBtnLabel">Back</span>
//           <span className="wizardPillBtnIcon">←</span>
//         </button>

//         <div className="wizardFooterRight">
//           <button
//             type="button"
//             className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext"
//             onClick={onNext}
//             disabled={isDuplicate}
//           >
//             <span className="wizardPillBtnLabel">Next</span>
//             <span className="wizardPillBtnIcon">→</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// // src/worker/components/wizard-steps/WizardStep2.jsx
// import { SelectField, TextField } from '../../../common/components/TextField'

// const TRADE_LEVEL_MAP = {
//   'Metal Framing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Drywall Hanging': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Taping/Finishing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Acoustical Ceilings': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Interior Carpentry': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Helpers/Labourers': [
//     'Helper',
//     'Lead Helper',
//   ],
//   'Insulation': [
//     'Helper',
//     'Mechanic',
//     'Lead',
//   ],
//   'Demolition/Punch/Final Clean': [
//     'Helper',
//     'Mechanic',
//   ],
//   'Leads/Foremen': [
//     'Lead/Foreman',
//   ],
// }

// // Lead/Foreman responsibilities (applies to both "Lead" and "Lead/Foreman")
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

// // Metal Framing Skills
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

// // Drywall Hanging Skills
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

// // Taping/Finishing Skills
// const TAPING_FINISHING_SKILLS = [
//   'Level 1-5 finish',
//   'Skim coat',
//   'Texture match',
//   'Punch repair',
//   'Corner bead systems',
//   'Smooth finish',
// ]

// // Acoustical Ceilings Skills
// const ACOUSTICAL_CEILINGS_SKILLS = [
//   'Standard grid',
//   'Tegular',
//   'Specialty ceilings',
//   'Clouds/baffles',
//   'Seismic requirements',
//   'Light/HVAC/sprinkler coordination',
// ]

// // Interior Carpentry Skills
// const INTERIOR_CARPENTRY_SKILLS = [
//   'Backing',
//   'Blocking',
//   'Doors/frames/hardware support',
//   'Trim/carpentry',
//   'Finish carpentry',
// ]

// // Helpers/Labourers Skills
// const HELPERS_LABOURERS_SKILLS = [
//   'Material movement',
//   'Trade Assistance',
//   'Cleanup',
//   'Preparation work',
// ]

// // Insulation Skills
// const INSULATION_SKILLS = [
//   'Wall Insulation',
//   'Bat Insulation',
//   'Sound Insulation',
//   'Specialty Insulation',
// ]

// // Demolition/Punch/Final Clean Skills
// const DEMOLITION_SKILLS = [
//   'Demolition',
//   'Removal Support',
//   'Clean up',
//   'Punch work',
//   'Final clean',
//   'Closeout Support',
// ]

// export function WizardStep2({ data, onChange, onNext, onBack }) {
//   const handleChange = (field, value) => {
//     onChange({
//       ...data,
//       [field]: value,
//     })
//   }

//   const handleTradeChange = (value) => {
//     onChange({
//       ...data,
//       primaryTrade: value,
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
//     onChange({
//       ...data,
//       secondaryTrade: value,
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
//       ...data,
//       workerLevel: value,
//     }

//     // Reset all primary skill data when level changes
//     updates.leadForemanResponsibilities = {}
//     updates.metalFramingSkills = {}
//     updates.drywallHangingSkills = {}
//     updates.tapingFinishingSkills = {}
//     updates.acousticalCeilingsSkills = {}
//     updates.interiorCarpentrySkills = {}
//     updates.helpersLabourersSkills = {}
//     updates.insulationSkills = {}
//     updates.demolitionSkills = {}

//     onChange(updates)
//   }

//   const handleSecondaryLevelChange = (value) => {
//     const updates = {
//       ...data,
//       secondaryWorkerLevel: value,
//     }

//     // Reset all secondary skill data when level changes
//     updates.secondaryLeadForemanResponsibilities = {}
//     updates.secondaryMetalFramingSkills = {}
//     updates.secondaryDrywallHangingSkills = {}
//     updates.secondaryTapingFinishingSkills = {}
//     updates.secondaryAcousticalCeilingsSkills = {}
//     updates.secondaryInteriorCarpentrySkills = {}
//     updates.secondaryHelpersLabourersSkills = {}
//     updates.secondaryInsulationSkills = {}
//     updates.secondaryDemolitionSkills = {}

//     onChange(updates)
//   }

//   // Helper function to check if a level should show trade skills
//   const shouldShowTradeSkills = (level) => {
//     // Don't show trade skills for Lead or Lead/Foreman
//     if (level === 'Lead' || level === 'Lead/Foreman') {
//       return false
//     }
//     return true
//   }

//   // Primary toggle handlers
//   const handlePrimaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.leadForemanResponsibilities || {}
//     handleChange('leadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handlePrimaryMetalFramingToggle = (skill) => (e) => {
//     const current = data.metalFramingSkills || {}
//     handleChange('metalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDrywallHangingToggle = (skill) => (e) => {
//     const current = data.drywallHangingSkills || {}
//     handleChange('drywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryTapingFinishingToggle = (skill) => (e) => {
//     const current = data.tapingFinishingSkills || {}
//     handleChange('tapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = data.acousticalCeilingsSkills || {}
//     handleChange('acousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = data.interiorCarpentrySkills || {}
//     handleChange('interiorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = data.helpersLabourersSkills || {}
//     handleChange('helpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInsulationToggle = (skill) => (e) => {
//     const current = data.insulationSkills || {}
//     handleChange('insulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDemolitionToggle = (skill) => (e) => {
//     const current = data.demolitionSkills || {}
//     handleChange('demolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   // Secondary toggle handlers
//   const handleSecondaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.secondaryLeadForemanResponsibilities || {}
//     handleChange('secondaryLeadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handleSecondaryMetalFramingToggle = (skill) => (e) => {
//     const current = data.secondaryMetalFramingSkills || {}
//     handleChange('secondaryMetalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDrywallHangingToggle = (skill) => (e) => {
//     const current = data.secondaryDrywallHangingSkills || {}
//     handleChange('secondaryDrywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryTapingFinishingToggle = (skill) => (e) => {
//     const current = data.secondaryTapingFinishingSkills || {}
//     handleChange('secondaryTapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = data.secondaryAcousticalCeilingsSkills || {}
//     handleChange('secondaryAcousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = data.secondaryInteriorCarpentrySkills || {}
//     handleChange('secondaryInteriorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = data.secondaryHelpersLabourersSkills || {}
//     handleChange('secondaryHelpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInsulationToggle = (skill) => (e) => {
//     const current = data.secondaryInsulationSkills || {}
//     handleChange('secondaryInsulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDemolitionToggle = (skill) => (e) => {
//     const current = data.secondaryDemolitionSkills || {}
//     handleChange('secondaryDemolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const workerLevels = TRADE_LEVEL_MAP[data.primaryTrade] || []
//   const secondaryWorkerLevels = TRADE_LEVEL_MAP[data.secondaryTrade] || []
  
//   // Check if secondary trade and level match primary trade and level
//   const isDuplicate = data.primaryTrade && data.secondaryTrade && 
//                       data.workerLevel && data.secondaryWorkerLevel &&
//                       data.primaryTrade === data.secondaryTrade && 
//                       data.workerLevel === data.secondaryWorkerLevel

//   // Get all trade options for secondary (including primary trade)
//   const getSecondaryTradeOptions = () => {
//     return Object.keys(TRADE_LEVEL_MAP)
//   }

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Trade Profile & Skill Matrix</div>

//           {/* Primary Trade Section */}
//           <div style={{ marginBottom: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Primary Trade
//             </div>
//             <div className="wizardGrid3">
//               <SelectField
//                 label=""
//                 value={data.primaryTrade || ''}
//                 onChange={handleTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {Object.keys(TRADE_LEVEL_MAP).map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               <SelectField
//                 label=""
//                 value={data.workerLevel || ''}
//                 disabled={!data.primaryTrade}
//                 onChange={handleLevelChange}
//               >
//                 <option value="">Select Worker Level</option>
//                 {workerLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </SelectField>

//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.yearOfExperience || ''}
//                 onChange={(value) => handleChange('yearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>

//             {/* Primary Trade Skills - Only show if not Lead/Lead-Foreman */}
//             {!isDuplicate && data.primaryTrade && data.workerLevel && shouldShowTradeSkills(data.workerLevel) && (
//               <>
//                 {/* Metal Framing Skills */}
//                 {data.primaryTrade === 'Metal Framing' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Metal Framing ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {METAL_FRAMING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.metalFramingSkills?.[skill] || false)}
//                             onChange={handlePrimaryMetalFramingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Drywall Hanging Skills */}
//                 {data.primaryTrade === 'Drywall Hanging' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Drywall Hanging ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DRYWALL_HANGING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.drywallHangingSkills?.[skill] || false)}
//                             onChange={handlePrimaryDrywallHangingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Taping/Finishing Skills */}
//                 {data.primaryTrade === 'Taping/Finishing' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Taping/Finishing ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {TAPING_FINISHING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.tapingFinishingSkills?.[skill] || false)}
//                             onChange={handlePrimaryTapingFinishingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Acoustical Ceilings Skills */}
//                 {data.primaryTrade === 'Acoustical Ceilings' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Acoustical Ceilings ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.acousticalCeilingsSkills?.[skill] || false)}
//                             onChange={handlePrimaryAcousticalCeilingsToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Interior Carpentry Skills */}
//                 {data.primaryTrade === 'Interior Carpentry' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Interior Carpentry ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.interiorCarpentrySkills?.[skill] || false)}
//                             onChange={handlePrimaryInteriorCarpentryToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Helpers/Labourers Skills */}
//                 {data.primaryTrade === 'Helpers/Labourers' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Lead Helper') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Helpers/Labourers ({data.workerLevel === 'Helper' ? 'H' : 'LH'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.helpersLabourersSkills?.[skill] || false)}
//                             onChange={handlePrimaryHelpersLabourersToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Insulation Skills - Only for Helper and Mechanic (not Lead) */}
//                 {data.primaryTrade === 'Insulation' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Insulation ({data.workerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INSULATION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.insulationSkills?.[skill] || false)}
//                             onChange={handlePrimaryInsulationToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Demolition/Punch/Final Clean Skills */}
//                 {data.primaryTrade === 'Demolition/Punch/Final Clean' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Demolition/Punch/Final Clean ({data.workerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DEMOLITION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.demolitionSkills?.[skill] || false)}
//                             onChange={handlePrimaryDemolitionToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </>
//             )}

//             {/* Lead/Foreman Responsibilities - Always show for Lead/Lead-Foreman regardless of trade */}
//             {(data.workerLevel === 'Lead' || data.workerLevel === 'Lead/Foreman') && (
//               <fieldset style={{
//                 marginTop: 16,
//                 padding: '16px 20px 20px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '12px',
//                 background: 'rgba(15, 78, 169, 0.03)',
//                 position: 'relative',
//               }}>
//                 <legend style={{
//                   padding: '0 12px',
//                   fontSize: '14px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   background: 'white',
//                   borderRadius: '8px',
//                   marginLeft: '8px',
//                 }}>
//                   {data.workerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                 </legend>

//                 <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                   {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                     <label key={responsibility} className="wizardCheck">
//                       <input
//                         type="checkbox"
//                         checked={!!(data.leadForemanResponsibilities?.[responsibility] || false)}
//                         onChange={handlePrimaryResponsibilityToggle(responsibility)}
//                       />
//                       {responsibility}
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             )}
//           </div>

//           {/* Secondary Trade Section */}
//           <div style={{ marginTop: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Secondary Trade
//             </div>
//             <div className="wizardGrid3">
//               <SelectField
//                 label=""
//                 value={data.secondaryTrade || ''}
//                 onChange={handleSecondaryTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {getSecondaryTradeOptions().map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               <SelectField
//                 label=""
//                 value={data.secondaryWorkerLevel || ''}
//                 disabled={!data.secondaryTrade}
//                 onChange={handleSecondaryLevelChange}
//               >
//                 <option value="">Select Worker Level</option>
//                 {secondaryWorkerLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </SelectField>

//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.secondaryYearOfExperience || ''}
//                 onChange={(value) => handleChange('secondaryYearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>

//             {/* Duplicate Validation Error */}
//             {isDuplicate && (
//               <div style={{
//                 marginTop: 8,
//                 padding: '10px 16px',
//                 background: '#fee2e2',
//                 border: '1px solid #fecaca',
//                 borderRadius: '8px',
//                 color: '#dc2626',
//                 fontSize: '13px',
//                 fontWeight: 500,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}>
//                 <span style={{ fontSize: '18px' }}>⚠️</span>
//                 Secondary Trade and Level cannot be the same as Primary Trade and Level. Please select different values.
//               </div>
//             )}

//             {/* Secondary Trade Skills - Only show if not Lead/Lead-Foreman */}
//             {!isDuplicate && data.secondaryTrade && data.secondaryWorkerLevel && shouldShowTradeSkills(data.secondaryWorkerLevel) && (
//               <>
//                 {/* Secondary Metal Framing Skills */}
//                 {data.secondaryTrade === 'Metal Framing' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Metal Framing ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {METAL_FRAMING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryMetalFramingSkills?.[skill] || false)}
//                             onChange={handleSecondaryMetalFramingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Drywall Hanging Skills */}
//                 {data.secondaryTrade === 'Drywall Hanging' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Drywall Hanging ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DRYWALL_HANGING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryDrywallHangingSkills?.[skill] || false)}
//                             onChange={handleSecondaryDrywallHangingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Taping/Finishing Skills */}
//                 {data.secondaryTrade === 'Taping/Finishing' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Taping/Finishing ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {TAPING_FINISHING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryTapingFinishingSkills?.[skill] || false)}
//                             onChange={handleSecondaryTapingFinishingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Acoustical Ceilings Skills */}
//                 {data.secondaryTrade === 'Acoustical Ceilings' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Acoustical Ceilings ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryAcousticalCeilingsSkills?.[skill] || false)}
//                             onChange={handleSecondaryAcousticalCeilingsToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Interior Carpentry Skills */}
//                 {data.secondaryTrade === 'Interior Carpentry' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Interior Carpentry ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryInteriorCarpentrySkills?.[skill] || false)}
//                             onChange={handleSecondaryInteriorCarpentryToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Helpers/Labourers Skills */}
//                 {data.secondaryTrade === 'Helpers/Labourers' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Lead Helper') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Helpers/Labourers ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'LH'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryHelpersLabourersSkills?.[skill] || false)}
//                             onChange={handleSecondaryHelpersLabourersToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Insulation Skills - Only for Helper and Mechanic (not Lead) */}
//                 {data.secondaryTrade === 'Insulation' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Insulation ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INSULATION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryInsulationSkills?.[skill] || false)}
//                             onChange={handleSecondaryInsulationToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Demolition/Punch/Final Clean Skills */}
//                 {data.secondaryTrade === 'Demolition/Punch/Final Clean' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Demolition/Punch/Final Clean ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DEMOLITION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryDemolitionSkills?.[skill] || false)}
//                             onChange={handleSecondaryDemolitionToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </>
//             )}

//             {/* Secondary Lead/Foreman Responsibilities - Always show for Lead/Lead-Foreman regardless of trade */}
//             {(data.secondaryWorkerLevel === 'Lead' || data.secondaryWorkerLevel === 'Lead/Foreman') && (
//               <fieldset style={{
//                 marginTop: 16,
//                 padding: '16px 20px 20px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '12px',
//                 background: 'rgba(15, 78, 169, 0.03)',
//                 position: 'relative',
//               }}>
//                 <legend style={{
//                   padding: '0 12px',
//                   fontSize: '14px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   background: 'white',
//                   borderRadius: '8px',
//                   marginLeft: '8px',
//                 }}>
//                   {data.secondaryWorkerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                 </legend>

//                 <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                   {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                     <label key={responsibility} className="wizardCheck">
//                       <input
//                         type="checkbox"
//                         checked={!!(data.secondaryLeadForemanResponsibilities?.[responsibility] || false)}
//                         onChange={handleSecondaryResponsibilityToggle(responsibility)}
//                       />
//                       {responsibility}
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="wizardFooter">
//         <button type="button" className="wizardPillBtn" onClick={onBack}>
//           <span className="wizardPillBtnLabel">Back</span>
//           <span className="wizardPillBtnIcon">←</span>
//         </button>

//         <div className="wizardFooterRight">
//           <button
//             type="button"
//             className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext"
//             onClick={onNext}
//             disabled={isDuplicate}
//           >
//             <span className="wizardPillBtnLabel">Next</span>
//             <span className="wizardPillBtnIcon">→</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }



// // src/worker/components/wizard-steps/WizardStep2.jsx
// import { SelectField, TextField } from '../../../common/components/TextField'

// const TRADE_LEVEL_MAP = {
//   'Metal Framing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Drywall Hanging': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Taping/Finishing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Acoustical Ceilings': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Interior Carpentry': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Helpers/Labourers': [
//     'Helper',
//     'Lead Helper',
//   ],
//   'Insulation': [
//     'Helper',
//     'Mechanic',
//     'Lead',
//   ],
//   'Demolition/Punch/Final Clean': [
//     'Helper',
//     'Mechanic',
//   ],
//   'Leads/Foremen': [
//     'Lead/Foreman',
//   ],
// }

// // Lead/Foreman responsibilities (applies to both "Lead" and "Lead/Foreman")
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

// // Metal Framing Skills
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

// // Drywall Hanging Skills
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

// // Taping/Finishing Skills
// const TAPING_FINISHING_SKILLS = [
//   'Level 1-5 finish',
//   'Skim coat',
//   'Texture match',
//   'Punch repair',
//   'Corner bead systems',
//   'Smooth finish',
// ]

// // Acoustical Ceilings Skills
// const ACOUSTICAL_CEILINGS_SKILLS = [
//   'Standard grid',
//   'Tegular',
//   'Specialty ceilings',
//   'Clouds/baffles',
//   'Seismic requirements',
//   'Light/HVAC/sprinkler coordination',
// ]

// // Interior Carpentry Skills
// const INTERIOR_CARPENTRY_SKILLS = [
//   'Backing',
//   'Blocking',
//   'Doors/frames/hardware support',
//   'Trim/carpentry',
//   'Finish carpentry',
// ]

// // Helpers/Labourers Skills
// const HELPERS_LABOURERS_SKILLS = [
//   'Material movement',
//   'Trade Assistance',
//   'Cleanup',
//   'Preparation work',
// ]

// // Insulation Skills
// const INSULATION_SKILLS = [
//   'Wall Insulation',
//   'Bat Insulation',
//   'Sound Insulation',
//   'Specialty Insulation',
// ]

// // Demolition/Punch/Final Clean Skills
// const DEMOLITION_SKILLS = [
//   'Demolition',
//   'Removal Support',
//   'Clean up',
//   'Punch work',
//   'Final clean',
//   'Closeout Support',
// ]

// export function WizardStep2({ data, onChange, onNext, onBack }) {
//   const handleChange = (field, value) => {
//     onChange({
//       ...data,
//       [field]: value,
//     })
//   }

//   const handleTradeChange = (value) => {
//     onChange({
//       ...data,
//       primaryTrade: value,
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
//     onChange({
//       ...data,
//       secondaryTrade: value,
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
//       ...data,
//       workerLevel: value,
//     }

//     // Reset all primary skill data when level changes
//     updates.leadForemanResponsibilities = {}
//     updates.metalFramingSkills = {}
//     updates.drywallHangingSkills = {}
//     updates.tapingFinishingSkills = {}
//     updates.acousticalCeilingsSkills = {}
//     updates.interiorCarpentrySkills = {}
//     updates.helpersLabourersSkills = {}
//     updates.insulationSkills = {}
//     updates.demolitionSkills = {}

//     onChange(updates)
//   }

//   const handleSecondaryLevelChange = (value) => {
//     const updates = {
//       ...data,
//       secondaryWorkerLevel: value,
//     }

//     // Reset all secondary skill data when level changes
//     updates.secondaryLeadForemanResponsibilities = {}
//     updates.secondaryMetalFramingSkills = {}
//     updates.secondaryDrywallHangingSkills = {}
//     updates.secondaryTapingFinishingSkills = {}
//     updates.secondaryAcousticalCeilingsSkills = {}
//     updates.secondaryInteriorCarpentrySkills = {}
//     updates.secondaryHelpersLabourersSkills = {}
//     updates.secondaryInsulationSkills = {}
//     updates.secondaryDemolitionSkills = {}

//     onChange(updates)
//   }

//   // Helper function to check if a level should show trade skills
//   const shouldShowTradeSkills = (level) => {
//     // Don't show trade skills for Lead or Lead/Foreman
//     if (level === 'Lead' || level === 'Lead/Foreman') {
//       return false
//     }
//     return true
//   }

//   // Primary toggle handlers
//   const handlePrimaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.leadForemanResponsibilities || {}
//     handleChange('leadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handlePrimaryMetalFramingToggle = (skill) => (e) => {
//     const current = data.metalFramingSkills || {}
//     handleChange('metalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDrywallHangingToggle = (skill) => (e) => {
//     const current = data.drywallHangingSkills || {}
//     handleChange('drywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryTapingFinishingToggle = (skill) => (e) => {
//     const current = data.tapingFinishingSkills || {}
//     handleChange('tapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = data.acousticalCeilingsSkills || {}
//     handleChange('acousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = data.interiorCarpentrySkills || {}
//     handleChange('interiorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = data.helpersLabourersSkills || {}
//     handleChange('helpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInsulationToggle = (skill) => (e) => {
//     const current = data.insulationSkills || {}
//     handleChange('insulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDemolitionToggle = (skill) => (e) => {
//     const current = data.demolitionSkills || {}
//     handleChange('demolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   // Secondary toggle handlers
//   const handleSecondaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.secondaryLeadForemanResponsibilities || {}
//     handleChange('secondaryLeadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handleSecondaryMetalFramingToggle = (skill) => (e) => {
//     const current = data.secondaryMetalFramingSkills || {}
//     handleChange('secondaryMetalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDrywallHangingToggle = (skill) => (e) => {
//     const current = data.secondaryDrywallHangingSkills || {}
//     handleChange('secondaryDrywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryTapingFinishingToggle = (skill) => (e) => {
//     const current = data.secondaryTapingFinishingSkills || {}
//     handleChange('secondaryTapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = data.secondaryAcousticalCeilingsSkills || {}
//     handleChange('secondaryAcousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = data.secondaryInteriorCarpentrySkills || {}
//     handleChange('secondaryInteriorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = data.secondaryHelpersLabourersSkills || {}
//     handleChange('secondaryHelpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInsulationToggle = (skill) => (e) => {
//     const current = data.secondaryInsulationSkills || {}
//     handleChange('secondaryInsulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDemolitionToggle = (skill) => (e) => {
//     const current = data.secondaryDemolitionSkills || {}
//     handleChange('secondaryDemolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const workerLevels = TRADE_LEVEL_MAP[data.primaryTrade] || []
//   const secondaryWorkerLevels = TRADE_LEVEL_MAP[data.secondaryTrade] || []
  
//   // Check if secondary trade and level match primary trade and level
//   const isDuplicate = data.primaryTrade && data.secondaryTrade && 
//                       data.workerLevel && data.secondaryWorkerLevel &&
//                       data.primaryTrade === data.secondaryTrade && 
//                       data.workerLevel === data.secondaryWorkerLevel

//   // Get all trade options for secondary (including primary trade)
//   const getSecondaryTradeOptions = () => {
//     return Object.keys(TRADE_LEVEL_MAP)
//   }

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Trade Profile & Skill Matrix</div>

//           {/* Primary Trade Section */}
//           <div style={{ marginBottom: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Primary Trade
//             </div>
//             <div className="wizardGrid3">
//               <SelectField
//                 label=""
//                 value={data.primaryTrade || ''}
//                 onChange={handleTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {Object.keys(TRADE_LEVEL_MAP).map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               <SelectField
//                 label=""
//                 value={data.workerLevel || ''}
//                 disabled={!data.primaryTrade}
//                 onChange={handleLevelChange}
//               >
//                 <option value="">Select Worker Level</option>
//                 {workerLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </SelectField>

//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.yearOfExperience || ''}
//                 onChange={(value) => handleChange('yearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>

//             {/* Primary Trade Skills - ALWAYS visible (not affected by duplicate) */}
//             {data.primaryTrade && data.workerLevel && shouldShowTradeSkills(data.workerLevel) && (
//               <>
//                 {/* Metal Framing Skills */}
//                 {data.primaryTrade === 'Metal Framing' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Metal Framing ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {METAL_FRAMING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.metalFramingSkills?.[skill] || false)}
//                             onChange={handlePrimaryMetalFramingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Drywall Hanging Skills */}
//                 {data.primaryTrade === 'Drywall Hanging' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Drywall Hanging ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DRYWALL_HANGING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.drywallHangingSkills?.[skill] || false)}
//                             onChange={handlePrimaryDrywallHangingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Taping/Finishing Skills */}
//                 {data.primaryTrade === 'Taping/Finishing' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Taping/Finishing ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {TAPING_FINISHING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.tapingFinishingSkills?.[skill] || false)}
//                             onChange={handlePrimaryTapingFinishingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Acoustical Ceilings Skills */}
//                 {data.primaryTrade === 'Acoustical Ceilings' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Acoustical Ceilings ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.acousticalCeilingsSkills?.[skill] || false)}
//                             onChange={handlePrimaryAcousticalCeilingsToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Interior Carpentry Skills */}
//                 {data.primaryTrade === 'Interior Carpentry' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Interior Carpentry ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.interiorCarpentrySkills?.[skill] || false)}
//                             onChange={handlePrimaryInteriorCarpentryToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Helpers/Labourers Skills */}
//                 {data.primaryTrade === 'Helpers/Labourers' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Lead Helper') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Helpers/Labourers ({data.workerLevel === 'Helper' ? 'H' : 'LH'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.helpersLabourersSkills?.[skill] || false)}
//                             onChange={handlePrimaryHelpersLabourersToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Insulation Skills - Only for Helper and Mechanic (not Lead) */}
//                 {data.primaryTrade === 'Insulation' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Insulation ({data.workerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INSULATION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.insulationSkills?.[skill] || false)}
//                             onChange={handlePrimaryInsulationToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Demolition/Punch/Final Clean Skills */}
//                 {data.primaryTrade === 'Demolition/Punch/Final Clean' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Demolition/Punch/Final Clean ({data.workerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DEMOLITION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.demolitionSkills?.[skill] || false)}
//                             onChange={handlePrimaryDemolitionToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </>
//             )}

//             {/* Primary Lead/Foreman Responsibilities - ALWAYS show for Lead/Lead-Foreman */}
//             {(data.workerLevel === 'Lead' || data.workerLevel === 'Lead/Foreman') && (
//               <fieldset style={{
//                 marginTop: 16,
//                 padding: '16px 20px 20px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '12px',
//                 background: 'rgba(15, 78, 169, 0.03)',
//                 position: 'relative',
//               }}>
//                 <legend style={{
//                   padding: '0 12px',
//                   fontSize: '14px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   background: 'white',
//                   borderRadius: '8px',
//                   marginLeft: '8px',
//                 }}>
//                   {data.workerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                 </legend>

//                 <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                   {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                     <label key={responsibility} className="wizardCheck">
//                       <input
//                         type="checkbox"
//                         checked={!!(data.leadForemanResponsibilities?.[responsibility] || false)}
//                         onChange={handlePrimaryResponsibilityToggle(responsibility)}
//                       />
//                       {responsibility}
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             )}
//           </div>

//           {/* Secondary Trade Section */}
//           <div style={{ marginTop: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Secondary Trade
//             </div>
//             <div className="wizardGrid3">
//               <SelectField
//                 label=""
//                 value={data.secondaryTrade || ''}
//                 onChange={handleSecondaryTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {getSecondaryTradeOptions().map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               <SelectField
//                 label=""
//                 value={data.secondaryWorkerLevel || ''}
//                 disabled={!data.secondaryTrade}
//                 onChange={handleSecondaryLevelChange}
//               >
//                 <option value="">Select Worker Level</option>
//                 {secondaryWorkerLevels.map((level) => (
//                   <option key={level} value={level}>
//                     {level}
//                   </option>
//                 ))}
//               </SelectField>

//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.secondaryYearOfExperience || ''}
//                 onChange={(value) => handleChange('secondaryYearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>

//             {/* Duplicate Validation Error */}
//             {isDuplicate && (
//               <div style={{
//                 marginTop: 8,
//                 padding: '10px 16px',
//                 background: '#fee2e2',
//                 border: '1px solid #fecaca',
//                 borderRadius: '8px',
//                 color: '#dc2626',
//                 fontSize: '13px',
//                 fontWeight: 500,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}>
//                 <span style={{ fontSize: '18px' }}>⚠️</span>
//                 Secondary Trade and Level cannot be the same as Primary Trade and Level. Please select different values.
//               </div>
//             )}

//             {/* Secondary Trade Skills - Only hidden when duplicate exists */}
//             {!isDuplicate && data.secondaryTrade && data.secondaryWorkerLevel && shouldShowTradeSkills(data.secondaryWorkerLevel) && (
//               <>
//                 {/* Secondary Metal Framing Skills */}
//                 {data.secondaryTrade === 'Metal Framing' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Metal Framing ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {METAL_FRAMING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryMetalFramingSkills?.[skill] || false)}
//                             onChange={handleSecondaryMetalFramingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Drywall Hanging Skills */}
//                 {data.secondaryTrade === 'Drywall Hanging' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Drywall Hanging ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DRYWALL_HANGING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryDrywallHangingSkills?.[skill] || false)}
//                             onChange={handleSecondaryDrywallHangingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Taping/Finishing Skills */}
//                 {data.secondaryTrade === 'Taping/Finishing' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Taping/Finishing ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {TAPING_FINISHING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryTapingFinishingSkills?.[skill] || false)}
//                             onChange={handleSecondaryTapingFinishingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Acoustical Ceilings Skills */}
//                 {data.secondaryTrade === 'Acoustical Ceilings' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Acoustical Ceilings ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryAcousticalCeilingsSkills?.[skill] || false)}
//                             onChange={handleSecondaryAcousticalCeilingsToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Interior Carpentry Skills */}
//                 {data.secondaryTrade === 'Interior Carpentry' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Interior Carpentry ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryInteriorCarpentrySkills?.[skill] || false)}
//                             onChange={handleSecondaryInteriorCarpentryToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Helpers/Labourers Skills */}
//                 {data.secondaryTrade === 'Helpers/Labourers' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Lead Helper') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Helpers/Labourers ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'LH'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryHelpersLabourersSkills?.[skill] || false)}
//                             onChange={handleSecondaryHelpersLabourersToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Insulation Skills - Only for Helper and Mechanic (not Lead) */}
//                 {data.secondaryTrade === 'Insulation' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Insulation ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INSULATION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryInsulationSkills?.[skill] || false)}
//                             onChange={handleSecondaryInsulationToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Demolition/Punch/Final Clean Skills */}
//                 {data.secondaryTrade === 'Demolition/Punch/Final Clean' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Demolition/Punch/Final Clean ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DEMOLITION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryDemolitionSkills?.[skill] || false)}
//                             onChange={handleSecondaryDemolitionToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </>
//             )}

//             {/* Secondary Lead/Foreman Responsibilities - Only hidden when duplicate exists */}
//             {!isDuplicate && (data.secondaryWorkerLevel === 'Lead' || data.secondaryWorkerLevel === 'Lead/Foreman') && (
//               <fieldset style={{
//                 marginTop: 16,
//                 padding: '16px 20px 20px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '12px',
//                 background: 'rgba(15, 78, 169, 0.03)',
//                 position: 'relative',
//               }}>
//                 <legend style={{
//                   padding: '0 12px',
//                   fontSize: '14px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   background: 'white',
//                   borderRadius: '8px',
//                   marginLeft: '8px',
//                 }}>
//                   {data.secondaryWorkerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                 </legend>

//                 <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                   {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                     <label key={responsibility} className="wizardCheck">
//                       <input
//                         type="checkbox"
//                         checked={!!(data.secondaryLeadForemanResponsibilities?.[responsibility] || false)}
//                         onChange={handleSecondaryResponsibilityToggle(responsibility)}
//                       />
//                       {responsibility}
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             )}

//             {/* ✅ NEW: Additional Skills/Tools/Systems Text Area */}
//             <div style={{ marginTop: 16 }}>
//               <div style={{ 
//                 fontSize: '14px', 
//                 fontWeight: 600, 
//                 color: '#17263a', 
//                 marginBottom: 8 
//               }}>
//                 Additional Skills / Tools / Systems
//               </div>
//               <textarea
//                 className="wizardTextArea"
//                 value={data.additionalSkillsTools || ''}
//                 onChange={(e) => handleChange('additionalSkillsTools', e.target.value)}
//                 placeholder="Enter additional skills, tools, or systems you have experience with..."
//                 rows={4}
//                 style={{
//                   width: '100%',
//                   padding: '12px 16px',
//                   border: '1px solid rgba(18, 38, 63, 0.12)',
//                   borderRadius: '12px',
//                   fontSize: '14px',
//                   fontFamily: 'inherit',
//                   resize: 'vertical',
//                   outline: 'none',
//                   transition: 'all 0.2s ease',
//                   background: 'white',
//                   color: '#17263a',
//                   minHeight: '100px',
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#0f4ea9'
//                   e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                   e.target.style.boxShadow = 'none'
//                 }}
//               />
//               <div style={{ 
//                 fontSize: '11px', 
//                 color: 'rgba(23, 38, 58, 0.5)', 
//                 marginTop: '4px',
//                 textAlign: 'right'
//               }}>
//                 {data.additionalSkillsTools?.length || 0} characters
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }



// // src/worker/components/wizard-steps/WizardStep2.jsx
// import { SelectField, TextField } from '../../../common/components/TextField'

// const TRADE_LEVEL_MAP = {
//   'Metal Framing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Drywall Hanging': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Taping/Finishing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Acoustical Ceilings': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Interior Carpentry': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Helpers/Labourers': [
//     'Helper',
//     'Lead Helper',
//   ],
//   'Insulation': [
//     'Helper',
//     'Mechanic',
//     'Lead',
//   ],
//   'Demolition/Punch/Final Clean': [
//     'Helper',
//     'Mechanic',
//   ],
//   'Leads/Foremen': [
//     'Lead/Foreman',
//   ],
//   'Other': [], // Added Other option with empty levels array
// }

// // Lead/Foreman responsibilities (applies to both "Lead" and "Lead/Foreman")
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

// // Metal Framing Skills
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

// // Drywall Hanging Skills
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

// // Taping/Finishing Skills
// const TAPING_FINISHING_SKILLS = [
//   'Level 1-5 finish',
//   'Skim coat',
//   'Texture match',
//   'Punch repair',
//   'Corner bead systems',
//   'Smooth finish',
// ]

// // Acoustical Ceilings Skills
// const ACOUSTICAL_CEILINGS_SKILLS = [
//   'Standard grid',
//   'Tegular',
//   'Specialty ceilings',
//   'Clouds/baffles',
//   'Seismic requirements',
//   'Light/HVAC/sprinkler coordination',
// ]

// // Interior Carpentry Skills
// const INTERIOR_CARPENTRY_SKILLS = [
//   'Backing',
//   'Blocking',
//   'Doors/frames/hardware support',
//   'Trim/carpentry',
//   'Finish carpentry',
// ]

// // Helpers/Labourers Skills
// const HELPERS_LABOURERS_SKILLS = [
//   'Material movement',
//   'Trade Assistance',
//   'Cleanup',
//   'Preparation work',
// ]

// // Insulation Skills
// const INSULATION_SKILLS = [
//   'Wall Insulation',
//   'Bat Insulation',
//   'Sound Insulation',
//   'Specialty Insulation',
// ]

// // Demolition/Punch/Final Clean Skills
// const DEMOLITION_SKILLS = [
//   'Demolition',
//   'Removal Support',
//   'Clean up',
//   'Punch work',
//   'Final clean',
//   'Closeout Support',
// ]

// export function WizardStep2({ data, onChange, onNext, onBack }) {
//   const handleChange = (field, value) => {
//     onChange({
//       ...data,
//       [field]: value,
//     })
//   }

//   const handleTradeChange = (value) => {
//     onChange({
//       ...data,
//       primaryTrade: value,
//       primaryOtherTrade: '', // Reset custom trade input
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
//     onChange({
//       ...data,
//       secondaryTrade: value,
//       secondaryOtherTrade: '', // Reset custom trade input
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
//       ...data,
//       workerLevel: value,
//     }

//     // Reset all primary skill data when level changes
//     updates.leadForemanResponsibilities = {}
//     updates.metalFramingSkills = {}
//     updates.drywallHangingSkills = {}
//     updates.tapingFinishingSkills = {}
//     updates.acousticalCeilingsSkills = {}
//     updates.interiorCarpentrySkills = {}
//     updates.helpersLabourersSkills = {}
//     updates.insulationSkills = {}
//     updates.demolitionSkills = {}

//     onChange(updates)
//   }

//   const handleSecondaryLevelChange = (value) => {
//     const updates = {
//       ...data,
//       secondaryWorkerLevel: value,
//     }

//     // Reset all secondary skill data when level changes
//     updates.secondaryLeadForemanResponsibilities = {}
//     updates.secondaryMetalFramingSkills = {}
//     updates.secondaryDrywallHangingSkills = {}
//     updates.secondaryTapingFinishingSkills = {}
//     updates.secondaryAcousticalCeilingsSkills = {}
//     updates.secondaryInteriorCarpentrySkills = {}
//     updates.secondaryHelpersLabourersSkills = {}
//     updates.secondaryInsulationSkills = {}
//     updates.secondaryDemolitionSkills = {}

//     onChange(updates)
//   }

//   // Helper function to check if a level should show trade skills
//   const shouldShowTradeSkills = (level) => {
//     // Don't show trade skills for Lead or Lead/Foreman
//     if (level === 'Lead' || level === 'Lead/Foreman') {
//       return false
//     }
//     return true
//   }

//   // Primary toggle handlers
//   const handlePrimaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.leadForemanResponsibilities || {}
//     handleChange('leadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handlePrimaryMetalFramingToggle = (skill) => (e) => {
//     const current = data.metalFramingSkills || {}
//     handleChange('metalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDrywallHangingToggle = (skill) => (e) => {
//     const current = data.drywallHangingSkills || {}
//     handleChange('drywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryTapingFinishingToggle = (skill) => (e) => {
//     const current = data.tapingFinishingSkills || {}
//     handleChange('tapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = data.acousticalCeilingsSkills || {}
//     handleChange('acousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = data.interiorCarpentrySkills || {}
//     handleChange('interiorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = data.helpersLabourersSkills || {}
//     handleChange('helpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryInsulationToggle = (skill) => (e) => {
//     const current = data.insulationSkills || {}
//     handleChange('insulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handlePrimaryDemolitionToggle = (skill) => (e) => {
//     const current = data.demolitionSkills || {}
//     handleChange('demolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   // Secondary toggle handlers
//   const handleSecondaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.secondaryLeadForemanResponsibilities || {}
//     handleChange('secondaryLeadForemanResponsibilities', {
//       ...current,
//       [responsibility]: e.target.checked,
//     })
//   }

//   const handleSecondaryMetalFramingToggle = (skill) => (e) => {
//     const current = data.secondaryMetalFramingSkills || {}
//     handleChange('secondaryMetalFramingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDrywallHangingToggle = (skill) => (e) => {
//     const current = data.secondaryDrywallHangingSkills || {}
//     handleChange('secondaryDrywallHangingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryTapingFinishingToggle = (skill) => (e) => {
//     const current = data.secondaryTapingFinishingSkills || {}
//     handleChange('secondaryTapingFinishingSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = data.secondaryAcousticalCeilingsSkills || {}
//     handleChange('secondaryAcousticalCeilingsSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = data.secondaryInteriorCarpentrySkills || {}
//     handleChange('secondaryInteriorCarpentrySkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = data.secondaryHelpersLabourersSkills || {}
//     handleChange('secondaryHelpersLabourersSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryInsulationToggle = (skill) => (e) => {
//     const current = data.secondaryInsulationSkills || {}
//     handleChange('secondaryInsulationSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const handleSecondaryDemolitionToggle = (skill) => (e) => {
//     const current = data.secondaryDemolitionSkills || {}
//     handleChange('secondaryDemolitionSkills', {
//       ...current,
//       [skill]: e.target.checked,
//     })
//   }

//   const workerLevels = TRADE_LEVEL_MAP[data.primaryTrade] || []
//   const secondaryWorkerLevels = TRADE_LEVEL_MAP[data.secondaryTrade] || []
  
//   // Check if secondary trade and level match primary trade and level
//   const isDuplicate = data.primaryTrade && data.secondaryTrade && 
//                       data.workerLevel && data.secondaryWorkerLevel &&
//                       data.primaryTrade === data.secondaryTrade && 
//                       data.workerLevel === data.secondaryWorkerLevel

//   // Get all trade options for secondary (including primary trade)
//   const getSecondaryTradeOptions = () => {
//     return Object.keys(TRADE_LEVEL_MAP)
//   }

//   // Check if Other is selected
//   const isPrimaryOther = data.primaryTrade === 'Other'
//   const isSecondaryOther = data.secondaryTrade === 'Other'

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Trade Profile & Skill Matrix</div>

//           {/* Primary Trade Section */}
//           <div style={{ marginBottom: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Primary Trade
//             </div>
//             <div className="wizardGrid3">
//               <SelectField
//                 label=""
//                 value={data.primaryTrade || ''}
//                 onChange={handleTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {Object.keys(TRADE_LEVEL_MAP).map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               {isPrimaryOther ? (
//                 <TextField
//                   label=""
//                   value={data.primaryOtherTrade || ''}
//                   onChange={(value) => handleChange('primaryOtherTrade', value)}
//                   placeholder="Enter Primary Trade"
//                 />
//               ) : (
//                 <SelectField
//                   label=""
//                   value={data.workerLevel || ''}
//                   disabled={!data.primaryTrade}
//                   onChange={handleLevelChange}
//                 >
//                   <option value="">Select Worker Level</option>
//                   {workerLevels.map((level) => (
//                     <option key={level} value={level}>
//                       {level}
//                     </option>
//                   ))}
//                 </SelectField>
//               )}

//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.yearOfExperience || ''}
//                 onChange={(value) => handleChange('yearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>

//             {/* Show custom trade input when Other is selected */}
//             {isPrimaryOther && data.primaryOtherTrade && (
//               <div style={{
//                 marginTop: 8,
//                 fontSize: '13px',
//                 color: '#0f4ea9',
//                 fontWeight: 500,
//                 padding: '8px 12px',
//                 background: 'rgba(15, 78, 169, 0.05)',
//                 borderRadius: '8px',
//                 border: '1px solid rgba(15, 78, 169, 0.1)',
//               }}>
//                 Custom Trade: {data.primaryOtherTrade}
//               </div>
//             )}

//             {/* Primary Trade Skills - ALWAYS visible (not affected by duplicate) */}
//             {!isPrimaryOther && data.primaryTrade && data.workerLevel && shouldShowTradeSkills(data.workerLevel) && (
//               <>
//                 {/* Metal Framing Skills */}
//                 {data.primaryTrade === 'Metal Framing' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Metal Framing ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {METAL_FRAMING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.metalFramingSkills?.[skill] || false)}
//                             onChange={handlePrimaryMetalFramingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Drywall Hanging Skills */}
//                 {data.primaryTrade === 'Drywall Hanging' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Drywall Hanging ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DRYWALL_HANGING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.drywallHangingSkills?.[skill] || false)}
//                             onChange={handlePrimaryDrywallHangingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Taping/Finishing Skills */}
//                 {data.primaryTrade === 'Taping/Finishing' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Taping/Finishing ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {TAPING_FINISHING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.tapingFinishingSkills?.[skill] || false)}
//                             onChange={handlePrimaryTapingFinishingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Acoustical Ceilings Skills */}
//                 {data.primaryTrade === 'Acoustical Ceilings' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Acoustical Ceilings ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.acousticalCeilingsSkills?.[skill] || false)}
//                             onChange={handlePrimaryAcousticalCeilingsToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Interior Carpentry Skills */}
//                 {data.primaryTrade === 'Interior Carpentry' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Interior Carpentry ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.interiorCarpentrySkills?.[skill] || false)}
//                             onChange={handlePrimaryInteriorCarpentryToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Helpers/Labourers Skills */}
//                 {data.primaryTrade === 'Helpers/Labourers' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Lead Helper') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Helpers/Labourers ({data.workerLevel === 'Helper' ? 'H' : 'LH'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.helpersLabourersSkills?.[skill] || false)}
//                             onChange={handlePrimaryHelpersLabourersToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Insulation Skills - Only for Helper and Mechanic (not Lead) */}
//                 {data.primaryTrade === 'Insulation' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Insulation ({data.workerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INSULATION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.insulationSkills?.[skill] || false)}
//                             onChange={handlePrimaryInsulationToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Demolition/Punch/Final Clean Skills */}
//                 {data.primaryTrade === 'Demolition/Punch/Final Clean' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Demolition/Punch/Final Clean ({data.workerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DEMOLITION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.demolitionSkills?.[skill] || false)}
//                             onChange={handlePrimaryDemolitionToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </>
//             )}

//             {/* Primary Lead/Foreman Responsibilities - ALWAYS show for Lead/Lead-Foreman */}
//             {!isPrimaryOther && (data.workerLevel === 'Lead' || data.workerLevel === 'Lead/Foreman') && (
//               <fieldset style={{
//                 marginTop: 16,
//                 padding: '16px 20px 20px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '12px',
//                 background: 'rgba(15, 78, 169, 0.03)',
//                 position: 'relative',
//               }}>
//                 <legend style={{
//                   padding: '0 12px',
//                   fontSize: '14px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   background: 'white',
//                   borderRadius: '8px',
//                   marginLeft: '8px',
//                 }}>
//                   {data.workerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                 </legend>

//                 <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                   {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                     <label key={responsibility} className="wizardCheck">
//                       <input
//                         type="checkbox"
//                         checked={!!(data.leadForemanResponsibilities?.[responsibility] || false)}
//                         onChange={handlePrimaryResponsibilityToggle(responsibility)}
//                       />
//                       {responsibility}
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             )}
//           </div>

//           {/* Secondary Trade Section */}
//           <div style={{ marginTop: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Secondary Trade
//             </div>
//             <div className="wizardGrid3">
//               <SelectField
//                 label=""
//                 value={data.secondaryTrade || ''}
//                 onChange={handleSecondaryTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {getSecondaryTradeOptions().map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               {isSecondaryOther ? (
//                 <TextField
//                   label=""
//                   value={data.secondaryOtherTrade || ''}
//                   onChange={(value) => handleChange('secondaryOtherTrade', value)}
//                   placeholder="Enter Secondary Trade"
//                 />
//               ) : (
//                 <SelectField
//                   label=""
//                   value={data.secondaryWorkerLevel || ''}
//                   disabled={!data.secondaryTrade}
//                   onChange={handleSecondaryLevelChange}
//                 >
//                   <option value="">Select Worker Level</option>
//                   {secondaryWorkerLevels.map((level) => (
//                     <option key={level} value={level}>
//                       {level}
//                     </option>
//                   ))}
//                 </SelectField>
//               )}

//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.secondaryYearOfExperience || ''}
//                 onChange={(value) => handleChange('secondaryYearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>

//             {/* Show custom trade input when Other is selected */}
//             {isSecondaryOther && data.secondaryOtherTrade && (
//               <div style={{
//                 marginTop: 8,
//                 fontSize: '13px',
//                 color: '#0f4ea9',
//                 fontWeight: 500,
//                 padding: '8px 12px',
//                 background: 'rgba(15, 78, 169, 0.05)',
//                 borderRadius: '8px',
//                 border: '1px solid rgba(15, 78, 169, 0.1)',
//               }}>
//                 Custom Trade: {data.secondaryOtherTrade}
//               </div>
//             )}

//             {/* Duplicate Validation Error */}
//             {isDuplicate && (
//               <div style={{
//                 marginTop: 8,
//                 padding: '10px 16px',
//                 background: '#fee2e2',
//                 border: '1px solid #fecaca',
//                 borderRadius: '8px',
//                 color: '#dc2626',
//                 fontSize: '13px',
//                 fontWeight: 500,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}>
//                 <span style={{ fontSize: '18px' }}>⚠️</span>
//                 Secondary Trade and Level cannot be the same as Primary Trade and Level. Please select different values.
//               </div>
//             )}

//             {/* Secondary Trade Skills - Only hidden when duplicate exists */}
//             {!isDuplicate && !isSecondaryOther && data.secondaryTrade && data.secondaryWorkerLevel && shouldShowTradeSkills(data.secondaryWorkerLevel) && (
//               <>
//                 {/* Secondary Metal Framing Skills */}
//                 {data.secondaryTrade === 'Metal Framing' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Metal Framing ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {METAL_FRAMING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryMetalFramingSkills?.[skill] || false)}
//                             onChange={handleSecondaryMetalFramingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Drywall Hanging Skills */}
//                 {data.secondaryTrade === 'Drywall Hanging' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Drywall Hanging ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DRYWALL_HANGING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryDrywallHangingSkills?.[skill] || false)}
//                             onChange={handleSecondaryDrywallHangingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Taping/Finishing Skills */}
//                 {data.secondaryTrade === 'Taping/Finishing' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Taping/Finishing ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {TAPING_FINISHING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryTapingFinishingSkills?.[skill] || false)}
//                             onChange={handleSecondaryTapingFinishingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Acoustical Ceilings Skills */}
//                 {data.secondaryTrade === 'Acoustical Ceilings' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Acoustical Ceilings ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryAcousticalCeilingsSkills?.[skill] || false)}
//                             onChange={handleSecondaryAcousticalCeilingsToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Interior Carpentry Skills */}
//                 {data.secondaryTrade === 'Interior Carpentry' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Interior Carpentry ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryInteriorCarpentrySkills?.[skill] || false)}
//                             onChange={handleSecondaryInteriorCarpentryToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Helpers/Labourers Skills */}
//                 {data.secondaryTrade === 'Helpers/Labourers' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Lead Helper') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Helpers/Labourers ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'LH'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryHelpersLabourersSkills?.[skill] || false)}
//                             onChange={handleSecondaryHelpersLabourersToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Insulation Skills - Only for Helper and Mechanic (not Lead) */}
//                 {data.secondaryTrade === 'Insulation' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Insulation ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INSULATION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryInsulationSkills?.[skill] || false)}
//                             onChange={handleSecondaryInsulationToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Demolition/Punch/Final Clean Skills */}
//                 {data.secondaryTrade === 'Demolition/Punch/Final Clean' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Demolition/Punch/Final Clean ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DEMOLITION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryDemolitionSkills?.[skill] || false)}
//                             onChange={handleSecondaryDemolitionToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </>
//             )}

//             {/* Secondary Lead/Foreman Responsibilities - Only hidden when duplicate exists */}
//             {!isDuplicate && !isSecondaryOther && (data.secondaryWorkerLevel === 'Lead' || data.secondaryWorkerLevel === 'Lead/Foreman') && (
//               <fieldset style={{
//                 marginTop: 16,
//                 padding: '16px 20px 20px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '12px',
//                 background: 'rgba(15, 78, 169, 0.03)',
//                 position: 'relative',
//               }}>
//                 <legend style={{
//                   padding: '0 12px',
//                   fontSize: '14px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   background: 'white',
//                   borderRadius: '8px',
//                   marginLeft: '8px',
//                 }}>
//                   {data.secondaryWorkerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                 </legend>

//                 <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                   {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                     <label key={responsibility} className="wizardCheck">
//                       <input
//                         type="checkbox"
//                         checked={!!(data.secondaryLeadForemanResponsibilities?.[responsibility] || false)}
//                         onChange={handleSecondaryResponsibilityToggle(responsibility)}
//                       />
//                       {responsibility}
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             )}

//             {/* ✅ NEW: Additional Skills/Tools/Systems Text Area */}
//             <div style={{ marginTop: 16 }}>
//               <div style={{ 
//                 fontSize: '14px', 
//                 fontWeight: 600, 
//                 color: '#17263a', 
//                 marginBottom: 8 
//               }}>
//                 Additional Skills / Tools / Systems
//               </div>
//               <textarea
//                 className="wizardTextArea"
//                 value={data.additionalSkillsTools || ''}
//                 onChange={(e) => handleChange('additionalSkillsTools', e.target.value)}
//                 placeholder="Enter additional skills, tools, or systems you have experience with..."
//                 rows={4}
//                 style={{
//                   width: '100%',
//                   padding: '12px 16px',
//                   border: '1px solid rgba(18, 38, 63, 0.12)',
//                   borderRadius: '12px',
//                   fontSize: '14px',
//                   fontFamily: 'inherit',
//                   resize: 'vertical',
//                   outline: 'none',
//                   transition: 'all 0.2s ease',
//                   background: 'white',
//                   color: '#17263a',
//                   minHeight: '100px',
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#0f4ea9'
//                   e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                   e.target.style.boxShadow = 'none'
//                 }}
//               />
//               <div style={{ 
//                 fontSize: '11px', 
//                 color: 'rgba(23, 38, 58, 0.5)', 
//                 marginTop: '4px',
//                 textAlign: 'right'
//               }}>
//                 {data.additionalSkillsTools?.length || 0} characters
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




// // src/worker/components/wizard-steps/WizardStep2.jsx
// import { SelectField, TextField } from '../../../common/components/TextField'

// const TRADE_LEVEL_MAP = {
//   'Metal Framing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Drywall Hanging': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Taping/Finishing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Acoustical Ceilings': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Interior Carpentry': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Helpers/Labourers': [
//     'Helper',
//     'Lead Helper',
//   ],
//   'Insulation': [
//     'Helper',
//     'Mechanic',
//     'Lead',
//   ],
//   'Demolition/Punch/Final Clean': [
//     'Helper',
//     'Mechanic',
//   ],
//   'Leads/Foremen': [
//     'Lead/Foreman',
//   ],
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

// export function WizardStep2({ data, onChange, onNext, onBack }) {
//   // ✅ FIX: Handle change - only update specific field
//   const handleChange = (field, value) => {
//     onChange({ [field]: value })
//   }

//   // ✅ FIX: Trade change - reset all related fields
//   const handleTradeChange = (value) => {
//     onChange({
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

//   // ✅ FIX: Secondary trade change
//   const handleSecondaryTradeChange = (value) => {
//     onChange({
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

//   // ✅ FIX: Level change - reset skills
//   const handleLevelChange = (value) => {
//     onChange({
//       workerLevel: value,
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

//   // ✅ FIX: Secondary level change
//   const handleSecondaryLevelChange = (value) => {
//     onChange({
//       secondaryWorkerLevel: value,
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

//   // ✅ Helper function to check if level should show trade skills
//   const shouldShowTradeSkills = (level) => {
//     if (level === 'Lead' || level === 'Lead/Foreman') {
//       return false
//     }
//     return true
//   }

//   // ✅ Primary toggle handlers
//   const handlePrimaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.leadForemanResponsibilities || {}
//     onChange({
//       leadForemanResponsibilities: {
//         ...current,
//         [responsibility]: e.target.checked,
//       }
//     })
//   }

//   const handlePrimaryMetalFramingToggle = (skill) => (e) => {
//     const current = data.metalFramingSkills || {}
//     onChange({
//       metalFramingSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handlePrimaryDrywallHangingToggle = (skill) => (e) => {
//     const current = data.drywallHangingSkills || {}
//     onChange({
//       drywallHangingSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handlePrimaryTapingFinishingToggle = (skill) => (e) => {
//     const current = data.tapingFinishingSkills || {}
//     onChange({
//       tapingFinishingSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handlePrimaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = data.acousticalCeilingsSkills || {}
//     onChange({
//       acousticalCeilingsSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handlePrimaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = data.interiorCarpentrySkills || {}
//     onChange({
//       interiorCarpentrySkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handlePrimaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = data.helpersLabourersSkills || {}
//     onChange({
//       helpersLabourersSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handlePrimaryInsulationToggle = (skill) => (e) => {
//     const current = data.insulationSkills || {}
//     onChange({
//       insulationSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handlePrimaryDemolitionToggle = (skill) => (e) => {
//     const current = data.demolitionSkills || {}
//     onChange({
//       demolitionSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   // ✅ Secondary toggle handlers
//   const handleSecondaryResponsibilityToggle = (responsibility) => (e) => {
//     const current = data.secondaryLeadForemanResponsibilities || {}
//     onChange({
//       secondaryLeadForemanResponsibilities: {
//         ...current,
//         [responsibility]: e.target.checked,
//       }
//     })
//   }

//   const handleSecondaryMetalFramingToggle = (skill) => (e) => {
//     const current = data.secondaryMetalFramingSkills || {}
//     onChange({
//       secondaryMetalFramingSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handleSecondaryDrywallHangingToggle = (skill) => (e) => {
//     const current = data.secondaryDrywallHangingSkills || {}
//     onChange({
//       secondaryDrywallHangingSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handleSecondaryTapingFinishingToggle = (skill) => (e) => {
//     const current = data.secondaryTapingFinishingSkills || {}
//     onChange({
//       secondaryTapingFinishingSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handleSecondaryAcousticalCeilingsToggle = (skill) => (e) => {
//     const current = data.secondaryAcousticalCeilingsSkills || {}
//     onChange({
//       secondaryAcousticalCeilingsSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handleSecondaryInteriorCarpentryToggle = (skill) => (e) => {
//     const current = data.secondaryInteriorCarpentrySkills || {}
//     onChange({
//       secondaryInteriorCarpentrySkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handleSecondaryHelpersLabourersToggle = (skill) => (e) => {
//     const current = data.secondaryHelpersLabourersSkills || {}
//     onChange({
//       secondaryHelpersLabourersSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handleSecondaryInsulationToggle = (skill) => (e) => {
//     const current = data.secondaryInsulationSkills || {}
//     onChange({
//       secondaryInsulationSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   const handleSecondaryDemolitionToggle = (skill) => (e) => {
//     const current = data.secondaryDemolitionSkills || {}
//     onChange({
//       secondaryDemolitionSkills: {
//         ...current,
//         [skill]: e.target.checked,
//       }
//     })
//   }

//   // ✅ Additional skills change
//   const handleAdditionalSkillsChange = (e) => {
//     onChange({ additionalSkillsTools: e.target.value })
//   }

//   const workerLevels = TRADE_LEVEL_MAP[data.primaryTrade] || []
//   const secondaryWorkerLevels = TRADE_LEVEL_MAP[data.secondaryTrade] || []
  
//   const isDuplicate = data.primaryTrade && data.secondaryTrade && 
//                       data.workerLevel && data.secondaryWorkerLevel &&
//                       data.primaryTrade === data.secondaryTrade && 
//                       data.workerLevel === data.secondaryWorkerLevel

//   const getSecondaryTradeOptions = () => {
//     return Object.keys(TRADE_LEVEL_MAP)
//   }

//   const isPrimaryOther = data.primaryTrade === 'Other'
//   const isSecondaryOther = data.secondaryTrade === 'Other'

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Trade Profile & Skill Matrix</div>

//           {/* Primary Trade Section */}
//           <div style={{ marginBottom: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Primary Trade
//             </div>
//             <div className="wizardGrid3">
//               <SelectField
//                 label=""
//                 value={data.primaryTrade || ''}
//                 onChange={handleTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {Object.keys(TRADE_LEVEL_MAP).map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               {isPrimaryOther ? (
//                 <TextField
//                   label=""
//                   value={data.primaryOtherTrade || ''}
//                   onChange={(value) => handleChange('primaryOtherTrade', value)}
//                   placeholder="Enter Primary Trade"
//                 />
//               ) : (
//                 <SelectField
//                   label=""
//                   value={data.workerLevel || ''}
//                   disabled={!data.primaryTrade}
//                   onChange={handleLevelChange}
//                 >
//                   <option value="">Select Worker Level</option>
//                   {workerLevels.map((level) => (
//                     <option key={level} value={level}>
//                       {level}
//                     </option>
//                   ))}
//                 </SelectField>
//               )}

//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.yearOfExperience || ''}
//                 onChange={(value) => handleChange('yearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>

//             {/* Show custom trade input when Other is selected */}
//             {isPrimaryOther && data.primaryOtherTrade && (
//               <div style={{
//                 marginTop: 8,
//                 fontSize: '13px',
//                 color: '#0f4ea9',
//                 fontWeight: 500,
//                 padding: '8px 12px',
//                 background: 'rgba(15, 78, 169, 0.05)',
//                 borderRadius: '8px',
//                 border: '1px solid rgba(15, 78, 169, 0.1)',
//               }}>
//                 Custom Trade: {data.primaryOtherTrade}
//               </div>
//             )}

//             {/* Primary Trade Skills */}
//             {!isPrimaryOther && data.primaryTrade && data.workerLevel && shouldShowTradeSkills(data.workerLevel) && (
//               <>
//                 {/* Metal Framing Skills */}
//                 {data.primaryTrade === 'Metal Framing' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Metal Framing ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {METAL_FRAMING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.metalFramingSkills?.[skill] || false)}
//                             onChange={handlePrimaryMetalFramingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Drywall Hanging Skills */}
//                 {data.primaryTrade === 'Drywall Hanging' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Drywall Hanging ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DRYWALL_HANGING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.drywallHangingSkills?.[skill] || false)}
//                             onChange={handlePrimaryDrywallHangingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Taping/Finishing Skills */}
//                 {data.primaryTrade === 'Taping/Finishing' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Taping/Finishing ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {TAPING_FINISHING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.tapingFinishingSkills?.[skill] || false)}
//                             onChange={handlePrimaryTapingFinishingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Acoustical Ceilings Skills */}
//                 {data.primaryTrade === 'Acoustical Ceilings' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Acoustical Ceilings ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.acousticalCeilingsSkills?.[skill] || false)}
//                             onChange={handlePrimaryAcousticalCeilingsToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Interior Carpentry Skills */}
//                 {data.primaryTrade === 'Interior Carpentry' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic' || data.workerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Interior Carpentry ({data.workerLevel === 'Helper' ? 'H' : data.workerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.interiorCarpentrySkills?.[skill] || false)}
//                             onChange={handlePrimaryInteriorCarpentryToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Helpers/Labourers Skills */}
//                 {data.primaryTrade === 'Helpers/Labourers' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Lead Helper') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Helpers/Labourers ({data.workerLevel === 'Helper' ? 'H' : 'LH'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.helpersLabourersSkills?.[skill] || false)}
//                             onChange={handlePrimaryHelpersLabourersToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Insulation Skills */}
//                 {data.primaryTrade === 'Insulation' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Insulation ({data.workerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INSULATION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.insulationSkills?.[skill] || false)}
//                             onChange={handlePrimaryInsulationToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Demolition/Punch/Final Clean Skills */}
//                 {data.primaryTrade === 'Demolition/Punch/Final Clean' && 
//                  (data.workerLevel === 'Helper' || data.workerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Demolition/Punch/Final Clean ({data.workerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DEMOLITION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.demolitionSkills?.[skill] || false)}
//                             onChange={handlePrimaryDemolitionToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </>
//             )}

//             {/* Primary Lead/Foreman Responsibilities */}
//             {!isPrimaryOther && (data.workerLevel === 'Lead' || data.workerLevel === 'Lead/Foreman') && (
//               <fieldset style={{
//                 marginTop: 16,
//                 padding: '16px 20px 20px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '12px',
//                 background: 'rgba(15, 78, 169, 0.03)',
//                 position: 'relative',
//               }}>
//                 <legend style={{
//                   padding: '0 12px',
//                   fontSize: '14px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   background: 'white',
//                   borderRadius: '8px',
//                   marginLeft: '8px',
//                 }}>
//                   {data.workerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                 </legend>

//                 <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                   {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                     <label key={responsibility} className="wizardCheck">
//                       <input
//                         type="checkbox"
//                         checked={!!(data.leadForemanResponsibilities?.[responsibility] || false)}
//                         onChange={handlePrimaryResponsibilityToggle(responsibility)}
//                       />
//                       {responsibility}
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             )}
//           </div>

//           {/* Secondary Trade Section */}
//           <div style={{ marginTop: 16 }}>
//             <div style={{ fontSize: '14px', fontWeight: 600, color: '#17263a', marginBottom: 8 }}>
//               Secondary Trade
//             </div>
//             <div className="wizardGrid3">
//               <SelectField
//                 label=""
//                 value={data.secondaryTrade || ''}
//                 onChange={handleSecondaryTradeChange}
//               >
//                 <option value="">Select Trade</option>
//                 {getSecondaryTradeOptions().map((trade) => (
//                   <option key={trade} value={trade}>
//                     {trade}
//                   </option>
//                 ))}
//               </SelectField>

//               {isSecondaryOther ? (
//                 <TextField
//                   label=""
//                   value={data.secondaryOtherTrade || ''}
//                   onChange={(value) => handleChange('secondaryOtherTrade', value)}
//                   placeholder="Enter Secondary Trade"
//                 />
//               ) : (
//                 <SelectField
//                   label=""
//                   value={data.secondaryWorkerLevel || ''}
//                   disabled={!data.secondaryTrade}
//                   onChange={handleSecondaryLevelChange}
//                 >
//                   <option value="">Select Worker Level</option>
//                   {secondaryWorkerLevels.map((level) => (
//                     <option key={level} value={level}>
//                       {level}
//                     </option>
//                   ))}
//                 </SelectField>
//               )}

//               <TextField
//                 label=""
//                 type="number"
//                 min="0"
//                 value={data.secondaryYearOfExperience || ''}
//                 onChange={(value) => handleChange('secondaryYearOfExperience', value)}
//                 placeholder="Enter years"
//               />
//             </div>

//             {/* Show custom trade input when Other is selected */}
//             {isSecondaryOther && data.secondaryOtherTrade && (
//               <div style={{
//                 marginTop: 8,
//                 fontSize: '13px',
//                 color: '#0f4ea9',
//                 fontWeight: 500,
//                 padding: '8px 12px',
//                 background: 'rgba(15, 78, 169, 0.05)',
//                 borderRadius: '8px',
//                 border: '1px solid rgba(15, 78, 169, 0.1)',
//               }}>
//                 Custom Trade: {data.secondaryOtherTrade}
//               </div>
//             )}

//             {/* Duplicate Validation Error */}
//             {isDuplicate && (
//               <div style={{
//                 marginTop: 8,
//                 padding: '10px 16px',
//                 background: '#fee2e2',
//                 border: '1px solid #fecaca',
//                 borderRadius: '8px',
//                 color: '#dc2626',
//                 fontSize: '13px',
//                 fontWeight: 500,
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}>
//                 <span style={{ fontSize: '18px' }}>⚠️</span>
//                 Secondary Trade and Level cannot be the same as Primary Trade and Level. Please select different values.
//               </div>
//             )}

//             {/* Secondary Trade Skills */}
//             {!isDuplicate && !isSecondaryOther && data.secondaryTrade && data.secondaryWorkerLevel && shouldShowTradeSkills(data.secondaryWorkerLevel) && (
//               <>
//                 {/* Secondary Metal Framing Skills */}
//                 {data.secondaryTrade === 'Metal Framing' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Metal Framing ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {METAL_FRAMING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryMetalFramingSkills?.[skill] || false)}
//                             onChange={handleSecondaryMetalFramingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Drywall Hanging Skills */}
//                 {data.secondaryTrade === 'Drywall Hanging' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Drywall Hanging ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DRYWALL_HANGING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryDrywallHangingSkills?.[skill] || false)}
//                             onChange={handleSecondaryDrywallHangingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Taping/Finishing Skills */}
//                 {data.secondaryTrade === 'Taping/Finishing' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Taping/Finishing ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {TAPING_FINISHING_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryTapingFinishingSkills?.[skill] || false)}
//                             onChange={handleSecondaryTapingFinishingToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Acoustical Ceilings Skills */}
//                 {data.secondaryTrade === 'Acoustical Ceilings' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Acoustical Ceilings ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {ACOUSTICAL_CEILINGS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryAcousticalCeilingsSkills?.[skill] || false)}
//                             onChange={handleSecondaryAcousticalCeilingsToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Interior Carpentry Skills */}
//                 {data.secondaryTrade === 'Interior Carpentry' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic' || data.secondaryWorkerLevel === 'Advanced Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Interior Carpentry ({data.secondaryWorkerLevel === 'Helper' ? 'H' : data.secondaryWorkerLevel === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INTERIOR_CARPENTRY_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryInteriorCarpentrySkills?.[skill] || false)}
//                             onChange={handleSecondaryInteriorCarpentryToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Helpers/Labourers Skills */}
//                 {data.secondaryTrade === 'Helpers/Labourers' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Lead Helper') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Helpers/Labourers ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'LH'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {HELPERS_LABOURERS_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryHelpersLabourersSkills?.[skill] || false)}
//                             onChange={handleSecondaryHelpersLabourersToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Insulation Skills */}
//                 {data.secondaryTrade === 'Insulation' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Insulation ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {INSULATION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryInsulationSkills?.[skill] || false)}
//                             onChange={handleSecondaryInsulationToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* Secondary Demolition/Punch/Final Clean Skills */}
//                 {data.secondaryTrade === 'Demolition/Punch/Final Clean' && 
//                  (data.secondaryWorkerLevel === 'Helper' || data.secondaryWorkerLevel === 'Mechanic') && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       Demolition/Punch/Final Clean ({data.secondaryWorkerLevel === 'Helper' ? 'H' : 'M'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>Skills</div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {DEMOLITION_SKILLS.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(data.secondaryDemolitionSkills?.[skill] || false)}
//                             onChange={handleSecondaryDemolitionToggle(skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </>
//             )}

//             {/* Secondary Lead/Foreman Responsibilities */}
//             {!isDuplicate && !isSecondaryOther && (data.secondaryWorkerLevel === 'Lead' || data.secondaryWorkerLevel === 'Lead/Foreman') && (
//               <fieldset style={{
//                 marginTop: 16,
//                 padding: '16px 20px 20px 20px',
//                 border: '1px solid rgba(15, 78, 169, 0.2)',
//                 borderRadius: '12px',
//                 background: 'rgba(15, 78, 169, 0.03)',
//                 position: 'relative',
//               }}>
//                 <legend style={{
//                   padding: '0 12px',
//                   fontSize: '14px',
//                   fontWeight: 600,
//                   color: '#0f4ea9',
//                   background: 'white',
//                   borderRadius: '8px',
//                   marginLeft: '8px',
//                 }}>
//                   {data.secondaryWorkerLevel === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                 </legend>

//                 <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                   {LEAD_FOREMAN_RESPONSIBILITIES.map((responsibility) => (
//                     <label key={responsibility} className="wizardCheck">
//                       <input
//                         type="checkbox"
//                         checked={!!(data.secondaryLeadForemanResponsibilities?.[responsibility] || false)}
//                         onChange={handleSecondaryResponsibilityToggle(responsibility)}
//                       />
//                       {responsibility}
//                     </label>
//                   ))}
//                 </div>
//               </fieldset>
//             )}

//             {/* Additional Skills/Tools/Systems Text Area */}
//             <div style={{ marginTop: 16 }}>
//               <div style={{ 
//                 fontSize: '14px', 
//                 fontWeight: 600, 
//                 color: '#17263a', 
//                 marginBottom: 8 
//               }}>
//                 Additional Skills / Tools / Systems
//               </div>
//               <textarea
//                 className="wizardTextArea"
//                 value={data.additionalSkillsTools || ''}
//                 onChange={handleAdditionalSkillsChange}
//                 placeholder="Enter additional skills, tools, or systems you have experience with..."
//                 rows={4}
//                 style={{
//                   width: '100%',
//                   padding: '12px 16px',
//                   border: '1px solid rgba(18, 38, 63, 0.12)',
//                   borderRadius: '12px',
//                   fontSize: '14px',
//                   fontFamily: 'inherit',
//                   resize: 'vertical',
//                   outline: 'none',
//                   transition: 'all 0.2s ease',
//                   background: 'white',
//                   color: '#17263a',
//                   minHeight: '100px',
//                 }}
//                 onFocus={(e) => {
//                   e.target.style.borderColor = '#0f4ea9'
//                   e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//                 }}
//                 onBlur={(e) => {
//                   e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                   e.target.style.boxShadow = 'none'
//                 }}
//               />
//               <div style={{ 
//                 fontSize: '11px', 
//                 color: 'rgba(23, 38, 58, 0.5)', 
//                 marginTop: '4px',
//                 textAlign: 'right'
//               }}>
//                 {data.additionalSkillsTools?.length || 0} characters
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }






// // src/worker/components/wizard-steps/WizardStep2.jsx
// import { useState } from 'react'
// import { SelectField, TextField } from '../../../common/components/TextField'

// const TRADE_LEVEL_MAP = {
//   'Metal Framing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Drywall Hanging': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Taping/Finishing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Acoustical Ceilings': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Interior Carpentry': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Helpers/Labourers': [
//     'Helper',
//     'Lead Helper',
//   ],
//   'Insulation': [
//     'Helper',
//     'Mechanic',
//     'Lead',
//   ],
//   'Demolition/Punch/Final Clean': [
//     'Helper',
//     'Mechanic',
//   ],
//   'Leads/Foremen': [
//     'Lead/Foreman',
//   ],
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

// // ✅ Helper function to get trade level options
// const getTradeLevels = (trade) => {
//   return TRADE_LEVEL_MAP[trade] || []
// }

// // ✅ Helper function to check if trade is "Other"
// const isOtherTrade = (trade) => {
//   return trade === 'Other'
// }

// // ✅ Helper function to check if level should show trade skills
// const shouldShowTradeSkills = (level) => {
//   if (level === 'Lead' || level === 'Lead/Foreman') {
//     return false
//   }
//   return true
// }

// // ✅ Helper function to get skill options for a trade
// const getTradeSkills = (trade) => {
//   const skillMap = {
//     'Metal Framing': METAL_FRAMING_SKILLS,
//     'Drywall Hanging': DRYWALL_HANGING_SKILLS,
//     'Taping/Finishing': TAPING_FINISHING_SKILLS,
//     'Acoustical Ceilings': ACOUSTICAL_CEILINGS_SKILLS,
//     'Interior Carpentry': INTERIOR_CARPENTRY_SKILLS,
//     'Helpers/Labourers': HELPERS_LABOURERS_SKILLS,
//     'Insulation': INSULATION_SKILLS,
//     'Demolition/Punch/Final Clean': DEMOLITION_SKILLS,
//   }
//   return skillMap[trade] || []
// }

// // ✅ Helper function to get responsibilities for Lead/Foreman
// const getLeadResponsibilities = (trade) => {
//   return LEAD_FOREMAN_RESPONSIBILITIES
// }

// // ✅ Create initial trade row
// const createInitialTradeRow = () => ({
//   id: Date.now().toString(),
//   trade: '',
//   otherTrade: '',
//   level: '',
//   experience: '',
//   skills: {},
//   responsibilities: {},
// })

// export function WizardStep2({ data, onChange, onNext, onBack }) {
//   // ✅ State for dynamic trade rows
//   const [tradeRows, setTradeRows] = useState(() => {
//     // If there's existing data, load it
//     if (data.tradeRows && data.tradeRows.length > 0) {
//       return data.tradeRows
//     }
//     // Otherwise, start with one empty row
//     return [createInitialTradeRow()]
//   })

//   // ✅ Handle change for a specific trade row
//   const handleTradeRowChange = (rowId, field, value) => {
//     const updatedRows = tradeRows.map(row => {
//       if (row.id === rowId) {
//         // If trade changes, reset level, skills, and responsibilities
//         if (field === 'trade') {
//           return {
//             ...row,
//             trade: value,
//             otherTrade: '',
//             level: '',
//             skills: {},
//             responsibilities: {},
//           }
//         }
//         return { ...row, [field]: value }
//       }
//       return row
//     })
    
//     setTradeRows(updatedRows)
//     // ✅ Update parent component's data
//     onChange({ tradeRows: updatedRows })
//   }

//   // ✅ Handle skill toggle for a specific trade row
//   const handleSkillToggle = (rowId, skill) => (e) => {
//     const updatedRows = tradeRows.map(row => {
//       if (row.id === rowId) {
//         return {
//           ...row,
//           skills: {
//             ...row.skills,
//             [skill]: e.target.checked,
//           }
//         }
//       }
//       return row
//     })
    
//     setTradeRows(updatedRows)
//     onChange({ tradeRows: updatedRows })
//   }

//   // ✅ Handle responsibility toggle for a specific trade row
//   const handleResponsibilityToggle = (rowId, responsibility) => (e) => {
//     const updatedRows = tradeRows.map(row => {
//       if (row.id === rowId) {
//         return {
//           ...row,
//           responsibilities: {
//             ...row.responsibilities,
//             [responsibility]: e.target.checked,
//           }
//         }
//       }
//       return row
//     })
    
//     setTradeRows(updatedRows)
//     onChange({ tradeRows: updatedRows })
//   }

//   // ✅ Add new trade row (max 40)
//   const addTradeRow = () => {
//     if (tradeRows.length < 40) {
//       const newRow = createInitialTradeRow()
//       const updatedRows = [...tradeRows, newRow]
//       setTradeRows(updatedRows)
//       onChange({ tradeRows: updatedRows })
//     }
//   }

//   // ✅ Remove trade row (minimum 1)
//   const removeTradeRow = (rowId) => {
//     if (tradeRows.length > 1) {
//       const updatedRows = tradeRows.filter(row => row.id !== rowId)
//       setTradeRows(updatedRows)
//       onChange({ tradeRows: updatedRows })
//     }
//   }

//   // ✅ Get all trade options
//   const getTradeOptions = () => {
//     return Object.keys(TRADE_LEVEL_MAP)
//   }

//   // ✅ Get level options for a trade
//   const getLevelOptions = (trade) => {
//     return getTradeLevels(trade)
//   }

//   // ✅ Check if trade is "Other"
//   const isOther = (trade) => {
//     return isOtherTrade(trade)
//   }

//   // ✅ Get skills for a trade
//   const getSkills = (trade) => {
//     return getTradeSkills(trade)
//   }

//   // ✅ Check if level should show skills
//   const shouldShowSkills = (level) => {
//     return shouldShowTradeSkills(level)
//   }

//   // ✅ Get responsibilities for Lead/Foreman
//   const getResponsibilities = (trade) => {
//     return getLeadResponsibilities(trade)
//   }

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Trade Profile & Skill Matrix</div>

//           {/* ✅ Dynamic Trade Rows */}
//           {tradeRows.map((row, index) => {
//             const isOther = row.trade === 'Other'
//             const levels = getLevelOptions(row.trade)
//             const skills = getSkills(row.trade)
//             const showSkills = row.trade && row.level && shouldShowSkills(row.level)
//             const showResponsibilities = row.trade && (row.level === 'Lead' || row.level === 'Lead/Foreman')
//             const responsibilities = getResponsibilities(row.trade)
//             const rowNumber = index + 1

//             return (
//               <div key={row.id} style={{ 
//                 marginBottom: index < tradeRows.length - 1 ? '32px' : '16px',
//                 padding: '16px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//                 borderRadius: '12px',
//                 background: index % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
//                 position: 'relative'
//               }}>
//                 {/* ✅ Row Header with Number and Delete Button */}
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: '12px'
//                 }}>
//                   <div style={{
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                   }}>
//                     Trade #{rowNumber}
//                   </div>
//                   {tradeRows.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeTradeRow(row.id)}
//                       style={{
//                         background: 'none',
//                         border: 'none',
//                         color: '#dc2626',
//                         cursor: 'pointer',
//                         fontSize: '14px',
//                         padding: '4px 12px',
//                         borderRadius: '6px',
//                         transition: 'background 0.2s',
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = 'rgba(220, 38, 38, 0.08)'
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = 'transparent'
//                       }}
//                     >
//                       ✕ Remove Trade
//                     </button>
//                   )}
//                 </div>

//                 {/* ✅ Trade Selection Row */}
//                 <div className="wizardGrid3">
//                   <SelectField
//                     label=""
//                     value={row.trade || ''}
//                     onChange={(value) => handleTradeRowChange(row.id, 'trade', value)}
//                   >
//                     <option value="">Select Trade</option>
//                     {getTradeOptions().map((trade) => (
//                       <option key={trade} value={trade}>
//                         {trade}
//                       </option>
//                     ))}
//                   </SelectField>

//                   {isOther ? (
//                     <TextField
//                       label=""
//                       value={row.otherTrade || ''}
//                       onChange={(value) => handleTradeRowChange(row.id, 'otherTrade', value)}
//                       placeholder="Enter Custom Trade"
//                     />
//                   ) : (
//                     <SelectField
//                       label=""
//                       value={row.level || ''}
//                       disabled={!row.trade}
//                       onChange={(value) => handleTradeRowChange(row.id, 'level', value)}
//                     >
//                       <option value="">Select Worker Level</option>
//                       {levels.map((level) => (
//                         <option key={level} value={level}>
//                           {level}
//                         </option>
//                       ))}
//                     </SelectField>
//                   )}

//                   <TextField
//                     label=""
//                     type="number"
//                     min="0"
//                     value={row.experience || ''}
//                     onChange={(value) => handleTradeRowChange(row.id, 'experience', value)}
//                     placeholder="Enter years"
//                   />
//                 </div>

//                 {/* ✅ Show custom trade input when "Other" is selected */}
//                 {isOther && row.otherTrade && (
//                   <div style={{
//                     marginTop: 8,
//                     fontSize: '13px',
//                     color: '#0f4ea9',
//                     fontWeight: 500,
//                     padding: '8px 12px',
//                     background: 'rgba(15, 78, 169, 0.05)',
//                     borderRadius: '8px',
//                     border: '1px solid rgba(15, 78, 169, 0.1)',
//                   }}>
//                     Custom Trade: {row.otherTrade}
//                   </div>
//                 )}

//                 {/* ✅ Trade Skills */}
//                 {showSkills && skills.length > 0 && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       {row.trade} Skills ({row.level === 'Helper' ? 'H' : row.level === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>
//                       Skills for {row.trade} - {row.level} Level
//                     </div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {skills.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(row.skills?.[skill] || false)}
//                             onChange={handleSkillToggle(row.id, skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* ✅ Lead/Foreman Responsibilities */}
//                 {showResponsibilities && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       {row.level === 'Lead' ? 'Lead Responsibilities' : 'Lead/Foreman Responsibilities'}
//                     </legend>

//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {responsibilities.map((responsibility) => (
//                         <label key={responsibility} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(row.responsibilities?.[responsibility] || false)}
//                             onChange={handleResponsibilityToggle(row.id, responsibility)}
//                           />
//                           {responsibility}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </div>
//             )
//           })}

//           {/* ✅ Add Trade Button */}
//           <div style={{ 
//             marginTop: '16px',
//             display: 'flex',
//             justifyContent: 'center'
//           }}>
//             <button
//               type="button"
//               onClick={addTradeRow}
//               disabled={tradeRows.length >= 40}
//               style={{
//                 padding: '10px 24px',
//                 background: tradeRows.length >= 40 ? '#94a3b8' : 'rgba(15, 78, 169, 0.08)',
//                 color: tradeRows.length >= 40 ? '#94a3b8' : '#0f4ea9',
//                 border: `1px solid ${tradeRows.length >= 40 ? '#94a3b8' : 'rgba(15, 78, 169, 0.2)'}`,
//                 borderRadius: '8px',
//                 cursor: tradeRows.length >= 40 ? 'not-allowed' : 'pointer',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 transition: 'all 0.2s',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}
//               onMouseEnter={(e) => {
//                 if (tradeRows.length < 40) {
//                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.15)'
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (tradeRows.length < 40) {
//                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'
//                 }
//               }}
//             >
//               <span style={{ fontSize: '18px' }}>+</span>
//               Add Trade 
//             </button>
//           </div>

//           {/* ✅ Additional Skills/Tools/Systems Text Area */}
//           <div style={{ marginTop: '24px' }}>
//             <div style={{ 
//               fontSize: '14px', 
//               fontWeight: 600, 
//               color: '#17263a', 
//               marginBottom: 8 
//             }}>
//               Additional Skills / Tools / Systems
//             </div>
//             <textarea
//               className="wizardTextArea"
//               value={data.additionalSkillsTools || ''}
//               onChange={(e) => onChange({ additionalSkillsTools: e.target.value })}
//               placeholder="Enter additional skills, tools, or systems you have experience with..."
//               rows={4}
//               style={{
//                 width: '100%',
//                 padding: '12px 16px',
//                 border: '1px solid rgba(18, 38, 63, 0.12)',
//                 borderRadius: '12px',
//                 fontSize: '14px',
//                 fontFamily: 'inherit',
//                 resize: 'vertical',
//                 outline: 'none',
//                 transition: 'all 0.2s ease',
//                 background: 'white',
//                 color: '#17263a',
//                 minHeight: '100px',
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = '#0f4ea9'
//                 e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                 e.target.style.boxShadow = 'none'
//               }}
//             />
//             <div style={{ 
//               fontSize: '11px', 
//               color: 'rgba(23, 38, 58, 0.5)', 
//               marginTop: '4px',
//               textAlign: 'right'
//             }}>
//               {data.additionalSkillsTools?.length || 0} characters
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }












// // src/worker/components/wizard-steps/WizardStep2.jsx
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { SelectField, TextField } from '../../../common/components/TextField'

// const TRADE_LEVEL_MAP = {
//   'Metal Framing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Drywall Hanging': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Taping/Finishing': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Acoustical Ceilings': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Interior Carpentry': [
//     'Helper',
//     'Mechanic',
//     'Advanced Mechanic',
//     'Lead/Foreman',
//   ],
//   'Helpers/Labourers': [
//     'Helper',
//     'Lead Helper',
//   ],
//   'Insulation': [
//     'Helper',
//     'Mechanic',
//     'Lead',
//   ],
//   'Demolition/Punch/Final Clean': [
//     'Helper',
//     'Mechanic',
//   ],
//   'Leads/Foremen': [
//     'Lead/Foreman',
//   ],
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

// // ✅ Helper function to get trade level options
// const getTradeLevels = (trade) => {
//   return TRADE_LEVEL_MAP[trade] || []
// }

// // ✅ Helper function to check if trade is "Other"
// const isOtherTrade = (trade) => {
//   return trade === 'Other'
// }

// // ✅ Helper function to check if level should show trade skills
// const shouldShowTradeSkills = (level) => {
//   if (level === 'Lead' || level === 'Lead/Foreman') {
//     return false
//   }
//   return true
// }

// // ✅ Helper function to get skill options for a trade
// const getTradeSkills = (trade) => {
//   const skillMap = {
//     'Metal Framing': METAL_FRAMING_SKILLS,
//     'Drywall Hanging': DRYWALL_HANGING_SKILLS,
//     'Taping/Finishing': TAPING_FINISHING_SKILLS,
//     'Acoustical Ceilings': ACOUSTICAL_CEILINGS_SKILLS,
//     'Interior Carpentry': INTERIOR_CARPENTRY_SKILLS,
//     'Helpers/Labourers': HELPERS_LABOURERS_SKILLS,
//     'Insulation': INSULATION_SKILLS,
//     'Demolition/Punch/Final Clean': DEMOLITION_SKILLS,
//   }
//   return skillMap[trade] || []
// }

// // ✅ Helper function to get responsibilities for Lead/Foreman
// const getLeadResponsibilities = (trade) => {
//   return LEAD_FOREMAN_RESPONSIBILITIES
// }

// // ✅ Create initial trade row
// const createInitialTradeRow = () => ({
//   id: Date.now().toString(),
//   trade: '',
//   otherTrade: '',
//   level: '',
//   experience: '',
//   skills: {},
//   responsibilities: {},
// })

// export function WizardStep2({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ State for dynamic trade rows
//   const [tradeRows, setTradeRows] = useState(() => {
//     // If there's existing data, load it
//     if (data.tradeRows && data.tradeRows.length > 0) {
//       return data.tradeRows
//     }
//     // Otherwise, start with one empty row
//     return [createInitialTradeRow()]
//   })

//   // ✅ Handle change for a specific trade row
//   const handleTradeRowChange = (rowId, field, value) => {
//     const updatedRows = tradeRows.map(row => {
//       if (row.id === rowId) {
//         // If trade changes, reset level, skills, and responsibilities
//         if (field === 'trade') {
//           return {
//             ...row,
//             trade: value,
//             otherTrade: '',
//             level: '',
//             skills: {},
//             responsibilities: {},
//           }
//         }
//         return { ...row, [field]: value }
//       }
//       return row
//     })
    
//     setTradeRows(updatedRows)
//     // ✅ Update parent component's data
//     onChange({ tradeRows: updatedRows })
//   }

//   // ✅ Handle skill toggle for a specific trade row
//   const handleSkillToggle = (rowId, skill) => (e) => {
//     const updatedRows = tradeRows.map(row => {
//       if (row.id === rowId) {
//         return {
//           ...row,
//           skills: {
//             ...row.skills,
//             [skill]: e.target.checked,
//           }
//         }
//       }
//       return row
//     })
    
//     setTradeRows(updatedRows)
//     onChange({ tradeRows: updatedRows })
//   }

//   // ✅ Handle responsibility toggle for a specific trade row
//   const handleResponsibilityToggle = (rowId, responsibility) => (e) => {
//     const updatedRows = tradeRows.map(row => {
//       if (row.id === rowId) {
//         return {
//           ...row,
//           responsibilities: {
//             ...row.responsibilities,
//             [responsibility]: e.target.checked,
//           }
//         }
//       }
//       return row
//     })
    
//     setTradeRows(updatedRows)
//     onChange({ tradeRows: updatedRows })
//   }

//   // ✅ Add new trade row (max 40)
//   const addTradeRow = () => {
//     if (tradeRows.length < 40) {
//       const newRow = createInitialTradeRow()
//       const updatedRows = [...tradeRows, newRow]
//       setTradeRows(updatedRows)
//       onChange({ tradeRows: updatedRows })
//     }
//   }

//   // ✅ Remove trade row (minimum 1)
//   const removeTradeRow = (rowId) => {
//     if (tradeRows.length > 1) {
//       const updatedRows = tradeRows.filter(row => row.id !== rowId)
//       setTradeRows(updatedRows)
//       onChange({ tradeRows: updatedRows })
//     }
//   }

//   // ✅ Get all trade options
//   const getTradeOptions = () => {
//     return Object.keys(TRADE_LEVEL_MAP)
//   }

//   // ✅ Get level options for a trade
//   const getLevelOptions = (trade) => {
//     return getTradeLevels(trade)
//   }

//   // ✅ Check if trade is "Other"
//   const isOther = (trade) => {
//     return isOtherTrade(trade)
//   }

//   // ✅ Get skills for a trade
//   const getSkills = (trade) => {
//     return getTradeSkills(trade)
//   }

//   // ✅ Check if level should show skills
//   const shouldShowSkills = (level) => {
//     return shouldShowTradeSkills(level)
//   }

//   // ✅ Get responsibilities for Lead/Foreman
//   const getResponsibilities = (trade) => {
//     return getLeadResponsibilities(trade)
//   }

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step2.title')}</div>

//           {/* ✅ Dynamic Trade Rows */}
//           {tradeRows.map((row, index) => {
//             const isOther = row.trade === 'Other'
//             const levels = getLevelOptions(row.trade)
//             const skills = getSkills(row.trade)
//             const showSkills = row.trade && row.level && shouldShowSkills(row.level)
//             const showResponsibilities = row.trade && (row.level === 'Lead' || row.level === 'Lead/Foreman')
//             const responsibilities = getResponsibilities(row.trade)
//             const rowNumber = index + 1

//             return (
//               <div key={row.id} style={{ 
//                 marginBottom: index < tradeRows.length - 1 ? '32px' : '16px',
//                 padding: '16px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//                 borderRadius: '12px',
//                 background: index % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
//                 position: 'relative'
//               }}>
//                 {/* ✅ Row Header with Number and Delete Button */}
//                 <div style={{
//                   display: 'flex',
//                   justifyContent: 'space-between',
//                   alignItems: 'center',
//                   marginBottom: '12px'
//                 }}>
//                   <div style={{
//                     fontSize: '14px',
//                     fontWeight: 600,
//                     color: '#17263a',
//                   }}>
//                     {t('wizard.step2.trade')} #{rowNumber}
//                   </div>
//                   {tradeRows.length > 1 && (
//                     <button
//                       type="button"
//                       onClick={() => removeTradeRow(row.id)}
//                       style={{
//                         background: 'none',
//                         border: 'none',
//                         color: '#dc2626',
//                         cursor: 'pointer',
//                         fontSize: '14px',
//                         padding: '4px 12px',
//                         borderRadius: '6px',
//                         transition: 'background 0.2s',
//                       }}
//                       onMouseEnter={(e) => {
//                         e.currentTarget.style.background = 'rgba(220, 38, 38, 0.08)'
//                       }}
//                       onMouseLeave={(e) => {
//                         e.currentTarget.style.background = 'transparent'
//                       }}
//                     >
//                       ✕ {t('wizard.step2.removeTrade')}
//                     </button>
//                   )}
//                 </div>

//                 {/* ✅ Trade Selection Row */}
//                 <div className="wizardGrid3">
//                   <SelectField
//                     label=""
//                     value={row.trade || ''}
//                     onChange={(value) => handleTradeRowChange(row.id, 'trade', value)}
//                   >
//                     <option value="">{t('wizard.step2.selectTrade')}</option>
//                     {getTradeOptions().map((trade) => (
//                       <option key={trade} value={trade}>
//                         {trade}
//                       </option>
//                     ))}
//                   </SelectField>

//                   {isOther ? (
//                     <TextField
//                       label=""
//                       value={row.otherTrade || ''}
//                       onChange={(value) => handleTradeRowChange(row.id, 'otherTrade', value)}
//                       placeholder={t('wizard.step2.enterCustomTrade')}
//                     />
//                   ) : (
//                     <SelectField
//                       label=""
//                       value={row.level || ''}
//                       disabled={!row.trade}
//                       onChange={(value) => handleTradeRowChange(row.id, 'level', value)}
//                     >
//                       <option value="">{t('wizard.step2.selectWorkerLevel')}</option>
//                       {levels.map((level) => (
//                         <option key={level} value={level}>
//                           {level}
//                         </option>
//                       ))}
//                     </SelectField>
//                   )}

//                   <TextField
//                     label=""
//                     type="number"
//                     min="0"
//                     value={row.experience || ''}
//                     onChange={(value) => handleTradeRowChange(row.id, 'experience', value)}
//                     placeholder={t('wizard.step2.enterYears')}
//                   />
//                 </div>

//                 {/* ✅ Show custom trade input when "Other" is selected */}
//                 {isOther && row.otherTrade && (
//                   <div style={{
//                     marginTop: 8,
//                     fontSize: '13px',
//                     color: '#0f4ea9',
//                     fontWeight: 500,
//                     padding: '8px 12px',
//                     background: 'rgba(15, 78, 169, 0.05)',
//                     borderRadius: '8px',
//                     border: '1px solid rgba(15, 78, 169, 0.1)',
//                   }}>
//                     {t('wizard.step2.customTrade')}: {row.otherTrade}
//                   </div>
//                 )}

//                 {/* ✅ Trade Skills */}
//                 {showSkills && skills.length > 0 && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       {row.trade} {t('wizard.step2.skills')} ({row.level === 'Helper' ? 'H' : row.level === 'Mechanic' ? 'M' : 'A'})
//                     </legend>
//                     <div style={{ fontSize: '12px', color: 'rgba(23,38,58,0.5)', marginBottom: 12, marginTop: 4, fontWeight: 500 }}>
//                       {t('wizard.step2.skills')} {row.trade} - {row.level} {t('wizard.step2.selectWorkerLevel')}
//                     </div>
//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {skills.map((skill) => (
//                         <label key={skill} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(row.skills?.[skill] || false)}
//                             onChange={handleSkillToggle(row.id, skill)}
//                           />
//                           {skill}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}

//                 {/* ✅ Lead/Foreman Responsibilities */}
//                 {showResponsibilities && (
//                   <fieldset style={{
//                     marginTop: 16,
//                     padding: '16px 20px 20px 20px',
//                     border: '1px solid rgba(15, 78, 169, 0.2)',
//                     borderRadius: '12px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     position: 'relative',
//                   }}>
//                     <legend style={{
//                       padding: '0 12px',
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'white',
//                       borderRadius: '8px',
//                       marginLeft: '8px',
//                     }}>
//                       {row.level === 'Lead' ? t('wizard.step2.leadResponsibilities') : t('wizard.step2.foremanResponsibilities')}
//                     </legend>

//                     <div className="wizardGrid2" style={{ marginTop: 4 }}>
//                       {responsibilities.map((responsibility) => (
//                         <label key={responsibility} className="wizardCheck">
//                           <input
//                             type="checkbox"
//                             checked={!!(row.responsibilities?.[responsibility] || false)}
//                             onChange={handleResponsibilityToggle(row.id, responsibility)}
//                           />
//                           {responsibility}
//                         </label>
//                       ))}
//                     </div>
//                   </fieldset>
//                 )}
//               </div>
//             )
//           })}

//           {/* ✅ Add Trade Button */}
//           <div style={{ 
//             marginTop: '16px',
//             display: 'flex',
//             justifyContent: 'center'
//           }}>
//             <button
//               type="button"
//               onClick={addTradeRow}
//               disabled={tradeRows.length >= 40}
//               style={{
//                 padding: '10px 24px',
//                 background: tradeRows.length >= 40 ? '#94a3b8' : 'rgba(15, 78, 169, 0.08)',
//                 color: tradeRows.length >= 40 ? '#94a3b8' : '#0f4ea9',
//                 border: `1px solid ${tradeRows.length >= 40 ? '#94a3b8' : 'rgba(15, 78, 169, 0.2)'}`,
//                 borderRadius: '8px',
//                 cursor: tradeRows.length >= 40 ? 'not-allowed' : 'pointer',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 transition: 'all 0.2s',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '8px'
//               }}
//               onMouseEnter={(e) => {
//                 if (tradeRows.length < 40) {
//                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.15)'
//                 }
//               }}
//               onMouseLeave={(e) => {
//                 if (tradeRows.length < 40) {
//                   e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'
//                 }
//               }}
//             >
//               <span style={{ fontSize: '18px' }}>+</span>
//               {t('wizard.step2.addTrade')}
//             </button>
//           </div>

//           {/* ✅ Additional Skills/Tools/Systems Text Area */}
//           <div style={{ marginTop: '24px' }}>
//             <div style={{ 
//               fontSize: '14px', 
//               fontWeight: 600, 
//               color: '#17263a', 
//               marginBottom: 8 
//             }}>
//               {t('wizard.step2.additionalSkills')}
//             </div>
//             <textarea
//               className="wizardTextArea"
//               value={data.additionalSkillsTools || ''}
//               onChange={(e) => onChange({ additionalSkillsTools: e.target.value })}
//               placeholder={t('wizard.step2.additionalSkillsPlaceholder') || 'Enter additional skills, tools, or systems you have experience with...'}
//               rows={4}
//               style={{
//                 width: '100%',
//                 padding: '12px 16px',
//                 border: '1px solid rgba(18, 38, 63, 0.12)',
//                 borderRadius: '12px',
//                 fontSize: '14px',
//                 fontFamily: 'inherit',
//                 resize: 'vertical',
//                 outline: 'none',
//                 transition: 'all 0.2s ease',
//                 background: 'white',
//                 color: '#17263a',
//                 minHeight: '100px',
//               }}
//               onFocus={(e) => {
//                 e.target.style.borderColor = '#0f4ea9'
//                 e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
//               }}
//               onBlur={(e) => {
//                 e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
//                 e.target.style.boxShadow = 'none'
//               }}
//             />
//             <div style={{ 
//               fontSize: '11px', 
//               color: 'rgba(23, 38, 58, 0.5)', 
//               marginTop: '4px',
//               textAlign: 'right'
//             }}>
//               {data.additionalSkillsTools?.length || 0} {t('wizard.step2.characters') || 'characters'}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep2


// src/worker/components/wizard-steps/WizardStep2.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SelectField } from '../../../common/components/TextField'

// ✅ MAIN TRADES from PDF
const MAIN_TRADES = [
  'Interiors',
  'HVAC/Mechanical',
  'Electrical / Power',
  'Plumbing / Piping',
  'Concrete / Formwork / Rebar / Flatwork',
  'Civil / Sitework / Earthwork / Utilities',
  'Asphalt / Paving Work',
  'Landscaping / Exterior Improvements',
  'Roofing / Waterproofing',
  'General Labor / Site Support / Material Handling',
  'Demolition / Selective Demo / Abatement Support',
  'Masonry / Stucco / EIFS Systems',
  'Structural Steel / Misc. Metals / Welding',
  'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems',
  'Millwork / Cabinets / Finish Carpentry',
  'Flooring / Tile / Resilient / Carpet Systems',
  'Painting / Coatings / Wallcovering Systems',
  'Doors / Frames / Hardware / Openings Systems',
  'Glass / Glazing / Storefront',
  'Fire Protection / Sprinkler Systems',
  'Firestopping / Fireproofing / Joint Sealants',
  'Low Voltage / Data / Security / Fire Alarm',
  'Division 10 Specialties / Accessories / Signage Systems',
  'Equipment / Specialty Installations / Owner-Furnished Equipment Systems',
]

// ✅ SKILL GROUPS mapped to each Main Trade
const SKILL_GROUPS = {
  'Interiors': [
    'Metal Framing',
    'Drywall Hanging',
    'Taping/Finishing',
    'Acoustical Ceilings',
    'Interior Carpentry',
    'Insulation',
    'Demolition/Punch/Final Clean',
  ],
  'HVAC/Mechanical': [
    'HVAC Installation',
    'Ductwork',
    'Mechanical Piping',
    'Refrigeration',
    'HVAC Controls',
  ],
  'Electrical / Power': [
    'Electrical Wiring',
    'Power Distribution',
    'Lighting Installation',
    'Panel Installation',
    'Conduit Installation',
  ],
  'Plumbing / Piping': [
    'Pipe Installation',
    'Plumbing Fixtures',
    'Water Supply',
    'Drainage Systems',
    'Pipe Fitting',
  ],
  'Concrete / Formwork / Rebar / Flatwork': [
    'Formwork',
    'Rebar Installation',
    'Concrete Pouring',
    'Flatwork',
    'Stamped Concrete',
  ],
  'Civil / Sitework / Earthwork / Utilities': [
    'Earthwork',
    'Utilities Installation',
    'Trenching',
    'Site Grading',
    'Storm Drainage',
  ],
  'Asphalt / Paving Work': [
    'Asphalt Paving',
    'Sealcoating',
    'Patching',
    'Striping',
  ],
  'Landscaping / Exterior Improvements': [
    'Landscape Installation',
    'Irrigation',
    'Hardscaping',
    'Sod Installation',
  ],
  'Roofing / Waterproofing': [
    'Roof Installation',
    'Waterproofing',
    'Membrane Installation',
    'Flashing',
  ],
  'General Labor / Site Support / Material Handling': [
    'Material Movement',
    'Site Cleanup',
    'Equipment Operation',
    'Site Support',
  ],
  'Demolition / Selective Demo / Abatement Support': [
    'Demolition',
    'Selective Demolition',
    'Abatement Support',
    'Waste Removal',
  ],
  'Masonry / Stucco / EIFS Systems': [
    'Masonry',
    'Stucco Application',
    'EIFS Systems',
    'Stone Installation',
  ],
  'Structural Steel / Misc. Metals / Welding': [
    'Structural Steel',
    'Misc. Metals',
    'Welding',
    'Bolt Up',
  ],
  'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems': [
    'Rough Carpentry',
    'Wood Framing',
    'Blocking Systems',
    'Roof Framing',
  ],
  'Millwork / Cabinets / Finish Carpentry': [
    'Millwork',
    'Cabinets Installation',
    'Finish Carpentry',
    'Trim Installation',
  ],
  'Flooring / Tile / Resilient / Carpet Systems': [
    'Flooring Installation',
    'Tile Installation',
    'Carpet Installation',
    'Resilient Flooring',
  ],
  'Painting / Coatings / Wallcovering Systems': [
    'Painting',
    'Coatings Application',
    'Wallcovering',
    'Spray Painting',
  ],
  'Doors / Frames / Hardware / Openings Systems': [
    'Door Installation',
    'Frame Installation',
    'Hardware Installation',
    'Openings Systems',
  ],
  'Glass / Glazing / Storefront': [
    'Glass Installation',
    'Storefront Systems',
    'Curtain Wall',
    'Glazing',
  ],
  'Fire Protection / Sprinkler Systems': [
    'Sprinkler Installation',
    'Fire Pumps',
    'Standpipe Systems',
    'Fire Alarm',
  ],
  'Firestopping / Fireproofing / Joint Sealants': [
    'Firestopping',
    'Fireproofing',
    'Joint Sealants',
    'Penetration Sealing',
  ],
  'Low Voltage / Data / Security / Fire Alarm': [
    'Data Cabling',
    'Security Systems',
    'Fire Alarm',
    'Access Control',
  ],
  'Division 10 Specialties / Accessories / Signage Systems': [
    'Specialties Installation',
    'Accessories',
    'Signage Installation',
  ],
  'Equipment / Specialty Installations / Owner-Furnished Equipment Systems': [
    'Equipment Installation',
    'Specialty Installations',
    'Owner-Furnished Equipment',
  ],
}

// ✅ SKILL DETAILS mapped to each Skill Group
const SKILL_DETAILS = {
  'Metal Framing': [
    'Layout walls',
    'Install top/bottom track',
    'Install metal studs',
    'Frame soffits',
    'Frame ceilings',
    'Install backing/blocking',
    'Read basic layout',
    'Use laser/level',
    'Fire-rated framing',
  ],
  'Drywall Hanging': [
    'Hang walls',
    'Hang ceilings',
    'Fire-rated board',
    'Abuse board',
    'Shaft-wall board',
    'High walls',
    'Production hanging',
    'Lift work',
    'Blueprint reading',
  ],
  'Taping/Finishing': [
    'Level 1-5 finish',
    'Skim coat',
    'Texture match',
    'Punch repair',
    'Corner bead systems',
    'Smooth finish',
  ],
  'Acoustical Ceilings': [
    'Standard grid',
    'Tegular',
    'Specialty ceilings',
    'Clouds/baffles',
    'Seismic requirements',
    'Light/HVAC/sprinkler coordination',
  ],
  'Interior Carpentry': [
    'Backing',
    'Blocking',
    'Doors/frames/hardware support',
    'Trim/carpentry',
    'Finish carpentry',
  ],
  'Insulation': [
    'Wall Insulation',
    'Bat Insulation',
    'Sound Insulation',
    'Specialty Insulation',
  ],
  'Demolition/Punch/Final Clean': [
    'Demolition',
    'Removal Support',
    'Clean up',
    'Punch work',
    'Final clean',
    'Closeout Support',
  ],
  'HVAC Installation': [
    'Install HVAC units',
    'Connect ductwork',
    'Set thermostats',
    'Test HVAC systems',
    'Charge refrigerant',
  ],
  'Ductwork': [
    'Fabricate ductwork',
    'Install ductwork',
    'Insulate ductwork',
    'Seal ductwork',
  ],
  'Mechanical Piping': [
    'Install piping',
    'Weld piping',
    'Thread pipe',
    'Test piping systems',
  ],
  'Refrigeration': [
    'Install refrigeration systems',
    'Charge systems',
    'Test refrigeration',
  ],
  'HVAC Controls': [
    'Install control panels',
    'Wire controls',
    'Test control systems',
  ],
  'Electrical Wiring': [
    'Install wiring',
    'Connect to panel',
    'Pull wire',
    'Terminate wire',
  ],
  'Power Distribution': [
    'Set panels',
    'Install breakers',
    'Run feeders',
    'Connect transformers',
  ],
  'Lighting Installation': [
    'Install light fixtures',
    'Wire lights',
    'Mount emergency lights',
  ],
  'Panel Installation': [
    'Set electrical panels',
    'Wire main panel',
    'Install subpanels',
  ],
  'Conduit Installation': [
    'Install conduit',
    'Bend conduit',
    'Run MC cable',
    'Use bender tools',
  ],
  'Pipe Installation': [
    'Install copper pipe',
    'Install PVC pipe',
    'Install cast iron',
    'Install PEX',
  ],
  'Plumbing Fixtures': [
    'Install toilets',
    'Install sinks',
    'Install tubs/shower',
    'Install water heaters',
  ],
  'Water Supply': [
    'Run water lines',
    'Connect supplies',
    'Test water systems',
  ],
  'Drainage Systems': [
    'Install drain lines',
    'Connect DWV',
    'Test drain systems',
  ],
  'Pipe Fitting': [
    'Measure and cut pipe',
    'Thread pipe',
    'Install pipe supports',
  ],
  'Formwork': [
    'Set forms',
    'Build forms',
    'Strip forms',
    'Install form ties',
  ],
  'Rebar Installation': [
    'Tie rebar',
    'Set rebar',
    'Place chairs',
    'Inspect rebar',
  ],
  'Concrete Pouring': [
    'Pour concrete',
    'Screed concrete',
    'Trowel finish',
    'Cure concrete',
  ],
  'Flatwork': [
    'Finish flatwork',
    'Install expansion joints',
    'Broom finish',
  ],
  'Stamped Concrete': [
    'Apply stamps',
    'Color concrete',
    'Seal stamped concrete',
  ],
  'Earthwork': [
    'Excavate',
    'Backfill',
    'Compaction',
    'Grade site',
  ],
  'Utilities Installation': [
    'Install water lines',
    'Install sewer lines',
    'Install gas lines',
  ],
  'Trenching': [
    'Trench for utilities',
    'Set pipe bedding',
    'Backfill trenches',
  ],
  'Site Grading': [
    'Set grades',
    'Operate equipment',
    'Read grade stakes',
  ],
  'Storm Drainage': [
    'Install storm pipes',
    'Set catch basins',
    'Connect to system',
  ],
  'Asphalt Paving': [
    'Install base',
    'Pave asphalt',
    'Roll asphalt',
    'Edge asphalt',
  ],
  'Sealcoating': [
    'Apply sealcoat',
    'Striping',
    'Seal cracks',
  ],
  'Patching': [
    'Patch asphalt',
    'Cut and fill',
    'Compact patches',
  ],
  'Striping': [
    'Layout striping',
    'Apply paint',
    'Apply thermoplastic',
  ],
  'Landscape Installation': [
    'Install plants',
    'Install trees',
    'Install shrubs',
    'Install sod',
  ],
  'Irrigation': [
    'Install irrigation',
    'Connect valves',
    'Set controllers',
    'Test irrigation',
  ],
  'Hardscaping': [
    'Install pavers',
    'Retaining walls',
    'Stone paths',
  ],
  'Sod Installation': [
    'Grade area',
    'Lay sod',
    'Water sod',
  ],
  'Roof Installation': [
    'Install roofing',
    'Install shingles',
    'Install metal roofing',
    'Install TPO',
  ],
  'Waterproofing': [
    'Install waterproofing',
    'Apply coatings',
    'Test waterproofing',
  ],
  'Membrane Installation': [
    'Install roofing membrane',
    'Weld seams',
    'Install flashing',
  ],
  'Flashing': [
    'Install flashing',
    'Install drip edge',
    'Seal penetrations',
  ],
  'Material Movement': [
    'Move materials',
    'Unload trucks',
    'Stock materials',
  ],
  'Site Cleanup': [
    'Clean site',
    'Waste removal',
    'Debris cleanup',
  ],
  'Equipment Operation': [
    'Operate forklift',
    'Operate skid steer',
    'Operate aerial lift',
  ],
  'Site Support': [
    'Support trade crews',
    'Material prep',
    'Site maintenance',
  ],
  'Demolition': [
    'Perform demolition',
    'Use demo tools',
    'Sort materials',
  ],
  'Selective Demolition': [
    'Selective demolition',
    'Protect finishes',
    'Remove partitions',
  ],
  'Abatement Support': [
    'Support abatement',
    'Containment',
    'Waste handling',
  ],
  'Waste Removal': [
    'Remove waste',
    'Sort debris',
    'Load dumpsters',
  ],
  'Masonry': [
    'Lay brick',
    'Lay block',
    'Mix mortar',
    'Set stone',
  ],
  'Stucco Application': [
    'Apply stucco',
    'Float stucco',
    'Texture stucco',
  ],
  'EIFS Systems': [
    'Install EIFS',
    'Apply finish coats',
    'Base coat applications',
  ],
  'Stone Installation': [
    'Set stone veneer',
    'Cut stone',
    'Apply mortar',
  ],
  'Structural Steel': [
    'Erect steel',
    'Bolt up',
    'Weld steel',
    'Install decking',
  ],
  'Misc. Metals': [
    'Install metals',
    'Install railings',
    'Install stairs',
  ],
  'Welding': [
    'MIG welding',
    'TIG welding',
    'Stick welding',
    'Read blueprints',
  ],
  'Bolt Up': [
    'Bolt connections',
    'Set columns',
    'Level steel',
  ],
  'Rough Carpentry': [
    'Framing',
    'Sheathing',
    'Nailing',
    'Use power tools',
  ],
  'Wood Framing': [
    'Frame walls',
    'Frame floors',
    'Frame roofs',
  ],
  'Blocking Systems': [
    'Install blocking',
    'Backing installation',
  ],
  'Roof Framing': [
    'Frame roof',
    'Set trusses',
    'Install roof deck',
  ],
  'Millwork': [
    'Install cabinets',
    'Install countertops',
    'Casework',
  ],
  'Cabinets Installation': [
    'Set cabinets',
    'Level cabinets',
    'Adjust hardware',
  ],
  'Finish Carpentry': [
    'Install trim',
    'Install base',
    'Install crown',
    'Set doors',
  ],
  'Trim Installation': [
    'Install baseboard',
    'Install crown',
    'Case windows',
  ],
  'Flooring Installation': [
    'Install flooring',
    'Layout floors',
    'Cut flooring',
  ],
  'Tile Installation': [
    'Install tile',
    'Grout tile',
    'Cut tile',
  ],
  'Carpet Installation': [
    'Lay carpet',
    'Stretch carpet',
    'Seam carpet',
  ],
  'Resilient Flooring': [
    'Install LVT',
    'Install LVP',
    'Install sheet vinyl',
  ],
  'Painting': [
    'Paint walls',
    'Paint ceilings',
    'Spray paint',
    'Brush and roll',
  ],
  'Coatings Application': [
    'Apply coatings',
    'Epoxy application',
    'Waterproof coatings',
  ],
  'Wallcovering': [
    'Hang wallpaper',
    'Install wallcovering',
  ],
  'Spray Painting': [
    'Spray paint',
    'Set up sprayer',
    'Mask and cover',
  ],
  'Door Installation': [
    'Hang doors',
    'Set door frames',
    'Install hardware',
  ],
  'Frame Installation': [
    'Set frames',
    'Anchor frames',
    'Plumb frames',
  ],
  'Hardware Installation': [
    'Install locks',
    'Install hinges',
    'Install closers',
  ],
  'Openings Systems': [
    'Install windows',
    'Install storefronts',
    'Install sliding doors',
  ],
  'Glass Installation': [
    'Set glass',
    'Glazing',
    'Cut glass',
  ],
  'Storefront Systems': [
    'Install storefront',
    'Set glass',
    'Install entrances',
  ],
  'Curtain Wall': [
    'Install curtain wall',
    'Set glass',
    'Seal joints',
  ],
  'Glazing': [
    'Glazing installation',
    'Seal glazing',
    'Gaskets',
  ],
  'Sprinkler Installation': [
    'Install sprinkler heads',
    'Run piping',
    'Test system',
  ],
  'Fire Pumps': [
    'Install fire pumps',
    'Connect pumps',
    'Test pumps',
  ],
  'Standpipe Systems': [
    'Install standpipes',
    'Connect hose connections',
  ],
  'Fire Alarm': [
    'Install fire alarm',
    'Wire devices',
    'Test systems',
  ],
  'Firestopping': [
    'Firestop penetrations',
    'Seal joints',
    'Inspect firestopping',
  ],
  'Fireproofing': [
    'Apply fireproofing',
    'Spray fireproofing',
    'Inspect fireproofing',
  ],
  'Joint Sealants': [
    'Apply sealants',
    'Caulk joints',
    'Backer rod',
  ],
  'Penetration Sealing': [
    'Seal penetrations',
    'Firestop sleeves',
  ],
  'Data Cabling': [
    'Pull cat6 cables',
    'Terminate cables',
    'Install jacks',
  ],
  'Security Systems': [
    'Install security cameras',
    'Wire sensors',
    'Install access control',
  ],
  'Access Control': [
    'Install card readers',
    'Wire controllers',
    'Test access',
  ],
  'Specialties Installation': [
    'Install specialties',
    'Install accessories',
  ],
  'Accessories': [
    'Install accessories',
    'Set toilet accessories',
    'Install mirrors',
  ],
  'Signage Installation': [
    'Install signs',
    'Mount signs',
    'Electrical signs',
  ],
  'Equipment Installation': [
    'Install equipment',
    'Set in place',
    'Connect utilities',
  ],
  'Specialty Installations': [
    'Specialty installation',
    'Manufacturer install',
  ],
  'Owner-Furnished Equipment': [
    'Set equipment',
    'Connect to systems',
    'Test equipment',
  ],
}

// ✅ Experience Level options
const EXPERIENCE_LEVELS = [
  'Entry Level',
  'Intermediate',
  'Experienced',
  'Advanced',
  'Master'
]

// ✅ Years of Experience options
const YEARS_OF_EXPERIENCE = [
  '0-1',
  '1-2',
  '2-3',
  '3-4',
  '4-5',
  '5-10',
  '10-15',
  '15-20',
  '20+'
]

// ✅ Tools, Certifications, and Requirements
const TOOLS_CERTIFICATIONS = [
  'OSHA 10',
  'OSHA 30',
  'Scissor lift experience',
  'Boom lift experience',
  'Lift certified',
  'Fall protection',
  'Own hand tools',
  'Own power tools',
  'Basic PPE',
  'Reliable transportation',
  'Valid driver license',
  'Willing to travel',
  'Night shift available',
  'Weekend work available',
  'Overtime available',
  'Can pass background check if required',
  'Can work secure/badged sites',
  'Bilingual English/Spanish',
]

export function WizardStep2({ data, onChange, onNext, onBack }) {
  const { t } = useTranslation()

  // ✅ State for skill groups with checkboxes
  const [skillGroups, setSkillGroups] = useState(() => {
    if (data.skillGroups) {
      return data.skillGroups
    }
    return {}
  })

  // ✅ State for experience and years for each skill group
  const [skillDetails, setSkillDetails] = useState(() => {
    if (data.skillDetails) {
      return data.skillDetails
    }
    return {}
  })

  // ✅ State for tools and certifications
  const [toolsCertifications, setToolsCertifications] = useState(() => {
    if (data.toolsCertifications) {
      return data.toolsCertifications
    }
    return {}
  })

  // ✅ Handle main trade selection
  const handleMainTradeChange = (value) => {
    onChange({ mainTrade: value })
    // Reset skill groups when main trade changes
    setSkillGroups({})
    setSkillDetails({})
  }

  // ✅ Handle skill group checkbox toggle
  const handleSkillGroupToggle = (skillGroup) => (e) => {
    const isChecked = e.target.checked
    const updated = { ...skillGroups, [skillGroup]: isChecked }
    setSkillGroups(updated)
    onChange({ skillGroups: updated })

    // If unchecked, remove skill details for this group
    if (!isChecked) {
      const updatedDetails = { ...skillDetails }
      delete updatedDetails[skillGroup]
      setSkillDetails(updatedDetails)
      onChange({ skillDetails: updatedDetails })
    } else {
      // Initialize skill details with empty values
      const updatedDetails = { ...skillDetails, [skillGroup]: { experience: '', years: '', skills: {} } }
      setSkillDetails(updatedDetails)
      onChange({ skillDetails: updatedDetails })
    }
  }

  // ✅ Handle skill detail checkbox toggle
  const handleSkillDetailToggle = (skillGroup, skill) => (e) => {
    const isChecked = e.target.checked
    const currentSkills = skillDetails[skillGroup]?.skills || {}
    const updatedSkills = { ...currentSkills, [skill]: isChecked }
    
    const updatedDetails = {
      ...skillDetails,
      [skillGroup]: {
        ...skillDetails[skillGroup],
        skills: updatedSkills
      }
    }
    setSkillDetails(updatedDetails)
    onChange({ skillDetails: updatedDetails })
  }

  // ✅ Handle experience level change
  const handleExperienceChange = (skillGroup, value) => {
    const updatedDetails = {
      ...skillDetails,
      [skillGroup]: {
        ...skillDetails[skillGroup],
        experience: value
      }
    }
    setSkillDetails(updatedDetails)
    onChange({ skillDetails: updatedDetails })
  }

  // ✅ Handle years of experience change
  const handleYearsChange = (skillGroup, value) => {
    const updatedDetails = {
      ...skillDetails,
      [skillGroup]: {
        ...skillDetails[skillGroup],
        years: value
      }
    }
    setSkillDetails(updatedDetails)
    onChange({ skillDetails: updatedDetails })
  }

  // ✅ Handle tools/certifications toggle
  const handleToolToggle = (tool) => (e) => {
    const isChecked = e.target.checked
    const updated = { ...toolsCertifications, [tool]: isChecked }
    setToolsCertifications(updated)
    onChange({ toolsCertifications: updated })
  }

  // ✅ Get skill groups for selected main trade
  const getSkillGroups = () => {
    const mainTrade = data.mainTrade || ''
    return SKILL_GROUPS[mainTrade] || []
  }

  // ✅ Get skill details for a specific skill group
  const getSkillDetails = (skillGroup) => {
    return SKILL_DETAILS[skillGroup] || []
  }

  const selectedTrade = data.mainTrade || ''
  const groups = getSkillGroups()

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">{t('wizard.step2.title')}</div>

          {/* ✅ Main Trade Dropdown */}
          <div style={{ maxWidth: '500px', margin: '0 auto 32px auto' }}>
            <SelectField
              label={t('wizard.step2.selectMainTrade') || 'Select Main Trade'}
              value={selectedTrade}
              onChange={handleMainTradeChange}
            >
              <option value="">{t('wizard.step2.selectMainTrade') || 'Select Main Trade'}</option>
              {MAIN_TRADES.map((trade) => (
                <option key={trade} value={trade}>
                  {trade}
                </option>
              ))}
            </SelectField>
          </div>

          {/* ✅ Skill Groups */}
          {selectedTrade && groups.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <div style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#17263a',
                marginBottom: '16px',
                paddingBottom: '8px',
                borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
              }}>
                Skill Groups
              </div>

              {groups.map((group, index) => (
                <div key={group} style={{
                  marginBottom: index < groups.length - 1 ? '24px' : '16px',
                }}>
                  {/* ✅ Skill Group Row with Checkbox */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    background: 'rgba(15, 78, 169, 0.03)',
                    border: '1px solid rgba(18, 38, 63, 0.08)',
                    borderRadius: '8px',
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      flex: 1,
                      fontSize: '14px',
                      fontWeight: 500,
                      color: '#17263a',
                    }}>
                      <input
                        type="checkbox"
                        checked={!!skillGroups[group]}
                        onChange={handleSkillGroupToggle(group)}
                      />
                      {group}
                    </label>

                    <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                      <SelectField
                        label=""
                        value={skillDetails[group]?.experience || ''}
                        onChange={(value) => handleExperienceChange(group, value)}
                        style={{ flex: 1 }}
                      >
                        <option value="">Experience Level</option>
                        {EXPERIENCE_LEVELS.map((level) => (
                          <option key={level} value={level}>
                            {level}
                          </option>
                        ))}
                      </SelectField>

                      <SelectField
                        label=""
                        value={skillDetails[group]?.years || ''}
                        onChange={(value) => handleYearsChange(group, value)}
                        style={{ flex: 1 }}
                      >
                        <option value="">Years of Experience</option>
                        {YEARS_OF_EXPERIENCE.map((years) => (
                          <option key={years} value={years}>
                            {years}
                          </option>
                        ))}
                      </SelectField>
                    </div>
                  </div>

                  {/* ✅ Skill Details Legend (appears when checkbox is checked) */}
                  {skillGroups[group] && (
                    <div style={{
                      marginTop: '8px',
                      marginLeft: '28px',
                      padding: '16px 20px',
                      border: '1px solid rgba(15, 78, 169, 0.2)',
                      borderRadius: '8px',
                      background: 'rgba(15, 78, 169, 0.02)',
                    }}>
                      <div style={{
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#0f4ea9',
                        marginBottom: '12px',
                      }}>
                        Skill Details - {group}
                      </div>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '6px 16px',
                      }}>
                        {getSkillDetails(group).map((skill) => (
                          <label key={skill} style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: '#17263a',
                          }}>
                            <input
                              type="checkbox"
                              checked={!!(skillDetails[group]?.skills?.[skill] || false)}
                              onChange={handleSkillDetailToggle(group, skill)}
                            />
                            {skill}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ✅ Tools, Certifications, and Requirements Section */}
          <div style={{ marginTop: '32px' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#17263a',
              marginBottom: '16px',
              paddingBottom: '8px',
              borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
            }}>
              Tools, Certifications, and Requirements
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '6px 16px',
              padding: '16px',
              border: '1px solid rgba(18, 38, 63, 0.08)',
              borderRadius: '8px',
              background: 'rgba(15, 78, 169, 0.02)',
            }}>
              {TOOLS_CERTIFICATIONS.map((tool) => (
                <label key={tool} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#17263a',
                  padding: '4px 0',
                }}>
                  <input
                    type="checkbox"
                    checked={!!(toolsCertifications[tool] || false)}
                    onChange={handleToolToggle(tool)}
                  />
                  {tool}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WizardStep2