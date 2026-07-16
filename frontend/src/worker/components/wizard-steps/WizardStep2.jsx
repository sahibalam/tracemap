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



// // src/worker/components/wizard-steps/WizardStep2.jsx
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { SelectField } from '../../../common/components/TextField'

// // ✅ MAIN TRADES from PDF
// const MAIN_TRADES = [
//   'Interiors',
//   'HVAC/Mechanical',
//   'Electrical / Power',
//   'Plumbing / Piping',
//   'Concrete / Formwork / Rebar / Flatwork',
//   'Civil / Sitework / Earthwork / Utilities',
//   'Asphalt / Paving Work',
//   'Landscaping / Exterior Improvements',
//   'Roofing / Waterproofing',
//   'General Labor / Site Support / Material Handling',
//   'Demolition / Selective Demo / Abatement Support',
//   'Masonry / Stucco / EIFS Systems',
//   'Structural Steel / Misc. Metals / Welding',
//   'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems',
//   'Millwork / Cabinets / Finish Carpentry',
//   'Flooring / Tile / Resilient / Carpet Systems',
//   'Painting / Coatings / Wallcovering Systems',
//   'Doors / Frames / Hardware / Openings Systems',
//   'Glass / Glazing / Storefront',
//   'Fire Protection / Sprinkler Systems',
//   'Firestopping / Fireproofing / Joint Sealants',
//   'Low Voltage / Data / Security / Fire Alarm',
//   'Division 10 Specialties / Accessories / Signage Systems',
//   'Equipment / Specialty Installations / Owner-Furnished Equipment Systems',
// ]

// export function WizardStep2({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()

//   // ✅ Handle main trade change
//   const handleMainTradeChange = (value) => {
//     onChange({ mainTrade: value })
//   }

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step2.title')}</div>

//           {/* ✅ Single Main Trade Dropdown */}
//           <div style={{ maxWidth: '500px', margin: '0 auto' }}>
//             <SelectField
//               label={t('wizard.step2.selectMainTrade') || 'Select Main Trade'}
//               value={data.mainTrade || ''}
//               onChange={handleMainTradeChange}
//             >
//               <option value="">{t('wizard.step2.selectMainTrade') || 'Select Main Trade'}</option>
//               {MAIN_TRADES.map((trade) => (
//                 <option key={trade} value={trade}>
//                   {trade}
//                 </option>
//               ))}
//             </SelectField>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep2









// // src/worker/components/wizard-steps/WizardStep2.jsx
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { SelectField } from '../../../common/components/TextField'

// // ✅ MAIN TRADES from PDF
// const MAIN_TRADES = [
//   'Interiors',
//   'HVAC/Mechanical',
//   'Electrical / Power',
//   'Plumbing / Piping',
//   'Concrete / Formwork / Rebar / Flatwork',
//   'Civil / Sitework / Earthwork / Utilities',
//   'Asphalt / Paving Work',
//   'Landscaping / Exterior Improvements',
//   'Roofing / Waterproofing',
//   'General Labor / Site Support / Material Handling',
//   'Demolition / Selective Demo / Abatement Support',
//   'Masonry / Stucco / EIFS Systems',
//   'Structural Steel / Misc. Metals / Welding',
//   'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems',
//   'Millwork / Cabinets / Finish Carpentry',
//   'Flooring / Tile / Resilient / Carpet Systems',
//   'Painting / Coatings / Wallcovering Systems',
//   'Doors / Frames / Hardware / Openings Systems',
//   'Glass / Glazing / Storefront',
//   'Fire Protection / Sprinkler Systems',
//   'Firestopping / Fireproofing / Joint Sealants',
//   'Low Voltage / Data / Security / Fire Alarm',
//   'Division 10 Specialties / Accessories / Signage Systems',
//   'Equipment / Specialty Installations / Owner-Furnished Equipment Systems',
// ]

// // ✅ SKILL GROUPS mapped to each Main Trade
// const SKILL_GROUPS = {
//   'Interiors': [
//     'Metal Framing',
//     'Drywall Hanging',
//     'Taping/Finishing',
//     'Acoustical Ceilings',
//     'Interior Carpentry',
//     'Insulation',
//     'Demolition/Punch/Final Clean',
//   ],
//   'HVAC/Mechanical': [
//     'HVAC Installation',
//     'Ductwork',
//     'Mechanical Piping',
//     'Refrigeration',
//     'HVAC Controls',
//   ],
//   'Electrical / Power': [
//     'Electrical Wiring',
//     'Power Distribution',
//     'Lighting Installation',
//     'Panel Installation',
//     'Conduit Installation',
//   ],
//   'Plumbing / Piping': [
//     'Pipe Installation',
//     'Plumbing Fixtures',
//     'Water Supply',
//     'Drainage Systems',
//     'Pipe Fitting',
//   ],
//   'Concrete / Formwork / Rebar / Flatwork': [
//     'Formwork',
//     'Rebar Installation',
//     'Concrete Pouring',
//     'Flatwork',
//     'Stamped Concrete',
//   ],
//   'Civil / Sitework / Earthwork / Utilities': [
//     'Earthwork',
//     'Utilities Installation',
//     'Trenching',
//     'Site Grading',
//     'Storm Drainage',
//   ],
//   'Asphalt / Paving Work': [
//     'Asphalt Paving',
//     'Sealcoating',
//     'Patching',
//     'Striping',
//   ],
//   'Landscaping / Exterior Improvements': [
//     'Landscape Installation',
//     'Irrigation',
//     'Hardscaping',
//     'Sod Installation',
//   ],
//   'Roofing / Waterproofing': [
//     'Roof Installation',
//     'Waterproofing',
//     'Membrane Installation',
//     'Flashing',
//   ],
//   'General Labor / Site Support / Material Handling': [
//     'Material Movement',
//     'Site Cleanup',
//     'Equipment Operation',
//     'Site Support',
//   ],
//   'Demolition / Selective Demo / Abatement Support': [
//     'Demolition',
//     'Selective Demolition',
//     'Abatement Support',
//     'Waste Removal',
//   ],
//   'Masonry / Stucco / EIFS Systems': [
//     'Masonry',
//     'Stucco Application',
//     'EIFS Systems',
//     'Stone Installation',
//   ],
//   'Structural Steel / Misc. Metals / Welding': [
//     'Structural Steel',
//     'Misc. Metals',
//     'Welding',
//     'Bolt Up',
//   ],
//   'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems': [
//     'Rough Carpentry',
//     'Wood Framing',
//     'Blocking Systems',
//     'Roof Framing',
//   ],
//   'Millwork / Cabinets / Finish Carpentry': [
//     'Millwork',
//     'Cabinets Installation',
//     'Finish Carpentry',
//     'Trim Installation',
//   ],
//   'Flooring / Tile / Resilient / Carpet Systems': [
//     'Flooring Installation',
//     'Tile Installation',
//     'Carpet Installation',
//     'Resilient Flooring',
//   ],
//   'Painting / Coatings / Wallcovering Systems': [
//     'Painting',
//     'Coatings Application',
//     'Wallcovering',
//     'Spray Painting',
//   ],
//   'Doors / Frames / Hardware / Openings Systems': [
//     'Door Installation',
//     'Frame Installation',
//     'Hardware Installation',
//     'Openings Systems',
//   ],
//   'Glass / Glazing / Storefront': [
//     'Glass Installation',
//     'Storefront Systems',
//     'Curtain Wall',
//     'Glazing',
//   ],
//   'Fire Protection / Sprinkler Systems': [
//     'Sprinkler Installation',
//     'Fire Pumps',
//     'Standpipe Systems',
//     'Fire Alarm',
//   ],
//   'Firestopping / Fireproofing / Joint Sealants': [
//     'Firestopping',
//     'Fireproofing',
//     'Joint Sealants',
//     'Penetration Sealing',
//   ],
//   'Low Voltage / Data / Security / Fire Alarm': [
//     'Data Cabling',
//     'Security Systems',
//     'Fire Alarm',
//     'Access Control',
//   ],
//   'Division 10 Specialties / Accessories / Signage Systems': [
//     'Specialties Installation',
//     'Accessories',
//     'Signage Installation',
//   ],
//   'Equipment / Specialty Installations / Owner-Furnished Equipment Systems': [
//     'Equipment Installation',
//     'Specialty Installations',
//     'Owner-Furnished Equipment',
//   ],
// }

