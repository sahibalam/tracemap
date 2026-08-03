
// // src/worker/components/wizard-steps/WizardStep5.jsx
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

// export function WizardStep5({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ FIX: Handle change - only update specific field
//   const handleChange = (field, value) => {
//     onChange({ [field]: value })
//   }

//   // ✅ FIX: Toggle pay preferences
//   const togglePayPref = (key) => (e) => {
//     const current = data.payPrefs || {}
//     onChange({
//       payPrefs: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//   }

//   // ✅ FIX: Toggle travel preferences
//   const toggleTravelPref = (key) => (e) => {
//     const current = data.travelPrefs || {}
//     onChange({
//       travelPrefs: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//   }

//   // ✅ FIX: Handle day toggle
//   const handleDayToggle = (day) => (e) => {
//     const current = data.availability || {}
//     onChange({
//       availability: {
//         ...current,
//         [day]: e.target.checked
//       }
//     })
//   }

//   // ✅ FIX: Handle slider change
//   const handleSliderChange = (e) => {
//     const value = Number(e.target.value)
//     onChange({ travelRadius: value })
//   }

//   // ✅ FIX: Handle radio change
//   const handleWillingToTravelChange = (value) => {
//     onChange({
//       willingToTravel: value,
//       travelPrefs: value === 'no' ? {} : data.travelPrefs
//     })
//   }

//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

//   // Get current radius value with fallback
//   const currentRadius = data.travelRadius !== undefined && data.travelRadius !== null && data.travelRadius !== '' 
//     ? Number(data.travelRadius) 
//     : 50

//   // Calculate slider percentage for fill
//   const sliderPercentage = Math.min(100, Math.max(0, (currentRadius / 100) * 100))

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         {/* Row 1: Hourly Rate + Availability */}
//         <div className="wizardSection">
//           <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
//             {/* Hourly Rate */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.hourlyRate')}</div>
//               <div style={{ maxWidth: '200px' }}>
//                 <TextField
//                   placeholder="$$"
//                   icon={<IconSupport />}
//                   value={data.hourlyRate || ''}
//                   onChange={(v) => handleChange('hourlyRate', v)}
//                 />
//               </div>
//             </div>

//             {/* Availability */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.availability')}</div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.overtime || false)}
//                     onChange={togglePayPref('overtime')}
//                   />
//                   {t('wizard.step5.openToOvertime')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.weekends || false)}
//                     onChange={togglePayPref('weekends')}
//                   />
//                   {t('wizard.step5.availableWeekends')}
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Row 2: Travel Radius + Willingness to Travel */}
//         <div className="wizardSection">
//           <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
//             {/* Travel Radius - Custom Slider with 70% width */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.travelRadius')}</div>
//               <div style={{ marginTop: '4px', maxWidth: '70%' }}>
//                 {/* Custom slider container */}
//                 <div style={{ position: 'relative', padding: '8px 0' }}>
//                   {/* Track background */}
//                   <div style={{
//                     position: 'relative',
//                     height: '6px',
//                     background: '#e5e7eb',
//                     borderRadius: '999px',
//                     cursor: 'pointer',
//                   }}>
//                     {/* Fill */}
//                     <div style={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       height: '100%',
//                       width: `${sliderPercentage}%`,
//                       background: '#0f4ea9',
//                       borderRadius: '999px',
//                       pointerEvents: 'none',
//                       transition: 'width 0.05s ease',
//                     }} />
                    
//                     {/* Slider input (invisible but functional) */}
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       step="1"
//                       value={currentRadius}
//                       onChange={handleSliderChange}
//                       style={{
//                         position: 'absolute',
//                         top: '-8px',
//                         left: '-4px',
//                         width: 'calc(100% + 8px)',
//                         height: '22px',
//                         opacity: 0,
//                         cursor: 'pointer',
//                         zIndex: 2,
//                         margin: 0,
//                         padding: 0,
//                       }}
//                     />
                    
//                     {/* Custom thumb (positioned based on value) */}
//                     <div style={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: `${sliderPercentage}%`,
//                       transform: 'translate(-50%, -50%)',
//                       width: '20px',
//                       height: '20px',
//                       borderRadius: '50%',
//                       background: '#0f4ea9',
//                       border: '2px solid white',
//                       boxShadow: '0 2px 6px rgba(15, 78, 169, 0.3)',
//                       pointerEvents: 'none',
//                       zIndex: 1,
//                       transition: 'left 0.05s ease',
//                     }} />
//                   </div>

//                   {/* Value display */}
//                   <div style={{ 
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '12px'
//                   }}>
//                     <span style={{ 
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'rgba(15, 78, 169, 0.08)',
//                       padding: '4px 16px',
//                       borderRadius: '6px',
//                     }}>
//                       {currentRadius} {t('wizard.step5.miles')}
//                     </span>
//                   </div>

//                   {/* Tick marks */}
//                   <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     fontSize: '11px', 
//                     color: 'rgba(23, 38, 58, 0.4)',
//                     marginTop: '4px',
//                     padding: '0 2px'
//                   }}>
//                     <span>0</span>
//                     <span>25</span>
//                     <span>50</span>
//                     <span>75</span>
//                     <span>100</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Willingness to Travel */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.willingToTravel')}</div>
//               <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="yes"
//                     checked={data.willingToTravel === 'yes'}
//                     onChange={() => handleWillingToTravelChange('yes')}
//                   />
//                   {t('wizard.step5.yes')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="no"
//                     checked={data.willingToTravel === 'no'}
//                     onChange={() => handleWillingToTravelChange('no')}
//                   />
//                   {t('wizard.step5.no')}
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Travel Preferences - Only show if "Yes" is selected */}
//         {data.willingToTravel === 'yes' && (
//           <div className="wizardSection">
//             <div style={{ 
//               padding: '16px 20px',
//               border: '1px solid rgba(15, 78, 169, 0.2)',
//               borderRadius: '12px',
//               background: 'rgba(15, 78, 169, 0.03)',
//             }}>
//               <div style={{ 
//                 fontSize: '13px', 
//                 fontWeight: 500, 
//                 color: '#17263a',
//                 marginBottom: '10px'
//               }}>
//                 {t('wizard.step5.travelPreferences')}
//               </div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.housing || false)}
//                     onChange={toggleTravelPref('housing')}
//                   />
//                   {t('wizard.step5.needsHousing')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.perDiem || false)}
//                     onChange={toggleTravelPref('perDiem')}
//                   />
//                   {t('wizard.step5.needsPerDiem')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.transportation || false)}
//                     onChange={toggleTravelPref('transportation')}
//                   />
//                   {t('wizard.step5.ownTransportation')}
//                 </label>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Available Days Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step5.availableDays')}</div>
//           <div style={{ 
//             display: 'grid', 
//             gridTemplateColumns: 'repeat(7, 1fr)', 
//             gap: '8px',
//             marginTop: '8px'
//           }}>
//             {daysOfWeek.map((day) => (
//               <label key={day} className="wizardCheck" style={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center',
//                 gap: '4px',
//                 padding: '8px 4px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//                 borderRadius: '8px',
//                 background: 'white',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease'
//               }}>
//                 <span style={{ 
//                   fontSize: '11px', 
//                   fontWeight: 500, 
//                   color: 'rgba(23, 38, 58, 0.6)',
//                   textTransform: 'uppercase'
//                 }}>
//                   {t(`wizard.step5.days.${day.toLowerCase()}`)}
//                 </span>
//                 <input
//                   type="checkbox"
//                   checked={!!(data.availability?.[day.toLowerCase()] || false)}
//                   onChange={handleDayToggle(day.toLowerCase())}
//                   style={{
//                     width: '18px',
//                     height: '18px',
//                     cursor: 'pointer',
//                     accentColor: '#0f4ea9'
//                   }}
//                 />
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep5





// // src/worker/components/wizard-steps/WizardStep5.jsx
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

// export function WizardStep5({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ FIX: Handle change - only update specific field
//   const handleChange = (field, value) => {
//     onChange({ [field]: value })
//   }

//   // ✅ FIX: Toggle pay preferences
//   const togglePayPref = (key) => (e) => {
//     const current = data.payPrefs || {}
//     onChange({
//       payPrefs: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//   }

//   // ✅ FIX: Toggle travel preferences
//   const toggleTravelPref = (key) => (e) => {
//     const current = data.travelPrefs || {}
//     onChange({
//       travelPrefs: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//   }

//   // ✅ FIX: Handle day toggle
//   const handleDayToggle = (day) => (e) => {
//     const current = data.availability || {}
//     onChange({
//       availability: {
//         ...current,
//         [day]: e.target.checked
//       }
//     })
//   }

//   // ✅ FIX: Handle slider change
//   const handleSliderChange = (e) => {
//     const value = Number(e.target.value)
//     onChange({ travelRadius: value })
//   }

//   // ✅ FIX: Handle radio change
//   const handleWillingToTravelChange = (value) => {
//     onChange({
//       willingToTravel: value,
//       travelPrefs: value === 'no' ? {} : data.travelPrefs
//     })
//   }

//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

//   // Get current radius value with fallback
//   const currentRadius = data.travelRadius !== undefined && data.travelRadius !== null && data.travelRadius !== '' 
//     ? Number(data.travelRadius) 
//     : 50

