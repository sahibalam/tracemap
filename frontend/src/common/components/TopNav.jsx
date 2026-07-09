// // src/common/components/TopNav.jsx
// import { useState, useRef, useEffect } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { createPortal } from 'react-dom'
// import { IconSearch, IconBell } from './Icons'

// export function TopNav({ variant = 'transparent' }) {
//   const navigate = useNavigate()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)

//   console.log('TopNav rendered, variant:', variant)
//   console.log('isDropdownOpen:', isDropdownOpen)

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     console.log('Setting up click outside listener')
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         console.log('Closing dropdown - clicked outside')
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   // Update dropdown position when opened
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       console.log('Avatar rect:', rect)
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleProfileSettings = () => {
//     console.log('Profile Settings clicked')
//     setIsDropdownOpen(false)
//     navigate('/wizard/summary')
//   }

//   const handleLogout = () => {
//     console.log('Logout clicked')
//     setIsDropdownOpen(false)
//     navigate('/login')
//   }

//   const toggleDropdown = () => {
//     console.log('Avatar clicked, current state:', isDropdownOpen)
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   // Dropdown menu component
//   const DropdownMenu = () => {
//     console.log('DropdownMenu rendered, position:', dropdownPosition)
//     return (
//       <div
//         ref={dropdownRef}
//         style={{
//           position: 'fixed',
//           top: `${dropdownPosition.top}px`,
//           right: `${dropdownPosition.right}px`,
//           minWidth: '200px',
//           background: 'white',
//           borderRadius: '12px',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
//           border: '1px solid rgba(18, 38, 63, 0.08)',
//           overflow: 'hidden',
//           zIndex: 9999999,
//           padding: '4px 0',
//           opacity: 1,
//           visibility: 'visible',
//           pointerEvents: 'auto',
//           display: 'block',
//         }}
//       >
//         {/* Profile Settings */}
//         <button
//           onClick={handleProfileSettings}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             width: '100%',
//             padding: '10px 16px',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             color: '#17263a',
//             transition: 'background 0.15s ease',
//             fontFamily: 'inherit',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//           </svg>
//           Profile Settings
//         </button>

//         {/* Divider */}
//         <div style={{
//           height: '1px',
//           background: 'rgba(18, 38, 63, 0.08)',
//           margin: '4px 8px',
//         }} />

//         {/* Logout */}
//         <button
//           onClick={handleLogout}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             width: '100%',
//             padding: '10px 16px',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             color: '#dc2626',
//             transition: 'background 0.15s ease',
//             fontFamily: 'inherit',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(220, 38, 38, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//           </svg>
//           Logout
//         </button>
//       </div>
//     )
//   }

//   return (
//     <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`} style={{ position: 'relative', zIndex: 9999 }}>
//       <div className="topbarInner">
//         <Link to="/" className="brand brandLink" aria-label="TradesMap home">
//           <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
//         </Link>

//         {variant === 'transparent' ? (
//           <nav className="navLinks" aria-label="Top navigation">
//             <a href="#" className="navLink">Faqs</a>
//             <a href="#" className="navLink">About</a>
//             <a href="#" className="navLink">Contact</a>
//           </nav>
//         ) : null}

//         {variant === 'solid' ? (
//           <div className="topbarCenter" aria-label="Header search">
//             <div className="topbarSearch">
//               <span className="topbarSearchIcon" aria-hidden="true">
//                 <IconSearch />
//               </span>
//               <input className="topbarSearchInput" type="search" placeholder="Search" />
//             </div>
//           </div>
//         ) : null}

//         <nav className="navActions" aria-label="Authentication navigation">
//           {variant === 'solid' ? (
//             <div className="navActionsSolid">
//               <button type="button" className="navIconButton" aria-label="Notifications">
//                 <IconBell />
//                 <span className="navIconBadge" aria-hidden="true">7</span>
//               </button>
              
//               {/* Avatar */}
//               <button
//                 ref={avatarRef}
//                 type="button"
//                 onClick={toggleDropdown}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   display: 'flex',
//                   alignItems: 'center',
//                 }}
//               >
//                 <img 
//                   className="topbarAvatar" 
//                   src="/assets/worker.avif" 
//                   alt="Worker avatar"
//                   style={{
//                     border: isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent',
//                     borderRadius: '50%',
//                     transition: 'border 0.2s ease',
//                   }}
//                 />
//               </button>
//             </div>
//           ) : (
//             <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
//               Login
//             </NavLink>
//           )}
//         </nav>
//       </div>

//       {/* Render dropdown using portal */}
//       {isDropdownOpen && createPortal(<DropdownMenu />, document.body)}
//     </header>
//   )
// }



// // src/common/components/TopNav.jsx
// import { useState, useRef, useEffect } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { createPortal } from 'react-dom'
// import { IconSearch, IconBell } from './Icons'

// export function TopNav({ variant = 'transparent' }) {
//   const navigate = useNavigate()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)
  
//   // ✅ Get profile image from localStorage with state
//   const [profileImage, setProfileImage] = useState(() => {
//     return localStorage.getItem('userProfileImage') || '/assets/worker.avif'
//   })

//   // ✅ Listen for storage changes (when image is updated from other tabs/windows)
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'userProfileImage') {
//         setProfileImage(e.newValue || '/assets/worker.avif')
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   // ✅ Custom event listener for same-tab updates
//   useEffect(() => {
//     const handleProfileUpdate = (e) => {
//       if (e.detail && e.detail.profileImage) {
//         setProfileImage(e.detail.profileImage)
//       }
//     }
//     window.addEventListener('profileImageUpdated', handleProfileUpdate)
//     return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
//   }, [])

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [])