// // ✅ SKILL DETAILS mapped to each Skill Group
// const SKILL_DETAILS = {
//   'Metal Framing': [
//     'Layout walls',
//     'Install top/bottom track',
//     'Install metal studs',
//     'Frame soffits',
//     'Frame ceilings',
//     'Install backing/blocking',
//     'Read basic layout',
//     'Use laser/level',
//     'Fire-rated framing',
//   ],
//   'Drywall Hanging': [
//     'Hang walls',
//     'Hang ceilings',
//     'Fire-rated board',
//     'Abuse board',
//     'Shaft-wall board',
//     'High walls',
//     'Production hanging',
//     'Lift work',
//     'Blueprint reading',
//   ],
//   'Taping/Finishing': [
//     'Level 1-5 finish',
//     'Skim coat',
//     'Texture match',
//     'Punch repair',
//     'Corner bead systems',
//     'Smooth finish',
//   ],
//   'Acoustical Ceilings': [
//     'Standard grid',
//     'Tegular',
//     'Specialty ceilings',
//     'Clouds/baffles',
//     'Seismic requirements',
//     'Light/HVAC/sprinkler coordination',
//   ],
//   'Interior Carpentry': [
//     'Backing',
//     'Blocking',
//     'Doors/frames/hardware support',
//     'Trim/carpentry',
//     'Finish carpentry',
//   ],
//   'Insulation': [
//     'Wall Insulation',
//     'Bat Insulation',
//     'Sound Insulation',
//     'Specialty Insulation',
//   ],
//   'Demolition/Punch/Final Clean': [
//     'Demolition',
//     'Removal Support',
//     'Clean up',
//     'Punch work',
//     'Final clean',
//     'Closeout Support',
//   ],
//   'HVAC Installation': [
//     'Install HVAC units',
//     'Connect ductwork',
//     'Set thermostats',
//     'Test HVAC systems',
//     'Charge refrigerant',
//   ],
//   'Ductwork': [
//     'Fabricate ductwork',
//     'Install ductwork',
//     'Insulate ductwork',
//     'Seal ductwork',
//   ],
//   'Mechanical Piping': [
//     'Install piping',
//     'Weld piping',
//     'Thread pipe',
//     'Test piping systems',
//   ],
//   'Refrigeration': [
//     'Install refrigeration systems',
//     'Charge systems',
//     'Test refrigeration',
//   ],
//   'HVAC Controls': [
//     'Install control panels',
//     'Wire controls',
//     'Test control systems',
//   ],
//   'Electrical Wiring': [
//     'Install wiring',
//     'Connect to panel',
//     'Pull wire',
//     'Terminate wire',
//   ],
//   'Power Distribution': [
//     'Set panels',
//     'Install breakers',
//     'Run feeders',
//     'Connect transformers',
//   ],
//   'Lighting Installation': [
//     'Install light fixtures',
//     'Wire lights',
//     'Mount emergency lights',
//   ],
//   'Panel Installation': [
//     'Set electrical panels',
//     'Wire main panel',
//     'Install subpanels',
//   ],
//   'Conduit Installation': [
//     'Install conduit',
//     'Bend conduit',
//     'Run MC cable',
//     'Use bender tools',
//   ],
//   'Pipe Installation': [
//     'Install copper pipe',
//     'Install PVC pipe',
//     'Install cast iron',
//     'Install PEX',
//   ],
//   'Plumbing Fixtures': [
//     'Install toilets',
//     'Install sinks',
//     'Install tubs/shower',
//     'Install water heaters',
//   ],
//   'Water Supply': [
//     'Run water lines',
//     'Connect supplies',
//     'Test water systems',
//   ],
//   'Drainage Systems': [
//     'Install drain lines',
//     'Connect DWV',
//     'Test drain systems',
//   ],
//   'Pipe Fitting': [
//     'Measure and cut pipe',
//     'Thread pipe',
//     'Install pipe supports',
//   ],
//   'Formwork': [
//     'Set forms',
//     'Build forms',
//     'Strip forms',
//     'Install form ties',
//   ],
//   'Rebar Installation': [
//     'Tie rebar',
//     'Set rebar',
//     'Place chairs',
//     'Inspect rebar',
//   ],
//   'Concrete Pouring': [
//     'Pour concrete',
//     'Screed concrete',
//     'Trowel finish',
//     'Cure concrete',
//   ],
//   'Flatwork': [
//     'Finish flatwork',
//     'Install expansion joints',
//     'Broom finish',
//   ],
//   'Stamped Concrete': [
//     'Apply stamps',
//     'Color concrete',
//     'Seal stamped concrete',
//   ],
//   'Earthwork': [
//     'Excavate',
//     'Backfill',
//     'Compaction',
//     'Grade site',
//   ],
//   'Utilities Installation': [
//     'Install water lines',
//     'Install sewer lines',
//     'Install gas lines',
//   ],
//   'Trenching': [
//     'Trench for utilities',
//     'Set pipe bedding',
//     'Backfill trenches',
//   ],
//   'Site Grading': [
//     'Set grades',
//     'Operate equipment',
//     'Read grade stakes',
//   ],
//   'Storm Drainage': [
//     'Install storm pipes',
//     'Set catch basins',
//     'Connect to system',
//   ],
//   'Asphalt Paving': [
//     'Install base',
//     'Pave asphalt',
//     'Roll asphalt',
//     'Edge asphalt',
//   ],
//   'Sealcoating': [
//     'Apply sealcoat',
//     'Striping',
//     'Seal cracks',
//   ],
//   'Patching': [
//     'Patch asphalt',
//     'Cut and fill',
//     'Compact patches',
//   ],
//   'Striping': [
//     'Layout striping',
//     'Apply paint',
//     'Apply thermoplastic',
//   ],
//   'Landscape Installation': [
//     'Install plants',
//     'Install trees',
//     'Install shrubs',
//     'Install sod',
//   ],
//   'Irrigation': [
//     'Install irrigation',
//     'Connect valves',
//     'Set controllers',
//     'Test irrigation',
//   ],
//   'Hardscaping': [
//     'Install pavers',
//     'Retaining walls',
//     'Stone paths',
//   ],
//   'Sod Installation': [
//     'Grade area',
//     'Lay sod',
//     'Water sod',
//   ],
//   'Roof Installation': [
//     'Install roofing',
//     'Install shingles',
//     'Install metal roofing',
//     'Install TPO',
//   ],
//   'Waterproofing': [
//     'Install waterproofing',
//     'Apply coatings',
//     'Test waterproofing',
//   ],
//   'Membrane Installation': [
//     'Install roofing membrane',
//     'Weld seams',
//     'Install flashing',
//   ],
//   'Flashing': [
//     'Install flashing',
//     'Install drip edge',
//     'Seal penetrations',
//   ],
//   'Material Movement': [
//     'Move materials',
//     'Unload trucks',
//     'Stock materials',
//   ],
//   'Site Cleanup': [
//     'Clean site',
//     'Waste removal',
//     'Debris cleanup',
//   ],
//   'Equipment Operation': [
//     'Operate forklift',
//     'Operate skid steer',
//     'Operate aerial lift',
//   ],
//   'Site Support': [
//     'Support trade crews',
//     'Material prep',
//     'Site maintenance',
//   ],
//   'Demolition': [
//     'Perform demolition',
//     'Use demo tools',
//     'Sort materials',
//   ],
//   'Selective Demolition': [
//     'Selective demolition',
//     'Protect finishes',
//     'Remove partitions',
//   ],
//   'Abatement Support': [
//     'Support abatement',
//     'Containment',
//     'Waste handling',
//   ],
//   'Waste Removal': [
//     'Remove waste',
//     'Sort debris',
//     'Load dumpsters',
//   ],
//   'Masonry': [
//     'Lay brick',
//     'Lay block',
//     'Mix mortar',
//     'Set stone',
//   ],
//   'Stucco Application': [
//     'Apply stucco',
//     'Float stucco',
//     'Texture stucco',
//   ],
//   'EIFS Systems': [
//     'Install EIFS',
//     'Apply finish coats',
//     'Base coat applications',
//   ],
//   'Stone Installation': [
//     'Set stone veneer',
//     'Cut stone',
//     'Apply mortar',
//   ],
//   'Structural Steel': [
//     'Erect steel',
//     'Bolt up',
//     'Weld steel',
//     'Install decking',
//   ],
//   'Misc. Metals': [
//     'Install metals',
//     'Install railings',
//     'Install stairs',
//   ],
//   'Welding': [
//     'MIG welding',
//     'TIG welding',
//     'Stick welding',
//     'Read blueprints',
//   ],
//   'Bolt Up': [
//     'Bolt connections',
//     'Set columns',
//     'Level steel',
//   ],
//   'Rough Carpentry': [
//     'Framing',
//     'Sheathing',
//     'Nailing',
//     'Use power tools',
//   ],
//   'Wood Framing': [
//     'Frame walls',
//     'Frame floors',
//     'Frame roofs',
//   ],
//   'Blocking Systems': [
//     'Install blocking',
//     'Backing installation',
//   ],
//   'Roof Framing': [
//     'Frame roof',
//     'Set trusses',
//     'Install roof deck',
//   ],
//   'Millwork': [
//     'Install cabinets',
//     'Install countertops',
//     'Casework',
//   ],
//   'Cabinets Installation': [
//     'Set cabinets',
//     'Level cabinets',
//     'Adjust hardware',
//   ],
//   'Finish Carpentry': [
//     'Install trim',
//     'Install base',
//     'Install crown',
//     'Set doors',
//   ],
//   'Trim Installation': [
//     'Install baseboard',
//     'Install crown',
//     'Case windows',
//   ],
//   'Flooring Installation': [
//     'Install flooring',
//     'Layout floors',
//     'Cut flooring',
//   ],
//   'Tile Installation': [
//     'Install tile',
//     'Grout tile',
//     'Cut tile',
//   ],
//   'Carpet Installation': [
//     'Lay carpet',
//     'Stretch carpet',
//     'Seam carpet',
//   ],
//   'Resilient Flooring': [
//     'Install LVT',
//     'Install LVP',
//     'Install sheet vinyl',
//   ],
//   'Painting': [
//     'Paint walls',
//     'Paint ceilings',
//     'Spray paint',
//     'Brush and roll',
//   ],
//   'Coatings Application': [
//     'Apply coatings',
//     'Epoxy application',
//     'Waterproof coatings',
//   ],
//   'Wallcovering': [
//     'Hang wallpaper',
//     'Install wallcovering',
//   ],
//   'Spray Painting': [
//     'Spray paint',
//     'Set up sprayer',
//     'Mask and cover',
//   ],
//   'Door Installation': [
//     'Hang doors',
//     'Set door frames',
//     'Install hardware',
//   ],
//   'Frame Installation': [
//     'Set frames',
//     'Anchor frames',
//     'Plumb frames',
//   ],
//   'Hardware Installation': [
//     'Install locks',
//     'Install hinges',
//     'Install closers',
//   ],
//   'Openings Systems': [
//     'Install windows',
//     'Install storefronts',
//     'Install sliding doors',
//   ],
//   'Glass Installation': [
//     'Set glass',
//     'Glazing',
//     'Cut glass',
//   ],
//   'Storefront Systems': [
//     'Install storefront',
//     'Set glass',
//     'Install entrances',
//   ],
//   'Curtain Wall': [
//     'Install curtain wall',
//     'Set glass',
//     'Seal joints',
//   ],
//   'Glazing': [
//     'Glazing installation',
//     'Seal glazing',
//     'Gaskets',
//   ],
//   'Sprinkler Installation': [
//     'Install sprinkler heads',
//     'Run piping',
//     'Test system',
//   ],
//   'Fire Pumps': [
//     'Install fire pumps',
//     'Connect pumps',
//     'Test pumps',
//   ],
//   'Standpipe Systems': [
//     'Install standpipes',
//     'Connect hose connections',
//   ],
//   'Fire Alarm': [
//     'Install fire alarm',
//     'Wire devices',
//     'Test systems',
//   ],
//   'Firestopping': [
//     'Firestop penetrations',
//     'Seal joints',
//     'Inspect firestopping',
//   ],
//   'Fireproofing': [
//     'Apply fireproofing',
//     'Spray fireproofing',
//     'Inspect fireproofing',
//   ],
//   'Joint Sealants': [
//     'Apply sealants',
//     'Caulk joints',
//     'Backer rod',
//   ],
//   'Penetration Sealing': [
//     'Seal penetrations',
//     'Firestop sleeves',
//   ],
//   'Data Cabling': [
//     'Pull cat6 cables',
//     'Terminate cables',
//     'Install jacks',
//   ],
//   'Security Systems': [
//     'Install security cameras',
//     'Wire sensors',
//     'Install access control',
//   ],
//   'Access Control': [
//     'Install card readers',
//     'Wire controllers',
//     'Test access',
//   ],
//   'Specialties Installation': [
//     'Install specialties',
//     'Install accessories',
//   ],
//   'Accessories': [
//     'Install accessories',
//     'Set toilet accessories',
//     'Install mirrors',
//   ],
//   'Signage Installation': [
//     'Install signs',
//     'Mount signs',
//     'Electrical signs',
//   ],
//   'Equipment Installation': [
//     'Install equipment',
//     'Set in place',
//     'Connect utilities',
//   ],
//   'Specialty Installations': [
//     'Specialty installation',
//     'Manufacturer install',
//   ],
//   'Owner-Furnished Equipment': [
//     'Set equipment',
//     'Connect to systems',
//     'Test equipment',
//   ],
// }

