// // src/company/pages/CompanyDashboardDemo.jsx
// // 100% PIXEL-PERFECT MIRROR OF THE ATTACHMENT
// import { useState } from 'react'

// // ============================================================
// // 🎨 EXACT SVG ICONS (Matching the design perfectly)
// // ============================================================

// // Sidebar Icons
// function IconDashboard({ active, ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" fill={active ? 'white' : 'currentColor'}/>
//     </svg>
//   )
// }

// function IconProjects({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M20 6h-8l-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 12H4V8h16v10z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconWorkforce({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconBilling({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M11.5 1L2 6v2l9.5-5L21 8V6l-9.5-5zM2 18l9.5 5L21 18v-2l-9.5 5L2 16v2zm0-7l9.5 5L21 11V9l-9.5 5L2 9v2z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconReports({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconMessages({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconProfile({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconSubscription({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V6h16v12zM6 10h2v2H6zm0 4h8v2H6zm10 0h2v2h-2zm-6-4h8v2h-8z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconSettings({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconHelp({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconSupport({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconSignOut({ ...props }) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
//     </svg>
//   )
// }

// // Header Icons
// function IconSearch({ ...props }) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconBell({ ...props }) {
//   return (
//     <svg width="22" height="22" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconChevronDown({ ...props }) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// function IconMoreVertical({ ...props }) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
//     </svg>
//   )
// }

// function IconDotsHorizontal({ ...props }) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" fill="currentColor"/>
//     </svg>
//   )
// }

// // Stats Card Icons
// function IconProjectsCard({ ...props }) {
//   return (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
//       <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
//       <path d="M16 21V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v16" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
//   )
// }

// function IconWorkforceCard({ ...props }) {
//   return (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
//       <circle cx="9" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
//       <circle cx="18" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
//       <path d="M4 18v2h10v-2c0-2.76-2.24-5-5-5S4 15.24 4 18z" stroke="currentColor" strokeWidth="1.5"/>
//       <path d="M13 15.5c1.5.5 3 1.5 3 3.5v2h4v-2c0-2.24-1.83-3.83-4-4" stroke="currentColor" strokeWidth="1.5"/>
//     </svg>
//   )
// }

// function IconReportsCard({ ...props }) {
//   return (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
//       <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="1.5"/>
//       <path d="M7 14l3-3 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// function IconOutstandingCard({ ...props }) {
//   return (
//     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props}>
//       <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
//       <path d="M12 7v10M9 10l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   )
// }

// // ============================================================
// // 📱 MOBILE SIDEBAR CONTENT
// // ============================================================
// function MobileSidebarContent() {
//   return (
//     <>
//       <div style={{ padding: '12px 16px 16px 16px' }}>
//         <img src="/assets/logo_tradesmap.png" alt="TradesMap" style={{ height: '32px' }} />
//       </div>
//       <div className="sideGroupLabel">WORKSPACE</div>
//       <nav className="sideGroup" aria-label="Workspace">
//         <a className="sideItem sideItemActive" href="#">
//           <span className="sideIcon" aria-hidden="true"><IconDashboard active={true} /></span>
//           <span className="sideText">Dashboard</span>
//         </a>
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconProjects /></span>
//           <span className="sideText">Projects</span>
//           <span className="sideBadge">24</span>
//         </span>
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconWorkforce /></span>
//           <span className="sideText">Workforce</span>
//           <span className="sideBadge">156</span>
//         </span>
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconBilling /></span>
//           <span className="sideText">Billing</span>
//         </span>
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconReports /></span>
//           <span className="sideText">Reports</span>
//         </span>
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconMessages /></span>
//           <span className="sideText">Messages</span>
//           <span className="sideBadge">3</span>
//         </span>
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconProfile /></span>
//           <span className="sideText">Profile</span>
//         </span>
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconSubscription /></span>
//           <span className="sideText">Subscription</span>
//         </span>
//       </nav>

//       <div className="sideGroupLabel">SYSTEM</div>
//       <nav className="sideGroup" aria-label="System">
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconSettings /></span>
//           <span className="sideText">Settings</span>
//         </span>
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconHelp /></span>
//           <span className="sideText">Help</span>
//         </span>
//         <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//           <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
//           <span className="sideText">Support</span>
//         </span>
//         <button type="button" className="sideItem sideItemButton" style={{ color: '#dc2626' }}>
//           <span className="sideIcon" aria-hidden="true"><IconSignOut /></span>
//           <span className="sideText">Sign Out</span>
//         </button>
//       </nav>
//     </>
//   )
// }

// // ============================================================
// // 🏷️ STATUS BADGE
// // ============================================================
// function StatusBadge({ status }) {
//   const colors = {
//     'In Progress': { bg: '#e8f0fe', text: '#0f4ea9' },
//     'Open': { bg: '#e6f7ed', text: '#2fb463' },
//     'Pending': { bg: '#fef3c7', text: '#f59e0b' }
//   }
  
//   const style = colors[status] || { bg: '#f1f5f9', text: '#64748b' }
  
//   return (
//     <span style={{ 
//       display: 'inline-block', 
//       padding: '4px 14px', 
//       borderRadius: '20px', 
//       fontSize: '12px', 
//       fontWeight: 500,
//       background: style.bg,
//       color: style.text,
//       letterSpacing: '0.2px'
//     }}>
//       {status}
//     </span>
//   )
// }

// // ============================================================
// // 🥧 DOUGHNUT CHART
// // ============================================================
// function DoughnutChart({ data, total }) {
//   const colors = ['#0f4ea9', '#2fb463', '#f59e0b', '#dc2626']
//   const radius = 60
//   const strokeWidth = 20
//   const circumference = 2 * Math.PI * radius
  
//   let cumulativeAngle = 0
  
//   return (
//     <svg width="150" height="150" viewBox="0 0 150 150">
//       {data.map((item, index) => {
//         const percentage = item.percentage / 100
//         const dashArray = percentage * circumference
//         const dashOffset = -cumulativeAngle
//         cumulativeAngle += percentage * circumference
        
