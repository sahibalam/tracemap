// src/company/pages/CompanyDashboardDemo.jsx
import { TopNav } from '../../common/components/TopNav'

// ============================================================
// 📊 STATS CARD COMPONENT
// ============================================================
function StatCard({ label, value, change, icon, isNegative }) {
  const isPositive = change > 0 && !isNegative
  const isNegativeChange = change < 0 || isNegative
  
  return (
    <div style={{ 
      padding: '20px', 
      background: 'white', 
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '13px', color: '#64748b', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: '20px' }}>{icon}</span>
      </div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: '#17263a' }}>{value}</div>
      {change !== undefined && (
        <div style={{ 
          fontSize: '13px', 
          color: isPositive ? '#2fb463' : isNegativeChange ? '#dc2626' : '#64748b',
          fontWeight: 500,
          marginTop: '4px'
        }}>
          {isPositive ? '↑' : isNegativeChange ? '↓' : ''} {Math.abs(change)}% from last month
        </div>
      )}
    </div>
  )
}

// ============================================================
// 📊 DASHBOARD STATS
// ============================================================
function DashboardStats({ stats }) {
  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(4, 1fr)', 
      gap: '16px' 
    }}>
      <StatCard 
        label="Projects" 
        value={stats.projects} 
        change={stats.projectsGrowth} 
        icon="📋"
      />
      <StatCard 
        label="Workforce" 
        value={stats.workforce} 
        change={stats.workforceGrowth} 
        icon="👷"
      />
      <StatCard 
        label="Active Workforce" 
        value={stats.activeWorkforce} 
        change={stats.activeWorkforceGrowth} 
        icon="✅"
      />
      <StatCard 
        label="Total Reports" 
        value={`$${stats.totalReports.toLocaleString()}`} 
        change={stats.reportsChange}
        isNegative
        icon="📊"
      />
    </div>
  )
}