// // ✅ Experience Level options
// const EXPERIENCE_LEVELS = [
//   'Entry Level',
//   'Intermediate',
//   'Experienced',
//   'Advanced',
//   'Master'
// ]

// // ✅ Years of Experience options
// const YEARS_OF_EXPERIENCE = [
//   '0-1',
//   '1-2',
//   '2-3',
//   '3-4',
//   '4-5',
//   '5-10',
//   '10-15',
//   '15-20',
//   '20+'
// ]

// // ✅ Tools, Certifications, and Requirements (ONLY for Interiors)
// const TOOLS_CERTIFICATIONS = [
//   'OSHA 10',
//   'OSHA 30',
//   'Scissor lift experience',
//   'Boom lift experience',
//   'Lift certified',
//   'Fall protection',
//   'Own hand tools',
//   'Own power tools',
//   'Basic PPE',
//   'Reliable transportation',
//   'Valid driver license',
//   'Willing to travel',
//   'Night shift available',
//   'Weekend work available',
//   'Overtime available',
//   'Can pass background check if required',
//   'Can work secure/badged sites',
//   'Bilingual English/Spanish',
// ]

// export function WizardStep2({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()

//   // ✅ State for skill groups with checkboxes
//   const [skillGroups, setSkillGroups] = useState(() => {
//     if (data.skillGroups) {
//       return data.skillGroups
//     }
//     return {}
//   })

//   // ✅ State for experience and years for each skill group
//   const [skillDetails, setSkillDetails] = useState(() => {
//     if (data.skillDetails) {
//       return data.skillDetails
//     }
//     return {}
//   })

//   // ✅ State for tools and certifications
//   const [toolsCertifications, setToolsCertifications] = useState(() => {
//     if (data.toolsCertifications) {
//       return data.toolsCertifications
//     }
//     return {}
//   })

//   // ✅ Handle main trade selection
//   const handleMainTradeChange = (value) => {
//     onChange({ mainTrade: value })
//     // Reset skill groups when main trade changes
//     setSkillGroups({})
//     setSkillDetails({})
//     // Reset tools certifications when main trade changes (only for Interiors)
//     setToolsCertifications({})
//   }

//   // ✅ Handle skill group checkbox toggle
//   const handleSkillGroupToggle = (skillGroup) => (e) => {
//     const isChecked = e.target.checked
//     const updated = { ...skillGroups, [skillGroup]: isChecked }
//     setSkillGroups(updated)
//     onChange({ skillGroups: updated })

//     // If unchecked, remove skill details for this group
//     if (!isChecked) {
//       const updatedDetails = { ...skillDetails }
//       delete updatedDetails[skillGroup]
//       setSkillDetails(updatedDetails)
//       onChange({ skillDetails: updatedDetails })
//     } else {
//       // Initialize skill details with empty values
//       const updatedDetails = { ...skillDetails, [skillGroup]: { experience: '', years: '', skills: {} } }
//       setSkillDetails(updatedDetails)
//       onChange({ skillDetails: updatedDetails })
//     }
//   }

//   // ✅ Handle skill detail checkbox toggle
//   const handleSkillDetailToggle = (skillGroup, skill) => (e) => {
//     const isChecked = e.target.checked
//     const currentSkills = skillDetails[skillGroup]?.skills || {}
//     const updatedSkills = { ...currentSkills, [skill]: isChecked }
    
//     const updatedDetails = {
//       ...skillDetails,
//       [skillGroup]: {
//         ...skillDetails[skillGroup],
//         skills: updatedSkills
//       }
//     }
//     setSkillDetails(updatedDetails)
//     onChange({ skillDetails: updatedDetails })
//   }

//   // ✅ Handle experience level change
//   const handleExperienceChange = (skillGroup, value) => {
//     const updatedDetails = {
//       ...skillDetails,
//       [skillGroup]: {
//         ...skillDetails[skillGroup],
//         experience: value
//       }
//     }
//     setSkillDetails(updatedDetails)
//     onChange({ skillDetails: updatedDetails })
//   }

//   // ✅ Handle years of experience change
//   const handleYearsChange = (skillGroup, value) => {
//     const updatedDetails = {
//       ...skillDetails,
//       [skillGroup]: {
//         ...skillDetails[skillGroup],
//         years: value
//       }
//     }
//     setSkillDetails(updatedDetails)
//     onChange({ skillDetails: updatedDetails })
//   }

//   // ✅ Handle tools/certifications toggle
//   const handleToolToggle = (tool) => (e) => {
//     const isChecked = e.target.checked
//     const updated = { ...toolsCertifications, [tool]: isChecked }
//     setToolsCertifications(updated)
//     onChange({ toolsCertifications: updated })
//   }

//   // ✅ Get skill groups for selected main trade
//   const getSkillGroups = () => {
//     const mainTrade = data.mainTrade || ''
//     return SKILL_GROUPS[mainTrade] || []
//   }

//   // ✅ Get skill details for a specific skill group
//   const getSkillDetails = (skillGroup) => {
//     return SKILL_DETAILS[skillGroup] || []
//   }

//   const selectedTrade = data.mainTrade || ''
//   const groups = getSkillGroups()
//   const showToolsSection = selectedTrade === 'Interiors'

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step2.title')}</div>

//           {/* ✅ Main Trade Dropdown */}
//           <div style={{ maxWidth: '500px', margin: '0 auto 32px auto' }}>
//             <SelectField
//               label={t('wizard.step2.selectMainTrade') || 'Select Main Trade'}
//               value={selectedTrade}
//               onChange={handleMainTradeChange}
//             >
//               <option value="">{t('wizard.step2.selectMainTrade') || 'Select Main Trade'}</option>
//               {MAIN_TRADES.map((trade) => (
//                 <option key={trade} value={trade}>
//                   {trade}
//                 </option>
//               ))}
//             </SelectField>
//           </div>

//           {/* ✅ Skill Groups */}
//           {selectedTrade && groups.length > 0 && (
//             <div style={{ marginTop: '16px' }}>
//               <div style={{
//                 fontSize: '14px',
//                 fontWeight: 600,
//                 color: '#17263a',
//                 marginBottom: '16px',
//                 paddingBottom: '8px',
//                 borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//               }}>
//                 Skill Groups
//               </div>

