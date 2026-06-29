// src/common/components/Footer.jsx
import { useState } from 'react'

export function Footer() {
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [showTerms, setShowTerms] = useState(false)
  const [showAbout, setShowAbout] = useState(false)

  const handleLinkClick = (section) => {
    switch(section) {
      case 'about':
        setShowAbout(true)
        setShowPrivacy(false)
        setShowTerms(false)
        break
      case 'privacy':
        setShowPrivacy(true)
        setShowAbout(false)
        setShowTerms(false)
        break
      case 'terms':
        setShowTerms(true)
        setShowAbout(false)
        setShowPrivacy(false)
        break
      default:
        setShowAbout(false)
        setShowPrivacy(false)
        setShowTerms(false)
    }
  }

  const closeModal = () => {
    setShowAbout(false)
    setShowPrivacy(false)
    setShowTerms(false)
  }

  return (
    <>
      <footer className="homeFooter">
        <div className="footerContent">
          <div className="footerBrand">
            <span className="footerBrandText">TradesMap</span>
            <span className="footerDivider">|</span>
            <span className="footerCopyright">© {new Date().getFullYear()} All rights reserved</span>
          </div>
          <nav className="footerNav">
            <button 
              className="footerLink" 
              onClick={() => handleLinkClick('about')}
            >
              About Us
            </button>
            <span className="footerNavDivider">•</span>
            <button 
              className="footerLink" 
              onClick={() => handleLinkClick('privacy')}
            >
              Privacy Policy
            </button>
            <span className="footerNavDivider">•</span>
            <button 
              className="footerLink" 
              onClick={() => handleLinkClick('terms')}
            >
              Terms & Conditions
            </button>
          </nav>
        </div>
      </footer>

      {/* About Us Modal */}
      {showAbout && (
        <div className="footerModalOverlay" onClick={closeModal}>
          <div className="footerModal" onClick={(e) => e.stopPropagation()}>
            <div className="footerModalHeader">
              <h2>About TradesMap</h2>
              <button className="footerModalClose" onClick={closeModal}>×</button>
            </div>
            <div className="footerModalBody">
              <p>TradesMap is a construction workforce technology platform built to connect skilled trade workers with the companies and projects that need them.</p>
              
              <p>We help contractors, subcontractors, and construction teams find, organize, and deploy qualified workers by trade, location, schedule, and project demand. Our platform is designed for real construction operations — not generic job postings — bringing together workforce planning, project staffing, worker availability, rate intelligence, and field execution in one connected system.</p>
              
              <p>Built around map-based coverage and construction-specific workflows, TradesMap gives companies a smarter way to manage manpower and gives skilled workers better access to real opportunities.</p>
              
              <p style={{ fontWeight: 600, marginTop: '16px' }}>Our mission is simple: move construction forward by connecting the right workers to the right projects, at the right time.</p>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className="footerModalOverlay" onClick={closeModal}>
          <div className="footerModal" onClick={(e) => e.stopPropagation()}>
            <div className="footerModalHeader">
              <h2>Privacy Policy</h2>
              <button className="footerModalClose" onClick={closeModal}>×</button>
            </div>
            <div className="footerModalBody">
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
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="footerModalOverlay" onClick={closeModal}>
          <div className="footerModal" onClick={(e) => e.stopPropagation()}>
            <div className="footerModalHeader">
              <h2>Terms of Use</h2>
              <button className="footerModalClose" onClick={closeModal}>×</button>
            </div>
            <div className="footerModalBody">
              <p><strong>Effective Date:</strong> June 11, 2026</p>

              <h3>1. Acceptance of Terms</h3>
              <p>Welcome to TradesMap ("TradesMap", "Platform", "we", "our", or "us").</p>
              <p>These Terms of Use ("Terms") govern your access to and use of the TradesMap website, mobile applications, and related services.</p>
              <p>By creating an account, accessing, or using the Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you must not use the Platform.</p>

              <h3>2. Description of Services</h3>
              <p>TradesMap is a workforce management and staffing platform designed for the construction, infrastructure, industrial, maintenance, and related industries.</p>
              <p>The Platform may allow users to:</p>
              <ul>
                <li>Create and manage workforce requests</li>
                <li>Search for construction projects and job opportunities</li>
                <li>Connect workers with employers and contractors</li>
                <li>Manage project staffing</li>
                <li>Schedule shifts and assignments</li>
                <li>Track workforce availability</li>
                <li>Verify qualifications and certifications</li>
                <li>Manage timesheets and attendance</li>
                <li>Communicate with other users</li>
                <li>Access reporting and workforce analytics</li>
              </ul>
              <p>TradesMap may modify, suspend, or discontinue any feature at any time without prior notice.</p>

              <h3>3. Eligibility</h3>
              <p>To use TradesMap, you must:</p>
              <ul>
                <li>Be at least 18 years of age</li>
                <li>Have the legal capacity to enter into contracts</li>
                <li>Provide accurate registration information</li>
                <li>Comply with all applicable laws and regulations</li>
              </ul>
              <p>By using the Platform, you represent and warrant that you meet these requirements.</p>

              <h3>4. Account Registration</h3>
              <p>Users may be required to create an account to access certain features.</p>
              <p>You agree to:</p>
              <ul>
                <li>Provide accurate and current information</li>
                <li>Maintain and update your account information</li>
                <li>Keep login credentials secure</li>
                <li>Notify TradesMap immediately of unauthorized account use</li>
                <li>Accept responsibility for activities occurring under your account</li>
              </ul>
              <p>TradesMap reserves the right to suspend or terminate accounts containing false or misleading information.</p>

              <h3>5. User Roles</h3>
              <p>The Platform may support different user types, including:</p>
              <ul>
                <li>Workers</li>
                <li>Contractors</li>
                <li>Employers</li>
                <li>Recruiters</li>
                <li>Project Managers</li>
                <li>Administrators</li>
              </ul>
              <p>Additional features, permissions, and responsibilities may apply based on account type.</p>

              <h3>6. Workforce and Employment Disclaimer</h3>
              <p>TradesMap acts solely as a technology platform.</p>
              <p>Unless expressly stated otherwise:</p>
              <ul>
                <li>TradesMap is not an employer.</li>
                <li>TradesMap is not a labor hire agency.</li>
                <li>TradesMap does not guarantee employment.</li>
                <li>TradesMap does not guarantee worker availability.</li>
                <li>TradesMap does not guarantee project opportunities.</li>
                <li>TradesMap does not supervise work performed by users.</li>
              </ul>
              <p>All employment, contracting, payment, and workplace relationships exist directly between the relevant parties.</p>

              <h3>7. User Responsibilities</h3>
              <p>Users agree to:</p>
              <ul>
                <li>Use the Platform lawfully</li>
                <li>Provide accurate information</li>
                <li>Maintain valid certifications and qualifications</li>
                <li>Comply with workplace safety requirements</li>
                <li>Respect intellectual property rights</li>
                <li>Maintain professional conduct</li>
              </ul>
              <p>Users must not:</p>
              <ul>
                <li>Submit false information</li>
                <li>Misrepresent qualifications or certifications</li>
                <li>Harass or abuse other users</li>
                <li>Upload malicious software</li>
                <li>Attempt unauthorized access to systems</li>
                <li>Interfere with Platform operations</li>
                <li>Use the Platform for fraudulent activities</li>
              </ul>

              <h3>8. Project and Workforce Information</h3>
              <p>Employers and contractors are responsible for ensuring that:</p>
              <ul>
                <li>Job postings are accurate</li>
                <li>Project details are current</li>
                <li>Workforce requirements are lawful</li>
                <li>Compensation information complies with applicable laws</li>
                <li>Workplace safety obligations are met</li>
              </ul>
              <p>Workers are responsible for ensuring:</p>
              <ul>
                <li>Their qualifications are accurate</li>
                <li>Certifications are valid</li>
                <li>Availability information is current</li>
              </ul>

              <h3>9. Fees and Payments</h3>
              <p>Certain features of TradesMap may require payment.</p>
              <p>Users agree that:</p>
              <ul>
                <li>All fees are payable as specified</li>
                <li>Fees may be charged on a subscription or transactional basis</li>
                <li>Applicable taxes may be added</li>
                <li>Fees are non-refundable unless required by law or expressly stated otherwise</li>
              </ul>
              <p>TradesMap reserves the right to modify pricing at any time.</p>

              <h3>10. Intellectual Property</h3>
              <p>All rights, title, and interest in the Platform remain the property of TradesMap or its licensors.</p>
              <p>This includes:</p>
              <ul>
                <li>Software</li>
                <li>Source code</li>
                <li>Designs</li>
                <li>Logos</li>
                <li>Branding</li>
                <li>Databases</li>
                <li>Content</li>
                <li>Documentation</li>
              </ul>
              <p>Users receive a limited, non-exclusive, revocable license to access and use the Platform.</p>
              <p>Users may not:</p>
              <ul>
                <li>Copy the Platform</li>
                <li>Reverse engineer the software</li>
                <li>Modify source code</li>
                <li>Create derivative works</li>
                <li>Resell Platform access</li>
              </ul>
              <p>without written permission.</p>

              <h3>11. User Content</h3>
              <p>Users retain ownership of content they upload, including:</p>
              <ul>
                <li>Profiles</li>
                <li>Certifications</li>
                <li>Resumes</li>
                <li>Project information</li>
                <li>Workforce requests</li>
                <li>Communications</li>
              </ul>
              <p>By uploading content, users grant TradesMap a worldwide, non-exclusive, royalty-free license to:</p>
              <ul>
                <li>Store</li>
                <li>Display</li>
                <li>Process</li>
                <li>Reproduce</li>
                <li>Distribute</li>
              </ul>
              <p>such content solely for providing Platform services.</p>
              <p>Users represent that they own or have permission to use uploaded content.</p>

              <h3>12. Privacy</h3>
              <p>Use of the Platform is also governed by the TradesMap Privacy Policy.</p>
              <p>By using the Platform, you acknowledge that your information may be collected, processed, and stored as described in the Privacy Policy.</p>

              <h3>13. Third-Party Services</h3>
              <p>TradesMap may integrate with third-party services, including:</p>
              <ul>
                <li>Payment processors</li>
                <li>Cloud hosting providers</li>
                <li>Communication tools</li>
                <li>Mapping services</li>
                <li>Verification services</li>
              </ul>
              <p>TradesMap is not responsible for third-party services or their content.</p>

              <h3>14. Availability of Services</h3>
              <p>TradesMap does not guarantee:</p>
              <ul>
                <li>Continuous availability</li>
                <li>Error-free operation</li>
                <li>Uninterrupted access</li>
                <li>Compatibility with all devices</li>
              </ul>
              <p>The Platform may be unavailable due to:</p>
              <ul>
                <li>Maintenance</li>
                <li>System upgrades</li>
                <li>Security incidents</li>
                <li>Circumstances beyond our control</li>
              </ul>

              <h3>15. Limitation of Liability</h3>
              <p>To the fullest extent permitted by law, TradesMap shall not be liable for:</p>
              <ul>
                <li>Loss of profits</li>
                <li>Loss of business opportunities</li>
                <li>Loss of data</li>
                <li>Project delays</li>
                <li>Employment disputes</li>
                <li>Contractor disputes</li>
                <li>Indirect damages</li>
                <li>Consequential damages</li>
              </ul>
              <p>TradesMap's total liability shall not exceed the amount paid by the user to TradesMap during the twelve (12) months preceding the claim.</p>

              <h3>16. Indemnification</h3>
              <p>You agree to indemnify and hold harmless TradesMap, its officers, employees, affiliates, and partners from claims arising from:</p>
              <ul>
                <li>Your use of the Platform</li>
                <li>Violation of these Terms</li>
                <li>Violation of applicable laws</li>
                <li>Misrepresentation of qualifications</li>
                <li>Content submitted by you</li>
              </ul>

              <h3>17. Suspension and Termination</h3>
              <p>TradesMap may suspend or terminate accounts at its sole discretion if a user:</p>
              <ul>
                <li>Violates these Terms</li>
                <li>Engages in fraudulent conduct</li>
                <li>Creates security risks</li>
                <li>Misuses Platform services</li>
              </ul>
              <p>Users may terminate their account at any time by contacting support or using available account settings.</p>

              <h3>18. Governing Law</h3>
              <p>These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which TradesMap is registered and operates, without regard to conflict of law principles.</p>

              <h3>19. Dispute Resolution</h3>
              <p>Before initiating legal proceedings, parties agree to attempt good-faith negotiations to resolve disputes.</p>
              <p>If disputes cannot be resolved informally, they shall be submitted to the courts having jurisdiction over TradesMap's principal place of business, unless otherwise required by applicable law.</p>

              <h3>20. Changes to These Terms</h3>
              <p>TradesMap may modify these Terms at any time.</p>
              <p>Updated Terms will be posted on the Platform with a revised Effective Date.</p>
              <p>Continued use of the Platform after changes become effective constitutes acceptance of the revised Terms.</p>

              <h3>21. Contact Information</h3>
              <p><strong>TradesMap</strong></p>
              <p>Email: support@tradesmap.com</p>
              <p>Website: tradesmap.com</p>
              <p>For legal inquiries, contract matters, or questions regarding these Terms, please contact us using the information above.</p>

              <h3>Acknowledgment</h3>
              <p>By accessing or using TradesMap, you acknowledge that you have read, understood, and agreed to these Terms of Use.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}