//   // Calculate slider percentage for fill
//   const sliderPercentage = Math.min(100, Math.max(0, (currentRadius / 100) * 100))

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         {/* Row 1: Hourly Rate + Availability */}
//         <div className="wizardSection">
//           <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
//             {/* Hourly Rate */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.hourlyRate')}</div>
//               <div style={{ maxWidth: '200px' }}>
//                 <TextField
//                   placeholder="$$"
//                   icon={<IconSupport />}
//                   value={data.hourlyRate || ''}
//                   onChange={(v) => handleChange('hourlyRate', v)}
//                 />
//               </div>
//             </div>

//             {/* Availability */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.availability')}</div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.overtime || false)}
//                     onChange={togglePayPref('overtime')}
//                   />
//                   {t('wizard.step5.openToOvertime')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.weekends || false)}
//                     onChange={togglePayPref('weekends')}
//                   />
//                   {t('wizard.step5.availableWeekends')}
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Row 2: Travel Radius + Willingness to Travel */}
//         <div className="wizardSection">
//           <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
//             {/* Travel Radius - Custom Slider with 70% width */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.travelRadius')}</div>
//               <div style={{ marginTop: '4px', maxWidth: '70%' }}>
//                 {/* Custom slider container */}
//                 <div style={{ position: 'relative', padding: '8px 0' }}>
//                   {/* Track background */}
//                   <div style={{
//                     position: 'relative',
//                     height: '6px',
//                     background: '#e5e7eb',
//                     borderRadius: '999px',
//                     cursor: 'pointer',
//                   }}>
//                     {/* Fill */}
//                     <div style={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       height: '100%',
//                       width: `${sliderPercentage}%`,
//                       background: '#0f4ea9',
//                       borderRadius: '999px',
//                       pointerEvents: 'none',
//                       transition: 'width 0.05s ease',
//                     }} />
                    
//                     {/* Slider input (invisible but functional) */}
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       step="1"
//                       value={currentRadius}
//                       onChange={handleSliderChange}
//                       style={{
//                         position: 'absolute',
//                         top: '-8px',
//                         left: '-4px',
//                         width: 'calc(100% + 8px)',
//                         height: '22px',
//                         opacity: 0,
//                         cursor: 'pointer',
//                         zIndex: 2,
//                         margin: 0,
//                         padding: 0,
//                       }}
//                     />
                    
//                     {/* Custom thumb (positioned based on value) */}
//                     <div style={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: `${sliderPercentage}%`,
//                       transform: 'translate(-50%, -50%)',
//                       width: '20px',
//                       height: '20px',
//                       borderRadius: '50%',
//                       background: '#0f4ea9',
//                       border: '2px solid white',
//                       boxShadow: '0 2px 6px rgba(15, 78, 169, 0.3)',
//                       pointerEvents: 'none',
//                       zIndex: 1,
//                       transition: 'left 0.05s ease',
//                     }} />
//                   </div>

//                   {/* Value display */}
//                   <div style={{ 
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '12px'
//                   }}>
//                     <span style={{ 
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'rgba(15, 78, 169, 0.08)',
//                       padding: '4px 16px',
//                       borderRadius: '6px',
//                     }}>
//                       {currentRadius} {t('wizard.step5.miles')}
//                     </span>
//                   </div>

//                   {/* Tick marks */}
//                   <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     fontSize: '11px', 
//                     color: 'rgba(23, 38, 58, 0.4)',
//                     marginTop: '4px',
//                     padding: '0 2px'
//                   }}>
//                     <span>0</span>
//                     <span>25</span>
//                     <span>50</span>
//                     <span>75</span>
//                     <span>100</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Willingness to Travel */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.willingToTravel')}</div>
//               <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="yes"
//                     checked={data.willingToTravel === 'yes'}
//                     onChange={() => handleWillingToTravelChange('yes')}
//                   />
//                   {t('wizard.step5.yes')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="no"
//                     checked={data.willingToTravel === 'no'}
//                     onChange={() => handleWillingToTravelChange('no')}
//                   />
//                   {t('wizard.step5.no')}
//                 </label>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Travel Preferences - Only show if "Yes" is selected */}
//         {data.willingToTravel === 'yes' && (
//           <div className="wizardSection">
//             <div style={{ 
//               padding: '16px 20px',
//               border: '1px solid rgba(15, 78, 169, 0.2)',
//               borderRadius: '12px',
//               background: 'rgba(15, 78, 169, 0.03)',
//             }}>
//               <div style={{ 
//                 fontSize: '13px', 
//                 fontWeight: 500, 
//                 color: '#17263a',
//                 marginBottom: '10px'
//               }}>
//                 {t('wizard.step5.travelPreferences')}
//               </div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.housing || false)}
//                     onChange={toggleTravelPref('housing')}
//                   />
//                   {t('wizard.step5.needsHousing')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.perDiem || false)}
//                     onChange={toggleTravelPref('perDiem')}
//                   />
//                   {t('wizard.step5.needsPerDiem')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.transportation || false)}
//                     onChange={toggleTravelPref('transportation')}
//                   />
//                   {t('wizard.step5.ownTransportation')}
//                 </label>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Available Days Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step5.availableDays')}</div>
//           <div style={{ 
//             display: 'grid', 
//             gridTemplateColumns: 'repeat(7, 1fr)', 
//             gap: '8px',
//             marginTop: '8px'
//           }}>
//             {daysOfWeek.map((day) => (
//               <label key={day} className="wizardCheck" style={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center',
//                 gap: '4px',
//                 padding: '8px 4px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//                 borderRadius: '8px',
//                 background: 'white',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease'
//               }}>
//                 <span style={{ 
//                   fontSize: '11px', 
//                   fontWeight: 500, 
//                   color: 'rgba(23, 38, 58, 0.6)',
//                   textTransform: 'uppercase'
//                 }}>
//                   {t(`wizard.step5.days.${day.toLowerCase()}`)}
//                 </span>
//                 <input
//                   type="checkbox"
//                   checked={!!(data.availability?.[day.toLowerCase()] || false)}
//                   onChange={handleDayToggle(day.toLowerCase())}
//                   style={{
//                     width: '18px',
//                     height: '18px',
//                     cursor: 'pointer',
//                     accentColor: '#0f4ea9'
//                   }}
//                 />
//               </label>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default WizardStep5







// // src/worker/components/wizard-steps/WizardStep5.jsx
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

// export function WizardStep5({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ Validation error states
//   const [hourlyRateError, setHourlyRateError] = useState('')
//   const [availabilityError, setAvailabilityError] = useState('')
//   const [willingToTravelError, setWillingToTravelError] = useState('')
//   const [travelPrefsError, setTravelPrefsError] = useState('')
//   const [availableDaysError, setAvailableDaysError] = useState('')
  
//   // ✅ FIX: Handle change - only update specific field
//   const handleChange = (field, value) => {
//     onChange({ [field]: value })
//     // Clear error when field is updated
//     if (field === 'hourlyRate') setHourlyRateError('')
//     if (field === 'willingToTravel') setWillingToTravelError('')
//   }

//   // ✅ FIX: Toggle pay preferences
//   const togglePayPref = (key) => (e) => {
//     const current = data.payPrefs || {}
//     onChange({
//       payPrefs: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//     // Clear availability error when any preference is toggled
//     if (key === 'overtime' || key === 'weekends') {
//       setAvailabilityError('')
//     }
//   }

//   // ✅ FIX: Toggle travel preferences
//   const toggleTravelPref = (key) => (e) => {
//     const current = data.travelPrefs || {}
//     onChange({
//       travelPrefs: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//     // Clear travel prefs error when any is toggled
//     setTravelPrefsError('')
//   }

//   // ✅ FIX: Handle day toggle
//   const handleDayToggle = (day) => (e) => {
//     const current = data.availability || {}
//     onChange({
//       availability: {
//         ...current,
//         [day]: e.target.checked
//       }
//     })
//     // Clear available days error when any day is toggled
//     setAvailableDaysError('')
//   }

//   // ✅ FIX: Handle slider change
//   const handleSliderChange = (e) => {
//     const value = Number(e.target.value)
//     onChange({ travelRadius: value })
//   }

//   // ✅ FIX: Handle radio change
//   const handleWillingToTravelChange = (value) => {
//     onChange({
//       willingToTravel: value,
//       travelPrefs: value === 'no' ? {} : data.travelPrefs
//     })
//     setWillingToTravelError('')
//     if (value === 'no') {
//       setTravelPrefsError('')
//     }
//   }

//   // ✅ Validate all fields
//   const validateFields = () => {
//     let isValid = true

//     // Hourly Rate - Required
//     if (!data.hourlyRate || data.hourlyRate.trim() === '') {
//       setHourlyRateError('Hourly rate is required')
//       isValid = false
//     } else {
//       setHourlyRateError('')
//     }

//     // Availability - Required (at least one checkbox checked)
//     const hasAvailability = data.payPrefs?.overtime || data.payPrefs?.weekends
//     if (!hasAvailability) {
//       setAvailabilityError('Please select at least one availability option')
//       isValid = false
//     } else {
//       setAvailabilityError('')
//     }

//     // Willingness to Travel - Required
//     if (!data.willingToTravel) {
//       setWillingToTravelError('Please select yes or no')
//       isValid = false
//     } else {
//       setWillingToTravelError('')
//     }

