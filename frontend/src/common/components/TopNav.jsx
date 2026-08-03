
// // src/common/components/TopNav.jsx
// import { useState, useEffect, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import { LanguageSwitcher } from './LanguageSwitcher'
// import api from '../../services/api'

// // Icons
// function IconMenu(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconClose(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// // ✅ ADDED: Bell Icon for Notifications
// function IconBell(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor" />
//     </svg>
//   )
// }

// export function TopNav({ variant = 'solid', hideNav = false }) {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [userName, setUserName] = useState('')
//   const [userInitial, setUserInitial] = useState('')
//   const [profileImage, setProfileImage] = useState('/assets/worker.avif')
//   const [imageLoading, setImageLoading] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [fileKey, setFileKey] = useState(null)
//   const [imageLoadAttempts, setImageLoadAttempts] = useState(0)
  
//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)
//   const menuRef = useRef(null)

//   // ============================================================
//   // ✅ CHECK AUTHENTICATION
//   // ============================================================
  
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
//   }, [location.pathname])

//   // ============================================================
//   // ✅ GET USER INFO
//   // ============================================================
  
//   const getUserInfo = () => {
//     const firstName = localStorage.getItem('pendingFirstName') || 
//                       sessionStorage.getItem('wizardFirstName') || 
//                       localStorage.getItem('userFirstName') ||
//                       'User'
//     const lastName = localStorage.getItem('pendingLastName') || 
//                      sessionStorage.getItem('wizardLastName') || 
//                      localStorage.getItem('userLastName') ||
//                      ''
    
//     if (firstName) {
//       setUserName(`${firstName} ${lastName}`.trim())
//       setUserInitial(firstName.charAt(0).toUpperCase())
//     }
//   }

//   // ============================================================
//   // ✅ GET FRESH PROFILE IMAGE URL FROM S3
//   // ============================================================
  
//   const getFreshProfileImage = async (key) => {
//     if (!key) return null
    
//     try {
//       setImageLoading(true)
//       const response = await api.get(`/upload/view/${encodeURIComponent(key)}`)
      
//       if (response.data.success && response.data.data.viewUrl) {
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
//       if (!userId) {
//         const saved = localStorage.getItem('userProfileImage')
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved)
//         }
//         return
//       }

//       let workerService;
//       try {
//         workerService = (await import('../../worker/services/workerService')).default;
//       } catch (importError) {
//         const saved = localStorage.getItem('userProfileImage');
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved);
//         }
//         return;
//       }
      
//       const result = await workerService.getWorkerProfile(userId)
      
//       if (result.success && result.data) {
//         const basics = result.data.basics || {}
//         const profileImageKey = basics.profileImageKey
        
//         if (profileImageKey) {
//           setFileKey(profileImageKey)
//           localStorage.setItem('profileImageKey', profileImageKey)
//           const freshUrl = await getFreshProfileImage(profileImageKey)
//           if (freshUrl) {
//             setProfileImage(freshUrl)
//             localStorage.setItem('userProfileImage', freshUrl)
//             return
//           }
//         }
        
//         if (basics.profilePreview) {
//           setProfileImage(basics.profilePreview)
//           localStorage.setItem('userProfileImage', basics.profilePreview)
//           return
//         }
//       }
      
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
      
//     } catch (error) {
//       console.error('❌ TopNav: Error loading profile image:', error)
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
//     }
//   }

//   // ============================================================
//   // ✅ REFRESH IMAGE URL
//   // ============================================================
  
//   const refreshImageUrl = async () => {
//     if (imageLoadAttempts > 3) {
//       setProfileImage('/assets/worker.avif')
//       return false
//     }
    
//     setImageLoadAttempts(prev => prev + 1)
    
//     if (!fileKey) {
//       const savedKey = localStorage.getItem('profileImageKey')
//       if (savedKey) {
//         setFileKey(savedKey)
//         const freshUrl = await getFreshProfileImage(savedKey)
//         if (freshUrl) {
//           setProfileImage(freshUrl)
//           localStorage.setItem('userProfileImage', freshUrl)
//           return true
//         }
//       }
//       return false
//     }
    
//     const freshUrl = await getFreshProfileImage(fileKey)
//     if (freshUrl) {
//       setProfileImage(freshUrl)
//       localStorage.setItem('userProfileImage', freshUrl)
//       return true
//     }
//     return false
//   }

//   // ============================================================
//   // ✅ INITIALIZE
//   // ============================================================
  
//   useEffect(() => {
//     getUserInfo()
    
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     const saved = localStorage.getItem('userProfileImage')
//     const savedKey = localStorage.getItem('profileImageKey')
    
//     if (savedKey) {
//       setFileKey(savedKey)
//     }
    
//     if (token || userId) {
//       loadProfileImage()
//     } else if (saved && saved !== '/assets/worker.avif') {
//       setProfileImage(saved)
//     }
    
//     setImageLoadAttempts(0)
//   }, [])

//   // ✅ Reload when route changes
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     if ((token || userId) && (location.pathname === '/wizard/summary' || location.pathname === '/wizard')) {
//       loadProfileImage()
//     }
    
//     setImageLoadAttempts(0)
//   }, [location.pathname])

//   // ✅ Listen for profile image updates
//   useEffect(() => {
//     const handleProfileUpdate = (e) => {
//       if (e.detail) {
//         if (e.detail.fileKey) {
//           setFileKey(e.detail.fileKey)
//           localStorage.setItem('profileImageKey', e.detail.fileKey)
//         }
        
//         if (e.detail.fileKey) {
//           getFreshProfileImage(e.detail.fileKey).then(freshUrl => {
//             if (freshUrl) {
//               setProfileImage(freshUrl)
//               localStorage.setItem('userProfileImage', freshUrl)
//               setImageLoadAttempts(0)
//             }
//           })
//         } else if (e.detail.profileImage) {
//           setProfileImage(e.detail.profileImage)
//           localStorage.setItem('userProfileImage', e.detail.profileImage)
//           setImageLoadAttempts(0)
//         }
        
//         if (e.detail.firstName) {
//           const firstName = e.detail.firstName
//           const lastName = e.detail.lastName || ''
//           setUserName(`${firstName} ${lastName}`.trim())
//           setUserInitial(firstName.charAt(0).toUpperCase())
//           localStorage.setItem('pendingFirstName', firstName)
//           if (lastName) localStorage.setItem('pendingLastName', lastName)
//         }
//       }
//     }
//     window.addEventListener('profileImageUpdated', handleProfileUpdate)
//     return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
//   }, [])

//   // ✅ Listen for localStorage changes
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'userProfileImage') {
//         setProfileImage(e.newValue || '/assets/worker.avif')
//       }
//       if (e.key === 'authToken' || e.key === 'userId') {
//         const token = localStorage.getItem('authToken')
//         const userId = localStorage.getItem('userId')
//         setIsAuthenticated(!!token || !!userId)
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false)
//   }, [location.pathname])

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMobileMenuOpen(false)
//       }
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Update dropdown position
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleLogout = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     localStorage.removeItem('authToken')
//     localStorage.removeItem('userId')
//     localStorage.removeItem('pendingEmail')
//     localStorage.removeItem('pendingPassword')
//     localStorage.removeItem('pendingPhoneNumber')
//     localStorage.removeItem('pendingFirstName')
//     localStorage.removeItem('pendingLastName')
//     localStorage.removeItem('pendingDob')
//     localStorage.removeItem('pendingLanguage')
//     localStorage.removeItem('userFirstName')
//     localStorage.removeItem('userLastName')
//     localStorage.removeItem('userProfileImage')
//     localStorage.removeItem('profileImageKey')
    
//     sessionStorage.clear()
    
//     setProfileImage('/assets/worker.avif')
//     setIsAuthenticated(false)
//     navigate('/login')
//   }

//   const handleNavigate = (path) => {
//     setIsMobileMenuOpen(false)
//     setIsDropdownOpen(false)
//     navigate(path)
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   // ✅ Account Settings - Navigate to new page
//   const handleAccountSettings = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     navigate('/account-settings')
//   }

//   // ✅ NOTIFICATIONS - Navigate to notifications page
//   const handleNotifications = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     navigate('/notifications')
//   }

//   // Handle image error
//   const handleImageError = async () => {
//     const refreshed = await refreshImageUrl()
//     if (!refreshed) {
//       setProfileImage('/assets/worker.avif')
//     }
//   }

//   if (hideNav) {
//     return null
//   }

//   const isSolid = variant === 'solid'
//   const isTransparent = variant === 'transparent'

//   return (
//     <>
//       <style>
//         {`
//           .topnav {
//             position: sticky;
//             top: 0;
//             z-index: 1000;
//             background: ${isSolid ? 'white' : isTransparent ? 'transparent' : 'white'};
//             border-bottom: ${isSolid || isTransparent ? '1px solid rgba(18, 38, 63, 0.08)' : 'none'};
//             backdrop-filter: ${isTransparent && isScrolled ? 'blur(12px)' : 'none'};
//             background-color: ${isTransparent && isScrolled ? 'rgba(255, 255, 255, 0.85)' : isTransparent ? 'transparent' : 'white'};
//             transition: all 0.3s ease;
//             box-shadow: ${isScrolled ? '0 2px 16px rgba(0, 0, 0, 0.06)' : 'none'};
//           }

//           .topnav-container {
//             max-width: 1400px;
//             margin: 0 auto;
//             padding: 0 24px;
//             height: 64px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//           }

//           .topnav-logo {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             cursor: pointer;
//             flex-shrink: 0;
//             text-decoration: none;
//           }

//           .topnav-logo img {
//             height: 32px;
//             width: auto;
//           }

//           .topnav-logo-text {
//             font-size: 18px;
//             font-weight: 700;
//             color: #0f4ea9;
//             letter-spacing: -0.5px;
//           }

//           .topnav-right {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             flex-shrink: 0;
//           }

//           .topnav-login-btn {
//             padding: 8px 20px;
//             border: none;
//             background: #0f4ea9;
//             color: white;
//             border-radius: 8px;
//             font-size: 14px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             white-space: nowrap;
//           }

//           .topnav-login-btn:hover {
//             background: #0b3f90;
//             transform: translateY(-1px);
//             box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
//           }

//           .topnav-user-btn {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             padding: 4px 12px 4px 4px;
//             border-radius: 30px;
//             background: rgba(15, 78, 169, 0.06);
//             cursor: pointer;
//             transition: all 0.2s ease;
//             border: none;
//             font-family: inherit;
//             text-decoration: none;
//             position: relative;
//           }

//           .topnav-user-btn:hover {
//             background: rgba(15, 78, 169, 0.1);
//           }

//           .topnav-avatar {
//             width: 36px;
//             height: 36px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 14px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//             border: ${isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent'};
//             transition: border 0.2s ease;
//           }

//           .topnav-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-avatar-text {
//             font-size: 14px;
//             font-weight: 600;
//           }

//           .topnav-user-name {
//             font-size: 14px;
//             font-weight: 500;
//             color: #17263a;
//             white-space: nowrap;
//           }

//           .topnav-mobile-menu-btn {
//             display: none;
//             background: none;
//             border: none;
//             cursor: pointer;
//             color: #17263a;
//             padding: 8px;
//             border-radius: 8px;
//             transition: background 0.2s ease;
//           }

//           .topnav-mobile-menu-btn:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-menu {
//             display: none;
//             position: fixed;
//             top: 64px;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: white;
//             padding: 20px 24px;
//             flex-direction: column;
//             gap: 8px;
//             overflow-y: auto;
//             z-index: 999;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             animation: slideDown 0.25s ease;
//           }

//           .topnav-mobile-menu.open {
//             display: flex;
//           }

//           .topnav-mobile-link {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #17263a;
//             font-size: 15px;
//             font-weight: 500;
//             text-decoration: none;
//             transition: all 0.2s ease;
//             cursor: pointer;
//             background: transparent;
//             border: none;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-link:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-divider {
//             border: none;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             margin: 8px 0;
//           }

//           .topnav-mobile-user {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             background: rgba(15, 78, 169, 0.04);
//           }

//           .topnav-mobile-avatar {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 16px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//           }

//           .topnav-mobile-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-mobile-user-name {
//             font-size: 15px;
//             font-weight: 600;
//             color: #17263a;
//           }

//           .topnav-mobile-user-email {
//             font-size: 13px;
//             color: #64748b;
//           }

//           .topnav-mobile-logout {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #dc2626;
//             font-size: 15px;
//             font-weight: 500;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           .topnav-language-wrapper {
//             display: flex;
//             align-items: center;
//           }

//           .topnav-dropdown {
//             position: fixed;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
//             border: 1px solid rgba(18, 38, 63, 0.08);
//             overflow: hidden;
//             z-index: 9999;
//             padding: 4px 0;
//             min-width: 200px;
//             animation: slideDown 0.2s ease;
//           }

//           .topnav-dropdown-item {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             width: 100%;
//             padding: 10px 16px;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             font-size: 14px;
//             color: #17263a;
//             transition: background 0.15s ease;
//             font-family: inherit;
//           }

//           .topnav-dropdown-item:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-dropdown-item.logout {
//             color: #dc2626;
//           }

//           .topnav-dropdown-item.logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           .topnav-dropdown-divider {
//             height: 1px;
//             background: rgba(18, 38, 63, 0.08);
//             margin: 4px 8px;
//           }

//           @keyframes slideDown {
//             from {
//               opacity: 0;
//               transform: translateY(-10px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @media (max-width: 768px) {
//             .topnav-right .topnav-login-btn {
//               display: none;
//             }

//             .topnav-right .topnav-user-btn .topnav-user-name {
//               display: none;
//             }

//             .topnav-mobile-menu-btn {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//             }

//             .topnav-container {
//               padding: 0 16px;
//               height: 56px;
//             }

//             .topnav-logo img {
//               height: 28px;
//             }

//             .topnav-logo-text {
//               font-size: 16px;
//             }
//           }

//           @media (min-width: 769px) {
//             .topnav-mobile-menu {
//               display: none !important;
//             }
//           }
//         `}
//       </style>

//       <nav className="topnav">
//         <div className="topnav-container">
//           {/* Logo */}
//           <a 
//             className="topnav-logo" 
//             onClick={() => handleNavigate('/')}
//             href="#"
//           >
//             <img src="/assets/logo_tradesmap.png" alt="TradesMap" />
//             <span className="topnav-logo-text">TradesMap</span>
//           </a>

//           {/* Right Side */}
//           <div className="topnav-right">
//             {/* Language Switcher */}
//             <div className="topnav-language-wrapper">
//               <LanguageSwitcher variant="dropdown" />
//             </div>

//             {/* Login Button OR User Avatar */}
//             {!isAuthenticated ? (
//               <button 
//                 className="topnav-login-btn"
//                 onClick={() => navigate('/login')}
//               >
//                 {t('auth.login') || 'Log in'}
//               </button>
//             ) : (
//               <>
//                 <button 
//                   ref={avatarRef}
//                   className="topnav-user-btn"
//                   onClick={toggleDropdown}
//                   title={userName || 'User'}
//                 >
//                   <div className="topnav-avatar">
//                     {profileImage && profileImage !== '/assets/worker.avif' ? (
//                       <img 
//                         key={profileImage}
//                         src={profileImage} 
//                         alt={userName || 'User'} 
//                         onError={handleImageError}
//                       />
//                     ) : (
//                       <span className="topnav-avatar-text">{userInitial || 'U'}</span>
//                     )}
//                   </div>
//                   <span className="topnav-user-name">
//                     {userName || 'User'}
//                   </span>
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isDropdownOpen && (
//                   <div
//                     ref={dropdownRef}
//                     className="topnav-dropdown"
//                     style={{
//                       top: `${dropdownPosition.top}px`,
//                       right: `${dropdownPosition.right}px`,
//                     }}
//                   >
//                     {/* Profile Settings */}
//                     <button
//                       className="topnav-dropdown-item"
//                       onClick={() => handleNavigate('/wizard/summary')}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                       </svg>
//                       {t('nav.profile') || 'Profile Settings'}
//                     </button>

//                     {/* Account Settings */}
//                     <button
//                       className="topnav-dropdown-item"
//                       onClick={handleAccountSettings}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                       </svg>
//                       {t('nav.accountSettings') || 'Account Settings'}
//                     </button>

//                     {/* ✅ NOTIFICATIONS */}
//                     <button
//                       className="topnav-dropdown-item"
//                       onClick={handleNotifications}
//                     >
//                       <IconBell />
//                       {t('nav.notifications') || 'Notifications'}
//                       {/* Unread badge - you can make this dynamic later */}
//                       <span style={{
//                         marginLeft: 'auto',
//                         padding: '1px 8px',
//                         background: '#0f4ea9',
//                         color: 'white',
//                         borderRadius: '12px',
//                         fontSize: '10px',
//                         fontWeight: 600
//                       }}>
//                         3
//                       </span>
//                     </button>

//                     <div className="topnav-dropdown-divider" />

//                     {/* Logout */}
//                     <button
//                       className="topnav-dropdown-item logout"
//                       onClick={handleLogout}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//                       </svg>
//                       {t('nav.logout') || 'Sign out'}
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Mobile Menu Button */}
//             <button 
//               className="topnav-mobile-menu-btn"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`topnav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
//           {isAuthenticated && (
//             <>
//               <div className="topnav-mobile-user">
//                 <div className="topnav-mobile-avatar">
//                   {profileImage && profileImage !== '/assets/worker.avif' ? (
//                     <img 
//                       key={profileImage}
//                       src={profileImage} 
//                       alt={userName || 'User'} 
//                       onError={handleImageError}
//                     />
//                   ) : (
//                     userInitial || 'U'
//                   )}
//                 </div>
//                 <div>
//                   <div className="topnav-mobile-user-name">
//                     {userName || 'User'}
//                   </div>
//                   <div className="topnav-mobile-user-email">
//                     {localStorage.getItem('pendingEmail') || ''}
//                   </div>
//                 </div>
//               </div>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}

