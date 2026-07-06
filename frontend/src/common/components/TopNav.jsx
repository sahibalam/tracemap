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







// src/common/components/TopNav.jsx
import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'  // ✅ ADD useLocation
import { createPortal } from 'react-dom'
import { IconSearch, IconBell } from './Icons'
import api from '../../services/api'

export function TopNav({ variant = 'transparent' }) {
  const navigate = useNavigate()
  const location = useLocation()  // ✅ ADD THIS
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const [profileImage, setProfileImage] = useState('/assets/worker.avif')
  const [imageLoading, setImageLoading] = useState(false)
  const dropdownRef = useRef(null)
  const avatarRef = useRef(null)

  // ============================================================
  // ✅ CHECK IF PROFILE SETTINGS SHOULD BE VISIBLE
  // ============================================================
  
  const isProfileSettingsVisible = () => {
    const path = location.pathname
    
    // ✅ Hide during registration and wizard flow
    const hiddenPaths = [
      '/register',
      '/login',
      '/verify',
      '/verify-email',
      '/wizard',
      '/verify-phone',
      '/reset-password',
      '/forgot-password'
    ]
    
    // Check if current path is in hidden paths
    if (hiddenPaths.includes(path)) {
      return false
    }
    
    // Also hide if path starts with /wizard (for wizard steps)
    if (path.startsWith('/wizard')) {
      return false
    }
    
    // ✅ Show on summary page and other pages
    return true
  }

  // ============================================================
  // ✅ GET FRESH PROFILE IMAGE URL
  // ============================================================
  
  const getFreshProfileImage = async (fileKey) => {
    if (!fileKey) return null
    
    try {
      console.log('🔄 TopNav: Getting fresh profile image URL for:', fileKey)
      setImageLoading(true)
      
      const response = await api.get(`/upload/view/${encodeURIComponent(fileKey)}`)
      
      if (response.data.success && response.data.data.viewUrl) {
        console.log('✅ TopNav: Fresh profile image URL generated')
        return response.data.data.viewUrl
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
      if (!userId) return

      console.log('📊 TopNav: Fetching profile for user:', userId)
      
      const workerService = (await import('../../worker/services/workerService')).default
      const result = await workerService.getWorkerProfile(userId)
      
      if (result.success && result.data) {
        const basics = result.data.basics || {}
        
        if (basics.profileImageKey) {
          const freshUrl = await getFreshProfileImage(basics.profileImageKey)
          if (freshUrl) {
            setProfileImage(freshUrl)
            localStorage.setItem('userProfileImage', freshUrl)
            console.log('✅ TopNav: Profile image updated from DynamoDB')
            return
          }
        }
        
        if (basics.profilePreview) {
          setProfileImage(basics.profilePreview)
          localStorage.setItem('userProfileImage', basics.profilePreview)
          console.log('✅ TopNav: Profile image loaded from stored URL')
          return
        }
      }
      
      setProfileImage('/assets/worker.avif')
      
    } catch (error) {
      console.error('❌ TopNav: Error loading profile image:', error)
    }
  }

  // ============================================================
  // ✅ INITIALIZE AND LOAD PROFILE IMAGE
  // ============================================================
  
  useEffect(() => {
    const saved = localStorage.getItem('userProfileImage')
    if (saved) {
      console.log('🖼️ TopNav: Initial profile image from localStorage:', saved)
      setProfileImage(saved)
    }
    
    loadProfileImage()
  }, [])

  // ✅ Listen for localStorage changes (cross-tab)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'userProfileImage') {
        console.log('🔄 TopNav: Storage changed, updating avatar to:', e.newValue)
        setProfileImage(e.newValue || '/assets/worker.avif')
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // ✅ Custom event listener for same-tab updates
  useEffect(() => {
    const handleProfileUpdate = (e) => {
      if (e.detail && e.detail.profileImage) {
        console.log('🔄 TopNav: Profile update event received:', e.detail.profileImage)
        setProfileImage(e.detail.profileImage)
        loadProfileImage()
      }
    }
    window.addEventListener('profileImageUpdated', handleProfileUpdate)
    return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
  }, [])

  // ✅ Listen for navigation changes to refresh image
  useEffect(() => {
    const handleNavigate = () => {
      const saved = localStorage.getItem('userProfileImage')
      if (saved && saved !== profileImage) {
        setProfileImage(saved)
      }
    }
    
    window.addEventListener('popstate', handleNavigate)
    return () => window.removeEventListener('popstate', handleNavigate)
  }, [profileImage])

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Update dropdown position when opened
  useEffect(() => {
    if (isDropdownOpen && avatarRef.current) {
      const rect = avatarRef.current.getBoundingClientRect()
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      })
    }
  }, [isDropdownOpen])

  const handleProfileSettings = () => {
    setIsDropdownOpen(false)
    navigate('/wizard/summary')
  }

  const handleLogout = () => {
    setIsDropdownOpen(false)
    localStorage.removeItem('userProfileImage')
    setProfileImage('/assets/worker.avif')
    navigate('/login')
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  // ✅ Determine if profile settings should be visible
  const showProfileSettings = isProfileSettingsVisible()

  // Dropdown menu component
  const DropdownMenu = () => {
    return (
      <div
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: `${dropdownPosition.top}px`,
          right: `${dropdownPosition.right}px`,
          minWidth: '200px',
          background: 'white',
          borderRadius: '12px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(18, 38, 63, 0.08)',
          overflow: 'hidden',
          zIndex: 9999999,
          padding: '4px 0',
          opacity: 1,
          visibility: 'visible',
          pointerEvents: 'auto',
          display: 'block',
        }}
      >
        <button
          onClick={handleProfileSettings}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '10px 16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#17263a',
            transition: 'background 0.15s ease',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(15, 78, 169, 0.06)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
          </svg>
          Profile Settings
        </button>

        <div style={{
          height: '1px',
          background: 'rgba(18, 38, 63, 0.08)',
          margin: '4px 8px',
        }} />

        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: '10px 16px',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '14px',
            color: '#dc2626',
            transition: 'background 0.15s ease',
            fontFamily: 'inherit',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(220, 38, 38, 0.06)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
          </svg>
          Logout
        </button>
      </div>
    )
  }

  // ============================================================
  // ✅ IMAGE ERROR HANDLER - FALLBACK TO DEFAULT
  // ============================================================
  
  const handleImageError = () => {
    console.warn('⚠️ TopNav: Profile image failed to load, using fallback')
    setProfileImage('/assets/worker.avif')
    localStorage.setItem('userProfileImage', '/assets/worker.avif')
  }

  return (
    <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`} style={{ position: 'relative', zIndex: 9999 }}>
      <div className="topbarInner">
        <Link to="/" className="brand brandLink" aria-label="TradesMap home">
          <img className="brandLogo" src="/assets/Logo_tradesmaps.png" alt="TradesMap" />
        </Link>

        {variant === 'transparent' ? (
          <nav className="navLinks" aria-label="Top navigation">
            <a href="#" className="navLink">Faqs</a>
            <a href="#" className="navLink">About</a>
            <a href="#" className="navLink">Contact</a>
          </nav>
        ) : null}

        {variant === 'solid' ? (
          <div className="topbarCenter" aria-label="Header search">
            <div className="topbarSearch">
              <span className="topbarSearchIcon" aria-hidden="true">
                <IconSearch />
              </span>
              <input className="topbarSearchInput" type="search" placeholder="Search" />
            </div>
          </div>
        ) : null}

        <nav className="navActions" aria-label="Authentication navigation">
          {variant === 'solid' ? (
            <div className="navActionsSolid">
              <button type="button" className="navIconButton" aria-label="Notifications">
                <IconBell />
                <span className="navIconBadge" aria-hidden="true">7</span>
              </button>
              
              {/* ✅ ONLY SHOW AVATAR + DROPDOWN when profile settings are visible */}
              {showProfileSettings ? (
                <button
                  ref={avatarRef}
                  type="button"
                  onClick={toggleDropdown}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <img 
                    className="topbarAvatar" 
                    src={profileImage}
                    alt="Worker avatar"
                    style={{
                      border: isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent',
                      borderRadius: '50%',
                      transition: 'border 0.2s ease',
                      width: '40px',
                      height: '40px',
                      objectFit: 'cover',
                      background: '#f0f0f0',
                    }}
                    onError={handleImageError}
                  />
                  {imageLoading && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '40px',
                      height: '40px',
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
              ) : (
                // ✅ Show placeholder or nothing during registration/wizard
                <div style={{ width: '40px', height: '40px' }} />
              )}
            </div>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
              Login
            </NavLink>
          )}
        </nav>
      </div>

      {isDropdownOpen && showProfileSettings && createPortal(<DropdownMenu />, document.body)}
    </header>
  )
}