//     // Travel Preferences - Required if willing to travel is 'yes'
//     if (data.willingToTravel === 'yes') {
//       const hasTravelPref = data.travelPrefs?.housing || data.travelPrefs?.perDiem || data.travelPrefs?.transportation
//       if (!hasTravelPref) {
//         setTravelPrefsError('Please select at least one travel preference')
//         isValid = false
//       } else {
//         setTravelPrefsError('')
//       }
//     } else {
//       setTravelPrefsError('')
//     }

//     // Available Days - Required (at least one day selected)
//     const hasDays = data.availability && Object.values(data.availability).some(v => v === true)
//     if (!hasDays) {
//       setAvailableDaysError('Please select at least one available day')
//       isValid = false
//     } else {
//       setAvailableDaysError('')
//     }

//     return isValid
//   }

//   // ✅ Handle Next button click with validation - calls parent's onNext
//   const handleNext = () => {
//     const isValid = validateFields()
//     if (isValid && onNext) {
//       onNext()
//     } else {
//       // Scroll to first error
//       const firstError = document.querySelector('.field-error, .error-text')
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
//       }
//     }
//   }

//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

//   // Get current radius value with fallback
//   const currentRadius = data.travelRadius !== undefined && data.travelRadius !== null && data.travelRadius !== '' 
//     ? Number(data.travelRadius) 
//     : 50

//   // Calculate slider percentage for fill
//   const sliderPercentage = Math.min(100, Math.max(0, (currentRadius / 100) * 100))

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         {/* Row 1: Hourly Rate + Availability */}
//         <div className="wizardSection">
//           <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
//             {/* Hourly Rate */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.hourlyRate')} <span style={{ color: '#dc2626' }}>*</span></div>
//               <div style={{ maxWidth: '200px' }}>
//                 <TextField
//                   placeholder="$$"
//                   icon={<IconSupport />}
//                   value={data.hourlyRate || ''}
//                   onChange={(v) => handleChange('hourlyRate', v)}
//                   className={hourlyRateError ? 'field-error-input' : ''}
//                 />
//                 {hourlyRateError && <div className="field-error">⚠️ {hourlyRateError}</div>}
//               </div>
//             </div>

//             {/* Availability */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.availability')} <span style={{ color: '#dc2626' }}>*</span></div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.overtime || false)}
//                     onChange={togglePayPref('overtime')}
//                   />
//                   {t('wizard.step5.openToOvertime')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.weekends || false)}
//                     onChange={togglePayPref('weekends')}
//                   />
//                   {t('wizard.step5.availableWeekends')}
//                 </label>
//               </div>
//               {availabilityError && <div className="field-error">⚠️ {availabilityError}</div>}
//             </div>
//           </div>
//         </div>

//         {/* Row 2: Travel Radius + Willingness to Travel */}
//         <div className="wizardSection">
//           <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
//             {/* Travel Radius - Custom Slider with 70% width */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.travelRadius')}</div>
//               <div style={{ marginTop: '4px', maxWidth: '70%' }}>
//                 {/* Custom slider container */}
//                 <div style={{ position: 'relative', padding: '8px 0' }}>
//                   {/* Track background */}
//                   <div style={{
//                     position: 'relative',
//                     height: '6px',
//                     background: '#e5e7eb',
//                     borderRadius: '999px',
//                     cursor: 'pointer',
//                   }}>
//                     {/* Fill */}
//                     <div style={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       height: '100%',
//                       width: `${sliderPercentage}%`,
//                       background: '#0f4ea9',
//                       borderRadius: '999px',
//                       pointerEvents: 'none',
//                       transition: 'width 0.05s ease',
//                     }} />
                    
//                     {/* Slider input (invisible but functional) */}
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       step="1"
//                       value={currentRadius}
//                       onChange={handleSliderChange}
//                       style={{
//                         position: 'absolute',
//                         top: '-8px',
//                         left: '-4px',
//                         width: 'calc(100% + 8px)',
//                         height: '22px',
//                         opacity: 0,
//                         cursor: 'pointer',
//                         zIndex: 2,
//                         margin: 0,
//                         padding: 0,
//                       }}
//                     />
                    
//                     {/* Custom thumb (positioned based on value) */}
//                     <div style={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: `${sliderPercentage}%`,
//                       transform: 'translate(-50%, -50%)',
//                       width: '20px',
//                       height: '20px',
//                       borderRadius: '50%',
//                       background: '#0f4ea9',
//                       border: '2px solid white',
//                       boxShadow: '0 2px 6px rgba(15, 78, 169, 0.3)',
//                       pointerEvents: 'none',
//                       zIndex: 1,
//                       transition: 'left 0.05s ease',
//                     }} />
//                   </div>

//                   {/* Value display */}
//                   <div style={{ 
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '12px'
//                   }}>
//                     <span style={{ 
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'rgba(15, 78, 169, 0.08)',
//                       padding: '4px 16px',
//                       borderRadius: '6px',
//                     }}>
//                       {currentRadius} {t('wizard.step5.miles')}
//                     </span>
//                   </div>

//                   {/* Tick marks */}
//                   <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     fontSize: '11px', 
//                     color: 'rgba(23, 38, 58, 0.4)',
//                     marginTop: '4px',
//                     padding: '0 2px'
//                   }}>
//                     <span>0</span>
//                     <span>25</span>
//                     <span>50</span>
//                     <span>75</span>
//                     <span>100</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Willingness to Travel */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.willingToTravel')} <span style={{ color: '#dc2626' }}>*</span></div>
//               <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="yes"
//                     checked={data.willingToTravel === 'yes'}
//                     onChange={() => handleWillingToTravelChange('yes')}
//                   />
//                   {t('wizard.step5.yes')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="no"
//                     checked={data.willingToTravel === 'no'}
//                     onChange={() => handleWillingToTravelChange('no')}
//                   />
//                   {t('wizard.step5.no')}
//                 </label>
//               </div>
//               {willingToTravelError && <div className="field-error">⚠️ {willingToTravelError}</div>}
//             </div>
//           </div>
//         </div>

//         {/* Travel Preferences - Only show if "Yes" is selected */}
//         {data.willingToTravel === 'yes' && (
//           <div className="wizardSection">
//             <div style={{ 
//               padding: '16px 20px',
//               border: '1px solid rgba(15, 78, 169, 0.2)',
//               borderRadius: '12px',
//               background: 'rgba(15, 78, 169, 0.03)',
//             }}>
//               <div style={{ 
//                 fontSize: '13px', 
//                 fontWeight: 500, 
//                 color: '#17263a',
//                 marginBottom: '10px'
//               }}>
//                 {t('wizard.step5.travelPreferences')} <span style={{ color: '#dc2626' }}>*</span>
//               </div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.housing || false)}
//                     onChange={toggleTravelPref('housing')}
//                   />
//                   {t('wizard.step5.needsHousing')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.perDiem || false)}
//                     onChange={toggleTravelPref('perDiem')}
//                   />
//                   {t('wizard.step5.needsPerDiem')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.transportation || false)}
//                     onChange={toggleTravelPref('transportation')}
//                   />
//                   {t('wizard.step5.ownTransportation')}
//                 </label>
//               </div>
//               {travelPrefsError && <div className="field-error">⚠️ {travelPrefsError}</div>}
//             </div>
//           </div>
//         )}

//         {/* Available Days Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step5.availableDays')} <span style={{ color: '#dc2626' }}>*</span></div>
//           <div style={{ 
//             display: 'grid', 
//             gridTemplateColumns: 'repeat(7, 1fr)', 
//             gap: '8px',
//             marginTop: '8px'
//           }}>
//             {daysOfWeek.map((day) => (
//               <label key={day} className="wizardCheck" style={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center',
//                 gap: '4px',
//                 padding: '8px 4px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//                 borderRadius: '8px',
//                 background: 'white',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease'
//               }}>
//                 <span style={{ 
//                   fontSize: '11px', 
//                   fontWeight: 500, 
//                   color: 'rgba(23, 38, 58, 0.6)',
//                   textTransform: 'uppercase'
//                 }}>
//                   {t(`wizard.step5.days.${day.toLowerCase()}`)}
//                 </span>
//                 <input
//                   type="checkbox"
//                   checked={!!(data.availability?.[day.toLowerCase()] || false)}
//                   onChange={handleDayToggle(day.toLowerCase())}
//                   style={{
//                     width: '18px',
//                     height: '18px',
//                     cursor: 'pointer',
//                     accentColor: '#0f4ea9'
//                   }}
//                 />
//               </label>
//             ))}
//           </div>
//           {availableDaysError && <div className="field-error">⚠️ {availableDaysError}</div>}
//         </div>
//       </div>

//       {/* CSS styles for error messages */}
//       <style>{`
//         .field-error {
//           color: #dc2626;
//           font-size: 11px;
//           margin-top: 4px;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }

//         .field-error-input {
//           border-color: #dc2626 !important;
//         }

//         .field-error-input:focus {
//           border-color: #dc2626 !important;
//           box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
//         }

//         .error-text {
//           color: #dc2626;
//           font-size: 12px;
//           margin-top: 4px;
//         }
//       `}</style>
//     </div>
//   )
// }

// export default WizardStep5