//           {!isAuthenticated ? (
//             <>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/login')}
//                 style={{ 
//                   background: '#0f4ea9', 
//                   color: 'white',
//                   borderRadius: '10px',
//                   fontWeight: 600
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.login') || 'Log in'}
//                 </span>
//               </button>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/register')}
//                 style={{ 
//                   border: '2px solid #0f4ea9',
//                   borderRadius: '10px',
//                   fontWeight: 500
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.register') || 'Register'}
//                 </span>
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           ) : (
//             <>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/wizard/summary')}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                   </svg>
//                   {t('nav.profile') || 'Profile'}
//                 </span>
//               </button>
              
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={handleAccountSettings}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                   </svg>
//                   {t('nav.accountSettings') || 'Account Settings'}
//                 </span>
//               </button>

//               {/* ✅ NOTIFICATIONS IN MOBILE MENU */}
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={handleNotifications}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconBell />
//                   {t('nav.notifications') || 'Notifications'}
//                   <span style={{
//                     marginLeft: 'auto',
//                     padding: '1px 8px',
//                     background: '#0f4ea9',
//                     color: 'white',
//                     borderRadius: '12px',
//                     fontSize: '10px',
//                     fontWeight: 600
//                   }}>
//                     3
//                   </span>
//                 </span>
//               </button>

//               <button 
//                 className="topnav-mobile-logout"
//                 onClick={handleLogout}
//               >
//                 <IconLogout />
//                 {t('nav.logout') || 'Sign out'}
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}

//           <div style={{ padding: '8px 16px' }}>
//             <div style={{ 
//               fontSize: '13px', 
//               fontWeight: 600, 
//               color: 'rgba(23, 38, 58, 0.5)',
//               marginBottom: '8px',
//               textTransform: 'uppercase',
//               letterSpacing: '0.5px'
//             }}>
//               {t('nav.language') || 'Language'}
//             </div>
//             <LanguageSwitcher variant="inline" />
//           </div>
//         </div>
//       </nav>
//     </>
//   )
// }

// export default TopNav





// // src/common/components/TopNav.jsx
// import { useState, useEffect, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import api from '../../services/api'

// // Icons
// function IconMenu(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconClose(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// // ✅ ADDED: Bell Icon for Notifications
// function IconBell(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor" />
//     </svg>
//   )
// }

// export function TopNav({ variant = 'solid', hideNav = false }) {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [userName, setUserName] = useState('')
//   const [userInitial, setUserInitial] = useState('')
//   const [profileImage, setProfileImage] = useState('/assets/worker.avif')
//   const [imageLoading, setImageLoading] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [fileKey, setFileKey] = useState(null)
//   const [imageLoadAttempts, setImageLoadAttempts] = useState(0)
  
//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)
//   const menuRef = useRef(null)

//   // ============================================================
//   // ✅ CHECK AUTHENTICATION
//   // ============================================================
  
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
//   }, [location.pathname])

//   // ============================================================
//   // ✅ GET USER INFO
//   // ============================================================
  
//   const getUserInfo = () => {
//     const firstName = localStorage.getItem('pendingFirstName') || 
//                       sessionStorage.getItem('wizardFirstName') || 
//                       localStorage.getItem('userFirstName') ||
//                       'User'
//     const lastName = localStorage.getItem('pendingLastName') || 
//                      sessionStorage.getItem('wizardLastName') || 
//                      localStorage.getItem('userLastName') ||
//                      ''
    
//     if (firstName) {
//       setUserName(`${firstName} ${lastName}`.trim())
//       setUserInitial(firstName.charAt(0).toUpperCase())
//     }
//   }

//   // ============================================================
//   // ✅ GET FRESH PROFILE IMAGE URL FROM S3
//   // ============================================================
  
//   const getFreshProfileImage = async (key) => {
//     if (!key) return null
    
//     try {
//       setImageLoading(true)
//       const response = await api.get(`/upload/view/${encodeURIComponent(key)}`)
      
//       if (response.data.success && response.data.data.viewUrl) {
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
//       if (!userId) {
//         const saved = localStorage.getItem('userProfileImage')
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved)
//         }
//         return
//       }

//       let workerService;
//       try {
//         workerService = (await import('../../worker/services/workerService')).default;
//       } catch (importError) {
//         const saved = localStorage.getItem('userProfileImage');
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved);
//         }
//         return;
//       }
      
//       const result = await workerService.getWorkerProfile(userId)
      
//       if (result.success && result.data) {
//         const basics = result.data.basics || {}
//         const profileImageKey = basics.profileImageKey
        
//         if (profileImageKey) {
//           setFileKey(profileImageKey)
//           localStorage.setItem('profileImageKey', profileImageKey)
//           const freshUrl = await getFreshProfileImage(profileImageKey)
//           if (freshUrl) {
//             setProfileImage(freshUrl)
//             localStorage.setItem('userProfileImage', freshUrl)
//             return
//           }
//         }
        
//         if (basics.profilePreview) {
//           setProfileImage(basics.profilePreview)
//           localStorage.setItem('userProfileImage', basics.profilePreview)
//           return
//         }
//       }
      
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
      
//     } catch (error) {
//       console.error('❌ TopNav: Error loading profile image:', error)
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
//     }
//   }

//   // ============================================================
//   // ✅ REFRESH IMAGE URL
//   // ============================================================
  
//   const refreshImageUrl = async () => {
//     if (imageLoadAttempts > 3) {
//       setProfileImage('/assets/worker.avif')
//       return false
//     }
    
//     setImageLoadAttempts(prev => prev + 1)
    
//     if (!fileKey) {
//       const savedKey = localStorage.getItem('profileImageKey')
//       if (savedKey) {
//         setFileKey(savedKey)
//         const freshUrl = await getFreshProfileImage(savedKey)
//         if (freshUrl) {
//           setProfileImage(freshUrl)
//           localStorage.setItem('userProfileImage', freshUrl)
//           return true
//         }
//       }
//       return false
//     }
    
//     const freshUrl = await getFreshProfileImage(fileKey)
//     if (freshUrl) {
//       setProfileImage(freshUrl)
//       localStorage.setItem('userProfileImage', freshUrl)
//       return true
//     }
//     return false
//   }

//   // ============================================================
//   // ✅ INITIALIZE
//   // ============================================================
  
//   useEffect(() => {
//     getUserInfo()
    
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     const saved = localStorage.getItem('userProfileImage')
//     const savedKey = localStorage.getItem('profileImageKey')
    
//     if (savedKey) {
//       setFileKey(savedKey)
//     }
    
//     if (token || userId) {
//       loadProfileImage()
//     } else if (saved && saved !== '/assets/worker.avif') {
//       setProfileImage(saved)
//     }
    
//     setImageLoadAttempts(0)
//   }, [])

//   // ✅ Reload when route changes
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     if ((token || userId) && (location.pathname === '/wizard/summary' || location.pathname === '/wizard')) {
//       loadProfileImage()
//     }
    
//     setImageLoadAttempts(0)
//   }, [location.pathname])

//   // ✅ Listen for profile image updates
//   useEffect(() => {
//     const handleProfileUpdate = (e) => {
//       if (e.detail) {
//         if (e.detail.fileKey) {
//           setFileKey(e.detail.fileKey)
//           localStorage.setItem('profileImageKey', e.detail.fileKey)
//         }
        
//         if (e.detail.fileKey) {
//           getFreshProfileImage(e.detail.fileKey).then(freshUrl => {
//             if (freshUrl) {
//               setProfileImage(freshUrl)
//               localStorage.setItem('userProfileImage', freshUrl)
//               setImageLoadAttempts(0)
//             }
//           })
//         } else if (e.detail.profileImage) {
//           setProfileImage(e.detail.profileImage)
//           localStorage.setItem('userProfileImage', e.detail.profileImage)
//           setImageLoadAttempts(0)
//         }
        
//         if (e.detail.firstName) {
//           const firstName = e.detail.firstName
//           const lastName = e.detail.lastName || ''
//           setUserName(`${firstName} ${lastName}`.trim())
//           setUserInitial(firstName.charAt(0).toUpperCase())
//           localStorage.setItem('pendingFirstName', firstName)
//           if (lastName) localStorage.setItem('pendingLastName', lastName)
//         }
//       }
//     }
//     window.addEventListener('profileImageUpdated', handleProfileUpdate)
//     return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
//   }, [])

//   // ✅ Listen for localStorage changes
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'userProfileImage') {
//         setProfileImage(e.newValue || '/assets/worker.avif')
//       }
//       if (e.key === 'authToken' || e.key === 'userId') {
//         const token = localStorage.getItem('authToken')
//         const userId = localStorage.getItem('userId')
//         setIsAuthenticated(!!token || !!userId)
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false)
//   }, [location.pathname])

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMobileMenuOpen(false)
//       }
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Update dropdown position
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleLogout = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     localStorage.removeItem('authToken')
//     localStorage.removeItem('userId')
//     localStorage.removeItem('pendingEmail')
//     localStorage.removeItem('pendingPassword')
//     localStorage.removeItem('pendingPhoneNumber')
//     localStorage.removeItem('pendingFirstName')
//     localStorage.removeItem('pendingLastName')
//     localStorage.removeItem('pendingDob')
//     localStorage.removeItem('pendingLanguage')
//     localStorage.removeItem('userFirstName')
//     localStorage.removeItem('userLastName')
//     localStorage.removeItem('userProfileImage')
//     localStorage.removeItem('profileImageKey')
    
//     sessionStorage.clear()
    
//     setProfileImage('/assets/worker.avif')
//     setIsAuthenticated(false)
//     navigate('/login')
//   }

//   const handleNavigate = (path) => {
//     setIsMobileMenuOpen(false)
//     setIsDropdownOpen(false)
//     navigate(path)
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   // ✅ Account Settings - Navigate to new page
//   const handleAccountSettings = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     navigate('/account-settings')
//   }

//   // ✅ NOTIFICATIONS - Navigate to notifications page
//   const handleNotifications = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     navigate('/notifications')
//   }

//   // Handle image error
//   const handleImageError = async () => {
//     const refreshed = await refreshImageUrl()
//     if (!refreshed) {
//       setProfileImage('/assets/worker.avif')
//     }
//   }

//   if (hideNav) {
//     return null
//   }

//   const isSolid = variant === 'solid'
//   const isTransparent = variant === 'transparent'

//   return (
//     <>
//       <style>
//         {`
//           .topnav {
//             position: sticky;
//             top: 0;
//             z-index: 1000;
//             background: ${isSolid ? 'white' : isTransparent ? 'transparent' : 'white'};
//             border-bottom: ${isSolid || isTransparent ? '1px solid rgba(18, 38, 63, 0.08)' : 'none'};
//             backdrop-filter: ${isTransparent && isScrolled ? 'blur(12px)' : 'none'};
//             background-color: ${isTransparent && isScrolled ? 'rgba(255, 255, 255, 0.85)' : isTransparent ? 'transparent' : 'white'};
//             transition: all 0.3s ease;
//             box-shadow: ${isScrolled ? '0 2px 16px rgba(0, 0, 0, 0.06)' : 'none'};
//           }

//           .topnav-container {
//             max-width: 1400px;
//             margin: 0 auto;
//             padding: 0 24px;
//             height: 64px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//           }

//           .topnav-logo {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             cursor: pointer;
//             flex-shrink: 0;
//             text-decoration: none;
//           }

//           .topnav-logo img {
//             height: 32px;
//             width: auto;
//           }

//           .topnav-logo-text {
//             font-size: 18px;
//             font-weight: 700;
//             color: #0f4ea9;
//             letter-spacing: -0.5px;
//           }

//           .topnav-right {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             flex-shrink: 0;
//           }

//           .topnav-login-btn {
//             padding: 8px 20px;
//             border: none;
//             background: #0f4ea9;
//             color: white;
//             border-radius: 8px;
//             font-size: 14px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             white-space: nowrap;
//           }

//           .topnav-login-btn:hover {
//             background: #0b3f90;
//             transform: translateY(-1px);
//             box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
//           }

//           .topnav-user-btn {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             padding: 4px 12px 4px 4px;
//             border-radius: 30px;
//             background: rgba(15, 78, 169, 0.06);
//             cursor: pointer;
//             transition: all 0.2s ease;
//             border: none;
//             font-family: inherit;
//             text-decoration: none;
//             position: relative;
//           }

//           .topnav-user-btn:hover {
//             background: rgba(15, 78, 169, 0.1);
//           }

//           .topnav-avatar {
//             width: 36px;
//             height: 36px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 14px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//             border: ${isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent'};
//             transition: border 0.2s ease;
//           }

//           .topnav-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-avatar-text {
//             font-size: 14px;
//             font-weight: 600;
//           }

//           .topnav-user-name {
//             font-size: 14px;
//             font-weight: 500;
//             color: #17263a;
//             white-space: nowrap;
//           }

//           .topnav-mobile-menu-btn {
//             display: none;
//             background: none;
//             border: none;
//             cursor: pointer;
//             color: #17263a;
//             padding: 8px;
//             border-radius: 8px;
//             transition: background 0.2s ease;
//           }

//           .topnav-mobile-menu-btn:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-menu {
//             display: none;
//             position: fixed;
//             top: 64px;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: white;
//             padding: 20px 24px;
//             flex-direction: column;
//             gap: 8px;
//             overflow-y: auto;
//             z-index: 999;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             animation: slideDown 0.25s ease;
//           }

//           .topnav-mobile-menu.open {
//             display: flex;
//           }

//           .topnav-mobile-link {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #17263a;
//             font-size: 15px;
//             font-weight: 500;
//             text-decoration: none;
//             transition: all 0.2s ease;
//             cursor: pointer;
//             background: transparent;
//             border: none;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-link:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-divider {
//             border: none;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             margin: 8px 0;
//           }

//           .topnav-mobile-user {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             background: rgba(15, 78, 169, 0.04);
//           }

//           .topnav-mobile-avatar {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 16px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//           }

//           .topnav-mobile-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-mobile-user-name {
//             font-size: 15px;
//             font-weight: 600;
//             color: #17263a;
//           }

//           .topnav-mobile-user-email {
//             font-size: 13px;
//             color: #64748b;
//           }

//           .topnav-mobile-logout {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #dc2626;
//             font-size: 15px;
//             font-weight: 500;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           /* ✅ HIDE LANGUAGE SWITCHER - REMOVED FROM NAVBAR */
//           .topnav-language-wrapper {
//             display: none !important;
//           }

//           .topnav-dropdown {
//             position: fixed;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
//             border: 1px solid rgba(18, 38, 63, 0.08);
//             overflow: hidden;
//             z-index: 9999;
//             padding: 4px 0;
//             min-width: 200px;
//             animation: slideDown 0.2s ease;
//           }

//           .topnav-dropdown-item {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             width: 100%;
//             padding: 10px 16px;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             font-size: 14px;
//             color: #17263a;
//             transition: background 0.15s ease;
//             font-family: inherit;
//           }

//           .topnav-dropdown-item:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-dropdown-item.logout {
//             color: #dc2626;
//           }

//           .topnav-dropdown-item.logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           .topnav-dropdown-divider {
//             height: 1px;
//             background: rgba(18, 38, 63, 0.08);
//             margin: 4px 8px;
//           }

//           @keyframes slideDown {
//             from {
//               opacity: 0;
//               transform: translateY(-10px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @media (max-width: 768px) {
//             .topnav-right .topnav-login-btn {
//               display: none;
//             }

//             .topnav-right .topnav-user-btn .topnav-user-name {
//               display: none;
//             }

//             .topnav-mobile-menu-btn {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//             }

//             .topnav-container {
//               padding: 0 16px;
//               height: 56px;
//             }

//             .topnav-logo img {
//               height: 28px;
//             }

//             .topnav-logo-text {
//               font-size: 16px;
//             }

//             /* ✅ HIDE LANGUAGE SWITCHER ON MOBILE */
//             .topnav-language-wrapper {
//               display: none !important;
//             }
//           }

//           @media (min-width: 769px) {
//             .topnav-mobile-menu {
//               display: none !important;
//             }
//           }
//         `}
//       </style>

