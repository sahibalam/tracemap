import { TopNav } from '../common/components/TopNav'
import { Footer } from '../common/components/Footer'

export function PrivacyPage() {
  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <div className="bg bgAuth" />
      <div className="bgOverlay" /> */}
      <TopNav variant="solid" />
      <main style={{ flex: 1, padding: '40px 22px', maxWidth: 'var(--pageMax)', margin: '0 auto', width: '100%' }}>
        <div className="legalPage">
          <h1 className="legalTitle">Privacy Policy</h1>
          <div className="legalContent">
            <h3>1. Introduction</h3>
            <p>Welcome to TradesMap ("TradesMap", "we", "our", or "us"). We are committed to protecting your privacy and ensuring that your personal information is handled responsibly.</p>
            <p>This Privacy Policy explains how TradesMap collects, uses, stores, shares, and protects information when you use our website, mobile applications, and related services (collectively, the "Platform").</p>
            <p>By accessing or using TradesMap, you agree to the collection and use of information in accordance with this Privacy Policy.</p>

            <h3>2. About TradesMap</h3>
            <p>TradesMap is a workforce management and project staffing platform that connects construction companies, contractors, project managers, and skilled workers for construction and infrastructure projects.</p>

            <h3>3. Information We Collect</h3>
            <h4>3.1 Information You Provide</h4>
            <p>We may collect information that you voluntarily provide, including:</p>
            <ul>
              <li>Full name</li>
              <li>Company name</li>
              <li>Job title</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Mailing address</li>
              <li>Profile information</li>
              <li>Trade skills and certifications</li>
              <li>Resume or employment history</li>
              <li>Project information</li>
              <li>Workforce requirements</li>
              <li>Payment and billing information</li>
              <li>Communications sent through the Platform</li>
            </ul>

            <h4>3.2 Account Information</h4>
            <p>When creating an account, we may collect:</p>
            <ul>
              <li>Username</li>
              <li>Password (stored securely in encrypted form)</li>
              <li>Account preferences</li>
              <li>User role (Worker, Contractor, Employer, Recruiter, Administrator)</li>
            </ul>

            <h4>3.3 Project and Workforce Data</h4>
            <p>TradesMap may collect:</p>
            <ul>
              <li>Project names and locations</li>
              <li>Workforce requests</li>
              <li>Worker assignments</li>
              <li>Timesheets</li>
              <li>Shift schedules</li>
              <li>Attendance records</li>
              <li>Safety certifications</li>
              <li>Qualification records</li>
              <li>Compliance documentation</li>
            </ul>

            <h4>3.4 Automatically Collected Information</h4>
            <p>When you use the Platform, we may automatically collect:</p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Log files</li>
              <li>Access times</li>
              <li>Pages viewed</li>
              <li>Referring websites</li>
              <li>Cookies and similar technologies</li>
            </ul>

            <h4>3.5 Location Information</h4>
            <p>With your permission, we may collect:</p>
            <ul>
              <li>GPS location</li>
              <li>Device location</li>
              <li>Project site location</li>
              <li>Worker check-in/check-out location data</li>
            </ul>
            <p>Location information may be used for workforce allocation, attendance verification, and project management purposes.</p>

            <h3>4. How We Use Your Information</h3>
            <p>We use collected information to:</p>
            <ul>
              <li>Create and manage user accounts</li>
              <li>Connect workers with projects</li>
              <li>Process workforce requests</li>
              <li>Manage project staffing</li>
              <li>Verify worker qualifications</li>
              <li>Improve platform functionality</li>
              <li>Provide customer support</li>
              <li>Send service notifications</li>
              <li>Process payments and invoices</li>
              <li>Monitor platform security</li>
              <li>Detect fraud and unauthorized activities</li>
              <li>Comply with legal obligations</li>
              <li>Analyze platform performance</li>
            </ul>

            <h3>5. Cookies and Tracking Technologies</h3>
            <p>TradesMap uses cookies and similar technologies to:</p>
            <ul>
              <li>Maintain user sessions</li>
              <li>Remember preferences</li>
              <li>Improve website functionality</li>
              <li>Analyze usage patterns</li>
              <li>Enhance security</li>
              <li>Measure performance</li>
            </ul>
            <p>Users may control cookies through browser settings; however, disabling cookies may affect certain platform features.</p>

            <h3>6. Sharing of Information</h3>
            <p>We may share information with:</p>
            
            <h4>Service Providers</h4>
            <p>Third-party providers who assist with:</p>
            <ul>
              <li>Cloud hosting</li>
              <li>Payment processing</li>
              <li>Email delivery</li>
              <li>Analytics</li>
              <li>Customer support</li>
              <li>Security monitoring</li>
            </ul>

            <h4>Business Users</h4>
            <p>Information may be shared between:</p>
            <ul>
              <li>Employers</li>
              <li>Contractors</li>
              <li>Project owners</li>
              <li>Workforce agencies</li>
              <li>Workers</li>
            </ul>
            <p>when necessary to facilitate project staffing and workforce management.</p>

            <h4>Legal Requirements</h4>
            <p>We may disclose information if required to:</p>
            <ul>
              <li>Comply with applicable laws</li>
              <li>Respond to legal requests</li>
              <li>Protect rights and safety</li>
              <li>Investigate fraud or security incidents</li>
            </ul>

            <h4>Business Transfers</h4>
            <p>Information may be transferred in connection with:</p>
            <ul>
              <li>Mergers</li>
              <li>Acquisitions</li>
              <li>Asset sales</li>
              <li>Corporate restructuring</li>
            </ul>

            <h3>7. Data Retention</h3>
            <p>We retain personal information only for as long as necessary to:</p>
            <ul>
              <li>Provide our services</li>
              <li>Maintain business records</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
              <li>Meet legal and regulatory requirements</li>
            </ul>
            <p>When information is no longer required, it will be securely deleted or anonymized.</p>

            <h3>8. Data Security</h3>
            <p>TradesMap implements appropriate technical and organizational safeguards, including:</p>
            <ul>
              <li>Encryption of sensitive data</li>
              <li>Secure server infrastructure</li>
              <li>Access controls</li>
              <li>Authentication measures</li>
              <li>Regular security monitoring</li>
              <li>Backup and recovery procedures</li>
            </ul>
            <p>While we strive to protect information, no method of electronic transmission or storage is completely secure.</p>

            <h3>9. International Data Transfers</h3>
            <p>Your information may be stored and processed in countries other than your country of residence. By using TradesMap, you consent to such transfers where permitted by applicable law.</p>

            <h3>10. Your Rights</h3>
            <p>Depending on your jurisdiction, you may have rights to:</p>
            <ul>
              <li>Access personal information</li>
              <li>Correct inaccurate information</li>
              <li>Delete personal information</li>
              <li>Restrict processing</li>
              <li>Object to processing</li>
              <li>Request data portability</li>
              <li>Withdraw consent</li>
            </ul>
            <p>Requests may be submitted using the contact information provided below.</p>

            <h3>11. Children's Privacy</h3>
            <p>TradesMap is intended for users who are at least 18 years old or the legal age required to enter employment contracts in their jurisdiction.</p>
            <p>We do not knowingly collect personal information from children.</p>

            <h3>12. Third-Party Links</h3>
            <p>The Platform may contain links to third-party websites or services. We are not responsible for the privacy practices of such third parties.</p>
            <p>Users should review the privacy policies of external websites before providing personal information.</p>

            <h3>13. Changes to This Privacy Policy</h3>
            <p>We may update this Privacy Policy periodically.</p>
            <p>Any changes will be posted on this page with an updated "Last Updated" date. Continued use of the Platform after updates constitutes acceptance of the revised Privacy Policy.</p>

            <h3>14. Contact Us</h3>
            <p>For questions regarding this Privacy Policy or our privacy practices, contact:</p>
            <p><strong>TradesMap Privacy Team</strong></p>
            <p>Email: support@tradesmap.com</p>
            <p>Website: www.tradesmap.com</p>

            <h3>15. Compliance with Applicable Laws</h3>
            <p>TradesMap aims to comply with applicable privacy and data protection laws, including:</p>
            <ul>
              <li>General Data Protection Regulation (GDPR)</li>
              <li>California Consumer Privacy Act (CCPA), where applicable</li>
              <li>Australian Privacy Act</li>
              <li>Applicable U.S. federal and state privacy laws</li>
              <li>Other relevant data protection regulations in jurisdictions where TradesMap operates</li>
            </ul>
            <p>Users may exercise their rights under applicable laws by contacting us using the information above.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}