//         return (
//           <circle
//             key={index}
//             cx="75"
//             cy="75"
//             r={radius}
//             fill="none"
//             stroke={colors[index % colors.length]}
//             strokeWidth={strokeWidth}
//             strokeDasharray={`${dashArray} ${circumference}`}
//             strokeDashoffset={dashOffset}
//             strokeLinecap="round"
//             transform="rotate(-90 75 75)"
//           />
//         )
//       })}
//       <circle cx="75" cy="75" r="38" fill="white" />
//       <text x="75" y="72" textAnchor="middle" fontSize="20" fontWeight="700" fill="#17263a">
//         {total}
//       </text>
//       <text x="75" y="92" textAnchor="middle" fontSize="10" fontWeight="500" fill="#94a3b8">
//         Total
//       </text>
//     </svg>
//   )
// }

// // ============================================================
// // 📊 KPI CARDS
// // ============================================================
// function KPICards() {
//   const stats = [
//     { label: 'Total Projects', value: '24', change: '12%', icon: <IconProjectsCard />, color: '#0f4ea9', bg: '#e8f0fe' },
//     { label: 'Active Workforce', value: '48', change: '15%', icon: <IconWorkforceCard />, color: '#2fb463', bg: '#e6f7ed' },
//     { label: 'Total Reports', value: '156', change: '8%', icon: <IconReportsCard />, color: '#f59e0b', bg: '#fef3c7' },
//     { label: 'Outstanding', value: '$36,750', change: '-5%', icon: <IconOutstandingCard />, color: '#dc2626', bg: '#fee2e2' }
//   ]

//   return (
//     <div style={{ 
//       display: 'grid', 
//       gridTemplateColumns: 'repeat(4, 1fr)', 
//       gap: '16px',
//       marginBottom: '24px'
//     }}>
//       {stats.map((stat, idx) => (
//         <div key={idx} style={{ 
//           padding: '20px 20px 18px 20px', 
//           background: 'white', 
//           borderRadius: '16px',
//           boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
//           border: '1px solid rgba(18,38,63,0.06)',
//           transition: 'all 0.2s ease'
//         }}
//         onMouseEnter={(e) => {
//           e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06), 0 2px 4px rgba(0,0,0,0.02)'
//           e.currentTarget.style.transform = 'translateY(-2px)'
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)'
//           e.currentTarget.style.transform = 'translateY(0)'
//         }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
//             <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{stat.label}</span>
//             <div style={{ 
//               width: '40px', 
//               height: '40px', 
//               borderRadius: '10px', 
//               background: stat.bg,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: stat.color
//             }}>
//               {stat.icon}
//             </div>
//           </div>
//           <div style={{ fontSize: '26px', fontWeight: 700, color: '#17263a', letterSpacing: '-0.5px' }}>{stat.value}</div>
//           <div style={{ 
//             fontSize: '13px', 
//             color: stat.change.startsWith('-') ? '#dc2626' : '#2fb463',
//             fontWeight: 500, 
//             marginTop: '6px',
//             display: 'flex',
//             alignItems: 'center',
//             gap: '4px'
//           }}>
//             <span>{stat.change.startsWith('-') ? '↓' : '↑'} {stat.change.replace('-', '')}</span>
//             <span style={{ color: '#94a3b8', fontWeight: 400 }}>from last month</span>
//           </div>
//         </div>
//       ))}
//     </div>
//   )
// }

// // ============================================================
// // 📋 RECENT PROJECTS TABLE
// // ============================================================
// function RecentProjectsTable() {
//   const [hoveredRow, setHoveredRow] = useState(null)
  
//   const projects = [
//     { name: 'Downtown Tower Build', location: 'New York, NY', workers: 32, status: 'In Progress', dueDate: 'Jun 25, 2025' },
//     { name: 'Westside Plaza', location: 'Los Angeles, CA', workers: 28, status: 'Open', dueDate: 'Jun 30, 2025' },
//     { name: 'Airport Road Expansion', location: 'Austin, TX', workers: 45, status: 'In Progress', dueDate: 'Jul 05, 2025' },
//     { name: 'School Renovation', location: 'Chicago, IL', workers: 18, status: 'Pending', dueDate: 'Jul 10, 2025' },
//     { name: 'Warehouse Construction', location: 'Dallas, TX', workers: 24, status: 'Open', dueDate: 'Jul 15, 2025' }
//   ]

//   return (
//     <div style={{ 
//       background: 'white', 
//       borderRadius: '16px',
//       padding: '20px 20px 16px 20px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
//       border: '1px solid rgba(18,38,63,0.06)'
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//         <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Recent Projects</h3>
//         <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}>
//           View All →
//         </a>
//       </div>
      