//       <nav className="topnav">
//         <div className="topnav-container">
//           {/* Logo */}
//           <a 
//             className="topnav-logo" 
//             onClick={() => handleNavigate('/')}
//             href="#"
//           >
//             <img src="/assets/logo_tradesmap.png" alt="TradesMap" />
//             <span className="topnav-logo-text">TradesMap</span>
//           </a>

//           {/* Right Side */}
//           <div className="topnav-right">
//             {/* ❌ Language Switcher - REMOVED */}

//             {/* Login Button OR User Avatar */}
//             {!isAuthenticated ? (
//               <button 
//                 className="topnav-login-btn"
//                 onClick={() => navigate('/login')}
//               >
//                 {t('auth.login') || 'Log in'}
//               </button>
//             ) : (
//               <>
//                 <button 
//                   ref={avatarRef}
//                   className="topnav-user-btn"
//                   onClick={toggleDropdown}
//                   title={userName || 'User'}
//                 >
//                   <div className="topnav-avatar">
//                     {profileImage && profileImage !== '/assets/worker.avif' ? (
//                       <img 
//                         key={profileImage}
//                         src={profileImage} 
//                         alt={userName || 'User'} 
//                         onError={handleImageError}
//                       />
//                     ) : (
//                       <span className="topnav-avatar-text">{userInitial || 'U'}</span>
//                     )}
//                   </div>
//                   <span className="topnav-user-name">
//                     {userName || 'User'}
//                   </span>
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isDropdownOpen && (
//                   <div
//                     ref={dropdownRef}
//                     className="topnav-dropdown"
//                     style={{
//                       top: `${dropdownPosition.top}px`,
//                       right: `${dropdownPosition.right}px`,
//                     }}
//                   >
//                     {/* Profile Settings */}
//                     <button
//                       className="topnav-dropdown-item"
//                       onClick={() => handleNavigate('/wizard/summary')}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                       </svg>
//                       {t('nav.profile') || 'Profile Settings'}
//                     </button>

//                     {/* Account Settings */}
//                     <button
//                       className="topnav-dropdown-item"
//                       onClick={handleAccountSettings}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                       </svg>
//                       {t('nav.accountSettings') || 'Account Settings'}
//                     </button>

//                     {/* ✅ NOTIFICATIONS */}
//                     <button
//                       className="topnav-dropdown-item"
//                       onClick={handleNotifications}
//                     >
//                       <IconBell />
//                       {t('nav.notifications') || 'Notifications'}
//                       {/* Unread badge - you can make this dynamic later */}
//                       <span style={{
//                         marginLeft: 'auto',
//                         padding: '1px 8px',
//                         background: '#0f4ea9',
//                         color: 'white',
//                         borderRadius: '12px',
//                         fontSize: '10px',
//                         fontWeight: 600
//                       }}>
//                         3
//                       </span>
//                     </button>

//                     <div className="topnav-dropdown-divider" />

//                     {/* Logout */}
//                     <button
//                       className="topnav-dropdown-item logout"
//                       onClick={handleLogout}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//                       </svg>
//                       {t('nav.logout') || 'Sign out'}
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Mobile Menu Button */}
//             <button 
//               className="topnav-mobile-menu-btn"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`topnav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
//           {isAuthenticated && (
//             <>
//               <div className="topnav-mobile-user">
//                 <div className="topnav-mobile-avatar">
//                   {profileImage && profileImage !== '/assets/worker.avif' ? (
//                     <img 
//                       key={profileImage}
//                       src={profileImage} 
//                       alt={userName || 'User'} 
//                       onError={handleImageError}
//                     />
//                   ) : (
//                     userInitial || 'U'
//                   )}
//                 </div>
//                 <div>
//                   <div className="topnav-mobile-user-name">
//                     {userName || 'User'}
//                   </div>
//                   <div className="topnav-mobile-user-email">
//                     {localStorage.getItem('pendingEmail') || ''}
//                   </div>
//                 </div>
//               </div>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}

//           {!isAuthenticated ? (
//             <>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/login')}
//                 style={{ 
//                   background: '#0f4ea9', 
//                   color: 'white',
//                   borderRadius: '10px',
//                   fontWeight: 600
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.login') || 'Log in'}
//                 </span>
//               </button>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/register')}
//                 style={{ 
//                   border: '2px solid #0f4ea9',
//                   borderRadius: '10px',
//                   fontWeight: 500
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.register') || 'Register'}
//                 </span>
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           ) : (
//             <>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/wizard/summary')}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                   </svg>
//                   {t('nav.profile') || 'Profile'}
//                 </span>
//               </button>
              
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={handleAccountSettings}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                     <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                   </svg>
//                   {t('nav.accountSettings') || 'Account Settings'}
//                 </span>
//               </button>

//               {/* ✅ NOTIFICATIONS IN MOBILE MENU */}
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={handleNotifications}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconBell />
//                   {t('nav.notifications') || 'Notifications'}
//                   <span style={{
//                     marginLeft: 'auto',
//                     padding: '1px 8px',
//                     background: '#0f4ea9',
//                     color: 'white',
//                     borderRadius: '12px',
//                     fontSize: '10px',
//                     fontWeight: 600
//                   }}>
//                     3
//                   </span>
//                 </span>
//               </button>

//               <button 
//                 className="topnav-mobile-logout"
//                 onClick={handleLogout}
//               >
//                 <IconLogout />
//                 {t('nav.logout') || 'Sign out'}
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}

//           {/* ❌ REMOVED LANGUAGE SECTION FROM MOBILE MENU */}
//         </div>
//       </nav>
//     </>
//   )
// }

// export default TopNav






// // src/common/components/TopNav.jsx
// import { useState, useEffect, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import api from '../../services/api'

// // Icons
// function IconMenu(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconClose(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// // Bell Icon for Notifications
// function IconBell(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor" />
//     </svg>
//   )
// }

// export function TopNav({ variant = 'solid', hideNav = false }) {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [userName, setUserName] = useState('')
//   const [userInitial, setUserInitial] = useState('')
//   const [profileImage, setProfileImage] = useState('/assets/worker.avif')
//   const [imageLoading, setImageLoading] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [fileKey, setFileKey] = useState(null)
//   const [imageLoadAttempts, setImageLoadAttempts] = useState(0)
//   const [wizardCompleted, setWizardCompleted] = useState(false) // ✅ NEW STATE

//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)
//   const menuRef = useRef(null)

//   // ============================================================
//   // ✅ CHECK AUTHENTICATION
//   // ============================================================
  
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
//   }, [location.pathname])

//   // ============================================================
//   // ✅ CHECK WIZARD COMPLETION
//   // ============================================================
  
//   useEffect(() => {
//     const checkWizardCompletion = () => {
//       const completed = localStorage.getItem('wizardCompleted') === 'true'
//       setWizardCompleted(completed)
//       console.log('📋 Wizard completed:', completed)
//     }
    
//     checkWizardCompletion()
    
//     // Listen for wizard completion event
//     const handleWizardComplete = (e) => {
//       if (e.detail?.completed) {
//         setWizardCompleted(true)
//         console.log('✅ Wizard completed event received')
//       }
//     }
    
//     window.addEventListener('wizardCompleted', handleWizardComplete)
    
//     // Also check when route changes to RegistrationSuccessPage
//     if (location.pathname === '/registration-success') {
//       setWizardCompleted(true)
//       localStorage.setItem('wizardCompleted', 'true')
//       console.log('✅ Wizard completed from registration-success page')
//     }
    
//     return () => {
//       window.removeEventListener('wizardCompleted', handleWizardComplete)
//     }
//   }, [location.pathname])

//   // ✅ Listen for login - check wizard status
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     if (token || userId) {
//       const completed = localStorage.getItem('wizardCompleted') === 'true'
//       setWizardCompleted(completed)
//     }
//   }, [location.pathname])

//   // ============================================================
//   // ✅ GET USER INFO
//   // ============================================================
  
//   const getUserInfo = () => {
//     const firstName = localStorage.getItem('pendingFirstName') || 
//                       sessionStorage.getItem('wizardFirstName') || 
//                       localStorage.getItem('userFirstName') ||
//                       'User'
//     const lastName = localStorage.getItem('pendingLastName') || 
//                      sessionStorage.getItem('wizardLastName') || 
//                      localStorage.getItem('userLastName') ||
//                      ''
    
//     if (firstName) {
//       setUserName(`${firstName} ${lastName}`.trim())
//       setUserInitial(firstName.charAt(0).toUpperCase())
//     }
//   }

//   // ============================================================
//   // ✅ GET FRESH PROFILE IMAGE URL FROM S3
//   // ============================================================
  
//   const getFreshProfileImage = async (key) => {
//     if (!key) return null
    
//     try {
//       setImageLoading(true)
//       const response = await api.get(`/upload/view/${encodeURIComponent(key)}`)
      
//       if (response.data.success && response.data.data.viewUrl) {
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
//       if (!userId) {
//         const saved = localStorage.getItem('userProfileImage')
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved)
//         }
//         return
//       }

//       let workerService;
//       try {
//         workerService = (await import('../../worker/services/workerService')).default;
//       } catch (importError) {
//         const saved = localStorage.getItem('userProfileImage');
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved);
//         }
//         return;
//       }
      
//       const result = await workerService.getWorkerProfile(userId)
      
//       if (result.success && result.data) {
//         const basics = result.data.basics || {}
//         const profileImageKey = basics.profileImageKey
        
//         if (profileImageKey) {
//           setFileKey(profileImageKey)
//           localStorage.setItem('profileImageKey', profileImageKey)
//           const freshUrl = await getFreshProfileImage(profileImageKey)
//           if (freshUrl) {
//             setProfileImage(freshUrl)
//             localStorage.setItem('userProfileImage', freshUrl)
//             return
//           }
//         }
        
//         if (basics.profilePreview) {
//           setProfileImage(basics.profilePreview)
//           localStorage.setItem('userProfileImage', basics.profilePreview)
//           return
//         }
//       }
      
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
      
//     } catch (error) {
//       console.error('❌ TopNav: Error loading profile image:', error)
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
//     }
//   }

//   // ============================================================
//   // ✅ REFRESH IMAGE URL
//   // ============================================================
  
//   const refreshImageUrl = async () => {
//     if (imageLoadAttempts > 3) {
//       setProfileImage('/assets/worker.avif')
//       return false
//     }
    
//     setImageLoadAttempts(prev => prev + 1)
    
//     if (!fileKey) {
//       const savedKey = localStorage.getItem('profileImageKey')
//       if (savedKey) {
//         setFileKey(savedKey)
//         const freshUrl = await getFreshProfileImage(savedKey)
//         if (freshUrl) {
//           setProfileImage(freshUrl)
//           localStorage.setItem('userProfileImage', freshUrl)
//           return true
//         }
//       }
//       return false
//     }
    
//     const freshUrl = await getFreshProfileImage(fileKey)
//     if (freshUrl) {
//       setProfileImage(freshUrl)
//       localStorage.setItem('userProfileImage', freshUrl)
//       return true
//     }
//     return false
//   }

//   // ============================================================
//   // ✅ INITIALIZE
//   // ============================================================
  
//   useEffect(() => {
//     getUserInfo()
    
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     const saved = localStorage.getItem('userProfileImage')
//     const savedKey = localStorage.getItem('profileImageKey')
    
//     if (savedKey) {
//       setFileKey(savedKey)
//     }
    
//     if (token || userId) {
//       loadProfileImage()
//     } else if (saved && saved !== '/assets/worker.avif') {
//       setProfileImage(saved)
//     }
    
//     setImageLoadAttempts(0)
//   }, [])

//   // ✅ Reload when route changes
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     if ((token || userId) && (location.pathname === '/wizard/summary' || location.pathname === '/wizard')) {
//       loadProfileImage()
//     }
    
//     setImageLoadAttempts(0)
//   }, [location.pathname])

//   // ✅ Listen for profile image updates
//   useEffect(() => {
//     const handleProfileUpdate = (e) => {
//       if (e.detail) {
//         if (e.detail.fileKey) {
//           setFileKey(e.detail.fileKey)
//           localStorage.setItem('profileImageKey', e.detail.fileKey)
//         }
        
//         if (e.detail.fileKey) {
//           getFreshProfileImage(e.detail.fileKey).then(freshUrl => {
//             if (freshUrl) {
//               setProfileImage(freshUrl)
//               localStorage.setItem('userProfileImage', freshUrl)
//               setImageLoadAttempts(0)
//             }
//           })
//         } else if (e.detail.profileImage) {
//           setProfileImage(e.detail.profileImage)
//           localStorage.setItem('userProfileImage', e.detail.profileImage)
//           setImageLoadAttempts(0)
//         }
        
//         if (e.detail.firstName) {
//           const firstName = e.detail.firstName
//           const lastName = e.detail.lastName || ''
//           setUserName(`${firstName} ${lastName}`.trim())
//           setUserInitial(firstName.charAt(0).toUpperCase())
//           localStorage.setItem('pendingFirstName', firstName)
//           if (lastName) localStorage.setItem('pendingLastName', lastName)
//         }
//       }
//     }
//     window.addEventListener('profileImageUpdated', handleProfileUpdate)
//     return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
//   }, [])

//   // ✅ Listen for localStorage changes
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'userProfileImage') {
//         setProfileImage(e.newValue || '/assets/worker.avif')
//       }
//       if (e.key === 'authToken' || e.key === 'userId') {
//         const token = localStorage.getItem('authToken')
//         const userId = localStorage.getItem('userId')
//         setIsAuthenticated(!!token || !!userId)
//       }
//       if (e.key === 'wizardCompleted') {
//         setWizardCompleted(e.newValue === 'true')
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false)
//   }, [location.pathname])

//   // Handle click outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMobileMenuOpen(false)
//       }
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Update dropdown position
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleLogout = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     localStorage.removeItem('authToken')
//     localStorage.removeItem('userId')
//     localStorage.removeItem('pendingEmail')
//     localStorage.removeItem('pendingPassword')
//     localStorage.removeItem('pendingPhoneNumber')
//     localStorage.removeItem('pendingFirstName')
//     localStorage.removeItem('pendingLastName')
//     localStorage.removeItem('pendingDob')
//     localStorage.removeItem('pendingLanguage')
//     localStorage.removeItem('userFirstName')
//     localStorage.removeItem('userLastName')
//     localStorage.removeItem('userProfileImage')
//     localStorage.removeItem('profileImageKey')
//     localStorage.removeItem('wizardCompleted') // ✅ Clear wizard completion on logout
    
//     sessionStorage.clear()
    
//     setProfileImage('/assets/worker.avif')
//     setIsAuthenticated(false)
//     setWizardCompleted(false)
//     navigate('/login')
//   }

//   const handleNavigate = (path) => {
//     setIsMobileMenuOpen(false)
//     setIsDropdownOpen(false)
//     navigate(path)
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//   }

//   // Account Settings - Navigate to new page
//   const handleAccountSettings = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     navigate('/account-settings')
//   }

//   // NOTIFICATIONS - Navigate to notifications page
//   const handleNotifications = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     navigate('/notifications')
//   }

//   // Handle image error
//   const handleImageError = async () => {
//     const refreshed = await refreshImageUrl()
//     if (!refreshed) {
//       setProfileImage('/assets/worker.avif')
//     }
//   }

//   if (hideNav) {
//     return null
//   }

//   const isSolid = variant === 'solid'
//   const isTransparent = variant === 'transparent'

//   return (
//     <>
//       <style>
//         {`
//           .topnav {
//             position: sticky;
//             top: 0;
//             z-index: 1000;
//             background: ${isSolid ? 'white' : isTransparent ? 'transparent' : 'white'};
//             border-bottom: ${isSolid || isTransparent ? '1px solid rgba(18, 38, 63, 0.08)' : 'none'};
//             backdrop-filter: ${isTransparent && isScrolled ? 'blur(12px)' : 'none'};
//             background-color: ${isTransparent && isScrolled ? 'rgba(255, 255, 255, 0.85)' : isTransparent ? 'transparent' : 'white'};
//             transition: all 0.3s ease;
//             box-shadow: ${isScrolled ? '0 2px 16px rgba(0, 0, 0, 0.06)' : 'none'};
//           }

//           .topnav-container {
//             max-width: 1400px;
//             margin: 0 auto;
//             padding: 0 24px;
//             height: 64px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//           }

//           .topnav-logo {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             cursor: pointer;
//             flex-shrink: 0;
//             text-decoration: none;
//           }

//           .topnav-logo img {
//             height: 32px;
//             width: auto;
//           }

//           .topnav-logo-text {
//             font-size: 18px;
//             font-weight: 700;
//             color: #0f4ea9;
//             letter-spacing: -0.5px;
//           }

//           .topnav-right {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             flex-shrink: 0;
//           }

//           .topnav-login-btn {
//             padding: 8px 20px;
//             border: none;
//             background: #0f4ea9;
//             color: white;
//             border-radius: 8px;
//             font-size: 14px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             white-space: nowrap;
//           }