// // src/worker/components/wizard-steps/WizardStep5.jsx
// import { useState } from 'react'
// import { useTranslation } from 'react-i18next'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

// export function WizardStep5({ data, onChange, onNext, onBack }) {
//   const { t } = useTranslation()
  
//   // ✅ Validation error states
//   const [hourlyRateError, setHourlyRateError] = useState('')
//   const [availabilityError, setAvailabilityError] = useState('')
//   const [willingToTravelError, setWillingToTravelError] = useState('')
//   const [travelPrefsError, setTravelPrefsError] = useState('')
//   const [availableDaysError, setAvailableDaysError] = useState('')
  
//   // ✅ FIX: Handle change - only update specific field
//   const handleChange = (field, value) => {
//     onChange({ [field]: value })
//     // Clear error when field is updated
//     if (field === 'hourlyRate') setHourlyRateError('')
//     if (field === 'willingToTravel') setWillingToTravelError('')
//   }

//   // ✅ FIX: Toggle pay preferences
//   const togglePayPref = (key) => (e) => {
//     const current = data.payPrefs || {}
//     onChange({
//       payPrefs: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//     // Clear availability error when any preference is toggled
//     if (key === 'overtime' || key === 'weekends') {
//       setAvailabilityError('')
//     }
//   }

//   // ✅ FIX: Toggle travel preferences
//   const toggleTravelPref = (key) => (e) => {
//     const current = data.travelPrefs || {}
//     onChange({
//       travelPrefs: {
//         ...current,
//         [key]: e.target.checked
//       }
//     })
//     // Clear travel prefs error when any is toggled
//     setTravelPrefsError('')
//   }

//   // ✅ FIX: Handle day toggle
//   const handleDayToggle = (day) => (e) => {
//     const current = data.availability || {}
//     onChange({
//       availability: {
//         ...current,
//         [day]: e.target.checked
//       }
//     })
//     // Clear available days error when any day is toggled
//     setAvailableDaysError('')
//   }

//   // ✅ FIX: Handle slider change
//   const handleSliderChange = (e) => {
//     const value = Number(e.target.value)
//     onChange({ travelRadius: value })
//   }

//   // ✅ FIX: Handle radio change
//   const handleWillingToTravelChange = (value) => {
//     onChange({
//       willingToTravel: value,
//       travelPrefs: value === 'no' ? {} : data.travelPrefs
//     })
//     setWillingToTravelError('')
//     if (value === 'no') {
//       setTravelPrefsError('')
//     }
//   }

//   // ✅ Validate all fields
//   const validateFields = () => {
//     let isValid = true

//     // Hourly Rate - Required
//     if (!data.hourlyRate || data.hourlyRate.trim() === '') {
//       setHourlyRateError('Hourly rate is required')
//       isValid = false
//     } else {
//       setHourlyRateError('')
//     }

//     // Availability - Required (at least one checkbox checked)
//     const hasAvailability = data.payPrefs?.overtime || data.payPrefs?.weekends
//     if (!hasAvailability) {
//       setAvailabilityError('Please select at least one availability option')
//       isValid = false
//     } else {
//       setAvailabilityError('')
//     }

//     // Willingness to Travel - Required
//     if (!data.willingToTravel) {
//       setWillingToTravelError('Please select yes or no')
//       isValid = false
//     } else {
//       setWillingToTravelError('')
//     }

//     // Travel Preferences - Required if willing to travel is 'yes'
//     if (data.willingToTravel === 'yes') {
//       const hasTravelPref = data.travelPrefs?.housing || data.travelPrefs?.perDiem || data.travelPrefs?.transportation
//       if (!hasTravelPref) {
//         setTravelPrefsError('Please select at least one travel preference')
//         isValid = false
//       } else {
//         setTravelPrefsError('')
//       }
//     } else {
//       setTravelPrefsError('')
//     }

//     // Available Days - Required (at least one day selected)
//     const hasDays = data.availability && Object.values(data.availability).some(v => v === true)
//     if (!hasDays) {
//       setAvailableDaysError('Please select at least one available day')
//       isValid = false
//     } else {
//       setAvailableDaysError('')
//     }

//     return isValid
//   }

//   // ✅ Handle Next button click with validation - calls parent's onNext
//   const handleNext = () => {
//     const isValid = validateFields()
//     if (isValid && onNext) {
//       onNext()
//     } else {
//       // Scroll to first error
//       const firstError = document.querySelector('.field-error, .error-text')
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
//       }
//     }
//   }

//   const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

//   // Get current radius value with fallback
//   const currentRadius = data.travelRadius !== undefined && data.travelRadius !== null && data.travelRadius !== '' 
//     ? Number(data.travelRadius) 
//     : 50

//   // Calculate slider percentage for fill
//   const sliderPercentage = Math.min(100, Math.max(0, (currentRadius / 100) * 100))

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         {/* Row 1: Hourly Rate + Availability */}
//         <div className="wizardSection">
//           <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
//             {/* Hourly Rate */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.hourlyRate')} <span style={{ color: '#dc2626' }}>*</span></div>
//               <div style={{ maxWidth: '200px' }}>
//                 <TextField
//                   placeholder="$$"
//                   icon={<IconSupport />}
//                   value={data.hourlyRate || ''}
//                   onChange={(v) => handleChange('hourlyRate', v)}
//                   className={hourlyRateError ? 'field-error-input' : ''}
//                 />
//                 {hourlyRateError && <div className="field-error">⚠️ {hourlyRateError}</div>}
//               </div>
//             </div>

//             {/* Availability */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.availability')} <span style={{ color: '#dc2626' }}>*</span></div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.overtime || false)}
//                     onChange={togglePayPref('overtime')}
//                   />
//                   {t('wizard.step5.openToOvertime')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.weekends || false)}
//                     onChange={togglePayPref('weekends')}
//                   />
//                   {t('wizard.step5.availableWeekends')}
//                 </label>
//               </div>
//               {availabilityError && <div className="field-error">⚠️ {availabilityError}</div>}
//             </div>
//           </div>
//         </div>

//         {/* Row 2: Travel Radius + Willingness to Travel */}
//         <div className="wizardSection">
//           <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
//             {/* Travel Radius - Custom Slider */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.travelRadius')}</div>
//               <div style={{ marginTop: '4px', maxWidth: '100%' }}>
//                 {/* Custom slider container */}
//                 <div style={{ position: 'relative', padding: '8px 0' }}>
//                   {/* Track background */}
//                   <div style={{
//                     position: 'relative',
//                     height: '6px',
//                     background: '#e5e7eb',
//                     borderRadius: '999px',
//                     cursor: 'pointer',
//                   }}>
//                     {/* Fill */}
//                     <div style={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       height: '100%',
//                       width: `${sliderPercentage}%`,
//                       background: '#0f4ea9',
//                       borderRadius: '999px',
//                       pointerEvents: 'none',
//                       transition: 'width 0.05s ease',
//                     }} />
                    
//                     {/* Slider input (invisible but functional) */}
//                     <input
//                       type="range"
//                       min="0"
//                       max="100"
//                       step="1"
//                       value={currentRadius}
//                       onChange={handleSliderChange}
//                       style={{
//                         position: 'absolute',
//                         top: '-8px',
//                         left: '-4px',
//                         width: 'calc(100% + 8px)',
//                         height: '22px',
//                         opacity: 0,
//                         cursor: 'pointer',
//                         zIndex: 2,
//                         margin: 0,
//                         padding: 0,
//                       }}
//                     />
                    
//                     {/* Custom thumb (positioned based on value) */}
//                     <div style={{
//                       position: 'absolute',
//                       top: '50%',
//                       left: `${sliderPercentage}%`,
//                       transform: 'translate(-50%, -50%)',
//                       width: '20px',
//                       height: '20px',
//                       borderRadius: '50%',
//                       background: '#0f4ea9',
//                       border: '2px solid white',
//                       boxShadow: '0 2px 6px rgba(15, 78, 169, 0.3)',
//                       pointerEvents: 'none',
//                       zIndex: 1,
//                       transition: 'left 0.05s ease',
//                     }} />
//                   </div>

//                   {/* Value display */}
//                   <div style={{ 
//                     display: 'flex',
//                     justifyContent: 'space-between',
//                     marginTop: '12px'
//                   }}>
//                     <span style={{ 
//                       fontSize: '14px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: 'rgba(15, 78, 169, 0.08)',
//                       padding: '4px 16px',
//                       borderRadius: '6px',
//                     }}>
//                       {currentRadius} {t('wizard.step5.miles')}
//                     </span>
//                   </div>

//                   {/* Tick marks */}
//                   <div style={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     fontSize: '11px', 
//                     color: 'rgba(23, 38, 58, 0.4)',
//                     marginTop: '4px',
//                     padding: '0 2px'
//                   }}>
//                     <span>0</span>
//                     <span>25</span>
//                     <span>50</span>
//                     <span>75</span>
//                     <span>100</span>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Willingness to Travel */}
//             <div>
//               <div className="wizardSectionBar">{t('wizard.step5.willingToTravel')} <span style={{ color: '#dc2626' }}>*</span></div>
//               <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="yes"
//                     checked={data.willingToTravel === 'yes'}
//                     onChange={() => handleWillingToTravelChange('yes')}
//                   />
//                   {t('wizard.step5.yes')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="no"
//                     checked={data.willingToTravel === 'no'}
//                     onChange={() => handleWillingToTravelChange('no')}
//                   />
//                   {t('wizard.step5.no')}
//                 </label>
//               </div>
//               {willingToTravelError && <div className="field-error">⚠️ {willingToTravelError}</div>}
//             </div>
//           </div>
//         </div>

