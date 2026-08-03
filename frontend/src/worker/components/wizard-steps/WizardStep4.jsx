
// // src/worker/components/wizard-steps/WizardStep4.jsx
// import { useState, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TextField } from '../../../common/components/TextField'
// import { IconFolder, IconSupport, IconLocation, IconUser, IconPhone } from '../../../common/components/Icons'

// export function WizardStep4({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ FIX: Update only the specific project field
//   const updateProjectField = (index, key) => (value) => {
//     const projects = [...(data.projects || [])]
//     projects[index] = { ...projects[index], [key]: value }
//     onChange({ projects })
//   }

//   // Handle date change from react-datepicker
//   const handleDateChange = (index, field) => (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       updateProjectField(index, field)(`${month}/${day}/${year}`)
//     } else {
//       updateProjectField(index, field)('')
//     }
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

//   const projects = data.projects || [
//     { name: '', client: '', phone: '', trade: '', start: '', end: '' },
//     { name: '', client: '', phone: '', trade: '', start: '', end: '' },
//     { name: '', client: '', phone: '', trade: '', start: '', end: '' },
//   ]

//   // Trade options
//   const tradeOptions = [
//     'Interiors',
//     'HVAC/Mechanical',
//     'Electrical / Power',
//     'Plumbing / Piping',
//     'Concrete / Formwork / Rebar / Flatwork',
//     'Civil / Sitework / Earthwork / Utilities',
//     'Asphalt / Paving Work',
//     'Landscaping / Exterior Improvements',
//     'Roofing / Waterproofing',
//     'General Labor / Site Support / Material Handling',
//     'Demolition / Selective Demo / Abatement Support',
//     'Masonry / Stucco / EIFS Systems',
//     'Structural Steel / Misc. Metals / Welding',
//     'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems',
//     'Millwork / Cabinets / Finish Carpentry',
//     'Flooring / Tile / Resilient / Carpet Systems',
//     'Painting / Coatings / Wallcovering Systems',
//     'Doors / Frames / Hardware / Openings Systems',
//     'Glass / Glazing / Storefront',
//     'Fire Protection / Sprinkler Systems',
//     'Firestopping / Fireproofing / Joint Sealants',
//     'Low Voltage / Data / Security / Fire Alarm',
//     'Division 10 Specialties / Accessories / Signage Systems',
//     'Equipment / Specialty Installations / Owner-Furnished Equipment Systems'
//   ]

//   // Custom styles for date picker and trade select
//   const customStyles = `
//     /* Date picker styles */
//     .custom-date-picker .react-datepicker__input-container input {
//       width: 100%;
//       height: 40px;
//       padding: 0 12px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 8px;
//       font-size: 13px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//     }

//     .custom-date-picker .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .custom-date-picker .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .custom-date-picker .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .custom-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//     }

//     .custom-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }

//     .custom-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }

//     .custom-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }

//     .custom-date-picker .react-datepicker__day {
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

//     .custom-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }

//     .custom-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }

//     .custom-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }

//     .custom-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }

//     .custom-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }

//     .custom-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }

//     .custom-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }

//     .custom-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }

//     .custom-date-picker .react-datepicker__day--outside-month {
//       color: rgba(23, 38, 58, 0.2);
//     }

//     .custom-date-picker .react-datepicker__navigation {
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

//     .custom-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }

//     .custom-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }

//     .custom-date-picker .react-datepicker__navigation-icon:hover::before {
//       border-color: #0f4ea9;
//     }

//     .custom-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }

//     .custom-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }

//     .date-picker-wrapper {
//       position: relative;
//       flex: 1;
//     }

//     .date-picker-wrapper .calendar-icon {
//       position: absolute;
//       right: 10px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: rgba(23, 38, 58, 0.4);
//       pointer-events: none;
//       font-size: 14px;
//       line-height: 1;
//     }

//     .date-picker-wrapper .react-datepicker__input-container input {
//       padding-right: 36px !important;
//     }

//     /* Trade select styles */
//     .trade-select-wrapper {
//       position: relative;
//       width: 100%;
//     }

//     .trade-select-wrapper select {
//       width: 100%;
//       height: 40px;
//       padding: 0 12px;
//       padding-right: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 8px;
//       font-size: 13px;
//       font-family: inherit;
//       background: white;
//       color: #17263a;
//       outline: none;
//       transition: all 0.2s ease;
//       cursor: pointer;
//       box-sizing: border-box;
//     }

//     .trade-select-wrapper select:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .trade-select-wrapper select:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .trade-select-wrapper select option {
//       padding: 8px 12px;
//       font-size: 13px;
//     }

//     .trade-select-wrapper select option.placeholder-option {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .trade-select-wrapper .select-icon {
//       position: absolute;
//       left: 12px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: rgba(23, 38, 58, 0.4);
//       pointer-events: none;
//       font-size: 14px;
//       display: flex;
//       align-items: center;
//     }

//     .trade-select-wrapper select.has-icon {
//       padding-left: 36px;
//     }

//     .project-card {
//       padding: 16px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       border-radius: 12px;
//       background: white;
//     }

//     .project-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #0f4ea9;
//       margin-bottom: 12px;
//     }

//     .flex-row {
//       display: flex;
//       gap: 8px;
//     }

//     .flex-row > * {
//       flex: 1;
//     }

//     .grid-3-col {
//       display: grid;
//       grid-template-columns: repeat(3, 1fr);
//       gap: 16px;
//       margin-top: 12px;
//     }

//     .mb-8 {
//       margin-bottom: 8px;
//     }

//     .mt-8 {
//       margin-top: 8px;
//     }
//   `

//   return (
//     <div className="wizardStep">
//       <style>{customStyles}</style>
      
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="grid-3-col">
//             {/* Project 1 */}
//             <div className="project-card">
//               <div className="project-title">{t('wizard.step4.project')} 1</div>
              
//               <TextField
//                 placeholder={t('wizard.step4.companyName')}
//                 icon={<IconFolder />}
//                 value={projects[0]?.name || ''}
//                 onChange={updateProjectField(0, 'name')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.client')}
//                 icon={<IconSupport />}
//                 value={projects[0]?.client || ''}
//                 onChange={updateProjectField(0, 'client')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.employerPhone')}
//                 icon={<IconPhone />}
//                 value={projects[0]?.phone || ''}
//                 onChange={updateProjectField(0, 'phone')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <div className="flex-row mb-8">
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[0]?.start || '')}
//                     onChange={handleDateChange(0, 'start')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.start')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[0]?.end || '')}
//                     onChange={handleDateChange(0, 'end')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.end')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//               </div>
              
//               <div className="trade-select-wrapper mt-8">
//                 <select 
//                   value={projects[0]?.trade || ''} 
//                   onChange={(e) => updateProjectField(0, 'trade')(e.target.value)}
//                   className="has-icon"
//                   style={{
//                     color: projects[0]?.trade ? '#17263a' : '#6b7280',
//                   }}
//                 >
//                   <option value="" className="placeholder-option" disabled>
//                     {t('wizard.step4.trade')}
//                   </option>
//                   {tradeOptions.map((trade) => (
//                     <option key={trade} value={trade}>
//                       {trade}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="select-icon"><IconSupport /></span>
//               </div>
//             </div>

//             {/* Project 2 */}
//             <div className="project-card">
//               <div className="project-title">{t('wizard.step4.project')} 2</div>
              
//               <TextField
//                 placeholder={t('wizard.step4.companyName')}
//                 icon={<IconFolder />}
//                 value={projects[1]?.name || ''}
//                 onChange={updateProjectField(1, 'name')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.client')}
//                 icon={<IconSupport />}
//                 value={projects[1]?.client || ''}
//                 onChange={updateProjectField(1, 'client')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.employerPhone')}
//                 icon={<IconPhone />}
//                 value={projects[1]?.phone || ''}
//                 onChange={updateProjectField(1, 'phone')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <div className="flex-row mb-8">
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[1]?.start || '')}
//                     onChange={handleDateChange(1, 'start')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.start')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[1]?.end || '')}
//                     onChange={handleDateChange(1, 'end')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.end')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//               </div>
              
