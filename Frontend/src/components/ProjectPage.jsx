import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function IconUpload(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M12 12V4m0 0-3 3m3-3 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconCalendar(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M8 2v4M16 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  )
}

function IconClock(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  )
}

function IconUser(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
    </svg>
  )
}

function IconLocation(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z" fill="currentColor"/>
    </svg>
  )
}

function IconCheck(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconBell(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 22a2.2 2.2 0 0 0 2.2-2.2H9.8A2.2 2.2 0 0 0 12 22Zm7-6V11a7 7 0 0 0-5.5-6.8V3.5a1.5 1.5 0 0 0-3 0v.7A7 7 0 0 0 5 11v5l-2 2v1h18v-1l-2-2Z" fill="currentColor"/>
    </svg>
  )
}

function IconSearch(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 2a8 8 0 1 0 5.3 14l4.2 4.2 1.4-1.4-4.2-4.2A8 8 0 0 0 10 2Zm0 2a6 6 0 1 1 0 12 6 6 0 0 1 0-12Z" fill="currentColor"/>
    </svg>
  )
}

function TextField({ label, placeholder, icon, value, onChange, type = "text", readOnly = false }) {
  return (
    <div className="projectField">
      {label && <div className="projectFieldLabel">{label}</div>}
      <div className="projectFieldControl">
        {icon && <span className="projectFieldIcon">{icon}</span>}
        <input 
          type={type}
          className="projectFieldInput" 
          placeholder={placeholder} 
          value={value} 
          onChange={(e) => onChange?.(e.target.value)}
          readOnly={readOnly}
        />
      </div>
    </div>
  )
}