//       <div style={{ overflowX: 'auto' }}>
//         <table style={{ width: '100%', borderCollapse: 'collapse' }}>
//           <thead>
//             <tr style={{ borderBottom: '1px solid rgba(18,38,63,0.06)' }}>
//               <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Project Name</th>
//               <th style={{ textAlign: 'left', padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Location</th>
//               <th style={{ textAlign: 'center', padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Workers</th>
//               <th style={{ textAlign: 'center', padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Status</th>
//               <th style={{ textAlign: 'center', padding: '8px 12px', fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Due Date</th>
//               <th style={{ textAlign: 'center', padding: '8px 12px', width: '40px' }}>
//                 <IconMoreVertical style={{ color: '#94a3b8' }} />
//               </th>
//             </tr>
//           </thead>
//           <tbody>
//             {projects.map((project, idx) => (
//               <tr 
//                 key={idx} 
//                 style={{ 
//                   borderBottom: idx < projects.length - 1 ? '1px solid rgba(18,38,63,0.04)' : 'none',
//                   background: hoveredRow === idx ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
//                   transition: 'background 0.15s ease',
//                   cursor: 'pointer'
//                 }}
//                 onMouseEnter={() => setHoveredRow(idx)}
//                 onMouseLeave={() => setHoveredRow(null)}
//               >
//                 <td style={{ padding: '12px 12px', fontSize: '14px', fontWeight: 500, color: '#17263a' }}>{project.name}</td>
//                 <td style={{ padding: '12px 12px', fontSize: '13px', color: '#64748b' }}>{project.location}</td>
//                 <td style={{ padding: '12px 12px', fontSize: '13px', textAlign: 'center', color: '#17263a', fontWeight: 500 }}>{project.workers}</td>
//                 <td style={{ padding: '12px 12px', textAlign: 'center' }}>
//                   <StatusBadge status={project.status} />
//                 </td>
//                 <td style={{ padding: '12px 12px', fontSize: '13px', textAlign: 'center', color: '#64748b' }}>{project.dueDate}</td>
//                 <td style={{ padding: '12px 12px', textAlign: 'center' }}>
//                   <button style={{ 
//                     background: 'none', 
//                     border: 'none', 
//                     cursor: 'pointer', 
//                     color: '#94a3b8',
//                     padding: '4px 8px',
//                     borderRadius: '6px',
//                     transition: 'background 0.15s ease'
//                   }}
//                   onMouseEnter={(e) => {
//                     e.currentTarget.style.background = 'rgba(18,38,63,0.06)'
//                   }}
//                   onMouseLeave={(e) => {
//                     e.currentTarget.style.background = 'transparent'
//                   }}>
//                     <IconDotsHorizontal />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // ⚡ QUICK ACTIONS - VERTICAL CARDS
// // ============================================================
// function QuickActions() {
//   const [hoveredAction, setHoveredAction] = useState(null)
  
//   const actions = [
//     { icon: '📋', label: 'Create New Project', description: 'Start a new construction project', color: '#0f4ea9' },
//     { icon: '👷', label: 'Add Workforce', description: 'Add workers to your team', color: '#2fb463' },
//     { icon: '📊', label: 'Create Report', description: 'Generate project reports', color: '#f59e0b' },
//     { icon: '✉️', label: 'Send Message', description: 'Communicate with your team', color: '#8b5cf6' },
//     { icon: '📅', label: 'View Calendar', description: 'Check project schedule', color: '#ec4899' }
//   ]
  
//   return (
//     <div style={{ 
//       background: 'white', 
//       borderRadius: '16px',
//       padding: '20px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
//       border: '1px solid rgba(18,38,63,0.06)'
//     }}>
//       <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a', marginBottom: '16px' }}>Quick Actions</h3>
      
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//         {actions.map((action, idx) => (
//           <div
//             key={idx}
//             style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '14px',
//               padding: '14px 16px',
//               background: hoveredAction === idx ? 'rgba(15, 78, 169, 0.03)' : 'white',
//               border: '1px solid rgba(18,38,63,0.06)',
//               borderRadius: '12px',
//               cursor: 'pointer',
//               transition: 'all 0.2s ease',
//               boxShadow: hoveredAction === idx ? '0 2px 8px rgba(0,0,0,0.06)' : 'none'
//             }}
//             onMouseEnter={() => setHoveredAction(idx)}
//             onMouseLeave={() => setHoveredAction(null)}
//           >
//             <div style={{ 
//               width: '36px', 
//               height: '36px', 
//               borderRadius: '10px', 
//               background: `${action.color}10`,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               fontSize: '18px',
//               flexShrink: 0
//             }}>
//               {action.icon}
//             </div>
//             <div style={{ flex: 1 }}>
//               <div style={{ fontSize: '14px', fontWeight: 500, color: '#17263a' }}>{action.label}</div>
//               <div style={{ fontSize: '12px', color: '#94a3b8' }}>{action.description}</div>
//             </div>
//             <div style={{ color: '#94a3b8', fontSize: '18px', transition: 'transform 0.2s ease', transform: hoveredAction === idx ? 'translateX(4px)' : 'none' }}>
//               →
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // 👷 WORKFORCE OVERVIEW - WITH DOUGHNUT CHART
// // ============================================================
// function WorkforceOverview() {
//   const [hoveredSegment, setHoveredSegment] = useState(null)
  
//   const data = [
//     { status: 'On Site', count: 92, percentage: 59, color: '#0f4ea9' },
//     { status: 'Available', count: 38, percentage: 24, color: '#2fb463' },
//     { status: 'On Leave', count: 16, percentage: 10, color: '#f59e0b' },
//     { status: 'Unavailable', count: 10, percentage: 7, color: '#dc2626' }
//   ]
  
//   const total = data.reduce((sum, item) => sum + item.count, 0)

//   return (
//     <div style={{ 
//       background: 'white', 
//       borderRadius: '16px',
//       padding: '20px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
//       border: '1px solid rgba(18,38,63,0.06)'
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//         <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Workforce by Status</h3>
//         <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}>
//           View All →
//         </a>
//       </div>
      
//       <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//         <div style={{ flexShrink: 0 }}>
//           <DoughnutChart data={data} total={total} />
//         </div>
//         <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
//           {data.map((item, idx) => (
//             <div 
//               key={idx} 
//               style={{ 
//                 display: 'flex', 
//                 alignItems: 'center', 
//                 gap: '10px',
//                 padding: '4px 8px',
//                 borderRadius: '6px',
//                 background: hoveredSegment === idx ? 'rgba(18,38,63,0.03)' : 'transparent',
//                 transition: 'background 0.15s ease',
//                 cursor: 'pointer'
//               }}
//               onMouseEnter={() => setHoveredSegment(idx)}
//               onMouseLeave={() => setHoveredSegment(null)}
//             >
//               <div style={{ 
//                 width: '10px', 
//                 height: '10px', 
//                 borderRadius: '3px', 
//                 background: item.color,
//                 flexShrink: 0
//               }} />
//               <div style={{ flex: 1 }}>
//                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
//                   <span style={{ color: '#17263a' }}>{item.status}</span>
//                   <span style={{ fontWeight: 600, color: '#17263a' }}>{item.count} ({item.percentage}%)</span>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // 📅 UPCOMING DEADLINES
// // ============================================================
// function UpcomingDeadlines() {
//   const [hoveredDeadline, setHoveredDeadline] = useState(null)
  