//               <div className="trade-select-wrapper mt-8">
//                 <select 
//                   value={projects[1]?.trade || ''} 
//                   onChange={(e) => updateProjectField(1, 'trade')(e.target.value)}
//                   className="has-icon"
//                   style={{
//                     color: projects[1]?.trade ? '#17263a' : '#6b7280',
//                   }}
//                 >
//                   <option value="" className="placeholder-option" disabled>
//                     {t('wizard.step4.trade')}
//                   </option>
//                   {tradeOptions.map((trade) => (
//                     <option key={trade} value={trade}>
//                       {trade}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="select-icon"><IconSupport /></span>
//               </div>
//             </div>

//             {/* Project 3 */}
//             <div className="project-card">
//               <div className="project-title">{t('wizard.step4.project')} 3</div>
              
//               <TextField
//                 placeholder={t('wizard.step4.companyName')}
//                 icon={<IconFolder />}
//                 value={projects[2]?.name || ''}
//                 onChange={updateProjectField(2, 'name')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.client')}
//                 icon={<IconSupport />}
//                 value={projects[2]?.client || ''}
//                 onChange={updateProjectField(2, 'client')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.employerPhone')}
//                 icon={<IconPhone />}
//                 value={projects[2]?.phone || ''}
//                 onChange={updateProjectField(2, 'phone')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <div className="flex-row mb-8">
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[2]?.start || '')}
//                     onChange={handleDateChange(2, 'start')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.start')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[2]?.end || '')}
//                     onChange={handleDateChange(2, 'end')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.end')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//               </div>
              
//               <div className="trade-select-wrapper mt-8">
//                 <select 
//                   value={projects[2]?.trade || ''} 
//                   onChange={(e) => updateProjectField(2, 'trade')(e.target.value)}
//                   className="has-icon"
//                   style={{
//                     color: projects[2]?.trade ? '#17263a' : '#6b7280',
//                   }}
//                 >
//                   <option value="" className="placeholder-option" disabled>
//                     {t('wizard.step4.trade')}
//                   </option>
//                   {tradeOptions.map((trade) => (
//                     <option key={trade} value={trade}>
//                       {trade}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="select-icon"><IconSupport /></span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep4






// // src/worker/components/wizard-steps/WizardStep4.jsx
// import { useState, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TextField } from '../../../common/components/TextField'
// import { IconFolder, IconSupport, IconLocation, IconUser, IconPhone } from '../../../common/components/Icons'

// export function WizardStep4({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ FIX: Update only the specific project field
//   const updateProjectField = (index, key) => (value) => {
//     const projects = [...(data.projects || [])]
//     projects[index] = { ...projects[index], [key]: value }
//     onChange({ projects })
//   }

//   // Handle date change from react-datepicker
//   const handleDateChange = (index, field) => (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       updateProjectField(index, field)(`${month}/${day}/${year}`)
//     } else {
//       updateProjectField(index, field)('')
//     }
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

//   const projects = data.projects || [
//     { name: '', client: '', phone: '', trade: '', start: '', end: '' },
//     { name: '', client: '', phone: '', trade: '', start: '', end: '' },
//     { name: '', client: '', phone: '', trade: '', start: '', end: '' },
//   ]

//   // Trade options (these are technical terms, keep as-is)
//   const tradeOptions = [
//     'Interiors',
//     'HVAC/Mechanical',
//     'Electrical / Power',
//     'Plumbing / Piping',
//     'Concrete / Formwork / Rebar / Flatwork',
//     'Civil / Sitework / Earthwork / Utilities',
//     'Asphalt / Paving Work',
//     'Landscaping / Exterior Improvements',
//     'Roofing / Waterproofing',
//     'General Labor / Site Support / Material Handling',
//     'Demolition / Selective Demo / Abatement Support',
//     'Masonry / Stucco / EIFS Systems',
//     'Structural Steel / Misc. Metals / Welding',
//     'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems',
//     'Millwork / Cabinets / Finish Carpentry',
//     'Flooring / Tile / Resilient / Carpet Systems',
//     'Painting / Coatings / Wallcovering Systems',
//     'Doors / Frames / Hardware / Openings Systems',
//     'Glass / Glazing / Storefront',
//     'Fire Protection / Sprinkler Systems',
//     'Firestopping / Fireproofing / Joint Sealants',
//     'Low Voltage / Data / Security / Fire Alarm',
//     'Division 10 Specialties / Accessories / Signage Systems',
//     'Equipment / Specialty Installations / Owner-Furnished Equipment Systems'
//   ]

//   // Custom styles for date picker and trade select
//   const customStyles = `
//     /* Date picker styles */
//     .custom-date-picker .react-datepicker__input-container input {
//       width: 100%;
//       height: 40px;
//       padding: 0 12px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 8px;
//       font-size: 13px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//     }

//     .custom-date-picker .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .custom-date-picker .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .custom-date-picker .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .custom-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//     }

//     .custom-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }

//     .custom-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }

//     .custom-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }

//     .custom-date-picker .react-datepicker__day {
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

//     .custom-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }

//     .custom-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }

//     .custom-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }

//     .custom-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }

//     .custom-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }

//     .custom-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }

//     .custom-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }

//     .custom-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }

//     .custom-date-picker .react-datepicker__day--outside-month {
//       color: rgba(23, 38, 58, 0.2);
//     }

//     .custom-date-picker .react-datepicker__navigation {
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

//     .custom-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }

//     .custom-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }

//     .custom-date-picker .react-datepicker__navigation-icon:hover::before {
//       border-color: #0f4ea9;
//     }

//     .custom-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }

//     .custom-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }

//     .date-picker-wrapper {
//       position: relative;
//       flex: 1;
//     }

//     .date-picker-wrapper .calendar-icon {
//       position: absolute;
//       right: 10px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: rgba(23, 38, 58, 0.4);
//       pointer-events: none;
//       font-size: 14px;
//       line-height: 1;
//     }

//     .date-picker-wrapper .react-datepicker__input-container input {
//       padding-right: 36px !important;
//     }

//     /* Trade select styles */
//     .trade-select-wrapper {
//       position: relative;
//       width: 100%;
//     }

//     .trade-select-wrapper select {
//       width: 100%;
//       height: 40px;
//       padding: 0 12px;
//       padding-right: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 8px;
//       font-size: 13px;
//       font-family: inherit;
//       background: white;
//       color: #17263a;
//       outline: none;
//       transition: all 0.2s ease;
//       cursor: pointer;
//       box-sizing: border-box;
//     }

//     .trade-select-wrapper select:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .trade-select-wrapper select:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .trade-select-wrapper select option {
//       padding: 8px 12px;
//       font-size: 13px;
//     }

//     .trade-select-wrapper select option.placeholder-option {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .trade-select-wrapper .select-icon {
//       position: absolute;
//       left: 12px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: rgba(23, 38, 58, 0.4);
//       pointer-events: none;
//       font-size: 14px;
//       display: flex;
//       align-items: center;
//     }

//     .trade-select-wrapper select.has-icon {
//       padding-left: 36px;
//     }

//     .project-card {
//       padding: 16px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       border-radius: 12px;
//       background: white;
//     }

//     .project-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #0f4ea9;
//       margin-bottom: 12px;
//     }

//     .flex-row {
//       display: flex;
//       gap: 8px;
//     }

//     .flex-row > * {
//       flex: 1;
//     }

//     .grid-3-col {
//       display: grid;
//       grid-template-columns: repeat(3, 1fr);
//       gap: 16px;
//       margin-top: 12px;
//     }

//     .mb-8 {
//       margin-bottom: 8px;
//     }

//     .mt-8 {
//       margin-top: 8px;
//     }
//   `

//   return (
//     <div className="wizardStep">
//       <style>{customStyles}</style>
      
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="grid-3-col">
//             {/* Project 1 */}
//             <div className="project-card">
//               <div className="project-title">{t('wizard.step4.project')} 1</div>
              