//               {groups.map((group, index) => (
//                 <div key={group} style={{
//                   marginBottom: index < groups.length - 1 ? '24px' : '16px',
//                 }}>
//                   {/* ✅ Skill Group Row with Checkbox */}
//                   <div style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '12px',
//                     padding: '12px 16px',
//                     background: 'rgba(15, 78, 169, 0.03)',
//                     border: '1px solid rgba(18, 38, 63, 0.08)',
//                     borderRadius: '8px',
//                   }}>
//                     <label style={{
//                       display: 'flex',
//                       alignItems: 'center',
//                       gap: '8px',
//                       cursor: 'pointer',
//                       flex: 1,
//                       fontSize: '14px',
//                       fontWeight: 500,
//                       color: '#17263a',
//                     }}>
//                       <input
//                         type="checkbox"
//                         checked={!!skillGroups[group]}
//                         onChange={handleSkillGroupToggle(group)}
//                       />
//                       {group}
//                     </label>

//                     <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
//                       <SelectField
//                         label=""
//                         value={skillDetails[group]?.experience || ''}
//                         onChange={(value) => handleExperienceChange(group, value)}
//                         style={{ flex: 1 }}
//                       >
//                         <option value="">Experience Level</option>
//                         {EXPERIENCE_LEVELS.map((level) => (
//                           <option key={level} value={level}>
//                             {level}
//                           </option>
//                         ))}
//                       </SelectField>

//                       <SelectField
//                         label=""
//                         value={skillDetails[group]?.years || ''}
//                         onChange={(value) => handleYearsChange(group, value)}
//                         style={{ flex: 1 }}
//                       >
//                         <option value="">Years of Experience</option>
//                         {YEARS_OF_EXPERIENCE.map((years) => (
//                           <option key={years} value={years}>
//                             {years}
//                           </option>
//                         ))}
//                       </SelectField>
//                     </div>
//                   </div>

//                   {/* ✅ Skill Details Legend (appears when checkbox is checked) */}
//                   {skillGroups[group] && (
//                     <div style={{
//                       marginTop: '8px',
//                       marginLeft: '28px',
//                       padding: '16px 20px',
//                       border: '1px solid rgba(15, 78, 169, 0.2)',
//                       borderRadius: '8px',
//                       background: 'rgba(15, 78, 169, 0.02)',
//                     }}>
//                       <div style={{
//                         fontSize: '12px',
//                         fontWeight: 600,
//                         color: '#0f4ea9',
//                         marginBottom: '12px',
//                       }}>
//                         Skill Details - {group}
//                       </div>
//                       <div style={{
//                         display: 'grid',
//                         gridTemplateColumns: '1fr 1fr',
//                         gap: '6px 16px',
//                       }}>
//                         {getSkillDetails(group).map((skill) => (
//                           <label key={skill} style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             gap: '8px',
//                             cursor: 'pointer',
//                             fontSize: '13px',
//                             color: '#17263a',
//                           }}>
//                             <input
//                               type="checkbox"
//                               checked={!!(skillDetails[group]?.skills?.[skill] || false)}
//                               onChange={handleSkillDetailToggle(group, skill)}
//                             />
//                             {skill}
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}

//           {/* ✅ Tools, Certifications, and Requirements Section - ONLY for Interiors */}
//           {showToolsSection && (
//             <div style={{ marginTop: '32px' }}>
//               <div style={{
//                 fontSize: '14px',
//                 fontWeight: 600,
//                 color: '#17263a',
//                 marginBottom: '16px',
//                 paddingBottom: '8px',
//                 borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
//               }}>
//                 Tools, Certifications, and Requirements
//               </div>