//   // Update dropdown position when opened
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleProfileSettings = () => {
//     setIsDropdownOpen(false)
//     navigate('/wizard/summary')
//   }

//   const handleLogout = () => {
//     setIsDropdownOpen(false)
//     navigate('/login')
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   // Dropdown menu component
//   const DropdownMenu = () => {
//     return (
//       <div
//         ref={dropdownRef}
//         style={{
//           position: 'fixed',
//           top: `${dropdownPosition.top}px`,
//           right: `${dropdownPosition.right}px`,
//           minWidth: '200px',
//           background: 'white',
//           borderRadius: '12px',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
//           border: '1px solid rgba(18, 38, 63, 0.08)',
//           overflow: 'hidden',
//           zIndex: 9999999,
//           padding: '4px 0',
//           opacity: 1,
//           visibility: 'visible',
//           pointerEvents: 'auto',
//           display: 'block',
//         }}
//       >
//         <button
//           onClick={handleProfileSettings}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             width: '100%',
//             padding: '10px 16px',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             color: '#17263a',
//             transition: 'background 0.15s ease',
//             fontFamily: 'inherit',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//           </svg>
//           Profile Settings
//         </button>

//         <div style={{
//           height: '1px',
//           background: 'rgba(18, 38, 63, 0.08)',
//           margin: '4px 8px',
//         }} />

//         <button
//           onClick={handleLogout}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             width: '100%',
//             padding: '10px 16px',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             color: '#dc2626',
//             transition: 'background 0.15s ease',
//             fontFamily: 'inherit',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(220, 38, 38, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//           </svg>
//           Logout
//         </button>
//       </div>
//     )
//   }

//   return (
//     <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`} style={{ position: 'relative', zIndex: 9999 }}>
//       <div className="topbarInner">
//         <Link to="/" className="brand brandLink" aria-label="TradesMap home">
//           <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
//         </Link>

//         {variant === 'transparent' ? (
//           <nav className="navLinks" aria-label="Top navigation">
//             <a href="#" className="navLink">Faqs</a>
//             <a href="#" className="navLink">About</a>
//             <a href="#" className="navLink">Contact</a>
//           </nav>
//         ) : null}

//         {variant === 'solid' ? (
//           <div className="topbarCenter" aria-label="Header search">
//             <div className="topbarSearch">
//               <span className="topbarSearchIcon" aria-hidden="true">
//                 <IconSearch />
//               </span>
//               <input className="topbarSearchInput" type="search" placeholder="Search" />
//             </div>
//           </div>
//         ) : null}

//         <nav className="navActions" aria-label="Authentication navigation">
//           {variant === 'solid' ? (
//             <div className="navActionsSolid">
//               <button type="button" className="navIconButton" aria-label="Notifications">
//                 <IconBell />
//                 <span className="navIconBadge" aria-hidden="true">7</span>
//               </button>
              
//               {/* Avatar with dynamic image */}
//               <button
//                 ref={avatarRef}
//                 type="button"
//                 onClick={toggleDropdown}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   display: 'flex',
//                   alignItems: 'center',
//                 }}
//               >
//                 <img 
//                   className="topbarAvatar" 
//                   src={profileImage} // ✅ Dynamic image from state
//                   alt="Worker avatar"
//                   style={{
//                     border: isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent',
//                     borderRadius: '50%',
//                     transition: 'border 0.2s ease',
//                     width: '40px',
//                     height: '40px',
//                     objectFit: 'cover',
//                   }}
//                 />
//               </button>
//             </div>
//           ) : (
//             <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
//               Login
//             </NavLink>
//           )}
//         </nav>
//       </div>

//       {isDropdownOpen && createPortal(<DropdownMenu />, document.body)}
//     </header>
//   )
// }


// // src/common/components/TopNav.jsx
// import { useState, useRef, useEffect } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { createPortal } from 'react-dom'
// import { IconSearch, IconBell } from './Icons'

// export function TopNav({ variant = 'transparent' }) {
//   const navigate = useNavigate()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)

//   // ✅ Initialize profile image from localStorage
//   const [profileImage, setProfileImage] = useState(() => {
//     const saved = localStorage.getItem('userProfileImage')
//     console.log('🖼️ Initial profile image from localStorage:', saved)
//     return saved || '/assets/worker.avif'
//   })

//   // ✅ Listen for localStorage changes (cross-tab)
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'userProfileImage') {
//         console.log('🔄 Storage changed, updating avatar to:', e.newValue)
//         setProfileImage(e.newValue || '/assets/worker.avif')
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   // ✅ Custom event listener for same-tab updates
//   useEffect(() => {
//     const handleProfileUpdate = (e) => {
//       if (e.detail && e.detail.profileImage) {
//         console.log('🔄 Profile update event received:', e.detail.profileImage)
//         setProfileImage(e.detail.profileImage)
//       }
//     }
//     window.addEventListener('profileImageUpdated', handleProfileUpdate)
//     return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
//   }, [])

//   // ✅ Force re-render when component mounts
//   useEffect(() => {
//     const saved = localStorage.getItem('userProfileImage')
//     if (saved && saved !== profileImage) {
//       console.log('🔄 Syncing profile image on mount:', saved)
//       setProfileImage(saved)
//     }
//   }, [])

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Update dropdown position when opened
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleProfileSettings = () => {
//     setIsDropdownOpen(false)
//     navigate('/wizard/summary')
//   }

//   const handleLogout = () => {
//     setIsDropdownOpen(false)
//     navigate('/login')
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   // Dropdown menu component
//   const DropdownMenu = () => {
//     return (
//       <div
//         ref={dropdownRef}
//         style={{
//           position: 'fixed',
//           top: `${dropdownPosition.top}px`,
//           right: `${dropdownPosition.right}px`,
//           minWidth: '200px',
//           background: 'white',
//           borderRadius: '12px',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
//           border: '1px solid rgba(18, 38, 63, 0.08)',
//           overflow: 'hidden',
//           zIndex: 9999999,
//           padding: '4px 0',
//           opacity: 1,
//           visibility: 'visible',
//           pointerEvents: 'auto',
//           display: 'block',
//         }}
//       >
//         <button
//           onClick={handleProfileSettings}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             width: '100%',
//             padding: '10px 16px',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             color: '#17263a',
//             transition: 'background 0.15s ease',
//             fontFamily: 'inherit',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//           </svg>
//           Profile Settings
//         </button>

//         <div style={{
//           height: '1px',
//           background: 'rgba(18, 38, 63, 0.08)',
//           margin: '4px 8px',
//         }} />

//         <button
//           onClick={handleLogout}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             width: '100%',
//             padding: '10px 16px',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             color: '#dc2626',
//             transition: 'background 0.15s ease',
//             fontFamily: 'inherit',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(220, 38, 38, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//           </svg>
//           Logout
//         </button>
//       </div>
//     )
//   }

//   return (
//     <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`} style={{ position: 'relative', zIndex: 9999 }}>
//       <div className="topbarInner">
//         <Link to="/" className="brand brandLink" aria-label="TradesMap home">
//           <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
//         </Link>

//         {variant === 'transparent' ? (
//           <nav className="navLinks" aria-label="Top navigation">
//             <a href="#" className="navLink">Faqs</a>
//             <a href="#" className="navLink">About</a>
//             <a href="#" className="navLink">Contact</a>
//           </nav>
//         ) : null}

//         {variant === 'solid' ? (
//           <div className="topbarCenter" aria-label="Header search">
//             <div className="topbarSearch">
//               <span className="topbarSearchIcon" aria-hidden="true">
//                 <IconSearch />
//               </span>
//               <input className="topbarSearchInput" type="search" placeholder="Search" />
//             </div>
//           </div>
//         ) : null}

//         <nav className="navActions" aria-label="Authentication navigation">
//           {variant === 'solid' ? (
//             <div className="navActionsSolid">
//               <button type="button" className="navIconButton" aria-label="Notifications">
//                 <IconBell />
//                 <span className="navIconBadge" aria-hidden="true">7</span>
//               </button>
              
//               {/* Avatar with dynamic image */}
//               <button
//                 ref={avatarRef}
//                 type="button"
//                 onClick={toggleDropdown}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   display: 'flex',
//                   alignItems: 'center',
//                 }}
//               >
//                 <img 
//                   className="topbarAvatar" 
//                   src={profileImage}
//                   alt="Worker avatar"
//                   style={{
//                     border: isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent',
//                     borderRadius: '50%',
//                     transition: 'border 0.2s ease',
//                     width: '40px',
//                     height: '40px',
//                     objectFit: 'cover',
//                   }}
//                 />
//               </button>
//             </div>
//           ) : (
//             <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
//               Login
//             </NavLink>
//           )}
//         </nav>
//       </div>

//       {isDropdownOpen && createPortal(<DropdownMenu />, document.body)}
//     </header>
//   )
// }




// // src/common/components/TopNav.jsx
// import { useState, useRef, useEffect } from 'react'
// import { Link, NavLink, useNavigate } from 'react-router-dom'
// import { createPortal } from 'react-dom'
// import { IconSearch, IconBell } from './Icons'
// import api from '../../services/api'  // ✅ ADD THIS IMPORT

// export function TopNav({ variant = 'transparent' }) {
//   const navigate = useNavigate()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const [profileImage, setProfileImage] = useState('/assets/worker.avif')
//   const [imageLoading, setImageLoading] = useState(false)
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)

//   // ============================================================
//   // ✅ GET FRESH PROFILE IMAGE URL
//   // ============================================================
  
//   const getFreshProfileImage = async (fileKey) => {
//     if (!fileKey) return null
    
//     try {
//       console.log('🔄 TopNav: Getting fresh profile image URL for:', fileKey)
//       setImageLoading(true)
      
//       const response = await api.get(`/upload/view/${encodeURIComponent(fileKey)}`)
      
//       if (response.data.success && response.data.data.viewUrl) {
//         console.log('✅ TopNav: Fresh profile image URL generated')
//         return response.data.data.viewUrl
//       }
//       return null
//     } catch (error) {
//       console.error('❌ TopNav: Error getting fresh profile image:', error)
//       return null
//     } finally {
//       setImageLoading(false)
//     }
//   }

//   // ============================================================
//   // ✅ LOAD PROFILE IMAGE FROM DYNAMODB
//   // ============================================================
  
//   const loadProfileImage = async () => {
//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId) return

//       console.log('📊 TopNav: Fetching profile for user:', userId)
      
//       // Import workerService dynamically to avoid circular dependency
//       const workerService = (await import('../../worker/services/workerService')).default
//       const result = await workerService.getWorkerProfile(userId)
      
//       if (result.success && result.data) {
//         const basics = result.data.basics || {}
        
//         // If profileImageKey exists, get fresh URL
//         if (basics.profileImageKey) {
//           const freshUrl = await getFreshProfileImage(basics.profileImageKey)
//           if (freshUrl) {
//             setProfileImage(freshUrl)
//             localStorage.setItem('userProfileImage', freshUrl)
//             console.log('✅ TopNav: Profile image updated from DynamoDB')
//             return
//           }
//         }
        
//         // Fallback to stored URL
//         if (basics.profilePreview) {
//           setProfileImage(basics.profilePreview)
//           localStorage.setItem('userProfileImage', basics.profilePreview)
//           console.log('✅ TopNav: Profile image loaded from stored URL')
//           return
//         }
//       }
      
//       // No profile image found, use default
//       setProfileImage('/assets/worker.avif')
      
//     } catch (error) {
//       console.error('❌ TopNav: Error loading profile image:', error)
//       // Don't update image on error, keep existing or default
//     }
//   }

//   // ============================================================
//   // ✅ INITIALIZE AND LOAD PROFILE IMAGE
//   // ============================================================
  
//   useEffect(() => {
//     // First, check localStorage
//     const saved = localStorage.getItem('userProfileImage')
//     if (saved) {
//       console.log('🖼️ TopNav: Initial profile image from localStorage:', saved)
//       setProfileImage(saved)
//     }
    
//     // Then load from DynamoDB for fresh URL
//     loadProfileImage()
//   }, [])

//   // ✅ Listen for localStorage changes (cross-tab)
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'userProfileImage') {
//         console.log('🔄 TopNav: Storage changed, updating avatar to:', e.newValue)
//         setProfileImage(e.newValue || '/assets/worker.avif')
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   // ✅ Custom event listener for same-tab updates
//   useEffect(() => {
//     const handleProfileUpdate = (e) => {
//       if (e.detail && e.detail.profileImage) {
//         console.log('🔄 TopNav: Profile update event received:', e.detail.profileImage)
//         setProfileImage(e.detail.profileImage)
//         // Also refresh from DynamoDB to get fresh URL
//         loadProfileImage()
//       }
//     }
//     window.addEventListener('profileImageUpdated', handleProfileUpdate)
//     return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
//   }, [])

//   // ✅ Listen for navigation changes to refresh image
//   useEffect(() => {
//     // When navigating to summary page, refresh image
//     const handleNavigate = () => {
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== profileImage) {
//         setProfileImage(saved)
//       }
//     }
    
//     window.addEventListener('popstate', handleNavigate)
//     return () => window.removeEventListener('popstate', handleNavigate)
//   }, [profileImage])

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Update dropdown position when opened
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleProfileSettings = () => {
//     setIsDropdownOpen(false)
//     navigate('/wizard/summary')
//   }

//   const handleLogout = () => {
//     setIsDropdownOpen(false)
//     // ✅ Clear image from localStorage on logout
//     localStorage.removeItem('userProfileImage')
//     setProfileImage('/assets/worker.avif')
//     navigate('/login')
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   // Dropdown menu component
//   const DropdownMenu = () => {
//     return (
//       <div
//         ref={dropdownRef}
//         style={{
//           position: 'fixed',
//           top: `${dropdownPosition.top}px`,
//           right: `${dropdownPosition.right}px`,
//           minWidth: '200px',
//           background: 'white',
//           borderRadius: '12px',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
//           border: '1px solid rgba(18, 38, 63, 0.08)',
//           overflow: 'hidden',
//           zIndex: 9999999,
//           padding: '4px 0',
//           opacity: 1,
//           visibility: 'visible',
//           pointerEvents: 'auto',
//           display: 'block',
//         }}
//       >
//         <button
//           onClick={handleProfileSettings}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             width: '100%',
//             padding: '10px 16px',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             color: '#17263a',
//             transition: 'background 0.15s ease',
//             fontFamily: 'inherit',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//           </svg>
//           Profile Settings
//         </button>

//         <div style={{
//           height: '1px',
//           background: 'rgba(18, 38, 63, 0.08)',
//           margin: '4px 8px',
//         }} />

//         <button
//           onClick={handleLogout}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             width: '100%',
//             padding: '10px 16px',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             color: '#dc2626',
//             transition: 'background 0.15s ease',
//             fontFamily: 'inherit',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(220, 38, 38, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//           </svg>
//           Logout
//         </button>
//       </div>
//     )
//   }

//   // ============================================================
//   // ✅ IMAGE ERROR HANDLER - FALLBACK TO DEFAULT
//   // ============================================================
  
//   const handleImageError = () => {
//     console.warn('⚠️ TopNav: Profile image failed to load, using fallback')
//     setProfileImage('/assets/worker.avif')
//     localStorage.setItem('userProfileImage', '/assets/worker.avif')
//   }

//   return (
//     <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`} style={{ position: 'relative', zIndex: 9999 }}>
//       <div className="topbarInner">
//         <Link to="/" className="brand brandLink" aria-label="TradesMap home">
//           <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
//         </Link>

//         {variant === 'transparent' ? (
//           <nav className="navLinks" aria-label="Top navigation">
//             <a href="#" className="navLink">Faqs</a>
//             <a href="#" className="navLink">About</a>
//             <a href="#" className="navLink">Contact</a>
//           </nav>
//         ) : null}

//         {variant === 'solid' ? (
//           <div className="topbarCenter" aria-label="Header search">
//             <div className="topbarSearch">
//               <span className="topbarSearchIcon" aria-hidden="true">
//                 <IconSearch />
//               </span>
//               <input className="topbarSearchInput" type="search" placeholder="Search" />
//             </div>
//           </div>
//         ) : null}

//         <nav className="navActions" aria-label="Authentication navigation">
//           {variant === 'solid' ? (
//             <div className="navActionsSolid">
//               <button type="button" className="navIconButton" aria-label="Notifications">
//                 <IconBell />
//                 <span className="navIconBadge" aria-hidden="true">7</span>
//               </button>
              
//               {/* ✅ Avatar with dynamic image and fallback */}
//               <button
//                 ref={avatarRef}
//                 type="button"
//                 onClick={toggleDropdown}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   display: 'flex',
//                   alignItems: 'center',
//                   position: 'relative',
//                 }}
//               >
//                 <img 
//                   className="topbarAvatar" 
//                   src={profileImage}
//                   alt="Worker avatar"
//                   style={{
//                     border: isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent',
//                     borderRadius: '50%',
//                     transition: 'border 0.2s ease',
//                     width: '40px',
//                     height: '40px',
//                     objectFit: 'cover',
//                     background: '#f0f0f0',
//                   }}
//                   onError={handleImageError}
//                 />
//                 {imageLoading && (
//                   <div style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     background: 'rgba(255,255,255,0.7)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontSize: '12px',
//                   }}>
//                     ⏳
//                   </div>
//                 )}
//               </button>
//             </div>
//           ) : (
//             <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
//               Login
//             </NavLink>
//           )}
//         </nav>
//       </div>

//       {isDropdownOpen && createPortal(<DropdownMenu />, document.body)}
//     </header>
//   )
// }




// // src/common/components/TopNav.jsx
// import { useState, useRef, useEffect } from 'react'
// import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'
// import { createPortal } from 'react-dom'
// import { IconSearch, IconBell } from './Icons'
// import api from '../../services/api'

// export function TopNav({ variant = 'transparent' }) {
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const [profileImage, setProfileImage] = useState('/assets/worker.avif')
//   const [imageLoading, setImageLoading] = useState(false)
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)

//   // ============================================================
//   // ✅ CHECK IF PROFILE SETTINGS SHOULD BE VISIBLE IN DROPDOWN
//   // ============================================================
  
//   const shouldShowProfileSettings = () => {
//     const path = location.pathname
    
//     // ✅ Hide during registration and verification
//     const hiddenPaths = [
//       '/register',
//       '/login',
//       '/verify',
//       '/verify-email',
//       '/verify-phone',
//       '/reset-password',
//       '/forgot-password'
//     ]
    
//     if (hiddenPaths.includes(path)) {
//       return false
//     }
    
//     // ✅ Hide wizard steps (1-5) but SHOW summary page
//     // /wizard/step1, /wizard/step2, /wizard/step3, /wizard/step4, /wizard/step5 → HIDE
//     // /wizard/summary → SHOW
//     if (path.startsWith('/wizard') && !path.startsWith('/wizard/summary')) {
//       return false
//     }
    
//     // ✅ Show on summary page and all other pages
//     return true
//   }

//   // ============================================================
//   // ✅ GET FRESH PROFILE IMAGE URL
//   // ============================================================
  
//   const getFreshProfileImage = async (fileKey) => {
//     if (!fileKey) return null
    
//     try {
//       console.log('🔄 TopNav: Getting fresh profile image URL for:', fileKey)
//       setImageLoading(true)
      
//       const response = await api.get(`/upload/view/${encodeURIComponent(fileKey)}`)
      
//       if (response.data.success && response.data.data.viewUrl) {
//         console.log('✅ TopNav: Fresh profile image URL generated')
//         return response.data.data.viewUrl
//       }
//       return null
//     } catch (error) {
//       console.error('❌ TopNav: Error getting fresh profile image:', error)
//       return null
//     } finally {
//       setImageLoading(false)
//     }
//   }

//   // ============================================================
//   // ✅ LOAD PROFILE IMAGE FROM DYNAMODB
//   // ============================================================
  
//   const loadProfileImage = async () => {
//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId) return

//       console.log('📊 TopNav: Fetching profile for user:', userId)
      
//       const workerService = (await import('../../worker/services/workerService')).default
//       const result = await workerService.getWorkerProfile(userId)
      
//       if (result.success && result.data) {
//         const basics = result.data.basics || {}
        
//         if (basics.profileImageKey) {
//           const freshUrl = await getFreshProfileImage(basics.profileImageKey)
//           if (freshUrl) {
//             setProfileImage(freshUrl)
//             localStorage.setItem('userProfileImage', freshUrl)
//             console.log('✅ TopNav: Profile image updated from DynamoDB')
//             return
//           }
//         }
        
//         if (basics.profilePreview) {
//           setProfileImage(basics.profilePreview)
//           localStorage.setItem('userProfileImage', basics.profilePreview)
//           console.log('✅ TopNav: Profile image loaded from stored URL')
//           return
//         }
//       }
      
//       setProfileImage('/assets/worker.avif')
      
//     } catch (error) {
//       console.error('❌ TopNav: Error loading profile image:', error)
//     }
//   }

//   // ============================================================
//   // ✅ IMMEDIATELY UPDATE IMAGE FROM LOCALSTORAGE
//   // ============================================================
  
//   const updateProfileImageFromStorage = () => {
//     const saved = localStorage.getItem('userProfileImage')
//     if (saved && saved !== profileImage) {
//       console.log('🔄 TopNav: Updating profile image from localStorage:', saved)
//       setProfileImage(saved)
//     }
//   }

//   // ============================================================
//   // ✅ INITIALIZE AND LOAD PROFILE IMAGE
//   // ============================================================
  
//   useEffect(() => {
//     const saved = localStorage.getItem('userProfileImage')
//     if (saved) {
//       console.log('🖼️ TopNav: Initial profile image from localStorage:', saved)
//       setProfileImage(saved)
//     }
    
//     loadProfileImage()
//   }, [])

//   // ✅ Listen for localStorage changes (cross-tab)
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'userProfileImage') {
//         console.log('🔄 TopNav: Storage changed, updating avatar to:', e.newValue)
//         setProfileImage(e.newValue || '/assets/worker.avif')
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   // ✅ Custom event listener for same-tab updates
//   useEffect(() => {
//     const handleProfileUpdate = (e) => {
//       if (e.detail && e.detail.profileImage) {
//         console.log('🔄 TopNav: Profile update event received:', e.detail.profileImage)
//         setProfileImage(e.detail.profileImage)
//         localStorage.setItem('userProfileImage', e.detail.profileImage)
//       }
//     }
//     window.addEventListener('profileImageUpdated', handleProfileUpdate)
//     return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
//   }, [])

//   // ✅ Listen for navigation changes to refresh image
//   useEffect(() => {
//     const handleNavigate = () => {
//       updateProfileImageFromStorage()
//     }
    
//     window.addEventListener('popstate', handleNavigate)
//     return () => window.removeEventListener('popstate', handleNavigate)
//   }, [profileImage])

//   // ✅ Also check for image updates on location change
//   useEffect(() => {
//     updateProfileImageFromStorage()
//   }, [location.pathname])

//   // Handle click outside to close dropdown
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Update dropdown position when opened
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleProfileSettings = () => {
//     setIsDropdownOpen(false)
//     navigate('/wizard/summary')
//   }

//   const handleLogout = () => {
//     setIsDropdownOpen(false)
//     localStorage.removeItem('userProfileImage')
//     setProfileImage('/assets/worker.avif')
//     navigate('/login')
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   const showProfileSettings = shouldShowProfileSettings()

//   // ============================================================
//   // ✅ DROPDOWN MENU
//   // ============================================================
  
//   const DropdownMenu = () => {
//     return (
//       <div
//         ref={dropdownRef}
//         style={{
//           position: 'fixed',
//           top: `${dropdownPosition.top}px`,
//           right: `${dropdownPosition.right}px`,
//           minWidth: '200px',
//           background: 'white',
//           borderRadius: '12px',
//           boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
//           border: '1px solid rgba(18, 38, 63, 0.08)',
//           overflow: 'hidden',
//           zIndex: 9999999,
//           padding: '4px 0',
//           opacity: 1,
//           visibility: 'visible',
//           pointerEvents: 'auto',
//           display: 'block',
//         }}
//       >
//         {showProfileSettings && (
//           <>
//             <button
//               onClick={handleProfileSettings}
//               style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: '12px',
//                 width: '100%',
//                 padding: '10px 16px',
//                 background: 'transparent',
//                 border: 'none',
//                 cursor: 'pointer',
//                 fontSize: '14px',
//                 color: '#17263a',
//                 transition: 'background 0.15s ease',
//                 fontFamily: 'inherit',
//               }}
//               onMouseEnter={(e) => {
//                 e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'
//               }}
//               onMouseLeave={(e) => {
//                 e.currentTarget.style.background = 'transparent'
//               }}
//             >
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                 <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//               </svg>
//               Profile Settings
//             </button>

//             <div style={{
//               height: '1px',
//               background: 'rgba(18, 38, 63, 0.08)',
//               margin: '4px 8px',
//             }} />
//           </>
//         )}

//         <button
//           onClick={handleLogout}
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             gap: '12px',
//             width: '100%',
//             padding: '10px 16px',
//             background: 'transparent',
//             border: 'none',
//             cursor: 'pointer',
//             fontSize: '14px',
//             color: '#dc2626',
//             transition: 'background 0.15s ease',
//             fontFamily: 'inherit',
//           }}
//           onMouseEnter={(e) => {
//             e.currentTarget.style.background = 'rgba(220, 38, 38, 0.06)'
//           }}
//           onMouseLeave={(e) => {
//             e.currentTarget.style.background = 'transparent'
//           }}
//         >
//           <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//             <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//           </svg>
//           Logout
//         </button>
//       </div>
//     )
//   }

//   // ============================================================
//   // ✅ IMAGE ERROR HANDLER
//   // ============================================================
  
//   const handleImageError = () => {
//     console.warn('⚠️ TopNav: Profile image failed to load, using fallback')
//     setProfileImage('/assets/worker.avif')
//     localStorage.setItem('userProfileImage', '/assets/worker.avif')
//   }

//   return (
//     <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`} style={{ position: 'relative', zIndex: 9999 }}>
//       <div className="topbarInner">
//         <Link to="/" className="brand brandLink" aria-label="TradesMap home">
//           <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
//         </Link>

//         {variant === 'transparent' ? (
//           <nav className="navLinks" aria-label="Top navigation">
//             <a href="#" className="navLink">Faqs</a>
//             <a href="#" className="navLink">About</a>
//             <a href="#" className="navLink">Contact</a>
//           </nav>
//         ) : null}

//         {variant === 'solid' ? (
//           <div className="topbarCenter" aria-label="Header search">
//             <div className="topbarSearch">
//               <span className="topbarSearchIcon" aria-hidden="true">
//                 <IconSearch />
//               </span>
//               <input className="topbarSearchInput" type="search" placeholder="Search" />
//             </div>
//           </div>
//         ) : null}

//         <nav className="navActions" aria-label="Authentication navigation">
//           {variant === 'solid' ? (
//             <div className="navActionsSolid">
//               <button type="button" className="navIconButton" aria-label="Notifications">
//                 <IconBell />
//                 <span className="navIconBadge" aria-hidden="true">7</span>
//               </button>
              
//               {/* ✅ Avatar with dynamic image and fallback */}
//               <button
//                 ref={avatarRef}
//                 type="button"
//                 onClick={toggleDropdown}
//                 style={{
//                   background: 'none',
//                   border: 'none',
//                   cursor: 'pointer',
//                   padding: 0,
//                   display: 'flex',
//                   alignItems: 'center',
//                   position: 'relative',
//                 }}
//               >
//                 <img 
//                   className="topbarAvatar" 
//                   src={profileImage}
//                   alt="Worker avatar"
//                   style={{
//                     border: isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent',
//                     borderRadius: '50%',
//                     transition: 'border 0.2s ease',
//                     width: '40px',
//                     height: '40px',
//                     objectFit: 'cover',
//                     background: '#f0f0f0',
//                   }}
//                   onError={handleImageError}
//                 />
//                 {imageLoading && (
//                   <div style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     background: 'rgba(255,255,255,0.7)',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     fontSize: '12px',
//                   }}>
//                     ⏳
//                   </div>
//                 )}
//               </button>
//             </div>
//           ) : (
//             <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
//               Login
//             </NavLink>
//           )}
//         </nav>
//       </div>

//       {isDropdownOpen && createPortal(<DropdownMenu />, document.body)}
//     </header>
//   )
// }




// src/common/components/TopNav.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from './LanguageSwitcher'
import api from '../../services/api'

// Icons (keep all your existing icons)
function IconMenu(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
    </svg>
  )
}

function IconClose(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
    </svg>
  )
}

