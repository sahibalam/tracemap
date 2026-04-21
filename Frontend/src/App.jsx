import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'

function IconUser(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconMail(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5L4 8V6l8 5 8-5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconLock(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M17 9h-1V7a4 4 0 0 0-8 0v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Zm-7-2a2 2 0 0 1 4 0v2h-4V7Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TextField({ label, placeholder, type = 'text', icon, value, onChange }) {
  return (
    <label className="field">
      <div className="fieldLabel">{label}</div>
      <div className="fieldControl">
        <span className="fieldIcon">{icon}</span>
        <input
          className="fieldInput"
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  )
}

function TopNav({ variant = 'transparent' }) {
  return (
    <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`}>
      <Link to="/" className="brand brandLink" aria-label="TradesMap home">
        <img className="brandLogo" src="/assets/Logo_tradesmap.png" alt="TradesMap" />
      </Link>

      <nav className="navLinks" aria-label="Top navigation">
        <a href="#" className="navLink">
          Faqs
        </a>
        <a href="#" className="navLink">
          About
        </a>
        <a href="#" className="navLink">
          Contact
        </a>
      </nav>

      <nav className="navActions" aria-label="Authentication navigation">
        <NavLink to="/login" className={({ isActive }) => `navPill ${isActive ? 'navPillActive' : ''}`}>
          Login
        </NavLink>
      </nav>
    </header>
  )
}

function HomePage() {
  return (
    <div className="home">
      <div className="bg" />
      <div className="bgOverlay" />
      <TopNav variant="transparent" />

      <main className="homeMain">
        <div className="wipCard" role="status">
          Work in progress
        </div>
      </main>
    </div>
  )
}

function AuthPage({ initialMode = 'login' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const [mode, setMode] = useState(initialMode)

  const [loginUsername, setLoginUsername] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')

  const submitLabel = useMemo(() => (mode === 'login' ? 'Log in' : 'Create account'), [mode])

  useEffect(() => {
    const nextMode = location.pathname === '/register' ? 'register' : 'login'
    setMode(nextMode)
  }, [location.pathname])

  const onSubmit = (e) => {
    e.preventDefault()
    // UI only (no backend wiring yet)
  }

  return (
    <div className="page">
      <div className="bg" />
      <div className="bgOverlay" />

      <TopNav variant="transparent" />

      <main className="content">
        <section className="leftPane" aria-hidden="true">
          <div className="phoneCard">
            <img className="phoneImage" src="/assets/appimge.png" alt="" />
          </div>
        </section>

        <section className="rightPane">
          <div className="authCard">
            <div className="authHeader">
              <div className="authTitle">Welcome</div>
              <div className="authSubtitle">Log in or create an account to get started</div>
            </div>

            <div className="tabs" role="tablist" aria-label="Authentication tabs">
              <button
                type="button"
                className={`tab ${mode === 'login' ? 'tabActive' : ''}`}
                role="tab"
                aria-selected={mode === 'login'}
                onClick={() => setMode('login')}
              >
                Log in
              </button>
              <button
                type="button"
                className={`tab ${mode === 'register' ? 'tabActive' : ''}`}
                role="tab"
                aria-selected={mode === 'register'}
                onClick={() => setMode('register')}
              >
                Register
              </button>
              <div className={`tabIndicator ${mode === 'login' ? 'tabLeft' : 'tabRight'}`} aria-hidden="true" />
            </div>

            <form className="form" onSubmit={onSubmit}>
              {mode === 'login' ? (
                <>
                  <TextField
                    label="Username"
                    placeholder="Your username"
                    icon={<IconUser />}
                    value={loginUsername}
                    onChange={setLoginUsername}
                  />

                  <TextField
                    label="Password"
                    placeholder="••••••"
                    type="password"
                    icon={<IconLock />}
                    value={loginPassword}
                    onChange={setLoginPassword}
                  />

                  <div className="formRow">
                    <a className="link" href="#">
                      Forgot password?
                    </a>
                  </div>

                  <button type="submit" className="btn btnPrimary">
                    {submitLabel}
                  </button>
                </>
              ) : (
                <>
                  <TextField
                    label="Full name"
                    placeholder="John Doe"
                    icon={<IconUser />}
                    value={fullName}
                    onChange={setFullName}
                  />

                  <TextField
                    label="Email"
                    placeholder="you@email.com"
                    icon={<IconMail />}
                    value={email}
                    onChange={setEmail}
                  />

                  <TextField
                    label="Password"
                    placeholder="Create a password"
                    type="password"
                    icon={<IconLock />}
                    value={registerPassword}
                    onChange={setRegisterPassword}
                  />

                  <button type="submit" className="btn btnSuccess">
                    {submitLabel}
                  </button>
                </>
              )}
            </form>

            <div className="authBottomNav">
              {mode === 'login' ? (
                <button type="button" className="authSwap" onClick={() => navigate('/register')}>
                  New here? Create an account
                </button>
              ) : (
                <button type="button" className="authSwap" onClick={() => navigate('/login')}>
                  Already have an account? Log in
                </button>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<AuthPage initialMode="login" />} />
      <Route path="/register" element={<AuthPage initialMode="register" />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}