//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: '1fr 1fr 1fr',
//                 gap: '6px 16px',
//                 padding: '16px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//                 borderRadius: '8px',
//                 background: 'rgba(15, 78, 169, 0.02)',
//               }}>
//                 {TOOLS_CERTIFICATIONS.map((tool) => (
//                   <label key={tool} style={{
//                     display: 'flex',
//                     alignItems: 'center',
//                     gap: '8px',
//                     cursor: 'pointer',
//                     fontSize: '13px',
//                     color: '#17263a',
//                     padding: '4px 0',
//                   }}>
//                     <input
//                       type="checkbox"
//                       checked={!!(toolsCertifications[tool] || false)}
//                       onChange={handleToolToggle(tool)}
//                     />
//                     {tool}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           )}
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
    'HVAC Helper / Mechanical Labor',
    'Ductwork / Sheet Metal Installation',
    'HVAC Equipment Installation',
    'HVAC Service / Repair',
    'HVAC Startup / Commissioning',
    'HVAC Controls / BAS',
    'Refrigeration',
    'Hydronic / Mechanical Piping',
    'Air Distribution / Diffusers / Grilles',
    'HVAC Punch / Troubleshooting / Final Support',
  ],
  'Electrical / Power': [
    'Electrical Helper / Material Handling',
    'Electrical Rough-In',
    'Conduit / Raceway Installation',
    'Wire Pulling / Cabling',
    'Boxes / Devices / Trim-Out',
    'Lighting / Fixtures',
    'Panels / Switchgear / Distribution',
    'Temporary Power',
    'Underground Electrical',
    'Electrical Service / Troubleshooting',
    'Industrial Electrical',
    'Electrical Punch / Final Support',
  ],
  'Concrete / Formwork / Rebar / Flatwork': [
    'Concrete Helper / General Concrete Labor',
    'Formwork / Form Carpenter',
    'Rebar / Reinforcement',
    'Concrete Pour Support',
    'Concrete Finishing',
    'Flatwork / Slabs',
    'Sidewalks / Curbs / Site Concrete',
    'Foundations / Footings / Grade Beams',
    'Concrete Sawcutting / Core Drilling',
    'Concrete Repair / Patch / Demo',
    'Concrete Pump Support',
    'Tilt-Up / Precast Support',
    'Concrete Punch / Cleanup / Final Support',
  ],
  'Civil / Sitework / Earthwork / Utilities': [
    'General Site Labor / Civil Labor',
    'Earthwork / Grading',
    'Excavation / Trenching',
    'Pipe Layer / Underground Utilities',
    'Storm Drain / Sewer / Water Utilities',
    'Utility Installation Support',
    'Erosion Control',
    'Equipment Spotter / Grade Checker',
    'Traffic Control / Flagging',
    'Site Cleanup / Final Grading',
    'Heavy Equipment Operation',
  ],
  'Asphalt / Paving Work': [
    'Asphalt Helper / Labor',
    'Base Prep / Surface Prep',
    'Asphalt Paving Crew',
    'Raking / Lute Work',
    'Screed / Paver Operation',
    'Roller / Compaction',
    'Milling Support',
    'Asphalt Patch / Repair',
    'Sealcoating',
    'Crack Filling',
    'Striping / Pavement Marking',
    'Wheel Stops / Bollards / Signs',
    'Asphalt Cleanup / Punch',
  ],
  'Landscaping / Exterior Improvements': [
    'Landscape Labor / Exterior Helper',
    'Planting / Trees / Shrubs',
    'Sod / Turf Installation',
    'Mulch / Rock / Ground Cover',
    'Irrigation Support',
    'Landscape Drainage Support',
    'Fencing / Gates',
    'Exterior Site Amenities',
    'Pavers / Landscape Hardscape',
    'Retaining Wall Support',
    'Playground / Outdoor Equipment Support',
    'Exterior Cleanup / Final Appearance',
    'Maintenance / Landscape Service',
    'Exterior Punch / Final Corrections',
  ],
  'Plumbing / Piping': [
    'Pipe Installation',
    'Plumbing Fixtures',
    'Water Supply',
    'Drainage Systems',
    'Pipe Fitting',
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
  // ==================== INTERIORS SKILLS ====================
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

  // ==================== HVAC SKILLS ====================
  'HVAC Helper / Mechanical Labor': [
    'Carry and stage duct/materials',
    'Unload HVAC materials',
    'Assist mechanics/installers',
    'Basic demolition/removal',
    'Clean mechanical rooms/work areas',
    'Install hangers/supports with direction',
    'Seal duct with mastic/tape',
    'Basic insulation support',
    'Use basic hand tools',
    'Follow layout under supervision',
  ],
  'Ductwork / Sheet Metal Installation': [
    'Install rectangular duct',
    'Install spiral/round duct',
    'Install flex duct',
    'Layout duct runs',
    'Measure and cut sheet metal',
    'Install hangers and supports',
    'Seal duct joints',
    'Install fire/smoke dampers with direction',
    'Install VAV boxes with direction',
    'Read basic mechanical plans',
  ],
  'HVAC Equipment Installation': [
    'Set rooftop units (RTUs)',
    'Set split systems',
    'Set air handlers',
    'Install mini-splits',
    'Install exhaust fans',
    'Install unit heaters',
    'Connect duct to equipment',
    'Assist with crane/lift coordination',
    'Install curbs/accessories with direction',
    'Anchor and level equipment',
  ],
  'HVAC Service / Repair': [
    'Troubleshoot no cooling/no heat',
    'Check refrigerant pressures',
    'Replace filters/belts',
    'Replace motors/capacitors/contactors',
    'Diagnose electrical issues',
    'Use multimeter',
    'Perform preventive maintenance',
    'Clean coils',
    'Check thermostats',
    'Document service findings',
  ],
  'HVAC Startup / Commissioning': [
    'Start up equipment',
    'Verify sequence of operation',
    'Check airflow basics',
    'Check refrigerant charge',
    'Verify electrical readings',
    'Complete startup checklist',
    'Coordinate with controls',
    'Support TAB/air balance',
    'Document deficiencies',
    'Assist commissioning team',
  ],
  'HVAC Controls / BAS': [
    'Install thermostats/sensors',
    'Pull low-voltage/control wire',
    'Terminate control wiring',
    'Install actuators',
    'Install control panels',
    'Basic BAS troubleshooting',
    'Point-to-point checkout',
    'Read controls drawings',
    'Coordinate with mechanical startup',
    'Support programming/commissioning team',
  ],
  'Refrigeration': [
    'Install refrigeration lines',
    'Braze copper',
    'Pressure test lines',
    'Evacuate system',
    'Charge refrigerant',
    'Troubleshoot refrigeration equipment',
    'Install walk-in cooler/freezer components',
    'Replace compressors/components',
    'Use gauges/vacuum pump',
    'Recover refrigerant',
  ],
  'Hydronic / Mechanical Piping': [
    'Install hydronic piping',
    'Install chilled water/hot water piping',
    'Install condensate piping',
    'Thread pipe',
    'Solder/braze copper',
    'Install valves/strainders',
    'Install pipe supports',
    'Pressure test piping',
  ],
  'Air Distribution / Diffusers / Grilles': [
    'Install diffusers',
    'Install grilles/registers',
    'Install returns',
    'Cut in ceiling diffusers',
    'Coordinate with ACT ceilings',
    'Install flex connections',
    'Adjust diffuser layout with direction',
    'Replace damaged grilles',
    'Support final trim',
    'Punch list air devices',
  ],
  'HVAC Punch / Troubleshooting / Final Support': [
    'Complete punch list items',
    'Replace missing/damaged parts',
    'Seal air leaks',
    'Adjust supports/hangers',
    'Fix insulation gaps',
    'Assist final inspections',
    'Support startup corrections',
    'Clean equipment/work areas',
    'Document completed punch',
    'Return for service calls',
  ],

  // ==================== ELECTRICAL SKILLS ====================
  'Electrical Helper / Material Handling': [
    'Assist electricians',
    'Carry and stage electrical materials',
    'Pull wire under supervision',
    'Install basic supports under supervision',
    'Clean work areas and remove debris',
    'Identify basic electrical materials',
    'Use basic hand tools',
    'Operate ladders safely under supervision',
    'Help with device/fixture trim',
    'Follow foreman instructions and safety requirements',
  ],
  'Electrical Rough-In': [
    'Layout boxes from plans',
    'Install outlet/switch boxes',
    'Install junction boxes',
    'Install MC cable / armored cable',
    'Install branch circuit rough-in',
    'Drill holes / route cable where allowed',
    'Install supports and straps',
    'Rough-in walls and ceilings',
    'Read basic electrical drawings',
    'Coordinate rough-in with framing, drywall, HVAC, and plumbing',
  ],
  'Conduit / Raceway Installation': [
    'Install EMT conduit',
    'Bend EMT conduit',
    'Install rigid conduit',
    'Install PVC conduit',
    'Install flex conduit',
    'Install cable tray',
    'Install raceway / wiremold',
    'Thread conduit / use threading equipment',
    'Install conduit hangers and supports',
    'Layout conduit runs from plans',
    'Coordinate conduit with other trades',
  ],
  'Wire Pulling / Cabling': [
    'Pull branch circuit wire',
    'Pull feeder wire',
    'Set up wire reels / tugger support',
    'Label circuits and conductors',
    'Terminate basic branch circuits',
    'Megger / testing support if qualified',
    'Install grounding conductors',
    'Organize wire in panels / boxes',
    'Pull wire in conduit',
    'Follow conductor color coding',
  ],
  'Boxes / Devices / Trim-Out': [
    'Install receptacles',
    'Install switches',
    'Install GFCI devices',
    'Install cover plates',
    'Terminate devices',
    'Install junction box covers',
    'Label devices / circuits',
    'Troubleshoot device issues',
    'Final device punch support',
  ],
  'Lighting / Fixtures': [
    'Install light fixtures',
    'Install recessed lights',
    'Install exit signs / emergency lights',
    'Install lighting controls',
    'Hang fixtures safely',
    'Connect fixtures',
    'Troubleshoot lighting circuits',
    'Install fixture whips',
    'Coordinate with ceiling grid / ACT installers',
    'Final lighting punch',
  ],
  'Panels / Switchgear / Distribution': [
    'Assist panel installation',
    'Terminate breakers / circuits if qualified',
    'Install panel schedules / labels',
    'Dress panels neatly',
    'Install disconnects',
    'Assist transformer installation',
    'Assist switchgear installation',
    'Install grounding and bonding support',
    'Support testing and energization',
  ],
  'Temporary Power': [
    'Install temporary power panels',
    'Run temporary power circuits',
    'Install temporary lighting',
    'Maintain temporary power',
    'Troubleshoot temporary power issues',
    'Remove temporary power at closeout',
  ],
  'Underground Electrical': [
    'Install underground PVC conduit',
    'Install duct bank support',
    'Install pull boxes / handholes support',
    'Pull underground feeders',
    'Coordinate trench / backfill with civil crews',
    'Install grounding support',
    'Work safely around trenches',
  ],
  'Electrical Service / Troubleshooting': [
    'Troubleshoot circuits',
    'Troubleshoot outlets / devices',
    'Troubleshoot lighting issues',
    'Use multimeter / basic testing tools',
    'Replace breakers / devices if qualified',
    'Repair damaged conduit / wiring',
    'Complete service call notes',
    'Support occupied building service work',
  ],
  'Industrial Electrical': [
    'Install industrial conduit / cable tray',
    'Assist motor control wiring',
    'Install disconnects / starters support',
    'Work around industrial equipment',
    'Shutdown / outage support',
    'Troubleshoot industrial circuits if qualified',
    'Read industrial drawings / one-lines',
    'Support lockout/tagout procedures',
  ],
  'Electrical Punch / Final Support': [
    'Complete electrical punch list items',
    'Replace damaged devices / covers',
    'Label panels / circuits',
    'Support final inspections',
    'Final lighting and device check',
    'Clean electrical rooms / equipment areas',
    'Assist with closeout support',
  ],

  // ==================== CONCRETE SKILLS ====================
  'Concrete Helper / General Concrete Labor': [
    'Move concrete materials',
    'Assist finishers',
    'Shovel and rake concrete',
    'Clean tools and forms',
    'Set up pour area',
    'Carry forms/rebar/mesh',
    'Water and cure concrete',
    'Install vapor barrier support',
    'Clean jobsite after pour',
    'Follow foreman direction safely',
  ],
  'Formwork / Form Carpenter': [
    'Build concrete forms',
    'Set forms',
    'Brace forms',
    'Strip forms',
    'Layout forms',
    'Set stakes/string lines',
    'Build footing forms',
    'Build grade beam forms',
    'Install form ties / hardware',
    'Repair/adjust forms before pour',
  ],
  'Rebar / Reinforcement': [
    'Tie rebar',
    'Place rebar',
    'Install dowels',
    'Install wire mesh',
    'Place chairs/spacers',
    'Read basic rebar layout',
    'Support pre-pour inspection',
    'Cut/bend rebar under direction',
    'Install reinforcement in footings/slabs',
    'Maintain cover and spacing',
  ],
  'Concrete Pour Support': [
    'Assist during concrete pour',
    'Guide chute or hose',
    'Rake concrete',
    'Vibrate concrete under direction',
    'Manage pour area cleanup',
    'Help finishers during pour',
    'Place concrete around embeds',
    'Support pump hose crew',
    'Control edges during pour',
    'Communicate with truck/pump crew',
  ],
  'Concrete Finishing': [
    'Bull float concrete',
    'Hand trowel finish',
    'Broom finish',
    'Edge concrete',
    'Use power trowel',
    'Finish slabs',
    'Finish sidewalks/curbs',
    'Apply control joint layout support',
    'Patch surface defects',
    'Work with concrete finishing tools',
  ],
  'Flatwork / Slabs': [
    'Prepare slab area',
    'Set screed guides',
    'Screed concrete',
    'Finish slab surface',
    'Install vapor barrier support',
    'Install wire mesh support',
    'Layout/control joints',
    'Sawcut slab joints',
    'Cure slabs',
    'Repair slab defects',
  ],
  'Sidewalks / Curbs / Site Concrete': [
    'Form sidewalks',
    'Pour sidewalks',
    'Finish sidewalks',
    'Set curb forms',
    'Finish curbs/gutters',
    'Broom finish exterior concrete',
    'Install expansion joints',
    'Repair exterior concrete',
    'Support ADA ramps',
    'Clean site concrete areas',
  ],
  'Foundations / Footings / Grade Beams': [
    'Build footing forms',
    'Set grade beam forms',
    'Place rebar in footings',
    'Assist foundation pour',
    'Vibrate foundation concrete under direction',
    'Strip foundation forms',
    'Patch honeycomb/voids',
    'Support anchor bolt placement',
    'Prepare foundation area',
    'Support pre-pour inspection',
  ],
  'Concrete Sawcutting / Core Drilling': [
    'Sawcut control joints',
    'Use walk-behind saw',
    'Use handheld concrete saw',
    'Core drill under direction',
    'Mark sawcut lines',
    'Manage slurry/dust cleanup',
    'Follow silica control procedures',
    'Cut openings under direction',
    'Support demo cuts',
    'Maintain saw/core equipment safely',
  ],
  'Concrete Repair / Patch / Demo': [
    'Chip concrete',
    'Patch concrete',
    'Repair surface defects',
    'Grind concrete',
    'Remove damaged concrete',
    'Prepare repair areas',
    'Apply patch material',
    'Repair edges/corners',
    'Clean repair areas',
    'Support small concrete demo',
  ],
  'Concrete Pump Support': [
    'Assist pump setup',
    'Support pump hose crew',
    'Manage hose movement',
    'Guide hose safely',
    'Communicate with pump operator',
    'Clean pump hose area',
    'Support pump washout',
    'Maintain safe pour path',
    'Help during high-volume pours',
    'Follow pump safety procedures',
  ],
  'Tilt-Up / Precast Support': [
    'Assist panel prep',
    'Place embeds/inserts under direction',
    'Support panel pour',
    'Patch panel defects',
    'Clean panel casting area',
    'Support precast/tilt-up crew',
    'Handle rigging area support only if authorized',
    'Follow lift-zone safety rules',
    'Assist layout under direction',
    'Support panel finishing',
  ],
  'Concrete Punch / Cleanup / Final Support': [
    'Complete concrete punch items',
    'Patch chips/cracks',
    'Clean slab areas',
    'Remove debris',
    'Grind small defects',
    'Touch up edges',
    'Clean forms/materials',
    'Support final inspection',
    'Repair minor surface issues',
    'Assist closeout cleanup',
  ],

  // ==================== CIVIL / SITEWORK SKILLS ====================
  'General Site Labor / Civil Labor': [
    'Move site materials',
    'Shovel / rake soil or rock',
    'Assist grading crew',
    'Assist trench crew',
    'Load / unload materials',
    'Use hand tools',
    'Use small compaction tools',
    'Spot equipment basic',
    'Site cleanup',
    'Install stakes / basic layout support',
    'Assist utility crew',
    'Prepare work area',
  ],
  'Earthwork / Grading': [
    'Rough grading support',
    'Fine grading support',
    'Backfill areas',
    'Compact soil',
    'Read grade stakes basic',
    'Use laser level basic',
    'Set grade stakes support',
    'Prepare subgrade',
    'Spread base material',
    'Check low/high areas',
    'Work with dozer/loader crew',
    'Final grade cleanup',
  ],
  'Excavation / Trenching': [
    'Assist excavation',
    'Dig by hand around utilities',
    'Prepare trenches',
    'Clean trench bottom',
    'Install bedding material',
    'Backfill trench',
    'Compact trench backfill',
    'Potholing / daylighting support',
    'Trench box awareness',
    'Trench safety support',
    'Spot excavator',
    'Mark trench area support',
  ],
  'Pipe Layer / Underground Utilities': [
    'Lay utility pipe',
    'Set pipe bedding',
    'Install storm pipe',
    'Install sewer pipe',
    'Install waterline support',
    'Install fittings',
    'Set pipe grade with laser',
    'Connect pipe sections',
    'Set manholes support',
    'Set catch basins / inlets support',
    'Install valves / hydrant support',
    'Backfill around pipe',
  ],
  'Storm Drain / Sewer / Water Utilities': [
    'Storm drain installation support',
    'Sanitary sewer support',
    'Waterline support',
    'Fire line support',
    'Set structures support',
    'Adjust manholes support',
    'Install cleanouts support',
    'Install utility fittings',
    'Pressure test support',
    'Leak repair support',
    'Utility trench cleanup',
    'Inspection support',
  ],
  'Utility Installation Support': [
    'Bedding pipe',
    'Haul pipe/materials',
    'Prepare fittings',
    'Assist pipe crew',
    'Measure pipe lengths',
    'Cut pipe support',
    'Install warning tape',
    'Install tracer wire support',
    'Utility cleanup',
    'Backfill utility trench',
    'Compact utility trench',
    'Assist utility inspection',
  ],
  'Erosion Control': [
    'Install silt fence',
    'Install inlet protection',
    'Install wattles',
    'Install erosion blanket',
    'Maintain SWPPP BMPs',
    'Clean stormwater inlets',
    'Repair erosion controls',
    'Install construction entrance support',
    'Sediment cleanup',
    'Slope protection support',
    'Fence/stake support',
    'Remove erosion controls',
  ],
  'Equipment Spotter / Grade Checker': [
    'Spot excavator',
    'Spot loader',
    'Spot trucks',
    'Communicate with operators',
    'Use hand signals',
    'Check grade with laser',
    'Read grade stakes',
    'Mark elevations basic',
    'Check trench depth',
    'Check pipe slope support',
    'Work around active equipment',
    'Traffic / equipment awareness',
  ],
  'Traffic Control / Flagging': [
    'Flag traffic',
    'Set cones/signs',
    'Lane closure support',
    'Pedestrian control',
    'Spot trucks entering site',
    'Direct delivery traffic',
    'Work zone setup support',
    'Work zone cleanup',
    'Night work traffic support',
    'Follow traffic control plan',
    'Use radio communication',
    'Safety watch',
  ],
  'Site Cleanup / Final Grading': [
    'Final site cleanup',
    'Remove debris',
    'Rake/level areas',
    'Clean around utilities',
    'Backfill low spots',
    'Prepare area for next trade',
    'Sweep / cleanup site access',
    'Remove excess material',
    'Support punch list',
    'Clean around structures',
    'Final grade support',
    'Load-out cleanup',
  ],
  'Heavy Equipment Operation': [
    'Skid Steer',
    'Mini Excavator',
    'Excavator',
    'Backhoe',
    'Dozer',
    'Front Loader / Wheel Loader',
    'Roller / Compactor',
    'Motor Grader',
    'Trencher',
    'Forklift / Telehandler',
    'Water Truck',
    'Dump Truck support / CDL if applicable',
    'Rough grade',
    'Fine grade',
    'Excavate trenches',
    'Load trucks',
    'Backfill trenches',
    'Compact soil/base',
    'Move materials',
    'Spread base material',
    'Work near utilities',
    'Finish grade support',
    'Operate safely around crews',
    'Read plans/basic stakes',
  ],

  // ==================== ASPHALT SKILLS ====================
  'Asphalt Helper / Labor': [
    'Move tools/materials',
    'Set cones / barricades',
    'Clean paving area',
    'Shovel asphalt basic',
    'Assist rake/lute workers',
    'Edge cleanup',
    'Truck spotter support',
    'Sweep / blow surface',
    'Load-out / cleanup',
    'Assist paving crew',
    'Carry asphalt hand tools',
    'Basic PPE / safety support',
  ],
  'Base Prep / Surface Prep': [
    'Clean surface before asphalt',
    'Sweep / blow debris',
    'Apply tack coat support',
    'Edge prep',
    'Base patch prep',
    'Minor base leveling',
    'Mark paving limits',
    'Remove loose material',
    'Prep for sealcoat',
    'Prep for patch',
    'Prepare parking lot areas',
    'Surface cleanup before paving',
  ],
  'Asphalt Paving Crew': [
    'Support paver operations',
    'Assist with hot mix asphalt',
    'Shovel asphalt at edges',
    'Truck dump support',
    'Spot asphalt trucks',
    'Clean around paver',
    'Edge feathering support',
    'Mat cleanup',
    'Communicate with crew',
    'Work around hot mix',
    'Support paving layout',
    'Assist production flow',
  ],
  'Raking / Lute Work': [
    'Rake asphalt',
    'Lute asphalt',
    'Spread hot mix by hand',
    'Feather edges',
    'Handwork behind paver',
    'Fix low/high spots',
    'Shape asphalt near structures',
    'Clean joints/edges',
    'Use asphalt lute',
    'Use rake/shovel',
    'Work around curbs/edges',
    'Patch handwork',
  ],
  'Screed / Paver Operation': [
    'Assist paver operator',
    'Run screed support',
    'Set mat depth support',
    'Monitor asphalt mat',
    'Adjust screed basic',
    'Check grade/slope basic',
    'Coordinate with trucks',
    'Watch edges',
    'Paver cleanup',
    'Paver setup support',
    'Paver breakdown support',
    'Production paving support',
  ],
  'Roller / Compaction': [
    'Operate roller',
    'Steel wheel roller',
    'Pneumatic roller',
    'Compact asphalt mat',
    'Compact asphalt patch',
    'Breakdown rolling',
    'Intermediate rolling',
    'Finish rolling',
    'Avoid roller marks',
    'Work behind paver',
    'Compact edges',
    'Roll parking lot / drive lanes',
  ],
  'Milling Support': [
    'Support milling crew',
    'Clean millings',
    'Sweep after milling',
    'Load millings support',
    'Traffic control support',
    'Mark milling limits',
    'Spot milling machine',
    'Prep milled surface',
    'Edge cleanup after milling',
    'Haul-off support',
    'Milling water truck support',
    'Milling punch cleanup',
  ],
  'Asphalt Patch / Repair': [
    'Sawcut patch area',
    'Remove failed asphalt',
    'Clean patch area',
    'Apply tack support',
    'Place hot mix patch',
    'Rake patch',
    'Compact patch',
    'Feather patch edges',
    'Pothole repair',
    'Utility cut patch',
    'Cold patch support',
    'Patch cleanup',
  ],
  'Sealcoating': [
    'Surface prep for sealcoat',
    'Apply sealcoat by squeegee',
    'Apply sealcoat by spray',
    'Mix sealcoat support',
    'Edge sealcoat areas',
    'Protect buildings/curbs',
    'Set cones/barricades',
    'Clean overspray',
    'Use squeegee tools',
    'Use spray system support',
    'Parking lot closure support',
    'Sealcoat cleanup',
  ],
  'Crack Filling': [
    'Clean cracks',
    'Blow out cracks',
    'Apply crack filler',
    'Route cracks basic',
    'Heat/apply material support',
    'Scrape excess material',
    'Seal around cracks',
    'Parking lot crack fill',
    'Roadway crack fill support',
    'Use crack fill equipment support',
    'Prep before sealcoat',
    'Cleanup after crack fill',
  ],
  'Striping / Pavement Marking': [
    'Layout parking stalls',
    'Paint parking lines',
    'Paint arrows',
    'Paint ADA markings',
    'Paint fire lanes',
    'Use striping machine',
    'Use stencils',
    'Chalk line layout',
    'Measure parking layout',
    'Install pavement markings',
    'Paint curbs',
    'Striping cleanup',
  ],
  'Wheel Stops / Bollards / Signs': [
    'Install wheel stops',
    'Anchor wheel stops',
    'Install bollards support',
    'Install parking signs',
    'Drill anchors',
    'Layout parking accessories',
    'Remove old wheel stops',
    'Replace signs/posts',
    'Set parking lot accessories',
    'Use basic concrete anchors',
    'Clean accessory area',
    'Punch list support',
  ],
  'Asphalt Cleanup / Punch': [
    'Final asphalt cleanup',
    'Remove cones/barricades',
    'Clean edges',
    'Sweep parking lot',
    'Remove loose asphalt',
    'Touch-up patch areas',
    'Support striping prep',
    'Load-out tools/materials',
    'Clean around drains/curbs',
    'Punch list support',
    'Remove debris',
    'Final project cleanup',
  ],

  // ==================== LANDSCAPING SKILLS ====================
  'Landscape Labor / Exterior Helper': [
    'Move landscape materials',
    'Load/unload plants, mulch, rock, sod, and tools',
    'Dig holes and trenches by hand',
    'Assist planting crews',
    'Assist irrigation crews',
    'Assist fence or site amenity installers',
    'General exterior cleanup',
    'Use shovel, rake, wheelbarrow, and basic hand tools',
  ],
  'Planting / Trees / Shrubs': [
    'Plant trees',
    'Plant shrubs',
    'Plant flowers or small plants',
    'Prepare planting holes',
    'Backfill and compact around plantings',
    'Stake trees',
    'Install edging around planting beds',
    'Water new plantings',
    'Read simple planting layout or plant schedule',
  ],
  'Sod / Turf Installation': [
    'Prepare soil for sod',
    'Lay sod rolls',
    'Cut and fit sod edges',
    'Roll sod',
    'Water sod after installation',
    'Repair damaged turf areas',
    'Install seed or straw where applicable',
    'Clean turf areas after installation',
  ],
  'Mulch / Rock / Ground Cover': [
    'Install mulch',
    'Install decorative rock',
    'Install ground cover fabric',
    'Spread soil or topsoil',
    'Install edging',
    'Shape planting beds',
    'Clean and finish landscape beds',
    'Load and move bulk materials',
  ],
  'Irrigation Support': [
    'Install irrigation pipe',
    'Assist trenching for irrigation lines',
    'Install sprinkler heads under supervision',
    'Install drip line under supervision',
    'Backfill irrigation trenches',
    'Repair simple irrigation lines',
    'Assist with irrigation testing',
    'Identify basic irrigation components',
  ],
  'Landscape Drainage Support': [
    'Install landscape drain pipe',
    'Assist French drain installation',
    'Install catch basins under supervision',
    'Place gravel around drainage pipe',
    'Backfill drainage trenches',
    'Clean drainage areas',
    'Assist with grading for drainage',
    'Repair minor landscape drainage issues',
  ],
  'Fencing / Gates': [
    'Install fence panels',
    'Install gates',
    'Install chain link support',
    'Install basic hardware',
    'Assist with layout and string lines',
    'Set fence posts',
    'Install temporary fencing',
    'Install wood fence support',
    'Repair fence sections',
  ],
  'Exterior Site Amenities': [
    'Install benches under supervision',
    'Install trash receptacles',
    'Install site signage support',
    'Assemble exterior amenities',
    'Install bike racks under supervision',
    'Install bollards under supervision',
    'Install wheel stops support',
    'Final alignment and cleanup around amenities',
  ],
  'Pavers / Landscape Hardscape': [
    'Prepare base for pavers',
    'Cut pavers under supervision',
    'Spread sand or setting bed',
    'Fill joints',
    'Assist hardscape layout',
    'Set pavers',
    'Install edge restraints',
    'Compact pavers',
    'Repair paver areas',
  ],
  'Retaining Wall Support': [
    'Carry and stage wall blocks',
    'Prepare base',
    'Install drainage stone behind wall',
    'Compact wall base',
    'Assist retaining wall layout',
    'Set landscape wall blocks under supervision',
    'Backfill wall area',
    'Clean retaining wall work area',
  ],
  'Playground / Outdoor Equipment Support': [
    'Unload playground components',
    'Assist setting posts or anchors',
    'Move rubber mulch or surface material',
    'Assist outdoor equipment installers',
    'Assist equipment assembly',
    'Install safety surfacing support',
    'Final cleanup around playground',
    'Follow layout under supervision',
  ],
  'Exterior Cleanup / Final Appearance': [
    'Pick up debris',
    'Remove landscape waste',
    'Final site appearance cleanup',
    'Prepare exterior for turnover',
    'Sweep exterior areas',
    'Clean around sidewalks and curbs',
    'Pressure wash support',
    'Touch up landscape beds',
  ],
  'Maintenance / Landscape Service': [
    'Mowing support',
    'Blowing debris',
    'Seasonal cleanup',
    'Basic irrigation checks',
    'Trimming / edging support',
    'Weed control support',
    'Plant replacement support',
    'Routine landscape service support',
  ],
  'Exterior Punch / Final Corrections': [
    'Repair damaged sod',
    'Fix mulch/rock areas',
    'Clean final exterior punch items',
    'Support final walkthrough corrections',
    'Replace plants',
    'Correct fence or gate issues under supervision',
    'Touch up pavers/hardscape',
    'Complete owner/GC punch list items',
  ],

  // ==================== OTHER TRADES (placeholder) ====================
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

// ✅ Experience Level options (varies by trade)
const EXPERIENCE_LEVELS = {
  // Electrical
  'Electrical Helper / Material Handling': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Electrical Rough-In': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Conduit / Raceway Installation': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Wire Pulling / Cabling': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Boxes / Devices / Trim-Out': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Lighting / Fixtures': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Panels / Switchgear / Distribution': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Temporary Power': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Underground Electrical': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Electrical Service / Troubleshooting': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Industrial Electrical': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],
  'Electrical Punch / Final Support': ['Helper', 'Apprentice / Trainee', 'Skilled Worker / Installer', 'Journeyman-Level Electrician', 'Licensed Electrician', 'Lead', 'Foreman'],

  // Concrete
  'Concrete Helper / General Concrete Labor': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Formwork / Form Carpenter': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Rebar / Reinforcement': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Concrete Pour Support': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Concrete Finishing': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Flatwork / Slabs': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Sidewalks / Curbs / Site Concrete': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Foundations / Footings / Grade Beams': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Concrete Sawcutting / Core Drilling': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Concrete Repair / Patch / Demo': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Concrete Pump Support': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Tilt-Up / Precast Support': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],
  'Concrete Punch / Cleanup / Final Support': ['Helper', 'Apprentice', 'Skilled Worker', 'Concrete Finisher', 'Form Carpenter', 'Rebar Installer', 'Sawcutter / Core Drill Specialist', 'Lead/Foreman', 'Specialty Concrete Worker'],

  // Asphalt
  'Asphalt Helper / Labor': ['Helper', 'Skilled Worker', 'Lead'],
  'Base Prep / Surface Prep': ['Helper', 'Skilled Worker', 'Lead'],
  'Asphalt Paving Crew': ['Helper', 'Skilled Worker', 'Lead', 'Foreman'],
  'Raking / Lute Work': ['Helper', 'Skilled Worker', 'Lead'],
  'Screed / Paver Operation': ['Can assist', 'Operator-level', 'Specialist', 'Foreman'],
  'Roller / Compaction': ['Can assist', 'Operator', 'Advanced', 'Lead Operator'],
  'Milling Support': ['Helper', 'Skilled Worker', 'Lead'],
  'Asphalt Patch / Repair': ['Helper', 'Skilled Worker', 'Lead'],
  'Sealcoating': ['Helper', 'Skilled Worker', 'Specialist', 'Lead'],
  'Crack Filling': ['Helper', 'Skilled Worker', 'Specialist', 'Lead'],
  'Striping / Pavement Marking': ['Helper', 'Skilled Worker', 'Specialist', 'Lead'],
  'Wheel Stops / Bollards / Signs': ['Helper', 'Skilled Worker', 'Lead'],
  'Asphalt Cleanup / Punch': ['Helper', 'Skilled Worker', 'Lead'],

  // Landscaping
  'Landscape Labor / Exterior Helper': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Planting / Trees / Shrubs': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Sod / Turf Installation': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Mulch / Rock / Ground Cover': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Irrigation Support': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Landscape Drainage Support': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Fencing / Gates': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Exterior Site Amenities': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Pavers / Landscape Hardscape': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Retaining Wall Support': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Playground / Outdoor Equipment Support': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Exterior Cleanup / Final Appearance': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Maintenance / Landscape Service': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],
  'Exterior Punch / Final Corrections': ['Helper', 'Apprentice', 'Skilled Worker', 'Lead', 'Foreman'],

  // HVAC
  'HVAC Helper / Mechanical Labor': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],
  'Ductwork / Sheet Metal Installation': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],
  'HVAC Equipment Installation': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],
  'HVAC Service / Repair': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],
  'HVAC Startup / Commissioning': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],
  'HVAC Controls / BAS': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],
  'Refrigeration': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],
  'Hydronic / Mechanical Piping': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],
  'Air Distribution / Diffusers / Grilles': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],
  'HVAC Punch / Troubleshooting / Final Support': ['Helper', 'Apprentice / Junior', 'Skilled Worker / Installer', 'Mechanic / Technician', 'Lead / Foreman', 'Specialty / Advanced Tech'],

  // Civil
  'General Site Labor / Civil Labor': ['Helper', 'Skilled Worker', 'Lead'],
  'Earthwork / Grading': ['Helper', 'Skilled Worker', 'Lead', 'Foreman'],
  'Pipe Layer / Underground Utilities': ['Helper', 'Skilled Worker', 'Pipe Layer', 'Lead', 'Foreman'],
  'Heavy Equipment Operation': ['Can assist', 'Can Operator', 'Advanced', 'Lead Operator'],
  'Traffic Control / Flagging': ['Helper', 'Flagger', 'Lead'],
  'Excavation / Trenching': ['Helper', 'Skilled Worker', 'Lead'],
  'Storm Drain / Sewer / Water Utilities': ['Helper', 'Skilled Worker', 'Lead'],
  'Utility Installation Support': ['Helper', 'Skilled Worker', 'Lead'],
  'Erosion Control': ['Helper', 'Skilled Worker', 'Lead'],
  'Equipment Spotter / Grade Checker': ['Helper', 'Skilled Worker', 'Lead'],
  'Site Cleanup / Final Grading': ['Helper', 'Skilled Worker', 'Lead'],
  'default': ['Helper', 'Skilled Worker', 'Lead', 'Foreman'],
}