//               <TextField
//                 placeholder={t('wizard.step4.companyName')}
//                 icon={<IconFolder />}
//                 value={projects[0]?.name || ''}
//                 onChange={updateProjectField(0, 'name')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.client')}
//                 icon={<IconSupport />}
//                 value={projects[0]?.client || ''}
//                 onChange={updateProjectField(0, 'client')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.employerPhone')}
//                 icon={<IconPhone />}
//                 value={projects[0]?.phone || ''}
//                 onChange={updateProjectField(0, 'phone')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <div className="flex-row mb-8">
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[0]?.start || '')}
//                     onChange={handleDateChange(0, 'start')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.start')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[0]?.end || '')}
//                     onChange={handleDateChange(0, 'end')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.end')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//               </div>
              
//               <div className="trade-select-wrapper mt-8">
//                 <select 
//                   value={projects[0]?.trade || ''} 
//                   onChange={(e) => updateProjectField(0, 'trade')(e.target.value)}
//                   className="has-icon"
//                   style={{
//                     color: projects[0]?.trade ? '#17263a' : '#6b7280',
//                   }}
//                 >
//                   <option value="" className="placeholder-option" disabled>
//                     {t('wizard.step4.trade')}
//                   </option>
//                   {tradeOptions.map((trade) => (
//                     <option key={trade} value={trade}>
//                       {trade}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="select-icon"><IconSupport /></span>
//               </div>
//             </div>

//             {/* Project 2 */}
//             <div className="project-card">
//               <div className="project-title">{t('wizard.step4.project')} 2</div>
              
//               <TextField
//                 placeholder={t('wizard.step4.companyName')}
//                 icon={<IconFolder />}
//                 value={projects[1]?.name || ''}
//                 onChange={updateProjectField(1, 'name')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.client')}
//                 icon={<IconSupport />}
//                 value={projects[1]?.client || ''}
//                 onChange={updateProjectField(1, 'client')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.employerPhone')}
//                 icon={<IconPhone />}
//                 value={projects[1]?.phone || ''}
//                 onChange={updateProjectField(1, 'phone')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <div className="flex-row mb-8">
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[1]?.start || '')}
//                     onChange={handleDateChange(1, 'start')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.start')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[1]?.end || '')}
//                     onChange={handleDateChange(1, 'end')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.end')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//               </div>
              
//               <div className="trade-select-wrapper mt-8">
//                 <select 
//                   value={projects[1]?.trade || ''} 
//                   onChange={(e) => updateProjectField(1, 'trade')(e.target.value)}
//                   className="has-icon"
//                   style={{
//                     color: projects[1]?.trade ? '#17263a' : '#6b7280',
//                   }}
//                 >
//                   <option value="" className="placeholder-option" disabled>
//                     {t('wizard.step4.trade')}
//                   </option>
//                   {tradeOptions.map((trade) => (
//                     <option key={trade} value={trade}>
//                       {trade}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="select-icon"><IconSupport /></span>
//               </div>
//             </div>

//             {/* Project 3 */}
//             <div className="project-card">
//               <div className="project-title">{t('wizard.step4.project')} 3</div>
              
//               <TextField
//                 placeholder={t('wizard.step4.companyName')}
//                 icon={<IconFolder />}
//                 value={projects[2]?.name || ''}
//                 onChange={updateProjectField(2, 'name')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.client')}
//                 icon={<IconSupport />}
//                 value={projects[2]?.client || ''}
//                 onChange={updateProjectField(2, 'client')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <TextField
//                 placeholder={t('wizard.step4.employerPhone')}
//                 icon={<IconPhone />}
//                 value={projects[2]?.phone || ''}
//                 onChange={updateProjectField(2, 'phone')}
//                 style={{ marginBottom: '8px' }}
//               />
              
//               <div className="flex-row mb-8">
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[2]?.start || '')}
//                     onChange={handleDateChange(2, 'start')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.start')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[2]?.end || '')}
//                     onChange={handleDateChange(2, 'end')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.end')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//               </div>
              
//               <div className="trade-select-wrapper mt-8">
//                 <select 
//                   value={projects[2]?.trade || ''} 
//                   onChange={(e) => updateProjectField(2, 'trade')(e.target.value)}
//                   className="has-icon"
//                   style={{
//                     color: projects[2]?.trade ? '#17263a' : '#6b7280',
//                   }}
//                 >
//                   <option value="" className="placeholder-option" disabled>
//                     {t('wizard.step4.trade')}
//                   </option>
//                   {tradeOptions.map((trade) => (
//                     <option key={trade} value={trade}>
//                       {trade}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="select-icon"><IconSupport /></span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep4







// // src/worker/components/wizard-steps/WizardStep4.jsx
// import { useState, useRef } from 'react'
// import { useTranslation } from 'react-i18next'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { TextField } from '../../../common/components/TextField'
// import { IconFolder, IconSupport, IconLocation, IconUser, IconPhone } from '../../../common/components/Icons'

// export function WizardStep4({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ Validation error states for each project
//   const [errors, setErrors] = useState({
//     0: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
//     1: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
//     2: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
//   })
//   const [generalError, setGeneralError] = useState('')

//   // ✅ FIX: Update only the specific project field
//   const updateProjectField = (index, key) => (value) => {
//     const projects = [...(data.projects || [])]
//     projects[index] = { ...projects[index], [key]: value }
//     onChange({ projects })
    
//     // Clear error for this field when user types
//     if (errors[index] && errors[index][key]) {
//       setErrors(prev => ({
//         ...prev,
//         [index]: { ...prev[index], [key]: '' }
//       }))
//     }
//     // Clear general error when user makes changes
//     if (generalError) setGeneralError('')
//   }

//   // Handle date change from react-datepicker
//   const handleDateChange = (index, field) => (date) => {
//     if (date) {
//       const month = String(date.getMonth() + 1).padStart(2, '0')
//       const day = String(date.getDate()).padStart(2, '0')
//       const year = date.getFullYear()
//       updateProjectField(index, field)(`${month}/${day}/${year}`)
//     } else {
//       updateProjectField(index, field)('')
//     }
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

//   const projects = data.projects || [
//     { name: '', client: '', phone: '', start: '', end: '', trade: '' },
//     { name: '', client: '', phone: '', start: '', end: '', trade: '' },
//     { name: '', client: '', phone: '', start: '', end: '', trade: '' },
//   ]

//   // ✅ Validate all projects
//   const validateProjects = () => {
//     let isValid = true
//     const newErrors = {
//       0: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
//       1: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
//       2: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
//     }
//     let hasCompletedProject = false

//     // Check each project
//     projects.forEach((project, index) => {
//       const isProjectFilled = project.name || project.client || project.phone || 
//                               project.start || project.end || project.trade
      
//       // If project has any data, validate all fields
//       if (isProjectFilled) {
//         let projectComplete = true
        
//         // Company Name - Required
//         if (!project.name?.trim()) {
//           newErrors[index].name = 'Company name is required'
//           isValid = false
//           projectComplete = false
//         }
        
//         // Supervisor/Client - Required
//         if (!project.client?.trim()) {
//           newErrors[index].client = 'Supervisor name is required'
//           isValid = false
//           projectComplete = false
//         }
        
//         // Company Phone Number - Required
//         if (!project.phone?.trim()) {
//           newErrors[index].phone = 'Company phone is required'
//           isValid = false
//           projectComplete = false
//         }
        
//         // Start Date - Required
//         if (!project.start) {
//           newErrors[index].start = 'Start date is required'
//           isValid = false
//           projectComplete = false
//         }
        
//         // End Date - Required
//         if (!project.end) {
//           newErrors[index].end = 'End date is required'
//           isValid = false
//           projectComplete = false
//         }
        
//         // Trade Selection - Required
//         if (!project.trade) {
//           newErrors[index].trade = 'Trade selection is required'
//           isValid = false
//           projectComplete = false
//         }
        
//         if (projectComplete) {
//           hasCompletedProject = true
//         }
//       }
//     })

//     // ✅ At least one completed project is required
//     if (!hasCompletedProject && isValid) {
//       const anyFilled = projects.some(p => p.name || p.client || p.phone || p.start || p.end || p.trade)
//       if (anyFilled) {
//         setGeneralError('At least one project must be fully completed')
//         isValid = false
//       } else {
//         setGeneralError('At least one project is required')
//         isValid = false
//       }
//     } else {
//       setGeneralError('')
//     }

//     setErrors(newErrors)
//     return isValid
//   }

