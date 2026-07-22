// // src/worker/components/wizard-steps/WizardStep4.jsx
// import { useState } from 'react'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

// export function WizardStep4({ data, onChange, onNext, onBack }) {
//   const handleChange = (field, value) => {
//     onChange({ ...data, [field]: value })
//   }

//   const toggleMapValue = (key, setMap) => (e) => {
//     const current = data[key] || {}
//     setMap({ ...current, [key]: e.target.checked })
//   }

//   const setPayPrefs = (prefs) => handleChange('payPrefs', prefs)
//   const setTravelPrefs = (prefs) => handleChange('travelPrefs', prefs)
//   const setAvailability = (availability) => handleChange('availability', availability)

//   // Handle slider change for travel radius
//   const handleSliderChange = (e) => {
//     const value = Number(e.target.value)
//     handleChange('travelRadius', value)
//   }

//   // Handle availability day toggle
//   const handleDayToggle = (day) => (e) => {
//     const current = data.availability || {}
//     setAvailability({
//       ...current,
//       [day]: e.target.checked
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
//               <div className="wizardSectionBar">Hourly Rate</div>
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
//               <div className="wizardSectionBar">Availability</div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.overtime || false)}
//                     onChange={toggleMapValue('overtime', setPayPrefs)}
//                   />
//                   Open to overtime
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.weekends || false)}
//                     onChange={toggleMapValue('weekends', setPayPrefs)}
//                   />
//                   Available on weekends
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
//               <div className="wizardSectionBar">Travel Radius</div>
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
//                       {currentRadius} miles
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
//               <div className="wizardSectionBar">Willingness to Travel</div>
//               <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="yes"
//                     checked={data.willingToTravel === 'yes'}
//                     onChange={() => {
//                       handleChange('willingToTravel', 'yes')
//                     }}
//                   />
//                   Yes
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="no"
//                     checked={data.willingToTravel === 'no'}
//                     onChange={() => {
//                       handleChange('willingToTravel', 'no')
//                       handleChange('travelPrefs', {})
//                     }}
//                   />
//                   No
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
//                 Travel Preferences
//               </div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.housing || false)}
//                     onChange={toggleMapValue('housing', setTravelPrefs)}
//                   />
//                   Needs housing for travel work
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.perDiem || false)}
//                     onChange={toggleMapValue('perDiem', setTravelPrefs)}
//                   />
//                   Needs per diem
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.transportation || false)}
//                     onChange={toggleMapValue('transportation', setTravelPrefs)}
//                   />
//                   Own transportation
//                 </label>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Available Days Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Available</div>
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
//                   {day.slice(0, 3)}
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



// // src/worker/components/wizard-steps/WizardStep4.jsx
// import { useState } from 'react'
// import { TextField } from '../../../common/components/TextField'
// import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

// export function WizardStep4({ data, onChange, onNext, onBack }) {
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
//               <div className="wizardSectionBar">Hourly Rate</div>
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
//               <div className="wizardSectionBar">Availability</div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.overtime || false)}
//                     onChange={togglePayPref('overtime')}
//                   />
//                   Open to overtime
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.payPrefs?.weekends || false)}
//                     onChange={togglePayPref('weekends')}
//                   />
//                   Available on weekends
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
//               <div className="wizardSectionBar">Travel Radius</div>
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
//                       {currentRadius} miles
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
//               <div className="wizardSectionBar">Willingness to Travel</div>
//               <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="yes"
//                     checked={data.willingToTravel === 'yes'}
//                     onChange={() => handleWillingToTravelChange('yes')}
//                   />
//                   Yes
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="radio"
//                     name="willingToTravel"
//                     value="no"
//                     checked={data.willingToTravel === 'no'}
//                     onChange={() => handleWillingToTravelChange('no')}
//                   />
//                   No
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
//                 Travel Preferences
//               </div>
//               <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.housing || false)}
//                     onChange={toggleTravelPref('housing')}
//                   />
//                   Needs housing for travel work
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.perDiem || false)}
//                     onChange={toggleTravelPref('perDiem')}
//                   />
//                   Needs per diem
//                 </label>
//                 <label className="wizardCheck">
//                   <input
//                     type="checkbox"
//                     checked={!!(data.travelPrefs?.transportation || false)}
//                     onChange={toggleTravelPref('transportation')}
//                   />
//                   Own transportation
//                 </label>
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Available Days Section */}
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Available</div>
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
//                   {day.slice(0, 3)}
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












// src/worker/components/wizard-steps/WizardStep4.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

export function WizardStep5({ data, onChange, onNext, onBack }) {
  const { t } = useTranslation()
  
  // ✅ FIX: Handle change - only update specific field
  const handleChange = (field, value) => {
    onChange({ [field]: value })
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
              <div className="wizardSectionBar">{t('wizard.step4.hourlyRate')}</div>
              <div style={{ maxWidth: '200px' }}>
                <TextField
                  placeholder="$$"
                  icon={<IconSupport />}
                  value={data.hourlyRate || ''}
                  onChange={(v) => handleChange('hourlyRate', v)}
                />
              </div>
            </div>

            {/* Availability */}
            <div>
              <div className="wizardSectionBar">{t('wizard.step4.availability')}</div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.payPrefs?.overtime || false)}
                    onChange={togglePayPref('overtime')}
                  />
                  {t('wizard.step4.openToOvertime')}
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.payPrefs?.weekends || false)}
                    onChange={togglePayPref('weekends')}
                  />
                  {t('wizard.step4.availableWeekends')}
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Travel Radius + Willingness to Travel */}
        <div className="wizardSection">
          <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
            {/* Travel Radius - Custom Slider with 70% width */}
            <div>
              <div className="wizardSectionBar">{t('wizard.step4.travelRadius')}</div>
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
                      {currentRadius} {t('wizard.step4.miles')}
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
              <div className="wizardSectionBar">{t('wizard.step4.willingToTravel')}</div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="yes"
                    checked={data.willingToTravel === 'yes'}
                    onChange={() => handleWillingToTravelChange('yes')}
                  />
                  {t('wizard.step4.yes')}
                </label>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="no"
                    checked={data.willingToTravel === 'no'}
                    onChange={() => handleWillingToTravelChange('no')}
                  />
                  {t('wizard.step4.no')}
                </label>
              </div>
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
                {t('wizard.step4.travelPreferences')}
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.housing || false)}
                    onChange={toggleTravelPref('housing')}
                  />
                  {t('wizard.step4.needsHousing')}
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.perDiem || false)}
                    onChange={toggleTravelPref('perDiem')}
                  />
                  {t('wizard.step4.needsPerDiem')}
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.transportation || false)}
                    onChange={toggleTravelPref('transportation')}
                  />
                  {t('wizard.step4.ownTransportation')}
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Available Days Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">{t('wizard.step4.availableDays')}</div>
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
                  {t(`wizard.step4.days.${day.toLowerCase()}`)}
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
        </div>
      </div>
    </div>
  )
}

export default WizardStep5