// ✅ Years of Experience options
const YEARS_OF_EXPERIENCE = [
  '0-1',
  '1-3',
  '3-5',
  '5-10',
  '10+',
]

// ✅ Tools, Certifications, and Requirements for each trade
const TOOLS_CERTIFICATIONS_INTERIORS = [
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

const TOOLS_CERTIFICATIONS_HVAC = [
  'EPA 608 Universal',
  'EPA 608 Type I',
  'EPA 608 Type II',
  'EPA 608 Type III',
  'OSHA 10',
  'OSHA 30',
  'Lift certification',
  'Fall protection training',
  'Hot work / brazing experience',
  'Confined space awareness',
  'First aid / CPR',
  'Other certification - optional note',
  'Own basic hand tools',
  'Own power tools',
  'Tin snips / sheet metal tools',
  'Cordless drill / impact',
  'Multimeter',
  'Refrigerant gauges',
  'Vacuum pump',
  'Recovery machine',
  'Brazing tools',
  'Manometer',
  'Ladders',
  'PPE available',
]

const TOOLS_CERTIFICATIONS_CIVIL = [
  'OSHA 10',
  'OSHA 30',
  'Trench safety awareness',
  'Competent person - trenching',
  'Flagger certification',
  'Confined space awareness',
  'First aid / CPR',
  'Valid driver license',
  'CDL',
  'Equipment certification/card',
  'TWIC / secure site eligible',
  'Can pass background check',
  'Has PPE',
  'Work boots',
  'Hard hat',
  'Safety vest',
  'Own hand tools',
  'Can work outdoors',
  'Can work around heavy equipment',
  'Can work in heat/cold',
]

const TOOLS_CERTIFICATIONS_ELECTRICAL = [
  'Electrical apprentice card / registration',
  'Journeyman electrician license',
  'Master electrician license',
  'Lift certification',
  'OSHA 10',
  'OSHA 30',
  'Fall protection training',
  'NFPA 70E / electrical safety training',
  'Lockout/Tagout awareness',
  'Own basic hand tools',
  'Own Cordless tools',
  'Conduit bender',
  'Fish tape',
  'Multimeter',
  'Label maker',
  'Reliable transportation',
  'Valid driver license',
  'Service vehicle available',
  'Electrical tool bag',
  'Ladders',
  'PPE available',
]

const TOOLS_CERTIFICATIONS_CONCRETE = [
  'OSHA 10',
  'OSHA 30',
  'Silica awareness',
  'Fall protection',
  'Lift experience',
  'Confined space awareness',
  'Trench safety awareness',
  'Hot work awareness',
  'Own basic hand tools',
  'Concrete finishing tools',
  'Bull float experience',
  'Power trowel experience',
  'Concrete saw experience',
  'Core drill experience',
  'Laser level experience',
  'Vibrator experience',
  'Hard hat',
  'Safety vest',
  'Gloves',
  'Boots',
  'Eye protection',
  'Hearing protection',
]

const TOOLS_CERTIFICATIONS_ASPHALT = [
  'OSHA 10',
  'OSHA 30',
  'Traffic control awareness',
  'Flagger certification',
  'Work zone safety',
  'Hot work / heat exposure experience',
  'First aid / CPR',
  'Valid driver license',
  'CDL',
  'Equipment card/certification',
  'Can pass background check',
  'Secure/badged site eligible',
  'Has PPE',
  'High-vis vest/clothing',
  'Work boots',
  'Hard hat',
  'Asphalt hand tools',
  'Rake/lute tools',
  'Sealcoat tools',
  'Striping layout tools',
  'Can work around traffic',
  'Can work in heat',
  'Can work nights',
  'Can work weekends',
]

const TOOLS_CERTIFICATIONS_LANDSCAPING = [
  'Own basic hand tools',
  'Shovel / Rake / Wheelbarrow / Pruners / Landscape hand tools',
  'Mower',
  'String trimmer',
  'Blower',
  'Plate compactor',
  'Sod roller',
  'Small Paver tools',
  'Cut-off saw experience',
  'Post hole digger',
  'Fence stretcher',
  'Basic hardware tools',
  'Trenching tools',
  'Basic irrigation repair tools',
  'Has PPE',
  'Outdoor work experience',
  'Heat/weather tolerance',
  'OSHA 10',
  'First aid optional',
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
    // Reset tools certifications when main trade changes
    setToolsCertifications({})
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

  // ✅ Get experience levels for a specific skill group
  const getExperienceLevels = (skillGroup) => {
    return EXPERIENCE_LEVELS[skillGroup] || EXPERIENCE_LEVELS['default']
  }

  // ✅ Get tools/certifications based on selected trade
  const getToolsCertifications = () => {
    const mainTrade = data.mainTrade || ''
    if (mainTrade === 'Interiors') {
      return TOOLS_CERTIFICATIONS_INTERIORS
    } else if (mainTrade === 'HVAC/Mechanical') {
      return TOOLS_CERTIFICATIONS_HVAC
    } else if (mainTrade === 'Civil / Sitework / Earthwork / Utilities') {
      return TOOLS_CERTIFICATIONS_CIVIL
    } else if (mainTrade === 'Electrical / Power') {
      return TOOLS_CERTIFICATIONS_ELECTRICAL
    } else if (mainTrade === 'Concrete / Formwork / Rebar / Flatwork') {
      return TOOLS_CERTIFICATIONS_CONCRETE
    } else if (mainTrade === 'Asphalt / Paving Work') {
      return TOOLS_CERTIFICATIONS_ASPHALT
    } else if (mainTrade === 'Landscaping / Exterior Improvements') {
      return TOOLS_CERTIFICATIONS_LANDSCAPING
    }
    return []
  }

  const selectedTrade = data.mainTrade || ''
  const groups = getSkillGroups()
  const toolsList = getToolsCertifications()
  const showToolsSection = selectedTrade === 'Interiors' || 
                          selectedTrade === 'HVAC/Mechanical' || 
                          selectedTrade === 'Civil / Sitework / Earthwork / Utilities' ||
                          selectedTrade === 'Electrical / Power' ||
                          selectedTrade === 'Concrete / Formwork / Rebar / Flatwork' ||
                          selectedTrade === 'Asphalt / Paving Work' ||
                          selectedTrade === 'Landscaping / Exterior Improvements'

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
                        {getExperienceLevels(group).map((level) => (
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
          {showToolsSection && toolsList.length > 0 && (
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
                {toolsList.map((tool) => (
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
          )}
        </div>
      </div>
    </div>
  )
}

export default WizardStep2