//         {/* Travel Preferences - Only show if "Yes" is selected */}
//         {data.willingToTravel === 'yes' && (
//           <div className="wizardSection">
//             <div style={{ 
//               padding: '16px 20px',
//               border: '1px solid rgba(15, 78, 169, 0.2)',
//               borderRadius: '12px',
//               background: 'rgba(15, 78, 169, 0.03)',
//             }}>
//               <div style={{ 
//                 fontSize: '13px', 
//                 fontWeight: 500, 
//                 color: '#17263a',
//                 marginBottom: '10px'
//               }}>
//                 {t('wizard.step5.travelPreferences')} <span style={{ color: '#dc2626' }}>*</span>
//               </div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.housing || false)}
//                     onChange={toggleTravelPref('housing')}
//                   />
//                   {t('wizard.step5.needsHousing')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.perDiem || false)}
//                     onChange={toggleTravelPref('perDiem')}
//                   />
//                   {t('wizard.step5.needsPerDiem')}
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.transportation || false)}
//                     onChange={toggleTravelPref('transportation')}
//                   />
//                   {t('wizard.step5.ownTransportation')}
//                 </label>
//               </div>
//               {travelPrefsError && <div className="field-error">⚠️ {travelPrefsError}</div>}
//             </div>
//           </div>
//         )}

//         {/* Available Days Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">{t('wizard.step5.availableDays')} <span style={{ color: '#dc2626' }}>*</span></div>
//           <div style={{ 
//             display: 'grid', 
//             gridTemplateColumns: 'repeat(7, 1fr)', 
//             gap: '8px',
//             marginTop: '8px'
//           }}>
//             {daysOfWeek.map((day) => (
//               <label key={day} className="wizardCheck" style={{ 
//                 display: 'flex', 
//                 flexDirection: 'column', 
//                 alignItems: 'center',
//                 gap: '4px',
//                 padding: '8px 4px',
//                 border: '1px solid rgba(18, 38, 63, 0.08)',
//                 borderRadius: '8px',
//                 background: 'white',
//                 cursor: 'pointer',
//                 transition: 'all 0.2s ease'
//               }}>
//                 <span style={{ 
//                   fontSize: '11px', 
//                   fontWeight: 500, 
//                   color: 'rgba(23, 38, 58, 0.6)',
//                   textTransform: 'uppercase'
//                 }}>
//                   {t(`wizard.step5.days.${day.toLowerCase()}`)}
//                 </span>
//                 <input
//                   type="checkbox"
//                   checked={!!(data.availability?.[day.toLowerCase()] || false)}
//                   onChange={handleDayToggle(day.toLowerCase())}
//                   style={{
//                     width: '18px',
//                     height: '18px',
//                     cursor: 'pointer',
//                     accentColor: '#0f4ea9'
//                   }}
//                 />
//               </label>
//             ))}
//           </div>
//           {availableDaysError && <div className="field-error">⚠️ {availableDaysError}</div>}
//         </div>
//       </div>

//       {/* ✅ Footer with Back and Next buttons */}
//       <div className="wizardFooter" style={{
//         position: 'sticky',
//         bottom: 0,
//         zIndex: 10,
//         background: 'white',
//         padding: '12px 24px',
//         borderTop: '1px solid rgba(18, 38, 63, 0.06)',
//         boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginTop: '24px',
//         borderBottomLeftRadius: '12px',
//         borderBottomRightRadius: '12px',
//         flexWrap: 'wrap',
//         gap: '10px',
//       }}>
//         <button 
//           type="button" 
//           onClick={onBack}
//           style={{
//             padding: '8px 20px',
//             borderRadius: '8px',
//             background: 'transparent',
//             color: '#17263a',
//             border: '1px solid rgba(18, 38, 63, 0.12)',
//             cursor: 'pointer',
//             fontWeight: 500,
//             fontSize: '14px',
//             transition: 'all 0.2s',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px'
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <span>←</span> Back
//         </button>

//         <button 
//           type="button" 
//           onClick={handleNext}
//           style={{
//             padding: '8px 24px',
//             borderRadius: '8px',
//             background: '#0f4ea9',
//             color: 'white',
//             border: 'none',
//             cursor: 'pointer',
//             fontWeight: 600,
//             fontSize: '14px',
//             transition: 'all 0.2s',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '8px',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = '#0b3f90'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = '#0f4ea9'
//           }}
//         >
//           Continue <span>→</span>
//         </button>
//       </div>

//       {/* CSS styles for error messages and responsiveness */}
//       <style>{`
//         .field-error {
//           color: #dc2626;
//           font-size: 11px;
//           margin-top: 4px;
//           display: flex;
//           align-items: center;
//           gap: 4px;
//         }

//         .field-error-input {
//           border-color: #dc2626 !important;
//         }

//         .field-error-input:focus {
//           border-color: #dc2626 !important;
//           box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1) !important;
//         }

//         .error-text {
//           color: #dc2626;
//           font-size: 12px;
//           margin-top: 4px;
//         }

//         /* ✅ Mobile Responsive Styles */
//         @media (max-width: 768px) {
//           .wizardStep .wizardBody {
//             padding: 12px !important;
//           }

//           /* Grid 2 columns - stack on mobile */
//           .wizardGrid2 {
//             grid-template-columns: 1fr !important;
//             gap: 16px !important;
//           }

//           /* Hourly rate input - full width on mobile */
//           .wizardStep .wizardSection div[style*="max-width: 200px"] {
//             max-width: 100% !important;
//           }

//           /* Availability checkboxes - stack on mobile */
//           .wizardStep .wizardSection div[style*="display: flex"][style*="gap: 20px"] {
//             gap: 12px !important;
//           }

//           /* Travel radius - full width on mobile */
//           .wizardStep .wizardSection div[style*="max-width: 70%"] {
//             max-width: 100% !important;
//           }

//           /* Willingness to travel radio buttons - stack on mobile */
//           .wizardStep .wizardSection div[style*="gap: 24px"] {
//             gap: 12px !important;
//           }

//           /* Travel preferences - stack on mobile */
//           .wizardStep .wizardSection div[style*="gap: 20px"] {
//             gap: 12px !important;
//             flex-direction: column !important;
//           }

//           .wizardStep .wizardSection div[style*="gap: 20px"] label {
//             width: 100% !important;
//           }

//           /* Available days grid - responsive */
//           .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] {
//             grid-template-columns: repeat(4, 1fr) !important;
//             gap: 6px !important;
//           }

//           /* Day labels - smaller on mobile */
//           .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label {
//             padding: 6px 2px !important;
//           }

//           .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label span {
//             font-size: 9px !important;
//           }

//           .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label input {
//             width: 16px !important;
//             height: 16px !important;
//           }

//           /* Travel preferences container */
//           .wizardStep .wizardSection div[style*="padding: 16px 20px"] {
//             padding: 12px 14px !important;
//           }

//           /* Section bars - smaller on mobile */
//           .wizardSectionBar {
//             font-size: 13px !important;
//           }

//           /* Footer - stack on mobile */
//           .wizardFooter {
//             flex-direction: column !important;
//             gap: 10px !important;
//             padding: 12px 16px !important;
//             border-bottom-left-radius: 0 !important;
//             border-bottom-right-radius: 0 !important;
//           }

//           .wizardFooter button {
//             width: 100% !important;
//             justify-content: center !important;
//           }

//           /* Slider value display */
//           .wizardStep .wizardSection div[style*="padding: 4px 16px"] {
//             font-size: 12px !important;
//             padding: 3px 12px !important;
//           }

//           /* Tick marks */
//           .wizardStep .wizardSection div[style*="font-size: 11px"] {
//             font-size: 9px !important;
//           }

//           /* Slider thumb */
//           .wizardStep .wizardSection div[style*="width: 20px"][style*="height: 20px"] {
//             width: 16px !important;
//             height: 16px !important;
//           }

//           /* Error messages */
//           .field-error {
//             font-size: 10px !important;
//           }
//         }

//         @media (max-width: 480px) {
//           .wizardStep .wizardBody {
//             padding: 8px !important;
//           }

//           /* Available days grid - 3 columns on very small screens */
//           .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] {
//             grid-template-columns: repeat(3, 1fr) !important;
//             gap: 4px !important;
//           }

//           .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label {
//             padding: 4px 2px !important;
//           }

//           .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label span {
//             font-size: 8px !important;
//           }

//           .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label input {
//             width: 14px !important;
//             height: 14px !important;
//           }

//           /* Travel preferences - more compact */
//           .wizardStep .wizardSection div[style*="padding: 16px 20px"] {
//             padding: 10px 12px !important;
//           }

//           .wizardStep .wizardSection div[style*="font-size: 13px"][style*="font-weight: 500"] {
//             font-size: 12px !important;
//           }

//           /* Section bars */
//           .wizardSectionBar {
//             font-size: 12px !important;
//           }