//           .topnav-login-btn:hover {
//             background: #0b3f90;
//             transform: translateY(-1px);
//             box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
//           }

//           .topnav-user-btn {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             padding: 4px 12px 4px 4px;
//             border-radius: 30px;
//             background: rgba(15, 78, 169, 0.06);
//             cursor: pointer;
//             transition: all 0.2s ease;
//             border: none;
//             font-family: inherit;
//             text-decoration: none;
//             position: relative;
//           }

//           .topnav-user-btn:hover {
//             background: rgba(15, 78, 169, 0.1);
//           }

//           .topnav-avatar {
//             width: 36px;
//             height: 36px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 14px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//             border: ${isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent'};
//             transition: border 0.2s ease;
//           }

//           .topnav-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-avatar-text {
//             font-size: 14px;
//             font-weight: 600;
//           }

//           .topnav-user-name {
//             font-size: 14px;
//             font-weight: 500;
//             color: #17263a;
//             white-space: nowrap;
//           }

//           .topnav-mobile-menu-btn {
//             display: none;
//             background: none;
//             border: none;
//             cursor: pointer;
//             color: #17263a;
//             padding: 8px;
//             border-radius: 8px;
//             transition: background 0.2s ease;
//           }

//           .topnav-mobile-menu-btn:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-menu {
//             display: none;
//             position: fixed;
//             top: 64px;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: white;
//             padding: 20px 24px;
//             flex-direction: column;
//             gap: 8px;
//             overflow-y: auto;
//             z-index: 999;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             animation: slideDown 0.25s ease;
//           }

//           .topnav-mobile-menu.open {
//             display: flex;
//           }

//           .topnav-mobile-link {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #17263a;
//             font-size: 15px;
//             font-weight: 500;
//             text-decoration: none;
//             transition: all 0.2s ease;
//             cursor: pointer;
//             background: transparent;
//             border: none;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-link:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-divider {
//             border: none;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             margin: 8px 0;
//           }

//           .topnav-mobile-user {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             background: rgba(15, 78, 169, 0.04);
//           }

//           .topnav-mobile-avatar {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 16px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//           }

//           .topnav-mobile-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-mobile-user-name {
//             font-size: 15px;
//             font-weight: 600;
//             color: #17263a;
//           }

//           .topnav-mobile-user-email {
//             font-size: 13px;
//             color: #64748b;
//           }

//           .topnav-mobile-logout {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #dc2626;
//             font-size: 15px;
//             font-weight: 500;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           .topnav-language-wrapper {
//             display: none !important;
//           }

//           .topnav-dropdown {
//             position: fixed;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
//             border: 1px solid rgba(18, 38, 63, 0.08);
//             overflow: hidden;
//             z-index: 9999;
//             padding: 4px 0;
//             min-width: 200px;
//             animation: slideDown 0.2s ease;
//           }

//           .topnav-dropdown-item {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             width: 100%;
//             padding: 10px 16px;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             font-size: 14px;
//             color: #17263a;
//             transition: background 0.15s ease;
//             font-family: inherit;
//           }

//           .topnav-dropdown-item:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-dropdown-item.logout {
//             color: #dc2626;
//           }

//           .topnav-dropdown-item.logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           .topnav-dropdown-divider {
//             height: 1px;
//             background: rgba(18, 38, 63, 0.08);
//             margin: 4px 8px;
//           }

//           @keyframes slideDown {
//             from {
//               opacity: 0;
//               transform: translateY(-10px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @media (max-width: 768px) {
//             .topnav-right .topnav-login-btn {
//               display: none;
//             }

//             .topnav-right .topnav-user-btn .topnav-user-name {
//               display: none;
//             }

//             .topnav-mobile-menu-btn {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//             }

//             .topnav-container {
//               padding: 0 16px;
//               height: 56px;
//             }

//             .topnav-logo img {
//               height: 28px;
//             }

//             .topnav-logo-text {
//               font-size: 16px;
//             }

//             .topnav-language-wrapper {
//               display: none !important;
//             }
//           }

//           @media (min-width: 769px) {
//             .topnav-mobile-menu {
//               display: none !important;
//             }
//           }
//         `}
//       </style>

//       <nav className="topnav">
//         <div className="topnav-container">
//           {/* Logo */}
//           <a 
//             className="topnav-logo" 
//             onClick={() => handleNavigate('/')}
//             href="#"
//           >
//             <img src="/assets/logo_tradesmap.png" alt="TradesMap" />
//             <span className="topnav-logo-text">TradesMap</span>
//           </a>

//           {/* Right Side */}
//           <div className="topnav-right">
//             {/* Login Button OR User Avatar */}
//             {!isAuthenticated ? (
//               <button 
//                 className="topnav-login-btn"
//                 onClick={() => navigate('/login')}
//               >
//                 {t('auth.login') || 'Log in'}
//               </button>
//             ) : (
//               <>
//                 <button 
//                   ref={avatarRef}
//                   className="topnav-user-btn"
//                   onClick={toggleDropdown}
//                   title={userName || 'User'}
//                 >
//                   <div className="topnav-avatar">
//                     {profileImage && profileImage !== '/assets/worker.avif' ? (
//                       <img 
//                         key={profileImage}
//                         src={profileImage} 
//                         alt={userName || 'User'} 
//                         onError={handleImageError}
//                       />
//                     ) : (
//                       <span className="topnav-avatar-text">{userInitial || 'U'}</span>
//                     )}
//                   </div>
//                   <span className="topnav-user-name">
//                     {userName || 'User'}
//                   </span>
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isDropdownOpen && (
//                   <div
//                     ref={dropdownRef}
//                     className="topnav-dropdown"
//                     style={{
//                       top: `${dropdownPosition.top}px`,
//                       right: `${dropdownPosition.right}px`,
//                     }}
//                   >
//                     {/* ✅ Only show Profile Settings if wizard is completed */}
//                     {wizardCompleted && (
//                       <button
//                         className="topnav-dropdown-item"
//                         onClick={() => handleNavigate('/wizard/summary')}
//                       >
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                           <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                         </svg>
//                         {t('nav.profile') || 'Profile Settings'}
//                       </button>
//                     )}

//                     {/* ✅ Only show Account Settings if wizard is completed */}
//                     {wizardCompleted && (
//                       <button
//                         className="topnav-dropdown-item"
//                         onClick={handleAccountSettings}
//                       >
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                           <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                         </svg>
//                         {t('nav.accountSettings') || 'Account Settings'}
//                       </button>
//                     )}

//                     {/* Notifications - Always visible */}
//                     <button
//                       className="topnav-dropdown-item"
//                       onClick={handleNotifications}
//                     >
//                       <IconBell />
//                       {t('nav.notifications') || 'Notifications'}
//                       <span style={{
//                         marginLeft: 'auto',
//                         padding: '1px 8px',
//                         background: '#0f4ea9',
//                         color: 'white',
//                         borderRadius: '12px',
//                         fontSize: '10px',
//                         fontWeight: 600
//                       }}>
//                         3
//                       </span>
//                     </button>

//                     <div className="topnav-dropdown-divider" />

//                     {/* Logout - Always visible */}
//                     <button
//                       className="topnav-dropdown-item logout"
//                       onClick={handleLogout}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//                       </svg>
//                       {t('nav.logout') || 'Sign out'}
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Mobile Menu Button */}
//             <button 
//               className="topnav-mobile-menu-btn"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`topnav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
//           {isAuthenticated && (
//             <>
//               <div className="topnav-mobile-user">
//                 <div className="topnav-mobile-avatar">
//                   {profileImage && profileImage !== '/assets/worker.avif' ? (
//                     <img 
//                       key={profileImage}
//                       src={profileImage} 
//                       alt={userName || 'User'} 
//                       onError={handleImageError}
//                     />
//                   ) : (
//                     userInitial || 'U'
//                   )}
//                 </div>
//                 <div>
//                   <div className="topnav-mobile-user-name">
//                     {userName || 'User'}
//                   </div>
//                   <div className="topnav-mobile-user-email">
//                     {localStorage.getItem('pendingEmail') || ''}
//                   </div>
//                 </div>
//               </div>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}

//           {!isAuthenticated ? (
//             <>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/login')}
//                 style={{ 
//                   background: '#0f4ea9', 
//                   color: 'white',
//                   borderRadius: '10px',
//                   fontWeight: 600
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.login') || 'Log in'}
//                 </span>
//               </button>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/register')}
//                 style={{ 
//                   border: '2px solid #0f4ea9',
//                   borderRadius: '10px',
//                   fontWeight: 500
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.register') || 'Register'}
//                 </span>
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           ) : (
//             <>
//               {/* ✅ Only show Profile if wizard is completed */}
//               {wizardCompleted && (
//                 <button 
//                   className="topnav-mobile-link"
//                   onClick={() => handleNavigate('/wizard/summary')}
//                 >
//                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                     </svg>
//                     {t('nav.profile') || 'Profile'}
//                   </span>
//                 </button>
//               )}

//               {/* ✅ Only show Account Settings if wizard is completed */}
//               {wizardCompleted && (
//                 <button 
//                   className="topnav-mobile-link"
//                   onClick={handleAccountSettings}
//                 >
//                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                       <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                     </svg>
//                     {t('nav.accountSettings') || 'Account Settings'}
//                   </span>
//                 </button>
//               )}

//               {/* Notifications - Always visible */}
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={handleNotifications}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconBell />
//                   {t('nav.notifications') || 'Notifications'}
//                   <span style={{
//                     marginLeft: 'auto',
//                     padding: '1px 8px',
//                     background: '#0f4ea9',
//                     color: 'white',
//                     borderRadius: '12px',
//                     fontSize: '10px',
//                     fontWeight: 600
//                   }}>
//                     3
//                   </span>
//                 </span>
//               </button>

//               {/* Logout - Always visible */}
//               <button 
//                 className="topnav-mobile-logout"
//                 onClick={handleLogout}
//               >
//                 <IconLogout />
//                 {t('nav.logout') || 'Sign out'}
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}
//         </div>
//       </nav>
//     </>
//   )
// }

// export default TopNav








// // src/common/components/TopNav.jsx
// import { useState, useEffect, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import api from '../../services/api'

// // Icons
// function IconMenu(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconClose(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// // Bell Icon for Notifications
// function IconBell(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor" />
//     </svg>
//   )
// }

// export function TopNav({ variant = 'solid', hideNav = false }) {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [userName, setUserName] = useState('')
//   const [userInitial, setUserInitial] = useState('')
//   const [profileImage, setProfileImage] = useState('/assets/worker.avif')
//   const [imageLoading, setImageLoading] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [fileKey, setFileKey] = useState(null)
//   const [imageLoadAttempts, setImageLoadAttempts] = useState(0)
//   const [wizardCompleted, setWizardCompleted] = useState(false) // ✅ NEW STATE
//   const [notificationCount, setNotificationCount] = useState(0) // ✅ NEW STATE

//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)
//   const menuRef = useRef(null)
//   const bellRef = useRef(null)
//   const [isBellDropdownOpen, setIsBellDropdownOpen] = useState(false)
//   const bellDropdownRef = useRef(null)

//   // ============================================================
//   // ✅ CHECK AUTHENTICATION
//   // ============================================================
  
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
//   }, [location.pathname])

//   // ============================================================
//   // ✅ CHECK WIZARD COMPLETION
//   // ============================================================
  
//   useEffect(() => {
//     const checkWizardCompletion = () => {
//       const completed = localStorage.getItem('wizardCompleted') === 'true'
//       setWizardCompleted(completed)
//       console.log('📋 Wizard completed:', completed)
//     }
    
//     checkWizardCompletion()
    
//     // Listen for wizard completion event
//     const handleWizardComplete = (e) => {
//       if (e.detail?.completed) {
//         setWizardCompleted(true)
//         console.log('✅ Wizard completed event received')
//       }
//     }
    
//     window.addEventListener('wizardCompleted', handleWizardComplete)
    
//     // Also check when route changes to RegistrationSuccessPage
//     if (location.pathname === '/registration-success') {
//       setWizardCompleted(true)
//       localStorage.setItem('wizardCompleted', 'true')
//       console.log('✅ Wizard completed from registration-success page')
//     }
    
//     return () => {
//       window.removeEventListener('wizardCompleted', handleWizardComplete)
//     }
//   }, [location.pathname])

//   // ✅ Listen for login - check wizard status
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     if (token || userId) {
//       const completed = localStorage.getItem('wizardCompleted') === 'true'
//       setWizardCompleted(completed)
//     }
//   }, [location.pathname])

//   // ============================================================
//   // ✅ GET USER INFO
//   // ============================================================
  
//   const getUserInfo = () => {
//     const firstName = localStorage.getItem('pendingFirstName') || 
//                       sessionStorage.getItem('wizardFirstName') || 
//                       localStorage.getItem('userFirstName') ||
//                       'User'
//     const lastName = localStorage.getItem('pendingLastName') || 
//                      sessionStorage.getItem('wizardLastName') || 
//                      localStorage.getItem('userLastName') ||
//                      ''
    
//     if (firstName) {
//       setUserName(`${firstName} ${lastName}`.trim())
//       setUserInitial(firstName.charAt(0).toUpperCase())
//     }
//   }

//   // ============================================================
//   // ✅ GET FRESH PROFILE IMAGE URL FROM S3
//   // ============================================================
  
//   const getFreshProfileImage = async (key) => {
//     if (!key) return null
    
//     try {
//       setImageLoading(true)
//       const response = await api.get(`/upload/view/${encodeURIComponent(key)}`)
      
//       if (response.data.success && response.data.data.viewUrl) {
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
//       if (!userId) {
//         const saved = localStorage.getItem('userProfileImage')
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved)
//         }
//         return
//       }

//       let workerService;
//       try {
//         workerService = (await import('../../worker/services/workerService')).default;
//       } catch (importError) {
//         const saved = localStorage.getItem('userProfileImage');
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved);
//         }
//         return;
//       }
      
//       const result = await workerService.getWorkerProfile(userId)
      
//       if (result.success && result.data) {
//         const basics = result.data.basics || {}
//         const profileImageKey = basics.profileImageKey
        
//         if (profileImageKey) {
//           setFileKey(profileImageKey)
//           localStorage.setItem('profileImageKey', profileImageKey)
//           const freshUrl = await getFreshProfileImage(profileImageKey)
//           if (freshUrl) {
//             setProfileImage(freshUrl)
//             localStorage.setItem('userProfileImage', freshUrl)
//             return
//           }
//         }
        
//         if (basics.profilePreview) {
//           setProfileImage(basics.profilePreview)
//           localStorage.setItem('userProfileImage', basics.profilePreview)
//           return
//         }
//       }
      
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
      
//     } catch (error) {
//       console.error('❌ TopNav: Error loading profile image:', error)
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
//     }
//   }

//   // ============================================================
//   // ✅ REFRESH IMAGE URL
//   // ============================================================
  
//   const refreshImageUrl = async () => {
//     if (imageLoadAttempts > 3) {
//       setProfileImage('/assets/worker.avif')
//       return false
//     }
    
//     setImageLoadAttempts(prev => prev + 1)
    
//     if (!fileKey) {
//       const savedKey = localStorage.getItem('profileImageKey')
//       if (savedKey) {
//         setFileKey(savedKey)
//         const freshUrl = await getFreshProfileImage(savedKey)
//         if (freshUrl) {
//           setProfileImage(freshUrl)
//           localStorage.setItem('userProfileImage', freshUrl)
//           return true
//         }
//       }
//       return false
//     }
    
//     const freshUrl = await getFreshProfileImage(fileKey)
//     if (freshUrl) {
//       setProfileImage(freshUrl)
//       localStorage.setItem('userProfileImage', freshUrl)
//       return true
//     }
//     return false
//   }

//   // ============================================================
//   // ✅ LOAD NOTIFICATION COUNT
//   // ============================================================
  
//   const loadNotificationCount = async () => {
//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId || !wizardCompleted) {
//         setNotificationCount(0)
//         return
//       }
      
//       // You can replace this with your actual API call
//       // For now, we'll use a mock count or get from localStorage
//       const storedCount = localStorage.getItem('notificationCount')
//       if (storedCount) {
//         setNotificationCount(parseInt(storedCount))
//       } else {
//         // Default mock count - you can replace with actual API call
//         setNotificationCount(3)
//       }
//     } catch (error) {
//       console.error('❌ Error loading notification count:', error)
//       setNotificationCount(0)
//     }
//   }

//   // ============================================================
//   // ✅ INITIALIZE
//   // ============================================================
  
//   useEffect(() => {
//     getUserInfo()
    
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     const saved = localStorage.getItem('userProfileImage')
//     const savedKey = localStorage.getItem('profileImageKey')
    
//     if (savedKey) {
//       setFileKey(savedKey)
//     }
    
//     if (token || userId) {
//       loadProfileImage()
//       // Load notification count only if wizard is completed
//       const completed = localStorage.getItem('wizardCompleted') === 'true'
//       if (completed) {
//         loadNotificationCount()
//       }
//     } else if (saved && saved !== '/assets/worker.avif') {
//       setProfileImage(saved)
//     }
    