function IconUser(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5z" fill="currentColor" />
    </svg>
  )
}

function IconLogout(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4z" fill="currentColor" />
    </svg>
  )
}

export function TopNav({ variant = 'solid', hideNav = false }) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userName, setUserName] = useState('')
  const [userInitial, setUserInitial] = useState('')
  const [profileImage, setProfileImage] = useState('/assets/worker.avif')
  const [imageLoading, setImageLoading] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [fileKey, setFileKey] = useState(null) // ✅ Store the file key for refresh
  const dropdownRef = useRef(null)
  const avatarRef = useRef(null)
  const menuRef = useRef(null)

  // ============================================================
  // ✅ CHECK AUTHENTICATION
  // ============================================================
  
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
  }, [location.pathname])

  // ============================================================
  // ✅ GET USER INFO
  // ============================================================
  
  const getUserInfo = () => {
    const firstName = localStorage.getItem('pendingFirstName') || 
                      sessionStorage.getItem('wizardFirstName') || 
                      localStorage.getItem('userFirstName') ||
                      'User'
    const lastName = localStorage.getItem('pendingLastName') || 
                     sessionStorage.getItem('wizardLastName') || 
                     localStorage.getItem('userLastName') ||
                     ''
    
    if (firstName) {
      setUserName(`${firstName} ${lastName}`.trim())
      setUserInitial(firstName.charAt(0).toUpperCase())
    }
  }

  // ============================================================
  // ✅ GET FRESH PROFILE IMAGE URL FROM S3
  // ============================================================
  
  const getFreshProfileImage = async (key) => {
    if (!key) return null
    
    try {
      console.log('🔄 TopNav: Getting fresh profile image URL for:', key)
      setImageLoading(true)
      
      // ✅ Use the view endpoint to get a fresh presigned URL
      const response = await api.get(`/upload/view/${encodeURIComponent(key)}`)
      
      if (response.data.success && response.data.data.viewUrl) {
        const freshUrl = response.data.data.viewUrl
        console.log('✅ TopNav: Fresh profile image URL generated')
        return freshUrl
      }
      return null
    } catch (error) {
      console.error('❌ TopNav: Error getting fresh profile image:', error)
      return null
    } finally {
      setImageLoading(false)
    }
  }

  // ============================================================
  // ✅ LOAD PROFILE IMAGE FROM DYNAMODB
  // ============================================================
  
  const loadProfileImage = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        console.log('ℹ️ TopNav: No userId found')
        return
      }

      console.log('📊 TopNav: Fetching profile for user:', userId)
      
      const workerService = (await import('../../worker/services/workerService')).default
      const result = await workerService.getWorkerProfile(userId)
      
      console.log('📊 TopNav: Profile result:', result)
      
      if (result.success && result.data) {
        const basics = result.data.basics || {}
        const profileImageKey = basics.profileImageKey
        
        console.log('📸 TopNav: Profile image key:', profileImageKey)
        
        // ✅ If we have a file key, get a fresh URL from S3
        if (profileImageKey) {
          setFileKey(profileImageKey)
          const freshUrl = await getFreshProfileImage(profileImageKey)
          if (freshUrl) {
            setProfileImage(freshUrl)
            localStorage.setItem('userProfileImage', freshUrl)
            console.log('✅ TopNav: Profile image updated from S3 with fresh URL')
            return
          }
        }
        
        // ✅ Fallback to profilePreview
        if (basics.profilePreview) {
          setProfileImage(basics.profilePreview)
          localStorage.setItem('userProfileImage', basics.profilePreview)
          console.log('✅ TopNav: Profile image loaded from stored URL')
          return
        }
      }
      
      // ✅ If no image found, use default
      setProfileImage('/assets/worker.avif')
      
    } catch (error) {
      console.error('❌ TopNav: Error loading profile image:', error)
      setProfileImage('/assets/worker.avif')
    }
  }

  // ============================================================
  // ✅ REFRESH IMAGE URL (Called when image fails to load)
  // ============================================================
  
  const refreshImageUrl = async () => {
    if (!fileKey) {
      // Try to get fileKey from localStorage
      const savedKey = localStorage.getItem('profileImageKey')
      if (savedKey) {
        setFileKey(savedKey)
        const freshUrl = await getFreshProfileImage(savedKey)
        if (freshUrl) {
          setProfileImage(freshUrl)
          localStorage.setItem('userProfileImage', freshUrl)
          return true
        }
      }
      return false
    }
    
    const freshUrl = await getFreshProfileImage(fileKey)
    if (freshUrl) {
      setProfileImage(freshUrl)
      localStorage.setItem('userProfileImage', freshUrl)
      return true
    }
    return false
  }

  // ============================================================
  // ✅ INITIALIZE
  // ============================================================
  
  useEffect(() => {
    getUserInfo()
    
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
    
    // ✅ Check if we have a saved image URL, but don't rely on it
    const saved = localStorage.getItem('userProfileImage')
    const savedKey = localStorage.getItem('profileImageKey')
    
    if (savedKey) {
      setFileKey(savedKey)
    }
    
    // ✅ Always fetch fresh URL if authenticated
    if (token) {
      loadProfileImage()
    } else if (saved && saved !== '/assets/worker.avif') {
      // Only use cached image if not authenticated (shouldn't happen)
      setProfileImage(saved)
    }
  }, [])

  // ✅ Reload when route changes
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setIsAuthenticated(!!token)
    
    if (token && (location.pathname === '/wizard/summary' || location.pathname === '/wizard')) {
      loadProfileImage()
    }
  }, [location.pathname])

  // ✅ Listen for profile image updates
  useEffect(() => {
    const handleProfileUpdate = (e) => {
      if (e.detail) {
        console.log('🔄 TopNav: Profile update event received:', e.detail)
        
        // ✅ Store the file key if provided
        if (e.detail.fileKey) {
          setFileKey(e.detail.fileKey)
          localStorage.setItem('profileImageKey', e.detail.fileKey)
        }
        
        // ✅ Get fresh URL if we have a file key
        if (e.detail.fileKey) {
          getFreshProfileImage(e.detail.fileKey).then(freshUrl => {
            if (freshUrl) {
              setProfileImage(freshUrl)
              localStorage.setItem('userProfileImage', freshUrl)
            }
          })
        } else if (e.detail.profileImage) {
          setProfileImage(e.detail.profileImage)
          localStorage.setItem('userProfileImage', e.detail.profileImage)
        }
        
        // ✅ Update user info
        if (e.detail.firstName) {
          const firstName = e.detail.firstName
          const lastName = e.detail.lastName || ''
          setUserName(`${firstName} ${lastName}`.trim())
          setUserInitial(firstName.charAt(0).toUpperCase())
          localStorage.setItem('pendingFirstName', firstName)
          if (lastName) localStorage.setItem('pendingLastName', lastName)
        }
      }
    }
    window.addEventListener('profileImageUpdated', handleProfileUpdate)
    return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
  }, [])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Update dropdown position
  useEffect(() => {
    if (isDropdownOpen && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      })
    }
  }, [isDropdownOpen])

  const handleLogout = () => {
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('pendingEmail')
    localStorage.removeItem('pendingPassword')
    localStorage.removeItem('pendingPhoneNumber')
    localStorage.removeItem('pendingFirstName')
    localStorage.removeItem('pendingLastName')
    localStorage.removeItem('pendingDob')
    localStorage.removeItem('pendingLanguage')
    localStorage.removeItem('userFirstName')
    localStorage.removeItem('userLastName')
    localStorage.removeItem('userProfileImage')
    localStorage.removeItem('profileImageKey')
    
    sessionStorage.clear()
    
    setProfileImage('/assets/worker.avif')
    setIsAuthenticated(false)
    navigate('/login')
  }

  const handleNavigate = (path) => {
    setIsMobileMenuOpen(false)
    setIsDropdownOpen(false)
    navigate(path)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // Determine if we're on auth pages
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  if (isAuthPage && variant === 'auth') {
    return null
  }

  if (hideNav) {
    return null
  }

  const isSolid = variant === 'solid'
  const isTransparent = variant === 'transparent'

  // ✅ Handle image error - refresh the URL
  const handleImageError = async () => {
    console.warn('⚠️ TopNav: Profile image failed to load, refreshing URL...')
    const refreshed = await refreshImageUrl()
    if (!refreshed) {
      console.warn('⚠️ TopNav: Could not refresh image, using fallback')
      setProfileImage('/assets/worker.avif')
    }
  }

  return (
    <>
      <style>
        {`
          .topnav {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: ${isSolid ? 'white' : isTransparent ? 'transparent' : 'white'};
            border-bottom: ${isSolid || isTransparent ? '1px solid rgba(18, 38, 63, 0.08)' : 'none'};
            backdrop-filter: ${isTransparent && isScrolled ? 'blur(12px)' : 'none'};
            background-color: ${isTransparent && isScrolled ? 'rgba(255, 255, 255, 0.85)' : isTransparent ? 'transparent' : 'white'};
            transition: all 0.3s ease;
            box-shadow: ${isScrolled ? '0 2px 16px rgba(0, 0, 0, 0.06)' : 'none'};
          }

          .topnav-container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 24px;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .topnav-logo {
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            flex-shrink: 0;
            text-decoration: none;
          }

          .topnav-logo img {
            height: 32px;
            width: auto;
          }

          .topnav-logo-text {
            font-size: 18px;
            font-weight: 700;
            color: #0f4ea9;
            letter-spacing: -0.5px;
          }

          .topnav-right {
            display: flex;
            align-items: center;
            gap: 12px;
            flex-shrink: 0;
          }

          .topnav-login-btn {
            padding: 8px 20px;
            border: none;
            background: #0f4ea9;
            color: white;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
            white-space: nowrap;
          }

          .topnav-login-btn:hover {
            background: #0b3f90;
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
          }

          .topnav-user-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 12px 4px 4px;
            border-radius: 30px;
            background: rgba(15, 78, 169, 0.06);
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            font-family: inherit;
            text-decoration: none;
            position: relative;
          }

          .topnav-user-btn:hover {
            background: rgba(15, 78, 169, 0.1);
          }

          .topnav-avatar {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #0f4ea9;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            font-weight: 600;
            flex-shrink: 0;
            overflow: hidden;
            border: ${isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent'};
            transition: border 0.2s ease;
          }

          .topnav-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .topnav-avatar-text {
            font-size: 14px;
            font-weight: 600;
          }

          .topnav-user-name {
            font-size: 14px;
            font-weight: 500;
            color: #17263a;
            white-space: nowrap;
          }

          .topnav-mobile-menu-btn {
            display: none;
            background: none;
            border: none;
            cursor: pointer;
            color: #17263a;
            padding: 8px;
            border-radius: 8px;
            transition: background 0.2s ease;
          }

          .topnav-mobile-menu-btn:hover {
            background: rgba(15, 78, 169, 0.06);
          }

          .topnav-mobile-menu {
            display: none;
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            padding: 20px 24px;
            flex-direction: column;
            gap: 8px;
            overflow-y: auto;
            z-index: 999;
            border-top: 1px solid rgba(18, 38, 63, 0.08);
            animation: slideDown 0.25s ease;
          }

          .topnav-mobile-menu.open {
            display: flex;
          }

          .topnav-mobile-link {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: 10px;
            color: #17263a;
            font-size: 15px;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;
            cursor: pointer;
            background: transparent;
            border: none;
            font-family: inherit;
            width: 100%;
            text-align: left;
          }

          .topnav-mobile-link:hover {
            background: rgba(15, 78, 169, 0.06);
          }

          .topnav-mobile-divider {
            border: none;
            border-top: 1px solid rgba(18, 38, 63, 0.08);
            margin: 8px 0;
          }

          .topnav-mobile-user {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: 10px;
            background: rgba(15, 78, 169, 0.04);
          }

          .topnav-mobile-avatar {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #0f4ea9;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 600;
            flex-shrink: 0;
            overflow: hidden;
          }

          .topnav-mobile-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .topnav-mobile-user-name {
            font-size: 15px;
            font-weight: 600;
            color: #17263a;
          }

          .topnav-mobile-user-email {
            font-size: 13px;
            color: #64748b;
          }

          .topnav-mobile-logout {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            border-radius: 10px;
            color: #dc2626;
            font-size: 15px;
            font-weight: 500;
            background: transparent;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            font-family: inherit;
            width: 100%;
            text-align: left;
          }

          .topnav-mobile-logout:hover {
            background: rgba(220, 38, 38, 0.06);
          }

          .topnav-language-wrapper {
            display: flex;
            align-items: center;
          }

          .topnav-dropdown {
            position: fixed;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
            border: 1px solid rgba(18, 38, 63, 0.08);
            overflow: hidden;
            z-index: 9999;
            padding: 4px 0;
            min-width: 200px;
          }

          .topnav-dropdown-item {
            display: flex;
            align-items: center;
            gap: 12px;
            width: 100%;
            padding: 10px 16px;
            background: transparent;
            border: none;
            cursor: pointer;
            font-size: 14px;
            color: #17263a;
            transition: background 0.15s ease;
            font-family: inherit;
          }

          .topnav-dropdown-item:hover {
            background: rgba(15, 78, 169, 0.06);
          }

          .topnav-dropdown-item.logout {
            color: #dc2626;
          }

          .topnav-dropdown-item.logout:hover {
            background: rgba(220, 38, 38, 0.06);
          }

          .topnav-dropdown-divider {
            height: 1px;
            background: rgba(18, 38, 63, 0.08);
            margin: 4px 8px;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 768px) {
            .topnav-right .topnav-login-btn {
              display: none;
            }

            .topnav-right .topnav-user-btn .topnav-user-name {
              display: none;
            }

            .topnav-mobile-menu-btn {
              display: flex;
              align-items: center;
              justify-content: center;
            }

            .topnav-container {
              padding: 0 16px;
              height: 56px;
            }

            .topnav-logo img {
              height: 28px;
            }

            .topnav-logo-text {
              font-size: 16px;
            }
          }

          @media (min-width: 769px) {
            .topnav-mobile-menu {
              display: none !important;
            }
          }

          .topnav-hidden {
            display: none !important;
          }
        `}
      </style>

      <nav className={`topnav ${isAuthPage && variant === 'auth' ? 'topnav-hidden' : ''}`}>
        <div className="topnav-container">
          {/* Logo */}
          <a 
            className="topnav-logo" 
            onClick={() => handleNavigate('/')}
            href="#"
          >
            <img src="/assets/logo_tradesmap.png" alt="TradesMap" />
            <span className="topnav-logo-text">TradesMap</span>
          </a>

          {/* Right Side */}
          <div className="topnav-right">
            {/* Language Switcher */}
            <div className="topnav-language-wrapper">
              <LanguageSwitcher variant="dropdown" />
            </div>

            {/* Login Button OR User Avatar */}
            {!isAuthenticated ? (
              <button 
                className="topnav-login-btn"
                onClick={() => navigate('/login')}
              >
                {t('auth.login') || 'Log in'}
              </button>
            ) : (
              <>
                <button 
                  ref={avatarRef}
                  className="topnav-user-btn"
                  onClick={toggleDropdown}
                  title={userName || 'User'}
                >
                  <div className="topnav-avatar">
                    {profileImage && profileImage !== '/assets/worker.avif' ? (
                      <img 
                        key={profileImage} // ✅ Force re-render when URL changes
                        src={profileImage} 
                        alt={userName || 'User'} 
                        onError={handleImageError}
                      />
                    ) : (
                      <span className="topnav-avatar-text">{userInitial || 'U'}</span>
                    )}
                  </div>
                  <span className="topnav-user-name">
                    {userName || 'User'}
                  </span>
                  {imageLoading && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                    }}>
                      ⏳
                    </div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    ref={dropdownRef}
                    className="topnav-dropdown"
                    style={{
                      top: `${dropdownPosition.top}px`,
                      right: `${dropdownPosition.right}px`,
                    }}
                  >
                    <button
                      className="topnav-dropdown-item"
                      onClick={() => handleNavigate('/wizard/summary')}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
                      </svg>
                      {t('nav.profile') || 'Profile Settings'}
                    </button>

                    <div className="topnav-dropdown-divider" />

                    <button
                      className="topnav-dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
                      </svg>
                      {t('nav.logout') || 'Sign out'}
                    </button>
                  </div>
                )}
              </>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="topnav-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`topnav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
          {isAuthenticated && (
            <>
              <div className="topnav-mobile-user">
                <div className="topnav-mobile-avatar">
                  {profileImage && profileImage !== '/assets/worker.avif' ? (
                    <img 
                      key={profileImage}
                      src={profileImage} 
                      alt={userName || 'User'} 
                      onError={handleImageError}
                    />
                  ) : (
                    userInitial || 'U'
                  )}
                </div>
                <div>
                  <div className="topnav-mobile-user-name">
                    {userName || 'User'}
                  </div>
                  <div className="topnav-mobile-user-email">
                    {localStorage.getItem('pendingEmail') || ''}
                  </div>
                </div>
              </div>
              <hr className="topnav-mobile-divider" />
            </>
          )}

          {!isAuthenticated ? (
            <>
              <button 
                className="topnav-mobile-link"
                onClick={() => handleNavigate('/login')}
                style={{ 
                  background: '#0f4ea9', 
                  color: 'white',
                  borderRadius: '10px',
                  fontWeight: 600
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconUser />
                  {t('auth.login') || 'Log in'}
                </span>
              </button>
              <button 
                className="topnav-mobile-link"
                onClick={() => handleNavigate('/register')}
                style={{ 
                  border: '2px solid #0f4ea9',
                  borderRadius: '10px',
                  fontWeight: 500
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconUser />
                  {t('auth.register') || 'Register'}
                </span>
              </button>
              <hr className="topnav-mobile-divider" />
            </>
          ) : (
            <>
              <button 
                className="topnav-mobile-link"
                onClick={() => handleNavigate('/wizard/summary')}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
                  </svg>
                  {t('nav.profile') || 'Profile'}
                </span>
              </button>
              <button 
                className="topnav-mobile-logout"
                onClick={handleLogout}
              >
                <IconLogout />
                {t('nav.logout') || 'Sign out'}
              </button>
              <hr className="topnav-mobile-divider" />
            </>
          )}

          <div style={{ padding: '8px 16px' }}>
            <div style={{ 
              fontSize: '13px', 
              fontWeight: 600, 
              color: 'rgba(23, 38, 58, 0.5)',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              {t('nav.language') || 'Language'}
            </div>
            <LanguageSwitcher variant="inline" />
          </div>
        </div>
      </nav>
    </>
  )
}

export default TopNav