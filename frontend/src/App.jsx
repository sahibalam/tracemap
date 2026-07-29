
// // src/App.jsx
// import { Routes, Route } from 'react-router-dom'
// import { HomePage } from './pages/HomePage'
// import { AboutPage } from './pages/AboutPage'
// import { PrivacyPage } from './pages/PrivacyPage'
// import { TermsPage } from './pages/TermsPage'
// import { EmailVerificationHandler } from './pages/EmailVerificationHandler'
// import WorkerAuthPage from './worker/pages/WorkerAuthPage'
// import { WorkerVerifyPage } from './worker/pages/WorkerVerifyPage'
// import { WorkerWizardPage } from './worker/pages/WorkerWizardPage'
// import { WorkerSummaryPage } from './worker/pages/WorkerSummaryPage'
// import { RegistrationSuccessPage } from './worker/pages/RegistrationSuccessPage'
// import { MedicalEditPage } from './worker/pages/MedicalEditPage'
// import { TaxEditPage } from './worker/pages/TaxEditPage'
// import { CertificationEditPage } from './worker/pages/CertificationEditPage'
// import { PaymentEditPage } from './worker/pages/PaymentEditPage'
// import { AvailabilityEditPage } from './worker/pages/AvailabilityEditPage'
// import { WorkHistoryEditPage } from './worker/pages/WorkHistoryEditPage'
// import { CompanyAuthPage } from './company/pages/CompanyAuthPage'
// import { CompanyVerifyPage } from './company/pages/CompanyVerifyPage'
// import { CompanyWizardPage } from './company/pages/CompanyWizardPage'
// import { ProjectPage } from './projects/pages/ProjectPage'
// import { TradeProfileEditPage } from './worker/pages/TradeProfileEditPage'
// import { BasicInfoEditPage } from './worker/pages/BasicInfoEditPage'
// import { EmergencyContactEditPage } from './worker/pages/EmergencyContactEditPage'
// import { ResetPasswordPage } from './pages/ResetPasswordPage'
// import { AccountSettingsPage } from './worker/pages/AccountSettingsPage'
// import { NotificationPage } from './worker/pages/NotificationPage' // ✅ ADDED: Notification Page Import

// function App() {
//   return (
//     <Routes>
//       {/* Email Verification Handler - MUST be before other routes */}
//       <Route path="/verify-email" element={<EmailVerificationHandler />} />

//       {/* Password Reset Page */}
//       <Route path="/reset-password" element={<ResetPasswordPage />} />
      
//       {/* Legal Pages */}
//       <Route path="/about" element={<AboutPage />} />
//       <Route path="/privacy-policy" element={<PrivacyPage />} />
//       <Route path="/terms-conditions" element={<TermsPage />} />
      
//       {/* Worker Routes */}
//       <Route path="/" element={<HomePage />} />
//       <Route path="/login" element={<WorkerAuthPage initialMode="login" />} />
//       <Route path="/register" element={<WorkerAuthPage initialMode="register" />} />
//       <Route path="/verify" element={<WorkerVerifyPage />} />
//       <Route path="/wizard" element={<WorkerWizardPage />} />
//       <Route path="/wizard/summary" element={<WorkerSummaryPage />} />
//       <Route path="/registration-success" element={<RegistrationSuccessPage />} />
      
//       {/* Account Settings Route */}
//       <Route path="/account-settings" element={<AccountSettingsPage />} />
      
//       {/* ✅ NEW: Notifications Route */}
//       <Route path="/notifications" element={<NotificationPage />} />
      
//       {/* Edit Pages */}
//       <Route path="/medical/edit" element={<MedicalEditPage />} />
//       <Route path="/tax/edit" element={<TaxEditPage />} />
//       <Route path="/certification/edit" element={<CertificationEditPage />} />
//       <Route path="/payment/edit" element={<PaymentEditPage />} />
//       <Route path="/availability/edit" element={<AvailabilityEditPage />} />
//       <Route path="/work-history/edit" element={<WorkHistoryEditPage />} />
//       <Route path="/trade-profile/edit" element={<TradeProfileEditPage />} />
//       <Route path="/basic-info/edit" element={<BasicInfoEditPage />} />
//       <Route path="/emergency-contact/edit" element={<EmergencyContactEditPage />} />

//       {/* Company Routes */}
//       <Route path="/company/login" element={<CompanyAuthPage initialMode="login" />} />
//       <Route path="/company/register" element={<CompanyAuthPage initialMode="register" />} />
//       <Route path="/company/verify" element={<CompanyVerifyPage />} />
//       <Route path="/company/wizard" element={<CompanyWizardPage />} />
      
