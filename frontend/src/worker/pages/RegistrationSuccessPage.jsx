// // src/worker/pages/RegistrationSuccessPage.jsx
// import { useNavigate } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'

// export function RegistrationSuccessPage() {
//   const navigate = useNavigate()

//   const handleGoToProfile = () => {
//     navigate('/wizard/summary')
//   }

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div className="wizardPage">
//             <div className="wizardCard">
//               {/* Success Content */}
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 padding: '60px 40px',
//                 minHeight: '500px',
//                 textAlign: 'center'
//               }}>
//                 {/* Success Icon */}
//                 <div style={{
//                   width: '80px',
//                   height: '80px',
//                   borderRadius: '50%',
//                   backgroundColor: '#10b981',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginBottom: '24px'
//                 }}>
//                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M20 6L9 17l-5-5"/>
//                   </svg>
//                 </div>

//                 {/* Title */}
//                 <h1 style={{
//                   fontSize: '28px',
//                   fontWeight: '700',
//                   color: '#0f172a',
//                   marginBottom: '12px'
//                 }}>
//                   Registration Successful!
//                 </h1>

//                 {/* Subtitle */}
//                 <p style={{
//                   fontSize: '16px',
//                   color: '#475569',
//                   maxWidth: '520px',
//                   marginBottom: '8px'
//                 }}>
//                   Thank you for registering with TradesMap.
//                 </p>

//                 {/* Description */}
//                 <p style={{
//                   fontSize: '15px',
//                   color: '#64748b',
//                   maxWidth: '520px',
//                   lineHeight: '1.6',
//                   marginBottom: '32px'
//                 }}>
//                   Your registration has been submitted successfully. Our team is currently reviewing your information. Once the verification process is complete, your account will be activated.
//                 </p>

//                 <p style={{
//                   fontSize: '14px',
//                   color: '#64748b',
//                   maxWidth: '520px',
//                   lineHeight: '1.6',
//                   marginBottom: '40px'
//                 }}>
//                   In the meantime, please visit the Profile section and complete all remaining information. This will help us verify your account more quickly and ensure you can access all TradesMap features as soon as your account is approved.
//                 </p>

//                 {/* Go to Profile Button */}
//                 <button
//                   onClick={handleGoToProfile}
//                   style={{
//                     padding: '14px 48px',
//                     backgroundColor: '#0f5ae7',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.2s',
//                     ':hover': {
//                       backgroundColor: '#1e293b'
//                     }
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#1e293b'
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = '#0f172a'
//                   }}
//                 >
//                   Go to Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }




// // src/worker/pages/RegistrationSuccessPage.jsx
// import { useNavigate } from 'react-router-dom'
// import { TopNav } from '../../common/components/TopNav'
// import { useEffect } from 'react'

// export function RegistrationSuccessPage() {
//   const navigate = useNavigate()

//   // ✅ Auto-redirect after 5 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       navigate('/wizard/summary')
//     }, 5000)

//     return () => clearTimeout(timer)
//   }, [navigate])

//   const handleGoToProfile = () => {
//     navigate('/wizard/summary')
//   }

//   return (
//     <div className="appShell">
//       <TopNav variant="solid" />

//       <div className="appShellBody appShellBodyVerify">
//         <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
//           <div className="sideNavMain">
//             <div className="sideGroupLabel">WORKSPACE</div>
//             <nav className="sideGroup" aria-label="Workspace">
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Overview</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Projects</span>
//                 <span className="sideBadge">12</span>
//               </span>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Revenues</span>
//               </span>
//               <a className="sideItem sideItemActive" href="#">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Profile</span>
//               </a>
//             </nav>
//           </div>

//           <div className="sideNavBottom">
//             <div className="sideGroupLabel">GENERAL</div>
//             <nav className="sideGroup" aria-label="General">
//               <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Sign out</span>
//               </button>
//               <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
//                 <span className="sideIcon">
//                   <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-.9-6.4h1.8V17h-1.8v-1.4zm1.8-2.2h-1.8c0-2.6 3-2.3 3-4.4 0-1.1-.9-1.8-2.1-1.8-1.1 0-2 .7-2.1 1.8H8.1c.1-2.1 1.9-3.6 4-3.6 2.3 0 3.9 1.4 3.9 3.5 0 2.7-3 2.7-3 4.5z" fill="currentColor"/>
//                   </svg>
//                 </span>
//                 <span className="sideText">Support</span>
//               </span>
//             </nav>
//           </div>
//         </aside>

//         <main className="appContent">
//           <div className="wizardPage">
//             <div className="wizardCard">
//               {/* Success Content */}
//               <div style={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 padding: '60px 40px',
//                 minHeight: '500px',
//                 textAlign: 'center'
//               }}>
//                 {/* Success Icon */}
//                 <div style={{
//                   width: '80px',
//                   height: '80px',
//                   borderRadius: '50%',
//                   backgroundColor: '#10b981',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   marginBottom: '24px'
//                 }}>
//                   <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//                     <path d="M20 6L9 17l-5-5"/>
//                   </svg>
//                 </div>

//                 {/* Title */}
//                 <h1 style={{
//                   fontSize: '28px',
//                   fontWeight: '700',
//                   color: '#0f172a',
//                   marginBottom: '12px'
//                 }}>
//                   Registration Successful! 🎉
//                 </h1>

