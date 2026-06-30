// // src/App.jsx
// import { Routes, Route } from 'react-router-dom'
// import { HomePage } from './pages/HomePage'
// import { EmailVerificationHandler } from './pages/EmailVerificationHandler'  // Make sure this import exists
// import { WorkerAuthPage } from './worker/pages/WorkerAuthPage'
// import { WorkerVerifyPage } from './worker/pages/WorkerVerifyPage'
// import { WorkerWizardPage } from './worker/pages/WorkerWizardPage'
// import { WorkerSummaryPage } from './worker/pages/WorkerSummaryPage'
// import { CompanyAuthPage } from './company/pages/CompanyAuthPage'
// import { CompanyVerifyPage } from './company/pages/CompanyVerifyPage'
// import { CompanyWizardPage } from './company/pages/CompanyWizardPage'
// import { ProjectPage } from './projects/pages/ProjectPage'

// function App() {
//   return (
//     <Routes>
//       {/* Email Verification Handler - MUST be before other routes */}
//       <Route path="/verify-email" element={<EmailVerificationHandler />} />
//       {/* Worker Routes */}
//       <Route path="/" element={<HomePage />} />
//       <Route path="/login" element={<WorkerAuthPage initialMode="login" />} />
//       <Route path="/register" element={<WorkerAuthPage initialMode="register" />} />
//       <Route path="/verify" element={<WorkerVerifyPage />} />
//       <Route path="/wizard" element={<WorkerWizardPage />} />
//       <Route path="/wizard/summary" element={<WorkerSummaryPage />} />
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


// // src/App.jsx
// import { Routes, Route } from 'react-router-dom'
// import { HomePage } from './pages/HomePage'
// import { EmailVerificationHandler } from './pages/EmailVerificationHandler'
// import WorkerAuthPage from './worker/pages/WorkerAuthPage'  // Changed to default import
// import { WorkerVerifyPage } from './worker/pages/WorkerVerifyPage'
// import { WorkerWizardPage } from './worker/pages/WorkerWizardPage'
// import { WorkerSummaryPage } from './worker/pages/WorkerSummaryPage'
// import { CompanyAuthPage } from './company/pages/CompanyAuthPage'
// import { CompanyVerifyPage } from './company/pages/CompanyVerifyPage'
// import { CompanyWizardPage } from './company/pages/CompanyWizardPage'
// import { ProjectPage } from './projects/pages/ProjectPage'

// function App() {
//   return (
//     <Routes>
//       {/* Email Verification Handler - MUST be before other routes */}
//       <Route path="/verify-email" element={<EmailVerificationHandler />} />
//       {/* Worker Routes */}
//       <Route path="/" element={<HomePage />} />
//       <Route path="/login" element={<WorkerAuthPage initialMode="login" />} />
//       <Route path="/register" element={<WorkerAuthPage initialMode="register" />} />
//       <Route path="/verify" element={<WorkerVerifyPage />} />
//       <Route path="/wizard" element={<WorkerWizardPage />} />
//       <Route path="/wizard/summary" element={<WorkerSummaryPage />} />
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
import { MedicalEditPage } from './worker/pages/MedicalEditPage' // Add this import
import { CompanyAuthPage } from './company/pages/CompanyAuthPage'
import { CompanyVerifyPage } from './company/pages/CompanyVerifyPage'
import { CompanyWizardPage } from './company/pages/CompanyWizardPage'
import { ProjectPage } from './projects/pages/ProjectPage'

function App() {
  return (
    <Routes>
      {/* Email Verification Handler - MUST be before other routes */}
      <Route path="/verify-email" element={<EmailVerificationHandler />} />
      
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
      <Route path="/medical/edit" element={<MedicalEditPage />} /> {/* Add this route */}
      
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
  )
}

export default App