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

function IconPhone(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.2 2.2Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconLocation(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 14.5 9 2.5 2.5 0 0 1 12 11.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function IconGlobe(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm7.93 9h-3.18a15.7 15.7 0 0 0-1.23-5.02A8.03 8.03 0 0 1 19.93 11ZM12 4c.93 0 2.44 1.83 3.22 7H8.78C9.56 5.83 11.07 4 12 4ZM4.07 13h3.18a15.7 15.7 0 0 0 1.23 5.02A8.03 8.03 0 0 1 4.07 13Zm3.18-2H4.07a8.03 8.03 0 0 1 4.18-5.02A15.7 15.7 0 0 0 7.25 11Zm1.53 2h6.44C14.44 18.17 12.93 20 12 20s-2.44-1.83-3.22-7Zm6.97 5.02A15.7 15.7 0 0 0 16.75 13h3.18a8.03 8.03 0 0 1-4.18 5.02ZM16.75 11a15.7 15.7 0 0 0-1.23-5.02A8.03 8.03 0 0 1 19.93 11Z"
        fill="currentColor"
      />
    </svg>
  )
}

function TextField({ label, placeholder, type = 'text', icon, value, onChange, inputMode, maxLength, pattern }) {
  return (
    <label className="field">
      <div className="fieldLabel">{label}</div>
      <div className="fieldControl">
        <span className="fieldIcon">{icon}</span>
        <input
          className="fieldInput"
          placeholder={placeholder}
          type={type}
          inputMode={inputMode}
          maxLength={maxLength}
          pattern={pattern}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </label>
  )
}

function SelectField({ label, icon, value, onChange, children }) {
  return (
    <label className="field">
      <div className="fieldLabel">{label}</div>
      <div className="fieldControl">
        <span className="fieldIcon">{icon}</span>
        <select className="fieldSelect" value={value} onChange={(e) => onChange(e.target.value)} required>
          {children}
        </select>
      </div>
    </label>
  )
}

function TopNav({ variant = 'transparent' }) {
  return (
    <header className={`topbar ${variant === 'solid' ? 'topbarSolid' : ''}`}>
      <Link to="/" className="brand brandLink" aria-label="TradesMap home">
        <img className="brandLogo" src="/assets/logo_tradesmap.png" alt="TradesMap" />
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

  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [stateUS, setStateUS] = useState('')
  const [zip, setZip] = useState('')
  const [language, setLanguage] = useState('')

  const usStates = useMemo(
    () => [
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
    ],
    [],
  )

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
    <div className="authPage">
      <div className="bg bgAuth" />
      <div className="bgOverlay" />

      <main className="authMain">
        <div className="authBrand" aria-hidden="true">
          <img className="authLogo" src="/assets/logo_tradesmap.png" alt="" />
        </div>

        <div className="authCard authCardCompact">
          <div className={`tabs ${mode}`} role="tablist" aria-label="Authentication tabs">
            <button
              type="button"
              className={`tab ${mode === 'login' ? 'tabActive' : ''}`}
              role="tab"
              aria-selected={mode === 'login'}
              onClick={() => navigate('/login')}
            >
              Log in
            </button>
            <button
              type="button"
              className={`tab ${mode === 'register' ? 'tabActive' : ''}`}
              role="tab"
              aria-selected={mode === 'register'}
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <div className={`tabIndicator ${mode === 'login' ? 'tabLeft' : 'tabRight'}`} aria-hidden="true" />
          </div>

          <form className="form" onSubmit={onSubmit}>
            {mode === 'login' ? (
              <>
                <TextField
                  label=""
                  placeholder="Username"
                  icon={<IconUser />}
                  value={loginUsername}
                  onChange={setLoginUsername}
                />

                <TextField
                  label=""
                  placeholder="Password"
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
                  label=""
                  placeholder="Full name"
                  icon={<IconUser />}
                  value={fullName}
                  onChange={setFullName}
                />

                <TextField
                  label=""
                  placeholder="Email"
                  icon={<IconMail />}
                  value={email}
                  onChange={setEmail}
                />

                <div className="formGrid2">
                  <TextField
                    label=""
                    placeholder="Phone number"
                    icon={<IconPhone />}
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    inputMode="tel"
                  />

                  <SelectField label="" icon={<IconGlobe />} value={language} onChange={setLanguage}>
                    <option value="" disabled>
                      Language
                    </option>
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </SelectField>
                </div>

                <TextField
                  label=""
                  placeholder="Address"
                  icon={<IconLocation />}
                  value={address}
                  onChange={setAddress}
                />

                <div className="formGrid3">
                  <TextField
                    label=""
                    placeholder="City"
                    icon={<IconLocation />}
                    value={city}
                    onChange={setCity}
                  />

                  <SelectField label="" icon={<IconLocation />} value={stateUS} onChange={setStateUS}>
                    <option value="" disabled>
                      State
                    </option>
                    {usStates.map((s) => (
                      <option key={s.code} value={s.code}>
                        {s.name} ({s.code})
                      </option>
                    ))}
                  </SelectField>

                  <TextField
                    label=""
                    placeholder="Zip"
                    icon={<IconLocation />}
                    value={zip}
                    onChange={(v) => setZip(String(v).replace(/\D/g, '').slice(0, 5))}
                    inputMode="numeric"
                    maxLength={5}
                    pattern="\\d{5}"
                  />
                </div>

                <TextField
                  label=""
                  placeholder="Password"
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
        </div>
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