//                 {/* Subtitle */}
//                 <p style={{
//                   fontSize: '16px',
//                   color: '#475569',
//                   maxWidth: '520px',
//                   marginBottom: '8px'
//                 }}>
//                   Thank you for registering with TradesMap.
//                 </p>

//                 {/* Description */}
//                 <p style={{
//                   fontSize: '15px',
//                   color: '#64748b',
//                   maxWidth: '520px',
//                   lineHeight: '1.6',
//                   marginBottom: '32px'
//                 }}>
//                   Your registration has been submitted successfully. Our team is currently reviewing your information. Once the verification process is complete, your account will be activated.
//                 </p>

//                 <p style={{
//                   fontSize: '14px',
//                   color: '#64748b',
//                   maxWidth: '520px',
//                   lineHeight: '1.6',
//                   marginBottom: '40px'
//                 }}>
//                   In the meantime, please visit the Profile section and complete all remaining information. This will help us verify your account more quickly and ensure you can access all TradesMap features as soon as your account is approved.
//                 </p>

//                 {/* Auto-redirect info */}
//                 <p style={{
//                   fontSize: '13px',
//                   color: '#94a3b8',
//                   marginBottom: '24px'
//                 }}>
//                   Redirecting to profile in 5 seconds...
//                 </p>

//                 {/* Go to Profile Button */}
//                 <button
//                   onClick={handleGoToProfile}
//                   style={{
//                     padding: '14px 48px',
//                     backgroundColor: '#0f5ae7',
//                     color: 'white',
//                     border: 'none',
//                     borderRadius: '8px',
//                     fontSize: '16px',
//                     fontWeight: '600',
//                     cursor: 'pointer',
//                     transition: 'background-color 0.2s',
//                   }}
//                   onMouseEnter={(e) => {
//                     e.target.style.backgroundColor = '#1e293b'
//                   }}
//                   onMouseLeave={(e) => {
//                     e.target.style.backgroundColor = '#0f172a'
//                   }}
//                 >
//                   Go to Profile
//                 </button>
//               </div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default RegistrationSuccessPage






// src/worker/pages/RegistrationSuccessPage.jsx
import { useNavigate } from 'react-router-dom'
import { TopNav } from '../../common/components/TopNav'

export function RegistrationSuccessPage() {
  const navigate = useNavigate()

  const handleGoToProfile = () => {
    navigate('/wizard/summary')
  }

  return (
    <div className="appShell">
      <TopNav variant="solid" />

      <div className="appShellBody appShellBodyVerify">
        <aside className="sideNav sideNavBlue" aria-label="Sidebar navigation">
          <div className="sideNavMain">
            <div className="sideGroupLabel">WORKSPACE</div>
            <nav className="sideGroup" aria-label="Workspace">
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 4h7v7H4V4Zm9 0h7v7h-7V4ZM4 13h7v7H4v-7Zm9 0h7v7h-7v-7Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Overview</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 4 12 6h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Projects</span>
                <span className="sideBadge">12</span>
              </span>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M4 19h18v2H2V3h2v16Zm4-2V9h3v8H8Zm5 0V5h3v12h-3Zm5 0v-6h3v6h-3Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Revenues</span>
              </span>
              <a className="sideItem sideItemActive" href="#">
                <span className="sideIcon">
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
              <button type="button" className="sideItem sideItemButton" onClick={() => navigate('/login')}>
                <span className="sideIcon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor"/>
                  </svg>
                </span>
                <span className="sideText">Sign out</span>
              </button>
              <span className="sideItem sideItemDisabled" role="link" aria-disabled="true">
                <span className="sideIcon">
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
          <div className="wizardPage">
            <div className="wizardCard">
              {/* Success Content */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '60px 40px',
                minHeight: '500px',
                textAlign: 'center'
              }}>
                {/* Success Icon */}
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: '#10b981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px'
                }}>
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                </div>

                {/* Title */}
                <h1 style={{
                  fontSize: '28px',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '12px'
                }}>
                  Registration Successful! 🎉
                </h1>

                {/* Subtitle */}
                <p style={{
                  fontSize: '16px',
                  color: '#475569',
                  maxWidth: '520px',
                  marginBottom: '8px'
                }}>
                  Thank you for registering with TradesMap.
                </p>

                {/* Description */}
                <p style={{
                  fontSize: '15px',
                  color: '#64748b',
                  maxWidth: '520px',
                  lineHeight: '1.6',
                  marginBottom: '32px'
                }}>
                  Your registration has been submitted successfully. Our team is currently reviewing your information. Once the verification process is complete, your account will be activated.
                </p>

                <p style={{
                  fontSize: '14px',
                  color: '#64748b',
                  maxWidth: '520px',
                  lineHeight: '1.6',
                  marginBottom: '40px'
                }}>
                  In the meantime, please visit the Profile section and complete all remaining information. This will help us verify your account more quickly and ensure you can access all TradesMap features as soon as your account is approved.
                </p>

                {/* Go to Profile Button */}
                <button
                  onClick={handleGoToProfile}
                  style={{
                    padding: '14px 48px',
                    backgroundColor: '#0f5ae7',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1e293b'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#0f172a'
                  }}
                >
                  Go to Profile
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default RegistrationSuccessPage