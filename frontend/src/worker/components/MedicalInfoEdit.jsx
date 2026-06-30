// src/worker/components/MedicalInfoEdit.jsx
import { useState } from 'react'

export function MedicalInfoEdit({ data, onSave, onClose }) {
  const [medicalData, setMedicalData] = useState({
    bloodGroup: data?.bloodGroup || '',
    emergencyMedicalInfo: data?.emergencyMedicalInfo || 'none',
    emergencyMedicalFlags: data?.emergencyMedicalFlags || {},
    emergencyInstructions: data?.emergencyInstructions || '',
  })

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
    onSave(medicalData)
    onClose()
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
    }}>
      <div style={{
        background: 'white',
        borderRadius: '16px',
        maxWidth: '600px',
        width: '90%',
        maxHeight: '90vh',
        overflow: 'auto',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
        position: 'relative',
      }}>
        {/* Header with Back button */}
        <div style={{
          position: 'sticky',
          top: 0,
          background: 'white',
          padding: '16px 24px',
          borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          zIndex: 1,
        }}>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: '#17263a',
              fontSize: '14px',
              fontWeight: 500,
              padding: '4px 8px',
              borderRadius: '6px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18, 38, 63, 0.06)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>
          <span style={{
            fontSize: '18px',
            fontWeight: 600,
            color: '#17263a',
          }}>
            Medical Details
          </span>
        </div>

        {/* Content */}
        <div style={{ padding: '24px' }}>
          {/* Blood Group */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: 600,
              color: '#17263a',
              marginBottom: '6px',
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
          <div style={{ marginBottom: '20px' }}>
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
            <div style={{ marginBottom: '20px' }}>
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
            marginTop: '8px',
          }}>
            <button
              onClick={onClose}
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
              style={{
                padding: '10px 24px',
                borderRadius: '8px',
                background: '#0f4ea9',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '14px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#0b3f90'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#0f4ea9'}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}