//     setImageLoadAttempts(0)
//   }, [])

//   // ✅ Reload when route changes
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     if ((token || userId) && (location.pathname === '/wizard/summary' || location.pathname === '/wizard')) {
//       loadProfileImage()
//     }
    
//     setImageLoadAttempts(0)
    
//     // Reload notification count when wizard is completed or route changes
//     const completed = localStorage.getItem('wizardCompleted') === 'true'
//     if (completed) {
//       loadNotificationCount()
//     }
//   }, [location.pathname])

//   // ✅ Listen for profile image updates
//   useEffect(() => {
//     const handleProfileUpdate = (e) => {
//       if (e.detail) {
//         if (e.detail.fileKey) {
//           setFileKey(e.detail.fileKey)
//           localStorage.setItem('profileImageKey', e.detail.fileKey)
//         }
        
//         if (e.detail.fileKey) {
//           getFreshProfileImage(e.detail.fileKey).then(freshUrl => {
//             if (freshUrl) {
//               setProfileImage(freshUrl)
//               localStorage.setItem('userProfileImage', freshUrl)
//               setImageLoadAttempts(0)
//             }
//           })
//         } else if (e.detail.profileImage) {
//           setProfileImage(e.detail.profileImage)
//           localStorage.setItem('userProfileImage', e.detail.profileImage)
//           setImageLoadAttempts(0)
//         }
        
//         if (e.detail.firstName) {
//           const firstName = e.detail.firstName
//           const lastName = e.detail.lastName || ''
//           setUserName(`${firstName} ${lastName}`.trim())
//           setUserInitial(firstName.charAt(0).toUpperCase())
//           localStorage.setItem('pendingFirstName', firstName)
//           if (lastName) localStorage.setItem('pendingLastName', lastName)
//         }
//       }
//     }
//     window.addEventListener('profileImageUpdated', handleProfileUpdate)
//     return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
//   }, [])

//   // ✅ Listen for localStorage changes
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'userProfileImage') {
//         setProfileImage(e.newValue || '/assets/worker.avif')
//       }
//       if (e.key === 'authToken' || e.key === 'userId') {
//         const token = localStorage.getItem('authToken')
//         const userId = localStorage.getItem('userId')
//         setIsAuthenticated(!!token || !!userId)
//       }
//       if (e.key === 'wizardCompleted') {
//         setWizardCompleted(e.newValue === 'true')
//         if (e.newValue === 'true') {
//           loadNotificationCount()
//         } else {
//           setNotificationCount(0)
//         }
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false)
//   }, [location.pathname])

//   // Handle click outside for dropdowns
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMobileMenuOpen(false)
//       }
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//       if (bellDropdownRef.current && !bellDropdownRef.current.contains(event.target) &&
//           bellRef.current && !bellRef.current.contains(event.target)) {
//         setIsBellDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Update dropdown position
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleLogout = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     setIsBellDropdownOpen(false)
//     localStorage.removeItem('authToken')
//     localStorage.removeItem('userId')
//     localStorage.removeItem('pendingEmail')
//     localStorage.removeItem('pendingPassword')
//     localStorage.removeItem('pendingPhoneNumber')
//     localStorage.removeItem('pendingFirstName')
//     localStorage.removeItem('pendingLastName')
//     localStorage.removeItem('pendingDob')
//     localStorage.removeItem('pendingLanguage')
//     localStorage.removeItem('userFirstName')
//     localStorage.removeItem('userLastName')
//     localStorage.removeItem('userProfileImage')
//     localStorage.removeItem('profileImageKey')
//     localStorage.removeItem('wizardCompleted')
//     localStorage.removeItem('notificationCount')
    
//     sessionStorage.clear()
    
//     setProfileImage('/assets/worker.avif')
//     setIsAuthenticated(false)
//     setWizardCompleted(false)
//     setNotificationCount(0)
//     navigate('/login')
//   }

//   const handleNavigate = (path) => {
//     setIsMobileMenuOpen(false)
//     setIsDropdownOpen(false)
//     setIsBellDropdownOpen(false)
//     navigate(path)
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//     setIsBellDropdownOpen(false)
//   }

//   const toggleBellDropdown = () => {
//     if (wizardCompleted) {
//       // Navigate directly to notifications page
//       navigate('/notifications')
//       setIsBellDropdownOpen(false)
//       // Reset notification count when clicked
//       setNotificationCount(0)
//       localStorage.setItem('notificationCount', '0')
//     }
//   }

//   // Account Settings - Navigate to new page
//   const handleAccountSettings = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     navigate('/account-settings')
//   }

//   // NOTIFICATIONS - Navigate to notifications page
//   const handleNotifications = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     setIsBellDropdownOpen(false)
//     navigate('/notifications')
//     // Reset notification count when clicked
//     setNotificationCount(0)
//     localStorage.setItem('notificationCount', '0')
//   }

//   // Handle image error
//   const handleImageError = async () => {
//     const refreshed = await refreshImageUrl()
//     if (!refreshed) {
//       setProfileImage('/assets/worker.avif')
//     }
//   }

//   if (hideNav) {
//     return null
//   }

//   const isSolid = variant === 'solid'
//   const isTransparent = variant === 'transparent'

//   return (
//     <>
//       <style>
//         {`
//           .topnav {
//             position: sticky;
//             top: 0;
//             z-index: 1000;
//             background: ${isSolid ? 'white' : isTransparent ? 'transparent' : 'white'};
//             border-bottom: ${isSolid || isTransparent ? '1px solid rgba(18, 38, 63, 0.08)' : 'none'};
//             backdrop-filter: ${isTransparent && isScrolled ? 'blur(12px)' : 'none'};
//             background-color: ${isTransparent && isScrolled ? 'rgba(255, 255, 255, 0.85)' : isTransparent ? 'transparent' : 'white'};
//             transition: all 0.3s ease;
//             box-shadow: ${isScrolled ? '0 2px 16px rgba(0, 0, 0, 0.06)' : 'none'};
//           }

//           .topnav-container {
//             max-width: 1400px;
//             margin: 0 auto;
//             padding: 0 24px;
//             height: 64px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//           }

//           .topnav-logo {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             cursor: pointer;
//             flex-shrink: 0;
//             text-decoration: none;
//           }

//           .topnav-logo img {
//             height: 32px;
//             width: auto;
//           }

//           .topnav-logo-text {
//             font-size: 18px;
//             font-weight: 700;
//             color: #0f4ea9;
//             letter-spacing: -0.5px;
//           }

//           .topnav-right {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             flex-shrink: 0;
//           }

//           .topnav-login-btn {
//             padding: 8px 20px;
//             border: none;
//             background: #0f4ea9;
//             color: white;
//             border-radius: 8px;
//             font-size: 14px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             white-space: nowrap;
//           }

//           .topnav-login-btn:hover {
//             background: #0b3f90;
//             transform: translateY(-1px);
//             box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
//           }

//           /* ✅ Bell Icon Styles */
//           .topnav-bell-btn {
//             position: relative;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             width: 36px;
//             height: 36px;
//             border-radius: 50%;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             transition: background 0.2s ease;
//             color: #17263a;
//             padding: 0;
//             flex-shrink: 0;
//           }

//           .topnav-bell-btn:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-bell-btn .bell-badge {
//             position: absolute;
//             top: 2px;
//             right: 2px;
//             min-width: 18px;
//             height: 18px;
//             padding: 0 5px;
//             background: #dc2626;
//             color: white;
//             font-size: 10px;
//             font-weight: 700;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border: 2px solid white;
//             line-height: 1;
//           }

//           .topnav-bell-btn .bell-badge.zero {
//             display: none;
//           }

//           .topnav-user-btn {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             padding: 4px 12px 4px 4px;
//             border-radius: 30px;
//             background: rgba(15, 78, 169, 0.06);
//             cursor: pointer;
//             transition: all 0.2s ease;
//             border: none;
//             font-family: inherit;
//             text-decoration: none;
//             position: relative;
//           }

//           .topnav-user-btn:hover {
//             background: rgba(15, 78, 169, 0.1);
//           }

//           .topnav-avatar {
//             width: 36px;
//             height: 36px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 14px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//             border: ${isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent'};
//             transition: border 0.2s ease;
//           }

//           .topnav-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-avatar-text {
//             font-size: 14px;
//             font-weight: 600;
//           }

//           .topnav-user-name {
//             font-size: 14px;
//             font-weight: 500;
//             color: #17263a;
//             white-space: nowrap;
//           }

//           .topnav-mobile-menu-btn {
//             display: none;
//             background: none;
//             border: none;
//             cursor: pointer;
//             color: #17263a;
//             padding: 8px;
//             border-radius: 8px;
//             transition: background 0.2s ease;
//           }

//           .topnav-mobile-menu-btn:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-menu {
//             display: none;
//             position: fixed;
//             top: 64px;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: white;
//             padding: 20px 24px;
//             flex-direction: column;
//             gap: 8px;
//             overflow-y: auto;
//             z-index: 999;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             animation: slideDown 0.25s ease;
//           }

//           .topnav-mobile-menu.open {
//             display: flex;
//           }

//           .topnav-mobile-link {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #17263a;
//             font-size: 15px;
//             font-weight: 500;
//             text-decoration: none;
//             transition: all 0.2s ease;
//             cursor: pointer;
//             background: transparent;
//             border: none;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-link:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-divider {
//             border: none;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             margin: 8px 0;
//           }

//           .topnav-mobile-user {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             background: rgba(15, 78, 169, 0.04);
//           }

//           .topnav-mobile-avatar {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 16px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//           }

//           .topnav-mobile-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-mobile-user-name {
//             font-size: 15px;
//             font-weight: 600;
//             color: #17263a;
//           }

//           .topnav-mobile-user-email {
//             font-size: 13px;
//             color: #64748b;
//           }

//           .topnav-mobile-logout {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #dc2626;
//             font-size: 15px;
//             font-weight: 500;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           .topnav-language-wrapper {
//             display: none !important;
//           }

//           .topnav-dropdown {
//             position: fixed;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
//             border: 1px solid rgba(18, 38, 63, 0.08);
//             overflow: hidden;
//             z-index: 9999;
//             padding: 4px 0;
//             min-width: 200px;
//             animation: slideDown 0.2s ease;
//           }

//           .topnav-dropdown-item {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             width: 100%;
//             padding: 10px 16px;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             font-size: 14px;
//             color: #17263a;
//             transition: background 0.15s ease;
//             font-family: inherit;
//           }

//           .topnav-dropdown-item:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-dropdown-item.logout {
//             color: #dc2626;
//           }

//           .topnav-dropdown-item.logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           .topnav-dropdown-divider {
//             height: 1px;
//             background: rgba(18, 38, 63, 0.08);
//             margin: 4px 8px;
//           }

//           @keyframes slideDown {
//             from {
//               opacity: 0;
//               transform: translateY(-10px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @media (max-width: 768px) {
//             .topnav-right .topnav-login-btn {
//               display: none;
//             }

//             .topnav-right .topnav-user-btn .topnav-user-name {
//               display: none;
//             }

//             .topnav-mobile-menu-btn {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//             }

//             .topnav-container {
//               padding: 0 16px;
//               height: 56px;
//             }

//             .topnav-logo img {
//               height: 28px;
//             }

//             .topnav-logo-text {
//               font-size: 16px;
//             }

//             .topnav-language-wrapper {
//               display: none !important;
//             }

//             .topnav-bell-btn {
//               width: 32px;
//               height: 32px;
//             }

//             .topnav-bell-btn svg {
//               width: 18px;
//               height: 18px;
//             }
//           }

//           @media (min-width: 769px) {
//             .topnav-mobile-menu {
//               display: none !important;
//             }
//           }
//         `}
//       </style>

//       <nav className="topnav">
//         <div className="topnav-container">
//           {/* Logo */}
//           <a 
//             className="topnav-logo" 
//             onClick={() => handleNavigate('/')}
//             href="#"
//           >
//             <img src="/assets/logo_tradesmap.png" alt="TradesMap" />
//             <span className="topnav-logo-text">TradesMap</span>
//           </a>

//           {/* Right Side */}
//           <div className="topnav-right">
//             {/* Login Button OR User Avatar */}
//             {!isAuthenticated ? (
//               <button 
//                 className="topnav-login-btn"
//                 onClick={() => navigate('/login')}
//               >
//                 {t('auth.login') || 'Log in'}
//               </button>
//             ) : (
//               <>
//                 {/* ✅ Bell Notification Icon - Only visible when wizard is completed */}
//                 {wizardCompleted && (
//                   <button
//                     ref={bellRef}
//                     className="topnav-bell-btn"
//                     onClick={toggleBellDropdown}
//                     aria-label="Notifications"
//                     title="Notifications"
//                   >
//                     <IconBell />
//                     {notificationCount > 0 && (
//                       <span className="bell-badge">
//                         {notificationCount > 99 ? '99+' : notificationCount}
//                       </span>
//                     )}
//                   </button>
//                 )}

//                 <button 
//                   ref={avatarRef}
//                   className="topnav-user-btn"
//                   onClick={toggleDropdown}
//                   title={userName || 'User'}
//                 >
//                   <div className="topnav-avatar">
//                     {profileImage && profileImage !== '/assets/worker.avif' ? (
//                       <img 
//                         key={profileImage}
//                         src={profileImage} 
//                         alt={userName || 'User'} 
//                         onError={handleImageError}
//                       />
//                     ) : (
//                       <span className="topnav-avatar-text">{userInitial || 'U'}</span>
//                     )}
//                   </div>
//                   <span className="topnav-user-name">
//                     {userName || 'User'}
//                   </span>
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isDropdownOpen && (
//                   <div
//                     ref={dropdownRef}
//                     className="topnav-dropdown"
//                     style={{
//                       top: `${dropdownPosition.top}px`,
//                       right: `${dropdownPosition.right}px`,
//                     }}
//                   >
//                     {/* ✅ Only show Profile Settings if wizard is completed */}
//                     {wizardCompleted && (
//                       <button
//                         className="topnav-dropdown-item"
//                         onClick={() => handleNavigate('/wizard/summary')}
//                       >
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                           <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                         </svg>
//                         {t('nav.profile') || 'Profile Settings'}
//                       </button>
//                     )}

//                     {/* ✅ Only show Account Settings if wizard is completed */}
//                     {wizardCompleted && (
//                       <button
//                         className="topnav-dropdown-item"
//                         onClick={handleAccountSettings}
//                       >
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                           <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                         </svg>
//                         {t('nav.accountSettings') || 'Account Settings'}
//                       </button>
//                     )}

//                     {/* Notifications - Always visible */}
//                     <button
//                       className="topnav-dropdown-item"
//                       onClick={handleNotifications}
//                     >
//                       <IconBell />
//                       {t('nav.notifications') || 'Notifications'}
//                       {notificationCount > 0 && (
//                         <span style={{
//                           marginLeft: 'auto',
//                           padding: '1px 8px',
//                           background: '#dc2626',
//                           color: 'white',
//                           borderRadius: '12px',
//                           fontSize: '10px',
//                           fontWeight: 600
//                         }}>
//                           {notificationCount > 99 ? '99+' : notificationCount}
//                         </span>
//                       )}
//                     </button>

//                     <div className="topnav-dropdown-divider" />

//                     {/* Logout - Always visible */}
//                     <button
//                       className="topnav-dropdown-item logout"
//                       onClick={handleLogout}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//                       </svg>
//                       {t('nav.logout') || 'Sign out'}
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Mobile Menu Button */}
//             <button 
//               className="topnav-mobile-menu-btn"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`topnav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
//           {isAuthenticated && (
//             <>
//               <div className="topnav-mobile-user">
//                 <div className="topnav-mobile-avatar">
//                   {profileImage && profileImage !== '/assets/worker.avif' ? (
//                     <img 
//                       key={profileImage}
//                       src={profileImage} 
//                       alt={userName || 'User'} 
//                       onError={handleImageError}
//                     />
//                   ) : (
//                     userInitial || 'U'
//                   )}
//                 </div>
//                 <div>
//                   <div className="topnav-mobile-user-name">
//                     {userName || 'User'}
//                   </div>
//                   <div className="topnav-mobile-user-email">
//                     {localStorage.getItem('pendingEmail') || ''}
//                   </div>
//                 </div>
//               </div>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}

