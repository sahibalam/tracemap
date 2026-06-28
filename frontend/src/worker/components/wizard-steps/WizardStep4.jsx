// src/worker/components/wizard-steps/WizardStep4.jsx
import { useState } from 'react'
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconSupport, IconLocation } from '../../../common/components/Icons'

export function WizardStep4({ data, onChange, onNext, onBack }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const toggleMapValue = (key, setMap) => (e) => {
    const current = data[key] || {}
    setMap({ ...current, [key]: e.target.checked })
  }

  const setPayPrefs = (prefs) => handleChange('payPrefs', prefs)
  const setTravelPrefs = (prefs) => handleChange('travelPrefs', prefs)
  const setAvailability = (availability) => handleChange('availability', availability)

  // Handle slider change for travel radius
  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value, 10)
    handleChange('travelRadius', value)
  }

  // Handle availability day toggle
  const handleDayToggle = (day) => (e) => {
    const current = data.availability || {}
    setAvailability({
      ...current,
      [day]: e.target.checked
    })
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  // Calculate slider percentage for gradient fill
  const sliderPercentage = ((data.travelRadius || 50) / 100) * 100

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        {/* Row 1: Hourly Rate + Availability */}
        <div className="wizardSection">
          <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
            {/* Hourly Rate */}
            <div>
              <div className="wizardSectionBar">Hourly Rate</div>
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
              <div className="wizardSectionBar">Availability</div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '4px' }}>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.payPrefs?.overtime || false)}
                    onChange={toggleMapValue('overtime', setPayPrefs)}
                  />
                  Open to overtime
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.payPrefs?.weekends || false)}
                    onChange={toggleMapValue('weekends', setPayPrefs)}
                  />
                  Available on weekends
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Travel Radius + Willingness to Travel */}
        <div className="wizardSection">
          <div className="wizardGrid2" style={{ alignItems: 'flex-start' }}>
            {/* Travel Radius - Slider */}
            <div>
              <div className="wizardSectionBar">Travel Radius</div>
              <div style={{ marginTop: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={data.travelRadius || 50}
                    onChange={handleSliderChange}
                    style={{
                      flex: 1,
                      height: '6px',
                      WebkitAppearance: 'none',
                      appearance: 'none',
                      background: `linear-gradient(to right, #0f4ea9 0%, #0f4ea9 ${sliderPercentage}%, #e5e7eb ${sliderPercentage}%, #e5e7eb 100%)`,
                      borderRadius: '3px',
                      outline: 'none',
                      transition: 'background 0.1s ease',
                      cursor: 'pointer'
                    }}
                  />
                  <span style={{ 
                    minWidth: '70px', 
                    textAlign: 'center',
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#0f4ea9',
                    background: 'rgba(15, 78, 169, 0.08)',
                    padding: '4px 12px',
                    borderRadius: '6px'
                  }}>
                    {data.travelRadius || 50} miles
                  </span>
                </div>
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

            {/* Willingness to Travel */}
            <div>
              <div className="wizardSectionBar">Willingness to Travel</div>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', marginTop: '4px' }}>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="yes"
                    checked={data.willingToTravel === 'yes'}
                    onChange={() => {
                      handleChange('willingToTravel', 'yes')
                    }}
                  />
                  Yes
                </label>
                <label className="wizardCheck">
                  <input
                    type="radio"
                    name="willingToTravel"
                    value="no"
                    checked={data.willingToTravel === 'no'}
                    onChange={() => {
                      handleChange('willingToTravel', 'no')
                      // Reset travel preferences if 'No' is selected
                      handleChange('travelPrefs', {})
                    }}
                  />
                  No
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Preferences - Moved ABOVE Available section */}
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
                Travel Preferences
              </div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.housing || false)}
                    onChange={toggleMapValue('housing', setTravelPrefs)}
                  />
                  Needs housing for travel work
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.perDiem || false)}
                    onChange={toggleMapValue('perDiem', setTravelPrefs)}
                  />
                  Needs per diem
                </label>
                <label className="wizardCheck">
                  <input
                    type="checkbox"
                    checked={!!(data.travelPrefs?.transportation || false)}
                    onChange={toggleMapValue('transportation', setTravelPrefs)}
                  />
                  Own transportation
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Available Days Section - Moved BELOW Travel Preferences */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Available</div>
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
                  {day.slice(0, 3)}
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