//       {/* Projects */}
//       <Route path="/projects" element={<ProjectPage />} />
      
//       {/* Catch All */}
//       <Route path="*" element={<HomePage />} />
//     </Routes>
//   )
// }

// export default App





// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { PrivacyPage } from './pages/PrivacyPage'
import { TermsPage } from './pages/TermsPage'
import { EmailVerificationHandler } from './pages/EmailVerificationHandler'
import WorkerAuthPage from './worker/pages/WorkerAuthPage'
import { WorkerVerifyPage } from './worker/pages/WorkerVerifyPage'
import { WorkerWizardPage } from './worker/pages/WorkerWizardPage'
import { WorkerSummaryPage } from './worker/pages/WorkerSummaryPage'
import { RegistrationSuccessPage } from './worker/pages/RegistrationSuccessPage'
import { MedicalEditPage } from './worker/pages/MedicalEditPage'
import { TaxEditPage } from './worker/pages/TaxEditPage'
import { CertificationEditPage } from './worker/pages/CertificationEditPage'
import { PaymentEditPage } from './worker/pages/PaymentEditPage'
import { AvailabilityEditPage } from './worker/pages/AvailabilityEditPage'
import { WorkHistoryEditPage } from './worker/pages/WorkHistoryEditPage'
import { CompanyAuthPage } from './company/pages/CompanyAuthPage'
import { CompanyVerifyPage } from './company/pages/CompanyVerifyPage'
import { CompanyWizardPage } from './company/pages/CompanyWizardPage'
import { ProjectPage } from './projects/pages/ProjectPage'
import { TradeProfileEditPage } from './worker/pages/TradeProfileEditPage'
import { BasicInfoEditPage } from './worker/pages/BasicInfoEditPage'
import { EmergencyContactEditPage } from './worker/pages/EmergencyContactEditPage'
import { ResetPasswordPage } from './pages/ResetPasswordPage'
import { AccountSettingsPage } from './worker/pages/AccountSettingsPage'
import { NotificationPage } from './worker/pages/NotificationPage'
import { LanguageSync } from './components/LanguageSync' // ✅ LanguageSync imported

function App() {
  return (
    <LanguageSync> {/* ✅ Wraps all routes for language sync */}
      <Routes>
        {/* Email Verification Handler - MUST be before other routes */}
        <Route path="/verify-email" element={<EmailVerificationHandler />} />

        {/* Password Reset Page */}
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        
        {/* Legal Pages */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy-policy" element={<PrivacyPage />} />
        <Route path="/terms-conditions" element={<TermsPage />} />
        
        {/* Worker Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<WorkerAuthPage initialMode="login" />} />
        <Route path="/register" element={<WorkerAuthPage initialMode="register" />} />
        <Route path="/verify" element={<WorkerVerifyPage />} />
        <Route path="/wizard" element={<WorkerWizardPage />} />
        <Route path="/wizard/summary" element={<WorkerSummaryPage />} />
        <Route path="/registration-success" element={<RegistrationSuccessPage />} />
        
        {/* Account Settings Route */}
        <Route path="/account-settings" element={<AccountSettingsPage />} />
        
        {/* Notifications Route */}
        <Route path="/notifications" element={<NotificationPage />} />
        
        {/* Edit Pages */}
        <Route path="/medical/edit" element={<MedicalEditPage />} />
        <Route path="/tax/edit" element={<TaxEditPage />} />
        <Route path="/certification/edit" element={<CertificationEditPage />} />
        <Route path="/payment/edit" element={<PaymentEditPage />} />
        <Route path="/availability/edit" element={<AvailabilityEditPage />} />
        <Route path="/work-history/edit" element={<WorkHistoryEditPage />} />
        <Route path="/trade-profile/edit" element={<TradeProfileEditPage />} />
        <Route path="/basic-info/edit" element={<BasicInfoEditPage />} />
        <Route path="/emergency-contact/edit" element={<EmergencyContactEditPage />} />

        {/* Company Routes */}
        <Route path="/company/login" element={<CompanyAuthPage initialMode="login" />} />
        <Route path="/company/register" element={<CompanyAuthPage initialMode="register" />} />
        <Route path="/company/verify" element={<CompanyVerifyPage />} />
        <Route path="/company/wizard" element={<CompanyWizardPage />} />
        
        {/* Projects */}
        <Route path="/projects" element={<ProjectPage />} />
        
        {/* Catch All */}
        <Route path="*" element={<HomePage />} />
      </Routes>
    </LanguageSync>
  )
}

export default App