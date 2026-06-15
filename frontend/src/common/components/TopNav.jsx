// src/common/components/TopNav.jsx
import { Link, NavLink } from 'react-router-dom'
import { IconSearch, IconBell } from './Icons'

export function TopNav({ variant = 'transparent' }) {
  return (
    <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`}>
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
              <img className="topbarAvatar" src="/assets/worker.avif" alt="Worker avatar" />
            </div>
          ) : (
            <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  )
}