
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

  // ✅ Handle Next button click with validation
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
    <div className="wizardStep">
      <div className="wizardBody">
        {/* Row 1: Hourly Rate + Availability */}
        <div className="wizardSection">
          <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
            {/* Hourly Rate */}
            <div>
              <div className="wizardSectionBar">{t('wizard.step5.hourlyRate')} <span style={{ color: '#dc2626' }}>*</span></div>
              <div style={{ maxWidth: '200px' }}>
                <TextField
                  placeholder="$$"
                  icon={<IconSupport />}
                  value={data.hourlyRate || ''}
                  onChange={(v) => handleChange('hourlyRate', v)}
                  className={hourlyRateError ? 'field-error-input' : ''}
                />
                {hourlyRateError && <div className="field-error">⚠️ {hourlyRateError}</div>}
              </div>
            </div>

            {/* Availability */}
            <div>
              <div className="wizardSectionBar">{t('wizard.step5.availability')} <span style={{ color: '#dc2626' }}>*</span></div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.payPrefs?.overtime || false)}
                    onChange={togglePayPref('overtime')}
                  />
                  {t('wizard.step5.openToOvertime')}
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.payPrefs?.weekends || false)}
                    onChange={togglePayPref('weekends')}
                  />
                  {t('wizard.step5.availableWeekends')}
                </label>
              </div>
              {availabilityError && <div className="field-error">⚠️ {availabilityError}</div>}
            </div>
          </div>
        </div>

        {/* Row 2: Travel Radius + Willingness to Travel */}
        <div className="wizardSection">
          <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
            {/* Travel Radius - Custom Slider with 70% width */}
            <div>
              <div className="wizardSectionBar">{t('wizard.step5.travelRadius')}</div>
              <div style={{ marginTop: '4px', maxWidth: '70%' }}>
                {/* Custom slider container */}
                <div style={{ position: 'relative', padding: '8px 0' }}>
                  {/* Track background */}
                  <div style={{
                    position: 'relative',
                    height: '6px',
                    background: '#e5e7eb',
                    borderRadius: '999px',
                    cursor: 'pointer',
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
                        height: '22px',
                        opacity: 0,
                        cursor: 'pointer',
                        zIndex: 2,
                        margin: 0,
                        padding: 0,
                      }}
                    />
                    
                    {/* Custom thumb (positioned based on value) */}
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: `${sliderPercentage}%`,
                      transform: 'translate(-50%, -50%)',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: '#0f4ea9',
                      border: '2px solid white',
                      boxShadow: '0 2px 6px rgba(15, 78, 169, 0.3)',
                      pointerEvents: 'none',
                      zIndex: 1,
                      transition: 'left 0.05s ease',
                    }} />
                  </div>

                  {/* Value display */}
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '12px'
                  }}>
                    <span style={{ 
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#0f4ea9',
                      background: 'rgba(15, 78, 169, 0.08)',
                      padding: '4px 16px',
                      borderRadius: '6px',
                    }}>
                      {currentRadius} {t('wizard.step5.miles')}
                    </span>
                  </div>

                  {/* Tick marks */}
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    fontSize: '11px', 
                    color: 'rgba(23, 38, 58, 0.4)',
                    marginTop: '4px',
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
              <div className="wizardSectionBar">{t('wizard.step5.willingToTravel')} <span style={{ color: '#dc2626' }}>*</span></div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="yes"
                    checked={data.willingToTravel === 'yes'}
                    onChange={() => handleWillingToTravelChange('yes')}
                  />
                  {t('wizard.step5.yes')}
                </label>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="no"
                    checked={data.willingToTravel === 'no'}
                    onChange={() => handleWillingToTravelChange('no')}
                  />
                  {t('wizard.step5.no')}
                </label>
              </div>
              {willingToTravelError && <div className="field-error">⚠️ {willingToTravelError}</div>}
            </div>
          </div>
        </div>

        {/* Travel Preferences - Only show if "Yes" is selected */}
        {data.willingToTravel === 'yes' && (
          <div className="wizardSection">
            <div style={{ 
              padding: '16px 20px',
              border: '1px solid rgba(15, 78, 169, 0.2)',
              borderRadius: '12px',
              background: 'rgba(15, 78, 169, 0.03)',
            }}>
              <div style={{ 
                fontSize: '13px', 
                fontWeight: 500, 
                color: '#17263a',
                marginBottom: '10px'
              }}>
                {t('wizard.step5.travelPreferences')} <span style={{ color: '#dc2626' }}>*</span>
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.housing || false)}
                    onChange={toggleTravelPref('housing')}
                  />
                  {t('wizard.step5.needsHousing')}
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.perDiem || false)}
                    onChange={toggleTravelPref('perDiem')}
                  />
                  {t('wizard.step5.needsPerDiem')}
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.transportation || false)}
                    onChange={toggleTravelPref('transportation')}
                  />
                  {t('wizard.step5.ownTransportation')}
                </label>
              </div>
              {travelPrefsError && <div className="field-error">⚠️ {travelPrefsError}</div>}
            </div>
          </div>
        )}

        {/* Available Days Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">{t('wizard.step5.availableDays')} <span style={{ color: '#dc2626' }}>*</span></div>
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
                gap: '4px',
                padding: '8px 4px',
                border: '1px solid rgba(18, 38, 63, 0.08)',
                borderRadius: '8px',
                background: 'white',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                <span style={{ 
                  fontSize: '11px', 
                  fontWeight: 500, 
                  color: 'rgba(23, 38, 58, 0.6)',
                  textTransform: 'uppercase'
                }}>
                  {t(`wizard.step5.days.${day.toLowerCase()}`)}
                </span>
                <input
                  type="checkbox"
                  checked={!!(data.availability?.[day.toLowerCase()] || false)}
                  onChange={handleDayToggle(day.toLowerCase())}
                  style={{
                    width: '18px',
                    height: '18px',
                    cursor: 'pointer',
                    accentColor: '#0f4ea9'
                  }}
                />
              </label>
            ))}
          </div>
          {availableDaysError && <div className="field-error">⚠️ {availableDaysError}</div>}
        </div>
      </div>

      {/* Footer with Back and Next buttons */}
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
        alignItems: 'center',
        marginTop: '20px'
      }}>
        <button 
          type="button" 
          className="wizardPillBtn" 
          onClick={onBack}
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
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <span>← {t('common.back') || 'Back'}</span>
        </button>

        <button 
          type="button" 
          className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" 
          onClick={handleNext}
          style={{
            padding: '8px 24px',
            borderRadius: '8px',
            background: '#0f4ea9',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '14px',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0b3f90'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#0f4ea9'
          }}
        >
          <span>{t('common.next') || 'Next'}</span>
          <span>→</span>
        </button>
      </div>

      {/* CSS styles for error messages */}
      <style>{`
        .field-error {
          color: #dc2626;
          font-size: 11px;
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
      `}</style>
    </div>
  )
}

export default WizardStep5