// src/worker/components/wizard-steps/WizardStep5.jsx
import { useState, useRef } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export function WizardStep5({ data, onChange, onNext, onBack }) {
  const fileInputRefs = useRef({})
  const [openDatePicker, setOpenDatePicker] = useState(null)

  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setCertChecklist = (checklist) => handleChange('certChecklist', checklist)

  const updateCertRow = (index, key) => (value) => {
    const rows = [...(data.certRows || [])]
    rows[index] = { ...rows[index], [key]: value }
    handleChange('certRows', rows)
  }

  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  // Handle file upload
  const handleFileUpload = (index) => (e) => {
    const file = e.target.files[0]
    if (file) {
      updateCertRow(index, 'uploadRef')(file.name)
      console.log(`File uploaded for row ${index}:`, file.name)
    }
  }

  // Trigger file input click
  const triggerFileUpload = (index) => () => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click()
    }
  }

  // Handle date change from react-datepicker
  const handleDateChange = (index, field) => (date) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      updateCertRow(index, field)(`${month}/${day}/${year}`)
    } else {
      updateCertRow(index, field)('')
    }
    setOpenDatePicker(null)
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

  const certRows = data.certRows || [
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
    { name: '', cardNumber: '', issueDate: '', expirationDate: '', uploadRef: '' },
  ]

  // Custom styles for date picker
  const datePickerStyles = `
    .cert-date-picker .react-datepicker__input-container input {
      width: 100%;
      height: 36px;
      padding: 0 8px;
      padding-right: 28px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 6px;
      font-size: 13px;
      outline: none;
      background: white;
      color: #17263a;
      transition: all 0.2s ease;
      font-family: inherit;
      cursor: pointer;
    }

    .cert-date-picker .react-datepicker__input-container input:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .cert-date-picker .react-datepicker__input-container input:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .cert-date-picker .react-datepicker__input-container input::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }

    .cert-date-picker .react-datepicker {
      font-family: inherit;
      border-radius: 12px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
      background: white;
      padding: 8px;
      overflow: hidden;
      font-size: 13px;
    }

    .cert-date-picker .react-datepicker__header {
      background: white;
      border-bottom: 1px solid rgba(18, 38, 63, 0.06);
      padding: 10px 0 6px 0;
      border-radius: 12px 12px 0 0;
    }

    .cert-date-picker .react-datepicker__current-month {
      color: #17263a;
      font-weight: 700;
      font-size: 14px;
      padding-bottom: 4px;
    }

    .cert-date-picker .react-datepicker__day-name {
      color: rgba(23, 38, 58, 0.5);
      font-weight: 600;
      font-size: 11px;
      width: 32px;
      margin: 2px;
    }

    .cert-date-picker .react-datepicker__day {
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

    .cert-date-picker .react-datepicker__day:hover {
      background: rgba(15, 78, 169, 0.08);
      border-radius: 8px;
    }

    .cert-date-picker .react-datepicker__day--selected {
      background: #0f4ea9 !important;
      color: white !important;
      border-radius: 8px;
      font-weight: 600;
    }

    .cert-date-picker .react-datepicker__day--selected:hover {
      background: #0b3f90 !important;
    }

    .cert-date-picker .react-datepicker__day--keyboard-selected {
      background: rgba(15, 78, 169, 0.15);
      border-radius: 8px;
    }

    .cert-date-picker .react-datepicker__day--today {
      font-weight: 700;
      color: #0f4ea9;
    }

    .cert-date-picker .react-datepicker__day--today::after {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: #0f4ea9;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: -2px;
    }

    .cert-date-picker .react-datepicker__day--disabled {
      color: rgba(23, 38, 58, 0.2);
      cursor: not-allowed;
    }

    .cert-date-picker .react-datepicker__navigation {
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

    .cert-date-picker .react-datepicker__navigation:hover {
      background: rgba(15, 78, 169, 0.08);
    }

    .cert-date-picker .react-datepicker__navigation-icon::before {
      border-color: #17263a;
      border-width: 2px 2px 0 0;
      height: 7px;
      width: 7px;
    }

    .cert-date-picker .react-datepicker__day--weekend {
      color: #e11d48;
    }

    .cert-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
      color: white;
    }

    .cert-date-picker .react-datepicker__input-container {
      width: 100%;
    }

    .cert-date-picker .react-datepicker-wrapper {
      width: 100%;
    }

    /* Calendar icon inside the input */
    .cert-date-picker .react-datepicker__input-container {
      position: relative;
    }

    .cert-date-picker .react-datepicker__input-container::after {
      content: '📅';
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      font-size: 14px;
      pointer-events: none;
      opacity: 0.6;
    }

    /* Fix for popper positioning */
    .react-datepicker-popper {
      z-index: 9999 !important;
    }

    .react-datepicker-popper[data-placement^="bottom"] .react-datepicker__triangle {
      display: none;
    }
  `

  // File upload button styles
  const fileUploadStyles = `
    .file-upload-btn {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      background: rgba(15, 78, 169, 0.08);
      color: #0f4ea9;
      border: 1px solid rgba(15, 78, 169, 0.2);
      border-radius: 6px;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      width: 100%;
      justify-content: center;
      white-space: nowrap;
    }

    .file-upload-btn:hover {
      background: rgba(15, 78, 169, 0.15);
      border-color: #0f4ea9;
    }

    .file-upload-btn.has-file {
      background: rgba(47, 180, 99, 0.1);
      border-color: #2fb463;
      color: #2fb463;
    }

    .file-upload-btn .file-name {
      max-width: 80px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  `

  return (
    <div className="wizardStep">
      <style>{datePickerStyles}</style>
      <style>{fileUploadStyles}</style>
      
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">1. Certification Checklist</div>
          <div className="wizardSkillsGrid">
            <div className="wizardSkillCol">
              {['OSHA 10', 'OSHA 30', 'Scissor lift'].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
                  {k}
                </label>
              ))}
            </div>
            <div className="wizardSkillCol">
              {['Boom / aerial lift', 'Forklift / PIT', 'CPR / First Aid'].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
                  {k}
                </label>
              ))}
            </div>
            <div className="wizardSkillCol">
              {['Fall protection', 'HazCom', 'Site-specific orientation'].map((k) => (
                <label key={k} className="wizardCheck">
                  <input type="checkbox" checked={!!(data.certChecklist?.[k] || false)} onChange={toggleMapValue(k, setCertChecklist)} />
                  {k}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">2. Verification Data</div>
          
          {/* Table with fixed column widths */}
          <div style={{ 
            width: '100%', 
            overflowX: 'auto',
            marginTop: '8px',
            position: 'relative'
          }}>
            {/* Header Row */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr',
              gap: '8px',
              padding: '8px 4px',
              borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
              fontWeight: 600,
              fontSize: '13px',
              color: '#17263a',
              minWidth: '700px'
            }}>
              <div>Certification / card name</div>
              <div>Card number / ID</div>
              <div>Issue date</div>
              <div>Expiration date</div>
              <div>Upload / file ref</div>
            </div>

            {/* Data Rows */}
            {certRows.map((row, idx) => (
              <div 
                key={idx} 
                style={{ 
                  display: 'grid', 
                  gridTemplateColumns: '1.5fr 1.2fr 1fr 1fr 1.2fr',
                  gap: '8px',
                  padding: '6px 4px',
                  borderBottom: idx < certRows.length - 1 ? '1px solid rgba(18, 38, 63, 0.06)' : 'none',
                  alignItems: 'center',
                  minWidth: '700px'
                }}
              >
                {/* Certification / card name */}
                <input 
                  className="wizardTableInput" 
                  value={row.name} 
                  onChange={(e) => updateCertRow(idx, 'name')(e.target.value)}
                  placeholder="e.g. OSHA 10"
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    border: '1px solid rgba(18, 38, 63, 0.12)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: 'white',
                    color: '#17263a',
                    boxSizing: 'border-box'
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

                {/* Card number / ID */}
                <input 
                  className="wizardTableInput" 
                  value={row.cardNumber} 
                  onChange={(e) => updateCertRow(idx, 'cardNumber')(e.target.value)}
                  placeholder="Card ID"
                  style={{
                    width: '100%',
                    padding: '6px 10px',
                    border: '1px solid rgba(18, 38, 63, 0.12)',
                    borderRadius: '6px',
                    fontSize: '13px',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    background: 'white',
                    color: '#17263a',
                    boxSizing: 'border-box'
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

                {/* Issue date - Calendar Picker */}
                <div className="cert-date-picker" style={{ width: '100%', position: 'relative' }}>
                  <DatePicker
                    selected={parseDate(row.issueDate)}
                    onChange={handleDateChange(idx, 'issueDate')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="MM/DD/YYYY"
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
                      {
                        name: 'preventOverflow',
                        options: {
                          boundariesElement: 'viewport',
                        },
                      },
                      {
                        name: 'flip',
                        options: {
                          fallbackPlacements: ['top-start', 'bottom-start'],
                        },
                      },
                    ]}
                    onCalendarOpen={() => setOpenDatePicker(`issue-${idx}`)}
                    onCalendarClose={() => setOpenDatePicker(null)}
                  />
                </div>

                {/* Expiration date - Calendar Picker */}
                <div className="cert-date-picker" style={{ width: '100%', position: 'relative' }}>
                  <DatePicker
                    selected={parseDate(row.expirationDate)}
                    onChange={handleDateChange(idx, 'expirationDate')}
                    dateFormat="MM/dd/yyyy"
                    placeholderText="MM/DD/YYYY"
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
                      {
                        name: 'preventOverflow',
                        options: {
                          boundariesElement: 'viewport',
                        },
                      },
                      {
                        name: 'flip',
                        options: {
                          fallbackPlacements: ['top-start', 'bottom-start'],
                        },
                      },
                    ]}
                    onCalendarOpen={() => setOpenDatePicker(`exp-${idx}`)}
                    onCalendarClose={() => setOpenDatePicker(null)}
                  />
                </div>

                {/* Upload / file ref - File Upload Button */}
                <div>
                  <input
                    ref={(el) => (fileInputRefs.current[idx] = el)}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload(idx)}
                    style={{ display: 'none' }}
                  />
                  <button
                    type="button"
                    className={`file-upload-btn ${row.uploadRef ? 'has-file' : ''}`}
                    onClick={triggerFileUpload(idx)}
                    title={row.uploadRef || 'Upload file'}
                  >
                    {row.uploadRef ? (
                      <>
                        <span>📎</span>
                        <span className="file-name">{row.uploadRef}</span>
                      </>
                    ) : (
                      <>
                        <span>📤</span>
                        <span>Upload</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
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