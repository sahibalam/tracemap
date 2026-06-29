import { TopNav } from '../common/components/TopNav'
import { Footer } from '../common/components/Footer'

export function TermsPage() {
  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* <div className="bg bgAuth" />
      <div className="bgOverlay" /> */}
      <TopNav variant="solid" />
      <main style={{ flex: 1, padding: '40px 22px', maxWidth: 'var(--pageMax)', margin: '0 auto', width: '100%' }}>
        <div className="legalPage">
          <h1 className="legalTitle">Terms of Use</h1>
          <div className="legalContent">
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
      </main>
      <Footer />
    </div>
  )
}