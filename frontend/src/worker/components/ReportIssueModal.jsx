// src/worker/components/ReportIssueModal.jsx
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import api from '../../services/api'

function IconX(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
    </svg>
  )
}

export function ReportIssueModal({ isOpen, onClose, onSuccess }) {
  const { t } = useTranslation()
  const [issue, setIssue] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async () => {
    if (!issue || !issue.trim()) {
      setError('Please describe the issue')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const userId = localStorage.getItem('userId')
      const email = localStorage.getItem('pendingEmail') || ''

      const response = await api.post('/auth/report-issue', {
        userId: userId || 'anonymous',
        issue: issue.trim(),
        email: email
      })

      if (response.data.success) {
        setSuccess(true)
        setIssue('')
        setTimeout(() => {
          onSuccess && onSuccess()
          onClose()
        }, 1500)
      } else {
        setError(response.data.message || 'Failed to submit issue')
      }
    } catch (err) {
      console.error('Error submitting issue:', err)
      setError(err.response?.data?.message || err.message || 'Failed to submit issue')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          animation: 'fadeIn 0.2s ease'
        }}
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          style={{
            background: 'white',
            borderRadius: '16px',
            maxWidth: '500px',
            width: '90%',
            padding: '32px 28px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'slideUp 0.3s ease'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{
              fontSize: '20px',
              fontWeight: 700,
              color: '#17263a',
              margin: 0
            }}>
              Report an issue
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#64748b',
                padding: '4px',
                borderRadius: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <IconX />
            </button>
          </div>

          {error && (
            <div style={{
              padding: '10px 14px',
              background: '#fee2e2',
              color: '#dc2626',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px'
            }}>
              ❌ {error}
            </div>
          )}

          {success && (
            <div style={{
              padding: '10px 14px',
              background: '#dcfce7',
              color: '#16a34a',
              borderRadius: '8px',
              fontSize: '13px',
              marginBottom: '16px'
            }}>
              ✅ Issue reported successfully!
            </div>
          )}

          {/* Issue Text Area */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              fontSize: '14px',
              fontWeight: 500,
              color: '#17263a',
              display: 'block',
              marginBottom: '8px'
            }}>
              Write the issue
            </label>
            <textarea
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="Describe the issue you're facing..."
              rows={5}
              style={{
                width: '100%',
                padding: '12px 16px',
                border: '1px solid rgba(18, 38, 63, 0.12)',
                borderRadius: '10px',
                fontSize: '14px',
                fontFamily: 'inherit',
                outline: 'none',
                resize: 'vertical',
                transition: 'all 0.2s ease',
                minHeight: '120px',
                background: '#fafbfc'
              }}
              onFocus={(e) => e.target.style.borderColor = '#0f4ea9'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(18, 38, 63, 0.12)'}
            />
            <div style={{
              fontSize: '11px',
              color: 'rgba(23, 38, 58, 0.4)',
              marginTop: '4px',
              textAlign: 'right'
            }}>
              {issue.length}/500
            </div>
          </div>

          {/* Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'flex-end'
          }}>
            <button
              onClick={onClose}
              style={{
                padding: '10px 24px',
                background: 'transparent',
                border: '1px solid rgba(18, 38, 63, 0.12)',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 500,
                color: '#17263a',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading || !issue.trim()}
              style={{
                padding: '10px 24px',
                background: (loading || !issue.trim()) ? '#94a3b8' : '#0f4ea9',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: (loading || !issue.trim()) ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
                opacity: (loading || !issue.trim()) ? 0.6 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading && issue.trim()) e.currentTarget.style.background = '#0b3f90'
              }}
              onMouseLeave={(e) => {
                if (!loading && issue.trim()) e.currentTarget.style.background = '#0f4ea9'
              }}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </>
  )
}