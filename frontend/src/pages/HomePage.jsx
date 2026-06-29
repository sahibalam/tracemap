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


// src/pages/HomePage.jsx
import { TopNav } from '../common/components/TopNav'
import { Footer } from '../common/components/Footer'

export function HomePage() {
  return (
    <div className="page">
      <div className="bg bgAuth" />
      <div className="bgOverlay" />
      <TopNav variant="transparent" />
      <main className="homeMain">
        <div className="wipCard" role="status">
          Work in progress
        </div>
      </main>
      <Footer />
    </div>
  )
}