//           /* Footer - more compact */
//           .wizardFooter {
//             padding: 10px 12px !important;
//           }

//           .wizardFooter button {
//             font-size: 13px !important;
//             padding: 10px 16px !important;
//           }

//           /* Slider value display */
//           .wizardStep .wizardSection div[style*="padding: 4px 16px"] {
//             font-size: 11px !important;
//             padding: 2px 10px !important;
//           }

//           /* Tick marks */
//           .wizardStep .wizardSection div[style*="font-size: 11px"] {
//             font-size: 8px !important;
//           }

//           /* Slider thumb */
//           .wizardStep .wizardSection div[style*="width: 20px"][style*="height: 20px"] {
//             width: 14px !important;
//             height: 14px !important;
//           }

//           /* Field error */
//           .field-error {
//             font-size: 9px !important;
//           }

//           /* Hourly rate input */
//           .wizardStep .wizardSection .fieldControl {
//             height: 34px !important;
//           }

//           .wizardStep .wizardSection .fieldInput {
//             font-size: 12px !important;
//           }
//         }

//         /* Tablet optimization */
//         @media (min-width: 769px) and (max-width: 1024px) {
//           /* Available days grid - 4 columns on tablet */
//           .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] {
//             grid-template-columns: repeat(4, 1fr) !important;
//           }

//           /* Travel preferences - wrap nicely */
//           .wizardStep .wizardSection div[style*="gap: 20px"] {
//             gap: 16px !important;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default WizardStep5







// src/worker/components/wizard-steps/WizardStep5.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

