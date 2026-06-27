// // src/worker/components/wizard-steps/WizardStep4.jsx
// import { TextField } from '../../../common/components/TextField'
// import { IconFolder, IconSupport, IconLocation, IconUser } from '../../../common/components/Icons'

// export function WizardStep4({ data, onChange, onNext, onBack }) {
//   const updateProjectField = (index, key) => (value) => {
//     const projects = [...(data.projects || [])]
//     projects[index] = { ...projects[index], [key]: value }
//     onChange({ ...data, projects })
//   }

//   const projects = data.projects || [
//     { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//     { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
//   ]

//   return (
//     <div className="wizardStep">
//       <div className="wizardBody">
//         <div className="wizardSection">
//           <div className="wizardSectionBar">Recent Projects (Last 3 to 5 Relevant Projects)</div>
//           <div className="wizardProjectList">
//             {[0, 1].map((idx) => (
//               <div key={idx} className="wizardProjectCard">
//                 <div className="wizardProjectTitle">Project {idx + 1}</div>
//                 <div className="wizardGrid2">
//                   <TextField
//                     placeholder="Project name"
//                     icon={<IconFolder />}
//                     value={projects[idx]?.name || ''}
//                     onChange={updateProjectField(idx, 'name')}
//                   />
//                   <TextField
//                     placeholder="Client / GC"
//                     icon={<IconSupport />}
//                     value={projects[idx]?.client || ''}
//                     onChange={updateProjectField(idx, 'client')}
//                   />
//                 </div>

//                 <div className="wizardGrid4">
//                   <TextField
//                     placeholder="City"
//                     icon={<IconLocation />}
//                     value={projects[idx]?.city || ''}
//                     onChange={updateProjectField(idx, 'city')}
//                   />
//                   <TextField
//                     placeholder="State"
//                     icon={<IconLocation />}
//                     value={projects[idx]?.state || ''}
//                     onChange={updateProjectField(idx, 'state')}
//                   />
//                   <TextField
//                     placeholder="Role"
//                     icon={<IconUser />}
//                     value={projects[idx]?.role || ''}
//                     onChange={updateProjectField(idx, 'role')}
//                   />
//                   <TextField
//                     placeholder="Trade"
//                     icon={<IconSupport />}
//                     value={projects[idx]?.trade || ''}
//                     onChange={updateProjectField(idx, 'trade')}
//                   />
//                 </div>

//                 <div className="wizardGrid2">
//                   <TextField
//                     placeholder="Start date"
//                     icon={<IconSupport />}
//                     value={projects[idx]?.start || ''}
//                     onChange={updateProjectField(idx, 'start')}
//                   />
//                   <TextField
//                     placeholder="End date"
//                     icon={<IconSupport />}
//                     value={projects[idx]?.end || ''}
//                     onChange={updateProjectField(idx, 'end')}
//                   />
//                 </div>

//                 <TextField
//                   placeholder="Scope summary"
//                   icon={<IconSupport />}
//                   value={projects[idx]?.scope || ''}
//                   onChange={updateProjectField(idx, 'scope')}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="wizardFooter">
//         <button type="button" className="wizardPillBtn" onClick={onBack}>
//           <span className="wizardPillBtnLabel">Back</span>
//           <span className="wizardPillBtnIcon">←</span>
//         </button>
//         <div className="wizardFooterRight">
//           <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext}>
//             <span className="wizardPillBtnLabel">Next</span>
//             <span className="wizardPillBtnIcon">→</span>
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


// src/worker/components/wizard-steps/WizardStep3.jsx
import { useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TextField } from '../../../common/components/TextField'
import { IconFolder, IconSupport, IconLocation, IconUser, IconPhone } from '../../../common/components/Icons'

