// src/worker/pages/NotificationPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TopNav } from '../../common/components/TopNav'
import { 
  IconArrowLeft, 
  IconBell, 
  IconCheck, 
  IconClock, 
  IconAlertCircle 
} from '../../common/components/Icons'

// Notification Item Component
function NotificationItem({ notification, onMarkAsRead }) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <IconCheck style={{ color: '#2fb463', width: '18px', height: '18px' }} />
      case 'warning':
        return <IconAlertCircle style={{ color: '#f59e0b', width: '18px', height: '18px' }} />
      case 'info':
        return <IconBell style={{ color: '#0f4ea9', width: '18px', height: '18px' }} />
      default:
        return <IconBell style={{ color: '#64748b', width: '18px', height: '18px' }} />
    }
  }

  return (
    <div 
      onClick={() => onMarkAsRead(notification.id)}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        padding: '16px 20px',
        borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
        background: notification.status === 'unread' ? 'rgba(15, 78, 169, 0.04)' : 'white',
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = notification.status === 'unread' ? 'rgba(15, 78, 169, 0.04)' : 'white'
      }}
    >
      <div style={{
        width: '36px',
        height: '36px',
        borderRadius: '50%',
        background: notification.type === 'success' ? 'rgba(47, 180, 99, 0.1)' :
                   notification.type === 'warning' ? 'rgba(245, 158, 11, 0.1)' :
                   'rgba(15, 78, 169, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }}>
        {getIcon()}
      </div>
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '12px',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#17263a',
              marginBottom: '4px'
            }}>
              {notification.title}
            </div>
            <div style={{
              fontSize: '13px',
              color: '#64748b',
              lineHeight: '1.5'
            }}>
              {notification.message}
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flexShrink: 0
          }}>
            {notification.status === 'unread' && (
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#0f4ea9',
                display: 'inline-block'
              }} />
            )}
            <span style={{
              fontSize: '11px',
              color: '#94a3b8',
              whiteSpace: 'nowrap'
            }}>
              <IconClock style={{ width: '12px', height: '12px', marginRight: '4px', verticalAlign: 'middle' }} />
              {notification.time}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function NotificationPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  // Dummy notification data
  const dummyNotifications = [
    {
      id: 1,
      title: 'Profile Update Successful',
      message: 'Your profile information has been updated successfully.',
      type: 'success',
      status: 'unread',
      time: '2 minutes ago'
    },
    {
      id: 2,
      title: 'New Project Match Found',
      message: 'A new project matching your skills has been posted: "Commercial Building Renovation"',
      type: 'info',
      status: 'unread',
      time: '15 minutes ago'
    },
    {
      id: 3,
      title: 'Document Verification Pending',
      message: 'Your uploaded certification documents are pending verification. This usually takes 24-48 hours.',
      type: 'warning',
      status: 'unread',
      time: '1 hour ago'
    },
    {
      id: 4,
      title: 'Payment Received',
      message: 'You have received a payment of $1,450.00 from "Sunset Construction" for Project #234.',
      type: 'success',
      status: 'read',
      time: '3 hours ago'
    },
    {
      id: 5,
      title: 'Account Security Alert',
      message: 'A new login was detected from an unrecognized device. If this wasn\'t you, please secure your account.',
      type: 'warning',
      status: 'read',
      time: '1 day ago'
    },
    {
      id: 6,
      title: 'Welcome to TradesMap!',
      message: 'Thank you for joining TradesMap. Complete your profile to get matched with projects.',
      type: 'info',
      status: 'read',
      time: '2 days ago'
    },
    {
      id: 7,
      title: 'Project Completion Reminder',
      message: 'Project "Downtown Office Renovation" is scheduled for completion in 3 days.',
      type: 'info',
      status: 'read',
      time: '3 days ago'
    },
    {
      id: 8,
      title: 'New Rating Received',
      message: 'You received a 5-star rating from "Green Builders" for your work on Project #189.',
      type: 'success',
      status: 'read',
      time: '5 days ago'
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setNotifications(dummyNotifications)
      setLoading(false)
    }, 500)
  }, [])

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, status: 'read' } : notif
      )
    )
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, status: 'read' }))
    )
  }

  const getFilteredNotifications = () => {
    if (filter === 'unread') {
      return notifications.filter(n => n.status === 'unread')
    }
    if (filter === 'read') {
      return notifications.filter(n => n.status === 'read')
    }
    return notifications
  }

  const unreadCount = notifications.filter(n => n.status === 'unread').length

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">12</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Profile</span>
              </a>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup" aria-label="General">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div className="notificationPage">
            <div className="authCard" style={{
              maxWidth: '900px',
              width: '100%',
              margin: '0 auto',
              padding: '0',
              overflow: 'hidden',
              borderRadius: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '20px 24px',
                borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
                background: '#f8fafc',
                flexWrap: 'wrap'
              }}>
                <button
                  onClick={() => navigate('/wizard/summary')}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#17263a',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '14px',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <IconArrowLeft />
                  Back
                </button>
                <h2 style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  color: '#17263a',
                  margin: 0,
                  flex: 1
                }}>
                  <IconBell style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  Notifications
                  {unreadCount > 0 && (
                    <span style={{
                      marginLeft: '10px',
                      padding: '2px 10px',
                      background: '#0f4ea9',
                      color: 'white',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      {unreadCount} unread
                    </span>
                  )}
                </h2>

                {/* Filter Buttons */}
                <div style={{
                  display: 'flex',
                  gap: '6px',
                  alignItems: 'center',
                  flexWrap: 'wrap'
                }}>
                  <button
                    onClick={() => setFilter('all')}
                    style={{
                      padding: '6px 14px',
                      background: filter === 'all' ? '#0f4ea9' : 'transparent',
                      color: filter === 'all' ? 'white' : '#64748b',
                      border: filter === 'all' ? 'none' : '1px solid rgba(18, 38, 63, 0.12)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('unread')}
                    style={{
                      padding: '6px 14px',
                      background: filter === 'unread' ? '#0f4ea9' : 'transparent',
                      color: filter === 'unread' ? 'white' : '#64748b',
                      border: filter === 'unread' ? 'none' : '1px solid rgba(18, 38, 63, 0.12)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Unread
                  </button>
                  <button
                    onClick={() => setFilter('read')}
                    style={{
                      padding: '6px 14px',
                      background: filter === 'read' ? '#0f4ea9' : 'transparent',
                      color: filter === 'read' ? 'white' : '#64748b',
                      border: filter === 'read' ? 'none' : '1px solid rgba(18, 38, 63, 0.12)',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    Read
                  </button>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllAsRead}
                      style={{
                        padding: '6px 14px',
                        background: 'transparent',
                        color: '#0f4ea9',
                        border: '1px solid rgba(15, 78, 169, 0.2)',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '4px solid rgba(15, 78, 169, 0.1)',
                    borderTop: '4px solid #0f4ea9',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                    margin: '0 auto'
                  }} />
                  <p style={{ marginTop: '16px', color: '#64748b' }}>Loading notifications...</p>
                </div>
              ) : (
                <div style={{ padding: '0' }}>
                  {getFilteredNotifications().length === 0 ? (
                    <div style={{
                      textAlign: 'center',
                      padding: '60px 20px',
                      color: '#94a3b8'
                    }}>
                      <IconBell style={{ width: '48px', height: '48px', marginBottom: '16px', opacity: 0.3 }} />
                      <div style={{ fontSize: '18px', fontWeight: 600, color: '#17263a', marginBottom: '8px' }}>
                        No notifications
                      </div>
                      <div style={{ fontSize: '14px' }}>
                        {filter === 'all' && 'You don\'t have any notifications yet.'}
                        {filter === 'unread' && 'You don\'t have any unread notifications.'}
                        {filter === 'read' && 'You don\'t have any read notifications.'}
                      </div>
                    </div>
                  ) : (
                    getFilteredNotifications().map(notification => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkAsRead={handleMarkAsRead}
                      />
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        .notificationPage {
          max-width: 940px;
          margin: 0 auto;
          padding: 24px;
        }
        
        @media (max-width: 768px) {
          .notificationPage {
            padding: 16px;
          }
          .notificationPage .authCard {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  )
}

export default NotificationPage