// ============================================================
// 🏷️ STATUS BADGE
// ============================================================
function StatusBadge({ status }) {
  const colors = {
    'In Progress': { bg: 'rgba(15, 78, 169, 0.1)', text: '#0f4ea9' },
    'Open': { bg: 'rgba(47, 180, 99, 0.1)', text: '#2fb463' },
    'Pending': { bg: 'rgba(245, 158, 11, 0.1)', text: '#f59e0b' },
    'Closed': { bg: 'rgba(148, 163, 184, 0.1)', text: '#64748b' },
    'On Hold': { bg: 'rgba(220, 38, 38, 0.1)', text: '#dc2626' }
  }
  
  const style = colors[status] || colors['Pending']
  
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
// 📋 RECENT PROJECTS TABLE
// ============================================================
function RecentProjectsTable({ projects }) {
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a', marginBottom: '16px' }}>
        Recent Projects
      </h3>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(18,38,63,0.06)' }}>
              <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Project Name</th>
              <th style={{ textAlign: 'left', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Location</th>
              <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Workers</th>
              <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
              <th style={{ textAlign: 'center', padding: '10px 12px', fontSize: '12px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Due Date</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ============================================================
// ⚡ QUICK ACTIONS
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
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a', marginBottom: '16px' }}>
        Quick Actions
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        {actions.map((action, idx) => (
          <button
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 16px',
              background: 'rgba(15, 78, 169, 0.04)',
              border: '1px solid rgba(15, 78, 169, 0.08)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 500,
              color: '#17263a',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit',
              width: '100%'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'
              e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(15, 78, 169, 0.04)'
              e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.08)'
            }}
          >
            <span style={{ fontSize: '18px' }}>{action.icon}</span>
            {action.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================================================
// 👷 WORKFORCE OVERVIEW
// ============================================================
function WorkforceOverview({ data }) {
  const getBarColor = (status) => {
    const colors = {
      'On Site': '#0f4ea9',
      'Available': '#2fb463',
      'On Leave': '#f59e0b',
      'Unavailable': '#dc2626'
    }
    return colors[status] || '#94a3b8'
  }

  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a', marginBottom: '16px' }}>
        Workforce by Status
      </h3>
      
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
                background: getBarColor(item.status),
                borderRadius: '3px',
                transition: 'width 0.5s ease'
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
function UpcomingDeadlines({ deadlines }) {
  return (
    <div style={{ 
      background: 'white', 
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      border: '1px solid rgba(18,38,63,0.06)'
    }}>
      <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#17263a', marginBottom: '16px' }}>
        Upcoming Deadlines
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
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
              color: getDateColor(item.date),
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
// 🎨 DATE COLOR HELPER
// ============================================================
function getDateColor(dateStr) {
  if (!dateStr) return '#64748b'
  
  const today = new Date()
  const currentYear = today.getFullYear()
  
  // Parse date like "Jun 25" or "Jul 10 AM"
  const parts = dateStr.split(' ')
  const month = parts[0]
  const day = parseInt(parts[1])
  
  const monthMap = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  }
  
  const monthIndex = monthMap[month]
  if (monthIndex === undefined) return '#64748b'
  
  const dateObj = new Date(currentYear, monthIndex, day)
  
  // If the date is in the past, add a year
  if (dateObj < today) {
    dateObj.setFullYear(currentYear + 1)
  }
  
  const diff = Math.ceil((dateObj - today) / (1000 * 60 * 60 * 24))
  
  if (diff < 0) return '#dc2626'
  if (diff <= 3) return '#f59e0b'
  return '#0f4ea9'
}

// ============================================================
// 🎨 SIDEBAR ICONS
// ============================================================
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

function IconUser(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
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

// ============================================================
// 📱 MOBILE SIDEBAR CONTENT
// ============================================================
function MobileSidebarContent() {
  return (
    <>
      <div className="sideGroupLabel">WORKSPACE</div>
      <nav className="sideGroup" aria-label="Workspace">
        <a className="sideItem sideItemActive" href="#">
          <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
          <span className="sideText">Dashboard</span>
        </a>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
          <span className="sideText">Projects</span>
          <span className="sideBadge" aria-label="24 projects">24</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconUser /></span>
          <span className="sideText">Workforce</span>
          <span className="sideBadge" aria-label="156 workers">156</span>
        </span>
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconChart /></span>
          <span className="sideText">Reports</span>
        </span>
      </nav>

      <div className="sideGroupLabel">GENERAL</div>
      <nav className="sideGroup" aria-label="General">
        <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
          <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
          <span className="sideText">Support</span>
        </span>
      </nav>
    </>
  )
}

// ============================================================
// 📊 MOCK DATA - EXACT MATCH OF ATTACHMENT
// ============================================================
const mockStats = {
  projects: 24,
  projectsGrowth: 12,
  workforce: 156,
  workforceGrowth: 8,
  activeWorkforce: 48,
  activeWorkforceGrowth: 15,
  totalReports: 36750,
  reportsChange: -5
}

const mockProjects = [
  { name: 'Downtown Tower Build', location: 'New York, NY', workers: 32, status: 'In Progress', dueDate: 'Jun 25, 2025' },
  { name: 'Westside Plaza', location: 'Los Angeles, CA', workers: 28, status: 'Open', dueDate: 'Jun 30, 2025' },
  { name: 'Airport Road Expansion', location: 'Austin, TX', workers: 45, status: 'In Progress', dueDate: 'Jul 05, 2025' },
  { name: 'School Renovation', location: 'Chicago, IL', workers: 18, status: 'Pending', dueDate: 'Jul 10, 2025' },
  { name: 'Warehouse Construction', location: 'Dallas, TX', workers: 24, status: 'Open', dueDate: 'Jul 15, 2025' }
]

const mockWorkforce = [
  { status: 'On Site', count: 92, percentage: 59 },
  { status: 'Available', count: 38, percentage: 24 },
  { status: 'On Leave', count: 16, percentage: 10 },
  { status: 'Unavailable', count: 10, percentage: 7 }
]

const mockDeadlines = [
  { project: 'Downtown Tower Build', task: 'Material Approval', date: 'Jun 25' },
  { project: 'Westside Plaza', task: 'Workforce Review', date: 'Jun 30' },
  { project: 'Airport Road Expansion', task: 'Progress Report', date: 'Jul 05' },
  { from: 'John Doe', message: 'Please review the updated project...', date: 'Jul 10 AM' },
  { from: 'Sarah Miller', message: 'Workforce list for next week.', date: 'Jul 15 AM' },
  { from: 'Admin Team', message: 'Your project has been approved.', date: 'Jul 20 AM' }
]

// ============================================================
// 🏠 MAIN PAGE COMPONENT
// ============================================================
export function CompanyDashboardDemo() {
  return (
    <div className="appShell">
      <TopNav variant="solid" mobileMenuContent={<MobileSidebarContent />} />

      <div className="appShellBody appShellBodyDashboard">
        {/* Sidebar */}
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true"><IconGrid /></span>
                <span className="sideText">Dashboard</span>
              </a>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconFolder /></span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="24 projects">24</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconUser /></span>
                <span className="sideText">Workforce</span>
                <span className="sideBadge" aria-label="156 workers">156</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconChart /></span>
                <span className="sideText">Reports</span>
              </span>
            </nav>
          </div>

          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup" aria-label="General">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true"><IconSupport /></span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="appContent">
          <div className="dashboardPage" style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
            {/* Demo Banner */}
            <div style={{ 
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)', 
              padding: '12px 20px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              border: '1px solid #f59e0b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              <span style={{ color: '#92400e', fontWeight: 500 }}>
                🎯 Preview - Mock Data
              </span>
              <span style={{ fontSize: '12px', color: '#92400e' }}>
                No login required
              </span>
            </div>

            {/* Welcome Header */}
            <div style={{ marginBottom: '24px' }}>
              <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#17263a' }}>Dashboard</h1>
              <p style={{ fontSize: '14px', color: '#64748b' }}>Welcome back! Here's what's happening with your projects.</p>
            </div>

            {/* Stats Cards */}
            <DashboardStats stats={mockStats} />

            {/* Main Content Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '2fr 1fr', 
              gap: '20px',
              marginTop: '24px'
            }}>
              <RecentProjectsTable projects={mockProjects} />
              <QuickActions />
            </div>

            {/* Bottom Grid */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '20px',
              marginTop: '20px'
            }}>
              <WorkforceOverview data={mockWorkforce} />
              <UpcomingDeadlines deadlines={mockDeadlines} />
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
        @media (max-width: 768px) {
          .sideNav { display: none !important; }
          .appShellBody { grid-template-columns: 1fr !important; padding: 12px 16px !important; }
          
          .dashboardPage > div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          
          .dashboardPage > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }

          .dashboardPage > div:first-of-type[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 769px) {
          .sideNav { display: flex !important; }
          .appShellBody { grid-template-columns: 300px 1fr !important; }
        }
        @media (max-width: 480px) {
          .dashboardPage > div:first-of-type[style*="grid-template-columns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default CompanyDashboardDemo