function SelectField({ label, placeholder, icon, value, onChange, options }) {
  return (
    <div className="projectField">
      {label && <div className="projectFieldLabel">{label}</div>}
      <div className="projectFieldControl">
        {icon && <span className="projectFieldIcon">{icon}</span>}
        <select className="projectFieldSelect" value={value} onChange={(e) => onChange?.(e.target.value)}>
          <option value="" disabled>{placeholder || "Select"}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

function WorkerTypeCheckbox({ label, checked, onChange }) {
  return (
    <label className="projectWorkerType">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span>{label}</span>
    </label>
  )
}

export default function ProjectPage() {
  const navigate = useNavigate()
  
  // Form state
  const [constructionType, setConstructionType] = useState('')
  const [projectType, setProjectType] = useState('')
  const [estimatedStartDate, setEstimatedStartDate] = useState('')
  const [estimatedEndDate, setEstimatedEndDate] = useState('')
  const [numberOfWeeks, setNumberOfWeeks] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectDescription, setProjectDescription] = useState('')
  const [shiftType, setShiftType] = useState('')
  const [timeZone, setTimeZone] = useState('')
  const [shiftStartTime, setShiftStartTime] = useState('')
  const [shiftEndTime, setShiftEndTime] = useState('')
  const [fileName, setFileName] = useState('')
  const [totalWorkers, setTotalWorkers] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  
  const [workerTypes, setWorkerTypes] = useState({
    metalFraming: false,
    drywallHanging: false,
    tapingFinishing: false,
    acousticalCeilings: false,
    leadForeman: false
  })
  
  // Updated Construction Type options
  const constructionOptions = [
    { value: "residential", label: "Residential" },
    { value: "commercial", label: "Commercial" },
    { value: "industrial", label: "Industrial" },
    { value: "infrastructure", label: "Infrastructure" },
    { value: "renovation_maintenance", label: "Renovation / Maintenance" },
    { value: "other", label: "Other" }
  ]
  
  // Updated Project Type options with checkbox style (Hourly and Subcontractor)
  const [projectTypeCheck, setProjectTypeCheck] = useState({
    hourly: false,
    subcontractor: false
  })
  
  const projectTypeOptions = [
    { value: "hourly", label: "Hourly" },
    { value: "subcontractor", label: "Subcontractor" }
  ]
  
  // Updated Time Zone options
  const timeZoneOptions = [
    { value: "est", label: "EST" },
    { value: "cst", label: "CST" },
    { value: "mst", label: "MST" },
    { value: "pst", label: "PST" }
  ]
  
  const shiftTypeOptions = [
    { value: "day", label: "Day Shift" },
    { value: "night", label: "Night Shift" },
    { value: "weekend", label: "Weekend Shift" },
    { value: "rotating", label: "Rotating Shift" }
  ]
  
  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
    }
  }
  
  const handleWorkerTypeChange = (key) => (e) => {
    setWorkerTypes(prev => ({ ...prev, [key]: e.target.checked }))
  }
  
  const handleProjectTypeCheck = (key) => (e) => {
    setProjectTypeCheck(prev => ({ ...prev, [key]: e.target.checked }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log({
      constructionType,
      projectTypeCheck,
      estimatedStartDate,
      estimatedEndDate,
      numberOfWeeks,
      projectName,
      projectDescription,
      shiftType,
      timeZone,
      shiftStartTime,
      shiftEndTime,
      fileName,
      totalWorkers,
      address,
      city,
      state,
      zip,
      workerTypes
    })
    alert("Project created successfully!")
  }
  
  return (
    <div className="appShell">
      {/* Top Navigation */}
      <header className="topbar topbarSolid">
        <div className="topbarInner">
          <a href="/" className="brand brandLink">
            <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
          </a>
          
          <div className="topbarCenter">
            <div className="topbarSearch">
              <span className="topbarSearchIcon">
                <IconSearch />
              </span>
              <input className="topbarSearchInput" type="search" placeholder="Search" />
            </div>
          </div>
          
          <nav className="navActions">
            <div className="navActionsSolid">
              <button type="button" className="navIconButton">
                <IconBell />
                <span className="navIconBadge">3</span>
              </button>
              <img className="topbarAvatar" src="/assets/worker.avif" alt="Avatar" />
            </div>
          </nav>
        </div>
      </header>
      
      <div className="appShellBody appShellBodyVerify">
        {/* Sidebar Navigation */}
        <aside className="sideNav sideNavBlue">
          <div className="sideNavHeader">
            <div className="sideMark">
              <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
            </div>
            <div className="sideMeta">
              <div className="sideTitle">Tradesmap</div>
            </div>
          </div>
          
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup">
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Overview</span>
              </span>
              
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge">4</span>
              </a>
              
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Revenues</span>
              </span>
              
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <IconUser />
                </span>
                <span className="sideText">Profile</span>
              </span>
            </nav>
          </div>
          
          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/company/login')}>
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>
        
        {/* Main Content - Two Column Layout */}
        <main className="appContent">
          <div className="projectPage">
            <div className="projectHeader">
              <h1 className="projectTitle">Create New Project</h1>
              <p className="projectSubtitle">Fill in the details to create a new construction project</p>
            </div>
            
            <form onSubmit={handleSubmit}>
              {/* Two Column Layout */}
              <div className="projectTwoColumn">
                {/* LEFT COLUMN */}
                <div className="projectLeftColumn">
                  {/* Construction Type */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Construction Type</div>
                    <SelectField 
                      label=""
                      placeholder="Select"
                      value={constructionType}
                      onChange={setConstructionType}
                      options={constructionOptions}
                    />
                  </div>

                  {/* Project Type - Checkboxes */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Project Type</div>
                    <div className="projectCheckboxGroup">
                      <label className="projectCheckbox">
                        <input 
                          type="checkbox" 
                          checked={projectTypeCheck.hourly}
                          onChange={handleProjectTypeCheck('hourly')}
                        />
                        <span>Hourly</span>
                      </label>
                      <label className="projectCheckbox">
                        <input 
                          type="checkbox" 
                          checked={projectTypeCheck.subcontractor}
                          onChange={handleProjectTypeCheck('subcontractor')}
                        />
                        <span>Subcontractor</span>
                      </label>
                    </div>
                  </div>

                  {/* Project Scheduling & Timeline */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Project Scheduling & Timeline</div>
                    <div className="projectRow">
                      <div className="projectCol">
                        <TextField 
                          label="Estimated Start Date"
                          placeholder="mm/dd/yyyy"
                          icon={<IconCalendar />}
                          value={estimatedStartDate}
                          onChange={setEstimatedStartDate}
                          type="date"
                        />
                      </div>
                      <div className="projectCol">
                        <TextField 
                          label="Estimated End Date"
                          placeholder="mm/dd/yyyy"
                          icon={<IconCalendar />}
                          value={estimatedEndDate}
                          onChange={setEstimatedEndDate}
                          type="date"
                        />
                      </div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <TextField 
                        label="Number of Weeks"
                        placeholder="Enter number of weeks"
                        value={numberOfWeeks}
                        onChange={setNumberOfWeeks}
                        type="number"
                      />
                    </div>
                  </div>

                  {/* Project Name */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Project Name</div>
                    <TextField 
                      label=""
                      placeholder="Enter project name"
                      value={projectName}
                      onChange={setProjectName}
                    />
                  </div>

                  {/* Project Description */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Project Description</div>
                    <TextField 
                      label=""
                      placeholder="Enter project description"
                      value={projectDescription}
                      onChange={setProjectDescription}
                    />
                  </div>
                </div>

                {/* RIGHT COLUMN */}
                <div className="projectRightColumn">
                  {/* Shift Type */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Shift Type</div>
                    <SelectField 
                      label=""
                      placeholder="Select Shift"
                      value={shiftType}
                      onChange={setShiftType}
                      options={shiftTypeOptions}
                    />
                  </div>

                  {/* Time Zone */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Time Zone</div>
                    <SelectField 
                      label=""
                      placeholder="Select Time Zone"
                      value={timeZone}
                      onChange={setTimeZone}
                      options={timeZoneOptions}
                    />
                  </div>

                  {/* Shift Start Time */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Shift Start Time</div>
                    <TextField 
                      label=""
                      placeholder="Select"
                      icon={<IconClock />}
                      value={shiftStartTime}
                      onChange={setShiftStartTime}
                      type="time"
                    />
                  </div>

                  {/* Shift End Time */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Shift End Time</div>
                    <TextField 
                      label=""
                      placeholder="Select"
                      icon={<IconClock />}
                      value={shiftEndTime}
                      onChange={setShiftEndTime}
                      type="time"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="projectSection">
                    <div className="projectSectionTitle">Upload Drawing / PDF / Construction Document</div>
                    <div className="projectFileUpload">
                      <button type="button" className="projectBrowseBtn" onClick={() => document.getElementById('fileInput').click()}>
                        <IconUpload />
                        Browse...
                      </button>
                      <input 
                        id="fileInput"
                        type="file" 
                        style={{ display: 'none' }}
                        onChange={handleFileUpload}
                        accept=".pdf,.jpg,.jpeg,.png,.dwg"
                      />
                      <span className="projectFileName">{fileName || "No file selected."}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Workers Section - Full Width */}
              <div className="projectSection">
                <div className="projectSectionTitle">Workers</div>
                <div className="projectTwoColumn">
                  <div className="projectLeftColumn">
                    <TextField 
                      label="Total Number of Workers"
                      placeholder="Enter total workers"
                      value={totalWorkers}
                      onChange={setTotalWorkers}
                      type="number"
                    />
                  </div>
                  <div className="projectRightColumn">
                    <div className="projectFieldLabel">Select Worker Type</div>
                    <div className="projectWorkerTypes">
                      <WorkerTypeCheckbox 
                        label="Metal Framing" 
                        checked={workerTypes.metalFraming}
                        onChange={handleWorkerTypeChange('metalFraming')}
                      />
                      <WorkerTypeCheckbox 
                        label="Drywall Hanging" 
                        checked={workerTypes.drywallHanging}
                        onChange={handleWorkerTypeChange('drywallHanging')}
                      />
                      <WorkerTypeCheckbox 
                        label="Taping/Finishing" 
                        checked={workerTypes.tapingFinishing}
                        onChange={handleWorkerTypeChange('tapingFinishing')}
                      />
                      <WorkerTypeCheckbox 
                        label="Acoustical Ceilings" 
                        checked={workerTypes.acousticalCeilings}
                        onChange={handleWorkerTypeChange('acousticalCeilings')}
                      />
                      <WorkerTypeCheckbox 
                        label="Lead/Foreman" 
                        checked={workerTypes.leadForeman}
                        onChange={handleWorkerTypeChange('leadForeman')}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Location - Full Width */}
              <div className="projectSection">
                <div className="projectSectionTitle">Project Location</div>
                <div className="projectTwoColumn">
                  <div className="projectLeftColumn">
                    <TextField 
                      label="Address"
                      placeholder="Enter address"
                      icon={<IconLocation />}
                      value={address}
                      onChange={setAddress}
                    />
                    <div className="projectRow">
                      <div className="projectCol">
                        <TextField 
                          label="City"
                          placeholder="City"
                          value={city}
                          onChange={setCity}
                        />
                      </div>
                      <div className="projectCol">
                        <TextField 
                          label="State"
                          placeholder="State"
                          value={state}
                          onChange={setState}
                        />
                      </div>
                      <div className="projectCol">
                        <TextField 
                          label="ZIP"
                          placeholder="ZIP"
                          value={zip}
                          onChange={setZip}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="projectRightColumn">
                    {/* Empty for alignment */}
                  </div>
                </div>
              </div>
              
              {/* Submit Button */}
              <div className="projectActions">
                <button type="button" className="projectBtn projectBtnSecondary" onClick={() => navigate('/')}>
                  Cancel
                </button>
                <button type="submit" className="projectBtn projectBtnPrimary">
                  <IconCheck />
                  Submit Work
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}