export function WizardStep5({ data, onChange, onNext, onBack }) {
  const { t } = useTranslation()
  
  // ✅ Validation error states
  const [hourlyRateError, setHourlyRateError] = useState('')
  const [availabilityError, setAvailabilityError] = useState('')
  const [willingToTravelError, setWillingToTravelError] = useState('')
  const [travelPrefsError, setTravelPrefsError] = useState('')
  const [availableDaysError, setAvailableDaysError] = useState('')
  
  // ✅ FIX: Handle change - only update specific field
  const handleChange = (field, value) => {
    onChange({ [field]: value })
    // Clear error when field is updated
    if (field === 'hourlyRate') setHourlyRateError('')
    if (field === 'willingToTravel') setWillingToTravelError('')
  }

  // ✅ FIX: Toggle pay preferences
  const togglePayPref = (key) => (e) => {
    const current = data.payPrefs || {}
    onChange({
      payPrefs: {
        ...current,
        [key]: e.target.checked
      }
    })
    // Clear availability error when any preference is toggled
    if (key === 'overtime' || key === 'weekends') {
      setAvailabilityError('')
    }
  }

  // ✅ FIX: Toggle travel preferences
  const toggleTravelPref = (key) => (e) => {
    const current = data.travelPrefs || {}
    onChange({
      travelPrefs: {
        ...current,
        [key]: e.target.checked
      }
    })
    // Clear travel prefs error when any is toggled
    setTravelPrefsError('')
  }

  // ✅ FIX: Handle day toggle
  const handleDayToggle = (day) => (e) => {
    const current = data.availability || {}
    onChange({
      availability: {
        ...current,
        [day]: e.target.checked
      }
    })
    // Clear available days error when any day is toggled
    setAvailableDaysError('')
  }

  // ✅ FIX: Handle slider change
  const handleSliderChange = (e) => {
    const value = Number(e.target.value)
    onChange({ travelRadius: value })
  }

  // ✅ FIX: Handle radio change
  const handleWillingToTravelChange = (value) => {
    onChange({
      willingToTravel: value,
      travelPrefs: value === 'no' ? {} : data.travelPrefs
    })
    setWillingToTravelError('')
    if (value === 'no') {
      setTravelPrefsError('')
    }
  }

  // ✅ Validate all fields
  const validateFields = () => {
    let isValid = true

    // Hourly Rate - Required
    if (!data.hourlyRate || data.hourlyRate.trim() === '') {
      setHourlyRateError('Hourly rate is required')
      isValid = false
    } else {
      setHourlyRateError('')
    }

    // Availability - Required (at least one checkbox checked)
    const hasAvailability = data.payPrefs?.overtime || data.payPrefs?.weekends
    if (!hasAvailability) {
      setAvailabilityError('Please select at least one availability option')
      isValid = false
    } else {
      setAvailabilityError('')
    }

    // Willingness to Travel - Required
    if (!data.willingToTravel) {
      setWillingToTravelError('Please select yes or no')
      isValid = false
    } else {
      setWillingToTravelError('')
    }

    // Travel Preferences - Required if willing to travel is 'yes'
    if (data.willingToTravel === 'yes') {
      const hasTravelPref = data.travelPrefs?.housing || data.travelPrefs?.perDiem || data.travelPrefs?.transportation
      if (!hasTravelPref) {
        setTravelPrefsError('Please select at least one travel preference')
        isValid = false
      } else {
        setTravelPrefsError('')
      }
    } else {
      setTravelPrefsError('')
    }

    // Available Days - Required (at least one day selected)
    const hasDays = data.availability && Object.values(data.availability).some(v => v === true)
    if (!hasDays) {
      setAvailableDaysError('Please select at least one available day')
      isValid = false
    } else {
      setAvailableDaysError('')
    }

    return isValid
  }

  // ✅ Handle Next button click with validation - calls parent's onNext
  const handleNext = () => {
    const isValid = validateFields()
    if (isValid && onNext) {
      onNext()
    } else {
      // Scroll to first error
      const firstError = document.querySelector('.field-error, .error-text')
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // Get current radius value with fallback
  const currentRadius = data.travelRadius !== undefined && data.travelRadius !== null && data.travelRadius !== '' 
    ? Number(data.travelRadius) 
    : 50

  // Calculate slider percentage for fill
  const sliderPercentage = Math.min(100, Math.max(0, (currentRadius / 100) * 100))

  return (
    <div className="wizardStep" style={{ touchAction: 'manipulation' }}>
      <div className="wizardBody" style={{ padding: '20px' }}>
        {/* Row 1: Hourly Rate + Availability */}
        <div className="wizardSection" style={{ marginBottom: '24px' }}>
          <div className="wizardGrid2" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '20px',
            alignItems: 'flex-start'
          }}>
            {/* Hourly Rate */}
            <div>
              <div className="wizardSectionBar" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#17263a',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {t('wizard.step5.hourlyRate')} <span style={{ color: '#dc2626' }}>*</span>
              </div>
              <div style={{ maxWidth: '200px' }}>
                <TextField
                  placeholder="$$"
                  icon={<IconSupport />}
                  value={data.hourlyRate || ''}
                  onChange={(v) => handleChange('hourlyRate', v)}
                  className={hourlyRateError ? 'field-error-input' : ''}
                  style={{
                    height: '44px', // Touch-friendly height
                    fontSize: '16px', // Prevent iOS zoom
                  }}
                />
                {hourlyRateError && <div className="field-error" style={{ 
                  color: '#dc2626', 
                  fontSize: '12px', 
                  marginTop: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}>
                  ⚠️ {hourlyRateError}
                </div>}
              </div>
            </div>

            {/* Availability */}
            <div>
              <div className="wizardSectionBar" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#17263a',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {t('wizard.step5.availability')} <span style={{ color: '#dc2626' }}>*</span>
              </div>
              <div style={{ 
                display: 'flex', 
                gap: '16px', 
                flexWrap: 'wrap', 
                marginTop: '4px' 
              }}>
                <label className="wizardCheck" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  minHeight: '44px',
                  borderRadius: '8px',
                  border: '1px solid rgba(18, 38, 63, 0.08)',
                  background: 'white',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}>
                  <input
                    type="checkbox"
                    checked={!!(data.payPrefs?.overtime || false)}
                    onChange={togglePayPref('overtime')}
                    style={{
                      width: '22px',
                      height: '22px',
                      minWidth: '22px',
                      cursor: 'pointer',
                      accentColor: '#0f4ea9',
                      touchAction: 'manipulation'
                    }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    {t('wizard.step5.openToOvertime')}
                  </span>
                </label>
                <label className="wizardCheck" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 12px',
                  minHeight: '44px',
                  borderRadius: '8px',
                  border: '1px solid rgba(18, 38, 63, 0.08)',
                  background: 'white',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none'
                }}>
                  <input
                    type="checkbox"
                    checked={!!(data.payPrefs?.weekends || false)}
                    onChange={togglePayPref('weekends')}
                    style={{
                      width: '22px',
                      height: '22px',
                      minWidth: '22px',
                      cursor: 'pointer',
                      accentColor: '#0f4ea9',
                      touchAction: 'manipulation'
                    }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    {t('wizard.step5.availableWeekends')}
                  </span>
                </label>
              </div>
              {availabilityError && <div className="field-error" style={{ 
                color: '#dc2626', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                ⚠️ {availabilityError}
              </div>}
            </div>
          </div>
        </div>

        {/* Row 2: Travel Radius + Willingness to Travel */}
        <div className="wizardSection" style={{ marginBottom: '24px' }}>
          <div className="wizardGrid2" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '20px',
            alignItems: 'flex-start'
          }}>
            {/* Travel Radius - Custom Slider */}
            <div>
              <div className="wizardSectionBar" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#17263a',
                marginBottom: '8px'
              }}>
                {t('wizard.step5.travelRadius')}
              </div>
              <div style={{ marginTop: '4px', maxWidth: '100%' }}>
                {/* Custom slider container */}
                <div style={{ 
                  position: 'relative', 
                  padding: '12px 0',
                  touchAction: 'none'
                }}>
                  {/* Track background */}
                  <div style={{
                    position: 'relative',
                    height: '8px',
                    background: '#e5e7eb',
                    borderRadius: '999px',
                    cursor: 'pointer',
                    touchAction: 'none'
                  }}>
                    {/* Fill */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      height: '100%',
                      width: `${sliderPercentage}%`,
                      background: '#0f4ea9',
                      borderRadius: '999px',
                      pointerEvents: 'none',
                      transition: 'width 0.05s ease',
                    }} />
                    
                    {/* Slider input (invisible but functional) */}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={currentRadius}
                      onChange={handleSliderChange}
                      style={{
                        position: 'absolute',
                        top: '-8px',
                        left: '-4px',
                        width: 'calc(100% + 8px)',
                        height: '28px',
                        opacity: 0,
                        cursor: 'pointer',
                        zIndex: 2,
                        margin: 0,
                        padding: 0,
                        touchAction: 'none',
                        WebkitAppearance: 'none',
                        appearance: 'none'
                      }}
                    />
                    
                    {/* Custom thumb (positioned based on value) */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: `${sliderPercentage}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: '#0f4ea9',
                      border: '3px solid white',
                      boxShadow: '0 2px 8px rgba(15, 78, 169, 0.4)',
                      pointerEvents: 'none',
                      zIndex: 1,
                      transition: 'left 0.05s ease',
                    }} />
                  </div>

                  {/* Value display */}
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '16px'
                  }}>
                    <span style={{ 
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#0f4ea9',
                      background: 'rgba(15, 78, 169, 0.08)',
                      padding: '6px 20px',
                      borderRadius: '8px',
                      minHeight: '36px',
                      display: 'flex',
                      alignItems: 'center'
                    }}>
                      {currentRadius} {t('wizard.step5.miles')}
                    </span>
                  </div>

                  {/* Tick marks */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '12px', 
                    color: 'rgba(23, 38, 58, 0.4)',
                    marginTop: '6px',
                    padding: '0 2px'
                  }}>
                    <span>0</span>
                    <span>25</span>
                    <span>50</span>
                    <span>75</span>
                    <span>100</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Willingness to Travel */}
            <div>
              <div className="wizardSectionBar" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#17263a',
                marginBottom: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {t('wizard.step5.willingToTravel')} <span style={{ color: '#dc2626' }}>*</span>
              </div>
              <div style={{ 
                display: 'flex', 
                gap: '16px', 
                flexWrap: 'wrap', 
                marginTop: '4px' 
              }}>
                <label className="wizardCheck" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  minHeight: '44px',
                  borderRadius: '8px',
                  border: data.willingToTravel === 'yes' ? '2px solid #0f4ea9' : '1px solid rgba(18, 38, 63, 0.08)',
                  background: data.willingToTravel === 'yes' ? 'rgba(15, 78, 169, 0.05)' : 'white',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  transition: 'all 0.2s ease'
                }}>
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="yes"
                    checked={data.willingToTravel === 'yes'}
                    onChange={() => handleWillingToTravelChange('yes')}
                    style={{
                      width: '22px',
                      height: '22px',
                      minWidth: '22px',
                      cursor: 'pointer',
                      accentColor: '#0f4ea9',
                      touchAction: 'manipulation'
                    }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    {t('wizard.step5.yes')}
                  </span>
                </label>
                <label className="wizardCheck" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  minHeight: '44px',
                  borderRadius: '8px',
                  border: data.willingToTravel === 'no' ? '2px solid #0f4ea9' : '1px solid rgba(18, 38, 63, 0.08)',
                  background: data.willingToTravel === 'no' ? 'rgba(15, 78, 169, 0.05)' : 'white',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  transition: 'all 0.2s ease'
                }}>
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="no"
                    checked={data.willingToTravel === 'no'}
                    onChange={() => handleWillingToTravelChange('no')}
                    style={{
                      width: '22px',
                      height: '22px',
                      minWidth: '22px',
                      cursor: 'pointer',
                      accentColor: '#0f4ea9',
                      touchAction: 'manipulation'
                    }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    {t('wizard.step5.no')}
                  </span>
                </label>
              </div>
              {willingToTravelError && <div className="field-error" style={{ 
                color: '#dc2626', 
                fontSize: '12px', 
                marginTop: '4px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                ⚠️ {willingToTravelError}
              </div>}
            </div>
          </div>
        </div>

        {/* Travel Preferences - Only show if "Yes" is selected */}
        {data.willingToTravel === 'yes' && (
          <div className="wizardSection" style={{ marginBottom: '24px' }}>
            <div style={{ 
              padding: '16px 20px',
              border: '1px solid rgba(15, 78, 169, 0.2)',
              borderRadius: '12px',
              background: 'rgba(15, 78, 169, 0.03)',
            }}>
              <div style={{ 
                fontSize: '14px', 
                fontWeight: 500, 
                color: '#17263a',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                {t('wizard.step5.travelPreferences')} <span style={{ color: '#dc2626' }}>*</span>
              </div>
              <div style={{ 
                display: 'flex', 
                gap: '12px', 
                flexWrap: 'wrap',
                flexDirection: 'column'
              }}>
                <label className="wizardCheck" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '10px 16px',
                  minHeight: '44px',
                  borderRadius: '8px',
                  border: '1px solid rgba(18, 38, 63, 0.08)',
                  background: 'white',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  width: '100%'
                }}>
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.housing || false)}
                    onChange={toggleTravelPref('housing')}
                    style={{
                      width: '22px',
                      height: '22px',
                      minWidth: '22px',
                      cursor: 'pointer',
                      accentColor: '#0f4ea9',
                      touchAction: 'manipulation'
                    }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    {t('wizard.step5.needsHousing')}
                  </span>
                </label>
                <label className="wizardCheck" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '10px 16px',
                  minHeight: '44px',
                  borderRadius: '8px',
                  border: '1px solid rgba(18, 38, 63, 0.08)',
                  background: 'white',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  width: '100%'
                }}>
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.perDiem || false)}
                    onChange={toggleTravelPref('perDiem')}
                    style={{
                      width: '22px',
                      height: '22px',
                      minWidth: '22px',
                      cursor: 'pointer',
                      accentColor: '#0f4ea9',
                      touchAction: 'manipulation'
                    }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    {t('wizard.step5.needsPerDiem')}
                  </span>
                </label>
                <label className="wizardCheck" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  cursor: 'pointer',
                  padding: '10px 16px',
                  minHeight: '44px',
                  borderRadius: '8px',
                  border: '1px solid rgba(18, 38, 63, 0.08)',
                  background: 'white',
                  touchAction: 'manipulation',
                  WebkitTapHighlightColor: 'transparent',
                  userSelect: 'none',
                  width: '100%'
                }}>
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.transportation || false)}
                    onChange={toggleTravelPref('transportation')}
                    style={{
                      width: '22px',
                      height: '22px',
                      minWidth: '22px',
                      cursor: 'pointer',
                      accentColor: '#0f4ea9',
                      touchAction: 'manipulation'
                    }}
                  />
                  <span style={{ fontSize: '14px' }}>
                    {t('wizard.step5.ownTransportation')}
                  </span>
                </label>
              </div>
              {travelPrefsError && <div className="field-error" style={{ 
                color: '#dc2626', 
                fontSize: '12px', 
                marginTop: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                ⚠️ {travelPrefsError}
              </div>}
            </div>
          </div>
        )}

        {/* Available Days Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar" style={{ 
            fontSize: '14px', 
            fontWeight: 600, 
            color: '#17263a',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {t('wizard.step5.availableDays')} <span style={{ color: '#dc2626' }}>*</span>
          </div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(7, 1fr)', 
            gap: '8px',
            marginTop: '8px'
          }}>
            {daysOfWeek.map((day) => (
              <label key={day} className="wizardCheck" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: '6px',
                padding: '10px 4px',
                minHeight: '64px',
                border: '1px solid rgba(18, 38, 63, 0.08)',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                touchAction: 'manipulation',
                WebkitTapHighlightColor: 'transparent',
                userSelect: 'none',
                borderColor: data.availability?.[day.toLowerCase()] ? '#0f4ea9' : 'rgba(18, 38, 63, 0.08)',
                background: data.availability?.[day.toLowerCase()] ? 'rgba(15, 78, 169, 0.05)' : 'white'
              }}>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 500, 
                  color: 'rgba(23, 38, 58, 0.6)',
                  textTransform: 'uppercase',
                  textAlign: 'center'
                }}>
                  {t(`wizard.step5.days.${day.toLowerCase()}`)}
                </span>
                <input
                  type="checkbox"
                  checked={!!(data.availability?.[day.toLowerCase()] || false)}
                  onChange={handleDayToggle(day.toLowerCase())}
                  style={{
                    width: '22px',
                    height: '22px',
                    minWidth: '22px',
                    cursor: 'pointer',
                    accentColor: '#0f4ea9',
                    touchAction: 'manipulation'
                  }}
                />
              </label>
            ))}
          </div>
          {availableDaysError && <div className="field-error" style={{ 
            color: '#dc2626', 
            fontSize: '12px', 
            marginTop: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            ⚠️ {availableDaysError}
          </div>}
        </div>
      </div>

      {/* ✅ Footer with Back and Next buttons */}
      <div className="wizardFooter" style={{
        position: 'sticky',
        bottom: 0,
        zIndex: 10,
        background: 'white',
        padding: '16px 20px',
        borderTop: '1px solid rgba(18, 38, 63, 0.06)',
        boxShadow: '0 -2px 8px rgba(0, 0, 0, 0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '24px',
        borderBottomLeftRadius: '12px',
        borderBottomRightRadius: '12px',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <button 
          type="button" 
          onClick={onBack}
          style={{
            padding: '12px 24px',
            minHeight: '48px',
            borderRadius: '8px',
            background: 'transparent',
            color: '#17263a',
            border: '1px solid rgba(18, 38, 63, 0.12)',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: '16px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            flex: '1',
            minWidth: '120px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <span>←</span> Back
        </button>

        <button 
          type="button" 
          onClick={handleNext}
          style={{
            padding: '12px 24px',
            minHeight: '48px',
            borderRadius: '8px',
            background: '#0f4ea9',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '16px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            touchAction: 'manipulation',
            WebkitTapHighlightColor: 'transparent',
            flex: '1',
            minWidth: '120px',
            boxShadow: '0 2px 8px rgba(15, 78, 169, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0b3f90'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#0f4ea9'
          }}
          onTouchStart={(e) => {
            e.currentTarget.style.background = '#0b3f90'
          }}
          onTouchEnd={(e) => {
            e.currentTarget.style.background = '#0f4ea9'
          }}
        >
          Continue <span>→</span>
        </button>
      </div>

      {/* CSS styles for error messages and responsiveness */}
      <style>{`
        /* Global touch optimizations */
        * {
          -webkit-tap-highlight-color: transparent;
        }

        .field-error {
          color: #dc2626;
          font-size: 12px;
          margin-top: 4px;
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

        .error-text {
          color: #dc2626;
          font-size: 12px;
          margin-top: 4px;
        }

        /* Custom slider styles for better mobile support */
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          touch-action: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #0f4ea9;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(15, 78, 169, 0.3);
        }

        input[type="range"]::-moz-range-thumb {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #0f4ea9;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(15, 78, 169, 0.3);
        }

        /* Checkbox and radio touch improvements */
        input[type="checkbox"],
        input[type="radio"] {
          touch-action: manipulation;
        }

        /* ✅ Mobile Responsive Styles */
        @media (max-width: 768px) {
          .wizardStep .wizardBody {
            padding: 16px !important;
          }

          /* Grid 2 columns - stack on mobile */
          .wizardGrid2 {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }

          /* Hourly rate input - full width on mobile */
          .wizardStep .wizardSection div[style*="max-width: 200px"] {
            max-width: 100% !important;
          }

          /* Availability checkboxes - stack on mobile */
          .wizardStep .wizardSection div[style*="gap: 16px"] {
            gap: 12px !important;
          }

          .wizardStep .wizardSection div[style*="gap: 16px"] label {
            width: 100% !important;
          }

          /* Travel radius - full width on mobile */
          .wizardStep .wizardSection div[style*="max-width: 70%"] {
            max-width: 100% !important;
          }

          /* Willingness to travel radio buttons - stack on mobile */
          .wizardStep .wizardSection div[style*="gap: 16px"] {
            gap: 12px !important;
          }

          .wizardStep .wizardSection div[style*="gap: 16px"] label {
            width: 100% !important;
          }

          /* Travel preferences - stack on mobile */
          .wizardStep .wizardSection div[style*="flex-direction: column"] label {
            width: 100% !important;
          }

          /* Available days grid - responsive */
          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] {
            grid-template-columns: repeat(4, 1fr) !important;
            gap: 8px !important;
          }

          /* Day labels - smaller on mobile */
          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label {
            padding: 8px 4px !important;
            min-height: 56px !important;
          }

          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label span {
            font-size: 10px !important;
          }

          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label input {
            width: 20px !important;
            height: 20px !important;
            min-width: 20px !important;
          }

          /* Travel preferences container */
          .wizardStep .wizardSection div[style*="padding: 16px 20px"] {
            padding: 14px 16px !important;
          }

          /* Section bars - smaller on mobile */
          .wizardSectionBar {
            font-size: 14px !important;
          }

          /* Footer - stack on mobile */
          .wizardFooter {
            flex-direction: column !important;
            gap: 12px !important;
            padding: 16px !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
          }

          .wizardFooter button {
            width: 100% !important;
            min-height: 48px !important;
            font-size: 16px !important;
          }

          /* Slider value display */
          .wizardStep .wizardSection div[style*="padding: 6px 20px"] {
            font-size: 14px !important;
            padding: 4px 16px !important;
            min-height: 32px !important;
          }

          /* Tick marks */
          .wizardStep .wizardSection div[style*="font-size: 12px"] {
            font-size: 10px !important;
          }

          /* Slider thumb */
          .wizardStep .wizardSection div[style*="width: 28px"][style*="height: 28px"] {
            width: 24px !important;
            height: 24px !important;
          }

          /* Error messages */
          .field-error {
            font-size: 12px !important;
          }

          /* Text field */
          .wizardStep .wizardSection .fieldControl {
            height: 44px !important;
          }

          .wizardStep .wizardSection .fieldInput {
            font-size: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .wizardStep .wizardBody {
            padding: 12px !important;
          }

          /* Available days grid - 3 columns on very small screens */
          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 6px !important;
          }

          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label {
            padding: 6px 2px !important;
            min-height: 48px !important;
          }

          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label span {
            font-size: 9px !important;
          }

          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label input {
            width: 18px !important;
            height: 18px !important;
            min-width: 18px !important;
          }

          /* Travel preferences - more compact */
          .wizardStep .wizardSection div[style*="padding: 16px 20px"] {
            padding: 12px 14px !important;
          }

          .wizardStep .wizardSection div[style*="font-size: 14px"][style*="font-weight: 500"] {
            font-size: 13px !important;
          }

          /* Section bars */
          .wizardSectionBar {
            font-size: 13px !important;
          }

          /* Footer - more compact */
          .wizardFooter {
            padding: 12px !important;
          }

          .wizardFooter button {
            font-size: 15px !important;
            padding: 12px 16px !important;
            min-height: 44px !important;
          }

          /* Slider value display */
          .wizardStep .wizardSection div[style*="padding: 6px 20px"] {
            font-size: 13px !important;
            padding: 3px 12px !important;
            min-height: 28px !important;
          }

          /* Tick marks */
          .wizardStep .wizardSection div[style*="font-size: 12px"] {
            font-size: 9px !important;
          }

          /* Slider thumb */
          .wizardStep .wizardSection div[style*="width: 28px"][style*="height: 28px"] {
            width: 20px !important;
            height: 20px !important;
          }

          /* Field error */
          .field-error {
            font-size: 11px !important;
          }

          /* Hourly rate input */
          .wizardStep .wizardSection .fieldControl {
            height: 40px !important;
          }

          .wizardStep .wizardSection .fieldInput {
            font-size: 15px !important;
          }
        }

        @media (max-width: 380px) {
          /* Available days grid - 2 columns on very small screens */
          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 4px !important;
          }

          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label {
            padding: 4px 2px !important;
            min-height: 40px !important;
          }

          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label span {
            font-size: 8px !important;
          }

          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] label input {
            width: 16px !important;
            height: 16px !important;
            min-width: 16px !important;
          }
        }

        /* Tablet optimization */
        @media (min-width: 769px) and (max-width: 1024px) {
          /* Available days grid - 4 columns on tablet */
          .wizardStep .wizardSection div[style*="grid-template-columns: repeat(7, 1fr)"] {
            grid-template-columns: repeat(4, 1fr) !important;
          }

          /* Travel preferences - wrap nicely */
          .wizardStep .wizardSection div[style*="gap: 20px"] {
            gap: 16px !important;
          }
        }

        /* Prevent zoom on input focus for iOS */
        @supports (-webkit-touch-callout: none) {
          input, select, textarea {
            font-size: 16px !important;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .wizardStep .wizardSection div[style*="background: white"] {
            background: #1a1a1a !important;
          }
          
          .wizardStep .wizardSection div[style*="background: rgba(15, 78, 169, 0.05)"] {
            background: rgba(15, 78, 169, 0.15) !important;
          }
          
          .wizardStep .wizardSection div[style*="border-color: rgba(18, 38, 63, 0.08)"] {
            border-color: rgba(255, 255, 255, 0.08) !important;
          }
          
          .wizardStep .wizardSection div[style*="color: #17263a"] {
            color: #e5e7eb !important;
          }
          
          .wizardStep .wizardSection div[style*="color: rgba(23, 38, 58, 0.6)"] {
            color: rgba(255, 255, 255, 0.6) !important;
          }
          
          .wizardFooter {
            background: #1a1a1a !important;
          }
          
          .wizardStep .wizardSection div[style*="background: white"][style*="min-height: 44px"] {
            background: #1a1a1a !important;
          }
        }
      `}</style>
    </div>
  )
}

export default WizardStep5