//   const deadlines = [
//     { project: 'Downtown Tower Build', task: 'Material Approval', date: 'Jun 25', color: '#0f4ea9', bg: '#e8f0fe' },
//     { project: 'Westside Plaza', task: 'Workforce Review', date: 'Jun 30', color: '#2fb463', bg: '#e6f7ed' },
//     { project: 'Airport Road Expansion', task: 'Progress Report', date: 'Jul 05', color: '#f59e0b', bg: '#fef3c7' }
//   ]

//   return (
//     <div style={{ 
//       background: 'white', 
//       borderRadius: '16px',
//       padding: '20px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
//       border: '1px solid rgba(18,38,63,0.06)'
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//         <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Upcoming Deadlines</h3>
//         <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}>
//           View All →
//         </a>
//       </div>
      
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//         {deadlines.map((item, idx) => (
//           <div 
//             key={idx}
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: '12px 14px',
//               background: hoveredDeadline === idx ? 'rgba(15, 78, 169, 0.03)' : 'white',
//               borderRadius: '10px',
//               border: '1px solid rgba(18,38,63,0.04)',
//               transition: 'all 0.15s ease',
//               cursor: 'pointer',
//               boxShadow: hoveredDeadline === idx ? '0 2px 8px rgba(0,0,0,0.04)' : 'none'
//             }}
//             onMouseEnter={() => setHoveredDeadline(idx)}
//             onMouseLeave={() => setHoveredDeadline(null)}
//           >
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//               <div style={{ 
//                 width: '32px', 
//                 height: '32px', 
//                 borderRadius: '8px', 
//                 background: item.bg,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '14px',
//                 fontWeight: 600,
//                 color: item.color
//               }}>
//                 {item.date.split(' ')[0].substring(0, 1)}
//               </div>
//               <div>
//                 <div style={{ fontSize: '14px', fontWeight: 500, color: '#17263a' }}>
//                   {item.project}
//                 </div>
//                 <div style={{ fontSize: '12px', color: '#94a3b8' }}>
//                   {item.task}
//                 </div>
//               </div>
//             </div>
//             <div style={{ 
//               display: 'flex',
//               alignItems: 'center',
//               gap: '8px'
//             }}>
//               <div style={{ 
//                 fontSize: '13px', 
//                 fontWeight: 600, 
//                 color: item.color,
//                 whiteSpace: 'nowrap',
//                 padding: '2px 10px',
//                 borderRadius: '12px',
//                 background: item.bg
//               }}>
//                 {item.date}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // ✉️ MESSAGES WIDGET
// // ============================================================
// function MessagesWidget() {
//   const [hoveredMessage, setHoveredMessage] = useState(null)
  
//   const messages = [
//     { from: 'John Doe', message: 'Please review the updated project...', date: 'Jul 10 AM', unread: true },
//     { from: 'Sarah Miller', message: 'Workforce list for next week.', date: 'Jul 15 AM', unread: false },
//     { from: 'Admin Team', message: 'Your project has been approved.', date: 'Jul 20 AM', unread: true }
//   ]

//   const colors = ['#0f4ea9', '#2fb463', '#8b5cf6']

//   return (
//     <div style={{ 
//       background: 'white', 
//       borderRadius: '16px',
//       padding: '20px',
//       boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
//       border: '1px solid rgba(18,38,63,0.06)'
//     }}>
//       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
//         <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Messages</h3>
//         <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500, cursor: 'pointer' }}>
//           View All →
//         </a>
//       </div>
      
//       <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
//         {messages.map((item, idx) => (
//           <div 
//             key={idx}
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: '10px 12px',
//               background: hoveredMessage === idx ? 'rgba(15, 78, 169, 0.03)' : 'transparent',
//               borderRadius: '10px',
//               transition: 'all 0.15s ease',
//               cursor: 'pointer',
//               border: hoveredMessage === idx ? '1px solid rgba(15, 78, 169, 0.08)' : '1px solid transparent'
//             }}
//             onMouseEnter={() => setHoveredMessage(idx)}
//             onMouseLeave={() => setHoveredMessage(null)}
//           >
//             <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: 0 }}>
//               <div style={{ 
//                 width: '34px', 
//                 height: '34px', 
//                 borderRadius: '50%', 
//                 background: colors[idx % colors.length],
//                 color: 'white',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '13px',
//                 fontWeight: 600,
//                 flexShrink: 0,
//                 position: 'relative'
//               }}>
//                 {item.from.charAt(0)}
//                 {item.unread && (
//                   <span style={{
//                     position: 'absolute',
//                     top: '-2px',
//                     right: '-2px',
//                     width: '8px',
//                     height: '8px',
//                     background: '#dc2626',
//                     borderRadius: '50%',
//                     border: '2px solid white'
//                   }} />
//                 )}
//               </div>
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ 
//                   fontSize: '14px', 
//                   fontWeight: item.unread ? 600 : 500, 
//                   color: '#17263a',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '6px'
//                 }}>
//                   {item.from}
//                   {item.unread && (
//                     <span style={{
//                       fontSize: '9px',
//                       fontWeight: 600,
//                       color: '#0f4ea9',
//                       background: '#e8f0fe',
//                       padding: '1px 8px',
//                       borderRadius: '10px'
//                     }}>
//                       New
//                     </span>
//                   )}
//                 </div>
//                 <div style={{ 
//                   fontSize: '12px', 
//                   color: '#94a3b8',
//                   whiteSpace: 'nowrap',
//                   overflow: 'hidden',
//                   textOverflow: 'ellipsis'
//                 }}>
//                   {item.message}
//                 </div>
//               </div>
//             </div>
//             <div style={{ 
//               fontSize: '11px', 
//               color: '#94a3b8',
//               whiteSpace: 'nowrap',
//               marginLeft: '12px',
//               flexShrink: 0
//             }}>
//               {item.date}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// // ============================================================
// // 🏠 MAIN PAGE - 100% PIXEL-PERFECT MIRROR
// // ============================================================
// export function CompanyDashboardDemo() {
//   return (
//     <div className="appShell">
//       {/* Custom TopNav replacement - using existing TopNav but with custom header */}
//       <nav className="topnav" style={{
//         position: 'sticky',
//         top: 0,
//         zIndex: 1000,
//         background: 'white',
//         borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
//         height: '64px',
//         display: 'flex',
//         alignItems: 'center',
//         padding: '0 24px'
//       }}>
//         <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
//             <img src="/assets/logo_tradesmap.png" alt="TradesMap" style={{ height: '32px' }} />
//           </div>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
//             {/* Search Bar */}
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               background: '#f8fafc',
//               border: '1px solid rgba(18,38,63,0.06)',
//               borderRadius: '12px',
//               padding: '6px 14px',
//               gap: '10px',
//               width: '220px',
//               transition: 'all 0.2s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.3)'
//               e.currentTarget.style.background = 'white'
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.borderColor = 'rgba(18,38,63,0.06)'
//               e.currentTarget.style.background = '#f8fafc'
//             }}>
//               <IconSearch style={{ color: '#94a3b8', width: '16px', height: '16px' }} />
//               <input 
//                 type="text" 
//                 placeholder="Search..." 
//                 style={{ 
//                   border: 'none', 
//                   outline: 'none', 
//                   fontSize: '13px',
//                   padding: '4px 0',
//                   width: '100%',
//                   fontFamily: 'inherit',
//                   background: 'transparent',
//                   color: '#17263a'
//                 }}
//               />
//             </div>
            
