// src/projects/pages/ProjectPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'
import { IconPlus, IconFolder, IconBell, IconSearch } from '../../common/components/Icons'

export function ProjectPage() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [showWizard, setShowWizard] = useState(false)

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
     

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
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge" aria-label="12 projects">{projects.length}</span>
              </a>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Revenues</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Profile</span>
              </span>
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
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Support</span>
              </span>
            </nav>
          </div>
        </aside>

        <main className="appContent">
          <div className="projectPage">
            <div className="projectHeader" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 className="projectTitle">Projects</h1>
                <p className="projectSubtitle">Manage your construction projects</p>
              </div>
              <button 
                className="projectBtn projectBtnPrimary" 
                onClick={() => setShowWizard(true)} 
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <IconPlus /> Add Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="projectSection" style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '60px 24px', 
                textAlign: 'center', 
                minHeight: '400px' 
              }}>
                <div style={{ color: 'rgba(23, 38, 58, 0.45)', marginBottom: '16px' }}>
                  <IconFolder style={{ width: '48px', height: '48px' }} />
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'rgba(23, 38, 58, 0.72)', margin: '0 0 8px 0' }}>
                  No Projects Yet
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(23, 38, 58, 0.55)', margin: '0 0 24px 0' }}>
                  Click the "Add Project" button to create your first project
                </p>
                <button 
                  className="projectBtn projectBtnPrimary" 
                  onClick={() => setShowWizard(true)} 
                  style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                  <IconPlus /> Add Project
                </button>
              </div>
            ) : (
              <div className="projectSection">
                <div className="projectList">
                  {projects.map(project => (
                    <div key={project.id} className="projectCard">
                      <h3>{project.projectName}</h3>
                      <p>{project.projectDescription || 'No description provided'}</p>
                      <div className="projectCardMeta">
                        <span>📅 Created: {new Date(project.createdAt).toLocaleDateString()}</span>
                        <span>👥 {project.workerCount || 0} workers</span>
                      </div>
                      <small>Work Type: {project.workType || 'Not specified'}</small>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <style>{`
        .projectPage {
          padding: 24px 0;
          max-width: 100%;
        }
        .projectHeader {
          margin-bottom: 28px;
        }
        .projectTitle {
          font-size: 28px;
          font-weight: 900;
          color: rgba(23, 38, 58, 0.92);
          margin: 0 0 8px 0;
        }
        .projectSubtitle {
          font-size: 14px;
          color: rgba(23, 38, 58, 0.65);
          margin: 0;
          font-weight: 600;
        }
        .projectSection {
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(18, 38, 63, 0.08);
          border-radius: 16px;
          padding: 24px;
        }
        .projectBtnPrimary {
          background: linear-gradient(180deg, #2fb463 0%, #249c54 100%);
          color: white;
          padding: 12px 28px;
          border-radius: 12px;
          font-weight: 800;
          border: none;
          cursor: pointer;
        }
        .projectList {
          display: grid;
          gap: 16px;
        }
        .projectCard {
          padding: 16px;
          border: 1px solid rgba(18, 38, 63, 0.08);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.9);
          transition: all 0.2s;
        }
        .projectCard:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(18, 38, 63, 0.1);
        }
        .projectCard h3 {
          margin: 0 0 8px;
          font-size: 16px;
          font-weight: 900;
          color: #0f4ea9;
        }
        .projectCardMeta {
          display: flex;
          gap: 16px;
          margin-bottom: 8px;
          font-size: 12px;
          color: rgba(23, 38, 63, 0.6);
        }
      `}</style>
    </div>
  )
}