//   // ✅ Handle Next button click with validation - calls parent's onNext
//   const handleNext = () => {
//     const isValid = validateProjects()
//     if (isValid && onNext) {
//       onNext()
//     } else {
//       // Scroll to first error
//       const firstError = document.querySelector('.field-error, .project-error')
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
//       }
//     }
//   }

//   // Trade options (these are technical terms, keep as-is)
//   const tradeOptions = [
//     'Interiors',
//     'HVAC/Mechanical',
//     'Electrical / Power',
//     'Plumbing / Piping',
//     'Concrete / Formwork / Rebar / Flatwork',
//     'Civil / Sitework / Earthwork / Utilities',
//     'Asphalt / Paving Work',
//     'Landscaping / Exterior Improvements',
//     'Roofing / Waterproofing',
//     'General Labor / Site Support / Material Handling',
//     'Demolition / Selective Demo / Abatement Support',
//     'Masonry / Stucco / EIFS Systems',
//     'Structural Steel / Misc. Metals / Welding',
//     'Carpentry / Rough Carpentry / Wood Framing / Blocking Systems',
//     'Millwork / Cabinets / Finish Carpentry',
//     'Flooring / Tile / Resilient / Carpet Systems',
//     'Painting / Coatings / Wallcovering Systems',
//     'Doors / Frames / Hardware / Openings Systems',
//     'Glass / Glazing / Storefront',
//     'Fire Protection / Sprinkler Systems',
//     'Firestopping / Fireproofing / Joint Sealants',
//     'Low Voltage / Data / Security / Fire Alarm',
//     'Division 10 Specialties / Accessories / Signage Systems',
//     'Equipment / Specialty Installations / Owner-Furnished Equipment Systems'
//   ]

//   // Custom styles for date picker and trade select
//   const customStyles = `
//     /* Date picker styles */
//     .custom-date-picker .react-datepicker__input-container input {
//       width: 100%;
//       height: 40px;
//       padding: 0 12px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 8px;
//       font-size: 13px;
//       outline: none;
//       background: white;
//       color: #17263a;
//       transition: all 0.2s ease;
//       font-family: inherit;
//     }

//     .custom-date-picker .react-datepicker__input-container input:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .custom-date-picker .react-datepicker__input-container input:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .custom-date-picker .react-datepicker__input-container input::placeholder {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .custom-date-picker .react-datepicker {
//       font-family: inherit;
//       border-radius: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
//       background: white;
//       padding: 8px;
//       overflow: hidden;
//       font-size: 13px;
//     }

//     .custom-date-picker .react-datepicker__header {
//       background: white;
//       border-bottom: 1px solid rgba(18, 38, 63, 0.06);
//       padding: 10px 0 6px 0;
//       border-radius: 12px 12px 0 0;
//     }

//     .custom-date-picker .react-datepicker__current-month {
//       color: #17263a;
//       font-weight: 700;
//       font-size: 14px;
//       padding-bottom: 4px;
//     }

//     .custom-date-picker .react-datepicker__day-name {
//       color: rgba(23, 38, 58, 0.5);
//       font-weight: 600;
//       font-size: 11px;
//       width: 32px;
//       margin: 2px;
//     }

//     .custom-date-picker .react-datepicker__day {
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

//     .custom-date-picker .react-datepicker__day:hover {
//       background: rgba(15, 78, 169, 0.08);
//       border-radius: 8px;
//     }

//     .custom-date-picker .react-datepicker__day--selected {
//       background: #0f4ea9 !important;
//       color: white !important;
//       border-radius: 8px;
//       font-weight: 600;
//     }

//     .custom-date-picker .react-datepicker__day--selected:hover {
//       background: #0b3f90 !important;
//     }

//     .custom-date-picker .react-datepicker__day--keyboard-selected {
//       background: rgba(15, 78, 169, 0.15);
//       border-radius: 8px;
//     }

//     .custom-date-picker .react-datepicker__day--today {
//       font-weight: 700;
//       color: #0f4ea9;
//     }

//     .custom-date-picker .react-datepicker__day--today::after {
//       content: '';
//       display: block;
//       width: 4px;
//       height: 4px;
//       background: #0f4ea9;
//       border-radius: 50%;
//       margin: 0 auto;
//       margin-top: -2px;
//     }

//     .custom-date-picker .react-datepicker__day--disabled {
//       color: rgba(23, 38, 58, 0.2);
//       cursor: not-allowed;
//     }

//     .custom-date-picker .react-datepicker__day--disabled:hover {
//       background: transparent;
//     }

//     .custom-date-picker .react-datepicker__day--outside-month {
//       color: rgba(23, 38, 58, 0.2);
//     }

//     .custom-date-picker .react-datepicker__navigation {
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

//     .custom-date-picker .react-datepicker__navigation:hover {
//       background: rgba(15, 78, 169, 0.08);
//     }

//     .custom-date-picker .react-datepicker__navigation-icon::before {
//       border-color: #17263a;
//       border-width: 2px 2px 0 0;
//       height: 7px;
//       width: 7px;
//     }

//     .custom-date-picker .react-datepicker__navigation-icon:hover::before {
//       border-color: #0f4ea9;
//     }

//     .custom-date-picker .react-datepicker__day--weekend {
//       color: #e11d48;
//     }

//     .custom-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
//       color: white;
//     }

//     .date-picker-wrapper {
//       position: relative;
//       flex: 1;
//     }

//     .date-picker-wrapper .calendar-icon {
//       position: absolute;
//       right: 10px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: rgba(23, 38, 58, 0.4);
//       pointer-events: none;
//       font-size: 14px;
//       line-height: 1;
//     }

//     .date-picker-wrapper .react-datepicker__input-container input {
//       padding-right: 36px !important;
//     }

//     .date-picker-wrapper .react-datepicker__input-container input.error {
//       border-color: #dc2626 !important;
//     }

//     .date-picker-wrapper .react-datepicker__input-container input.error:focus {
//       border-color: #dc2626 !important;
//       box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
//     }

//     /* Trade select styles */
//     .trade-select-wrapper {
//       position: relative;
//       width: 100%;
//     }

//     .trade-select-wrapper select {
//       width: 100%;
//       height: 40px;
//       padding: 0 12px;
//       padding-right: 12px;
//       border: 1px solid rgba(18, 38, 63, 0.12);
//       border-radius: 8px;
//       font-size: 13px;
//       font-family: inherit;
//       background: white;
//       color: #17263a;
//       outline: none;
//       transition: all 0.2s ease;
//       cursor: pointer;
//       box-sizing: border-box;
//     }

//     .trade-select-wrapper select:hover {
//       border-color: rgba(15, 78, 169, 0.4);
//     }

//     .trade-select-wrapper select:focus {
//       border-color: #0f4ea9;
//       box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
//     }

//     .trade-select-wrapper select.error {
//       border-color: #dc2626 !important;
//     }

//     .trade-select-wrapper select.error:focus {
//       border-color: #dc2626 !important;
//       box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
//     }

//     .trade-select-wrapper select option {
//       padding: 8px 12px;
//       font-size: 13px;
//     }

//     .trade-select-wrapper select option.placeholder-option {
//       color: rgba(23, 38, 58, 0.4);
//     }

//     .trade-select-wrapper .select-icon {
//       position: absolute;
//       left: 12px;
//       top: 50%;
//       transform: translateY(-50%);
//       color: rgba(23, 38, 58, 0.4);
//       pointer-events: none;
//       font-size: 14px;
//       display: flex;
//       align-items: center;
//     }

//     .trade-select-wrapper select.has-icon {
//       padding-left: 36px;
//     }

//     .project-card {
//       padding: 16px;
//       border: 1px solid rgba(18, 38, 63, 0.08);
//       border-radius: 12px;
//       background: white;
//     }

//     .project-card.error {
//       border-color: #dc2626;
//       background: rgba(220, 38, 38, 0.02);
//     }

//     .project-title {
//       font-size: 14px;
//       font-weight: 600;
//       color: #0f4ea9;
//       margin-bottom: 12px;
//     }

//     .flex-row {
//       display: flex;
//       gap: 8px;
//     }

