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



// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TopNav } from '../common/components/TopNav'
import { Footer } from '../common/components/Footer'

export function HomePage() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const isAuthenticated = !!localStorage.getItem('authToken')

  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="bg bgAuth" />
      <div className="bgOverlay" />
      <TopNav variant="transparent" />
      <main className="homeMain" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ 
          textAlign: 'center', 
          padding: '40px',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 700, 
            color: '#17263a',
            marginBottom: '16px'
          }}>
            {t('home.title') || 'TradesMap'}
          </h1>
          <p style={{ 
            fontSize: '18px', 
            color: '#475569',
            marginBottom: '32px'
          }}>
            {t('home.subtitle') || 'Your construction workforce platform'}
          </p>
          
          {!isAuthenticated ? (
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button 
                onClick={() => navigate('/login')}
                style={{
                  padding: '12px 32px',
                  border: 'none',
                  background: '#0f4ea9',
                  color: 'white',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '140px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#0b3f90'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 4px 12px rgba(15, 78, 169, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = '#0f4ea9'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = 'none'
                }}
              >
                {t('auth.login') || 'Log in'}
              </button>
              <button 
                onClick={() => navigate('/register')}
                style={{
                  padding: '12px 32px',
                  border: '2px solid #0f4ea9',
                  background: 'transparent',
                  color: '#0f4ea9',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  minWidth: '140px'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(15, 78, 169, 0.05)'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'transparent'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                {t('auth.register') || 'Register'}
              </button>
            </div>
          ) : (
            <button 
              onClick={() => navigate('/wizard/summary')}
              style={{
                padding: '12px 32px',
                border: 'none',
                background: '#0f4ea9',
                color: 'white',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#0b3f90'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 4px 12px rgba(15, 78, 169, 0.3)'
              }}
              onMouseLeave={(e) => {
                e.target.style.background = '#0f4ea9'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = 'none'
              }}
            >
              {t('nav.profile') || 'Go to Profile'}
            </button>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}