//             {/* Notification Bell */}
//             <div style={{ position: 'relative', cursor: 'pointer' }}>
//               <div style={{
//                 padding: '6px',
//                 borderRadius: '8px',
//                 transition: 'background 0.15s ease',
//                 color: '#64748b'
//               }}
//               onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(18,38,63,0.04)'}
//               onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
//                 <IconBell />
//               </div>
//               <span style={{
//                 position: 'absolute',
//                 top: '4px',
//                 right: '4px',
//                 width: '8px',
//                 height: '8px',
//                 background: '#dc2626',
//                 borderRadius: '50%',
//                 border: '2px solid white'
//               }} />
//             </div>
            
//             {/* Company Selector */}
//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               gap: '10px',
//               padding: '4px 12px 4px 8px',
//               background: 'white',
//               border: '1px solid rgba(18,38,63,0.06)',
//               borderRadius: '12px',
//               cursor: 'pointer',
//               transition: 'all 0.15s ease'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.3)'
//               e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)'
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.borderColor = 'rgba(18,38,63,0.06)'
//               e.currentTarget.style.boxShadow = 'none'
//             }}>
//               <div style={{
//                 width: '30px',
//                 height: '30px',
//                 borderRadius: '8px',
//                 background: 'linear-gradient(135deg, #0f4ea9, #0b3f90)',
//                 color: 'white',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 fontSize: '12px',
//                 fontWeight: 600,
//                 letterSpacing: '0.5px'
//               }}>
//                 ABC
//               </div>
//               <span style={{ fontSize: '13px', fontWeight: 500, color: '#17263a' }}>
//                 ABC Construction Co.
//               </span>
//               <IconChevronDown style={{ color: '#94a3b8' }} />
//             </div>
//           </div>
//         </div>
//       </nav>

//       <div className="appShellBody appShellBodyDashboard">
//         {/* Sidebar - Complete with all items */}
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation" style={{
//           width: '280px',
//           background: '#0f172a',
//           display: 'flex',
//           flexDirection: 'column',
//           height: 'calc(100vh - 64px)',
//           position: 'sticky',
//           top: '64px',
//           overflowY: 'auto',
//           padding: '20px 0'
//         }}>
//           <div style={{ padding: '0 20px 20px 20px' }}>
//             <img src="/assets/logo_tradesmap_white.png" alt="TradesMap" style={{ height: '28px' }} />
//           </div>
          
//           <div style={{ flex: 1 }}>
//             <div style={{ padding: '0 12px 8px 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
//               WORKSPACE
//             </div>
//             <nav style={{ padding: '0 12px' }}>
//               <a href="#" style={{
//                 display: 'grid',
//                 gridTemplateColumns: '24px 1fr auto',
//                 alignItems: 'center',
//                 gap: '14px',
//                 padding: '10px 12px',
//                 borderRadius: '10px',
//                 background: 'rgba(255,255,255,0.1)',
//                 color: 'white',
//                 textDecoration: 'none',
//                 fontSize: '14px',
//                 fontWeight: 500,
//                 transition: 'all 0.15s ease'
//               }}>
//                 <span style={{ display: 'flex', alignItems: 'center' }}><IconDashboard active={true} /></span>
//                 <span>Dashboard</span>
//               </a>
//               {['Projects', 'Workforce', 'Billing', 'Reports', 'Messages', 'Profile', 'Subscription'].map((item, idx) => (
//                 <div key={idx} style={{
//                   display: 'grid',
//                   gridTemplateColumns: '24px 1fr auto',
//                   alignItems: 'center',
//                   gap: '14px',
//                   padding: '10px 12px',
//                   borderRadius: '10px',
//                   color: 'rgba(255,255,255,0.6)',
//                   fontSize: '14px',
//                   fontWeight: 400,
//                   cursor: 'not-allowed',
//                   transition: 'all 0.15s ease',
//                   opacity: 0.7
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
//                   e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = 'transparent'
//                   e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
//                 }}>
//                   <span style={{ display: 'flex', alignItems: 'center' }}>
//                     {item === 'Projects' && <IconProjects />}
//                     {item === 'Workforce' && <IconWorkforce />}
//                     {item === 'Billing' && <IconBilling />}
//                     {item === 'Reports' && <IconReports />}
//                     {item === 'Messages' && <IconMessages />}
//                     {item === 'Profile' && <IconProfile />}
//                     {item === 'Subscription' && <IconSubscription />}
//                   </span>
//                   <span>{item}</span>
//                   {(item === 'Projects' || item === 'Workforce' || item === 'Messages') && (
//                     <span style={{
//                       fontSize: '11px',
//                       fontWeight: 700,
//                       padding: '2px 8px',
//                       borderRadius: '12px',
//                       background: 'rgba(255,255,255,0.12)',
//                       color: 'rgba(255,255,255,0.6)'
//                     }}>
//                       {item === 'Projects' ? '24' : item === 'Workforce' ? '156' : '3'}
//                     </span>
//                   )}
//                 </div>
//               ))}
//             </nav>
//           </div>

