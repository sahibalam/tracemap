import { TopNav } from '../common/components/TopNav'
import { Footer } from '../common/components/Footer'

export function AboutPage() {
  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="bg bgAuth" />
      <div className="bgOverlay" />
      <TopNav variant="solid" />
      <main style={{ flex: 1, padding: '40px 22px', maxWidth: 'var(--pageMax)', margin: '0 auto', width: '100%' }}>
        <div className="legalPage">
          <h1 className="legalTitle">About TradesMap</h1>
          <div className="legalContent">
            <p>TradesMap is a construction workforce technology platform built to connect skilled trade workers with the companies and projects that need them.</p>
            
            <p>We help contractors, subcontractors, and construction teams find, organize, and deploy qualified workers by trade, location, schedule, and project demand. Our platform is designed for real construction operations — not generic job postings — bringing together workforce planning, project staffing, worker availability, rate intelligence, and field execution in one connected system.</p>
            
            <p>Built around map-based coverage and construction-specific workflows, TradesMap gives companies a smarter way to manage manpower and gives skilled workers better access to real opportunities.</p>
            
            <p style={{ fontWeight: 600, marginTop: '16px' }}>Our mission is simple: move construction forward by connecting the right workers to the right projects, at the right time.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}