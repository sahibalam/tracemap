// src/company/pages/CompanyDashboardDemo.jsx
import { TopNav } from '../../common/components/TopNav'
import DashboardStats from '../components/dashboard/DashboardStats'
import RecentProjectsTable from '../components/dashboard/RecentProjectsTable'
import QuickActions from '../components/dashboard/QuickActions'
import WorkforceOverview from '../components/dashboard/WorkforceOverview'
import UpcomingDeadlines from '../components/dashboard/UpcomingDeadlines'

// Mock Data
const mockStats = {
  projects: 24,
  projectsGrowth: 12,
  workforce: 156,
  workforceGrowth: 8,
  totalReports: 48,
  outstanding: 36750,
  outstandingChange: -5
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
  { from: 'John Doe', message: 'Please review the updated project...', date: 'Jul 05' },
  { from: 'Sarah Miller', message: 'Workforce list for next week.', date: 'Jul 05' },
  { from: 'Admin Team', message: 'Your project has been approved.', date: 'Jul 05' }
]

// Sidebar Icons (same as before)
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

// Mobile Sidebar Content
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
              justifyContent: 'space-between'
            }}>
              <span style={{ color: '#92400e', fontWeight: 500 }}>
                🎯 Demo Preview - Mock Data Only
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
        }
        @media (min-width: 769px) {
          .sideNav { display: flex !important; }
          .appShellBody { grid-template-columns: 300px 1fr !important; }
        }
      `}</style>
    </div>
  )
}

export default CompanyDashboardDemo