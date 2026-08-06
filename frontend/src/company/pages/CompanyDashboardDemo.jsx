// src/company/pages/CompanyDashboardDemo.jsx
// EXACT PIXEL-PERFECT MIRROR OF THE ATTACHMENT
import { useState } from 'react'
import { TopNav } from '../../common/components/TopNav'

// ============================================================
// 🎨 CUSTOM SVG ICONS (Matching the design)
// ============================================================
function IconDashboard(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor" />
    </svg>
  )
}

function IconProjects(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor" />
    </svg>
  )
}

function IconWorkforce(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
    </svg>
  )
}

function IconBilling(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M11.5 1L2 6v2l9.5-5L21 8V6l-9.5-5zM2 18l9.5 5L21 18v-2l-9.5 5L2 16v2zm0-7l9.5 5L21 11V9l-9.5 5L2 9v2z" fill="currentColor" />
    </svg>
  )
}

function IconReports(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor" />
    </svg>
  )
}

function IconMessages(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" fill="currentColor" />
    </svg>
  )
}

function IconProfile(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
    </svg>
  )
}

function IconSubscription(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
    </svg>
  )
}

function IconSettings(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="currentColor" />
    </svg>
  )
}

function IconHelp(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor" />
    </svg>
  )
}

function IconSupport(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor" />
    </svg>
  )
}

function IconSignOut(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
    </svg>
  )
}

function IconSearch(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor" />
    </svg>
  )
}

function IconBell(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor" />
    </svg>
  )
}

function IconChevronDown(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function IconMoreVertical(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
    </svg>
  )
}

function IconDotsHorizontal(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor" />
    </svg>
  )
}

// ============================================================
// 📱 MOBILE SIDEBAR CONTENT
// ============================================================
function MobileSidebarContent() {
  return (
    <>
      <div className="sideGroupLabel">WORKSPACE</div>
      <nav className="sideGroup" aria-label="Workspace">
        <a className="sideItem sideItemActive" href="#">
          <span className="sideIcon" aria-hidden="true"><IconDashboard /></span>
          <span className="sideText">Dashboard</span>
        </a>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconProjects /></span>
          <span className="sideText">Projects</span>
          <span className="sideBadge" aria-label="24 projects">24</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconWorkforce /></span>
          <span className="sideText">Workforce</span>
          <span className="sideBadge" aria-label="156 workers">156</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconBilling /></span>
          <span className="sideText">Billing</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconReports /></span>
          <span className="sideText">Reports</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconMessages /></span>
          <span className="sideText">Messages</span>
          <span className="sideBadge" aria-label="3 messages">3</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconProfile /></span>
          <span className="sideText">Profile</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconSubscription /></span>
          <span className="sideText">Subscription</span>
        </span>
      </nav>

      <div className="sideGroupLabel">SYSTEM</div>
      <nav className="sideGroup" aria-label="System">
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconSettings /></span>
          <span className="sideText">Settings</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconHelp /></span>
          <span className="sideText">Help</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
          <span className="sideText">Support</span>
        </span>
        <button type="button" className="sideItem sideItemButton" style={{ color: '#dc2626' }}>
          <span className="sideIcon" aria-hidden="true"><IconSignOut /></span>
          <span className="sideText">Sign Out</span>
        </button>
      </nav>
    </>
  )
}