//           {!isAuthenticated ? (
//             <>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/login')}
//                 style={{ 
//                   background: '#0f4ea9', 
//                   color: 'white',
//                   borderRadius: '10px',
//                   fontWeight: 600
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.login') || 'Log in'}
//                 </span>
//               </button>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/register')}
//                 style={{ 
//                   border: '2px solid #0f4ea9',
//                   borderRadius: '10px',
//                   fontWeight: 500
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.register') || 'Register'}
//                 </span>
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           ) : (
//             <>
//               {/* ✅ Bell Notification in Mobile Menu - Only when wizard is completed */}
//               {wizardCompleted && (
//                 <button 
//                   className="topnav-mobile-link"
//                   onClick={handleNotifications}
//                 >
//                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <IconBell />
//                     {t('nav.notifications') || 'Notifications'}
//                     {notificationCount > 0 && (
//                       <span style={{
//                         marginLeft: 'auto',
//                         padding: '1px 8px',
//                         background: '#dc2626',
//                         color: 'white',
//                         borderRadius: '12px',
//                         fontSize: '10px',
//                         fontWeight: 600
//                       }}>
//                         {notificationCount > 99 ? '99+' : notificationCount}
//                       </span>
//                     )}
//                   </span>
//                 </button>
//               )}

//               {/* ✅ Only show Profile if wizard is completed */}
//               {wizardCompleted && (
//                 <button 
//                   className="topnav-mobile-link"
//                   onClick={() => handleNavigate('/wizard/summary')}
//                 >
//                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                     </svg>
//                     {t('nav.profile') || 'Profile'}
//                   </span>
//                 </button>
//               )}

//               {/* ✅ Only show Account Settings if wizard is completed */}
//               {wizardCompleted && (
//                 <button 
//                   className="topnav-mobile-link"
//                   onClick={handleAccountSettings}
//                 >
//                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                       <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                     </svg>
//                     {t('nav.accountSettings') || 'Account Settings'}
//                   </span>
//                 </button>
//               )}

//               {/* Logout - Always visible */}
//               <button 
//                 className="topnav-mobile-logout"
//                 onClick={handleLogout}
//               >
//                 <IconLogout />
//                 {t('nav.logout') || 'Sign out'}
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}
//         </div>
//       </nav>
//     </>
//   )
// }

// export default TopNav









// // src/common/components/TopNav.jsx
// import { useState, useEffect, useRef } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useTranslation } from 'react-i18next'
// import api from '../../services/api'

// // Icons
// function IconMenu(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconClose(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconUser(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
//     </svg>
//   )
// }

// function IconLogout(props) {
//   return (
//     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
//     </svg>
//   )
// }

// // Bell Icon for Notifications
// function IconBell(props) {
//   return (
//     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
//       <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor" />
//     </svg>
//   )
// }

// export function TopNav({ variant = 'solid', hideNav = false }) {
//   const { t } = useTranslation()
//   const navigate = useNavigate()
//   const location = useLocation()
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [userName, setUserName] = useState('')
//   const [userInitial, setUserInitial] = useState('')
//   const [profileImage, setProfileImage] = useState('/assets/worker.avif')
//   const [imageLoading, setImageLoading] = useState(false)
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false)
//   const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 })
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [fileKey, setFileKey] = useState(null)
//   const [imageLoadAttempts, setImageLoadAttempts] = useState(0)
//   const [wizardCompleted, setWizardCompleted] = useState(false)
//   const [notificationCount, setNotificationCount] = useState(0)

//   const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  
//   const dropdownRef = useRef(null)
//   const avatarRef = useRef(null)
//   const menuRef = useRef(null)
//   const bellRef = useRef(null)
//   const [isBellDropdownOpen, setIsBellDropdownOpen] = useState(false)
//   const bellDropdownRef = useRef(null)

//   // ============================================================
//   // ✅ CHECK AUTHENTICATION
//   // ============================================================
  
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
//   }, [location.pathname])

//   // ============================================================
//   // ✅ CHECK WIZARD COMPLETION
//   // ============================================================
  
//   useEffect(() => {
//     const checkWizardCompletion = () => {
//       const completed = localStorage.getItem('wizardCompleted') === 'true'
//       setWizardCompleted(completed)
//       console.log('📋 Wizard completed:', completed)
//     }
    
//     checkWizardCompletion()
    
//     // Listen for wizard completion event
//     const handleWizardComplete = (e) => {
//       if (e.detail?.completed) {
//         setWizardCompleted(true)
//         // Load notification count when wizard completes
//         loadNotificationCount()
//         console.log('✅ Wizard completed event received in TopNav')
//       }
//     }
    
//     window.addEventListener('wizardCompleted', handleWizardComplete)
    
//     // Also check when route changes to RegistrationSuccessPage
//     if (location.pathname === '/registration-success') {
//       setWizardCompleted(true)
//       localStorage.setItem('wizardCompleted', 'true')
//       loadNotificationCount()
//       console.log('✅ Wizard completed from registration-success page')
//     }
    
//     return () => {
//       window.removeEventListener('wizardCompleted', handleWizardComplete)
//     }
//   }, [location.pathname])

//   // ✅ Listen for login - check wizard status
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     if (token || userId) {
//       const completed = localStorage.getItem('wizardCompleted') === 'true'
//       setWizardCompleted(completed)
//       if (completed) {
//         loadNotificationCount()
//       }
//     }
//   }, [location.pathname])

//   // ============================================================
//   // ✅ GET USER INFO
//   // ============================================================
  
//   const getUserInfo = () => {
//     const firstName = localStorage.getItem('pendingFirstName') || 
//                       sessionStorage.getItem('wizardFirstName') || 
//                       localStorage.getItem('userFirstName') ||
//                       'User'
//     const lastName = localStorage.getItem('pendingLastName') || 
//                      sessionStorage.getItem('wizardLastName') || 
//                      localStorage.getItem('userLastName') ||
//                      ''
    
//     if (firstName) {
//       setUserName(`${firstName} ${lastName}`.trim())
//       setUserInitial(firstName.charAt(0).toUpperCase())
//     }
//   }

//   // ============================================================
//   // ✅ GET FRESH PROFILE IMAGE URL FROM S3
//   // ============================================================
  
//   const getFreshProfileImage = async (key) => {
//     if (!key) return null
    
//     try {
//       setImageLoading(true)
//       const response = await api.get(`/upload/view/${encodeURIComponent(key)}`)
      
//       if (response.data.success && response.data.data.viewUrl) {
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
//       if (!userId) {
//         const saved = localStorage.getItem('userProfileImage')
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved)
//         }
//         return
//       }

//       let workerService;
//       try {
//         workerService = (await import('../../worker/services/workerService')).default;
//       } catch (importError) {
//         const saved = localStorage.getItem('userProfileImage');
//         if (saved && saved !== '/assets/worker.avif') {
//           setProfileImage(saved);
//         }
//         return;
//       }
      
//       const result = await workerService.getWorkerProfile(userId)
      
//       if (result.success && result.data) {
//         const basics = result.data.basics || {}
//         const profileImageKey = basics.profileImageKey
        
//         if (profileImageKey) {
//           setFileKey(profileImageKey)
//           localStorage.setItem('profileImageKey', profileImageKey)
//           const freshUrl = await getFreshProfileImage(profileImageKey)
//           if (freshUrl) {
//             setProfileImage(freshUrl)
//             localStorage.setItem('userProfileImage', freshUrl)
//             return
//           }
//         }
        
//         if (basics.profilePreview) {
//           setProfileImage(basics.profilePreview)
//           localStorage.setItem('userProfileImage', basics.profilePreview)
//           return
//         }
//       }
      
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
      
//     } catch (error) {
//       console.error('❌ TopNav: Error loading profile image:', error)
//       const saved = localStorage.getItem('userProfileImage')
//       if (saved && saved !== '/assets/worker.avif') {
//         setProfileImage(saved)
//       } else {
//         setProfileImage('/assets/worker.avif')
//       }
//     }
//   }

//   // ============================================================
//   // ✅ REFRESH IMAGE URL
//   // ============================================================
  
//   const refreshImageUrl = async () => {
//     if (imageLoadAttempts > 3) {
//       setProfileImage('/assets/worker.avif')
//       return false
//     }
    
//     setImageLoadAttempts(prev => prev + 1)
    
//     if (!fileKey) {
//       const savedKey = localStorage.getItem('profileImageKey')
//       if (savedKey) {
//         setFileKey(savedKey)
//         const freshUrl = await getFreshProfileImage(savedKey)
//         if (freshUrl) {
//           setProfileImage(freshUrl)
//           localStorage.setItem('userProfileImage', freshUrl)
//           return true
//         }
//       }
//       return false
//     }
    
//     const freshUrl = await getFreshProfileImage(fileKey)
//     if (freshUrl) {
//       setProfileImage(freshUrl)
//       localStorage.setItem('userProfileImage', freshUrl)
//       return true
//     }
//     return false
//   }

//   // ============================================================
//   // ✅ LOAD NOTIFICATION COUNT
//   // ============================================================
  
//   const loadNotificationCount = async () => {
//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId || !wizardCompleted) {
//         setNotificationCount(0)
//         return
//       }
      
//       // You can replace this with your actual API call
//       // For now, we'll use a mock count or get from localStorage
//       const storedCount = localStorage.getItem('notificationCount')
//       if (storedCount) {
//         setNotificationCount(parseInt(storedCount))
//       } else {
//         // Default mock count - you can replace with actual API call
//         setNotificationCount(3)
//       }
//     } catch (error) {
//       console.error('❌ Error loading notification count:', error)
//       setNotificationCount(0)
//     }
//   }

//   // ============================================================
//   // ✅ CHECK WIZARD COMPLETION FROM PROFILE DATA
//   // ============================================================
  
//   const checkWizardCompletionFromProfile = async () => {
//     try {
//       const userId = localStorage.getItem('userId')
//       if (!userId) return
      
//       const workerService = (await import('../../worker/services/workerService')).default
//       const result = await workerService.getWorkerProfile(userId)
      
//       if (result.success && result.data) {
//         const tradeData = result.data.trade || {}
//         const hasTradeData = tradeData.tradeRows?.length > 0 || 
//                             tradeData.mainTrade ||
//                             Object.keys(tradeData.skillGroups || {}).length > 0
        
//         if (hasTradeData) {
//           localStorage.setItem('wizardCompleted', 'true')
//           setWizardCompleted(true)
//           loadNotificationCount()
//           console.log('✅ Wizard completed flag set from profile check in TopNav')
//         }
//       }
//     } catch (error) {
//       console.error('Error checking wizard completion:', error)
//     }
//   }

//   // ============================================================
//   // ✅ INITIALIZE
//   // ============================================================
  
//   useEffect(() => {
//     getUserInfo()
    
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     const saved = localStorage.getItem('userProfileImage')
//     const savedKey = localStorage.getItem('profileImageKey')
    
//     if (savedKey) {
//       setFileKey(savedKey)
//     }
    
//     if (token || userId) {
//       loadProfileImage()
//       // Load notification count only if wizard is completed
//       const completed = localStorage.getItem('wizardCompleted') === 'true'
//       if (completed) {
//         setWizardCompleted(true)
//         loadNotificationCount()
//       } else {
//         // If wizard not completed, check from profile
//         checkWizardCompletionFromProfile()
//       }
//     } else if (saved && saved !== '/assets/worker.avif') {
//       setProfileImage(saved)
//     }
    
//     setImageLoadAttempts(0)
//   }, [])

//   // ✅ Reload when route changes
//   useEffect(() => {
//     const token = localStorage.getItem('authToken')
//     const userId = localStorage.getItem('userId')
//     setIsAuthenticated(!!token || !!userId)
    
//     if ((token || userId) && (location.pathname === '/wizard/summary' || location.pathname === '/wizard')) {
//       loadProfileImage()
//     }
    
//     setImageLoadAttempts(0)
    
//     // Reload notification count when wizard is completed or route changes
//     const completed = localStorage.getItem('wizardCompleted') === 'true'
//     if (completed) {
//       setWizardCompleted(true)
//       loadNotificationCount()
//     }
//   }, [location.pathname])

//   // ✅ Listen for profile image updates
//   useEffect(() => {
//     const handleProfileUpdate = (e) => {
//       if (e.detail) {
//         if (e.detail.fileKey) {
//           setFileKey(e.detail.fileKey)
//           localStorage.setItem('profileImageKey', e.detail.fileKey)
//         }
        
//         if (e.detail.fileKey) {
//           getFreshProfileImage(e.detail.fileKey).then(freshUrl => {
//             if (freshUrl) {
//               setProfileImage(freshUrl)
//               localStorage.setItem('userProfileImage', freshUrl)
//               setImageLoadAttempts(0)
//             }
//           })
//         } else if (e.detail.profileImage) {
//           setProfileImage(e.detail.profileImage)
//           localStorage.setItem('userProfileImage', e.detail.profileImage)
//           setImageLoadAttempts(0)
//         }
        
//         if (e.detail.firstName) {
//           const firstName = e.detail.firstName
//           const lastName = e.detail.lastName || ''
//           setUserName(`${firstName} ${lastName}`.trim())
//           setUserInitial(firstName.charAt(0).toUpperCase())
//           localStorage.setItem('pendingFirstName', firstName)
//           if (lastName) localStorage.setItem('pendingLastName', lastName)
//         }
//       }
//     }
//     window.addEventListener('profileImageUpdated', handleProfileUpdate)
//     return () => window.removeEventListener('profileImageUpdated', handleProfileUpdate)
//   }, [])

//   // ✅ Listen for localStorage changes
//   useEffect(() => {
//     const handleStorageChange = (e) => {
//       if (e.key === 'userProfileImage') {
//         setProfileImage(e.newValue || '/assets/worker.avif')
//       }
//       if (e.key === 'authToken' || e.key === 'userId') {
//         const token = localStorage.getItem('authToken')
//         const userId = localStorage.getItem('userId')
//         setIsAuthenticated(!!token || !!userId)
//       }
//       if (e.key === 'wizardCompleted') {
//         const completed = e.newValue === 'true'
//         setWizardCompleted(completed)
//         if (completed) {
//           loadNotificationCount()
//         } else {
//           setNotificationCount(0)
//         }
//       }
//     }
//     window.addEventListener('storage', handleStorageChange)
//     return () => window.removeEventListener('storage', handleStorageChange)
//   }, [])

//   // Handle scroll effect
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10)
//     }
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // Close mobile menu on route change
//   useEffect(() => {
//     setIsMobileMenuOpen(false)
//   }, [location.pathname])

//   // Handle click outside for dropdowns
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (menuRef.current && !menuRef.current.contains(event.target)) {
//         setIsMobileMenuOpen(false)
//       }
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
//           avatarRef.current && !avatarRef.current.contains(event.target)) {
//         setIsDropdownOpen(false)
//       }
//       if (bellDropdownRef.current && !bellDropdownRef.current.contains(event.target) &&
//           bellRef.current && !bellRef.current.contains(event.target)) {
//         setIsBellDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   // Update dropdown position
//   useEffect(() => {
//     if (isDropdownOpen && avatarRef.current) {
//       const rect = avatarRef.current.getBoundingClientRect()
//       setDropdownPosition({
//         top: rect.bottom + 8,
//         right: window.innerWidth - rect.right,
//       })
//     }
//   }, [isDropdownOpen])

//   const handleLogout = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     setIsBellDropdownOpen(false)
//     localStorage.removeItem('authToken')
//     localStorage.removeItem('userId')
//     localStorage.removeItem('pendingEmail')
//     localStorage.removeItem('pendingPassword')
//     localStorage.removeItem('pendingPhoneNumber')
//     localStorage.removeItem('pendingFirstName')
//     localStorage.removeItem('pendingLastName')
//     localStorage.removeItem('pendingDob')
//     localStorage.removeItem('pendingLanguage')
//     localStorage.removeItem('userFirstName')
//     localStorage.removeItem('userLastName')
//     localStorage.removeItem('userProfileImage')
//     localStorage.removeItem('profileImageKey')
//     localStorage.removeItem('wizardCompleted')
//     localStorage.removeItem('notificationCount')
    
//     sessionStorage.clear()
    
//     setProfileImage('/assets/worker.avif')
//     setIsAuthenticated(false)
//     setWizardCompleted(false)
//     setNotificationCount(0)
//     navigate('/login')
//   }

//   const handleNavigate = (path) => {
//     setIsMobileMenuOpen(false)
//     setIsDropdownOpen(false)
//     setIsBellDropdownOpen(false)
//     navigate(path)
//   }

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen)
//     setIsBellDropdownOpen(false)
//   }

//   const toggleBellDropdown = () => {
//     if (wizardCompleted) {
//       // Navigate directly to notifications page
//       navigate('/notifications')
//       setIsBellDropdownOpen(false)
//       // Reset notification count when clicked
//       setNotificationCount(0)
//       localStorage.setItem('notificationCount', '0')
//     }
//   }

//   // Account Settings - Navigate to new page
//   const handleAccountSettings = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     navigate('/account-settings')
//   }

//   // NOTIFICATIONS - Navigate to notifications page
//   const handleNotifications = () => {
//     setIsDropdownOpen(false)
//     setIsMobileMenuOpen(false)
//     setIsBellDropdownOpen(false)
//     navigate('/notifications')
//     // Reset notification count when clicked
//     setNotificationCount(0)
//     localStorage.setItem('notificationCount', '0')
//   }

//   // Handle image error
//   const handleImageError = async () => {
//     const refreshed = await refreshImageUrl()
//     if (!refreshed) {
//       setProfileImage('/assets/worker.avif')
//     }
//   }

//   if (hideNav) {
//     return null
//   }