//     .flex-row > * {
//       flex: 1;
//     }

//     .grid-3-col {
//       display: grid;
//       grid-template-columns: repeat(3, 1fr);
//       gap: 16px;
//       margin-top: 12px;
//     }

//     .mb-8 {
//       margin-bottom: 8px;
//     }

//     .mt-8 {
//       margin-top: 8px;
//     }

//     .field-error {
//       color: #dc2626;
//       font-size: 10px;
//       margin-top: 2px;
//       display: flex;
//       align-items: center;
//       gap: 4px;
//     }

//     .field-error-input {
//       border-color: #dc2626 !important;
//     }

//     .field-error-input:focus {
//       border-color: #dc2626 !important;
//       box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
//     }

//     .project-error {
//       color: #dc2626;
//       font-size: 12px;
//       margin-top: 8px;
//       padding: 8px 12px;
//       background: rgba(220, 38, 38, 0.06);
//       border-radius: 6px;
//       border: 1px solid rgba(220, 38, 38, 0.15);
//       display: flex;
//       align-items: center;
//       gap: 6px;
//     }
//   `

//   // Helper to check if a project has any errors
//   const hasProjectError = (index) => {
//     const projectErrors = errors[index]
//     return projectErrors && Object.values(projectErrors).some(e => e)
//   }

//   return (
//     <div className="wizardStep">
//       <style>{customStyles}</style>
      
//       <div className="wizardBody">
//         <div className="wizardSection">
//           {/* General Error */}
//           {generalError && (
//             <div className="project-error">
//               <span>⚠️</span> {generalError}
//             </div>
//           )}

//           <div className="grid-3-col">
//             {/* Project 1 */}
//             <div className={`project-card ${hasProjectError(0) ? 'error' : ''}`}>
//               <div className="project-title">{t('wizard.step4.project')} 1</div>
              
//               <TextField
//                 placeholder={t('wizard.step4.companyName')}
//                 icon={<IconFolder />}
//                 value={projects[0]?.name || ''}
//                 onChange={updateProjectField(0, 'name')}
//                 className={errors[0]?.name ? 'field-error-input' : ''}
//                 style={{ marginBottom: '8px' }}
//               />
//               {errors[0]?.name && <div className="field-error">⚠️ {errors[0].name}</div>}
              
//               <TextField
//                 placeholder={t('wizard.step4.client')}
//                 icon={<IconSupport />}
//                 value={projects[0]?.client || ''}
//                 onChange={updateProjectField(0, 'client')}
//                 className={errors[0]?.client ? 'field-error-input' : ''}
//                 style={{ marginBottom: '8px' }}
//               />
//               {errors[0]?.client && <div className="field-error">⚠️ {errors[0].client}</div>}
              
//               <TextField
//                 placeholder={t('wizard.step4.employerPhone')}
//                 icon={<IconPhone />}
//                 value={projects[0]?.phone || ''}
//                 onChange={updateProjectField(0, 'phone')}
//                 className={errors[0]?.phone ? 'field-error-input' : ''}
//                 style={{ marginBottom: '8px' }}
//               />
//               {errors[0]?.phone && <div className="field-error">⚠️ {errors[0].phone}</div>}
              
//               <div className="flex-row mb-8">
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[0]?.start || '')}
//                     onChange={handleDateChange(0, 'start')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.start')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[0]?.end || '')}
//                     onChange={handleDateChange(0, 'end')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.end')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//               </div>
//               {errors[0]?.start && <div className="field-error">⚠️ {errors[0].start}</div>}
//               {errors[0]?.end && <div className="field-error">⚠️ {errors[0].end}</div>}
              
//               <div className="trade-select-wrapper mt-8">
//                 <select 
//                   value={projects[0]?.trade || ''} 
//                   onChange={(e) => updateProjectField(0, 'trade')(e.target.value)}
//                   className={`has-icon ${errors[0]?.trade ? 'error' : ''}`}
//                   style={{
//                     color: projects[0]?.trade ? '#17263a' : '#6b7280',
//                   }}
//                 >
//                   <option value="" className="placeholder-option" disabled>
//                     {t('wizard.step4.trade')}
//                   </option>
//                   {tradeOptions.map((trade) => (
//                     <option key={trade} value={trade}>
//                       {trade}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="select-icon"><IconSupport /></span>
//               </div>
//               {errors[0]?.trade && <div className="field-error">⚠️ {errors[0].trade}</div>}
//             </div>

//             {/* Project 2 */}
//             <div className={`project-card ${hasProjectError(1) ? 'error' : ''}`}>
//               <div className="project-title">{t('wizard.step4.project')} 2</div>
              
//               <TextField
//                 placeholder={t('wizard.step4.companyName')}
//                 icon={<IconFolder />}
//                 value={projects[1]?.name || ''}
//                 onChange={updateProjectField(1, 'name')}
//                 className={errors[1]?.name ? 'field-error-input' : ''}
//                 style={{ marginBottom: '8px' }}
//               />
//               {errors[1]?.name && <div className="field-error">⚠️ {errors[1].name}</div>}
              
//               <TextField
//                 placeholder={t('wizard.step4.client')}
//                 icon={<IconSupport />}
//                 value={projects[1]?.client || ''}
//                 onChange={updateProjectField(1, 'client')}
//                 className={errors[1]?.client ? 'field-error-input' : ''}
//                 style={{ marginBottom: '8px' }}
//               />
//               {errors[1]?.client && <div className="field-error">⚠️ {errors[1].client}</div>}
              
//               <TextField
//                 placeholder={t('wizard.step4.employerPhone')}
//                 icon={<IconPhone />}
//                 value={projects[1]?.phone || ''}
//                 onChange={updateProjectField(1, 'phone')}
//                 className={errors[1]?.phone ? 'field-error-input' : ''}
//                 style={{ marginBottom: '8px' }}
//               />
//               {errors[1]?.phone && <div className="field-error">⚠️ {errors[1].phone}</div>}
              
//               <div className="flex-row mb-8">
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[1]?.start || '')}
//                     onChange={handleDateChange(1, 'start')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.start')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[1]?.end || '')}
//                     onChange={handleDateChange(1, 'end')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.end')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//               </div>
//               {errors[1]?.start && <div className="field-error">⚠️ {errors[1].start}</div>}
//               {errors[1]?.end && <div className="field-error">⚠️ {errors[1].end}</div>}
              
//               <div className="trade-select-wrapper mt-8">
//                 <select 
//                   value={projects[1]?.trade || ''} 
//                   onChange={(e) => updateProjectField(1, 'trade')(e.target.value)}
//                   className={`has-icon ${errors[1]?.trade ? 'error' : ''}`}
//                   style={{
//                     color: projects[1]?.trade ? '#17263a' : '#6b7280',
//                   }}
//                 >
//                   <option value="" className="placeholder-option" disabled>
//                     {t('wizard.step4.trade')}
//                   </option>
//                   {tradeOptions.map((trade) => (
//                     <option key={trade} value={trade}>
//                       {trade}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="select-icon"><IconSupport /></span>
//               </div>
//               {errors[1]?.trade && <div className="field-error">⚠️ {errors[1].trade}</div>}
//             </div>

//             {/* Project 3 */}
//             <div className={`project-card ${hasProjectError(2) ? 'error' : ''}`}>
//               <div className="project-title">{t('wizard.step4.project')} 3</div>
              
//               <TextField
//                 placeholder={t('wizard.step4.companyName')}
//                 icon={<IconFolder />}
//                 value={projects[2]?.name || ''}
//                 onChange={updateProjectField(2, 'name')}
//                 className={errors[2]?.name ? 'field-error-input' : ''}
//                 style={{ marginBottom: '8px' }}
//               />
//               {errors[2]?.name && <div className="field-error">⚠️ {errors[2].name}</div>}
              
//               <TextField
//                 placeholder={t('wizard.step4.client')}
//                 icon={<IconSupport />}
//                 value={projects[2]?.client || ''}
//                 onChange={updateProjectField(2, 'client')}
//                 className={errors[2]?.client ? 'field-error-input' : ''}
//                 style={{ marginBottom: '8px' }}
//               />
//               {errors[2]?.client && <div className="field-error">⚠️ {errors[2].client}</div>}
              
