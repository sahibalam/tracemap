// src/common/components/TextField.jsx
export function TextField({
  label,
  placeholder,
  type = 'text',
  icon,
  value,
  onChange,
  inputMode,
  maxLength,
  pattern,
  readOnly,
  countryCode,
  hideIcon = false,
}) {
  const inputProps = {
    className: 'fieldInput',
    placeholder,
    type,
    inputMode,
    maxLength,
    readOnly,
    value,
    onChange: (e) => onChange?.(e.target.value),
  }

  if (typeof pattern === 'string' && pattern.trim() !== '') {
    inputProps.pattern = pattern
  }

  return (
    <label className="field">
      <div className="fieldLabel">{label}</div>
      <div className="fieldControl" style={{ display: 'flex', alignItems: 'center' }}>
        {!hideIcon && icon && <span className="fieldIcon">{icon}</span>}
        {countryCode && (
          <span style={{ 
            padding: '0 8px 0 12px', 
            fontWeight: 600, 
            fontSize: '14px',
            color: 'rgba(23,38,58,0.85)',
            borderRight: '1px solid rgba(18,38,63,0.12)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            background: 'transparent'
          }}>
            {countryCode}
          </span>
        )}
        <input {...inputProps} style={{ flex: 1, minWidth: 0 }} />
      </div>
    </label>
  )
}

export function SelectField({ label, icon, value, onChange, children }) {
  return (
    <label className="field">
      <div className="fieldLabel">{label}</div>
      <div className="fieldControl">
        <span className="fieldIcon">{icon}</span>
        <select className="fieldSelect" value={value} onChange={(e) => onChange(e.target.value)}>
          {children}
        </select>
      </div>
    </label>
  )
}