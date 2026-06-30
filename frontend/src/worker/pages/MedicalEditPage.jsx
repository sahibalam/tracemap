// src/worker/pages/MedicalEditPage.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'

// Icons
function IconGrid(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
    </svg>
  )
}

function IconFolder(props) {
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

function IconSupport(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
    </svg>
  )
}

function IconUser(props) {
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

export function MedicalEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get data from location state or initialize empty
  const initialData = location?.state?.medicalData || {
    bloodGroup: '',
    emergencyMedicalInfo: 'none',
    emergencyMedicalFlags: {},
    emergencyInstructions: '',
  }

  const [medicalData, setMedicalData] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field, value) => {
    setMedicalData({ ...medicalData, [field]: value })
  }

  const toggleFlag = (key) => {
    const current = medicalData.emergencyMedicalFlags || {}
    setMedicalData({
      ...medicalData,
      emergencyMedicalFlags: {
        ...current,
        [key]: !current[key],
      },
    })
  }

  const handleSave = () => {
    setIsSaving(true)
    // Simulate save delay
    setTimeout(() => {
      // Navigate back to summary with updated data
      navigate('/wizard/summary', { 
        state: { 
          ...location?.state?.parentData,
          medicalData: medicalData,
          updatedMedical: true 
        },
        replace: true 
      })
      setIsSaving(false)
    }, 500)
  }

  const handleBack = () => {
    navigate('/wizard/summary')
  }

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
                <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">12</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconChart /></span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true"><IconUser /></span>
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
                <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            
            {/* Header with Back button */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '16px',
              marginBottom: '24px',
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(18, 38, 63, 0.08)'
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
                Back to Profile
              </button>
              <span style={{
                fontSize: '20px',
                fontWeight: 600,
                color: '#17263a',
              }}>
                Edit Medical Details
              </span>
            </div>

            {/* Medical Form */}
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: '32px',
              border: '1px solid rgba(18, 38, 63, 0.08)',
            }}>
              {/* Blood Group */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#17263a',
                  marginBottom: '8px',
                }}>
                  Blood Group
                </label>
                <select
                  value={medicalData.bloodGroup}
                  onChange={(e) => handleChange('bloodGroup', e.target.value)}
                  style={{
                    width: '100%',
                    height: '48px',
                    padding: '0 16px',
                    border: '1px solid rgba(18, 38, 63, 0.12)',
                    borderRadius: '12px',
                    fontSize: '14px',
                    outline: 'none',
                    background: 'white',
                    color: '#17263a',
                    transition: 'all 0.2s ease',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0f4ea9'
                    e.target.style.boxShadow = '0 0 0 3px rgba(15, 78, 169, 0.1)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'
                    e.target.style.boxShadow = 'none'
                  }}
                >
                  <option value="">Select blood group</option>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>

              {/* Emergency Medical Info Radio */}
              <div style={{ marginBottom: '24px' }}>
                <div style={{
                  fontSize: '14px',
                  fontWeight: 600,
                  color: '#17263a',
                  marginBottom: '12px',
                }}>
                  Do you have emergency medical information first aid personnel or emergency responders should know?
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="emergencyMedicalInfo"
                      checked={medicalData.emergencyMedicalInfo === 'none'}
                      onChange={() => handleChange('emergencyMedicalInfo', 'none')}
                    />
                    <span style={{ fontSize: '14px', color: '#17263a' }}>No emergency medical information</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="emergencyMedicalInfo"
                      checked={medicalData.emergencyMedicalInfo === 'disclosure'}
                      onChange={() => handleChange('emergencyMedicalInfo', 'disclosure')}
                    />
                    <span style={{ fontSize: '14px', color: '#17263a' }}>Yes, voluntary disclosure</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input
                      type="radio"
                      name="emergencyMedicalInfo"
                      checked={medicalData.emergencyMedicalInfo === 'skip'}
                      onChange={() => handleChange('emergencyMedicalInfo', 'skip')}
                    />
                    <span style={{ fontSize: '14px', color: '#17263a' }}>Skip for now</span>
                  </label>
                </div>
              </div>

              {/* Emergency Medical Flags - Only show when disclosure is selected */}
              {medicalData.emergencyMedicalInfo === 'disclosure' && (
                <div style={{ marginBottom: '24px' }}>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '12px',
                  }}>
                    Medical Conditions
                  </div>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '8px',
                  }}>
                    {[
                      'Severe allergy',
                      'Diabetes / blood sugar risk',
                      'Heart condition / device',
                      'Mobility / communication limitation',
                      'Asthma / respiratory risk',
                      'Seizure condition',
                      'Bleeding risk',
                      'Emergency medication/device carried',
                    ].map((condition) => (
                      <label key={condition} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={!!(medicalData.emergencyMedicalFlags?.[condition] || false)}
                          onChange={() => toggleFlag(condition)}
                        />
                        <span style={{ fontSize: '14px', color: '#17263a' }}>{condition}</span>
                      </label>
                    ))}
                  </div>

                  {/* Emergency Instructions */}
                  <div style={{ marginTop: '16px' }}>
                    <label style={{
                      display: 'block',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#17263a',
                      marginBottom: '6px',
                    }}>
                      Important Emergency Instructions
                    </label>
                    <div style={{
                      fontSize: '12px',
                      color: 'rgba(23, 38, 58, 0.6)',
                      marginBottom: '8px',
                    }}>
                      Do not include genetic or highly sensitive medical details.
                    </div>
                    <textarea
                      value={medicalData.emergencyInstructions || ''}
                      onChange={(e) => handleChange('emergencyInstructions', e.target.value)}
                      placeholder="Enter instructions (max 1000 characters)"
                      maxLength={1000}
                      rows={4}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1px solid rgba(18, 38, 63, 0.12)',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontFamily: 'inherit',
                        outline: 'none',
                        resize: 'vertical',
                        transition: 'all 0.2s ease',
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
                      fontSize: '12px',
                      color: 'rgba(23, 38, 58, 0.4)',
                      textAlign: 'right',
                      marginTop: '4px',
                    }}>
                      {medicalData.emergencyInstructions?.length || 0}/1000
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                gap: '12px',
                paddingTop: '20px',
                borderTop: '1px solid rgba(18, 38, 63, 0.08)',
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
          </div>
        </main>
      </div>
    </div>
  )
}