//               <TextField
//                 placeholder={t('wizard.step4.employerPhone')}
//                 icon={<IconPhone />}
//                 value={projects[2]?.phone || ''}
//                 onChange={updateProjectField(2, 'phone')}
//                 className={errors[2]?.phone ? 'field-error-input' : ''}
//                 style={{ marginBottom: '8px' }}
//               />
//               {errors[2]?.phone && <div className="field-error">⚠️ {errors[2].phone}</div>}
              
//               <div className="flex-row mb-8">
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[2]?.start || '')}
//                     onChange={handleDateChange(2, 'start')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.start')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//                 <div className="date-picker-wrapper custom-date-picker">
//                   <DatePicker
//                     selected={parseDate(projects[2]?.end || '')}
//                     onChange={handleDateChange(2, 'end')}
//                     dateFormat="MM/dd/yyyy"
//                     placeholderText={t('wizard.step4.end')}
//                     maxDate={new Date()}
//                     showYearDropdown
//                     showMonthDropdown
//                     dropdownMode="select"
//                     yearDropdownItemNumber={100}
//                     scrollableYearDropdown
//                     popperPlacement="bottom-start"
//                     popperModifiers={[
//                       {
//                         name: 'offset',
//                         options: {
//                           offset: [0, 8],
//                         },
//                       },
//                     ]}
//                   />
//                   <span className="calendar-icon">📅</span>
//                 </div>
//               </div>
//               {errors[2]?.start && <div className="field-error">⚠️ {errors[2].start}</div>}
//               {errors[2]?.end && <div className="field-error">⚠️ {errors[2].end}</div>}
              
//               <div className="trade-select-wrapper mt-8">
//                 <select 
//                   value={projects[2]?.trade || ''} 
//                   onChange={(e) => updateProjectField(2, 'trade')(e.target.value)}
//                   className={`has-icon ${errors[2]?.trade ? 'error' : ''}`}
//                   style={{
//                     color: projects[2]?.trade ? '#17263a' : '#6b7280',
//                   }}
//                 >
//                   <option value="" className="placeholder-option" disabled>
//                     {t('wizard.step4.trade')}
//                   </option>
//                   {tradeOptions.map((trade) => (
//                     <option key={trade} value={trade}>
//                       {trade}
//                     </option>
//                   ))}
//                 </select>
//                 <span className="select-icon"><IconSupport /></span>
//               </div>
//               {errors[2]?.trade && <div className="field-error">⚠️ {errors[2].trade}</div>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep4








// src/worker/components/wizard-steps/WizardStep4.jsx
import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TextField } from '../../../common/components/TextField'
import { IconFolder, IconSupport, IconLocation, IconUser, IconPhone } from '../../../common/components/Icons'