//   const isSolid = variant === 'solid'
//   const isTransparent = variant === 'transparent'

//   return (
//     <>
//       <style>
//         {`
//           .topnav {
//             position: sticky;
//             top: 0;
//             z-index: 1000;
//             background: ${isSolid ? 'white' : isTransparent ? 'transparent' : 'white'};
//             border-bottom: ${isSolid || isTransparent ? '1px solid rgba(18, 38, 63, 0.08)' : 'none'};
//             backdrop-filter: ${isTransparent && isScrolled ? 'blur(12px)' : 'none'};
//             background-color: ${isTransparent && isScrolled ? 'rgba(255, 255, 255, 0.85)' : isTransparent ? 'transparent' : 'white'};
//             transition: all 0.3s ease;
//             box-shadow: ${isScrolled ? '0 2px 16px rgba(0, 0, 0, 0.06)' : 'none'};
//           }

//           .topnav-container {
//             max-width: 1400px;
//             margin: 0 auto;
//             padding: 0 24px;
//             height: 64px;
//             display: flex;
//             align-items: center;
//             justify-content: space-between;
//           }

//           .topnav-logo {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             cursor: pointer;
//             flex-shrink: 0;
//             text-decoration: none;
//           }

//           .topnav-logo img {
//             height: 32px;
//             width: auto;
//           }

//           .topnav-logo-text {
//             font-size: 18px;
//             font-weight: 700;
//             color: #0f4ea9;
//             letter-spacing: -0.5px;
//           }

//           .topnav-right {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             flex-shrink: 0;
//           }

//           .topnav-login-btn {
//             padding: 8px 20px;
//             border: none;
//             background: #0f4ea9;
//             color: white;
//             border-radius: 8px;
//             font-size: 14px;
//             font-weight: 500;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             white-space: nowrap;
//           }

//           .topnav-login-btn:hover {
//             background: #0b3f90;
//             transform: translateY(-1px);
//             box-shadow: 0 4px 12px rgba(15, 78, 169, 0.3);
//           }

//           /* ✅ Bell Icon Styles */
//           .topnav-bell-btn {
//             position: relative;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             width: 36px;
//             height: 36px;
//             border-radius: 50%;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             transition: background 0.2s ease;
//             color: #17263a;
//             padding: 0;
//             flex-shrink: 0;
//           }

//           .topnav-bell-btn:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-bell-btn .bell-badge {
//             position: absolute;
//             top: 2px;
//             right: 2px;
//             min-width: 18px;
//             height: 18px;
//             padding: 0 5px;
//             background: #dc2626;
//             color: white;
//             font-size: 10px;
//             font-weight: 700;
//             border-radius: 50%;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             border: 2px solid white;
//             line-height: 1;
//           }

//           .topnav-bell-btn .bell-badge.zero {
//             display: none;
//           }

//           .topnav-user-btn {
//             display: flex;
//             align-items: center;
//             gap: 8px;
//             padding: 4px 12px 4px 4px;
//             border-radius: 30px;
//             background: rgba(15, 78, 169, 0.06);
//             cursor: pointer;
//             transition: all 0.2s ease;
//             border: none;
//             font-family: inherit;
//             text-decoration: none;
//             position: relative;
//           }

//           .topnav-user-btn:hover {
//             background: rgba(15, 78, 169, 0.1);
//           }

//           .topnav-avatar {
//             width: 36px;
//             height: 36px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 14px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//             border: ${isDropdownOpen ? '2px solid #0f4ea9' : '2px solid transparent'};
//             transition: border 0.2s ease;
//           }

//           .topnav-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-avatar-text {
//             font-size: 14px;
//             font-weight: 600;
//           }

//           .topnav-user-name {
//             font-size: 14px;
//             font-weight: 500;
//             color: #17263a;
//             white-space: nowrap;
//           }

//           .topnav-mobile-menu-btn {
//             display: none;
//             background: none;
//             border: none;
//             cursor: pointer;
//             color: #17263a;
//             padding: 8px;
//             border-radius: 8px;
//             transition: background 0.2s ease;
//           }

//           .topnav-mobile-menu-btn:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-menu {
//             display: none;
//             position: fixed;
//             top: 64px;
//             left: 0;
//             right: 0;
//             bottom: 0;
//             background: white;
//             padding: 20px 24px;
//             flex-direction: column;
//             gap: 8px;
//             overflow-y: auto;
//             z-index: 999;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             animation: slideDown 0.25s ease;
//           }

//           .topnav-mobile-menu.open {
//             display: flex;
//           }

//           .topnav-mobile-link {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #17263a;
//             font-size: 15px;
//             font-weight: 500;
//             text-decoration: none;
//             transition: all 0.2s ease;
//             cursor: pointer;
//             background: transparent;
//             border: none;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-link:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-mobile-divider {
//             border: none;
//             border-top: 1px solid rgba(18, 38, 63, 0.08);
//             margin: 8px 0;
//           }

//           .topnav-mobile-user {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             background: rgba(15, 78, 169, 0.04);
//           }

//           .topnav-mobile-avatar {
//             width: 40px;
//             height: 40px;
//             border-radius: 50%;
//             background: #0f4ea9;
//             color: white;
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             font-size: 16px;
//             font-weight: 600;
//             flex-shrink: 0;
//             overflow: hidden;
//           }

//           .topnav-mobile-avatar img {
//             width: 100%;
//             height: 100%;
//             object-fit: cover;
//           }

//           .topnav-mobile-user-name {
//             font-size: 15px;
//             font-weight: 600;
//             color: #17263a;
//           }

//           .topnav-mobile-user-email {
//             font-size: 13px;
//             color: #64748b;
//           }

//           .topnav-mobile-logout {
//             display: flex;
//             align-items: center;
//             gap: 10px;
//             padding: 12px 16px;
//             border-radius: 10px;
//             color: #dc2626;
//             font-size: 15px;
//             font-weight: 500;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             transition: all 0.2s ease;
//             font-family: inherit;
//             width: 100%;
//             text-align: left;
//           }

//           .topnav-mobile-logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           .topnav-language-wrapper {
//             display: none !important;
//           }

//           .topnav-dropdown {
//             position: fixed;
//             background: white;
//             border-radius: 12px;
//             box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
//             border: 1px solid rgba(18, 38, 63, 0.08);
//             overflow: hidden;
//             z-index: 9999;
//             padding: 4px 0;
//             min-width: 200px;
//             animation: slideDown 0.2s ease;
//           }

//           .topnav-dropdown-item {
//             display: flex;
//             align-items: center;
//             gap: 12px;
//             width: 100%;
//             padding: 10px 16px;
//             background: transparent;
//             border: none;
//             cursor: pointer;
//             font-size: 14px;
//             color: #17263a;
//             transition: background 0.15s ease;
//             font-family: inherit;
//           }

//           .topnav-dropdown-item:hover {
//             background: rgba(15, 78, 169, 0.06);
//           }

//           .topnav-dropdown-item.logout {
//             color: #dc2626;
//           }

//           .topnav-dropdown-item.logout:hover {
//             background: rgba(220, 38, 38, 0.06);
//           }

//           .topnav-dropdown-divider {
//             height: 1px;
//             background: rgba(18, 38, 63, 0.08);
//             margin: 4px 8px;
//           }

//           @keyframes slideDown {
//             from {
//               opacity: 0;
//               transform: translateY(-10px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }

//           @media (max-width: 768px) {
//             .topnav-right .topnav-login-btn {
//               display: none;
//             }

//             .topnav-right .topnav-user-btn .topnav-user-name {
//               display: none;
//             }

//             .topnav-mobile-menu-btn {
//               display: flex;
//               align-items: center;
//               justify-content: center;
//             }

//             .topnav-container {
//               padding: 0 16px;
//               height: 56px;
//             }

//             .topnav-logo img {
//               height: 28px;
//             }

//             .topnav-logo-text {
//               font-size: 16px;
//             }

//             .topnav-language-wrapper {
//               display: none !important;
//             }

//             .topnav-bell-btn {
//               width: 32px;
//               height: 32px;
//             }

//             .topnav-bell-btn svg {
//               width: 18px;
//               height: 18px;
//             }
//           }

//           @media (min-width: 769px) {
//             .topnav-mobile-menu {
//               display: none !important;
//             }
//           }
//         `}
//       </style>

//       <nav className="topnav">
//         <div className="topnav-container">
//           {/* Logo */}
//           <a 
//             className="topnav-logo" 
//             onClick={() => handleNavigate('/')}
//             href="#"
//           >
//             <img src="/assets/logo_tradesmap.png" alt="TradesMap" />
//             <span className="topnav-logo-text">TradesMap</span>
//           </a>

//           {/* Right Side */}
//           <div className="topnav-right">
//             {/* Login Button OR User Avatar */}
//             {!isAuthenticated ? (
//               <button 
//                 className="topnav-login-btn"
//                 onClick={() => navigate('/login')}
//               >
//                 {t('auth.login') || 'Log in'}
//               </button>
//             ) : (
//               <>
//                 {/* ✅ Bell Notification Icon - Only visible when wizard is completed */}
//                 {wizardCompleted && (
//                   <button
//                     ref={bellRef}
//                     className="topnav-bell-btn"
//                     onClick={toggleBellDropdown}
//                     aria-label="Notifications"
//                     title="Notifications"
//                   >
//                     <IconBell />
//                     {notificationCount > 0 && (
//                       <span className="bell-badge">
//                         {notificationCount > 99 ? '99+' : notificationCount}
//                       </span>
//                     )}
//                   </button>
//                 )}

//                 <button 
//                   ref={avatarRef}
//                   className="topnav-user-btn"
//                   onClick={toggleDropdown}
//                   title={userName || 'User'}
//                 >
//                   <div className="topnav-avatar">
//                     {profileImage && profileImage !== '/assets/worker.avif' ? (
//                       <img 
//                         key={profileImage}
//                         src={profileImage} 
//                         alt={userName || 'User'} 
//                         onError={handleImageError}
//                       />
//                     ) : (
//                       <span className="topnav-avatar-text">{userInitial || 'U'}</span>
//                     )}
//                   </div>
//                   <span className="topnav-user-name">
//                     {userName || 'User'}
//                   </span>
//                 </button>

//                 {/* Dropdown Menu */}
//                 {isDropdownOpen && (
//                   <div
//                     ref={dropdownRef}
//                     className="topnav-dropdown"
//                     style={{
//                       top: `${dropdownPosition.top}px`,
//                       right: `${dropdownPosition.right}px`,
//                     }}
//                   >
//                     {/* ✅ Only show Profile Settings if wizard is completed */}
//                     {wizardCompleted && (
//                       <button
//                         className="topnav-dropdown-item"
//                         onClick={() => handleNavigate('/wizard/summary')}
//                       >
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                           <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                         </svg>
//                         {t('nav.profile') || 'Profile Settings'}
//                       </button>
//                     )}

//                     {/* ✅ Only show Account Settings if wizard is completed */}
//                     {wizardCompleted && (
//                       <button
//                         className="topnav-dropdown-item"
//                         onClick={handleAccountSettings}
//                       >
//                         <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                           <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                         </svg>
//                         {t('nav.accountSettings') || 'Account Settings'}
//                       </button>
//                     )}

//                     {/* Notifications - Always visible */}
//                     <button
//                       className="topnav-dropdown-item"
//                       onClick={handleNotifications}
//                     >
//                       <IconBell />
//                       {t('nav.notifications') || 'Notifications'}
//                       {notificationCount > 0 && (
//                         <span style={{
//                           marginLeft: 'auto',
//                           padding: '1px 8px',
//                           background: '#dc2626',
//                           color: 'white',
//                           borderRadius: '12px',
//                           fontSize: '10px',
//                           fontWeight: 600
//                         }}>
//                           {notificationCount > 99 ? '99+' : notificationCount}
//                         </span>
//                       )}
//                     </button>

//                     <div className="topnav-dropdown-divider" />

//                     {/* Logout - Always visible */}
//                     <button
//                       className="topnav-dropdown-item logout"
//                       onClick={handleLogout}
//                     >
//                       <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="#dc2626" />
//                       </svg>
//                       {t('nav.logout') || 'Sign out'}
//                     </button>
//                   </div>
//                 )}
//               </>
//             )}

//             {/* Mobile Menu Button */}
//             <button 
//               className="topnav-mobile-menu-btn"
//               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//               aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
//             >
//               {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`topnav-mobile-menu ${isMobileMenuOpen ? 'open' : ''}`} ref={menuRef}>
//           {isAuthenticated && (
//             <>
//               <div className="topnav-mobile-user">
//                 <div className="topnav-mobile-avatar">
//                   {profileImage && profileImage !== '/assets/worker.avif' ? (
//                     <img 
//                       key={profileImage}
//                       src={profileImage} 
//                       alt={userName || 'User'} 
//                       onError={handleImageError}
//                     />
//                   ) : (
//                     userInitial || 'U'
//                   )}
//                 </div>
//                 <div>
//                   <div className="topnav-mobile-user-name">
//                     {userName || 'User'}
//                   </div>
//                   <div className="topnav-mobile-user-email">
//                     {localStorage.getItem('pendingEmail') || ''}
//                   </div>
//                 </div>
//               </div>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}

//           {!isAuthenticated ? (
//             <>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/login')}
//                 style={{ 
//                   background: '#0f4ea9', 
//                   color: 'white',
//                   borderRadius: '10px',
//                   fontWeight: 600
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.login') || 'Log in'}
//                 </span>
//               </button>
//               <button 
//                 className="topnav-mobile-link"
//                 onClick={() => handleNavigate('/register')}
//                 style={{ 
//                   border: '2px solid #0f4ea9',
//                   borderRadius: '10px',
//                   fontWeight: 500
//                 }}
//               >
//                 <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                   <IconUser />
//                   {t('auth.register') || 'Register'}
//                 </span>
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           ) : (
//             <>
//               {/* ✅ Bell Notification in Mobile Menu - Only when wizard is completed */}
//               {wizardCompleted && (
//                 <button 
//                   className="topnav-mobile-link"
//                   onClick={handleNotifications}
//                 >
//                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <IconBell />
//                     {t('nav.notifications') || 'Notifications'}
//                     {notificationCount > 0 && (
//                       <span style={{
//                         marginLeft: 'auto',
//                         padding: '1px 8px',
//                         background: '#dc2626',
//                         color: 'white',
//                         borderRadius: '12px',
//                         fontSize: '10px',
//                         fontWeight: 600
//                       }}>
//                         {notificationCount > 99 ? '99+' : notificationCount}
//                       </span>
//                     )}
//                   </span>
//                 </button>
//               )}

//               {/* ✅ Only show Profile if wizard is completed */}
//               {wizardCompleted && (
//                 <button 
//                   className="topnav-mobile-link"
//                   onClick={() => handleNavigate('/wizard/summary')}
//                 >
//                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                       <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
//                     </svg>
//                     {t('nav.profile') || 'Profile'}
//                   </span>
//                 </button>
//               )}

//               {/* ✅ Only show Account Settings if wizard is completed */}
//               {wizardCompleted && (
//                 <button 
//                   className="topnav-mobile-link"
//                   onClick={handleAccountSettings}
//                 >
//                   <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                       <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
//                     </svg>
//                     {t('nav.accountSettings') || 'Account Settings'}
//                   </span>
//                 </button>
//               )}

//               {/* Logout - Always visible */}
//               <button 
//                 className="topnav-mobile-logout"
//                 onClick={handleLogout}
//               >
//                 <IconLogout />
//                 {t('nav.logout') || 'Sign out'}
//               </button>
//               <hr className="topnav-mobile-divider" />
//             </>
//           )}
//         </div>
//       </nav>
//     </>
//   )
// }

// export default TopNav






// src/common/components/TopNav.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../../services/api'

// Icons
function IconMenu(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
    </svg>
  )
}

function IconClose(props) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor" />
    </svg>
  )
}

function IconUser(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="currentColor" />
    </svg>
  )
}

function IconLogout(props) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M10 17v2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6v2H4v10h6Zm4.59-1L16 14.59 13.41 12H22v-2h-8.59L16 7.41 14.59 6 10.59 10l4 4Z" fill="currentColor" />
    </svg>
  )
}

