// src/worker/pages/WorkHistoryEditPage.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import { IconFolder, IconSupport, IconLocation, IconUser, IconPhone } from '../../common/components/Icons'

// Icons
function IconGrid(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
    </svg>
  )
}

function IconFolderIcon(props) {
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

export function WorkHistoryEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get data from location state or initialize empty
  const initialData = location?.state?.workHistoryData || {
    projects: [
      { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
      { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
      { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
    ],
    projectConditions: {},
    referenceName: '',
    referenceTitle: '',
    referencePhone: '',
    reviewerNotes: '',
  }

  const [workHistoryData, setWorkHistoryData] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)

  const updateProjectField = (index, key) => (value) => {
    const projects = [...(workHistoryData.projects || [])]
    projects[index] = { ...projects[index], [key]: value }
    setWorkHistoryData({ ...workHistoryData, projects })
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

  const projects = workHistoryData.projects || [
    { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
    { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
    { name: '', client: '', phone: '', trade: '', role: '', start: '', end: '', scope: '' },
  ]

  // Trade options
  const tradeOptions = [
    'Metal Framing',
    'Drywall Hanging',
    'Taping/Finishing',
    'Acoustical Ceilings',
    'Interior Carpentry',
    'Helpers/Labourers',
    'Insulation',
    'Demolition/Punch/Final Clean',
    'Leads/Foremen',
    'Other'
  ]

  const handleSave = () => {
    setIsSaving(true)
    // Simulate save delay
    setTimeout(() => {
      // Navigate back to summary with updated data
      navigate('/wizard/summary', { 
        state: { 
          ...location?.state?.parentData,
          workHistoryData: workHistoryData,
          updatedWorkHistory: true 
        },
        replace: true 
      })
      setIsSaving(false)
    }, 500)
  }

  const handleBack = () => {
    navigate('/wizard/summary')
  }

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

    /* Trade select styles */
    .trade-select-wrapper {
      position: relative;
      flex: 1;
    }

    .trade-select-wrapper select {
      width: 100%;
      height: 40px;
      padding: 0 12px;
      padding-right: 12px;
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
    }

    .trade-select-wrapper select:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .trade-select-wrapper select:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .trade-select-wrapper select option {
      padding: 8px 12px;
      font-size: 13px;
    }

    .trade-select-wrapper select option.placeholder-option {
      color: rgba(23, 38, 58, 0.4);
    }

    .trade-select-wrapper .select-icon {
      position: absolute;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(23, 38, 58, 0.4);
      pointer-events: none;
      font-size: 14px;
      display: flex;
      align-items: center;
    }

    .trade-select-wrapper select.has-icon {
      padding-left: 36px;
    }

    /* Textarea styles */
    .wizard-textarea {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 8px;
      font-size: 13px;
      font-family: inherit;
      resize: vertical;
      outline: none;
      transition: all 0.2s ease;
      background: white;
      color: #17263a;
      min-height: 60px;
      box-sizing: border-box;
    }

    .wizard-textarea:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .wizard-textarea:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .wizard-textarea::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }

    .character-count {
      font-size: 10px;
      color: rgba(23, 38, 58, 0.5);
      margin-top: 2px;
      text-align: right;
    }

    .project-card {
      padding: 16px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      border-radius: 12px;
      background: white;
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
  `

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
                <span className="sideIcon" aria-hidden="true"><IconFolderIcon /></span>
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
                Edit Work History
              </span>
            </div>

            {/* Scrollable Content Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              paddingBottom: '16px',
            }}>
              {/* Work History Form */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(18, 38, 63, 0.08)',
              }}>
                <style>{customStyles}</style>
                
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '16px',
                    paddingBottom: '8px',
                    borderBottom: '2px solid rgba(18, 38, 63, 0.08)',
                  }}>
                    Work History
                  </div>
                  
                  <div className="grid-3-col">
                    {/* Project 1 */}
                    <div className="project-card">
                      <div className="project-title">Project 1</div>
                      
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
                        placeholder="Employer Phone Number"
                        icon={<IconPhone />}
                        value={projects[0]?.phone || ''}
                        onChange={updateProjectField(0, 'phone')}
                        style={{ marginBottom: '8px' }}
                      />
                      
                      <div className="flex-row mb-8">
                        <div className="trade-select-wrapper">
                          <select 
                            value={projects[0]?.trade || ''} 
                            onChange={(e) => updateProjectField(0, 'trade')(e.target.value)}
                            className="has-icon"
                            style={{
                              color: projects[0]?.trade ? '#17263a' : '#6b7280',
                            }}
                          >
                            <option value="" className="placeholder-option" disabled>
                              Trade
                            </option>
                            {tradeOptions.map((trade) => (
                              <option key={trade} value={trade}>
                                {trade}
                              </option>
                            ))}
                          </select>
                          <span className="select-icon"><IconSupport /></span>
                        </div>
                        <TextField
                          placeholder="Role"
                          icon={<IconUser />}
                          value={projects[0]?.role || ''}
                          onChange={updateProjectField(0, 'role')}
                        />
                      </div>
                      
                      <div className="flex-row mb-8">
                        <div className="date-picker-wrapper custom-date-picker">
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
                            placeholderText="End"
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
                      
                      <div>
                        <textarea
                          className="wizard-textarea"
                          placeholder="Scope Summary"
                          value={projects[0]?.scope || ''}
                          onChange={(e) => updateProjectField(0, 'scope')(e.target.value)}
                          rows={3}
                        />
                        <div className="character-count">
                          {(projects[0]?.scope?.length || 0)} characters
                        </div>
                      </div>
                    </div>

                    {/* Project 2 */}
                    <div className="project-card">
                      <div className="project-title">Project 2</div>
                      
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
                        placeholder="Employer Phone Number"
                        icon={<IconPhone />}
                        value={projects[1]?.phone || ''}
                        onChange={updateProjectField(1, 'phone')}
                        style={{ marginBottom: '8px' }}
                      />
                      
                      <div className="flex-row mb-8">
                        <div className="trade-select-wrapper">
                          <select 
                            value={projects[1]?.trade || ''} 
                            onChange={(e) => updateProjectField(1, 'trade')(e.target.value)}
                            className="has-icon"
                            style={{
                              color: projects[1]?.trade ? '#17263a' : '#6b7280',
                            }}
                          >
                            <option value="" className="placeholder-option" disabled>
                              Trade
                            </option>
                            {tradeOptions.map((trade) => (
                              <option key={trade} value={trade}>
                                {trade}
                              </option>
                            ))}
                          </select>
                          <span className="select-icon"><IconSupport /></span>
                        </div>
                        <TextField
                          placeholder="Role"
                          icon={<IconUser />}
                          value={projects[1]?.role || ''}
                          onChange={updateProjectField(1, 'role')}
                        />
                      </div>
                      
                      <div className="flex-row mb-8">
                        <div className="date-picker-wrapper custom-date-picker">
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
                            placeholderText="End"
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
                      
                      <div>
                        <textarea
                          className="wizard-textarea"
                          placeholder="Scope Summary"
                          value={projects[1]?.scope || ''}
                          onChange={(e) => updateProjectField(1, 'scope')(e.target.value)}
                          rows={3}
                        />
                        <div className="character-count">
                          {(projects[1]?.scope?.length || 0)} characters
                        </div>
                      </div>
                    </div>

                    {/* Project 3 */}
                    <div className="project-card">
                      <div className="project-title">Project 3</div>
                      
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
                        placeholder="Employer Phone Number"
                        icon={<IconPhone />}
                        value={projects[2]?.phone || ''}
                        onChange={updateProjectField(2, 'phone')}
                        style={{ marginBottom: '8px' }}
                      />
                      
                      <div className="flex-row mb-8">
                        <div className="trade-select-wrapper">
                          <select 
                            value={projects[2]?.trade || ''} 
                            onChange={(e) => updateProjectField(2, 'trade')(e.target.value)}
                            className="has-icon"
                            style={{
                              color: projects[2]?.trade ? '#17263a' : '#6b7280',
                            }}
                          >
                            <option value="" className="placeholder-option" disabled>
                              Trade
                            </option>
                            {tradeOptions.map((trade) => (
                              <option key={trade} value={trade}>
                                {trade}
                              </option>
                            ))}
                          </select>
                          <span className="select-icon"><IconSupport /></span>
                        </div>
                        <TextField
                          placeholder="Role"
                          icon={<IconUser />}
                          value={projects[2]?.role || ''}
                          onChange={updateProjectField(2, 'role')}
                        />
                      </div>
                      
                      <div className="flex-row mb-8">
                        <div className="date-picker-wrapper custom-date-picker">
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
                            placeholderText="End"
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
                      
                      <div>
                        <textarea
                          className="wizard-textarea"
                          placeholder="Scope Summary"
                          value={projects[2]?.scope || ''}
                          onChange={(e) => updateProjectField(2, 'scope')(e.target.value)}
                          rows={3}
                        />
                        <div className="character-count">
                          {(projects[2]?.scope?.length || 0)} characters
                        </div>
                      </div>
                    </div>
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