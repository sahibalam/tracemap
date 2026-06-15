// src/company/pages/CompanyVerifyPage.jsx
import { useNavigate, useLocation } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { TextField } from '../../common/components/TextField'
import { IconMail, IconPhone } from '../../common/components/Icons'

export function CompanyVerifyPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location?.state ?? {}

  const email = state.email ?? ''
  const phoneNumber = state.phoneNumber ?? ''

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavHeader">
            <div className="sideMark" aria-hidden="true">
              <img className="sideMarkLogo" src="/assets/tradesmap_icon.png" alt="" />
            </div>
            <div className="sideMeta">
              <div className="sideTitle">Tradesmap</div>
            </div>
          </div>

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
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/company/login')}>
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div className="verifyPage">
            <div className="authCard authCardCompact verifyCard verifyCardV2">
              <div className="verifyTitle verifyTitleV2">Confirm your email and phone number to secure your account.</div>

              <div className="verifyRows" role="group" aria-label="Verification">
                <div className="verifyRow">
                  <div className="verifyRowLabel">
                    Email ID <span className="verifyRequired" aria-hidden="true">*</span>
                  </div>

                  <div className="verifyRowMain">
                    <TextField label="" placeholder="Email" icon={<IconMail />} value={email} readOnly />
                    <div className="verifyRowActions">
                      <button type="button" className="btn btnPrimary verifyInlineBtn" onClick={() => navigate('/company/wizard')}>
                        Verify
                      </button>
                      <button type="button" className="verifyResend" onClick={() => {}}>Resend</button>
                    </div>
                  </div>

                  <div className="verifyRowRight">
                    <div className="verifyRowHint">Not your email?</div>
                    <button type="button" className="verifyChange" onClick={() => navigate('/company/register')}>
                      Change it
                    </button>
                  </div>
                </div>

                <div className="verifyRow">
                  <div className="verifyRowLabel">
                    Phone No. <span className="verifyRequired" aria-hidden="true">*</span>
                  </div>

                  <div className="verifyRowMain">
                    <TextField label="" placeholder="Phone" icon={<IconPhone />} value={phoneNumber} readOnly />
                    <div className="verifyRowActions">
                      <button type="button" className="btn btnPrimary verifyInlineBtn" onClick={() => navigate('/company/wizard')}>
                        Verify
                      </button>
                      <button type="button" className="verifyResend" onClick={() => {}}>Resend</button>
                    </div>
                  </div>

                  <div className="verifyRowRight">
                    <div className="verifyRowHint">Not your phone?</div>
                    <button type="button" className="verifyChange" onClick={() => navigate('/company/register')}>
                      Change it
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}