//           <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
//             <div style={{ padding: '0 12px 8px 20px', fontSize: '11px', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
//               SYSTEM
//             </div>
//             <nav style={{ padding: '0 12px' }}>
//               {['Settings', 'Help', 'Support'].map((item, idx) => (
//                 <div key={idx} style={{
//                   display: 'grid',
//                   gridTemplateColumns: '24px 1fr',
//                   alignItems: 'center',
//                   gap: '14px',
//                   padding: '10px 12px',
//                   borderRadius: '10px',
//                   color: 'rgba(255,255,255,0.6)',
//                   fontSize: '14px',
//                   fontWeight: 400,
//                   cursor: 'not-allowed',
//                   transition: 'all 0.15s ease',
//                   opacity: 0.7
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
//                   e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.background = 'transparent'
//                   e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
//                 }}>
//                   <span style={{ display: 'flex', alignItems: 'center' }}>
//                     {item === 'Settings' && <IconSettings />}
//                     {item === 'Help' && <IconHelp />}
//                     {item === 'Support' && <IconSupport />}
//                   </span>
//                   <span>{item}</span>
//                 </div>
//               ))}
//               <div style={{
//                 display: 'grid',
//                 gridTemplateColumns: '24px 1fr',
//                 alignItems: 'center',
//                 gap: '14px',
//                 padding: '10px 12px',
//                 borderRadius: '10px',
//                 color: '#dc2626',
//                 fontSize: '14px',
//                 fontWeight: 400,
//                 cursor: 'pointer',
//                 transition: 'all 0.15s ease'
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)'
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent'
//               }}>
//                 <span style={{ display: 'flex', alignItems: 'center' }}><IconSignOut /></span>
//                 <span>Sign Out</span>
//               </div>
//             </nav>
//           </div>
//         </aside>

//         {/* Main Content */}
//         <main style={{
//           flex: 1,
//           padding: '24px 32px',
//           background: '#f8fafc',
//           minHeight: 'calc(100vh - 64px)',
//           overflowY: 'auto'
//         }}>
//           <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
//             {/* Welcome Header */}
//             <div style={{ marginBottom: '24px' }}>
//               <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#17263a', marginBottom: '4px' }}>Dashboard</h1>
//               <p style={{ fontSize: '14px', color: '#64748b' }}>Welcome back! Here's what's happening with your projects.</p>
//             </div>

//             {/* KPI Cards */}
//             <KPICards />

//             {/* Middle Grid */}
//             <div style={{ 
//               display: 'grid', 
//               gridTemplateColumns: '2fr 1fr', 
//               gap: '20px',
//               marginTop: '24px'
//             }}>
//               <RecentProjectsTable />
//               <QuickActions />
//             </div>

//             {/* Bottom Grid - 3 columns */}
//             <div style={{ 
//               display: 'grid', 
//               gridTemplateColumns: '1fr 1fr 1fr', 
//               gap: '20px',
//               marginTop: '20px'
//             }}>
//               <WorkforceOverview />
//               <UpcomingDeadlines />
//               <MessagesWidget />
//             </div>

//             {/* Footer */}
//             <div style={{ marginTop: '32px', paddingTop: '16px', borderTop: '1px solid rgba(18, 38, 63, 0.06)', textAlign: 'center' }}>
//               <span style={{ fontSize: '12px', color: '#94a3b8' }}>© 2026 TradesMap. All rights reserved.</span>
//             </div>
//           </div>
//         </main>
//       </div>

//       {/* Mobile Styles */}
//       <style>{`
//         @media (max-width: 1200px) {
//           div[style*="grid-template-columns: 1fr 1fr 1fr"] {
//             grid-template-columns: 1fr 1fr !important;
//           }
//         }
        
//         @media (max-width: 768px) {
//           .sideNav { display: none !important; }
//           .appShellBody { grid-template-columns: 1fr !important; padding: 0 !important; }
//           main { padding: 16px !important; }
          
//           div[style*="grid-template-columns: 2fr 1fr"] {
//             grid-template-columns: 1fr !important;
//           }
          
//           div[style*="grid-template-columns: 1fr 1fr 1fr"] {
//             grid-template-columns: 1fr !important;
//           }

//           div[style*="grid-template-columns: repeat(4, 1fr)"] {
//             grid-template-columns: 1fr 1fr !important;
//           }
          
//           /* Hide search on mobile */
//           div[style*="width: 220px"] {
//             display: none !important;
//           }
          
//           .topnav {
//             padding: 0 16px !important;
//           }
//         }
        
//         @media (min-width: 769px) {
//           .sideNav { display: flex !important; }
//           .appShellBody { grid-template-columns: 280px 1fr !important; }
//         }
        
//         @media (max-width: 480px) {
//           div[style*="grid-template-columns: repeat(4, 1fr)"] {
//             grid-template-columns: 1fr !important;
//           }
//         }
//       `}</style>
//     </div>
//   )
// }

// export default CompanyDashboardDemo





// src/company/pages/CompanyDashboardDemo.jsx
// FIXED: Correct values, white sidebar, proper styling
import { TopNav } from '../../common/components/TopNav'

// ============================================================
// 📱 MOBILE SIDEBAR CONTENT
// ============================================================
function MobileSidebarContent() {
  return (
    <>
      <div className="sideGroupLabel">WORKSPACE</div>
      <nav className="sideGroup" aria-label="Workspace">
        <a className="sideItem sideItemActive" href="#">
          <span className="sideIcon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
            </svg>
          </span>
          <span className="sideText">Dashboard</span>
        </a>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
            </svg>
          </span>
          <span className="sideText">Projects</span>
          <span className="sideBadge">24</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
            </svg>
          </span>
          <span className="sideText">Workforce</span>
          <span className="sideBadge">156</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
            </svg>
          </span>
          <span className="sideText">Reports</span>
        </span>
      </nav>

      <div className="sideGroupLabel">GENERAL</div>
      <nav className="sideGroup" aria-label="General">
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor"/>
            </svg>
          </span>
          <span className="sideText">Support</span>
        </span>
      </nav>
    </>
  )
}

