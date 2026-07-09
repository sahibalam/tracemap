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
import { TopNav } from '../common/components/TopNav'
import { Footer } from '../common/components/Footer'

export function HomePage() {
  return (
    <div className="page" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <div className="bg bgAuth" />
      <div className="bgOverlay" />
      <TopNav variant="transparent" />
      <main className="homeMain" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="wipCard" role="status" style={{ textAlign: 'center', padding: '40px' }}>
          <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#17263a', marginBottom: '16px' }}>
            Work in progress
          </h1>
          <p style={{ fontSize: '18px', color: '#64748b' }}>
            We're building something amazing. Stay tuned!
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}