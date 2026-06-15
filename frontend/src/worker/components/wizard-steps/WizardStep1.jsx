// src/worker/components/wizard-steps/WizardStep1.jsx
import { TextField, SelectField } from '../../../common/components/TextField'
import { IconUser, IconMail, IconLock, IconPhone, IconLocation, IconSupport, IconGlobe } from '../../../common/components/Icons'

export function WizardStep1({ data, onChange, onNext }) {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value })
  }

  const setToggle = (setter) => (e) => setter(e.target.checked)

  const isValid = data.emailAddress && data.mobilePhone && data.tempPassword && data.legalFirstName && data.legalLastName && data.dob && data.addressLine1 && data.city && data.stateCode && data.zip

  return (
    <div className="wizardStep">
      <div className="wizardBody">
        <div className="wizardSection">
          <div className="wizardSectionBar">1. Account Creation</div>
          <div className="wizardGrid2">
            <TextField 
              placeholder="Email address" 
              icon={<IconMail />} 
              value={data.emailAddress || ''} 
              onChange={(v) => handleChange('emailAddress', v)} 
            />
            <TextField 
              placeholder="Mobile phone" 
              icon={<IconPhone />} 
              value={data.mobilePhone || ''} 
              onChange={(v) => handleChange('mobilePhone', v)} 
            />
            <TextField
              type="password"
              placeholder="Enter Password"
              icon={<IconLock />}
              value={data.tempPassword || ''}
              onChange={(v) => handleChange('tempPassword', v)}
            />
            <div className="wizardChecks">
              <label className="wizardCheck">
                <input type="checkbox" />
                Enable biometric sign-in on supported devices
              </label>
              <label className="wizardCheck">
                <input type="checkbox" />
                Opt in to SMS job alerts
              </label>
            </div>
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">2. Identity & Contact</div>
          <div className="wizardGrid2">
            <TextField 
              placeholder="Legal first name" 
              icon={<IconUser />} 
              value={data.legalFirstName || ''} 
              onChange={(v) => handleChange('legalFirstName', v)} 
            />
            <TextField 
              placeholder="Address line 1" 
              icon={<IconLocation />} 
              value={data.addressLine1 || ''} 
              onChange={(v) => handleChange('addressLine1', v)} 
            />
            <TextField 
              placeholder="Legal last name" 
              icon={<IconUser />} 
              value={data.legalLastName || ''} 
              onChange={(v) => handleChange('legalLastName', v)} 
            />
            <TextField 
              placeholder="Address line 2" 
              icon={<IconLocation />} 
              value={data.addressLine2 || ''} 
              onChange={(v) => handleChange('addressLine2', v)} 
            />
            <TextField 
              placeholder="Preferred / display name" 
              icon={<IconUser />} 
              value={data.displayName || ''} 
              onChange={(v) => handleChange('displayName', v)} 
            />
            <div className="wizardGrid3">
              <TextField 
                placeholder="City" 
                icon={<IconLocation />} 
                value={data.city || ''} 
                onChange={(v) => handleChange('city', v)} 
              />
              <TextField 
                placeholder="State" 
                icon={<IconLocation />} 
                value={data.stateCode || ''} 
                onChange={(v) => handleChange('stateCode', v)} 
              />
              <TextField 
                placeholder="ZIP" 
                icon={<IconLocation />} 
                value={data.zip || ''} 
                onChange={(v) => handleChange('zip', v)} 
              />
            </div>
            <TextField 
              placeholder="Date of birth (MM/DD/YYYY)" 
              icon={<IconSupport />} 
              value={data.dob || ''} 
              onChange={(v) => handleChange('dob', v)} 
            />
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">3. Public Profile Basics</div>
          <div className="wizardGrid2">
            <TextField 
              placeholder="Profile photo upload reference" 
              icon={<IconSupport />} 
              value={data.profilePhotoRef || ''} 
              onChange={(v) => handleChange('profilePhotoRef', v)} 
            />
            <TextField 
              placeholder="Primary language" 
              icon={<IconGlobe />} 
              value={data.primaryLanguage || ''} 
              onChange={(v) => handleChange('primaryLanguage', v)} 
            />
            <TextField 
              placeholder="Additional languages" 
              icon={<IconGlobe />} 
              value={data.additionalLanguages || ''} 
              onChange={(v) => handleChange('additionalLanguages', v)} 
            />
            <TextField
              placeholder="Current city / market"
              icon={<IconLocation />}
              value={data.currentCityMarket || ''}
              onChange={(v) => handleChange('currentCityMarket', v)}
            />
          </div>
        </div>

        <div className="wizardSection">
          <div className="wizardSectionBar">4. Terms & Consent</div>
          <div className="wizardChecks wizardChecks2">
            <label className="wizardCheck">
              <input type="checkbox" checked={data.acceptTerms || false} onChange={setToggle((v) => handleChange('acceptTerms', v))} />
              I accept the TradesMap Terms of Use
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.acceptPrivacy || false} onChange={setToggle((v) => handleChange('acceptPrivacy', v))} />
              I accept the Privacy Notice
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.consentElectronic || false} onChange={setToggle((v) => handleChange('consentElectronic', v))} />
              I consent to electronic records and signatures
            </label>
            <label className="wizardCheck">
              <input type="checkbox" checked={data.certifyAccurate || false} onChange={setToggle((v) => handleChange('certifyAccurate', v))} />
              I certify the information entered is accurate
            </label>
          </div>
        </div>
      </div>

      <div className="wizardFooter">
        <button type="button" className="wizardPillBtn" disabled>
          <span className="wizardPillBtnLabel">Back</span>
          <span className="wizardPillBtnIcon">←</span>
        </button>
        <div className="wizardFooterRight">
          <button type="button" className="wizardPillBtn wizardPillBtnPrimary wizardPillBtnNext" onClick={onNext} disabled={!isValid}>
            <span className="wizardPillBtnLabel">Next</span>
            <span className="wizardPillBtnIcon">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}