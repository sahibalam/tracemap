// // src/pages/HomePage.jsx
// import { TopNav } from '../common/components/TopNav'

// export function HomePage() {
//   return (
//     <div className="page">
//       <div className="bg bgAuth" />
//       <div className="bgOverlay" />
//       <TopNav variant="transparent" />

//       <main className="homeMain">
//         <div className="wipCard" role="status">
//           Work in progress
//         </div>
//       </main>
//     </div>
//   )
// }


// // src/pages/HomePage.jsx
// import { TopNav } from '../common/components/TopNav'
// import { Footer } from '../common/components/Footer'

// export function HomePage() {
//   return (
//     <div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <div className="bg bgAuth" />
//       <div className="bgOverlay" />
//       <TopNav variant="transparent" />
//       <main className="homeMain" style={{ flex: 1 }}>
//         <div className="wipCard" role="status">
//           Work in progress
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }



// // src/pages/HomePage.jsx
// import { useTranslation } from 'react-i18next'
// import { TopNav } from '../common/components/TopNav'
// import { Footer } from '../common/components/Footer'

// export function HomePage() {
//   const { t } = useTranslation()

//   return (
//     <div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
//       <div className="bg bgAuth" />
//       <div className="bgOverlay" />
//       <TopNav variant="solid" /> {/* ✅ Changed to 'solid' to ensure avatar shows */}
//       <main className="homeMain" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//         <div className="wipCard" role="status" style={{ textAlign: 'center', padding: '40px' }}>
//           <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#17263a', marginBottom: '16px' }}>
//             {t('home.workInProgress')}
//           </h1>
//           <p style={{ fontSize: '18px', color: '#64748b' }}>
//             {t('home.workInProgressDescription')}
//           </p>
//         </div>
//       </main>
//       <Footer />
//     </div>
//   )
// }



