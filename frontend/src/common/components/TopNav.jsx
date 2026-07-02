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




// src/worker/components/wizard-steps/WizardStep1.jsx
import { useState, useRef, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { TextField } from '../../../common/components/TextField'
import { IconUser, IconMail, IconPhone, IconLocation, IconUpload } from '../../../common/components/Icons'
import wizardService from '../../../services/workerWizardService'

// US States data
const US_STATES = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DE' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'ID' },
  { name: 'Illinois', code: 'IL' },
  { name: 'Indiana', code: 'IN' },
  { name: 'Iowa', code: 'IA' },
  { name: 'Kansas', code: 'KS' },
  { name: 'Kentucky', code: 'KY' },
  { name: 'Louisiana', code: 'LA' },
  { name: 'Maine', code: 'ME' },
  { name: 'Maryland', code: 'MD' },
  { name: 'Massachusetts', code: 'MA' },
  { name: 'Michigan', code: 'MI' },
  { name: 'Minnesota', code: 'MN' },
  { name: 'Mississippi', code: 'MS' },
  { name: 'Missouri', code: 'MO' },
  { name: 'Montana', code: 'MT' },
  { name: 'Nebraska', code: 'NE' },
  { name: 'Nevada', code: 'NV' },
  { name: 'New Hampshire', code: 'NH' },
  { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' },
  { name: 'New York', code: 'NY' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'North Dakota', code: 'ND' },
  { name: 'Ohio', code: 'OH' },
  { name: 'Oklahoma', code: 'OK' },
  { name: 'Oregon', code: 'OR' },
  { name: 'Pennsylvania', code: 'PA' },
  { name: 'Rhode Island', code: 'RI' },
  { name: 'South Carolina', code: 'SC' },
  { name: 'South Dakota', code: 'SD' },
  { name: 'Tennessee', code: 'TN' },
  { name: 'Texas', code: 'TX' },
  { name: 'Utah', code: 'UT' },
  { name: 'Vermont', code: 'VT' },
  { name: 'Virginia', code: 'VA' },
  { name: 'Washington', code: 'WA' },
  { name: 'West Virginia', code: 'WV' },
  { name: 'Wisconsin', code: 'WI' },
  { name: 'Wyoming', code: 'WY' },
]

// Custom State Dropdown Component - Displays state name, stores state code
function StateDropdown({ value, onChange, placeholder = 'State' }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Get the state name for a given code
  const getStateName = (code) => {
    if (!code) return ''
    const state = US_STATES.find(s => s.code === code)
    return state ? state.name : ''
  }

  // Get the display text for the dropdown
  const getDisplayText = () => {
    if (!value) return placeholder
    const name = getStateName(value)
    return name || placeholder
  }

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      {/* Dropdown Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          height: '48px',
          padding: '0 16px',
          paddingRight: '40px',
          border: '1px solid rgba(18, 38, 63, 0.12)',
          borderRadius: '12px',
          fontSize: '14px',
          outline: 'none',
          background: 'white',
          color: value ? '#17263a' : '#6b7280',
          transition: 'all 0.2s ease',
          fontFamily: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none',
          boxShadow: isOpen ? '0 0 0 3px rgba(15, 78, 169, 0.1)' : 'none',
          borderColor: isOpen ? '#0f4ea9' : 'rgba(18, 38, 63, 0.12)',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'rgba(15, 78, 169, 0.4)'
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.borderColor = 'rgba(18, 38, 63, 0.12)'
          }
        }}
      >
        <span>{getDisplayText()}</span>
        <svg 
          width="12" 
          height="12" 
          viewBox="0 0 12 12" 
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease',
            flexShrink: 0
          }}
        >
          <path fill="#17263a" d="M6 8L1 3h10z" />
        </svg>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 4px)',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'auto',
            background: 'white',
            border: '1px solid rgba(18, 38, 63, 0.12)',
            borderRadius: '12px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12)',
            zIndex: 1000,
            padding: '4px 0',
          }}
        >
          {/* Placeholder option */}
          <div
            onClick={() => {
              onChange('')
              setIsOpen(false)
            }}
            style={{
              padding: '10px 16px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#6b7280',
              transition: 'all 0.15s ease',
              borderRadius: '8px',
              margin: '2px 4px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(15, 78, 169, 0.08)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            {placeholder}
          </div>

          {/* State options */}
          {US_STATES.map((state) => (
            <div
              key={state.code}
              onClick={() => {
                onChange(state.code)
                setIsOpen(false)
              }}
              style={{
                padding: '10px 16px',
                cursor: 'pointer',
                fontSize: '14px',
                color: value === state.code ? '#0f4ea9' : '#17263a',
                fontWeight: value === state.code ? '600' : '400',
                background: value === state.code ? 'rgba(15, 78, 169, 0.08)' : 'transparent',
                transition: 'all 0.15s ease',
                borderRadius: '8px',
                margin: '2px 4px',
              }}
              onMouseEnter={(e) => {
                if (value !== state.code) {
                  e.currentTarget.style.background = 'rgba(15, 78, 169, 0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (value !== state.code) {
                  e.currentTarget.style.background = 'transparent'
                }
              }}
            >
              {state.name}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// IconSupport component
function IconSupport(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="currentColor"/>
    </svg>
  )
}

export function WizardStep1({ data, onChange, onNext }) {
  const [profilePreview, setProfilePreview] = useState(data.profilePreview || '')
  const [profileImage, setProfileImage] = useState(null)
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')
  
  const uploadRef = useRef(null)
  const datePickerRef = useRef(null)
  
  // Debug logging to track state changes
  useEffect(() => {
    console.log('WizardStep1 - data.stateCode:', data.stateCode)
    console.log('WizardStep1 - data.currentStateCode:', data.currentStateCode)
  }, [data.stateCode, data.currentStateCode])
  
  const handleChange = (field, value) => {
    console.log(`Updating ${field} to:`, value)
    onChange({ ...data, [field]: value })
  }

  // ✅ Updated file upload handler with navbar update
  const handleFileUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size must be less than 5MB')
      return
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file')
      return
    }

    setIsUploading(true)
    setUploadError('')

    try {
      // Get userId from localStorage
      const userId = localStorage.getItem('userId') || 'temp-user'
      
      // Upload to S3 via presigned URL
      const result = await wizardService.uploadProfileImage(userId, file)
      
      if (result.success) {
        // ✅ 1. Update local state
        setProfilePreview(result.fileUrl)
        handleChange('profilePreview', result.fileUrl)
        handleChange('profileImageKey', result.fileKey)
        handleChange('profileImageUrl', result.fileUrl)
        
        // ✅ 2. Save to localStorage for navbar
        localStorage.setItem('userProfileImage', result.fileUrl)
        
        // ✅ 3. Dispatch custom event for same-tab navbar update
        window.dispatchEvent(new CustomEvent('profileImageUpdated', {
          detail: { profileImage: result.fileUrl }
        }))
        
        console.log('✅ Profile image uploaded and navbar updated!')
      }
    } catch (error) {
      console.error('Error uploading profile image:', error)
      setUploadError('Failed to upload image. Please try again.')
    } finally {
      setIsUploading(false)
    }
  }

  // Handle date change from react-datepicker
  const handleDateChange = (date) => {
    if (date) {
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      const year = date.getFullYear()
      handleChange('dob', `${month}/${day}/${year}`)
    } else {
      handleChange('dob', '')
    }
    setIsDatePickerOpen(false)
  }

  // Parse date string to Date object for react-datepicker
  const parseDate = (dateStr) => {
    if (!dateStr) return null
    const parts = dateStr.split('/')
    if (parts.length === 3) {
      return new Date(`${parts[2]}-${parts[0]}-${parts[1]}`)
    }
    return null
  }

  const isValid = data.emailAddress && data.mobilePhone && data.legalFirstName && data.legalLastName && data.dob && data.city && data.stateCode && data.zip

  // Custom styles for date picker matching WizardStep3
  const datePickerStyles = `
    /* Date picker styles - matching WizardStep3 */
    .date-picker-wrapper {
      position: relative;
      width: 100%;
    }

    .date-picker-wrapper .react-datepicker__input-container {
      display: block;
      width: 100%;
    }

    .date-picker-wrapper .react-datepicker__input-container input {
      width: 100%;
      height: 40px;
      padding: 0 12px;
      padding-right: 36px !important;
      border: 1px solid rgba(18, 38, 63, 0.12);
      border-radius: 8px;
      font-size: 13px;
      outline: none;
      background: white;
      color: #17263a;
      transition: all 0.2s ease;
      font-family: inherit;
      box-sizing: border-box;
    }

    .date-picker-wrapper .react-datepicker__input-container input:hover {
      border-color: rgba(15, 78, 169, 0.4);
    }

    .date-picker-wrapper .react-datepicker__input-container input:focus {
      border-color: #0f4ea9;
      box-shadow: 0 0 0 3px rgba(15, 78, 169, 0.1);
    }

    .date-picker-wrapper .react-datepicker__input-container input::placeholder {
      color: rgba(23, 38, 58, 0.4);
    }

    .date-picker-wrapper .calendar-icon {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: rgba(23, 38, 58, 0.5);
      pointer-events: none;
      font-size: 16px;
      line-height: 1;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Override any default DatePicker styles that might affect positioning */
    .date-picker-wrapper .react-datepicker-wrapper {
      display: block;
      width: 100%;
    }

    .custom-date-picker .react-datepicker {
      font-family: inherit;
      border-radius: 12px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12), 0 4px 12px rgba(0, 0, 0, 0.04);
      background: white;
      padding: 8px;
      overflow: hidden;
      font-size: 13px;
    }

    .custom-date-picker .react-datepicker__header {
      background: white;
      border-bottom: 1px solid rgba(18, 38, 63, 0.06);
      padding: 10px 0 6px 0;
      border-radius: 12px 12px 0 0;
    }

    .custom-date-picker .react-datepicker__current-month {
      color: #17263a;
      font-weight: 700;
      font-size: 14px;
      padding-bottom: 4px;
    }

    .custom-date-picker .react-datepicker__day-name {
      color: rgba(23, 38, 58, 0.5);
      font-weight: 600;
      font-size: 11px;
      width: 32px;
      margin: 2px;
    }

    .custom-date-picker .react-datepicker__day {
      width: 32px;
      height: 32px;
      line-height: 32px;
      margin: 2px;
      border-radius: 8px;
      font-size: 13px;
      color: #17263a;
      transition: all 0.15s ease;
      cursor: pointer;
    }

    .custom-date-picker .react-datepicker__day:hover {
      background: rgba(15, 78, 169, 0.08);
      border-radius: 8px;
    }

    .custom-date-picker .react-datepicker__day--selected {
      background: #0f4ea9 !important;
      color: white !important;
      border-radius: 8px;
      font-weight: 600;
    }

    .custom-date-picker .react-datepicker__day--selected:hover {
      background: #0b3f90 !important;
    }

    .custom-date-picker .react-datepicker__day--keyboard-selected {
      background: rgba(15, 78, 169, 0.15);
      border-radius: 8px;
    }

    .custom-date-picker .react-datepicker__day--today {
      font-weight: 700;
      color: #0f4ea9;
    }

    .custom-date-picker .react-datepicker__day--today::after {
      content: '';
      display: block;
      width: 4px;
      height: 4px;
      background: #0f4ea9;
      border-radius: 50%;
      margin: 0 auto;
      margin-top: -2px;
    }

    .custom-date-picker .react-datepicker__day--disabled {
      color: rgba(23, 38, 58, 0.2);
      cursor: not-allowed;
    }

    .custom-date-picker .react-datepicker__day--disabled:hover {
      background: transparent;
    }

    .custom-date-picker .react-datepicker__day--outside-month {
      color: rgba(23, 38, 58, 0.2);
    }

    .custom-date-picker .react-datepicker__navigation {
      top: 12px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 6px;
      transition: all 0.15s ease;
    }

    .custom-date-picker .react-datepicker__navigation:hover {
      background: rgba(15, 78, 169, 0.08);
    }

    .custom-date-picker .react-datepicker__navigation-icon::before {
      border-color: #17263a;
      border-width: 2px 2px 0 0;
      height: 7px;
      width: 7px;
    }

    .custom-date-picker .react-datepicker__navigation-icon:hover::before {
      border-color: #0f4ea9;
    }

    .custom-date-picker .react-datepicker__day--weekend {
      color: #e11d48;
    }

    .custom-date-picker .react-datepicker__day--weekend.react-datepicker__day--selected {
      color: white;
    }

    /* Month dropdown styling */
    .custom-date-picker .react-datepicker__month-dropdown,
    .custom-date-picker .react-datepicker__year-dropdown {
      border-radius: 12px;
      border: 1px solid rgba(18, 38, 63, 0.08);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      background: white;
      padding: 4px;
    }

    .custom-date-picker .react-datepicker__month-option,
    .custom-date-picker .react-datepicker__year-option {
      padding: 8px 16px;
      border-radius: 8px;
      transition: all 0.15s ease;
      cursor: pointer;
    }

    .custom-date-picker .react-datepicker__month-option:hover,
    .custom-date-picker .react-datepicker__year-option:hover {
      background: rgba(15, 78, 169, 0.08);
    }

    .custom-date-picker .react-datepicker__month-option--selected,
    .custom-date-picker .react-datepicker__year-option--selected {
      background: rgba(15, 78, 169, 0.1);
      font-weight: 600;
    }
  `

  return (
    <div className="wizardStep">
      {/* Inject custom styles */}
      <style>{datePickerStyles}</style>
      
      <div className="wizardBody">
        {/* Personal Information Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Personal Information</div>
          <div className="wizardGrid2">
            <TextField 
              placeholder="First name" 
              icon={<IconUser />} 
              value={data.legalFirstName || ''} 
              onChange={(v) => handleChange('legalFirstName', v)} 
            />
            <TextField 
              placeholder="Last name" 
              icon={<IconUser />} 
              value={data.legalLastName || ''} 
              onChange={(v) => handleChange('legalLastName', v)} 
            />
            <TextField 
              placeholder="Email Address" 
              icon={<IconMail />} 
              value={data.emailAddress || ''} 
              onChange={(v) => handleChange('emailAddress', v)} 
            />
            <TextField 
              placeholder="Mobile number" 
              icon={<IconPhone />} 
              value={data.mobilePhone || ''} 
              onChange={(v) => handleChange('mobilePhone', v)} 
            />
          </div>
        </div>

        {/* Address + Current Address */}
        <div className="wizardSection">
          <div className="wizardGrid2">
            {/* Address */}
            <div>
              <div className="wizardSectionBar">Address</div>
              <TextField
                placeholder="Address"
                icon={<IconLocation />}
                value={data.addressLine1 || ''}
                onChange={(v) => handleChange('addressLine1', v)}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <TextField
                  placeholder="City"
                  icon={<IconLocation />}
                  value={data.city || ''}
                  onChange={(v) => handleChange('city', v)}
                  style={{ flex: 1 }}
                />
                <div style={{ flex: 1 }}>
                  <StateDropdown
                    value={data.stateCode || ''}
                    onChange={(v) => handleChange('stateCode', v)}
                    placeholder="State"
                  />
                </div>
                <TextField
                  placeholder="Zip"
                  icon={<IconLocation />}
                  value={data.zip || ''}
                  onChange={(v) => handleChange('zip', v)}
                  style={{ flex: 1 }}
                />
              </div>
            </div>

            {/* Current Address */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div className="wizardSectionBar" style={{ marginBottom: 0 }}>
                  Current Address
                </div>
                <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={data.sameAsAddress || false}
                    onChange={(e) => {
                      const checked = e.target.checked
                      onChange({
                        ...data,
                        sameAsAddress: checked,
                        currentAddressLine1: checked ? data.addressLine1 : '',
                        currentCity: checked ? data.city : '',
                        currentStateCode: checked ? data.stateCode : '',
                        currentZip: checked ? data.zip : '',
                      })
                    }}
                  />
                  Same as Address
                </label>
              </div>
              <TextField
                placeholder="Address"
                icon={<IconLocation />}
                value={data.currentAddressLine1 || ''}
                onChange={(v) => handleChange('currentAddressLine1', v)}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <TextField
                  placeholder="City"
                  icon={<IconLocation />}
                  value={data.currentCity || ''}
                  onChange={(v) => handleChange('currentCity', v)}
                  style={{ flex: 1 }}
                />
                <div style={{ flex: 1 }}>
                  <StateDropdown
                    value={data.currentStateCode || ''}
                    onChange={(v) => handleChange('currentStateCode', v)}
                    placeholder="State"
                  />
                </div>
                <TextField
                  placeholder="Zip"
                  icon={<IconLocation />}
                  value={data.currentZip || ''}
                  onChange={(v) => handleChange('currentZip', v)}
                  style={{ flex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="wizardSection">
          <div className="wizardGrid2">
            {/* DOB - React DatePicker matching WizardStep3 style */}
            <div>
              <div className="wizardSectionBar">Date of Birth</div>
              <div className="date-picker-wrapper custom-date-picker">
                <DatePicker
                  ref={datePickerRef}
                  selected={parseDate(data.dob)}
                  onChange={handleDateChange}
                  dateFormat="MM/dd/yyyy"
                  placeholderText="MM/DD/YYYY"
                  maxDate={new Date()}
                  onCalendarOpen={() => setIsDatePickerOpen(true)}
                  onCalendarClose={() => setIsDatePickerOpen(false)}
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  yearDropdownItemNumber={100}
                  scrollableYearDropdown
                  className="date-picker-input"
                  popperPlacement="bottom-start"
                  popperModifiers={[
                    {
                      name: 'offset',
                      options: {
                        offset: [0, 8],
                      },
                    },
                  ]}
                />
                <span className="calendar-icon">📅</span>
              </div>
            </div>

            {/* Languages */}
            <div>
              <div className="wizardSectionBar">Language(s) Known</div>
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '15px' }}>
                <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={data.english || false}
                    onChange={(e) => handleChange('english', e.target.checked)}
                  />
                  English
                </label>
                <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={data.englishSpanish || false}
                    onChange={(e) => handleChange('englishSpanish', e.target.checked)}
                  />
                  English+Spanish
                </label>
                <label className="wizardCheck" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <input
                    type="checkbox"
                    checked={data.spanish || false}
                    onChange={(e) => handleChange('spanish', e.target.checked)}
                  />
                  Spanish
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image Section - Updated with upload state */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Profile Image</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'rgba(15,78,169,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              border: '2px solid rgba(15,78,169,0.2)'
            }}>
              {profilePreview ? (
                <img src={profilePreview} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <IconUser style={{ width: '40px', height: '40px', color: 'rgba(15,78,169,0.5)' }} />
              )}
            </div>
            
            <div>
              <button
                type="button"
                onClick={() => uploadRef.current?.click()}
                disabled={isUploading}
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '6px',
                  padding: '8px 24px',
                  background: isUploading ? 'rgba(15,78,169,0.05)' : 'rgba(15,78,169,0.1)',
                  borderRadius: '25px',
                  cursor: isUploading ? 'not-allowed' : 'pointer',
                  fontSize: '13px',
                  fontWeight: '600',
                  border: 'none',
                  color: isUploading ? '#94a3b8' : '#0f4ea9',
                  opacity: isUploading ? 0.6 : 1
                }}
              >
                {isUploading ? '⏳ Uploading...' : (
                  <>
                    <IconUpload style={{ width: '14px', height: '14px' }} />
                    Upload
                  </>
                )}
              </button>
              {uploadError && (
                <div style={{ color: '#e11d48', fontSize: '12px', marginTop: '4px' }}>
                  {uploadError}
                </div>
              )}
            </div>
            <input 
              ref={uploadRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileUpload} 
              style={{ display: 'none' }} 
            />
          </div>
        </div>

        {/* Agreements Section */}
        <div className="wizardSection">
          <div className="wizardSectionBar">Agreements</div>
          <div className="wizardChecks">
            <label className="wizardCheck">
              <input type="checkbox" checked={data.acceptTerms || false} onChange={(e) => handleChange('acceptTerms', e.target.checked)} />
              I accept the bottomless terms of use
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.acceptPrivacy || false} onChange={(e) => handleChange('acceptPrivacy', e.target.checked)} />
              I accept the privacy policy
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.consentElectronic || false} onChange={(e) => handleChange('consentElectronic', e.target.checked)} />
              I consent to electronic records
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.certifyAccurate || false} onChange={(e) => handleChange('certifyAccurate', e.target.checked)} />
              I confirm the information entered is accurate
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}