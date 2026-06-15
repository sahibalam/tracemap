// src/worker/pages/WorkerSummaryPage.jsx
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'

export function WorkerSummaryPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const data = location?.state ?? {}

  return (
    <div className="appShell">
      <TopNav variant="solid" />
      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue">
          <div className="sideNavHeader">
            <div className="sideMark"><img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" /></div>
            <div className="sideMeta"><div className="sideTitle">Tradesmap</div></div>
          </div>
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup">
              <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconGrid /></span><span className="sideText">Overview</span></span>
              <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconFolder /></span><span className="sideText">Projects</span><span className="sideBadge">12</span></span>
              <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconChart /></span><span className="sideText">Revenues</span></span>
              <a className="sideItem sideItemActive" href="#"><span className="sideIcon"><IconUser /></span><span className="sideText">Profile</span></a>
            </nav>
          </div>
          <div className="sideNavBottom">
            <div className="sideGroupLabel">GENERAL</div>
            <nav className="sideGroup">
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}><span className="sideIcon"><IconLogout /></span><span className="sideText">Sign out</span></button>
              <span className="sideItem sideItemDisabled"><span className="sideIcon"><IconSupport /></span><span className="sideText">Support</span></span>
            </nav>
          </div>
        </aside>
        <main className="appContent">
          <div style={{ padding: '40px', textAlign: 'center' }}>
            <h2>Registration Complete!</h2>
            <p>Thank you for registering with TradesMap.</p>
            <button className="btn btnPrimary" onClick={() => navigate('/')}>Go to Home</button>
          </div>
        </main>
      </div>
    </div>
  )
}

// Icons
function IconGrid(props) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/></svg>
}
function IconFolder(props) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/></svg>
}
function IconChart(props) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/></svg>
}
function IconLogout(props) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/></svg>
}
function IconSupport(props) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor"/></svg>
}
function IconUser(props) {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}><path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/></svg>
}