// ============================================================
// 🏷️ STATUS BADGE
// ============================================================
function StatusBadge({ status }) {
  const colors = {
    'In Progress': { bg: '#e8f0fe', text: '#0f4ea9' },
    'Open': { bg: '#e6f7ed', text: '#2fb463' },
    'Pending': { bg: '#fef3c7', text: '#f59e0b' }
  }
  
  const style = colors[status] || { bg: '#f1f5f9', text: '#64748b' }
  
  return (
    <span style={{ 
      display: 'inline-block', 
      padding: '4px 14px', 
      borderRadius: '20px', 
      fontSize: '12px', 
      fontWeight: 500,
      background: style.bg,
      color: style.text
    }}>
      {status}
    </span>
  )
}

// ============================================================
// 📊 STATS CARDS - CORRECT VALUES
// ============================================================
function DashboardStats() {
  // ✅ CORRECT ORDER AND VALUES
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '20px',
      marginBottom: '28px'
    }}>
      {/* Total Projects - 24 ↑ 12% */}
      <div style={{ 
        padding: '22px 24px', 
        background: 'white', 
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        border: '1px solid rgba(18,38,63,0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Total Projects</span>
          <div style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '50%', 
            background: '#e8f0fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f4ea9'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M16 21V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v16" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#17263a' }}>24</div>
        <div style={{ fontSize: '13px', color: '#2fb463', fontWeight: 500, marginTop: '4px' }}>↑ 12% from last month</div>
      </div>

      {/* Active Workforce - 156 ↑ 8% */}
      <div style={{ 
        padding: '22px 24px', 
        background: 'white', 
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        border: '1px solid rgba(18,38,63,0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Active Workforce</span>
          <div style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '50%', 
            background: '#e6f7ed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#2fb463'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="9" cy="8" r="4" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="18" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M4 18v2h10v-2c0-2.76-2.24-5-5-5S4 15.24 4 18z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 15.5c1.5.5 3 1.5 3 3.5v2h4v-2c0-2.24-1.83-3.83-4-4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </div>
        </div>
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#17263a' }}>156</div>
        <div style={{ fontSize: '13px', color: '#2fb463', fontWeight: 500, marginTop: '4px' }}>↑ 8% from last month</div>
      </div>

      {/* Total Reports - 48 ↑ 15% */}
      <div style={{ 
        padding: '22px 24px', 
        background: 'white', 
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        border: '1px solid rgba(18,38,63,0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Total Reports</span>
          <div style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '50%', 
            background: '#fef3c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#f59e0b'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M7 14l3-3 2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#17263a' }}>48</div>
        <div style={{ fontSize: '13px', color: '#2fb463', fontWeight: 500, marginTop: '4px' }}>↑ 15% from last month</div>
      </div>

      {/* Outstanding - $36,750 ↓ 5% */}
      <div style={{ 
        padding: '22px 24px', 
        background: 'white', 
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
        border: '1px solid rgba(18,38,63,0.06)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '14px', color: '#64748b', fontWeight: 500 }}>Outstanding</span>
          <div style={{ 
            width: '44px', 
            height: '44px', 
            borderRadius: '50%', 
            background: '#fee2e2',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#dc2626'
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M12 7v10M9 10l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <div style={{ fontSize: '28px', fontWeight: 700, color: '#17263a' }}>$36,750</div>
        <div style={{ fontSize: '13px', color: '#dc2626', fontWeight: 500, marginTop: '4px' }}>↓ 5% from last month</div>
      </div>
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
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Recent Projects</h3>
        <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500 }}>View All →</a>
      </div>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(18,38,63,0.06)' }}>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Project Name</th>
              <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</th>
              <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workers</th>
              <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
              <th style={{ textAlign: 'center', padding: '12px 16px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, idx) => (
              <tr key={idx} style={{ borderBottom: idx < projects.length - 1 ? '1px solid rgba(18,38,63,0.04)' : 'none' }}>
                <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 500, color: '#17263a' }}>{project.name}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{project.location}</td>
                <td style={{ padding: '14px 16px', fontSize: '13px', textAlign: 'center', color: '#17263a' }}>{project.workers}</td>
                <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                  <StatusBadge status={project.status} />
                </td>
                <td style={{ padding: '14px 16px', fontSize: '13px', textAlign: 'center', color: '#64748b' }}>{project.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================================
// ⚡ QUICK ACTIONS - SIMPLIFIED
// ============================================================
function QuickActions() {
  const actions = [
    { icon: '📋', label: 'Create New Project' },
    { icon: '👷', label: 'Add Workforce' },
    { icon: '📊', label: 'Create Report' },
    { icon: '✉️', label: 'Send Message' },
    { icon: '📅', label: 'View Calendar' }
  ]
  
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a', marginBottom: '16px' }}>Quick Actions</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {actions.map((action, idx) => (
          <button
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              background: 'white',
              border: '1px solid rgba(18,38,63,0.06)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 500,
              color: '#17263a',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
              width: '100%',
              textAlign: 'left'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
              e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.15)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white'
              e.currentTarget.style.borderColor = 'rgba(18,38,63,0.06)'
            }}
          >
            <span style={{ fontSize: '18px' }}>{action.icon}</span>
            {action.label}
            <span style={{ marginLeft: 'auto', color: '#94a3b8' }}>→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// 👷 WORKFORCE OVERVIEW
// ============================================================
function WorkforceOverview() {
  const data = [
    { status: 'On Site', count: 92, percentage: 59, color: '#0f4ea9' },
    { status: 'Available', count: 38, percentage: 24, color: '#2fb463' },
    { status: 'On Leave', count: 16, percentage: 10, color: '#f59e0b' },
    { status: 'Unavailable', count: 10, percentage: 7, color: '#dc2626' }
  ]

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Workforce by Status</h3>
        <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500 }}>View All →</a>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {data.map((item, idx) => (
          <div key={idx}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '13px', color: '#17263a' }}>{item.status}</span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#17263a' }}>
                {item.count} ({item.percentage}%)
              </span>
            </div>
            <div style={{ 
              height: '6px', 
              background: 'rgba(18,38,63,0.06)', 
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{ 
                width: `${item.percentage}%`, 
                height: '100%', 
                background: item.color,
                borderRadius: '3px'
              }} />
            </div>
          </div>
        ))}
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
    { project: 'Airport Road Expansion', task: 'Progress Report', date: 'Jul 05' },
    { from: 'John Doe', message: 'Please review the updated project...', date: 'Jul 10 AM' },
    { from: 'Sarah Miller', message: 'Workforce list for next week.', date: 'Jul 15 AM' },
    { from: 'Admin Team', message: 'Your project has been approved.', date: 'Jul 20 AM' }
  ]

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Upcoming Deadlines</h3>
        <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500 }}>View All →</a>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {deadlines.map((item, idx) => (
          <div 
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              background: idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
              borderRadius: '6px'
            }}
          >
            <div>
              {item.project ? (
                <>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#17263a' }}>
                    {item.project}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {item.task}
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: '13px', fontWeight: 500, color: '#17263a' }}>
                    {item.from}
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    {item.message}
                  </div>
                </>
              )}
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
      padding: '24px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a' }}>Messages</h3>
        <a href="#" style={{ fontSize: '13px', color: '#0f4ea9', textDecoration: 'none', fontWeight: 500 }}>View All →</a>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {messages.map((item, idx) => (
          <div 
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '10px 12px',
              background: idx % 2 === 0 ? 'rgba(15, 78, 169, 0.02)' : 'transparent',
              borderRadius: '6px'
            }}
          >
            <div>
              <div style={{ fontSize: '13px', fontWeight: 500, color: '#17263a' }}>
                {item.from}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                {item.message}
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
// 🏠 MAIN PAGE - With WHITE SIDEBAR
// ============================================================
export function CompanyDashboardDemo() {
  return (
    <div className="appShell">
      <TopNav variant="solid" mobileMenuContent={<MobileSidebarContent />} />

      <div className="appShellBody appShellBodyDashboard">
        {/* ✅ WHITE SIDEBAR - Matching the required design */}
        <aside className="sideNav" style={{
          width: '260px',
          background: 'white',
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px)',
          position: 'sticky',
          top: '64px',
          overflowY: 'auto',
          padding: '16px 0',
          borderRight: '1px solid rgba(18,38,63,0.06)'
        }}>
          <div style={{ padding: '0 16px 20px 16px' }}>
            <img src="/assets/logo_tradesmap.png" alt="TradesMap" style={{ height: '28px' }} />
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ padding: '0 12px 6px 16px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94a3b8' }}>
              WORKSPACE
            </div>
            <nav style={{ padding: '0 12px' }}>
              <a href="#" style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr auto',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                background: '#e8f0fe',
                color: '#0f4ea9',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: 500,
                transition: 'all 0.15s ease'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', color: '#0f4ea9' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
                  </svg>
                </span>
                <span>Dashboard</span>
              </a>
              {['Projects', 'Workforce', 'Reports'].map((item, idx) => (
                <div key={idx} style={{
                  display: 'grid',
                  gridTemplateColumns: '20px 1fr auto',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  color: '#64748b',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'not-allowed',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                    {item === 'Projects' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
                      </svg>
                    )}
                    {item === 'Workforce' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
                      </svg>
                    )}
                    {item === 'Reports' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
                      </svg>
                    )}
                  </span>
                  <span>{item}</span>
                  {(item === 'Projects' || item === 'Workforce') && (
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '1px 8px',
                      borderRadius: '12px',
                      background: '#f1f5f9',
                      color: '#64748b'
                    }}>
                      {item === 'Projects' ? '24' : '156'}
                    </span>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(18,38,63,0.06)' }}>
            <div style={{ padding: '0 12px 6px 16px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.8px', textTransform: 'uppercase', color: '#94a3b8' }}>
              GENERAL
            </div>
            <nav style={{ padding: '0 12px' }}>
              {['Help', 'Support'].map((item, idx) => (
                <div key={idx} style={{
                  display: 'grid',
                  gridTemplateColumns: '20px 1fr',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  color: '#64748b',
                  fontSize: '14px',
                  fontWeight: 400,
                  cursor: 'not-allowed',
                  transition: 'all 0.15s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent'
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', color: '#94a3b8' }}>
                    {item === 'Help' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" fill="currentColor"/>
                      </svg>
                    )}
                    {item === 'Support' && (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-13h-2v6h2V7zm0 8h-2v2h2v-2z" fill="currentColor"/>
                      </svg>
                    )}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '20px 1fr',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 14px',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '14px',
                fontWeight: 400,
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(220, 38, 38, 0.06)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" fill="currentColor"/>
                  </svg>
                </span>
                <span>Sign Out</span>
              </div>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main style={{
          flex: 1,
          padding: '24px 32px',
          background: '#f8fafc',
          minHeight: 'calc(100vh - 64px)',
          overflowY: 'auto'
        }}>
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#17263a' }}>Dashboard</h1>
              <p style={{ fontSize: '14px', color: '#64748b' }}>Welcome back! Here's what's happening with your projects.</p>
            </div>

            {/* Stats Cards - CORRECT VALUES */}
            <DashboardStats />

            {/* Main Grid */}
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
          main { padding: 16px !important; }
          
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          
          div[style*="grid-template-columns: 1fr 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }

          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        
        @media (min-width: 769px) {
          .sideNav { display: flex !important; }
          .appShellBody { grid-template-columns: 260px 1fr !important; }
        }
        
        @media (max-width: 480px) {
          div[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default CompanyDashboardDemo