// ============================================================
// 🏷️ STATUS BADGE
// ============================================================
function StatusBadge({ status }) {
  const colors = {
    'In Progress': { bg: 'rgba(15, 78, 169, 0.1)', text: '#0f4ea9' },
    'Open': { bg: 'rgba(47, 180, 99, 0.1)', text: '#2fb463' },
    'Pending': { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' }
  }
  
  const style = colors[status] || { bg: 'rgba(148, 163, 184, 0.1)', text: '#64748b' }
  
  return (
    <span style={{ 
      display: 'inline-block', 
      padding: '2px 12px', 
      borderRadius: '12px', 
      fontSize: '12px', 
      fontWeight: 600,
      background: style.bg,
      color: style.text
    }}>
      {status}
    </span>
  )
}

// ============================================================
// 🥧 DOUGHNUT CHART COMPONENT
// ============================================================
function DoughnutChart({ data, total }) {
  const colors = ['#0f4ea9', '#2fb463', '#f59e0b', '#dc2626']
  const radius = 60
  const strokeWidth = 24
  const circumference = 2 * Math.PI * radius
  
  let cumulativeAngle = 0
  
  return (
    <svg width="160" height="160" viewBox="0 0 160 160">
      {data.map((item, index) => {
        const percentage = item.percentage / 100
        const dashArray = percentage * circumference
        const dashOffset = -cumulativeAngle
        cumulativeAngle += percentage * circumference
        
        return (
          <circle
            key={index}
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={colors[index % colors.length]}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashArray} ${circumference}`}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            transform="rotate(-90 80 80)"
          />
        )
      })}
      <circle cx="80" cy="80" r="40" fill="white" />
      <text x="80" y="76" textAnchor="middle" fontSize="20" fontWeight="700" fill="#17263a">
        {total}
      </text>
      <text x="80" y="96" textAnchor="middle" fontSize="10" fontWeight="500" fill="#64748b">
        Total
      </text>
    </svg>
  )
}

// ============================================================
// 📊 KPI CARDS - EXACT MATCH
// ============================================================
function KPICards() {
  const stats = [
    { label: 'Total Projects', value: '24', change: '+12%', icon: '📋', color: '#0f4ea9' },
    { label: 'Active Workforce', value: '48', change: '+15%', icon: '✅', color: '#2fb463' },
    { label: 'Total Reports', value: '156', change: '+8%', icon: '📊', color: '#f59e0b' },
    { label: 'Outstanding', value: '$36,750', change: '-5%', color: '#dc2626', icon: '💰' }
  ]

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '16px',
      marginBottom: '24px'
    }}>
      {stats.map((stat, idx) => (
        <div key={idx} style={{ 
          padding: '20px', 
          background: 'white', 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          border: '1px solid rgba(18,38,63,0.06)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{stat.label}</span>
            <span style={{ fontSize: '18px' }}>{stat.icon}</span>
          </div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#17263a' }}>{stat.value}</div>
          <div style={{ 
            fontSize: '13px', 
            color: stat.change.startsWith('+') ? '#2fb463' : '#dc2626',
            fontWeight: 500, 
            marginTop: '4px' 
          }}>
            {stat.change} from last month
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// 📋 RECENT PROJECTS TABLE
// ============================================================
function RecentProjectsTable() {
  const projects = [
    { name: 'Downtown Tower Build', location: 'New York, NY', workers: 32, status: 'In Progress', dueDate: 'Jun 25, 2025' },
    { name: 'Westside Plaza', location: 'Los Angeles, CA', workers: 28, status: 'Open', dueDate: 'Jun 30, 2025' },
    { name: 'Airport Road Expansion', location: 'Austin, TX', workers: 45, status: 'In Progress', dueDate: 'Jul 05, 2025' },
    { name: 'School Renovation', location: 'Chicago, IL', workers: 18, status: 'Pending', dueDate: 'Jul 10, 2025' },
    { name: 'Warehouse Construction', location: 'Dallas, TX', workers: 24, status: 'Open', dueDate: 'Jul 15, 2025' }
  ]

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Recent Projects</h3>
        <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500 }}>View All →</a>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(18,38,63,0.06)' }}>
              <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Project Name</th>
              <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</th>
              <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workers</th>
              <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
              <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Due Date</th>
              <th style={{ textAlign: 'center', padding: '10px 12px', width: '40px' }}>
                <IconMoreVertical style={{ color: '#94a3b8' }} />
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => (
              <tr key={idx} style={{ borderBottom: idx < projects.length - 1 ? '1px solid rgba(18,38,63,0.04)' : 'none' }}>
                <td style={{ padding: '12px 12px', fontSize: '14px', fontWeight: 500, color: '#17263a' }}>{project.name}</td>
                <td style={{ padding: '12px 12px', fontSize: '13px', color: '#64748b' }}>{project.location}</td>
                <td style={{ padding: '12px 12px', fontSize: '13px', textAlign: 'center', color: '#17263a' }}>{project.workers}</td>
                <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                  <StatusBadge status={project.status} />
                </td>
                <td style={{ padding: '12px 12px', fontSize: '13px', textAlign: 'center', color: '#64748b' }}>{project.dueDate}</td>
                <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                  <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94a3b8' }}>
                    <IconDotsHorizontal />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================================
// ⚡ QUICK ACTIONS - VERTICAL CARDS
// ============================================================
function QuickActions() {
  const actions = [
    { icon: '📋', label: 'Create New Project', color: '#0f4ea9' },
    { icon: '👷', label: 'Add Workforce', color: '#2fb463' },
    { icon: '📊', label: 'Create Report', color: '#f59e0b' },
    { icon: '✉️', label: 'Send Message', color: '#8b5cf6' },
    { icon: '📅', label: 'View Calendar', color: '#ec4899' }
  ]
  
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Quick Actions</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {actions.map((action, idx) => (
          <button
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px 16px',
              background: 'white',
              border: '1px solid rgba(18,38,63,0.06)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              color: '#17263a',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
              width: '100%',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(15, 78, 169, 0.03)'
              e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.15)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = 'rgba(18,38,63,0.06)'
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.02)'
            }}
          >
            <span style={{ fontSize: '20px' }}>{action.icon}</span>
            {action.label}
            <span style={{ marginLeft: 'auto', color: '#94a3b8' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// 👷 WORKFORCE OVERVIEW - WITH DOUGHNUT CHART
// ============================================================
function WorkforceOverview() {
  const data = [
    { status: 'On Site', count: 92, percentage: 59, color: '#0f4ea9' },
    { status: 'Available', count: 38, percentage: 24, color: '#2fb463' },
    { status: 'On Leave', count: 16, percentage: 10, color: '#f59e0b' },
    { status: 'Unavailable', count: 10, percentage: 7, color: '#dc2626' }
  ]
  
  const total = data.reduce((sum, item) => sum + item.count, 0)

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Workforce by Status</h3>
        <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500 }}>View All →</a>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ flexShrink: 0 }}>
          <DoughnutChart data={data} total={total} />
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {data.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '12px', 
                height: '12px', 
                borderRadius: '3px', 
                background: item.color,
                flexShrink: 0
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                  <span style={{ color: '#17263a' }}>{item.status}</span>
                  <span style={{ fontWeight: 600, color: '#17263a' }}>{item.count} ({item.percentage}%)</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// 📅 UPCOMING DEADLINES
// ============================================================
function UpcomingDeadlines() {
  const deadlines = [
    { project: 'Downtown Tower Build', task: 'Material Approval', date: 'Jun 25' },
    { project: 'Westside Plaza', task: 'Workforce Review', date: 'Jun 30' },
    { project: 'Airport Road Expansion', task: 'Progress Report', date: 'Jul 05' }
  ]

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Upcoming Deadlines</h3>
        <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500 }}>View All →</a>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {deadlines.map((item, idx) => (
          <div 
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 14px',
              background: idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
              borderRadius: '8px'
            }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: 500, color: '#17263a' }}>
                {item.project}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {item.task}
              </div>
            </div>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: 600, 
              color: '#0f4ea9',
              whiteSpace: 'nowrap',
              marginLeft: '12px'
            }}>
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// ✉️ MESSAGES WIDGET
// ============================================================
function MessagesWidget() {
  const messages = [
    { from: 'John Doe', message: 'Please review the updated project...', date: 'Jul 10 AM' },
    { from: 'Sarah Miller', message: 'Workforce list for next week.', date: 'Jul 15 AM' },
    { from: 'Admin Team', message: 'Your project has been approved.', date: 'Jul 20 AM' }
  ]

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Messages</h3>
        <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500 }}>View All →</a>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {messages.map((item, idx) => (
          <div 
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 14px',
              background: idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ 
                  width: '28px', 
                  height: '28px', 
                  borderRadius: '50%', 
                  background: '#0f4ea9', 
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 600,
                  flexShrink: 0
                }}>
                  {item.from.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#17263a' }}>
                    {item.from}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {item.message}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ 
              fontSize: '12px', 
              color: '#94a3b8',
              whiteSpace: 'nowrap',
              marginLeft: '12px'
            }}>
              {item.date}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// 🏠 MAIN PAGE - EXACT MIRROR
// ============================================================
export function CompanyDashboardDemo() {
  return (
    <div className="appShell">
      <TopNav variant="solid" mobileMenuContent={<MobileSidebarContent />} />

      <div className="appShellBody appShellBodyDashboard">
        {/* Sidebar - Complete with all items */}
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true"><IconDashboard /></span>
                <span className="sideText">Dashboard</span>
              </a>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconProjects /></span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="24 projects">24</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconWorkforce /></span>
                <span className="sideText">Workforce</span>
                <span className="sideBadge" aria-label="156 workers">156</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconBilling /></span>
                <span className="sideText">Billing</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconReports /></span>
                <span className="sideText">Reports</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconMessages /></span>
                <span className="sideText">Messages</span>
                <span className="sideBadge" aria-label="3 messages">3</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconProfile /></span>
                <span className="sideText">Profile</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconSubscription /></span>
                <span className="sideText">Subscription</span>
              </span>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">SYSTEM</div>
            <nav className="sideGroup" aria-label="System">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconSettings /></span>
                <span className="sideText">Settings</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconHelp /></span>
                <span className="sideText">Help</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
                <span className="sideText">Support</span>
              </span>
              <button type="button" className="sideItem sideItemButton" style={{ color: '#dc2626' }}>
                <span className="sideIcon" aria-hidden="true"><IconSignOut /></span>
                <span className="sideText">Sign Out</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="appContent">
          <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header - EXACT MATCH */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#17263a' }}>Dashboard</h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  {/* Search Bar */}
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    background: 'white',
                    border: '1px solid rgba(18,38,63,0.08)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    gap: '8px'
                  }}>
                    <IconSearch style={{ color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      placeholder="Search..." 
                      style={{ 
                        border: 'none', 
                        outline: 'none', 
                        fontSize: '13px',
                        padding: '4px 0',
                        width: '160px',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                  {/* Notification Bell */}
                  <button style={{ 
                    background: 'none', 
                    border: 'none', 
                    cursor: 'pointer',
                    color: '#64748b',
                    position: 'relative',
                    padding: '4px'
                  }}>
                    <IconBell />
                    <span style={{
                      position: 'absolute',
                      top: '0',
                      right: '0',
                      width: '8px',
                      height: '8px',
                      background: '#dc2626',
                      borderRadius: '50%',
                      border: '2px solid white'
                    }} />
                  </button>
                  {/* Company Selector */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '4px 12px 4px 8px',
                    background: 'white',
                    border: '1px solid rgba(18,38,63,0.08)',
                    borderRadius: '8px',
                    cursor: 'pointer'
                  }}>
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '6px',
                      background: '#0f4ea9',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: 600
                    }}>
                      ABC
                    </div>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#17263a' }}>
                      ABC Construction Co.
                    </span>
                    <IconChevronDown style={{ color: '#94a3b8' }} />
                  </div>
                </div>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b' }}>Welcome back! Here's what's happening with your projects.</p>
            </div>

            {/* KPI Cards */}
            <KPICards />

            {/* Middle Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr', 
              gap: '20px',
              marginTop: '24px'
            }}>
              <RecentProjectsTable />
              <QuickActions />
            </div>

            {/* Bottom Grid - 3 columns */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr 1fr', 
              gap: '20px',
              marginTop: '20px'
            }}>
              <WorkforceOverview />
              <UpcomingDeadlines />
              <MessagesWidget />
            </div>

            {/* Footer */}
            <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid rgba(18, 38, 63, 0.06)', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
              © 2026 TradesMap. All rights reserved.
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Styles */}
      <style>{`
        @media (max-width: 1200px) {
          div[style*="grid-template-columns: 1fr 1fr 1fr"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        
        @media (max-width: 768px) {
          .sideNav { display: none !important; }
          .appShellBody { grid-template-columns: 1fr !important; padding: 12px 16px !important; }
          
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          
          div[style*="grid-template-columns: 1fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }

          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
          
          /* Hide search on mobile */
          div[style*="display: flex"][style*="gap: 16px"] {
            gap: 8px !important;
          }
          
          div[style*="display: flex"][style*="Search"] {
            display: none !important;
          }
        }
        
        @media (min-width: 769px) {
          .sideNav { display: flex !important; }
          .appShellBody { grid-template-columns: 280px 1fr !important; }
        }
        
        @media (max-width: 480px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
          
          div[style*="display: flex"][style*="gap: 16px"] {
            flex-wrap: wrap !important;
          }
        }
      `}</style>
    </div>
  )
}

export default CompanyDashboardDemo