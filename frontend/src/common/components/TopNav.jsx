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



// src/common/components/TopNav.jsx
import { useState, useRef, useEffect } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { createPortal } from 'react-dom'
import { IconSearch, IconBell } from './Icons'  // ✅ Only these icons needed

export function TopNav({ variant = 'transparent' }) {
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
  const dropdownRef = useRef(null)
  const avatarRef = useRef(null)

  // ✅ Get profile image from localStorage
  const [profileImage, setProfileImage] = useState(() => {
    return localStorage.getItem('userProfileImage') || '/assets/worker.avif'
  })

  // ✅ Listen for storage changes (other tabs/windows)
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'userProfileImage') {
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
        setProfileImage(e.detail.profileImage)
      }
    }
    window.addEventListener('profileImageUpdated', handleProfileUpdate)
    return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
  }, [])

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
    navigate('/login')
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

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
              
              {/* Avatar with dynamic image */}
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
                  }}
                />
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
              Login
            </NavLink>
          )}
        </nav>
      </div>

      {isDropdownOpen && createPortal(<DropdownMenu />, document.body)}
    </header>
  )
}