export function WizardStep4({ data, onChange, onNext, onBack }) {
  const { t } = useTranslation()
  
  // ✅ Validation error states for each project
  const [errors, setErrors] = useState({
    0: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
    1: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
    2: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
  })
  const [generalError, setGeneralError] = useState('')

  // ✅ FIX: Update only the specific project field
  const updateProjectField = (index, key) => (value) => {
    const projects = [...(data.projects || [])]
    projects[index] = { ...projects[index], [key]: value }
    onChange({ projects })
    
    // Clear error for this field when user types
    if (errors[index] && errors[index][key]) {
      setErrors(prev => ({
        ...prev,
        [index]: { ...prev[index], [key]: '' }
      }))
    }
    // Clear general error when user makes changes
    if (generalError) setGeneralError('')
  }

  // Handle date change from react-datepicker
  const handleDateChange = (index, field) => (date) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      updateProjectField(index, field)(`${month}/${day}/${year}`)
    } else {
      updateProjectField(index, field)('')
    }
  }

  // Parse date string to Date object for react-datepicker
  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
    }
    return null
  }

  const projects = data.projects || [
    { name: '', client: '', phone: '', start: '', end: '', trade: '' },
    { name: '', client: '', phone: '', start: '', end: '', trade: '' },
    { name: '', client: '', phone: '', start: '', end: '', trade: '' },
  ]

  // ✅ Validate all projects
  const validateProjects = () => {
    let isValid = true
    const newErrors = {
      0: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
      1: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
      2: { name: '', client: '', phone: '', start: '', end: '', trade: '' },
    }
    let hasCompletedProject = false

    // Check each project
    projects.forEach((project, index) => {
      const isProjectFilled = project.name || project.client || project.phone || 
                              project.start || project.end || project.trade
      
      // If project has any data, validate all fields
      if (isProjectFilled) {
        let projectComplete = true
        
        // Company Name - Required
        if (!project.name?.trim()) {
          newErrors[index].name = 'Company name is required'
          isValid = false
          projectComplete = false
        }
        
        // Supervisor/Client - Required
        if (!project.client?.trim()) {
          newErrors[index].client = 'Supervisor name is required'
          isValid = false
          projectComplete = false
        }
        
        // Company Phone Number - Required
        if (!project.phone?.trim()) {
          newErrors[index].phone = 'Company phone is required'
          isValid = false
          projectComplete = false
        }
        
        // Start Date - Required
        if (!project.start) {
          newErrors[index].start = 'Start date is required'
          isValid = false
          projectComplete = false
        }
        
        // End Date - Required
        if (!project.end) {
          newErrors[index].end = 'End date is required'
          isValid = false
          projectComplete = false
        }
        
        // Trade Selection - Required
        if (!project.trade) {
          newErrors[index].trade = 'Trade selection is required'
          isValid = false
          projectComplete = false
        }
        
        if (projectComplete) {
          hasCompletedProject = true
        }
      }
    })

    // ✅ At least one completed project is required
    if (!hasCompletedProject && isValid) {
      const anyFilled = projects.some(p => p.name || p.client || p.phone || p.start || p.end || p.trade)
      if (anyFilled) {
        setGeneralError('At least one project must be fully completed')
        isValid = false
      } else {
        setGeneralError('At least one project is required')
        isValid = false
      }
    } else {
      setGeneralError('')
    }

    setErrors(newErrors)
    return isValid
  }

  // ✅ Handle Next button click with validation - calls parent's onNext
  const handleNext = () => {
    const isValid = validateProjects()
    if (isValid && onNext) {
      onNext()
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.field-error, .project-error')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  // Trade options (these are technical terms, keep as-is)
  const tradeOptions = [
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
    'Equipment / Specialty Installations / Owner-Furnished Equipment Systems'
  ]

  // Custom styles for date picker and trade select
  const customStyles = `
    /* Date picker styles */
    .custom-date-picker .react-datepicker__input-container input {
      width: 100%;
      height: 40px;
      padding: 0 12px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 8px;
      font-size: 13px;
      outline: none;
      background: white;
      color: #17263a;
      transition: all 0.2s ease;
      font-family: inherit;
    }

    .custom-date-picker .react-datepicker__input-container input:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .custom-date-picker .react-datepicker__input-container input:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .custom-date-picker .react-datepicker__input-container input::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }

    .custom-date-picker .react-datepicker {
      font-family: inherit;
      border-radius: 12px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
      background: white;
      padding: 8px;
      overflow: hidden;
      font-size: 13px;
    }

    .custom-date-picker .react-datepicker__header {
      background: white;
      border-bottom: 1px solid rgba(18, 38, 63, 0.06);
      padding: 10px 0 6px 0;
      border-radius: 12px 12px 0 0;
    }

    .custom-date-picker .react-datepicker__current-month {
      color: #17263a;
      font-weight: 700;
      font-size: 14px;
      padding-bottom: 4px;
    }

    .custom-date-picker .react-datepicker__day-name {
      color: rgba(23, 38, 58, 0.5);
      font-weight: 600;
      font-size: 11px;
      width: 32px;
      margin: 2px;
    }

    .custom-date-picker .react-datepicker__day {
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

    .custom-date-picker .react-datepicker__day:hover {
      background: rgba(15, 78, 169, 0.08);
      border-radius: 8px;
    }

    .custom-date-picker .react-datepicker__day--selected {
      background: #0f4ea9 !important;
      color: white !important;
      border-radius: 8px;
      font-weight: 600;
    }

    .custom-date-picker .react-datepicker__day--selected:hover {
      background: #0b3f90 !important;
    }

    .custom-date-picker .react-datepicker__day--keyboard-selected {
      background: rgba(15, 78, 169, 0.15);
      border-radius: 8px;
    }

    .custom-date-picker .react-datepicker__day--today {
      font-weight: 700;
      color: #0f4ea9;
    }

    .custom-date-picker .react-datepicker__day--today::after {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: #0f4ea9;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: -2px;
    }

    .custom-date-picker .react-datepicker__day--disabled {
      color: rgba(23, 38, 58, 0.2);
      cursor: not-allowed;
    }

    .custom-date-picker .react-datepicker__day--disabled:hover {
      background: transparent;
    }

    .custom-date-picker .react-datepicker__day--outside-month {
      color: rgba(23, 38, 58, 0.2);
    }

    .custom-date-picker .react-datepicker__navigation {
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

    .custom-date-picker .react-datepicker__navigation:hover {
      background: rgba(15, 78, 169, 0.08);
    }

    .custom-date-picker .react-datepicker__navigation-icon::before {
      border-color: #17263a;
      border-width: 2px 2px 0 0;
      height: 7px;
      width: 7px;
    }

    .custom-date-picker .react-datepicker__navigation-icon:hover::before {
      border-color: #0f4ea9;
    }

    .custom-date-picker .react-datepicker__day--weekend {
      color: #e11d48;
    }

    .custom-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
      color: white;
    }

    .date-picker-wrapper {
      position: relative;
      flex: 1;
    }

    .date-picker-wrapper .calendar-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(23, 38, 58, 0.4);
      pointer-events: none;
      font-size: 14px;
      line-height: 1;
    }

    .date-picker-wrapper .react-datepicker__input-container input {
      padding-right: 36px !important;
    }

    .date-picker-wrapper .react-datepicker__input-container input.error {
      border-color: #dc2626 !important;
    }

    .date-picker-wrapper .react-datepicker__input-container input.error:focus {
      border-color: #dc2626 !important;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }

    /* Trade select styles - without icon */
    .trade-select-wrapper {
      position: relative;
      width: 100%;
    }

    .trade-select-wrapper select {
      width: 100%;
      height: 40px;
      padding: 0 32px 0 12px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 8px;
      font-size: 13px;
      font-family: inherit;
      background: white;
      color: #17263a;
      outline: none;
      transition: all 0.2s ease;
      cursor: pointer;
      box-sizing: border-box;
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%2317263a' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 12px center;
    }

    .trade-select-wrapper select:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .trade-select-wrapper select:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .trade-select-wrapper select.error {
      border-color: #dc2626 !important;
    }

    .trade-select-wrapper select.error:focus {
      border-color: #dc2626 !important;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }

    .trade-select-wrapper select option {
      padding: 8px 12px;
      font-size: 13px;
    }

    .trade-select-wrapper select option.placeholder-option {
      color: rgba(23, 38, 58, 0.4);
    }

    .project-card {
      padding: 16px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      border-radius: 12px;
      background: white;
    }

    .project-card.error {
      border-color: #dc2626;
      background: rgba(220, 38, 38, 0.02);
    }

    .project-title {
      font-size: 14px;
      font-weight: 600;
      color: #0f4ea9;
      margin-bottom: 12px;
    }

    .flex-row {
      display: flex;
      gap: 8px;
    }

    .flex-row > * {
      flex: 1;
    }

    .grid-3-col {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 12px;
    }

    .mb-8 {
      margin-bottom: 8px;
    }

    .mt-8 {
      margin-top: 8px;
    }

    .field-error {
      color: #dc2626;
      font-size: 10px;
      margin-top: 2px;
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .field-error-input {
      border-color: #dc2626 !important;
    }

    .field-error-input:focus {
      border-color: #dc2626 !important;
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
    }

    .project-error {
      color: #dc2626;
      font-size: 12px;
      margin-top: 8px;
      padding: 8px 12px;
      background: rgba(220, 38, 38, 0.06);
      border-radius: 6px;
      border: 1px solid rgba(220, 38, 38, 0.15);
      display: flex;
      align-items: center;
      gap: 6px;
    }
  `

  // Helper to check if a project has any errors
  const hasProjectError = (index) => {
    const projectErrors = errors[index]
    return projectErrors && Object.values(projectErrors).some(e => e)
  }

  return (
    <div className="wizardStep">
      <style>{customStyles}</style>
      
      <div className="wizardBody">
        <div className="wizardSection">
          {/* General Error */}
          {generalError && (
            <div className="project-error">
              <span>⚠️</span> {generalError}
            </div>
          )}

          {/* ✅ Responsive grid for project cards */}
          <div className="grid-3-col">
            {/* Project 1 */}
            <div className={`project-card ${hasProjectError(0) ? 'error' : ''}`}>
              <div className="project-title">{t('wizard.step4.project')} 1</div>
              
              <TextField
                placeholder={t('wizard.step4.companyName')}
                icon={<IconFolder />}
                value={projects[0]?.name || ''}
                onChange={updateProjectField(0, 'name')}
                className={errors[0]?.name ? 'field-error-input' : ''}
                style={{ marginBottom: '8px' }}
              />
              {errors[0]?.name && <div className="field-error">⚠️ {errors[0].name}</div>}
              
              <TextField
                placeholder={t('wizard.step4.client')}
                icon={<IconSupport />}
                value={projects[0]?.client || ''}
                onChange={updateProjectField(0, 'client')}
                className={errors[0]?.client ? 'field-error-input' : ''}
                style={{ marginBottom: '8px' }}
              />
              {errors[0]?.client && <div className="field-error">⚠️ {errors[0].client}</div>}
              
              <TextField
                placeholder={t('wizard.step4.employerPhone')}
                icon={<IconPhone />}
                value={projects[0]?.phone || ''}
                onChange={updateProjectField(0, 'phone')}
                className={errors[0]?.phone ? 'field-error-input' : ''}
                style={{ marginBottom: '8px' }}
              />
              {errors[0]?.phone && <div className="field-error">⚠️ {errors[0].phone}</div>}
              
              <div className="flex-row mb-8">
                <div className="date-picker-wrapper custom-date-picker">
                  <DatePicker
                    selected={parseDate(projects[0]?.start || '')}
                    onChange={handleDateChange(0, 'start')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText={t('wizard.step4.start')}
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 8],
                        },
                      },
                    ]}
                  />
                  <span className="calendar-icon">📅</span>
                </div>
                <div className="date-picker-wrapper custom-date-picker">
                  <DatePicker
                    selected={parseDate(projects[0]?.end || '')}
                    onChange={handleDateChange(0, 'end')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText={t('wizard.step4.end')}
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 8],
                        },
                      },
                    ]}
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>
              {errors[0]?.start && <div className="field-error">⚠️ {errors[0].start}</div>}
              {errors[0]?.end && <div className="field-error">⚠️ {errors[0].end}</div>}
              
              {/* ✅ Trade Dropdown - No Icon */}
              <div className="trade-select-wrapper mt-8">
                <select 
                  value={projects[0]?.trade || ''} 
                  onChange={(e) => updateProjectField(0, 'trade')(e.target.value)}
                  className={errors[0]?.trade ? 'error' : ''}
                  style={{
                    color: projects[0]?.trade ? '#17263a' : '#6b7280',
                  }}
                >
                  <option value="" className="placeholder-option" disabled>
                    {t('wizard.step4.trade')}
                  </option>
                  {tradeOptions.map((trade) => (
                    <option key={trade} value={trade}>
                      {trade}
                    </option>
                  ))}
                </select>
              </div>
              {errors[0]?.trade && <div className="field-error">⚠️ {errors[0].trade}</div>}
            </div>

            {/* Project 2 */}
            <div className={`project-card ${hasProjectError(1) ? 'error' : ''}`}>
              <div className="project-title">{t('wizard.step4.project')} 2</div>
              
              <TextField
                placeholder={t('wizard.step4.companyName')}
                icon={<IconFolder />}
                value={projects[1]?.name || ''}
                onChange={updateProjectField(1, 'name')}
                className={errors[1]?.name ? 'field-error-input' : ''}
                style={{ marginBottom: '8px' }}
              />
              {errors[1]?.name && <div className="field-error">⚠️ {errors[1].name}</div>}
              
              <TextField
                placeholder={t('wizard.step4.client')}
                icon={<IconSupport />}
                value={projects[1]?.client || ''}
                onChange={updateProjectField(1, 'client')}
                className={errors[1]?.client ? 'field-error-input' : ''}
                style={{ marginBottom: '8px' }}
              />
              {errors[1]?.client && <div className="field-error">⚠️ {errors[1].client}</div>}
              
              <TextField
                placeholder={t('wizard.step4.employerPhone')}
                icon={<IconPhone />}
                value={projects[1]?.phone || ''}
                onChange={updateProjectField(1, 'phone')}
                className={errors[1]?.phone ? 'field-error-input' : ''}
                style={{ marginBottom: '8px' }}
              />
              {errors[1]?.phone && <div className="field-error">⚠️ {errors[1].phone}</div>}
              
              <div className="flex-row mb-8">
                <div className="date-picker-wrapper custom-date-picker">
                  <DatePicker
                    selected={parseDate(projects[1]?.start || '')}
                    onChange={handleDateChange(1, 'start')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText={t('wizard.step4.start')}
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 8],
                        },
                      },
                    ]}
                  />
                  <span className="calendar-icon">📅</span>
                </div>
                <div className="date-picker-wrapper custom-date-picker">
                  <DatePicker
                    selected={parseDate(projects[1]?.end || '')}
                    onChange={handleDateChange(1, 'end')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText={t('wizard.step4.end')}
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 8],
                        },
                      },
                    ]}
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>
              {errors[1]?.start && <div className="field-error">⚠️ {errors[1].start}</div>}
              {errors[1]?.end && <div className="field-error">⚠️ {errors[1].end}</div>}
              
              {/* ✅ Trade Dropdown - No Icon */}
              <div className="trade-select-wrapper mt-8">
                <select 
                  value={projects[1]?.trade || ''} 
                  onChange={(e) => updateProjectField(1, 'trade')(e.target.value)}
                  className={errors[1]?.trade ? 'error' : ''}
                  style={{
                    color: projects[1]?.trade ? '#17263a' : '#6b7280',
                  }}
                >
                  <option value="" className="placeholder-option" disabled>
                    {t('wizard.step4.trade')}
                  </option>
                  {tradeOptions.map((trade) => (
                    <option key={trade} value={trade}>
                      {trade}
                    </option>
                  ))}
                </select>
              </div>
              {errors[1]?.trade && <div className="field-error">⚠️ {errors[1].trade}</div>}
            </div>

            {/* Project 3 */}
            <div className={`project-card ${hasProjectError(2) ? 'error' : ''}`}>
              <div className="project-title">{t('wizard.step4.project')} 3</div>
              
              <TextField
                placeholder={t('wizard.step4.companyName')}
                icon={<IconFolder />}
                value={projects[2]?.name || ''}
                onChange={updateProjectField(2, 'name')}
                className={errors[2]?.name ? 'field-error-input' : ''}
                style={{ marginBottom: '8px' }}
              />
              {errors[2]?.name && <div className="field-error">⚠️ {errors[2].name}</div>}
              
              <TextField
                placeholder={t('wizard.step4.client')}
                icon={<IconSupport />}
                value={projects[2]?.client || ''}
                onChange={updateProjectField(2, 'client')}
                className={errors[2]?.client ? 'field-error-input' : ''}
                style={{ marginBottom: '8px' }}
              />
              {errors[2]?.client && <div className="field-error">⚠️ {errors[2].client}</div>}
              
              <TextField
                placeholder={t('wizard.step4.employerPhone')}
                icon={<IconPhone />}
                value={projects[2]?.phone || ''}
                onChange={updateProjectField(2, 'phone')}
                className={errors[2]?.phone ? 'field-error-input' : ''}
                style={{ marginBottom: '8px' }}
              />
              {errors[2]?.phone && <div className="field-error">⚠️ {errors[2].phone}</div>}
              
              <div className="flex-row mb-8">
                <div className="date-picker-wrapper custom-date-picker">
                  <DatePicker
                    selected={parseDate(projects[2]?.start || '')}
                    onChange={handleDateChange(2, 'start')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText={t('wizard.step4.start')}
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 8],
                        },
                      },
                    ]}
                  />
                  <span className="calendar-icon">📅</span>
                </div>
                <div className="date-picker-wrapper custom-date-picker">
                  <DatePicker
                    selected={parseDate(projects[2]?.end || '')}
                    onChange={handleDateChange(2, 'end')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText={t('wizard.step4.end')}
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    popperPlacement="bottom-start"
                    popperModifiers={[
                      {
                        name: 'offset',
                        options: {
                          offset: [0, 8],
                        },
                      },
                    ]}
                  />
                  <span className="calendar-icon">📅</span>
                </div>
              </div>
              {errors[2]?.start && <div className="field-error">⚠️ {errors[2].start}</div>}
              {errors[2]?.end && <div className="field-error">⚠️ {errors[2].end}</div>}
              
              {/* ✅ Trade Dropdown - No Icon */}
              <div className="trade-select-wrapper mt-8">
                <select 
                  value={projects[2]?.trade || ''} 
                  onChange={(e) => updateProjectField(2, 'trade')(e.target.value)}
                  className={errors[2]?.trade ? 'error' : ''}
                  style={{
                    color: projects[2]?.trade ? '#17263a' : '#6b7280',
                  }}
                >
                  <option value="" className="placeholder-option" disabled>
                    {t('wizard.step4.trade')}
                  </option>
                  {tradeOptions.map((trade) => (
                    <option key={trade} value={trade}>
                      {trade}
                    </option>
                  ))}
                </select>
              </div>
              {errors[2]?.trade && <div className="field-error">⚠️ {errors[2].trade}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Footer REMOVED - Parent (WorkerWizardPage) handles navigation */}

      {/* ✅ Mobile Responsive Styles */}
      <style>{`
        /* Mobile Responsive Styles for WizardStep4 */
        @media (max-width: 768px) {
          .wizardStep .wizardBody {
            padding: 12px !important;
          }

          /* Project cards grid - single column on mobile */
          .grid-3-col {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }

          /* Project cards */
          .project-card {
            padding: 12px 14px !important;
          }

          /* Project title */
          .project-title {
            font-size: 13px !important;
            margin-bottom: 10px !important;
          }

          /* Flex row for dates - stack on mobile */
          .flex-row {
            flex-direction: column !important;
            gap: 6px !important;
          }

          .flex-row > * {
            flex: 1 1 100% !important;
            width: 100% !important;
          }

          /* Date picker inputs */
          .date-picker-wrapper .react-datepicker__input-container input {
            height: 36px !important;
            font-size: 12px !important;
          }

          /* TextField inputs */
          .wizardStep .wizardSection .fieldControl {
            height: 36px !important;
          }

          .wizardStep .wizardSection .fieldInput {
            font-size: 12px !important;
          }

          /* Trade select */
          .trade-select-wrapper select {
            height: 36px !important;
            font-size: 12px !important;
          }

          /* Error messages */
          .field-error {
            font-size: 9px !important;
          }

          .project-error {
            font-size: 11px !important;
            padding: 6px 10px !important;
          }
        }

        @media (max-width: 480px) {
          .wizardStep .wizardBody {
            padding: 8px !important;
          }

          .project-card {
            padding: 10px 12px !important;
          }

          .project-title {
            font-size: 12px !important;
          }

          .date-picker-wrapper .react-datepicker__input-container input {
            height: 34px !important;
            font-size: 11px !important;
          }

          .trade-select-wrapper select {
            height: 34px !important;
            font-size: 11px !important;
          }

          .wizardStep .wizardSection .fieldControl {
            height: 34px !important;
          }

          .wizardStep .wizardSection .fieldInput {
            font-size: 11px !important;
          }

          .field-error {
            font-size: 8px !important;
          }
        }

        /* Tablet optimization */
        @media (min-width: 769px) and (max-width: 1024px) {
          .grid-3-col {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default WizardStep4