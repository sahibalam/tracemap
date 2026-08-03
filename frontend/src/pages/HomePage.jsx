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
          {/* Left Column - Phone/Mockup */}
          <div className="homeLeft" style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
            <div className="phoneCard" style={{
              width: 'min(420px, 90%)',
              borderRadius: '20px',
              padding: '22px',
              background: 'rgba(255, 255, 255, 0.12)',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              boxShadow: '0 24px 70px rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(10px)'
            }}>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px'
              }}>
                {/* Mock Mobile UI */}
                <div style={{
                  width: '100%',
                  backgroundColor: '#0f4ea9',
                  borderRadius: '12px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>9:41</span>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>AA</span>
                </div>
                
                <div style={{
                  width: '100%',
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: '#0f4ea9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontWeight: '700',
                        fontSize: '14px'
                      }}>
                        R
                      </div>
                      <span style={{ fontWeight: '600', fontSize: '14px' }}>ric kr</span>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span style={{ fontSize: '20px' }}>☰</span>
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    marginBottom: '12px'
                  }}>
                    <span style={{ fontSize: '14px', color: '#17263a' }}>TradesMap</span>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f4ea9' }}>R</span>
                  </div>
                  
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '8px',
                    padding: '8px 0'
                  }}>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f0f4ff',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#17263a'
                    }}>
                      Menu
                    </div>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f0f4ff',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#17263a'
                    }}>
                      Logo
                    </div>
                    <div style={{
                      padding: '12px',
                      backgroundColor: '#f0f4ff',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontWeight: '600',
                      color: '#17263a'
                    }}>
                      User Name
                    </div>
                  </div>
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    fontSize: '12px',
                    color: '#64748b'
                  }}>
                    <span>Left</span>
                    <span>Center</span>
                    <span>Right</span>
                  </div>
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
            width: min(360px, 85%) !important;
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
            width: min(320px, 90%) !important;
            padding: 16px !important;
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
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  )
}

export default HomePage