// Bell Icon for Notifications
function IconBell(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" fill="currentColor" />
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
  const [fileKey, setFileKey] = useState(null)
  const [imageLoadAttempts, setImageLoadAttempts] = useState(0)
  const [wizardCompleted, setWizardCompleted] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'
  
  const dropdownRef = useRef(null)
  const avatarRef = useRef(null)
  const menuRef = useRef(null)
  const bellRef = useRef(null)
  const [isBellDropdownOpen, setIsBellDropdownOpen] = useState(false)
  const bellDropdownRef = useRef(null)

  // ============================================================
  // ✅ CHECK AUTHENTICATION
  // ============================================================
  
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    setIsAuthenticated(!!token || !!userId)
  }, [location.pathname])

  // ============================================================
  // ✅ CHECK WIZARD COMPLETION
  // ============================================================
  
  useEffect(() => {
    const checkWizardCompletion = () => {
      const completed = localStorage.getItem('wizardCompleted') === 'true'
      setWizardCompleted(completed)
      console.log('📋 Wizard completed:', completed)
    }
    
    checkWizardCompletion()
    
    const handleWizardComplete = (e) => {
      if (e.detail?.completed) {
        setWizardCompleted(true)
        loadNotificationCount()
        console.log('✅ Wizard completed event received in TopNav')
      }
    }
    
    window.addEventListener('wizardCompleted', handleWizardComplete)
    
    if (location.pathname === '/registration-success') {
      setWizardCompleted(true)
      localStorage.setItem('wizardCompleted', 'true')
      loadNotificationCount()
      console.log('✅ Wizard completed from registration-success page')
    }
    
    return () => {
      window.removeEventListener('wizardCompleted', handleWizardComplete)
    }
  }, [location.pathname])

  // ✅ Listen for login - check wizard status
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    setIsAuthenticated(!!token || !!userId)
    
    if (token || userId) {
      const completed = localStorage.getItem('wizardCompleted') === 'true'
      setWizardCompleted(completed)
      if (completed) {
        loadNotificationCount()
      }
    }
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
      setImageLoading(true)
      const response = await api.get(`/upload/view/${encodeURIComponent(key)}`)
      
      if (response.data.success && response.data.data.viewUrl) {
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
      if (!userId) {
        const saved = localStorage.getItem('userProfileImage')
        if (saved && saved !== '/assets/worker.avif') {
          setProfileImage(saved)
        }
        return
      }

      let workerService;
      try {
        workerService = (await import('../../worker/services/workerService')).default;
      } catch (importError) {
        const saved = localStorage.getItem('userProfileImage');
        if (saved && saved !== '/assets/worker.avif') {
          setProfileImage(saved);
        }
        return;
      }
      
      const result = await workerService.getWorkerProfile(userId)
      
      if (result.success && result.data) {
        const basics = result.data.basics || {}
        const profileImageKey = basics.profileImageKey
        
        if (profileImageKey) {
          setFileKey(profileImageKey)
          localStorage.setItem('profileImageKey', profileImageKey)
          const freshUrl = await getFreshProfileImage(profileImageKey)
          if (freshUrl) {
            setProfileImage(freshUrl)
            localStorage.setItem('userProfileImage', freshUrl)
            return
          }
        }
        
        if (basics.profilePreview) {
          setProfileImage(basics.profilePreview)
          localStorage.setItem('userProfileImage', basics.profilePreview)
          return
        }
      }
      
      const saved = localStorage.getItem('userProfileImage')
      if (saved && saved !== '/assets/worker.avif') {
        setProfileImage(saved)
      } else {
        setProfileImage('/assets/worker.avif')
      }
      
    } catch (error) {
      console.error('❌ TopNav: Error loading profile image:', error)
      const saved = localStorage.getItem('userProfileImage')
      if (saved && saved !== '/assets/worker.avif') {
        setProfileImage(saved)
      } else {
        setProfileImage('/assets/worker.avif')
      }
    }
  }

  // ============================================================
  // ✅ REFRESH IMAGE URL
  // ============================================================
  
  const refreshImageUrl = async () => {
    if (imageLoadAttempts > 3) {
      setProfileImage('/assets/worker.avif')
      return false
    }
    
    setImageLoadAttempts(prev => prev + 1)
    
    if (!fileKey) {
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
  // ✅ LOAD NOTIFICATION COUNT
  // ============================================================
  
  const loadNotificationCount = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId || !wizardCompleted) {
        setNotificationCount(0)
        return
      }
      
      const storedCount = localStorage.getItem('notificationCount')
      if (storedCount) {
        setNotificationCount(parseInt(storedCount))
      } else {
        setNotificationCount(3)
      }
    } catch (error) {
      console.error('❌ Error loading notification count:', error)
      setNotificationCount(0)
    }
  }

  // ============================================================
  // ✅ CHECK WIZARD COMPLETION FROM PROFILE DATA
  // ============================================================
  
  const checkWizardCompletionFromProfile = async () => {
    try {
      const userId = localStorage.getItem('userId')
      if (!userId) return
      
      const workerService = (await import('../../worker/services/workerService')).default
      const result = await workerService.getWorkerProfile(userId)
      
      if (result.success && result.data) {
        const tradeData = result.data.trade || {}
        const hasTradeData = tradeData.tradeRows?.length > 0 || 
                            tradeData.mainTrade ||
                            Object.keys(tradeData.skillGroups || {}).length > 0
        
        if (hasTradeData) {
          localStorage.setItem('wizardCompleted', 'true')
          setWizardCompleted(true)
          loadNotificationCount()
          console.log('✅ Wizard completed flag set from profile check in TopNav')
        }
      }
    } catch (error) {
      console.error('Error checking wizard completion:', error)
    }
  }

  // ============================================================
  // ✅ INITIALIZE
  // ============================================================
  
  useEffect(() => {
    getUserInfo()
    
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    setIsAuthenticated(!!token || !!userId)
    
    const saved = localStorage.getItem('userProfileImage')
    const savedKey = localStorage.getItem('profileImageKey')
    
    if (savedKey) {
      setFileKey(savedKey)
    }
    
    if (token || userId) {
      loadProfileImage()
      const completed = localStorage.getItem('wizardCompleted') === 'true'
      if (completed) {
        setWizardCompleted(true)
        loadNotificationCount()
      } else {
        checkWizardCompletionFromProfile()
      }
    } else if (saved && saved !== '/assets/worker.avif') {
      setProfileImage(saved)
    }
    
    setImageLoadAttempts(0)
  }, [])

  // ✅ Reload when route changes
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    const userId = localStorage.getItem('userId')
    setIsAuthenticated(!!token || !!userId)
    
    if ((token || userId) && (location.pathname === '/wizard/summary' || location.pathname === '/wizard')) {
      loadProfileImage()
    }
    
    setImageLoadAttempts(0)
    
    const completed = localStorage.getItem('wizardCompleted') === 'true'
    if (completed) {
      setWizardCompleted(true)
      loadNotificationCount()
    }
  }, [location.pathname])

  // ✅ Listen for profile image updates
  useEffect(() => {
    const handleProfileUpdate = (e) => {
      if (e.detail) {
        if (e.detail.fileKey) {
          setFileKey(e.detail.fileKey)
          localStorage.setItem('profileImageKey', e.detail.fileKey)
        }
        
        if (e.detail.fileKey) {
          getFreshProfileImage(e.detail.fileKey).then(freshUrl => {
            if (freshUrl) {
              setProfileImage(freshUrl)
              localStorage.setItem('userProfileImage', freshUrl)
              setImageLoadAttempts(0)
            }
          })
        } else if (e.detail.profileImage) {
          setProfileImage(e.detail.profileImage)
          localStorage.setItem('userProfileImage', e.detail.profileImage)
          setImageLoadAttempts(0)
        }
        
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

  // ✅ Listen for localStorage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'userProfileImage') {
        setProfileImage(e.newValue || '/assets/worker.avif')
      }
      if (e.key === 'authToken' || e.key === 'userId') {
        const token = localStorage.getItem('authToken')
        const userId = localStorage.getItem('userId')
        setIsAuthenticated(!!token || !!userId)
      }
      if (e.key === 'wizardCompleted') {
        const completed = e.newValue === 'true'
        setWizardCompleted(completed)
        if (completed) {
          loadNotificationCount()
        } else {
          setNotificationCount(0)
        }
      }
    }
    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
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

  // Handle click outside for dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          avatarRef.current && !avatarRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
      if (bellDropdownRef.current && !bellDropdownRef.current.contains(event.target) &&
          bellRef.current && !bellRef.current.contains(event.target)) {
        setIsBellDropdownOpen(false)
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
    setIsBellDropdownOpen(false)
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
    localStorage.removeItem('wizardCompleted')
    localStorage.removeItem('notificationCount')
    
    sessionStorage.clear()
    
    setProfileImage('/assets/worker.avif')
    setIsAuthenticated(false)
    setWizardCompleted(false)
    setNotificationCount(0)
    navigate('/login')
  }

  const handleNavigate = (path) => {
    setIsMobileMenuOpen(false)
    setIsDropdownOpen(false)
    setIsBellDropdownOpen(false)
    navigate(path)
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
    setIsBellDropdownOpen(false)
  }

  const toggleBellDropdown = () => {
    if (wizardCompleted) {
      navigate('/notifications')
      setIsBellDropdownOpen(false)
      setNotificationCount(0)
      localStorage.setItem('notificationCount', '0')
    }
  }

  const handleAccountSettings = () => {
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
    navigate('/account-settings')
  }

  const handleNotifications = () => {
    setIsDropdownOpen(false)
    setIsMobileMenuOpen(false)
    setIsBellDropdownOpen(false)
    navigate('/notifications')
    setNotificationCount(0)
    localStorage.setItem('notificationCount', '0')
  }

  const handleImageError = async () => {
    const refreshed = await refreshImageUrl()
    if (!refreshed) {
      setProfileImage('/assets/worker.avif')
    }
  }

  if (hideNav) {
    return null
  }

  const isSolid = variant === 'solid'
  const isTransparent = variant === 'transparent'

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
            padding: 0 16px;
          }

          .topnav-container {
            max-width: 1400px;
            margin: 0 auto;
            height: 64px;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .topnav-left {
            display: flex;
            align-items: center;
            gap: 12px;
            flex: 1;
          }

          .topnav-center {
            display: flex;
            align-items: center;
            justify-content: center;
            flex: 1;
          }

          .topnav-right {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 12px;
            flex: 1;
          }

          .topnav-hamburger {
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: none;
            cursor: pointer;
            color: #17263a;
            padding: 8px;
            border-radius: 8px;
            transition: background 0.2s ease;
            font-size: 24px;
          }

          .topnav-hamburger:hover {
            background: rgba(15, 78, 169, 0.06);
          }

          .topnav-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            cursor: pointer;
            text-decoration: none;
          }

          .topnav-logo img {
            height: 28px;
            width: auto;
          }

          .topnav-logo-text {
            font-size: 18px;
            font-weight: 700;
            color: #0f4ea9;
            letter-spacing: -0.5px;
          }

          .topnav-avatar-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #0f4ea9;
            color: white;
            font-size: 14px;
            font-weight: 600;
            border: 2px solid rgba(15, 78, 169, 0.15);
            cursor: pointer;
            transition: all 0.2s ease;
            overflow: hidden;
            flex-shrink: 0;
          }

          .topnav-avatar-btn:hover {
            transform: scale(1.05);
            box-shadow: 0 4px 12px rgba(15, 78, 169, 0.25);
          }

          .topnav-avatar-btn img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* ✅ Desktop Login Button - Hidden on mobile to match attachment */
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

          /* ✅ Bell Icon Styles */
          .topnav-bell-btn {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: transparent;
            border: none;
            cursor: pointer;
            transition: background 0.2s ease;
            color: #17263a;
            padding: 0;
            flex-shrink: 0;
          }

          .topnav-bell-btn:hover {
            background: rgba(15, 78, 169, 0.06);
          }

          .topnav-bell-btn .bell-badge {
            position: absolute;
            top: 2px;
            right: 2px;
            min-width: 18px;
            height: 18px;
            padding: 0 5px;
            background: #dc2626;
            color: white;
            font-size: 10px;
            font-weight: 700;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid white;
            line-height: 1;
          }

          .topnav-bell-btn .bell-badge.zero {
            display: none;
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
            display: none !important;
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
            animation: slideDown 0.2s ease;
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

          /* ✅ Mobile: Show hamburger, hide login button */
          @media (max-width: 768px) {
            .topnav-login-btn {
              display: none !important;
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
              height: 56px;
              padding: 0 4px;
            }

            .topnav-logo img {
              height: 24px;
            }

            .topnav-logo-text {
              font-size: 16px;
            }

            .topnav-language-wrapper {
              display: none !important;
            }

            .topnav-bell-btn {
              width: 32px;
              height: 32px;
            }

            .topnav-bell-btn svg {
              width: 18px;
              height: 18px;
            }

            .topnav-hamburger {
              font-size: 22px;
            }

            .topnav-avatar-btn {
              width: 32px;
              height: 32px;
              font-size: 12px;
            }
          }

          @media (min-width: 769px) {
            .topnav-mobile-menu {
              display: none !important;
            }
          }

          /* ✅ Desktop: Show login button, hide hamburger */
          @media (min-width: 769px) {
            .topnav-hamburger {
              display: none !important;
            }
          }
        `}
      </style>

      <nav className="topnav">
        <div className="topnav-container">
          {/* Left Section - Hamburger Menu (visible on mobile) */}
          <div className="topnav-left">
            <button 
              className="topnav-hamburger"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <IconClose /> : <IconMenu />}
            </button>
          </div>

          {/* Center Section - Logo */}
          <div className="topnav-center">
            <a 
              className="topnav-logo" 
              onClick={() => handleNavigate('/')}
              href="#"
            >
              <img src="/assets/logo_tradesmap.png" alt="TradesMap" />
              <span className="topnav-logo-text">TradesMap</span>
            </a>
          </div>

          {/* Right Section - Login OR Avatar */}
          <div className="topnav-right">
            {!isAuthenticated ? (
              <>
                {/* ✅ Desktop Login Button */}
                <button 
                  className="topnav-login-btn"
                  onClick={() => navigate('/login')}
                >
                  {t('auth.login') || 'Log in'}
                </button>
                
                {/* ✅ Avatar (always visible, matches attachment) */}
                <button 
                  className="topnav-avatar-btn"
                  onClick={() => navigate('/login')}
                  title="Login"
                >
                  {profileImage && profileImage !== '/assets/worker.avif' ? (
                    <img 
                      key={profileImage}
                      src={profileImage} 
                      alt="User" 
                      onError={handleImageError}
                    />
                  ) : (
                    <span>{userInitial || 'R'}</span>
                  )}
                </button>
              </>
            ) : (
              <>
                {/* ✅ Bell Notification Icon - Only visible when wizard is completed */}
                {wizardCompleted && (
                  <button
                    ref={bellRef}
                    className="topnav-bell-btn"
                    onClick={toggleBellDropdown}
                    aria-label="Notifications"
                    title="Notifications"
                  >
                    <IconBell />
                    {notificationCount > 0 && (
                      <span className="bell-badge">
                        {notificationCount > 99 ? '99+' : notificationCount}
                      </span>
                    )}
                  </button>
                )}

                <button 
                  ref={avatarRef}
                  className="topnav-user-btn"
                  onClick={toggleDropdown}
                  title={userName || 'User'}
                >
                  <div className="topnav-avatar">
                    {profileImage && profileImage !== '/assets/worker.avif' ? (
                      <img 
                        key={profileImage}
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
                    {wizardCompleted && (
                      <button
                        className="topnav-dropdown-item"
                        onClick={() => handleNavigate('/wizard/summary')}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z" fill="#17263a" />
                        </svg>
                        {t('nav.profile') || 'Profile Settings'}
                      </button>
                    )}

                    {wizardCompleted && (
                      <button
                        className="topnav-dropdown-item"
                        onClick={handleAccountSettings}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
                        </svg>
                        {t('nav.accountSettings') || 'Account Settings'}
                      </button>
                    )}

                    <button
                      className="topnav-dropdown-item"
                      onClick={handleNotifications}
                    >
                      <IconBell />
                      {t('nav.notifications') || 'Notifications'}
                      {notificationCount > 0 && (
                        <span style={{
                          marginLeft: 'auto',
                          padding: '1px 8px',
                          background: '#dc2626',
                          color: 'white',
                          borderRadius: '12px',
                          fontSize: '10px',
                          fontWeight: 600
                        }}>
                          {notificationCount > 99 ? '99+' : notificationCount}
                        </span>
                      )}
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
              {wizardCompleted && (
                <button 
                  className="topnav-mobile-link"
                  onClick={handleNotifications}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <IconBell />
                    {t('nav.notifications') || 'Notifications'}
                    {notificationCount > 0 && (
                      <span style={{
                        marginLeft: 'auto',
                        padding: '1px 8px',
                        background: '#dc2626',
                        color: 'white',
                        borderRadius: '12px',
                        fontSize: '10px',
                        fontWeight: 600
                      }}>
                        {notificationCount > 99 ? '99+' : notificationCount}
                      </span>
                    )}
                  </span>
                </button>
              )}

              {wizardCompleted && (
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
              )}

              {wizardCompleted && (
                <button 
                  className="topnav-mobile-link"
                  onClick={handleAccountSettings}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.488.488 0 0 0-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 0 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.62-.07.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.49.49 0 0 0-.12-.61l-2.03-1.58zM12 15.6A3.6 3.6 0 1 1 15.6 12 3.6 3.6 0 0 1 12 15.6z" fill="#17263a" />
                    </svg>
                    {t('nav.accountSettings') || 'Account Settings'}
                  </span>
                </button>
              )}

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
        </div>
      </nav>
    </>
  )
}

export default TopNav