export function WizardStep3({ data, onChange, onNext, onBack }) {
  const updateProjectField = (index, key) => (value) => {
    const projects = [...(data.projects || [])]
    projects[index] = { ...projects[index], [key]: value }
    onChange({ ...data, projects })
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
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
    { name: '', client: '', city: '', state: '', role: '', trade: '', start: '', end: '', scope: '' },
  ]

  // Custom styles for date picker
  const datePickerStyles = `
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
  `

  return (
    <div className="wizardStep">
      <style>{datePickerStyles}</style>
      
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">Recent Projects (Last 3 to 5 Relevant Projects)</div>
          
          {/* Three project cards in a row */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '16px',
            marginTop: '12px'
          }}>
            {/* Project 1 */}
            <div className="wizardProjectCard" style={{ 
              padding: '16px', 
              border: '1px solid rgba(18, 38, 63, 0.08)',
              borderRadius: '12px',
              background: 'white'
            }}>
              <div className="wizardProjectTitle" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#0f4ea9',
                marginBottom: '12px'
              }}>
                Project 1
              </div>
              
              <TextField
                placeholder="Project Name"
                icon={<IconFolder />}
                value={projects[0]?.name || ''}
                onChange={updateProjectField(0, 'name')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Client / GC"
                icon={<IconSupport />}
                value={projects[0]?.client || ''}
                onChange={updateProjectField(0, 'client')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Phone Number"
                icon={<IconPhone />}
                value={projects[0]?.phone || ''}
                onChange={updateProjectField(0, 'phone')}
                style={{ marginBottom: '8px' }}
              />
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <TextField
                  placeholder="Trade"
                  icon={<IconSupport />}
                  value={projects[0]?.trade || ''}
                  onChange={updateProjectField(0, 'trade')}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="Role"
                  icon={<IconUser />}
                  value={projects[0]?.role || ''}
                  onChange={updateProjectField(0, 'role')}
                  style={{ flex: 1 }}
                />
              </div>
              
              {/* Start and End Date with Calendar Picker */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div className="date-picker-wrapper custom-date-picker" style={{ flex: 1 }}>
                  <DatePicker
                    selected={parseDate(projects[0]?.start || '')}
                    onChange={handleDateChange(0, 'start')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Start"
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    className="date-picker-input"
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
                <div className="date-picker-wrapper custom-date-picker" style={{ flex: 1 }}>
                  <DatePicker
                    selected={parseDate(projects[0]?.end || '')}
                    onChange={handleDateChange(0, 'end')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="End"
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    className="date-picker-input"
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
              
              {/* Scope Summary as TextArea */}
              <div style={{ marginBottom: '8px' }}>
                <textarea
                  className="wizardTextArea"
                  placeholder="Scope Summary"
                  value={projects[0]?.scope || ''}
                  onChange={(e) => updateProjectField(0, 'scope')(e.target.value)}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid rgba(18, 38, 63, 0.12)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: 'white',
                    color: '#17263a',
                    minHeight: '40px',
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
                  fontSize: '10px', 
                  color: 'rgba(23, 38, 58, 0.5)', 
                  marginTop: '2px',
                  textAlign: 'right'
                }}>
                  {(projects[0]?.scope?.length || 0)} characters
                </div>
              </div>
              
              <button
                type="button"
                className="btn btnPrimary"
                style={{
                  width: '100%',
                  padding: '6px 12px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  background: '#0f4ea9',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() => {
                  console.log('Save Project 1')
                }}
              >
                Save Project
              </button>
            </div>

            {/* Project 2 */}
            <div className="wizardProjectCard" style={{ 
              padding: '16px', 
              border: '1px solid rgba(18, 38, 63, 0.08)',
              borderRadius: '12px',
              background: 'white'
            }}>
              <div className="wizardProjectTitle" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#0f4ea9',
                marginBottom: '12px'
              }}>
                Project 2
              </div>
              
              <TextField
                placeholder="Project Name"
                icon={<IconFolder />}
                value={projects[1]?.name || ''}
                onChange={updateProjectField(1, 'name')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Client / GC"
                icon={<IconSupport />}
                value={projects[1]?.client || ''}
                onChange={updateProjectField(1, 'client')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Phone Number"
                icon={<IconPhone />}
                value={projects[1]?.phone || ''}
                onChange={updateProjectField(1, 'phone')}
                style={{ marginBottom: '8px' }}
              />
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <TextField
                  placeholder="Trade"
                  icon={<IconSupport />}
                  value={projects[1]?.trade || ''}
                  onChange={updateProjectField(1, 'trade')}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="Role"
                  icon={<IconUser />}
                  value={projects[1]?.role || ''}
                  onChange={updateProjectField(1, 'role')}
                  style={{ flex: 1 }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div className="date-picker-wrapper custom-date-picker" style={{ flex: 1 }}>
                  <DatePicker
                    selected={parseDate(projects[1]?.start || '')}
                    onChange={handleDateChange(1, 'start')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Start"
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    className="date-picker-input"
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
                <div className="date-picker-wrapper custom-date-picker" style={{ flex: 1 }}>
                  <DatePicker
                    selected={parseDate(projects[1]?.end || '')}
                    onChange={handleDateChange(1, 'end')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="End"
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    className="date-picker-input"
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
              
              <div style={{ marginBottom: '8px' }}>
                <textarea
                  className="wizardTextArea"
                  placeholder="Scope Summary"
                  value={projects[1]?.scope || ''}
                  onChange={(e) => updateProjectField(1, 'scope')(e.target.value)}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid rgba(18, 38, 63, 0.12)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: 'white',
                    color: '#17263a',
                    minHeight: '40px',
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
                  fontSize: '10px', 
                  color: 'rgba(23, 38, 58, 0.5)', 
                  marginTop: '2px',
                  textAlign: 'right'
                }}>
                  {(projects[1]?.scope?.length || 0)} characters
                </div>
              </div>
              
              <button
                type="button"
                className="btn btnPrimary"
                style={{
                  width: '100%',
                  padding: '6px 12px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  background: '#0f4ea9',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() => {
                  console.log('Save Project 2')
                }}
              >
                Save Project
              </button>
            </div>

            {/* Project 3 */}
            <div className="wizardProjectCard" style={{ 
              padding: '16px', 
              border: '1px solid rgba(18, 38, 63, 0.08)',
              borderRadius: '12px',
              background: 'white'
            }}>
              <div className="wizardProjectTitle" style={{ 
                fontSize: '14px', 
                fontWeight: 600, 
                color: '#0f4ea9',
                marginBottom: '12px'
              }}>
                Project 3
              </div>
              
              <TextField
                placeholder="Project Name"
                icon={<IconFolder />}
                value={projects[2]?.name || ''}
                onChange={updateProjectField(2, 'name')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Client / GC"
                icon={<IconSupport />}
                value={projects[2]?.client || ''}
                onChange={updateProjectField(2, 'client')}
                style={{ marginBottom: '8px' }}
              />
              
              <TextField
                placeholder="Phone Number"
                icon={<IconPhone />}
                value={projects[2]?.phone || ''}
                onChange={updateProjectField(2, 'phone')}
                style={{ marginBottom: '8px' }}
              />
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <TextField
                  placeholder="Trade"
                  icon={<IconSupport />}
                  value={projects[2]?.trade || ''}
                  onChange={updateProjectField(2, 'trade')}
                  style={{ flex: 1 }}
                />
                <TextField
                  placeholder="Role"
                  icon={<IconUser />}
                  value={projects[2]?.role || ''}
                  onChange={updateProjectField(2, 'role')}
                  style={{ flex: 1 }}
                />
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                <div className="date-picker-wrapper custom-date-picker" style={{ flex: 1 }}>
                  <DatePicker
                    selected={parseDate(projects[2]?.start || '')}
                    onChange={handleDateChange(2, 'start')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="Start"
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    className="date-picker-input"
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
                <div className="date-picker-wrapper custom-date-picker" style={{ flex: 1 }}>
                  <DatePicker
                    selected={parseDate(projects[2]?.end || '')}
                    onChange={handleDateChange(2, 'end')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="End"
                    maxDate={new Date()}
                    showYearDropdown
                    showMonthDropdown
                    dropdownMode="select"
                    yearDropdownItemNumber={100}
                    scrollableYearDropdown
                    className="date-picker-input"
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
              
              <div style={{ marginBottom: '8px' }}>
                <textarea
                  className="wizardTextArea"
                  placeholder="Scope Summary"
                  value={projects[2]?.scope || ''}
                  onChange={(e) => updateProjectField(2, 'scope')(e.target.value)}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid rgba(18, 38, 63, 0.12)',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: 'white',
                    color: '#17263a',
                    minHeight: '40px',
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
                  fontSize: '10px', 
                  color: 'rgba(23, 38, 58, 0.5)', 
                  marginTop: '2px',
                  textAlign: 'right'
                }}>
                  {(projects[2]?.scope?.length || 0)} characters
                </div>
              </div>
              
              <button
                type="button"
                className="btn btnPrimary"
                style={{
                  width: '100%',
                  padding: '6px 12px',
                  fontSize: '12px',
                  borderRadius: '8px',
                  background: '#0f4ea9',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: 600
                }}
                onClick={() => {
                  console.log('Save Project 3')
                }}
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="wizardFooter">
        <button type="button" className="wizardPillBtn" onClick={onBack}>
          <span className="wizardPillBtnLabel">Back</span>
          <span className="wizardPillBtnIcon">←</span>
        </button>
        <div className="wizardFooterRight">
          <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext}>
            <span className="wizardPillBtnLabel">Next</span>
            <span className="wizardPillBtnIcon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}