// src/pages/HomePage.jsx
import { useTranslation } from 'react-i18next'
import { TopNav } from '../common/components/TopNav'
import { Footer } from '../common/components/Footer'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="bg bgAuth" />
      <div className="bgOverlay" />
      <TopNav variant="solid" />
      
      <main className="homeMain" style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '22px',
        position: 'relative',
        zIndex: 2,
        minHeight: 'calc(100vh - 70px)',
        flex: '1 0 auto'
      }}>
        <div className="homeContent" style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '44px',
          alignItems: 'center',
          padding: '40px 0'
        }}>
          {/* Left Column - Mobile Mockup */}
          <div className="homeLeft" style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div className="phoneCard" style={{
              width: 'min(380px, 90%)',
              borderRadius: '24px',
              padding: '16px',
              background: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid rgba(18, 38, 63, 0.12)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.15)',
            }}>
              {/* Phone Screen */}
              <div style={{
                width: '100%',
                backgroundColor: '#f8f9fc',
                borderRadius: '16px',
                overflow: 'hidden',
                padding: '12px 16px 20px',
                border: '1px solid rgba(18, 38, 63, 0.06)'
              }}>
                {/* Status Bar */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '4px 0 12px 0',
                  borderBottom: '1px solid rgba(18, 38, 63, 0.06)',
                  marginBottom: '12px'
                }}>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: '#17263a' 
                  }}>9:41</span>
                  <span style={{ 
                    fontSize: '14px', 
                    fontWeight: '700', 
                    color: '#17263a' 
                  }}>AA</span>
                </div>
                
                {/* App Header - EXACTLY LIKE ATTACHMENT */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 0 4px 0',
                  borderBottom: '1px solid rgba(18, 38, 63, 0.08)',
                  marginBottom: '12px'
                }}>
                  {/* Left: Hamburger Icon */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ 
                      fontSize: '24px', 
                      fontWeight: '400',
                      color: '#17263a',
                      cursor: 'pointer'
                    }}>☰</span>
                  </div>
                  
                  {/* Center: Logo */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <img 
                      src="/assets/logo_tradesmap.png" 
                      alt="TradesMap" 
                      style={{ 
                        height: '28px',
                        width: 'auto',
                        objectFit: 'contain'
                      }} 
                    />
                    <span style={{
                      fontSize: '18px',
                      fontWeight: '700',
                      color: '#0f4ea9'
                    }}>TradesMap</span>
                  </div>
                  
                  {/* Right: User Avatar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: '#0f4ea9',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: '700',
                      fontSize: '14px',
                      border: '2px solid rgba(15, 78, 169, 0.15)'
                    }}>
                      R
                    </div>
                  </div>
                </div>
                
                {/* Labels - EXACTLY LIKE ATTACHMENT */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: '8px',
                  padding: '8px 0',
                  marginTop: '4px'
                }}>
                  <div style={{
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#17263a',
                    padding: '6px 0',
                    backgroundColor: 'rgba(15, 78, 169, 0.04)',
                    borderRadius: '6px'
                  }}>
                    Hamburger
                  </div>
                  <div style={{
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#17263a',
                    padding: '6px 0',
                    backgroundColor: 'rgba(15, 78, 169, 0.04)',
                    borderRadius: '6px'
                  }}>
                    Logo
                  </div>
                  <div style={{
                    textAlign: 'center',
                    fontSize: '13px',
                    fontWeight: '600',
                    color: '#17263a',
                    padding: '6px 0',
                    backgroundColor: 'rgba(15, 78, 169, 0.04)',
                    borderRadius: '6px'
                  }}>
                    User Name
                  </div>
                </div>
                
                {/* Bottom Labels - EXACTLY LIKE ATTACHMENT */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '10px 0 0 0',
                  marginTop: '8px',
                  borderTop: '1px solid rgba(18, 38, 63, 0.06)'
                }}>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    fontWeight: '500'
                  }}>Menu (Left)</span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    fontWeight: '500'
                  }}>(Center)</span>
                  <span style={{ 
                    fontSize: '12px', 
                    color: '#64748b',
                    fontWeight: '500'
                  }}>(Right)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Hero Content */}
          <div className="homeRight" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '16px'
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: 800,
              color: '#17263a',
              margin: 0,
              lineHeight: 1.2
            }}>
              {t('home.workInProgress') || 'Coming Soon'}
            </h1>
            <p style={{
              fontSize: '18px',
              color: '#64748b',
              margin: 0,
              lineHeight: 1.6,
              maxWidth: '480px'
            }}>
              {t('home.workInProgressDescription') || 'We are building something amazing for you. Stay tuned!'}
            </p>
            <div style={{
              display: 'flex',
              gap: '12px',
              marginTop: '8px',
              flexWrap: 'wrap'
            }}>
              <button style={{
                padding: '12px 32px',
                backgroundColor: '#0f4ea9',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = '#0b3f90'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 8px 24px rgba(15,78,169,0.3)'
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = '#0f4ea9'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
              >
                Get Started
              </button>
              <button style={{
                padding: '12px 32px',
                backgroundColor: 'transparent',
                color: '#17263a',
                border: '2px solid rgba(18,38,63,0.15)',
                borderRadius: '10px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#0f4ea9'
                e.target.style.backgroundColor = 'rgba(15,78,169,0.05)'
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = 'rgba(18,38,63,0.15)'
                e.target.style.backgroundColor = 'transparent'
              }}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Mobile Responsive Styles */}
      <style>{`
        @media (max-width: 1200px) {
          .homeContent {
            grid-template-columns: 1fr !important;
            gap: 30px !important;
            padding: 20px 0 !important;
          }
          
          .homeLeft {
            order: 2 !important;
          }
          
          .homeRight {
            order: 1 !important;
            text-align: center !important;
            align-items: center !important;
          }
          
          .homeRight h1 {
            font-size: 36px !important;
          }
          
          .homeRight p {
            max-width: 100% !important;
            text-align: center !important;
          }
          
          .phoneCard {
            width: min(340px, 85%) !important;
          }
        }
        
        @media (max-width: 768px) {
          .homeRight h1 {
            font-size: 28px !important;
          }
          
          .homeRight p {
            font-size: 16px !important;
          }
          
          .homeRight .btn-group {
            flex-direction: column !important;
            width: 100% !important;
          }
          
          .homeRight .btn-group button {
            width: 100% !important;
            justify-content: center !important;
          }
          
          .phoneCard {
            width: min(300px, 90%) !important;
            padding: 12px !important;
          }
          
          .homeMain {
            padding: 16px !important;
          }
        }
        
        @media (max-width: 480px) {
          .homeRight h1 {
            font-size: 24px !important;
          }
          
          .homeRight p {
            font-size: 14px !important;
          }
          
          .homeRight .btn-group button {
            font-size: 14px !important;
            padding: 10px 20px !important;
          }
          
          .phoneCard {
            width: 95% !important;
            padding: 10px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage