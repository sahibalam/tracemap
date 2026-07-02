// src/worker/pages/AvailabilityEditPage.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import { IconUser, IconSupport, IconLocation } from '../../common/components/Icons'

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

export function AvailabilityEditPage() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get data from location state or initialize empty
  const initialData = location?.state?.availabilityData || {
    hourlyRate: '',
    payPrefs: {},
    travelRadius: 50,
    willingToTravel: '',
    travelPrefs: {},
    availability: {},
  }

  const [availabilityData, setAvailabilityData] = useState(initialData)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (field, value) => {
    setAvailabilityData({ ...availabilityData, [field]: value })
  }

  const toggleMapValue = (key, setMap) => (e) => {
    const current = availabilityData[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setPayPrefs = (prefs) => handleChange('payPrefs', prefs)
  const setTravelPrefs = (prefs) => handleChange('travelPrefs', prefs)
  const setAvailability = (availability) => handleChange('availability', availability)

  // Handle slider change for travel radius
  const handleSliderChange = (e) => {
    const value = Number(e.target.value)
    handleChange('travelRadius', value)
  }

  // Handle availability day toggle
  const handleDayToggle = (day) => (e) => {
    const current = availabilityData.availability || {}
    setAvailability({
      ...current,
      [day]: e.target.checked
    })
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // Get current radius value with fallback
  const currentRadius = availabilityData.travelRadius !== undefined && availabilityData.travelRadius !== null && availabilityData.travelRadius !== '' 
    ? Number(availabilityData.travelRadius) 
    : 50

  // Calculate slider percentage for fill
  const sliderPercentage = Math.min(100, Math.max(0, (currentRadius / 100) * 100))

  const handleSave = () => {
    setIsSaving(true)
    // Simulate save delay
    setTimeout(() => {
      // Navigate back to summary with updated data
      navigate('/wizard/summary', { 
        state: { 
          ...location?.state?.parentData,
          availabilityData: availabilityData,
          updatedAvailability: true 
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
                Edit Availability & Rate
              </span>
            </div>

            {/* Scrollable Content Area */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              paddingBottom: '16px',
            }}>
              {/* Availability Form */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid rgba(18, 38, 63, 0.08)',
              }}>
                {/* Row 1: Hourly Rate + Availability */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'flex-start' }}>
                    {/* Hourly Rate */}
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#17263a',
                        marginBottom: '8px',
                      }}>
                        Hourly Rate
                      </div>
                      <div style={{ maxWidth: '200px' }}>
                        <TextField
                          placeholder="$$"
                          icon={<IconSupportIcon />}
                          value={availabilityData.hourlyRate || ''}
                          onChange={(v) => handleChange('hourlyRate', v)}
                        />
                      </div>
                    </div>

                    {/* Availability */}
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#17263a',
                        marginBottom: '8px',
                      }}>
                        Availability
                      </div>
                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={!!(availabilityData.payPrefs?.overtime || false)}
                            onChange={toggleMapValue('overtime', setPayPrefs)}
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>Open to overtime</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={!!(availabilityData.payPrefs?.weekends || false)}
                            onChange={toggleMapValue('weekends', setPayPrefs)}
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>Available on weekends</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Row 2: Travel Radius + Willingness to Travel */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'flex-start' }}>
                    {/* Travel Radius - Custom Slider with 70% width */}
                    <div>
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#17263a',
                        marginBottom: '8px',
                      }}>
                        Work Radius
                      </div>
                      <div style={{ maxWidth: '70%' }}>
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
                              {currentRadius} miles
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
                      <div style={{
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#17263a',
                        marginBottom: '8px',
                      }}>
                        Willingness to Travel
                      </div>
                      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="willingToTravel"
                            value="yes"
                            checked={availabilityData.willingToTravel === 'yes'}
                            onChange={() => {
                              handleChange('willingToTravel', 'yes')
                            }}
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>Yes</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="radio"
                            name="willingToTravel"
                            value="no"
                            checked={availabilityData.willingToTravel === 'no'}
                            onChange={() => {
                              handleChange('willingToTravel', 'no')
                              handleChange('travelPrefs', {})
                            }}
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Travel Preferences - Only show if "Yes" is selected */}
                {availabilityData.willingToTravel === 'yes' && (
                  <div style={{ marginBottom: '24px' }}>
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
                        Travel Preferences
                      </div>
                      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={!!(availabilityData.travelPrefs?.housing || false)}
                            onChange={toggleMapValue('housing', setTravelPrefs)}
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>Needs housing for travel work</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={!!(availabilityData.travelPrefs?.perDiem || false)}
                            onChange={toggleMapValue('perDiem', setTravelPrefs)}
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>Needs per diem</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={!!(availabilityData.travelPrefs?.transportation || false)}
                            onChange={toggleMapValue('transportation', setTravelPrefs)}
                          />
                          <span style={{ fontSize: '14px', color: '#17263a' }}>Own transportation</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Available Days Section */}
                <div>
                  <div style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#17263a',
                    marginBottom: '8px',
                  }}>
                    Available Days
                  </div>
                  <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(7, 1fr)', 
                    gap: '8px',
                  }}>
                    {daysOfWeek.map((day) => (
                      <label key={day} style={{ 
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
                          {day.slice(0, 3)}
                        </span>
                        <input
                          type="checkbox"
                          checked={!!(availabilityData.availability?.[day.toLowerCase()] || false)}
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